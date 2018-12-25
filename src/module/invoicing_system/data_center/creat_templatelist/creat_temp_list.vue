/*
* @Author: zhouzhe
* @Date: 2018-10-30 16:32:20
* @file:新建模板
*/
<template>
	<div id="tempList">
		<div class="inpStyle">
			<span class="required label">模板名称</span>
			<div class="inpbox">
				<el-input clearable v-model="listName" maxlength="20" class="el-in" placeholder="输入表名称"></el-input>
			</div>
		</div>
		<div class="inpStyle">
			<span class="required label">查看权限</span>
			<div class="btnbox">
				<el-tag v-for="(tag,i) in sleRoleArr" style="margin:0 0 15px 15px;" :key="i" @close='handleClose(i)' closable>
					{{tag.name}}
				</el-tag>
				<div class="addBtn">
					<el-button type="text" @click="addPosition" icon="el-icon-circle-plus-outline">添加权限职位</el-button>
				</div>
			</div>
		</div>
		<div>
			<el-button icon="el-icon-plus" @click="addColumnlist(1)" plain>添加行</el-button>
			<el-button icon="el-icon-plus" @click="addColumnlist(2)" plain>添加列</el-button>
		</div>
		<div class="tableBox" style="max-width: 100%">
			<el-table :data="tableData">
				<el-table-column prop="date" fixed="left" label="序号" width="50">
					<el-table-column type="index" label="#" width="50">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="date" fixed="left" width="200" label="#">
					<el-table-column prop="name" label="名称" width="200">
						<template slot-scope="scope">
							<div>
								<span>{{scope.row.strTitle}}</span>
								<div class="editbtn">
									<el-button type="text" @click="editRow(scope.row,scope.$index)" icon="el-icon-edit"></el-button>
									<el-button type="text" @click="delColumn(scope.$index,1,scope.row)" icon="el-icon-delete"></el-button>
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table-column>
				<el-table-column prop="date" v-if="reset" :label="`${index+1}`" v-for="(item,index) in columnData" :key="index">
					<el-table-column min-width="240">
						<template slot="header" slot-scope="scope">
							<div class="detailsBtn">
								<el-popover trigger="hover" width="300">
									<div class="popover">
										<p>
											<span>统计</span>:<span>{{item.item.name}}({{item.type==2?"公式项":"标准项"}})</span>
										</p>
										<p v-if="item.type==2">
											<span>公式</span>:<span>{{item.item.formulaName}}</span>
										</p>
										<p v-if="item.type==2">
											<span>格式</span>:<span>{{item.item.formatName}}</span>
										</p>
										<p>
											<span>关联店铺</span>:<span>{{item.allShopName}}</span>
										</p>
										<p>
											<span>关联仓库</span>:<span>{{item.allWareName}}</span>
										</p>
									</div>

									<el-button type="text" slot="reference">{{item.name}}</el-button>
								</el-popover>

							</div>
							<div class="editbtn">
								<el-button type="text" @click="editColumn(item,index)" icon="el-icon-edit"></el-button>
								<el-button type="text" @click="delColumn(index,2)" icon="el-icon-delete"></el-button>
							</div>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
		<add-position v-if="positionWin" :title="'查看权限职位选择'" :roleList="roleList" :sleRoleArr="sleRoleArr" @positionEvent="positionEvent"></add-position>
		<add-column v-if="columnShow" :pObj="columnListData" @emit="columnEmit"></add-column>
		<addRow-win v-if="rowShow" :title="isEdit?'编辑行':'添加行'" :pShowMaterial="pShowMaterial" :pList="materialList" :pSortObj="pSortObj"
		 :pScope="pScope" :pCollection="pCollection" @change="getRowData"></addRow-win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	// import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	let shopMessage = storage.session('userShop');
	let shopId = storage.session('shopId');
	let shopList = [];
	for (let item of shopMessage.shopList.brand) {
		shopList = [...shopList, item, ...item.direct, ...item.franchise];
	}
	for (let item of shopMessage.shopList.noBrand) {
		shopList = [...shopList, item];
	}
	export default {
		data() {
			return {
				listName: '',
				tableData: [],
				columnData: [], //列数据
				positionWin: false,
				roleList: [], //门店职位列表
				sleRoleArr: [], //选中的职位
				columnShow: false, //选择列
				reset: true,
				columnListData: {}, //需要编辑列
				rowShow: false, //显示行
				pSortObj: {}, //行排序
				pScope: [], //行物料范围
				pCollection: '', //行选择的集合
				isEdit: false, //是否为编辑
				editIndex: 0, //编辑项
				formulaPercent: [ //是否半分比
					{
						label: '数字',
						value: 0
					},
					{
						label: '百分百',
						value: 1
					},
				],
				formulaRounding: [ //舍入规则
					{
						label: '四舍五入',
						value: 0
					},
					{
						label: '向上取值',
						value: 1
					},
					{
						label: '向下取值',
						value: 2
					},
				],
				id: '',
				materialList: [], //物料列表
				pShowMaterial: true //添加行是否展示选择物料的弹窗
			};
		},
		methods: {
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
			async init() {
				let data = await http.templateGetReportTemplateDetail({
					data: {
						id: this.id
					}
				});
				if (data) {
					this.listName = data.name;
					this.sleRoleArr = this.getRoleById(data.position.split(','));
					this.columnData = this.setColumnData(data.statisticItem);
					this.tableData = this.setRowData(data.statisticScope);
					// this.resetColumn();
				}
				console.log(this.columnData);
				console.log(data);
			},
			getRoleById(arrId) {
				let arrItem = [];
				arrId.forEach(id => {
					this.roleList.forEach(v => {
						if (v.id == id) {
							arrItem.push(v);
						}
					});
				});
				return arrItem;
			},
			setColumnData(columnData) { //处理编辑的列数据
				let arrItem = [];
				let sort = 0;
				for (let item of columnData) {
					sort++;
					let obj = {};
					obj.name = item.colName;
					obj.item = {};
					obj.type = item.type;
					obj.item.name = this.getlistName(this.reportData, item.id, 'id', 'name');
					obj.item.id = item.id;
					let wareIdList = [];
					item.relation.map(v => {
						console.log(v.shopId);
						v.id = v.shopId;
						v.name = this.getlistName(shopList, v.shopId, 'id', 'name');
						wareIdList = [...wareIdList, ...v.wid];
					});
					obj.warehouse = this.getWareArr(wareIdList);
					obj.store = item.relation;
					obj.sortObj = { //排序
						num: sort,
						max: columnData.length
					};
					let shopNameArr = [];
					let wareNameArr = [];
					item.relation.forEach(s => {
						shopNameArr.push(this.getlistName(shopList, s.shopId, 'id', 'name'));
						s.wid.forEach(w => {
							wareNameArr.push(this.getlistName(this.wareList, w, 'id', 'name'));
						});
					});
					obj.allShopName = shopNameArr.join(',');
					obj.allWareName = wareNameArr.join(',');
					if (item.type == 2) {
						obj.item.formulaName = item.staticInfo.formula.replace(/id_(\d+)/g, (match, p1) => {
							for (let base of this.reportData) {
								if (p1 == base.id) {
									return base.name;
								}
							}
						});
						//匹配 是否百分百
						let isPercent = this.formulaPercent.filter((obj) => {
							return obj.value == item.staticInfo.isPercent;
						})[0].label;
						//匹配 保留几位小数
						let carryRule = this.formulaRounding.filter((obj) => {
							return obj.value == item.staticInfo.carryRule;
						})[0].label;
						obj.item.formatName = `${isPercent}, ${item.staticInfo.reserveRule}位小数, ${carryRule}`;
					}
					arrItem.push(obj);
				}
				return arrItem;
			},
			getWareArr(arr) {
				let arrItem = [];
				arr.forEach(v => {
					let obj = {
						id: v,
						name: this.getlistName(this.wareList, v, 'id', 'name')
					};
					arrItem.push(obj);
				});
				return arrItem;
			},
			setRowData(rowData) { //处理编辑的行数据
				let arrItem = [];
				let sort = 0;
				for (let item of rowData) {
					let obj = {
						pScope: [],
						pCollection: {}
					};
					sort++;
					obj.pSortObj = { //排序
						num: sort,
						max: rowData.length
					};
					obj.pCollection = item.setInfo;
					obj.strTitle = `${item.setInfo.name}（${this.getExplain(item.setInfo)}种）`;
					arrItem.push(obj);
				}
				return arrItem;
			},
			getlistName(...agurs) {
				let [list, id, keyId, KeyName] = agurs;
				let name = '';
				for (let item of list) {
					if (item[keyId] == id) {
						name = item[KeyName];
						break;
					}
				}
				return name;
			},
			handleClose(index) {
				this.sleRoleArr.splice(index, 1);
			},
			addPosition() {
				this.positionWin = true;
			},
			positionEvent(sle) {
				if (sle) {
					this.sleRoleArr = sle;
				}
				this.positionWin = false;
			},
			crageBtn() {
				this.$store.commit('setFixButton', [{
					name: '取消',
					className: 'info',
					type: 1,
					fn: () => {
						window.history.go(-1);
					}
				}, {
					name: '确定',
					className: 'primary',
					type: 1,
					fn: () => {
						this.sendallData();
					}
				}]);
			},
			setXdata() { //处理列数据
				let arr = [];
				for (let item of this.columnData) {
					let obj = {};
					Object.assign(obj, {
						id: item.item.id,
						type: item.type,
						colName: item.name
					});
					let wareArr = [];
					item.store.forEach(v => {
						let o = {};
						Object.assign(o, {
							shopId: v.id,
							wid: v.wid
						});
						wareArr.push(o);
					});
					obj.relation = wareArr;
					arr.push(obj);
				}
				return arr;
			},
			setYdata() { //处理行数据
				let arr = [];
				for (let item of this.tableData) {
					let obj = {};
					// if (item.pScope.length > 0) {
					// 	obj.type = 3; //物料范围
					// 	obj.mid = item.pScope;
					// } else {
					obj.type = item.pCollection.type; //统计范围
					obj.id = item.pCollection.id;
					// obj.name = item.pCollection.name;
					// }
					arr.push(obj);
				}
				return arr;
			},
			async sendallData() {
				let rgx = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/;
				if (!rgx.test(this.listName)) {
					this.$message.error('模板名称输入错误');
					return;
				}
				let statisticItem = this.setXdata();
				let statisticScope = this.setYdata();
				if (statisticScope.length <= 0) {
					this.$message.error('请选择添加行！');
					return;
				}
				if (statisticItem.length <= 0) {
					this.$message.error('请选择添加列！');
					return;
				}
				let arr = [];
				this.sleRoleArr.forEach(v => {
					arr.push(v.id);
				});
				if (arr.length <= 0) {
					this.$message.error('请选择职位权限');
					return;
				}
				let url = this.id ? 'templateEditReportTemplate' : 'templateAddReportTemplate';
				let sendObj = {
					name: this.listName,
					position: arr.join(','),
					statisticItem: statisticItem,
					statisticScope: statisticScope
				};
				if (this.id) sendObj.id = this.id;
				let data = await http[url]({
					data: sendObj
				});
				if (!this.id) this.id = data;
				if (data) {
					// window.history.go(-1);
					this.$router.push({
						path: '/admin/materialReport/createReport',
						query: {
							id: this.id,
							name: this.listName
						}
					});
					this.$message({
						type: 'success',
						message: `${this.id?'修改':'添加'}成功!`
					});
				}
			},
			sendErr(str) {
				this.$message.error(str);
			},
			async getRoleList() {
				let data = await http.getUserRoleList();
				this.roleList = [];
				data.forEach(v => {
					if (v.shopId == shopId) this.roleList.push(v);
				});
				console.log(this.roleList);
			},
			delColumn(index, type) { //type:1是行，2是列
				let str = type == 1 ? '行' : '列';
				let data = type == 1 ? this.tableData : this.columnData;
				this.$confirm(`是否删除第${index+1}${str}`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					data.splice(index, 1);
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
					this.resetColumn();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			addColumnlist(type) {
				this.isEdit = false;
				if (type == 1) {
					this.rowShow = true;
					this.pSortObj = {
						num: this.tableData.length + 1,
						max: this.tableData.length + 1,
					};
					this.pScope = [];
					this.pCollection = '';
				} else {
					this.columnListData = {};
					this.columnListData.sortObj = {
						num: this.columnData.length + 1,
						max: this.columnData.length + 1,
					};
					this.columnShow = true;
				}
			},
			columnEmit(data) {

				if (data) {
					this.columnListData = {};
					console.log(data);
					let check = true;
					this.columnData.forEach(v => {
						if (v.name == data.name && !this.isEdit) {
							this.$message.error('添加列名重复，请修改！');
							check = false;
						}
					});
					if (!check) return false;
					data.allWareName = this.getStr(data.warehouse, 'name');
					data.allShopName = this.getStr(data.store, 'name');
					this.sortList(this.columnData, data, 'sortObj');
					this.resetColumn();
					// this.columnData = utils.deepCopy(this.sortList(this.columnData,data,'sort'));
				}
				console.log(data);
				if(!data||!data.continue)this.columnShow = false;
			},
			editColumn(item, index) {
				this.editIndex = index;
				this.columnShow = true;
				this.isEdit = true;
				Object.assign(this.columnListData, item);
			},
			editRow(item, index) {
				this.editIndex = index;
				this.isEdit = true;
				this.rowShow = true;
				this.pSortObj = item.pSortObj;
				this.pScope = item.pScope;
				this.pCollection = item.pCollection.id;
			},
			getStr(arr, key) {
				let strArr = [];
				arr.forEach(element => {
					strArr.push(element[key]);
				});
				return strArr.join(',');
			},
			sortList(list, obj, key) { //排序方法
				if (this.isEdit) {
					list.splice(this.editIndex, 1);
				}
				list.splice(obj[key].num - 1, 0, obj);
				for (let i = 0; i < list.length; i++) {
					list[i][key].num = i + 1;
					list[i][key].max = list.length;
				}
				return list;
			},
			resetColumn() { //刷新列表方法
				this.reset = false;
				console.log(this.columnData);
				this.$nextTick(() => {
					this.reset = true;
					console.log(this.columnData);
				});
			},
			getRowData(data) { //接受行数据
				if(!data||!data.continue)this.rowShow = false;
				console.log(data);
				if (data) {
					this.pCollection = '';
					this.pScope = [];
					// console.log(data);
					// if (data.pScope.length > 0) {
					// 	this.pShowMaterial = false;
					// 	data.strTitle = `物料范围（${data.pScope.length}）`;
					// } else {
					data.strTitle = `${data.pCollection.name}（${this.getExplain(data.pCollection)}种）`;
					let checkSome = false;
					if(!this.isEdit){
						for (let list of this.tableData) {
							if (list.pCollection.id == data.pCollection.id) {
								checkSome = true;
								break;
							}
						}
					}
					

					if (!checkSome) {
						this.sortList(this.tableData, data, 'pSortObj');
						this.isEdit = false;
					} else {
						this.$message({
							type: 'info',
							message: '该集合已存在，请重新选择！'
						});
						this.rowShow = true;
					}
				}
			},
			getExplain(data) { //生成说明
				let str = '';
				let text = '';
				if (data.type != 6) str = data.isCategory == 0 ? `物料数量：${data.mid.length}` : `物料分类数量：${data.cid.length}`;
				switch (data.type) {
					// case 3:
					// 	str = data.isCategory==0?`物料数量：${data.mid.length}`:`物料分类数量：${data.cid.length}`
					// 	break;
					case 4:
						text = `物料单位：${data.unit.name}；`;
						str = text + str;
						break;
					case 5:
						text = `供应商数量：${data.supplierName.split(',').length}；`;
						str = text + str;
						break;
					case 6:
						str = `物料名称：${this.getMateralName(data.mid).name}；供应商数量：${data.supplierName.split(',').length}`;
						break;
				}
				return str;
			},
			getMateralName(id) {
				let sele = '';
				for (let item of this.materialList) {
					if (id == item.id) {
						sele = item;
						break;
					}
				}
				return sele;
			},
			async getneedData() {
				let res = await http.All([{
					httpId: 'materialreportGetReportItemList'
				}, {
					httpId: 'warehouseList'
				}, {
					httpId: 'materialreportGetStatisticItemFormulaList'
				}]); //获取统计项数据
				this.reportData = [...res[0].data, ...res[2].data.list];
				this.wareList = res[1].data;
			}
		},
		async activated() {
			await this.recursiveGetMaterialList();
			await this.getRoleList();
			if (this.$route.query.id) {
				this.id = this.$route.query.id;
				await this.getneedData();
				this.init();
			}
			this.crageBtn();
		},
		deactivated() {
			this.$store.commit('setFixButton', []);
		},
		components: {
			addPosition: () =>
				import( /*webpackChunkName: 'addPosition'*/ './add_position'), //添加职位
			addColumn: () =>
				import( /*webpackChunkName: 'addColumn'*/ 'src/module/invoicing_system/data_center/add_column.vue'), //添加列  
			addRowWin: () =>
				import( /*webpackChunkName: 'addRowWin'*/ 'src/module/invoicing_system/data_center/add_report_row_win.vue'), //添加行  	    
		}
	};
</script>
<style lang='less' scoped>
	#tempList {
		.inpStyle {
			margin-bottom: 20px;

			.inpbox {
				display: inline-block;
				width: 200px;
				margin-left: 15px;
			}

			.btnbox {
				display: inline-block;
				vertical-align: top;
				width: 400px;
			}

			.addBtn {
				padding-left: 15px;
				height: 13px;
				display: flex;
				align-items: center;
			}
		}

		.tableBox {
			display: inline-block;
			margin-top: 20px;

			span {
				display: inline-block;
				width: 125px;
				height: 100%;
				vertical-align: middle;
				word-break: break-all;
			}

			.detailsBtn {
				vertical-align: middle;
			}

			.editbtn {
				display: inline-block;
				vertical-align: middle;
			}

		}

	}

	.popover {
		p {
			display: flex;
			align-items: center;
			margin-bottom: 5px;

			span {
				display: inline-block;
				word-break: break-all;

				&:nth-child(1) {
					text-align: right;
					width: 25%;
				}

				&:nth-child(2) {
					width: 75%;
					margin-left: 5px;
				}
			}

		}
	}
</style>