<template>
	<div id="details">
		<Win :width='500' :height='480' :type="'alert'" :ok="{content:isFlag?'修改':'确定'}" @winEvent='winEvent'>
			<ul class="detailUl" slot='content'>
				<li>
					<span class="spanLeft">方案名：</span>
					<span class="spanRight">{{detail.name}}</span>
				</li>
				<li>
					<span class="spanLeft">方案类型：</span>
					<span class="spanRight">
						<template v-if="detail.type == 1">固定方案</template>
						<template v-if="detail.type == 2">自定义方案</template>
					</span>
				</li>
				<li>
					<span class="spanLeft">排序：</span>
					<span class="spanRight">{{detail.sort}}</span>
				</li>
				<li>
					<span class="spanLeft">储值金额：</span>
					<span class="spanRight">
						<template v-if="detail.type == 1">{{detail.deposit}}</template>
						<template v-if="detail.type == 2">-</template>
					</span>
				</li>
				<li>
					<span class="spanLeft">支付金额：</span>
					<span class="spanRight">
						<template v-if="detail.type == 1">{{detail.payment}}</template>
						<template v-if="detail.type == 2">-</template>
					</span>
				</li>
				<li>
					<span class="spanLeft">赠送条件：</span>
					<span class="spanRight">
						<template v-if="detail.type == 1">
							-
						</template>
						<template v-if="detail.type == 2">
							<template v-if="detail.depositRule == 2">
								{{detail.deposit}} &lt;=支付金额 &lt;= {{detail.payment}}
							</template>
							<template v-if="detail.depositRule == 1">
								支付金额 = {{detail.deposit}}
							</template>
							<template v-if="detail.depositRule == 3">
								支付金额 &gt;= {{detail.deposit}}
							</template>
							<template v-if="detail.depositRule == 4">
								支付金额 &lt;= {{detail.deposit}}
							</template>
						</template>
					</span>
				</li>
				<li>
					<span class="spanLeft">赠送内容：</span>
					<span class="spanRight">
						<template v-if="detail.type == 1">
							<template v-if="detail.giftAmount == 0 && detail.giftPoint == 0 && couponIds == ''">
								-
							</template>
							<template v-if="detail.giftAmount == 0 && detail.giftPoint != 0">
								赠送{{detail.giftPoint}}积分
							</template>
							<template v-if="detail.giftAmount != 0 && detail.giftPoint == 0">
								赠送金额{{detail.giftAmount}}元
							</template>
							<template v-if="detail.giftAmount != 0 && detail.giftPoint != 0">
								赠送金额{{detail.giftAmount}}元，赠送{{detail.giftPoint}}积分
							</template>
							<template v-if="couponIds">
								<template v-for="(item,index) in couponIds">
									赠送{{item.name}}优惠券{{item.num}}张
									<template v-if="index != couponIds.length -1">
										，
									</template>
								</template>

							</template>
						</template>
						<template v-if="detail.type == 2">
							<template v-if="detail.giftAmountRule == 0 && detail.giftPointRule == 0">
								-
							</template>
							<template v-if='detail.giftAmountRule == 1'>
								赠送固定储值金额{{detail.giftAmount}}元,
							</template>
							<template v-if="detail.giftAmountRule == 2">
								按比例赠送储值金额{{detail.giftAmount}}%,
							</template>
							<template v-if="detail.giftPointRule == 1">
								赠送固定积分{{detail.giftPoint}}分
							</template>
							<template v-if="detail.giftPointRule == 2">
								按比例赠送积分{{detail.giftPoint}}%
							</template>
						</template>
					</span>
				</li>
				<li>
					<span class="spanLeft">渠道：</span>
					<span class="spanRight">
						<template v-if="detail.channel == 12 || detail.channel == 21">
							微信、POS收银
						</template>
						<template v-if="detail.channel == 1">
							微信
						</template>
						<template v-if="detail.channel == 2">
							POS收银
						</template>
					</span>
				</li>
				<!-- 适用门店 -->
				<li>
					<span class="spanLeft">适用门店：</span>
					<span class="spanRight">
						{{shopName}}
					</span>
				</li>
				<li>
					<span class="spanLeft">操作人：</span>
					<span class="spanRight">{{detail.createUid}}</span>
				</li>
			</ul>
		</Win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	export default {
		props: {
			id: [String, Number],
			shopsList: Array //店铺列表
		},
		data() {
			return {
				detail: '', //详情内容
				couponIds: [], //方案所关联的优惠券
				isFlag: false,
				shopName: '',
				ischain: ''
			};
		},
		methods: {
			async lookDetail() {
				let data = await http.getDetailDep({
					data: {
						id: this.id,
						shopId: storage.session('shopId')
					}
				});
				this.detail = data;
				if (data.couponIds) {
					this.couponIds = JSON.parse(data.couponIds);
				}
				if (this.ischain == 3) {
					this.getshopName();
				} else {
					this.shopName = storage.session('userShop').currentShop.name;
				}
			},
			winEvent(str) {
				this.$emit('winEvent', str);
			},
			getshopName: function () {
				let shopName = '';
				if (this.detail.depositShopIds == '') {
					for (let item of this.shopsList) {
						shopName += item.shopName + ',';
					}
				} else {
					let shopIds = this.detail.depositShopIds.split(',');
					for (let item of this.shopsList) {
						for (let items of shopIds) {
							if (items == item.id) {
								shopName += item.shopName + ',';
								break;
							}
						}
					}
				}
				this.shopName = shopName;
			}
		},
		mounted: function () {
			this.userShop = storage.session('userShop');
			this.currentShop = this.userShop.currentShop;
			this.ischain = this.currentShop.ischain;
			if (this.currentShop.ischain == 0 || this.currentShop.ischain == 3) {
				this.isFlag = !this.isFlag;
			}
			this.lookDetail();
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		}
	};
</script>
<style scoped>
	.content {
		width: 100%;
		height: 200px;
		text-align: center;
		line-height: 200px;
		font-size: 18px;
		color: #333;
	}

	.detailUl {
		width: 100%;
		height: 100%;
		padding: 36px 77px;
	}

	.detailUl li {
		width: 100%;
		height: auto;
		display: table;
		margin-bottom: 24px;
	}

	.detailUl li .spanLeft {
		width: 20%;
		display: table-cell;
		text-align: end;
		vertical-align: middle;
	}

	.detailUl li .spanRight {
		width: 70%;
		line-height: 24px;
		padding-left: 32px;
		display: table-cell;
	}
</style>