<template>
	<section class='birth_act'>
		<div class="info-title">
			<span class="title">生日活动</span>
			<span class="line"></span>
			<!-- <span class="return" @click="returnAct">&lt;&nbsp;返回活动列表</span> -->
		</div>
		<div class="box">
			<label>
				<span class="required">活动标题</span>
				<input type="text" maxlength="20" placeholder="请输入活动标题" v-model="actName" />
			</label>
		</div>
		<div class="box">
			<label>
				<span class="required">活动对象</span>
				<span style="display: inline-block;width: 200px;height: 40px;background: #f8f8f8;line-height: 40px;padding-left: 5px;">全体会员</span>
			</label>
		</div>
		<div class="box">
			<span class="required" style="vertical-align: top;padding-top: 10px;">关联优惠券</span>
			<div class="btn-concent" style="display: inline-block;">
				<button class="increase" style="width: 200px;" @click="addCount">选择关联优惠券</button>
			</div>
			<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
		</div>
		<div class="content-box">
			<span class="required">活动期限</span>
			<section class="statisticsList" style="display: inline-block;width: 200px;vertical-align: middle;">
				<section @click="showhighList" class="tableListInp chairFix">
					<span style="height: 38px;width: 157px;display: block;float: left;text-align: center;border-right: 1px #B3B3B3 solid;">{{high}}</span>
					<div class="fl">
						<i class='sanjiao'></i>
					</div>
				</section>
				<ul v-if="highLimit" class="tableListUl">
					<li @click="costhighShow(index)" :key='index' v-for='(item,index) in timeLimit'>{{item.name}}</li>
				</ul>
			</section>
		</div>
		<!-- 推送日期 -->
		<div class="content-box">
			<span class="required">推送日期</span>
			<section class="statisticsList" style="display: inline-block;vertical-align: middle;line-height: 40px;font-size: 14px;">
				提前
				<input type="text" name="" placeholder="请输入推送日期" v-model="pushdateNum" style="display: inline-block;width: 200px;height: 36px;text-align: center;line-height: 38px;margin: 0 10px;" />天,发起生日活动推送
			</section>
		</div>
		<!-- 推送时间 -->
		<div class="content-box clearfix">
			<span class="required fl">推送时间</span>
			<div class="fl" style="height: 40px;display: flex;align-items: center;">
				每日
				<section class="statisticsList" style="display: inline-block;vertical-align: middle;width:200px;height: 40px;margin:0 10px;" @click="showpushList">
					<section class="tableListInp chairFix">
						<span style="height: 38px;width: 157px;display: block;float: left;text-align: center;border-right: 1px #B3B3B3 solid;">{{pushNum}}</span>
						<div class="fl">
							<i class='sanjiao'></i>
						</div>
					</section>
					<ul v-if="pushtimeStauts" class="tableListUl">
						<li @click="pushutimeShow(index)" v-for='(item,index) in pushtime' :key='index'>{{item.name}}</li>
					</ul>
				</section>时,发起生日活动推送
			</div>
		</div>
		<div class="box">
			<label>
				<span class="required">获得方式</span>
				<span style="display: inline-block;width: 200px;height: 40px;background: #f8f8f8;line-height: 40px;padding-left: 5px;color: ;">自动获得</span>
			</label>
		</div>
		<!-- 活动通知 -->
		<div class="info-title">
			<span class="title">活动通知</span>
			<span class="line"></span>
		</div>
		<!-- 消息推送渠道 -->
		<div class="content-box" style='overflow: hidden;'>
			<span class=" req required-none fl">消息推送渠道</span>
			<span class="fl">
				<mulSelect :styles="{backgroundColor:'rgb(240,240,240)'}" :list='goodsType' @selOn='selOn' :selects="goodsSelect" :name='"name"' :keyName='"id"'></mulSelect>
			</span>
			<div class="fl handle-tips">
				<i></i> 活动发布后将通过该渠道触发会员
			</div>
		</div>
		<!-- 内容设置 -->
		<div class="box">
			<label style='margin-left:90px;'>
				<span style="vertical-align: top;padding-top: 10px;margin-right: 17px; width: 150px;text-align: right;">内容设置</span>
				<textarea placeholder="请输入内容设置" style="width: 350px;height: 100px;" v-model="contentSetting" maxlength="151"></textarea>
			</label>
			<div class="limit">
				<p class="fl" style="margin-right: 102px;line-height: 18px;">
					<img class="icon-i" src="../../res/icon/i.png" />限150字以内</p>
				<p class="fl" style="line-height: 18px;" v-if="msmStatus">您已输入
					<span>{{contentSetting.length}}</span>个字,目前发送
					<span>{{Math.ceil(contentSetting.length / 60)}}</span>条短信</p>
			</div>
			<div class="limit">
				<p>引用参数:
					<a style="color:#FF9200;" :key='index' v-for="(item,index) in parameter" @click="addParameter(index,1)">{{item.name}}</a>
				</p>
			</div>
		</div>
		<!-- 活动说明 -->
		<div class="box">
			<label>
				<span class=" req required-none" style="vertical-align: top;">活动说明</span>
				<textarea placeholder="请输入活动说明" style="width: 350px;height: 100px;" v-model="explain" maxlength="151"></textarea>
			</label>
			<p class="limit">
				<img class="icon-i" src="../../res/icon/i.png" />限150字以内</p>
		</div>
		<div class="box" style="margin-top: 100px;padding-left: 70px;">
			<a href="javascript:void(0);" class="gray" style="width: 200px;" @click="cancel">取消</a>
			<a href="javascript:void(0);" class="gray" style="width: 200px;background: #858585;" @click="birthSave('0')">保存</a>
			<a v-show="issue" href="javascript:void(0);" class="yellow" style="width: 200px;" @click="birthSave('1')">发布</a>
		</div>
		<birthCoupon v-if='showBirthCoupon' :selectCoupon='selectCoupon' :couponList='couponList' @winEvent='winEvent'></birthCoupon>
	</section>
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
			ischain: null, //店铺id 品牌店/单店
			edit: false, //是否为编辑
			editId: '', //编辑id
			actName: '', //生日活动名称
			sel: 0, //生日活动期限
			explain: '', //生日活动说明
			totalSel: 0, //发放数量默认选中值
			giveNum: '', //发放数量
			//发放数量
			total: [{
				text: '不设限制',
				value: '0'
			}, {
				text: '设定总数',
				value: '1'
			}],
			digit: false, //发放数量总数填写是否显示

			dayGiveLimit: '', //每日发放上限

			num: true, //店内活动 数量限制显示

			customName: '', //自定义活动名称
			customExplain: '', //自定义活动说明
			indexCustom: 0, //单选选中
			customIds: [], //自定义设置店内选中优惠券
			customIds1: [], //自定义设置会员选中优惠券

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
			buttonList: [{
				'name': '未发布'
			}, {
				'name': '发布中'
			}, {
				'name': '已发布'
			}, {
				'name': '已下架'
			}, {
				'name': '已结束'
			}],
			flag: 0, //当前选中按钮
			change: 0, //监控按钮是否发生变化
			acti: true, //活动列表显示
			birth: false, //生日活动设置显示
			custom: false, //自定义设置 显示
			timeLimit: [{
				'name': '永久',
				value: '1'
			}, {
				'name': '一年',
				value: '2'
			}, {
				'name': '二年',
				value: '0'
			}, ],
			highLimit: false, //生日活动期限下拉框显示
			high: '永久',
			pushdateNum: '',
			pushtime: [ //推送时间
			{
				'name': '8',
				value: '1'
			}, {
				'name': '9',
				value: '2'
			}, {
				'name': '10',
				value: '3'
			}, {
				'name': '14',
				value: '4'
			}, {
				'name': '15',
				value: '5'
			}, {
				'name': '16',
				value: '6'
			}, {
				'name': '17',
				value: '7'
			}, {
				'name': '18',
				value: '8'
			}, {
				'name': '21',
				value: '9'
			}, {
				'name': '22',
				value: '10'
			}, {
				'name': '23',
				value: '11'
			}
			],
			pushtimeStauts: false, //生日活动期限下拉框显示
			pushNum: '8',
			customList: [{
				'name': '店内'
			}, {
				'name': '会员'
			}, ],
			goodsType: [{
				'name': '微信',
				'id': '1'
			}], //消息推送渠道
			goodsSelect: [], //消息推送渠道选中
			customSelect: [], //自定义活动选择的
			msmStatus: false, //短信开关状态
			marketingStatus: false, //自定义活动的状态
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
			}, {
				'name': '强制使用'
			}, ],
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
			customParameter: [{
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
			}],
			showAdd: false,
			showBirthCoupon: false,
			couponList: [], //优惠券列表
			selectCoupon: [] //选中的列表
		};
	},
	watch: {
		'goodsSelect': function() {
			if (this.goodsSelect.indexOf('2') != -1) {
				this.msmStatus = true;
			} else {
				this.msmStatus = false;
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
		'contentSetting': function() {
			if (this.contentSetting.length > 150) {
				this.$store.commit('setWin', {
					content: '仅限150个字符'
				});
				this.contentSetting = this.contentSetting.substr(0, 150);
			}
		}
	},
	methods: {
		addParameter: function(index, type) { //添加参数
			if (type == 1) {
				this.contentSetting += this.parameter[index].id;
			} else {
				this.customActivity += this.customParameter[index].id;
			}
		},
		winEvent(obj) {
			this.showBirthCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.select;
				this.couponList = obj.data.list;
			}

		},
		selOn(arr) {
			this.goodsSelect = arr;
		},
		returnAct() {
			this.$router.push('/admin/activity');
		},
		//生日活动关联优惠券弹窗
		async addCount() {
			let data = await http.getGetCouponCondition({
				data: {
					flag: 1
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

			this.showBirthCoupon = true;

		},
		costhighShow: function(index) {
			if (index == 0) {
				this.high = '永久';
				this.highestConsume = '';
				this.sel = 0;
			}
			if (index == 1) {
				this.high = '一年';
				this.sel = 1;
			}
			if (index == 2) {
				this.high = '二年';
				this.sel = 2;
			}
			this.highLimit = false;
		},
		showpushList: function() {
			this.pushtimeStauts = !this.pushtimeStauts;
		},
		pushutimeShow: function(index) {
			let obj = {
				'0': '8',
				'1': '9',
				'2': '10',
				'3': '14',
				'4': '15',
				'5': '16',
				'6': '17',
				'7': '18',
				'8': '21',
				'9': '22',
				'10': '23',
			};
			this.pushNum = obj[index];
			this.highLimit = false;

		},
		//生日活动期限下拉框选择
		showhighList: function() {
			this.highLimit = !this.highLimit;
		},
		async birthSave(type) {

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

			if (!this.edit) {
				let arr = [];
				let obj = {
					couponIds: this.selectCoupon,
					pushChannel: this.goodsSelect.toString().replace(/,/g, ''),
					msgContent: this.contentSetting //内容设置
				};
				arr.push(obj);

				await http.addActivity({
					data: {
						type: 0, //活动类别
						mouldType: 0, //长期活动模板
						name: this.actName, //活动名
						advanceTime: this.pushdateNum + ',' + this.pushNum, //生日活动 自定义提前推送时间  天数,推送整点
						explain: this.explain, //活动说明
						objectType: 1, //活动对象
						shopIds: this.shopList.toString(), //关联门店
						limit: this.sel, //活动期限
						getType: 0, //获得方式
						isAuto: type, //保存 
						rule: JSON.stringify(arr)
					}
				});

				this.isclick = true;
				let message = (type == '0') ? '保存成功' : '发布成功';
				this.$store.commit('setWin', {
					content: message,
					callback: () => {
						this.returnAct();
						this.isclick = false;
					}
				});

			} else {

				this.activityDetail.name = this.actName;
				this.activityDetail.advanceTime = this.pushdateNum + ',' + this.pushNum; //推送日期和推送时间
				this.activityDetail.explain = this.explain;
				this.activityDetail.rule[0].couponIds = this.selectCoupon;
				this.activityDetail.rule[0].msgContent = this.contentSetting; //内容设置
				this.activityDetail.rule[0].pushChannel = this.goodsSelect.toString().replace(/,/g, ''); //选择渠道
				this.activityDetail.limit = this.sel;
				this.activityDetail.rule = utils.deepCopy(this.activityDetail.rule);
				this.activityDetail.isAuto = type;

				await http.editActivity({
					data: {
						activityId: this.editId,
						data: JSON.stringify(this.activityDetail)
					}
				});
				this.isclick = true;
				let message = (type == '0') ? '保存成功' : '发布成功';
				this.$store.commit('setWin', {
					content: message,
					callback: () => {
						this.returnAct();
						this.isclick = false;
					}
				});

			}
		},
		cancel() {
			this.returnAct();
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
			this.actName = data.name;
			this.explain = data.explain;
			this.pushdateNum = data.advanceTime.split(',')[0]; //推送日期
			this.pushNum = data.advanceTime.split(',')[1]; //推送时间
			this.goodsSelect = data.rule[0].pushChannel.length > 1 ? data.rule[0].pushChannel.split('').toString().split(',') :
				data.rule[0].pushChannel.split(','); //消息推送渠道
			this.contentSetting = data.rule[0].msgContent; //内容设置
			this.goodsIds = JSON.parse(data.rule[0].couponIds);
			this.miCount = JSON.parse(data.rule[0].couponIds);

			this.selectCoupon = JSON.parse(data.rule[0].couponIds);
			this.sel = data.limit;
			this.edit = true;
			if (this.sel == 0) {
				this.high = '永久';
			} else if (this.sel == 1) {
				this.high = '一年';
			} else {
				this.high = '二年';
			}
			this.issue = false;
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
		let activityInfo = storage.session('activityInfo');
		if (activityInfo) {
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
	min-width: 980px;
}

.sanjiao {
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
	background: url(../../res/images/sign.png) right bottom no-repeat;
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
}
</style>