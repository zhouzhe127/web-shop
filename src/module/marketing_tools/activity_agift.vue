<template>
	<div class="member-agift" id="member-agift">
		<div class="header_tit">
			<span>活动设置</span>
			<!-- <a href="javascript:void(0)" class="fr" style="display: block;color: #c7c75a;height: 40px;width: 150px;text-align:center;border: 1px solid #c7c75a;"
			    @click="closePage">&lt; 返回活动列表</a> -->
		</div>
		<div class="main_Box" style="overflow: initial;">
			<div class="agift-content">
				<span class="fl required">活动标题</span>
				<input type="text" class="fl" placeholder="请输入活动标题" maxlength="20" v-model="title" />
			</div>
			<div class="agift-content clearfix" style="overflow:visible;">
				<span class="fl required">活动时间</span>
				<div class="fl" style="cursor: pointer;">
					<calendar :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
					<span class="fl" style="width: 50px;text-align: center;margin-right: 0;">-</span>
					<calendar :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
				</div>
				<span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
			</div>
			<div class="agift-content">
				<span class="fl required">活动范围</span>
				<template v-if="brandId == '3'">
					<div class="btn-concent" @click="openActivityWin">
						<button class="fl increase" style="width: 120px;">选择范围</button>
					</div>
					<span class="fl" v-if="activityList.length >= 1">已选择{{activityList.length}}家店铺</span>
				</template>
				<template v-else>
					<span style="width: auto;">{{shopName}}</span>
				</template>
			</div>
			<div class="agift-content">
				<span class="fl">活动群体</span>
				<span style="text-align: left;color: #A3A3A3;">全部会员</span>
			</div>
		</div>
		<div class="header_tit">
			<span>营销规则设置</span>
		</div>
		<div class="mani_Box">
			<div class="agift-content" style="overflow: inherit;height: 40px;">
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
				<span class="fl" v-if="couponLists.length >= 1">已选择{{couponLists.length}}张</span>
			</div>
			<div class="agift-content">
				<span class="fl">消息推送渠道</span>
				<mulSelect :styles="{backgroundColor:'rgb(247,247,247)'}" :list='list' @selOn='selOnSend' :selects="selects" :name='"name"' :keyName='"id"'></mulSelect>
				<span class="fl" style="width: auto;color: #666666;padding-left:20px">活动发布后将通过该渠道触发会员</span>
			</div>
			<!-- 内容设置 -->
			<div class="agift-content">
				<label>
					<span class="required required-none" style="vertical-align: top;padding-top: 10px;">内容设置</span>
					<textarea placeholder="内容设置" style="width: 350px;height: 100px;" v-model="memberContent" maxlength="151"></textarea>
				</label>
				<div class="limit">
					<p class="fl" style="margin-right: 102px;">
						<img class="icon-i" src="../../res/images/handle-tips.png" />限150字以内</p>
					<p class="fl" v-if="msmStatus">您已输入{{memberContent.length}}个字,目前发送{{Math.ceil(memberContent.length / 60)}}条短信</p>
				</div>
				<div class="limit">
					<p>引用参数:
						<a style="color:#FF9200;" :key='index' v-for="(item,index) in parameter" @click="addParameter(index,1)">{{item.name}}</a>
					</p>
				</div>

			</div>

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

		<rang @winEvent='rangEvent' :activityList='activityList' v-if='showRang'></rang>
		<coupon @winEvent='couponEvent' :selectCoupon='couponLists' v-if='showCoupon'></coupon>
	</div>
</template>

<script>
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
					time: new Date().getTime()
				},
				returnInt: 1, //相差天数
				list: [
					{
						'name': '微信',
						'id': '1'
					}
				],
				selects: [], //选中的状态
				msmStatus: false, //短信状态
				lists: [
					{
						'name': '电子优惠劵',
						'id': '1',
					}, 
					{
						'name': '无',
						'id': '2',
					}
				],
				isList: false,
				brandId: 0, //3为品牌 0为单店
				onListName: '无',
				activityList: [], //选择活动范围列表
				couponLists: [], //已选择优惠劵
				explain: '',
				memberRights: -1,
				title: '', // 活动标题
				compareArr: [], //用于比较优惠劵数组
				shopName: '',
				edit: false,
				activityDetail: {},
				memberContent: '', //内容设置
				parameter: [
					{
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
				showCoupon: false
			};
		},
		computed: {
			start: {
				get: function () {
					return utils.format(this.startObj.time, 'yyyy/MM/dd');
				}
			},
			end: {
				get: function () {
					return utils.format(this.endObj.time, 'yyyy/MM/dd');
				}
			},
			titles: {
				get: function () {
					return this.title;
				},
				set: function (newValue) {
					this.title = newValue;
				}
			}
		},
		methods: {
			selOnSend(arr) {
				this.selects = arr;
			},
			getStartTime(str) {
				this.startObj.time = str;
			},
			getEndTime(str) {
				this.endObj.time = str;
			},
			addParameter: function (index) { //添加参数
				this.memberContent += this.parameter[index].id;
			},
			timeChange: function () {

				//相差天数计算
				this.returnInt = Math.ceil((new Date(this.endObj.time).getTime() - new Date(this.startObj.time).getTime()) / (1000 *60 * 60 * 24));
			},
			openSelect: function () {
				// 打开list列表
				this.isList = !this.isList;
			},
			getListDetail: function (item, index) {
				// 获取设置list详情
				this.onListName = item.name;
				this.memberRights = index;

				if (this.memberRights != 0) {
					this.couponLists = [];
				}
			},
			openActivityWin: function () {
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
					this.couponLists = obj.data.select;
				}
			},
			openCouponWin: function () {
				this.showCoupon = true;

			},
			closePage: function () {
				// 关闭页面
				this.$router.push('/admin/activity');
			},
			getCouponList: function (arr1, arr2) {
				// 获取保存优惠劵数据
				let arr = [];
				for (let i = 0; i < arr1.length; i++) {
					for (let j = 0; j < arr2.length; j++) {
						if (arr1[i] == arr2[j].id) {
							arr.push({
								id: arr2[j].id,
								name: arr2[j].name
							});
						}
					}
				}
				return arr;
			},
			getCouponId: function (arr, type) {
				let i;
				let arr1 = [];
				arr = (type != 1) ? JSON.parse(arr) : arr;
				for (i = 0; i < arr.length; i++) {
					arr1.push(arr[i].id);
				}
				return arr1;
			},
			async getNoLimitCoupon() {
				// 获取优惠劵

				let data = await http.getCouponCondition({
					data: {}
				});
				this.compareArr = utils.deepCopy(data);
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

				if (this.startObj.time > this.endObj.time) {
					this.$store.commit('setWin', {
						content: '开始时间不能大于结束时间',
						timerPowerOff: 1000
					});
					return false;
				}
				if (this.endObj.time < this.startObj.time) {
					this.$store.commit('setWin', {
						content: '结束时间不能小于开始时间',
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
					this.activityList = [];
					this.activityList.push(this.userData.currentShop.id);
				}

				if (utils.isEmptyObject(this.activityList)) {
					this.$store.commit('setWin', {
						content: '请选择活动范围',
						timerPowerOff: 1000
					});
					return false;
				}

				let arr = [];
				let obj = {
					//      			couponIds : this.getCouponList(this.couponLists,this.compareArr),
					couponIds: this.couponLists,
					minConsume: '',
					maxConsume: '',
					isLoop: '0',
					memberRights: Number(!(this.memberRights)),
					pushChannel: this.selects.toString().replace(/,/g, ''),
					msgContent: this.memberContent
				};
				arr.push(obj);


				if (this.edit) {
					// 修改信息
					this.activityDetail.name = this.title;
					this.activityDetail.startTime = Math.round(this.startObj.time / 1000);
					this.activityDetail.endTime = Math.round(this.endObj.time / 1000);
					this.activityDetail.shopIds = this.activityList.toString();
					arr[0].id = this.activityDetail.rule[0].id;
					this.activityDetail.rule = utils.deepCopy(arr);
					this.activityDetail.isAuto = type;
					//delete this.activityDetail.rule;

					await http.editActivity({
						data: {
							activityId: storage.session('activityInfo').id,
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
					await http.addActivity({
						data: {
							shopIds: this.activityList.toString(),
							type: storage.session('activityType').type,
							name: this.title,
							mouldType: storage.session('activityType').mouldType,
							objectType: '2',
							startTime: Math.round(this.startObj.time / 1000),
							endTime: Math.round(this.endObj.time / 1000),
							isAuto: type,
							getType: '0',
							explain: this.explain, //活动说明
							rule: JSON.stringify(arr)
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
				this.title = activityDetail.name;
				this.startObj.time = Number(Math.round(activityDetail.startTime * 1000));
				this.endObj.time = Number(Math.round(activityDetail.endTime * 1000));
				this.activityList = activityDetail.shopIds == null ? [] : activityDetail.shopIds.split(',');
				this.selects = activityDetail.rule[0].pushChannel.length > 1 ? activityDetail.rule[0].pushChannel.split('').toString()
					.split(',') : activityDetail.rule[0].pushChannel.split(',');
				this.explain = activityDetail.explain; //活动说明
				this.memberContent = activityDetail.rule[0].msgContent;
				this.couponLists = JSON.parse(activityDetail.rule[0].couponIds);
				this.activityDetail = utils.deepCopy(activityDetail);
				this.edit = true;
				this.memberRights = Number(!(Number(activityDetail.rule[0].memberRights)));
				this.onListName = (this.memberRights == 0) ? '电子优惠卷' : '无';


			}
		},
		watch: {
			'startObj.time': 'timeChange',
			'endObj.time': 'timeChange',
			'selects': function () {
				if (this.selects.indexOf('2') != -1) {
					this.msmStatus = true;
				} else {
					this.msmStatus = false;
				}
			},
			'memberContent': function () {

				if (this.memberContent.length > 150) {
					this.$store.commit('setWin', {
						content: '仅限150个字符'
					});
					this.memberContent = this.memberContent.substr(0, 150);
				}
			},
			'explain': function () {
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
			'coupon': () =>
				import ( /* webpackChunkName:'activity_agift_coupon' */ './activity_agift_coupon'),
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
			this.ischain = this.userData.currentShop.ischain;
			this.shopName = this.userData.currentShop.name;
			let activityInfo = storage.session('activityInfo');
			if (activityInfo) {
				this.getActivityDetail(activityInfo);
			}
			this.getNoLimitCoupon();
		},
		beforeDestroy() {
			storage.session('activityInfo', null);
		}
	};
</script>

<style scoped>
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
		background: url(../../res/images/handle-tips.png) left center no-repeat;
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