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
					<el-table-column label="申请时间" align="center" prop="index"></el-table-column>
				</el-table>

				<el-table :data="tableData" style="width: 100%" stripe v-if="tab == 2">
					<el-table-column label="操作" align="center">
						<template slot-scope="props">
							<span class="view-detail">查看详情</span>
						</template>						
					</el-table-column>
					<el-table-column label="序号" align="center" prop="index"></el-table-column>
					<el-table-column label="操作类型" align="center" prop="index"></el-table-column>
					<el-table-column label="操作人" align="center" prop="index"></el-table-column>
					<el-table-column label="申请时间" align="center" prop="index"></el-table-column>
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
			tableTitle:[],
            tableData:[
				{a:'操作',b:'1',c:'仓库一',d:'张飞',e:'2018-12-23'},
				{a:'操作',b:'1',c:'仓库一',d:'张飞',e:'2018-12-23'},
				{a:'操作',b:'1',c:'仓库一',d:'张飞',e:'2018-12-23'},
				{a:'操作',b:'1',c:'仓库一',d:'张飞',e:'2018-12-23'},
			],
            tabList:[],             
			pageObj:{
				total:1000,				//总记录数
				pageSize:10,			//每页显示的记录数
				pagerCount:11,			//每页显示的按钮数
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
	mounted(){
        this.initTabList();
        this.initTableTitle();
    },
    watch:{
        tab:function(){
            this.initTabList();
            // this.initTableTitle();
        }
    },
	methods: {
        initTableTitle(){
            let tableTitle = [];
            switch(this.tab+''){
                case '1':
                    tableTitle = [
                        {label:'操作',prop:'a','cellClass':'view-detail'},
                        {label:'序号',prop:'b',},
                        {label:'出货仓库',prop:'c'},
                        {label:'操作人',prop:'d'},
                        {label:'申请时间',prop:'e'},
                    ];
                    break;
                    tableTitle = [
                        {label:'操作',prop:'itemIndex'},
                        {label:'序号',prop:'itemName'},
                        {label:'操作类型',prop:'barCode'},
                        {label:'操作人',prop:'storeName'},
                        {label:'申请时间',prop:'after'},
                    ];
                    break;
            }
            this.tableTitle = tableTitle;
        },

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
			console.log(flag);
			console.log(res);
		},
		async getList(){
			let res = await this.getHttp('dispatchGetDispatchAuditLogList');
			
		},



		addItemIndex(list) {
			//给列表添加序号
			for(let i = 0; i < list.length; i++) {
				let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.num + 1 + i;
				list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
			}
			return list;
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		isPrimitive (value) {
			return ( typeof value === 'string' || typeof value === 'number');
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