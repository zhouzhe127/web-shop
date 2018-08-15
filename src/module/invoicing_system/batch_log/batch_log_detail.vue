<template>
	<!-- 百川-批量日志详情-曾伟福 -->
	<div id="batch_log_detail">
		<div class="page-head">批量审核日志</div>
		<div class="info">
			<li v-for="(item,index) in info" :key="index">{{item.label}}&nbsp;:&nbsp;{{item.value}}</li>
		</div>	
		<div class="table">
			<table-com
				:showHand="false" 
				:titleHeight='50' 
				:showTitle="1" 
				:titleData="tableTitle" 
				:fixed="2" 
				:widthType="true" 
				:introData="tableData" 
				:listWidth="1200"
				:bannerStyle="{color:'#333','fontSize':'16px'}"
				:mainBox="{color:'#666'}"
				:listHeight="70"
			>
			<div slot-scope="{data,index}" slot="con-0">
                <span class="view-detail" @click="linkUrl('detail',item)">查看详情</span>
			</div>
			</table-com>
		</div>

		<div class="bottom">
			<page @pageNum="funGetPageNum" :page="pageObj.currentPage" :total="pageObj.totalNum" :num='pageObj.num' :isNoPaging='true'></page>
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
			tableTitle:[],
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
	mounted(){
        this.initBtn();
        this.initInfo();
        this.initTable();
	},
	methods: {
        initInfo(){
            let arr = [
                {tab:1,list:[{label:'操作类型',value:'批量审核并出货'},{label:'操作人',value:'--'},{label:'操作时间',value:'--'}]},
            ];
            arr.some((ele)=>{
                if(ele.tab == this.tab){
                    this.info = ele.list;
                    return true;
                }
            });
        },
        initTable(){
            let tableTitle = [];
            switch(this.tab+''){
                case '1':
                    tableTitle = [
                        {titleName:'操作',dataName:'itemIndex'},
                        {titleName:'序号',dataName:'itemName'},
                        {titleName:'申请单号',dataName:'barCode'},
                        {titleName:'申请店铺/品牌',dataName:'storeName'},
                        {titleName:'申请人',dataName:'before'},
                        {titleName:'申请时间',dataName:'after'},
                    ];
                    break;
            }
            this.tableTitle = tableTitle;
        },
        linkUrl(flag,item){

        },



		addItemIndex(list) {
			//给列表添加序号
			for(let i = 0; i < list.length; i++) {
				let itemIndex = (this.pageObj.currentPage - 1) * this.pageObj.num + 1 + i;
				list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
			}
			return list;
		},
		funGetPageNum(obj){
			this.pageObj.num = obj.num;
			this.pageObj.currentPage = obj.page;

		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
		isPrimitive (value) {
			return ( typeof value === 'string' || typeof value === 'number');
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
				week:0            
			};
			return date;
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
		}
	},
	components: {
		tableCom:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
		page: () =>import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
	},
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
#batch_log_detail{
	.page-head{
		.split-div(80%);
	}

	.info{
		padding:30px 0 30px 40px;
		li{
			list-style: none;
			width:30%;
            display: inline-block;
            padding-bottom:15px;
			.lfc(#333,16px,16px);				
		}	
    }
    .table{
        .view-detail{
            color:@b;
        }
    }
	.bottom{
		padding-top:10px;
		padding-bottom: 15px;
    }

    /*
        .arrow{
            display: inline-block;
            height: 16px;
            width: 8px;
            vertical-align: middle;
        }
        .arrow-up{
            background: url('../../../res/images/arrow-up.png') no-repeat;
        }
        .arrow-down{
            background: url('../../../res/images/arrow-down.png') no-repeat;		
        }
    */
}
</style>