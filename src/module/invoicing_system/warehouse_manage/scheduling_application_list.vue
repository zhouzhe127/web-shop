<template>
	<!-- 
		百川  曾伟福
		file    调单申请单列表
	 -->
	<div id="scheduling-application-list">
		<div class="tab-div">
			<span :class="{'select-tab':toggle}" @click="toggle=true">调度申请</span>
			<span :class="{'select-tab':!toggle}" @click="toggle=false">模板列表</span>
		</div>
		<div v-show="toggle">
			<div class="search-div">
				<span class="submit-time">提交时间&nbsp;:&nbsp;</span>
				<div class="in-block">
					<calendar :pObj="startTime" @throwTime="(res)=>{getTime('startTime',res)}"></calendar>
					<span class="line"></span>
					<calendar :pObj="endTime" @throwTime="(res)=>{getTime('endTime',res)}"></calendar>
				</div>
			</div>

			<div class="search-div">
				<div class="in-block">
					<select-btn :width="180" :name="tips.auditStatus" :sorts="auditStatusName" @emit="(res)=>{getStatus('auditStatus',res)}"></select-btn>
					<select-btn :width="180" :name="tips.dispatchStatus "  :sorts="dispatchStatusName" @emit="(res)=>{getStatus('dispatchStatus',res)}" class="marginL-10"></select-btn>
				</div>
				<div class="in-block">
					<input type="text" maxlength="30" class="input-txt" v-model="subObj.uName" placeholder="请输入提交人"><input maxlength="30" type="text" v-model="subObj.code" class="input-txt" placeholder="请输入申请单号">
				</div>
				<div class="in-block">
					<span class="font" >入货仓库&nbsp;:&nbsp;</span>
					<select-btn :width="180" :name="tips.wid" :sorts="warehouseListName" @emit="(res)=>{getWid('wid',res)}" class="marginL-10"></select-btn>
				</div>
				<div class="in-block">
					<span class="common-btn blue" @click="clickBtn('filter',true)">筛选</span><span class="common-btn gray" @click="clickBtn('reset')">重置</span>
				</div>
			</div>

			<div class="content-body">
				<com-table
					:showHand ="true"
					:listName ="'调度申请'"
					:listHeight ='70'
					:showTitle ="1"
					:titleData ="titleData"
					:introData="applicationList"
					:allTotal ="pageObj.listNum"
					:fixed="0"
					:bannerStyle="{'color':'#43414a',fontSize:'16px'}"
					:widthType ="true"
					:listWidth ="1435" 
					:contentStyle ="{'color':'#666',fontSize:'14px'}"           
				>
					<div slot-scope="pro" slot="con-0">
						<span class="operation" style="color:#ff8d01;" v-if="pro.data.auditStatus==4 && pro.data.dispatchStatus==5"  @click="chanageRouter(pro.data,'import')">确认入货</span>
						<span class="operation" v-else @click="chanageRouter(pro.data,'detai')">查看详情</span>
					</div>
					<template slot="con-1" slot-scope="pro">
						{{pro.data.itemIndex}}
					</template>
				</com-table>
			</div>

			<div>
				<page-element :page="pageObj.page" :total="pageObj.total" @pageNum="getPageNum"></page-element>
			</div>
		</div>
		<keep-alive :include="['templateList']">
			<component :is="showCom"></component>
		</keep-alive>
	</div>
</template>
<script>
/*
	审核状态:       
		1 审核中：审核人还没有确认审核通过 
		2 已取消：申请人取消申请，系统自动删除所有调度单并回库 
		3 审核未通过：审核人审核不通过，系统自动删除所有调度单并回库 
		4 审核通过：审核人审核通过，通过条件：至少新建有一条调度单
	调度状态:
		1 未调度：没有调度单 
		2 调度中：新建了调度单，但还在审核中 
		3 未出货 ：审核通过，有了新的调度单，且所有调度单都还是未出货状态 
		4 全部取消 ： 所有的调度单状态都变成已取消 
		5 待入货：任意一单调度单状态是待入货 
		6 已完成：所有调度单状态变成已完成 
		7 已完成（异常）：任意一单调度单状态为已完成（异常）或者 同时存在调度单状态为已完成和已取消
			
	本页包含的接口:
		warehouseList:获取仓库列表
		dispatchSearchApplications:获取申请列表
			当店铺类型是加盟店,直营店的时候不需要携带供应商id,若是品牌,单店的时候需要携带供应商id(供应商id为店铺id),
*/
import { mapMutations } from 'vuex';	
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';	

export default {
	data () {
		return {
			titleData:[
				{titleName:'操作'},
				{titleName:'序号'},
				{titleName:'操作类型',dataName:'opeartionType'},
				{titleName:'审核状态',dataName:'auditStatusType'},
				{titleName:'调度状态',dataName:'dispatchType'},
				{titleName:'申请单号',dataName:'code'},
				{titleName:'申请人',dataName:'createName'},
				{titleName:'申请时间',dataName:'submitTime'},
				{titleName:'入货仓库',dataName:'wName'},
			],
			pageObj:{
				page:1,                 //当前页
				total:0,                //总页数
				num:10,                 //每页显示多少条
				listNum:0,              //总记录数
			},
			startTime:{
				time:'',               //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,             //是否展示时分秒控件(默认显示)
				detail:true,           //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160              //输入框的宽  默认200px                
			},
			endTime:{
				time:'',                //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,              //是否展示时分秒控件(默认显示)
				detail:true,            //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160               //输入框的宽  默认200px                
			},
			applicationType:[{id:'1',name:'入货申请'},{id:'2',name:'出货申请'}],//申请类型

			auditStatus:[
				{id:0,name:'全部审核状态'},
				{id:1,name:'审核中'},
				{id:2,name:'已取消'},
				{id:3,name:'审核未通过'},
				{id:4,name:'审核通过'},
			],
			auditStatusName:[],
			dispatchStatus:[
				{id:0,name:'全部调度状态'},
				{id:1,name:'未调度'},
				{id:2,name:'调度中'},
				{id:3,name:'未出货'},
				{id:4,name:'全部取消'},
				{id:5,name:'待入货'},
				{id:6,name:'已完成'},
				{id:7,name:'已完成（异常）'},
			],
			dispatchStatusName:[],      
			warehouseList:[],            //仓库列表
			warehouseListName:[],   
			tips:{},
			subObj:{},                   //提交的数据
			toggle:true,                 //列表的切换
			applicationList:[],          //申请列表
			showCom:'',                  //展示的组件
			isBrand:'',
			shopId:'',              
			brandId:false,                 //品牌id
		};
	},
	methods: {
		...mapMutations(['setWin','setPageTools']),
		//------------event----------
		//获取时间
		getTime(flag,time){
			this.subObj[flag] = parseInt(time/1000);
			this[flag].time = time;
		},
		//获取审核,调度状态状态
		getStatus(flag,index){
			this.subObj[flag] = this[flag][index].id;
			if(this.subObj[flag] == 0) this.subObj[flag] = '';
			this.tips[flag] = this[flag][index].name;
		},
		//获取仓库id
		getWid(index){
			this.subObj.wid = this.warehouseList[index].id;
			this.tips.wid =  this.warehouseList[index].name;
			if(this.subObj.wid == 0) this.subObj.wid = '';
		},
		//点击筛选,重置
		async clickBtn(flag,bool){
			if(flag=='filter'){
				if(bool){
					this.pageObj.page = 1;
					this.subObj.page = 1;
				}
				let {list=[],rows=0} = await this.getHttp('dispatchSearchApplications',this.subObj); 
				list.forEach((ele,index)=>{
					ele.opeartionType = this.itera(this.applicationType,ele.type);          //申请类型
					ele.auditStatusType = this.itera(this.auditStatus,ele.auditStatus);     //审核状态
					ele.dispatchType = this.itera(this.dispatchStatus,ele.dispatchStatus);  //调度状态
					ele.submitTime =  this.transFormTime(ele.createTime);                   //申请时间
					let itemIndex = (this.pageObj.page-1)*this.pageObj.num+index+1;
					ele.itemIndex = itemIndex>=10 ? itemIndex : '0'+itemIndex;
				});
				this.applicationList = list;
				this.pageObj.listNum = rows;
				this.pageObj.total = Math.ceil(this.pageObj.listNum/this.pageObj.num);
			}else{
				this.resetData();
				this.clickBtn('filter');
			}
		}, 

		//----------- page--------
		getPageNum(obj){
			this.pageObj.page = obj.page;
			if(obj.num != this.pageObj.num){
				this.pageObj.num = obj.num;
				this.pageObj.total = Math.ceil(this.pageObj.listNum/this.pageObj.num);
			}

			this.subObj.num = this.pageObj.num;
			this.subObj.page = this.pageObj.page;
			this.clickBtn('filter');
		},
		//确认入货与详情页
		chanageRouter(item){
			let query = this.$route.query;
			let str = 'schedulingApplication/purchaseRequisitionDetail';//详情
			query.id = item.id;
			query.auditStatus = item.auditStatus;
			this.$router.push({path:str,query});
		},
		//---------utils------
		itera(arr,type){
			for(let ele of arr){
				if(ele.id == type) return ele.name;
			}
		},
		transFormTime(time){
			time = parseInt(time*1000);
			let date =new Date(time);
			return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();
		},
		// ---------------init-----------
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},  
		toggleTab(){
			if(!this.toggle){
				this.showCom = 'templateList';
				storage.session('tab',2);
			}else{
				this.showCom = '';
				storage.session('tab',1);
			}
		},  
		storageSubObj(){
			let subObj = storage.session('subObj');
			if(subObj){
				let statusArr = Object.keys(this.tips),obj={};

				this.startTime.time = subObj.sTime;
				this.endTime.time = subObj.eTime;
				this.pageObj.page = subObj.page;
				this.subObj = {...subObj};

				delete this.subObj.sTime;
				delete this.subObj.eTime;
				for(let key of statusArr){
					let status = this.subObj[key];
					if(!status) status = 0;
					obj[key] = status;
				}
				this.tips={
					auditStatus : this.itera(this.auditStatus,obj.auditStatus),				
					dispatchStatus : this.itera(this.dispatchStatus,obj.dispatchStatus),
					wid : this.itera(this.warehouseList,obj.wid)				
				};
			}
		},
		filterStore(list,id,str){
			let arr = list.filter((ele)=>{
				if(str == 'brandId' && ele.shopId == 0){
					return ele[str] == id;
				}else if(str == 'shopId' && ele.shopId !=0 ){
					return ele[str] == id;
				}

			});
			return arr;
		},
		mapName(){
			this.auditStatusName = this.auditStatus.map((ele)=>{return ele.name});
			this.dispatchStatusName = this.dispatchStatus.map((ele)=>{return ele.name});
		},
		//重置数据
		resetData(){
			this.subObj = {
				page:1,
				num:10,
				startTime:'',
				endTime:'',
				type:1,                 //1进货申请；2出货申请(目前只有进货申请)
				auditStatus:'',         //审核状态
				dispatchStatus:'',      //调度状态
				wid:'',                 //入货仓库id
				uName:'',               //提交人
				code:'',                //调度单号                
				supplierId:'',            //供应商id
			};
			
			this.endTime.time = Date.now();
			this.startTime.time = this.endTime.time - global.timeConst.ONEMONTH;

			this.subObj.endTime = parseInt(this.endTime.time / 1000);
			this.subObj.startTime = parseInt(this.startTime.time / 1000);


			this.pageObj.page = 1;
			
			if(this.brandId){
				this.subObj.supplierId = this.brandId;
			}

			this.tips={
				auditStatus:'全部审核状态',
				dispatchStatus:'全部调度状态',
				wid:'全部仓库'                
			};
			
		}, 
		initData(){
			let userData  = storage.session('userShop');
			this.isBrand = userData.currentShop.ischain == 3;
			this.shopId = userData.currentShop.id;
			let ischain = userData.currentShop.ischain;
			switch(ischain+''){
				case '0':
				case '3':
					this.brandId = userData.currentShop.id;
					break;
				case '1':
				case '2':
					this.brandId = false;
					break;
			}
		},
		initBtn(){
			this.setPageTools([{name: '申请入货',style:{color:'#fff'},fn:()=>{
				let query = this.$route.query;
				this.$router.push({path:'schedulingApplication/purchaseRequisition',query:query});
			}}]);
		},
	},
	async mounted() {
		this.mapName();
		this.initBtn();
		this.initData();

		if(storage.session('tab') == 2){
			this.toggle = false;
			this.toggleTab();
		}
		this.resetData();

		this.warehouseList = await this.getHttp('warehouseList');
		let brand = this.isBrand ? 'brandId' : 'shopId';
		this.warehouseList = this.filterStore(this.warehouseList,this.shopId,brand);
		this.warehouseList.unshift({id:0,name:'全部仓库'});
		this.warehouseListName = this.warehouseList.map((ele)=>{return ele.name});

		this.storageSubObj();
		this.clickBtn('filter');
	},
	watch:{
		'toggle':function(){
			this.toggleTab();
		}
	},
	beforeDestroy(){
		storage.session('tab',null);
		if(this.$route.path == '/admin/schedulingApplication/purchaseRequisitionDetail'){
			let obj = {...this.subObj};
			obj.sTime = this.startTime.time;
			obj.eTime = this.endTime.time;
			storage.session('subObj',obj);
		}else{
			storage.session('subObj',null);
		}
	},
	components: {
		calendar: () =>import(/*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		comTable:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
		selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		pageElement:()=>import (/*webpackChunkName:'page_element'*/'src/components/page_element'),
		templateList:()=>import (/*webpackChunkName:'template_list'*/'./template_list'),
	},
};
</script>
<style lang='less' scoped>
	@import url('./z_less.less');
	#scheduling-application-list{
		.search-div{
			.marginL-10{    
				margin-left:10px;
			}
			.submit-time{
				.lfc(#333,40px,16px);
				display: inline-block;
				vertical-align: top;
			}
			.in-block{
				display: inline-block;
				margin-right:15px;
				vertical-align: top;
				margin-bottom:10px;
				.line{
					display: inline-block;
					.whb(10px,20px);
					border-top:1px solid #ccc;
				}
				.font{
					font-size:16px;
				}
				.input-txt{
					.input-text(180px);
					margin-right:15px;
					font-size:14px;

				}
			}
		}
		.content-body{
			.operation{
				color:#22aae0;
				font-size: 14px;
				cursor: pointer;
			}
			.line:after{
				content:'';
				display: inline-block;
				margin:0px 5px;
				.whb(1px,18px);
				vertical-align: middle;
				border-right:1px solid #aaa;
			}
		}
	}
</style>