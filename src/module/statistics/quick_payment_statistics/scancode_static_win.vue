/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<Win :width='853' :height='600' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :type="'alert'">
		<span slot="title">查看详情</span>
		<div id="details" slot="content" v-cloak>
			<div class="statistical_details">
				<!-- 标题 -->
				<div class="title">
					<span>用户数据:</span>
				</div>
				<!-- 内容 -->
				<ul class="content">
					<li>用户:{{detail.name}}</li>
					<li>手机号:{{detail.mobile}}</li>
					<li>支付卡:{{detail.cardType}}</li>
				</ul>
				<!-- 标题 -->
				<div class="title">
					<span>订单计算:</span>
				</div>
				<!-- 内容 -->
				<ul class="amount">
					<li>订单原价:{{detail.consumption}}元</li>
					<template v-if="detail.memberDiscountCash > 0">
						<li>-</li>
						<li>会员折扣:{{detail.memberDiscountCash}}元</li>
					</template>
					<template v-if="detail.shopDiscountCash > 0">
						<li>-</li>
						<li>门店折扣:{{detail.shopDiscountCash}}元</li>
					</template>
					<template v-if="detail.pointCash > 0">
						<li>-</li>
						<li>积分抵扣:{{detail.pointCash}}元</li>
					</template>
					<template v-if="detail.couponCash > 0">
						<li>-</li>
						<li>优惠券抵扣:{{detail.couponCash}}元</li>
					</template>
					<template v-if="detail.discount > 0">
						<li>-</li>
						<li>优惠金额:{{detail.discount}}元</li>
					</template>
					<li>=</li>
					<li>实付金额:{{detail.pain}}元</li>
				</ul>
				<!-- 标题 -->
				<div class="title">
					<span>订单数据:</span>
				</div>
				<!-- 内容 -->
				<ul class="orderDate clearfix">
					<li style="width:25%;">订单原价:{{detail.consumption}}元</li>
					<template v-if="detail.pain > 0">
						<li style="width:25%;">实付金额:{{detail.pain}}元</li>
					</template>
					<template v-if="detail.discount > 0">
						<li style="width:25%;">优惠金额:{{detail.discount}}元
							<el-tooltip placement="right">
								<div slot="content">优惠金额为订单原价-积分抵扣后的实际优惠金额,<br />优惠金额可能为1.门店折扣2.门店减免3.会员折扣4.优惠券优惠金额</div>
								<i class="el-icon-question" style="font-size:18px;"></i>
							</el-tooltip>
						</li>
					</template>
					<template v-if="detail.discount > 0">
						<li style="width:25%;">参与优惠金额:{{detail.discount}}元</li>
					</template>
					<template v-if="detail.noDiscountPrice > 0">
						<li style="width:25%;">不参与优惠金额:{{detail.noDiscountPrice}}元</li>
					</template>
					<template v-if="detail.pointCash > 0">
						<li style="width:25%;">积分抵扣金额:{{detail.pointCash}}元</li>
					</template>
				</ul>
				<ul class="orderDate clearfix">
					<li style="width:25%;">支付方式:{{getpayment(detail)}}</li>
				</ul>
				<ul class="orderDate clearfix" v-if="detail.memberConsumption > 0 || detail.weChatPain > 0 || detail.aliPayPain > 0">
					<template v-if="detail.memberConsumption > 0">
						<li style="width:25%;">会员支付:{{detail.memberConsumption}}元</li>
					</template>
					<template v-if="detail.weChatPain > 0">
						<li style="width:25%;">微信支付:{{detail.weChatPain}}元</li>
					</template>
					<template v-if="detail.aliPayPain > 0">
						<li style="width:25%;">支付宝支付:{{detail.aliPayPain}}元</li>
					</template>
				</ul>
				<ul class="orderDate clearfix">
					<template v-if="detail.couponCash > 0">
						<li style="width:25%;">使用优惠券:{{detail.couponCash}}元</li>
					</template>
					<template v-if="couponDetail != ''">
						<li style="width:25%;">
							<el-button type="primary">{{couponDetail.couponName}}</el-button>
						</li>
					</template>
				</ul>
				<!-- <ul class="content">
				</ul>
				<ul class="content">
					<li style="width:25%;"></li>
					<li style="width:25%;"></li>
					<li style="width:25%;"></li>
				</ul>
				<ul class="content">
					<li style="width:25%;"></li>
				</ul>
				<ul class="content">
					<li style="width:25%;"></li>
					<li style="width:25%;"></li>
				</ul> -->
				<!-- 标题 -->
				<div class="title" v-if="couponDetail != ''">
					<span>优惠券详情:</span>
				</div>
				<template v-if="couponDetail != ''">
					<!-- 详情优惠券 -->
					<ul class="content">
						<li>优惠券名称:{{couponDetail.couponName}}</li>
						<li>优惠券类型:{{couponTypeList[couponDetail.type]}}</li>
						<li v-if="couponDetail.type =='2' || couponDetail.type =='6' || couponDetail.type =='8'">强制减免:{{mandatory[couponDetail.isDiscount]}}</li>
						<li v-if="couponDetail.type =='4'">是否强折:{{mandatory[couponDetail.isDiscount]}}</li>
					</ul>
					<ul class="content">
						<li v-if="couponDetail.type != 7">优惠券共享:{{sharing[couponDetail.sharingStatus]}}</li>
					</ul>
					<ul class="content">
						<li v-if="couponDetail.type == 5">是否包含口味价钱:{{mandatory[couponDetail.tastePrice]}}</li>
						<template v-if="couponDetail.param !='' && couponDetail.type != 5 &&  couponDetail.type != 7">
							<li v-if="couponDetail.type =='1' || couponDetail.type =='2'">减免力度:减免{{couponDetail.param}}</li>
							<li v-if="couponDetail.type =='3' || couponDetail.type =='4'">折扣力度:{{couponDetail.param}}%</li>
						</template>
					</ul>
				</template>
				<!-- <ul class="content" v-else>
					<li>暂未使用优惠券</li>
				</ul> -->
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
			couponDetail: '', //优惠券详情
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			couponTypeList: {
				1: '单品减免优惠券',
				2: '整单减免优惠券',
				3: '单品打折优惠券',
				4: '整单打折优惠券',
				5: '赠菜优惠券',
				6: '代金券',
				7: '积分卡券',
				8: '随机立减优惠券'
			},
			mandatory: {
				0: '否',
				1: '是'
			},
			sharing: {
				'0': '不与其它优惠共享',
				'1': '可与其他优惠共享,可与会员卡优惠共用',
				'2': '可与其他优惠共享,不与会员卡优惠共用'
			},
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
				//详情数据
				this.detail = data;
				if (data.couponInfo) {
					this.couponDetail = data.couponInfo;
				}
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
	components: {
		Win: () =>
			import( /* webpackChunkName:'Win' */ 'src/components/win')
	},
	mounted() {
		this.scanPayOrderDetail();
	}
};
</script>
<style scoped>
#details {
	width: 100%;
	height: 100%;
}

.statistical_details {
	width: 100%;
	height: 100%;
	padding: 20px;
}

.statistical_details .title {
	width: 100%;
	height: 40px;
	line-height: 40px;
}

.statistical_details .title span {
	font-size: 16px;
}

.statistical_details .content {
	padding: 0 20px;
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.statistical_details .content li {
	line-height: 40px;
}

.statistical_details .amount {
	padding: 0 20px;
	width: 100%;
	height: 40px;
}

.statistical_details .amount li {
	height: 40px;
	float: left;
	line-height: 40px;
	margin-right: 10px;
}

.statistical_details .orderDate {
	padding: 0 20px;
	width: 100%;
}

.statistical_details .orderDate li {
	width: 25%;
	height: 40px;
	line-height: 40px;
	float: left;
}
</style>