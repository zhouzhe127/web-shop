<template>
	<!-- 百川-批量日志详情-曾伟福 -->
	<div id="batch_log_detail">
		<div class="page-head">批量审核日志</div>
		<div class="info">
			<li v-for="(item,index) in info" :key="index">{{item.label}}&nbsp;:&nbsp;{{item.value}}</li>
		</div>	

		<div class="table">
			<el-table :data="tableData" style="width: 100%" stripe :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column label="操作" align="center">
					<template slot-scope="props">
						<span class="view-detail">查看详情</span>
					</template>						
				</el-table-column>
				<el-table-column label="序号" align="center" prop="itemIndex"></el-table-column>
				<el-table-column label="申请单号" align="center" prop="applicationCode"></el-table-column>
				<el-table-column label="申请店铺/品牌" align="center" prop="applicationShop"></el-table-column>
				<el-table-column label="申请人" align="center" prop="applicant"></el-table-column>
				<el-table-column label="申请时间" align="center" prop="zh_applicationTime"></el-table-column>
			</el-table>
		</div>

		<div class="bottom">
		</div>
	</div>
</template>
<script>
/*
	请求:
		dispatchGetDispatchAuditLogDetailList:			//获取日志详情
	
	注意:
	
*/
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
			tableData:[],
			pageObj:{
				num: 10, 			// 每页展示的数量
				currentPage: 1, 	//当前展示的页数
				totalNum: 1, 		//总页数				
				listNum:0			//总记录数
			},
			info:[],                //头部信息
			logId:'',				//记录id
		};
	},
	props:{
		tab:{
			type:[String,Number],			//1:展示商品详情,0:展示物料详情
			default:1		
		}
	},
	async mounted(){
        this.initBtn();
		let res = await this.getHttp('dispatchGetDispatchAuditLogDetailList',{logId:1});
		if(this.isObject(res)){
			this.initInfo(res);		
			this.tableData = this.addItemIndex(res.list,this.initTableDataEle);
		}

	},
	methods: {
        initInfo(res){
			let obj = {};
			switch(this.tab+''){
				case '1':
					obj.type = res.type;
					obj.userName = res.createUName;
					obj.createTime = this.generatorDate(res.createTime * 1000);
					obj.createTime = obj.createTime.str;
					obj.list = [{label:'操作类型',value:obj.type},{label:'操作人',value:obj.userName},{label:'操作时间',value:obj.createTime}];
					break;
			}
            this.info = obj.list;
        },
        linkUrl(flag,item){

		},
		initTableDataEle(ele){
			//初始化数组里面的元素
			let date = this.generatorDate(ele.applicationTime * 1000);
			ele.zh_applicationTime = date.str;
		},
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '返回',
					style:{height:'40px','border':'1px solid #ccc','background-color':'#fff','color':'#999'},
					fn:()=>{
						this.$router.go(-1);
					}
				}
			]);
		},



		addItemIndex(list,fn) {
			if(!Array.isArray(list)) list = [];
			//给列表添加序号
			for(let i = 0; i < list.length; i++) {
				// let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.num + 1 + i;
				// list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
				fn(list[i]);
			}
			return [...list];
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
	},
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
#batch_log_detail{
	.page-head{
		.split-div(80%);
	}
	.view-detail{
		color:@b;
		cursor: pointer;
	}
	li{
		list-style: none;
	}
	@table-border:1px solid #ebeef5;

	.info{
		padding-top:30px;
		padding-left:40px;
		padding-bottom:10px;
		display: flex;
		li{
			.whb(30%,40px,none);
			color:#333;
			font-size:16px;
		}	
	}
	
    .table{
		border:@table-border;
		border-bottom:none;
		border-radius:4px;
		width:90%;
    }
	.bottom{
		padding-top:10px;
		padding-bottom: 15px;
    }
}
</style>