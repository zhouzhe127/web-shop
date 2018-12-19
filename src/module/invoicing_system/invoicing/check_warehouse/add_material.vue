<!--
    **批量盘库-选择物料
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<div class="inline-box">
				<el-input placeholder="请输入物料名称" v-model="materialName"></el-input>
			</div>
			<div class="inline-box">
				<el-input placeholder="请输入物料编码" v-model="barCode"></el-input>
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
				<select-store @emit="selWare" :sorts="wareList" :tipName="'请选择仓库'" ></select-store>
			</div>
			<div class="inline-box" @click="checkSelect('areaList','areaDom')">
				<select-store @emit="selArea" :sorts="areaList" :tipName="'请选择区域'" ref="areaDom"></select-store>
			</div>
			<div class="inline-box">
				<div class="button-box">
					<el-button type="primary" @click="filter">筛选</el-button>
					<el-button type="info" @click="reset">重置</el-button>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="list-head">
				物料列表 · 共<em>{{listLength}}</em>个条目， 
				<template v-if="storeAll">已选择：全部</template>
				<template v-else>
					已选择:<em>{{this.selectItem.length}}</em>个
				</template>
				<div class="check-div">
					<el-checkbox v-model="isUpdateZero">未选中的物料库存消耗至0</el-checkbox>
					<el-tooltip 
						class="item" 
						effect="dark" 
						placement="bottom">
						<div slot="content"><i class="el-icon-warning"> 说明</i>
						<br/><br/>
						该条目被勾选后，所有未选中的商品，库存统一变更为0
						<br/>
						操作日志及进销存统计中记录类型为批盘消耗。</div>
						<i class="check-icon el-icon-info"></i>
					</el-tooltip>
				</div>
			</div>
			<el-table :data="list" stripe border style="width:100%" 
				:header-cell-style="{'background-color':'#f5f7fa'}"
				@row-click="rowClick">
				<el-table-column width="180" fixed="left">
					<template slot="header" slot-scope="scope">
						<el-checkbox v-model="storeAll" @change="radioAll('store')">全选</el-checkbox>
						<el-checkbox v-model="pageAll" :disabled="storeAll" @change="radioAll('page')">全选本页</el-checkbox >
					</template>
					<template slot-scope="scope" >
						<div class="check-slot">
							<el-checkbox v-model="scope.row.selected" :disabled="storeAll" @change="listHandle(scope.row)">
							</el-checkbox>
						</div>
					</template>
				</el-table-column>
				<el-table-column type="index" :index="indexMethod" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="物料名称" min-width="200">
				</el-table-column>
				<el-table-column prop="barCode" label="物料编码" min-width="200">
				</el-table-column>
				<el-table-column label="类型" width="150">
					<template slot-scope="scope">
						{{matTypeHash[scope.row.type]}}
					</template>
				</el-table-column>
				<el-table-column label="所属仓库" min-width="200">
					<template slot-scope="scope">
						{{scope.row.wName}}{{scope.row.aName?' / '+scope.row.aName:''}}
					</template>
				</el-table-column>
				<el-table-column label="分类" width="200">
					<template slot-scope="scope">
						{{setCate(scope.row.cate)}}
					</template>
				</el-table-column>
				<el-table-column label="库存数量/重量" width="200">
					<template slot-scope="scope">
						{{setSuprlus(scope.row.surplus,scope.row.unit)}}
					</template>
				</el-table-column>
				<el-table-column prop="batch" label="批次数量" width="100">
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box">
			<el-pagination @current-change="pageChange"
				:current-page="page"
				background
				layout="prev, pager, next"
				:page-count="pageTotal">
			</el-pagination>
		</div>
		
		<model-name :name="modelName" :title="modelTitle" v-if="nameWinShow" @emit="nameWinEmit"></model-name>
		
	</div>
</template>

<script>
	/*
	 * 抛出一个对象{}  父组件使用  @emit="" 接收
		{
			list:[],  Array 					//选中的列表
			search:{							//筛选条件集合{}
				cid: Number,   					//商品类型 0普通商品，1称重商品
				sortOneId: Number,					//一级分类id
				sortTwoId: Number,					//二级分类id
				wid : String, 					//仓库id
				areaId : String, 				//区域id
			},
			storeAll: Boolean					//是否全选
			name:String,						//模板名称
		} 
	*/
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import Timer from 'src/verdor/timer';
	export default {
		data() {
			return {
				userName: '', //用户名
				barCode:'',//物料编码
				tempId:'',//模板id
				shopId:'',//店铺id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				materialName: '', //商品名称
				cid:'',//分类id
				wid:'',//仓库id
				areaId:'',//区域id
				modelName:'',//模板弹窗-名称
				modelTitle:'保存模板',//模板弹窗-标题
				nameWinShow:false,//是否显示模板名称弹框
				titleList: [
					{titleName: '操作',titleStyle:{width:200+'px',}},
					{titleName:'序号'},
					{titleName: '物料名称',dataName: 'name'},
					{titleName: '类型',},
					{titleName:'所属仓库'},
					{titleName: '分类'},
					{titleName:'库存数量/重量'},
					{titleName:'批次数量',dataName:'batch'},
				],
				matTypeHash:{
					0:'成品',
					1:'半成品',
					2:'普通物料',
				},
				storeAll:false,//全选
				pageAll:false,//全选本页
				selectItem:[],//保存零散选中的所有id,
				wareList:[],//仓库列表
				areaList:[],//区域列表
				selList:[],//选中的列表
				searchObj:{},//筛选条件
				allSort:[],//总分类列表
				oneSort:[],//一级分类列表
				sortOneId:'',//一级分类id
				sortTwoId:'',//二级分类id
				cidSel:[-1],//选择的分类数组
				isEdit:'',//是否编辑模板
				useList:[],
				isUpdateZero:false,
				timerId:'',
				loading:false,
			};
		},
		props:[
			'selObj', 	//对应抛出时的对象
		],
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
			modelName: () =>
				import ( /*webpackChunkName: 'model_name_win'*/ './model_name_win'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.userName = this.userData.user.name;
			this.shopId = this.userData.currentShop.id;
			this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		},
		mounted() {
			this.tempId = this.$route.query.id;
			this.isEdit = this.tempId?true:false;
			this.initBtn();
			if(!this.selObj && this.isEdit){
				this.editTemplate();
			}else{
				this.setDefault();//设置默认选中
				this.getData();//请求数据
				this.getCategoryList();
				this.getWarehouseList();//获取仓库列表
			}
		},
		destroyed(){
			this.stopRepeat();
		},
		methods: {
			//表格单击事件-点击单行都可以选择checkbox
			rowClick(res){
				if(!this.storeAll){
					res.selected = !res.selected;
					this.listHandle(res);
				}
			},
			indexMethod(index){
				return this.pageShow*(this.page-1)+index+1;
			},
			initBtn() {
				let arr = [
					{name: '取消',className: 'info',type:4,
						fn: () => {
							if(!this.selObj && this.isEdit){
								window.history.go(-1);
							}else{
								let objStr = JSON.stringify(this.selObj.search);
								if(!this.selObj.list.length && objStr=='{}' && !this.selObj.storeAll){
									window.history.go(-1);
								}else{
									this.$store.commit('setPageTools', []);
									this.$emit('emit',false);
								}
							}
						}
					},
					{name: '保存模板',className: 'success',type:4,
						fn: () => {
							this.saveModel();
						}
					},
				];
				if(this.selObj || !this.isEdit){
					arr.push({name: '确定',className: 'primary',type:4,
						fn: () => {
							this.veriConfirmClick();
						}
					});
				}
				this.$store.commit('setPageTools', arr);
			},
			veriConfirmClick(){
				this.selList = this.selectItem.map((res)=>{
					return res.item;
				});
				if(this.isUpdateZero && !this.selList.length && !this.storeAll){
					this.$confirm('未选中的商品库存将消耗至0，减少量日志记录为批盘消耗量（未选中任何物料，直接盘库，该操作15分钟只能生效一次）', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.checkMatSubmit();
					}).catch(()=>{
						//
					});
				}else{
					this.confirmClick();
				}
			},
			confirmClick(){//确认选中
				this.selList = this.selectItem.map((res)=>{
					return res.item;
				});
				if(!this.isUpdateZero && !this.selList.length && !this.storeAll){
					this.myAlert('请选择物料');
					return;
				}
				let obj={
					list:this.selList,//选中的列表
					search:this.searchObj,//筛选条件
					storeAll:this.storeAll,//是否全选
					isUpdateZero:this.isUpdateZero,
				};
				this.$store.commit('setPageTools', []);
				this.$emit('emit',obj);
			},
			//不填写数量直接提交
			checkMatSubmit(){
				http.GoodsinventoryBatchSetMaterialInventory({data:{
					type:1,
					data:[],
					isUpdateZero:Number(this.isUpdateZero),
				}}).then(data => {
					let taskId = data;
					this.loading = true; //开始加载动画
					//轮询请求taskId
					this.timerId = Timer.add(() => {
						http.taskInfo({data: {taskId:taskId}})
							.then(data => {
								if (data.status == 3) {
									//轮询完成
									Timer.clear(this.timerId);
									
									this.$message({message: '物料盘库成功！',type: 'success'});
									delete this.$route.query.id;
									this.$router.push({path:'/admin/materialCountHistory',query:this.$route.query});
								} else if (data.status == 2) {
									//失败
									this.stopRepeat();
									this.$message({message: `请求失败，请重试！`,type: 'error'});
								}
							});
					},1000,600,false,() => {
						this.stopRepeat();
						this.$message({message: `请求超时，请重试！`,type: 'error'});
					});
				});
			},
			stopRepeat(){//停止轮询
				Timer.clear(this.timerId);
				this.loading = false; //停止加载动画
			},
			async editTemplate(){//编辑模板
				let data = await http.getInventoryMaterialTemplate({data:{
					id:this.tempId,
				}});
				let wids = data.content.wids;
				let aids = data.content.aids;
				this.wid = wids?wids.join(','):'';
				this.areaId = aids?aids.join(','):'';
				this.modelName = data.name;
				this.sortOneId = data.content.c1;
				this.sortTwoId = data.content.c2;
				this.cid = this.sortTwoId?this.sortTwoId:this.sortOneId;
				this.selectItem = data.content.items;
				this.isUpdateZero = data.content.isUpdateZero==1;
				this.materialName = data.content.materialName;
				this.barCode = data.content.barCode;
				if(!this.selectItem.length){
					this.storeAll = true;
				}else{
					this.useList = data.content.items.map((res)=>{
						return {mid:res.mid,areaId:res.aid};
					});
					this.getUseList();
				}
				this.getData();//请求数据
				this.getCategoryList();//获取分类
				this.getWarehouseList();//获取仓库列表
			},
			async getUseList(){//根据物料id,区域id获取物料列表
				let data = await http.getListByMidsAndAreaId({data:{
					param:this.useList,
				}});
				this.selList = data;
			},
			setDefault(){//设置默认选中
				for(let key in this.selObj.search){
					this[key] = this.selObj.search[key];
				}
				this.storeAll = this.selObj.storeAll;
				this.isUpdateZero = this.selObj.isUpdateZero;
				if(!this.storeAll) this.selList = this.selObj.list;
				this.modelName = this.selObj.name;
				this.selectItem = this.selList.map((res)=>{
					return {item:res,mid:res.id,aid:res.areaId};
				});
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			nameWinEmit(res,name){
				this.nameWinShow = false;
				if(res=='ok'){
					this.modelName = name;
					if(this.tempId){
						this.editModel();
					}else{
						this.addModel();
					}
				}
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
				this.sortOne = one;
				this.cidSel = this.sortTwoId?[this.sortOneId,this.sortTwoId]:[this.sortOneId];
			},
			getSortSel(res){
				if(res.length>1){
					this.sortOneId = res[0];
					this.sortTwoId = res[1];
					this.cid = res[1];
				}else{
					this.sortOneId = res[0];
					this.sortTwoId = '';
					this.cid = res[0];
				}
			},
			async getWarehouseList(){//获取仓库列表
				let data = await http.warehouseWarehouseList();
				let list = [];
				for(let item of data){
					if(this.isBrand){//品牌仓库
						if(!Number(item.shopId) && this.shopId==item.brandId){
							list.push(item);
						}
					}else{//单店/无品牌单店仓库
						if(this.shopId==item.shopId){
							list.push(item);
						}
					}
				}
				this.wareList = list;
				this.setWareDefault();
			},
			selWare(res,saveArea){//选择仓库
				this.wid = '';
				if(!saveArea) this.areaId = '';
				this.areaList = [];
				let widArr=[];
				for(let item of res){
					if(item.selected==true){
						widArr.push(item.id);
						let arr = item.area.map((res)=>{
							return {id:res.id,name:`${item.name} / ${res.areaName}`};
						});
						this.areaList.push(...arr);
					}
				}
				this.wid = widArr.join(',');
			},
			selArea(res){//选择区域
				this.areaId = '';
				let aidArr = [];
				for(let item of res){
					if(item.selected==true){
						aidArr.push(item.id);
					}
				}
				this.areaId = aidArr.join(',');
			},
			setWareDefault(){//设置仓库-区域默认选中
				if(this.wid){
					let widArr = this.wid.split(',');
					let wList = utils.deepCopy(this.wareList);
					for(let item of wList){
						for(let wid of widArr){
							if(item.id==wid){
								item.selected=true;
							}
						}
					}
					this.wareList = wList;
					this.selWare(this.wareList,true);
				}
				if(this.areaId){
					let aidArr = this.areaId.split(',');
					let aList = utils.deepCopy(this.areaList);
					for(let item of aList){
						for(let aid of aidArr){
							if(item.id==aid){
								item.selected=true;
							}
						}
					}
					this.areaList = aList;
					this.selArea(this.areaList);
				}
			},
			setCate(arr){//设置分类
				let cateName = [];
				for(let item of arr){
					cateName.push(item.name);
				}
				return cateName.join(', ');
			},
			setSuprlus(num,unit){//换算库存数量
				let def='',min='',value=1;
				for(let item of unit){
					if(item.isMin == 1){//最小单位
						min = item.name;
						if(item.isDefault == 1){//默认单位
							def = item.name;
							value = item.value;
						}
					}else if(item.isDefault == 1){//默认单位
						def = item.name;
						value = item.value;
					}
				}
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				return global.comUnit(num,value,def,min);
			},
			myAlert(content) {
				this.$message({message: content,type: 'error'});
			},
			setSendObj(isEdit){//设置发送数据 新建/修改 模板公用
				if(this.storeAll){
					this.selectItem = [];
				}
				let obj={
					name: this.modelName,
					userName:this.userName,
					wids : this.wid?this.wid.split(','):'',
					aids : this.areaId?this.areaId.split(','):'',
					c1: this.sortOneId,
					c2: this.sortTwoId,
					items: this.selectItem,
					isUpdateZero:Number(this.isUpdateZero),
					materialName:this.materialName,
					barCode:this.barCode,
				};
				if(isEdit){
					obj.id = this.tempId;
				}
				return obj;
			},
			saveModel(){//保存模板
				if(!this.selectItem.length && !this.storeAll){
					this.myAlert('模板内容不能为空');
					return;
				}
				this.nameWinShow = true;
				if(this.modelName){
					this.modelTitle = '修改模板';
				}else{
					this.modelTitle = '新建模板';
				}
			},
			async addModel(){
				let sendObj = this.setSendObj();
				let data = await http.addInventoryMaterialTemplate({data:
					sendObj
				});
				if(data){
					this.tempId = data;
					this.toModelTemplate('模板新建成功，是否直接跳转到模板列表？');
				}
			},
			async editModel(){
				let sendObj = this.setSendObj(true);
				let data = await http.editInventoryMaterialTemplate({data:
					sendObj
				});
				if(data){
					if(!this.selObj && this.isEdit){
						this.$message({message:'模板修改成功！',type:'success'});
						delete this.$route.query.id;
						this.$router.push({path:'/admin/materialCountTemplate',query:this.$route.query});
					}else{
						this.toModelTemplate('模板修改成功，是否直接跳转到模板列表？');
					}
				}
			},
			toModelTemplate(content){
				this.$confirm(content, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'success'
				}).then(() => {
					delete this.$route.query.id;
					this.$router.push({path:'/admin/materialCountTemplate',query:this.$route.query});
				}).catch(()=>{
					//
				});
			},
			async getData() {//获取物料列表
				let data = await http.materialGetListByArea({data:{
					page: this.page,
					num: this.pageShow,
					name: this.materialName,
					cid: this.cid>0?this.cid:'',
					wid : this.wid,
					areaId : this.areaId,
					type: -1,
					barCode:this.barCode,
				}});
				this.searchObj = {
					cid: this.cid,
					sortOneId: this.sortOneId,
					sortTwoId: this.sortTwoId,
					wid : this.wid,
					areaId : this.areaId,
					materialName: this.materialName,
					barCode:this.barCode,
				};
				this.list = this.setAlready(data.list);
				this.listLength = data.count;
				this.pageTotal = data.total;
				this.pageAllLight();
			},
			setAlready(list){//设置已经选中过的数据
				for(let item of list){
					if(this.storeAll){//如果已经全选-则默认每页全部选中
						item.selected = true;
					}else{
						let isSelId=false;
						for(let selId of this.selectItem){
							if(selId.mid==item.id && selId.aid==item.areaId){
								isSelId = true;
								break;
							}
						}
						if(isSelId) item.selected = true;
						else item.selected = false;
					}
				}
				return list;
			},
			checkSelect(list,dom){
				if(!this[list].length){
					this.$refs[dom].sortShow = false;
					if(dom=='towSortDom'){
						if(this.sortOneId){
							this.$message({message: '没有二级分类!',type: 'error'});
						}else{
							this.$message({message: '请选择一级分类!',type: 'error'});
						}
					}else{
						this.$message({message: '请先选择仓库！',type: 'error'});
					}
				}
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.clearList();
				this.getData();
			},
			reset() { //重置
				let arr = ['materialName','cid','wid','areaId','sortOneId','sortOneId','barCode'];
				for(let item of arr){
					this[item] = '';
				}
				this.page = 1;
				this.pageShow = 10;
				this.clearListSel(this.wareList,'wareList');
				this.areaList = [];
				this.cidSel = [''];
				this.clearList();
				this.getData();
			},
			//筛选-重置 清空选中项
			clearList(){
				this.selectItem = [];
				this.storeAll = false;
				this.pageAll = false;
			},
			clearListSel(list,name){
				let arr = utils.deepCopy(list);
				for(let item of arr){
					item.selected = false;
				}
				this[name] = arr;
			},
			pageChange(res) { //分页 获取页数
				this.page = res;
				this.getData();
			},
			listHandle(thisItem) { //列表操作,点击单个radio按钮
				this.setSelList(thisItem,thisItem.selected);
				this.pageAllLight();
			},
			//点亮 全选本页
			pageAllLight(){
				let num=0;
				for(let item of this.list){
					if(item.selected===true){
						num++;
					}
				}
				this.pageAll = !this.storeAll && num && num==this.list.length;
			},
			//全选 全选本页
			radioAll(type){
				if(!this.list.length) return;
				if(type=='store'){//全选
					this.pageAll = false;//如果点击全选，重置全选本页
					for(let item of this.list){
						item.selected = this.storeAll;
					}
					this.selectItem = [];
				}else if(type=='page'){//全选本页
					for(let item of this.list){
						this.setSelList(item,this.pageAll);
					}
				}
			},
			//存储选中列表
			setSelList(item,isAdd){
				if(isAdd){//添加
					let isEqual = false;
					for(let sel of this.selectItem){
						if(item.id==sel.mid && item.areaId==sel.aid){
							isEqual = true;
							break;
						}
					}
					if(!isEqual){//防止重复添加
						this.selectItem.push({
							item:item,
							mid:item.id,
							aid:item.areaId
						});
						item.selected = true;
					}
				}else{//移除
					for(let i=0;i<this.selectItem.length;i++){
						let sel = this.selectItem[i];
						if(item.id==sel.mid && item.areaId==sel.aid){
							this.selectItem.splice(i,1);
							item.selected = false;
							i--;
						}
					}
				}
			},
		}
	};
</script>

<style lang="less" scoped>
	.bom-order {
		.el-checkbox+.el-checkbox{margin-left: 20px;}
		.check-slot{height: 40px;line-height: 40px;display: inline-block;}
		.list{
			padding: 20px 0;
			.list-head{
				border: 1px solid #ebeef5;border-bottom: 0;
				padding: 0 20px;height: 50px;line-height: 50px;font-size: 14px;
				em{
					color: #E1BB4A;padding: 0 2px;font-size: 14px;
				}
				.check-div{
					float: right;
					height: 49px;
					line-height: 49px;
					.check-icon{
						margin-left: 10px;
						color: #666;
					}
				}
			}
		}
		.filter {
			.inline-box {
				display: inline-block;
				vertical-align: middle;
				padding-top: 10px;
				margin-right: 10px;
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
				.blue {
					margin-right: 10px;
				}
			}
			.inline-span {
				display: inline-block;
				padding: 0 5px;
			}
		}
	}
</style>