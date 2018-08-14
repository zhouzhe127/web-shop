<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'center'" :width="900" :height="600" :type="'alert'">
			<span slot="title">其他支付方式</span>
			<div id="discounTan" slot="content" v-cloak>
				<section class="oBox" v-if="paymentType == 'all'" v-for="(val,key,index) in otherPayDetail">
					<ul class="oUl">
						<section class="otitle">
							<div class="dian"></div> {{getshopName(key)}}
							<!-- <h3 class="oTotal" style="">总计: ￥</h3> -->
						</section>
						<li class="oLi" v-for="(v,k,index) in val">
							<section class="rightBor">
								<h3 class="oH3">{{v.paymentName}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{v.totalPayment}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<div class="oZhe"></div>
					<!-- <div style="width:100%;height: 50px;">
						<h3 style="width:100%;height: 50px;line-height: 50px;text-align: right;padding-right: 40px;color: #FD9A00;font-size: 18px;
				font-weight: bolder;">优惠总计：120</h3>
					</div> -->
				</section>
				<section class="oBox" v-if="paymentType == 'one'">
					<ul class="oUl">
						<section class="otitle">
							<div class="dian"></div> {{getshopName(paymentShopId)}}
							<!-- <h3 class="oTotal" style="">总计: ￥</h3> -->
						</section>
						<li class="oLi" v-for="(val,key,index) in otherPayDetail">
							<section class="rightBor">
								<h3 class="oH3">{{val.paymentName}}</h3>
								<h3 class="oH3" style="color: #726F76;font-size: 20px;">￥{{val.totalPayment}}</h3>
							</section>
							<section class="oLift"></section>
						</li>
					</ul>
					<!-- <div style="width:100%;height: 50px;">
						<h3 style="width:100%;height: 50px;line-height: 50px;text-align: right;padding-right: 40px;color: #FD9A00;font-size: 18px;
				font-weight: bolder;">优惠总计：120</h3>
					</div> -->
				</section>
			</div>
		</win>
	</div>
</template>
<script type='text/javascript'>
//import storage from 'src/verdor/storage';

export default {
	props: {
		otherPayDetail: Object, //自定义支付方式的数据
		shopsList: Array, //店铺列表
		paymentType: String,
		paymentShopId: String //店铺id
	},
	data() {
		return {

		};
	},
	methods: {
		getWinClickResult: function(res) {
			this.$emit('toClick', res);
		},
		getshopName: function(id) {
			let shopName = '';
			for (let item of this.shopsList) {
				if (item.id == id) {
					shopName = item.name ? item.name : item.shopName;
				}
			}
			return shopName;
		},
	},
	components: {
		win: () =>
			import ( /*webpackChunkName: "win"*/ 'src/components/win')
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