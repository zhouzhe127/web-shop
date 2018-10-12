<!--
	**领料列表
	*
	* 编写-胡江
	* 重构-黄一帆
	*
-->
<template>
	<div id="pickingRecord">
		<section class="div_wai">
			<el-radio-group v-model="numType">
			    <el-radio-button label="0">领料记录</el-radio-button>
			    <el-radio-button label="1">领料人</el-radio-button>
			</el-radio-group>
		</section>
		
		<section v-if="!Number(numType)">
		<div class="filter">
			<div class="input-box">
				<el-date-picker
					v-model="timeDate"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:clearable="false"
					@change="timeChange">
				</el-date-picker>
			</div>
			<div class="input-box">
				<el-select v-model="type" placeholder="请选择调度状态" @change="selectType" style="width:200px;">
				    <el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
				    </el-option>
				</el-select>
			</div>
			<!--搜索 重置-->
			<div class="input-box">
				<el-input v-model="creatorName" placeholder="请输入操作人" maxlength="10" style="width:180px;"></el-input>
			</div>
			<div class="input-box">
<<<<<<< HEAD
				<el-button @click="searchTime" type="success">筛选</el-button>
=======
				<el-button @click="searchTime" type="primary">筛选</el-button>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
				<el-button @click="reset" type="info">重置</el-button>
			</div>
		</div>
		
		<div class="list-box">
			<el-table
		    	:data="currentList" stripe border style="width: 100%">
<<<<<<< HEAD
			    <el-table-column type="index" :index="indexMethod" label="序号" width="150">
=======
			    <el-table-column type="index" :index="indexMethod" label="序号" width="100">
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
			    </el-table-column>
			    <el-table-column label="操作类型" width="180">
			    	<template slot-scope="scope">{{scope.row.type==1?'领料':'领料盘库'}}</template>
			    </el-table-column>
			    <el-table-column prop="creatorName" label="操作人">
			    </el-table-column>
<<<<<<< HEAD
=======
			    <el-table-column prop="ownerName" label="领料人">
			    </el-table-column>
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
			    <el-table-column label="操作时间">
			    	<template slot-scope="scope">{{transformTime(scope.row.createTime)}}</template>
			    </el-table-column>
			    <el-table-column label="操作" fixed="right" width="150">
			    	<template slot-scope="scope">
			        	<el-button @click="toSee(scope.row)" type="text" size="small">查看详情</el-button>
			      	</template>
			    </el-table-column>
		  	</el-table>
		</div>
		<el-pagination @current-change="(res)=>{pageChange(res,1)}" @size-change="pageChange"
			:current-page="page"
			background
			layout="sizes,total,prev, pager, next"
			:page-sizes="[10, 20, 50]"
			:total="rows">
		</el-pagination>
		</section>
		<picker v-if="Number(numType)" @throwWinResult="doThrowTanResult"></picker>
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
				timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
				startTime: new Date().setHours(0, 0, 0, 0)-30*3600*24*1000, //开始时间
				endTime: new Date().setHours(23, 59, 59, 0), //结束时间
				creatorName:'',   //操作人
				options:[
					{value:0,label:'全部操作类型'},
					{value:1,label:'领料'},
					{value:2,label:'领料盘库'},
				],
				type:0,           //对应循序  1:领料,2:领料盘库
				currentList:[],
				rows:0,      //记录总条数
				num: 10,    //一页处理多少数据
				total: 0,    //总页数
				page: 1,     //当前第几页
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
<<<<<<< HEAD
				let arr = [{name:'领料',className: 'success',type:5,fn:()=>{
=======
				let arr = [{name:'领料',className: 'primary',type:5,fn:()=>{
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
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
			timeChange(res){
				this.startTime = new Date(res[0]).setHours(0,0,0,0);
				this.endTime = new Date(res[1]).setHours(23,59,59,0);
			},
			//领料列表初始化
			async init(){
				let obj= storage.session('saveDataBack');
				let isBackPickingRecord=storage.session('isBackPickingRecord');   //是否点击返回
				if(obj&&isBackPickingRecord){
					this.currentList =obj.currentList;
					this.total=obj.total;
					this.rows=obj.rows-0;
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
						this.rows=res.rows-0;
					}
				}
			},
			//搜索时间
			searchTime(){
				this.page=1;
				this.init();
			},
			//选择操作类型
			selectType(index){
				this.type = index;
			},
			//重置
			reset(){
				this.startTime = new Date().setHours(0, 0, 0, 0)-30*3600*24*1000;
				this.endTime = new Date().setHours(23, 59, 59, 999);
				this.timeDate = [new Date(Date.parse(new Date())-30*3600*24*1000),new Date()];
				this.type=0;
				this.creatorName='';
				this.page=1;
				this.num=10;
				this.searchTime();
			},
			pageChange(res,type){
				if(type){
					this.page=res;
				}else{
					this.num = res;
				}
				this.init();
			},
			indexMethod(index){
				return this.num*(this.page-1)+index+1;
			},
			//查看详情
			toSee(item){
				let arr={
					currentList:this.currentList,
					total:this.total,
					rows:this.rows,
					page:this.page,
					num:this.num,
					type:this.type,
					startTime:this.startTime,
					endTime:this.endTime,
					creatorName:this.creatorName,
				};
				this.$route.query.id = item.id;
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
	#pickingRecord{
		.div_wai{
			display: block;
		}
		.list-box{margin-bottom: 10px;}
		.filter{
			margin-top: 15px;
			/*min-width: 1300px;*/
			.wenZi{
				display: inline-block;
				font-size:14px;
				color:rgba(51,51,51,1);
				height: 40px;
				line-height: 40px;
			}
			.input-box{
				display: inline-block;margin-bottom: 15px;
				margin-right: 10px;
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