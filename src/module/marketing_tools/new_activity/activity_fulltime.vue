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
				<el-button type="primary" icon="el-icon-plus" @click="addCoupon" style="width:179px;">选择关联优惠券</el-button>
				<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
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
			'startObj.time': 'timeChange',
			'endObj.time': 'timeChange',
		},
		methods: {
			valiData: function(content, title, winType) { //弹窗提示格式化
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType
				});
			},
			addVip: function() { //会员筛选
				this.showVip = true;
			},
			selectVipEvent(obj) {
				if (obj.status == 'ok') {
					this.member = obj.member;
					this.memfilter = obj.memfilter;
				}
				this.$store.commit('setPageTools', [{
					name: '返回活动列表',
					className: 'el-btn-blue',
					fn: () => {
						this.returnAct();
					}
				}]);
				this.showVip = false;
			},
			chooseTime: function(time) { //获取时间
				this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
			},
			addParameter: function(index) { //添加参数
				this.contentSetting += this.parameter[index].id;
			},
			winEvent(obj) { //选择优惠券弹窗回掉
				this.showCoupon = false;
				if (obj.status == 'ok') {
					this.selectCoupon = obj.data.select;
				}
			},
			selOn(arr) {
				this.goodsSelect = arr;
			},
			returnAct() {
				this.$router.push('/admin/activity/generalActivity');
			},
			//关联优惠券弹窗
			addCoupon: function() { //添加优惠券
				this.showCoupon = true;
			},
			checkForm: function() { //b表单的验证
				if (this.actName == '') {
					this.valiData('请输入活动名称');
					return false;
				}
				if (this.startTime < new Date().setHours(0, 0, 0, 0)) {
					this.valiData('开始时间不能小于当前时间');
					return false;
				}
				if(this.startTime - this.endTime > 0){
					this.valiData('开始时间不能大于结束时间');
					return false;					
				}
				if (this.member < 0) {
					this.valiData('请关联活动对象');
					return false;
				}
				if (this.selectCoupon.length == 0) {
					this.valiData('请选择关联优惠券');
					return false;
				}
				if (Number(this.number) < 1 || Number(this.number) > 999) {
					this.valiData('请填写消费满次数1-999');
					return false;
				}
				return true;
			},
			async birthSave(type) {
				if (!this.checkForm()) return;
				let arr = [];
				let obj = {
					couponIds: {
						couponIds: this.selectCoupon,
						consumeNum: this.number //消费满次数

					}, //消费次返券
					pushChannel: this.goodsSelect.toString().replace(/,/g, ''), //消息推送渠道
					msgContent: this.contentSetting, //内容设置
				};
				arr.push(obj);
				if (!this.edit) {
					await http.fissionActivity({
						data: {
							type: 8, //活动类别
							mouldType: 0, //长期活动模板
							name: this.actName, //活动名
							explain: this.explain, //活动说明
							objectType: 4, //活动对象
							getType: 0, //获得方式
							isAuto: type, //保存 
							memberIds: this.memfilter, //活动关联会员
							memberNum: this.member, //会员人数
							startTime: parseInt(this.startObj.time / 1000), //开始时间
							endTime: parseInt(this.endObj.time / 1000), //结束时	间	
							rule: JSON.stringify(arr)
						}
					});
				} else {
					this.activityDetail.name = this.actName; //活动名称
					this.activityDetail.startTime = parseInt(this.startObj.time / 1000); //开始时间
					this.activityDetail.endTime = parseInt(this.endObj.time / 1000); //结束时间	
					this.activityDetail.memberIds = this.memfilter; //会员条件
					this.activityDetail.memberNum = this.member; //会员数量				
					this.activityDetail.explain = this.explain; //活动说明
					this.activityDetail.rule = arr;
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
				this.actName = data.name; //活动名称
				this.startObj.time = data.startTime * 1000; //开始时间
				this.endObj.time = data.endTime * 1000; //结束时间
				this.member = data.sendProgress.split(',')[0]; //会员的筛选数量
				this.memfilter = data.memberIds; //会员的筛选条件
				let couponIds = JSON.parse(data.rule[0].couponIds);
				this.number = couponIds.consumeNum; //消费次数
				this.selectCoupon = couponIds.couponIds;
				this.goodsSelect = data.rule[0].pushChannel.length > 1 ? data.rule[0].pushChannel.split('').toString().split(',') :
					data.rule[0].pushChannel.split(','); //消息推送渠道
				this.contentSetting = data.rule[0].msgContent; //内容设置
				this.explain = data.explain; //活动说明
				this.edit = true;
			},
			timeChange: function() {
				//相差天数计算
				this.returnInt = Math.ceil(
					(new Date(this.endObj.time).getTime() -
						new Date(this.startObj.time).getTime()) /
					(1000 * 60 * 60 * 24)
				);
			},
		},
		components: {
			'mulSelect': () =>
				import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
			'addCoupon': () =>
				import ( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
			selectBtn: () =>
				import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
			'memberScreening': () =>
				import ( /* webpackChunkName:'activity_screening' */ './activity_screening'),
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