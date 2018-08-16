<template>
	<!-- 百川-批量调度日志,批量审核日志-曾伟福 -->
	<div id="batch_log">
        <div class="nav">
            <el-button-group>
                <el-button @click="linkPage(item)" :type="item.class" v-for="(item,index) in tabList" :key="index">{{item.label}}</el-button>
            </el-button-group>
        </div>

        <div class="main">
			<div class="table">
				<div class="table-head">
					批量调度日志<i class="circle"></i>共 <span class="num">70</span> 个条目
				</div>

				<el-table :data="tableData" style="width: 100%" stripe v-if="tab == 1">
					<el-table-column label="操作" align="center">
						<template slot-scope="props">
							<span class="view-detail">查看详情</span>
						</template>						
					</el-table-column>
					<el-table-column label="序号" align="center" prop="index"></el-table-column>
					<el-table-column label="出货仓库" align="center" prop="index"></el-table-column>
					<el-table-column label="操作人" align="center" prop="index"></el-table-column>
					<el-table-column label="操作时间" align="center" prop="index"></el-table-column>
				</el-table>

				<el-table :data="tableData" style="width: 100%" stripe v-if="tab == 2">
					<el-table-column label="操作" align="center">
						<template slot-scope="props">
							<span class="view-detail">查看详情</span>
						</template>						
					</el-table-column>
					<el-table-column label="序号" align="center" prop="itemIndex"></el-table-column>
					<el-table-column label="操作类型" align="center" prop="type"></el-table-column>
					<el-table-column label="操作人" align="center" prop="createUName"></el-table-column>
					<el-table-column label="申请时间" align="center" prop="zh_createTime"></el-table-column>
				</el-table>
			</div>
        </div>

        <div class="footer">
			<el-pagination
				:pager-count="pageObj.pagerCount"
				:page-size="pageObj.pageSize"
				layout="sizes,prev, pager, next"
				:background="true"
				:total="pageObj.total"
				@size-change="(res)=>{funGetPage('size-change',res)}"
				@current-change="(res)=>{funGetPage('current-change',res)}"
			>
			</el-pagination>
        </div>
	</div>
</template>
<script>
/*
	请求:
		dispatchGetDispatchAuditLogList			//获取审核日志
	注意:
	
*/
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
            tableData:[],
            tabList:[],             
			pageObj:{
				total:0,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
				currentPage:1,
			},
			logId:'',				//记录id
		};
	},
	props:{
		tab:{
			type:[String,Number],			//1:展示商品详情,0:展示物料详情
			default:2		
		}
	},
	async mounted(){
		this.initTabList();
		this.getList();
    },
    watch:{
        tab:function(){
            this.initTabList();
			this.getList();
        }
    },
	methods: {
        initTabList(){
            let arr = [
                {tab:1,list:[{label:'批量调度',class:'primary'},{label:'批量审核',class:''}]},
                {tab:2,list:[{label:'批量调度',class:''},{label:'批量审核',class:'primary'}]},
            ];
            for(let ele of arr){
                if(ele.tab == this.tab){
                    this.tabList = ele.list;
                    break;
                }
            }
        },

		linkPage(item){
			//tab切换
		},
		funGetPage(flag,res){
			//获取页码值
			if(flag == 'size-change'){
				this.pageObj.pageSize = res;				
			}else{
				this.pageObj.currentPage = res;
			}
			this.getList();
		},
		async getList(){
			let obj = {};
			switch(this.tab+''){
				case '1':

					break;
				case '2':
					obj = await this.getHttp('dispatchGetDispatchAuditLogList',{
						page:this.pageObj.currentPage,
						size:this.pageObj.pageSize
					});
					if(this.isObject(obj)){
						this.pageObj.total = obj.count;
						this.tableData = obj.list;

						this.tableData = this.tableData.map((ele,index)=>{
							let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.pageSize + index + 1;
							ele.itemIndex = itemIndex > 9 ? itemIndex : '0' + itemIndex;

							let date = this.generatorDate(ele.createTime * 1000);
							ele.zh_createTime = date.str;	
							return ele;						
						});
					}
					break;				
			}
			
		},



		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		isPrimitive (value) {
			return ( typeof value === 'string' || typeof value === 'number');
		},
		isObject(value){
			return (value && typeof value == 'object');
		},
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
				str:''          
			}
			let {year,month,day,hour,minute} = date;
			month += 1;
			hour = hour > 10 ? hour : '0'+hour;
			minute = minute > 10 ? minute : '0'+minute;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
		},
	},
	components: {
		tableCom:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
		page: () =>import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
	},
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
@table-border:1px solid #ebeef5;
.inline-middle{
	display: inline-block;
	vertical-align: middle;
	text-align: center;
}
.view-detail{
	color:@b;
	cursor: pointer;
}
#batch_log{
    .nav{

    }
    .main{
		margin-top:20px;
		.table{
			border:@table-border;
			border-bottom:none;
			border-radius:4px;
			width:90%;
			.table-head{
				height:40px;
				padding-left:20px;
				border-bottom:@table-border;
				.lfc(#333,40px,16px);
				.circle{
					.inline-middle;
					.whb(5px,5px,none);
					background-color: #666;
					border-radius: 50%;
					margin: 0 5px;
				}
				.num{
					color:@r;
					font-size:16px;
				}
			}
		}
    }
    .footer{
		margin-top:30px;
    }
}
</style>