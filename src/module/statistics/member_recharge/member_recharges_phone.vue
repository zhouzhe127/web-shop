/** * 会员充值统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<section style="margin-bottom:20px;">
			<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="phonetotal">
				<div slot="con-0" slot-scope="props">
					{{count}}
				</div>
			</com-table>
		</section>
		<section>
			<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="phonelist" :listName="'会员充值统计'" :key="index" :showTitle='1' :allTotal="count">
				<div slot="con-1" slot-scope="props">
					{{formatTime(props.data.createTime)}}
				</div>
				<div slot="con-8" slot-scope="props">
					{{getpaytypeName(props.data.payType)}}
				</div>
				<div slot="con-13" slot-scope="props" @click="openDiscount(props.data)">
					{{props.data.giftCoupon}}
				</div>
			</com-table>
		</section>
		<!-- 优惠券详情的弹窗 -->
		<coupon-detail v-if='showWin' @getAppliedWin='getResult' :CouponDetails='CouponDetails'></coupon-detail>
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
			index: null,
			goodsName: '', //订单号
			titleList: [{
				titleName: '充值次数',
			},
			{
				titleName: '充值总额',
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
				titleName: '来源名称',
				dataName: 'shopName',
				titleStyle: {
					fontSize: 16 + 'px',
					width: '160px',
					flex: 'none'
				},
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			},
			{
				titleName: '时间',
				dataName: 'createTime',
				titleStyle: {
					fontSize: 16 + 'px',
					width: '160px',
					flex: 'none'
				}
			},
			{
				titleName: '卡号',
				dataName: 'cardNumber',
				titleStyle: {
					fontSize: 16 + 'px',
					width: '160px',
					flex: 'none'
				}
			},
			{
				titleName: '卡类型',
				dataName: 'cardTypeName',
			},
			{
				titleName: '手机号',
				dataName: 'mobile',
			},
			{
				titleName: '会员姓名',
				dataName: 'memberName',
			},
			{
				titleName: '充值金额',
				dataName: 'recharge',
			},
			{
				titleName: '支付金额',
				dataName: 'payment',
			},
			{
				titleName: '支付方式',
				dataName: 'payType',
			},
			{
				titleName: '操作员',
				dataName: 'staffName',
			},
			{
				titleName: '赠送总额',
				dataName: 'giftAmount',
			},
			{
				titleName: '赠送积分',
				dataName: 'giftPoint',
			},
			{
				titleName: '赠送优惠券',
				dataName: 'giftCoupon',
				conStyle: {
					'color': '#27a8e0',
					'cursor': 'pointer'
				}
			}
			],
			staticshopLists: [], //店铺查询的数据 
			showWin: false, //弹窗默认关闭状态
			isPopupwindow: '',
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			allLists: [], //所有的数据  筛选订单
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
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.getRechargeData();
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
				this.count = data.count;
				this.endTotal = data.total;
				this.staticLists = [];
				this.staticLists.push(data.list.total); //头部的数据
				this.formList = data.list.list; //body数据
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
				case 23:
					return '上海中信';
				case 24:
					return '上海中信支付宝';		
			}
		},
	},
	props: {
		phonelist: Array,
		phonetotal: Array,
		count: Number
	},
	components: {
		pageElement: () =>
		import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
		import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		'coupon-detail': () =>
		import ( /*webpackChunkName: "member_recharge_couponwin"*/ './member_recharge_couponwin'),
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
			Object.assign(item, obj1, obj2);
		}
		for (let item of this.shoptitleList) {
			if (item.dataName != 'cardNumber' && item.dataName != 'createTime' && item.dataName != 'shopName') {
				Object.assign(item, obj1);
			}
		}
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