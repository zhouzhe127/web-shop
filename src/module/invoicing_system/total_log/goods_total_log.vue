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
                    type="datetimerange"
                    :editable="false"
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

            <div class="in-block" style="padding-left:10px;">
                <el-button type="primary" @click="filterReset('filter')">筛选</el-button>
                <el-button type="info" @click="filterReset('reset')">重置</el-button>
            </div>
        </div>

        <div class="content">
            <el-table :data="tableData" style="width: 90%" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
                <el-table-column prop="name" width="150px"  label="商品名称" fixed="left">
                    <span slot-scope="{row,column}" @click="viewDetail(row,column)" class="yellow-font">{{row.name}}</span>
                </el-table-column>
                <el-table-column prop="barcode" width="150px" label="条形码" >
                </el-table-column>
                <el-table-column prop="operationType" width="150px" label="操作类型" >
                </el-table-column>
                <el-table-column prop="before" width="150px" label="操作前数量/重量" >
                </el-table-column>
                <el-table-column prop="change" width="150px" label="数量/重量变化" >
                </el-table-column>
                <el-table-column prop="after" width="150px" label="操作后数量/重量" >
                </el-table-column>
                <el-table-column prop="cost"  label="成本金额" >
                </el-table-column>
                <el-table-column prop="price" label="售卖价格" >
                </el-table-column>
                <el-table-column prop="createTime" label="日期" width="150px">
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
import global from 'src/manager/global';
import http from 'src/manager/http';


import Mock from 'mockjs';
import template from 'src/mock/mock';
/*
    问题:
        仓库选择?:仓库的筛选
        多选?:操作类型,仓库的单选多选
        时间?:

    请求:
        获取商品日志类型:invoicing_getInventoryLogType
*/
export default {
    mixins:[common],
    data () {
        return {
            condition:{},
            categoryList:[],
            warehouseList:[],
            shopList:[],
            operationList:[],
            tableData:[],
            pageObj:{},

            dialog:{
                title:'库存详情',
                show:false
            },
            goodsList:[],           //所有进销存商品

            
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
        getSubmitData(){
        },
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
            let retData = {};
            retData = Mock.mock(template);
            this.tableData = retData.list;

            this.tableData = this.tableData.map((ele)=>{
                ele.createTime = this.generatorDate(ele.createTime * 1000).str;
                ele.operationType = this.getAttr(this.operationList,ele.operationType);
                return ele;
            });
            
        },
        //查看商品详情
        viewDetail(row,column){
            this.dialog.show = true;
        },
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


        */
        //查看记录
        viewHistory(item){
            let obj = {};
            switch(item.id+''){
                case '1'://入库,
                case '4'://上架(库存)
                case '5'://下架到库存(老批次)
                case '6'://仓库耗损
                case '7'://下架到耗损
                case '8'://售出
                case '9'://售出退货
                case '12'://下架到库存新批次
                case '15'://入库并上架
                case '16'://盘点货架
                    return;
                case '2'://调入->入货单
                    obj.path = '/admin/operation/enterGoods';

                    //1).这条调度单的id
                    obj.query = {id:893};

                    //2).入货单id

                    //3).logTab = 1 (出货单)  2:入货单
                    
                    //4).logType = 1 (商品)  2:物料

                    //路由传参
                    break;
                case '3'://调出->出货单


                    //1)    logTab = 1 (出货单)  2:入货单
                    //2)    logType = 1 (商品)  2:物料
                case '17'://出货回库                
                    obj.path = '/admin/operation/operationDetail';
                    obj.query = {id:899};

                case '13'://导入入库
                case '14'://导入上架
                    obj.path = '/admin/wareImport';
                    break;
                case '18'://批量盘库记录
                    obj.path = '/admin/goodsCountHistory';
                    obj.query = {id:item.id};
                    break;
            }
        },
        //查看批次详情
        viewBatchDetail(){
            let obj = {};
            switch(item.id+''){
                case '7'://下架到耗损
                case '8'://售出
                case '14'://导入上架
                case '15'://入库并上架
                case '16'://盘点货架
                case '19'://上架货架
                case '20'://下架到库存(货架)
                    return;

                case '1'://跳转到批次详情(新)-->入库,  未标注
                case '2'://调入出
                case '3'://调入
                case '6'://仓库耗损
                case '9'://售出退货
                case '13'://导入入库
                case '17'://取消调度会哭
                case '18'://批量盘库
                    break;

                case '4'://上架库存 -> 进入批次详情
                    break;

                case '5'://下架到库存（老批次）-->进入批次详情
                    break;

                case '12'://下架到库存(新批次) ->下架页面(下架到新建批次)



                case '18':
                    obj.path = '/admin/inventoryManagement/detail';
                    
                    break;
                case '2':

                    break;
                case '3':
                    
            }
        },

        //获取所有商品
        async getAllGoods(){
            let goods = [],
                res = {};

            res = await this.getHttp('ShopGetExtra');                           //获取版本号
            goods = await this.getGoodsList(false,res.goodsConfigVer);
            this.goodsList = this.filterInvoGoods(goods,1,'isInvoicing');
        },
		//获取商品
		async getGoods() {
            let page = 1,
                total = 0;              //总页数

			let temp = await http.getGoodsList({
				data: {
					shopId: this.shopId,
					page: page,
					num: 200,
					specification: 1
				}
            });
            total = temp.total;
            this.goodsList.push(...temp.list);
            if(page > total){

            }
		},
		async getGoodsList(flag, goodVer) {
			let goods = null;
			if (flag) {
				goods = await this.getGoods();
			} else {
				let httpGoodVersion = storage.session('httpGoodVersion');
				if (!httpGoodVersion) {
					goods = await this.getGoods();
				} else {
					if (httpGoodVersion.goodsConfigVer == goodVer) {
						goods = storage.session('goodList');
						if (!goods) goods = await this.getGoods();
					} else {
						goods = await this.getGoods();
					}
				}
			}
			return goods;
        },
        //筛选进销存商品
        filterInvoGoods(goods,val,attr='id'){
            let temp = [];
            temp = goods.filter((ele)=>{
                if(Number(ele[attr] == val)){
                    return true;
                }
            });
            return temp;
        },
        //搜索商品
		funSearchGoods(goodsList) {
			let tempGoods = [];
			if (!this.search || this.search.trim().length == 0) {
				return goodsList;
			}
			this.search = this.search.trim();
			tempGoods = goodsList.filter(ele => {
				let BC = '' + ele.BC;
				BC = BC.toLowerCase();
				let name = ele.goodsName.toLowerCase();
				let search = this.search.toLowerCase();
				if (BC && BC.indexOf(search) > -1) return true;
				if (name && name.indexOf(search) > -1) return true;
			});
			return tempGoods;
		},
        //根据分类id筛选商品
		filterGoodsByCategoryByPid(goods, id) {
			if (id == -1) return goods;
			let arr = [];
			goods.forEach(ele => {
				ele.cids || (ele.cids = []);
				ele.cids.some(e => {
					if (e == id) {
						arr.push(ele);
						return true;
					}
				});
			});
			return arr;
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
        initCondition(){
            this.condition = {
                operationType:'',
                goodsName:'',
                category:[],                //选择的分类
                code:'',
                operationUser:'',
                wid:'',                     //仓库id     
                time:[],                    //时间选择[Date,Date]      
            };
            this.initTime();
        },
        //初始时间
        initTime(){
            let start,end;
            end = new Date();
            start = end.getTime() - global.timeConst.ONEMONTH;
            start = new Date(start);
            this.condition.time = [start,end];
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
        let operationList = [];

        this.initCondition();

        operationList = await this.getHttp('invoicing_getInventoryLogType');
        this.operationList = this.changeOperationType(operationList);

        this.getCategoryList();

        this.warehouseList =  await this.getHttp('warehouseList');

        this.filterReset('reset');
    },
    /*
    beforeRouteEnter(to,from,next){
        if(from.meta.comName == 'materialTotalLog'){
            to.meta.keepAlive = true;
        }else{
            to.meta.keepAlive = false;            
        }
        next();
    },
    beforeRouteLeave(to,from,next){
        if(to.meta.comName == 'materialTotalLog'){
            from.meta.keepAlive = true;
        }else{
            from.meta.keepAlive = false;            
        }
        next();
    },
    */
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