<template>
	<div id="weChatBinding">
		<section v-if="checkList">
			<div class="title">
				<a href="javascript:;" @click='checkLists'>查看小程序列表</a>
				<a href="javascript:;" @click="toTutorial">小程序上传教程</a>
			</div>
			<div class="first">
				<span>1</span>
				<span>将下载的小程序包在微信开发者工具中上传,进行扫码安装。</span>
			</div>
			<div class="line"></div>
			<div class="second">
				<span>2</span>
				<span>在微信小程序后台配置域名，域名为
					<a href="javascript:;">wx.ishandian.net</a>
				</span>
				<span>如何配置域名</span>
			</div>
			<div class="line"></div>
			<div class="third">
				<span class="fl">3</span>
				<span class="required">小程序App ID</span>
				<input type="text" placeholder="请输入AppId" v-model="miniAppIds" maxlength="32" />
			</div>
			<div class="third">
				<span class="fl" style="opacity: 0;">3</span>
				<span class="required">小程序秘钥</span>
				<input type="text" placeholder="请输入AppSecret" v-model="miniAppSecrets" maxlength="32" />
			</div>
			<div class="handle-tips">
				<i></i>
				<span>请仔细填写App ID与秘钥，轻易不要更换否则将无法正常使用小程序。</span>
			</div>
			<a href="javascript:void(0)" class="blue btn" @click="setConfig">保存</a>
		</section>
		<!-- 有无订单列表 -->
		<section v-if="!checkList">
			<div class="title">
				<span v-on:click="checkLists">返回</span>
			</div>
			<div class="list">
				<div class="list_title">
					<span>更新记录</span>
					<span></span>
					<span>共
						<a href="javascript:;">{{versionList.length}}</a>条记录</span>
				</div>
				<ul class="heads">
					<li>操作</li>
					<li>更新时间</li>
					<li>版本号</li>
					<li>版本内容</li>
					<li>修复内容</li>
				</ul>
				<div class="nolist" v-if="versionList == '' ">暂时没有版本更新，敬请期待...</div>
				<ul class="contents" v-else v-for="item in versionList">
					<li @click="downLoad(item.fileName)">下载</li>
					<li>{{transFormDate(item.uploadTime)}}</li>
					<li>{{item.code}}</li>
					<li>
						<span>{{item.desc}}</span>
					</li>
					<li>无</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				miniAppId: '',
				miniAppSecret: '',
				checkList: true,
				versionList: [],
				userData: Object
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.getConfig();
			this.getVersion();
		},
		methods: {
			checkLists() {
				this.checkList = !this.checkList;
			},
			//更改日期格式的方法
			transFormDate(t) {
				t += '';
				if (t.length == 10) {
					t -= 0;
					t *= 1000;
				} else {
					t -= 0;
				}
				return (utils.format(new Date(t), 'yyyy-MM-dd'));
				//                return (new Date(t)).format('yyyy-MM-dd');
			},
			//下载小程序的方法
			downLoad(filename) {
				//                console.log(this.userData.uploadUrl);
				//                console.log(this.userData.uploadUrl);
				window.open(this.userData.uploadUrl + 'packages/' + filename + '');
			},
			toTutorial: function () {
				window.open('https://mp.weixin.qq.com/debug/wxadoc/dev/');
			},
			// 设置公众号配置
			async setConfig() {
				if (this.miniAppId == '' || this.miniAppId.length <= 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: 'AppId不能为空！',
					});
					return false;
				}
				if (this.miniAppSecret == '' || this.miniAppSecret.length <= 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: 'appSecret不能为空！',
					});
					return false;
				}
				let res = await http.updateMiniProgramConfig({
					data: {
						shopId: this.userData.currentShop.id,
						miniAppId: this.miniAppId,
						miniAppSecret: this.miniAppSecret
					}
				});
				if (res) {
					this.miniAppId = res.miniAppId;
					this.miniAppSecret = res.miniAppSecret;
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '保存成功！',
					});
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
					this.miniAppId = res.miniAppId;
					this.miniAppSecret = res.miniAppSecret;
				}
			},
			// 获取版本
			async getVersion() {
				let res = await http.smallProgramUpdateList({
					data: {
						shopId: this.userData.currentShop.id
					}
				});
				if (res) {
					this.versionList = res;
				}
			},
		},
		computed: {
			miniAppIds: {
				get: function () {
					return this.miniAppId;
				},
				set: function (newValue) {
					let reg = /[^a-zA-Z\d]/g;
					this.miniAppId = newValue.replace(reg, '');
				}
			},
			miniAppSecrets: {
				get: function () {
					return this.miniAppSecret;
				},
				set: function (newValue) {
					let reg = /[^a-zA-Z\d]/g;
					this.miniAppSecret = newValue.replace(reg, '');
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	#weChatBinding {
		width: 100%;
		min-width: 780px;
		height: auto;
		overflow: hidden;
		.title {
			width: 100%;
			height: 40px;
			margin-bottom: 16px;
			a {
				display: block;
				width: 208px;
				height: 38px;
				float: right;
				font-size: 16px;
				border: 1px solid #28A8E0;
				text-align: center;
				line-height: 38px;
				&:first-child {
					margin-right: 99px;
					background: #28A8E0;
					color: #fff;
				}
				&:last-child {
					margin-right: 15px;
					color: #28A8E0;
				}
			}
			span {
				display: block;
				width: 101px;
				height: 38px;
				text-align: center;
				line-height: 38px;
				border: 1px solid #B3B3B3;
				font-size: 16px;
				color: #B3B3B3;
				float: right;
				cursor: pointer;
			}
		}
		.first,
		.second,
		.third {
			width: 100%;
			height: 26px;
			line-height: 26px;
			span {
				&:first-child {
					display: inline-block;
					width: 26px;
					height: 26px;
					border-radius: 13px;
					background: #28A8E0;
					text-align: center;
					line-height: 26px;
					font-size: 16px;
					color: #fff;
					margin-right: 19px;
				}
			}
		}
		.first {
			span {
				&:last-child {
					font-size: 16px;
					color: #333;
					margin-right: 37px;
				}
			}
		}
		.second {
			span {
				&:nth-child(2) {
					font-size: 16px;
					color: #333;
					margin-right: 37px;
					a {
						font-size: 16px;
						color: #28A8E0;
					}
				}
				&:nth-child(3) {
					display: inline-block;
					padding: 0 10px;
					width: auto;
					height: 20px;
					font-size: 16px;
					text-align: center;
					line-height: 20px;
					border-left: 1px solid #333;
				}
			}
		}
		.third {
			height: 40px;
			line-height: 40px;
			width: 100%;
			margin-bottom: 15px;
			overflow: hidden;
			span {
				&:nth-child(2) {
					float: left;
					display: block;
					height: 40px;
					line-height: 40px;
					text-align: right;
					width: 110px;
					font-size: 16px;
					color: #333;
					margin-right: 20px;
				}
			}
			input {
				float: left;
				outline: none;
				border: 1px solid #ccc;
				padding-left: 20px;
				width: 294px;
				height: 40px;
				color: #666;
				box-sizing: border-box;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
			}
		}
		.line {
			width: 1px;
			height: 50px;
			background: #28A8E0;
			margin-left: 13px;
		}
		.handle-tips {
			width: 294px;
			margin-left: 175px;
			overflow: hidden;
			margin-bottom: 28px;
			i {
				display: block;
				width: 17px;
				height: 18px;
				margin-right: 5px;
				margin-top: 4px;
				float: left;
				background: url("../../res/images/handle-tips.png")center no-repeat;
			}
			span {
				display: block;
				width: 257px;
				line-height: 24px;
				float: left;
				font-size: 14px;
				color: #666;
			}
		}
		.btn {
			width: 200px;
			margin-left: 175px;
		}
		.list {
			width: 100%;
			min-height: 156px;
			border: 1px solid #D2D2D2;
			.list_title {
				width: 100%;
				height: 45px;
				line-height: 45px;
				padding-left: 17px;
				span {
					font-size: 16px;
					color: #333;
					font-weight: bold;
					&:first-child {
						margin-right: 11px;
					}
					&:nth-child(2) {
						display: inline-block;
						width: 5px;
						height: 5px;
						border-radius: 50%;
						background: #000;
						margin-right: 11px;
						vertical-align: middle;
					}
					&:last-child a {
						font-size: 16px;
						color: #FF3C05;
					}
				}
			}
			.heads {
				width: 100%;
				height: 41px;
				background: #F2F2F2;
				li {
					float: left;
					width: 20%;
					text-align: center;
					line-height: 41px;
					font-size: 16px;
					color: #43414A;
				}
			}
			.nolist {
				width: 100%;
				font-size: 16px;
				color: #43414A;
				text-align: center;
				line-height: 70px;
			}
			.contents {
				width: 100%;
				height: 69px;
				border-bottom: 1px solid #F7F7F7;
				li {
					float: left;
					width: 20%;
					height: 69px;
					text-align: center;
					line-height: 69px;
					font-size: 14px;
					color: #666;
					&:first-child {
						color: #00AAE5;
						cursor: pointer;
					}
					&:nth-child(4) {
						line-height: 24px;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>