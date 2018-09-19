<!--
	**区域管理弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'right'" :width="580" :height="'auto'" :ok="okStyle" :cancel="cancelStyle">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<div class="tas-addtas" id="area-window">
				<el-form :model="getOneArea" ref="getOneArea" label-width="100px">
					<el-form-item required label="区域名称">
						<el-input v-model="getOneArea.areaName" maxlength="20" placeholder = "请输入区域名称" style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="排序">
						<el-input-number v-model="getOneArea.sort" style="width:150px;" :min="1" :max="255"></el-input-number>
					</el-form-item>
					<el-form-item label="描述">
						<el-input type="textarea" maxlength='50' style="width:360px;" placeholder = "请输入区域描述" v-model="getOneArea.description" ></el-input>
					</el-form-item>
				</el-form>
				<!-- <div class="tas-change">
					<p class="tas-text required fl">名称</p>
					<input type="text" placeholder="请输入区域名称" maxlength="20" style="width:197px;padding-left: 16px;" v-model="getOneArea.areaName" />
					<p class="tas-text required fl">排序</p>
					<subadd :bindnum="getOneArea.sort" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>
				</div>
				<div class="tas-change">
					<p class="tas-text fl">描述</p>
					<textarea class="describe" v-model="getOneArea.description" maxlength="50"></textarea>
				</div> -->
			</div>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: '', //弹窗的标题
			getOneArea: {},
			cancelStyle: null, //弹框下面的取消样式
			okStyle: null
		};
	},
	props: {
		isAdd: null,
		areaId: '',
		shopId: ''
	},
	mounted() {
		if (this.isAdd) {
			this.title = '新建区域';
			this.cancelStyle = null;
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		} else if (!this.isAdd) {
			this.title = '编辑区域';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '删除',
				style: {
					backgroundColor: 'red',
					color: '#fff '
				}
			};
		}
		this.getOneAreaInfo();
	},
	methods: {
		//排序是加减组件事件
		change(res) {
			this.getOneArea.sort = res;
		},
		//获取区域信息
		async getOneAreaInfo() {
			if (!this.isAdd) {
				let res = await http.getOneAreaInfo({
					data: { shopId: this.shopId, id: this.areaId }
				});
				if (res) {
					this.getOneArea = res;
				}
			} else if (this.isAdd) {
				this.getOneArea = {
					areaName: '', //区域名
					description: '', //描述
					sort: 1
				};
			}
		},
		//创建
		async createArea() {
			let res = await http.createArea({
				data: {
					shopId: this.shopId,
					areaName: this.getOneArea.areaName,
					description: this.getOneArea.description,
					sort: this.getOneArea.sort,
					createUid: '1'
				}
			});
			return res;
		},
		//编辑
		async editArea(info) {
			let res = await http.editArea({
				data: {
					shopId: this.shopId,
					id: this.areaId,
					areaName: info.areaName,
					description: info.description,
					sort: info.sort
				}
			});
			return res;
		},
		//删除
		async deleteArea() {
			await http.deleteArea({
				data: {
					shopId: this.shopId,
					id: this.areaId
				}
			});
			return;
		},
		//获取弹窗的点击结果
		clickResult(res) {
			if (res == 'ok') {
				if (this.getOneArea.areaName.trim() == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '区域名不能为空！'
					});
					return false;
				}
				if (!this.getOneArea.sort) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请正确排序'
					});
					return false;
				}
				if (this.isAdd) {
					this.createArea().then(data => {
						this.$emit('throwWinResult', res, data); //抛出一个事件给父组件
					});
				} else if (!this.isAdd) {
					this.editArea(this.getOneArea).then(data => {
						this.$emit('throwWinResult', res, data);
					});
				}
			} else if (res == 'cancel') {
				if (this.isAdd) {
					this.$emit('throwWinResult', res);
				} else if (!this.isAdd) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'confirm',
						content: `确认删除区域${this.getOneArea.areaName}？`,
						callback: delRes => {
							if (delRes == 'ok') {
								this.deleteArea().then(() => {
									this.$emit('throwWinResult',res,this.getOneArea); //抛出一个事件给父组件
								});
							}
						}
					});
				}
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: 'win'*/ 'src/components/win'),
		subadd: () =>
			import(/*webpackChunkName: 'subadd'*/ 'src/components/subadd')
	}
};
</script>

<style lang="less" scoped>
.tas-addtas {
	width: 580px;
	height: 460px;
	// background-color: #f2f2f2;
	padding: 30px;
	// color: #333;
	// .tas-change {
	// 	margin-top: 10px;
	// 	height: 40px;
	// 	.tas-text {
	// 		font-size: 16px;
	// 		line-height: 40px;
	// 		text-align: center;
	// 		width: 64px;
	// 	}
	// 	input {
	// 		border: none;
	// 		height: 40px;
	// 		outline: none;
	// 		padding: 0;
	// 		width: 65px;
	// 		float: left;
	// 	}
	// 	textarea {
	// 		padding-left: 16px;
	// 	}
	// 	.describe {
	// 		width: 400px;
	// 		height: 116px;
	// 		font-size: 14px;
	// 		padding: 14px;
	// 	}
	// }
}
</style>