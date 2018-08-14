<template>
	<Win :width='512' :height='164' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">解绑操作</span>
		<div id="tan" slot="content" v-cloak>
			<p>确认同步吗?</p>
			<p>确认同步后,已发放优惠券将同步至当前优惠券配置</p>
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
			}
		};
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
		Win: () => import(/* webpackChunkName:'win' */ 'src/components/win'),
		'mul-select': () =>
			import(/*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
	},
	mounted() {
		// this.busineselect.push(this.bussinessselect[0]);
	}
};
</script>
<style scoped>
#tan {
	padding: 40px;
}
#tan p{
	font-size: 18px;
	margin: 16px 0;
	text-align: center;
}
</style>