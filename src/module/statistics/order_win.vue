<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'center'" :width="900" :height="600" :type="'alert'">
			<span slot="title">{{title}}</span>
			<div id="discounTan" slot="content" v-cloak>
				<section class="oBox">
					<ul class="oUl" v-if="discounts.discount && discounts.discount.length > 0 ">
						<section class="otitle">
							<div class="dian"></div> 整单折扣
							<h3 class="oTotal" style="">总计: ￥{{parseFloat(discounts.discountPrice).toFixed(2)}}</h3>
						</section>
						<li v-for="(item,index) in discounts.discount" :key="index" class="oLi">
							<section class="rightBor">
								<h3 class="oH3">{{item.name +'·' + item.times + '次'}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{parseFloat(item.price).toFixed(2)}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div v-if="discounts.discount && discounts.discount.length > 0 " class="oZhe"></div>
					<ul class="oUl" v-if="discounts.discount2 && discounts.discount2.length > 0 ">
						<section class="otitle">
							<div class="dian"></div> 整单强折
							<h3 class="oTotal" style="">总计: ￥{{parseFloat(discounts.discountPrice2).toFixed(2)}}</h3>
						</section>
						<li v-for="(item,index) in discounts.discount2" :key="index" class="oLi">
							<section class="rightBor">
								<h3 class="oH3">{{item.name +'·' + item.times + '次'}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{parseFloat(item.price).toFixed(2)}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div v-if="discounts.discount2 && discounts.discount2.length > 0 " class="oZhe"></div>
					<ul class="oUl" v-if="discounts.oneDis.length > 0 ">
						<section class="otitle">
							<div class="dian"></div> 单品折扣
							<h3 class="oTotal" style="">总计: ￥{{parseFloat(discounts.oneDisPrice).toFixed(2)}}</h3>
						</section>
						<li v-for="(item,index) in discounts.oneDis" :key="index" class="oLi">
							<section class="rightBor">
								<h3 v-bind:title="item.name " class="oH3">{{item.name +'·' + item.times + '次'}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{parseFloat(item.price).toFixed(2)}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div v-if="discounts.oneDis && discounts.oneDis.length > 0 " class="oZhe"></div>
					<ul class="oUl" v-if="discounts.coupon && discounts.coupon.length > 0 ">
						<section class="otitle">
							<div class="dian"></div> 优惠券
							<h3 class="oTotal" style="">总计: ￥{{parseFloat(discounts.couponPrice).toFixed(2)}}</h3>
						</section>
						<li v-for="(item,index) in discounts.coupon" :key="index" class="oLi">
							<section class="rightBor">
								<h3 v-bind:title="item.name " class="oH3">{{item.name +'-' + item.times + '次('+ item.num + '张)'}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{parseFloat(item.price).toFixed(2)}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div v-if="discounts.coupon && discounts.coupon.length > 0 " class="oZhe" style=""></div>
					<ul class="oUl" v-if="discounts.others && discounts.others.length > 0 ">
						<section class="otitle">
							<div class="dian"></div> 其它优惠
							<h3 class="oTotal" style="">总计: ￥{{parseFloat(discounts.othersPrice).toFixed(2)}}</h3>
						</section>
						<li v-for="(item,index) in discounts.others" :key="index" class="oLi">
							<section class="rightBor">
								<h3 v-if="item.type == 4" v-bind:title="item.name " class="oH3">{{userData.currentShop.ischain == '3'? item.name : item.name + '(' + freeNum +')'}}</h3>
								<h3 v-if="item.type != 4" v-bind:title="item.name " class="oH3">{{item.name +'·' + item.times + '次'}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{parseFloat(item.price).toFixed(2)}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div v-if="discounts.others && discounts.others.length > 0 " class="oZhe"></div>
					<div style="width:100%;height: 50px;">
						<h3 style="width:100%;height: 50px;line-height: 50px;text-align: right;padding-right: 40px;color: #FD9A00;font-size: 18px;
				font-weight: bolder;">优惠总计：{{parseFloat(discountPrice).toFixed(2)}}</h3>
					</div>
				</section>
			</div>
		</win>
	</div>
</template>

<script type='text/javascript'>
import storage from 'src/verdor/storage';

export default {
	props: {
		payTotalNum: null,
		title: null
	},
	data() {
		return {
			userData: null,
			discounts: { discount: [], discount2: [], oneDis: [], others: [] },
			order: null, //其他优惠
			coupon: null, // 优惠券
			discountPrice: null,
			freeNum: null //赠送总额
		};
	},
	mounted() {
		// if(this.payTotalNum.discountList==null) {
		//     this.$store.commit("setWin",{
		// 		title:'操作提示',
		// 		content:'没有优惠信息!',
		//     });
		//     return false;
		// }
		// if(this.payTotalNum.discountList.coupon.length == 0 && this.payTotalNum.discountList.order.length == 0){
		//     this.$store.commit("setWin",{
		// 		title:'操作提示',
		// 		content:'没有优惠信息!',
		//     });
		//     return false;
		// }
		let order = this.payTotalNum.discountList.order;
		let discounts = {
			discount: [], //整单折扣
			discountPrice: 0, //整单折扣总额，
			discount2: [], //整单强折
			discountPrice2: 0, //整单强折总额，
			oneDis: [], //单品折扣
			oneDisPrice: 0, //单品折扣总额
			others: [], //其他优惠
			othersPrice: 0, ////其他优惠总计
			coupon: this.payTotalNum.discountList.coupon, //优惠券
			couponPrice: 0, ////优惠券总计
			alldiscountPrice: 0 //所有的总计之和
		};
		//type   1：整单折扣，2：整单减免，3：整单强折，4：赠品总额，5：单品打折，6：积分抵扣，7：会员折扣，8：会员价减免
		discounts.discount = [];
		for (let i = 0; i < order.length; i++) {
			if (order[i].type == '1') {
				//整单折扣
				discounts.discount.push(order[i]);
				discounts.discountPrice = discounts.discountPrice + order[i].price * 1;
			} else if (order[i].type == '3') {
				//整单强折
				discounts.discount2.push(order[i]);
				discounts.discountPrice2 =
					discounts.discountPrice2 + order[i].price * 1;
			} else if (order[i].type == '5') {
				//单品折扣
				discounts.oneDis.push(order[i]);
				discounts.oneDisPrice =
					discounts.oneDisPrice + order[i].price * 1;
			} else {
				//其他优惠
				discounts.others.push(order[i]);
				discounts.othersPrice =
					discounts.othersPrice + order[i].price * 1;
			}
		}
		//优惠券
		for (let i = 0; i < discounts.coupon.length; i++) {
			discounts.couponPrice =
				discounts.couponPrice + discounts.coupon[i].price * 1;
		}
		//优惠总计之和
		discounts.alldiscountPrice = 
			discounts.discountPrice +
			discounts.discountPrice2 +
			discounts.oneDisPrice +
			discounts.othersPrice +
			discounts.couponPrice;
		this.discounts = discounts;
		this.userData = storage.session('userShop');
		this.discountPrice =
			this.userData.currentShop.ischain == '3'
				? discounts.alldiscountPrice
				: this.payTotalNum.discount;
		this.order = this.payTotalNum.discountList.order;
		this.coupon = this.payTotalNum.discountList.coupon;
		this.freeNum = this.payTotalNum.freeNum;
	},
	methods: {
		getWinClickResult: function(res) {
			this.$emit('toClick', res);
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>

<style lang="less" scoped>
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
