<template>
	<div id="proprietary" style="padding-top:20px;">
		<section v-if="showtype == 'all'">
			<div class="button">
				<a href="javascript:void(0);" v-on:click="toOrder">堂吃</a>
				<a href="javascript:void(0);" v-on:click="toTakeout">外卖</a>
				<a href="javascript:void(0);" class="select">自营外卖</a>
			</div>
			<div class="filter clearfix">
				<section class="fl" style="height:40px;margin-bottom:20px;line-height:40px;">
					<!-- <span class="title fl">创建时间</span> -->
					<section class="fl">
						<calendar :pObj="startObj" @throwTime="getStartTime"></calendar>
					</section>
					<span class="fl line">-</span>
					<section class="fl">
						<calendar :pObj="endObj" @throwTime="getEndTime"></calendar>
					</section>
				</section>
				<!-- 按营业时间 -->
				<div class="orderNum fl">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" class="checkBox"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</div>
				<!-- 选择店铺 -->
				<div class="orderNum fl" v-if="ischain == '3'">
					<selectstore @emit="getSelectShopList" :sorts="postSelectShopList" :tipName="selectName"></selectstore>
				</div>
				<!-- 筛选重置 -->
				<div class="search-box fl">
					<span class="search-btn blue" @click="takeoutOrderQuery()">筛选</span>
					<span class="reset-btn gray" @click="resetting()">重置</span>
				</div>
			</div>
			<!-- 类型 -->
			<div class="compared">
				<span v-for="(item,index) in payWays" :key="index" :class="{'effect':payType==item.id}" @click="changeRadio(item)">{{item.name}}</span>
			</div>
			<!-- 头部表格 -->
			<section style="margin-bottom:20px;">
				<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
					<div slot="con-6" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<section>
				<com-table :listHeight='80' :listWidth="1400" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'外卖统计'" :key="index" :showTitle='1' :allTotal="allFormList.length">
					<div slot="con-0" slot-scope="props" @click="showoneshopDetail(props.data)">
						{{getshopName(props.data.shopId)}}
					</div>
					<div slot="con-6" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<oneshop-statics v-if="showtype == 'one'" @throwWinResult="getDetailShow" :constructionsName="constructionsName" :startTime="startObj.time" :endTime="endObj.time" :isOpenTime="isOpenTime" :constructionsId="constructionsId" :taskId='taskId' :payTypes='payType'>
		</oneshop-statics>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';

export default {
	data() {
		return {
			ischain: '', //品牌或单店标识
			index: null,
			page: 1, //页码数
			num: 10,
			endTotal: 1,
			startObj: {
				time: new Date().setHours(0, 0, 0, 0),
				width: 170
			}, //日期组件的开始时间
			endObj: {
				time: new Date().setHours(23, 59, 59, 999),
				width: 170
			}, //日期组件的结束时间
			payWays: [{
				id: 0,
				name: '已完成'
			},
			{
				id: 1,
				name: '已取消/退单'
			}
			], //类型
			payType: 0,
			titleList: [{
				titleName: '天数',
				dataName: 'days'
			},
			{
				titleName: '订单数',
				dataName: 'totalOrderNum'
			},
			{
				titleName: '销量 ',
				dataName: 'totalSales'
			},
			{
				titleName: '赠品数',
				dataName: 'totalGift'
			},
			{
				titleName: '配送总额',
				dataName: 'totalMoveFee'
			},
			{
				titleName: '优惠总额',
				dataName: 'totalDiscount'
			},
			{
				titleName: '代金券',
			},
			{
				titleName: '消费总额',
				dataName: 'totalConsumption'
			},
			{
				titleName: '微信支付',
				dataName: 'totalWeChatPain'
			},
			{
				titleName: '会员支付',
				dataName: 'totalMemberPain'
			},
			{
				titleName: '积分抵扣总额',
				dataName: 'totalPointCash'
			},			
			{
				titleName: '实收总额',
				dataName: 'totalPain'
			}
			],
			staticLists: [], //头部数据
			shoptitleList: [{
				titleName: '店铺名称',
				dataName: 'shopId',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '订单数',
				dataName: 'totalOrderNum'
			},
			{
				titleName: '销量',
				dataName: 'totalSales'
			},
			{
				titleName: '赠品数',
				dataName: 'totalGift'
			},
			{
				titleName: '配送金额',
				dataName: 'totalMoveFee'
			},
			{
				titleName: '优惠总额',
				dataName: 'totalDiscount'
			},
			{
				titleName: '代金券',
			},
			{
				titleName: '消费金额',
				dataName: 'totalConsumption'
			},
			{
				titleName: '微信支付',
				dataName: 'totalWeChatPain'
			},
			{
				titleName: '会员支付',
				dataName: 'totalMemberPain'
			},
			{
				titleName: '积分抵扣总额',
				dataName: 'totalPointCash'
			},			
			{
				titleName: '实收金额',
				dataName: 'totalPain'
			}
			],
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			isOpenTime: false, //是否按营业时间 默认 false 0 否
			postSelectShopList: [],
			selectName: null,
			shopIds: null, //选择查看的店铺的id
			timer: '', //定时器
			timeout: '',
			taskId: '', //任务Id
			timerqueue: [], //时间数组
			isloadingstatus: false, //延时处理
			loading: false, //状态
			constructionsName: '', //点击查询单店的店铺名称
			constructionsId: '', //点击查询单店的id
			showtype: 'all'
		};
	},
	methods: {
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.startObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.endObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		changeRadio: function(item) {
			//选择渠道
			let id = item.id;
			this.payType = id;
			this.takeoutOrderQuery();
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		getshopName: function(id) {
			let shopName = '';
			for (let item of this.postSelectShopList) {
				if (item.id == id) {
					shopName = item.name ? item.name : item.shopName;
					break;
				}
			}
			return shopName;
		},
		getSelectShopList: function(res) {
			this.postSelectShopList = res; //返回已经选好的店铺的数组 选中true 未选false
			let shopIdsStr = []; //存id
			let selectNameStr = []; //存店铺名
			for (let i = 0; i < res.length; i++) {
				if (res[i].selected == true) {
					shopIdsStr.push(res[i].id);
					selectNameStr.push(res[i].name);
				}
			}
			this.shopIds = shopIdsStr.join(',');
			this.selectName =
				selectNameStr == '' ? '请选择店铺' : selectNameStr.join(',');
		},
		getshopIdorshopName: function() {
			//默认全部选中
			if (this.ischain == '3') {
				let selectShopList = storage.session('shopList');
				let shopIds = [];
				let selectName = [];
				for (let item of selectShopList) {
					item.selected = true;
					item.name = item.shopName;
					shopIds.push(item.id);
					selectName.push(item.name);
				}
				this.shopIds = shopIds.join(',');
				this.selectName = selectName.join(',');
				this.postSelectShopList = selectShopList;
			} else {
				this.shopIds = storage.session('userShop').currentShop.id;
				this.selectName = storage.session('userShop').currentShop.name;
				this.postSelectShopList.push(
					storage.session('userShop').currentShop
				);
			}
		},
		checkData: function() {
			if (
				this.endObj.time - this.startObj.time >
				global.timeConst.THREEMONTHS
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '只能查询间隔三个月的数据'
				});
				return false;
			}
			if (this.startObj.time - this.endObj.time > 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '查询时间选择错误'
				});
				return false;
			}
			if (this.loading == true) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '正在搜索,请勿重复点击'
				});
				return false;
			}
			return true;
		},
		async takeoutOrderQuery() {
			if (!this.checkData()) return;
			this.loading = true;
			this.isloadingstatus = false;
			let data = await http.takeoutOrderQuery({
				data: {
					shopIds: this.shopIds, //查询的店铺Ids
					isOpenTime: Number(this.isOpenTime), //是否按营业时间
					startTime: parseInt(this.startObj.time / 1000), //开始时间
					endTime: parseInt(this.endObj.time / 1000), //结束时间
					orderStatus: this.payType //订单状态
				}
			});
			if (data) {
				this.taskId = data; //任务id
				this.timer = setInterval(() => {
					this.getTaskStatus(data);
				}, 2000);
			}
		},
		async getTaskStatus(id) {
			let data = await http.getScanTaskStatus({
				data: {
					taskId: id
				}
			});
			this.timeout = setTimeout(() => {
				if (!this.isloadingstatus) {
					this.loading = false;
					this.$store.commit('setWin', {
						content: '页面加载失败,请重新加载',
						title: '操作提示',
						winType: 'alert'
					});
					clearInterval(this.timer);
					while (this.timerqueue.length) {
						clearTimeout(this.timerqueue.pop());
					}
					return false;
				}
			}, 10000);
			this.timerqueue.push(this.timeout);
			if (data == true) {
				clearInterval(this.timer);
				while (this.timerqueue.length) {
					clearTimeout(this.timerqueue.pop());
				}
				this.getTakeoutData(id);
			}
		},
		async getTakeoutData(id) {
			let data = await http.getTakeoutData({
				data: {
					taskId: id, //任务Id
					showDetail: 0, //是否查看一家店铺的数据
					showShopId: '', // 查询一家店铺的数据的Id
					showDay: '' //查看一家店铺某一天的数据
				}
			});
			if (data) {
				this.loading = false;
				this.isloadingstatus = true;
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.list; //身体的数据
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		showoneshopDetail: function(item) {
			this.showtype = 'one';
			this.constructionsName = this.getshopName(item.shopId); //店铺名称
			this.constructionsId = item.shopId;
		},
		getDetailShow(res) {
			//子组件评价列表返给父组件的
			this.showtype = res;
		},
		//重置
		resetting: function() {
			this.isOpenTime = false;
			this.getshopIdorshopName();
			this.takeoutOrderQuery();
		},
		//到堂吃订单统计界面
		toOrder: function() {
			// let detial = {}; //要传的数据
			// detial = {
			//     name: 'order', //外卖的关键表示
			//     startTime: this.startTime,
			//     endTime: this.endTime,
			//     isOpenTime: this.isOpenTime
			// }
			// storage.session('orderTakeout', detial);
			this.$router.push({
				path: '/admin/orderStatistics',
				query: this.$route.query
			});
		},
		//到外卖界面
		toTakeout: function() {
			// let detial = {}; //要传的数据
			// detial = {
			//     name: 'takeout', //外卖的关键表示
			//     startTime: this.startTime,
			//     endTime: this.endTime,
			//     isOpenTime: this.isOpenTime
			// }
			// storage.session('orderTakeout', detial);
			this.$router.push({
				path: '/admin/orderStatistics/takeawayBrand',
				query: this.$route.query
			});
		}
	},
	watch: {},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		selectstore: () =>
			import ( /*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		oneshopStatics: () =>
			import ( /*webpackChunkName: "order_proprietary_shopstatistics"*/ './order_proprietary_shopstatistics')
	},
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		let obj2 = {
			conStyle: {
				color: '#ff9800'
			}
		};
		for (let item of this.titleList) {
			Object.assign(item, obj1, obj2);
		}
		for (let item of this.shoptitleList) {
			Object.assign(item, obj1);
		}
	},
	mounted() {
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(23, 59, 59, 999);
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.getshopIdorshopName();
		this.takeoutOrderQuery();
	},
	destroyed() {
		clearInterval(this.timer);
		clearTimeout(this.timeout);
	}
};
</script>
<style type="text/css" scoped>
#proprietary .button {
	margin-bottom: 35px;
}

#proprietary .button a {
	display: inline-block;
	width: 100px;
	height: 40px;
	color: orange;
	text-align: center;
	line-height: 40px;
	border: 1px solid orange;
}

#proprietary .button a.select {
	background: orange;
	color: #fff;
}



/* #proprietary .filter {
		overflow: hidden;
	}*/

#proprietary .filter .input-box {
	display: inline-block;
	vertical-align: middle;
}

#proprietary .filter .line {
	margin: 0 5px;
}



/* 搜索图标的公共样式 */

#proprietary .order-order-searchA,
#proprietary .order-order-search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
	margin-right: 25px;
	vertical-align: middle;
}

#proprietary .order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}

#proprietary .order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

#proprietary .order-order-searchA:active {
	background-color: #154961;
}

#proprietary .filter .search-box {
	display: inline-block;
	vertical-align: middle;
	width: 200px;
	height: 40px;
	margin-bottom: 20px;
}

#proprietary .filter .title {
	display: inline-block;
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	margin-right: 20px;
}

#proprietary .filter .orderNum {
	height: 40px;
	margin-right: 37px;
	margin-bottom: 20px;
	line-height: 40px;
}

#proprietary .filter .orderNum input {
	width: 180px;
	height: 40px;
	text-indent: 10px;
}

#proprietary .filter .orderNum .checkBox {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 13px 10px;
	float: left;
}

#proprietary .filter .search-box span {
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 0;
	color: #fff;
	display: inline-block;
	cursor: pointer;
}

#proprietary .filter .search-box .search-btn {
	margin-right: 20px;
}

#proprietary .compared {
	height: 40px;
	margin-bottom: 28px;
}

#proprietary .compared span {
	width: 120px;
	height: 40px;
	display: inline-block;
	font-size: 16px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	background-color: #f2f2f2;
	border-radius: 4px;
	margin-right: 15px;
}

#proprietary .compared .effect {
	background-color: #28a8e0;
	color: #ffffff;
}

#proprietary .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
	#28a8e0;
}
</style>