<template>
	<div id="output-select-goods">
		<div class="title">
			<i></i>
			<h3>选择添加商品</h3>
		</div>
		<div>
			<div class="table-select">
				<div class="select-title select-ban">
					货品信息
					<span class="circle"></span> 共
					<span class="select-num">{{sleList.length}}</span> 个条目
					<a class="packUp" @click="cutTable">
						{{show?'收起':'展开'}}
					</a>
				</div>
				<el-table :data="sleList" stripe border style="width:100%" :max-height="tableHeight" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column width="100" fixed="left" label="操作">
						<template slot-scope="scope">
							<el-button type="text" @click="delList(scope.row,scope.$index)" class="danger-color">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="gName" label="商品名称" min-width="200">
					</el-table-column>
					<el-table-column prop="barCode" label="条形码" min-width="200">
					</el-table-column>
					<el-table-column label="售价" min-width="200">
						<template slot-scope="scope">
							{{scope.row.price}}元
						</template>
					</el-table-column>
					<el-table-column label="商品类型" width="150">
						<template slot-scope="scope">
							{{typeList[Number(scope.row.type)+1].label}}
						</template>
					</el-table-column>
					<el-table-column label="库存数量/重量" min-width="200">
						<template slot-scope="scope">
							{{scope.row.surplus}}{{scope.row.unit}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope">
							{{scope.row.batch}}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="search-module">
				<div class="sleType">
					<el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
				</div>
				<div class="sleType">
					<el-input v-model="barCode" placeholder="请输入条形码"></el-input>
				</div>
				<div class="sleType">
					<el-input v-model="secBarCode" placeholder="请输入副条形码"></el-input>
				</div>
				<div class="sleType">
					<el-select v-model="selType" placeholder="全部类型">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="sleType">
					<el-button type="primary" @click="search">筛选</el-button>
					<el-button type="info" @click="reset">重置</el-button>
				</div>
			</div>

			<div class="table-select">
				<div class="select-title">
					商品列表
					<span class="circle"></span> 共
					<span class="select-num">{{listTotal}}</span> 个条目
				</div>
				<el-table :data="goodsdetail" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column width="100" fixed="left" label="操作">
						<template slot-scope="scope">
							<el-button type="text" v-if="scope.row.select" style="color:#999">已添加</el-button>
							<el-button type="text" @click="addList(scope.row,scope.$index)" 
							v-if="!scope.row.select" 
							:disabled="scope.row.surplus<=0">添加</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="gName" label="商品名称" min-width="200">
					</el-table-column>
					<el-table-column prop="barCode" label="条形码" min-width="200">
					</el-table-column>
					<el-table-column label="售价" min-width="200">
						<template slot-scope="scope">
							{{scope.row.price}}元
						</template>
					</el-table-column>
					<el-table-column label="商品类型" width="150">
						<template slot-scope="scope">
							{{typeList[Number(scope.row.type)+1].label}}
						</template>
					</el-table-column>
					<el-table-column label="库存数量/重量" min-width="200">
						<template slot-scope="scope">
							{{scope.row.surplus}}{{scope.row.unit}}
						</template>
					</el-table-column>
					<el-table-column label="批次数量" width="150">
						<template slot-scope="scope">
							{{scope.row.batch}}
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="pageChange"
					:current-page="page"
					background
					layout="prev, pager, next"
					:page-count="pageTotal">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			page: 1,
			selType: -1,
			goodsdetail: [],
			typeList: [
				{value:-1,label:'全部类型'},
				{value:0,label:'普通商品'},
				{value:1,label:'称重商品'},
			],
			allGoods: '全部类型',
			pageTotal: 0,
			sleList: [], //选择的商品
			listTotal: 0,
			goodsName: '',
			barCode: '',
			secBarCode: '',
			num: 10,
			veri: ['goodsName', 'barCode', 'secBarCode'], //用于验证筛选条件
			sinSle: [],
			show: true,
			tableHeight:700,
		};
	},
	/*
	 *dstShopId出货方店铺ID
	 *srcShopId入货方店铺ID
	 */
	props: ['sleCommodity', 'wid', 'addBtn', 'dstShopId', 'srcShopId', 'shopId'],
	methods: {
		cutTable(){
			this.show = !this.show;
			this.tableHeight = this.show?700:120;
		},
		async init() {
			let data = await http.whGetInventoryGoodsList({
				data: {
					wid: this.wid ? this.wid : '',
					type: this.selType,
					page: this.page,
					num: this.num,
					shopId: this.shopId,
				}
			});
			this.listTotal = data.count;
			this.goodsdetail = data.list;
			this.pageTotal = data.total;
			this.checkSle();
		},
		addEmpty() {
			this.alert('该商品库存数量不足');
		},
		checkIn() {
			let sleArr = [];
			for(let i in this.sleCommodity) {
				if(this.sleCommodity[i].noPrev) {
					this.sinSle.push(this.sleCommodity[i]);
				} else {
					sleArr.push(this.sleCommodity[i]);
				}
			}
			this.sleList = sleArr;
		},
		alert(con, title) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
		async filterGoodsNum() { //筛选商品列表
			let data = await http.whGetGoodsExactly({
				data: {
					wid: this.wid,
					goodsName: this.goodsName,
					barCode: this.barCode,
					secBarCode: this.secBarCode,
					type: this.selType,
					shopId: this.dstShopId,
				}
			});
			this.goodsdetail = data;
			this.pageTotal = 1;
			this.listTotal = data.length ? data.length : 0;
			this.checkSle();
		},
		selectList(sel) {
			this.selType = sel - 1;
			let num = 0;
			for(let item of this.veri) {
				let thisItem = this[item].trim();
				if(thisItem == '') num++;
			}
			this.page = 1;
			if(num >= 3) {
				this.init();
			} else {
				this.filterGoodsNum();
			}
		},
		async addList(item) {//点击添加
			if(item.surplus<=0){
				this.alert('该商品库存数量不足');
				return;
			}
			let check = await this.checkGoods(item);
			if(check) {
				item.select = true;
				this.sleList.push(item);
			}
		},
		checkSle() {
			for(let item of this.goodsdetail) {
				this.$set(item,'select',false);
			}
			for(let item of this.goodsdetail) {
				for(let sleItem of this.sleList) {
					if(item.gid == sleItem.gid) {
						item.select = true;
					}
				}
				for(let sleItem of this.sinSle) {
					if(item.gid == sleItem.id) {
						item.select = true;
					}
				}
			}
		},
		delList(item, index) {//点击删除
			this.sleList.splice(index, 1);
			item.select = false;
			this.checkSle();
		},
		search() {
			let num = 0;
			for(let item of this.veri) {
				let thisItem = this[item].trim();
				if(thisItem == '') num++;
			}
			if(num >= 3) { //三个文本框都为空 只筛选类型
				this.init();
			} else { //精确搜索
				this.filterGoodsNum();
			}
		},
		reset() {//重置
			this.page = 1;
			this.goodsName = '';
			this.barCode = '';
			this.secBarCode = '';
			this.selType = -1;
			this.init();
		},
		pageChange(res) {
			this.page = res;
			this.init();
		},
		async checkGoods(res) { //匹配物料
			let obj = {
				goods: [{
					goodsId: res.gid,
					itemName: res.goodsName,
					unit: res.unit,
					type: res.type,
					barCode:res.barCode
				}]
			};
			let data = await http.invoic_getMatchItemList({
				data: {
					itemList: obj,
					srcShopId: this.srcShopId,
					dstShopId: this.dstShopId
				}
			});
			if(data.goods && data.goods.length > 0) {
				return true;
			} else {
				this.alert('出入货商品不匹配');
			}
		}
	},
	async mounted() {
		if(this.sleCommodity) this.sleList = utils.deepCopy(this.sleCommodity);
		let arr = [
			{name: '确定',className: 'primary',type:4,
				fn: () => {
					this.$store.commit('setPageTools',[]);
					this.$emit('select', this.sleList);
				}
			},
			{name: '取消',className: 'info',type:4,
				fn: () => {
					this.$store.commit('setPageTools',[]);
					this.$emit('select', false);
				}
			},
		];
		this.$store.commit('setPageTools',arr);
		this.init();
		await this.checkIn();
	},
	components: {
		pageBtn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
	},
};
</script>
<style lang='less' scoped>
	.danger-color{color: #d34a2b;}
	#output-select-goods {
		.title {
			width: 98%;
			height: 20px;
			margin-bottom: 15px;
			position: relative;
			overflow: hidden;
			border-left: 3px solid #E1BB4A;
			h3 {
				height: 40px;
				margin-left: 10px;
				float: left;
				font-size: 16px;
				font-family: "微软雅黑";
			}
		}
		.table-head {
			list-style: none;
			text-align: center;
			flex: 1;
		}
		.setspeen {
			display: inline-block;
		}
		.page-box {
			margin-top: 10px;
			padding-bottom: 30px
		}
		.search-module {
			.sleType{
				width: 200px;
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 20px;
			}
			padding-top: 20px;
			.search-input {
				height: 40px;
				font-size: 14px;
				line-height: 40px;
				text-indent: 15px;
				padding: 0;
				outline: none;
				margin-right: 15px;
			}
			.search-select {
				display: inline-block;
				margin-right: 15px;
			}
			.search-btn {
				width: 100px;
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
		.table-select {
			.select-title {
				height: 50px;
				line-height: 50px;
				padding-left: 20px;
				font-size: 16px;
				color: #333;
				border: 1px solid #ebeef5;
				border-bottom: 0;
				.packUp {
					cursor: pointer;
					color: #5ebee8;
					text-decoration: underline;
				}
				.circle {
					display: inline-block;
					width: 4px;
					height: 4px;
					border: 1px solid #333;
					border-radius: 50%;
					margin: 0 15px;
					background-color: #333;
					vertical-align: middle;
					margin-top: -4px;
				}
				.select-num {
					color: #ff3c04;
					font-size: 16px;
				}
			}
		}
	}
</style>