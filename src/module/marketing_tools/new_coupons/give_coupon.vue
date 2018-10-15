<!--
    **赠菜优惠券
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
					<!-- <input class="inp" v-model="couponName" maxlength="20" placeholder="请输入优惠券名称" /> -->
					<el-input v-model="couponName" placeholder="请输入优惠券名称" maxlength="20"></el-input>
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
						<!-- <div class="buttons" @click="openShopWin">
							<img src="../../../res/images/add.png" /> 选择门店
						</div> -->
						<el-button class="fl" type="primary" icon="el-icon-plus" @click="openShopWin">选择门店</el-button>
						<div class="associated">
							共关联{{getArrLength('selectShops')}}家门店
						</div>
					</div>
				</div>
			</template>
			<!-- 关联商品 -->
			<div class="left ">
				<div class="text required">
					关联商品
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<!-- <div class="buttons" @click="openGoodsWindow">
						<img src="../../../res/images/add.png" /> 选择菜品
					</div> -->
					<el-button class="fl" type="primary" icon="el-icon-plus" @click="openGoodsWindow">选择菜品</el-button>
					<div class="associated">
						共关联商品{{getArrLength('selectGoods')}}份，套餐{{getArrLength('selectPackages')}}份
					</div>
				</div>
			</div>
			<!-- 是否强折 -->
			<div class="left ">
				<div class="text required">
					是否包含口味价格
				</div>
			</div>
			<div class="right">
				<!-- <section class="fl reduce" v-for="(item,index) in compulsoryCreditsList" :key="index">
					<span :class="{'sign' : compulsoryCredits == index}" v-on:click="changecompulsoryCredits(item,index)">{{item.name}}</span>
				</section> -->
				<el-radio-group v-model="compulsoryName" class="fl">
					<el-radio style="width:112px;" v-for="(item,index) in compulsoryCreditsList" :key="index" :label="item.name" border @change.native="changecompulsoryCredits(item)"></el-radio>
				</el-radio-group>
			</div>
			<!-- 券有效期 -->
			<div class="left ">
				<div class="text required">
					券有效期
				</div>
			</div>
			<div class="right">
				<!-- <section class="fl reduce" v-for="(item,index) in validList" :key="index">
					<span :class="{'sign' : validType.index == index}" v-on:click="changevalidType(item,index)">{{item.name}}</span>
				</section> -->
				<el-radio-group v-model="validName" class="fl">
					<el-radio v-for="(item,index) in validList" :key="index" :label="item.name" border @change.native="clicktheRadio(item)"></el-radio>
				</el-radio-group>
			</div>
			<!-- 相对时间和制定时间对应的 -->
			<div class="left ">
			</div>
			<div class="right" v-if="validType.index == 0">
				<div class="line" style="text-align:left;">
					领券后
					<input class="input couponinp" maxlength="3" v-model="validType.time" onkeyup="value=value.replace(/[^\d]/g,'')" /> 日内有效
				</div>
			</div>
			<div class="right" v-if="validType.index == 1" style="padding-left: 10px;">
				<!-- <div class="cleander">
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
				</div> -->
				<el-date-picker class="fl" v-model="validType.valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" :editable="false">
				</el-date-picker>
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
				<!-- <select-btn :name='validTime' :sorts="validTimeList.map(v=>v.name)" :width="190" @selOn="selexpirationTime"></select-btn> -->
				<el-select v-model="validTime" @change="selData" style="color:#c0c4cc">
					<el-option v-for="item in validTimeList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
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
				<!-- <section class="fl reduce" v-for="(item,index) in useThresholdList" :key="index">
					<span :class="{'sign' : useThresholdId == index}" v-on:click="changeuseThreshold(item,index)">{{item.name}}</span>
				</section> -->
				<el-radio-group v-model="useThresholdName" class="fl">
					<el-radio v-for="(item,index) in useThresholdList" :key="index" :label="item.name" border @change.native="changeuseThreshold(item)"></el-radio>
				</el-radio-group>
			</div>
			<!-- 制定门槛的金额 -->
			<template v-if="useThresholdId == 1">
				<div class="left ">
				</div>
				<div class="right">
					<!-- <div class="fl creditamount">
						<input class="input reduceamount" placeholder="请输入金额" v-model.trim.number="threshold" maxlength="6" />
						<div class="yuan">
							元
						</div>
					</div> -->
					<el-input class="fl" style="width:194px;" placeholder="请输入金额" v-model="threshold" maxlength="6">
						<template slot="suffix">元</template>
					</el-input>
				</div>
			</template>
			<!-- 优惠共享 -->
			<div class="left ">
				<div class="text required">
					优惠共享
				</div>
			</div>
			<div class="right" style="text-align:left;padding-left:10px;">
				<!-- <select-btn :name='isSharing' :sorts="isSharingList.map(v=>v.name)" :width="190" @selOn="getSharing"></select-btn> -->
				<el-select v-model="isSharing" @change="getSharing" style="color:#c0c4cc">
					<el-option v-for="item in isSharingList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<div class="and" v-if="isSharingId == 1">
					<span> 且</span>
					<!-- <select-btn :name='concessionSharing' :sorts="concessionSharingList.map(v=>v.name)" :width="190" @selOn="getconcession"></select-btn> -->
					<el-select v-model="concessionSharing" @change="getconcession" style="color:#c0c4cc">
						<el-option v-for="item in concessionSharingList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<el-tooltip placement="right">
					<div slot="content">与会员卡优惠共用”代表该券在买单时可以叠加会员卡折扣/会员价，积分抵扣，满减活动，店内折扣共同使用
						<br/>不与会员卡优惠共用”则代表该券在买单时不可叠加会员卡折扣/会员价，积分抵扣，满减活动，店内折扣。但积分赠送依旧享受
						<br/>“不可与其他优惠共享”则也包含“不与会员卡优惠共用”</div>
					<i class="el-icon-question" style="font-size:24px;"></i>
				</el-tooltip>
				<!-- <div class="icon" @click="showText()">
					<div class="detDiv" v-if="hiddenText">
						<i class="detI triright"></i>
						<h3 class="detH3">
                            “与会员卡优惠共用”代表该券在买单时可以叠加会员卡折扣/会员价，积分抵扣，满减活动，店内折扣共同使用 “不与会员卡优惠共用”则代表该券在买单时不可叠加会员卡折扣/会员价，积分抵扣，满减活动，店内折扣。但积分赠送依旧享受 “不可与其他优惠共享”则也包含“不与会员卡优惠共用”。
                        </h3>
					</div>
				</div> -->
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
				<div class="fl">
					<!-- <input class="input" placeholder="20字" maxlength="20" v-model="annotation" /> -->
					<el-input style="width:300px;" v-model="annotation" placeholder="20字" maxlength="20"></el-input>
				</div>
			</div>
			<!-- 使用须知 -->
			<div class="left ">
				<div class="text" style="margin-right: 10px;">
					使用须知
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<!-- <textarea class="describe" maxlength="150" v-model="useKnow"></textarea> -->
					<el-input type="textarea" :autosize="{ minRows: 8, maxRows: 8}" placeholder="请输入内容" v-model="useKnow" maxlength="150">
					</el-input>
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
				<!-- <a href="javascript:void(0);" class="yellow" style="width: 200px;" @click="getSendInfo">保存</a> -->
				<el-button style="width: 200px;height:49px;" type="primary" @click="getSendInfo">保存</el-button>
			</div>
			<!-- 选择门店的弹窗 -->
			<coupon-shop-win @closeShopWin="closeShopWin" v-if="shopWin" :selectShops="selectShops" :shopList='shopList'></coupon-shop-win>
			<!-- 关联商品的弹窗 -->
			<goodListWin v-if="goodsWin" @goodListWin="closeGoodWin" :goodsIds="selectGoods" :isGoods="true" :packages="selectPackages" :goInName="'isCoupon'"></goodListWin>
			<!-- <coupon-goods-win @closeWin="closeGoodWin" v-if="goodsWin" :selectGoods="selectGoods" :selectShops="selectShops" :selectPackages="selectPackages"></coupon-goods-win> -->
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
			hiddenText: false,
			goodsWin: false, // 商品弹框
			isShowCa: false, // 是否展示时间选择组件
			selectShops: [], //选中的商铺
			selectGoods: [], //选中的商品
			selectPackages: [], //选中的套餐
			compulsoryCreditsList: [{
				'compulsoryCredits': '0',
				'name': '否'
			},
			{
				'compulsoryCredits': '1',
				'name': '是'
			}
			],
			compulsoryName: '否',
			compulsoryCredits: '0', //是否包含口味价格
			validList: [{
				'validType': '0',
				'name': '相对时间'
			},
			{
				'validType': '1',
				'name': '指定时间'
			}
			],
			validName: '相对时间',
			validType: {
				'index': 0, //0指定时间 1相对时间
				'time': '', //制定时间输入的值 领取后多少日生效
				'startTime': (new Date()).getTime(), //相对时间的开始时间
				'endTime': (new Date()).getTime(), //相对时间的结束时间
				'valueTime': [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
			}, //券有效期 
			validTimeList: [{ //过期时间
				name: '领取后即刻生效',
				id: 0
			},
			{
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
			useThresholdName: '不设限制',
			useThresholdId: '0',
			threshold: '', //指定门槛金额
			annotation: '', //备注
			useKnow: '', //使用须知
			editCoupon: false, //修改的标示
			shopList: [], //店铺
			isSharingId: 0,
			isSharing: '不与其它优惠共享',
			isSharingList: [{ //是否优惠共享
				name: '不与其它优惠共享',
				id: 0
			},
			{
				name: '可与其他优惠共享',
				id: 1
			}
			],
			concessionSharingId: 0,
			concessionSharing: '不与会员卡优惠共用',
			concessionSharingList: [{ //优惠共享
				name: '不与会员卡优惠共用',
				id: 0
			},
			{
				name: '可与会员卡优惠共用',
				id: 1
			}
			],
			sharingStatus: '',
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
			if (couponDetail.gids && couponDetail.gids.length > 0 && couponDetail.gids != null && couponDetail.gids != 0) {
				this.selectGoods = couponDetail.gids.split(',');
			} //关联商品
			if (couponDetail.pids && couponDetail.pids.length > 0 && couponDetail.pids != null && couponDetail.pids != 0) {
				this.selectPackages = couponDetail.pids.split(',');
			} //关联套餐
			this.compulsoryCredits = couponDetail.tastePrice; //是否包含口味
			if(this.compulsoryCredits == '1'){
				this.compulsoryName = '是';
			}
			this.validType.index = couponDetail.validityType; //相对时间 绝对时间
			if (couponDetail.validityType == 0) {
				this.validType.time = couponDetail.relativeTime;
			} else if (couponDetail.validityType == 1) {
				this.validName = '指定时间';
				this.validType.valueTime[0] = (couponDetail.startTime - 0) * 1000;
				this.validType.valueTime[1] = (couponDetail.endTime - 0) * 1000;
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
				this.useThresholdName = '指定门槛';
				this.threshold = couponDetail.lowestConsume; //指定门槛的金额
			}

			//判断优惠共享更改的状态
			if (couponDetail.sharingStatus == 0) {
				this.isSharingId = 0;
				this.isSharing = '不与其它优惠共享';
			} else if (couponDetail.sharingStatus == 2) {
				this.isSharingId = 1;
				this.concessionSharingId = 0;
				this.isSharing = '可与其他优惠共享';
				this.concessionSharing = '不与会员卡优惠共用';
			} else if (couponDetail.sharingStatus == 1) {
				this.isSharingId = 1;
				this.concessionSharingId = 1;
				this.isSharing = '可与其他优惠共享';
				this.concessionSharing = '可与会员卡优惠共用';
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
		// 'coupon-goods-win': () =>
		// 	import ( /* webpackChunkName:'coupon_goods_win' */ './../coupon_goods_win'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		'use-time': () =>
			import ( /* webpackChunkName:'use_time' */ './use_time'),
		goodListWin: () =>
			import ( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
	},
	methods: {
		showText() {
			this.hiddenText = !this.hiddenText;
		},
		openShopWin() { //打开选择店铺的弹窗
			this.shopWin = true;
		},
		closeShopWin(val) { //选择店铺弹窗关闭的回掉
			this.shopWin = false;
			if (val) {
				this.selectShops = val.selectShops;
			}
		},
		openGoodsWindow() { //打开关联商品的弹窗
			if (this.selectShops.length == 0 && this.ischain == '3') {
				this.valiData('请先选择店铺', '提示信息');
				return false;
			}
			this.goodsWin = true;
		},
		closeGoodWin(res, item) { //  关闭商品弹框
			if (res == 'ok') {
				if (item.goodArr.length + item.packArr.length > 5) {
					this.valiData('商品和套餐最多一共只能选择5个', '提示信息');
					return false;
				}
				this.selectGoods = item.goodArr;
				this.selectPackages = item.packArr;
			}
			this.goodsWin = false;
		},
		getArrLength(type) { //返回数组的长度
			return this[type].length;
		},
		changecompulsoryCredits: function(item) { //是否包含口味
			this.compulsoryCredits = item.compulsoryCredits;
		},
		changeuseThreshold: function(item) { //使用门槛
			this.useThresholdId = item.id;
		},
		// changevalidType: function(item, index) { //指定时间和相对时间
		// 	this.validType.index = index;
		// },
		showCalendar() { //是否打开日历组建
			this.isShowCa = !this.isShowCa;
		},
		transformDate(t) { //日期格式化
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		getValidDay() { //获取一共多少天
			return Math.floor((this.validType.valueTime[1] - this.validType.valueTime[0]) / (24 * 3600 * 1000) + 1);
		},
		// getAddAlltime(time) {
		// 	this.validType.startTime = time.startTime;
		// 	this.validType.endTime = time.endTime;
		// 	this.isShowCa = false;
		// },
		selexpirationTime: function(i) { //领取生效
			this.validTime = this.validTimeList[i].name; //点击卡类型对应的名字
			this.validTimeId = this.validTimeList[i].id; //点击卡类型对应的id
		},
		getSharing: function(value) {
			console.log(value);
			this.isSharingId = value;
			// this.isSharing = this.isSharingList[i].name; //点击卡类型对应的名字
			// this.isSharingId = this.isSharingList[i].id; //点击卡类型对应的id
		},
		getconcession: function(value) {
			this.concessionSharingId = value;
			// this.concessionSharing = this.concessionSharingList[i].name;
			// this.concessionSharingId = this.concessionSharingList[i].id;
		},
		getResult: function(val) { //使用时间段
			this.useDate = val;
			console.log(JSON.stringify(val));
		},
		//商品点击返回
		doThrowWinGoods(res, item) {
			if (res == 'ok') {
				this.selectGoods = item.goodArr;
				this.selectPackages = item.packArr;
			}
			this.goodsWin = false;
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
			if (this.selectGoods.length == 0 && this.selectPackages.length == 0) {
				this.valiData('请选择关联商品或套餐');
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
				if (this.validType.time == 0) {
					this.valiData('券有效期不能为0');
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
					let startslotH = arr[i].startslotH.toString().trim();
					let startslotM = arr[i].startslotM.toString().trim();
					let endslotH = arr[i].endslotH.toString().trim();
					let endslotM = arr[i].endslotM.toString().trim();

					if (startslotH == '' || startslotM == '' || endslotH == '' || endslotM == '') {
						this.valiData('使用时段的时间不能为空');
						return false;
					}
					if (!reg.test(startslotH) || !reg.test(startslotM) || !reg.test(endslotH) || !reg.test(endslotM)) {
						this.valiData('使用时段的时间只能是整数');
						return false;
					}
					if (startslotH > 23 || startslotM > 59 || endslotH > 23 || endslotM > 59) {
						this.valiData('请输入正确的使用时间');
						return false;
					}
					if (!arr[i].isNextDay) {
						if (startslotH > endslotH || (startslotH == endslotH && startslotM > endslotM)) {
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

			// if (this.isSharingId === '') {
			// 	this.valiData('请选择优惠券共享方式');
			// 	return false;
			// }
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
				obj.gids = this.arrToString(this.selectGoods); //关联商品
				obj.pids = this.arrToString(this.selectPackages); //关联套餐
				obj.name = this.couponName; //优惠券名称
				obj.param = ''; //减免金额
				obj.delayHours = this.validTimeId; //领取后生效时间
				//  'useTime' => '{'type':'week','list':[{'startslot':'09:00','endslot':'05:00','week':[0,1],'isNextDay':0}]}',       //使用时段，为空代表不限制
				obj.annotation = this.annotation; //优惠券备注
				obj.useKnow = this.useKnow; //使用须知
				obj.validityType = this.validType.index; //券有效期
				obj.periodSel = this.useDate.index; //使用时间段
				obj.isDiscount = ''; // 是否强免 
				obj.tastePrice = this.compulsoryCredits; //是否包含口味价格
				obj.useLimit = ''; //最大使用上限
				obj.billPrice = ''; //入账金额
				obj.reckoningPrice = ''; //结算金额

				// 优惠券共享
				if (this.isSharingId === 0) {
					obj.sharingStatus = 0;
				} else if (this.isSharingId == 1 && this.concessionSharingId == 0) {
					obj.sharingStatus = 2;
				} else if (this.isSharingId == 1 && this.concessionSharingId == 1) {
					obj.sharingStatus = 1;
				}

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
					obj.startTime = parseInt(this.validType.valueTime[0] / 1000);
					obj.endTime = parseInt(this.validType.valueTime[1] / 1000);
				}
				obj.type = 5;
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
		clicktheRadio: function(item) {
			this.validType.index = item.validType;
		},
		selData: function(value) { //领取后生效
			this.validTimeId = value;
		},
	},
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

#breakCoupon .icon {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
	position: relative;
	vertical-align: middle;
	cursor: pointer;
}

#breakCoupon .icon .detDiv {
	display: inline-block;
	width: 460px;
	background: #45404b;
	position: absolute;
	top: -10px;
	left: 35px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 100;
}

#breakCoupon .icon .detDiv .detI {
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

#breakCoupon .icon .detDiv .detH3 {
	line-height: 22px;
	color: #e6e6e7;
}

#breakCoupon .icon .detDiv .triright {
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;
	border-right: 10px solid #45404b;
	border-left: 10px solid transparent;
}

#breakCoupon .and {
	display: inline-block;
}

#breakCoupon .and span {
	color: #000000;
	padding: 0 10px;
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
	border: 1px solid #999;
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
	font-size: 16px;
}

#breakCoupon .right .buttons {
	padding: 0 10px 0 40px;
	background-color: #28a8e0;
	height: 40px;
	width: 120px;
	cursor: pointer;
	float: left;
	color: #fff;
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
	background: #fff3e5;
	border: 1px solid #f8931f;
	color: #f9911e;
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
	color: #00a1e9;
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