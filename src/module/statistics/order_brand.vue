<template>
	<div id="sta-ban" style="padding-top:20px;" v-cloak>
		<div class="button">
			<a href="javascript:void(0);" class="select">堂吃</a>
			<a v-on:click="toTakeout" href="javascript:void(0);">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<!--总览订单页面显示日期-->
		<div class="order-order-data">
			<ul>
				<!--日期选择和搜索框-->
				<section class="statisticsList fl">
					<section class="tableListInp">
						<calendar :pObj="startObj" @throwTime="getStartTime" style="width: 245px;height: 41px;float:left;"></calendar>
					</section>
				</section>
				<span style="float: left; width: 25px;line-height: 40px;text-align: center;float:left">至</span>
				<section class="statisticsList fl">
					<section class="tableListInp">
						<calendar :pObj="endObj" @throwTime="getEndTime" style="width: 245px;height: 41px;float:left;"></calendar>
					</section>
				</section>
				<li style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li>
				<div style="display:inline-block;">
					<li>
						<!--<selectstore @emit="getSelectShopList" :sorts="postSelectShopList" :tipName="selectName"></selectstore>-->
						<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
					</li>
					<a class="fl yellow" v-on:click="sreachOrderInDays()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 10px;">搜索</a>
					<a class="fl gray" v-on:click="resetting()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 10px;">重置</a>
				</div>
			</ul>
		</div>
		<section style="width:100%;height:auto;line-height:20px;overflow: hidden;margin-top:10px">
			<section style="width: 80px;height: 20px;line-height: 20px;float: left;">选择店铺：</section>
			<section style="line-height: 20px;float: left;">{{selectName}}</section>
		</section>
		<div v-if="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div>
		<section v-if="loading" class="allBox">
			<div class="aLeft">
				<ul class="aUl" style="background-color: #ECEDF2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;">
					<li class="aLi" style="width: 100px;"></li>
					<li class="aLi" style="width: 150px;">天数</li>
				</ul>
				<ul class="aUl" style="background-color: #fff;border-bottom: 1px solid #D2D2D2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;">
					<li class="aLi" style="width: 100px;"></li>
					<li class="aLi" style="color: #F8941F;width:150px;">{{payTotalNum.totalDay?payTotalNum.totalDay:"1"}}</li>
				</ul>
				<div>
					<!--时间段里所有订单列表显示 start-->
					<section style="width:100%;overflow: auto;margin-top:30px;border-left: 1px solid #D2D2D2;">
						<ul class="aUl" style="background-color: #ECEDF2;box-sizing: border-box;width: 100%;border-top: 1px solid #D2D2D2;">
							<li class="aLi" style="width: 250px;">店铺名称</li>
						</ul>
						<template v-if="lists.length > 0 " v-for='(item,index) in lists'>
							<ul :key="index" class="aUl" style="background-color: #fff;box-sizing: border-box;width: 100%;border-bottom: 3px solid #F7F7F7;">
								<li style="width:250px;color:#00AAE7;cursor: pointer;" v-on:click="openDayDetial(item)">{{item.shopName}}</li>
							</ul>
						</template>
						<template v-if="lists.length == 0">
							<ul class="" style="    height: 80px">
								<li class="width100"></li>
								<li class="width150"></li>
							</ul>
						</template>
					</section>
				</div>
			</div>
			<div class="aRight" style="width:100%;height: auto;padding-left: 250px;overflow: auto;">
				<section v-bind:style="{width:showWidth + 'px'}">
					<ul class="aUl" style="background-color: #ECEDF2;">
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
						<li class="width100" v-if="payTotalNum.cashCoupon">代金券</li>
						<li class="width100">利润</li>
						<template v-for='(item,index) in payTotalNum.paymentList'>
							<li :key="index" class="width100 overHid">{{item.paymentName}}</li>
						</template>
						<li class="width100">服务费</li>
						<li class="width100">找零</li>
						<li class="width100">系统取整</li>
						<!--营业额-->
						<li class="width100 detLi">消费总额
							<detailsDes :title="'该时段内所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
						</li>
						<li v-if="payTotalNum && payTotalNum.waitPrice*1 != 0" class="width100">未结账金额</li>
						<li class="width100">实收总额</li>
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
					<ul style="background-color: #fff;border-bottom: 1px solid #D2D2D2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;border-right: 1px solid #D2D2D2;overflow: hidden;" class="order-content-show">
						<li style="color: #F8941F;" class="width70">{{payTotalNum.orderNum}}</li>
						<li style="color: #F8941F;" class="width70">{{payTotalNum.person}}</li>
						<li style="color: #F8941F;" class="width100">{{payTotalNum.goodsNum}}</li>
						<li style="color: #F8941F;" class="width70">{{payTotalNum.salesNum}}</li>
						<li style="color: #F8941F;" class="width70">{{payTotalNum.returnNum}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.returnPrice)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.discountPrice)}}</li>
						<li v-if="payTotalNum.cashCoupon" style="color: #F8941F;cursor: pointer;vertical-align: middle;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;" class="width100" :title="parseFloat(payTotalNum.cashCoupon.price).toFixed(2) +'('+payTotalNum.cashCoupon.num+'张)'">{{parseFloat(payTotalNum.cashCoupon.price).toFixed(2) +'('+payTotalNum.cashCoupon.num+'张)'}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.profit)}}</li>
						<template v-for='(item,index) in payTotalNum.paymentList'>
							<li :key="index" style="color: #F8941F;" class="width100">{{toFloatStr(item.num)}}</li>
						</template>
						<li style="color: #F8941F;" class="width100">{{parseFloat(payTotalNum.chargePrice).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.change)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.bitPrice)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.originalPrice)}}</li>
						<li v-if="payTotalNum && payTotalNum.waitPrice*1 != 0" style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.waitPrice)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.paidTotalPrice)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.paymentPrice)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.memberRecharge)}}</li>
						<li style="color: #F8941F;" class="width100">{{toFloatStr(payTotalNum.settlePrice)}}</li>
					</ul>
				</section>
				<!--总的列表-->
				<div v-bind:style="{width:showWidth + 'px'}">
					<section style="width:100%;overflow: auto;margin-top:30px;min-height: 130px;">
						<!--时间段里所有订单列表显示 start-->
						<ul style="background-color: #ECEDF2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;border-top: 1px solid #D2D2D2;">
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
							<li class="width70">退品数</li>
							<li class="width100">退品金额</li>
							<!--优惠金额-->
							<li class="width100 detLi">优惠总额
								<detailsDes :title="'该日所有的优惠金额总计'"></detailsDes>
							</li>
							<li class="width100">代金券</li>
							<li class="width100">利润</li>
							<template v-for='(item,index) in payTotalNum.paymentList'>
								<li :key="index" class="width100 overHid">{{item.paymentName}}</li>
							</template>
							<li class="width100">服务费</li>
							<li class="width100">找零</li>
							<li class="width100">系统取整</li>
							<!--营业额-->
							<li class="width100 detLi">消费总额
								<detailsDes :title="'该日所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
							</li>
							<li class="width100 detLi">入账金额
								<detailsDes :title="'该日实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
							</li>
							<li class="width100">实收金额</li>
							<li class="width100 detLi">会员充值
								<detailsDes :title="'该日内会员充值总计(不计入消费总额及入账总额中)'"></detailsDes>
							</li>
							<li class="width100 detLi">挂账结清金额
								<!-- <detailsDes :title="'该时段内会员充值总计(不计入消费总额及入账总额中)'"></detailsDes> -->
							</li>
						</ul>
						<!--订单列表存在数据就显示-->
						<template v-if="lists.length > 0 ">
							<template v-for='(item,index) in lists'>
								<ul :key="index" style="background-color: #fff;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;border-bottom: 3px solid #F7F7F7;overflow: hidden;">
									<li class="width70">{{item.orderNum}}</li>
									<li class="width70">{{item.person}}</li>
									<li class="width100">{{item.goodsNum}}</li>
									<li class="width70">{{item.salesNum}}</li>
									<li class="width70">{{item.returnNum}}</li>
									<li class="width100">{{toFloatStr(item.returnPrice)}}</li>
									<li class="width100">{{toFloatStr(item.discountPrice)}}</li>
									<li class="width100" v-if="item.cashCoupon" :title="parseFloat(item.cashCoupon.price).toFixed(2) +'('+item.cashCoupon.num+'张)'" style="cursor: pointer;vertical-align: middle;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;">{{parseFloat(item.cashCoupon.price).toFixed(2) +'('+item.cashCoupon.num+'张)'}}</li>
									<li class="width100">{{toFloatStr(item.profit)}}</li>
									<template v-for='(pay,index)  in item.paymentList'>
										<li :key="index" class="width100" v-if="isZero(pay.paymentName)">{{toFloatStr(pay.num)}}</li>
									</template>
									<li class="width100">{{parseFloat(item.chargePrice).toFixed(2)}}</li>
									<li class="width100">{{toFloatStr(item.change)}}</li>
									<li class="width100">{{toFloatStr(item.bitPrice)}}</li>
									<li class="width100">{{toFloatStr(item.originalPrice)}}</li>
									<li class="width100">{{toFloatStr(item.paymentPrice)}}</li>
									<li class="width100">{{toFloatStr(item.paidTotalPrice)}}</li>
									<li class="width100">{{toFloatStr(item.memberRecharge)}}</li>
									<li class="width100">{{toFloatStr(item.settlePrice)}}</li>
								</ul>
							</template>
						</template>
						<ul v-else style="width:100%;height: 50px;">
							<li style="color:orange; text-align:left;width: 100%;padding-left:200px ;">该时间段并没有订单数据</li>
						</ul>
					</section>
				</div>
			</div>
		</section>
		<!--分页-->
		<div style="float: left;margin-left: 30px;margin-top:30px;">
			<pageElement @pageNum="pageClick" :page="currentPage" :total="totalNum" :num="num" :isNoJump='true'></pageElement>
		</div>
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
			userData: null,
			startTime: '', //日期组件的开始时间
			endTime: '', //日期组件的结束时间
			newStartTime: '', //点击日历组件获取的开始时间
			newEndTime: '', //点击日历组件获取的结束时间
			orderListInDays: [], //时间段内每天的订单列表
			isZeroPays: [], //支付方式和为0的列表
			payTotalNum: {
				orderNum: 0,
				person: 0,
				goodsNum: 0,
				salesNum: 0,
				returnNum: 0,
				returnPrice: 0,
				discountPrice: 0,
				profit: 0,
				chargePrice: 0,
				paymentList: 0,
				change: 0,
				bitPrice: 0,
				originalPrice: 0,
				waitPrice: 0,
				paidTotalPrice: 0,
				paymentPrice: 0,
				memberRecharge: 0
			}, //当天或者多天的数据总和  要给默认值，防止初始还未请求完数据就报错或者不显示
			showWidth: 1740, //长度
			payLsZero: false, //所有的支付方式是否显示
			exportUrl: 'javascript:void(0);',
			dateTime: [], //要查询的日期 导入和打印使用
			isOpenTime: '', //是否按营业时间，默认 false 0 否

			startH: '', //开始时
			startM: '', //开始分
			startS: '', //开始秒
			endH: '', //结束时
			endM: '', //结束分
			endS: '', //结束秒
			isBrand: null,
			selectName: null,
			shopListBtn: false, //店铺列表显示隐藏
			selectShopList: null,
			postSelectShopList: null,
			shopIds: null, //选择查看的店铺的id
			taskId: '', //传给后台请求数据的一个字段
			allTrue: true, //选择门店的全部选择按钮是否选中状态
			agwge: true, //防止请求中连续点多次请求
			loading: true, //请求页面中
			repeat: true, //防止多次搜索 重复轮询
			countList: [{ name: 10 }, { name: 50 }],
			paginationList: [],
			num: 10, //每页显示数
			currentPage: 1, //第几页
			preferentialBounced: false, //优惠弹框
			startObj: {},
			endObj: {},
			transmitId:[]  //传递给选择店铺页面的id
		};
	},
	computed: {
		totalNum() {
			return Math.ceil(this.orderListInDays.length / this.num);
		},
		lists() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.orderListInDays.slice(startIndex, endIndex);
		}
	},
	mounted() {
		this.initBtn();
		let dataDetial = storage.session('brandorderDetial'); //获取时间戳和营业时间按钮，为从多日返回到品牌
		let orderTakeaway = storage.session('orderBrand');
		this.userData = storage.session('userShop');
		if (this.userData.currentShop.ischain !== '3') {
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
			return;
		}
		let selectShopList = storage.session('shopList');
		// console.log(selectShopList)
		for (let i = 0; i < selectShopList.length; i++) {
			selectShopList[i].selected = true;
		}
		let shopIds = '';   //选中的店铺id
		let selectName = ''; //选中的店铺名称
		//对选择的店铺进行操作，如果从返回后得到数据和刚开始进入处理结果不同
		if (dataDetial) {
			selectShopList = dataDetial.selectShopList;
		}
		let postSelectShopList = [];

		selectShopList.forEach(item => {
			let obj = {
				id: item.id,
				name: item.shopName,
				selected: item.selected
			};
			postSelectShopList.push(obj);
		});
		this.postSelectShopList=postSelectShopList;
		this.transmitId=selectShopList.map((v)=>{//传递给选择店铺页面的id
			return v.id
		});
		//选择的店铺id转化为字符串
		for (let i = 0; i < selectShopList.length; i++) {
			if (selectShopList[i].selected == true) {
				shopIds = shopIds + selectShopList[i].id + ',';
				selectName = selectName + selectShopList[i].shopName + ',';
			}
		}
		//切割拼接店铺id的字符串
		let end = shopIds.split('').length;
		if (shopIds !== '') {
			shopIds = shopIds.substring(0, end - 1);
		}
		this.shopIds = shopIds;
		this.selectName = selectName == '' ? '请选择店铺' : selectName;

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
		this.newStartTime = dataDetial
			? dataDetial.startTime
			: orderTakeaway
				? orderTakeaway.startTime
				: new Date().setHours(0, 0, 0, 0);
		this.newEndTime = dataDetial
			? dataDetial.endTime
			: orderTakeaway
				? orderTakeaway.endTime
				: new Date().setHours(23, 59, 59, 999);
		this.isOpenTime = dataDetial
			? dataDetial.isOpenTime
			: orderTakeaway ? orderTakeaway.isOpenTime : true;
		this.isBrand = this.userData.currentShop.ischain == '3' ? true : false;
		this.selectShopList = dataDetial
			? dataDetial.selectShopList
			: selectShopList;



		this.startObj = { time: this.startTime };
		this.endObj = { time: this.endTime };

		if (this.selectShopList.length == 0) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '没有可选店铺'
			});
			return;
		}
		this.init();
		document.onclick = () => {
			this.shopListBtn = false;
		};
		sessionStorage.removeItem('brandorderDetial');
		sessionStorage.removeItem('orderBrand');
	},
	methods: {
		initBtn() {
			let arr = [
				{
					name: '导出',
					style: {},
					fn: () => {
						this.exportOrder();
					}
				}
			];
			this.$store.commit('setPageTools', arr);
		},
		//分页点击
		pageClick: function(e) {
			this.currentPage = e.page;
			this.num = e.num;
		},
		//到外卖界面
		toTakeout: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'takeoutBrand', //外卖的关键表示
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime
			};
			storage.session('takeoutBrand', detial);
			this.$router.push({
				path: '/admin/orderStatistics/takeawayBrand',
				query: this.$route.query
			});
		},
		toProprietary: function() {
			//去自营外卖
			this.$router.push({
				path: '/admin/orderStatistics/orderProprietaryBrand',
				query: this.$route.query
			});
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.newStartTime = receiveTime;
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.newEndTime = receiveTime;
		},
		init: function() {
			this.getOrderListInDays();
		},
		//店铺选择显示隐藏
		openShop: function(e) {
			e.stopPropagation();
			this.shopListBtn = !this.shopListBtn;
		},
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.newEndTime - this.newStartTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.newStartTime / 1000) -
					parseInt(this.newEndTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误'
				});
				return false;
			}
			this.startTime = this.newStartTime;
			this.endTime = this.newEndTime;
			this.getOrderListInDays();
		},
		//重置
		resetting: function() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.startObj = { time: this.startTime };
			this.endObj = { time: this.endTime };
			this.isOpenTime = true;
			this.selectName='';
			this.shopIds='';
			for (let i = 0; i < this.selectShopList.length; i++) {
				this.selectShopList[i].selected = true;
				this.selectName = this.selectName + this.selectShopList[i].shopName + ',';
				this.shopIds = this.shopIds + this.selectShopList[i].id + ',';
			}
			//切割拼接店铺id的字符串
			let end = this.shopIds.split('').length;
			if (this.shopIds !== '') {
				this.shopIds = this.shopIds.substring(0, end - 1);
			}
			this.transmitId=this.selectShopList.map((v)=>{
				return v.id
			});
			this.getOrderListInDays();
		},
		//对支付金额为0的支付方式做处理
		isZero: function(paymentName) {
			let arr = this.payTotalNum.paymentList;
			let isZreo = false;
			for (let i = 0; i < arr.length; i++) {
				if (paymentName == arr[i].paymentName) {
					isZreo = true;
					return isZreo;
				}
			}
			return isZreo;
		},
		//获取时间段内 订单列表
		async getOrderListInDays() {
			if (!this.repeat) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content:
						'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
				});
				return false;
			}
			this.loading = false;
			if (this.shopIds == '') {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请选择要查询的店铺'
				});
				return false;
			}
			let startTime = new Date(this.startTime);
			let endTime = new Date(this.endTime);
			this.startH = utils.format(startTime, 'hh');
			this.startM = utils.format(startTime, 'mm');
			this.startS = utils.format(startTime, 'ss');
			this.endH = utils.format(endTime, 'hh');
			this.endM = utils.format(endTime, 'mm');
			this.endS = utils.format(endTime, 'ss');
			let timeNum = 0; //限制请求次数
			//从后台获取数据
			let res = await http.OrderReport({
				data: {
					trueShopId: this.userData.currentShop.id,
					type: '1',
					timeType: '1',
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					shopIds: this.shopIds
				}
			});
			this.repeat = false;
			if (res.taskId) {
				this.taskId = res.taskId;
				window.timer = setInterval(async () => {
					timeNum++;
					let data = await http.taskInfo({
						data: {
							trueShopId: this.userData.currentShop.id,
							taskId: this.taskId
						}
					});
					// this.agwge = false;
					this.agwge = true;
					this.repeat = true;
					if (data.status == 2) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请求失败，请重试！'
						});
						this.loading = false;
						clearInterval(window.timer);
					} else if (data.status == 3) {
						this.loading = true;
						this.getrrrrrr(this.taskId);
						clearInterval(window.timer);
					} else {
						this.agwge = false;
						this.repeat = false;
					}
					if (timeNum > 60) {
						this.agwge = false;
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请求失败，请重试！'
						});
						clearInterval(window.timer);
					}
				}, 1000);
				if (this.agwge == false) {
					clearInterval(window.timer);
				}
			}
		},



		async getrrrrrr(taskId) {
			let res = await http.reportGet({
				data: {
					trueShopId: this.userData.currentShop.id,
					taskId: taskId,
					type: 1
				}
			});
			if (res.length == 0) {
				this.orderListInDays = [];
				this.payTotalNum = {
					orderNum: 0,
					person: 0,
					goodsNum: 0,
					salesNum: 0,
					returnNum: 0,
					returnPrice: 0,
					discountPrice: 0,
					profit: 0,
					chargePrice: 0,
					paymentList: [],
					change: 0,
					bitPrice: 0,
					originalPrice: 0,
					waitPrice: 0,
					paidTotalPrice: 0,
					paymentPrice: 0,
					memberRecharge: 0,
					settlePrice:0
				};
				this.payTotalNum.discountList = { order: [], coupon: [] };
				return;
			}
			this.orderListInDays = res.shops;

			this.payTotalNum = res.total;
			this.payTotalNum.discountList = { order: [], coupon: [] };
			for (let i = 0; i < res.shops.length; i++) {
				if (res.shops[i].discountList) {
					for (
						let k = 0;
						k < res.shops[i].discountList.order.length;
						k++
					) {
						this.payTotalNum.discountList.order.push(
							res.shops[i].discountList.order[k]
						);
					}
					for (
						let k = 0;
						k < res.shops[i].discountList.coupon.length;
						k++
					) {
						this.payTotalNum.discountList.coupon.push(
							res.shops[i].discountList.coupon[k]
						);
					}
				}
			}
			// this.setPage();
			let paymentList = [];
			for (let m = 0; m < this.payTotalNum.paymentList.length; m++) {
				if (this.payTotalNum.paymentList[m].num > 0) {
					paymentList.push(this.payTotalNum.paymentList[m]);
				}
			}
			this.payTotalNum.paymentList = paymentList;
			this.showWidth = this.payTotalNum.paymentList.length * 100 + 1740;
		},
		//天数数据翻页效果,展示当前页
		// getOrderListMonPage:function(res){
		//     // console.log(res);
		//     this.getOrderListInDays();
		// },
		//导出订单
		async exportOrder() {
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
			//导出一个月的所有订单
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出'
				});
				return false;
			}
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
			await http.exportReport({
				data: {
					trueShopId: this.userData.currentShop.id,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					taskId: this.taskId
				}
			});
		},
		toFloatStr: function(num) {
			let str = num + '';
			return utils.toFloatStr(str, 2);
		},
		//通过多天的查看详情进入当天页面
		openDayDetial: function(item) {
			let dataDetial = {
				startTime: this.startTime,
				endTime: this.endTime,
				allDayPage: this.currentPage, //页码信息
				isOpenTime: this.isOpenTime, // 按营业时间
				selectShops: this.isOpenTime,
				isbrandJoin: true, //是否从品牌中进入
				itemDetial: item, //所选品牌的信息
				selectShopList: this.selectShopList,
				shopId: item.id
			};
			storage.session('brandDetial', dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		//查看优惠点击
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
//		getSelectShopList: function(res) {
//			this.postSelectShopList = res;
//			let shopIdsStr = '';
//			let selectNameStr = '';
//			for (let i = 0; i < res.length; i++) {
//				if (res[i].selected == true) {
//					shopIdsStr = shopIdsStr + res[i].id + ',';
//					selectNameStr = selectNameStr + res[i].name + ',';
//				}
//			}
//			let shopIdsStrEnd = shopIdsStr.split('').length;
//			if (shopIdsStr !== '') {
//				shopIdsStr = shopIdsStr.substring(0, shopIdsStrEnd - 1);
//			}
//			this.shopIds = shopIdsStr;
//			this.selectName =
//				selectNameStr == '' ? '请选择店铺' : selectNameStr;
//		},
		//选择店铺返回
		getSelectShopList: function(res) {
			console.log(this.postSelectShopList);
			this.transmitId=res;
			let selectNameStr = '';
			for(let i=0;i<this.postSelectShopList.length;i++){
				if(this.transmitId.includes(this.postSelectShopList[i].id)){
					this.postSelectShopList[i].selected=true;
					selectNameStr = selectNameStr + this.postSelectShopList[i].name + ',';
				}else {
					this.postSelectShopList[i].selected=false;
				}
			}
//			this.postSelectShopList = res;

//			for (let i = 0; i < this.postSelectShopList.length; i++) {
//				if (res[i].selected == true) {
//					shopIdsStr = shopIdsStr + res[i].id + ',';
//					selectNameStr = selectNameStr + res[i].name + ',';
//				}
//			}
//			let shopIdsStrEnd = shopIdsStr.split('').length;
//			if (shopIdsStr !== '') {
//				shopIdsStr = shopIdsStr.substring(0, shopIdsStrEnd - 1);
//			}
			this.shopIds=res.join(',');
			this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
		},
	},
	destroyed() {
		clearInterval(window.timer);
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		orderWin: () =>
			import(/*webpackChunkName: "order_win"*/ 'src/module/statistics/order_win'),
		selectstore: () =>
			import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		detailsDes: () =>
			import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		elShopList: () =>
			import(/*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	}
};
</script>
<style lang="less" scoped>

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
	display: inline-block;
	// float: left;
	width: 43px;
	height: 43px;
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

.allBox {
	width: 100%;
	height: auto;
	position: relative;
	box-shadow: 7px 7px 15px #ccc;
	border-bottom: 1px solid #d2d2d2;
	border-top: 1px solid #d2d2d2;
}

.aLeft {
	width: 252px;
	height: auto;
	float: left;
	position: absolute;
	left: 0;
	z-index: 4;
}

.aLeft ul {
	color: #333333;
	width: 100%;
	height: 50px;
}

.aLeft ul li {
	float: left;
	height: 50px;
	text-align: center;
	line-height: 50px;
}


.aRight ul {
	color: #333333;
	width: 100%;
	height: 50px;
}

.aRight ul li {
	float: left;
	height: 50px;
	text-align: center;
	line-height: 50px;
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

#sta-ban .tableListInp {
	color: #666666;
	height: 43px;
	cursor: pointer;
	box-sizing: border-box;
}

#sta-ban .tableListInp .calendar-ctr {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
	/*border: #b3b3b3 solid 1px;*/
	border-left: #b3b3b3 solid 1px;
}

#sta-ban .tableListInp div i {
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

#sta-ban .statisticsList {
	position: relative;
	line-height: 41px;
}

/* #sta-ban .statisticsList input {
		text-align: center;
		display: block;
		float: left;
		height: 41px;
		width: 158px;
		outline: none;
		border: 0;
	} */

.tableName {
	width: 47px;
	height: 40px;
	line-height: 40px;
	float: left;
	font-size: 16px;
	text-align: center;
}

#sta-ban .statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#sta-ban .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#sta-ban .overHid {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#sta-ban .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}

#sta-ban .staList {
	position: relative;
	line-height: 41px;
	width: 143px;
}

#sta-ban .staList .tableListUl {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 10;
	background: #fff;
	max-height: 300px;
	overflow: auto;
	border-top: 0;
}

#sta-ban .staList .tableListUl .tableListLi {
	text-align: center;
	height: 41px;
	border: 1px #ccc solid;
	background: #fff;
	cursor: pointer;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 0 !important;
}

#sta-ban .staList .tableListUl .tableListLi:last-of-type {
	border-bottom: 0;
}

#sta-ban .tableList {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
}

#sta-ban .tableList .oSpan {
	height: 39px;
	line-height: 39px;
	width: 100px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px solid #b3b3b3;
	overflow: hidden;
}

#sta-ban .tableList div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}

#sta-ban .tableList div i {
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

.shoName {
	height: 40px;
	line-height: 40px;
	border: 1px solid #f2f2f2;
	float: left;
	margin: 5px;
	color: #fff;
	padding: 0 10px;
}

/*.shoName-select{border-color: #FF9800;background: url(http://192.168.31.185:8020/release-svn/shop/src/res/images/sign.png?18274) right bottom no-repeat;}*/

.shoName-select {
	border-color: #ff9800;
	background: url(../../res/images/sign.png) right bottom no-repeat;
}

.button a {
	display: inline-block;
	width: 100px;
	height: 40px;
	color: orange;
	text-align: center;
	line-height: 40px;
	border: 1px solid orange;
	margin-bottom: 10px;
}

.button a.select {
	background: orange;
	color: #fff;
}

.paging-infor {
	width: 160px;
	height: 45px;
	margin-top: 30px;
	margin-bottom: 50px;
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

.oBox {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 10px 30px;
}

.oBox .oUl {
	width: 100%;
	height: auto;
	overflow: hidden;
	position: relative;
}

.oBox .oUl .oLi {
	height: 65px;
	width: 33%;
	float: left;
	margin: 5px 0;
	overflow: hidden;
}

.oBox .oUl li.allLi {
	width: 24%;
	color: #ff9700;
	position: absolute;
	right: 0;
	bottom: 0;
}

.oBox .oUl .oLi .oLift {
	width: 8%;
	border-right: 1px solid #b9b9b9;
	height: 40px;
	float: left;
	margin-top: 22px;
}

.oBox .oUl .oLi .oH3 {
	line-height: 30px;
	text-align: center;
	font-size: 14px;
	color: #b9b9b9;
	overflow: hidden;
	vertical-align: middle;
	padding: 0 20px;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.oBox .oUl li.allLi .oH3 {
	font-size: 16px;
}

.oBox .oUl .oLi .rightBor {
	width: 90%;
	margin-top: 10px;
	float: left;
}

.oZhe {
	width: 100%;
	height: 10px;
	border-bottom: 1px solid #ccc;
}

.oBox .oUl .otitle {
	width: 100%;
	height: 30px;
	line-height: 40px;
	margin-left: 10px;
	font-size: 16px;
}

.oBox .oUl .otitle .dian {
	width: 10px;
	height: 10px;
	background-color: #ff9800;
	display: inline-block;
	margin-right: 10px;
}

.oBox .oUl .otitle .oTotal {
	float: right;
	height: 30px;
	line-height: 40px;
	margin-right: 30px;
	font-size: 16px;
	color: #ff9800;
}
</style>