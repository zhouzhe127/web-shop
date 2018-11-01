/** * 在线点单配置 * *miaochuan.sha */
<template>
	<div id="online-configuration">
		<div class="containter">
			<!-- 基础配置 -->
			<div class="set-line">
				<div class="titles">基础配置</div>
				<div class="line"></div>
			</div>
			<!-- 下单成功提醒 -->
			<div class="online-box clearfix" style="margin-bottom: 0px;">
				<span class="online-sub fl">下单成功提醒</span>
				<!-- <textarea class="txt fl" v-model="remind" placeholder="请输入下单成功提醒" maxlength="30"></textarea> -->
				<el-input type="textarea" :rows="4" placeholder="请输入下单成功提醒" v-model="remind" maxlength="30" style="width:400px;">
				</el-input>
			</div>
			<div class="online-box clearfix" style="margin-bottom: 0px;">
				<span class="online-sub fl"></span>
				<div class="fl handle-tips">
					<i></i>
					限30字以内
				</div>
			</div>
			<!-- 自动确认订单 -->
			<div class="online-box clearfix">
				<span class="fl online-sub">自动确认订单</span>
				<div class="rightHalf">
					<el-switch v-model="isconfirmOrder" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<!-- <onOff :key='1' :status="isconfirmOrder" @statusChange="openConfirmOrder"></onOff> -->
			</div>
			<!-- 自助买单 -->
			<div class="online-box clearfix">
				<span class="fl online-sub">自助买单</span>
				<!-- <onOff :key='1' :status="iselfhelPay" @statusChange="openSelfhelPay"></onOff> -->
				<div class="rightHalf">
					<el-switch v-model="iselfhelPay" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
			</div>
			<div class="online-box clearfix" v-if="iselfhelPay">
				<span class="fl online-sub"></span>
				<div class="self-help fl">
					<div class="min-box" clearfix>
						<!-- 优惠券使用 -->
						<div class="min-boxl fl">
							<span class="fl min-sub">优惠券使用</span>
							<!-- <onOff :key='1' :status="iscoupons" @statusChange="openCoupons"></onOff> -->
							<div class="rightHalf">
								<el-switch v-model="iscoupons" active-color="#E1BB4A" inactive-color="#dcdfe6">
								</el-switch>
							</div>
						</div>
						<!-- 储值支付 -->
						<div class="min-boxl fr">
							<span class="fl min-sub">储值支付</span>
							<!-- <onOff :key='1' :status="istoredPay" @statusChange="opentoredPay"></onOff> -->
							<div class="rightHalf">
								<el-switch v-model="istoredPay" active-color="#E1BB4A" inactive-color="#dcdfe6">
								</el-switch>
							</div>
						</div>
					</div>
					<!-- 积分抵扣 -->
					<div class="min-box" clearfix>
						<div class="min-boxl fl">
							<span class="fl min-sub">积分抵扣</span>
							<!-- <onOff :key='1' :status="isPoints" @statusChange="openPoints"></onOff> -->
							<div class="rightHalf">
								<el-switch v-model="isPoints" active-color="#E1BB4A" inactive-color="#dcdfe6">
								</el-switch>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 基础配置 -->
			<div class="set-line">
				<div class="titles">进阶配置</div>
				<div class="line"></div>
			</div>
			<!-- 关注公众号并点餐 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">关注公众号并点餐</span>
				<!-- <onOff :key='1' :status="isattention" @statusChange="openSattention"></onOff> -->
				<div class="rightHalf">
					<el-switch v-model="isattention" active-color="#E1BB4A" inactive-color="#dcdfe6">
					</el-switch>
				</div>
				<div class="prompting fl" @click="isPublicNumber">
					<div class="detDiv" style="top: 0px;left: 45px;" v-if="publicNumber">
						<i class="detI triright" style="top: 10px;left: -20px;"></i>
						<h3 class="detH3">
							关闭该功能后，生成的二维码无点餐推送。
						</h3>
					</div>
				</div>
			</div>
			<!-- 标题等 -->
			<section v-if="isattention">
				<!-- 自动确认订单 -->
				<div class="online-box clearfix">
					<span class="fl online-sub">标题设置</span>
					<!-- <span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in integralList" :key="index" v-bind:class="{'presentActive':integralOn == index }"
					     @click="chooseIntegral(index)">{{item.name}}</span> -->
					<el-radio-group v-model="integralName" class="fl">
						<el-radio v-for="(item,index) in integralList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)"></el-radio>
					</el-radio-group>
					<div class="prompting fl" @click="isHeadings">
						<div class="detDiv" style="top: 0px;left: 45px;" v-if="headings">
							<i class="detI triright" style="top: 10px;left: -20px;"></i>
							<h3 class="detH3">
								固定标题：自定义，显示在公众号推送的标题。
								<br/> 自动标题：默认根据区域名名称一桌台名称，自动补充为标题。
							</h3>
						</div>
					</div>
				</div>
				<!-- 请输入固定标题 -->
				<div class="online-box clearfix" style="margin-bottom: 0px;" v-show="integralOn == '0'">
					<span class="fl online-sub"></span>
					<!-- <input type="text" class="inp" name="" v-model="title" placeholder="请输入固定标题" maxlength="15" /> -->
					<el-input v-model="title" maxlength="15" placeholder="请输入固定标题" style="width:235px;"></el-input>
				</div>
				<div class="online-box clearfix" style="margin-bottom: 0px;" v-show="integralOn == '0'">
					<span class="online-sub fl"></span>
					<div class="fl handle-tips">
						<i></i>
						限15字以内
					</div>
				</div>
				<!-- 图片显示-->
				<div class="online-box clearfix" v-if="image != ''">
					<span class="fl online-sub"></span>
					<div class="uploadImg fl">
						<img alt="logo" v-bind:src="uploadUrl  + image" />
					</div>
						<div class="fl updateName">(已上传：{{imageName}})</div>
					</div>
					<!-- 上传图片-->
					<div class="online-box clearfix">
						<span class="fl online-sub">显示图片</span>
						<div class="uploadImgs fl">
							<!-- <a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a> -->
							<el-button type="primary" icon="el-icon-plus" class="buttons">
								上传图片
							</el-button>
							<form enctype="multipart/form-data" id="bgImage">
								<input type="file" id="bg_upload" @change='bgNameChange' accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" />
							</form>
						</div>
						<div class="fl handle-tips">
							<i></i>
							尺寸 640*480
						</div>
					</div>
					<!-- 批量下载二维码-->
					<div class="online-box clearfix">
						<span class="fl online-sub">批量下载二维码</span>
						<!-- <a v-on:click='downloadCode()' href="javascript:void(0);" class="download">下载二维码</a> -->
						<el-button type="primary" icon="el-icon-download" class="buttons" @click="downloadCode()">
							下载二维码
						</el-button>
					</div>
			</section>
			<!-- 批量下载二维码-->
			<div class="online-box clearfix">
				<span class="fl online-sub"></span>
				<!-- <a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right: 2px;" @click="getConfiguration">取消</a>
				<a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveConfiguration">保存</a> -->
				<el-button type="info" style="margin-right: 15px;width:190px;" @click="getConfiguration">取消</el-button>
				<el-button type="primary" style="margin-right: 15px;width:190px;" @click="saveConfiguration">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				shopId: storage.session('userShop').currentShop.id, //单店 shopId 品牌 品牌Id
				remind: '', //下单成功提醒
				isconfirmOrder: false, //是否开启自动确认订单
				iselfhelPay: false, //是否开启自助买单
				iscoupons: false, // 是否使用优惠券
				istoredPay: false, //是否开启储值支付
				isPoints: false, //是否开启积分抵扣
				isattention: true, //是否开启关注公众号
				publicNumber: false, //公众号标题提醒
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
				integralOn: 0,
				integralName: '固定标题',
				title: '', //固定标题
				uploadUrl: '',
				image: '', //图片路径
				imageName: '', //图片名称
				exportUrl: 'javascript:void(0);'
			};
		},
		mounted() {
			this.uploadUrl = storage.session('userShop').uploadUrl;
			this.getConfiguration(); //获取
		},
		watch: {

		},
		components: {
			onOff: () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		},
		methods: {
			isPublicNumber: function() { //关注公众号标题提示
				this.publicNumber = !this.publicNumber;
			},
			isHeadings: function() { //标题设置提示
				this.headings = !this.headings;
			},
			openConfirmOrder: function(res) { //开启自助确认订单
				this.isconfirmOrder = res;
			},
			openSelfhelPay: function(res) { //开启自助买单
				this.iselfhelPay = res;
			},
			openCoupons: function(res) { //开启自助买单
				this.iscoupons = res;
			},
			opentoredPay: function(res) { //开启自助买单
				this.istoredPay = res;
			},
			openPoints: function(res) { //开启自助买单
				this.isPoints = res;
			},
			openSattention: function(res) { //开启关注公众号
				this.isattention = res;
			},
			//赠送何种积分
			// chooseIntegral: function(index) {
			// 	if (this.integralOn == index) {
			// 		this.integralOn = '-1';
			// 	} else {
			// 		this.integralOn = index;
			// 	}
			// },
			clicktheRadio: function(item) { //标题设置
				this.integralOn = item.id;
			},
			async getConfiguration() { //获取配置
				let res = await http.getOrderconfig({
					data: {
						shopId: this.shopId
					}
				});
				if (res) {
					//将数据进行赋值
					this.remind = res.remind; //下单成功提醒
					this.isconfirmOrder = Boolean(Number(res.autoConfirm)); //是否开启自动确认订单
					this.iselfhelPay = Boolean(Number(res.autoPay)); //是否开启自助买单
					this.iscoupons = Boolean(Number(res.couponUse)); //是否使用优惠券
					this.istoredPay = Boolean(Number(res.storedValuePay)); //是否开启储值支付
					this.isPoints = Boolean(Number(res.pointSwitch)); //是否开启积分抵扣
					this.isattention = Boolean(Number(res.followSwitch)); //是否开启关注公众号并点餐
					this.integralOn = res.titleType; //固定标题和自动标题
					this.integralName = this.integralList[this.integralOn].name;
					if (res.titleType == 0) {
						this.title = res.title;
					}
					this.image = res.image;
					this.imageName = res.image;
					let logoName = this.imageName.lastIndexOf('/');
					this.imageName = this.imageName.substring(logoName + 1, this.imageName.length); //上传的图片
				}
			},
			async saveConfiguration() { //保存配置
				if (this.isattention && this.integralOn == '-1') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请设置标题方式',
					});
					return false;
				}
				if (this.isattention && this.integralOn == '0' && this.title == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '固定标题不能为空',
					});
					return false;
				}
				let res = await http.saveOrderconfig({
					data: {
						shopId: this.shopId,
						remind: this.remind, //下单成功提醒
						autoConfirm: Number(this.isconfirmOrder), //自动确认订单
						autoPay: Number(this.iselfhelPay), //自动买单
						couponUse: Number(this.iscoupons), //优惠券使用
						storedValuePay: Number(this.istoredPay), //储值支付
						pointSwitch: Number(this.isPoints), //积分抵扣
						followSwitch: Number(this.isattention), //开启公众号关注并点餐
						titleType: this.isattention == true ? Number(this.integralOn) : 1, //固定标题还是自动标题
						title: this.title, //固定标题的内容
						image: this.image //上传的图片
					}
				});
				if (res) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '保存成功',
					});
				}
			},
			async bgNameChange() {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'bgImage',
				});

				this.image = res;
				let bgName = this.image.lastIndexOf('/');
				this.imageName = this.image.substring(bgName + 1, this.image.length);

			},
			async downloadCode() {
				//下载所有的桌台二维码
				await http.downloadPack({
					data: {
						type: 1,
						shopId: this.shopId
					}
				});
			}
		}
	};
</script>
<style scoped>
	#online-configuration {
		width: 100%;
		height: 100%;
	}

	#online-configuration .containter {
		width: 1200px;
		height: auto;
	}

	#online-configuration .containter .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#online-configuration .containter .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 70px;
		font-size: 16px;
		text-align: left;
	}

	#online-configuration .containter .set-line .line {
		display: inline-block;
		width: 900px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#online-configuration .containter .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 14px;
	}

	#online-configuration .containter .online-box .rightHalf {
		/*width: 600px;*/
		height: auto;
		float: left;
		line-height: 40px;
	}

	#online-configuration .containter .online-box .online-sub {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#online-configuration .containter .online-box .txt {
		width: 449px;
		height: 80px;
		padding: 14px;
		resize: none;
	}

	#online-configuration .containter .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/icon/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#online-configuration .containter .online-box .check-span {
		display: inline-block;
		float: left;
	}

	#online-configuration .containter .online-box .self-help {
		width: 350px;
		height: 147px;
		border: 1px solid #D2D2D2;
		padding: 17px;
		border-radius: 4px;
	}

	#online-configuration .containter .online-box .self-help .min-box {
		width: 100%;
		height: 40px;
		overflow: hidden;
		margin-bottom: 30px;
	}

	#online-configuration .containter .online-box .self-help .min-box .min-sub {
		display: block;
		width: 80px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#online-configuration .containter .online-box .prompting {
		width: 40px;
		height: 40px;
		background: url(../../../src/res/icon/orderdetial18.png) no-repeat center;
		position: relative;
	}

	#online-configuration .containter .online-box .prompting .detDiv {
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

	#online-configuration .containter .online-box .prompting .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
	}

	#online-configuration .containter .online-box .prompting .detDiv .detH3 {
		line-height: 30px;
		color: #e6e6e7;
		text-align: center;
	}

	#online-configuration .containter .online-box .prompting .detDiv .triright {
		width: 0;
		height: 0;
		border-top: 10px solid transparent !important;
		border-bottom: 10px solid transparent !important;
		border-right: 10px solid #45404b !important;
		border-left: 10px solid transparent !important;
	}

	#online-configuration .containter .clearfix::before,
	#online-configuration .containter .clearfix::after {
		display: table;
		content: “”;
	}

	#online-configuration .containter .clearfix::after {
		clear: both;
	}

	#online-configuration .containter .online-box .freeFix {
		width: 100px;
		height: 40px;
		border: 1px #D2D2D2 solid;
		display: inline-block;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
		float: left;
	}

	#online-configuration .containter .online-box .presentActive {
		border: 1px #FF9200 solid;
		background: #FFEDD1;
		color: #FF9200;
	}

	#online-configuration .containter .online-box .inp {
		width: 449px;
		height: 41px;
		text-indent: 14px;
	}

	#online-configuration .containter .online-box .download {
		width: 140px;
		height: 40px;
		background: #29A8E0;
		text-align: center;
		line-height: 40px;
		color: #fff;
		font-size: 14px;
	}

	#online-configuration .containter .online-box .uploadImg {
		width: 210px;
		height: 150px;
		border: 1px solid #b0b0b0;
		overflow: hidden;
		margin-right: 10px;
	}

	#online-configuration .containter .online-box .updateName {
		line-height: 150px;
	}

	#online-configuration .containter .online-box .uploadImg img {
		display: block;
		width: 100%;
		height: 100%;
	}

	#online-configuration .containter .online-box .uploadImgs {
		position: relative;
		margin-right: 15px;
	}

	#online-configuration .containter .online-box .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#online-configuration .containter {
			width: 100%;

		}

		#online-configuration .containter .set-line {
			width: 100%;

		}

		#online-configuration .containter .set-line .line {
			width: 80%;
		}
	}
</style>