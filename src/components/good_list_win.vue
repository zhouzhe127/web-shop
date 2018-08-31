<!--
	**选择商品列表  套餐和商品
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<win @winEvent="goodListWin" :align="'center'" :width="860" :height="560">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content">
			<section v-if="isCashier" style="height: 50px;line-height: 50px;margin-left: 15px;">
				<span style="font-size: 16px;">分类名称：</span>
				<input style="height: 30px;font-size: 16px;padding-left: 10px;" type="text" v-model="reportName" />
			</section>
			<!--菜单配置弹窗=========================================================================-->
			<section id="configTan" style="">
				<section class="oCont" style="width: 100%;">
					<div v-if="!isOnlyGoods" class="Box" style="width:160px;float: left;">
						<section v-on:click="getGoodList(0)" class="oDe" :class="{'act' : !isPackage}" style="border-left: none;width:50%;">商品</section>
						<section v-on:click="getGoodList(1)" class="oDe" :class="{'act' : isPackage}">套餐</section>
					</div>
					<ul v-if="!isPackage" style="float: left;margin-left: 20px;">
						<li style="width:210px;float: left;">
							<!--一级分类选择框-->
							<section class="staList fl detLi">
								<section v-on:click="showOneArea" class="tableList">
									<span class="oSpan">{{oneArea.oneAreaName}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-if="oneArea.oneAreaBtn" class="detDiv">
									<i class="detI"></i>

									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in oneArea.oneAreaList" :key="index" v-on:click='selectOneArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
						<li style="width:210px;margin-left: 20px;float: left;">
							<!--二级级分类选择框-->
							<section class="staList fl detLi">
								<section v-on:click="showTwoArea" class="tableList">
									<span class="oSpan">{{twoArea.twoAreaName}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-if="twoArea.twoAreaBtn" class="detDiv" style="left: -180px;">
									<i class="detI" style="left: 290px;"></i>
									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in twoArea.twoAreaList" :key="index" v-on:click='selectTwoArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
						<!--搜索-->
						<li style="width:180px;margin-left: 20px;float: left;">
							<div class='search'>
								<input type="text" placeholder="请输入名称" class="search-input" v-model="search" />
								<a href="javascript:void(0);" class="search-btn" @click="searchGoods()" style="background-color:#29A7E1;"></a>
							</div>
						</li>
					</ul>
					<div v-if="isPackage" style="width:100%;height: 50px;overflow: hidden;padding-top:10px">
						<el-radio-group v-model="packBtn" @change = "selectPack">
							<el-radio-button label="-1">全部</el-radio-button>
							<el-radio-button v-if="!isPackType || isPackType.indexOf('0')>-1" label="0">固定套餐</el-radio-button>
							<el-radio-button v-if="!isPackType || isPackType.indexOf('1')>-1" label="1">可选套餐</el-radio-button>
							<el-radio-button v-if="!isPackType || isPackType.indexOf('2')>-1" label="2">自定义套餐</el-radio-button>
						</el-radio-group>
					</div>
				</section>
				<ul class="aUl" style="">
					<section v-if="allGood">
						
						<template v-if="goInName=='goodsChoice' || goInName=='packsChoice'">
							<li v-if="!isPackage" v-for="(item,index) in goodsCom" :key='index' v-on:click="!item.isSynOk?choseGood(item):''" class="aLi" :class="[{'shoName-select':item.selected&&!item.isSynOk},{'dis-type':item.isSynOk}]">{{item.goodsName}}</li>
							<li v-if="isPackage" v-for="(item,index) in packCom" :key='index' v-on:click="!item.isSynOk?choseGood(item):''" class="aLi" :class="[{'shoName-select':item.selected&&!item.isSynOk},{'dis-type':item.isSynOk}]">{{item.packageName}}</li>
						</template>
						<template v-else>
							<li v-if="!isPackage" v-for="(item,index) in goodsCom" :key='index' v-on:click="choseGood(item)" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName}}</li>
							<li v-if="isPackage" v-for="(item,index) in packCom" :key='index' v-on:click="choseGood(item)" class="aLi" :class="{'shoName-select':item.selected}">{{item.packageName}}</li>
						</template>
					</section>
					<section v-if="!allGood">
						<div class="onecate" v-if=" oneGoodList.goodsList.length > 0" style="">
							<section class="onecataTitle" style="">
								<i class="twoI" :class="{'oneI':L2ID == '0'}"></i>
								<li class="twoTitle " :class="{'oneTitle':L2ID == '0'}">{{oneGoodList.name}}</li>
							</section>
							<section style="width:600px;float: left;">
								<template v-if="goInName=='goodsChoice'">
									<li v-on:click="!item.isSynOk?choseGood(item):''" v-for="(item,index) in oneGoodList.goodsList" :key="index" class="aLi" :class="[{'shoName-select':item.selected&&!item.isSynOk},{'dis-type':item.isSynOk}]">{{item.goodsName ? item.goodsName : item.packageName}}</li>
								</template>
								<template v-if="goInName!=='goodsChoice'">
									<li v-on:click="choseGood(item)" v-for="(item,index) in oneGoodList.goodsList" :key="index" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName ? item.goodsName : item.packageName}}</li>
								</template>
							</section>
						</div>
						<div v-if="category.goodsList.length > 0" class="onecate" v-for="(category,index) in oneGoodList.child" :key="index">
							<section class="onecataTitle" style="">
								<i class="twoI" style=""></i>
								<li class="twoTitle" style="">{{category.name}}</li>
							</section>
							<section style="width:600px;float: left;">
								<template v-if="goInName=='goodsChoice'">
									<li v-on:click="!item.isSynOk?choseGood(item):''" v-for="(item,index) in category.goodsList" :key="index" class="aLi" :class="[{'shoName-select':item.selected&&!item.isSynOk},{'dis-type':item.isSynOk}]">{{item.goodsName ? item.goodsName : item.packageName}}</li>
								</template>
								<template v-if="goInName!=='goodsChoice'">
									<li v-on:click="choseGood(item)" v-for="(item,index) in category.goodsList" :key="index" class="aLi" :class="{'shoName-select':item.selected}">{{item.goodsName ? item.goodsName : item.packageName}}</li>
								</template>
							</section>
						</div>

					</section>
				</ul>
				<div v-if="isGoods" style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
					<section v-on:click="allGoods(0)" class="isallselect" :class="{'allselect':!allSelect}">取消全部</section>
					<section v-on:click="allGoods(1)" class="isallselect" :class="{'allselect':allSelect}">选择全部</section>
					<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择{{isPackage?selectPackNum:selectNum}}个</h3>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: '',
			isNum: false,
			title: '关联商品配置',
			printDetial: null,
			createUid: '',
			showTowWin: false, //关联商品的弹窗打开或关闭
			// packageMenu:[
			// 	{id:-1,name:'全部'},
			// 	{id:1,name:'可选套餐'},
			// 	{id:0,name:'固定套餐'},
			// 	{id:2,name:'自定义套餐'},
			// 	// {id:3,name:'下架套餐'},
			// ],
			oneArea: {
				oneAreaBtn: false, //一级分类
				oneAreaName: '请选择一级分类',
				oneAreaIndex: -1, //分类下标
				oneAreaList: [{ id: '0', name: '全部' }] //一级分类列表
			},
			twoArea: {
				twoAreaBtn: false, //二级分类
				twoAreaName: '请选择二级分类',
				twoAreaIndex: -1, //分类下标
				twoAreaList: [{ id: '0', name: '全部二级分类' }] //二级分类列表
			},
			packlist: [], //所有的套餐列表
			packCom: [], //要展示的套餐列表
			isPackage: false, //商品或套餐显示的控制，默认是显示商品
			goodsCom: [], // 当前展示的商品
			goodList: [], // 所有商品
			L1ID: 0, // 1级分类 id
			L2ID: 0, // 2级分类id
			allSelect: false, //全部选择  下部固定的部分，控制全部选择页面显示出的商品或套餐
			oneGoodList: {}, //选择一级分类页面的所有数据
			newOneGoodList: {}, //新建一个，选择二级分类时渲染数据
			allGood: true, //是否显示所有商品，默认显示
			packBtn: -1, //套餐选择按钮，-1：全部，0：固定，1：可选。默认全部
			selectNum: 0, //选中的商品数量
			selectPackNum:0,//选中套餐的数量
			reportName: '', //菜单配置名称
			version: {}, //版本号
			// getCategoryList:[], //商品分类
			search: ''
		};
	},
	mounted() {
		// console.log(this.goodsIds)
		if (this.isCashier) {
			this.reportName = this.reportSetName;
		}
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.getOneAreaList(); //获取分类列表
		this.getpackagelist(); //获取套餐列表
		this.getGoodsList(); //获取商品列表
		if(this.goInName=="packsChoice"){//如果从套餐同步来的则直接进入套餐界面面
			this.title = '关联套餐配置';
			this.getGoodList(1);
			// this.packCom = this.packlist;
		}
		document.addEventListener('click', this.myClick);
	},
	destroyed() {
		document.removeEventListener('click', this.myClick); //去除绑定
	},
	props: {
		goodsIds: Array, //['0','1','2','3']这种格式
		packages: Array, //['0','1','2','3']这种格式
		isGoods: Boolean, //单选或者多选  true多选，false单选
		goInName: String, //从哪里进入的一个标记 可不写
		isCashier: Boolean, //是否为报表配置 可不写
		reportSetName: String, //报表配置中菜单配置名称 可不写
		isOnlyGoods: Boolean, //是否显示套餐 可不写 默认显示
		idAndName: Boolean, //是否传id和名字 格式[{id:'1',goodsName:"菜1"},{id:'2',goodsName:"菜2"},] 可不写 默认只传id且格式['1','2','3']
		allGid: Array, //所有配置过起售的商品id,可不传
		asyncGoods: Array, //用于展示同步的品牌商品，可不传
		isAllOrOther: Boolean, //是同步品牌商品的所有信息还是部分信息，可不传
		categoryList: Array, //是分类列表，为了同步品牌商品，可不传
		isPackType:String,//0:固定，1：可选，2：自定义，如果有这方面的需求筛选，传要求显示的如'1,2'：就是要求固定和可选
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	},
	methods: {
		myClick() {
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = false;
		},
		//搜索功能
		searchGoods() {
			let secGoods = [];
			let list = this.goodList;
			for (let i = 0; i < list.length; i++) {
				let name = list[i].goodsName.toLowerCase();
				let search = this.search;
				if (name && name.indexOf(search) > -1) {
					secGoods.push(list[i]);
				}
			}
			this.oneArea.oneAreaName = '请选择一级分类';
			this.L1ID == 0;
			this.twoArea = {
				twoAreaBtn: false, //二级分类
				twoAreaName: '请选择二级分类',
				twoAreaIndex: -1, //分类下标
				twoAreaList: [{ id: '0', name: '全部二级分类' }] //二级分类列表
			};
			this.allGood = true;
			this.goodsCom = secGoods;
		},
		//获取版本号
		async ShopGetExtra() {
			let res = await http.ShopGetExtra({ data: {} });
			return res;
		},
		//获取弹窗初始状态
		goodListWin: function(res) {
			let item = {};
			item.goodArr = [];
			item.packArr = [];
			//如果有加减商品后执行状态，若没有点击确定保存按钮则返回进入时的数据
			if (res == 'ok') {
				let goodList = this.goodList;
				let packlist = this.packlist;
				for (let i = 0; i < goodList.length; i++) {
					if (goodList[i].selected) {
						if (this.idAndName) {
							let info = {};
							info.id = goodList[i].id;
							info.goodsName = goodList[i].goodsName;
							item.goodArr.push(info);
						} else {
							item.goodArr.push(goodList[i].id);
						}
					}
				}
				for (let i = 0; i < packlist.length; i++) {
					if (packlist[i].selected) {
						if (this.idAndName) {
							let info = {};
							info.id = packlist[i].id;
							info.packageName = packlist[i].packageName;
							item.packArr.push(info);
						} else {
							item.packArr.push(packlist[i].id);
						}
					}
				}
				if (this.isCashier) {
					if (
						!global.checkData(
							{ reportName: '请输入分类名称' },
							this
						)
					)
						return;
					item.reportSetName = this.reportName;
				}
			} else {
				item.goodArr = this.goodsIds;
				item.packArr = this.packages;
			}
			this.$emit('goodListWin', res, item);
		},
		//获取商品列表
		async getGoodsList() {
			let goodLists = storage.session('goodList');
			let goodList = [];
			let version = storage.session('httpGoodVersion');
			let res = false;
			this.version = await this.ShopGetExtra();
			if (
				version &&
				this.version.goodsConfigVer == version.goodsConfigVer
			) {
				res = true;
			} else {
				res = false;
				storage.session('httpGoodVersion', this.version);
			}
			//如果存在保存的商品数据
			if (goodLists && res) {
				goodList = goodLists;
			} else {
				//如果不存在保存的商品数据
				let good = await http.getGoodsList({
					data: {
						shopId: this.shopId,
						page: 1,
						num: 9999,
						specification: 1
					}
				});
				storage.session('goodList', good.list);
				goodList = good.list;
			}
			let obj = {}; //对商品id做处理，避免多重循环
			//从商品管理中多规格关联商品--筛选 此举为了筛选符合条件的 显示
			if (this.goInName == 'goodCom') {
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					//过滤不符合条件商品，开启多规格的、多规格里的子菜、下架的、称重、自定义、时价菜
					if (
						goodList[i].groupId == '0' &&
						goodList[i].isGroup == '0' &&
						goodList[i].status == '0' &&
						goodList[i].type == '0' &&
						goodList[i].isSeasonal == '0'
					) {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'menuConfig') {
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					//过滤多规格子菜、下架、自定义
					if (
						goodList[i].groupId == '0' &&
						goodList[i].status != '2' &&
						goodList[i].type != '2'
					) {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'isMain') {
				//过滤多规格子菜，下架   服务费用到
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					if (
						goodList[i].groupId == '0' &&
						goodList[i].status != '2'
					) {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'isCoupon') {
				//过滤多规格主菜，下架，自定义   优惠券用到
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					if (
						goodList[i].isGroup != '1' &&
						goodList[i].status != '2' &&
						goodList[i].type != '2'
					) {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'isKitchen') {
				//过滤下架和多规格主菜   后厨配置用到
				// console.log('后厨配置用到');
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					if (goodList[i].status != '2'&&goodList[i].isGroup != '1') {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'isChild') {
				//过滤多规格子菜，下架  打印机配置用到
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					//过滤不符合条件商品，多规格主菜，下架
					if (
						goodList[i].isGroup != '1' &&
						goodList[i].status != '2'
					) {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else if (this.goInName == 'goodSale') {
				//过滤多规格主菜，自定义,下架,斤两    商品起售
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					if (
						goodList[i].isGroup != '1' &&
						goodList[i].type == '0' &&
						goodList[i].status != '2'
					) {
						goods.push(goodList[i]);
					}
				}
				// console.log(goods);
				for (let i = 0; i < goods.length; i++) {
					for (let j = 0; j < this.allGid.length; j++) {
						if (goods[i].id == this.allGid[j]) {
							goods.splice(i, 1);
							i--;
							break;
						}
					}
				}
				goodList = goods;
			} else if (this.goInName == 'goodsChoice') {
				//过滤多规格主菜    同步商品
				// console.log(this.isAllOrOther);
				if (!this.isAllOrOther) {
					for (let i = 0; i < this.asyncGoods.length; i++) {
						//单个选项没有同步过的禁止点击
						let bb = false;
						for (let j = 0; j < goodList.length; j++) {
							if (this.asyncGoods[i].id == goodList[j].id) {
								bb = true;
								break;
							}
						}
						if (!bb) {
							this.asyncGoods[i].isSynOk = true;
						}
					}
				} else {
					for (let i = 0; i < this.asyncGoods.length; i++) {
						//单个选项没有同步过的禁止点击
						this.asyncGoods[i].isSynOk = false;
					}
				}
				goodList = this.asyncGoods;
			} else if (this.goInName == 'isSonGoods') {
				let goods = [];
				for (let i = 0; i < goodList.length; i++) {
					//过滤不符合条件商品，多规格主菜
					if (goodList[i].isGroup != '1') {
						goods.push(goodList[i]);
					}
				}
				goodList = goods;
			} else {
			}
			for (let i = 0; i < goodList.length; i++) {
				this.$set(goodList[i], 'selected', false); //往列表里塞selected，单选全选点击用
				// goodList[i].selected = false;
				if (obj[goodList[i].id]) {
					console.error('有重复id');
				} else {
					obj[goodList[i].id] = i;
				}
			}
			for (let j = 0; j < this.goodsIds.length; j++) {
				let index = obj[this.goodsIds[j]];
				if (index || index != undefined) {
					goodList[index].selected = true;
				}
			}
			this.goodsCom = goodList;
			this.goodList = goodList;
		},
		//获取套餐列表
		async getpackagelist() {
			let packLists = storage.session('packList');
			let packlist = [];
			let version = storage.session('httpGoodVersion');
			let res = false;
			this.version = await this.ShopGetExtra();
			if (
				version &&
				this.version.otherConfigVer == version.otherConfigVer
			) {
				res = true;
			} else {
				res = false;
				storage.session('httpGoodVersion', this.version);
			}
			//如果存在保存的分类信息
			if (packLists && res) {
				packlist = packLists;
			} else {
				packlist = await http.getpackagelist({
					data: { shopId: this.shopId, page: 1, num: 9999 }
				});
				storage.session('packList', packlist);
			}
			let obj = {}; //对套餐id做处理，避免多重循环
			// console.log(this.isPackType);
			for (let i = 0; i < packlist.length; i++) {
				packlist[i].selected = false;
				if (packlist[i].status == '2'||(this.isPackType && this.isPackType.indexOf(packlist[i].type)==-1)) {//下架的或者有需求要求显示的套餐
					packlist.splice(i, 1);
					i--;
				}
				// if(){
				// 	packlist.splice(i, 1);
				// 	i--;
				// }
			}
			// console.log(packlist);
			for (let i = 0; i < packlist.length; i++) {
				if (obj[packlist[i].id]) {
					console.error('有重复id');
				} else {
					obj[packlist[i].id] = i;
				}
			}
			if (this.packages) {
				for (let j = 0; j < this.packages.length; j++) {
					let index = obj[this.packages[j]];
					if (index || index != undefined) {
						packlist[index].selected = true;
					}
				}
			}
			if (this.goInName == 'packsChoice') {//如果从套餐同步进入
				if (!this.isAllOrOther) {//且不是套餐整个信息同步
					for (let i = 0; i < this.asyncGoods.length; i++) {
						//单个选项没有同步过的禁止点击
						let bb = false;
						for (let j = 0; j < packlist.length; j++) {
							if (this.asyncGoods[i].id == packlist[j].id) {
								bb = true;
								break;
							}
						}
						if (!bb) {
							this.asyncGoods[i].isSynOk = true;
						}
					}
				} else {
					for (let i = 0; i < this.asyncGoods.length; i++) {
						//单个选项没有同步过的禁止点击
						this.asyncGoods[i].isSynOk = false;
					}
				}
				packlist = this.asyncGoods;
			}
			this.packlist = packlist;
			this.packCom = packlist;
			// console.log(this.packCom);
		},
		//商品和套餐的切换，商品index =0 ；套餐index = 1
		getGoodList: function(index) {
			this.allGood = true;
			if (index == 0) {
				this.isPackage = false;
				this.goodsCom = this.goodList;
			} else if (index == 1) {
				this.isPackage = true;
				this.goodsCom = this.packlist;
			}
		},
		//选择商品或者套餐
		choseGood: function(item) {
			if (this.isGoods) {
				item.selected = !item.selected;
			} else {
				for (let i = 0; i < this.goodsCom.length; i++) {
					this.goodsCom[i].selected = false;
				}
				if(this.isPackage){//单选的话，如果切换的是套餐，则将所选择的商品清空
					for (let i = 0; i < this.goodList.length; i++) {
						this.goodList[i].selected = false;
					}
				}else{
					for (let i = 0; i < this.packlist.length; i++) {
						this.packlist[i].selected = false;
					}
				}
				item.selected = true;
			}
		},
		//套餐选择，-1 全部，0：固定，1：可选
		selectPack: function(index) {
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
		//分类全部选择或全部取消
		allGoods: function(index) {
			//index为0，取消全部，为1，选择全部
			if (index == 0) {
				this.allSelect = false;
				if (this.isPackage) {
					for (let i = 0; i < this.packCom.length; i++) {
						this.packCom[i].selected = false;
					}
				} else {
					if (this.allGood) {
						for (let i = 0; i < this.goodsCom.length; i++) {
							this.goodsCom[i].selected = false;
						}
					} else {
						if (this.oneGoodList.goodsList.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (
									let i = 0;
									i < this.oneGoodList.goodsList.length;
									i++
								) {
									this.oneGoodList.goodsList[
										i
									].selected = false;
									if (
										this.goodsCom[m].id ==
										this.oneGoodList.goodsList[i].id
									) {
										this.goodsCom[m].selected = false;
									}
								}
							}
						}
						if (
							this.oneGoodList.child &&
							this.oneGoodList.child.length > 0
						) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (
									let i = 0;
									i < this.oneGoodList.child.length;
									i++
								) {
									for (
										let j = 0;
										j <
										this.oneGoodList.child[i].goodsList
											.length;
										j++
									) {
										this.oneGoodList.child[i].goodsList[
											j
										].selected = false;
										if (
											this.goodsCom[m].id ==
											this.oneGoodList.child[i].goodsList[
												j
											].id
										) {
											this.goodsCom[m].selected = false;
										}
									}
								}
							}
						}
					}
				}
			} else if (index == 1) {
				this.allSelect = true;
				if (this.isPackage) {
					for (let i = 0; i < this.packCom.length; i++) {
						this.packCom[i].selected = true;
					}
				} else {
					if (this.allGood) {
						for (let i = 0; i < this.goodsCom.length; i++) {
							this.goodsCom[i].selected = true;
						}
					} else {
						if (this.oneGoodList.goodsList.length > 0) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (
									let i = 0;
									i < this.oneGoodList.goodsList.length;
									i++
								) {
									this.oneGoodList.goodsList[
										i
									].selected = true;
									if (
										this.goodsCom[m].id ==
										this.oneGoodList.goodsList[i].id
									) {
										this.goodsCom[m].selected = true;
									}
								}
							}
						}
						if (
							this.oneGoodList.child &&
							this.oneGoodList.child.length > 0
						) {
							for (let m = 0; m < this.goodsCom.length; m++) {
								for (
									let i = 0;
									i < this.oneGoodList.child.length;
									i++
								) {
									for (
										let j = 0;
										j <
										this.oneGoodList.child[i].goodsList
											.length;
										j++
									) {
										this.oneGoodList.child[i].goodsList[
											j
										].selected = true;
										if (
											this.goodsCom[m].id ==
											this.oneGoodList.child[i].goodsList[
												j
											].id
										) {
											this.goodsCom[m].selected = true;
										}
									}
								}
							}
						}
					}
				}
			}
		},
		//显示一级分类
		showOneArea: function(e) {
			e.stopPropagation();
			this.twoArea.twoAreaBtn = false;
			this.oneArea.oneAreaBtn = !this.oneArea.oneAreaBtn;
		},
		//显示二级分类
		showTwoArea: function(e) {
			e.stopPropagation();
			if (this.L1ID == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请先选择一个一级分类'
				});
				return false;
			}
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = !this.twoArea.twoAreaBtn;
		},
		//选择一级分类
		selectOneArea: function(index, item) {
			this.search = '';
			//判断选择的是否是全部商品
			for (let i = 0; i < this.oneArea.oneAreaList.length; i++) {
				this.oneArea.oneAreaList[i].selected = false;
			}
			item.selected = true;
			this.oneArea.oneAreaBtn = false;
			//选择一级，清空所选二级
			this.twoArea.twoAreaName = '请选择二级分类';
			this.L1ID = item.id;
			this.L2ID = 0;
			if (index == 0) {
				//若选择一级分类下的全部，为选择全部商品，包含一级分类下的和二级分类下的商品
				this.allGood = true;
				this.goodsCom = this.goodList;
				this.oneArea.oneAreaName = '全部';
			} else {
				this.allGood = false;
				this.oneArea.oneAreaName = item.name;
				this.oneArea.oneAreaIndex = index;
				let goodList = this.goodList;
				item.goodsList = [];
				//初始化二级分类，且让一级分类中的菜品为空
				this.twoArea.twoAreaList = [{ id: '0', name: '全部二级分类' }];
				for (let i = 0; i < item.child.length; i++) {
					item.child[i].selected = false; //让所有的二级分类都处于未选中状态
					this.twoArea.twoAreaList.push(item.child[i]);
					item.child[i].goodsList = [];
				}
				//引入一级分类和二级分类的数据，把对应的菜品加入到各个分类中
				for (let j = 0; j < goodList.length; j++) {
					for (let k = 0; k < goodList[j].cids.length; k++) {
						//如果一级id等于商品中的所属分类id，加入一级分类的goodsList中
						if (item.id == goodList[j].cids[k]) {
							item.goodsList.push(goodList[j]);
						}
						for (let i = 0; i < item.child.length; i++) {
							//如果二级级id等于商品中的所属分类id，加入二级级分类的goodsList中
							if (item.child[i].id == goodList[j].cids[k]) {
								item.child[i].goodsList.push(goodList[j]);
							}
						}
					}
				}
				this.oneGoodList = item;
				this.newOneGoodList = item; //复制一个显示的列表，搜索二级分类时使用
			}
		},

		//选择二级分类
		selectTwoArea: function(index, item) {
			this.search = '';
			this.twoArea.twoAreaName = item.name;
			//单选
			let twoList = this.twoArea.twoAreaList;
			for (let i = 0; i < twoList.length; i++) {
				twoList[i].selected = false;
			}
			item.selected = true;
			this.twoArea.twoAreaBtn = false;
			let dowArr = this.newOneGoodList;
			let selectArr = {};
			if (item.id == 0) {
				dowArr.goodsList = [];
				this.oneGoodList = dowArr;
			} else {
				for (let i = 0; i < dowArr.child.length; i++) {
					if (item.id == dowArr.child[i].id) {
						selectArr = dowArr.child[i];
					}
				}
				this.oneGoodList = selectArr;
			}
			this.L2ID = item.id;
		},
		//获取分类列表
		async getOneAreaList() {
			this.oneArea.oneAreaList = [{ id: '0', name: '全部' }]; //分类列表
			let oneAreaList = [{ id: '0', name: '全部' }];
			let twoAreaList = [{ id: '0', name: '全部二级分类' }];
			let list;
			let areaList = storage.session('areaList');
			//如果存在保存的分类信息
			if (areaList) {
				list = areaList;
			} else {
				list = await http.getCategoryList({
					data: { shopId: this.shopId }
				});
				storage.session('areaList', list);
			}
			if (this.categoryList) {
				list = this.categoryList;
			}
			//加上selected字段且把二级和一级各自放在各自的列表中
			for (let i = 0; i < list.length; i++) {
				list[i].selected = false;
				oneAreaList.push(list[i]);
			}
			this.oneArea.oneAreaList = oneAreaList;
		}
	},
	watch: {
		goodList: {
			deep: true,
			handler: function(val, oldVal) {
				let goodsCom = val;
				let arr = [];
				let newArr = [];
				for (let i = 0; i < goodsCom.length; i++) {
					if (goodsCom[i].selected == true) {
						arr.push(goodsCom[i]);
					}
				}
				this.selectNum = arr.length;
			}
		},
		packlist: {
			deep: true,
			handler: function(val, oldVal) {
				let goodsCom = val;
				let arr = [];
				let newArr = [];
				let packlist = this.packlist;
				for (let i = 0; i < packlist.length; i++) {
					if (packlist[i].selected == true) {
						newArr.push(packlist[i]);
					}
				}
				this.selectPackNum = newArr.length;
			}
		}
	}
};
</script>
<style type="text/css" scoped>
.oCont .Box {
	width: 180px;
	height: 42px;
	border: 1px solid #ff9801;
	cursor: pointer;
	box-sizing: border-box;
}
.oCont .oDe {
	width: 50%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
	border-left: 1px solid #ff9801;
	box-sizing: border-box;
	color: #ff9801;
}
.oCont .Box .act {
	background-color: #ff9801;
	color: #fff;
}
.statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}
.statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}
.overHid {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.selected {
	background: url(../res/icon/selected.png) center center no-repeat, #28a8e0;
}
.staList {
	position: relative;
	line-height: 41px;
	width: 210px;
}
.tableList {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
	background: #fff;
}
.tableList .oSpan {
	height: 39px;
	line-height: 39px;
	width: 165px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px solid #b3b3b3;
	overflow: hidden;
}
.tableList div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}
.tableList div i {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}
.detLi {
	position: relative;
	cursor: pointer;
}
.detLi .detImg {
	position: absolute;
	right: 0px;
	top: 15px;
}
.detLi .detDiv {
	width: 450px;
	height: 250px;
	position: absolute;
	top: 45px;
	left: 0;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 15;
	background-color: #45404b;
}
.detLi .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: -10px;
	left: 80px;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #fff #fff #45404b #fff;
}
.detLi .detDiv .detH3 {
	height: 30px;
	line-height: 30px;
	color: #818181;
	text-align: left;
	color: #e6e6e7;
}
.shoName {
	height: 40px;
	line-height: 40px;
	border: 1px solid #f2f2f2;
	float: left;
	margin: 5px;
	color: #fff;
	padding: 0 10px;
}
.shoName-select {
	border-color: #ff9800;
	background: url(../res/images/sign.png?18274) right bottom no-repeat;
}
.shoName-select-one {
	border-color: #ff9800;
	color: #ff9800;
}
.return {
	position: absolute;
	right: 100px;
	top: -50px;
	z-index: 2;
	width: 100px;
	line-height: 40px;
	text-align: center;
	border: 1px solid #ff8c01;
	color: #ff8c01;
	cursor: pointer;
	height: 40px;
}
.raduobtn {
	width: 100px;
	height: 40px;
	line-height: 40px;
	float: left;
	border-radius: 5px;
	margin-left: 10px;
	background-color: #fff;
	color: #333;
}
.selectbtn {
	background-color: #2fa8dd;
	color: #fff;
}

#configTan {
	width: 100%;
	height: 100%;
	padding: 30px 15px;
	background-color: #f2f2f2;
	min-height: 560px;
}
#configTan .aUl {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 10px;
}
#configTan .aUl .aLi {
	padding: 0 15px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	text-align: center;
	background-color: #fff;
	margin: 5px 10px;
	float: left;
	border: 1px solid #d2d2d2;
	color: #919191;
}
.isallselect {
	cursor: pointer;
	width: 100px;
	height: 30px;
	float: left;
	line-height: 30px;
	text-align: center;
	margin: 5px;
	border: 1px solid #a0a0a0;
	color: #a0a0a0;
	float: left;
}
.allselect {
	border: 1px solid #ff9700;
	color: #ff9700;
}
.onecate {
	width: 100%;
	border-bottom: 1px solid #e3e3e3;
	height: auto;
	overflow: hidden;
}
.onecate .onecataTitle {
	width: 115px;
	float: left;
	overflow: hidden;
}
.onecate .twoI {
	width: 10px;
	height: 10px;
	background-color: #9f9f9f;
	margin: 20px 10px;
	float: left;
}
.onecate .twoTitle {
	width: 70px;
	height: 50px;
	line-height: 50px;
	float: left;
	font-weight: 800;
	color: #9f9f9f;
	overflow: hidden;
	vertical-align: middle;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.onecate .oneI {
	background-color: #049fef;
}
.onecate .oneTitle {
	color: #049fef;
}
.dis-type {
	background-color: #f2f2f2 !important;
	border: none !important;
}
</style>
