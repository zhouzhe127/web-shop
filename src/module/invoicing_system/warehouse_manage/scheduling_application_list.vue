<template>
	<!-- 
		百川  曾伟福
		file    调单申请单列表
	 -->
	<div id="scheduling-application-list">
		<div class="tab-div">
			<el-button-group>
				<el-button :type="toggle ? 'primary' : ''" @click="toggle=true">调度申请</el-button >
				<el-button  :type="!toggle ? 'primary' : ''" @click="toggle=false">模板列表</el-button >
			</el-button-group>
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
					<el-select v-model="subObj.auditStatus" placeholder="请选择审核状态" clearable >
						<el-option
							v-for="item in auditStatus"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
					
					<el-select v-model="subObj.dispatchStatus" placeholder="请选择调度状态" clearable>
						<el-option
							v-for="item in dispatchStatus"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</div>
				<div class="in-block">
					<el-input maxlength="30" style="width:180px;" clearable v-model="subObj.uName" placeholder="请输入提交人"></el-input>
					<el-input maxlength="30" style="width:180px;" clearable v-model="subObj.code"  placeholder="请输入申请单号"></el-input>
				</div>
				<div class="in-block">
					<span class="font" >入货仓库&nbsp;:&nbsp;</span>
					<el-select v-model="subObj.wid" clearable placeholder="请选择仓库">
						<el-option
							v-for="item in warehouseList"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</div>
				<div class="in-block">
					<el-button type="primary" @click="clickBtn('filter',true)">筛选</el-button >
					<el-button type="info" @click="clickBtn('reset',null)">重置</el-button >
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
			applicationType:[
				{id:'1',name:'入货申请'},
				{id:'2',name:'出货申请'}
			],								//申请类型
			auditStatus:[
				{id:1,name:'审核中'},
				{id:2,name:'已取消'},
				{id:3,name:'审核未通过'},
				{id:4,name:'审核通过'},
			],
			dispatchStatus:[
				{id:1,name:'未调度'},
				{id:2,name:'调度中'},
				{id:3,name:'未出货'},
				{id:4,name:'全部取消'},
				{id:5,name:'待入货'},
				{id:6,name:'已完成'},
				{id:7,name:'已完成（异常)'},
				{id:8,name:'配货完成'},
			],
			warehouseList:[],            //仓库列表
			applicationList:[],          //申请列表

			subObj:{},                   //提交的数据
			toggle:true,                 //列表的切换
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
			this[flag].time = time;
		},
		//点击筛选,重置
		async clickBtn(flag,bool){
			if(flag == 'filter'){
				if(bool){
					this.pageObj.page = 1;
				}
				let subObj = this.getSubObj();
				let {list=[],rows=0} = await this.getHttp('dispatchSearchApplications',subObj); 

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
				this.clickBtn('filter',null);
			}
		}, 
		getSubObj(){
			//获取需要提交的数据
			let obj = {
				page:this.pageObj.page,
				num:this.pageObj.num,
				applyStartTime: parseInt(this.startTime.time / 1000),
				applyEndTime: parseInt(this.endTime.time / 1000),
				auditTimeStart:'',
				auditTimeEnd:'',
				isAuditor:'',
				auditor:'',
			};
			let attrs = ['type','isAuditor','auditStatus','dispatchStatus','wid','uName','code'];
			for(let key of attrs){
				obj[key] = this.subObj[key];
			}
			return obj;
		},
		getPageNum(obj){
			this.pageObj.page = obj.page;
			this.pageObj.num = obj.num;
			this.pageObj.total = Math.ceil(this.pageObj.listNum/this.pageObj.num);
			this.clickBtn('filter',null);
		},
		//确认入货与详情页
		chanageRouter(item){
			let query = this.$route.query;
			let str = 'schedulingApplication/purchaseRequisitionDetail';//详情
			query.id = item.id;
			query.auditStatus = item.auditStatus;
			this.$router.push({path:str,query});
		},


		initBtn(){
			this.setPageTools([{name: '申请入货',style:{color:'#fff'},fn:()=>{
				let query = this.$route.query;
				this.$router.push({path:'schedulingApplication/purchaseRequisition',query:query});
			}}]);
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
		toggleTab(){
			//tab切换
			if(!this.toggle){
				this.showCom = 'templateList';
				storage.session('tab',2);
			}else{
				this.showCom = '';
				storage.session('tab',1);
			}
		},  
		getStorageSubObj(){
			let subObj = storage.session('subObj');
			if(subObj){
				this.startTime.time = subObj.sTime;
				this.endTime.time = subObj.eTime;
				this.pageObj.page = subObj.page;

				this.subObj = {...subObj};

				delete this.subObj.sTime;
				delete this.subObj.eTime;
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
		//重置数据
		resetData(){
			this.subObj = {
				type:1,      
				isAuditor:0,				
				auditStatus:'',         
				dispatchStatus:'',      
				wid:'',                 
				uName:'',               
				code:'',       
			};
			
			this.endTime.time = Date.now();
			this.startTime.time = this.endTime.time - global.timeConst.ONEMONTH;

			this.pageObj.page = 1;
		}, 



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
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		}, 
	},
	async mounted() {
		this.initBtn();
		this.initData();
		this.resetData();

		//tab切换
		if(storage.session('tab') == 2){
			this.toggle = false;
			this.toggleTab();
		}

		//获取仓库
		this.warehouseList = await this.getHttp('warehouseList');
		let brand = this.isBrand ? 'brandId' : 'shopId';
		this.warehouseList = this.filterStore(this.warehouseList,this.shopId,brand);

		this.getStorageSubObj();
		this.clickBtn('filter',null);
	},
	watch:{
		'toggle':function(){
			this.toggleTab();
		}
	},
	beforeRouteLeave(to,from,next){
		storage.session('tab',null);
		if(to.path == '/admin/schedulingApplication/purchaseRequisitionDetail'){
			let obj = {
				sTime:this.startTime.time,
				eTime:this.endTime.time,
				auditStatus:this.subObj.auditStatus,
				dispatchStatus:this.subObj.dispatchStatus,
				uName:this.subObj.uName,
				code:this.subObj.code,
				wid:this.subObj.wid,
				page:this.pageObj.page,
				num:this.pageObj.num,
				type:this.subObj.type,      
				isAuditor:this.subObj.isAuditor,
			};
			storage.session('subObj',obj);
		}else{
			storage.session('subObj',null);
		}
		next();
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