<template>
	<div id="elerelation">
		<el-container style="height: 100%;">
			<el-aside width="200px" style="height: 100%;overflow: auto;">
				<el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @select="getSle" style="height: 100%;border-right: solid 4px #e6e6e6;">
					<el-menu-item v-for="(item,i) in mainData" :index='`${i}`' :key="i">
						<span slot="title">{{item.categoryName}}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main style="height: 100%;overflow: auto;">
				<el-table :data="tableData" style="width: 100%" height="100%">
					<el-table-column prop="specName" label="外卖商品">
					</el-table-column>
					<el-table-column label="闪店系统">
						<template slot-scope="scope">
							<div v-if="!scope.row.goodsId">
								<el-button type="text" @click="editGoods(scope.row)">选择关联菜品</el-button>
								<span class="goodsicon"></span>
							</div>
							<div v-else>
								<span class="goodsName">{{getGoodsName(scope.row.goodsId,scope.row.isPackage)||'--'}}</span>
								<!-- <i class="edit" @click="editGoods(scope.row)"></i>
								<i class="delete" @click="deleteGoods(scope.row)"></i> -->
								<el-button type="primary" icon="el-icon-edit-outline" @click="editGoods(scope.row)" size="mini" circle></el-button>
								<el-button type="danger" icon="el-icon-delete" @click="deleteGoods(scope.row)" size="mini" circle></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
		<div class="tip-icon">
			<i></i>
			<span style="color: #999999;font-size: 16px;">请确保关联所有商品，否则在外卖渠道统计中未关联部分数据将不显示</span>
		</div>
		<div class="footer">
			<el-row type="flex" justify="space-between">
				<el-button type="info" @click="previous">上一步</el-button>
				<el-button type="primary" @click="success">完成</el-button>
			</el-row>
		</div>
		<relation v-if="showWin" :showWin="showWin" :selgoods="selected" :goodList="goodList" :sendpacklist="fixed"
		 @relationEvent='winEvent'></relation>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	const goodList = storage.session('goodList');
	const packlist = storage.session('packageList'); //所有套餐
	let eleShopid = ''; //选中的店铺id
	let userData = storage.session('userShop');
	let brandId = userData.currentShop.ischain == 0 ? 0 : userData.currentShop.brandId;
	let bandtype = storage.session('waimai');
	if (goodList) {
		for (let i = 0; i < goodList.length; i++) {
			//过滤掉称重商品下架商品
			if (
				goodList[i].type == 1 ||
				goodList[i].type == 2 ||
				goodList[i].status == 2 ||
				goodList[i].isGroup == 1
			) {
				goodList.splice(i, 1);
				i--;
			}
		}
	}
	export default {
		data() {
			0;
			return {
				tabPosition: 'left',
				tableData: [],
				fixed: [], //固定套餐
				mainData: [],
				activeIndex: '0',
				edit: false, //编辑true,第一次关联菜品为false
				showWin: false,
				goodList: goodList,
				packlist: packlist,
				selected: '',
				editItem: ''
			};
		},
		methods: {
			async init() {
				if (bandtype == 1) {
					let data = await http.takeoutGetCategoryList({
						data: {
							eleShopId: eleShopid
						}
					});
					this.category = data;
					//请求分类下的商品
					this.reqList(this.category.length - 1);
				} else if (bandtype == 3) {
					let data = await http.getBaiduGoods({
						data: {
							brandId: brandId,
							shopId: eleShopid,
							type: 2
						}
					});
					this.mainData = data;
					this.getSle(0);
				}
				//判断是否有关联菜品
				for (let j = 0; j < this.mainData.length; j++) {
					for (let k = 0; k < this.mainData[j].list.length; k++) {
						if (this.mainData[j].list[k].goodsId !== '') {
							this.edit = true;
							break;
						}
					}
				}
			},
			async reqList(i) {
				//请求分类下的商品
				if (i >= 0) {
					let data = await http.getGoodsByCategoryId({
						data: {
							categoryId: this.category[i].categoryId,
							page: 1,
							num: 9999,
							type: 2 //1为商品列表数据  2为规格列表数据
						}
					});
					let goods = data;
					//给商品列表增加分类名
					if (goods[0].list.length > 0) {
						for (let k = 0; k < this.category.length; k++) {
							for (let j = 0; j < goods.length; j++) {
								if (
									this.category[k].categoryId ==
									goods[j].categoryId
								) {
									goods[j].categoryName = this.category[
										k
									].categoryName;
								}
							}
						}
						//判断是否有关联菜品
						for (let j = 0; j < goods[0].list.length; j++) {
							if (goods[0].list[j].goodsId !== '') {
								this.edit = true;
							}
						}
						this.mainData.unshift(goods[0]);
					}
					this.reqList(i - 1);
				}else{
					this.getSle(0);
				}
			},
			getSle(i) {
				this.tableData = this.mainData[Number(i)].list;
			},
			//通过菜品id获取菜品名字
			getGoodsName: function (id, isPackage) {
				if (isPackage == 0) {
					for (let item of goodList) {
						if (id == item.id) {
							return item.goodsName;
						}
					}
				} else {
					for (let item of this.fixed) {
						if (id == item.id) {
							return item.packageName;
						}
					}
				}
			},
			editGoods(item) {
				this.showWin = true;
				this.selected = '';
				if (item.goodsId) {
					this.selected =item.isPackage==1?`0${item.goodsId}`:item.goodsId;
				}
				this.editItem = item;
			},
			winEvent(data) {
				this.showWin = false;
				if (data) {
					for (let item of this.mainData) {
						for (let list of item.list) {
							if (list.goodsId == data.selected) {
								this.$message({
									message: `该菜品已关联外卖菜品"${list.specName}"，请重新选择！`,
									type: 'warning'
								});
								this.showWin = true;
							}
						}
					}
					if (!this.showWin) {
						this.editItem.goodsId = data.selected;
						this.editItem.isPackage = data.isPackage;
					}
				}

			},
			deleteGoods: function (item) {
				this.$confirm('是否取消关联?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					item.goodsId = '';
					this.$message({
						type: 'success',
						message: '取消关联成功请点击完成按钮保存!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			async success() {
				let returnData = [];
				//未关联的菜品在eleGoods删除掉
				for (let i = 0; i < this.mainData.length; i++) {
					for (let j = 0; j < this.mainData[i].list.length; j++) {
						if (this.mainData[i].list[j].goodsId !== '') {
							returnData.push(this.mainData[i].list[j]);
						}
					}
				}
				for (let i = 0; i < returnData.length; i++) {
					returnData[i].goodsId = parseInt(returnData[i].goodsId);
				}
				if (returnData.length == 0) {
					this.$message({
						type: 'info',
						message: '请关联菜品'
					});
					return false;
				}
				let resoleUrl = this.edit ?
					'editGoodsRelation' :
					'addGoodsRelation';
				let data = await http[resoleUrl]({
					data: {
						type: bandtype, //饿了么为1，美团为2，百度为3
						relation: JSON.stringify(returnData)
					}
				});
				if (!data) return;
				this.init();
				window.close();
			},
			previous: function () {
				window.history.go(-1);
			},
		},
		mounted() {
			eleShopid = this.$route.query.id;
			for (let i = 0; i < packlist.length; i++) {
				if (packlist[i].type == 0 && packlist[i].status != 2) {
					this.fixed.push(packlist[i]);
				}
			}
			this.init();
		},
		components: {
			relation: () =>
				import( /*webpackChunkName: "relation_win"*/ 'src/module/outfood/accredit/elerelation_win')
		},
	};
</script>
<style lang='less' scoped>
	#elerelation {
		height: 85%;
		background-color: #ffffff;

		.tebbox {
			width: 200px;
			display: inline-block;
		}

		.tableBox {
			display: inline-block;
		}

		.tip-icon i {
			margin-top: 10px;
			display: inline-block;
			width: 18px;
			height: 18px;
			background: url(../../../res/icon/prompt.png) center center no-repeat;
		}

		.footer {
			padding: 20px;
			width: 300px;
			margin: 0 auto;
		}

		.goodsName {
			display: inline-block;
			margin-right: 15px;
		}

		.goodsicon {
			display: inline-block;
			width: 120px;
			height: 44px;
			background: url(../../../res/images/bind.png) center center no-repeat;
			vertical-align: middle;
		}
	}
</style>