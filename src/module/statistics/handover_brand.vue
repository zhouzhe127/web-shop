<!--
		**交接班统计（品牌）
		*
		* 胡江
		* *
		*
-->
<template>
    <section id="handover">
        <div v-if="!isShop">
            <div class="top">
                <section class="timeS">
                    <el-date-picker style="width:250px;"
                                    v-model="timeSer"
                                    :clearable="false"
                                    value-format="timestamp"
                                    type="daterange">
                    </el-date-picker>
                </section>
                <section class="block-div">
                    <div v-on:click="selectBusinessHours" :class="[{'active':isOpenTime},'pickBlu']"></div>
                    <span style="font-size: 16px;">按营业时间</span>
                </section>
                <section class="fl" >
                    <elShopList :shopIds="selShopId" @chooseShop="getShop"></elShopList>
                </section>
                <div class="block-div">
                    <a href="javascript:;" style="background: #2EA8DC;" @click="search()">筛选</a>
                    <a href="javascript:;" style="background: #B3B3B3;" @click="reset()">重置</a>
                </div>
            </div>
            <div class="clear"></div>
            <div class="list">
                <el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="currentList" border style="width: 100%">
                    <el-table-column fixed min-width = "120" align="center" label="店铺名称">
                        <template slot-scope="scope">
                            <span style="color:#2EA8DC;cursor:pointer" @click="toShop(scope.row,scope.$index)">{{scope.row.shopName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  min-width = "100" align="center" prop="num" label="班次数"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center" prop="mushNum" label="实收金额"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center"  prop="openNum" label="开台次数"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120"  align="center" prop="guaNum" label="挂台次数"> </el-table-column>
                    <el-table-column  min-width = "120" align="center" prop="guaMoney" label="挂账金额" > </el-table-column>
                    <el-table-column  min-width = "120" align="center"  prop="money" label="服务费" > </el-table-column>
                </el-table>
            </div>
            <div style="margin-top: 10px">
                <el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num"
                               layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
            </div>
        </div>
        <handover v-if="isShop" :obj="obj" @chooseShop="back"></handover>
    </section>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				isShop:false,
				obj:{},

				timeSer:[new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)],
				isOpenTime: true, //是否按营业时间
				selShopId: [], //选中的店铺id//传给选择店铺页面

				currentList:[],//当前展示的数据
                pageList:[],//所有数据,用于分页的数据

				num: 10, //一页处理多少数据
				total: 0, //总页数
				page: 1, //当前第几页


			};
		},
		props: [],
		created() {
			this.userdata = storage.session('userShop');
			if (this.userdata.currentShop.ischain !== '3') {
				this.$router.push({
					path: '/admin/handover/handoverShop',
					query: this.$route.query
				});
				return;
			}
			this.init();
		},
        methods:{
			//初始数据
			init(){
				this.pageList=[
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					{shopName:'杭州一店',num:'25',mushNum:'56',openNum:'89',guaNum:'8987',guaMoney:'856',money:'856'},
					];
				this.paging()
            },
			//是否按营业时间
			selectBusinessHours() {
				this.isOpenTime = !this.isOpenTime;
			},
			//选择店铺返回
			getShop(res) {
				this.selShopId=res;
				console.log(res);
			},
            //搜索
			search(){

            },
            //重置
			reset(){
				this.timeSer=[new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)];
				this.isOpenTime=true;
				this.selShopId=[];
				this.page=1;
				this.paging();
            },
			//每页显示多少行
			numChange(e){
				this.num = e;
				this.page = 1;
				this.paging();
			},
			//分页点击
			pageClick(e) {
				this.page = e;
				this.paging();
			},
            //分页
			paging() {
				this.total = Math.ceil(this.pageList.length / this.num); //获取总页数
				this.currentList = this.pageList.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num); //截取当前页数据
			},
			//去单店
			toShop(item ,i){
				this.obj={
					time:this.timeSer,
					open:this.isOpenTime,
					shopId:10010,
					shopName:item.shopName
                };
				this.isShop=true;

				console.log(item)
				console.log(i)
			},
            back(){
				this.isShop=false;
            }


        },
		destroyed() {

		},
		components: {
			handover: () =>
				import(/*webpackChunkName: "handover"*/ './handover'),
			elShopList: () =>
				import ( /*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
		}
	};
</script>

<style lang="less" scoped>
    #handover{
        .top{
            height: 40px;
            line-height:40px;
            .timeS{
                float: left;
            }
            .block-div{
                float: left;
                margin:0 10px;
                .active {
                    background: url(../../res/icon/selected.png) center center no-repeat,
                    #28a8e0;
                }
                .pickBlu {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                    border: 1px solid #28a8e0;
                    margin: 13px 10px;
                    float: left;
                }
                a {
                    display: inline-block;
                    width:80px;
                    height: 40px;
                    text-align: center;
                    line-height: 40px;
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
        .clear{
            height: 20px;
            clear: both;
        }
    }
</style>