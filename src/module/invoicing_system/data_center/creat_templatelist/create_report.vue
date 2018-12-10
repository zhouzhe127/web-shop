/*
* @Author: zhouzhe
* @Date: 2018-11-02 14:24:19
*/
<template>
	<div id="createReport">
		<div class="split-title">
			报表模板名称：{{moldeName}}
		</div>
		<div class="inpStyle">
			<span class="required label">报表名称</span>
			<div class="inpbox">
				<el-input clearable v-model="moldeName" maxlength="20" class="el-in" placeholder="输入表名称"></el-input>
			</div>
		</div>
		<div class="inpStyle">
			<el-date-picker v-model="applytimeAll" type="daterange" align="right" unlink-panels range-separator="至"
			 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
			</el-date-picker>
			<div class="sleType">
				<el-button @click="cerate" type="primary">生成</el-button>
				<el-button @click="searchReset" type="info">重置</el-button>
			</div>
		</div>
		<div class="tableBox">
			<el-table :data="tableYData" style="width: 100%" border>
				<el-table-column prop="strName" fixed="left" label="名称" width="200">
				</el-table-column>
				<el-table-column width="300" v-if="reset" v-for="(item, index) in tableXData" :key="index">
					<template slot="header" slot-scope="scope">
						<div class="detailsBtn">
							<!-- <p>物料单位</p> -->
							<el-popover trigger="hover" width="300" style="display:block;text-align: center;">
								<div class="popover">
									<p>
										<span>统计</span>:<span>{{item.reportName}}({{item.type==2?"公式项":"标准项"}})</span>
									</p>
									<p v-if="item.type==2">
										<span>公式</span>:<span>{{item.formulaStr}}</span>
									</p>
									<p v-if="item.type==2">
										<span>格式</span>:<span>{{item.formatStr}}</span>
									</p>
									<p>
										<span>关联店铺</span>:<span>{{item.shopNameArr}}</span>
									</p>
									<p>
										<span>关联仓库</span>:<span>{{item.wareNameArr}}</span>
									</p>
								</div>
								<el-button type="text" slot="reference">{{item.colName}}</el-button>
							</el-popover>
							<div class="timeBox">
								<el-date-picker style="position: relative;top: -8px;left: -54px;" v-model="item.itemData" @blur="resetColumn(item)"
								 type="daterange" align="right" unlink-panels range-separator="——" start-placeholder="开始日期" end-placeholder="结束日期"
								 :picker-options="pickerOptions">
								</el-date-picker>
								<i class="el-icon-caret-bottom"></i>
							</div>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import global from 'src/manager/global';
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	let shopMessage = storage.session('userShop');
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
				id: '480', //模板id
				moldeName: '',
				tableYData: [],
				tableXData: [], //列数据
				applytimeAll: [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end], //时间
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
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				reset: true
			};
		},
		methods: {
			async init() {
				let data = await http.templateGetReportTemplateDetail({
					data: {
						id: this.id
					}
				});
				this.tableXData = data.statisticItem;
				this.tableXData.map(v => {
					v.reportName = this.getlistName(this.reportData, v.id, 'id', 'name');
					v.itemData = this.applytimeAll;
					let shopNameArr = [];
					let wareNameArr = [];
					v.sendShop = [];
					v.relation.forEach(s => {
						shopNameArr.push(this.getlistName(shopList, s.shopId, 'id', 'name'));
						s.wid.forEach(w=>{//组合店铺数据
							let obj = {};
							obj.shopId = s.shopId;
							obj.wid = w;
							v.sendShop.push(obj);
						});
						s.wid.forEach(w => {
							wareNameArr.push(this.getlistName(this.wareList, w, 'id', 'name'));
						});
					});
					v.shopNameArr = shopNameArr.join(',');
					v.wareNameArr = wareNameArr.join(',');
					//公式转化
					if (v.type == 2) {
						v.formulaStr = v.staticInfo.formula.replace(/id_(\d+)/g, (match, p1) => {
							for (let base of this.reportData) {
								if (p1 == base.id) {
									return base.name;
								}
							}
						});
						//匹配 是否百分百
						let isPercent = this.formulaPercent.filter((obj) => {
							return obj.value == v.staticInfo.isPercent;
						})[0].label;
						//匹配 保留几位小数
						let carryRule = this.formulaRounding.filter((obj) => {
							return obj.value == v.staticInfo.carryRule;
						})[0].label;
						v.formatStr = `${isPercent}, ${v.staticInfo.reserveRule}位小数, ${carryRule}`;
					}
				});
				this.tableYData = data.statisticScope;
				this.tableYData.map(v => {
					// v=this.getGatherList(v.id);
					// v.strName =`${v.name}(${this.getExplain(v)})`;
					// if (v.type == 4) {
					// 	v.strName =
					// 		`${v.setInfo.name}(物料：${v.setInfo.mid.length}，单位：${v.setInfo.unit.name})`;
					// } else {
					v.strName = `${v.setInfo.name}(${this.getExplain(v.setInfo)})`;
					// }
				});
			},
			async getneedData() {
				let res = await http.All([{
					httpId: 'materialreportGetReportItemList'
				}, {
					httpId: 'warehouseList'
				}, {
					httpId: 'materialreportGetStatisticItemFormulaList'
				},]); //获取统计项数据
				this.reportData = [...res[0].data, ...res[2].data.list];
				this.wareList = res[1].data;
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
			crageBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: '',
					type: 5,
					icon: 'el-icon-back',
					fn: () => {
						window.history.go(-1);
					}
				}]);
			},
			checkTime(arr) {
				if (arr[1] - arr[0] > global.timeConst.ONEDAY * 365) {
					this.$message({
						message: '选择时间最大跨度365天',
						type: 'warning'
					});
					arr[0] = arr[1] - global.timeConst.ONEDAY * 365;
				}
			},
			async cerate() {//生成报表
				let rgx = /^[A-Za-z0-9_\u4e00-\u9fa5]+$/;
				if (!rgx.test(this.moldeName)) {
					this.$message.error('报表名称输入错误');
					return;
				}
				let x = this.setXData();
				let y = JSON.stringify(this.setYData());
				// let y = this.tableYData;
				let data = await http.materialreportAddReportTask({
					data: {
						templateId: this.id,
						reportName: this.moldeName,
						x: x,
						y: y,
						beginTime: parseInt(this.applytimeAll[0] / 1000),
						endTime: parseInt(utils.getTime({
							time: this.applytimeAll[1]
						}).end / 1000)
					}
				});
				if (data) {
					window.history.go(-1);
					this.$message({
						message: '生成报表成功!',
						type: 'success'
					});
				}else{
					this.$message({
						message: '报表生成有误',
						type: 'warning'
					});
				}
			},
			resetColumn(item) { //刷新列表方法
				this.reset = false;
				if(item) this.checkTime(item.itemData);
				this.$nextTick(() => {
					this.reset = true;
				});
			},
			setXData() {
				let arr = [];
				for (let item of this.tableXData) {
					let obj = {};
					Object.assign(obj, {
						type: item.type,
						id: item.id,
						colName: item.colName,
						beginDate: parseInt(item.itemData[0] / 1000),
						endDate: parseInt(utils.getTime({
							time: item.itemData[1]
						}).end / 1000),
						shopId: item.sendShop
					});
					// if (item.type == 2) {
					// 	Object.assign(obj, {
					// 		isPercent: item.staticInfo.isPercent,
					// 		reserveRule: item.staticInfo.reserveRule,
					// 		carryRule: item.staticInfo.carryRule,
					// 		baseParam: item.staticInfo.baseParam,
					// 		formula: item.staticInfo.formula,
					// 		formulaArray: item.staticInfo.formulaArray
					// 	});
					// }
					arr.push(obj);
				}
				return arr;
			},
			setYData() {
				let arr = [];
				for (let item of this.tableYData) {
					// let obj = {};
					// obj.type = item.type;
					// obj.id = item.id;
					// if (item.type == 4) {
					// 	Object.assign(obj, {
					// 		id: item.id,
					// 		mid: item.setInfo.mid,
					// 		unit: item.setInfo.unit.id,
					// 		name: item.setInfo.name
					// 	});
					// } else {
					// 	obj.mid = item.mid;
					// }
					arr.push(item.id);
				}
				return arr;
			},

			searchReset() {
				this.applytimeAll = [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end];
				this.moldeName = this.$route.query.name;
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
						text = `供应商数量：${data.supplier.split(',').length}；`;
						str = text+str;
						break;
					case 6:
						str = `物料名称：${this.getMateralName(data.mid).name}；供应商数量：${data.supplier.split(',').length}`;
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
		},
		async mounted() {
			this.crageBtn();
			this.id = this.$route.query.id;
			this.moldeName = this.$route.query.name;
			this.recursiveGetMaterialList();
			await this.getneedData();
			this.init();
		},
		watch: {
			applytimeAll(news) {
				this.checkTime(news);
				this.tableXData.map(v => {
					v.itemData = this.applytimeAll;
				});
				this.resetColumn();
			}
		}
	};
</script>
<style lang='less' scoped>
	#createReport {

		.split-title {
			text-indent: 10px;
			border-left: 4px solid #E1BB4A;
			margin-bottom: 30px;
			font-size: 16px;

			&:after {
				content: '';
				display: inline-block;
				border: 1px dashed #ddd;
				width: 500px;
				position: relative;
				left: 20px;
				top: -4px;
			}
		}

		.inpStyle {
			margin-bottom: 20px;

			.inpbox {
				display: inline-block;
				width: 200px;
				margin-left: 15px;
			}

			.sleType {
				width: 170px;
				margin-left: 20px;
				display: inline-block;
			}
		}

		.tableBox {
			display: inline-block;
			max-width: 100%;
			.detailsBtn {
				// p {
				//     text-align: center;
				// }

				.timeBox {
					width: 250px;
					height: 25px;
					overflow: hidden;
					cursor: pointer;
				}

				i {
					position: absolute;
					left: 260px;
					top: 45px;
				}

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