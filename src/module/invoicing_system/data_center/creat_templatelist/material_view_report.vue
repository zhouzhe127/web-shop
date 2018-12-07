<template>
	<div class="pad-bottom">
		<div class="head">
			<span>报表名称 : {{reportName}}</span>
			<!-- <div></div> -->
		</div>
		<div class="search-header">
			<div class="in-block" style="margin-right:10px;">
				<el-input clearable v-model="condition.name" placeholder="物料名称" maxlength="100" style="width:224px"></el-input>
			</div>
			<div class="in-block">
				<el-input clearable v-model="condition.code" placeholder="物料编码" maxlength="50" style="width:224px"></el-input>
			</div>
			<div class="in-block" style="padding-left:10px;">
				<el-button type="primary" @click="filterReset('filter',null)">筛选</el-button>
				<el-button type="info" @click="filterReset('reset',null)">重置</el-button>
			</div>
		</div>
		<div class="listBox">
			<div class="tableHeard">
				<span>调度审核列表&nbsp;·&nbsp;共个条目</span>
			</div>
			<el-table :data="tableData" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="date" label="集合名称">
				</el-table-column>
				<el-table-column prop="code" label="集合类型">
				</el-table-column>
				<el-table-column label="普通入库量" prop="code"></el-table-column>
				<el-table-column prop="createUser" label="申请店铺/品牌">
					<template slot-scope="scope">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="普通入库成本总额">
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box">
			<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
			 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
		</div>
	</div>
</template>
<script>
	// import http from 'src/manager/http';
	// import exportFile from 'src/verdor/exportFile';
	export default {
		data() {
			return {
				reportName: '--',
				reportId: '', //报表id
				condition: {},
				tableData: [],
				page: 1,
				allTotal: 0,
				num: 10, //每页显示多少条
			};
		},
		methods: {
			filterReset(sym) {
				if (sym == 'reset') {
					this.initCondition();
				}
				// this.getDetail();
			},
			initCondition() {
				this.condition = {
					name: '',
					code: ''
				};
			},
			//获取报表详情
			async getDetail() {
				let condition = this.condition;
				let subObj = {
					id: this.reportId,
					name: condition.name,
					barCode: condition.code
				};
				let res = await this.getHttp('materialreportGetMaterialReportDetail', subObj);

				this.tableData = res;

			},
			pageChange(e) {
				this.page = e;
			},
			sizeChange(num) {
				this.num = num;
			},
		},
		mounted() {
			let query = this.$route.query;
			if (Number(query.id)) {
				this.reportId = Number(query.id);
			}
		},
		// components: {},
		// computed: {},
	};
</script>
<style lang='less' scoped>
	.pad-bottom {
		padding-bottom: 20px;
	}

	.tableHeard {
		border: 1px #ebeef5 solid;
		border-bottom: none;
		padding: 15px;
	}

	.in-block {
		margin-bottom: 20px;
		display: inline-block;
	}

	//筛选
	.search-header {
		margin-top: 20px;
		max-width: 1436px;
	}

	.page-box {
		margin-top: 15px;

	}
</style>