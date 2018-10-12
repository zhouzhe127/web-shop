<!--
	**桌台管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="table-show">
		<section>
			<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="showTableList" border style="width:100%;margin-top:20px;">
				<el-table-column show-overflow-tooltip min-width="120" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="edit(scope.row)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="del(scope.row)">删除</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="sort" label="排序"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="tableName" label="桌台名称"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="areaName" label="区域名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="normalSeat" label="默认席位"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="minSeat" label="最少容纳(位)"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width="80" align="center" prop="maxSeat" label="最多容纳(位)"> </el-table-column>
				<el-table-column min-width="80" align="center" label="二维码">
					<template slot-scope="scope">
						<span class="table-code">
							<a :href="host+'table/createTableCode?format=json&tableId=' + scope.row.id +'&shopId=' + userData.currentShop.id+ '&areaName='+scope.row.areaName+'&tableName='+scope.row.tableName+'&token='+userData.accessToken"></a>
						</span>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<section style="margin-top: 10px">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>
		<tableWin v-if="showWin" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :tableId="tableId" :userData="userData" :tableDetial="tableDetial" :Area="Area">
		</tableWin>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';

export default {
	data() {
		return {
			host: global.host.shop,
			Area: [], //区域列表
			tableList: [], //桌台列表
			userData: Object,
			isAdd: true, //是否是添加，true为是
			showWin: false,
			tableId: '', //桌台id

			tableDetial: null, //桌台详细信息

			num: 10, //一页处理多少数据
			total: 0, //总页数
			page: 1, //当前第几页
			showTableList: [] //展示的桌台列表
		};
	},
	created() {
		let arr = [
			{
				name: '新建桌台',
				className: 'pick',
				fn: () => {
					this.add();
				}
			}
		];
		this.$store.commit('setPageTools', arr);
		this.userData = storage.session('userShop');
		this.init();
		this.getArea();
	},
	methods: {
		//删除
		del(item) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: `确定删除桌台${item.tableName}?`,
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteTable(item);
					}
				}
			});
		},
		//删除桌台
		async deleteTable(item) {
			let res = await http.deleteTable({
				data: {
					shopId: this.userData.currentShop.id,
					id: item.id
				}
			});
			if (res) {
				for (let j = 0; j < this.tableList.length; j++) {
					if (this.tableList[j].id == item.id) {
						this.tableList.splice(j, 1);
						break;
					}
				}
				this.paging();
			}
		},
		//分页
		paging() {
			this.total = Math.ceil(this.tableList.length / this.num); //获取总页数
			this.showTableList = this.tableList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //截取当前页数据
		},
		//每页显示几条数据
		numChange(e) {
			this.num = e;
			this.paging();
		},
		//切换到第几页
		pageClick(e) {
			this.page = e;
			this.paging();
		},
		//桌台列表
		async init() {
			let res = await http.getTableList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.tableList = res;
				this.sortList();
				this.paging();
			}
		},
		//得到区域列表
		async getArea() {
			let res = await http.getArea({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.Area = res;
			}
		},
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		//编辑
		async edit(item) {
			console.log(item);
			this.isAdd = false;
			this.tableId = item.id;
			this.tableDetial = utils.deepCopy(item);
			this.tableDetial.id = this.tableDetial.id + '';
			//			this.tableDetial = await http.getTableInfo({
			//				data: {
			//					shopId: this.userData.currentShop.id,
			//					id: this.tableId
			//				}
			//			});
			this.showWin = true;
		},
		doThrowWinResult(res, data) {
			console.log(data);
			if (res == 'ok') {
				if (this.isAdd) {
					//添加
					for (let i = 0; i < data.length; i++) {
						this.tableList.push(data[i]);
					}
				} else {
					//编辑
					for (let j = 0; j < this.tableList.length; j++) {
						if (this.tableList[j].id == this.tableId) {
							this.tableList.splice(j, 1, data);
							break;
						}
					}
				}
				this.sortList();
				this.paging();
				this.showWin = false;
			} else if (res == 'cancel') {
				if (!this.isAdd) {
					//删除
					for (let j = 0; j < this.tableList.length; j++) {
						if (this.tableList[j].id == data) {
							this.tableList.splice(j, 1);
							break;
						}
					}
					this.paging();
				}
				this.showWin = false;
			} else if (res == 'close') {
				this.showWin = false;
			}
		},
		//排序
		sortList() {
			this.tableList = utils.sortByAll(
				this.tableList,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		tableWin: () =>
			import(/*webpackChunkName: "table_manage_win"*/ './table_manage_win')
	}
};
</script>

<style scoped lang="less">
#table-show {
	.table-code {
		width: 30px;
		height: 30px;
		background-image: url(../../res/images/code.png);
		background-size: 30px 30px;
		display: inline-block;
		a {
			width: 100%;
			height: 100%;
		}
		&:hover {
			background-image: url(../../res/images/downcode.png);
		}
	}
}
</style>