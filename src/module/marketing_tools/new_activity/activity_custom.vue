<template>
	<section v-if='!showVip' class="custom">
		<!-- 自定义设置 -->
		<div class="set-line">
			<div class="titles">自定义设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入活动标题" v-model='customName' maxlength="10" />
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<!-- <singleSelect class="fl" :index='indexCustom' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="customList" :name="'name'" :key='"id"'></singleSelect>
				<span class="fl associated" v-if="indexCustom == 1">(已关联{{member}}人)</span> -->
				<el-radio v-model="indexCustom" label="1" border>店内</el-radio>
				<el-radio v-model="indexCustom" label="2" border>线上</el-radio>
				<template v-if="indexCustom == '2'">
					<div class="innermember">
						<span class="required">线上</span>
					</div>
					<div class="innermember">
						<el-checkbox v-model="checkedMember" label="会员" border @change="toSinglemember(checkedMember)"></el-checkbox>
						<el-checkbox v-model="checkedFans" label="粉丝" border @change="toSinglefans(checkedFans)"></el-checkbox>
						<el-tooltip class="item" effect="dark" content="用户在该活动内触发了发券规则，满足一个规则进行一次推送券。若用户同时为公众号粉丝并是会员，只触发一次发券。" placement="right">
							<i class="el-icon-question" style="color:#E1BB4A;font-size: 24px;"></i>
						</el-tooltip>
					</div>
					<div class="innermember">
						<span>已关联会员:{{member}}人|已关联粉丝:{{fans}}人</span>
					</div>
				</template>
			</div>
		</div>
		<!-- 关联优惠券 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">关联优惠券</span>
			<div class="rightHalf">
				<section class="clearfix">
					<a href="javascript:void(0);" class="addclassify" style="width:200px;" @click="addCustom">选择关联优惠券</a>
					<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
				</section>
				<!-- 活动对象为店内的时候显示 -->
				<div v-for="(item,index) in miCount" :key='index' style="display: inline-block;" class="mic" v-show="num">
					<section class="mic-del" :title="item.name">
						<span class="mic-name">{{item.name}}</span>
						<div class="openoperation" style="margin-top:30px ;">
							<img v-on:click="delCount(item.id,index)" style="position: absolute;" src="../../../res/icon/delete.png" />
						</div>
					</section>
					<div style="top: 3px;" ref='autoGive' class="mic-limit auto-give">
						<span>发放数量：</span>
						<select class="mic-num" v-model="micsel[index]" @click="autosell(item.id, index)">
							<option value="0" selected="selected">不设限制</option>
							<option value="1">设定总数</option>
						</select>
						<span class="down" style="right: 11px;"></span>
						<span class="line"></span>
						<input type="text" v-model="item.micNum" ref='autoTxt' class="auto-txt" maxlength="9" />
						<span class="look auto-look" ref='autoLook'>张</span>
					</div>
					<div style="bottom: 3px;" ref='autoDay' class="mic-limit auto-day">
						<span>每日上限：</span>
						<select class="mic-num" v-model="micselimit[index]" @click="autosellimit(item.id, index)">
							<option value="0" selected="selected">不设限制</option>
							<option value="1">设定总数</option>
						</select>
						<span class="down" style="right: 11px;"></span>
						<span class="line"></span>
						<input type="text" v-model="item.micLimit" ref='txtDay' class="auto-txt" maxlength="9" />
						<span class="look auto-look" ref='lookDay'>张</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
					<span class="fl lines">-</span>
					<calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
				</div>
				<span class="fl returnInt">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 自定义设置 -->
		<div class="set-line">
			<div class="titles">活动通知</div>
			<div class="line"></div>
		</div>
		<!-- 消息推送渠道 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">消息推送渠道</span>
			<div class="rightHalf">
				<mulSelect class="fl" :styles="{backgroundColor:'rgb(240,240,240)'}" :list='goodsType' @selOn='selOn' :selects="customSelect" :name='"name"' :keyName='"id"'></mulSelect>
				<div class="fl handle-tips">
					<i></i> 活动发布后将通过该渠道触发会员
				</div>
			</div>
		</div>
		<!-- 内容设置 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">内容设置</span>
			<div class="rightHalf">
				<textarea placeholder="请输入内容设置" v-model="customActivity" maxlength="151"></textarea>
				<div class="bluehandle-tips">
					<i></i> 活动发布后将通过该渠道触发会员
				</div>
				<div class="limit">
					<p>引用参数:
						<a style="color:#FF9200;" :key='index' v-for="(item,index) in customParameter" @click="addParameter(index,2)">{{item.name}}</a>
					</p>
				</div>
			</div>
		</div>
		<!-- 活动说明 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动说明</span>
			<div class="rightHalf">
				<textarea placeholder="请输入活动说明" v-model="customExplain" maxlength="151"></textarea>
				<div class="bluehandle-tips">
					<i></i> 限150字以内
				</div>
			</div>
		</div>
		<div class="box" style="margin-top: 100px;padding-left: 70px;">
			<a href="javascript:void(0);" class="gray" style="width: 200px;" @click="returnAct">取消</a>
			<template v-if='isactivityDetail'>
				<a href="javascript:void(0);" class="gray" style="width: 200px;background: #858585;" @click="activitySave('0')">保存</a>
				<a v-if="editId == ''" href="javascript:void(0);" class="yellow" style="width: 200px;" @click="activitySave('1')">发布</a>
			</template>
		</div>
		<!-- <vip v-if='showVip' @selectVip='selectVipEvent'></vip> -->
		<birthCoupon v-if='showCoupon' :selectCoupon='selectCoupon' :couponList='couponList' @winEvent='winEventCoupon'></birthCoupon>
	</section>
	<!-- 会员筛选 -->
	<memberScreening v-else @selectVip='selectVipEvent'></memberScreening>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import global from 'src/manager/global';

let currentShop = null;
export default {
	data() {
		return {
			startObj: { //活动的开始时间
				time: utils.getTime({
					time: new Date()
				}).start
			},
			endObj: { //活动的结束时间
				time: utils.getTime({
					time: new Date()
				}).end
			},
			dates: new Date().getTime(), //当前时间
			returnInt: 1, //相差天数
			edit: false, //是否为编辑
			editId: '', //编辑id
			//发放数量
			total: [{
				text: '不设限制',
				value: '0'
			},
			{
				text: '设定总数',
				value: '1'
			}
			],
			num: true, //店内活动 数量限制显示
			customName: '', //自定义活动名称
			customExplain: '', //自定义活动说明
			customIds: [], //自定义设置店内选中优惠券
			selectCoupon: [], //自定义设置会员选中优惠券
			member: 0, //会员关联的人数
			fans: 0, //粉丝关联的人数
			memfilter: '',
			customList: [{
				name: '店内'
			},
			{
				name: '会员'
			}
			],
			indexCustom: '1', //活动对象选中的
			goodsType: [{
				'name': '微信',
				'id': '1'
			},
				// {
				// 	'name': '短信',
				// 	'id': '2'
				// }
			], //消息推送渠道
			customSelect: [], //自定义活动选择的
			msmStatus: false, //短信开关状态
			micsel: [], //每张优惠券select默认选中值
			micselimit: [], //每日上限 select默认选中值
			memberCoupon: [], //活动对象为会员时选中的优惠券
			miCount: [], //店内选中的优惠券列表
			activityDetail: {}, //详情
			brandId: null, //3为品牌 0为单店
			customActivity: '', //自定义活动
			customParameter: [{
				'name': '【会员姓名】',
				'id': '{memberName}'
			},
			{
				'name': '【优惠券名称】',
				'id': '{couponName}'
			},
			{
				'name': '【优惠券数量】',
				'id': '{couponNum}'
			},
			{
				'name': '【活动名称】',
				'id': '{activityName}'
			}
			],
			showCoupon: false,
			couponList: [], //优惠券列表
			showVip: false,
			memberStatus: true, //是否有从会员页面筛选过来的会员
			isactivityDetail: true,
			checkedMember: false, //会员选中的
			checkedFans: false //粉丝选中的
		};
	},
	watch: {
		'micselimit': {
			handler: function() {
				console.log(this.micselimit, '---');
			},
			deep: true
		},
		'customExplain': function() {
			if (this.customExplain.length > 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.customExplain = this.customExplain.substr(0, 150);
			}
		},
		'customActivity': function() {
			if (this.customActivity.length > 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.customActivity = this.customActivity.substr(0, 150);
			}
		},
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		indexCustom: function() {
			if (this.indexCustom == 1) {
				this.selectCoupon = this.miCount;
				this.num = true;
			} else if (this.indexCustom == 2) {
				this.selectCoupon = this.memberCoupon;
				this.num = false;
			}
			//this.abc();
		},
		// checkedMember: function(Value, oldValue, ) { //选择会员
		// 	if (this.checkedMember) {
		// 		if (this.memberStatus) {
		// 			this.addVip();
		// 		}
		// 	} else {
		// 		this.member = 0; //会员选中的人数
		// 		this.memfilter = ''; //会员筛选的条件
		// 	}
		// },
		// checkedFans: function() { //选择粉丝
		// 	if (this.checkedFans) {
		// 		this.getSubscribeFansCount();
		// 	} else {
		// 		this.fans = 0;
		// 	}
		// }
	},
	methods: {
		valiData: function(content, title, winType) { //弹窗提示格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		haveIndex(i) { //活动对象选择
			this.indexCustom = i;
			if (this.indexCustom == 0) {
				this.selectCoupon = this.miCount;
			} else if (this.indexCustom == 1) {
				this.selectCoupon = this.memberCoupon;
			}
			//this.abc();
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
		addVip() {
			this.showVip = true;
		},
		selectVipEvent(obj) {
			if (obj.status == 'ok') {
				this.member = obj.member;
				this.memfilter = obj.memfilter;
			}
			this.$store.commit('setPageTools', [{
				name: '<返回活动列表',
				className: ['activity'],
				fn: () => {
					this.returnAct();
				}
			}]);
			this.showVip = false;
		},
		//自定义活动对象切换
		abc: function() {
			if (this.indexCustom == 2) {
				//打开会员弹窗
				if (this.memberStatus) {
					this.addVip();
				}
				this.num = false;
			}
			if (this.indexCustom == 0) {
				this.num = true;
			}
		},
		addParameter: function(index) { //添加参数
			this.customActivity += this.customParameter[index].id;
		},
		winEventCoupon(obj) { //选择优惠券的回调
			this.showCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.select;
				this.couponList = obj.data.list;
				if (this.indexCustom == 1) {
					this.miCount = obj.data.select;
					for (let i = 0; i < this.miCount.length; i++) {
						this.$set(this.micsel, i, 0);
						this.$set(this.micselimit, i, 0);
					}
				} else if (this.indexCustom == 2) {
					this.memberCoupon = obj.data.select;
				}
			}
		},
		selOn(arr) {
			this.goodsSelect = arr;
		},
		//自定义店内--发放数量输入框的显示隐藏
		autosell: function(index, item) {
			let look = this.$refs.autoLook;
			let txt = this.$refs.autoTxt;
			if (this.micsel[item] == 0) {
				look[item].style.display = 'none';
				txt[item].style.display = 'none';
				this.miCount[item].micNum = '';
			}
			if (this.micsel[item] == 1) {
				look[item].style.display = 'inline';
				txt[item].style.display = 'inline-block';
			}
		},
		autosellimit: function(index, item) {
			let look = this.$refs.lookDay;
			let txt = this.$refs.txtDay;
			if (this.micselimit[item] == 0) {
				look[item].style.display = 'none';
				txt[item].style.display = 'none';
				this.miCount[item].micLimit = '';

			}
			if (this.micselimit[item] == 1) {
				look[item].style.display = 'inline';
				txt[item].style.display = 'inline-block';
			}
		},
		delCount: function(index, item) {
			this.$store.commit('setWin', {
				content: '确认删除该优惠券？',
				callback: (str) => {
					if (str == 'ok') {
						this.miCount.splice(item, 1);
						this.customIds.splice(item, 1);
					}
				}
			});
		},
		returnAct() {
			this.$router.push('/admin/activity/generalActivity');
		},
		//关联优惠券弹窗
		async addCustom() {
			let data = await http.getGetCouponCondition({});
			let coupons = [];
			for (let item of data) {
				item.num = 1;
				if (item.type != 7) {
					coupons.push(item);
				}
			}
			this.couponList = coupons;
			if (this.indexCustom == 1) {
				this.selectCoupon = this.miCount;
			} else if (this.indexCustom == 2) {
				this.selectCoupon = this.memberCoupon;
			}
			this.showCoupon = true;
		},
		//自定义活动保存
		checkForm: function() {
			if (!global.checkData({
				isclick: {
					cond: '$$!==true',
					pro: '请勿重复保存'
				},
				customName: '活动名称未设置',
				selectCoupon: {
					cond: '$$.length!=0',
					pro: '请关联优惠券'
				},

			}, this)) return false;
			if (this.indexCustom == 2 && !this.checkedMember && !this.checkedFans) {
				this.valiData('请关联活动对象!');
				return false;
			}
			if (this.startObj.time - this.endObj.time > 0) {
				this.valiData('时间选择范围错误!');
				return false;
			}
			return true;
		},
		async activitySave(type) {
			if (!this.checkForm()) return;
			if (!this.edit) {
				let arr = [];
				let obj = {
					//活动对象为店内和活动对象为会员时传递的优惠券不一样
					couponIds: this.indexCustom == 1 ? this.miCount : this.memberCoupon,
					minConsume: '',
					maxConsume: '',
					isLoop: '0',
					memberRights: '1',
					pushChannel: this.customSelect.toString().replace(/,/g, ''), //自定义活动选中的数组
					msgContent: this.customActivity //自定义活动内容设置
				};
				arr.push(obj);
				await http.fissionActivity({
					data: {
						rule: JSON.stringify(arr),
						type: 1, //活动类别
						mouldType: 0, //长期活动模板
						name: this.customName, //活动名
						explain: this.customExplain, //活动说明
						//`objectType` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '活动对象。0：表示店内，1：表示会员 ，2表示全体会员 3.微分店，4.具体会员IDS',
						objectType: this.memberStatus ? 4 : 1, //活动对象
						memberIds: this.memfilter, //活动关联会员
						memberNum: this.member, //会员人数
						selectFans: this.fans, //粉丝的数量
						startTime: parseInt(this.startObj.time / 1000), //开始时间
						endTime: parseInt(this.endObj.time / 1000), //结束时间
						getType: 0, //获得方式
						isAuto: type, //保存 
					}
				});
			} else {
				if (this.indexCustom == 1) { //优惠券
					this.activityDetail.rule[0].couponIds = this.miCount;
				} else if (this.indexCustom == 2) {
					this.activityDetail.rule[0].couponIds = this.memberCoupon;
				}
				this.activityDetail.name = this.customName; //活动名称
				this.activityDetail.explain = this.customExplain; //活动说明
				//活动对象编辑的时候不会牵扯到固定会员发放活动
				if (this.indexCustom == '1') {
					this.activityDetail.objectType = 0;
				} else {
					this.activityDetail.objectType = 4;
				}
				//this.activityDetail.objectType = this.indexCustom; //活动对象
				this.activityDetail.startTime = parseInt(this.startObj.time / 1000); //开始时间
				this.activityDetail.endTime = parseInt(this.endObj.time / 1000); //结束时间
				this.activityDetail.rule[0].pushChannel = this.customSelect.toString().replace(/,/g, ''); //消息推送渠道
				this.activityDetail.rule[0].msgContent = this.customActivity; //自定义内容设置
				this.activityDetail.rule = utils.deepCopy(this.activityDetail.rule);
				this.activityDetail.isAuto = type;
				this.activityDetail.memberIds = this.memfilter; //会员条件
				this.activityDetail.memberNum = this.member; //会员数量
				//delete this.activityDetail.rule;
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
			this.customName = data.name; //活动民称
			let arr = data.rule[0].couponIds;
			while ((arr + '').length > 3 && typeof this.activityDetail.rule[0].couponIds == 'string') {
				arr = this.activityDetail.rule[0].couponIds = JSON.parse(this.activityDetail.rule[0].couponIds);
			}
			this.customActivity = data.rule[0].msgContent; //自定义内容
			this.customSelect = data.rule[0].pushChannel.length > 1 ? data.rule[0].pushChannel.split(
				'').toString().split(',') : data.rule[0].pushChannel.split(','); //消息推送渠道 
			this.customExplain = data.explain; //活动说明
			if (data.objectType == '1') {
				this.indexCustom = '2';
				this.memberStatus = false;
			} else if (data.objectType == '0') {
				this.indexCustom = '1';
			} else if (data.objectType == '4') {
				this.indexCustom = '2';
			}
			if (this.indexCustom == '1') {
				this.num = true;
			} else {
				this.num = false;
			}
			if (data.selectFans && data.selectFans != '') { //筛选的粉丝的数量
				this.fans = data.selectFans;
				this.checkedFans = true;
			}
			this.startObj.time = data.startTime * 1000;
			this.endObj.time = data.endTime * 1000;
			this.selectCoupon = data.rule[0].couponIds;
			if (this.indexCustom == '1') {
				this.miCount = this.selectCoupon;
			} else {
				this.memberCoupon = this.selectCoupon;
			}
			//this.miCount = data.rule[0].couponIds;
			this.member = data.sendProgress.split(',')[0]; //会员的筛选数量
			this.memfilter = data.memberIds; //会员的筛选条件
			if (this.member && Number(this.member) > 0) {
				this.checkedMember = true;
			}
			// if (this.activityDetail.objectType == '0') {
			// 	this.customIds = this.activityDetail.rule[0].couponIds;
			// } else {
			// 	this.customIds1 = this.activityDetail.rule[0].couponIds;
			// }
			this.$nextTick(() => {
				setTimeout(() => {
					let list = this.$refs.autoDay;
					let lookDay = this.$refs.lookDay;
					let txtDay = this.$refs.txtDay;
					let look = this.$refs.autoLook;
					let txt = this.$refs.autoTxt;
					for (let i = 0; i < this.miCount.length; i++) {
						if (this.miCount[i].micLimit && this.miCount[i].micLimit != '') {
							this.micselimit[i] = 1;
							for (let j = 0; j < list.length; j++) {
								txtDay[i].style.display = 'inline-block';
								lookDay[i].style.display = 'inline';
							}
						} else {
							this.$set(this.micselimit, i, 0);
						}
						if (this.miCount[i].micNum && this.miCount[i].micNum != '') {
							this.micsel[i] = 1;
							txt[i].style.display = 'inline-block';
							look[i].style.display = 'inline';
						} else {
							this.$set(this.micsel, i, 0);
						}
					}
				}, 300);
			});
		},
		async getSubscribeFansCount() {
			let data = await http.getSubscribeFansCount({});
			if (data) {
				this.fans = data;
			}
		},
		toSinglemember: function(item) {
			if (item) {
				if (this.memberStatus) {
					this.addVip();
				}
			} else {
				this.member = 0; //会员选中的人数
				this.memfilter = ''; //会员筛选的条件
			}
		},
		toSinglefans: function(item) {
			if (item) {
				this.getSubscribeFansCount();
			} else {
				this.fans = 0;
			}
		}
	},
	beforeCreate() {
		currentShop = storage.session('userShop').currentShop;
	},
	components: {
		'mulSelect': () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		'birthCoupon': () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
		'memberScreening': () =>
			import ( /* webpackChunkName:'activity_screening' */ './activity_screening'),
		'singleSelect': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '<返回活动列表',
			className: ['activity'],
			fn: () => {
				this.returnAct();
			}
		}]);
		this.ischain = this.brandId = currentShop.ischain;
		let memberIds = storage.session('memberIds'); //获取是否有会员信息
		if (memberIds) {
			this.indexCustom = '2'; //让其默认选中会员
			this.member = memberIds.length;
			this.memfilter = memberIds.join(',');
			this.memberStatus = false; //从会员管理页面过来的 无法重新筛选会员的标识
		}
		let activityInfo = storage.session('activityInfo'); //获取编辑信息
		if (activityInfo) {
			if (activityInfo.isShowdetail) {
				//是否是查看活动详情
				this.isactivityDetail = false;
			}
			this.editId = activityInfo.id;
			this.edit = true;
			this.getActivityDetail(activityInfo);
		}
	},
	beforeDestroy() {
		storage.session('activityInfo', null);
		storage.session('memberIds', null);
	}
};
</script>
<style scoped>
.custom {
	max-width: 1400px;
	height: auto;
}

.custom .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

.custom .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

.custom .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

.custom .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

.custom .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

.custom .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
}





























/*活动名称的输入框*/

.custom .online-box .rightHalf .name {
	width: 280px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

.custom .online-box .rightHalf .obj {
	display: inline-block;
	width: 200px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
}

.custom .online-box .rightHalf textarea {
	width: 340px;
	height: 100px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}

.custom .online-box .rightHalf .limit {
	font-size: 14px;
	color: #999999;
	height: auto;
	overflow: hidden;
}

.custom .online-box .rightHalf .associated {
	line-height: 40px;
}

.custom .online-box .rightHalf .lines {
	width: 40px;
	text-align: center;
	margin-right: 0;
	line-height: 40px;
}

.custom .online-box .rightHalf .innermember {
	height: 40px;
	line-height: 40px;
	font-size: 16px;
}

.custom .online-box .rightHalf .innermember span {
	display: block;
}

.custom .online-box .rightHalf .returnInt {
	text-align: left;
	text-indent: 20px;
	color: #A3A3A3;
	line-height: 40px;
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



.days {
	display: inline-block;
	width: 65px;
	height: 40px;
	line-height: 40px;
	vertical-align: top;
	color: #28a8e0;
	margin-left: 5px;
}

.mic {
	width: 320px;
	height: 80px;
	background-color: #F2F2F2;
	margin-right: 10px;
	margin-bottom: 10px;
	line-height: 80px;
	position: relative;
	margin-top: 10px;
}

.mic .mic-name {
	display: inline-block;
	width: 110px;
	height: 80px;
	text-align: center;
	border-right: 1px dashed #f7931e;
	line-height: 80px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.mic:before {
	content: "";
	width: 0;
	height: 0;
	border: 8px solid #fff;
	border-radius: 8px;
	position: absolute;
	top: -8px;
	left: 102px;
}

.mic:after {
	content: "";
	width: 0;
	height: 0;
	border: 8px solid #fff;
	border-radius: 8px;
	position: absolute;
	bottom: -8px;
	left: 102px;
}

.mic .mic-num {
	border: 1px solid #b3b3b3;
	background-color: rgba(255, 255, 255, 0);
	width: 120px;
	height: 30px;
	padding-left: 8px;
	padding-right: 30px;
	font-size: 12px;
	outline: none;
	color: #b3b3b3;
	/*background: #fff;*/
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
}

.mic .mic-limit {
	display: inline-block;
	line-height: 35px;
	position: absolute;
	right: 10px;
	z-index: 3;
}

.mic .line {
	position: absolute;
	height: 29px;
	border-left: 1px solid #b3b3b3;
	right: 30px;
	top: 4px;
}

.mic .mic-txt,
.mic .auto-txt {
	width: 80px;
	height: 20px;
	font-size: 12px;
	background-color: #f2f2f2;
	padding: 0;
	border: none;
	position: absolute;
	top: 10px;
	left: 80px;
	display: none;
}

.mic .look {
	position: absolute;
	right: 35px;
	top: 0;
	font-size: 12px;
	display: none;
}

.mic .openoperation {
	display: none;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 25px;
	left: 45px;
}

.mic .mic-del {
	width: 110px;
	height: 80px;
	cursor: pointer;
}

.mic .mic-del .openoperation {
	display: none;
}

.mic .mic-del:hover .openoperation {
	display: block;
}

.down {
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid #b3b3b3;
	position: absolute;
	top: 15px;
	right: 16px;
}
</style>