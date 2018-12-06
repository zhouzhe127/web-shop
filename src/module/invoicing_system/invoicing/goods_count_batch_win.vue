<template>
	<win :height="500" :width="1024" :ok="btnOk" :cancel="btnCancel" @winEvent="closeWin">
		<span slot="title">{{title}}</span>
		<div class="content" slot="content">
			<div class="head">
				<li class="info" v-for="(item,index) in info" :key="index">{{item.name}}:{{item.val}}</li>
			</div>

			<div class="nav">
				<div class="in-block">
					<el-input v-model="condObj.batchCode" placeholder="请输入批次编号" class="input-txt" maxlength="40"></el-input>
					<el-input v-model="condObj.supplier" placeholder="请输入供应商" class="input-txt" maxlength="40"></el-input>
				</div>
				<div class="in-block marginL-10">
					<el-date-picker
						v-model="timeData"
						type="daterange"
						range-separator="-"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						:clearable="false"
						unlink-panels
						@change="getTime">
					</el-date-picker>
				</div>
				<div class="in-block" style="margin:0">
					<el-button type="primary" @click="clickBtn('filter')">筛选</el-button>
					<el-button type="info" @click="clickBtn('reset')">重置</el-button>
				</div>
			</div>

			<div class="table">
				<div class="title">
					<li v-for="(item,index) in tableTitle" :key="index" :style="item.style ? item.style : {}">
						{{item.name}}
						<span v-if="tableTitle.length-1 == index" class="clearInput" @click="clearInput">清空输入</span>
					</li>
				</div>

				<div class="body">
					<div class="row" v-for="(row,rowIndex) in nowTableData" :key="rowIndex">
						<li v-for="(item,index) in tableTitle" :key="index" :style="item.style ? item.style :{}">
							<slot :name="'col-'+index" :item="item" :index="index">
								<div class="input-div" v-if="tableTitle.length-1 == index">
									<input type="text" v-model="row.countNum" class="count-num" @input="checkNum(row)" placeholder="请输入数字" maxlength="9">
									<span class="unit">{{row.unit}}</span>
								</div>	
								<span v-else>
									{{row[item.dataName]}}
								</span>							
							</slot>
						</li>
					</div>
					<div class="tips-div" v-if="nowTableData.length == 0">
						{{tips}}
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import utils from 'src/verdor/utils';
export default {
	data () {
		return {
			timeData:[],
			startTime:{
				time:'',               //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,             //是否展示时分秒控件(默认显示)
				detail:true,           //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160,             //输入框的宽  默认200px                
				tips:'请选择开始时间',
				flag:true				//是否需要加上时间限制,true:不根据时间搜索
			},
			endTime:{
				time:'',                //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,              //是否展示时分秒控件(默认显示)
				detail:true,            //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160,               //输入框的宽  默认200px                
				tips:'请选择结束时间',
			},
			condObj:{
				supplier:'',			//供应商
				batchCode:'',			//批次编号
			},
			tableTitle:[
				{name:'序号',style:{'width':'5%'},dataName:'itemIndex'},
				{name:'批次编号',style:{'width':'11.8%'},dataName:'batchCode'},
				{name:'生产日期',style:{'width':'13.54%'},dataName:'productionTimeShow'},
				{name:'供应商',style:{'width':'18.5%'},dataName:'supplier'},
				{name:'所属仓库',style:{'width':'18.36%'},dataName:'storeName'},
				{name:'数量/重量',style:{'width':'13.54%'},dataName:'resetNum'},
				{name:'盘库库存量',style:{'width':'18.5%'},dataName:'countNum'},
			],
			tableData:[],
			nowTableData:[],			//当前展示的批次
		};
	},
	props:{
		list:{
			type:Array,
			default:Array,
			required:true
		},
		title:{
			type:String,
			default:'选择批次'
		},
		btnOk:{
			type:Object,
			default:function(){
				return {
					content:'确定',
				};
			}
		},
		btnCancel:{
			type:Object,
			default:function(){
				return {
					content:'取消',
				};
			}           
		},
		tips:{
			type:String,
			default:'无批次信息'
		},
		info:{
			type:Array,
			default:Array
		},
	},
	methods: {
		closeWin(res){
			let arr = [];
			if(res == 'ok'){
				arr = utils.deepCopy(this.nowTableData);
			}
			this.$emit('emitEvent',arr,res);
		},


		clickBtn(flag){
			//当flash为true时,不根据时间筛选
			if(flag == 'reset'){
				this.initDateTime();
				this.condObj = {
					supplier:'',			
					batchCode:''
				};
			}
			this.nowTableData = this.searchList(this.tableData);
		},
		searchList(list=[]){
			let temp = [],
				attrA = 'batchCode',
				attrB = 'supplier';

			if(!this.startTime.flag){
				temp = this.searchListByTime(list);
			}else{
				temp = [...list];
			}
			temp = this.searchListByFiled(temp,attrA,this.condObj[attrA]);
			temp = this.searchListByFiled(temp,attrB,this.condObj[attrB]);
			temp = this.addItemIndex(temp);
			return temp;
		},
		searchListByTime(list){
			let arr = [],
				attrA = 'productionTime';

			arr = list.filter((ele)=>{
				let nowTime = '';

				nowTime = Number(ele[attrA])*1000;
				if(this.startTime.time < nowTime && nowTime < this.endTime.time){
					return true;
				}				
			});
			return arr;
		},
		searchListByFiled(list,attr,val){
			let arr = [];
			val = val.trim();
			if(!val){
				return [...list];
			}
			arr = list.filter((ele)=>{
				let str = ele[attr]+'';
				if(str.includes(val)){
					return true;
				}
			});
			return arr;
		},

		clearInput(){
			//清空输入
			this.nowTableData = this.nowTableData.map((ele)=>{
				ele.countNum = '';
				return ele;
			});
		},
		checkNum(item){
			if(item.canWrite) return;
			let num = item.countNum+'',
				reg = /([1-9]\d{0,9})|0/g,						//普通菜
				reg2 = /([1-9]\d{0,9}|0)\.?(\d{0,3})?/g,		//称重菜
				temp = [];

			num = num.trim();
			num = num.slice(0,30);

			if(item.type == 0){
				//普通菜
				temp = num.match(reg);
			}else{
				//称重菜
				temp = num.match(reg2);
			}

			if(!temp){
				temp = [];
				temp[0] = '';
			} 

			if(temp[0]){
				if(Number(temp[0]) < 0){
					temp[0] = 0;
				}

			}
			temp[0] += '';
			item.countNum = temp[0];
		},
		getTime(res){
			this.startTime.time = new Date(res[0]).setHours(0,0,0,0);
			this.endTime.time = new Date(res[1]).setHours(23,59,59,0);
			this.startTime.flag = false;
		},
		initDateTime(){
			let date = {};
			this.endTime.time = Date.now();
			
			date = this.generatorDate(this.endTime.time);
			this.startTime.time = new Date(date.year,date.month,1,0,0,0).getTime();

			this.startTime.tips = '请选择开始时间';
			this.endTime.tips = '请选择结束时间';
			this.startTime.flag = true;
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
		addItemIndex(list) {
			//给列表添加序号
			for(let i = 0; i < list.length; i++) {
				let itemIndex = 1 + i;
				list[i].itemIndex = itemIndex >= 10 ? itemIndex : '0' + itemIndex;
			}
			return list;
		},
		initData(){
			this.tableData = this.list;
		}
	},
	mounted(){
		this.initDateTime();
		this.initData();
		this.clickBtn('reset');
	},
	components: {
		win:()=>import (/*webpackChunkName:'win'*/'src/components/win_element'),
		calendar: () =>import(/*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),

	},
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
li{
	list-style: none;
}
.marginL-10{    
	margin-left:-8px;
}
.content{
	padding:25px 20px;
	height:100%;
	.head{
		.info{
			display: inline-block;
			width:30%;
			text-align: left;
			font-size: 16px;
			color:#333333;
		}
		padding-bottom:25px;
	}
	.nav{
		.in-block{
			display: inline-block;
			margin-right:7px;
			vertical-align: top;
			.line{
				display: inline-block;
				.whb(10px,20px);
				border-top:1px solid #ccc;
			}
			.font{
				font-size:16px;
			}
			.input-txt{
				width: 160px;
				font-size:14px;
				margin-right: 10px;
			}
		}
		padding-bottom:20px;
	}
	.table{
		@border:1px solid #d5d5d5;
		.title{
			border-top:@border;
			border-bottom:@border;
			li{
				text-align: center;
				float:left;
				font-size: 14px;
				color:#333333;
				height:40px;
				border-right:@border;
				line-height: 40px;
				.text-ellipsis;
				padding:0 5px;				
				&:last-child{
					border-right:none;
				}
			}
			&:after{
				.clear;
			}
		}
		.clearInput{
			color:@r;
			text-decoration: underline @r;
			font-size:14px;
			cursor: pointer;
		}
		.body{
			height:255px;
			overflow-y: auto;
			.row{
				border-bottom: @border;
				vertical-align: middle;
				li{
					height:60px;
					line-height: 60px;
					text-align: center;
					color: #666666;
					display: inline-block;
					vertical-align: middle;
					padding:0 5px;
					.text-ellipsis;
				}
				.input-div{
					display: inline-block;
					background-color: #fff;
					vertical-align: middle;
					.count-num{
						.whb(100px,38px);
						float:left;
						outline: none;
						padding:0 5px;
						border:@border;
						border-right: 0;
						border-top-left-radius: 4px;
						border-bottom-left-radius: 4px;
					}
					.unit{
						.whb(40px,38px);
						float:left;
						border:@border;
						text-align: center;
						line-height: 38px;
						border-top-right-radius: 4px;
						border-bottom-right-radius: 4px;
						background: #f5f7fa;
					}
				}
			}
			.tips-div{
				height:100%;
				text-align:center;
				.lfc(#666,200px,20px);
			}
		}
	}
}
	

</style>