/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:19:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-02 16:52:56
 */
<template>  
    <el-dialog :title="title" center :width="width" :visible.sync="openWin">
        <div class="dialog-content">
            <div class="pad-bottom">
                <span style="padding-right:20px;">排序</span>
                <el-input-number v-model="sortObj.num" :min="sortObj.min" :max="sortObj.max" label="描述文字"></el-input-number>
                <i class="el-icon-warning collection-tips-icon"></i>
                <span class="collection-tips-word">范围({{sortObj.min}}-{{sortObj.max}})</span>
            </div>

            <div class="pad-bottom">
                <div class="add-matrial">
                    <span>选择物料</span>
                    <i class="el-icon-plus plus"></i>
                </div>
                /
                <select-collection></select-collection>
            </div>

            <div class="textarea">
                adsssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
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
</template>
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

        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        padding:10px;
        cursor: pointer;
        .plus{
            font-size:22px;
        }
    }

    


    .pad-bottom{
        padding-bottom:20px;
    }

</style>
<script>


import http from 'src/manager/http';
export default {
    data () {
        return {     
            openWin:true,
            sortObj:{},            
        };
    },
    props:{
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
            
        },



        initSortObj(){
            this.sortObj = {
                min:1,
                max:1,
                num:1
            };
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
        this.initSortObj();
    },
    components:{
        selectCollection:() => import(/* webpackChunkName:"select_collection"*/'./select_collection'),
    }
};
</script>