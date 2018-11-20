<!--
    **抢购历史详情
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedHistoryDetail">
		<div class="rushedstatus">
			温馨提示:疯抢状态为{{statusType[status]||"未开始"}}...
		</div>
		<!-- 列表 -->
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
			<el-table :data="detailist" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="medium" type="text" @click="getRecord(scope.row)" style="color: rgb(40, 168, 224);">抢购记录</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" width="200" label="创建时间" align="center">
					<template slot-scope="scope">
						<span>{{transFormDates(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="名称" prop="name" align="center">
				</el-table-column>
				<el-table-column prop="createTime" width="120" label="商品图片" align="center">
					<template slot-scope="scope">
						<div class="list_img">
							<img alt="logo" v-bind:src="uploadUrl  + scope.row.showImage" />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="卖价" align="center">
					<template slot-scope="scope">
						<span>￥{{scope.row.price}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="原价" align="center">
					<template slot-scope="scope">
						<span>￥{{scope.row.originalPrice}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="stock" label="库存" align="center">
				</el-table-column>
				<el-table-column prop="grabNum" label="抢购数量" align="center">
				</el-table-column>
				<el-table-column prop="receiveNum" label="已领取" align="center">
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
				count: 0,
				pageNum: 1,
				detailist: [], //详情列表
				uploadUrl: '',
				activityId: '',
				status: '', //状态
				statusType: {
					0: '已结束',
					1: '进行中'
				}
			};
		},
		methods: {
			returnStore: function() {
				this.$router.push('/admin/Assistanthistory');
			},
			async getdetailist() {
				let data = await http.getHistorydetail({
					data: {
						page: this.page,
						num: this.num,
						activityId: this.activityId
					}
				});
				this.detailist = data.list; //获取详情列表数据
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
			getRecord: function(item) { //获取抢购记录
				storage.session('historyrecord', item);
				this.$router.push('/admin/Assistanthistory/detail/record');
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getdetailist();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getdetailist();
			},
			settitle: function() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					fn: () => {
						this.returnStore();
					},
					className: 'el-btn-blue'
				}]);
			}
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
			this.settitle();
			this.uploadUrl = storage.session('userShop').uploadUrl;
			this.activityId = storage.session('historydetail').id;
			this.status = storage.session('historydetail').status;
			this.getdetailist();
		}
	};
</script>
<style type="text/css" scoped>
	#rushedHistoryDetail {
		width: 1437px;
		height: auto;
	}

	#rushedHistoryDetail .rushedstatus {
		margin-bottom: 31px;
		color: #1DA527;
	}

	#rushedHistoryDetail .btnLink a {
		cursor: pointer;
		display: inline-block;
		width: 80px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #28A8E0;
	}

	#rushedHistoryDetail .list_img {
		height: 45px;
	}

	#rushedHistoryDetail .list_img img {
		width: 45px;
		height: 45px;
	}

	#rushedHistoryDetail .turn-page {
		margin: 10px 0 30px 0;
	}
</style>