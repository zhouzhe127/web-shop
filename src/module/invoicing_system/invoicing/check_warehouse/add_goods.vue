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
				<input type="text" placeholder="请输入商品名" v-model="goodsName" />
				<input type="text" placeholder="请输入条形码" v-model="barCode" />
				<!--<input type="text" placeholder="请输入副条形码" v-model="secBarCode" />-->
			</div>
			<div class="inline-box">
				<selectBtn @emit="dropBomType" :sorts="options" :index="bomTypeIndex"></selectBtn>
			</div>
			<div class="inline-box">
				<select-store @emit="selWare" :sorts="wareList" :tipName="'请选择仓库'" ></select-store>
			</div>
			<div class="inline-box" @click="checkSelect">
				<select-store @emit="selArea" :sorts="areaList" :tipName="'请选择区域'" ref="areaDom"></select-store>
			</div>
			<div class="inline-box">
				<div class="button-box">
					<span class="blue" @click="filter">筛选</span>
					<span class="gray" @click="reset">重置</span>
				</div>
			</div>
		</div>
		<com-table :listName="'商品列表'" :titleData="titleList" :allTotal="listLength" :introData="list" :listHeight="70" :listWidth="1200">
			<div slot="title-0" slot-scope="props" class="select-all select-ban">
				<span @click="radioAll('store')">{{storeAll?'取消全选':'全选'}}</span>
				<i>|</i>
				<span class="page-all" :class="{ban:storeAll}" @click="radioAll('page')">{{pageAll?'取消本页':'全选本页'}}</span>
			</div>
			<span class="detail select-ban" slot="con-0" slot-scope="props" @click="listHandle(props.index)">
				<i :class="{'sel-active':props.data.selected,storeAll:storeAll}"></i>
			</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
			<span slot="con-4" slot-scope="props">{{props.data.warehouse}} / {{props.data.warehouseArea}}</span>
			<span slot="con-5" slot-scope="props">{{props.data.price}}{{props.data.unit?'/'+props.data.unit:''}}</span>
			<span slot="con-6" slot-scope="props">{{goodsTypeObj[props.data.type]}}</span>
			<span slot="con-7" slot-scope="props">{{props.data.surplus}}{{props.data.unit}}</span>
		</com-table>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
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
				options: ['全部商品类型', '普通商品', '称重商品'], //商品类型 显示
				bomTypeList: ['', '0', '1'], //商品类型List
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
				savePage:[],//保存全选本页的页数，翻页以后还能选中
				selectItem:[],//保存零散选中的所有id,
				selNum:0,//每一页已选中条目的数量
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
			initBtn() {
				let arr = [
					{name: '确定',style: 'background: #fe8d01;border: 1px solid #fe8d01;color: #fff;',
						fn: () => {
							this.confirmClick();
						}
					},
					{name: '保存模板',style: 'background: none;border: 1px solid #fe8d01;color: #fe8d01;',
						fn: () => {
							this.saveModel();
						}
					},
					{name: '取消',style: 'background: #b3b3b3;border: 1px solid #b3b3b3;color: #fff;',
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
				];
				if(!this.selObj && this.isEdit){
					arr.splice(0,1);
					arr[0].style = 'background: #fe8d01;border: 1px solid #fe8d01;color: #fff;';
				}
				this.$store.commit('setPageTools', arr);
			},
			confirmClick(){//确认选中
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
				this.setDefaultType();//设置默认商品类型
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
					return {gid:res.gid,aid:res.areaId};
				});
				this.setDefaultType();//设置默认商品类型
			},
			dropBomType(index) { //获取商品类型
				this.type = this.bomTypeList[index];
				this.bomTypeIndex = index;
			},
			setDefaultType(){//设置默认商品类型
				for(let i=0;i<this.bomTypeList.length;i++){
					if(this.bomTypeList[i] === this.type){
						this.bomTypeIndex = i;
					}
				}
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.getData();
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
				console.log(this.wid);
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
					this.myAlert('请选择仓库');
				}
			},
			myAlert(content) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: content,
				});
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
					type: this.type!==''?this.type+1:'',
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
				this.setSelNum();
			},
			setAlready(list){//设置已经选中过的数据
				let havePage = false;//本页 是否在页码数组中
				for(let item of list){
					if(this.storeAll){//如果已经全选-则默认每页全部选中
						item.selected = true;
					}else{
						for(let save of this.savePage){//循环变量选中页码数组
							if(save==this.page){
								havePage = true;
								break;
							}
						}
						if(havePage){//本页在页码数组中 该页全选
							item.selected = true;
						}else{//不在数组中，可能单选了几个，可能全部都未选
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
				}
				if(havePage){//页码数组中 含有选过的页码
					this.pageAll = true;
				}else{
					this.pageAll = false;
				}
				return list;
			},
			setSelNum(){//设置本页选中数量
				for(let item of this.list){
					if(item.selected==true){
						this.selNum++;
					}
				}
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
				this.getData();
			},
			pageChange(obj) { //分页 获取页数
				this.page = Number(obj.page);
				this.pageShow = Number(obj.num);
				this.getData();
			},
			listHandle(index) { //列表操作,点击单个radio按钮
				let thisList = this.list[index];
				if(!this.storeAll){//非全选状态，才能操作单个按钮
					thisList.selected = !thisList.selected;
					if(thisList.selected){//选中
						this.selectItem.push({gid:thisList.gid,aid:thisList.areaId});
						this.selList.push(thisList);
						this.selNum++;//本页已选中+1
						if(this.selNum==this.list.length){//选满一页，自动变为全选本页状态
							this.savePage.push(this.page);
							this.pageAll = true;
						}
					}else{//取消
						this.selNum--;//本页已选中-1
						for(let i=0;i<this.selectItem.length;i++){
							let gid = this.selectItem[i].gid;
							let aid = this.selectItem[i].aid;
							if(gid==thisList.gid && aid==thisList.areaId){
								this.selectItem.splice(i,1);
								this.selList.splice(i,1);
								i--;
								break;
							}
						}
						if(this.pageAll){//本页全选时
							this.removePageNum();
							this.pageAll = false;
						}
					}
				}
			},
			radioAll(type){
				if(!this.list.length) return;
				if(type=='store'){//全选
					this.storeAll = !this.storeAll;
					this.pageAll = false;//如果点击全选，重置全选本页
					this.setSelAll(this.storeAll);
					this.selList = [];
					this.selectItem = [];
				}else if(type=='page'){//全选本页
					if(this.storeAll) return;
					this.pageAll = !this.pageAll;
					if(this.pageAll){//选中该页，加入选中页码数组
						this.savePage.push(this.page);
						this.pageSetId('add');
					}else{//取消该页，移除该页码
						this.removePageNum();
						this.pageSetId('cancel');
					}
				}
			},
			removePageNum(){//在选中的页码组中，移除本页的页码
				for(let i=0;i<this.savePage.length;i++){
					if(this.savePage[i]==this.page){
						this.savePage.splice(i,1);
						i--;
					}
				}
			},
			pageSetId(type){//全选本页，取消全选本页时 设置id
				if(type=='add'){
					for(let item of this.list){
						let isEqual = false;
						for(let sel of this.selectItem){
							if(item.gid==sel.gid && item.areaId==sel.aid){
								isEqual = true;
								break;
							}
						}
						if(!isEqual){
							this.selectItem.push({gid:item.gid,aid:item.areaId});
							this.selList.push(item);
							item.selected = true;
						}
					}
				}else if(type=='cancel'){
					for(let item of this.list){
						for(let i=0;i<this.selectItem.length;i++){
							let gid = this.selectItem[i].gid;
							let aid = this.selectItem[i].aid;
							if(gid==item.gid && aid==item.areaId){
								this.selectItem.splice(i,1);
								this.selList.splice(i,1);
								item.selected = false;
								i--;
								break;
							}
						}
					}
				}
			},
			setSelAll(isSelected){//设置选中样式
				if(isSelected){//选中
					for(let item of this.list){
						item.selected = true;
					}
				}else{//取消
					for(let item of this.list){
						item.selected = false;
					}
					this.selectItem = [];//清空选中id
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.bom-order {
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
		/*标题全选按钮*/
		.select-all{color: #ccc;
			span{color: #28a8e0;display: inline-block;padding: 0 10px;height: 20px;line-height: normal;cursor: pointer;}
			.ban{color: #666;cursor: not-allowed;}
		}
		/*列表-radio按钮*/
		.detail {
			display: inline-block;line-height: normal;padding: 15px;
			cursor: pointer;vertical-align: middle;
			i{height: 20px;width: 20px;display: block;border: 1px solid #ccc;border-radius: 50%;
				&.sel-active{background: url(../../../../res/icon/white_select.png)#28a8e0 center;border: 1px solid #28a8e0;}
				&.storeAll{background: url(../../../../res/icon/white_select.png)#999 center;border: 1px solid #999;cursor: not-allowed;}
			}
		}
	}
</style>