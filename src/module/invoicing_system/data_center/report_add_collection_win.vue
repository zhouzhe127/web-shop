/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-20 16:08:27
 * @file 新建集合
 */

<template>  
	<div id="report_add_collection_win">
		<el-dialog :title="title" center :width="width" :visible.sync="showWin" @close="()=>{closeWin('cancel')}">
			<div class="dialog-content" >
				<div class="collection-name">
					集合名称
					<el-input maxlength="20" :disabled="disabled" clearable v-model="collName" placeholder="输入集合名称" style="width:224px;margin-left:15px;"></el-input>                
				</div>

				<div>
					<el-select v-model="condition.unitId" clearable @change="changeUnit"  placeholder="请选择单位">
						<el-option
							v-for="item in unitList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>

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

					<el-input maxlength="50" v-model="condition.name" placeholder="输入名称" style="width:224px">
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
					<el-button @click="changeBtn()" :type="selectBtn ? 'primary' : 'plain'" size="mini">选择本页</el-button>    
					<i class="el-icon-warning collection-tips-icon"></i>
					<span class="collection-tips-word">一个集合最大选择物料数量为50种</span>
											
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
		
		<collect-material @change="closeCollectMaterialWin"  v-if="mCollect.show" :collName="mCollect.collName" :mList="mCollect.list"></collect-material>
	</div>

</template>

<script>
/*
	需求:
		品牌进入以品牌的物料内容，单店进入以单店的物料内容，无品牌门店


	组件信息:
		抛出事件:    change
		抛出结果:    1.点击取消时抛出'cancel'字符    
					2.点击确定是抛出对象
						{
							selectList:[选择的物料]}      //选中的物料列表,全选本店或本类时,为[]
							selLength: [Number]         //选中的物料数量
						}
					3.其他情况不抛出任何值,弹窗关闭
		
	接口:
		根据物料id获取物料详情:materialGetMaterialDataByIds
	
*/
//全部分类
let allCategory = {
	label:'全部分类',
	value:-1,
};
//每个集合可选的最大数量
let MAX_NUM = 50;

import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
			showWin:true,              //是否展示弹窗

			radio:true,                 //多选
			selectBtn:false,            //是否选择本页
			collName:'',                //集合名称

			categoryList:[],
			unitList:[],                //单位列表
			list:[],                    //当前页的物料列表
			selectList:[],              //选中的物料列表

			condition:{},            
			pageObj:{},
			preSubObj:{},               //本次筛选的条件

			mCollect:{                  //物料聚合组件
				show:false,
				list:[],                
			}
		};
	},
	props:{
		//集合名字
		collectName:{
			type:[String],
			default:''
		},
		//集合单位
		pUnitId:{
			type:[String,Number],
			default:''
		},
		//集合id
		pCollectionId:{
			type:[String,Number],
			default:''
		},
		//选中的物料id
		selects:{
			type:[Array],
			default:function(){
				return [];
			}
		},
		//集合名字是否可以修改
		disabled:{
			type:[Boolean],
			default:false,
		},
		//弹窗标题
		title:{
			type:[String],
			default:'新建集合',
		},
		//弹窗的宽
		width:{
			type:[String],
			default:'920px'
		}
	},
	methods: {
		closeWin(sym){
			if(sym == 'ok'){
				let subObj = {
					name: this.collName.trim(),
					selectList: this.selectList,
					unitId:'',
				}; 
				let unitList = this.hasSameAttrVal(this.selectList,'cus_unitId');

				if(!this.checkData(subObj)){
					return;
				}
				if(unitList.length == 1){
					//单位相同时
					subObj.unitId = unitList[0];
					subObj = utils.deepCopy(subObj);
					this.createCollection(subObj);
				}else{
					this.mCollect.list = utils.deepCopy(subObj.selectList);              
					this.mCollect.show = true;
				}
			}else{
				this.throwData(false);
			}         
		},

		//关闭集合物料弹窗
		closeCollectMaterialWin(obj){
			if(!obj){
				this.mCollect.show = false;
			}else{
				let subObj = {
					name : this.collName.trim(),
					unitId : obj.unitId,
					selectList : obj.selectList
				};
				if(!this.checkData(subObj)){
					return;
				}
				this.createCollection(subObj);
			}
		},


		//筛选,重置
		filterReset(sym,page){
			if(sym == 'reset'){
				this.initPageObj();
				this.initCondition();
			}else{
				this.pageObj.currentPage = page | 1;
			}
			this.getMaterialList();
		},
		funGetPage(flag,res){
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}

			//翻页时的筛选条件为上一次筛选时的条件,不应获取当前所填写的条件
			let subObj = {...this.preSubObj};
			subObj.page = this.pageObj.currentPage;

			this.getMaterialList(subObj);
		},
		//复选框的点击
		changeChecked(item,bool){
			if(bool){
				if(this.selectList.length >= MAX_NUM){
					this.collectionNumLimitaTips();
					item['checked'] = !bool;
					return;
				}
				this.addDelSelectList([item],true);
			}else{
				this.addDelSelectList([item],false);
			}
			this.selectBtn = this.isSelectPage(this.list);            
		},
		//选择本页
		changeBtn(){
			this.selectBtn = !this.selectBtn;

			if(this.selectBtn){
				if(this.list.length + this.selectList.length > MAX_NUM){
					this.collectionNumLimitaTips();
					this.selectBtn = false;            
					return;
				}
				this.addDelSelectList(this.list,true);
				this.changeListAttrVal(this.list,'checked',true);
			}else{
				this.addDelSelectList(this.list,false);                
				this.changeListAttrVal(this.list,'checked',false);                
			}
		},
		//分类的切换
		changeCategory(){
			this.getMaterialList();
		},
		//单位的切换
		changeUnit(){
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
		//获取筛选条件
		getCondition(){
			let cate = this.condition.category;
			let condition = this.condition;
			let cid = '';
			if(cate.length != 0 ){
				cid = cate[cate.length - 1 ];
			}
			return {
				cid: allCategory.value == cid ? '' : cid,
				name: condition.name.trim(),
				unitId: condition.unitId
			};
		},
		//获取需要提交的数据
		getSubmitObj(){
			let condition = this.getCondition();            
			let subObj = {
				page: this.pageObj.currentPage,
				num: this.pageObj.pageSize,
				name: condition.name,
				cid: condition.cid,
				type:-1,
				unitId:condition.unitId
			};
			return subObj;
		},
		//校验抛出数据
		checkData(subObj){
			let regCollName = /^[\u4e00-\u9fa5A-Za-z0-9]{1,20}$/;
			if(subObj.selectList.length == 0){
				this.$message('请选择物料!');
				return;
			}
			if(subObj.selectList.length > MAX_NUM){
				this.collectionNumLimitaTips();
				return;
			}
			if(!subObj.name){
				this.$message('请输入集合名称!');
				return;
			}
			if(!regCollName.test(subObj.name)){
				this.$message('集合名称由1-20个中文,英文,数字组成!');
				return;
			}
			return true;
		},
		//集合数量限制提示
		collectionNumLimitaTips(){
			this.$message(`一个集合最大选择物料数量为${MAX_NUM}种`);			
		},
		throwData(data){
			this.$emit('change',data);
		},
		//新建集合
		async createCollection(obj){
			let retData = {};
			let fail = [];
			let subObj = {
				name : obj.name,
				unitId : obj.unitId,
				mid : obj.selectList.map( ele => ele.id).join(','),
				id : Number(this.pCollectionId)
			};


			try{
				retData = await this.getHttp('setStatisticScopeCategory',subObj,true);
				if(retData.invalid.length == 0){
					//新建成功
					this.$message('保存成功!');                    
					this.throwData(utils.deepCopy(retData.new));
					this.mCollect.show = false;
				}else{
					//新建失败
					for(let e of retData.invalid){
						for(let ele of obj.selectList){
							if(e == ele.id){
								fail.push(ele.name);
								break;
							}
						}
					}
					this.alert(`所选择物料${fail.join(',')}与所选单位不匹配!`);
				}
			}catch(e){
				this.alert('该集合名称已存在,请修改集合名称!');
			}
		},




		//获取物料列表
		async getMaterialList(subObj){
			if(!subObj) subObj = this.getSubmitObj();

			let retObj = await this.getHttp('getMaterialList',subObj);

			if(Array.isArray(retObj.list)){
				this.preSubObj = subObj;
				this.changeListAttrVal(retObj.list,'checked',false);
				this.changeListAttrVal(retObj.list,'cus_unitId',subObj.unitId);
				this.pageObj.total = Number(retObj.count) | 0;
				this.list = retObj.list;
			}

			//点亮选中物料
			this.matchSelectList(this.list,this.selectList);
			this.selectBtn = this.isSelectPage(this.list);            
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
		//获取物料单位列表
		async MaterialGetUnitList(){
			let unitList = await this.getHttp('MaterialGetUnitList');
			if(Array.isArray(unitList)){
				this.unitList = unitList;
			}
		},



		//初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:50,			//每页显示的记录数
				pagerCount:7,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
		},
		//初始化条件
		initCondition(){
			this.condition = {
				name:'',
				category:[allCategory.value],
				unitId:''
			};
		},
		//初始化props
		async initProps(){
			let list = [];

			if(this.selects.length > 0 ){
				list = await this.getHttp('materialGetMaterialDataByIds',{mids:this.selects.join(',')});
			}

			//初始化集合名
			this.collName = this.collectName;

			//初始化选中的列表
			if(Array.isArray(list)){
				this.changeListAttrVal(list,'cus_unitId',this.pUnitId);
				this.selectList = list;
			}

			this.condition.unitId = this.pUnitId;
		},



		checkSame(oldArr,newArr){
			if(oldArr.length != newArr.length){
				return false;
			}
			oldArr = oldArr.map( ele => Number(ele));
			newArr = newArr.map( ele => Number(ele));

			for(let i = 0 ; i < oldArr.length ; i += 1){
				if(oldArr[i] != newArr[i]){
					return false;
				}
			}
		},
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
		},
		getEle(list,val,attr='id'){
			for(let ele of list){
				if(ele[attr] == val){
					return ele;
				}
			}
		},
		//检查列表中的元素某一个属性的值是否相同
		hasSameAttrVal(list,attr='unitId'){
			let set = new Set();

			for(let ele of list){
				if(ele[attr]){
					set.add(Number(ele[attr]));
				}
			}
			return [...set];
		},
		//是否全部选中
		isSelectPage(list){
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
			let matchAttr = 'id';

			for(let ele of list){
				for(let e of selectList){
					if(ele[matchAttr] == e[matchAttr]){
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
	},
	async mounted(){
		this.initCondition();
		this.initPageObj();

		this.getCategoryList();		
		await this.MaterialGetUnitList();

		await this.initProps();		
		this.getMaterialList();
	},
	components:{
		collectMaterial:() => import(/* webpackChunkName:"collect_material_win"*/'./collect_material_win'),
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
	.collection-tips-icon{
		color: #ccc;
		font-size:14px;
		margin-left:5px;
	}
	.collection-tips-word{
		color: #ccc;
		font-size:14px;
		color:#909399;
	}
	.collection-name{
		padding-bottom:20px;
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