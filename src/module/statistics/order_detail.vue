<template>
	<div class="oidDetial" v-cloak>
		<div class="oidDetial-container">
			<!--当天订单详情页面-->
			<div class="sta-left">
				<div class="left-detail" style="height: 60px;">
					<div class="left-detail-left">
						<span>订单号：{{orderBOrder.oid}}</span>
						<span>桌台：{{orderBOrder.areaName}} -- {{orderBOrder.tableName}}</span>
					</div>
					<div class="left-detail-right">
						<span>单据状态：{{orderBOrder.status}}</span>
						<span>人数：{{orderBOrder.person}}</span>
					</div>
				</div>
				<div class="left-detail" style="height: 180px;">
					<div class="left-detail-left">
						<span>消费金额：￥{{parseFloat(orderBOrder.originalPrice).toFixed(2)}}</span>
						<span>含服务费：￥{{parseFloat(orderBOrder.chargePrice).toFixed(2)}}</span>
						<span>优惠总计：￥{{parseFloat(orderBOrder.discount).toFixed(2)}}</span>
						<span>应收金额：￥{{parseFloat(orderBOrder.price).toFixed(2)}}</span>
						<span>实收金额：￥{{parseFloat(orderBOrder.paymentPrice).toFixed(2)}}</span>
						<span>利润：￥{{parseFloat(orderBOrder.profit).toFixed(2)}}</span>
					</div>
					<div class="left-detail-right">
						<span>销量：{{orderBOrder.salesNum}}</span>
						<span>赠品：{{orderBOrder.freeNum}}</span>
						<span>退品：{{orderBOrder.returnNum}}</span>
					</div>
					<div class="detLi">
						<img v-on:click="openDetial(1,'0',$event)" class="detImg" style="top:8px;right: 20px;" src="../../res/icon/orderdetial18.png" />
						<div v-if="orderAll[1].status && orderAll[1].type =='0'" class="detDiv" style="width:470px;height: 300px;right: -360px;">
							<i class="detI" style="right: 380px;border-color: #F2F2F2 #F2F2F2 #45404b #F2F2F2;"></i>
							<h3 class="detH3">营业额：该订单中所有商品原价累加所得（退品金额除外）<br/> 优惠总计：“订单原价”中所有商品优惠金额和整单优惠金额统加所得（退品金额不计入优惠金额）
								<br/> 应收金额：订单原价-优惠总计=应收金额 顾客该订单应支付的金额<br/> 实收金额：该订单实际收入的金额（不计入未入实账的支付方式的金额）
								<br/> 利润：菜品应收金额-成本（如果未填写成本则计为0）=利润
								<br/> 销量：商品总数-退品数=销量 <br/> 赠品：该订单赠品的数量 <br/> 退品：该订单退品的数量
							</h3>
						</div>
					</div>
				</div>
				<template v-if='discountDetial && discountDetial.length > 0'>
					<!--有优惠券再写-->
					<div class="left-detail" style="overflow: hidden;">
						<div class="left-detail-left" style="width: 100%;">
							<span style="font-size: 18px;">优惠信息</span>
							<template v-for="(item,index) in discountDetial">
								<span :key="index">{{item.name}}：￥{{item.price}}</span>
							</template>
						</div>
					</div>
				</template>
				<template v-if='member && member.length !== 0'>
					<!--有会员再写-->
					<div class="left-detail" style="overflow: hidden;height: auto;">
						<div class="left-detail-left">
							<span style="font-size: 18px;">会员信息</span>
							<span>会员账号：{{member.mobile}}</span>
							<span>会员名称：{{member.name}}</span>
						</div>
						<div class="left-detail-right">
							<span></span>
							<span>会员等级：{{member.levelName}}</span>
							<span>会员积分：{{member.operatePoint }}</span>
						</div>
					</div>
				</template>
				<template v-if='orderBpayMethod && orderBpayMethod.length > 0'>
					<div class="left-detail" style="overflow: hidden;height: auto;">
						<div class="left-detail-pay" style="width: 100%;margin-bottom: 14px;">
							<span>系统取整：￥{{orderBOrder.bitPrice}}</span>
						</div>
					</div>
				</template>

				<!--代金券-->
				<template v-if="orderBOrder.cashCoupon && orderBOrder.cashCoupon.length>0">
					<div class="left-detail" style="overflow: hidden;">
						<div class="left-detail-left" style="width: 100%;">
							<span>代金券信息</span>
							<template v-for="(list,index) in orderBOrder.cashCoupon">
								<span :key="index">代金券-{{list.name}}:￥{{list.price}}</span>
							</template>
						</div>
					</div>
				</template>

				<div class="left-detail" style="overflow: hidden;height: auto;">
					<div class="left-detail-pay" style="width: 100%;">
						<span>支付方式</span>
						<template v-for='(pay,i) in orderBpayMethod'>
							<span :key="i">{{pay.paymentName}}：￥{{pay.num}}</span>
						</template>
						<template v-if='orderBpayMethod && orderBpayMethod.length == 0'>
							<span>支付：￥0.00</span>
						</template>
					</div>
					<span style="text-align: right;width: 100%;height: 40px;line-height: 40px;display: inline-block;float: left;">找零：￥ {{orderBOrder.change}} </span>
				</div>
				<div class="left-detail">
					<span>开台时间：{{orderBOrder.createTime}}</span>
					<span>结束时间：{{orderBOrder.updateTime}}</span>
				</div>
				<div class="left-cashier">
					<span>员工： {{peop}}</span>
				</div>
			</div>
			<div class="sta-right">
				<div class="sta-right-content">
					<span v-bind:class="['sta-detail', {'sta-border':returnGoodsShow == '0'}]" v-on:click='changeReturnShow("0")'>商品详情</span>
					<span v-bind:class="['sta-detail', {'sta-border':returnGoodsShow == '1'}]" v-on:click='changeReturnShow("1")'>赠品详情</span>
					<span v-bind:class="['sta-detail', {'sta-border':returnGoodsShow =='2'}]" v-on:click='changeReturnShow("2")'>退品详情</span>
					<div class="count-sum">
						<template v-if='returnGoodsShow == "0"'>
							<div style="width:20%;margin-left: 12px;">商品实收总额：{{parseFloat(orderBDetail.totalPrice).toFixed(2)}}</div>
							<div v-if="orderBDetail.orderMinus !=  0" style="width:15%;">整单减免：{{parseFloat(orderBDetail.orderMinus).toFixed(2)}}</div>
							<div v-if="orderBOrder.bitPrice !=  0" style="width:15%;">系统取整：{{orderBOrder.bitPrice}}</div>
							<div style="width:20%;">应收金额：{{parseFloat(orderBDetail.price).toFixed(2)}}</div>
							<div style="width:10%;">销量：{{orderBOrder.salesNum}}</div>
							<div style="width:10%;">赠品：{{orderBOrder.freeNum}}</div>
							<div style="width:10%;">退品：{{orderBOrder.returnNum}}</div>
						</template>
						<template v-if='returnGoodsShow == "1"'>
							<div style="width: 30%;">赠品：{{orderBOrder.freeNum}}</div>
							<div style="width: 30%;color: #F8931F;float: right;">赠品总额：￥{{orderBOrder.freePrice}}</div>
						</template>
						<template v-if='returnGoodsShow == "2"'>
							<div style="width: 30%;">退品：{{orderBOrder.returnNum}}</div>
							<div style="width: 30%;color: #F8931F;float: right;">退品总额：￥{{orderBOrder.returnPrice}}</div>
						</template>
					</div>
					<div class="sta-form" v-if='returnGoodsShow =="0"'>
						<ul>
							<li style="width:5%">序号</li>
							<li style="width: 20%;">商品名</li>
							<li style="width: 8%">单价</li>
							<li style="width: 8%">口味价钱</li>
							<li style="width: 8%">商品数量</li>
							<li style="width: 12%;">小计</li>
							<li style="width: 8%">优惠金额</li>
							<li class="detLi" style="width: 13%;">实收金额(元)
								<img v-on:click="openDetial(0,'0',$event)" class="detImg" style="top:13px;right: 5px;" src="../../res/icon/orderdetial18.png" />
								<div v-if="orderAll[0].status && orderAll[0].type =='0'" class="detDiv" style="width:470px;height: 170px;right: 20px;top: 40px;">
									<i class="detI" style="right: 20px;border-color: #e1e1e1 #e1e1e1 #45404b #e1e1e1;"></i>
									<h3 class="detH3">赠品中原价和口味价格都计入优惠金额，退品优惠金额和应收金额都记为“0”<br/> 实收金额:（单价+口味价格）*数量-优惠金额=应收金额”
										<br/> 商品应收金额未计算整单减免优惠（整单减免优惠券、整单强减优惠券及整单减免）
									</h3>
								</div>
							</li>
							<li style="width:10%">下单时间</li>
							<li style="width:8%">服务员</li>
						</ul>
						<template v-if='orderBDetail'>
							<template v-for='(item,index) in orderBDetail.order'>
								<ul class="sta-form-show" :key="index">
									<li style="width:5%">{{index + 1}}</li>
									<li style="width: 20%;" v-bind:title="item.goodsName">{{item.goodsName}}</li>
									<li style="width: 8%">{{parseFloat(item.unitPrice).toFixed(2)}}</li>
									<li style="width: 8%">{{parseFloat(item.attrsPrice).toFixed(2)}}</li>
									<li style="width: 8%">{{item.num}}{{item.unit}}</li>
									<li style="width: 12%;">{{parseFloat(item.totalPrice).toFixed(2)}}</li>
									<li style="width: 8%">{{parseFloat(item.discountPrice).toFixed(2)}}</li>
									<li style="width: 13%;">{{parseFloat(item.price).toFixed(2)}}</li>
									<li >{{toDate(item.createTime)}}</li>
									<li style="width:8%">{{item.waiterName}}</li>
								</ul>
							</template>
						</template>
						<ul class="sta-form-show" v-else>
							<li style="width:100%;color: #F8931F;">此单里面没有商品</li>
						</ul>
					</div>
					<!--赠品详情-->
					<div class="sta-form" v-if='returnGoodsShow =="1"'>
						<ul>
							<li>序号</li>
							<li style="width: 20%;">商品名</li>
							<li>单价</li>
							<li>口味价钱</li>
							<li>商品数量</li>
							<li style="width: 20%;">小计</li>
							<li style="width: 20%;">操作员</li>
						</ul>
						<ul v-if="orderBDetail.free.length > 0" :key="index" v-for='(item,index) in orderBDetail.free' class="sta-form-show">
							<li>{{index + 1}}</li>
							<li style="width: 20%;" v-bind:title="item.itemName">{{item.goodsName}}</li>
							<li>{{item.unitPrice}}</li>
							<li>{{item.attrsPrice}}</li>
							<li>{{item.num}}{{item.unit}}</li>
							<li style="width: 20%;">{{parseFloat(item.totalPrice).toFixed(2)}}</li>
							<li style="width: 20%;">{{item.user.name}}</li>
						</ul>
						<ul v-if="orderBDetail.free.length == 0" class="sta-form-show">
							<li style="width: 100%;color: #F8931F;">此单没有赠品</li>
						</ul>
					</div>
					<!--退菜详情-->
					<div class="sta-form" v-if='returnGoodsShow =="2"'>
						<ul>
							<li>序号</li>
							<li style="width: 20%;">商品名</li>
							<li>单价</li>
							<li>口味价钱</li>
							<li>商品数量</li>
							<li style="width: 15%;">小计</li>
							<li>原因</li>
							<li style="width: 15%;">操作员</li>
						</ul>
						<ul v-if="orderBDetail.return.length > 0" :key="index" v-for='(item,index) in orderBDetail.return' class="sta-form-show">
							<li>{{index + 1}}</li>
							<li style="width: 20%;" v-bind:title="item.itemName">{{item.goodsName}}</li>
							<li>{{item.unitPrice}}</li>
							<li>{{item.attrsPrice}}</li>
							<li>{{item.num}}{{item.unit}}</li>
							<li style="width: 15%;">{{parseFloat(item.totalPrice).toFixed(2)}}</li>
							<li>{{item.reason.reasonName}}</li>
							<li style="width: 15%;">{{item.user.name}}</li>
						</ul>
						<ul v-if="orderBDetail.return.length == 0" class="sta-form-show">
							<li style="width: 100%;color: #F8931F;">此单没有退品</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			shopId: '',
			detial: null,
			orderBOrder: [],
			orderBpayMethod: null, //支付的方式
			orderAll: [
				{
					type: '0',
					name: '原价，金额，利润详情',
					status: false
				},
				{
					type: '0',
					name: '应收金额的详解',
					status: false
				}
			],
			discountDetial: null, //订单优惠信息
			member: null, // 会员信息
			peop: null,
			returnGoodsShow: '0', //详情页面显示退菜？
			orderBDetail: [],
			dataDetial: null,
			isBrand: false
		};
	},
	methods: {
		//初始化按钮,true时表示离开,false,表示进入
		initBtn(flag) {
			let arr = [];
			if (!flag) {
				arr = [
					{
						name: '返回',
						type: 4,className: 'info',
						fn: () => {
							this.returnList();
						}
					},
					{
						name: '打印',
						type: 4,className: 'plain',
						fn: () => {
							this.printOrder();
						}
					}
				];
			}
			if (this.isBrand) arr.splice(1, 1);//品牌进入，去掉打印
			this.$store.commit('setPageTools', arr);
		},
		//时间戳转换
		toDate(time){
			return utils.format(time,'hh:mm');
		},
		//返回按钮点击
		returnList: function() {
			let titleDetial = this.detial.titleDetial; //头部的查询条件
			storage.session('titleDetial', titleDetial);
			if (this.detial.oidDetial == 'goodfade') {
				//退品统计
				// sd.controller(['js/sd/order-good-fade-one.js']);
			} else if (this.detial.oidDetial == 'fade') {
				//废单统计
				// sd.controller(['js/sd/order-fade.js']);
			} else if (this.detial.oidDetial == 'free') {
				//赠品统计
				// sd.controller(['js/sd/statistics-free-one.js']);
			} else if (this.detial.oidDetial == 'custom-com') {
				//自定义商品统计
				// sd.controller(['js/sd/statistics-custom-com.js']);
			} else if (this.detial.oidDetial == 'order-one') {
				//订单单天统计
				this.$router.push({
					path: '/admin/orderStatistics/orderOne',
					query: this.$route.query
				});
			} else if (this.detial.oidDetial == 'order-more') {
				//订单多天统计
				this.$router.push({
					path: '/admin/orderStatistics/orderMore',
					query: this.$route.query
				});
			} else if (this.detial.oidDetial == 'enquiry') {
				//交易查询
				// sd.controller(['js/sd/transaction-enquiry.js']);
			} else if (this.detial.oidDetial == 'queries') {
				//交易查询
				// sd.controller(['js/sd/card-queries.js']);
			}
			setTimeout(function() {
				storage.session('titleDetial', '');
			}, 1000);
		},
		//商品详情和退菜详情切换
		changeReturnShow: function(type) {
			this.returnGoodsShow = type;
		},
		//所有的说明隐藏
		publicFun: function() {
			for (let i = 0; i < this.orderAll.length; i++) {
				this.orderAll[i].status = false;
			}
		},
		//点击说明详情
		openDetial: function(index, type, e) {
			e.stopPropagation();
			for (let i = 0; i < this.orderAll.length; i++) {
				if (i != index || this.orderAll[i].type != type) {
					this.orderAll[i].status = false;
				}
			}
			this.orderAll[index].type = type;
			this.orderAll[index].status = !this.orderAll[index].status;
		},
		//打印
		async printOrder() {
			await http.printOrderDetail({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					oid: this.orderBOrder.oid
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送！!'
			});
		}
	},
	mounted() {
		let userData = storage.session('userShop');
		// let token;
		let shopId;
		if (userData && userData.accessToken && userData.currentShop) {
			// token = userData.accessToken;
			shopId = userData.currentShop.id;
		}
		this.detial = storage.session('orderDetial');
		if (!this.detial) {
			this.$router.push({
				path: '/admin/orderStatistics/orderOne',
				query: this.$route.query
			});
			return;
		}
		let dataDetial = storage.session('brandDetial'); //品牌进入的信息
		this.orderBpayMethod = []; //订单支付情况
		let payList = this.detial.order.paymentList;
		for (let i = 0; i < payList.length; i++) {
			if (payList[i].num * 1 > 0) {
				this.orderBpayMethod.push(payList[i]);
			}
		}
		this.orderBOrder = this.detial.order;
		this.discountDetial = this.detial.discount;
		this.member = this.detial.member;
		this.peop = this.detial.staff;
		this.orderBDetail = this.detial.ordeDetail;
		this.dataDetial = dataDetial;
		this.shopId = shopId;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		sessionStorage.removeItem('orderDetial');
		this.initBtn();
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		orderWin: () =>
			import(/*webpackChunkName: "order_win"*/ 'src/module/statistics/order_win')
	},
	beforeDestroy() {
		this.initBtn(true);
	}
};
</script>

<style lang="less" scoped>
.oidDetial {
	width: 100%;
	margin-top: 20px;
	overflow: auto;
}
.oidDetial-container {
	width: 1540px;
	margin-top: 10px;
	margin-left: 10px;
	&:after {
		content: '';
		display: block;
		line-height: 0;
		visibility: hidden;
		clear: both;
	}
}

.oidDetial .sta-left {
	width: 500px;
	float: left;
	background-color: #ffffff;
	box-shadow: 0 0 10px #d2d2d2;
}

.oidDetial .sta-right {
	margin-left: 15px;
	width: 1010px;
	height: 680px;
	float: left;
	background-color: #fff;
}
.oidDetial nav {
	width: 250px;
	margin-bottom: 20px;
}
.oidDetial nav a {
	color: #ff8c01;
	text-align: center;
	font-size: 16px;
	width: 100px;
	height: 40px;
	line-height: 40px;
	border: 1px solid #ff8c01;
}
.oidDetial .sta-left .left-detail,
.oidDetial .sta-left .left-cashier {
	width: 460px;
	border-bottom: 1px solid #c9c9c9;
	margin-left: 20px;
	margin-top: 20px;
}

.oidDetial .sta-left .left-cashier {
	border: none;
	margin-top: 0px;
	height: 50px;
}

/*.oidDetial .sta-left .left-border-bottom {
		width: 500px;
		height: 20px;
		background-color: #fff;
	}
	
	.oidDetial .sta-left .left-border-bottom img {
		float: left;
	}*/

.oidDetial .sta-left .left-detail .left-detail-left {
	width: 260px;
	height: 100%;
	float: left;
	margin-left: 20px;
}

.oidDetial .sta-left .left-detail .left-detail-right {
	width: 170px;
	height: 100%;
	float: left;
}

.oidDetial .left-detail span,
.left-cashier span {
	display: inline-block;
	width: 100%;
	height: 30px;
	line-height: 30px;
}

.oidDetial .left-cashier span {
	margin-top: 5px;
	float: right;
	text-align: right;
}

.oidDetial .left-detail-left span {
	float: left;
}

.oidDetial .left-detail-right span {
	float: right;
}

.oidDetial .sta-detail {
	display: block;
	width: 33%;
	height: 65px;
	text-align: center;
	line-height: 65px;
	cursor: pointer;
	float: left;
	border-bottom: 2px solid #c9c9c9;
}

.oidDetial .sta-border:after {
	content: '';
	border: 6px solid transparent;
	border-bottom-color: #ff9800;
	position: relative;
	left: -34px;
	top: 15px;
}
.oidDetial .sta-border {
	border-bottom: 2px solid #ff9800;
	color: #ff9800;
}

.oidDetial .sta-right-content {
	height: 615px;
	width: 950px;
	margin-left: 30px;
}

.oidDetial .sta-right-content .sta-form {
	float: left;
	width: 958px;
	height: 480px;
	margin-top: 10px;
	overflow: auto;
	background-color: #fff;
	border: 1px solid #b3b3b3;
	box-sizing: border-box;
}

.oidDetial .sta-form ul {
	height: 40px;
	width: 100%;
}

.oidDetial .sta-form ul li {
	display: block;
	width: 10%;
	height: 40px;
	float: left;
	line-height: 40px;
	text-align: center;
	background-color: #f2f2f2;
	border-bottom: 1px solid #d2d2d2;
	border-top: none;
}

.oidDetial .sta-form ul li {
	border-right: none;
}

.oidDetial .sta-form ul li:first-child {
	border-left: none;
}

.oidDetial .sta-form ul.sta-form-show {
	width: 100%;
}

.oidDetial .sta-form ul.sta-form-show li {
	background-color: #fff;
	display: table-cell;
	overflow: hidden;
	vertical-align: middle;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.oidDetial .count-sum {
	width: 100%;
	height: 30px;
	background-color: #ffffff;
	float: left;
	margin-top: 10px;
}

.oidDetial .count-sum div {
	float: left;
	width: 25%;
	height: 100%;
	line-height: 30px;
}

.oidDetial .calendar {
	width: 256px;
}

.oidDetial .left-detail .left-detail-pay {
	float: left;
	margin: 0;
}

.oidDetial .left-detail .left-detail-pay span {
	display: block;
	float: left;
	height: 30px;
	line-height: 30px;
	margin-left: 20px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
}

.oidDetial span {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.oidDetial .detLi {
	position: relative;
	cursor: pointer;
}

.oidDetial .detLi .detImg {
	position: absolute;
	right: 4px;
	top: 17px;
}

.oidDetial .detLi .detDiv {
	width: 250px;
	height: 70px;
	background: #fff;
	position: absolute;
	top: 45px;
	right: 0;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 5;
	background-color: #45404b;
}

.oidDetial .detLi .detDiv .detI {
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

.oidDetial .detLi .detDiv .detH3 {
	height: 30px;
	line-height: 30px;
	color: #818181;
	text-align: left;
	color: #e6e6e7;
}
</style>