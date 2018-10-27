
<template>
	<section id="register">
		<section class="all">
			<section class="text">
				<span>手机号码:</span>
				<input type='text' autocomplete="off" maxlength='11' v-model="telephone" name="telephone" />
				<span style="color: red" v-show="isHave!=''">{{isHave}}</span>
			</section>
			<section class="text">
				<span>验证码:</span>
				<input type="text" autocomplete="off" maxlength='6' size="6" v-model="code" id="code" />
				<div class="prompt" @click="prompt">
					<span class="fr code" v-if="requestCode" style="background-color:#F39800;border-radius: 50px;cursor: pointer;">发送验证码</span>
				</div>
				<div class="prompt">
					<span class="fr code" v-if="!requestCode" style="color: #BABABA">{{num}}s后重新发送</span>
				</div>
			</section>
			<section class="text">
				<span>真实姓名:</span>
				<input onfocus="this.type='text';" autocomplete="off" maxlength='14' v-model="nameP" name="nameP" />
			</section>
			<section class="text">
				<span>设置登入密码:</span>
				<input type='password' autocomplete="off" maxlength='20' v-model="resPassword" />
			</section>
			<section class="text">
				<span>确认登入密码:</span>
				<input type='password' autocomplete="off" maxlength='20' v-model="quePassword" />
				<img v-show="(resPassword!='')&&(resPassword===quePassword)" src="./../res/images/resTick.png" alt="">
			</section>
			<section class="button">
				<span class="back" @click="returnLogin">返回</span>
				<span class="res fr" @click="register">注册账户</span>
			</section>
		</section>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			requestCode: true, //判断验证码
			telephone: '', //手机号
			resPassword: '', //密码
			code: '', //验证码
			token: '', // 验证码token值
			nameP: '', //用户名

			quePassword: '', //确认密码
			isHave: '', //提示字

			num: 60
		};
	},
	methods: {
		//请求验证码点击
		async prompt() {
			let telReg = /^1[\d]{10,10}$/;
			if (!telReg.test(this.telephone)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '手机号码格式不对'
				});
				return;
			}
			if (this.requestCode) {
				let res = await http.AccountSendCode({
					data: {
						mobile: this.telephone
					}
				});
				if (res.error) {
					this.requestCode = true;
				} else {
					this.token = res;
					this.requestCode = false;
					let requestTimer = setInterval(() => {
						if (this.num > 0) {
							this.requestCode = false;
							this.num--;
						} else {
							clearInterval(requestTimer);
							this.num = 60;
							this.requestCode = true;
						}
					}, 1000);
					console.log(res);
				}
			}
		},
		//注册
		async register() {
			let nameReg = /^1[\d]{10,10}$/;
			let code = /^[^\s]{4,4}$/;
			if (!nameReg.test(this.telephone) || !code.test(this.code)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '手机号码或验证码格式不对'
				});
				return;
			} else if (this.resPassword !== this.quePassword) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '密码不一致'
				});
				return;
			} else if (this.nameP.trim() == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '名字不能为空'
				});
				return;
			}
			let data = await http.AccountRegister({
				data: {
					mobile: this.telephone,
					password: this.resPassword,
					code: this.code,
					codeToken: this.token,
					name: this.nameP
				},
				hasError: true,
				full: true
			});
			console.log(data);
			if (data.error) {
				this.isHave = data.error.message;
			} else {
				//				httpMd5.setKey(data.sdKey);
				//				storage.session('sdkey', data.sdKey);
				//				global.uploadUrl = data.uploadUrl = data.uploadUrl + '/';
				//
				//				data.isBoss = this.identity; //添加登陆者的身份
				storage.session('userShop', data);
				storage.session('token', data.accessToken);
				storage.session('goingHere', true);
				this.$router.push('brandAudit/brandBuild');
			}
		},
		// 返回登陆界面
		returnLogin() {
			this.$emit('backLogin', false);
		}
	}
};
</script>

<style type="text/css" scoped>
#register {
	width: 100%;
	height: 100%;
	position: relative;
}
#register .all {
	position: absolute;
	top: 25%;
	left: 30%;
}

#register .all .text {
	width: 100%;
	height: 52px;
	font-size: 16px;
	color: #999;
	padding: 0;
	border-bottom: 2px solid #e7e7e7;
	box-sizing: border-box;
	margin-bottom: 20px;
}
#register .all .text span {
	display: inline-block;
	margin-right: 20px;
}
.prompt {
	display: inline-block;
	color: #b4b4b4;
}
#register .all .text span.code {
	height: 30px;
	width: 100px;
	text-align: center;
	line-height: 30px;
	color: white;
	margin-right: 0;
}
#register .all .text input {
	width: 240px;
	height: 50px;
	border: none;
	outline: none;
	font-size: 18px;
	padding: 0;
	margin: 0;
	overflow: hidden;
	text-align: left;
	background: none;
	/*background-color: none;*/
}
#register .all .button span {
	display: inline-block;
	width: 150px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;
}
#register .all .button span.back {
	background-color: #bababa;
	color: white;
}
#register .all .button span.res {
	background-color: #f39800;
	color: white;
}
</style>