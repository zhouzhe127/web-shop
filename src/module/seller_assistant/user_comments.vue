<!--
	**用户提现
	*
	* 
	* *miaochuan.sha
	*
-->
<template>
	<div id="comments">
		<div class="filter">
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="startTime"  @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span>-</span>
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="endTime"  @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span style="margin: 0 20px;font-size:16px;">状态:</span>
			<!--下拉框组件-->
			<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
			<div class="search-box">
				<span class="search-btn blue" @click="getwithdrawalList()">筛选</span>
				<span class="reset-btn gray" @click="resetFun()">重置</span>
			</div>
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'提现申请'" :key="index" :showTitle='1' :introData="chashmentList" :titleData="titleList" :allTotal="count" :listWidth="1436" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" v-if="props.data.status == '0'" @click="openStore(props.data)">审核</a>
				<a href="javascript:;" v-else style="color:#D2D2D2;">已审核</a>
			</div>
			<div slot="con-1" slot-scope="props">{{formatTime(props.data.createTime)}}</div>
			<div slot="con-3" slot-scope="props">{{statusType[props.data.status]}}</div>
			<div slot="con-5" slot-scope="props">{{props.data.updateTime=="0" ? "--" : formatTime(props.data.updateTime)}}</div>
			<div slot="con-7" slot-scope="props">{{staffList[props.data.updateUid]}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :detail='infodetail'></component>
	</div>
</template>
<script>
import http from 'src/manager/http';
import getAppliedWin from './user_comments_win.vue';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			index: null,
			titleList: [
				{
					titleName: '操作',
					titleStyle: {
						fontSize: 16 + 'px',
					}
				},
				{
					titleName: '申请时间',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '申请人',
					dataName: 'staffName',
					titleStyle: {
						fontSize: 16 + 'px',
					}
				},
				{
					titleName: '状态',
					dataName: 'status',
					titleStyle: {
						fontSize: 16 + 'px',
					}
				},
				{
					titleName: '提现金额',
					dataName: 'cash',
					titleStyle: {
						fontSize: 16 + 'px',
					}
				},
				{
					titleName: '处理日期',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '审核批注',
					dataName: 'mark',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '操作人',
					dataName: 'staffName',
					titleStyle: {
						fontSize: 16 + 'px',
					}
				},				
			],
			allTotal: 0,
			page: 1,
			num: 10,
			count: 0, //数据总条数
			pageNum: 1,
			expirationTimeList: [
				{
					//过期时间
					name: '全部',
					id: ''
				},
				{
					name: '申请中',
					id: 0
				},
				{
					name: '直扣',
					id: 1
				},
				{
					name: '已驳回',
					id: 2
				},
				{
					name: '已付款',
					id: 3
				},
				{
					name: '已通过',
					id: 4
				}
			],
			expirationTimeId: '',
			expirationTime: '全部', //状态
			startTime: '',
			endTime: '',
			reqStartTime: '',
			reqEndTime: '',
			showWin: false, //弹窗默认关闭状态
			chashmentList: [], // 用户提现列表
			infodetail: '', //单条记录的信息
			statusType: {
				0: '申请中',
				1: '直扣',
				2: '已驳回',
				3: '已付款',
				4: '已通过'
			},
			staffList:{} //操作人
		};
	},
	methods: {
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		pageChange(obj) {
			//翻页
			this.page = obj.page;
			this.num = obj.num;
			this.getwithdrawalList();
		},
		selexpirationTime: function(i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		openStore: function(item) {
			//打开新增用户标签的弹窗
			this.infodetail = item;
			this.showWin = true; //打开弹窗
			this.isPopupwindow = 'getAppliedWin';
		},
		getResult: function(res) {
			if (res == 'ok') {
				this.getwithdrawalList();
			}
			this.showWin = false;
		},
		async getwithdrawalList() {
			let data = await http.chashmentGetList({
				data: {
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					page: this.page, //页数
					num: this.num, //条数
					status: this.expirationTimeId //状态
				}
			});
			this.chashmentList = data.list; //获取列表
			this.staffList = data.staffList;//工作人员
			for (let item of this.chashmentList) {
				if (item.mark == '') item.mark = '无';
			}
			if (this.page == '1') {
				this.count = data.count;
				this.pageNum = data.total; //页码数
			}
		},
		resetFun: function() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.expirationTime = '全部';
			this.expirationTimeId = '';
			this.page = 1;
			this.num = 10;
			this.getwithdrawalList();
		}
	},
	watch: {},
	components: {
		selectBtn: () =>
			import(/* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectStore: () =>
			import(/*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
		pageElement: () =>
			import(/*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		getAppliedWin
	},
	mounted() {
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(23, 59, 59, 999);
		this.getwithdrawalList();
	}
};
</script>
<style type="text/css" scoped lang="less">
#comments {
	padding-bottom: 40px;
	min-width: 1245px;
}

#comments .filter {
	margin-bottom: 20px;
}

#comments .filter .input-box {
	display: inline-block;
	vertical-align: middle;
}

#comments .filter .search-box {
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	height: 40px;
	margin-left: 20px;
}

#comments .filter .search-box span {
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 0;
	color: #fff;
	display: inline-block;
	cursor: pointer;
}

#comments .filter .search-box .search-btn {
	margin-right: 20px;
}

#comments .btnLink a {
	cursor: pointer;
	display: inline-block;
	width: 80px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #28a8e0;
}

#comments .turn-page {
	margin: 10px 0 30px 0;
}
</style>