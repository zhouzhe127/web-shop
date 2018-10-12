<template>
	<div class="shopList" id="conBox">
		<div class="shopList">
			<p>请关联商品</p>
			<ul class="shopTitle title">
				<li style="width: 230px;"></li>
				<li style="width: 560px;">外卖商品</li>
				<li style="width: 600px;">闪店系统</li>
			</ul>
			<div class="contentBox">
				<div class="content" v-for="(item,index) in eleGoods" :key="index">
					<div class="category">{{item.categoryName}}</div>
					<div class="sdgoods">
						<ul v-for="(itemSon,i) in item.list" :key="i">
							<li style="border-left: 5px solid #F7F7F7;">{{itemSon.specName}}</li>
							<li v-if="!itemSon.goodsId">
								<!--<span v-if="itemSon.sdGoodsId">{{itemSon.sdGoodsId}}</span>-->
								<span class="goodsicon"></span>
								<a href="javascript:void(0)" @click="showGoods(itemSon)">选择关联菜品</a>
							</li>
							<li v-else>
								<span class="goodsName">{{getGoodsName(itemSon.goodsId,itemSon.isPackage)}}</span>
								<i class="edit" @click="editGoods(itemSon)"></i>
								<i class="delete" @click="deleteGoods(itemSon)"></i>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="tip-icon">
			<i></i>
			<span style="color: #999999;font-size: 16px;">请确保关联所有商品，否则在外卖渠道统计中未关联部分数据将不显示</span>
		</div>
		<div>
			<a href="javascript:void(0);" class="gray" @click="previous" style="margin-top: 20px;">上一步</a>
			<a href="javascript:void(0);" class="yellow" @click="success" style="margin-top: 20px;">完成</a>
		</div>
		<elerelation ref="relationwin" v-if="relationWin.winshow" :width="relationWin.width" :height="relationWin.height" :title="relationWin.title" @relationEvent="relationevn"></elerelation>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
const goodList = storage.session('goodList');
const packlist = storage.session('packageList'); //所有套餐
export default {
	data() {
		return {
			boxList: [], //外卖列表数据
			urlData: '', //外卖URL
			showMt: false, //美团授权弹框
			goods: goodList, //所有菜品
			packageGoods: packlist, //所有套餐
			fixed: [], //固定套餐
			category: '', //所有菜品分类
			eleShopList: [], //饿了么店铺列表
			relation: true, //关联店铺页面
			eleShopid: '', //选中的店铺id
			eleGoods: [], //饿了么菜品数据
			edit: false, //编辑true,饿了么第一次关联菜品为false
			bandtype: '', //1为饿了么，3为百度
			userData: '',
			brandId: '',
			relationWin: {
				width: 920,
				height: 600,
				title: '关联商品',
				winshow: false
			}
		};
	},
	mounted() {
		this.eleShopid = this.$route.query.id;
		this.bandtype = storage.session('waimai');
		console.log(this.bandtype);
		this.userData = storage.session('userShop');
		document.querySelector('#warrant').style.height = 100+'%';
		this.brandId =
			this.userData.currentShop.ischain == 0
				? 0
				: this.userData.currentShop.brandId;
		for (let i = 0; i < packlist.length; i++) {
			if (packlist[i].type == 0 && packlist[i].status != 2) {
				this.fixed.push(packlist[i]);
			}
		}
		this.init();
	},
	methods: {
		async init() {
			if (this.bandtype == 1) {
				let data = await http.takeoutGetCategoryList({
					data: {
						eleShopId: this.eleShopid
					}
				});
				this.category = data;
				this.eleGoods = [];
				//请求分类下的商品
				console.log(data);
				this.reqList(this.category.length - 1);
			} else if (this.bandtype == 3) {
				let data = await http.getBaiduGoods({
					data: {
						brandId: this.brandId,
						shopId: this.eleShopid,
						type: 2
					}
				});
				this.eleGoods = data;
				//判断是否有关联菜品
				// for (let j = 0; j < this.eleGoods.length; j++) {
				// 	for (let k = 0; k < this.eleGoods[j].list.length; k++) {
				// 		if (this.eleGoods[j].list[k].goodsId !== '') {
				// 			this.edit = true;
				// 		}
				// 	}
				// }
				//没有关联自动关联
				// if (!this.edit) {
				// 	for (let i = 0; i < this.eleGoods.length; i++) {
				// 		for (let j = 0; j < this.eleGoods[i].list.length; j++) {
				// 			for (let k = 0; k < this.goods.length; k++) {
				// 				let itemArr = this.eleGoods[i].list[
				// 					j
				// 				].specName.split('(');
				// 				let goodsArr = this.goods[k].goodsName.split(
				// 					'('
				// 				);
				// 				if (goodsArr[0] == itemArr[0]) {
				// 					this.eleGoods[i].list[j].goodsId =
				// 						itemArr[1] == ')'
				// 							? this.goods[k].id
				// 							: '';
				// 					this.eleGoods[i].list[j].isPackage = 0;
				// 				}
				// 			}
				// 		}
				// 	}
				// }
			}
		},
		async reqList(i) {
			//请求分类下的商品
			if (i < 0) {
				storage.session('waimaiGoods', this.eleGoods);
				return;
			} else {
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
					// for (let j = 0; j < goods[0].list.length; j++) {
					// 	if (goods[0].list[j].goodsId !== '') {
					// 		this.edit = true;
					// 	}
					// }
					//没有关联自动关联
					// if (!this.edit) {
					// 	for (let j = 0; j < goods[0].list.length; j++) {
					// 		for (let n = 0; n < this.goods.length; n++) {
					// 			let itemArr = goods[0].list[j].specName.split(
					// 				'('
					// 			);
					// 			let goodsArr = this.goods[n].goodsName.split(
					// 				'('
					// 			);
					// 			if (goodsArr[0] == itemArr[0]) {
					// 				goods[0].list[j].goodsId = itemArr[1] == ')' ? this.goods[n].id : '';
					// 				goods[0].list[j].isPackage = 0;
					// 			}
					// 		}
					// 	}
					// }
					this.eleGoods.unshift(goods[0]);
				}
				this.reqList(i - 1);
			}
		},

		showGoods: function(item) {
			this.item = item;
			this.relationWin.winshow = true;
		},
		editGoods: function(item) {
			this.item = item;
			this.relationWin.winshow = true;
		},
		deleteGoods: function(item) {
			this.$store.commit('setWin', {
				title: '提示',
				content: '是否取消关联?',
				winType: 'confirm',
				callback: async res => {
					if (res == 'ok') {
						for (let i = 0; i < this.eleGoods.length; i++) {
							for (
								let j = 0;
								j < this.eleGoods[i].list.length;
								j++
							) {
								if (
									item.goodsId ==
									this.eleGoods[i].list[j].goodsId
								) {
									this.eleGoods[i].list[j].goodsId = '';
								}
							}
						}
					}
				}
			});
		},
		previous: function() {
			window.history.go(-1);
		},
		async success() {
			let returnData = [];
			//未关联的菜品在eleGoods删除掉
			for (let i = 0; i < this.eleGoods.length; i++) {
				for (let j = 0; j < this.eleGoods[i].list.length; j++) {
					if (this.eleGoods[i].list[j].goodsId !== '') {
						returnData.push(this.eleGoods[i].list[j]);
					}
				}
			}
			for (let i = 0; i < returnData.length; i++) {
				returnData[i].goodsId = parseInt(returnData[i].goodsId);
			}
			if (returnData.length == 0) {
				this.alert('提示', '请关联菜品！');
				return false;
			}
			let resoleUrl = this.edit
				? 'editGoodsRelation'
				: 'addGoodsRelation';
			let data = await http[resoleUrl]({
				data: {
					type: this.bandtype, //饿了么为1，美团为2，百度为3
					relation: JSON.stringify(returnData)
				}
			});
			if(!data)return;
			this.init();
			window.close();
		},
		relationevn(str) {
			this.relationWin.winshow = false;
			if (str == 'ok') {
				this.relationClose();
			}
		},
		relationClose() {
			let threeVue = this.$refs.relationwin;
			console.log(threeVue.fixedIndex);
			if (
				threeVue.goodsIndex.length == 0 &&
				threeVue.fixedIndex.length == 0
			) {
				this.alert('提示', '请选择菜品！');
				this.relationWin.winshow = true;
				return false;
			}
			//将关联的菜品id匹配到列表中
			for (let i = 0; i < this.eleGoods.length; i++) {
				for (let j = 0; j < this.eleGoods[i].list.length; j++) {
					if (!threeVue.ispack) {
						if (
							this.eleGoods[i].list[j].isPackage == 0 &&
							this.eleGoods[i].list[j].goodsId ==
								threeVue.goodsIndex[0]
						) {
							this.relationWin.winshow = true;
							this.alert(
								'提示',
								'该菜品已关联外卖菜品，请重新选择！'
							);
							return false;
						}
					} else {
						if (
							this.eleGoods[i].list[j].isPackage == 1 &&
							this.eleGoods[i].list[j].goodsId ==
								threeVue.fixedIndex[0]
						) {
							this.relationWin.winshow = true;
							this.alert(
								'提示',
								'该菜品已关联外卖菜品，请重新选择！'
							);
							return false;
						}
					}
				}
			}
			for (let i = 0; i < this.eleGoods.length; i++) {
				for (let j = 0; j < this.eleGoods[i].list.length; j++) {
					if (this.item.specId == this.eleGoods[i].list[j].specId) {
						if (threeVue.ispack) {
							this.eleGoods[i].list[j].goodsId =
								threeVue.fixedIndex[0];
							this.eleGoods[i].list[j].isPackage = 1;
						} else {
							this.eleGoods[i].list[j].goodsId =
								threeVue.goodsIndex[0];
							this.eleGoods[i].list[j].isPackage = 0;
						}
					}
				}
			}
		},
		alert(title, con) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
		//通过菜品id获取菜品名字
		getGoodsName: function(id, isPackage) {
			if (isPackage == 0) {
				for (let i = 0; i < this.goods.length; i++) {
					if (id == this.goods[i].id) {
						return this.goods[i].goodsName;
					}
				}
			} else {
				for (let i = 0; i < this.fixed.length; i++) {
					if (id == this.fixed[i].id) {
						return this.fixed[i].packageName;
					}
				}
			}
		}
	},
	components: {
		elerelation: () =>
			import(/*webpackChunkName: "elerelation_win"*/ 'src/module/outfood/accredit/elerelation_win')
	}
};
</script>
<style scoped>
#warrant .box {
	display: inline-block;
	width: 340px;
	height: 167px;
	background: #fafafa;
	margin-left: 100px;
}
#warrant .box .left,
#warrant .box .right {
	display: inline-block;
	height: 167px;
	vertical-align: middle;
}
#warrant .box .left {
	width: 140px;
}
#warrant .box .right {
	width: 195px;
}
#warrant .right span:nth-of-type(1) {
	display: inline-block;
	width: 100px;
	height: 24px;
	font-size: 24px;
	margin-top: 47px;
	margin-left: 22px;
}
#warrant .right .rant {
	display: inline-block;
	width: 100px;
	height: 30px;
	border: 1px solid #f8931f;
	color: #f8931f;
	border-radius: 15px;
	text-align: center;
	line-height: 27px;
	margin-top: 20px;
	font-size: 14px;
	margin-left: 22px;
	cursor: pointer;
}
#warrant .box .one {
	background: url(../../../res/images/eleme.png) no-repeat 20px 34px;
}
#warrant .box .two {
	background: url(../../../res/images/meituan.png) no-repeat 20px 34px;
}
#warrant .box .three {
	background: url(../../../res/images/baidu.png) no-repeat 20px 34px;
}
#warrant .box .warranted {
	background: url(../../../res/images/warrant.png) no-repeat 80px 108px;
}
#warrant .box .warranted span {
	margin-top: 72px !important;
}

#warrant .box .eleJump {
	display: inline-block;
	width: 340px;
	height: 167px;
	position: relative;
	bottom: 167px;
	z-index: 100;
}
#jumpShop {
	background: #ededed;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	overflow: auto;
}
#warrant #jumpShop .shopBox {
	width: 1441px;
	/*height: 796px;*/
	margin: 0 auto;
	margin-top: 60px;
	z-index: 1000;
}
#warrant #jumpShop .shopBox .shopList {
	width: 100%;
	height: 700px;
	background: #ffffff;
}
#warrant #jumpShop .shopBox .shopList p {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 22px;
	color: #43414a;
	text-align: center;
}
#jumpShop .title {
	background: #f7f7f7;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
}
#jumpShop ul li {
	display: inline-block;
	width: 33%;
	text-align: center;
}
#jumpShop .eleShop li {
	height: 100px;
	line-height: 100px;
	font-size: 16px;
	color: #43414a;
	border-bottom: 4px solid #f7f7f7;
}
.circle {
	display: inline-block;
	width: 21px;
	height: 21px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	margin-left: 5px;
	background: #fff;
	vertical-align: middle;
}
.ele-active {
	background: url(../../../res/icon/eleicon.png) center center no-repeat;
}
#warrant .shopBox a {
	margin-top: 30px;
}
#warrant .shopBox i {
	display: inline-block;
	width: 44px;
	height: 44px;
	background: url(../../../res/icon/success.png) center center no-repeat;
	vertical-align: middle;
	margin-right: 16px;
}
#warrant .gray {
	margin-left: 540px;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
#jumpShop .tip-icon {
	margin-top: 20px;
}
#jumpShop .tip-icon i {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../res/icon/prompt.png) center center no-repeat;
}
#warrant .shopList .content {
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .category {
	display: inline-block;
	width: 210px;
	height: 60px;
	line-height: 60px;
	vertical-align: top;
	text-align: center;
}
#warrant .shopList .content .sdgoods {
	display: inline-block;
	width: 1200px;
}
#warrant .shopList .content .sdgoods i {
	display: inline-block;
	width: 20px;
	height: 20px;
}
#warrant .shopList .content .sdgoods .edit {
	background: url(../../../res/icon/iconchange.png) no-repeat;
}
#warrant .shopList .content .sdgoods .delete {
	background: url(../../../res/icon/icondelete.png) no-repeat;
}
#warrant .shopList .content .sdgoods a {
	width: 100px;
	color: #ff9800;
	text-decoration: underline;
	margin-top: 0;
}
#warrant .shopList .content .sdgoods .goodsicon {
	display: inline-block;
	width: 120px;
	height: 44px;
	background: url(../../../res/images/bind.png) center center no-repeat;
	vertical-align: middle;
}
#warrant .shopList .content .sdgoods .goodsName {
	display: inline-block;
	width: 120px;
	height: 44px;
	line-height: 44px;
	margin-right: 20px;
	vertical-align: middle;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#warrant .shopList .content .sdgoods ul li {
	width: 590px;
	height: 60px;
	line-height: 60px;
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .sdgoods ul:last-child li {
	border-bottom: 0;
}
#warrant .shopList .contentBox {
	height: 580px;
	overflow-x: scroll;
}
</style>

