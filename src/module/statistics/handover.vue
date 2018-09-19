<template>
	<section id="orHandOver">
		<section v-if="!showDetails">
			<section class="orHandOverCon">
				<!-- 时间筛选 -->
				<section class="orHandOverTime yuChairFix">
					<section class="orMaRetBox yuChairFix">
						<calendar :time="startTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
					</section>
					<span class="zhi">至</span>
					<section class="orMaRetBox yuChairFix">
						<calendar :time="endTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
					</section>
					<a class="order-order-searchA" v-on:click="searInTime">
						<span class="order-order-search"></span>
					</a>
				</section>

				<!-- 表格 -->
				<table-com :showHand="false" :titleHeight='50' :showTitle="2" :titleData="titleData" :allTotal="3" :fixed="0" :widthType="true" :introData="handOverInfo" :contentStyle="{color:'#8f8f8f'}" :listWidth="1200">
					<span slot="con-9" slot-scope="props">
						<a v-on:click="showHand(props.data,props.index)" class="deepBlue detail-btn" href="javascript:void(0)">明细</a>
					</span>
				</table-com>
				<!--
			<section class="orHandOverMain">
				<ul class="orMaReMainList">
					<li class="yuChairFix">
						<span>接班时间</span>
						<span>交班时间</span>
						<span>交班人</span>
						<span>交班人职位</span>
						<span>营收总额</span>
						<span>开台次数</span>
						<span>挂账金额</span>
						<span>备用金</span>
						<span>服务费</span>
						<span style="float: right;">操作</span>
					</li>
					<li style="width: 100%;background-color: #F2F2F2;color: #F8931F; " v-if="handOverInfo.length == 0">今天还未进行交接班</li>
					<li style="display: table;width: 100%;" v-for="(item,i) in handOverInfo" class="yuChairFix" :key="i">
						<span>{{item.getTime}}</span>
						<span>{{item.giveTime}}</span>
						<span>{{item.userName}}</span>
						<span>{{item.roleName}}</span>
						<span>{{item.totalIncome}}</span>
						<span>{{item.allNum}}</span>
						<span>{{item.holdIncome}}</span>
						<span>{{item.pettyCash}}</span>
						<span>{{item.chargeIncome}}</span>
						<span style="float: right;"><a v-on:click="showHand(item)" class="deepBlue" href="javascript:void(0)">明细</a></span>
					</li>
					<li class="yuChairFix">
						<span>接班时间</span>
						<span>交班时间</span>
						<span>交班人</span>
						<span>交班人职位</span>
						<span>营收总额</span>
						<span>开台次数</span>
						<span>挂账金额</span>
						<span>备用金</span>
						<span>服务费</span>
						<span style="float: right;">操作</span>
					</li>
				</ul>

			</section>
			-->
				<div class="pageBox" v-if="total>1">
					<page :page="page" :total="total" :len="total>10?8:5" :type=1 @pageNum="goPage"></page>
				</div>
			</section>
		</section>
		<!-- 交接班明细 -->
		<section v-else id="statHaovDetails">
			<section class="loginTime yuChairFix">
				<span>{{hoverDetail.getTime}}</span>
				<span>{{hoverDetail.giveTime}}</span>
			</section>
			<section class="deInfo">
				<section class="deInfoBox">
					<h1>
						<span>基本信息</span>
					</h1>
					<ul class="basicInfo">
						<li class="yuChairFix">
							<span>交接人：{{hoverDetail.userName}}</span>
							<span>职位：{{hoverDetail.roleName}}</span>
							<span>备用金：¥{{hoverDetail.pettyCash}}</span>
							<span>开台数：{{hoverDetail.allNum}}</span>
						</li>
						<li class="yuChairFix">
							<span>总订单数：{{hoverDetail.havePayNum}}</span>
							<span>挂账单数：{{hoverDetail.holdNum}}</span>
							<span>现金找零：{{hoverDetail.cashChange}}</span>
						</li>
					</ul>
				</section>
				<section class="deInfoBox yuChairFix">
					<h1>
						<span>总收入：¥{{hoverDetail.totalIncome}}</span>
					</h1>
					<ul class="basicInfo">
						<li class="yuChairFix">
							<span>现金支付：¥{{hoverDetail.cash}}</span>
							<span>微信支付：¥{{hoverDetail.wx}}</span>
							<span>余额支付：¥0.00</span>
							<span>服务费：¥{{hoverDetail.chargeIncome}}</span>
						</li>
						<li class="yuChairFix">
							<span>银联支付：¥{{hoverDetail.bank}}</span>
							<span>支付宝支付：¥{{hoverDetail.ali}}</span>
							<span>其他支付：¥{{hoverDetail.other}}</span>
							<span>挂账金额：¥{{hoverDetail.holdIncome}}</span>
						</li>
						<li class="yuChairFix">
							<span>中信支付宝(上海)：¥{{hoverDetail.shzxAli}}</span>
							<span>中信微信(上海)：¥{{hoverDetail.shzxWx}}</span>
							<span>中信支付宝(杭州)：¥{{hoverDetail.hzzxAli}}</span>
							<span>中信微信(杭州)：¥{{hoverDetail.hzzxWx}}</span>
						</li>
					</ul>
				</section>
			</section>
		</section>
	</section>
</template>

<script>
/**交接班 */
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
let userData = storage.session('userShop'); //sd.session("userShop");
export default {
	data() {
		return {
			handOverInfo: [], // 总数据
			hoverDetail: null,
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //(new Date()).getTime() + 1000 * ((59 -  new Date().getSeconds()) + 60 * (59 - new Date().getMinutes()) + 60 * 60 * (24 - new Date().getHours()-1)), //日期组件的结束时间
			page: 1, // 当前页
			num: 10, // 每页显示数量
			total: 1, // 总页数
			showDay: false, //显示隐藏返回按钮
			showDetails: false, // 显示明细
			selectedType: 0,

			titleData: [
				{
					titleName: '接班时间',
					dataName: 'getTime',
					titleStyle: { width: '150px' }
				},
				{
					titleName: '交班时间',
					dataName: 'giveTime',
					titleStyle: { width: '150px' }
				},
				{ titleName: '交班人', dataName: 'userName' },
				{ titleName: '交班人职位', dataName: 'roleName' },
				{ titleName: '营收总额', dataName: 'totalIncome' },
				{ titleName: '开台次数', dataName: 'allNum' },
				{ titleName: '挂账金额', dataName: 'holdIncome' },
				{ titleName: '备用金', dataName: 'pettyCash' },
				{ titleName: '服务费', dataName: 'chargeIncome' },
				{ titleName: '操作' }
			]
		};
	},
	watch: {
		showDetails: function() {
			let obj = !this.showDetails
				? {  }
				: {
					name: '返回',
					className: ['back'],
					fn: () => {
						this.returnPage();
					}
				};
			this.$store.commit('setPageTools', [obj]);
		}
	},
	methods: {
		startTimeChange: function(data) {
			this.startTime = new Date(data).setHours(0, 0, 0, 0);
		},
		endTimeChange: function(data) {
			this.endTime = new Date(data).setHours(23, 59, 59, 999);
		},
		checkDate: function() {
			// let day = new Date(Number(this.endTime));
			let firstDay = new Date(Number(this.endTime)).setDate(1);
			firstDay = new Date(firstDay).setHours(0, 0, 0, 0); // 按照结束时间的第一天计算
			if (this.startTime < firstDay) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '很抱歉,选择的时间段不能跨月'
				});
				this.startTime = firstDay;
				return false;
			}
			if (
				parseInt(this.startTime / 1000) > parseInt(this.endTime / 1000)
			) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '开始时间不能大于结束时间'
				});
				return false;
			}
		},
		async getChangeShiftsList() {
			let data = await http.getChangeShiftsList({
				data: {
					// shopId: userData.currentShop.id,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					page: this.page,
					num: this.num
				}
			});
			if (data) {
				let list = data.list;
				for (let i = 0; i < list.length; i++) {
					list[i].getTime = utils.format(
						new Date(list[i].getTime * 1000),
						'yyyy.MM.dd/hh:mm'
					); //.format('yyyy.MM.dd/hh:mm');
					list[i].giveTime = utils.format(
						new Date(list[i].giveTime * 1000),
						'yyyy.MM.dd/hh:mm'
					); //.format('yyyy.MM.dd/hh:mm');
				}
				this.handOverInfo = list;
				this.total = data.total;
			}
		},
		// 初始化方法
		init: function() {
			// let day = new Date();
			this.getChangeShiftsList();
		},

		// 根据时间搜索
		searInTime: function() {
			this.checkDate();
			this.startTime = new Date(this.startTime).setHours(0, 0, 0, 0); //.getZero();
			// let endT = this.endTime+1000 * 60 * 60 * 24 * 1;
			this.endTime = new Date(this.endTime).setHours(23, 59, 59, 999); //new Date(endT).getZero() - 1000;
			this.init();
		},

		// 展示明细
		showHand: function(data) {
			this.hoverDetail = data;
			this.showDetails = true;
			this.showDay = true;
		},

		// 跳页
		goPage: function(obj) {
			this.page = parseInt(obj.page);
			this.init();
		},
		//点击返回按钮
		returnPage: function() {
			this.showDay = false;
			this.showDetails = false;
		}
	},
	components: {
		Calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		Page: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		tableCom: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	created: function() {
		this.init();
	}
};
</script>

<style lang="less" scoped>
.yuChairFix:after {
	content: '';
	height: 0;
	display: block;
	clear: both;
}
#orHandOver {
	margin-top: 20px;
	position: relative;
	.pageBox {
		padding-top: 20px;
	}
	.orMaReMainList {
		li {
			&:first-of-type,
			&:last-of-type {
				background: #e6e6e6;
			}
			&:nth-of-type(even) {
				background: #f2f2f2;
			}
			&:nth-of-type(2) {
				text-align: center;
				height: 50px;
				line-height: 50px;
			}
			span {
				display: block;
				text-align: center;
				height: 50px;
				line-height: 50px;
				width: 9%;
				color: #8f8f8f;
				float: left;
				position: relative;

				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				&:nth-of-type(1) {
					width: 15%;
				}
				&:nth-of-type(2) {
					width: 16%;
				}
				&:nth-of-type(4) {
					width: 8%;
				}
				&:nth-of-type(7) {
					width: 7%;
				}
				a {
					width: 100% !important;
					color: #fff;
					font-size: 12px;
					height: 49px;
					margin-top: 1px;
					margin-left: 1px;
					display: block;
					float: right;
				}
			}
		}
	}
	.orHandOverTime {
		padding-bottom: 25px;
	}
	.order-order-searchA,
	.order-order-search,
	.order-order-inquire {
		display: inline-block;
		float: left;
		height: 40px;
		width: 40px;
		background-color: #29a7e1;
		cursor: pointer;
	}
	.order-order-search {
		// background: url('src/res/images/search.png') center center no-repeat;
		background: url(../../res/images/search.png) center center no-repeat;
	}
	.orMaRetBox:last-of-type .order-order-searchA:hover {
		background-color: #1878a5;
		transition: background-color ease-in-out 0.2s;
	}
	.orMaRetBox:last-of-type .order-order-searchA:active {
		background-color: #154961;
	}
	.deepBlue {
		background: #2980b9;
	}
	.blue {
		background: #00adef;
	}
	.red {
		background: #ec1515;
	}
	.orange {
		background: #f8931f;
	}
	// 明细按钮
	.detail-btn {
		display: block;
	}
	.circle {
		width: 26px;
		height: 26px;
		border: 1px #c7c7c7 solid;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -13px;
		margin-top: -13px;
		background: #fff;
		&.active {
			// background: url(res/icon/selected.png) center center no-repeat, #28A8E0;
		}
	}
	.orMaReBatch {
		position: absolute;
		top: -60px;
		right: 100px;
		a {
			color: #fff;
			margin-left: 10px;
			&.active {
				background: #2980b9;
			}
			&.disabled {
				background: #b3b3b3;
				cursor: not-allowed;
			}
		}
	}
	.orMaRetBox {
		width: 202px;
		float: left;
	}
	.zhi {
		text-align: center;
		width: 35px;
		height: 40px;
		line-height: 40px;
		display: block;
		float: left;
	}
}
#statHaovDetails {
	margin-right: 90px;
	padding-top: 25px;
	.loginTime {
		margin-bottom: 20px;
		span {
			font-size: 14px;
			display: block;
			width: 50%;
			float: left;
		}
	}
	.deInfo {
		.deInfoBox {
			padding-bottom: 1px;
			margin-bottom: 10px;
			background: #f2f2f2;
			h1 {
				padding: 11px 0;
				background: #e6e6e6;
				margin: 0;
				span {
					height: 28px;
					line-height: 28px;
					padding-left: 23px;
					display: block;
					border-left: 2px #f7941d solid;
				}
			}
			ul {
				height: 150px;
				padding: 0;
				margin: 0;
				padding-left: 25px;
				padding-top: 20px;
				li {
					padding-bottom: 1px;
					list-style: none;
					margin-bottom: 20px;
					span {
						display: block;
						width: 25%;
						float: left;
					}
				}
			}
		}
	}
}
</style>
