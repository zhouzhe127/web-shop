<template>
	<Win :width='597' :height='400' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">小程序体验二维码</span>
		<div id="tan" slot="content" v-cloak>
			<img :src="codeimg"/>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
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
			codeimg:'' //二维码
		};
	},
	methods: {
		getAppliedWin: function(res) {
			if (res == 'ok') {
				this.$emit('getcodeResult', res);
			} else {
				this.$emit('getcodeResult', res);
			}
		},
		async getQRcode(){
			let data = await http.getQRcode({
				data:{}
			});
			if(data){
				this.codeimg = data;
			}
		},
	},
	components: {
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
	},
	mounted() {
		this.getQRcode();
	}
};
</script>
<style scoped>
#tan{
	width:100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
#tan img{
	width:300px;
	height: 300px;
}
</style>