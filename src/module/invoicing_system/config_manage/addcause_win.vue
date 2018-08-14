<template>
	<div>
		<win @winEvent="getCauseName" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<input type="text" placeholder="请输入名称" v-model="titleName" maxlength="30">
			</div>
		</win>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				titleName: '',
			};
		},
		props: ['type'],
		mounted() {
			this.type == 1 ? this.title = '新增下架原因' : this.title = '新增耗损原因';
		},
		methods: {
			getCauseName(res) {
				this.$emit('add-cause', res, this.titleName);
			},
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		},
	};
</script>

<style lang="less" scoped>
	#tan {
		input {
			width: 300px;
			margin-top: 80px;
			outline: none;
			height: 40px;
			margin-left: 120px;
			padding-left: 10px;
		}
	}
</style>