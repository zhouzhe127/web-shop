/** * 支付评价功能 * *miaochuan.sha */
<template>
	<div id="payment">
		<!-- 支付评价功能 -->
		<div class="set-line">
			<div class="titles">支付评价功能</div>
			<div class="line"></div>
		</div>
		<!-- 支付评价功能 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">支付评价功能</span>
			<!-- <onOff :key='1' :status="paySwitch" @statusChange="openflipSwitch"></onOff> -->
			<div class="rightHalf">
				<el-switch v-model="paySwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 评价模式 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">评价模式</span>
			<div class="rightHalf">
				<!-- <singleSelect :index='result' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="evaluationList" :name="'name'" :key='"id"'></singleSelect> -->
				<el-radio-group v-model="resultName" class="fl">
					<el-radio v-for="(item,index) in evaluationList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)"></el-radio>
				</el-radio-group>
				<div class="fl handle-tips">
					<i></i> 评价推送有效期24小时,超出该时效无法评价,推送请至模版设置添加
				</div>
			</div>
		</div>
		<!-- 选择渠道 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">选择渠道</span>
			<mul-select :styles="{marginRight:'8px','border-radius':'4px'}" :list="payWays" :selects="payType" :name="'name'" :keys="'id'" :isradio="false"></mul-select>
		</div>
		<!-- 支付评价配置 -->
		<div class="set-line">
			<div class="titles">支付评价配置</div>
			<div class="line"></div>
		</div>
		<!-- 环境评分 -->
		<div class="online-box clearfix" v-for="(item,index) in score" :key="index">
			<span class="online-sub fl">{{item.name}}</span>
			<!-- <onOff :key='1' :status="item.environmentSwitch" :names="item.name" @statusChange="openvironmentSwitch"></onOff> -->
			<div class="rightHalf">
				<el-switch v-model="item.environmentSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6"></el-switch>
			</div>
		</div>
		<!-- 评价福利 -->
		<div class="set-line">
			<div class="titles">评价福利</div>
			<div class="line"></div>
		</div>
		<!-- 赠送积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">赠送积分</span>
			<!-- <onOff :key='1' :status="givingSwitch" @statusChange="opengivingSwitch"></onOff> -->
			<div class="rightHalf">
				<el-switch v-model="givingSwitch" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 确认评价后赠送 -->
		<div class="online-box clearfix" v-if="givingSwitch">
			<span class="online-sub fl">提交评价后赠送</span>
			<div class="rightHalf">
				<!-- <section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="point" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>积分</span>
				</section> -->
				<section>
					<el-input placeholder="请输入整数" v-model="point" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
						<template slot="suffix">积分</template>
					</el-input>
				</section>
				<!-- <a href="javascript:void(0);" class="addclassify" @click="openCouponWin">添加关联优惠券</a> -->
				<el-button type="primary" icon="el-icon-plus" @click="openCouponWin" style="width:179px;">选择关联优惠券</el-button>
				<span style="color: #A5A5A5;" v-if="couponIds.length >= 1">已关联{{couponIds.length}}张优惠券</span>
			</div>
		</div>
		<!-- 疯抢开关 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<!-- <a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveConfig()">保存</a> -->
			<el-button type="primary" style="margin-right: 10px;width:190px;" @click="saveConfig()">保存</el-button>
		</div>
		<!-- 优惠券弹窗 -->
		<coupon @compareArr='ca' v-if='show' @couponChange='couponChange' @winEvent='winEvent' :couponIds='couponIds'></coupon>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';

	let reg = /^[1-9]*[1-9][0-9]*$/;
	export default {
		data() {
			return {
				paySwitch: false, //支付评价功能
				score: [{
					name: '环境评分',
					environmentSwitch: true //环境评分
				},
				{
					name: '口味评分',
					environmentSwitch: true //口味评分
				},
				{
					name: '服务评分',
					environmentSwitch: true //服务评分
				},
				{
					name: '商品评分',
					environmentSwitch: true //文字评分
				},
				{
					name: '文字评分',
					environmentSwitch: true, //商品评分
				}
				],
				evaluationList: [{
					id: 0,
					name: '支付后跳转'
				}, {
					id: 1,
					name: '评价推送'
				}],
				result: 0, //评价模式选中的
				resultName: '支付后跳转',
				givingSwitch: false, //赠送积分
				payWays: [{
					id: 1,
					name: '在线点单'
				},
				{
					id: 2,
					name: '自助点单'
				},
				{
					id: 3,
					name: '扫码支付'
				}
				], //类型
				payType: [],
				point: '', //积分
				show: false, //优惠券弹窗
				couponIds: [], //json串关联的优惠券
			};
		},
		methods: {
			// openflipSwitch: function(res) {
			// 	this.paySwitch = res; //支付评价功能
			// },
			// openvironmentSwitch: function(res, name) {
			// 	for (let item of this.score) {
			// 		if (item.name == name) {
			// 			item.environmentSwitch = res;
			// 		}
			// 	}
			// },
			// opengivingSwitch: function(res) {
			// 	this.givingSwitch = res; //赠送积分
			// },
			async saveConfig() {
				if (this.payType.length <= 0) {
					this.$store.commit('setWin', {
						content: '请选择渠道',
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				if (this.point > 100000) {
					this.$store.commit('setWin', {
						content: '积分为(1-100000)',
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				if (this.givingSwitch && !(reg.test(this.point))) {
					this.$store.commit('setWin', {
						content: '请填写积分(1-100000)',
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				let scoreselect = '';
				for (let i = 0; i < this.score.length; i++) {
					if (this.score[i].environmentSwitch == true) {
						scoreselect += (i + 1) + ',';
					}
				}
				scoreselect = scoreselect.substring(0, scoreselect.length - 1);
				let data = await http.addCommentConfig({
					data: {
						status: Number(this.paySwitch), //支付评价
						channels: String(this.payType), //渠道
						items: scoreselect, //支付评价配置
						giftPoints: this.givingSwitch ? this.point : 0,
						jumpCode: this.result, //评价模式
						giftCoupon: JSON.stringify(this.couponIds) //优惠券
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '保存成功!',
						winType: 'alert',
						title: '操作提示',
					});
					this.getConfig();
				}
			},
			async getConfig() {
				let data = await http.getPayCommentConf({});
				if (data) {
					this.paySwitch = Boolean(Number(data.status)); //支付评价功能开关
					let channels = data.channels.split(',');
					this.payType = [];
					//支付渠道
					for (let item of channels) {
						if (item == '1' || item == '2' || item == '3') {
							this.payType.push(Number(item));
						}
					}
					this.payType = utils.unique(this.payType);
					/*匹配支付评价配置*/
					let items = data.items.split(',');
					for (let i = 0; i < this.score.length; i++) {
						this.score[i].environmentSwitch = false;
						for (let item of items) {
							if (item == i + 1) {
								this.score[i].environmentSwitch = true;
							}
						}
					}
					if (data.giftPoints == '0') {
						this.givingSwitch = false;
					} else {
						this.givingSwitch = true;
						this.point = data.giftPoints;
					}
					this.result = Number(data.jumpCode); //评价模式
					this.couponIds = data.giftCoupon; //优惠券
				}
			},
			//打开关联优惠券
			openCouponWin() {
				this.show = true;
			},
			ca(arr) {
				this.compareArr = arr;
			},
			couponChange(arr) {
				this.couponIds = arr.selectList;
			},
			winEvent() {
				this.show = false;
			},
			// haveIndex(i) { //评价模式
			// 	this.result = i;
			// },
			clicktheRadio: function(item) {
				this.result = item.id;
			},
		},
		components: {
			onOff: () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
			'mul-select': () =>
				import ( /* webpackChunkName: 'mul_select' */ 'src/components/mul_select'),
			coupon: () =>
				import ( /* webpackChunkName:'member_store_coupon' */ './member_store_coupon'),
			'singleSelect': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		},
		mounted() {
			this.getConfig(); //获取配置
		}
	};
</script>
<style type="text/css" scoped>
	#payment {
		width: 1200px;
		height: auto;
	}

	#payment .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#payment .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	#payment .set-line .line {
		display: inline-block;
		width: 870px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#payment .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#payment .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#payment .clearfix::before,
	#payment .clearfix::after {
		display: table;
		content: “”;
	}

	#payment .clearfix::after {
		clear: both;
	}

	#payment .online-box .pagWay {
		float: left;
		display: inline-block;
	}

	#payment .online-box .pagWay .sign {
		border-color: #FF9800;
		color: #FF9800;
	}

	#payment .online-box .pagWay span {
		width: 100px;
		height: 40px;
		display: inline-block;
		padding: 0 15px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #D2D2D2;
		cursor: pointer;
		margin-right: 9px;
	}

	#payment .online-box .rightHalf {
		width: 600px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	#payment .online-box .rightHalf section {
		width: 210px;
		height: 38px;
		/* border: 1px solid #CECDCD; */
		margin-right: 16px;
		margin-bottom: 20px;
		/* float: left; */
	}

	#payment .online-box .rightHalf section .cumulative {
		width: 150px;
		height: 36px;
		border: 1px solid #eaeaea;
		float: left;
		outline: none;
		text-indent: 17px;
	}

	#payment .online-box .rightHalf section span {
		display: block;
		float: left;
		width: 58px;
		height: 37px;
		text-align: center;
		line-height: 38px;
		border-left: 1px solid #CECDCD;
	}

	#payment .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#payment .online-box .rightHalf .addclassify {
		width: 170px;
		height: 40px;
		/* background-position-x: 40px; */
		margin-right: 26px;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#payment {
			width: 100%;
		}

		#payment .set-line {
			width: 100%;
		}

		#payment .set-line .line {
			width: 84%;
		}

		#payment .online-box .rightHalf section .cumulative {
			padding: 0;
			border-top: none;
			-webkit-appearance: none;
			-o-appearance: none;
			appearance: none;
		}
	}
</style>