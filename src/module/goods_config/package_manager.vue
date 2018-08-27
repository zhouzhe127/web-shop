<template>
<!--
	@百川-曾伟福
	@file-套餐管理
-->
<div id="package_container">
	<!-- 显示列表 -->
	<div id="package-list" v-cloak>
		<div style="margin:20px 0;">
			<el-radio-group v-model="packageType" @change = "changePackageType">
				<el-radio-button v-for="item in packageMenu" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
			</el-radio-group>
			<!-- <div class="place fl" style="height:auto;margin-top:25px;">
				<span v-for="(item,index) in packageMenu" :key="index" v-bind:class='{"on":packageType==item.id}'  v-on:click="changePackageType(item.id,index)">{{item.name}}</span>
			</div> -->
		</div>

		<div class="meal-container" >
			<div class="media-div" ref ='addGoods'>
				<div class="meal-item" :style="{'height':lineHeight+'px'}" v-on:click='openDetailWin(null,null)'>
					<div class="commodityAdd">
						<div class="combox">
							<img src="../../res/images/comadd.png" alt="添加商品">
							<div >添加套餐</div>
						</div>
					</div>
				</div>
			</div>
			<div class="media-div" v-for="(item,index) in nowPackages" :key="index">
				<div class="meal-item" :style="{'height':lineHeight+'px'}" v-on:click="openDetailWin(item,index)" :key="index">
					<img v-if="!!item.imageName" :src="imgHost+item.imageName" class="cname imgClass" />
					<img v-if="!item.imageName" src="../../res/food/test.jpg" class="imgClass" />

					<img v-if="item.type == 1" src="../../res/images/selet2.png" width="60" height="60" class="tag" title="可选套餐" alt="可选套餐" />
					<img v-else-if="item.type == 0" src="../../res/images/fix2.png" width="60" height="60" class="tag" title="固定套餐" alt="固定套餐" />
					<img v-else src="../../res/images/fix3.png" width="60" height="60" class="tag" title="自定义套餐" alt="自定义套餐" />
				
					<div class="shopTag">
						<span v-if="(ischain == 1 || ischain == 2) && item.id < 100000" style="background-color: #fcaa30;color: #fff;border: none;border-radius: 35px;width: 60px;height: 30px;line-height: 30px;margin-right: 5px;">品牌</span>
						<span v-if="(ischain == 1 || ischain == 2) && item.id >= 100000" style="background-color: #6cc2e6;color: #fff;border: none;border-radius: 35px;width: 60px;height: 30px;line-height: 30px;margin-right: 5px;">门店</span>
						<span v-if="item.status == 2">下架套餐</span>
					</div>

					<div v-if="item.status != 1" class="mes">
						<div class="meal-name">{{item.packageName}}</div>
						<div class="meal-data fl">
							<div class="vip fl">
								<span v-if="item.isVip == '0'">不参与会员</span>
								<span v-if="item.isVip == '1'">会员价格：{{item.vipPrice}}</span>
								<span v-if="item.isVip == '2'">会员折扣</span>
							</div>
							<div class="price fl">原价：{{item.price}}</div>
						</div>
					</div>
					
					<div v-if="item.status == 1" class="mes" style="width:100%; height:100%; text-align: center;">
						<h2 style="height: 120px;line-height:120px;width: 100%;font-size: 64px;">估清</h2>
						<p style="font-size: 16px;">{{item.packageName}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<transition name="fade">
		<component
			:is="showCom"
			:pObj="comObj"
			:goIncom = "'packs'"
			@throwAddEditWin="closeAddEditWin"
			@throwSyncWin="closeSyncWin"
		></component>
	</transition>
</div>
</template>
<script>
/*
	要求:
	1)//套餐选菜:未下架的普通菜，未下架的斤两菜，未下架的多规格子菜

	2)套餐最少有一个标识
	3)可选套餐选择商品时:设置的可选数量不能大于选中的商品总数量(本标识)
	4)固定套餐选中的总数量等于选中的每个商品数量设置的数量之和(本标识)
	5)同一个套餐中不能出现相同的标识名


	注意:
	1)套餐的totalNum字段,可选套餐的totalNum字段是自己设置的,而固定套餐的totalNum字段的值是每个标识所有商品份数的总额;

	字段说明:
	1)status:0上架,1:估清,2:下架
*/
import storage  from 'src/verdor/storage';
import http from 'src/manager/http';
export default{
	data(){
		return {
			packageMenu:[
				{id:-1,name:'全部分类'},
				{id:1,name:'可选套餐'},
				{id:0,name:'固定套餐'},
				{id:2,name:'自定义套餐'},
				{id:3,name:'下架套餐'},
			],
			packageType:-1,     //选中的套餐类型   

			ischain:null,       //是否是连锁
			isBrand:null,      //是否是品牌
			shopId:null,        //店铺id
			imgHost:'',        //图片地址的前缀

			showCom:'',
			comObj:{},      

			search:'',          //搜索框中的内容

			nowPackages:[],      //当前正在展示的套餐
			copyPackages:[],     

			packageList:[],      //存储所有的套餐列表
			goodsList:[],        //所有商品

			lineHeight:200,      //
		};
	},
	methods:{
		//--------------弹窗----------------
		//获取一级窗口点击的结果
		closeAddEditWin(flag){
			this.showCom='';
			if(flag=='update'){
				this.getpackagelist(true).then((res)=>{
					this.packageList=res;
					this.changePackageType(this.packageType);
					this.funSearchPackage();
				});
			}
		},
		//点击套餐列表进行编辑
		openDetailWin(item){
			let goods=this.goodsList;
			if(item){
				this.comObj={
					status:item.status,
					packageId:item.id,
					goodsList:goods,
					title:'编辑套餐',
					isAddPack:false
				};
			}else{
				this.comObj={
					status:null,
					packageId:null,
					goodsList:goods, 
					title:'添加套餐',
					isAddPack:true
				};                   
			}
			this.showCom='addEdit';
		},
		//关闭同步窗口
		closeSyncWin(res){
			this.showCom='';
			console.log(res);
			if(res=='ok'){
				this.getpackagelist(true).then((res)=>{
					console.log(res);
					this.packageList=res;
					this.changePackageType(this.packageType);
					this.funSearchPackage();                    
				});
			}
		},
		//----事件---------
		//套餐分类的切换
		changePackageType(flag){
			this.packageType=flag;
			// if(typeof index == 'number') this.search='';
			let temp =null;
			// console.log(flag);
			switch(''+flag){
				case '-1'://全部套餐
				case '0'://固定套餐
				case '1'://可选套餐
					temp = this.filterPackageListByType(flag,this.packageList);
					this.copyPackages=temp.filter((ele)=>{
						return ele.status!=2;
					});
					break;
				case '2'://自定义
					temp = this.filterPackageListByType(flag,this.packageList);
					this.copyPackages=temp.filter((ele)=>{
						return ele.status!=2;
					});
					break;
				case '3'://下架
					// console.log(flag);
					this.copyPackages = this.packageList.filter((ele)=>{
						return ele.status==2;
					});
				
			}
			this.nowPackages=this.copyPackages;
		},
		//搜索套餐
		funSearchPackage(){
			if(!this.search || this.search.trim().length==0){
				this.nowPackages=this.copyPackages;
				return ;
			}
			let search=this.search.trim();
			search=search.toLowerCase();
			this.nowPackages=this.copyPackages.filter((ele)=>{
				let bc=ele.BC.toLowerCase();
				let packageName=ele.packageName.toLowerCase();
				if(bc.indexOf(search)!=-1) return true;
				if(packageName.indexOf(search)!=-1) return true;
			});

		},

		//---------工具--------
		//根据套餐的类型筛选套餐
		filterPackageListByType(type,packageList){
			let temp=[];
			if(type==-1) return packageList;
			temp=packageList.filter((ele)=>{
				return ele.type==type;
			});
			return temp;
		},
		//初始化数据
		initData(){
			let  userData = storage.session('userShop');
			this.imgHost=userData.uploadUrl;
							
			this.shopId=userData.currentShop.id;
			this.ischain=userData.currentShop.ischain;                
			this.isBrand=(userData.currentShop.ischain ==1 || userData.currentShop.ischain ==2) ? true: false;
		},
		//初始化同步按钮
		initSyncBtn(){
			let arr = [
				{name: '',type:3,style:{},fn:(param)=>{
					this.search = param;
					this.funSearchPackage();
				}}                    
			];
			if(this.isBrand){
				arr.push({
					name:'同步',
					style:{backgroundColor:'#ff9800',color:'#fff',marginLeft:'15px'},
					fn:()=>{
						this.showCom='syncWin';
						this.comObj={
							goodsList:this.goodsList
						};                            
					}
				});
			}
			this.$store.commit('setPageTools',arr);
		},
		//获取套餐
		async getPack(){
			let packageList= await http.getpackagelist({data:{shopId:this.shopId,page:1,num:9999}});
			storage.session('packList',packageList);
			return packageList;
		},
		async getpackagelist(flag,ver){
			let packages=null;
			if(flag){
				packages=await this.getPack();
			}else{
				let httpGoodVersion=storage.session('httpGoodVersion');
				if(!httpGoodVersion){
					packages=await this.getPack();
				}else{
					if(httpGoodVersion.otherConfigVer==ver){
						packages=storage.session('packList');
						if(!packages) packages=await this.getPack();
					}else{
						packages=await this.getPack();
					}
				}
			}
			return packages;
		},
		//获取商品
		async getGoods(){
			let goods=null;
			let temp=await http.getGoodsList({
				data:{
					shopId:this.shopId,
					page:1,
					num:9999,
					specification:1
				}
			});
			goods=temp.list;
			storage.session('goodList',goods);
			return goods;
		},
		async getGoodsList(flag,goodVer){
			let goods=null;
			if(flag){
				goods=await this.getGoods();
			}else{
				let httpGoodVersion=storage.session('httpGoodVersion');
				if(!httpGoodVersion){
					goods=await this.getGoods();
				}else{
					if(httpGoodVersion.goodsConfigVer==goodVer){
						goods=storage.session('goodList');
						if(!goods) goods=await this.getGoods();        
					}else{
						goods=await this.getGoods();
					}
				}
			}
			return goods;
		},
		//获取版本号
		async ShopGetExtra(){
			let res =await http.ShopGetExtra({
				data:{}
			});
			return res;
		},
		async syncRequest(){
			let res=await this.ShopGetExtra();
			let packages=await this.getpackagelist(false,res.otherConfigVer);
			this.packageList=packages;
			this.changePackageType(-1);
			let goods=await this.getGoodsList(false,res.goodsConfigVer);
			this.goodsList=goods;
			storage.session('httpGoodVersion',res);				

		},
		windowResize(){
			let width = this.$refs.addGoods.offsetWidth-10;
			this.lineHeight = width*2/3;
		}
	},
	mounted(){
		this.initData();
		this.initSyncBtn();
		this.syncRequest();
		this.windowResize();
		window.addEventListener('resize',this.windowResize,false);
	},
	components:{
		addEdit:()=> import (/*webpackChunkName:'package_add_edit_win'*/'./package_com/package_add_edit_win'),
		// syncWin:()=> import (/*webpackChunkName:'package_sync_win'*/'./package_com/package_sync_win'),
		syncWin:()=> import (/*webpackChunkName:'async_goods_choice'*/'./goods_manager_coms/async_goods_choice'),
	},
	beforeDestroy(){
		window.removeEventListener('resize',this.windowResize);
	}
};
</script>
<style type="text/less" lang="less" scoped>
	/*列表的显示*/
	.meal-container {
		.whb(@width,@height,@border:none){
			width:@width;
			height:@height;
			border:@border;
		}
		&:after{
			content:'';
			clear: both;
			visibility: hidden;
			display: block;
			line-height: 0;
		}
		.media-div{
			width:20%;
			float:left;
			max-width: 310px;
			padding:0 10px 20px 0;;
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
		.shopTag {
			position: absolute;
			top: 0;
			right: 0;
			margin-right: 10px;
		}
		.shopTag span{
			display: inline-block;
			.whb(auto,35px,1px solid #fff);
			line-height: 35px;
			text-align: center;
			margin-top: 10px;
			background: rgba(127,127,127,0.6);
			border-radius: 5px;
			color: #fff;
			padding: 0 3px;
		}
		.meal-item {
			position: relative;
			max-height: 200px;
			height:200px;
			width:100%;
			overflow: hidden;
			float: left;
			border: #eee 1px solid;
			text-align: center;
			font-size: 14px;
			cursor:pointer;
			.emptyBg {
				width: 100%;
				height: 100%;
				background: url(../../res/images/upload.png) center 40px no-repeat #ddd; 
			}
			.imgClass{
				width: 100%;
				height: 100%;
			}
			.commodityAdd {
				border: none;
			}
			img.tag {
				position: absolute;
				top: 0;
				left: 0;
			}
			.mes {
				position: absolute;
				left: 0;
				right:0;
				bottom: 0;
				width: 100%;
				height: 82px;
				color: #fff;
				padding: 10px;
				background-color: rgba(27, 21, 21,.6);
				// background: url(../../res/images/a50.png) repeat; 
			}
			.meal-name {
				height: 40px;
				line-height: 20px;
				text-align: left;
			}
			.meal-data {
				height: 30px;
				line-height: 30px;
				width: 100%;
			}
			.vip {
				width: 50%;
				height: 30px;
				text-align: left;
			}
			.price {
				width: 50%;
				height: 30px;
				text-align: right;
			}
		}
	}
	
</style>