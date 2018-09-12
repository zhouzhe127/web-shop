<template>
	<win @winEvent="getWinClickResult" :align="'center'" :width="980" :height="550">
		<span slot="title">{{title}}</span>
		<!--关联商品套餐表单-->
		<section class="relatedForm" slot="content">
			<div class="loading" v-if="category.length==0">
				<img src="../../../res/images/preloader.gif" />
			</div>
			<section>
				<section class="place fl">
					<section class="class-Parent">
						<template v-for="(item , i) in category">
							<div v-if='shopIndex[0] == 1' :key="i">
								<span v-if="item.categoryId == L1ID" class="on" v-on:click="changeL1ID(item.categoryId,i)">{{item.categoryName}}</span>
								<span v-else v-on:click="changeL1ID(item.categoryId,i)">{{item.categoryName}}</span>
							</div>
							<div v-else :key="i">
								<span v-if="item.categoryName == L1ID" class="on" v-on:click="changeL1ID(item.categoryName,i)">{{item.categoryName}}</span>
								<span v-else v-on:click="changeL1ID(item.categoryName,i)">{{item.categoryName}}</span>
							</div>
						</template>
					</section>
					<section class="class-Child">
						<template v-if="child.length > 0 " v-for="(item , i) in child">
							<span v-if="item.goodsId == L2ID" v-on:click="changeL2ID(item.goodsId)" class="second-on" :key="i">{{item.goodsName}}</span>
							<span v-else v-on:click="changeL2ID(item.goodsId)" :key="i">{{item.goodsName}}</span>
						</template>
					</section>
				</section>
				<section class="fl" style="width: 100%;height: auto;margin-bottom: 10px;">
					<a href="javascript:void(0)" class="check fl" v-on:click="wholeOnCom">全部选择</a>
					<a href="javascript:void(0)" class="unselect fl" v-on:click="wholeOffCom">全部取消</a>
				</section>
			</section>
			<section class="comList" v-if="selectgoods.length>0">
				<mulSelect :list="selectgoods" :selects="goodsIndex" :name='"goodsName"' :keys='"goodsId"' :isradio="false" :styles="{'background-color':'#F1F1F1'}" @selOn="getRelation"></mulSelect>
			</section>
		</section>

	</win>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

let userData = storage.session('userShop');
let brandId;
if (userData.currentShop.brandId) {
	brandId = userData.currentShop.brandId;
} else {
	brandId = 0;
}
export default {
	props: {
		pObj: null
	},
	data() {
		return {
			L1ID: null,
			L2ID: 0,
			shopIndex: null,
			category: [],
			child: [],
			selectgoods: [],
			goodsCom: [],
			goodsIndex: [],
			selectPackages: [],
			show: -1,
			title: '添加关联菜品',
			areaIndex: null, //区域id
			goodsIds: null, //商品id
			eleShopId: null, //选中的店铺id
			goods: null
		};
	},
	methods: {
		getRelation: function(res) {
			if (res.length > 0) {
				this.goodsIndex = res;
			}
		},
		getWinClickResult: function(res) {
			if (res == 'ok') {
				//将选中的菜品转为后台需要的数据格式
				let goods = {};
				let allPackageIds = [];
				this.goodsLength = this.goodsIndex.length;
				this.goodsIds = this.goodsIndex;
				for (let i = 0; i < this.goodsIds.length; i++) {
					if (this.areaIndex[0] == 1) {
						for (let j = 0; j < this.goodsCom.length; j++) {
							if (this.goodsIds[i] == this.goodsCom[j].goodsId) {
								let packageIds = [];
								if (this.goodsCom[j].packageIds != '') {
									packageIds.push(
										this.goodsCom[j].packageIds
									);
								}
								allPackageIds = allPackageIds.concat(
									packageIds
								);
								this.packageIds = allPackageIds.toString();
								goods[this.goodsIds[i] + ''] = this.goodsCom[
									j
								].specId;
							}
						}
					} else if (this.areaIndex[0] == 2) {
						for (let j = 0; j < this.mtgoods.length; j++) {
							if (this.goodsIds[i] == this.mtgoods[j].goodsId) {
								let packageIds = [];
								if (this.mtgoods[j].packageIds != '') {
									packageIds.push(this.mtgoods[j].packageIds);
								}
								allPackageIds = allPackageIds.concat(
									packageIds
								);
								this.packageIds = allPackageIds.toString();
								goods[this.goodsIds[i] + ''] = this.mtgoods[
									j
								].specId;
							}
						}
					} else if (this.areaIndex[0] == 3) {
						for (let j = 0; j < this.baidugoods.length; j++) {
							if (
								this.goodsIds[i] == this.baidugoods[j].goodsId
							) {
								let packageIds = [];
								if (this.baidugoods[j].packageIds != '') {
									packageIds.push(
										this.baidugoods[j].packageIds
									);
								}
								allPackageIds = allPackageIds.concat(
									packageIds
								);
								this.packageIds = allPackageIds.toString();
								goods[this.goodsIds[i] + ''] = this.baidugoods[
									j
								].specId;
							}
						}
					}
				}
				this.goods = JSON.stringify(goods);
			}
			this.goodsIndex = utils.unique(this.goodsIndex);
			let postData = {
				goods: this.goods,
				packageIds: this.packageIds,
				goodsLength: this.goodsIndex.length,
				goodsIds: this.goodsIndex
			};
			this.$emit('toClick', res, postData);
		},
		async catecarygoods(index) {
			// 请求商品列表
			if (index < 1) {
				return;
			} else {
				let res = await http.getGoodsByCategoryId({
					data: {
						type: 1,
						categoryId: this.category[index].categoryId
					}
				});
				for (let i = 0; i < res.length; i++) {
					this.goodsCom.push(res[i]);
				}
				this.goodReady();
				this.catecarygoods(index - 1);
			}
		},
		changeL1ID: function(id) {
			this.L1ID = id;
			this.L2ID = 0;
			this.goodReady(id);
		},
		changeL2ID: function(id) {
			this.L2ID = id;
			this.goodReady(id);
		},
		incategory: function(cids) {
			if (this.L1ID == 0) return true;
			if (cids.indexOf(this.L1ID) >= 0 && this.L2ID == 0) {
				return true;
			} else if (cids.indexOf(this.L2ID) >= 0) {
				return true;
			}
			return false;
		},
		async requestAllList(id) {
			// 饿了么请求分类列表
			if (this.areaIndex[0] == 1) {
				let res = await http.takeoutGetCategoryList({
					data: {
						eleShopId: this.eleShopId
					}
				});
				this.category = res;
				if (res) {
					this.category.unshift({
						categoryName: '全部',
						categoryId: 0
					});
				}
				this.catecarygoods(this.category.length - 1);
			} else if (this.areaIndex[0] == 2) {
				let res = await http.getMtGoods({ data: {} });
				this.category = res.typeList;
				if (res) {
					this.category.unshift({
						categoryName: '全部',
						categoryId: 0
					});
				}
				this.mtgoods = res.goodsList;
				this.goodReady();
				let arr = [];
				for (let i = 0; i < this.mtgoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.mtgoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr = arr.concat(item);
						} else {
							if (this.incategory(item.categoryName)) {
								arr = arr.concat(item);
							}
						}
					} else {
						if (this.mtgoods[i].categoryName == id) {
							arr = arr.concat(this.mtgoods[i]);
						}
					}
				}
			} else if (this.areaIndex[0] == 3) {
				let res = await http.getBaiduGoods({
					data: {
						type: 1,
						brandId: brandId
					}
				});
				this.category = res.categoryList;
				if (res) {
					this.category.unshift({
						categoryName: '全部',
						categoryId: 0
					});
				}
				this.baidugoods = res.goodsList;
				this.goodReady();
				let arr = [];
				for (let i = 0; i < this.baidugoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.baidugoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr = arr.concat(item);
						} else {
							if (this.incategory(item.categoryName)) {
								arr = arr.concat(item);
							}
						}
					} else {
						if (this.baidugoods[i].categoryName == id) {
							arr = arr.concat(this.baidugoods[i]);
						}
					}
				}
			}
		},
		goodReady: function(id) {
			let arr = [];
			//饿了么美团数据格式不同 需要判断,eleme根据id选中，美团根据name选中
			if (this.areaIndex[0] == 1) {
				for (let i = 0; i < this.goodsCom.length; i++) {
					if (id === undefined || id === 0) {
						let item = this.goodsCom[i];
						if (!(item.categoryId instanceof Array)) {
							arr = arr.concat(item);
						} else {
							if (this.incategory(item.categoryId)) {
								arr = arr.concat(item);
							}
						}
					} else {
						if (this.goodsCom[i].categoryId == id) {
							arr = arr.concat(this.goodsCom[i]);
						}
					}
				}
			} else if (this.areaIndex[0] == 2) {
				for (let i = 0; i < this.mtgoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.mtgoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr.push(item);
						} else {
							if (this.incategory(item.categoryName)) {
								arr.push(item);
							}
						}
					} else {
						if (this.mtgoods[i].categoryName == id) {
							arr.push(this.mtgoods[i]);
						}
					}
				}
			} else if (this.areaIndex[0] == 3) {
				for (let i = 0; i < this.baidugoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.baidugoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr.push(item);
						} else {
							if (this.incategory(item.categoryName)) {
								arr.push(item);
							}
						}
					} else {
						if (this.baidugoods[i].categoryName == id) {
							arr.push(this.baidugoods[i]);
						}
					}
				}
			}
			this.selectgoods = arr;
		},
		wholeOnCom: function() {
			if (this.areaIndex[0]) {
				for (let i = 0; i < this.selectgoods.length; i++) {
					this.goodsIndex.push(this.selectgoods[i].goodsId);
				}
				this.goodsIndex = utils.unique(this.goodsIndex);
			}
		},
		wholeOffCom: function() {
			if (this.areaIndex[0]) {
				for (let i = 0; i < this.selectgoods.length; i++) {
					this.goodsIndex = this.goodsIndex.filter(x=>{
						return x!=this.selectgoods[i].goodsId;
					})
				}
			}
		}
	},
	mounted() {
		this.areaIndex = this.pObj.areaIndex;
		this.goodsIds = this.pObj.goodsIds;
		this.eleShopId = this.pObj.eleShopid;
		this.L1ID = this.areaIndex[0] == 1 ? 0 : '全部';
		this.shopIndex = this.areaIndex;
		this.goodsIndex = this.goodsIds;
		this.requestAllList();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		mulSelect: () =>
			import(/*webpackChunkName: "mul_select"*/ 'src/components/mul_select')
	}
};
</script>

<style scoped>
.selectbtns {
	width: auto;
}
.selectbtns span {
	background-color: #fff;
}
.selectbtns span:hover {
	background-color: #fff;
}
.relatedForm {
	width: 980px;
	height: 500px;
	padding: 30px;
}
.comList {
	width: 100%;
	height: auto;
	overflow: hidden;
	margin-bottom: 30px;
}
.comList .selectbtns {
	width: 100%;
}
.comList .selectbtns span,
.packageList span {
	background-color: #f1f1f1;
}
.comList .selectbtns span:hover,
.packageList span:hover {
	background-color: #f1f1f1;
}
.loading {
	width: 128px;
	margin: 200px auto;
}
</style>

