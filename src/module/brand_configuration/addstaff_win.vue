/* * @file * * 新建员工 * * @author zhengu.jiang */
<template>
	<div>
		<win @winEvent="getWin" :align="'right'" :width="780" :height="520" :ok="okStyle" style="background: red">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="employmes">
					<div class="clear"></div>
					<h2 class="required tag">手机号码</h2>
					<div class="mes">
						<input type="text" v-if="edit" disabled="disabled" class="input" maxlength="11" style="width: 100%; " v-model="mobile" placeholder="请输入手机号码">
						<input type="text" v-if="!edit" class="input" maxlength="11" style="width: 100%; " v-on:keyup="checkMobile" v-model="mobile"
						    placeholder="请输入手机号码">
					</div>
					<span v-if="!isUser && mobile.length == 11 && !edit" class="already" style="color: #FD4C59">该账户已存在!</span>
					<div class="clear"></div>
					<!-- <div v-bind:style="{ display: info.added ? 'none' : 'block' }"> -->
					<div>
						<h2 class="required tag">真实姓名</h2>
						<div class="mes">
							<!-- <input type="required text" v-if="edit || !isShopUser" disabled="disabled" class="input" maxlength="15" style="width: 100%; "
							    v-model="rname" placeholder="请输入真实姓名"> -->
							<input type="required text" class="input" maxlength="14" style="width: 100%; " v-model="rname" placeholder="请输入真实姓名">
						</div>
						<div class="clear"></div>
						<template v-if="!edit">
							<h2 class="required tag">设置登录密码</h2>
							<div class="mes">
								<input v-if="!isShopUser" disabled="disabled" type="password" class="input" maxlength="20" style="width: 100%; " v-model="password"
								    placeholder="请设置登录密码">
								<input v-else type="password" class="input" maxlength="20" style="width: 100%; " v-model="password" placeholder="请设置登录密码">
							</div>
							<div class="clear"></div>
						</template>
						<div class="clear"></div>
						<template v-if="!edit">
							<h2 class="required tag">设置登录密码</h2>
							<div class="mes">
								<input v-if="!isShopUser" disabled="disabled" type="password" class="input" maxlength="20" style="width: 100%; " v-model="passwordagain"
								    placeholder="请设置登录密码">
								<input v-else type="password" class="input" maxlength="20" style="width: 100%; " v-model="passwordagain" placeholder="请设置登录密码">
							</div>
							<div class="clear"></div>
						</template>
					</div>
					<h2 class="required tag">品牌职位</h2>
					<div class="mes">
						<a v-if="!isUser&&!edit" href="javascript:void(0);" class='btn disable'>
							<img src="../../res/images/add.png" alt="">
							<span>添加品牌职位</span>
						</a>
						<div v-else>
							<a v-if="brandInfo.name == '' || !brandInfo.name" @click="addJob('brand')" href="javascript:void(0);" class='btn'>
								<img src="../../res/images/add.png" alt="">
								<span>添加品牌职位</span>
							</a>
							<div v-else class="info">
								<span class="brand">{{brandInfo.name}}</span>
								<span v-if="brandInfo.roleId === '0'">适用所有门店</span>
								<span v-if="brandInfo.shopIds.length != 1 && brandInfo.roleId !== '0'">适用{{brandInfo.shopIds.length}}家门店</span>
								<span v-if="brandInfo.shopIds.length == 1 && brandInfo.roleId !== '0'">{{getShopName(brandInfo.shopIds)}}</span>
								<span style="text-align: left;width:80px;margin-left:10px">
									<img @click="editInfo('brand',brandInfo)" src="../../res/images/gray-revise.png" alt="编辑">
									<img @click="del('brand',brandInfo)" src="../../res/images/gray-del.png" alt="删除">
								</span>
							</div>
						</div>
					</div>
					<div class="clear"></div>
					<h2 v-if="!surperBrand" class="required tag">门店职位</h2>
					<div class="mes" v-if="!surperBrand">
						<a v-if="!isUser&&!edit" href="javascript:void(0);" class='btn disable'>
							<img src="../../res/images/add.png" alt="">
							<span>添加门店职位</span>
						</a>
						<a v-else @click="addJob('shop')" href="javascript:void(0);" class='btn'>
							<img src="../../res/images/add.png" alt="">
							<span>添加门店职位</span>
						</a>
						<div class="info" v-for="(item, index) in shopInfo" :key="index">
							<span :title="item.name" :class="{'brand': item.roleId >= 100000,'shop': item.roleId < 100000}">{{item.name}}</span>
							<span style="width:200px" v-if="item.shopIds.length != 1 && item.roleId !== 0">适用{{item.shopIds.length}}家门店</span>
							<span :title="getShopName(item.shopIds)" style="width:200px" v-if="item.shopIds.length == 1 && item.roleId !== 0">{{getShopName(item.shopIds)}}</span>
							<span style="text-align: left;width:80px;margin-left:10px;float:right">
								<img v-if="item.roleId >= 100000" @click="editInfo('shop',item)" src="../../res/images/gray-revise.png" alt="编辑">
								<img @click="del('shop',index)" src="../../res/images/gray-del.png" alt="删除">
							</span>
						</div>
					</div>
					<div class="clear"></div>
					<h2 v-if="sellerRole && sellerRole.roleName" class="tag">卖手职位</h2>
					<div class="mes" v-if="sellerRole && sellerRole.roleName">
						<div class="info">
							<span>{{sellerRole.roleName}}</span>
							<span v-if="sellerRole.shopCount == 1">{{sellerRole.shopName}}</span>
							<span v-else>适用{{sellerRole.shopCount}}家门店</span>
						</div>
					</div>
				</div>
			</div>
		</win>
		<addjob @addJob="getJob" v-if="isJob" :type="type" :editJob="editJob"></addjob>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				title: '',
				isWarrantCode: false, //授权码权限
				mobile: '',
				rname: '',
				password: '',
				passwordagain: '',
				okStyle: null,
				type: '', //弹窗 门店还是品牌 brand品牌 shop门店
				isJob: false, //职位弹窗
				brandInfo: {
					roleId: '',
					name: '',
					shopIds: []
				}, //品牌职位
				shopInfo: [], //门店职位
				shopList: [], //所有门店
				editJob: null, //编辑时保存的信息
				userId: null,
				isShopUser: false, //判断账户是否已经存在 存在则只能修改职位
				isUser: false, //判断账户是否已经在本店铺存在 存在则任何东西都不能修改
				userIds: '', //批量选择的员工
				surperBrand: false, //品牌选择了超级管理员 门店不能选择职位
				sellerRole: '', //卖手信息
			};
		},
		props: ['edit', 'jobInfo'],
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			addjob: () =>
				import ( /*webpackChunkName: 'addjob_win'*/ './addjob_win'),
		},
		mounted() {
			this.edit ? this.title = '修改员工信息' : this.title = '新建员工信息';
			this.shopList = storage.session('shopList');
			if (this.edit) {
				this.sellerRole = this.jobInfo.sellerRole;
				this.rname = this.jobInfo.userName;
				this.mobile = this.jobInfo.mobile;
				this.userId = this.jobInfo.userId;
				if (this.jobInfo.brandRole.roleName) {
					this.brandInfo.roleId = this.jobInfo.brandRole.roleId;
					this.brandInfo.name = this.jobInfo.brandRole.roleName;
					this.brandInfo.shopIds = this.jobInfo.brandRole.shopIds;
					this.brandInfo.name == '超级管理员' ? this.surperBrand = true : this.surperBrand = false;
				}
				for (let i = 0; i < this.jobInfo.shopRole.length; i++) {
					let jobInfo = {
						roleId: '',
						name: '',
						shopIds: []
					};
					jobInfo.roleId = this.jobInfo.shopRole[i].roleId;
					jobInfo.name = this.jobInfo.shopRole[i].roleName;
					jobInfo.shopIds = this.jobInfo.shopRole[i].shopIds;
					this.shopInfo.push(jobInfo);
				}
				if (this.brandInfo.name == '超级管理员') {
					this.shopInfo = [];
				}
			}
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#F79337',
					color: '#fff'
				}
			};
		},
		methods: {
			//新增品牌员工
			async userAddBrandUser() {
				if (this.brandInfo.roleId === '') {
					this.brandInfo = {};
				}
				// let res = 
				await http.userAddBrandUser({
					data: {
						mobile: this.mobile,
						name: this.rname,
						password: this.password,
						brandRole: this.brandInfo,
						shopRole: this.shopInfo
					}
				});
				this.$emit('getStaff', 'ok');
			},
			//编辑品牌员工
			async userEditBrandUser() {
				if (this.brandInfo.roleId === '') {
					this.brandInfo = {};
				}
				// let res = 
				await http.userEditBrandUser({
					data: {
						userId: this.userId,
						brandRole: this.brandInfo,
						shopRole: this.shopInfo,
						userName: this.rname
					}
				});
				this.$emit('getStaff', 'ok');
			},
			//验证手机号
			async userCheckExist(mobile) {
				let res = await http.userCheckExist({
					data: {
						mobile: mobile
					}
				});
				if (!res) {
					this.rname = '';
					this.isShopUser = true;
					this.isUser = true;
				} else {
					this.rname = res.name;
					if (res.isShopUser) {
						this.isShopUser = false;
						this.isUser = false;
					} else {
						this.isUser = true;
					}
				}
			},
			errorShow(content) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: content
				});
			},
			getWin(res) {
				if (res == 'ok') {
					let mobileReg = /^1[\d]{10,10}$/;
					if (!this.isUser && this.mobile.length == 11 && !this.edit) {
						this.errorShow('该账户已存在!');
						return false;
					} else {
						let spaceReg = /^\s+$/; //匹配空格
						if (!mobileReg.test(this.mobile)) {
							this.errorShow('手机号码格式错误');
							return false;
						}
						if (this.rname == '' || spaceReg.test(this.rname)) {
							this.errorShow('请输入姓名');
							return false;
						}
						if (this.password != this.passwordagain) {
							this.errorShow('登录密码不一致');
							return false;
						}
						if (this.brandInfo.roleId === '' && this.shopInfo.length == 0) {
							this.errorShow('品牌职位和门店职位必须选择一项');
							return false;
						}
					}
					this.edit ? this.userEditBrandUser() : this.userAddBrandUser();
				} else {
					this.$emit('getStaff', res);
				}
			},
			//验证手机号是否已经注册
			checkMobile() {
				let mobileReg = /^1[\d]{10,10}$/;
				// 限定数字
				let intReg = /[^\d]/g;
				let mobile = this.mobile + '';
				if (mobile.replace(intReg, '').length != mobile.length) {
					return;
				}
				if (mobile.length == 11) {
					if (!mobileReg.test(mobile)) {
						this.errorShow('手机号码格式错误');
					} else {
						this.userCheckExist(mobile);
					}
				}
			},
			editInfo(type, info) {
				this.isJob = true;
				this.editJob = info;
				type == 'brand' ? this.type = 'brand' : this.type = 'shop';
			},
			del(type, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认将该职位与该员工解绑？',
					callback: (res) => {
						if (res == 'ok') {
							if (type == 'brand') {
								this.brandInfo = {
									roleId: '',
									name: '',
									shopIds: []
								};
							} else {
								this.shopInfo.splice(index, 1);
							}
						}
					}
				});

			},
			//添加职位
			addJob(type) {
				this.isJob = true;
				this.editJob = null;
				type == 'brand' ? this.type = 'brand' : this.type = 'shop';
			},
			//获取职位弹窗内容
			getJob(res, list) {
				if (list && res == 'ok') {
					if (list == 'admin') {
						this.isJob = false;
						if (this.type == 'brand') {
							this.brandInfo.roleId = '0';
							this.brandInfo.name = '超级管理员';
							this.surperBrand = true;
						} else {
							this.shopInfo.push({
								roleId: '0',
								name: '超级管理员',
								shopIds: []
							});
						}
					} else {
						this.isJob = false;
						this.shopList = list.shopList;
						if (this.type == 'brand') {
							this.brandInfo = list.jobInfo;
							this.surperBrand = false;
						} else {
							for (let i = 0; i < this.shopInfo.length; i++) {
								if (list.jobInfo.roleId == this.shopInfo[i].roleId) { //职位名称相同，将选择的店铺都放到一起
									for (let j = 0; j < list.jobInfo.shopIds.length; j++) {
										if (this.shopInfo[i].shopIds.indexOf(list.jobInfo.shopIds[j]) == -1) {
											this.shopInfo[i].shopIds.push(list.jobInfo.shopIds[j]);
										}
									}
								}
							}
							//同一个门店下创建职位，后添加的职位覆盖前面添加的职位
							for (let m = 0; m < this.shopInfo.length; m++) {
								if (list.jobInfo.roleId == this.shopInfo[m].roleId) { //若id相同，则不删除
									continue;
								}
								for (let n = 0; n < this.shopInfo[m].shopIds.length; n++) {
									if (list.jobInfo.shopIds.indexOf(this.shopInfo[m].shopIds[n]) != -1) {
										this.shopInfo[m].shopIds.splice(n, 1);
										n--;
									}
								}
							}
							let isHave = false;
							for (let k = 0; k < this.shopInfo.length; k++) {
								if (this.shopInfo[k].roleId == list.jobInfo.roleId) {
									isHave = true;
								}
							}
							if (!isHave) { //是否已添加该职位，没有添加则push
								this.shopInfo.push(list.jobInfo);
							}
							for (let m = 0; m < this.shopInfo.length; m++) {
								if (this.shopInfo[m].shopIds.length == 0) { //该职位下没有门店，删除该职位
									this.shopInfo.splice(m, 1);
									m--;
								}
							}
						}
					}
				}
				if (res != 'ok') {
					this.isJob = false;
				}
			},
			//适用一家门店时，显示门店名称
			getShopName(id) {
				for (let i = 0; i < this.shopList.length; i++) {
					if (id == this.shopList[i].id) {
						return this.shopList[i].shopName;
					}
				}
			}
		}
	};
</script>

<style type="text/css" scoped>
	.employmes {
		width: 780px;
		min-height: 520px;
		height: auto;
		padding-top: 20px;
		background-color: #f2f2f2;
	}

	.employmes .tag {
		float: left;
		width: 150px;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}

	.employmes .mes {
		float: left;
		width: 420px;
		height: auto;
		padding-left: 15px;
		margin-bottom: 15px;
	}

	.employmes .mes .info span {
		display: inline-block;
		color: #999999;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.employmes .mes .info img {
		vertical-align: middle;
		margin-right: 20px;
		cursor: pointer;
	}

	.employmes .mes .info .brand {
		color: #F79337;
	}

	.employmes .mes .info .shop {
		color: #2FA8DC;
	}

	.employmes .clear {
		clear: both;
		font-size: 0;
		line-height: 0;
		width: 100%;
	}

	.employmes .selectbtns span {
		background-color: #fff;
	}

	.employmes .btn {
		width: 200px;
		height: 40px;
		line-height: 40px;
		background-color: #22aae0;
		transition: background-color 0.7s;
		margin: 0 3px;
		cursor: pointer;
	}

	.employmes .btn:hover {
		background-color: #2c88da;
	}

	.employmes .btn img {
		vertical-align: middle;
		margin-right: 5px;
	}

	.employmes .already {
		color: rgb(253, 76, 89);
		display: inline-block;
		height: 40px;
		line-height: 40px;
		margin-left: 10px;
	}

	.employmes .btn.disable {
		background-color: #e5e5e0;
		border: 1px solid #cdcdcd;
	}

	.employmes .btn.disable span {
		background-color: #e5e5e0
	}
</style>