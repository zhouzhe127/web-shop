/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:20:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-27 10:35:28
 */

<template>
	<div class="pad-bottom">
		<div class="head">
			<span>报表名称 : {{reportName}}</span>
			<div></div>
		</div>
		<div class="search-header">
			<div class="in-block" >
				<el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="100" style="width:224px"></el-input>
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
			<el-table 
				:data="tableData"  
				v-loading="false" 
				element-loading-text="加载中,请稍后..."
				stripe 
				border 
				:header-cell-style="{'background-color':'#F5F7FA'}"
				:cell-style="setColumnStyle"
				:span-method="objectSpanMethod"
				@cell-click="cellClick"
			>

				<el-table-column  width="80px" fixed="left" align="center">
					<span slot-scope="{row,column,$index}">
						<i v-if="row.cus_cate"  :class="{'el-icon-arrow-down':row.cus_expand,'el-icon-arrow-right':!row.cus_expand,'y-font':true}"></i>
						<!-- <i v-else  :class="['y-font','el-icon-minus']"></i> -->
						<i v-else  :class="['y-font']">
							{{row.pid == undefined ? '--' : ''}}
						</i>
					</span>
				</el-table-column>

				<el-table-column fixed="left" min-width="200px" label="自定义分类" prop="cus_cate" :show-overflow-tooltip="true">
				</el-table-column>

				<el-table-column fixed="left" min-width="200px"  label="物料名称" prop="name" :show-overflow-tooltip="true">
				</el-table-column>

				<el-table-column  min-width="150px"  label="物料编码" prop="barCode">
				</el-table-column>



				<template v-for="(t,ti) in tableTitle" >
					<el-table-column  min-width="200px"  :key="ti">
						<template slot="header" slot-scope="{row,column}">
							{{t.name}}
							<p class="create-time">{{t.beginDate}} 至 {{t.endDate}}</p>
						</template>

						<template slot-scope="{row,column}">
							{{row[t.attr]}}
						</template>
					</el-table-column>
				</template>

			</el-table>              
		</div>
	</div>
</template>

<script>
/*
	接口:
		获取报表详情:materialreportGetMaterialReportDetail
		导出报表:materialreportExportMaterialReportExcel
		删除物料报表:materialreportDeleteMaterialByIds

	表头:
		[
			{
				attr: "t-0"				
				name: "普通盘亏数量"				
			}	
		]

	表格:
		[
			{
				//物料范围属性
				id:''							//物料id
				name:							//物料名
				barCode:''						//物料编码,

				//集合属性
				cus_cate:						//自定义分类			   集合才有的属性
				cus_expand:false				//是否展开当前集合		 集合才有的属性
				cus_collectionId:				//集合Id
				children:[							//集合子列表			   集合才含有的属性
					childs:							//子列表长度,合并单元格
					start:							//是否为起始元素,合并单元格
					pid:							//相应的集合Id cus_collectionId					
					id:''							//物料id
					name:							//物料名字
					barCode:''						//物料编码,
				]
			}
		]

*/
import http from 'src/manager/http';
import exportFile from 'src/verdor/exportFile';
import storage from 'src/verdor/storage';

export default {
	data () {
		return {
			pageObj:{},
			condition:{},

			tableData:[],				//表数据
			expandRow:[],				//需要展开的行
			tableTitle:[],				//表头

			reportId : '', 				//报表id
			reportName : '--',			//报表名
			shopId:'',
		};
	},
	methods: {
		filterReset(sym){
			if(sym == 'reset'){
				this.initCondition();
			}
			this.getDetail();
		},



		//获取报表详情
		async getDetail(){
			let condition = this.condition;
			let tableData = [];
			let expandData = [];
			let subObj = {
				id : this.reportId,
				name : condition.name,
				barCode : condition.code
			};
			let res = await this.getHttp('materialreportGetMaterialReportDetail',subObj);

			if( this.toRaw(res,'object')){
				//报表名称
				this.reportName = res.objName;
				//报表id
				this.reportId = res.id;
				//表头名称
				let {customItem=[],data=[],timeQuantum=[]} = res;
				//组合表头
				this.tableTitle = this.organizeTableTitle(customItem,timeQuantum);
				//组合表数据
				tableData = this.organizeTableData(data);
				//展开所有列表
				expandData = this.expandList(tableData);
				//拼接值与单位
				this.joinValueUnit(expandData);

				this.tableData = tableData;
			}
		},



		//设置列的样式
		setColumnStyle({row,columnIndex}){
			// row, column, rowIndex, columnIndex
			if(columnIndex == 0){
				if(row.start){
					return{'background':'#fff'};
				}
				if(row.cus_collectionId != undefined){
					return {'cursor':'pointer'};
				}
			}

		},
		//行列的合并
		objectSpanMethod({row, columnIndex}){
			//row, column, rowIndex, columnIndex
			if(columnIndex == 1 || columnIndex == 0){
				if(row.pid != undefined){
					if(row.start && columnIndex == 0){
						return {
							rowspan:row.childs,
							colspan:2
						};
					}else{
						return {
							rowspan:1,
							column:0,
						};
					}
				}
			}
		},
		cellClick(row, column){
			//row, column, cell, event
			if(!column['label']){

				if(row['cus_cate'] && typeof row['cus_expand'] == 'boolean'){
					row['cus_expand'] = !row['cus_expand'];

					if(row['cus_expand']){
						//展开行
						let rowIndex = this.tableData.findIndex( ele => ele.cus_collectionId == row.cus_collectionId);
						let children = row.children;
						
						this.tableData.splice(rowIndex + 1,0,...children);
						this.expandRow.push(row.cus_collectionId);
					}else{
						//收起行
						this.tableData = this.tableData.filter( ele => ele.pid != row.cus_collectionId);
						this.expandRow = this.expandRow.filter( ele => ele != row.cus_collectionId);
					}
				}

			}
		},


		//删除报表
		delTemplate(tips,ids){
			this.$confirm(tips, '操作提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=>{
				this.getHttp('materialreportDeleteMaterialByIds',{ids:ids})
					.then((res)=>{
						if(res){
							this.$message('删除成功!');  
							this.$router.go(-1);
						}else{
							this.$message('删除失败!');  
						}
					});
			}).catch(()=>{
				console.log('取消');
			});
		},
		//组合表头
		organizeTableTitle(list,times){
			let arr = [];
			for(let i = 0 ; i < list.length; i += 1){
				if(!list[i]){
					list[i] = {};
				} 
				if(!times[i]){
					times[i] = {};
				}
				let obj = {
					attr:'t-'+i,
					name:list[i]
				};
				Object.assign(obj,times[i]);
				arr[i] = obj;
			}
			return arr;
		},
		//组合聚合数据
		organizeCollection(list){
			let obj = {};
			let tableTitle = this.tableTitle;

			for(let i = 0 ;i < tableTitle.length ; i += 1){
				let ele = tableTitle[i];
				obj[ele.attr] = list[i];
			}
			return obj;
		},
		//组合表数据
		organizeTableData(data){
			let arr = [];
			let type = {
				scope:3,					//物料范围
				collection:4				//集合
			};
			let index = 1;					//集合起始id
			let _this = this;
			
			function organizeMaterial(ele,collectionId){
				let temp = [];
				for(let e of ele['item']){
					let customItem = _this.organizeCollection(e.reportInfo);
					let obj = Object.assign(e.itemInfo,customItem);
					if(collectionId != undefined){
						obj.pid = collectionId;
					}
					temp.push(obj);
				}
				return temp;
			}

			for(let ele of data){
				if(ele['type'] == type.scope){
					let mList = organizeMaterial(ele);
					arr.push(...mList);
				}else{
					let customItem = this.organizeCollection(ele.count);	
					let mList = organizeMaterial(ele,index);

					if(mList[0]){
						mList[0]['start'] = true;
						mList[0]['childs'] = mList.length;
					} 

					let obj = {
						cus_expand : false,								//自定义是否展开
						cus_cate : ele.customName,						//自定义分类
						cus_collectionId : index++, 					//自定义集合id
						children : mList,								//子列表
					};
					Object.assign(obj,customItem);				
					arr.push(obj);
				}
			}
			return arr;
		},
		//获取所有行列表,包括集合的子列表
		expandList(list){
			let arr = [];
			for(let ele of list){
				arr.push(ele);
				if(Array.isArray(ele.children)){
					arr.push(...ele.children);
				}
			}
			return arr;
		},	
		//拼接值与单位
		joinValueUnit(list){
			// let type = {
			// 	base : 1,
			// 	formular : 2
			// };
			let tableTitle = this.tableTitle;

			for(let item of list){
				for(let i = 0 ;i < tableTitle.length ; i += 1){
					let ele = tableTitle[i];
					let customItem = item[ele.attr];
					if(!customItem) customItem = {};
					if(!customItem['value']) customItem['value'] = 0;
					if(!customItem['unitName']) customItem['unitName'] = '';

					customItem['value'] = this.calcValue(customItem['value']);

					item[ele.attr] = customItem['value'] + customItem['unitName'];
				}
			}
		},
		calcValue(str,scope = 4){
			if(!str) str = 0;
			
			str += '';
			let index = str.indexOf(".");
			if(index > -1){
				str = str.slice(0,index + scope);
			}
			return str;
		},




		//获取查询参数
		getQuery(){
			let query = this.$route.query;
			if(Number(query.id)){
				this.reportId = Number(query.id); 
			}
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
						this.delTemplate('确定要删除当前报表吗?',this.reportId);
					}
				},
				{
					name: '导出',
					type:'4',
					className:'primary',
					fn:async ()=>{
						let res = await this.getHttp('materialreportExportMaterialReportExcel',{id:this.reportId});
						exportFile({
							url:res,
						});
					}
				},
			]);
		},
		initData(){
			let currentShop = storage.session('userShop').currentShop;
			this.shopId = currentShop.id;
		},


		toRaw(data,type){
			return Object.prototype.toString.call(data).slice(8,-1).toLowerCase() == type.toLowerCase();
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},

	},
	mounted(){
		this.initData();
		this.getQuery();
		this.initBtn();
		this.filterReset('reset');
	},
};
</script>


<style lang='less' scoped>

	@ey:#E1BB4A;
	.y-font{
		color:@ey;
	}
	
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

