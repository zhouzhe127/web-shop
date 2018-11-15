<!--赠品统计 内容列表-->
<!--黄一帆-->
<template>
	<div class="step-container">
		<!--店铺列表-->
		<template v-if="showStep == 1 && !loadShow">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>赠品总数</span>
					<span>赠品总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{orderTotal.totalNum}}</span>
					<span>{{orderTotal.totalPrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="length">
					赠品统计 · 共
					<span> {{orderStoreList.length}} </span>条记录
				</div>
				<div class="title">
					<span>店铺名称</span>
					<span>赠品总数</span>
					<span>赠品总额</span>
				</div>
				<ul @click="toDay">
					<li v-for="(item,index) in orderStoreList" :key="index">
						<span class="light" :data-id="item.shopId">{{item.shopName}}</span>
						<span>{{item.totalNum}}</span>
						<span>{{item.totalPrice}}</span>
					</li>
					<li class="list-empty" v-if="!orderStoreList.length">- 暂无条目 -</li>
				</ul>
			</div>
		</template>
		<div class="loading" v-if="loadShow"><img src="../../res/images/preloader.gif" /></div>
		<!--多天列表-->
		<template v-if="showStep == 2">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>赠品总数</span>
					<span>赠品总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{dayTotal.freeNum}}</span>
					<span>{{dayTotal.freePrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="title day">
					<span>查看详情</span>
					<span>时间</span>
					<span>赠品数量</span>
					<span>赠品金额</span>
				</div>
				<ul @click="toSingle">
					<li class="day" v-for="(item,index) in dayList" :key="index">
						<span class="light" :data-time="item.date">查看详情</span>
						<span>{{formatTime(item.date)}}</span>
						<span>{{item.freeNum}}</span>
						<span>{{item.freePrice}}</span>
					</li>
					<li class="list-empty" v-if="!dayList.length">- 暂无条目 -</li>
				</ul>
			</div>
		</template>
		<!--单店-商品列表-->
		<template v-if="showStep == 3">
			<div class="total goods">
				<div class="title">
					<span>天数</span>
					<span>订单数</span>
					<span>赠品总数</span>
					<span>赠品总额</span>
				</div>
				<div class="total-data">
					<span>{{total.totalDay}}</span>
					<span>{{total.orderNum}}</span>
					<span>{{total.freeNum}}</span>
					<span>{{total.freePrice}}</span>
				</div>
			</div>
			<div class="list goods">
				<div class="length">
					赠品统计 · 共
					<span> {{total.recordNum}} </span>条记录
				</div>
				<div class="title">
					<span>操作</span>
					<span>商品名称</span>
					<span>商品编码</span>
					<span>赠品数量</span>
					<span>赠品金额</span>
				</div>
				<ul @click="showOrderDetail">
					<li v-for="(item,index) in returnList" :key="index">
						<span class="show-order light" :data-index="index">查看详情</span>
						<span>{{item.goodsName}}</span>
						<span>{{item.goodsCode}}</span>
						<span>{{item.freeNum}}</span>
						<span>{{item.freePrice}}</span>
					</li>
					<li class="list-empty" v-if="!returnList.length">- 暂无条目 -</li>
				</ul>
			</div>
		</template>
		<!--单店-订单列表-->
		<template v-if="showStep == 4">
			<div class="total goods">
				<div class="title">
					<span>天数</span>
					<span>订单数</span>
					<span>赠品总数</span>
					<span>赠品总额</span>
				</div>
				<div class="total-data">
					<span>{{total.totalDay}}</span>
					<span>{{total.orderNum}}</span>
					<span>{{total.freeNum}}</span>
					<span>{{total.freePrice}}</span>
				</div>
			</div>
			<tableCom :listHeight="50" :listName="returnListGoodsName" :allTotal="total.orderNum" :fixed="2" :introData="returnOrderList" :titleData="titleList1" :listWidth="1200">
				<div slot="con-0" slot-scope="props" @click="toDetail(props.data,props.index,1)" style="color:#f8941f;cursor:pointer;">
					查看详情
				</div>
				<div slot="con-1" slot-scope="props" @click="toDetail(props.data,props.index,2)" style="color:#29abe2;cursor:pointer;">
					{{props.data.oid}}
				</div>
			</tableCom>
		</template>
		<template v-if="showStep == 5">
			<div class="detail">
				<div class="detail-head">
					<span>订单详情</span>
					<ul>
						<li>
							<em>订单号：</em>{{detailTotal.oid}}</li>
						<li>
							<em>订单时间：</em>{{detailTotal.createTime}}</li>
						<li>
							<em>桌台号：</em>{{detailTotal.areaName}} -- {{detailTotal.tableName}}</li>
					</ul>
					<ul>
						<li>
							<em>赠品数量：</em>{{detailTotal.freeNum}}</li>
						<li>
							<em>赠品总额：</em>{{detailTotal.freePrice}}</li>
					</ul>
				</div>
				<tableCom :listHeight="50" :showHand="false" :fixed="0" :mainBox="mainBox" :introData="returnDetailList" :titleData="titleList2" :listWidth="1200">
				</tableCom>
			</div>
		</template>
		<div class="page-box" v-if="step!=1 && step!=5">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-count="pageNum" :page-size="pageShow" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
			<!-- <pageBtn @pageNum="pageChange" :total="pageNum" :page="page" :isNoJump="true"></pageBtn> -->
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';

export default {
	props: [
		'store', //店铺列表
		'order', //赠品列表
		'otherData', //其他请求参数
		'step', //操作步骤
		'loading' //加载动画
	],
	data() {
		return {
			returnData: '', //多商品赠品数据
			returnList: [], //多商品赠品列表
			returnOrderList: [], //赠品列表
			returnDetailList: [], //赠品详情列表
			orderStoreList: '', //店铺列表
			shopId: '', //单店id
			dayData: '', //多天赠品详情
			dayList: [], //多天赠品详情列表
			sendData: {}, //其他数据 时间 分页 是否按营业时间统计 店铺id
			total: {
				freeNum: 0,
				freePrice: 0,
				orderNum: 0,
				totalDay: 1,
				recordNum: 0
			}, //多商品赠品总数/单商品订单总数
			orderTotal: { totalNum: 0, totalPrice: 0, totalDay: 1 }, //店铺订单总数
			dayTotal: { freeNum: 0, freePrice: 0 }, //多天总数
			detailTotal: {
				oid: '',
				freeNum: 0,
				createTime: '',
				freePrice: 0,
				areaName: '',
				tableName: ''
			},
			page: 1,
			pageNum: 1,
			pageShow: 10, //每页显示几条
			showStep: '', //操作步骤显示
			showPageList: [10, 20],
			showDetail: false, //查看详情
			loadShow: false, //加载动画
			listIndex: 0, //点击的第几个多商品列表
			returnListGoodsName: '', //单商品订单列表 商品名称
			singleTime: '',
			titleList1: [
				{ titleName: '操作', titleStyle: { width: 150 + 'px' } },
				{ titleName: '订单号', titleStyle: { width: 190 + 'px' } },
				{ titleName: '订单时间', dataName: 'createTime' },
				{ titleName: '区域', dataName: 'areaName' },
				{ titleName: '桌台', dataName: 'tableName' },
				{ titleName: '赠品数量', dataName: 'freeNum' },
				{ titleName: '赠品金额(元)', dataName: 'freePrice' }
			],
			titleList2: [
				{ titleName: '商品类型', dataName: 'typeName' },
				{ titleName: '商品名称', dataName: 'itemName' },
				{ titleName: '赠品数量', dataName: 'totalNum' },
				{ titleName: '赠品金额', dataName: 'totalPrice' },
				{ titleName: '赠品时间', dataName: 'time' },
				{ titleName: '操作人', dataName: 'staffName' }
			],
			mainBox: { 'margin-top': 0 }
		};
	},
	watch: {
		store: 'setStore',
		step: 'setStep',
		order: 'setOrder',
		loading: 'setLoad',
		otherData: {
			deep: true,
			handler() {
				this.setSingleStore();
			}
		}
	},
	mounted() {
		this.orderStoreList = this.store ? this.store : []; //品牌 刚进页面
		this.returnList = this.order.list ? this.order.list : []; //单店 刚进页面
		this.sendData = this.otherData; //品牌
		this.showStep = this.step;
		//初始化设置一遍数据

		this.setStore();
		this.setOrder();

		this.getOrderListCache(); //获取缓存订单列表 从订单详情返回时调用;
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		tableCom: () =>
			import(/*webpackChunkName:"com_table"*/ 'src/components/com_table')
	},
	methods: {
		toDay(event) {
			//进入多天列表
			let target = event.target;
			if (target.className.indexOf('light') >= 0) {
				if (this.orderTotal.totalDay <= 1) {
					this.shopId = target.getAttribute('data-id');
					this.singleTime = this.sendData.brand.startTime / 1000;
					storage.session('deleteSingleTime', this.singleTime);
					this.getMoreShop();
				} else {
					this.shopId = target.getAttribute('data-id'); //获取单店id
					(this.page = 1), (this.pageNum = 1);
					this.getDayData();
					storage.session('deleteShopId', this.shopId);
				}
			}
		},
		toSingle(event) {
			//点击查看详情 进入单店-多商品列表
			let target = event.target;
			if (target.className.indexOf('light') >= 0) {
				this.singleTime = target.getAttribute('data-time');
				storage.session('deleteSingleTime', this.singleTime);
				this.getMoreShop();
			}
		},
		getMoreShop() {
			//带不page 需要请求区域 桌台
			this.showStep = 3;
			(this.page = 1), (this.pageNum = 1);
			let stepObj = {
				step: this.showStep,
				id: this.shopId,
				pageShow: this.pageShow,
				time: this.singleTime * 1000,
				isOneDay: this.orderTotal.totalDay <= 1 ? true : false
			};
			this.$emit('emit', stepObj);
		},
		async getDayData() {
			let data = await http.moreFree({
				data: {
					startTime: parseInt(this.sendData.brand.startTime / 1000),
					endTime: parseInt(this.sendData.brand.endTime / 1000),
					isOpenTime: this.sendData.brand.openTime,
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
		async toDetail(item, index, type) {
			//点击单店 订单号 进入订单详情页面
			if (type == 2) {
				let stepObj = { step: 0, id: item.oid };
				this.$emit('emit', stepObj);
			}
			if (type == 1) {
				//点击查看详情 进入赠品详情
				let data = await http.getFreeDetail({
					data: {
						oid: this.returnOrderList[index].oid,
						trueShopId: this.sendData.store.shopId //单店id
					}
				});
				for (let item of data) {
					item.totalPrice = this.toFloatStr(item.totalPrice);
				}
				this.returnDetailList = data;
				let num = 0,
					price = 0;
				for (let i in this.returnOrderList[index]) {
					if (i != 'freeNum' || i != 'freePrice') {
						this.detailTotal[i] = this.returnOrderList[index][i];
					}
				}
				for (let item of data) {
					num += parseInt(item.totalNum);
					price += parseInt(item.totalPrice);
				}
				this.detailTotal.freeNum = num;
				this.detailTotal.freePrice = price;
				this.showStep = 5;
				let stepObj = { step: this.showStep };
				this.$emit('emit', stepObj);
			}
		},
		showOrderDetail(event) {
			let target = event.target;
			if (target.className.indexOf('show-order') >= 0) {
				this.listIndex = target.getAttribute('data-index');
				this.page = 1;
				this.showOrder();
			}
		},
		async showOrder() {
			//单商品退品列表 从品牌进入 或者单店多商品-进入单商品列表
			// let endTime = new Date(this.sendData.store.endTime).setHours(
			// 	23,
			// 	59,
			// 	59,
			// 	0
			// );
			let data = await http.getFreeList({
				data: {
					startTime: parseInt(this.sendData.store.startTime / 1000),
					endTime: parseInt(this.sendData.store.endTime / 1000),
					isOpenTime: this.sendData.store.openTime,
					page: this.page,
					num: this.pageShow,
					trueShopId: this.sendData.store.shopId, //单店id
					areaId: this.sendData.store.areaId,
					tableId: this.sendData.store.tableId,
					goodsName: this.returnList[this.listIndex].goodsName,
					gid: this.returnList[this.listIndex].gid,
					packageId: this.returnList[this.listIndex].packageId
				}
			});
			this.showStep = 4;
			this.returnOrderList = data.list ? data.list : [];
			this.pageNum = data.pageNum ? data.pageNum : 1;
			for (let i in data.total) {
				if (data.total) this.total[i] = data.total[i];
				else this.total[i] = 0;
			}
			this.returnListGoodsName = this.returnList[
				this.listIndex
			].goodsName;
			//保存单商品退品列表 从订单详情返回时调用
			data.listIndex = this.listIndex;
			storage.session('orderListCache', data);
			storage.session('returnListGoodsName', this.returnListGoodsName);
			//设置发送到父模块的数据
			let stepObj = {
				step: this.showStep,
				goodsName: this.returnList[this.listIndex].goodsName,
				gid: this.returnList[this.listIndex].gid,
				packageId: this.returnList[this.listIndex].packageId
			};
			this.$emit('emit', stepObj);
		},
		getOrderListCache() {
			//获取订单列表缓存
			let data = storage.session('orderListCache');
			if (data) {
				this.page = data.page;
				this.pageNum = data.pageNum;
				this.listIndex = data.listIndex;
				this.returnListGoodsName = storage.session(
					'returnListGoodsName'
				);
				this.returnOrderList = data.list ? data.list : [];
				for (let i in data.total) {
					if (data.total) {
						this.total[i] = data.total[i];
					} else {
						this.total[i] = 0;
						this.total.totalDay = 1;
					}
				}
			}
		},
		//分页点击
		pageClick: function(e) {
			this.page = e;
			this.initData();
		},
		//每页显示多少条点击
		numChange(e) {
			this.pageShow = e;
			this.page = 1;
			this.initData();
		},
		// pageChange(obj) {
		// 	//翻页
		// 	let prevPage = this.page;
		// 	this.page = obj.page;
		// 	this.pageShow = obj.num;
		// 	if (prevPage != obj.page) {
		// 		this.initData();
		// 	}
		// },
		// showPageChange(index) {
		// 	//每行显示多少页
		// 	this.page = 1;
		// 	this.pageShow = this.showPageList[index];
		// },
		initData() {
			let shopId = storage.session('deleteShopId');
			let stepObj;
			if (shopId) this.shopId = shopId;
			switch (this.showStep) {
				case 2:
					this.getDayData(); //step2
					break;
				case 3: //获取多商品退品列表
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
				case 4:
					this.showOrder();
					break;
				default:
					break;
			}
		},
		setSingleStore() {
			if (this.sendData.store.isRequest) {
				this.showOrder();
			}
		},
		setDayData(data, cache) {
			if (!data) return;
			if (cache) {
				//是否从缓存获取
				this.page = data.page;
				this.pageShow = data.pageShow;
			}
			this.pageNum = data.pageNum;
			this.dayList = data.list ? data.list : []; //多天赠品列表
			this.dayTotal.freeNum = data.total.freeNum;
			this.dayTotal.freePrice = data.total.freePrice;
		},
		setStep() {
			//改变步骤
			this.showStep = this.step;
			if (this.showStep == 2) {
				this.setDayData(storage.session('dayData'), true);
			}
		},
		setStore() {
			//第一次进来 设置订单店铺列表
			if (!this.store) return;
			this.orderStoreList = this.store;
			this.sendData = this.otherData;
			let num = 0,
				price = 0;
			for (let i = 0; i < this.orderStoreList.length; i++) {
				this.orderStoreList[i].totalPrice = this.toFloatStr(this.orderStoreList[i].totalPrice);
				num += this.orderStoreList[i].totalNum;
				price += this.orderStoreList[i].totalPrice*1;
			}
			this.orderTotal.totalNum = num;
			this.orderTotal.totalPrice = this.toFloatStr(price);
			this.orderTotal.totalDay = Math.ceil(
				(this.sendData.brand.endTime - this.sendData.brand.startTime) /
					(24 * 3600 * 1000)
			);
		},
		setOrder() {
			//第三步 设置多商品赠品列表
			this.returnList = this.order.list ? this.order.list : [];
			this.pageNum = this.order.pageNum ? this.order.pageNum : 1; //总页数
			this.page = this.order.page ? this.order.page : 1; //当前页
			//总量
			for (let i in this.total) {
				if (this.order.total) {
					this.total[i] = this.order.total[i];
				} else {
					this.total[i] = 0;
					this.total.totalDay = 1;
				}
			}
		},
		toFloatStr(num) {
			//保留两位小数
			let str = num + '';
			return utils.toFloatStr(str, 2);
		},
		setLoad() {
			//加载动画显示
			this.loadShow = this.loading;
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy年MM月dd日');
		}
	}
};
</script>

<style lang="less" scoped>
.step-container {
	position: relative;
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.total {
		border: 1px solid #ccc;
		span {
			float: left;
			width: 33.33%;
			text-align: center;
			.text-ellipsis;
		}
		.title {
			height: 40px;
			overflow: hidden;
			background: #e6e6e6;
			span {
				color: #333;
				height: 40px;
				line-height: 40px;
			}
		}
		.total-data {
			overflow: hidden;
			span {
				color: #f8941f;
				height: 50px;
				line-height: 50px;
			}
		}
	}
	.goods span {
		width: 25%;
	}
	.store-list {
		margin-top: 20px;
		border: 1px solid #ccc;
		.length {
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			font-size: 16px;
			span {
				color: #ff3c04;
			}
		}
		.title {
			overflow: hidden;
			background: #e6e6e6;
			span {
				float: left;
				text-align: center;
				height: 40px;
				line-height: 40px;
				width: 33.33%;
			}
		}
		.day span {
			width: 25%;
		}
		ul {
			background: #fff;
			li {
				overflow: hidden;
				border-bottom: 1px solid #eee;
				span {
					float: left;
					text-align: center;
					height: 50px;
					line-height: 50px;
					width: 33.33%;
					color: #f8941f;
					.text-ellipsis;
				}
				.light {
					color: #29a7e1;
					cursor: pointer;
					&:hover {
						color: #09f;
					}
				}
				&:last-child {
					border-bottom: 0;
				}
			}
			.day span {
				width: 25%;
			}
			.list-empty {
				height: 70px;
				line-height: 70px;
				font-size: 20px;
				text-align: center;
				color: #999;
			}
		}
	}
	.list {
		margin-top: 20px;
		border: 1px solid #ccc;
		.length {
			height: 50px;
			line-height: 50px;
			padding-left: 10px;
			font-size: 16px;
			span {
				color: #f30;
				font-size: 16px;
			}
		}
		.title {
			overflow: hidden;
			background: #e6e6e6;
			span {
				float: left;
				text-align: center;
				height: 50px;
				line-height: 50px;
				width: 20%;
			}
			.short {
				width: 12%;
			} /*短一点的 8*3 24%*/
		}
		ul {
			background: #fff;
			li {
				overflow: hidden;
				border-bottom: 1px solid #eee;
				span {
					float: left;
					text-align: center;
					height: 50px;
					line-height: 50px;
					width: 20%;
					color: #666;
					.text-ellipsis;
					.light {
						color: #29a7e1;
						cursor: pointer;
						&:hover {
							color: #09f;
						}
					}
				}
				.short {
					width: 12%;
				} /*短一点的 8*3 24%*/
				.light {
					color: #29a7e1;
					cursor: pointer;
					&:hover {
						color: #f8941f;
					}
				}
				&:last-child {
					border-bottom: 0;
				}
			}
			.list-empty {
				height: 70px;
				line-height: 70px;
				font-size: 20px;
				text-align: center;
				color: #999;
			}
		}
	}
	.goods {
		.title {
			span {
				width: 25%;
			}
		}
		ul li span {
			width: 25%;
		}
	}
	.order {
		.title {
			span {
				width: 12%;
			}
			.wide {
				width: 20%;
			}
		}
		ul li {
			span {
				width: 12%;
			}
			.wide {
				width: 20%;
			}
		}
	}
	.detail {
		.detail-head {
			border: 1px solid #ddd;
			border-bottom: 0;
			padding-bottom: 30px;
			span {
				height: 60px;
				line-height: 60px;
				padding-left: 50px;
				color: #666;
				background: #f7f7f7;
				display: block;
			}
			ul {
				overflow: hidden;
				padding-left: 10%;
				padding-top: 30px;
				li {
					float: left;
					width: 33.33%;
					position: relative;
					line-height: 1.5;
					padding: 0 10px;
					padding-left: 70px;
					word-break: break-all;
					em {
						position: absolute;
						left: 0;
						top: 0;
					}
				}
			}
			@media only screen and (max-width: 1200px) {
				ul {
					padding-left: 5%;
				}
			}
		}
		.detail-list {
			.title {
				background: #ecedf2;
				overflow: hidden;
			}
			span {
				float: left;
				width: 12%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				.text-ellipsis;
			}
			.wide {
				width: 20%;
			}
			ul {
				max-height: 400px;
				overflow: auto;
				li {
					overflow: hidden;
					width: 100%;
					border-bottom: 1px solid #eee;
					span {
						height: 60px;
						line-height: 60px;
					}
					&:last-child {
						border-bottom: 0;
					}
				}
			}
		}
	}
	.page-box {
		width: 100%;
		padding-top: 20px;
		padding-bottom: 20px;
		text-align: left;
	}
	.loading {
		width: 100%;
		height: 350px;
		padding-top: 100px;
		text-align: center;
	}
}
</style>