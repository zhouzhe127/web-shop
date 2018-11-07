/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 17:54:43
 */

<template>  
	<el-dialog 
			:title="title" 
			center 
			:width="width" 
			:visible.sync="openWin"    
			@close="()=>{closeWin('cancel')}"         
		>
		<div class="dialog-content" 
			v-loading="loading" 
			element-loading-text="正在选择中,请稍后..."
		>
			<div>
				<el-cascader
					expand-trigger="click"
					:options="categoryList"
					v-model="condition.category"
					placeholder="请选择分类"
					:filterable="true"
					:change-on-select="true"
					clearable
					@change="changeCategory"
					>
				</el-cascader>

				<el-input maxlength="50"  v-model="condition.name" placeholder="输入名称" style="width:224px">
					<i
						class="el-icon-search el-input__icon"
						slot="suffix"
						style="cursor:pointer;"
						@click="filterReset('filter')"
					>
					</i>
				</el-input>
			</div>

			<div class="btn-type">
				<el-button @click="changeBtn(item,index)" v-for="(item,index) in btns" :key="index" :type="selectBtn == item.id ? 'primary' : 'plain'" size="mini">{{item['label']}}</el-button>                            
			</div>

			<div class="list-content">
				<template v-if="radio" v-for="(item,index) in list">
					<el-checkbox @change="(res)=>{changeChecked(item,res)}" v-model="item['checked']" :label="item['name']" border :key="index" style="margin-left:0;" class="checkbox"></el-checkbox>
				</template>
			</div>
		</div>
		<template slot="footer">
			<div class="footer">
				<div class="footer-page">
					<el-pagination
						:pager-count="pageObj.pagerCount"
						:page-size="pageObj.pageSize"
						layout="prev, pager, next"
						:background="true"
						:total="pageObj.total"
						:current-page.sync="pageObj.currentPage"
						@size-change="(res)=>{funGetPage('size-change',res)}"
						@current-change="(res)=>{funGetPage('current-change',res)}"
					>
					</el-pagination>
					<span class="select-num">
						已选:{{selectShop ? shopNum : selectList.length}}个
					</span>
				</div>

				<div class="footer-btn">
					<el-button @click="closeWin('cancel')">取 消</el-button>
					<el-button @click="closeWin('ok')" type="primary">确 定</el-button>
				</div>
			</div>
		</template>
	</el-dialog>
</template>

<script>
/*
	问题:
		1.选择全部之后不可以取消某个选中的物料
		2.切换分类不清空选中,根据条件重新筛选一次
		3.无论是点击哪个按钮都是叠加选中,去除重复选中的
		4.是否需要做到当全部物料都选中的时候是否需要将当前条件下的选择全部按钮点亮


	需求:
		品牌进入以品牌的物料内容，单店进入以单店的物料内容，无品牌门店


	组件信息:
		抛出事件:    select
		抛出结果:    1.点击取消时抛出'cancel'字符    
					2.点击确定是抛出对象
					3.其他情况不抛出任何值,弹窗关闭
		
		
		注:为了更好的测试组件,目前一页选择显示2个
				
*/
//按钮
let btns = {
	none:0,         //未选择
	selectPage:1,   //选择本页
	selectAll:2,    //选择全部
};
//全部分类
let allCategory = {
	label:'全部分类',
	value:-1,
	id:-1,
};
import http from 'src/manager/http';
export default {
	data () {
		return {
			openWin:true,
			
			btns:[
				{id:btns.selectAll,label:'选择全部'},
				{id:btns.selectPage,label:'选择本页'},
			],
			selectBtn: btns.none,                //当前选中的按钮id

			//未公开属性
			radio:true,             //多选

			categoryList:[],            
			list:[],                    		//当前页的物料列表
			selectList:[],              		//选中的物料列表
			shopNum:0,                  		//本店所有的物料数量

			condition:{},
			pageObj:{},
			preSubObj:{},               		//上一次请求时携带的条件
			selectShop:false,               	//是否选择本店
			loading:false,                  	//加载动画
		};
	},
	props:{
		//选中的列表,元素为id
		selects:{
			type:[Array],
			default:function(){
				return [];
			}
		},
		title:{
			type:[String],
			default:'选择物料',
		},
		width:{
			type:[String],
			default:'920px'
		}
	},
	methods: {
		async closeWin(sym){
			if(sym == 'ok'){
				let arr = await this.formatData();
				if(arr.length == 0){
					this.$message('请选择物料!');
					return;
				}
				this.throwData(arr);
			}else{ 
				this.throwData(false);                
			}
		},
		throwData(data){
			this.$emit('change',data);            
		},
		async filterReset(sym,page){
			if(sym == 'reset'){
				//重置
				this.initPageObj();
				this.initCondition();
			}else{
				//筛选
				this.pageObj.currentPage = page | 1;
			}

			if(!this.selectShop){
				this.selectBtn = btns.none;
			}
			this.getMaterialList();
		},

		async funGetPage(flag,res){
			let subObj = {...this.preSubObj};
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			//根据上一次搜索条件,进行搜索
			subObj.page = this.pageObj.currentPage;
			await this.getMaterialList(subObj);        
		},
		//按钮切换
		async changeBtn(item){
			// let con = this.getCondition();
			let subObj = {};
			let arr = [];
			
			//已选择本店所有物料
			if(this.selectShop){
				this.selectBtn = item.id;
				return;
			}

			//点击的是选择全部,并且本次筛选的结果是一个店铺的物料
			if(item.id == btns.selectAll && this.isSelectShop()){
				//选择本店所有物料
				this.selectShop = true;
				this.selectBtn = item.id;
				this.shopNum = this.pageObj.total;
				this.changeListAttrVal(this.list,'checked',true);
				return;
			}
			this.selectBtn = item.id;
			switch(item.id){
				case btns.selectPage://选择本页
					this.changeListAttrVal(this.list,'checked',true);
					this.addDelSelectList(this.list,true);
					break;
				case btns.selectAll://选择全部
					subObj = {...this.preSubObj};
					subObj.page = 1;
					this.loading = true;
					arr = await this.recursiveGetMaterialList(subObj);               
					this.addDelSelectList(arr,true);
					this.changeListAttrVal(this.list,'checked',true);
					this.loading = false;
					break;
			}
			
		},
		//复选框的点击
		changeChecked(item,bool){
			
			if(bool){
				let sym = false;

				this.addDelSelectList([item],true);

				//点亮选中本页
				sym = this.isAllSelect(this.list);
				if(sym){
					this.selectBtn = btns.selectPage;                 
				}
				//点亮选中全部


			}else{
				if(this.selectShop){
					item['checked'] = !bool;                
					this.$message('已选择本店所有物料!');
					return;
				}
				//取消
				if(this.selectBtn == btns.selectAll){
					item['checked'] = !bool;                
					this.$message('已选择全部!');
					return;
				}else{
					//选择本页或未选中任何按钮
					this.selectBtn = btns.none;                    
					this.addDelSelectList([item],false);
				}
				
			}
		},
		//分类的切换
		changeCategory(){
			this.pageObj.currentPage = 1;
			this.selectBtn = btns.none;
			this.getMaterialList();
		},




		//批量添加删除选中的
		addDelSelectList(list,sym){
			let selectList = this.selectList;
			for(let i = 0;i < list.length;i += 1){
				for(let j = 0; j < selectList.length ;j += 1){
					if(selectList[j].id == list[i].id){
						selectList.splice(j,1);
						break;
					}
				}
			}
			//添加
			if(sym){
				selectList.push(...list);
			}
		},
		//获取选中的分类id
		getCondition(){
			let cate = this.condition.category;
			let condition = this.condition;
			let cid = '';
			if(cate.length != 0 ){
				cid = cate[cate.length - 1 ];
			}
			return {
				cid,
				cids:condition.cids,
				name:condition.name
			};
		},
		//获取提交的数据
		getSubmitData(){
			let condition = this.getCondition();
			let subObj = {
				page: this.pageObj.currentPage,
				num: this.pageObj.pageSize,
				name: condition.name,
				cid: condition.cid == allCategory.id ? '' : condition.cid,
				type:-1,
			};
			return subObj;
		},
		//是否请求的是本店所有物料
		isSelectShop(){
			let preSubObj = this.preSubObj;
			if(!preSubObj.cid && !preSubObj.name){
				return true;        
			}
		},
		//格式化数据
		async formatData(){
			let selectList = [],
				subObj = {};

			subObj = {
				name: '',
				cid: '',
				type:-1,
			};
			if(this.selectShop){
				selectList = await this.recursiveGetMaterialList(subObj);
			}else{
				selectList = this.selectList;
			}
			return selectList;
		},





		//获取物料列表
		async getMaterialList(subObj){
			if(!subObj) subObj = this.getSubmitData();
			let retObj = await this.getHttp('getMaterialList',subObj);

			if(Array.isArray(retObj.list)){
				this.preSubObj = subObj;
				this.changeListAttrVal(retObj.list,'checked',false);
				this.list = retObj.list;
				this.pageObj.total = Number(retObj.count) | 0;
			}

			//点亮选中的物料
			if(this.selectShop){
				this.changeListAttrVal(retObj.list,'checked',true);                
			}else{
				this.matchSelectList(this.list,this.selectList);                
				if(this.isAllSelect(this.list)){
					this.selectBtn = btns.page;
				}
			}
		},
		//获取分类
		async getCategoryList(){
			let cate = await this.getHttp('MaterialGetCategoryList');
			let arr = [];
			
			if(Array.isArray(cate)){
				for(let ele of cate){
					if(!Number(ele.pid)){
						ele.value = ele.id;
						ele.label = ele.name;
						ele.children = [];
						for(let e of cate){
							if(ele.id == e.pid){
								e.value = e.id;
								e.label = e.name;
								ele.children.push(e);
							}
						}
						arr.push(ele);
					}
				}
			}
			arr.unshift(allCategory);
			this.categoryList = arr;
		},
		//递归获取某个条件的所有物料
		async recursiveGetMaterialList(subObj){
			let page = 1;
			let arr = [];
			

			subObj.num = 50;
			
			for(let i = 0;i < page; i += 1){
				subObj.page = i + 1;
				let retObj = await this.getHttp('getMaterialList',subObj);
				page = Number(retObj.total);
				arr.push(...retObj.list);
			}   
			return arr;
		},


		//初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:2,			    //每页显示的记录数
				pagerCount:7,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
		},
		initCondition(){
			this.condition = {
				name:'',
				category:[allCategory.id],            //当前选中的分类id,默认选中全部分类的id
				cids:[],                              //选中的所有分类id
			};
		},



		//是否全部选中
		isAllSelect(list){
			let val = true;
			let attr = 'checked';
			let sym = false;
			sym = list.every((ele)=>{
				return ele[attr] == val;
			});
			return sym;
		},
		matchSelectList(list,selectList){
			let attr = 'checked';
			let val = true;
			for(let ele of list){
				for(let e of selectList){
					if(ele.id == e.id){
						ele[attr] = val;
						break;
					}
				}
			}
		},
		//改变列表的某个属性值
		changeListAttrVal(list,attr,val){
			for(let ele of list){
				ele[attr] = val;
			}
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
		tempData(count=10){
			let arr = [];
			let cids = [1,2,3,4,5];
			for(let i = 0;i < count; i++){
				let obj = {id:i,name:'经销存商品'+i,checked:false,cid:cids[i % 6]};
				arr.push(obj);
			}
			return arr;
		}
	},
	mounted(){
		this.initCondition();
		this.initPageObj();
		this.getCategoryList();
		this.getMaterialList();
	},
};
</script>
<style lang='less' scoped>
	.footer{
		display:flex;
		justify-content: space-between;
		// margin-top:-20px;
		.footer-page{
			display: flex;
			align-items: center;
			.select-num{
				color:#E1BB4A;
			}
		}
	}
	.dialog-content{
		border-top:1px solid #EAEEF5;
		border-bottom:2px solid #EAEEF5;
		padding-top:20px;
	}
	.btn-type{
		padding-top:20px;
		padding-bottom:20px;
	}
	.list-content{
		height: 280px;
		overflow-y: scroll;
	}
	.checkbox{
		margin-bottom:10px;
		margin-right:10px;
	}
</style>