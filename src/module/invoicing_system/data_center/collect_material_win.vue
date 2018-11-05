/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:19:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 16:04:29
 */
<template>  
    <el-dialog :title="title" center :width="width"  :visible.sync="openWin">
        <div class="dialog-content">

            <div class="pad-bottom">
                <el-select v-model="condition.unitId"  @change="changeUnit"  placeholder="请选择单位">
                    <el-option
                        v-for="item in unitList"
                        :key="item.muId"
                        :label="item.name"
                        :value="item.muId"
                    >
                    </el-option>
                </el-select>

                <i class="el-icon-warning collection-tips-icon"></i>                
                <span class="collection-tips-word">请先选择一个聚合物料的单位</span>
            </div>

            <div class="pad-bottom">
                <el-menu :default-active="tabIndex" @select="changeTab" active-text-color="#E1BB4A" class="el-menu-demo" mode="horizontal">
                    <el-menu-item v-for="(item,index) in tabs" :key="index" :index="item.id">{{item.label}}</el-menu-item>
                </el-menu>
            </div>

            <div class="list-content">
                <template v-if="radio" v-for="(item,index) in nowList">
                    <el-checkbox  v-model="item['checked']" :disabled="item.disabled" :label="item['name']" border :key="index" style="margin-left:0;" class="checkbox"></el-checkbox>
                </template>
            </div>

        </div>
        <template slot="footer">
            <div class="footer">
                <div class="footer-page">
                    <span class="select-num">
                        已选:{{selectList.length}}个
                    </span>
                </div>

                <div class="footer-btn">
                    <el-button @click="clickBtn('cancel')">取 消</el-button>
                    <el-button @click="clickBtn('ok')" type="primary">确 定</el-button>
                </div>
            </div>
        </template>
    </el-dialog>
</template>
<style lang='less' scoped>
    .footer{
        display:flex;
        justify-content: space-between;
        .footer-page{
            display: flex;
            align-items: center;
            .select-num{
                color:#E1BB4A;
            }
        }
    }
    .pad-bottom{
        padding-bottom:20px;
    }
    .collection-tips-icon{
        color: #E1BB4A;
        font-size:14px;
        margin-left:5px;
    }
    .collection-tips-word{
        color: #E1BB4A;
        font-size:14px;
    }
    .collection-name{
        padding-bottom:20px;
    }

    .dialog-content{
        border-top:1px solid #EAEEF5;
        border-bottom:2px solid #EAEEF5;
        padding-top:20px;
    }
    .btn-type{
        padding-top:20px;
        padding-bottom:20px;
    }
    .list-content{
        height: 280px;
        overflow-y: scroll;
    }
    .checkbox{
        margin-bottom:10px;
        margin-right:10px;
    }
</style>
<script>
/*
    需求:
        品牌进入以品牌的物料内容，单店进入以单店的物料内容，无品牌门店


                
*/
//tab按钮
let tabs = {
    same: '1',
    dif: '2'
};
import http from 'src/manager/http';
export default {
    data () {
        return {
            openWin:true,
            tabs:[
                {id:tabs.same,label:'相同单位'},
                {id:tabs.dif,label:'不同单位'},
            ],
            tabIndex: tabs.same,            
            radio:true,             //多选

            unitList:[],                //单位列表
            list:[],                    //当前页的物料列表
            nowList:[],                 //当前展示的物料
            selectList:[],              //选中的物料列表

            condition:{},            
            selectBtn:false,            //是否选择本页
        };
    },
    props:{
        //列表
        mList:{
            type:[Array],
            default:function(){return []}
        },
        //弹窗标题
        title:{
            type:[String],
            default:'新建选择相同单位集合',
        },
        //弹窗的宽
        width:{
            type:[String],
            default:'920px'
        },
    },
    methods: {
        clickBtn(sym){
            
        },
        //单位的切换
        changeUnit(unitId){
            this.divideList();
        },
        //tab切换
        changeTab(tab){
            this.tabIndex = tab;
            
            if(this.condition.unitId){
                this.divideList();            
            }else{
                this.nowList = [];                
            }
        },
        //区分列表
        divideList(){
            let list = this.list;
            let same = [];
            let dif = [];
            let unitId = this.condition.unitId;
            
            for(let ele of list){
                if(Array.isArray(ele['unit'])){
                    let flag = false;
                    for(let e of ele['unit']){
                        if(e['muId'] == unitId){
                            flag = true;
                            same.push(ele);
                            break;
                        }
                    }
                    if(!flag){
                        dif.push(ele);
                    }
                }
            }
            
            if(this.tabIndex == tabs.same){
                this.changeListAttrVal(same,'disabled',false);
                this.nowList = same;
            }else{
                this.changeListAttrVal(dif,'disabled',true);                
                this.nowList = dif;
            }
        },





        //获取某些物料单位信息
        getMaterialUnitInfo(){
            let selectList = this.list;
            let unitList = [];

            for(let ele of selectList){
                if(Array.isArray(ele['unit'])){
                    unitList.push(...ele['unit']);
                }
            }
            this.unitList = this.removeDuplicate(unitList);
        },




        //初始化条件
        initCondition(){
            this.condition = {
                unitId:'',                  //当前选择的单位id
            };
        },
        initDataByPorps(){
            let list = this.mList;
            this.changeListAttrVal(list,'disabled',false);
            this.changeListAttrVal(list,'checked',false);
            this.list = list;
        },





        //列表去重
        removeDuplicate(list){
            let set = new Set();
            let arr = [];
            let attr = 'muId';         
            for(let ele of list){
                let id = ele[attr]+'';
                if(!set.has(id)){
                    set.add(id);
                    arr.push(ele);
                }
            }
            return arr;
        },
        //检查列表中的元素某一个属性的值是否相同
        hasSameAttrVal(list,attr='unitId'){
            let set = new Set();;

            for(let ele of list){
                if(ele[attr]){
                    set.add(ele[attr]);
                }
            }
            return [...set];
        },
        matchSelectList(list,selectList){
            let attr = 'checked';
            let val = true;
            for(let ele of list){
                for(let e of selectList){
                    if(ele.id == e.id){
                        ele[attr] = val;
                        break;
                    }
                }
            }
        },
        //改变列表的某个属性值
        changeListAttrVal(list,attr,val){
            for(let ele of list){
                ele[attr] = val;
            }
        },
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
        },
    },
    mounted(){
        this.initCondition();
        this.initDataByPorps();
        this.getMaterialUnitInfo();
    },
};
</script>