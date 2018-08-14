<template>
	<!--当天订单详情页面外卖-->
	<div class="sta-order-detail" v-cloak>
		<div class="scroll-box">
			<div class="sta-left">
				<div class="left-detail">
					<span style="font-size: 20px;margin-bottom: 10px;">订单号：{{orderBDetail.oid}}</span>
					<span>单据状态：{{orderBDetail.status}}</span>
					<div class="takeaway-icon">外卖</div>
				</div>
				<div class="left-detail">
					<div class="detLi" style="font-size: 20px;line-height: 30px;">营业明细
						<detailsDes :width='385' :height='200' :title="'消费金额：该订单中所有商品原价累加所得;优惠总计：该订单中满减、优惠券等活动优惠金额统加所得;订单实收金额：该订单实际收入的金额（消费金额减去配送费、优惠金额所得）;销量：该订单中商品总数（不包含赠品）; 赠品：该订单赠品的数量 ;商品实收金额：每个单品打折后的总额'"></detailsDes>
					</div>
					<div class="left-detail-left">
						<span>消费总额：￥{{parseFloat(orderBDetail.goodsTotalPrice).toFixed(2)}}</span>
						<span>配送费：￥{{parseFloat(orderBDetail.deliverFee).toFixed(2)}}</span>
						<span>优惠总计：￥{{parseFloat(orderBDetail.activityFee).toFixed(2)}}</span>
						<span>餐盒费：￥{{parseFloat(orderBDetail.packageFee).toFixed(2)}}</span>
						<span>平台优惠：￥{{parseFloat(orderBDetail.nonShopPart).toFixed(2)}}</span>
						<span>平台手续费：￥{{parseFloat(orderBDetail.serviceFee).toFixed(2)}}</span>
						<span>退款手续费：￥{{parseFloat(orderBDetail.partRefundServiceFee).toFixed(2)}}</span>
						<span>订单实收金额：￥{{parseFloat(orderBDetail.income).toFixed(2)}}</span>
					</div>
					<div class="left-detail-right">
						<span>销量：{{orderBDetail.totalNum}}</span>
						<span>赠品：{{orderBDetail.discountNum}}</span>
					</div>
				</div>
				<div class="left-detail">
					<span>下单人：{{orderBDetail.consignee}}</span>
					<span>电话：{{orderBDetail.phone}}</span>
					<p><em>地址：</em>{{orderBDetail.address}}</p>
				</div>
				<div class="left-time">
					<span>下单时间：{{orderBDetail.createTime}}</span>
					<span>完成时间：{{orderBDetail.finishTime}}</span>
				</div>
			</div>
			<div class="sta-right">
				<div class="sta-right-content">
					<div>
						<span v-bind:class="['sta-detail-takeout', {'sta-border':returnGoodsShow == '0'}]" v-on:click='changeReturnShow("0")'>商品详情</span>
						<span v-bind:class="['sta-detail-takeout', {'sta-border':returnGoodsShow == '1'}]" v-on:click='changeReturnShow("1")'>赠品详情</span>
						<span v-bind:class="['sta-detail-takeout', {'sta-border':returnGoodsShow == '2'}]" v-on:click='changeReturnShow("2")'>退品详情</span>
					</div>
					<div class="count-sum">
						<template v-if='returnGoodsShow == "0"'>
							<div style="width:20%;">商品应收金额：{{parseFloat(orderBDetail.goodsTotalPrice).toFixed(2)}}</div>
							<div style="width:10%;">销量：{{orderBDetail.totalNum}}</div>
							<div style="width:10%;float: right;">赠品：{{orderBDetail.discountNum}}</div>
						</template>
						<template v-if='returnGoodsShow == "1"'>
							<div style="width: 10%;">赠品：{{orderBDetail.discountNum}}</div>
							<div style="width: 30%;color: #000;float: left;">赠品总额：￥{{orderBDetail.discountTotalPrice}}</div>
						</template>
						<template v-if='returnGoodsShow == "2"'>
							<div style="width: 10%;">退品：{{orderBDetail.discountNum}}</div>
							<div style="width: 30%;color: #F8931F;float: right;">退品总额：￥{{orderBDetail.discountTotalPrice}}</div>
						</template>
					</div>
	
					<div class="sta-form" v-if='returnGoodsShow =="0"'>
						<ul>
							<li style="width: 20%">序号</li>
							<li style="width: 20%;">商品名</li>
							<li style="width: 20%">单价</li>
							<li style="width: 20%">商品数量</li>
							<li style="width: 20%">小计</li>
						</ul>
						<template v-if='orderBDetail'>
	
							<template v-for='(item,index) in orderBDetail.goodsList'>
								<ul class="sta-form-show" :key="index">
									<li style="width: 20%;">{{index + 1}}</li>
									<li style="width: 20%;" v-bind:title="item.goodsName">{{item.goodsName}}</li>
									<li style="width: 20%;">{{parseFloat(item.price).toFixed(2)}}</li>
									<li style="width: 20%;">{{item.num}}份</li>
									<li style="width: 20%;">￥{{parseFloat(item.total).toFixed(2)}}</li>
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
							<li style="width: 20%">序号</li>
							<li style="width: 20%;">商品名</li>
							<li style="width: 20%">单价</li>
							<li style="width: 20%">商品数量</li>
							<li style="width: 20%;">小计</li>
						</ul>
						<ul v-if="orderBDetail.discountList.length > 0 " :key="index" v-for='(item,index) in orderBDetail.discountList' class="sta-form-show">
							<li style="width: 20%">{{index + 1}}</li>
							<li style="width: 20%;">{{item.discountName}}</li>
							<li style="width: 20%;">{{item.price}}</li>
							<li style="width: 20%;">{{item.num}}{{item.unit}}份</li>
							<li style="width: 20%;">￥{{parseFloat(item.total).toFixed(2)}}</li>
						</ul>
						<ul v-if="orderBDetail.discountList == ''" class="sta-form-show">
							<li style="width: 100%;color: #F8931F;">此单没有赠品</li>
						</ul>
					</div>
					<!--退品详情-->
					<div class="sta-form" v-if='returnGoodsShow =="2"'>
						<ul>
							<li style="width: 20%">序号</li>
							<li style="width: 20%;">商品名</li>
							<li style="width: 20%">单价</li>
							<li style="width: 20%">商品数量</li>
							<li style="width: 20%;">小计</li>
						</ul>
						<ul v-if="orderBDetail.partRefundGoodsList.length > 0 " :key="index" v-for='(item,index) in orderBDetail.partRefundGoodsList' class="sta-form-show">
							<li style="width: 20%">{{index + 1}}</li>
							<li style="width: 20%;">{{item.goodsName}}</li>
							<li style="width: 20%;">{{item.price}}</li>
							<li style="width: 20%;">{{item.num}}{{item.unit}}份</li>
							<li style="width: 20%;">￥{{parseFloat(item.total).toFixed(2)}}</li>
						</ul>
						<ul v-if="orderBDetail.partRefundGoodsList == ''" class="sta-form-show">
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
export default {
	data() {
		return {
			brandId: 0,
			shopId: null,
			orderBDetail: storage.session('takeawayDetail'), // 订单统计的detial数据
			returnGoodsShow: '0' //详情页面显示退菜？
		};
	},
	mounted() {
		this.initBtn();
		if (!this.orderBDetail) {
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
			return;
		}
		let userData = storage.session('userShop');
		this.brandId = userData.currentShop.brandId
			? userData.currentShop.brandId
			: 0;
		this.shopId = userData.currentShop.id;
	},
	components: {
		detailsDes: () =>
			import(/*webpackChunkName: "details_des"*/ 'src/components/details_des')
	},
	methods: {
		initBtn() {
			let arr = [
				{name: '返回',className: ['back'],
					fn: () => {
						this.returnPage();
					}
				},
				{name: '打印',className: ['wearhouse all'],
					fn: () => {
						this.printOrderTakeout();
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		async printOrderTakeout() {
			await http.takeoutPrintOrderDetail({
				data: {
					brandId: this.brandId,
					shopId: this.shopId,
					type: this.orderBDetail.type,
					oid: this.orderBDetail.oid
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送！'
			});
		},
		returnPage() {
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
		},
		//商品详情和退菜详情切换
		changeReturnShow: function(type) {
			this.returnGoodsShow = type;
		}
	}
};
</script>
<style lang="less" scoped>
.detLi {
	position: relative;
	cursor: pointer;
}

.sta-order-detail {
	width: 100%;
	padding-top: 20px;
	overflow: auto;
	.scroll-box{
		width: 1530px;
		overflow: hidden;
		padding-left: 10px;
		padding-top: 10px;
	}
}
.sta-order-detail .sta-left {
	width: 500px;
	float: left;
	background-color: #ffffff;
	box-shadow: 0 0 10px #d2d2d2;
}

.sta-order-detail .sta-right {
	margin-left: 10px;
	width: 1010px;
	height: 680px;
	float: left;
	background-color: #ffffff;
}

.sta-order-detail .sta-left .left-detail,
.sta-order-detail .sta-left .left-time,
.sta-order-detail .sta-left .left-cashier {
	width: 460px;
	border-bottom: 1px dashed #c9c9c9;
	margin-left: 20px;
	margin-top: 20px;
}
.sta-order-detail .sta-left .left-detail {
	padding-left: 20px;
	padding-bottom: 15px;
	overflow: hidden;
	position: relative;
	.takeaway-icon {
		position: absolute;
		color: #fff;
		padding: 5px 10px;
		font-size: 14px;
		border-radius: 20px;
		background: #6cc1e8;
		right: 0;
		top: 5px;
		text-align: center;
	}
}
.sta-order-detail .sta-left .left-time {
	margin-top: 25px;
	height: 80px;
}

.sta-order-detail .sta-left .left-cashier {
	border: none;
	margin-top: 0px;
	height: 50px;
}

.sta-order-detail .sta-left .left-border-bottom {
	width: 500px;
	height: 20px;
	background-color: #fff;
}

.sta-order-detail .sta-left .left-border-bottom img {
	float: left;
}

.sta-left .left-detail .left-detail-left {
	width: 260px;
	float: left;
}

.sta-left .left-detail .left-detail-right {
	width: 170px;
	height: 100%;
	float: left;
}

.left-detail span,
.left-time span,
.left-cashier span {
	display: inline-block;
	width: 100%;
	height: 30px;
	line-height: 30px;
}
.left-detail p {
	width: 100%;
	min-height: 30px;
	position: relative;
	padding-left: 40px;
	line-height: 30px;
	em {
		position: absolute;
		left: 0;
		top: 0;
	}
}
.left-time span {
	margin-left: 14px;
	height: 25px;
	line-height: 25px;
}

.left-cashier span {
	margin-top: 5px;
	float: right;
	text-align: right;
}

.left-detail-left span {
	float: left;
}

.left-detail-right span {
	float: right;
}

.sta-detail {
	display: block;
	width: 33%;
	height: 65px;
	text-align: center;
	line-height: 65px;
	cursor: pointer;
	float: left;
	border-bottom: 2px solid #c9c9c9;
}
.sta-detail-takeout {
	display: block;
	width: 33.33%;
	height: 65px;
	text-align: center;
	line-height: 65px;
	cursor: pointer;
	float: left;
	border-bottom: 2px solid #c9c9c9;
}
/*.sta-angle{
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-bottom: 10px solid #ff9800;
	}*/
.sta-border:after {
	content: '';
	border: 6px solid transparent;
	border-bottom-color: #ff9800;
	position: relative;
	left: -34px;
	top: 15px;
}
.sta-border {
	border-bottom: 2px solid #ff9800;
	color: #ff9800;
}

.sta-right-content {
	height: 615px;
	width: 970px;
	margin-left: 30px;
}

.sta-right-content .sta-form {
	float: left;
	width: 958px;
	height: 480px;
	margin-top: 10px;
	overflow: auto;
	background-color: #fff;
	border: 1px solid #b3b3b3;
	box-sizing: border-box;
}
.sta-form ul {
	height: 40px;
	width: 100%;
}
.sta-form ul li {
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
.sta-form ul li {
	border-right: none;
}

.sta-form ul li:first-child {
	border-left: none;
}
.sta-form ul.sta-form-show {
	width: 100%;
}
.sta-form ul.sta-form-show li {
	background-color: #fff;
	display: table-cell;
	overflow: hidden;
	vertical-align: middle;
	text-overflow: ellipsis;
	white-space: nowrap;
	border-bottom: 1px solid #d2d2d2;
}

.count-sum {
	width: 100%;
	height: 30px;
	background-color: #ffffff;
	float: left;
	margin-top: 10px;
}

.count-sum div {
	float: left;
	width: 25%;
	height: 100%;
	line-height: 30px;
}

.left-detail .left-detail-pay {
	float: left;
	margin: 0;
}

.left-detail .left-detail-pay span {
	display: block;
	float: left;
	height: 30px;
	line-height: 30px;
	margin-left: 20px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sta-order-detail span {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>


