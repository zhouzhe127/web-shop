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
			<span class="online-sub fl required">活动标题</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入活动标题" v-model='activityName' />
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
					<span class="fl" style="width: 40px;text-align: center;margin-right: 0;">-</span>
					<calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
				</div>
				<span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<span class="fans">全体会员</span>
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
				<a href="javascript:void(0);" class="addclassify" style="width:200px;" @click="addCount('1')">选择关联优惠券</a>
				<span v-if="promotersCoupon.length > 0">(已关联{{promotersCoupon.length}}张)</span>
			</div>
		</div>
<!-- 推广者获的积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">推广者获得积分</span>
			<div class="rightHalf">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="followersPoint" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分</span>
				</section>
				<span>(只有当其微信用户通过本推广者分享的【推广者二维码】而满足公众号的情况下,才能获得相应积分奖励)</span>
			</div>
		</div>		
		<!-- 获券上限 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">获券上限</span>
			<div class="rightHalf">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="promotersNum" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>次</span>
				</section>
			</div>
		</div>
		<!-- 关注者获礼 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">关注者获礼</span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="addclassify" style="width:200px;" @click="addCount('2')">选择关联优惠券</a>
				<span v-if="followersCoupon.length > 0">(已关联{{followersCoupon.length}}张)</span>
			</div>
		</div>
<!-- 关注者获的积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">关注者获得积分</span>
			<div class="rightHalf">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="promotersPoint" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分</span>
				</section>
				<span>(不管是通过推广者的专属二维码,还是通过公众号二维码,公众号名称,他人分享链接等,都可以获得相应积分)</span>
			</div>
		</div>		
		<!-- 取消保存 -->
		<div class="online-box clearfix" style="padding-left:60px;">
			<a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;background-color: #a7a7a7;" @click='closePage'>取消</a>
			<a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;" @click="saveConfig('0')">保存</a>
			<a v-if="editId == ''" href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click="saveConfig('1')">发布</a>
		</div>
		<!-- 优惠券 -->
		<birthCoupon v-if='showBirthCoupon' :selectCoupon='selectCoupon' :couponList='couponList' @winEvent='winEvent'></birthCoupon>
	</div>
</template>
<script>
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
				time: new Date().getTime()
			},
			dates: new Date().getTime(), //当前时间
			returnInt: 1, //相差天数
			promotersPoint: '', //关注者者获得的积分
			promotersNum: '', //推广者者获得积分的次数
			followersPoint: '', //推广者获得的积分
			activityName: '', //活动的名称
			showBirthCoupon: false, //打开优惠券的弹窗	
			couponList: [], //优惠券列表
			selectCoupon: [], //选中的列表
			promotersCoupon: [], //推广者获得的优惠券
			followersCoupon: [], //关注者获得的优惠券
			couponType: '', //优惠券类型 区分关注者和推广者 
			editId: '', //编辑任务的id
			ruleId: '', //规则ID
			isclick: false //只能保存一次
		};
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
	},
	methods: {
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity');
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
		winEvent(obj) {
			this.showBirthCoupon = false;
			if (obj.status == 'ok') {
				if (this.couponType == '1') {
					this.promotersCoupon = obj.data.select;
				} else if (this.couponType == '2') {
					this.followersCoupon = obj.data.select;
				}
			}
		},
		//关联优惠券弹窗
		async addCount(type) {
			let data = await http.getGetCouponCondition({
				data: {
					
				}
			});
			let coupons = [];
			for (let item of data) {
				if (item.type != 7) { //type7是积分卡券
					coupons.push(item);
				}
			}
			this.couponList = coupons;
			this.couponList.forEach(function(item) {
				item.num = 1;
			});
			this.couponType = type;
			if (this.couponType == '1') {
				this.selectCoupon = this.promotersCoupon;
			} else if (this.couponType == '2') {
				this.selectCoupon = this.followersCoupon;
			}
			this.showBirthCoupon = true;
		},
		checkForm: function() {
			if (this.activityName == '') {
				this.valiData('活动标题不能为空!');
				return false;
			}
			if(this.isclick){
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
			this.isclick = true;//只能保存一次
			let message = (type == '0') ? '保存成功' : '发布成功';
			this.valiData(message);
			this.closePage();
		},
		async ediConfig(type) {
			let activityDetail = {};//data
			activityDetail.type = 4;
			activityDetail.mouldType = 0;
			activityDetail.name = this.activityName;
			activityDetail.objectType = 2;
			activityDetail.startTime = parseInt(this.startObj.time / 1000);
			activityDetail.endTime = parseInt(this.endObj.time / 1000);
			activityDetail.isAuto = type;
			activityDetail.rule = [];
			//let arr = [];
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
					data:JSON. stringify(activityDetail)
				}
			});
			this.isclick = true;//只能保存一次
			this.valiData('保存成功');
			this.closePage();
		},
		async getActivityDetail(item) {
			// 获取活动的详情
			let data = await http.getActivityDetails({
				data: {
					activityId: item.id
				}
			});
			if (data) {
				this.activityName = data.name; //活动名称
				this.startObj.time = data.startTime * 1000; //开始时间
				this.endObj.time = data.endTime * 1000; //结束时间
				this.promotersPoint = data.rule[0].minConsume; //推广者获得积分
				this.followersPoint = data.rule[0].maxConsume; //关注者获得积分
				this.promotersNum = data.rule[0].couponIds.couponLimit; //推广者获券的上限
				this.promotersCoupon = data.rule[0].couponIds.promoter; //推广者优惠券
				this.followersCoupon = data.rule[0].couponIds.fans; //关注者优惠券
				this.ruleId = data.rule[0].id; //规则id
			}
		}
	},
	components: {
		'can-multi': () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		'birthCoupon': () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '<返回活动列表',
			className: ['activity'],
			fn: () => {
				this.closePage();
			}
		}]);
		let activityInfo = storage.session('activityInfo');
		if (activityInfo) {
			this.editId = activityInfo.id;
			this.getActivityDetail(activityInfo);
		}
	},
	beforeDestroy() {
		//将编辑的任务缓存清掉
		storage.session('activityInfo', null);
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
	width: 1000px;
	height: auto;
	float: left;
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