<template>
	<div class="pad-bottom">
		<div class="head">
			<span>报表名称 : {{reportName}}</span>
			<!-- <div></div> -->
		</div>
		<!-- <div class="search-header">
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
		</div> -->
		<div class="listBox">
			<div class="tableHeard">
				<span>{{reportName}} - 列表</span>
			</div>
			<el-table :data="tableData" v-if="reset" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="scopeName" min-width='150px' fixed="left" label="集合名称">
					<template slot-scope="scope">
						<el-button type="text" @click="toDetail(scope.row)">{{scope.row.scopeName}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="集合类型">
					<template slot-scope="scope">
						<div>{{gatherType[scope.row.type]}}</div>
					</template>
				</el-table-column>
				<el-table-column v-for="(item,index) in mainData.statisticItem" min-width='230px' :key="index" :label="item.scopeName" prop="code">
					<template slot="header" slot-scope="scope">
						<div>
							<div class="heartitle">
								{{item.scopeName}}
							</div>
							<div class="heartitle">
								{{item.content.beginDate}}至{{item.content.endDate}}
							</div>
						</div>	
					</template>
					<template slot-scope="scope">
						<div v-if="scope.row.content.count">{{scope.row.content.count[index].value}}{{scope.row.content.count[index].value&&scope.row.content.count[index].value!='--'?scope.row.content.count[index].unitName:''}}</div>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="createUser" label="申请店铺/品牌">
					<template slot-scope="scope">
						<div></div>
					</template>
				</el-table-column>
				<el-table-column label="普通入库成本总额">
				</el-table-column> -->
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
	import exportFile from 'src/verdor/exportFile';
	// import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				reportName: '--',
				reportId: '', //报表id
				// condition: {},
				mainData:{},
				tableData: [],
				page: 1,
				allTotal: 0,
				num: 10, //每页显示多少条
				gatherType:{
					3:'物料',
					4:'单位-物料集合',
					5:'供应商-物料集合',
					6:'物料-供应商集合',
				},
				reset: true
			};
		},
		methods: {
			// filterReset(sym) {
			// 	if (sym == 'reset') {
			// 		this.initCondition();
			// 	}
			// 	this.getDetail();
			// },
			// initCondition() {
			// 	this.condition = {
			// 		name: '',
			// 		code: ''
			// 	};
			// },
			//获取报表详情
			async getDetail() {
				// let condition = this.condition;
				let subObj = {
					// name:this.condition.name||'',
					// barCode:this.condition.code||'',
					reportId: this.reportId,
					page: this.page,
					size: this.num,
				};
				let res = await this.getHttp('materialreportGetScopeList', subObj);
				this.resetColumn();
				this.mainData = res;
				this.tableData = res.list;
				this.allTotal = res.count;
			},
			resetColumn(item) { //刷新列表方法
				this.reset = false;
				if(item) this.checkTime(item.itemData);
				this.$nextTick(() => {
					this.reset = true;
				});
			},
			pageChange(e) {
				this.page = e;
				this.getDetail();
			},
			sizeChange(num) {
				this.num = num;
			},
			async getHttp(url, obj = {}, err = false) {
				let res = await http[url]({
					data: obj
				}, err);
				return res;
			},
			toDetail(data){
				let obj ={
					id:this.reportId,
					name:this.reportName,
					scopeId:data.id,
					scopeType : data.type,
					scopeName:data.scopeName
				};
				this.$router.push({
					path: 'reportDetail',
					query: obj,
				});
			},
			initBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					type: '4',
					className: 'plain',
					fn: () => {
						this.$router.go(-1);
					}
				},
				{
					name: '删除',
					type: '4',
					className: 'danger',
					fn: () => {
						this.delTemplate('确定要删除当前报表吗?', this.reportId);
					}
				},
				{
					name: '导出',
					type: '4',
					className: 'primary',
					fn: async () => {
						let res = await this.getHttp('materialreportExportMaterialReportExcel', {
							id: this.reportId
						});
						exportFile({
							url: res,
						});
					}
				},]);
			},
			//删除报表
			delTemplate(tips, ids) {
				this.$confirm(tips, '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.getHttp('materialreportDeleteMaterialByIds', {
						ids: ids
					}).then((res) => {
						if (res) {
							this.$message('删除成功!');
							this.$router.go(-1);
						} else {
							this.$message('删除失败!');
						}
					});
				}).catch(() => {
					console.log('取消');
				});
			},
			// getTime(time) {
			// 	time = Number(time);
			// 	if(!time) return '--';
			// 	return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			// },
		},
		activated() {
			let query = this.$route.query;
			if (Number(query.id)) {
				this.reportId = Number(query.id);
				this.reportName = query.name;
			}
			this.initBtn();
			this.getDetail();
		},
		// components: {},
		// computed: {},
	};
</script>
<style lang='less' scoped>
	.pad-bottom {
		padding-bottom: 20px;
	}
	.head{
		span{
			font-size: 16px;
		}
		margin-bottom: 20px;
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