<template>
	<win :width="591" :height="350" @winEvent="winEvent">
		<span slot="title">选择员工</span>
		<div class="staff_win" slot="content">
			<header class="staff_header">
				<input maxlength="11" type="text" v-model.trim="keyWords" placeholder="输入手机号/员工姓名">
				<button @click="selectStaff" class="staff_select">筛选</button>
				<button @click="resetStaff" class="staff_resert">重置</button>
			</header>
			<section class="staff_content" v-if="staffList.length>0">
				<ul>
					<li v-for="(item,index) in staffList" @click="confirmStaff(item)" :class="item.userId==userId?'bg_cor':''" :key="index">
						<span>{{item.name}}</span>
						<span>{{filterInfo(item.shopId)}}</span>
						<span>{{item.roleName}}</span>
						<span>{{item.mobile}}</span>
					</li>
				</ul>
			</section>
		</div>
	</win>
</template>


<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				staffList: [],
				userId: '',
				selectId: '',
				keyWords: '',
				shopList: []
			};
		},
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (this.selectId == '') {
						this.$store.commit('setWin', {
							content: '请选择工作人员',
							title: '操作提示',
							winType: 'alert'
						});
						return false;
					} else {
						this.$emit('closeWin', this.selectId);
					}
				} else {
					this.$emit('closeWin');
				}
			},
			async getUserList() {
				let res = await http.getUserList({
					data: {

					}
				});
				this.staffList = res;
			},
			confirmStaff(item) {
				this.userId = item.userId;
				this.selectId = item.userId;
			},
			async selectStaff() {
				if (this.keyWords == '') {
					this.$store.commit('setWin', {
						content: '请输入关键字',
						winType: 'alert',
						title: '操作提示'
					});
					return false;
				}
				let res = await http.searchStaff({
					data: {
						data: this.keyWords
					}
				});
				if (res.length == 0) {
					this.$store.commit('setWin', {
						content: '无此员工信息',
						winType: 'alert',
						title: '操作提示'
					});
				}
				this.staffList = res;
			},
			resetStaff() {
				this.staffList = [];
				this.keyWords = '';
				this.userId = '';
				this.selectId = '';
			},
			filterInfo(val) {
				for (let i of this.shopList) {
					if (i.id == val) {
						return i.name;
					}
				}
			}
		},
		mounted() {
			//this.getUserList()
			let userShop = storage.session('userShop').shopList;
			let data = [...userShop.brand, ...userShop.noBrand];
			this.shopList = data;
		},
		components: {
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win')
		}
	};
</script>

<style lang="less" scoped>
	.staff_win {
		padding: 15px 25px;
		.staff_header {
			input {
				width: 184px;
				height: 42px;
				border: 1px solid RGB(179, 179, 179);
				margin-right: 18px;
				padding: 0 17px;
			}
			.staff_select {
				width: 101px;
				height: 42px;
				background: RGB(40, 168, 224);
				border: none;
				font-size: 16px;
				color: #fff;
				margin-right: 15px;
			}
			.staff_resert {
				width: 101px;
				height: 42px;
				background: #b3b3b3;
				border: none;
				font-size: 16px;
				color: #fff;
			}
		}
		.staff_content {
			margin-top: 10px;
			ul {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				li {
					width: 165px;
					height: 120px;
					padding: 19px 26px 0;
					margin: 0 9px 12px 0;
					display: flex;
					flex-direction: column;
					text-align: left;
					border: 1px solid RGB(210, 210, 210);
					span {
						text-align: left;
						margin-bottom: 8px;
						font-size: 14px;
						color: RGB(51, 51, 51);
					}
				}
			}
		}
		.bg_cor {
			background: RGB(255, 237, 209);
			border: 1px solid RGB(255, 152, 0) !important;
			span {
				color: RGB(255, 152, 0) !important;
			}
		}
	}
</style>