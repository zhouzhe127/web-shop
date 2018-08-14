<!--
	**职位管理一级弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<win @winEvent="clickResult" :align="'right'" :width="600" :height="'auto'" :ok="okStyle" :cancel="cancelStyle">
			<!--标题-->
			<span slot="title">{{title}}</span>
			<!--内容-->
			<div slot="content">
				<div class="jobWin" id="jobWin">
					<el-form :model="info" ref="info" label-width="100px">
						<el-form-item required label="职位名称">
							<el-input v-model="info.name" maxlength="20" placeholder = "请输入职位名称" style = "width:280px;"></el-input>
						</el-form-item>
						<el-form-item required label="排序">
							<el-input-number v-model="info.sort" style="width:150px;" :min="1" :max="255"></el-input-number>
						</el-form-item>
						<el-form-item required label="职位权限">
							<el-button @click="edit" type="primary" style="width:150px;">分配职位权限</el-button>
							<div v-if="info && info.nodeIds " style="color: #999;width: 300px;">
								已分配职位权限：{{info.nodeIds.length }} 个
							</div>
						</el-form-item>
						<el-form-item>
							<el-button plain @click="copysec" style="width:150px;float:left;">复制已有职位权限</el-button>
							<div style="color: #999;float:left;line-height:40px;width:220px;">
								<img src="../../res/icon/prompt.png" alt="" style="float:left;padding:10px;">
								<span>复制权限后会将当前权限覆盖</span>
							</div>
						</el-form-item>
					</el-form>
					<!-- <h2 class="required tag">职位名称</h2>
					<div class="mes">
						<input type="text" class="input" maxlength="10" style="width: 280px; " v-model="info.name" placeholder="请输入职位名字">
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
					<div class="mes" v-if="info && info.nodeIds " style="color: #999;">
						已分配职位权限：{{info.nodeIds.length }} 个
					</div>
					<div class="mes" style="margin-top:20px;">
						<a href="javascript:void(0);" class="addses" style="width:150px;float:left;" v-on:click="copysec">复制已有职位权限</a>
						<div style="color: #999;float:left;line-height:40px;width:220px;">
							<img src="../../res/icon/prompt.png" alt="" style="float:left;padding:10px;">
							<span>复制权限后会将当前权限覆盖</span>
						</div>
					</div>
					<div class="clear" style="height: 120px;"></div> -->
				</div>
			</div>

		</win>
		<job-tan v-if="showTan" @throwTanResult="doThrowTanResult" :info="info" :type="'0'"></job-tan>
		<selectRadioWin v-if="showRadioTan" @selectRadioWin="TanResult" :list="list" :title="'请选择需要复制的已有权限'" :name="'name'" :selectIndex="index"></selectRadioWin>
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
			info: {
				name: '',
				sort: '255',
				nodeIds: [],
				type: '0'
			},
			oldName: '',
			showTan: false, //是否展示弹窗页面
			showRadioTan: false, //展示单选弹窗组件
			index: -1 //再次点击复制权限的下标印记
		};
	},
	props: {
		isAdd: null,
		jobId: '',
		jobIndex: '',
		list: Array
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		subadd: () =>
			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd'),
		jobTan: () =>
			import(/*webpackChunkName: "job_manage_two"*/ './job_manage_two'),
		selectRadioWin: () =>
			import(/*webpackChunkName: "select_radio_win"*/ 'src/components/select_radio_win')
	},
	mounted() {
		if (this.isAdd) {
			this.title = '新建职位';
			this.cancelStyle = null;
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		} else if (!this.isAdd) {
			this.title = '修改职位';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		}
		this.getJobInfo();
	},
	methods: {
		//选择已有职位权限后返回
		TanResult(res, item) {
			if (res == 'ok') {
				this.info.nodeIds = item.nodeIds.split(',');
				this.index = item.index;
				this.showRadioTan = false;
			} else if (res == 'cancel' || res == 'close') {
				this.showRadioTan = false;
			} else {
				this.showRadioTan = true;
			}
		},
		//复制已有权限按钮点击
		copysec: function() {
			this.showRadioTan = true;
		},
		//排序的改变
		change(res) {
			this.info.sort = res;
		},
		//获取职位信息
		async getJobInfo() {
			if (!this.isAdd) {
				let res = await http.newGetJobInfo({
					data: { id: this.jobId }
				});
				if (res) {
					this.oldName = res.name;
					res.nodeIds = res.nodeIds.split(',');
					this.info = res;
					// this.info.nodeIds = this.info.nodeIds;
				}
			}
		},
		//传给父组件信息
		clickResult(res) {
			if (res == 'ok') {
				let info = this.info;
				if (info) {
					let emptyReg = /^[\s]*$/;
					let name = info.name + '';
					if (emptyReg.test(name)) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '职位名称不能为空'
						});
						return false;
					}
					for (let i = 0; i < this.list.length; i++) {
						if (
							(this.list[i].name === name && this.isAdd) ||
							(!this.isAdd &&
								this.oldName !== name &&
								this.list[i].name === name)
						) {
							this.$store.commit('setWin', {
								title: '温馨提示',
								winType: 'alter',
								content: '该职位已经存在'
							});
							return false;
						}
					}
					if (info.nodeIds.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '必须分配至少一项职位权限'
						});
						return false;
					}
				} else {
					return true;
				}
				this.info.sort = parseInt(this.info.sort);
				let nodeId = this.info.nodeIds;
				let nodeIds = '';
				for (let i = 0; i < nodeId.length; i++) {
					nodeIds = nodeIds + nodeId[i] + ',';
				}
				this.info.nodeIds = nodeIds;
				let detial = this.info;
				this.$emit('throwWinResult', res, detial); //抛出一个事件给父组件
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		},
		//打开分配职位权限弹窗
		edit() {
			this.showTan = true;
		},
		//接受子组件抛出的事件
		doThrowTanResult(res) {
			if (res == 'ok' || res == 'cancel' || res == 'close') {
				this.showTan = false;
			} else {
				this.showTan = true;
			}
		}
	}
};
</script>

<style scoped>
#jobWin {
	width: 600px;
	height: auto;
	min-height: 480px;
	padding-top: 20px; 
	/* background-color: #f2f2f2; */
}
/* #jobWin .tag {
	float: left;
	width: 102px;
	height: 40px;
	line-height: 40px;
	text-align: right;
}

#jobWin .mes {
	float: left;
	width: 400px;
	padding-left: 15px;
	text-indent: 0;
	line-height: 0;
}
#jobWin .addses {
	width: 220px;
	border: 1px solid #29a7e1;
	color: #29a7e1;
	text-align: center;
	line-height: 40px;
}
#jobWin .clear {
	clear: both;
	font-size: 0;
	line-height: 0;
	height: 15px;
	width: 100%;
} */
</style>
