/*
* @Author: zhouzhe
* @Date: 2018-10-30 15:38:57
*/
<template>
	<div>
		<el-tabs v-model="components">
			<el-tab-pane label="新建模板" name="creatTempList"></el-tab-pane>
			<el-tab-pane label="公式管理" name="equationList"></el-tab-pane>
			<el-tab-pane label="集合管理" name="gatherManagement"></el-tab-pane>
		</el-tabs>
		<keep-alive>
			<component :is="components"></component>
		</keep-alive>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				components: 'creatTempList'
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		},
		components: {
			creatTempList: () =>
				import( /*webpackChunkName: 'creat_temp_list'*/ './creat_temp_list'), //新建模板
			equationList: () =>
				import( /*webpackChunkName: 'equation_list'*/ './equation_list'), //公式管理
			gatherManagement: () =>
				import( /*webpackChunkName: 'gather_management'*/ './gather_management'), //   集合管理    
		}
	};
</script>
<style lang='less' scoped>
</style>