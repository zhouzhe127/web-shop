<template>
	<win @winEvent ="closeSelfWin" :height="560" :width='920' :ok="btnOK" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="list-page" slot="content" >
			<div class="body-head">
				<div class="block-div">
					<select-store 
						:sorts="category" 
						:isSingle="sortOne.isSingle" 
						:tipName="sortOne.tipName" 
						@emit="(res)=>{getSelectStore(res,'one')}"
					></select-store>
				</div>

				<div class="block-div">
					<select-store 
						:sorts="child" 
						:isSingle="sortTwo.isSingle"
						:tipName="sortTwo.tipName"  
						@emit="(res)=>{getSelectStore(res,'two')}"
					></select-store>
					<div class="cover-div" @click="stopShowSelectStore" v-show="child.length == 0"></div>
				</div>

				<div class="input-div">
					<input type="text" v-model="search" :placeholder="placeholder">
					<span class="search-img" @click="funSearchGoods">
						<img src="../../../res/images/search.png" alt="">
					</span>
				</div>
			</div>

			<div class="body-head" style="overflow:hidden;" v-if="showBtn">
				<div class="menu fl">
					<span v-for="(item,index) in buttons"  @click="toggleButton(item,index)" :key="index" class="radio" :class="{'select-radio':item.id == selectBtn.id}">{{item.id == selectBtn.id ? item.alias : item.name}}</span>
				</div>
			</div>

			<div class="body-content">
				<div class="list-all">
					<template v-for="(item,index) in goodsList">
						<span  :class="{'mul-span':radio && item.selected,'single-span':!radio && item.selected}" @click="chooseItem(item,index)"  :key="index">{{item[fieldName]}}</span>
					</template>
				</div>
			</div>

			<div class="body-bottom-only" >
				<div class="page-container" v-if='true'>
					<pageElement
						@pageNum="getPageNum"
						:page="pageObj.currentPage"
						:total="pageObj.totalNum"
						:num ='pageObj.num'
						:showPageNum="pageObj.showPageNum"
						:isNoPaging='true'
						:isNoJump='!pageObj.isNoJump'
					></pageElement>
				</div>
				<span class="select-tips" v-if="selectBtn.id == 1 || selectBtn.id == 2">已选择:{{pageObj.count+'个'}}</span>
				<span class="select-tips" v-else>已选择:{{selectItem.length>1  ? selectItem.length+'个' : selectItem[0] && selectItem[0][fieldName]}}</span>
			</div>
		</div>
	</win>
</template>
<script>
/*
	@file:分页请求数据
	百川:z曾伟福
	请求:
		getMaterialList;		//获取物料列表
*/
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

export default {
	data(){
		return {
			btnOK:{
				content:'确定',
				style:'background-color:#ff9800'
			},
			btnCancel:{
				content:'取消',
				style:'background-color:#a0a0a0'
			},
			pageObj:{
				num: 50, 			        // 每页展示的数量
				currentPage: 1, 	        //当前展示的页数
				totalNum:0,		            //总页数
				showPageNum:6,              //显示的按钮数
				isNoJump:false,             //默认不展示确定按钮      
			},
			sortOne:{
				tipName:'请选择一级分类',
				isSingle:true,              //是否单选   默认多选
				isConfirm:true,             //是否带有 确认-取消按钮  false:无
				status:-1,
			},             
			sortTwo:{
				tipName:'请选择二级分类',
				isSingle:true,              //是否单选   默认多选
				isConfirm:false,            //是否带有 确认-取消按钮  false:无
				status:-1,
			},
			category:[],                    //一级分类
			child:[],                       //二级分类
			selectCategory:{
				parent:[],                  //选中的父分类
				child:[],                   //选中的子分类           
			},   
			buttons:[
				{id:2,name:'选择全部',alias:'取消全部',selected:false},
				{id:1,name:'选择本类',alias:'取消本类',selected:false},
				{id:0,name:'选择本页',alias:'取消本页',selected:false},
			],  
			selectBtn:{},                 

			goodsList:[],                   //商品
			selectItem:[],                	//选中的元素

			search:'',                      //搜索
		};
	},
	props:{
		fieldName:{
			type:String,				//展示的字段名
			default:'name'
		},				
		title:{
			type:String,
			default:'选择物料'          	//弹窗标题
		},
		radio:{
			type:Boolean,               //多选还是单选
			default:true
		},
		pCategory:{
			type:Array,                 //[{id:'',name:'',child:[]}]其中child属性不是必须(当展示的只有一级分类时)
			default:Array,                
		},
		pSelCategory:{
			type:Array,
			default:Array               //选中的分类 ,元素可以是数字,字符串,含id的对象      
		},
		pPageObj:{
			type:Object,				//分页参数
			default:Object	
		},
		pSelGoods:{
			type:Array,
			default:Array,              //选中的商品
		},
		pSelBtn:{
			type:[Number,String],
			default:-1,                 //选中按钮的id,默认没有选中的按钮,
		},
		showBtn:{
			type:Boolean,
			default:true,				//是否展示按钮
		},
		pSearch:{
			type:String,				//搜索内容
			default:'',
		},
		placeholder:{
			type:String,
			default:'请输入物料名称'
		}



		/*
			1)抛出事件 
				this.$emit("selectGoods",flag,obj); 
				obj:{
					pSelGoods:this.selectItem,					Array	//选中的元素
					pPageObj:this.pageObj,						Object	//分页参数
					pSelBtn:this.selectBtn,						Object	//选择的
					pSelCategory:selCategory,					Array	//选中的所有分类
					child:this.selectCategory.child,			Array	//选中的子分类
					parent:this.selectCategory.parent,			Array	//选中的父分类
					cid:this.getCategoryId()       				String	//选中的分类id,当父分类与子分类同时选中时,取子分类
				}
		*/
	},
	watch:{
		pSelGoods:function(){
			this.initGoodsList();
		},
		pSelCategory:function(){
			this.initCategory();
		},
		pCategory:function(){
			this.initCategory();
		},
		pPageObj:function(){
			this.initPageObj();
		},
		pSelBtn:function(){
			this.initBtn();
		}
	},
	methods:{
		//搜索
		async funSearchGoods(){
			this.selectBtn = {};
			this.pageObj.currentPage = 1;
			this.selectItem = [];
			await this.requestGoodsList();
		},
		async getPageNum(obj){
			if(this.pageObj.currentPage == obj.page){
				return ; 
			}

			if(this.selectBtn.id == 0){
				this.selectBtn = {};
			}

			this.pageObj.currentPage = parseInt(obj.page);
			await this.requestGoodsList();
			this.initGoodsList(this.selectItem);

		},
		closeSelfWin(flag){
			let obj = {},
				selCategory = [];

			selCategory = [...this.selectCategory.parent];
			selCategory.push(...this.selectCategory.child);

			this.pageObj.currentPage = 1;

			if(flag == 'ok'){
				obj = {
					pSelGoods:this.selectItem,
					pPageObj:this.pageObj,
					pSelBtn:this.selectBtn,
					pSelCategory:selCategory,
					child:this.selectCategory.child,
					parent:this.selectCategory.parent,
					cid:this.getCategoryId()
				};
			}
			obj = utils.deepCopy(obj);
			this.$emit('selGoods',flag,obj);
		},
		//阻止点击二级分类
		stopShowSelectStore(){
			if(this.sortOne.status == -1){
				this.alertWin('请先选择一级分类!');
				return;
			}
			if(this.child.length == 0){
				this.alertWin('该分类下无二级分类!');
				return;                    
			}            
		},
		getSelectStore(res,flag,hand){
			if(flag == 'one'){
				let parent = this.filterSelectStore(res);
				this.child = this.filterChildCategory(parent);    

				this.selectCategory.parent = parent;  
				this.selectCategory.child = [];              
				this.sortTwo.tipName = '请选择二级分类';

				if(!hand) this.selectBtn = {};
				

				if(parent.length>0){
					this.sortOne.status = 1;        //可以点击二级分类
				}else{
					this.sortOne.status = -1;       //不可以点击二级分类
					this.selectCategory = {parent:[],child:[]};
					if(this.selectBtn.id == 1){
						this.selectBtn = {};					
					}	
				}
			}else{
				this.selectCategory.child = this.filterSelectStore(res);
			}
		},
		toggleButton(item){
			let obj = {},
				flag = (typeof this.selectBtn.id) == 'number';				//已经选择按钮

			if(flag && item.id!= this.selectBtn.id){
				return;
			}
			if(item.id == 1 && this.selectCategory.parent.length == 0){
				this.alertWin('请先选择分类!');
				return ;
			}
			if(flag && item.id == this.selectBtn.id){
				this.selectBtn = {};
				obj = this.initSelect(this.goodsList,[],true,false,'selected');
				if(item.id == 0){
					this.delSelectItem(this.selectItem,obj.no);
				}else{
					this.selectItem = [];
				}
				this.goodsList = obj.arr;
				return;
			}

			if(!flag){
				this.selectBtn = item;
				obj = this.initSelect(this.goodsList,[],false,true,'selected');
				this.goodsList = obj.arr;
				if(this.selectBtn.id == 1 || this.selectBtn.id == 2){
					this.selectItem = [];									//选择全部,或选择本类			
				}else{
					this.selectItem = this.addSelectItem(this.selectItem,obj.no);
				}
			}
		},
		chooseItem(item){
			let {id:btnId} = this.selectBtn;
			if(btnId == 1 || btnId == 2) return;

			let bool = !item.selected,
				obj = {};

			if(this.radio){
				item.selected = !item.selected;
				if(item.selected){
					this.selectItem.push(item);
					if(typeof this.selectBtn.id != 'number'){
						if(this.selectItem.length == this.goodsList.length && this.goodsList.length>0){
							this.selectBtn = this.getEleById(this.buttons,0,'id');
						}
					}
				}else{
					if(this.selectBtn.id == 0){
						this.selectBtn = {};
					}
					this.deleteEle(this.selectItem,item.id,'id');
				}
			}else{
				obj = this.initSelect(this.goodsList,[item],bool,false,'selected');
				this.goodsList = obj.arr;
				this.selectItem = bool ? [item] : [];
			}
		},





		//根据条件删除元素
		deleteEle(list=[],val,attr='id'){
			for(let i = 0,len = list.length;i < len;i += 1){
				if(list[i][attr] == val){
					list.splice(i,1);
					break;
				}
			}
		},
		//初始化选中
		initSelect(...reset){
			let [list=[],selList=[],ok=true,cancel=false,attr='isSelect'] = reset,
				ids = [],
				obj = {arr:[],sel:[],no:[]};

			if(selList.length ==0 ){
				ids = [null];
			}else{
				if(selList[0] && typeof selList[0] == 'object'){
					ids = this.listGetAttr(selList,'id');
				}else{
					ids = selList;
				}
			}

			for(let ele of list){
				for(let i = 0;i < ids.length; i+=1){
					if(ele.id == ids[i]){
						ele[attr] = ok;
						obj.sel.push(ele);
						if(ids.length > 1){
							ids.splice(i,1);
						}
						break;
					}else{
						ele[attr] = cancel;
					}
				}
				if(ele[attr] == cancel) obj.no.push(ele);
			}

			obj.arr = [...list];

			return obj;
		},
		initSelectCategory(...reset){
			let [category=[],selId=[],bool=true,attr='selected'] = reset,
				ids = [],
				obj = {arr:[],sel:[],no:[]};

			
			if(selId.length == 0 ){
				ids = [null];
			}else{
				if(selId[0] && typeof selId[0] == 'object'){
					ids = this.listGetAttr(selId,'id');
				}else{
					ids = selId;
				}
			}

			for(let ele of category){
				for(let i = 0;i < ids.length;i++){
					if(ele.id == ids[i]){
						ele[attr] = bool;
						obj.sel.push(ele);
						if(ids.length>1){
							ids.splice(i,1);
						}
						break;
					}else{
						ele[attr] = !bool;
					}
				}
				
				if(ele[attr] == !bool) obj.no.push(ele);
 
				if(!Array.isArray(ele.child)){
					ele.child = [];
				}
				for(let ch  of ele.child){
					for(let i = 0;i < ids.length;i++){
						if(ch.id == ids[i]){
							ch[attr] = bool;
							obj.sel.push(ch);
							if(ids.length>1){
								ids.splice(i,1);
							}
							break;
						}else{
							ch[attr] = !bool;
						}                            
					}
					if(ch[attr] == !bool) obj.no.push(ch);
				}

				if(!this.radio && obj.sel.length == 1 ){
					break;
				}
			}
			obj.arr = [...category];
			return obj;
		}, 
		listGetAttr(arr,attr = 'id'){
			let attrs = [];
			arr.forEach((ele,index)=>{
				attrs[index] = ele[attr]+'';
			});
			return attrs;
		},
		//获取子分类
		filterChildCategory(arr){
			let temp = [];
			for(let item of arr){
				if(item.child) temp.push(...item.child);
			}
			return temp;
		},
		//获取选中的列表
		filterSelectStore(arr = []){
			let temp = [];
			temp = arr.filter((ele)=>{
				return ele.selected;
			});
			return temp;
		},
		//组织分类
		assignCategory(category=[]){
			let arr = [];
			for(let ele of category){
				if(ele.pid == 0){
					ele.child = [];
					for(let ch of category){
						if(ch.pid == ele.id){
							ele.child.push(ch);
						}
					}
					arr.push(ele);
				}
			}
			return arr;
		},
		alertWin(str){
			this.$store.commit('setWin',{title:'温馨提示',content:str});
		},
		getEleById(list=[],val,attr='id'){
			let temp = {};
			for(let ele of list){
				if(ele[attr] == val){
					temp = ele;
					break;
				}
			}
			return temp;
		}, 
		addSelectItem(list=[],selList=[]){
			//添加选中的元素
			let ids = this.listGetAttr(list,'id'),
				set = new Set(ids),
				arr = [...list];

			for(let ele of selList){
				let id = ele.id+'';
				if(!set.has(id)){
					set.add(id);
					arr.push(ele);
				}
			}
			return arr;

		},
		delSelectItem(list=[],selList=[]){
			//删除选中的元素
			for(let ele of selList){
				for(let i = 0;i<list.length;i++){
					if(ele.id == list[i].id){
						list.splice(i,1);
						break;
					}
				}
			}
		},


		getCategoryId(){
			//获取选中的分类id
			let id = '';
			let {parent=[],child=[]} = this.selectCategory;
			if(child.length > 0){
				id = child[0].id;
			}else{
				if(parent.length > 0){
					id = parent[0].id;
				}
			}
			return id;
		},
		async requestGoodsList(){
			let pageObj = {},
				obj = {};	

			pageObj = {
				page:this.pageObj.currentPage,
				num:this.pageObj.num,
				cid:this.getCategoryId(),
				name:this.search,
				type:-1
			};
			obj =  await this.getHttp('getMaterialList',pageObj);
			if(Array.isArray(obj.list)){
				this.goodsList = obj.list; 															//返回的列表
				this.pageObj.totalNum = obj.total;													//总页码数
				this.pageObj.count = obj.count;														//商品总数
			}			
		},
		initBtn(){
			//初始化选中的按钮
			let btnId = this.pSelBtn;
			if(btnId === ''){
				btnId = -1;
			}
			btnId = Number(btnId);
			this.selectBtn = this.getEleById(this.buttons,btnId,'id');
		},
		initPageObj(){
			let arr = ['num','currentPage','totalNum','showPageNum','isNoJump'];
			for(let key of arr){
				if(this.pPageObj[key]){
					this.pageObj[key] = this.pPageObj[key];
				}
			}
		},
		initCategory(){
			let isAssign = true,		//判断分类数据是否含有child字段
				temp = {};		

			this.category = this.pCategory;
			for(let ele of this.category){
				if(ele.pid != 0) isAssign = false;
			}
			if(!isAssign){
				this.category = this.assignCategory(this.category);
			}

			temp = this.initSelectCategory(this.category,this.pSelCategory,true);
			this.category = temp.arr;
			this.getSelectStore(this.category,'one',true);
		},
		initGoodsList(selGoods){
			//初始化商品
			let obj = {};

			if(this.selectBtn.id == 1 || this.selectBtn.id == 2){

				obj = this.initSelect(this.goodsList,[],false,true,'selected');
				this.goodsList = obj.arr;
				this.selectItem = [];					//选中全部,或本类		
			}else{

				obj = this.initSelect(this.goodsList,selGoods,true,false,'selected');
				this.selectItem = this.addSelectItem(this.selectItem,obj.sel);
				this.goodsList = obj.arr;

				if(this.selectItem.length == this.goodsList.length && this.goodsList.length>0){
					this.selectBtn = this.getEleById(this.buttons,0,'id');
				}else{
					this.selectBtn = {};
				}
			}
		},
		async getHttp(url,data={}){
			let res = await http[url]({data});
			return res;
		},
		initData(){
			this.search = this.pSearch;
		}
	},
	async mounted(){
		this.initBtn();
		this.initData();
		
		this.initPageObj();
		
		this.initCategory();
		await this.requestGoodsList();

		this.initGoodsList(this.pSelGoods);
	},

	components:{
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		selectStore:()=>import(/*webpackChunkName:'select_store'*/ 'src/components/select_store'),
		pageElement:()=>import (/*webpackChunkName:"page_element"*/'src/components/page_element'),

	}
};
</script>
<style lang="less" scoped>
#list-page{
	@b:1px solid #ff0000;
	@cc:#ccc;
	@c3:#333;
	@blue:#28a8e0;
	@cy:#ff9800;
	@menu:#b3b3b3;
	background-color:#f7f7f7;
	height: 100%;
	.whb(@width,@height,@border:1px solid #ff0000){
		height:@height;
		width:@width;
		border:@border;
	}
	.lfc(@line,@font,@color){
		line-height: @line;
		font-size:@font;
		color:@color;
	};
	input{
		padding:0;
		margin:0;
	}
	.body-head{
		padding:0 25px;
		padding-top:20px;

		.block-div{
			display:inline-block;
			margin-right:12px;
			.cover-div{
				position:absolute;
				.whb(210px,40px,none);
				cursor: pointer;
				margin-top:-40px;
				opacity:0;
			}
		};
		.input-div{
			.whb(210px,41px,1px solid @cc);
			margin-right:15px;
			display: inline-block;
			background: #fff;
			input{
				outline:none;
				padding:0 10px;
				box-sizing: border-box;
				.lfc(40px, 14px, @c3);
				.whb(168px,38px,none);
			}
			span{
				.whb(40px,40px,none);
				border-left:1px solid @cc;
				float:right;
				cursor: pointer;
				i{
					border:7px solid transparent;
					border-top:12px solid @cc;
					position: absolute;
					margin-top:13px;
					margin-left:13px;
				}
			}
			.search-img{
				background-color: #28a8e0;
				text-align: center;
				img{
					.whb(25px,25px,none);
					margin-top:8px;
				}
			}
		}
		
		//选择
		.menu{
			.radio{
				.whb(auto,40,none);
				.lfc(40px,14px,none);
				min-width: 100px;
				cursor: pointer;
				text-align: center;
				display: inline-block;
				margin-right:7px;
				padding: 0 15px;
				color:#fff;
				user-select: none;
				background-color: @blue;
			}
			.select-radio{
				background-color: @menu;
			}
		}
	}
	.body-content{
		height:auto;
		padding:0 25px;
		margin-top:20px;
		span{
			.lfc(40px, 14px, #333333);
			text-align: center;
			display: inline-block;
			margin-bottom:10px;
			margin-right:10px;
			min-width: 100px;
			padding:0 15px;
			cursor: pointer;
			background-color: #fff;
			border:1px solid #ddd;
		}
		.single-span{
			border:1px solid @cy;
			color:@cy;
		}
		.mul-span{
			background: url("../../../res/images/sign.png") #fff right bottom no-repeat;
			.single-span;
		}
		.none-select{
			color: #333;
			background: #ddd;
			cursor: not-allowed;
		}
		.list-all{
			max-height:360px;
			overflow-y: auto;
		}
		.category{
			overflow: auto;
			.category-name{
				.lfc(40px,16px,@blue);
				.whb(120px,40px,none);
				display: inline-block;
				text-overflow: ellipsis;
				overflow: hidden;
				background:none;
				cursor:auto;
				white-space:nowrap;
				i{
					.whb(9px,9px,none);
					margin-right:5px;
					float:left;
					background-color: #a0a0a0;
					margin-top:14px;
				}
				.gray-i{
					background: @blue;
				}
			}
			.category-container{
				width:709px;
				float:right;
				overflow: auto;
			}

		}
	}
	.body-bottom-only{
		position: absolute;
		bottom:50px;
		.whb(100%,60px,none);
		padding-top:10px;
		background: #fff;
		.page-container{
			float:left;
			margin-left:25px;
			width:auto;
		}
		.select-tips{
			padding-top:11px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			width:auto;
			max-width:270px;
			float:right;
			font-size:14px;
			color:@cy;
			margin-right:25px;
		}
	}
}
</style>


