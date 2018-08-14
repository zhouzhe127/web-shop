<template>
	<section id="addCount">
		<Win @winEvent='winEvent' :width='900' :height='350'>
			<span slot='title'>添加关联优惠券</span>
			<section style="padding: 20px 50px;" :slot="'content'">
				<div class="top" style="border-bottom: 1px dashed #ccc;padding-bottom: 20px;">
					<span class="sel" v-for="(item,index) in CountList" :key='index' v-bind:class="{'on':flag2 == index}" @click="showCount(index)">{{item.name}}</span>
				</div>
				<div style="padding-top: 10px;position: relative;">
					<span style="font-size: 14px; color: #999999;">选择优惠券：</span>
					<section class="fr" style="width: 100%;height: auto;margin-bottom: 10px;">
						<a href="javascript:void(0)" class="unselect fr" v-on:click="wholeOffCom">全部取消</a>
						<!--<a href="javascript:void(0)" class="check fr"  v-on:click="wholeOnCom" style="margin-right: 1px;">全部选择</a>-->
					</section>
					<section class="comList">
						<coupon :list='goodsCom' :selects='selects' :max-num="5" :name='"name"' :keyName='"id"' @select='select'></coupon>
					</section>
				</div>
			</section>
		</Win>

	</section>
</template>

<script>
	import utils from 'src/verdor/utils';

	export default {
		props: {
			couponList: Array, //所有优惠券列表
			selectCoupon: {
				type: Array,
				default: function () {
					return [];
				}
			}, //选中优惠券
		},
		data() {
			return {
				index: 0,
				flag2: 0,
				goodsCom: [], //优惠券显示列表
				CountList: [
					{
						'name': '全部'
					}, 
					{
						'name': '满减优惠券'
					}, 
					{
						'name': '折扣优惠券'
					}, 
					{
						'name': '赠菜优惠券'
					}, 
					{
						'name': '代金券'
					}
				],
				selects: [],
				list: []
			};

		},
		methods: {
			select(obj) {
				this.selects = obj.selectList;
				this.list = obj.list;
			},
			winEvent(str) {
				this.$emit('winEvent', {
					status: str,
					data: {
						select: this.selects,
						list: this.list
					}
				});
			},
			showCount: function (index) {
				this.flag2 = index;
				//选择不同优惠券显示列表
				if (index == 0) {
					this.goodsCom = this.couponList;
				} else if (index == 1) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 1 || this.couponList[i].type == 2) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 2) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 3 || this.couponList[i].type == 4) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 3) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 5) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 6) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				}
			},

			//全部取消
			wholeOffCom: function () {
				this.selects = [];
			},
		},
		watch: {
			'selects': function () {
				if (this.selects.length == 11) {
					this.$store.commit('setWin', {
						content: '最多选择10张优惠劵'
					});
					this.selects.splice(this.selects.length - 1, 1);
				}
			}
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			coupon: () =>
				import ( /* webpackChunkName:'coupon' */ 'src/components/coupon'),
		},
		created() {
			this.goodsCom = utils.deepCopy(this.couponList);
			this.selects = utils.deepCopy(this.selectCoupon);
		}
	};
</script>

<style scoped>
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

	.comList {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 30px;
	}
</style>