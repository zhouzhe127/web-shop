<!--
    **用户点评
    *
    * 
    * *miaochuan.sha 
    * *huiling.liu
    *
-->
<template>
	<div id="comments">
		<div class="filter">
			<div class="input-box input-start">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span>-</span>
			<div class="input-box input-start">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<div class="search-box">
				<span class="search-btn blue" @click="assistantComment('header')">筛选</span>
				<span class="reset-btn gray" @click="resetFun()">重置</span>
			</div>
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'用户点评'" :key="index" :showTitle='1' :introData="commentList" :titleData="titleList"
		    :allTotal="count" :listWidth="1436" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="deleteComments(props.data)">删除</a>
			</div>
			<div slot="con-4" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				index: null,
				titleList: [
					{
						titleName: '操作',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 215 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '点评人',
						dataName: 'name',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 215 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '工作人员',
						dataName: 'staffName',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 215 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '点评内容',
						dataName: 'content',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 574 + 'px',
							flex: 'none'
						}
					},
					{
						titleName: '点评时间',
						dataName: 'createTime',
						titleStyle: {
							fontSize: 16 + 'px',
							width: 215 + 'px',
							flex: 'none'
						}
					}
				],
				allTotal: 0,
				expirationTimeList: [
					{ //过期时间
						name: '全部',
						id: ''
					}, {
						name: '待审核',
						id: 0
					},
					{
						name: '已通过',
						id: 1
					},
					{
						name: '未通过',
						id: 2
					}
				],
				expirationTimeId: '',
				expirationTime: '全部', //状态
				startTime: '',
				endTime: '',
				reqStartTime: '',
				reqEndTime: '',
				page: 1,
				num: 10,
				count: 0, //数据总条数
				pageNum: 1,
				showPageList: [10, 20],
				showWin: false, //弹窗默认关闭状态
				commentList: '' //点评列表
			};
		},
		methods: {
			startTimeChange(time) { //开始时间
				this.startTime = time;
			},
			endTimeChange(time) { //结束时间
				this.endTime = new Date(time).setHours(23, 59, 59, 999);
			},
			pageChange(obj) { //翻页
				this.page = obj.page;
				this.num = obj.num;
				this.assistantComment();
			},
			selexpirationTime: function (i) {
				this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
				this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
			},
			async assistantComment(type) {
				if (type == 'header') {
					this.page = 1;
				}
				let data = await http.assistantComment({
					data: {
						startTime: parseInt(this.startTime / 1000), //开始时间
						endTime: parseInt(this.endTime / 1000), //结束时间
						page: this.page, //页数
						num: this.num, //条数
						status: this.expirationTimeId, //状态
					}
				});
				this.commentList = data.commentList; //获取点评列表
				for (let i = 0; i < this.commentList.length; i++) {
					for (let j = 0; j < data.fansList.length; j++) {
						if (data.fansList[j].id == this.commentList[i].fansId) {
							this.commentList[i].name = data.fansList[j].name;
						}
					}
				}
				if (this.page == '1') {
					this.count = data.count;
					this.pageNum = data.total;
				}
			},
			changeFormat: function (t) {
				t -= 0;
				if (t < 10) {
					return ('0' + t);
				} else {
					return (t + '');
				}
			},
			transFormDates: function (time) {
				time += '';
				if (time.length == 10) {
					time -= 0;
					time *= 1000;
				} else {
					time -= 0;
				}
				let date = new Date(time);
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +
					this.changeFormat(date.getMinutes());
			},
			deleteComments: function (item) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'confirm',
					content: '确定删除该点评',
					callback: (res) => {
						if (res == 'ok') {
							this.assistantCommentdelete(item);
						} 
					}
				});
			},
			async assistantCommentdelete(item) {
				let data = await http.assistantCommentdelete({
					data: {
						id: item.id
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: `删除成功`,
						winType: 'alert',
						title: '操作提示',
					});
					this.assistantComment();
				}
			},
			resetFun: function () {
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(23, 59, 59, 999);
				this.expirationTime = '全部';
				this.expirationTimeId = '';
				this.num = 10;
				this.page = 1;
				this.assistantComment();
			}
		},
		components: {
			selectBtn: () =>
				import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		},
		mounted() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.assistantComment();

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
		color: #28A8E0;
	}

	#comments .turn-page {
		margin: 10px 0 30px 0;
	}
</style>