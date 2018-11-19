/** * 会员充值统计单店多天 * *miaochuan.sha */
<template>
	<div id="membercard">
		<section v-if="showType =='static'">
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
					<div slot="con-11" slot-scope="props" @click="openPayment(props.data,'one')">
						{{props.data.totalOtherPay}}
					</div>
				</com-table> -->
				<el-table :data="staticLists" border style="width: 1400px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column fixed prop="days" label="天数" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #ff9800">{{scope.row.days}}</span>
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
							<span style="color: #27a8e0;" @click="openPayment(scope.$index, scope.row,'one')">{{scope.row.totalOtherPay}}</span>
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
			<section>
				<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
					<div slot="con-0" slot-scope="props" @click="getDetail(props.data)">
						查看详情
					</div>
					<div slot="con-12" slot-scope="props" @click="openPayment(props.data,'one')">
						{{props.data.totalOtherPay}}
					</div>
					<div slot="con-15" slot-scope="props" @click="openDiscount(props.data)">
						{{props.data.totalGiftCoupon}}
					</div>
				</com-table> -->
				<div class="list_box" style="width:100%;">
					<div class="list_title">
						<div class="list_title_l fl">
							<span>会员充值统计</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{allFormList.length}}</a>条记录</span>
						</div>
						<div class="list_title_r fr">
						</div>
					</div>
					<el-table :data="formList" border style="width: 1400px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
						<el-table-column fixed label="操作" width="111" align="center">
							<template slot-scope="scope">
								<span style="color: #27a8e0;" @click="getDetail(scope.row)">查看详情</span>
							</template>
						</el-table-column>
						<el-table-column label="时间" prop="day" width="111" align="center">
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
								<span style="color: #27a8e0;" @click="openPayment(scope.$index, scope.row,'one')">{{scope.row.totalOtherPay}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="totalGiftAmount" label="赠送总额" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalGiftPoint" label="赠送积分" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalGiftCoupon" label="赠送优惠券" width="111" align="center">
							<template slot-scope="scope">
								<span style="color: #27a8e0;" @click="openDiscount(scope.row)">{{scope.row.totalGiftCoupon}}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</section>
			<!-- 翻页 -->
			<!-- <section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section> -->
			<div class="pageWrap" v-if="endTotal >= 1">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<!-- 优惠券详情的弹窗 -->
			<coupon-detail v-if='showWin' @getAppliedWin='getResult' :CouponDetails='CouponDetails'></coupon-detail>
			<!-- 其他支付方式的弹窗 -->
			<paymentWin v-if="preferentialBounced" @toClick="whetherToclick" :otherPayDetail='otherPayDetail' :shopsList='shopsList' :paymentType='paymentType' :paymentShopId='paymentShopId'></paymentWin>
		</section>
		<scancode-order v-if="showType == 'order'" @scanorderResult="getscanorder" :constructionsName="constructionsName" :startTime="startTime" :endTime='endTime' :constructionsId="constructionsId" :isOpenTime="isOpenTime" :oneData='oneData' :taskId="taskId" :shopsList='shopsList'></scancode-order>
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
				staticLists: [], //数据
				allFormList: [], //店铺查询的所有数据 
				formList: [], //展示的数据
				showType: 'static',
				oneData: '', //一天的日期
				CouponDetails: {
					couponList: [], // 优惠券列表
					couponCount: 0 // 优惠券张数
				},
				preferentialBounced: false, //其他支付方式弹窗
				otherPayDetail: '', //自定义支付方式的详情
				paymentType: '', //自定义支付的方式区分
				paymentShopId: '' //自定义支付的店铺的id			
			};
		},
		props: {
			constructionsName: String, //店铺名称
			startTime: Number, //开始时间
			endTime: Number, //结束时间
			constructionsId: String, //店铺的id
			isOpenTime: Boolean,
			taskId: Number,
			shopsList: Array //店铺列表
		},
		methods: {
			returnStore: function() {
				this.$emit('throwWinResult', 'all');
			},
			// getPageNum: function(obj) {
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.getRechargeData();
			// },
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getRechargeData();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getRechargeData();
			},
			getDetail: function(item) {
				this.showType = 'order';
				this.oneData = item.day;
			},
			getscanorder: function(res) {
				this.showType = res;
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['fd-blue'],
					fn: () => {
						this.returnStore();
					}
				}, {
					name: '导出',
					className: ['fd-blue'],
					fn: () => {
						this.Export();
					}
				}]);
			},
			formatTime(time) {
				return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
			},
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
					this.staticLists = [];
					this.staticLists.push(data.total); //头部的数据
					this.allFormList = data.days; //身体的数据
					this.$nextTick(() => {
						this.setPage();
					});
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
		},
		components: {
			pageElement: () =>
				import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
			'scancode-order': () =>
				import ( /*webpackChunkName: "member_recharges_detail"*/ './member_recharges_detail'),
			'coupon-detail': () =>
				import ( /*webpackChunkName: "member_recharge_couponwin"*/ './member_recharge_couponwin'),
			paymentWin: () =>
				import ( /*webpackChunkName: "payment_win"*/ './payment_win'),
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
		// 		Object.assign(item, obj1);
		// 	}

		// },
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnStore();
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
		width: 100%;
		height: 100%;
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