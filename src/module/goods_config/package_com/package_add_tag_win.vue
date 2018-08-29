/**
 * @Author: 孔伟研 
 * @Date: 2018-08-28 18:21:30 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-08-28 18:22:44
 * @Module:选择商品列表  套餐和商品
**/
<template>
	<win @winEvent="goodListWin" :align="'center'" :height="560" :width="800" :ok="btnOk" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="packTan" slot="content">
			<div class="oBox" style="">
				<el-form label-width="100px" :inline="true">
					<el-form-item required label="名称">
						<el-input v-model="tagName" maxlength="10" placeholder = "输入名称" style = "width:200px;"></el-input>
					</el-form-item>
					<el-form-item required :label="packageType == 0 ? '总数量' :'可选数量'">
						<span v-if="packageType==0">{{totalNum}}</span>
						<el-input-number v-if="packageType==1 || packageType==2" v-model="totalNum" @change="getSubAdd" :min="1"></el-input-number>
					</el-form-item>
				</el-form>
			</div>
			<!--菜单配置弹窗=========================================================================-->
			<section class="configBox" style="">
				<section class="oCont" style="width: 100%;">
					<ul style="float: left;margin-left: 20px;">
						<li style="width:210px;float: left;">
							<!--一级分类选择框-->
							<section class="fl detLi">
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
							<section class="fl detLi">
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
							<el-input placeholder="请输入名称" v-model="search" clearable class="input-with-select" >
								<el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
							</el-input>
						</li>
						<li style="width:60px;margin-left: 10px;float: left;">
							<el-button v-on:click="recSearch()" type="info">重置</el-button>
						</li>
					</ul>
				</section>
				<section class="aUl">
					<section v-if="allGood">
						<el-checkbox-group v-model="selecIndex">
							<div style="margin-bottom:2px;display:inline-block;margin-right:10px;" v-for="(item,i) in goodsCom" :key="i">
								<el-checkbox @change="funSetIsSelect(item,i)" class="labItem" :label="item.id" border>{{item.goodsName}}</el-checkbox>
								<template v-if="packageType!=2">
									<el-input v-model="item.packageGoodsNum" maxlength="2" style = "width:40px;"></el-input>
									<span>{{item.unit}}</span>
								</template>
							</div>
						</el-checkbox-group>
					</section>
					<section v-if="!allGood">
						<div class="onecate" v-if=" oneGoodList.goodsList.length > 0">
							<section class="onecataTitle">
								<i class="twoI" :class="{'oneI':L2ID == '0'}"></i>
								<li class="twoTitle " :class="{'oneTitle':L2ID == '0'}">{{oneGoodList.name}}</li>
							</section>
							<section style="width:600px;margin-left:30px;">
								<el-checkbox-group v-model="selecIndex">
									<div style="margin-bottom:2px;display:inline-block;margin-right:10px;" v-for="(item,i) in oneGoodList.goodsList" :key="i">
										<el-checkbox @change="funSetIsSelect(item,i)" class="labItem" :label="item.id" border>{{item.goodsName}}</el-checkbox>
										<template v-if="packageType!=2">
											<el-input v-model="item.packageGoodsNum" maxlength="2" @change="funSetGoodsNum(item,i)" style = "width:40px;"></el-input>
											<span>{{item.unit}}</span>
										</template>
									</div>
								</el-checkbox-group>
							</section>
						</div>
						<div v-if="category.goodsList.length > 0" class="onecate" v-for="(category,index) in oneGoodList.child" :key="index">
							<section class="onecataTitle">
								<i class="twoI"></i>
								<li class="twoTitle">{{category.name}}</li>
							</section>
							<section style="width:600px;margin-left:30px;">
								<el-checkbox-group v-model="selecIndex">
									<div style="margin-bottom:2px;display:inline-block;margin-right:10px;" v-for="(item,i) in category.goodsList" :key="i">
										<el-checkbox @change="funSetIsSelect(item,i)" class="labItem" :label="item.id" border>{{item.goodsName}}</el-checkbox>
										<template v-if="packageType!=2">
											<el-input v-model="item.packageGoodsNum" maxlength="2" @change="funSetGoodsNum(item,i)" style = "width:40px;"></el-input>
											<span>{{item.unit}}</span>
										</template>
									</div>
								</el-checkbox-group>
							</section>
						</div>

					</section>
				</section>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
// import global from 'src/manager/global';
import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: '',
			title: '',
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
			goodsCom: [], // 当前展示的商品
			goodList: [], // 所有商品
			L1ID: 0, // 1级分类 id
			L2ID: 0, // 2级分类id
			oneGoodList: {}, //选择一级分类页面的所有数据
			newOneGoodList: {}, //新建一个，选择二级分类时渲染数据
			allGood: true, //是否显示所有商品，默认显示
			version: {}, //版本号
			search: '',

			packageType: 1,
			tagName: '', //标识名
			totalNum: null, //选中的数量
			btnOk: {},
			btnCancel: {},
			selecIndex:[]
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.initBtn();
		this.getOneAreaList(); //获取分类列表
		this.getGoodsList(); //获取商品列表
		document.addEventListener('click', this.myClick);
	},
	destroyed() {
		document.removeEventListener('click', this.myClick); //去除绑定
	},
	props: {
		pObj: null
		// goodsIds :Array, //['0','1','2','3']这种格式
		// packages: Array, //['0','1','2','3']这种格式
		// isGoods:Boolean, //单选或者多选  true多选，false单选
		// goInName:String,//从哪里进入的一个标记 可不写
		// isCashier: Boolean,//是否为报表配置 可不写
		// reportSetName: String,//报表配置中菜单配置名称 可不写
		// isOnlyGoods:Boolean,//是否显示套餐 可不写 默认显示
		// idAndName:Boolean,//是否传id和名字 格式[{id:'1',goodsName:"菜1"},{id:'2',goodsName:"菜2"},] 可不写 默认只传id且格式['1','2','3']
		// allGid:Array,       //所有配置过起售的商品id,可不传
		// asyncGoods:Array,   //用于展示同步的品牌商品，可不传
		// isAllOrOther:Boolean,   //是同步品牌商品的所有信息还是部分信息，可不传
		// categoryList:Array,  //是分类列表，为了同步品牌商品，可不传
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		// subAdd: () =>
		// 	import(/*webpackChunkName:'subadd'*/ 'src/components/subadd')
	},
	methods: {
		initBtn() {
			this.packageType = this.pObj.packageType;
			this.tagName = this.pObj.tagName;
			this.totalNum = this.pObj.totalNum;
			this.selecIndex = this.pObj.goodsIds;
			// console.log(this.pObj);
			this.title = this.pObj.title;
			if (this.tagName) {
				this.btnCancel = {
					content: '删除',
					style: 'background-color:#c33'
				};
				this.btnOk = {
					content: '确定'
				};
			} else {
				this.btnCancel = {
					content: '取消'
				};
				this.btnOk = {
					content: '确定'
				};
			}
		},
		recSearch(){
			let item = {id:0};
			this.selectOneArea(0,item);
			this.oneArea.oneAreaName = '请选择一级分类';
			this.L1ID == 0;
			this.search = '';
		},
		//获取可选数量
		getSubAdd(res) {
			this.totalNum = res;
		},
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
		//获取弹窗初始状态
		goodListWin: function(res) {
			if (res == 'ok') {
				//校验名字
				let regTagName = /[\s&"'"']/im;
				if (
					!this.tagName ||
					this.tagName.trim().length == 0 ||
					regTagName.test(this.tagName)
				) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请输入标识名！并且分类名中不能含有&和引号!'
					});
					return false;
				}
				//校验选择的商品数
				let obj = this.counterSelectGoods(this.goodList);
				if (obj.total == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请选择商品'
					});
					return;
				}
				obj.tagName = this.tagName;
				//校验标识名是否存在
				let flag = false;
				let arr = [];
				if (!this.pObj.tagName) {
					arr = this.pObj.packageTag;
				} else {
					arr = this.pObj.packageTag.filter(ele => {
						return ele.tagName != this.pObj.tagName;
					});
				}
				flag = arr.some(ele => {
					if (ele.tagName == this.tagName.trim()) return true;
				});
				if (flag) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '该标识名已经存在!'
					});
					return false;
				}

				if (this.packageType != 0 && obj.total < this.totalNum) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: `选中的商品总数量不能小于'可选数量'!`
					});
					return false;
				}

				if (this.pObj.tagName) {
					if (this.pObj.packageType*1 >0) {
						obj.total = this.totalNum;
					}
					this.$emit('throwTagWin', 'edit', obj);
				} else {
					if (this.pObj.packageType*1 >0) {
						obj.total = this.totalNum;
					}
					this.$emit('throwTagWin', 'add', obj);
				}
			} else if (res == 'cancel' && this.pObj.tagName) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '确认删除该标识?',
					winType: 'confirm',
					callback: res => {
						if (res == 'ok') this.$emit('throwTagWin', 'delete');
					}
				});
			} else {
				this.$emit('throwTagWin', 'close');
			}
		},
		//获取商品列表
		getGoodsList() {
			let goodList = [];
			let obj = {}; //对商品id做处理，避免多重循环
			goodList = this.pObj.goodsList; // 所有商品
			for (let i = 0; i < goodList.length; i++) {
				this.$set(goodList[i], 'selected', false); //往列表里塞selected，
				this.$set(goodList[i], 'packageGoodsNum', ''); //往列表里塞packageGoodsNum，
				// goodList[i].selected = false;
				if (obj[goodList[i].id]) {
					// console.error('有重复id');
				} else {
					obj[goodList[i].id] = i;
				}
			}
			let selGoods = this.pObj.selGoods;
			for (let j = 0; j < selGoods.length; j++) {
				let index = obj[selGoods[j].gid];
				if (index || index != undefined) {
					goodList[index].selected = true;
					goodList[index].packageGoodsNum =
						selGoods[j].packageGoodsNum;
				}
			}
			this.goodsCom = goodList;
			this.goodList = goodList;
		},
		//选取商品
		funSetIsSelect(item, index) {
			item.selected = !item.selected;
			item.selected
				? (item.packageGoodsNum = '1')
				: (item.packageGoodsNum = 0);
			if (this.packageType == 0) {
				let obj = this.counterSelectGoods(this.goodList);
				this.totalNum = obj.total;
			}
		},
		//修改商品的数量
		funSetGoodsNum(item, index) {
			this.selecIndex.push(item.id);
			// console.log(this.selecIndex);
			// console.log(index);
			let num = item.packageGoodsNum;
			let reg = /^[\d]+$/g;
			if (!reg.test(num)) {
				item.packageGoodsNum = '';
			} else {
				item.packageGoodsNum = parseInt(num * 1);
			}
			item.packageGoodsNum * 1 == 0
				? (item.selected = false)
				: (item.selected = true);
			if (this.packageType == 0) {
				let obj = this.counterSelectGoods(this.goodList);
				this.totalNum = obj.total;
			}
		},
		//统计选中的商品
		counterSelectGoods(goods) {
			let obj = {
				goods: [], //选中的商品
				total: 0 //统计总量
			};
			for (let i = 0; i < goods.length; i++) {
				if (goods[i].selected) {
					obj.goods.push(goods[i]);
					obj.total =
						obj.total + parseInt(goods[i].packageGoodsNum * 1);
				}
			}
			return obj;
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
			// console.log(item);
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
					// this.$set(item.child[i], 'selected', false); //往列表里塞selected，
					// this.$set(item.child[i], 'packageGoodsNum', ''); //往列表里塞packageGoodsNum，
					// item.child[i].selected = false; //让所有的二级分类都处于未选中状态
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
		//获取版本号
		async ShopGetExtra() {
			let res = await http.ShopGetExtra({ data: {} });
			return res;
		},
		//获取分类列表
		async getOneAreaList() {
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
			//如果存在保存的商品数据
			this.oneArea.oneAreaList = [{ id: '0', name: '全部' }]; //分类列表
			let oneAreaList = [{ id: '0', name: '全部' }];
			// let twoAreaList = [{ id: '0', name: '全部二级分类' }];
			let list;
			let areaList = storage.session('areaList');
			//如果存在保存的分类信息
			if (areaList && res) {
				list = areaList;
			} else {
				list = await http.getCategoryList({
					data: { shopId: this.shopId }
				});
				storage.session('areaList', list);
			}
			//加上selected字段且把二级和一级各自放在各自的列表中
			for (let i = 0; i < list.length; i++) {
				this.$set(list[i], 'selected', false); //往列表里塞selected，
				// list[i].selected = false;
				oneAreaList.push(list[i]);
			}
			this.oneArea.oneAreaList = oneAreaList;
		}
	}
};
</script>
<style lang="less" type="text/css" scoped>
#packTan {
	.oBox {
		height: 60px;
		width: 100%;
		margin-top:15px;
		border-bottom: 1px solid #ddd;
		font-size: 14px;
		// background-color: #f2f2f2;
	}
	.oCont {
		.Box {
			width: 180px;
			height: 42px;
			border: 1px solid #ff9801;
			cursor: pointer;
			box-sizing: border-box;
		}
		.act {
			background-color: #ff9801;
			color: #fff;
		}
		.oDe {
			width: 50%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			float: left;
			border-left: 1px solid #ff9801;
			box-sizing: border-box;
			color: #ff9801;
		}
		.detLi {
			position: relative;
			line-height: 41px;
			width: 210px;
			cursor: pointer;
			.tableList {
				height: 40px;
				color: #666666;
				border: #b3b3b3 solid 1px;
				cursor: pointer;
				background: #fff;
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
			.shoName {
				height: 40px;
				line-height: 40px;
				border: 1px solid #f2f2f2;
				float: left;
				margin: 5px;
				color: #fff;
				padding: 0 10px;
			}
			
			.shoName-select-one {
				border-color: #ff9800;
				color: #ff9800;
			}
		}
	}
	.configBox {
		width: 100%;
		height: 100%;
		padding: 10px 15px;
		// background-color: #f2f2f2;
		min-height: 560px;
		.aUl {
			width: 100%;
			height: auto;
			overflow: auto;
			padding: 10px;
			margin-left: 10px;
			.onecate {
				width: 100%;
				border-bottom: 1px solid #e3e3e3;
				height: auto;
				overflow: hidden;
				.onecataTitle {
					// width: 115px;
					// float: left;
					overflow: hidden;
				}
				.twoI {
					width: 10px;
					height: 10px;
					background-color: #9f9f9f;
					margin: 20px 10px;
					float: left;
				}
				.twoTitle {
					// width: 70px;
					height: 50px;
					line-height: 50px;
					float: left;
					font-weight: 800;
					color: #9f9f9f;
					// overflow: hidden;
					// vertical-align: middle;
					// text-overflow: ellipsis;
					// white-space: nowrap;
				}
				.oneI {
					background-color: #049fef;
				}
				.oneTitle {
					color: #049fef;
				}
			}
		}
	}
	.labItem {
		margin-bottom: 5px;
		margin-left: 0!important;
		// margin-right: 10px;
	}
}
</style>
