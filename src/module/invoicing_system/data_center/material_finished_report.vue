/*
 * @Author: weifu.zeng 
 * @Date: 2018-10-25 16:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 17:03:37
 */

<template>
<div>
	<div class="box">
		<div class="table-title">
			{{template.name}}<span class="circle"></span>已选<span class="num">{{selectList.length}}</span>个条目
		</div>

		<el-table 
			:data="tableData"  
			v-loading="loading" 
			element-loading-text="加载中,请稍后..."
			stripe
			border
			:header-cell-style="{'background-color':'#F5F7FA'}"
			>
			<el-table-column  width="150">
				<template slot="header" slot-scope="slot">
					<el-checkbox v-model="selectAll" @change="selectAllchange">全选</el-checkbox>
					<span class="batch-del" @click="clickOperation('delAll')">批量删除</span>
				</template>

				<template slot-scope="{row,column,$index}">
					<el-checkbox @change="(bool)=>{changeRowSelect(row,bool)}" v-model="row['checked']" :disabled="row['disabled']"></el-checkbox>
				</template>
			</el-table-column>

			<el-table-column min-width="200px" label="报表名称" prop="name">
			</el-table-column>

			<el-table-column  min-width="150px"  label="状态" prop="state">
			</el-table-column>

			<el-table-column  min-width="150px"  label="生成时间" prop="createTime">
			</el-table-column>

			<el-table-column  min-width="200px"  label="数据时间范围" prop="scope">
			</el-table-column>

			<el-table-column  min-width="150px"  label="生成人" prop="createUName">
			</el-table-column>

			<el-table-column  min-width="250px"  label="操作" >
				<span slot-scope="{row,column}" >
					<span class="operation" @click="clickOperation('delete',row)">删除</span>
					<span class="operation" @click="clickOperation('view',row)">查看</span>
					<span class="operation" @click="clickOperation('export',row)">导出</span>
					<span class="operation error" @click="clickOperation('error',row)">异常</span>
				</span>
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
		获取物料报表列表:materialreportGetList
		删除物料报表:materialreportDeleteMaterialByIds

*/
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
	data () {
		return {
			loading:false,

			tableData:[
				{id:0,},
				{id:1,},
				{id:2,},
				{id:3,},
				{id:4,},
				{id:5,},
			],
			template:{},                        //模板
			pageObj:{},
			taskTimer:{
				rList:'',                       //报表列表,
				export:'',                      //导出
			},
			selectAll:false,                    //全选
			selectList:[],                      //选中的列表
		};
	},
	methods: {
		//全选
		selectAllchange(bool){
			this.changeListAttrVal(this.tableData,'checked',bool);
			this.selectList = bool ? this.tableData : [];
		},
		//行选中
		changeRowSelect(row,bool){
			//状态未完成


			if(bool){
				this.selectList.push(row);
			}else{
				this.selectList = this.selectList.filter(ele => ele.id != row.id);
			}
			this.selectAll = this.selectList.length == this.tableData.length;
		},

		clickOperation(sym,item){
			let ids = '';
			switch(sym){
				case 'delete':
					this.delTemplate('确认删除该报表?',item.id);
					break;
				case 'view':
					this.$router.push({path:'/admin/materialReport/viewReport',id:item.id});
					break;
				case 'export':
					break;
				case 'error':
					break;
				case 'delAll':
					if(this.selectList.length == 0){
						this.$message('请先选择需要删除的报表!');
						return;
					}
					ids = this.selectList.map( ele => ele.id).join(',');
					this.delTemplate('确认删除所选择的报表?',ids);               
					break;     
			}
			
		},
		//删除报表
		async delTemplate(tips,ids){
			try{
				await this.$confirm(tips, '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				});
				await this.getHttp('materialreportDeleteMaterialByIds',ids);
				this.$message('删除成功!');                
				
			}catch(e){
				this.$message('删除失败!');                                        
			}
		},

		async funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.clearTaskTimer('rList');
			this.getReportList();
		},




		//获取报表列表
		async getReportList(){
			let subObj = {
				page:this.pageObj.currentPage,
				size:this.pageObj.pageSize,
				beginTime:0,
				endTime:0
			};
			
			this.taskTimer.rList = Timer.add(
				async ()=>{
					let tableData = await this.getHttp('materialreportGetList',subObj);
					
					if(Array.isArray(tableData)){
						this.tableData = this.mapListAttr(tableData);
						this.matchSelectList(this.tableData,this.selectList);
					}
				},
				5000,
				0,
				true,
				()=>{
					//失败时执行的函数   
				}
			);
		},
		//前后台字段转换
		mapListAttr(list){
			let arr = [];  
			for(let ele of list){
				let temp = {
					id : ele.id,                                    //报表id
					name : ele.objName,                             //报表名称
					state : '100%',                                 //状态
					createTime : ele.createTime,                    //生成时间
					scope : ele.beginTime+' 至 '+ele.endTime,         //数据时间范围
					createUName : ele.createUName,                  //生成人   
					checked : false,                                //是否选中
					disabled : false,                               //是否可以操作  
				};
				arr.push(temp);
			}
			return arr;
		},





		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '批量删除',
					type:'4',
					className:'primary',
					fn:()=>{

						if(this.selectList.length == 0){
							this.alert('请先选择需要删除的报表!');
							return;
						}
						//未完成的不可以删除
						
						this.$confirm('确认删除当前选中报表?', '操作提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							console.log('success');

						}).catch(() => {
							console.log('cancel');
						});
					}
				},
			]);
		},






		//清除定时器
		clearTaskTimer(timer){
			if(this.taskTimer[timer]){
				Timer.clear(this.taskTimer[timer]);
				this.taskTimer[timer] = '';
			}
		},
		//获取地址栏参数
		getQuery(){
			let query = this.$route.query;
			this.template = {
				id:query.tempId,
				name:query.tempName
			};
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






		//获取表格任务
		async createTask(param){
			let {subDate,url,success,fail,time=3000} = param;
			let timer = '';
			let taskId = await this.getHttp(url,subDate);

			timer = Timer.add(
				()=>{this.getTaskStatus(taskId,success,fail)},
				time,
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
		


		matchSelectList(list,selectList){
			let matchAttr = 'id';
			let attr = 'checked';
			let val = true;

			for(let ele of list){
				for(let e of selectList){
					if(ele[matchAttr] == e[matchAttr]){
						ele[attr] = val;
						break;  
					}
				}
			}
		},
		//改变列表的某个属性值
		changeListAttrVal(list,attr,val){
			for(let ele of list){
				ele[attr] = val;
			}
		},        
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
	},
	mounted(){
		this.getQuery();
		this.initPageObj();
		this.getReportList();
	},
	beforeRouteLeave(to,from,next){
		this.clearTaskTimer('rList');
		next();
	}
};
</script>

<style lang='less' scoped>
	.box{
		padding-top:15px;
	}
	.table-title{
		border:1px solid #EAEEF5;
		border-bottom:none;
		height:50px;
		line-height: 50px;
		color:#303133;
		font-size:14px;
		padding-left:15px;
		.circle{
			display:inline-block;
			vertical-align:middle;
			height: 6px;
			width: 5px;
			background-color: #666;
			border-radius: 50%;
			margin: 0 5px;
		}
		.num{
			color:#E1BB4A;
			margin:0 2px;
		}
	}
	.batch-del{
		margin-left:15px;
		cursor: pointer;
	}
	.operation{
		color:#E1BB4A;
		padding-right:15px;
		height:30px;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}
	.error{
		color:#ff0000;
	}
	//底部分页
	.footer{
		margin-top:37px;
	}
</style>