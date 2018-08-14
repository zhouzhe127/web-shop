<template>
	<win :width="1000" :height="700" @winEvent='winEvent'>
		<span slot="title">选择商品</span>
		<div slot="content" id="tas-addtas2" class="tas-addtas2">
			<!--商品-->
			<div class="tas-show2-title">
				<ul>
					<template v-for="(item,i) in category">
						<li :key="i" v-if="item.id == List1ID" @click="changeL1ID(item.id,i)" class="bgc-blue">{{item.name}}</li>
						<li :key="i" v-else @click="changeL1ID(item.id,i)" class="tas-Cuisine">{{item.name}}</li>
					</template>
				</ul>
			</div>
			<div class="tas-show2-taste" transition='slidUpDown'>
				<ul>
					<template v-for="(item,i) in child">
						<li :key="i" class="bgc-gray" v-if="item.id == List2ID" @click="changeL2ID(item.id)">{{item.name}}</li>
						<li :key="i" v-else @click="changeL2ID(item.id)" class="tas-tasList ">{{item.name}}</li>
					</template>
				</ul>
			</div>
			<div v-if="filterChilds()" class="tas-show2-goods">
				<ul>
					<template v-for="(item,index) in goodsSort">
						<template v-if="incategory(item.cids)">
							<li :key="index" class="tas-goodsList sign" v-if="isselected(item.id,'goods')" @click="deleteGoodsId(item.id,'goods')">{{item.goodsName}}</li>
							<li :key="index" class="tas-goodsList" v-else @click="addGoodsID(item.id,'goods')">{{item.goodsName}}</li>
						</template>
					</template>
				</ul>
			</div>
			<!--套餐-->
			<div class="tas-show2-title">
				<ul>
					<template v-for=" (item,index) in packageTitle">
						<li :key="index" v-if="item.id == packageIndex" @click="changePackage(item)" class="bgc-blue">{{item.name}}</li>
						<li :key="index" v-else @click="changePackage(item)" class="tas-Cuisine">{{item.name}}</li>
					</template>
				</ul>
			</div>
			<!--<a href="javascript:void(0)" class="check" @click="selectAllGoods('package')">全部选择</a>
            <a href="javascript:void(0)" class="unselect" @click="unSelectAllGoods('package')">全部取消</a>-->
			<div class="tas-show2-goods">
				<ul>
					<template v-for="(item,index) in packageList">
						<li :key="index" class="tas-goodsList" v-if="filterPackage(item.type)" :class="{'sign':isselected(item.id,'package')}" @click="deleteGoodsId(item.id,'package')">{{item.packageName}}</li>
					</template>
				</ul>
			</div>
		</div>
	</win>
</template>

<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';
	let userData = storage.session('userShop');
	export default {
		data() {
			return {
				category: [], // 商品列表一级分类
				child: [], // 商品列表二级分类
				goods: [], // 商品列表
				List1ID: 0, // 一级分类
				List2ID: 0, // 二级分类
				selectedGoodsID: [], //已经被选中的菜品（点击对应口味里面已经存在的）
				packageTitle: [
					{
						name: '全部',
						id: 0
					},
					{
						name: '可选套餐',
						id: 1
					},
					{
						name: '固定套餐',
						id: 2
					}
				],
				packageIndex: 0,
				packageList: [],
				selectPackageId: []
			};
		},
		props: ['selectShops', 'selectPackages', 'selectGoods'],
		computed: {
			goodsSort() {
				return utils.sortByAll(this.goods, 'id');
			}
		},
		methods: {
			winEvent(type) {
				if (type != 'ok') {
					this.$emit('closeWin');
					return false;
				}
				if (
					this.selectedGoodsID.length == 0 &&
					this.selectPackageId.length == 0
				) {
					this.$store.commit('setWin', {
						winType: 'alert',
						title: '提示信息',
						content: '请选择至少一道菜或者套餐'
					});
				} else {
					this.$emit('closeWin', {
						selectedGoodsID: this.selectedGoodsID,
						selectPackageId: this.selectPackageId
					});
				}
			},
			changeL1ID(id, i) {
				this.List1ID = id;
				this.List2ID = 0;
				this.child = this.category[i].child ? this.category[i].child : [];
			},
			changePackage(i) {
				this.packageIndex = i.id;
			},
			changeL2ID(id) {
				this.List2ID = id;
			},
			addGoodsID(id, type) {
				//点击添加
				this.selectPackageId = [];
				this.selectedGoodsID = [];

				if (type == 'goods') {
					this.selectedGoodsID.push(id);
				} else {
					this.selectPackageId.push(id);
				}
			},
			isSave(id, arr) {
				//                      arr = sd.copy(arr);
				let obj = {};
				for (let i = 0; i < arr.length; i++) {
					if (!obj[arr[i]]) {
						obj[arr[i]] = 666;
					}
				}
				if (obj[id]) {
					return false;
				}
				return true;
			},
			deleteGoodsId(id, type) {
				if (type == 'goods') {
					// this.selectedGoodsID.$remove(id);
					this.removeList(id);
				} else if (type == 'package') {
					if (
						this.selectPackageId.length == 0 ||
						(this.selectPackageId.length > 0 &&
							this.isSave(id, this.selectPackageId))
					) {
						this.addGoodsID(id, 'package');
					} else {
						// this.selectPackageId.$remove(id);
						this.removeList(id);
					}
				}
			},
			selectAllGoods(type) {
				if (type == 'package') {
					for (let j = 0; j < this.packageList.length; j++) {
						if (this.packageIndex == 0) {
							this.addGoodsID(this.packageList[j].id, 'package');
						} else if (this.packageIndex == 1) {
							if (this.packageList[j].type == 1) {
								this.addGoodsID(this.packageList[j].id, 'package');
							}
						} else if (this.packageIndex == 2) {
							if (this.packageList[j].type == 0) {
								this.addGoodsID(this.packageList[j].id, 'package');
							}
						}
					}
				} else {
					for (let i = 0; i < this.goods.length; i++) {
						if (this.List1ID == 0) {
							this.addGoodsID(this.goods[i].id, 'goods');
						} else if (
							this.goods[i].cids.indexOf(this.List1ID) >= 0 &&
							this.List2ID == 0
						) {
							this.addGoodsID(this.goods[i].id, 'goods');
						} else if (this.goods[i].cids.indexOf(this.List2ID) >= 0) {
							this.addGoodsID(this.goods[i].id, 'goods');
						}
					}
				}
			},
			removeList(gols) {
				let index = this.selectPackageId.indexOf(gols);
				this.selectPackageId.splice(index, 1);
			},
			unSelectAllGoods(type) {
				if (type == 'package') {
					for (let j = 0; j < this.packageList.length; j++) {
						if (this.packageIndex == 0) {
							// this.selectPackageId.$remove(this.packageList[j].id);
							this.removeList(this.packageList[j].id);
						} else if (this.packageIndex == 1) {
							if (this.packageList[j].type == 1) {
								// this.selectPackageId.$remove(this.packageList[j].id);
								this.removeList(this.packageList[j].id);
							}
						} else if (this.packageIndex == 2) {
							if (this.packageList[j].type == 0) {
								// this.selectPackageId.$remove(this.packageList[j].id);
								this.removeList(this.packageList[j].id);
							}
						}
					}
				} else {
					for (let i = 0; i < this.goods.length; i++) {
						if (this.List1ID == 0) {
							this.deleteGoodsId(this.goods[i].id, 'goods');
						} else if (
							this.goods[i].cids.indexOf(this.List1ID) >= 0 &&
							this.List2ID == 0
						) {
							this.deleteGoodsId(this.goods[i].id, 'goods');
						} else if (this.goods[i].cids.indexOf(this.List2ID) >= 0) {
							this.deleteGoodsId(this.goods[i].id, 'goods');
						}
					}
				}
			},
			incategory(cids) {
				if (this.List1ID == 0) return true;
				if (cids.indexOf(this.List1ID) >= 0 && this.List2ID == 0) {
					return true;
				} else if (cids.indexOf(this.List2ID) >= 0) {
					return true;
				}
				return false;
			},
			filterChilds() {
				let c = 0;
				for (let i = 0; i < this.goods.length; i++) {
					if (this.incategory(this.goods[i].cids)) c++;
				}
				return c > 0;
			},
			isselected(id, type) {
				//判断一级弹窗上的关联菜品 是否在二级弹窗显示
				let arr = [];
				if (type == 'goods') {
					arr = utils.deepCopy(this.selectedGoodsID);
				} else {
					arr = utils.deepCopy(this.selectPackageId);
				}

				if (arr.indexOf(id) == -1) {
					return false;
				} else {
					return true;
				}
			},
			isSelectPackage(id) {
				if (this.selectPackageId.indexOf(id) == -1) {
					return false;
				} else {
					return true;
				}
			},
			filterPackage(type) {
				if (this.packageIndex == 0) {
					return true;
				} else if (this.packageIndex == 1) {
					if (type == 1) {
						return true;
					}
					return false;
				} else if (this.packageIndex == 2) {
					if (type == 0) {
						return true;
					}
					return false;
				}
			},
			arrToString(arr) {
				let str = '';
				for (let i = 0; i < arr.length; i++) {
					str += arr[i];
					if (i < arr.length - 1) {
						str += ',';
					}
				}
				return str;
			},
			async init() {
				let rescategory = storage.session('areaList');

				this.category = rescategory;
				this.category.unshift({
					name: '全部',
					id: 0
				});
				let resgoods = storage.session('goodList');

				this.goods = resgoods;
				let respackageList = await http.getAllPackage({
					data: {
						page: 1,
						num: 9999,
						shopIds: this.arrToString(this.selectShops) ?
							this.arrToString(this.selectShops) :
							userData.currentShop.id
					}
				});
				this.packageList = respackageList;
			}
		},
		mounted() {
			this.selectedGoodsID = this.selectGoods ? this.selectGoods : [];
			this.selectPackageId = this.selectPackages ? this.selectPackages : [];
			this.init();
		},
		components: {
			win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		}
	};
</script>
<style type="text/css" scoped>
	.tas-addtas2 {
		width: 1000px;
		background-color: #fff;
		padding: 30px;
		color: #333;
	}

	.tas-addtas2 ul li {
		display: inline-block;
		padding: 0 20px 0 20px;
		font-size: 14px;
		text-align: center;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
	}

	.tas-Cuisine {
		background-color: #f3f3f3;
		margin-bottom: 5px;
	}

	.bgc-blue {
		background-color: #2980b9;
		color: #ffffff;
		position: relative;
	}

	.bgc-blue:after {
		content: "";
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 5px solid #fff;
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
		/* IE 9 */
		-ms-transform: translate(-50%, 0);
		/* Firefox */
		-moz-transform: translate(-50%, 0);
		/* Safari 和 Chrome */
		-webkit-transform: translate(-50%, 0);
		/* Opera */
		-o-transform: translate(-50%, 0);
	}

	.bgc-gray {
		background-color: #b5b5b7;
		cursor: pointer;
	}

	.tas-tasList {
		background-color: #f3f3f3;
		margin-bottom: 5px;
	}

	.tas-show2-goods {
		margin-top: 20px;
	}

	.tas-goodsList {
		background-color: #f3f3f3;
		margin-right: 14px;
		margin-bottom: 10px;
	}

	.taste-max {
		height: auto;
	}

	.tas-type span.sd-subadd {
		width: auto;
		height: 40px;
	}

	.tas-type .input-content {
		width: 64px;
		height: 38px;
	}

	.cata-delete {
		display: inline-block;
		cursor: pointer;
		background: url(../../res/icon/delete.png) center center no-repeat;
		height: 40px;
		width: 60px;
	}
</style>