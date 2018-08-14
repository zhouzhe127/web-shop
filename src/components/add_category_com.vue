<template>
    <win :align="'center'" :height="650" :width="765" @winEvent="closeSelfWin" :ok="btnOk" :cancel="btnCancel">
        <span slot="title">{{title ? title : '选择分类'}}</span>
        <div  id="add-category-com" slot="content" :style="{'padding-bottom': showTips ? '50px' : '0px'}">
            <section v-for="(cate,index) in category" :key="index" class="content-box">
                <section class="parent">
                    <a v-if ="cate.child && cate.child.length>0" :class="{'arrow':true,'arrow-up':cate.toggle}" v-on:click="funShowToggle(cate,index)"></a>                        
                    <span  :class="{'radio':(selectCategory[0] && selectCategory[0].id == cate.id)  && !radio,'checkbox':cate.isSelect && radio,'none-select':cate.notAllow}" :style="eleStyle" v-on:click="chooseCategory(cate,index)">{{cate[fieldName]}}</span>
                </section>

                <transition name="fade">
                    <div class="child" v-if="cate.toggle">
                        <span  v-for="(child,i) in cate.child" class="list" :class="{'radio':(selectCategory[0]&&selectCategory[0].id == child.id )&& !radio,'checkbox':child.isSelect && radio,'none-select':child.notAllow}" :style="eleStyle" :key="i" v-on:click="chooseCategory(child,i,index)">{{child[fieldName]}}</span>
                    </div>
                </transition>
            </section>

            <div class="none-tips" v-if="category.length == 0">
                {{tips ? tips : "请先新建分类!"}}
            </div>

            <div class="bottom" v-if="showTips">
                <template v-if="radio">
                    <span class="radio" :class="{'select-radio':selectRadio == 1}" @click="operationAll('checkbox')">全选</span>
                    <span class="radio" :class="{'select-radio':selectRadio == 2}" @click="operationAll('radio')">反选</span>  
                </template>
                <span class="tips-word">已选择&nbsp;:&nbsp;{{selectCategory.length>1 ? selectCategory.length+'个' : selectCategory[0] &&selectCategory[0][fieldName] }}</span>              
            </div>
        </div> 
    </win>
</template>

<script>
import utils from "src/verdor/utils";
export default {
    data(){
        return {
            selectCategory:[],    //选中的分类id
            category:[],          //所有的分类
            selectRadio: 0,       //点击的按钮
            btnOk:{
                content:'确认',
                style:'background-color:#ff8d01'
            },
            btnCancel:{
                content:'取消',
                style:'background-color:#9fa0a0'
            }
        }
    },
    props:{
        title:null,                 //标题
        tips:null,                  //当没有数据时的提示语
        showTips:{
            type:Boolean,           //是否展示底部的提示信息
            default:true
        },
        radio:{
            type:Boolean,
            default:true           //多选还是单选,默认多选
        },
        list:{
            type:Array,            //所有的分类
            default:Array   
        },
        selectList:{
            type:Array,            //选中的分类 元素可以是分类的id或则是一个分类对象
            default:Array
        },
        fieldName:{
            type:String,
            default:'name'          //展示的字段名
        },
        eleStyle:{
            type:Object,				//禁止选中样式
            default:Object
        }
        /*
            抛出的事件 : throwCommonWin(arr,res)
            参数      : arr(选择的元素) res(弹窗的点击状态)
        */

    },
    methods:{
        closeSelfWin(res){
            let arr=[];//获取选中的分类
            let temp=[];
            if(res == 'ok'){
                arr = this.selectCategory;
            }else{
                arr = [];
            }
            arr = utils.deepCopy(arr);
            this.$emit("throwCommonWin",arr,res);
        },
        funShowToggle(item,index){
            item.toggle = !item.toggle;
            this.category.splice(index,1,item)
        },
        //点击选中分类
        chooseCategory(item,pIndex,cIndex){
            if(item.notAllow){
                return;
            }
            item.isSelect = !item.isSelect;
            if(this.radio){
                if(item.isSelect){
                    this.selectCategory.push(item);
                }else{
                    for(let i = 0,len = this.selectCategory.length;i < len;i += 1){
                        if(this.selectCategory[i].id == item.id){
                            this.selectCategory.splice(i,1);
                            break;
                        }
                    }
                }
                this.category.push(this.category.pop());
            }else{
                if(item.isSelect){
                    this.selectCategory = [item];                
                }else{
                    this.selectCategory = [];
                }
            }
        },


        operationAll(flag){
            let obj ={},
                sel = [];
            if(flag == 'checkbox'){
                this.selectRadio = 1;
                obj = this.initSelectCategory(this.category,[],false);
            }else{
                this.selectRadio = 2;
                obj = this.initSelectCategory(this.category,this.selectCategory,false);
            }
            this.selectCategory = [...obj.no];
            this.category = obj.arr;
        },
        
		//组织分类
		assignCategory(category=[]){
			let arr = [];
			for(let ele of category){
				if(ele.pid == 0){
					ele.child = [];
					for(let ch of category){
						if(ch.pid == ele.id){
							ele.child.push(ch);
						}
					}
					arr.push(ele);
				}
			}
			return arr;
		},
        getSelectList(arr){
            let sel = [];
            for(let ele of arr){
                if(ele.isSelect){
                    sel.push(ele);
                }

                if(!Array.isArray(ele.child)) ele.child = [];
                for(let e of ele.child){
                    if(e.isSelect){
                        sel.push(e);
                    }                       
                }                      
            }
            return sel;
        },
        initSelectCategory(...reset){
            let [category=[],selId=[],bool=true] = reset,
                ids = [],
                obj = {arr:[],sel:[],no:[]};

            
            if(selId.length == 0 ){
                ids = [null];
            }else{
                if(selId[0] && typeof selId[0] == 'object'){
                    ids = this.listGetAttr(selId,'id');

                }else{
                    ids = selId;
                }
            }

            for(let ele of category){
                for(let i = 0;i < ids.length;i++){
                    if(ele.id == ids[i]){
                        ele.isSelect = bool;
                        obj.sel.push(ele);
                        if(ids.length>1){
                            ids.splice(i,1);
                        }
                        break;
                    }else{
                        ele.isSelect = !bool;
                    }
                }
                
                if(ele.isSelect == !bool) obj.no.push(ele);
 
                if(!Array.isArray(ele.child)){
                    ele.child = [];
                }
                for(let ch  of ele.child){
                    for(let i = 0;i < ids.length;i++){
                        if(ch.id == ids[i]){
                            ch.isSelect = bool;
                            obj.sel.push(ch);
                            if(ids.length>1){
                                ids.splice(i,1);
                            }
                            break;
                        }else{
                            ch.isSelect = !bool;
                        }                            
                    }
                    if(ch.isSelect == !bool) obj.no.push(ch);
                }

                if(!this.radio && obj.sel.length == 1 ){
                    break;
                }
            }
            obj.arr = [...category];
            return obj;
        },        
        listGetAttr(arr,attr = 'id'){
            let attrs = [];
            arr.forEach((ele,index)=>{
                attrs[index] = ele[attr];
            });
            return attrs;
        },
        listAddAttr(category,attr='toggle',val = true){
            let arr = category.map((ele)=>{
                ele[attr] = val;
                return ele;
            })
            return arr;
        },
        initData(){
            let obj = {},
                isAssign = true;

            this.category = this.list;
            this.selectCategory = this.selectList;

			for(let ele of this.category){
				if(ele.pid != 0) isAssign = false;
			}
			if(!isAssign){
				this.category = this.assignCategory(this.category);
			}

            this.category = this.listAddAttr(this.category,'toggle',true);

            obj = this.initSelectCategory(this.category,this.selectCategory,true);
            this.category = obj.arr; 
            this.selectCategory = obj.sel;
        },       
    },
    mounted(){
        this.initData();
    },
    watch:{
        list:function(){
            this.initData();
        },
        selectList:function(){
            this.initData();
        }
    },
    components:{
        win:()=>import (/*webpackChunkName:"win"*/'src/components/win'),
    }
}
</script>
<style lang="less" scoped>
    @bg:#f7f7f7;
    @fc:#999;
    @y:#ff8d01;
    @pd:25px;
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
    .clear{
        content:"";
        display: block;
        line-height: 0;
        visibility: hidden;
        clear: both;
    }
    #add-category-com{
        background-color:@bg;
        padding:0 @pd;
        padding-top: 30px;
        min-height:650px;
        .none-tips{
            color:#f7ab53;
            font-size:20px;
            text-align: center;
            margin-top:50px;
        }
        .content-box {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom:10px;
            .span-common{
                min-width: 100px;
                .whb(auto,40px,1px solid @fc);
                .lfc(38px,14px,@fc);
                float:left;
                margin-left:7px; 
                margin-top:10px;   
                cursor: pointer;
                text-align:center;  
                background-color: #fff;
                user-select:none;
                padding: 0 15px;
            }
            //父分类
            .parent {
                span{
                    .span-common;
                    margin-bottom:0;
                }
                &:after{
                    .clear;
                }
            }
            // 子分类
            .child{
                span{
                    .span-common;
                }
                &:after{
                    .clear;
                }
            }
            // 箭头
            .arrow{
                background: url("../res/images/arrow.png") center no-repeat;
                .whb(50px,40px,none);
                vertical-align: middle;
                display: inline-block;
                margin-top:10px;
                cursor: pointer;     
                transform: rotate(180deg);
            }
            .arrow-up{
                transform: rotate(0);
            }

            /*单选样式*/
            .radio{
                color: @y!important;
                border: 1px solid @y!important;
            }
            /*多选样式*/
            .checkbox {
                .radio;
                background: url("../res/images/sign.png") right bottom no-repeat; 
            }
			.none-select{
				color: #333 !important;
				cursor: not-allowed !important;
				border:1px solid #ccc !important;
			}
        } 
        .bottom{
            position: absolute;
            bottom:50px;
            .whb(100%,50px,none);
            background: #fff;
            margin-left:-@pd;
            line-height: 50px;
            padding:0 @pd;
            .radio{
                .whb(80px,25px,1px solid #9fa0a0);
                .lfc(23px,14px,#9fa0a0);
                cursor: pointer;
                text-align: center;
                display: inline-block;
                margin-right:7px;
                user-select: none;
            }
            .select-radio{
                border:1px solid @y;
                color:@y;
            }
            .tips-word{
                color:@y;
                font-size:14px;
                float:right;
            }
        }

    }
    .fade-enter-active,.fade-leave-active{
        transition: opacity 0.3s ease;   
    }
    .fade-enter,.fade-leave-to{
        opacity: 0 
    }


    


</style>
