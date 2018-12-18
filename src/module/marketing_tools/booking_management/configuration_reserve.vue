<!-- 预约管理 -->
<template>
	<div id="configuration-reserve">
		<!-- 预约点餐 -->
		<div class="set-line">
			<div class="titles">预约点餐</div>
			<div class="line"></div>
		</div>
		<!-- 预约点餐开关 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">开启预约点餐</span>
			<div class="rightHalf">
				<el-switch class="fl" v-model="bookingStatus" active-color="#E1BB4A" inactive-color="#dcdfe6" style="margin-top: 10px;">
				</el-switch>
			</div>
		</div>
		<template v-if="bookingStatus">
			<!-- 支付方式 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">支付方式</span>
				<div class="rightHalf">
					<el-radio-group v-model="payTypeName" class="fl">
						<el-radio style="width:112px;text-align:center;" v-for="(item,index) in payWays" :key="index" :label="item.name" border @change.native="chooseReduction(item)"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<!-- 定金支付的比例 -->
			<div class="online-box clearfix" v-if="payTypeId == 5">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span class="fl describes">支付定金的</span>
					<el-input class='fl' v-model="payAttr" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px;">
						<template slot="suffix">%</template>
					</el-input>
				</div>
			</div>
			<!-- 桌台提醒 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">桌台提醒</span>
				<div class="rightHalf">
					<el-select v-model="durationName" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in durationList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<!-- 微信提醒 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">微信提醒</span>
				<div class="rightHalf">
					<el-select class="fl" v-model="durationNameWX" placeholder="请选择" @change="selexpirationTimeWX" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in durationList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<span v-if="durationIdWX != -1" class="fl describes" style="margin-left: 10px;">提醒顾客到店</span>
				</div>
			</div>
			<!-- 是否允许取消订单 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">是否允许取消订单</span>
				<div class="rightHalf">
					<el-radio-group v-model="orderName" class="fl">
						<el-radio style="width:112px;text-align:center;" v-for="(item,index) in permit" :key="index" :label="item.name" border @change.native="chooseReductionOrder(item)"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<!-- 到店取消规则 -->
			<div class="online-box clearfix" v-if="orderId == 1">
				<span class="online-sub fl required">到店取消规则</span>
				<div class="rightHalf">
					<div class="ac-bordr">
						<template v-for="(item,index) in cancel.arr">
							<div class="ac-options" :key="index">
								<div class="ac-text" style="width: 80px;" v-if="index==0">
									提前
								</div>
								<div class="ac-text" style="width: 80px;" v-if="index!=0 && cancel.arr.length>1">
									{{cancel.arr[index-1].time}}分钟 --
								</div>
								<el-input class="fl" v-model="item.time" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px;">
									<template slot="suffix">分钟内</template>
								</el-input>
								<div class="ac-text" style="width: 30px;">
									退
								</div>
								<el-input class="fl" v-model="item.value" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px;">
									<template slot="suffix">%</template>
								</el-input>
								<div class="ac-icon ac-add" @click="funAddDelTag(false)" v-if="cancel.arr.length<2"></div>
								<div class="ac-icon ac-del" @click="funAddDelTag(true)" v-if="cancel.arr.length>1 && index!=0"></div>
							</div>
						</template>
						<div class="ac-bottom">
							<div class="ac-text" style="width: 102px;margin-left: 80px;text-align: center;">
								{{cancel.arr[cancel.arr.length-1].time}}分钟外
							</div>
							<div class="ac-text" style="width: 30px;">
								退
							</div>
							<el-input class="fl" v-model="cancel.other" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px;">
								<template slot="suffix">%</template>
							</el-input>
						</div>
					</div>
				</div>
			</div>
			<!-- 是否延长桌位预留 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">是否延长桌位预留</span>
				<div class="rightHalf">
					<el-radio-group v-model="tableName" class="fl">
						<el-radio style="width:112px;text-align:center;" v-for="(item,index) in delays" :key="index" :label="item.name" border @change.native="chooseReductionTable(item)"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<!-- 是否延长桌位预留 -->
			<div class="online-box clearfix" v-if="tableId == 1">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span class="fl describes">预留</span>
					<el-select class="fl" v-model="reservedName" placeholder="请选择" @change="selexpirationReserved" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in reservedList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
			</div>
			<!-- 超出预留时间是否允许退款 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">超出预留时间退款</span>
				<div class="rightHalf">
					<el-radio-group v-model="refundName" class="fl">
						<el-radio style="width:112px;text-align:center;" v-for="(item,index) in permit" :key="index" :label="item.name" border @change.native="chooseReductionRefund(item)"></el-radio>
					</el-radio-group>
				</div>
			</div>
			<!-- 过期退 -->
			<div class="online-box clearfix" v-if="refundId == 1">
				<span class="online-sub fl"></span>
				<div class="rightHalf">
					<span class="fl describes">过期退</span>
					<el-input class='fl' v-model="isReturn" maxlength="3" onkeyup="value=value.replace(/[^\d]/g,'')" style="width:100px;">
						<template slot="suffix">%</template>
					</el-input>
				</div>
			</div>
		</template>
		<!-- 过期退 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<el-button type="primary" style="width:190px;" @click="editSave">保存</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
/*
	    "id": "2",
	    "shopId": "61",
	    "status": "1",                  //是否开启预约管理  1:开启
	    "isCancel": "",                 //是否允许取消订单  1:允许
	    "refund": "0",                //是否允许退款      1:允许
	    "payType": "5",                 //支付类型   payType=1全额支付 payType=5定金支付             
	    "payAttr": "11",                //定金支付
	    "isExtendSeat": "20",           //预留时间      0:不预留
	    "tableRemindTime": "-1",        //桌台提醒      -1:关闭提醒
	    "wechatRemindTime": "-1",       //微信提醒      -1:关闭提醒
	    "updateTime": "0",
	    "updateUid": "29"

	*/
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
export default {
	data() {
		return {
			shopId: null,
			bookingStatus: false, //预约状态
			payWays: [{
				id: 5,
				name: '定金支付'
			},
			{
				id: 1,
				name: '全额支付'
			}], //支付方式	
			payTypeName: '定金支付',
			payTypeId: 5,
			payAttr: '', //支付定金的百分比		
			durationList: [{ //活动期限
				name: '关闭提醒',
				id: -1
			},
			{
				name: '10分钟',
				id: 10
			},
			{
				name: '20分钟',
				id: 20
			},
			{
				name: '30分钟',
				id: 30
			}],
			durationId: -1, //桌台提醒
			durationName: '关闭提醒', //桌台提醒
			durationNameWX: '关闭提醒',
			durationIdWX: -1, //微信提醒
			permit: [{ //是否允许取消订单{
				id: 0,
				name: '不允许'
			},
			{
				id: 1,
				name: '允许'
			}],
			orderName: '不允许', //是否允许取消订单
			orderId: 0, //是否允许取消订单	
			refundName: '不允许', //是否允许退款
			refundId: 0, //是否允许退款					
			delays: [{
				id: 0,
				name: '不延长'
			},
			{
				id: 1,
				name: '延长'
			}], //是否延长桌位预留
			tableName: '不延长',
			tableId: 0,
			reservedList: [{ //延长桌位预留时间
				id: 10,
				name: '10分钟'
			}, {
				id: 20,
				name: '20分钟'
			}, {
				id: 30,
				name: '30分钟'
			}],
			reservedName: '10分钟', //延长桌位预留时间
			reservedId: 10, //延长桌位预留时间
			isReturn: '', //退款的百分比
			order: {
				status: false, //是否开启预约管理
				payType: 5, //支付类型
				payTypeName: '定金支付',
				payAttr: '', //定金支付百分比
				red: false
			},
			cancel: {
				show: 0,
				isCancel: '', //取消订单
				arr: [{
					time: '',
					value: '',
					red: false
				}],
				other: ''
			},
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
		// 选择支付方式
		chooseReduction: function(item) {
			this.payTypeId = item.id;
		},
		selexpirationTime: function(val) { //桌台提醒
			this.durationId = val; //点击对应的id
		},
		selexpirationTimeWX: function(val) { //微信提醒
			this.durationIdWX = val; //点击对应的id
		},
		chooseReductionOrder: function(item) {
			this.orderId = item.id;
		},
		chooseReductionTable: function(item) { //是否延长桌位预留
			this.tableId = item.id;
		},
		selexpirationReserved: function(val) { //桌台提醒
			this.reservedId = val; //点击对应的id
		},
		chooseReductionRefund: function(item) { //是否允许退款
			this.refundId = item.id;
		},
		//添加取消时间段
		funAddDelTag(flag) {
			if (flag) {
				this.cancel.arr.pop();
			} else {
				this.cancel.arr.push({
					time: '',
					value: '',
					red: false
				});
			}
		},
		getName: function(arr, id) {
			let name = '';
			for (let item of arr) {
				if (id == item.id) {
					name = item.name;
					break;
				}
			}
			return name;
		},
		//初始化数据
		initData() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
		},
		async getReserveConfig() { //获取配置
			let res = await http.getReserveConfig({
				data: {
					shopId: this.shopId
				}
			});
			if (res) {
				this.bookingStatus = Boolean(Number(res.status)); //点餐开关
				if (this.bookingStatus) {
					this.payTypeId = res.payType; //支付方式
					this.payTypeName = this.getName(this.payWays, this.payTypeId);
					this.payAttr = res.payAttr; //定金的百分比
					this.durationId = res.tableRemindTime; //桌台提醒的id
					this.durationName = this.getName(this.durationList, this.durationId);
					this.durationIdWX = res.wechatRemindTime;
					this.durationNameWX = this.getName(this.durationList, this.durationIdWX);
					//是否允许取消订单
					if (res.isCancel && res.isCancel != '') {
						this.orderId = 1;
						this.orderName = this.getName(this.permit, this.orderId);
						this.cancel.isCancel = res.isCancel;
						//0_100,10_80,60_10     0_100,10_10
						let arr = res.isCancel.split(',');
						if (arr.length > 2) {
							this.funAddDelTag(false);
						}
						let temp = [];
						arr.forEach(ele => {
							let str = ele.split('_');
							temp.push(...str);
						});
						this.cancel.other = temp.pop();
						temp.shift();
						temp.forEach((ele, index) => {
							let i = Math.floor(index / 2);
							index % 2 ?
								(this.cancel.arr[i].time = ele) :
								(this.cancel.arr[i].value = ele);
							this.cancel.arr[i].red = false;
						});
					}
					// 是否延长桌位预留
					if (res.isExtendSeat != 0) {
						this.tableId = 1;
						this.tableName = this.getName(this.delays, this.tableId);
						this.reservedId = res.isExtendSeat;
						this.reservedName = this.getName(this.reservedList, this.reservedId);
					}
					//超出预留时间退款
					if (res.isReturn != 0) {
						this.refundId = 1;
						this.refundName = this.getName(this.permit, this.refundId);
						this.isReturn = res.isReturn;
					}
				}
			}
		},
		async updateReserveConfig(obj) {
			let res = await http.updateReserveConfig({
				data: obj
			});
			if (res) {
				this.valiData('保存着成功');
			}
		},
		checkForm: function() { //验证表单
			//支付方式
			if (this.payTypeId == 5) {
				if (this.payAttr == '') {
					this.valiData('请填写定金支付的百分比');
					return false;
				}
				if (this.payAttr < 1 || this.payAttr > 100) {
					this.valiData('定金百分比取值范围1-100');
					return false;
				}
			}
			if (this.orderId == 1) {
				for (let item of this.cancel.arr) {
					if (item.time == '' || item.value == '') {
						this.valiData('请完善到店取消规则信息');
						return false;
					}
				}
				if (this.cancel.other == '') {
					this.valiData('请完善到店取消规则信息');
					return false;
				}
			}
			if (this.refundId == 1) {
				if (this.isReturn == '') {
					this.valiData('请填写过期退款的百分比');
					return false;
				}
				if (this.isReturn < 1 || this.isReturn > 100) {
					this.valiData('过期退款百分比取值范围1-100');
					return false;
				}
			}
			return true;
		},
		//保存
		editSave: function() {
			let obj = {};
			if (this.bookingStatus) {
				if (!this.checkForm()) return;
				obj.status = Number(this.bookingStatus); //预约状态
				obj.payType = this.payTypeId; //支付方式
				obj.payAttr = this.payTypeId == '5' ? this.payAttr : ''; //定金支付的百分比
				obj.tableRemindTime = this.durationId; //桌台提醒
				obj.wechatRemindTime = this.durationIdWX; //微信提醒
				if (this.orderId == 1) {
					//0_100,10_80,60_10     0_100,10_10
					let temp = [];
					temp[0] = 0;
					let str = '';
					this.cancel.arr.forEach((ele) => {
						temp.push('_' + ele.value + ',');
						temp.push(ele.time);
					});
					temp.push('_' + this.cancel.other);
					str = temp.join('');
					obj.isCancel = str;
				} else {
					obj.isCancel = '';
				}
				obj.isExtendSeat = this.tableId == 1 ? this.reservedId : 0; //是否延长桌位预留
				obj.isReturn = this.refundId == 1 ? this.isReturn : 0; //超出预留时间是否允许退款
			} else {
				obj.status = Number(this.bookingStatus); //预约状态
			}
			this.updateReserveConfig(obj);
		},
	},
	mounted() {
		this.initData();
		this.getReserveConfig();
	},
	components: {
		onOff: () =>
			import( /*webpackChunkName:'on_off'*/ 'src/components/on_off'),
		radio: () =>
			import( /*webpackChunkName:'radio'*/ 'src/components/radio_btn'),
		selectBtn: () =>
			import( /*webpackChunkName:'select_btn'*/ 'src/components/select_btn')
	}
};
</script>
<style lang='less' scoped>
#configuration-reserve {
	max-width: 1400px;
	height: auto;
}

#configuration-reserve .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#configuration-reserve .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#configuration-reserve .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#configuration-reserve .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#configuration-reserve .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#configuration-reserve .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
	line-height: 40px;
}

#configuration-reserve .online-box .rightHalf .describes {
	display: block;
	margin-right: 10px;
}

#configuration-reserve .online-box .rightHalf .ac-bordr {
	width: 450px;
	border: 1px solid #dcdfe6;
	float: left;
	margin-left: 10px;
	padding-bottom: 60px;
	position: relative;
	cursor: pointer;
	border-radius: 4px;
}

#configuration-reserve .online-box .rightHalf .ac-bordr .ac-options {
	width: 100%;
	display: flex;
	align-items: center;
	float: left;
	height: 50px;
}

.ac-text {
	float: left;
	height: 40px;
	text-align: right;
	width: 180px;
	line-height: 40px;
	margin-right: 10px;
}

.ac-bottom {
	position: absolute;
	bottom: 10px;
	left: 0;
	display: flex;
	align-items: center;
}

.ac-icon {
	width: 40px;
	height: 30px;
	float: left;
	margin-left: 20px;
	margin-top: 15px;
	text-align: center;
	line-height: 30px;
}


.ac-add {
	background: url(../../../res/images/grayadd.png) center center no-repeat;
}

.ac-del {
	background: url(../../../res/icon/delete.png) center center no-repeat;
}

.way-con {
	width: 174px;
	float: left;
	margin-left: 100px;
	margin-top: 10px;
	position: relative;

	input {
		width: 100px;
		height: 38px;
		line-height: 38px;
		padding: 0;
		outline-color: #29abe2;
		padding-left: 10px;
		position: relative;
	}

	.wc-p {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
	}

	.wc-sele {
		height: 40px;
		border: 1px solid #ecedf2;
		width: 186px;
		position: relative;
		cursor: pointer;
	}

	.wc-text {
		text-align: center;
		width: 146px;
		height: 38px;
		line-height: 38px;
		border-right: 1px solid #ecedf2;
	}

	.triangle {
		position: absolute;
		right: 14px;
		top: 56%;
		transform: translate(0, -50%);
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid #b3b3b3;
	}

	.wc-list {
		top: 40px;
		left: 0;
		z-index: 8888;
		position: absolute;

		div {
			height: 40px;
			border: 1px solid #ecedf2;
			width: 186px;
			text-align: center;
			line-height: 40px;
			border-top: none;
			background-color: #f1f1f1;
			z-index: 99;
			cursor: pointer;
		}
	}
}
</style>