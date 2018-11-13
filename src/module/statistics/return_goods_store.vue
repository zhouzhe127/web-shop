<!--废单统计 内容列表-->
<!--黄一帆-->
<template>
	<div class="step-container">
		<!--店铺列表-->
		<template v-if="showStep == 1 && !loadShow">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>退品总数</span>
					<span>退品总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{orderTotal.totalNum}}</span>
					<span>{{orderTotal.totalPrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="length">
					退品统计 · 共
					<span> {{orderStoreList.length}} </span>条记录
				</div>
				<div class="title">
					<span>店铺名称</span>
					<span>退品总数</span>
					<span>退品总额</span>
				</div>
				<ul @click="toDay">
					<li v-for="(item,index) in orderStoreList" :key="index">
						<span class="light" :data-id="item.shopId" :title="item.shopName">{{item.shopName}}</span>
						<span :title="item.totalNum">{{item.totalNum}}</span>
						<span :title="item.totalPrice">{{item.totalPrice}}</span>
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
					<span>退品总数</span>
					<span>退品总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{dayTotal.returnNum}}</span>
					<span>{{dayTotal.returnPrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="title day">
					<span>查看详情</span>
					<span>时间</span>
					<span>退品数量</span>
					<span>退品金额</span>
				</div>
				<ul @click="toSingle">
					<li class="day" v-for="(item,index) in dayList" :key="index">
						<span class="light" :data-time="item.date">查看详情</span>
						<span :title="formatTime(item.date)">{{formatTime(item.date)}}</span>
						<span :title="item.returnNum">{{item.returnNum}}</span>
						<span :title="item.returnPrice">{{item.returnPrice}}</span>
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
					<span>退品总数</span>
					<span>退品总额</span>
				</div>
				<div class="total-data">
					<span>{{total.totalDay}}</span>
					<span>{{total.orderNum}}</span>
					<span>{{total.returnNum}}</span>
					<span>{{total.returnPrice}}</span>
				</div>
			</div>
			<div class="list goods">
				<div class="length">
					退品统计 · 共
					<span> {{total.recordNum}} </span>条记录
				</div>
				<div class="title">
					<span>操作</span>
					<span>商品名称</span>
					<span>商品编码</span>
					<span>退品数量</span>
					<span>退品金额</span>
					<span>退品原因</span>
				</div>
				<ul @click="showOrderDetail">
					<li v-for="(item,index) in returnList" :key="index">
						<span class="show-order light" :data-index="index">查看详情</span>
						<span :title="item.goodsName">{{item.goodsName}}</span>
						<span :title="item.goodsName">{{item.goodsCode}}</span>
						<span :title="item.returnNum">{{item.returnNum}}</span>
						<span :title="item.returnPrice">{{item.returnPrice}}</span>
						<div style="position:relative;display:inline-block;width:15%;">
							<span style="cursor:pointer;width:100%;height:100%;" :title="item.reasonL" @click.stop @click="showNames(index,item.reasonL)">{{item.reasonL}}</span>
							<div v-if="isNames == index" class="detLi" style="">
								<div class="detDiv" style="">
									<i class="detI" style=""></i>
									<div class="detH3">
										<div v-for="(info,index) in reasonList" :key="index+'-'">{{info}}
											<i v-if="index != reasonList.length-1">;</i>
										</div>
									</div>
								</div>
							</div>
						</div>

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
					<span>退品总数</span>
					<span>退品总额</span>
				</div>
				<div class="total-data">
					<span>{{total.totalDay}}</span>
					<span>{{total.orderNum}}</span>
					<span>{{total.returnNum}}</span>
					<span>{{total.returnPrice}}</span>
				</div>
			</div>
			<tableCom :listHeight="50" :listName="returnListGoodsName" :allTotal="total.orderNum" :fixed="2" :introData="returnOrderList" :titleData="titleList1" :listWidth="1200">
				<div slot="con-0" slot-scope="props" @click="toDetail(props.data,props.index,1)" style="color:#f8941f;cursor:pointer;">
					查看详情
				</div>
				<div slot="con-1" slot-scope="props" @click="toDetail(props.data,props.index,2)" style="color:#29abe2;cursor:pointer;">
					{{props.data.oid}}
				</div>
				<!-- <div slot="con-7" slot-scope="props">
					<span style="cursor:pointer;width:100%;height:100%;" >{{props.data.reasonL}}</span> -->
					<!-- <div v-if="isNames == props.index" class="detLi" style="">
						<div class="detDiv" style="">
							<i class="detI" style=""></i>
							<div class="detH3">
								<div v-for="(info,index) in reasonList" :key="index+'-'">{{info}}
									<i v-if="index != reasonList.length-1">;</i>
								</div>
							</div>
						</div>
					</div> -->
				<!-- </div> -->
			</tableCom>
		</template>
		<!--退品-订单详情-->
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
							<em>退品数量：</em>{{detailTotal.returnNum}}</li>
						<li>
							<em>退品总额：</em>{{detailTotal.returnPrice}}</li>
					</ul>
				</div>
				<tableCom :listHeight="50" :showHand="false" :fixed="0" :introData="returnDetailList" :titleData="titleList2" :mainBox="mainBox" :listWidth="1200">
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
		'order', //多商品退品列表
		'otherData', //其他请求参数
		'step', //操作步骤
		'loading' //加载动画
	],
	data() {
		return {
			returnData: '', //多商品退品数据
			returnList: [], //多商品退品列表
			returnOrderList: [], //退品列表
			returnDetailList: [], //退品详情列表
			orderStoreList: '', //店铺列表
			shopId: '', //单店id
			dayData: '', //多天退品详情
			dayList: [], //多天退品详情列表
			sendData: {}, //其他数据 时间 分页 是否按营业时间统计 店铺id
			total: {
				returnNum: 0,
				returnPrice: 0,
				orderNum: 0,
				totalDay: 1,
				recordNum: 0
			}, //多商品退品总数/单商品订单总数
			orderTotal: { totalNum: 0, totalPrice: 0, totalDay: 1 }, //店铺订单总数
			dayTotal: { returnNum: 0, returnPrice: 0 }, //多天总数
			detailTotal: {
				oid: '',
				returnNum: 0,
				createTime: '',
				returnPrice: 0,
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
				{ titleName: '退品数量', dataName: 'returnNum' },
				{ titleName: '退品金额(元)', dataName: 'returnPrice' },
				{ titleName: '退品原因', dataName: 'reasonL' }
			],
			titleList2: [
				{ titleName: '商品类型', dataName: 'typeName' },
				{ titleName: '商品名称', dataName: 'itemName' },
				{ titleName: '退品数量', dataName: 'totalNum' },
				{ titleName: '退品金额', dataName: 'totalPrice' },
				{ titleName: '退品时间', dataName: 'time' },
				{ titleName: '退品原因', dataName: 'reasonName' },
				{ titleName: '操作人', dataName: 'staffName' }
			],
			mainBox: { 'margin-top': 0 },
			isNames: -2,
			reasonList: []
		};
	},
	watch: {
		store: 'setStore',
		step: 'setStep',
		order: 'setOrder',
		loading: 'setLoad',
		// pageShow: 'initData',
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

		this.$nextTick(function() {
			this.getOrderListCache(); //获取缓存订单列表 从订单详情返回时调用;
		});
		document.addEventListener('click', this.remove);
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		tableCom: () =>
			import(/*webpackChunkName:"com_table"*/ 'src/components/com_table')
	},
	destroyed() {
		document.removeEventListener('click', this.remove);
	},
	methods: {
		remove() {
			this.isNames = -1;
		},
		showNames(index, list) {
			if (index == this.isNames) {
				index = -1;
			}
			this.isNames = index;
			this.reasonList = list.split(',');
		},
		toDay(event) {
			//进入多天列表
			let target = event.target;
			if (target.className.indexOf('light') >= 0) {
				//直接进入单天多商品列表
				if (this.orderTotal.totalDay <= 1) {
					this.shopId = target.getAttribute('data-id');
					this.singleTime = this.sendData.brand.startTime / 1000;
					storage.session('deleteSingleTime', this.singleTime);
					this.getMoreShop();
				} else {
					//进入多天列表
					this.shopId = target.getAttribute('data-id'); //获取单店id
					(this.page = 1), (this.pageNum = 1);
					this.getDayData();
					storage.session('deleteShopId', this.shopId);
				}
			}
		},
		toSingle(event) {
			//点击查看详情 进入多商品列表
			let target = event.target;
			if (target.className.indexOf('light') >= 0) {
				this.singleTime = target.getAttribute('data-time');
				storage.session('deleteSingleTime', this.singleTime);
				this.getMoreShop();
			}
		},
		getMoreShop() {
			//不带page 需要请求区域 桌台
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
			let data = await http.moreReturn({
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
			//进入退品详情页面/订单详情
			//订单详情
			if (type == 2) {
				let stepObj = { step: 0, id: item.oid };
				this.$emit('emit', stepObj);
			}
			//退品详情
			if (type == 1) {
				let data = await http.getReturnDetail({
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
					if (i != 'returnNum' || i != 'returnPrice') {
						this.detailTotal[i] = this.returnOrderList[index][i];
					}
				}
				for (let item of data) {
					num += item.totalNum*1;
					price += item.totalPrice*1;
				}
				this.detailTotal.returnNum = num;
				this.detailTotal.returnPrice = price;
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
			//点击 从多商品列表 进入单商品退品列表
			let endTime = new Date(this.sendData.store.endTime).setHours(
				23,
				59,
				59,
				0
			);
			let data = await http.getReturnList({
				data: {
					startTime: parseInt(this.sendData.store.startTime / 1000),
					endTime: parseInt(endTime / 1000),
					isOpenTime: this.sendData.store.openTime,
					page: this.page,
					num: this.pageShow,
					trueShopId: this.sendData.store.shopId, //单店id
					areaId: this.sendData.store.areaId,
					tableId: this.sendData.store.tableId,
					reasonId: this.sendData.store.reasonId,
					goodsName: this.returnList[this.listIndex].goodsName,
					gid: this.returnList[this.listIndex].gid,
					packageId: this.returnList[this.listIndex].packageId
				}
			});
			this.showStep = 4; //进入第四步
			this.returnOrderList = data.list ? data.list : [];
			this.pageNum = data.pageNum ? data.pageNum : 1; //重置分页
			for (let i = 0; i < this.returnOrderList.length; i++) {
				this.returnOrderList[i].reasonL = '';
				for(let j=0;j<this.returnOrderList[i].returnReason.length;j++){
					this.returnOrderList[i].reasonL = this.returnOrderList[i].reasonL+ this.returnOrderList[i].returnReason[j].reasonName+',';
				}
			}
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
			//获取订单列表缓存 step3
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
					this.getDayData();
					break;
				case 3:
					this.showStep = 3;
					stepObj = {
						step: this.showStep,
						id: this.sendData.store.shopId,
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
			this.dayList = data.list ? data.list : []; //多天退品列表
			this.dayTotal.returnNum = data.total.returnNum;
			this.dayTotal.returnPrice = data.total.returnPrice;
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
			//第三步 设置多商品退品列表
			this.returnList = this.order.list ? this.order.list : [];
			for (let i = 0; i < this.returnList.length; i++) {
				let returnReason = '';
				for (
					let j = 0;
					j < this.returnList[i].returnReason.length;
					j++
				) {
					returnReason =
						returnReason +
						this.returnList[i].returnReason[j].reasonName +
						'(' +
						this.returnList[i].returnReason[j].reasonNum +
						'),';
				}
				this.returnList[i].reasonL = returnReason;
			}
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
		width: 15%;
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
				width: 15%;
			}
			.short {
				width: 12%;
			} /*短一点的 8*3 24%*/
		}
		ul {
			background: #fff;
			li {
				// overflow: hidden;
				height: 50px;
				border-bottom: 1px solid #eee;
				span {
					float: left;
					text-align: center;
					height: 50px;
					line-height: 50px;
					width: 15%;
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
				width: 15%;
			}
		}
		ul li span {
			width: 15%;
		}
	}
	.order {
		.title {
			span {
				width: 12%;
			}
		}
		ul li {
			span {
				width: 12%;
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
				// overflow: hidden;
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
				// overflow: hidden;
			}
			span {
				float: left;
				width: 12%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				.text-ellipsis;
			}
			ul {
				max-height: 400px;
				overflow: auto;
				li {
					// overflow: hidden;
					height: 60px;
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
	.detLi {
		// position: relative;
		cursor: pointer;
		display: inline-block;
		margin-bottom: 10px;
	}

	.detLi .detDiv {
		display: inline-block;
		width: 300px;
		background: #45404b;
		position: absolute;
		top: 45px;
		right: 0;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 2000;
	}

	.detLi .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
	}

	.detLi .detDiv .detH3 {
		line-height: 22px;
		color: #e6e6e7;
		text-align: center;
		margin: 10px 12px;
		min-height: 87px;
		overflow: auto;
	}
}
</style>