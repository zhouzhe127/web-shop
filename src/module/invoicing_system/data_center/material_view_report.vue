<template>
    <div>
        <div class="search-header">
            <div class="in-block" >
                <el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="80" style="width:224px"></el-input>
            </div>
            <div class="in-block">
                <el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="50" style="width:224px"></el-input>
            </div>
            <div class="in-block" style="padding-left:10px;">
                <el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
                <el-button type="info" @click="filterReset('reset',null)">重置</el-button>
            </div>
        </div>

        <div class="table">
            <el-table :data="tableData"  
                v-loading="false" 
                element-loading-text="加载中,请稍后..."
                stripe 
                border 
                :header-cell-style="{'background-color':'#F5F7FA'}"
                @header-click="headerClick"
                :row-key="getRowKeys"
                :expand-row-keys="rowExpand.expands"
            >

                <el-table-column type="expand" :label="rowExpand.label" fixed="left" width="100px;">
                    <template slot-scope="{row,column,$index}">
                        <div class="search-header">
                            <div class="in-block" >
                                <el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="80" style="width:224px"></el-input>
                            </div>
                            <div class="in-block">
                                <el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="50" style="width:224px"></el-input>
                            </div>
                            <div class="in-block" style="padding-left:10px;">
                                <el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
                                <el-button type="info" @click="filterReset('reset',null)">重置</el-button>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column type="自定义分类" label="自定义分类" fixed="left">
                    <template slot-scope="{row,column,$index}">
                        分类一
                    </template>
                </el-table-column>
                
                <template v-for="i in 5">
                    <el-table-column v-if="i == 3" type="自定义分类" label="自定义分类" :key="i" min-width="150px">
                        <template slot-scope="{row,column,$index}">
                            分类二
                        </template>
                    </el-table-column>
                    <el-table-column v-else type="自定义分类" label="自定义分类" :key="i" min-width="150px">
                        <template slot-scope="{row,column,$index}">
                            分类一
                        </template>
                    </el-table-column>
                </template>



                <el-table-column  min-width="150px"  label="物料名称">
                    <span slot-scope="{row,column}">das</span>
                </el-table-column>

                <el-table-column  min-width="150px" label="物料编码" >
                    <span slot-scope="{row,column}">das</span>                    
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
<style lang='less' scoped>
    .in-block{
        margin-bottom:20px;
        display: inline-block;             
    }
    //筛选
    .search-header{
        margin-top:20px;
        max-width: 1436px;
    }
    //底部分页
    .footer{
        margin-top:37px;
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
            pageObj:{},
            condition:{},
            rowExpand:{
                label:'展开'
            },                           //表格单元行的展开与收起
            tableData:[
                {id:'0',},
                {id:'1',},
                {id:'2',},
                {id:'3',},
                {id:'4',},
                {id:'5',},
                {id:'6',},
            ],
        };
    },
    methods: {
        filterReset(sym,page){
            if(sym == 'reset'){
                this.initCondition();
                this.initPageObj();
            }else{
                this.pageObj.currentPage = page | 1;
            }
            this.initRowExpand();            

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

        //点击表格头部
        headerClick(column, event){
            let rowExpand = this.rowExpand;
            if(column.label == rowExpand.label){
                rowExpand.toggle = !rowExpand.toggle;

                rowExpand.label = rowExpand.toggle ? '收起' : '展开';
                
                if(rowExpand.toggle){
                    rowExpand.expands = this.getAttr(this.tableData,'id');
                }else{
                    rowExpand.expands = [];
                }
            }
        },
        //给表格的行添加key
        getRowKeys(row) {
            return row.id;
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
        initCondition(){
            this.condition = {
                name:'',
                code:''
            };
        },
        initBtn(){
            this.$store.commit('setPageTools',[
                {
                    name: '导出',
                    type:'4',
                    className:'primary',
                    fn:async ()=>{

                    }
                },
            ]);
        },
        initRowExpand(){
            this.rowExpand = {
                toggle:false,
                expands:[],
                label:'展开',
            };
        },





        //生成时间对象
		generatorDate(time){
			//生成日期对象
			let date = {};
			if(!time){
				time = new Date();
			}else if(typeof time == 'number' || typeof time == 'string'){
				time = Number(time);
				time = new Date(time);
			}
			date = {
				year: time.getFullYear(),
				month: time.getMonth(),
				day: time.getDate(),
				hour: time.getHours(),
				minute: time.getMinutes(),
				second:time.getSeconds(),
				week:0,
				str:'',
                time:'',
                dateTime:'',          
			}
			let {year,month,day,hour,minute} = date;
            month += 1;
			hour = hour > 9 ? hour : '0'+hour;
			minute = minute > 9 ? minute : '0'+minute;
            date.time = `${hour}:${minute}`;
            date.dateTime = `${year}-${month}-${day}`;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
		},
        //获取每一项的某个属性
        getAttr(list,attr='id'){
            let temp = list.map((ele)=>{
                return ele[attr];
            });
            return temp;
        },
        //获取表格任务
        async createTask(param){
            let {subDate,url,success,fail} = param;
            let timer = '';
            let taskId = await this.getHttp(url,subDate);

            timer = Timer.add(
                ()=>{this.getTaskStatus(taskId,success,fail)},
                3000,
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
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
        },

    },
    mounted(){
        this.initBtn();
        this.filterReset('reset');
    },
    components: {

    },
};
</script>