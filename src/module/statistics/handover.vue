<!--
		**交接班统计（单店）
		*
		* 胡江
		* *
		*
-->
<template>
    <section id="handover">
        <section v-if="!showDetails">
            <div class="formBrand" v-if="obj">
                <span>选择店铺：{{obj.shopName}}</span>
                <span>|</span>
                <span>选择时间：{{shopTime}}</span>
            </div>
            <div class="top" v-else>
                <section class="timeS">
                    <el-date-picker style="width:150px;cursor: pointer"
                                    :clearable="false"
                                    v-model="startT"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="timestamp">
                    </el-date-picker>
                    <span style="width: 25px;line-height: 40px;text-align: center;">-</span>
                    <el-date-picker style="width:150px;cursor: pointer"
                                    :clearable="false"
                                    v-model="endT"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="timestamp">
                    </el-date-picker>
                    <!--<el-date-picker style="width:200px;cursor: pointer"-->
                                    <!--:clearable="false"-->
                                    <!--v-model="startT"-->
                                    <!--type="datetime"-->
                                    <!--value-format="timestamp">-->
                    <!--</el-date-picker>-->
                    <!--<span style="width: 25px;line-height: 40px;text-align: center;">-</span>-->
                    <!--<el-date-picker style="width:200px;cursor: pointer"-->
                                    <!--:clearable="false"-->
                                    <!--v-model="endT"-->
                                    <!--type="datetime"-->
                                    <!--value-format="timestamp">-->
                    <!--</el-date-picker>-->
                    <el-button type="primary" icon="el-icon-search" @click="search()"></el-button>
                </section>
                <section class="block-div">
                    <div v-on:click="selectBusinessHours" :class="[{'active':isOpenTime},'pickBlu']"></div>
                    <span style="font-size: 16px;">按营业时间</span>
                </section>
            </div>
            <div class="clear"></div>
            <div class="list">
                <el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="handoverList" border style="width: 100%">
                    <el-table-column fixed min-width = "180" align="center" label="操作">
                        <template slot-scope="scope">
                            <em class="under-line edit" @click="see(scope.row)">查看详情</em>
                            <em class="line"></em>
                            <em class="under-line del" @click="edit(scope.row)">差额调整</em>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "130" align="center" prop="getTime" label="开班时间"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "130" align="center" prop="giveTime" label="交班时间"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="userName" label="交班人"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "80"  align="center" prop="shifts" label="班次"> </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center" prop="roleName" label="交班人职位" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="totalIncome" label="实收金额" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="differPrice" label="现金差额" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="allNum" label="开台次数" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="pettyCash" label="备用金" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100" align="center"  prop="chargeIncome" label="服务费" > </el-table-column>
                </el-table>
            </div>
            <div style="margin-top: 10px">
                <el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num"
                               layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
            </div>
        </section>
        <section v-else>
            <section class="all">
                <div class="text">基本信息</div>
                <div class="dash"></div>
            </section>
            <section style="margin-bottom: 20px">
                <el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="detailsOne" border style="width: 100%">
                    <el-table-column show-overflow-tooltip min-width = "120" align="center"  prop="userName" label="交班人"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "130" align="center" prop="getTime" label="开班时间"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "130" align="center" prop="giveTime" label="交班时间"></el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center" prop="roleName" label="交班人职位" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "100"  align="center" prop="shifts" label="班次"> </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center"  prop="pettyCash" label="备用金" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center"  prop="allNum" label="开台次数" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center"  prop="havePayNum" label="订单总数" > </el-table-column>
                    <el-table-column show-overflow-tooltip min-width = "120" align="center" prop="chargeIncome" label="服务费" > </el-table-column>
                </el-table>
            </section>
            <section class="all">
                <div class="text">收入明细</div>
                <div class="dash"></div>
            </section>
            <section  style="width: 100%;border:1px solid #ebeef5;border-bottom:none;height: 40px">
                <div style="line-height: 40px;margin-left: 20px">
                    <span>总收入：{{totalIncome}}</span>
                </div>
            </section>
            <section>
                <el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="detailsTwo" border style="width: 100%">
                    <el-table-column show-overflow-tooltip min-width = "250" align="center" label="现金支付" header-align="center">
                        <template slot-scope="scope">
                            <span style="margin-left: 8px">
                                {{scope.row.num}}
                            </span>
                            <span class="button_d" @click="edit()">差额调整</span>
                        </template>
                    </el-table-column>
                    <template v-for="(item,index) in payTypeList">
                        <el-table-column show-overflow-tooltip min-width = "120" align="center" :prop="item.propName" :label="item.name">
                        </el-table-column>
                    </template>
                </el-table>
            </section>
            <section  style="width: 100%;border:1px solid #ebeef5;border-top:none;">
                <div class="li_top">
                    <ul>
                        <li v-for="(item,index) in modifyList">
                            <span>第{{modifyList.length-index}}次校对差额:</span>
                            <span class="second">{{item.differPrice}}</span>
                            <span>{{item.userName}}</span>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
        <handoverWin v-if="openWin" @interNum="backWin" :dataWin="dataWin"></handoverWin>
    </section>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				startT: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
				endT: new Date().setHours(0, 0, 0, 0), //日期组件的结束时间
				isOpenTime: true, //是否按营业时间

				handoverList:[],//当前展示的数据

				num: 10, //一页处理多少数据
				total: 0, //总页数
				page: 1, //当前第几页

				showDetails:false,//是否显示明细
                openWin:false,//打开差额调整弹窗

				detailsOne:[],//详情列表一
				detailsTwo:[],//详情列表二
                payTypeList:[],//支付方式列表

				modifyList:[],//差额调整列表

                dataWin:{},//传递给弹窗页面的数据
				totalIncome:"",//总收入
			};
		},
		props:['obj'],
//		props:['startTime','endTime','open','shopId','shopName'],
		created() {
			this.userdata = storage.session('userShop');
			if(this.obj){//从品牌进入单店
				let arr = [{name:'返回',className:'huiC',fn:()=>{
					this.$emit('chooseShop');
				}}];
				this.$store.commit('setPageTools',arr);
				this.isOpenTime=this.obj.open;
				this.shopTime=utils.format(new Date(this.obj.startTime),'yyyy年MM月dd日')+'-'+
					utils.format(new Date(this.obj.endTime),'yyyy年MM月dd日');
			}
			this.dataWin.trueShopId=this.obj?this.obj.shopId:this.userdata.currentShop.id;
            this.getChangeShiftsList();
		},
		methods:{
			//获取列表数据
			async getChangeShiftsList() {
				let difference=this.obj?(this.obj.endTime-this.obj.startTime):(this.endT- this.startT);
                let timer = 3 * 31 * 24 * 60 * 60 * 1000;
                if (difference> timer) {
                    this.$store.commit('setWin', {
                        title: '操作提示',
                        content: '最大只能查询三个月时间'
                    });
                    return false;
                }
                let nowData= {
//					shopId:this.obj?this.obj.shopId:this.userdata.currentShop.id,
					startTime:this.obj?this.obj.startTime/1000:this.startT/1000,
					endTime:(this.obj?this.obj.endTime/1000:this.endT/1000)+24*60*60-1,
					page: this.page,
					num: this.num,
					isOpenTime:Number(this.isOpenTime)
				};
                if(this.obj){
                	nowData.trueShopId=this.obj.shopId
                }
				let data = await http.getChangeShiftsList({
					data:nowData
				});
				if (data) {
					let list = data.list;
					for (let i = 0; i < list.length; i++) {
						list[i].getTime = utils.format(
							new Date(list[i].getTime * 1000),
							'yyyy.MM.dd/hh:mm'
						);
						list[i].giveTime = utils.format(
							new Date(list[i].giveTime * 1000),
							'yyyy.MM.dd/hh:mm'
						);
						if(Number(list[i].differPrice)>0){
							list[i].differPrice='+'+list[i].differPrice;
                        }
					}
					this.handoverList = list;
					this.total = data.total;
				}
				console.log(this.handoverList);
			},
            //获取详情数据
            async getDetailList(item){
				let nowData={
					id:item.id,
//					shopId:this.obj?this.obj.shopId:this.userdata.currentShop.id,
				};
				if(this.obj){
					nowData.trueShopId=this.obj.shopId;
                }
				let res= await http.getShiftsDetail({
					data:nowData
				});
				//处理支付方式
				let obj={num:0};  //特殊处理现金
				this.detailsTwo=[];
				for(let i=0;i<res.shiftsPay.length;i++){
					if(res.shiftsPay[i].name=='现金'){
						obj.num=res.shiftsPay[i].price;
						res.shiftsPay.splice(i,1);
                        i--;
                    }else {
						res.shiftsPay[i].propName='name'+i;
						obj['name'+i]=res.shiftsPay[i].price;
                    }
                }
				this.payTypeList=res.shiftsPay;
                this.detailsTwo.push(obj);
//				for(let i=0;i<this.payTypeList.length;i++){
//					if(this.payTypeList[i].name=='现金'){
//						this.payTypeList.splice(i,1);
//                        break;
//					}
//				}
				//处理差额调整
                for(let i=0;i<res.differPrice.length;i++){
                	if(Number(res.differPrice[i].differPrice)>0){
						res.differPrice[i].differPrice='+'+res.differPrice[i].differPrice;
                    }
                }
				this.modifyList=res.differPrice;
            },
			//是否按营业时间
			selectBusinessHours() {
				this.isOpenTime = !this.isOpenTime;
			},
			//搜索
			search(){
				this.getChangeShiftsList();
			},
			//每页显示多少行
			numChange(e){
				this.num = e;
				this.getChangeShiftsList()
			},
			//分页点击
			pageClick(e) {
				this.page=e;
				this.getChangeShiftsList()
			},
            //查看详情
			see(item){
				console.log(item);
				//差额调整
				this.dataWin.id=item.id;
				this.dataWin.cash=item.cash;
				//总计
				this.totalIncome=item.totalIncome;
				this.detailsOne=[];
				this.detailsOne.push(item);
				this.getDetailList(item);
				this.showDetails=true;
				let arr = [{name:'返回',className:'huiC',fn:()=>{
					this.huiC();
				}}];
				this.$store.commit('setPageTools',arr);
            },
            //查看详情返回
            huiC(){
				this.showDetails=false;
				if(this.obj){//从品牌进入单店
					let arr = [{name:'返回',className:'huiC',fn:()=>{
						this.$emit('chooseShop');
					}}];
					this.$store.commit('setPageTools',arr);
				}else {
					let arr = [];
					this.$store.commit('setPageTools',arr);
                }
            },
            //差额调整
            edit(item){
            	if(item){
					this.dataWin.id=item.id;
					this.dataWin.cash=item.cash;
                }
				this.openWin=true;
            },
            //差额调整返回
			backWin(res,num){
            	if(res=='ok'){
                    this.modifyList.unshift({differPrice:Number(num)>0?`+${num}`:num,
                            userName:this.userdata.user.name});
					this.getChangeShiftsList();
                }
                this.openWin=false;
            }
		},
		destroyed() {
			this.$store.commit('setPageTools',[]);
		},
		components: {
			handoverWin: () => import(/*webpackChunkName: "handover_win"*/ './handover_win')
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
            }
        }
        .formBrand{
            span{
                display: inline-block;
            }
        }
        .clear{
            height: 20px;
            clear: both;
        }
        .list{
            .under-line {
                color: #F8931F;
                display: inline-block;
                line-height: normal;
                cursor: pointer;
            }
            .edit {
                color:#28a8e0;
            }
            .line {
                display: inline-block;
                width: 2px;
                height: 18px;
                background: #ebeef5;
                vertical-align: middle;
                margin: 0 5px;
            }
            .del {
                color: #FE8D2C;
            }
        }
        .all{
            height: 30px;
            line-height: 30px;
            position: relative;
            margin-bottom: 20px;
            .text{
                width: 80px;
                height: 20px;
                line-height: 20px;
                text-indent: 10px;
                position: absolute;
                left:0;
                top: 10px;
                border-left: 5px solid #2EA8DC;
            }
            .dash{
                width: 800px;
                height: 10px;
                position: absolute;
                left: 80px;
                top: 20px;
                border-top: 1px dashed rgb(228, 229, 230);
            }
        }
        .button_d{
            width: 80px;
            height: 35px;
            line-height: 35px;
            color: #E1BB4A;
            border: 1px solid #E1BB4A;
            display: inline-block;
            border-radius: 20px;
            text-align: center;
            cursor: pointer;
            margin-left: 20px;
        }
        .li_top{
            height:200px;overflow-y: scroll;
            ul{
                padding:20px;
                margin: 0;
                list-style: none;
            }
            li{
                list-style: none;
                border-left: 1px solid #d4d4d4;
                position: relative;
                height: 26px;
                line-height: 26px;
                color: #909399;
                span{
                    height: 100%;
                    transform: translate(0,-49%);
                    /*overflow: hidden;*/
                    /*text-overflow: ellipsis;*/
                    /*white-space: nowrap;*/
                    display: inline-block;
                    margin-left: 10px;
                }
                .second{
                    width: 120px;
                }
            }
            li:first-child{
                span{
                    color: #333333;
                }
                .second{
                    color: #E1BB4A;
                }
            }
            li:last-child{
                height: 0;
                line-height: 0;
            }
            li::before{
                content: '';
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(-58%,-50%);
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #d4d4d4;
            }
            li:first-child::before {
                background-color: #E1BB4A;
                width: 9px;
                height: 9px;
                transform: translate(-56%,-50%);
            }
        }
    }
</style>