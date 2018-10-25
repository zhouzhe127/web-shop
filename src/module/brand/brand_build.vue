<template>
	<div class="creatStores" v-cloak>
		<template>
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
						<!--行业选择框-->
						<section class="statisticsList fl" style="margin-right:40px;">
							<section v-on:click="showAreaList" class="tableListInp">
								<span class="oSpan">{{allArea}}</span>
								<div class="fl">
									<i></i>
								</div>
							</section>
							<ul v-if="areaBtn" class="tableListUl">
								<li v-on:click="selectUlArea(index,item)" v-for='(item,index) in areaList' :key="index">{{item.name}}</li>
							</ul>
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
				</section>
				<section style="width:50%;float: left;">
					<section class="obox">
						<h2 class="required">联系方式</h2>
						<input v-model="phoneNum" maxlength="11" type="text" class="input" placeholder="输入手机号">
					</section>
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
			<div class="aTitle" style="width:100%;height:20px;line-height: 20px;margin-left: 61px;margin-top: 30px;">
				<i style="width:3px;height:20px;background-color:#EE931E;float: left;display: block;"></i>
				<h3>绑定微信</h3>
			</div>
			<section class="oTop" style="height:100px;">
				<section class="obox" style="width:50%;float: left;">
					<h2 style="float: left;width: 80px;height: 40px;line-height: 40px;text-align: center; margin-right: 10px">AppID</h2>
					<input v-model="appId" type="text" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" class="input" maxlength="30" placeholder="请输入微信AppID">
				</section>
				<section class="obox" style="width:50%;float: left;">
					<h2 style="float: left;width: 80px;height: 40px;line-height: 40px;text-align: center; margin-right: 10px">AppSecret</h2>
					<input v-model="appSecret" type="text" class="input" onkeyup="value=value.replace(/[^\w\.\/]/ig,'')" maxlength="50" placeholder="请输入微信AppSecret">
				</section>
			</section>
			<section style="width:100%;">
				<a v-on:click="returnList" href="javascript:void(0);" class="gray return">返回</a>
				<a v-on:click="creatBrandSubmit" href="javascript:void(0);" class="nextsubmit yellow">提交</a>
			</section>
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
				areaBtn: false, // 分类列表点击显示隐藏
				areaList: storage.session('areaList'), // 行业分类列表
				brandName: '', //创建品牌时，品牌的名字
				peopleName: '', //品牌负责人名字
				phoneNum: '', //品牌联系方式
				logoimg: '', //logo图片地址
				trademarkimg: '', //商标图片地址
				appId: '', //微信appid
				appSecret: '', //微信appSecret
				allArea: '请选择行业分类', // 分类名所显示
				index1: -1,
				imglogo1: '',
				imglogo2: ''
			};
		},
		methods: {
			//显示行业列表
			showAreaList: function(e) {
				e.stopPropagation();
				this.areaBtn = !this.areaBtn;
			},
			// 选择行业点击确定
			selectUlArea: function(index, data) {
				this.allArea = data.name;
				this.areaBtn = !this.areaBtn;
				this.index1 = index;
			},
			//此函数用于html里转换大小写
			spliceFileName: function(name) {
				let arr = name.split('\\'); //注split可以用字符或字符串分割
				let needUpLoadFile = arr[arr.length - 1]; //这就是要取得的图片名称
				return needUpLoadFile;
			},
			//返回品牌列表
			returnList: function() {
				this.$router.push('/brandAudit');
			},
			//创建品牌提交
			async creatBrandSubmit() {
				if(!global.checkData({
					index1: {
						cond: '$$>=0',
						pro: '请选择行业分类'
					},
					brandName: '品牌名不能为空',
					peopleName: '负责人姓名不能为空',
					phoneNum: {
						reg: /^1[\d]{10,10}$/,
						pro: '联系方式不符合规范,应为1开头的11位数字'
					},
					logoimg: 'LOGO不能为空',
					// appId:'微信AppID不能为空',
					// appSecret:'微信AppSecret不能为空'
				}, this)) return;

				await http.addBrand({
					data: {
						industry: this.areaList[this.index1].id,
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
					'name': this.brandName,
					'logoImage': this.imglogo1,
					'ischain': 3,
					'status': 1,
					'direct': [],
					'franchise': [],
					'industry': this.areaList[this.index1].id
				};
				userShop.shopList.brand.push(obj);
				storage.session('userShop', userShop);
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '提交成功'
				});
				this.returnList();

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
			}
		}
	};
</script>
<style type="text/css" scoped>
	.creatStores {
		width: 80%;
		height: 630px;
		min-width: 1024px;
		margin: 35px auto;
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
		height: 210px;
		padding-left: 100px;
	}
	
	.creatStores .oTop .obox {
		width: 100%;
		height: 40px;
		margin-top: 30px;
		margin-top: 30px;
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
	
	.creatStores .oLeft {
		width: 50%;
		height: 435px;
		padding-left: 45px;
		float: left;
	}
	
	.creatStores .oLeft .obox {
		width: 100%;
		height: 40px;
		margin-top: 28px;
	}
	
	.creatStores .oLeft .obox .required {
		float: left;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: right;
		margin-right: 10px;
	}
	
	.creatStores .oLeft .obox .input {
		width: 335px;
		border: 1px solid #ccc;
		float: left;
	}
	
	.creatStores .obox .tacitly {
		float: left;
		width: 100px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		background: #f4f5f7;
	}
	
	.creatStores .return {
		width: 130px;
		height: 50px;
		line-height: 50px;
		float: left;
		margin-top: 20px;
		margin-left: 445px;
	}
	
	.creatStores .nextsubmit {
		width: 130px;
		height: 50px;
		line-height: 50px;
		float: left;
		margin-top: 20px;
		margin-left: 40px;
	}
	
	.obox .selectbtns {
		margin-left: 85px;
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
	
	.statisticsList {
		position: relative;
		line-height: 41px;
	}
	
	.statisticsList input {
		text-align: center;
		display: block;
		float: left;
		height: 41px;
		width: 158px;
		outline: none;
		border: 0;
		border-right: 1px #b3b3b3 solid;
	}
	
	.statisticsList ul {
		width: 100%;
		margin: 0;
		position: absolute;
		top: 40px;
		left: 0;
		z-index: 10;
		background: #fff;
		max-height: 300px;
		overflow: auto;
		border: 1px #b3b3b3 solid;
		border-top: 0;
	}
	
	.statisticsList ul li {
		text-align: center;
		height: 41px;
		border: 1px #ccc solid;
		background: #fff;
		cursor: pointer;
		border-right: 0 !important;
		border-left: 0 !important;
		border-bottom: 0 !important;
	}
	
	.statisticsList ul li:last-of-type {
		border-bottom: 0;
	}
	
	.tableListInp {
		height: 40px;
		color: #666666;
		border: #b3b3b3 solid 1px;
		cursor: pointer;
	}
	
	.tableListInp .oSpan {
		height: 39px;
		line-height: 39px;
		width: 215px;
		display: block;
		float: left;
		text-align: center;
		border-right: 1px #b3b3b3 solid;
	}
	
	.tableListInp div {
		width: 40px;
		height: 40px;
		position: relative;
		z-index: 5;
	}
	
	.tableListInp div i {
		height: 10px;
		width: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -5px;
		margin-left: -5px;
		border-top: 10px solid #b3b3b3;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		box-sizing: border-box;
	}
</style>