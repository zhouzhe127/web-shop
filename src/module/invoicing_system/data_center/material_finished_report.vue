/*
 * @Author: weifu.zeng 
 * @Date: 2018-10-25 16:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 14:56:33
 */

<template>
<div>
    <div class="box">
        <div class="table-title">
            {{template.name}}<span class="circle"></span>已选<span class="num">{{multipleSelection.length}}</span>个条目
        </div>

        <el-table 
            :data="tableData"  
            v-loading="loading" 
            element-loading-text="加载中,请稍后..."
            stripe
            border
            :header-cell-style="{'background-color':'#F5F7FA'}"
            >
            <el-table-column  width="150">
                <template slot="header" slot-scope="slot">
                    <el-checkbox v-model="selectAll" @change="selectAllchange">全选</el-checkbox>
                    <span class="batch-del">批量删除</span>
                </template>

                <template slot-scope="{row,column,$index}">
                    <el-checkbox v-model="row['checked']">全选</el-checkbox>
                </template>
            </el-table-column>

            <el-table-column label="报表名称">
                <template slot-scope="{row,column}" >FDS</template>
            </el-table-column>

            <el-table-column  min-width="150px"  label="状态" >
                <span slot-scope="{row,column}" >FDS</span>
            </el-table-column>

            <el-table-column  min-width="150px"  label="生成时间" >
                <span slot-scope="{row,column}" >FDS</span>
            </el-table-column>

            <el-table-column  min-width="150px"  label="数据时间范围" >
                <span slot-scope="{row,column}" >FDS</span>
            </el-table-column>

            <el-table-column  min-width="150px"  label="生成人" >
                <span slot-scope="{row,column}" >FDS</span>
            </el-table-column>

            <el-table-column  min-width="160px"  label="操作" >
                <span slot-scope="{row,column}" >
                    <span class="operation" @click="clickOperation('delete',row)">删除</span>
                    <span class="operation" @click="clickOperation('view',row)">查看</span>
                    <span class="operation" @click="clickOperation('export',row)">导出</span>
                </span>
            </el-table-column>
        </el-table>

    </div>
    
    <div class="footer">
        <el-pagination
            :pager-count="pageObj.pagerCount"
            :page-size="pageObj.pageSize"
            layout="total,sizes,prev, pager, next,jumper"
            :background="true"
            :total="pageObj.total"
            :current-page.sync="pageObj.currentPage"
            @size-change="(res)=>{funGetPage('size-change',res)}"
            @current-change="(res)=>{funGetPage('current-change',res)}"
        >
        </el-pagination>
    </div>
</div>
</template>

<script>
/*
    接口:
        获取物料报表列表:materialreportGetList

*/
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
export default {
    data () {
        return {
            loading:false,

            tableData:[
                {id:0,},
                {id:1,},
                {id:2,},
                {id:3,},
                {id:4,},
                {id:5,},
            ],
            template:{},                        //模板
            pageObj:{},
            taskTimer:{
                rList:'',                       //报表列表,
                export:'',                      //导出
            },
            selectAll:false,                    //全选
            multipleSelection:[],               //选中的列表
        };
    },
    methods: {
        selectAllchange(bool){
            if(bool){
                
            }else{

            }
        },
        clickOperation(sym,item){
            let {id,name} = item;
            switch(sym){
                case 'delete':
                    this.delTemplate(id);
                    break;
                case 'view':
                    this.$router.push({path:'/admin/dataCenter/viewReport',id});
                case 'export':
                
            }
            
        },
        //删除报表
        delTemplate(id){
            this.$confirm('确认删除该报表?', '操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.getHttp('del',{id});
            }).catch(() => {
            });
        },

		async funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
            }
        },




        //获取报表列表
        async getReportList(){
            let subObj = {
                page:this.pageObj.currentPage,
                size:this.pageObj.pageSize,
                beginTime:0,
                endTime:0
            };
            
            this.taskTimer.rList = Timer.add(
                async ()=>{
                    let tableData = await this.getHttp('materialreportGetList',subObj);
                    if(Array.isArray(tableData)){
                        
                        this.tableData = tableData;
                    }
                },
                5000,
                0,
                true,
                ()=>{
                    //失败时执行的函数   
                }
            );
        },





        initBtn(){
            this.$store.commit('setPageTools',[
                {
                    name: '批量删除',
                    type:'4',
                    className:'primary',
                    fn:()=>{

                        if(this.multipleSelection.length == 0){
                            this.alert('请先选择需要删除的报表!');
                            return;
                        }
                        //未完成的不可以删除
                        
                        this.$confirm('确认删除当前选中报表?', '操作提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            console.log('success');

                        }).catch(() => {
                            console.log('cancel');
                        });
                    }
                },
            ]);
        },




        //清除定时器
        clearTaskTimer(timer){
            if(this.taskTimer[timer]){
                Timer.clear(this.taskTimer[timer]);
                this.taskTimer[timer] = '';
            }
        },
        //获取地址栏参数
        getQuery(){
            let query = this.$route.query;
            this.template = {
                id:query.tempId,
                name:query.tempName
            };
        },
        //初始化分页组件
		initPageObj(){
			this.pageObj = {
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,          //当前页
			};
        },



        //获取表格任务
        async createTask(param){
            let {subDate,url,success,fail,time=3000} = param;
            let timer = '';
            let taskId = await this.getHttp(url,subDate);

            timer = Timer.add(
                ()=>{this.getTaskStatus(taskId,success,fail)},
                time,
                0,
                true,
                ()=>{
                    if(typeof fail == 'function') fail(taskId);                   
                }
            );
            return timer;
        },
        //获取任务状态
        async getTaskStatus(...param){
            let [taskId,success,fail] = param;
            try{
                let retData = await this.getHttp('invoicing_taskInfo',{taskId:taskId});
                switch(retData.status+''){
                    case '1'://进行中
                        break;
                    case '2'://失败
                        if(typeof fail == 'function') fail(taskId);                   
                        break;
                    case '3'://成功
                        if(typeof success == 'function') success(taskId);   
                }  
            }catch(e){
                if(typeof fail == 'function') fail(taskId);                                   
            }
        },
        
        //改变列表的某个属性值
        changeListAttrVal(list,attr,val){
            for(let ele of list){
                ele[attr] = val;
            }
        },        
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
        },
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
    },
    mounted(){
        this.getQuery();
        this.initPageObj();
        this.getReportList();
    },
    beforeRouteLeave(to,from,next){
        this.clearTaskTimer('rList');
        next();
    }
};
</script>

<style lang='less' scoped>
    .box{
        padding-top:15px;
    }
    .table-title{
        border:1px solid #EAEEF5;
        border-bottom:none;
        height:50px;
        line-height: 50px;
        color:#303133;
        font-size:14px;
        padding-left:15px;
        .circle{
            display:inline-block;
            vertical-align:middle;
            height: 6px;
            width: 5px;
            background-color: #666;
            border-radius: 50%;
            margin: 0 5px;
        }
        .num{
            color:#E1BB4A;
            margin:0 2px;
        }
    }
    .batch-del{
        margin-left:15px;
        cursor: pointer;
    }
    .operation{
        color:#E1BB4A;
        padding-right:15px;
        height:30px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
    }
    //底部分页
    .footer{
        margin-top:37px;
    }
</style>