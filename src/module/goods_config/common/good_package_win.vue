/**
 * @Author: 曾伟福 
 * @Date: 2018-09-05 14:59:43 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-05 15:00:15
 * @Module: 商品套餐筛选弹框
**/
<template>
	<win @winEvent="goodListWin" :align="'center'" :width="800" :height="560">
		<span slot="title">{{title}}</span>
		<div id="good_list" slot="content">

			<!--菜单配置弹窗=========================================================================-->
			<section class="configTan" style="">
				<section v-if="showSearch" class="search-goods">
					<span style="font-size: 16px;">搜索商品：</span>
					<input type="text" placeholder="请输入商品的简码或名称" />
				</section>
				<section class="oCont" style="width: 100%;">

					<div v-if="type==0" class="Box" style="width:160px;float: left;">
						<section v-on:click="toggle=true" class="oDe" :class="{'act' : toggle}" style="border-left: none;width:50%;">商品</section>
						<section v-on:click="toggle=false" class="oDe" :class="{'act' : !toggle}">套餐</section>
					</div>

					<!--商品分类展示 -->
					<div v-if="toggle && type !=2" style="float: left;margin-left: 10px;">
						<!--一级分类选择框-->
						<elCategory v-if="showCategory==0 || showCategory==1" @selectCategory = "newselectOneArea" :itemIndex="oneArea.oneAreaIndex" :categoryArr="category" :itemArea = "oneArea"></elCategory>
						<!--二级级分类选择框-->
						<elCategory v-if="showCategory==2 || showCategory==0" @selectCategory = "newselectTwoArea" :itemIndex="twoArea.twoAreaIndex" :categoryArr="child"  :itemArea = "twoArea"></elCategory>	
						
						<!--搜索-->
						<!-- <el-input placeholder="请输入名称" clearable v-model="search" @change="searchGoods" style="width:200px;">
							<el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
						</el-input> -->
					</div>
					<!-- <ul v-if="toggle && type !=2" style="width:550px;float: left;margin-left: 20px;" @click="catchEvent">
						<li style="width:210px;float: left;" v-if="showCategory==0 || showCategory==1">
							<section class="staList fl detLi">
								<section v-on:click="showOneArea" class="tableList">
									<span class="oSpan">{{oneArea.name}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-show="oneArea.show" class="detDiv">
									<i class="detI"></i>
									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in category" :key="index" v-on:click='selectOneArea(item)' :class="{'shoName':true,'shoName-select-one':item.id==oneArea.id}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
						<li style="width:210px;margin-left: 20px;float: left;" v-if="showCategory==2 || showCategory==0">
							<section class="staList fl detLi">
								<section v-on:click="showTwoArea" class="tableList">
									<span class="oSpan">{{twoArea.name}}</span>
									<div class="fl">
										<i></i>
									</div>
								</section>
								<div v-if="twoArea.show" class="detDiv" style="left: -180px;">
									<i class="detI" style="left: 290px;"></i>
									<div style="width:100%;height: 100%;overflow-y: auto;z-index: 16;">
										<section v-for="(item,index) in child" :key="index" v-on:click='selectTwoArea(item)' class="shoName" :class="{'shoName-select-one':item.id==twoArea.id}">{{item.name}}</section>
									</div>
								</div>
							</section>
						</li>
					</ul> -->

					<!--套餐分类展示-->
					<div v-show="!toggle" style="width:100%;height: 50px;overflow: hidden;padding-top:10px;">
						<el-radio-group v-model="selectPackMenu" @change = "selectPack">
							<el-radio-button label="-1">全部</el-radio-button>
							<el-radio-button label="0">固定套餐</el-radio-button>
							<el-radio-button label="1">可选套餐</el-radio-button>
							<el-radio-button label="2">自定义套餐</el-radio-button>
						</el-radio-group>
						<!-- <a @click="selectPack(item,index)" v-for="(item,index) in packMenu" :key="index" :class="{'raduobtn':true,'selectbtn' : item.id == selectPackMenu}"
						    href="javascript:void(0);">{{item.name}}</a> -->
					</div>

				</section>

				<ul class="aUl" style="">
					<!--展示全部商品-->
					<section v-if="oneArea.id==-1 && type!=2 && toggle && parentGoods && parentGoods.length>0">
						<li v-for="(item,index) in parentGoods" :data-id="item.id" :key='index' v-on:click="choseParentGood(item,index)" :class="{'aLi':true,'shoName-select':item.isSelect}">{{item.goodsName}}</li>
					</section>
					<!--套餐的展示-->
					<section v-if="!toggle">
						<li v-if="packages.length>0" v-for="(item,index) in nowPackages" :key='index' v-on:click="choseParentGood(item,index)" class="aLi"
						    :class="{'shoName-select':item.isSelect}">{{item.packageName}}</li>
					</section>

					<!--商品的展示-->
					<section v-if="toggle && oneArea.id!=-1">
						<div class="onecate" style="" v-if="parentGoods && parentGoods.length>0">
							<section>
								<i :class="{'twoI':true,'oneI':true}"></i>
								<li :class="{'twoTitle':true,'oneTitle':true}">{{oneArea.name}}</li>
							</section>

							<section style="clear:both;">
								<li v-for="(item,index) in parentGoods" :key="index" v-on:click="choseParentGood(item,index)" class="aLi" :class="{'shoName-select':item.isSelect}">{{item.goodsName}}</li>
							</section>
						</div>

						<div class="onecate" v-for="(ch,chi) in nowChildGoods" :key="chi">
							<section style="">
								<i class="twoI" style=""></i>
								<li class="twoTitle" style="">{{ch.name}}</li>
							</section>
							<section style="clear:both;">
								<li v-for="(item,index) in ch.arr" :key="index" v-on:click="choseChildGood(item,index,chi)" class="aLi" :class="{'shoName-select':item.isSelect}">{{item.goodsName}}</li>
							</section>
						</div>
					</section>
				</ul>

				<div v-if="showSelectAll==0 || showSelectAll==1 || showSelectAll==2" style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
					<section v-if="showSelectAll==1 || showSelectAll==0" v-on:click="cancelAll" class="isallselect allselect">取消全部</section>
					<section v-if="showSelectAll==1 || showSelectAll==0" v-on:click="selectAll" class="isallselect">选择全部</section>
					<h3 v-if="showSelectAll==2 || showSelectAll==0" v-show="toggle" style="width: auto;height: 40px;line-height: 40px;margin-right:25px;float: right;color: #FF9700;">已选择:&nbsp;{{countGoods.count>1 ? countGoods.count+'个' : countGoods.name}}</h3>
					<h3 v-if="showSelectAll==2 || showSelectAll==0" v-show="!toggle" style="width: auto;height: 40px;line-height: 40px;margin-right:25px;float: right;color: #FF9700;">已选择:&nbsp;{{countPackages.count>1 ? countPackages.count+'个' : countPackages.name }}</h3>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
	/*
	 */
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				oneArea: {
					name: '请选择一级分类',
					id: -1, //选中的一级分类的id
					show: false,
					oneAreaIndex:-1,
				},
				twoArea: {
					name: '请选择二级分类',
					id: null, //选中的二级分类的id
					show: false,
					twoAreaIndex:-1,
				},

				packMenu: [{
					id: -1,
					name: '全部'
				},
				{
					id: 0,
					name: '固定套餐'
				},
				{
					id: 1,
					name: '可选套餐'
				},
				{
					id: 2,
					name: '自定义套餐'
				},
				],
				category: [], //所有的分类
				child: [], //二级分类         

				goodsList: [], //所有的商品
				copyGoods: null, //Array 传递的选中的商品的id

				packages: [], //所有的套餐
				copyPack: null, //选中的套餐副本[id,]
				nowPackages: null, //当前展示的

				parentGoods: [], //当前展示一节分类的商品
				childGoods: [], //二级分类的商品
				nowChildGoods: [], //当前展示的二级分类的商品   

				title: null, //标题
				type: null, //0:套餐,商品都显示,   1:只显示商品,    2:只显示套餐
				showSearch: false, //是否展示搜索功能
				showCategory: null, //是否展示分类
				toggle: true, //套餐和商品的切换  默认展示商品
				showSelectAll: 0, //0:显示全部,已选择等字段,1:只显示'全部选择',2:显示'已选择'
				selectPackMenu: -1, //选中的套餐类型
				countGoods: {
					count: 0,
					name: '',
				}, //选中的商品个数
				countPackages: {
					count: 0,
					name: '',
				}, //选中的套餐个数
				isGetExtra: false, //是否请求版本号,true不请求,默认请求
			};
		},
		props: {
			pGoodsList: null,
			/*
			{
			    title:弹框的标题   默认(选择关联商品)(非必须)
			    type:0:套餐,商品都展示(默认) 1:只显示商品    2:只显示套餐(非必须)    

			    goodsList:      Array    需要展示的商品                商品对象
			    selGoods:       Array   默认选中的商品(非必须),         数组元素为商品的id
			    delGoods:       Array   需要过滤的商品id(非必须),       数组元素为商品的id

			    goodRadio:      Boolean 商品的单选还是多选 false:多选(默认)
			    packageRadio:   Boolean 套餐的单选还是多选 false:多选 (默认)

			    selPack:        Array   默认选中的套餐(非必须)          数组元素为套餐的id
			    delPack:        Array   需要过滤的套餐id(非必须)        数组元素为套餐的id

			    showSelectAll:  Number   是否展示全部选中与已选择等提示信息  0:显示'取消全部'与'已选择字样'(默认值), 1:'只显示取消全部' 2:'只显示已选择'
			    showSearch:     Boolean  是否展示搜索功能(默认false)      

			    category:       Array                                分类列表
			    showCategory:   Number                              1:只显示一级分类 0:全部显示(默认) 2:只显示二级分类

			    isGetExtra:     Boolean             是否请求版本号,默认请求,true不请求
			}
			*/
		},
		methods: {
			//------------  win -----------------
			goodListWin(res) {
				let obj = {
					goodArr: [],
					packArr: [],
				};
				if (res == 'ok') {
					obj.goodArr = this.goodsList.filter((ele) => {
						return ele.isSelect;
					});
					obj.packArr = this.packages.filter((ele) => {
						return ele.isSelect;
					});
					(obj.goodArr) || (obj.goodArr = []);
					(obj.packArr) || (obj.packArr = []);

				} else {
					//当点击取消的时候返回先前的数据
					(this.copyGoods) || (this.copyGoods = []);
					(this.copyPack) || (this.copyPack = []);
					this.goodsList.forEach((ele) => {
						this.copyGoods.forEach((e) => {
							if (ele.id == e) obj.goodArr.push(ele);
						});
					});
					this.packages.forEach((ele) => {
						this.copyPack.forEach((e) => {
							if (ele.id == e) obj.packArr.push(ele);
						});
					});
				}
				this.$emit('throwGoodListWin', res, obj);
			},
			//-------       分类      ---------
			showOneArea() {
				this.oneArea.show = !this.oneArea.show;
				this.twoArea.show = false;
			},
			//一级分类框返回
			newselectOneArea(index) {
				this.oneArea.oneAreaIndex = index;
				this.twoArea.twoAreaIndex = -1;
				let item = this.category[index];
				this.selectOneArea(item);
			},
			//二级分类框返回
			newselectTwoArea(index) {
				this.twoArea.twoAreaIndex = index;
				let item = this.child[index];
				this.selectTwoArea(item);
			},
			//选择一级分类
			selectOneArea(item) {
				this.oneArea.id = item.id;
				this.oneArea.name = item.name;
				// this.oneArea = {
				// 	id: item.id,
				// 	name: item.name,
				// 	show: false
				// };
				this.twoArea = {
					id: -2,
					name: '请选择二级分类',
					show: false,
					twoAreaIndex:-1
				};

				this.child = item.child;
				this.child || (this.child = []);
				let temp = this.filterGoodsByPid(this.goodsList, this.category, item.id);
				this.parentGoods = temp.parent;
				this.childGoods = temp.child;
				this.nowChildGoods = this.childGoods;
			},
			showTwoArea() {
				if (!this.child) this.child = [];
				if (this.oneArea.id == -1) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '请先选择一级分类'
					});
					return;
				}
				if (this.child.length == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '该分类下不存在二级分类'
					});
					return;
				}
				this.twoArea.show = !this.twoArea.show;
				this.oneArea.show = false;
				if (this.child[0].id != -1) {
					this.child.unshift({
						id: -1,
						name: '全部二级分类',
						show: false
					});
				}
			},
			selectTwoArea(item) {
				this.twoArea.id = item.id;
				this.twoArea.name = item.name;
				this.twoArea.show = false;
				this.nowChildGoods = this.childGoods.filter((ele) => {
					if (item.id == -1) {
						return true;
					} else {
						return ele.id == item.id;
					}
				});
				this.parentGoods = [];
			},
			//通过一级分类id筛选商品 返回筛选后的商品 
			filterGoodsByPid(goods, category, id) {
				let arr = []; //存储属于一级分类的商品 (纯商品)
				let arr2 = []; //存储属于二级分类的商品和名字 ([{name:'二级分类名',id:二级分类的id,arr:[]}])
				if (id == -1) {
					return {
						parent: goods,
						child: []
					};
				}
				//属于一级分类的商品            
				goods.forEach((ele) => {
					let cids = ele.cids;
					cids || (cids = []);
					for (let i = 0, len = cids.length; i < len; i++) {
						if (cids[i] == id) {
							arr.push(ele);
							break;
						}
					}
				});

				category.some((cate) => {
					if (cate.id == id) {
						let child = cate.child;
						child || (child = []);
						child.forEach((e) => {
							let obj = {
								name: e.name,
								id: e.id,
								arr: [],
							};
							goods.forEach((good) => {
								let cids = good.cids;
								cids || (cids = []);
								for (let i = 0, len = cids.length; i < len; i++) {
									if (cids[i] == e.id) {
										obj.arr.push(good);
										break;
									}
								}
							});
							if (obj.arr.length > 0) arr2.push(obj);
						});
						return true;
					}
				});

				return {
					parent: arr,
					child: arr2
				};
			},


			//-----------       套餐      -------------
			//选择套餐类型
			selectPack(id) {
				this.selectPackMenu = id;
				this.nowPackages = this.packages.filter((ele) => {
					if (id == -1) {
						return true;
					} else {
						return ele.type == id;
					}
				});
			},

			//-----------       选择      --------------
			//选择一级分类的商品或选择套餐
			choseParentGood(item, index) {
				if (this.toggle) {
					if (this.pGoodsList.goodRadio) {
						//单选
						this.goodsList = this.goodsList.map((ele) => {
							ele.isSelect = false;
							return ele;
						});
					}
					item.isSelect = !item.isSelect;
					this.parentGoods.splice(index, 1, item);
					this.countGoods = this.initSelectNum(this.goodsList, 'good');
				} else {
					if (this.pGoodsList.packageRadio) {
						this.packages = this.packages.map((ele) => {
							ele.isSelect = false;
							return ele;
						});
					}
					item.isSelect = !item.isSelect;
					this.countPackages = this.initSelectNum(this.packages, 'pack');
				}
			},
			//选择二级分类的商品
			choseChildGood(item, index, chi) {
				//item商品    index 商品的索引 chi:该分类在childGoods中的索引
				if (this.pGoodsList.goodRadio) {
					//单选
					this.goodsList = this.goodsList.map((ele) => {
						ele.isSelect = false;
						return ele;
					});
				}
				item.isSelect = !item.isSelect;
				let temp = this.childGoods[chi];
				temp.arr.splice(index, 1, item);
				this.countGoods = this.initSelectNum(this.goodsList, 'good');
			},
			//选中全部
			selectAll() {
				if (this.toggle) {
					this.parentGoods = this.parentGoods.map(ele => {
						ele.isSelect = true;
						return ele;
					});
					if (!this.nowChildGoods) this.nowChildGoods = [];
					this.nowChildGoods = this.nowChildGoods.map((ele) => {
						ele.arr.forEach((e) => {
							e.isSelect = true;
						});
						return ele;
					});
					this.countGoods = this.initSelectNum(this.goodsList, 'good');
				} else {
					this.nowPackages = this.nowPackages.map(ele => {
						ele.isSelect = true;
						return ele;
					});
					this.countPackages = this.initSelectNum(this.packages, 'pack');
				}
			},
			//取消全部
			cancelAll() {
				if (this.toggle) {
					this.parentGoods = this.parentGoods.map(ele => {
						ele.isSelect = false;
						return ele;
					});
					if (!this.nowChildGoods) this.nowChildGoods = [];
					this.nowChildGoods = this.nowChildGoods.map((ele) => {
						let arr = ele.arr;
						arr.forEach((e) => {
							e.isSelect = false;
						});
						return ele;
					});
					this.countGoods = {
						count: 0,
						name: ''
					};
				} else {
					this.nowPackages = this.nowPackages.map(ele => {
						ele.isSelect = false;
						return ele;
					});
					this.countPackages = {
						count: 0,
						name: ''
					};
				}
			},

			//----------        初始化     ------------------
			//初始化
			async initData() {
				//初始化shopId,title,type,shopId,showSearch
				// if (!this.pGoodsList) throw new Error('pGoodsList为对象');
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
				this.pGoodsList.title ? (this.title = this.pGoodsList.title) : (this.title = '选择关联商品');
				this.type = this.pGoodsList.type;
				this.isGetExtra = this.pGoodsList.isGetExtra;
				if (!this.pGoodsList.showSearch) this.showSearch = false;
				this.showSelectAll = this.pGoodsList.showSelectAll;
				if (typeof this.pGoodsList.showSelectAll == 'undefined') this.showSelectAll = 0;

				let httpGoodVersion = null;
				if (!this.isGetExtra) httpGoodVersion = await this.ShopGetExtra();

				switch ('' + this.type) {
					case '0':
						this.initGoods(httpGoodVersion);
						this.initPackages(httpGoodVersion);
						break;
					case '1':
						this.initGoods(httpGoodVersion);
						break;
					case '2':
						this.initPackages(httpGoodVersion);
						break;
					default:
						this.initGoods(httpGoodVersion);
						this.initPackages(httpGoodVersion);
				}

				this.showCategory = this.pGoodsList.showCategory;
				if (typeof this.showCategory == 'undefined') this.showCategory = 0;
				if (!this.isGetExtra) {
					storage.session('httpGoodVersion', httpGoodVersion);
				}
			},
			//初始化商品
			initGoods(con) {
				this.goodsList = this.pGoodsList.goodsList;
				// if (!this.goodsList) throw new Error('商品为空!');

				this.goodsList = this.copyData(this.goodsList); //防止影响原始数据

				if (this.pGoodsList.delGoods) {
					let temp = this.pGoodsList.delGoods;
					// if (!temp instanceof Array) throw new Error('delGoods为数组!');
					this.goodsList = this.filterGoods(this.goodsList, temp);
				}

				if (this.pGoodsList.selGoods) {
					let temp = this.pGoodsList.selGoods;
					// if (!temp instanceof Array) throw new Error('pSelGoods为数组!');
					this.copyGoods = this.copyData(temp);
				}

				this.goodsList = this.initSelect(this.goodsList, this.pGoodsList.selGoods);
				this.countGoods = this.initSelectNum(this.goodsList, 'good');

				if (this.pGoodsList.category) {
					this.category = utils.deepCopy(this.pGoodsList.category);
					this.category.unshift({
						id: -1,
						name: '全部'
					});
					let temp = this.filterGoodsByPid(this.goodsList, this.category, this.oneArea.id);
					this.parentGoods = temp.parent;
					this.childGoods = temp.child;
				} else {
					this.getCategoryList(false, con.otherConfigVer).then((cate) => {
						if (cate[0] && cate[0].id != -1) {
							cate.unshift({
								id: -1,
								name: '全部一级分类'
							});
						}
						this.category = cate;
						let temp = this.filterGoodsByPid(this.goodsList, this.category, this.oneArea.id);
						this.parentGoods = temp.parent;
						this.childGoods = temp.child;
					});
				}
			},
			//初始化套餐
			initPackages(con) {
				this.getpackagelist(false, con.otherConfigVer).then((res) => {
					this.packages = res;
					if (this.pGoodsList.delPack) {
						let temp = this.pGoodsList.delPack;
						this.packages = this.filterGoods(res, temp);
					}
					if (this.pGoodsList.selPack) {
						let temp = this.pGoodsList.selPack;
						this.copyPack = this.copyData(temp);
					}
					this.packages = this.initSelect(this.packages, this.pGoodsList.selPack);
					this.selectPack(this.selectPackMenu);
					this.countPackages = this.initSelectNum(this.packages, 'pack');
				});
			},
			//获取选中的数量
			initSelectNum(arr, marker) {
				// if (!arr instanceof Array) throw new Error('arr不是数组!');
				let firstGood = {};
				let obj = {
					count: 0,
					name: '',
				};
				arr.forEach((ele) => {
					if (ele.isSelect) {
						obj.count++;
						firstGood = ele;
					}
				});
				if (obj.count == 1) {
					if (marker == 'good') {
						obj.name = firstGood.goodsName;
					} else {
						obj.name = firstGood.packageName;
					}
				}
				return obj;
			},
			//筛选商品或套餐 返回过滤后的商品或套餐
			filterGoods(good, cond) {
				// if ((!good instanceof Array) || (!cond instanceof Array)) throw new Error('good,cond非数组');
				let arr = [];
				arr = good.filter((ele) => {
					let flag = false;
					for (let i = 0, len = cond.length; i < len; i++) {
						if (ele.id == cond[i]) {
							flag = true;
							break;
						}
					}
					if (flag) {
						return false;
					} else {
						return true;
					}
				});
				return arr;
			},
			//初始化商品,套餐是否选中
			initSelect(good, cond) {
				// if (!good instanceof Array) throw new Error('good非数组');
				let arr = [];
				arr = good.map((ele) => {
					let flag = false;
					if (cond) {
						// if (!cond instanceof Array) throw Error('cond非数组');
						for (let i = 0, len = cond.length; i < len; i++) {
							if (ele.id == cond[i]) {
								flag = true;
								break;
							}
						}
					}
					flag ? (ele.isSelect = true) : (ele.isSelect = false);
					return ele;
				});
				return arr;
			},
			//保留副本,返回数据的副本
			copyData(arr) {
				// if (!arr instanceof Array) throw new Error('arr不是数组');
				let temp = null;
				temp = JSON.stringify(arr);
				temp = JSON.parse(temp);
				return temp;
			},
			//获取版本号
			async ShopGetExtra() {
				let res = await http.ShopGetExtra({
					data: {}
				});
				return res;
			},
			//获取套餐
			async getPack() {
				let packageList = await http.getpackagelist({
					data: {
						shopId: this.shopId,
						page: 1,
						num: 9999
					}
				});
				storage.session('packList', packageList);
				return packageList;
			},
			async getpackagelist(flag, ver) {
				let packages = null;
				if (flag) {
					packages = await this.getPack();
				} else {
					let httpGoodVersion = storage.session('httpGoodVersion');
					if (!httpGoodVersion) {
						packages = await this.getPack();
					} else {
						if (httpGoodVersion.otherConfigVer == ver) {
							packages = storage.session('packList');
							if (!packages) packages = await this.getPack();
						} else {
							packages = await this.getPack();
						}
					}
				}
				return packages;
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

			//dom点击隐藏事件
			// domClick() {
			// 	this.twoArea.show = this.oneArea.show = false;
			// },
			catchEvent(event) {
				event.cancelBubble = true;
			},
		},
		mounted() {
			this.initData();
			// console.log(this.type);
			// document.addEventListener('click', this.domClick, false);

		},
		components: {
			elCategory: () =>import(/*webpackChunkName:'el_category'*/ 'src/components/el_category'),
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win')
		},
		// beforeDestroy() {
		// 	document.removeEventListener('click', this.domClick);
		// }
	};
</script>
<style scoped lang="less">
	#good_list {
		.search-goods {
			height: 50px;
			line-height: 50px;
			margin-left: 15px;
			float: right;
			input {
				height: 40px;
				font-size: 13px;
				padding-left: 10px;
				outline: none;
			}
		}
		.oCont {
			display: inline-block;

			.Box {
				width: 180px;
				height: 40px;
				border: 1px solid #FF9801;
				cursor: pointer;
				box-sizing: border-box;
				.act {
					background-color: #FF9801;
					color: #fff;
				}
			}
			.oDe {
				width: 50%;
				height: 38px;
				line-height: 38px;
				text-align: center;
				float: left;
				border-left: 1px solid #FF9801;
				box-sizing: border-box;
				color: #FF9801
			}
		}
		.statisticsList {
			ul {
				width: 100%;
				margin: 0;
				position: absolute;
				top: 43px;
				left: 0;
				z-index: 10;
				background: #fff;
				li {
					text-align: center;
					height: 41px;
					border: 1px #b3b3b3 solid;
					border-top: 0;
					background: #fff;
					cursor: pointer;
				}
			}
		}
		.overHid {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.selected {
			background: url(../../../res/icon/selected.png) center center no-repeat, #28A8E0;
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
			.oSpan {
				height: 39px;
				line-height: 39px;
				width: 165px;
				display: block;
				float: left;
				text-align: center;
				border-right: 1px solid #b3b3b3;
				overflow: hidden;
			}
			div {
				width: 40px;
				height: 40px;
				position: relative;
				z-index: 5;
				i {
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
			}
		}
		.detLi {
			position: relative;
			cursor: pointer;
			.detImg {
				position: absolute;
				right: 0px;
				top: 15px;
			}
			.detDiv {
				width: 450px;
				height: 250px;
				position: absolute;
				top: 45px;
				left: 0;
				padding: 10px;
				box-shadow: 3px 2px 10px #ccc;
				z-index: 15;
				background-color: #45404b;
				.detI {
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
				.detH3 {
					height: 30px;
					line-height: 30px;
					color: #818181;
					text-align: left;
					color: #e6e6e7;
				}

			}
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
			border-color: #FF9800;
			background: url(../../../res/images/sign.png?18274) right bottom no-repeat;
		}
		.shoName-select-one {
			border-color: #FF9800;
			color: #FF9800;
		}
		.return {
			position: absolute;
			right: 100px;
			top: -50px;
			z-index: 2;
			width: 100px;
			line-height: 40px;
			text-align: center;
			border: 1px solid #FF8C01;
			color: #FF8C01;
			cursor: pointer;
			height: 40px;
		}
		.raduobtn {
			width: 100px;
			height: 40px;
			line-height: 40px;
			float: left;
			margin-left: 10px;
			background-color: #f2f2f2;
			color: #333;
		}

		.selectbtn {
			background-color: #2FA8DD;
			color: #fff;
		}
		.configTan {
			width: 100%;
			height: 100%;
			padding: 20px 15px;
			background-color: #fff;
			.aUl {
				width: 100%;
				height: auto;
				overflow: auto;
				padding: 10px;
				padding-bottom: 30px;
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
			}
		}
		.shoName-select {
			border-color: #FF9800;
			background: url(../../../res/images/sign.png?18274) right bottom no-repeat;
		}
		.isallselect {
			cursor: pointer;
			width: 100px;
			height: 30px;
			float: left;
			line-height: 30px;
			text-align: center;
			margin: 5px;
			border: 1px solid #A0A0A0;
			color: #A0A0A0;
			float: left;
		}
		.allselect {
			border: 1px solid #FF9700;
			color: #FF9700;
		}
		.onecate {
			width: 100%;
			border-bottom: 1px solid #e3e3e3;
			height: auto;
			overflow: hidden;
			.twoI {
				width: 10px;
				height: 10px;
				background-color: #9F9F9F;
				margin: 20px 10px;
				float: left;
			}
			.twoTitle {
				// width: 70px;
				height: 50px;
				line-height: 50px;
				// float: left;
				font-weight: 800;
				color: #9F9F9F;
				overflow: hidden;
				vertical-align: middle;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.oneI {
				background-color: #049FEF;
			}
			.oneTitle {
				color: #049FEF;
			}
		}

	}
</style>