<template>
	<div class="setup_user">
		<!-- <header class="setup_user_nav">
			<span>新建人员</span>
			<p class="dashed"></p>
		</header> -->
		<!-- 生日活动 -->
		<div class="set-line">
			<div class="titles">新建人员</div>
			<div class="line"></div>
		</div>
		<!-- 用户 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">用户</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-plus" @click="selectUser" style="width:179px;">选择用户</el-button>
				<span class="authority_select" v-if="userSelectId">已选择1位用户</span>
			</div>
		</div>
		<!-- 绑定员工 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">绑定员工</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-plus" @click="selectEmployee" style="width:179px;">选择员工</el-button>
				<span v-if="staffId" class="authority_select">已选择1位员工</span>
			</div>
		</div>
		<!-- 权限 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">权限</span>
			<div class="rightHalf">
				<mul-select :styles="{marginRight:'8px','border-radius':'4px'}" :list="powList" :selects="selectPow" :name="'name'" :keys="'id'" :isradio="false"></mul-select>
			</div>
		</div>
		<!-- 工作门店 -->
		<div class="online-box clearfix" v-if="ischain == 3">
			<span class="online-sub fl required">工作门店</span>
			<div class="rightHalf">
				<el-button type="primary" icon="el-icon-plus" @click="selectStores" style="width:179px;">选择工作门店</el-button>
				<span class="authority_select" v-if="slectsShopIds.length > 0">已选择{{slectsShopIds.length}}家门店</span>
			</div>
		</div>
		<!-- 工作门店 -->
		<div class="online-box clearfix" v-if="ischain != 3">
			<span class="online-sub fl required">工作门店</span>
			<div class="rightHalf">
				<span class="obj">{{shopName}}</span>
			</div>
		</div>
		<!-- 职位 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">职位</span>
			<div class="rightHalf">
				<mul-select :styles="{'border-radius':'4px',marginRight:'8px'}" :list="jobList" :selects="selectJob" :name="'name'" :keys="'id'" :isradio="true"></mul-select>
			</div>
		</div>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<el-button type="primary" style="width:190px;" @click="saveChange">保存</el-button>
			</div>
		</div>
		<transition name="fade">
			<select-user-win :showIds="showIds" @closeWin="closeUserWin" v-if="isShowSelector"></select-user-win>
			<select-work-shop-win :slectsShopIds="slectsShopIds" :isEdit="isEdit" @closeWin="closeShopWin" v-if="isShowShopWin"></select-work-shop-win>
			<select-staff-win @closeWin="selectStaff" v-if="isShowStaff"></select-staff-win>
		</transition>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				powList: [{
						name: '积分商品核销'
					},
					{
						name: '疯抢商品核销'
					},
					{
						name: '优惠券核销'
					},
					{
						name: '扫码消费'
					},
					{
						name: '任务审核'
					}
				], //  权限列表
				selectPow: [], //  权限选择的数据
				isShowStaff: false, //  是否展示选择员工弹框
				selectJob: [],
				jobList: [{
						name: '店长'
					},
					{
						name: '店员'
					},
					{
						name: '收银员'
					}
				],
				isShowSelector: false,
				ischain: '',
				shopName: '',
				isShowShopWin: false,
				isEdit: false,
				userSelectId: '', ///   选择的用户id
				power: '1', //   权限
				slectsShopIds: [], //   选择的门店
				staffId: '', // 选择员工id
				editDatas: utils.deepCopy(this.editData),
				showIds: ''
			};
		},
		props: ['editData'],
		methods: {
			selectUser: function() {
				this.isShowSelector = true;
				this.showIds = this.userSelectId;
			},
			selectEmployee: function() {
				this.isShowStaff = true;
			},
			selectStores: function() { //选择工作门店
				this.isShowShopWin = true;
			},
			selectStaff(val) {
				//   选择工作人员
				this.isShowStaff = false;
				if (val) {
					this.staffId = val;
				}
			},
			closeShopWin(str) {
				//   选择门店
				this.isShowShopWin = false;
				if (str) {
					this.slectsShopIds = str;
				}
			},
			closeUserWin(str) {
				//  选择用户
				this.isShowSelector = false;
				if (str) {
					this.userSelectId = str;
				}
			},
			wentBack() {
				//   关闭弹框
				this.$store.commit('setPageTools', {});
				this.$emit('wengBack');
			},
			init() {
				//   如果编辑则回填数据
				this.userSelectId = this.editDatas.fansId;
				this.showIds = this.editDatas.fansId;
				this.selectJob = [this.editDatas.position - 1];

				this.slectsShopIds = this.editDatas.shopIds.split(',');
				this.staffId = this.editDatas.staffId;
				// this. = this.editDatas.fansId                //  粉丝id
				// this.selectPow = [this.editDatas.permissions-1]
				let arr = this.editDatas.permissions.split(',');
				for (let p of arr) {
					this.selectPow.push(Number(p) - 1);
				}
			},
			async saveChange() {
				///      保存修改
				if (
					!global.checkData({
							userSelectId: {
								cond: `$$ != ''`,
								pro: '请选择用户'
							},
							staffId: {
								cond: `$$.trim() != ''`,
								pro: '请选择工作人员'
							},
							selectPow: {
								cond: '$$.length>0',
								pro: '请选择权限'
							}
						},
						this
					)
				) {
					return false;
				}
				if (this.ischain == 3 && this.slectsShopIds.length < 1) {
					this.$store.commit('setWin', {
						content: '请选择工作门店',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				if (this.selectJob.length == '0') {
					this.$store.commit('setWin', {
						content: '请选择职位',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				let res = '';
				let arr = [];
				for (let i of this.selectPow) {
					arr.push(i + 1);
				}
				if (this.isEdit) {
					res = await http.editAssistantstaff({
						data: {
							id: this.editDatas.id,
							fansId: this.userSelectId,
							staffId: this.staffId,
							permissions: arr.toString(),
							shopIds: this.slectsShopIds.join(','),
							position: this.selectJob[0] + 1
						}
					});
				} else {
					res = await http.addAssistantstaff({
						data: {
							fansId: this.userSelectId,
							staffId: this.staffId,
							permissions: arr.toString(),
							shopIds: this.slectsShopIds.join(','),
							position: this.selectJob[0] + 1
						}
					});
				}
				if (res) {
					this.$store.commit('setWin', {
						content: '保存成功',
						title: '操作提示',
						winType: 'alert'
					});
					this.wentBack();
				}
			}
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				fn: () => {
					this.wentBack();
				},
				className: 'el-btn-blue'
			}]);
			let userShop = storage.session('userShop');
			this.ischain = userShop.currentShop.ischain;
			if (this.ischain != 3) {
				(this.shopName = userShop.currentShop.name),
				(this.slectsShopIds = [userShop.currentShop.id]);
			}
			if (this.editData) {
				this.isEdit = true;
				this.init();
			}
		},
		components: {
			'select-user-win': () =>
				import( /* webpackChunkName: 'select_user_win' */ './select_user_win'),
			'select-work-shop-win': () =>
				import( /* webpackChunkName: 'select_work_shop_win' */ './select_work_shop_win'),
			'mul-select': () =>
				import( /* webpackChunkName: 'mul_select' */ 'src/components/mul_select'),
			'select-staff-win': () =>
				import( /* webpackChunkName: 'select_staff_win' */ './select_staff_win')
		}
	};
</script>
<style lang="less" scoped>
	.setup_user .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	.setup_user .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	.setup_user .set-line .line {
		display: inline-block;
		width: 870px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	.setup_user .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	.setup_user .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	.setup_user .online-box .rightHalf {
		max-width: 900px;
		height: auto;
		float: left;
	}

	.setup_user .online-box .rightHalf .obj {
		display: inline-block;
		min-width: 179px;
		height: 40px;
		background: #f8f8f8;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
	}
</style>