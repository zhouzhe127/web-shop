<template>
	<transition name="fade">
		<win :width="680" :height="800" :align="'right'" :type="'alert'" :ok="okStyle" @winEvent="winEvent">
			<section slot="content" id="tanmanagement">
				<!-- 主要信息 -->
				<div class="set-line">
					<div class="titles">主要信息</div>
					<div class="line"></div>
				</div>
				<!-- 优惠券类型 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">优惠券类型:</span>
					<div class="rightHalf">
						<span v-if="detials.fromType == '2'">满减优惠券</span>
						<span v-else>{{couponTypeList[detials.type]}}</span>
					</div>
				</div>
				<!-- 优惠券名称 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">优惠券名称:</span>
					<div class="rightHalf">
						<span>{{detials.name}}</span>
					</div>
				</div>
				<!-- 关联店铺 -->
				<div class="online-box clearfix" v-if="showShops && detials.type !='7'">
					<span class="online-sub fl">关联店铺:</span>
					<div class="rightHalf">
						<span>关联了{{getNum('shopIds')}}家店铺</span>
					</div>
				</div>
				<!-- 关联菜品 -->
				<div class="online-box clearfix" v-if="(detials.type == '1' || detials.type == '3' || detials.type == '5' || detials.type == '9' || detials.type == '10' || detials.type == '11') && detials.gids && detials.gids.length > 0">
					<span class="online-sub fl">关联菜品:</span>
					<div class="rightHalf">
						<span>关联了{{getNum('gids')}}道菜</span>
					</div>
				</div>
				<!-- 关联套餐 -->
				<div class="online-box clearfix" v-if="(detials.type == '1' || detials.type == '3' || detials.type == '5' || detials.type == '9' || detials.type == '10' || detials.type == '11') && detials.pids && detials.pids.length > 0">
					<span class="online-sub fl">关联套餐:</span>
					<div class="rightHalf">
						<span>关联了{{getNum('pids')}}套餐</span>
					</div>
				</div>
				<!-- 强制减免 -->
				<div class="online-box clearfix" v-if="detials.type =='2' || detials.type =='8' || detials.type =='6'">
					<span class="online-sub fl">强制减免:</span>
					<div class="rightHalf">
						<span>{{whetherNot[detials.isDiscount]}}</span>
					</div>
				</div>
				<!-- 强制折扣 -->
				<div class="online-box clearfix" v-if="detials.type =='4'">
					<span class="online-sub fl">强制折扣:</span>
					<div class="rightHalf">
						<span>{{whetherNot[detials.isDiscount]}}</span>
					</div>
				</div>
				<!-- 口味价格 -->
				<div class="online-box clearfix" v-if="detials.type =='5' || detials.type =='9' || detials.type =='10' || detials.type =='11'">
					<span class="online-sub fl">是否包含口味价格:</span>
					<div class="rightHalf">
						<span>{{whetherNot[detials.tastePrice]}}</span>
					</div>
				</div>
				<!-- 减免金额 -->
				<div class="online-box clearfix" v-if="detials.type =='1' || detials.type =='2'">
					<span class="online-sub fl">减免金额:</span>
					<div class="rightHalf">
						<span>减免{{detials.param}}元</span>
					</div>
				</div>
				<!-- 折扣力度 -->
				<div class="online-box clearfix" v-if="detials.type =='3' || detials.type =='4'">
					<span class="online-sub fl">减免金额:</span>
					<div class="rightHalf">
						<span>{{detials.param}}%</span>
					</div>
				</div>
				<!-- 积分量 -->
				<div class="online-box clearfix" v-if="detials.param !='' && detials.type =='7'">
					<span class="online-sub fl">积分量:</span>
					<div class="rightHalf">
						<span>{{detials.param}}</span>
					</div>
				</div>
				<!-- 随机金额区间 -->
				<div class="online-box clearfix" v-if="detials.type =='8'">
					<span class="online-sub fl">随机金额区间:</span>
					<div class="rightHalf">
						<span>{{detials.billPrice}}至{{detials.reckoningPrice}}</span>
					</div>
				</div>
				<!-- 随机金额取整 -->
				<div class="online-box clearfix" v-if="detials.type =='8'">
					<span class="online-sub fl">随机金额取整:</span>
					<div class="rightHalf">
						<span>{{randomAmountList[detials.priceRule]}}</span>
					</div>
				</div>
				<!-- 面额 -->
				<div class="online-box clearfix" v-if="detials.type =='6'">
					<span class="online-sub fl">面额:</span>
					<div class="rightHalf">
						<span>{{detials.param}}</span>
					</div>
				</div>
				<!-- 实收金额 -->
				<div class="online-box clearfix" v-if="detials.type =='6'">
					<span class="online-sub fl">实收金额:</span>
					<div class="rightHalf">
						<span>{{detials.billPrice}}</span>
					</div>
				</div>
				<!-- 结算金额 -->
				<div class="online-box clearfix" v-if="detials.type =='6'">
					<span class="online-sub fl">结算金额:</span>
					<div class="rightHalf">
						<span>{{detials.reckoningPrice}}</span>
					</div>
				</div>
				<!-- 最大使用上限 -->
				<div class="online-box clearfix" v-if="detials.type =='6'|| detials.type =='2'">
					<span class="online-sub fl">最大使用上限:</span>
					<div class="rightHalf">
						<span>{{detials.useLimit}}</span>
					</div>
				</div>
				<!-- 第二件优惠券方式 -->
				<div class="online-box clearfix" v-if="detials.type =='9'">
					<span class="online-sub fl">第二件优惠券方式:</span>
					<div class="rightHalf">
						<span v-if="detials.discountType == '1'">{{countType[detials.discountType]}}{{detials.param}}%</span>
						<span v-else>{{countType[detials.discountType]}}{{detials.param}}元</span>
					</div>
				</div>
				<!-- 是否叠加 -->
				<div class="online-box clearfix" v-if="detials.type =='9'">
					<span class="online-sub fl">是否叠加:</span>
					<div class="rightHalf">
						<span>{{whetherNot[detials.isSuperposition]}}</span>
					</div>
				</div>
				<!-- 定额券金额 -->
				<div class="online-box clearfix" v-if="detials.type =='11'">
					<span class="online-sub fl">定额券金额:</span>
					<div class="rightHalf">
						<span>{{detials.param}}</span>
					</div>
				</div>
				<!-- 购买商品数量 -->
				<div class="online-box clearfix" v-if="detials.type =='10'">
					<span class="online-sub fl">购买商品数量:</span>
					<div class="rightHalf">
						<span>{{detials.goodsNum}}</span>
					</div>
				</div>
				<!-- 赠送商品数量 -->
				<div class="online-box clearfix" v-if="detials.type =='10'">
					<span class="online-sub fl">赠送商品数量:</span>
					<div class="rightHalf">
						<span>{{detials.giveNum}}</span>
					</div>
				</div>
				<!-- 使用规则 -->
				<div class="set-line">
					<div class="titles">使用规则</div>
					<div class="line"></div>
				</div>
				<!-- 券有效期 -->
				<div class="online-box clearfix" v-if="detials.type !='7'">
					<span class="online-sub fl">券有效期:</span>
					<div class="rightHalf">
						<span>{{getEndTime()}}</span>
					</div>
				</div>
				<!-- 使用时段 -->
				<div class="online-box clearfix" v-if="detials.type !='7'">
					<span class="online-sub fl">使用时段:</span>
					<div class="rightHalf">
						<template v-if="detials.useTime ==''">
							<span>不限制</span>
						</template>
						<template v-else>
							<template v-if="detials.useTime && detials.useTime.type && detials.useTime.type == 'week'">
								<div class="shopAfter" v-for="(item,index) in detials.useTime.list" :key="index">
									<span>{{item.startslot}} - </span>
									<span v-if="item.isNextDay">至隔日</span>
									<span>{{item.endslot}}</span>
								</div>
							</template>
							<template v-if="detials.useTime && detials.useTime.type && detials.useTime.type == 'month'">
								<div class="shopAfter" style="height:auto" v-for="(item,index) in detials.useTime.list" :key="index">
									<span>{{item.startslot}} - </span>
									<span v-if="item.isNextDay">至隔日</span>
									<span>{{item.endslot}}</span>
									<span>日期:</span>
									<div style="width:240px;height:100%;">每月的{{changeDays(item.month)}}日</div>
								</div>
							</template>
						</template>
					</div>
				</div>
				<!-- 领取生效 -->
				<div class="online-box clearfix" v-if="detials.type !='7'">
					<span class="online-sub fl">领取生效:</span>
					<div class="rightHalf">
						<span v-if="detials.delayHours == '0'">领取后立即生效</span>
						<span v-else>领取{{detials.delayHours}}小时后生效</span>
					</div>
				</div>
				<!-- 使用门槛 -->
				<div class="online-box clearfix" v-if="detials.type !='7'">
					<span class="online-sub fl">使用门槛:</span>
					<div class="rightHalf">
						<span v-if="detials.lowestConsume == 0">不设限制</span>
						<span v-else>最低消费{{detials.lowestConsume}}元</span>
					</div>
				</div>
				<!-- 优惠券共享 -->
				<div class="online-box clearfix" v-if="detials.type !='7'">
					<span class="online-sub fl">优惠券共享:</span>
					<div class="rightHalf">
						<span>{{sharing[detials.sharingStatus]}}</span>
					</div>
				</div>
				<!-- 其它设置 -->
				<div class="set-line">
					<div class="titles">其它设置</div>
					<div class="line"></div>
				</div>
				<!-- 备注 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">备注:</span>
					<div class="rightHalf">
						<span>{{detials.annotation}}</span>
					</div>
				</div>
				<!-- 使用须知 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">使用须知:</span>
					<div class="rightHalf">
						<span>{{detials.useKnow}}</span>
					</div>
				</div>
			</section>
		</win>
	</transition>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			detials: {}, //优惠券详情
			showShops: '',
			couponDetail: '',
			ischain: '',
			sharing: {
				'0': '不与其它优惠共享',
				'1': '可与其他优惠共享,可与会员卡优惠共用',
				'2': '可与其他优惠共享,不与会员卡优惠共用'
			},
			randomAmountList: {
				'0': '取整至元',
				'1': '取整至角',
				'2': '取整至分'
			},
			okStyle: null,
			couponTypeList: {
				1: '单品减免优惠券',
				2: '整单减免优惠券',
				3: '单品打折优惠券',
				4: '整单打折优惠券',
				5: '赠菜优惠券',
				6: '代金券',
				7: '积分卡券',
				8: '随机立减优惠券',
				9: '第二件商品券',
				10: '买送券',
				11: '定额券'
			},
			whetherNot: {
				0: '否',
				1: '是'
			},
			countType: {
				1: '折扣力度为',
				2: '立减金额为',
				3: '指定金额为'
			}
		};
	},
	props: ['index', 'item'],
	methods: {
		winEvent(str) {
			if (str == 'ok') {
				if (this.ischain == 1 || this.ischain == 2 || this.detials.fromType == 2) {
					this.$emit('changeCoupon', 'nochange');
				} else {
					//storage.session('couponDetail',this.detials)
					this.$emit('changeCoupon', this.detials);
				}
			} else {
				this.$emit('changeCoupon', 'nochange');
			}
		},
		getEndTime() {
			let item1 = utils.deepCopy(this.detials);
			if (item1.validityType == 0) {
				return '领券后' + item1.relativeTime + '天过期';
			} else if (item1.validityType == 1) {
				item1.endTime -= 0;
				item1.endTime = item1.endTime * 1000;
				console.log(item1.endTime);
				return (
					'到' + utils.format(new Date(item1.endTime), 'yyyy-MM-dd') + '过期'
				);
			}
		},
		changeDays(arr) {
			arr = utils.deepCopy(arr);
			if (arr.length == 0) {
				return '请选择日期';
			}
			arr = arr.sort(function(a, b) {
				return a - b;
			});
			let str = '';

			function findItem(item) {
				let index = arr.indexOf(item);
				for (let i = index; i < arr.length; i++) {
					if (arr[i + 1] - arr[i] != 1) {
						let rs = '';
						if (arr[i] - item == 0) {
							rs = arr[i];
						} else if (arr[i] - item == 1) {
							rs = item + ',' + arr[i];
						} else {
							rs = item + '到' + arr[i];
						}
						if (i < arr.length - 1) {
							rs += ',';
						}
						return rs;
					}
				}
			}
			for (let j = 0; j < arr.length; j++) {
				if (arr[j] - arr[j - 1] != 1) {
					str += findItem(arr[j]);
				}
			}
			return str;
		},
		getNum(type) {
			if (
				this.detials[type] &&
				this.detials[type].length > 0 &&
				this.detials[type] != 0
			) {
				return this.detials[type].split(',').length;
			} else {
				return 0;
			}
		},
		async getCouponInfo() {
			let res = await http.getCouponById({
				data: {
					couponId: this.item.id
				}
			});
			this.detials = res;
			if (this.ischain == 1 || this.ischain == 2 || this.detials.fromType == 2) {
				this.okStyle = {
					content: '确定',
					style: {
						backgroundColor: '#2a80b9',
						color: '#fff'
					}
				};
			} else {
				this.okStyle = {
					content: '修改',
					style: {
						backgroundColor: '#E1BB4A',
						color: '#fff'
					}
				};
			}
			// this.couponDetail = res
		}
	},
	mounted() {
		this.ischain = storage.session('userShop').currentShop.ischain;
		if (this.ischain == 3) {
			this.showShops = true;
		}
		this.getCouponInfo();
	},
	components: {
		win: () =>
			import( /* webpackChunkName: 'win' */ 'src/components/win')
	}
};
</script>
<style type="text/css" scoped>
#tanmanagement .showBefore {
	font-size: 16px;
	width: 140px;
	height: 40px;
	line-height: 40px;
	float: left;
	text-align: right;
	color: #333;
	margin-right: 15px;
}

#tanmanagement .shopAfter {
	font-size: 16px;
	width: 370px;
	height: 40px;
	line-height: 40px;
	float: left;
	text-align: left;
	color: #333;
	margin-right: 10px;
}

#tanmanagement .cList {
	font-size: 16px;
	overflow: hidden;
	width: 550px;
	margin-left: 30px;
}

/*  */
#tanmanagement {
	width: 100%;
	height: 100%;
	padding: 0 10px;
}

#tanmanagement .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#tanmanagement .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#tanmanagement .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#tanmanagement .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
}

#tanmanagement .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tanmanagement .online-box .rightHalf {
	max-width: 370px;
	height: auto;
	float: left;
}

#tanmanagement .online-box .rightHalf span {
	font-size: 16px;
	line-height: 40px;
	color: #333;
}
</style>