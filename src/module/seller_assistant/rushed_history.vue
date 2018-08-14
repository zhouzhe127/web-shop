<!--
    **抢购历史
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedHistory">
		<div class="rushedstatus">
			温馨提示:疯抢状态为{{statusType[status]||"未开始"}}...
		</div>
		<!-- 列表 -->
		<com-table :listHeight='80' :listName="'疯抢历史'" :key="index" :showTitle='1' :listWidth="1436" :introData="historyList" :titleData="titleList"
		    :allTotal="count" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="btnLink">
				<a href="javascript:;" @click="getDetail(props.data)">查看</a>
			</div>
			<div slot="con-1" slot-scope="props">{{count - (page - 1)*num -props.index}}</div>
			<div slot="con-2" slot-scope="props">{{transFormDates(props.data.startTime)}}</div>
			<div slot="con-3" slot-scope="props">{{transFormDates(props.data.endTime)}}</div>
			<div slot="con-4" slot-scope="props" :class="props.data.status == '0' ? 'end' : 'start' ">{{changStatus(props.data.status)}}</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';


export default {
	data() {
		return {
			index: null,
			page: 1,
			num: 10,
			count: 0, //数据总条数
			pageNum: 1,
			historyList: [], //历史列表
			status: '2', //状态 
			titleList: [
				{
					titleName: '操作',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '序号',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 143 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '开始时间',
					dataName: 'startTime',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '结束时间',
					dataName: 'endTime',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 287 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '状态',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 143 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '抢购数量',
					dataName: 'grabNum',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 143 + 'px',
						flex: 'none'
					}
				},
				{
					titleName: '已领取数量',
					dataName: 'receiveNum',
					titleStyle: {
						fontSize: 16 + 'px',
						width: 143 + 'px',
						flex: 'none'
					}
				}
			],
			allTotal: 0,
			statusType:{
				0:'已结束',
				1:'进行中'
			}
		};
	},
	methods: {
		pageChange(obj) { //翻页
			this.page = obj.page;
			this.num = obj.num;
			this.getHistorys();
		},
		async getHistorys() {
			let data = await http.getHistory({
				data: {
					page: this.page,
					num: this.num
				}
			});
			this.historyList = data.activityList; //获取历史列表
			if (this.historyList.length > 0) {
				this.status = this.historyList[0].status;
			}
			this.pageNum = data.total;
			this.count = data.count;
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
		changStatus: function (type) {
			switch (Number(type)) {
				case 1:
					return '进行中';
				case 0:
					return '已结束';
				default:
					return '未开始';
			}
		},
		getDetail: function (item) {
			storage.session('historydetail', item);
			this.$router.push('/admin/Assistanthistory/detail');
		}
	},
	watch: {

	},
	components: {
		selectBtn: () =>
			import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
	},
	mounted() {
		this.getHistorys();
	}
};
</script>
<style type="text/css" scoped>
	#rushedHistory {
		width: 1437px;
		height: auto;
	}

	#rushedHistory .rushedstatus {
		margin-bottom: 31px;
		color: #1DA527;
	}

	#rushedHistory .list {
		width: 1436px;
		min-height: 156px;
		border: 1px solid #D2D2D2;
	}

	#rushedHistory .list .list_title {
		width: 1436px;
		height: 45px;
		line-height: 45px;
		padding-left: 17px;
	}

	#rushedHistory .list .list_title span {
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}

	#rushedHistory .list .list_title span:first-child {
		margin-right: 11px;
	}

	#rushedHistory .list .list_title span:nth-child(2) {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #000;
		margin-right: 11px;
		vertical-align: middle;
	}

	#rushedHistory .list .list_title span:last-child a {
		font-size: 16px;
		color: #FF3C05;
	}

	#rushedHistory .btnLink a {
		cursor: pointer;
		display: inline-block;
		width: 80px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #28A8E0;
	}

	#rushedHistory .turn-page {
		margin: 10px 0 30px 0;
	}
</style>