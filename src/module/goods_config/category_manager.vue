<template>
<!--
	@百川-曾伟福
-->
<div id="cate-gories">
	<section class="brand">
		<el-button @click="openOneCategoryWin" type="primary" style="width:150px;" icon="el-icon-plus">添加一级分类</el-button>
		<!-- <div v-on:click="openOneCategoryWin()" class="openOneCategoryWin">
			<img src="../../res/images/add.png" alt="添加" />
			<h3>添加一级分类</h3>
		</div> -->
		<template v-if="ischain == 1 || ischain == 2">
			<span style="background-color: #fcaa30;margin-left: 10px;"></span>
			<span style="margin-left: 5px;">品牌同步</span>
			<span style="background-color: #6cc2e6;margin-left: 10px;"></span>
			<span style="margin-left: 5px;">门店自建</span>
		</template>
	</section>
	<div class="cList" v-for = "(item,index) in category" :key="index">
		<div class="borderTop"></div>
		<div class="borderBottom"></div>
		<section class="title">
			<div class="oneTitle" style="word-wrap:break-word">
				<span  v-if="ischain == 1 || ischain == 2">
					<span class="oneName"  v-bind:title = "item.name" style="color: #fcaa30;" v-if="item.id < 100000">{{item.name | sliceStr}}</span>
					<span class="oneName"  v-bind:title = "item.name" style="color: #6cc2e6;;" v-else>{{item.name | sliceStr}}</span>
					<span v-if="item.code && item.id < 100000" style="color: #fcaa30;">({{item.code}})</span>
					<span v-if="item.code && item.id >= 100000" style="color: #6cc2e6;">({{item.code}})</span>
				</span>
				<span v-else>
					<span v-bind:title = "item.name">{{item.name | sliceStr}}</span>
					<br><span v-if="item.code">({{item.code}})</span>
				</span>
				<div class="openoperation operation" >
				   <img v-on:click="editclassification(index,item)" src="../../res/icon/iconchange.png"/>
				   <img v-on:click="deleteOneCategory(item.id)" style="margin-left:5px;" src="../../res/icon/icondelete.png"/>
			   </div>
				
			</div>
		</section>
		<ul class="oUl">
			<template v-for = "(itemChild,index) in item.child">
				<li class="oLi" :key="index"> 
					<div v-if="ischain == 1 || ischain == 2" style="margin-top:25px;">
						<span style="color: #fcaa30;" v-bind:title = "itemChild.name" v-if="itemChild.id < 100000">{{itemChild.name | sliceStr}}</span>
						<span style="color: #6cc2e6;;" v-bind:title = "itemChild.name"  v-else>{{itemChild.name | sliceStr}}</span>
						<br><span style="color: #fcaa30;" v-bind:title = "itemChild.code" v-if="itemChild.id < 100000 && itemChild.code">({{itemChild.code}})</span>
					</div>
					<div v-else  style="margin-top:25px;">
						<span v-bind:title = "itemChild.name" >{{itemChild.name | sliceStr}}</span>
						<br><span v-if="itemChild.code" v-bind:title = "itemChild.code" >({{itemChild.code}})</span>
					</div>
					<div class="openoperation" style="margin-top:3px;">
					   <img v-on:click = "editTwo(index,itemChild)" src="../../res/icon/change.png"/>
					   <img v-on:click = "delateTwo(itemChild)" style="margin-left:5px;" src="../../res/icon/delete.png"/>
				   </div>
				</li>
			</template>

			<li class="oLi" style="line-height: 30px;" >
				<div class="addinput" v-if="item.showAdd">
					<input v-model = "twoName" type="text" class="input second" maxlength="20"  placeholder="输入二级分类" v-cloak/>
					<div v-on:click = "addChild($event,item)" class="oDiv">
						<div class="img_mask" ></div>
						<img src="../../res/icon/iconright.png" alt="" />
					</div>
				</div>
				<img v-on:click = "addTwo(item,index)" class="addTwo" src="../../res/images/adds.png" alt="add" />
			</li>
		</ul>
	</div>
	<!--弹窗-->
	<component
		@throwWinResult="closeWinResult"
		@throwSynchronousWin="closeSynWin"
		:pObj="obj"
		:is="showCom"
	></component>
</div>
</template>

<script>
/*
	1)(加盟,直营店中)当编辑品牌分类时报"同步品牌分类参与统计不可删除提示"" ???
	2)添加分类返回的id为0
	3)一级分类默认的sort:1,二级分类默认的sort:255

*/
import http from 'src/manager/http';
import storage  from 'src/verdor/storage';
import global from 'src/manager/global';

export default{
	data(){
		return {
			shopId:null,            //店铺id 
			isBrand:null,           //是否是品牌 
			ischain:null,

			category:[],            //所有的分类
			twoName:'',             //二级分类的名字
			
			showCom:'',           //当前展示的组件
			obj:{},                 //传递给子组件的参数
			flag:{
				name:'',            //分类名
				pid:'',             //父类id 
				id:'',              //子类id
				marker:'',          //1:添加一级分类,2:修改一级分类,3:修改二级分类
			},                      //当前编辑的分类
		};
	},
	methods:{
		//获取版本号
		async ShopGetExtra(){
			let res =await http.ShopGetExtra({
				data:{}
			});
			return res;
		},
		//获取分类
		async getCate(){
			let category=await http.getCategoryList({data:{shopId:this.shopId}});
			storage.session('areaList',category);
			return category;
		},
		async getCategoryList(flag,ver){
			let category=null;
			if(flag){
				category=await this.getCate();
			}else{
				let httpGoodVersion=storage.session('httpGoodVersion');
				if(!httpGoodVersion){
					category=await this.getCate();
				}else{
					if(httpGoodVersion.otherConfigVer==ver){
						category=storage.session('areaList');
						if(!category) category=await this.getCate();
					}else{
						category=await this.getCate();
					}
				}
			}
			return category;
		},

		//添加一级分类
		openOneCategoryWin(){
			this.showCom='categoryWin';
			this.obj={
				title:'添加一级分类',
				categoryName:'',
				sort:1,
				code:'',
			};
			this.flag={
				pid:'',
				id:'',
				name:'',
				marker:1,
				sort:1,
				code:''
			};
		},   
		//编辑一级分类
		editclassification(index,item){
			console.log(item);
			this.showCom='categoryWin';
			this.obj={
				title:'修改一级分类',
				sort:item.sort,
				categoryName:item.name,
				code:item.code?item.code.toUpperCase():'',

			};
			this.flag={
				pid:item.pid,
				id:item.id,
				name:item.name,
				marker:2,
				sort:item.sort,
				code:item.code?item.code.toUpperCase():''
			};
		},
		//删除一级分类
		deleteOneCategory(id){
			let flag=this.category.some((ele)=>{
				if(ele.id==id){
					if(ele.child && ele.child.length>0){
						this.$store.commit('setWin',{title:'提示信息',content:'该分类下存在子分类'});
						return true;
					}
				}
			});
			if(flag) return;

			this.$store.commit('setWin',{
				title:'提示信息',
				winType:'confirm',
				content:'确认删除一级分类?',
				callback:(res)=>{
					if(res=='ok'){
						this.delCategory(id).then(()=>{
							this.flushList();                                 
						});
					}
				}
			});
		},


		//删除二级分类的点击操作
		delateTwo(item){
			let obj={
				pid:item.pid,
				id:item.id,
				code:item.code?item.code.toUpperCase():''
			};

			this.$store.commit('setWin',{
				title:'提示信息',
				content:'确定删除该二级分类？',
				winType:'confirm',
				callback:(res)=>{
					if(res=='ok'){
						this.delSecondCategory(obj).then(()=>{
							this.flushList();
						});
					}
				}    
			});
		},
		//编辑二级分类的点击
		editTwo(index,item){
			this.showCom='categoryWin';
			this.flag={
				pid:item.pid,
				id:item.id,
				name:item.name,
				marker:3,
				sort:item.sort,
				code:item.code?item.code.toUpperCase():''
			};
			this.obj={
				title:'修改二级分类',
				categoryName:item.name,
				sort:item.sort,
				code:item.code?item.code.toUpperCase():''
			};
		},
		//添加二级分类
		addChild(event,item){  
			this.twoName=this.twoName.trim();
			if(!global.checkData({
				twoName:{
					cond:`$$.length>0 && $$.length<=20 && (/^[^'’\\s“'&]*$/).test($$)`,
					pro:'请输入分类名！并且分类名中不能含有&和引号!'
				}
			},this)) return;
			let obj={
				name:this.twoName,
				sort:255,
				pid:item.id,
				code:item.code?item.code.toUpperCase():''                   
			};

			this.addSecondCategory(obj).then(()=>{
				this.flushList();
			});
			this.twoName='';
		},
		//添加二级分类  控制输入的显示与隐藏
		addTwo(item){
			this.category=this.category.map((ele)=>{
				if(ele.id==item.id){
					ele.showAdd=true;
				}else{
					ele.showAdd=false;
				}
				return ele;
			});
		},

		//----------win-----------
		//获取分类弹框的点击结果
		/* eslint-disable */
		closeWinResult(res,categoryName,sort,code){
			if(res!='ok'){
				this.showCom='';
				return;
			}
			console.log(code);
			let rrr = /^[0-9A-Za-z]{1,8}$/;
			if(code !=''&&!rrr.test(code)){
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '简码由英文,数字组成!',
					
				});
				return false;
			}
			let obj = {};
			switch(''+this.flag.marker){
				case '1':
					obj={
						name:categoryName,
						sort:sort,
						code:code.toUpperCase(),
					};
					this.addCategory(obj).then(()=>{
						this.flushList();
					});
					break;
				case '2':  
					if(categoryName!=this.flag.name || sort!=this.flag.sort|| code!=this.flag.code){
						obj={
							name:categoryName,
							sort:sort,
							code:code.toUpperCase(),
							id:this.flag.id
						};
						this.editCategory(obj).then(()=>{
							this.flushList();
						});
					}
					break;
				case '3':
					if(categoryName!=this.flag.name || sort!=this.flag.sort|| code!=this.flag.code){
						obj={
							name:categoryName,
							sort:sort,
							code:code.toUpperCase(),
							id:this.flag.id
						};
						this.editSecondCategory(obj).then(()=>{
							this.flushList();
						});
					}
					break;
			}
			this.showCom='';
		},
		//获取同步弹框点击的结果
		closeSynWin(res){
			this.showCom='';
			if(res=='change'){
				this.getCategoryList(true).then(()=>{
					this.flushList();
				});
			}
		},




		initSync(){
			if(this.isBrand){
				this.$store.commit('setPageTools',{
					sync:()=>{ this.showCom='synWin'},
				});
			}
		},
		initData(){
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.isBrand = (userData.currentShop.ischain =='1' || userData.currentShop.ischain =='2') ? true : false;//判断是否是品牌
			this.ischain = userData.currentShop.ischain;
		},
		//排序分类
		sortCategory(){
			this.category=this.category.sort(function(x,y){
				if(x.sort==y.sort){
					return x.id-y.id;
				}else{
					return x.sort-y.sort;
				}
			});
		},
		//检查分类重名 true:重名
		checkName(category,categoryName,cid){
			let cate=[];
			let flag=false;
			category.forEach((ele)=>{
				if(ele.id!=cid && ele.id!=-1){
					cate.push(ele.name);
				}
				ele.child.forEach((ch)=>{
					if(ch.id!=cid){
						cate.push(ch.name);
					}
				});
			});
			flag=cate.some((ele)=>{
				if(ele==categoryName){
					this.$store.commit('setWin',{title:'温馨提示',content:'分类重名!'});
					return true;
				} 
			});
			return flag;
		},
		//刷新列表
		flushList(){
			this.getCategoryList(true).then((cate)=>{
				this.category=cate;
				this.category=this.category.map((ele)=>{
					ele.showAdd=false;
					return ele;
				});             
				this.sortCategory();
			}); 
		},

		//编辑二级分类
		async editSecondCategory(obj){
			
			let res=await http.editCategory({
				data:{
					shopId:this.shopId,
					name:obj.name,
					sort:obj.sort,
					code:obj.code.toUpperCase(),
					cid:obj.id
				}
			});
			return res;
		},
		//添加二级分类
		async addSecondCategory(obj){
			let res=await http.addCategory({
				data:{
					shopId:this.shopId,
					name:obj.name,
					sort:obj.sort,
					code:'',
					pid:obj.pid
				}
			});
			return res;
		},
		//删除二级分类
		async delSecondCategory(obj){
			let res=await http.delCategory({data:{
				shopId: this.shopId,
				cid: obj.id
			}});
			return res;
		},

		//删除一级分类
		async delCategory(id){
			let res=await http.delCategory({
				data:{
					shopId:this.shopId,
					cid:id
				}
			});
			return res;
		},
		//添加一级分类
		async addCategory(obj){
			let res=await http.addCategory({data:{
				shopId:this.shopId,
				name:obj.name,
				code:obj.code.toUpperCase(),
				sort:obj.sort
			}});
			return res;
		},
		//编辑一级分类
		async editCategory(obj){
			let res=await http.editCategory({
				data:{
					shopId:this.shopId,
					name:obj.name,
					code:obj.code.toUpperCase(),
					sort:obj.sort,
					cid:obj.id 
				}
			});
			return res;
		},
		async syncRequest(){
			let res=await this.ShopGetExtra();
			let cate=await this.getCategoryList(false,res.otherConfigVer);
			this.category=cate;
			this.category=this.category.map((ele)=>{
				ele.showAdd=false;
				return ele;
			});             
			this.sortCategory();  
			storage.session('httpGoodVersion',res);				
		},
	},
	mounted(){
		this.initData();
		this.initSync();
		this.syncRequest();

	},
	filters:{
		sliceStr(val){
			if(!val) return '';
			val=val+'';
			if(val.length<11){
				return val;
			}else{
				return val.slice(0,10)+'...';
			}
		},
	},
	components:{
		categoryWin:()=>import (/*webpackChunkName:'category_manager_win'*/'./category_com/category_manager_win'),
		synWin:() => import (/*webpackChunkName:'category_synchronous_win'*/'./category_com/category_synchronous_win'),
	},
};
</script>
<style lang="less" scoped>
	#cate-gories{
		width:97%;
		padding-bottom:50px;
		.cList{
			width:100%;
			border:1px solid #cdcdcd;
			border-left: 120px solid #F8F8F8;
			position: relative;
			margin-top:20px;

			.title{
				width:120px;
				color:#323232;
				text-align:center;
				position: absolute;
				top: 50%;
				left: -120px;
				line-height: 100%;
				font-size: 18px;
				transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-webkit-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				padding: 5px 10px;
				z-index: 5;
			}
			.oneTitle{
				width:100%;
				height:60px;
				margin-top:40px;
				cursor: pointer;
				.opeartion{
					background: url(../../res/icon/icon-hover-bg.png) no-repeat;
					margin:5px 10px;
					padding-top:12px;
					width:80px;
					height:40px;
				}
			}
			.oUl{
				width:100%;
				min-height: 120px;
				padding:26px 20px;
				overflow: hidden;
				border-left: 1px solid #cdcdcd;
			}
			.oLi{
				height:65px;
				min-width:80px;
				// line-height: 65px;
				float: left;
				text-align: center;
				padding:0 10px;
				color:#555555;
				cursor: pointer;
				.addinput{
					width:165px;
					height:34px;
					float: left;
					border:1px solid #cdcdcd;
					margin-top:15px;
					display: block;
					.second{
						width: 125px;
						height:30px;
						line-height: 30px; 
						outline:none;
					}
				}
				.addTwo{
					width:20px;height:20px;margin-top:22px;margin-left: 20px;
				}
				.oDiv{
					width:34px;
					height:32px;
					border-left: 1px solid #cdcdcd;
					float: right;
				}
				.img_mask{
					position:absolute;
					width:34px;
					height:32px;
					background-color:#ff0000;
					opacity:0;
					filter:alpha(opacity=0);
				}
			}
		}
		.openoperation{display: none;}
		.title:hover .openoperation{
			display: block;
		}
		.oLi:hover .openoperation{
			display: block;
		}
		.openOneCategoryWin{
			width:210px;
			height:45px;
			background-color: #29A7E1;
			cursor: pointer;
			display: inline-block;vertical-align: middle;
			img{
				width:22px;
				height:22px;
				margin-top:9px;
				margin-left: 34px;
				float: left;}
			h3{
				width:120px;
				height: 45px;
				line-height:45px;
				color:#fff;
				text-align: center;
				float: left;
			}
		}
		.borderTop{
			width:122px;
			height:100%;
			border-left: 1px solid #cdcdcd;
			position: absolute;
			top:-1px;
			left:-120px;
			border-top:1px solid #cdcdcd;
		}
		.borderBottom{
			width:122px;
			height:100%;
			border-left: 1px solid #cdcdcd;
			position: absolute;
			bottom:-1px;
			left:-120px;
			border-bottom:1px solid #cdcdcd;
		}
		.cList .oneName{
			word-wrap:break-word;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
		}
		.brand span:nth-child(2),
		.brand span:nth-child(4){
			display: inline-block;
			width: 20px;
			height: 20px;
			text-align: center;
			border-radius: 20px;
			vertical-align: middle;
		}
	}
</style>