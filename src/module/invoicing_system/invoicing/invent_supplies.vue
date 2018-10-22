<template>
	<div id="supplise">
		<!-- <div class="search-module">
			<div class="sleType">
				<el-input v-model="goodsName" placeholder="请输入物料名称"></el-input>
			</div>
			<div class="sleType">
				<el-select v-model="typeValue" placeholder="全部类型">
					<el-option v-for="item in typeCate" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<div class="sleBtn">
				<select-store @emit="getDrop" :sorts="oneCate" :isSingle="true" :tipName="'请选择一级分类'"></select-store>
			</div>
			<div class="sleBtn" @click="checkOne">
				<select-store @emit="getNext" :sorts="twoCate" :isSingle="true" :tipName="'请选择二级分类'" ref="twosel"></select-store>
			</div>
			<div @click="search" class="blue filter">筛选</div>
			<div @click="reset" class="gray reset">重置</div>
		</div> -->
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
			<!-- <div class="sleType" style="width:200px">
				<select-store @emit="getDrop" :sorts="oneCate" :isSingle="true" :tipName="'请选择一级分类'"></select-store>
			</div>
			<div class="sleType" style="width:200px">
				<select-store @emit="getNext" :sorts="twoCate" :isSingle="true" :tipName="'请选择二级分类'" ref="twosel"></select-store>
			</div> -->
			<div class="sleType">
				<el-button @click="search" type="primary">筛选</el-button>
				<el-button @click="reset" type="info">重置</el-button>
			</div>
		</div>
		<com-table v-if="tabactive == 1" :listName="'物料列表'" :titleData="titleList" :allTotal="count" :introData="allList"
		 :listWidth="1500">
			<div class="infoDetail" slot="con-0" slot-scope="props">
				<a href="javascript:void(0);" @click="addDetailhouse(props.data)" style="color:#5ebee8;">查看详情</a>|
				<a href="javascript:void(0);" v-if="inventConfigs.commonStock==1" @click="batchLose(props.data)" style="color:red;">入库</a><span
				 v-if="inventConfigs.commonStock==1">|</span>
				<a href="javascript:void(0);" @click="revamp(props.data)" style="color:orange;">盘库</a>
			</div>
			<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
			<span slot="con-4" slot-scope="props">{{typeCate[Number(props.data.type)+1].label}}</span>
			<span slot="con-5" slot-scope="props" v-if="props.data.goodsNum">{{getNum(props.data.goodsNum.surplus,props.data.unit)}}</span>
		</com-table>
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
				allList: '',
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
				typeCate: [{
					value: -1,
					label: '全部类型'
				}, {
					value: 0,
					label: '成品'
				}, {
					value: 1,
					label: '半成品'
				}, {
					value: 2,
					label: '普通物料'
				}],
				typeValue: -1,
				count: 0,
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '250px'
					}
				}, '序号',
				{
					titleName: '物料名称',
					dataName: 'name'
				},
				{
					titleName: '物料编码',
					dataName: 'barCode'
				},
				'物料类型', '数量/重量']
			};
		},
		props: ['tabactive', 'inventConfigs'],
		methods: {
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
				console.log(data);
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
				console.log(arr);
				// for (let item of this.cataList) {
				// 	if (item.pid == 0) this.oneCate.push(item);
				// }
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