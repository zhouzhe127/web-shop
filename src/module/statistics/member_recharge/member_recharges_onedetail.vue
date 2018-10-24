/** * 会员充值统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<section v-if="isShow == 'all'">
			<!-- 已经选择的店铺 -->
			<div class="choiceshop">
				<div class="choiceshop_l">
					选择店铺:
				</div>
				<div class="choiceshop_r">
					{{constructionsName}} | 选择时间:{{formatTime(startTime)}} - {{formatTime(endTime)}}
				</div>
			</div>
			<section style="margin-bottom:20px;">
				<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
					<div slot="con-0" slot-scope="props">
						1
					</div>
					<div slot="con-11" slot-scope="props" @click="openPayment(props.data,'one')">
						{{props.data.totalOtherPay}}
					</div>
				</com-table> -->
				<el-table :data="staticLists" border style="width: 1400px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column fixed prop="days" label="天数" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #ff9800">1</span>
						</template>
					</el-table-column>
					<el-table-column prop="rechargePersonNum" label="充值人数" width="111" align="center">
					</el-table-column>
					<el-table-column prop="rechargeNum" label="充值次数" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalRecharge" label="充值总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalPayment" label="支付总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalCash" label="现金" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalCard" label="银行卡" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalWeChat" label="微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalSQWeChat" label="收钱吧微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalAliPay" label="支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalSQAliPay" label="收钱吧支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXWeChat" label="中信微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXSHWeChat" label="中信(上海)微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXAliPay" label="中信支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXSHAliPay" label="中信(上海)支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalOtherPay" label="自定义支付" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #27a8e0;" @click="openPayment(scope.row,'one')">{{scope.row.totalOtherPay}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="totalGiftAmount" label="赠送总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalGiftPoint" label="赠送积分" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalGiftCoupon" label="赠送优惠券" width="111" align="center">
					</el-table-column>
				</el-table>
			</section>
			<!-- <section> -->
			<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList" :listName="'会员充值统计'" :key="index" :showTitle='1' :allTotal="count">
					<div slot="con-0" slot-scope="props" @click="openDetail(props.data)">
						查看账户
					</div>
					<div slot="con-1" slot-scope="props">
						{{formatTime(props.data.createTime)}}
					</div>
					<div slot="con-3" slot-scope="props">
						<span v-if="props.data.cardNumber == ''">电子卡</span>
						<span v-else>{{props.data.cardTypeName}}</span>
					</div>						
					<div slot="con-8" slot-scope="props">
						{{getpaytypeName(props.data.payType) || payTypeList[props.data.payType].paymentName}}
					</div>
					<div slot="con-12" slot-scope="props" @click="openDiscount(props.data)">
						{{props.data.giftCoupon}}
					</div>
				</com-table> -->
			<!-- </section> -->
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>会员充值统计</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="formList" border style="width: 1500px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column fixed prop="shopId" label="操作" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #27a8e0" @click="openDetail(scope.row)">查看账户</span>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="时间" width="183" align="center">
					</el-table-column>
					<el-table-column prop="cardNumber" label="卡号" width="180" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.cardNumber == ''">--</span>
							<span v-else>{{scope.row.cardNumber}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="cardTypeName" label="卡类型" width="111" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.cardNumber == ''">电子卡</span>
							<span v-else>{{scope.row.cardTypeName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="mobile" label="手机号" width="140" align="center">
					</el-table-column>
					<el-table-column prop="memberName" label="会员姓名" width="111" align="center">
					</el-table-column>
					<el-table-column prop="recharge" label="充值金额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="payment" label="支付金额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="payType" label="支付方式" width="111" align="center">
						<template slot-scope="scope">
							<span>{{getpaytypeName(scope.row.payType) || payTypeList[scope.row.payType].paymentName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="staffName" label="操作员" width="111" align="center">
					</el-table-column>
					<el-table-column prop="giftAmount" label="赠送总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="giftPoint" label="赠送积分" width="111" align="center">
					</el-table-column>
					<el-table-column prop="giftCoupon" label="赠送优惠券" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #27a8e0;" @click="openDiscount(scope.row)">{{scope.row.giftCoupon}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 翻页 -->
			<!-- <section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section> -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<!-- 优惠券详情的弹窗 -->
			<coupon-detail v-if='showWin' @getAppliedWin='getResult' :CouponDetails='CouponDetails'></coupon-detail>
			<!-- 其他支付方式的弹窗 -->
			<paymentWin v-if="preferentialBounced" @toClick="whetherToclick" :otherPayDetail='otherPayDetail' :shopsList='shopsList' :paymentType='paymentType' :paymentShopId='paymentShopId'></paymentWin>
		</section>
		<!-- 卡号详情实体卡 -->
		<cardDetail v-if="isShow == 'detail'" @throwWinResult="getDetail" :cardNumber="cardNumber"></cardDetail>
		<!-- 会员信息详情电子卡 -->
		<memberDetail v-if="isShow == 'member'" :mid='mid' :shopsId='shopsId' @throwWinResult="getDetail"></memberDetail>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import { mixin } from './mixin.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				page: 1,
				num: 10,
				endTotal: 1,
				index: null,
				goodsName: '', //订单号
				staticLists: [], //数据
				staticshopLists: [], //店铺查询的数据 
				showWin: false, //弹窗默认关闭状态
				isPopupwindow: '',
				allFormList: [], //所有的数据
				formList: [], //展示的数据
				allLists: [], //所有的数据  筛选订单
				count: '', //记录的条数
				payTypeList: {}, //支付方式
				isShow: 'all',
				cardNumber: '',
				mid: '',
				shopsId: ''
			};
		},
		methods: {
			getcommodity: function() {
				let reg = new RegExp(this.goodsName);
				let arr = [];
				arr = this.allLists.filter((item) => {
					return reg.test(item.oid);
				});
				this.allFormList = Object.values(arr);
				this.setPage();
			},
			reset: function() {
				this.page = 1;
				this.goodsName = '';
				this.getRechargeData();
			},
			returnShopstatic: function() {
				this.$emit('throwWinResult', 'all');
			},
			// getPageNum: function(obj) {
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.getRechargeData();
			// },
			async getRechargeData() {
				let data = await http.getRechargeData({
					data: {
						taskId: this.taskId, //任务id
						showDetail: 1, //查看详情
						showShopId: this.constructionsId, //单店的id
						showDay: '',
						page: this.page,
						num: this.num
					}
				});
				if (data) {
					this.count = data.count;
					this.endTotal = data.total;
					this.staticLists = [];
					this.staticLists.push(data.list.total); //头部的数据
					this.formList = data.list.list; //body数据
					this.payTypeList = data.list.total.otherPayDetail;
				}
			},
			formatTime(time) {
				if (time.length == 10) {
					time *= 1000;
				}
				return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
			},
			getpaytypeName: function(type) {
				switch (Number(type)) {
					case 1:
						return '现金';
					case 2:
						return '银联';
					case 3:
						return '微信';
					case 4:
						return '支付宝';
					case 5:
						return '会员卡';
					case 6:
						return '中信微信支付';
					case 7:
						return '中信支付宝支付';
					case 10:
						return '微信企业支付';						
					case 23:
						return '上海中信';
					case 24:
						return '上海中信支付宝';
					case 27:
						return '收钱吧微信';	
					case 28:
						return '收钱吧支付宝';										
				}
			},
			async Export() {
				await http.exportRechargeData({
					data: {
						taskId: this.taskId, //任务Id
						showDetail: 1, //是否查看一家店铺的数据
						showShopId: this.constructionsId, // 查询一家店铺的数据的Id
						showDay: '', //查看一家店铺传递的日期
						page: this.page, //页码
						num: this.num, //每页显示的条数	
						isExport: 1
					}
				});
			},
			//子组件返回的事件
			getDetail() { //从卡详情返回回来
				this.isShow = 'all';
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['fd-blue'],
					fn: () => {
						this.returnShopstatic();
					}
				}, {
					name: '导出',
					className: ['fd-blue'],
					fn: () => {
						this.Export();
					}
				}]);
			},
			openDetail: function(item) { //点击查看详情
				if (item.cardNumber == '') {
					this.isShow = 'member';
					this.mid = item.memberId;
					this.shopsId = item.shopId;
				} else {
					this.cardNumber = item.cardNumber;
					this.isShow = 'detail';
				}
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.getRechargeData();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getRechargeData();
			},
		},
		props: {
			constructionsName: String, //店铺名称
			startTime: Number, //开始时间
			endTime: Number, //结束时间
			constructionsId: String, //店铺的id
			isOpenTime: Boolean,
			taskId: Number,
			shopsList: Array
		},
		components: {
			pageElement: () =>
				import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
			'coupon-detail': () =>
				import ( /*webpackChunkName: "member_recharge_couponwin"*/ './member_recharge_couponwin'),
			paymentWin: () =>
				import ( /*webpackChunkName: "payment_win"*/ './payment_win'),
			//详情
			cardDetail: () =>
				import ( /*webpackChunkName: 'card_queries_detail'*/ './../../member_system/card_queries_detail'),
			memberDetail: () =>
				import ( /*webpackChunkName: 'member_manage_detail'*/ './../../member_system/member_manage_detail'),
		},
		// created() {
		// 	let obj1 = {
		// 		titleStyle: {
		// 			fontSize: 16 + 'px'
		// 		}
		// 	};
		// 	let obj2 = {
		// 		conStyle: {
		// 			'color': '#ff9800'
		// 		}
		// 	};
		// 	for (let item of this.titleList) {
		// 		if (item.dataName != 'totalOtherPay') {
		// 			Object.assign(item, obj1, obj2);
		// 		}
		// 	}
		// 	for (let item of this.shoptitleList) {
		// 		if (item.dataName != 'cardNumber' && item.dataName != 'createTime') {
		// 			Object.assign(item, obj1);
		// 		}
		// 	}
		// },
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnShopstatic();
				}
			}, {
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.Export();
				}
			}]);
			this.getRechargeData();

		},
		destroyed() {
			clearInterval(this.timer);
		}

	};
</script>
<style type="text/css" scoped>
	#membercard {
		width: 1437px;
		height: 100%;
	}

	#membercard .search {
		width: 100%;
		height: 42px;
		margin-bottom: 18px;
	}

	#membercard .search span {
		font-size: 16px;
		margin-right: 15px;
	}

	#membercard .search input {
		width: 183px;
		height: 41px;
		text-indent: 10px;
		margin-right: 15px;
	}

	#membercard .search a {
		width: 101px;
		height: 42px;
		text-align: center;
		line-height: 42px;
		margin-right: 15px;
	}

	#membercard .choiceshop {
		width: 100%;
		overflow: hidden;
		margin-bottom: 20px;
	}

	#membercard .choiceshop .choiceshop_l {
		float: left;
		font-size: 16px;
		line-height: 24px;
	}

	#membercard .choiceshop .choiceshop_r {
		float: left;
		width: 900px;
		font-size: 16px;
		line-height: 24px;
	}
</style>