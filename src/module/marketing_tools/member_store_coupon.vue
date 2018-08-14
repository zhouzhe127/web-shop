<template>
	<!--优惠券弹窗-->
	<Win @winEvent='winEvent' :width='900' :height='600'>
		<div class="coupon_list" style="padding: 20px;overflow: hidden;" slot='content'>
			<div class="top" style="border-bottom: 1px dashed #ccc;padding-bottom: 20px;">
				<span class="sel" :key='index' v-for="(item,index) in couponType" v-bind:class="{'on':flag == index}" @click="showCount(index)">{{item.name}}</span>
			</div>
			<div style="padding-top: 10px;position: relative;">
				<span style="font-size: 14px; color: #999999;">选择优惠券：</span>
				<section class="fr" style="width: 100%;height: auto;margin-bottom: 10px;">
					<a href="javascript:void(0)" class="unselect fr" @click="selectUnselect()">全部取消</a>
				</section>
				<section class="comList">
					<coupon :list='couponList' ref='coupon' :selects='selects' :max-num="5" :name='"name"' :keyName='"id"' @select='select'></coupon>
				</section>
			</div>
		</div>
	</Win>

</template>

<script>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		props: {
			couponIds: [Array, Object, String]
		},
		data() {
			return {
				couponList: [],
				couponsList: [],
				selects: utils.deepCopy(this.couponIds),
				couponType: [
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
						'name': '赠优惠券'
					},
				],
				flag: 0
			};
		},
		methods: {
			select(arr) {
				this.selects = arr.selectList;
				this.$emit('couponChange', arr);
			},
			winEvent() {
				this.$emit('winEvent');
			},
			selectUnselect: function (type, list) {
				// 全选 and 全不选
				if (type == '1') {
					for (let i = 0; i < list.length; i++) {
						this.selects.push(list[i].id);
					}
				} else {
					this.selects = [];
					setTimeout(() => {
						this.$refs.coupon.up();
					});

					this.$emit('couponChange', {
						selectList: this.selects
					});
				}
			},
			async getNoLimitCoupon() {

				// 获取优惠劵
				let data = await http.getCouponCondition({
					data: {

					}
				});

				this.couponsList = data;
				this.couponsList.forEach(function (item) {
					item.num = 1;
				});

				this.couponList = this.filterList(this.couponsList, 0);

				setTimeout(() => {
					this.$refs.coupon.up();
				});

				this.$emit('compareArr', utils.deepCopy(data));
				// 获取优惠劵

			},
			showCount: function (i) {
				this.flag = i;
				this.couponList = this.filterList(this.couponsList, i);
			},
			filterList: function (list, index) {
				//筛选列表
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
			}
		},
		watch: {
			'selects': function () {
				if (this.selects.length > 10) {
					this.$store.commit('setWin', {
						content: '最多只能选择十个优惠劵'
					});
					this.selects.splice(this.selects.length - 1, 1);
					return false;
				}
			}
		},
		mounted: function () {
			this.getNoLimitCoupon();
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			coupon: () =>
				import ( /* webpackChunkName:'coupon' */ 'src/components/coupon'),
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

	/* .comList .selectbtns{width: 100%;}
        .comList .selectbtns span,.packageList span{background-color: #F1F1F1;}
        .comList .selectbtns span:hover,.packageList span:hover{background-color: #F1F1F1;} */
</style>