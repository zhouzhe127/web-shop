<template>
	<win @winEvent ="winEvent" :height="560" :width='960' :ok="btnOK" :cancel="btnCancel">
		<span slot="title">{{title}}</span>
		<div id="sel-material" slot="content" >
			<div class="filter">
				<div class="inline-box">
					<input type="text" placeholder="请输入物料名称" v-model="matName"/>
				</div>
				<div class="inline-box">
					<el-select v-model="typeSel" placeholder="请选择" @change="dropSelect" style="width:150px;">
					    <el-option
							v-for="item in typeList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="inline-box">
					<selectStore @emit="selSortOne" :sorts="sortOne" :tipName="'请选择一级分类'" :isSingle="true"></selectStore>
				</div>
				<div class="inline-box" @click="twoSortClick">
					<selectStore @emit="selSortTwo" :sorts="sortTwo" :tipName="'请选择二级分类'" :isSingle="true" ref="towSortDom"></selectStore>
				</div>
				<div class="inline-box">
					<div class="button-box">
						<span class="filter" @click="filter">筛选</span>
						<span class="gray" @click="reset">重置</span>
					</div>
				</div>
			</div>
			<div class="list"  @click="listClick">
				<div class="cell" v-for="(item,index) in materialList" :key="index" 
					:data-index="index" 
					:class="{active:item.selected,ban:item.isBan}">{{item.name}}</div>
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
					style:'background-color:#ff9800'
				},
				btnCancel:{
					content:'取消',
					style:'background-color:#a0a0a0'
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
				sortOne:[],//一级分类
				sortTwo:[],//二级分类
				allSort:[],//总分类列表
				sortOneId:'',//一级分类id
				sortTwoId:'',//二级分类id
				cid:'',
				winObj:{//已选择条件
					search:{},//搜索条件					
					list:[],//选中列表				
				},
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
			win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
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
					let selArr = [];
					this.winObj.search={
						matName:this.matName,
						sortOneId:this.sortOneId,//一级分类id
						sortTwoId:this.sortTwoId,//二级分类id
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
			setSelName(resList){
				let arr = [];
				for(let res of resList){
					for(let item of this.materialList){
						if(res.id==item.id){
							arr.push(item.name);
							break;
						}
					}
				}
				if(arr.length>1){
					this.selectName = arr.length+'种';
				}else if(arr.length==1){
					this.selectName = arr[0];
				}else{
					this.selectName = '';
				}
			},
			dropSelect(res){//下拉框选中
				this.typeSel = res;
			},
			listClick(event){
				let target = event.target;
				if(target.className.includes('cell') && !target.className.includes('ban')){
					let index = target.getAttribute('data-index');
					let thisItem = this.materialList[index];
					if(this.choiceType=='single'){//单选
						for(let item of this.materialList){//清除其他按钮样式
							if(thisItem.id!=item.id) item.selected = false;
						}
						this.clearList('',true);//清除全部
					}
					if(thisItem.selected==false){//选中
						thisItem.selected = true;
						this.resList.push(thisItem);
					}else{//取消
						thisItem.selected = false;
						this.clearList(thisItem.id);
					}
					this.setSelName(this.resList);
				}
				if(target.className.includes('ban')){
					this.$message({message: '成品物料不能与原料物料相同!'});
				}
			},
			clearList(id,isAll){//清除选中项
				if(isAll){
					this.resList = [];
					return;
				}
				for(let i=0;i<this.resList.length;i++){
					let item = this.resList[i];
					if(item.id==id){
						this.resList.splice(i,1);
						i--;
						break;
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
				this.typeSel = -1;
				this.getMaterialList();
			},
			getPageNum(page){//获取分页数据
				this.page = page;
				this.getMaterialList();
			},
			setAlready(){//设置已选中
				for(let res of this.resList){
					for(let mat of this.materialList){
						if(res.id == mat.id){
							mat.selected = true;
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
				for(let item of this.materialList){
					this.$set(item,'selected',false);
				}
				this.setAlready();//设置已选中id
				this.setSelName(this.resList);
			},
			async getCategoryList(){//获取一二级分类
				let data = await http.invoiv_getCategoryList();
				let one=[];
				for(let item of data){
					if(item.pid == 0){
						one.push(item);
					}
				}
				this.sortOne = one;
				this.allSort = data;
				this.setDefaultSort();
			},
			selSortOne(res,saveTwo){//选择一级分类
				let twoArr = [];
				if(!saveTwo) this.sortTwoId='';
				this.cid = this.setSortId(res);
				this.sortOneId = this.cid;
				for(let item of this.allSort){
					if(item.pid == this.cid){
						twoArr.push(item);
					}
				}
				this.sortTwo = twoArr;
			},
			selSortTwo(res){//选择二级分类
				this.cid = this.setSortId(res);
				this.sortTwoId = this.cid;
			},
			setSortId(arr){//设置选中的分类id
				let id='';
				for(let item of arr){
					if(item.selected == true){
						id = item.id;
						break;
					}
				}
				return id;
			},
			setDefaultSort(){//设置默认分类选中
				for(let item of this.sortOne){
					if(this.sortOneId == item.id){
						item.selected=true;
						break;
					}
				}
				this.selSortOne(this.sortOne,true);//不清空二级分类id
				if(this.sortTwo.length){
					for(let item of this.sortTwo){
						if(this.sortTwoId == item.id){
							item.selected=true;
							break;
						}
					}
					this.selSortTwo(this.sortTwo);
				}
			},
			twoSortClick(){
				if(!this.sortTwo.length){
					this.$refs.towSortDom.sortShow = false;
					this.$message({message: '请选择一级分类'});
				}
			},
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
			.cell{padding: 0 15px;height: 40px;line-height: 38px;color: #666;background: #fff;border: 1px solid #ccc;
				float: left;margin-bottom: 10px;margin-right: 10px;cursor: pointer;}
			.active{border: 1px solid #ff9800;color: #ff9800;}
			.ban{cursor: not-allowed;background: #ddd;border: 1px solid #ccc;}
		}
		.page-box{position: absolute;bottom: 34px;left: 0;padding: 3px 10px;width: 100%;}
		.bottom{position: absolute;bottom: 0;left: 0;background: #f1f1f1;width: 100%;padding: 10px;color: #ff9800;
			text-align: right;}
	}
</style>