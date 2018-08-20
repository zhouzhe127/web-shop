<template>
    <div class="batch-log-print" id="print-webpage">
        <div style="border:1px solid #ff0000;" v-if="toggle">
            <div class="page-head">
                <div class="print-type">
                    <span class="fl type-name">批量调度</span>
                    <span class="fr page-num">第1页,共1页</span>
                </div>
                <div class="info">
                    <li style="width:44%;">出货仓库:{{info.wName}}</li>
                    <li >操作人:{{info.createUName}}</li>
                    <li>操作时间:{{info.zh_createTime}}</li>
                </div>
            </div>

            <div class="table-application">
                <div class="table-head">
                    申请单列表<i class="circle"></i>共 <span class="num">70</span> 个条目
                </div>
                <div class="table-title" id="table-title" style="width:712px">
                    <li class="li-1">序号</li>
                    <li class="li-2">申请单号</li>
                    <li class="li-3">申请店铺/品牌</li>
                    <li class="li-4">申请人</li>
                    <li class="li-5">申请时间</li>
                </div>
                <div class="table-body">
                    <div class="table-row" v-for="i in 4" :key="i">
                        <li contenteditable="true" class="li-1">序号</li>
                        <li contenteditable="true" class="li-2">申请单号</li>
                        <li class="li-3" contenteditable="true">申请店铺/品牌</li>
                        <li contenteditable="true" class="li-4">申请人</li>
                        <li class="li-5" contenteditable="true">申请时间</li>
                    </div>
                </div>
            </div>

            <div class="table-goods">
                <div class="table-head">
                    商品列表<i class="circle"></i>共 <span class="num">70</span> 个条目(全部展开)
                </div>
                <div class="table-title">
                    <li class="li-1">商品名称</li>
                    <li class="li-2">申请单位</li>
                    <li class="li-2">申请总量</li>
                    <li class="li-2">平均申请量</li>
                    <li class="li-2">申请单数</li>
                    <li class="li-2">库存总量</li>
                    <li class="li-2">出货总量</li>
                    <li class="li-1">配货方式</li>
                </div>
                <div class="table-body">
                    <div class="table-row">
                        <div class="row">
                            <li class="li-1" contenteditable="true">商品名称</li>
                            <li class="li-2" contenteditable="true">申请单位</li>
                            <li class="li-2" contenteditable="true">申请总量</li>
                            <li class="li-2">平均申请量</li>
                            <li class="li-2">申请单数</li>
                            <li class="li-2">库存总量</li>
                            <li class="li-2">出货总量</li>
                            <li class="li-1">配货方式</li>
                        </div>

                        <div class="row-detail">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                            </div>
                            <div class="detail-body">
                                <div class="detail-row" v-for="i in 4" :key="i">
                                    <li class="r-li-2">杭州二胆码</li>
                                    <li class="r-li-2">拉馋们</li>
                                    <li class="r-li-1">8000</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-material" >
                <div class="table-head">
                    物料列表<i class="circle"></i>共 <span class="num">70</span> 个条目(全部展开)
                </div>

                <div class="table-title">
                    <li >物料名称</li>
                    <li >物料类型</li>
                    <li >申请单位</li>
                    <li >申请总量</li>
                    <li class="li-1">平均申请量</li>
                    <li >申请单数</li>
                    <li >库存总量</li>
                    <li >出货总量</li>
                    <li >配货方式</li>
                </div>

                <div class="table-body">
                    <div class="table-row" v-for="i in 10" :key="i">
                        <div class="row">
                            <li class="li-1" contenteditable="true">物料名称</li>
                            <li class="li-1" contenteditable="true">物料类型</li>
                            <li class="li-1" contenteditable="true">申请单位</li>
                            <li class="li-1" contenteditable="true">申请总量</li>
                            <li class="li-1">平均申请量</li>
                            <li class="li-1">申请单数</li>
                            <li class="li-1">库存总量</li>
                            <li class="li-1">出货总量</li>
                            <li class="li-1">配货方式</li>
                        </div>

                        <div class="row-detail">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                                <li class="r-li-1">分销价格</li>
                            </div>
                            <div class="detail-body">
                                <div class="detail-row" v-for="i in 5" :key="i">
                                    <li class="r-li-2">杭州二胆码</li>
                                    <li class="r-li-2">拉馋们</li>
                                    <li class="r-li-1">8000</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">分销价格</li>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="border:1px solid #ff0000;" v-if="!toggle">
            <div class="page-head">
                <div class="print-type">
                    <span class="fl type-name">批量调度</span>
                    <span class="fr page-num">第1页,共1页</span>
                </div>
                <div class="info">
                    <li style="width:44%;">出货仓库:{{info.wName}}</li>
                    <li >操作人:{{info.createUName}}</li>
                    <li>操作时间:{{info.zh_createTime}}</li>
                </div>
            </div>

            <div class="table-application">
                <div class="table-head">
                    申请单列表<i class="circle"></i>共 <span class="num">70</span> 个条目
                </div>
                <div class="table-title" id="table-title" style="width:712px">
                    <li class="li-1">序号</li>
                    <li class="li-2">申请单号</li>
                    <li class="li-3">申请店铺/品牌</li>
                    <li class="li-4">申请人</li>
                    <li class="li-5">申请时间</li>
                </div>
                <div class="table-body">
                    <div class="table-row" v-for="i in 4" :key="i">
                        <li contenteditable="true" class="li-1">序号</li>
                        <li contenteditable="true" class="li-2">申请单号</li>
                        <li class="li-3" contenteditable="true">申请店铺/品牌</li>
                        <li contenteditable="true" class="li-4">申请人</li>
                        <li class="li-5" contenteditable="true">申请时间</li>
                    </div>
                </div>
            </div>

            <div class="table-goods">
                <div class="table-head">
                    商品列表<i class="circle"></i>共 <span class="num">70</span> 个条目(全部展开)
                </div>
                <div class="table-title">
                    <li class="li-1">商品名称</li>
                    <li class="li-2">申请单位</li>
                    <li class="li-2">申请总量</li>
                    <li class="li-2">平均申请量</li>
                    <li class="li-2">申请单数</li>
                    <li class="li-2">库存总量</li>
                    <li class="li-2">出货总量</li>
                    <li class="li-1">配货方式</li>
                </div>
                <div class="table-body">
                    <div class="table-row">
                        <div class="row">
                            <li class="li-1" contenteditable="true">商品名称</li>
                            <li class="li-2" contenteditable="true">申请单位</li>
                            <li class="li-2" contenteditable="true">申请总量</li>
                            <li class="li-2">平均申请量</li>
                            <li class="li-2">申请单数</li>
                            <li class="li-2">库存总量</li>
                            <li class="li-2">出货总量</li>
                            <li class="li-1">配货方式</li>
                        </div>

                        <div class="row-detail">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                            </div>
                            <div class="detail-body">
                                <div class="detail-row" v-for="i in 4" :key="i">
                                    <li class="r-li-2">杭州二胆码</li>
                                    <li class="r-li-2">拉馋们</li>
                                    <li class="r-li-1">8000</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-material" >
                <div class="table-head">
                    物料列表<i class="circle"></i>共 <span class="num">70</span> 个条目(全部展开)
                </div>

                <div class="table-title">
                    <li >物料名称</li>
                    <li >物料类型</li>
                    <li >申请单位</li>
                    <li >申请总量</li>
                    <li class="li-1">平均申请量</li>
                    <li >申请单数</li>
                    <li >库存总量</li>
                    <li >出货总量</li>
                    <li >配货方式</li>
                </div>

                <div class="table-body">
                    <div class="table-row" v-for="i in 10" :key="i">
                        <div class="row">
                            <li class="li-1" contenteditable="true">物料名称</li>
                            <li class="li-1" contenteditable="true">物料类型</li>
                            <li class="li-1" contenteditable="true">申请单位</li>
                            <li class="li-1" contenteditable="true">申请总量</li>
                            <li class="li-1">平均申请量</li>
                            <li class="li-1">申请单数</li>
                            <li class="li-1">库存总量</li>
                            <li class="li-1">出货总量</li>
                            <li class="li-1">配货方式</li>
                        </div>

                        <div class="row-detail">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                                <li class="r-li-1">分销价格</li>
                            </div>
                            <div class="detail-body">
                                <div class="detail-row" v-for="i in 5" :key="i">
                                    <li class="r-li-2">杭州二胆码</li>
                                    <li class="r-li-2">拉馋们</li>
                                    <li class="r-li-1">8000</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">8888</li>
                                    <li class="r-li-1">分销价格</li>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="print-webpage-btn"  >
            <el-button type="primary" @click="printPage">打印</el-button>        
            <el-button type="info" @click="linkPage">返回</el-button>        
        </div>
    </div>
</template>
<script>
/*

container:[
    第一页:{
        info:当前页的一些信息,如第1页,第2页,
        application:[
            {
                name:'申请单一',
                id:1,
                height:20px
            }
        ],                                             
        goods:[
            {
                name:'茄子申请总览',
                id:1,
                details:[
                    {
                        name:'茄子申请详情',
                        id:21,
                        height:20px
                    }
                ]
            }
        ],                                             
        material:[
            {
                name:'土豆申请总览',
                id:1,
                details:[
                    {
                        name:'土豆申请详情',
                        id:21,
                        height:20px
                    }
                ]
            }
        ],                                             
    }
]



*/
import storage from 'src/verdor/storage';

export default {
    data () {
        return {
            goods:[],
            material:[],
            dispatchApplication:[],
            info:{},
            pageInfo:{
                head:40,                        //表头    
                title:40,                       //标题    
                bottom:30,                      //表格之间的垂直距离 30
                type:120,                       //第一页抬头的高
                pager:80,                       //第二页开始抬头的高        
                dTitle:38                       //详情表头的高
            },
            toggle:true,                        //展示原始表格,展示处理之后的表格
        };
    },
    methods: {
        addItemIndex(item){
            //给每一个元素添加唯一标识

        },
        printPage(){
            let oApp = document.querySelector('#app');
            let oProcess = document.querySelector('#print-webpage');
            let oParent = oProcess.parentNode;
            let oBody = document.querySelector('body');
            let oBtn = oProcess.querySelector('#print-webpage-btn');
            oApp.style['display'] = 'none';
            oBtn.style['display'] = 'none';
            oBody.appendChild(oProcess);

            let promise = new Promise((resolve,reject)=>{
                resolve(window.print());
            });
            promise.then((res)=>{
                oApp.style['display'] = 'block';
                oBtn.style['display'] = 'block';
                oParent.appendChild(oProcess); 
                console.log('打印结束:'+res);
            });

        },
        linkPage(){
            this.$router.go(-1);
        },
        getData(){
            let res = storage.session('batchLogPrint');
            if(this.toRaw(res,'Object')){
                this.goods = res.goods;
                this.material = res.material;
                this.dispatchApplication = res.dispatchApplication;
                this.info = res.info;
            }
            console.log(res);
        },
        toRaw(value,type){
            return Object.prototype.toString.call(value).slice(8,-1) == type;
        },
    },
    components: {

    },
    created(){
        this.getData();
    },
    mounted(){
        var oDiv = document.querySelector('#print-webpage-btn');
        console.log(oDiv.offsetHeight);
    },
    beforeRouteLeave(to,from,next){
        storage.session('batchLogPrint',null);
        next();
    },
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');

.batch-log-print * {
    font-family:Arial,Verdana,Sans-serif;
}
.inline-middle{
    display: inline-block;
    vertical-align: middle;
}
.flex-align{
    display: flex;
    align-items: center;
}
li{
    list-style: none;
    word-break: break-all;
}
.title{
    font-size:16px;
    height:40px;
    line-height: 40px;
    text-align: center;
}
.row-li{
    text-align: center;
    padding:10px 0;
    font-size: 14px;
    color:#666;
}

@tb-border:1px solid #000;

.batch-log-print{
    .whb(714px,1036px,none);

    .page-head{
        padding:0 20px;
        .print-type{
            font-size:24px;
            line-height: 80px;
            .page-num{
                font-size:16px;
            }
            .type-name{
                font-size: 24px;
            }
            &:after{
                .clear;
            }
        }
        .info{
            overflow: hidden;
            li{
                list-style: none;
                font-size:14px;
                float: left;
                .whb(28%,40px,none);
                word-break: break-all;
            }
        }
    }

    .table-head{
        height:40px;
        padding-left:20px;
        .lfc(#333,40px,16px);
        .circle{
            .inline-middle;
            .whb(5px,5px,none);
            background-color: #666;
            border-radius: 50%;
            margin: 0 5px;
        }
        .num{
            color:@r;
            font-size:16px;
        }
    }
    .table-title{
        li{
            .title;
        }
        display: flex;
        flex-flow:row nowrap;
        border-top:@tb-border;
        border-bottom:@tb-border;
    }  
    .table-goods,.table-material{
        .table-row{
            border-bottom:1px dashed #000;
            &:last-child{
                border-bottom:none;
            }
    
        }
    }

    .table-application{
        border:@tb-border;
        .li-1{
            width:13.725%;
        }
        .li-2{
            width:17.64%;
        }
        .li-3{
            width: 30.8%;
        }
        .li-4{
            width: 18.9%;
        }
        .li-5{
            width: 18.9%;
        }
        .table-title{
            li{
                .title;
            }
            display: flex;
            flex-flow:row nowrap;
            border-top:@tb-border;
            border-bottom:@tb-border;
        }
        .table-body{
            .table-row{
                .flex-align;
                li{
                    .row-li;
                }
            }
        }
    }
    
    .table-goods{
        margin-top:30px;
        margin-bottom:30px;
        border:@tb-border;
        .li-1{
            width:14%;
        }
        .li-2{
            width:12%;            
        }
        .table-body{
            .table-row{
                .row{
                    .flex-align;
                    &>li{
                        .row-li;
                        color:#000;
                        padding:15px 0;
                    }  
                }
                .row-detail{
                    padding:0 30px;
                    .r-li-2{
                        width:20%;
                    }
                    .r-li-1{
                        width:15%;
                    }
                    .detail-title{
                        .flex-align;
                        &>li{
                            .row-li;
                            color:#000;
                            padding:12px 0;
                        }                          
                    }
                    .detail-row{
                        .flex-align;
                        &>li{
                            .row-li;
                            padding:10px 0;
                        } 
                    }
                }
            }
        }
        
    }

    .table-material{
        border:@tb-border;
        margin-top:30px;
        margin-bottom:30px;
        li{
            width:11.111%;
        }
        .li-1{
            width:12%;
        }
        .table-body{
            .table-row{
                .row{
                    .flex-align;
                    &>li{
                        .row-li;
                        color:#000;
                        padding:15px 0;
                    }  
                }
                .row-detail{
                    padding:0 30px;
                    .r-li-2{
                        width:20%;
                    }
                    .r-li-1{
                        width:15%;
                    }
                    .detail-title{
                        .flex-align;
                        &>li{
                            .row-li;
                            color:#000;
                            padding:12px 0;
                        }                          
                    }
                    .detail-row{
                        .flex-align;
                        &>li{
                            .row-li;
                            padding:10px 0;
                        } 
                    }
                }
            }
        }                   
    }

    #print-webpage-btn{
        position: absolute;
        right: 20px;
        top:12px;
    }
}
</style>