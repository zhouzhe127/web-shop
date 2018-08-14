<!--
    **实体卡应用
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<section>
		<Win :width='740' :height='700' @winEvent='getAppliedWins' :align="'right'" :ok="okStyle" :cancel="cancelStyle">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="getDetail">
					<div class="detailItem">
						<span class="fl left">卡性质：</span>
						<span class="fl right">
							<template v-if="detailObj.cardAttr == '1'">通用</template>
							<template v-if="detailObj.cardAttr == '2'">直营店</template>
							<template v-if="detailObj.cardAttr == '3'">加盟店</template>
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡类型名称：</span>
						<span class="fl right">{{detailObj.name}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡类型编号：</span>
						<span class="fl right">{{detailObj.abbr}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">编号：</span>
						<span class="fl right">{{detailObj.initCardNumber}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">适用门店：</span>
						<span class="fl right">{{getShopsName('1')}}</span>
					</div>
					<div class="detailItem" v-if="type == 'edi'">
						<span class="fl left"></span>
						<span class="fl right">
							<a href="javascript:void(0)" @click="synchronousType(0)">同步卡类型</a>
							<a href="javascript:void(0)" @click="modifyShop('1')">修改适用门店</a>
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">储值门店：</span>
						<span class="fl right">{{getShopsName('2')}}</span>
					</div>
					<div class="detailItem" v-if="type == 'edi'">
						<span class="fl left"></span>
						<span class="fl right">
							<a href="javascript:void(0)" @click="synchronousType(1)">同步卡类型</a>
							<a href="javascript:void(0)" @click="modifyShop('2')">修改储值门店</a>
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡属门店：</span>
						<span class="fl right">{{getShopsName()}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">购卡金：</span>
						<span class="fl right">{{detailObj.price}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡内初始余额：</span>
						<span class="fl right">{{detailObj.cardAmount}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡内初始积分：</span>
						<span class="fl right">{{detailObj.cardPoint}}</span>
					</div>
					<div class="detailItem">
						<span class="fl left">卡内附赠优惠券：</span>
						<span class="fl right" style="line-height: 2;margin-top: -5px;">
							<section v-if="cardCoupon == ''">
								无
							</section>
							<section v-for="(item,index) in cardCoupon" :key="index">
								{{item.name}}{{item.num}}张 {{discountName[item.type-1]}}
								<section v-if="index != cardCoupon.length - 1">,</section>
							</section>
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">有效期：</span>
						<span class="fl right">
							{{cardName[Number(detailObj.cardTimeType)]}}
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">状态：</span>
						<span class="fl right">
							<template v-if="detailObj.status == '0'">待启用</template>
							<template v-if="detailObj.status == '1'">启用</template>
							<template v-if="detailObj.status == '2'">停用</template>
						</span>
					</div>
					<div class="detailItem">
						<span class="fl left">是否允许激活:</span>
						<span class="fl right">
							<section v-if="type == 'edi'" v-for="(item,index) in goodlist" :key="index">
								<span :class="{'sign' : typeId == index}" style="float: left; display: block; width: 98px;height: 38px;border: 1px solid #999;margin-right: 15px;text-align: center;line-height:38px; cursor: pointer;background: #fff;"
								    v-on:click="tabTypes(item,index)">{{item.name}}</span>
							</section>
							<template v-if="type == 'view' && detailObj.isActivate == '1'">
								允许
							</template>
							<template v-if="type == 'view' && detailObj.isActivate == '0'">
								不允许
							</template>
						</span>
					</div>
				</div>
			</div>
		</Win>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="ass" :type='modifyShoptype' v-bind="objInfo" :detail="detail" @getAppliedWin='getResults'
		    :userData="userData" :ischain="ischain"></component>
	</section>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import getAppliedWin from './getapplied_choiceshop_win';


	export default {
		props: {
			userData: Object,
			ischain: String,
			detail: Object, //详情
			type: String, //状态
			cradTypeList: Array,
			getList: Function,
			getDetail: Function
		},
		data() {
			return {
				title: '',
				okStyle: null,
				cancelStyle: null,
				detailObj: {},
				cardCoupon: [], //关联的优惠券
				goodlist: [{ // 关联功能的数据展示列表
					'typeId': '0',
					'name': '允许'
				}, {
					'typeId': '1',
					'name': '不允许'
				}],
				typeId: this.detail.isActivate == '1' ? '0' : '1', // 关联功能 选中的状态 
				directSaletOn: [], // 适用门店下直营店选中的
				SaletOn: [], //储值门店下直营店选中的
				applyShopOn: [], //适用门店下面单店选中的
				storedShopOn: [], //储值门店下单店选中
				napaStoresOn: [], // 适用门店下加盟店选中的
				StoresOn: [], //储值门店下面加盟店选中的
				shopList: [], //选中店铺的id集合
				applyShopIds: '', //适用门店id
				depositShopIds: '', //储值门店id
				showWin: false, //弹窗默认关闭状态
				modifyShoptype: '',
				ass: '',
				objInfo: '',
				discountName: ['单品减免','整单减免','单品打折','整单打折','赠菜'],
				cardName: ['无限期',`this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1')`,`item.startCardTime + '天'`],
			};
		},
		methods: {
			getResults: function (res) {
				if (res == 'ok') {
					this.$emit('getAppliedWins', true);
					this.directSaletOn = [];
					this.SaletOn = [];
					this.applyShopOn = [];
					this.storedShopOn = [];
					this.napaStoresOn = [];
					this.StoresOn = [];
					setTimeout(() => {
						this.isDetail(this.detail);
					}, 3000);
				}
				this.showWin = false;
			},
			async getAppliedWins(res) {
				if (this.type == 'edi' && this.detail.isActivate == this.typeId && res == 'ok') {
					await this.storeActivation(this.detail);
				}
				this.$emit('getAppliedWins', res);
			},
			// 关联功能切换
			tabTypes: function (item, index) {
				this.typeId = index;
			},
			isDetail: function (item) {
				for (let i = 0; i < this.cradTypeList.length; i++) {
					if (item.cardTypeId == this.cradTypeList[i].id) {
						if (item.applyShopIds == '') {
							item.applyShopIds = this.cradTypeList[i].applyShopIds;
						}
						if (item.depositShopIds == '') {
							item.depositShopIds = this.cradTypeList[i].depositShopIds;
						}
					}
				}
				this.detailObj = item;
				if (this.detailObj.cardCoupon) {
					this.cardCoupon = JSON.parse(this.detailObj.cardCoupon);
				}
				//处理弹窗，区分是适用门店还是储值门店
				if (this.userData.currentShop.ischain == 3) {
					let dir = this.userData.currentShop.direct; //直营
					for (let i = 0; i < dir.length; i++) {
						//区分是直营还是加盟
						if (dir[i].status == '0' && this.detailObj.applyShopIds.match(dir[i].id)) {
							this.directSaletOn.push(dir[i].id);
						}
						if (dir[i].status == '0' && this.detailObj.depositShopIds.match(dir[i].id)) {
							this.SaletOn.push(dir[i].id);
						}
					}
					let nap = this.userData.currentShop.franchise; //加盟
					for (let i = 0; i < nap.length; i++) {
						if (nap[i].status == '0' && this.detailObj.applyShopIds.match(nap[i].id)) {
							this.napaStoresOn.push(nap[i].id);
						}
						if (nap[i].status == '0' && this.detailObj.depositShopIds.match(nap[i].id)) {
							this.StoresOn.push(nap[i].id);
						}
					}
				} else if (this.userData.currentShop.ischain == 0) {
					let dan = this.userData.currentShop; //加盟
					if (this.detailObj.applyShopIds.match(dan.id)) {
						this.applyShopOn.push(dan.id);
					}
					if (this.detailObj.depositShopIds.match(dan.id)) {
						this.storedShopOn.push(dan.id);
					}
				}
			},
			// judgeDiscount: function (type) {
			// 	//判断是何种折扣
			// 	// ['单品减免','整单减免','单品打折','整单打折','赠菜']
			// 	switch (type) {
			// 		case '1':
			// 			return '单品减免';
			// 			break;
			// 		case '2':
			// 			return '整单减免';
			// 			break;
			// 		case '3':
			// 			return '单品打折';
			// 			break;
			// 		case '4':
			// 			return '整单打折';
			// 			break;
			// 		case '5':
			// 			return '赠菜';
			// 			break;
			// 		default:
			// 			return '无';
			// 	}
			// },
			async synchronousType(type) {
				let data = await http.syncCard({
					data: {
						id: this.detail.id,
						cardTypeId: this.detail.cardTypeId,
						applyShop: type
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '同步卡类型成功!',
					});
					this.$emit('getAppliedWins', data);
					this.directSaletOn = [];
					this.SaletOn = [];
					this.applyShopOn = [];
					this.storedShopOn = [];
					this.napaStoresOn = [];
					this.StoresOn = [];
					setTimeout(() => {
						this.isDetail(this.detail);
					}, 2000);
				}
			},
			translateTime: function (time, type) {
				// 转换时间
				if (type) {
					return utils.format(new Date(Number(time) * 1000), 'yyyy/MM/dd');
				} else {
					return utils.format(new Date(Number(time) * 1000), 'yyyy/MM/dd hh:mm');
				}
			},
			// getCardTime: function (item) {
			// 	// 卡有效期
			// 	return cardName[Number(item.cardTimeType)];
			// 	cardName[Number(detailObj.cardTimeType)]
			// 	cardName: ['无限期',this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1'),item.startCardTime + '天']
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
			filterShopType: function () {
				let shops = [];
				// if (this.ischain == '1' || this.ischain == '2') {
				//     let brandId = this.userData.currentShop.brandId;
				//     let brandList = this.userData.currentShop.shopList.brand;
				//     for (let i = 0; i < brandList.length; i++) {
				//         if (brandId.match(brandList[i].id)) {
				//             shops = shops.concat(brandList[i].direct);
				//             shops = shops.concat(brandList[i].franchise);
				//             break;
				//         }
				//     }
				// } else 
				if (this.ischain == '3') {
					let shopsList = storage.session('shopList');
					for (let item of shopsList) {
						item.name = item.shopName;
					}
					shops = shopsList;
				} else if (this.ischain == '0') {
					shops.push(this.userData.currentShop);
				}
				return shops;
			},
			getShopsName: function (type) {
				// 获取门店名称
				let shops = this.filterShopType();
				let shopNames = '';
				if (type == '1') {
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
			async storeActivation(item) { //是否允许激活
				await http.updateActivate({
					data: {
						id: item.id
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '修改成功!',
				});
			},
			modifyShop: function (index) {
				this.showWin = true; //打开弹窗
				this.modifyShoptype = index;
				this.ass = 'getAppliedWin';
				let obj = {
					indexs: index,
					napaStoresOns: index == 1 ? this.napaStoresOn || [] : this.StoresOn || [], // 加盟店选中的
					directSaletOns: index == 1 ? this.directSaletOn || [] : this.SaletOn || [], // 直营店选中的
					StoresOn: this.StoresOn || [],
					SaletOn: this.SaletOn || [],
					applyShopOns: index == 1 ? this.applyShopOns || [] : this.storedShopOn || [],
					storedShopOn: this.storedShopOn || []
				};
				this.objInfo = obj;
			}
		},
		computed: {

		},
		components: {
			getAppliedWin,
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		},
		mounted() {
			if (this.type == 'edi') {
				this.title = '编辑实体卡';
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#bd823e',
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
			} else if (this.type == 'view') {
				this.title = '查看详情';
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
			}
			this.isDetail(this.detail);
		}
	};
</script>
<style scoped>
	.detailItem {
		padding-left: 50px;
		min-height: 50px;
		height: auto;
		width: 560px;
		font-size: 14px;
		color: #666666;
		overflow: hidden;
	}

	.detailItem .left {
		width: 115px;
		min-height: 50px;
		text-align: center;
		line-height: 50px;
	}

	.detailItem .right {
		width: 394px;
		min-height: 50px;
		height: auto;
		line-height: 50px;
	}

	.detailItem .sign {
		background: #FFF3E5 !important;
		border: 1px solid #F8931F !important;
		color: #F9911E !important;
	}

	.detailItem a {
		color: #2FA8DC;
		margin-right: 20px;
	}
</style>