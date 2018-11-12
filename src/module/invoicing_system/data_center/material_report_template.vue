/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:29 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-12 17:54:54
 */

<template>
	<div class="box">
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
					<span class="operation" v-if="permission.editReportTemplate" @click="clickOperation('edit',row,$index)">编辑</span>
					<span class="operation" v-if="permission.deleteReportTemplate" @click="clickOperation('delete',row,$index)">删除</span>
					<span class="operation" v-if="permission.addReportTask" @click="clickOperation('generator',row,$index)">生成报表</span>
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
	获取权限列表:newGetPermissionsList
	获取职位列表:getUserRoleList
*/
let permissionId = {
	editReportTemplate : 6045,			//修改自定义报表模板
	deleteReportTemplate : 6046,		//删除自定义报表模板
	addReportTemplate : 6047,			//新增自定义报表模板
	addReportTask : 6048,				//生成报表
};

// [
// 	{id:6045,name:'editReportTemplate',title:'修改自定义报表模板'},
// 	{id:6046,name:'deleteReportTemplate',title:'删除自定义报表模板'},
// 	{id:6047,name:'addReportTemplate',title:'新增自定义报表模板'},
// 	{id:6048,name:'addReportTask',title:'生成报表'},
// ];

import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data () {
		return {
			permission : {
				editReportTemplate : false,			//修改自定义报表模板
				deleteReportTemplate : false,		//删除自定义报表模板
				addReportTemplate : false,			//新增自定义报表模板
				addReportTask : false,				//生成报表
			},
			bool:false,
			pageObj:{},
			tableData:[],
			roleId:null,				//当前操作人的角色id
		};
	},
	methods: {
		clickOperation(sym,row,index){
			let {id,name} = row;
			switch(sym){
				case 'edit'://编辑报表
					this.$router.push({path:'/admin/materialReport/createReport',query:{id:id}});								
					break;
				case 'delete'://删除报表
					this.delTemplate(id,index);
					break;                
				case 'generator'://生成报表
					this.$router.push({path:'/admin/materialReport/createReport',query:{id,name}});				
					break;                
				case 'view'://查看报表
					this.$router.push({path:'/admin/materialReport/finishedReport',query:{tempName:name,tempId:id}});
					break;                

			}

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



		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getTemplateList();
		},
		//删除模板
		delTemplate(id,index){
			this.$confirm('删除后已生成的表格也将一并删除，确定要删除该报表模板吗', '操作提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.getHttp('templateDeleteReportTemplate',{id})
					.then((res)=>{
						if(res){
							this.tableData.splice(index,1);

							if(this.tableData.length == 0){
								this.pageObj.currentPage -= 1;
								if(this.pageObj.currentPage <= 0){
									this.pageObj.currentPage = 1;
								}
								this.getTemplateList();
							}
						}else{
							this.$message('删除失败!');
						}
					});
			}).catch(() => {
				console.log('cancel');
			});
		},
		//前后台字段转换
		changeTableAttr(table){
			let arr = [];
			for(let ele of table){
				let temp = {
					id : ele.id,												//模板id
					name : ele.name,											//模板名
					createUser: ele.createUName,								//创建人
					createTime: this.generatorDate(ele.createTime * 1000).str,	//创建时间
					editReportTemplate : this.checkPermission(permissionId.editReportTemplate),
					deleteReportTemplate : this.checkPermission(permissionId.deleteReportTemplate),
					addReportTemplate : this.checkPermission(permissionId.addReportTemplate),
					addReportTask : this.checkPermission(permissionId.addReportTask)
				};
				arr.push(temp);
			}
			return arr;
		},
		//检查权限
		checkPermission(nodeIds,id){
			id = Number(id);
			if(this.roleId == 0){
				return true;
			}else{
				return nodeIds.includes(id);
			}
		},



		//获取职位列表
		async getUserRoleList(){
			let nodeIds = [];

			if(this.roleId != 0){
				let res = await this.getHttp('getUserRoleList');
				if(Array.isArray(res)){
					res.map((ele)=>{
						ele.nodeIds = ele.nodeIds.split(',').map( e => Number(e));

						if(ele.id == this.roleId){
							nodeIds = ele.nodeIds;
						}
						return ele;
					});
				}
			}

			let attrs = 'editReportTemplate,deleteReportTemplate,addReportTemplate,addReportTask'.split(',');
			
			for(let attr of attrs){
				this.permission[attr] = this.checkPermission(nodeIds,permissionId[attr]);
			}
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
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '新增报表模板',
					type:'4',
					className:'primary',
					fn:()=>{
						this.$router.push({path:'/admin/materialReport/creatTempMain'});
					}
				},
			]);
		},
		initData(){
			let currentShop = storage.session('userShop').currentShop;
			this.roleId = Number(currentShop.roleId);
		},




		getEle(list,val,attr='id'){
			for(let ele of list){
				if(ele[attr] == val){
					return ele;
				}
			}
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
		this.initData();
		this.initBtn();
		this.initPageObj();
		this.getUserRoleList();
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