/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 17:05:28
 */

<template>
	<div class="box">
		<!-- <add-report-row></add-report-row> -->
		<el-table 
			:data="tableData"  
			v-loading="bool" 
			element-loading-text="加载中,请稍后..."
			stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
			<el-table-column  min-width="80px"  label="序号" >
				<span slot-scope="{row,column,$index}" >
					{{$index+1}}
				</span>
			</el-table-column>
			<el-table-column  min-width="180px"  label="报表模板名称" prop="name">
			</el-table-column>

			<el-table-column  min-width="150px"  label="创建人" prop="createUser">
			</el-table-column>

			<el-table-column  min-width="150px"  label="创建时间" prop="createTime">
			</el-table-column>

			<el-table-column  min-width="320px"  label="操作" >
				<span slot-scope="{row,column,$index}" >
					<span class="operation" @click="clickOperation('edit',row,$index)">编辑</span>
					<span class="operation" @click="clickOperation('delete',row,$index)">删除</span>
					<span class="operation" @click="clickOperation('generator',row,$index)">生成报表</span>
					<span class="operation" @click="clickOperation('view',row,$index)">查看已生成报表</span>
				</span>
			</el-table-column>
		</el-table>
		
		<div class="footer">
			<el-pagination
				:pager-count="pageObj.pagerCount"
				:page-size="pageObj.pageSize"
				layout="prev, pager, next"
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
	获取报表模板列表:templateGetReportTemplates
	删除自定义报表模板:templateDeleteReportTemplate

*/
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
import http from 'src/manager/http';
// import Timer from 'src/verdor/timer';
export default {
	data () {
		return {
			bool:false,
			pageObj:{},
			tableData:[],
		};
	},
	methods: {
		clickOperation(sym,row,index){
			let {id,name} = row;
			switch(sym){
				case 'edit':
					break;
				case 'delete':
					this.delTemplate(id,index);
					break;                
				case 'generator':
					break;                
				case 'view':
					this.$router.push({path:'/admin/materialReport/finishedReport',query:{tempName:name,tempId:id}});
					break;                

			}

		},
		//删除模板
		delTemplate(id,index){
			this.$confirm('确认删除该模板?', '操作提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.getHttp('templateDeleteReportTemplate',{id}).then((res)=>{
					if(res){
						this.tableData.splice(index,1);

						if(this.tableData.length == 0){
							this.pageObj.currentPage -= 1;
							if(this.pageObj.currentPage <= 0){
								this.pageObj.currentPage = 1;
							}
							this.funGetPage();
						}
					}
				});
			}).catch(() => {
				console.log('cancel');
			});
		},
		async funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getTemplateList();
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

		//获取模板列表
		async getTemplateList(){
			let retData = [];
			let pageObj = this.pageObj;

			retData = await this.getHttp('templateGetReportTemplates',{page:pageObj.currentPage,num:pageObj.pageSize});
			
			//总记录数
			pageObj.total = Number(retData.count) | 0;
			if(Array.isArray(retData.templates)){
				this.tableData = this.changeTableAttr(retData.templates);
			}
		},
		//前后台字段转换
		changeTableAttr(table){
			let arr = [];
			for(let ele of table){
				let temp = {
					id : ele.id,
					name : ele.name,
					createUser: ele.createUName,
					createTime: this.generatorDate(ele.createTime * 1000).str
				};
				arr.push(temp);
			}
			return arr;
		},
		
		
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '新增报表模板',
					type:'4',
					className:'primary',
					fn:()=>{
						/* eslint-disabled-line */
					}
				},
			]);
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
				dateTime:''          
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
		this.initBtn();
		this.initPageObj();
		this.getTemplateList();
	},
	components:{
		addReportRow:() => import(/* webpackChunkName:"add_report_row_win"*/'./add_report_row_win'),
	}
};
</script>
<style lang='less' scoped>
	.box{
		padding-top:15px;
	}

	.operation{
		color:#E1BB4A;
		padding-right:15px;
		height:30px;
		display: inline-flex;
		align-items: center;
		cursor: pointer;
	}
	.footer{
		padding-top:30px;
	}
</style>