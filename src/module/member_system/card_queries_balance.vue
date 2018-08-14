<template>
	<win @winEvent="clickResult" :align="'right'" :width="850" :height="600">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<div class="member-details" id="balances">
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
						<span :class="{'active' : operationIndex == 1}" @click="selectiveType('1')">增加</span>
						<span :class="{'active' : operationIndex == 0}" @click="selectiveType('0')">减少</span>
					</p>
				</div>
				<div class="reason">
					<p class="fl box-left" style="margin-top: 5px;">原因</p>
					<textarea style="margin-left: 28px;width: 473px;height: 82px;" placeholder="请输入变动原因" v-model="obj.behavior" maxlength="30"></textarea>
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
					<textarea style="margin-left: 28px;width: 473px;height: 82px;" placeholder="操作余额备注" maxlength="50" v-model="obj.remark"></textarea>
				</div>
				<div class="reason">
					<p class="fl box-left" style="height: 40px;line-height: 40px;">短信提醒</p>
					<span :class="obj.msgStatus == false ?'off check-span' : 'on check-span'" @click="openSms" style="margin-left:28px;"></span>
					<a class="fl" style="display: block;color: #F7931E;height: 40px;line-height: 40px;text-decoration: underline;margin-left: 32px;cursor: pointer;"
					    @click="usingSmsTemplates">使用短信模板</a>
					<textarea style="margin-left: 148px;margin-top:13px;width: 473px;height: 112px;" placeholder="短信提醒编辑" maxlength="50" v-model="obj.msg"></textarea>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
	import http from 'src/manager/http';
	let intReg = /[^\d]/g; // 限制数字
	export default {
		data() {
			return {
				title: (this.type == 0) ? '余额操作' : '积分操作', //弹窗的标题
				onoff: false,
				obj: {
					point: 0, //积分
					amount: 0, //余额
					msg: '',
					type: '',
					behavior: '',
					remark: '',
					msgStatus: false
				},
				msgTemplate: '',
				amount: this.detaiList.cardAmount,
				point: this.detaiList.cardPoint,
				operationType: '+',
				operationIndex: 1

			};
		},
		props: {
			type: '',
			userData: Object,
			detaiList: Object, //详情数据
		},
		methods: {
			// 设置
			async compelUpdatePointAndBalance(backRes) {
				if (this.type == 0) {
					if (this.operationIndex == '1') {
						this.obj.type = 12;
					} else {
						this.obj.type = 13;
					}
				} else {
					if (this.operationIndex == '1') {
						this.obj.type = 10;
					} else {
						this.obj.type = 11;
					}
				}
				let res = await http.changeAmountAndPoint({
					data: {
						point: this.obj.point, //积分
						amount: this.obj.amount, //余额
						memberCardIds: this.detaiList.id, //卡的id
						sendMessage: this.obj.msg, //短信模板
						type: this.operationIndex == 1 ? 1 : 2, //增加还是减少
						behavior: this.obj.behavior, //原因
						remark: this.obj.remark //备注
					}
				});
				if (res) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '更改成功！'
					});
					this.$emit('throwWinResult', backRes); //抛出一个事件给父组件

				}
			},
			selectiveType: function (type) {
				this.operationIndex = type;
				this.operationType = (type == 1) ? '+' : '-';
				this.changeNum();
			},
			changeNum: function () {
				// 计算类型变化
				if (this.type == '0') {
					if (this.operationIndex == '1') {
						return (Number(this.amount) + Number(this.obj.amount)).toFixed(2);
					} else {
						return (Number(this.amount) - Number(this.obj.amount)).toFixed(2);
					}
				} else {
					if (this.operationIndex == '1') {
						return (Number(this.point) + Number(this.obj.point)).toFixed(2);
					} else {
						return (Number(this.point) - Number(this.obj.point)).toFixed(2);
					}
				}
			},
			usingSmsTemplates: function () {
				// 使用短信模版
				if (this.type == '1') {
					this.msgTemplate = String('尊敬的' + this.detaiList.name + '用户您好，由于' + this.obj.behavior + '原因，您的积分由' + this.detaiList
						.cardPoint + '变动至' + this.changeNum() + '敬请谅解。如有问题请致电：' + this.userData.currentShop.telephone);
				} else {
					this.msgTemplate = String('尊敬的' + this.detaiList.name + '用户您好，由于' + this.obj.behavior + '原因，您的余额由' + this.detaiList
						.cardAmount + '变动至' + this.changeNum() + '敬请谅解。如有问题请致电：' + this.userData.currentShop.telephone);
				}

				this.obj.msg = this.msgTemplate;
			},
			openSms: function () { //开启短信验证
				if (this.detaiList.mobile == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '暂未绑定手机号,无法使用短信提醒'
					});
					return false;
				}
				this.obj.msgStatus = !this.obj.msgStatus;
			},



			clickResult(res) {
				if (res == 'ok') {
					if (this.type == 0) {
						let str = this.obj.amount + '';
						if (str.trim() == '' || this.obj.amount == '0') {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '请填写余额值'
							});
							return false;
						}
						if (this.operationIndex == '0') {
							if (Number(this.obj.amount) > Number(this.amount)) {
								this.$store.commit('setWin', {
									title: '温馨提示',
									winType: 'alter',
									content: '操作余额不能大于总余额'
								});
								return false;
							}
						}
					} else {
						let strr = this.obj.point + '';
						if (strr.trim() == '' || this.obj.point == '0') {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '请填写积分值'
							});
							return false;
						}
						if (this.operationIndex == '0') {
							if (Number(this.obj.point) > Number(this.point)) {
								this.$store.commit('setWin', {
									title: '温馨提示',
									winType: 'alter',
									content: '操作积分不能大于总积分'
								});
								return false;
							}
						}
					}
					let regrr = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
					if (this.obj.behavior + '' != '' && !regrr.test(this.obj.behavior.trim())) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '原因只能输入字母、数字和汉字'
						});
						return false;
					}
					this.compelUpdatePointAndBalance(res); //余额积分操作
				} else {
					this.$emit('throwWinResult', res); //抛出一个事件给父组件
				}
			}
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
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
		}

	};
</script>

<style type="text/css" scoped>
	.member-details {
		height: 600px;
		width: 800px;
		overflow: hidden;
		padding: 20px 0;
	}

	.member-box {
		width: 100%;
		height: 43px;
		line-height: 43px;
		overflow: hidden;
		margin-bottom: 19px;
	}

	.box-left {
		width: 120px;
		font-size: 16px;
		color: #43414A;
		display: flex;
		justify-content: flex-end;
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

	.reason {
		width: 100%;
		height: 93px;
	}

	.member-details input::-webkit-input-placeholder {
		font-size: 14px;
		color: #A5A5A5;
		outline: none;
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

	#memberDetail .filtBox {
		width: 165px;
		height: 90px;
		line-height: 40px;
		border: 1px solid #3e3a43;
		background-color: #3e3a43;
		margin-top: 1px;
		z-index: 999;
		position: absolute;
		top: 0;
		left: 120px;
		color: #fff;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.filtBox:after {
		content: "";
		width: 6px;
		height: 6px;
		border-left: 1px solid #3e3a43;
		border-bottom: 1px solid #3e3a43;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		position: absolute;
		top: 22px;
		left: -5px;
		background: #3e3a43;
	}

	.member-box .balanceTip span.active {
		border: 1px #F7931E solid;
		background: #fde5c9;
		color: #F7931E;
	}

	.member-details {
		height: 700px;
		width: 800px;
		overflow: hidden;
	}

	.details-head {
		padding: 10px;
		padding-bottom: 0;
		width: 100%;
		height: 170px;
		border-bottom: 10px solid #e6e6e6;
	}
</style>