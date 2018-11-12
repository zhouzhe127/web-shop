<!--
    **活动首页
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="activity">
		<ul class="oUl">
			<template v-for="(c,index) in couponClassList">
				<li class="oLi" :key="index + c.name" @click="newActivities(c)">
					<div class="oBtop">
						<span>{{c.name}}</span>
					</div>
					<div class="oBottom">
						<div class="oBLeft">
							<h3>{{c.description}}</h3>
						</div>
						<div class="oBRight">
							<img :src="c.PlaceImgUrl" />
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
				couponClassList: [{
						'name': '生日活动',
						'description': '会员生日礼包',
						'type': 0,
						'PlaceImgUrl': require('../../../res/images/birthday.png'), // eslint-disable-line
					},
					{
						'name': '自定义活动',
						'description': '可快速对会员发放礼包,还可针对门店设置店内活动哦~',
						'type': 1,
						'PlaceImgUrl': require('../../../res/images/custom.png'), // eslint-disable-line
					},
					{
						'name': '新会员开卡礼',
						'description': '新注册会员赠送专属会员礼包哦~',
						'type': 2,
						'PlaceImgUrl': require('../../../res/images/card.png'), // eslint-disable-line
					},
					{
						'name': '消费额激励',
						'description': '订单满指定金额享有下次消费奖励~',
						'type': 3,
						'PlaceImgUrl': require('../../../res/images/totalpay.png'), // eslint-disable-line
					},
					{
						'name': '裂变活动',
						'description': '增加用户粘性,对推广人员和关注者发放礼包',
						'type': 4,
						'PlaceImgUrl': require('../../../res/images/fission.png'), // eslint-disable-line
					},
					{
						'name': '会员日',
						'description': '会员日可设置会员某天享有专属会员折扣与额外积分奖励~',
						'type': 5,
						'PlaceImgUrl': require('../../../res/images/vip.png'), // eslint-disable-line
					},
					{
						'name': '满减活动',
						'description': '订单满足指定金额享有当前订单的满减优惠~',
						'type': 6,
						'PlaceImgUrl': require('../../../res/images/fullreduce.png'), // eslint-disable-line
					},
					{
						'name': '领券活动',
						'description': '专属优惠券二维码,扫码领券~',
						'type': 7,
						'PlaceImgUrl': require('../../../res/images/coupon.png'), // eslint-disable-line
					},
					{
						'name': '消费满次送券',
						'description': '固定时间内消费达到指定次数送券优惠',
						'type': 8,
						'PlaceImgUrl': require('../../../res/images/coupon.png'), // eslint-disable-line
					},
					{
						'name': '消费券返券',
						'description': '指定用户群体使用了指定优惠券继续赠送优惠券~',
						'type': 9,
						'PlaceImgUrl': require('../../../res/images/coupon.png'), // eslint-disable-line
					},
					{
						'name': '唤醒营销',
						'description': '给予您多日未到店的会员发送优惠券鼓励到店~',
						'type': 10,
						'PlaceImgUrl': require('../../../res/images/coupon.png'), // eslint-disable-line
					},
				],
			};
		},
		methods: {
			newActivities: function(item) { //新增活动
				storage.session('activityType', item.type);
				if (item.type == '7') {
					this.$router.push('/admin/activity/couponActivity'); //领券活动列表
				} else {
					this.$router.push('/admin/activity/generalActivity'); //普通活动列表
				}
			}
		},
	};
</script>
<style type="text/css" scoped>
	#activity .oUl .oLi {
		width: 300px;
		height: 200px;
		float: left;
		margin-right: 20px;
		margin-top: 30px;
		background-repeat: no-repeat;
	}

	#activity .oUl .oLi .oBtop {
		width: 300px;
		height: 58px;
		background-color: rgba(40, 168, 224, 0.7);
	}

	#activity .oUl .oLi .oBtop span {
		font-size: 26px;
		color: #ffffff;
		line-height: 58px;
		margin-left: 10px;
	}

	#activity .oUl .oLi .oBottom {
		width: 100%;
		height: 143px;
		padding-top: 18px;
		background-color: #ecedf2;
	}

	#activity .oUl .oLi .oBottom .oBLeft {
		width: 190px;
		height: 100%;
		padding-left: 25px;
		float: left;
	}

	#activity .oUl .oLi .oBottom .oBLeft h3 {
		line-height: 26px;
		font-size: 16px;
		font-weight: normal;
		color: #333;
	}

	#activity .oUl .oLi .oBottom .oBRight {
		width: 110px;
		height: 100%;
		float: left;
		position: relative;
	}

	#activity .oUl .oLi .oBottom .oBRight img {
		display: block;
		position: absolute;
		right: 21px;
		bottom: 20px;
	}

	#activity .oUl .oLi .oBottom .oBRight .addcoupon {
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