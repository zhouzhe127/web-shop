<template>
	<div class="wx-config" id="weChatConfig">
		<div class="wx-showBox">
			<h3>首次关注推送语</h3>
			<div class="fl">
				<textarea placeholder="请输入首次关注推送语" v-model="followerMessage" maxlength="170"></textarea>
				<p>
					<span style="color: #333;">示例：</span>恭喜您，已经成功关注公众号，我们将送您 100 积分。正值活动期间，快去用积分兑换商品吧！</p>
			</div>
		</div>
		<div class="wx-showBox">
			<h3>二次关注推送语</h3>
			<div class="fl">
				<textarea placeholder="请输入二次关注推送语" v-model="message" maxlength="170"></textarea>
				<p>
					<span style="color: #333;">示例：</span>恭喜您，已经成功关注公众号。正值活动期间，快去用积分兑换商品吧！</p>
			</div>
		</div>
		<div class="wx-showBox">
			<h3>通过分享后关注推送语</h3>
			<div class="fl">
				<textarea placeholder="请输入通过分享后关注推送语" v-model="spreaderMessage" maxlength="170"></textarea>
				<p>
					<span style="color: #333;">示例：</span>恭喜您，已经成功关注公众号，您是通过扫描 {fromName} 的推广二维码的方式关注的，因此我们将送您 100 积分，同时也送给 {fromName} 20 积分。正值活动期间，快去用积分兑换商品吧！</p>
			</div>
		</div>
		<div class="wx-showBox">
			<h3>图片加载推送语</h3>
			<div class="fl">
				<textarea placeholder="请输入图片加载推送语" v-model="imageMessage" maxlength="170"></textarea>
				<p>
					<span style="color: #333;">示例：</span>憋急，图片正在玩命生成中啦！获得图片后，快去分享给你的盆友们哦，你和好友将同时获得积分奖励哦，齐心协力赚积分兑奖品，看好你哦哇哈哈!</p>
			</div>
		</div>
		<a href="javascript:void(0)" class="yellow btn" @click="setConfigFn">保存</a>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				followerMessage: '', //首次关注推送语
				message: '', //二次关注推送语
				spreaderMessage: '', //通过分享后关注推送语
				imageMessage: '', // 图片加载推送语
				shopNotice: '', // 貌似没用?
				origin: {}, // 原先的数据
			};
		},
		methods: {
			// 获取配置（请求）
			async getConfig() {
				let res = await http.getWechatConfig({
					data: {
						shopId: this.userdata.currentShop.id
					}
				});
				if (res) {
					this.followerMessage = res.followerMessage;
					this.message = res.message;
					this.spreaderMessage = res.spreaderMessage;
					this.imageMessage = res.imageMessage;
					this.shopNotice = res.shopNotice;
					this.origin = res;
				}
			},
			// 设置配置 （请求）
			async setConfig() {
				let res = await http.updateMessageConfig({
					data: {
						followerMessage: this.followerMessage,
						message: this.message,
						spreaderMessage: this.spreaderMessage,
						imageMessage: this.imageMessage,
						shopNotice: this.shopNotice,
						shopId: this.userdata.currentShop.id
					}
				});
				if (res) {
					this.followerMessage = res.followerMessage;
					this.message = res.message;
					this.spreaderMessage = res.spreaderMessage;
					this.imageMessage = res.imageMessage;
					this.shopNotice = res.shopNotice;
					// alert('提示信息','保存成功',null,null,null,1000);
					this.origin = res;
					this.$store.commit('setWin', {
						title: '提示信息:',
						content: '保存成功'
					});
				}
			},
			// 点击保存调用的方法
			setConfigFn() {
				// 没有任何的更改，不发请求
				if (this.origin.followerMessage == this.followerMessage &&
					this.origin.message == this.message &&
					this.origin.spreaderMessage == this.spreaderMessage &&
					this.origin.imageMessage == this.imageMessage &&
					this.origin.shopNotice == this.shopNotice
				) {
					return;
				}
				this.setConfig();
			}
		},
		created: function () {
			this.userdata = storage.session('userShop');
			this.getConfig();
		}
	};
</script>

<style lang="less" scoped>
	.wx-config {
		width: 100%;
		height: auto;
		overflow: auto;
		.wx-showBox {
			height: auto;
			width: 100%;
			margin-bottom: 15px;
			padding-bottom: 10px;
			overflow: hidden; // min-width: 1000px;
			h3 {
				display: block;
				height: 45px;
				line-height: 45px;
				font-size: 16px;
				font-weight: bold;
				width: 100%;
				color: #666;
				margin-right: 20px;
				float: left;
			}
			p {
				padding-left: 10px;
				line-height: 30px;
				width: 500px;
				color: #ccc;
				float: left;
				span {
					float: left;
				}
			}
			textarea {
				float: left;
				width: 500px;
				height: 80px;
				padding: 10px;
				border: 1px solid #ccc;
				resize: none;
			}
			textarea:focus {
				outline-offset: 0;
				box-shadow: none;
				outline: none;
			}
		}
		.btn {
			display: block;
			margin: 0 auto;
			width: 200px;
			margin-bottom: 30px;
		}

	}
</style>