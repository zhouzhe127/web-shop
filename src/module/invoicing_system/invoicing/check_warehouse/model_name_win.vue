<!--模板名称弹框弹窗-->
<!--黄一帆-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="450" :height="'auto'" :type="'confirm'" :ok="btnOK" :cancel="btnCancel">
		<!--标题-->
		<span slot="title">{{titleName}}</span>
		<!--内容-->
		<div slot="content" class="content">
			<div class="input-box">
				模板名称 <em>*</em>
				<el-input v-model="modelName" placeholder="模板名称" maxlength="20"></el-input>
			</div>
		</div>
	</win>
</template>

<script>

export default {
	data() {
		return {
			modelName: '', //模板名称
			titleName: '保存模板',
			requestData: {},
			btnOK:{
				content:'确定',
				style:'background-color:#ff9800'
			},
			btnCancel:{
				content:'取消',
				style:'background-color:#a0a0a0'
			},
		};
	},
	props: [
		'name', //模板名称
		'title',//弹框标题
	],
	mounted() {
		this.modelName = this.name;
		this.titleName = this.title;
	},
	methods: {
		clickResult(res) {
			if(res == 'ok') {
				this.confirmMethod(res);
			} else {
				this.$emit('emit', false);
			}
		},
		confirmMethod(res) {
			if(!this.modelName.trim()) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '模板名称不能为空'
				});
				return;
			}
			this.$emit('emit',res,this.modelName.trim());
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