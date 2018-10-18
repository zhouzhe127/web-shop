/*
* @Author: zhouzhe
* @Date: 2018-10-10 15:02:49
*/

<template>
	<div class="purtemplate">
		<div class="listBox">
			<el-table :data="tableData" border :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="date" label="序号" type="index" width="150">
				</el-table-column>
				<el-table-column prop="name" width="500" label="模板名称">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="deleteList(scope.row,scope.$index)">删除</el-button>
						<el-button type="text" size="small" @click="toCreat(scope.row.id)">使用</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				tableData: [],
			};
		},
		methods: {
			async init() {
				let data = await http.InvoigetPurchaseTemplates();
				this.tableData = data;
			},
			deleteList(rows, index) {
				this.$confirm(`此操作将删除“${rows.name}”模板, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let data = await http.InvoiDeleteTemplate({
						data: {
							id: rows.id
						}
					});
					if (data) {
						this.tableData.splice(index, 1);
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					}

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			toCreat(id){
				this.$router.push({
					path: 'purchaseManagement/create',
					query:{
						tempId:id
					}
				});
			}
		},
		activated() {
			this.init();
		},
		mounted() {
			if(this.$route.path=='/admin/purchaseManagement'){
				this.init();
			}	
		}
	};
</script>
<style lang='less' scoped>
	.purtemplate {
		.listBox {
			max-width: 801px;
			margin-top: 20px;
		}

		.page-box {
			margin-top: 15px;
		}
	}
</style>