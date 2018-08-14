<!--
	**领料列表
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="pickingRecord">
		<section class="div_wai">
			<span  class="span_type" :class='Number(numType)?"sel_false":"sel_true"' @click="changeType(0)">领料记录</span>
			<span  class="span_type" :class='Number(numType)?"sel_true":"sel_false"' @click="changeType(1)">领料人</span>
		</section>
		<section v-if="!Number(numType)">
		<div class="filter">
				<div class="wenZi">
					操作时间：
				</div>
				<div class="input-box">
							<!--日期组件 开始时间-->
							<calendar :time="startTime" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
				</div>
				 <span class="input-word">-</span>
				 <div class="input-box input-start">
							<!--日期组件 开始时间-->
							<calendar :time="endTime" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				 </div><span class="order-order-searchA"><span v-on:click="searchTime()" class="order-order-search"></span></span>
				<section class="top-box">
					<selectBtn @emit="selectType"  :sorts="options" :index="type" class="select-btn">
					</selectBtn>
				</section>
					<!--搜索 重置-->
					<div class="enquiries">
						<input class="numbering" type="text" placeholder="请输入操作人"  v-model = "creatorName" maxlength="5"/>
						<a href="javascript:;" style="background: #2EA8DC;" @click = "searchTime()">筛选</a>
						<a href="javascript:;" style="background: #B3B3B3;" @click="reset()">重置</a>
					</div>
		</div>
		<div class="clear"></div>
		<div class="list_num">
			<com-table :listName="'领料记录'" :titleData="titleList" :allTotal="rows" :introData="currentList">
				<div slot="con-0" slot-scope="props" style="cursor: pointer;color: #27A8E0" @click="toSee(props.data)">查看详情</div>
				<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
				<span slot="con-2" slot-scope="props">{{props.data.type==1?'领料':'领料盘库'}}</span>
				<span slot="con-4" slot-scope="props">{{transformTime(props.data.createTime)}}</span>
			</com-table>
			<section style="margin-top: 10px">
				<pageElement
						@pageNum="pageChange" :page="Number(page)" :total="Number(total)"  :isNoJump="true" :numArr="[10,20,30]"
				></pageElement>
			</section>
		</div>
		</section>
		<picker
				v-if="Number(numType)"
				@throwWinResult="doThrowTanResult"
		>
		</picker>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage  from 'src/verdor/storage';
	import utils  from 'src/verdor/utils';
	export default{
		data(){
			return{
				userData:Object,
				isShow: false, //领料人详情显示
				numType:0,
				startTime:new Date().setHours(0,0,0,0),
				endTime:new Date().setHours(23,59,59,999),
				creatorName:'',   //操作人
				options:['全部操作类型','领料','领料盘库'],
				type:0,           //对应循序  1:领料,2:领料盘库
				currentList:[],
				rows:0,      //记录总条数
				num: 10,    //一页处理多少数据
				total: 0,    //总页数
				page: 1,     //当前第几页
				titleList: [
					{titleName: '操作'},
					{titleName:'序号'},
					{titleName:'操作类型'},
					{titleName:'操作人',dataName:'creatorName'},
					{titleName:'操作时间'},
				],
			};
		},
		mounted(){
			if(storage.session('numType')){
				this.numType = storage.session('numType').num;
			}
			this.userData=storage.session('userShop');
			this.initBtn();
			this.init();
			storage.session('numType',{num:0});
		},
		destroyed(){
			storage.session('isBackPickingRecord',null);
		},
		methods:{
			initBtn(){
				let arr = [{name:'领料',className:'pick',fn:()=>{
					let data = {num:this.numType};
					storage.session('numType',data);
					this.getMaterial();
				}}];
				this.$store.commit('setPageTools',arr);
			},
			getMaterial(){
				this.$router.push({path:'pickingList/picking',query:this.$route.query});
			},
			changeType(i){
				this.numType=i;
			},
			startTimeChange(time){//开始时间
				this.startTime = time;
			},
			endTimeChange(time){//结束时间
				this.endTime=new Date(time).setHours(23,59,59,999);
			},
			//领料列表初始化
			async init(){
				if(this.aa()){
					let obj= storage.session('saveDataBack');
					let isBackPickingRecord=storage.session('isBackPickingRecord');   //是否点击返回
					if(obj&&isBackPickingRecord){
						this.currentList =obj.currentList;
						this.total=obj.total;
						this.rows=obj.rows;
						this.page=obj.page;
						this.num=obj.num;
						this.type=obj.type;
						this.startTime=obj.startTime;
						this.endTime=obj.endTime;
						this.creatorName=obj.creatorName;
						storage.session('saveDataBack',null);
					}else{
						let res=await http.getLogList({
							data:{startTime:this.startTime/ 1000,endTime:parseInt(this.endTime/ 1000),
								page:this.page,num:this.num,type:this.type,creatorName:this.creatorName}
						});
						if(res){
							this.currentList =res.list;
							this.total=res.count;
							this.rows=res.rows;
						}
					}
				}
			},
			//搜索时间
			searchTime(){
				if(this.aa()){
					this.page=1;
					this.init();
				}
			},
			aa(){
				let timer = 31 * 24 * 60 * 60 * 1000;
				if (this.endTime - this.startTime > timer) { //查询限制
					this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'时间间隔不能超过31天'});
					return false;
				}
				if (this.startTime > this.endTime) {
					this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'开始时间不能大于结束时间'});
					return false;
				}
				if (this.endTime>new Date().setHours(23,59,59,999)) {
					this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'结束时间不能大于当前时间'});
					return false;
				}
				return true;
			},
			//选择操作类型
			selectType(index){
				this.type = index;
			},
			//重置
			reset(){
				this.startTime=new Date().setHours(0,0,0,0);
				this.endTime=new Date().setHours(23,59,59,999);
				this.type=0;
				this.creatorName='';
				this.page=1;
				this.num=10;
				this.searchTime();
			},
			//分页组件返回值
			pageChange(obj){
				this.num=obj.num;
				this.page=obj.page;
				this.init();
			},
			//查看详情
			toSee(item){
				let arr={currentList:this.currentList,total:this.total,rows:this.rows,
					page:this.page,num:this.num,type:this.type,startTime:this.startTime,
					endTime:this.endTime,creatorName:this.creatorName
				};
				storage.session('listDetail',item);
				storage.session('saveDataBack',arr);
				if(item.type==1){
					this.$router.push({path:'pickingList/checkDetails',query:this.$route.query});
				}else if(item.type==2){
					this.$router.push({path:'pickingList/plateDetails',query:this.$route.query});
				}
			},
			//领料人返回
			doThrowTanResult(res){
				this.isShow = res;
				Promise.resolve().then(()=>{
					this.initBtn();
				});
			},
			//把时间戳转化成***年**月**日
			transformTime(time) {
				return utils.format(new Date(Number(time) * 1000),'yyyy-MM-dd hh:mm');
			},
		},
		components:{
			calendar: ()=> import (/*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			picker: ()=> import (/*webpackChunkName: 'picker'*/ './picker'),
			pageElement:()=>import (/*webpackChunkName:'page_element'*/'src/components/page_element'),
			comTable: () =>import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		}
	};
</script>
<style scoped lang="less">
@media only screen and (max-width:1460px) {
	.enquiries{
	  margin-top:10px;
	}
}
	#pickingRecord{
		.div_wai{
			border:1px solid #F8941F;
			display: inline-block;
			cursor: pointer;
			.span_type{
				display: inline-block;
				height: 40px;
				width: 130px;
				line-height: 40px;
				text-align: center;
			}
			.sel_true{
				background-color: #F8941F;
				color: white;
			}
			.sel_false{
				background-color: white;
				color: #F8941F;
			}
		}
		.filter{
			margin-top: 10px;
			/*min-width: 1300px;*/
			.wenZi{
				display: inline-block;
				font-size:16px;
				color:rgba(51,51,51,1);
				height: 40px;
				line-height: 40px;
			}
			.input-box{
				width: 200px;
				display: inline-block;
			}
			.input-word{
				padding: 0 5px;
				height: 40px;
				line-height: 40px;
				display: inline-block;
			}
			.order-order-searchA,
			.order-order-search {
				display: inline-block;
				width: 40px;
				height: 40px;
				background-color: #29A7E1;
				cursor: pointer;
				margin-right: 15px;
				vertical-align: middle;
			}
			.order-order-searchA{
				&:hover {
					background-color: #1878a5;
					transition: background-color ease-in-out 0.2s;
				}
				&:active {
					background-color: #154961;
				}
			}
			.order-order-search {
				background: url(../../../res/images/search.png) center center no-repeat;
			}
			.top-box {
				position: relative;
				display: inline-block;
				margin-right: 10px;
			}
			.numbering{
				width: 211px;
				height: 40px;
				border: 1px solid #B3B3B3;
				text-indent: 25px;
				display: inline-block;
				outline: none;
			}
			.enquiries{
				display: inline-block;
			}
			.enquiries a{
				display: inline-block;
				width: 100px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				font-size: 16px;
				color: #fff;
				margin-left: 10px;
			}
		}
		.clear{
			clear: both;
			height: 20px;
		}
	}
</style>