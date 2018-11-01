<template>
	<transition name="fade">
		<win :width="580" :height="800" :align="'right'" :type="'alert'" :ok="ok" @winEvent="winEvent">
			<section slot="content" id="tanmanagement">
				<section class="titleTop" style="width:100%;height:40px;">
					<div style="width:100%;height:40px;margin:10px;line-height: 40px;position: relative;">
						<i style="width:2px;height:28px;position: absolute;top:6px;left:0;background-color:#28A8E0 ;"></i>
						<h3 style="width:73px;height:40px;margin-left: 10px;float: left;">主要信息</h3>
						<div style="width:430px;margin:20px 5px;float: left;border-bottom: 1px dashed #ccc;"></div>
					</div>
				</section>
				<section style="width:100%;height:auto;">
					<div class="cList">
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">优惠券类型:</h3>
							<div v-if="detials.type =='1'" class="shopAfter">单品减免</div>
							<div v-if="detials.type =='2'" class="shopAfter">整单减免</div>
							<div v-if="detials.type =='3'" class="shopAfter">单品打折</div>
							<div v-if="detials.type =='4'" class="shopAfter">整单打折</div>
							<div v-if="detials.type =='5'" class="shopAfter">赠菜</div>
							<div v-if="detials.type =='6'" class="shopAfter">代金券</div>
							<div v-if="detials.type =='7'" class="shopAfter">积分卡券</div>
							<div v-if="detials.type =='8'" class="shopAfter">随机立减</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">优惠券名称:</h3>
							<div class="shopAfter">{{detials.name}}</div>
						</div>
						<div style="width:100%;height:40px;" v-if="detials.type =='2' || detials.type =='6'">
							<h3 class="showBefore">强制减免:</h3>
							<div class="shopAfter" v-if="detials.isDiscount == 1">是</div>
							<div class="shopAfter" v-if="detials.isDiscount == 0">否</div>
						</div>
						<div style="width:100%;height:40px;" v-if="detials.type == 4">
							<h3 class="showBefore">是否强折:</h3>
							<div class="shopAfter" v-if="detials.isDiscount == 1">是</div>
							<div class="shopAfter" v-if="detials.isDiscount == 0">否</div>
						</div>
						<div v-if="showShops && detials.type !='7'" style="width:100%;height:40px;">
							<h3 class="showBefore">关联店铺:</h3>
							<div class="shopAfter" style="height:auto;">关联了{{getNum('shopIds')}}家店铺</div>
						</div>
						<div v-if="detials.type !=='7' && detials.type !=='6' && detials.type !=='4' && detials.type !=='2' && detials.gids && detials.gids.length > 0" style="width:100%;height:40px;">
							<h3 class="showBefore">关联菜品:</h3>
							<div class="shopAfter" style="height:auto;">关联了{{getNum('gids')}}道菜</div>
						</div>
						<div v-if="detials.type !=='7' && detials.type !=='4' && detials.type !=='2' && detials.pids && detials.pids.length > 0" style="width:100%;height:40px;">
							<h3 class="showBefore">关联套餐:</h3>
							<div class="shopAfter" style="height:auto;">关联了{{getNum('pids')}}套餐</div>
						</div>
						<div v-if="detials.type == 5" style="width:100%;height:40px;">
							<h3 class="showBefore">是否包含口味价钱:</h3>
							<div class="shopAfter" v-if="detials.tastePrice == 0" style="height:auto;">否</div>
							<div class="shopAfter" v-if="detials.tastePrice == 1" style="height:auto;">是</div>
						</div>
						<div v-if="detials.param !='' && detials.type != 5 &&  detials.type != 7" style="width:100%;height:100%;">
							<h3 v-if="detials.type =='1' || detials.type =='2'" class="showBefore">减免力度:</h3>
							<h3 v-if="detials.type =='3' || detials.type =='4'" class="showBefore">折扣力度:</h3>
							<div class="shopAfter" v-if="detials.type =='1' || detials.type =='2'">减免{{detials.param}}元</div>
							<div class="shopAfter" v-if="detials.type =='3' || detials.type =='4'">{{detials.param}}%</div>
						</div>
						<div v-if="detials.param !='' && detials.type == 7" style="width:100%;height:100%;">
							<h3 class="showBefore">积分量:</h3>
							<div class="shopAfter">
								{{detials.param}}
							</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">券有效期:</h3>
							<div class="shopAfter">{{getEndTime()}}</div>
						</div>
						<div style="width:100%;height:40px;" v-if="detials.type == 8">
							<h3 class="showBefore">随机立减金额:</h3>
							<div class="shopAfter">{{detials.billPrice}}至{{detials.reckoningPrice}}</div>
						</div>
						<div v-if="detials.type != 7">
							<h3 class="showBefore">优惠券共享:</h3>
							<div class="shopAfter">{{sharing[detials.sharingStatus]}}</div>
						</div>
						<div v-if="detials.isRenewal == '1'" style="width: 370px;;height:40px;color:#A0A0A0;margin-left: 135px;">上架时间结束时,若没有领完，则自动延期 每次延期30天</div>
					</div>
				</section>
				<div style="width:100%;height:40px;margin:10px;line-height: 40px;position: relative;">
					<i style="width:2px;height:28px;position: absolute;top:6px;left:0;background-color:#28A8E0 ;"></i>
					<h3 style="width:73px;height:40px;margin-left: 10px;float: left;">使用规则</h3>
					<div style="width:430px;margin:20px 5px;float: left;border-bottom: 1px dashed #ccc;"></div>
				</div>
				<div v-if="detials.type != 7" class="cList">
					<div style="width:100%;height:auto;overflow: hidden">
						<h3 class="showBefore">使用时间段:</h3>
						<section style="width:370px;float: left;">
							<template v-if="detials.useTime ==''">
								<div class="shopAfter" style="">不限制</div>
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
						</section>
					</div>
					<div style="width:100%;height:40px;">
						<h3 class="showBefore">最低消费:</h3>
						<div class="shopAfter" v-if="parseFloat(detials.lowestConsume) == 0.00">不限制</div>
						<div class="shopAfter" v-else>{{detials.lowestConsume }}</div>
					</div>
					<div style="width:100%;height:40px;" v-if="detials.type =='2'">
						<h3 class="showBefore">最大使用上限:</h3>
						<!--  <div class="shopAfter" v-if = "parseFloat(detials.lowestConsume) == 0.00">不限制</div> -->
						<div class="shopAfter">{{detials.useLimit}}</div>
					</div>
					<!--<div style="width:100%;height:40px;">
                        <h3 class="showBefore">最高消费:</h3>
                        <div class="shopAfter" v-if = "parseFloat(detials.highestConsume) == 0.00">不限制</div>
                        <div class="shopAfter" v-else>{{detials.highestConsume}}</div>
                    </div>-->
				</div>
				<div style="width:100%;height:40px;margin:10px;line-height: 40px;position: relative;">
					<i style="width:2px;height:28px;position: absolute;top:6px;left:0;background-color:#28A8E0 ;"></i>
					<h3 style="width:73px;height:40px;margin-left: 10px;float: left;">其它设置</h3>
					<div style="width:430px;margin:20px 5px;float: left;border-bottom: 1px dashed #ccc;"></div>
				</div>
				<div style="width:100%;height:40px;margin-left: 30px;">
					<h3 class="showBefore">备注:</h3>
					<div class="shopAfter">{{detials.annotation}}</div>
				</div>
				<div style="width:100%;height:40px;margin-left: 30px;">
					<h3 class="showBefore">使用须知:</h3>
					<div class="shopAfter">{{detials.useKnow}}</div>
				</div>
			</section>
		</win>
	</transition>
</template>
<script>
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
				sharing:{
					'0':'不与其它优惠共享',
					'1':'可与其他优惠共享,可与会员卡优惠共用',
					'2':'可与其他优惠共享,不与会员卡优惠共用'
				}
			};
		},
		props: ['index', 'item'],
		computed: {
			ok() {
				if (this.ischain != 3 && this.ischain != 0) {
					return {
						content: '确定'
					};
				} else {
					return {
						content: '修改'
					};
				}
			}
		},
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (this.ischain != 3 && this.ischain != 0) {
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
				arr = arr.sort(function (a, b) {
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
				import ( /* webpackChunkName: 'win' */ 'src/components/win')
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
</style>