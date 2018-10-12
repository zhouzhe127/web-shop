<!--
		**挂账统计(品牌)
		*
		* 胡江
		* *
		*
-->
<template>
	<div class="brandBill">
		<div v-if="brand" class="brand">
			<div class="filter">
				<div class="block">
					<el-select v-model="operateTime" style="width:150px;">
						<el-option v-for="(item,i) in timeTypeList" :key="i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="block">
					<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="startTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
					<span class="input-word">--</span>
					<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="endTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
				</div>
				<div class="block time">
					<i @click="timeCheck" :class="{active:this.isOpenTime == 1}"></i>
					<span>按营业时间</span>
				</div>
				<div class="block">
					<elShopList @chooseShop="getDrop" :shopIds="shopList"></elShopList>
				</div>
				<div class="search-box block">
					<el-button v-on:click="search()" type="primary">搜索</el-button>
					<el-button v-on:click="reset()" type="info">重置</el-button>
				</div>
			</div>
			<div v-if="!loadShow" class="main">
				<div>
					<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderTotal" border>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalDay" label="天数"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="订单数"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="originalPrice" label="消费总额"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="billPrice" label="挂账总额"></el-table-column>
					</el-table>
				</div>
				<!--<div class="total">-->
				<!--<div class="title">-->
				<!--<span>天数</span>-->
				<!--<span>订单数</span>-->
				<!--<span>消费总额</span>-->
				<!--<span>挂账总额</span>-->
				<!--</div>-->
				<!--<div class="total-data">-->
				<!--<span>{{orderTotal.totalDay}}</span>-->
				<!--<span>{{orderTotal.orderNum}}</span>-->
				<!--<span>{{orderTotal.originalPrice}}</span>-->
				<!--<span>{{orderTotal.billPrice}}</span>-->
				<!--</div>-->
				<!--</div>-->
				<!--<div class="store-list">-->
				<!--<div class="length">-->
				<!--挂账统计统计 · 共-->
				<!--<span> {{orderStoreList.length}} </span>条记录-->
				<!--</div>-->
				<!--<div class="title">-->
				<!--<span>店铺名称</span>-->
				<!--<span>消费金额</span>-->
				<!--<span>挂账金额</span>-->
				<!--</div>-->
				<!--<ul>-->
				<!--<li v-for="(item,index) in orderStoreList" :key="index">-->
				<!--<span class="light" @click="toDay(item)">{{item.shopName}}</span>-->
				<!--<span>{{item.originalPrice}}</span>-->
				<!--<span>{{item.billPrice}}</span>-->
				<!--</li>-->
				<!--<li class="list-empty" v-if="!orderStoreList.length">暂时没有挂账</li>-->
				<!--</ul>-->
				<!--</div>-->

				<div class="store-list">
					<div class="length">
						挂账统计 · 共
						<span> {{orderStoreList.length}}</span>条记录
					</div>
					<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderStoreList" border>
						<el-table-column show-overflow-tooltip min-width="120" align="center" label="店铺名称">
							<template slot-scope="props">
								<span class="light" @click="toDay(props.row)">{{props.row.shopName}}</span>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="originalPrice" label="消费金额"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="billPrice" label="挂账金额"></el-table-column>
					</el-table>
				</div>
			</div>
			<div class="loading" v-else><img src="../../res/images/preloader.gif" /></div>
		</div>
		<orderBill v-else @return="getReturn" :sId="sId" :shopName="shopName" :sTime="startTime" :eTime="endTime" :isOpen="isOpenTime" :gType="operateTime"></orderBill>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data() {
		return {
			startTime: new Date().setHours(0, 0, 0, 0),
			endTime: new Date().setHours(0, 0, 0, 0),
			isOpenTime: 1, //按营业时间
			shopList: [], //店铺列表
			dropName: '请选择品牌门店',
			orderStoreList: [], //列表数据
			userShopList: [],

			timeTypeList: [
				{ name: '挂账时间', id: 0 },
				{ name: '结算时间', id: 1 }
			],
			operateTime: 0, //选中的操作时间

			loadShow: false,
			orderTotal: [
				{ totalDay: 1, orderNum: 0, originalPrice: 0, billPrice: 0 }
			], //总计数据
			brand: true,
			timer: null,
			shopName: '',
			sId: '', //传入单店

			shopNameB: [] //已选择的店铺名称
		};
	},
	created() {
		this.userData = storage.session('userShop');
		if (this.userData.currentShop.ischain != 3) {
			this.brand = false;
		}
		let shopIdArr = [],
			shopListArr = [];
		if (this.userData.currentShop.ischain == '3') {
			this.userShopList = storage.session('shopList');
			this.userShopList.forEach((item, index) => {
				shopIdArr[index] = item.id;
				let obj = {
					id: item.id,
					name: item.shopName
				};
				shopListArr.push(obj);
			});
			this.userShopIdStr = shopIdArr.join(','); //品牌下店铺id拼接
			this.userShopList = shopListArr;
		}
	},
	mounted() {
		// this.initBtn();
		this.shopIds = this.userShopIdStr;
		for (let i in this.userShopList) {
			//店铺默认全部选中
			this.userShopList[i].selected = true;
		}

		this.shopNameB = utils.deepCopy(this.userShopList);
		this.shopList = this.userShopList.map(v => {
			return v.id;
		});
		this.storeName =
			this.userShopList.length > 0
				? this.userShopList[0].name
				: '选择店铺'; //选中店铺按钮 显示

		if (this.brand) {
			this.search();
		}
	},
	methods: {
		//初始化右上角按钮
		// initBtn() {
		// 	let arr = [{
		// 		name: '导出',
		// 		className: ['pickCheck', 'headSet'],
		// 		fn: () => {
		// 			this.exportData();
		// 		}
		// 	}];
		// 	this.$store.commit('setPageTools', arr);
		// },
		timeCheck() {
			this.isOpenTime == 1
				? (this.isOpenTime = 0)
				: (this.isOpenTime = 1);
		},
		//选店返回
		getDrop(arr) {
			this.shopList = arr;
			this.shopIds = this.shopList.join(',');
			this.shopNameB = utils.deepCopy(this.userShopList);
			for (let i = 0; i < this.shopNameB.length; i++) {
				if (!this.shopList.includes(this.shopNameB[i].id)) {
					this.shopNameB.splice(i, 1);
					i--;
				}
			}
		},
		toDay(item) {
			this.sId = item.shopId;
			this.shopName = item.shopName;
			this.brand = false;
			storage.session('brandBillList', this.orderStoreList);
		},
		search() {
			this.billOrderReport();
		},
		reset() {
			this.isOpenTime = 1;
			this.operateTime = 0;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(0, 0, 0, 0);

			this.shopList = this.userShopList.map(v => {
				return v.id;
			});
			this.shopIds = this.shopList.join(',');
			this.shopNameB = utils.deepCopy(this.userShopList);

			this.search();
		},
		getReturn() {
			this.brand = true;
			this.orderStoreList = storage.session('brandBillList');
		},
		async billOrderReport() {
			if (!this.shopIds) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请选择店铺'
				});
				return false;
			}
			this.loadShow = true;
			http
				.billOrderReport({
					data: {
						startTime: this.startTime / 1000,
						endTime: this.endTime / 1000 + 24 * 60 * 60 - 1,
						isOpenTime: this.isOpenTime,
						operateTime: this.operateTime, //操作时间
						shopIds: this.shopIds,
						type: 21 //后台需要 写死
					}
				})
				.then(res => {
					if (this.timer) {
						clearInterval(this.timer);
					}
					this.taskInfo(res.taskId);
					this.timer = setInterval(() => {
						this.taskInfo(res.taskId);
					}, 2000);
				});
		},
		//轮询请求接口
		async taskInfo(taskId) {
			http.taskInfo({ data: { taskId: taskId } }).then(res => {
				if (res.status == 3) {
					clearInterval(this.timer);
					this.ReportGet(taskId);
				} else if (res.status == 2) {
					clearInterval(this.timer);
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请求失败，请重试'
					});
					this.loadShow = false;
				}
			});
		},
		//轮询结束获取数据
		async ReportGet(id) {
			let res = await http.ReportGet({
				data: {
					taskId: id
				}
			});
			this.loadShow = false;
			if (res.total && res.shops) {
				this.orderStoreList = res.shops;
				res.total.totalDay =
					(this.endTime - this.startTime) / 86400000 + 1;
				this.orderTotal[0] = res.total;
			} else {
				this.orderStoreList = [];
				this.orderTotal[0] = {
					billPrice: 0,
					orderNum: 0,
					originalPrice: 0,
					totalDay: (this.endTime - this.startTime) / 86400000 + 1
				};
			}
		}
	},
	destroyed() {
		clearInterval(this.timer);
	},
	components: {
		orderBill: () =>
			import(/*webpackChunkName: "order_bill_list"*/ './order_bill_list'),
		elShopList: () =>
			import(/*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	}
};
</script>
<style lang="less" scoped>
.brandBill {
	.filter {
		.block {
			display: inline-block;
			margin-right: 10px;
			margin-bottom: 10px;
		}
		.time {
			i {
				height: 20px;
				width: 20px;
				border-radius: 2px;
				margin-right: 5px;
				color: #444;
				cursor: pointer;
				display: inline-block;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
			}
			i.active {
				background: url(../../res/icon/white_select.png) #e1bb4a center
					no-repeat;
				border: 1px solid #e1bb4a;
			}
			span {
				font-size: 16px;
			}
		}
	}
	.loading {
		width: 100%;
		height: 350px;
		padding-top: 100px;
		text-align: center;
	}
	.main {
		.store-list {
			width: 100%;
			border-bottom: none;
			margin: 15px 0;
			.length {
				height: 50px;
				line-height: 50px;
				border: 1px solid #ebeef5;
				padding-left: 10px;
				border-bottom: none;
				font-size: 16px;
				span {
					display: inline-block;
					margin: 0 5px;
					color: #e1bb4a;
					font-size: 16px;
				}
			}
			.light {
				color: #e1bb4a;
				cursor: pointer;
			}
		}
	}
}
</style>



