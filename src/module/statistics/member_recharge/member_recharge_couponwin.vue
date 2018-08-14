<!-- 查看优惠券详情的弹窗 -->
<template>
	<Win :width='597' :height='333' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">优惠券详情</span>
		<div id="tan" slot="content" v-cloak>
			<div class="coupon_content" v-if="CouponDetails.couponList.length != 0">
				<div class="num">共{{CouponDetails.couponCount}}张</div>
				<ul>
					<li v-for="(item,i) in CouponDetails.couponList" :key="i">{{item.name}}({{item.num}}张)</li>
				</ul>
			</div>
			<div class="noCoupon" v-if="CouponDetails.couponList.length == 0">-暂无优惠券-</div>
		</div>
	</Win>
</template>
<script>
export default {
	data() {
		return {
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '取消',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
		};
	},
	props: {
		CouponDetails: Object //优惠券详情

	},
	methods: {
		getAppliedWin: function(res) {
			if (res == 'ok') {
				this.$emit('getAppliedWin', res);
			} else {
				this.$emit('getAppliedWin', res);
			}
		}
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
	}
};
</script>
<style lang="less" scoped>
#tan {
	padding: 40px;
}

.coupon_content {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 32px 164px;
	.num {
		text-align: center;
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}
	ul {
		width: 100%;
		height: auto;
	}
	li {
		text-align: center;
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}
}

.noCoupon {
	width: 100%;
	height: 68px;
	text-align: center;
	line-height: 68px;
	font-size: 24px;
	color: #e0e0e0;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}
</style>