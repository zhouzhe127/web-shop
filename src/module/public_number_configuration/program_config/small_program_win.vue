<template>
	<Win :width='597' :height='233' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">提示</span>
		<div id="tan" slot="content" v-cloak>
			<p>请在新窗口中完成微信小程序授权</p>
		</div>
	</Win>
</template>
<script>
export default {
	data() {
		return {
			okStyle: {
				content: '遇到问题,点击重试',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '完成授权',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
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
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
	},
};
</script>
<style scoped>
#tan p{
	text-align: center;
	line-height: 233px;
	font-size: 18px;
}
</style>