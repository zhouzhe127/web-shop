<template>
	<!-- 百川-商品盘库-曾伟福 -->
	<div id="goods-count">
		<div class="page-head">盘库记录详情</div>
		<div class="info">
			<li>记录编号&nbsp;:&nbsp;{{info.code}}</li>
			<li>操作时间&nbsp;:&nbsp;{{info.createTimeZh}}</li>
			<li>操作人&nbsp;:&nbsp;{{info.createUName}}</li>
		</div>	
		<div>
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
			<div slot-scope="{data,index}" slot="con-6">
				<span class="arrow" :class="{'arrow-up':data.arrow,'arrow-down':!data.arrow}"></span>
				{{data.change}}
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
		invoicingGetCheckInventoryLogDetail:获取详情,后台根据id区分商品与物料
	
	注意:
	
*/
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
			tableTitle:[
				{titleName:'序号',dataName:'itemIndex'},
				{titleName:'商品名',dataName:'itemName'},
				{titleName:'条码',dataName:'barCode'},
				{titleName:'仓库所属',dataName:'storeName'},
				{titleName:'盘库前',dataName:'before'},
				{titleName:'盘库后',dataName:'after'},
				{titleName:'变化量',dataName:'change'},
			],
			tableData:[],
			pageObj:{
				num: 10, 			// 每页展示的数量
				currentPage: 1, 	//当前展示的页数
				totalNum: 1, 		//总页数				
				listNum:0			//总记录数
			},
			info:{},
			logId:'',				//记录id
		};
	},
	props:{
		tab:{
			type:[String,Number],			//1:展示商品详情,0:展示物料详情
			default:1		
		}
	},
	activated(){
		this.initBtn();
	},
	async mounted(){
		if(this.isPrimitive(this.$route.query.id)){
			this.logId = this.$route.query.id;
		}
		this.initBtn();

		this.getData();
	},
	beforeRouteLeave(to,from,next){
		// switch(this.tab+''){
		// 	case '1':
		// 		if(to.meta.com != 'goodsCountHistory' && this.route.meta.com == 'goodsCountHistory'){
					
		// 			console.log('a');
		// 		}
		// 		break;
		// 	case '2':
		// 		if(to.meta.com != 'materialCountHistory' && this.route.meta.com == 'materialCountHistory'){
		// 			console.log('b');
		// 		}
		// 		break;
		// }
		// console.log(from === this.$route);
		delete this.$route.query.id;
		next();
	},
	methods: {
		async getData(){
			let subObj={},
				retData = {};

			subObj = {
				logId:this.logId,
				page:this.pageObj.currentPage,
				size:this.pageObj.num
			};
			retData = await this.getHttp('invoicingGetCheckInventoryLogDetail',subObj);

			if(Array.isArray(retData.list)){
				this.tableData = retData.list;
				this.tableData = this.addItemIndex(this.tableData);
			}

			if(this.tab == 2 && retData.unit){
				//物料
				for(let ele of this.tableData){
					for(let itemId in retData.unit){
						if(ele.itemId == itemId){	
							let unitArr = [],				//当前物料的单位列表
								countId = '';				//物料盘库时的选择的单位id

							countId = ele.unitId;
							unitArr = retData.unit[itemId];
							ele.unitInfo = this.getMaterilaUnitInfo(unitArr,countId);
							break;
						}
					}
				}
			}

			this.initTableData();

			//记录编号,时间,操作人等信息
			if(utils.type(retData.logDetail) == 'object'){
				this.info = retData.logDetail;

				let time = '',
					date = {},
					str = '';

				time = Number(this.info.createTime)*1000;
				date = this.generatorDate(time);
				
				date.hour = date.hour > 9 ? date.hour : '0'+date.hour;
				date.minute = date.minute > 9 ? date.minute : '0'+date.minute;
				str = `${date.year}-${date.month+1}-${date.day} ${date.hour}:${date.minute}`;

				this.info.createTimeZh = str;
			}

			//页码与总数
			this.pageObj.totalNum = retData.total || 0;
			this.pageObj.listNum = retData.count || 0;
		},
		initTableData(){	
			//初始化数据
			switch(this.tab+''){
				case '1'://商品详情
					this.tableData = this.tableData.map((ele)=>{
						ele.arrow = Number(ele.after) > Number(ele.before);
						ele.before = `${ele.before}${ele.unitName}`;
						ele.after = `${ele.after}${ele.unitName}`;
						ele.storeName = `${ele.wName}/${ele.aName}`;
						ele.change = `${ele.change}${ele.unitName}`;
						return ele;
					});	

					break;
				case '2'://物料详情
					this.tableTitle = [
						{titleName:'序号',dataName:'itemIndex'},
						{titleName:'物料名称',dataName:'itemName'},
						{titleName:'物料简码',dataName:'barCode'},
						{titleName:'仓库所属',dataName:'storeName'},
						{titleName:'盘库前',dataName:'before'},
						{titleName:'盘库后',dataName:'after'},
						{titleName:'变化量',dataName:'change'},
					];
					this.tableData = this.tableData.map((ele)=>{
						ele.arrow = Number(ele.after) > Number(ele.before);
						ele.before = global.comUnit(Number(ele.before),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.after = global.comUnit(Number(ele.after),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.change = global.comUnit(Number(ele.change),ele.unitInfo.countUnitVal, ele.unitInfo.countUnitName, ele.unitInfo.minName);
						ele.storeName = `${ele.wName}/${ele.aName}`;
						return ele;
					});	
					break;
			}
		},
		getMaterilaUnitInfo(unit=[],unitId){
			let obj ={};
			for(let ele of unit){
				if(ele.isMin == 1){
					obj.minName = ele.name;
					obj.minVal = ele.value;
				}
				if(ele.isDefault == 1){
					obj.defName = ele.name;
					obj.defVal = ele.value;
				}
				if(ele.muId == unitId){
					obj.countUnitName = ele.name;
					obj.countUnitVal = ele.value; 
				}
			}
			return obj;
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
			this.getData();
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
#goods-count{
	.page-head{
		.split-div(80%);
	}

	.info{
		padding:30px 0 30px 40px;
		li{
			list-style: none;
			width:30%;
			display: inline-block;
			.lfc(#333,16px,16px);				
		}	
	}
	.bottom{
		padding-top:10px;
		padding-bottom: 30px;
	}
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
}
</style>