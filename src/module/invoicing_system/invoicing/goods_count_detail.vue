<template>
	<!-- 百川-
		商品盘库日志详情
		物料盘库日志详情
		批量审核日志详情
		
		曾伟福 
	-->
	<div id="goods-count">
		<div class="page-head">{{header}}</div>
		<div class="info">
			<li v-for="(item,index) in info" :key="index">{{item.label}}&nbsp;:&nbsp;{{item.value}}</li>
		</div>	
		<div class="table">
			<!-- 商品盘库记录 -->
			<el-table :data="tableData" v-if="tab == 1" style="width: 100%" stripe :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column label="序号" align="center"  prop="itemIndex"></el-table-column>
				<el-table-column label="商品名" align="center" width="150px" prop="itemName"></el-table-column>
				<el-table-column label="条码" align="center" width="150px" prop="barCode"></el-table-column>
				<el-table-column label="仓库所属" align="center" width="150px" prop="storeName"></el-table-column>
				<el-table-column label="盘库前" align="center" width="150px" prop="before"></el-table-column>
				<el-table-column label="盘库后" align="center" width="150px" prop="after"></el-table-column>
				<el-table-column label="变化量" align="center" width="150px">
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrow,'arrow-down':!row.arrow}"></span>
						{{row.change}}
					</template>						
				</el-table-column>
				<el-table-column label="成本价" align="center" prop="cost"></el-table-column>
			</el-table>

			<!-- 物料盘库记录 -->
			<el-table v-if="tab == 2" :data="tableData" style="width: 100%" stripe :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column label="序号" align="center"  prop="itemIndex"></el-table-column>
				<el-table-column label="物料名称" align="center"  width="150px" prop="itemName"></el-table-column>
				<el-table-column label="物料编码" align="center"  width="150px" prop="barCode"></el-table-column>
				<el-table-column label="仓库所属" align="center" width="150px"  prop="storeName"></el-table-column>
				<el-table-column label="盘库前" align="center" width="150px" prop="before"></el-table-column>
				<el-table-column label="盘库后" align="center" width="150px" prop="after"></el-table-column>
				<el-table-column label="变化量" align="center" width="150px">
					<template slot-scope="{row,column,index}">
						<span class="arrow" :class="{'arrow-up':row.arrow,'arrow-down':!row.arrow}"></span>
						{{row.change}}
					</template>						
				</el-table-column>
				<!-- 单店内有调入的有分销价的按分销价计算 -->
				<el-table-column label="成本金额" align="center" prop="cost"></el-table-column>
			</el-table>
			
			<!-- 批量审核日志详情 -->
			<el-table v-if="tab == 3" :data="tableData" style="width: 100%" stripe :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column label="操作" align="center">
					<template slot-scope="{row,column,index}">
						<span class="view-detail" @click="linkUrl(row)">查看详情</span>
					</template>						
				</el-table-column>
				<el-table-column label="序号" align="center" prop="itemIndex"></el-table-column>
				<el-table-column label="申请单号" align="center" prop="applicationCode"></el-table-column>
				<el-table-column label="申请店铺/品牌" align="center" prop="applicationShop"></el-table-column>
				<el-table-column label="申请人" align="center" prop="applicant"></el-table-column>
				<el-table-column label="申请时间" align="center" prop="zh_applicationTime"></el-table-column>
			</el-table>
			
		</div>
		<div class="bottom" v-if="tab != 3">
			<el-pagination
				:pager-count="pageObj.pagerCount"
				:page-size="pageObj.pageSize"
				layout="total,sizes,prev, pager, next,jumper"
				:background="true"
				:total="pageObj.total"
				@size-change="(res)=>{funGetPage('size-change',res)}"
				@current-change="(res)=>{funGetPage('current-change',res)}"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script>
/*
	请求:
		获取商品物料盘库记录详情:invoicingGetCheckInventoryLogDetail
		获取批量日志审核详情:dispatchGetDispatchAuditLogDetailList


	
	注意:
	
*/
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
			tableData:[],
			info:[],
			logId:'',				//记录id

			header:'盘库记录详情',	//头部信息
            pageObj:{},

		};
	},
	props:{
		tab:{
			type:[String,Number],			//1:展示商品详情,0:展示物料详情
			default:1		
		}
	},
	async mounted(){
		this.logId = Number(this.$route.query.id);
		if(typeof this.logId != 'number'){
			return;
		}
		this.initBtn();
		this.initPageObj();
		this.getData();
	},
	methods: {
		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getData();
        },
		async getData(){
			let subObj={},
				retData = {};

			subObj = {
				logId:this.logId,
				page:this.pageObj.currentPage,
				size:this.pageObj.pageSize
			};
			switch(this.tab+''){
				case '1':
				case '2':
					retData = await this.getHttp('invoicingGetCheckInventoryLogDetail',subObj);
					break;
				case '3':
					retData = await this.getHttp('dispatchGetDispatchAuditLogDetailList',{logId:this.logId});
					break;
			}
			this.initTableData(retData);
			this.initInfo(retData);
			this.pageObj.total = Number(retData.count) || 0;
		},
		initTableData(retData){	
			//初始化数据
			switch(this.tab+''){
				case '1'://商品详情
					if(!Array.isArray(retData.list)) retData.list = [];
					this.tableData = retData.list;
					this.tableData = this.tableData.map((ele,index)=>{
						ele.arrow = Number(ele.after) > Number(ele.before);
						ele.before = `${ele.before}${ele.unitName}`;
						ele.after = `${ele.after}${ele.unitName}`;
						ele.storeName = `${ele.wName}/${ele.aName}`;
						ele.change = `${ele.change}${ele.unitName}`;
						let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.pageSize + 1 + index;
						ele.itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
						return ele;
					});	
					break;
				case '2'://物料详情
					if(!Array.isArray(retData.list)) retData.list = [];
					if(!retData.unit || typeof retData.unit != 'object') retData.unit = {};
					this.tableData = retData.list;
					for(let ele of this.tableData){
						for(let itemId in retData.unit){
							if(ele.itemId == itemId){	
								let unitArr = [],				//当前物料的单位列表
									countId = '';				//物料盘库时的选择的单位id

								countId = ele.unitId;
								unitArr = retData.unit[itemId];
								ele.unitInfo = this.getMaterilaUnitInfo(unitArr,countId);
								break;
							}
						}
					}
					this.tableData = this.tableData.map((ele,index)=>{
						ele.arrow = Number(ele.after) > Number(ele.before);
						ele.before = global.comUnit(Number(ele.before),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.after = global.comUnit(Number(ele.after),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.change = global.comUnit(Number(ele.change),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.storeName = `${ele.wName}/${ele.aName}`;
						let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.pageSize + 1 + index;
						ele.itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
						return ele;
					});	
					break;
				case '3':
					if(!Array.isArray(retData.list)) retData.list = [];
					this.tableData = retData.list.map((ele,index)=>{
						ele.itemIndex = index + 1;
						if(ele.itemIndex < 10){
							ele.itemIndex = '0' + ele.itemIndex;
						}
						let date = this.generatorDate(ele.applicationTime * 1000);
						ele.zh_applicationTime = date.str;
						return ele;
					});
			}
		},
		initInfo(retData){
			let temp = null,
				list = [];

			switch(this.tab+''){
				case '1':
				case '2':
					if(!retData.logDetail || typeof retData.logDetail != 'object') retData.logDetail = {};
					temp = retData.logDetail;
					temp.time = this.generatorDate(temp.createTime*1000).str;
					list = [{label:'记录编号',value:temp.code},{label:'操作时间',value:temp.time},{label:'操作人',value:temp.createUName}];
					break;
				case '3':
					if(!retData || typeof retData != 'object') retData = {};					
					retData.time = this.generatorDate(retData.createTime * 1000).str;
					list = [{label:'操作类型',value:retData.type},{label:'操作人',value:retData.createUName},{label:'操作时间',value:retData.time}];
					break;
			}
			this.info = list;
		},




		//获取单位信息
		getMaterilaUnitInfo(unit=[],unitId){
			let obj ={};
			for(let ele of unit){
				if(ele.isMin == 1){
					obj.minName = ele.name;
					obj.minVal = ele.value;
				}
				if(ele.isDefault == 1){
					obj.defName = ele.name;
					obj.defVal = ele.value;
				}
				if(ele.muId == unitId){
					obj.countUnitName = ele.name;
					obj.countUnitVal = ele.value; 
				}
			}
			return obj;
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
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
				week:0,
				str:'',
                time:'',
                dateTime:'',          
			}
			let {year,month,day,hour,minute} = date;
            month += 1;
			hour = hour > 9 ? hour : '0'+hour;
			minute = minute > 9 ? minute : '0'+minute;
            date.time = `${hour}:${minute}`;
            date.dateTime = `${year}-${month}-${day}`;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
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
					name: '返回',
					type:'5',
					className:'plain',
					fn:()=>{
						this.$router.go(-1);
					}
				}
			]);
		}
	},
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
@table-border:1px solid #ebeef5;
.arrow{
	display: inline-block;
	height: 16px;
	width: 8px;
	vertical-align: middle;
}
.arrow-up{
	background: url('../../../res/images/arrow-up.png') no-repeat;
}
.arrow-down{
	background: url('../../../res/images/arrow-down.png') no-repeat;		
}
#goods-count{
	.page-head{
		.split-div(80%);
	}
	.info{
		padding:30px 0 30px 40px;
		li{
			list-style: none;
			width:30%;
			display: inline-block;
			.lfc(#333,16px,16px);				
		}	
	}
    .table{
		border:@table-border;
		border-bottom:none;
		border-radius:4px;
		width:90%;
	}
	.bottom{
		padding-top:15px;
		padding-bottom: 30px;
	}
}
</style>