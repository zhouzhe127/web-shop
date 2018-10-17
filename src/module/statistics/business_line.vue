<!--营业统计 折线图-->
<template>
	<div class="line">
		<div class="head">
			<span class="name">营业趋势</span>
			<div class="tab">
				<ul @click="tabBtn" class="select-ban">
					<li v-for="(item,index) in tabList" :key="index" :data-index="index" :class="{active:tabIndex == index}">{{item.name}}</li>
				</ul>
			</div>
		</div>
		<div class="chart-box">
			<!--折线图容器-->
			<div id="line-charts"></div>
		</div>
		<div class="chart-select select-ban">
			<div v-for="(item,index) in checkList" :key="index" class="check-div" :class="[{active:lineSelect[item.name]},item.className]" :data-index="index" @click="chartSelect">
				<i></i>{{item.name}}</div>
		</div>
		<div v-if="coverShow" class="loding-cover line-cover"><i class="el-icon-loading"></i></div>
	</div>
</template>
<script>
export default {
	props: ['line', 'cover', 'echarts'],
	data() {
		return {
			dataLine: {
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
					orderNum: [],
					discount: []
				},
				quickPayment:{
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
				{ type: 'orderNum', name: '订单量' },
			],
			checkList: [
				{ name: '总值', className: 'total' ,color:'#ff9800'},
				{ name: '堂吃', className: 'eatIn' ,color:'#fcd030'},
				{ name: '外卖', className: 'takeout' ,color:'#1b88ee'},
				{ name: '快捷支付', className: 'quickPayment' ,color:'#a16bff'},
			],
			xName: '日期',
			yNameLine: ['营业总额', '优惠总额', '入账金额', '订单量'],
			yNameIndexLine: 0,
			tabIndex: 0,
			lineType: 'turnover',
			options: ['日', '周', '月', '季度', '年'],
			lineDom: null,
			lineSelect: {
				总值: true,
				堂吃: true,
				外卖: true,
				快捷支付: true,
			},
			coverShow: false,
			seriesData:[],//折线图 样式列表
		};
	},
	watch: {
		line: 'analytic',
		cover: 'setCover',
		echarts: 'initEchart'
	},
	components: {},
	mounted() {
		if (this.echarts) this.initEchart();
	},
	methods: {
		initEchart() {//实例化图表
			this.lineDom = this.echarts.init(
				document.getElementById('line-charts')
			);
			this.lineDom.setOption(
				this.getLineData(this.dataLine, this.lineType)
			);
		},
		//设置遮罩层 用于显示加载动画
		setCover() {
			this.coverShow = this.cover;
		},
		analytic() {
			let list = this.line;
			for (let x in list) {
				for (let m in list[x]) {
					this.dataLine.xAxis[m] = []; //清空之前的数据
					this.dataLine[x][m] = []; //清空之前的数据
					let xAxisArr = [],
						numArr = [];
					for (let p in list[x][m]) {
						numArr.push(list[x][m][p]);
						let pArr = p.split(''); //20000101格式转2000-01-01
						if (pArr.length > 6) pArr.splice(6, 0, '-');
						pArr.splice(4, 0, '-');
						p = pArr.join('');
						xAxisArr.push(p);
					}
					this.dataLine.xAxis[m] = xAxisArr; //获取x轴坐标
					this.dataLine[x][m] = numArr;
				}
			}
			//判断echarts是否加载完毕
			if (this.echarts) {
				this.setLineListData(this.dataLine, this.lineType);//循环设置折线图样式列表
				this.lineDom.setOption(
					this.getLineData(this.dataLine, this.lineType)
				);
			}
		},
		tabBtn() {//tab选项卡的切换
			let target = event.target;
			if (target.tagName.toLocaleLowerCase() == 'li') {
				let index = parseInt(target.getAttribute('data-index'));
				this.tabIndex = index;
				this.lineType = this.tabList[index].type;
				this.yNameIndexLine = index; //重置图表下标
				this.setLineListData(this.dataLine, this.lineType);//循环设置折线图样式列表
				this.lineDom.setOption(
					this.getLineData(this.dataLine, this.lineType)
				); //重置柱状图表数据
			}
		},
		chartSelect(event) {
			let target = event.currentTarget;
			let index = parseInt(target.getAttribute('data-index')),
				name = this.checkList[index].name;
			this.lineSelect[name] = !this.lineSelect[name];
			this.setLineListData(this.dataLine, this.lineType);//循环设置折线图样式列表
			this.lineDom.setOption(
				this.getLineData(this.dataLine, this.lineType)
			);
		},
		setLineListData($data,$name){//设置折线图的样式
			let list=[];//折线图样式列表
			for(let item of this.checkList){
				let obj = {
					name: item.name,
					type: 'line',
					animation: true,
					yAxisIndex: 0,
					lineStyle: {
						normal: {
							width: 2,
							color: item.color,
						}
					},
					itemStyle: {
						normal: {
							color: item.color,
						}
					},
					data: $data[item.className][$name],
				};
				list.push(obj);
			}
			this.seriesData = list;
		},
		getLineData: function($data, $name) {
			//获取折线图数据格式
			return {
				legend: {
					selected: this.lineSelect
				},
				grid: {
					top: 30,
					left: 80,
					right: 50,
					bottom: 30
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
						name: this.xName,
						type: 'category',
						boundaryGap: false,
						axisLine: { onZero: false },
						data: $data.xAxis[$name]
					}
				],
				yAxis: [
					{
						name: this.yNameLine[this.yNameIndexLine],
						type: 'value',
						splitNumber: 3,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: '#EDEDED',
								width: 1
							}
						}
					}
				],
				series: this.seriesData,
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
.line-cover {
	height: 400px;
}
</style>