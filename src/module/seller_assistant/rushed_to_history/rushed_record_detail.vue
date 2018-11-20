<!--
    **抢购记录
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedRecord">
		<div class="rushedstatus">
			名称:{{goodsname}}
		</div>
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>抢购记录</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
					<p>抢购领取:{{receiveNum}}份</p>
					<p>抢购数量:{{grabNum}}份</p>
				</div>
			</div>
			<el-table :data="recordorderlist" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="抢购用户" align="center">
					<template slot-scope="scope">
						<div class="imgbox">
							<img v-if="scope.row.imageUrl != ''" :src="scope.row.imageUrl" />
				</div>
							<div class="namebox">
								<span>{{scope.row.name}}</span>
							</div>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" width="200" label="数量" align="center">
					<template slot-scope="scope">
						<span>1</span>
					</template>
				</el-table-column>
				<el-table-column label="购买时间" prop="name" align="center">
					<template slot-scope="scope">
						<span>{{transFormDates(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="是否领取" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.status=="7" ? "是" : "否"}}</span>
					</template>
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
				allTotal: 0,
				page: 1,
				count: 0,
				num: 10,
				pageNum: 1,
				showPageList: [10, 20],
				goodsId: '', //商品id
				goodsname: '', //商品名称
				uploadUrl: '',
				grabNum: '', // 抢购商品
				receiveNum: '', //领取数量
				recordorderlist: [] //抢购人员列表
			};
		},
		methods: {
			returnStore: function() {
				this.$router.push('/admin/Assistanthistory/detail/record');
			},
			async getUserList() {
				let data = await http.getUserLists({
					data: {
						shop: this.shopId,
						goodsId: this.goodsId,
						page: this.page,
						num: this.num
					}
				});
				this.grabNum = data.grabNum; //抢购数量
				this.receiveNum = data.receiveNum; //领取数量
				this.recordorderlist = data.orderList; //抢购记录列表
				//获取抢购人员
				for (let i = 0; i < data.fansList.length; i++) {
					for (let j = 0; j < this.recordorderlist.length; j++) {
						if (this.recordorderlist[j].fid == data.fansList[i].id) {
							this.recordorderlist[j].name = data.fansList[i].name;
							this.recordorderlist[j].imageUrl = data.fansList[i].imageUrl;
						}
					}
				}
				this.pageNum = data.total;
				this.count = data.count;
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
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getRecordlist();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getRecordlist();
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
			this.goodsId = storage.session('recordStock').goodsId;
			this.shopId = storage.session('recordStock').shopId;
			this.goodsname = storage.session('historyrecord').name;
			this.getUserList();
		}
	};
</script>
<style type="text/css" scoped>
	#rushedRecord {
		width: 1437px;
		height: auto;
	}

	#rushedRecord .rushedstatus {
		margin-bottom: 31px;
		color: #1DA527;
	}

	#rushedRecord .list {
		width: 1436px;
		min-height: 156px;
		border: 1px solid #D2D2D2;
	}

	#rushedRecord .list .list_title {
		width: 1436px;
		height: 45px;
		line-height: 45px;
		padding-left: 17px;
		padding-right: 68px;
	}

	#rushedRecord .list .list_title span {
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}

	#rushedRecord .list .list_title span:first-child {
		margin-right: 11px;
	}

	#rushedRecord .list .list_title span:nth-child(2) {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #000;
		margin-right: 11px;
		vertical-align: middle;
		margin-top: 20px;
	}

	#rushedRecord .list .list_title .record {
		font-size: 16px;
		color: #FF3C05;
	}

	#rushedRecord .list .list_title .num {
		height: 45px;
		line-height: 45px;
	}

	#rushedRecord .list .list_title .num p {
		display: inline;
		font-size: 16px;
	}

	#rushedRecord .list .heads {
		width: 1436px;
		height: 41px;
		background: #F2F2F2;
	}

	#rushedRecord .list .heads li {
		float: left;
		text-align: center;
		line-height: 41px;
		font-size: 16px;
		color: #43414A;
	}

	#rushedRecord .list .heads li:nth-child(1) {
		width: 25%;
	}

	#rushedRecord .list .heads li:nth-child(2) {
		width: 25%;
	}

	#rushedRecord .list .heads li:nth-child(3) {
		width: 25%;
	}

	#rushedRecord .list .heads li:nth-child(4) {
		width: 25%;
	}

	#rushedRecord .list .nolist {
		width: 1436px;
		text-align: center;
		line-height: 70px;
		font-size: 24px;
		color: #E0E0E0;
	}

	#rushedRecord .list .contents {
		width: 1436px;
		height: 69px;
		border-bottom: 1px solid #F7F7F7;
	}

	#rushedRecord .list .contents li {
		float: left;
		height: 69px;
		text-align: center;
		line-height: 69px;
		font-size: 14px;
		color: #666;
	}

	#rushedRecord .userbox {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	#rushedRecord .imgbox,
	#rushedRecord .namebox {
		width: 50%;
		height: 100%;
		float: left;
		display: flex;
		align-items: center;
	}

	#rushedRecord .imgbox {
		justify-content: flex-end;
	}

	#rushedRecord .namebox {
		height: 42px;
		justify-content: flex-start;
	}

	#rushedRecord .imgbox img {
		width: 42px;
		height: 42px;
		margin-right: 20px;
	}

	#rushedRecord .turn-page {
		margin: 10px 0 30px 0;
	}

	#rushedRecord .list_title {
		width: 100%;
		height: 50px;
	}

	#rushedRecord .list_title .list_title_l,
	#rushedRecord .list_title .list_title_r {
		width: 50%;
		height: 100%;
		float: left;
		line-height: 45px;
	}

	#rushedRecord .list_title .list_title_l span {
		font-size: 16px;
		color: #333;
		font-weight: bold;
	}

	#rushedRecord .list_title .list_title_l span:first-child {
		margin-right: 11px;
	}

	#rushedRecord .list_title .list_title_l span:nth-child(2) {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #000;
		margin-right: 11px;
		vertical-align: middle;
	}

	#rushedRecord .list_title .list_title_l span:last-child a {
		font-size: 16px;
		color: #ff3c05;
	}

	#rushedRecord .list_title .list_title_r p {
		display: inline-block;
		float: right;
		font-size: 16px;
		margin-right: 40px;
	}
</style>