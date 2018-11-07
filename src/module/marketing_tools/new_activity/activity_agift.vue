<template>
	<div class="member-agift" id="member-agift">
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<!-- <input type="text" class="name" placeholder="请输入活动标题" v-model='title' maxlength="10" /> -->
				<el-input v-model="title" maxlength="10" placeholder="请输入活动标题"></el-input>
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<!-- <calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar> -->
					<el-date-picker class="fl" v-model="startObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" @change="getStartTime" value-format="timestamp">
					</el-date-picker>
					<span class="fl lines">-</span>
					<!-- <calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar> -->
					<el-date-picker class="fl" v-model="endObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp"  @change="getEndTime">
					</el-date-picker>					
				</div>
				<span class="fl returnInt">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动范围 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动范围</span>
			<div class="rightHalf" v-if="ischain == '3'">
				<!-- <a href="javascript:void(0);" class="addclassify" @click="openActivityWin">关联门店</a> -->
				<el-button type="primary" icon="el-icon-plus" @click="openActivityWin" style="width:179px;">关联门店</el-button>
				<span v-if="selectsList.length >= 1">(已选择{{selectsList.length}}家店铺)</span>
			</div>
			<div class="rightHalf" v-else>
				<span class="obj">{{shopName}}</span>
			</div>
		</div>
		<!-- 活动群体 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动群体</span>
			<div class="rightHalf">
				<span class="obj">全部会员</span>
			</div>
		</div>
		<!-- 营销规则设置 -->
		<div class="set-line">
			<div class="titles">营销规则设置</div>
			<div class="line"></div>
		</div>
		<!-- 会员权益 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">会员权益</span>
			<div class="rightHalf">
				<!-- <select-btn :name='durationName' :sorts="durationList.map(v=>v.name)" :width="200" @selOn="selexpirationTime"></select-btn> -->
				<el-select v-model="durationName" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in durationList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>				
			</div>
		</div>
		<!-- 关联优惠券 -->
		<div class="online-box clearfix" v-if="durationId == '1'">
			<span class="online-sub fl">关联优惠券</span>
			<div class="rightHalf">
				<!-- <a href="javascript:void(0);" class="addclassify" style="width:200px;" @click="openCouponWin">选择关联优惠券</a> -->
				<el-button type="primary" icon="el-icon-plus" @click="openCouponWin" style="width:179px;">选择关联优惠券</el-button>
				<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
			</div>
		</div>
		<!-- 消息推送渠道 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">消息推送渠道</span>
			<div class="rightHalf">
				<mulSelect class="fl" :styles="{'border-radius':'4px'}" :list='list' @selOn='selOnSend' :selects="selects" :name='"name"' :keyName='"id"'></mulSelect>
				<div class="fl handle-tips">
					<i></i> 活动发布后将通过该渠道触发会员
				</div>
			</div>
		</div>
		<!-- 内容设置 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">内容设置</span>
			<div class="rightHalf">
				<textarea placeholder="请输入内容设置" v-model="memberContent" maxlength="151"></textarea>
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
		<!-- <div class="agift-content" style="overflow: inherit;height: 40px;">
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
			</div> -->
		<!-- <div class="agift-content" v-if="memberRights == 0">
				<span class="fl"></span>
				<div class="btn-concent" @click="openCouponWin">
					<button class="fl increase" style="width: 150px;">选择优惠劵</button>
				</div>
				<span class="fl" v-if="couponLists.length >= 1">已选择{{couponLists.length}}张</span>
			</div> -->
		<!-- <div class="agift-content">
				<span class="fl">消息推送渠道</span>
				<mulSelect :styles="{backgroundColor:'rgb(247,247,247)'}" :list='list' @selOn='selOnSend' :selects="selects" :name='"name"' :keyName='"id"'></mulSelect>
				<span class="fl" style="width: auto;color: #666666;padding-left:20px">活动发布后将通过该渠道触发会员</span>
			</div> -->
		<!-- 内容设置 -->
		<!-- <div class="agift-content">
				<label>
					<span class="required required-none" style="vertical-align: top;padding-top: 10px;">内容设置</span>
					<textarea placeholder="内容设置" style="width: 350px;height: 100px;" v-model="memberContent" maxlength="151"></textarea>
				</label>
				<div class="limit">
					<p class="fl" style="margin-right: 102px;">
						<img class="icon-i" src="../../../res/images/handle-tips.png" />限150字以内</p>
					<p class="fl" v-if="msmStatus">您已输入{{memberContent.length}}个字,目前发送{{Math.ceil(memberContent.length / 60)}}条短信</p>
				</div>
				<div class="limit">
					<p>引用参数:
						<a style="color:#FF9200;" :key='index' v-for="(item,index) in parameter" @click="addParameter(index,1)">{{item.name}}</a>
					</p>
				</div>
			</div> -->
		<!-- <div class="agift-content">
				<label>
					<span class="required required-none" style="vertical-align: top;padding-top: 10px;">活动说明</span>
					<textarea placeholder="请输入活动说明" style="width: 350px;height: 100px;" v-model="explain" maxlength="151"></textarea>
				</label>
				<p class="limit">
					<img class="icon-i" src="../../../res/images/handle-tips.png" />限150字以内</p>
				</div> -->
		<div class="agift-content" style="padding-left: 60px;">
			<!-- <a href="javascript:void(0);" class="gray" style="width: 200px;" @click="closePage">取消</a> -->
			<el-button type="info" plain style="margin-right: 10px;width:190px;" @click="closePage">取消</el-button>
			<template v-if='isactivityDetail'>
				<!-- <a href="javascript:void(0);" class="gray" style="width: 200px;background: #858585;" @click="addActivity('0')">保存</a>
				<a href="javascript:void(0);" class="yellow" style="width: 200px;" @click="addActivity('1')" v-if="edit == false">发布</a> -->
				<el-button type="info" style="margin-right: 10px;width:190px;" @click="addActivity('0')">保存</el-button>
				<el-button type="primary" style="margin-right: 10px;width:190px;" @click="addActivity('1')" v-if="edit == false">发布</el-button>
			</template>
		</div>
		<!-- 活动关联门店 -->
		<rang @winEvent='rangEvent' :activityList='shopList' v-if='showRang' :selectsList="selectsList"></rang>
		<!-- 优惠券弹窗 -->
		<!-- <coupon @winEvent='couponEvent' :selectCoupon='couponLists' v-if='showCoupon'></coupon> -->
		<!-- 优惠券的弹窗 -->
		<birthCoupon v-if='showCoupon' :selectCoupon='selectCoupon' :couponList='couponList' @winEvent='couponEvent'></birthCoupon>
	</div>
</template>
<script type="text/javascript">
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';

export default {
	data() {
		return {
			ischain: '',
			shopId: '', //单店的id
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
			returnInt: 1, //相差天数
			list: [{
				'name': '微信',
				'id': '1'
			}],
			selects: [], //选中的状态
			durationList: [{ //活动期限
				name: '无',
				id: 0
			},
			{
				name: '电子优惠劵',
				id: 1
			}
			],
			durationId: 0,
			durationName: '无', //状态
			explain: '',
			title: '', // 活动标题
			shopName: '',
			edit: false,
			activityDetail: {},
			memberContent: '', //内容设置
			parameter: [{
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
			},
			{
				'name': '【注册时间】',
				'id': '{registerTime}'
			}
			],
			showRang: false,
			showCoupon: false,
			isactivityDetail: true, //是否查看详情
			shopList: [], //店铺选择的列表
			selectsList: [], //门店列表选中的
			selectCoupon: [],
			couponList: [],
			editId: ''
		};
	},
	methods: {
		valiData: function(content, title, winType) { //弹窗提示格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		selOnSend(arr) { //消息推送渠道
			this.selects = arr;
		},
		getStartTime(str) { //开始时间
			this.startObj.time = str;
		},
		getEndTime(str) { //结束时间
			this.endObj.time = str;
		},
		selexpirationTime: function(i) { //会员权益
			//this.durationName = this.durationList[i].name; //点击对应的名字
			this.durationId = i; //点击对应的id
		},
		addParameter: function(index) { //添加参数
			this.memberContent += this.parameter[index].id;
		},
		timeChange: function() {
			//相差天数计算
			this.returnInt = Math.ceil((new Date(this.endObj.time).getTime() - new Date(this.startObj.time).getTime()) / (1000 * 60 * 60 * 24));
		},
		// getListDetail: function(item, index) {
		// 	// 获取设置list详情
		// 	this.onListName = item.name;
		// 	this.memberRights = index;

		// 	if (this.memberRights != 0) {
		// 		this.couponLists = [];
		// 	}
		// },
		openActivityWin: function() {
			//设置活动范围
			this.showRang = true;
		},
		// rangEvent(obj) {
		// 	this.showRang = false;
		// 	if (obj.selects) {
		// 		this.activityList = utils.unique(obj.selects);
		// 	}
		// },
		rangEvent(obj) { //关联弹窗的回掉
			if (obj.status == 'ok') {
				this.selectsList = obj.select;
				//console.log(JSON.stringify(this.selectsList))
			}
			this.showRang = false;
		},
		couponEvent(obj) {
			this.showCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.select;
				this.couponList = obj.data.list;
			}
		},
		//生日活动关联优惠券弹窗
		async openCouponWin() {
			let data = await http.getGetCouponCondition({});
			let coupons = [];
			for (let item of data) {
				item.num = 1;
				if (item.type != 7) {
					coupons.push(item);
				}
			}
			this.couponList = coupons;
			this.showCoupon = true;
		},
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity/generalActivity');
		},
		checkForm: function() {
			if (this.title.trim() == '') {
				this.valiData('请填写活动标题');
				return false;
			}
			if (this.startObj.time > this.endObj.time) {
				this.valiData('开始时间不能大于结束时间');
				return false;
			}
			if (this.endObj.time < this.startObj.time) {
				this.valiData('结束时间不能小于开始时间');
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
			if (this.durationId == 1 && this.selectCoupon.length == 0) {
				this.valiData('请选择优惠券');
				return false;
			}
			return true;
		},
		async addActivity(type) {
			if (!this.checkForm()) return;
			// 新建活动
			let arr = [];
			let obj = {
				couponIds: this.selectCoupon, //优惠券
				minConsume: '',
				maxConsume: '',
				isLoop: '0',
				memberRights: this.durationId, //会员权益
				pushChannel: this.selects.toString().replace(/,/g, ''),
				msgContent: this.memberContent
			};
			arr.push(obj);
			if (this.edit) {
				// 修改信息
				this.activityDetail.name = this.title; //活动名称
				this.activityDetail.startTime = Math.round(this.startObj.time / 1000); //开始时间 
				this.activityDetail.endTime = Math.round(this.endObj.time / 1000); //结束时间
				this.activityDetail.shopIds = this.ischain == '3' ? this.selectsList.join(',') : this.shopId; //活动范围
				arr[0].id = this.activityDetail.rule[0].id;
				this.activityDetail.rule = utils.deepCopy(arr);
				this.activityDetail.isAuto = type;
				await http.fissionActivity({
					data: {
						activityId: this.editId,
						data: JSON.stringify(this.activityDetail)
					}
				});
			} else {
				await http.fissionActivity({
					data: {
						shopIds: this.ischain == '3' ? this.selectsList.join(',') : this.shopId,
						type: 2,
						name: this.title,
						mouldType: 0,
						objectType: 2,
						startTime: Math.round(this.startObj.time / 1000),
						endTime: Math.round(this.endObj.time / 1000),
						isAuto: type,
						getType: '0',
						explain: this.explain, //活动说明
						rule: JSON.stringify(arr)
					}
				});
			}
			let message = (type == '0') ? '保存成功' : '发布成功';
			this.valiData(message);
			this.closePage();
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
			this.title = activityDetail.name; //标题
			this.startObj.time = Number(Math.round(activityDetail.startTime * 1000)); //开始时间
			this.endObj.time = Number(Math.round(activityDetail.endTime * 1000)); //结束时间
			this.selectsList = data.shopIds.split(','); //门店范围
			this.selects = activityDetail.rule[0].pushChannel.length > 1 ? activityDetail.rule[0].pushChannel.split('').toString()
				.split(',') : activityDetail.rule[0].pushChannel.split(',');
			this.explain = activityDetail.explain; //活动说明
			this.memberContent = activityDetail.rule[0].msgContent; //内容设置
			data.rule[0].couponIds = JSON.parse(data.rule[0].couponIds);
			this.durationId = Number(activityDetail.rule[0].memberRights); //会员权益
			this.durationName = this.durationList[this.durationId].name;
			if (this.durationId == 1) {
				this.selectCoupon = data.rule[0].couponIds;
			}
			this.activityDetail = utils.deepCopy(activityDetail);
			this.edit = true;
		}
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
		'memberContent': function() {
			if (this.memberContent.length > 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.memberContent = this.memberContent.substr(0, 150);
			}
		},
		'explain': function() {
			if (this.explain.length > 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.explain = this.explain.substr(0, 150);
			}
		},
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		'canMulti': () =>
			import ( /* webpackChunkName:'can_multi' */ 'src/components/can_multi'),
		'mulSelect': () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		'rang': () =>
			import ( /* webpackChunkName:'activity_agift_rang' */ './activity_agift_rang'),
		'birthCoupon': () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回活动列表',
			className: 'el-btn-blue',
			fn: () => {
				this.closePage();
			}
		}]);
		this.shopList = storage.session('shopList'); //获取品牌下面的店铺列表
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.shopName = userData.currentShop.name;
		this.shopId = userData.currentShop.id;
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
#member-agift {
	max-width: 1400px;
	height: auto;
}

#member-agift .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#member-agift .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#member-agift .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#member-agift .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#member-agift .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#member-agift .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
}




/*活动名称的输入框*/

#member-agift .online-box .rightHalf .name {
	width: 280px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#member-agift .online-box .rightHalf .obj {
	display: inline-block;
	width: 179px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
}

#member-agift .online-box .rightHalf textarea {
	width: 340px;
	height: 100px;
	outline: none;
	padding: 10px;
	color: #333;
	font-size: 16px;
	resize: none;
	border: 1px solid #eaeaea;
}

#member-agift .online-box .rightHalf .limit {
	font-size: 14px;
	color: #999999;
	height: auto;
	overflow: hidden;
}

#member-agift .online-box .rightHalf .lines {
	width: 40px;
	text-align: center;
	margin-right: 0;
	line-height: 40px;
}

#member-agift .online-box .rightHalf .returnInt {
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
	content: '';
	position: absolute;
	left: 0;
	bottom: 50%;
	width: 500px;
	height: 1px;
	border-bottom: 2px dashed #CCCCCC;
}

.header_tit span {
	display: block;
	background-color: #FFFFFF;
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
	padding: 0;
	border: 1px solid #CCCCCC;
	height: 38px;
	width: 300px;
	padding-left: 10px;
}

.agift-content input:focus,
.agift-content textarea:focus {
	outline: none;
}

.moreBtn {
	width: 50px !important;
	position: relative;
	margin-right: 0 !important;
	border-left: 1px solid #CCCCCC;
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

.selectbtns {
	width: auto;
	float: left;
}

.selectbtns span {
	height: 40px;
	line-height: 40px;
	width: auto;
	text-align: center;
}

.selectList {
	border: 1px solid #CCCCCC;
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
	text-align: center;
	background-color: #FFFFFF;
	border: 1px solid #CCCCCC;
	border-bottom: none;
}

.selectList ul li:last-child {
	border-bottom: 1px solid #CCCCCC;
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
	background: url(../../../res/images/handle-tips.png) left center no-repeat;
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
}
*/

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

.required-none:after {
	display: none;
}
</style>