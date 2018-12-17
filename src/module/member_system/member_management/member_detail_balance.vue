<template>
	<section>
		<Win @winEvent='winEvent' :width='800' :height='550'>
			<span slot='title'>{{type == 0?'余额操作':'积分操作'}}</span>
			<div class="member-details" id="balances" slot='content'>
				<!-- 余额变动量 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">{{changeList[type]}}</span>
					<div class="rightHalf">
						<el-input class="fl" v-model="amounts" maxlength="7" placeholder="请输入金额" style="width:179px;margin-right: 10px;" v-if="type == 0" @blur="formatValue"></el-input>
						<el-input class="fl" v-model="points" maxlength="5" placeholder="请输入积分" style="width:179px;margin-right: 10px" v-else></el-input>
						<el-radio-group v-model="calculateName" class="fl">
							<el-radio style="width:112px;text-align:center;" v-for="(item,index) in calculateList" :key="index" :label="item.name" border @change.native="chooseReduction(index)"></el-radio>
						</el-radio-group>
					</div>
				</div>
				<!-- 原因 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">原因</span>
					<div class="rightHalf">
						<el-input type="textarea" v-model="obj.behavior" maxlength="30" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入变动原因" style="width:420px;"></el-input>
						<div class="handle-tips">
							<i></i> 说明:最佳10个字，最多30个字，在余额详情显示
						</div>
					</div>
				</div>
				<!-- 操作 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">操作</span>
					<div class="rightHalf">
						<p class="fl" style="font-size: 16px;" v-if="type == '0'"> {{amount}}{{operationType}}{{obj.amount}}={{changeNum()}}</p>
						<p class="fl" style="font-size: 16px;" v-else>{{point}}{{operationType}}{{obj.point}}={{changeNum()}}</p>
						<div class="fl handle-tips" style="margin-left: 20px;">
							<i></i> 说明:在原有余额上增加或减少
						</div>
					</div>
				</div>
				<!-- 备注 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">备注</span>
					<div class="rightHalf">
						<el-input type="textarea" v-model="obj.remark" maxlength="50" :autosize="{ minRows: 3, maxRows: 5}" placeholder="操作余额备注" style="width:420px;"></el-input>
					</div>
				</div>
				<!-- 短信提醒 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">短信提醒</span>
					<div class="rightHalf">
						<el-switch class="fl" v-model="onoff" active-color="#E1BB4A" inactive-color="#dcdfe6" style="margin-top: 10px;margin-right: 20px;">
						</el-switch>
						<el-button size="medium" type="text" style="color: #29abe2;" @click="usingSmsTemplates">使用短信模板</el-button>
						<div>
							<el-input type="textarea" v-model="obj.msg" maxlength="50" :autosize="{ minRows: 3, maxRows: 5}" placeholder="短信提醒编辑" style="width:420px;"></el-input>
						</div>
					</div>
				</div>
			</div>
			</div>
		</Win>
	</section>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

// 限制数字
let intReg = /[^\d]/g;
let intPointReg = /[^\d.]/g;

// 限制输入数字和小数点
// let floatReg = /[^\d\.]/g;

export default {
	props: {
		memberInfo: Object,
		type: [String, Number],
		shopId: [String, Number]
	},
	data() {
		return {
			onoff: false,
			obj: {
				point: 0,
				amount: 0,
				mobile: '',
				msg: '',
				type: '',
				behavior: '',
				remark: '',
				msgStatus: ''
			},
			msgTemplate: '',
			amount: this.memberInfo.totalAmount,
			point: this.memberInfo.point,
			operationType: '+',
			title: '',
			calculateList: [{
				name: '增加',
				id: 0
			}, {
				name: '减少',
				id: 1
			}],
			calculateName: '增加',
			calculateId: 0,
			changeList: {
				0: '余额变动量',
				1: '积分变动量'
			}
		};
	},
	computed: {
		points: {
			get: function() {
				return this.obj.point;
			},
			set: function(newValue) {
				this.obj.point = newValue.replace(intReg, '');
			}
		},
		amounts: {
			get: function() {
				return this.obj.amount;
			},
			set: function(newValue) {
				this.obj.amount = newValue.replace(intPointReg, '');
			}
		}
	},
	methods: {
		statusChange(bol) {
			this.onoff = bol;
		},
		winEvent(str) {
			if (str == 'ok') {
				this.compelUpdatePointAndBalance();
			} else {
				this.$emit('winEvent', 'close');
			}

		},
		async compelUpdatePointAndBalance() {

			if (this.type == 0) {
				if (this.calculateId == '0') {
					this.obj.type = 12;
				} else {
					this.obj.type = 13;
				}
			} else {
				if (this.calculateId == '0') {
					this.obj.type = 10;
				} else {
					this.obj.type = 11;
				}
			}
			// 设置
			await http.compelUpdatePointAndBalance({
				data: {
					memberId: this.memberInfo.memberId,
					point: this.obj.point,
					amount: this.obj.amount,
					mobile: this.memberInfo.mobile,
					msg: this.obj.msg,
					type: this.obj.type,
					behavior: this.obj.behavior,
					remark: this.obj.remark,
					msgStatus: Number(this.onoff),
					totalAmount: this.memberInfo.totalAmount,
					shopId: this.shopId
				}
			});


			if (this.type == 0) {
				this.memberInfo.totalAmount = this.changeNum();
			} else {

				this.memberInfo.point = this.changeNum();
			}
			this.$store.commit('setWin', {
				title: '提示信息',
				content: '更改成功！'
			});
			this.$emit('winEvent', 'close');


		},
		// selectiveType: function(type) {
		// 	this.calculateId = type;
		// 	this.operationType = (type == 0) ? '+' : '-';
		// 	this.changeNum();
		// },
		chooseReduction: function(item) {
			this.calculateId = item;
			this.operationType = (item == 0) ? '+' : '-';
			this.changeNum();
		},
		changeNum: function() {
			// 计算类型变化
			if (this.type == '0') {
				if (this.calculateId == '0') {
					return (Number(this.amount) + Number(this.obj.amount)).toFixed(2);
				} else {
					return (Number(this.amount) - Number(this.obj.amount)).toFixed(2);
				}
			} else {
				if (this.calculateId == '0') {
					return (Number(this.point) + Number(this.obj.point)).toFixed(2);
				} else {
					return (Number(this.point) - Number(this.obj.point)).toFixed(2);
				}
			}
		},
		usingSmsTemplates: function() {
			// 使用短信模版
			let userData = storage.session('userShop');
			if (this.type == '1') {
				this.msgTemplate = String('尊敬的' + this.memberInfo.name + '用户您好，由于' + this.obj.behavior + '原因，您的积分由' + this.memberInfo
					.point + '变动至' + this.changeNum() + '敬请谅解。如有问题请致电：' + userData.currentShop.telephone);
			} else {
				this.msgTemplate = String('尊敬的' + this.memberInfo.name + '用户您好，由于' + this.obj.behavior + '原因，您的余额由' + this.memberInfo
					.totalAmount + '变动至' + this.changeNum() + '敬请谅解。如有问题请致电：' + userData.currentShop.telephone);
			}

			this.obj.msg = this.msgTemplate;
		},
		formatValue:function(){
			this.obj.amount = utils.toFloatStr(this.obj.amount, 2);
		}
	},
	components: {
		'Win': () =>
			import( /* webpackChunkName:'win' */ 'src/components/win'),
		'onOff': () =>
			import( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
	}
};
</script>
<style scoped>
.member-details {
	max-width: 1400px;
	height: auto;
}

.member-details .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

.member-details .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

.member-details .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

.member-details .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

.member-details .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

.member-details .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
	line-height: 40px;
}

.member-details .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
	color: #999999;
}

.member-details {
	height: 600px;
	width: 800px;
	overflow: hidden;
	padding: 20px 0;
}

.member-details input::-webkit-input-placeholder {
	font-size: 14px;
	color: #A5A5A5;
	outline: none;
}

.member-box {
	width: 100%;
	height: 43px;
	line-height: 43px;
	overflow: hidden;
	margin-bottom: 19px;
}

.member-box .balanceTip {
	width: 220px;
	height: 41px;
	margin-left: 19px;
	display: flex;
	justify-content: space-between;
}

.member-box .balanceTip span {
	display: block;
	width: 101px;
	height: 41px;
	line-height: 41px;
	border: 1px #D2D2D2 solid;
	float: left;
	font-size: 14px;
	text-align: center;
}

.member-box .balanceTip span.active {
	border: 1px #F7931E solid;
	background: #fde5c9;
	color: #F7931E;
}

.reason {
	width: 100%;
	height: 93px;
}

.box-left {
	width: 120px;
	font-size: 16px;
	color: #43414A;
	display: flex;
	justify-content: flex-end;
}

.reason textarea::-webkit-input-placeholder {
	font-size: 14px;
	color: #A5A5A5;
}

.memberNotice {
	margin-left: 148px;
	height: 36px;
	padding: 10px 0;
	line-height: 36px;
	display: flex;
	align-items: center;
	color: #A5A5A5;
	font-size: 14px;
}

.check-span {
	float: left;
}

.reason textarea {
	resize: none;
	border: 1px #D2D2D2 solid;
	padding: 10px;
	box-sizing: border-box;
	outline: none;
}

.member-box .balanceTip span.active {
	border: 1px #F7931E solid;
	background: #fde5c9;
	color: #F7931E;
}

.details-head {
	padding: 10px;
	padding-bottom: 0;
	width: 100%;
	height: 170px;
	border-bottom: 10px solid #e6e6e6;
}

.head-child,
.details-tit {
	height: 50px;
	line-height: 50px;
	width: 100%;
}

.head-child:nth-child(2) {
	border-bottom: 1px solid #F2DEDE;
}

.head-child span {
	width: 33.33%;
	height: 50px;
	float: left;
}

.head-child input {
	padding-left: 10px;
	border: 1px solid #C6C6C6;
	outline: none;
	color: #666;
	height: 46px;
	width: 150px;
}

.head-child span:nth-child(1n) {
	padding-left: 20px;
}

.head-child span:nth-child(2n) {
	text-align: left;
	text-indent: 50px;
}

.head-child span:nth-child(3n) {
	padding-right: 20px;
	text-align: right;
}
</style>