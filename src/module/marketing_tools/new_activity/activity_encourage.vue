<template>
	<div class="member-agift" id="consume" v-if='!showVip'>
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<el-input v-model="titles" maxlength="10" placeholder="请输入活动标题"></el-input>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<el-date-picker class="fl" v-model="startObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" @change="getStartTime" value-format="timestamp">
					</el-date-picker>
					<span class="fl lines">-</span>
					<el-date-picker class="fl" v-model="endObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp" @change="getEndTime">
					</el-date-picker>
				</div>
				<span class="fl returnInt">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动范围 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动范围</span>
			<div class="rightHalf" v-if="ischain == '3'">
				<el-button type="primary" icon="el-icon-plus" @click="openActivityWin" style="width:179px;">关联门店</el-button>
				<span v-if="selectsList.length >= 1">(已选择{{selectsList.length}}家店铺)</span>
			</div>
			<div class="rightHalf" v-else>
				<span class="obj">{{shopName}}</span>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<el-checkbox v-model="checkedMember" label="会员" border @change="toSinglemember(checkedMember)"></el-checkbox>
				<el-checkbox v-model="checkedFans" label="粉丝" border @change="toSinglefans(checkedFans)"></el-checkbox>
				<el-tooltip class="item" effect="dark" content="用户在该活动内触发了发券规则，满足一个规则进行一次推送券。若用户同时为公众号粉丝并是会员，只触发一次发券。" placement="right">
					<i class="el-icon-question" style="color:#E1BB4A;font-size: 24px;"></i>
				</el-tooltip>
				<div class="memberinner">
					<span v-if="member > 0">已关联会员:{{member}}人</span>
					<span v-if="member > 0 && fans > 0">|</span>
					<span v-if='fans > 0'>已关联粉丝:{{fans}}人</span>
				</div>
			</div>
		</div>
		<!-- 营销规则设置 -->
		<div class="set-line">
			<div class="titles">营销规则设置</div>
			<div class="line"></div>
		</div>
		<!-- 规则 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<ul>
					<li v-for="(item,index) in ruleList" :key='index' :class="ruleIndex == index ? 'on' : 'initial'" @click="getDetails(index)">
						规则{{index + 1}}
						<i class="deletes" @click.stop="deleteRule(index)"></i>
					</li>
					<li class="adds" @click="addRule" v-if="ruleList.length < 5">新增规则</li>
				</ul>
				<div class="content-set" v-for="(item,ind) in ruleList" :key='ind' v-if='ruleIndex == ind'>
					<!-- 最低消费 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">最低消费</span>
						<div class="rightHalf">
							<el-select v-model="item.durationName" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
								<el-option v-for="item in durationList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<!-- 最低消费 -->
					<div class="online-box clearfix" v-if="item.durationId == '1'">
						<span class="online-sub fl">指定额度</span>
						<div class="rightHalf">
							<el-input placeholder="请输入金额" v-model="item.minConsumess" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue(item,'1')" style="width:179px;">
								<template slot="suffix">元</template>
							</el-input>
						</div>
					</div>
					<!-- 最高消费 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">最高消费</span>
						<div class="rightHalf">
							<el-input placeholder="请输入金额" v-model="item.maxConsumes" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="formatValue(item,'2')" style="width:179px;">
								<template slot="suffix">元</template>
							</el-input>
						</div>
					</div>
					<!-- 循环赠送 -->
					<div class="online-box clearfix">
						<span class="online-sub fl"></span>
						<div class="rightHalf" style="line-height:40px;">
							<div @click="isLoopFun(item)" :class="item.isLoop ? 'active check':'check'"></div>
							<p class="fl" style="font-size: 16px;">循环赠送</p>
							<div class="fl handle-tips">
								<i></i> 满足交易额整数倍，发劵数同倍增加
							</div>
						</div>
					</div>
					<!-- 会员权益 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">会员权益</span>
						<div class="rightHalf">
							<el-select v-model="item.interestName" placeholder="请选择" @change="selinterest" style="color:#c0c4cc;width: 179px;">
								<el-option v-for="item in interestList" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</div>
					</div>
					<!-- 关联优惠券 -->
					<div class="online-box clearfix" v-if="item.interestId == '1'">
						<span class="online-sub fl">关联优惠券</span>
						<div class="rightHalf">
							<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon(item)" style="width:179px;">选择关联优惠券</el-button>
							<span class="coupon_name" v-if="item.couponIds.length >= 1">(已关联:{{getCouponName(item.couponIds)}})</span>
						</div>
					</div>
					<!-- 消息推送渠道 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">消息推送渠道</span>
						<div class="rightHalf">
							<mulSelect class="fl" :styles="{'border-radius':'4px'}" :list='list' @selOn='selOnSend' :selects="item.pushChannel" :name='"name"' :keyName='"id"'></mulSelect>
							<div class="fl handle-tips">
								<i></i> 活动发布后将通过该渠道触发会员
							</div>
						</div>
					</div>
					<!-- 内容设置 -->
					<div class="online-box clearfix">
						<span class="online-sub fl">内容设置</span>
						<div class="rightHalf">
							<textarea placeholder="请输入内容设置" v-model="item.msgContent" maxlength="151"></textarea>
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
		<div class="agift-content" style="padding-left: 60px;">
			<el-button type="info" plain style="margin-right: 10px;width:190px;" @click="closePage">取消</el-button>
			<template v-if='isactivityDetail'>
				<el-button type="info" style="margin-right: 10px;width:190px;" @click="addActivity('0')">保存</el-button>
				<el-button type="primary" style="margin-right: 10px;width:190px;" @click="addActivity('1')" v-if="edit == false">发布</el-button>
			</template>
		</div>
		<rang @winEvent='rangEvent' :activityList='shopList' v-if='showRang' :selectsList="selectsList"></rang>
		<!-- 优惠券弹窗 -->
		<addCoupon v-if='showCoupon' :selectCoupon='selectCoupon' @winEvent='winEvent'></addCoupon>
	</div>
	<!-- 会员筛选 -->
	<memberScreening v-else @selectVip='selectVipEvent'></memberScreening>
</template>
<script type="text/javascript">
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';

export default {
	data() {
		return {
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start
			},
			endObj: {
				time: utils.getTime({
					time: new Date()
				}).end
			},
			dates: new Date().getTime(), //当前时间
			returnInt: 1, //相差天数
			list: [{
				name: '微信',
				id: '1'
			}],
			selects: [],
			msmStatus: false,
			interestList: [{ //会员权益
				name: '无',
				id: 0
			},
			{
				name: '电子优惠券',
				id: 1
			}
			],
			interestName: '无',
			interestId: 0,
			durationList: [{ //活动期限
				name: '不设限制',
				id: 0
			},
			{
				name: '指定额度',
				id: 1
			}
			],
			durationId: 0,
			durationName: '不设限制', //状态
			isList: false,
			isConsumeList: false,
			onListName: '无',
			activityList: [], //选择活动范围列表
			shopList: [],
			couponLists: [], //已选择优惠劵
			memberRights: -1,
			minConsume: -1,
			isLoops: false,
			Loops: '',
			ruleList: [{
				durationName: '不设限制', //最低消费
				durationId: 0,
				minConsumess: '', //最低消费的金额
				maxConsumes: '', //最高消费的金额
				isLoop: false, //是否循环
				interestName: '无', //会员权益
				interestId: 0,
				couponIds: [], //优惠券
				pushChannel: [], //消息推送渠道
				msgContent: '' //内容设置
			}],
			ischain: 0, //3为品牌 0为单店
			title: '', //标题
			maxConsume: '', //最高消费
			minConsumes: '', //最低消费
			ruleObj: {
				minConsume: '',
				maxConsume: '',
				isLoop: false,
				memberRights: '',
				couponIds: [],
				pushChannel: [],
				msgContent: ''
			}, //规则对象
			ruleLists: [],
			compareArr: [], //用于比较优惠劵数组
			shopName: '',
			edit: false,
			activityDetail: {},
			explain: '', //内容设置
			parameter: [{
				name: '【会员姓名】',
				id: '{memberName}'
			},
			{
				name: '【优惠券名称】',
				id: '{couponName}'
			},
			{
				name: '【优惠券数量】',
				id: '{couponNum}'
			},
			{
				name: '【活动名称】',
				id: '{activityName}'
			},
			{
				name: '【消费日期】',
				id: '{salesTime}'
			}
			],
			showRang: false,
			showCoupon: false,
			selectsList: [],
			integralList: [{
				name: '默认全部'
			},
			{
				name: '会员筛选'
			}
			],
			integralOn: 0, //活动对象的选择
			indexCustom: 0, //活动对象选中的
			showVip: false, //打开高级筛选	
			member: '0', //筛选出来的人数
			fans: '0', //粉丝的人数
			memfilter: '', //筛选的条件
			memberStatus: true,
			isactivityDetail: true,
			ruleIndex: 0, //点中的第几个  
			selectCoupon: [], //选中的优惠券
			checkedMember: false, //会员选中的
			checkedFans: false, //粉丝选中的
			shopId: '' //单店的shopId
		};
	},
	methods: {
		selOnSend(arr) {
			this.ruleList[this.ruleIndex].pushChannel = arr;
		},
		getStartTime(str) {
			this.startObj.time = str;
		},
		getEndTime(str) {
			this.endObj.time = str;
		},
		valiData: function(content, title, winType) { //弹窗提示格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		selexpirationTime: function(i) { //最低消费
			//点击对应的名字
			this.ruleList[this.ruleIndex].durationId = i; //点击对应的id
			if (this.ruleList[this.ruleIndex].durationId == 0) {
				this.ruleList[this.ruleIndex].isLoop = false;
			}
			//console.log(this.ruleList[this.ruleIndex].durationId);
		},
		selinterest: function(i) { //会员权益
			//this.ruleList[showIndex].interestName = this.interestList[i].name; //点击对应的名字
			this.ruleList[this.ruleIndex].interestId = i; //点击对应的id
		},
		openActivityWin() {
			//设置活动范围
			this.showRang = true;
		},
		rangEvent(obj) {
			if (obj.status == 'ok') {
				this.selectsList = obj.select;
				//console.log(JSON.stringify(this.selectsList))
			}
			this.showRang = false;
		},
		winEvent(obj) { //选择优惠券弹窗回掉
			this.showCoupon = false;
			if (obj.status == 'ok') {
				this.ruleList[this.ruleIndex].couponIds = obj.data.select;
			}
		},
		addCoupon: function(item) { //添加优惠券
			this.selectCoupon = item.couponIds;
			this.showCoupon = true;
		},
		timeChange: function() {
			//相差天数计算
			this.returnInt = Math.ceil(
				(new Date(this.endObj.time).getTime() -
					new Date(this.startObj.time).getTime()) /
				(1000 * 60 * 60 * 24)
			);
		},
		addParameter: function(index) {
			//添加参数
			this.ruleList[this.ruleIndex].msgContent += this.parameter[index].id;

		},
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity/generalActivity');
		},
		isLoopFun: function(item) {
			// 是否循环
			if (item.durationId == 1) {
				item.isLoop = !item.isLoop;
			} else {
				this.valiData('请选择并填写最低消费金额');
			}
		},
		formatValue: function(item, type) {
			switch (type) {
				case '1':
					item.minConsumess = utils.toFloatStr(item.minConsumess, 2);
					break;
				case '2':
					item.maxConsumes = utils.toFloatStr(item.maxConsumes, 2);
					break;
			}
		},
		addRule: function() { //新增规则
			let obj = {
				durationName: '不设限制', //最低消费
				durationId: 0,
				minConsumess: '', //最低消费的金额
				maxConsumes: '', //最高消费的金额
				isLoop: false, //是否循环
				interestName: '无', //会员权益
				interestId: 0,
				couponIds: [], //优惠券
				pushChannel: [], //消息推送渠道
				msgContent: '' //内容设置
			};
			this.ruleList.push(obj);
		},
		deleteRule: function(index) {
			// 删除规则
			if (this.ruleIndex >= index) {
				this.ruleIndex = 0;
			}
			this.ruleList.splice(index, 1);
		},
		getDetails: function(index) {
			// 获取规则详情
			this.ruleIndex = index;
		},
		checkForm: function() { //验证表单
			if (this.title == '') {
				this.valiData('请填写活动标题');
				return false;
			}
			if (this.endObj.time < new Date().getTime()) {
				this.valiData('活动结束时间应大于当前时间');
				return false;
			}
			if (this.ischain == '3' && this.selectsList.length == 0) {
				this.valiData('请选择活动范围');
				return false;
			}
			if (!this.checkedMember && !this.checkedFans) {
				this.valiData('请关联活动对象!');
				return false;
			}
			for (let i = 0; i < this.ruleList.length; i++) {
				if (this.ruleList[i].durationId == 1 && this.ruleList[i].minConsumess == '') {
					this.valiData(`规则${i+1}请填写最低消费金额`);
					return false;
				}
				if (this.ruleList[i].durationId == 1 && this.ruleList[i].maxConsumes == '') {
					this.valiData(`规则${i+1}请填写最高消费金额`);
					return false;
				}
				if (this.ruleList[i].durationId == 1 && Number(this.ruleList[i].minConsumess) > Number(this.ruleList[i].maxConsumes)) {
					this.valiData(`规则${i+1}最低消费金额不能大于最高消费金额`);
					return false;
				}
				if (this.ruleList[i].interestId == 1 && this.ruleList[i].couponIds.length == 0) {
					this.valiData(`规则${i+1}请关联优惠券`);
					return false;
				}
			}
			return true;
		},
		async addActivity(type) {
			if (!this.checkForm()) return;
			let rule = [];
			for (let item of this.ruleList) { //整合数据
				let obj = {
					minConsume: item.minConsumess, //最低消费
					maxConsume: item.maxConsumes, //最高消费
					isLoop: Number(item.isLoop), //循环赠送
					memberRights: item.interestId,
					couponIds: item.interestId == 1 ? item.couponIds : [], //优惠券
					pushChannel: item.pushChannel.join(','), //规则
					msgContent: item.msgContent //内容设置
				};
				if (item.id && item.id != '') {
					obj.id = item.id;
				}
				rule.push(obj);
			}
			if (this.edit) {
				this.activityDetail.name = this.title; //标题
				this.activityDetail.explain = this.explain; //规则
				this.activityDetail.shopIds = this.ischain == '3' ? this.selectsList.join(',') : this.shopId; //选择活动范围
				this.activityDetail.startTime = Math.round(this.startObj.time / 1000); //开始时间 
				this.activityDetail.endTime = Math.round(this.endObj.time / 1000); //结束时间
				this.activityDetail.isAuto = type;
				this.activityDetail.rule = rule;
				this.activityDetail.selectFans = Number(this.checkedFans); //选择粉丝
				this.activityDetail.memberIds = this.memfilter;
				await http.fissionActivity({
					data: {
						activityId: this.activityDetail.id,
						data: JSON.stringify(this.activityDetail)
					}
				});
			} else {
				await http.fissionActivity({
					data: {
						shopIds: this.ischain == '3' ? this.selectsList.toString() : this.shopId,
						type: 3,
						name: this.title,
						mouldType: 0,
						objectType: this.memberStatus ? 4 : 1, //活动对象
						memberIds: this.memfilter, //活动关联会员
						memberNum: this.member, //会员人数
						selectFans: Number(this.checkedFans), //粉丝的数量
						startTime: Math.round(this.startObj.time / 1000),
						endTime: Math.round(this.endObj.time / 1000),
						isAuto: type,
						getType: '0',
						explain: this.explain, //活动说明
						rule: JSON.stringify(rule)
					}
				});
			}
			let message = (type == '0') ? '保存成功' : '发布成功';
			this.valiData(message);
			this.closePage();
		},
		async getNoLimitCoupon() {
			// 获取优惠劵

			let data = await http.getCouponCondition({
				data: {}
			});
			this.compareArr = utils.deepCopy(data);
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
			let activityDetail = data;
			this.activityDetail = utils.deepCopy(activityDetail);
			this.title = activityDetail.name; //标题名称
			this.explain = activityDetail.explain; //活动说明
			this.selectsList = activityDetail.shopIds.split(','); //活动范围
			this.startObj.time = Number(
				Math.round(activityDetail.startTime * 1000)
			); //开始时间
			this.endObj.time = Number(Math.round(activityDetail.endTime * 1000)); //结束时间
			this.ruleList = [];
			let rule = activityDetail.rule; //规则设置
			for (let item of rule) {
				let durationName = '';
				let interestName = '';
				let durationId = 0;
				if (item.minConsume == '0') {
					durationName = '不设限制';
					durationId = 0;
				} else if (item.minConsume != '' && item.minConsume != 0) {
					durationName = '指定额度';
					durationId = 1;
				}
				let couponIds = JSON.parse(item.couponIds);
				if (couponIds.length == 0) {
					interestName = '无';
					// interestId = 0;
				} else {
					interestName = '电子优惠券';
					// interestId = 1;
				}
				//console.log(item.pushChannel)
				let obj = {
					id: item.id,
					durationName: durationName, //最低消费
					durationId: durationId,
					minConsumess: item.minConsume, //最低消费的金额
					maxConsumes: item.maxConsume, //最高消费的金额
					isLoop: Boolean(Number(item.isLoop)), //是否循环
					interestName: interestName, //会员权益
					interestId: item.memberRights,
					couponIds: couponIds, //优惠券
					pushChannel: item.pushChannel == '0' ? [] : item.pushChannel.split(','), //消息推送渠道
					msgContent: item.msgContent //内容设置
				};
				this.ruleList.push(obj);
			}
			this.memfilter = activityDetail.memberIds; //筛选条件
			this.member = activityDetail.sendProgress.split(',')[0]; //会员人数
			if (this.member && Number(this.member) > 0) {
				this.checkedMember = true;
			}
			if (activityDetail.selectFans && activityDetail.selectFans == 1) { //筛选的粉丝的数量
				this.getSubscribeFansCount();
				this.checkedFans = true;
			}
			this.edit = true;
		},
		async getShopList() {
			let data = await http.couGetShopList({
				data: {}
			});
			this.shopList = data;
		},
		chooseIntegral: function(index) { //选择活动对象
			this.integralOn = index;
			if (this.integralOn == '1') {
				if (this.memberStatus) {
					this.addVip();
				}
			}
		},
		addVip() { //打开高级筛选
			this.showVip = true;
		},
		selectVipEvent(obj) {
			if (obj.status == 'ok') {
				this.member = obj.member;
				this.memfilter = obj.memfilter;
				if (this.member == '0' && utils.isEmptyObject(this.memfilter)) {
					this.checkedMember = false;
				}
			}
			this.$store.commit('setPageTools', [{
				name: '<返回活动列表',
				className: ['activity'],
				fn: () => {
					this.closePage();
				}
			}]);
			//console.log('11111');
			this.showVip = false;
		},
		async getSubscribeFansCount() {
			let data = await http.getSubscribeFansCount({});
			if (data) {
				this.fans = data;
			}
		},
		toSinglemember: function(item) {
			if (item) {
				//if (this.memberStatus) {
				this.addVip();
				//}
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
	computed: {
		titles: {
			get: function() {
				return this.title;
			},
			set: function(newValue) {
				this.title = newValue;
			}
		}
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		'ruleObj.msgContent': function() {
			if (this.ruleObj.msgContent.length >= 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.ruleObj.msgContent = this.ruleObj.msgContent.substr(0, 150);
			}
		},
		explain: function() {
			if (this.explain.length >= 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.explain = this.explain.substr(0, 150);
			}
		},
		'selectCoupon': {
			deep: true,
			handler: function() {
				this.getCouponName(this.ruleList[this.ruleIndex].couponIds);
			}
		}
	},
	components: {
		calendar: () =>
			import( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		mulSelect: () =>
			import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		rang: () =>
			import( /* webpackChunkName:'activity_agift_rang' */ './activity_agift_rang'),
		'addCoupon': () =>
			import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
		'memberScreening': () =>
			import( /* webpackChunkName:'activity_screening' */ './activity_screening'),
		'singleSelect': () =>
			import( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		selectBtn: () =>
			import( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回活动列表',
			className: 'el-btn-blue',
			fn: () => {
				this.closePage();
			}
		}]);
		this.userData = storage.session('userShop');
		this.ischain = this.userData.currentShop.ischain;
		this.shopName = this.userData.currentShop.name;
		this.shopId = this.userData.currentShop.id;
		this.getShopList();
		let memberIds = storage.session('memberIds'); //获取是否有会员信息
		if (memberIds) {
			this.checkedMember = true; //让其默认选中会员
			this.member = memberIds.length;
			this.memfilter = memberIds.join(',');
			this.memberStatus = false; //会员标识
		}
		let activityInfo = storage.session('activityInfo');
		// let activityDetail = storage.session('activityDetail');
		// if (activityDetail) {
		// 	this.isactivityDetail = false;
		// }
		if (activityInfo) { //判断是新增还是编辑
			if (activityInfo.isShowdetail) {
				//是否是查看活动详情
				this.isactivityDetail = false;
			}
			this.getActivityDetail(activityInfo);
		}
		this.getShopList();
	},
	beforeDestroy() {
		storage.session('activityInfo', null);
		storage.session('memberIds', null);
		storage.session('activityDetail', null);
	}
};
</script>
<style type="text/css" scoped>
.member-agift {
	max-width: 1400px;
	height: auto;
}

.member-agift .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

.member-agift .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

.member-agift .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

.member-agift .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

.member-agift .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

.member-agift .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
	line-height: 40px;
}



/*活动名称的输入框*/
.member-agift .online-box .rightHalf .coupon_name{
	float: left;
	display: block;
	width: 250px;
	height: 40px;
	line-height: 40px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.member-agift .online-box .rightHalf .name {
	width: 280px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

.member-agift .online-box .rightHalf .obj {
	display: inline-block;
	width: 200px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
}

.member-agift .online-box .rightHalf textarea {
	width: 340px;
	height: 100px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}

.member-agift .online-box .rightHalf .limit {
	font-size: 14px;
	color: #999999;
	height: auto;
	overflow: hidden;
}

.member-agift .online-box .rightHalf .check {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 11px 8px;
	float: left;
}

.member-agift .online-box .rightHalf .memberinner {
	height: 40px;
	line-height: 40px;
	font-size: 16px;
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

.active {
	background: url(../../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}

.member-agift .online-box .rightHalf .lines {
	width: 40px;
	text-align: center;
	margin-right: 0;
	line-height: 40px;
}

.member-agift .online-box .rightHalf .returnInt {
	text-align: left;
	text-indent: 20px;
	color: #A3A3A3;
	line-height: 40px;
}

.member-agift .online-box .rightHalf .associated {
	line-height: 40px;
}

.member-agift .online-box .rightHalf ul li {
	display: inline-block;
	width: 100px;
	height: 40px;
	line-height: 40px;
	background-color: #f2f2f2;
	color: #333333;
	margin-right: 5px;
	text-align: center;
	position: relative;
}

.member-agift .online-box .rightHalf ul li.on {
	color: #ffffff;
	background-color: #b3b3b3;
}

.member-agift .online-box .rightHalf ul li.initial:hover i.deletes {
	position: absolute;
	right: -12px;
	top: -12px;
	background: url(../../../res/images/delete.png) center center no-repeat;
	height: 30px;
	width: 30px;
	cursor: pointer;
}

.member-agift .online-box .rightHalf ul li.adds {
	cursor: pointer;
	text-indent: 25px;
}

.member-agift .online-box .rightHalf ul li.adds:after,
.member-agift .online-box .rightHalf ul li.adds:before {
	content: "";
	position: absolute;
	left: 8px;
	top: 50%;
	margin-top: -3px;
	background-color: #666666;
}

.member-agift .online-box .rightHalf ul li.adds:after {
	width: 20px;
	height: 3px;
}

.member-agift .online-box .rightHalf ul li.adds:before {
	height: 20px;
	width: 3px;
	left: 17px;
	margin-top: -11px;
}

/* .member-agift .online-box .rightHalf section {
	width: 190px;
	height: 38px;
	border: 1px solid #CECDCD;
	float: left;
}

.member-agift .online-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

.member-agift .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 38px;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}
*/


























/*.member-agift,
.main_Box {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.main_Box {
	margin: 20px 0;
	position: relative;
}
*/


/*.header_tit {
	border-left: 2px solid #19749c;
	height: 40px;
	line-height: 40px;
	text-indent: 10px;
	font-size: 16px;
	position: relative;
}

.header_tit:after {
	content: "";
	position: absolute;
	left: 0;
	bottom: 50%;
	width: 500px;
	height: 1px;
	background-color: #CCCCCC;
	border-bottom: 2px dashed #cccccc;
}

.header_tit span {
	display: block;
	background-color: #ffffff;
	height: 40px;
	line-height: 40px;
	width: 150px;
	z-index: 2;
	position: absolute;
	left: 0;
}
*/

.agift-content {
	width: 100%;
	height: auto;
	margin-bottom: 20px;
	overflow: hidden;
}



























/*.agift-content span {
	display: inline-block;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: right;
	margin-right: 20px;
}

.agift-content input {
	width: 300px;
	padding: 0;
	height: 38px;
	padding-left: 10px;
}

.agift-content input:focus,
.agift-content textarea:focus {
	outline: none;
}

.agift-content ul li {
	display: inline-block;
	width: 100px;
	height: 40px;
	line-height: 40px;
	background-color: #f2f2f2;
	color: #333333;
	margin-right: 5px;
	text-align: center;
	position: relative;
}

.agift-content ul li.on {
	color: #ffffff;
	background-color: #b3b3b3;
}

.agift-content ul li.initial:hover i.deletes {
	position: absolute;
	right: -12px;
	top: -12px;
	background: url(../../../res/images/delete.png) center center no-repeat;
	height: 30px;
	width: 30px;
	cursor: pointer;
}

.agift-content ul li.adds {
	cursor: pointer;
	text-indent: 25px;
}

.agift-content ul li.adds:after,
.agift-content ul li.adds:before {
	content: "";
	position: absolute;
	left: 8px;
	top: 50%;
	margin-top: -3px;
	background-color: #666666;
}

.agift-content ul li.adds:after {
	width: 20px;
	height: 3px;
}

.agift-content ul li.adds:before {
	height: 20px;
	width: 3px;
	left: 17px;
	margin-top: -11px;
	}*/

.content-set {
	border: 1px solid #cccccc;
	width: 650px;
	height: auto;
	overflow: hidden;
	padding-top: 29px;
}






















/*.moreBtn {
	width: 50px !important;
	position: relative;
	margin-right: 0 !important;
	border-left: 1px solid #cccccc;
	height: 40px;
}

.moreBtn i {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: block;
	width: 10px;
	height: 10px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}*/


/*input:focus {
	border-color: #ccc !important;
	box-shadow: none !important;
}
*/


/*#mycalendar1,
#mycalendar2 {
	height: 40px !important;
	border: none;
}*/

.tips {
	background: url(../../../res/images/handle-tips.png) left center no-repeat;
}



























/*.selectList {
	border: 1px solid #cccccc;
	width: 150px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	position: relative;
}

.selectList ul {
	position: absolute;
	left: -1px;
	top: 38px;
	z-index: 55;
}*/


/*.selectList ul li {
	width: 200px;
	text-align: center;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-bottom: none;
}

.selectList ul li:last-child {
	border-bottom: 1px solid #cccccc;
}

input:focus {
	border-color: #ccc !important;
	box-shadow: none !important;
}
*/


/*#agift .selectbtns {
	width: auto;
	float: left;
}

.selectbtns span {
	height: 40px;
	line-height: 40px;
	width: auto;
	text-align: center;
}
*/

label {
	font-size: 16px;
	cursor: pointer;
}

label i {
	font-size: 16px;
	font-style: normal;
	display: inline-block;
	width: 17px;
	height: 17px;
	text-align: center;
	line-height: 12px;
	color: #fff;
	vertical-align: middle;
	margin-right: 10px;
	border: #2489c5 1px solid;
}


























/*
input[type="checkbox"],
input[type="radio"] {
	display: none;
}

input[type="radio"]+i {
	border-radius: 7px;
}

input[type="checkbox"]:checked+i,
input[type="radio"]:checked+i {
	background: #2489c5;
}

input[type="checkbox"]:disabled+i,
input[type="radio"]:disabled+i {
	border-color: #ccc;
}

input[type="checkbox"]:checked:disabled+i,
input[type="radio"]:checked:disabled+i {
	background: #ccc;
}

.selectList {
	border: 1px solid #cccccc;
	width: 150px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	position: relative;
}

.selectList ul {
	position: absolute;
	left: -1px;
	top: 38px;
}

.selectList ul li {
	width: 200px;
	height: 41px;
	text-align: center;
	background-color: #ffffff;
	border: 1px solid #cccccc;
	border-bottom: none;
}

.selectList ul li:last-child {
	border-bottom: 1px solid #cccccc;
}

.sel {
	display: inline-block;
	width: 120px;
	height: 40px;
	font-size: 16px;
	background: #f2f2f2;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-right: 10px;
}

.on {
	background: #28a8e0;
	color: #fff;
}*/

.chckOn {
	background: #2489c5;
}

























/*.countList {
	width: 100%;
}

.countList span {
	width: 90%;
	height: 45px;
	margin-right: 30px;
	margin-top: 10px;
	line-height: 45px;
	position: relative;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.countList span:before {
	content: "";
	width: 0;
	height: 0;
	border: 8px solid #fff;
	border-radius: 8px;
	position: absolute;
	bottom: 15px;
	left: -10px;
}

.countList span:after {
	content: "";
	width: 0;
	height: 0;
	border: 8px solid #fff;
	border-radius: 8px;
	position: absolute;
	bottom: 15px;
	right: -10px;
}
*/


/*.agift-content textarea {
	width: 340px;
	height: 140px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}*/


/*.limit {
	font-size: 14px;
	color: #999999;
	padding-left: 120px;
	margin-top: 10px;
	height: auto;
	overflow: hidden;
}

.limit .icon-i {
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}*/


/*.required-none:after {
	display: none;
}
*/
</style>