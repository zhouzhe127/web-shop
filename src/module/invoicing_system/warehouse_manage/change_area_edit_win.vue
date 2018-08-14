<!--预定统计弹窗-->
<!--黄一帆-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="450" :height="'auto'" :type="'confirm'">
		<!--标题-->
		<span slot="title">{{titleName}}</span>
		<!--内容-->
		<div slot="content" class="content">
			<div class="input-box" v-if="type == 'edit'">
				区域名称 <em>*</em>
				<input type="text" v-model="areaName" placeholder="区域名称" maxlength="20" />
			</div>
			<div class="input-box" v-if="type == 'add'">
				区域名称 <em>*</em>
				<input type="text" v-model="areaName" placeholder="区域名称" maxlength="20" />
			</div>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			areaName: '', //区域名称
			titleName: '修改区域',
			requestData: null,
			type: '',
			oldName: '',
		};
	},
	props: [
		'winOpen', //区域参数
	],
	mounted() {
		this.requestData = this.winOpen;
		this.type = this.requestData.type;
		if(this.requestData.name) {
			this.areaName = this.requestData.name;
			this.oldName = this.requestData.name;
		}
		if(this.type == 'edit') {
			this.titleName = '修改区域';
		} else if(this.type == 'add') {
			this.titleName = '添加区域';
		}
	},
	methods: {
		clickResult(res) {
			if(res == 'ok') {
				this.confirmMethod();
			} else {
				this.$emit('emit', false);
			}
		},
		confirmMethod() {
			if(!this.areaName) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '区域名不能为空'
				});
				return;
			}
			let type = this.requestData.type;
			if(type == 'edit') {
				this.editArea();
			} else if(type == 'add') {
				this.addArea();
			}
		},
		async editArea() { //修改区域
			if(this.oldName == this.areaName) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '区域名称已存在'
				});
				return;
			}
			let data = await http.editWarehouseArea({
				data: {
					name: this.areaName,
					wid: this.requestData.wid,
					id: this.requestData.id,
				}
			});
			if(data) {
				let obj = {
					type: 'edit',
					id: this.requestData.id,
					name: this.areaName
				};
				this.$emit('emit', obj);
			}
		},
		async addArea() { //增加区域
			let data = await http.addWarehouseArea({
				data: {
					name: this.areaName,
					wid: this.requestData.wid,
					id: this.requestData.id,
				}
			});
			if(data) {
				let obj = {
					type: 'add',
					id: this.requestData.id,
					name: this.areaName
				};
				this.$emit('emit', obj);
			}
		},
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win'*/ 'src/components/win'),
	}
};
</script>

<style lang='less' scoped>
	.content{
		.input-box{padding: 50px 0;text-align: center;vertical-align: middle;
			em{color: red;}
			input{width: 180px;height: 30px;line-height: 30px;vertical-align: middle;padding: 0 10px;margin-left: 10px;}
			input:focus{outline: none;}
		}
	}
</style>