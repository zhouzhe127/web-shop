<template>
	<win @winEvent ="winEvent" :height="560" :width='960' :ok="btnOK" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="sel-material" slot="content" >
			<div class="filter">
				<div class="inline-box">
					<input type="text" placeholder="请输入物料名称" v-model="matName"/>
				</div>
				<div class="inline-box">
					<el-select v-model="typeSel" placeholder="请选择" style="width:200px;">
					    <el-option
							v-for="item in typeList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="inline-box">
					<el-cascader
						class="el-size"
						:options="oneSort"
						v-model="cidSel"
						@change="getSortSel"
						change-on-select>
					</el-cascader>
				</div>
				<div class="inline-box">
					<div class="button-box">
						<el-button type="primary" @click="filter">筛选</el-button>
						<el-button type="info" @click="reset">重置</el-button>
					</div>
				</div>
			</div>
			<div class="list">
				<div class="cell" v-for="(item,index) in materialList" :key="index"  v-if="choiceType=='single'">
					<el-radio v-model="singleId" :label="item.id" border :disabled="item.isBan" @change="listClick(1)">
						{{item.name}}
					</el-radio>
				</div>
				<el-checkbox-group v-model="multipleId" v-if="choiceType!='single'" @change="listClick(2)">
					<div class="cell" v-for="(item,index) in materialList" :key="index">
						<el-checkbox :label="item.id" border :disabled="item.isBan">{{item.name}}</el-checkbox >
					</div>
				</el-checkbox-group>
			</div>
			<div class="page-box">
				<el-pagination @current-change="getPageNum"
					:current-page="page"
					background
					layout="prev, pager, next"
					:page-count="pageTotal">
				</el-pagination>
			</div>
			<div class="bottom">
				已选择：{{selectName}}
			</div>
		</div>
	</win>
</template>

<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	
	export default {
		data(){
			return {
				btnOK:{
					content:'确定',
				},
				btnCancel:{
					content:'取消',
				},
				typeList:[
					{value:-1,label:'全部物料'},
					{value:0, label:'成品物料'},
					{value:1, label:'半成品物料'},
					{value:2, label:'普通物料'},
				],
				typeSel:-1,
				materialList:[],
				page:1,
				showNum:50,
				matName:'',
				pageTotal:1,
				selType:'',//已选中的物料类型
				oneSort:[],//一级分类
				allSort:[],//总分类列表
				cid:'',
				cidSel:[''],
				winObj:{//已选择条件
					search:{},//搜索条件					
					list:[],//选中列表				
				},
				singleId:'',//单选id
				multipleId:[],//多选id
				resList:[],//输出列表
				selectName:'',//已选中名称
			};
		},
		props:{
			choiceType:{
				type:String,					//选择模式 single单选 more多选
				default:'single'
			},				
			title:{
				type:String,
				default:'选择产出物料'          	//弹窗标题
			},
			selObj:{							//已选择条件
				type:Object,
				default:{
					search:{},					//搜索条件
					list:[],					//选中列表
					banList:[],					//禁止选择列表
				}
			},
		},
		components:{
			win: () => import(/*webpackChunkName:'win'*/ 'src/components/win_element'),
			selectStore:()=>import(/*webpackChunkName:'select_store'*/ 'src/components/select_store'),
			pageElement:()=>import (/*webpackChunkName:"page_element"*/'src/components/page_element'),
		} ,
		mounted(){
			this.setDefaultList();
			this.getMaterialList();//获取物料列表
			this.getCategoryList();//获取分类列表
		},
		methods:{
			winEvent(res){
				if(res=='ok'){
					this.winObj.search={
						matName:this.matName,
						typeSel:this.typeSel,
					};
					this.winObj.list = this.resList;
					this.$emit('emit',this.winObj);
				}else{
					this.$emit('emit',false);
				}
			},
			setDefaultList(){//设置默认选中数据
				this.winObj = this.selObj;
				this.resList = utils.deepCopy(this.winObj.list);
				this.typeSel = this.winObj.search.typeSel?this.winObj.search.typeSel:-1;
			},
			setAlready(){ 
				let idArr=[];
				for(let res of this.resList){
					for(let item of this.materialList){
						if(res.id==item.id){
							idArr.push(item.id);
							break;
						}
					}
				}
				for(let res of this.winObj.banList){
					for(let mat of this.materialList){
						if(res.id == mat.id){
							mat.isBan = true;
						}
					}
				}
				if(idArr.length>1){
					this.multipleId = idArr;
				}else if(idArr.length==1){
					this.singleId = idArr[0];
				}
				this.setSelName();
			},
			//设置已选中名称
			setSelName(){
				if(this.resList.length>1){
					this.selectName = this.resList.length+'种';
				}else if(this.resList.length===1){
					this.selectName = this.resList[0].name;
				}else{
					this.selectName = '';
				}
			},
			listClick(type){
				this.resList = [];
				if(type==1){//单选
					this.setResList(this.singleId);
				}else{//多选
					for(let item of this.multipleId){
						this.setResList(item);
					}
				}
				this.setSelName();
			},
			//设置选中列表
			setResList(id){
				for(let item of this.materialList){
					if(id==item.id){
						this.resList.push(item);
					}
				}
			},
			filter(){//筛选
				this.page = 1;
				this.getMaterialList();
			},
			reset(){//重置
				this.page = 1;
				this.showNum = 50;
				this.matName = '';
				this.cid = '';
				this.cidSel = [''];
				this.typeSel = -1;
				this.getMaterialList();
			},
			getPageNum(page){//获取分页数据
				this.page = page;
				this.getMaterialList();
			},
			async getMaterialList(){//获取物料列表
				let data = await http.getMaterialList({data:{
					page:this.page,
					num:this.showNum,
					name:this.matName,
					cid:this.cid,
					type:this.typeSel,
				}});
				this.materialList = data.list;
				this.pageTotal = Number(data.total);
				this.setAlready();//设置已选中id
			},
			async getCategoryList(){//获取一二级分类
				let data = await http.invoiv_getCategoryList();
				this.allSort = data;
				let one = [];
				for(let item of data){
					if(item.pid == 0){
						one.push({value:item.id,label:item.name,children:[]});
					}
				}
				one.unshift({value:'',label:'全部分类'});
				this.oneSort = one;
				for(let one of this.oneSort){
					let two = [];
					for(let item of data){
						if(one.value==item.pid){
							two.push({value:item.id,label:item.name});
						}
					}
					if(two.length){
						one.children = two;
					}else{
						delete one.children;
					}
				}
				this.oneSort = one;
			},
			getSortSel(res){
				if(res.length>1){
					this.cid = res[1];
				}else{
					this.cid = res[0];
				}
			}
		},
	};
	
</script>

<style lang="less" scoped>
	#sel-material{
		padding: 15px;position: relative;height: 560px;
		.filter{
			.inline-box{display: inline-block;padding-right: 5px;vertical-align: middle;
				input {
					width: 150px;
					height: 40px;
					padding: 0 10px;
					font-size: 14px;
					border-radius: 4px;
					&:focus {
						outline: none;
					}
				}
				.button-box {
					display: inline-block;
					vertical-align: middle;
					span {
						display: inline-block;
						height: 40px;
						line-height: 40px;
						width: 80px;
						color: #fff;
						text-align: center;
					}
					.filter {
						margin-right: 5px;
						cursor: pointer;
						background: #E1BB4A;
					}
				}
			}
		}
		.list{padding-top: 10px;height: 430px;padding: 15px 0;overflow: auto;
			.cell{
				margin: 5px 0px;margin-right: 10px;display: inline-block;
			}
			.active{border: 1px solid #ff9800;color: #ff9800;}
			.ban{cursor: not-allowed;background: #ddd;border: 1px solid #ccc;}
		}
		.page-box{position: absolute;bottom: 34px;left: 0;padding: 3px 10px;width: 100%;}
		.bottom{position: absolute;bottom: 0;left: 0;width: 100%;padding: 10px;color: #E1BB4A;
			text-align: right;}
	}
</style>