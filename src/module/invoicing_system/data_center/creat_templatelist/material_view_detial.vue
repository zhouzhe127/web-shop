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
				<el-button type="primary" @click="filterReset">筛选</el-button>
				<el-button type="info" @click="filterReset('filter')">重置</el-button>
			</div>
		</div>
		<div class="listBox">
			<div class="tableHeard">
				<span>集合名称：{{scopeName}}&nbsp;&nbsp;&nbsp; 集合类型：{{scopeType}}</span>
			</div>
			<el-table :data="tableData" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="date" label="物料名称">
					<template slot-scope="scope">
						<div>{{scope.row.itemInfo.name}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="物料编码">
					<template slot-scope="scope">
						<div>{{scope.row.itemInfo.barCode}}</div>
					</template>
				</el-table-column>
				<el-table-column v-for="(item,index) in mainData.customItem" :key="index" :label="item" prop="code">
					<template slot="header" slot-scope="scope">
						<div>
							<div class="heartitle">
								{{item}}
							</div>
							<div class="heartitle">
								{{mainData.timeAxis[index].beginDate}}至{{mainData.timeAxis[index].endDate}}
							</div>
						</div>	
					</template>
					<template slot-scope="scope">
						<div v-if="scope.row.reportInfo[index]">{{scope.row.reportInfo[index].value}}{{scope.row.reportInfo[index].value&&scope.row.reportInfo[index].value!='--'?scope.row.reportInfo[index].unitName:''}}</div>
					</template>
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
	import http from 'src/manager/http';
	// import exportFile from 'src/verdor/exportFile';
	export default {
		data() {
			return {
				reportName: '--',
				reportId: '', //报表id
				scopeId:'',
				mainData:{},//总数据
				condition: {},
				tableData: [],
				page: 1,
				allTotal: 0,
				num: 10, //每页显示多少条
				scopeName:'',
				scopeType:''
			};
		},
		methods: {
			filterReset(sym) {
				if (sym == 'reset') {
					this.initCondition();
				}
				this.getDetail();
			},
			initCondition() {
				this.condition = {
					name: '',
					code: ''
				};
			},
			//获取报表详情
			async getDetail() {
				// let condition = this.condition;
				console.log(this.condition);
				let subObj = {
					reportId: this.reportId,
					scopeId: this.scopeId,
					page: this.page,
					size: this.num,
					name:this.condition.name||'',
					barCode:this.condition.code||'',
				};
				let res = await this.getHttp('materialreportGetMaterialReportDetail', subObj);
				console.log(res);
				this.allTotal = res.count;
				res.report.push({
					itemInfo:{
						'name': '总计',
						'barCode':'--',
					},
					reportInfo:res.reportCount
				});
				this.tableData = res.report;
				this.mainData = res;
			},
			pageChange(e) {
				this.page = e;
				this.getDetail();
			},
			sizeChange(num) {
				this.num = num;
			},
			initBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					type: '4',
					className: 'plain',
					fn: () => {
						this.$router.go(-1);
					}
				}]);
			},
			async getHttp(url, obj = {}, err = false) {
				let res = await http[url]({
					data: obj
				}, err);
				return res;
			},
		},
		mounted() {
			let query = this.$route.query;
			if (Number(query.id)) {
				this.reportId = Number(query.id);
				this.reportName = query.name||'--';
				this.scopeId = Number(query.scopeId);
				this.scopeName = query.scopeName;
				this.scopeType = query.scopeType;
			}
			this.initBtn();
			this.filterReset();
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
	.heartitle{
		display: block;
		line-height: 20px;
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