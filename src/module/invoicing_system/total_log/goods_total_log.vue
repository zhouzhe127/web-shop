<template>
	<div class="goods-total-log">
		<div class="tab-header">
			<el-button-group>
				<el-button type="primary" >商品</el-button>
				<el-button type="primary" :plain="true" @click="navigateTo('goods')">物料</el-button>
			</el-button-group>
		</div>
		
		<div class="search-header">
			<div class="in-block">
				<el-date-picker
					v-model="condition.time"
					type="daterange"
					:editable="false"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					format="yyyy-MM-dd"
					:default-time="['00:00:00', '23:59:59']"

					>
				</el-date-picker>
			</div>

			<div class="in-block" >
				<el-select v-model="condition.operationType" :multiple="true" placeholder="操作类型" collapse-tags clearable>
					<el-option
					v-for="item in operationList"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>

			</div>

			<div class="in-block">
				<el-input clearable v-model="condition.goodsName" placeholder="商品名称" style="width:194px"></el-input>
			</div>

			<div class="in-block" >
				<el-input clearable v-model="condition.code" placeholder="条形码" style="width:194px"></el-input>
			</div>

			<div class="in-block" >
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

				<el-select v-model="condition.wid" :multiple="true" placeholder="仓库选择" clearable>
					<el-option
					v-for="item in warehouseList"
					:key="item.id"
					:label="item.name"
					:value="item.id">
					</el-option>
				</el-select>
			</div>

			<div class="in-block" style="padding-left:10px;">
				<el-button type="primary" @click="filterReset('filter')">筛选</el-button>
				<el-button type="info" @click="filterReset('reset')">重置</el-button>
			</div>
		</div>

		<div class="content">
			<el-table :data="tableData" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
				<el-table-column prop="name" width="150px"  label="商品名称" fixed="left">
					<span slot-scope="{row,column}" @click="viewDetail(row,column)" class="yellow-font">{{row.itemName}}</span>
				</el-table-column>
				<el-table-column prop="itemBarCode" width="150px" label="条形码" >
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
				<el-table-column  label="成本金额" width="150px">
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrowCost,'arrow-down':!row.arrowCost}"></span>
						{{row.cost}}
					</template>	  
				</el-table-column>
				<el-table-column  label="结存金额" width="150px">
					<template slot-scope="{row,column,index}">
						<!-- <span class="arrow" :class="{'arrow-up':row.arrowBalanceAmount,'arrow-down':!row.arrowBalanceAmount}"></span> -->
						{{row.balanceAmount}}
					</template>	  
				</el-table-column>
				<el-table-column label="售卖价格" width="150px">
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrowPrice,'arrow-down':!row.arrowPrice}"></span>
						{{row.price}}
					</template>	  
				</el-table-column>
				<el-table-column prop="createTime" label="日期" width="150px">
				</el-table-column>
				<el-table-column prop="createUName" label="操作人" width="150px">
				</el-table-column>
				<el-table-column prop="wName" label="仓库" width="150px">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="150px">
					<template slot-scope="{row,column}">
						<span @click="viewHistory(row)" class="view view-detail" :class="{'view-detail-disable':canViewHistory(row)}">查看记录</span>
						<span @click="viewBatchDetail(row)" class="view" :class="{'view-detail-disable':canviewBatchDetail(row)}">批次详情</span>
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
				<div class="dialog-content" >
					<div class="column">
						<div>商品名:{{materialInfo.gName}}</div>
						<div>条形码:{{materialInfo.barCode}}</div>
						<div>品牌:{{materialInfo.brandName}}</div>
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
						<div>单位:{{materialInfo.unit}}</div>
						<div>售价:{{materialInfo.price}}</div>
						<div>批次数:{{materialInfo.batchNum}}</div>
					</div>
					<div class="column">
						<div>规格:{{materialInfo.specifications}}</div>
						<div>保质期:{{materialInfo.validity}}{{materialInfo.validityTypeName}}</div>
						<div>耗损:{{materialInfo.lossNum}}</div>
						<div class="column-container">
							<div class="label">货架位置:</div>
							<div class="">
								<template v-for="(a,ai) in materialInfo.shelves">
									<p :key="ai">
										{{a.shelfName}}/{{a.areaName}}
										<i v-if="ai != materialInfo.shelves.length -1 ">&nbsp;;&nbsp;</i>
									</p>
								</template>                        
							</div>
						</div>
						<div>仓库数量/重量:{{materialInfo.surplus}}{{materialInfo.unit}}</div>
						<div>上架数量:{{materialInfo.shelveNum}}{{materialInfo.unit}}</div>
						<div>总量:{{materialInfo.total}}{{materialInfo.unit}}</div>
					</div>
				</div>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import common from './goods_material_log.js';
/*
		
		商品:
			不查看批次,记录
				售卖                      8      
				下架到耗损                 7          货架耗损 
				下架到库存（货架)           20                     
				上架（货架）               19
				入库并上架                 15
				盘点货架                  16
		物料:
			不查看批次,记录
				售卖                      8      
				下架到库存（货架)           20     
				下架到耗损                 7          货架耗损 
				上架（货架）               19
				入库并上架                 15
				盘点货架                  16


		
	问题:
		仓库选择?:仓库的筛选
		多选?:操作类型,仓库的单选多选
		时间?:

	请求:
		获取商品日志类型:invoicing_getInventoryLogType
		获取商品库存详情:InvoicingGetGoodsDetail
		导出:InvoicingExportGoodsLogList
*/
export default {
	mixins:[common],
	data () {
		return {
			condition:{},
			categoryList:[],
			warehouseList:[],
			operationList:[],
			tableData:[],
			pageObj:{},

			dialog:{
				title:'库存详情',
				show:false
			},
			materialInfo:{},            //商品详情
			tabFlag : 'goods'			//商品还是物料

		};
	},
	methods: {
		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getList();
		},
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


		//获取日志列表
		async getList(){
			let retData = {},
				subObj = {};

			subObj = this.getSubmitData();
			retData = await this.getHttp('InvoicingGetGoodsLogList',subObj);

			if(!Array.isArray(retData.list)) retData.list = [];
			this.tableData = retData.list;
			this.pageObj.total = retData.count || 0;
			this.pageObj.total = Number(this.pageObj.total);
			
			this.initTableData();
		},
		initTableData(){
			this.tableData = this.tableData.map((ele)=>{
				ele.createTime = this.generatorDate(ele.createTime * 1000).str;         //时间
				ele.operationType = this.getAttr(this.operationList,ele.type);          //操作类型


				ele.arrowOperation = ele.change > 0;                                    //变化量红色箭头

				ele.arrowCost = ele.cost > 0;                                           //成本红色箭头

				ele.arrowPrice = ele.price > 0;

				ele.arrowBalanceAmount = ele.balanceAmount > 0;

				this.calcNum(ele,['balanceAmount','cost']);

				ele.changeBefore = ele.changeBefore + ele.itemUnit;
				ele.change = ele.change + ele.itemUnit;
				ele.changeAfter = ele.changeAfter + ele.itemUnit;

				if(!ele.createUName){
					ele.createUName = this.placeholder;
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
							this.getHttp('InvoicingExportGoodsLogList',obj);
						}
					},
				];
			}
			this.$store.commit('setPageTools',btns);
		},

		//查看商品详情
		async viewDetail(row){
			let info = {};
			info = await this.getHttp('InvoicingGetGoodsDetail',{gid:row.itemId,wid:0});
			if(!info || typeof info != 'object') info = {};
			info.validityTypeName = this.getAttr(this.valiDate,info.validityType);
			this.materialInfo = info;
			this.dialog.show = true;
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

		//获取分类
		async getCategoryList(){
			let cate = await this.getHttp('getCategoryList');
			if(Array.isArray(cate)){
				this.categoryList = cate.map((ele)=>{
					ele.value = ele.id;
					ele.label = ele.name;
					ele.children = ele.child;
					ele.children = ele.children.map((e)=>{
						e.value = e.id;
						e.label = e.name;
						return e;                        
					});
					return ele;
				});
			}
		},
	},
	mounted(){
		this.initData();
		this.initPageObj();
		this.initCondition();
	},
	async activated(){
		this.initBtn();
		this.getQueryData();
		await this.getOperationList();
		this.getCategoryList();
		this.getWarehouseList();
		this.filterReset('filter',this.pageObj.currentPage);
	}
};
</script>
<style lang='less' scoped>
	@import url('./goods_material_log.less');
</style>