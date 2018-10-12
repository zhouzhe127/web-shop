<!--
    **代金券
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<section>
		<div id="breakCoupon">
			<!-- 主要信息 -->
			<div class="set-line">
				<div class="title">主要信息</div>
				<div class="line"></div>
			</div>
			<!-- 优惠券名称 -->
			<div class="left ">
				<div class="text required">
					优惠券名称
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<input class="inp" v-model="couponName" maxlength="20" placeholder="请输入优惠券名称" />
				</div>
			</div>
			<!-- 适用门店 -->
			<template v-if="ischain == '3'">
				<div class="left ">
					<div class="text required">
						适用门店
					</div>
				</div>
				<div class="right">
					<div class="fl">
						<div class="buttons" @click="openShopWin">
							<img src="../../../res/images/add.png" /> 选择门店
						</div>
						<div class="associated">
							共关联{{getArrLength('selectShops')}}家门店
						</div>
					</div>
				</div>
			</template>
			<!-- 面额 -->
			<div class="left">
				<div class="text required">
					面额
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<input class="input denomination" maxlength="6" placeholder="请输入面额" v-model.trim.number="denomination" /> 元
				</div>
			</div>
			<!-- 入账金额 -->
			<div class="left">
				<div class="text required">
					实收金额
				</div>
			</div>
			<div class="right">
				<div class="fl ">
					<input maxlength="6" class="input denomination" placeholder="0" v-model.trim.number="netAmount" /> 元
				</div>
			</div>
			<!-- 结算金额 -->
			<div class="left">
				<div class="text required">
					结算金额
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<input maxlength="6" class="input denomination" placeholder="0" v-model.trim.number="setAmount" /> 元
				</div>
			</div>
			<!-- 是否强免 -->
			<div class="left ">
				<div class="text required">
					强制减免
				</div>
			</div>
			<div class="right">
				<section class="fl reduce" v-for="(item,index) in compulsoryCreditsList" :key="index">
					<span :class="{'sign' : compulsoryCredits == index}" v-on:click="changecompulsoryCredits(item,index)">{{item.name}}</span>
				</section>
			</div>
			<!-- 券有效期 -->
			<div class="left ">
				<div class="text required">
					券有效期
				</div>
			</div>
			<div class="right">
				<section class="fl reduce" v-for="(item,index) in validList" :key="index">
					<span :class="{'sign' : validType.index == index}" v-on:click="changevalidType(item,index)">{{item.name}}</span>
				</section>
			</div>
			<!-- 相对时间和制定时间对应的 -->
			<div class="left ">
			</div>
			<div class="right" v-if="validType.index == 0">
				<div class="line" style="text-align:left;">
					领券后
					<input class="input couponinp" maxlength="3" v-model.trim.number="validType.time" /> 日内有效
				</div>
			</div>
			<div class="right" v-if="validType.index == 1" style="padding-left: 10px;">
				<div class="cleander">
					<div class="cleander_o" @click="showCalendar">
						<div class="cleander_t">{{transformDate(validType.startTime)}}</div>
						<div class="cleander_f">
							至
						</div>
						<div class="cleander_s">{{transformDate(validType.endTime)}}</div>
					</div>
					<can-multi @closeCan="()=>{isShowCa=false}" v-if="isShowCa" :sideStart="validType.startTime" :sideEnd="validType.endTime" @castTime="getAddAlltime"></can-multi>
				</div>
				<div class="triangle" @click="showCalendar">
					<img src="../../../res/icon/q2x.png" />
				</div>
				<div class="foday">
					共{{getValidDay()}}天
				</div>
			</div>
			<!-- 领取生效 -->
			<div class="left">
				<div class="text">
					领取生效
				</div>
			</div>
			<div class="right" style="text-align:left;padding-left:10px;">
				<select-btn :name='validTime' :sorts="validTimeList.map(v=>v.name)" :width="190" @selOn="selexpirationTime"></select-btn>
			</div>
			<!-- 使用时段 -->
			<div class="left">
				<div class="text">
					使用时段
				</div>
			</div>
			<div class="fl clearfix" style="text-align:left;padding-left:10px;">
				<use-time :useDate="useDate" @getTime="getResult"></use-time>
			</div>
			<!-- 使用门槛 -->
			<div class="left ">
				<div class="text required">
					使用门槛
				</div>
			</div>
			<div class="right">
				<section class="fl reduce" v-for="(item,index) in useThresholdList" :key="index">
					<span :class="{'sign' : useThresholdId == index}" v-on:click="changeuseThreshold(item,index)">{{item.name}}</span>
				</section>
			</div>
			<!-- 制定门槛的金额 -->
			<template v-if="useThresholdId == 1">
				<div class="left ">
				</div>
				<div class="right">
					<div class="fl creditamount">
						<input class="input reduceamount" placeholder="请输入金额" v-model.trim.number="threshold" maxlength="6" />
						<div class="yuan">
							元
						</div>
					</div>
				</div>
			</template>
			<!-- 最大使用上限 -->
			<div class="left ">
				<div class="text required">
					最大使用上限
				</div>
			</div>
			<div class="right">
				<div class="fl creditamount">
					<input class="input reduceamount" placeholder="请输入最大使用上限" v-model.trim.number="maxCeiling" maxlength="6" />
					<div class="yuan">
						张
					</div>
				</div>
			</div>
			<!-- 其他设置 -->
			<div class="set-line" style="float: left;">
				<div class="title">其他设置</div>
				<div class="line"></div>
			</div>
			<div class="fl" style="width: 100%;">
			</div>
			<!-- 备注 -->
			<div class="left ">
				<div class="text" style="margin-right: 10px;">
					备注
				</div>
			</div>
			<div class="right">
				<div class="fl note">
					<input class="input" placeholder="20字" maxlength="20" v-model="annotation" />
				</div>
			</div>
			<!-- 使用须知 -->
			<div class="left ">
				<div class="text" style="margin-right: 10px;">
					使用须知
				</div>
			</div>
			<div class="right">
				<div class="fl useinformation">
					<textarea class="describe" maxlength="150" v-model="useKnow"></textarea>
					<div class="fl describetip">
						<div class="fl tips">
							<img src="../../../res/icon/alert.jpg" />
						</div>
						<div class="fl">
							限制150字
						</div>
					</div>
				</div>
			</div>
			<!-- 保存 -->
			<div class="save-coupon">
				<a href="javascript:void(0);" class="yellow" style="width: 200px;" @click="getSendInfo">保存</a>
			</div>
			<!-- 选择门店的弹窗 -->
			<coupon-shop-win @closeShopWin="closeShopWin" v-if="shopWin" :selectShops="selectShops" :shopList='shopList'></coupon-shop-win>
		</div>
	</section>
</template>
<script>
import global from 'src/manager/global';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			ischain: '', //0 单店 3 品牌
			couponName: '', //优惠券名称
			shopWin: false, // 店铺弹框
			goodsWin: false, // 商品弹框
			isShowCa: false, // 是否展示时间选择组件
			selectShops: [], //选中的商铺
			compulsoryCreditsList: [{
				'compulsoryCredits': '0',
				'name': '否'
			},
			{
				'compulsoryCredits': '1',
				'name': '是'
			}
			],
			compulsoryCredits: '0', //是否强制减免
			validList: [{
				'validType': '0',
				'name': '相对时间'
			},
			{
				'validType': '1',
				'name': '指定时间'
			}
			],
			validType: {
				'index': 0, //0指定时间 1相对时间
				'time': '', //制定时间输入的值 领取后多少日生效
				'startTime': (new Date()).getTime(), //相对时间的开始时间
				'endTime': (new Date()).getTime(), //相对时间的结束时间
			}, //券有效期 
			validTimeList: [{ //过期时间
				name: '领取后即刻生效',
				id: 0
			}, {
				name: '领取1小时后生效',
				id: 1
			},
			{
				name: '领取2小时后生效',
				id: 2
			},
			{
				name: '领取3小时后生效',
				id: 3
			},
			{
				name: '领取6小时后生效',
				id: 6
			},
			{
				name: '领取12小时后生效',
				id: 12
			},
			{
				name: '领取24小时后生效',
				id: 24
			}
			],
			validTimeId: '0', //领取后选定时间内生效
			validTime: '领取后即刻生效', //状态 
			useDate: {
				'list': ['不设限制', '指定每周使用时段', '指定每月使用日期和时段 '],
				'index': 0,
				'week': [], //周
				'month': [], //月
				'show': false
			}, //使用时段 
			useThresholdList: [{ //指定门槛
				name: '不设限制',
				id: 0
			},
			{
				name: '指定门槛',
				id: 1
			},
			],
			useThresholdId: '0',
			threshold: '', //指定门槛金额
			annotation: '', //备注
			useKnow: '', //使用须知
			denomination: '', //面额
			netAmount: '', //入账金额
			setAmount: '', //结算金额
			maxCeiling: '', //最大使用上限
			editCoupon: false,
			shopList: []
		};
	},
	props: {
		couponDetail: Object, //详情
	},
	mounted() {
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.shopList = storage.session('shopList');
		if (!utils.isEmptyObject(this.couponDetail)) {
			let couponDetail = this.couponDetail;
			this.editCoupon = true;
			this.couponName = couponDetail.name; //优惠券名称
			if (couponDetail.shopIds && couponDetail.shopIds.length > 0) {
				this.selectShops = couponDetail.shopIds.split(',');
			} //选中的店铺
			this.compulsoryCredits = couponDetail.isDiscount; //是否强制减免
			this.denomination = couponDetail.param; //面额
			this.netAmount = couponDetail.billPrice; //入账金额
			this.setAmount = couponDetail.reckoningPrice; //结算金额
			this.maxCeiling = couponDetail.useLimit; //最大使用上限
			this.validType.index = couponDetail.validityType; //相对时间 绝对时间
			if (couponDetail.validityType == 0) {
				this.validType.time = couponDetail.relativeTime;
			} else if (couponDetail.validityType == 1) {
				this.validType.startTime = (couponDetail.startTime - 0) * 1000;
				this.validType.endTime = (couponDetail.endTime - 0) * 1000;
			}
			this.useDate.index = couponDetail.periodSel;
			if (couponDetail.periodSel == 1) {
				if (couponDetail.useTime && couponDetail.useTime.list) {
					this.useDate.week = this.changeArrToNeed(couponDetail.useTime.list, 'w');
				}
			}
			if (couponDetail.periodSel == 2) {
				if (couponDetail.useTime && couponDetail.useTime.list) {
					this.useDate.month = this.changeArrToNeed(couponDetail.useTime.list, 'm');
				}
			}
			this.validTimeId = couponDetail.delayHours; //领取生效
			for (let item of this.validTimeList) {
				if (item.id == this.validTimeId) {
					this.validTime = item.name;
				}
			} //领取后多久生效的名称
			if (couponDetail.lowestConsume != 0) { //使用门槛
				this.useThresholdId = 1;
				this.threshold = couponDetail.lowestConsume; //指定门槛的金额
			}
			this.annotation = couponDetail.annotation; //备注
			this.useKnow = couponDetail.useKnow; //使用须知

		}
	},
	components: {
		'can-multi': () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		'coupon-shop-win': () =>
			import ( /* webpackChunkName:'coupon_shop_win' */ './../coupon_shop_win'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		'use-time': () =>
			import ( /* webpackChunkName:'use_time' */ './use_time'),
		goodListWin: () =>
			import ( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
	},
	methods: {
		openShopWin() { //打开选择店铺的弹窗
			this.shopWin = true;
		},
		closeShopWin(val) { //选择店铺弹窗关闭的回掉
			this.shopWin = false;
			if (val) {
				this.selectShops = val.selectShops;
			}
		},
		getArrLength(type) { //返回数组的长度
			return this[type].length;
		},
		changecompulsoryCredits: function(item, index) { //是否强制减免
			this.compulsoryCredits = index;
		},
		changeuseThreshold: function(item, index) { //使用门槛
			this.useThresholdId = index;
		},
		changevalidType: function(item, index) { //指定时间和相对时间
			this.validType.index = index;
		},
		showCalendar() { //是否打开日历组建
			this.isShowCa = !this.isShowCa;
		},
		transformDate(t) { //日期格式化
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		getValidDay() { //获取一共多少天
			return Math.floor((this.validType.endTime - this.validType.startTime) / (24 * 3600 * 1000) + 1);
		},
		getAddAlltime(time) {
			this.validType.startTime = time.startTime;
			this.validType.endTime = time.endTime;
			this.isShowCa = false;
		},
		selexpirationTime: function(i) { //领取生效
			this.validTime = this.validTimeList[i].name; //点击卡类型对应的名字
			this.validTimeId = this.validTimeList[i].id; //点击卡类型对应的id
		},
		getResult: function(val) { //使用时间段
			this.useDate = val;
			console.log(JSON.stringify(val));
		},
		valiData(content, title = '提示信息', winType = 'alert') {
			this.$store.commit('setWin', {
				winType: winType,
				title: title,
				content: content
			});
		},
		arrToString(arr) {
			let str = '';
			for (let i = 0; i < arr.length; i++) {
				str += arr[i];
				if (i < arr.length - 1) {
					str += ',';
				}
			}
			return str;
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
		checkData() {
			let reg = /^[0-9]*$/;
			let reg2 = /^\d+(\.\d+)?$/;
			if (!global.checkData({
				couponName: {
					cond: `$$.trim() !== '' && $$.length<=20`,
					pro: '优惠券名称不能为空且不能超过20个字'
				},
			}, this)) {
				return false;
			}
			if (this.ischain == '3') {
				if (this.selectShops.length == 0) {
					this.valiData('请选择优惠券的关联店铺');
					return false;
				}
			}
			//面额
			if (this.denomination == '') {
				this.valiData('面额不能为空');
				return false;
			}
			if ((this.denomination - 0) < 0) {
				this.valiData('面额不能小于0');
				return false;
			}
			if (!reg2.test(this.denomination)) {
				this.valiData('面额只能是数字');
				return false;
			}
			//入账金额
			if (this.netAmount == '') {
				this.valiData('入账金额不能为空');
				return false;
			}
			if ((this.netAmount - 0) < 0) {
				this.valiData('入账金额不能小于0');
				return false;
			}
			if (!reg2.test(this.netAmount)) {
				this.valiData('入账金额只能是数字');
				return false;
			}
			//结算金额
			if (this.setAmount == '') {
				this.valiData('结算金额不能为空');
				return false;
			}
			if ((this.setAmount - 0) < 0) {
				this.valiData('结算金额不能小于0');
				return false;
			}
			if (!reg2.test(this.setAmount)) {
				this.valiData('结算金额只能是数字');
				return false;
			}
			// 最大使用上限的验证
			if (!this.maxCeiling) {
				// 当输入框的为''时
				this.valiData('请输入最大使用上限');
				return false;
			} else if (isNaN(this.maxCeiling)) {
				// 当输入框的值不为数字时
				this.valiData('最大上限格式错误');
				return false;
			} else if (this.maxCeiling != '' && parseInt(this.maxCeiling) != this.maxCeiling) {
				// 当未添加关联区域时
				this.valiData('最大上限不能为小数');
				return false;
			} else if (Number(this.maxCeiling) < 1 || Number(this.maxCeiling) > 999) {
				this.valiData('最大上限(1-999)');
				return false;
			}
			//领券多长时间有效的限制
			if (this.validType.index == 0) {
				if (this.validType.time.toString().trim() == '') {
					this.valiData('请输入券有效期');
					return false;
				}
				if (!reg.test(this.validType.time)) {
					this.valiData('券有效期只能是整数');
					return false;
				}
			}
			let arr = [];
			let alertText = '';
			if (this.useDate.index != 0) {

				if (this.useDate.index == 1) {
					arr = this.useDate.week;
					alertText = '使用时段请选择日期(周)';
				} else if (this.useDate.index == 2) {
					arr = this.useDate.month;
					alertText = '使用时段请选择日期(月)';
				}
				for (let i = 0; i < arr.length; i++) {
					if (this.useDate.index == 1) {
						if (arr[i].week.length == 0) {
							this.valiData(alertText);
							return false;
						}
					} else if (this.useDate.index == 2) {
						if (arr[i].month.length == 0) {
							this.valiData(alertText);
							return false;
						}
					}
					if (arr[i].startslotH.toString().trim() == '' || arr[i].startslotM.toString().trim() == '' || arr[i].endslotH.toString().trim() == '' || String(arr[i].endslotM).trim() == '') {
						this.valiData('使用时段的时间不能为空');
						return false;
					}
					if (!reg.test(arr[i].startslotH) || !reg.test(arr[i].startslotM) || !reg.test(arr[i].endslotH) || !reg.test(arr[i].endslotM)) {
						this.valiData('使用时段的时间只能是整数');
						return false;
					}
					if (arr[i].startslotH > 23 || arr[i].startslotM > 59 || arr[i].endslotH > 23 || arr[i].endslotM > 59) {
						this.valiData('请输入正确的使用时间');
						return false;
					}
					if (!arr[i].isNextDay) {
						if (arr[i].startslotH > arr[i].endslotH || (arr[i].startslotH == arr[i].endslotH && arr[i].startslotM > arr[i].endslotM)) {
							this.valiData('使用时段里，未点击隔天,结束时间不能小于开始时间');
							return false;
						}
					}
				}
			}
			//指定门槛的金额
			if (this.useThresholdId == 1) {
				if (this.threshold.toString().trim() == '') {
					this.valiData('指定门槛金额不能为空');
					return false;
				}
				if ((this.threshold - 0) < 0) {
					this.valiData('指定门槛金额不能小于0');
					return false;
				}
				if (!reg2.test(this.threshold)) {
					this.valiData('指定门槛金额只能是数字');
					return false;
				}
			}
			if (this.annotation.length > 20) {
				this.valiData('备注字数不能大于20');
				return false;
			}
			if (this.useKnow.length > 150) {
				this.valiData('使用须知字数不能大于150');
				return false;
			}
			return true;
		},
		getSendInfo() {
			//验证输入
			if (this.checkData()) {
				let obj = {};
				if (this.ischain == '3') {
					obj.shopIds = this.arrToString(this.selectShops);
				} else {
					obj.shopIds = storage.session('userShop').currentShop.id;
				}
				obj.gids = ''; //关联商品
				obj.pids = ''; //关联套餐
				obj.name = this.couponName; //优惠券名称
				obj.param = this.denomination; //面额
				obj.delayHours = this.validTimeId; //领取后生效时间
				//  'useTime' => '{'type':'week','list':[{'startslot':'09:00','endslot':'05:00','week':[0,1],'isNextDay':0}]}',       //使用时段，为空代表不限制
				obj.annotation = this.annotation; //优惠券备注
				obj.useKnow = this.useKnow; //使用须知
				obj.validityType = this.validType.index; //券有效期
				obj.periodSel = this.useDate.index; //使用时间段
				obj.isDiscount = this.compulsoryCredits; // 是否强免 
				obj.tastePrice = ''; //是否包含口味价格
				obj.useLimit = this.maxCeiling; //最大使用上限
				obj.billPrice = this.netAmount; //入账金额
				obj.reckoningPrice = this.setAmount; //结算金额
				if (this.useThresholdId == 0) { //指定门槛金额
					obj.lowestConsume = 0;
				} else {
					obj.lowestConsume = this.threshold;
				}
				let useTime = {};
				if (this.useDate.index == 1) {
					useTime.type = 'week';
					useTime.list = this.changeArr(this.useDate.week, 'w');
				}
				if (this.useDate.index == 2) {
					useTime.type = 'month';
					useTime.list = this.changeArr(this.useDate.month, 'm');
				}
				useTime = JSON.stringify(useTime);
				obj.useTime = useTime;
				if (this.validType.index == 0) {
					obj.relativeTime = this.validType.time;
				} else {
					obj.startTime = parseInt(this.validType.startTime / 1000);
					obj.endTime = parseInt(this.validType.endTime / 1000);
				}
				obj.type = 6;
				if (!utils.isEmptyObject(this.couponDetail)) {
					obj.id = this.couponDetail.id;
				}
				this.operateCoupons(obj);
			}
		},
		async operateCoupons(sendInfo) {
			if (!this.editCoupon) {
				await http.addCoupon({
					data: sendInfo
				});
				this.valiData('添加成功');
				this.$router.push('/admin/addCoupon');
			} else {
				await http.editCoupon({
					data: sendInfo
				});
				this.valiData('修改成功');
				setTimeout(() => {
					storage.session('couponDetail', '');
					this.$emit('changeMnage');
				}, 500);
			}
		},
	},
	computed: {

	}
};
</script>
<style type="text/css" scoped>
#breakCoupon {
	width: 1200px;
	line-height: 40px;
	text-align: center;
	color: #333;
	overflow: hidden;
	padding-bottom: 300px;
	position: relative;
}

#breakCoupon .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#breakCoupon .set-line .title {
	float: left;
	margin-left: 12px;
	width: 70px;
	font-size: 16px;
	text-align: left;
}

#breakCoupon .set-line .line {
	display: inline-block;
	width: 900px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#breakCoupon .left,
#breakCoupon .right {
	height: 40px;
	float: left;
	margin-bottom: 15px;
}

#breakCoupon .left {
	color: #000000;
	width: 170px;
}

#breakCoupon .right {
	width: 970px;
}

#breakCoupon .right .line {
	width: 100%;
	height: 40px;
	padding-left: 10px;
}

#breakCoupon .right .reduceamount {
	height: 38px;
	width: 150px;
	float: left;
}

#breakCoupon .right .yuan {
	border-left: 1px solid #999;
	width: 48px;
	float: left;
	height: 38px;
}

#breakCoupon .right .couponinp {
	height: 30px;
	width: 60px;
	border: 1px solid #999
}

#breakCoupon .right .fl {
	padding-left: 10px;
}

#breakCoupon .right .creditamount {
	border: 1px solid #999;
	width: 200px;
	height: 40px;
	padding: 0;
	margin-left: 10px;
}

#breakCoupon .right .fl .inp {
	border: 1px solid #999;
	width: 250px;
	height: 40px;
	line-height: 40px;
	padding-left: 10px;
}

#breakCoupon .left .text {
	float: right;
	height: 100%;
	padding: 0 10px;
	text-align: right;
}

#breakCoupon .right .buttons {
	padding: 0 10px 0 40px;
	background-color: #28a8e0;
	height: 40px;
	width: 120px;
	cursor: pointer;
	float: left;
	color: #FFF;
	position: relative;
	transition: background-color ease-in-out 0.2s;
}

#breakCoupon .right .associated {
	float: left;
	width: 600px;
	text-align: left;
	padding-left: 15px;
}

#breakCoupon .right .buttons:hover {
	background-color: #2a80b9;
}

#breakCoupon .right .buttons img {
	position: absolute;
	top: 11px;
	left: 15px;
}

#breakCoupon .right .reduce span {
	float: left;
	display: block;
	width: 98px;
	height: 38px;
	border: 1px solid #999;
	/* margin-right: 15px; */
	text-align: center;
	line-height: 38px;
	cursor: pointer;
	background: #fff;
}

#breakCoupon .right .reduce .sign {
	background: #FFF3E5;
	border: 1px solid #F8931F;
	color: #F9911E;
}

#breakCoupon .right .cleander {
	width: 310px;
	height: 40px;
	border: 1px solid #999;
	float: left;
}

#breakCoupon .right .cleander_o {
	width: 100%;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}

#breakCoupon .right .cleander_t {
	float: left;
	width: 40%;
	height: 40px;
}

#breakCoupon .right .cleander_f {
	float: left;
	width: 20%;
	height: 40px;
}

#breakCoupon .right .denomination {
	height: 38px;
	width: 191px;
	float: left;
	border: 1px solid #999;
	margin-right: 10px;
}

#breakCoupon .right .cleander_s {
	float: left;
	width: 40%;
	height: 40px;
}

#breakCoupon .right .triangle {
	border: 1px solid #999;
	width: 40px;
	float: left;
	height: 40px;
	border-left: none;
	cursor: pointer;
}

#breakCoupon .right .foday {
	width: 80px;
	float: left;
	height: 40px;
	font-size: 12px;
	text-align: left;
	color: #00A1E9;
	padding-left: 10px;
}

#breakCoupon .right .note {
	border: 1px solid #999;
	width: 352px;
	height: 40px;
	padding: 0;
	margin-left: 10px;
}

#breakCoupon .right .note input {
	height: 38px;
	width: 350px;
	float: left;
}

#breakCoupon .right .useinformation {
	border: 1px solid #999;
	width: 382px;
	height: 180px;
	padding: 0px;
	margin-left: 10px;
}

#breakCoupon .right .useinformation .describe {
	width: 360px;
	height: 158px;
}

#breakCoupon .right .useinformation .describetip {
	width: 100%;
	height: 18px;
	line-height: 18px;
	vertical-align: middle;
	padding: 8px;
	margin-top: 8px;
}

#breakCoupon .right .useinformation .describetip .tips {
	width: 18px;
	height: 18px;
	margin-right: 10px;
}

#breakCoupon .save-coupon {
	position: absolute;
	bottom: 60px;
	left: 180px;
}
</style>