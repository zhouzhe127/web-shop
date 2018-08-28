<!--
    **绑定公众号
    *
    * 胡江
    * *
    *
-->
<template>
	<div id="weChatBinding">
		<template v-if ='isAuth'>
			<div class="wx-showBox">
				<span>微信公众号</span>
				<a href="javascript:void(0);" class="blue addnumber" @click="addWeChat">重新授权</a>
			</div>
			<div class="wx-showBox">
				<span>公众号昵称</span>
				<p>闪店科技</p>
			</div>
		</template>
		<div class="wx-showBox" v-else>
			<span></span>
			<a href="javascript:void(0);" class="blue addnumber" @click="addWeChat">添加微信公众号</a>
		</div>
		<div class="wx-showBox">
			<span class="required">AppId</span>
			<input type="text" placeholder="请输入AppId" v-model="appIds" maxlength="32" />
		</div>
		<div class="wx-showBox">
			<span class="required">AppSecret</span>
			<input type="text" id="id" oncopy="return false;" oncut="return false;" placeholder="请输入AppSecret" v-model="appSecrets" maxlength="32" />
		</div>
		<a href="javascript:void(0)" class="yellow btn" @click="setConfig">保存</a>
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
			isAuth: false //是否已授权
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.getConfig();
		let auth_code = this.GetQueryString('auth_code');
		console.log(auth_code)
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
				this.isAuth = Boolean(res.isAuth);
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
					shopId: this.userData.currentShop.id
				}
			})
			if (data) {
				window.location.href = data;
				// window.open(data);
			}
		},
		GetQueryString: function(paraName) { //获取url参数
			let url = document.location.toString();　　　　
			let arrObj = url.split("?");　　
			if (arrObj.length > 1) {　　　　　　
				let arrPara = arrObj[1].split("&");　　　　　　
				let arr;　　　　　　
				for (let i = 0; i < arrPara.length; i++) {　　　　　　　　
					arr = arrPara[i].split("=");
					if (arr != null && arr[0] == paraName) {　　　　　　　　　　
						return unescape(arr[1]);　
					}　　　　　　
				}　　　　　　
				return "";　　　　
			} else {　　　　　　
				return "";　
			}
		},
		async setAuth(id) { //授权
			let data = await http.setAuth({
				data: {
					auth_code: id
				}
			})
			if (data) {
				this.isAuth = true;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '授权成功',
				});
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
			font-size: 24px;
			font-weight: bold;
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
		margin-left: 195px;
	}
}
</style>