<template>
    <div id="shop">
        <p>选择店铺:&nbsp;{{shopItem.shopName}}&nbsp;&nbsp;|&nbsp;&nbsp;选择时间:&nbsp;{{getTime()}}</p>
        <el-table :data="listData.total" border style="width: 100%;margin-top:20px;" stripe>
            <el-table-column align="center" label="实收总计" prop="totalFee"></el-table-column>
            <el-table-column align="center" label="全部手续费" prop="totalCharge"></el-table-column>
            <el-table-column align="center" label="支付宝收入" prop="totalAliFee"></el-table-column>
            <el-table-column align="center" label="支付宝手续费" prop="totalAliCharge"></el-table-column>
            <el-table-column align="center" label="微信收入" prop="totalWxFee"></el-table-column>
            <el-table-column align="center" label="微信手续费" prop="totalWxCharge"></el-table-column>
            <el-table-column align="center" label="公众号收入" prop="totalWxMpFee"></el-table-column>
            <el-table-column align="center" label="公众号手续费" prop="totalWxMpCharge"></el-table-column>
            <el-table-column align="center" label="退款总计" prop="totalRefundFee"></el-table-column>
		</el-table>
        <el-table :data="listData.list" border style="width: 100%;margin-top:20px;" stripe>
            <el-table-column align="center" label="操作" style="text-aline:center;">
                <template slot-scope="scope">
                    <div @click="getDetail(scope.row)" class="detailsBtn">查看详情</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="商户订单号" prop="orderId"></el-table-column>
            <el-table-column align="center" label="交易时间">
                <template slot-scope="scope">
                    <i>{{getTime(scope.row.tradeTime)}}</i>
                </template>
            </el-table-column>
            <el-table-column align="center" label="交易渠道" prop="tradeType"></el-table-column>
            <el-table-column align="center" label="实收金额" prop="tradeFee"></el-table-column>
            <el-table-column align="center" label="交易金额" prop="totalFee"></el-table-column>
            <el-table-column align="center" label="手续费" prop="charge"></el-table-column>
            <el-table-column align="center" label="费率" prop="rate"></el-table-column>
            <el-table-column align="center" label="退款金额" prop="refundFee"></el-table-column>
		</el-table>
        <citicDetail :shzx="true" :detial='detial' v-if='show' @winEvent='winEvent'></citicDetail>
        <div class="page-box">
			<el-pagination @current-change="pageChange" background :current-page="page" layout="total, prev, pager, next, jumper" :total="allTotal"></el-pagination>
		</div>
    </div>
</template>
<script>
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
    data(){
        return {
            listData: {
                total: [],
                list: []
            },
            detialList: [],
            show: false,
            detial: null,
            allTotal: 0,
            page: 1,
        }
    },
    props: ['shopItem','billDate','time'],
    mounted(){
        let arr = [
            {
                name: '返回',
                style: {
                    'border': '1px solid #909399',
                    'color': '#909399',
                    'background': '#fff'
                },
                fn: () =>{
                    this.$emit('return')
                }
            },

        ]
        this.$store.commit("setPageTools",arr);
        this.citicGetShopBillList();
    },
    components: {
        citicDetail: () =>
			import(/* webpackChunkName:"citic_statements_detail" */ './citic_statements_detail'),
    },
    methods: {
        getTime(item){
            let time = item ? item : this.time;
            return utils.getTime({time:time,format: 'yyyy年MM月dd日'}).format;
        },
        getDetail(item){
            this.show = true;
            this.detial = item;
        },
        async citicGetShopBillList(){
            let res = await http.citicGetShopBillList({data: {
                subShopId: this.shopItem.shopId,
                billDate: this.billDate
            }});
            this.listData.total = [];
            this.detialList = utils.deepCopy(res.list);
            this.listData.total.push(res.total)
            this.allTotal = res.list.length;
            this.pageChange(this.page);
        },
        winEvent(){
            this.show = false;
        },
        pageChange(page) {
            this.page = page;
            this.listData.list = this.detialList.slice((page-1)*10,page*10);
        },
    }
}
</script>
<style lang="less" scoped>
    #shop{
        p{
            color: #43414a;
            font-size: 16px;
        }
        .detailsBtn{
            color: #29abe2;
			cursor: pointer;
        }
        .page-box{
            margin-top: 20px;
        }
    }
</style>
