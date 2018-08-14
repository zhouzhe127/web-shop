<template>
	<div>
		<win @winEvent="getWin" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<radio @selOn="getRadio" :list="list" :index="index"></radio>
			</div>
		</win>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				list: [],
				index: -1,
			}
		},
		props: [],
		mounted() {

		},
		methods: {
			getWin(res) {
				this.$emit('getBrandJob', res, this.titleName)
			},
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			radio: () =>
				import ( /*webpackChunkName: 'radio_btn'*/ 'src/components/radio_btn')
		},
	}
</script>

<style type="text/css" scoped>
</style>