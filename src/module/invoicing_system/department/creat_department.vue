/*
* @Author: zhouzhe
* @Date: 2018-12-25 14:52:16
*/
<template>
	<div id="tempList">
		<div class="head">
			<span>新建部门</span>
			<div class="line"></div>
		</div>
		<div class="content">
			<div class="inpStyle">
				<span class="required label">部门名称</span>
				<div class="inpbox">
					<el-input clearable v-model="departmentName" maxlength="10" class="el-in" placeholder="请输入部门名称"></el-input>
				</div>
			</div>
			<div class="inpStyle">
				<span class="required label">部门编码</span>
				<div class="inpbox">
					<el-input clearable v-model="departmentCode" maxlength="8" class="el-in" placeholder="请输入部门编号"></el-input>
				</div>
				<el-button type="text">自动生成</el-button>
			</div>
			<div class="inpStyle">
				<span class="required label">部门负责人</span>
				<div class="btnbox">
					<el-tag v-for="(tag,i) in sleRoleArr" style="margin:0 0 15px 15px;" :key="i" @close='handleClose(i)' closable>
						{{tag.name}}
					</el-tag>
					<div class="addBtn">
						<el-button type="text" @click="addPosition" icon="el-icon-circle-plus-outline">添加负责人</el-button>
					</div>
				</div>
			</div>
		</div>
		<add-position v-if="positionWin" :title="'选择部门负责人'" :roleList="roleList" :sleRoleArr="sleRoleArr" @positionEvent="positionEvent"></add-position>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	// import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	let shopId = storage.session('shopId');
	export default {
		data() {
			return {
				departmentName: '',
				departmentCode: '',
				roleList: [], //门店职位列表
				sleRoleArr: [], //选中的职位
				positionWin: false
			};
		},
		methods: {
			addPosition() {
				this.positionWin = true;
			},
			handleClose(index) {
				this.sleRoleArr.splice(index, 1);
			},
			positionEvent(sle) {
				if (sle && sle.length <= 50) {
					this.sleRoleArr = sle;
				}
				if (sle && sle.length > 50) {
					this.sendWarning('warning', '负责人最多50人！');
				} else {
					this.positionWin = false;
				}
			},
			async getRoleList() {
				let data = await http.getUserRoleList();
				this.roleList = [];
				data.forEach(v => {
					if (v.shopId == shopId) this.roleList.push(v);
				});
				console.log(this.roleList);
			},
			resetData() {
				this.departmentName = '';
				this.departmentCode = '';
				this.sleRoleArr = [];
			},
			checkData() {
				let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
				let codeReg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
				if (!reg.test(this.departmentName)) return this.sendWarning('warning', '请输入正确的部门名称！');
				if (!codeReg.test(this.departmentCode)) return this.sendWarning('warning', '请输入正确的部门编码！');
				if (this.sleRoleArr.length == 0) return this.sendWarning('warning', '请选择部门负责人！');
				return true;
			},
			crageBtn() {
				this.$store.commit('setFixButton', [{
					name: '返回',
					className: '',
					type: 1,
					fn: () => {
						window.history.go(-1);
					}
				}, {
					name: '继续添加',
					className: 'primary',
					type: 2,
					fn: () => {
						this.resetData();
					}
				}, {
					name: '确定',
					className: 'primary',
					type: 1,
					fn: () => {

					}
				}]);
			},
			sendWarning(type, str) {
				this.$message({
					type: type,
					message: str,
				});
				return false;
			},
		},
		mounted() {
			this.crageBtn();
			this.getRoleList();
		},
		components: {
			addPosition: () =>
				import( /*webpackChunkName: 'addPosition'*/
					'src/module/invoicing_system/data_center/creat_templatelist/add_position'), //添加职位
		},
	}
</script>
<style lang='less' scoped>
	#tempList {
		.head {
			width: 100%;
			height: 20px;
			margin-top: 10px;
			position: relative;
			overflow: hidden;
			border-left: 3px solid #e1bb4a;
			margin-bottom: 20px;
			span {
				height: 20px;
				font-size: 16px;
				padding-left: 10px;
				display: inline-block;
				line-height: 20px;
				color: #333;
			}

			.line {
				position: absolute;
				top: 9px;
				left: 100px;
				width: 100%;
				border-bottom: 1px dashed #dcdfe6;
			}
		}

		.content {
			padding-left: 20px;
			.inpStyle {
				margin-bottom: 20px;

				.inpbox {
					display: inline-block;
					width: 200px;
					margin-left: 15px;
				}

				.btnbox {
					display: inline-block;
					vertical-align: top;
					width: 400px;
				}

				.addBtn {
					padding-left: 15px;
					height: 13px;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>