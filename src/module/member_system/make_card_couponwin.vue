<template>
	<div>
		<win @winEvent="getCoupon" :align="'center'" :width="990" :height="600">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="coupon_list" style="padding: 20px;overflow: hidden;">
					<div class="top" style="border-bottom: 1px dashed #ccc;padding-bottom: 20px;">
						<span class="sel" v-for="(item,index) in couponType" :key="index" v-bind:class="{'on':flag == index}" @click="showCount(index)">{{item.name}}</span>
					</div>
					<div style="padding-top: 10px;position: relative;">
						<span style="font-size: 14px; color: #999999;">选择优惠券：</span>
						<section class="fr" style="width: 100%;height: auto;margin-bottom: 10px;">
							<a href="javascript:void(0)" class="unselect fr" @click="selectUnselect()">全部取消</a>
							<!--<a href="javascript:void(0)" class="check fr" @click="selectUnselect('1',couponList)" style="margin-right: 1px;">全部选择</a>-->
						</section>
						<section class="comList">
							<coupon v-if="coupon" @select="couponSelect" :list="couponList" :selects="selects" :name='"name"' :keyName='"id"' class="countList"
							    max-num="5"></coupon>
						</section>
					</div>
				</div>
			</div>
		</win>
	</div>

</template>

<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				title: '选择优惠券',
				couponList: [],
				couponsList: [],
				selects: [],
				couponType: [{
					'name': '全部'
				}, {
					'name': '满减优惠券'
				}, {
					'name': '折扣优惠券'
				}, {
					'name': '赠品优惠券'
				}, ],
				flag: 0,
				coupon: false,
			};
		},
		props: ['select'],
		mounted() {
			this.selects = utils.deepCopy(this.select);
			this.getCouponCondition();
		},
		watch: {
			'selects': function () {
				if (this.selects.length == 11) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '最多只能选择十个优惠劵'
					});
					this.selects.splice(this.selects.length - 1, 1);
					return false;
				}
			}
		},
		methods: {
			showCount(i) {
				// 筛选优惠劵
				this.flag = i;
				this.couponList = this.filterList(this.couponsList, i);
			},
			selectUnselect() {
				this.selects = [];
			},
			//获取优惠券
			async getCouponCondition() {
				let res = await http.getCouponCondition({
					data: {}
				});
				this.couponsList = res;
				this.couponsList.filter(function (item) {
					item.num = 1;
				});
				this.couponList = this.filterList(this.couponsList, 0);
				this.coupon = true;
			},
			filterList: function (list, index) {
				//筛选列表
				//                          type = (type == undefined) ? 1 : type;
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					if (index == 0) {
						arr = utils.deepCopy(list);
					} else if (index == 1) {
						if (list[i].type == '1' || list[i].type == '2' || list[i].type == '3') {
							arr.push(list[i]);
						}
					} else if (index == 2) {
						if (list[i].type == '4') {
							arr.push(list[i]);
						}
					} else if (list[i].type == '5') {
						arr.push(list[i]);
					}
				}
				return arr;
			},
			getCoupon(res) {
				this.$emit('getCoupon', res, this.selects);
			},
			//获取选中的优惠券
			couponSelect(res) {
				this.selects = res.selectList;
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			coupon: () =>
				import ( /*webpackChunkName: 'coupon'*/ 'src/components/coupon')
		},
	};
</script>

<style lang="css" scoped>
	.sel {
		display: inline-block;
		width: 120px;
		height: 40px;
		font-size: 16px;
		background: #f2f2f2;
		border-radius: 3px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		margin-right: 10px;
	}

	.on {
		background: #28a8e0;
		color: #fff;
	}

	.countList {
		width: 100%;
	}

	.coupon_list .countList>>>span {
		width: 90%;
		height: 45px;
		margin-right: 30px;
		margin-top: 10px;
		line-height: 45px;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #F1F1F1;
		text-align: center;
		cursor: pointer;
		margin: 1px;
	}

	.coupon_list .countList>>>span:before {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		left: -10px;
	}

	.coupon_list .countList>>>span:after {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		right: -10px;
	}
</style>