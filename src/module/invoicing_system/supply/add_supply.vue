<template>
	<section id="content" style="">
		<div class="info-main">
			<!--模块标题-->
			<div class="info-title">
				<span class="title">基本信息</span>
				<span class="line"></span>
			</div>
			<!--模块内容-->
			<div class="info-content">
				<label class="content-box">
					<span class="required">供应商名称</span>
					<input v-model='name' class="right" type="text" placeholder="请输入供应商名称" maxlength="20" />
				</label>
				<label class="content-box">
					<span class="required icon-none">开户银行</span>
					<input v-model='bank' class="right" type="text" placeholder="选填" maxlength="20" />
				</label>
				<label class="content-box">
					<span class="required icon-none">银行账号</span>
					<input v-model='newBank' class="right" type="text" placeholder="选填" maxlength="25" />
				</label>
				<label class="content-box">
					<span class="required icon-none">税号</span>
					<input v-model='tax' class="right" type="text" placeholder="选填" maxlength="20" />
				</label>
				<label class="content-box">
					<span class="required icon-none">税率</span>
					<input v-model='taxRate' onkeyup="value=value.replace(/[^\d]/g,'')" class="right" type="text" placeholder="选填" maxlength="2"
					/>
					<span>(%)</span>
				</label>

			</div>
		</div>
		<div class="info-main">
			<!--模块标题-->
			<div class="info-title">
				<span class="title">对接人信息</span>
				<span class="line"></span>
			</div>
			<!--模块内容-->
			<template v-for="(item,index) in user">
				<div class="info-content userinfo" :key="index">
					<label class="content-box">
						<span class="required">对接人</span>
						<input v-model='item.name' class="right" type="text" placeholder="请输入联系人" maxlength="20" />
					</label>
					<label class="content-box">
						<span class="required">联系方式</span>
						<input v-model='item.phone' class="right" type="text" placeholder="请输入联系方式" maxlength="11" />
					</label>
					<label class="content-box">
						<span class="required">联系地址</span>
						<input v-model='item.address' class="right" type="text" placeholder="请输入联系地址" maxlength="30" />
					</label>
					<div class="off" @click="closeUser(index)"></div>
				</div>
			</template>
			<section class="user" v-if='user.length<3' @click="addUser">
				<img class="addicon" src="../../../res/images/adds.png" alt="add" />
				<span class="addword">新增对接人</span>
			</section>
		</div>

		<div class="box">
			<a href="javascript:void(0);" class="gray" @click="cancel">取消</a>
			<a href="javascript:void(0);" class="yellow" @click="save">保存</a>
		</div>
	</section>
</template>

<script>
	import global from 'src/manager/global';
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				user: [{
					name: '',
					phone: '',
					address: ''
				}], //对接人
				name: '', // 供货商名称
				bank: '', //开户银行
				bankAccount: '', //银行账号
				tax: '', //税费
				taxRate: '', //税率
			};
		},
		// computed: {

		// },
		computed: {
			newBank: {
				get: function () {
					return this.bankAccount;
				},
				set: function (newValue) {
					let floatReg = /[^\d]/g;
					if (newValue == '') {
						this.bankAccount = '';
						return;
					}
					this.bankAccount = newValue.replace(floatReg, '');
				}
			},

		},
		props: [
			'editId', //编辑id
			'shopId',
			'suppierList'
		],
		mounted() {
			if (this.editId) {
				this.getDetail();
			}
		},
		methods: {
			//获取详情
			async getDetail() {
				let res = await http.suppelierById({
					data: {
						id: this.editId
					}
				});
				this.user = res.people.people;
				for (let key in res) {
					this[key] = res[key];
				}
			},
			addUser() {
				this.user.push({
					name: '',
					phone: '',
					address: ''
				});
			},
			closeUser(index) {
				if (!global.checkData({
					user: {
						cond: '$$.length>1',
						pro: '供应商至少有一个'
					}
				}, this)) return;
				this.user.splice(index, 1);
			},
			cancel() {
				this.$emit('save', 'cancel');
			},
			//增加供应商
			async addSupplier() {
				let people = {};
				people.people = this.user;
				// let res = 
				await http.addSupplier({
					data: {
						name: this.name,
						bank: this.bank,
						bankAccount: this.bankAccount,
						tax: this.tax,
						taxRate: this.taxRate,
						people: JSON.stringify(people)
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存成功'
				});
				this.suppierList();
			},
			//编辑供应商
			async editSupplier() {
				let people = {};
				people.people = this.user;
				// let res = 
				await http.editSupplier({
					data: {
						name: this.name,
						bank: this.bank,
						bankAccount: this.bankAccount,
						tax: this.tax,
						taxRate: this.taxRate,
						people: JSON.stringify(people),
						id: this.editId
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存成功'
				});
				this.suppierList();
			},
			save() {
				if (!global.checkData({
					name: '请输入供应商名称'
				}, this)) return;
				for (let i = 0; i < this.user.length; i++) {
					if (this.user[i].phone == '') {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '请输入联系方式'
						});
						return false;
					}
					if (!global.checkData({
						name: '请填写对接人',
						phone: {
							cond: `(/^[0-9]*$/).test($$)`,
							pro: '联系方式号码输入有误'
						},
						address: '请填写联系地址'
					}, this.user[i])) return;
				}
				if (!this.editId) {
					this.addSupplier();
				} else {
					this.editSupplier();
				}
				this.$emit('save', 'ok');
			}

		}
	};
</script>
<style lang="less" scoped>
	@media only screen and (max-width:1250px) {
		.user {
			top: 0 !important;
			left: 142px !important;
		}
		.userinfo {
			display: block !important;
		}
	}

	#content {
		margin-top: 20px;
		min-width: 1100px;
		.info-title {
			min-width: 600px;
			height: 28px;
			line-height: 28px;
			border-left: 2px solid #28a8e0;
			margin-bottom: 35px;
			.title {
				display: inline-block;
				padding-left: 12px;
				font-size: 16px;
			}
			.line {
				display: inline-block;
				width: 500px;
				border-bottom: 1px dashed #d9d9d9;
				margin-bottom: 5px;
				margin-left: 10px;
			}
		}
		.info-content {
			.content-box {
				min-width: 400px;
				max-width: 1100px;
				line-height: 40px;
				margin-bottom: 15px;
				display: block;
				.required {
					display: inline-block;
					font-size: 16px;
					margin-right: 17px;
					width: 100px;
					text-align: right;
				}
				input {
					width: 220px;
					height: 35px;
					font-size: 14px;
					padding-left: 8px;
					outline: none;
				}
				.icon-none {
					padding-right: 9px;
					&:after {
						display: none;
					}
				}
			}
		}
		.userinfo {
			width: 400px;
			display: inline-block;
			padding-top: 20px;
			margin-right: 20px;
			margin-bottom: 20px;
			position: relative;
			background: url('../../../res/images/close.png') no-repeat;
			.close {
				position: absolute;
				top: 0;
				right: 0;
				width: 16px;
				height: 16px;
				background: url('../../../res/images/close.png') no-repeat;
				background-color: red;
				&:hover {
					cursor: pointer;
				}
			}
			.off {
				width: 20px;
				height: 20px;
				background: url('../../../res/icon/icondelete.png') no-repeat;
				position: absolute;
				right: 0;
				top: 50%;
				margin-top: -10px;
				cursor: pointer;
			}
		}
		.user {
			width: 180px;
			height: 40px;
			display: inline-block;
			position: relative;
			top: -40px;
			cursor: pointer;
			background: #29abe2;
			.addicon {
				width: 20px;
				height: 20px;
				margin-left: 25px;
				position: absolute;
				top: 10px;
			}
			.addword {
				height: 65px;
				display: inline-block;
				position: absolute;
				top: 15px;
				left: 60px;
				color: #fff;
				vertical-align: middle;
			}
		}
		.box {
			margin-top: 100px;
			.gray,
			.yellow {
				width: 150px
			}
		}
	}
</style>