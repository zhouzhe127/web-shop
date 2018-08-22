<!--
    **批量调度-选择调度单
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<div class="inline-box">
				<span>申请时间：</span>
				<el-date-picker
					v-model="timeDate"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					@change="timeChange"
					>
				</el-date-picker>
			</div>
			<div class="inline-box">
				<el-input v-model="userName" placeholder="请输入申请人"></el-input>
			</div>
			<div class="inline-box">
				<div class="button-box">
					<el-button type="success" @click="filter">筛选</el-button>
					<el-button type="info" @click="reset">重置</el-button>
				</div>
			</div>
			<div class="inline-box" v-if="isBrand">
				<span>分销价选择：</span>
				<el-select v-model="allPrice" placeholder="请选择分销价" @change="allPriceFunc" style="width:150px;">
				    <el-option
						v-for="item in priceList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</div>
		</div>
		<com-table :listName="'选择调度列表'" :titleData="titleList" :allTotal="listLength" :introData="list" :listHeight="70" :listWidth="1400">
			<div slot="title-0" slot-scope="props" class="select-all select-ban">
				<span class="page-all" @click="radioAll">{{pageAll?'取消本页':'全选本页'}}</span>
			</div>
			<span class="detail select-ban" slot="con-0" slot-scope="props" @click="radioBtn(props.data)">
				<i :class="{'sel-active':props.data.selected,}"></i>
			</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
			<span slot="con-8" slot-scope="props">
				<el-select v-model="props.data.priceType" placeholder="请选择分销价" @change="(res)=>{priceFunc(res,props.data)}" style="width:150px;">
				    <el-option
						v-for="item in props.data.priceList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</span>
		</com-table>
		<div class="page-box">
			<el-pagination @current-change="pageChange"
				:current-page="page"
				background
				layout="prev, pager, next"
				:page-count="pageTotal">
			</el-pagination>
		</div>
		<div>
			<component
                :is="showCom"
                :pObj="comObj"
                @throwWin="winWarehouse"
            ></component>
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
				showCom:null,
				comObj:{},
				alrWareObj:{},
				startTime:new Date().setHours(0,0,0,0)-30*3600*24*1000,
				endTime:new Date().setHours(23,59,59,0),
				timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
				userName: '', //用户名
				shopId:'',//店铺id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				wid:'',//仓库id
				titleList: [
					{titleName: '操作',titleStyle:{width:150+'px',}},
					{titleName:'序号'},
					{titleName: '审核状态',dataName: 'checkTypeName'},
					{titleName: '调度状态',dataName: 'dispTypeName'},
					{titleName:'申请单号',dataName:'code'},
					{titleName: '申请店铺/品牌',dataName:'shopName'},
					{titleName:'申请人',dataName:'createName'},
					{titleName:'申请时间',dataName:'createTimeStr'},
					{titleName:'分销价选择',titleStyle:{width:200+'px',}},
				],
				goodsTypeObj:{
					0:'普通商品',
					1:'称重商品',
				},
				pageAll:false,//全选本页
				selectItem:{length:0},//保存零散选中的所有id,
				selNum:0,//每一页已选中条目的数量
				selList:[],//选中的列表
				shopList:[],
				checkHash:{
					1:'审核中',
					2:'已取消',
					3:'审核未通过',
					4:'审核通过',
				},
				dispHash:{
					1:'未调度',
					2:'配货中',
					3:'未出货',
					4:'全部取消',
					5:'待入货',
					6:'已完成',
					7:'已完成（异常）',
					8:'配货完成',
				},
				priceList:[],//分销价列表
				allPrice:-2,
			};
		},
		components: {
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
			selWarehouse: () =>
				import( /*webpackChunkName:'choose_warehouse_win'*/ './choose_warehouse_win'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.shopId = this.userData.currentShop.id;
			this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
			if(!this.isBrand){
				this.titleList.pop();
			}
		},
		mounted() {
			this.initBtn();
			this.getPriceList();//分销价列表
			let shopPromise = this.getShopList();//店铺列表
			shopPromise.then(()=>{
				this.getData();//请求数据
			});
			this.getWarehouse();//仓库列表
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '下一步',className: 'success',type:4,
						fn: () => {
							this.confirmClick();
						}
					},
					{name: '取消',className:'info',type:4,
						fn: () => {
							window.history.go(-1);
						}
					},
				];
				this.$store.commit('setPageTools', arr);
			},
			timeChange(res){
				this.startTime = new Date(res[0]).setHours(0,0,0,0);
				this.endTime = new Date(res[1]).setHours(23,59,59,0);
			},
			confirmClick(){//确认选中
				if(!this.selectItem.length){
					this.$message({message: '请选择商品!',type: 'error'});
					return;
				}
				this.openWarehouse();
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.getData();
			},
			allPriceFunc(res){//一起选择分销价
				this.allPrice = res;
				for(let item of this.list){
					item.priceType = res;
				}
				for(let key in this.selectItem){//同时改变选中分销价id
					if(key!='length'){
						this.selectItem[key].disId = res;
					}
				}
			},
			priceFunc(res,item){//单个选择
				item.priceType = res;
				if(this.selectItem[item.id]){//同时改变选中分销价id
					this.selectItem[item.id].disId = res;
				}
			},
			async getPriceList() {//获取分销价列表
				let data = await http.invoicingGetDistributionConfig();
				this.priceList = data.map((res)=>{
					return {value:res.id,label:res.name};
				});
				this.priceList.unshift({value:-1,label:'等于进价'});
				this.priceList.unshift({value:-2,label:'自定义价格'});
			},
			getShopList() {//获取商品列表
				return http.invoicing_getOwners().then((data)=>{
					this.shopList = data;
				});
			},
			async getData() {//获取商品列表
				let data = await http.dispatchSearchApplications({data:{
					page: this.page,
					num: this.pageShow,
					type: 1,
					uName:this.userName,
					applyStartTime: parseInt(this.startTime/1000),
					applyEndTime: parseInt(this.endTime/1000),
					isAuditor:1,
					auditStatus:'1', //审核状态：1审核中
					dispatchStatus:'1,2',//调度状态：1未调度,2调度中
				}});
				this.list = this.setAlready(data.list);
				this.listLength = data.num;
				this.pageTotal = data.total;
			},
			async getWarehouse() {//获取仓库列表
				let data = await http.warehouseList();
				let arr = [];
				if(data) {
					for(let item of data) {
						let obj = {id: item.id,name: item.name};
						if(item.shopId != 0) { //单店
							obj.ischain = 0;
							obj.shopId = item.shopId;
						} else { //品牌
							obj.ischain = 1;
							obj.shopId = item.brandId;
						}
						arr.push(obj);
					}
					this.wareList = arr;
					this.comObj = {
						allList: arr,
					};
				}
			},
			openWarehouse(){//打开仓库弹窗
				this.comObj.owner = this.alrWareObj;
				this.comObj.title = '选择出货仓库';
				this.showCom = 'selWarehouse';
			},
			winWarehouse(res,obj){//关闭仓库弹窗
				if(res=='ok'){
					this.alrWareObj = obj;
					this.submitFunc();
				}
				this.showCom = null;
			},
			async submitFunc(){
				let list = [];
				for(let key in this.selectItem){
					if(key!='length'){
						list.push({applyId:key,distributionId:this.selectItem[key].disId});
					}
				}
				let obj = {
					param:list,
					wid:this.alrWareObj.id,
					wName:this.alrWareObj.name,
				};
				storage.session('mulSelectDispatch',obj);
				this.$message({message: '选择完毕，出入货仓库相同的申请单已被剔除',type: 'success'});
				this.$router.push({path: '/admin/conclusionList/batchSchedule',query: this.$route.query});
			},
			setAlready(dataList){//设置已经选中过的数据
				let list = utils.deepCopy(dataList);
				for(let item of list){
					for(let shop of this.shopList){//店铺名称
						if(shop.shopId==item.shopId){
							item.shopName = shop.shopName
							break;
						}
					}
					item.createTimeStr = this.formatTime(item.createTime);//申请时间
					item.checkTypeName = this.checkHash[item.auditStatus];
					item.dispTypeName = this.dispHash[item.dispatchStatus];
					this.$set(item,'priceList',this.priceList);
					let selObj = this.selectItem[item.id];
					if(this.selectItem[item.id]){//选中按钮
						this.$set(item,'selected',true);
						this.$set(item,'priceType',selObj.disId);
					}else{
						this.$set(item,'priceType',-2);
						this.selected = true;
					}
				}
				this.selNum = list.filter((res)=>{
					return res.selected;
				}).length;
				this.pageAll = this.selNum==list.length;
				return list;
			},
			reset() { //重置
				this.userName = '';
				this.page = 1;
				this.timeDate = [new Date(Date.parse(new Date())-30*3600*24*1000),new Date()];
				this.startTime = new Date().setHours(0,0,0,0)-30*3600*24*1000;
				this.endTime = new Date().setHours(23,59,59,0);
				this.getData();
			},
			pageChange(page) { //分页 获取页数
				this.page = Number(page);
				this.getData();
			},
			radioBtn(item){//点击单个radio
				this.setSelectId(item,!item.selected);
				this.pageAll = this.selNum==this.list.length;
			},
			radioAll(){//点击选择本页
				this.pageAll = !this.pageAll;
				for(let item of this.list){
					if(this.pageAll){//选中
						this.setSelectId(item,true);
					}else{//取消
						this.setSelectId(item,false);
					}
				}
			},
			setSelectId(item,model){
				let selItem = this.selectItem[item.id];
				if(model){//选中
					if(!selItem){
						this.selNum++;
						this.selectItem.length++;
					}
					this.$set(item,'selected',true);
					this.$set(this.selectItem,item.id,{disId:item.priceType});
				}else{//取消
					item.selected = false;
					if(selItem){
						this.selNum--;
						this.selectItem.length--;
						this.$delete(this.selectItem,item.id);
					}	
				}
			},
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
			}
		}
	}
</style>