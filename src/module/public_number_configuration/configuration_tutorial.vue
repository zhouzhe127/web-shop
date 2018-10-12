<template>
	<div id="configuration-tutorial">
		<!-- 基础配置 -->
		<div class="set-line">
			<div class="titles">基础配置教程(一)</div>
			<div class="line"></div>
		</div>
		<div class="first">
			<span class="round">1</span>
			<span class="theText">打开微信公众号后台进行配置,点击左侧导航栏"基本配置",选择内部"服务器配置"功能</span>
		</div>
		<div class="verticalBar"></div>
		<div class="first">
			<span class="round">2</span>
			<span class="theText">填写服务器URL为:
			</span>
			<input type="text" name="" :value="host + '/weixin/Callback/weixin?shopId=' + shopId" class="url urlo" readonly="true" style="width: 430px;" />
			<a class="copy" @click="copyCode('','urlo')" style='width:110px'>一键复制</a>
		</div>
		<div class="verticalBar"></div>
		<div class="first" style="margin-bottom: 35px;">
			<span class="round">3</span>
			<span class="theText">填写令牌Token为:
			</span>
			<input type="text" name="" value="weixin" class="url urlto" readonly="true" style="width: 50px;" />
			<a class="copy" @click="copyCode('','urlto')">一键复制</a>
		</div>
		<!-- 基础配置 -->
		<div class="set-line">
			<div class="titles">基础配置教程(二)</div>
			<div class="line"></div>
		</div>
		<div class="first">
			<span class="round">1</span>
			<span class="theText">打开微信公众号后台进行配置,点击左侧导航栏"公众号设置",选择内部"功能设置"功能</span>
		</div>
		<div class="verticalBar"></div>
		<div class="first">
			<span class="round">2</span>
			<span class="theText">填写业务域名为:
			</span>
			<input type="text" name="" :value="newhost" class="url urlt" readonly="true" style="width: 200px;" />
			<a class="copy" @click="copyCode('','urlt')">一键复制</a>
		</div>
		<div class="verticalBar"></div>
		<div class="first">
			<span class="round">3</span>
			<span class="theText">填写JS接口安全域名为:
			</span>
			<input type="text" name="" :value="newhost" class="url urlfo" readonly="true" style="width: 200px;" />
			<a class="copy" @click="copyCode('','urlfo')">一键复制</a>
		</div>
		<div class="verticalBar"></div>
		<div class="first" style="margin-bottom: 35px;">
			<span class="round">4</span>
			<span class="theText">填写网页授权域名为:
			</span>
			<input type="text" name="" :value="newhost" class="url urlf" readonly="true" style="width: 200px;" />
			<a class="copy" @click="copyCode('','urlf')">一键复制</a>
		</div>
		<!-- 基础配置 -->
		<div class="set-line">
			<div class="titles">基础配置教程(三)</div>
			<div class="line"></div>
		</div>
		<div class="first">
			<span class="round">1</span>
			<span class="theText">打开微信公众号后台进行配置,点击左侧导航栏"基本配置",选择内部"公众号开发信息中IP白名单"功能</span>
		</div>
		<div class="verticalBar"></div>
		<div class="first">
			<span class="round">2</span>
			<span class="theText">修改IP白名单为:
			</span>
			<textarea class="url allip" readonly="true">  121.43.149.29
  120.26.225.11
  120.55.12.194 
  120.26.218.252
			</textarea>
			<a class="copy" @click="copyCode('','allip')">一键复制</a>
		</div>
		<!-- 基础配置 -->
		<div class="set-line" style="margin-top: 130px;">
			<div class="titles">菜单链接url</div>
			<div class="line"></div>
		</div>
		<div class="urlBox">
			<ul v-for="(item,index) in urlList" :key="index">
				<li>
					<span class="urlname">{{item.name}}:</span>
					<input type="text" name="" :value="item.url" class="inpurl" readonly="true" />
					<a class="copy" @click="copyCode(index)">一键复制</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				shopId: storage.session('userShop').currentShop.id, //单店 shopId 品牌 品牌Id
				urlList: [], //链接的列表
				userData: Object,
				host:'', //域名
				newhost:'' //不带https的域名
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.getUrl();
			this.getConfig();
		},
		methods: {
			async getUrl() { //获取配置
				let res = await http.getWechatMenuPreSet({
					data: {
						shopId: this.shopId
					}
				});
				if (res) {
					this.urlList = res; //获取链接
				}
			},
			copyCode: function(i, oForm) {
				let t = null;
				if (i != '' || i == '0') {
					t = document.getElementsByClassName('inpurl')[i];
				} else if (oForm) {
					t = document.getElementsByClassName(oForm)[0];
				}
				t.select();
				document.execCommand('copy');
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '复制成功',
				});
			},
			// 获取公众号配置
			async getConfig() {
				let res = await http.getWechatConfig({
					data: {
						shopId: this.userData.currentShop.id
					}
				});
				if (res) {
					this.host = res.host;
					this.newhost = res.host.split('//')[1];
				}
			},
		}
	};
</script>
<style scoped>
	#configuration-tutorial .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#configuration-tutorial .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 140px;
		font-size: 14px;
		text-align: left;
	}

	#configuration-tutorial .set-line .line {
		display: inline-block;
		width: 800px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#configuration-tutorial .first {
		width: 100%;
		height: 32px;
		line-height: 32px;
	}

	#configuration-tutorial .first .allip {
		resize: none;
		width: 150px;
		outline: none;
		height: 135px;
	}

	#configuration-tutorial .url {
		float: left;
		font-size: 16px;
		color: #FF9800;
		height: 32px;
		text-align: center;
		line-height: 32px;
		border: none;
		margin-right: 25px;
	}

	#configuration-tutorial .theText {
		display: inline-block;
		font-size: 14px;
		margin-right: 10px;
		height: 32px;
	}

	#configuration-tutorial .copy {
		display: inline-block;
		box-sizing: border-box;
		width: 121px;
		height: 32px;
		border: 1px solid #2EA8DC;
		text-align: center;
		line-height: 32px;
		color: #2EA8DC;
		border-radius: 4px;
		cursor: pointer;
	}

	#configuration-tutorial .verticalBar {
		width: 1px;
		height: 50px;
		background: #28A8E0;
		margin-left: 16px;
	}

	#configuration-tutorial .first .round {
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

	#configuration-tutorial .urlBox {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 60px;
		padding-left: 51px;
	}

	#configuration-tutorial .urlBox .urlname {
		display: inline-block;
		float: left;
		font-size: 16px;
		height: 32px;
		line-height: 32px;
		margin-right: 10px;
		min-width: 100px;
		text-align: right;
	}

	#configuration-tutorial .urlBox ul {}

	#configuration-tutorial .urlBox ul li {
		margin-bottom: 35px;
	}

	#configuration-tutorial .inpurl {
		float: left;
		text-align: center;
		font-size: 16px;
		color: #FF9800;
		height: 32px;
		line-height: 32px;
		width: 450px;
		border: none;
		margin-right: 25px;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#configuration-tutorial .set-line {
			width: 100%;
			height: 28px;
			line-height: 28px;
			border-left: 4px solid #28a8e0;
			margin: 15px 0 35px;
			position: relative;
		}

		#configuration-tutorial .set-line .line {
			display: inline-block;
			width: 80%;
			border-bottom: 1px dashed #d9d9d9;
			margin-bottom: 5px;
			position: absolute;
			top: 18px;
		}

		#configuration-tutorial .copy {
			display: inline-block;
			box-sizing: border-box;
			width: 121px;
			height: 32px;
			border: 1px solid #2EA8DC;
			text-align: center;
			line-height: 32px;
			color: #2EA8DC;
			border-radius: 4px;
			cursor: pointer;

			right: 10px;
		}
	}
</style>