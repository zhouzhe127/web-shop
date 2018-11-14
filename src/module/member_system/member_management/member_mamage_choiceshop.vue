<template>
	<Win :width='565' :height='300' @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">修改卡属门店</span>
		<div id="tan" slot="content" v-cloak>
			<mul-select :list.sync="shopList" :selects.sync="result" :name='"shopName"' :key='"id"' :styles="{backgroundColor: '#F1F1F1',marginRight:'8px',marginBottom:'8px'}"
			    :isradio="true"></mul-select>
		</div>
	</Win>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				result: [], //修改店铺选中的
				list: [],
				ischain: '' //单店标识
			};
		},
		props: {
			shopList: Array, //店铺列表
			memberInfo: Object //会员信息
		},
		methods: {
			async getAppliedWin(res) {
				if (res == 'ok') {
					if (this.result.length == 0) {
						this.$store.commit('setWin', {
							content: '请选择修改店铺',
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					await this.changeCardOfShop();
				}
				this.$emit('getAppliedWin', res);
			},
			async changeCardOfShop() {
				let data = await http.changeCardOfShop({
					data: {
						memberId: this.memberInfo.id,
						newShopId: this.result.join(',')
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '修改成功',
						winType: 'alert',
						title: '操作提示',
					});
				}
			}
		},
		computed: {

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'Win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
		},
		mounted() {
			this.result = this.memberInfo.rechargeShopId.split(',');

		}
	};
</script>
<style scoped>
	#tan {
		padding: 20px;
	}
</style>