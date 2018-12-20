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

				<el-table-column v-if="reset" width="150">
					<!-- <template slot="header" slot-scope="scope">
						<el-button type="text" size="small" style='color:#D34A2B' @click="dleSelection()">批量删除</el-button>
					</template>
					<el-table-column width="100" v-if="reset"> -->
						<template slot="header" slot-scope="scope">
							<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
							<el-button type="text" size="small" style='color:#606266' @click="dleSelection()">批量删除</el-button>
						</template>
						<template slot-scope="scope">
							<el-checkbox v-model="scope.row.checkOut" @change="handleSingleChange"></el-checkbox>
						</template>
					<!-- </el-table-column> -->
				</el-table-column>
				<el-table-column label="集合名称" prop="name" width="200">
				</el-table-column>
				<el-table-column label="集合类型" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{gatherType[scope.row.type]}}</span>
					</template>
				</el-table-column>
				<el-table-column label="说明" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{getExplain(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editList(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="dleSelection(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
				 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
			</div>
		</div>
		<!-- <createCollectionCom v-if="showCreatWin" :title="isEdit?'编辑集合':'新建集合'" :collectName="editData.name" :pCollectionId="editData.id" :pUnitId="editData.unit?editData.unit.id:null"
		 :selects="editData.mid" @change="creatWinClose"></createCollectionCom> -->
		 <creatGatherWin v-if="showCreatWin" :materialList="materialList" :title="isEdit?'编辑集合':'新建集合'" :editData='editData' @change="creatWinClose"></creatGatherWin>
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
				isIndeterminate: false,
				isEdit:false,
				materialList:[],//物料列表
				gatherType:{
					3:'物料',
					4:'单位-物料集合',
					5:'供应商-物料集合',
					6:'物料-供应商集合',
				}
			};
		},
		methods: {
			async init() {
				this.checkAll = false;
				this.isIndeterminate = false;
				this.allSelection = [];
				let data = await http.materialreportGetStatisticScopeCategoryList();
				console.log(data);
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
				console.log(this.viewData);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;

			},
			getExplain(data){//生成说明
				let str = '';
				let text = '';
				if(data.type!=6)str = data.isCategory==0?`物料数量：${data.mid.length}`:`物料分类数量：${data.cid.length}`;
				switch(data.type){
					// case 3:
					// 	str = data.isCategory==0?`物料数量：${data.mid.length}`:`物料分类数量：${data.cid.length}`
					// 	break;
					case 4:
						text = `物料单位：${data.unit.name}；`;
						str = text+str;
						break;
					case 5:
						text = `供应商数量：${data.supplierName.split(',').length}；`;
						str = text+str;
						break;
					case 6:
						str = `物料名称：${this.getMateralName(data.mid).name}；供应商数量：${data.supplierName.split(',').length}`;
						break;		
				}
				return str;
			},
			getMateralName(id){
				let sele = '';
				for(let item of this.materialList){
					if(id == item.id){
						sele = item;
						break;
					}
				}
				return sele;
			},
			crageBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: '',
					type: 4,
					icon: 'el-icon-plus',
					fn: () => {
						window.history.go(-1);
					}
				},{
					name: '新建集合',
					className: 'primary',
					type: 4,
					icon: 'el-icon-plus',
					fn: () => {
						this.editData = {};
						this.isEdit = false;
						this.showCreatWin = true;
					}
				}]);
			},
			creatWinClose(data) {
				if(!data||!data.continue)this.showCreatWin = false;
				if (data) {
					this.page = 1;
					this.init();
				}
			},
			editList(data) {
				this.showCreatWin = true;
				this.editData = data;
				this.isEdit = true;
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
			},
			//获取所有物料
			async recursiveGetMaterialList() {
				let subObj = {
					name: '',
					cid: '',
					type: -1,
					num: 50
				};

				let page = 1;
				let arr = [];

				for (let i = 0; i < page; i += 1) {
					subObj.page = i + 1;
					let retObj = await http.getMaterialList({
						data: subObj
					});
					page = Number(retObj.total);
					arr.push(...retObj.list);
				}
				this.materialList = arr;
				// return arr;
			},
		},
		activated() {
			this.crageBtn();
			this.init();
			this.recursiveGetMaterialList();
		},
		deactivated() {
			this.$store.commit('setPageTools', []);
		},
		components: {
			createCollectionCom: () => import( /* webpackChunkName:"report_add_collection_win"*/
				'src/module/invoicing_system/data_center/report_add_collection_win.vue'),
			creatGatherWin: () =>
				import( /*webpackChunkName: 'creat_gather_win'*/ './creat_gather_win.vue'), //新建集合
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