<!--
    **制卡列详情
    * 
    * 孔伟研
    * *
    * 
-->
<template>
	<win @winEvent="makeCardDetialWim" :align="'right'" :width="580" :height="500" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content">
			<div class="getDetail">
				<div class="detailItem">
					<span class="fl">卡性质：</span>
					<span class="fl">
						<template v-if="detailObj.cardAttr == '1'">通用</template>
						<template v-if="detailObj.cardAttr == '2'">直营店</template>
						<template v-if="detailObj.cardAttr == '3'">加盟店</template>
					</span>
				</div>
				<div class="detailItem">
					<span class="fl">卡类型名称：</span>
					<span class="fl">{{detailObj.name}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">卡类型编号：</span>
					<span class="fl">{{detailObj.abbr}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">编号：</span>
					<span class="fl">{{detailObj.initCardNumber}} {{detailObj.initCardNumber}}-{{detailObj.num}} {{detailObj.num}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">适用门店：</span>
					<span class="fl">{{aName}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">储值门店：</span>
					<span class="fl">{{bName}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">卡属门店：</span>
					<span class="fl">{{cName}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">购卡金：</span>
					<span class="fl">{{detailObj.price}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">卡内初始余额：</span>
					<span class="fl">{{detailObj.cardAmount}}</span>
				</div>
				<div class="detailItem">
					<span class="fl">卡内初始积分：</span>
					<span class="fl">{{detailObj.cardPoint}}</span>
				</div>
				<div class="detailItem">
					<span class="fl" style="width: 112px;">卡内附赠优惠券：</span>
					<span v-if="detailObj.cardCoupon && detailObj.cardCoupon.length >= 1" v-for="coupon in detailObj.cardCoupon" class="fl">
						{{coupon.name}}({{coupon.num}}张),
					</span>
					<span v-if="detailObj.cardCoupon.length == 0" class="fl" style="width: 395px;">无</span>
				</div>
				<div class="detailItem">
					<span class="fl">享有折扣：</span>
					<span v-if="detailObj.discount != '100'" class="fl">
						{{detailObj.discount / 10}}折
					</span>
					<span v-if="detailObj.discount == '100'" class="fl">无折扣</span>
				</div>
				<div class="detailItem">
					<span class="fl">有效期：</span>
					<span class="fl">
						{{cardTimename[Number(detailObj.cardTimeType)]}}
					</span>
				</div>
				<div class="detailItem">
					<span class="fl">状态：</span>
					<span class="fl">
						<template v-if="detailObj.status == '0'">待启用</template>
						<template v-if="detailObj.status == '1'">启用</template>
						<template v-if="detailObj.status == '2'">停用</template>
					</span>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				shopId: '',
				title: '查看详情',
				okStyle: null,
				cancelStyle: null,
				printDetial: null,
				ischain: '',
				userData: '',
				aName: '', //适用门店
				bName: '', //储值门店
				cName: '', //卡属门店
				cardTimename: ['无限期',`this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1')`,`item.startCardTime + '天'`],
			};
		},
		components: {
			win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.ischain = this.userData.currentShop.ischain; // 0为单店 3为品牌
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#a0a0a0',
					color: '#fff'
				}
			};
			this.aName = this.getShopsName('1');
			this.bName = this.getShopsName('2');
			this.cName = this.getShopsName();
		},
		props: {
			detailObj: Object, //详情
		},
		methods: {
			//监听传值到主页面
			makeCardDetialWim: function (res) {
				this.$emit('makeCardDetialWim', res);
			},
			filterShopType: function () {
				let shops = [];
				if (this.ischain == '1' || this.ischain == '2') {
					let brandId = this.userData.currentShop.brandId;
					let brandList = this.userData.currentShop.shopList.brand;

					for (let i = 0; i < brandList.length; i++) {
						if (brandId.match(brandList[i].id)) {
							shops = shops.concat(brandList[i].direct);
							shops = shops.concat(brandList[i].franchise);
							break;
						}
					}

				} else if (this.ischain == '3') {
					let direct = this.userData.currentShop.direct;
					let franchise = this.userData.currentShop.franchise;
					direct.filter(function (item, index) {
						if (item.status != '0') {
							direct.splice(index, 1);
						}
					});

					franchise.filter(function (item, index) {
						if (item.status != '0') {
							direct.splice(index, 1);
						}
					});

					shops = shops.concat(direct);
					shops = shops.concat(franchise);
				} else if (this.ischain == '0') {
					shops = this.userData.shopList.noBrand;
				}
				return shops;
			},
			getShopsName: function (type) {
				// 获取门店名称
				let shops = this.filterShopType();
				let shopNames = '';
				if (type == '1') {
					// if (this.ischain == '0') {
					//     return this.userData.currentShop.name;
					// }
					let applyShopIds = String(this.detailObj.applyShopIds);

					if (applyShopIds == '0') {
						shopNames = '仅发卡门店';
					} else if (applyShopIds == '-1') {
						shopNames = '无';
					} else {
						for (let i = 0; i < shops.length; i++) {
							if (applyShopIds.match(shops[i].id)) {
								shopNames += shops[i].name + ',';
							}
						}
						shopNames = shopNames.substring(0, shopNames.length - 1);
					}
				} else if (type == '2') {
					// if (this.ischain == '0') {
					//     return this.userData.currentShop.name;
					// }
					let depositShopIds = String(this.detailObj.depositShopIds);
					if (depositShopIds == '0') {
						shopNames = '仅发卡门店';
					} else if (depositShopIds == '-1') {
						shopNames = '无';
					} else {
						for (let i = 0; i < shops.length; i++) {
							if (depositShopIds.match(shops[i].id)) {
								shopNames += shops[i].name + ',';
							}
						}
						shopNames = shopNames.substring(0, shopNames.length - 1);
					}
				} else {
					let shopsId = String(this.detailObj.shopId);
					for (let i = 0; i < shops.length; i++) {
						if (shopsId.match(shops[i].id)) {
							shopNames += shops[i].name;
						}
					}
				}
				return shopNames;
			},
			// 转换时间
			translateTime: function (time) {
				return utils.format(new Date(Number(time) * 1000), 'yyyy/MM/dd hh:mm');
			},
			// getCardTime: function (item) {
			// 	// 卡有效期
			// 	//cardTimename: ['无限期',this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1'),item.startCardTime + '天']
			// 	//cardTimename[Number(detailObj.cardTimeType)]
			// 	let self = this;
			// 	switch (Number(item.cardTimeType)) {
			// 		case 0:
			// 			return '无限期';
			// 			break;
			// 		case 1:
			// 			return self.translateTime(item.startCardTime, '1') + '-' + self.translateTime(item.endCardTime, '1');
			// 			break;
			// 		case 2:
			// 			return item.startCardTime + '天';
			// 			break;
			// 		default:
			// 	}
			// },
		}
	};
</script>
<style type="text/css" scoped>
	.detailItem {
		padding-left: 50px;
		height: auto;
		min-height: 50px;
		line-height: 50px;
		width: 560px;
		font-size: 14px;
		color: #666666;
		overflow: hidden;
	}
</style>