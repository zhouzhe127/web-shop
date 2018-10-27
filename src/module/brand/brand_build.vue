<template>
	<div class="creatStores" v-cloak>
		<template v-if="!showPic">
			<div class="title">
				<h3 class="titleName">创建品牌</h3>
				<h3 class="titleDashed"></h3>
			</div>
			<div class="aTitle">
				<i></i>
				<h3>基本分类</h3>
			</div>
			<section class="oTop">
				<section style="width:50%;float: left;">
					<section class="obox">
						<h2 class="required">行业分类</h2>
						<section class="typeS">
							<div v-on:click="changeType(false)" :class="{'pickIt':!typeShop}">餐饮</div>
							<div v-on:click="changeType(true)" :class="{'pickIt':typeShop}">零售</div>
							<span style="color: red">行业类型一经填写,无法修改!</span>
						</section>
					</section>
					<section class="obox">
						<h2 class="required">品牌名称</h2>
						<input v-model="brandName" maxlength="40" type="text" class="input" placeholder="输入名称">
					</section>
					<section class="obox">
						<h2 class="required">负责人姓名</h2>
						<input v-model="peopleName" maxlength="15" type="text" class="input" placeholder="输入负责人姓名">
					</section>
					<section class="obox">
						<h2 class="required">联系方式</h2>
						<input v-model="phoneNum" maxlength="11" type="text" class="input" placeholder="输入手机号">
					</section>
				</section>
				<section style="width:50%;float: left;">

					<form class="fr" style="width: 100%;" id="imageUpForm1" enctype="multipart/form-data">
						<section class="obox" style="position: relative;">
							<h2 class="required">上传LOGO</h2>
							<a href="javascript:void(0);" class="blue" style="width:120px;height:40px;line-height: 40px;margin-top:-5px;">
								<template v-if="logoimg !==''">重新上传</template>
								<template v-else>立刻上传</template>
							</a>
							<input type="file" id="file_upload1" @change="imgUpload1" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" style="cursor: pointer;display: block;position: absolute;left: 90px;top:-5px;width:120px;height:40px; opacity: 0;background:red;" />
							<div v-if="logoimg !==''" style="display: inline-block;">
								<!--<span>已上传</span>-->
								<span>( 已上传：</span>
								<label for="uploadFile">{{spliceFileName(logoimg)}} </label>
								<span>)</span>
							</div>
							<!--<div style="width:324px;height:140px;border: 1px solid #bbbbbb;float: left;margin-top:10px;">
										<img v-bind:src=" imgHost +logoimg" id="imgs" style="max-height: 138px;max-width: 320px;" style="border: 2px solid #727071;" />
									</div>-->
						</section>
					</form>
					<form class="fr" style="width: 100%;" id="imageUpForm2" enctype="multipart/form-data">
						<section class="obox" style="position: relative;">
							<h2 class="" style="float: left;width: 80px;height: 40px;line-height: 40px;text-align: center; margin-right: 10px">上传商标</h2>
							<a href="javascript:void(0);" class="blue" style="width:120px;height:40px;line-height: 40px;margin-top:-5px;">
								<template v-if="trademarkimg !==''">重新上传</template>
								<template v-else>立刻上传</template>
							</a>
							<input type="file" id="file_upload2" @change="imgUpload2" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" style="cursor: pointer;display: block;position: absolute;left: 90px;top:-5px;width:120px;height:40px; opacity: 0;background:red;" />
							<div v-if="trademarkimg !==''" style="display: inline-block;">
								<span>( 已上传：</span>
								<span>{{spliceFileName(trademarkimg)}}</span>
								<span> )</span>
							</div>
							<!--<div style="width:324px;height:140px;border: 1px solid #bbbbbb;float: left;margin-top:10px;">
										<img v-bind:src='trademarkimg' id="imgs" style="max-height: 138px;max-width: 320px;" style="border: 2px solid #727071;" />
									</div>-->
						</section>
					</form>
				</section>
			</section>
			<div class="aTitle" style="width:100%;height:20px;line-height: 20px;margin-left: 61px;margin-top:20px;">
				<i style="width:3px;height:20px;background-color:#EE931E;float: left;display: block;"></i>
				<h3>绑定微信</h3>
			</div>
			<section class="oTop" style="height:100px;">
				<section class="obox" style="float: left;">
					<h2 style="float: left;width: 80px;height: 40px;line-height: 40px;text-align: center; margin-right: 10px">AppID</h2>
					<input v-model="appId" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" class="input" maxlength="30" placeholder="请输入微信AppID">
				</section>
				<section class="obox" style="float: left;">
					<h2 style="float: left;width: 80px;height: 40px;line-height: 40px;text-align: center; margin-right: 10px">AppSecret</h2>
					<input v-model="appSecret" type="text" class="input" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="50" placeholder="请输入微信AppSecret">
				</section>
			</section>
			<section style="width:100%;">
				<a v-on:click="returnList" href="javascript:void(0);" class="gray return">{{goingHere?'退出':'返回'}}</a>
				<a v-on:click="creatBrandSubmit" href="javascript:void(0);" class="nextsubmit yellow">提交申请</a>
			</section>
		</template>
		<template v-if="showPic">
			<div class="backDen">
				<div></div>
				<div>您的品牌申请已提交，请耐心等待审核</div>
				<div @click="returnLogin">
					<span style="cursor: pointer">返回登入界面</span>
				</div>
			</div>
		</template>
	</div>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
import http from 'src/manager/http';
let userShop = storage.session('userShop');
export default {
	data() {
		return {
			brandName: '', //创建品牌时，品牌的名字
			peopleName: '', //品牌负责人名字
			phoneNum: '', //品牌联系方式
			logoimg: '', //logo图片地址
			trademarkimg: '', //商标图片地址
			appId: '', //微信appid
			appSecret: '', //微信appSecret

			imglogo1: '',
			imglogo2: '',

			typeShop: false, //false为餐饮true为零售
			showPic: false
		};
	},
	created() {
		this.goingHere = storage.session('goingHere'); //从注册还是创建品牌进入的，true是注册
	},
	methods: {
		//选择行业
		changeType(item) {
			this.typeShop = item;
		},
		//此函数用于html里转换大小写
		spliceFileName: function(name) {
			let arr = name.split('\\'); //注split可以用字符或字符串分割
			let needUpLoadFile = arr[arr.length - 1]; //这就是要取得的图片名称
			return needUpLoadFile;
		},

		//创建品牌提交
		async creatBrandSubmit() {
			if (
				!global.checkData(
					{
						brandName: '品牌名不能为空',
						peopleName: '负责人姓名不能为空',
						phoneNum: {
							reg: /^1[\d]{10,10}$/,
							pro: '联系方式不符合规范,应为1开头的11位数字'
						},
						logoimg: 'LOGO不能为空'
						// appId:'微信AppID不能为空',
						// appSecret:'微信AppSecret不能为空'
					},
					this
				)
			)
				return;

			await http.addBrand({
				data: {
					industry: Number(this.typeShop),
					shopName: this.brandName,
					appId: this.appId,
					appSecret: this.appSecret,
					logoImage: this.imglogo1,
					license: this.imglogo2,
					contactMan: this.peopleName, //品牌负责人名字
					telephone: this.phoneNum //品牌负责人手机号
				}
			});
			let obj = {
				name: this.brandName,
				logoImage: this.imglogo1,
				ischain: 3,
				status: 1,
				direct: [],
				franchise: []
			};
			userShop.shopList.brand.push(obj);
			storage.session('userShop', userShop);
			if (this.goingHere) {
				//注册
				this.showPic = true;
			} else {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '提交成功'
				});
				this.returnList();
			}
		},
		async imgUpload1(e) {
			let data = await http.bigImgUpload({
				data: {
					type: 4,
					shopId: 1
				},
				formId: 'imageUpForm1'
			});
			this.logoimg = e.target.value;
			this.imglogo1 = data;
		},
		async imgUpload2(e) {
			let data = await http.bigImgUpload({
				data: {
					type: 4,
					shopId: 1
				},
				formId: 'imageUpForm2'
			});
			this.trademarkimg = e.target.value;
			this.imglogo2 = data;
		},
		//返回品牌列表
		returnList: function() {
			if (this.goingHere) {
				//注册
				this.$router.push('/');
			} else {
				this.$router.push('/brandAudit');
			}
		},
		//返回登入页面
		returnLogin() {
			this.$router.push('/');
		}
	},
	destroy() {
		storage.session('goingHere', null);
	}
};
</script>
<style type="text/css" scoped>
.creatStores {
	width: 80%;
	height: 630px;
	min-width: 1024px;
	margin: 10px auto;
	background-color: #fff;
	overflow: hidden;
}

.creatStores .title {
	margin-left: 60px;
	line-height: 50px;
	font-weight: bold;
}

.creatStores .title .titleName {
	width: 120px;
	float: left;
	font-size: 16px;
}

.creatStores .title .titleDashed {
	width: 760px;
	border-bottom: 1px dashed #ccc;
	float: left;
	margin-top: 24px;
	font-size: 16px;
	margin-left: -30px;
}

.creatStores .oTop {
	width: 100%;
	height: 250px;
	padding-left: 100px;
}

.creatStores .oTop .obox {
	width: 100%;
	height: 40px;
	margin-top: 20px;
}

.creatStores .oTop .obox .required {
	float: left;
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: right;
	margin-right: 10px;
}

.creatStores .oTop .obox .input {
	width: 260px;
	border: 1px solid #ccc;
	float: left;
}

.creatStores .return {
	width: 130px;
	height: 40px;
	line-height: 40px;
	float: left;
	margin-top: 30px;
	margin-left: 80px;
}

.creatStores .nextsubmit {
	width: 130px;
	height: 40px;
	line-height: 40px;
	float: left;
	margin-top: 30px;
	margin-left: 40px;
	background-color: #e1bb4a;
}

.aTitle {
	width: 100%;
	height: 20px;
	line-height: 20px;
	margin-left: 61px;
	margin-top: 30px;
}

.aTitle i {
	width: 3px;
	height: 20px;
	background-color: #ee931e;
	float: left;
	display: block;
}

.aTitle h3 {
	width: 60%;
	height: 20px;
	line-height: 20px;
	float: left;
	margin-left: 20px;
	font-weight: bold;
}

.title {
	width: 100%;
	height: 50px;
	max-width: 1240px;
}

.typeS div {
	line-height: 35px;
	height: 35px;
	width: 60px;
	display: inline-block;
	text-align: center;
	cursor: pointer;
	color: #bdbdbd;
	border: 1px solid #bdbdbd;
}
.typeS div.pickIt {
	background-color: #e1bb4a;
	border: 1px solid #e1bb4a;
	color: white;
}

.backDen {
	position: absolute;
	left: 30%;
	margin-top: 150px;
	width: 50%;
}
.backDen div {
	width: 300px;
}
.backDen div:first-child {
	background: url('./../../res/images/brandResBac.png') no-repeat;
	text-align: center;
	height: 180px;
}
.backDen div:nth-child(2) {
	margin: 30px 0;
	text-align: center;
	height: 40px;
	line-height: 40px;
	color: #a1a1a1;
	font-size: 16px;
}
.backDen div:nth-child(3) {
	margin-left: 60px;
}
.backDen div:nth-child(3) span {
	display: inline-block;
	width: 180px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 16px;
	border-radius: 5px;
	background-color: #f39800;
	color: white;
}
</style>