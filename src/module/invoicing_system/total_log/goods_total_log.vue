<template>
    <div class="goods-total-log">
        <div class="tab-header">
            <el-button-group>
                <el-button type="primary" >商品</el-button>
                <el-button type="primary" :plain="true" @click="navigateTo">物料</el-button>
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
                    :default-value="[new Date(2018,5,1),new Date(2018,6,1)]"
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

                <el-input clearable v-model="condition.goodsName" placeholder="商品名称" style="width:194px"></el-input>
            </div>

            <div class="in-block" >
                <el-input clearable v-model="condition.code" placeholder="条形码" style="width:194px"></el-input>

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
                <el-table-column prop="name" width="150px"  label="商品名称" fixed="left">
                    <span slot-scope="{row,column}" @click="viewDetail(row,column)" class="yellow-font">{{row.name}}</span>
                </el-table-column>
                <el-table-column prop="name" width="150px" label="条形码" >
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
                <el-table-column prop="name" label="售卖价格" >
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
            <div class="dialog-content" >
                <div class="column">
                    <div>商品名:</div>
                    <div>条形码:</div>
                    <div>品牌:</div>
                    <div>序号:</div>
                    <div>分类:</div>
                    <div>单位:</div>
                    <div>售价:</div>
                    <div>批次数:</div>
                </div>
                <div class="column">
                    <div>规格:</div>
                    <div>保质期:</div>
                    <div>耗损:</div>
                    <div>货架位置:</div>
                    <div>仓库数量/重量:</div>
                    <div>上架数量:</div>
                    <div>总量:</div>
                </div>
            </div>
            <div class="dialog-content" v-if="false">
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
        cellClick(a,b,c){
            console.log(a);
            console.log(b);
        },

		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
        },
        navigateTo(){
            this.$router.push({path:'/admin/materialTotalLog'});
        },
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,
			};
        },
        getSubmitData(){
        },
        viewDetail(row,column){
            console.log(row);
            console.log(column);

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
    async mounted(){
        this.getCategoryList();
        this.warehouseList =  await this.getHttp('warehouseList');

    },
    components: {
        elShopList: () =>
            import ( /*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
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