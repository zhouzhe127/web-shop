<template>
	<!-- 裂变活动 -->
	<div id="fissoin">
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<el-input v-model="activityName" maxlength="10" placeholder="请输入活动标题"></el-input>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<el-date-picker class="fl" v-model="startObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" @change="getStartTime" value-format="timestamp">
					</el-date-picker>
					<span class="fl" style="width: 40px;text-align: center;margin-right: 0;">-</span>
					<el-date-picker class="fl" v-model="endObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp" @change="getEndTime">
					</el-date-picker>
				</div>
				<span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<span class="obj">全体会员</span>
			</div>
		</div>
		<!-- 推广权益 -->
		<div class="set-line">
			<div class="titles">推广权益</div>
			<div class="line"></div>
		</div>
		<!-- 推广者获礼 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">推广者获礼</span>
			<div class="rightHalf">
				<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon('1')" style="width:179px;">选择关联优惠券</el-button>
				<span class="coupon_name" v-if="promotersCoupon.length > 0">(已关联{{getCouponName(promotersCoupon)}})</span>
			</div>
		</div>
		<!-- 推广者获的积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">推广者获得积分</span>
			<div class="rightHalf">
				<el-input placeholder="请输入正整数" v-model="followersPoint" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
					<template slot="suffix">分</template>
				</el-input>
				<span>(只有当其微信用户通过本推广者分享的【推广者二维码】而满足公众号的情况下,才能获得相应积分奖励)</span>
			</div>
		</div>
		<!-- 获券上限 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">获券上限</span>
			<div class="rightHalf">
				<el-input placeholder="请输入正整数" v-model="promotersNum" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
					<template slot="suffix">次</template>
				</el-input>
			</div>
		</div>
		<!-- 关注者获礼 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">关注者获礼</span>
			<div class="rightHalf">
				<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon('2')" style="width:179px;">选择关联优惠券</el-button>
				<span class="coupon_name" v-if="followersCoupon.length > 0">(已关联{{getCouponName(followersCoupon)}})</span>
			</div>
		</div>
		<!-- 关注者获的积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">关注者获得积分</span>
			<div class="rightHalf">
				<el-input placeholder="请输入正整数" v-model="promotersPoint" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
					<template slot="suffix">分</template>
				</el-input>
				<span>(不管是通过推广者的专属二维码,还是通过公众号二维码,公众号名称,他人分享链接等,都可以获得相应积分)</span>
			</div>
		</div>
		<!-- 取消保存 -->
		<div class="online-box clearfix" style="padding-left:60px;">
			<el-button type="info" plain style="margin-right: 10px;width:190px;" @click="closePage">取消</el-button>
			<el-button v-if='isactivityDetail' type="info" style="margin-right: 10px;width:190px;" @click="saveConfig('0')">保存</el-button>
			<el-button v-if="editId == ''" type="primary" style="margin-right: 10px;width:190px;" @click="saveConfig('1')">发布</el-button>
		</div>
		<!-- 优惠券 -->
		<addCoupon v-if='showCoupon' :selectCoupon='selectCoupon' @winEvent='winEvent'></addCoupon>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start
			},
			endObj: {
				time: new Date().setHours(23, 59, 59, 999)
			},
			dates: new Date().getTime(), //当前时间
			returnInt: 1, //相差天数
			promotersPoint: '', //关注者者获得的积分
			promotersNum: '', //推广者者获得积分的次数
			followersPoint: '', //推广者获得的积分
			activityName: '', //活动的名称
			showCoupon: false, //打开优惠券的弹窗	
			couponList: [], //优惠券列表
			selectCoupon: [], //选中的列表
			promotersCoupon: [], //推广者获得的优惠券
			followersCoupon: [], //关注者获得的优惠券
			couponType: '', //优惠券类型 区分关注者和推广者 
			editId: '', //编辑任务的id
			ruleId: '', //规则ID
			isclick: false, //只能保存一次
			isactivityDetail: true
		};
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		'promotersCoupon': {
			deep: true,
			handler: function(val) {
				this.getCouponName(this.promotersCoupon);
			}
		},
		'followersCoupon': {
			deep: true,
			handler: function(val) {
				this.getCouponName(this.followersCoupon);
			}
		}
	},
	methods: {
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity/generalActivity');
		},
		getStartTime(str) {
			this.startObj.time = str;
		},
		getEndTime(str) {
			this.endObj.time = str;
		},
		timeChange: function() {
			//相差天数计算
			this.returnInt = Math.ceil(
				(new Date(this.endObj.time).getTime() -
					new Date(this.startObj.time).getTime()) /
				(1000 * 60 * 60 * 24)
			);
		},
		transformDate(t) { //日期格式化
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		winEvent(obj) { //选择优惠券弹窗回掉
			this.showCoupon = false;
			if (obj.status == 'ok') {
				if (this.couponType == '1') {
					this.promotersCoupon = obj.data.select;
				} else if (this.couponType == '2') {
					this.followersCoupon = obj.data.select;
				}
			}
		},
		addCoupon: function(type) { //添加优惠券
			this.showCoupon = true;
			this.couponType = type;
			if (this.couponType == '1') {
				this.selectCoupon = this.promotersCoupon;
			} else if (this.couponType == '2') {
				this.selectCoupon = this.followersCoupon;
			}
		},
		checkForm: function() {
			if (this.activityName == '') {
				this.valiData('活动标题不能为空!');
				return false;
			}
			if (this.isclick) {
				this.valiData('请勿重复保存!');
				return false;
			}
			return true;
		},
		saveConfig: function(type) { //保存
			if (!this.checkForm()) return;
			if (this.editId == '') {
				this.addConfig(type);
			} else {
				this.ediConfig(type);
			}
		},
		async addConfig(type) {
			let arr = [];
			let obj = {
				couponIds: {
					couponLimit: this.promotersNum, //推广者获券上限
					promoter: this.promotersCoupon, //推广者优惠券
					fans: this.followersCoupon //关注者优惠券
				},
				maxConsume: this.followersPoint, //推广者获得积分
				minConsume: this.promotersPoint //关注者获得的积分
			};
			arr.push(obj);
			await http.fissionActivity({
				data: {
					type: 4, //活动类别
					mouldType: 0, //长期活动模板
					name: this.activityName, //活动名
					objectType: 2, //活动对象
					startTime: parseInt(this.startObj.time / 1000), //开始时间
					endTime: parseInt(this.endObj.time / 1000), //结束时间
					isAuto: type, //保存 
					rule: JSON.stringify(arr)
				}
			});
			this.isclick = true; //只能保存一次
			let message = (type == '0') ? '保存成功' : '发布成功';
			this.valiData(message);
			this.closePage();
		},
		async ediConfig(type) {
			let activityDetail = {}; //data
			activityDetail.type = 4;
			activityDetail.mouldType = 0;
			activityDetail.name = this.activityName;
			activityDetail.objectType = 2;
			activityDetail.startTime = parseInt(this.startObj.time / 1000);
			activityDetail.endTime = parseInt(this.endObj.time / 1000);
			activityDetail.isAuto = type;
			activityDetail.rule = [];
			let obj = {
				id: this.ruleId,
				couponIds: {
					couponLimit: this.promotersNum, //推广者获券上限
					promoter: this.promotersCoupon, //推广者优惠券
					fans: this.followersCoupon //关注者优惠券
				},
				maxConsume: this.followersPoint, //推广者获得积分
				minConsume: this.promotersPoint //关注者获得的积分
			};
			activityDetail.rule.push(obj);
			//arr.push(obj);
			await http.fissionActivity({
				data: {
					activityId: this.editId, //任务Id
					data: JSON.stringify(activityDetail)
				}
			});
			this.isclick = true; //只能保存一次
			this.valiData('保存成功');
			this.closePage();
		},
		async getActivityDetail(item) {
			// 获取活动的详情
			let data = await http.newgetActivityDetail({
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType
				}
			});
			if (data) {
				this.activityName = data.name; //活动名称
				this.startObj.time = data.startTime * 1000; //开始时间
				this.endObj.time = data.endTime * 1000; //结束时间
				data.rule[0].couponIds = JSON.parse(data.rule[0].couponIds);
				this.promotersPoint = data.rule[0].minConsume; //推广者获得积分
				this.followersPoint = data.rule[0].maxConsume; //关注者获得积分
				this.promotersNum = data.rule[0].couponIds.couponLimit; //推广者获券的上限
				this.promotersCoupon = data.rule[0].couponIds.promoter; //推广者优惠券
				this.followersCoupon = data.rule[0].couponIds.fans; //关注者优惠券
				this.ruleId = data.rule[0].id; //规则id
			}
		},
		getCouponName: function(arr) { //获取优惠券名称
			let couponName = '';
			let couponArr = [];
			for (let item of arr) {
				let oneCoupon = item.name + '*' + item.num;
				couponArr.push(oneCoupon);
			}
			couponName = couponArr.join(';');
			return couponName;
		}
	},
	components: {
		'can-multi': () =>
			import( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		'addCoupon': () =>
			import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
		calendar: () =>
			import( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回活动列表',
			className: 'el-btn-blue',
			fn: () => {
				this.closePage();
			}
		}]);
		let activityInfo = storage.session('activityInfo');
		let activityDetail = storage.session('activityDetail');
		if (activityDetail) {
			this.isactivityDetail = false;
		}
		if (activityInfo) {
			this.editId = activityInfo.id;
			this.getActivityDetail(activityInfo);
		}
	},
	beforeDestroy() {
		//将编辑的任务缓存清掉
		storage.session('activityInfo', null);
		storage.session('activityDetail', null);
	}
};
</script>
<style scoped>
#fissoin {
	width: 1200px;
	height: auto;
}

#fissoin .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#fissoin .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#fissoin .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#fissoin .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#fissoin .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#fissoin .online-box .rightHalf {
	height: auto;
	float: left;
	line-height: 40px;
}

#fissoin .online-box .rightHalf .coupon_name {
	float: left;
	display: block;
	width: 600px;
	height: 40px;
	line-height: 40px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#fissoin .online-box .rightHalf .obj {
	display: inline-block;
	width: 179px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
}

#fissoin .online-box .rightHalf span {
	line-height: 40px;
}

#fissoin .online-box .rightHalf .name {
	width: 280px;
	height: 41px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#fissoin .online-box .cleander {
	width: 310px;
	height: 40px;
	border: 1px solid #999;
	float: left;
}

#fissoin .online-box .cleander_o {
	width: 100%;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	text-align: center;
}

#fissoin .online-box .cleander_t {
	float: left;
	width: 40%;
	height: 40px;
	text-align: center;
}

#fissoin .online-box .cleander_f {
	float: left;
	width: 20%;
	height: 40px;
	text-align: center;
}

#fissoin .online-box .cleander_s {
	float: left;
	width: 40%;
	height: 40px;
	text-align: center;
}

#fissoin .triangle {
	border: 1px solid #999;
	width: 40px;
	float: left;
	height: 40px;
	border-left: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}

#fissoin .foday {
	width: 80px;
	float: left;
	height: 40px;
	font-size: 12px;
	text-align: left;
	color: #00a1e9;
	padding-left: 10px;
	line-height: 40px;
}

#fissoin .online-box .rightHalf .fans {
	line-height: 40px;
}

#fissoin .online-box .rightHalf section {
	height: 38px;
	border: 1px solid #CECDCD;
	margin-right: 16px;
	float: left;
}

#fissoin .online-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#fissoin .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 37px;
	height: 37px;
	font-size: 16px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}
</style>