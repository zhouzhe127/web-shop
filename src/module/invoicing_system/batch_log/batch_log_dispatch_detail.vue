<template>
    <div id="batch-log-dispatch-detail">
        <div class="nav">
            <div class="page-head">批量调度日志</div>
            <div class="info">
                <li>出货仓库:{{info.wName}}</li>
                <li>操作人:{{info.createUName}}</li>
                <li>操作时间:{{info.zh_createTime}}</li>
            </div>            
        </div>

        <div class="main">
            <div class="tab">
                <el-button @click="toggleTabs(btn,btnIndex)" :type="btn.id == selectTabs ? 'primary' : 'plain'" v-for="(btn,btnIndex) in tabs" :key="btnIndex">{{btn.name}}</el-button>
            </div>
            <div class="content" v-show="selectTabs == 1">
                <div class="table-goods" >
                    <div class="table-title">
                        <div class="extend">
                            <span class="extend-left extend-common" @click="showAllDetail('goods','open')">全部展开</span>
                            <span class="extend-right extend-common" @click="showAllDetail('goods','close')">全部收起</span>
                        </div>
                        <div class="another-title">
                            <li v-for="(a,ai) in goodsTableTitle" :key="ai" >{{a.name}}</li>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="(g,gi) in goods" :key="gi">
                            
                            <div class="row-detail">
                                <div class="extend">
                                    <span class="arrow" @click="showRowDetail('goods',g,gi)">
                                        <i 
                                            class="fi fi-double-angle-up fi-2x font-up" 
                                            :class="{
                                                'fi-double-angle-up':g.showDetails,
                                                'blue-font':!g.showDetails,
                                                'fi-double-angle-down':g.showDetails,
                                                'font-down':g.showDetails
                                            }"
                                        ></i>
                                    </span>
                                </div>

                                <div class="row-sum" >
                                    <template v-for="(k,ki) in ['name','selectUnitName','applySum','applyAverage','applyListNum','invenNum','outputNum','allocationTypeName']">
                                        <li  :key="ki" :class="{'error':g.isSuccess == 0}">{{g[k]}}</li>
                                    </template>
                                </div>
                            </div>

                            <div class="table-detail" v-show="g.showDetails">
                                <div class="detail-title">
                                    <li ></li>
                                    <li >仓库名称</li>
                                    <li >仓库所属</li>
                                    <li >申请量</li>
                                    <li >平均量</li>
                                    <li>按比例量</li>
                                    <li>实际出货量</li>
                                </div>

                                <div class="detail-body">
                                    <div class="detail-row" v-for="(d,di) in g.detail" :key="di">
                                        <li>
                                            <template v-if="d.isSuccess == 0">
                                                <i class="el-icon-warning error"></i>
                                                <span class="error">匹配失败</span>
                                            </template>
                                        </li>
                                        <li :class="{'error':d.isSuccess == 0}"  v-for="(k,ki) in ['intoWarehouseName','intoWarehouseOwner','applyNum','averageNum','byPercentageNum','num']" :key="ki">
                                            {{d[k]}}
                                        </li>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="empty-div" v-if="goods.length == 0">-暂无条目-</div>
                </div>
            </div>

            <div class="content" v-show="selectTabs == 2">
                <div class="table-material" >
                    <div class="table-title">
                        <div class="extend">
                            <span class="extend-left extend-common" @click="showAllDetail('material','open')">全部展开</span>
                            <span class="extend-right extend-common" @click="showAllDetail('material','close')">全部收起</span>
                        </div>
                        <div class="another-title">
                            <li v-for="(a,ai) in materialTableTitle" :key="ai" >{{a.name}}</li>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="(g,gi) in material" :key="gi">
                            
                            <div class="row-detail">
                                <div class="extend">
                                    <span class="arrow" @click="showRowDetail('material',g,gi)">
                                        <i 
                                            class="fi fi-double-angle-up fi-2x font-up" 
                                            :class="{
                                                'fi-double-angle-up':g.showDetails,
                                                'blue-font':!g.showDetails,
                                                'fi-double-angle-down':g.showDetails,
                                                'font-down':g.showDetails
                                            }"
                                        ></i>
                                    </span>
                                </div>
                                <div class="row-sum" >
                                    <template v-for="(k,ki) in ['name','typeName','selectUnitName','applySum','applyAverage','applyListNum','invenNum','outputNum','allocationTypeName']">
                                        <li  :key="ki" :class="{'error':g.isSuccess == 0}">{{g[k]}}</li>
                                    </template>
                                </div>
                            </div>

                            <div class="table-detail" v-show="g.showDetails">
                                <div class="detail-title">
                                    <li></li>
                                    <li>仓库名称</li>
                                    <li>仓库所属</li>
                                    <li>申请量</li>
                                    <li>平均量</li>
                                    <li>按比例量</li>
                                    <li>实际出货量</li>
                                    <li>分销价格</li>
                                </div>

                                <div class="detail-body">
                                    <div class="detail-row" v-for="(d,di) in g.detail" :key="di">
                                        <li>
                                            <template v-if="d.isSuccess == 0">
                                                <i class="el-icon-warning error"></i>
                                                <span class="error">匹配失败</span>
                                            </template>
                                        </li>
                                        <li :class="{'error':d.isSuccess == 0}"  v-for="(k,ki) in ['intoWarehouseName','intoWarehouseOwner','applyNum','averageNum','byPercentageNum','num','distributionInfo']" :key="ki">
                                            {{d[k]}}
                                        </li>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="empty-div" v-if="material.length == 0">-暂无条目-</div>
                </div>
            </div>

            <div class="application" v-show="selectTabs == 3">
                <table-com
                    :showHand="false" 
                    :titleHeight='40' 
                    :showTitle="1" 
                    :titleData="applicationTitle" 
                    :fixed="2" 
                    :widthType="true" 
                    :introData="dispatchApplication" 
                    :listWidth="1200"
                    :bannerStyle="{color:'#333','fontSize':'16px'}"
                    :mainBox="{color:'#666'}"
                    :listHeight="70"
                >
                <div slot-scope="{data,index}" slot="con-0">
                    <span class="view-detail" @click="linkUrl('detail',data )">查看详情</span>
                </div>
                </table-com>                   
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>
<script>
/*
    请求:
        dispatchGetDispatchLogDetailList                //获取日志详情
        DispatchrecordGetAllocationType                 //获取配货方式

*/
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
    data () {
        return {
            goodsTableTitle:[
                {name:'商品名称'},
                {name:'申请单位'},
                {name:'申请总量'},
                {name:'平均申请量'},
                {name:'申请单数'},
                {name:'库存总量'},
                {name:'出货总量'},
                {name:'配货方式'},
            ],
            materialTableTitle:[
                {name:'物料名称'},
                {name:'物料类型'},
                {name:'申请单位'},
                {name:'申请总量'},
                {name:'平均申请量'},
                {name:'申请单数'},
                {name:'库存总量'},
                {name:'出货总量'},
                {name:'配货方式'},
            ],
            applicationTitle:[
                {titleName:'操作'},
                {titleName:'序号',dataName:'itemIndex'},
                {titleName:'申请单号',dataName:'applicationCode'},
                {titleName:'申请店铺/品牌',dataName:'applicationShop'},
                {titleName:'申请人',dataName:'applicant'},
                {titleName:'申请时间',dataName:'applicationTime'},
            ],
            tabs:[
                {name:'商品',id:1,},
                {name:'物料',id:2},
                {name:'申请单列表',id:3},
            ],
            selectTabs:1,
            goods:[],
            material:[],
            dispatchApplication:[],
            allocationTypes:[],         //获取配货方式          
            info:{},                    //头部信息
            logId:'',
            unitList:[],                //单位列表
            showDetails:{
                material:true,
                goods:true,
            }
        };
    },
    methods: {
        linkUrl(flag,item){
            let query = this.$route.query;
            if(flag == 'detail'){
                query.id = item.applicationId;
                this.$router.push({path:'/admin/schedulingApplication/purchaseRequisitionDetail',query});
            }
        },
        toggleTabs(btn){
            this.selectTabs = btn.id;
        },
        showAllDetail(type,status){
            let s = status == 'open';
            this.changeShowDetail(this[type],s);
            this.$forceUpdate();
        },
        showRowDetail(type,g,gi){
            g.showDetails = !g.showDetails;  
            this.$forceUpdate();
        },
        async getDetail(){
            if(!this.logId) return;
            let res = await this.getHttp('dispatchGetDispatchLogDetailList',{logId:this.logId});
            if(this.toRaw(res,'Object')){
                let {createTime,createUName,wName,dispatchApplication=[],goods=[],material=[]} = res;
                createTime *= 1000;
                let date = this.generatorDate(createTime);
                this.info = {
                    wName,
                    createUName,
                    zh_createTime:date.str,
                };
                
                this.goods = [...goods];
                this.material = [...material];
                this.dispatchApplication = [...dispatchApplication];
                this.addItemIndex(this.dispatchApplication);
                this.initGoods();
                this.initMaterial();
                if(this.goods.length > 0){
                    this.selectTabs = 1;
                }else if(this.material.length > 0){
                    this.selectTabs = 2;                    
                }else{
                    this.selectTabs = 3;                                        
                }
                
            }
        },
        initGoods(){
            this.goods = this.goods.map((ele)=>{
                let detail = ele.detail;        
                
                ele.isSuccess = this.judgeIsSuccess(detail,'isSuccess');
                ele.showDetails = true;                                     //是否展示详情
                ele.applySum = this.calcSum(detail);                        //申请总量
                ele.applyListNum = detail.length;                           //申请单数
                ele.applyAverage = ele.applySum / detail.length;            //平均申请量
                ele.applyAverage = ele.applyAverage.toFixed(3);

                if(ele.isSuccess == 0){
                    ele.outputNum = '';
                    ele.allocationTypeName = '';
                    ele.invenNum = '';
                }else{
                    ele.outputNum = this.calcSum(detail,'num');                  //出货总量
                    ele.allocationTypeName = this.mapName(this.allocationTypes,ele.allocationType);     //配货方式
                }

                ele.detail = ele.detail.map((e)=>{
                    if(e.isSuccess == 0){
                        e.num = '';
                    }else{
                        e.averageNum =  ele.applyAverage;
                        e.byPercentageNum = e.applyNum / ele.applySum *  ele.outputNum;
                        e.byPercentageNum = e.byPercentageNum.toFixed(3);
                    }
                    return e;
                });
                return ele;
            });

        },
        initMaterial(){
            let materialType = ['成品','半成品','普通物料'];
            this.material = this.material.map((ele)=>{
                let detail = ele.detail;        
                
                ele.isSuccess = this.judgeIsSuccess(detail,'isSuccess');
                ele.showDetails = true;
                ele.type = Number(ele.type);
                ele.typeName = materialType[ele.type];                                      //物料类型
                ele.applySum = this.calcSum(detail);                                        //申请总量
                ele.applyListNum = detail.length;                                           //申请单数
                ele.applyAverage = ele.applySum / detail.length;                            //平均申请量
                ele.applyAverage = ele.applyAverage.toFixed(3);

                if(ele.isSuccess == 0){
                    ele.outputNum = '';
                    ele.allocationTypeName = '';
                    ele.invenNum = '';
                }else{
                    ele.outputNum = this.calcSum(detail,'num');                                         //出货总量
                    ele.allocationTypeName = this.mapName(this.allocationTypes,ele.allocationType);     //配货方式
                }

                ele.detail = ele.detail.map((e)=>{
                    let distributionUnitName = this.mapName(this.unitList,e.distributionUnit);
                    if(e.isPurchase == 1){
                        e.distributionInfo = '等于进价';
                    }else{
                        e.distributionInfo = `${e.distributionPrice} 元 / ${distributionUnitName}`;                        
                    }
                    if(e.isSuccess == 0){
                        e.num = '';
                        e.distributionInfo = '';
                    }else{
                        e.averageNum =  ele.applyAverage;
                        e.byPercentageNum = e.applyNum / ele.applySum *  ele.outputNum;
                        e.byPercentageNum = e.byPercentageNum.toFixed(3);
                    }
                    return e;
                });
                return ele;
            });
        },



        changeShowDetail(list,status,attr='showDetails'){
            list = list.map((ele)=>{
                ele[attr] = status;
                return ele;
            });
        },
        mapName(list,val,attr='id'){
            let g = 'name';
            if(!Array.isArray(list)) list = [];
            for(let ele of list){
                if(ele[attr] == val){
                    return ele[g];
                }
            }
        },
        calcSum(list,attr='applyNum'){
            if(!Array.isArray(list)) list = [];
            let sum = 0;
            for(let ele of list){
                sum += Number(ele[attr]);
            }
            return sum;
        },
        judgeIsSuccess(list=[],attr='isSuccess'){
            //判断总的匹配状态是成功还是失败
            if(!Array.isArray(list)) list = [];
            let flag = true;
            flag = list.every((ele)=>{
                return ele[attr] == 0;
            });
            flag = flag ? 0 : 1;
            return flag;
        },
        addItemIndex(list,fn){
            list = list.map((ele,index)=>{
                index += 1;
                ele.itemIndex = index > 9 ? index : '0'+index;
                ele.applicationTime *= 1000;
                let date = this.generatorDate(ele.applicationTime);
                ele.applicationTime = date.str;
                return ele;
            });
        },
        initBtn(){
            let style = {'line-height':'initial'};
            let query = this.$route.query;
			this.$store.commit('setPageTools',[
				{
					name: '返回',
                    type:5,
                    className:'default',
					fn:()=>{
						this.$router.go(-1);
					}
				},
				{
					name: '打印',
                    type:4,
                    className:'info',
					fn:()=>{
                        query.logId = this.logId;
						this.$router.push({path:'/admin/batchLog/batchLogPrint',query});
					}
				},
			]);
        },
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
        },
        toRaw(value,type){
            return Object.prototype.toString.call(value).slice(8,-1) == type;
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
				str:''          
			}
			let {year,month,day,hour,minute} = date;
			month += 1;
			hour = hour > 9 ? hour : '0'+hour;
			minute = minute > 9 ? minute : '0'+minute;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
		},
    },
    beforeRouteLeave(to,from,next){
        if(to.meta.comName == 'batchLogPrint'){
            let obj = {
                goods:this.goods,
                material:this.material,
                dispatchApplication:this.dispatchApplication,
                info:this.info
            };
            storage.session('batchLogPrint',obj);
        }
        next();
    },
    components: {
		tableCom:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
    },
    async mounted(){
		this.logId = this.$route.query.logId;
        this.logId = Number(this.logId);
        
        this.initBtn();

        let allocationTypes = await this.getHttp('DispatchrecordGetAllocationType');
        if(Array.isArray(allocationTypes)){
            this.allocationTypes = allocationTypes;
        }
        
        let res = await this.getHttp('MaterialGetUnitList');
        if(Array.isArray(res)){
            this.unitList = res;
        }
        await this.getDetail();
    },
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
#batch-log-dispatch-detail{
    @tw:1436px;             //表格的宽
    @cw:1200px;             //滚动条容器的宽
    .error{
        color:@r !important;
    }
    .blue-font{
        color:@b !important;        
    }
    .inline-middle{
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
    .flex-align{
        display: flex;
        align-items: center;
    }
    .fc(@color:#333,@size:16px){
        color:@color;
        font-size:@size;
    }
    li{
        list-style: none;
        word-break: break-all;
    }
    .arrow{
        .whb(80px,30px,none);
        .inline-middle;
    }
	.view-detail{
		color:@b;
        cursor: pointer;
	}
    .page-head{
        .split-div(80%);
    }
    .info{
        padding:30px 0 30px 40px;
        li{
            list-style: none;
            width:30%;
            display: inline-block;
            padding-bottom:15px;
            .lfc(#333,16px,16px);				
        }	
    }
    .main{
        //展开收起
        .extend{
            min-width:210px;          
            text-align:center;
        }
        .extend-common{
            .fc(@b);
            .inline-middle;    
            cursor: pointer;                        
        }
        .extend-left{
            &:after{
                content: '';
                height:20px;
                padding-left:10px;
                border-right:1px solid #ccc;
                .inline-middle;
            }
            margin-right:7px;
        }

        //表头
        .table-title{
            padding:8px 0;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border-bottom:1px solid #ccc;
            background-color:#f2f2f2;
        }
        .table-goods{
            width:@tw;
            .sum-li{
                text-align: center;
                width:12.14%;
                padding:10px 10px;
                .fc(#666,15px);
                &:last-child{
                    width:15%;
                }
            }
            .another-title{
                .flex-align;
                flex-grow: 1;
                flex-flow: row nowrap;
                li{
                    .sum-li;
                }         
            }
            .table-row{
                .row-detail{
                    .flex-align;
                    align-items: center;
                    min-height:70px; 
                    border-bottom: 2px solid #f7f7f7;               
                    .row-sum{
                        flex-grow:1;
                        .flex-align;
                        li{
                            .sum-li;
                        }
                    }
                }
            }
            .table-detail{
                padding:0 50px;
                border-bottom:2px solid #f7f7f7;
                .detail-li{
                    text-align: center;
                    flex-grow: 1;
                    flex-shrink: 0;
                    padding:10px 10px;
                    .fc(#999,16px);
                }
                .detail-title{
                    .flex-align;
                    li{
                        .detail-li;
                        width:14.28%;
                    }
                }
                .detail-body{
                    .detail-row{
                        .flex-align;
                        li{
                            .detail-li;
                            font-size:14px;
                            width:14.28%;
                        }
                    }
                }
            }

        }

        .table-material{
            width:@tw;
            .sum-li{
                text-align: center;
                width:12.14%;
                padding:10px 10px;
                .fc(#666,15px);
                &:last-child{
                    width:15%;
                }
            }
            .another-title{
                .flex-align;
                flex-grow: 1;
                flex-flow: row nowrap;
                li{
                    .sum-li;
                }         
            }
            .table-row{
                .row-detail{
                    .flex-align;
                    align-items: center;
                    min-height:70px; 
                    border-bottom: 2px solid #f7f7f7;               
                    .row-sum{
                        flex-grow:1;
                        .flex-align;
                        li{
                            .sum-li;
                        }
                    }
                }
            }
            .table-detail{
                padding:0 50px;
                border-bottom:2px solid #f7f7f7;
                .detail-li{
                    text-align: center;
                    flex-grow: 1;
                    flex-shrink: 0;
                    padding:10px 10px;
                    .fc(#999,16px);
                }
                .detail-title{
                    .flex-align;
                    li{
                        .detail-li;
                        width:12.5%;
                    }
                }
                .detail-body{
                    .detail-row{
                        .flex-align;
                        li{
                            .detail-li;
                            font-size:14px;
                            width:12.5%;
                        }
                    }
                }
            }
        }
        .content{
            margin-top:25px;
            max-width: 1438px;
            border:1px solid #ccc;
            overflow-x: auto;
        }
        .empty-div{
            height:80px;
            line-height: 80px;
            .fc(#999,20px);
            text-align: center;
        }
    }

}
</style>