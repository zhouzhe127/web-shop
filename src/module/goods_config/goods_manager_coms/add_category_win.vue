<template>
	<win :align="'center'" :height="650" :width="765" @winEvent="closeSelfWin" >
		<span slot="title">选择分类</span>
		<section class="classify" id="good-add-category" slot="content" style="height: auto;padding-bottom:20px;">
			<template>
				<section v-for="(cate,index) in category" :key="index" class="classify-box">
					<section class="classify-tit">
						<a href="javascript:void(0);" v-if="cate.child.length>0" style="margin-left:30px;" :class="{'clasArr':true,'classOn':cate.toggle}" v-on:click="funShowToggle(cate,index)"></a>                        
						<div class="selectbtns" style="float:left;disply:inline-block; width:auto;" >
							<span style="width:auto;" :class="{'sign':cate.isSelect}"  v-on:click="funSelectCategory(cate)">{{cate.name}}</span>
						</div>
					</section>
					<section v-show="!cate.toggle" class="classify-cont fl" >
						<span  v-for="(child,i) in cate.child" :class="{'sign':child.isSelect,index}" :key="i" v-on:click="funSelectCategory(child,index)">{{child.name}}</span>
					</section>
				</section>
			</template>
		</section> 
	</win>  
</template>

<script>
	import utils from 'src/verdor/utils';
	export default {
		data(){
			return {
				selectCategory:[],    //选中的分类id
				category:[],          //所有的分类
				radio:false,           //true(多选),false(单选)
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
								name:ele.name
							};
							arr.push(obj);
						}
						ele.child || (ele.child=[]);
						ele.child.forEach((e)=>{
							if(e.isSelect){
								let obj={
									id:e.id,
									name:e.name
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
			this.initData();
			this.category=this.deleteAllField(this.category);
			this.category=this.initSelectCategory(this.category,this.selectCategory);
		},
		components:{
			win:()=>import (/*webpackChunkName:'win'*/'src/components/win'),
			radioBtn:()=>import (/*webpackChunkName:'radio_btn'*/'src/components/radio_btn'),
			mulSelect:()=>import (/*webpackChunkName:'mul_select'*/'src/components/mul_select')
		}
	};
</script>
<style lang="less" scoped>
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

	.classify-tit span{width:200px;font-size: 16px!important;overflow: hidden;vertical-align: middle;text-overflow: ellipsis;white-space: nowrap;}
	.classify-cont span{width:auto;padding:0 15px;color:#656565;overflow: hidden;vertical-align: middle;text-overflow: ellipsis;white-space: nowrap;}

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
		padding-left: 18px;
		padding-right: 18px;
		background-color: #F1F1F1;
		text-align: center;
		cursor: pointer;
		margin: 1px;
	}
	
	.selectbtns span:hover {
		background-color: #eeeeee;
	}
	
	.sign {
		background: url("../../../res/images/sign.png") right bottom no-repeat; 
	}
	.signType{background:#FFF3E5 !important;border:1px solid #F8931F !important;color: #F9911E !important;} 
	.commodity-type span{margin-right: 15px;display: inline-block}
</style>
