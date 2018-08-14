<!--
	**职位管理(品牌)一级弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<win @winEvent="clickResult" :align="'right'" :width="480" :height="'auto'" :ok="okStyle" :cancel="cancelStyle">
			<!--标题-->
			<span slot="title">{{title}}</span>
			<!--内容-->
			<div slot="content" style="background-color: #F2F2F2">
				<div class="jobWin" id="jobWin">
					<h2 class="required tag">职位名称</h2>
					<div class="mes">
						<input type="text" class="input" maxlength="10" style="width: 100%; " v-model="info.name" placeholder="请输入职位名字">
					</div>
					<div class="clear"></div>
					<h2 class="required tag">排序</h2>
					<div class="mes">
						<subadd :bindnum="info.sort" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>
					</div>
					<div class="clear"></div>
					<h2 class="required tag">职位权限</h2>
					<div class="mes">
						<a href="javascript:void(0);" class="addclassify" style="width:220px;" v-on:click="edit">分配职位权限</a>
					</div>
					<div class="clear"></div>
					<h2 class="tag"></h2>
					<div class="mes" style="color: #999;">
						已分配职位权限：{{info.nodeIds&&info.nodeIds.length}} 个
					</div>
					<div class="clear"></div>
					<h2 class="tag"></h2>
					<div @click="toCopy()" class="fl copy">
						复制已有职位权限
					</div>
					<div class="mes copyDiv">
						<i></i>
						<p>复制职位权限后会将当前权限覆盖</p>
					</div>
					<div class="clear" style="height: 120px;"></div>
				</div>
			</div>
		</win>
		<positionTan v-if="showTan" @throwTanResult="doThrowTanResult" :info="info"></positionTan>
		<selectRadioWin v-if="isCopyWin" @selectRadioWin="doThrowCopy" :userData="userData" :list="copyPositionList" :title="'请选择需要复制的已有权限'"
			:name="'name'" :selectIndex="index"></selectRadioWin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: '', //弹窗的标题
				cancelStyle: null, //弹框下面的取消样式
				okStyle: null,
				info: {},
				oldName: '',
				showTan: false, //是否展示权限弹窗页面
				isCopyWin: false, //是否展示复制弹窗页面
				shopPositionList: [], //店铺职位列表
				brandPositionList: [], //品牌职位列表
				copyPositionList: [], //传给复制弹窗的职位列表
				index: -1, //再次点击复制权限的下标印记
			};
		},
		props: {
			item: Object,
			userData: Object,
			list: Array,
			isAdd: null,
			isShop: null,
			jobIndex: '',
			currentList: Array,
			newrecordList: Array
		},
		mounted() {
			if (this.isShop && this.isAdd) {
				this.title = '添加门店职位';
				this.cancelStyle = null;
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#29ABE2',
						color: '#fff'
					}
				};
			} else if (!this.isShop && this.isAdd) {
				this.title = '添加品牌职位';
				this.cancelStyle = null;
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#29ABE2',
						color: '#fff'
					}
				};
			} else {
				this.title = '编辑职位';
				this.cancelStyle = null;
				this.okStyle = {
					content: '保存',
					style: {
						backgroundColor: '#29ABE2',
						color: '#fff'
					}
				};
			}
			this.getJobInfo();
			for (let i = 0; i < this.list.length; i++) {
				if (this.list[i].type == 0) {
					this.shopPositionList.push(this.list[i]);
				} else {
					this.brandPositionList.push(this.list[i]);
				}
			}
			if (this.isShop && this.isAdd) {
				this.copyPositionList = this.shopPositionList; //门店
			} else if (!this.isShop && this.isAdd) {
				this.copyPositionList = this.brandPositionList; //品牌
			} else {
				if (this.item.type == 0) {
					this.copyPositionList = this.shopPositionList; //编辑门店
				} else {
					this.copyPositionList = this.brandPositionList; //编辑品牌
				}
			}
		},
		methods: {
			change(res) {
				this.info.sort = res;
			},
			//获取职位信息
			async getJobInfo() {
				if (!this.isAdd) {
					let res = await http.roleGet({
						data: {
							shopId: this.userData.currentShop.id,
							id: this.item.id
						}
					});
					if (res) {
						this.oldName = res.name;
						res.nodeIds = res.nodeIds.split(',');
						this.info = res;
					}
				} else if (this.isAdd) {
					this.info.nodeIds = [];
					this.info = {
						name: '',
						shopId: this.userData.currentShop.id,
						sort: '255',
						nodeNum: '',
						type: this.isShop ? 0 : 1,
						personNum: 0,
						nodeIds: []
					};
				}
			},
			// 添加职位
			async addJob(backRes) {
				let res = await http.roleAddPosition({
					data: {
						name: this.info.name,
						sort: this.info.sort,
						nodeIds: this.info.nodeIds.join(','),
						type: this.info.type
					}
				});
				if (res) {
					//                    this.list.push(res);
					res.personNum = 0;
					this.newrecordList.push(res);
				}
				this.$emit('throwWinResult', backRes, true); //抛出一个事件给父组件
			},
			// 修改职位
			async editJob(backRes) {
				let res = await http.RoleEditPosition({
					data: {
						id: this.item.id,
						name: this.info.name,
						sort: this.info.sort,
						nodeIds: this.info.nodeIds.join(','),
						type: this.info.type
					}
				});
				if (res) {
					//                    this.list.splice(this.jobIndex,1,res);
					this.newrecordList.splice(this.jobIndex, 1, res);
				}
				this.$emit('throwWinResult', backRes);
			},
			clickResult(res) {
				if (res == 'ok') {
					let info = this.info;
					if (info) {
						let emptyReg = /^[\s]*$/;
						let nameReg = /['"&]/g; // /[^\w\d\u4e00-\u9fa5]/g;
						let name = info.name + '';
						if (emptyReg.test(name)) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '职位名称不能为空',
							});
							return false;
						}
						if (name.replace(nameReg, '').length !== name.length) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '姓职位名称中不能包含英文的单引号和双引号',
							});
							return false;
						}
						if (info.nodeIds.length == 0) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '必须分配至少一项职位权限',
							});
							return false;
						}
						for (let i = 0; i < this.copyPositionList.length; i++) {
							if ((this.copyPositionList[i].name === name && this.isAdd) ||
								(!this.isAdd && this.oldName !== name && this.copyPositionList[i].name === name)) {
								this.$store.commit('setWin', {
									title: '温馨提示',
									winType: 'alter',
									content: '该职位已经存在',
								});
								return false;
							}
						}
					} else {
						return true;
					}
					this.info.shopId = this.userData.currentShop.id;
					this.info.sort = parseInt(this.info.sort);
					if (this.isAdd) {
						// 添加职位
						this.addJob(res);
					} else if (!this.isAdd) {
						// 修改职位
						this.editJob(res);
					}
				} else if (res == 'cancel') {
					this.$emit('throwWinResult', res); //抛出一个事件给父组件
				} else if (res == 'close') {
					this.$emit('throwWinResult', res); //抛出一个事件给父组件
				}
			},
			//打开分配职位权限弹窗
			edit() {
				this.showTan = true;
			},
			//权限子组件返回的事件
			doThrowTanResult() {
				this.showTan = false;
				//                console.log(this.info);
			},
			//复制弹窗
			toCopy() {
				this.isCopyWin = true;
			},
			//复制子组件返回的事件
			doThrowCopy(res, copyInfo) {
				if (res == 'ok') {
					this.isCopyWin = false;
					this.info.nodeIds = copyInfo.nodeIds.split(',');
					this.index = copyInfo.index;
				} else {
					this.isCopyWin = false;
				}
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			subadd: () =>
				import ( /*webpackChunkName: 'subadd'*/ 'src/components/subadd'),
			// positionCopy: ()=> import (/*webpackChunkName: 'position_copy_win'*/ './position_copy_win'),
			positionTan: () =>
				import ( /*webpackChunkName: 'job_manage_two'*/ './../shop_config/job_manage_two'),
			selectRadioWin: () =>
				import ( /*webpackChunkName: 'select_radio_win'*/ 'src/components/select_radio_win'),
		}

	};
</script>

<style scoped>
	.jobWin {
		width: 480px;
		height: auto;
		min-height: 480px;
		padding-top: 20px;
		background-color: #f2f2f2;
	}

	.jobWin .tag {
		float: left;
		width: 102px;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}

	.jobWin .mes {
		float: left;
		width: 300px;
		padding-left: 15px;
		text-indent: 0;
		line-height: 0;
	}

	.jobWin .clear {
		clear: both;
		font-size: 0;
		line-height: 0;
		height: 15px;
		width: 100%;
	}

	.jobWin .copy {
		border: 1px solid #29A7E1;
		width: 210px;
		height: 41px;
		line-height: 41px;
		text-align: center;
		margin-top: -30px;
		margin-left: 18px;
		cursor: pointer;
		color: #2FA8DC
	}

	.jobWin .copyDiv p {
		color: #A5A5A5;
		font-size: 14px;
	}

	.jobWin .copyDiv {
		height: 40px;
		line-height: 20px;
		text-indent: 10px;
		background: url("../../res/images/handle-tips.png") 0 0 no-repeat;
		color: #999999;
		margin-left: 15px;
		margin-top: 10px;
	}
</style>