<!--
    **品牌指派-选择bom指派
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<div class="inline-box">
				<input type="text" placeholder="请输入创建人" v-model="createName" />
				<input type="text" placeholder="请输入商品名称/编码" v-model="gName" />
				<input type="text" placeholder="请输入bom单编号" v-model="bomNum" />
			</div>
			<div class="inline-box">
				<selectBtn @emit="dropBomType" :sorts="options" :index="bomTypeIndex"></selectBtn>
			</div>
			<div class="inline-box">
				<div class="button-box">
					<span class="blue" @click="filter">筛选</span>
					<span class="gray" @click="reset">重置</span>
				</div>
			</div>
		</div>
		<com-table :listName="'BOM单列表'" :titleData="titleList" :allTotal="listLength" :introData="list" :listHeight="70">
			<div slot="title-0" slot-scope="props" class="select-all select-ban">
				<span @click="radioAll('store')">{{storeAll?'取消本店':'全选本店'}}</span>|
				<span class="page-all" :class="{ban:storeAll}" @click="radioAll('page')">{{pageAll?'取消本页':'全选本页'}}</span>
			</div>
			<span class="detail select-ban" slot="con-0" slot-scope="props" @click="listHandle(props.index)">
				<i :class="{'sel-active':props.data.selected,storeAll:storeAll}"></i>
			</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
			<span slot="con-4" slot-scope="props">{{formatTime(props.data.createTime)}}</span>
			<span slot="con-6" slot-scope="props">{{setBomType(props.data.isPublic)}}</span>
		</com-table>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				cid: '', //用户id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				selectedType: 0,
				options: ['全部BOM单类型', '公开', '私密'], //bom单类型 显示
				bomTypeList: [0, 1, -1], //bom单类型List
				isPublic: 0, //bom单类型 是否公开 1公开 -1私密
				bomTypeIndex: 0, //当前下拉框index
				prevIndex: 0, //上一个下拉框index
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				createName: '', //用户名称
				shopType: '', //店铺类型
				bomNum: '', //bom单编号
				gName: '', //商品名称
				titleList: [
					{titleName: '操作',titleStyle:{width:200+'px',}},
					{titleName:'序号'},
					{titleName: '商品名称',dataName: 'itemName'},
					{titleName: '创建人',dataName: 'createName'},
					{titleName:'创建时间'},
					{titleName: 'BOM单编号',dataName: 'bomNum'},
					{titleName:'BOM类型'},
				],
				storeAll:false,//全选本店
				pageAll:false,//全选本页
				savePage:[],//保存全选本页的页数，翻页以后还能选中
				selectBom:[],//保存零散选中的所有id,
				selNum:0,//每一页已选中条目的数量
			};
		},
		props:['isAll','selBom'],
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.cid = this.userData.user.id;
		},
		mounted() {
			this.initBtn();
			this.setDefault();//设置默认选中
			this.getData();//请求数据
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '确定',style: 'background: #fe8d01;border: 1px solid #fe8d01;color: #fff;',
						fn: () => {
							this.$emit('emit',this.selectBom,this.storeAll);
						}
					},
					{name: '取消',style: 'background: #b3b3b3;border: 1px solid #b3b3b3;color: #fff;',
						fn: () => {
							this.$emit('emit',false);
						}
					},
				];
				this.$store.commit('setPageTools', arr);
			},
			setDefault(){//设置默认选中
				if(this.isAll){//默认全选
					this.storeAll = true;
				}else{
					this.selectBom = this.selBom;
				}
			},
			dropBomType(index) { //获取bom类型
				this.isPublic = this.bomTypeList[index];
				this.bomTypeIndex = index;
				this.filter();
			},
			setBomType(type) {
				if (type == '1') {
					return '公开';
				} else if (type == '-1') {
					return '私密';
				}
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.getData();
			},
			async getData() {
				let data = await http.bomBillmaterialGetBomList({
					data: {
						createUid: this.cid,
						startTime: '',
						endTime: '',
						page: this.page,
						num: this.pageShow,
						createName: this.createName,
						shopType: this.shopType,
						isPublic: this.isPublic,
						bomNum: this.bomNum,
						gName: this.gName,
					}
				});
				if (!data) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '您没有权限查看私密bom单！'
					});
					return;
				}
				let havePage=false;//本页 是否在页码数组中
				for(let item of data.list){
					if(this.storeAll){//如果已经全选本店-则默认每页全部选中
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
							for(let selId of this.selectBom){
								if(selId.id==item.id){
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
				this.list = data.list;
				this.listLength = data.totalCount;
				this.pageTotal = data.totalPage;
				this.setSelNum();
			},
			setSelNum(){//设置本页选中数量
				for(let item of this.list){
					if(item.selected==true){
						this.selNum++;
					}
				}
			},
			reset() { //重置
				let arr = ['createName','gName','bomNum'];
				for(let item of arr){
					this[item] = '';
				}
				this.page = 1;
				this.bomTypeIndex = 0;
				this.pageShow = 10;
				this.isPublic = 0;
				this.getData();
			},
			pageChange(obj) { //分页 获取页数
				this.page = obj.page;
				this.pageShow = obj.num;
				this.getData();
			},
			listHandle(index) { //列表操作,点击单个radio按钮
				let thisList = this.list[index];
				if(!this.storeAll){//非全选本店状态，才能操作单个按钮
					thisList.selected = !thisList.selected;
					if(thisList.selected){//选中
						this.selectBom.push({id:thisList.id,name:thisList.itemName});
						this.selNum++;//本页已选中+1
						if(this.selNum==this.list.length){//选满一页，自动变为全选本页状态
							this.savePage.push(this.page);
							this.pageAll = true;
						}
					}else{//取消
						this.selNum--;//本页已选中-1
						for(let i=0;i<this.selectBom.length;i++){
							if(this.selectBom[i].id==thisList.id){
								this.selectBom.splice(i,1);
								i--;
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
				if(type=='store'){//全选本店
					this.storeAll = !this.storeAll;
					this.pageAll = false;//如果点击全选本店，重置全选本页
					this.setSelAll(this.storeAll);
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
						for(let sel of this.selectBom){
							if(item.id==sel.id){
								isEqual = true;
								break;
							}
						}
						if(!isEqual){
							this.selectBom.push({id:item.id,name:item.itemName});
							item.selected = true;
						}
					}
				}else if(type=='cancel'){
					for(let item of this.list){
						for(let i=0;i<this.selectBom.length;i++){
							let id = this.selectBom[i].id;
							if(id==item.id){
								this.selectBom.splice(i,1);
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
					this.selectBom = [];//清空选中id
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