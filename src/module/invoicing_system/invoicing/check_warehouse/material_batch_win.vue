<!--
    **入货组件-批次弹窗
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" @winEvent="closeSelfWin" :width="1024" :height="'auto'" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="select-batch">
			<div class="batch-title">
				<li><em>物料名称：</em>{{detail.name}}</li>
				<li><em>物料单位：</em>{{detail.unitWord}}</li>
				<li><em>默认单位：</em>{{detail.defaultUnit}}</li>
			</div>
			<div class="batch-title">
				<li class="mid"><em>保质期：</em>{{detail.validity}}{{validityHash[detail.validityType]}}</li>
				<li class="narrow"><em>分类：</em>{{detail.cateWord}}</li>
				<li><em>最小单位：</em>{{detail.minUnit}}</li>
			</div>
			<div class="filter">
				<div class="inline-box">
					<input type="text" placeholder="请输入批次编号" v-model="batchCode" />
					<input type="text" placeholder="请输入供应商" v-model="supplier" />
				</div>
				<div class="inline-box">
					<calendar :time="startTime" @emit="startTimeChange" :format="timeFormat" :tips='startTips'></calendar>
				</div>
				<div class="inline-box">
					<calendar :time="endTime" @emit="endTimeChange" :format="timeFormat" :tips='endTips'></calendar>
				</div>
				<div class="inline-box">
					<div class="button-box">
						<span class="blue" @click="filter">筛选</span>
						<span class="gray" @click="reset">重置</span>
					</div>
				</div>
			</div>
			<div class="table">
				<div class="table-head">
					<span>序号</span>
					<span>批次编号</span>
					<span>生产日期</span>
					<span>供应商</span>
					<span>所属仓库</span>
					<span>当前批次数量/重量</span>
					<span>盘库库存量<em @click="clearInput">清空输入</em></span>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in changeList" :key="index">
						<div class="cell">{{index+1}}</div>
						<div class="cell">{{item.batchCode}}</div>
						<div class="cell">{{getTime(item.productionTime)}}</div>
						<div class="cell">{{item.supplier}}</div>
						<div class="cell">{{item.wName||"暂无"}}-{{item.aName||"暂无"}}</div>
						<div class="cell">{{setSuprlus(item.surplus,listData.relation)}}</div>
						<div class="cell unit-box">
							<template v-if="oneName">
								<div class="input-box">
									<input type="text" v-model="item.oneNum" maxlength="10" placeholder="请输入"/>
									<div class="word">{{oneName}}</div>
								</div>
								+
							</template>
							<div class="input-box">
								<input type="text" v-model="item.twoNum" maxlength="10" placeholder="请输入"/>
								<div class="word">{{twoName}}</div>
							</div>
						</div>
					</div>
					<div class="empty" v-if="!changeList.length">- 暂无条目 -</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import global from 'src/manager/global';

export default {
	data() {
		return {
			title: '批次选择',
			timeFormat:'yyyy年MM月dd日',
			startTips:'请选择时间',
			endTips:'请选择时间',
			detail:{},//物料详情
			listData:{},//列表数据
			batchCode:'',//批次编号-搜索
			supplier:'',//供应商-搜索
			startTime: '',
			endTime: '',
			validityHash:{
				0:'月',
				1:'日',
				2:'年',
			},
			btnOk: {
				content: '确定',
				style: 'background-color:#ff9200;'
			},
			btnCancel: {},
			cate: '', //分类,
			allList: [],
			selList: [],
			changeList:[],
			batchNum: '',
			unitArr:[],
			unitValue:'',//单位换算
			oneName:'',
			twoName:'',
			mid:'',//物料id
			wid:'',//仓库id
			areaId:'',//区域id
			unitId:'',//单位id
			isInit:true,//是否页面初始化
		};
	},
	props: ['material','selItem',],
	mounted() {
		this.init();
		this.getBatch();
		this.getBatchList();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win'*/ 'src/components/win'),
		calendar: () =>
			import( /*webpackChunkName: 'can_multi'*/ 'src/components/calendar_type'),
		selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
	},
	methods: {
		init() {
			for(let key in this.material){
				this[key] = this.material[key];
			}
		},
		startTimeChange(res){
			this.startTime = res;
			this.startTips = '';
		},
		endTimeChange(res){
			this.endTime = res;
			this.endTips = '';
		},
		clearInput() { //清空输入框
			let changeList = utils.deepCopy(this.changeList);
			let allList = utils.deepCopy(this.allList);
			for(let item of changeList) {
				item.oneNum = '';
				item.twoNum = '';
				item.totalItem = 0;
				for(let all of allList){
					if(item.batchId == all.batchId){
						all.oneNum = '';
						all.twoNum = '';
						all.totalItem = 0;
					}
				}
			}
			this.changeList = changeList;
			this.allList = allList;
		},
		setSuprlus(num,unit){//换算库存数量
			let def='',min='',value=1;
			for(let item of unit){
				if(item.isMin == 1){//最小单位
					min = item.name;
					if(item.isDefault == 1){//默认单位
						def = item.name;
						value = item.value;
					}
				}else if(item.isDefault == 1){//默认单位
					def = item.name;
					value = item.value;
				}
			}
			//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			return global.comUnit(num,value,def,min);
		},
		async getBatch(){//获取物料批次详情
			let data = await http.getMaterialDetail({data:{
				mid:this.mid,
				wid:this.wid,
			}});
			//设置单位
			let unitArr = [];
			for(let item of data.unit){
				unitArr.push(item.name);
				if(item.isMin==1){
					data.minUnit = item.name;
				}
				if(item.isDefault==1){
					data.defaultUnit = item.name;
				}
			}
			data.unitWord = unitArr.join(', ');
			//设置分类
			let cateArr = [];
			for(let item of data.cate){
				cateArr.push(item.name);
			}
			data.cateWord = cateArr.join(', ');
			this.detail = data;
		},
		async getBatchList(){//获取物料批次
			let data = await http.InvoicingGetMaterialBatch({data:{
				mid:this.mid,
				wid:this.wid,
				areaId:this.areaId,
			}});
			this.listData = data;
			this.setListData(data);
		},
		setListData(data){//设置列表数据
			let oneName='',twoName='',value=1;
			for(let i=0;i<data.relation.length;i++){
				let unit = data.relation[i];
				if(unit.isMin==1){
					twoName = unit.name;
				}else if(unit.muId == this.unitId){
					oneName = unit.name;
					value = unit.value;
				}
			}
			for(let item of data.list){
				item.oneNum = '',item.twoNum = '';
			}
			this.oneName = oneName,this.twoName = twoName;
			this.unitValue = value;
			this.allList = data.list;
			this.changeList = data.list;
			this.setDefault();
		},
		setDefault(){//设置默认选中
			for(let item of this.allList){
				for(let sel of this.selItem){
					if(sel.batchId == item.batchId){
						let def='',min=this.twoName;
						if(!this.oneName){
							def = this.twoName;
						}
						let unitObj = global.comUnit(sel.totalItem,this.unitValue,def,min,true);
						item.oneNum = unitObj.oNull;
						item.twoNum = unitObj.tNull;
					}
				}
			}
		},
		closeSelfWin(res) {
			if(res == 'ok') {
				if(!this.veriNum()) return;
				let totalNum = 0,list=[];
				for(let item of this.allList) {
					let total = Number(item.oneNum)*Number(this.unitValue) + Number(item.twoNum);
					if(item.oneNum.trim()!=='' || item.twoNum.trim()!==''){
						totalNum = totalNum + total;
						item.totalItem = total;
						list.push(item);
					}
				}
				let obj={
					list:list,
					allNum:totalNum,
				};
				this.$emit('emit',obj);
			} else {
				this.$emit('emit',false);
			}

		},
		veriNum(){//验证
			for(let item of this.allList){
				let total = Number(item.oneNum) + Number(item.twoNum);
				if(total<0) {
					this.myAlert(`批次编号:${item.batchCode},盘库数量不能小于0`);
					return false;
				}
				if(isNaN(item.oneNum) || isNaN(item.oneNum)) {
					this.myAlert(`批次编号:${item.batchCode},盘库数量必须为数字`);
					return false;
				}
			}
			return true;
		},
		filter(){//筛选
			this.isInit = false;
			let sendStart='',sendEnd='';
			if(this.isInit){//页面加载的第一次执行
				sendStart = '';
				sendEnd = '';
			}else{
				let endTime = this.endTime?new Date(this.endTime).setHours(23, 59, 59, 0):'';
				sendStart = this.startTime;
				sendEnd = endTime;
			}
			let obj={
				batchCode:this.batchCode,
				supplier:this.supplier,
				startTime:sendStart,
				endTime:sendEnd,
			};
			this.condition(obj);
		},
		condition(obj) { //筛选条件匹配
			let list = utils.deepCopy(this.allList);
			for(let key in obj) { //遍历筛选条件
				let newList = [];
				if(obj[key] != '') {
					console.log(key,obj[key]);
					if(key == 'startTime' || key == 'endTime') { //日期匹配
						for(let item of list) {
							//条件匹配 推进新数组
							if(obj.startTime <= item.productionTime*1000 && obj.endTime >= item.productionTime*1000){
								newList.push(item);
							}
						}
					} else {
						for(let item of list) {
							//模糊匹配 丢进新数组
							if(item[key].includes(obj[key])) newList.push(item);
						}
					}
					list = newList;
				}
			}
			this.changeList = list;
		},
		myAlert(content) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: content,
			});
		},
		reset() {
			this.supplier = '';
			this.batchCode = '';
			this.startTime = '';
			this.endTime = '';
			this.startTips = '请选择时间';
			this.endTips = '请选择时间';
			this.isInit = true;
			this.changeList = this.allList;
		},
		getTime(time) {
			return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
		}
	},
	
};
</script>
<style lang='less' scoped>
	#select-batch {
		padding: 15px;
		background-color: #f7f7f7;
		overflow: auto;
		min-height: 450px;
		padding-bottom: 0;
		.color-size-16 {
			color: #333;
			font-size: 16px;
		}
		.batch-title {
			overflow: hidden;
			padding-bottom: 10px;
			li {
				min-height: 16px;
				position: relative;
				padding-left: 70px;
				list-style: none;
				float: left;
				overflow: hidden;
				width: 33.33%;
				.clear {
					float: right;
					height: 40px;
					width: 100px;
					text-align: center;
					line-height: 40px;
					color: #fff;
					background: #fe8d01;
					cursor: pointer;
				}
				em{position: absolute;left: 0;top: 0;display: block;}
			}
			.narrow{padding-left: 40px;}
			.mid{padding-left: 55px;}
			.small-li {
				width: 130px;
				text-align: center;
			}
		}
		.filter {padding-bottom: 10px;
			.inline-box {
				padding-top: 10px;float: left;margin-right:10px;
				.search-btn {
					float: left;height: 40px;width: 40px;cursor: pointer;background: url(../../../../res/images/search.png)#29abe2 center no-repeat;
				}
				input {
					width: 140px;height: 40px;padding: 0 10px;font-size: 14px;float: left;margin-right: 10px;
					&:focus {
						outline: none;
					}
					&:last-child{margin-right: 0;}
				}
				&:last-child{margin-right: 0;}
				&:after{content: '';zoom: 1;clear: both;display: block;}
			}
			.button-box {overflow: hidden;
				span {
					float: left;height: 40px;line-height: 40px;width: 75px;color: #fff;text-align: center;
				}
				.blue {
					margin-right: 10px;
				}
			}
			&:after{content: '';zoom: 1;clear: both;display: block;}
		}
		.table {
			overflow: hidden;
			.table-head {
				overflow: hidden;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;padding: 5px 0;
				span {
					border-right: 1px solid #ccc;height: 40px;line-height: 40px;color: #333;
					float: left;font-size: 14px;width: 14%;text-align: center;
					&:first-child {
						width: 6%;
					}
					&:last-child {
						width: 24%;border-right: 0;
					}
					em{color: red;display: inline-block;margin-left: 15px;cursor: pointer;text-decoration: underline;}
				}
			}
			.table-body {
				height: 370px;overflow: scroll;
				.table-row {
					overflow: hidden;border-bottom: 1px solid #ccc;width: 100%;
					.cell{
						height: 62px;line-height: 62px;color: #666;
						float: left;font-size: 14px;width: 14%;text-align: center;
						overflow: hidden;
						&:first-child {
							width: 6%;
						}
						&:last-child {
							width: 24%;
						}
						.input-num {
							width: 100px;height: 40px;text-indent: 15px;color: #666;outline: none;
						}
					}
					.input-box{
						display: inline-block;vertical-align: middle;overflow: hidden;
						input,.word{height: 40px;line-height: 38px;border: 1px solid #ccc;float: left;background: #fff;}
						input{width: 65px;padding: 0 5px;}
						.word{width: 40px;border-left: 0;text-align: center;}
					}
				}
				.empty{line-height: 70px;text-align: center;color: #ccc;font-size: 20px;}
			}
		}
	}
</style>