<template>
	<div class="goods-total-log">
		<div class="tab-header">
			<el-button-group>
				<el-button type="primary" :plain="true" @click="navigateTo('material')">商品</el-button>
				<el-button type="primary" >物料</el-button>
			</el-button-group>
		</div>
		
		<div class="search-header">
			<div class="in-block">
				<el-date-picker
					v-model="condition.time"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy-MM-dd"
					:default-time="['00:00:00', '23:59:59']"
					>
				</el-date-picker>
			</div>

			<div class="in-block" >
				<el-select v-model="condition.operationType" placeholder="操作类型" multiple collapse-tags>
					<el-option
					v-for="item in operationList"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</div>

			<div class="in-block">
				<el-input clearable v-model="condition.goodsName" placeholder="物料名称" style="width:194px"></el-input>
			</div>

			<div class="in-block" >
				<el-input v-if="false" clearable v-model="condition.code" placeholder="物料编码" style="width:194px"></el-input>
			</div>

			<div class="in-block">
				<el-input clearable v-model="condition.operationUser" placeholder="操作人" style="width:194px"></el-input>
			</div>

			<!-- 商品分类 -->
			<div class="in-block" >
				<el-cascader
					expand-trigger="hover"
					:options="categoryList"
					v-model="condition.category"
					placeholder="请选择分类"
					:filterable="true"
					:change-on-select="true"
					clearable
					>
				</el-cascader>
			</div>
			<div class="in-block">
				<el-select v-model="condition.wid" placeholder="仓库选择" multiple collapse-tags>
					<el-option
					v-for="item in warehouseList"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</div>

			<div class="in-block" style="padding-left:10px;">
				<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
				<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
			</div>
		</div>

		<div class="content">
			<el-table :data="tableData" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
				<el-table-column prop="name" width="150px" label="物料名称" fixed="left">
					<span slot-scope="{row,column}" @click="viewDetail(row,column)" class="yellow-font">{{row.itemName}}</span>
				</el-table-column>

				<el-table-column prop="operationType" width="150px" label="操作类型" >
				</el-table-column>

				<el-table-column prop="changeBefore" width="150px" label="操作前数量/重量" >
				</el-table-column>

				<el-table-column  width="150px" label="数量/重量变化" >
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrowOperation,'arrow-down':!row.arrowOperation}"></span>
						{{row.change}}
					</template>	
				</el-table-column>

				<el-table-column prop="changeAfter" width="150px" label="操作后数量/重量" >
				</el-table-column>
				<el-table-column  label="成本金额" >
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrowCost,'arrow-down':!row.arrowCost}"></span>
						{{Number(row.cost)}}
					</template>	                    
				</el-table-column>
				<el-table-column  label="结存金额" width="150px">
					<template slot-scope="{row,column,index}">
						<!-- <span class="arrow" :class="{'arrow-up':row.arrowBalanceAmount,'arrow-down':!row.arrowBalanceAmount}"></span> -->
						{{row.balanceAmount}}
					</template>	  
				</el-table-column>
				<el-table-column prop="createTime" label="日期" width="150px">
				</el-table-column>
				<el-table-column prop="createUName" label="操作人" width="150px">
				</el-table-column>
				<el-table-column prop="wName" label="仓库/货架" width="150px">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="150px">
					<template slot-scope="{row,column,index}">
						<span class="view view-detail" @click="viewHistory(row)" :class="{'view-detail-disable':canViewHistory(row)}">查看记录</span>
						<span class="view" :class="{'view-detail-disable':canviewBatchDetail(row)}"  @click="viewBatchDetail(row)">批次详情</span>
					</template>
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
		<div class="component">
			<el-dialog
				:title="dialog.title"
				:visible.sync="dialog.show"
				width="570px"
				center
			>
			<div class="dialog-content">
				<div class="column">
					<div>物料名称:{{materialInfo.name}}</div>
					<div>物料编码:{{materialInfo.barCode}}</div>
					<div>品牌:{{materialInfo.brandName}}</div>
					<div>批次数:{{materialInfo.batchNum}}</div>
					<div>物料类型:{{materialInfo.typeName}}</div>
					<div>物料单位:
						<template v-for="(a,ai) in materialInfo.unit">
							{{a.name}}
							<i :key="ai" v-if="ai != materialInfo.unit.length -1 ">&nbsp;,&nbsp;</i>
						</template>
					</div>
					<div>默认单位:{{materialInfo.defUnitName}}</div>
					<div>最小单位:{{materialInfo.minUnitName}}</div>
				</div>
				<div class="column">
					<div class="column-container">
						<div class="label">单位换算:</div>
						<div class="">
							<template v-for="(a,ai) in materialInfo.unit">
								<p :key="ai">
									1{{a.name}}={{a.value}}{{materialInfo.minUnitName}}
									<i v-if="ai != materialInfo.unit.length -1 ">&nbsp;;&nbsp;</i>
								</p>
							</template>                        
						</div>
					</div>
					<div class="column-container">
						<div class="label">分类:</div>
						<div class="">
							<template v-for="(a,ai) in materialInfo.cate">
								<p :key="ai">
									{{a.name}}
									<i v-if="ai != materialInfo.cate.length -1 ">&nbsp;;&nbsp;</i>
								</p>
							</template>                        
						</div>
					</div>
					<div>库存总量:{{materialInfo.sumStoreNum}}</div>
					<div>保质期:{{materialInfo.validity}}{{materialInfo.validityTypeName}}</div>
				</div>
			</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
/*
	请求:
		获取物料操作类型:invoic_getType
		获取物料总日志列表:invoicingGetMaterialLogList
		获取一个或多个物料的单位和关联:materialGetUnitRelation
		获取物料详情:MaterialGetMaterialDetail
		导出:InvoicingExportMaterialLogList

	问题:
		仓库的选择
		其他页面的分页组件
	
	优化:
		搜索时间间隔

*/
import common from './goods_material_log.js';
import global from 'src/manager/global';

export default {
	mixins:[common],
	data () {
		return {
			materialType:[
				{id:0,name:'成品'},
				{id:1,name:'半成品'},
				{id:2,name:'普通物料'}
			],


			condition:{},
			categoryList:[],
			warehouseList:[],
			operationList:[],
			tableData:[],
			materialInfo:{},                //物料信息

			pageObj:{},
			dialog:{
				title:'物料信息',
				show:false
			},
			tabFlag : 'material',			//商品还是物料
			placeholder:'--',
		};
	},
	methods: {
		//筛选重置
		filterReset(flag,page){
			if(flag == 'reset'){
				this.initPageObj();
				this.initCondition();
			}else{
				this.pageObj.currentPage = page || 1;
			}
			this.getList();
		},
		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getList();
		},


		//获取日志列表
		async getList(){
			let retData = {},
				unitArr = [],
				midStr = [],
				subObj = {};

			//获取日志
			subObj = this.getSubmitData();
			retData = await this.getHttp('invoicingGetMaterialLogList',subObj);
			if(!Array.isArray(retData.list)) retData.list = [];
			this.tableData = retData.list;
			this.pageObj.total = retData.count || 0;
			this.pageObj.total = Number(this.pageObj.total);

			//获取物料单位
			midStr = this.getListAttrs(this.tableData,'itemId');
			midStr = midStr.join(',');
			unitArr = await this.getHttp('materialGetUnitRelation',{mids:midStr});
			if(!Array.isArray(unitArr)) unitArr = [];

			//初始化日志列表
			this.matchList(this.tableData,unitArr);
			this.initTableData();
		},
		//初始化表格数据
		initTableData(){
			this.tableData = this.tableData.map((ele)=>{
				ele.createTime = this.generatorDate(ele.createTime * 1000).str;         //时间
				ele.operationType = this.getAttr(this.operationList,ele.type);          //操作类型

				ele.arrowOperation = ele.change > 0;                                    //变化量红色箭头

				ele.arrowCost = ele.cost > 0;                                           //成本红色箭头

				ele.arrowBalanceAmount = ele.balanceAmount > 0;                         //结存金额

				this.calcNum(ele,['balanceAmount','cost']);

				this.getMaterialUnitInfo(ele,null,'relation');
				
				this.initObject(ele,['changeBefore','change','changeAfter'],0);

				if(ele.changeBefore){
					ele.changeBefore = global.comUnit(ele.changeBefore, ele.selUnitVal, ele.selUnitName, ele.minUnitName);
				} 
				if(ele.change){
					ele.change = global.comUnit(ele.change, ele.selUnitVal, ele.selUnitName, ele.minUnitName);
				}
				if(ele.changeAfter){
					ele.changeAfter = global.comUnit(ele.changeAfter, ele.selUnitVal, ele.selUnitName, ele.minUnitName);
				}
				if(!ele.createUName){
					ele.createUName = this.placeholder;
				}

				if(!ele.wName){
					ele.wName = this.placeholder;
				}
				return ele;
			});
		},

		initBtn(btns){
			if(!btns){
				btns = [
					{
						name: '导出',
						type:'4',
						className:'primary',
						fn:async ()=>{
							let obj = this.getSubmitData();
							this.getHttp('InvoicingExportMaterialLogList',obj);
						}
					}
				];
			}
			this.$store.commit('setPageTools',btns);
		},

		//查看物料详情
		async viewDetail(row){
			this.materialInfo = await this.getHttp('MaterialGetMaterialDetail',{mid:row.itemId,wid:0,isDistribution:0});
			this.initMaterialInfo();
			this.dialog.show = true;    
		},
		initMaterialInfo(){
			let info = this.materialInfo;
			if(this.toRaw(info,'Object')){
				this.getMaterialUnitInfo(info,null,'unit');
				info.typeName = this.getAttr(this.materialType,info.type);
				if(info.selUnitId){
					info.sumStoreNum = global.comUnit(info.num, info.selUnitVal, info.selUnitName, info.minUnitName);
				}else{
					info.sumStoreNum = this.placeholder;
				}
				if(!info.brandName){
					info.brandName = this.placeholder;
				}
				info.validityTypeName = this.getAttr(this.valiDate,info.validityType);
			}else{
				info = {};
			}
			this.materialInfo = info;            
		},

		//获取地址栏参数
		getQueryData(){
			let {ms_name:name,ms_operationType:operationType,ms_sTime:sTime,ms_eTime:eTime} = this.$route.query;
			let inValid = new Date('undefined').toString();

			if(name){
				this.condition.goodsName = name;
			}

			if(operationType){
				operationType = operationType.split(',');
				this.condition.operationType = operationType.map( ele => Number(ele));
			}

			sTime =  new Date(sTime * 1000);
			eTime =  new Date(eTime * 1000);                
			
			if(sTime.toString() == inValid || eTime.toString() == inValid){
				this.condition.time = [];
			}else{
				this.condition.time = [sTime,eTime];
			}

		},


		//匹配
		matchList(list,unit){
			let listAttr = 'itemId',
				getAttr = 'relation',
				unitAttr = 'mid';

			for(let ele of list){
				for(let e of unit){
					if(ele[listAttr] == e[unitAttr]){
						ele[getAttr] = e[getAttr];
					}
				}
			}
		},
		//获取物料关联关系
		getMaterialUnitInfo(ele,id,attr='unit'){
			//获取物料的单位信息
			if(!Array.isArray(ele[attr])){
				ele[attr] = [];
			}
			for(let item of ele[attr]){
				if(item.isMin == 1){
					ele.minUnitName = item.name;
					ele.minUnitId = item.muId;
				}
				if(item.isDefault == 1){
					ele.defUnitName = item.name;
					ele.defUnitId = item.muId;
					ele.defUnitVal = item.value;
				}
				if(id == item.muId){
					ele.selUnitName = item.name;
					ele.selUnitId = item.muId;
					ele.selUnitVal = item.value;
				}
			}

			if(!id){
				ele.selUnitId = ele.defUnitId;
				ele.selUnitName = ele.defUnitName;
				ele.selUnitVal = ele.defUnitVal;
			}
			if(!ele.selUnitName) ele.selUnitName = this.placeholder;
			if(!ele.defUnitName) ele.defUnitName = this.placeholder;
			if(!ele.minUnitName) ele.minUnitName = this.placeholder;
			if(!ele.selUnitVal) ele.selUnitVal = 1;
			if(!ele.defUnitVal) ele.defUnitVal = 1;
		},
		toRaw(val,type){
			return Object.prototype.toString.call(val).slice(8,-1) === type;
		},
		//获取分类
		async getCategoryList(){
			let cate = await this.getHttp('MaterialGetCategoryList');
			let arr = [];
			
			if(Array.isArray(cate)){
				for(let ele of cate){
					if(!Number(ele.pid)){
						ele.value = ele.id;
						ele.label = ele.name;
						ele.children = [];
						for(let e of cate){
							if(ele.id == e.pid){
								e.value = e.id;
								e.label = e.name;
								ele.children.push(e);
							}
						}
						arr.push(ele);
					}
				}
			}
			this.categoryList = arr;
		},
	},
	mounted(){
		this.initData();
		this.initCondition();
		this.initPageObj();
	},
	async activated(){
		this.initBtn();        
		this.getQueryData();        
		await this.getOperationList('material');
		this.getCategoryList();
		this.getWarehouseList();
		this.filterReset('filter',this.pageObj.currentPage);
	},
	beforeRouteLeave(to,from,next){
		let query = 'ms_name,ms_operationType,ms_sTime,ms_eTime'.split(',');
		for(let key of query){
			if(to.query[key] != undefined){
				delete to.query[key];
			}
		}
		next();
	}
};
</script>
<style lang='less' scoped>
	@import url('./goods_material_log.less');
</style>