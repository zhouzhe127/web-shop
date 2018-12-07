/*
 * @Author: weifu.zeng 
 * @Date: 2018-10-25 16:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-07 16:34:52
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

			<el-table-column  min-width="150px"  label="状态" prop="percent">
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
					<span class="operation" :style="{'cursor':row.status != statusMap.resolve ? 'not-allowed' : 'pointer'}"   @click="clickOperation('view',row)">查看</span>
					<span class="operation" :style="{'cursor':row.status != statusMap.resolve ? 'not-allowed' : 'pointer'}"  @click="clickOperation('export',row)">导出</span>
					<span v-if="row.error" class="operation error" @click="clickOperation('error',row)">异常</span>
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
		获取物料报表列表:materialreportGetMaterialReportList
		删除物料报表:materialreportDeleteMaterialByIds
		导出报表:materialreportExportMaterialReportExcel

*/
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
import exportFile from 'src/verdor/exportFile';
import storage from 'src/verdor/storage';

export default {
	data () {
		return {
			loading:false,
			statusMap : {
				reject : 13,		//报表生成失败
				rejectName:'失败',
				resolve : 0,		//报表生成成功
				resolveName:'成功',
				opending : 12		//报表生成中
			},						//报表的最终状态
			tableData:[],
			template:{},                        //模板
			pageObj:{},
			taskTimer:{
				rList:'',                       //报表列表,
			},
			selectAll:false,                    //全选
			selectList:[],                      //选中的列表
			shopId:'',
			permission:{
				addReportTask : false,			//是否有生成报表的权限
			}


		};
	},
	methods: {
		//全选,反选
		selectAllchange(bool){
			this.changeListAttrVal(this.tableData,'checked',bool);
			this.addDelSelectList(this.tableData,bool);
		},
		//行选中
		changeRowSelect(row,bool){
			this.addDelSelectList([row],bool);
			this.selectAll = this.isSelectCurrentPage(this.tableData);
		},

		changeUrl(url,item){
			let statusMap = this.statusMap;
			if(item.status == statusMap.reject){
				this.$message('报表生成失败!');
			}else if(item.status == statusMap.resolve){
				this.$router.push({path:url,query:{id:item.id}});
			}else{
				this.$message('报表正在生成中,请稍后...');
			}
		},
		clickOperation(sym,item){
			let ids = '';
			let statusMap = this.statusMap;
			
			switch(sym){
				case 'delete':
					this.delTemplate(`确认删除 ${item.name} 报表吗?`,[item.id]);
					break;
				case 'view':
					if(item.status == statusMap.reject){
						this.$message('报表生成失败!');
					}else if(item.status == statusMap.resolve){
						this.$router.push({path:'/admin/materialReport/viewReport',query:{id:item.id}});
					}else{
						this.$message('报表正在生成中,请稍后...');
					}
					break;
				case 'export':
					if(item.status == statusMap.reject){
						this.$message('报表生成失败!');
					}else if(item.status == statusMap.resolve){
						this.getHttp('materialreportExportMaterialReportExcel',{id:item.id}).then((res)=>{
							exportFile({
								url:res,
								// data:{
								// 	token:this.token,
								// 	shopId:this.shopId
								// }
							});
						});
					}else{
						this.$message('报表正在生成中,请稍后...');
					}
					break;
				case 'error':
					this.$router.push({path:'/admin/materialReport/errorLog',query:{id:item.id,name:item.name}});
					break;
				case 'delAll':
					if(this.selectList.length == 0){
						this.$message('请先选择需要删除的报表!');
						return;
					}
					ids = this.selectList.map( ele => ele.id);
					this.delTemplate('确定要删所选中的报表吗?',ids);               
					break;     
			}
			
		},







		//获取报表列表
		getReportList(){
			let subObj = {
				page : this.pageObj.currentPage,
				size : this.pageObj.pageSize,
				templateId : this.template.id,
			};
			this.taskTimer.rList = Timer.add(
				async ()=>{
					let retObj = await this.getHttp('materialreportGetMaterialReportList',subObj);
					this.pageObj.total = Number(retObj.count) | 0;
					let data = retObj.list;
					if(Array.isArray(data)){
						this.tableData = this.mapListAttr(data);
						this.matchSelectList(this.tableData,this.selectList);
						this.selectAll = this.isSelectCurrentPage(this.tableData);
						if(this.isSelectCurrentPage(this.tableData,{val:this.statusMap.resolve,attr:'status'})){
							this.clearTaskTimer('rList');
						}
					}
					if(!data || (Array.isArray(data) && data.length == 0) ){
						this.clearTaskTimer('rList');						
					}
				},
				15000,
				0,
				true,
				()=>{
					//失败时执行的函数   
				}
			);
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





		//删除报表
		delTemplate(tips,ids){
			this.$confirm(tips, '操作提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				this.getHttp('materialreportDeleteMaterialByIds',{ids:ids.join(',')})
					.then((res)=>{
						if(res){
							this.$message('删除成功!');  
							this.tableData = this.delListByIds(this.tableData,ids);
							this.selectList = this.delListByIds(this.selectList,ids);
							this.selectAll = this.isSelectCurrentPage(this.tableData);
							
							if(this.tableData.length == 0){
								if(this.pageObj.currentPage > 1){
									this.pageObj.currentPage -= 1;
									this.funGetPage('current-change',this.pageObj.currentPage);
								}else{
									this.pageObj.total = 0;
								}
							}
						}else{
							this.$message('删除失败!');  
						}
					});
			}).catch(()=>{
				console.log('取消');
			});
		},
		//前后台字段转换
		mapListAttr(list){
			let arr = [];  
			let statusMap = this.statusMap;
			for(let ele of list){
				let isError = false;				
				let state = '';

				if(ele.content && Array.isArray(ele.content.error)){
					isError = ele.content.error.length > 0;
				}

				if(ele.status == statusMap.reject){
					state = statusMap.rejectName;
				}else if(ele.status == statusMap.resolve){
					state = statusMap.resolveName;
				}else{
					state = ele.percent + '%';
				}

				let temp = {
					id : ele.id,                                    //报表id
					name : ele.objName,                             //报表名称
					createTime : ele.createTime,                    //生成时间
					scope : ele.beginTime+' 至 '+ele.endTime,        //数据时间范围
					createUName : ele.createUName,                  //生成人   
					checked : false,                                //是否选中
					disabled : false,                               //是否可以操作  
					error : isError,								//是否存在异常			
					percent : state,
					status : Number(ele.status)							
				};
				arr.push(temp);
			}
			return arr;
		},
		//批量添加删除选中的
		addDelSelectList(list,sym){
			let selectList = this.selectList;
			for(let i = 0;i < list.length;i += 1){
				for(let j = 0; j < selectList.length ;j += 1){
					if(selectList[j].id == list[i].id){
						selectList.splice(j,1);
						break;
					}
				}
			}
			//添加
			if(sym){
				selectList.push(...list);
			}
		},
		//获取已选中的与可选的元素
		divideList(list){
			let canChoose = [];
			let checkedList = [];
			for(let ele of list){
				if(!ele.disabled){
					canChoose.push(ele);
				}
				if(ele.checked){
					checkedList.push(ele);
				}
			}
			return {canChoose,checkedList};
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
			let p = Number(query.permission);
			this.permission.addReportTask = Boolean(p);
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
			let arr = [
				{
					name: '返回',
					type:'4',
					className:'plain',
					fn:()=>{
						this.$router.go(-1);
					}
				},
			];
			
			let obj = {
				name: '生成报表',
				type:'4',
				className:'primary',
				fn:()=>{
					let temp = this.template;
					this.$router.push({path:'/admin/materialReport/createReport',query:{
						id : temp.id,
						name : temp.name,
					}});				
				}
			};

			if(this.permission.addReportTask){
				arr.push(obj);
			}

			this.$store.commit('setPageTools',arr);
		},
		initData(){
			let currentShop = storage.session('userShop').currentShop;
			this.shopId = currentShop.id;
		},


		delListByIds(list,ids,attr='id'){
			let arr = [];

			for(let ele of list){
				let flag = true;
				for(let id of ids){
					if(ele[attr] == id){
						flag = false;
						break;
					}
				}
				if(flag){
					arr.push(ele);
				}
			}
			return arr;
		},
		//是否选择当前页
		isSelectCurrentPage(list,obj={val:true,attr:'checked'}){
			let {val,attr,sym=true} = obj;

			for(let ele of list){
				if(ele[attr] != val){
					sym = false;
					break;
				}
			}
			if(list.length == 0){
				sym = false;
			}
			return sym;
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
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
	},
	mounted(){
		this.initData();
		this.initPageObj();		
		this.getQuery();		
		this.initBtn();
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
	.not-allow{
		cursor: not-allowed;
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