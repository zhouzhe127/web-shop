<template>
	<!-- 裂变活动 -->
	<div id="fissoin">
		<!-- 活动设置 -->
		<div class="set-line">
			<div class="titles">活动设置</div>
			<div class="line"></div>
		</div>
		<!-- 活动标题 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动标题</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入活动标题" v-model='activityName' />
			</div>
		</div>
		<!-- 活动时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">活动时间</span>
			<div class="rightHalf">
				<div class="fl" style="cursor: pointer;">
					<calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
					<span class="fl" style="width: 40px;text-align: center;margin-right: 0;">-</span>
					<calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
				</div>
				<span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
			</div>
		</div>
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">活动对象</span>
			<div class="rightHalf">
				<span class="fans">全体会员</span>
			</div>
		</div>
		<!-- 会员日设置 -->
		<!-- 活动对象 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">会员日设置</span>
			<div class="rightHalf">
				<use-time :useDate="useDate" @getTime="getResult"></use-time>
			</div>
		</div>
		<!-- 营销规则设置 -->
		<div class="set-line">
			<div class="titles">营销规则设置</div>
			<div class="line"></div>
		</div>
		<!-- 框框 -->
		<div class="rules">
			<div class="ruleList">
				<span v-for="(item,index) in ruleObj" :class="ruleIndex == index ? 'active' : ''" @click="getDetails(index)">{{item.levelName}}</span>
			</div>
			<div class="rulecontent" v-for="(item,index) in ruleObj" v-if='ruleIndex == index'>
				<!-- 享有会员折扣 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">享有会员折扣</span>
					<onOff :key='1' :status="item.isDiscount" @statusChange="openflipSwitch"></onOff>
				</div>
				<!-- 享多少折 -->
				<div class="online-box clearfix" v-if='item.isDiscount '>
					<span class="online-sub fl">折扣率</span>
					<div class="rightHalf">
						<section>
							<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="2" v-model="item.discountParam" onkeyup="value=value.replace(/[^\d]/g,'')" />
							<span>%</span>
						</section>
					</div>
				</div>
				<!-- 享有积分翻倍 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">享有积分翻倍</span>
					<onOff :key='1' :status="item.isDouble" @statusChange="doubleIntegral"></onOff>
				</div>
				<!-- 积分获取 -->
				<div class="online-box clearfix" v-if='item.isDouble'>
					<span class="online-sub fl">积分获取</span>
					<div class="rightHalf">
						<singleSelect :index='item.pointType' @selOn='haveIndex' :styles="{width:'108px',border: '1px solid #cecdcd',marginRight: '8px'}" :list="list" :name="'name'" :key='"id"'></singleSelect>
					</div>
				</div>
				<!-- 设置改等级积分比例 -->
				<div class="online-box clearfix" v-if="item.isDouble == true && item.pointType == 0">
					<span class="online-sub fl">设置该等级积分比例</span>
					<div class="fl setinp">
						<input type="text" placeholder="请输入现金" v-model="item.cash" onkeyup="value=value.replace(/[^\d.]/g,'')" maxlength="6" class="fl" @blur="formatValue('cash')" />
						<i class="fl colon">:</i>
						<input type="text" placeholder="请输入积分" v-model="item.point" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="8" class="fl" />
					</div>
				</div>
				<!-- 设置倍数 -->
				<div class="online-box clearfix" v-if="item.isDouble == true && item.pointType == 1">
					<span class="online-sub fl">获得基础积分</span>
					<div class="fl setinp">
						<section class="sinp">
							<input type="text" class="cumulative" placeholder="请输入倍数" maxlength="5" v-model="item.pointMultiples" @blur="formatValue('pointMultiples')" onkeyup="value=value.replace(/[^\d.]/g,'')" />
							<span>倍</span>
						</section>
						<div class="fl handle-tips">
							<i></i> 允许输入区间：0.01~99.99
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 取消保存 -->
		<div class="online-box clearfix" style="padding-left:100px;">
			<a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;background-color: #a7a7a7;" @click='closePage'>取消</a>
			<a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;" @click="saveConfig(' 0 ')">保存</a>
			<a v-if="editId == ''" href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click="saveConfig(' 1 ')">发布</a>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

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
				name: '按比例',
				id: 0
			}, {
				name: '按积分规则',
				id: 1
			}],
			useDate: {
				'list': ['指定每周使用时段', '指定每月使用日期和时段 '],
				'index': 0,
				'week': [{
					'startslotH': '12',
					'startslotM': '00',
					'endslotH': '00',
					'endslotM': '00',
					'isNextDay': false,
					'week': []
				}], //周
				'month': [{
					'startslotH': '12',
					'startslotM': '00',
					'endslotH': '00',
					'endslotM': '00',
					'isNextDay': false,
					'month': []
				}], //月
				'show': false
			}, //使用时段 
			activityName: '', //活动的名称
			discount: '', //折扣	
			editId: '', //编辑任务时的任务Id
			ruleId: '', //规则ID
			gradeList: [], //会员等级列表
			ruleIndex: 0, //点中的第几个
			ruleObj: [], //规则列表
		};
	},
	methods: {
		closePage: function() {
			// 关闭页面
			this.$router.push('/admin/activity');
		},
		openflipSwitch: function(res) {
			this.ruleObj[this.ruleIndex].isDiscount = res;
		},
		doubleIntegral: function(res) { //开启积分翻倍
			this.ruleObj[this.ruleIndex].isDouble = res;
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
		valiData(content, title, winType) {
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		transformDate(t) { //日期格式化
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		haveIndex(i) { //积分获取
			this.ruleObj[this.ruleIndex].pointType = i;
		},
		getResult: function(val) { //使用时间段
			this.useDate = val;
			//console.log(JSON.stringify(val))
		},
		changeArrToNeed(arr, type) {
			let na = [];
			for (let i = 0; i < arr.length; i++) {
				let obj = {};
				obj.startslotH = arr[i].startslot.split(':')[0];
				obj.startslotM = arr[i].startslot.split(':')[1];
				obj.endslotH = arr[i].endslot.split(':')[0];
				obj.endslotM = arr[i].endslot.split(':')[1];
				obj.isNextDay = arr[i].isNextDay;
				if (type == 'w') {
					obj.week = arr[i].week;
				} else if (type == 'm') {
					obj.month = arr[i].month;
				}
				na.push(obj);
			}
			return na;
		},
		checkForm: function() {
			let arr = [];
			let alertText = '';
			if (this.activityName == '') {
				this.valiData('活动标题不能为空!');
				return false;
			}
			if (this.useDate.index == 0) {
				arr = this.useDate.week;
				alertText = '使用时段请选择日期(周)';
			} else if (this.useDate.index == 1) {
				arr = this.useDate.month;
				alertText = '使用时段请选择日期(月)';
			}
			for (let i = 0; i < arr.length; i++) {
				if (this.useDate.index == 0) {
					if (arr[i].week.length == 0) {
						this.valiData(alertText);
						return false;
					}
				} else if (this.useDate.index == 1) {
					if (arr[i].month.length == 0) {
						this.valiData(alertText);
						return false;
					}
				}
			}
			for (let i = 0; i < this.ruleObj.length; i++) {
				if (this.ruleObj[i].isDiscount && this.ruleObj[i].discountParam == '') {
					this.valiData(`请填写${this.ruleObj[i].levelName}的折扣率!`);
					return false;
				}
				if (this.ruleObj[i].isDouble && this.ruleObj[i].pointType == 0) {
					if (this.ruleObj[i].cash == '') {
						this.valiData(`请填写${this.ruleObj[i].levelName}的比例现金!`);
						return false;
					}
					if (this.ruleObj[i].point == '') {
						this.valiData(`请填写${this.ruleObj[i].levelName}的比例积分!`);
						return false;
					}
				}
				if (this.ruleObj[i].isDouble && this.ruleObj[i].pointType == 1) {
					if (this.ruleObj[i].pointMultiples == '') {
						this.valiData(`请填写${this.ruleObj[i].levelName}的积分倍数!`);
						return false;
					}
					if (Number(this.ruleObj[i].pointMultiples) <= 0 || Number(this.ruleObj[i].pointMultiples) > 99.99) {
						this.valiData(`${this.ruleObj[i].levelName}的积分倍数区间应为0.01～99.99!`);
						return false;
					}
				}
			}
			return true;
		},
		changeArr(arr, type) {
			let nArr = [];
			for (let i = 0; i < arr.length; i++) {
				let o = {};
				if (type == 'w') {
					o.week = arr[i].week.sort(function(a, b) {
						return a - b;
					});

				} else if (type == 'm') {
					o.month = arr[i].month.sort(function(a, b) {
						return a - b;
					});
				}
				o.isNextDay = arr[i].isNextDay;
				let startslot = (arr[i].startslotH + ':' + arr[i].startslotM);
				let endslot = (arr[i].endslotH + ':' + arr[i].endslotM);
				o.startslot = startslot;
				o.endslot = endslot;
				nArr.push(o);
			}
			return nArr;
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
			let useTime = {};
			if (this.useDate.index == 0) {
				useTime.type = 'week';
				useTime.list = this.changeArr(this.useDate.week, 'w');
			}
			if (this.useDate.index == 1) {
				useTime.type = 'month';
				useTime.list = this.changeArr(this.useDate.month, 'm');
			}
			//useTime = JSON.stringify(useTime);
			let levelRule = {}; //规则设置
			for (let item of this.ruleObj) {
				let key = item.levelId;
				levelRule = Object.assign(levelRule, {
					[key]: {
						levelId: item.levelId,
						levelName: item.levelName,
						isDiscount: Number(item.isDiscount),
						discountParam: item.discountParam,
						isDouble: Number(item.isDouble),
						pointType: item.pointType,
						point: item.point,
						cash: item.cash,
						pointMultiples: item.pointMultiples
					}
				});
			}
			let arr = [];
			let obj = {
				couponIds: {
					useTimeRule: useTime, //使用时间段
					levelRule: levelRule
				},
			};
			arr.push(obj);
			await http.fissionActivity({
				data: {
					type: 5, //活动类别
					mouldType: 0, //长期活动模板
					name: this.activityName, //活动名
					objectType: 2, //活动对象
					startTime: parseInt(this.startObj.time / 1000), //开始时间
					endTime: parseInt(this.endObj.time / 1000), //结束时间
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
			activityDetail.type = 5;
			activityDetail.mouldType = 0;
			activityDetail.name = this.activityName;
			activityDetail.objectType = 2;
			activityDetail.startTime = parseInt(this.startObj.time / 1000);
			activityDetail.endTime = parseInt(this.endObj.time / 1000);
			activityDetail.isAuto = type;
			activityDetail.rule = [];
			let useTime = {};
			if (this.useDate.index == 0) {
				useTime.type = 'week';
				useTime.list = this.changeArr(this.useDate.week, 'w');
			}
			if (this.useDate.index == 1) {
				useTime.type = 'month';
				useTime.list = this.changeArr(this.useDate.month, 'm');
			}
			//useTime = JSON.stringify(useTime);
			let levelRule = {}; //规则设置
			for (let item of this.ruleObj) {
				let key = item.levelId;
				levelRule = Object.assign(levelRule, {
					[key]: {
						levelId: item.levelId,
						levelName: item.levelName,
						isDiscount: Number(item.isDiscount),
						discountParam: item.discountParam,
						isDouble: Number(item.isDouble),
						pointType: item.pointType,
						point: item.point,
						cash: item.cash,
						pointMultiples: item.pointMultiples
					}
				});
			}
			let arr = [];
			let obj = {
				id: this.ruleId,
				couponIds: {
					useTimeRule: useTime, //使用时间段
					levelRule: levelRule
				},
			};
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
			let data = await http.getActivityDetails({
				data: {
					activityId: item.id
				}
			});
			if (data) {
				this.activityName = data.name; //活动名称
				this.startObj.time = data.startTime * 1000; //开始时间
				this.endObj.time = data.endTime * 1000; //结束时间
				this.ruleId = data.rule[0].id; //规则id
				if (utils.isEmptyObject(data.rule[0].couponIds.useTimeRule)) {
					this.useDate.index = 0;
				}
				if (!utils.isEmptyObject(data.rule[0].couponIds.useTimeRule) && data.rule[0].couponIds.useTimeRule.type == 'week') {
					this.useDate.index = 0;
				}
				if (!utils.isEmptyObject(data.rule[0].couponIds.useTimeRule) && data.rule[0].couponIds.useTimeRule.type == 'month') {
					this.useDate.index = 1;
				}
				if (this.useDate.index == 0) {
					if (data.rule[0].couponIds.useTimeRule && data.rule[0].couponIds.useTimeRule.list) {
						this.useDate.week = this.changeArrToNeed(data.rule[0].couponIds.useTimeRule.list, 'w');
					}
				}
				if (this.useDate.index == 1) {
					if (data.rule[0].couponIds.useTimeRule && data.rule[0].couponIds.useTimeRule.list) {
						this.useDate.month = this.changeArrToNeed(data.rule[0].couponIds.useTimeRule.list, 'm');
					}
				}
				//规则细分
				let levelRule = data.rule[0].couponIds.levelRule;
				for (let item of this.ruleObj) {
					for (let key in levelRule) {
						if (item.levelId == key) {
							item.cash = levelRule[key].cash; //金额
							item.discountParam = levelRule[key].discountParam;
							item.isDiscount = Boolean(levelRule[key].isDiscount);
							item.isDouble = Boolean(levelRule[key].isDouble);
							item.point = levelRule[key].point;
							item.pointMultiples = levelRule[key].pointMultiples;
							item.pointType = levelRule[key].pointType;
							break;
						}
					}
				}
			}
		},
		async getList() {
			// 获取会员等级列表
			let res = await http.memberGetList({
				data: {}
			});
			this.gradeList = res;
			for (let item of this.gradeList) {
				let obj = {
					levelId: item.id, //会员等级id
					levelName: item.name, //会员等级名称
					isDiscount: false, //会员折扣开关
					discountParam: '', //折扣率
					isDouble: false, //享有翻倍
					pointType: 0, //积分获取类型
					point: '', //积分
					cash: '', //现金
					pointMultiples: '' //基础积分倍数
				};
				this.ruleObj.push(obj);
			}
		},
		getDetails: function(index) {
			// 获取规则详情
			this.ruleIndex = index;
		},
		formatValue: function(model) {
			this.ruleObj[this.ruleIndex][model] = utils.toFloatStr(this.ruleObj[this.ruleIndex][model], 2);
		},
	},
	components: {
		'can-multi': () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		onOff: () =>
			import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		'singleSelect': () =>
			import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
		'use-time': () =>
			import ( /* webpackChunkName:'activity_usetime' */ './activity_usetime'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
	},
	watch: {
		'startObj.time': 'timeChange',
		'endObj.time': 'timeChange',
	},
	async mounted() {
		this.$store.commit('setPageTools', [{
			name: '<返回活动列表',
			className: ['activity'],
			fn: () => {
				this.closePage();
			}
		}]);
		await this.getList(); //获取会员等级列表
		let activityInfo = storage.session('activityInfo');
		if (activityInfo) {
			this.editId = activityInfo.id;
			this.getActivityDetail(activityInfo);
		}
	},
	beforeDestroy() {
		//将编辑的任务缓存清掉
		storage.session('activityInfo', null);
	}
};
</script>
<style scoped>
#fissoin {
	width: 1200px;
	height: auto;
}

#fissoin .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#fissoin .rules {
	width: 700px;
	height: 400px;
	margin-left: 78px;
	margin-bottom: 26px;
}

#fissoin .rules .ruleList {
	width: 100%;
	height: 50px;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
	/* ul中的内容不换行 */
}

#fissoin .rules .ruleList span {
	display: inline-block;
	min-width: 100px;
	height: 40px;
	background-color: #F2F2F2;
	text-align: center;
	line-height: 40px;
	/* float: left; */
	margin-right: 10px;
}

#fissoin .rules .rulecontent {
	padding-top: 26px;
	width: 100%;
	height: 349px;
	border: 1px solid #B3B3B3;
}

#fissoin .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#fissoin .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#fissoin .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#fissoin .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#fissoin .online-box .rightHalf {
	max-width: 1000px;
	height: auto;
	float: left;
}

#fissoin .online-box .rightHalf span {
	line-height: 40px;
}

#fissoin .online-box .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

#fissoin .online-box .rightHalf .name {
	width: 280px;
	height: 41px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#fissoin .online-box .cleander {
	width: 310px;
	height: 40px;
	border: 1px solid #999;
	float: left;
}

#fissoin .online-box .cleander_o {
	width: 100%;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	text-align: center;
}

#fissoin .online-box .cleander_t {
	float: left;
	width: 40%;
	height: 40px;
	text-align: center;
}

#fissoin .online-box .cleander_f {
	float: left;
	width: 20%;
	height: 40px;
	text-align: center;
}

#fissoin .online-box .cleander_s {
	float: left;
	width: 40%;
	height: 40px;
	text-align: center;
}

#fissoin .triangle {
	border: 1px solid #999;
	width: 40px;
	float: left;
	height: 40px;
	border-left: none;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
}

#fissoin .foday {
	width: 80px;
	float: left;
	height: 40px;
	font-size: 12px;
	text-align: left;
	color: #00a1e9;
	padding-left: 10px;
	line-height: 40px;
}

#fissoin .online-box .rightHalf .fans {
	line-height: 40px;
}

#fissoin .online-box .rightHalf section {
	height: 38px;
	border: 1px solid #CECDCD;
	margin-right: 16px;
	float: left;
}

#fissoin .online-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#fissoin .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 37px;
	height: 37px;
	font-size: 16px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
}

#fissoin .setinp input {
	outline: none;
	height: 38px;
	background-color: #fff;
	padding-left: 20px;
	color: #333;
	width: 160px;
}

#fissoin .setinp .sinp {
	width: 190px;
	height: 38px;
	border: 1px solid #CECDCD;
	margin-right: 16px;
	float: left;
}

#fissoin .setinp .sinp .cumulative {
	width: 150px;
	height: 36px;
	border: 1px solid #eaeaea;
	float: left;
	outline: none;
	text-indent: 17px;
}

#fissoin .setinp .sinp span {
	display: block;
	float: left;
	width: 37px;
	height: 36px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
	background: #fff;
}

#fissoin .colon {
	display: block;
	height: 40px;
	width: 20px;
	line-height: 40px;
	text-align: center;
	font-weight: bold;
}

#fissoin .rules .ruleList .active {
	background-color: #B3B3B3;
}
</style>