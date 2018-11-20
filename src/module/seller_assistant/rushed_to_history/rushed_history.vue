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
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>疯抢历史</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="historyList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="medium" type="text" @click="getDetail(scope.row)" style="color: rgb(40, 168, 224);">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column label="序号" prop="name" align="center">
					<template slot-scope="scope">
						<span>{{count - (page - 1)*num -scope.$index}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" width="250" label="开始时间" align="center">
					<template slot-scope="scope">
						<span>{{transFormDates(scope.row.startTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" width="250" label="结束时间" align="center">
					<template slot-scope="scope">
						<span>{{transFormDates(scope.row.endTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="状态" align="center">
					<template slot-scope="scope">
						<span>{{changStatus(scope.row.status)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="grabNum" label="抢购数量" align="center">
				</el-table-column>
				<el-table-column prop="receiveNum" label="已领取数量" align="center">
				</el-table-column>
			</el-table>
		</div>
		<!-- 翻页 -->
		<section class="turn-page">
			<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="pageNum" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';


	export default {
		data() {
			return {
				page: 1,
				num: 10,
				count: 0, //数据总条数
				pageNum: 1,
				historyList: [], //历史列表
				status: '2', //状态 
				allTotal: 0,
				statusType: {
					0: '已结束',
					1: '进行中'
				}
			};
		},
		methods: {
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
				if (this.page == 1) {
					this.pageNum = data.total;
					this.count = data.count;
				}
			},
			changeFormat: function(t) {
				t -= 0;
				if (t < 10) {
					return ('0' + t);
				} else {
					return (t + '');
				}
			},
			transFormDates: function(time) {
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
			changStatus: function(type) {
				switch (Number(type)) {
					case 1:
						return '进行中';
					case 0:
						return '已结束';
					default:
						return '未开始';
				}
			},
			getDetail: function(item) {
				storage.session('historydetail', item);
				this.$router.push('/admin/Assistanthistory/detail');
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getHistorys();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getHistorys();
			},
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