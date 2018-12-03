<template>
	<section class='birth_act'>
		<!-- 生日活动 -->
		<div class="set-line">
			<div class="titles">生日活动</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动名称</span>
			<div class="rightHalf">
				<el-input v-model="actName" maxlength="10" placeholder="请输入活动标题"></el-input>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<span class="obj">全体会员</span>
			</div>
		</div>
		<!-- 关联优惠券 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">关联优惠券</span>
			<div class="rightHalf">
				<el-button class="fl" type="primary" icon="el-icon-plus" @click="addCoupon" style="width:179px;">选择关联优惠券</el-button>
				<span class="coupon_name" v-if="selectCoupon.length > 0">(已关联{{getCouponName(selectCoupon)}})</span>
			</div>
		</div>
		<!-- 活动期限 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动期限</span>
			<div class="rightHalf">
				<el-select v-model="durationName" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in durationList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
		</div>
		<!-- 推送日期 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">推送日期</span>
			<div class="rightHalf">
				<span class="fl thetext">提前</span>
				<el-input class="fl" style="width:auto;margin-right:10px;" v-model="pushdateNum" maxlength="10" placeholder="请输入推送日期"></el-input>
				<span class="fl thetext">天,发起生日活动推送</span>
			</div>
		</div>
		<!-- 推送时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">推送时间</span>
			<div class="rightHalf">
				<span style="margin-right:10px;">每日</span>
				<el-select v-model="pushNum" placeholder="请选择" @change="selpushtime" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in pushtimeList" :key="item.name" :label="item.name" :value="item.name">
					</el-option>
				</el-select>
				<span style="margin-left:10px;">时,发起生日活动推送</span>
			</div>
		</div>
		<!-- 获得方式 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">获得方式</span>
			<div class="rightHalf">
				<span class="obj">自动获得</span>
			</div>
		</div>
		<!-- 活动通知 -->
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
		<addCoupon v-if='showCoupon' :selectCoupon='selectCoupon' @winEvent='winEvent'></addCoupon>
	</section>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import global from 'src/manager/global';

export default {
	data() {
		return {
			edit: false, //是否为编辑
			editId: '', //编辑id
			actName: '', //生日活动名称
			durationList: [{ //活动期限
					name: '永久',
					id: 0
				},
				{
					name: '一年',
					id: 1
				},
				{
					name: '二年',
					id: 2
				}
			],
			durationId: 0, //活动期限
			durationName: '永久', //状态
			explain: '', //生日活动说明
			isclick: false, //保存时只能点击一次
			pushdateNum: '', //推送日期
			pushtimeList: [ //推送时间
				{
					name: '8',
				}, {
					name: '9'
				}, {
					name: '10'
				}, {
					name: '14'
				}, {
					name: '15'
				}, {
					name: '16'
				}, {
					name: '17'
				}, {
					name: '18'
				}, {
					name: '21'
				}, {
					name: '22'
				}, {
					name: '23'
				}
			],
			pushNum: '8', //推送时间选中的 也是传给后台的
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
			showCoupon: false,
			couponList: [], //优惠券列表
			selectCoupon: [], //选中的列表
			isactivityDetail: true //是否查看详情
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
		'selectCoupon': {
			deep: true,
			handler: function(val) {
				this.getCouponName(this.selectCoupon);
			}
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
		selexpirationTime: function(val) { //活动期限
			//this.durationName = this.durationList[i].name; //点击对应的名字
			this.durationId = val; //点击对应的id
		},
		selpushtime: function(val) { //推送时间
			//this.pushNum = this.pushtimeList[i].name; //点击对应的名字
			this.pushNum = val;
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
		checkForm: function() {
			if (!global.checkData({
					isclick: {
						cond: '$$!==true',
						pro: '请勿重复保存'
					},
					actName: '活动名称未设置',
					selectCoupon: {
						cond: '$$.length!=0',
						pro: '请关联优惠券'
					},
					pushdateNum: {
						reg: /^([0-9]|(1[0-9])|(2[0-9])|(3[0-1]))$/,
						pro: '请填写推送日期，推送日期必须为0~31的正整数'
					}
				}, this)) return false;
			return true;
		},
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
		'mulSelect': () =>
			import( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		'addCoupon': () =>
			import( /*webpackChunkName: 'associated_coupons'*/ 'src/components/associated_coupons'),
		selectBtn: () =>
			import( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
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
}


/*活动名称的输入框*/
.birth_act .online-box .rightHalf .coupon_name {
	float: left;
	display: block;
	width: 600px;
	height: 40px;
	line-height: 40px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

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













/*.sanjiao {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}

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

.tableListInp {
	color: #666;
	border: #b3b3b3 solid 1px;
	height: 39px;
	cursor: pointer;
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

.statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 36px;
	left: 0;
	z-index: 10;
	background: #fff;
}

.statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}


.statisticsList ul li {
	width: 100%;
	list-style: none;
	overflow: hidden;
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

.content-box:last-child:after {
	clear: both;
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
	background: url(../../../res/images/sign.png) right bottom no-repeat;
}

.box .btn-concent {
	padding-bottom: 0;
}

.box input {
	width: 350px;
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
	height: 100px;
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
	float: right;
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



.limit .icon-i {
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}


@media screen and (min-width:1024px) and (max-width:1440px) {
	.return {
		display: inline-block;
		width: 150px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		color: #e6ab4e;
		border: 1px solid #e6ab4e;
		cursor: pointer;
		float: right;
		margin-right: 150px;
	}
}*/
</style>