<template>
	<section class='birth_act'>
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<el-input v-model="actName" maxlength="10" placeholder="请输入活动标题"></el-input>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动时间</span>
			<div class="rightHalf">
				<!--日期选择和搜索框-->
				<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
				</el-date-picker>
				<span class="returnInt">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 营销规则设置 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">营销规则设置</span>
			<div class="rightHalf">
				<el-tabs type="border-card" style="width:520px;">
					<el-tab-pane v-for="(item,index) in levelList" :key="index" :label="item.name">
						<div class="rulecontent">
							<!-- 升级规则 -->
							<div class="online-box clearfix">
								<span class="online-sub fl required">升级规则</span>
								<div class="rightHalf">
									<el-switch v-model="item.upgrade" active-color="#E1BB4A" inactive-color="#dcdfe6">
									</el-switch>
								</div>
							</div>
							<!-- 赠送优惠券 -->
							<div class="online-box clearfix">
								<span class="online-sub fl required">赠送优惠券</span>
								<div class="rightHalf">
									<el-button type="primary" icon="el-icon-plus" @click="openCouponWin(item)" style="width:179px;">选择关联优惠券</el-button>
									<span v-if="item.couponIds.length >= 1">(已关联{{item.couponIds.length}}张)</span>
								</div>
							</div>
							<!-- 赠送积分 -->
							<div class="online-box clearfix">
								<span class="online-sub fl required">赠送积分</span>
								<div class="rightHalf">
									<el-input v-model="item.givingPoint" maxlength="10" placeholder="请输入赠送积分" style="width:179px;"></el-input>
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<!-- 活动通知 -->
		<div class="set-line">
			<div class="titles">活动通知</div>
			<div class="line"></div>
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
				<el-button type="primary" style="margin-right: 10px;width:190px;" @click="birthSave('1')">发布</el-button>
			</template>
		</div>
		<!-- 优惠券的弹窗 -->
		<coupon @winEvent='couponEvent' :selectCoupon='selectCoupon' v-if='showCoupon'></coupon>
	</section>
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
				editId: '', //编辑id
				actName: '', //生日活动名称
				explain: '', //生日活动说明
				isclick: false, //保存时只能点击一次
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
					'name': '【会员生日】',
					'id': '{memberBirthday}'
				}, {
					'name': '【优惠券名称】',
					'id': '{couponName}'
				}, {
					'name': '【优惠券数量】',
					'id': '{couponNum}'
				}, {
					'name': '【活动名称】',
					'id': '{activityName}'
				}],
				couponList: [], //优惠券列表
				isactivityDetail: true, //是否查看详情
				valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
				returnInt: 1, //相差天数
				levelList: [{
					'id': 0,
					'name': '等级一',
					'upgrade': false,
					'couponIds': [],
					'givingPoint':''
				}, {
					'id': 0,
					'name': '等级二',
					'upgrade': false,
					'couponIds': [],
					'givingPoint':''
				}, {
					'id': 0,
					'name': '等级三',
					'upgrade': false,
					'couponIds': [],
					'givingPoint':''
				}, {
					'id': 0,
					'name': '等级四',
					'upgrade': false,
					'couponIds': [],
					'givingPoint':''
				}, {
					'id': 0,
					'name': '等级五等级五',
					'upgrade': false,
					'couponIds': [],
					'givingPoint':''
				}],
				selectCoupon: [], //选中的优惠券
				showCoupon: false,

			};
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
			'valueTime': {
				handler: function() {
					this.timeChange();
				},
				deep: true,
			}
		},
		methods: {
			valiData: function(content, title, winType) { //弹窗提示格式化
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType
				});
			},
			chooseTime: function(time) { //获取时间
				this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
			},
			addParameter: function(index) { //添加参数
				this.contentSetting += this.parameter[index].id;
			},
			couponEvent(obj) { //选择优惠券弹窗的回掉
				this.showCoupon = false;
				if (obj.data.select && obj.status == 'ok') {
					//this.ruleList[this.ruleIndex].couponIds = obj.data.select;
				}
			},
			selOn(arr) {
				this.goodsSelect = arr;
			},
			returnAct() {
				this.$router.push('/admin/activity/generalActivity');
			},
			// checkForm: function() {

			// },
			async birthSave(type) {
				if (!this.checkForm()) return;
				if (!this.edit) {
					let arr = [];
					let obj = {
						couponIds: this.selectCoupon,
						pushChannel: this.goodsSelect.toString().replace(/,/g, ''),
						msgContent: this.contentSetting //内容设置
					};
					arr.push(obj);
					await http.fissionActivity({
						data: {
							type: 0, //活动类别
							mouldType: 0, //长期活动模板
							name: this.actName, //活动名
							advanceTime: this.pushdateNum + ',' + this.pushNum, //生日活动 自定义提前推送时间  天数,推送整点
							explain: this.explain, //活动说明
							objectType: 2, //活动对象
							//shopIds: this.shopList.toString(), //关联门店
							limit: this.durationId, //活动期限
							getType: 0, //获得方式
							isAuto: type, //保存 
							rule: JSON.stringify(arr)
						}
					});
				} else {
					this.activityDetail.name = this.actName;
					this.activityDetail.advanceTime = this.pushdateNum + ',' + this.pushNum; //推送日期和推送时间
					this.activityDetail.explain = this.explain;
					this.activityDetail.rule[0].couponIds = this.selectCoupon;
					this.activityDetail.rule[0].msgContent = this.contentSetting; //内容设置
					this.activityDetail.rule[0].pushChannel = this.goodsSelect.toString().replace(/,/g, ''); //选择渠道
					this.activityDetail.limit = this.durationId;
					this.activityDetail.rule = utils.deepCopy(this.activityDetail.rule);
					this.activityDetail.isAuto = type;
					await http.fissionActivity({
						data: {
							activityId: this.editId,
							data: JSON.stringify(this.activityDetail)
						}
					});
				}
				let message = (type == '0') ? '保存成功' : '发布成功';
				this.valiData(message);
				this.returnAct();
			},
			async getActivityDetail(item) {
				// 获取详情
				let data = await http.newgetActivityDetail({
					data: {
						activityId: item.id,
						type: item.type,
						mouldType: item.mouldType
					}
				});
				this.activityDetail = data;
				this.actName = data.name;
				this.explain = data.explain;
				this.pushdateNum = data.advanceTime.split(',')[0]; //推送日期
				this.pushNum = data.advanceTime.split(',')[1]; //推送时间
				this.goodsSelect = data.rule[0].pushChannel.length > 1 ? data.rule[0].pushChannel.split('').toString().split(',') :
					data.rule[0].pushChannel.split(','); //消息推送渠道
				this.contentSetting = data.rule[0].msgContent; //内容设置
				this.goodsIds = JSON.parse(data.rule[0].couponIds);
				this.selectCoupon = JSON.parse(data.rule[0].couponIds);
				this.durationId = data.limit; //活动期限
				this.durationName = this.durationList[data.limit].name; //活动期限名称
				this.edit = true;
			},
			timeChange: function() {
				//相差天数计算
				this.returnInt = Math.ceil(
					(new Date(this.valueTime[1]).getTime() -
						new Date(this.valueTime[0]).getTime()) /
					(1000 * 60 * 60 * 24)
				) + 1;
			},
			openCouponWin: function(item) { //打开优惠券的弹窗
				this.selectCoupon = item.couponIds;
				this.showCoupon = true;
			},
		},
		components: {
			'mulSelect': () =>
				import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
			coupon: () =>
				import ( /* webpackChunkName:'activity_agift_coupon' */ './activity_agift_coupon'),
			selectBtn: () =>
				import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
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
		width: 140px;
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

	.birth_act .online-box .rightHalf .returnInt {
		text-align: left;
		text-indent: 20px;
		color: #A3A3A3;
		line-height: 40px;
	}


	/*活动名称的输入框*/
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

	.birth_act .rulecontent {
		width: 100%;
		height: 250px;
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