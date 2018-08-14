<template>
	<div id="proprietary">
		<section v-if='!showdetail'>
			<div class="button">
				<a href="javascript:void(0);" v-on:click="toOrder">堂吃</a>
				<a href="javascript:void(0);" v-on:click="toTakeout">外卖</a>
				<a href="javascript:void(0);" class="select">自营外卖</a>
			</div>
			<div class="filter clearfix">
				<section class="fl" style="height:40px;margin-bottom:20px;line-height:40px;">
					<!-- <span class="title fl">创建时间</span> -->
					<section class="tableListInp fl">
						<calendar :pObj="startObj" @throwTime="getStartTime" style=""></calendar>
					</section>
					<span class="fl line">-</span>
					<section class="tableListInp fl">
						<calendar :pObj="endObj" @throwTime="getEndTime"></calendar>
					</section>
					<span class="order-order-searchA fl" @click=" takeoutOrderQuery()">
						<span class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</section>
				<!-- 按营业时间 -->
				<div class="orderNum fl">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" class="checkBox"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</div>
				<!-- 订单号 -->
				<div class="orderNum fl">
					<span class="title fl">订单号</span>
					<input class="fl" type="text" placeholder="订单号" onkeyup="value=value.replace(/[^\d]/g,'')" v-model='oidnum'>
					<span class="order-order-searchA fl" @click="getOrderByMobileOrOid">
						<span class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</div>
				<!-- 手机号 -->
				<div class="orderNum fl">
					<span class="title fl">手机号</span>
					<input class="fl" type="text" placeholder="手机号" maxlength="11" v-model='phonenum' onkeyup="value=value.replace(/[^\d]/g,'')">
					<span class="order-order-searchA fl" @click="getOrderByMobileOrOid">
						<span class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</div>
				<!-- 筛选重置 -->
				<div class="search-box fl">
					<span class="reset-btn gray" @click="resetting()">重置</span>
				</div>
			</div>
			<!-- 类型 -->
			<div class="compared">
				<span v-for="(item,index) in payWays" :key="index" :class="{'effect':payType==item.id}" @click="changeRadio(item)">{{item.name}}</span>
			</div>
			<!-- 多天 -->
			<section v-if="showType == 'moreday'">
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
						<div slot="con-0" slot-scope="props" @click="getDetail(props.data)">
							查看详情
						</div>
						<div slot="con-7" slot-scope="props">
							{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
						</div>
					</com-table>
				</section>
				<!-- 翻页 -->
				<section class="turn-page">
					<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
				</section>
			</section>
			<!-- 单天 -->
			<section v-if="showType == 'oneday'">
				<scancode-order @scanorderResult="getscanorder" :constructionsId="shopIds" :oneData='oneData' :taskId="taskId" :payType='payType'></scancode-order>
			</section>
			<!-- 手机号订单号 -->
			<section v-if="showType == 'phone'">
				<phone-order @phoneResult="getphoneresult" :phoneOroidList='phoneOroidList'></phone-order>
			</section>
		</section>
		<section v-else>
			<order-detail @orderdetailResult='getdetailresult' :oid='oid' :constructionsId='shopIds'>
			</order-detail>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';

export default {
	data() {
		return {
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
				titleName: '代金券'
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
				titleName: '操作',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '日期 ',
				dataName: 'day'
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
				titleName: '代金券'
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
			shopIds: null, //选择查看的店铺的id
			timer: '', //定时器
			timeout: '',
			taskId: '', //任务Id
			timerqueue: [], //时间数组
			isloadingstatus: false, //延时处理
			loading: false, //状态
			oneData: '', //一天的日期
			showdetail: false, //查看详情
			oid: '', //订单号
			oidnum: '', //查询的订单号
			phonenum: '', //查询的手机号
			showType: 'moreday',
			phoneOroidList: [] //查询的电话订单列表
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
			this.$store.commit('setPageTools', {});
			this.showType = 'moreday';
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
					showDetail: 1, //是否查看一家店铺的数据
					showShopId: this.shopIds, // 查询一家店铺的数据的Id
					showDay: '' //查看一家店铺传递的日期
				}
			});
			if (data) {
				this.loading = false;
				this.isloadingstatus = true;
				if (data.days.length == 1) {
					this.showType = 'oneday';
					this.oneData = data.days[0].day;
				}
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.days; //身体的数据
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		getscanorder: function(res, item) {
			this.showType = res;
			if (item) {
				this.oid = item.oid;
				this.showdetail = item.showdetail;
			}
		},
		getphoneresult: function(res, item) {
			this.showType = res;
			if (item) {
				this.oid = item.oid;
				this.showdetail = item.showdetail;
			}
		},
		//重置
		resetting: function() {
			this.phonenum = '';
			this.oidnum = '';
			this.startObj.time = new Date().setHours(0, 0, 0, 0);
			this.endObj.time = new Date().setHours(23, 59, 59, 999);
			this.isOpenTime = false;
			this.takeoutOrderQuery();
		},
		getDetail: function(item) {
			this.showType = 'oneday';
			this.oneData = item.day;
		},
		getdetailresult: function(res) {
			//从订单详情过来的
			this.showdetail = res;
			if (this.showType == 'phone') {
				this.$store.commit('setPageTools', {});
			}
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
				path: '/admin/orderStatistics/orderMore',
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
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
		},
		async getOrderByMobileOrOid() {
			let data = await http.getOrderByMobileOrOid({
				data: {
					mobile: this.phonenum, //手机号
					oid: this.oidnum //订单号
				}
			});
			this.phoneOroidList = data;
			this.showType = 'phone';
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
		oneshopStatics: () =>
			import ( /*webpackChunkName: "order_proprietary_shopstatistics"*/ './order_proprietary_shopstatistics'),
		'scancode-order': () =>
			import ( /*webpackChunkName: "order_constructions_one"*/ './order_constructions_one'),
		'order-detail': () =>
			import ( /*webpackChunkName: "delivery_detail"*/ './delivery_detail'),
		'phone-order': () =>
			import ( /*webpackChunkName: "order_constructions_phoneoroid"*/ './order_constructions_phoneoroid')
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
		this.shopIds = storage.session('userShop').currentShop.id; //单店下的店铺id
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