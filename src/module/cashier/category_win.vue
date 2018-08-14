<template>
	<div>
		<win @winEvent="getData" :align="'center'" :width="800" :height="560">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<section class="allShop">
					<section class="shops">
						<section :style="{width: shopList.list.length*145 + 'px',left: leftWidth + 'px'}" style="position: absolute;transition: 1s;"
						    ref="shop">
							<span class="sel" v-for="(item,index) in shopList.list" :key="index" v-bind:class="{'on': shopList.flag == item.id}" @click="light(item.id,item.ischain,item.shopName)"
							    style="vertical-align: middle;">{{item.shopName}}</span>
						</section>
					</section>
					<span @click="left" class="dot left">&lt;</span>
					<span @click="right" class="dot right">&gt;</span>
				</section>
				<section class="load" v-show="!loading">
					<img src="../../res/images/preloader.gif" />
				</section>
				<section class="content" v-show="loading">
					<section class="oCont">
						<div class="Box">
							<section v-on:click="getGoodList(0)" class="oDe goodsButton" :class="{'act' : !isPackage}">商品</section>
							<section v-on:click="getGoodList(1)" class="oDe" :class="{'act' : isPackage}">套餐</section>
						</div>
						<div class="packageBox" v-if="isPackage">
							<a v-on:click="selectPack(-1)" class="raduobtn" :class="{'selectbtn' : packBtn == -1}" href="javascript:void(0);">全部</a>
							<a v-on:click="selectPack(0)" class="raduobtn" :class="{'selectbtn' : packBtn == 0}" href="javascript:void(0);" style="">固定套餐</a>
							<a v-on:click="selectPack(1)" class="raduobtn" :class="{'selectbtn' : packBtn == 1}" href="javascript:void(0);" style="">可选套餐</a>
						</div>
					</section>
					<ul class="aUl">
						<div v-if="!isPackage" class="onecate" v-for="(item,index) in cateList" :key="index">
							<div class="oneGoods">
								<section v-if="shopList.ischain != '0' && item.id < 100000" class="onecataTitle" style="cursor: default;">
									<i class="twoI" :class="{'oneI':L2ID == '0'}" style="background-color: skyblue;"></i>
									<li class="twoTitle " :class="{'oneTitle':L2ID == '0',}" style="color: skyblue;">{{item.name}}</li>
								</section>
								<section v-else class="onecataTitle" :class="{'signa':selGood.type == 'cate' && item.id == selGood.id}" style="background-color: #f2f2f2;margin-bottom: 5px;">
									<i class="twoI" :class="{'oneI':L2ID == '0','iColor':selGood.type == 'cate' && item.id == selGood.id}"></i>
									<li class="twoTitle " :class="{'oneTitle':L2ID == '0','cateColor':selGood.type == 'cate' && item.id == selGood.id}" @click="choseGood(item)">{{item.name}}</li>
								</section>
								<section style="width:600px;float: left;">
									<template v-for="(onegoods,i) in item.goods">
										<li :key="i" v-if="shopList.ischain != '0' && onegoods.id >= 100000" v-on:click="choseGood(onegoods)" class="aLi" :class="{'signa':selGood.type == 'goods' && onegoods.id == selGood.id}">{{onegoods.goodsName}}</li>
										<li :key="i" v-if="shopList.ischain == '0' && onegoods.id < 100000" v-on:click="choseGood(onegoods)" class="aLi" :class="{'signa':selGood.type == 'goods' && onegoods.id == selGood.id}">{{onegoods.goodsName}}</li>
									</template>
								</section>
							</div>
							<template v-for="(twocate,two) in item.child">
								<div class="onecate" style="border-bottom: none;" :key="two">
									<section v-if="shopList.ischain != '0' && twocate.id < 100000" style="padding-left: 30px;cursor: default;" class="onecataTitle">
										<li class="twoTitle " :class="{'oneTitle':L2ID == '0'}" style="color: skyblue;">{{twocate.name}}</li>
									</section>
									<section v-else style="padding-left: 30px;background-color: #f2f2f2;margin-bottom: 5px;" class="onecataTitle" :class="{'signa':selGood.type == 'cate' && twocate.id == selGood.id}">
										<li class="twoTitle " :class="{'oneTitle':L2ID == '0','cateColor':selGood.type == 'cate' && twocate.id == selGood.id}" @click="choseGood(twocate)">{{twocate.name}}</li>
									</section>
									<section style="width:600px;float: left;">
										<template v-for="(twogoods,num) in twocate.goods">
											<li :key="num" v-if="shopList.ischain != '0' && twogoods.id >= 100000" v-on:click="choseGood(twogoods)" class="aLi" :class="{'signa':selGood.type == 'goods' && twogoods.id == selGood.id}">{{twogoods.goodsName}}</li>
											<li :key="num" v-if="shopList.ischain == '0' && twogoods.id < 100000" v-on:click="choseGood(twogoods)" class="aLi" :class="{'signa':selGood.type == 'goods' && twogoods.id == selGood.id}">{{twogoods.goodsName}}</li>
										</template>
									</section>
								</div>
							</template>
						</div>
						<div v-if="isPackage">
							<li :key="index" v-if="shopList.ischain != '0' && item.id >= 100000" v-for="(item,index) in packCom" v-on:click="choseGood(item,'pack')"
							    class="aLi" :class="{'signa':(selGood.type == 'package' && item.id == selGood.id)}">{{item.packageName}}</li>
							<li :key="index" v-if="shopList.ischain == '0' && item.id < 100000" v-for="(item,index) in packCom" v-on:click="choseGood(item,'pack')"
							    class="aLi" :class="{'signa':(selGood.type == 'package' && item.id == selGood.id)}">{{item.packageName}}</li>
						</div>
					</ul>
				</section>
			</div>
		</win>
	</div>

</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				title: '选择样本数据',
				packlist: '', //所有的套餐列表
				packCom: [], //要展示的套餐列表
				oneArea: {
					oneAreaBtn: false, //一级分类
					oneAreaName: '请选择一级分类',
					oneAreaIndex: -1, //分类下标
					oneAreaList: [{
						'id': '0',
						'name': '全部'
					}], //一级分类列表
				},
				twoArea: {
					twoAreaBtn: false, //二级分类
					twoAreaName: '请选择二级分类',
					twoAreaIndex: -1, //分类下标
					twoAreaList: [{
						'id': '0',
						'name': '全部二级分类'
					}], //二级分类列表
				},
				L1ID: 0, // 1级分类 id
				L2ID: 0, // 2级分类id
				isPackage: false, //商品或套餐显示的控制，默认是显示商品
				goodsCom: [], // 当前展示的商品 
				goodList: [], // 所有商品 
				packBtn: -1, //套餐选择按钮，-1：全部，0：固定，1：可选。默认全部
				selGood: {
					id: '',
					type: '',
					name: '',
					shopList: []
				},
				// shopList: this.goods.shopList.length != 0 ? this.goods.shopList : {
				// 	flag: storage.session('userShop').currentShop.id,
				// 	shopName: '',
				// 	ischain: 0, //区分品牌还是直营店加盟店
				// 	list: utils.deepCopy(this.chooseShopList)
				// },
				shopList: {},
				leftWidth: 0,
				leftIndex: 0,
				cateList: '', //展示的分类列表
				newCateList: '', //保存原始的分类数据
				loading: true,
				one: '',
				two: '',
				aaa: ''

			};
		},
		props: [
			'goods', //选中的样本数据
			'shop', //所有店铺列表
			'chooseShopList',
		],
		created(){
			if(this.goods.shopList.length != 0){
				this.shopList = this.goods.shopList;
			}else{
				this.shopList = {
					flag: storage.session('userShop').currentShop.id,
					shopName: '',
					ischain: 0, //区分品牌还是直营店加盟店
					list: utils.deepCopy(this.chooseShopList)
				};
			}
		},
		mounted() {
			if (this.goods.shopList.length == 0) {
				this.shopList.list.unshift({
					id: storage.session('userShop').currentShop.id,
					ischain: 0,
					shopName: '品牌'
				});
			}
			// this.selGood = this.goods;
			this.getShopGoodsList();
			this.getShopPackageList();
		},
		methods: {
			//获取门店商品列表
			async getShopGoodsList() {
				let data = await http.getShopGoodsList({
					data: {
						id: this.shopList.flag,
						page: 1,
						num: 9999,
						isBrand: (this.shopList.shopName == '品牌' || !this.shopList.shopName) ? 1 : 0
					}
				});
				this.goodList = data.list;
				this.goodsCom = data.list;
				this.getShopCategoryList();
			},
			//获取门店套餐数据
			async getShopPackageList() {
				let data = await http.getShopPackageList({
					data: {
						id: this.shopList.flag,
						isBrand: (this.shopList.shopName == '品牌' || !this.shopList.shopName) ? 1 : 0
					}
				});
				this.packlist = data;
				//是否已经选择了样本数据
				if (this.goods) {
					this.selGood = utils.deepCopy(this.goods);
				}
			},
			//获取分类
			async getShopCategoryList() {
				let res = await http.getShopCategoryList({
					data: {
						id: this.shopList.flag,
						isBrand: (this.shopList.shopName == '品牌' || !this.shopList.shopName) ? 1 : 0
					}
				});
				this.loading = true;
				this.oneArea.oneAreaList = [{
					'id': '0',
					'name': '全部'
				}];
				//一级分类放入选择框中
				this.oneArea.oneAreaList = this.oneArea.oneAreaList.concat(res);

				for (let i = 0; i < res.length; i++) {
					res[i].goods = [];
					//添加一级分类下的菜品
					for (let j = 0; j < this.goodList.length; j++) {
						for (let k = 0; k < this.goodList[j].cids.length; k++) {
							if (res[i].id == this.goodList[j].cids[k]) {
								res[i].goods.push(this.goodList[j]);
							}
						}
					}
					//添加二级分类下的菜品
					for (let a = 0; a < res[i].child.length; a++) {
						res[i].child[a].goods = [];
						for (let m = 0; m < this.goodList.length; m++) {
							for (let n = 0; n < this.goodList[m].cids.length; n++) {
								if (res[i].child[a].id == this.goodList[m].cids[n]) {
									res[i].child[a].goods.push(this.goodList[m]);
								}
							}
						}
					}
				}
				this.cateList = utils.deepCopy(res);
				this.newCateList = utils.deepCopy(res);
				this.aaa = res;
			},
			getData(res) {
				this.$emit('choose', res, this.selGood, this.shopList);
			},
			right: function () {
				if (this.leftWidth <= -(this.shopList.list.length * 145 - 720)) {
					return false;
				}
				this.leftIndex++;
				this.leftWidth = -400 * this.leftIndex;
				if (this.leftWidth <= -(this.shopList.list.length * 145 - 720)) {
					this.leftWidth = -(this.shopList.list.length * 145 - 720);
					return false;
				}
			},
			left: function () {
				if (this.leftWidth >= 0) {
					this.leftWidth = 0;
					return false;
				}
				if (this.leftWidth < -(this.shopList.list.length * 145 - 720)) {
					this.leftWidth = -(this.shopList.list.length * 145 - 720);
					return false;
				}
				this.leftIndex--;
				this.leftWidth = -400 * this.leftIndex;
			},
			//店铺选择
			light: function (index, ischain, shopName) {
				this.oneArea = {
					oneAreaBtn: false, //一级分类
					oneAreaName: '请选择一级分类',
					oneAreaIndex: -1, //分类下标
					oneAreaList: [{
						'id': '0',
						'name': '全部'
					}], //一级分类列表
				};
				this.twoArea = {
					twoAreaBtn: false, //二级分类
					twoAreaName: '请选择二级分类',
					twoAreaIndex: -1, //分类下标
					twoAreaList: [{
						'id': '0',
						'name': '全部二级分类'
					}], //二级分类列表
				};
				this.loading = false;
				this.selGood.id = '';
				this.selGood.type = '';
				this.selGood.name = '';
				this.shopList.flag = index;
				this.shopList.ischain = ischain;
				this.shopList.shopName = shopName;
				this.selGood.shopList = this.shopList;
				this.isPackage = false;
				this.getShopGoodsList();
				this.getShopPackageList();
			},
			//选择样本数据，区分分类，商品和套餐
			choseGood: function (item) {
				this.selGood.id = item.id;
				if (item.name) {
					this.selGood.type = 'cate';
					this.selGood.name = item.name;
				} else if (item.goodsName) {
					this.selGood.type = 'goods';
					this.selGood.name = item.goodsName;
				} else if (item.packageName) {
					this.selGood.type = 'package';
					this.selGood.name = item.packageName;
				}
			},
			//商品和套餐的切换，商品index =0 ；套餐index = 1
			getGoodList: function (index) {
				if (index == 0) {
					this.isPackage = false;
					this.goodsCom = this.goodList;
				} else if (index == 1) {
					this.isPackage = true;
					this.packCom = this.packlist;
				}
			},
			//套餐选择，-1 全部，0：固定，1：可选
			selectPack: function (index) {
				this.packBtn = index;
				this.packCom = [];
				let packlist = this.packlist;
				if (index == -1) {
					this.packCom = packlist;
				} else {
					for (let i = 0; i < packlist.length; i++) {
						if (packlist[i].type == index) {
							this.packCom.push(packlist[i]);
						}
					}

				}
			},
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		},
	};
</script>

<style lang="less" scoped>
	#tan {
		width: 100%;
		height: 100%;
		padding: 15px;
		background-color: #fff;
		.allShop {
			position: relative;
			.shops {
				height: 50px;
				line-height: 50px;
				overflow: hidden;
				position: relative;
				width: 720px;
				margin-left: 25px;
				.sel {
					display: inline-block;
					width: 135px;
					height: 40px;
					font-size: 16px;
					background: #f2f2f2;
					border-radius: 3px;
					text-align: center;
					line-height: 40px;
					cursor: pointer;
					margin-right: 10px;
				}
				.on {
					background: #28a8e0;
					color: #fff;
				}
			}
			.dot {
				position: absolute;
				display: inline-block;
				height: 40px;
				line-height: 40px;
				width: 20px;
				font-size: 30px;
				color: #BCBCBC;
				cursor: pointer;
			}
			.left {
				left: 0px;
				top: 0px;
			}
			.right {
				right: -15px;
				top: 0px;
			}
		}
		.load {
			width: 128px;
			margin: 200px auto;
		}
		.content {
			.oCont {
				width: 100%;
				.Box {
					width: 160px;
					float: left;
					margin-top: 10px;
					height: 42px;
					border: 1px solid #FF9801;
					cursor: pointer;
					box-sizing: border-box;
					.act {
						background-color: #FF9801;
						color: #fff;
					}
					.oDe {
						width: 50%;
						height: 40px;
						line-height: 40px;
						text-align: center;
						float: left;
						border-left: 1px solid #FF9801;
						box-sizing: border-box;
					}
					.goodsButton {
						border-left: none;
						width: 50%;
					}
				}
				.packageBox {
					width: 100%;
					height: 50px;
					overflow: hidden;
					padding-top: 10px;
					.raduobtn {
						width: 100px;
						height: 40px;
						line-height: 40px;
						float: left;
						border-radius: 5px;
						margin-left: 10px;
						background-color: #f2f2f2;
						color: #333;
					}
					.selectbtn {
						background-color: #2FA8DD;
						color: #fff;
					}
				}
			}
			.aUl {
				width: 100%;
				height: auto;
				overflow: auto;
				padding: 10px;
				.aLi {
					padding: 0 15px;
					height: 40px;
					line-height: 40px;
					cursor: pointer;
					text-align: center;
					background-color: #f2f2f2;
					margin: 5px 10px;
					float: left;
				}
				.signa {
					background: #FFF3E5 !important;
					border: 1px solid #F8931F !important;
					color: #F9911E !important;
				}
				.onecate {
					width: 100%;
					border-bottom: 1px solid #e3e3e3;
					height: auto;
					overflow: hidden;
					.onecataTitle {
						width: 115px;
						float: left;
						overflow: hidden;
						margin-top: 5px;
						cursor: pointer;
					}
					.twoTitle {
						width: 70px;
						height: 40px;
						line-height: 40px;
						float: left;
						font-weight: 800;
						overflow: hidden;
						vertical-align: middle;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.twoI {
						width: 10px;
						height: 10px;
						margin: 15px 10px;
						float: left;
						background-color: #000000;
					}
					.oneI {
						background-color: #000;
					}
					.oneTitle {
						color: #000;
					}
					.oneGoods {
						width: 100%;
						height: auto;
						.onecataTitle {
							width: 115px;
							float: left;
							overflow: hidden;
							margin-top: 5px;
							cursor: pointer;
							.iColor {
								background-color: #F9911E !important;
							}
							.cateColor {
								color: #F9911E !important;
							}
						}
					}
				}
			}
		}
	}
</style>