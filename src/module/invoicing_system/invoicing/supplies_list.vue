/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:43 */

<template>
	<div class="supplies">
		<div>
			<el-table :data="showList" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column :label="`批次列表 · 共${goodsList.length}个条目`" class-name='tabletop'>
					<el-table-column prop="date" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="showDetail(scope.row)" style="color:#34A9AA;" v-if="inventConfigs.commonStock==1">入库</el-button>
							<el-button type="text" @click="addListhouse(scope.row)" style="color:#D34A2B;">耗损</el-button>
						</template>
					</el-table-column>
					<el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
					<el-table-column prop="batchCode" label="批次编码"></el-table-column>
					<el-table-column label="生产日期">
						<template slot-scope="scope">
							<div>{{getTime(scope.row.productionTime)}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="supplier" label="供应商"></el-table-column>
					<el-table-column label="数量/重量">
						<template slot-scope="scope">
							<div>{{comUnit(scope.row.surplus,selUnit.value,selUnit.name,isMin.name)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="进价">
						<template slot-scope="scope">
							<div>{{scope.row.distributionPrice}}元/{{getpiceunit(Number(scope.row.distributionUnit))}}</div>
						</template>
					</el-table-column>
					<el-table-column label="仓库所属">
						<template slot-scope="scope">
							<div>{{scope.row.wName||"暂无"}}-{{scope.row.aName||"暂无"}}</div>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box">
			<!-- <page-btn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></page-btn> -->
			<el-pagination @current-change="pageChange" background :current-page="page" layout="total, prev, pager, next, jumper" :total="Number(goodsList.length)"></el-pagination>
		</div>
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				goodsList: '',
				page: 1,
				pageTotal: 0,
				num: 10,
				showList: [],
				relation: '',
				isMin: '',
				inventConfigs:{}//进销存配置
			};
		},
		props: ['goodsData', 'selUnit'],
		methods: {
			indexMethod(index){
				return this.num*(this.page-1)+index+1;
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			pageChange(page) {
				this.page = page;
				this.resetGoods(this.goodsList);
			},
			resetGoods(arr) {
				this.listTotal = arr.length;
				this.pageTotal = Math.ceil(arr.length / this.num);
				this.showList = arr.slice((this.page - 1) * 10, this.page * 10);
			},
			getpiceunit(id){
				let str = '';
				for(let item of this.goodsData.relation){
					if(id == item.muId){
						str = item.name;
					}
				}
				return str;
			},
			showDetail(item) {
				storage.session('putstoreInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialsPutinStorage',
					query: {
						type: 2
					}
				});
			},
			addListhouse(item) {
				console.log(item);
				storage.session('lossInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialLoss'
				});
			},
			openBar(item) {
				storage.session('editInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialModifyBatch'
				});
			},
			//单位换算
			comUnit(...args) {
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName, type] = args;
				return global.comUnit(number, value, showName, minName, type);
			},
			init(){
				this.goodsList = this.goodsData.list;
				this.relation = this.goodsData.relation;
				for (let item of this.relation) {
					if (item.isMin == 1) {
						this.isMin = item;
					}
				}
				this.resetGoods(this.goodsList);
			}
		},
		mounted() {
			if(this.goodsData){
				this.inventConfigs = storage.session('inventConfigs');
				this.init();
			}
		},
		watch: {
			goodsData() {
				this.inventConfigs = storage.session('inventConfigs');
				this.init();
			}
		},
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		}
	};
</script>
<style lang="less" scoped>
	.supplies {
		padding-bottom: 50px;
		.page-box {
			margin-top: 10px;
		}
		#emptyData {
			margin: 0 auto;
			text-align: center;
			height: 50px;
			line-height: 50px;
			color: orange;
		}
	}
</style>