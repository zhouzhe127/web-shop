/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:19:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 14:10:26
 */
<template>  
    <div>
        <el-dialog :title="title" center :width="width" :visible.sync="winShow" @close="clickBtn('cancel')">
            <div class="dialog-content">

                <div class="pad-bottom">
                    <span style="padding-right:20px;">排序</span>
                    <el-input-number v-model="sortObj.num" :min="sortObj.min" :max="sortObj.max" label="描述文字"></el-input-number>
                    <i class="el-icon-warning collection-tips-icon"></i>
                    <span class="collection-tips-word">范围({{sortObj.min}}-{{sortObj.max}})</span>
                </div>

                <div class="pad-bottom">
                
                    <div class="add-matrial" @click="openWin(winType.selectMaterial)">
                        <span>选择物料</span>
                        <i class="el-icon-plus plus"></i>
                    </div>
                    /

                    <select-collection-com  @change="getSelectCollection" :list="collectionList"></select-collection-com>

                    <div class="add-matrial add-collection" @click="openWin(winType.createCollection)">
                        <i class="el-icon-plus plus" style="margin-right:10px;"></i>
                        <span>新建集合</span>
                    </div>
                </div>

                <div class="textarea">
                    <div v-if="scope.length > 0">
                        物料范围( {{scope.length}} )                    
                    </div>
                    <div v-if="collection.id">
                        {{collection.name}} ( {{collection.mid.length}} 种 , 单位 : {{collection.unit.name}} )
                    </div>
                </div>


            </div>
            <template slot="footer">
                <div class="footer">
                    <div class="footer-btn">
                        <el-button @click="clickBtn('cancel')">取 消</el-button>
                        <el-button @click="clickBtn('ok')" type="primary">确 定</el-button>
                    </div>
                </div>
            </template>
        </el-dialog>
        
        <component
            :is="showCom"
            :show="true"
            @change="closeWin"
        >
        </component>
    </div>
</template>

<script>
/*
    接口:
        获取集合列表:getStatisticScopeCategoryList
        添加或更新分类统计范围:setStatisticScopeCategory
*/

let winType = {
    selectMaterial : 'selectMaterialCom',                    //选择物料
    createCollection : 'createCollectionCom'               //新建集合
};

import http from 'src/manager/http';
export default {
    data () {
        return {     
            winShow:    true,                   
            winType: winType,                   //弹窗名

            showCom:'',                         //当前展示的弹窗
            comObj:{},                          

            collectionList:[],                  //集合列表       


            sortObj:{},                         //排序值,
            scope:[],                           //物料范围
            collection:[],                            //选择的集合


            
        };
    },
    props:{
        //排序值对象
        pSortObj:{
            type:[Object],
            default:function(){
                return {
                    min:1,
                    max:1,
                    num:1
                };
            }
        },
        //物料范围
        pScope:{
            type:[Array],
            default:function(){
                return [];
            }
        },
        //选择的集合
        pCollection:{
            type:[Object],
            default:function(){
                return {};
            }
        },
        //弹窗标题
        title:{
            type:[String],
            default:'添加行',
        },
        //弹窗的宽
        width:{
            type:[String],
            default:'570px'
        },
    },
    methods: {
        clickBtn(sym){
            let obj = {};
            if(sym == 'cancel'){
                this.throwData(false);
            }else{
                obj = {
                    pSortObj : this.sortObj,
                    pScope : this.scope,
                    pCollection : this.collection
                };
                this.throwData(obj);                
            }
        },
        throwData(data){
            this.$emit('change',data);
        },

        //打开弹窗
        openWin(sym){
            this.showCom = sym;
        },
        closeWin(obj){
            if(!obj){
                this.showCom = '';
                return;
            }
            
            switch(this.showCom){
                case winType.selectMaterial:    //选择物料
                    this.scope = obj;
                    this.collection = {};
                    break;
                case winType.createCollection:  //新建集合,抛出新建的集合
                    this.collectionList.unshift(obj);
                    this.getSelectCollection(obj);
                    break;
            }
            this.showCom = '';
        },
        //获取选择的集合
        getSelectCollection(row){
            this.collection = row;
            this.scope = [];
        },




        initDataByProps(){
            let def = {
                min:1,
                max:1,
                num:1
            };
            //排序值
            this.sortObj =  Object.assign(def,this.pSortObj);      
            //选择的集合
            this.collection = this.pCollection;
            //选择的物料范围
            this.scope = this.pScope;
        },


        async getCollectionList(){
            let retData = await this.getHttp('getStatisticScopeCategoryList');
            if(Array.isArray(retData.list)){
                this.collectionList = retData.list;
            }
        },
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
        },
    },
    mounted(){
        this.initDataByProps();
        this.getCollectionList();
    },
    components:{
        selectCollectionCom:() => import(/* webpackChunkName:"select_collection"*/'./select_collection'),
        selectMaterialCom:() => import(/* webpackChunkName:"report_select_material_win"*/'./report_select_material_win'),
        createCollectionCom:() => import(/* webpackChunkName:"report_add_collection_win"*/'./report_add_collection_win'),
    }
};
</script>

<style lang='less' scoped>
    @bc:#EAEEF5;
    .wh(@w:140px,@h:40px){
        width:@w;
        height:@h;
    }
    .footer{
        display:flex;
        justify-content: flex-end;
        .footer-page{
            display: flex;
            align-items: center;
            .select-num{
                color:#E1BB4A;
            }
        }
    }
    .dialog-content{
        border-top:1px solid @bc;
        border-bottom:2px solid @bc;
        padding-top:20px;
        height: 374px;
    }

    .collection-tips-icon{
        color: #ccc;
        font-size:14px;
        margin-left:5px;
    }
    .collection-tips-word{
        color: #909399;
        font-size:14px;
    }
    .textarea{
        height:120px;
        padding:10px;
        border:1px solid #EAEEF5;
        word-break: break-all;
        border-radius: 5px;
    }

    .add-matrial{
        .wh;
        border:1px solid @bc;
        border-radius: 5px;
        padding:10px;
        vertical-align: bottom;
        cursor: pointer;

        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        .plus{
            font-size:22px;
        }
    }

    .add-collection{
        background-color: #E1BB4A;
        color:#fff;
        justify-content: center;
    }

    


    .pad-bottom{
        padding-bottom:20px;
    }

</style>