<template>
	<div id="self-help" class="self-help">
		<section v-if="!show">
			<!-- 基础配置 -->
			<div class="set-line">
				<div class="titles">基础配置</div>
				<div class="line"></div>
			</div>
			<!-- 开启自助模式 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">开启自助模式</span>
				<div class="rightHalf">
					<!-- <onOff :key='1' :status="selfStatus" @statusChange="openselfStatus" class='fl'></onOff> -->
					<el-switch v-model="selfStatus" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<!-- 自助模式关闭状态显示 -->
			<div class="self-help-box clearfix" v-if="!selfStatus">
				<span class="fl self-help-sub">查看菜单</span>
				<div class="rightHalf">
					<!-- <onOff :key='1' :status="menuState" @statusChange="openmenuState" class='fl'></onOff> -->
					<el-switch v-model="menuState" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<!-- <div class="self-help-box">
				<span class="fl self-help-sub">商品显示</span>
				<span class="fl">
					<mulSelect :list.sync="contentLsit" :selects.sync="contenSelect" :name='"name"' :key='"id"' :styles="{backgroundColor:'rgb(240,240,240)'}"></mulSelect>
				</span>
			</div> -->
			<!-- 生成二维码 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">生成二维码</span>
				<a @click='generatorCode' class="fl add_btn qRcode">批量生成二维码</a>
				<div class="fl handle-tips">
					<i></i> 批量生成自助模式二维码
				</div>
			</div>
			<!-- 扫码选择门店功能 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">扫码选择门店功能</span>
				<div class="rightHalf">
					<!-- <onOff :key='1' :status="storeSwitch" @statusChange="selectStores"></onOff> -->
					<el-switch v-model="storeSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<!-- 支付后发送自助短信 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">支付后发送自助短信</span>
				<!-- <onOff :key='1' :status="smsSwitch" @statusChange="selectSMS"></onOff> -->
				<div class="rightHalf">
					<el-switch v-model="smsSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<!-- 固定支付方式 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub required">固定支付方式</span>
				<span class="fl">
					<mulSelect :list.sync="goodsType" :selects.sync="goodsSelect" :styles="{'marginRight':'8px','border-radius':'4px'}" :name='"name"'
					    :key='"id"'></mulSelect>
				</span>
			</div>
			<!-- 结账功能 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub required">结账功能</span>
				<a class="on-span add fl" @click="openWindow()"></a>
				<div class="fl add-config">
					<span class="fl" v-for="(funList,i) in checkoutMenu" :key='i' @click="openWindow(i,funList,'1')">{{funList.name}}
						<i @click.stop="deleteList(i,funList)"></i>
					</span>
				</div>
				<div class="fl handle-tips">
					<i></i> 最多添加4种结账功能
				</div>
			</div>
			<!-- 生成链接 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">生成链接</span>
				<section class="fl sec_wrap">
					<div class="link" v-for="(funList,i) in checkoutMenu" :key='i' v-if="funList.id != '' && funList.id != undefined">
						<div class="fl div_wrap">
							<div class="fl div_innit">{{funList.name}}</div>
							<input type="text" class="num num_input" ref='copyTxt' :value="linkUrl+funList.id " />
						</div>
						<a href="javascript:;" class="fl alink_wap" @click="copyCode(i)">复制链接</a>
					</div>
					<div class="handle-tips div_tips">
						<i></i> 保存后链接生效
					</div>
				</section>
			</div>
			<!--进阶配置 -->
			<div class="set-line">
				<div class="titles">进阶配置</div>
				<div class="line"></div>
			</div>
			<!-- 关注公众号并点餐 -->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub">关注公众号并点餐</span>
				<!-- <onOff :key='1' :status="isattention" @statusChange="openisattention" class='fl'></onOff> -->
				<div class="rightHalf" style="width:50px;">
					<el-switch v-model="isattention" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<div class="prompting fl" @click="isPublicNumber">
					<div class="detDiv" style="top: 0px;left: 45px;" v-if="publicNumber">
						<i class="detI triright"></i>
						<h3 class="detH3">
							关闭该功能后，生成的二维码无点餐推送。
						</h3>
					</div>
				</div>
			</div>
			<section v-if="isattention">
				<!-- 标题设置 -->
				<div class="self-help-box clearfix">
					<span class="fl self-help-sub">标题设置</span>
					<!-- <singleSelect class='fl' :index='integralOn' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="integralList" :name="'name'" :key='"id"'></singleSelect> -->
					<el-radio-group v-model="integralName" class="fl">
						<el-radio v-for="(item,index) in integralList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)"></el-radio>
					</el-radio-group>
					<div class="prompting fl" @click="isHeadings">
						<div class="detDiv" style="top: 0px;left: 45px;" v-if="headings">
							<i class="detI triright"></i>
							<h3 class="detH3">
								固定标题：自定义，显示在公众号推送的标题。
								<br/> 自动标题：默认根据区域名名称一桌台名称，自动补充为标题。
							</h3>
						</div>
					</div>
				</div>
				<!-- 请输入固定标题 -->
				<div class="self-help-box clearfix" v-if="integralOn == '0'">
					<span class="fl self-help-sub"></span>
					<div class="rightHalf">
						<!-- <input type="text" class="inp" name="" v-model="title1" placeholder="请输入固定标题" maxlength="15" /> -->
						<el-input v-model="title1" maxlength="15" placeholder="请输入固定标题" style="width:200px;"></el-input>
						<div class="handle-tips">
							<i></i> 限15字以内
						</div>
					</div>
				</div>
				<!-- 图片显示-->
				<div class="self-help-box clearfix" v-if="image != ''">
					<span class="fl self-help-sub"></span>
					<div class="rightHalf">
						<div class="uploadImg fl">
							<img alt="logo" v-bind:src="uploadUrl  + image" />
						</div>
							<div class="fl updateName">(已上传：{{imageName}})</div>
						</div>
					</div>
					<!-- 上传图片 -->
					<div class="self-help-box clearfix">
						<span class="fl self-help-sub">显示图片</span>
						<div class="uploadImgs fl">
							<!-- <a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a> -->
							<el-button type="primary" icon="el-icon-plus" class="buttons">
								上传图片
							</el-button>
							<form enctype="multipart/form-data" id="bgImage1">
								<input type="file" id="bg_upload" @change='bgNameChange' accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" />
							</form>
						</div>
						<div class="fl handle-tips">
							<i></i> 尺寸 640*480
						</div>
					</div>
					<!-- 下载二维码 -->
					<div class="self-help-box clearfix">
						<span class="fl self-help-sub">下载二维码</span>
						<!-- <a @click="downloadCode()" class="download" href="javascript:void(0);">下载二维码</a> -->
						<el-button type="primary" icon="el-icon-download" class="buttons" @click="downloadCode()">
							下载二维码
						</el-button>
					</div>
			</section>
			<!--取消，保存按钮-->
			<div class="self-help-box clearfix">
				<span class="fl self-help-sub"></span>
				<!-- <a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right: 2px;">取消</a> -->
				<el-button type="info" style="margin-right: 15px;width:190px;">取消</el-button>
				<!-- <a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveFunction">保存</a> -->
				<el-button type="primary" style="margin-right: 15px;width:190px;" @click="saveFunction">保存</el-button>
			</div>
		</section>
		<pay v-else @winEvent='winEvent' :opentheFunction='opentheFunction' :upPayInfo='upPayInfo' :isUpdata='isUpdata' :modifyindex='modifyindex' :checkoutMenu='checkoutMenu' :coordinateInfo='coordinateInfo'></pay>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				shopId: storage.session('userShop').currentShop.id, //单店 shopId 品牌 品牌Id
				selfStatus: false, //是否开启自助模式 false代表关闭  true代表开启
				menuState: false, //是否可以查看菜单 false 代表不可以 true代表可以
				storeSwitch: true, //扫码选择门店
				smsSwitch: true, //自助短信功能
				opentheFunction: false, //是否开启支付功能
				payment: false, // 其他支付方式的输入框 false 代表不显示 true代表显示
				checkoutMenu: [], //结账功能的菜单
				contentLsit: [{ //商品显示的功能被关闭 默认全部选中
					name: '普通商品',
					id: '1'
				},
				{
					name: '称重商品',
					id: '2'
				},
				{
					name: '套餐',
					id: '3'
				}
				], //内容配置数据
				contenSelect: ['1', '2', '3'], //内容配置选中数组
				goodsSelect: [], //固定支付方式选中
				goodsType: [{
					name: '微信支付',
					id: '3'
				},
				{
					name: '支付宝支付',
					id: '4'
				},
				{
					name: '会员支付',
					id: '5'
				}
				], //固定支付方式
				exportUrl: 'javascript:void(0);', //导出二维码链接
				payList: [], //弹窗里面选中的镜像数组
				paymentList: [], // 其他支付列表的方式
				content: '', // 新增支付方式的内容
				wininfo: {}, // json.data
				upPayInfo: {}, //结账功能的数据
				linkUrl: '', //链接地址
				show: false,
				modifyindex: 0,
				publicNumber: false, //公众号标题提醒
				isattention: false, //是否开启关注公众号
				headings: false, // 标题提示
				integralList: [{
					name: '固定标题',
					id: 0
				},
				{
					name: '自动标题',
					id: 1
				}
				],
				integralOn: 0, //标题选中的
				integralName: '固定标题',
				title1: '', //固定标题
				uploadUrl: '',
				image: '', //图片路径
				imageName: '', //图片名称
				qrcode: '',
				shopName: '', //店铺名称
				downloadUrl: 'javascript:;',
				isUpdata: '',
				coordinateInfo: { //店铺坐标信息
					pointLng: '',
					pointLat: ''
				}
			};
		},
		methods: {
			openselfStatus: function(res) { //开启自助模式
				this.selfStatus = res;
			},
			openmenuState: function(res) { //查看菜单
				this.menuState = res;
			},
			selectStores: function(res) { //扫码选择门店
				this.storeSwitch = res;
			},
			selectSMS: function(res) { //自助短信功能
				this.smsSwitch = res;
			},
			openisattention: function(res) { //关注公众号并点单
				this.isattention = res;
			},
			isPublicNumber: function() {
				//关注公众号标题提示
				this.publicNumber = !this.publicNumber;
			},
			// haveIndex: function(i) { //标题设置
			// 	this.integralOn = i;
			// },
			clicktheRadio: function(item) { //标题设置
				this.integralOn = item.id;
			},
			isHeadings: function() {
				//标题设置提示
				this.headings = !this.headings;
			},
			async bgNameChange() {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'bgImage1'
				});
				this.image = res;
				let bgName = this.image.lastIndexOf('/');
				this.imageName = this.image.substring(bgName + 1, this.image.length);
			},
			generatorCode() {
				http.downloadQrCode();
			},
			//自阶模式 下载二维码
			async downloadCode() {
				await http.downloadPack({
					data: {
						type: 1,
						shopId: this.shopId
					}
				});
			},
			winEvent(str) {
				this.$store.commit('setPageTools', {});
				this.show = str;
			},
			openWindow: function(i, item, type) { //新增或修改结账功能
				if (this.checkoutMenu.length >= 4 && !type) {
					//最多添加4个
					this.$store.commit('setWin', {
						content: '最多添加4个',
						time: 1000
					});
					return false;
				}
				this.upPayInfo = utils.deepCopy(item);
				this.opentheFunction = type == '1' ? true : false;
				this.modifyindex = i; //点击修改的对应的index
				this.isUpdata = type;
				this.show = true;
			},
			copyCode: function(i) {
				let t = this.$refs.copyTxt[i];
				t.select();
				document.execCommand('copy');
				this.$store.commit('setWin', {
					content: '复制成功',
					time: 1000
				});
			},
			deleteList(i, item) {
				this.checkoutMenu.splice(i, 1);
				this.wininfo.deletePay.push(item.id);
			},
			async getSelfConfig() {
				//获取
				let data = await http.getSelfHelpConfig({});
				this.wininfo.status = data.status; //是否开启自助模式的状态
				this.wininfo.isMenu = data.isMenu; // 是否开启查看菜单
				this.wininfo.isChoose = data.isChoose;
				this.wininfo.isSendMessage = data.isSendMessage;
				this.wininfo.goodsDisplay = data.goodsDisplay; // 商品的显示
				// this.wininfo.otherPayment = data.otherPayment, //其他的支付方式
				this.wininfo.otherPayment = ''; //其他的支付方式
				if (data.fixedPayment != '0') {
					this.wininfo.fixedPayment = data.fixedPayment; // 固定的支付方式
				} else {
					this.wininfo.fixedPayment = '';
				}
				this.wininfo.payConfig = data.pay ? data.pay : []; //结账功能
				// 自助模式的状态  将返回的数值类型转换为布尔类型
				this.selfStatus = Boolean(Number(data.status));
				// 自助模式是否开启查看菜单
				this.storeSwitch = Boolean(Number(data.isChoose)); //扫码选择门店
				this.smsSwitch = Boolean(Number(data.isSendMessage)); //支付后发送短信
				this.menuState = Boolean(Number(data.isMenu)); //查看菜单功能
				//进阶模式开启公众号
				this.isattention = Boolean(Number(data.followSwitch)); //是否开启关注公众号并点餐
				// 判断商品显示是否为空 不为空赋值 '123'
				//let goodsDisplay = String(data.goodsDisplay);
				this.linkUrl = data.baseUrl; // 链接地址
				// 将字符串拆分成单个字符 放到商品选中的数组当中
				// 由于商品显示的功能被隐藏,所以这边不做数据层的处理
				// 如有需要恢复注释
				// if (goodsDisplay != '' && goodsDisplay.length >= 1) {
				// 	this.contenSelect = [];
				// 	for (let i = 0; i < goodsDisplay.length; i++) {
				// 		if (goodsDisplay[i] == 1 || goodsDisplay[i] == 2 || goodsDisplay[i] == 3) {
				// 			this.contenSelect.push(goodsDisplay[i]); //['1','2','3']
				// 		}
				// 	}
				// }
				this.integralOn = data.titleType; //固定标题和自动标题
				this.integralName = this.integralList[this.integralOn].name;
				if (data.titleType == 0) { //如果是固定标题 获取固定标题的title
					this.title1 = data.title;
				}
				this.image = data.image; //上传的图片
				this.imageName = data.image;
				let logoName = this.imageName.lastIndexOf('/');
				this.imageName = this.imageName.substring(logoName + 1, this.imageName.length); //上传的图片
				// 判断固定支付方式显示是否为空 不为空赋值 '35'
				let fixedPayment = String(data.fixedPayment);
				if (fixedPayment != '' && fixedPayment != '0' && fixedPayment.length >= 1) {
					this.goodsSelect = [];
					for (let i = 0; i < fixedPayment.length; i++) {
						this.goodsSelect.push(fixedPayment[i]);
					}
					// if (fixedPayment.length > 1) {
					// 	this.goodsSelect = [];
					// 	for (let i = 0; i < fixedPayment.length; i++) {
					// 		// 微信支付为3
					// 		if (fixedPayment[i] == 3 || fixedPayment[i] == 5) {
					// 			this.goodsSelect.push(fixedPayment[i]);
					// 		}
					// 	}
					// } else if (fixedPayment == 3 || fixedPayment == 5) {
					// 	this.goodsSelect.push(fixedPayment);
					// }
					// this.goodsSelect = Array.from(new Set(this.goodsSelect));
				}

				// 直接给结账功能赋值
				//this.paymentList = [];
				this.checkoutMenu = this.wininfo.payConfig; //结账功能
			},
			checkForm: function() {
				if (utils.isEmptyObject(this.goodsSelect)) {
					this.$store.commit('setWin', {
						content: '请选择固定支付方式',
						time: 1000
					});
					return false;
				}
				if (this.checkoutMenu.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请至少添加一种结账方式!'
					});
					return false;
				}
				if (this.isattention && this.integralOn == '0' && this.title1 == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '固定标题不能为空'
					});
					return false;
				}
				return true;
			},
			arrToString: function(arr) { //数组转固定格式的字符串
				let str = '';
				arr = arr.sort();
				for (let i = 0; i < arr.length; i++) {
					str += arr[i];
				}
				return str;
			},
			async saveFunction() {
				if (!this.checkForm()) return;
				// let delstr = '';
				// let delArr = utils.deepCopy(this.wininfo.deletePay);
				// for (let i = 0; i < delArr.length; i++) {
				// 	delstr += delArr[i];
				// 	if (i < delArr.length - 1) {
				// 		delstr += ',';
				// 	}
				// }
				// let otherPayment = []; // 其他支付方式
				// if (!utils.isEmptyObject(this.paymentList)) {
				// 	for (let i = 0; i < this.paymentList.length; i++) {
				// 		otherPayment.push(this.paymentList[i].content);
				// 	}
				// }
				// 自助配置
				this.wininfo.status = Number(this.selfStatus); // 是否开启自助模式
				this.wininfo.isMenu = Number(this.menuState); //是否开启查看菜单
				this.wininfo.isChoose = Number(this.storeSwitch); //查看门店
				this.wininfo.isSendMessage = Number(this.smsSwitch); //支付后发送短信
				this.wininfo.goodsDisplay = this.arrToString(this.contenSelect); // 商品显示
				// this.wininfo.otherPayment = String(otherPayment); // 其他支付方式
				this.wininfo.otherPayment = ''; // 其他支付方式
				this.wininfo.fixedPayment = this.arrToString(this.goodsSelect); // 固定支付方式
				this.wininfo.payConfig = this.checkoutMenu; //支付功能
				// 自阶配置
				this.wininfo.followSwitch = Number(this.isattention); //关注公众号并点餐
				this.wininfo.titleType = this.isattention ? Number(this.integralOn) : 1; //固定标题还是自动标题
				this.wininfo.title = this.title1; //固定标题的内容
				this.wininfo.image = this.image; //上传的图片
				let sendInfo = utils.deepCopy(this.wininfo);
				// sendInfo.deletePay = delstr;
				// delete sendInfo.pay;
				await http.updateSelfHelpConfig({
					data: {
						data: JSON.stringify(sendInfo)
					}
				});
				this.$store.commit('setWin', {
					content: '保存成功',
					time: 1000
				});
				// this.getSelfConfig();
			},
			//获取店铺基本信息
			async baseGet() {
				let data = await http.baseGet({
					data: {
						shopId: storage.session('userShop').currentShop.id
					}
				});
				if (data.position && data.position !== '') {
					this.coordinateInfo.pointLng = Number(data.position.split(',')[0]);
					this.coordinateInfo.pointLat = Number(data.position.split(',')[1]);
				} else {
					this.coordinateInfo.pointLat = 39.915;
					this.coordinateInfo.pointLng = 116.404;
				}
			},
		},
		components: {
			onOff: () =>
				import ( /*webpackChunkName:'on_off'*/ 'src/components/on_off'),
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			pay: () =>
				import ( /*webpackChunkName: 'checkout_function'*/ './checkout_function'),
			'singleSelect': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		},
		async mounted() {
			//获取自助配置
			this.baseGet();
			this.uploadUrl = storage.session('userShop').uploadUrl;
			this.shopName = storage.session('userShop').currentShop.name;
			this.qrcode = await
			import ( /* webpackChunkName:'qrcode' */ 'src/verdor/jr-qrcode.js');
			this.getSelfConfig();
		}
	};
</script>
<style scoped>
	.self-help {
		width: 100%;
		height: auto;
		margin-top: 30px;
		/*overflow: hidden;*/
	}

	.self-help-box {
		height: auto;
		min-height: 60px;
		width: 100%;
		/*overflow: hidden;*/
		padding-top: 10px;
	}

	.self-help-sub {
		font-size: 16px;
		display: block;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #666666;
		text-align: right;
		margin-right: 14px;
	}

	.self-help-box .rightHalf {
		width: 600px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	.add_btn {
		/* background: url(../../../res/images/add.png) no-repeat 20px center #E1BB4A; */
		height: 40px;
		line-height: 40px;
		text-align: center;
		width: 200px;
		color: #ffffff;
		margin-right: 20px;
		border-radius: 4px;
		/* background-color: #E1BB4A; */
	}

	.qRcode {
		background: url(../../../res/images/qrcode.png) no-repeat 20px center #E1BB4A;
		cursor: pointer;
	}

	input {
		outline: none;
		text-indent: 20px;
		background: #fff;
	}

	.selectbtns span.sign {
		background: url("../../../res/images/sign.png") right bottom no-repeat;
		border: 1px solid #f8941f;
		color: #f8941f;
	}

	.selectbtns span {
		width: 98px;
		height: 36px;
		margin-right: 15px;
		background-color: #fff;
		border: 1px solid #bdbdbd;
	}

	.selectbtns span:hover {
		background-color: #fff;
	}

	.handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 45px;
		background: url("../../../res/images/handle-tips.png") 20px center no-repeat;
		color: #999999;
	}

	.self-help-box .prompting {
		width: 40px;
		height: 40px;
		background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
		position: relative;
	}

	.self-help-box .prompting .detDiv {
		display: inline-block;
		width: 317px;
		background: #45404b;
		position: absolute;
		top: 45px;
		right: 0;
		padding: 10px;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 5;
	}

	.self-help-box .prompting .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
	}

	.self-help-box .prompting .detDiv .detH3 {
		line-height: 30px;
		color: #e6e6e7;
		text-align: center;
	}

	.self-help-box .prompting .detDiv .triright {
		width: 0;
		height: 0;
		border-top: 10px solid transparent !important;
		border-bottom: 10px solid transparent !important;
		border-right: 10px solid #45404b !important;
		border-left: 10px solid transparent !important;
		top: 10px;
		left: -20px;
	}

	.self-help-box .rightHalf .inp {
		width: 449px;
		height: 41px;
		text-indent: 14px;
	}

	.self-help-box .download {
		width: 140px;
		height: 40px;
		background: #29a8e0;
		text-align: center;
		line-height: 40px;
		color: #fff;
		font-size: 14px;
	}

	.on-span {
		width: 40px;
		height: 40px;
		border-radius: 4px;
		font-size: 0;
		margin-right: 15px;
		background: #E1BB4A url("../../../res/images/add.png") center no-repeat;
	}

	.on-span:hover {
		background-color: #f8941f;
	}

	.add-config>span {
		margin-right: 15px;
		margin-top: 2px;
		display: block;
		background-color: #fff;
		height: 36px;
		width: 98px;
		line-height: 36px;
		text-align: center;
		cursor: pointer;
		position: relative;
		border: 1px solid #E1BB4A;
		color: #E1BB4A;
	}

	.add-config>span:hover i {
		display: block;
	}

	.add-config>span>i {
		position: absolute;
		right: -12px;
		top: -12px;
		display: none;
		width: 25px;
		height: 25px;
		background-image: url(../../../res/images/delete.png);
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	#self-help .self-help-box .link {
		width: auto;
		height: 40px;
		margin-bottom: 25px;
	}

	#self-help .self-help-box .link:last-child {
		margin-bottom: 0;
	}

	.light-green {
		background-color: #389294;
	}

	.light-green:hover {
		background-color: #58a6a8;
	}

	.light-green {
		line-height: 49px;

		width: 50%;
		height: 49px;

		cursor: pointer;
		-webkit-transition: background-color ease-in-out 0.2s;
		transition: background-color ease-in-out 0.2s;
	}


	/* 进阶样式 */

	.set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	.set-line .titles {
		float: left;
		margin-left: 12px;
		width: 70px;
		font-size: 16px;
		text-align: left;
	}

	.set-line .line {
		display: inline-block;
		width: 900px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	.handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../../src/res/icon/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	.self-help-box .rightHalf .uploadImg {
		width: 210px;
		height: 150px;
		border: 1px solid #b0b0b0;
		overflow: hidden;
		margin-right: 10px;
	}

	.self-help-box .rightHalf .updateName {
		line-height: 150px;
	}

	.self-help-box .rightHalf .uploadImg img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.self-help-box .uploadImgs {
		position: relative;
		margin-right: 15px;
	}

	.self-help-box .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	.sec_wrap {
		width: auto;
		height: auto;
	}

	.div_wrap {
		height: 40px;
		padding: 0;
		position: relative;
		cursor: pointer;
	}

	.div_innit {
		border: 1px solid #d2d2d2;
		width: 66px;
		height: 36px;
		padding: 0;
		text-align: center;
		line-height: 36px;
	}

	.num_input {
		border: 1px solid #d2d2d2;
		width: 318px;
		float: left;
		height: 36px;
		border-left: none;
		text-align: center;
		line-height: 36px;
		text-indent: 0;
	}

	.alink_wap {
		color: #f8941f;
		display: block;
		width: 100px;
		height: 40px;
		line-height: 40px;
	}

	.div_tips {
		background-position: left center;
		text-indent: 25px;
	}
</style>