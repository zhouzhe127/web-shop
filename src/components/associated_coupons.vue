/**
* @Author: miaochuan.sha
* @Date: 2018-09-05 10:54:43
 * @Last Modified by: ruokun.ma
 * @Last Modified time: 2018-12-17 09:56:42
* @Module:关联优惠券弹窗
**/
<template>
	<section id="addCount">
		<Win @winEvent='winEvent' :width='900' :height='350'>
			<span slot='title'>添加关联优惠券</span>
			<section style="padding: 20px 50px;" :slot="'content'">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane v-for="(item,index) in CountList" :key="index" :label="item.name" :name="item.id" v-on:click="showCount(index)">
						<div class="clearfix">
							<el-button type="info" v-on:click="wholeOffCom" class="fr">全部取消</el-button>
							<!-- <a href="javascript:void(0)" class="unselect fr" v-on:click="wholeOffCom">全部取消</a> -->
						</div>
						<section class="comList">
							<coupon :list='goodsCom' :selects='selects' :max-num="5" :name='"name"' :keyName='"id"' @select='select' :isShowaddAndSubtract='isShowaddAndSubtract'></coupon>
						</section>
					</el-tab-pane>
				</el-tabs>
			</section>
		</Win>
	</section>
</template>
<script type="text/javascript">
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		props: {
			//couponList: Array, //所有优惠券列表
			selectCoupon: {
				type: Array,
				default: function() {
					return [];
				}
			}, //选中优惠券
			isShowaddAndSubtract: {
				type: Boolean,
				default: true
			},
			isToHeavy: { //是否去重
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				index: 0,
				flag2: 0,
				goodsCom: [], //优惠券显示列表
				CountList: [
					{
						'name': '全部',
						'id': '0'
					},
					{
						'name': '满减优惠券',
						'id': '1'
					},
					{
						'name': '折扣优惠券',
						'id': '2'
					},
					{
						'name': '赠菜优惠券',
						'id': '3'
					},
					{
						'name': '代金券',
						'id': '4'
					},
					{
						'name': '第二件商品券',
						'id': '5'
					},
					{
						'name': '买送券',
						'id': '6'
					},
					{
						'name': '定额券',
						'id': '7'
					}
				],
				selects: [], //选中的优惠券的数组
				list: [],
				couponList: [], //优惠券的列表
				activeName: '0'
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
			//全部取消
			wholeOffCom: function() {
				this.selects = [];
			},
			arrayfilter: function(array, array2) { //两个数组中过滤不同的元素
				let result = [];
				for (let i = 0; i < array.length; i++) {
					let obj = array[i];
					let id = obj.id;
					let isExist = false;
					for (let j = 0; j < array2.length; j++) {
						let aj = array2[j];
						let n = aj.id;
						if (n == id) {
							isExist = true;
							break;
						}
					}
					if (!isExist) {
						result.push(obj);
					}
				}
				return result;
			},
			async getCouponList() { //获取所有的优惠券
				let data = await http.getGetCouponCondition({});
				let coupons = [];
				for (let item of data) {
					item.num = 1;
					if (item.type != 7 && item.fromType != 2) { //type7是积分卡券
						coupons.push(item);
					}
				}

				this.couponList = coupons;
				if (this.isToHeavy) {
					this.couponList = this.arrayfilter(this.couponList, this.selectCoupon);
					this.wholeOffCom();
				}
				this.goodsCom = this.couponList; //默认展示全部
			},
			handleClick(tab) {
				//选择不同优惠券显示列表
				let index = tab.index;
				this.goodsCom = [];
				switch (Number(index)) {
					case 0:
						this.goodsCom = this.couponList;
						break;
					case 1:
						for (let item of this.couponList) {
							if (item.type == 1 || item.type == 2) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 2:
						for (let item of this.couponList) {
							if (item.type == 3 || item.type == 4) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 3:
						for (let item of this.couponList) {
							if (item.type == 5) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 4:
						for (let item of this.couponList) {
							if (item.type == 6) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 5:
						for (let item of this.couponList) {
							if (item.type == 9) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 6:
						for (let item of this.couponList) {
							if (item.type == 10) {
								this.goodsCom.push(item);
							}
						}
						break;
					case 7:
						for (let item of this.couponList) {
							if (item.type == 11) {
								this.goodsCom.push(item);
							}
						}
						break;
				}
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
				import( /* webpackChunkName:'win' */ 'src/components/win'),
			coupon: () =>
				import( /* webpackChunkName:'coupon' */ 'src/components/coupon'),
		},
		created() {
			this.getCouponList(); //获取优惠券的列表
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
		background: #E1BB4A;
		color: #fff;
	}

	.comList {
		width: 100%;
		margin-top: 10px;
		height: auto;
		overflow: hidden;
		margin-bottom: 30px;
	}
</style>