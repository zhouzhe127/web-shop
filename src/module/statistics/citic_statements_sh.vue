<template>
    <div id="zxsh">
        <div v-if="!isShop">
            <el-date-picker v-model="time" type="date" :picker-options="pickerOptions" placeholder="选择日期"></el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="search"></el-button>
                <el-table :data="listData.total" border style="width: 100%;margin-top:20px;" stripe>
                <el-table-column align="center" label="实收总计" :render-header="renderHeader" prop="totalFee"></el-table-column>
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
                <el-table-column fixed align="center" label="操作" style="text-aline:center;">
                    <template slot-scope="scope">
                        <div @click="getDetail(scope.row)" class="detailsBtn">查看详情</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="门店名称" prop="shopName"></el-table-column>
                <el-table-column align="center" label="转账状态" prop="status"> </el-table-column>
                <el-table-column align="center" label="实收金额" width="100px" :render-header="renderHeader" prop="totalFee"></el-table-column>
                <el-table-column align="center" label="全部手续费" prop="totalCharge"></el-table-column>
                <el-table-column align="center" label="支付宝收入" prop="totalAliFee"></el-table-column>
                <el-table-column align="center" label="支付宝手续费" width="120px" prop="totalAliCharge"></el-table-column>
                <el-table-column align="center" label="微信收入" prop="totalWxFee"></el-table-column>
                <el-table-column align="center" label="微信手续费" prop="totalWxCharge"></el-table-column>
                <el-table-column align="center" label="公众号收入" prop="totalWxMpFee"></el-table-column>
                <el-table-column align="center" label="公众号手续费" width="120px" prop="totalWxMpCharge"></el-table-column>
                <el-table-column align="center" label="退款" prop="totalRefundFee"></el-table-column>
            </el-table>
        </div>
        <shopDetail v-else @return="getShop" :shopItem='shopItem' :time="time" :billDate="billDate"></shopDetail>
    </div>
</template>
<script>
import http from 'src/manager/http';
let base = null;
export default {
    data(){
        return {
            time: new Date().getTime()-24*60*60*1000,
            listData: {
                total: [],
                list: [],
            },
            billDate: null, //传给后台的时间格式yyyymmdd
            isShop: false,
            loading: null,
            searchType: null, //判断是转账还是查询 'transfer'为转账  'search'为查询
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()-24*60*60*1000;
                }
            }
        }
    },
    mounted(){

        // let Base64 = await import(/* webapckChunkName:"base64" */ "src/verdor/Base64");
        // Base64 = Base64.default;
        // base = new Base64();
        this.search();
    },
    components: {
        shopDetail: () =>
			import(/* webpackChunkName:"citic_statements_sh_shop" */ './citic_statements_sh_shop'),
    },
    methods: {
        renderHeader(h,{column}){
            return h('span',{
                        style: 'cursor:pointer'
                    },[
                        h('el-tooltip', {
                                props: {
                                    content: column.label == '实收总计' ? "实收总计为该品牌检索日期内收到的金额总计(已扣除手续费及退款)" : '实收金额为当前店铺能收到的实际转账金额(已扣除手续费及退款)',
                                    placement: "top"
                                }
                            },[
                                h('span',{},[
                                        h('i',{},column.label),
                                        h('i',{
                                        class: 'el-icon-question'
                                    })
                                ]),
                            ]
                        ),
                    ])
        },
        initBtn(){
            let arr = [
                // {
                //     name: '一键转账',
                //     style: {
                //         'border': '1px solid #f8931f',
                //         'color': '#f8931f',
                //         'background': '#fff'
                //     },
                //     fn: () =>{
                //         this.load();
                //         this.searchType = 'transfer';
                //         this.citicGetTransferData();
                //     }
                // },
                // {
                //     name: '查询转账',
                //     style: {
                //         'border': '1px solid #2ea7e0',
                //         'color': '#2ea7e0',
                //         'background': '#fff'
                //     },
                //     fn: () => {
                //         this.searchType = 'search'
                //         this.citicGetQueryData();
                //     }
                // },
                {
                    name: '导出',
                    style: {
                        'border': '1px solid #2ea7e0',
                        'color': '#2ea7e0',
                        'background': '#fff'
                    },
                    fn: () => {
                        this.citicExportBillSplitList();
                    }
                }
            ]
            this.$store.commit("setPageTools",arr);
        },
        //loading加载
        load(){
            this.loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        },
        //获取转账结果查询报文
        async citicGetQueryData(){
            let res = await http.citicGetQueryData({data: {billDate: this.billDate}},true)
            .catch(err=>{
                this.loading.close();
                this.$store.commit('setWin', {content: err.error.message});
            });
            if(!res) return;
            this.ceshi(res.data);
        },
        //解析转账结果查询报文
        async citicGetQueryResult(xml){
            await http.citicGetQueryResult({data: {
                billDate: this.billDate,
                xml: xml
            }},true).catch(err=>{
                this.$store.commit('setWin', {content: err.error.message});
            });
            this.loading.close();
        },
        //获取一键转账报文数据
        async citicGetTransferData(){
            let res = await http.citicGetTransferData({data: {billDate: this.billDate}},true)
            .catch(err=>{
                this.loading.close();
                this.$store.commit('setWin', {content: err.error.message});
            });
            if(!res){
                return false
            }
            this.ceshi(res.data);
        },
        async ceshi(item){
            let res = await http.ceshi({data: item},true)
            .catch(err =>{
                this.loading.close();
                this.$store.commit('setWin', {content: err.error.message});
            });
            if(!res){
                return false
            }
            if(this.searchType == 'transfer'){
                this.citicGetTransferResult(res);
            }else{
                this.citicGetQueryResult(res);
            }
        },
        async citicGetTransferResult(xml){
            await http.citicGetTransferResult({data: {
                billDate: this.billDate,
                xml: xml
            }},true).catch(err=>{
                this.$store.commit('setWin', {content: err.error.message});
            });
            this.loading.close();
        },
        search(){
            if(this.time > new Date().getTime()-24*60*60*1000){
                this.$store.commit('setWin', {title: '提示',winType: 'alert',content: '只能查询今天以前的对账单'});
                return false;
            }
            this.load();
            this.citicGetBillSplitList();
        },
        async citicGetBillSplitList(){
            let month = new Date(this.time).getMonth() + 1 < 10 ? '0' + (new Date(this.time).getMonth() + 1) : new Date(this.time).getMonth() + 1 
            let day = new Date(this.time).getDate() < 10 ? '0' + new Date(this.time).getDate() : new Date(this.time).getDate();
            this.billDate = '' + new Date(this.time).getFullYear() + month + day;
            let res = await http.citicGetBillSplitList({data: {
                billDate: this.billDate
            }},true)
            .catch(err=>{
                this.$store.commit('setWin', {content: err.error.message});
            });
            this.loading.close();
            if(!res){
                return false
            }else if(res.list.length>0){
                this.initBtn();
            }
            this.listData.total = [];
            this.listData.total.push(res.total)
            this.listData.list = res.list;
        },
        //导出
        async citicExportBillSplitList(){
            await http.citicExportBillSplitList({data: {
                billDate: this.billDate
            }})
        },
        getDetail(item){
            this.shopItem = item;
            this.isShop = true;
        },
        getShop(){
            this.isShop = false;
            this.initBtn();
        }
    }
}
</script>
<style lang="less" scoped>
    #zxsh{
        .detailsBtn{
            color: #29abe2;
			cursor: pointer;
        }
        .detImg{
            position: absolute;
            right: 0px;
            top: 15px;
        }
    }
</style>
