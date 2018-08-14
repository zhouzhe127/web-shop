<template>
	<div class="setup_user">
		<header class="setup_user_nav">
			<span>新建人员</span>
			<p class="dashed"></p>
		</header>
		<section class="setup_user_content">
			<div class="setup_user_name">
				<span class="authority_d required">用户</span>
				<button @click="()=>{isShowSelector=true;showIds = userSelectId}" class="bind_btn">选择用户</button>
				<span class="authority_select" v-if="userSelectId">已选择1位用户</span>
			</div>
			<div class="bind_staff">
				<span class="required">绑定员工</span>
				<button @click="()=>{isShowStaff = true}" class="bind_btn">选择员工</button>
				<span v-if="staffId" class="authority_select">已选择1位员工</span>
			</div>
			<div class="authority">
				<span class="authority_d required">权限</span>
				<!-- <button class="select_on">核销</button> -->
				<mul-select :styles="{backgroundColor: 'rgb(236,236,236)',marginRight:'8px'}" :list="powList" :selects="selectPow" :name="'name'" :keys="'id'" :isradio="false"></mul-select>
			</div>
			<div v-if="ischain == 3" class="worker_shop">
				<span class="required">工作门店</span>
				<button @click="()=>{isShowShopWin=true}">选择工作门店</button>
				<span class="authority_select" v-if="slectsShopIds.length > 0">已选择{{slectsShopIds.length}}家门店</span>
			</div>
			<div v-if="ischain != 3" class="worker_shop">
				<span class="required">工作门店</span>
				<i>{{shopName}}</i>
			</div>
			<div class="job_type">
				<span class="authority_d required">职位</span>
				<mul-select :styles="{backgroundColor: 'rgb(236,236,236)',marginRight:'8px'}" :list="jobList" :selects="selectJob" :name="'name'" :keys="'id'" :isradio="true"></mul-select>
			</div>
			<div class="save_change">
				<button @click="saveChange">保存</button>
			</div>
		</section>
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
			powList: [
				{
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
			jobList: [
				{
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
				!global.checkData(
					{
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
		this.$store.commit('setPageTools', {
			back: () => {
				this.wentBack();
			}
		});
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
			import(/* webpackChunkName: 'select_user_win' */ './select_user_win'),
		'select-work-shop-win': () =>
			import(/* webpackChunkName: 'select_work_shop_win' */ './select_work_shop_win'),
		'mul-select': () =>
			import(/* webpackChunkName: 'mul_select' */ 'src/components/mul_select'),
		'select-staff-win': () =>
			import(/* webpackChunkName: 'select_staff_win' */ './select_staff_win')
	}
};
</script>
<style lang="less" scoped>
.setup_user {
	position: relative;
	.setup_user_back {
		button {
			position: absolute;
			top: -45px;
			right: 87px;
			width: 102px;
			height: 42px;
			background: #fff;
			border: 1px solid RGB(179, 179, 179);
			color: RGB(179, 179, 179);
			font-size: 16px;
		}
	}
	.setup_user_nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		span {
			font-size: 16px;
			color: GB(51, 51, 51);
			padding-left: 9px;
			border-left: 3px solid RGB(40, 168, 224);
		}
		.dashed {
			margin-left: 8px;
			width: 538px;
			height: 1px;
			background-image: linear-gradient(
				to right,
				#ccc 0%,
				#ccc 50%,
				transparent 50%
			);
			background-size: 20px 1px;
			background-repeat: repeat-x;
		}
	}
	.setup_user_content {
		.setup_user_name {
			margin-top: 32px;
			.authority_select {
				margin-left: 20px;
			}
		}
		.bind_staff {
			margin-top: 20px;
			span {
				font-size: 16px;
				color: RGB(51, 51, 51);
				margin-left: 10px;
				margin-right: 33px;
			}
			button {
				width: 120px;
				height: 41px;
				background: RGB(41, 168, 224);
				color: #fff;
			}
		}
		.authority {
			margin-top: 20px;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.worker_shop {
			margin-top: 20px;
			span {
				font-size: 16px;
				color: RGB(51, 51, 51);
				margin-left: 10px;
				margin-right: 33px;
			}
			button {
				width: 149px;
				height: 40px;
				background: RGB(41, 168, 224);
				color: #fff;
				border: none;
			}
		}
		.job_type {
			margin-top: 20px;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		.save_change {
			button {
				width: 190px;
				height: 52px;
				background: RGB(41, 168, 224);
				color: #fff;
				border: none;
				margin-top: 51px;
				margin-left: 118px;
			}
		}
	}
	.authority_d {
		font-size: 16px;
		color: RGB(51, 51, 51);
		margin-left: 42px;
		margin-right: 33px;
	}
	.select_on {
		width: 102px;
		height: 41px;
		background: RGB(255, 237, 209);
		border: 1px solid RGB(255, 146, 0);
		color: RGB(255, 146, 0);
	}
	.bind_btn {
		width: 120px;
		height: 41px;
		background: RGB(41, 168, 224);
		color: #fff;
		border: none;
	}
}
</style>