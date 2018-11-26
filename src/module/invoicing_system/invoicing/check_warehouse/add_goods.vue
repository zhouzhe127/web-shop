<!--
    **批量盘库-选择商品
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<div class="inline-box">
				<el-input placeholder="请输入商品名" v-model="goodsName"></el-input>
			</div>
			<div class="inline-box">
				<el-input placeholder="请输入条形码" v-model="barCode"></el-input>
				<!--<input type="text" placeholder="请输入副条形码" v-model="secBarCode" />-->
			</div>
			<div class="inline-box">
				<el-select v-model="type" placeholder="请选择商品类型">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="inline-box">
				<select-store @emit="selWare" :sorts="wareList" :tipName="'请选择仓库'" ></select-store>
			</div>
			<div class="inline-box" @click="checkSelect">
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
				商品列表 · 共<em>{{listLength}}</em>个条目， 
				<template v-if="storeAll">已选择：全部</template>
				<template v-else>
					已选择:<em>{{this.selectItem.length}}</em>个
				</template>
			</div>
			<el-table :data="list" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
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
				<el-table-column prop="name" label="商品名" min-width="200">
				</el-table-column>
				<el-table-column prop="barCode" label="条形码" min-width="200">
				</el-table-column>
				<el-table-column label="所属仓库" width="150">
					<template slot-scope="scope">
						{{scope.row.warehouse}} / {{scope.row.warehouseArea}}
					</template>
				</el-table-column>
				<el-table-column label="售价" min-width="200">
					<template slot-scope="scope">
						{{scope.row.price}}{{scope.row.unit?'/'+scope.row.unit:''}}
					</template>
				</el-table-column>
				<el-table-column label="商品类型" width="200">
					<template slot-scope="scope">
						{{goodsTypeObj[scope.row.type]}}
					</template>
				</el-table-column>
				<el-table-column label="库存数量/重量" width="200">
					<template slot-scope="scope">
						{{scope.row.surplus}}{{scope.row.unit}}
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
				type: Number,   				//商品类型 0普通商品，1称重商品
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
	export default {
		data() {
			return {
				userName: '', //用户名
				tempId:'',//模板id
				shopId:'',//店铺id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				options: [//商品类型 显示
					{label:'全部商品类型',value:'',},
					{label:'普通商品',value:1,},
					{label:'称重商品',value:2,},
				], 
				bomTypeList: ['', 0, 1], //商品类型List
				type: '', //商品类型 是否公开 0普通 1称重
				bomTypeIndex: 0, //当前下拉框index
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				goodsName: '', //商品名称
				barCode:'',//条形码
				secBarCode:'',//副条码
				wid:'',//仓库id
				areaId:'',//区域id
				modelName:'',//模板弹窗-名称
				modelTitle:'保存模板',//模板弹窗-标题
				nameWinShow:false,//是否显示模板名称弹框
				titleList: [
					{titleName: '操作',titleStyle:{width:200+'px',}},
					{titleName:'序号'},
					{titleName: '商品名',dataName: 'name'},
					{titleName: '条形码',dataName: 'barCode'},
					{titleName:'所属仓库'},
					{titleName: '售价'},
					{titleName:'商品类型'},
					{titleName:'库存数量/重量'},
					{titleName:'批次数量',dataName:'batch'},
				],
				goodsTypeObj:{
					0:'普通商品',
					1:'称重商品',
				},
				storeAll:false,//全选
				pageAll:false,//全选本页
				selectItem:[],//保存零散选中的所有id,
				wareList:[],//仓库列表
				areaList:[],//区域列表
				selList:[],//选中的列表
				searchObj:{},//筛选条件
				isEdit:false,//是否编辑模板
				useList:[],
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
				this.getWarehouseList();//获取仓库列表
			}
		},
		methods: {
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
									this.$emit('emit',false);
								}
							}
						}
					},
					{name: '保存模板',className: 'primary',type:4,
						fn: () => {
							this.saveModel();
						}
					},
				];
				if(this.selObj || !this.isEdit){
					arr.push({name: '确定',className: 'primary',type:4,
						fn: () => {
							this.confirmClick();
						}
					});
				}
				this.$store.commit('setPageTools', arr);
			},
			confirmClick(){//确认选中
				this.selList = this.selectItem.map((res)=>{
					return res.item;
				});
				if(!this.selList.length && !this.storeAll){
					this.myAlert('请选择商品');
					return;
				}
				let obj={
					list:this.selList,//选中的列表
					search:this.searchObj,//筛选条件
					storeAll:this.storeAll,//是否全选
				};
				this.$emit('emit',obj);
			},
			async editTemplate(){//编辑模板
				let data = await http.templateGetInventoryGoodsTemplate({data:{
					id:this.tempId,
				}});
				let wids = data.content.wids;
				let aids = data.content.aids;
				this.wid = wids?wids.join(','):'';
				this.areaId = aids?aids.join(','):'';
				this.modelName = data.name;
				this.type = data.content.type;
				this.selectItem = data.content.items;
				if(!this.selectItem.length){
					this.storeAll = true;
				}else{
					this.useList = data.content.items.map((res)=>{
						return {gid:res.gid,areaId:res.aid};
					});
					this.getUseList();
				}
				this.getData();//请求数据
				this.getWarehouseList();//获取仓库列表
			},
			async getUseList(){//根据商品id,区域id获取商品列表
				let data = await http.GoodsInventoryGetGoodsInventoryListByGids({data:{
					param:this.useList,
				}});
				this.selList = data;
			},
			setDefault(){//设置默认选中
				for(let key in this.selObj.search){
					this[key] = this.selObj.search[key];
				}
				this.storeAll = this.selObj.storeAll;
				if(!this.storeAll) this.selList = this.selObj.list;
				this.modelName = this.selObj.name;
				this.selectItem = this.selList.map((res)=>{
					return {item:res,gid:res.gid,aid:res.areaId};
				});
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			nameWinEmit(res,name){
				this.nameWinShow = false;
				if(res=='ok'){
					if(!name.trim()){
						this.myAlert('模板名称不能为空');
						return;
					}
					this.modelName = name;
					if(this.tempId){
						this.editModel();
					}else{
						this.addModel();
					}
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
			checkSelect(){//选择区域验证
				if(!this.areaList.length){
					this.$refs.areaDom.sortShow = false;
					this.myAlert('请先选择仓库！');
				}
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
					type: this.type,
					wids : this.wid?this.wid.split(','):'',
					aids : this.areaId?this.areaId.split(','):'',
					items: this.selectItem,
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
				let data = await http.addInventoryGoodsTemplate({data:
					sendObj
				});
				if(data){
					this.tempId = data;
					this.toModelTemplate('模板新建成功，是否直接跳转到模板列表？');
				}
			},
			async editModel(){
				let sendObj = this.setSendObj(true);
				let data = await http.editInventoryGoodsTemplate({data:
					sendObj
				});
				if(data){
					if(!this.selObj && this.isEdit){
						this.myAlert('模板修改成功！');
						delete this.$route.query.id;
						this.$router.push({path:'/admin/goodsCountTemplate',query:this.$route.query});
					}else{
						this.toModelTemplate('模板修改成功，是否直接跳转到模板列表？');
					}
				}
			},
			toModelTemplate(content){
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '操作提示',
					content: content,
					callback: (res) => {
						if (res == 'ok') {
							delete this.$route.query.id;
							this.$router.push({path:'/admin/goodsCountTemplate',query:this.$route.query});
						}
					},
				});
			},
			async getData() {//获取商品列表
				let data = await http.GoodsinventoryGetGoodsInventoryList({data:{
					page: this.page,
					num: this.pageShow,
					goodsName: this.goodsName,
					barCode: this.barCode,
					secBarCode: this.secBarCode,
					type: this.type,
					wid : this.wid,
					areaId : this.areaId,
				}});
				this.searchObj = {
					type: this.type,
					wid : this.wid,
					areaId : this.areaId,
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
							if(selId.gid==item.gid && selId.aid==item.areaId){
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
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.clearList();
				this.getData();
			},
			reset() { //重置
				let arr = ['goodsName','barCode','wid','areaId'];
				for(let item of arr){
					this[item] = '';
				}
				this.page = 1;
				this.bomTypeIndex = 0;
				this.pageShow = 10;
				this.type = '';
				let list = utils.deepCopy(this.wareList);
				for(let item of list){
					item.selected = false;
				}
				this.wareList = list;
				this.areaList = [];
				this.clearList();
				this.getData();
			},
			//筛选-重置 清空选中项
			clearList(){
				this.selectItem = [];
				this.storeAll = false;
				this.pageAll = false;
			},
			pageChange(res) { //分页 获取页数
				this.page = res;
				this.getData();
			},
			listHandle(thisItem) { //列表操作,点击单个radio按钮
				this.setSelList(thisItem,thisItem.selected);
				this.pageAllLight();
			},
			//点亮-全选本页
			pageAllLight(){
				let num=0;
				for(let item of this.list){
					if(item.selected===true){
						num++;
					}
				}
				this.pageAll = !this.storeAll && num==this.list.length;
			},
			//全选,全选本页
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
						if(item.gid==sel.gid && item.areaId==sel.aid){
							isEqual = true;
							break;
						}
					}
					if(!isEqual){//防止重复添加
						this.selectItem.push({
							item:item,
							gid:item.gid,
							aid:item.areaId
						});
						item.selected = true;
					}
				}else{//移除
					for(let i=0;i<this.selectItem.length;i++){
						let sel = this.selectItem[i];
						if(item.gid==sel.gid && item.areaId==sel.aid){
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
			}
		}
		.filter {
			.inline-box {
				display: inline-block;
				vertical-align: middle;
				padding-top: 10px;
				margin-right: 10px;
				.search-btn {
					float: left;
					height: 40px;
					width: 40px;
					cursor: pointer;
					background: url(../../../../res/images/search.png)#29abe2 center no-repeat;
				}
				input {
					width: 180px;
					height: 40px;
					padding: 0 10px;
					font-size: 14px;
					margin-right: 10px;
					&:focus {
						outline: none;
					}
					&:last-child{margin-right: 0;}
				}
				.select-body-btn{margin-right: 10px;}
			}
			.date-box {
				.calendar {
					float: left;
				}
				&:after {
					content: '';
					zoom: 1;
					clear: both;
					display: block;
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