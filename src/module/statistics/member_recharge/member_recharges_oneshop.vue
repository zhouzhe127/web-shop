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
				<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
					<div slot="con-11" slot-scope="props" @click="openPayment(props.data,'one')">
						{{props.data.totalOtherPay}}
					</div>
				</com-table>
			</section>
			<section>
				<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
					<div slot="con-0" slot-scope="props" @click="getDetail(props.data)">
						查看详情
					</div>
					<div slot="con-12" slot-scope="props" @click="openPayment(props.data,'one')">
						{{props.data.totalOtherPay}}
					</div>
					<div slot="con-15" slot-scope="props" @click="openDiscount(props.data)">
						{{props.data.totalGiftCoupon}}
					</div>
				</com-table>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
			<!-- 优惠券详情的弹窗 -->
			<coupon-detail v-if='showWin' @getAppliedWin='getResult' :CouponDetails='CouponDetails'></coupon-detail>
			<!-- 其他支付方式的弹窗 -->
			<paymentWin v-if="preferentialBounced" @toClick="whetherToclick" :otherPayDetail='otherPayDetail' :shopsList='shopsList' :paymentType='paymentType' :paymentShopId='paymentShopId'></paymentWin>
		</section>
		<scancode-order v-if="showType == 'order'" @scanorderResult="getscanorder" :constructionsName="constructionsName" :startTime="startTime" :endTime='endTime' :constructionsId="constructionsId" :isOpenTime="isOpenTime" :oneData='oneData' :taskId="taskId" :shopsList='shopsList'></scancode-order>
	</div>
</template>
<script>
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
			titleList: [{
				titleName: '天数',
				dataName: 'days',
			},
			{
				titleName: '充值人数',
				dataName: 'rechargePersonNum',
			},
			{
				titleName: '充值次数',
				dataName: 'rechargeNum',
			},
			{
				titleName: '充值总额',
				dataName: 'totalRecharge',
			},
			{
				titleName: '支付总额 ',
				dataName: 'totalPayment',
			},
			{
				titleName: '现金',
				dataName: 'totalCash',
			},
			{
				titleName: '银行卡',
				dataName: 'totalCard',
			},
			{
				titleName: '微信',
				dataName: 'totalWeChat',
			},
			{
				titleName: '支付宝',
				dataName: 'totalAliPay',
			},
			{
				titleName: '中信微信',
				dataName: 'totalZXWeChat',
			},
			{
				titleName: '中信支付宝',
				dataName: 'totalZXAliPay',
			},
			{
				titleName: '自定义支付',
				dataName: 'totalOtherPay',
				titleStyle: {
					fontSize: 16 + 'px'
				},
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			},
			{
				titleName: '赠送总额',
				dataName: 'totalGiftAmount',
			},
			{
				titleName: '赠送积分',
				dataName: 'totalGiftPoint',
			},
			{
				titleName: '赠送优惠券',
				dataName: 'totalGiftCoupon',
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			}
			],
			staticLists: [], //数据
			shoptitleList: [{
				titleName: '操作 ',
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			},
			{
				titleName: '时间',
				dataName: 'day',
			},
			{
				titleName: '充值人数',
				dataName: 'rechargePersonNum',
			},
			{
				titleName: '充值次数',
				dataName: 'rechargeNum',
			},
			{
				titleName: '充值总额 ',
				dataName: 'totalRecharge',
			},
			{
				titleName: '支付总额',
				dataName: 'totalPayment',
			},
			{
				titleName: '现金',
				dataName: 'totalCash',
			},
			{
				titleName: '银行卡',
				dataName: 'totalCard',
			},
			{
				titleName: '微信',
				dataName: 'totalWeChat',
			},
			{
				titleName: '支付宝',
				dataName: 'totalAliPay',
			},
			{
				titleName: '中信微信',
				dataName: 'totalZXWeChat',
			},
			{
				titleName: '中信支付宝',
				dataName: 'totalZXAliPay',
			},
			{
				titleName: '自定义支付',
				dataName: 'totalOtherPay',
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			},
			{
				titleName: '赠送总额',
				dataName: 'totalGiftAmount',
			},
			{
				titleName: '赠送积分',
				dataName: 'totalGiftPoint',
			},
			{
				titleName: '赠送优惠券',
				dataName: 'totalGiftCoupon',
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			}
			],
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
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
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
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		let obj2 = {
			conStyle: {
				'color': '#ff9800'
			}
		};
		for (let item of this.titleList) {
			if (item.dataName != 'totalOtherPay') {
				Object.assign(item, obj1, obj2);
			}
		}
		for (let item of this.shoptitleList) {
			Object.assign(item, obj1);
		}

	},
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