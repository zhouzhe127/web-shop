/*
* @Author: zhouzhe
* @Date: 2018-10-30 16:40:27
*/
<template>
	<div id="equationList">
		<div>
			<div class="tableHeard">
				<span>公式管理&nbsp;·&nbsp;已选择<strong>{{allTotal}}</strong>个条目</span>
			</div>
			<el-table ref="multipleTable" border :header-cell-style="{'background':'#f5f7fa'}" :data="viewData" tooltip-effect="dark"
			 style="width: 100%" @selection-change="handleSelectionChange">

				<el-table-column label="批量删除">
					<template slot="header" slot-scope="scope">
						<el-button type="text" size="small" @click="dleSelection()">批量删除</el-button>
					</template>
					<el-table-column type="selection" width="100"></el-table-column>
				</el-table-column>
				<el-table-column label="名称" prop="name" width="200">
				</el-table-column>
				<el-table-column prop="formula" label="计算公式" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="address" label="格式" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{carryRule(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="dleSelection(scope.row)">删除</el-button>
						<el-button type="text" size="small">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
				 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import http from "src/manager/http";
	export default {
		data() {
			return {
				tableData: [],
				viewData: [],
				multipleSelection: [],
				allSelection: {},
				page: 1,
				allTotal: 0,
				num: 10 //每页显示多少条
			};
		},
		methods: {
			async init() {
				let data = await http.materialreportGetStatisticItemList();
				this.allTotal = data.list.length;
				this.tableData = data.list;
				console.log(data);
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
				this.$store.commit("setPageTools", [
					//     {
					//     name: '批量删除',
					//     className: 'danger',
					//     type: 5,
					//     icon:'el-icon-delete',
					//     fn: () => {

					//     }
					// },
					{
						name: "新建公式项",
						className: "primary",
						type: 4,
						icon: "el-icon-plus",
						fn: () => {}
					}
				]);
			},
			dleSelection(data) {
				let str = '';
				let name = ''
				if (data) {
					name = data.name;
					str = `是否删除"${name}"`
				} else {
					console.log(Object.values(this.allSelection));
					let num = 0;
					if(this.multipleSelection.length>0)this.allSelection[this.page] = this.multipleSelection; //保存每页选中
					if (Object.values(this.allSelection).length>0) {
						for (let item of Object.values(this.allSelection)) {
                            if (item.length > 0) {
                                for (let v of item) {
                                    name = v.name;
                                    break;
                                }
                                break;
                            }
                        }
						for (let key in this.allSelection) {
							if (this.allSelection[key]) {
								num += this.allSelection[key].length;
							}
						}
						str = `是否删除"${name}"等${num}项`;
					}else{
						return;
					}
				}
				this.$confirm(str, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
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
			pageChange(page) {
				this.allSelection[this.page] = this.multipleSelection; //保存每页选中
				this.page = page;
				this.pagination();
				this.$nextTick(() => { //显示本页选中
					this.toggleSelection(this.allSelection[page]);
				});
			},
			sizeChange(num) {
				this.num = num;
				this.pagination();
			},
			carryRule(data) {
				let strSet = {
					0: '四舍五入',
					1: '向上取值',
					2: '向下取值'
				}
				let str1 = data.isPercent ? '百分比,' : '数字,';
				let str2 = `保留${data.reserveRule}位小数,`;
				let str3 = strSet[data.carryRule];
				return str1 + str2 + str3;
			}
		},
		activated() {
			this.crageBtn();
			this.init();
		},
		deactivated() {
			this.$store.commit("setPageTools", []);
		},
		watch: {
			viewData() {
				console.log(this.allSelection);
			}
		},
		components: {},
		computed: {

		}
	};
</script>
<style lang='less' scoped>
	#equationList {
		.tableHeard {
			border: 1px #f5f7fa solid;
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