<template>
	<win :align="'center'" :width="500" :height="500" :ok="okStyle" :cancel="cancelStyle" @winEvent='winEvent' :type="'alert'">
		<div id="tan" slot="content" v-cloak>
			<div id="adm-code">
				<div id="adm-showImg">
					<img :src="url" alt="二维码">
				</div>
				<div class="adm-codeT">
					<span style="color: #F39801;">温馨提示</span>：请先微信扫描确认，再进行操作！！！
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	import win from 'src/components/win.vue';
	export default {
		data() {
			return {
				okStyle: {},
				cancelStyle: {},
				url: ''
			};
		},
		props: {
			'codeUrl': String
		},
		methods: {
			winEvent(str) {
				this.$emit('winEvent', str);
			}
		},
		async mounted() {
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#f8941f',
					color: '#fff',
					width: '100%'
				}
			};

			let qrcode = await
			import ( /* webpackChunkName:'qrcode' */ 'src/verdor/jr-qrcode.js');
			this.url = qrcode.getQrBase64(this.codeUrl, {
				padding: 15,
				width: 300,
				height: 300,
				correctLevel: 1
			});
		},
		components: {
			win
		}
	};
</script>
<style scoped>
	#adm-code .adm-codeT {
		text-align: center;
		width: 400px;
		height: 50px;
		line-height: 50px;
		margin-left: 50px;
		background-color: antiquewhite;
		margin-top: 66px;
		border-radius: 8px;
	}

	#adm-showImg {
		margin-top: 60px;
		width: 300px;
		height: 300px;
		margin-left: 100px;

	}
</style>