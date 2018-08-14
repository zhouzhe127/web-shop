/** * 任务系统 * *miaochuan.sha */
<template>
	<div id="mission">
		<div class="filter">
			<span>创建时间</span>
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span>-</span>
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span class="order-order-searchA" @click="getTaskList('header')">
				<span class="order-order-search" href="javascript:void(0)"></span>
			</span>
		</div>
		<div class="filter">
			<span>状态</span>
			<!--下拉框组件-->
			<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
			<!--选择卡属门店-->
			<span>任务类型</span>
			<!--下拉框组件-->
			<select-btn :name='taskType' :sorts="taskTypeList.map(v=>v.name)" :width="157" @selOn="seltaskType"></select-btn>
			<div class="search-box">
				<span class="search-btn blue" @click="getTaskList('header')">筛选</span>
				<span class="reset-btn gray" @click="reset">重置</span>
			</div>
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'任务列表'" :key="index" :showTitle='1' :introData="tasksList" :listWidth="1436" :widthType='true' :titleData="titleList" :allTotal="count">
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" style="color: #27a8e0;border:none;" @click="openStore(props.data)">查看详情</a>
				<a href="javascript:;" style="color: #ff8d00;" @click="addNewType(props.data,'edi')">编辑</a>
				<a href="javascript:;" style="color: #27a8e0;" v-if="props.data.taskStatus == '1' || props.data.taskStatus == '2'" @click="selectionstate(props.data)">{{closeType[props.data.taskStatus]}}</a>
			</div>
			<div class="applyShopIds" slot="con-2" slot-scope="props">{{getShopname(props.data.applyShopIds)}}</div>
			<div slot="con-3" slot-scope="props">{{staticType[props.data.taskStatus]}}</div>
			<div slot="con-4" slot-scope="props">{{taskTType[props.data.type]}}</div>
			<div slot="con-7" slot-scope="props">{{percentage(props.data.completeNum,props.data.taskNum)}}</div>
			<div slot="con-8" slot-scope="props">{{props.data.taskNum - props.data.receiveNum}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :taskdetail='taskdetail' :shopsList="shopsList"></component>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import getAppliedWin from './mission_win.vue';
export default {
	data() {
		return {
			index: null,
			titleList: [{
				titleName: '操作',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 315.9 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '任务名称',
				dataName: 'taskName',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 201 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '所属店铺',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 143 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '状态',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '任务类型',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '任务量',
				dataName: 'taskNum',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '完成次数',
				dataName: 'completeNum',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '完成进度',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '剩余次数',
				dataName: 'createTime',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 129 + 'px',
					flex: 'none'
				}
			},
			],
			allTotal: 0,
			ischain: '',
			shopId: '', //单店下的shopId
			startTime: '',
			endTime: '',
			pageNum: '0', //总页数
			page: 1,
			num: 10,
			count: 0, //记录的条数
			expirationTimeList: [{ //状态
				name: '全部',
				id: -1
			}, {
				name: '未开始',
				id: 0
			}, {
				name: '进行中',
				id: 1
			}, {
				name: '已关闭',
				id: 2
			}, {
				name: '已结束',
				id: 3
			}],
			expirationTimeId: -1, //任务的状态
			expirationTime: '全部', //状态
			//shopsName: '选择门店',
			shopsList: [], // 所属门店
			taskType: '全部', //任务类型
			taskTypeList: [{ //状态
				name: '全部',
				id: -1
			}, {
				name: '店内任务',
				id: 0
			}, {
				name: '消费任务',
				id: 1
			}, {
				name: '分享任务',
				id: 2
			}],
			taskTypeId: -1, //选中的任务类型
			showWin: false, //弹窗默认关闭状态
			isPopupwindow: '',
			tasksList: [], //任务列表
			taskdetail: '', //任务详情
			staticType: {
				0: '未开始',
				1: '进行中',
				2: '已关闭',
				3: '已结束',
			},
			taskTType: {
				0: '店内任务',
				1: '消费任务',
				2: '分享任务'
			},
			closeType: {
				0: '开启',
				1: '关闭',
				2: '开启',
			}
		};
	},
	methods: {
		startTimeChange(time) { //开始时间
			this.startTime = time;
		},
		endTimeChange(time) { //结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		selexpirationTime: function(i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		seltaskType: function(i) {
			this.taskType = this.taskTypeList[i].name; //点击卡类型对应的名字
			this.taskTypeId = this.taskTypeList[i].id; //点击卡类型对应的id
		},
		// 获取卡属门店店铺列表
		// clickShopList: function (arr) {
		// 	let idArr = [];
		// 	arr.forEach((item) => {
		// 		if (item.selected == true) {
		// 			idArr.push(item.id);
		// 		}
		// 	});
		// 	this.shopIds = idArr.join(',');
		// },
		getShopList: function() {
			// 获取卡属门店店铺列表
			if (this.ischain == '3') { // 处理品牌逻辑
				this.shopsList = storage.session('shopList');
				for (let item of this.shopsList) {
					item.name = item.shopName;
				}
			} else if (this.ischain == '0') {
				this.shopsList.push(storage.session('userShop').currentShop);
			}
		},
		pageChange: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.getTaskList();
		},
		addNewType: function(item, type) {
			if (type == 'edi') {
				storage.session('taskdetail', item);
			}
			storage.session('type', type);
			this.$router.push('/admin/Task/newmission');
		},
		openStore: function(item) { //打开新增用户标签的弹窗
			this.showWin = true; //打开弹窗
			this.taskdetail = item; //编辑的详情
			this.isPopupwindow = 'getAppliedWin';
		},
		getResult: function(res) {
			if (res == 'ok') {
				this.getLabel();
			}
			this.showWin = false;
		},
		async getTaskList(type) {
			if (type == 'header') {
				this.page = 1;
			}
			if (this.endTime < this.startTime) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '结束时间应大于开始时间',
				});
				return false;
			}
			let data = await http.getTaskList({
				data: {
					page: this.page, //页数
					num: this.num, //请求的条数
					startTime: parseInt(this.startTime / 1000), //开始的时间
					endTime: parseInt(this.endTime / 1000), //结束的时间
					status: this.expirationTimeId,
					type: this.taskTypeId //任务的类型
				}
			});
			if (data) {
				this.count = data.count; //获取记录的条数
				this.pageNum = data.total; //获取总页数
				this.tasksList = data.tasksList; //获取任务列表
			}
		},
		reset: function() { //重置
			this.page = 1;
			this.num = 10;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.expirationTime = '全部';
			this.expirationTimeId = -1;
			//this.shopsName = '选择门店';
			//this.shopIds = -1;
			this.taskType = '全部';
			this.taskTypeId = -1;
			this.getShopList();
			this.getTaskList();
		},
		getShopname: function(id) {
			let shopname = [];
			let shopIds = id.split(',');
			for (let int of shopIds) {
				for (let item of this.shopsList) {
					if (item.id == int) {
						shopname.push(item.name);
						break;
					}
				}
			}
			return shopname.join(',');
		},
		percentage: function(num, total) {
			if (total == 0) {
				return '0%';
			} else {
				return (Math.round(num / total * 10000) / 100.00 + '%'); // 小数点后两位百分比
			}
		},
		async selectionstate(item) {
			let status = '';
			if (item.taskStatus == '0' || item.taskStatus == '2') {
				status = 0;
			} else if (item.taskStatus == '1') {
				status = 1;
			}
			let data = await http.changeTaskStatus({
				data: {
					status: status, //当前的任务状态
					taskId: item.id
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: `${this.closeType[item.taskStatus]}成功`,
					winType: 'alert',
					title: '操作提示',
				});
				this.getTaskList();
			}
		}
	},
	components: {
		calendar: () =>
		import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectBtn: () =>
		import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		selectStore: () =>
		import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
		pageElement: () =>
		import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
		import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		getAppliedWin
	},
	mounted() {
		this.$store.commit('setPageTools', {
			addNewType: () => {
				this.addNewType('', 'add');
			}
		});
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(23, 59, 59, 999);
		this.shopId = storage.session('userShop').currentShop.id;
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.getShopList();
		this.getTaskList(); //获取任务列表
	}
};
</script>
<style type="text/css" scoped>
#mission {
	padding-bottom: 40px;
	min-width: 1245px;
}

#mission .filter {
	margin-bottom: 20px;
}

#mission .filter .parcel {
	display: inline-block;
}

#mission .filter span {
	font-size: 16px;
	margin: 0 9px 0 12px;
}

#mission .filter .input-box {
	display: inline-block;
	vertical-align: middle;
}

#mission .applyShopIds {
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}




/* 搜索图标的公共样式 */

#mission .filter .order-order-searchA,
#mission .filter .order-order-search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29A7E1;
	cursor: pointer;
	margin: 0;
	vertical-align: middle;
}

#mission .filter .order-order-searchA {
	margin-left: -4px;
}

#mission .filter .order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}

#mission .filter .order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

#mission .filter .order-order-searchA:active {
	background-color: #154961;
}

#mission .filter .search-box {
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	height: 40px;
	margin-left: 20px;
}

#mission .filter .search-box span {
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 0;
	color: #fff;
	display: inline-block;
	cursor: pointer;
	margin: 0;
}

#mission .filter .search-box .search-btn {
	margin-right: 20px;
}

#mission .btnLink {
	height: 100%;
	align-items: center;
	display: flex;
	justify-content: center;
}

#mission .btnLink a {
	cursor: pointer;
	display: block;
	height: 18px;
	text-align: center;
	line-height: 18px;
	border-left: 1px solid #cecece;
	float: left;
	padding: 0 6%;
}

#mission .turn-page {
	margin: 10px 0 30px 0;
}
</style>