<template>
    <div class="goods-batch-log">
        <div class="page-head">
            批次详情
        </div>

        <div class="info">
            <div class="col">
                <li>商品名:{{materialInfo.gName}}</li>
                <li>条形码:{{materialInfo.barCode}}</li>
                <li>品牌:{{materialInfo.brandName}}</li>
                <li class="column-container">
                    <div class="label">分类:</div>
                    <div class="">
                        <template v-for="(a,ai) in materialInfo.cate">
                            <p :key="ai">
                                {{a.name}}
                                <i v-if="ai != materialInfo.cate.length -1 ">&nbsp;;&nbsp;</i>
                            </p>
                        </template>                        
                    </div>
                </li>
            </div>
            <div class="col">
                <li>单位:{{materialInfo.unit}}</li>
                <li>售价:{{materialInfo.price}}</li>
                <li>批次数:{{materialInfo.batchNum}}</li>
                <li class="column-container">
                    <div class="label">货架位置:</div>
                    <div class="">
                        <template v-for="(a,ai) in materialInfo.shelves">
                            <p :key="ai">
                                {{a.shelfName}}/{{a.areaName}}
                                <i v-if="ai != materialInfo.shelves.length -1 ">&nbsp;;&nbsp;</i>
                            </p>
                        </template>                        
                    </div>
                </li>
            </div>
            <div class="col">
                <li>规格:{{materialInfo.specifications}}</li>
                <li>保质期:{{materialInfo.validity}}{{materialInfo.validityTypeName}}</li>
                <li>耗损:{{materialInfo.lossNum}}</li>
            </div>
            <div class="col">
                <li>仓库数量/重量:{{materialInfo.surplus}}</li>
                <li>上架数量:{{materialInfo.shelveNum}}</li>
                <li>总量:{{materialInfo.total}}</li>
            </div>
        </div>

        <div class="content">
            <el-select v-model="unitArr" placeholder="单位切换" clearable>
                <el-option
                v-for="item in unitArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <div class="operation-type">
                操作类型:{{typeName}}
            </div>
        </div>

        <div class="table">
            <div class="table-head">
                批次列表
                <i class="circle"></i>共 <span class="num">2</span> 个条目
            </div>
            <el-table :data="tableData" stripe border :header-cell-style="{'background-color':'#F5F7FA'}">
                <el-table-column prop="itemIndex"  label="序号">
                </el-table-column>
                <el-table-column prop="barcode" width="150px" label="批次编码" >
                </el-table-column>
                <el-table-column prop="operationType" width="150px" label="生产日期" >
                </el-table-column>
                <el-table-column prop="before" width="150px" label="供应商" >
                </el-table-column>
                <el-table-column prop="change" width="150px" label="变化量" >
                    <template slot-scope="{row,col,index}">
						<span class="arrow" :class="{'arrow-up':row.arrow,'arrow-down':!row.arrow}"></span>
						{{row.change}}
                    </template>
                </el-table-column>
                <el-table-column prop="after" width="150px" label="进价" >
                </el-table-column>
                <el-table-column prop="cost" width="150px" label="仓库" >
                </el-table-column>
                <el-table-column prop="cost" width="150px" label="备注" >
                </el-table-column>
            </el-table>           
        </div>
    </div>
</template>
<script>
/*
    请求:
        获取商品库存详情:InvoicingGetGoodsDetail
        获取批次详情:InvoicingGetLogBatchDetail
*/
import http from 'src/manager/http';

export default {
    data () {
        return {
            valiDate:[
                {id:0,name:'月'},
                {id:1,name:'日'},
                {id:2,name:'年'},
            ],
            materialInfo:{},
            typeName:'',            //操作类型
            tableData:[],
            operationList:[],
            unitArr:[],
            goodsId:1,               //商品id
            logId:1,                 //日志id
        };
    },
    methods: {
        async getGoodsDetail(){
            let info = {};
            info = await this.getHttp('InvoicingGetGoodsDetail',{gid:this.goodsId,wid:0});
            if(!info || typeof info != 'object') info = {};
            info.validityTypeName = this.getAttr(this.valiDate,info.validityType);
            this.materialInfo = info;
        },


		getAttr(arr,val,attr='type'){
			let getAttr = 'typeName';
			if(!Array.isArray(arr)) arr = [];
			for(let ele of arr){
				if(ele[attr] == val) return ele[getAttr];
			}
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
    },
    components: {

    },
    async mounted(){
        let typeName = '';
        let retData = {};
        
        this.getGoodsDetail();

        retData = await this.getHttp('InvoicingGetLogBatchDetail',{id:this.logId});
        if(!retData || typeof retData != 'object') retData = {};

        this.operationList = await this.getHttp('invoicing_getInventoryLogType');
        console.log(retData.type);
        this.typeName = this.getAttr(this.operationList,retData.type);
    },
};
</script>
<style lang='less' scoped>
    @import url('../warehouse_manage/z_less.less');
    @table-border:1px solid #ebeef5;
    .inline-middle{
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
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
    li{
        list-style: none;
    }
	.page-head{
		.split-div(80%);
    }
    .goods-batch-log{
        .info{
            display: flex;
            flex-flow: row wrap;
            margin-top: 20px;
            width:90%;
            padding-left:50px;
            .col{
                min-width:210px;
                flex-grow: 1;
                li{
                    .lfc(#606266,inherit,14px);
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
        .content{
            padding:15px 0;
            .operation-type{
                display: inline-block;
                height:40px;
                color:#303133;
                padding-left: 20px;
            }
        }
        .table{
			border:@table-border;
			border-radius:4px;
			width:90%;
			.table-head{
				height:40px;
				padding-left:20px;
				border-bottom:none;
				.lfc(#333,40px,16px);
				.circle{
					.inline-middle;
					.whb(5px,5px,none);
					background-color: #666;
					border-radius: 50%;
					margin: 0 5px;
				}
				.num{
					color:@ey;
					font-size:16px;
				}
			}
        }
    }
</style>