<template>
	<win :width="800" :height="600" @winEvent="winEvent">
		<span slot="title">选择店铺</span>
		<div slot="content" id="select-shop">
			<div class="show-shops" style="width: 100%; height: 100px;padding-left: 80px;">
				<a href="javascript:void(0)" class="check" style="margin-top: 50px;" @click="selectAllShops">全部选择</a>
				<a href="javascript:void(0)" class="unselect" style="margin-top: 50px;" @click="cleanAllShops">全部取消</a>
			</div>
			<div class="shops" style="width: 640px; height: auto;margin-left: 80px;border-top: 1px dashed #999;padding-top: 10px;">
				<mul-select :styles="{backgroundColor: 'rgb(236,236,236)',marginRight:'8px',marginBottom:'8px'}" :list="shopList" :selects="selects" :name="'shopName'" :keys="'id'" :isradio="false"></mul-select>
			</div>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			selects: utils.deepCopy(this.selectShops),
		};
	},
	props: ['selectShops','shopList'],
	methods: {
		winEvent(type) {
			if (type != 'ok') {
				this.$emit('closeShopWin');
				return false;
			}
			if (this.selects.length <= 0) {
				this.$store.commit('setWin', {
					content: '请选择店铺',
					winType: 'alert'
				});
				return false;
			}
			this.$emit('closeShopWin', {
				selectShops: this.selects
			});
		},
		async getShopList() {
			let res = await http.couGetShopList({});
			this.shopList = res;
		},
		selectAllShops() {
			this.cleanAllShops();
			for (let i = 0; i < this.shopList.length; i++) {
				this.selects.push(this.shopList[i].id);
			}
		},
		cleanAllShops() {
			this.selects = [];
		}
	},
	components: {
		win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
		'mul-select': () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select')
	}
};
</script>
<style type="text/css" scoped>
.selectbtns span {
	margin: 10px 10px 0 0;
}
</style>