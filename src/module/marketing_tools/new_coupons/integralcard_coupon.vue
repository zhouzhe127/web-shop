<!--
    **积分卡券
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
					积分卡券名称
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<!-- <input class="inp" v-model="couponName" maxlength="20" placeholder="请输入优惠券名称" /> -->
					<el-input v-model="couponName" placeholder="请输入优惠券名称" maxlength="20"></el-input>
				</div>
			</div>
			<!-- 积分量 -->
			<div class="left">
				<div class="text required">
					积分量
				</div>
			</div>
			<div class="right">
				<div class="fl">
					<!-- <input class="input denomination" maxlength="6" placeholder="请输入积分量" v-model.trim.number="deratePrice" /> -->
					<el-input v-model="deratePrice" placeholder="请输入积分量"></el-input>
				</div>
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
			isShowCa: false, // 是否展示时间选择组件
			selectShops: [], //选中的商铺
			validList: [{
				'validType': '0',
				'name': '相对时间'
			}, {
				'validType': '1',
				'name': '指定时间'
			}],
			validName: '相对时间',
			validType: {
				'index': 0, //0指定时间 1相对时间
				'time': '', //制定时间输入的值 领取后多少日生效
				'startTime': (new Date()).getTime(), //相对时间的开始时间
				'endTime': (new Date()).getTime(), //相对时间的结束时间
				'valueTime': [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
			}, //券有效期 
			annotation: '', //备注发
			useKnow: '', //使用须知
			deratePrice: '', //积分量
			editCoupon: false
		};
	},
	props: {
		couponDetail: Object, //详情
	},
	mounted() {
		this.ischain = storage.session('userShop').currentShop.ischain;
		if (!utils.isEmptyObject(this.couponDetail)) {
			let couponDetail = this.couponDetail;
			this.editCoupon = true;
			this.couponName = couponDetail.name; //优惠券名称
			this.deratePrice = couponDetail.param;//及分量
			this.validType.index = couponDetail.validityType; //相对时间 绝对时间
			// console.log(this.validType.index)
			if (couponDetail.validityType == 0) {
				this.validType.time = couponDetail.relativeTime;
			} else if (couponDetail.validityType == 1) {
				this.validName = '指定时间';
				this.validType.valueTime[0] = (couponDetail.startTime - 0) * 1000;
				this.validType.valueTime[1] = (couponDetail.endTime - 0) * 1000;
			}
			//this.validType.index = couponDetail.periodSel;
			this.annotation = couponDetail.annotation; //备注
			this.useKnow = couponDetail.useKnow; //使用须知

		}
	},
	components: {
		'can-multi': () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		'use-time': () =>
			import ( /* webpackChunkName:'use_time' */ './use_time'),
		goodListWin: () =>
			import ( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
	},
	methods: {
		closeShopWin(val) { //选择店铺弹窗关闭的回掉
			this.shopWin = false;
			if (val) {
				this.selectShops = val.selectShops;
			}
		},
		getArrLength(type) { //返回数组的长度
			return this[type].length;
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
		getAddAlltime(time) {
			this.validType.startTime = time.startTime;
			this.validType.endTime = time.endTime;
			this.isShowCa = false;
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
			let reg3 = /^[0-9]+$/;
			if (!global.checkData({
				couponName: {
					cond: `$$.trim() !== '' && $$.length<=20`,
					pro: '积分卡券名称不能为空且不能超过20个字'
				},
			}, this)) {
				return false;
			}
			if (!reg3.test(this.deratePrice)) {
				this.valiData('积分量只能是正整数');
				return false;
			}
			if ((this.deratePrice - 0) < 0) {
				this.valiData('积分量不能小于0');
				return false;
			}
			if (this.deratePrice == '') {
				this.valiData('请输入积分量');
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
				obj.shopIds = storage.session('userShop').currentShop.id;
				obj.gids = ''; //关联商品
				obj.pids = ''; //关联套餐
				obj.name = this.couponName; //优惠券名称
				obj.param = this.deratePrice; //积分量
				obj.delayHours = ''; //领取后生效时间
				//  'useTime' => '{'type':'week','list':[{'startslot':'09:00','endslot':'05:00','week':[0,1],'isNextDay':0}]}',       //使用时段，为空代表不限制
				obj.annotation = this.annotation; //优惠券备注
				obj.useKnow = this.useKnow; //使用须知
				obj.validityType = this.validType.index; //券有效期
				obj.periodSel = ''; //使用时间段
				obj.isDiscount = ''; // 是否强免 
				obj.tastePrice = ''; //是否包含口味价格
				obj.useLimit = ''; //最大使用上限
				obj.billPrice = ''; //入账金额
				obj.reckoningPrice = ''; //结算金额
				obj.lowestConsume = '';
				let useTime = {};
				obj.useTime = useTime;
				if (this.validType.index == 0) {
					obj.relativeTime = this.validType.time;
				} else {
					obj.startTime = parseInt(this.validType.valueTime[0] / 1000);
					obj.endTime = parseInt(this.validType.valueTime[1] / 1000);
				}
				obj.type = 7;
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