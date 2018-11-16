<template>
	<div id="member_analysis">
		<section style="margin-bottom:20px;">
			<com-table :listHeight='80' :listWidth="1247" :showHand="false" :titleData="titleList" :introData="staticLists" :widthType='true'>
				<div v-for="(item,index) in title" :slot="`title-${index + 1}`" class="title">
					<span>{{item.name}}</span>
					<div class="prompting" @click="isPublicNumber(index)">
						<div class="detDiv" v-if="item.isPublicNumber">
							<i class="detI triright"></i>
							<h3 class="detH3">
							{{item.tit}}
						</h3>
						</div>
					</div>
				</div>
			</com-table>
		</section>
		<!-- 昨日 今日 -->
		<div class="compared">
			<!-- 时间选择器 -->
			<section class="timer clearfix">
				<el-date-picker v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false" @change="selectdate">
				</el-date-picker>
				<!-- <el-button type="primary" icon="el-icon-search" style="margin-left: -4px;"></el-button> -->
			</section>
			<p>已选中:{{formatTime(selecteDate)}}</p>
			<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span>
		</div>
		<!-- 昨日 今日数据 -->
		<div class="data">
			<div class="data_l">
				<div class="data_t">{{payName}}新增会员(人)</div>
				<div class="data_b">
					<section>
						<h1>{{bigDate.totalMember}}</h1>
						<div class="percentage">
							<div class="percentage_l">
								<p class="first_p">新会员消费占比</p>
								<p>{{bigDate.newconsumptionZB}}</p>
							</div>
							<div class="percentage_r">
								<p class="first_p">老会员消费占比</p>
								<p>{{bigDate.oldconsumptionZB}}</p>
							</div>
							<!-- <div class="percentage_r">
								<p class="first_p">非会员消费占比</p>
								<p>{{bigDate.nonconsumptionZB}}</p>
							</div> -->
						</div>
					</section>
				</div>
				<!-- 翻台 -->
				<div class="turnTable" style="padding-left: 74px;">
					<section>
						<div class="percentage">
							<div class="percentage_l">
								<p class="first_p">新会员翻台率</p>
								<p>{{bigDate.newturntableZB}}</p>
							</div>
							<div class="percentage_r">
								<p class="first_p">老会员翻台率</p>
								<p>{{bigDate.oldturntableZB}}</p>
							</div>
							<div class="percentage_r">
								<p class="first_p">非会员翻台率</p>
								<p>{{bigDate.nonturntableZB}}</p>
							</div>
						</div>
					</section>
				</div>
			</div>
			<div class="data_l">
				<div class="data_t">{{payName}}会员消费(元)</div>
				<div class="data_b">
					<h1>{{bigDate.totalConsumption}}</h1>
					<div class="percentage">
						<div class="percentage_l">
							<p class="first_p">新会员消费金额</p>
							<p>{{bigDate.newconsumption}}</p>
						</div>
						<div class="percentage_r">
							<p class="first_p">老会员消费金额</p>
							<p>{{bigDate.oldconsumption}}</p>
						</div>
						<!-- <div class="percentage_r">
							<p class="first_p">非会员消费金额</p>
							<p>{{bigDate.nonconsumption}}</p>
						</div> -->
					</div>
				</div>
				<!-- 翻台 -->
				<div class="turnTable" style="padding-right: 74px;">
					<section style="padding-left: 74px;">
						<div class="percentage">
							<div class="percentage_l">
								<p class="first_p">新会员翻台(次)</p>
								<p>{{bigDate.newturntable}}</p>
							</div>
							<div class="percentage_r">
								<p class="first_p">老会员翻台(次)</p>
								<p>{{bigDate.oldturntable}}</p>
							</div>
							<div class="percentage_r">
								<p class="first_p">非会员翻台(次)</p>
								<p>{{bigDate.nonturntable}}</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
		<!-- 折线图 -->
		<analysisLine :echarts="echarts"></analysisLine>
		<!-- 饼状图 -->
		<analysisPie :echarts="echarts" :pie="pie"></analysisPie>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	// import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	// import global from 'src/manager/global';
	let times = new Date().setHours(0, 0, 0, 0) - 86400000;
	export default {
		data() {
			return {
				startTime: new Date().setHours(0, 0, 0, 0), //时间
				titleList: [{
					titleName: '会员总量',
					dataName: 'totalMember'
				},
				{
					titleName: '储值余额',
					dataName: 'totalAmount'
				},
				{
					titleName: '积分余量 ',
					dataName: 'totalPoint'
				}
				],
				staticLists: [], //数据
				payWays: [{
					id: 0,
					name: '昨日'
				},
				{
					id: 1,
					name: '今日'
				}
				], //类型			
				payType: 0,
				payName: '昨日',
				publicNumber: false, //公众号标题提醒
				title: [{
					name: '储值余额',
					tit: '包含电子卡+实体卡余额总量',
					isPublicNumber: false
				},
				{
					name: '积分余量',
					tit: '包含会员+粉丝的积分总量',
					isPublicNumber: false
				}
				],
				echarts: null, //百度图文
				pie: [], //饼图所需要的数据
				compareData: {}, //昨日今日数据
				selecteDate: new Date().setHours(0, 0, 0, 0), //已选中的日期
				dateFormat: '', //日期格式化
				newMemberNum: '', //会员数
				consumeList: '', //消费金额
				consumeTableList: '', //返台次数
				bigDate: { //大数据
					totalMember: '0', //会员总人数
					totalConsumption: '0', //消费总额
					totalconsumeTable: '0', //总翻台次数
					newconsumption: '0', //新会员消费
					oldconsumption: '0', //老会员消费
					nonconsumption: '0', //非会员消费
					newturntable: '0', //新会员翻台
					oldturntable: '0', //老会员翻台
					nonturntable: '0', //非会员翻台
					newconsumptionZB: '0', //新会员消费占比
					oldconsumptionZB: '0', //老会员消费占比
					nonconsumptionZB: '0', //非会员消费占比
					newturntableZB: '0', //新会员翻台占比
					oldturntableZB: '0', //老会员翻台占比
					nonturntableZB: '0', //非会员翻台占比								
				}
			};
		},
		methods: {
			formatTime(time) {
				if (time.length == 10) {
					time *= 1000;
				}
				return utils.format(new Date(time), 'yyyy-MM-dd');
			},
			selectdate: function(time) { //选择日期
				this.selecteDate = time;
				this.payName = this.formatTime(time);
				this.dateFormat = this.formatTime(time);
				this.payType = '-1';
				this.getConsumeAndGrowth();
			},
			changeRadio: function(item) {
				//选择渠道
				let id = item.id;
				this.payType = id;
				this.payName = item.name;
				if (this.payType == 0) {
					this.dateFormat = this.formatTime(times);
				} else {
					this.dateFormat = this.formatTime(new Date().setHours(0, 0, 0, 0));
				}
				this.dataProcessing(this.newMemberNum, this.consumeList, this.consumeTableList);
			},
			isPublicNumber: function(ind) { //提示的状态
				this.title[ind].isPublicNumber = !this.title[ind].isPublicNumber;
			},
			percentage: function(num, total) {
				if (total == 0) {
					return '0%';
				} else {
					return (Math.round(num / total * 10000) / 100.00 + '%'); // 小数点后两位百分比
				}
			},
			async getEcharts() {
				let data = await
				import ( /* webpackChunkName:'echarts' */ 'src/verdor/echarts');
				this.echarts = data;
			},
			async memberRemainAndAccounted() { //获取会员总量和性别占比
				let data = await http.memberRemainAndAccounted({});
				if (data) {
					this.staticLists.push(data.total); //获取头部的数据
					this.pie = data.accounted; //饼图的数据
				}
			},
			async getConsumeAndGrowth() { //昨日今日的会员消费占比
				let data = await http.getConsumeAndGrowth({
					data: {
						time: parseInt(this.startTime / 1000) //昨日今日
					}
				});
				if (data) {
					this.newMemberNum = data.newMemberNum; //获取会员数量
					this.consumeList = data.consumeList; //消费金额
					this.consumeTableList = data.consumeTableList; //翻台次数
					this.dataProcessing(this.newMemberNum, this.consumeList, this.consumeTableList);
				}
			},
			dataProcessing: function(newMemberNum, consumeList, consumeTableList) { //数据处理
				let bigDate = {
					totalMember: '0', //会员总人数
					totalConsumption: '0', //消费总额
					totalconsumeTable: '0', //总翻台次数
					newconsumption: '0', //新会员消费
					oldconsumption: '0', //老会员消费
					nonconsumption: '0', //非会员消费
					newturntable: '0', //新会员翻台
					oldturntable: '0', //老会员翻台
					nonturntable: '0', //非会员翻台
					newconsumptionZB: '0', //新会员消费占比
					oldconsumptionZB: '0', //老会员消费占比
					nonconsumptionZB: '0', //非会员消费占比
					newturntableZB: '0', //新会员翻台占比
					oldturntableZB: '0', //老会员翻台占比
					nonturntableZB: '0', //非会员翻台占比					
				};
				//获取会员总数
				let member = newMemberNum[this.dateFormat];
				if (member && member != '') {
					bigDate.totalMember = member;
				}
				//消费金额和消费占比
				let list = consumeList[this.dateFormat];
				if (list && list != '') {
					//消费总额
					bigDate.totalConsumption = Number(list.cnt1) + Number(list.cnt2) + Number(list.cnt3);
					bigDate.newconsumption = list.cnt1;
					bigDate.oldconsumption = list.cnt2;
					bigDate.nonconsumption = list.cnt3;
					bigDate.newconsumptionZB = this.percentage(bigDate.newconsumption, bigDate.totalConsumption);
					bigDate.oldconsumptionZB = this.percentage(bigDate.oldconsumption, bigDate.totalConsumption);
					bigDate.nonconsumptionZB = this.percentage(bigDate.nonconsumption, bigDate.totalConsumption);
				}
				let tableList = consumeTableList[this.dateFormat];
				if (tableList && tableList != '') {
					//翻台次数
					bigDate.totalconsumeTable = Number(tableList.cnt1) + Number(tableList.cnt2) + Number(tableList.cnt3);
					bigDate.newturntable = tableList.cnt1;
					bigDate.oldturntable = tableList.cnt2;
					bigDate.nonturntable = tableList.cnt3;
					bigDate.newturntableZB = this.percentage(bigDate.newturntable, bigDate.totalconsumeTable);
					bigDate.oldturntableZB = this.percentage(bigDate.oldturntable, bigDate.totalconsumeTable);
					bigDate.nonturntableZB = this.percentage(bigDate.nonturntable, bigDate.totalconsumeTable);
				}
				this.bigDate = bigDate;
			}
		},
		mounted() {
			this.dateFormat = this.formatTime(times);
			this.memberRemainAndAccounted();
			this.getEcharts(); //加载百度图标
			this.getConsumeAndGrowth();
		},
		created() {
			let obj1 = {
				titleStyle: {
					fontSize: 16 + 'px'
				}
			};
			let obj2 = {
				conStyle: {
					color: '#ff9800'
				}
			};
			for (let item of this.titleList) {
				Object.assign(item, obj1, obj2);
			}
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			detailsDes: () =>
				import ( /*webpackChunkName: 'details_des'*/ 'src/components/details_des'),
			analysisLine: () =>
				import ( /*webpackChunkName: 'analysis_line'*/ './analysis_line'),
			analysisPie: () =>
				import ( /*webpackChunkName: 'analysis_pie'*/ './analysis_pie'),
		}
	};
</script>
<style type="text/css" scoped>
	#member_analysis .title {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#member_analysis .title span {
		font-size: 16px;
	}

	#member_analysis .compared {
		max-width: 1247px;
		height: 40px;
		margin-bottom: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#member_analysis .compared .timer {
		margin-right: 15px;
	}

	#member_analysis .filter {
		display: flex;
		justify-content: center;
	}

	#member_analysis .compared p {
		margin-right: 15px;
	}

	#member_analysis .compared span,
	#member_analysis .filter span {
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

	#member_analysis .compared .effect,
	#member_analysis .filter .effect {
		background-color: #E1BB4A;
		color: #ffffff;
	}

	#member_analysis .title .prompting {
		display: inline-block;
		width: 40px;
		height: 40px;
		background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
		position: relative;
		vertical-align: middle;
		cursor: pointer;
	}

	#member_analysis .title .prompting .detDiv {
		display: inline-block;
		background: #45404b;
		position: absolute;
		top: 0px;
		left: 45px;
		padding: 10px;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 100;
	}

	#member_analysis .title .prompting .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: 10px;
		left: -20px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
	}

	#member_analysis .title .prompting .detDiv .detH3 {
		line-height: 30px;
		color: #e6e6e7;
		text-align: center;
	}

	#member_analysis .title .prompting .detDiv .triright {
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 10px solid #45404b;
		border-left: 10px solid transparent;
	}

	#member_analysis .data {
		max-width: 1247px;
		height: 356px;
		border: 1px solid #D2D2D2;
		margin-bottom: 18px;
		display: flex;
	}

	#member_analysis .data .data_l .turnTable {
		width: 100%;
		height: 74px;
	}

	#member_analysis .data .data_l .turnTable section {
		padding-top: 15px;
		width: 100%;
		height: 100%;
		border-top: 1px solid #D2D2D2;
	}

	#member_analysis .data .data_l {
		width: 50%;
		height: 100%;
	}

	#member_analysis .data .data_t {
		width: 100%;
		height: 50px;
		font-size: 16px;
		background: #F7F7F7;
		line-height: 50px;
		padding-left: 74px;
	}

	#member_analysis .data .data_b {
		width: 100%;
		height: 200px;
		padding: 30px 0px 20px 74px;
		/* border-bottom: 1px solid #D2D2D2; */
	}

	#member_analysis .data .data_b h1 {
		font-size: 44px;
		font-weight: normal;
		margin-bottom: 40px;
	}

	#member_analysis .data .percentage {
		width: 525px;
		height: 45px;
		display: flex;
		margin-bottom: 15px;
	}

	#member_analysis .data .percentage .percentage_l,
	#member_analysis .data .percentage .percentage_c,
	#member_analysis .data .percentage .percentage_r {
		width: 33.33%;
		height: 100%;
	}

	#member_analysis .data .percentage .first_p {
		margin-bottom: 15px;
	}

	/* #member_analysis .data .data_b .percentage .percentage_l {
		border-right: 1px solid #D2D2D2;
	} */

	#member_analysis .data .percentage .percentage_r {
		border-left: 1px solid #D2D2D2;
		padding-left: 18px;
	}

	#member_analysis .data .data_b section {
		width: 100%;
		height: 100%;
		border-right: 1px solid #D2D2D2;
	}
</style>