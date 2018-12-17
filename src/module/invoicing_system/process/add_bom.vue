<!--
    **新建加工-选择加工bom单
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<div class="inline-box">
				<input type="text" placeholder="请输入物料名" v-model="material" />
			</div>
			<div class="inline-box">
				<input type="text" placeholder="请输入物料编码" v-model="barCode" />
			</div>
			<div class="inline-box">
				<el-select v-model="matType" placeholder="请选择bom单类型" style="width:210px;">
				    <el-option
						v-for="item in matTypeList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="inline-box">
				<select-store @emit="selSortOne" :sorts="sortOne" :tipName="'请选择一级分类'" :isSingle="true"></select-store>
			</div>
			<div class="inline-box" @click="checkSelect">
				<select-store @emit="selSortTwo" :sorts="sortTwo"  :tipName="'请选择二级分类'" :isSingle="true" ref="towSortDom"></select-store>
			</div>
			<div class="inline-box">
				<div class="button-box">
					<span class="blue" @click="filter">筛选</span>
					<span class="gray" @click="reset">重置</span>
				</div>
			</div>
		</div>
		<com-table :listName="'加工bom单列表'" :titleData="titleList" :allTotal="listLength" :introData="list" :listHeight="70" :listWidth="1200">
			<div slot="title-0" slot-scope="props" class="select-all select-ban">
				<span @click="radioAll('store')">{{storeAll?'取消全选':'全选'}}</span>
				<i>|</i>
				<span class="page-all" :class="{ban:storeAll}" @click="radioAll('page')">{{pageAll?'取消本页':'全选本页'}}</span>
			</div>
			<span class="detail select-ban" slot="con-0" slot-scope="props" @click="listHandle(props.index)">
				<i :class="{'sel-active':props.data.selected,storeAll:storeAll}"></i>
			</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
			<!--物料类型-->
			<span slot="con-4" slot-scope="props">{{matTypeHash[props.data.mType]}}</span>
			<!--物料分类-->
			<span slot="con-5" slot-scope="props">{{setCate(props.data.cate)}}</span>
			<!--所需物料-->
			<span slot="con-6" slot-scope="props">{{props.data.kindNum}}种</span>
			<!--加工bom单类型-->
			<span slot="con-7" slot-scope="props">{{typeHash[props.data.type]}}</span>
		</com-table>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
		</div>
	</div>
</template>

<script>
	/*
	 * 抛出一个对象{}  父组件使用  @emit="" 接收
		{
			list:[],  Array 					//选中的列表
			search:{							//筛选条件集合{}
				cid: Number,   					//商品类型 0普通商品，1称重商品
				matType: Number,				//bom单物料类型
				sortOneId: Number,				//一级分类id
				sortTwoId: Number,				//二级分类id
				page: Number,					//当前页
				num: Number,					//每页显示
				material: Number,				//物料名称搜索
			},
			storeAll: Boolean					//是否全选
		} 
	*/
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	
	export default {
		data() {
			return {
				userName: '', //用户名
				shopId:'',//店铺id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				material: '', //物料名称
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
					{titleName: '物料编码',dataName: 'barCode'},
					{titleName: '物料类型',},
					{titleName:'物料分类'},
					{titleName: '所需物料'},
					{titleName: '加工bom单类型'},
				],
				matTypeList:[
					{value:'-1',label:'全部'},
					{value:'0',label:'成品 '},
					{value:'1',label:'半成品 '},
					{value:'2',label:'普通物料 '},
				],
				matType:'-1',
				matTypeHash:{
					'-1':'全部',
					'0':'成品',
					'1':'半成品',
					'2':'普通物料'
				},
				typeHash:{
					0:'手动',
					1:'自动',
				},
				storeAll:false,//全选
				pageAll:false,//全选本页
				savePage:[],//保存全选本页的页数，翻页以后还能选中
				selectItem:[],//保存零散选中的所有id,
				selNum:0,//每一页已选中条目的数量
				selList:[],//选中的列表
				searchObj:{},//筛选条件
				sortOne:[],//一级分类
				sortTwo:[],//二级分类
				allSort:[],//总分类列表
				sortOneId:'',//一级分类id
				sortTwoId:'',//二级分类id
				isEdit:'',//是否编辑模板
				useList:[],
				barCode:'',//物料编码
			};
		},
		props:[
			'selObj', 	//对应抛出时的对象
		],
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.userName = this.userData.user.name;
			this.shopId = this.userData.currentShop.id;
			this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		},
		mounted() {
			this.initBtn();
			//this.setDefault();//设置默认选中
			this.getData();//请求数据
			this.getCategoryList();
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '确定',style: 'background: #fe8d01;border: 1px solid #fe8d01;color: #fff;',
						fn: () => {
							this.confirmClick();
						}
					},
					{name: '取消',style: 'background: #b3b3b3;border: 1px solid #b3b3b3;color: #fff;',
						fn: () => {
							this.$emit('emit',false);
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
			setDefault(){//设置默认选中
				for(let key in this.selObj.search){
					this[key] = this.selObj.search[key];
				}
				this.storeAll = this.selObj.storeAll;
				if(!this.storeAll) this.selList = this.selObj.list;
				this.modelName = this.selObj.name;
				this.selectItem = this.selList.map((res)=>{
					return {mid:res.id,aid:res.areaId};
				});
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.getData();
			},
			checkSelect(){
				if(!this.sortTwo.length){
					this.$refs.towSortDom.sortShow = false;
					if(this.sortOneId){
						this.$message({message: '没有二级分类!',type: 'error'});
					}else{
						this.$message({message: '请选择一级分类!',type: 'error'});
					}
				}
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
			setCate(arr){//设置分类
				if(arr && arr.length){
					let cateName = [];
					for(let item of arr){
						cateName.push(item.name);
					}
					return cateName.join(', ');
				}
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
				this.$store.commit('setWin', {
					title: '操作提示',
					content: content,
				});
			},
			async getData() {//获取bom单列表
				let data = await http.ProcessbomGetProcessList({data:{
					page: this.page,
					num: this.pageShow,
					material: this.material,
					type: this.matType,
					cid: this.cid,
					barCode:this.barCode,
				}});
				this.searchObj = {
					page: this.page,
					num: this.pageShow,
					material: this.material,
					matType: this.matType,
					cid: this.cid,
					sortOneId:this.sortOneId,//一级分类id
					sortTwoId:this.sortTwoId,//二级分类id
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
								if(selId.mid==item.id && selId.aid==item.areaId){
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
				let arr = ['material','cid','sortOneId','sortOneId','barCode'];
				for(let item of arr){
					this[item] = '';
				}
				this.clearListSel(this.sortOne,'sortOne');
				this.sortTwo = [];
				this.matType = '-1';
				this.page = 1;
				this.pageShow = 10;
				this.getData();
			},
			clearListSel(list,name){
				let arr = utils.deepCopy(list);
				for(let item of arr){
					item.selected = false;
				}
				this[name] = arr;
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
						this.selectItem.push({mid:thisList.id,aid:thisList.areaId});
						this.selList.push(thisList);
						this.selNum++;//本页已选中+1
						if(this.selNum==this.list.length){//选满一页，自动变为全选本页状态
							this.savePage.push(this.page);
							this.pageAll = true;
						}
					}else{//取消
						this.selNum--;//本页已选中-1
						for(let i=0;i<this.selectItem.length;i++){
							let mid = this.selectItem[i].mid;
							let aid = this.selectItem[i].aid;
							if(mid==thisList.id && aid==thisList.areaId){
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
							if(item.id==sel.mid && item.areaId==sel.aid){
								isEqual = true;
								break;
							}
						}
						if(!isEqual){
							this.selectItem.push({mid:item.id,aid:item.areaId});
							this.selList.push(item);
							item.selected = true;
						}
					}
				}else if(type=='cancel'){
					for(let item of this.list){
						for(let i=0;i<this.selectItem.length;i++){
							let mid = this.selectItem[i].mid;
							let aid = this.selectItem[i].aid;
							if(mid==item.id && aid==item.areaId){
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
					background: url(../../../res/images/search.png)#29abe2 center no-repeat;
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
				&.sel-active{background: url(../../../res/icon/white_select.png)#28a8e0 center;border: 1px solid #28a8e0;}
				&.storeAll{background: url(../../../res/icon/white_select.png)#999 center;border: 1px solid #999;cursor: not-allowed;}
			}
		}
	}
</style>