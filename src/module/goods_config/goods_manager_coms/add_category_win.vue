<template>
	<win :align="'center'" :height="650" :width="765" @winEvent="closeSelfWin" >
		<span slot="title">选择分类</span>
		
		<section class="classify" id="good-add-category" slot="content" style="height: auto;padding-bottom:20px;">
			<template>
				<!-- <div class="boxTop" style="display:inline-block">
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan">
						<i class="aI" style=""></i>品牌同步
					</span>
					<span v-if="ischain=='1'||ischain=='2'" class="aSpan" style="color:#2ea7e0;">
						<i class="aI" style="background:#2ea7e0;"></i>门店自建
					</span>
				</div> -->
				<div class="cList" v-for = "(item,index) in category" :key="index">
					<div class="borderTop"></div>
					<div class="borderBottom"></div>
					<section class="title">
						<div class="oneTitle " style="word-wrap:break-word">
							<span v-if="item.child.length==0" :class="{'sign':item.isSelect}" @click="funSelectCategory(item)" style="text-align: center;padding:10px 15px;cursor: pointer;background-color: #fff;;display: inline-block;word-wrap: break-word;overflow: hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.name}}
								<span v-if="item.code && item.id < 100000">({{item.code}})</span>
							</span>
							<span v-if="item.child.length>0" :class="{'sign':item.isSelect}" style="text-align: center;padding:10px 0;display: inline-block;word-wrap: break-word;overflow: hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.name}}
								<span v-if="item.code && item.id < 100000">({{item.code}})</span>
							</span>
							<!-- <el-radio v-model="categoryId" :label="item.id" text-color="#67c23a" fill="#67c23a" style="width:80px;">
								<span :title="item.name" style="width: 70px;text-align: left;display: inline-block;word-wrap: break-word;overflow: hidden;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.name | sliceStr}}</span><br>
								<span v-if="item.id < 100000 && item.code" style="padding-left:20px;width: 70px;text-align: left;display: inline-block;">({{item.code}})</span>
							</el-radio> -->
							<!-- <span  v-if="ischain == 1 || ischain == 2">
								<span class="oneName"  v-bind:title = "item.name" style="color: #fcaa30;" v-if="item.id < 100000">{{item.name | sliceStr}}</span>
								<span class="oneName"  v-bind:title = "item.name" style="color: #6cc2e6;;" v-else>{{item.name | sliceStr}}</span>
								<span v-if="item.code && item.id < 100000" style="color: #fcaa30;">({{item.code}})</span>
								<span v-if="item.code && item.id >= 100000" style="color: #6cc2e6;">({{item.code}})</span>
							</span>
							<span v-else>
								<span v-bind:title = "item.name">{{item.name | sliceStr}}</span>
								<br><span v-if="item.code">({{item.code}})</span>
							</span> -->
							<div class="openoperation operation" >
						</div>
							
						</div>
					</section>
					<ul class="oUl">
						<section class="classify-tit">
							<div class="selectbtns" style="float:left;disply:inline-block;" >
								<span v-for="(cate,index) in item.child" :key="index" style="" :class="{'sign':cate.isSelect}"  v-on:click="funSelectCategory(cate)">{{cate.name}}
									<template v-if="cate.code && cate.id < 100000">({{cate.code}})</template>
								</span>
								<h3 v-if="item.child.length == 0" style="line-height:45px;color:#7c7272;">该一级分类下没有二级分类，商品可直接归入一级分类中</h3>
							</div>
						</section>
						<!-- <el-radio-group v-model="categoryId" @change="funSelectCategory" text-color="#67c23a" fill="#67c23a">
							<el-radio v-for = "itemChild in item.child" :key="itemChild.id" :label="itemChild" text-color="#67c23a" fill="#67c23a">
								<span style="line-height:60px;">{{itemChild.name}}</span>
								<span v-if="itemChild.id < 100000 && itemChild.code">({{itemChild.code}})</span>
							</el-radio>
						</el-radio-group> -->
						<!-- <template v-for = "(itemChild,index) in item.child">
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
							</div>
							</li>
						</template> -->
					</ul>
				</div>
				<!-- <section v-for="(cate,index) in category" :key="index" class="classify-box">
					<section class="classify-tit">
						<a href="javascript:void(0);" v-if="cate.child.length>0" style="margin-left:30px;" :class="{'clasArr':true,'classOn':cate.toggle}" v-on:click="funShowToggle(cate,index)"></a>                        
						<div class="selectbtns" style="float:left;disply:inline-block; width:auto;" >
							<span style="width:auto;" :class="{'sign':cate.isSelect}"  v-on:click="funSelectCategory(cate)">{{cate.name}}</span>
						</div>
					</section>
					<section v-show="!cate.toggle" class="classify-cont fl" >
						<span  v-for="(child,i) in cate.child" :class="{'sign':child.isSelect,index}" :key="i" v-on:click="funSelectCategory(child,index)">{{child.name}}</span>
					</section>
				</section> -->
			</template>
		</section> 
	</win>  
</template>

<script>
	import storage  from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data(){
			return {
				selectCategory:[],    //选中的分类id
				category:[],          //所有的分类
				radio:false,           //true(多选),false(单选)
				ischain:null,
				// categoryId:'', //所选分类id，但原来存在的数据是多选，现改为单选无法满足故舍去
			};
		},
		props:{
			pObj:null,
			/*
				{
					category:Array          //分类列表       
					selectCategory:Array    //选中的分类 元素可以是分类的id或则是一个分类对象
					radio:  true            //true多选,false单选        
				}
			*/
		},
		methods:{
			closeSelfWin(res){
				let arr=[];//获取选中的分类
				if(res=='ok'){
					this.category.forEach((ele)=>{
						if(ele.isSelect){
							let obj={
								id:ele.id,
								name:ele.name,
								code:ele.code?ele.code:''
							};
							arr.push(obj);
						}
						ele.child || (ele.child=[]);
						ele.child.forEach((e)=>{
							if(e.isSelect){
								let obj={
									id:e.id,
									name:e.name,
									code:e.code?e.code:''
								};
								arr.push(obj);
							}                       
						});
					});
				}
				this.$emit('throwCommonWin',arr,res);
			},
			//点击选中分类
			funSelectCategory(item){
				if(this.radio){
					item.isSelect = !item.isSelect;
					let temp=this.category.pop();
					this.category.push(temp);
				}else{
					let arr=[];
					arr.push(item);
					this.category=this.initSelectCategory(this.category,arr);
				}  
			},
			//二级分类的显示与隐藏
			funShowToggle(item,index){
				item.toggle ? item.toggle=false : item.toggle=true;
				this.category.splice(index,1,item);
			},
			//获取id
			getObjectId(arr){
				let ids=[];
				arr.forEach((ele)=>{
					ids.push(parseInt(ele.id));
				});
				return ids;
			},        
			//初始化选中的分类 ,返回初始化后的分类,
			initSelectCategory(category,sel){
				let selId=[];
				if(typeof sel[0]=='object'){
					sel.forEach((ele)=>{
						selId.push(ele.id);
					});
				}else{
					selId=sel;
				}
				category=category.map((ele) => {
					let flag=false;
					flag=selId.some((one)=>{
						if(one==ele.id){
							ele.isSelect=true;
							return true;
						}
					});
					if(!flag){ele.isSelect=false}

					ele.child || (ele.child=[]);
					ele.child.forEach((e)=>{
						flag=false;
						for(let j=0,len=selId.length;j<len;j++){
							if(e.id==selId[j]){
								flag=true;
								e.isSelect=true;
								break;
							} 
						}                    
						if(!flag) e.isSelect=false;
					});
					return ele;
				});
				return category;
			},
			//去除分类中自己添加的'全部'这个字段,并给一级分类添加toggle字段
			deleteAllField(category){
				let arr = [];
				let arr2 = [];
				arr = category.filter((ele)=>{
					return ele.id!=-1;
				});
				arr2=arr.map((ele)=>{
					ele.child || (ele.child=[]);
					ele.child=ele.child.filter((e)=>{
						return e.id!=-1;
					});
					ele.toggle=false;
					return ele;
				});
				return arr2;
			},
			initData(){
				this.category=utils.deepCopy(this.pObj.category);
				this.radio=this.pObj.radio;
				let categoryId=[];
				if(this.pObj.selectCategory) categoryId=this.pObj.selectCategory;
				if(typeof categoryId[0] =='object'){
					this.selectCategory=categoryId.map((ele)=>{
						return ele.id;
					});
				}
			},       
		},
		mounted(){
			let userData = storage.session('userShop');
			this.ischain = userData.currentShop.ischain;
			// this.categoryId = this.pObj.selectCategory[0].id;
			this.initData();
			this.category=this.deleteAllField(this.category);
			this.category=this.initSelectCategory(this.category,this.selectCategory);
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
			win:()=>import (/*webpackChunkName:'win'*/'src/components/win'),
			radioBtn:()=>import (/*webpackChunkName:'radio_btn'*/'src/components/radio_btn'),
			mulSelect:()=>import (/*webpackChunkName:'mul_select'*/'src/components/mul_select')
		}
	};
</script>
<style lang="less" scoped>

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
		margin-top:25px;
		.opeartion{
			// background: url(../../res/icon/icon-hover-bg.png) no-repeat;
			margin:5px 10px;
			padding-top:12px;
			width:80px;
			height:40px;
		}
	}
	.oUl{
		width:100%;
		min-height: 90px;
		padding:20px;
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







	.classify {
		padding-bottom: 25px
	}

	.classify .classify-box {
		overflow: hidden;
		width: auto;
		height: auto;
		padding: 0 10px;
		border-bottom: 1px solid #e5e5e5
	}

	.classify .classify-box .classify-tit {
		overflow: hidden;
		width: 100%;
		height: 40px;
		margin: 12px 0 5px
	}

	.classify .classify-box .classify-cont {
		width: 100%;
		height: auto;
		margin-bottom: 10px
	}

	.classify .classify-box span {
		font-size: 14px;
		line-height: 40px;
		display: inline-block;
		float: left;
		height: 40px;
		margin-bottom: 3px;
		padding: 0 20px;
		cursor: pointer;
		text-align: center;
		border-right: 1px solid #fff;
		background-color: #f2f2f2
	}

	// .classify-tit span{width:200px;font-size: 16px!important;overflow: hidden;vertical-align: middle;text-overflow: ellipsis;white-space: nowrap;}
	// .classify-cont span{padding:0 15px;color:#656565;overflow: hidden;vertical-align: middle;text-overflow: ellipsis;white-space: nowrap;}

	.clasArr {
		background: url("../../../res/images/arrow.png") center no-repeat;
		width:50px;
		height:40px;
	}
	.classOn {
		transform: rotate(180deg);
		/* IE 9 */
		-ms-transform: rotate(180deg);
		/* Firefox */
		-moz-transform: rotate(180deg);
		/* Safari 和 Chrome */
		-webkit-transform: rotate(180deg);
		/* Opera */
		-o-transform: rotate(180deg);
	}

	.selectbtns {
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	
	.selectbtns span {
		display: inline-block;
		height: 38px;
		line-height: 38px;
		padding: 0 15px;
		cursor: pointer;
		text-align: center;
		background-color: #fff;
		margin: 5px 10px;
		border: 1px solid #d2d2d2;
		color: #919191;
	}
	
	.selectbtns span:hover {
		background-color: #eeeeee;
	}
	
	.selectbtns .sign {   
		border-color: #ff9800; 
		color: #ff9800;
		background: url("../../../res/images/sign.png") right bottom no-repeat; 
	}
	.signType{background:#FFF3E5 !important;border:1px solid #F8931F !important;color: #F9911E !important;} 
	.commodity-type span{margin-right: 15px;display: inline-block}
</style>
