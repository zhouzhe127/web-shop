<!--
    **新建优惠券
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="newcoupon">
		<ul class="oUl">
			<template v-for="(c,index) in couponClassList">
				<li class="oLi" v-bind:style="{ 'background-image': 'url(' + c.PlaceImgUrl + ')'}" :key="index + c.name">
					<div class="oBtop">
						<span>{{c.name}}</span>
					</div>
					<div class="oBottom">
						<div class="oBLeft">
							<h3>{{c.description}}</h3>
						</div>
						<div class="oBRight">
							<section class="addcoupon" @click="addCoupon(c.path)">点击添加</section>
						</div>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				couponClassList: [
					{
						'name': '减免优惠券',
						'description': '订单中所购商品总额需达到用券限额才能使用',
						'type': 1,
						'PlaceImgUrl': require('../../../res/images/toreduce.png'), // eslint-disable-line
						'path': '/admin/addCoupon/breakCoupon'
					},
					{
						'name': '折扣优惠券',
						'description': '单张订单限用一张折扣优惠券,按折扣金额减免支付。',
						'type': 2,
						'PlaceImgUrl': require('../../../res/images/todiscount.png'), // eslint-disable-line
						'path': '/admin/addCoupon/discountCoupon'
					},
					{
						'name': '赠菜优惠券',
						'description': '只能用于特定菜品,单个订单也可以用多张赠菜优惠券,按面值金额减免支付。',
						'type': 3,
						'PlaceImgUrl': require('../../../res/images/togift.png'), // eslint-disable-line
						'path': '/admin/addCoupon/giveCoupon'
					},
					{
						'name': '代金券',
						'description': '单张订单可使用多张代金券设定券实收金额与面额计入订单统计',
						'type': 4,
						'PlaceImgUrl': require('../../../res/images/todai.png'), // eslint-disable-line
						'path': '/admin/addCoupon/vouchersCoupon'
					},
					{
						'name': '积分卡券',
						'description': '积分即可使用',
						'type': 5,
						'PlaceImgUrl': require('../../../res/images/toreduce.png'), // eslint-disable-line
						'path': '/admin/addCoupon/intergralcardCoupon'
					},
					{
						'name': '粮票集(券)',
						'description': '该优惠券仅适用于粮票集,关联砍价时使用,创建后无法同步及修改',
						'type': 6,
						'PlaceImgUrl': require('../../../res/images/toreduce.png'), // eslint-disable-line
						'path': '/admin/addCoupon/breaksGgiveFood'
					}					
				],
			};
		},
		methods: {
			addCoupon: function (path) {
				this.$router.push(path);
				storage.session('couponStatus', 'addCoupon');
			}
		}
	};
</script>
<style type="text/css" scoped>
	#newcoupon .oUl .oLi {
		width: 300px;
		height: 200px;
		float: left;
		margin-right: 20px;
		margin-top: 30px;
		background-repeat: no-repeat;
	}

	#newcoupon .oUl .oLi .oBtop {
		width: 300px;
		height: 58px;
	}

	#newcoupon .oUl .oLi .oBtop span {
		font-size: 26px;
		color: #ffffff;
		line-height: 58px;
		margin-left: 10px;
	}

	#newcoupon .oUl .oLi .oBottom {
		width: 100%;
		height: 143px;
		padding-top: 18px;
	}

	#newcoupon .oUl .oLi .oBottom .oBLeft {
		width: 100%;
		height: 84px;
		padding: 0 71px 0 25px;
	}

	#newcoupon .oUl .oLi .oBottom .oBLeft h3 {
		line-height: 26px;
		font-size: 16px;
		font-weight: normal;
		color: #333;
	}

	#newcoupon .oUl .oLi .oBottom .oBRight {
		width: 100%;
		height: auto;
	}

	#newcoupon .oUl .oLi .oBottom .oBRight .addcoupon {
		width: 83px;
		font-size: 20px;
		height: 22px;
		text-align: center;
		line-height: 19px;
		color: #6CC2E6;
		border-bottom: 1px solid #6CC2E6;
		float: right;
		margin-right: 20px;
		cursor: pointer;
	}
</style>