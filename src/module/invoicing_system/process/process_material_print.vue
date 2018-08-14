<template>
    <div id="processMaterial" class="process-material">
        <div class="table" :style="{'margin-bottom':index == list.length-1 ? '0' :'50px'}"  v-for="(item,index) in list" :key="index">

            <div class="page-head" >
                <div class="pipe-type">
                    <span class="type" v-if="index == 0">加工单</span>
                    <span class="page-num">第{{index+1}}页,共{{list.length}}页</span>
                </div>
                <div class="pipe-info" v-if="index == 0">
                    <span>产出物料:{{page.kindNum}}种</span>
                    <span>操作人:{{userName}}</span>
                </div>
            </div>

            <div class="table-title"  >
                <li v-for="(title,index) in titles" :key="index" :style="title.style">{{title.name}}</li>
            </div>

            <div class="center-line" :style="calcSplitLineStyle(index)"></div>

            <div class="table-body" v-for="(ele,eIndex) in item.arr" :key="eIndex">
                <div class="body-left" :style="calcHeight(ele)">
                    <div class="sum">
                        <li>
                            <span class="word" >{{ele.itemIndex}}</span>
                        </li>

                        <li>
                            <span class="word" >{{ele.material}}</span>
                        </li>

                        <li>
                            <span class="word">
                                <span class="input-line" ></span>
                                <span class="unit-name">{{ele.selUnitName}}</span>
                            </span>
                        </li>
                    </div>
                </div>

                <div class="body-right fr">
                    <div class="item" v-for="(e,i) in ele.nums" :key="i">
                        <li>
                            <span class="word" >
                                {{e.material}}
                            </span>
                        </li>

                        <li>
                            <span class="word">
                                <span class="input-line" ></span>
                                <span class="unit-name">{{e.selUnitName}}</span>
                            </span>
                        </li>
                    </div>
                </div>

            </div>
        </div>

        <div id="process-print-btn"  >
            <el-button type="primary" @click="printPage">打印</el-button>        
            <el-button type="info" @click="linkPage">返回</el-button>        
        </div>
    </div>
</template>
<script>
// import testObj from "src/module/test/data.json";
// let testObj = {array:[]};
import storage from 'src/verdor/storage';

export default {
    data () {
        return {
            titles:[
                {name:'序号',style:{width:'20%'}},
                {name:'产出物料',style:{width:'20%'}},
                {name:'产出数量',style:{width:'20%'}},
                {name:'原料物料',style:{width:'20%'}},
                {name:'原料数量',style:{width:'20%'}},
            ],
            pageInfo:{
                height:1036,                        //纸张的高                                  
                width:714,                          //纸张的宽
                tableHead:40,                       //表格头部的高    
                pageType:70,                        //加工单的高
                userInfo:50,                         //页码的高
            },
            height:70,                              //列表中每个元素的高          

            page:{
                count:0,                            //第一页展示的数量
                MAXNUM:0,                           //每页展示的最大数量
                total:0,                            //页码数
                kindNum:0,                          //总类数    
            },

            userName:'',
            list:[],                                //列表
            showBtn:true,                           //是否展示按钮

        };
    },
    methods: {
 /*
         [
            {
                page:1,
                arr:[
                    {nums:[],info:'西瓜'},            和为13
                    {nums:[],info:'茄子'},
                ]
            },
            {
                page:2,
                arr:[
                    {nums:[],info:'西瓜'},            和为13
                    {nums:[],info:'茄子'},
                ]
            },

        ]
----------------------------------------------------
        [
            {info:'西瓜',list:[],id:1},
            {info:'茄子',list:[],id:2},
            {info:'鸡蛋',list:[],id:3}
        ]

 */       
        organize(list = []){
            let {count,MAXNUM} = this.page;
            let first = count;
            let container = [],                 //总页数
                part = [],                      //装载                
                flag = false,
                page = {p:0,arr:[]};

            for(let i = 0;i<list.length;i++){
                let items = list[i].list;
                for(let ele of items){
                    part.push(ele);

                    if(part.length == count){
                        page.arr.push({
                            info:list[i].id,
                            itemIndex:list[i].itemIndex,
                            material:list[i].material,
                            produceNum:list[i].produceNum,
                            selUnitName:list[i].selUnitName,
                            nums:[...part]
                        });

                        container.push(page);

                        //下一页 初始化
                        page = {p:i,arr:[]};                                            
                        part = [];
                        count = MAXNUM;
                        flag = true;
                    }
                }

                if(part.length > 0){
                    page.arr.push({
                        info:list[i].id,
                        itemIndex:list[i].itemIndex,
                        material:list[i].material,
                        rawNum:list[i].rawNum,
                        selUnitName:list[i].selUnitName,
                        nums:[...part]
                    });

                    let len2 = 0;
                    for(let e of page.arr){
                        len2 += e.nums.length;
                    }

                    if(flag){
                        count = MAXNUM;
                    }else{
                        count = first;
                    }
                    count = count - len2;

                    if(list.length-1 == i){
                        container.push(page);
                    }
                }
                part = [];                    
            }
            return container;
        },
        calcPage(){
            let count = 0,
                MAXNUM = 0;

            MAXNUM = this.pageInfo.height - this.pageInfo.pageType - this.pageInfo.tableHead;
            count = MAXNUM - this.pageInfo.userInfo;
            count = Math.floor(count / this.height);
            MAXNUM = Math.floor(MAXNUM / this.height);
            this.page.count = count;
            this.page.MAXNUM = MAXNUM;
        },
        calcHeight(ele){
            let h = 0,
                len = ele.nums.length;
            if(len > 1){
                h = len/2*this.height-(this.height/2);
            }
            return {'padding-top':h+'px'};
        },
        calcSplitLineStyle(pageIndex){
            let h1 = this.pageInfo.height - this.pageInfo.pageType - this.pageInfo.tableHead;
            h1 -= 2;
            let h2 = h1 - this.pageInfo.userInfo;
            if(pageIndex == 0){
                return {'height':h2+'px'};
            }else{
                return {'height':h1+'px'};                
            }
        },

        initData(){
            let userDate = storage.session('userShop').user;
            let data = storage.session('processBom');
            this.userName = userDate.name;   
            if(Array.isArray(data)){
                this.list = data;
                this.page.kindNum = this.list.length;
                this.list = this.list.map((ele,index)=>{
                    let i = index + 1;
                    ele.itemIndex = i > 9 ? i : '0'+i;
                    return ele;
                });
            }
            console.log(this.list);
        },
        printPage(){
            let oApp = document.querySelector('#app');
            let oProcess = document.querySelector('#processMaterial');
            let oParent = oProcess.parentNode;
            let oBody = document.querySelector('body');
            let oBtn = document.querySelector('#process-print-btn');
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
            this.$router.push({path:'/admin/processMaterial',query:this.$route.query});
        },
    },
    mounted(){
        this.initData();

        // console.log(this.list);
        // let list = testObj.array;
        // let count = 0;
        // for(let ele of list){
        //     count += ele.list.length;
        // }

        // console.log(count);
        // this.list = list;
        // console.log(list);


        this.calcPage();
        this.calcSplitLineStyle();
        this.list = this.organize(this.list);
    },
};
</script>
<style lang='less' scoped>
    @import url('../warehouse_manage/z_less.less');
    .inline-middle{
        display: inline-block;
        vertical-align: middle;
    }
    .process-material{
        width:714px;
        padding-bottom: 0 !important;
    }
    .process-material *{
        font-family:Arial,Verdana,Sans-serif;
    }
    .page-head{
        //头部信息
        height:auto;
        padding:0 40px;
        .pipe-type{
            &:after{
                .clear;
            }
            .type{
                font-size:30px;
                font-weight: 600;
                vertical-align: middle;
            }
            .page-num{
                float: right;
                vertical-align: middle;    
                font-size:16px;                            
            }
            line-height: 69px;
        }
        .pipe-info{
            span{
                vertical-align: middle;
                display: inline-block;
                width: 48%;
                font-size:16px;    
                line-height: 50px;                                        
            }
        }

    }

    .table{
        .whb(714px,1036px,1px solid #000);
        position: relative;
        margin-bottom: 50px;
        .word{
            position: absolute;
            top:50%;
            margin:auto;
            transform: translate(0,-50%);
            padding:0 10px;
            word-break: break-all;
            display: inline-block;
            width: 100%;
            text-align: center;
        }  
        .center-line{
            position: absolute;
            border-right:1px dashed #000;
            height:600px;
            right:284px;
        }   
        .input-line{
            .inline-middle;
            .whb(80px,40px,none);
            margin-right:10px;
            border-bottom:1px solid #000;
        }   
        .unit-name{
            .inline-middle;
            line-height: 40px;
            .whb(auto,40px,none);
        }

        .table-thead{
            height:45px;
            padding-left:20px;
            .lfc(#333,45px,16px);
            .circle{
                .inline-middle;
                .whb(5px,5px,none);
                margin:0 7px;
                margin-top:-2px;
                background-color: #333;
                border-radius:50%;
            }
            .list-num{
                color:@r;
                font-size:16px;
            }
            .reset{
                color:@b;
                font-size:16px;
                text-decoration: underline @b;
                margin-left:5px;
                cursor: pointer;
            }
        }

        .table-title{
            border-top:1px solid #000;
            border-bottom:1px solid #000;
            li{
                list-style: none;
                float: left;
                text-align: center;
                vertical-align: middle;
                .lfc(#333,40px,16px);
                font-weight: 600;
            }
            &:after{
                .clear;
            }
        }

        .table-body{
            border-bottom:1px solid #000;
            &:last-child{
                border-bottom:none;                    
            }
            &:after{
                .clear;
            }
            .body-left{
                width:60%;
                display: inline-block;
                height:100%;
                .sum{
                    line-height: initial;
                    width: 100%;
                    display: inline-block;
                    &:after{
                        .clear;
                    }

                    &>li{
                        list-style: none;
                        .whb(33.33%,68px);
                        float: left;
                        position: relative;
                    }
                }
            }
            .body-right{
                width:40%;
                .item{
                    // border:1px solid #ff0000;
                    &:after{
                        .clear;
                    }
                    &>li{
                        .whb(50%,68px,none);    
                        list-style: none;  
                        float:left;
                        position: relative;
                    }                    
                }
            }
        }

        &:last-child{
            margin-bottom:0;
            border:1px solid #ff0000;
        }
    }

    #process-print-btn{
        position: absolute;
        right: 20px;
        top:12px;
    }

    
</style>