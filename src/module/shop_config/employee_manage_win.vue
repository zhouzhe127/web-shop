<!--
	**员工管理弹窗
	*
	* 创建：胡江
	* 修改：李志刚 2018-03-10
	* *
	*
-->
<template>
	<div>
		<win @winEvent="clickResult" :align="'right'" :width="580" :height="'380'" :ok="okStyle" :cancel="cancelStyle">
			<!--标题-->
			<span slot="title">{{isAdd?'新建员工信息':'修改员工信息'}}</span>
			<!--内容-->
			<div slot="content">
				<section style="padding:10px 20px;">
					<el-form :model="info" ref="info" label-width="120px">
						<el-form-item required label="手机号码">
							<el-input :disabled="isAdd?false:true"  @input="checkMobile" v-model="mobile" maxlength="11" placeholder = "请输入手机号码" style = "width:280px;"></el-input>
							<span v-if="phoneStatus==3" style="color:red;">该账户已经存在!</span>
						</el-form-item>
						<el-form-item required label="真实姓名">
							<el-input v-if="isAdd" :disabled="phoneStatus!==1?true:false" v-model="info.name" maxlength="14" placeholder = "请输入姓名" style = "width:280px;"></el-input>
							<el-input v-else v-model="info.name" maxlength="14" placeholder = "请输入姓名" style = "width:280px;"></el-input>
						</el-form-item>
						<el-form-item v-show="isAdd && phoneStatus!= 2" required label="设置登录密码">
							<el-input :disabled="phoneStatus==0|| phoneStatus== 3?true:false" type="password" v-model="info.password" maxlength="20" placeholder = "请输入登录密码" style = "width:280px;"></el-input>
						</el-form-item>
						<el-form-item v-show="isAdd && phoneStatus!= 2" required label="确认登录密码">
							<el-input :disabled="phoneStatus==0|| phoneStatus== 3?true:false" type="password" v-model="repeatPwd" maxlength="20" placeholder = "请输入登录密码" style = "width:280px;"></el-input>
						</el-form-item>
						<el-form-item required label="职位">
							<template v-if="jobList[index]">
								<span :class="ischain==0?'':jobList[index]&&(jobList[index].id>=100000||jobList[index].id==0)?'sdOrange':'sdBlue'">{{jobList[index]?jobList[index].name:''}}</span>
								<i class="el-icon-edit-outline" @click="showJobFn" style="font-size: 23px;margin-left: 20px;line-height: 28px;color: #a0a0a0;"></i>
							</template>
							<el-button v-else :disabled="phoneStatus==0|| phoneStatus== 3?true:false" @click="showJobFn" type="primary" style="width:150px;">添加职位</el-button>
						</el-form-item>
						<el-form-item v-if="!isAdd && info.sellerRole" label="卖手职位">
							<span>{{info.sellerRole}}</span>
						</el-form-item>
						<el-form-item v-if="isWarrantCode" label="授权码">
							<el-input  maxlength="4" v-model="info.warrantCode" placeholder="请输入授权码" style = "width:180px;"></el-input>
						</el-form-item>
					</el-form>
				</section>
				<!-- <ul class="employmes" :class="{edit: !isAdd}">
					<li>
						<h2 class="tag" :class="{required:isAdd}">手机号码</h2>
						<div class="mes">
							<input type="text" v-if="isAdd" maxlength="11" @input="checkMobile" v-model="mobile" placeholder="请输入手机号码">
							<span v-else>{{info.mobile}}</span>
							<b v-show="phoneStatus==3">该账户已经存在!</b>
						</div>
					</li>
					<li>
						<h2 class="tag" :class="{required:isAdd}">真实姓名</h2>
						<div class="mes">
							<input type="text" v-if="isAdd" maxlength="14" :disabled="phoneStatus!==1" v-model="info.name" placeholder="请输入姓名">
							<input type="text" v-else maxlength="14" v-model="info.name" placeholder="请输入姓名">
						</div>
					</li>
					<template v-if="isAdd">
						<li :class="{sdHidden: phoneStatus== 2}">
							<h2 class="tag">设置登录密码</h2>
							<div class="mes">
								<input type="password" maxlength="20" :disabled="phoneStatus==0|| phoneStatus== 3" v-model="info.password" placeholder="请输入登录密码">
							</div>
						</li>
						<li :class="{sdHidden: phoneStatus== 2}">
							<h2 class="tag">确认登录密码</h2>
							<div class="mes">
								<input type="password" maxlength="20" :disabled="phoneStatus==0|| phoneStatus== 3" v-model="repeatPwd" placeholder="请确认登录密码">
							</div>
						</li>
					</template>
					<li>
						<h2 class="tag">职位</h2>
						<div class="mes">
							<template v-if="jobList[index]">
								<span class="jobName" 
									:class="ischain==0
										?''
										:jobList[index]&&(jobList[index].id>=100000||jobList[index].id==0)
											?'sdOrange'
											:'sdBlue'">{{jobList[index]?jobList[index].name:''}}</span>
								<span class="editJob" @click="showJobFn"></span>
							</template>
							<a href="javascript:;" class="addJob" :class="{disabled: phoneStatus==0 ||phoneStatus==3}" v-else @click="showJobFn">
								<img src="../../res/images/add.png" alt="">
								<span>添加职位</span>
							</a>
						</div>
					</li>
					<li v-if="!isAdd && info.sellerRole">
						<h2 class="tag">卖手职位</h2>
						<div class="mes seller">
							<span>{{info.sellerRole}}</span>
						</div>
					</li>
					<li>
						<h2 v-if="isWarrantCode" class="tag">授权码</h2>
						<div v-if="isWarrantCode" class="mes">
							<input type="text" class="input" maxlength="4" v-model="info.warrantCode" placeholder="请输入授权码">
						</div>
					</li>
				</ul> -->
			</div>
		</win>
		<select-job v-if="showJobs" @winEvent="jobWinFn" :jobList="jobList" :title="'选择员工职位'" :index="index" :ischain="+ischain">
		</select-job>
	</div>
</template>

<script>
import http from 'src/manager/http';
// import utils from  'src/verdor/utils';
export default {
	data() {
		return {
			index: -1, //职位索引
			indexCopy: -1, // 职位索引复制，用于弹窗的职位 缓存
			info: {}, //员工信息
			isWarrantCode: false, //授权码权限
			cancelStyle: null, //弹框下面的取消样式
			okStyle: null,
			showJobs: false, // 显示职位选择弹窗
			phoneStatus: 0, // 电话号码验证状态 0 未验证，1 验证过可用（完全新号），2 验证过可用（存在于我们系统中其他店铺），3不可用，以存在于该单店
			repeatPwd: '' // 确认密码value
		};
	},
	props: {
		employeeId: '',
		employeeIndex: '',
		list: Array,
		isAdd: null,
		jobList: Array,
		ischain: Number
	},
	mounted() {
		this.cancelStyle = {
			content: '取消',
			style: { backgroundColor: '#a0a0a0', color: '#fff ' }
		};
		this.okStyle = {
			content: '保存',
			style: { backgroundColor: 'orange', color: '#fff' }
		};
		this.initEmployeeInfo();
	},
	methods: {
		//验证电话之后返回值
		async userCheckExist(mobile) {
			let res = await http.userCheckExist({
				data: {
					mobile: mobile
				}
			});
			if (res) {
				this.info.name = res.name;
				this.info.id = res.id;
				if (res.isShopUser) {
					// 已有账号，不可建
					this.phoneStatus = 3;
				} else {
					// 其他店有,可建
					this.phoneStatus = 2;
				}
			} else {
				// 新号
				this.phoneStatus = 1;
			}
		},
		//添加员工
		async addShopUser(backRes) {
			let res = await http.addShopUser({
				data: {
					roleId: this.info.roleId,
					mobile: this.info.mobile,
					name: this.info.name,
					password: this.info.password,
					warrantCode: this.info.warrantCode
				}
			});
			if (res && res.userId !== undefined) {
				let employee = this.info;
				employee.roleName = this.jobList[this.index].name;
				employee.nodeIds = this.jobList[this.index].name;
				employee.userName = employee.name;
				employee.userId = res.userId;
				this.$emit('throwWinResult', backRes, employee); //抛出一个事件给父组件 backRes 是win的时间类型 ok cancel, res是员工信息
			} else {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '数据返回为空'
				});
			}
		},
		//修改员工信息
		async editShopUser(backRes) {
			// let oldData =utils.deepCopy(this.list[this.employeeIndex]);
			let param = {
				userId: this.employeeId, //员工ID
				roleId: this.info.roleId,
				userName: this.info.name,
			};
			if (this.info.warrantCode) {
				param.warrantCode = this.info.warrantCode;
			}
			let res = await http.editShopUser({
				data: param
			});
			if (res) {
				// oldData.id = res.staffId;
				// let jobs = this.jobList;
				// for (let i = 0; i < jobs.length; i++) {
				// 	if (jobs[i].id + '' === res.roleId + '') {
				// 		oldData.roleName = jobs[i].name;
				// 		oldData.nodeIds = jobs[i].nodeIds;
				// 		break;
				// 	}
				// }
				// oldData.roleId = res.roleId;
				// oldData.userName = this.info.name;
				this.$emit('throwWinResult', backRes); // 其实那边直接刷新了
			} else {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '数据返回为空'
				});
			}
		},
		//获取员工信息
		async initEmployeeInfo() {
			if (!this.isAdd) {
				let employee = this.list[this.employeeIndex];
				employee.name = employee.userName;
				this.info = employee;
				for (let i = 0; i < this.jobList.length; i++) {
					if (this.jobList[i].id + '' === this.info.roleId + '') {
						this.index = i;
					}
				}
				//判断是否有授权码的权限
				let oldData = this.jobList[this.index];
				this.isWarrantCode =
					oldData.nodeIds.indexOf('3051') == -1 ? false : true;
			} else if (this.isAdd) {
				this.info = {
					roleId: 0, //职位id
					roleName: '', //职位名称
					password: '',
					name: '', //真实姓名
					title: '', // 称谓
					mobile: '', //手机号码
					sort: 255,
					isWarrantCode: false //授权码权限
				};
			}
		},
		sdAlert(info) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'alter',
				content: info
			});
		},
		//获取弹窗的点击结果
		clickResult(res) {
			let emptyReg = /^[\s]*$/;
			function checkJobAndWarrant() {
				// 姓名
				let name = this.info.name + '';
				if (emptyReg.test(name)) {
					this.sdAlert('真实姓名不能为空');
					return false;
				}
				if (!/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9]|-|——|—)*$/.test(name)) {
					this.sdAlert(
						'姓名只能有中文和英文及数字组成，请输入正确的名称'
					);
					return false;
				}
				// 职位
				if (this.index === -1) {
					this.sdAlert('请选择职位');
					return false;
				}
				//授权码的权限
				let numReg = /^[\d]*$/;
				let warrantCode = this.info.warrantCode + '';
				if (this.isWarrantCode) {
					if (
						!numReg.test(warrantCode) ||
						warrantCode.split('').length < 4
					) {
						this.sdAlert('授权码格式错误,必须为四位数字');
						return false;
					}
				} else {
					this.info.warrantCode = '';
				}
				return true;
			}
			if (res == 'ok') {
				if (this.info) {
					let info = this.info;
					//编辑
					if (!this.isAdd) {
						if (!checkJobAndWarrant.call(this)) {
							return false;
						}
						this.editShopUser(res);
						//新增
					} else {
						let passwordcode = info.password + '';
						if (this.phoneStatus == 1 || this.phoneStatus == 2) {
							if (!checkJobAndWarrant.call(this)) {
								return false;
							}
							if (this.phoneStatus == 1) {
								// 这里其实一条正则就可以解决，但是细分有细分的有点，就没有去简化
								if (emptyReg.test(passwordcode)) {
									this.sdAlert('密码不能为空');
									return false;
								}
								if (!/^[a-zA-Z0-9]*$/.test(passwordcode)) {
									this.sdAlert('密码只能由数字和字母组成');
									return false;
								}
								if (
									passwordcode.length < 6 ||
									passwordcode.length > 20
								) {
									this.sdAlert('密码长度6到20位');
									return false;
								}
								if (passwordcode !== this.repeatPwd + '') {
									this.sdAlert('两次密码输入不一致');
									return false;
								}
							}

							// 手机号码不合格
						} else if (this.phoneStatus == 0) {
							let mobileReg = /^1[3|4|5|7|8]\d{9}$/; // /^1[\d]{10,10}$/;
							let mobile = info.mobile + '';
							if (emptyReg.test(mobile)) {
								this.sdAlert('手机号码不能为空');
								return false;
							}
							if (!mobileReg.test(mobile))
								this.sdAlert('填写正确的手机号码');
							return false;
						} else {
							this.sdAlert('该账户已经存在');
							return false;
						}
						//添加员工
						this.addShopUser(res);
					}
				} else {
					return true;
				}
			}
			if (res == 'cancel') {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
			if (res == 'close') {
				this.$emit('throwWinResult', res);
			}
		},
		//手机号的验证 是否可创建员工
		checkMobile() {
			let mobile = this.info.mobile + '';
			if (mobile.length !== 11) {
				//复位
				this.info = {
					roleId: 0, //职位id
					roleName: '', //职位名称
					roleType: '0',
					password: '',
					name: '', //
					mobile,
					isWarrantCode: false, //授权码权限
					sellerRole: ''
				};
				this.phoneStatus = 0;
			} else if (!/^1\d{10}$/.test(mobile)) {
				this.sdAlert('手机号码格式错误');
				this.phoneStatus = 0;
			} else {
				this.userCheckExist(mobile);
			}
		},
		// 显示弹窗：职位选择
		showJobFn() {
			if (
				this.phoneStatus == 1 ||
				this.phoneStatus == 2 ||
				this.isAdd == false
			) {
				this.showJobs = true;
			}
		},
		// 职位选择的弹窗的确定或者取消事件处理
		jobWinFn(type, i) {
			if (type === 'ok') {
				this.index = i;
				if (this.info && this.jobList) {
					if (i != -1) {
						this.info.roleId = this.jobList[i].id;
						this.isWarrantCode =
							this.jobList[i].nodeIds.indexOf('3051') == -1
								? false
								: true;
					}
				}
			}
			this.showJobs = false;
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		SelectJob: () =>
			import(/*webpackChunkName: "select_job"*/ 'src/module/shop_config/employee_manage_outlets_select_job'), // 员工管理门店选择职位弹窗
		radioBtn: () =>
			import(/*webpackChunkName: "radio_btn"*/ 'src/components/radio_btn')
	},
	computed: {
		mobile: {
			get: function() {
				return this.info.mobile;
			},
			set: function(newValue) {
				let intReg = /[^\d]/g;
				this.info.mobile = newValue.replace(intReg, '');
			}
		}
	}
};
</script>

<style scoped lang="less">
@sdOrange: #fe9300;
@sdBlue: #2daadd;
.sdHidden {
	height: 0;
}
.sdOrange {
	color: @sdOrange;
}
.sdBlue {
	color: @sdBlue;
}
// ul {
// 	width: 580px;
// 	// min-height: 240px;
// 	height: 380px;
// 	padding-top: 20px;
// 	background-color: #eee;
// 	overflow: hidden;
// 	li {
// 		overflow: hidden;
// 		margin-bottom: 10px;
// 		transition: height 0.3s;
// 		.tag {
// 			float: left;
// 			width: 120px;
// 			height: 40px;
// 			line-height: 40px;
// 			text-align: right;
// 		}
// 		.mes {
// 			margin-left: 120px;
// 			padding-left: 15px;
// 			text-indent: 0;
// 			input {
// 				background-color: #fff;
// 				width: 249px;
// 				height: 40px;
// 				text-indent: 10px;
// 				border: 1px solid #cdcdcd;
// 				outline: none;
// 			}
// 			span {
// 				display: inline-block;
// 				height: 40px;
// 				line-height: 40px;
// 				padding-left: 18px;
// 				padding-right: 18px;
// 				background-color: #eee;
// 				cursor: pointer;
// 				margin: 1px;
// 				border-radius: 2px;
// 				text-align: center;
// 				vertical-align: middle;
// 			}
// 			b {
// 				color: red;
// 				line-height: 40px;
// 				vertical-align: middle;
// 				text-indent: 10px;
// 				display: inline-block;
// 			}
// 			.seller {
// 				color: #a4a4a4;
// 			}
// 			.editJob {
// 				background-color: #e8e8e8;
// 				background-image: url('../../res/images/gray-revise.png');
// 				width: 18px;
// 				height: 19px;
// 				margin: 11px 5px;
// 				padding: 0;
// 			}
// 			.addJob {
// 				width: 180px;
// 				height: 40px;
// 				background-color: @sdBlue;
// 				border: 1px solid transparent;
// 				overflow: hidden;
// 				span {
// 					background-color: @sdBlue;
// 				}
// 				img {
// 					vertical-align: middle;
// 				}
// 				&.disabled {
// 					background-color: #e5e5e0;
// 					border: 1px solid #cdcdcd;
// 					span {
// 						background-color: #e5e5e0;
// 					}
// 				}
// 			}
// 		}
// 	}
// 	h2::after {
// 		position: relative;
// 		top: -8px;
// 		right: -2px;
// 		content: '*';
// 		color: red;
// 	}
// 	&.edit {
// 		h2::after {
// 			content: ':';
// 			position: static;
// 			display: inline;
// 			color: inherit;
// 		}
// 	}
// }
</style>