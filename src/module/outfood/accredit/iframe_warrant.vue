<template>
	<section class="iframeBox">
		<div id="mask_14981027179151314207" class="win-mask"></div>
		<div @click="cancel" class="win center" style="width: 1000px;height: 800px;">
			<iframe style="width: 1000px;height: 800px;" id="child" v-bind:src="url"></iframe>
		</div>
	</section>
</template>
<script type="text/javascript">
// import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			url: '',
			show: true
		};
	},
	props: ['urlData'],
	methods: {
		cancel: function(e) {
			e.stopPropagation();
		},
		// getLoginUrl: function() {}
	},
	mounted: function() {
		document.onclick = () => {
			this.show = false;
			this.$emit('show', this.show);
		};
		// let userData = storage.session('userShop');
		// let brandId =
		// 	userData.currentShop.ischain == 0
		// 		? 0
		// 		: userData.currentShop.brandId;
		this.url = this.urlData;
	}
};
</script>
<style lang="less" scoped>
.win-mask {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: url(../../../res/images/a50.png) repeat;
	z-index: 1000;
}
.center {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 1001;
}
#child html body #app .footer .to-dish-map {
	display: none;
}
</style>