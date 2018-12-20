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
			<div class="timebox multiple-select">
				<span>仓库所属：</span>
				<el-select multiple collapse-tags v-model="selWare" placeholder="请选择店铺" @change="setMulSelWidth">
					<el-option v-for="item in wareList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-button @click="search" type="primary">筛选</el-button>
				<el-button @click="reset" type="info">重置</el-button>
			</div>
		</div>
		<section class="listBox">
			<div class="listTitle">
				物料列表 · 共<em>{{allCount}}</em>个条目
			</div>
			<el-table :data="allList" stripe border style="width: 100%" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="物料名称" min-width="200">
				</el-table-column>
				<el-table-column label="分类" min-width="150">
					<template slot-scope="scope">
						{{setCate(scope.row.cate)}}
					</template>
				</el-table-column>
				<el-table-column label="库存数量/重量" min-width="150">
					<template slot-scope="scope" v-if="scope.row.goodsNum">
						{{scope.row.goodsNum.surplus}}{{setMinUnit(scope.row.unit)}}
					</template>
				</el-table-column>
				<el-table-column label="类型" width="150">
					<template slot-scope="scope">
						{{typeCate[Number(scope.row.type)+1].label}}
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="100">
					<template slot-scope="scope">
						<el-button type="text" @click="addDetailhouse(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</section>
		<div class="page-box">
			<el-pagination 
				@current-change="pageChange" 
				background :current-page="page" 
				layout="total, prev, pager, next, jumper"
				:total="Number(allCount)">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			allList: [],
			page: 1,
			pageTotal: 0,
			num: 10,
			goodsName: '', //搜索名称
			wareGoods: '全部',
			selWare: [], //选择的仓库
			allCount: 0,
			typeCate: [{
				value:-1,
				label:'全部类型'
			},{
				value:0,
				label:'成品'
			},{
				value:1,
				label:'半成品'
			},{
				value:2,
				label:'普通物料'
			}],
			typeValue:-1,
		};
	},
	props: ['wareList', 'tabactive'],
	methods: {
		indexMethod(index){
			return this.num*(this.page-1)+index+1;
		},
		setMulSelWidth(){
			let span = document.querySelector('.multiple-select .el-select__tags-text');
			if(span){
				span.style.cssText = 
					`max-width: 90px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: inline-block;
					vertical-align: top;`;
			}
		},
		setCate(cate){
			return cate.map((res)=>{
				return res.name;
			}).join(',');
		},
		setMinUnit(unit){
			return unit.filter((res)=>{
				return res.isMin==1;
			})[0].name;
		},
		async init() {
			let data = await http.invoic_getMaterialListByShopIds({
				data: {
					shopIds: this.selWare.join(','),
					search: this.goodsName,
					page: this.page,
					type:this.typeValue,
				}
			});
			this.allList = data.list;
			this.pageTotal = data.total;
			this.allCount = data.count;
			for(let item of this.allList) {
				let resNum = await http.invoiv_getMaterialNum({
					data: {
						mids: item.id,
						shopId: item.shopId
					}
				});
				item.goodsNum = resNum[0];
			}
			this.allList = utils.deepCopy(this.allList);
		},
		addDetailhouse(item) {
			storage.session('materialDetailShopId', item.shopId);
			this.$router.push({
				path: 'warehouseMaterialDetail',
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
		search() {
			//点击筛选
			this.init();
		},
		reset() {
			this.goodsName = '';
			this.selWare = this.wareList.map(v=>v.shopId);
			this.typeValue = -1;
			this.init();
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
		},
	},
	mounted() {
		this.selWare = this.wareList.map(v=>v.shopId);
		this.$nextTick(()=>{
			this.setMulSelWidth();
		});
		this.init();
	},
	components: {
		pageTurn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectStore: () =>
			import( /*webpackChunkName: 'page'*/ 'src/components/select_store'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
	}
};
</script>
<style lang='less' scoped>
	@media only screen and (max-width:1145px) {
		.button-box {
			margin-top: 10px;
			display: block;
		}
	}
	.topstyle {
			&::before {
				content: '';
				display: inline-block;
				width: 100%;
				height: 15px;
			}
		}

		.asideone {
			margin-bottom: 20px;
			.sleType {
				width: 170px;
				margin-right: 10px;
				display: inline-block;
				.topstyle
			}

			.timebox {
				display: inline-block;
				margin-right: 10px;
				.topstyle
			}
		}
	
	.listBox {
		width: 100%;
		height: auto;
		.listTitle {
			padding: 0 10px;
			border: 1px solid #ebeef5;
			border-bottom: 0;
			height: 45px;
			line-height: 45px;
			em {
				color: red;
				padding: 0 2px;
				display: inline-block;
			}
		}
	}
	.page-box {
		margin-top: 20px;
		padding-bottom: 20px;
		text-align: left;
	}
</style>