<!--
    **实体卡应用
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='740' :height="'auto'" @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">{{title}}</span>
		<div slot="content" class="shopList" style="padding: 30px;overflow: hidden;">
			<div class="fl" style="width: 100%;">
				<a href="javascript:void(0)" class="unselect fr" @click="selectUnselect">全部取消</a>
				<a href="javascript:void(0)" class="check fr" @click="selectUnselect('1')">全部选择</a>
			</div>
			<div class="fl" style="width: 100%;margin-bottom: 20px;" v-if="constructions && constructions.length >= 1">
				<div class="fl" style="height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;">无品牌单店</div>
				<mul-select :list.sync="constructions" :selects.sync="construSaletOn" :name='"name"' :key='"id"' class="newCard" :styles="{backgroundColor: '#F1F1F1'}"
				    style="width: 570px;"></mul-select>
			</div>
			<div class="fl" style="width: 100%;margin-bottom: 20px;" v-if="directSalet && directSalet.length >= 1">
				<div class="fl" style="height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;">直营店</div>
				<div class="selectbtns newCard fl" style="width: 110px;">
					<span :class="dirCheckAll ? 'sign fl' : 'fl'" @click="directCheckAll">全部</span>
				</div>
				<mul-select :list.sync="directSalet" :selects.sync="directSaletOn" :name='"name"' :key='"id"' class="newCard" :styles="{backgroundColor: '#F1F1F1'}"
				    style="width: 570px;"></mul-select>
			</div>
			<div class="fl" style="width: 100%;" v-if="napaStores && napaStores.length >= 1">
				<div class="fl" style="height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;">加盟店</div>
				<div class="selectbtns newCard fl" style="width: 110px;">
					<span :class="napCheckAll ? 'sign fl' : 'fl'" @click="napaStCheckAll">全部</span>
				</div>
				<mul-select :list.sync="napaStores" :selects.sync="napaStoresOn" :name='"name"' :key='"id"' class="newCard" :styles="{backgroundColor: '#F1F1F1'}"
				    style="width: 570px;"></mul-select>
			</div>
		</div>
	</Win>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		props: {
			userData: Object,
			ischain: String,
			type: String, //状态
			indexs: '',
			napaStoresOns: '',
			directSaletOns: '',
			applyShopOns: '',
			StoresOn: '',
			SaletOn: '',
			detail: Object,
			storedShopOn: ''
		},
		watch: {
			'directSaletOn': 'dirChange',
			'napaStoresOn': 'napChange'
		},
		data() {
			return {
				title: '',
				napaStores: [], // 加盟店
				napaStoresOn: this.indexs == 1 ? this.napaStoresOns : this.StoresOn, // 加盟店选中的
				directSalet: [], // 直营店
				directSaletOn: this.indexs == 1 ? this.directSaletOns : this.SaletOn, // 直营店选中的
				construSaletOn: this.indexs == 1 ? this.applyShopOns : this.storedShopOn,
				dirCheckAll: false, // 直营店全选
				napCheckAll: false, // 加盟店全选
				dirObjIndex: {}, // 直营店索引
				napObjIndex: {}, // 加盟店索引
				selectShops: [],
				constructions: [],
			};
		},
		methods: {
			async getAppliedWin(str) {
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
					await this.modifyStores();
					this.$emit('getAppliedWin', str);
				} else {
					this.$emit('getAppliedWin');
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
				if (this.ischain == '3') {
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
				}
				if (this.ischain == '3') {
					this.napaStores = joinShop; //加盟
					for (let i = 0; i < this.napaStores.length; i++) {
						if (this.napaStores[i].status == '0') {
							this.napObjIndex[this.napaStores[i].id] = i;

						} else {
							this.napaStores.splice(i, 1);
							i--;
						}
					}
				}
				if (this.userData.currentShop && this.ischain == '0') {
					this.constructions.push(this.userData.currentShop); //无品牌单店
				}
				this.napChange();
				this.dirChange();
			},
			selectUnselect(type) {
				// 全选 and 全不选
				if (type == '1') {
					let napaStore = [];
					let directSale = [];
					let constructions = [];
					if (this.ischain == 3) {
						for (let i = 0; i < this.directSalet.length; i++) {
							directSale.push(this.directSalet[i].id);
						}
						for (let i = 0; i < this.napaStores.length; i++) {
							napaStore.push(this.napaStores[i].id);
						}
					}
					if (this.ischain == 0) {
						constructions.push(this.constructions[0].id);
					}
					this.construSaletOn = utils.deepCopy(constructions);
					this.directSaletOn = utils.deepCopy(directSale);
					this.napaStoresOn = utils.deepCopy(napaStore);
				} else {
					this.construSaletOn = [];
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
				if (this.ischain == '3') {
					for (let i = 0; i < this.directSaletOn.length; i++) {
						shopList.push(this.directSaletOn[i]);
					}
					for (let i = 0; i < this.napaStoresOn.length; i++) {
						shopList.push(this.napaStoresOn[i]);
					}
				} else if (this.ischain == '0') {
					shopList.push(this.construSaletOn);
				}
				return shopList;
			},
			async modifyStores() {
				let data = await http.updateCard({
					data: {
						id: this.detail.id,
						type: this.indexs,
						applyShopIds: this.indexs == 1 ? (String(this.filterShopInfo()) == '' ? -1 : String(this.filterShopInfo())) : '',
						depositShopIds: this.indexs == 2 ? (String(this.filterShopInfo()) == '' ? -1 : String(this.filterShopInfo())) :
							''
					}
				});
				if (data == true) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '修改成功!',
					});
				}
			}
		},
		computed: {

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
		},
		mounted() {
			if (this.type == '1') {
				this.title = '修改适用门店';
			} else if (this.type == '2') {
				this.title = '修改储值门店';
			}
			this.getShopList();
		}
	};
</script>
<style scoped>
	.selectbtns .sign {
		border: 1px #FF9200 solid;
	}

	.selectbtns span {
		background-color: inherit;
		border: 1px #D2D2D2 solid;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #F1F1F1;
		text-align: center;
		cursor: pointer;
		margin: 1px;
	}

	.selectbtns span:hover {
		background-color: inherit;
	}
</style>