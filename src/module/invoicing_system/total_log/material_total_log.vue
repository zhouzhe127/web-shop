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
                    unlink-panels
                    format="yyyy-MM-dd"
                    :default-time="['12:00:00']">
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
                <el-input clearable v-model="condition.code" placeholder="物料简码" style="width:194px"></el-input>

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

            <div class="in-block" >
                <el-button type="primary">筛选</el-button>
                <el-button type="info">重置</el-button>
            </div>
        </div>

        <div class="content">
            <el-table :data="tableData" style="width: 90%" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
                <el-table-column prop="name" width="150px" label="物料名称" fixed="left">
                    <span slot-scope="{row,column}" @click="viewDetail(row,column)" class="yellow-font">{{row.name}}</span>
                </el-table-column>
                <el-table-column prop="name" width="150px" label="操作类型" >
                </el-table-column>
                <el-table-column prop="name" width="150px" label="操作前数量/重量" >
                </el-table-column>
                <el-table-column prop="name" width="150px" label="数量/重量变化" >
                </el-table-column>
                <el-table-column prop="name" width="150px" label="操作后数量/重量" >
                </el-table-column>
                <el-table-column prop="name"  label="成本金额" >
                </el-table-column>
                <el-table-column prop="name" label="分销价金额" width="150px">
                </el-table-column>
                <el-table-column prop="name" label="日期" width="150px">
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
				layout="sizes,prev, pager, next,jumper,total"
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


*/
import storage from 'src/verdor/storage';
import common from './goods_material_log.js'
export default {
    mixins:[common],
    data () {
        return {
            condition:{
                operationType:'',
                goodsName:'',
                category:[],
                code:'',
                operationUser:'',
                shop:'',
                secondLevel:'',
                wid:'',
                time:[],                
            },
            categoryList:[],
            warehouseList:[],
            shopList:[],
            operationList:[
                {id:1,name:'类型一'},
                {id:2,name:'类型二'},
                {id:3,name:'类型三'},
            ],
            tableData:[
                {id:1,name:'类型一'},
                {id:2,name:'类型二'},
                {id:3,name:'类型三'},                
            ],
            pageObj:{},

            dialog:{
                title:'库存详情',
                show:false
            }
            
        };
    },
    methods: {
        getTime(res){
            //当清空时间的时候
            this.condition.time = res;
            if(!Array.isArray(res)){
                let [start,end] = res;
                start = start.getTime();
                end = end.getTime();
                this.condition.startTime = parseInt(start / 1000);
                this.condition.endTime = parseInt(end / 1000);
            }
        },

		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
        },
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,
			};
        },
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
                case '1'://批量盘库记录
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
                case '1'://批量盘库->批次详情
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
        getSubmitData(){
            let clock
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
    async mounted(){
        let operationList = [];
        operationList = await this.getHttp('invoic_getType');
        this.operationList = this.changeOperationType(operationList);


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