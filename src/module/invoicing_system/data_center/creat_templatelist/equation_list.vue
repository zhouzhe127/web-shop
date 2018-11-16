/*
* @Author: zhouzhe
* @Date: 2018-10-30 16:40:27
*/
<template>
	<div id="equationList">
		<div v-loading="loading">
			<div class="tableHeard">
				<span>公式管理&nbsp;·&nbsp;已选择<strong>{{allSelection.length}}</strong>个条目</span>
			</div>
			<el-table ref="multipleTable" border :header-cell-style="{'background':'#f5f7fa'}" :data="viewData" tooltip-effect="dark"
			 style="width: 100%">

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
				<el-table-column label="名称" prop="name" width="200">
				</el-table-column>
				<el-table-column prop="formulaStr" label="计算公式" min-width="300">
				</el-table-column>
				<el-table-column prop="formatStr" label="格式" width="200">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="150">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editFormula(scope.row)">编辑</el-button>
						<el-button type="text" size="small" @click="dleSelection(scope.row)" style='color:#D34A2B'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
				 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
			</div>
			<add-formula v-if="showFormula" :list="formulaData" :pObj="formulaInsert" @emit="getFormula"></add-formula>
		</div>
	</div>
</template>	
<script>
import http from 'src/manager/http';
// import utils from 'src/verdor/utils';
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
			showFormula:false,//是否显示公式弹框
			isAdd:false,//是否新建公式项
			baseList:[],//基础项列表
			formulaData:{},//公式列表数据
			formulaInsert:{},//公式数据

			formulaPercent:[//是否半分比
				{label:'数字',value:0},
				{label:'百分百',value:1},
			],
			formulaRounding:[//舍入规则
				{label:'四舍五入',value:0},
				{label:'向上取值',value:1},
				{label:'向下取值',value:2},
			],
			reset:true,
			loading:false,//加载动画
			checkAll:false,
			isIndeterminate:false
		};
	},
	methods: {
		async init() {
			this.loading = true;
			this.checkAll = false;
			this.isIndeterminate = false;
			this.allSelection = [];
			//获取基础项数据
			let base = await http.materialreportGetReportItemList();
			for(let i=0;i<base.length;i++){
				if(base[i].type==0){
					base.splice(i,1);
					i--;
				}
			}
			this.baseList = base;
			this.formulaData.base = this.baseList;
			//获取公式项数据
			let data = await http.materialreportGetStatisticItemFormulaList();
			for(let item of data.list){
				item.formulaStr = item.formula.replace(/id_(\d+)/g,(match,p1)=>{
					for(let base of this.baseList){
						if(p1==base.id){
							return base.name;
						}
					}
				});
				//匹配 是否百分百
				let isPercent = this.formulaPercent.filter((obj)=>{
					return obj.value==item.isPercent;
				})[0].label;
				//匹配 保留几位小数
				let carryRule = this.formulaRounding.filter((obj)=>{
					return obj.value==item.carryRule;
				})[0].label;
				item.formatStr = `${isPercent}, ${item.reserveRule}位小数, ${carryRule}`;
			}
			this.allTotal = data.list.length;
			this.tableData = data.list;
			this.formulaData.formula = data.list;
			this.pagination();

			this.loading = false;
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
		handleCheckAllChange(val) {
			this.viewData.forEach(v=>{
				v.checkOut = val;
			});
			this.isIndeterminate = false;
			this.allSelection = this.getChecked(this.tableData);
			this.resetColumn();
		},
		handleSingleChange(){
			this.allSelection = this.getChecked(this.tableData);
			this.setCheckChange();
			this.resetColumn();
		},
		//编辑公式
		editFormula(res){
			res.title = '编辑公式项';
			this.formulaInsert = res;
			this.isAdd = false;
			this.showFormula = true;
		},
		//编辑公式项-完成
		getFormula(res){
			if(res){
				if(this.isAdd) this.page=1;
				this.init();
			}
			this.showFormula = false;
		},
		crageBtn() {
			this.$store.commit('setPageTools', [
				{
					name: '新建公式项',
					className: 'primary',
					type: 4,
					icon: 'el-icon-plus',
					fn: () => {
						this.isAdd = true;
						this.showFormula = true;
					}
				}
			]);
		},
		dleSelection(data) {
			let str = '';
			let name = '',idArr=[];
			if (data) {
				name = data.name;
				idArr = [data.id];
				str = `是否删除"${name}"`;
			} else {
				if (this.allSelection.length>0) {
					for(let item of this.allSelection){
						idArr.push(item.id);
					}
					str = `是否删除"${this.allSelection[0].name}"等${this.allSelection.length}项`;
				}else{
					return;
				}
			}
			this.$confirm(str, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				http.materialreportDeleteStatisticItemFormula({data:{
					ids:idArr.join(',')
				}}).then(()=>{
					this.$message({type: 'success',message: '删除成功!'});
					this.init();
				});
			}).catch(()=>{
				//
			});
		},
		pageChange(page) {
			this.page = page;
			this.pagination();
			this.setCheckChange();
		},
		setCheckChange(){
			let checkNum = this.getChecked(this.viewData).length;
			this.isIndeterminate = checkNum>0&&checkNum!=this.viewData.length? true:false;
			this.checkAll = checkNum==this.viewData.length? true:false;
		},
		getChecked(list){
			let arr= [];
			list.forEach(v=>{
				if(v.checkOut)arr.push(v);
			});
			return arr;
		},
		sizeChange(num) {
			this.num = num;
			this.pagination();
			this.setCheckChange();
		},
		resetColumn() { //刷新列表方法
			this.reset = false;
			this.$nextTick(() => {
				this.reset = true;
			});
		},
	},
	activated() {
		this.crageBtn();
		this.init();
	},
	deactivated() {
		this.$store.commit('setPageTools', []);
	},
	components: {
		addFormula: () =>
			import( /*webpackChunkName:'add_formula'*/ '../add_formula'),
	},
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