<!--
		**废单统计(列表)
		*
		* 胡江
		* *
		*
-->
<template>
	<div id="step-container">
		<!--店铺列表-->
		<template v-if="showStep == 1 && !loadShow">
			<div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderTotal" border>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalDay" label="天数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="废单总数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalPrice" label="废单总额"></el-table-column>
				</el-table>
			</div>
			<!--<div class="total">-->
			<!--<div class="title">-->
			<!--<span>天数</span>-->
			<!--<span>废单总数</span>-->
			<!--<span>废单总额</span>-->
			<!--</div>-->
			<!--<div class="total-data">-->
			<!--<span>{{orderTotal.totalDay}}</span>-->
			<!--<span>{{orderTotal.orderNum}}</span>-->
			<!--<span>{{orderTotal.totalPrice}}</span>-->
			<!--</div>-->
			<!--</div>-->
			<div class="store-list">
				<div class="length">
					废单统计 · 共
					<span> {{orderStoreList.length}} </span>条记录
				</div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderStoreList" border>
					<el-table-column show-overflow-tooltip min-width="120" align="center" label="店铺名称">
						<template slot-scope="props">
							<span class="light" @click="toDay(props.row.shopId)">{{props.row.shopName}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="废单总数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="废单总额"></el-table-column>
				</el-table>

				<!--<div class="title">-->
				<!--<span>店铺名称</span>-->
				<!--<span>废单总数</span>-->
				<!--<span>废单总额</span>-->
				<!--</div>-->
				<!--<ul @click="toDay">-->
				<!--<li v-for="(item,index) in orderStoreList" :key="index">-->
				<!--<span class="light" :data-id="item.shopId">{{item.shopName}}</span>-->
				<!--<span>{{item.orderNum}}</span>-->
				<!--<span>{{item.price}}</span>-->
				<!--</li>-->
				<!--<li class="list-empty" v-if="!orderStoreList.length">暂时没有废单</li>-->
				<!--</ul>-->
			</div>
		</template>
		<!--正在加载的图片-->
		<div class="loading" v-if="loadShow"><img src="../../res/images/preloader.gif" /></div>
		<!--多天列表-->
		<template v-if="showStep == 2">
			<div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="dayTotal" border>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalDay" label="天数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="废单总数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalPrice" label="废单总额"></el-table-column>
				</el-table>
			</div>
			<!--<div class="total">-->
			<!--<div class="title">-->
			<!--<span>天数</span>-->
			<!--<span>废单总数</span>-->
			<!--<span>废单总额</span>-->
			<!--</div>-->
			<!--<div class="total-data">-->
			<!--<span>{{orderTotal.totalDay}}</span>-->
			<!--<span>{{dayTotal.orderNum}}</span>-->
			<!--<span>{{dayTotal.totalPrice}}</span>-->
			<!--</div>-->
			<!--</div>-->

			<div class="store-list">
				<template v-if="showStep == 2">
					<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="dayList" border>
						<el-table-column show-overflow-tooltip min-width="120" align="center" label="查看详情">
							<template slot-scope="props">
								<span class="light" @click="toSingle(props.row.date)">查看详情</span>
							</template>
						</el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="newDate" label="时间"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="废单数量"></el-table-column>
						<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="废单金额"></el-table-column>
					</el-table>
				</template>
			</div>

			<!--<div class="store-list">-->
			<!--<div class="title day">-->
			<!--<span>查看详情</span>-->
			<!--<span>时间</span>-->
			<!--<span>废单数量</span>-->
			<!--<span>废单金额</span>-->
			<!--</div>-->
			<!--<ul @click="toSingle">-->
			<!--<li class="day" v-for="(item,index) in dayList" :key="index">-->
			<!--<span class="light" :data-time="item.date">查看详情</span>-->
			<!--<span>{{formatTime(item.date)}}</span>-->
			<!--<span>{{item.orderNum}}</span>-->
			<!--<span>{{item.price}}</span>-->
			<!--</li>-->
			<!--<li class="list-empty" v-if="!dayList.length">暂时没有废单</li>-->
			<!--</ul>-->
			<!--</div>-->
		</template>
		<!--单店列表-->
		<template v-if="showStep == 3">
			<div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="total" border>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalDay" label="天数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="orderNum" label="废单总数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="totalPrice" label="废单总额"></el-table-column>
				</el-table>
			</div>
			<!--<div class="total">-->
			<!--<div class="title">-->
			<!--<span>天数</span>-->
			<!--<span>废单总数</span>-->
			<!--<span>废单总额</span>-->
			<!--</div>-->
			<!--<div class="total-data">-->
			<!--<span>{{total.totalDay}}</span>-->
			<!--<span>{{total.orderNum}}</span>-->
			<!--<span>{{total.totalPrice}}</span>-->
			<!--</div>-->
			<!--</div>-->

			<div class="store-list">
				<div class="length">
					废单统计 · 共
					<span> {{total[0].orderNum}} </span>条记录
				</div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="deleteList" border>
					<el-table-column show-overflow-tooltip min-width="200" align="center" label="订单号" fixed>
						<template slot-scope="props">
							<span class="light" @click="toDetail(props.row)">{{props.row.oid}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="areaName" label="区域"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="tableName" label="桌台"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="废单金额"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="createTime" label="开单时间"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="updateTime" label="废单时间"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="delReason" label="废单原因"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="staffName" label="操作人"></el-table-column>
				</el-table>
			</div>

			<!--<tableCom :listHeight="50" :listName="'废单统计'" :allTotal="total.orderNum" :introData="deleteList" :titleData="titleList" :listWidth="1200">-->
			<!--<div slot="con-0" slot-scope="props" @click="toDetail(props.data)" style="color:#29abe2;cursor:pointer;">-->
			<!--{{props.data.oid}}-->
			<!--</div>-->
			<!--</tableCom>-->
		</template>

		<div class="page-box" v-if="step!=1">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="pageShow" layout="sizes, prev, pager, next" :page-count="pageNum" :page-sizes="[10, 20, 30]">
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
			deleteList: [], //废单列表
			orderStoreList: '', //店铺列表
			shopId: '', //单店id
			dayData: '', //多天废单详情
			dayList: [], //多天废单详情列表
			sendData: {}, //其他数据 时间 分页 是否按营业时间统计 店铺id
			total: [{ orderNum: 0, totalPrice: 0, totalDay: 1 }], //废单总数

			orderTotal: [{ orderNum: 0, totalPrice: 0, totalDay: 1 }], //店铺订单总数
			dayTotal: [{ orderNum: 0, totalPrice: 0, totalDay: 1 }], //多天总数

			page: 1, //当前页
			pageNum: 1, //总页数
			pageShow: 10, //每页显示几条

			showStep: '', //操作步骤显示
			loadShow: false, //加载动画
			singleTime: '' //单天时间
		};
	},
	props: [
		'store', //店铺列表
		'order', //废单列表
		'otherData', //其他请求参数
		'step', //操作步骤
		'loading' //加载动画
	],
	mounted() {
		this.orderStoreList = this.store ? this.store : []; //品牌 刚进页面
		this.deleteList = this.order.list ? this.order.list : []; //单店 刚进页面
		this.sendData = this.otherData; //品牌
		this.showStep = this.step;
		//初始化设置一遍数据
		this.setStore();
		this.setOrder();
	},
	watch: {
		store: 'setStore',
		step: 'setStep',
		order: 'setOrder',
		loading: 'setLoad'
	},
	methods: {
		//进入多天列表
		toDay(shopId) {
			this.shopId = shopId; //获取单店id
			this.page = 1;
			this.getDayData();
			storage.session('deleteShopId', this.shopId);
		},
		//		toDay(event) {
		//			//进入多天列表
		//			let target = event.target;
		//			if (target.className.includes('light')) {
		//				this.shopId = target.getAttribute('data-id'); //获取单店id
		//				this.page = 1;
		//				this.getDayData();
		//				storage.session('deleteShopId', this.shopId);
		//			}
		//		},
		//点击列表订单号 进入单店页面
		//		toSingle(event) {
		//			let target = event.target;
		//			if (target.className.includes('light')) {
		//				this.singleTime = target.getAttribute('data-time');
		//				console.log(this.singleTime);
		//				storage.session('deleteSingleTime', this.singleTime);
		//				this.showStep = 3;
		//				this.page = 1;
		//				this.pageNum = 1;
		//				let stepObj = {
		//					step: this.showStep,
		//					id: this.shopId,
		//					pageShow: this.pageShow,
		//					time: this.singleTime * 1000
		//				};
		//				this.$emit('emit', stepObj);
		//			}
		//			console.log(this.deleteList)
		//		},
		toSingle(date) {
			console.log(date);
			console.log(this.deleteList);
			console.log(this.order);
			this.singleTime = date;
			storage.session('deleteSingleTime', this.singleTime);
			this.showStep = 3;
			this.page = 1;
			this.pageNum = 1;
			let stepObj = {
				step: this.showStep,
				id: this.shopId,
				pageShow: this.pageShow,
				time: this.singleTime * 1000
			};
			this.$emit('emit', stepObj);
		},
		//获取多天列表
		async getDayData() {
			let data = await http.moreDelOrder({
				data: {
					startTime: parseInt(this.sendData.startTime / 1000),
					endTime: parseInt(this.sendData.endTime / 1000),
					isOpenTime: this.sendData.openTime,
					page: this.page,
					num: this.pageShow,
					trueShopId: this.shopId //单店id
				}
			});
			data.pageShow = this.pageShow;
			this.setDayData(data, false);
			storage.session('dayData', data);
			this.showStep = 2;
			let stepObj = { step: this.showStep };
			this.$emit('emit', stepObj);
		},
		toDetail(data) {
			//点击单店 订单号 进入详情页面
			let stepObj = {
				step: 0,
				id: data.oid
			};
			this.$emit('emit', stepObj);
		},
		//每页显示多少行
		handleSizeChange(n) {
			console.log(n);
			this.pageShow = n;
			this.page = 1;
			this.initData();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.initData();
		},
		//		pageChange(obj) {
		//			//翻页
		//			let prevPage = this.page;
		//			this.page = obj.page;
		//			this.pageShow = obj.num;
		//			if (prevPage != obj.page) {
		//				this.initData();
		//			}
		//		},
		initData() {
			let shopId = storage.session('deleteShopId');
			let stepObj;
			if (shopId) this.shopId = shopId;
			switch (this.showStep) {
				case 2:
					this.getDayData();
					break;
				case 3:
					this.showStep = 3;
					stepObj = {
						step: this.showStep,
						id: this.shopId,
						page: this.page,
						pageShow: this.pageShow,
						time: this.singleTime * 1000
					};
					this.$emit('emit', stepObj);
					break;
				default:
					break;
			}
		},
		setDayData(data, cache) {
			//设置多天废单列表
			if (!data) return;
			if (cache) {
				//是否从缓存获取
				this.page = data.page;
				this.pageShow = data.pageShow;
			}
			this.pageNum = data.pageNum;
			this.dayList = data.list ? data.list : []; //多天废单列表
			this.dayTotal[0].orderNum = data.total.orderNum;
			this.dayTotal[0].totalPrice = data.total.price;
			this.dayTotal[0].totalDay = Math.ceil(
				(this.sendData.endTime - this.sendData.startTime) /
					(24 * 3600 * 1000)
			);

			for (let i = 0; i < this.dayList.length; i++) {
				this.dayList[i].newDate = this.formatTime(this.dayList[i].date);
			}
			console.log(this.dayList);
		},
		setStep() {
			this.showStep = this.step;
			if (this.showStep == 2) {
				this.setDayData(storage.session('dayData'), true);
			}
		},
		//第一次进来 设置订单店铺列表
		setStore() {
			if (!this.store) return;
			this.orderStoreList = this.store;
			this.sendData = this.otherData;
			let num = 0,
				price = 0;
			this.orderStoreList.forEach(item => {
				num += item.orderNum;
				price += item.price;
			});
			this.orderTotal[0].orderNum = num;
			this.orderTotal[0].totalPrice = price;
			this.orderTotal[0].totalDay = Math.ceil(
				(this.sendData.endTime - this.sendData.startTime) /
					(24 * 3600 * 1000)
			);
			console.log(this.orderStoreList);
		},
		//第三步 设置废单列表
		setOrder() {
			let singleTime = storage.session('deleteSingleTime');
			this.singleTime = singleTime ? singleTime : '';
			this.deleteList = this.order.list ? this.order.list : [];
			this.pageNum = this.order.pageNum ? this.order.pageNum : 1; //总页数
			this.page = this.order.page ? this.order.page : 1; //当前页
			//总量
			for (let i in this.total[0]) {
				if (this.order.total) {
					this.total[0][i] = this.order.total[i];
				} else {
					this.total[0][i] = 0;
					this.total[0].totalDay = 1;
				}
			}
			for (let i = 0; i < this.deleteList.length; i++) {
				this.deleteList[i].areaName =
					this.deleteList[i].areaName == ''
						? '--'
						: this.deleteList[i].areaName;
				this.deleteList[i].tableName =
					this.deleteList[i].tableName == ''
						? '--'
						: this.deleteList[i].tableName;
			}

			console.log(this.deleteList);
		},
		//加载动画显示
		setLoad() {
			this.loadShow = this.loading;
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
		}
	}
};
</script>

<style lang="less" scoped>
#step-container {
	margin-top: 15px;
	.store-list {
		width: 100%;
		border-bottom: none;
		margin: 10px 0;
		.length {
			height: 50px;
			line-height: 50px;
			padding: 0 5px;
			border: 1px solid #ebeef5;
			border-bottom: none;
			font-size: 16px;
			span {
				color: #f30;
				font-size: 16px;
			}
		}
		.light {
			color: #29a7e1;
			cursor: pointer;
			&:hover {
				color: #09f;
			}
		}
	}
	.loading {
		width: 100%;
		text-align: center;
		height: 500px;
		line-height: 500px;
	}
}
</style>