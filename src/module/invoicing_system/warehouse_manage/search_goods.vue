<template>
	<div>
		<el-radio-group v-if="inventConfigure==0" v-model="tabactive" fill="#e1bb4a" size="medium" @change="tebClick">
			<el-radio-button v-for="(item,index) in tebData" :key="index" :label="index">{{item}}</el-radio-button>
		</el-radio-group>
		<div class="warehouse-lists" v-if="tabactive==0">
			<div class="asideone">
				<div class="sleType">
					<el-input v-model="goodsName" placeholder="请输入商品名"></el-input>
				</div>
				<div class="sleType">
					<el-input v-model="goodsCode" placeholder="请输入条形码"></el-input>
				</div>
				<div class="sleType">
					<el-select v-model="selType" placeholder="全部类型">
						<el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="timebox multiple-select">
					<span>仓库所属：</span>
					<el-select multiple collapse-tags v-model="selWare" placeholder="请选择店铺" @change="setMulSelWidth">
						<el-option v-for="item in wareList" :key="item.shopId" :label="item.shopName" :value="item.shopId"></el-option>
					</el-select>
				</div>
				<div class="sleType">
					<el-button @click="searchGoods" type="primary">筛选</el-button>
					<el-button @click="resetGoods" type="info">重置</el-button>
				</div>
			</div>
			<div class="main">
				<div class="listTitle">
					商品列表 · 共<em>{{allCount}}</em>个条目
				</div>
				<el-table :data="allList" stripe border style="width: 100%" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column type="index" :index="indexMethod" label="序号" width="100">
					</el-table-column>
					<el-table-column prop="goodsName" label="商品名称" min-width="200">
					</el-table-column>
					<el-table-column prop="barCode" label="条形码" min-width="200">
					</el-table-column>
					<el-table-column label="商品类型" min-width="150">
						<template slot-scope="scope">
							{{adtatype[+scope.row.type+1]}}
						</template>
					</el-table-column>
					<el-table-column prop="shopName" label="仓库所属" min-width="150">
					</el-table-column>
					<el-table-column label="库存总量" min-width="200">
						<template slot-scope="scope" v-if="scope.row.goodsNum">
							{{Number(scope.row.goodsNum.surplus)}}{{scope.row.unit}}
						</template>
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="100">
						<template slot-scope="scope">
							<el-button type="text" @click="getDetail((1+scope.$index)+10*(page-1),scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page-box">
					<el-pagination 
						@current-change="pageChange" 
						background :current-page="page" 
						layout="total, prev, pager, next, jumper" 
						:total="Number(allCount)">
					</el-pagination>
				</div>
			</div>
		</div>
		<invent-supplies :wareList="wareList" :tabactive="tabactive" v-if="wareList&&tabactive==1"></invent-supplies>
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
				num: 10,
				pageTotal: 0,
				typeList: [{value:-1,label:'全部类型'},{value:0,label:'普通商品'} ,{value:1,label:'称重商品'}],
				adtatype:['全部类型','普通商品','称重商品'],
				wareList: [],
				wareVal: '',
				selWare: [],
				selType: -1,
				goodsName: '',
				goodsCode: '',
				allList: [],
				tebData: ['商品', '物料'],
				tabactive: 0,
				shopIds: '',
				allCount: 0,
				inventConfigure: 0,
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
				type:4,
				className: '',
				fn: () => {
					this.$router.push({
						path: '/admin/warehouseList',
						query: this.$route.query
					});
				}
			}]);
			this.inventConfigure = storage.session('inventConfigure');
			this.tabactive = this.inventConfigure == 0 ? 0 : this.inventConfigure - 1;
			this.init();
		},
		methods: {
			indexMethod(index){
				return this.num*(this.page-1)+index+1;
			},
			//设置多选框标签的宽度
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
			async init() {
				let data = await http.invoicing_getOwners();
				this.wareList = data;
				this.shopIds = this.getShops(data);
				this.selWare = this.shopIds;
				let inventConfigure = storage.session('inventConfigure');
				this.tabactive = inventConfigure == 2 ? 1 : 0;
				this.configIndex = inventConfigure;
				if (inventConfigure == 1 || inventConfigure == 0) {
					this.getlistAll();
				}
				this.$nextTick(()=>{
					this.setMulSelWidth();
				});
			},
			async getlistAll() {
				let data = await http.getMultiShopGoodsList({
					data: {
						shopIds: this.selWare.join(','),
						type: this.selType,
						goodsName: this.goodsName,
						barCode: this.goodsCode,
						page: this.page,
						num: 10
					}
				});
				this.allList = data.list;
				this.pageTotal = data.total;
				this.allCount = data.count;
				for (let item of this.allList) {
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
				for (let i in arr) {
					if (arr[i].shopId != 0) {
						str.push(arr[i].shopId);
					}
				}
				return str;
			},
			pageChange(page) {
				if (page) {
					this.page = page;
					this.getlistAll();
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
				this.setMulSelWidth();
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
		.topstyle {
			&::before {
				content: '';
				display: inline-block;
				width: 100%;
				height: 15px;
			}
		}

		.asideone {
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
		.main {
			margin-top: 20px;
			padding-bottom: 50px;
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
			.page-box {
				margin-top: 20px;
				padding-bottom: 20px;
				text-align: left;
			}
		}
	}
</style>