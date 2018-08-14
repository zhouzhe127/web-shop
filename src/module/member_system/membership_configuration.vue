<template>
	<div id="member-configuration">
		<div class="topR">
			<section class="fl" style="clear: both;">
				<label class="commodity-name fl">POS注册验证码</label>
				<onOff :key='1' :status="POSvalidation" @statusChange="openPOSvalidation"></onOff>
			</section>
		</div>
		<div class="topR">
			<section class="fl" style="clear: both;">
				<label class="commodity-name fl">支付验证码</label>
				<onOff :key='1' :status="payValidation" @statusChange="openpayValidation"></onOff>
			</section>
		</div>
		<div class="topR">
			<section class="fl" style="clear: both;">
				<label class="commodity-name fl">登录验证码</label>
				<onOff :key='1' :status="loginValidation" @statusChange="openloginValidation"></onOff>
			</section>
		</div>
		<div class="topR" style="margin-bottom: 54px;">
			<section class="fl" style="clear: both;">
				<label class="commodity-name fl">实体卡快速结帐</label>
				<onOff :key='1' :status="quickcheck" @statusChange="openquickcheck"></onOff>
			</section>
		</div>
		<div class="save">
			<a href="javascript:void(0)" @click="saveConfig">保存</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';


	export default {
		data() {
			return {
				POSvalidation: true, //pos验证码开关，
				payValidation: false, //支付验证码
				loginValidation: true, //登录验证码
				quickcheck: false //实体卡快速结帐  
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.getConfig();
		},
		components: {
			goodList: () =>
				import ( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
			onOff: () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		},
		methods: {
			openPOSvalidation: function (res) {
				this.POSvalidation = res; //是否开启POS验证
			},
			openpayValidation: function (res) {
				this.payValidation = res; //是否开启支付验证码
			},
			openloginValidation: function (res) {
				this.loginValidation = res; //是否开启登录验证
			},
			openquickcheck: function (res) {
				this.quickcheck = res; //实体卡快速结帐
			},
			async getConfig() { //获取配置
				let res = await http.getValidateConfig({
					data: {
						shopId: this.userData.currentShop.id
					}
				});
				if (res != '') {
					this.POSvalidation = Boolean(Number(res.registerValidate)); //支付验证
					this.payValidation = Boolean(Number(res.payValidate)); //支付验证
					this.loginValidation = Boolean(Number(res.loginValidate)); //支付验证
					this.quickcheck = Boolean(Number(res.cardFastPay)); //快速结帐
				} else {
					this.POSvalidation = true;
					this.payValidation = false;
					this.loginValidation = true;
					this.quickcheck = false;
				}
			},
			async saveConfig() { //保存配置
				let res = await http.addOrUpdateValidate({
					data: {
						shopId: this.userData.currentShop.id,
						registerValidate: String(Number(this.POSvalidation)), //POS验证码
						payValidate: String(Number(this.payValidation)), //支付验证码
						loginValidate: String(Number(this.loginValidation)), //登录验证码
						cardFastPay: String(Number(this.quickcheck)) //快速结帐
					}
				});
				if (res) {
					this.POSvalidation = Boolean(Number(res.registerValidate)); //支付验证
					this.payValidation = Boolean(Number(res.payValidate)); //支付验证
					this.loginValidation = Boolean(Number(res.loginValidate)); //支付验证
					this.quickcheck = Boolean(Number(res.cardFastPay)); //快速结帐
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '保存成功',
					});
				}
			}
		}
	};
</script>
<style type="text/css" scoped>
	#member-configuration .topR {
		width: 100%;
		height: 40px;
		margin-bottom: 19px;
	}

	#member-configuration .topR .commodity-name {
		width: 100px;
		height: 40px;
		text-align: right;
		line-height: 40px;
		margin-right: 22px;
	}

	#member-configuration .save {
		width: 100%;
		height: 51px;
		padding-left: 122px;
	}

	#member-configuration .save a {
		display: block;
		width: 194px;
		height: 51px;
		text-align: center;
		line-height: 51px;
		background: #F7931E;
		font-size: 16px;
		color: #fff;
	}
</style>