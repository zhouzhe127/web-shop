/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<Win :width='653' :height='500' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle">
		<span slot="title">查看详情</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 任务用户名称 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">用户:</span>
				<span>{{detail.name}}</span>
			</div>
			<!-- 手机号 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">手机号:</span>
				<span>{{detail.mobile}}</span>
			</div>
			<!-- 支付卡 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">支付卡:</span>
				<span>{{detail.cardType}}</span>
			</div>
			<!-- 支付方式 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">支付方式:</span>
				<span>{{getpayment(detail)}}</span>
			</div>
			<!-- 消费金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">消费金额:</span>
				<span>{{detail.consumption}}</span>
			</div>
			<!-- 代金券 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">代金券:</span>
				<span>{{detail.vouchersPain}}({{detail.vouchersNum}}张)</span>
			</div>
			<!-- 实收金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">实收金额:</span>
				<span>{{detail.pain}}</span>
			</div>
			<!-- 会员支付 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">会员支付:</span>
				<span>{{detail.memberConsumption}}</span>
			</div>
			<!-- 微信支付 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">微信支付:</span>
				<span>{{detail.weChatPain}}</span>
			</div>
			<!-- 支付宝支付 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">支付宝支付:</span>
				<span>{{detail.aliPayPain}}</span>
			</div>
			<!-- 优惠金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">优惠金额:</span>
				<span>{{detail.discount}}</span>
			</div>
			<!-- 参与优惠金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">参与优惠金额:</span>
				<span>{{detail.discount}}</span>
			</div>
			<!-- 不参与优惠金额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">不参与优惠金额:</span>
				<span>{{detail.noDiscountPrice}}</span>
			</div>
			<!-- 积分抵扣总额 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">积分抵扣总额:</span>
				<span>{{detail.pointCash}}</span>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';

export default {
	data() {
		return {
			detail: '', //详情
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			}
		};
	},
	props: {
		constructionsId: String, //店铺id
		oid: String //订单号
	},
	methods: {
		getAppliedWin: function(res) {
			this.$emit('getAppliedWin', res);
		},
		async scanPayOrderDetail() {
			let data = await http.scanPayOrderDetail({
				data: {
					oid: this.oid,
					recordShopId: this.constructionsId
				}
			});
			if (data) {
				this.detail = data;
			}
		},
		getpayment: function(detail) {
			if (detail.memberConsumption == 0 && detail.weChatPain > 0) {
				return '微信支付';
			} else if (detail.memberConsumption > 0 && detail.weChatPain > 0) {
				return '混合支付';
			} else if (detail.memberConsumption > 0 && detail.weChatPain == 0) {
				return '会员支付';
			} else if (
				detail.aliPayPain > 0 &&
				detail.weChatPain == 0 &&
				detail.memberConsumption
			) {
				return '支付宝支付';
			} else {
				return '会员支付';
			}
		}
	},
	computed: {},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'Win' */ 'src/components/win')
	},
	mounted() {
		this.scanPayOrderDetail();
	}
};
</script>
<style scoped>
#tan {
	padding: 40px;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 10px;
	line-height: 40px;
}

#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .rightHalf {
	width: 500px;
	height: auto;
	float: left;
}

#tan .clearfix::before,
#tan .clearfix::after {
	display: table;
	content: “”;
}

#tan .clearfix::after {
	clear: both;
}
</style>