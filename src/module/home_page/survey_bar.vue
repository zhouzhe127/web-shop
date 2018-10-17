
<!--
	**柱状图
	*
	* 胡江
	* *
	*
-->
<template>
	<div class="line">
		<div class="head">
			<span class="name">店铺统计</span>
			<div class="tab">
				<ul class="select-ban" @click="tabBtn">
					<li v-for="(item,index) in tabList" :key="index" :data-index="index" :class="{active:tabIndex == index}">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="chart-box">
			<!--柱状图容器-->
			<div id="bar-charts"></div>
		</div>
		<div class="chart-select select-ban">
			<div v-for="(item,index) in checkList" :key="index" class="check-div" :class="[{active:barSelect[item.name]},item.className]" :data-index="index" @click="chartSelect">
				<i></i>{{item.name}}
			</div>
			<span @click="getMore" v-if="!isAll&&this.shopIds.length>1&&!isSuc" class="get-more">
				加载所有店铺
			</span>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	props: ['bar', 'echarts', 'shopList', 'shopIds'],
	data() {
		return {
			dataBar: {
				xAxis: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: []
				},
				total: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: []
				},
				eatIn: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: []
				},
				takeout: {
					turnover: [],
					amount: [],
					discount: [],
					orderNum: []
				},
				selfTakeOut: {
					turnover: [],
					amount: [],
					discount: [],
					orderNum: []
				},
				quickPayment: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: []
				}
			},
			tabList: [
				{ type: 'turnover', name: '营业总额' },
				{ type: 'discount', name: '优惠总额' },
				{ type: 'amount', name: '入账金额' },
				{ type: 'orderNum', name: '订单量' }
			],
			barType: 'turnover',
			tabIndex: 0,

			checkList: [
				{ name: '总值', className: 'total', color: '#ff9800' },
				{ name: '堂吃', className: 'eatIn', color: '#fcd030' },
				{ name: '外卖', className: 'takeout', color: '#1b88ee' },
				{
					name: '自营外卖',
					className: 'selfTakeOut',
					color: '#ee2125'
				},
				{
					name: '快捷支付',
					className: 'quickPayment',
					color: '#a16bff'
				}
			],
			barSelect: {
				总值: true,
				堂吃: true,
				外卖: true,
				自营外卖: true,
				快捷支付: true
			},

			sliderBarEnd: 100,
			barDom: null,
			seriesData: [], //柱状图 样式列表

			isAll: false, //是否是所有店铺
			isSuc: false //成功加载
		};
	},
	mounted() {
		this.analytic();
		if (this.echarts) this.initEchart();
	},
	methods: {
		//加载所有店铺
		async getMore() {
			if (this.isAll) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '正在加载，请勿重复点击'
				});
				return;
			}
			this.isAll = true;
			for (let i = 1; i < this.shopIds.length; i++) {
				let data = await http.turnoverGetMoreShopStat({
					data: { shopIds: this.shopIds[i], type: 1 }
				});
				for (let v in data) {
					this.bar[v] = {};
					this.bar[v].eatIn = {};
					this.bar[v].quickPayment = {};
					this.bar[v].takeout = {};
					this.bar[v].total = {};
					this.bar[v].selfTakeOut = {};

					this.bar[v].eatIn.turnover = data[v].ePrice;
					this.bar[v].eatIn.amount = data[v].eRealPrice;
					this.bar[v].eatIn.orderNum = data[v].eOrderNum;
					this.bar[v].eatIn.discount = data[v].eDiscount;

					this.bar[v].quickPayment.turnover = data[v].kPrice;
					this.bar[v].quickPayment.amount = data[v].kRealPrice;
					this.bar[v].quickPayment.orderNum = data[v].kOrderNum;
					this.bar[v].quickPayment.discount = data[v].kDiscount;

					this.bar[v].takeout.turnover = data[v].tPrice;
					this.bar[v].takeout.amount = data[v].tRealPrice;
					this.bar[v].takeout.orderNum = data[v].tOrderNum;
					this.bar[v].takeout.discount = data[v].tDiscount;

					this.bar[v].total.turnover = data[v].Price;
					this.bar[v].total.amount = data[v].RealPrice;
					this.bar[v].total.orderNum = data[v].OrderNum;
					this.bar[v].total.discount = data[v].Discount;

					this.bar[v].selfTakeOut.turnover = data[v].sPrice;
					this.bar[v].selfTakeOut.amount = data[v].sRealPrice;
					this.bar[v].selfTakeOut.orderNum = data[v].sOrderNum;
					this.bar[v].selfTakeOut.discount = data[v].sOrderNum;
				}
			}
			this.analytic();
			if (this.echarts) this.initEchart();
			this.isSuc = true;
		},
		//处理数据
		analytic() {
			let bar = this.bar;
			//			for (let x in this.dataBar) {
			//				//清空之前的数据,不做其他处理
			//				for (let m in this.dataBar[x]) {
			//					this.dataBar.xAxis[m] = [];
			//					this.dataBar[x][m] = [];
			//				}
			//			}
			let xBar = [];
			for (let i in bar) {
				//1遍历 i = 店铺id
				for (let item of this.shopList) {
					//通过店铺id匹配店铺名称
					if (item.id == i) {
						xBar.push(item.name);
					}
				}
				for (let xKey in this.dataBar.xAxis) {
					//店铺名称加入x轴
					this.dataBar.xAxis[xKey] = xBar;
				}
				for (let j in bar[i]) {
					//2遍历 j = eatIn/takeout/total/quickPayment/
					for (let k in bar[i][j]) {
						//3遍历 k = turnover/amount/orderNum/discount/passengerFlow
						this.dataBar[j][k].push(bar[i][j][k]);
					}
				}
			}
			//设置柱状图滑块范围
			if (xBar.length > 10) {
				let sBarEnd = 10 / xBar.length;
				sBarEnd = sBarEnd.toFixed(2) - 0;
				if (sBarEnd > 1) sBarEnd = 1;
				this.sliderBarEnd = sBarEnd * 100;
			}
		},
		//实例化图表
		initEchart() {
			this.barDom = this.echarts.init(
				document.getElementById('bar-charts')
			);
			this.setBarListData(this.dataBar, this.barType); //循环设置柱状图图样式列表
			this.barDom.setOption(this.getBarData(this.dataBar, this.barType));
		},
		//设置柱状图的样式
		setBarListData($data, $name) {
			let list = [];
			for (let item of this.checkList) {
				let obj = {
					name: item.name,
					type: 'bar',
					animation: true,
					barWidth: 15,
					barGap: '20%',
					itemStyle: {
						normal: {
							color: item.color
						}
					},
					data: $data[item.className][$name]
				};
				list.push(obj);
			}
			this.seriesData = list;
		},
		getBarData: function($data, $name) {
			return {
				legend: {
					selected: this.barSelect
				},
				grid: {
					top: 30,
					left: 80,
					right: 70,
					bottom: 70
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						animation: false,
						label: {
							backgroundColor: '#505765'
						}
					}
				},
				xAxis: [
					{
						name: '店铺名称',
						axisTick: { show: false },
						data: $data.xAxis[$name]
					}
				],
				yAxis: [
					{
						name: this.tabList[this.tabIndex].name,
						type: 'value',
						axisTick: {
							show: false
						}
					}
				],
				dataZoom: [
					{
						type: 'slider',
						show: true,
						start: 0,
						end: this.sliderBarEnd
					}
				],
				series: this.seriesData
			};
		},

		chartSelect(event) {
			let target = event.currentTarget;
			let index = parseInt(target.getAttribute('data-index'));
			let name = this.checkList[index].name;
			this.barSelect[name] = !this.barSelect[name];
			this.setBarListData(this.dataBar, this.barType); //循环设置柱状图图样式列表
			this.barDom.setOption(this.getBarData(this.dataBar, this.barType));
		},
		tabBtn() {
			let target = event.target;
			if (target.tagName.toLocaleLowerCase() == 'li') {
				let index = parseInt(target.getAttribute('data-index'));
				this.tabIndex = index;
				this.barType = this.tabList[index].type;
				this.setBarListData(this.dataBar, this.barType); //循环设置柱状图图样式列表
				this.barDom.setOption(
					this.getBarData(this.dataBar, this.barType)
				); //重置柱状图表数据
			}
		}
	}
};
</script>

<style lang="less" scoped>
.line {
	width: 100%;
	border: 1px solid #ddd;
	border-radius: 10px;
	position: relative;
	.head {
		height: 100px;
		position: relative;
		.name {
			position: absolute;
			left: 0;
			top: 30px;
			font-size: 20px;
			padding-left: 20px;
			color: #444;
		}
		.tab {
			width: 100%;
			padding: 30px 0;
		}
		ul {
			width: 100%;
			text-align: center;
		}
		li {
			display: inline-block;
			width: 120px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			margin: 0 7px;
			font-size: 16px;
			color: #333;
			background: #f2f2f2;
			border-radius: 3px;
			cursor: pointer;
			border: 1px solid #f2f2f2;
			&:hover {
				border: 1px solid #28a8e0;
				color: #28a8e0;
			}
			&.active {
				background: #28a8e0;
				color: #fff;
				border: 1px solid #28a8e0;
			}
		}
		@media only screen and (max-width: 1200px) {
			.name {
				font-size: 16px;
			}
			li {
				width: 100px;
				font-size: 14px;
				height: 35px;
				line-height: 32px;
			}
		}
	}
	.chart-box {
		overflow: auto;
		padding-bottom: 70px;
		#bar-charts {
			height: 390px;
		}
	}
	.chart-box > div {
		width: 100%;
		height: 350px;
	}
	.chart-select {
		position: absolute;
		bottom: 25px;
		left: 0;
		width: 100%;
		text-align: center;
		div {
			margin: 0 20px;
			color: #444;
		}
		i {
			margin-right: 10px;
		}
		.total:hover i {
			border: 1px solid #ff9800;
		}
		.eatIn:hover i {
			border: 1px solid #fcd030;
		}
		.takeout:hover i {
			border: 1px solid #1b88ee;
		}
		.quickPayment:hover i {
			border: 1px solid #a16bff;
		}
		.selfTakeOut:hover i {
			border: 1px solid #ee2125;
		}
		.total.active i {
			border: 1px solid #ff9800;
			background: url(../../res/icon/white_select.png) #ff9800 center
				no-repeat;
		}
		.eatIn.active i {
			border: 1px solid #fcd030;
			background: url(../../res/icon/white_select.png) #fcd030 center
				no-repeat;
		}
		.takeout.active i {
			border: 1px solid #1b88ee;
			background: url(../../res/icon/white_select.png) #1b88ee center
				no-repeat;
		}
		.quickPayment.active i {
			border: 1px solid #a16bff;
			background: url(../../res/icon/white_select.png) #a16bff center
				no-repeat;
		}
		.selfTakeOut.active i {
			border: 1px solid #ee2125;
			background: url(../../res/icon/white_select.png) #ee2125 center
				no-repeat;
		}

		.check-div {
			display: inline-block;
			margin-left: 40px;
			cursor: pointer;
			margin-top: 10px;
			i {
				height: 18px;
				width: 18px;
				display: inline-block;
				border-radius: 3px;
				margin-right: 5px;
				color: #444;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
			}
		}

		.get-more {
			float: right;
			margin-right: 70px;
			color: #28a8e0;
			cursor: pointer;
			border: solid 1px #28a8e0;
			padding: 10px;
			border-radius: 5px;
		}
	}
}
</style>