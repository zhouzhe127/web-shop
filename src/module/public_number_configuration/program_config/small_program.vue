<template>
	<div id="merchants">
		<template v-if="!isAuth">
			<!-- 小程序授权步骤 -->
			<div class="set-line">
				<div class="titles">小程序授权步骤</div>
				<div class="line"></div>
			</div>
			<!-- 1 -->
			<div class="first">
				<span class="round">1</span>
				<span class="theText">将微信小程序授权给闪店,系统会自动生成店铺小程序,并提交到微信审核;您不需要做复杂操作,即可获得店铺的微信小程序。</span>
			</div>
			<!-- 授权微信小程序 -->
			<div class="verticalBar">
				<div class="vertical fl">
					<span></span>
				</div>
				<div class="onRight fl clearfix">
					<a href="javascript:void(0)" class="blue btn fl" @click="addWeChat">授权微信小程序</a>
					<div class="fl handle-tips">
						<i></i> 注:你的小程序的主题必须是【企业】,并开通了微信支付,才能具备支付权限。
					</div>
				</div>
			</div>
			<!-- 2 -->
			<div class="first">
				<span class="round">2</span>
				<span class="theText">如果还没有注册微信小程序,点击按钮注册;注册成功后,再授权给闪店即可。
			</span>
			</div>
			<div class="verticalBar">
				<div class="vertical fl"></div>
				<div class="onRight fl clearfix">
					<a href="javascript:void(0)" class="blue btn fl" @click="registrationApplet">注册小程序</a>
				</div>
			</div>
		</template>
		<template v-else>
			<template v-if="!showConfig">
				<!-- 设置微信支付 -->
				<div class="set-line">
					<div class="titles">设置微信支付</div>
					<div class="line"></div>
				</div>
				<!-- 小程序 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">小程序:</span>
					<div class="rightHalf">
						<span class="fl name">{{authMiniAppName}}</span>
						<a href="javascript:void(0)" class="blue abtn fl" @click="reauthorization">重新授权</a>
						<a href="javascript:void(0)" class="gray abtn fl" @click="deleteAuth">解除授权</a>
					</div>
				</div>
				<!-- 审核状态 -->
				<div class="online-box clearfix" v-if="reviewStatus !== ''">
					<span class="online-sub fl">状态:</span>
					<div class="rightHalf">
						<span class="fl name">{{reviewObj[reviewStatus]}}</span>
					</div>
				</div>
				<!-- 微信支付 -->
				<!-- 	<div class="online-box clearfix">
					<span class="online-sub fl">微信支付:</span>
					<div class="rightHalf">
						<span class="fl name">目前小程序仅支持微信原生支付,你可以在【<span style="color: #29A8E0;font-size: 16px;" @click="registrationApplet">小程序后台</span>-微信支付】页面下申请开通并完成相关配置。小程序的主体必须为企业,才可以申请微信支付;如果你的小程序不是企业主体,请另注册一个新的小程序,重新授权给闪店即可。完成设置后,请填写你的商户号和商户秘钥。</span>
					</div>
				</div> -->
				<!-- 商户号 -->
				<!-- <div class="online-box clearfix">
					<span class="online-sub fl">商户号</span>
					<div class="rightHalf">
						<input type="text" class="merchants fl" placeholder="请输入商户号" v-model='number' maxlength="10" onkeyup="value=value.replace(/[^a-zA-Z\d]/g,'')" @blur="checkForm('1')" />
						<div class="fl handle-tips" v-if="numberStatus">
							<i></i> 商户号必须为8位或10位数字
						</div>
						<div class="fl dangerous-tips" v-else>
							<i></i> 商户号必须为8位或10位数字,请登录微信商户平台核对
						</div>
					</div>
				</div> -->
				<!-- 商户秘钥 -->
				<!-- <div class="online-box clearfix">
					<span class="online-sub fl">商户秘钥</span>
					<div class="rightHalf">
						<input type="text" class="merchants fl" placeholder="请输入商户秘钥" v-model='secret' maxlength="32" onkeyup="value=value.replace(/[^a-zA-Z\d]/g,'')" @blur="checkForm('1')" />
						<div class="fl handle-tips" v-if="secretStatus">
							<i></i> 商户秘钥必须为32位
						</div>
						<div class="fl dangerous-tips" v-else>
							<i></i> 商户秘钥必须为32位,请登录微信商户平台核对
						</div>
					</div>
				</div> -->
				<!-- 确认 -->
				<!-- 	<div class="online-box clearfix">
					<span class="online-sub fl"></span>
					<div class="businessHours">
						<div @click="selectBusinessHours" :class="{'active':isMember}"></div>
						<span>已确认商户号和商户秘钥配置正确(否则将导致微信支付异常,小程序无法通过审核)</span>
					</div>
				</div> -->
				<!-- 	<div class="online-box clearfix">
					<span class="online-sub fl"></span>
					<div class="rightHalf">
						<a v-if="number != '' && secret != '' && numberStatus && secretStatus && isMember" href="javascript:;" class="blue" style="width:200px;" @click="Auditing">提交微信审核</a>
						<a v-else href="javascript:;" class="gray" style="width:200px;">提交微信审核</a>
						<a href="javascript:;" class="blue" style="width:200px;" @click="Auditing('1')">保存</a>
						<a href="javascript:;" class="blue" style="width:200px;" @click="openConfig">配置小程序</a>
						<a href="javascript:;" class="blue" style="width:200px;margin-top: 10px;" @click="getQRcode">小程序体验二维码</a>
						<a href="javascript:;" class="blue" style="width:200px;margin-top: 10px;" @click="releaseCode">发布</a>
					</div>
				</div> -->
				<div class="online-box clearfix">
					<span class="online-sub fl"></span>
					<div class="rightHalf">
						<a v-if="reviewStatus == '2'" href="javascript:;" class="gray" style="width:200px;">提交微信审核</a>
						<a v-else href="javascript:;" class="blue" style="width:200px;" @click="Auditing">提交微信审核</a>
						<a href="javascript:;" class="blue" style="width:200px;" @click="openConfig">配置小程序</a>
						<a href="javascript:;" class="blue" style="width:200px;" @click="getQRcode">小程序体验二维码</a>
						<!-- <a v-if="reviewStatus == 0" href="javascript:;" class="blue" style="width:200px;margin-top: 10px;" @click="releaseCode">发布</a>
						<a v-else href="javascript:;" class="gray" style="width:200px;margin-top: 10px;">发布</a> -->
					</div>
				</div>
				<!-- 小程序二维码规则配置 -->
				<div class="set-line">
					<div class="titles" style="width: 160px;">小程序二维码规则配置</div>
					<div class="line" style="width:580px;"></div>
				</div>
				<!-- 小程序规则 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">提示:</span>
					<div class="rightHalf">
						<p class="name">需提交小程序二维码校验文件后,方可进行小程序登录。</p>
						<p class="name">步骤一：登录小程序后台，点击左方侧边栏选中“设置”</p>
						<p class="name">步骤二：设置中选择“开发设置”，滑动至最下方“扫普通链接二维码打开小程序”，点击“添加”</p>
						<p class="name">步骤三：二维码规则处填写
							<input type="text" value="'https://wx.ishandian.net/MiniPro?oid='" class="url urlo inpurl" readonly="true" /><span style="color: #29A8E0;font-size: 16px;" @click="copyCode">点击复制</span></p>
						<p class="name">步骤四：在“配置普通链接二维码规则”内，点击“下载校验文件”</p>
						<p class="name">步骤五：打开校验文件，复制文件名与文件内容粘贴至下方，点击保存。</p>
						<a href="javascript:;" class="blue" style="width:200px;margin-top: 10px;" @click="openCheckWin">配置校验文件</a>
					</div>
				</div>
			</template>
			<!-- 加载页配置 -->
			<appletConfig v-else @throwWinResult="getConfigs" :number="number" :secret="secret" :authMiniBackground='authMiniBackground'></appletConfig>
		</template>
		<!-- 弹窗 -->
		<programWin v-if="showWin" @getAppliedWin='getResult'></programWin>
		<!-- 二维码弹窗 -->
		<qrcode v-if="codeWin" @getcodeResult='getcodeResult'></qrcode>
		<checkFile v-if="checkWin" @getCheckWin="getcheckResult"></checkFile>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
//import utils from 'src/verdor/utils';
//import global from 'src/manager/global';
export default {
	data() {
		return {
			number: '', //商户号
			secret: '', //商户秘钥
			numberStatus: true,
			secretStatus: true,
			isMember: false, //是否确认
			userData: Object,
			show: false,
			auth_code: '', //授权回调码
			showWin: false,
			isAuth: false, //是否已经授权
			showConfig: false, //显示配置
			authMiniBackground: '', //小程序背景图片
			authMiniAppName: '', //小程序名字
			appletQrcode: '', //体验版的小程序二维码 
			codeWin: false,
			reviewStatus: '', //审核状态码
			reviewObj: { //审核状态
				'0': '审核成功',
				'1': '审核失败',
				'2': '审核中'
			},
			checkWin: false //校验文件弹窗
		};
	},
	methods: {
		getResult: function(res) {
			//弹窗回调
			if (res == 'ok') {
				// console.log('11111')
				//this.bussinessselect = item;
				this.addWeChat();
			}
			if (res == 'cancel') {
				this.getConfig();
			}
			this.showWin = false;
		},
		getConfigs: function(res, item) {
			//console.log(res)
			this.showConfig = res;
			this.authMiniBackground = item;
			//console.log(this.showConfig)
		},
		openConfig: function() { //打开配置
			this.showConfig = true;
		},
		selectBusinessHours: function() {
			//是否仅会员享受门店折扣
			this.isMember = !this.isMember;
		},
		registrationApplet: function() { //注册小程序
			window.open('https://mp.weixin.qq.com');
		},
		async addWeChat() { //授权小程序
			let data = await http.getAuthUrl({
				data: {
					shopId: this.userData.currentShop.id,
					redirect_uri: document.location.toString(),
					auth_type: 2
				}
			});
			if (data) {
				this.showWin = true;
				//window.location.href = data;
				window.open(data);
			}
		},
		GetQueryString: function(paraName) { //获取url参数
			let url = document.location.toString();
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
				this.isAuth = true;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '授权成功',
				});
			}
		},
		reauthorization: function() { //重新授权
			this.isAuth = false;
			this.addWeChat();
		},
		checkForm: function(type) {
			if (this.number == '' || this.number.length != 8 && this.number.length != 10) {
				this.numberStatus = false;
				if (type) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '商户号必须为8位或10位数字',
					});
				}
				return false;
			} else {
				this.numberStatus = true;
			}
			if (this.secret == '' || this.secret.length != 32) {
				this.secretStatus = false;
				if (type) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '商户秘钥必须为32位',
					});
				}
				return false;
			} else {
				this.secretStatus = true;
			}
			return true;
		},
		async Auditing() {
			//if (!this.checkForm(type)) return;
			let data = await http.Auditing({
				data: {
					// merchantId: this.number,
					// merchantSecret: this.secret
					merchantId: '',
					merchantSecret: ''
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '已提交微信审核',
				});
				this.getConfig();
			}
		},
		// 获取公众号配置
		async getConfig() {
			let res = await http.getWechatConfig({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.isAuth = false;
				if (res.authMiniAppId != '') {
					this.isAuth = true;
					this.number = res.miniAppId;
					this.secret = res.miniAppSecret;
					this.authMiniAppName = res.authMiniAppName;
				}
				if (res.auditData != '') {
					this.reviewStatus = res.auditData.status;
				}
				this.authMiniBackground = res.authMiniBackground;
			}
		},
		getQRcode: function() {
			this.codeWin = true;
		},
		getcodeResult: function() {
			this.codeWin = false;
		},
		async releaseCode() { //提交到线上
			let data = await http.release({
				data: {}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '发布成功',
				});
			}
		},
		async deleteAuth() { //取消授权
			let data = await http.deleteAuth({
				data: {
					type: 2
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
		openCheckWin: function() { //打开配置文件弹窗
			this.checkWin = true;
		},
		getcheckResult: function() { //获取校验配置文件
			this.checkWin = false;
		},
		copyCode: function() {
			let t = null;
			t = document.getElementsByClassName('inpurl')[0];
			t.select();
			document.execCommand('copy');
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'alert',
				content: '复制成功',
			});
		}
	},
	components: {
		'programWin': () =>
			import ( /* webpackChunkName: 'business_win' */ './small_program_win'),
		'appletConfig': () =>
			import ( /* webpackChunkName: 'applet_configuration' */ './applet_configuration'),
		'qrcode': () =>
			import ( /* webpackChunkName: 'qrcode_win' */ './qrcode_win.vue'),
		'checkFile': () =>
			import ( /* webpackChunkName: 'check_file_win' */ './check_file_win.vue'),
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.getConfig();
		// let auth_code = this.GetQueryString('auth_code');
		// this.auth_code = auth_code;
		// if(this.auth_code != ''){
		// 	this.showWin = true;
		// }
		//console.log(auth_code)
		// if (auth_code && auth_code != null) {
		// 	this.setAuth(this.auth_code);
		// 	this.showWin = true;
		// 	//this.setAuth(auth_code);
		// }
		//this.getConfig();
	}
};
</script>
<style type="text/css" scoped>
#merchants .set-line {
	width: 800px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#merchants .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 130px;
	font-size: 16px;
	text-align: left;
}

#merchants .set-line .line {
	display: inline-block;
	width: 650px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#merchants .first {
	width: 100%;
	height: 32px;
	line-height: 32px;
}

#merchants .theText {
	display: inline-block;
	font-size: 16px;
	margin-right: 10px;
	height: 32px;
}

#merchants .first .round {
	float: left;
	display: inline-block;
	width: 32px;
	height: 32px;
	border-radius: 16px;
	background: #28A8E0;
	text-align: center;
	line-height: 32px;
	font-size: 16px;
	color: #fff;
	margin-right: 19px;
}

#merchants .verticalBar {
	height: 79px;
}

#merchants .verticalBar .onRight {
	height: 79px;
	display: flex;
	align-items: center;
}

#merchants .verticalBar .onRight .btn {
	width: 150px;
	height: 42px;
	line-height: 42px;
}

#merchants .verticalBar .vertical {
	width: 32px;
	height: 79px;
	margin-right: 19px;
	display: flex;
	justify-content: center;
}

#merchants .verticalBar .vertical span {
	display: block;
	width: 1px;
	height: 79px;
	background: #28A8E0;
}

#merchants .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#merchants .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#merchants .online-box .rightHalf {
	max-width: 700px;
	height: auto;
	float: left;
}

#merchants .online-box .rightHalf .name {
	font-size: 16px;
	line-height: 40px;
	margin-right: 30px;
}

#merchants .online-box .rightHalf .abtn {
	width: 100px;
	height: 42px;
	line-height: 42px;
	margin-right: 10px;
	border-radius: 5px;
}

#merchants .online-box .rightHalf .merchants {
	width: 210px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#merchants .online-box .businessHours {
	float: left;
	line-height: 42px;
	height: 42px;
}

#merchants .online-box .businessHours div {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 11px 8px;
	float: left;
}

#merchants .online-box .businessHours span {
	font-size: 16px;
	color: #333;
}

#merchants .url {
	width: 300px;
	font-size: 16px;
	color: #FF9800;
	height: 32px;
	text-align: center;
	line-height: 32px;
	border: none;
	margin-right: 25px;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	color: #999999;
}

.dangerous-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/icon/warning.png) 20px center no-repeat;
	background-size: 20px 20px;
	color: #EA3B44;
}

.active {
	background: url(../../../res/icon/selected.png) center center no-repeat,
	#28a8e0;
}
</style>