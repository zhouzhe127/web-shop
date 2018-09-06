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
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    >
                </el-date-picker>
            </div>

            <div class="in-block" >
                <el-select v-model="condition.operationType" placeholder="操作类型" clearable>
                    <el-option
                    v-for="item in operationList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>

                <el-input clearable v-model="condition.goodsName" placeholder="物料名称" style="width:194px"></el-input>
            </div>

            <div class="in-block" >
                <el-input v-if="false" clearable v-model="condition.code" placeholder="物料编码" style="width:194px"></el-input>

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

                <el-select v-model="condition.wid" placeholder="仓库选择" clearable>
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
            <el-table :data="tableData" style="width: 90%" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
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
						{{row.cost}}
					</template>	                    
                </el-table-column>
                <el-table-column prop="createTime" label="日期" width="150px">
                </el-table-column>
                <el-table-column prop="createUName" label="操作人" width="150px">
                </el-table-column>
                <el-table-column prop="wName" label="仓库" width="150px">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="150px">
                    <template slot-scope="scope">
                        <span class="view view-detail view-detail-disable">查看记录</span>
                        <span class="view">批次详情</span>
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
                    <div>物料名称:</div>
                    <div>物料简码:</div>
                    <div>品牌:</div>
                    <div>批次数:</div>
                    <div>物料类型:</div>
                    <div>物料单位:</div>
                    <div>默认单位:</div>
                    <div>最小单位:</div>
                </div>
                <div class="column">
                    <div>单位换算:</div>
                    <div>分类:</div>
                    <div>库存总量:</div>
                    <div>保质期:</div>
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


*/
import storage from 'src/verdor/storage';
import common from './goods_material_log.js';
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
                title:'物料信息',
                show:false
            }
            
        };
    },
    methods: {
        //筛选重置
        filterReset(flag){
            if(flag == 'reset'){
                this.pageObj.currentPage = 1;
                this.initCondition();

            }
            this.getList();
        },
        //获取日志列表
        async getList(){
            let retData = {},
                unitArr = [],
                midStr = [],
                subObj = {};

            subObj = this.getSubmitData();
            retData = await this.getHttp('invoicingGetMaterialLogList',subObj);

            if(!Array.isArray(retData.list)) retData.list = [];
            this.tableData = retData.list;
            this.pageObj.total = retData.count || 0;
            this.pageObj.total = Number(this.pageObj.total);

            for(let ele of this.tableData){
                midStr += ele.id+'';
            }
            midStr = '10,11,12,13,14,15';
            unitArr = await this.getHttp('materialGetUnitRelation',{mids:midStr});
            if(!Array.isArray(unitArr)){
                unitArr = [];
            }

            this.matchList(this.tableData,unitArr);


            this.tableData = this.tableData.map((ele)=>{
                ele.createTime = this.generatorDate(ele.createTime * 1000).str;
                ele.operationType = this.getAttr(this.operationList,ele.type);
                ele.arrowOperation = ele.change > 0;//红色箭头
                ele.change = Math.abs(ele.change);
                ele.arrowCost = ele.cost > 0;//红色箭头
                ele.cost = Math.abs(ele.cost);
                this.getMaterialUnitInfo(ele,null,'relation');
                
                return ele;
            });
            console.log(this.tableData);
            
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


        //查看物料详情
        viewDetail(row,column){
            console.log(row);
            console.log(column);

        },
        //查看记录
        viewHistory(item){
            let obj = {};
            switch(item.id+''){
                case '2'://入库
                case '3'://耗损
                case '4'://新建物料
                case '18'://删除物料
                    return;                
                case '1'://批量盘库记录      这个是单个盘库,差批量盘库
                    obj.path = '/admin/goodsCountHistory';
                    obj.query = {id:item.id};
                    break;
                case '5'://BOM单消耗->跳转到BOM单消耗详情页面（子页面）
                    break;
                case '6'://调出->点击进入调度出货单，出货单表格在出货数量后边增加，出货成本总额。                
                    break;
                case '7'://调入->点击进入调度入货单，入货单表格在耗损后边增加，入货成本总额。（商品跳商品，物料跳物料）
                    break;
                case '8'://领料->点击进入该条领料记录
                    break;
                case '9'://领料回库->点击进入该条领料盘库记录。领料盘库中，增加一条剩余数量，消耗数量自动计算
                    break;
                case '10'://修改物料信息->跳转到修改物料
                    break;
                case '11'://取消回库->点击进入调度入货单，入货单表格在耗损后边增加，入货成本总额
                    break;
                case '13'://加工入库->点击进入该条加工记录
                    break;
                case '14'://加工消耗->点击进入该条加工记录
                    break;
                case '15'://修改物料单位->跳转到修改物料单位
                    break;
                case '16'://导入入库->导入入库，跳转到导入入库列表
                    break;
                case '17'://领料消耗->点击进入该条领料记录
                    break;
            }
        },
        //查看批次详情
        viewBatchDetail(){
            let obj = {};
            switch(item.id+''){
                //差批量盘库类型
                case '1'://盘库->批次详情
                case '2'://入库
                case '3'://耗损
                case '5'://BOM单消耗
                case '6'://调出
                case '7'://调入
                case '8'://领料
                case '9'://领料回库
                case '11'://取消调度物料回库
                case '13'://加工入库
                case '14'://加工消耗
                case '16'://导入入库
            }
        },


        matchList(list,unit){
            let listAttr = 'id',
                getAttr = 'relation',
                unitAttr = 'mid';

            for(let ele of list){
                for(let e of unitAttr){
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
         
        },
        //获取所有条件
        getSubmitData(){
            let obj = {},
                condition = this.condition;

            obj.type = condition.operationType;
            obj.name = condition.operationUser;
            obj.bc = condition.code;
            obj.wid = condition.wid;
            obj.page = this.pageObj.currentPage;
            obj.size = this.pageObj.pageSize;
            obj.beginTime = 0;
            obj.endTime = 0;       
            obj.cid = '';

            if(Array.isArray(condition.time) && condition.time.length > 0){
                let [start,end] = condition.time;
                start = start.getTime();
                end = end.getTime();
                obj.beginTime = parseInt(start / 1000);
                obj.endTime = parseInt(end / 1000);  
            }
            if(Array.isArray(condition.category) && condition.category.length > 0){
                obj.cid = condition.category[0];
                if(condition.category.length >= 2){
                    obj.cid = condition.category[1];                    
                }   
            }

            return obj;
        },
        //初始化分页
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,
			};
        },
        //初始化条件
        initCondition(){
            this.condition = {
                time:[],                    //时间                
                operationType:'',           //操作类型
                goodsName:'',               //物料名称
                code:'',                    //物料简码
                operationUser:'',           //操作人
                category:[],                //分类
                wid:'',                     //仓库
            };
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
        //获取操作类型
        async getOperationType(){
            let operationList = [];
            operationList = await this.getHttp('invoic_getType');
            this.operationList = this.changeOperationType(operationList);
        }
    },
    async mounted(){
        this.initCondition();
        this.initPageObj();
        this.getOperationType();
        this.getCategoryList();

        this.warehouseList =  await this.getHttp('warehouseList');

    },
};
</script>
<style lang='less' scoped>
    @import url('../warehouse_manage/z_less.less');
    .in-block{
        margin-bottom:20px;
        display: inline-block;             
    }
    //箭头
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
    //查看详情
    .view{
        color:@ey;
        display: inline-block;
        height:40px;   
        line-height: 40px;   
        cursor: pointer;  
    }
    .view-detail{
        padding-right: 10px;
    }
    .view-detail-disable{
        opacity: 0.4;
        cursor: not-allowed;
    }
    .yellow-font{
        color:#E1BB4A;
        width: 100%;
        display: inline-block;
        cursor: pointer;
    }
    .view-batch{
        color:@ey;
        display: inline-block;
        height:40px;
    }
    .goods-total-log{
        .search-header{
            margin-top:20px;
            width:90%;
        }
    }
    .footer{
        margin-top:37px;
    }

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
        }
    }

</style>