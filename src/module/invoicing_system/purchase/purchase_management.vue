/*
* @Author: zhouzhe
* @Date: 2018-10-10 15:02:39
*/

<template>
	<div id="purchase">
		<div class="teb">
			<el-radio-group v-model="tabactive" fill="#e1bb4a">
				<el-radio-button v-for="(item,index) in tebData" :key="index" plain :label="index">{{item}}</el-radio-button>
			</el-radio-group>
		</div>
		<purchase-list :webstyle='0' v-show="tabactive==0"></purchase-list>
		<purchase-template v-show="tabactive==1"></purchase-template>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				tabactive: 0,
				tebData: ['采购单', '采购单模板'],
			};
		},
		methods: {
			heardBtn() {
				this.$store.commit('setPageTools', [{
					name: '立即采购',
					className: 'primary',
					type: 4,
					fn: () => {
						this.$router.push({
							path: 'purchaseManagement/create'
						});
					}
				}]);
			},
		},
		activated() {
			this.heardBtn();
		},
		components: {
			purchaseList: () =>
				import ( /*webpackChunkName: 'purchase_list'*/ './purchase_list'),
			purchaseTemplate: () =>
				import ( /*webpackChunkName: 'purchase_template'*/ './purchase_template'),
		}
	};
</script>
<style lang='less' scoped>
	// #purchase{

	// }
</style>