<template>
	<div id="applet">
		<!-- 加载页 主页 -->
		<div class="compared">
			<!-- <span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span> -->
		</div>
		<!-- 主体 -->
		<div class="main_box clearfix">
			<div class="main_l fl">
				<!-- 手机主体内容 -->
				<div class="main_body">
					<div class="show">
						<img v-if="endingImage != ''" alt="logo" v-bind:src="uploadUrl  + endingImage" class="endImage" />
						<div class="header">
							<img class="logo" alt="logo" v-bind:src="uploadUrl  + logoImage" />
							<p>欢迎来到{{shopName}}</p>
							<div class="disc">
								<span style="background:#333;"></span>
								<span style="background:#444;"></span>
								<span style="background:#555;"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="main_r fl">
				<template v-if="payType == '0'">
					<div class="choose clearfix">
						<singleSelect class="fl" :index='integralOn' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="integralList" :name="'name'" :key='"id"'></singleSelect>
					</div>
					<!-- 上传图片 -->
					<div class="choose clearfix" v-if="integralOn == '1'">
						<div class="uploadImgs fl">
							<a href="javascript:void(0);" class="addclassify fl">上传图片</a>
							<form enctype="multipart/form-data" id="endImage">
								<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="bgNameChange" />
							</form>
						</div>
						<div class="handle-tips fl">
							<i></i> 尺寸:750*1206,图片大小不能超过1M
						</div>
					</div>
				</template>
				<template v-else>
					<!-- 授权用户方式 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">授权用户方式</span>
						<div class="rightHalf">
							<singleSelect class="fl" :index='authorizedId' @selOn='haveAuthorized' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="authorizedList" :name="'name'" :key='"id"'></singleSelect>
						</div>
					</div>
				</template>
			</div>
			<div class="saveConfig">
				<a href="javascript:;" class="yellow" style="width:200px;" @click="saveConfig">保存</a>
			</div>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
export default {
	data() {
		return {
			shopId: '', //shopID
			payWays: [{
					id: 0,
					name: '加载页'
				},
				{
					id: 1,
					name: '主页'
				}
			], //类型
			payType: 0,
			integralList: [{
					name: '默认'
				},
				{
					name: '自定义'
				}
			],
			integralOn: 0, //活动对象的选择
			authorizedList: [{
					name: '验证码授权'
				},
				{
					name: '直接授权'
				}
			],
			authorizedId: 0,
			uploadUrl: '', //图片前缀
			shopName: '',
			logoImage: '',
			endingImage: '' //上传的背景图片
		};
	},
	props:{
		number:String,//商户id
		secret:String, //密码
		authMiniBackground:String
	},
	methods: {
		changeRadio: function(item) {
			//选择渠道
			let id = item.id;
			this.payType = id;
			//this.getStatistics();
		},
		haveIndex(i) { //活动对象选择
			this.integralOn = i;
			if (this.integralOn == 0) {
				this.endingImage = '';
			}
			//this.abc();
		},
		haveAuthorized(i) {
			this.authorizedId = i;
		},
		async bgNameChange() {
			// 上传图片 背景图片回调
			let res = await http.uploadImg({
				data: {
					type: 8,
					shopId: this.shopId
				},
				formId: 'endImage',
			});
			this.endingImage = res;
			//this.followerMessage[index].img = this.uploadUrl + res; //图片
			// this.endingImage = res;//图片传给后台
			// let bgName = this.endingImage.lastIndexOf('/');
			// this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);
		},
		returnStore: function() { //返回
			this.$emit('throwWinResult', false,this.endingImage);
			this.$store.commit('setPageTools', {});
		},
		saveConfig: function() { //保存配置
			this.updateAuthData();
		},
		async updateAuthData() {
			let data = await http.updateAuthData({
				data: {
					authMiniBackground: this.endingImage,
					merchantId: this.number,
					merchantSecret: this.secret
				}
			})
			if (data) {
				this.endingImage = data.authMiniBackground;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '保存成功',
				});
			}
		}
	},
	components: {
		'singleSelect': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-blue'],
			fn: () => {
				this.returnStore();
			}
		}]);
		let userShop = storage.session('userShop');
		this.uploadUrl = userShop.uploadUrl;
		this.shopId = userShop.currentShop.id;
		this.shopName = userShop.currentShop.name;
		this.logoImage = userShop.currentShop.logoImage;
		this.endingImage = this.authMiniBackground;
		if(this.endingImage != ''){
			this.integralOn = 1;
		}
	}
};
</script>
<style type="text/css" scoped>
#applet .compared {
	height: 40px;
	margin-bottom: 28px;
}

#applet .compared span {
	width: 120px;
	height: 40px;
	font-size: 16px;
	display: inline-block;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	background-color: #f2f2f2;
	border-radius: 4px;
	margin-right: 15px;
}

#applet .compared .effect {
	background-color: #28a8e0;
	color: #ffffff;
}

#applet .main_box .main_l {
	width: 368px;
	height: 753px;
	margin-right: 24px;
	background: url(../../../res/images/phone.png) center no-repeat;
	background-size: 100% 100%;
	position: relative;
}

#applet .main_box .main_l .main_body {
	width: 320px;
	height: 569px;
	position: absolute;
	left: 24px;
	top: 90px;
	background: #fff;
}

#applet .main_box .main_l .main_body .show {
	width: 100%;
	height: 100%;
	position: relative;
}

#applet .main_box .main_l .main_body .show .endImage {
	display: block;
	width: 100%;
	height: 100%;
}

#applet .main_box .main_l .main_body .show .header {
	width: 100%;
	position: absolute;
	left: 0;
	top: 60px;
}

#applet .main_box .main_l .main_body .show .header .logo {
	width: 60px;
	height: 60px;
	display: block;
	margin: 0 auto;
	margin-bottom: 10px;
}

#applet .main_box .main_l .main_body .show .header p {
	text-align: center;
	line-height: 40px;
	font-weight: bold;
	margin-bottom: 5px;
}

#applet .main_box .main_l .main_body .show .header .disc {
	overflow: hidden;
	display: flex;
	justify-content: center;
}

#applet .main_box .main_l .main_body .show .header .disc span {
	display: block;
	width: 5px;
	height: 5px;
	border-radius: 2.5px;
	background: #999;
	margin-right: 5px;
	float: left;
}

#applet .main_box .main_r {
	width: 685px;
	height: 580px;
	background-color: #F6F6F6;
	margin-top: 90px;
	padding: 40px;
	margin-bottom: 50px;
}

#applet .main_box .saveConfig {
	width: 685px;
	height: 40px;
	display: flex;
	justify-content: center;
}

#applet .main_box .main_r .choose {
	margin-bottom: 28px;
}

#applet .main_box .main_r .choose .uploadImgs {
	height: 40px;
	position: relative;
}

#applet .main_box .main_r .choose .uploadImgs input {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	color: #999999;
}

#applet .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#applet .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 100px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#applet .online-box .rightHalf {
	max-width: 700px;
	height: auto;
	float: left;
}
</style>