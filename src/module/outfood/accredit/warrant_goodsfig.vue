<template>
	<div class="shopList" id="releGoods">
		<div class="shopList">
			<p>请关联商品
				<span class="outaddGoods blue" @click="addFood">
					<span>+</span>
					<span>添加商品</span>
				</span>
			</p>
			<ul class="shopTitle title">
				<li style="width: 230px;"></li>
				<li style="width: 560px;">外卖商品</li>
				<li style="width: 600px;">闪店系统(已关联{{relNum}}/{{allNum}})</li>
			</ul>
			<div class="contentBox">
				<div class="content" v-for="(item,index) in goodsList" :key="index" v-if="item.list.length>0">
					<div class="category">{{item.categoryName}}</div>
					<div class="sdgoods">
						<ul v-for="(itemSon,i) in item.list" :key="i">
							<li style="border-left: 5px solid #F7F7F7; text-align: left;">
								<span class="namestyle" style="text-align: center;">{{itemSon.dishSkuName}}
									<span v-if="itemSon.spec">({{itemSon.spec}})</span>
								</span>
								<i class="edit" @click="editMain(itemSon)" v-if="itemSon.eDishSkuCode"></i>
								<i class="delete" @click="deleteGoods(itemSon,item,i)" v-if="itemSon.eDishSkuCode"></i>
							</li>
							<li v-if="!itemSon.eDishSkuCode||!getGoodsName(itemSon.eDishSkuCode)">
								<!--<span v-if="itemSon.sdGoodsId">{{itemSon.sdGoodsId}}</span>-->
								<span class="goodsicon"></span>
								<a href="javascript:void(0)" @click="showGoods(itemSon)">选择关联菜品</a>
							</li>
							<li v-else>
								<span class="goodsName">{{getGoodsName(itemSon.eDishSkuCode)}}</span>
								<i class="edit" @click="editGoods(itemSon)"></i>
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
		<addfood-win ref="addwin" v-if="addWin.winshow" :item="item" :type="addWin.type" :goodsList="goodsList" :width="addWin.width" :height="addWin.height" :title="addWin.title" @winEvent="addfoodwin"></addfood-win>
		<relationWin ref="relationwin" v-if="relationWin.winshow" :width="relationWin.width" :item="relationItem" :changeConfig="relationWin.changeConfig" :seloneAir="relationWin.seloneAir" :seltwoAir="relationWin.seltwoAir" :height="relationWin.height" :title="relationWin.title" @relationEvent="relationevn"></relationWin>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
// import global from 'src/manager/global';
//获取保存商品信息
let goodList = storage.session('goodList');
if (!goodList) {
	// 请求商品列表
	goodList = []; //所有商品
	// sdShopServer.goods.getAllGoodsList(
	// 	1000,
	// 	function(list) {
	// 		let lists = list;
	// 		for (let i = 0; i < lists.length; i++) {
	// 			//过滤掉称重商品下架商品
	// 			if (
	// 				lists[i].type == 1 ||
	// 				lists[i].type == 2 ||
	// 				lists[i].status == 2 ||
	// 				lists[i].isGroup == 1
	// 			) {
	// 				lists.splice(i, 1);
	// 				i--;
	// 			}
	// 		}
	// 		goodList = lists;
	// 	},
	// 	'1'
	// );
} else {
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
let packlist = storage.session('packageList'); //所有套餐
export default {
	data() {
		return {
			goodsList: [],
			allGoods: '', //所有商品
			mtConfig: '', //所有分类
			allList: '',
			allNum: 0, //所有商品数量
			relNum: 0, //关联商品数量
			item: '',
			addWin: {
				width: 600,
				height: 800,
				title: '添加商品',
				winshow: false,
				type: ''
			},
			relationWin: {
				width: 1000,
				height: 500,
				title: '关联商品',
				winshow: false,
				addClassify: '',
				seloneAir: {},
				seltwoAir: {},
				changeConfig: 1
			},
			checkEide: false,
			relationItem: ''
		};
	},
	methods: {
		//初始化列表数据
		async init() {
			//请求美团数据
			this.allNum = 0;
			this.relNum = 0;
			let data = await http.getMeituntGoods({
				data: {}
			});
			let allgoods = [];
			for (let i = 0; i < data.length; i++) {
				let obj = {};
				let check = true;
				obj.categoryName = data[i].categoryName;
				this.allNum += data[i].waiMaiDishSkuBases.length;
				for (let k = 0; k < data[i].waiMaiDishSkuBases.length; k++) {
					data[i].waiMaiDishSkuBases[k].dishId = data[i].dishId;
					data[i].waiMaiDishSkuBases[k].eDishCode = data[i].eDishCode;
					if (data[i].waiMaiDishSkuBases[k].eDishSkuCode) {
						this.relNum += 1;
					}
				}
				for (let j = 0; j < allgoods.length; j++) {
					if (data[i].categoryName == allgoods[j].categoryName) {
						allgoods[j].list = allgoods[j].list.concat(
							data[i].waiMaiDishSkuBases
						);
						check = false;
					}
				}
				if (check) {
					obj.list = data[i].waiMaiDishSkuBases;
					allgoods.push(obj);
				}
			}
			this.goodsList = allgoods;
		},
		showGoods: function(item) {
			this.item = item;
			this.checkEide = false;
			this.relationWin.winshow = true;
			this.relationItem = item;
		},
		editMain: function(item) {
			this.item = item;
			this.addWin.type = 2;
			this.addWin.winshow = true;
		},
		editGoods: function(item) {
			this.showGoods(item);
			this.checkEide = true;
		},
		deleteGoods: function(child, parent, index) {
			this.$store.commit('setWin', {
				title: '提示',
				content: '确定删除外卖商品?',
				winType: 'confirm',
				callback: async res => {
					if (res == 'ok') {
						let data = await http.meituanDeleteSku({
							data: {
								eDishCode: child.eDishCode,
								eDishSkuCode: child.eDishSkuCode,
								takeOutGoodsId: child.dishId,
								specId: child.dishSkuId
							}
						});
						if(!data)return;
						parent.list.splice(index, 1);
						this.relNum -= 1;
						this.allNum -= 1;
					}
				}
			});
		},
		addFood: function() {
			this.addWin.type = 1;
			this.addWin.winshow = true;
		},
		addfoodwin: function(str) {
			this.addWin.winshow = false;
			if (str == 'ok') {
				this.addfoodClose();
			}
		},
		async addfoodClose() {
			let addGoodsWin = this.$refs.addwin;
			let a = this.check(addGoodsWin.packageName, '商品名称不能为空');
			let b;
			let c;
			let d;
			let e;
			let f;
			let g;
			if (a) {
				b = this.check(addGoodsWin.mealboxNum, '餐盒数量不能为空');
			}
			if (
				b &&
				(+addGoodsWin.mealboxNum > 100 || +addGoodsWin.mealboxNum < 0)
			) {
				b = false;
				this.alert('提示', '餐盒数量0~100');
			}
			if (b) c = this.check(addGoodsWin.mealUnit, '餐盒价格不能为空');
			if (
				c &&
				(+addGoodsWin.mealUnit > 100 || +addGoodsWin.mealUnit < 0)
			) {
				c = false;
				this.alert('提示', '餐盒价格0~100');
			}
			if (c) d = this.check(addGoodsWin.minBuy, '最小购买数量不能为空');
			if (d && (+addGoodsWin.minBuy > 50 || +addGoodsWin.minBuy < 0)) {
				d = false;
				this.alert('提示', '最小购买数量0~50');
			}
			if (d) e = this.check(addGoodsWin.packagePice, '商品价格不能为空');
			if (
				e &&
				(+addGoodsWin.packagePice > 500 || +addGoodsWin.packagePice < 0)
			) {
				e = false;
				this.alert('提示', '商品价格0~500');
			}
			if (e) f = this.check(addGoodsWin.classifyname, '请选择分类');
			if (f) g = this.check(addGoodsWin.releSel, '请选关联菜品');
			let b1 = this.check(addGoodsWin.mealboxNum, '餐盒数量输入错误', 1);
			let d1 = this.check(addGoodsWin.minBuy, '最小购买数量输入错误', 1);
			let e1 = this.check(addGoodsWin.packagePice, '餐盒价格输入错误', 1);

			if (!a || !b || !c || !d || !e || !f || !g || !b1 || !d1 || !e1) {
				this.addWin.winshow = true;
				return false;
			}
			let data = await http.uploadGoods({
				data: {
					boxNum: addGoodsWin.mealboxNum,
					boxPrice: addGoodsWin.mealUnit,
					categoryName: addGoodsWin.classifyname,
					description: addGoodsWin.description,
					dishName: addGoodsWin.packageName,
					EDishCode: addGoodsWin.releSel.id,
					minOrderCount: addGoodsWin.minBuy,
					picture: addGoodsWin.imgupData,
					price: addGoodsWin.packagePice,
					isPackage: addGoodsWin.releSel.isPackage
				}
			});
			if(!data)return;
			this.init();
		},
		previous: function() {
			window.history.go(-1);
		},
		success: function() {
			if (this.relNum < this.allNum) {
				this.alert('提示', '您还有商品未关联请继续关联');
			} else {
				window.close();
			}
		},
		relationevn(str) {
			this.relationWin.winshow = false;
			if (str == 'ok') {
				this.relationClose();
			}
		},
		async relationClose() {
			if (this.$refs.relationwin.selected == '') {
				this.alert('提示', '请关联商品');
				this.relationWin.winshow = true;
				return false;
			}
			let checkRel = false;
			// let relMust = true;
			// let changeGoods = null;
			for (let i = 0; i < this.goodsList.length; i++) {
				for (let j = 0; j < this.goodsList[i].list.length; j++) {
					if (
						this.goodsList[i].list[j].eDishSkuCode ==
						this.$refs.relationwin.selected.id
					) {
						// changeGoods = this.goodsList[i].list[j];
						checkRel = true;
						break;
					}
				}
			}

			if (checkRel) {
				this.alert('提示', '该商品已经被关联请重新关联');
				this.relationWin.winshow = true;
				return false;
			}
			let relationwin = this.$refs.relationwin;
			if (/^(0)/.test(relationwin.selected.id)) {
				relationwin.selected.id = relationwin.selected.id.substr(
					1,
					relationwin.selected.id.length - 1
				);
			}
			let data = await http.bindgoods({
				data: {
					specId: this.item.dishSkuId,
					takeOutGoodsId: this.item.dishId,
					isPackage: relationwin.isPackage ? 1 : 0,
					goodsId: relationwin.selected.id
				}
			});
			if(!data)return;
			if (!this.checkEide) this.relNum += 1;
			this.item.eDishSkuCode = relationwin.isPackage
				? '0' + relationwin.selected.id
				: relationwin.selected.id;
		},
		check: function(val, text, type) {
			let emptyReg = /\S/;
			if (typeof val == 'object') {
				val = JSON.stringify(val);
			}
			if (type == 1) {
				emptyReg = /^[\d.]*$/;
			}
			if (!emptyReg.test(val)) {
				this.alert('错误提示', text);
				return false;
			}
			return true;
		},
		alert: function(title, con) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
		//通过菜品id获取菜品名字
		getGoodsName: function(id) {
			let res = /^(0)/;
			if (!res.test(id)) {
				for (let i = 0; i < goodList.length; i++) {
					if (id == goodList[i].id) {
						return goodList[i].goodsName;
					}
				}
			} else {
				id = id.substr(1, id.length - 1);
				for (let i = 0; i < packlist.length; i++) {
					if (id == packlist[i].id) {
						return packlist[i].packageName;
					}
				}
			}
			return false;
		}
	},
	mounted() {
		document.querySelector('#warrant').style.height = 100+'%';
		this.init();
	},
	components: {
		addfoodWin: () =>
			import(/*webpackChunkName: "addfood_win"*/ 'src/module/outfood/accredit/addfood_win'),
		relationWin: () =>
			import(/*webpackChunkName: "relation_win"*/ 'src/module/outfood/accredit/relation_win')
	}
};
</script>
<style lang="less" scoped>
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
#warrant .gray {
	margin-left: 540px;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
.namestyle {
	display: inline-block;
	width: 70%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	vertical-align: bottom;
	cursor: pointer;
}
.outaddGoods {
	width: 120px;
	height: 40px;
	color: #ffffff;
	line-height: 40px;
	float: right;
	margin: 10px 20px;
}
.outaddGoods span:first-child {
	font-size: 32px;
	vertical-align: middle;
	display: inline-block;
	margin-top: -8px;
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

