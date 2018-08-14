/** * 任务系统 * *miaochuan.sha */
<template>
	<section id="addCount">
		<Win @winEvent='winEvent' :width='900' :height='350' :ok="okStyle">
			<span slot='title'>添加关联优惠券</span>
			<section :slot="'content'" class="addcoupon">
				<div class="couponType">
					<div v-for="(item,index) in bannerList" class="diel" v-bind:class="{'on':bannerIndex == index}" @click="choiceType(item.type,index)"
					    :key="index">{{item.name}}</div>
				</div>
				<div class="top" v-if="bannerIndex == '0'">
					<span class="sel" v-for="(item,index) in CountList" :key='index' v-bind:class="{'on':flag2 == index}" @click="showCount(index)">{{item.name}}</span>
				</div>
				<div class="choicecoupon">
					<span>选择优惠券：</span>
					<section class="fr choices">
						<a href="javascript:void(0)" class="unselect fr" v-on:click="wholeOffCom">全部取消</a>
						<a href="javascript:void(0)" class="check fr" v-on:click="wholeOnCom" style="margin-right: 1px;">全部选择</a>
					</section>
					<section class="comList" v-if="bannerIndex == '0'">
						<div class="nolist" v-if="goodsCom.length == '0'">-&nbsp;&nbsp;暂无该类型优惠券&nbsp;&nbsp;-</div>
						<coupon v-else :list='goodsCom' :selects='selects' :max-num="10" :name='"name"' :keyName='"id"' @select='select'></coupon>
					</section>
					<section class="comList" v-if="bannerIndex == '1'">
						<div class="nolist" v-if="integralCard.length == '0'">-&nbsp;&nbsp;暂无积分卡&nbsp;&nbsp;-</div>
						<coupon v-else :list='integralCard' :selects='integralselects' :max-num="10" :name='"name"' :keyName='"id"' @select='selectIntegralCard'></coupon>
					</section>
					<section class="comList" v-if="bannerIndex == '2'">
						<div class="nolist" v-if="creditCard.length == '0'">-&nbsp;&nbsp;暂无积分商品&nbsp;&nbsp;-</div>
						<coupon v-else :list='creditCard' :selects='creditselects' :max-num="10" :name='"name"' :keyName='"id"' @select='selectcredit'></coupon>
					</section>
					<section class="turn-page" v-if="bannerIndex == '2'">
						<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
					</section>
				</div>
			</section>
		</Win>
	</section>
</template>
<script>
	import http from 'src/manager/http';
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
			selectIntegral: {
				type: Array,
				default: function () {
					return [];
				}
			}, //选中积分卡
			selectIntegralgoods: {
				type: Array,
				default: function () {
					return [];
				}
			}, //选中积分商品
		},
		data() {
			return {
				index: 0,
				flag2: 0,
				goodsCom: [], //优惠券显示列表
				bannerList: [{
					name: '优惠券',
					type: 0
				}, {
					name: '积分卡',
					type: 1
				}, {
					name: '积分商品',
					type: 2
				}],
				bannerIndex: 0,
				CountList: [{
					'name': '单品减免'
				}, {
					'name': '整单减免'
				}, {
					'name': '单品折扣'
				}, {
					'name': '整单折扣'
				}, {
					'name': '赠品券'
				}, {
					'name': '代金券'
				}],
				selects: [], //优惠券选中的对象列表
				list: [], //优惠券的列表
				integralCard: [], //积分卡列表
				integralselects: [], //积分卡选中的
				page: 1,
				num: 10,
				pageNum: '0', //总页数
				creditCard: [], //积分商品
				creditselects: [], //积分商品
				okStyle: null
			};

		},
		methods: {
			// 切换类型(更改历史记录)
			choiceType(type, index) {
				this.bannerIndex = index;
				if (type == 1) {
					this.integralCard = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 7) {
							this.integralCard.push(this.couponList[i]);
						}
					}
				} else if (type == 2) {
					this.getCredit();
				}
			},
			select(obj) { //炫优惠券的方法
				this.selects = obj.selectList;
				this.list = obj.list;
			},
			selectIntegralCard: function (obj) { //选积分卡的方法
				this.integralselects = obj.selectList;
			},
			selectcredit: function (obj) {
				this.creditselects = obj.selectList;
			},
			winEvent(str) {
				this.$emit('winEvent', {
					status: str,
					data: {
						couponselect: this.selects, //优惠券
						integralCardselect: this.integralselects, //积分卡选中的
						creditCardselect: this.creditselects, //积分商品选中的
						list: this.list
					}
				});
			},
			showCount: function (index) {
				this.flag2 = index;
				//选择不同优惠券显示列表
				if (index == 0) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 1) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 1) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 2) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 2) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 3) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 3) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 4) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 4) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 5) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				} else if (index == 5) {
					this.goodsCom = [];
					for (let i = 0; i < this.couponList.length; i++) {
						if (this.couponList[i].type == 6) {
							this.goodsCom.push(this.couponList[i]);
						}
					}
				}
			},
			//全部选择
			wholeOnCom: function () {
				if (this.bannerIndex == '0') {
					this.selects = [];
					for (let i = 0; i < this.goodsCom.length; i++) {
						let obj = {};
						obj.id = this.goodsCom[i].id;
						obj.name = this.goodsCom[i].name;
						obj.num = 1;
						this.selects.push(obj);
					}
				} else if (this.bannerIndex == '1') {
					this.integralselects = [];
					for (let i = 0; i < this.integralCard.length; i++) {
						let obj = {};
						obj.id = this.integralCard[i].id;
						obj.name = this.integralCard[i].name;
						obj.num = 1;
						this.integralselects.push(obj);
					}
				} else if (this.bannerIndex == '2') {
					this.creditselects = [];
					for (let i = 0; i < this.creditCard.length; i++) {
						let obj = {};
						obj.id = this.creditCard[i].id;
						obj.name = this.creditCard[i].name;
						obj.num = 1;
						this.creditselects.push(obj);
					}
				}
			},
			//全部取消
			wholeOffCom: function () {
				if (this.bannerIndex == 0) {
					this.selects = [];
				} else if (this.bannerIndex == 1) {
					this.integralselects = [];
				} else if (this.bannerIndex == 2) {
					this.creditselects = [];
				}
			},
			async getCredit() {
				let data = await http.getActivityGoodsList({
					data: {
						page: this.page,
						num: this.num
					}
				});
				if (data) {
					this.creditCard = data.list;
					this.creditCard.forEach(function (item) {
						item.num = 1;
					});
					this.pageNum = data.total;
				}
			},
			pageChange: function (obj) {
				this.page = obj.page;
				this.num = obj.num;
				this.getCredit();
			},
		},
		watch: {

		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			coupon: () =>
				import ( /* webpackChunkName:'coupon' */ 'src/components/coupon'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		},

		created() {
			this.goodsCom = utils.deepCopy(this.couponList);
			this.selects = utils.deepCopy(this.selectCoupon);
			this.integralselects = utils.deepCopy(this.selectIntegral);
			this.creditselects = utils.deepCopy(this.selectIntegralgoods);
		},
		mounted() {
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			};
		}
	};
</script>
<style scoped>
	.addcoupon {
		padding: 20px 50px;
	}

	.addcoupon .couponType {
		width: 100%;
		height: 40px;
		margin-bottom: 15px;
	}

	.addcoupon .couponType .diel {
		display: inline-block;
		width: 120px;
		height: 40px;
		font-size: 16px;
		background: #FFF;
		border: 1px solid #E9C048;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		color: #F8931F;
	}

	.addcoupon .couponType .on {
		background: #F8931F;
		color: #fff;
	}

	.addcoupon .top {
		border-bottom: 1px dashed #ccc;
		padding-bottom: 20px;
	}

	.addcoupon .choicecoupon {
		padding-top: 10px;
		position: relative;
	}

	.addcoupon .choicecoupon .nolist {
		width: 800px;
		text-align: center;
		line-height: 70px;
		font-size: 24px;
		color: #E0E0E0;
	}

	.addcoupon .choicecoupon span {
		font-size: 14px;
		color: #999999;
	}

	.addcoupon .choicecoupon .choices {
		width: 100%;
		height: auto;
		margin-bottom: 10px;
	}

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

	.addcoupon .turn-page {
		margin: 10px 0 30px 0;
	}
</style>