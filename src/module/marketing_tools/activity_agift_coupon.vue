<template>
	<Win @winEvent='winEvent' :width="850" :height="350">
		<div slot='content' class="coupon_list" style="padding: 20px;overflow: hidden;">
			<div class="top" style="border-bottom: 1px dashed #ccc;padding-bottom: 20px;">
				<span class="sel" v-for="(item,index) in couponType" :key='index' v-bind:class="{'on':flag == index}" @click="showCount(index)">{{item.name}}</span>
			</div>
			<div style="padding-top: 10px;position: relative;">
				<span style="font-size: 14px; color: #999999;">选择优惠券：</span>
				<section class="fr" style="width: 100%;height: auto;margin-bottom: 10px;">
					<a href="javascript:void(0)" class="unselect fr" @click="selectUnselect()">全部取消</a>
				</section>
				<section class="comList">
					<coupon ref='coupon' :list='goodsCom' :selects='selects' :max-num="5" :name='"name"' :keyName='"id"' @select='select'></coupon>
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

		selectCoupon: {
			type: Array,
			default: function() {
				return [];
			}
		}, //选中优惠券
	},
	data() {
		return {
			index: 0,
			flag2: 0,
			goodsCom: [], //优惠券显示列表
			couponLists: [], //优惠券总列表
			selects: [],
			list: [],
			couponType: [{
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
			}
			],
			flag: 0
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
		selectUnselect: function(type, list) {
			// 全选 and 全不选
			if (type == '1') {
				for (let i = 0; i < list.length; i++) {
					this.selects.push(list[i].id);
				}
			} else {
				this.selects = [];
			}
		},
		async getNoLimitCoupon() {

			let data = await http.getCouponCondition({
				data: {

				}
			});
			let couponList = [];
			data.filter(function(item) {
				item.num = 1;
				if (item.type != '6' && item.type != '7') {
					couponList.push(item);
				}
			});
			this.couponLists = couponList;
			this.goodsCom = this.filterList(this.couponLists, 0);
			setTimeout(() => {
				this.$refs.coupon.up();
			}, );
		},
		showCount: function(i) {
			this.flag = i;
			this.goodsCom = this.filterList(this.couponLists, i);
		},
		filterList: function(list, index) {
			//筛选列表
			//	            			type = (type == undefined) ? 1 : type;
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
		'selects': function() {
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
		this.selects = utils.deepCopy(this.selectCoupon);
	},
	mounted() {
		this.getNoLimitCoupon();
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