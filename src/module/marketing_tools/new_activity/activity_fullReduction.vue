<!--
    **满减活动
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="reduction">
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动说明 -->
		<div class="handle-tips" style="margin:0 0 20px 20px;">
			<i></i> 说明:您可以设置顾客订单满指定金额后，可享受相应优惠。如【订单满50元减20；满100元减40】。满减活动当前仅支持自助模式。
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
			<span class="online-sub fl required">活动时间</span>
			<div class="rightHalf">
				<div class="input-box">
					<!--日期组件 开始时间-->
					<el-date-picker class="fl" v-model="startTime" type="datetime" placeholder="选择日期时间" :clearable="false" @change="startTimeChange" value-format="timestamp">
					</el-date-picker>
				</div>
				<s>-</s>
				<div class="input-box">
					<!--日期组件 开始时间-->
					<el-date-picker class="fl" v-model="endTime" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp" @change="endTimeChange">
					</el-date-picker>
				</div>
			</div>
		</div>
		<!-- 活动门店 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动门店</span>
			<div class="rightHalf" v-if="ischain == '3'">
				<el-button type="primary" class="fl margin" icon="el-icon-plus" @click="openActivityWin" style="width:179px;">关联门店</el-button>
				<span class="fl" v-if="selectsList.length >= 1">已选择{{selectsList.length}}家店铺</span>
			</div>
			<div class="rightHalf" v-else>
				<span>{{shopName}}</span>
			</div>
		</div>
		<!-- 活动场景 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动场景</span>
			<div class="rightHalf">
				<el-radio-group v-model="activitySceneName" class="fl">
					<el-radio style="width:112px;text-align:center;" v-for="(item,index) in activityScene" :key="index" :label="item.name" border @change.native="selectScene(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<!-- 营销规则设置 -->
		<div class="set-line">
			<div class="titles">营销规则设置</div>
			<div class="line"></div>
		</div>
		<!-- 是否与会员折扣同享 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">是否与会员折扣同享</span>
			<div class="rightHalf">
				<el-radio-group v-model="compulsoryName" class="fl">
					<el-radio style="width:112px;text-align:center;" v-for="(item,index) in list" :key="index" :label="item.name" border @change.native="chooseIntegral(index)"></el-radio>
				</el-radio-group>
				<div class="prompting" @click="isPublicNumber('1')">
					<div class="detDiv" v-if="isPublic['1']">
						<i class="detI triright"></i>
						<h3 class="detH3">
							是:与会员折扣同享,当该门店有此活动时,先计算会员价,累加达到满减值再进行满减!
							<P>否:不与会员折扣同享,当该门店有此活动时,只需要计算满减即可.</P>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<!-- 强制减免 -->
		<div class="online-box clearfix" v-if="activitySceneId == 1">
			<span class="online-sub fl required">强制减免</span>
			<div class="rightHalf">
				<el-radio-group v-model="compulsoryCreditsName" class="fl">
					<el-radio style="width:112px;text-align:center;" v-for="(item,index) in list" :key="index" :label="item.name" border @change.native="chooseReduction(index)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<!-- 是否与会员折扣同享 -->
		<!-- <div class="online-box clearfix">
			<span class="online-sub fl">是否与单品优惠券同享</span>
			<div class="rightHalf">
				<span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in list" :key="index" v-bind:class="{'presentActive':isItemShare == index }" @click="chooseIntegral('2',index)">{{item.name}}</span>
				<div class="prompting" @click="isPublicNumber('2')">
					<div class="detDiv" v-if="isPublic['2']">
						<i class="detI triright"></i>
						<h3 class="detH3">
							是：允许使用单品优惠券，先计算单品金额。所有单品金额累加满足减免金额时，再进行减免。注意：使用单品优惠券时可能导致订单金额不满足满减优惠，若用户需要满减优惠需再次凑单至满减金额即可。
							<P>否：不予使用单品优惠券，包含：赠品券，单品减免券，单品折扣券。</P>
						</h3>
					</div>
				</div>
			</div>
		</div> -->
		<!-- 是否与会员折扣同享 -->
		<!-- <div class="online-box clearfix">
			<span class="online-sub fl">是否与整单优惠券同享</span>
			<div class="rightHalf">
				<span class="freeFix" style="margin-right: 14px;" v-for="(item,index) in list" :key="index" v-bind:class="{'presentActive':isWholeShare == index }" @click="chooseIntegral('3',index)">{{item.name}}</span>
				<div class="prompting" @click="isPublicNumber('3')">
					<div class="detDiv" v-if="isPublic['3']">
						<i class="detI triright"></i>
						<h3 class="detH3">
							是：允许使用整单优惠券，先计算满减优惠。后计算整单优惠券，用户实付金额满足优惠券使用门槛时，可允许用户继续使用整单券。
							<p>否：不予使用整单优惠券，包含：整单减免，整单折扣，代金券。</p>
						</h3>
					</div>
				</div>
			</div>
		</div> -->
		<!-- 默认规则 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">默认规则</span>
			<div class="rightHalf">
				<!-- <onOff :key='1' :status="payDiscount" @statusChange="openpayDiscount" class='fl'></onOff> -->
				<el-switch class="fl" v-model="payDiscount" active-color="#E1BB4A" inactive-color="#dcdfe6" style="margin-top: 10px;">
				</el-switch>
				<div class="fl handle-tips" style="margin-left: 20px;">
					<i></i> 说明:当订单金额低于支付金额时,用户只需支付订单金额
				</div>
			</div>
		</div>
		<div class="online-box clearfix" v-if='payDiscount'>
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<span class="fl">不满</span>
				<section>
					<el-input class='fl' placeholder="请输入金额" v-model="cash" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
						<template slot="suffix">元</template>
					</el-input>
				</section>
				<span class="fl">,只付</span>
				<section>
					<el-input class='fl' placeholder="请输入金额" v-model="payCash" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
						<template slot="suffix">元</template>
					</el-input>
				</section>
			</div>
		</div>
		<!-- 优惠设置 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">优惠设置</span>
			<div class="rightHalf">
				<!-- <onOff :key='1' :status="preferential" @statusChange="openpreferential" class='fl'></onOff> -->
				<el-switch class="fl" v-model="preferential" active-color="#E1BB4A" inactive-color="#dcdfe6" style="margin-top: 10px;">
				</el-switch>
				<div class="fl handle-tips" style="margin-left: 20px;">
					<i></i> 说明:最多设置5条优惠规则
				</div>
			</div>
		</div>
		<div class="online-box clearfix" v-if='preferential'>
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<com-table :listHeight='60' :listWidth="1100" :showHand="false" :titleData="titleList" :introData="formList" :widthType='true'>
					<div slot="con-0" slot-scope="props" class="delete">
						<span @click='delplan(props.data)'>删除</span>
					</div>
					<div slot="con-1" slot-scope="props">
						{{props.data.index}}
					</div>
					<div slot="con-2" slot-scope="props" class="orderCash">
						<section>
							<el-input class='fl' placeholder="请输入金额" v-model="props.data.fullCash" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
								<template slot="suffix">元</template>
							</el-input>
						</section>
						<div class="warning-tips" v-if='props.data.fullStatus'>
							<i></i>{{props.data.fullerrorMessage}}
						</div>
					</div>
					<div slot="con-3" slot-scope="props" class="orderCash">
						<section>
							<el-input class='fl' placeholder="请输入金额" v-model="props.data.reduceCsah" maxlength="6" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:179px;">
								<template slot="suffix">元</template>
							</el-input>
						</section>
						<div class="warning-tips" v-if='props.data.reduceStatus'>
							<i></i>{{props.data.reduceerrorMessage}}
						</div>
					</div>
				</com-table>
				<el-button v-if='formList.length < 5' type="primary" icon="el-icon-plus" @click="addplan" style="width:179px;">增加优惠方案</el-button>
			</div>
		</div>
		<!-- 取消保存 -->
		<div class="online-box clearfix" style="padding-left:100px;">
			<el-button type="info" plain style="margin-right: 10px;width:190px;" @click="closePage">取消</el-button>
			<el-button v-if='activityDetail' type="info" style="margin-right: 10px;width:190px;" @click="saveConfig('0')">保存</el-button>
			<el-button v-if="editId == ''" type="primary" style="margin-right: 10px;width:190px;" @click="saveConfig('1')">发布</el-button>
		</div>
		<!-- 活动关联门店 -->
		<rang @winEvent='rangEvent' :activityList='shopList' v-if='showRang' :selectsList="selectsList"></rang>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			ischain: storage.session('userShop').currentShop.ischain,
			shopId: storage.session('userShop').currentShop.id, //单店的id
			shopName: storage.session('userShop').currentShop.name,
			activityName: '', //活动的名称
			startTime: new Date().setHours(0, 0, 0, 0), //开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //结束时间
			showRang: false, //打开关联门店的弹窗
			activityList: [], //选择活动范围列表
			shopList: [], //店铺选择的列表
			selectsList: [],
			list: [{
				name: '否',
				id: 0
			}, {
				name: '是',
				id: 1
			}],
			compulsoryName: '否', //是否与会员折扣同享
			isMemberShare: 0, //会员折扣共享
			isItemShare: 0, //单品优惠券共享
			isWholeShare: 0, //整单优惠券共享
			payDiscount: false, //默认规则
			cash: 0, //不满金额
			payCash: 0, //支付金额
			preferential: false, //优惠设置
			titleList: [{
				titleName: '操作',
				titleStyle: {
					width: 150 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '序列',
				titleStyle: {
					width: 150 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '订单金额(元)'
			},
			{
				titleName: '减免金额(元)'
			}
			],
			formList: [], //展示的数据
			editId: '', //编辑的id
			isPublic: {
				'1': false,
				'2': false,
				'3': false
			},
			activityDetail: true, //是否查看详情
			activityScene: [{
				name: '微店',
				id: 1
			}, {
				name: '快捷支付',
				id: 2
			}],
			activitySceneName: '微店',
			activitySceneId: 1,
			compulsoryCreditsName: '否', //强制减免
			compulsoryCreditsId: 0 //强制减免id
		};
	},
	methods: {
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = time;
		},
		openActivityWin() {
			//设置活动范围
			this.showRang = true;
		},
		isPublicNumber: function(type) { //提示的状态
			for (let key in this.isPublic) {
				if (key != type) {
					this.isPublic[key] = false;
				}
			}
			this.isPublic[type] = !this.isPublic[type];
		},
		rangEvent(obj) { //关联弹窗的回掉
			if (obj.status == 'ok') {
				this.selectsList = obj.select;
			}
			this.showRang = false;
		},
		chooseIntegral: function(index) {
			this.isMemberShare = index;
		},
		openpreferential: function(res) { //开启优惠规则
			this.preferential = res;
		},
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity/generalActivity');
		},
		addplan: function() { //添加优惠方案
			let obj = {
				index: '', //索引
				fullCash: '', //满金额
				reduceCsah: '', //减金额
				fullStatus: false, //错误状态
				reduceStatus: false, //减免金额状态
				fullerrorMessage: '', //错误的信息
				reduceerrorMessage: ''
			};
			if (this.preferential && !this.validationForm()) {
				this.valiData('订单金额或满减金额未填写或填写有误!');
				return false;
			}
			for (let item of this.formList) { //判断信息不能为空
				if (item.fullCash == '' || item.reduceCsah == '') {
					this.valiData('请完善优惠方案信息!');
					return false;
				}
			}
			this.formList.push(obj);
			for (let i = 0; i < this.formList.length; i++) {
				this.formList[i].index = i + 1;
			}
		},
		delplan: function(item) {
			this.formList.splice(item.index - 1, 1);
			for (let i = 0; i < this.formList.length; i++) {
				this.formList[i].index = i + 1;
				if (!this.isRepeat(this.formList) && this.formList[i].fullCash != 0) { //删除的时候判断订单金额有无重复
					this.formList[i].fullStatus = false;
				}
			}
		},
		formatValue: function(index, value) {
			this.formList[index - 1][value] = utils.toFloatStr(this.formList[index - 1][value], 2);
			if (value == 'fullCash') {
				this.formList[index - 1].fullStatus = false;
				if (this.formList[index - 1].fullCash == 0) {
					this.formList[index - 1].fullStatus = true;
					this.formList[index - 1].fullerrorMessage = '订单金额不能为0!';
				}
				if (this.isRepeat(this.formList)) {
					this.formList[index - 1].fullStatus = true;
					this.formList[index - 1].fullerrorMessage = '订单金额不能重复!';
				}
				if (!this.isRepeat(this.formList)) {
					for (let item of this.formList) {
						item.fullStatus = false;
					}
				}
			}
			if (value == 'reduceCsah') {
				this.formList[index - 1].reduceStatus = false;
				if (this.formList[index - 1].reduceCsah == 0) {
					this.formList[index - 1].reduceStatus = true;
					this.formList[index - 1].reduceerrorMessage = '减免金额不能为0!';
				}
			}
		},
		isRepeat: function(arr) { //判断订单金额是否有重复
			let hash = {};
			for (let i in arr) {
				if (hash[arr[i].fullCash])
					return true;
				hash[arr[i].fullCash] = true;
			}
			return false;
		},
		validationForm: function() { //验证满减金额
			for (let item of this.formList) {
				if (item.fullStatus || item.reduceStatus) return false;
				if (item.fullCash == '' || item.reduceCsah == '') return false;
			}
			return true;
		},
		valiData: function(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		checkForm: function() {
			if (this.activityName == '') {
				this.valiData('活动标题不能为空!');
				return false;
			}
			if (this.ischain == '3' && this.selectsList.length == 0) {
				this.valiData('请选择活动门店!');
				return false;
			}
			if (!this.payDiscount && !this.preferential) {
				this.valiData('请至少开启一个规则!');
				return false;
			}
			if (this.payDiscount) {
				if (this.cash == '' || this.payCash == '') {
					this.valiData('请完善默认规则信息!');
					return false;
				}
			}
			if (this.preferential && this.formList.length <= 0) {
				this.valiData('请添加优惠规则方案!');
				return false;
			}
			if (this.preferential && !this.validationForm()) {
				this.valiData('订单金额或满减金额信息有误,请更改!');
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
					isCompel: this.compulsoryCreditsId, //强制减免
					isMemberShare: this.isMemberShare, //会员折扣共享
					isItemShare: this.isItemShare, //单品优惠券共享
					isWholeShare: this.isWholeShare, //整单优惠券共享
					otherRule: {
						status: Number(this.payDiscount),
						orderPrice: this.cash, //不满
						pay: this.payCash //付
					},
					status: Number(this.preferential),
					discountRule: []
				},
			};
			let discountRule = [];
			for (let item of this.formList) {
				let ruleobj = {
					orderPrice: item.fullCash,
					reduction: item.reduceCsah
				};
				discountRule.push(ruleobj);
			}
			obj.couponIds.discountRule = discountRule; //满减规则
			arr.push(obj);
			await http.fissionActivity({
				data: {
					type: 6, //活动类别
					shopIds: this.ischain == '3' ? this.selectsList.join(',') : this.shopId,
					mouldType: 0, //长期活动模板
					scene: this.activitySceneId, //活动场景
					name: this.activityName, //活动名
					objectType: 2, //活动对象
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					isAuto: type, //保存 
					rule: JSON.stringify(arr)
				}
			});
			let message = (type == 0) ? '保存成功' : '发布成功';
			this.valiData(message);
			this.closePage();
		},
		async ediConfig(type) {
			let activityDetail = {}; //data
			activityDetail.type = 6;
			activityDetail.shopIds = this.ischain == '3' ? this.selectsList.join(',') : this.shopId;
			activityDetail.mouldType = 0;
			activityDetail.name = this.activityName;
			activityDetail.objectType = 2;
			activityDetail.startTime = parseInt(this.startTime / 1000);
			activityDetail.endTime = parseInt(this.endTime / 1000);
			activityDetail.isAuto = type;
			activityDetail.scene = this.activitySceneId; //活动场景
			activityDetail.rule = [];
			let arr = [];
			let obj = {
				id: this.ruleId,
				couponIds: {
					isCompel: this.compulsoryCreditsId, //强制减免
					isMemberShare: this.isMemberShare, //会员折扣共享
					isItemShare: this.isItemShare, //单品优惠券共享
					isWholeShare: this.isWholeShare, //整单优惠券共享
					otherRule: {
						status: Number(this.payDiscount),
						orderPrice: this.cash, //不满
						pay: this.payCash //付
					},
					status: Number(this.preferential),
					discountRule: []
				},
			};
			let discountRule = [];
			for (let item of this.formList) {
				let ruleobj = {
					orderPrice: item.fullCash,
					reduction: item.reduceCsah
				};
				discountRule.push(ruleobj);
			}
			obj.couponIds.discountRule = discountRule; //满减规则			
			arr.push(obj);
			activityDetail.rule = arr;
			await http.fissionActivity({
				data: {
					activityId: this.editId, //任务Id
					data: JSON.stringify(activityDetail)
				}
			});
			let message = (type == 0) ? '保存成功' : '发布成功';
			this.valiData(message);
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
				this.startTime = data.startTime * 1000; //开始时间
				this.endTime = data.endTime * 1000; //结束时间
				this.ruleId = data.rule[0].id; //规则id
				this.selectsList = data.shopIds.split(','); //门店范围
				data.rule[0].couponIds = JSON.parse(data.rule[0].couponIds);
				this.isItemShare = data.rule[0].couponIds.isItemShare;
				this.isMemberShare = data.rule[0].couponIds.isMemberShare;
				this.compulsoryName = this.list[this.isMemberShare].name;
				this.isWholeShare = data.rule[0].couponIds.isWholeShare;
				this.compulsoryCreditsId = data.rule[0].couponIds.isCompel; //强制减免
				this.compulsoryCreditsName = this.list[this.compulsoryCreditsId].name;
				this.payDiscount = Boolean(Number(data.rule[0].couponIds.otherRule.status));
				this.cash = data.rule[0].couponIds.otherRule.orderPrice;
				this.payCash = data.rule[0].couponIds.otherRule.pay;
				this.preferential = Boolean(Number(data.rule[0].couponIds.status));
				let discountRule = data.rule[0].couponIds.discountRule;
				for (let i = 0; i < discountRule.length; i++) {
					let obj = {
						index: i + 1, //索引
						fullCash: discountRule[i].orderPrice, //满金额
						reduceCsah: discountRule[i].reduction, //减金额
						fullStatus: false, //错误状态
						reduceStatus: false, //减免金额状态
						fullerrorMessage: '', //错误的信息
						reduceerrorMessage: ''
					};
					this.formList.push(obj);
				}
				this.activitySceneId = data.scene; //活动场景
				this.activitySceneName = this.activityScene[this.activitySceneId - 1].name;
			}
		},
		selectScene: function(item) {
			this.activitySceneId = item.id;
			//console.log(this.activitySceneId)
		},
		chooseReduction: function(index) {
			this.compulsoryCreditsId = index;
		}
	},
	components: {
		calendar: () =>
			import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		rang: () =>
			import( /* webpackChunkName:'activity_agift_rang' */ './activity_agift_rang'),
		'singleSelect': () =>
			import( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		onOff: () =>
			import( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		comTable: () =>
			import( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
	},
	mounted() {
		this.shopList = storage.session('shopList'); //获取品牌下面的店铺列表
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
			this.activityDetail = false;
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
<style type="text/css" scoped>
#reduction {
	width: 1400px;
	height: auto;
}

#reduction .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#reduction .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#reduction .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#reduction .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#reduction .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 170px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#reduction .online-box .rightHalf {
	width: auto;
	height: auto;
	float: left;
	line-height: 40px;
}

#reduction .online-box .freeFix {
	width: 100px;
	height: 40px;
	border: 1px #D2D2D2 solid;
	display: inline-block;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	float: left;
}

#reduction .online-box .presentActive {
	border: 1px #FF9200 solid;
	background: #FFEDD1;
	color: #FF9200;
}

#reduction .online-box .rightHalf .delete {
	color: #FF3D04;
}

#reduction .online-box .rightHalf .orderCash {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
}

#reduction .online-box .rightHalf .addclassify {
	margin-right: 10px;
}

#reduction .online-box .rightHalf span {
	line-height: 40px;
}

#reduction .online-box .rightHalf .name {
	width: 280px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#reduction .online-box .rightHalf .input-box {
	display: inline-block;
	vertical-align: middle;
}

#reduction .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

#reduction .warning-tips {
	width: 130px;
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../../src/res/images/tip.png") 0 center no-repeat;
	background-size: 16px 18px;
	color: #EA3B44;
}

#reduction .online-box .rightHalf section {
	/* width: 190px;
    height: 38px;
    border: 1px solid #CECDCD; */
	margin: 0 16px;
	float: left;
}

#reduction .online-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#reduction .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 38px;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}

#reduction .online-box .rightHalf .prompting {
	display: inline-block;
	width: 40px;
	height: 40px;
	background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
	position: relative;
	vertical-align: middle;
	cursor: pointer;
}

#reduction .online-box .rightHalf .prompting .detDiv {
	display: inline-block;
	width: 279px;
	background: #45404b;
	position: absolute;
	top: 0px;
	left: 45px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 100;
}

#reduction .online-box .rightHalf .prompting .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: 10px;
	left: -20px;
	right: 30%;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
}

#reduction .online-box .rightHalf .prompting .detDiv .detH3 {
	line-height: 22px;
	color: #e6e6e7;
}

#reduction .online-box .rightHalf .prompting .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #45404b;
	border-left: 10px solid transparent;
}

#reduction .online-box .rightHalf .margin {
	margin-right: 10px;
}
</style>
