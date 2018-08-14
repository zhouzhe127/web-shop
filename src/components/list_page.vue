<template>
    <win @winEvent ="closeSelfWin" :height="560" :width='920' :ok="btnOK" :cancel="btnCancel">
        <span slot="title">{{title}}</span>
        <div id="list-page" slot="content" >
            <div class="body-head">
                <div class="block-div">
                    <select-store 
                        :sorts="category" 
                        :isSingle="sortOne.isSingle" 
                        :tipName="sortOne.tipName" 
                    @emit="(res)=>{getSelectStore(res,'one')}">
                    </select-store>
                </div>
                <div class="block-div">
                    <select-store 
                        :sorts="child" 
                        :isSingle="sortTwo.isSingle"
                        :tipName="sortTwo.tipName"  
                    @emit="(res)=>{getSelectStore(res,'two')}"></select-store>
                    <div class="cover-div" @click="stopShowSelectStore" v-show="child.length==0"></div>
                </div>
                <div class="input-div">
                    <input type="text" v-model="search" placeholder="请输入商品名">
                    <span class="search-img" @click="funSearchGoods">
                        <img src="../res/images/search.png" alt="">
                    </span>
                </div>
                <div class="toggle-div" v-if="false">
                    <div class="btn-common select">商品</div>
                    <div class="btn-common">套餐</div>
                </div>
            </div>

            <div class="body-content">
                <div class="list-all">
                    <template v-for="(item,index) in goodsList">
                        <span v-if="!item.alreadySel" :class="{'mul-span':goodsRadio && item.selected,'single-span':!goodsRadio && item.selected}" @click="initSelectItem(item,index)"  :key="index">{{item[fieldName]}}</span>
                        <span v-else :key="index" @click="alreadyClick" :class="{'none-select':item.alreadySel}">{{item[fieldName]}}</span>
                    </template>
                </div>
                <!-- <div class="category" v-for="j in 4" :key="j">
                    <span class="category-name"><i :class="{'gray-i':j==1}"></i>招牌菜点还U盾哈哈师大会的哈大好事</span>
                    <div class="category-container">
                        <span class="sign select-span" v-for="i in 10" :key="i">干锅</span>
                    </div>
                </div> -->
            </div>

            <div class="body-bottom-only" >
                <div class="page-container" v-if='true'>
                    <pageElement
                        @pageNum="getPageNum"
                        :page="pageObj.currentPage"
                        :total="pageObj.totalNum"
                        :num ='pageObj.num'
                        :showPageNum="pageObj.showPageNum"
                        :isNoPaging='true'
                        :isNoJump='!pageObj.isNoJump'
                    ></pageElement>
                </div>
                <span class="select-tips">已选择:{{selectItem.length>1  ? selectItem.length+'个' : selectItem[0] && selectItem[0][fieldName]}}</span>
            </div>
        </div>
    </win>
</template>
<script>
/*
    @file:分页请求数据
    百川:z曾伟福

*/
import utils from "src/verdor/utils";
export default {
    data(){
        return {
            title:'标题',
            btnOK:{
                content:'确定',
                style:'background-color:#ff9800'
            },
            btnCancel:{
                content:'取消',
            },
            pageObj:{
				num: 1, 			// 每页展示的数量
				currentPage: 1, 	//当前展示的页数
                totalNum:1,		    //总页数
                showPageNum:6,      //显示的按钮数
                isNoJump:false,     //默认不展示确定按钮      
            },
            sortOne:{
                'tipName':'请选择一级分类',
                'isSingle':true,    //是否单选   默认多选
                'isConfirm':true,     //是否带有 确认-取消按钮  false:无
                status:-1,
            },             
            sortTwo:{
                'tipName':'请选择二级分类',
                'isSingle':true,    //是否单选   默认多选
                'isConfirm':false,   //是否带有 确认-取消按钮  false:无
                status:-1,
            },
            category:[],            //一级分类
            child:[],               //二级分类

            selectCategory:{
                parent:[],          //选中的父分类
                child:[],           //选中的子分类           
            },                      

            goodsList:[],           //商品
            selectItem:[{}],          //选中的元素

            search:'',              //搜索
            goodsRadio:false,       //商品是单选还是多选 默认单选(false)
            fieldName:'name',        //展示的字段名
            onlyCategoryId:false,       
        }
    },
    props:{
        pObj:{
            type:Object,
            default:{},
        },
        pCategory:{
            type:Array,                 //[{id:'',name:'',child:[]}]其中child属性不是必须(当展示的只有一级分类时)
            default:[],                
        },
        pGoodsList:{
            type:Array,
            default:[],                //[{id:'',goodsName:''}]
        }
        /*
            pObj:{
                title:      String                                  //String    标题
                goodsRadio:false,                                   //Boolean   商品是单选还是多选 默认单选(false)
                fieldName:                                          //string    列表元素的字段名  默认是name
                selGoods:                                           //Array     选中的商品id[id]

				num: 7, 			// 每页展示的数量
				currentPage: 1, 	//当前展示的页数
                totalNum:100,		//总页数
                showPageNum:6,      //显示的按钮数
                onlyCategoryId:     //Number                        是从两个选中的分类id中选择其中一个默认false(抛出选中的所有),                    
                isNoJump:           //是否显示分页组件的确定           true:显示
            }
            1)抛出事件 
                this.$emit("selectGoods",obj); 
                obj:{
                    page:当前页        Number
                    search:搜索内容     String
                    parent:父分类      Array
                    child:子分类       Array
                    selList:选择的元素  Array
                    status:点击状态     search:点击的是搜索,page:点击的是分页
                    cid:                                            //抛出来的单独id
                }
        */
    },
    methods:{
        //-----------win-------
        closeSelfWin(flag){
            let arr=[];
            if(flag == 'ok'){
                arr = this.goodsList.filter((ele)=>{return ele.selected});
            }
            this.emitEvent(flag,arr);
        },
        alertWin(str){
            this.$store.commit("setWin",{title:'温馨提示',content:str});
        },
        //-------------event----------
        //获取选择的分类
        getSelectStore(res,flag){
            if(flag=='one'){
                let parent = this.filterSelectStore(res);
                this.child = this.filterChildCategory(parent);      //相应的子分类
                this.selectCategory.parent = parent;                //选中的父类

                this.sortTwo.tipName = "请选择二级分类";
                this.sortTwo.status = -1;
                if(parent.length>0){
                    this.sortOne.status = 1;
                }else{
                    this.sortOne.status = -1;
                }
            }else{
                this.selectCategory.child = this.filterSelectStore(res);
            }
        },
        //阻止点击二级分类
        stopShowSelectStore(){
            if(this.sortOne.status==-1){
                this.alertWin("请先选择一级分类!");
                return;
            }
            if(this.child.length==0){
                this.alertWin("该分类下无二级分类!");
                return;                    
            }            
        },
        //搜索
        funSearchGoods(){
            this.emitEvent('search',[]);
        },
        emitEvent(status,arr=[]){
            let obj={
                page:this.pObj.currentPage,
                search:this.search.trim(),
                parent:utils.deepCopy(this.selectCategory.parent),
                child:utils.deepCopy(this.selectCategory.child),
                selList:utils.deepCopy(arr),
                cid:'',
                status:status
            };
            if(this.onlyCategoryId){
                let cid = '';
                if(obj.child.length>0){
                    cid = obj.child[0].id;
                }else{
                    if(obj.parent.length>0) cid=obj.parent[0].id;
                }
                obj.cid = cid;
            }          
            this.$emit("selectGoods",obj);
        },
        //选中列表元素
        initSelectItem(item,index){
            if(!this.goodsRadio){
                let arr = !item.selected ? [item.id] : null;
                let temp = this.initSelectGoods(this.goodsList,arr);
                this.selectItem = temp.sel;
                this.goodsList = temp.arr;
            }else{
                item.selected = !item.selected;
                this.goodsList.splice(index,1,item);
                this.selectItem = this.goodsList.filter((ele)=>{return ele.selected});
            }
        },
        alreadyClick(){
        	this.alertWin("该商品已被关联，删除关联该商品的bom单，即可取消关联");
        },
        //-----------分页-----------
        getPageNum(obj){
            this.pObj.currentPage = parseInt(obj.page);
            this.emitEvent('page',[]);
        },
        //------utils----------
        //初始化选中的元素 返回选中的元素与标识之后的数组
        initSelectGoods(arr,sel){
            if(!Array.isArray(sel)) sel=[null];
            let obj={
                arr:[],
                sel:[]
            };
            for(let ele of arr){
                for(let id of sel){
                    if(id==ele.id){
                        obj.sel.push(ele);
                        ele.selected = true;
                    }else{
                        ele.selected = false;
                    }
                    obj.arr.push(ele);
                }
            }
            return obj;
        },
        //筛选子分类
        filterChildCategory(arr){
            let temp = [];
            for(let item of arr){
                if(item.child) temp.push(...item.child);
            }
            return temp;
        },
        //筛选选中的分类
        filterSelectStore(arr){
            let temp=[];
            for(let item of arr){
                if(item.selected) temp.push(item)
            }
            return temp;
        },
        initData(){
            this.category  = this.pCategory;
            this.goodsList = this.pGoodsList;
            if(!Array.isArray(this.category))  this.category = [];
            if(!Array.isArray(this.goodsList)) this.goodsList = [];
            let selGoods = [null];
            if(this.pObj && typeof this.pObj=='object'){
                if(this.pObj.selGoods && this.pObj.selGoods.length>0) selGoods = this.pObj.selGoods;
                this.initPro(['title','goodsRadio','fieldName','onlyCategoryId'],this.pObj,this);
                this.initPro(['num','currentPage','totalNum','showPageNum','isNoJump'],this.pObj,this.pageObj);
            }
            let temp = this.initSelectGoods(this.goodsList,selGoods);
            this.goodsList =temp.arr;
            this.selectItem = temp.sel;
            if(this.selectItem.length==0) this.selectItem=[{}];
        },
        initPro(arr=[],obj={},obj2={}){
            for(let key of arr){
                if(obj[key]) obj2[key] = obj[key]
            }
        },

    },
    mounted(){
        this.initData();
    },
    watch:{
        'pCategory':function(){
            let cate = this.pCategory;
            if(!Array.isArray(cate)) cate=[];
            this.category = [...cate];
        },
        'pGoodsList':function(){
            let list = this.pGoodsList;
            if(!Array.isArray(list)) list=[];
            this.goodsList = [...list];         //触发视图的更新
        },
        'pObj':{
            handler:function(){
                this.initPro(['title','goodsRadio','fieldName','onlyCategoryId'],this.pObj,this);
                this.initPro(['num','currentPage','totalNum','showPageNum','isNoJump'],this.pObj,this.pageObj);
            },
            deep:true
        }
    },
    components:{
        win: () => import(/*webpackChunkName:"win"*/ "src/components/win"),
        selectStore:()=>import(/*webpackChunkName:"win"*/ "src/components/select_store"),
		pageElement:()=>import (/*webpackChunkName:"page_element"*/'src/components/page_element'),

    }
}
</script>
<style lang="less" scoped>
#list-page{
    @b:1px solid #ff0000;
    @cc:#ccc;
    @c3:#333;
    @blue:#28a8e0;
    @cy:#ff9800;
    background-color:#f7f7f7;
	height: 100%;
    .whb(@width,@height,@border:1px solid #ff0000){
        height:@height;
        width:@width;
        border:@border;
    }
    .lfc(@line,@font,@color){
        line-height: @line;
        font-size:@font;
        color:@color;
    };
    input{
        padding:0;
        margin:0;
    }
    .body-head{
        padding:0 25px;
        padding-top:20px;
        .block-div{
            display:inline-block;
            margin-right:12px;
            .cover-div{
                position:absolute;
                .whb(210px,40px,none);
                cursor: pointer;
                margin-top:-40px;
                opacity:0;
            }
        };
        .toggle-div{
            width:180px;
            float:right;
            display: none;
            .btn-common{
                float: left;
                .whb(90px, 40px, 1px solid #ff9800);
                .lfc(40px, 16px, #ff9800);
                text-align: center;
                background-color: #fff;
            }
            .select{
                background-color: #ff9800;
                color:#fff;
            }
        }
        .input-div{
            .whb(210px,41px,1px solid @cc);
            margin-right:15px;
            // float:left;
            display: inline-block;
            background: #fff;
            input{
                outline:none;
                padding:0 10px;
                box-sizing: border-box;
                .lfc(40px, 14px, @c3);
                .whb(168px,38px,none);
            }
            span{
                .whb(40px,40px,none);
                border-left:1px solid @cc;
                float:right;
                cursor: pointer;
                i{
                    border:7px solid transparent;
                    border-top:12px solid @cc;
                    position: absolute;
                    margin-top:13px;
                    margin-left:13px;
                }
            }
            .search-img{
                background-color: #28a8e0;
                text-align: center;
                img{
                    .whb(25px,25px,none);
                    margin-top:8px;
                }
            }
        }
    }
    .body-content{
        height:auto;
        padding:0 25px;
        margin-top:20px;
        padding-bottom:60px;
        span{
            .lfc(40px, 14px, #333333);
            text-align: center;
            display: inline-block;
            margin-bottom:10px;
            margin-right:10px;
            min-width: 100px;
            padding:0 15px;
            cursor: pointer;
            background-color: #fff;
            border:1px solid #ddd;
        }
        .single-span{
            border:1px solid @cy;
            color:@cy;
        }
        .mul-span{
            background: url("../res/images/sign.png") right bottom no-repeat;
            border:1px solid @cy;
            color:@cy;           
        }
        .none-select{
            color: #333;
            background: #ddd;
            cursor: not-allowed;
        }
        .list-all{
            max-height:410px;
            overflow-y: auto;
        }
        .category{
            // border:1px solid #ccc;
            overflow: auto;
            .category-name{
                .lfc(40px,16px,@blue);
                .whb(120px,40px,none);
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                background:none;
                cursor:auto;
                white-space:nowrap;
                i{
                    .whb(9px,9px,none);
                    margin-right:5px;
                    float:left;
                    background-color: #a0a0a0;
                    margin-top:14px;
                }
                .gray-i{
                    background: @blue;
                }
            }
            .category-container{
                width:709px;
                float:right;
                overflow: auto;
            }

        }
    }
    .body-bottom-only{
        position: absolute;
        bottom:50px;
        .whb(100%,60px,none);
        padding-top:10px;
        background: #fff;
        .page-container{
            float:left;
            margin-left:25px;
            width:auto;
        }
        .select-tips{
            padding-top:11px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width:auto;
            max-width:270px;
            float:right;
            font-size:14px;
            color:@cy;
            margin-right:25px;
        }
    }
}
</style>


