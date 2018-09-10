/**
 * @Author: 曾伟福 
 * @Date: 2018-09-04 14:04:23 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-06 18:37:38
 * @Module:商品管理
**/

<template>
	<!--
	@百川-曾伟福 
	@file:商品管理
-->
	<div>
		<section id="details_con" v-cloak>
			<div style="margin:10px 0;">
				<el-radio-group v-model="selectTab" @change="typeChange">
					<el-radio-button label="1">
						<span><i class="el-icon-tickets"></i> 列表</span>
					</el-radio-button>
					<el-radio-button label="0">
						<span><i class="el-icon-picture"></i> 图片</span>
					</el-radio-button>
				</el-radio-group>
			</div>
			<section style="width:100%;height:50px;">
				<div v-if="ischain == 1|| ischain == 2" style="float:left;margin-right:10px;">
					<el-select v-model="typeName" @change="selectType" placeholder="请选择指派类型" style="width:150px;">
						<el-option
							v-for="item in goodSec" 
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 分类选择 -->
				<elCategory @selectCategory = "newselectOneArea" :categoryArr="category" :itemIndex="oneIndex" :itemArea = "oneArea"></elCategory>
				<elCategory @selectCategory = "newselectTwoArea" :categoryArr="child" :itemIndex="twoIndex" :itemArea = "twoArea"></elCategory>
				<!-- <el-popover
					placement="bottom"
					width="400"
					v-model="showArea"
					trigger="click">
					<section style="max-height:260px;overflow:auto;min-height:100px;">
						<el-radio-group v-model="oneIndex" size ="small" @change="newselectOneArea">
							<el-radio border v-for="(item,index) in category" :key="index" :label="index" style="margin-bottom: 5px;">{{item.name}}</el-radio>
						</el-radio-group>
					</section>
					<el-button slot="reference" plain style="width:200px;overflow: hidden;position: relative;text-overflow: ellipsis;white-space: nowrap;padding-right:30px;">
						<span>{{oneArea.name}}</span>
						<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
					</el-button>
				</el-popover> -->
				<!-- <div class="select-down" @click.stop style="margin-right: 20px;">
					<section class="staList">
						<section class="tableList" v-on:click="showOneArea">
							<section class="oSpan">{{oneArea.name}}</section>
							<div class="fl">
								<i></i>
							</div>
						</section>
						<div v-show="oneArea.show" class="detDiv">
							<i class="detI"></i>
							<div class="detCategory">
								<template v-for="(item,index) in category">
									<section :key="index" v-on:click="selectOneArea(item,index)" class="showName" :class="{'showname-select':item.id==oneArea.id}">{{item.name}}</section>
								</template>
							</div>
						</div>
					</section>
				</div> -->
				<!-- <el-popover
					placement="bottom"
					width="400"
					@show = "showTwoArea"
					v-model="showTArea"
					trigger="click">
					<section style="max-height:260px;overflow:auto;min-height:100px;">
						<el-radio-group v-model="twoIndex" size ="small" @change="newselectTwoArea">
							<el-radio border v-for="(item,index) in child" :key="index" :label="index" style="margin-bottom: 5px;">{{item.name}}</el-radio>
						</el-radio-group>
					</section>
					<el-button slot="reference" plain style="width:200px;overflow: hidden;position: relative;text-overflow: ellipsis;white-space: nowrap;padding-right:30px;">
						<span>{{twoArea.name}}</span>
						<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
					</el-button>
				</el-popover> -->
				<!-- <div class="select-down" style="margin-right: 20px;" @click.stop>
					<section class="staList">
						<section v-on:click="showTwoArea" class="tableList">
							<section class="oSpan">{{twoArea.name}}</section>
							<div class="fl">
								<i></i>
							</div>
						</section>
						<div v-show="twoArea.show" class="detDiv">
							<i class="detI"></i>
							<div class="detChild">
								<template v-for="(item,index) in child">
									<section :key="index" v-on:click="selectTwoArea(item,index)" class="showName" :class="{'showname-select':item.id==twoArea.id}">{{item.name}}</section>
								</template>
							</div>
						</div>
					</section>
				</div> -->
				<!-- 搜索 -->
				<el-input v-if="industry == 1" placeholder="请输入名称" v-model="search" style="width:200px;">
					<el-button slot="append" icon="el-icon-search" @click="searchNewGood(true)"></el-button>
				</el-input>
				<el-input v-if="industry != 1" placeholder="请输入名称/简码" clearable v-model="search" @change="funSearchkeyUp(null)" style="width:210px;">
					<el-button slot="append" icon="el-icon-search" @click="funSearchkeyUp(null)"></el-button>
				</el-input>
			</section>

			<section style="clear:both;overflow:hidden;margin-bottom:10px;">
				<el-radio-group v-model="selectNavId" @change = "filterGoodsByNav">
					<el-radio-button v-for="item in goodsNav" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
				</el-radio-group>
				<div v-if="selectTab==1" class="boxTop" style="display:inline-block">
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan">
						<i class="aI" style=""></i>品牌指派
					</span>
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan" style="color:#2ea7e0;">
						<i class="aI" style="background:#2ea7e0;"></i>门店自建
					</span>
				</div>
				<!-- <section class="place fl">
					<section class="class-Parent">
						<template v-for="(item,index) in goodsNav">
							<span :key="index" :class="{ 'on':item.id == selectNavId }" v-on:click="filterGoodsByNav(item.id)" style="margin-left:8px;">{{item.name}}</span>
						</template>
						
					</section>
				</section> -->
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
			<!--	商品展示  -->
			<div v-if="selectTab==0" class="commodity-box">
				<div class="media-div" ref="addGoods">
					<section class="add_goods_list list-div" :style="{'height':listHeight+'px'}" v-on:click="openAddWin({})" v-show="load">
						<section class="combox">
							<img src="../../res/images/comadd.png" alt="添加" />
							<h3>添加商品</h3>
						</section>
					</section>
				</div>
				<div class="media-div" v-for="(item,index) in nowGoods" :key="index">
					<section class="list-div" :style="{'height':listHeight+'px'}" v-on:click="openAddWin(item)">
						<img v-if="!!item.imageName" class="imageClass" :src="(item.imageName.indexOf('http')>-1)?item.imageName: imgHost+item.imageName" :alt="item.goodsName" />
						<img v-else src="../../res/images/busis.png" class="imageClass" :alt="item.goodsName" />
						<section class="shopTag" v-if="item.type!=2">
							<span v-if="item.isVip==0">未开启会员</span>
							<span v-if="item.isVip==2">会员折扣</span>
							<span v-if="item.isVip==1 && item.isGroup!=1">会员价格:{{item.vipPrice}}</span>
							<span v-if="item.isVip==1 && item.isGroup==1">
								会员价格:
								<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">{{group.vipPrice}}
									<i v-if="item.groupStock.length-1!=groupIndex">/</i>
								</i>
							</span>
							<span v-if="item.status==2">下架商品</span>
						</section>

						<section class="shopTag" style="width: 70px;left: 10px;" v-if="ischain == 1 || ischain == 2">
							<span v-if="item.id<100000" class="brandStyle">品牌</span>
							<span v-else class="brandStyle" style="background-color:rgb(108, 194, 230)">门店</span>
						</section>

						<section class="comprice">
							<h2 class="commodityName">{{item.goodsName}}</h2>
							<section v-if="item.type==0 || item.type==1" class="fl" style="height: 55px;line-height: 25px;width: 100%;">
								<section>
									<section v-if="item.isGroup==1 && item.isStock == 1" style="width: 100%;text-align: left;" class="fl">
										<span class="fl" style="width: 42px;">库存：</span>
										<span class="fl stockStyle">
											<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">
												{{group.goodsNum}}
												<i v-if="item.groupStock.length-1!=groupIndex">/</i>
											</i>
										</span>
									</section>
									<section v-else style="width: 100%;text-align: left;" class="fl">
										<span class="fl" style="width: 42px;">库存：</span>
										<span class="fl stockStyle">
											{{item.goodsNum ? item.goodsNum :'未开启库存'}}
										</span>
									</section>
								</section>

								<section>
									<section v-if="item.isGroup==1 || (item.isGroup==1 && item.isSeasonal==1)" class="fr price-align" style="float:left;">
										<span class="fl">原价：</span>
										<span class="fl stockStyle">
											<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">
												{{group.price}}
												<i v-if="item.groupStock.length-1!=groupIndex">/</i>
											</i>
										</span>
									</section>
									<section v-else class="fr" style="float:left;">
										<span class="fl" style="width: 50px;">原价：</span>
										<span class="fl stockStyle">{{item.price}}</span>
									</section>
								</section>
								<section style="display: none;">{{item.BC}}</section>
							</section>
						</section>
					</section>
				</div>
			</div>
			<div v-if="selectTab==1 && load" class="commodity-box">
				<el-table
					stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
					:data="nowGoods"
					border
					style="width: 100%">
					<el-table-column fixed min-width = "160" show-overflow-tooltip align="center" prop="goodsName" label="名称">
						<template slot-scope="scope">
							<span v-if="ischain=='1'||ischain=='2'" @click="openAddWin(scope.row)" :style="{color:scope.row.id<10000?'#fe9200':'#2ea7e0',cursor:'pointer'}">{{scope.row.goodsName}}</span>
							<span v-if="ischain=='0'||ischain=='3'" @click="openAddWin(scope.row)" style="color:#2ea7e0;cursor:pointer">{{scope.row.goodsName}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" sortable show-overflow-tooltip align="center" prop="sort" label="排序"></el-table-column>
					<el-table-column min-width = "100" sortable sort-by="price" show-overflow-tooltip align="center" prop="price" label="价格" >
						<!-- <template slot-scope="scope">
							<span>{{parseFloat(scope.row.price).toFixed(2)}}</span>
						</template> -->
					</el-table-column>
					<el-table-column min-width = "100" sortable show-overflow-tooltip align="center" prop="cost" label="成本" >
						<!-- <template slot-scope="scope">
							<span>{{parseFloat(scope.row.cost).toFixed(2)}}</span>
						</template> -->
					</el-table-column>
					<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="unit" label="单位"></el-table-column>
					<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="type" label="类型">
						<template slot-scope="scope">
							<span v-if="scope.row.type=='0'">普通商品</span>
							<span v-if="scope.row.type=='1'">称重商品</span>
							<span v-if="scope.row.type=='2'">自定义商品</span>
						</template>
					</el-table-column>
					<!-- <el-table-column min-width = "80" show-overflow-tooltip align="center" prop="cids" label="分类"></el-table-column> -->
					<!-- <el-table-column min-width = "100" show-overflow-tooltip align="center" prop="attrs" label="口味">
						<template slot-scope="scope">
							<span v-for="item in scope.row.attr" :key="item.attrId">{{item.name+','}}</span>
						</template>
					</el-table-column> -->
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isDiscount" label="参与优惠">
						<template slot-scope="scope">
							<span :class="scope.row.isDiscount=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="serviceCharge" label="服务费">
						<template slot-scope="scope">
							<span :class="scope.row.serviceCharge=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isRecommend" label="推荐菜">
						<template slot-scope="scope">
							<span :class="scope.row.isRecommend=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isInvoicing" label="进销存">
						<template slot-scope="scope">
							<span :class="scope.row.isInvoicing=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isSelf" label="自取">
						<template slot-scope="scope">
							<span :class="scope.row.isSelf=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isStock" label="开启库存">
						<template slot-scope="scope">
							<span :class="scope.row.isStock=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="cids" label="时价菜">
						<template slot-scope="scope">
							<span :class="scope.row.cids=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="isVip" label="参与会员">
						<template slot-scope="scope">
							<span :class="scope.row.isVip=='0'?'el-icon-close':'el-icon-check'"></span>
						</template>
					</el-table-column>
					<el-table-column min-width = "80" show-overflow-tooltip align="center" prop="vipPrice" label="会员优惠">
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
							<span v-if="scope.row.status=='2'" style="color:rgb(108, 194, 230);cursor:pointer" @click="updownWin(scope.row)">上架</span>
							<span v-else style="color: #FD3F1F;cursor:pointer" @click="updownWin(scope.row)">下架</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</section>

		<div v-show="goodsList.length>0">
			<el-pagination v-if="selectTab=='1'" background @size-change="sizeChange" @current-change="pageClick" :current-page="Number(currentPage)" :page-count="Number(totalNum)" :page-size = "Number(num)" layout="sizes, prev, pager, next" :page-sizes="[10,30, 50, 100]"></el-pagination>
			<el-pagination v-if="selectTab=='0'" background @current-change="pageClick" :current-page="Number(currentPage)" :page-count="Number(totalNum)" :page-size = "Number(num)" layout="prev, pager, next"></el-pagination>
			<!-- <pageElement @pageNum="funGetPageNum" :page="currentPage" :total="totalNum" :num='num' :isNoPaging='true'></pageElement> -->
		</div>

		<transition name="fade">
			<component :is="showCom" :pObj="comObj" :goIncom = "'goods'" @throwAddGoodsWin="closeAddGoodsWin">
			</component>
		</transition>
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

import global from 'src/manager/global';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			goodsNav: [
				{ id: -1, name: '全部' },
				{ id: 0, name: '已开启库存商品' },
				{ id: 1, name: '未开启库存商品' },
				{ id: 2, name: '多规格商品' },
				{ id: 3, name: '下架商品' }
			], // 商品分类导航
			selectNavId: -1, //所点中的商品导航编号
			cdn: global.cdnUrl,

			oneArea: {
				name: '请选择一级分类',
				id: -1, //一级分类id
				show: false
			},
			oneIndex:-1,//一级分类下标
			twoArea: {
				name: '请选择二级分类',
				index: -2, //二级分类id
				show: false
			},
			twoIndex:-1,//二级分类下标
			load: false, //是否在请求数据
			category: [], //所有一级分类
			child: [], //所有二级分类

			allGoods: [], //所有的商品
			goodsList: [], // 去除子菜后的商品
			pageGoods: [], // 用于分页的商品
			tempGoods: [], //分类筛选后的商品
			nowGoods: [], //当前展示的商品

			brandList: null, //品牌列表

			ischain: null,
			brandId: null,
			shopId: null, //店铺id
			imgHost: null,

			pageBtnNum: 10, // 分页组件总的按钮数
			num: 14, // 每页展示的数量
			currentPage: 1, //当前展示的页数
			totalNum: null, //总页数
			numList: [], //库存列表

			search: '', // 搜索的内容

			comObj: {}, //用于传递数据的对象
			showCom: '', //需要展示的组件
			requestNum: 1000, //一次请求数量
			requestPage: 1, //请求的第几页
			requestTotal: 1, //请求的总页数

			listHeight: 200,
			industry: 0, //店铺的行业分类
			goodSec:[
				{name:'全部',id:'0'},
				{name:'品牌同步',id:'1'},
				{name:'门店自建',id:'2'}
			],
			goodType:0,//商品类型下标
			typeName:'请选择商品类型',
			selectTab:1,//默认表格模式
			showArea:false,//显示一级分类
			showTArea:false,//显示二级分类
		};
	},
	mounted() {
		this.initData();
		this.initSyncBtn();
		this.syncRequest();
		// document.addEventListener('click', this.domClick, false);
		// this.windowResize();
		// window.addEventListener('resize', this.windowResize, false);
	},
	components: {
		openAddGoodsWin: () =>
			import(/*webpackChunkName:'add_goods_win'*/ './goods_manager_coms/add_goods_win'),
		errorGoods: () =>
			import(/*webpackChunkName:'import_goods_error_win'*/ './goods_manager_coms/import_goods_error_win'),
		asyncWin: () =>
			import(/*webpackChunkName:'async_goods_choice'*/ './goods_manager_coms/async_goods_choice'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		elCategory: () =>
			import(/*webpackChunkName:'el_category'*/ 'src/components/el_category'),
		// selectBtn: () =>
		// 	import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'), // 下拉
	},
	methods: {
		//切换图片时计算宽度
		typeChange(res){
			if(res==0&&this.num!=14){
				this.sizeChange(14);
				this.windowResize();
			}
			this.initSyncBtn();
		},
		//上下架
		updownWin(item){
			let atr = item.status =='0'?'下架':'上架'
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定'+atr+'“ ' + item.goodsName + ' ”?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.goodUpOrDownShelf(item, atr);
					}
				}
			});
		},
		async goodUpOrDownShelf(item,atr){
			let res =await http.goodUpOrDownShelf({
				data:{
					goodsId:item.id,
					status:item.status =='0'?'2':'0'
				}
			});
			if(res){
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: atr+'成功'
				});
				this.closeAddGoodsWin('updown');
			}
		},
		//品牌同步-门店自建筛选
		selectType(goodType){
			this.goodType = goodType;
			this.typeName = this.goodSec[goodType].name;
			this.filterGoodsByNav(this.selectNavId);
		},
		//零售搜索
		async searchNewGood(type) {
			if (type) {
				this.currentPage = 1;
				this.pageGoods = this.goodsList;
				this.tempGoods = this.goodsList;
				this.initPage(this.pageGoods);
			}
			this.oneArea = {
				id: -1,
				name: '请选择一级分类',
				show: false
			};
			this.twoArea = {
				name: '请选择二级分类',
				index: -2, //二级分类id
				show: false
			};
			this.selectNavId = -1;
			if (this.search == '') return;
			let detial = await http.getListByCid({
				data: {
					goodsName: this.search
					// page:this.currentPage,
					// num:this.num
				}
			});
			this.pageGoods = detial.list;
			this.searchGoods = detial.list;
			for (let i = 0; i < this.pageGoods.length; i++) {
				if (
					this.pageGoods[i].groupId * 1 > 0 ||
					this.pageGoods[i].status == 2
				) {
					this.pageGoods.splice(i, 1);
					i--;
				}
			}
			this.initPage(this.pageGoods);
		},
		//----------分类筛选---------
		// showOneArea(e) {
		// 	e.stopPropagation();
		// 	this.oneArea.show = !this.oneArea.show;
		// 	this.twoArea.show = false;
		// },
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
			this.selectOneArea(item,index);
		},
		newselectTwoArea(index){
			this.twoIndex = index;
			let item = this.child[index];
			this.showTArea = false;
			this.selectTwoArea(item,index);
		},
		selectOneArea(item, index) {
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

			this.tempGoods = this.pageGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				this.oneArea.id
			);
			if (typeof index == 'number') {
				this.selectNavId = -1;
				this.currentPage = 1;
			}

			if (this.search.trim().length != 0) {
				this.searchGoods = this.funSearchGoods(this.tempGoods);
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.searchGoods
				);
			} else {
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.tempGoods
				);
			}
			this.initPage(this.pageGoods);
		},
		showTwoArea(e) {
			// e.stopPropagation();
			if (this.oneArea.id == -1) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '请先选择一级分类!'
				});
				this.showTArea = false;
				return false;
			}
			if (this.child.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '该分类下没有二级分类!'
				});
				this.showTArea = false;
				return false;
			}
			this.twoArea.show = !this.twoArea.show;
			this.oneArea.show = false;
		},
		selectTwoArea(item, index) {
			this.twoIndex = index;
			this.twoArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.selectNavId = -1;

			this.tempGoods = this.pageGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				this.twoArea.id
			);

			if (this.search.trim().length != 0) {
				this.searchGoods = this.funSearchGoods(this.tempGoods);
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.searchGoods
				);
			} else {
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.tempGoods
				);
			}
			if (typeof index == 'number') {
				this.selectNavId = -1;
				this.currentPage = 1;
			}
			this.initPage(this.pageGoods);
		},
		//根据所提供的商品和分类,将商品分类
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
		//根据商品导航筛选商品
		filterGoodsByNav(id) {
			this.selectNavId = id;
			this.search = this.search.trim();
			if (this.search.length == 0) {
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.tempGoods
				);
			} else {
				this.pageGoods = this.changeNav(
					this.selectNavId,
					this.searchGoods
				);
			}
			this.currentPage = 1;
			this.initPage(this.pageGoods);
		},
		//返回类型商品
		changeNav(id, goodsList) {
			let tempGoods = [];
			if (id != 3) {
				goodsList = goodsList.filter(ele => {
					return ele.status != 2;
				});
				switch (id + '') {
					case '-1':
						tempGoods = goodsList;
						break;
					case '0':
						tempGoods = goodsList.filter(ele => {
							return ele.isStock == 1;
						});
						break;
					case '1':
						tempGoods = goodsList.filter(ele => {
							return ele.isStock == 0;
						});
						break;
					case '2':
						tempGoods = goodsList.filter(ele => {
							return ele.isGroup == 1;
						});
						break;
				}
			} else if (id == 3) {
				tempGoods = goodsList.filter(ele => {
					return ele.status == 2;
				});
			}
			let goods = [];//全部
			let goodsOne = [];//品牌
			let goodsTwo = []; //门店自建
			let newGoods = utils.deepCopy(tempGoods);
			if(this.goodType == 0){
				goods = newGoods;
			}else{
				for(let i=0;i<newGoods.length;i++){
					let good = newGoods[i];
					if(good.id*1<100000){
						goodsOne.push(good);
					}else{
						goodsTwo.push(good);
					}
				}
				if(this.goodType ==1){
					goods = goodsOne;
				}else if(this.goodType ==2){
					goods = goodsTwo;
				}
			}
			tempGoods = goods;
			return tempGoods;
		},
		//商品搜索
		funSearchkeyUp() {
			this.searchGoods = this.pageGoods = this.funSearchGoods(
				this.tempGoods
			);
			this.pageGoods = this.changeNav(this.selectNavId, this.searchGoods);
			this.currentPage = 1;
			this.initPage(this.pageGoods);
		},
		//返回搜索的结果
		funSearchGoods(goodsList) {
			let tempGoods = [];
			if (!this.search || this.search.trim().length == 0) {
				return goodsList;
			}
			this.search = this.search.trim();
			tempGoods = goodsList.filter(ele => {
				let BC = '' + ele.BC;
				BC = BC.toLowerCase();
				let name = ele.goodsName.toLowerCase();
				let search = this.search.toLowerCase();
				if (BC && BC.indexOf(search) > -1) return true;
				if (name && name.indexOf(search) > -1) return true;
			});
			return tempGoods;
		},

		//-----------分页---------
		initPage(arr) {
			this.totalNum = Math.ceil(arr.length / this.num);
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			this.nowGoods = arr.slice(startIndex, endIndex);
		},
		//获取分页跳转的页码
		async funGetPageNum(p) {
			this.currentPage = p.page;
			this.num = p.num;
			this.initPage(this.pageGoods);

			if (this.currentPage > this.totalNum - 2) {
				//如果分页组件上的页数翻到一定值，
				if (this.requestPage < this.requestTotal && this.oneIndex<=0) {
					//且后台请求的页数小于后台总页数，进行下一页的接口请求
					this.requestPage++;
					let goods = await this.getGoods();
					
					this.pageGoods = this.pageGoods.concat(goods);
					this.initPage(this.pageGoods);
					storage.session('goodList', this.pageGoods);
				}
			}
		},
		sizeChange(e){
			this.num = e;
			this.currentPage = 1;
			this.initPage(this.pageGoods);
		},

		//分页点击
		async pageClick(p) {
			this.currentPage = p;
			this.initPage(this.pageGoods);

			if (this.currentPage > this.totalNum - 2) {
				//如果分页组件上的页数翻到一定值，
				if (this.requestPage < this.requestTotal && this.oneIndex<=0) {
					//且后台请求的页数小于后台总页数，进行下一页的接口请求
					this.requestPage++;
					let goods = await this.getGoods();
					
					this.pageGoods = this.pageGoods.concat(goods);
					this.initPage(this.pageGoods);
					storage.session('goodList', this.pageGoods);
				}
			}
		},
		//-------------win----------
		//获取添加商品弹窗的结果
		closeAddGoodsWin(res) {
			// console.log(res);
			if (res != 'releaserelation') {
				//解除关联的时候不关闭弹框
				this.showCom = '';
			}
			if (res != 'close' && res !== 'cancel') {
				this.requestPage = 1;
				this.getGoodsList(true).then(goods => {
					this.allGoods = goods;
					this.goodsList = this.initGoodsStock(goods, this.numList);
					this.goodsList = this.deleteChildGoods(this.goodsList);
					this.goodsList = this.funSortGood(this.goodsList);
					this.twoArea.id == -2
						? this.selectOneArea(this.oneArea,this.oneIndex)
						: this.selectTwoArea(this.twoArea,this.twoIndex);
				});
			}
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
				goodsList: this.allGoods,
				brandId: this.brandId,
				title: item.id ? '修改商品' : '添加商品'
			};
			this.showCom = 'openAddGoodsWin';
		},
		//-----------util------
		//初始化商品,主要是为了显示库存数量,和原价
		initGoodsStock(goodsList, list = []) {
			for (let ele of goodsList) {
				if (ele.isStock == 1) {
					for (let e of list) {
						if (ele.id == e.gid) {
							ele.goodsNum = e.goodsNum;
							break;
						}
					}
				}
			}
			for (let ele of goodsList) {
				ele.groupStock = [];
				// if(ele.isStock == 1){//必须进销存开启多规格价格、库存才显示 =======不适合价格
				for (let e of goodsList) {
					if (ele.id == e.groupId && ele.id != e.id) {
						let obj = {
							goodsNum: e.goodsNum,
							price: e.price,
							vipPrice: e.vipPrice
						};
						ele.groupStock.push(obj);
					}
					if (ele.groupStock.length >= 3) break;
				}
				// }
			}
			return goodsList;
		},
		//获取开启进销存的商品,并给商品添加relative字段,获取库存数量
		filterGoodsByStock(goods = [], numArr = []) {
			let temp = [];
			let arr = [];
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
		//去除子菜
		deleteChildGoods(goods) {
			let temp = [];
			temp = goods.filter(ele => {
				if (!Number(ele.groupId)) {
					return true;
				}
			});
			return temp;
		},
		//排序商品
		funSortGood(good) {
			let temp = [];
			temp = good.sort((x, y) => {
				if (x.sort == y.sort) {
					return x.id - y.id;
				} else {
					return x.sort - y.sort;
				}
			});
			return temp;
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
			if(this.selectTab==1){
				obj.addGood = ()=>{
					this.openAddWin({});
				}
			}
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
					this.getGoodsList(true).then(goods => {
						this.allGoods = goods;
						this.goodsList = this.initGoodsStock(
							goods,
							this.numList
						);
						this.goodsList = this.deleteChildGoods(
							this.goodsList
						);
						this.goodsList = this.funSortGood(this.goodsList);
						this.twoArea.id == -2
							? this.selectOneArea(this.oneArea,this.oneIndex)
							: this.selectTwoArea(this.twoArea,this.twoIndex);
					});
				});
			}
			//导出
			obj.leadOut= () => {
				this.exportGoodsList();
			},
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
			let category = await http.getCategoryList({
				data: { shopId: this.shopId }
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
			let goods = [];
			let temp = await http.getGoodsList({
				data: {
					shopId: this.shopId,
					page: this.requestPage,
					num: this.requestNum,
					specification: 1
				}
			});
			this.requestTotal = temp.total;
			goods = temp.list;
			for(let i=0;i<goods.length;i++){
				goods[i].price = +goods[i].price; 
				goods[i].cost = +goods[i].cost; 
				goods[i].sort = +goods[i].sort; 
			}
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
			let res = http.exportGoodsList();
		},
		async getHttp(url, data = {}) {
			let res = await http[url]({ data });
			return res;
		},
		//同步请求
		async syncRequest() {
			let res = await this.getHttp('ShopGetExtra'); //获取版本号
			let cate = await this.getCategoryList(false, res.otherConfigVer); //获取分类
			let goods = await this.getGoodsList(false, res.goodsConfigVer); //获取商品列表
			let { list } = await this.getHttp('InventoryGetlist'); //获取库存数量

			if (cate[0] && cate[0].id != -1) {
				cate.unshift({ id: -1, name: '全部一级分类' });
			}
			this.numList = list;
			this.category = cate;
			this.load = true;
			this.allGoods = goods;
			this.goodsList = this.initGoodsStock(goods, this.numList); //初始化库存数量,价格,会员价格
			this.goodsList = this.deleteChildGoods(this.goodsList); //删除子菜
			this.goodsList = this.funSortGood(this.goodsList); //排序商品

			this.selectOneArea(this.oneArea,this.oneIndex);
			storage.session('httpGoodVersion', res);
		},
		//监听浏览器窗口变化
		windowResize() {
			let width = this.$refs.addGoods.offsetWidth - 10;
			this.listHeight = width * 2 / 3;
		},
		//dom点击隐藏事件
		// domClick() {
		// 	if (this.twoArea.show || this.oneArea.show) {
		// 		this.showCom = '';
		// 	}
		// 	this.twoArea.show = this.oneArea.show = false;
		// }
	},
	beforeDestroy() {
		// document.removeEventListener('click', this.domClick);
		// window.removeEventListener('resize', this.windowResize);
	}
};
</script>

<style lang="less" scoped>
#details_con {
	
	.labItem {
		margin-bottom: 5px;
		margin-left: 0!important;
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
	//分类
	// .select-down {
	// 	width: 210px;
	// 	// float: left;
	// 	display: inline-block;
	// 	.staList {
	// 		position: relative;
	// 		line-height: 41px;
	// 		width: 210px;
	// 		cursor: pointer;
	// 		float: left;

	// 		.tableList {
	// 			height: 40px;
	// 			color: #666666;
	// 			border: #b3b3b3 solid 1px;
	// 			cursor: pointer;
	// 			div {
	// 				.whb(40px,40px);
	// 				position: relative;
	// 				z-index: 5;
	// 				i {
	// 					.whb(10px,10px);
	// 					position: absolute;
	// 					top: 50%;
	// 					left: 50%;
	// 					margin-top: -5px;
	// 					margin-left: -5px;
	// 					border-top: 10px solid #b3b3b3;
	// 					border-left: 5px solid transparent;
	// 					border-right: 5px solid transparent;
	// 					box-sizing: border-box;
	// 				}
	// 			}
	// 			.oSpan {
	// 				height: 39px;
	// 				line-height: 39px;
	// 				width: 165px;
	// 				float: left;
	// 				text-align: center;
	// 				border-right: 1px solid #b3b3b3;
	// 				overflow: hidden;
	// 			}
	// 		}
	// 	}

	// 	.detDiv {
	// 		.whb(450px,250px);
	// 		position: absolute;
	// 		top: 45px;
	// 		left: 0;
	// 		padding: 10px;
	// 		box-shadow: 3px 2px 10px #ccc;
	// 		z-index: 15;
	// 		background-color: #45404b;

	// 		.detI {
	// 			.whb(0,0);
	// 			line-height: 0;
	// 			position: absolute;
	// 			top: -10px;
	// 			left: 80px;
	// 			border-width: 10px;
	// 			border-top: 0px;
	// 			border-style: solid;
	// 			border-color: #fff #fff #45404b #fff;
	// 		}
	// 		.detCategory {
	// 			.whb(100%,100%);
	// 			overflow-y: auto;
	// 			z-index: 16;
	// 		}
	// 		.detChild {
	// 			width: 100%;
	// 			height: 100%;
	// 			overflow-y: auto;
	// 			z-index: 16;
	// 		}
	// 	}

	// 	.showName {
	// 		height: 40px;
	// 		line-height: 40px;
	// 		border: 1px solid #f2f2f2;
	// 		float: left;
	// 		margin: 5px;
	// 		color: #fff;
	// 		padding: 0 10px;
	// 	}
	// 	.showname-select {
	// 		border-color: #ff9800;
	// 		background: url(../../res/images/sign.png) right bottom no-repeat;
	// 	}
	// }
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
	.boxTop{
		// height:40px;line-height: 40px;
		padding:0 5px;
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
