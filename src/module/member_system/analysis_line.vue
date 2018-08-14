<!--会员分析 折线图-->
<template>
	<div class="broken">
		<!-- 筛选项 -->
		<div class="filter">
			<section>
				<span v-for="(item,index) in trend" :key="index" :class="{'effect':trendId == item.id}" @click="changeType(item)">{{item.name}}</span>
				<div class="input-box">
					<!--日期组件 开始时间-->
					<calendar :time="startTime" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
				<s>-</s>
				<div class="input-box">
					<!--日期组件 开始时间-->
					<calendar :time="endTime" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</div>
				<span class="order-order-searchA">
				<span class="order-order-search" href="javascript:void(0)" @click = 'getConsumeOrGrowthTrend'></span>
				</span>
				<div class="handle-tips" style="margin-left: 20px;">
					<i></i> 时间跨度最大支持30天
				</div>
			</section>
		</div>
		<div class="chart-box">
			<!--柱状图容器-->
			<div id="bar-charts" style="height:100%;"></div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
let constant = global.timeConst.ONEMONTH; //一个月
let oneDay = global.timeConst.ONEDAY; //一天

export default {
	props: ['echarts'],
	data() {
		return {
			trend: [{
				id: 0,
				name: '会员增长趋势'
			},
			{
				id: 1,
				name: '会员消费趋势'
			}
			], //类型
			trendId: 0,
			startTime: new Date().setHours(23, 59, 59, 999) - constant, //获取当月一号的零点时间戳,
			endTime: new Date().setHours(23, 59, 59, 999),
			barDom: null,
			option: {
				title: {
					text: '',
					subtext: ''
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['最高气温', '最低气温']
				},
				toolbox: {
					show: false,
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						dataView: { readOnly: false },
						magicType: { type: ['line', 'bar'] },
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [],
					axisLabel: {
						interval: 0,
						rotate: 45,
					}
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						formatter: '{value}'
					}
				},
				series: [{
					name: '',
					type: 'line',
					itemStyle: {
						normal: {
							color: '#28a8e0',
							lineStyle: {
								color: '#28a8e0'
							}
						}
					},
					data: [],
				}, ]
			}
		};
	},
	watch: {
		echarts: 'initEchart'
	},
	mounted() {
		if (this.echarts) {
			this.initEchart();
		}
		this.getConsumeOrGrowthTrend();
	},
	methods: {
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		changeType: function(item) {
			//选择渠道
			let id = item.id;
			this.trendId = id;
			this.getConsumeOrGrowthTrend();
		},
		initEchart() {
			//实例化图表
			this.barDom = this.echarts.init(
				document.getElementById('bar-charts')
			);
			this.barDom.setOption(this.option, true);
		},
		checkForm: function() {
			if (this.startTime - this.endTime > 0) {
				this.$store.commit('setWin', {
					content: '开始时间不能大于结束时间'
				});
				return false;
			}
			if (this.endTime - this.startTime > constant + oneDay) {
				this.$store.commit('setWin', {
					content: '时间跨度不能大于一个月'
				});
				return false;
			}
			return true;
		},
		async getConsumeOrGrowthTrend() {
			if (!this.checkForm()) return;
			let data = await http.getConsumeOrGrowthTrend({
				data: {
					type: this.trendId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000)
				}
			});
			if (data != '') {
				this.option.xAxis.data = [];
				this.option.series[0].data = [];
				for (let key in data) {
					this.option.xAxis.data.push(key);
					this.option.series[0].data.push(data[key]);
				}
				if (this.echarts) {
					this.initEchart();
				}
			}
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
	}
};
</script>
<style scoped>
.broken {
	max-width: 1247px;
	height: 401px;
	border: 1px solid #D2D2D2;
	margin-bottom: 20px;
}

.broken .filter {
	margin-top: 20px;
}

.filter .input-box {
	display: inline-block;
	vertical-align: middle;
}

.filter .order-order-searchA,
.filter .order-order-search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29A7E1;
	cursor: pointer;
	margin: 0;
	vertical-align: middle;
	border-radius: 0;
}

.filter .order-order-searchA {
	margin-left: -4px;
}

.filter .order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}

.filter .order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

.filter .order-order-searchA:active {
	background-color: #154961;
}

.handle-tips {
	display: inline-block;
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

.filter {
	display: flex;
	justify-content: center;
}

.filter span {
	width: 120px;
	height: 40px;
	display: inline-block;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	background-color: #f2f2f2;
	border-radius: 4px;
	margin-right: 15px;
}

.filter .effect {
	background-color: #28a8e0;
	color: #ffffff;
}

.broken .chart-box {
	width: 100%;
	height: 340px;
}
</style>