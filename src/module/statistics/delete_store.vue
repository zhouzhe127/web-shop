<!--废单统计 内容列表-->
<!--黄一帆-->
<template>
	<div class="step-container">
		<!--店铺列表-->
		<template v-if="showStep == 1 && !loadShow">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>废单总数</span>
					<span>废单总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{orderTotal.orderNum}}</span>
					<span>{{orderTotal.totalPrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="length">
					废单统计 · 共
					<span> {{orderStoreList.length}} </span>条记录
				</div>
				<div class="title">
					<span>店铺名称</span>
					<span>废单总数</span>
					<span>废单总额</span>
				</div>
				<ul @click="toDay">
					<li v-for="(item,index) in orderStoreList" :key="index">
						<span class="light" :data-id="item.shopId">{{item.shopName}}</span>
						<span>{{item.orderNum}}</span>
						<span>{{item.price}}</span>
					</li>
					<li class="list-empty" v-if="!orderStoreList.length">暂时没有废单</li>
				</ul>
			</div>
		</template>
		<div class="loading" v-if="loadShow"><img src="../../res/images/preloader.gif" /></div>
		<!--多天列表-->
		<template v-if="showStep == 2">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>废单总数</span>
					<span>废单总额</span>
				</div>
				<div class="total-data">
					<span>{{orderTotal.totalDay}}</span>
					<span>{{dayTotal.orderNum}}</span>
					<span>{{dayTotal.totalPrice}}</span>
				</div>
			</div>
			<div class="store-list">
				<div class="title day">
					<span>查看详情</span>
					<span>时间</span>
					<span>废单数量</span>
					<span>废单金额</span>
				</div>
				<ul @click="toSingle">
					<li class="day" v-for="(item,index) in dayList" :key="index">
						<span class="light" :data-time="item.date">查看详情</span>
						<span>{{formatTime(item.date)}}</span>
						<span>{{item.orderNum}}</span>
						<span>{{item.price}}</span>
					</li>
					<li class="list-empty" v-if="!dayList.length">暂时没有废单</li>
				</ul>
			</div>
		</template>
		<!--单店列表-->
		<template v-if="showStep == 3">
			<div class="total">
				<div class="title">
					<span>天数</span>
					<span>废单总数</span>
					<span>废单总额</span>
				</div>
				<div class="total-data">
					<span>{{total.totalDay}}</span>
					<span>{{total.orderNum}}</span>
					<span>{{total.totalPrice}}</span>
				</div>
			</div>
			<tableCom :listHeight="50" :listName="'废单统计'" :allTotal="total.orderNum" :introData="deleteList" :titleData="titleList" :listWidth="1200">
				<div slot="con-0" slot-scope="props" @click="toDetail(props.data)" style="color:#29abe2;cursor:pointer;">
					{{props.data.oid}}
				</div>
			</tableCom>
		</template>
		<div class="page-box" v-if="step!=1">
			<pageBtn @pageNum="pageChange" :total="pageNum" :page="page" :isNoJump="true"></pageBtn>
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
		'order', //废单列表
		'otherData', //其他请求参数
		'step', //操作步骤
		'loading' //加载动画
	],
	data() {
		return {
			dropList: ['10', '20'],
			deleteList: [], //废单列表
			orderStoreList: '', //店铺列表
			shopId: '', //单店id
			dayData: '', //多天废单详情
			dayList: [], //多天废单详情列表
			sendData: {}, //其他数据 时间 分页 是否按营业时间统计 店铺id
			total: { orderNum: 0, totalPrice: 0, totalDay: 1 }, //废单总数
			orderTotal: { orderNum: 0, totalPrice: 0, totalDay: 1 }, //店铺订单总数
			dayTotal: { orderNum: 0, totalPrice: 0 }, //多天总数
			page: 1,
			num: 10,
			pageNum: 1,
			pageShow: 10, //每页显示几条
			showStep: '', //操作步骤显示
			showPageList: [10, 20],
			loadShow: false, //加载动画
			singleTime: '', //单天时间
			titleList: [
				{ titleName: '订单号', titleStyle: { width: 190 + 'px' } },
				{ titleName: '区域', dataName: 'areaName' },
				{ titleName: '桌台', dataName: 'tableName' },
				{ titleName: '废单金额', dataName: 'price' },
				{ titleName: '开单时间', dataName: 'createTime' },
				{ titleName: '废单时间', dataName: 'updateTime' },
				{ titleName: '废单原因', dataName: 'delReason' },
				{ titleName: '操作人', dataName: 'staffName' }
			]
		};
	},
	watch: {
		store: 'setStore',
		step: 'setStep',
		order: 'setOrder',
		loading: 'setLoad'
	},
	mounted() {
		this.orderStoreList = this.store ? this.store : []; //品牌 刚进页面
		this.deleteList = this.order.list ? this.order.list : []; //单店 刚进页面
		this.sendData = this.otherData; //品牌
		this.showStep = this.step;
		//初始化设置一遍数据
		this.setStore();
		this.setOrder();
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
			if (target.className.includes('light')) {
				this.shopId = target.getAttribute('data-id'); //获取单店id
				this.page = 1;
				this.getDayData();
				storage.session('deleteShopId', this.shopId);
			}
		},
		toSingle(event) {
			//点击列表订单号 进入单店页面
			let target = event.target;
			if (target.className.includes('light')) {
				this.singleTime = target.getAttribute('data-time');
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
			}
		},
		async getDayData() {
			//获取多天列表
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
		pageChange(obj) {
			//翻页
			let prevPage = this.page;
			this.page = obj.page;
			this.pageShow = obj.num;
			if (prevPage != obj.page) {
				this.initData();
			}
		},
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
		showPageChange() {
			//每行显示多少页
			this.page = 1;
			//this.pageShow = this.showPageList[index];
			this.initData();
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
			this.dayTotal.orderNum = data.total.orderNum;
			this.dayTotal.totalPrice = data.total.price;
		},
		setStep() {
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
			this.orderStoreList.forEach(item => {
				num += item.orderNum;
				price += item.price;
			});
			this.orderTotal.orderNum = num;
			this.orderTotal.totalPrice = price;
			this.orderTotal.totalDay = Math.ceil(
				(this.sendData.endTime - this.sendData.startTime) /
					(24 * 3600 * 1000)
			);
		},
		setOrder() {
			//第三步 设置废单列表
			let singleTime = storage.session('deleteSingleTime');
			this.singleTime = singleTime ? singleTime : '';
			this.deleteList = this.order.list ? this.order.list : [];
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
	.store-list {
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
				width: 33.33%;
				color: #666;
			}
		}
		.day span {
			width: 25%;
		}
		ul {
			background: #fff;
			li {
				overflow: hidden;
				border-bottom: 1px solid #f7f7f7;
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