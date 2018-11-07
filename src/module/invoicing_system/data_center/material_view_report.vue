/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-07 18:20:09
 */
<template>
  <div>
	<el-table :data="tableData6" :span-method="arraySpanMethod" border style="width: 100%">
		<el-table-column prop="id" label="ID" width="180">
		</el-table-column>
		<el-table-column prop="name" label="姓名">
		</el-table-column>
		<el-table-column prop="amount1" sortable label="数值 1">
		</el-table-column>
		<el-table-column prop="amount2" sortable label="数值 2">
		</el-table-column>
		<el-table-column prop="amount3" sortable label="数值 3">
		</el-table-column>
	</el-table>

	<el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
		<el-table-column prop="id" label="ID" width="180">
		</el-table-column>

		<el-table-column prop="name" label="姓名">
		</el-table-column>

		<el-table-column prop="amount1" label="数值 1（元）">
		</el-table-column>

		<el-table-column prop="amount2" label="数值 2（元）">
		</el-table-column>

		<el-table-column prop="amount3" label="数值 3（元）">
		</el-table-column>
	</el-table>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				tableData6: [{
					id: '12987122',
					name: '王小虎',
					amount1: '234',
					amount2: '3.2',
					amount3: 10
				}, {
					id: '12987123',
					name: '王小虎',
					amount1: '165',
					amount2: '4.43',
					amount3: 12
				}, {
					id: '12987124',
					name: '王小虎',
					amount1: '324',
					amount2: '1.9',
					amount3: 9
				}, {
					id: '12987125',
					name: '王小虎',
					amount1: '621',
					amount2: '2.2',
					amount3: 17
				}, {
					id: '12987126',
					name: '王小虎',
					amount1: '539',
					amount2: '4.1',
					amount3: 15
				}]
			};
		},
		methods: {
			arraySpanMethod({row,column,rowIndex,columnIndex}) {
				if (rowIndex % 2 === 0) {
					if (columnIndex === 0) {
						return [1, 2];
					} else if (columnIndex === 1) {
						return [0, 0];
					}
				}
			},
			objectSpanMethod({row,column,rowIndex,columnIndex}) {
				if (columnIndex === 0) {
					//rowIndex 0 2 4
					if (rowIndex % 2 === 0) {
						return {
							rowspan: 1,
							colspan: 1
						};
					} else {
						return {
							rowspan: 0,
							colspan: 0
						};
					}
				}
			}
		}
	}; 
</script>

<!--
<template>
	<div class="pad-bottom">
		<div class="head">
			<span>{{reportName}}</span>
			<div></div>
		</div>
		<div class="search-header">
			<div class="in-block" >
				<el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="80" style="width:224px"></el-input>
			</div>
			<div class="in-block">
				<el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="50" style="width:224px"></el-input>
			</div>
			<div class="in-block" style="padding-left:10px;">
				<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
				<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
			</div>
		</div>

		<div class="table">
			<el-table :data="tableData"  
				v-loading="false" 
				element-loading-text="加载中,请稍后..."
				stripe 
				border 
				:header-cell-style="{'background-color':'#F5F7FA'}"
				@header-click="headerClick"
				:row-key="getRowKeys"
				:expand-row-keys="rowExpand.expands"
			>

				<el-table-column type="expand" :label="rowExpand.label" fixed="left" width="100px;">
					<template slot-scope="{row,column,$index}">
						<div class="search-header">
							<div class="in-block" >
								<el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="80" style="width:224px"></el-input>
							</div>
							<div class="in-block">
								<el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="50" style="width:224px"></el-input>
							</div>
							<div class="in-block" style="padding-left:10px;">
								<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
								<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
							</div>
						</div>
					</template>
				</el-table-column>

				<el-table-column type="自定义分类" label="自定义分类" fixed="left">
					<template slot-scope="{row,column,$index}">
						分类一
					</template>
				</el-table-column>
				
				<template v-for="i in 5">
					<el-table-column v-if="i == 3" type="自定义分类" label="自定义分类" :key="i" min-width="150px">
						<template slot-scope="{row,column,$index}">
							分类二
						</template>
					</el-table-column>
					<el-table-column v-else type="自定义分类" label="自定义分类" :key="i" min-width="150px">
						<template slot-scope="{row,column,$index}">
							分类一
						</template>
					</el-table-column>
				</template>



				<el-table-column  min-width="150px"  label="物料名称">
					<span slot-scope="{row,column}">das</span>
				</el-table-column>

				<el-table-column  min-width="150px" label="物料编码" >
					<span slot-scope="{row,column}">das</span>                    
				</el-table-column>
			</el-table>              
		</div>


		<div class="footer">
			<el-pagination
				:pager-count="pageObj.pagerCount"
				:page-size="pageObj.pageSize"
				layout="total,sizes,prev, pager, next,jumper"
				:background="true"
				:total="pageObj.total"
				:current-page.sync="pageObj.currentPage"
				@size-change="(res)=>{funGetPage('size-change',res)}"
				@current-change="(res)=>{funGetPage('current-change',res)}"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
/*
	接口:
		获取报表详情:materialreportGetMaterialReportDetail
		导出报表:materialreportExportMaterialReportExcel
		删除物料报表:materialreportDeleteMaterialByIds

*/
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
	data () {
		return {
			pageObj:{},
			condition:{},
			rowExpand:{
				label:'展开'
			},                           //表格单元行的展开与收起
			tableData:[
				{id:'0',},
				{id:'1',},
				{id:'2',},
				{id:'3',},
				{id:'4',},
				{id:'5',},
				{id:'6',},
			],
			reportId : '', 				//报表id
			reportName : '--',			//报表名
			columns:[],					//表头
		};
	},
	methods: {
		filterReset(sym,page){
			if(sym == 'reset'){
				this.initCondition();
				this.initPageObj();
			}else{
				this.pageObj.currentPage = page | 1;
			}
		},
		async funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
		},

		//点击表格头部
		headerClick(column){
			let rowExpand = this.rowExpand;
			if(column.label == rowExpand.label){
				rowExpand.toggle = !rowExpand.toggle;

				rowExpand.label = rowExpand.toggle ? '收起' : '展开';
				
				if(rowExpand.toggle){
					rowExpand.expands = this.getAttr(this.tableData,'id');
				}else{
					rowExpand.expands = [];
				}
			}
		},
		//给表格的行添加key
		getRowKeys(row) {
			return row.id;
		},  






		initRowExpand(){
			this.rowExpand = {
				toggle:false,
				expands:[],
				label:'展开',
			};
		},



		async getDetail(){
			let res = await this.getHttp('materialreportGetMaterialReportDetail',{id:this.reportId});
			if( this.toRaw(res,'object')){
				let type = {
					scope:2,			//物料范围
					collection:1				//集合
				};
				let tableData = [];
				//报表名称
				this.reportName = res.objName;
				//报表id
				this.reportId = res.id;
				//表头名称
				let {customItem,data} = res;
				this.columns = Object.preventExtensions(customItem);
				//表数据
				for(let ele of data){
					if(ele['type'] == type.scope){
						for(let index in ele['item']){
							let a = ele['item'][index];
							let item = Object.assign(a.itemInfo,a.reportInfo);
							tableData.push(item);
						}
					}else{

					}
					
				}
				console.log(res);
				console.log(tableData);
			}
		},









		//获取表格任务
		async createTask(param){
			let {subDate,url,success,fail} = param;
			let timer = '';
			let taskId = await this.getHttp(url,subDate);

			timer = Timer.add(
				()=>{this.getTaskStatus(taskId,success,fail)},
				3000,
				0,
				true,
				()=>{
					if(typeof fail == 'function') fail(taskId);                   
				}
			);
			return timer;
		},
		//获取任务状态
		async getTaskStatus(...param){
			let [taskId,success,fail] = param;
			try{
				let retData = await this.getHttp('invoicing_taskInfo',{taskId:taskId});
				switch(retData.status+''){
					case '1'://进行中
						break;
					case '2'://失败
						if(typeof fail == 'function') fail(taskId);                   
						break;
					case '3'://成功
						if(typeof success == 'function') success(taskId);   
				}  
			}catch(e){
				if(typeof fail == 'function') fail(taskId);                                   
			}
		},





		//删除报表
		delTemplate(tips,ids){
			this.$confirm(tips, '操作提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				this.getHttp('materialreportDeleteMaterialByIds',ids)
					.then((res)=>{
						if(res){
							this.$message('删除成功!');  
						}else{
							this.$message('删除失败!');  
						}
					});
			}).catch(()=>{
				console.log('取消');
			});
		},


		//获取查询参数
		getQuery(){
			let query = this.$route.query;
			if(Number(query.id)){
				this.reportId = Number(query.id); 
			}

			this.reportId = 2178;		
		},
		//初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
		},
		initCondition(){
			this.condition = {
				name:'',
				code:''
			};
		},
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '返回',
					type:'4',
					className:'plain',
					fn:()=>{
						this.$router.go(-1);
					}
				},
				{
					name: '删除',
					type:'4',
					className:'danger',
					fn:()=>{
						this.delTemplate('确定删除该模板?',this.reportId);
					}
				},
				{
					name: '导出',
					type:'4',
					className:'primary',
					fn:async ()=>{
						this.getHttp('materialreportExportMaterialReportExcel',{id:this.reportId});
					}
				},
			]);
		},


		objToArr(obj){
			let arr = [];
			for(let attr in obj){
				let temp = {
					id:attr,
					name:obj[attr]
				};
				arr.push(temp);
			}
			return arr;
		},
		toRaw(data,type){
			return Object.prototype.toString.call(data).slice(8,-1).toLowerCase() == type.toLowerCase();
		},
		//获取每一项的某个属性
		getAttr(list,attr='id'){
			let temp = list.map((ele)=>{
				return ele[attr];
			});
			return temp;
		},
		//生成时间对象
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
				week:0,
				str:'',
				time:'',
				dateTime:'',          
			};
			let {year,month,day,hour,minute} = date;
			month += 1;
			hour = hour > 9 ? hour : '0'+hour;
			minute = minute > 9 ? minute : '0'+minute;
			date.time = `${hour}:${minute}`;
			date.dateTime = `${year}-${month}-${day}`;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},

	},
	mounted(){
		this.getQuery();
		this.initBtn();

		this.filterReset('reset');


		this.getDetail();
	},
	components: {

	},
};
</script>


<style lang='less' scoped>
	@ey:#E1BB4A;
	.pad-bottom{
		padding-bottom:20px;
	}
	//头部分割线
	.head{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		max-width: 1436px;
		span{
			height:23px;
			line-height: 23px;
			font-size: 16px; 
			border-left:2px solid @ey;
			padding-left:10px;
			padding-right:5px;
			flex-grow: 0;			
		}
		div{
			flex-grow: 1;
			border-bottom:2px dashed #ddd;
			height:13px;
		}
	}



	.in-block{
		margin-bottom:20px;
		display: inline-block;             
	}
	//筛选
	.search-header{
		margin-top:20px;
		max-width: 1436px;
	}
	//底部分页
	.footer{
		margin-top:37px;
	}
</style>
-->