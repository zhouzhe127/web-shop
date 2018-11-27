<template>
	<div id="output-select-goods">
		<!-- <ul class="tebBox">
        <li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
    </ul> -->
		<div class="title">
			<i></i>
			<h3>选择添加商品</h3>
		</div>
		<div>
			<div class="table-select">
				<div class="select-title">
					货品信息
					<span class="circle"></span> 共
					<span class="select-num">{{sleList.length}}</span> 个条目
					<a class="packUp" @click="show=!show">
						{{show?'收起':'展开'}}
					</a>
				</div>
				<div class="select-body">
					<div class="select-head">
						<li>操作</li>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>售价</li>
						<li>商品类型</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div v-if="show" class="select-item" v-for="(item,index) in sleList" :key="index">
						<div class="select-row">
							<li style="color:#ff3c04;" @click="delList(item,index)">删除</li>
							<li v-if="index<9">{{`0${index+1}`}}</li>
							<li v-else>{{index+1}}</li>
							<li>{{item.goodsName}}</li>
							<li>{{item.barCode}}</li>
							<li>{{item.price}}</li>
							<li>{{typeList[Number(item.type)+1]}}</li>
							<li>{{item.surplus}}{{item.unit}}</li>
							<li>{{item.batch}}</li>
						</div>
					</div>
					<div v-if="sleList.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>

			<div class="search-module">
				<div class="inline-box">
					<input type="text" class="search-input" v-model="goodsName" placeholder="请输入商品名">
					<input type="text" class="search-input" v-model="barCode" placeholder="请输入条形码">
					<input type="text" class="search-input" v-model="secBarCode" placeholder="请输入副条形码">
				</div>
				<div class="inline-box search-select">
					<select-btn :sorts="typeList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
				</div>
				<div class="inline-box setspeen">
					<div class="blue filter" @click="search">筛选</div>
					<div class="gray reset" @click="reset">重置</div>
				</div>
			</div>

			<div class="table-select">
				<div class="select-title">
					商品列表
					<span class="circle"></span> 共
					<span class="select-num">{{listTotal}}</span> 个条目
				</div>
				<div class="select-body">
					<div class="select-head">
						<li>操作</li>
						<li>序号</li>
						<li>商品名</li>
						<li>条形码</li>
						<li>售价</li>
						<li>商品类型</li>
						<li>库存数量/重量</li>
						<li>批次数量</li>
					</div>
					<div class="select-item" v-for="(item,index) in goodsdetail" :key="index" :class="{'active':item.select}">
						<div class="select-row">
							<li v-if="item.select">已添加</li>
							<li v-if="!item.select && item.surplus>0" @click="addList(item,index)" class="add">添加</li>
							<li v-if="item.surplus<=0&&!item.select" @click="addEmpty" class="surplus-empty">添加</li>
							<li v-if="(index+1)+(page-1)*10<10">{{`0${index+1}`}}</li>
							<li v-else>{{(index+1)+(page-1)*10}}</li>
							<li>{{item.goodsName}}</li>
							<li>{{item.barCode}}</li>
							<li>{{item.price}}</li>
							<li>{{typeList[Number(item.type)+1]}}</li>
							<li>{{item.surplus}}{{item.unit}}</li>
							<li>{{item.batch}}</li>
						</div>
					</div>
					<div v-if="goodsdetail.length == 0" id="emptyData">-----暂无条目-----</div>
				</div>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :isNoPaging="false" :isNoJump="true" :total="pageTotal" :page="page"></pageBtn>
			</div>
		</div>
		<!-- <selectSupplies v-show="tabactive == 1" :addBtn="true" :wid="wid" :sleSupplies="getSupplies" :type="true" ref="supplies"></selectSupplies> -->
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
			goodsdetail: '',
			typeList: ['全部类型', '普通商品', '称重商品'],
			allGoods: '全部类型',
			pageTotal: 0,
			// tebData: ['商品', '物料'],
			// tabactive: 0,
			sleList: [], //选择的商品
			listTotal: 0,
			goodsName: '',
			barCode: '',
			secBarCode: '',
			// sleSupplies: '', //选择的物料
			num: 10,
			veri: ['goodsName', 'barCode', 'secBarCode'], //用于验证筛选条件
			sinSle: [],
			show: true
		};
	},
	/*
	 *dstShopId出货方店铺ID
	 *srcShopId入货方店铺ID
	 */
	props: ['sleCommodity', 'wid', 'addBtn', 'dstShopId', 'srcShopId', 'shopId'],
	methods: {
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
			let check = await this.checkGoods(item);
			if(check) {
				item.select = true;
				this.sleList.push(item);
			}
		},
		checkSle() {
			for(let item of this.goodsdetail) {
				item.select = false;
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
			this.$refs.select.sortName = '全部类型';
			this.$refs.select.selected = 0;
			this.selType = -1;
			this.init();
		},
		pageChange(res) {
			this.page = res.page;
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
		this.$store.commit('setPageTools', [
			{name: '确定',className: ['firstBtn wearhouse'],
				fn: () => {
					this.$store.commit('setPageTools', []);
					this.$emit('select', this.sleList);
				}
			},
			{name: '取消',className: ['abrogate'],
				fn: () => {
					this.$store.commit('setPageTools', []);
					this.$emit('select', false);
				}
			}
		]);
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
	@media only screen and (max-width:1250px) {
		.setspeen {
			margin-top: 10px;
			display: block;
		}
	}
	
	#output-select-goods {
		.title {
			width: 98%;
			height: 40px;
			margin: 10px;
			line-height: 40px;
			position: relative;
			overflow: hidden;
			i {
				width: 2px;
				height: 28px;
				position: absolute;
				top: 6px;
				left: 0;
				background-color: #f8941f;
			}
			h3 {
				height: 40px;
				margin-left: 10px;
				float: left;
				font-size: 16px;
				font-family: '微软雅黑';
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
			.inline-box {
				display: inline-block;
				padding-top: 15px;
			}
			padding-bottom: 15px;
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
			border: 1px solid #ccc;
			.select-title {
				height: 50px;
				line-height: 50px;
				padding-left: 20px;
				font-size: 16px;
				color: #333;
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
			.select-head {
				background-color: #f2f2f2;
				overflow: auto;
				display: flex;
				justify-content: space-between;
				li {
					.table-head;
					line-height: 40px;
					height: 40px;
					font-size: 16px;
					color: #43414a;
				}
			}
			.active {
				background-color: #cccccc;
				border-bottom: 1px #fff solid;
			}
			.select-item {
				.select-row {
					overflow: auto;
					border-bottom: 1px #ccc solid;
					display: flex;
					justify-content: space-between;
					li {
						.table-head;
						height: 70px;
						line-height: 70px;
						font-size: 14px;
						color: #666666;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						&:first-child {
							font-size: 16px;
							cursor: pointer;
						}
					}
					.add {
						color: #29abe2;
					}
					.surplus-empty {
						color: #999;
					}
				}
			}
		}
		.tebBox {
			display: inline-block;
			color: orange;
			margin-bottom: 20px;
			cursor: pointer;
			li {
				border: 1px orange solid;
				display: inline-block;
				padding: 10px 40px;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
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