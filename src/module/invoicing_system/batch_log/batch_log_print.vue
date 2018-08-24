<template>
    <div class="batch-log-print" id="print-webpage" style="padding-bottom:0px !important;">

        <div style="border:1px solid #0000ff;height:1036px" v-show="toggle" >
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
                    申请单列表<i class="circle"></i>共 <span class="num">{{dispatchApplication.length}}</span> 个条目
                </div>
                <div class="table-title" id="table-title" style="width:712px">
                    <li class="li-1">序号</li>
                    <li class="li-2">申请单号</li>
                    <li class="li-3">申请店铺/品牌</li>
                    <li class="li-4">申请人</li>
                    <li class="li-5">申请时间</li>
                </div>
                <div class="table-body">
                    <div class="table-row" :id="t.uniqueId" v-height="t.uniqueId" v-for="(t,ti) in dispatchApplication" :key="ti" >
                        <li  class="li-1">{{t.itemIndex}}</li>
                        <li  class="li-2">{{t.applicationCode}}</li>
                        <li class="li-3" >{{t.applicationShop}}</li>
                        <li  class="li-4">{{t.applicant}}</li>
                        <li class="li-5" >{{t.applicationTime}}</li>
                    </div>
                </div>
            </div>

            <div class="table-goods">
                <div class="table-head">
                    商品列表<i class="circle"></i>共 <span class="num">{{goods.length}}</span> 个条目(全部展开)
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
                    <div class="table-row" v-for="(t,ti) in goods" :key="ti" :id="t.uniqueId" >
                        <div class="row" v-height="t.uniqueId">
                            <li class="li-1" >{{t.name}}</li>
                            <li class="li-2" >{{t.selectUnitName}}</li>
                            <li class="li-2" >{{t.applySum}}</li>
                            <li class="li-2">{{t.applyAverage}}</li>
                            <li class="li-2">{{t.applyListNum}}</li>
                            <li class="li-2">{{t.invenNum}}</li>
                            <li class="li-2">{{t.outputNum}}</li>
                            <li class="li-1">{{t.allocationTypeName}}</li>
                        </div>

                        <div class="row-detail" v-if="t.showDetails">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                            </div>
                            <div class="detail-body">
                                <div class="detail-row" v-for="(j,ji) in t.detail" :key="ji" :id="j.uniqueId" v-height="j.uniqueId">
                                    <li class="r-li-2">{{j.intoWarehouseName}}</li>
                                    <li class="r-li-2">{{j.intoWarehouseOwner}}</li>
                                    <li class="r-li-1">{{j.applyNum}}</li>
                                    <li class="r-li-1">{{j.averageNum}}</li>
                                    <li class="r-li-1">{{j.byPercentageNum}}</li>
                                    <li class="r-li-1">{{j.num}}</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="table-material" >
                <div class="table-head">
                    物料列表<i class="circle"></i>共 <span class="num">{{material.length}}</span> 个条目(全部展开)
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
                    <div class="table-row" v-for="(t,ti) in material" :key="ti" :id="t.uniqueId" >
                        <div class="row" v-height="t.uniqueId">
                            <li class="li-1" >{{t.name}}</li>
                            <li class="li-1" >{{t.typeName}}</li>
                            <li class="li-1" >{{t.selectUnitName}}</li>
                            <li class="li-1" >{{t.applySum}}</li>
                            <li class="li-1">{{t.applyAverage}}</li>
                            <li class="li-1">{{t.applyListNum}}</li>
                            <li class="li-1">{{t.invenNum}}</li>
                            <li class="li-1">{{t.outputNum}}</li>
                            <li class="li-1">{{t.allocationTypeName}}</li>
                        </div>

                        <div class="row-detail" v-if="t.showDetails">
                            <div class="detail-title">
                                <li class="r-li-2">仓库名称</li>
                                <li class="r-li-2">仓库所属</li>
                                <li class="r-li-1">申请量</li>
                                <li class="r-li-1">平均量</li>
                                <li class="r-li-1">按比例量</li>
                                <li class="r-li-1">实际出货量</li>
                                <li class="r-li-1">分销价格</li>
                            </div>
                            <div class="detail-body" >
                                <div class="detail-row" v-for="(j,ji) in t.detail" :key="ji" :id="j.uniqueId" v-height="j.uniqueId">
                                    <li class="r-li-2">{{j.intoWarehouseName}}</li>
                                    <li class="r-li-2">{{j.intoWarehouseOwner}}</li>
                                    <li class="r-li-1">{{j.applyNum}}</li>
                                    <li class="r-li-1">{{j.averageNum}}</li>
                                    <li class="r-li-1">{{j.byPercentageNum}}</li>
                                    <li class="r-li-1">{{j.num}}</li>
                                    <li class="r-li-1">{{j.distributionUnit}}</li>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="!toggle">
            <div class="box"  v-for="(p,pi) in container" :key="pi" >
                <div class="page-head">
                    <div class="print-type">
                        <span class="fl type-name" v-if="pi == 0">批量调度</span>
                        <span class="fr page-num">第{{pi+1}}页,共{{container.length}}页</span>
                    </div>
                    <div class="info" v-if="pi == 0">
                        <li style="width:44%;">出货仓库:{{info.wName}}</li>
                        <li >操作人:{{info.createUName}}</li>
                        <li>操作时间:{{info.zh_createTime}}</li>
                    </div>
                </div>

                <div class="table-application" v-if="p.type =='application'">
                    <div class="table-head" v-if="p.showHead">
                        申请单列表<i class="circle"></i>共 <span class="num">{{dispatchApplication.length}}</span> 个条目
                    </div>
                    <div class="table-title" id="table-title" style="width:712px">
                        <li class="li-1">序号</li>
                        <li class="li-2">申请单号</li>
                        <li class="li-3">申请店铺/品牌</li>
                        <li class="li-4">申请人</li>
                        <li class="li-5">申请时间</li>
                    </div>
                    <div class="table-body">
                        <div class="table-row" :id="t.uniqueId"  v-for="(t,ti) in p.arr" :key="ti" >
                            <li  class="li-1">{{t.itemIndex}}</li>
                            <li  class="li-2">{{t.applicationCode}}</li>
                            <li class="li-3" >{{t.applicationShop}}</li>
                            <li  class="li-4">{{t.applicant}}</li>
                            <li class="li-5" >{{t.applicationTime}}</li>
                        </div>
                    </div>
                </div>

                <div class="table-goods" v-if="p.type =='goods'">
                    <div class="table-head" v-if="p.showHead">
                        商品列表<i class="circle"></i>共 <span class="num">{{goods.length}}</span> 个条目
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
                        <div class="table-row" v-for="(t,ti) in p.arr" :key="ti">
                            <div class="row" :class="{'error':t.isSuccess == 0}" v-height="t.uniqueId" :id="t.uniqueId">
                                <li class="li-1" >{{t.name}}</li>
                                <li class="li-2" >{{t.selectUnitName}}</li>
                                <li class="li-2" >{{t.applySum}}</li>
                                <li class="li-2">{{t.applyAverage}}</li>
                                <li class="li-2">{{t.applyListNum}}</li>
                                <li class="li-2">
                                    <template v-if="t.isSuccess == 0">
                                        <i class="el-icon-warning error"></i>
                                        <span class="error">匹配失败</span>
                                    </template>
                                    <template v-else>
                                        {{t.invenNum}}
                                    </template>                                    
                                </li>
                                <li class="li-2">{{t.outputNum}}</li>
                                <li class="li-1">{{t.allocationTypeName}}</li>
                            </div>

                            <div class="row-detail" v-if="t.showDetails">
                                <div class="detail-title">
                                    <li class="r-li-2">仓库名称</li>
                                    <li class="r-li-2">仓库所属</li>
                                    <li class="r-li-1">申请量</li>
                                    <li class="r-li-1">平均量</li>
                                    <li class="r-li-1">按比例量</li>
                                    <li class="r-li-1">实际出货量</li>
                                </div>
                                <div class="detail-body">
                                    <div class="detail-row" :class="{'error':j.isSuccess == 0}" v-for="(j,ji) in t.detail" :key="ji" :id="j.uniqueId" v-height="j.uniqueId">
                                        <li class="r-li-2">{{j.intoWarehouseName}}</li>
                                        <li class="r-li-2">{{j.intoWarehouseOwner}}</li>
                                        <li class="r-li-1">{{j.applyNum}}</li>
                                        <li class="r-li-1">
                                            <template v-if="j.isSuccess == 0">
                                                <i class="el-icon-warning error"></i>
                                                <span class="error">匹配失败</span>
                                            </template>
                                            <template v-else>
                                                {{j.averageNum}}
                                            </template>
                                        </li>
                                        <li class="r-li-1">{{j.byPercentageNum}}</li>
                                        <li class="r-li-1">{{j.num}}</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-material" v-if="p.type =='material'">
                    <div class="table-head" v-if="p.showHead">
                        物料列表<i class="circle"></i>共 <span class="num">{{material.length}}</span> 个条目
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
                        <div class="table-row" v-for="(t,ti) in p.arr" :key="ti">
                            <div class="row" :class="{'error':t.isSuccess == 0}" v-height="t.uniqueId" :id="t.uniqueId">
                                <li class="li-1" >{{t.name}}</li>
                                <li class="li-1" >{{t.typeName}}</li>
                                <li class="li-1" >{{t.selectUnitName}}</li>
                                <li class="li-1" >{{t.applySum}}</li>
                                <li class="li-1">{{t.applyAverage}}</li>
                                <li class="li-1">{{t.applyListNum}}</li>
                                <li class="li-1">
                                    <template v-if="t.isSuccess == 0">
                                        <i class="el-icon-warning error"></i>
                                        <span class="error">匹配失败</span>
                                    </template>
                                    <template v-else>
                                        {{t.invenNum}}
                                    </template>                                    
                                </li>
                                <li class="li-1">{{t.outputNum}}</li>
                                <li class="li-1">{{t.allocationTypeName}}</li>
                            </div>

                            <div class="row-detail" v-if="t.showDetails">
                                <div class="detail-title">
                                    <li class="r-li-2">仓库名称</li>
                                    <li class="r-li-2">仓库所属</li>
                                    <li class="r-li-1">申请量</li>
                                    <li class="r-li-1">平均量</li>
                                    <li class="r-li-1">按比例量</li>
                                    <li class="r-li-1">实际出货量</li>
                                    <li class="r-li-1">分销价格</li>
                                </div>
                                <div class="detail-body" >
                                    <div class="detail-row" :class="{'error':j.isSuccess == 0}" v-for="(j,ji) in t.detail" :key="ji" :id="j.uniqueId" v-height="j.uniqueId">
                                        <li class="r-li-2">{{j.intoWarehouseName}}</li>
                                        <li class="r-li-2">{{j.intoWarehouseOwner}}</li>
                                        <li class="r-li-1">{{j.applyNum}}</li>
                                        <li class="r-li-1">
                                            <template v-if="j.isSuccess == 0">
                                                <i class="el-icon-warning error"></i>
                                                <span class="error">匹配失败</span>
                                            </template>
                                            <template v-else>
                                                {{j.averageNum}}
                                            </template>
                                        </li>
                                        <li class="r-li-1">{{j.byPercentageNum}}</li>
                                        <li class="r-li-1">{{j.num}}</li>
                                        <li class="r-li-1">{{j.distributionInfo}}</li>                            
                                    </div>
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
container:[
    第一页:{
        info:当前页的一些信息,如第1页,第2页,
        type:'goods',
        arr:[
            {
                name:'申请单一',
                uniqueId:1
                showDetails:true
            },
            {
                name:'申请单二',
                uniqueId:2,
                showDetails:true
            }   
        ],                                                                                        
    }
]



*/
import storage from 'src/verdor/storage';

let listHeight = {};            //存储表格每一行的高
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
                type:100,                       //第一页抬头的高
                pager:60,                       //第二页开始抬头的高        
                dTitle:38,                      //详情表头的高
                height:1036                     //每一张纸的高    
            },
            toggle:true,                        //展示原始表格,展示处理之后的表格
            container:[],                       //总页数                
        };
    },
    methods: {
        markList(){
            //标记列表中的元素
            let obj = this.addItemIndex(this.dispatchApplication,0);
            this.dispatchApplication = [...obj.list];

            obj = this.addItemIndex(this.goods,obj.count);
            this.goods = [...obj.list];

            obj = this.addItemIndex(this.material,obj.count);
            this.material = [...obj.list];

        },
        addItemIndex(list,count){
            //给每一个元素添加唯一标识
            for(let ele of list){
                count += 1;
                ele.uniqueId = count;
                if(Array.isArray(ele.detail)){
                    for(let e of ele.detail){
                        count += 1;
                        e.uniqueId = count;
                    }
                }
            }
            return {
                count,
                list
            };
        },


        splictList(list=[],type='application'){
            //分割申请单
            let firstPage = this.pageInfo.height - this.pageInfo.type - this.pageInfo.head - this.pageInfo.title;   //第一页可利用的空间
            let secondPage = this.pageInfo.height - this.pageInfo.pager - this.pageInfo.title;                      //第二页可利用的空间

            // console.log(firstPage,secondPage);
            
            let container = [];
            let count = 0;      //累计高度
            let page = {
                arr:[],
                type,
            };

            for(let i = 0; i < list.length;i++){
                let ele = list[i];
                let height = listHeight[ele.uniqueId+''];        

                if(count + height >= firstPage){
                    container.push(page);

                    page = {
                        arr:[],
                        type
                    };
                    count = 0;
                    firstPage = secondPage;
                    page.arr.push(ele);
                    count += height;
                }else{
                    page.arr.push(ele);
                    count += height;

                }
                if(i == list.length -1 && page.arr.length >0){
                    container.push(page);
                }
            }
            return [...container];
        },
        splitStack(list=[],type){
            //切割商品,物料
            let firstPage = this.pageInfo.height - this.pageInfo.pager - this.pageInfo.head - this.pageInfo.title;       //第一页可利用的空间
            let secondPage = this.pageInfo.height - this.pageInfo.pager - this.pageInfo.title;                           //第二页可用的空间

            let container = [];
            let count = 0;                          //累计高度
            let part = {detail:[]};
            let page = {
                arr:[
                    /*
                        {
                            name:'总单1',
                            uniqueId:'1',
                            showDetails:true,
                            detail:[
                                {
                                    name:'详情单1',
                                    uniqueId:'3'
                                },
                                {
                                    name:'详情单1',
                                    uniqueId:'3'
                                },
                            ]
                        },
                    */
                ],
                type,
            };

            for(let i = 0;i < list.length ;i++){
                let ele = list[i];
                let pHeight = listHeight[ele.uniqueId+''];

                let firstChild = ele.detail[0];
                let firstChildHeight = listHeight[firstChild.uniqueId+''];

                part = {...ele};
                part.detail = []; 

                if(ele.showDetails){
                    if(count + pHeight + this.pageInfo.dTitle + firstChildHeight >= firstPage){
                        container.push(page);
                        page = {
                            arr:[],
                            type,
                        };
                        count = 0;
                        firstPage = secondPage;
                    }
                    count += pHeight + this.pageInfo.dTitle; 
                    
                    for(let j = 0 ;j< ele.detail.length;j++){
                        let childEle = ele.detail[j];
                        let cHeight = listHeight[childEle.uniqueId+''];

                        if(count + cHeight > firstPage){
                            page.arr.push(part);
                            container.push(page);

                            page = {
                                arr:[],
                                type,
                            };
                            count = 0;
                            firstPage = secondPage;

                            count += pHeight + this.pageInfo.dTitle + cHeight;
                            part = {...ele};
                            part.detail = [];      
                            part.detail.push(childEle);
                        }else{
                            part.detail.push(childEle);
                            count += cHeight;
                        }
                    }
                    page.arr.push(part);
                }else{
                    if(count + pHeight >= firstPage){
                        container.push(page);
                        page = {
                            arr:[],
                            type,
                        };
                        count = 0;
                        firstPage = secondPage;
                    }
                    page.arr.push(part);
                    count += pHeight;
                }

                if(i == list.length -1 && page.arr.length > 0){
                    container.push(page);
                }
            }

            return [...container];
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
            //获取列表
            let res = storage.session('batchLogPrint');
            if(this.toRaw(res,'Object')){
                this.goods = res.goods;
                this.material = res.material;
                this.dispatchApplication = res.dispatchApplication;
                this.info = res.info;
            }
        },
        toRaw(value,type){
            return Object.prototype.toString.call(value).slice(8,-1) == type;
        },
    },
    created(){
        this.getData();
        this.markList();
    },
    mounted(){
        let temp = this.splictList(this.dispatchApplication);
        if(temp[0]){
            temp[0].showHead = true;
        }
        this.container.push(...temp);

        temp = this.splitStack(this.goods,'goods');
        if(temp[0]){
            temp[0].showHead = true;
        }
        this.container.push(...temp);

        temp = this.splitStack(this.material,'material');
        if(temp[0]){
            temp[0].showHead = true;
        }
        this.container.push(...temp);
        
        this.toggle = false;
    },
    beforeRouteLeave(to,from,next){
        storage.session('batchLogPrint',null);
        next();
    },
    directives:{
        'height':{
            inserted: function (el, binding, vnode) {
                let id = binding.value+'';
                listHeight[id] = el.offsetHeight;
            }            
        }
    }
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
.error{
    color:@r !important;
}
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
    height:38px;
    line-height: 38px;
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
    padding-bottom: 0 !important;

    width:714px;
    .box{
        .whb(714px,1036px,1px solid #000);
        margin-bottom:30px;
        &:last-child{
            margin-bottom:0; 
        }
    }
    .page-head{
        padding:0 20px;
        .print-type{
            font-size:24px;
            line-height: 60px;
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
        border-bottom:@tb-border;
        
        .lfc(#333,38px,16px);
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
        border-bottom:@tb-border;
    }  
    .table-application{
        border-top:@tb-border;
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
            border-bottom:@tb-border;
        }
        .table-body{
            .table-row{
                .flex-align;
                li{
                    .row-li;
                    padding:10px 5px;
                }
            }
        }
    }
    
    .table-goods{
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
                        padding:10px 5px;
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
                            padding:10px px;
                        } 
                    }
                }
            }
        }
        
    }

    .table-material{
        border:@tb-border;
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
                        padding:10px 5px;
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
                            padding:10px 5px;
                        } 
                    }
                }
            }
        }                   
    }

    .table-goods,.table-material{
        border:0;
        border-top:@tb-border;
        .table-row{
            border-bottom:1px dashed #000;
            &:last-child{
                border-bottom:none;
            }
            .error>li{
                .error;
            }
        }
        .error>li{
            .error;
        }
    }

    #print-webpage-btn{
        position: absolute;
        right: 20px;
        top:12px;
    }
}
</style>