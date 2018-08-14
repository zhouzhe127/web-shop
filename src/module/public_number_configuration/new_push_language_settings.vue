<!--
	**推送语设置
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="msnmodel">
		<!-- 首次关注推送语 -->
		<div class="set-line">
			<div class="titles">首次关注推送语</div>
			<div class="line"></div>
		</div>
		<addPushlan :msg='msg_1' :resultArr='followerMessage'></addPushlan>
		<!-- 二次关注推送语 -->
		<div class="set-line">
			<div class="titles">二次关注推送语</div>
			<div class="line"></div>
		</div>
		<addPushlan :msg='msg_2' :resultArr='message'></addPushlan>
		<!-- 通过分享后关注推送语 -->
		<div class="set-line">
			<div class="titles">通过分享后关注推送语</div>
			<div class="line"></div>
		</div>
		<addPushlan :msg='msg_3' :resultArr='spreaderMessage'></addPushlan>
		<!-- 图片加载推送语 -->
		<div class="set-line">
			<div class="titles">图片加载推送语</div>
			<div class="line"></div>
		</div>
		<addPushlan :msg='msg_4' :resultArr='imageMessage'></addPushlan>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="yellow fl" style='width:200px;' @click="addConfig">保存</a>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			shopId: storage.session('userShop').currentShop.id, //shopID
			uploadUrl: storage.session('userShop').uploadUrl, //上传图片
			followerMessage: [], //首次关注推送语
			message: [], //二次关注推送语
			spreaderMessage: [], //通过分享后关注推送语
			imageMessage: [], // 图片加载推送语
			shopNotice: '', // 貌似没用?
			msg_1: '示例:恭喜您,已经成功关注公众号,我们将送您100积分.正值活动期间,快去用积分兑换商品吧!',
			msg_2: '示例:恭喜您,已经成功关注公众号.正值活动期间,快去用积分兑换商品吧!',
			msg_3: '恭喜您，已经成功关注公众号，您是通过扫描 {fromName} 的推广二维码的方式关注的，因此我们将送您 %s 积分、优惠券 {followerCouponInfo}，同时也送给 {fromName} %s 积分、优惠券 {spreaderCouponInfo}。正值活动期间，快去用积分兑换商品吧！',
			msg_4: '示例:憋急，图片正在玩命生成中啦！获得图片后，快去分享给你的盆友们哦，你和好友将同时获得积分奖励哦，齐心协力赚积分兑奖品，看好你哦哇哈哈!'
		};
	},
	mounted() {
		this.getConfig();
	},
	methods: {
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		addConfig: function() { //保存配置
			if (!this.checkForm(this.followerMessage, '1')) return;
			if (!this.checkForm(this.message, '2')) return;
			if (!this.checkForm(this.spreaderMessage, '3')) return;
			if (!this.checkForm(this.imageMessage, '4')) return;
			this.setConfig();
		},
		checkForm: function(arr, type) { //校验
			let langobj = {
				'1': '首次关注推送语',
				'2': '二次关注推送语',
				'3': '通过分享后关注推送语',
				'4': '图片加载推送语',
			};
			for (let item of arr) {
				if (item.typeId == '0') {
					if (item.content == '') {
						this.valiData(`${langobj[type]}请完善文字推送信息!`);
						return false;
					}
				}
				if (item.typeId == '1') {
					if (item.img == '') {
						this.valiData(`${langobj[type]}图文推送请上传图片!`);
						return false;
					}
					if (item.title == '') {
						this.valiData(`${langobj[type]}图文推送请填写标题!`);
						return false;
					}
					if (item.url == '') {
						this.valiData(`${langobj[type]}图文推送请填写链接!`);
						return false;
					}
					for (let int of item.secondary) {
						if (int.imgUrl == '') {
							this.valiData(`${langobj[type]}图文推送二级图文关联请上传图片!`);
							return false;
						}
						if (int.title == '') {
							this.valiData(`${langobj[type]}图文推送二级图文关联请填写标题!`);
							return false;
						}
						if (int.title == '') {
							this.valiData(`${langobj[type]}图文推送二级图文关联请填写链接!`);
							return false;
						}
					}
				}
			}
			return true;
		},
		// 设置配置 （请求）
		async setConfig() {
			let res = await http.updateMessageConfig({
				data: {
					followerMessage: this.sortingData(this.followerMessage),
					message: this.sortingData(this.message),
					spreaderMessage: this.sortingData(this.spreaderMessage),
					imageMessage: this.sortingData(this.imageMessage),
					shopNotice: this.shopNotice,
					shopId: this.shopId
				}
			});
			if (res) {
				this.valiData('保存成功!');
				this.getConfig();
			}
		},
		// 获取配置（请求）
		async getConfig() {
			let res = await http.getWechatConfig({
				data: {
					shopId: this.shopId
				}
			});
			if (res) {
				this.followerMessage = this.getData(JSON.parse(res.followerMessage));
				this.message = this.getData(JSON.parse(res.message));
				this.spreaderMessage = this.getData(JSON.parse(res.spreaderMessage));
				this.imageMessage = this.getData(JSON.parse(res.imageMessage));
			}
		},
		sortingData: function(arr) { //整理数据
			let followerMessage = [];
			for (let item of arr) {
				if (item.typeId == '0') {
					let obj = {
						type: item.typeId,
						content: item.content
					};
					followerMessage.push(obj);
				}
				if (item.typeId == '1') {
					let obj1 = {
						type: item.typeId,
						content: []
					};
					let obj2 = {
						title: item.title,
						description: '',
						url: item.url,
						picurl: item.img
					};
					obj1.content.push(obj2);
					for (let int of item.secondary) {
						let obj3 = {
							title: int.title,
							description: '',
							url: int.url,
							picurl: int.imgUrl
						};
						obj1.content.push(obj3);
					}
					followerMessage.push(obj1);
				}
			}
			return followerMessage;
		},
		getData: function(arr) { //处理获取的数据
			let message = [];
			for (let item of arr) {
				let obj = {
					type: '文字推送', //类型
					typeId: 0, //类型的id
					content: '', //文本推送的文本信息
					img: '', //图文推送的图片
					title: '', //图文推送的标题
					url: '', //图文推送的地址
					secondary: [] //二级图文的关联
				};
				if (item.type == 0) {
					obj.type = '文字推送';
					obj.typeId = item.type;
					obj.content = item.content;
					message.push(obj);
				}
				if (item.type == 1) {
					obj.type = '图文推送';
					obj.typeId = item.type;
					obj.img = item.content[0].picurl;
					obj.title = item.content[0].title;
					obj.url = item.content[0].url;
					for (let i = 1; i < item.content.length; i++) {
						let obj1 = {
							imgUrl: '', //二级图片
							title: '', //标题
							url: '' //链接
						};
						obj1.imgUrl = item.content[i].picurl;
						obj1.title = item.content[i].title;
						obj1.url = item.content[i].url;
						obj.secondary.push(obj1);
					}
					message.push(obj);
				}
			}
			return message;
		}
	},
	components: {
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		addPushlan: () =>
			import ( /* webpackChunkName:"push_language_component" */ './push_language_component'),
	}
};
</script>
<style type="text/css" scoped>
#msnmodel {
	width: 100%;
	height: auto;
}

#msnmodel .set-line {
	width: 100%;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 15px;
	position: relative;
}

#msnmodel .set-line .titles {
	min-width: 5%;
	/*兼容IE*/
	float: left;
	margin-left: 12px;
	font-size: 16px;
	text-align: left;
}

#msnmodel .set-line .line {
	display: inline-block;
	width: 70%;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#msnmodel .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#msnmodel .online-box .push {
	height: 40px;
	margin-bottom: 18px;
}

#msnmodel .online-box .push .push_l {
	width: 70px;
	height: 40px;
	text-align: right;
	line-height: 40px;
	margin-right: 17px;
}

#msnmodel .online-box .push .inp {
	width: 350px;
	height: 40px;
	margin-right: 15px;
	text-indent: 10px;
}

#msnmodel .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 40px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#msnmodel .online-box .online-sub .serial {
	width: 28px;
	height: 28px;
	display: block;
	border-radius: 14px;
	background-color: #2EA8DC;
	color: #fff;
	text-align: center;
	line-height: 28px;
	margin: 6px;
}

#msnmodel .online-box .rightHalf {
	width: 1100px;
	height: auto;
	float: left;
}

#msnmodel .online-box .rightHalf .uploadImgs {
	height: 40px;
	position: relative;
}

#msnmodel .online-box .rightHalf .uploadImgs input {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

#msnmodel .online-box .rightHalf .txt {
	display: block;
	outline: none;
	width: 351px;
	height: 168px;
	resize: none;
	border-color: #CECDCD;
	padding:10px;
}

#msnmodel .online-box .rightHalf .sample {
	color: #A5A5A5;
}

#msnmodel .online-box .rightHalf .imgshow {
	width: 350px;
	height: 251px;
	border: 1px solid #cecdcd;
	margin-bottom: 21px;
}

#msnmodel .online-box .rightHalf .imgshow img {
	display: block;
	width: 100%;
	height: 100%;
}

#msnmodel .online-box .rightHalf .title {
	width: 800px;
	height: 40px;
}

#msnmodel .online-box .rightHalf .title .active {
	background-color: #B3B3B3;
}

#msnmodel .online-box .rightHalf .content {
	width: 800px;
	height: 430px;
	border: 1px solid #b3b3b3;
	padding: 26px 0 0 31px;
}

#msnmodel .online-box .rightHalf .content .smallimg {
	width: 160px;
	height: 160px;
	margin-bottom: 20px;
	border: 1px solid #cecdcd;
}

#msnmodel .online-box .rightHalf .content .smallimg img {
	display: block;
	width: 100%;
	height: 100%;
}

#msnmodel .online-box .rightHalf .title li {
	float: left;
	width: 100px;
	height: 40px;
	margin-right: 10px;
	background-color: #f2f2f2;
	text-align: center;
	line-height: 40px;
	position: relative;
}

#msnmodel .online-box .rightHalf .title li:hover i.deletes {
	position: absolute;
	right: -12px;
	top: -12px;
	background: url(../../res/images/delete.png) center center no-repeat;
	height: 30px;
	width: 30px;
	cursor: pointer;
}

#msnmodel .online-box .addclassify {
	margin-right: 15px;
	width: 200px;
}

#msnmodel .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url('../../../src/res/images/prompt.png') 0 center no-repeat;
	color: #999999;
}

#msnmodel .online-box .delet {
	display: block;
	width: 16px;
	height: 19px;
	background: url('../../../src/res/icon/icondelete.png') no-repeat center;
	margin: 10px 25px 10px 19px;
}
</style>