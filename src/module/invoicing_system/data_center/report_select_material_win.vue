<template>  
    <el-dialog :title="title" center :width="width" left :visible.sync="bool">
        <div class="dialog-content" >
            <div>
                <el-cascader
                    expand-trigger="hover"
                    :options="categoryList"
                    v-model="condition.category"
                    placeholder="请选择分类"
                    :filterable="true"
                    :change-on-select="true"
                    clearable
                    >
                </el-cascader>

                <el-input clearable v-model="condition.name" placeholder="输入名称" style="width:224px"></el-input>

                <el-button type="primary" @click="filterReset()">筛选</el-button>
            </div>

            <div class="btn-type">
                <el-button type="primary" size="mini">选择本页</el-button>                
            </div>

            <div class="list-content">
                <template v-if="radio" v-for="(item,index) in list">
                    <el-checkbox v-model="item['isSelect']" :label="item['name']" border :key="index" style="margin-left:0;" class="checkbox"></el-checkbox>
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
                        已选:2个
                    </span>
                </div>

                <div class="footer-btn">
                    <el-button>取 消</el-button>
                    <el-button type="primary">确 定</el-button>
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
        min-height: 280px;
        overflow-x: scroll;
    }
    .checkbox{
        margin-bottom:10px;
        margin-right:10px;
    }
</style>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
    data () {
        return {
            bool:true,
            
            //未公开属性
            radio:true,             //多选

            condition:{},
            categoryList:[],
            pageObj:{},
            list:[
                {id:1,name:'大家啊劳动纪律',isSelect:false},
                {id:2,name:' 答案是大',isSelect:false},
                {id:3,name:'打打所多',isSelect:false},
                {id:4,name:'大劳点击;按理讲道理',isSelect:false},
                {id:5,name:'都一哦脾气我 ',isSelect:false},
                {id:6,name:'大会肯定会卡死',isSelect:false},
            ],
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
        filterReset(){

        },
		async funGetPage(flag,res){
            let tableData = [];
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
            }
        },
        //初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:1000,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:7,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
        },
        initCondition(){
            this.condition = {
                name:'',
                category:[],
            };
        }
    },
    mounted(){
        this.initCondition();
        this.initPageObj();
    },
};
</script>