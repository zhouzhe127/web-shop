<template>
	<div id="statistics-order" v-cloak>
		<div class="button">
			<a href="javascript:void(0);" class="select">堂吃</a>
			<a v-on:click="toTakeout" id="returncolor" href="javascript:void(0);">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<section v-if="isBrand" style="width:100%;overflow: hidden;">
			<section style="width: 80px;height: 40px;line-height: 40px;float: left;font-size: 16px;">选择店铺：</section>
			<section style="height: 40px;line-height: 40px;float: left;margin:0 5px;font-size: 16px;">{{dataDetial.itemDetial.shopName}} |</section>
			<section style="width: 80px;height: 40px;line-height: 40px;float: left;font-size: 16px;">选择时间：</section>
			<section style="height: 40px;line-height: 40px;float: left;font-size: 16px;">{{timeToday(startTime)}}--{{timeToday(endTime)}}</section>
		</section>
		<!--总览订单页面显示日期-->
		<div class="order-order-data" style="margin:15px 0 ;">
			<ul style="height: auto;">
				<li v-if="!isBrand">
					<!--日期选择和搜索框-->
					<section class="statisticsList fl">
						<section class="tableListInp">
							<calendar :pObj="startObj" @throwTime="getStartTime" style="width: 245px;height: 41px;float: left;"></calendar>
						</section>
					</section>
					<span style="float: left; width: 25px;line-height: 40px;text-align: center;">至</span>
					<section class="statisticsList fl">
						<section class="tableListInp">
							<calendar :pObj="endObj" @throwTime="getEndTime" style="width: 245px;height: 41px;float: left;"></calendar>
						</section>
					</section>
					<span class="order-order-searchA" style="margin-right:15px;">
						<span v-on:click="sreachOrderInDays" class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</li>
				<li v-if="!isBrand" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li>
				<li v-if="!isBrand">
					<span>
						<input type="text" placeholder="请输入订单号" v-model="orderNumber" maxlength="18" style="height: 40px;line-height: 40px;" />
						<a class="order-order-searchA" v-on:click="getInfoByOrder">
							<span class="order-order-search"></span>
						</a>
					</span>
				</li>
				<li v-if="isBrand">
					<input type="text" v-model="orderNumber" maxlength="18" placeholder="请输入订单号" style="width:170px;height: 40px;line-height: 40px;float: left;padding-left: 10px;" />
					<a class="order-order-searchA" v-on:click="getInfoByOrder">
						<span class="order-order-search"></span>
					</a>
				</li>
			</ul>
		</div>
		<div class="table-container">
			<section style="height: auto;position: relative;border:1px solid #d2d2d2;box-shadow: 7px 7px 15px #ccc; ">
				<div class="aLeft">
					<ul class="aUl" style="background-color: #f2f2f2;">
						<li class="aLi" style="width: 100px;"></li>
						<li class="aLi" style="width: 150px;">天数</li>
					</ul>
					<ul class="aUl" style="background-color: #ffffff;">
						<li class="aLi" style="width: 100px;"></li>
						<li class="aLi" style="color: #F8941F;width:150px;">{{payTotalNum.totalDay}}</li>
					</ul>
					<div>
						<!--时间段里所有订单列表显示 start-->
						<section style="width:100%;overflow: auto;margin-top:30px;">
							<div style="width:100%;height:50px;text-align: center;line-height: 50px;border-top: 1px solid #d2d2d2;">订单统计·共
								<span style="color: red;">{{orderListInDays.length}}</span>条记录</div>
							<ul class="aUl" style="background-color: #f2f2f2;">
								<li class="aLi" style="width: 100px;">操作</li>
								<li class="aLi" style="width: 150px;">日期</li>
							</ul>
							<template v-if="orderListInDays.length > 0 " v-for='(item,index) in orderListInDays'>
								<ul class="aUl" style="background: #ffffff;border-bottom:1px solid #d2d2d2 ;" :key="index">
									<li class="width100">
										<a v-on:click="openDayDetial(item.date)" href="javascript:void(0);" style="width: 100%;color: #23b4e9;">查看详情</a>
									</li>
									<li class="width150">{{item.date}}</li>
								</ul>
							</template>
							<template v-if="orderListInDays.length == 0">
								<ul class="" style="background-color: #fff;">
									<li class="width100"></li>
									<li class="width150"></li>
								</ul>
							</template>
						</section>
					</div>
				</div>
				<div class="aRight" style="height: auto;padding-left: 250px;overflow: auto;">
					<section v-bind:style="{width:showWidth + 'px'}">
						<ul class="aUl" style="background-color: #f2f2f2;">
							<li class="width70">订单数</li>
							<li class="width70">人数</li>
							<li class="width100 detLi">商品总数
								<detailsDes :title="'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
							</li>
							<li class="width70 detLi">销量
								<detailsDes :title="'该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
							</li>
							<li class="width70">退品数</li>
							<li class="width100">退品总额</li>
							<li v-on:click="openDiscount(payTotalNum)" class="width100 detLi">优惠总额
								<img class="detImg" src="../../res/icon/discount_all.png" />
							</li>
							<li class="width100">利润</li>
							<template v-if='payLsZero'>
								<template v-for='item in allPayList'>
									<li class="width100 overHid" v-if="!isZero(item.id)" :key="item.id">{{item.paymentName}}</li>
								</template>
							</template>
							<li class="width100">找零</li>
							<li class="width100">系统取整</li>
							<!--营业额-->
							<li v-if="status !== 3" class="width100 detLi">消费总额
								<detailsDes :title="'该时段内所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
							</li>
							<li class="width100 ">实收总额</li>
							<li v-if="status == 3 && payTotalNum && payTotalNum.waitPrice*1 != 0" class="width100">未结账金额</li>
							<li class="width100 detLi">入账总额
								<detailsDes :title="'该时间段中实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
							</li>
							<li class="width100 detLi">会员充值
								<detailsDes :title="'该时段内会员充值总计(不计入消费总额及入账总额中)'"></detailsDes>
							</li>
							<li class="width100 detLi">挂账结清金额
								<!-- <detailsDes :title="'该时段内会员充值总计(不计入消费总额及入账总额中)'"></detailsDes> -->
							</li>
						</ul>
						<!--取出总计数组里面的数据-->
						<ul style="color: #333333;overflow: hidden;width:100%;background: #ffffff;" class="order-content-show">
							<li style="color: #F8941F;" class="width70">{{payTotalNum.orderNum}}</li>
							<li style="color: #F8941F;" class="width70">{{payTotalNum.person}}</li>
							<li style="color: #F8941F;" class="width100">{{payTotalNum.goodsTotalNum}}</li>
							<li style="color: #F8941F;" class="width70">{{payTotalNum.salesNum}}</li>
							<li style="color: #F8941F;" class="width70">{{payTotalNum.returnNum}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.returnPrice).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.discount).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.profit).toFixed(2)}}</li>
							<template v-if='payLsZero'>
								<template v-for='item in payTotalNum.paymentList'>
									<li style="color: #F8941F;" class="width100" v-if="!isZero(item.id)" :key="item.id">{{parseFloat(item.num).toFixed(2)}}</li>
								</template>
							</template>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.change).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.bitPrice).toFixed(2)}}</li>
							<li v-if="status !== 3" style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.originalPrice).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.waitPrice).toFixed(2)}}</li>
							<li v-if="status == 3 && payTotalNum && payTotalNum.waitPrice*1 != 0" style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.waitPrice).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.paymentPrice).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.memberRecharge).toFixed(2)}}</li>
							<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.settlePrice).toFixed(2)}}</li>
						</ul>
					</section>
					<!--总的列表-->
					<div v-bind:style="{width:showWidth + 'px'}">
						<section style="width:100%;overflow: auto;margin-top:30px;">
							<div style="width:100%;height:50px;border-top: 1px solid #d2d2d2;"></div>
							<!--时间段里所有订单列表显示 start-->
							<ul style="background-color: #f2f2f2;">
								<li class="width70">订单数</li>
								<li class="width70">人数</li>
								<!--商品数量-->
								<li class="width100 detLi">商品总数
									<detailsDes :title="'该日商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
								</li>
								<!--销量-->
								<li class="width70 detLi">销量
									<detailsDes :title="'该日已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
								</li>
								<li class="width70">赠品数</li>
								<li class="width100">赠品金额</li>
								<li class="width70">退品数</li>
								<li class="width100">退品金额</li>
								<!--优惠金额-->
								<li class="width100 detLi">优惠总额
									<detailsDes :title="'该日所有的优惠金额总计'"></detailsDes>
								</li>
								<li class="width100">利润</li>
								<template v-if='payLsZero'>
									<template v-for='item in allPayList'>
										<li class="width100 overHid" v-if="!isZero(item.id)" :key="item.id">{{item.paymentName}}</li>
									</template>
								</template>
								<li class="width100">找零</li>
								<li class="width100">系统取整</li>
								<!--消费金额-->
								<li class="width100 detLi">消费金额
									<detailsDes :title="'该日所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
								</li>
								<li class="width100">实收金额</li>
								<li class="width100 detLi">入账金额
									<detailsDes :title="'该日实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
								</li>
								<li class="width100 detLi">挂账结清金额
									<!-- <detailsDes :title="'该时段内会员充值总计(不计入消费总额及入账总额中)'"></detailsDes> -->
								</li>
							</ul>
							<!--订单列表存在数据就显示-->
							<template v-if="orderListInDays.length > 0 ">
								<template v-for='(item,index) in orderListInDays'>
									<ul :key="index" style="overflow: hidden;width:100%;background: #ffffff;border-bottom: 1px solid #d2d2d2;">
										<li class="width70">{{item.orderNum}}</li>
										<li class="width70">{{item.person}}</li>
										<li class="width100">{{item.goodsTotalNum}}</li>
										<li class="width70">{{item.salesNum}}</li>
										<li class="width70">{{item.freeNum}}</li>
										<li class="width100">{{parseFloat(item.freePrice).toFixed(2)}}</li>
										<li class="width70">{{item.returnNum}}</li>
										<li class="width100">{{parseFloat(item.returnPrice).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.discount).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.profit).toFixed(2)}}</li>
										<template v-if='payLsZero'>
											<template v-for='pay in item.paymentList'>
												<li class="width100" :key="pay.id" v-if="!isZero(pay.id)">{{parseFloat(pay.num).toFixed(2)}}</li>
											</template>
										</template>
										<li class="width100">{{parseFloat(item.change).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.bitPrice ).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.originalPrice).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.waitPrice).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.paymentPrice).toFixed(2)}}</li>
										<li class="width100">{{parseFloat(item.settlePrice).toFixed(2)}}</li>
									</ul>
								</template>
							</template>
							<ul v-else style="width:100%;height: 50px;">
								<li style="color:orange; text-align:left;width: 100%;padding-left:200px ;">该时间段并没有订单数据</li>
							</ul>
						</section>
					</div>
					<!--显示当天的所有订单 end-->
				</div>
			</section>
		</div>
		<!--分页-->
		<div>
		</div>
		<div style="float: left;margin-left: 30px;margin-top:20px;">
			<pageElement @pageNum="getOrderListMonPage" :page="allDayPage.page+1" :total="allDayPage.pageNum" :num="allDayPage.num" :isNoJump='true'></pageElement>
		</div>
		<!-- <div class="order-operation">
			<div style="">
				<a v-on:click='exportOrder($event)' :href="exportUrl" class="blue" style="width:100px;text-align: center;height: 40px;line-height: 40px;">导出</a>
			</div>
			<div v-if="!isBrand" v-on:click='printOrder()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
			<div v-if="isBrand" class="return" v-on:click='returnBrand()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
		</div>   -->
		<order-win :payTotalNum="payTotalNum" :title="title" v-if="preferentialBounced" @toClick="whetherToclick"></order-win>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			userData: {},
			dataDetial: {},
			orderMore: {},
			titleDetial: {},
			order: {},
			shopId: '',
			isBrand: '', //品牌判断
			startTime: '', //日期组件的开始时间
			endTime: '', //日期组件的结束时间
			newStartTime: '', //点击日历组件获取的开始时间
			newEndTime: '', //点击日历组件获取的结束时间
			allDayPage: {
				page: 0,
				num: 10,
				pageNum: 1
			}, //多天分页信息
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			orderNumber: null, //订单号
			payTotalNum: {}, //当天或者多天的数据总和
			orderListInDays: [], //时间段内每天的订单列表
			showWidth: 2040, //长度

			payLsZero: false, //所有的支付方式是否显示
			status: 4, //订单状态(3:未结账，4 ： 已结账， 6 ： 挂账)
			exportUrl: 'javascript:void(0);',
			isZeroPays: [], //支付方式和为0的列表
			preferentialBounced: false, //优惠弹框
			title: null, //优惠详情的弹框标题
			startObj: {},
			endObj: {}
		};
	},
	methods: {
		initBtn(flag) {
			let arr = [];
			if (!flag) {
				arr = [
					{
						name: '返回',
						style: {
							backgroundColor: '#fff',
							border: '1px solid #ff8c01',
							color: '#ff8c01'
						},
						fn: () => {
							this.returnBrand();
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
							this.printOrder();
						}
					},
					{
						name: '导出',
						style: {},
						fn: () => {
							this.exportOrder();
						}
					}
				];
			}
			if (!this.isBrand) arr.splice(0, 1);//非品牌进入，去掉返回
			if (this.isBrand) arr.splice(1, 1);//品牌进入，去掉打印
			this.$store.commit('setPageTools', arr);
		},
		//到外卖界面
		toTakeout: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'takeout', //外卖的关键表示
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderTakeout', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
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
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.newStartTime = receiveTime;
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.newEndTime = receiveTime;
		},
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
		//时间戳转年月日
		timeToday: function(time) {
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.newEndTime - this.newStartTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				return false;
			} else if (
				parseInt(this.newStartTime / 1000) -
					parseInt(this.newEndTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误!'
				});
				return false;
			}
			this.startTime = this.newStartTime;
			this.endTime = this.newEndTime;
			this.allDayPage.page = 0; //搜索日期按钮，页数为0
			this.getOrderListInDays();
			this.isZero();
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//通过订单查询
		getInfoByOrder: function() {
			let onum = this.orderNumber;
			let regNum = /\d+/g;
			if (onum == null || onum == undefined || onum == '') {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请输入订单号码!'
				});
				return false;
			}
			let newOnum = onum.split('');
			if (newOnum.length < 18 || !regNum.test(onum)) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请输入正确的订单号!'
				});
				return false;
			}
			this.getOrderDetailInfo(onum);
		},
		//点击查看某天某一个的数据详情
		async getOrderDetailInfo(oid) {
			let res = await http.billDelite({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					oid: oid
				}
			});
			res.oidDetial = 'order-more'; //自定义商品统计特有标记
			res.titleDetial = {
				// shopDetialFade: shopDetialFade, //保存品牌进入单店的数据，返回品牌时用到
				// shopId : shopDetialFade ? shopDetialFade.shopId : userData.currentShop.id,//保存品牌下进来的门店id
				startTime: this.startTime,
				endTime: this.endTime,
				dayPage: this.dayPage,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderDetial', res);
			this.$router.push({
				path: '/admin/orderStatistics/orderDetail',
				query: this.$route.query
			});
		},
		//获取时间段内 订单列表
		async getOrderListInDays() {
			let startTime =
				this.throwTime == null
					? new Date(this.startTime)
					: new Date(this.throwTime);
			let endTime =
				this.throwTime == null
					? new Date(this.endTime)
					: new Date(this.throwTime);
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
			let res = await http.more({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					page: this.allDayPage.page + 1,
					num: this.allDayPage.num
				}
			});
			let ArrZero = [];
			let ArrAllPayList = [];
			let ArrNoZero = [];
			if (res && res.total && res.total.paymentList) {
				this.payTotalNum = res.total;
				this.allDayPage.pageNum = res.pageNum;
				this.orderListInDays = res.list;
				//对支付方式为0的进行操作
				let arr = res.total.paymentList;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].num == 0) {
						ArrZero.push(arr[i].id);
						ArrAllPayList.push(arr[i]);
					} else if (arr[i].num > 0) {
						ArrNoZero.push(arr[i]);
						this.payLsZero = true;
					}
				}
				this.isZeroPays = ArrZero;
				this.allPayList = ArrNoZero;
				this.showWidth = ArrNoZero.length * 100 + 1520;
			}
		},
		//对支付金额为0的支付方式做处理
		isZero: function(id) {
			let arr = this.isZeroPays;
			let obj = {};
			for (let i = 0; i < arr.length; i++) {
				if (!obj[arr[i]]) {
					obj[arr[i]] = '110';
				}
			}
			if (obj[id]) {
				return true;
			} else {
				return false;
			}
		},
		//打开优惠详情
		openDiscount: function() {
			if (this.payTotalNum.discountList == null) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有优惠信息!'
				});
				return false;
			}
			if (
				this.payTotalNum.discountList.coupon.length == 0 &&
				this.payTotalNum.discountList.order.length == 0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有优惠信息!'
				});
				return false;
			}
			this.preferentialBounced = true;
			this.title = '优惠详情';
		},
		whetherToclick: function(res) {
			if (res) {
				this.preferentialBounced = false;
			}
		},
		//获得所有的支付方式
		async getAllPayList() {
			let res = await http.getCondition({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId
				}
			});
			this.allPayList = res.paymentList;
		},
		init: function() {
			//如果存在从品牌进入、单天返回则请求多天接口，else进行时间判断
			if (
				this.orderMore ||
				this.dataDetial ||
				this.order ||
				this.titleDetial
			) {
				this.getOrderListInDays();
			} else {
				let startTime = new Date(this.startTime);
				let endTime = new Date(this.endTime);

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
					let detial = {}; //要传的数据
					detial = {
						name: 'order-one', //外卖的关键表示
						day: startYear + '-' + startMonth + '-' + startDay, //日期，注意---和从查看详情进入传的值不一样
						startTime: this.startTime,
						endTime: this.endTime,
						isOpenTime: this.isOpenTime,
						allDayPage: this.allDayPage //多天分页信息
					};
					storage.session('orderOne', detial);
					// global.orderData.orderOne = detial;
					this.$router.push({
						path: '/admin/orderStatistics/orderOne',
						query: this.$route.query
					});
				}
			}
		},
		//打印订单
		async printOrder() {
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以打印!'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误!'
				});
				return false;
			}
			await http.printMore({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime)
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送!'
			});
		},
		//导出订单
		async exportOrder() {
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出!'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误!'
				});
				return false;
			}
			// let startDay =
			// 	this.dateTime +
			// 	' ' +
			// 	this.startH +
			// 	':' +
			// 	this.startM +
			// 	':' +
			// 	this.startS;
			// let endDay =
			// 	this.dateTime +
			// 	' ' +
			// 	this.endH +
			// 	':' +
			// 	this.endM +
			// 	':' +
			// 	this.endS;
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			// let newStarTime = utils.format(
			// 	new Date(this.startTime),
			// 	'yyyy-MM-dd'
			// );
			// let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//导出一个月的所有订单
			this.exportUrl = await http.exportMoreDayOrder({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime)
				}
			});
		},
		//天数数据翻页效果,展示当前页
		getOrderListMonPage: function(res) {
			this.allDayPage.num = res.num;
			this.allDayPage.page = res.page - 1;
			this.getOrderListInDays();
		},
		//通过多天的查看详情进入当天页面
		openDayDetial: function(time) {
			this.getOrderListInDay(time);
		},
		//点击查看某天的数据
		getOrderListInDay: function(time) {
			let detial = {}; //要传的数据
			detial = {
				name: 'order-one', //外卖的关键表示
				day: time, //日期
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime,
				allDayPage: this.allDayPage //多天分页信息
			};
			this.$route.query.arear = 1;
			storage.session('orderOne', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderOne',
				query: this.$route.query
			});
		},
		//从多日返回品牌订单
		returnBrand: function() {
			storage.session('brandorderDetial', this.dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics',
				query: this.$route.query
			});
			setTimeout(function() {
				storage.session('brandorderDetial', '');
			}, 500);
		}
	},
	beforeDestroy() {
		this.initBtn(true);
	},
	mounted() {
		let userData = storage.session('userShop');
		// let token;
		let shopId;
		if (userData && userData.accessToken && userData.currentShop) {
			// token = userData.accessToken;
			shopId = userData.currentShop.id;
		}

		let startTime = new Date().setHours(0, 0, 0, 0);
		let endTime = new Date().setHours(23, 59, 59, 999);
		let isOpenTime = true;
		let allDayPage = {
			page: 0,
			num: 10,
			pageNum: 1
		};
		let order = storage.session('orderTakeout'); //从外卖返回传递的数据
		let orderMore = storage.session('orderMore'); //从单天返回传递的数据
		let dataDetial = storage.session('brandDetial'); //从品牌进入传递的数据
		let titleDetial = storage.session('titleDetial'); //订单详情返回的信息
		// let isbrandJoin = false;
		// if (dataDetial) {
		// 	//是否从品牌进入的
		// 	isbrandJoin = dataDetial.isbrandJoin;
		// }
		//若从品牌进入再切换单店则清除缓存
		if (userData.currentShop.ischain !== '3') {
			dataDetial = '';
			storage.session('brandDetial', '');
		}
		if (orderMore) {
			//单天返回
			startTime = orderMore.startTime;
			endTime = orderMore.endTime;
			isOpenTime = orderMore.isOpenTime;
			allDayPage = orderMore.allDayPage;
		} else if (dataDetial) {
			//品牌进入返回
			startTime = dataDetial.startTime;
			endTime = dataDetial.endTime;
			isOpenTime = dataDetial.isOpenTime;
		} else if (order) {
			//外卖返回
			startTime = order.startTime;
			endTime = order.endTime;
			isOpenTime = order.isOpenTime;
		} else if (titleDetial) {
			//详情返回
			startTime = titleDetial.startTime;
			endTime = titleDetial.endTime;
			isOpenTime = titleDetial.isOpenTime;
		}
		this.startTime = startTime;
		this.endTime = endTime;
		this.newStartTime = startTime;
		this.newEndTime = endTime;
		this.isOpenTime = isOpenTime;
		this.dataDetial = dataDetial;
		this.orderMore = orderMore;
		this.titleDetial = titleDetial;
		this.order = order;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.allDayPage = allDayPage;
		this.shopId = shopId;
		this.startObj = { time: this.startTime };
		this.endObj = { time: this.endTime };
		// this.getAllPayList(); //获取所有的支付方式
		console.log('走了多日界面');
		this.init(); //获取当前时间段内的所有数据
		sessionStorage.removeItem('orderTakeout');
		sessionStorage.removeItem('orderMore');
		sessionStorage.removeItem('titleDetial');
		this.initBtn();
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		orderWin: () =>
			import(/*webpackChunkName: "order_win"*/ 'src/module/statistics/order_win'),
		detailsDes: () =>
			import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>
<style lang="less" scoped>
.table-container {
	overflow: auto;
}

.order-order-data {
	display: inline-block;
}

.order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 46px;
}

.order-order-data ul li span input {
	width: 174px;
	height: 43px;
	text-align: center;
	border: 1px solid #b3b3b3;
	float: left;
}

.order-order-searchA,
.order-order-search {
	display: inline-block;
	// float: left;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
}

.order-order-search {
	background: url(../../res/images/search.png) center center no-repeat;
}

.order-order-searchA:hover {
	background-color: #1878a5;
	transition: background-color ease-in-out 0.2s;
}

.order-order-searchA:active {
	background-color: #154961;
}

.detLi {
	position: relative;
	cursor: pointer;
}

.detLi .detImg {
	position: absolute;
	right: 0px;
	top: 15px;
}

.detLi .detDiv {
	width: 250px;
	height: 80px;
	position: absolute;
	top: 45px;
	right: 0;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 9;
	background-color: #45404b;
}

.detLi .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: -10px;
	right: 20px;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #e6e6e6 #e6e6e6 #45404b #e6e6e6;
}

.detLi .detDiv .detH3 {
	height: 30px;
	line-height: 30px;
	color: #818181;
	text-align: left;
	color: #e6e6e7;
}

.order-operation {
	position: absolute;
	right: 60px;
	top: 10px;
	z-index: 2;
	width: 400px;
	height: 44px;
}

.order-operation div {
	display: inline-block;
	width: 100px;
	height: 40px;
	// float: right;
	margin-left: 10px;
	line-height: 38px;
	text-align: center;
}

.statistics-order {
	width: 100%;
	overflow-y: auto;
	height: auto;
}

.width70 {
	width: 70px;
}

.width100 {
	width: 100px;
}

.width150 {
	width: 150px;
}

.width200 {
	width: 200px;
}

#statistics-order .tableListInp {
	color: #666666;
	height: 43px;
	cursor: pointer;
	box-sizing: border-box;
}

#statistics-order .tableListInp div {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
	/*border: #b3b3b3 solid 1px; */
}

#statistics-order .tableListInp div i {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}

#statistics-order .statisticsList {
	position: relative;
	line-height: 41px;
}

#statistics-order .statisticsList input {
	text-align: center;
	display: block;
	float: left;
	height: 41px;
	width: 158px;
	outline: none;
	border: 0;
}

.tableName {
	width: 47px;
	height: 40px;
	line-height: 40px;
	float: left;
	font-size: 16px;
	text-align: center;
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

.order-paging {
	width: auto;
	height: 45px;
	margin-top: 40px;
	margin-bottom: 50px;
	float: right;
}

.paging-infor {
	width: 160px;
	height: 45px;
	line-height: 45px;
	float: left;
}

.paging-infor span {
	float: left;
}

.paging-box {
	position: relative;
}

.paging-box select {
	width: 50px;
	height: 35px;
	font-size: 18px;
	margin: 5px;
	cursor: pointer;
	float: left;
}

.aLeft {
	width: 250px;
	height: auto;
	float: left;
	position: absolute;
	left: 0;
	z-index: 3;
	background-color: #fff;
}

ul {
	color: #333333;
	width: 100%;
	height: 60px;
}

ul li {
	float: left;
	height: 60px;
	text-align: center;
	line-height: 60px;
}
</style>