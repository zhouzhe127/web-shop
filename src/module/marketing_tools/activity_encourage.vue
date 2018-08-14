<template>
	<section v-if='!showVip'>
		<div class="member-agift" id="consume">
			<div class="header_tit">
				<span>活动设置</span>
			</div>
			<div class="main_Box" style="overflow: initial;">
				<div class="agift-content">
					<span class="fl required">活动标题</span>
					<input type="text" class="fl" placeholder="请输入活动标题" maxlength="20" v-model="titles" />
				</div>
				<div class="agift-content clearfix" style="overflow:visible;">
					<span class="fl required">活动时间</span>
					<div class="fl" style="cursor: pointer;">
						<calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
						<span class="fl" style="width: 40px;text-align: center;margin-right: 0;">-</span>
						<calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
					</div>
					<span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
				</div>
				<div class="agift-content">
					<span class="fl required">活动范围</span>
					<template v-if="brandId == '3'">
						<div class="btn-concent" @click="openActivityWin">
							<button class="fl increase" style="width: 120px;">选择范围</button>
						</div>
						<span class="fl" v-if="selectsList.length >= 1">已选择{{selectsList.length}}家店铺</span>
					</template>
					<template v-else>
						<span style="width: auto;">{{shopName}}</span>
					</template>
				</div>
				<div class="agift-content">
					<span class="fl">活动群体</span>
					<span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in integralList" :key="index" v-bind:class="{'presentActive':integralOn == index }" @click="chooseIntegral(index)">{{item.name}}</span>
					<span class="associated" v-if="integralOn == 1">(已关联{{member}}人)</span>
				</div>
			</div>
			<div class="header_tit">
				<span>营销规则设置</span>
			</div>
			<div class="mani_Box">
				<div class="agift-content" style="padding-left: 120px;overflow: inherit;">
					<ul>
						<li v-for="(item,index) in ruleList" :key='index' :class="ruleIndex == index ? 'on' : 'initial'" @click="getDetails(index)">
							{{item.name}}
							<i class="deletes" @click="deleteRule(index)"></i>
						</li>
						<li class="adds" @click="addRule" v-if="ruleList.length < 5">新增规则</li>
					</ul>
					<div class="content-set">
						<div class="agift-content" style="overflow: initial;height: 40px;margin-top: 20px;">
							<span class="fl">最低消费</span>
							<div class="fl selectList" @click="openSelect('1')">
								{{consumeName}}
								<ul v-if="isConsumeList">
									<li v-for="(item,index) in consumeList" :key='index' @click="getListDetail(item,index,'1')">{{item.name}}</li>
								</ul>
							</div>
							<span class="fl moreBtn" style="border: 1px solid #CCCCCC;border-left: none;cursor: pointer;" @click="openSelect('1')">
							<i></i>
						</span>
							<template v-if="minConsume == 1">
								<input type="text" class="fl" placeholder="请输入金额" maxlength="6" style="width: 100px;margin-left: 10px;" v-model="minConsumess" />
							</template>
						</div>
						<div class="agift-content">
							<span class="fl">最高消费</span>
							<input type="text" placeholder="请输入金额" style="width: 138px;height:40px" maxlength="6" v-model="maxConsumes" class="fl" />
							<span class="fl moreBtn" style="border: 1px solid #CCCCCC;border-left: none;cursor: pointer;text-align: center;color: #999999;">元</span>
						</div>
						<div class="agift-content">
							<span class="fl"></span>
							<label class="fl">
								<i @click="isLoopFun" :class="ruleObj.isLoop ? 'chckOn' : ''">✓</i>
							</label>
							<p class="fl" style="font-size: 16px;margin-right: 10px;">循环赠送</p>
							<p class="fl" style="color: #999999;margin-top: 2px;">(满足交易额整数倍，发劵数同倍增加)</p>
						</div>
						<div class="agift-content" style="overflow: initial;height: 40px;">
							<span class="fl">会员权益</span>
							<div class="fl selectList" @click="openSelect">
								{{onListName}}
								<ul v-if="isList">
									<li v-for="(item,index) in lists" :key='index' @click="getListDetail(item,index)">{{item.name}}</li>
								</ul>
							</div>
							<span class="fl moreBtn" @click="openSelect" style="border: 1px solid #CCCCCC;border-left: none;cursor: pointer;">
							<i></i>
						</span>
						</div>
						<div class="agift-content" v-if="memberRights == 0">
							<span class="fl"></span>
							<div class="btn-concent" @click="openCouponWin">
								<button class="fl increase" style="width: 150px;">选择优惠劵</button>
							</div>
							<span class="fl" v-if="ruleObj.couponIds.length >= 1">已选择{{ruleObj.couponIds.length}}张</span>
						</div>
						<div class="agift-content" id="agift">
							<span class="fl">消息推送渠道</span>
							<mulSelect :styles="{backgroundColor:'rgb(247,247,247)'}" :list='list' @selOn='selOnSend' :selects="ruleObj.pushChannel" :name='"name"' :keyName='"id"'></mulSelect>
							<span class="fl" style="width: auto;color: #666666;">活动发布后将通过该渠道触发会员</span>
						</div>
						<!-- 内容设置 -->
						<div class="agift-content">
							<label>
								<span class="required required-none" style="vertical-align: top;padding-top: 10px;">内容设置</span>
								<textarea placeholder="内容设置" style="width: 350px;height: 100px;" v-model="ruleObj.msgContent" maxlength="151"></textarea>
							</label>
							<div class="limit">
								<p class="fl" style="margin-right: 102px;">
									<img class="icon-i" src="../../res/images/handle-tips.png" />限150字以内</p>
								<p class="fl" v-if="msmStatus">您已输入{{ruleObj.msgContent.length}}个字,目前发送{{Math.ceil(ruleObj.msgContent.length / 60)}}条短信</p>
							</div>
							<div class="limit">
								<p>引用参数:
									<a style="color:#FF9200;" v-for="(item,index) in parameter" :key='index' @click="addParameter(index,1)">{{item.name}}</a>
								</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 活动说明 -->
				<div class="agift-content">
					<label>
						<span class="required required-none" style="vertical-align: top;padding-top: 10px;">活动说明</span>
						<textarea placeholder="请输入活动说明" style="width: 350px;height: 100px;" v-model="explain" maxlength="151"></textarea>
					</label>
					<p class="limit">
						<img class="icon-i" src="../../res/images/handle-tips.png" />限150字以内</p>
				</div>
				<div class="agift-content" style="padding-left: 60px;">
					<a href="javascript:void(0);" class="gray" style="width: 200px;" @click="closePage">取消</a>
					<a href="javascript:void(0);" class="gray" style="width: 200px;background: #858585;" @click="addActivity('0')" v-if="brandId == '3' || brandId == '0'">保存</a>
					<a href="javascript:void(0);" class="yellow" style="width: 200px;" @click="addActivity('1')" v-if="edit == false">发布</a>
				</div>
			</div>
			<rang @winEvent='rangEvent' :activityList='shopList' v-if='showRang' :selectsList="selectsList" @select="selectList"></rang>
			<coupon @winEvent='couponEvent' :selectCoupon='ruleObj.couponIds' v-if='showCoupon'></coupon>
		</div>
	</section>
	<!-- 会员筛选 -->
	<memberScreening v-else @selectVip='selectVipEvent'></memberScreening>
</template>
<script>
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';

// 限制输入数字
let intReg = /[^\d]/g;

// 验证中文
// let Chinese = /[^\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;

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
			list: [{
				name: '微信',
				id: '1'
			},
			// {
			// 	name: '短信',
			// 	id: '2'
			// }
			],
			selects: [],
			msmStatus: false,
			lists: [{
				name: '电子优惠劵',
				id: '1'
			},
			{
				name: '无',
				id: '2'
			}
			],
			consumeList: [{
				name: '不设限制'
			},
			{
				name: '指定额度'
			}
			],
			consumeName: '不设限制',
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
				name: '规则1'
			}],
			brandId: 0, //3为品牌 0为单店
			ruleIndex: 0,
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
			showVip: false, //打开高级筛选	
			member: '0', //筛选出来的人数
			memfilter: '', //筛选的条件
			memberStatus: true
		};
	},
	methods: {
		selectList(arr) {
			this.selectsList = arr;
		},
		selOnSend(arr) {
			this.ruleObj.pushChannel = arr;
		},
		getStartTime(str) {
			this.startObj.time = str;
		},
		getEndTime(str) {
			this.endObj.time = str;
		},
		openActivityWin() {
			//设置活动范围
			this.showRang = true;
		},
		rangEvent(obj) {
			this.showRang = false;
			if (obj.selects) {
				this.activityList = utils.unique(obj.selects);
			}
		},
		couponEvent(obj) {
			this.showCoupon = false;
			if (obj.data.select && obj.status == 'ok') {
				this.ruleObj.couponIds = obj.data.select;
			}
		},
		openCouponWin: function() {
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
			this.ruleObj.msgContent += this.parameter[index].id;
		},
		openSelect: function(type) {
			// 打开list列表
			if (type == '1') {
				this.isConsumeList = !this.isConsumeList;
				this.isList = false;
			} else {
				this.isList = !this.isList;
				this.isConsumeList = false;
			}
		},
		getListDetail: function(item, index, type) {
			// 获取设置list详情
			if (type == '1') {
				this.minConsume = index;
				this.minConsumes = this.minConsume == 1 ? this.minConsumes : '';
				this.ruleObj.minConsume = this.minConsumes;
				this.ruleLists[this.ruleIndex] = this.ruleObj;
				this.isLoops = Number(this.Loops);
				this.consumeName = item.name;

				if (this.minConsume != 1) {
					this.Loops = false;
					this.ruleObj.isLoop = this.Loops;
				}
			} else {
				this.onListName = item.name;
				this.memberRights = index;//选中的会员
				this.ruleObj.couponIds =
					this.memberRights == 1 ? [] : this.ruleObj.couponIds;
				if (this.ruleLists.length >= 1) {
					this.ruleLists[this.ruleIndex].memberRights = Number(!(this.memberRights));
				}
			}
		},
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity');
		},
		isLoopFun: function() {
			// 是否循环
			if (this.minConsume == 1) {
				//            this.Loops = !this.Loops;
				//            this.isLoops = Number(this.Loops);
				this.ruleObj.isLoop = !this.ruleObj.isLoop;
			} else {
				this.$store.commit('setWin', {
					content: '请输入最低消费金额',
					timerPowerOff: 3000
				});
			}
		},
		getCouponList: function(arr1, arr2) {
			// 获取保存优惠劵数据
			let arr = [];
			for (let i = 0; i < arr1.length; i++) {
				for (let j = 0; j < arr2.length; j++) {
					if (arr1[i] == arr2[j].id) {
						arr.push({
							id: arr2[j].id,
							name: arr2[j].name,
							micNum: '',
							micLimit: ''
						});
					}
				}
			}
			return arr;
		},
		addRule: function() {
			// 新增规则
			if (this.minConsume == '1' && this.ruleObj.minConsume < 1) {
				this.$store.commit('setWin', {
					content: '请输入最低消费金额',
					timerPowerOff: 1000
				});
				return false;
			}
			if (
				this.memberRights == '0' &&
				utils.isEmptyObject(this.ruleObj.couponIds)
			) {
				this.$store.commit('setWin', {
					content: '请选择优惠劵',
					timerPowerOff: 1000
				});
				return false;
			}

			if (this.ruleList.length == 5) {
				this.$store.commit('setWin', {
					content: '最多只能添加5条规则',
					timerPowerOff: 1000
				});
				return false;
			}

			// 监听最低消费 and 最高消费
			if (
				Number(this.maxConsume) >= 1 &&
				this.minConsumes > Number(this.maxConsume)
			) {
				this.$store.commit('setWin', {
					content: '最低消费不能大于最高消费',
					timerPowerOff: 1000
				});
				this.minConsumes = 0;
				this.ruleObj.minConsume = this.minConsumes;
				return false;
			}
			if (
				Number(this.maxConsume) >= 1 &&
				Number(this.maxConsume) < Number(this.minConsumes)
			) {
				this.$store.commit('setWin', {
					content: '最高消费不能小于最低消费',
					timerPowerOff: 1000
				});
				this.maxConsume = 0;
				this.ruleObj.maxConsume = this.maxConsume;
				return false;
			}

			this.ruleObj.memberRights = Number(!(this.memberRights));
			if (this.ruleIndex == 0 && this.ruleLists.length == 0) {
				this.ruleLists.push(this.ruleObj);
			}

			this.ruleList.push({
				name: '规则' + (this.ruleList.length + 1)
			});

			//          // 重置
			this.minConsume = 0;
			this.memberRights = 0;
			this.minConsumes = '';
			this.maxConsume = '';
			this.onListName = '电子优惠券';
			//this.explain = ''; //活动说明

			this.ruleObj = {
				minConsume: '',
				maxConsume: '',
				isLoop: false,
				memberRights: 1,
				couponIds: [],
				pushChannel: [],
				msgContent: ''
			};
			this.ruleLists.push(this.ruleObj);
			this.ruleIndex = this.ruleLists.length - 1;
		},
		deleteRule: function(index) {
			// 删除规则
			// if (this.edit) {
			// 	if (this.ruleLists[index].id) {
			// 		this.activityDetail.deleteRule.push(this.ruleLists[index].id);
			// 	}
			// }
			this.ruleList.splice(index, 1);
			for (let i = 0; i < this.ruleList.length; i++) {
				this.ruleList[i].name = '规则' + (i + 1);
			}
			this.ruleLists.splice(index, 1);
			this.ruleIndex = this.ruleLists.length - 1;
			this.ruleObj = this.ruleLists[this.ruleIndex];
		},
		getDetails: function(index) {
			// 获取规则详情
			this.ruleObj = this.ruleLists[index];
			this.ruleIndex = index;
			this.maxConsume = this.ruleObj.maxConsume;
			this.minConsume =
				this.ruleObj.minConsume != '' && this.ruleObj.minConsume >= 1 ? 1 : 0;
			this.memberRights = Number(!(Number(this.ruleObj.memberRights)));
			this.onListName = this.memberRights == 0 ? '电子优惠券' : '无';
			if (Number(this.maxConsume) > 0 && Number(this.minConsume) > 0) {
				this.consumeName = '指定额度';
			}
		},
		getCouponId: function(arr, type) {
			let i;
			let arr1 = [];
			arr = type != 1 && !utils.isEmptyObject(arr) ? JSON.parse(arr) : arr;
			for (i = 0; i < arr.length; i++) {
				arr1.push(arr[i].id);
			}
			return arr1;
		},
		async addActivity(type) {
			// 新建活动
			if (this.title.trim() == '') {
				this.$store.commit('setWin', {
					content: '请填写活动标题',
					timerPowerOff: 1000
				});
				return false;
			}

			if (this.endObj.time < new Date().getTime()) {
				this.$store.commit('setWin', {
					content: '活动结束时间应大于当前时间',
					timerPowerOff: 1000
				});
				return false;
			}

			if (this.brandId != '3') {
				this.selectsList = [];
				this.selectsList.push(this.userData.currentShop.id);
			}

			if (utils.isEmptyObject(this.selectsList)) {
				this.$store.commit('setWin', {
					content: '请选择活动范围',
					timerPowerOff: 1000
				});
				return false;
			}

			// 监听最低消费 and 最高消费
			if (
				Number(this.maxConsume) >= 1 &&
				this.minConsumes > Number(this.maxConsume)
			) {
				this.$store.commit('setWin', {
					content: '最低消费不能大于最高消费',
					timerPowerOff: 1000
				});
				this.minConsumes = 0;
				this.ruleLists[this.ruleIndex].minConsume = this.minConsumes;
				return false;
			}
			if (
				Number(this.maxConsume) >= 1 &&
				Number(this.maxConsume) < Number(this.minConsumes)
			) {
				this.$store.commit('setWin', {
					content: '最高消费不能小于最低消费',
					timerPowerOff: 1000
				});
				this.maxConsume = 0;
				this.ruleLists[this.ruleIndex].maxConsume = this.maxConsume;
				return false;
			}

			// 循环ruleLists
			this.ruleLists[this.ruleIndex] = this.ruleObj;
			this.ruleLists[this.ruleIndex].memberRights = Number(!(this.memberRights));

			if (this.ruleIndex == 0 && this.ruleLists.length == 0) {
				this.ruleLists.push(this.ruleObj);
			}

			let rule = utils.deepCopy(this.ruleLists);
			for (let i = 0; i < rule.length; i++) {
				rule[i].isLoop = Number(rule[i].isLoop);
				rule[i].couponIds = rule[i].couponIds;
				if (rule[i].pushChannel) {
					rule[i].pushChannel = Number(
						rule[i].pushChannel.toString().replace(/,/g, '')
					);
				}
				if (
					rule[i].minConsume >= 1 &&
					rule[i].maxConsume >= 1 &&
					Number(rule[i].minConsume) > Number(rule[i].maxConsume)
				) {
					this.$store.commit('setWin', {
						content: '规则' + (i + 1) + '最低消费大于最高消费,请修改！'
					});
					return false;
				}
				if (
					rule[i].minConsume >= 1 &&
					rule[i].maxConsume >= 1 &&
					Number(rule[i].maxConsume) < Number(rule[i].minConsume)
				) {
					this.$store.commit('setWin', {
						content: '规则' + (i + 1) + '最高消费小于最低消费,请修改！'
					});
					return false;
				}
			}
			if (this.edit) {
				this.activityDetail.name = this.title;
				this.activityDetail.explain = this.explain;
				this.activityDetail.shopIds = this.activityList.toString();
				this.activityDetail.startTime = utils.getTime({
					time: new Date(this.startObj.time),
					type: false
				}).start;
				this.activityDetail.endTime = utils.getTime({
					time: new Date(this.endObj.time),
					type: false
				}).now;
				// this.activityDetail.updateRule = [];
				// this.activityDetail.addRule = [];

				// for (let i = 0; i < rule.length; i++) {
				// 	if (rule[i].id) {
				// 		this.activityDetail.updateRule.push(rule[i]);
				// 	} else {
				// 		this.activityDetail.addRule.push(rule[i]);
				// 	}
				// }
				// this.activityDetail.deleteRule = this.activityDetail.deleteRule == undefined ? '' : this.activityDetail.deleteRule.toString();
				this.activityDetail.isAuto = type;
				this.activityDetail.rule = rule;
				// delete this.activityDetail.rule;

				await http.fissionActivity({
					data: {
						activityId: this.activityDetail.id,
						data: JSON.stringify(this.activityDetail)
					}
				});
				this.$store.commit('setWin', {
					content: '保存成功,1秒后跳转至活动列表',
					callback: () => {
						this.closePage();
					},
					timerPowerOff: 1000
				});
			} else {
				await http.fissionActivity({
					data: {
						shopIds: this.selectsList.toString(),
						type: 3,
						name: this.title,
						mouldType: 0,
						objectType: this.memberStatus ? (this.integralOn == 0 ? '2' : this.integralOn) : 4 , //活动对象
						memberIds: this.memfilter, //活动关联会员
						memberNum: this.member, //会员人数
						startTime: Math.round(this.startObj.time / 1000),
						endTime: Math.round(this.endObj.time / 1000),
						isAuto: type,
						getType: '0',
						explain: this.explain,
						rule: JSON.stringify(rule)
					}
				});
				this.$store.commit('setWin', {
					content: '发布成功,1秒后跳转至活动列表',
					callback: () => {
						this.closePage();
					},
					timerPowerOff: 1000
				});
			}
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
			let data = await http.getActivityDetail({
				data: {
					aid: item.id,
					type: item.type,
					mouldType: item.mouldType
				}
			});
			let activityDetail = data;
			this.activityDetail = utils.deepCopy(activityDetail);
			//this.activityDetail.deleteRule = [];

			if (activityDetail.type == '3') {
				this.title = activityDetail.name;
				this.explain = activityDetail.explain;
				this.selectsList = activityDetail.shopIds ? activityDetail.shopIds.split(',') : [];
				this.startObj.time = Number(
					Math.round(activityDetail.startTime * 1000)
				);
				this.endObj.time = Number(Math.round(activityDetail.endTime * 1000));
				this.ruleObj = utils.deepCopy(activityDetail.rule[0]);
				this.ruleObj.couponIds = JSON.parse(this.ruleObj.couponIds);
				this.ruleObj.pushChannel = String(this.ruleObj.pushChannel).split('');
				this.ruleObj.isLoop = (Number(this.ruleObj.isLoop));
				this.minthiss = this.ruleObj.minthis;
				this.minthis = Number((Number(this.minthiss)));
				this.maxthis = this.ruleObj.maxthis;
				this.memberRights = Number(!(Number(this.ruleObj.memberRights)));
				this.onListName = this.memberRights == 0 ? '电子优惠劵' : '无';
				if(activityDetail.objectType == '4'){
					this.integralOn = 1;
					this.memberStatus = false;
				}else{
					this.integralOn = activityDetail.objectType == '2' ? 0 : activityDetail.objectType;//活动群体
				}
				this.memfilter = activityDetail.memberIds;//筛选条件
				this.member = activityDetail.sendProgress.split(',')[0];//会员人数
				this.edit = true;
				this.ruleList = [];
				for (let i = 0; i < activityDetail.rule.length; i++) {
					this.ruleLists.push({
						id: activityDetail.rule[i].id,
						isLoop: Number(activityDetail.rule[i].isLoop),
						maxthis: activityDetail.rule[i].maxthis,
						memberRights: activityDetail.rule[i].memberRights,
						minthis: activityDetail.rule[i].minthis,
						msgContent: activityDetail.rule[i].msgContent,
						pushChannel: String(activityDetail.rule[i].pushChannel).split(''),
						couponIds: JSON.parse(activityDetail.rule[i].couponIds),
						maxConsume: activityDetail.rule[i].maxConsume,
						mixConsume: activityDetail.rule[i].mixConsume
					});

					this.ruleList.push({
						name: '规则' + (i + 1)
					});
				}
				this.getNoLimitCoupon();
			}

			setTimeout(() => {
				this.$refs.startCal.initData();
				this.$refs.endCal.initData();
			}, 200);
			this.getDetails(0);
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
			}
			this.showVip = false;
		},
	},
	computed: {
		titles: {
			get: function() {
				return this.title;
			},
			set: function(newValue) {
				this.title = newValue;
			}
		},
		maxConsumes: {
			get: function() {
				return this.maxConsume;
			},
			set: function(newValue) {
				this.maxConsume = newValue.replace(intReg, '');
				this.ruleObj.maxConsume = this.maxConsume;
			}
		},
		minConsumess: {
			get: function() {
				return this.minConsumes;
			},
			set: function(newValue) {
				this.minConsumes = newValue.replace(intReg, '');
				this.ruleObj.minConsume = this.minConsumes;
			}
		}
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		'ruleObj.pushChannel': function() {
			if (this.ruleObj.pushChannel.indexOf('2') != -1) {
				this.msmStatus = true;
			} else {
				this.msmStatus = false;
			}
		},
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
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		mulSelect: () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		rang: () =>
			import ( /* webpackChunkName:'activity_agift_rang' */ './activity_agift_rang'),
		coupon: () =>
			import ( /* webpackChunkName:'activity_agift_coupon' */ './activity_agift_coupon'),
		'memberScreening': () =>
			import ( /* webpackChunkName:'activity_screening' */ './activity_screening'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '<返回活动列表',
			className: ['activity'],
			fn: () => {
				this.closePage();
			}
		}]);
		this.userData = storage.session('userShop');
		this.brandId = this.userData.currentShop.ischain;
		this.shopName = this.userData.currentShop.name;
		this.getShopList();
		let memberIds = storage.session('memberIds'); //获取是否有会员信息
		if (memberIds) {
			this.integralOn = 1; //让其默认选中会员
			this.member = memberIds.length;
			this.memfilter = memberIds.join(',');
			this.memberStatus = false; //会员标识
		}
		let activityInfo = storage.session('activityInfo');
		if (activityInfo) { //判断是新增还是编辑
			this.getActivityDetail(activityInfo);
		}
		this.getShopList();
	},
	beforeDestroy() {
		storage.session('activityInfo', null);
		storage.session('memberIds', null);
	}
};
</script>
<style type="text/css" scoped>
.member-agift,
.main_Box {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.main_Box {
	margin: 20px 0;
	position: relative;
}

.header_tit {
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
	/*background-color: #CCCCCC;*/
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

.agift-content {
	width: 100%;
	height: auto;
	margin-bottom: 20px;
	overflow: hidden;
}

.agift-content span {
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
	background: url(../../res/images/delete.png) center center no-repeat;
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
}

.content-set {
	border: 1px solid #cccccc;
	width: 560px;
	height: auto;
	overflow: hidden;
}

.moreBtn {
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
}

input:focus {
	border-color: #ccc !important;
	box-shadow: none !important;
}

#mycalendar1,
#mycalendar2 {
	height: 40px !important;
	border: none;
}

.tips {
	background: url(../../res/images/handle-tips.png) left center no-repeat;
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
	z-index: 55;
}

.selectList ul li {
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

#agift .selectbtns {
	width: auto;
	float: left;
}

.selectbtns span {
	height: 40px;
	line-height: 40px;
	width: auto;
	text-align: center;
}

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
}

.chckOn {
	background: #2489c5;
}

.countList {
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

.agift-content textarea {
	width: 340px;
	height: 140px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}

.limit {
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
}

.required-none:after {
	display: none;
}

#consume .freeFix {
	width: 100px;
	height: 40px;
	border: 1px #D2D2D2 solid;
	display: inline-block;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	float: left;
}

#consume .associated {
	text-align: left;
}

#consume .presentActive {
	border: 1px #FF9200 solid;
	background: #FFEDD1;
	color: #FF9200;
}
</style>