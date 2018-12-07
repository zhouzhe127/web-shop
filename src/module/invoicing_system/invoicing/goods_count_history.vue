<template>
	<!-- 
		百川  曾伟福
		file    调单申请单列表
	 -->
	<div id="goods-count-history">
		<div class="tab-div">
			<el-button-group>
				<el-button type="primary">{{tabObj[0].name}}</el-button>
				<el-button @click="linkToPage('template')">{{tabObj[1].name}}</el-button>
			</el-button-group>
		</div>
		<div>
			<div class="search-div">
				<span class="submit-time">{{headTips}}&nbsp;:&nbsp;</span>
				<div class="in-block">
					<el-date-picker
						v-model="timeDate"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:clearable="false"
						unlink-panels
						@change="timeChange">
					</el-date-picker>
				</div>
				<div class="in-block">
					<el-input maxlength="30" v-model="operaUser" placeholder="请输入操作人"></el-input>
				</div>
				<div class="in-block">
					<el-button @click="clickBtn('filter')" type="primary">筛选</el-button>
					<el-button @click="clickBtn('reset')" type="info">重置</el-button>
				</div>
				<div class="posi-block">
					<el-button @click="checkLog('add')" type="danger">查看盘盈单</el-button>
					<el-button @click="checkLog('reduce')" type="success">查看盘亏单</el-button>
				</div>
			</div>

			<div class="content-body">
				<el-table :data="history" stripe border style="width: 100%;">
					<el-table-column type="index" :index="indexMethod" label="序号" width="100">
		   	 		</el-table-column>
					<template v-for="column in titleData">
						<el-table-column :label="column.titleName" :prop="column.dataName" min-width="200" :key="column.dataName">
						</el-table-column>
					</template>
					<el-table-column label="操作" fixed="right" width="150">
						<template slot-scope="scope">
							<el-button type="text" @click="linkToPage('detail',scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div>
				<el-pagination background @current-change="pageChange"
					@size-change="sizeChange"
					:current-page="pageObj.page"
					:page-sizes="[10, 20, 50]"
					layout="sizes, total, prev, pager, next, jumper"
					:total="pageObj.listNum">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
/*
	请求:
		invoicingGetCheckInventoryLogList				//获取批量盘库日志
*/	
import http from 'src/manager/http';
import global from 'src/manager/global';	
export default {
	data () {
		return {
			titleData:[
				{titleName:'记录编号',dataName:'code'},
				{titleName:'操作时间',dataName:'createTimeZh'},
				{titleName:'操作人',dataName:'createUName'},
			],
			history:[],
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
			operaUser:'',				//操作人
			tabObj:[{},{}],				//tab切换,
			headTips:'提交时间',		 //头部信息				
			tableObj:{
				listName:''				//列表名
			},
			timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
		};
	},
	props:{
		tab:{
			type:[String,Number],	//1:商品记录列表,0:物料记录列表
			default:1		
		},						
	},
	watch:{
		tab:function(){
			this.initTabObj();
			this.initBtn();
			this.clickBtn('reset');				
		}
	},
	mounted(){
		this.initTabObj();
		this.initTableData();
		this.initHeadTips();
		this.initBtn();
		this.clickBtn('reset');
	},
	methods: {
		//查看盘盈/盘亏日志
		checkLog(type){
			let obj = {
				ms_sTime: parseInt(Date.parse(this.timeDate[0])/1000),
				ms_eTime: parseInt(Date.parse(this.timeDate[1])/1000),
			};
			let path = '';
			if(this.tab==1){//商品
				path = '/admin/totalLog';
			}else if(this.tab==2){//物料
				path = '/admin/totalLog/materialTotalLog';
			}
			if(type=='add'){//盘盈
				obj.ms_operationType = this.tab==1?23:24;
			}else if(type=='reduce'){//盘亏
				obj.ms_operationType = this.tab==1?24:23;
			}
			this.$router.push({path:path,query:obj});
		},
		indexMethod(index){
			return this.pageObj.num*(this.pageObj.page-1)+index+1;
		},
		timeChange(res){
			this.startTime.time = new Date(res[0]).setHours(0,0,0,0);
			this.endTime.time = new Date(res[1]).setHours(23,59,59,0);
		},
		pageChange(res){
			this.pageObj.page = res;
			this.getHistory();
		},
		sizeChange(size){
			this.pageObj.num = size;
			this.getHistory();
		},
		clickBtn(flag){
			if(flag == 'reset'){
				this.operaUser = '';
				this.initDateTime();
			}
			this.pageObj.page = 1;
			this.getHistory();
		},


		showTimeZh(ele,attr){
			//时间戳转中文
			let time = '',
				date = {},
				str = '';

			time = Number(ele[attr])*1000;
			date = this.generatorDate(time);
			date.hour = date.hour > 9 ? date.hour : '0'+date.hour;
			date.minute = date.minute > 9 ? date.minute : '0'+date.minute;
			str = `${date.year}-${date.month+1}-${date.day} ${date.hour}:${date.minute}`;
			
			ele.createTimeZh = str;
		},
		addItemIndex(list,fn) {
			//给列表添加序号
			for(let i = 0; i < list.length; i++) {
				let itemIndex = (this.pageObj.page - 1) * this.pageObj.num + 1 + i;
				list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
				fn(list[i]);
			}
			return [...list];
		},


		linkToPage(flag,data){
			//详情与tab切换
			let {query} = this.$route,
				arr = [],
				obj = {};

			if(flag == 'detail'){
				query.id = data.logId;
				arr = [
					{id:1,path:'/admin/goodsCountDetail'},			//商品盘库详情
					{id:2,path:'/admin/materialCountDetail'},		//物料盘库详情
					{id:3,path:'/admin/processHistory/detail'},		//加工详情
				];
			}else if(flag == 'template'){
				arr = [
					{id:1,path:'/admin/goodsCountTemplate'},			//商品盘库详情
					{id:2,path:'/admin/materialCountTemplate'},			//物料盘库详情
					{id:3,path:'/admin/processTemplate'},				//加工详情					
				];
			}

			obj = this.matchList(arr,this.tab,'id');						
			this.$router.push({path:obj.path,query});
		},
		async getHistory(){
			let url = '',
				subObj = {},
				obj = {};

			switch(this.tab+''){
				case '1':
				case '2'://获取商品,物料盘库列表
					url = 'invoicingGetCheckInventoryLogList';
					subObj = {
						type:this.tab == 1 ? '1' :'0',
						page:this.pageObj.page,
						size:this.pageObj.num,
						createUName:this.operaUser,
						beginTime:parseInt(this.startTime.time/1000,10),
						endTime:parseInt(this.endTime.time/1000,10)	+ 4					
					};
					obj = await this.getHttp(url,subObj);
					if(obj.length == 0){
						this.history = [];
					}
					if(Array.isArray(obj.list)){
						this.history = obj.list;
						this.history = this.addItemIndex(this.history,(ele)=>{
							this.showTimeZh(ele,'createTime');
						});
					}
					
					this.pageObj.total = obj.total || 0;
					this.pageObj.listNum = Number(obj.count) || 0;
					break;
				case '3'://加工记录
					url = 'ProcessbomGetProcessBomLogList';
					subObj = {
						page:this.pageObj.page,
						size:this.pageObj.num,
						name:this.operaUser,
						beginTime:parseInt(this.startTime.time/1000,10),
						endTime:parseInt(this.endTime.time/1000,10)	
					};
					obj = await this.getHttp(url,subObj);
					if(obj.length == 0){
						this.history = [];
					}
					if(Array.isArray(obj.list)){
						this.history = obj.list;
						this.history = this.addItemIndex(this.history,(ele)=>{
							ele.finishedKind = ele.finishedKind+'种';
							this.showTimeZh(ele,'createTime');
						});
					}
					
					this.pageObj.total = obj.total || 0;
					this.pageObj.listNum = obj.count || 0;					

			}

		},


		initHeadTips(){
			let arr = [
				{id:1,name:'提交时间'},
				{id:2,name:'提交时间'},
				{id:3,name:'加工时间'}
			];
			this.headTips = this.matchList(arr,this.tab,'id').name;
		},
		initBtn(){
			//初始化按钮
			let obj = {
				name:'',
				url:'',
			};
			let arr = [
				{id:1,name:'批量盘库',path:'/admin/goodsCount'},
				{id:2,name:'批量盘库',path:'/admin/materialCount'},
				{id:3,name:'立即加工',path:'/admin/processMaterial'},
			];
			obj = this.matchList(arr,this.tab,'id');
			this.$store.commit('setPageTools',[
				{
					name: obj.name,
					type:4,
					className: 'primary',
					fn:()=>{
						this.$router.push({path:obj.path,query:this.$route.query});
					}
				}
			]);            
		},
		initTableData(){
			//初始化表格字段
			switch(this.tab+''){
				case '1':
				case '2'://商品物料盘库记录列表
					break;
				case '3'://加工记录
					this.titleData = [
						{titleName:'产出物料',dataName:'finishedKind'},
						{titleName:'加工时间',dataName:'createTimeZh'},
						{titleName:'操作人',dataName:'createUName'},
					];
					break;					
			}
		},
		initTabObj(){
			//初始化tab切换,列表名
			let listName = '';
			switch(this.tab+''){
				case '1':
					this.tabObj = [
						{name:'商品盘库'},
						{name:'模板列表'}
					];

					listName = '商品盘库';
					break;
				case '2':
					this.tabObj = [
						{name:'物料盘库'},
						{name:'模板列表'}
					];	
					listName = '物料盘库';	
					break;
				case '3':
					this.tabObj = [
						{name:'加工记录'},
						{name:'加工模板'}
					];
					listName = '加工物料';						
					break;					
			}
			this.tableObj.listName = listName;
		},


		matchList(arr=[],val,attr='id'){
			//匹配数据
			let retData = {};
			for(let ele of arr){
				if(ele[attr] == val){
					retData = ele;
					break;
				}
			}
			return retData;
		},
		generatorDate(time){
			//生成日期对象
			let date = {};
			if(!time){
				time = new Date();
			}else if(typeof time == 'number' || typeof time == 'string'){
				time = Number(time);
				time = new Date(time);
			}
			date = {
				year: time.getFullYear(),
				month: time.getMonth(),
				day: time.getDate(),
				hour: time.getHours(),
				minute: time.getMinutes(),
				second:time.getSeconds(),
				week:0            
			};
			return date;
		},	
		initDateTime(){
			this.endTime.time = Date.now();
			// date = this.generatorDate(this.endTime.time);
			// this.startTime.time = new Date(date.year,date.month,1,0,0,0).getTime();
			this.startTime.time = this.endTime.time - global.timeConst.ONEMONTH;
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
	},
	components: {
		calendar: () =>import(/*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		comTable:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
		pageElement:()=>import (/*webpackChunkName:'page_element'*/'src/components/page_element'),
	},
};
</script>
<style lang='less' scoped>
	@import url('../warehouse_manage/z_less.less');
	#goods-count-history{
		.search-div{
			position: relative;
			padding-right: 240px;
			.submit-time{
				.lfc(#333,40px,14px);
				display: inline-block;
				vertical-align: top;
			}
			.in-block{
				display: inline-block;
				margin-right:15px;
				margin-bottom:20px;
				.line{
					display: inline-block;
					.whb(10px,20px);
					border-top:1px solid #ccc;
				}
				.font{
					font-size:14px;
				}
				.input-txt{
					.input-text(180px);
					margin-right:15px;
					font-size:14px;

				}
			}
			.posi-block{
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.content-body{
			margin-bottom: 20px;
			.operation{
				color:#22aae0;
				font-size: 14px;
				cursor: pointer;
				display: inline-block;
				height:40px;
				width:auto;
				padding:0 10px;
				line-height: 40px;
				vertical-align: middle;

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