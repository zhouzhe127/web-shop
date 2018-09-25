<template>
	<div id="statistics-order" v-cloak>
		<div class="button" v-if='!showDayAllDetail'>
			<a v-on:click="toOrder" href="javascript:void(0);">堂吃</a>
			<a href="javascript:void(0);" class="select">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<section v-if="isBrand" style="width:100%;overflow: hidden;">
			<section class="oShopDel" style="width: 80px;">选择店铺：</section>
			<section class="oShopDel" style="margin:0 5px;">{{dataDetial.itemDetial.shopName}} |</section>
			<section class="oShopDel" style="width: 80px;">选择时间：</section>
			<section class="oShopDel" style="">{{timeToday(startTime)}}--{{timeToday(endTime)}}</section>
		</section>
		<!--总览订单页面显示日期-->
		<div class="order-order-data" v-if='!showDayAllDetail' style="margin:15px 0 ;width:100%;">
			<section style="display:inline-block;">
				<el-date-picker :clearable="false" v-if="!isBrand" v-model="startTime" type="datetime" placeholder="选择日期">
				</el-date-picker>
				<span v-if="!isBrand" style="width: 25px;line-height: 40px;text-align: center;">至</span>
				<el-date-picker :clearable="false" v-if="!isBrand" v-model="endTime" type="datetime" placeholder="选择日期">
				</el-date-picker>
				<el-button v-if="!isBrand" @click="sreachOrderInDays" type="primary" icon="el-icon-search">搜索</el-button>
				<div v-if="!isBrand" style="line-height: 46px;display:inline-block;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</div>
				<el-select v-model="selectTypeNum" @change="selectTakeawayType" placeholder="请选择外卖类型" style="width:150px;">
					<el-option v-for="(item,index) in takeawaytypeList" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
				<div style="display:inline-block;">
					<el-input placeholder="请输入订单号" maxlength="20" v-model="orderNumber" clearable class="input-with-select" style="width:200px;">
						<el-button slot="append" icon="el-icon-search" @click="getInfoByOrder"></el-button>
					</el-input>
					<el-button v-on:click="reset" type="info">重置</el-button>
				</div>
			</section>
			<!-- <ul style="width: 100%;">
				<li v-if="!isBrand">
					<section class="statisticsList fl">
						<calendar :pObj="startObj" @throwTime="getStartTime" style="width: 245px;height: 41px;float:left;"></calendar>
					</section>
					<span style="float: left; width: 25px;line-height: 40px;text-align: center;"> - </span>
					<section class="statisticsList fl">
						<calendar :pObj="endObj" @throwTime="getEndTime" style="width: 245px;height: 41px;float:left;"></calendar>
					</section>
					<span v-if="showAllDay || showDay" class="order-order-searchA fi fi-search" v-on:click="sreachOrderInDays" style="margin-right:15px;">
					</span>
				</li>
				<li v-if="!isBrand" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li>
				<li>
					<el-select v-model="selectTypeNum" @change="selectTakeawayType" placeholder="请选择外卖类型" style="width:150px;">
						<el-option
							v-for="(item,index) in takeawaytypeList"
							:key="index"
							:label="item"
							:value="index">
						</el-option>
					</el-select>
				</li>
				<li style="width:250px;">
					<el-input placeholder="请输入订单号" maxlength="20" v-model="orderNumber" clearable class="input-with-select" >
						<el-button slot="append" icon="el-icon-search" @click="getInfoByOrder"></el-button>
					</el-input>
				</li>
				<el-button v-on:click="reset" type="info">重置</el-button>
			</ul> -->
		</div>
		<section v-if="showDay" style="width:100%;height: 60px;">
			<el-radio-group v-model="status" @change="getOidList">
				<el-radio-button label="1">已完成</el-radio-button>
				<el-radio-button label="0">进行中</el-radio-button>
				<el-radio-button label="2">已取消</el-radio-button>
				<el-radio-button label="3">售后退款</el-radio-button>
			</el-radio-group>
		</section>
		<div>
			<el-table stripe :row-style="{color:'#f8941f'}" :header-cell-style="{'background-color':'#f5f7fa'}" :data="newpayTotalNum" border style="width: 100%">
				<el-table-column width="250" align="center" prop="days" label="天数"></el-table-column>
				<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="totalNum" label="商品总数"></el-table-column>
				<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="销量"></el-table-column>
				<el-table-column min-width="100" show-overflow-tooltip align="center" prop="discountNum" label="赠品总数"></el-table-column>
				<el-table-column min-width="100" show-overflow-tooltip align="center" prop="partRefund" label="部分退款">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.partRefund).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="status =='3'" min-width="100" show-overflow-tooltip align="center" prop="goodsTotalPrice" label="退款总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="status !='2'" min-width="100" show-overflow-tooltip align="center" prop="deliverFee" label="配送总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.deliverFee).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="status !='2'" min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="activityFee" label="优惠总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.activityFee).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="status !='2'" min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="goodsTotalPrice" label="消费总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column v-if="status !='2' && status !='3'" min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="income" label="入账总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.income).toFixed(2)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<section v-if="showAllDay">
				<section style="margin-top:20px;">
					<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="paginationList" border style="width: 100%">
						<el-table-column fixed width="250" align="center" prop="shopName" label="操作">
							<template slot-scope="scope">
								<span style="color:#00AAE7;cursor: pointer;" v-on:click="openDayDetial(scope.row.time)">查看详情</span>
							</template>
						</el-table-column>
						<el-table-column min-width="100" align="center" prop="time" label="日期"></el-table-column>
						<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
						<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="totalNum" label="商品数"></el-table-column>
						<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="销量"></el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="discountNum" label="赠品数"></el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="partRefund" label="部分退款">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.partRefund).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="goodsTotalPrice" label="退款总额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="deliverFee" label="配送金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.deliverFee).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="120" show-overflow-tooltip align="center" prop="activityFee" label="优惠金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.activityFee).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="goodsTotalPrice" label="消费金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="income" label="入账金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.income).toFixed(2)}}</span>
							</template>
						</el-table-column>
					</el-table>
				</section>
			</section>
			<section v-if="showDay">
				<section style="margin-top:20px;">
					<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="paginationList" border style="width: 100%">
						<el-table-column fixed width="250" align="center" prop="shopName" label="订单号">
							<template slot-scope="scope">
								<span style="color:#00AAE7;cursor: pointer;" @click="orderDetails(scope.row)">{{scope.row.orderId}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width="100" align="center" prop="takeoutName" label="类型"></el-table-column>
						<el-table-column min-width="100" align="center" prop="status" label="状态"></el-table-column>
						<el-table-column min-width="150" show-overflow-tooltip align="center" prop="time" label="下单时间"></el-table-column>
						<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="totalNum" label="商品数"></el-table-column>
						<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="销量"></el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="discountNum" label="赠品数"></el-table-column>
						<el-table-column min-width="100" show-overflow-tooltip align="center" prop="partRefund" label="部分退款">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.partRefund).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="status =='3'" min-width="100" show-overflow-tooltip align="center" prop="goodsTotalPrice" label="退款金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="status !='2'" min-width="100" show-overflow-tooltip align="center" prop="deliverFee" label="配送金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.deliverFee).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="status !='2'" min-width="120" show-overflow-tooltip align="center" prop="activityFee" label="优惠金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.activityFee).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="status !='2'" min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="goodsTotalPrice" label="消费金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
							</template>
						</el-table-column>
						<el-table-column v-if="status !='2' && status !='3'" min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="income" label="入账金额">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.income).toFixed(2)}}</span>
							</template>
						</el-table-column>
					</el-table>
				</section>
			</section>
		</div>
		<!--分页-->
		<div v-if="!showDay && showAllDay" style="margin:20px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="allDayPage.page" :page-count="allDayPage.pageNum" :page-size="allDayPage.num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<div v-if="showDay" style="margin:20px 0;">
			<el-pagination background @size-change="oneNumChange" @current-change="onePageClick" :current-page="dayPage.page" :page-count="dayPage.pageNum" :page-size="dayPage.num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<!-- <div v-if="!showDay && showAllDay" style="float: right;margin-right: 30px;">
			<pageElement @pageNum="getOrderListMonPage" :page="allDayPage.page+1" :total="allDayPage.pageNum" :num="allDayPage.num" :isNoJump='true'></pageElement>
		</div>
		<div v-if="showDay" style="float: right;margin-right: 30px;">
			<pageElement @pageNum="getOrderListInDayPage" :page="dayPage.page+1" :total="dayPage.pageNum" :num="dayPage.num" :isNoJump='true'></pageElement>
		</div> -->
		<!-- <div class="order-operation">
			<template v-if='!showDay ||(showDayAllDetail&&!showDay)'>
				<div>
					<a class="blue" v-on:click='exportOrderTakeaway($event)' v-if='!showDay && !showDayAllDetail' :href="exportUrl" style="width:100px;text-align: center;height: 40px;line-height: 40px;">导出</a>
				</div>
				<div v-if="!isBrand" v-on:click='printOrderTakeout()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
				<div v-if="!showDay&&showDayAllDetail" class="return" v-on:click='returnPage()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
			</template>
			
			<template v-if='showDay'>
				<div>
					<a v-if='!showDayAllDetail' v-on:click='exportOrderTakeaway($event)' :href="exportUrl" class="blue" style="width:100px;text-align: center;height: 40px;line-height: 40px;">导出</a>
				</div>
				<div v-if="(showDay || showDayAllDetail) && !isBrand" v-on:click='printOrderTakeout()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
				<div v-if="showAllDay && !showDayAllDetail && !isBrand" v-on:click='printOrderTakeout()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
				<div class="return" v-on:click='returnPage()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
			</template>
			<div v-if="showAllDay && isBrand" class="return" v-on:click='returnBrand()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
		</div> -->
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			dataDetial: {},
			brandId: '',
			shopId: '',
			isBrand: '', //品牌判断
			showDayAllDetail: false, //展示一条订单的详细
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			showAllDay: false, //展示总数据
			showDay: false, //展示一天订单 与否
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			// areaBtn: false,//区域
			// timeBtn: false, //时间
			// timeBtnKind: false,
			// allArea: '选择区域',
			// timeArea: '选择时间类别',
			// timeKind: '选择时间',
			// allTakeawaytype: '请选择类型',
			// takeawaytypeBtn: false,
			orderNumber: '',
			allDayPage: {
				page: 1,
				num: 10,
				pageNum: 1
			}, //多天分页信息
			dayPage: {
				page: 1,
				num: 10,
				pageNum: 1
			}, //单天分页信息
			status: 1, //订单状态(3:未结账，4 ： 已结账， 6 ： 挂账)
			selectTypeNum: '', //选中的外卖类型
			payTotalNum: {}, //当天或者多天的数据总和
			newpayTotalNum: [], //当天或者多天的数据总和
			paginationList: [], //分页信息
			// showWidth: 1940, //长度
			// cancelledShow: true, //已取消页面的显示内容
			// afterRefundShow: false, //售后退款页面的显示内容
			// afterAmountShow: true, //售后退款页面的入账总额显示内容
			// countList: [{ name: 10 }, { name: 50 }],
			takeawaytypeList: ['全部', '饿了么', '美团', '百度外卖'], //外卖类型
			// takeawaytypeList: [
			// 	{ id: '0', takeawaytypeName: '全部' },
			// 	{ id: '1', takeawaytypeName: '饿了么' },
			// 	{ id: '2', takeawaytypeName: '美团外卖' },
			// 	{ id: '3', takeawaytypeName: '百度外卖' }
			// ], //外卖类型
			exportUrl: 'javascript:void(0);'
			// startObj: {},
			// endObj: {}
		};
	},
	methods: {
		renderHeader(h, { column}) {
			let titleName = '';
			let label = column.label;
			let property = column.property;
			if (label == '商品总数' && property == 'totalNum') {
				titleName =
					'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			} else if (label == '商品数' && property == 'totalNum') {
				titleName =
					'商品数包含了订单中所有的商品数量（包括赠品和退品）';
			} else if (label == '销量' && property == 'goodsNum') {
				titleName =
					'已销售的数量（不包含退品数）公式：商品总数-退品数=销量';
			} else if (label == '优惠总额' && property == 'activityFee') {
				titleName = '该时间段所有的优惠金额总计';
			} else if (label == '优惠金额' && property == 'activityFee') {
				titleName = '该时间段内所有的优惠金额总计';
			} else if (label == '消费总额' && property == 'goodsTotalPrice') {
				titleName = '该时段内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '消费金额' && property == 'goodsTotalPrice') {
				titleName = '所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '入账总额' && property == 'income') {
				titleName =
					'该时间段中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '入账金额' && property == 'income') {
				titleName = '实际收入的金额（不计入未入实账的支付方式的金额）';
			} else {
				// titleName = ''
			}
			return h('div', [
				h('span', {}, column.label),
				h(
					'el-popover',
					{
						attrs: {
							effect: 'dark',
							content: titleName,
							placement: 'bottom',
							width: '300'
						}
					},
					[
						h('span', {
							class: 'el-icon-question',
							slot: 'reference',
							style: 'font-size: 18px;margin-left:5px;'
							// title:"标题",
						})
					]
				)
			]);
		},
		initBtn(flag) {
			let arr = [];
			arr = [
				{
					name: '返回',
					style: {
						backgroundColor: '#fff',
						border: '1px solid #ff8c01',
						color: '#ff8c01'
					},
					fn: () => {
						this.initBtn(true);
						this.returnPage();
					}
				},
				{
					name: '打印',
					style: {
						backgroundColor: '#fff',
						border: '1px solid #20a7dd',
						color: '#20a7dd'
					},
					fn: () => {
						this.printOrderTakeout();
						console.log('2');
					}
				},
				{
					name: '导出',
					style: {},
					fn: () => {
						this.exportOrderTakeaway();
						console.log('3');
					}
				}
			];
			if (flag) arr.shift();
			this.$store.commit('setPageTools', arr);
		},
		//到堂吃订单统计界面
		toOrder: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'order', //外卖的关键表示
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderTakeout', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		toProprietary: function() {
			//去自营外卖
			this.$router.push({
				path: '/admin/orderStatistics/orderProprietary',
				query: this.$route.query
			});
		},
		//点击按营业时间
		selectBusinessHours: function() {
			let isOpenTime = this.isOpenTime;
			this.isOpenTime = !isOpenTime;
		},
		//选择开始时间
		// getStartTime: function(receiveTime) {
		// 	this.newStartTime = receiveTime;
		// 	this.startObj.time = receiveTime;
		// },
		// //选择结束时间
		// getEndTime: function(receiveTime) {
		// 	this.newEndTime = receiveTime;
		// 	this.endObj.time = receiveTime;
		// },
		//时间类别选择
		// showTimeList: function(e) {
		// 	e.stopPropagation();
		// 	this.timeBtn = !this.timeBtn;
		// },
		init: function() {
			this.startTime = new Date(this.startTime).getTime();
			this.endTime = new Date(this.endTime).getTime();
			let startTime = this.startTime;
			let endTime = this.endTime;
			let startYear = utils.format(startTime, 'yyyy'),
				startMonth = utils.format(startTime, 'MM'),
				startDay = utils.format(startTime, 'dd'),
				endYear = utils.format(endTime, 'yyyy'),
				endMonth = utils.format(endTime, 'MM'),
				endDay = utils.format(endTime, 'dd');
			//搜索的若为单天，则直接进入当天的订单统计
			if (
				startYear == endYear &&
				startMonth == endMonth &&
				startDay == endDay
			) {
				this.showDay = true;
				this.showAllDay = false;
				this.takeoutOnedayList(
					startYear + '-' + startMonth + '-' + startDay
				);
				// this.showWidth = 1376;
			} else {
				this.takeoutMultidayList();
				// this.showWidth = 1376;
			}
			// if (this.selectTypeNum == 0) {
			// 	this.allTakeawaytype = '全部';
			// } else if (this.selectTypeNum == 1) {
			// 	this.allTakeawaytype = '饿了么';
			// } else if (this.selectTypeNum == 2) {
			// 	this.allTakeawaytype = '美团外卖';
			// } else if (this.selectTypeNum == 3) {
			// 	this.allTakeawaytype = '百度外卖';
			// }
		},
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误'
				});
				return false;
			}
			this.dayPage.page = 1;
			this.takeoutMultidayList();
		},
		//时间戳转年月日
		timeToday: function(time) {
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		//外卖类型选择
		// showtakeawaytypeList: function(e) {
		// 	e.stopPropagation();
		// 	this.takeawaytypeBtn = !this.takeawaytypeBtn;
		// },
		//转化时间戳，兼容谷歌 IE
		getTime: function(day) {
			let re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(
				day
			);
			return (
				new Date(
					re[1],
					(re[2] || 1) - 1,
					re[3] || 1,
					re[4] || 0,
					re[5] || 0,
					re[6] || 0
				).getTime() / 1000
			);
		},
		//通过多天的查看详情进入当天页面
		openDayDetial: function(time) {
			this.dayPage.page = 1;
			this.initBtn();
			this.status = 1; //进入单天订单默认选择到时已结账
			this.takeoutOnedayList(time);
			this.detailTime = time;
		},
		//切换已结账、未结账、挂账
		getOidList: function(typeNum) {
			this.allDayPage.page = 1;
			this.dayPage.page = 1;
			this.status = typeNum * 1;
			if (this.status == 2) {
				// this.cancelledShow = false;
				// this.afterRefundShow = false;
			} else if (this.status == 3) {
				// this.afterAmountShow = false;
				// this.afterRefundShow = true;
				// this.cancelledShow = true;
			} else {
				// this.afterAmountShow = true;
				// this.cancelledShow = true;
				// this.afterRefundShow = false;
			}
			this.takeoutOnedayList(this.dateTime);
		},
		//重置
		reset: function() {
			if (this.detailTime == null) {
				this.detailTime = utils.format(new Date(), 'yyyy-MM-dd');
			}

			// this.startObj.time = this.newStartTime;
			// this.endObj.time = this.newEndTime;
			this.orderNumber = '';
			this.selectTypeNum = '';
			if (!this.isBrand) {
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.nedTime = new Date().setHours(23, 59, 59, 0);
			}
			if (this.showDay == true) {
				this.takeoutOnedayList(this.detailTime);
			} else if (this.showAllDay == true) {
				this.takeoutMultidayList();
			}
			// this.startObj = utils.deepCopy(this.startObj);
			// this.endObj = utils.deepCopy(this.endObj);
		},
		//外卖类型点击
		selectTakeawayType: function() {
			if (this.detailTime == null) {
				this.detailTime = utils.format(
					new Date(this.startTime),
					'yyyy-MM-dd'
				);
			}
			// this.selectTypeNum = index;
			// this.allTakeawaytype = this.takeawaytypeList[this.selectTypeNum];
			// this.takeawaytypeBtn = false;
			if (this.showDay == true) {
				this.takeoutOnedayList(this.detailTime);
			} else if (this.showAllDay == true) {
				this.takeoutMultidayList();
			}
		},
		//某天的订单数据翻页效果,展示当前页
		//分页点击
		onePageClick: function(e) {
			this.dayPage.page = e;
			this.setPage();
		},
		//每页显示多少条点击
		oneNumChange(e) {
			this.dayPage.num = e;
			this.setPage();
		},
		// getOrderListInDayPage: function(res) {
		// 	this.dayPage.page = res.page - 1;
		// 	this.dayPage.num = res.num;
		// 	this.takeoutOnedayList(this.dateTime);
		// },
		//天数数据翻页效果,展示当前页
		//分页点击
		pageClick: function(e) {
			this.allDayPage.page = e;
			this.setPage();
		},
		//每页显示多少条点击
		numChange(e) {
			this.allDayPage.num = e;
			this.setPage();
		},
		// getOrderListMonPage: function(res) {
		// 	this.allDayPage.page = res.page - 1;
		// 	this.allDayPage.num = res.num;
		// 	this.takeoutMultidayList();
		// },
		//外卖一天列表
		async takeoutOnedayList(time) {
			this.orderNumber = ''; //清空订单号
			this.dateTime = time;
			//进入单天的订单，多天的隐藏，打印-返回也适用
			this.showAllDay = false;
			let startDay =
				time +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				time + ' ' + this.endH + ':' + this.endM + ':' + this.endS;
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = new Date(this.startTime).getTime();
			let newEndTime = new Date(this.endTime).getTime();
			this.newpayTotalNum = [];
			let res = await http.getOrderOneDayStat({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime:
						time == newStarTime
							? this.getTime(startDay)
							: this.getTime(time + ' 00:00:00'),
					endTime:
						time == newEndTime
							? this.getTime(endDay)
							: this.getTime(time + ' 23:59:59'),
					isOpenTime: Number(this.isOpenTime),
					page: this.dayPage.page,
					num: this.dayPage.num, //一页显示多少
					status: this.status + 1,
					type: this.selectTypeNum
				}
			});
			this.payTotalNum = res.total;
			this.payTotalNum.totalDay = 1; //从日期进去，为1天，加上totalDay
			this.payTotalNum.days = 1; //从日期进去，为1天，加上days
			this.newpayTotalNum.push(this.payTotalNum);
			if (res) {
				this.showDay = true;
				let orderList = res.list;
				this.oneDayOrderList = orderList;
			}
			for (let i = 0; i < this.oneDayOrderList.length; i++) {
				if (this.oneDayOrderList[i].type == 1) {
					this.oneDayOrderList[i].takeoutName = '饿了么';
				} else if (this.oneDayOrderList[i].type == 2) {
					this.oneDayOrderList[i].takeoutName = '美团外卖';
				} else if (this.oneDayOrderList[i].type == 3) {
					this.oneDayOrderList[i].takeoutName = '百度外卖';
				}
			}
			this.setPage();
		},
		//外卖多天列表
		async takeoutMultidayList() {
			this.showDay = false;
			this.showAllDay = true;
			this.startTime = new Date(this.startTime).getTime();
			this.endTime = new Date(this.endTime).getTime();
			let startTime = this.startTime;
			let endTime = this.endTime;
			this.startH = utils.format(startTime, 'hh');
			this.startM = utils.format(startTime, 'mm');
			this.startS = utils.format(startTime, 'ss');
			this.endH = utils.format(endTime, 'hh');
			this.endM = utils.format(endTime, 'mm');
			this.endS = utils.format(endTime, 'ss');
			if (
				this.startH * 1 > 0 ||
				this.startM * 1 > 0 ||
				this.startS * 1 ||
				this.endH * 1 < 23 ||
				this.endM * 1 < 59 ||
				this.endS * 1 < 59
			) {
				this.isOpenTime = false;
			}
			this.newpayTotalNum = [];
			let res = await http.getOrderManyDaysStat({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					page: this.allDayPage.page,
					num: this.allDayPage.num,
					type: this.selectTypeNum
				}
			});
			if (res && res.total) {
				this.payTotalNum = res.total;
				this.newpayTotalNum.push(this.payTotalNum);
				this.orderListInDays = res.list;
				this.setPage();
			}
		},
		//外卖订单详情
		async orderDetails(oid) {
			if (oid.orderId != undefined) {
				this.orderNumber = oid.orderId; //为打印使用
			}
			//从后台获取数据
			let res = await http.getOrderDetail({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					oid: oid.orderId ? oid.orderId : oid,
					type: oid.type ? oid.type : this.selectTypeNum,
					brandId: this.brandId
				}
			});
			res.type = oid.type ? oid.type : this.selectTypeNum;
			let dataDetial = {
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderTakeout', dataDetial); //重新赋值一下时间，返回时用
			storage.session('takeawayDetail', res);
			this.$router.push({
				path: '/admin/orderStatistics/takeawayDetail',
				query: this.$route.query
			});
		},
		//外卖打印
		async printOrderTakeout() {
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//打印一个月以内的订单
			let startDay =
				this.dateTime +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				this.dateTime +
				' ' +
				this.endH +
				':' +
				this.endM +
				':' +
				this.endS;
			let printTotal = {};
			printTotal = this.payTotalNum;
			if (!this.showDay && !this.showDayAllDetail) {
				printTotal.startTime = parseInt(this.startTime / 1000);
				printTotal.endTime = parseInt(this.endTime / 1000);
				if (this.orderListInDays.length == 0) {
					this.$store.commit('setWin', {
						content: '没有订单可以打印'
					});
					return false;
				}
				let timer = 3 * 31 * 24 * 60 * 60 * 1000;
				if (this.endTime - this.startTime > timer) {
					this.$store.commit('setWin', {
						content: '最大只能查询三个月时间'
					});
					return false;
				} else if (
					parseInt(this.startTime / 1000) -
						parseInt(this.endTime / 1000) >
					0
				) {
					this.$store.commit('setWin', {
						content: '时间选择错误'
					});
					return false;
				}
				await http.printOrderStat({
					data: {
						shopId: this.dataDetial
							? this.dataDetial.itemDetial.shopId
							: this.shopId,
						printData: JSON.stringify(printTotal)
					}
				});
				this.$store.commit('setWin', {
					content: '打印数据已发送！'
				});
			} else if (this.showDay && !this.showDayAllDetail) {
				printTotal.startTime =
					this.dateTime == newStarTime
						? this.getTime(startDay)
						: this.getTime(this.dateTime + ' 00:00:00');
				printTotal.endTime =
					this.dateTime == newEndTime
						? this.getTime(endDay)
						: this.getTime(this.dateTime + ' 23:59:59');
				//打印一天内所有的订单
				await http.printOrderStat({
					data: {
						shopId: this.dataDetial
							? this.dataDetial.itemDetial.shopId
							: this.shopId,
						printData: JSON.stringify(printTotal)
					}
				});
				this.$store.commit('setWin', {
					content: '打印数据已发送！'
				});
			}
		},
		//外卖导出
		async exportOrderTakeaway() {
			let startDay =
				this.dateTime +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				this.dateTime +
				' ' +
				this.endH +
				':' +
				this.endM +
				':' +
				this.endS;
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = new Date(this.startTime);
			let newEndTime = new Date(this.endTime);
			if (this.selectTypeNum == '') {
				this.selectTypeNum = 0;
			}

			//导出一个月的所有订单
			if (!this.showDay && !this.showDayAllDetail) {
				if (this.orderListInDays.length == 0) {
					this.exportUrl = 'javascript:void 0';
					this.$store.commit('setWin', {
						content: '没有订单可以导出'
					});
					return false;
				}
				let timer = 3 * 31 * 24 * 60 * 60 * 1000;
				if (this.endTime - this.startTime > timer) {
					this.$store.commit('setWin', {
						content: '最大只能查询三个月时间'
					});
					return false;
				} else if (
					parseInt(this.startTime / 1000) -
						parseInt(this.endTime / 1000) >
					0
				) {
					this.$store.commit('setWin', {
						content: '时间选择错误'
					});
					return false;
				}
				this.exportUrl = await http.exportOrderStat({
					data: {
						trueShopId: this.dataDetial
							? this.dataDetial.itemDetial.shopId
							: this.shopId,
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						isOpenTime: Number(this.isOpenTime),
						exportType: 1,
						type: this.selectTypeNum,
						status: 0,
						format: 'csv'
					}
				});
			} else if (this.showDay && !this.showDayAllDetail) {
				//导出一个月的某天的订单
				// let timeArr = this.dateTime.split('-');
				if (this.oneDayOrderList.length != 0) {
					this.exportUrl = await http.exportOrderStat({
						data: {
							trueShopId: this.dataDetial
								? this.dataDetial.itemDetial.shopId
								: this.shopId,
							startTime:
								this.dateTime == newStarTime
									? this.getTime(startDay)
									: this.getTime(this.dateTime + ' 00:00:00'),
							endTime:
								this.dateTime == newEndTime
									? this.getTime(endDay)
									: this.getTime(this.dateTime + ' 23:59:59'),
							isOpenTime: Number(this.isOpenTime),
							exportType: 2,
							type: this.selectTypeNum,
							status: this.status + 1,
							format: 'csv'
						}
					});
				} else {
					this.exportUrl = 'javascript:void 0';
					this.$store.commit('setWin', {
						content: '没有订单可以导出'
					});
					return false;
				}
			}
		},
		//通过订单查询
		getInfoByOrder: function() {
			let onum = this.orderNumber;
			let regNum = /\d+/g;
			if (onum == null || onum == undefined || onum == '') {
				this.$store.commit('setWin', {
					content: '请输入订单号码!'
				});
				return false;
			}
			let newOnum = onum.split('');
			if (newOnum.length < 10 || !regNum.test(onum)) {
				this.$store.commit('setWin', {
					content: '请输入正确订单号码!'
				});
				return false;
			}
			// if (this.allTakeawaytype == '请选择类型') {
			// 	this.$store.commit('setWin', {
			// 		content: '请选择外卖类型!'
			// 	});
			// 	return;
			// }
			if (this.selectTypeNum == '' || this.selectTypeNum == 0) {
				this.$store.commit('setWin', {
					content: '请选择外卖类型!'
				});
				return;
			}
			this.orderDetails(onum);
		},
		//点击返回按钮
		returnPage: function() {
			//从单天订单列表返回
			if (this.showDay && !this.showDayAllDetail) {
				this.showAllDay = true;
				this.showDay = false;
				this.takeoutMultidayList();
				return;
			}
			if (!this.showDay && this.showAllDay) {
				this.returnBrand();
			}
		},
		//点击返回按钮,返回品牌
		returnBrand: function() {
			storage.session('brandorderDetial', this.dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics/takeawayBrand',
				query: this.$route.query
			});
			return;
		},
		setPage: function() {
			if (this.showDay == true) {
				this.dayPage.pageNum = Math.ceil(
					this.oneDayOrderList.length / this.dayPage.num
				);
				let pageStart = (this.dayPage.page - 1) * this.dayPage.num;
				let pageEnd = this.dayPage.page * this.dayPage.num;
				let pageContent = this.oneDayOrderList.slice(
					pageStart,
					pageEnd
				);
				this.paginationList = pageContent;
			} else if (this.showAllDay == true) {
				this.allDayPage.pageNum = Math.ceil(
					this.orderListInDays.length / this.allDayPage.num
				);
				let pageStart =
					(this.allDayPage.page - 1) * this.allDayPage.num;
				let pageEnd = this.allDayPage.page * this.allDayPage.num;
				let pageContent = this.orderListInDays.slice(
					pageStart,
					pageEnd
				);
				this.paginationList = pageContent;
			}
		}
	},
	mounted() {
		let userData = storage.session('userShop');
		let brandId;
		// let token;
		let shopId;
		if (userData.currentShop.brandId) {
			brandId = userData.currentShop.brandId;
		} else {
			brandId = 0;
		}
		if (userData && userData.accessToken && userData.currentShop) {
			// token = userData.accessToken;
			shopId = userData.currentShop.id;
		}
		let orderTakeaway = storage.session('orderTakeout');
		let dataDetial = storage.session('brandDetial'); //从品牌进入传递的数据
		this.startTime = dataDetial
			? dataDetial.startTime
			: orderTakeaway
				? orderTakeaway.startTime
				: new Date().setHours(0, 0, 0, 0);
		this.endTime = dataDetial
			? dataDetial.endTime
			: orderTakeaway
				? orderTakeaway.endTime
				: new Date().setHours(23, 59, 59, 999);
		// this.newStartTime = dataDetial
		// 	? dataDetial.startTime
		// 	: orderTakeaway
		// 		? orderTakeaway.startTime
		// 		: new Date().setHours(0, 0, 0, 0);
		// this.newEndTime = dataDetial
		// 	? dataDetial.endTime
		// 	: orderTakeaway
		// 		? orderTakeaway.endTime
		// 		: new Date().setHours(23, 59, 59, 999);
		this.isOpenTime = dataDetial
			? dataDetial.isOpenTime
			: orderTakeaway ? orderTakeaway.isOpenTime : true;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.dataDetial = dataDetial;
		this.selectTypeNum = dataDetial ? dataDetial.type : null;
		this.brandId = brandId;
		this.shopId = shopId;
		// this.startObj = { time: this.startTime };
		// this.endObj = { time: this.endTime };
		this.initBtn(!this.isBrand);
		this.init(); //获取当前时间段内的所有数据
		sessionStorage.removeItem('orderTakeout');
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
		// calendar: () =>
		// 	import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		// detailsDes: () =>
		// 	import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>
<style lang="less" scoped>
// .table-container {
// 	margin-top: 15px;
// 	overflow: auto;
// 	border: 1px solid #d2d2d2;
// 	box-shadow: 7px 7px 15px #ccc;
// 	position: relative;
// 	overflow-y: hidden;
// 	max-width: 1628px;
// }

.oShopDel {
	height: 40px;
	line-height: 40px;
	float: left;
	font-size: 16px;
}

// .order-order-data {
// 	height: auto;
// 	display: inline-block;
// }

// .order-order-data ul li {
// 	float: left;
// 	margin-right: 20px;
// 	height: 46px;
// }

// .order-order-data ul li span input {
// 	width: 174px;
// 	height: 41px;
// 	text-align: center;
// 	border: 1px solid #b3b3b3;
// 	float: left;
// }

// .order-order-searchA {
// 	display: inline-block;
// 	float: left;
// 	width: 41px;
// 	height: 41px;
// 	font-size: 20px;
// 	padding-top: 10px;
// 	color: #fff;
// 	background-color: #29a7e1;
// 	cursor: pointer;
// }

// .order-order-searchA:hover {
// 	background-color: #1878a5;
// 	transition: background-color ease-in-out 0.2s;
// }

// .order-order-searchA:active {
// 	background-color: #154961;
// }

// .order-operation {
// 	position: absolute;
// 	right: 60px;
// 	top: 10px;
// 	z-index: 2;
// 	width: 400px;
// 	height: 44px;
// }

// .order-operation div {
// 	display: inline-block;
// 	width: 100px;
// 	height: 40px;
// 	float: right;
// 	margin-left: 10px;
// 	line-height: 38px;
// 	text-align: center;
// }

// .calendar {
// 	width: 256px;
// }

// .width70 {
// 	width: 70px;
// }

// .width80 {
// 	width: 120px;
// }

// .width100 {
// 	width: 100px;
// }

// .width110 {
// 	width: 130px;
// }

// .width150 {
// 	width: 150px;
// }

// .width160 {
// 	width: 170px;
// }

// .width200 {
// 	width: 200px;
// }

// .width210 {
// 	width: 220px;
// }

// .cancelback80 {
// 	width: 120px;
// 	position: relative;
// 	cursor: pointer;
// }

// .cancelback110 {
// 	width: 130px;
// 	position: relative;
// 	cursor: pointer;
// }

// .cancel {
// 	width: 210px;
// 	position: relative;
// 	cursor: pointer;
// }

#statistics-order .statisticsList {
	position: relative;
	line-height: 41px;
}

#statistics-order .statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#statistics-order .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#statistics-order .overHid {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#statistics-order .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}

#statistics-order .staList {
	position: relative;
	line-height: 41px;
	width: 143px;
}

.button a {
	display: inline-block;
	width: 100px;
	height: 40px;
	color: orange;
	text-align: center;
	line-height: 40px;
	border: 1px solid orange;
}

.button a.select {
	background: orange;
	color: #fff;
}
</style>