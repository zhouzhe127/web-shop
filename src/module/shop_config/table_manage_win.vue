<!--
	**桌台一级管理
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'right'" :width="600" :height="670" :ok="okStyle" :cancel="cancelStyle">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<div id="table-window">
				<el-form :model="getOneTable" ref="getOneTable" label-width="120px">
					<el-form-item required label="区域">
						<el-radio-group v-model="oIndex">
							<el-radio class="labItem" v-for="(item,i) in Area" :key="i" :label="i" border>{{item.areaName}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item required label="桌号名称">
						<el-input v-model="getOneTable.tableName" maxlength="40" placeholder="输入桌台名称(创建多个桌台请以逗号隔开)" style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="桌号编号" v-if="!isAdd">
						<el-input v-model="getOneTable.id" placeholder="输入桌台编号(数字)" maxlength='9' style="width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="标准席位">
						<el-input-number v-model="getOneTable.normalSeat" style="width:150px;" :min="1" :max="1000"></el-input-number>
					</el-form-item>
					<el-form-item required label="容纳人数">
						<el-input-number v-model="minSeat" style="width:150px;" :min="1" :max="1000"></el-input-number>
						<span>至</span>
						<el-input-number v-model="maxSeat" style="width:150px;" :min="1" :max="1000"></el-input-number>
					</el-form-item>
					<el-form-item required label="排序">
						<el-input-number v-model="sort" style="width:150px;" :min="1" :max="255"></el-input-number>
					</el-form-item>
					<el-form-item label="描述">
						<el-input type="textarea" maxlength='50' style="width:400px;" v-model="getOneTable.description"></el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: '',
			okStyle: null,
			cancelStyle: null,
			sort: 255,
			minSeat: 1, //最小容纳人数
			maxSeat: 99, //最大容纳人数
			getOneTable: {}, //详细桌台信息数据
			oIndex: -1, //顶部区域选择 index
			areaID: 0 //区域id
		};
	},
	props: {
		isAdd: Boolean,
		tableId: '',
		userData: Object,
		Area: Array, //区域列表
		tableDetial: Object
	},
	mounted() {
		if (this.isAdd) {
			this.title = '新建桌台';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		} else if (!this.isAdd) {
			this.title = '修改桌台';
			this.cancelStyle = {
				content: '删除',
				style: {
					backgroundColor: 'red',
					color: '#fff '
				}
			};
		}
		this.getTableInfo();
	},
	methods: {
		//选择区域
		//		doThrowWinResult(i) {
		//			if (this.getOneTable && this.Area) {
		//				this.oIndex = i;
		//			}
		//		},
		//		//标准席位
		//		changeOne(res) {
		//			this.getOneTable.normalSeat = res;
		//		},
		//		//最小容纳人数
		//		changeTwo(res) {
		//			this.minSeat = res;
		//		},
		//		//最大容纳人数
		//		changeThree(res) {
		//			this.maxSeat = res;
		//		},
		//		//排序
		//		changeFour(res) {
		//			this.sort = res;
		//		},
		//创建桌台
		async createTable(backRes) {
			let res = await http.createTable({
				data: {
					areaId: this.Area[this.oIndex].id,
					shopId: this.userData.currentShop.id,
					tableName: this.getOneTable.tableName,
					normalSeat: this.getOneTable.normalSeat,
					description: this.getOneTable.description,
					minSeat: this.minSeat,
					maxSeat: this.maxSeat,
					sort: this.sort,
					createUid: this.userData.user.id
				}
			});
			if (res) {
				this.$emit('throwWinResult', backRes, res); //抛出一个事件给父组件
			}
		},
		//编辑桌台
		async editTable(backRes) {
			let res = await http.editTable({
				data: {
					shopId: this.userData.currentShop.id,
					areaId: this.Area[this.oIndex].id,
					id: this.tableId,
					newTableId: this.getOneTable.id,
					tableName: this.getOneTable.tableName,
					normalSeat: this.getOneTable.normalSeat,
					description: this.getOneTable.description,
					minSeat: this.minSeat,
					maxSeat: this.maxSeat,
					sort: this.sort,
					updateUid: this.userData.user.id
				}
			});
			if (res) {
				this.$emit('throwWinResult', backRes, res); //抛出一个事件给父组件
			}
		},
		//删除桌台
		async deleteTable(backRes) {
			let res = await http.deleteTable({
				data: {
					shopId: this.userData.currentShop.id,
					id: this.tableId
				}
			});
			if (res) {
				this.$emit('throwWinResult', backRes, this.tableId); //抛出一个事件给父组件
			}
		},
		//判断是修改还是添加 对区域信息数据进行赋值
		getTableInfo() {
			if (!this.isAdd) {
				this.areaID = this.tableDetial.areaId;
				this.getOneTable = this.tableDetial;
				this.sort = this.tableDetial.sort;
				this.minSeat = this.tableDetial.minSeat;
				this.maxSeat = this.tableDetial.maxSeat;
				for (let i = 0; i < this.Area.length; i++) {
					if (this.Area[i].id + '' === this.areaID + '') {
						this.oIndex = i;
					}
				}
			} else if (this.isAdd) {
				this.getOneTable = {
					tableName: '', //桌号名称
					normalSeat: 6, //标准席位
					description: '', //描述
					id: '' //桌台id
				};
			}
		},
		//点击弹窗的事件
		clickResult(res) {
			if (res == 'ok') {
				let info = this.getOneTable;
				let nameTable = info.tableName + '';
				let regex = /,|，/;
				let arrT = nameTable.split(regex);
				info.tableName = '';
				for (let i = 0; i < arrT.length; i++) {
					if (arrT[i].length > 20) {
						this.$store.commit('setWin', {
							title: '提示信息',
							winType: 'alter',
							content: '单个桌台名不能超过20个字'
						});
						return false;
					}
					if (arrT[i] != null && arrT[i] != '') {
						info.tableName += arrT[i];
						info.tableName += ',';
					}
				}
				info.tableName = (info.tableName + '').substring(
					0,
					info.tableName.length - 1
				);
				if (this.oIndex == -1) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '请选择区域'
					});
					return false;
				}
				if (
					info.tableName == '' ||
					info.tableName == undefined ||
					info.tableName == null
				) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '桌号名不能为空'
					});
					return false;
				}
				if (this.getOneTable.id.trim().length == 0 && !this.isAdd) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '桌号编号不能为空'
					});
					return false;
				}
				let regNormalSeat = info.normalSeat - 0;
				let regNum = /^[0-9]+$/;
				if (!regNum.test(Number(this.getOneTable.id)) && !this.isAdd) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '桌号编号只能是数字'
					});
					return false;
				}
				if (
					regNormalSeat == '' ||
					regNormalSeat == undefined ||
					regNormalSeat == null
				) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '标准席位不能为空'
					});
					return false;
				}
				if (!regNum.test(regNormalSeat)) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '标准席位只能是数字'
					});
					return false;
				}
				let min = this.minSeat - 0;
				let max = this.maxSeat - 0;
				if (max < 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '容纳的最大人数不能小于0'
					});
					return false;
				}
				if (!regNum.test(max)) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '容纳的最大人数只能为整数'
					});
					return false;
				}
				if (min < 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '容纳的最小人数不能小于0'
					});
					return false;
				}
				if (!regNum.test(min)) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '容纳的最小人数只能为整数'
					});
					return false;
				}
				if (min > max) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '容纳最大人数不能小于最小人数'
					});
					return false;
				}
				if (this.isAdd) {
					this.createTable(res);
				} else if (!this.isAdd) {
					this.editTable(res);
				}
			} else if (res == 'cancel') {
				if (!this.isAdd) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'confirm',
						content: `确定删除桌台${this.getOneTable.tableName}?`,
						callback: delRes => {
							if (delRes == 'ok') {
								this.deleteTable(res);
							}
						}
					});
				}
				if (this.isAdd) {
					this.$emit('throwWinResult', res); //抛出一个事件给父组件
				}
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		subadd: () =>
			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd'),
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn')
	}
};
</script>

<style scoped lang="less">
#table-window {
	// width: 580px;
	// height: 669px;
	// background-color: #f2f2f2;
	// text-align: center;
	padding: 20px 0;
	.labItem {
		margin-bottom: 5px;
		margin-left: 0 !important;
		margin-right: 10px;
	}
}
</style>