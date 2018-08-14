<template>
	<div id="sta-or-one" v-cloak>
		<div v-if='!isBrand' class="button">
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
				<div style="display:inline-block;">
					<li v-if="!isBrand">
						<span>
							<input type="text" placeholder="请输入订单号" v-model="orderNumber" style="height:40px;line-height:40px;" maxlength="18" />
							<a class="order-order-searchA" v-on:click="getInfoByOrder">
								<span class="order-order-search"></span>
							</a>
						</span>
					</li>
					<li>
						<!--区域选择框-->
						<section class="staList fl">
							<section v-on:click="showAreaList" class="tableList">
								<span class="oSpan">{{allArea}}</span>
								<div class="fl">
									<i></i>
								</div>
							</section>
							<section v-if="areaBtn" class="tableListUl">
								<section v-on:click="selectUlArea(index,item)" :key="index" v-for='(item,index) in areaList' class="tableListLi">{{item.name}}</section>
							</section>
						</section>
					</li>
					<li>
						<!--桌台选择框-->
						<section class="staList fl">
							<section v-on:click="showAreaList2" class="tableList">
								<span class="oSpan">{{allArea2}}</span>
								<div class="fl">
									<i></i>
								</div>
							</section>
							<section v-if="areaBtn2" class="tableListUl">
								<section v-on:click="selectUlArea2(index,item)" :key="index" v-for='(item,index) in areaList2' class="tableListLi">{{item.name}}</section>
							</section>
						</section>
					</li>
					<li v-if="isBrand" style="margin-left: 20px;">
						<input type="text" v-model="orderNumber" maxlength="18" placeholder="请输入订单号" style="width:170px;height: 41px;line-height: 40px;float: left;padding-left: 10px;" />
						<a class="order-order-searchA" v-on:click="getInfoByOrder">
							<span class="order-order-search"></span>
						</a>
					</li>
				</div>
			</ul>
		</div>
		<section class="oCont" style="width:100%;height: 60px;">
			<div class="Box" style="float: left;">
				<section v-on:click="getOidList(4)" class="oDe" v-bind:class="{'act' : status == 4}" style="border-left: none;">已结账</section>
				<section v-on:click="getOidList(3)" class="oDe" v-bind:class="{'act' : status == 3}">未结账</section>
				<section v-on:click="getOidList(6)" class="oDe" v-bind:class="{'act' : status == 6}">挂账</section>
			</div>
		</section>
		<!-- 表格 -->
		<section class="table-container">
			<div class="aLeft">
				<ul class="aUl" style="background-color: #f2f2f2;text-align:center;">
					<li class="aLi" style="float:none;">天数</li>
				</ul>
				<ul class="aUl" style="background-color: #ffffff;">
					<li class="aLi" style="color: #F8941F;float:none;">{{payTotalNum.totalDay}}</li>
				</ul>
				<div style="width:100%;height:50px;text-align: center;line-height: 50px;border-top: 1px solid #d2d2d2;margin-top: 30px;">订单统计·共
					<span style="color: red;">{{oneDayOrderList.length}}</span>条记录</div>
				<div style="width:100%;height: auto;">
					<ul class="aUl" style="background-color: #f2f2f2;">
						<li class="aLi" style="width: 250px;">订单号</li>
					</ul>
					<section style="width:100%;height: auto;">
						<ul class="aUl" style="background-color: #ffffff;" v-if="oneDayOrderList.length == 0">
							<li class="aLi" style="width: 250px;border-bottom: 1px solid #d2d2d2;"></li>
						</ul>
						<ul class="aUl" style="color: #333333;overflow: hidden;width:100%;height: auto;">
							<li class="aLi" :key="index" v-for='(item,index) in oneDayOrderList' v-on:click="getOrderDetailInfo(item.oid)" style="color: #29A7E1;cursor: pointer;width:250px;background: #ffffff;border-bottom: 1px solid #d2d2d2;">{{item.oid}}</li>
						</ul>
					</section>
				</div>
			</div>
			<div class="aRight" style="width:100%;height: auto;padding-left: 250px;overflow: auto;">
				<section v-bind:style="{width:showWidth + 'px'}">
					<ul class="aUl" style="background-color: #f2f2f2;">
						<li class="width70">订单数</li>
						<li class="width70">人数</li>
						<li class="width100" style="position:relative">商品总数
							<detailsDes :title="'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
						</li>
						<li class="width70" style="position:relative">销量
							<detailsDes :title="'该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
						</li>
						<li class="width70">退品数</li>
						<li class="width100">退品总额</li>
						<li v-on:click="openDiscount(payTotalNum)" class="width100 detLi">优惠总额
							<img class="detImg" src="../../res/icon/discount_all.png" />
						</li>
						<li class="width100">代金券</li>
						<li class="width100">利润</li>
						<template v-if='payLsZero'>
							<template v-for='item in allPayList'>
								<li class="width100 overHid" :key="item.id" v-if="!isZero(item.id)">{{item.paymentName}}</li>
							</template>
						</template>
						<li class="width100">服务费</li>
						<li class="width100">找零</li>
						<li class="width100">系统取整</li>
						<!--营业额-->
						<li v-if="status !== 3" class="width100 detLi">消费总额
							<detailsDes :title="'该时段内所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
						</li>
						<li v-if="status !=6" class="width100 ">实收总额</li>
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
						<li style="color: #F8941F;cursor: pointer;vertical-align: middle;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;" v-if="payTotalNum.cashCoupon" :title="parseFloat(payTotalNum.cashCoupon.price).toFixed(2) +'('+payTotalNum.cashCoupon.num+'张)'" class="width100">{{parseFloat(payTotalNum.cashCoupon.price).toFixed(2) +'('+payTotalNum.cashCoupon.num+'张)'}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.profit).toFixed(2)}}</li>
						<template v-if='payLsZero'>
							<template v-for='item in payTotalNum.paymentList'>
								<li style="color: #F8941F;" :key="item.id" class="width100" v-if="!isZero(item.id)">{{parseFloat(item.num).toFixed(2)}}</li>
							</template>
						</template>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.chargePrice).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.change).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.bitPrice).toFixed(2)}}</li>
						<li v-if="status !== 3" style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.originalPrice).toFixed(2)}}</li>
						<li v-if="status != 6" style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.waitPrice).toFixed(2)}}</li>
						<li v-if="status == 3 && payTotalNum && payTotalNum.waitPrice*1 != 0" style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.waitPrice).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.paymentPrice).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.memberRecharge).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.settlePrice).toFixed(2)}}</li>
					</ul>
				</section>
				<!--总的列表-->
				<div v-bind:style="{width:showWidth + 'px'}">
					<div style="width:100%;height:50px;border-top: 1px solid #d2d2d2;margin-top: 30px;"></div>
					<!--显示当天的所有订单 start-->
					<ul style="color: #333333;width:100%;background: #f2f2f2;" v-bind:style="{width:showWidth + 'px'}" class="first">
						<li class="width70">状态</li>
						<li class="width150">开单时间</li>
						<li class="width150">结账时间</li>
						<li class="width150">桌台号</li>
						<li class="width70">人数</li>
						<!--商品数量-->
						<li class="width100 detLi">商品总数
							<detailsDes :title="'该订单商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
						</li>
						<!--销量-->
						<li class="width70 detLi">销量
							<detailsDes :title="'该订单中已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
						</li>
						<li class="width70">赠品数</li>
						<li class="width70">赠品总价</li>
						<li class="width70">退品数</li>
						<li class="width70">退品总价</li>
						<!--优惠金额-->
						<li class="width100 detLi">优惠总额
							<detailsDes :title="'该订单所有的优惠金额总计'"></detailsDes>
						</li>
						<li class="width100">代金券</li>
						<li class="width70">利润</li>
						<template v-if='payLsZero'>
							<template v-for='item in allPayList'>
								<li class="width100 overHid" v-if="!isZero(item.id)" :key="item.id">{{item.paymentName}}</li>
							</template>
						</template>
						<li class="width100">服务费</li>
						<li class="width70">找零</li>
						<li class="width70">系统取整</li>
						<!--营业额-->
						<li class="width100 detLi">消费金额
							<detailsDes :title="'该订单所有消费总额的金额总计（不计入退品金额）'"></detailsDes>
						</li>
						<li class="width100 ">{{status == '6'?'挂账':'实收'}}金额</li>
						<li class="width100 detLi">入账金额
							<detailsDes :title="'该订单实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
						</li>
					</ul>
					<!--订单列表存在数据就显示-->
					<template v-if='oneDayOrderList.length > 0'>
						<template v-for='(item,index) in oneDayOrderList'>
							<ul :key="index" style="color: #333333;overflow: hidden;width:100%;background: #ffffff;border-bottom: 1px solid #d2d2d2;" v-bind:style="{width:showWidth + 'px',}" class="order-content-show detialList">
								<li class="width70">{{item.status}}</li>
								<li class="width150">{{item.createTime}}</li>
								<li class="width150">{{item.updateTime}}</li>
								<li class="width150">{{item.areaName}}
									<span v-if="item.areaName !==''">--</span> {{item.tableName}}
								</li>
								<li class="width70">{{item.person}}</li>
								<li class="width100">{{item.goodsNum}}</li>
								<li class="width70">{{item.salesNum}}</li>
								<li class="width70">{{item.freeNum}}</li>
								<li class="width70">{{parseFloat(item.freePrice).toFixed(2)}}</li>
								<li class="width70">{{item.returnNum}}</li>
								<li class="width70">{{parseFloat(item.returnPrice).toFixed(2)}}</li>
								<li class="width100">{{parseFloat(item.discount).toFixed(2)}}</li>
								<li class="width100" :title="parseFloat(item.cashCoupon.price).toFixed(2) +'('+item.cashCoupon.num+'张)'" style="cursor: pointer;vertical-align: middle;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;">{{parseFloat(item.cashCoupon.price).toFixed(2) +'('+item.cashCoupon.num+'张)'}}</li>
								<li class="width70">{{parseFloat(item.profit).toFixed(2)}}</li>
								<template v-for='pay in item.paymentList'>
									<li class="width100" v-if="!isZero(pay.id)" :key="pay.id">{{parseFloat(pay.num).toFixed(2)}}</li>
								</template>
								<li class="width100">{{parseFloat(item.chargePrice).toFixed(2)}}</li>
								<li class="width70">{{parseFloat(item.change).toFixed(2)}}</li>
								<li class="width70">{{parseFloat(item.bitPrice).toFixed(2)}}</li>
								<li class="width100">{{parseFloat(item.originalPrice).toFixed(2)}}</li>
								<li class="width100">{{parseFloat(item.waitPrice).toFixed(2)}}</li>
								<li class="width100">{{parseFloat(item.paymentPrice).toFixed(2)}}</li>
							</ul>
						</template>
					</template>
					<ul v-else v-bind:style="{width:showWidth + 'px'}">
						<li style="width: 100%;background-color: #FFFFFF;color: #F8931F;">没有订单</li>
					</ul>
				</div>
				<!--显示当天的所有订单 end-->
			</div>
		</section>
		<div style="float: left;margin-left: 30px;margin-top:20px;">
			<pageElement @pageNum="getOrderListInDayPage" :page="dayPage.page" :total="dayPage.pageNum" :num="dayPage.num" :isNoJump='true'></pageElement>
		</div>
		<!-- <div class="order-operation">
			<div style="">
				<a v-on:click='exportOrder($event)' :href="exportUrl" class="blue" style="width:100px;text-align: center;height: 40px;line-height: 40px;">导出</a>
			</div>
			<div v-if="!isBrand" v-on:click='printOrder()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
			<div class="return" v-on:click='returnPage()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
		</div> -->
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
			order: null,
			userData: null,
			dataDetial: null,
			isBrand: null, //品牌判断
			startTime: '', //日期组件的开始时间
			endTime: '', //日期组件的结束时间
			newStartTime: '', //点击日历组件获取的开始时间
			newEndTime: '', //点击日历组件获取的结束时间
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			orderNumber: null, //订单号
			allArea: '选择区域',
			areaBtn: false, //区域
			allArea2: '选择桌台',
			areaBtn2: false, //桌台
			status: 4, //订单状态(3:未结账，4 ： 已结账， 6 ： 挂账)
			payTotalNum: {}, //当天或者多天的数据总和
			oneDayOrderList: [], //一天的订单列表
			showWidth: 1940, //长度

			payLsZero: false, //所有的支付方式是否显示
			exportUrl: 'javascript:void(0);',
			areaList: [{ id: '', name: '全部区域' }], //区域列表
			index: -1, //区域下标
			areaList2: [{ id: '', name: '全部桌台' }], //桌台列表
			index2: -1, //桌台下标
			dayPage: {page:1,num:0}, //单天分页信息
			newDayPage: null, //复制单天分页信息
			preferentialBounced: false, //优惠总额弹框
			isZeroPays: [], //支付方式和为0的列表
			dateTime: [], //要查询的日期 导入和打印使用
			startObj: {},
			endObj: {}
		};
	},
	methods: {
		//初始化按钮,true时表示离开,false,表示进入
		initBtn(flag) {
			let arr = [
				{
					name: '返回',
					style: {
						backgroundColor: '#fff',
						border: '1px solid #ff8c01',
						color: '#ff8c01'
					},
					fn: () => {
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
			// if (!this.isBrand) arr.splice(0, 1);
			if (flag) {arr.shift()}
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
			let detial = {}; //要传的数据
			detial = {
				name: 'order-more', //
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime,
				allDayPage: { page: 0, num: 10, pageNum: 1 } //选择时间查询，重新初始化页数
			};
			storage.session('orderMore', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
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
		//显示区域列表
		showAreaList: function(e) {
			e.stopPropagation();
			this.areaBtn2 = false;
			this.areaBtn = !this.areaBtn;
		},
		//显示桌台列表
		showAreaList2: function(e) {
			e.stopPropagation();
			this.areaBtn = false;
			this.areaBtn2 = !this.areaBtn2;
			//如果选择桌台后返回，不选区域进入桌台
			if (this.index == -1 || this.index == 0) {
				this.areaList2 = this.tableList;
			}
		},
		//点击查看某天某一个的数据详情
		async getOrderDetailInfo(oid) {
			let res = await http.billDelite({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
					oid: oid
				}
			});
			res.oidDetial = 'order-one'; //自定义商品统计特有标记
			res.titleDetial = {
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
		//切换已结账、未结账、挂账
		getOidList: function(typeNum) {
			this.dayPage.page = 1;
			this.status = typeNum;
			this.getOrderListInDay(this.dateTime);
		},
		//点击查看某天的数据
		async getOrderListInDay(time) {
			this.orderNumber = ''; //清空订单号
			this.dateTime = time;
			//进入单天的订单，多天的隐藏，打印-返回也适用

			this.startH = new Date(this.startTime).getHours();
			this.startM = new Date(this.startTime).getMinutes();
			this.startS = new Date(this.startTime).getSeconds();
			this.endH = new Date(this.endTime).getHours();
			this.endM = new Date(this.endTime).getMinutes();
			this.endS = new Date(this.endTime).getSeconds();
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
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			let res = await http.oneDayOrderData({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
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
					oid: this.orderNumber,
					areaId:
						this.index == -1 ? '' : this.areaList[this.index].id,
					tableId:
						this.index2 == -1 ? '' : this.areaList2[this.index2].id,
					status: this.status
				}
			});
			this.payTotalNum = res.total;
			this.payTotalNum.totalDay = 1; //从日期进去，为1天，加上totalDay
			// 编辑窗口Vue
			this.dayPage.pageNum = res.pageNum;
			if (res) {
				this.showDay = true;
				let orderList = res.list;
				for (let i = 0; i < orderList.length; i++) {
					if (orderList[i].updateTime == '1970-01-01 08:00:00') {
						orderList[i].updateTime = '0000-00-00 00:00:00';
					}
				}
				this.oneDayOrderList = orderList;
				//让total的支付列表为数组，规避不是数组循环错误
				// if (res.list.length == 0 && res.total) {
				// 	res.total.paymentList = [];
				// }
			}
			// console.log(res.total.paymentList)
			if (res && res.total && res.total.paymentList) {
				let ArrZero = [];
				let ArrAllPayList = [];
				let ArrNoZero = [];
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
				this.showWidth = ArrNoZero.length * 100 + 1940;
			}
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
		//打开优惠信息
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
		//初始化
		init: function() {
			this.getOrderListInDay(this.order.day);
		},
		async getPayAreaTableList() {
			this.areaList = [{ id: '', name: '全部区域' }]; //区域列表
			this.areaList2 = [{ id: '', name: '全部桌台' }];
			this.tableList = [{ id: '', name: '全部桌台' }];
			let res = await http.getCondition({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id
				}
			});

			this.allPayList = res.paymentList;

			let alist = res.areaList;
			for (let i = 0; i < alist.length; i++) {
				this.areaList.push(alist[i]);
			}
			let tlist = res.tableList;
			for (let i = 0; i < tlist.length; i++) {
				this.areaList2.push(tlist[i]);
				this.tableList.push(tlist[i]);
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
		//点击返回按钮
		returnPage: function() {
			storage.session('orderMore', this.order);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		//打印订单
		async printOrder() {
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
			await http.printMore({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
					startTime:
						this.dateTime == newStarTime
							? this.getTime(startDay)
							: this.getTime(this.dateTime + ' 00:00:00'),
					endTime:
						this.dateTime == newEndTime
							? this.getTime(endDay)
							: this.getTime(this.dateTime + ' 23:59:59'),
					isOpenTime: Number(this.isOpenTime)
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送！!'
			});
		},
		//导出订单
		async exportOrder() {
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
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//导出一个月的某天的订单
			// let timeArr = this.dateTime.split('-');
			if (this.oneDayOrderList.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出!'
				});
				return false;
			}
			this.exportUrl = await http.exportOneDayOrder(
				{
					data: {
						trueShopId: this.dataDetial
							? this.dataDetial.itemDetial.shopId
							: this.userData.currentShop.id,
						status: this.status,
						startTime:
							this.dateTime == newStarTime
								? this.getTime(startDay)
								: this.getTime(this.dateTime + ' 00:00:00'),
						endTime:
							this.dateTime == newEndTime
								? this.getTime(endDay)
								: this.getTime(this.dateTime + ' 23:59:59'),
						isOpenTime: Number(this.isOpenTime)
					}
				},
				'csv'
			);
		},
		// 选择桌台点击确定
		selectUlArea2: function(index, data) {
			this.allArea2 = data.name;
			this.areaBtn2 = false;
			this.index2 = index;
			this.dayPage.page = 1;
			this.getOrderListInDay(this.order.day);
		},
		// 选择区域点击确定
		selectUlArea: function(index, data) {
			this.allArea = data.name;
			this.areaBtn = false;
			this.index = index;
			this.index2 = -1;
			this.allArea2 = '选择桌台';
			// let arr = [];
			this.areaList2 = [{ id: '', name: '全部桌台' }];
			let tableList = this.tableList;
			for (let i = 0; i < tableList.length; i++) {
				if (data.id == tableList[i].areaId) {
					this.areaList2.push(tableList[i]);
				}
			}
			this.dayPage.page = 1;
			this.getOrderListInDay(this.order.day);
		},
		//某天的订单数据翻页效果,展示当前页
		getOrderListInDayPage: function(res) {
			this.dayPage.page = res.page;
			this.dayPage.num = res.num;
			this.getOrderListInDay(this.dateTime);
		},
		contactTime1: function() {
			this.$refs.triggerStartTime.showCalendar = !this.$refs
				.triggerStartTime.showCalendar;
		},
		contactTime2: function() {
			this.$refs.triggerEndTime.showCalendar = !this.$refs.triggerEndTime
				.showCalendar;
		}
	},
	mounted() {
		let userData = storage.session('userShop');
		let order = storage.session('orderOne'); //多天返回单天传递的信息
		// let order = global.orderData.orderOne; //多天返回单天传递的信息
		let titleDetial = storage.session('titleDetial'); //订单详情返回的信息

		let dayPage = { page: 1, num: 10, pageNum: 1 }; //分页信息
		let dataDetial = storage.session('brandDetial'); //品牌进入的信息
		// let isbrandJoin = false;

		// if (dataDetial) {
		// 	//是否从品牌进入的
		// 	isbrandJoin = dataDetial.isbrandJoin;
		// }
		if (titleDetial) {
			dayPage = titleDetial.dayPage;
		}
		this.dataDetial = dataDetial;
		// console.log(this.dataDetial)
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.startTime = order
			? order.startTime
			: new Date().setHours(0, 0, 0, 0);
		this.endTime = order
			? order.endTime
			: new Date().setHours(23, 59, 59, 999);
		this.newStartTime = order
			? order.startTime
			: new Date().setHours(0, 0, 0, 0);
		this.newEndTime = order
			? order.endTime
			: new Date().setHours(23, 59, 59, 999);
		this.startObj = { time: this.startTime };
		this.endObj = { time: this.endTime };
		this.isOpenTime = order ? order.isOpenTime : true;
		this.dayPage = dayPage;
		this.userData = userData;
		this.order = order;
		this.getPayAreaTableList();
		this.init(); //获取当前时间段内的所有数据
		document.onclick = () => {
			this.areaBtn = false;
			this.areaBtn2 = false;
		};
		this.$route.query.arear==1?this.initBtn():this.initBtn(true);
		sessionStorage.removeItem('order');
		sessionStorage.removeItem('titleDetial');
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
@b: 1px solid #ff0000;
.table-container {
	height: auto;
	position: relative;
	border: 1px solid #d2d2d2;
	box-shadow: 7px 7px 15px #ccc;
	.aLeft {
		width: 250px;
		height: auto;
		float: left;
		position: absolute;
		left: 0;
		z-index: 3;
		background-color: #fff;
	}
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
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
	float: left;
}

.order-order-searchA,
.order-order-search {
	float: left;
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
	width: 100px;
	height: 40px;
	float: right;
	margin-left: 10px;
	line-height: 38px;
	text-align: center;
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


#sta-or-one .tableListInp {
	color: #666666;
	height: 43px;
	cursor: pointer;
	box-sizing: border-box;
}

#sta-or-one .tableListInp .calendar-ctr {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
	border-left: #b3b3b3 solid 1px;
}

#sta-or-one .tableListInp div i {
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

#sta-or-one .statisticsList {
	position: relative;
	line-height: 41px;
}

.tableName {
	width: 47px;
	height: 40px;
	line-height: 40px;
	float: left;
	font-size: 16px;
	text-align: center;
}

#sta-or-one .statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#sta-or-one .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#sta-or-one .overHid {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#sta-or-one .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}

#sta-or-one .staList {
	position: relative;
	line-height: 41px;
	width: 143px;
}

#sta-or-one .staList .tableListUl {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 38px;
	left: 0;
	z-index: 20;
	background: #fff;
	max-height: 300px;
	overflow: auto;
	border: 1px solid #ccc;
	border-top: 0;
}

#sta-or-one .staList .tableListUl .tableListLi {
	text-align: center;
	height: 41px;
	border: 1px #ccc solid;
	background: #fff;
	cursor: pointer;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 0 !important;
}

#sta-or-one .staList .tableListUl .tableListLi:last-of-type {
	border-bottom: 0;
}

#sta-or-one .tableList {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
}

#sta-or-one .tableList .oSpan {
	height: 39px;
	line-height: 39px;
	width: 100px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px solid #b3b3b3;
	overflow: hidden;
}

#sta-or-one .tableList div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}

#sta-or-one .tableList div i {
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

.oCont .Box {
	width: 360px;
	height: 42px;
	cursor: pointer;
	box-sizing: border-box;
}

.oCont .oDe {
	width: 30%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
	box-sizing: border-box;
	color: #000000;
	margin-right: 10px;
	background-color: #f2f2f2;
	border-radius: 5px;
}

.oCont .Box .act {
	background-color: #28a8e0;
	color: #fff;
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