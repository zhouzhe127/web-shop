/*
* @Author: zhouzhe
* @Date: 2018-10-30 16:40:27
*/
<template>
	<div id="equationList">
		<div>
			<div class="tableHeard">
				<span>集合管理&nbsp;·&nbsp;已选择<strong>{{allSelection.length}}</strong>个条目</span>
			</div>
			<el-table ref="multipleTable" border v-loading="loading" :header-cell-style="{'background':'#f5f7fa'}" :data="viewData"
			 tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

				<el-table-column label="批量删除">
					<template slot="header" slot-scope="scope">
						<el-button type="text" size="small" style='color:#D34A2B' @click="dleSelection()">批量删除</el-button>
					</template>
					<el-table-column width="100" v-if="reset">
						<template slot="header" slot-scope="scope">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						</template>
						<template slot-scope="scope">
							<el-checkbox v-model="scope.row.checkOut" @change="handleSingleChange"></el-checkbox>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column label="集合名称" prop="name" width="200">
				</el-table-column>
				<el-table-column prop="formula" label="物料数量" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{scope.row.mid.length}}</span>
					</template>
				</el-table-column>
				<el-table-column label="集合单位" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{scope.row.unit.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="dleSelection(scope.row)" style='color:#D34A2B'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
				 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
			</div>
		</div>
		<createCollectionCom v-if="showCreatWin" :collectName="editData.name" :pCollectionId="editData.id" :pUnitId="editData.unit?editData.unit.id:null"
		 :selects="editData.mid" @change="creatWinClose"></createCollectionCom>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				tableData: [],
				viewData: [],
				multipleSelection: [],
				allSelection: [],
				page: 1,
				allTotal: 0,
				num: 10, //每页显示多少条
				showCreatWin: false,
				editData: {},
				loading: true,
				reset: true,
				checkAll: false,
				isIndeterminate: false
			};
		},
		methods: {
			async init() {
				this.checkAll = false;
				this.isIndeterminate = false;
				this.allSelection = [];
				let data = await http.materialreportGetStatisticScopeCategoryList();
				this.allTotal = data.list.length;
				this.tableData = data.list;
				this.loading = false;
				this.pagination();
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				}
			},
			pagination() {
				this.viewData = this.tableData.slice(
					(this.page - 1) * this.num,
					this.page * this.num
				);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;

			},

			crageBtn() {
				this.$store.commit('setPageTools', [{
					name: '新建集合',
					className: 'primary',
					type: 4,
					icon: 'el-icon-plus',
					fn: () => {
						this.editData = {};
						this.showCreatWin = true;
					}
				}]);
			},
			creatWinClose(data) {
				this.showCreatWin = false;
				if (data) {
					this.page = 1;
					this.init();
				}
			},
			editList(data) {
				this.showCreatWin = true;
				this.editData = data;
				console.log(data);
			},
			dleSelection(data) {
				let str = '';
				let name = '';
				let delArr = [];
				if (data) {
					name = data.name;
					str = `是否删除"${name}"`;
					delArr.push(data.id);
				} else {
					if (this.allSelection.length > 0) {
						for (let item of this.allSelection) {
							delArr.push(item.id);
						}
						str = `是否删除"${this.allSelection[0].name}"等${this.allSelection.length}项`;
					} else {
						return;
					}
				}
				this.$confirm(str, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					await http.materialreportDeleteStatisticScopeCategory({
						data: {
							ids: delArr.join(',')
						}
					});
					this.multipleSelection = [];
					this.allSelection = {};
					this.init();
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			handleCheckAllChange(val) {
				this.viewData.forEach(v => {
					v.checkOut = val;
				});
				this.isIndeterminate = false;
				this.allSelection = this.getChecked(this.tableData);
				this.resetColumn();
			},
			handleSingleChange() {
				this.allSelection = this.getChecked(this.tableData);
				this.setCheckChange();
				this.resetColumn();
			},
			getChecked(list) {
				let arr = [];
				list.forEach(v => {
					if (v.checkOut) arr.push(v);
				});
				return arr;
			},
			setCheckChange() {
				let checkNum = this.getChecked(this.viewData).length;
				this.isIndeterminate = checkNum > 0 && checkNum != this.viewData.length ? true : false;
				this.checkAll = checkNum == this.viewData.length ? true : false;
			},
			resetColumn() { //刷新列表方法
				this.reset = false;
				this.$nextTick(() => {
					this.reset = true;
				});
			},
			pageChange(page) {
				this.page = page;
				this.pagination();
				this.setCheckChange();
			},
			sizeChange(num) {
				this.num = num;
				this.pagination();
				this.setCheckChange();
			}
		},
		activated() {
			this.crageBtn();
			this.init();
		},
		deactivated() {
			this.$store.commit('setPageTools', []);
		},
		components: {
			createCollectionCom: () => import( /* webpackChunkName:"report_add_collection_win"*/
				'src/module/invoicing_system/data_center/report_add_collection_win.vue')
		}
	};
</script>
<style lang='less' scoped>
	#equationList {
		.tableHeard {
			border: 1px #ebeef5 solid;
			border-bottom: none;
			padding: 15px;

			strong {
				color: #e1bb4a;
			}
		}

		.page-box {
			margin-top: 15px;
		}
	}
</style>