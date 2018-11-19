/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:08 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-16 18:09:02
 */

<template>  
	<el-dialog 
			:title="title" 
			center 
			:width="width" 
			:visible.sync="openWin"    
			@close="()=>{closeWin('cancel')}"         
		>
		<div class="dialog-content">
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
				<el-button @click="changeBtn(item,index)" v-for="(item,index) in btns" :key="index" type="plain" size="mini">{{item.label}}</el-button>                            
			</div>

			<div class="list-content">
				<template v-if="radio" v-for="(item,index) in nowList">
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
						已选:{{selectList.length}}个
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


	需求:
		品牌进入以品牌的物料内容，单店进入以单店的物料内容，无品牌门店


	组件信息:
		抛出事件:    select
		抛出结果:    1.点击取消时抛出'cancel'字符    
					2.点击确定是抛出对象
					3.其他情况不抛出任何值,弹窗关闭
		
	接口:
		根据物料id获取物料详情:materialGetMaterialDataByIds			
*/


//按钮
let btnType = {
	none : 0,					//未选择
	selectAll : 1,				//选择全部
	selectPage : 2,				//选择本页
	cancelAll : 3,				//取消全部
	cancelPage : 4				//取消本页
};

let btnsName = {
	selectAll : {id : btnType.selectAll,label:'选择全部'},
	selectPage : {id : btnType.selectPage,label:'选择本页'},
	cancelAll : {id : btnType.cancelAll,label:'取消全部'},
	cancelPage : {id : btnType.cancelPage,label:'取消本页'},
};

//全部分类
let allCategory = {
	label:'全部分类',
	value:-1,
};
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data () {
		return {
			openWin:true,
			
			btns:[btnsName.selectAll,btnsName.selectPage],
			selectBtn: btnType.none,                //当前选中的按钮id

			//未公开属性
			radio:true,             //多选

			categoryList:[],            

			list:[],                    		//物料列表
			searchList:[],						//当前筛选的物料
			nowList:[],							//当前展示的物料

			selectList:[],              		//选中的物料列表

			condition:{},
			pageObj:{},
			preSubObj:{},               		//上一次请求时携带的条件
		};
	},
	props:{
		//选中的列表,元素为物料id
		pSelects:{
			type:[Array],
			default:function(){
				return [];
			}
		},
		//所有的分类,元素为分类对象
		pCategory:{
			type:[Array],
			default:function(){
				return [];
			}
		},
		//物料列表,元素为物料对象
		pList:{
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
		closeWin(sym){
			let arr = utils.deepCopy(this.selectList);
			if(sym == 'ok'){
				this.throwData(arr);
			}else{ 
				this.throwData(false);                
			}
		},
		filterReset(sym,page){
			if(sym == 'reset'){
				this.initPageObj();
				this.initCondition();
			}else{
				this.pageObj.currentPage = page | 1;
			}
			this.getMaterialList();
			this.funGetPage('current-change',this.pageObj.currentPage);
		},
		funGetPage(flag,num){
			if(flag == 'size-change'){
				this.pageObj.pageSize = num;				
			}else{
				this.pageObj.currentPage = num;
			}
			this.nowList = this.slicePage(this.searchList,this.pageObj.currentPage,this.pageObj.pageSize);

			//选择本页			
			if(this.selectBtn != btnType.selectAll){
				this.selectBtn = btnType.none;				
				if(this.hasSameVal(this.nowList)){
					this.selectBtn = btnType.selectPage;
				}
			}
		},
		//按钮切换
		changeBtn(item){
			this.selectBtn = item.id;
			switch(item.id){
				case btnType.selectAll:
					this.addDelSelectList(this.searchList,true);
					this.changeListAttrVal(this.searchList,'checked',true);	
					break;
				case btnType.selectPage:
					this.addDelSelectList(this.nowList,true);
					this.changeListAttrVal(this.nowList,'checked',true);
					break;					
				case btnType.cancelAll:
					this.addDelSelectList(this.searchList,false);
					this.changeListAttrVal(this.searchList,'checked',false);	
					break;					
				case btnType.cancelPage:
					this.addDelSelectList(this.nowList,false);
					this.changeListAttrVal(this.nowList,'checked',false);
					break;					
			}

		},
		//复选框的点击
		changeChecked(item,bool){
			this.addDelSelectList([item],bool);
			
			if(bool){
				if(this.hasSameVal(this.nowList)){
					this.selectBtn = btnType.selectPage;
				}
				if(this.hasSameVal(this.searchList)){
					this.selectBtn = btnType.selectAll;				
				}
			}else{
				this.selectBtn = btnType.none;
			}

		},
		//分类的切换
		changeCategory(){
			this.getMaterialList();
		},






		//根据条件筛选物料
		getMaterialList(subObj){
			if(!subObj) subObj = this.getCondition();
			// console.log(this.list);
			let arr = this.filterListByCid(this.list,subObj.cid);
			// console.log(arr);
			arr = this.filterListByAttr(arr,subObj.name);
			// console.log(arr);
			
			this.pageObj.total = arr.length;
			this.searchList = arr;
		},
		//获取分类
		async getCategoryList(){
			this.categoryList = this.pCategory;	
				
			if(this.categoryList.length > 0){
				this.categoryList.unshift(allCategory);
				return;
			}
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





		//获取选中的分类id
		getCondition(){
			let cate = this.condition.category;
			let condition = this.condition;
			let cid = '';
			if(cate.length != 0 ){
				cid = cate[cate.length - 1 ];
			}
			return {
				cid : cid == allCategory.value ? '' : cid,
				name : condition.name.trim()
			};
		},
		//批量添加删除选中的
		addDelSelectList(list,sym,selectList){
			if(!selectList){
				selectList = this.selectList
			}
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




		initSelectListByProps(){
			this.list = this.pList;
			this.selectList = this.getMaterialInfoByList(this.pSelects,this.list);
		},
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:50,			    //每页显示的记录数
				pagerCount:7,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
		},
		initCondition(){
			this.condition = {
				name:'',
				category:[allCategory.value],            //当前选中的分类id,默认选中全部分类的id
			};
		},


		slicePage(list, page, num) {
			//分页
			let sIndex = (page - 1) * num;
			let eIndex = page * num;
			let arr = list.slice(sIndex, eIndex);
			return arr;
		},
		filterListByAttr(list,name,attr = 'name'){
			let arr = [];

			name = name.trim();
			if(!name) return [...list];

			arr = list.filter((ele)=>{
				ele[attr] += '';
				return ele[attr].includes(name);
			});
			return arr;
		},
		filterListByCid(list,name,attr='cid'){
			if(!name) return [...list];
			let arr = [];

			for(let ele of list){
				if(Array.isArray(ele.cate)) ele.cate = [];
				for(let e of ele.cate){
					if(e[attr] == name){
						arr.push(ele);
						break;
					}
				}
			}
			return arr;
		},
		throwData(data){
			this.$emit('change',data);            
		},
		//是否全部选中
		hasSameVal(list){
			let val = true;
			let attr = 'checked';
			let sym = false;
			sym = list.every((ele)=>{
				return ele[attr] == val;
			});
			return sym;
		},
		//根据选中的列表标记当前列表
		signListBySelectList(list,selectList){
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
		//根据物料id获取物料的相关信息
		getMaterialInfoByList(selects,list,attr = 'id'){
			let arr = [];
			for(let id of selects){
				for(let ele of list){
					if(id == ele[attr]){
						arr.push(ele);
						break;
					}
				}
			}
			return arr;
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
	},
	async mounted(){
		this.initCondition();
		this.initPageObj();
		this.getCategoryList();			
		this.initSelectListByProps();
		this.filterReset();		
	},
	watch:{
		pList:function(){
			this.initSelectListByProps();
			this.filterReset();		
		},
		pCategory:function(){
			this.getCategoryList();
		},
		selectBtn:function(){
			this.btns = [];
			let [a,b] = ['',''];

			switch(this.selectBtn){
				case btnType.selectAll:
					this.btns.push(btnsName.cancelAll,btnsName.cancelPage);				
					break;

				case btnType.selectPage:
					a = btnsName.cancelPage;
					b = btnsName.selectAll;

					if(this.hasSameVal(this.searchList)){
						b = btnsName.cancelAll;
					}
					this.btns.push(b,a);
					break;

				case btnType.none:					
				case btnType.cancelAll:
					this.btns.push(btnsName.selectAll,btnsName.selectPage);
					break;					

				case btnType.cancelPage:
					a = btnsName.selectPage;
					b = btnsName.selectAll;
					this.btns.push(b,a);
					break;					
			}
		}
	}
};
</script>
<style lang='less' scoped>
	.footer{
		display:flex;
		justify-content: space-between;
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