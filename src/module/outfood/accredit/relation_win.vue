<template>
	<win :width="width" :height="height" @winEvent="winEvent" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props" style="height:100%">
			<div id="relevance">
				<!--头部=============================================-->
				<section class="oCont" style="width: 100%;">
					<div class="Box" style="width:160px;float: left;margin-top: -2px">
						<section v-on:click="getGoodList(0)" class="oDe" :class="{'act' : !isPackage}" style="border-left: none;width:50%;">商品
						</section>
						<section v-on:click="getGoodList(1)" class="oDe" :class="{'act' : isPackage}">套餐</section>
					</div>
					<ul v-if="!isPackage" style="width:550px;float: left;margin-left: 20px;">
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
										<template v-for="(item,index) in oneArea.oneAreaList">
											<!--显示一级分类的所有名称-->
											<section :key="index" v-on:click='selectOneArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}
											</section>
										</template>
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
										<template v-for="(item,index) in twoArea.twoAreaList">
											<section :key="index" v-on:click='selectTwoArea(index,item)' class="shoName" :class="{'shoName-select-one':item && item.selected}">{{item.name}}
											</section>
										</template>
									</div>
								</div>
							</section>
						</li>
					</ul>
					<section class="search" style="margin-left: 20px;display: inline-block;vertical-align: bottom;">
						<input type="text" placeholder="请输入名称/简码" class="search-input" v-on:keyup="keyUp" v-model="search" />
						<a href="javascript:void(0);" v-on:click="keyUp" class="search-btn" style="background-color:#29A7E1;"></a>
					</section>
				</section>
				<!--列表显示=================================================-->
				<ul class="aUl" style="width: 950px;margin-bottom: 30px;">
					<template v-if="allGood">
						<li v-if="!isPackage" v-for="(item,i) in goodsCom" :key="i" v-on:click="choseGood(item,i)" class="aLi" :class="{'shoName-select':item.id==selected.id}">{{item.goodsName}}
						</li>
						<li v-if="isPackage" v-for="(item,i) in packCom" :key="i" v-on:click="choseGood(item,i)" class="aLi" :class="{'shoName-select': '0'+item.id== selected.id}">{{item.packageName}}
						</li>
						<div class="showText" v-if="(!isPackage&&goodsCom.length==0)||(isPackage&&packCom.length==0)">
							<span>------------未搜索到该商品------------</span>
						</div>
					</template>
					<template v-if="!allGood">
						<div class="onecate" v-if="oneGoodList.goodsList&&oneGoodList.goodsList.length > 0" style="">
							<section class="onecataTitle" style="">
								<i class="twoI" :class="{'oneI':L2ID == '0'}"></i>
								<li class="twoTitle " :class="{'oneTitle':L2ID == '0'}">{{oneGoodList.name}}</li>
							</section>
							<section style="width:800px;float: left;">
								<template v-for="(item,index) in oneGoodList.goodsList">
									<li v-on:click="choseGood(item,index)" :key="index" class="aLi" :class="{'shoName-select':item.id==selected.id}">
										{{item.goodsName ? item.goodsName : item.packageName}}
									</li>
								</template>
							</section>
						</div>
						<template v-if="oneGoodList.child" v-for="(category,index) in oneGoodList.child">
							<div v-if="category.goodsList.length > 0" :key="index" class="onecate" style="">
								<section class="onecataTitle" style="">
									<i class="twoI" style=""></i>
									<li class="twoTitle" style="">{{category.name}}</li>
								</section>
								<section style="width:800px;float: left;">
									<ul v-for="(item,i) in category.goodsList" :key="i">
										<li v-on:click="choseGood(item,i)" class="aLi" :class="{'shoName-select':item.id==selected.id}">
											{{item.goodsName ? item.goodsName : item.packageName}}
										</li>
									</ul>
								</section>
							</div>
						</template>
						<div class="showText" v-if="oneGoodList.goodsList.length==0">
							<span>------------未搜索到该商品------------</span>
						</div>
					</template>
				</ul>

				<!--底部===========================================-->
				<div style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
					<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;" class="elic">已选择:{{selected.goodsName||selected.packageName}}</h3>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
//获取保存商品信息
const seloneAir = {};
let seltwoAir = {};
const goodList = storage.session('goodList');
if (!goodList) {
	// 请求商品列表
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
const packlist = storage.session('packageList'); //所有套餐
export default {
	created() {
		if (this.item) {
			this.selected = {
				id: this.item.eDishSkuCode ? this.item.eDishSkuCode : '',
				goodsName: this.item.eDishSkuCode
					? this.getGoodsName(this.item.eDishSkuCode)
					: ''
			};
			if (/^(0)/.test(this.item.eDishSkuCode)) {
				this.getGoodList(1);
			}
		}
		// if (this.changeConfig == 3) {
		//   this.selected.isPackage = this.isPackage ? 1 : 0;
		// //   if (addGoodsWin.releSel.isPackage == 1) {
		// //     this.getGoodList(1);
		// //   }
		// //   this.selected = addGoodsWin.releSel;
		// }
	},
	data() {
		return {
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
				twoAreaList: [{ id: '0', name: '全部二级分类' }], //二级分类列表
				newTwoAreaList: [{ id: '0', name: '全部二级分类' }] //拷贝的二级分类列表，选择一级分类时变换二级分类列表用
			},
			isPackage: false, //商品或套餐显示的控制，默认是显示商品
			packlist: utils.deepCopy(packlist), //所有的套餐列表
			packCom: [], //要展示的套餐列表
			goodList: utils.deepCopy(goodList), //所有的商品列表
			goodsCom: [], // 当前展示的商品
			L1ID: 0, // 1级分类 id
			L2ID: 0, // 2级分类id
			allSelect: false, //全部选择  下部固定的部分，控制全部选择页面显示出的商品或套餐
			oneGoodList: {}, //选择一级分类页面的所有数据（分类名称）
			newOneGoodList: {}, //新建一个，选择二级分类时渲染数据
			allGood: true, //是否显示所有商品，默认显示
			selected: '',
			search: '' //搜索
		};
	},
	props: [
		'width',
		'height',
		'title',
		'seloneAir',
		'seltwoAir',
		'changeConfig',
		'item'
	],
	methods: {
		//商品和套餐的切换，商品index =0 ；套餐index = 1
		getGoodList: function(index) {
			this.allGood = true;
			if (index == 0) {
				this.isPackage = false;
				this.goodsCom = this.goodList;
				if (seloneAir.item) {
					this.selectOneArea(seloneAir.index, seloneAir.item, 1);
					if (seltwoAir.item) {
						this.selectTwoArea(seltwoAir.index, seltwoAir.item);
					}
				}
			} else if (index == 1) {
				this.isPackage = true;

				this.goodsCom = this.packlist;
			}
		},
		//选择商品或者套餐
		choseGood: function(item) {
			this.selected = utils.deepCopy(item);
			if (this.isPackage) {
				this.selected.id = '0' + this.selected.id;
			}
		},
		//套餐选择，-1 全部，0：固定，1：可选
		selectPack: function(index) {
			let arr = []; //清空packCom
			let packlist = this.packlist;
			if (index == -1) {
				this.packCom = packlist;
			} else {
				for (let i = 0; i < packlist.length; i++) {
					if (packlist[i].type == index) {
						arr.push(packlist[i]);
					}
				}
			}
			this.packlist = arr;
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
					content: '请先选择一个一级分类'
				});
				return false;
			}
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = !this.twoArea.twoAreaBtn;
		},
		//选择一级分类
		selectOneArea: function(index, item, type) {
			seloneAir.item = item;
			seloneAir.index = index;
			if (type != 1) seltwoAir = {};
			//判断选择的是否是全部商品
			for (let i = 0; i < this.oneArea.oneAreaList.length; i++) {
				this.oneArea.oneAreaList[i].selected = false;
			}
			item.selected = true;
			this.oneArea.oneAreaBtn = false;
			if (index == 0) {
				//若选择一级分类下的全部，为选择全部商品，包含一级分类下的和二级分类下的商品
				this.allGood = true;
				this.goodsCom = this.goodList;
				this.oneArea.oneAreaIndex = index;
				this.oneArea.oneAreaName = item.name;
				this.L1ID = item.id;
				this.twoArea.twoAreaName = '请选择二级分类';
			} else {
				this.allGood = false;
				this.oneArea.oneAreaName = item.name;
				this.oneArea.oneAreaIndex = index;
				this.twoArea.twoAreaName = '请选择二级分类';
				this.L1ID = item.id;
				this.L2ID = 0;
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
				this.oneGoodList = utils.deepCopy(item);
				this.newOneGoodList = utils.deepCopy(item); //复制一个显示的列表，搜索二级分类时使用
			}
		},

		//选择二级分类
		selectTwoArea: function(index, item) {
			seltwoAir.item = item;
			seltwoAir.index = index;
			this.twoArea.twoAreaName = item.name;
			//单选
			let twoList = this.twoArea.twoAreaList;
			for (let i = 0; i < twoList.length; i++) {
				twoList[i].selected = false;
			}
			item.selected = true;
			this.twoArea.twoAreaBtn = false;
			let dowArr = utils.deepCopy(this.newOneGoodList);
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
				// this.newOneGoodList = utils.deepCopy(selectArr);
			}
			this.L2ID = item.id;
		},
		//获取分类列表名称
		async getOneAreaList() {
			this.oneArea.oneAreaList = [{ id: '0', name: '全部' }]; //分类列表
			let data = await http.getCategoryList({
				data: {}
			});
			let list = data;
			let oneAreaList = [{ id: '0', name: '全部' }];
			let twoAreaList = [{ id: '0', name: '全部二级分类' }];
			//加上selected字段且把二级和一级各自放在各自的列表中
			for (let i = 0; i < list.length; i++) {
				list[i].selected = false;
				oneAreaList.push(list[i]);
				for (let j = 0; j < list[i].child.length; j++) {
					twoAreaList.push(list[i].child[j]);
				}
			}
			this.oneArea.oneAreaList = oneAreaList;
			this.twoArea.twoAreaList = twoAreaList;
			this.twoArea.newTwoAreaList = twoAreaList;
		},
		keyUp: function() {
			this.search = this.search.toUpperCase();
			let arr = [];
			if (this.allGood) {
				let list = this.isPackage ? this.packlist : this.goodList;
				for (let i = 0; i < list.length; i++) {
					let name = this.isPackage
						? list[i].packageName
						: list[i].goodsName;
					if (
						name.toUpperCase().indexOf(this.search) != -1 ||
						list[i].BC.indexOf(this.search) != -1
					) {
						arr.push(list[i]);
					}
				}
				if (this.isPackage) {
					this.packCom = arr;
				} else {
					this.goodsCom = arr;
				}
				if (this.search == '') {
					if (this.isPackage) {
						this.packCom = this.packlist;
					} else {
						this.goodsCom = this.goodList;
					}
				}
			} else {
				let obj = {};
				for (let i = 0; i < this.newOneGoodList.goodsList.length; i++) {
					// debugger
					if (
						this.newOneGoodList.goodsList[i].goodsName
							.toUpperCase()
							.indexOf(this.search) != -1 ||
						this.newOneGoodList.goodsList[i].BC.indexOf(
							this.search
						) != -1
					) {
						arr.push(this.newOneGoodList.goodsList[i]);
					}
				}
				obj.goodsList = arr;
				obj.name = this.newOneGoodList.name;
				obj.child = [];
				if (this.newOneGoodList.child.length > 0) {
					for (let i = 0; i < this.newOneGoodList.child.length; i++) {
						let childArr = [];
						for (
							let j = 0;
							j < this.newOneGoodList.child[i].goodsList.length;
							j++
						) {
							if (
								this.newOneGoodList.child[i].goodsList[
									j
								].goodsName
									.toUpperCase()
									.indexOf(this.search) != -1 ||
								this.newOneGoodList.child[i].goodsList[
									j
								].BC.indexOf(this.search) != -1
							) {
								childArr.push(
									this.newOneGoodList.child[i].goodsList[j]
								);
							}
						}
						this.oneGoodList.child[i].goodsList = childArr;
					}
					obj.child = this.oneGoodList.child;
				}
				this.oneGoodList = utils.deepCopy(obj);
				if (this.search == '') {
					this.oneGoodList = utils.deepCopy(this.newOneGoodList);
				}
			}
		},
		winEvent(str) {
			this.$emit('relationEvent', str);
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
		this.getOneAreaList(); //获取分类列表的数据
		if (this.item && this.item.eDishSkuCode) {
			this.selected.id = this.item.eDishSkuCode;
			this.selected.goodsName = this.getGoodsName(this.selected.id);
		}
		let glist = utils.deepCopy(this.goodList);
		this.goodList = glist;
		this.goodsCom = glist;
		this.selectPack(0);
		this.packCom = this.packlist; //初始化，显示所有
		if (seloneAir.item) {
			this.selectOneArea(seloneAir.index, seloneAir.item, 1);
			if (seltwoAir.item) {
				this.selectTwoArea(seltwoAir.index, seltwoAir.item);
			}
		}
		document.onclick = () => {
			this.oneArea.oneAreaBtn = false;
			this.twoArea.twoAreaBtn = false;
		};
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>
<style scoped>
#relevance {
	padding: 20px 20px 0 20px;
}
#relevance {
	width: 100%;
	min-height: 100%;
	padding: 20px 15px;
	background-color: #fff;
}

.aUl {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 10px;
}

.aUl .aLi {
	padding: 0 15px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	text-align: center;
	background-color: #f2f2f2;
	margin: 5px 10px;
	float: left;
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
/* .allselect {
		border: 1px solid #FF9700;
		color: #FF9700;
	} */
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
.oCont .Box .act {
	background-color: #ff9801;
	color: #fff;
}
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
.staList {
	position: relative;
	line-height: 41px;
	width: 210px;
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
	background: url(../../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
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
	background: url(../../../res/images/sign.png?18274) right bottom no-repeat;
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
	background-color: #f2f2f2;
	color: #333;
}

.selectbtn {
	background-color: #2fa8dd;
	color: #fff;
}
.elic {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.showText {
	text-align: center;
	color: #ff8c01;
	margin-top: 10px;
}
</style>

