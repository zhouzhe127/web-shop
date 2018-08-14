<template>
	<div>
		<ul class="tebBox" v-if="inventConfigure==0">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul>
		<div class="warehouse-lists" v-show="tabactive==0">
			<div class="filter">
				<div class="inline-box">
					<input type="text" placeholder="请输入商品名" v-model="goodsName" />
				</div>
				<div class="inline-box">
					<input type="text" placeholder="请输入条形码" v-model="goodsCode" />
				</div>
				<div style="display:inline-block;vertical-align: top;margin:0 10px">
					<select-btn :sorts="typeList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
				</div>
				<div class="inline-box setspeen">
					仓库所属：
					<select-btn :sorts="wareVal" :name="wareGoods" @selOn="selectWare" ref="selects"></select-btn>
					<div class="inline-box button-box">
						<span class="blue" @click="searchGoods">筛选</span>
						<span class="gray" @click="resetGoods">重置</span>
					</div>
				</div>
			</div>
			<div class="main">
				<div class="list">
					<div class="head">
						商品列表 · 共<em> {{allcount}} </em>条数据
					</div>
					<div class="title">
						<span class="wide">操作</span>
						<span>序号</span>
						<span class="wide">商品名</span>
						<span>条码</span>
						<span>商品类型</span>
						<span>仓库所属</span>
						<span>库存总量</span>
					</div>
					<ul>
						<li v-for="(item,index) in allList" :key="index">
							<span class="wide handle" @click="getDetail((1+index)+10*(page-1),item)">
								<em class="detail">查看详情</em>
							</span>
							<span>{{(1+index)+10*(page-1)}}</span>
							<span class="wide">{{item.goodsName}}</span>
							<span v-if="item.barCode">{{item.barCode}}</span>
							<span v-else>--</span>
							<span>{{typeList[+item.type+1]}}</span>
							<span>{{item.shopName}}</span>
							<span v-if="item.goodsNum">{{Number(item.goodsNum.surplus)||0}}{{item.unit}}</span>
						</li>
					</ul>
				</div>
				<div class="page-box">
					<pageBtn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></pageBtn>
				</div>
			</div>
		</div>
		<invent-supplies :wareList="wareList" :tabactive="tabactive" v-if="wareList" v-show="tabactive==1"></invent-supplies>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

export default {
	data() {
		return {
			page: 1,
			showNum: 10,
			pageTotal: 0,
			typeList: ['全部类型', '普通商品', '称重商品'],
			allGoods: '全部类型',
			wareList: '',
			wareVal: '',
			wareGoods: '全部',
			selWare: 0,
			selType: -1,
			goodsName: '',
			goodsCode: '',
			allList: '',
			tebData: ['商品', '物料'],
			tabactive: 0,
			shopIds: '',
			allcount: 0,
			inventConfigure:0,
		};
	},
	components: {
		pageBtn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectBtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		inventSupplies: () =>
			import( /*webpackChunkName: 'allSupplies'*/ './allSupplies')
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['back'],
			fn: () => {
				this.$router.push({
					path: '/admin/warehouseList',
					query: this.$route.query
				});
			}
		}]);
		this.inventConfigure = storage.session('inventConfigure');
		this.tabactive = this.inventConfigure==0?0:this.inventConfigure-1;
		this.init();
	},
	methods: {
		async init() {
			let data = await http.invoicing_getOwners();
			this.wareList = [{shopId:-1,shopName:"全部",all:this.getShops(data)},...data];
			let val = data.map(v => v.shopName);
			this.wareVal = ['全部', ...val];
			this.shopIds = this.getShops(data);
			this.selWare = this.shopIds;
			let inventConfigure = storage.session('inventConfigure');
			this.tabactive = inventConfigure==2 ? 1 : 0;
			this.configIndex = inventConfigure;
			if(inventConfigure==1||inventConfigure==0){
				this.getlistAll();
			}
		},
		async getlistAll() {
			let data = await http.getMultiShopGoodsList({
				data: {
					shopIds: this.selWare,
					type: this.selType,
					goodsName: this.goodsName,
					barCode: this.goodsCode,
					page: this.page,
					num: 10
				}
			});
			this.allList = data.list;
			this.pageTotal = data.total;
			this.allcount = data.count;
			// let arr = [];
			for(let item of this.allList) {
				let resNum = await http.invent_getGoodsNum({
					data: {
						gids: item.id,
						shopId: item.shopId
					}
				});
				item.goodsNum = resNum[0];
			}
			this.allList = utils.deepCopy(this.allList);
		},
		getShops(arr) {
			let str = [];
			for(let i in arr) {
				if(arr[i].shopId != 0) {
					str.push(arr[i].shopId);
				}
			}
			return str.join(',');
		},
		pageChange(page) {
			if(page.page) {
				this.page = page.page;
				this.getlistAll();
			}
		},
		selectList(sel) {
			this.selType = sel - 1;
		},
		selectWare(sel) {
			console.log(sel);
			if(sel > 0) {
				this.selWare = this.wareList[sel].shopId;
			} else {
				this.shopIds = this.wareList[0].all;
			}
		},
		searchGoods() {
			this.page = 1;
			this.getlistAll();
		},
		resetGoods() {
			this.page = 1;
			this.goodsName = '';
			this.goodsCode = '';
			this.selWare = this.shopIds;
			this.selType = -1;
			this.wareGoods = '全部';
			this.allGoods = '全部类型';
			this.$refs.select.sortName = '全部类型';
			this.$refs.selects.sortName = '全部';
			this.$refs.select.selected = 0;
			this.$refs.selects.selected = 0;
			this.getlistAll();
		},
		getDetail(index, item) {
			item.numerical = index;
			storage.session('goodsneed', item);
			this.$router.push({
				path: 'warehouseGoodsDetail',
				query: this.$route.query
			});
		},
		tebClick(index) {
			this.tabactive = index;
		}
	}
};
</script>

<style lang='less' scoped>
	@media only screen and (max-width:1325px) {
		.setspeen {
			margin-top: 10px;
		}
	}
	
	.warehouse-lists {
		.filter {
			width: 100%;
			.inline-box {
				display: inline-block;
				vertical-align: middle;
				margin-right: 10px;
				input {
					width: 180px;
					height: 40px;
					padding: 0 10px;
					font-size: 14px;
					&:focus {
						outline: none;
					}
				}
			}
			.button-box {
				span {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					width: 80px;
					color: #fff;
					text-align: center;
				}
				.blue {
					margin-right: 10px;
				}
			}
		}
		.main {
			margin-top: 20px;
			padding-bottom: 50px;
			.list {
				border: 1px solid #ccc;
				border-bottom: 2px solid #ddd;
				.head {
					height: 50px;
					line-height: 50px;
					padding: 0 10px;
					font-size: 16px;
					em {
						color: #ff3c04;
						font-size: inherit;
					}
				}
				.title {
					background: #e6e6e6;
					overflow: hidden;
					span {
						float: left;
						height: 40px;
						line-height: 40px;
						text-align: center;
						width: 14%;
					}
					.wide {
						width: 13.33%;
					}
				}
				ul li {
					overflow: hidden;
					border-bottom: 2px solid #ddd;
					&:last-child {
						border-bottom: 0;
					}
					span {
						float: left;
						height: 70px;
						line-height: 70px;
						text-align: center;
						width: 14%;
						color: #555;
					}
					.wide {
						width: 13.33%;
					}
					.handle {
						em {
							display: inline-block;
							padding: 0 20px;
							height: 18px;
							line-height: normal;
							cursor: pointer;
							&:hover {
								text-decoration: underline;
							}
						}
						.edit {
							color: #ff8d00;
							border-right: 1px solid #ddd;
						}
						.detail {
							color: #27a8e0;
						}
					}
				}
			}
			.page-box {
				margin-top: 20px;
				padding-bottom: 20px;
				text-align: left;
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
</style>