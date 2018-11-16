<!--会员分析 折线图-->
<template>
	<div class="broken">
		<!-- 筛选项 -->
		<div class="filter">
			<section>
				<span v-for="(item,index) in trend" :key="index" :class="{'effect':trendId == item.id}" @click="changeType(item)">{{item.name}}</span>
				<div class="input-box">
					<!--日期组件 开始时间-->
					<!-- <calendar :time="startTime" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar> -->
					<el-date-picker v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false">
					</el-date-picker>
				</div>
				<s>-</s>
				<div class="input-box">
					<!--日期组件 开始时间-->
					<!-- <calendar :time="endTime" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar> -->
					<el-date-picker v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false">
					</el-date-picker>
				</div>
				<el-button type="primary" icon="el-icon-search" @click="getConsumeOrGrowthTrend" style="margin-left: -4px;"></el-button>
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
<script type="text/javascript">
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import utils from 'src/verdor/utils';
	let constant = global.timeConst.ONEMONTH; //一个月
	let oneDay = global.timeConst.ONEDAY; //一天

	export default {
		props: ['echarts'],
		data() {
			return {
				trend: [{
					id: 0,
					name: '会员翻台次'
				}, {
					id: 1,
					name: '会员增长趋势'
				},
				{
					id: 2,
					name: '会员消费趋势'
				}
				], //类型
				trendId: 0,
				startTime: new Date().setHours(23, 59, 59, 999) - constant + oneDay, //获取当月一号的零点时间戳,
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
				},
				memberIncrease: '', //会员增长趋势数据
				consumeList: '', //会员消费趋势数据
				consumeTableList: '', //桌台翻台趋势
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
				this.intheDate(this.trendId);
				//this.getConsumeOrGrowthTrend();
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
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000)
					}
				});
				if (data != '') {
					let consumeList = this.getTotal(data.consumeList);
					let consumeTableList = this.getTotal(data.consumeTableList);
					let memberIncrease = data.memberIncrease;
					this.consumeList = this.mergeData(consumeList);
					this.consumeTableList = this.mergeData(consumeTableList);
					this.memberIncrease = this.mergeData(memberIncrease);
					//console.log(dateObj)
					this.intheDate(this.trendId);
				}
			},
			intheDate: function(type) {
				switch (Number(type)) {
					case 0:
						this.dataProcessing(this.consumeTableList);
						break;
					case 1:
						this.dataProcessing(this.memberIncrease);
						break;
					case 2:
						this.dataProcessing(this.consumeList);
						break;
				}
			}, //放进数据
			dataProcessing: function(data) { //数据处理
				this.option.xAxis.data = [];
				this.option.series[0].data = [];
				for (let key in data) {
					this.option.xAxis.data.push(key);
					this.option.series[0].data.push(data[key]);
				}
				if (this.echarts) {
					this.initEchart();
				}
			},
			getTotal: function(dataList) { //求和
				let list = dataList;
				for (let key in list) {
					list[key] = Number(list[key].cnt1) + Number(list[key].cnt2) + Number(list[key].cnt3);
				}
				return list;
			},
			checkTime: function(i) { //补零法
				if (i < 10) {
					i = '0' + i;
				}
				return i;
			},
			format: function(time) { //日期格式化
				let s = '';
				s += time.getFullYear() + '-'; // 获取年份。
				s += this.checkTime((time.getMonth() + 1)) + '-'; // 获取月份。
				s += this.checkTime(time.getDate()); // 获取日。
				return (s); // 返回日期。
			},
			getDayAll: function(begin, end) {
				let dateAllArr = new Array();
				let ab = begin.split('-');
				let ae = end.split('-');
				let db = new Date();
				db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
				let de = new Date();
				de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
				let unixDb = db.getTime();
				let unixDe = de.getTime();
				for (let k = unixDb; k <= unixDe;) {
					dateAllArr.push(this.format((new Date(parseInt(k)))).toString());
					k = k + 24 * 60 * 60 * 1000;
				}
				return dateAllArr;
			},
			formatTime(time) {
				if (time.length == 10) {
					time *= 1000;
				}
				return utils.format(new Date(time), 'yyyy-MM-dd');
			},
			mergeData: function(oldDate) { //合并数据
				let obj = {};
				let dateObj = {};
				let dateArr = this.getDayAll(this.formatTime(this.startTime), this.formatTime(this.endTime));
				for (let item of dateArr) {
					let date = item;
					dateObj = Object.assign(obj, {
						[date]: 0
					});
				}
				let newDates = dateObj;
				for (let key in newDates) {
					for (let key1 in oldDate) {
						if (key1 == key) {
							newDates[key] = oldDate[key1];
							break;
						}
					}
				}
				return newDates;
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
		background: url(../../../res/images/search.png) center center no-repeat;
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
		background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
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
		background-color: #E1BB4A;
		color: #ffffff;
	}

	.broken .chart-box {
		width: 100%;
		height: 340px;
	}
</style>