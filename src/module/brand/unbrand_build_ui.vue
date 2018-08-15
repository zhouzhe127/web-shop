/**
 * @Author: zhigang.li 
 * @Date: 2018-08-06 15:51:59 
 * @Last Modified by: zhigang.li
 * @Last Modified time: 2018-08-06 16:34:29
 * @Module:  建立无品牌门店 --reset
 */
<template>
	<div class="creatStores" v-cloak>
		<div class="title">
			<h3 class="titleName">建立门店</h3>
			<h3 class="titleDashed"></h3>
		</div>
		<el-form :model="formData" :rules="rules" label-position="right" label-width="110px">
			<section class="oLeft">
				<el-form-item label="店铺类型" required>
					<el-radio-group v-model="formData.shopType" required>
						<el-radio-button label="1">直营店</el-radio-button>
						<el-radio-button label="2">加盟店</el-radio-button>
						<el-radio-button label="0" v-if="!brandEntry">无品牌</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择品牌" :required="formData.shopType!=0 &&brandList &&brandList.length>0">
					<el-select v-model="formData.selectBrandName" placeholder="请选择" :disabled="formData.shopType == 0|| !brandList ||brandList.length==0">
						<el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" >
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="店铺名称" prop="shopName">
					<el-input placeholder="请输入内容" v-model="formData.shopName" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="行业分类" required>
					<el-radio-group v-model="formData.typeIndex">
						<el-radio label="0" border>餐饮</el-radio>
						<el-radio label="1" border>零售</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="店铺地址" required>
					<el-input placeholder="请输入内容" v-model="formData.shopAddress" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="标签">
					<el-input placeholder="请输入内容" v-model="formData.labelName" class="input-add-tag">
						<el-button slot="append" icon="el-icon-check" @click="addlabel"></el-button>
					</el-input>
					<el-tag type="success" v-for="(v,i) in labelNameList" :key="i" style="margin-left:10px" closable>{{v}}</el-tag>
					<div v-if="!isNobrand">
						<el-checkbox v-model="v.select" :label="v.name" border size="medium" v-for="(v,i) in tagList" :key="i"></el-checkbox>
					</div>
					<el-alert class="sd-alert" v-if="labelNameList.length>=3" title="最多添加三个标签" type="warning" center show-icon>
					</el-alert>
				</el-form-item>
			</section>
			<section class="oLeft">
				<el-form-item label="店铺负责人">
					<el-input placeholder="请输入店铺负责人" v-model="formData.createrName" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="联系方式">
					<el-input placeholder="请输入店铺联系方式" v-model="formData.createrPhone" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="营业执照编号">
					<el-input placeholder="请输入营业执照号" v-model="formData.businessLicenseNum" clearable>
					</el-input>
				</el-form-item>
				<el-form-item label="上传营业执照">
					<form class="fr" style="width: 100%;" id="imageUpForm" enctype="multipart/form-data">
						<form class="fr" style="width: 100%;" id="imageUpForm" enctype="multipart/form-data">
							<section class="obox" style="position: relative;">
								<el-button type="success">立刻上传</el-button>
								<!-- <a href="javascript:void(0);" class="blue" style="width:120px;height:40px;line-height: 40px;margin-top:-5px;">立刻上传</a> -->
								<input type="file" @change="imgUpload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" style="cursor: pointer;display: block;position: absolute;left: 110px;top:-5px;width:120px;height:40px; opacity: 0;background:red;" />
								<div v-if="businessLicenseimg !==''" style="display: inline-block;">
									<span>( 已上传：</span>
									<span>{{spliceFileName(businessLicenseimg)}}</span>
									<span> )</span>
								</div>
							</section>
						</form>
					</form>
				</el-form-item>
				<el-form-item label="卫生许可证" v-if="formData.typeIndex === 0">
					<form v-show="formData.typeIndex === 0" class="fr" style="width: 100%;" id="imageUpForm2" enctype="multipart/form-data">
						<section class="obox" style="position: relative;">
							<el-button type="success">立刻上传</el-button>
							<input type="file" @change="imgUpload2" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" style="cursor: pointer;display: block;position: absolute;left: 110px;top:-5px;width:120px;height:40px; opacity: 0;background:red;" />
							<div v-if="healthLicense !==''" style="display: inline-block;">
								<span>( 已上传：</span>
								<span>{{spliceFileName(healthLicense)}}</span>
								<span> )</span>
							</div>
						</section>
					</form>
				</el-form-item>
				<el-form-item label="详细介绍">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="formData.description">
					</el-input>
				</el-form-item>
			</section>
			<section style="width:100%;clear:both;">
				<div class="footerSubmit">
					<el-button @click="returnList" type="info">返回</el-button>
					<el-button @click="creatStoresSubmit" type="primary">提交</el-button>
				</div>
			</section>
		</el-form>

	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
let userData = storage.session('userShop');
export default {
	data() {
		return {
			formData: { 
				// 左
				shopType: 2, // 店铺类型
				selectBrandName: '', //创建门店时的选择品牌
				shopName: '',
				typeIndex: '', //行业分类下标 0 餐饮 1 零售
				shopAddress: '', //创建的门店地址
				labelName: '', //创建标签名
				// 右
				createrName: '', // 创建人 名称
				createrPhone: '', // 创建人 手机号
				businessLicenseNum: '', //新创建的店铺的营业执照编号
				description: '', // 详细介绍
			},
			rules: {
				shopType: [
					{
						required: true,
						message: '请选择店铺类型',
						trigger: 'change'
					}
				],
				shopName: [
					{
						required: true,
						message: '请输入店铺名称',
						trigger: 'blur'
					},
					{
						min: 2,
						max: 15,
						message: '长度在 2 到 15 个字符',
						trigger: 'blur'
					}
				]
			},
			brandList: storage.session('shopList'), // 品牌列表
			// isNobrand: false, //如果选择无品牌时，遮罩起作用
			// iscrBrandDetial: false, //创建品牌门店是从哪方进入，默认false：无品牌时进入
			brandEntry: false, // 从无品牌进入
			// areaBtn1: false, // 品牌列表点击显示隐藏
			// createShopName: '', //创建的门店名
			labelNameList: [], //创建的标签名列表
			businessLicenseimg: '', // 营业执照 图片地址
			healthLicense: '', // 卫生许可证 图片地址
			// index: 2, //店铺类型下标，默认单店
			tagList: [], // 品牌的标签列表
			// indexList: [],
			// item: '',
			imglogo1: '',
			imglogo2: '',
			brandId: null,
		};
	},
	computed: {
		isNobrand() {
			return this.formData.shopType == 2;
		}
	},
	methods: {
		//选择店铺业态点击
		// typeRadio: function(index) {
		// 	this.typeIndex = index;
		// },
		lsitRadio: function(index) {
			if (index) {
				this.labelNameList = index;
				this.indexList = index;
				let labelNum = this.labelNameList.length;
				if (labelNum > 3) {
					this.alert('提示', '标签最多只能选择三个！');
					this.labelNameList.splice(3, 1);
					return false;
				}
			}
		},
		async getTagList() {
			let data = await http.getAreaTag({
				data: {}
			});
			this.tagList = data;
		},
		async imgUpload(e) {
			let data = await http.bigImgUpload({
				data: {
					type: 4,
					shopId: 1
				},
				formId: 'imageUpForm'
			});
			this.businessLicenseimg = e.target.value;
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
			this.healthLicense = e.target.value;
			this.imglogo2 = data;
		},
		alert: function(title,content) {
			// this.$store.commit('setWin', {
				// 	title: title,
			// 	content: con
			// });
			this.$alert(content, title, {
				confirmButtonText: '确定',
				// callback:
			});
		},
		msg(type, con){
			this.$message({
				type,
				message: con
			});
		},
		//显示品牌列表
		showAreaList1: function(e) {
			if (this.index == 2) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '无品牌门店不能选择品牌'
				});
				return;
			}
			e.stopPropagation();
			this.areaBtn1 = !this.areaBtn1;
		},
		// 选择品牌点击确定
		selectUlArea1: function(data) {
			this.allArea1 = data.name;
			this.areaBtn1 = !this.areaBtn1;
			this.brandId = data.id;
		},
		//增加标签按钮点击
		addlabel: function() {
			if (this.labelName.length > 5) {
				// this.$store.commit('setWin', {
				// 	title: '操作提示',
				// 	co ntent: '标签长度最长5位'				// });
				this.msg('error','标签长度最长5位')
				return false;
			}
			if (this.labelName == '') {
				this.msg('error','标签名不能为空')
				return false;
			}
			let labelNum = this.labelNameList.length + 1;
			if (labelNum > 3) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '标签最多只能添加3个'
				});
				return false;
			} else {
				for (let i = 0; i < this.labelNameList.length; i++) {
					if (this.labelName == this.labelNameList[i]) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '标签名重复，请重新添加。'
						});
						return false;
					}
				}
				this.labelNameList.push(this.labelName);
				this.labelName = '';
			}
		},
		//删除标签
		closeLabel: function(index) {
			this.labelNameList.splice(index, 1);
			let labelNum = this.labelNameList.length;
			if (labelNum > 3) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '标签最多只能选择三个！'
				});
			}
		},
		//点击默认标签
		addTagList: function() {
			let labelNum = this.labelNameList.length;
			if (labelNum > 3) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '标签最多只能选择三个！'
				});
				this.labelNameList.splice(3, 1);
				return false;
			}
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
		//创建门店提交按钮点击
		async creatStoresSubmit() {
			if (
				this.list[this.index].id != 0 &&
				this.allArea1 == '请选择品牌' &&
				!this.brandEntry
			) {
				this.msg('warn','请选择品牌！')
				// this.$store.commit('setWin', {
					// 	title: '操作提示',
				// 	content: '请选择品牌！'
				// });
				return false;
			} else if (
				this.list[this.index].id != 0 &&
				this.selectBrandName == '' &&
				this.brandEntry
			) {
				this.msg('warn','请选择品牌！')
				return false;
			}
			if (this.typeIndex < 0) {
				this.msg('warn','店铺行业分类不能为空！')
				return false;
			}

			if (
				!global.checkData(
					{
						createShopName: '店铺名称不能为空！',
						shopAddress: '店铺地址不能为空！',
						creatShopPeople: '店铺负责人不能为空！',
						creatShopPhone: {
							reg: /^1[\d]{10,10}$/,
							pro: '联系方式不符合规范,应为1开头的11位数字'
						},
						businessLicenseNum: '营业执照编号不能为空！',
						businessLicenseimg: '请上传营业执照！',
						description: '详细介绍不能为空！'
					},
					this
				)
			)
				return;
			if (this.typeIndex == 0 && this.imglogo2 == '') {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '餐饮行业需上传卫生许可证！'
				});
				return false;
			}
			let str = this.labelNameList.join(','); //标签的列表转化为字符串
			await http.addShop({
				data: {
					ischain: this.list[this.index].id, //店铺类型 0.单店 1.直营店 2.加盟店
					brandId: this.list[this.index].id == 0 ? '' : this.brandId, //所属品牌id
					shopName: this.createShopName, //新创建的店铺名
					address: this.shopAddress, //新创建的店铺地址
					areaTag: str, //新创建的店铺标签可以为空
					contactMan: this.creatShopPeople, //新创建的店铺联系人
					telephone: this.creatShopPhone, //新创建的店铺手机号
					licenseNum: this.businessLicenseNum, //新创建的店铺的营业执照编号
					license: this.imglogo1, //新创建的店铺的营业执照图片地址
					healthLicense: this.imglogo2, //新创建的店铺的营业执照图片地址
					description: this.description, //新创建的店铺的详细介绍
					industry: this.typeIndex //新创建的店铺的业态
				}
			});
			let obj = {
				name: this.createShopName,
				address: this.shopAddress,
				telephone: this.creatShopPhone,
				contactMan: this.creatShopPeople,
				status: 1
			};
			if (this.brandId != 0) {
				for (let i in userData.shopList.brand) {
					if (userData.shopList.brand[i].id == this.brandId) {
						if (this.list[this.index].id == 1) {
							obj.ischain = 1;
							userData.shopList.brand[i].direct.push(obj);
						} else {
							obj.ischain = 2;
							userData.shopList.brand[i].franchise.push(obj);
						}
					}
				}
			} else {
				obj.ischain = 0;
				userData.shopList.noBrand.push(obj);
			}
			storage.session('userShop', userData);
			window.history.go(-1);
		}
	},
	components: {
		radioBtn: () =>
			import(/*webpackChunkName:'radio_btn'*/ 'src/components/radio_btn'),
		mulSelect: () =>
			import(/*webpackChunkName: 'mul_select'*/ 'src/components/mul_select')
	},
	mounted: function() {
		storage.session('shopList', null);
		let shopIn = storage.session('shopIn');
		if (shopIn) {
			this.brandEntry = true;
			this.selectBrandName =shopIn.name;
			this.brandId = shopIn.id;
			this.index = 0;
		}
		this.getTagList();
	}
};
</script>
<style type="text/css" scoped>
.sd-alert {
	height: 40px;
}
.footerSubmit {
	width: 166px;
	margin: 0 auto;
}
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

.title {
	width: 100%;
	height: 50px;
	max-width: 1240px;
}

.creatStores .title .titleDashed {
	width: 760px;
	border-bottom: 1px dashed #ccc;
	float: left;
	margin-top: 24px;
	font-size: 16px;
	margin-left: -30px;
}

.creatStores .oLeft {
	width: 50%;
	min-height: 400px;
	padding-left: 45px;
	float: left;
}

.creatStores .oLeft .obox {
	width: 100%;
	height: 40px;
	/* margin-top: 20px; */
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
	width: 260px;
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

.selectbtns span {
	margin-left: 20px;
	min-width: 80px;
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

.addinput {
	width: 165px;
	height: 34px;
	float: left;
	border: 1px solid #cdcdcd;
	margin-left: 18px;
}

.oDiv {
	width: 34px;
	height: 32px;
	border-left: 1px solid #cdcdcd;
	float: right;
}

.oZhe {
	width: 100%;
	height: 44px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 6;
	background-color: #fff;
	filter: alpha(opacity=60);
	opacity: 0.6;
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

.labeldetial {
	height: 40;
	line-height: 40px;
	float: left;
	position: relative;
}

.labeldetial:hover .dClose {
	display: block;
}

.labeldetial .dClose {
	position: absolute;
	top: -6px;
	right: 0px;
	width: 10px;
	height: 10px;
	display: none;
	cursor: pointer;
}
</style>