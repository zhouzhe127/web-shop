<!--
	**绑定公众号
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="weChatBinding">
		<template v-if='isAuth'>
			<div class="wx-showBox">
				<span>微信公众号</span>
				<a href="javascript:void(0);" class="blue addnumber" @click="addWeChat">重新授权</a>
				<a href="javascript:void(0)" class="gray addnumber fl" @click="deleteAuth">解除授权</a>
			</div>
			<div class="wx-showBox">
				<span>公众号昵称</span>
				<p>{{authMiniAppName}}</p>
			</div>
		</template>
		<div class="wx-showBox" v-else>
			<span></span>
			<a href="javascript:void(0);" class="blue addnumber" @click="addWeChat">添加微信公众号</a>
		</div>
		<template v-if="appId != '' && appSecret != ''">
		<div class="wx-showBox">
			<span>提示</span>
			<p>您可直接把公众号授权给闪店啦,无需再填写其他绑定内容.点击"添加微信公众号"进行授权后,可清除下侧AppId和AppSercet.</p>
		</div>
		<div class="wx-showBox">
			<span class="required">AppId</span>
			<input type="text" placeholder="请输入AppId" v-model="appIds" maxlength="32" />
		</div>
		<div class="wx-showBox">
			<span class="required">AppSecret</span>
			<input type="text" id="id" placeholder="请输入AppSecret" v-model="appSecrets" maxlength="32" />
		</div>
		<div class="wx-showBox">
			<span></span>
			<a v-if='isAuth' href="javascript:void(0)" class="blue btn" @click="clearConfig">清除</a>
			<a href="javascript:void(0)" class="yellow btn" @click="setConfig">保存</a>
		</div>
		</template>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			appId: '',
			appSecret: '',
			userData: Object,
			isAuth: false, //是否已授权
			authMiniAppName: ''
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.getConfig();
		let auth_code = this.GetQueryString('auth_code');
		console.log(auth_code);
		if (auth_code && auth_code != null) {
			this.setAuth(auth_code);
		}
	},
	methods: {
		// 获取公众号配置
		async getConfig() {
			let res = await http.getWechatConfig({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.appId = res.appId;
				this.appSecret = res.appSecret;
				this.isAuth = false;
				if (res.authorizerAppId != '') {
					this.isAuth = true;
					this.authMiniAppName = res.authorizerAppName;
				}
			}
		},
		// 设置公众号配置
		async setConfig() {
			if (this.appId == '' || this.appId.length <= 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: 'AppId不能为空！',
				});
				return false;
			}
			if (this.appSecret == '' || this.appSecret.length <= 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: 'appSecret不能为空！',
				});
				return false;
			}
			let res = await http.updateWechatConfig({
				data: {
					shopId: this.userData.currentShop.id,
					appId: this.appId,
					appSecret: this.appSecret
				}
			});
			if (res) {
				this.appId = res.appId;
				this.appSecret = res.appSecret;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '保存成功',
				});
			}
		},
		async addWeChat() { //添加微信公众号
			let data = await http.getAuthUrl({
				data: {
					shopId: this.userData.currentShop.id,
					redirect_uri: document.location.toString(),
					auth_type: 1
				}
			});
			if (data) {
				window.location.href = data;
				// window.open(data);
			}
		},
		GetQueryString: function(paraName) { //获取url参数
			let url = document.location.toString();
			// let url = 'https://v5.qa.ishandian.com.cn/?branch=zs#/admin/boundPublicNumber?i=6&o=1&s=0&auth_code=queryauthcode%40%40%405JNXKkn9RWM0C2YkhCZbvryI8Bf_zoivu2gmxa8VBKo8o1WHAQLFGk9zFV7pJDZjg5-l8faydk6nwqRK9VKYMw&expires_in=3600'
			let arrObj = url.split('?');
			if (arrObj.length > 1) {
				let arrPara = arrObj[arrObj.length - 1].split('&');
				let arr = [];
				for (let i = 0; i < arrPara.length; i++) {
					arr = arrPara[i].split('=');
					if (arr != null && arr[0] == paraName) {
						return unescape(arr[1]);
					}
				}
				return '';
			} else {
				return '';
			}
		},
		async setAuth(id) { //授权
			let data = await http.setAuth({
				data: {
					auth_code: id
				}
			});
			if (data) {
				//this.isAuth = true;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '授权成功',
				});
			}
		},
		async deleteAuth() { //取消授权
			let data = await http.deleteAuth({
				data: {
					type: 1
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '解除授权成功',
				});
				this.getConfig();
			}
		},
		clearConfig: function() { //清除
			this.clearWechatConfig();
		},
		async clearWechatConfig() {
			let res = await http.clearWechatConfig({
				data: {

				}
			});
			if (res) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '清除成功',
				});
				this.getConfig();
			}
		}
	},
	computed: {
		appIds: {
			get: function() {
				return this.appId;
			},
			set: function(newValue) {
				let reg = /[^a-zA-Z\d]/g;
				this.appId = newValue.replace(reg, '');
			}
		},
		appSecrets: {
			get: function() {
				return this.appSecret;
			},
			set: function(newValue) {
				let reg = /[^a-zA-Z\d]/g;
				this.appSecret = newValue.replace(reg, '');
			}
		}
	}
};
</script>
<style lang="less" scoped>
#weChatBinding {
	width: 100%;
	height: auto;
	min-width: 780px;
	.wx-showBox {
		height: 45px;
		line-height: 45px;
		width: 100%;
		margin-bottom: 15px;
		.addnumber {
			width: 150px;
			border-radius: 5px;
			height: 45px;
			line-height: 45px;
			margin-right: 10px;
		}
		span {
			display: block;
			height: 45px;
			line-height: 45px;
			text-align: right;
			width: 100px;
			color: #666;
			margin-right: 20px;
			float: left;
			font-size: 16px;
		}
		p {
			font-size: 16px;
		}
		input {
			float: left;
			outline: none;
			border: 1px solid #ccc;
			padding-left: 20px;
			width: 400px;
			height: 45px;
			color: #666;
			box-sizing: border-box;
		}
	}
	.btn {
		width: 200px;
		margin-right: 10px;
	}
}
</style>