/** * 会员充值统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<section style="margin-bottom:20px;">
			<el-table :data="phonetotal" border style="width: 1391px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column fixed prop="days" label="充值次数" width="107" align="center">
					<template slot-scope="scope">
						<span>{{count}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalRecharge" label="充值总额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalPayment" label="支付总额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalCash" label="现金" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalCard" label="银行卡" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalWeChat" label="微信" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalAliPay" label="支付宝" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalZXWeChat" label="中信微信" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalZXAliPay" label="中信支付宝" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalOtherPay" label="自定义支付" width="107" align="center">
					<template slot-scope="scope">
						<span style="color: #27a8e0;" @click="openPayment(scope.$index, scope.row,'all')">{{scope.row.totalOtherPay}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="totalGiftAmount" label="赠送总额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalGiftPoint" label="赠送积分" width="107" align="center">
				</el-table-column>
				<el-table-column prop="totalGiftCoupon" label="赠送优惠券" width="107" align="center">
				</el-table-column>
			</el-table>
		</section>
		<section style="margin-bottom:20px;">
			<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="phonelist" :listName="'会员充值统计'" :key="index" :showTitle='1' :allTotal="count">
				<div slot="con-1" slot-scope="props">
					{{formatTime(props.data.createTime)}}
				</div>
				<div slot="con-3" slot-scope="props">
					<span v-if="props.data.cardNumber == ''">电子卡</span>
					<span v-else>{{props.data.cardTypeName}}</span>
				</div>
				<div slot="con-8" slot-scope="props">
					{{getpaytypeName(props.data.payType)}}
				</div>
				<div slot="con-13" slot-scope="props" @click="openDiscount(props.data)">
					{{props.data.giftCoupon}}
				</div>
			</com-table> -->
			<el-table :data="phonelist" border style="width: 1391px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column fixed prop="shopName" label="来源名称" width="207" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="时间" width="207" align="center">
					<template slot-scope="scope">
						<span>{{formatTime(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="cardNumber" label="卡号" width="107" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.cardNumber == ''">--</span>
						<span v-else>{{scope.row.cardNumber}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="cardTypeName" label="卡类型" width="107" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.cardNumber == ''">电子卡</span>
						<span v-else>{{scope.row.cardTypeName}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="mobile" label="手机号" width="150" align="center">
				</el-table-column>
				<el-table-column prop="memberName" label="会员姓名" width="107" align="center">
				</el-table-column>
				<el-table-column prop="recharge" label="充值金额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="payment" label="支付金额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="payType" label="支付方式" width="107" align="center">
					<template slot-scope="scope">
						<span>{{getpaytypeName(scope.row.payType)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="staffName" label="操作员" width="107" align="center">
				</el-table-column>
				<el-table-column prop="giftAmount" label="赠送总额" width="107" align="center">
				</el-table-column>
				<el-table-column prop="giftPoint" label="赠送积分" width="107" align="center">
				</el-table-column>
				<el-table-column prop="giftCoupon" label="赠送优惠券" width="107" align="center">
					<template slot-scope="scope">
						<span style="color: #27a8e0;" @click="openDiscount(scope.row)">{{scope.row.giftCoupon}}</span>
					</template>
				</el-table-column>
			</el-table>
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
			staticLists: [], //数据
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