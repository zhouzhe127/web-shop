
<!--
	**打印队列 ——弹窗
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<win @winEvent="printQueueWin" :align="'center'" :width="580" :height="300" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<section id='print-queue-tan'>
				<section v-for="(item,index) in alist" :key="index" class="oDetial">{{item}}</section>
			</section>

		</div>
	</win>
</template>
<script>
import win from 'src/components/win.vue';
export default {
	data() {
		return {
			okStyle: null,
			title: '详情',
			cancelStyle: null
		};
	},
	mounted() {
		this.okStyle = {
			content: '确定',
			style: {
				backgroundColor: '#29ABE2',
				color: '#fff',
				width: '580px'
			}
		};
		this.cancelStyle = {
			content: '',
			style: {
				backgroundColor: '#29ABE2',
				color: '#fff',
				width: 0
			}
		};
	},
	props: {
		alist: Array
	},
	methods: {
		//监听传值到主页面
		printQueueWin: function(res) {
			this.$emit('printQueueWin', res);
		}
	},
	components: {
		win
	}
};
</script>
<style type="text/css" scoped>
#print-queue .clearbtn {
	position: absolute;
	top: -60px;
	right: 0;
	width: 150px;
}
#print-queue-tan .oDetial {
	width: 100%;
	height: 20px;
	line-height: 20px;
	text-align: center;
}
</style>