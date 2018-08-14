<template>
	<div>
		<win @winEvent='save' :align="'center'" :width='740' :height='400'>
			<span slot='title'>{{title}}</span>
			<div id='cardShopTan' slot='content' v-cloak>
				<div class='shopList' style='padding: 30px;overflow: hidden;'>
					<div class='fl' style='width: 100%;'>
						<a href='javascript:void(0)' class='unselect fr' @click='selectUnselect'>全部取消</a>
						<a href='javascript:void(0)' class='check fr' @click="selectUnselect('1')">全部选择</a>
					</div>
					<div class='fl' style='width: 100%;margin-bottom: 20px;' v-if='(directSalet && directSalet.length >= 1) || (hasdirectShop && hasdirectShop.length >= 1) '>
						<div class='fl' style='height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;'>直营店</div>
						<div class='selectbtns newCard fl' style='width: 110px;' v-if='directSalet && directSalet.length >= 1'>
							<span :class="dirCheckAll ? 'sign fl' : 'fl'" @click='directCheckAll'>全部</span>
						</div>
						<multiselect :list='directSalet' :unlist='hasdirectShop' :selects='directSaletOn' :name="'shopName'" :key="'id'" class='newCard'
						    style='overflow: visible;'>
						</multiselect>
					</div>
					<div class='fl' style='width: 100%;' v-if='(napaStores && napaStores.length >= 1) || (hasnapaShop && hasnapaShop.length >= 1)'>
						<div class='fl' style='height: 50px;width:100%;line-height: 50px;text-align: left;margin-left: 0;font-size: 16px;'>加盟店</div>
						<div class='selectbtns newCard fl' style='width: 110px;' v-if='napaStores && napaStores.length >= 1'>
							<span :class="napCheckAll ? 'sign fl' : 'fl'" @click='napaStCheckAll'>全部</span>
						</div>
						<multiselect :list='napaStores' :unlist='hasnapaShop' :selects='napaStoresOn' :name="'shopName'" :key="'id'" class='newCard'
						    style='width: 570px;'></multiselect>
					</div>
				</div>
			</div>
		</win>
	</div>

</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				title: '选择店铺',
				shopIds: '', //所有店铺
				shopId: null, //单店Id
				ischain: null,
				shopList: null,
				napaStores: [], // 加盟店
				napaStoresOn: '', // 加盟店选中的
				directSalet: [], // 直营店
				directSaletOn: '', // 直营店选中的
				dirCheckAll: false, // 直营店全选
				napCheckAll: false, // 加盟店全选
				dirObjIndex: {}, // 直营店索引
				napObjIndex: {}, // 加盟店索引
				hashopId: '', //已经治过卡的Id
				hasdirectShop: [], //已经被选择过得直营店的店铺
				hasnapaShop: [], // 已经被选择过的加盟店的店铺
				userData: null,
				shopData: null
			};
		},
		props: ['onnapaStores', 'ondirectSalet', 'IshopId', 'shop'],
		mounted() {
			this.userData = storage.session('userShop');
			this.shopData = storage.session('shopList');
			this.ischain = this.userData.currentShop.ischain; // 0为单店 3为品牌
			this.shopId = this.userData.currentShop.id;
			this.napaStoresOn = utils.deepCopy(this.onnapaStores);
			this.directSaletOn = utils.deepCopy(this.ondirectSalet);
			this.hashopId = this.IshopId;
			this.shopList = this.shop;
			this.getShopList();
			console.log(this.hashopId);
			// console.log(this.directSalet)
			// console.log(this.napaStores)
		},
		watch: {
			directSaletOn: 'dirChange',
			napaStoresOn: 'napChange'
		},
		methods: {
			dirChange: function () {
				// 直营店发生变化
				if (this.directSaletOn.length == this.directSalet.length) {
					this.dirCheckAll = true;
				} else {
					this.dirCheckAll = false;
				}
			},
			napChange: function () {
				// 加盟店发生变化
				if (this.napaStores.length == this.napaStoresOn.length) {
					this.napCheckAll = true;
				} else {
					this.napCheckAll = false;
				}
			},
			getShopList: function () {
				let direct = [];
				let napashop = [];
				for (let i = 0; i < this.shopData.length; i++) {
					if (this.shopData[i].ischain == '1') {
						direct.push(this.shopData[i]);
					} else if (this.shopData[i].ischain == '2') {
						napashop.push(this.shopData[i]);
					}
				}
				// 筛选出加盟店和直营店
				if (this.hashopId == '') {
					// this.directSalet = this.userData.currentShop.direct;
					// this.napaStores = this.userData.currentShop.franchise;
					this.directSalet = utils.deepCopy(direct);
					this.napaStores = utils.deepCopy(napashop);
				} else {
					// let directShop = utils.deepCopy(this.userData.currentShop.direct);
					// let franchiseShop = utils.deepCopy(this.userData.currentShop.franchise);
					let directShop = utils.deepCopy(direct);
					let franchiseShop = utils.deepCopy(napashop);
					for (let i = 0; i < this.hashopId.length; i++) {
						for (let j = 0; j < directShop.length; j++) {
							if (directShop[j].id == this.hashopId[i]) {
								this.hasdirectShop.push(directShop[j]);
								directShop.splice(j, 1);
							}
						}
					}
					for (let i = 0; i < this.hashopId.length; i++) {
						for (let j = 0; j < franchiseShop.length; j++) {
							if (franchiseShop[j].id == this.hashopId[i]) {
								this.hasnapaShop.push(franchiseShop[j]);
								franchiseShop.splice(j, 1);
							}
						}
					}
					console.log(JSON.stringify(this.hasnapaShop));
					this.directSalet = directShop;
					this.napaStores = franchiseShop;
				}
				for (let i = 0; i < this.directSalet.length; i++) {
					// if (this.directSalet[i].status == '0') {
					this.dirObjIndex[this.directSalet[i].id] = i;
					// } else {
					//     this.directSalet.splice(i, 1);
					//     i--;
					// }
				}
				for (let i = 0; i < this.napaStores.length; i++) {
					// if (this.napaStores[i].status == '0') {
					this.napObjIndex[this.napaStores[i].id] = i;
					// } else {
					//     this.napaStores.splice(i, 1);
					//     i--;
					// }
				}
				this.napChange();
				this.dirChange();
			},
			selectUnselect: function (type) {
				// 全选 and 全不选
				if (type == '1') {
					let napaStores = [];
					let directSale = [];

					for (let i = 0; i < this.directSalet.length; i++) {
						directSale.push(this.directSalet[i].id);
					}
					for (let i = 0; i < this.napaStores.length; i++) {
						napaStores.push(this.napaStores[i].id);
					}

					this.directSaletOn = utils.deepCopy(directSale);
					this.napaStoresOn = utils.deepCopy(napaStores);
				} else {
					this.napaStoresOn = [];
					this.directSaletOn = [];
					this.dirCheckAll = false;
					this.napCheckAll = false;
				}
			},
			directCheckAll: function () {
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
			napaStCheckAll: function () {
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
			filterShopInfo: function (type) {
				let shopInfo = '';
				let shopList = [];
				// type为1返回店铺详情
				for (let i = 0; i < this.directSaletOn.length; i++) {
					shopInfo +=
						this.directSalet[this.dirObjIndex[this.directSaletOn[i]]].shopName +
						',';
					let obj = {
						shopId: this.directSalet[this.dirObjIndex[this.directSaletOn[i]]].id,
						name: this.directSalet[this.dirObjIndex[this.directSaletOn[i]]]
							.shopName,
						shopNumber: this.directSalet[this.dirObjIndex[this.directSaletOn[i]]]
							.shopNumber,
						initCardNumber: '',
						num: '',
						type: '1',
						isActivate: '1'
					};
					shopList.push(obj);
				}

				for (let i = 0; i < this.napaStoresOn.length; i++) {
					shopInfo +=
						this.napaStores[this.napObjIndex[this.napaStoresOn[i]]].shopName +
						',';
					let obj = {
						shopId: this.napaStores[this.napObjIndex[this.napaStoresOn[i]]].id,
						name: this.napaStores[this.napObjIndex[this.napaStoresOn[i]]]
							.shopName,
						shopNumber: this.napaStores[this.napObjIndex[this.napaStoresOn[i]]]
							.shopNumber,
						initCardNumber: '',
						num: '',
						type: '2',
						isActivate: '1'
					};
					shopList.push(obj);
				}

				shopInfo = shopInfo.substring(0, shopInfo.length - 1);

				let napaStoresOn = String(this.napaStoresOn);
				let directSaletOn = String(this.directSaletOn);

				for (let i = 0; i < this.shopList.length; i++) {
					if (
						directSaletOn.match(this.shopList[i].shopId) ||
						napaStoresOn.match(this.shopList[i].shopId)
					) {
						let shopids = utils.deepCopy(this.shopList[i].shopId);
						for (let j = 0; j < shopList.length; j++) {
							if (shopids.match(shopList[j].shopId)) {
								shopList.splice(j, 1, utils.deepCopy(this.shopList[i]));
								break;
							}
						}
					}
				}

				if (type == '1') {
					return shopList;
				} else {
					return shopInfo;
				}
			},
			save: function (res) {
				let list = {};
				if (res == 'ok') {
					list.napaStoresOn = this.napaStoresOn;
					list.directSaletOn = this.directSaletOn;
					list.shopInfo = this.filterShopInfo();
					list.shopList = this.filterShopInfo('1');
					// createCard.shopInfoIndex = createCard.shopList.length - 1;
				}
				this.$emit('getShop', res, list);
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			multiselect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select')
		}
	};
</script>

<style lang='css' scoped>
	#cardShopTan .newCard span {
		color: #333;
		min-width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #d2d2d2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #ffffff;
	}

	#cardShopTan .newCard span.sign {
		color: #ff9200;
		border: 1px solid #ff9200;
	}

	#cardShopTan .newCard span:hover {
		background-color: #ffffff;
	}

	#cardShopTan .newCard .unsign {
		background: #d2d2d2;
	}

	#cardShopTan .newCard .unsign:hover {
		background: #d2d2d2;
	}
</style>