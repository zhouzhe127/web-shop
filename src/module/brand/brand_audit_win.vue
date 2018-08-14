<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id='closeShop' slot="content">
			<template v-if='detial.status != 5'>
				<h3 style='width:100%;height:50px;line-height: 50px;text-align: center;font-size: 18px;'>确认关闭门店</h3>
				<h3 style='width:100%;height:30px;line-height: 30px;text-align: center;font-size: 14px;color: gray;'>关闭后可以开启</h3>
			</template>
			<template v-else>
				<h3 style='width:100%;height:50px;line-height: 50px;text-align: center;font-size: 18px;'>确认开启门店</h3>
				<h3 style='width:100%;height:30px;line-height: 30px;text-align: center;font-size: 14px;color: gray;'>开启后可以关闭</h3>
			</template>
		</div>
	</win>

</template>
<script>
	export default {
		data() {
			return {
				width: 300,
				height: 80
			};
		},
		props: {
			title: String,
			detial: Object
		},
		methods: {
			winEvent(str) {
				this.$emit('winEvent', str);
			}
		},
		components: {
			win: () =>
				import( /* webpackChunkName:'win' */ 'src/components/win')
		}
	};
</script>
<style>

</style>