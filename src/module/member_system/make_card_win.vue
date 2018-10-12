<!--
    **新建制卡
    *
-->
<template>
	<div id="create-card">
		<div class="content-box">
			<div class="content-title">
				<span class="titles">制卡填写</span>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">关联卡类型</span>
				<a href="javascript:void(0)" class="fl blue concent-width" @click="choseCardType">选择卡类型</a>
				<span class="fl sub-heading" v-if="cradTypeIndex != -1">已选择{{cradTypeList[cradTypeIndex].name}}</span>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">卡属门店</span>
				<span class="fl sub-heading" v-if="ischain == '0'" style="width: auto;">{{currentShop.name}}</span>
				<a href="javascript:void(0)" class="fl blue concent-width" @click="choseShop" v-if="ischain == '3'">选择门店</a>
				<span class="fl sub-heading" v-if="shopInfo != ''">已选择{{shopInfo}}</span>
			</div>
			<div class="content-box" v-show="shopList.length >= 1" style="overflow: initial;">
				<span class="fl sub-heading"></span>
				<div class="shopInfoList">
					<div class="shop-head">
						<span class="fl pitchOn" v-if="ischain == '0'">{{currentShop.name}}</span>
						<span class="fl" :class="shopInfoIndex == index ? 'pitchOn' : 'shopNames'" v-if="ischain == '3'" @click="getShopDetail(item,index)"
						    v-for="(item,index) in shopList" :key="index">
							{{item.name}}
							<i @click="delItem(index,item)"></i>
						</span>
					</div>
					<div class="shop-content">
						<div class="fl" style="height: 80px;line-height: 80px;">
							<span class="fl" style="height: 80px;width: 120px;text-indent: 15px;text-align: center;">卡属门店编号</span>
							<span class="fl" style="height: 80px;">{{currentShop.shopNumber}}</span>
						</div>
						<div class="fl" style="margin-bottom: 20px;position: relative;">
							<span class="fl sub-heading required">初始卡编号</span>
							<div class="content-input concent-width fl" style="width: 200px;">
								<input type="text" placeholder="0000 0000" maxlength="8" class="fl" v-model="currentShop.initCardNumber" />
							</div>
							<span @click.stop @click="showTips('tip1')" class="fl clickTip" id="tips1"></span>
							<span v-if="isNo" class="fl tipContent">默认从 0000 0001 开始至制卡数量为止</span>
						</div>
						<div class="fl" style="margin-bottom:20px; position: relative;">
							<span class="fl sub-heading required">制卡数量</span>
							<div class="content-input concent-width fl" style="width: 200px;">
								<input type="text" placeholder="0000 0000" class="fl" maxlength="8" v-model="currentShop.num" />
							</div>
							<span @click.stop @click="showTips('tip2')" class="fl clickTip" id="tips2"></span>
							<span v-if="isNum" class="fl tipContent">制卡时，卡号连贯，根据制卡数量计算初始和末位卡号</span>
						</div>
						<!-- 是否允许制卡 -->
						<div class="fl" style="margin-bottom: 20px;position: relative;">
							<span class="fl sub-heading required">是否允许门店激活</span>
							<template v-if="ischain !== '3'" v-for="(item,index) in goodlist">
								<span v-on:click="tabTypes(index,item)" :key="index" v-if="item.type" :class="type == item.isActivate ? 'signa' : ''" style="float: left; display: block; width: 98px;height: 38px;border: 1px solid #999;margin-right: 15px;text-align: center;line-height:38px; cursor: pointer;background: #fff;">{{item.name}}</span>
							</template>
							<template v-if="ischain == '3'" v-for="(item,index) in goodlist">
								<span v-on:click="tabTypes(index,item)" :key="index" v-if="item.type" :class="shopList[shopInfoIndex] && shopList[shopInfoIndex].isActivate == item.isActivate ? 'signa' : ''"
								    style="float: left; display: block; width: 98px;height: 38px;border: 1px solid #999;margin-right: 15px;text-align: center;line-height:38px; cursor: pointer;background: #fff;">{{item.name}}</span>
							</template>
						</div>
						<div class="fl" style="height: 80px;line-height: 80px;" v-if="cradTypeIndex != '-1'">
							<span class="fl" style="height: 80px;width: 120px;text-indent: 15px;text-align: center;">最终展示</span>
							<span class="fl" style="height: 80px;">{{returnCard()}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content-box">
			<div class="content-title">
				<span class="titles">发卡设置</span>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">购卡金额</span>
				<div class="content-input concent-width fl">
					<input type="number" placeholder="0.00" v-model="cardObj.price" oninput="if(value.length>7)value=value.slice(0,7)" class="fl"
					/>
					<span class="fl">元</span>
				</div>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">卡内余额</span>
				<div class="content-input concent-width fl">
					<input type="number" placeholder="0.00" v-model="cardObj.cardAmount" oninput="if(value.length>7)value=value.slice(0,7)" class="fl"
					/>
					<span class="fl">元</span>
				</div>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">卡内积分</span>
				<div class="content-input concent-width fl">
					<input type="number" placeholder="0" v-model="cardObj.cardPoint" oninput="if(value.length>7)value=value.slice(0,7)" class="fl"
					/>
					<span class="fl">分</span>
				</div>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">卡内优惠券</span>
				<a href="javascript:void(0)" class="fl concent-width addclassify" style="border: none;background-position: 35px center;"
				    @click="openCouponWin">选择关联优惠卷</a>
				<span class="fl sub-heading" v-show="selects && selects.length >= 1">已关联{{selects.length}}张优惠券</span>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">享有折扣</span>
				<div class="content-input concent-width fl">
					<input type="text" v-model="cardObj.discount" oninput="if(value.length>1)value=value.slice(0,2)" class="fl" />
					<span class="fl">折</span>
				</div>
			</div>
			<div class="content-box">
				<span class="fl sub-heading">实体卡有效期</span>
				<div class="checkList">
					<span :class="cardTimeIndex == index ? 'checkOn' : ''" v-for="(item,index) in cardValidity" :key="index" @click="choseCardTimeType(index)">{{item.name}}</span>
				</div>
			</div>
			<div class="content-box" style="height:50px;" v-show="cardTimeIndex == 1">
				<span class="fl sub-heading"></span>
				<div class="concent-width fl" style="width: 240px;margin-right: 15px;cursor: pointer;">
					<calendar @throwTime="thisStartTime" :time.sync="startCardTime" :only="false" style="width: 200px;text-align: center;height: 38px;line-height: 38px;border-left: none;float: left;"
					    readonly></calendar>
					<!-- <span class="fl tri-down"></span> -->
				</div>
				<div class="concent-width fl" style="width: 240px;cursor: pointer;">
					<calendar @throwTime="thisEndTime" :time.sync="endCardTime" :only="false" :uid="'mycalendar2'" style="width: 200px;text-align: center;height: 38px;line-height: 38px;border-left: none;float: left;"
					    readonly></calendar>
					<!-- <span class="fl tri-down"></span> -->
				</div>
			</div>
			<div class="content-box" v-show="cardTimeIndex == 2">
				<span class="fl sub-heading"></span>
				<span class="fl items">发卡日起</span>
				<div class="content-input concent-width fl" style="width: 110px;">
					<input type="number" placeholder="0" v-model="cardObj.startCardTime" oninput="if(value.length>3)value=value.slice(0,3)" class="fl"
					    style="width: 70px;" />
					<span class="fl">天</span>
				</div>
				<span class="fl items">内有效</span>
			</div>
			<div class="content-box">
				<span class="fl sub-heading"></span>
				<a href="javascript:void(0)" class="fl gray" style="width: 200px;margin-right: 15px;" @click="closePage">返回</a>
				<a href="javascript:void(0)" class="fl yellow" style="width: 200px;" @click="addCard">开始制卡</a>
			</div>
		</div>
		<couponwin v-if="couponShow" @getCoupon="getCouponList" :select="selects"></couponwin>
		<typewin v-if="typeShow" @getType="getType" :cradTypeList="cradTypeList" :cradTypeIndex='cradTypeIndex'></typewin>
		<shopwin v-if="shopShow" @getShop="getShop" :shop="shopList" :ondirectSalet="directSaletOn" :onnapaStores='napaStoresOn'
		    :IshopId="IshopId"></shopwin>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	// import global from 'src/manager/global';
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				ischain: null, // 0为单店 3为品牌
				cradTypeIndex: -1, //选中的卡类型下标
				cradTypeList: [], //卡类型列表
				shopList: [], // 店铺列表
				selects: [], // 选中的优惠券
				shopInfo: '', // 已选择的店铺名
				directSaletOn: [], // 直营店选中的
				napaStoresOn: [], // 加盟店选中的
				currentShop: {}, //当前操作的店铺
				shopInfoIndex: 0, // 默认为第一个
				cardObj: { //提交用的数据
					cardTypeId: '',
					shopCardConfig: '',
					price: '',
					cardAmount: '',
					cardPoint: '',
					cardCoupon: this.selects,
					discount: '',
					cardTimeType: 0,
					startCardTime: '',
					endCardTime: ''
				},
				cardValidity: [{
					'name': '无'
				}, {
					'name': '指定时间'
				}, {
					'name': '相对时间'
				}],
				cardTimeIndex: 0, // 有效期默认为0
				startCardTime: new Date().getTime(),
				endCardTime: new Date().getTime(),
				goodlist: [{ // 关联功能的数据展示列表
					'type': '1',
					'name': '允许',
					'isActivate': '1'
				}, {
					'type': '0',
					'name': '不允许',
					'isActivate': '0'
				}],
				type: '1', // 关联功能 选中的状态 单店
				IshopId: '', //已经制过卡的门店的数组
				isNo: false, //是否显示初始卡编号文字提示
				isNum: false, //是否显示制卡数量文字提示
				couponShow: false, //选择优惠券弹窗
				typeShow: false, //选择卡类型弹窗
				shopShow: false, //选择门店弹窗
			};
		},
		props: {},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
			couponwin: () =>
				import ( /*webpackChunkName: 'make_card_couponwin'*/ './make_card_couponwin'),
			typewin: () =>
				import ( /*webpackChunkName: 'make_card_typewin'*/ './make_card_typewin'),
			shopwin: () =>
				import ( /*webpackChunkName: 'make_card_shopwin'*/ './make_card_shopwin')
		},
		mounted() {
			let userData = storage.session('userShop');
			this.ischain = userData.currentShop.ischain; // 0为单店 3为品牌
			// 单店使用
			let shop = [];
			let shopObj = {
				'shopId': userData.currentShop.id,
				'name': userData.currentShop.name,
				'shopNumber': userData.currentShop.shopNumber,
				'initCardNumber': 0,
				'num': 0,
			};
			shop.push(shopObj);
			this.shopList = (this.ischain == '0') ? shop : [];
			this.currentShop = (this.ischain == '0') ? shopObj : {};
			document.addEventListener('click', () => {
				this.isNo = false;
				this.isNum = false;
			});
		},
		methods: {
			// 关联功能切换
			tabTypes: function (index, item) {
				this.shopList[this.shopInfoIndex].isActivate = item.isActivate;
				this.type = item.type;
			},
			//选择店铺
			choseShop() {
				if(this.cradTypeIndex == -1){
					this.errorShow('请关联卡类型!')
					return false;
				}
				this.shopShow = true;
			},
			//接收选择门店弹窗
			getShop(res, list) {
				if (res == 'ok') {
					for (let key in list) {
						this[key] = list[key];
					}

					this.shopInfoIndex = this.shopList.length - 1;

					let obj = {
						'shopNumber': '',
						'num': '',
						'initCardNumber': ''
					};
					this.directSaletOn = list.directSaletOn;
					this.napaStoresOn = list.napaStoresOn;
					this.currentShop = (this.shopList.length >= 1) ? this.shopList[this.shopInfoIndex] : obj;
				}
				this.shopShow = false;
			},
			//选择卡类型
			choseCardType() {
				this.typeShow = true;
			},
			//接收卡类型弹窗
			getType(res, index, cradTypeList, hasshopIds) { //eslint-disable-line
				this.typeShow = false;
				if (res == 'ok') {
					this.cradTypeIndex = index;
					//console.log(this.cradTypeIndex)
					this.cradTypeList = cradTypeList;
					this.IshopId = hasshopIds.split(',');
				}
			},
			//选择优惠券
			openCouponWin() {
				this.couponShow = true;
			},
			//展示tips
			showTips(type) {
				type == 'tip1' ? (this.isNo = true, this.isNum = false) : (this.isNum = true, this.isNo = false);
			},
			getShopDetail(item, index) {
				// 获取列表详情
				this.currentShop = utils.deepCopy(item);
				this.shopInfoIndex = index;
				this.shopList.splice(index, 1, this.currentShop);
			},
			delItem(index, item) {
				// 删除该项
				this.shopList.splice(index, 1);
				this.currentShop = utils.deepCopy(this.shopList[this.shopList.length - 1]);
				this.shopInfoIndex = this.shopList.length - 1;

				let id = item.shopId;
				let shopInfo = '';
				let type = item.type;
				if (type == '1') {
					for (let i = 0; i < this.directSaletOn.length; i++) {
						if (this.directSaletOn[i].indexOf(id) >= 0) {
							this.directSaletOn.splice(i, 1);
							i--;
						}
					}
				} else {
					for (let i = 0; i < this.napaStoresOn.length; i++) {
						if (this.napaStoresOn[i].indexOf(id) >= 0) {
							this.napaStoresOn.splice(i, 1);
							i--;
						}
					}
				}

				for (let j = 0; j < this.shopList.length; j++) {
					shopInfo += this.shopList[j].name + ',';
				}
				this.shopInfo = shopInfo.substring(0, shopInfo.length - 1);
			},
			choseCardTimeType: function (index) {
				// 选择实体卡有效期类型
				this.cardTimeIndex = index;
			},
			judgeCardTime: function (obj) {
				// 处理有效期类型
				if (this.cardTimeIndex == '1') {
					obj.startCardTime = this.startCardTime;
					obj.endCardTime = this.endCardTime;
				} else if (this.cardTimeIndex == '2') {
					obj.endCardTime = 0;
				} else {
					obj.startCardTime = 0;
					obj.endCardTime = 0;
				}

				return obj;
			},
			returnCard: function () {
				// 返回制卡最终展示结果
				let cardInfo;
				let initCardNumber = this.currentShop.initCardNumber;
				cardInfo = this.currentShop.name + ' ' + this.cradTypeList[this.cradTypeIndex].abbr + '-' + Number(this.currentShop
					.shopNumber) + '-' + Number(initCardNumber) + '-' + (Number(this.currentShop.initCardNumber) + Number(this.currentShop
					.num) - 1);
				return cardInfo;
			},
			//获取优惠券弹窗内容
			getCouponList(res, selects) {
				this.couponShow = false;
				if (res == 'ok') {
					this.selects = selects;
				}
			},
			//返回
			closePage() {
				this.$emit('makeCardWin');
			},
			//新增制卡
			async newAddCard(shopCardConfig) {
				let res = await http.newAddCard({
					data: {
						cardTypeId: this.cradTypeList[this.cradTypeIndex].id,
						shopCardConfig: JSON.stringify(shopCardConfig),
						price: this.cardObj.price,
						cardAmount: this.cardObj.cardAmount,
						cardPoint: this.cardObj.cardPoint,
						cardCoupon: JSON.stringify(this.selects),
						discount: this.cardObj.discount.length == 1 ? this.cardObj.discount + '0' : this.cardObj.discount,
						cardTimeType: this.cardTimeIndex,
						startCardTime: (this.cardTimeIndex == 2) ? this.cardObj.startCardTime : Math.round(this.cardObj.startCardTime /
							1000),
						endCardTime: Math.round(this.cardObj.endCardTime / 1000),
						// isActivate: this.type == '0' ? '1' : '0' //是否允许制卡
					}
				});
				if (res) {
					this.closePage();
				}
				this.errorShow('制卡成功');
			},
			thisStartTime: function (time) {
				this.startCardTime = time;
			},
			thisEndTime: function (time) {
				this.endCardTime = time;
			},
			errorShow(content) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: content
				});
			},
			addCard: function () {

				if (this.cradTypeIndex == '-1') {
					this.errorShow('请选择卡类型');
					return false;
				}

				if (this.ischain == '3' && this.shopInfo == '') {
					this.errorShow('请选择卡属门店');
					return false;
				}
				// if (this.currentShop.initCardNumber || isNaN(this.currentShop.initCardNumber)) {
				// 	this.errorShow('初始卡编号不能为空或0')
				// 	return false;
				// }
				if (this.cardObj.price && this.cardObj.price < 0 || isNaN(this.cardObj.price)) {
					this.errorShow('购卡金额必须为正整数');
					return false;
				}

				if (this.cardObj.cardAmount && this.cardObj.cardAmount < 0 || isNaN(this.cardObj.cardAmount)) {
					this.errorShow('卡内余额必须为正整数');
					return false;
				}

				if (this.cardObj.cardPoint && this.cardObj.cardPoint < 0 || isNaN(this.cardObj.cardPoint)) {
					this.errorShow('卡内积分必须为正整数');
					return false;
				}

				if (this.cardObj.discount && this.cardObj.discount < 0 || isNaN(this.cardObj.discount)) {
					this.errorShow('折扣率必须为正整数');
					return false;
				}

				if (this.cardTimeIndex == '1') {
					let dates = new Date().getTime();
					if (this.endCardTime < dates) {
						this.errorShow('结束时间不能小于当前时间');
						return false;
					}
					if (this.startCardTime > this.endCardTime) {
						this.errorShow('开始时间必须大于结束时间');
						return false;
					}
				}

				if (this.cardTimeIndex == '2') {
					if (this.cardObj.startCardTime && this.cardObj.startCardTime < 0 || isNaN(this.cardObj.startCardTime)) {
						this.errorShow('相对时间必须为正整数');
						return false;
					}
				}

				let obj = this.currentShop;
				this.cardObj = this.judgeCardTime(this.cardObj);
				let shopCardConfig = [];
				if (this.ischain == '0') {
					if (obj.shopNumber == '') {
						this.errorShow('请去店铺配置-基本信息,填写门店编号。');
						return false;
					}
					let rec = /^[1-9]\d*$/;
					if (obj.initCardNumber == '' || obj.initCardNumber == 0 || !rec.test(obj.initCardNumber)) {
						this.errorShow('初始卡编号不能为空、其他字符或只为0,请修改。');
						return false;
					}
					if (obj.num == '' || obj.num == 0 || !rec.test(obj.num)) {
						this.errorShow('制卡数量不能为空、其他字符或只为0,请修改');
						return false;
					}
					if (obj.initCardNumber.length > 8) {
						this.errorShow('初始卡编号最多只能输入八位数,请修改');
						return false;
					}
					if (obj.num.length > 8) {
						this.errorShow('制卡数量最多只能输入八位数,请修改');
						return false;
					}

					delete obj.name;
					delete obj.type;
					obj.initCardNumber = Number(obj.initCardNumber);
					obj.num = Number(obj.num);
					shopCardConfig.push(obj);
				} else {
					shopCardConfig = this.shopList;
					for (let i = 0; i < shopCardConfig.length; i++) {
						if (shopCardConfig[i].shopNumber == '') {
							this.errorShow(shopCardConfig[i].name + ',' + '尚未配置门店编号');
							return false;
						}
						if (shopCardConfig[i].initCardNumber == '' || shopCardConfig[i].initCardNumber == 0) {
							this.errorShow(shopCardConfig[i].name + ',' + '初始卡编号不能为空或0,请修改。');
							return false;
						}
						if (shopCardConfig[i].num == '' || shopCardConfig[i].num == 0) {
							this.errorShow(shopCardConfig[i].name + ',' + '制卡数量不能为空或0,请修改');
							return false;
						}
						if (shopCardConfig[i].initCardNumber.length > 8) {
							this.errorShow('初始卡编号最多只能输入八位数,请修改');
							return false;
						}
						if (shopCardConfig[i].num.length > 8) {
							this.errorShow('制卡数量最多只能输入八位数,请修改');
							return false;
						}

						// delete shopCardConfig[i].name;
						// delete shopCardConfig[i].type;
						shopCardConfig[i].initCardNumber = Number(shopCardConfig[i].initCardNumber);
						shopCardConfig[i].num = Number(shopCardConfig[i].num);
					}
				}
				this.newAddCard(shopCardConfig);
			},
		},

	};
</script>
<style type="text/css" scoped>
	.content-box {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
		clear: both;
		position: relative;
		/* overflow: hidden; */
	}

	.content-title {
		position: relative;
		height: 40px;
		line-height: 40px;
		width: 750px;
	}

	.content-title:before {
		content: '';
		position: absolute;
		left: 0;
		top: 10px;
		width: 3px;
		height: 20px;
		background-color: #2EA8DC;
	}

	.content-title:after {
		content: '';
		position: absolute;
		right: 0;
		top: 20px;
		border: 1px dashed #B3B3B3;
		width: 780px;
	}

	.titles {
		position: absolute;
		width: 100px;
		left: 15px;
		z-index: 88;
		background-color: #FFFFFF;
		font-size: 16px;
	}

	.sub-heading {
		min-width: 120px;
		height: 40px;
		line-height: 40px;
		text-align: right;
		margin-left: 15px;
		margin-right: 17px;
	}

	.concent-width {
		width: 200px;
		height: 41px;
		line-height: 40px;
		box-sizing: border-box;
	}

	.content-input {
		border: 1px solid #D2D2D2;
		text-align: left;
	}

	.content-input input {
		width: 160px;
		height: 38px;
		padding: 0;
		border: none;
		text-indent: 10px;
		color: #333;
	}

	.content-input input:focus {
		outline: none;
	}

	.content-input span {
		width: 38px;
		height: 38px;
		text-align: center;
		color: #333333;
		border-left: 1px solid #D2D2D2;
		position: relative;
	}

	.checkList {
		width: auto;
		height: auto;
		cursor: pointer;
		overflow: hidden;
	}

	.checkList span {
		height: 40px;
		line-height: 38px;
		width: 100px;
		text-align: center;
		border: 1px solid #D2D2D2;
		display: inline-block;
		float: left;
		margin-right: 10px;
		box-sizing: border-box;
	}

	.checkList span.checkOn {
		background-color: #FFEDD3;
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.items {
		display: block;
		height: 40px;
		line-height: 40px;
		width: auto;
		padding: 0 10px;
	}

	.tri-down:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 9px solid #6A666E;
	}

	.shopInfoList {
		width: 700px;
		height: auto;
		float: left;
	}

	.shop-head {
		width: auto;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.shop-head span {
		display: block;
		margin-right: 10px;
		min-width: 100px;
		padding: 0 10px;
		height: 100%;
		background-color: #F2F2F2;
		color: #333333;
		cursor: pointer;
		position: relative;
	}

	.shop-head span.shopNames i {
		position: absolute;
		right: 0;
		top: -10px;
		width: 20px;
		height: 20px;
		background: url(../../res/images/delete.png) center center no-repeat;
		display: none;
	}

	.shop-head span:hover i {
		display: block;
	}

	.shop-head span.pitchOn {
		background-color: #B3B3B3;
		color: #FFFFFF;
	}

	.shop-content {
		border: 1px solid #B3B3B3;
		width: 670px;
		height: auto;
		min-height: 210px;
		overflow: hidden;
	}

	.shop-content div {
		width: 100%;
	}

	.clickTip {
		background: url(../../res/images/memberTip.png) center center no-repeat;
		width: 50px;
		height: 40px;
		cursor: pointer;
	}

	.tipContent {
		background-color: #45404A;
		border: 1px solid #69676E;
		box-sizing: border-box;
		height: 50px;
		line-height: 48px;
		width: auto;
		padding: 0 35px 0 20px;
		color: #FFFFFF;
		position: absolute;
		top: -8px;
		left: 400px;
	}

	.tipContent:before {
		content: '';
		width: 12px;
		height: 13px;
		background: url(../../res/images/tiptriangle.png) no-repeat;
		position: absolute;
		left: -13px;
		top: 18px;
	}

	.newCard span {
		color: #333;
		min-width: 100px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.newCard span.sign {
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.newCard span:hover {
		background-color: #FFFFFF;
	}

	.newCard .unsign {
		background: #eee;
	}

	.newCard .unsign:hover {
		background: #eee;
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

	.countList {
		width: 100%;
	}

	.countList span {
		width: 90%;
		height: 45px;
		margin-right: 30px;
		margin-top: 10px;
		line-height: 45px;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.countList span:before {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		left: -10px;
	}

	.countList span:after {
		content: "";
		width: 0;
		height: 0;
		border: 8px solid #fff;
		border-radius: 8px;
		position: absolute;
		bottom: 15px;
		right: -10px;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none !important;
		margin: 0;
	}

	input[type="number"] {
		-moz-appearance: textfield;
	}

	.shop-content .freeFix {
		width: 100px;
		height: 40px;
		border: 1px #D2D2D2 solid;
		display: inline-block;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	.shop-content .signa {
		background: #FFF3E5 !important;
		border: 1px solid #F8931F !important;
		color: #F9911E !important;
	}

	.isChoice {
		height: auto;
		overflow: hidden;
	}

	.isChoice span {
		color: #333;
		display: inline-block;
		min-width: 100px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #fff;
		height: 40px;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
	}
</style>