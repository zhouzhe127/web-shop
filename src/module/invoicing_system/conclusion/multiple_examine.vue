<!--
    **批量调度-批量审核
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
					:clearable="false"
					unlink-panels
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
		</div>
		<com-table :listName="'选择审核列表'" :titleData="titleList" :allTotal="listLength" :introData="list" :listHeight="70" :listWidth="1400">
			<div slot="title-0" slot-scope="props" class="select-all select-ban">
				<span class="page-all" @click="radioAll">{{pageAll?'取消本页':'全选本页'}}</span>
			</div>
			<span class="detail select-ban" slot="con-0" slot-scope="props" @click="radioBtn(props.data)">
				<i :class="{'sel-active':props.data.selected,}"></i>
			</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
		</com-table>
		<div class="page-box">
			<el-pagination @current-change="pageChange"
				:current-page="page"
				background
				layout="prev, pager, next"
				:page-count="pageTotal">
			</el-pagination>
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
				startTime:new Date().setHours(0,0,0,0)-30*3600*24*1000,
				endTime:new Date().setHours(23,59,59,0),
				timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
				userName: '', //用户名
				shopId:'',//店铺id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				allList:[],//总列表数据-前端筛选时用
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
				isLog:false,//是否显示进入日志 默认不显示
				logId:'',//日志id
			};
		},
		components: {
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.shopId = this.userData.currentShop.id;
			this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		},
		destroyed(){
			storage.session('batch_schedule',null);
		},
		mounted() {
			let shopPromise = this.getShopList();//店铺列表
			let obj = storage.session('batch_schedule');
			shopPromise.then(()=>{
				if(obj){
					this.isLog = true;
					this.logId = obj.logId;
					for(let item of obj.applyList){
						this.setSelectId(item,true);
					}
					this.allList = this.setAlready(obj.applyList);
					this.list = this.setAlready(obj.applyList);
					this.listLength = this.list.length;
					this.pageTotal = 1;
				}else{
					this.getData();//请求数据
				}
			});
			this.initBtn();
		},
		methods: {
			initBtn() {
				let arr = [
					{name: '批量导出出货单',className: 'success',type:5,
						fn: () => {
							this.exportFile();
						}
					},
					{name: '进入日志',className: 'success',type:4,
						fn: () => {
							this.$route.query.id = this.logId;
							this.$router.push({path: '/admin/batchLog/batchLogDispatchDetail',query: this.$route.query});
						}
					},
					{name: '全部审核',className: 'success',type:4,
						fn: () => {
							this.confirmSubmit(0,'全部审核');
						}
					},
					{name: '全部审核并出货',className: 'success',type:4,
						fn: () => {
							this.confirmSubmit(1,'全部审核并出货');
						}
					},
					{name: '返回',className:'info',type:4,
						fn: () => {
							this.$router.push({path: '/admin/conclusionList'});
						}
					},
				];
				if(!this.isLog){
					arr.splice(1,1);
				}
				this.$store.commit('setPageTools', arr);
			},
			timeChange(res){
				if(res){
					this.startTime = new Date(res[0]).setHours(0,0,0,0);
					this.endTime = new Date(res[1]).setHours(23,59,59,0);
				}
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			exportFile(){//导出文件
				if(!this.selectItem.length){
					this.$message({message: '请选择要导出的内容!',type: 'error'});
					return;
				}
				let ids = [];
				for(let key in this.selectItem){
					if(key!='length'){
						ids.push(key);
					}
				}
				http.DispatchrecordEexportBills({data:{
					ids:ids.join(','),
				}});
			},
			confirmSubmit(isPass,str){
				if(!this.selectItem.length){
					this.$message({message: '请选择要审核的内容!',type: 'error'});
					return;
				}
				this.$confirm(`确认${str}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.examine(isPass,str);
				}).catch(()=>{});
			},
			async examine(isPass,str){//审核通过
				let ids = [];
				for(let key in this.selectItem){
					if(key!='length'){
						ids.push(key);
					}
				}
				let data = await http.dispatchApproveApplications({data:{
					ids:ids.join(','),
					isPass:isPass,
				}});
				if(data){
					this.$message({message: str+'成功！',type: 'success'});
					this.$router.push({path: '/admin/conclusionList'});
				}
			},
			getShopList() {//获取店铺列表
				return http.invoicing_getOwners().then((data)=>{
					this.shopList = data;
				})
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
					dispatchStatus:'2,8',//调度状态：1未调度,2调度中
				}});
				this.list = this.setAlready(data.list);
				this.listLength = data.rows;
				this.pageTotal = data.total;
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
					let selObj = this.selectItem[item.id];
					if(this.selectItem[item.id]){//选中按钮
						this.$set(item,'selected',true);
					}else{
						this.selected = true;
					}
				}
				this.selNum = list.filter((res)=>{
					return res.selected;
				}).length;
				this.pageAll = this.selNum==list.length;
				return list;
			},
			filter() { //筛选 时间搜索公用
				if(this.isLog){
					let obj={
						createName:this.userName,
						startTime:this.startTime,
						endTime:this.endTime,
					};
					this.condition(obj);
				}else{
					this.page = 1;
					this.getData();
				}
			},
			reset() { //重置
				this.userName = '';
				this.page = 1;
				this.timeDate = [new Date(Date.parse(new Date())-30*3600*24*1000),new Date()];
				this.startTime = new Date().setHours(0,0,0,0)-30*3600*24*1000;
				this.endTime = new Date().setHours(23,59,59,0);
				if(this.isLog){
					this.list = utils.deepCopy(this.allList);
				}else{
					this.getData();
				}
			},
			condition(obj) { //筛选条件匹配
				let list = utils.deepCopy(this.allList);
				for(let key in obj) { //遍历筛选条件
					let newList = [];
					if(obj[key] != '') {
						if(key == 'startTime' || key == 'endTime') { //日期匹配
							for(let item of list) {
								//条件匹配 推进新数组
								if(obj.startTime <= item.createTime*1000 && obj.endTime >= item.createTime*1000){
									newList.push(item);
								}
							}
						} else {
							for(let item of list) {
								//模糊匹配 丢进新数组
								if(item[key].includes(obj[key])) newList.push(item);
							}
						}
						list = newList;
					}
				}
				this.list = list;
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
					this.$set(this.selectItem,item.id,true);
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