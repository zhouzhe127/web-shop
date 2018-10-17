<!--营业统计 柱状图-->
<template>
	<div class="line">
		<div class="head">
			<span class="name">店铺</span>
			<div class="tab">
				<ul class="barTab select-ban" @click="tabBtn">
					<li v-for="(item,index) in tabList" :key="index" :data-index="index" :class="{active:tabIndex == index}">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="chart-box">
			<!--柱状图容器-->
			<div id="bar-charts"></div>
		</div>
		<div class="chart-select bar-check select-ban">
			<div v-for="(item,index) in checkList" :key="index" class="check-div" :class="[{active:barSelect[item.name]},item.className]" :data-index="index" @click="chartSelect">
				<i></i>{{item.name}}</div>
		</div>
		<div v-if="coverShow" class="loding-cover bar-cover"><i class="el-icon-loading"></i></div>
	</div>
</template>
<script>
export default {
	props: ['bar', 'cover', 'echarts', 'shopList'],
	data() {
		return {
			dataBar: {
				xAxis: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				},
				total: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				},
				eatIn: {
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				},
				takeout: {
					turnover: [],
					amount: [],
					discount: [],
					orderNum: [],
					passengerFlow: [],
				},
				quickPayment:{
					turnover: [],
					amount: [],
					orderNum: [],
					discount: [],
					passengerFlow: [],
				}
			},
			tabList: [
				{ type: 'turnover', name: '营业总额' },
				{ type: 'discount', name: '优惠总额' },
				{ type: 'amount', name: '入账金额' },
				{ type: 'orderNum', name: '订单量' },
				{ type: 'passengerFlow', name: '客流量' }
			],
			checkList: [
				{ name: '总值', className: 'total' ,color:'#ff9800'},
				{ name: '堂吃', className: 'eatIn' ,color:'#fcd030'},
				{ name: '外卖', className: 'takeout' ,color:'#1b88ee'},
				{ name: '快捷支付', className: 'quickPayment' ,color:'#a16bff'},
			],
			xNameBar: '店铺名称',
			yNameBar: ['营业总额', '优惠总额', '入账金额', '订单量', '客流量'],
			yNameIndexBar: 0,
			tabIndex: 0,
			barType: 'turnover',
			sliderBarEnd: 100,
			options: ['日', '周', '月', '季度', '年'],
			barDom: null,
			barSelect: {
				总值: true,
				堂吃: true,
				外卖: true,
				快捷支付:true,
			},
			coverShow: false,
			seriesData:[],//柱状图 样式列表
		};
	},
	watch: {
		bar: 'analytic',
		cover: 'setCover',
		echarts: 'initEchart'
	},
	mounted() {
		if (this.echarts) this.initEchart();
	},
	methods: {
		initEchart() {
			//实例化图表
			this.barDom = this.echarts.init(
				document.getElementById('bar-charts')
			);
			this.barDom.setOption(this.getBarData(this.dataBar, this.barType));
		},
		setCover() {
			this.coverShow = this.cover;
		},
		analytic() {
			let bar = this.bar;
			for (let x in this.dataBar) {
				//清空之前的数据,不做其他处理
				for (let m in this.dataBar[x]) {
					this.dataBar.xAxis[m] = [];
					this.dataBar[x][m] = [];
				}
			}
			let xBar = [];
			for (let i in bar) {
				//1遍历 i = 店铺id
				for (let item of this.shopList) {
					//通过店铺id匹配店铺名称
					if (item.id == i) {
						xBar.push(item.shopName);
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
			if (this.echarts) {
				this.setBarListData(this.dataBar, this.barType);//循环设置柱状图图样式列表
				this.barDom.setOption(
					this.getBarData(this.dataBar, this.barType)
				);
			}
		},
		chartSelect(event) {
			let target = event.currentTarget;
			let index = parseInt(target.getAttribute('data-index'));
			let name = this.checkList[index].name;
			this.barSelect[name] = !this.barSelect[name];
			this.setBarListData(this.dataBar, this.barType);//循环设置柱状图图样式列表
			this.barDom.setOption(this.getBarData(this.dataBar, this.barType));
		},
		tabBtn() {
			let target = event.target;
			if (target.tagName.toLocaleLowerCase() == 'li') {
				let index = parseInt(target.getAttribute('data-index'));
				this.tabIndex = index;
				this.barType = this.tabList[index].type;
				this.yNameIndexBar = index; //重置图表下标
				this.setBarListData(this.dataBar, this.barType);//循环设置柱状图图样式列表
				this.barDom.setOption(
					this.getBarData(this.dataBar, this.barType)
				); //重置柱状图表数据
			}
		},
		setBarListData($data,$name){//设置折线图的样式
			let list=[];//折线图样式列表
			for(let item of this.checkList){
				let obj = {
					name: item.name,
					type: 'bar',
					animation: true,
					barWidth: 15,
					barGap:'20%',
					itemStyle: {
						normal: {
							color: item.color
						}
					},
					data: $data[item.className][$name],
				};
				list.push(obj);
			}
			this.seriesData = list;
		},
		getBarData: function($data, $name) {
			//获取柱状图数据格式
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
						name: this.xNameBar,
						axisTick: { show: false },
						data: $data.xAxis[$name]
					}
				],
				yAxis: [
					{
						name: this.yNameBar[this.yNameIndexBar],
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
		}
	}
};
</script>

<style lang="less" scoped>
.line {
	width: 100%;
	border: 1px solid #ddd;
	margin-top: 30px;
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
		padding-bottom: 50px;
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
	}
}
.check-div {
	display: inline-block;
	margin-left: 40px;
	cursor: pointer;
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
.help-icon {
	display: inline-block;
	height: 18px;
	width: 18px;
	vertical-align: middle;
	cursor: pointer;
	margin-top: -3px;
	background: url(../../res/icon/orderdetial18.png) no-repeat;
}
.loding-cover {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background: #fff;
	opacity: 0.7;
	text-align: center;
	display: flex;
	i{display: inline-block;font-size: 40px;margin: auto;color: #666;opacity: 1;}
}
.bar-cover {
	height: 440px;
}
</style>