<template>
	<win :width="740" :height="'auto'" @winEvent="winEvent">
		<div slot="content" class="shopList" style="padding: 30px;overflow: hidden;">
			<div class="fl" style="width: 100%;">
				<a href="javascript:void(0)" class="unselect fr" @click="selectUnselect">全部取消</a>
				<a href="javascript:void(0)" class="check fr" @click="selectUnselect('1')">全部选择</a>
			</div>
			<div class="fl" style="width: 100%;margin-bottom: 20px;" v-if="directSalet && directSalet.length >= 1">
				<div class="fl" style="height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;">直营店</div>
				<div class="selectbtns newCard fl" style="width: 110px;">
					<span style="background:'rgb(236,236,236)'" :class="dirCheckAll ? 'sign fl' : 'fl'" @click="directCheckAll">全部</span>
				</div>
				<mul-select :styles="{backgroundColor: 'rgb(236,236,236)'}" :list.sync="directSalet" :selects.sync="directSaletOn" :name='"name"'
				    :key='"id"' class="newCard" style="width: 500px;"></mul-select>
				<!-- <sd-multiselect :list.sync="directSalet" :selects.sync="directSaletOn" :name='"name"' :key='"id"' class="newCard" style="width: 570px;">
                </sd-multiselect> -->
			</div>
			<div class="fl" style="width: 100%;" v-if="napaStores && napaStores.length >= 1">
				<div class="fl" style="height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;">加盟店</div>
				<div class="selectbtns newCard fl" style="width: 110px;">
					<span style="background:'rgb(236,236,236)'" :class="napCheckAll ? 'sign fl' : 'fl'" @click="napaStCheckAll">全部</span>
				</div>
				<mul-select :styles="{backgroundColor: 'rgb(236,236,236)'}" :list.sync="napaStores" :selects.sync="napaStoresOn" :name='"name"'
				    :key='"id"' class="newCard" style="width: 500px;"></mul-select>
				<!-- <sd-multiselect :list.sync="napaStores" :selects.sync="napaStoresOn" :name='"name"' :key='"id"' class="newCard" style="width: 570px;"></sd-multiselect> -->
			</div>
		</div>
	</win>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				napaStores: [], // 加盟店
				napaStoresOn: this.indexs == 1 ? this.napaStoresOns : this.StoresOn, // 加盟店选中的
				directSalet: [], // 直营店
				directSaletOn: this.indexs == 1 ? this.directSaletOns : this.SaletOn, // 直营店选中的
				dirCheckAll: false, // 直营店全选
				napCheckAll: false, // 加盟店全选
				dirObjIndex: {}, // 直营店索引
				napObjIndex: {}, // 加盟店索引
				selectShops: [],
			};
		},
		props: ['indexs', 'napaStoresOns', 'directSaletOns', 'StoresOn', 'SaletOn'],
		watch: {
			'directSaletOn': 'dirChange',
			'napaStoresOn': 'napChange'
		},
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					let obj = {};
					obj.shopList = this.filterShopInfo();
					obj.index = this.indexs;
					if (this.indexs == 1) {
						// 适用门店
						obj.napaStoresOn = this.napaStoresOn;
						obj.directSaletOn = this.directSaletOn;
						obj.isActive = false;

					} else {
						obj.StoresOn = this.napaStoresOn;
						obj.SaletOn = this.directSaletOn;
						obj.isUi = false;
					}
					this.$emit('closeWin', obj);
				} else {
					this.$emit('closeWin');
				}
			},
			dirChange() {
				// 直营店发生变化
				if (this.directSaletOn.length == this.directSalet.length) {
					this.dirCheckAll = true;
				} else {
					this.dirCheckAll = false;
				}
			},
			napChange() {
				// 加盟店发生变化
				if (this.napaStoresOn.length == this.napaStores.length) {
					this.napCheckAll = true;
				} else {
					this.napCheckAll = false;
				}
			},
			getShopList() {
				let shopsList = storage.session('shopList');
				let directlyShop = [];
				let joinShop = [];
				for (let item of shopsList) {
					item.status = '0';
					item.name = item.shopName;
					if (item.ischain == '1') {
						directlyShop.push(item);
					} else if (item.ischain == '2') {
						joinShop.push(item);
					}
				}
				// 筛选出加盟店和直营店
				this.directSalet = directlyShop; //直营
				for (let i = 0; i < this.directSalet.length; i++) {
					if (this.directSalet[i].status == '0') {
						this.dirObjIndex[this.directSalet[i].id] = i;
					} else {
						this.directSalet.splice(i, 1);
						i--;
					}
				}
				this.napaStores = joinShop; //加盟
				for (let i = 0; i < this.napaStores.length; i++) {
					if (this.napaStores[i].status == '0') {
						this.napObjIndex[this.napaStores[i].id] = i;
					} else {
						this.napaStores.splice(i, 1);
						i--;
					}
				}

				this.napChange();
				this.dirChange();
			},
			selectUnselect(type) {
				// 全选 and 全不选
				if (type == '1') {
					let napaStore = [];
					let directSale = [];
					for (let i = 0; i < this.directSalet.length; i++) {
						directSale.push(this.directSalet[i].id);
					}
					for (let i = 0; i < this.napaStores.length; i++) {
						napaStore.push(this.napaStores[i].id);
					}
					this.directSaletOn = utils.deepCopy(directSale);
					this.napaStoresOn = utils.deepCopy(napaStore);

				} else {
					this.napaStoresOn = [];
					this.directSaletOn = [];
					this.dirCheckAll = false;
					this.napCheckAll = false;

				}
			},
			directCheckAll() {
				// 直营店全选
				if (this.dirCheckAll) {
					this.directSaletOn = [];
					this.dirCheckAll = false;
				} else {
					this.directSaletOn = [];
					this.dirCheckAll = false;
					for (let i = 0; i < this.directSalet.length; i++) {
						this.directSaletOn.push(this.directSalet[i].id);
					}
					this.dirCheckAll = true;
				}

			},
			napaStCheckAll() {
				//  加盟店全选
				if (this.napCheckAll) {

					this.napCheckAll = false;
					this.napaStoresOn = [];
				} else {
					this.napCheckAll = false;
					this.napaStoresOn = [];
					for (let i = 0; i < this.napaStores.length; i++) {
						this.napaStoresOn.push(this.napaStores[i].id);
					}
					this.napCheckAll = true;
				}

			},
			filterShopInfo() {
				let shopList = [];
				// type为1返回店铺详情
				for (let i = 0; i < this.directSaletOn.length; i++) {
					shopList.push(this.directSaletOn[i]);
				}
				for (let i = 0; i < this.napaStoresOn.length; i++) {
					shopList.push(this.napaStoresOn[i]);

				}
				return shopList;
			},
		},
		mounted() {
			this.getShopList();
		},
		components: {
			'win': () =>
				import ( /*webpackChunkName: 'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
		}
	};
</script>


<style lang="less" scoped>
	.selectbtns span {
		background-color: inherit;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: rgb(236, 236, 236);
		text-align: center;
		cursor: pointer;
		margin: 1px;
	}
</style>