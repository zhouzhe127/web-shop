<template>
	<section>
		<Win @winEvent='winEvent' :width='800' :height='550'>
			<span slot='title'>{{type == 0?'余额操作':'积分操作'}}</span>
			<div class="member-details" id="balances" slot='content'>
				<div class="member-box">
					<p class="fl box-left">
						<template v-if="type == 0">余额变动量</template>
						<template v-else>积分变动量</template>
					</p>
					<input type="text" placeholder="请输入金额" v-model="amounts" class="fl" style="margin-left: 28px;text-indent: 10px;width: 217px;height: 41px;"
					    maxlength="5" v-if="type == '0'" />
					<input type="text" placeholder="请输入金额" v-model="points" class="fl" style="margin-left: 28px;text-indent: 10px;width: 217px;height: 41px;"
					    maxlength="5" v-else />
					<p class="fl balanceTip">
						<span :class="{'active' : operationIndex == 0}" @click="selectiveType('0')">增加</span>
						<span :class="{'active' : operationIndex == 1}" @click="selectiveType('1')">减少</span>
					</p>
				</div>
				<div class="reason">
					<p class="fl box-left" style="margin-top: 5px;">原因</p>
					<textarea rows="4" cols="62" style="margin-left: 28px;" placeholder="请输入变动原因" v-model="obj.behavior" maxlength="30"></textarea>
				</div>
				<p class="memberNotice">
					<img src="../../res/images/handle-tips.png" style="width: 17px;height: 17px;margin-right: 5px;" />最佳10个字，最多30个字，在余额详情显示</p>

				<div class="member-box">
					<p class="fl box-left">操作</p>
					<p class="fl" style="width: auto;margin-left: 28px;margin-right:10px;font-size: 16px;" v-if="type == '0'"> {{amount}}{{operationType}}{{obj.amount}}={{changeNum()}}</p>
					<p class="fl" style="width: auto;margin-left: 28px;margin-right:10px;font-size: 16px;" v-else>{{point}}{{operationType}}{{obj.point}}={{changeNum()}}</p>
					<p class="fl" style="height: 43px;line-height: 43px;display: flex;align-items: center;color: #A5A5A5;font-size: 14px;">
						<img src="../../res/images/handle-tips.png" style="width: 17px;height: 17px;margin-right: 7px;" />在原有余额上增加或减少</p>
				</div>
				<div class="reason">
					<p class="fl box-left" style="margin-top: 5px;">备注</p>
					<textarea rows="4" cols="62" style="margin-left: 28px;" placeholder="操作余额备注" maxlength="50" v-model="obj.remark"></textarea>
				</div>
				<div class="reason">
					<p class="fl box-left" style="height: 40px;line-height: 40px;">短信提醒</p>
					<on-off :status='onoff' @statusChange='statusChange' style="margin-left: 28px;"></on-off>
					<a class="fl" style="display: block;color: #F7931E;height: 40px;line-height: 40px;text-decoration: underline;margin-left: 32px;cursor: pointer;"
					    @click="usingSmsTemplates">使用短信模板</a>
					<textarea rows="6" cols="62" style="margin-left: 148px;margin-top:13px;" placeholder="短信提醒编辑" maxlength="50" v-model="obj.msg"></textarea>
				</div>
			</div>
		</Win>
	</section>

</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';

	// 限制数字
	let intReg = /[^\d]/g;

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
				operationIndex: 0,
				title: ''
			};
		},
		computed: {
			points: {
				get: function () {
					return this.obj.point;
				},
				set: function (newValue) {
					this.obj.point = newValue.replace(intReg, '');
				}
			},
			amounts: {
				get: function () {
					return this.obj.amount;
				},
				set: function (newValue) {
					this.obj.amount = newValue.replace(intReg, '');
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
					if (this.operationIndex == '0') {
						this.obj.type = 12;
					} else {
						this.obj.type = 13;
					}
				} else {
					if (this.operationIndex == '0') {
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
			selectiveType: function (type) {
				this.operationIndex = type;
				this.operationType = (type == 0) ? '+' : '-';
				this.changeNum();
			},
			changeNum: function () {
				// 计算类型变化
				if (this.type == '0') {
					if (this.operationIndex == '0') {
						return (Number(this.amount) + Number(this.obj.amount)).toFixed(2);
					} else {
						return (Number(this.amount) - Number(this.obj.amount)).toFixed(2);
					}
				} else {
					if (this.operationIndex == '0') {
						return (Number(this.point) + Number(this.obj.point)).toFixed(2);
					} else {
						return (Number(this.point) - Number(this.obj.point)).toFixed(2);
					}
				}
			},
			usingSmsTemplates: function () {
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
			}
		},
		components: {
			'Win': () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			'onOff': () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		}
	};
</script>

<style scoped>
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