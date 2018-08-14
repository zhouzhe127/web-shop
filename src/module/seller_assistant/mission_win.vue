/** * 新建任务 * *miaochuan.sha */
<template>
	<Win :width='653' :height='588' @winEvent='getAppliedWin' :align="'right'">
		<span slot="title">查看详情</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 任务名称 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">任务名称:</span>
				<span>{{taskdetail.taskName}}</span>
			</div>
			<!-- 所属店铺 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">所属店铺:</span>
				<div class="rightHalf">
				<span>{{getShopname(taskdetail.applyShopIds)}}</span>
			</div>
			</div>
			<!-- 开始时间 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">开始时间:</span>
				<span>{{formatTime(taskdetail.startTime)}}</span>
			</div>
			<!-- 结束时间 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">结束时间:</span>
				<span>{{formatTime(taskdetail.endTime)}}</span>
			</div>
			<!-- 持续时间 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">持续时间:</span>
				<span>{{taskdetail.durationTime}}分钟</span>
			</div>
			<!-- 任务类型 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">任务类型:</span>
				<div class="rightHalf">
					<span v-if="taskdetail.type == '0'">店内任务</span>
					<span v-if="taskdetail.type == '1'">消费任务 "消费满{{taskdetail.amount}},达成任务"</span>
					<span v-if="taskdetail.type == '2'">分享任务 "进入该页面{{taskdetail.shareUrl}},点击右上角分享至{{type[taskdetail.shareAddress]}},达成任务"</span>
				</div>
			</div>
			<!-- 任务介绍 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">任务介绍:</span>
				<div class="rightHalf">
					<span v-html="line2br(taskdetail.describe)"></span>
				</div>
			</div>
			<!-- 奖励商品 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">奖励商品:</span>
				<div class="rightHalf">
					<span v-for="(it,ind) in taskdetail.couponIds.coupon" :key="ind">{{it.name}}优惠券{{it.num}}张
						<template v-if="ind != taskdetail.couponIds.coupon.length -1">
							,
						</template>
					</span>
					<span v-for="(it,inde) in taskdetail.couponIds.pointCard" :key="inde">{{it.name}}积分卡{{it.num}}张
						<template v-if="inde != taskdetail.couponIds.pointCard.length -1">
							,
						</template>
					</span>
					<span v-for="(it,index) in taskdetail.couponIds.pointGoods" :key="index">{{it.name}}积分商品{{it.num}}个
						<template v-if="index != taskdetail.couponIds.pointGoods.length -1">
							,
						</template>
					</span>
				</div>
			</div>
			<!-- 任务量 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">任务量:</span>
				<span>{{taskdetail.taskNum}}</span>
			</div>
			<!-- 人均领取次数 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">人均领取次数:</span>
				<span>{{taskdetail.perLimit}}次</span>
			</div>
		</div>
	</Win>
</template>
<script>
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			type: {
				0: '微信好友',
				1: '朋友圈'
			}
		};
	},
	props: {
		taskdetail: Object, //任务详情数据
		shopsList: Array //店铺列表
	},
	methods: {
		getAppliedWin: function(res) {
			this.$emit('getAppliedWin', res);
		},
		getShopname: function(id) {
			let shopname = [];
			let shopIds = id.split(',');
			for (let int of shopIds) {
				for (let item of this.shopsList) {
					if (item.id == int) {
						shopname.push(item.name);
						break;
					}
				}
			}
			return shopname.join(',');
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		line2br(text) {
			return text.split('\n').join('<br/>');
		}
	},
	computed: {

	},
	components: {
		Win: () =>
		import ( /* webpackChunkName:'Win' */ 'src/components/win')
	},
	mounted() {
		// this.taskdetail.describe = this.line2br(this.taskdetail.describe)
	}
};
</script>
<style scoped>
#tan {
	padding: 40px 0;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 10px;
	line-height: 40px;
}

#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .rightHalf {
	width: 500px;
	height: auto;
	float: left;
}

#tan .clearfix::before,
#tan .clearfix::after {
	display: table;
	content: “”;
}

#tan .clearfix::after {
	clear: both;
}

@media screen and (min-width:1024px) and (max-width:1440px) {}
</style>