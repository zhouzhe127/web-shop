<template>
<div>
	<div class="table-title">
		<el-select v-model="condition.title"  placeholder="请选择表头" multiple collapse-tags>
			<el-option
				v-for="item in tableTitle"
				:key="item.title"
				:label="item.name"
				:value="item.title"
			>
			</el-option>
		</el-select>
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
				:clearable="false"
				:default-time="['00:00:00', '23:59:59']"
				>
			</el-date-picker>
		</div>


		<div class="in-block" >
			<el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="30" style="width:194px"></el-input>
		</div>
		<div class="in-block">
			<el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="30" style="width:194px"></el-input>
		</div>


		<div class="in-block">
			<el-select v-model="condition.wid" placeholder="请选择仓库" multiple collapse-tags>
				<el-option
				v-for="item in warehouseList"
				:key="item.id"
				:label="item.name"
				:value="item.id">
				</el-option>
			</el-select>
		</div>


		<template v-if="isBrand">
			<div class="shop-container" >
				<div class="shop-cover" @click="stopSelectShop" v-show="shop.show">
				</div>
				<el-shop-list 
					@chooseShop="getChooseShop" 
					:shopIds="condition.shopIds" 
					:delShopId="shopList" 
					:isSingle="true" 
				></el-shop-list>
			</div>
			<el-checkbox v-model="shop.show" label="选择本品牌" border @change="getSelectBrand">选择本品牌</el-checkbox>
		</template>
		<div class="in-block" style="padding-left:10px;">
			<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
			<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
		</div>
	</div>

	<div class="content">
		<el-table :data="tableData"  
			v-loading="loading.mList" 
			element-loading-text="加载中,请稍后..."
			stripe border :header-cell-style="{'background-color':'#F5F7FA'}">

			<el-table-column  min-width="150px"  label="物料名称" fixed="left">
				<span slot-scope="{row,column}" @click="viewDetail(row,'name')" class="yellow-font">{{row['name']}}</span>
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-42')"  prop="t-42" min-width="150px" label="物料编码" >
			</el-table-column>

			<el-table-column  min-width="150px" label="单位选择" >
				<template slot-scope="{row,column,$index}">
					<el-select v-model="row.unitInfo.selUnitId" @change="(res)=>{changeEleUnit(row,res,$index)}" placeholder="请选择">
						<el-option
							v-for="item in row.relation"
							:key="item.muId"
							:label="item.name"
							:value="item.muId"
						>
						</el-option>
					</el-select>
				</template>
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-2')" prop="t-2" min-width="150px" label="期初数量" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-3')" prop="t-3" min-width="150px" label="结存数量" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-4')" prop="t-4" min-width="150px" label="入库量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-4',column)" class="yellow-font">{{row['t-4']}}</span>
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-5')" prop="t-5" min-width="150px" label="入库成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-5',column)" class="yellow-font">{{row['t-5']}}</span>                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-6')" prop="t-6" min-width="150px" label="入库均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-7')" prop="t-7" min-width="150px" label="加工入库数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-7',column)" class="yellow-font">{{row['t-7']}}</span>                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-8')" prop="t-8" min-width="150px" label="加工入库成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-8',column)" class="yellow-font">{{row['t-8']}}</span>                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-9')" prop="t-9" min-width="150px" label="加工入库成本均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-10')" prop="t-10" min-width="150px" label="调入数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-10',column)" class="yellow-font">{{row['t-10']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-11')" prop="t-11" min-width="150px" label="调入成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-11',column)" class="yellow-font">{{row['t-11']}}</span>                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-12')" prop="t-12" min-width="150px" label="调入成本均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-13')" prop="t-13" min-width="150px" label="调出数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-13',column)" class="yellow-font">{{row['t-13']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-14')" prop="t-14" min-width="150px" label="调出成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-14',column)" class="yellow-font">{{row['t-14']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-15')" prop="t-15" min-width="150px" label="调出成本均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-16')" prop="t-16" min-width="150px" label="调出分销总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-16',column)" class="yellow-font">{{row['t-16']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-17')" prop="t-17" min-width="150px" label="调出分销均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-18')" prop="t-18" min-width="150px" label="调出分销利润" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-19')" prop="t-19" min-width="150px" label="加工消耗" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-19',column)" class="yellow-font">{{row['t-19']}}</span>                                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-20')" prop="t-20" min-width="150px" label="加工消耗成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-20',column)" class="yellow-font">{{row['t-20']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-21')" prop="t-21" min-width="150px" label="加工消耗成本均价" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-22')" prop="t-22" min-width="150px" label="耗损总量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-22',column)" class="yellow-font">{{row['t-22']}}</span>                                                               
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-23')" prop="t-23" min-width="150px" label="耗损成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-23',column)" class="yellow-font">{{row['t-23']}}</span>                                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-24')" prop="t-24" min-width="150px" label="盘亏数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-24',column)" class="yellow-font">{{row['t-24']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-25')" prop="t-25" min-width="150px" label="盘亏总金额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-25',column)" class="yellow-font">{{row['t-25']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-26')" prop="t-26" min-width="150px" label="盘盈数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-26',column)" class="yellow-font">{{row['t-26']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-27')" prop="t-27" min-width="150px" label="盘盈总金额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-27',column)" class="yellow-font">{{row['t-27']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-28')" prop="t-28" min-width="150px" label="领料数量" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-28',column)" class="yellow-font">{{row['t-28']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-29')" prop="t-29" min-width="150px" label="领料总金额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-29',column)" class="yellow-font">{{row['t-29']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-30')" prop="t-30" min-width="150px" label="领料消耗" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-31')" prop="t-31" min-width="150px" label="领料消耗总金额" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-32')" prop="t-32" min-width="150px" label="领料回库" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-32',column)" class="yellow-font">{{row['t-32']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-33')" prop="t-33" min-width="150px" label="领料回库总金额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-33',column)" class="yellow-font">{{row['t-33']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-34')" prop="t-34" min-width="150px" label="领料剩余" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-35')" prop="t-35" min-width="150px" label="领料剩余总金额" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-36')" prop="t-36" min-width="150px" label="BOM单消耗毛料" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-36',column)" class="yellow-font">{{row['t-36']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-37')" prop="t-37" min-width="150px" label="BOM单消耗毛料成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-37',column)" class="yellow-font">{{row['t-37']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-38')" prop="t-38" min-width="150px" label="BOM单消耗净料" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-38',column)" class="yellow-font">{{row['t-38']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-39')" prop="t-39" min-width="150px" label="BOM单消耗净料成本总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-39',column)" class="yellow-font">{{row['t-39']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-40')" prop="t-40" min-width="150px" label="BOM单自然损耗" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-40',column)" class="yellow-font">{{row['t-40']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-41')" prop="t-41" min-width="150px" label="BOM单自然损耗总额" >
				<span slot-scope="{row,column}" @click="viewHistory(row,'t-41',column)" class="yellow-font">{{row['t-41']}}</span>                                                
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-43')" prop="t-43" min-width="150px" label="消耗数量" >
			</el-table-column>

			<el-table-column v-if="toggleTitle('t-44')" prop="t-44" min-width="150px" label="消耗总金额" >
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

		<el-dialog
			:title="exportLoad.title"
			:visible.sync="exportLoad.show"
			width="350px"
		>
			<div style="height:40px;width:100%;" v-loading="true" element-loading-text="正在导出,请稍后...">

			</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="exportLoad.show = false">确 定</el-button>
		</span>
		</el-dialog>
	</div>
</div>

	
</template>
<script>
/*
	'物料名称,单位选择,期初数量,结存数量,入库量,入库成本总额,入库均价,加工入库数量,加工入库成本总额,加工入库成本均价,'+
	'调入数量,调入成本总额,调入成本均价,调出数量,调出成本总额,调出成本均价,调出分销总额,调出分销均价,调出分销利润,加工消耗,'+
	'加工消耗成本总额,加工消耗成本均价,耗损总量,耗损成本总额,盘亏数量,盘亏总金额,盘盈数量,盘盈总金额,领料数量,领料总金额,'+
	'领料消耗,领料消耗总金额,领料回库,领料回库总金额,领料剩余,领料剩余总金额,BOM单消耗毛料,BOM单消耗毛料成本总额,BOM单消耗净料,BOM单消耗净料成本总额,'+
	'BOM单自然损耗,BOM单自然损耗总额'

	本页对应的路由:
		"children": [{ "path": "", "url": "src/module/invoicing_system/data_center/material_statistics" }] 

	请求:
		获取单位的关联关系:materialGetUnitRelation
		获取物料统计表格数据:MaterialstatisticGetStatisticData
		创建物料统计任务:MaterialstatisticStatisticStart
		获取任务轮询状态:invoicing_taskInfo
		获取店铺:getShopList
		获取仓库:warehouseList
		统计导出:MaterialstatisticExportStatisticData
*/
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import http from 'src/manager/http';
import tableTitle from './title';
import Timer from 'src/verdor/timer';

// import dataList from './data';
export default {
	data () {
		return {
			valiDate:[
				{id:0,name:'月'},
				{id:1,name:'日'},
				{id:2,name:'年'},
			],
			materialType:[
				{id:0,name:'成品'},
				{id:1,name:'半成品'},
				{id:2,name:'普通物料'}
			],



			condition:{title:[],time:[]},               //搜索条件
			tableData:[],
			tableList:[],                               //所有的表格数据
			tableDataBackup:[],                         //数据备份
			tableTitle:[],
			warehouseList:[],
			shopList:[],
			pageObj:{},                                 //分页组件
			dialog:{
				title:'物料信息',
				show:false
			},
			shop:{
				show:true,                              //是否选择本品牌
			},
			exportLoad:{
				title:'提示信息',
				show:false,
			},
			materialInfo:{},                
			placeholder:'--',
			isBrand:false,

			timerTask:{
				mList:'',                                //表格数据的定时器
				mExport:'',                              //导出的定时器
			},
			loading:{
				mList:false,
			}
		};
	},
	methods: {
		//筛选,重置
		async filterReset(flag,page){
			if(flag == 'reset'){
				this.initPageObj();
				this.initCondition();
				this.shop.show = true;
			}else{
				this.pageObj.currentPage = page || 1;
			}

			//清除上一个定时器
			this.clearTaskTimer('mList');

			let subDate = this.getCondition();
			if(!this.checkCondition(subDate)){
				return;
			}
			this.loading.mList = true;
			this.timerTask.mList = await this.createTask({
				subDate,
				url:'MaterialstatisticStatisticStart',
				success:(taskId)=>{
					this.clearTaskTimer('mList');
					this.getList(taskId);
					this.loading.mList = false;
				},
				fail:()=>{
					this.alert('查询失败,请重新查询!');
					this.clearTaskTimer('mList');
					this.loading.mList = false;                    
				}
			});


		},
		async funGetPage(flag,res){
			let tableData = [];
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			
			tableData = this.slicePage(this.tableList,this.pageObj.currentPage,this.pageObj.pageSize);
			//数据备份
			this.tableDataBackup = utils.deepCopy(tableData);

			//获取单位
			tableData = utils.deepCopy(tableData);            
			await this.matchTableDataUnit(tableData);
			//初始化表格
			this.initTableData(tableData);
			this.tableData = tableData;
		},
		//查看物料详情
		async viewDetail(row){
			let unitInfo = {};
			let materialInfo = await this.getHttp('MaterialGetMaterialDetail',{mid:row.mid,wid:0,isDistribution:0});
			if(this.toRaw(materialInfo,'Object')){
				unitInfo = this.getMaterialUnitInfo(materialInfo.unit);
				Object.assign(materialInfo,unitInfo);

				//类型名
				materialInfo.typeName = this.getEle(this.materialType,materialInfo.type,'id').name;
				//库存总量
				materialInfo.sumStoreNum = global.comUnit(materialInfo.num,unitInfo.selUnitVal,unitInfo.selUnitName,unitInfo.minUnitName);
				//保质期类型
				materialInfo.validityTypeName = this.getEle(this.valiDate,materialInfo.validityType,'id').name;
				

				this.materialInfo = materialInfo;
			}
			this.dialog.show = true;    
		},
		//查看对应的总记录
		viewHistory(row,title){
			//操作类型,搜索时间,物料名称
			let subObj = {};
			let condition = this.getCondition();
			let operationType = '';


			operationType = this.getEle(this.tableTitle,title,'title').operationType; 
			if(Array.isArray(operationType)){
				operationType = operationType.join(',');
			}else{
				operationType += '';
			}
			
			subObj = {
				ms_name:row['name'],
				ms_operationType:operationType,
				ms_sTime:condition.startTime,
				ms_eTime:condition.endTime,
			};

			this.$router.push({path:'/admin/totalLog/materialTotalLog',query:subObj});
		},
		//单位选择
		changeEleUnit(row,unitId,index){
			row['unitInfo'] = this.getMaterialUnitInfo(row.relation,unitId);
			this.changeUnitNum(row,row.unitInfo,index);
		},
		toggleTitle(title){
			return this.condition.title.includes(title);
		},
		//店铺选择
		getChooseShop(res){
			if(Array.isArray(res) && !this.shop.show){
				this.condition.shopIds = res;
			}
		},
		//阻止店铺选择
		stopSelectShop(){
			this.$message('已选择本品牌!');
		},
		getSelectBrand(res){
			if(res){
				this.condition.shopIds = [];
			}
		},

		checkCondition(subDate){
			let condition = this.condition;
			
			if(!subDate.actshopId) {
				this.alert('请选择店铺!');
				return;
			}
			if(condition.title.length == 0){
				this.alert('请至少选择一个表头!');
				return;
			}
			return true;
		},
		getCondition(){
			let condition = this.condition;
			let [start,end] = condition.time;
			let subDate = {};


			start = start.getTime();
			start = parseInt(start / 1000);

			end = end.getTime();
			end = parseInt(end / 1000);

			subDate =  {
				startTime: start,
				endTime: end,
				wids: condition.wid.join(','),
				name: condition.name,
				code: condition.code
			};

			if(this.isBrand){
				if(this.shop.show){
					//选择本品牌
					subDate.actshopId = this.shopId;                
				}else{
					subDate.actshopId = condition.shopIds.join(',');              
				}
			}else{
				subDate.actshopId = this.shopId;                
			}

			return subDate;
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
		//初始化条件
		initCondition(){
			this.condition = {
				time:this.initTime(),               //时间                
				name:'',                            //物料名称
				code:'',                            //物料编码
				shopIds:[],                         //店铺Id
				wid:[],                             //仓库
				title:[],                           //选中的表头
			};
			this.condition.title = this.tableTitle.map((ele)=>{
				return ele.title;
			});
		},
		initData() {
			let userData = storage.session('userShop');
			
			this.shopId = userData.currentShop.id;
			this.isBrand = userData.currentShop.ischain == 3;   


			//名字必选
			this.tableTitle = tableTitle;
			// this.tableTitle = tableTitle.filter((ele)=>{
			//     return ele.title != 't-0';
			// });
		},
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '导出',
					type:'4',
					className:'primary',
					fn:async ()=>{
						let subObj = this.getCondition();
						if(!this.checkCondition(subObj)){
							return;
						}

						let subDate = [];
						let title = this.condition.title;

						for(let ele of title){
							for(let e of this.tableTitle){
								if(e.attr && e.title == ele){
									subDate.push(e.attr);
									break;
								}
							}
						}
						this.timerTask.mExport = await this.createTask({
							subDate:subObj,
							url:'MaterialstatisticStatisticStart',
							success:async (taskId)=>{
								this.clearTaskTimer('mExport');
								this.getHttp('MaterialstatisticExportStatisticData',{taskId,selected:subDate.join(',')});
							},
							fail:()=>{
								this.alert('导出失败,请重新导出!');
								this.clearTaskTimer('mExport');
							}
						});
					}
				},
			]);
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




		async getWarehouseList(){
			let list = [],
				brand = [],
				shop = [];

			list =  await this.getHttp('warehouseList');
			if(!Array.isArray(list)) list = [];

			for(let ele of list){
				if(ele.shopId == 0){
					brand.push(ele);
				}else{
					shop.push(ele);					
				}
			}
			this.warehouseList = this.isBrand ? brand : shop;
			let attr =  this.isBrand ? 'brandId' : 'shopId';
			this.warehouseList = this.warehouseList.filter((ele)=>{
				return ele[attr] == this.shopId;
			});
		},
		async getShopList(){
			if(!this.isBrand) return;       //单店

			let retData = await this.getHttp('getShopList');
			if(Array.isArray(retData)){
				this.shopList = retData;
			}
		},
		async getList(taskId){
			let retObj = {};
			let dataList = [];

			//请求接口数据
			retObj = await this.getHttp('MaterialstatisticGetStatisticData',{taskId});
			if(Array.isArray(retObj.data)){
				dataList = retObj.data;
			} 

			//数据字段转换
			this.changeListAttr(dataList);

			this.tableList = dataList;

			//计算总记录数
			this.pageObj.total = this.tableList.length;

			this.funGetPage('current-change',this.pageObj.currentPage);            
		},

		//获取并匹配数据单位关系
		async matchTableDataUnit(dataList){
			let mids = [],
				unitList = [];

			mids = this.getAttr(dataList,'mid');
			mids = mids.join(',');
			unitList = await this.getHttp('materialGetUnitRelation',{mids});
			this.matchList(dataList,unitList);
			for(let ele of dataList){
				ele['unitInfo'] = this.getMaterialUnitInfo(ele.relation); 
			}
		},
		//初始化表格数据
		initTableData(list){
			for(let i = 0; i < list.length;i += 1){
				let ele = list[i];
				/*改为后台计算
				//入库均价,防止 0/0
				ele['t-6'] =  this.calcNaN(ele['t-5'],ele['t-4']);
				//加工入库成本均价
				ele['t-9'] = this.calcNaN(ele['t-8'],ele['t-7']);
				//调入成本均价
				ele['t-12'] = this.calcNaN(ele['t-10'],ele['t-9']);
				//调出成本均价
				ele['t-15'] = this.calcNaN(ele['t-14'],ele['t-13']);
				//调出分销均价
				ele['t-17'] = this.calcNaN(ele['t-16'],ele['t-13']);
				//调出分销利润
				ele['t-18'] = ele['t-16'] - ele['t-14'];
				//加工消耗成本均价
				ele['t-21'] = ele['t-20'] - ele['t-19'];
				//领料剩余
				ele['t-34'] = ele['t-28'] - ele['t-30'] - ele['t-32'];
				//领料剩余总金额
				ele['t-35'] = ele['t-29'] - ele['t-31'] - ele['t-33'];
				*/
				this.changeUnitNum(ele,ele.unitInfo,i);
			}
		},
		//前后台属性名转换
		changeListAttr(list){
			for(let ele of list){
				ele.mid = ele.id;
				for(let f in ele){
					for(let a of this.tableTitle){
						if(a.attr && f == a.attr){
							if(a.toFixed != undefined){
								ele[a.title] = this.calcValue(ele[f],a.toFixed);
							}else{
								ele[a.title] = ele[f];
							}
							break;
						}
					}
				}
			}
		},
		//切换单位时更改字段的数量
		changeUnitNum(...args){
			let [ele,info,index] = args,
				backup = this.tableDataBackup,
				changeNumTitle = [];

			changeNumTitle = this.getAllEle(this.tableTitle,true,'changeNum');
			changeNumTitle = this.getAttr(changeNumTitle,'title');
 
			this.initObj(backup[index],changeNumTitle,0);                
			for(let t of changeNumTitle){
				ele[t] = global.comUnit(backup[index][t], info.selUnitVal, info.selUnitName, info.minUnitName);
				if(!ele[t]) ele[t] = 0;
			}
		},

		calcValue(str,scope = 0){
			if(!str) str = 0;

			if(!scope){
				scope = 0
			}else{
				scope = Number(scope);				
				scope += 1;
			}
			
			str += '';
			let index = str.indexOf(".");
			if(index > -1){
				str = str.slice(0,index + scope);
			}
			return str;
		},
		//清除定时器
		clearTaskTimer(attr){
			if(this.timerTask[attr]){
				Timer.clear(this.timerTask[attr]);
			}
			this.timerTask[attr] = '';
		},
		slicePage(list, page, num) {
			//分页
			let sIndex = (page - 1) * num;
			let eIndex = page * num;
			let arr = list.slice(sIndex, eIndex);
			return arr;
		},
		calcNaN(a,b){
			let num = 0;
			a = Number(a);
			b = Number(b);
			if(!a) return 0;
			if(!b) return 0;
			num = (a / b).toFixed(3) - 0;
			return num;
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
		toRaw(val,type){
			return Object.prototype.toString.call(val).slice(8,-1) === type;
		},
		//初始化对象
		initObj(ele,attrs,value){
			for(let a of attrs){
				if(!ele[a]) ele[a] = value;
			}
		},
		//匹配
		matchList(list,unit){
			let listAttr = 'mid',
				getAttr = 'relation',
				unitAttr = 'mid';

			for(let ele of list){
				for(let e of unit){
					if(ele[listAttr] == e[unitAttr]){
						ele[getAttr] = e[getAttr];
						break;
					}
				}
				if(!ele[getAttr]){
					console.log(`id为${ele.id}的物料${getAttr}字段未匹配到,名称为${ele.name}`);
				}
			}
		},
		getEle(arr,val,attr){
			let temp = {};
			for(let ele of arr){
				if(ele[attr] == val){
					temp = ele;
					break;
				}
			}
			return temp;
		},
		getAllEle(arr,val,attr){
			let temp = [];
			for(let ele of arr){
				if(ele[attr] == val){
					temp.push(ele);
				}
			}
			return temp;
		},
		getAttr(list,attr='mid'){
			let temp = list.map((ele)=>{
				return ele[attr];
			});
			return temp;
		},
		//获取物料关联关系
		getMaterialUnitInfo(list,id){
			//获取物料的单位信息
			if(!Array.isArray(list)){
				list = [];
			}
			let ele = {};
			for(let item of list){
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
			return ele;
		},
		//初始时间
		initTime(){
			let start,end;
			end = new Date();
			start = end.getTime() - global.timeConst.ONEMONTH;
			start = new Date(start);
			return [start,end];
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
	},
	mounted(){
		this.initData();
		this.initPageObj();    
		this.initCondition(); 
	},
	activated(){
		this.initBtn();         
		this.getWarehouseList();
		this.getShopList();

		if(this.isBrand && this.condition.shopIds.length == 0 && !this.shop.show){
			this.shop.show = true;
		}
		this.condition.time = this.initTime();
		this.filterReset('filter',this.pageObj.currentPage);
	},
	components:{
		elShopList: () =>
			import ( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList'),
	},
	beforeRouteLeave(to,from,next){
		//清除定时器
		this.clearTaskTimer('mList');
		next();
	},
};
</script>
<style lang='less' scoped>
	@import url('../warehouse_manage/z_less.less');
	.in-block{
		margin-bottom:20px;
		display: inline-block;             
	}
	.yellow-font{
		color:#E1BB4A;
		width: 100%;
		display: inline-block;
		cursor: pointer;
	}


	.search-header{
		margin-top:20px;
		max-width: 1436px;
		.shop-container{
			display: inline-block;
			position: relative;
		}
		.shop-cover{
			display:inline-block;
			position:absolute;
			.whb(100%,100%,none);
			cursor: not-allowed;
		}
	}

	// 选择表头
	.table-title{
		position: absolute;
		right: 90px;
		top: 10px;
	}
	
	//底部分页
	.footer{
		margin-top:37px;
	}


	//组件
	.component{
		.dialog-content{
			padding:20px;
			border-top:1px solid #E4E7ED;
			display: flex;
			flex-flow: row nowrap;
			.column{
				width:50%;
				&>div{
					flex-grow:1;
					margin-bottom:20px;
				}
			}
			.column-container{
				display: flex;
				flex-flow:row nowrap;
				div{
					flex: 0 0 auto;
					p{
						padding-bottom:5px;
					}
				}
				.label{
					padding-right:5px; 
				}
			}
		}
	}
</style>