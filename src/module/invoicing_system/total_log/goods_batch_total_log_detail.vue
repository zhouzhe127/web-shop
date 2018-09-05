<template>
    <div class="goods-batch-log">
        <div class="page-head">
            批次详情
        </div>

        <div class="info">
            <div class="col">
                <li>商品名:</li>
                <li>条形码:</li>
                <li>品牌:</li>
                <li>序号:</li>
            </div>
            <div class="col">
                <li>分类:</li>
                <li>单位:</li>
                <li>售价:</li>
                <li>批次数:</li>
            </div>
            <div class="col">
                <li>规格:</li>
                <li>保质期:</li>
                <li>耗损:</li>
                <li>货架位置:</li>
            </div>
            <div class="col">
                <li>仓库数量/重量:</li>
                <li>上架数量:</li>
                <li>总量:</li>
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
                操作类型:
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
            </el-table>           
        </div>
    </div>
</template>
<script>
import http from 'src/manager/http';

export default {
    data () {
        return {
            tableData:[],
            unitArr:[],
        };
    },
    methods: {

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
    mounted(){

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