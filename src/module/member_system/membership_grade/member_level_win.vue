<!--
    **会员等级弹窗
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='226' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<div class="container">
				<el-radio-group v-model="gradeName" class="fl">
					<el-radio v-for="(item,index) in gradeLists" :key="index" :label="item.name" border @change.native="isWhether(item)" style="margin-bottom: 10px;"></el-radio>
				</el-radio-group>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				title: '选择会员等级',
				okStyle: null,
				cancelStyle: null,
				gradeLists: [], //会员等级列表
				gradeName: '',
				gradeId: '' //被选中的id
			};
		},
		props: {
			gid: String, //自身的id
			grad: String, //选中的id
			gradeCName: String //选中的名城
		},
		methods: {
			getAppliedWin(res) {
				if (res == 'ok') {
					if (this.gradeId == this.gid) {
						this.$store.commit('setWin', {
							content: '不能选择自身等级！',
							winType: 'alert',
							title: '提示信息',
						});
						return false;
					}
					let obj = {
						gradeCName: this.gradeName,
						gradeId: this.gradeId
					};
					this.$emit('getAppliedWin', res, obj);
				} else {
					this.$emit('getAppliedWin', res);
				}
			},
			async getLevelist() {
				let res = await http.memberGetList({
					data: {}
				});
				if (res) {
					this.gradeLists = [];
					for (let item of res) {
						if (item.status != '2') {
							this.gradeLists.push(item);
						}
					}
					if (this.gradeCName != '') {
						this.gradeName = this.gradeCName;
						this.gradeId = this.grad;
					} else {
						this.gradeName = this.gradeLists[0].name;
						this.gradeId = this.gradeLists[0].id;
					}	
				}
			},
			isWhether: function(item) { //单选则会员等级
				this.gradeId = item.id;
			}
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win')
		},
		mounted() {
			this.getLevelist(); //获取所有的会员等级
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#A0A0A0',
					color: '#fff'
				}
			};
		}
	};
</script>
<style scoped>
	#tan {
		width: 100%;
		height: 100%;
	}

	.container {
		width: 100%;
		height: 100%;
		padding: 20px;
	}
</style>