<template>
	<section style='text-align:left;width: 100%;' id='jifen'>
		<div class='integra-content'>
			<div class='heade-title'>
				会员获得积分设置
			</div>
			<div class='topR'>
				<section class='fl' style='clear: both;'>
					<label class='commodity-name fl'>参与积分</label>
					<!-- <on-off @statusChange='(val)=> on = val' :status='on'></on-off> -->
                    <div class="rightHalf">
                        <el-switch v-model="on" active-color="#E1BB4A" inactive-color="#dcdfe6">
                        </el-switch>
                    </div>
				</section> 
			</div>
			<div class='picName'>
				<span class='required' style='display: block;float:left;width:100px;line-height: 40px;'>积分比例 </span>
				<!-- <input type='text' maxlength='4' :disabled='disabled' v-model='cash' placeholder='请输入现金' /> -->
				<el-input type='text' maxlength='4' :disabled='disabled' v-model='cash' placeholder='请输入现金' style="width:80px;"></el-input>
				<i>&nbsp;&nbsp;：</i>
				<!-- <input type='text' maxlength='4' :disabled='disabled' v-model='integral' placeholder='请输入积分' /> -->
				<el-input type='text' maxlength='4' :disabled='disabled' v-model='integral' placeholder='请输入积分' style="width:80px;"></el-input>
			</div>
			<div class='topR'>
				<section class='fl' style='clear: both;position: relative;'>
					<label class='commodity-name fl'>积分永久有效</label>
					<div class='mesking' v-if='!on'>

					</div>
					<!-- <on-off @statusChange='(val)=> expiration = val' :status='expiration'></on-off> -->
					<div class="rightHalf">
                        <el-switch v-model="on" active-color="#E1BB4A" inactive-color="#dcdfe6">
                        </el-switch>
                    </div>
				</section>
			</div>
			<div class='expiration-time'>
				<div class='required time-exp'>积分清零时间</div>
				<!-- <input type='text' maxlength='2' :disabled='disabledExp' placeholder='请输入月' v-model='month' />&nbsp;&nbsp;月&nbsp; -->
				<el-input type='text' maxlength='2' :disabled='disabledExp' placeholder='请输入月' v-model='month' style="width:80px;"></el-input>&nbsp;&nbsp;月&nbsp;

				<!-- <input type='text' maxlength='2' :disabled='disabledExp' placeholder='请输入日' v-model='day' />&nbsp;&nbsp;日&nbsp;&nbsp; -->
				<el-input type='text' maxlength='2' :disabled='disabledExp' placeholder='请输入日' v-model='day' style="width:80px;"></el-input>&nbsp;&nbsp;日&nbsp;

			</div>
		</div>
		<!-- <a v-if='isBrand' href='javascript:void(0);' v-on:click='keepOn' class='yellow' style='margin:20px 0 0 100px;width:250px;'>保存</a> -->
			<el-button type="primary" v-if='isBrand' href='javascript:void(0);' v-on:click='keepOn' class='yellow' style='margin:20px 0 0 100px;width:250px;'>保存</el-button>

	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				isBrand: parseInt(storage.session('userShop').currentShop.brandId) > 0 ? false : true, //判断是否是品牌
				on: false, //开关按钮
				oned: false, //记录开关
				cash: '', //现金
				integral: '', //积分
				disabled: true,
				disabledExp: true,
				month: '',
				day: '',
				expiration: false, //永久会员积分按钮
				spreader: '',
				follower: ''
			};
		},
		computed: {
			spreaders: {
				get() {
					return this.spreader;
				},
				set(newValue) {
					this.spreader = newValue.replace(/[^\d]/g, '');
				}
			},
			followers: {
				get() {
					return this.follower;
				},
				set(newValue) {
					this.follower = newValue.replace(/[^\d]/g, '');
				}
			}
		},
		watch: {
			'on': 'ons',
			'expiration': 'expirations'
		},
		methods: {
			keepOn() { //点击保存
				if (this.on == false && this.oned == true) {
					this.$store.commit('setWin', {
						winType: 'confirm',
						content: '关闭积分功能，所有会员消费将不再获得积分！',
						title: '操作提示',
						callback: (str) => {
							str == 'ok' && this.setPointConfig();
						}
					});
				} else {
					if (this.expiration == false) {
						if (this.checkData(this.month, this.day)) {
							this.setPointConfig();
						}
					} else {
						this.setPointConfig();
					}
				}
			},
			ons() {
				if (this.on == false) {
					this.disabled = true;
					this.disabledExp = true;
					this.month = '';
					this.day = '';
					this.integral = '';
					this.cash = '';
					if (this.expiration == true) {
						this.expiration = false;
					}
				} else {
					this.disabled = false;
					this.disabledExp = false;
				}
			},
			expirations() {
				if (this.on == false) {
					this.expiration == true;
					return false;
				}
				if (this.on == true && this.expiration == true) {
					this.disabledExp = true;
					this.month = '';
					this.day = '';
				} else {
					this.disabledExp = false;
				}
			},
			checkData(m, d) {
				if (isNaN(d) || isNaN(m)) {
					this.$store.commit('setWin', {
						content: '请输入正确格式的月份和日期',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				m -= 0;
				d -= 0;
				if (m < 0 || m > 12) {
					this.$store.commit('setWin', {
						content: '请输入正确的月份(0-12的正整数)',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				if (d == 0 && this.expiration) {
					this.$store.commit('setWin', {
						content: '请输入正确的日(不能为“0”)',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				let dd = this.getDay(m);
				if (!global.checkData({
					m: {
						reg: /^\d*$/,
						pro: '请输入月份只能是正整数',
						value: m
					},
					d: {
						reg: /^\d*$/,
						pro: '请输入日只能是正整数',
						value: d
					},

				}, this)) {
					return false;
				}
				if (d > dd || d < 0) {
					this.$store.commit('setWin', {
						content: '日输入错误(不能超过当月的总天数)',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				} else {
					return true;
				}

			},
			getDay(m) {
				let a31 = [1, 3, 5, 7, 8, 10, 12];
				// let a30 = [4, 6, 9, 11];

				if (m == 2) {
					return 28;
				}
				if (this.checkArr(m, a31)) {
					return 31;
				} else {
					return 30;
				}

			},
			checkArr(item, arr) {
				let obj = {};
				for (let i = 0; i < arr.length; i++) {
					if (!obj[arr[i]]) {
						obj[arr[i]] = 1;
					}
				}
				if (!obj[item]) {
					return false;
				} else {
					return true;
				}
			},
			async getPointConfig() { //获取信息
				let res = await http.getPointConfig({
					data: {}
				});
				if (res.list.status != 0) {
					this.on = true;
					this.cash = res.list.cash;
					this.integral = res.list.point;
					let dates = res.list.expirationTime;

					if (dates == 0) {
						this.expiration = true;
						this.month = '';
						this.day = '';
					} else {
						dates *= 1000;
						let dd = new Date(dates);
						this.month = dd.getMonth() + 1;
						this.day = dd.getDate() - 1;
					}
					if (this.on) {
						this.oned = this.on;
					}
				}
				this.spreader = res.list.spreaderPoint;
				this.follower = res.list.followerPoint;
			},
			async setPointConfig() {
				// let isNum = /^\d+(\.\d+)?$/;
				let daT = ''; //   积分失效时间
				if (this.on) {

					if (!global.checkData({
						cash: {
							cond: `$$ != '' && $$ != 0`,
							pro: '现金不能为空且不能为0'
						},
						integral: {
							cond: `$$ != ''`,
							pro: '积分不能为空且不能为0'
						},
					}, this)) {
						return false;
					}
					if (!/^\d+(\.\d+)?$/.test(this.cash)) {
						this.prompt('请正确输入正确的现金数');
						return false;
					}
					if (!/^\d+(\.\d+)?$/.test(this.integral)) {
						this.prompt('请正确输入正确的积分数');
						return false;
					}
					if (this.expiration == false) {
						if (!global.checkData({
							cash: {
								month: `$$ != '' && $$ != 0`,
								pro: '请输入月份且不能为0'
							},
							day: {
								cond: `$$ != '' && $$ != 0`,
								pro: '请输入正确的日'
							},
						}.this)) {
							return false;
						}
					}
					let ddd = new Date();
					ddd.setMonth(this.month - 1);
					ddd.setDate((this.day - 0) + 1);
					daT = utils.getTime({
						time: new Date(ddd),
						type: true
					}).start;
					daT = parseInt(daT / 1000);
					this.cash = utils.toFloatStr(this.cash + '', 2);

					this.integral = utils.toFloatStr(this.integral + '', 2);
				} else {
					this.cash = 0;
					this.integral = 0;
				}
				let status;

				if (this.on == false) {
					status = 0;
				} else {
					status = 1;
				}
				let expirationTime = 0;
				if (this.expiration) {
					expirationTime = 0;
				} else {
					expirationTime = daT;
				}

				if (this.spreader && this.spreader < 0) {
					this.prompt('推广者获得积分不能小于0');
					return false;
				}
				if (this.follower && this.follower < 0) {
					this.prompt('关注者获得积分不能为小于0');
					return false;
				}
				let res = await http.setPointConfig({
					data: {
						status: status,
						cash: this.cash,
						point: this.integral,
						expirationTime: expirationTime,
						spreaderPoint: this.spreader,
						followerPoint: this.follower
					}
				});
				if (res.list.status != 0) {
					this.on = true;
					this.cash = res.list.cash;
				}
				this.integral = res.list.point;
				this.spreader = res.list.spreaderPoint;
				this.follower = res.list.followerPoint;
				this.prompt('保存成功', '提示信息');
			},
			prompt(content, title = '提示信息', winType = 'alert') {
				this.$store.commit('setWin', {
					winType: winType,
					content: content,
					title: title
				});
			}
		},
		mounted() {
			this.getPointConfig();
		},
		components: {
			'on-off': () =>
				import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off')
		}
	};
</script>
<style type='text/css' scoped>
	.commodity-name {
		width: 100px;
		height: 40px;
		line-height: 40px;
	}

	#jifen .topR,
	#jifen .picName,
	#jifen .expiration-time {
		width: 100%;
		height: 40px;
		margin-top: 10px;
	}

	.picName input,
	.expiration-time input {
		width: 100px;
		height: 42px;
		line-height: 25px;
		padding: 5px;
		margin: 0;
	}

	.time-exp {
		width: 100px;
		height: 40px;
		line-height: 40px;
		float: left;
	}

	.topR .mesking {
		width: 100px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}
    .topR .rightHalf{
        width: 600px;
		height: auto;
		float: left;
		line-height: 40px;
    }

	.check-span {
		float: left;
	}

	.integralBox {
		height: 200px;
		width: 100%;
		overflow: hidden;
	}

	.integralSet {
		height: 120px;
		width: 100%;
	}

	.integrabox {
		height: 45px;
		line-height: 45px;
		width: 100%;
		margin-bottom: 15px;
	}

	.integrabox span {
		display: block;
		height: 45px;
		width: 120px;
		text-align: center;
		color: #333;
	}

	.integrabox input {
		padding: 0;
		padding-left: 10px;
		height: 45px;
		width: 140px;
		outline: none;
		box-sizing: border-box;
		color: #9d9d9d;
		margin: 0 20px;
	}

	.integrabox p {
		float: left;
		color: #9d9d9d;
		height: 45px;
		width: calc(100% - 300px);
	}

	@media only screen and (max-width: 1366px) {
		.integrabox p {
			line-height: 22.5px;
		}
	}

	.integra-content {
		margin-bottom: 30px;
		/*overflow: hidden;*/
	}

	.integra-content .heade-title {
		height: 45px;
		line-height: 45px;
		font-size: 16px;
		text-indent: 10px;
		position: relative;
	}

	.integra-content .heade-title:after {
		content: '';
		position: absolute;
		left: 0;
		top: 12px;
		width: 3px;
		height: 25px;
		background-color: #00A1E9;
	}
</style>