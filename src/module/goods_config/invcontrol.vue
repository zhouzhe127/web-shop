/**
 * @Author: 百川-曾伟福 
 * @Date: 2018-09-05 14:59:08 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-05 15:21:57
 * @Module:商品库存管理
**/
<template>
	<!--
	@file 商品库存管理
	百川-曾伟福
-->
	<div id="good-invcontrol">

		<!--库存管理模块-->
		<section class="fl user-content">
			<section class="user-function">
				<section class=" fl" style="width:100%;height:50px;">
					<!-- 分类选择 -->
					<elCategory @selectCategory = "newselectOneArea" :categoryArr="category" :itemIndex="oneIndex" :itemArea = "oneArea"></elCategory>
					<elCategory @selectCategory = "newselectTwoArea" :categoryArr="child" :itemIndex="twoIndex" :itemArea = "twoArea"></elCategory>
					<el-input placeholder="请输入名称" clearable v-model="search" @change="funSearchkeyUp()" style="width:210px;">
						<el-button slot="append" icon="el-icon-search" @click="funSearchkeyUp()"></el-button>
					</el-input>
					<!-- <selectStore @emit="selectOne" :isSingle="true" :sorts="category" :tipName="'请选择一级分类'"></selectStore>
					<div style="display:inline-block;" @click="openTwo">
						<selectStore @emit="selectTwo" :isSingle="true" :sorts="child" ref="towSortDom" :tipName="'请选择二级分类'"></selectStore>
					</div> -->
					<!-- <section class="class-Parent">
						<span v-for="(item,index) in category" @click="funToggleCate(item)" :class="{'on':parentCate.id==item.id}" :key="index">{{item.name}}</span>
					</section>
					<section class="class-Child" v-if="child.length>0">
						<span v-for="(ch,i) in child" :key="i" @click="funToggleChild(ch)" :class="{'childCid-on':childCid==ch.id}">{{ch.name}}</span>
					</section> -->
				</section>
			</section>

			<section class="user-info">
				<section class="commodity-box">
					<template v-for="(good,index) in nowGoods">
						<section style="width: 300px;" class="fl" :key="index">
							<section class="fl" v-if="good.newStatus == 1" style="transition: all 0.2s;" @click="openWinInvcontroWin(good)">
								<img v-if="!!good.imageName" :src="imgHost+good.imageName" width="300" height="200" class="cname" alt="商品" />
								<img v-else src="../../res/food/loading.jpg" width="300" height="200" class="cname" alt="商品" />
								<section class="comprice" style="height: 100%;text-align: center;">
									<h2 style="height: 120px;line-height:120px;width: 100%;font-size: 64px;">估清</h2>
									<p style="font-size: 24px;" class="text-ellipsis" :title="good.goodsName">{{good.goodsName}}</p>
								</section>
							</section>

							<section v-else class="fl" style="transition: all 0.2s;" @click="openWinInvcontroWin(good)">
								<img v-if="!!good.imageName" :src="imgHost+good.imageName" width="300" height="200" class="cname" alt="商品" />
								<img v-else src="../../res/food/loading.jpg" width="300" height="200" class="cname" alt="商品" />
								<section class="comprice" style="height: 100%;text-align: center;">
									<h2 class="commodityName text-ellipsis" style="font-size:  24px;text-align: center;line-height: 40px;margin-bottom: 40px;" :title="good.goodsName">{{good.goodsName}}</h2>
									<section v-if="good.isGroup == 1" class="fl" style="height: 30px;line-height: 30px;width: 100%;">
										<section style="width: 100%;text-align: center;font-size:  16px;" class="fl">
											库存：
											<span style="font-size:  16px;" v-for="(group,groupIndex) in good.relative" :key="groupIndex">{{group.goodsNum}}
												<i v-if="groupIndex != good.relative.length-1">/</i>
											</span>
										</section>
										<section style="width: 100%;text-align: center;font-size:  16px;" class="fl">
											库存预警：
											<span style="font-size:  16px;" v-for="(group,groupIndex) in good.relative" :key="groupIndex">{{group.goodsThreshold}}
												<i v-if="groupIndex != good.relative.length-1">/</i>
											</span>
										</section>
									</section>
									<section v-else class="fl" style="height: 30px;line-height: 30px;width: 100%;">
										<section style="width: 100%;text-align: center;font-size:  16px;" class="fl">库存：
											<span style="font-size:  16px;">{{good.goodsNum}}</span>
										</section>
										<section style="width: 100%;text-align: center;font-size:  16px;" class="fl">库存预警：
											<span style="font-size:  16px;">{{good.goodsThreshold}}</span>
										</section>
									</section>
								</section>
							</section>
						</section>
					</template>
				</section>
			</section>
		</section>
		<transition name="fade">
			<component :is="showCom" :pObj="comObj" @throwInvcontrolWin="closeInvcontrolWin"></component>
		</transition>
	</div>
</template>
<script>
/*
		 * goodsNum:库存
		 * goodsThreshold:库存预警
		 * 1)展示已开启进销存商品
		 * 2)库存<库存预警 先显示
		 * 5)斤两菜一定要可带小数
		 * 6)不显示多规格的子菜,显示下架商品
		 * 7)多规格商品估清的展示由子菜的状态决定,当所有的子菜都是估清的状态时主菜显示的状态才是估清,若有一个子菜的状态是估清的,则该主菜也是估清的.

			本页的请求:
				ShopGetExtra:获取版本信息

		*/
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
export default {
	data() {
		return {
			shopId: null,
			imgHost: null, //图片地址
			category: [], //所有的分类
			child: [], //当前分类的子分类
			parentCate: {
				id: -1,
				child: null
			}, //选中的一级分类对象
			childCid: -2, //选中的二级分类id

			goodsList: [], //已开启进销存并已排序的商品
			nowGoods: [], //当前展示的商品

			showCom: '', //组件的显示
			comObj: {
				good: Object //单个商品对象
			},

			oneArea: {
				name: '请选择一级分类',
				id: -1, //一级分类id
			},
			oneIndex:-1,//一级分类下标
			twoArea: {
				name: '请选择二级分类',
				index: -2, //二级分类id
			},
			twoIndex:-1,//二级分类下标
			search:''
		};
	},
	mounted() {
		this.initData();
		this.syncRequest();
	},
	methods: {
		funSearchkeyUp() {
			this.search = this.search.trim();
			this.oneArea.name = '请选择一级分类';
			this.twoArea.name = '请选择二级分类';
			this.oneIndex = -1;
			this.twoIndex = -1;
			let arr = [];
			for(let i=0;i<this.goodsList.length;i++){
				let goodItem = this.goodsList[i];
				if (goodItem.goodsName && goodItem.goodsName.indexOf(this.search) > -1){
					arr.push(goodItem);
				}
			}
			this.nowGoods = arr;
		},
		async closeInvcontrolWin(res) {
			if (res == 'edit') {
				let versioin = await this.getHttp('ShopGetExtra');
				let ret = await this.getGoodsList(
					false,
					versioin.goodsConfigVer
				);
				let { list } = await this.getHttp('InventoryGetlist');
				let data = this.filterGoodsByStock(ret, list);
				this.goodsList = this.deleteChildGoods(data);
				this.goodsList = this.changeGoodsStatus(this.goodsList);
				this.goodsList = this.funSortGoods(this.goodsList);
				if (this.childCid == -2) {
					this.funToggleCate(this.parentCate);
				} else {
					let obj = {
						id: this.childCid
					};
					this.funToggleChild(obj);
				}
			}
			this.showCom = '';
		},
		openWinInvcontroWin(good) {
			this.comObj.good = good;
			this.showCom = 'setInvcontrol';
		},
		//----------         分类切换       --------------------
		//切换一级分类
		newselectOneArea(index) {
			this.search = '';
			this.oneIndex = index;
			this.twoIndex = -1;
			let item = this.category[index];
			this.oneArea = {
				id: item.id,
				name: item.name,
			};
			this.twoArea = {
				id: -1,
				name: '请选择二级分类',
			};
			this.funToggleCate(item);
		},
		newselectTwoArea(index){
			this.search = '';
			this.twoIndex = index;
			let item = this.child[index];
			this.twoArea = {
				id: item.id,
				name: item.name,
			};
			this.funToggleChild(item);
		},
		selectOne(arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].selected == true) {
					this.parentCate = arr[i];
					this.funToggleCate(arr[i]);
					break;
				} else {
					this.nowGoods = this.goodsList;
				}
			}
		},
		//切换一级分类 删选商品
		funToggleCate(item) {
			this.parentCate = item;
			this.childCid = -2;
			if (item.id == -1) {
				this.child = [];
				this.nowGoods = this.goodsList;
				return;
			}
			this.child = item.child;
			this.child || (this.child = []);
			this.nowGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				item.id
			);
		},
		//打开二级分类前执行
		openTwo() {
			// let sortShow = this.$refs.towSortDom.sortShow;
			if (this.parentCate.id < 1) {
				this.$refs.towSortDom.sortShow = false;
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '请选择一级分类'
				});
				return;
			}
			if (this.parentCate.child.length == 0) {
				this.$refs.towSortDom.sortShow = false;
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '此一级分类下无二级分类'
				});
				return;
			}
		},
		//切换二级分类
		selectTwo(arr) {
			if (this.childCid == -2) {
				return false;
			}
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].selected == true) {
					this.funToggleChild(arr[i]);
					break;
				} else {
					this.funToggleCate(this.parentCate);
				}
			}
		},
		//切换二级分类 删选商品
		funToggleChild(item) {
			this.childCid = item.id;
			this.nowGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				this.childCid
			);
		},
		//通过分类的id筛选商品
		filterGoodsByCategoryByPid(goods, id) {
			if (id == -1) return goods;
			let arr = [];
			goods.forEach(ele => {
				ele.cids || (ele.cids = []);
				ele.cids.some(e => {
					if (e == id) {
						arr.push(ele);
						return true;
					}
				});
			});
			return arr;
		},

		//------------       初始化商品操作      ----------------
		//获取开启进销存的商品,并给商品添加relative字段,获取库存数量
		filterGoodsByStock(goods = [], numArr = []) {
			let temp = [];
			let arr = [];
			// let len = null;
			temp = goods.filter(ele => {
				return ele.isStock == 1;
			});
			for (let ele of temp) {
				for (let item of numArr) {
					if (ele.id == item.gid) {
						ele.goodsThreshold = item.goodsThreshold;
						ele.goodsNum = item.goodsNum;
						break;
					}
				}
			}
			// len = temp.length;
			for (let ele of temp) {
				ele.relative = [];
				for (let item of temp) {
					if (item.groupId == ele.id && item.id != ele.id) {
						ele.relative.push(item);
					}
				}
				arr.push(ele);
			}
			return arr;
		},
		//改变商品的估清状态
		changeGoodsStatus(goods) {
			let temp = goods.map(ele => {
				ele.newStatus = ele.status;
				if (ele.isGroup == 1) {
					let flag = false;
					for (let i = 0, len = ele.relative.length; i < len; i++) {
						let good = ele.relative[i];
						if (good.status == 1) {
							flag = true;
							break;
						}
					}
					ele.newStatus = flag ? 1 : 0;
				}
				return ele;
			});
			return temp;
		},
		//去除子菜,子菜不显示
		deleteChildGoods(goods) {
			let temp = [];
			temp = goods.filter(ele => {
				return !Number(ele.groupId);
			});
			return temp;
		},
		//对进销存商品进行排序 库存小于库存预警商品展示在前
		funSortGoods(goods) {
			let arr1 = []; //库存小于库存预警
			let arr2 = []; //库存大于库存预警
			let temp = [];
			temp = goods.sort((x, y) => {
				if (x.sort == y.sort) {
					return x.id - y.id;
				} else {
					return x.sort - y.sort;
				}
			});
			temp.forEach(ele => {
				if (parseInt(ele.goodsNum) < parseInt(ele.goodsThreshold)) {
					arr1.push(ele);
				} else {
					arr2.push(ele);
				}
			});
			temp = arr1.concat(arr2);
			return temp;
		},
		//获取分类
		async getCate() {
			let category = await http.getCategoryList({
				data: {
					shopId: this.shopId
				}
			});
			storage.session('areaList', category);
			return category;
		},
		async getCategoryList(flag, ver) {
			let category = null;
			if (flag) {
				category = await this.getCate();
			} else {
				let httpGoodVersion = storage.session('httpGoodVersion');
				if (!httpGoodVersion) {
					category = await this.getCate();
				} else {
					if (httpGoodVersion.otherConfigVer == ver) {
						category = storage.session('areaList');
						if (!category) category = await this.getCate();
					} else {
						category = await this.getCate();
					}
				}
			}
			return category;
		},
		//获取商品
		async getGoods() {
			let goods = null;
			let temp = await http.getGoodsList({
				data: {
					shopId: this.shopId,
					page: 1,
					num: 9999,
					specification: 1
				}
			});
			goods = temp.list;
			storage.session('goodList', goods);
			return goods;
		},
		async getGoodsList(flag, goodVer) {
			let goods = null;
			if (flag) {
				goods = await this.getGoods();
			} else {
				let httpGoodVersion = storage.session('httpGoodVersion');
				if (!httpGoodVersion) {
					goods = await this.getGoods();
				} else {
					if (httpGoodVersion.goodsConfigVer == goodVer) {
						goods = storage.session('goodList');
						if (!goods) goods = await this.getGoods();
					} else {
						goods = await this.getGoods();
					}
				}
			}
			return goods;
		},
		async getHttp(url, data = {}) {
			let res = await http[url]({
				data
			});
			return res;
		},
		async syncRequest() {
			let res = await this.getHttp('ShopGetExtra');
			let goods = await this.getGoodsList(false, res.goodsConfigVer); //获取商品
			let { list } = await this.getHttp('InventoryGetlist'); //获取库存数量
			let data = this.filterGoodsByStock(goods, list); //匹配库存
			this.goodsList = this.changeGoodsStatus(this.goodsList); //改变商品状态
			this.goodsList = this.deleteChildGoods(data); //删除子菜
			this.goodsList = this.funSortGoods(this.goodsList); //排序商品

			let category = await this.getCategoryList(
				false,
				res.otherConfigVer
			);
			if (category[0] && category[0].id != -1)
				category.unshift({
					id: -1,
					name: '全部'
				});
			this.category = category;
			this.funToggleCate(this.parentCate);
			storage.session('httpGoodVersion', res);
		},
		//初始化数据
		initData() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.imgHost = userData.uploadUrl;
		}
	},
	components: {
		elCategory: () =>import(/*webpackChunkName:'el_category'*/ 'src/components/el_category'),
		// selectStore: () =>import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		setInvcontrol: () =>
			import(/*webpackChunkName:'invcontrol_set_win'*/ './invcontrol/invcontrol_set_win')
	}
};
</script>
<style lang="less" scoped>
#good-invcontrol {
	.childCid-on {
		background-color: #b5b5b7;
		color: #fff;
	}
	min-height: 400px;
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>