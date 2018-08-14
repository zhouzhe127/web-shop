<!--
		**门店区域设置（品牌）
		*
		* 胡江
		* *
		*
-->
<template>
	<div id="shopGroup">
		<section>
			<el-input v-model="shopName" clearable placeholder="请输入门店/区域/代码名称" style="width:250px;" @change="searchShop">
				<el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
			</el-input>
		</section>
		<section style="margin-top:10px">
			<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="showList" border style="width: 100%">
				<el-table-column fixed min-width="100" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="toEdit(scope.row,scope.$index)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delJob(scope.row,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="50" prop="sort" label="排序">
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="100" align="center" prop="name" label="区域名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="100" align="center" label="区域代码">
					<template slot-scope="scope">
						<span>
							{{scope.row.areaCode?scope.row.areaCode:'--'}}
						</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="50" prop="num" align="center" label="门店数量">
				</el-table-column>
				<el-table-column min-width="100" align="center" prop="nameS" label="包含门店">
					<template slot-scope="scope">
						<span style="cursor:pointer">
							<el-popover placement="top" width="400" trigger="click" :content="scope.row.nameS">
								<span slot="reference" style="overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">
									{{scope.row.nameS}}
								</span>
							</el-popover>
						</span>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<shopGroupSelect v-if="isShow" @goodListWin="toColde" :info="info" :shopIds="shopIds" :chuShop="chuShop">
		</shopGroupSelect>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isShow: false,
			shopName: '',
			info: {},

			allShop: [], //所有门店
			chuShop: [], //过滤后的门店
			list: [], //所有区域列表，用于搜索
			showList: [], //展示的区域列表

			selectId: [], //所有选择过的id
			shopIds: '' //编辑区域的店铺id
		};
	},
	created() {
		this.getAllShop();
	},
	mounted() {
		let addGroup = [
			{
				name: '添加区域分组',
				className: ['addStaff', 'export-btn'],
				fn: this.add,
				type: 2
			}
		];
		this.$store.commit('setPageTools', addGroup);
	},
	methods: {
		//搜索
		searchShop() {
			this.showList = this.list.filter(v => {
				return (
					v.name.includes(this.shopName) ||
					v.areaCode.includes(this.shopName) ||
					v.nameS.includes(this.shopName)
				);
			});
		},
		//添加
		add() {
			this.shopIds = '';
			//区域门店,删除已经选择过的门店
			let res = utils.deepCopy(this.allShop);
			for (let j = 0; j < res.length; j++) {
				if (this.selectId.includes(res[j].id)) {
					res.splice(j, 1);
					j--;
				}
			}
			this.chuShop = res;
			console.log(res);
			this.info = {};
			this.isShow = true;
		},
		//编辑
		toEdit(v, i) {
			console.log(v);
			this.shopIds = v.areaShopIds.toString();
			let res = utils.deepCopy(this.allShop);
			for (let j = 0; j < res.length; j++) {
				if (
					this.selectId.includes(res[j].id) &&
					!v.areaShopIds.includes(res[j].id)
				) {
					res.splice(j, 1);
					j--;
				}
			}
			this.chuShop = res;
			console.log(res);
			this.info = {
				regionName: v.name,
				regionCode: v.areaCode,
				num: v.sort,
				id: v.id
			};
			this.isShow = true;
		},
		//删除
		async delJob(v, i) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除“ ' + v.name,
				callback: delRes => {
					if (delRes == 'ok') {
						this.del(v, i);
					}
				}
			});
		},
		async del(v) {
			let res = await http.StoreareaDelete({
				data: {
					id: v.id
				}
			});
			if (res) {
				this.getList();
			}
		},
		//弹窗返回
		toColde(res) {
			if (res == 'ok') {
				this.getList();
			}
			this.isShow = false;
		},
		//获取品牌下所有通过审核的门店
		async getAllShop() {
			this.allShop = await http.getShopByBrandId();
			this.getList();
		},
		//获取列表
		async getList() {
			this.selectId = [];
			let res = await http.StoreareaGetList();
			for (let j = 0; j < res.length; j++) {
				let nameAll = [];
				res[j].num = res[j].areaShopIds.length;
				for (let i = 0; i < res[j].areaShopIds.length; i++) {
					for (let k = 0; k < this.allShop.length; k++) {
						if (res[j].areaShopIds[i] == this.allShop[k].id) {
							nameAll.push(this.allShop[k].shopName);
							break;
						}
					}
				}
				res[j].nameS = nameAll.join('、 ');
				this.selectId = this.selectId.concat(res[j].areaShopIds);
			}
			this.list = res;
			this.showList = res;

			this.searchShop();
		}
	},
	components: {
		shopGroupSelect: () =>
			import(/*webpackChunkName: 'shop_group_select'*/ './shop_group_select')
	}
};
</script>

<style lang="less" scoped>
</style>