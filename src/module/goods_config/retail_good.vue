/**
 * @Author: 孔伟研 
 * @Date: 2018-09-04 14:04:23 
 * @Last Modified by: 孔伟研
 * @Module:商品管理-----零售
**/

<template>
	<div>
		<section id="details_con" v-if="!isAddEditGood" v-cloak>
			<section style="width:100%;height:50px;">
				<div v-if="ischain == 1|| ischain == 2" style="float:left;margin-right:10px;">
					<el-select v-model="typeName" @change="selectType" placeholder="请选择指派类型" style="width:150px;">
						<el-option v-for="item in goodSec" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 分类选择 -->
				<elCategory @selectCategory="newselectOneArea" :categoryArr="category" :itemIndex="oneIndex" :itemArea="oneArea"></elCategory>
				<elCategory @selectCategory="newselectTwoArea" :categoryArr="child" :itemIndex="twoIndex" :itemArea="twoArea"></elCategory>
				<!-- 搜索 -->
				<el-input placeholder="请输入名称" v-model="search" style="width:200px;">
					<el-button slot="append" icon="el-icon-search" @click="searchNewGood(true)"></el-button>
				</el-input>
			</section>

			<section style="clear:both;overflow:hidden;margin-bottom:10px;">
				<el-radio-group v-model="selectNavId" @change="filterGoodsByNav">
					<el-radio-button v-for="item in goodsNav" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
				</el-radio-group>
				<div class="boxTop" style="display:inline-block">
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan">
						<i class="aI" style=""></i>品牌指派
					</span>
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan" style="color:#2ea7e0;">
						<i class="aI" style="background:#2ea7e0;"></i>门店自建
					</span>
				</div>
			</section>
			<!--	加载动画	-->
			<div class="animate-div" v-if="!load">
				<div class="img-div">
					<img src="../../res/images/preloader.gif" />
					<div style="font-size:20px;color:#999;">
						商品加载中,请稍后...
					</div>
				</div>
			</div>
			<div v-if="load" class="commodity-box">
				<el-table ref="multipleTable" @selection-change="handleSelectionChange"  stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="nowGoods" border style="width: 100%">
					<el-table-column type="selection" reserve-selection  width="55"> </el-table-column>
					<el-table-column fixed min-width="160" show-overflow-tooltip align="center" prop="goodsName" label="名称">
						<template slot-scope="scope">
							<span v-if="ischain=='1'||ischain=='2'" @click="openAddWin(scope.row)" :style="{color:scope.row.id<10000?'#fe9200':'#2ea7e0',cursor:'pointer'}">{{scope.row.name}}</span>
							<span v-if="ischain=='0'||ischain=='3'" @click="openAddWin(scope.row)" style="color:#2ea7e0;cursor:pointer">{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="80" sortable show-overflow-tooltip align="center" prop="sort" label="排序">
						<template slot-scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="shopName" label="店铺名称"></el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="brandName" label="品牌名称"></el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="categoryName" label="分类"></el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="unit" label="单位"></el-table-column>
					<el-table-column min-width="80" show-overflow-tooltip align="center" prop="isDiscount" label="参与优惠">
						<template slot-scope="scope">
							<span :class="scope.row.isDiscount=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width="80" show-overflow-tooltip align="center" prop="vipPrice" label="会员优惠">
						<template slot-scope="scope">
							<span v-if="scope.row.isVip=='0'" class="el-icon-close"></span>
							<span v-if="scope.row.isVip=='1'">{{scope.row.vipPrice}}</span>
							<span v-if="scope.row.isVip=='2'">会员折扣</span>
						</template>
					</el-table-column>
					<el-table-column fixed="right" width="150" align="center" prop="totalDay" label="操作">
						<template slot-scope="scope">
							<span style="color: #FE8D2C;cursor:pointer" @click="openAddWin(scope.row)">编辑</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span v-if="scope.row.status=='1'" style="color:rgb(108, 194, 230);cursor:pointer" @click="updownWin(scope.row)">上架</span>
							<span v-else style="color: #FD3F1F;cursor:pointer" @click="updownWin(scope.row)">下架</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="margin-top:20px;">
				<el-pagination background @size-change="sizeChange" @current-change="pageClick" :current-page="currentPage" :page-count="Number(totalNum)" :page-size="Number(num)" layout="sizes, prev, pager, next" :page-sizes="[10,30, 50, 100]"></el-pagination>
			</div>
		</section>

		<section name="fade">
			<component :is="showCom" :pObj="comObj" :goIncom="'goods'" @throwAddGoodsWin="closeAddGoodsWin">
			</component>
		</section>
	</div>
</template>
<script type="text/javascript">
/*
	1)品牌的判断
	2)同步商品之后是否需要重新刷新商品池
	3)子菜不显示
	4)自定义商品不显示下架标识
	5)已下架商品不显示在“未开启库存”标签中
	6)商品的groupId字段不一定存在
	请求:
		ShopGetExtra://获取版本号
		InventoryGetlist://获取库存数量
*/

// import global from 'src/manager/global';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
// import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isAddEditGood: false,
			goodsNav: [
				{ id: 0, name: '上架商品' },
				{ id: 1, name: '下架商品' }
			], // 商品分类导航
			selectNavId: 0, //所点中的商品导航编号

			oneArea: {
				name: '请选择一级分类',
				id: -1, //一级分类id
				show: false
			},
			oneIndex: -1, //一级分类下标
			twoArea: {
				name: '请选择二级分类',
				index: -2, //二级分类id
				show: false
			},
			twoIndex: -1, //二级分类下标
			load: false, //是否在请求数据
			category: [], //所有一级分类
			child: [], //所有二级分类
			categoryId: '', //所选分类的id
			// goodsList: [], // 去除子菜后的商品
			// tempGoods: [], //分类筛选后的商品
			nowGoods: [], //当前展示的商品

			brandList: [], //品牌列表
			suppierList: [], //供应商列表
			specList:[],//零售规格列表

			ischain: null,
			brandId: null,
			shopId: null, //店铺id
			imgHost: null,

			pageBtnNum: 10, // 分页组件总的按钮数
			num: 10, // 每页展示的数量
			currentPage: 1, //当前展示的页数
			totalNum: 1, //总页数
			numList: [], //库存列表

			search: '', // 搜索的内容

			comObj: {}, //用于传递数据的对象
			showCom: '', //需要展示的组件
			listHeight: 200,
			industry: 0, //店铺的行业分类
			goodSec: [
				{ name: '全部', id: '0' },
				{ name: '品牌同步', id: '1' },
				{ name: '门店自建', id: '2' }
			],
			goodType: 0, //商品类型下标
			typeName: '请选择商品类型',
			selectTab: 1, //默认表格模式
			showArea: false, //显示一级分类
			showTArea: false, //显示二级分类
			selectList:[],//选中的商品
		};
	},
	created() {
		this.getCate(); //获取分类、品牌、店铺、商品列表
	},
	mounted() {
		this.initData();
		this.initSyncBtn();
	},
	components: {
		openAddGoodsWin: () =>
			import(/*webpackChunkName:'add_retail_goods_win'*/ './goods_manager_coms/add_retail_goods_win'),
		errorGoods: () =>
			import(/*webpackChunkName:'import_goods_error_win'*/ './goods_manager_coms/import_goods_error_win'),
		asyncWin: () =>
			import(/*webpackChunkName:'async_goods_choice'*/ './goods_manager_coms/async_goods_choice'),
		elCategory: () =>
			import(/*webpackChunkName:'el_category'*/ 'src/components/el_category')
	},
	methods: {
		handleSelectionChange(val){
			for(let i=0;i<val.length;i++){
				val[i].selected = true;
			}
			this.selectList = val;
			console.log(val);
		},
		selectGoods(item){
			console.log(item);
		},
		toggleSelection(rows){
			console.log(rows);
			if (rows) {
				rows.forEach(row => {
					if(row.selected){
						this.$refs.multipleTable.toggleRowExpansion(row,row.selected);
					}
				});
			} 
			else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		//上下架
		updownWin(item) {
			let atr = item.status == '0' ? '下架' : '上架';
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定' + atr + '“ ' + item.name + ' ”?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.goodUpOrDownShelf(item, atr);
					}
				}
			});
		},
		async goodUpOrDownShelf(item, atr) {
			let res = await http.retailGoodUpOrDownShelf({
				data: {
					id: item.id,
					status: item.status == '0' ? '1' : '0'
				}
			});
			if (res) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: atr + '成功'
				});
				this.getGoods();
			}
		},
		//品牌同步-门店自建筛选
		selectType(goodType) {
			this.goodType = goodType;
			this.typeName = this.goodSec[goodType].name;
			this.getGoods();
			// this.filterGoodsByNav(this.selectNavId);
		},
		//零售搜索
		async searchNewGood() {
			this.currentPage = 1;
			this.getGoods();
		},
		//----------分类筛选---------
		newselectOneArea(index) {
			this.oneIndex = index;
			this.twoIndex = -1;
			this.showArea = false;
			let item = this.category[index];
			this.oneArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.selectOneArea(item, index);
		},
		newselectTwoArea(index) {
			this.twoIndex = index;
			let item = this.child[index];
			this.showTArea = false;
			this.selectTwoArea(item, index);
		},
		selectOneArea(item, index) {
			this.categoryId = item.id;
			this.currentPage = 1;
			this.oneIndex = index;
			this.twoArea = {
				id: -2,
				name: '请选择二级分类',
				show: false
			};
			this.oneArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.child = item.child;
			this.child || (this.child = []);
			this.getGoods();
		},
		selectTwoArea(item, index) {
			this.categoryId = item.id;
			this.currentPage = 1;
			this.twoIndex = index;
			this.twoArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.getGoods();
			// this.selectNavId = -1;
		},
		//根据商品导航筛选商品
		filterGoodsByNav(id) {
			this.selectNavId = id;
			this.currentPage = 1;
			this.num = 10;
			this.getGoods();
		},
		//分页--每页显示
		sizeChange(e) {
			this.num = e;
			this.currentPage = 1;
			this.getGoods();
		},
		//分页点击
		pageClick(p) {
			this.currentPage = p;
			this.getGoods();
		},
		//-------------win----------
		//获取添加商品弹窗的结果
		closeAddGoodsWin(res) {
			this.initSyncBtn();
			this.isAddEditGood = false;
			console.log(res);
			if (res != 'back') {
				//解除关联的时候不关闭弹框
				this.getGoods();
			}
			this.showCom = '';
		},
		//添加商品
		openAddWin(item) {
			this.comObj = {
				editGoodsId: item.id,
				status: item.status,
				ischain: this.ischain,
				shopId: this.shopId,
				category: this.category,
				imgHost: this.imgHost,
				brandId: this.brandId,
				brandList: this.brandList,
				suppierList: this.suppierList, //供应商列表
				specList:this.specList,//零售规格列表
				title: item.id ? '修改商品' : '添加商品'
			};
			this.showCom = 'openAddGoodsWin';
			this.isAddEditGood = true;
		},
		//初始化按钮
		initSyncBtn() {
			let obj = {};
			//同步商品
			if (this.ischain == 1 || this.ischain == 2) {
				obj.sync = () => {
					this.showCom = 'asyncWin';
				};
			}
			//添加商品，如果是表格模式，显示添加按钮
			obj.addGood = () => {
				this.openAddWin({});
			};
			//导入
			obj.leadIn = () => {
				this.importGoods().then(res => {
					if (!res) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							content: '导入商品成功!'
						});
						this.showCom = '';
					} else {
						this.showCom = 'errorGoods';
						this.comObj = {
							errorInfo: res
						};
					}
				});
			};
			//导出
			obj.leadOut = () => {
				this.exportGoodsList();
			};
			this.$store.commit('setPageTools', obj);
		},
		//初始化数据
		initData() {
			let userData = storage.session('userShop');
			this.imgHost = userData.uploadUrl;
			this.shopId = userData.currentShop.id;
			for (let key of ['industry', 'brandId', 'ischain']) {
				this[key] = userData.currentShop[key];
			}
		},
		//获取分类
		async getCate() {
			let category = await http.getRetailCategoryList({ data: {} }); //获取分类列表
			this.brandList = await http.brandList({ data: {} }); //获取品牌列表
			this.suppierList = await http.suppierList({ data: {} }); //获取供应商列表
			let list = await http.specGetList({ data: {} }); //获取零售规格列表
			for (let i = 0; i < list.length; i++) {
				list[i].value = list[i].name;
			}
			this.specList = list;
			this.category = category;
			if (category[0] && category[0].id != -1) {
				category.unshift({ id: -1, name: '全部一级分类' });
			}
			this.category = category;
			storage.session('areaList', category);
			this.getGoods();
		},
		//获取商品和品牌
		async getGoods() {
			let goods = [];
			let temp = await http.getRetailGoodsList({
				data: {
					name: this.search,
					status: this.selectNavId,
					categoryId: this.categoryId,
					page: this.currentPage,
					num: this.num
				}
			});
			this.totalNum = Math.ceil(temp.paginator.totalNum / this.num);
			this.currentPage = temp.paginator.page;
			goods = temp.item;
			// let arr = utils.deepCopy(this.selectList);
			// let arr = this.selectList;
			for (let i = 0; i < goods.length; i++) {
				// this.$set(goods[i], 'brandName', '');
				goods[i].brandName = this.getName(this.brandList,goods[i].brandId);
				goods[i].categoryName = this.getName(this.category,goods[i].categoryId);
				// goods[i].price = +goods[i].price;
				// goods[i].cost = +goods[i].cost;
				// goods[i].sort = +goods[i].sort;
				// for(let j=0;j<arr.length;j++){
				// 	if(goods[i].id = arr[j].id){
				// 		goods[i].selected = true;
				// 		break;
				// 	}else{
				// 		goods[i].selected = false;
				// 	}
				// }
			}
			if (temp) {
				this.load = true;
			}
			this.nowGoods = goods;
		},
		getName(list,id) {
			// console.log(this.brandList);
			let name = '';
			for (let i = 0; i < list.length; i++) {
				if (id == list[i].id) {
					name = list[i].name;
					return name;
				}
				if(list[i].child){
					for(let j=0;j<list[i].child.length;j++){
						name = list[i].child[j].name;
					}
				}
				
			}
			return name;
		},
		//导入商品
		async importGoods() {
			let info = await http.importGoods({
				data: { shopId: this.shopId },
				timeout: 60000,
				formId: 'form_import_good'
			});
			return info;
		},
		//导出商品
		exportGoodsList() {
			http.exportGoodsList();
		}
	}
};
</script>

<style lang="less" scoped>
#details_con {
	.labItem {
		margin-bottom: 5px;
		margin-left: 0 !important;
		margin-right: 10px;
		float: left;
	}
	padding-bottom: 15px;
	.whb(@width,@height,@border:none) {
		height: @height;
		width: @width;
		border: @border;
	}
	.lfc(@line,@font,@color) {
		line-height: @line;
		font-size: @font;
		color: @color;
	}

	//动画
	.animate-div {
		text-align: center;
		.img-div {
			padding: 100px 0;
			.whb(auto,auto);
			display: inline-block;
			clear: both;
		}
	}
	.commodity-box {
		&:after {
			content: '';
			display: block;
			line-height: 0;
			visibility: hidden;
		}
		.shopTag {
			position: absolute;
			top: 0;
			right: 0;
			margin-right: 10px;
			.brandStyle {
				background-color: #fcaa30;
				color: #fff;
				border: none;
				border-radius: 35px;
			}
			span {
				display: block;
				.whb(auto,35px,1px solid #fff);
				line-height: 35px;
				text-align: center;
				margin-top: 10px;
				background: rgba(127, 127, 127, 0.6);
				border-radius: 5px;
				color: #fff;
				padding: 0 3px;
			}
		}
		&:after {
			content: '';
			display: block;
			clear: both;
			line-height: 0;
			visibility: hidden;
		}
		//添加商品
		.media-div {
			float: left;
			max-width: 310px;
			width: 20%;
			padding-right: 10px;
			padding-bottom: 20px;
			@media screen and (max-width: 1400px) {
				width: 25%;
			}
			@media screen and (max-width: 1200px) {
				width: 33.33%;
			}
			@media screen and (max-width: 1024px) {
				width: 50%;
			}
		}
		.add_goods_list {
			cursor: pointer;
			border: 1px solid #eee;
			.combox {
				font-size: 16px;
				position: relative;
				top: 50%;
				left: 50%;
				-webkit-transform: translate(-50%, -50%);
				-moz-transform: translate(-50%, -50%);
				-ms-transform: translate(-50%, -50%);
				-o-transform: translate(-50%, -50%);
				transform: translate(-50%, -50%);
				text-align: center;
				color: #999;
			}
		}
		.list-div {
			//由内容撑起的宽高
			position: relative;
			cursor: pointer;
			.imageClass {
				width: 100%;
				height: 100%;
			}
			.comprice {
				font-size: 14px;
				position: absolute;
				bottom: 0;
				left: 0;
				.whb(100%,80px);
				padding: 10px;
				color: #fff;
				background: rgba(0, 0, 0, 0.5);
				.commodityName {
					line-height: 20px;
					overflow: hidden;
					text-align: left;
					.whb(100%,20px);
					.stockStyle {
						width: 200px;
						margin-right: 3px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.price-align {
						width: 100%;
						text-align: left;
					}
				}
			}
		}
	}
	.boxTop {
		// height:40px;line-height: 40px;
		padding: 0 5px;
		.aSpan {
			font-size: 16px;
			color: #fe9200;
			margin-right: 20px;
			.aI {
				background: #fe9200;
				display: inline-block;
				width: 16px;
				height: 16px;
				border-radius: 8px;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
	}
}
</style>
