<template>
	<div id="admin-set">
		<div class="admines-add" @click="addAdmin()">
			<div class="adm-aimg">
			</div>
			<div class="adm-name">
				新建管理员
			</div>
		</div>
		<div class="admines" v-for="(admin,index) in list" v-bind:key="admin.name">
			<div class="adm-img">
				<img :src="admin.imageUrl" />
			</div>
			<div class="adm-name">
				{{admin.name}}
			</div>
			<div class="adm-measking" transition="slidUpDown" @click="delStaff(admin.id,index)">
				<img src="../../res/icon/error.png" />
			</div>
		</div>
		<addAdmin :codeUrl="codeUrl" v-if="isShow" @winEvent="winEvent"></addAdmin>
	</div>
</template>
<script>
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				list: [], // 管理员列表
				codeUrl: '', // 绑定管理员url
				isShow: false
			};
		},
		methods: {
			async getStaffList() {
				// 获取管理员配置
				let data = await http.getStaffList({});
				this.codeUrl = data.url;
				this.list = data.userInfo;
			},
			addAdmin: function () {
				// 新建管理员
				this.isShow = true;
			},
			delStaff: function (id, index) {
				// 删除管理员
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '提示信息',
					content: '确定删除该管理员？',
					callback: async (res) => {
						if (res == 'ok') {
							let delAdmin = await http.delStaff({
								data: {
									'id': id
								}
							});
							if (delAdmin === true) this.list.splice(index, 1);
						}
					},
				});
			},
			winEvent: function (str) {
				// 接收弹窗事件
				this.isShow = false;
				if (str == 'ok') this.getStaffList();
			}
		},
		async mounted() {
			this.getStaffList();
		},
		components: {
			addAdmin: () =>
				import ( /*webpackChunkName: 'template_win'*/ './admin_config/add_admin_win')
		}
	};
</script>

<style scoped>
	#admin-set {
		margin-top: 50px;
		width: 100%;
		height: 100%;
	}

	#admin-set .admines-add {
		width: 138px;
		height: 138px;
		border: 1px solid #E1E1E1;
		cursor: pointer;
		float: left;
		margin-right: 20px;
	}

	#admin-set .admines-add .adm-aimg {
		width: 140px;
		height: 90px;
		background: url(../../res/images/comadd.png) center center no-repeat;
		background-size: 40%;
	}

	#admin-set .adm-name {
		width: 140px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		color: #666666;
		font-size: 18px;
	}

	#admin-set .admines {
		width: 140px;
		height: 180px;
		float: left;
		position: relative;
		margin-right: 30px;
	}

	#admin-set .admines .adm-img {
		width: 138px;
		height: 138px;
		border: 1px solid #E1E1E1;
	}

	#admin-set .admines .adm-img img {
		width: 100%;
		height: 100%;
	}

	#admin-set .admines .adm-name {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#admin-set .admines .adm-measking {
		background-color: #E1E1E1;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		text-align: center;
		line-height: 40px;
		position: absolute;
		top: -15px;
		right: -15px;
		/*display: none;*/
		cursor: pointer;
	}

	#admin-set .admines .adm-measking img {
		width: 20px;
		height: 20px;
		margin-top: 10px;
	}

	#admin-set .admines:hover .adm-measking {
		display: block;
	}

	#admin-set .admines .adm-measking {
		display: none;
	}

	#adm-code {
		width: 500px;
		height: 500px;

	}

	.admin-hide {
		display: none;
	}

	.w100p {
		width: 100%;
	}
</style>