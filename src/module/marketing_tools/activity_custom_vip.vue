<template>
	<section id="addVip">
		<Win @winEvent='winEvent' :width='950' :height='500'>
			<section slot='content' style="padding: 50px 50px;min-width: 900px;">
				<div class="vip-left">
					<div class="vip-filter">
						<span class="vip-name">注册日期</span>
						<div style="position: relative;width: 300px;display: inline-block;vertical-align: top;height: 40px;">
							<div style="display:inline-block;border: 1px solid #b3b3b3;width: 300px; height: 40px; line-height: 40px;cursor: pointer;"
							    @click="showCalendar">
								<span v-if="loginTime" style="border-right: 1px solid #b3b3b3;display: inline-block;float: left;text-align:center;width: 255px; height: 40px;">{{start}}&nbsp;----&nbsp;{{end}}</span>
								<span v-else style="border-right: 1px solid #b3b3b3;display: inline-block;float: left;text-align:center;width: 255px; height: 40px;">注册日期</span>
								<span class="down" style="right: 18px;"></span>
							</div>
							<canMulti :starttime="atime" :endtime="btime" v-if='show' @castTime='castTime'></canMulti>
						</div>
					</div>
					<div class="vip-filter">
						<span class="vip-name">性别</span>
						<mulSelect :styles="{'background-color':'rgb(240,240,240)'}" :list="sexList" :selects="sexIndex" :name='"name"' :key='"id"'
						    :isradio="true" @selOn='selOn'></mulSelect>
					</div>
					<div class="vip-filter vip-age">
						<span class="vip-name">年龄</span>
						<input type="text" placeholder="开始年龄" v-model="ageone" />
						<span style="margin: 0 40px;">至</span>
						<input type="text" placeholder="结束年龄" v-model="agetwo" />
					</div>
					<div class="vip-filter vip-phone">
						<span class="vip-name">手机号</span>
						<input type="text" placeholder="请输入电话号码" v-model="telephone" maxlength="11" />
					</div>
					<div style="margin-top: 30px;margin-left: 60px;">
						<a href="javascript:void(0);" class="gray" @click="vipReset">重置</a>
						<a href="javascript:void(0);" class="yellow" @click="vipFilter">筛选</a>
					</div>
				</div>
				<div class="vip-right">
					<p>共关联出</p>
					<p>{{member}}位</p>
					<p>会员</p>
				</div>
			</section>
		</Win>

	</section>
</template>

<script>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				index: 0,
				selectvips: [], //所有会员列表
				//                          vipIndex: sd.copy(act.vipIds), //选中会员id
				goodsCom: [], //会员显示列表
				sexList: [{
					'name': '不限',
					'id': '0'
				}, {
					'name': '男',
					'id': '1'
				}, {
					'name': '女',
					'id': '2'
				}], //性别
				loginTime: '', //注册日期
				sexIndex: ['0'], //性别选中
				startAge: '', //开始年龄
				endAge: '', //结束年龄
				phone: '', //手机号
				member: 0, //关联会员人数
				startBirth: '', //传给后台开始年龄
				endBirth: '', //传给后台结束年龄
				memfilter: '', //会员筛选后数据
				//日期日历
				atime: new Date().getTime(),
				btime: new Date().getTime(),
				createTime: [],
				show: false
			};
		},
		methods: {
			selOn(arr) {
				this.sexIndex = arr;
			},
			castTime(obj) {
				this.show = false;
				let {
					startTime,
					endTime
				} = obj;
				this.atime = startTime;
				this.btime = endTime;
				this.loginTime = true;
			},
			winEvent(str) {

				let obj = {
					status: str
				};
				if (str == 'ok') {
					obj.data = {
						member: this.member,
						memfilter: this.memfilter,
						sexIndex: this.sexIndex,
						startAge: this.startAge,
						endAge: this.endAge,
						phone: this.phone,
						atimevip: this.atime,
						btimevip: this.btime
					};
				}
				this.$emit('selectVip', obj);
			},
			//日历--跨时间段
			showCalendar: function () {
				this.show = !this.show;
			},
			//筛选
			async vipFilter() {
				if (this.startAge != '') {
					//开始年龄转换为年份
					let start = new Date();
					let age1 = start.getFullYear() - this.startAge;
					start.setFullYear(age1, 1);
					start.setMonth(new Date().getMonth());
					this.startBirth = utils.format(start, 'yyyy-MM-dd');
				}
				if (this.endAge != '') {
					//结束年龄转换为年份
					let end = new Date();
					let age2 = end.getFullYear() - this.endAge;
					end.setFullYear(age2, 1);
					end.setMonth(new Date().getMonth());
					this.endBirth = utils.format(end, 'yyyy-MM-dd');

				}
				console.log(this.startBirth);
				//匹配电话数字
				let reg = /^[0-9]*$/;
				if (!reg.test(this.phone)) {

					this.$store.commit('setWin', {
						content: '手机号输入有误'
					});
					return true;
				}
				if (this.loginTime) {
					this.memfilter = JSON.stringify({
						startTime: this.atime / 1000,
						endTime: this.btime / 1000,
						gender: this.sexIndex[0],
						startBirthday: this.endBirth,
						endBirthday: this.startBirth,
						mobile: this.phone
					});
				} else {
					this.memfilter = JSON.stringify({
						startTime: '',
						endTime: '',
						gender: this.sexIndex[0],
						startBirthday: this.endBirth,
						endBirthday: this.startBirth,
						mobile: this.phone
					});
				}

				let data = await http.getMemberNum({
					data: {
						memberId: this.memfilter
					}
				});
				this.member = data;

			},
			//重置
			vipReset: function () {
				this.atime = (new Date()).getTime();
				this.btime = (new Date()).getTime();
				this.show = false;
				this.sexIndex = ['0'];
				this.startAge = '';
				this.endAge = '';
				this.phone = '';
			}
		},
		computed: {
			start: {
				get: function () {
					return utils.format(this.atime, 'yyyy-MM-dd');
				}
			},
			end: {
				get: function () {
					return utils.format(this.btime, 'yyyy-MM-dd');
				}
			},
			ageone: {
				get: function () {
					return this.startAge;
				},
				set: function (newValue) {
					if (newValue == '') {
						this.startAge = '';
						return;
					}
					this.startAge = parseInt(newValue);
				}
			},
			agetwo: {
				get: function () {
					return this.endAge;
				},
				set: function (newValue) {
					if (newValue == '') {
						this.endAge = '';
						return;
					}
					this.endAge = parseInt(newValue);
				}
			},
			telephone: {
				get: function () {
					return this.phone;
				},
				set: function (newValue) {
					if (newValue == '') {
						this.phone = '';
						return;
					}
					this.phone = parseInt(newValue);
				}
			}
		},
		components: {
			'canMulti': () =>
				import ( /* webpackChunkName:'can_multi' */ 'src/components/can_multi'),
			'Win': () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			'mulSelect': () =>
				import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		}
	};
</script>

<style scoped>
	.vip-left {
		width: 60%;
		float: left;
		border-right: 1px dashed #ccc;
	}

	.vip-left .vip-filter {
		height: 40px;
		line-height: 40px;
		margin-bottom: 30px;
	}

	.vip-left .vip-filter .vip-name {
		margin-right: 10px;
		color: #b3b3b3;
		display: inline-block;
		width: 60px;
		height: 50px;
		text-align: right;
	}

	.vip-left .vip-age input {
		width: 100px;
		height: 30px;
		text-align: center;
	}

	.vip-left .vip-phone input {
		width: 290px;
		height: 30px;
		padding-left: 10px;
	}

	.vip-left .selectbtns {
		display: inline-block;
		width: 400px;
		vertical-align: middle;
	}

	.vip-left .selectbtns span {
		width: 100px;
	}

	.vip-left a {
		width: 150px;
		height: 40px;
		line-height: 40px;
	}

	.vip-right {
		text-align: center;
	}

	.vip-right p:nth-child(1) {
		height: 100px;
		line-height: 150px;
		font-size: 16px;
	}

	.vip-right p:nth-child(2) {
		height: 100px;
		line-height: 100px;
		font-size: 50px;
	}

	.vip-right p:nth-child(3) {
		height: 100px;
		line-height: 60px;
		font-size: 16px;

	}
</style>