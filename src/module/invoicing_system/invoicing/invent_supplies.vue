<template>
	<div id="supplise">
		<div class="asideone">
			<div class="sleType">
				<el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
			</div>
			<div class="sleType">
				<el-select v-model="typeValue" placeholder="全部类型">
					<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-cascader :options="cataList" expand-trigger="hover" :placeholder="'请选择分类'" v-model="sleCate" @change="getDrop" change-on-select></el-cascader>
			</div>
			<div class="sleType">
				<el-button @click="search" type="primary">筛选</el-button>
				<el-button @click="reset" type="info">重置</el-button>
			</div>
		</div>
		<el-table :data="allList" stripe border style="width: 100%">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100">
		   	 	</el-table-column>
				<el-table-column prop="name" label="物料名称" min-width="200">
				</el-table-column>
				<el-table-column prop="barCode" label="物料编码" min-width="200">
				</el-table-column>
				<el-table-column label="物料类型" min-width="150">
					<template slot-scope="scope">
						{{typeCate[Number(scope.row.type)+1].label}}
					</template>
				</el-table-column>
				<el-table-column label="数量/重量" min-width="200">
					<template slot-scope="scope" v-if="scope.row.goodsNum">
						{{getNum(scope.row.goodsNum.surplus,scope.row.unit)}}
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="200">
					<template slot-scope="scope">
						<el-button type="text" @click="addDetailhouse(scope.row)">查看详情</el-button>
						<el-button type="text"  @click="batchLose(scope.row)" v-if="inventConfigs.commonStock==1"
						style="color:#D34A2B;">入库</el-button>
						<el-button type="text" @click="revamp(scope.row)" style="color:#34A9AA;">盘库</el-button>
					</template>
				</el-table-column>
			</el-table>
		<div style="margin-top:10px">
			<!-- <page-turn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></page-turn> -->
			<el-pagination @current-change="pageChange" background :current-page="page" layout="total, prev, pager, next, jumper"
			 :total="Number(count)"></el-pagination>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				allList: [],
				cataList: [],
				page: 1,
				pageTotal: 0,
				num: 10,
				sleCate:[],//选中的分类
				// oneCate: [],
				// twoCate: [],
				// oneSle: '',
				// twoSle: '',
				goodsName: '', //搜索名称
				typeCate: [
					{value: -1,label: '全部类型'},
					{value: 0,label: '成品'},
					{value: 1,label: '半成品'},
					{value: 2,label: '普通物料'}
				],
				typeValue: -1,
				count: 0,
			};
		},
		props: ['tabactive', 'inventConfigs'],
		methods: {
			indexMethod(index){
				return this.num*(this.page-1)+index+1;
			},
			async init() {
				let data = await http.getMaterialList({
					data: {
						page: this.page,
						name: this.goodsName,
						cid: this.sleCate[this.sleCate.length-1],
						type: this.typeValue,
						num: 10
					}
				});
				this.allList = data.list;
				this.pageTotal = data.total;
				this.count = data.count;
				let arr = [];
				for (let item of this.allList) {
					arr.push(item.id);
				}
				if (arr.length > 0) {
					let resNum = await http.invoiv_getMaterialNum({
						data: {
							mids: arr.join(',')
						}
					});
					for (let i in this.allList) {
						for (let item of resNum) {
							if (this.allList[i].id == item.id) {
								this.allList[i].goodsNum = item;
							}
						}
					}
					this.allList = utils.deepCopy(this.allList);
				}
			},
			async getCate() {
				let data = await http.invoiv_getCategoryList();
				// this.cataList = data;
				let arr = [];
				for (let item of data) {
					item.value = item.id;
					item.label = item.name;
					if (item.pid == 0) {
						let childArr = [];
						data.forEach(v => {
							if (item.id == v.pid && item.id != 0) {
								childArr.push(v);
							}
						});
						if(childArr.length>0) item.children = childArr;
						arr.push(item);
					}
				}
				this.cataList = arr;
			},
			addDetailhouse(item) {
				this.$router.push({
					path: 'inventoryManagement/suppliesDetail',
					query: {
						id: item.id
					}
				});
			},
			batchLose(item) {
				this.$router.push({
					path: 'inventoryManagement/materialsPutinStorage',
					query: {
						id: item.id,
						type: 1
					}
				});
			},
			revamp(item) {
				let obj = this.$route.query;
				obj.id = item.id;
				this.$router.push({
					path: 'inventoryManagement/warehouseCount',
					query: obj
				});
			},
			search() {
				//点击筛选
				this.page = 1;
				this.init();
			},
			reset() {
				this.page = 1;
				this.goodsName = '';
				// this.oneSle = '';
				// this.twoSle = '';
				this.typeValue = -1;
				this.sleCate = [];
				// for (let item of this.oneCate) {
				// 	item.selected = false;
				// }
				// this.oneCate = utils.deepCopy(this.oneCate);
				// for (let item of this.twoCate) {
				// 	item.selected = false;
				// }
				// this.twoCate = utils.deepCopy(this.twoCate);
				this.init();
			},
			getDrop(sle) {
				console.log(sle);
				this.sleCate = sle;
				// for (let item of sle) {
				// 	if (item.selected) {
				// 		this.oneSle = item;
				// 		break;
				// 	} else {
				// 		this.oneSle = '';
				// 	}
				// }
				// this.twoCate = [];
				// for (let item of this.cataList) {
				// 	if (item.pid == this.oneSle.id) this.twoCate.push(item);
				// }
			},
			// getNext(sle) {
			// 	for (let item of sle) {
			// 		if (item.selected) {
			// 			this.twoSle = item;
			// 			break;
			// 		} else {
			// 			this.twoSle = '';
			// 		}
			// 	}
			// },
			getNum(num, nuit) {
				let value = null;
				let showName = null;
				let minName = null;
				for (let item of nuit) {
					if (item.isMin == 1) {
						minName = item.name;
					}
					if (item.isDefault == 1) {
						showName = item.name;
						value = item.value;
					}
				}
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				return global.comUnit(num, value, showName, minName);
			},
			checkOne() {
				if (this.oneSle == '') {
					this.$refs.twosel.sortShow = false;
					this.alert('请选择一级分类');
				}
			},
			pageChange(page) {
				this.page = page;
				this.init();
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					content: con
				});
			}
		},
		activated() {
			this.init();
			this.getCate();
		},
		mounted() {
			this.init();
			this.getCate();
		},
		components: {
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
		}
	};
</script>
<style lang="less" scoped>
	.search-module {
		margin-top: 20px;

		.sleType {
			width: 170px;
			display: inline-block;
			margin-right: 15px;
		}

		.sleBtn {
			display: inline-block;
			margin-right: 20px;
		}

		.search-select {
			display: inline-block;
			margin-right: 15px;
		}

		.search-btn {
			width: 1rem;
			height: 40px;
			line-height: 40px;
			color: #fff;
			font-size: 16px;
			margin-right: 10px;
			display: inline-block;
			text-align: center;
		}

		.filter,
		.reset {
			.search-btn;
		}
	}

	.asideone {
		margin-bottom: 20px;
		.sleType {
			width: 170px;
			margin-right: 10px;
			display: inline-block;

			&::before {
				content: '';
				display: inline-block;
				width: 100%;
				height: 15px;
			}
		}
	}

	.infoDetail {
		display: inline-block;
		display: flex;
		justify-content: space-around;

		a {
			display: inline-block;
			text-align: center;
		}
	}
</style>