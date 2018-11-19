<template>
	<Win :width='800' :height='250' @winEvent='winEvent'>
		<span slot='title'>会员充值</span>
		<div slot='content'>
			<div class="member-details" id="recharges" style="height: 240px;">
				<div class="details-head" style="border-bottom: none;">
					<div class="head-child">
						<span>手机号码：{{mobile}}</span>
						<span v-if="gender == 1">性别：男</span>
						<span v-if="gender == 2">性别：女</span>
						<span>生日：{{birthday}}</span>
					</div>
					<div class="head-child">
						<span class='text-over'>会员姓名：{{name}}</span>
						<span>年龄：{{age}}</span>
						<span>注册时间：{{createTime}}</span>
					</div>
					<div class="head-child">
						<span style='overflow: hidden;text-overflow:ellipsis;white-space: nowrap;'>会员等级：{{levelName}}</span>
						<span>余额：{{amount}}</span>
					</div>
					<div class="head-child" v-if="brandId != '3'">
						<div class="fl" style="width: 310px;">
							<span class="required fl" style="height: 40px;line-height: 40px;">充值金额</span>
							<input type="text" placeholder="请输入金额" class="fl" v-model="operateAmounts" maxlength="6" style="height: 36px;" />
							<span class="fl" style="width: 20px;padding: 0;height: 40px;line-height: 40px;">元</span>
						</div>
						<div class="fl" style="width: 310px;">
							<span class="fl" style="height: 40px;line-height: 40px;">赠送金额</span>
							<input type="text" placeholder="请输入金额" class="fl" v-model="operateGiftAmounts" maxlength="6" style="height: 36px;" />
							<span class="fl" style="width: 20px;padding: 0;height: 40px;line-height: 40px;">元</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Win>

</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	// 限制数字
	let floatReg = /[^\d]/g;

	export default {
		props: {
			gid: [Number, String],
			shopsId: [Number, String]
		},
		data() {
			return {
				operateAmount: '', //充值金额  
				operateGiftAmount: '0', //充值赠送的金额
				mobile: '',
				gender: '',
				name: '',
				levelName: '',
				birthday: '',
				amount: '',
				age: null,
				createTime: null,
				brandId: storage.session('userShop').currentShop.ischain, //3为品牌 0为单店
			};
		},
		methods: {
			winEvent(str) {

				if (this.brandId == 3) {
					this.$emit('winEvent', 'close');
					return;
				}
				if (str == 'ok') {
					this.setRecharge(this.gid);
				} else {
					this.$emit('winEvent', str);
				}

			},
			async setRecharge() {

				if (!this.operateAmount && this.brandId != 3) {
					this.$store.commit('setWin', {
						title: '提示',
						content: '充值金额不能为空'
					});
					return;
				}
				let fun = () => {
					this.$emit('winEvent', 'ok');
				};
				try {
					await http.addRechargeRecord({
						data: {
							memberId: this.gid, //会员id
							operateAmount: this.operateAmount, // 充值金额
							operateGiftAmount: this.operateGiftAmount, //赠送金额
							type: 2,
							payType: 1,
							shopId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId,
							shopsId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId
						}
					});
				} catch (e) {
					fun = () => {
						this.$emit('winEvent', 'close');
					};
				} finally {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '充值成功',
						callback: fun
					});
				}




			},
			async getMemberDetail() {
				let data = await http.getMemberDetail({
					data: {
						mid: this.gid,
						//shopId 和shopsId 必须要去掉
						// shopId:this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId,
						shopsId: this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId
					}
				});
				this.mobile = data.mobile;
				this.gender = data.gender;
				this.amount = data.totalAmount;
				this.name = data.name;
				this.levelName = data.levelName;
				this.birthday = data.birthday;
				this.age = data.age;
				this.createTime = utils.format(data.createTime, 'yyyy-MM-dd');
			}
		},
		computed: {
			operateAmounts: {
				get: function () {
					return this.operateAmount;
				},
				set: function (newValue) {
					this.operateAmount = newValue.replace(floatReg, '');
					this.operateAmount = utils.toFloatStr(this.operateAmount, 2);
					this.operateAmount = Math.floor(this.operateAmount);
				}
			},
			operateGiftAmounts: {
				get: function () {
					return this.operateGiftAmount;
				},
				set: function (newValue) {
					this.operateGiftAmount = newValue.replace(floatReg, '');
					this.operateGiftAmount = utils.toFloatStr(this.operateGiftAmount, 2);
					this.operateGiftAmount = Math.floor(this.operateGiftAmount);
				}
			},
			// start: {
			//     get: function() {
			//         return utils.format(data.atime,'yyyy-MM-dd');
			//     }
			// },
			// end: {
			//     get: function() {
			//         return utils.format(data.btime,'yyyy-MM-dd');
			//     }
			// }
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'Win' */ 'src/components/win')
		},
		mounted() {
			this.getMemberDetail(this.gid, this.shopsId);
		}
	};
</script>
<style scoped>
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

	.recharge-btn {
		height: 40px;
		line-height: 40px;
		margin-top: 5px;
	}

	.details-tit {
		text-align: center;
	}

	.details-tit h2 {
		position: relative;
		left: 50%;
		margin-left: -50px;
		font-size: 16px;
		width: 100px;
		height: 50px;
	}

	.details-tit h2:after,
	.details-tit h2:before {
		content: '';
		position: absolute;
		top: 50%;
		width: 10px;
		height: 10px;
		background-color: #000000;
		border-radius: 50%;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		transform: translate(-50%, 0);
		/* IE 9 */
		-ms-transform: translate(-50%, -50%);
		/* Firefox */
		-moz-transform: translate(-50%, -50%);
		/* Safari 和 Chrome */
		-webkit-transform: translate(-50%, -50%);
		/* Opera */
		-o-transform: translate(-50%, -50%);
	}

	.details-tit h2:after {
		right: -5px;
	}

	.details-tit h2:before {
		left: 5px;
	}
</style>