<template>  
    <el-dialog :title="title" center :width="width" left :visible.sync="openWin">
        <div class="dialog-content" >
            <div>
                <el-cascader
                    expand-trigger="click"
                    :options="categoryList"
                    v-model="condition.category"
                    placeholder="请选择分类"
                    :filterable="true"
                    :change-on-select="true"
                    clearable
                    >
                </el-cascader>

                <el-input clearable v-model="condition.name" placeholder="输入名称" style="width:224px"></el-input>

                <el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
                <el-button type="info" @click="filterReset('reset',null)">重置</el-button>
            </div>

            <div class="btn-type">
                <el-button @click="changeBtn(item,index)" v-for="(item,index) in btns" :key="index" :type="selectBtn == item.id ? 'primary' : 'plain'" size="mini">{{item['label']}}</el-button>                            
            </div>

            <div class="list-content">
                <template v-if="radio" v-for="(item,index) in list">
                    <el-checkbox @change="(res)=>{changeChecked(item,res)}" v-model="item['checked']" :label="item['name']" border :key="index" style="margin-left:0;" class="checkbox"></el-checkbox>
                </template>
            </div>
        </div>
        <template slot="footer">
            <div class="footer">
                <div class="footer-page">
                    <el-pagination
                        :pager-count="pageObj.pagerCount"
                        :page-size="pageObj.pageSize"
                        layout="prev, pager, next"
                        :background="true"
                        :total="pageObj.total"
                        :current-page.sync="pageObj.currentPage"
                        @size-change="(res)=>{funGetPage('size-change',res)}"
                        @current-change="(res)=>{funGetPage('current-change',res)}"
                    >
                    </el-pagination>
                    <span class="select-num">
                        已选:{{selectNum}}个
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
        // margin-top:-20px;
        .footer-page{
            display: flex;
            align-items: center;
            .select-num{
                color:#E1BB4A;
            }
        }
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
//按钮
let btns = {
    none:0,         //未选择
    page:1,         //本页
    category:2,     //本类
    shop:3,          //本店
};
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
    data () {
        return {
            openWin:true,
            
            btns:[
                {id:btns.page,label:'选择本页'},
                {id:btns.category,label:'选择本类'},
                {id:btns.shop,label:'选择本店'},
            ],
            selectBtn: btns.none,                //当前选中的按钮id

            //未公开属性
            radio:true,             //多选

            condition:{},
            categoryList:[],
            pageObj:{},
            list:[],                    //当前页的物料列表
            selectList:[],              //选中的物料列表
            selectNum:0,
            preSubObj:{},               //上一次请求时携带的条件
        };
    },
    props:{
        title:{
            type:[String],
            default:'选择物料',
        },
        width:{
            type:[String],
            default:'920px'
        }
    },
    methods: {
        clickBtn(sym){
            if(sym == 'ok'){
                this.$emit('select',[]);
            }else{
                this.$emit('select',false);  
                this.openWin = false;
            }
        },
        async filterReset(sym,page){
            if(sym == 'reset'){
                this.initPageObj();
                this.initCondition();
            }else{
                this.pageObj.currentPage = page | 1;
            }
            this.selectBtn = btns.none;
            this.clearSelectList();
            this.getMaterialList();

        },
		async funGetPage(flag,res){
            let tableData = [];
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
            }

            await this.getMaterialList();
            
            if(this.selectBtn == btns.category || this.selectBtn == btns.shop){
                this.addDelSelectList(this.list,false);
                this.addDelSelectList(this.list,true);
                this.changeListAttrVal(this.list,'checked',true);
            }else{
                if(this.selectBtn == btns.page) this.selectBtn = btns.none;
                this.matchSelectList(this.list,this.selectList);
                let sym = this.list.every(ele => ele['checked']);
                if(sym){
                    this.selectBtn = btns.page;
                }
            }
        },
        //按钮切换
        async changeBtn(item){
            let condition = this.condition;
            switch(item.id){
                case btns.page://选择本页
                    if(item.id == this.selectBtn){
                        this.selectBtn = btns.none;
                        this.changeListAttrVal(this.list,'checked',false);
                        this.addDelSelectList(this.list,false);
                    }else{
                        this.selectBtn = item.id;
                        this.changeListAttrVal(this.list,'checked',true);
                        this.addDelSelectList(this.list,true);
                    }
                    this.selectNum = this.selectList.length;                      

                    break;
                case btns.category://选择本类
                    if(condition.category.length == 0){
                        this.$message('请先选择分类');
                        return;
                    }
                    if(item.id == this.selectBtn){
                        this.selectBtn = btns.none;

                        this.clearSelectList();
                        this.changeListAttrVal(this.list,'checked',false); 

                        this.selectNum = 0;
                    }else{
                        this.selectBtn = item.id;

                        condition.name = '';
                        this.clearSelectList();

                        await this.getMaterialList();
                        this.changeListAttrVal(this.list,'checked',true);
                        this.addDelSelectList(this.list,true);

                        this.selectNum = this.pageObj.total;
                    }

                    break;                
                case btns.shop://选择本店
                    if(item.id == this.selectBtn){
                        this.selectBtn = btns.none;
                        this.clearSelectList();  
                        this.changeListAttrVal(this.list,'checked',false);                                               
                    }else{
                        this.selectBtn = item.id;

                        this.initPageObj();
                        this.initCondition();

                        this.clearSelectList();                        
                        await this.getMaterialList();
                        this.changeListAttrVal(this.list,'checked',true);
                        this.selectNum = this.pageObj.total;
                    }
                    break;
            }


        },
        //复选框的点击
        changeChecked(item,bool){
            let condition = this.condition;
            
            if(bool){
                //选中
                let type = this.getRequestType();
                let pageObj = this.pageObj;
                this.addDelSelectList([item],false);
                this.addDelSelectList([item],true);
                this.selectNum = this.selectList.length;

                if(this.selectList.length == this.list.length){
                    this.selectBtn = btns.page;                 //选中本页
                }

                /*是否需要添加该功能???
                if(type.category){
                    if(this.selectList.length == pageObj.total){
                        this.selectBtn = btns.category;                 //选中本类                        
                    }
                }
                if(type.shop){
                    if(this.selectList.length == pageObj.total){
                        this.selectBtn = btns.shop;                 //选中本店                       
                    }
                }
                */

            }else{
                //取消
                if(this.selectBtn == btns.category){
                    item['checked'] = !bool;
                    this.$message('已选择本类,不可以取消!');
                    return;
                }else if(this.selectBtn == btns.shop){
                    item['checked'] = !bool;                
                    this.$message('已选择本店,不可以取消!');
                    return;
                }else if(this.selectBtn == btns.page){
                    this.selectBtn = btns.none;
                    this.addDelSelectList([item],false);
                    this.selectNum = this.selectList.length;
                }else{
                    this.addDelSelectList([item],false);
                    this.selectNum = this.selectList.length;
                }
                
            }


        },
        //批量添加删除选中的
        addDelSelectList(list,sym){
            let selectList = this.selectList;
            for(let i = 0;i < list.length;i += 1){
                for(let j = 0; j < selectList.length ;j += 1){
                    if(selectList[j].id == list[i].id){
                        selectList.splice(j,1);
                        break;
                    }
                }
            }
            //添加
            if(sym){
                selectList.push(...list);
            }
        },
        //清除所有选中
        clearSelectList(){
            this.selectList = [];
            this.selectNum = 0;
        },
        //判断当前请求的是本类还是本店
        getRequestType(){
            let preSubObj = this.preSubObj;
            let pageObj = this.pageObj;
            let obj = {category:false,shop:false};
            if(preSubObj.cid && !preSubObj.name && pageObj.currentPage == 1){
                obj.category = true;
            }
            if(!preSubObj.cid && !preSubObj.name && pageObj.currentPage == 1){
                obj.shop = true;
            }
            return obj;

        },





        //获取物料列表
        async getMaterialList(){
            let condition = this.condition;
            let subObj = {
                page:this.pageObj.currentPage,
                num:this.pageObj.pageSize,
                name:condition.name,
                cid:this.getCondition(),
                type:-1,
            };
            let retObj = await this.getHttp('getMaterialList',subObj);
            if(Array.isArray(retObj.list)){
                this.preSubObj = subObj;
                this.list = retObj.list.map((ele)=>{
                    ele.checked = false;
                    return ele;
                });
                this.changeListAttrVal(retObj.list,'checked',false);
                this.list = retObj.list;
                this.pageObj.total = retObj.count | 0;
            }
        },
        //获取分类
        async getCategoryList(){
            let cate = await this.getHttp('MaterialGetCategoryList');
            let arr = [];
            
            if(Array.isArray(cate)){
                for(let ele of cate){
                    if(!Number(ele.pid)){
                        ele.value = ele.id;
                        ele.label = ele.name;
                        ele.children = [];
                        for(let e of cate){
                            if(ele.id == e.pid){
                                e.value = e.id;
                                e.label = e.name;
                                ele.children.push(e);
                            }
                        }
                        arr.push(ele);
                    }
                }
            }
            this.categoryList = arr;
        },
        //获取选中的分类id
        getCondition(){
            let cate = this.condition.category;
            let cid = '';
            if(cate.length != 0 ){
                cid = cate[cate.length - 1 ];
            }
            return cid;
        },

        matchSelectList(list,selectList){
            for(let ele of list){
                for(let e of selectList){
                    if(ele.id == e.id){
                        ele['checked'] = true;
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
        //初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:50,			//每页显示的记录数
				pagerCount:7,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
        },
        initCondition(){
            this.condition = {
                name:'',
                category:[],
            };
        },
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
        },
        tempData(count=10){
            let arr = [];
            let cids = [1,2,3,4,5];
            for(let i = 0;i < count; i++){
                let obj = {id:i,name:'经销存商品'+i,checked:false,cid:cids[i % 6]};
                arr.push(obj);
            }
            return arr;
        }
    },
    mounted(){
        this.initCondition();
        this.initPageObj();
        this.getCategoryList();
        this.getMaterialList();
    },
};
</script>