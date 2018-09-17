
<template>
<!--
	@百川-曾伟福 
	@file:商品管理
-->
<div>

	<section id="details_con" v-cloak>
		<!-- 分类选择 -->
		<div class="select-down" @click.stop style="margin-right: 20px;">
			<section class="staList">
				<section class="tableList" v-on:click="showOneArea">
					<section class="oSpan">{{oneArea.name}}</section>
					<div class="fl">
						<i></i>
					</div>
				</section>
				<div v-show = "oneArea.show" class="detDiv">
					<i class="detI"></i>
					<div class="detCategory">
						<template v-for="(item,index) in category">
							<section :key="index" v-on:click="selectOneArea(item,index)" class="showName" :class="{'showname-select':item.id==oneArea.id}">{{item.name}}</section>
						</template>
					</div>
				</div>
			</section>
		</div>
		<div class="select-down" style="margin-right: 20px;" @click.stop>
			<section class="staList">
				<section v-on:click="showTwoArea" class="tableList">
					<section class="oSpan">{{twoArea.name}}</section>
					<div class="fl">
						<i></i>
					</div>
				</section>
				<div v-show = "twoArea.show" class="detDiv">
					<i class="detI"></i>
					<div class="detChild">
						<template v-for = "(item,index) in child">
							<section :key="index" v-on:click ="selectTwoArea(item,index)" class="showName" :class="{'showname-select':item.id==twoArea.id}">{{item.name}}</section>
						</template>
					</div>
				</div>
			</section>
		</div>

		<!-- 搜索 -->
		<section class="search fl">
			<input type="text" placeholder="请输入名称/简码" class="search-input" @keyup ="funSearchkeyUp(null)" v-model="search" />
			<a href="javascript:void(0);"  class="search-btn" @click ="funSearchkeyUp(null)" style="background-color:#29A7E1;"></a>
		</section>
		<section   style="clear:both;overflow:auto;padding-top:15px;">
			<section class="place fl">
				<section class="class-Parent">
					<template v-for="(item,index) in goodsNav">
						<span :key="index" :class="{ 'on':item.id == selectNavId }" v-on:click="filterGoodsByNav(item.id,index)" style="margin-left:8px;">{{item.name}}</span>
					</template>
				</section>
			</section>
		</section>	
			
		
		<!--	加载动画	-->
		<div class="animate-div" v-if="!load">
			<div class="img-div">
				<img src="../../res/images/preloader.gif"/>
				<div style="font-size:20px;color:#999;">
					商品加载中,请稍后...
				</div>
			</div>
		</div>
		<!--	商品展示  -->
		<div class="commodity-box">
			<div class="media-div" ref="addGoods">
				<section  class="add_goods_list list-div" :style="{'height':listHeight+'px'}" v-on:click="openAddWin({})" v-show="load">
					<section class="combox">
						<img src="../../res/images/comadd.png" alt="添加" />
						<h3>添加商品</h3>
					</section>
				</section>
			</div>
			<div class="media-div"  v-for="(item,index) in nowGoods" :key="index">
				<section class="list-div" :style="{'height':listHeight+'px'}" v-on:click="openAddWin(item)">
					<img v-if="!!item.imageName" class="imageClass" :src="(item.imageName.indexOf('http')>-1)?item.imageName: imgHost+item.imageName" :onerror="testImg" :alt="item.goodsName" />
					<img v-else src="../../res/images/busis.png"  class="imageClass"  :alt="item.goodsName" />
					<section class="shopTag" v-if="item.type!=2">
						<span v-if="item.isVip==0">未开启会员</span>
						<span v-if="item.isVip==2">会员折扣</span>
						<span v-if="item.isVip==1 && item.isGroup!=1">会员价格:{{item.vipPrice}}</span>
						<span v-if="item.isVip==1 && item.isGroup==1">
							会员价格:
							<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">{{group.vipPrice}}<i v-if="item.groupStock.length-1!=groupIndex">/</i></i>
						</span>
						<span v-if="item.status==2">下架商品</span>
					</section>
					
					<section class="shopTag" style="width: 70px;left: 10px;" v-if="ischain == 1 || ischain == 2">
						<span v-if="item.id<100000" class="brandStyle" >品牌</span>
						<span v-else class="brandStyle" style="background-color:rgb(108, 194, 230)">门店</span>
					</section>
					
					<section class="comprice">
						<h2 class="commodityName">{{item.goodsName}}</h2>
						<section v-if="item.type==0 || item.type==1" class="fl" style="height: 55px;line-height: 25px;width: 100%;">
							<section>
								<section v-if="item.isGroup==1 && item.isStock == 1"  style="width: 100%;text-align: left;" class="fl"><span class="fl" style="width: 42px;">库存：</span>
									<span class="fl stockStyle">
										<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">
											{{group.goodsNum}}
											<i v-if="item.groupStock.length-1!=groupIndex">/</i>
										</i>
									</span>
								</section>
								<section  v-else style="width: 100%;text-align: left;" class="fl"><span class="fl" style="width: 42px;">库存：</span>
									<span  class="fl stockStyle">
										{{item.goodsNum ? item.goodsNum :'未开启库存'}}
									</span>
								</section>
							</section>

							<section >
								<section v-if="item.isGroup==1 || (item.isGroup==1 && item.isSeasonal==1)"  class="fr price-align"  style="float:left;"><span class="fl">原价：</span>
									<span class="fl stockStyle">
										<i v-for="(group,groupIndex) in item.groupStock" :key="groupIndex">
											{{group.price}}
											<i v-if="item.groupStock.length-1!=groupIndex">/</i>
										</i>
									</span>
								</section>
								<section v-else  class="fr" style="float:left;"><span class="fl" style="width: 50px;">原价：</span><span  class="fl stockStyle">{{item.price}}</span></section>
							</section>
							<section style="display: none;">{{item.BC}}</section>
						</section>
					</section>
				</section>
			</div>
		</div>

	</section>

	<div style="clear:both;"></div>
	<div class="page-container" v-show="goodsList.length>0">
		<div class="page-content">
			<pageElement
				@pageNum="funGetPageNum"
				:page="currentPage"
				:total="totalNum"
				:num = 'num'
				:isNoPaging = 'true'
			></pageElement>
		</div> 
	</div> 
	<transition name="fade">
		<component 
			:is="showCom" 
			:pObj="comObj"
			@throwAddGoodsWin="closeAddGoodsWin"
		>
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

*/	
	import global from "src/manager/global";
	import storage  from "src/verdor/storage";
	import http from "src/manager/http";
	export default{
		data(){
			return{
				goodsNav: [
					{"id": -1,"name": "全部"},
					{"id": 0,"name": "已开启库存商品"},
					{"id": 1,"name": "未开启库存商品"},
					{"id": 2,"name": "多规格商品"},
					{"id": 3,"name": "下架商品"}
				],	// 商品分类导航
				selectNavId: -1, 	//所点中的商品导航编号
				cdn:global.cdnUrl,
				testImg:'this.src="' + require('../../res/images/busis.png') + '"',//加载图片失败默认显示的图片

                oneArea:{
                    name:'请选择一级分类',
                    id:-1,				//一级分类id
                    show:false,
                },
                twoArea:{
                    name:'请选择二级分类',
					index:-2,			//二级分类id
                    show:false,
				},
				
				load:false,			//是否在请求数据
				category:[],		//所有一级分类
				child: [], 			//所有二级分类
				
				allGoods:[],		//所有的商品
				goodsList: [], 		// 去除子菜后的商品
				pageGoods:[],		// 用于分页的商品
				tempGoods:[],		//分类筛选后的商品
				nowGoods:[],		//当前展示的商品



				brandList:null,		//品牌列表
				
				isBrand:null,		//是否是品牌
				ischain:null,
				brandId:null,
				shopId:null,		//店铺id
                imgHost: null,

				pageBtnNum:10,		// 分页组件总的按钮数
				num: 14, 			// 每页展示的数量
				currentPage: 1, 	//当前展示的页数
				totalNum:null,		//总页数

				search: '', 		// 搜索的内容

				comObj:{},			//用于传递数据的对象		
				showCom:"",			//需要展示的组件
				requestNum:1000, //一次请求数量
				requestPage:1, //请求的第几页
				requestTotal:1, //请求的总页数

				listHeight:200,
			}
		},
		methods:{
			//----------分类筛选---------
			showOneArea(e){
				e.stopPropagation();
				this.oneArea.show = !this.oneArea.show;
				this.twoArea.show = false;
			},			
			selectOneArea(item,index){
				this.twoArea={
					id:-2,
					name:"请选择二级分类",
					show:false
				}
				this.oneArea={
					id:item.id,
					name:item.name,
					show:false
				}

				this.child = item.child;
				this.child || (this.child=[]);

				this.tempGoods=this.pageGoods=this.filterGoodsByCategoryByPid(this.goodsList,this.oneArea.id);
				if(typeof index=='number'){
					this.selectNavId=-1;
					this.currentPage=1;
				} 

				if(this.search.trim().length!=0){
					this.searchGoods=this.funSearchGoods(this.tempGoods);
					this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods);
				}else{
					this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods);				
				}
				this.initPage(this.pageGoods);
	        },
			showTwoArea(e){
				e.stopPropagation();
				if(this.oneArea.id == -1){
					this.$store.commit("setWin",{title:'温馨提示',content:'请先选择一级分类!'})
					return false
				}
				if(this.child.length == 0){
					this.$store.commit("setWin",{title:'温馨提示',content:'该分类下没有二级分类!'});
					return false
				}
				this.twoArea.show = !this.twoArea.show;
				this.oneArea.show = false;
			},
			selectTwoArea(item,index){
				this.twoArea={
					id:item.id,
					name:item.name,
					show:false,
				}
				this.selectNavId=-1;

				this.tempGoods=this.pageGoods=this.filterGoodsByCategoryByPid(this.goodsList,this.twoArea.id);

				if(this.search.trim().length!=0){
					this.searchGoods=this.funSearchGoods(this.tempGoods);
					this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods);
				}else{
					this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods);
				}
				if(typeof index=='number'){
					this.selectNavId=-1;
					this.currentPage=1;
				}
				this.initPage(this.pageGoods);
			},
			//根据所提供的商品和分类,将商品分类
			filterGoodsByCategoryByPid(goods,id){
				if(id==-1) return goods;
				let arr=[];
				goods.forEach((ele)=>{
					ele.cids || (ele.cids=[]);
					ele.cids.some((e)=>{
						if(e==id){
							arr.push(ele);
							return true;
						} 
					})
				});
				return arr;
			},

			//根据商品导航筛选商品 
			filterGoodsByNav(id,index){
				this.selectNavId=id;
				this.search=this.search.trim();
				if(this.search.length==0){
					this.pageGoods=this.changeNav(this.selectNavId,this.tempGoods)
				}else{
					this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods);
				}
				this.currentPage=1;
				this.initPage(this.pageGoods);
			},
			//返回类型商品
			changeNav(id,goodsList){
				let tempGoods=[];
				if(id!=3){
					goodsList=goodsList.filter((ele)=>{
						return ele.status!=2;
					});
					switch(id+""){
						case "-1":
							tempGoods=goodsList;
							break;
						case "0":
							tempGoods=goodsList.filter((ele)=>{return ele.isStock==1});
							break;
						case "1":
							tempGoods=goodsList.filter((ele)=>{return ele.isStock==0;});
							break;		
						case "2":
							tempGoods=goodsList.filter((ele)=>{return ele.isGroup==1;});
							break;		
					}
				}else if(id==3){
					tempGoods=goodsList.filter((ele)=>{
						return ele.status==2;
					});
				}
				return tempGoods;	
			},
			//商品搜索
			funSearchkeyUp(){
				// this.comObj={
				// 	title:'hhhhh',                                  //String    标题
				// 	goodsRadio:false,                               //Boolean   商品是单选还是多选 默认单选(false)
				// 	fieldName:'goodsName',                          //string    列表元素的字段名  默认是name
				// 	selGoods:[],                                       //Array     选中的商品id[id]
				// 	num: 7, 			// 每页展示的数量
				// 	currentPage: 1, 	//当前展示的页数
				// 	totalNum:100,		//总页数
				// 	showPageNum:6,      //显示的按钮数
				// 	onlyCategoryId:true,	
				// };
				// this.showCom="listPage";

				this.searchGoods=this.pageGoods=this.funSearchGoods(this.tempGoods);
				this.pageGoods=this.changeNav(this.selectNavId,this.searchGoods);
				this.currentPage=1;
				this.initPage(this.pageGoods);
			},
			//返回搜索的结果
			funSearchGoods(goodsList){
				let tempGoods=[];
				if(!this.search || this.search.trim().length==0){
					return goodsList;
				}
				this.search=this.search.trim();
				tempGoods=goodsList.filter((ele)=>{
					let BC=""+ele.BC;
					BC=BC.toLowerCase();
					let name=ele.goodsName.toLowerCase();
					let search=this.search.toLowerCase();
					if(BC && BC.indexOf(search)>-1) return true;
					if(name && name.indexOf(search)>-1) return true;
				});			
				return tempGoods;
			},

			//-----------分页---------
			initPage(arr){
				if(!arr instanceof Array) throw new Error("arr非数组");
				this.totalNum=Math.ceil(arr.length/this.num);
				let startIndex=(this.currentPage-1)*this.num;
				let endIndex=(this.currentPage)*this.num;
				this.nowGoods=arr.slice(startIndex,endIndex);
			},
			//获取分页跳转的页码
			async funGetPageNum(p){
				this.currentPage=p.page;
				this.num = p.num;
				this.initPage(this.pageGoods);
				if(this.currentPage>this.totalNum-2){//如果分页组件上的页数翻到一定值，
					if(this.requestPage<this.requestTotal){ //且后台请求的页数小于后台总页数，进行下一页的接口请求
						this.requestPage ++;
						var goods = await this.getGoods()
						this.pageGoods = this.pageGoods.concat(goods);
						this.initPage(this.pageGoods);
						storage.session("goodList",this.pageGoods);
					}
				}
			},
			//-------------win----------
			//获取添加商品弹窗的结果
			closeAddGoodsWin(res){
				if(res!='releaserelation'){
					//解除关联的时候不关闭弹框
					this.showCom = "";
				}
				if(res!='close'){
					this.getGoodsList(true).then((goods)=>{
						this.allGoods=goods;
						this.goodsList=this.initGoodsStock(goods);
						this.goodsList=this.deleteChildGoods(this.goodsList);
						this.goodsList=this.funSortGood(this.goodsList);
						this.twoArea.id==-2 ? this.selectOneArea(this.oneArea) : this.selectTwoArea(this.twoArea);
					});
				}
			},
			//添加商品
			openAddWin(item){
				this.comObj={
					editGoodsId:item.id,
					status:item.status,
					ischain:this.ischain,
					shopId:this.shopId,
					category:this.category,
					imgHost:this.imgHost,
					goodsList:this.allGoods,
					brandId:this.brandId,
					title:item.id ? '修改商品' : '添加商品',
				};
				this.showCom="openAddGoodsWin";	
			},
			//-----------util------
			//初始化商品,主要是为了显示库存数量,和原价
			initGoodsStock(goodsList){
				let temp=[];
				temp=goodsList.map((ele)=>{
					ele.groupStock=[];
					goodsList.forEach((e)=>{
						if(ele.id==e.groupId && ele.id!=e.id){
							let obj={
								goodsNum:e.goodsNum,
								price:e.price,
								vipPrice:e.vipPrice
							}
							ele.groupStock.push(obj);
						}
					});
					return ele;
				});
				return temp;
			},
			//去除子菜
			deleteChildGoods(goods){
				let temp=[];
				temp=goods.filter((ele)=>{
					if(!Number(ele.groupId)){
						return true;
					}
				});
				return temp;
			},
			//排序商品
			funSortGood(good){
				let temp=[];
				temp=good.sort((x,y)=>{
					if(x.sort==y.sort){
						return x.id-y.id
					}else{
						return x.sort-y.sort;
					}
				});
				return temp;
			},
			//初始化按钮
			initSyncBtn(){
				let obj={
					leadIn:()=>{
						this.importGoods().then((res)=>{
							if(!res){
								this.$store.commit("setWin",{title:'温馨提示',content:'导入商品成功!'});
								this.showCom="";
							}else{
								this.showCom='errorGoods';
								this.comObj={
									errorInfo:res
								};
							}
							this.getGoodsList(true).then((goods)=>{
								this.allGoods=goods;
								this.goodsList=this.initGoodsStock(goods);
								this.goodsList=this.deleteChildGoods(this.goodsList);
								this.goodsList=this.funSortGood(this.goodsList);
								this.twoArea.id==-2 ? this.selectOneArea(this.oneArea) : this.selectTwoArea(this.twoArea);
							})
						})
					},
					leadOut:()=>{
						//导出
						this.exportGoodsList();
					},					
				}
				if(this.ischain==1 || this.ischain==2){
					obj.sync=()=>{
						this.showCom="asyncWin";
					}
				}
				this.$store.commit("setPageTools",obj);
			},		
			//初始化数据
			initData(){
				let userData = storage.session("userShop");
				this.imgHost=userData.uploadUrl;
				this.shopId=userData.currentShop.id;
				this.brandId=userData.currentShop.brandId;
				this.ischain=userData.currentShop.ischain;
				this.isBrand = (userData.currentShop.ischain =='1' || userData.currentShop.ischain =='2') ? false: true;
			},	
			//获取分类
			async getCate(){
				let category=await http.getCategoryList({data:{shopId:this.shopId}});
				storage.session("areaList",category);
				return category;
			},
			async getCategoryList(flag,ver){
				let category=null;
				if(flag){
					category=await this.getCate();
				}else{
					let httpGoodVersion=storage.session("httpGoodVersion");
					if(!httpGoodVersion){
						category=await this.getCate();
					}else{
						if(httpGoodVersion.otherConfigVer==ver){
							category=storage.session("areaList");
							if(!category) category=await this.getCate();
						}else{
							category=await this.getCate();
						}
					}
				}
				return category;
			},
			//获取商品
			async getGoods(){
				let goods=[];
				let temp=await http.getGoodsList({
					data:{
						shopId:this.shopId,
						page:this.requestPage,
						num:this.requestNum,
						specification:1
					}
				});
				this.requestTotal = temp.total;
				goods=temp.list;
				storage.session("goodList",goods);
				return goods;
			},
			async getGoodsList(flag,goodVer){
				let goods=null;
				if(flag){
					goods=await this.getGoods();
				}else{					
					let httpGoodVersion=storage.session("httpGoodVersion");
					if(!httpGoodVersion){
						goods=await this.getGoods();
					}else{
						if(httpGoodVersion.goodsConfigVer==goodVer){
							goods=storage.session("goodList");
							if(!goods) goods=await this.getGoods();        
						}else{
							goods=await this.getGoods();
						}
					}
				}
				return goods;
			},
			//导入商品
			async importGoods(){
				let info=await http.importGoods({
					data:{
						shopId:this.shopId
					},
					timeout:60000,
					formId:"form_import_good"
				});
				return info;
			} ,
			//导出商品
			exportGoodsList(){
				http.exportGoodsList();
			},
			//获取版本号
			async ShopGetExtra(){
				let res =await http.ShopGetExtra({
					data:{
					}
				});
				return res;
			},
			//dom点击隐藏事件
			domClick(){
				if(this.twoArea.show || this.oneArea.show){this.showCom=''};
				this.twoArea.show=this.oneArea.show=false;
			},
			//同步请求
			async syncRequest(){
				let res=await this.ShopGetExtra();
				let cate=await this.getCategoryList(false,res.otherConfigVer);
				if(cate[0] && cate[0].id!=-1){
					cate.unshift({id:-1,name:'全部一级分类'});
				}
				this.category=cate;

				let goods=await this.getGoodsList(false,res.goodsConfigVer);
				this.load=true;
				this.allGoods=goods;
				this.goodsList=this.initGoodsStock(goods);
				this.goodsList=this.deleteChildGoods(this.goodsList);
				
				this.goodsList=this.funSortGood(this.goodsList);
				this.selectOneArea(this.oneArea);
				storage.session('httpGoodVersion',res);	
			},
			windowResize(){
				let width = this.$refs.addGoods.offsetWidth-10;
				this.listHeight = width*2/3;
			}
		},
		mounted(){
			this.initData();
			this.initSyncBtn();
			this.syncRequest();
			document.addEventListener('click',this.domClick,false);
			this.windowResize();
			window.addEventListener('resize',this.windowResize,false)
		},
		components:{
			openAddGoodsWin:()=>import (/*webpackChunkName:"add_goods_win"*/'./goods_manager_coms/add_goods_win'),
			errorGoods:()=>import (/*webpackChunkName:"import_goods_error_win"*/'./goods_manager_coms/import_goods_error_win'),
//			asyncWin:()=>import (/*webpackChunkName:"async_goods_win"*/'./goods_manager_coms/async_goods_win'),
			asyncWin:()=>import (/*webpackChunkName:"async_goods_choice"*/'./goods_manager_coms/async_goods_choice'),
			pageElement:()=>import (/*webpackChunkName:"page_element"*/'src/components/page_element'),
			// listPage:()=>import (/*webpackChunkName:"list_page"*/'src/components/list_page'),
		},
		beforeDestroy(){
			document.removeEventListener('click',this.domClick);
			window.removeEventListener('resize',this.windowResize)
		}
	}
</script>

<style lang="less" scoped>

#details_con{
	padding-bottom:15px;
    .whb(@width,@height,@border:none){
        height:@height;
        width:@width;
        border:@border;
    }
    .lfc(@line,@font,@color){
        line-height: @line;
        font-size:@font;
        color:@color;
	};	

	//动画
	.animate-div{
		text-align:center;
		.img-div{
			padding:100px 0;
			.whb(auto,auto);
			display:inline-block; 
			clear:both;
		}
	}
	//分类
	.select-down{
		 width:210px;
		 float: left;
		
		.staList{
			position: relative;
			line-height: 41px;
			width: 210px;
			cursor: pointer;
			float: left;

	 		.tableList{
				height:40px;
				color: #666666;
				border: #b3b3b3 solid 1px;
				cursor: pointer;
				div{
					.whb(40px,40px);
					position: relative;
					z-index: 5;
					i{
						.whb(10px,10px);
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
				.oSpan{
					height: 39px;
					line-height: 39px;
					width: 165px;
					float: left;
					text-align: center;
					border-right: 1px solid #b3b3b3;
					overflow: hidden;
				}
				 
			}
			
		}		

		.detDiv{
			.whb(450px,250px);
			position: absolute;
			top:45px;
			left: 0;
			padding:10px;
			box-shadow: 3px 2px 10px #ccc;
			z-index: 15;
			background-color:#45404b ;

			.detI{
				.whb(0,0);
				line-height: 0;
				position:absolute;
				top:-10px;
				left: 80px;
				border-width: 10px;
				border-top:0px;
				border-style: solid;
				border-color: #fff #fff #45404b #fff;
			}
			.detCategory{
				.whb(100%,100%);
				overflow-y: auto;
				z-index: 16;
			}
			.detChild{
				width:100%;
				height: 100%;
				overflow-y: auto;
				z-index: 16;
			}

		}

		.showName{
			height: 40px;
			line-height: 40px;
			border: 1px solid #f2f2f2;
			float: left;
			margin:5px;
			color: #fff;
			padding:0 10px;
		}
		.showname-select{
			border-color: #FF9800;
			background: url(../../res/images/sign.png) right bottom no-repeat;
		}
		
		
	}
	.commodity-box{
		&:after{
			content:'';
			display: block;
			line-height: 0;
			visibility: hidden;
		}
		.shopTag {
			position: absolute;
			top: 0;
			right: 0;
			margin-right: 10px;
			.brandStyle{
				background-color: #fcaa30;
				color: #fff;
				border: none;
				border-radius: 35px;
			}
			span{
				display: block;
				.whb(auto,35px,1px solid #fff);
				line-height: 35px;
				text-align: center;
				margin-top: 10px;
				background: rgba(127,127,127,0.6);
				border-radius: 5px;
				color: #fff;
				padding: 0 3px;
			}
		}
		&:after{
			content:'';
			display:block;
			clear:both;
			line-height:0;
			visibility:hidden;
		}
		//添加商品
		.media-div{
			float:left;
			max-width:310px;
			width:20%;
			padding-right:10px;
			padding-bottom:20px;
			@media screen  and (max-width:1400px){
				width:25%;
			}
			@media screen  and (max-width:1200px){
				width:33.33%;
			}
			@media screen  and (max-width:1024px){
				width:50%;
			}
		}
		.add_goods_list{
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
		.list-div{
			//由内容撑起的宽高
			position: relative;
			cursor: pointer;
			.imageClass{
				width:100%;
				height:100%;
			}
			.comprice {
				font-size: 14px;
				position: absolute;
				bottom: 0;
				left: 0;
				.whb(100%,80px);
				padding: 10px;
				color: #fff;
				background: rgba(0, 0, 0, .5);
				.commodityName {
					line-height: 20px;
					overflow: hidden;
					text-align: left;
					.whb(100%,20px);
					.stockStyle{
						width: 200px;
						margin-right:3px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.price-align{
						width: 100%;
						text-align: left;
					}
				}
			}			
		}
	}
	.page-container{
		width:95%;
		overflow:hidden;
		margin-bottom: 30px;
		.page-content{
			.whb(auto,45px);
			float:left;
			padding-bottom:30px;
			overflow:auto;
		}
	}
}
</style>





