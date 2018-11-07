<!--
    **客户金币记录
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="goldRecord">
		<section>
			<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'工作人员'" :showTitle='1' :allTotal="count">
			</com-table> -->
			<div class="list_box">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>金币记录</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="formList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="status" label="操作类型" align="center">
					</el-table-column>
					<el-table-column label="操作时间" prop="createTime" align="center">
					</el-table-column>
					<el-table-column prop="staffName" label="对应客户" align="center">
					</el-table-column>
					<el-table-column prop="operateAmount" label="金币" align="center">
					</el-table-column>
				</el-table>
			</div>
		</section>
		<!-- 翻页 -->
		<section class="turn-page">
			<!-- <pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				page: 1, //页码数
				num: 10,
				count: '', //记录条数
				endTotal: 0, //共多少页
				formList: [], //展示的数据			
			};
		},
		props: {
			staffFansId: String //导购的id
		},
		methods: {
			// getPageNum: function(obj) { //翻页
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.coinsLog();
			// },
			async coinsLog() {
				let data = await http.coinsLog({
					data: {
						staffFansId: this.staffFansId,
						page: this.page,
						num: this.num
					}
				});
				if (data) {
					this.count = data.count;
					this.endTotal = data.total;
					this.formList = data.list;
				}
			},
			wentBack: function() {
				//   关闭弹框
				this.$store.commit('setPageTools', {});
				this.$emit('coinsBack');
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.coinsLog();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.coinsLog();
			},
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
			pageElement: () =>
				import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: 'el-btn-blue',
				fn: () => {
					this.wentBack();
				}
			}]);
			this.coinsLog(); //查看金币记录
		}
	};
</script>
<style type="text/css" scoped>
	#goldRecord {
		width: 100%;
		height: auto;
	}
</style>