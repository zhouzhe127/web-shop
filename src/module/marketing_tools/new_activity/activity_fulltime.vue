<template>
	<section class='birth_act' v-if='!showVip'>
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<el-input class="fl" v-model="actName" maxlength="20" placeholder="请输入活动标题" style="width:179px;"></el-input>
				<div class="fl handle-tips">
					<i></i> 限20字
				</div>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动时间</span>
			<div class="rightHalf">
				<!--日期选择和搜索框-->
				<div class="fl" style="cursor: pointer;">
					<el-date-picker class="fl" v-model="startObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp">
					</el-date-picker>
					<span class="fl" style="width: 20px;text-align: center;">-</span>
					<el-date-picker class="fl" v-model="endObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp">
					</el-date-picker>
				</div>
				<span class="fl returnInt">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-search" style="width:179px;" @click="addVip">会员筛选</el-button>
				<span v-if="member > 0">已关联会员:{{member}}人</span>
			</div>
		</div>
		<!-- 活动通知 -->
		<div class="set-line">
			<div class="titles">活动通知</div>
			<div class="line"></div>
		</div>
		<div class="tips">
			<i class="el-icon-info" style="font-size:16px;color: #999999;"></i>
			<span>用户在（POS；自助点单；在线点单；快捷支付）中消费累计次数，满足则返券，一次活动一个用户可参与多次，成倍数时自动返券。填写时请在1至999次内填写，请填写整数</span>
		</div>
		<!-- 消费满次 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">消费满次</span>
			<div class="rightHalf">
				<el-input class='fl' placeholder="请输入次数" v-model="number" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
					<template slot="suffix">次</template>
				</el-input>
			</div>
		</div>
		<!-- 返券 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">返券</span>
			<div class="rightHalf">
				<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon" style="width:179px;">选择关联优惠券</el-button>
				<span class="coupon_name" v-if="selectCoupon.length > 0">(已关联{{getCouponName(selectCoupon)}})</span>
			</div>
		</div>
		<!-- 消息推送渠道 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">消息推送渠道</span>
			<div class="rightHalf">
				<mulSelect class="fl" :styles="{'border-radius':'4px'}" :list='goodsType' @selOn='selOn' :selects="goodsSelect" :name='"name"' :keyName='"id"'></mulSelect>
				<div class="fl handle-tips">
					<i></i> 活动发布后将通过该渠道触发会员
				</div>
			</div>
		</div>
		<!-- 内容设置 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">内容设置</span>
			<div class="rightHalf">
				<textarea placeholder="请输入内容设置" v-model="contentSetting" maxlength="151"></textarea>
				<div class="bluehandle-tips">
					<i></i> 活动发布后将通过该渠道触发会员
				</div>
				<div class="limit">
					<p>引用参数:
						<a style="color:#FF9200;" :key='index' v-for="(item,index) in parameter" @click="addParameter(index,1)">{{item.name}}</a>
					</p>
				</div>
			</div>
		</div>
		<!-- 活动说明 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动说明</span>
			<div class="rightHalf">
				<textarea placeholder="请输入活动说明" v-model="explain" maxlength="151"></textarea>
				<div class="bluehandle-tips">
					<i></i> 限150字以内
				</div>
			</div>
		</div>
		<div class="box" style="margin-top: 100px;padding-left: 70px;">
			<el-button type="info" plain style="margin-right: 10px;width:190px;" @click="returnAct">取消</el-button>
			<template v-if='isactivityDetail'>
				<el-button type="info" style="margin-right: 10px;width:190px;" @click="birthSave('0')">保存</el-button>
				<el-button v-if="editId == ''" type="primary" style="margin-right: 10px;width:190px;" @click="birthSave('1')">发布</el-button>
			</template>
		</div>
		<!-- 优惠券的弹窗 -->
		<!-- 关联优惠券的弹窗 -->
		<addCoupon v-if='showCoupon' :selectCoupon='selectCoupon' @winEvent='winEvent'></addCoupon>
	</section>
	<!-- 会员筛选 -->
	<memberScreening v-else @selectVip='selectVipEvent'></memberScreening>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	//import global from 'src/manager/global';

export default {
	data() {
		return {
			edit: false, //是否为编辑
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start
			}, //开始时间
			endObj: {
				time: new Date().setHours(23, 59, 59, 999)
			}, //结束时间
			editId: '', //编辑id
			actName: '', //活动名称
			explain: '', //生活动说明
			goodsType: [{
				'name': '微信',
				'id': '1'
			}], //消息推送渠道
			goodsSelect: [], //消息推送渠道选中
			customSelect: [], //自定义活动选择的
			msmStatus: false, //短信开关状态
			marketingStatus: false, //自定义活动的状态
			activityDetail: {}, //详情
			shopList: [],
			contentSetting: '', //生日活动内容设置
			parameter: [{
				'name': '【会员姓名】',
				'id': '{memberName}'
			}, {
				'name': '【优惠券名称】',
				'id': '{couponName}'
			}, {
				'name': '【优惠券数量】',
				'id': '{couponNum}'
			}, {
				'name': '【活动名称】',
				'id': '{activityName}'
			}, {
				'name': '【消费次数】',
				'id': '{consumeNum}'
			},
			{
				'name': '【送券时间】',
				'id': '{giveTime}'
			},
			],
			showBirthCoupon: false,
			couponList: [], //优惠券列表
			selectCoupon: [], //选中的列表
			isactivityDetail: true, //是否查看详情
			returnInt: 1, //相隔的天数
			number: '', //消费满次
			showCoupon: false,
			showVip: false,
			member: 0, //会员关联的人数
			memfilter: '',
			ruleId: '', //规则ID
		};
	},
	watch: {
		'explain': function() {
			if (this.explain.length > 150) {
				this.valiData('仅限150个字符');
				this.explain = this.explain.substr(0, 150);
			}
		},
		watch: {
			'explain': function() {
				if (this.explain.length > 150) {
					this.valiData('仅限150个字符');
					this.explain = this.explain.substr(0, 150);
				}
			},
			'contentSetting': function() {
				if (this.contentSetting.length > 150) {
					this.valiData('仅限150个字符');
					this.contentSetting = this.contentSetting.substr(0, 150);
				}
			},
			'startObj.time': 'timeChange',
			'endObj.time': 'timeChange',
			'selectCoupon': {
				deep: true,
				handler: function() {
					this.getCouponName(this.selectCoupon);
				}
			}
		},
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		'selectCoupon': {
			deep: true,
			handler: function() {
				this.getCouponName(this.selectCoupon);
			}
		},
		components: {
			'mulSelect': () =>
				import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
			'addCoupon': () =>
				import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
			selectBtn: () =>
				import( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
			'memberScreening': () =>
				import( /* webpackChunkName:'activity_screening' */ './activity_screening'),
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回活动列表',
				className: 'el-btn-blue',
				fn: () => {
					this.returnAct();
				}
			}]);
			let activityInfo = storage.session('activityInfo');
			if (activityInfo) {
				if (activityInfo.isShowdetail) {
					//是否是查看活动详情
					this.isactivityDetail = false;
				}
				this.editId = activityInfo.id;
				this.getActivityDetail(activityInfo);
			}
		},
		beforeDestroy() {
			storage.session('activityInfo', null);
		}
	};
</script>
<style scoped>
	.birth_act {
		max-width: 1400px;
		height: auto;
	}

	.birth_act .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	.birth_act .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	.birth_act .set-line .line {
		display: inline-block;
		width: 870px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	.birth_act .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	.birth_act .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	.birth_act .online-box .rightHalf {
		max-width: 900px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	.birth_act .online-box .rightHalf .coupon_name {
		float: left;
		display: block;
		width: 600px;
		height: 40px;
		line-height: 40px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.birth_act .online-box .rightHalf .returnInt {
		text-align: left;
		text-indent: 20px;
		color: #A3A3A3;
		line-height: 40px;
	}

	.birth_act .tips {
		width: 600px;
		background-color: #f4f4f5;
		border-radius: 4px;
		margin-left: 80px;
		margin-bottom: 20px;
		padding: 10px;
	}

	.birth_act .tips span {
		color: #909399;
		line-height: 18px;
	}

	/*活动名称的输入框*/

	.birth_act .online-box .rightHalf .name {
		width: 280px;
		height: 40px;
		background-color: #ffffff;
		border: solid 1px #cecdcd;
		text-indent: 15px;
	}

	.birth_act .online-box .rightHalf .obj {
		display: inline-block;
		width: 179px;
		height: 40px;
		background: #f8f8f8;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
	}

	.birth_act .online-box .rightHalf .thetext {
		line-height: 40px;
		margin-right: 10px;
	}

	.birth_act .online-box .rightHalf textarea {
		width: 340px;
		height: 100px;
		outline: none;
		padding: 10px;
		color: #333;
		font-size: 16px;
		resize: none;
		border: 1px solid #eaeaea;
	}

	.birth_act .online-box .rightHalf .limit {
		font-size: 14px;
		color: #999999;
		height: auto;
		overflow: hidden;
	}

	.handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 45px;
		background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
		color: #999999;
	}

	.bluehandle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url(../../../res/icon/i.png) 0 center no-repeat;
		color: #999999;
	}
</style>