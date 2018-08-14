<template>
	<section v-if='!showVip'>
		<div class="info-title">
			<span class="title">自定义设置</span>
			<span class="line"></span>
		</div>
		<div class="box">
			<label>
				<span class="required">活动标题</span>
				<input type="text" maxlength="20" placeholder="请输入活动标题" v-model="customName" />
			</label>
		</div>
		<div class="box">
			<label>
				<span class="required" style="vertical-align: top;padding-top: 10px;">活动对象</span>
				<span v-show='iseditShop' style="z-index: 10;position: absolute;width: 140px;height: 43px;background: transparent;display: inline-block;"></span>
				<span v-show='isedit' style="z-index: 10;position: absolute;width: 70px;height: 43px;background: transparent;display: inline-block;"></span>
				<radio-btn :list="customList" :styleObj="{'margin-right':'8px','width':'100px'}" :index="indexCustom" @selOn='radioSel' :name='"name"' @click="abc"></radio-btn>
				<span v-if="indexCustom == 1">(已关联{{member}}人)</span>
			</label>
		</div>
		<div class="box">
			<span class="required" style="vertical-align: top;padding-top: 10px;">关联优惠券</span>
			<div class="btn-concent" style="display: inline-block;">
				<button class="increase" style="width: 200px;" @click="addCustom">选择关联优惠券</button>
			</div>
			<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
			<div v-show="num" style="margin-left: 170px;margin-top: 20px;">
				<div v-for="(item,index) in miCount" :key='index' style="display: inline-block;" class="mic">
					<section class="mic-del" :title="item.name">
						<span class="mic-name">{{item.name}}</span>
						<div class="openoperation" style="margin-top:30px ;">
							<img v-on:click="delCount(item.id,index)" style="position: absolute;" src="../../res/icon/delete.png" />
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
		<div class="box calendarbox" style="overflow: visible;">
			<span class="required">活动期限</span>
			<div style="position: relative;width: 400px;display: inline-block;vertical-align: top;height: 40px;">
				<div style="display:inline-block;border: 1px solid #b3b3b3;width: 300px; height: 40px; line-height: 40px;cursor: pointer;" @click="showCalendar">
					<span style="border-right: 1px solid #b3b3b3;display: inline-block;float: left;text-align:center;width: 255px; height: 40px;">{{start}}&nbsp;----&nbsp;{{end}}</span>
					<span class="down" style="right: 118px;"></span>
				</div>
				<span class="days">{{day}}</span>
				<canMulti v-if='showMulti' :starttime="atime" :endtime="btime" @castTime='castTime'></canMulti>
			</div>
		</div>
		<!-- 活动通知 -->
		<div class="info-title">
			<span class="title">活动通知</span>
			<span class="line"></span>
		</div>
		<!-- 消息推送渠道 -->
		<div class="content-box" style='overflow: hidden;'>
			<span class="req required-none fl">消息推送渠道</span>
			<span class="fl">
				<mulSelect :list='goodsType' @selOn='selOn' :styles="{'background-color':'rgb(239,239,239)','margin-right':'8px'}" :selects="customSelect" :name='"name"'
				    :keyName='"id"'></mulSelect>
			</span>
			<div class="fl handle-tips">
				<i></i> 活动发布后将通过该渠道触发会员
			</div>
		</div>
		<!-- 内容设置 -->
		<div class="box">
			<label>
				<span class=" req required-none" style="vertical-align: top;padding-top: 10px;">内容设置</span>
				<textarea placeholder="内容设置" style="width: 350px;height: 100px;" v-model="customActivity" maxlength="151"></textarea>
			</label>
			<div class="limit">
				<p class="fl" style="margin-right: 102px;">
					<img class="icon-i" src="../../res/icon/i.png" />限150字以内</p>
				<p class="fl" v-if="msmStatus">您已输入
					<span>{{customActivity.length}}</span>个字,目前发送
					<span>{{Math.ceil(customActivity.length / 60)}}</span>条短信</p>
			</div>
			<div class="limit">
				<p>引用参数:
					<a style="color:#FF9200;" v-for="(item,index) in customParameter" :key='index' @click="addParameter(index,2)">{{item.name}}</a>
				</p>
			</div>
		</div>
		<!-- 活动说明 -->
		<div class="box">
			<label>
				<span class=" req required-none" style="vertical-align: top;padding-top: 10px;">活动说明</span>
				<textarea placeholder="请输入活动说明" style="width: 350px;height: 100px;" v-model="customExplain" maxlength="151"></textarea>
			</label>
			<p class="limit">
				<img class="icon-i" src="../../res/icon/i.png" />限150字以内</p>
		</div>
		<div class="box" style="margin-top: 100px;padding-left: 70px;">
			<a href="javascript:void(0);" class="gray" style="width: 200px;" @click="cancel">取消</a>
			<a href="javascript:void(0);" class="gray" style="width: 200px;background: #858585;" @click="activitySave('0')">保存</a>
			<a v-show="issue" href="javascript:void(0);" class="yellow" style="width: 200px;" @click="activitySave('1')">发布</a>
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
			showCanMulti: false,
			edit: false, //是否为编辑
			editId: '', //编辑id
			explain: '', //生日活动说明
			totalSel: 0, //发放数量默认选中值
			giveNum: '', //发放数量
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
			digit: false, //发放数量总数填写是否显示
			dayGiveLimit: '', //每日发放上限
			num: true, //店内活动 数量限制显示
			customName: '', //自定义活动名称
			customExplain: '', //自定义活动说明
			indexCustom: 0, //单选选中
			customIds: [], //自定义设置店内选中优惠券
			selectCoupon: [], //自定义设置会员选中优惠券
			loginTime: false, //会员弹框注册日期
			//              vipIds: [], //选中关联会员
			member: 0,
			memfilter: '',
			startAge: '',
			endAge: '',
			sexIndex: ['0'],
			phone: '',
			atimevip: (new Date()).getTime(),
			btimevip: (new Date()).getTime(),
			isedit: false, //编辑下禁止修改对象
			iseditShop: false,
			isclick: false, //保存时只能点击一次
			issue: true, //发布按钮是否显示
			aid: '', //活动id
			flag: 0, //当前选中按钮
			change: 0, //监控按钮是否发生变化
			acti: true, //活动列表显示
			birth: false, //生日活动设置显示
			custom: false, //自定义设置 显示
			timeLimit: [{
				'name': '永久',
				value: '1'
			},
			{
				'name': '一年',
				value: '2'
			},
			{
				'name': '二年',
				value: '0'
			}
			],
			highLimit: false, //生日活动期限下拉框显示
			customList: [{
				'name': '店内'
			},
			{
				'name': '会员'
			}
			],
			goodsType: [{
				'name': '微信',
				'id': '1'
			},
			// {
			// 	'name': '短信',
			// 	'id': '2'
			// }
			], //消息推送渠道
			goodsSelect: [], //消息推送渠道选中
			customSelect: [], //自定义活动选择的
			msmStatus: false, //短信开关状态
			//日期日历
			atime: (new Date()).getTime(),
			btime: (new Date()).getTime(),
			//查询日期日历
			atime1: (new Date()).getTime(),
			btime1: (new Date()).getTime(),
			activityList: [], //活动列表
			pageNum: 10, //一版页码处理多少数据
			pageTotal: 1, //总页数
			pageCount: 0,
			page: 1,
			micShop: false, //微分店
			micList: [{
				'name': '选择使用'
			},
			{
				'name': '强制使用'
			}
			],
			micsel: [], //每张优惠券select默认选中值
			micselimit: [], //每日上限 select默认选中值
			miCount: [], //选中的优惠券列表 
			indexmic: 0, //核销方式选中
			radioCount: true, //核销方式切换
			compareArr: [], //用于比较优惠劵数组
			activityDetail: {}, //详情
			shopList: [],
			brandId: null, //3为品牌 0为单店
			contentSetting: '', //生日活动内容设置
			customActivity: '', //自定义活动
			parameter: [{
				'name': '【会员姓名】',
				'id': '{memberName}'
			},
			{
				'name': '【会员生日】',
				'id': '{memberBirthday}'
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
			showMulti: false,
			showCoupon: false,
			couponList: [], //优惠券列表
			showVip: false,
			memberStatus: true //是否有从会员页面筛选过来的会员
		};
	},
	watch: {
		'goodsSelect': function() {
			if (this.goodsSelect.indexOf('2') > -1) {
				this.msmStatus = true;
			} else {
				this.msmStatus = false;
			}
		},
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
	},
	methods: {
		castTime(obj) {
			this.showMulti = false;
			let {
				startTime,
				endTime
			} = obj;
			this.atime = startTime;
			this.btime = endTime;
		},
		showCalendar() {
			this.showMulti = !this.showMulti;
		},
		radioSel(index) {
			this.indexCustom = index;
			this.abc();
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
			if (this.indexCustom == 1) {
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
		addParameter: function(index, type) { //添加参数
			if (type == 1) {
				this.contentSetting += this.parameter[index].id;
			} else {
				this.customActivity += this.customParameter[index].id;
			}
		},
		winEventCoupon(obj) {
			this.showCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.select;
				this.couponList = obj.data.list;
				this.miCount = this.selectCoupon;

				for (let i = 0; i < this.miCount.length; i++) {
					this.$set(this.micsel, i, 0);
					this.$set(this.micselimit, i, 0);
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
			this.$router.push('/admin/activity');
		},
		//关联优惠券弹窗
		async addCustom() {
			let data = await http.getGetCouponCondition({
				data: {
					flag: 0
				}
			});
			let coupons = [];
			for (let item of data) {
				if (item.type != 7) {
					coupons.push(item);
				}
			}
			this.couponList = coupons;
			this.goodsCom = data;
			this.goodsCom.forEach(function(item) {
				item.num = 1;
			});

			this.showCoupon = true;

		},
		//生日活动期限下拉框选择
		showhighList: function() {
			this.highLimit = !this.highLimit;
		},
		//自定义活动保存
		async activitySave(type) {

			// 结束时间计算
			let terminalTime = utils.getTime({
				time: this.btime,
				type: false
			}).end;
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
			if (!this.edit) {
				if (this.indexCustom == 1) {
					let arr = [];
					let obj = {
						couponIds: this.selectCoupon,
						minConsume: '',
						maxConsume: '',
						isLoop: '0',
						memberRights: '1',
						pushChannel: this.customSelect.toString().replace(/,/g, ''), //自定义活动选中的数组
						msgContent: this.customActivity //自定义活动内容设置
					};
					arr.push(obj);
					await http.addActivity({
						data: {
							rule: JSON.stringify(arr),
							type: 1, //活动类别
							mouldType: 0, //长期活动模板
							name: this.customName, //活动名
							explain: this.customExplain, //活动说明
							objectType: this.memberStatus ? this.indexCustom : 4, //活动对象
							memberIds: this.memfilter, //活动关联会员
							memberNum: this.member, //会员人数
							startTime: parseInt(this.atime / 1000), //开始时间
							endTime: terminalTime, //结束时间
							getType: 0, //获得方式
							isAuto: type, //保存 
							shopIds: this.shopList.toString()
						}
					});

					this.$store.commit('setWin', {
						content: type == 1 ? '发布成功' : '保存成功',
						callback: () => {
							this.returnAct();
						}
					});
				}
				if (this.indexCustom == 0) {
					let arr = [];
					let obj = {
						couponIds: this.miCount,
						minConsume: '',
						maxConsume: '',
						isLoop: '0',
						memberRights: '1',
						pushChannel: this.customSelect.toString().replace(/,/g, ''), //自定义活动选中的数组
						msgContent: this.customActivity //自定义活动内容设置
					};
					arr.push(obj);

					await http.addActivity({
						data: {
							type: 1, //活动类别
							mouldType: 0, //长期活动模板
							name: this.customName, //活动名
							explain: this.customExplain, //活动说明
							objectType: this.memberStatus ? this.indexCustom : 4, //活动对象
							memberIds: this.memfilter, //活动关联会员
							memberNum: this.member, //会员人数
							startTime: parseInt(this.atime / 1000), //开始时间
							endTime: terminalTime, //结束时间
							//                                      couponIds: JSON.stringify(this.miCount),  //关联店内优惠券
							getType: 0, //获得方式
							isAuto: type, //保存 
							rule: JSON.stringify(arr),
							shopIds: this.shopList.toString()
						}
					});
					this.$store.commit('setWin', {
						content: type == 1 ? '发布成功' : '保存成功',
						callback: () => {
							this.returnAct();
						}
					});
				}
			} else {
				if (this.indexCustom != 1) {
					this.activityDetail.rule[0].couponIds = this.miCount;
				}
				this.activityDetail.name = this.customName;
				this.activityDetail.explain = this.customExplain;
				this.activityDetail.objectType = this.indexCustom;
				this.activityDetail.startTime = Math.round(this.atime / 1000);
				this.activityDetail.endTime = terminalTime;
				this.activityDetail.rule[0].pushChannel = this.customSelect.toString().replace(/,/g, '');
				this.activityDetail.rule[0].msgContent = this.customActivity; //自定义内容设置
				this.activityDetail.rule = utils.deepCopy(this.activityDetail.rule);
				this.activityDetail.isAuto = type;
				this.activityDetail.memberIds = this.memfilter;//会员条件
				this.activityDetail.memberNum = this.member;//会员数量
				//delete this.activityDetail.rule;
				await http.editActivity({
					data: {
						activityId: this.editId,
						data: JSON.stringify(this.activityDetail)
					}
				});
				this.$store.commit('setWin', {
					content: '保存成功',
					callback: () => {
						this.returnAct();
					}
				});
			}
		},
		cancel() {
			this.returnAct();
		},
		getDays(strDateStart, strDateEnd) {
			let strSeparator = ','; //日期分隔符
			let oDate1;
			let oDate2;
			let iDays;
			oDate1 = strDateStart.split(strSeparator);
			oDate2 = strDateEnd.split(strSeparator);
			let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
			let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
			iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
			return iDays + 1;
		},
		async getActivityDetail(item) {
			// 获取详情
			let data = await http.getActivityDetail({
				data: {
					aid: item.id,
					type: item.type,
					mouldType: item.mouldType
				}
			});

			this.activityDetail = data;
			this.customName = this.activityDetail.name;
			let arr = this.activityDetail.rule[0].couponIds;
			while ((arr + '').length > 3 && typeof this.activityDetail.rule[0].couponIds == 'string') {
				arr = this.activityDetail.rule[0].couponIds = JSON.parse(this.activityDetail.rule[0].couponIds);
			}
			this.customActivity = this.activityDetail.rule[0].msgContent; //自定义内容
			this.customSelect = this.activityDetail.rule[0].pushChannel.length > 1 ? this.activityDetail.rule[0].pushChannel.split(
				'').toString().split(',') : this.activityDetail.rule[0].pushChannel.split(','); //消息推送渠道 
			this.customExplain = this.activityDetail.explain;
			if(this.activityDetail.objectType == '4'){
				this.indexCustom = 1;
				this.memberStatus = false;
			}else{
				this.indexCustom = parseInt(this.activityDetail.objectType);
			}
			if(this.indexCustom == 0){
				this.num = true;
			}else{
				this.num = false;
			}
			this.atime = Math.round(this.activityDetail.startTime * 1000);
			this.btime = Math.round(this.activityDetail.endTime * 1000);
			this.selectCoupon = this.activityDetail.rule[0].couponIds;
			this.miCount = this.activityDetail.rule[0].couponIds;
			this.member = this.activityDetail.sendProgress.split(',')[0];//会员的筛选数量
			this.memfilter = this.activityDetail.memberIds;//会员的筛选条件
			this.btime = utils.getTime({
				type: false,
				time: this.btime
			}).start; //时间归零

			if (this.activityDetail.objectType == '0') {
				this.customIds = this.activityDetail.rule[0].couponIds;
			} else {
				this.customIds1 = this.activityDetail.rule[0].couponIds;
			}
			this.$nextTick(() => {
				setTimeout(() => {
					let list = this.$refs.autoDay;
					let lookDay = this.$refs.lookDay;
					let txtDay = this.$refs.txtDay;
					let look = this.$refs.autoLook;
					let txt = this.$refs.autoTxt;
					for (let i = 0; i < this.miCount.length; i++) {
						if (this.miCount[i].micLimit != '') {
							this.micselimit[i] = 1;
							for (let j = 0; j < list.length; j++) {

								txtDay[i].style.display = 'inline-block';
								lookDay[i].style.display = 'inline';
							}
						} else {
							this.$set(this.micselimit, i, 0);
						}
						if (this.miCount[i].micNum != '') {
							this.micsel[i] = 1;
							txt[i].style.display = 'inline-block';
							look[i].style.display = 'inline';
						} else {
							this.$set(this.micsel, i, 0);
						}
					}

				}, 300);
			});
		}
	},
	beforeCreate() {
		currentShop = storage.session('userShop').currentShop;
	},
	computed: {
		start: {
			get: function() {
				return utils.format(this.atime, 'yyyy-MM-dd');
			}
		},
		end: {
			get: function() {
				return utils.format(this.btime, 'yyyy-MM-dd');
			}
		},
		day: {
			get: function() {
				let startTime = utils.format(this.btime, 'yyyy,MM,dd'); //获取开始时间年月日
				let endTime = utils.format(this.atime, 'yyyy,MM,dd'); //获取结束时间年月日
				return this.getDays(startTime, endTime) + '天';
			}
		},
	},
	components: {
		'canMulti': () =>
			import ( /* webpackChunkName:'can_multi' */ 'src/components/can_multi'),
		'mulSelect': () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		'birthCoupon': () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
		'radioBtn': () =>
			import ( /* webpackChunkName:'radio_btn' */ 'src/components/radio_btn'),
		'memberScreening': () =>
			import ( /* webpackChunkName:'activity_screening' */ './activity_screening'),
		'vip': () =>
			import ( /* webpackChunkName:'activity_custom_vip' */ './activity_custom_vip'),
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
			this.indexCustom = 1; //让其默认选中会员
			this.member = memberIds.length;
			this.memfilter = memberIds.join(',');
			this.memberStatus = false; //从会员管理页面过来的 无法重新筛选会员的标识
		}
		let activityInfo = storage.session('activityInfo'); //获取编辑信息
		if (activityInfo) {
			this.editId = activityInfo.id;
			this.edit = true;
			this.issue = false;
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
.info-title {
	min-width: 600px;
	height: 28px;
	line-height: 28px;
	border-left: 2px solid #28a8e0;
	margin-bottom: 35px;
}

.info-title .title {
	display: inline-block;
	padding-left: 12px;
	font-size: 16px;
}

.info-title .line {
	display: inline-block;
	width: 500px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
	margin-left: 10px;
}

.box {
	margin-bottom: 30px;
}

.content-box {
	min-width: 600px;
	max-width: 1100px;
	height: 40px;
	line-height: 40px;
	margin-bottom: 15px;
}

.content-box .channel {
	display: inline-block;
	width: 102px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	color: #cecdcd;
	border: 1px solid #cecdcd;
	margin-right: 8px;
}

.content-box .channelSelected {
	border-color: #ff9200;
	color: #ff9200;
	background: url(../../res/images/sign.png) right bottom no-repeat;
}

.box .btn-concent {
	padding-bottom: 0;
}

.box input {
	width: 300px;
	height: 35px;
	font-size: 16px;
	padding-left: 8px;
	outline: none;
}

.box label {
	display: block;
}

.box textarea {
	width: 340px;
	height: 140px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}

.box .select-box {
	width: 200px;
	display: inline-block;
	position: relative;
}

.nfo-title {
	min-width: 600px;
	height: 28px;
	line-height: 28px;
	border-left: 2px solid #28a8e0;
	margin-bottom: 35px;
}

.return {
	display: inline-block;
	width: 150px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #e6ab4e;
	border: 1px solid #e6ab4e;
	cursor: pointer;
	margin-right: 50px;
}

.required {
	display: inline-block;
	font-size: 16px;
	margin-right: 17px;
	width: 150px;
	text-align: right;
}

.required:after {
	top: 0;
}

.req {
	display: inline-block;
	font-size: 16px;
	margin-right: 17px;
	width: 150px;
	text-align: right;
}

.req:after {
	top: 0;
}

.statisticsList {
	line-height: 35px;
	font-size: 16px;
	text-align: left;
	position: relative;
}

.statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 10;
	background: #fff;
}

.tableListInp div {
	width: 41px;
	height: 39px;
	position: relative;
	z-index: 5;
}

.limit {
	font-size: 14px;
	color: #999999;
	padding-left: 170px;
	margin-top: 10px;
	height: auto;
	overflow: hidden;
}

.limit .icon-i {
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../res/images/handle-tips.png?0) 20px center no-repeat;
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