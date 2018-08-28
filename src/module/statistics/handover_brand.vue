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
            <div class="loading" v-if="loading"><img src="../../res/images/preloader.gif" /></div>
            <div v-else>
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
        </div>
        <handover v-if="isShop" :obj="obj" @chooseShop="back"></handover>
    </section>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import Timer from 'src/verdor/timer';
	export default {
		data() {
			return {
				isShop:false,
				obj:{},//传递给单店的数据

				timeSer:[new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)],
				isOpenTime: true, //是否按营业时间
				selShopId: [], //选中的店铺id

				currentList:[],//当前展示的数据
                pageList:[],//所有数据,用于分页的数据

				num: 10, //一页处理多少数据
				total: 0, //总页数
				page: 1, //当前第几页

				repeat: true, //防止重复轮询
				taskId: '', //传给后台请求数据的一个字段
				timerId: '', //计时器id
				loading: false, //加载动画
			};
		},
		props: [],
		created() {
			this.userdata = storage.session('userShop');
			if (this.userdata.currentShop.ischain !== '3') {//单店
				this.$router.push({
					path: '/admin/handover/handoverShop',
					query: this.$route.query
				});
				return;
			}else {
				let userShopList = storage.session('shopList');
				this.selShopId=userShopList.map((v) => {
					return v.id
				});
            }
			this.getStoreOrder();
		},
        methods:{
			//初始数据
			async getStoreOrder() {
				if (!this.repeat) {
					//轮询未结束 防止重复轮询
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
					});
					return;
				}
				if (!this.validate()) return;  //验证
				http.OrderReport({
                    data: {
							type: 25,
							timeType: 1,
							startTime: this.timeSer[0]/1000,
							endTime: this.timeSer[1]/1000,
							isOpenTime: Number(this.isOpenTime),
							shopIds: this.selShopId.toString()}
					}).then(data => {
						this.taskId = data.taskId;
						this.repeat = false; //禁止重复轮询
						this.loading = true; //开始加载动画
						this.timerId = Timer.add(() => {//轮询请求taskId
								http.taskInfo({
                                    data: {taskId: this.taskId}
                                }).then(data => {
                                    if(data.status == 3) {
                                        //轮询完成 获取数据
                                        Timer.clear(this.timerId);
                                        this.repeat = true;
                                        http.ReportGet({data: {taskId: this.taskId}
                                        }).then(data => {
                                            this.loading = false; //停止加载动画
                                            this.pageList = data;
                                            console.log(data);
                                        });
										this.paging(); //分页
                                    }else if(data.status == 2) {
                                        //失败
                                        Timer.clear(this.timerId);
                                        this.loading = false; //停止加载动画
                                        this.repeat = true; //轮询完成 可继续查询
                                        this.$store.commit('setWin', {
                                            title: '提示信息',
                                            content: '请求失败，请重试！'
                                        });
                                    }
                                })}, 1000, 60, false,() => {
							    //轮询超时
								Timer.clear(this.timerId);
								this.repeat = true;
								this.loading = false;
								this.$store.commit('setWin', {
									title: '提示信息',
									content: '轮询超时，请重新搜索'
								});}
						);
                });
			},
            //验证
			validate(){
				if(this.selShopId.length===0){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请选择店铺'
					});
					return false;
                }
                return true;
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
				this.getStoreOrder();
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
					shopId:item.id,
					shopName:item.shopName
                };
				this.isShop=true;

				console.log(item)
				console.log(i)
			},
            //单店返回
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
        .loading {
            width: 100%;
            height: 350px;
            padding-top: 100px;
            text-align: center;
        }
    }
</style>