<template>
	<win :width="width" :height="height" @winEvent="winEvent" :ok="{style:{'backgroundColor':'#fbb03b'},content:'确定'}" :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<div class="conBox">
				<div class="reason">
					<span>原因：</span>
					<input type="text" v-model="reason" maxlength="20" placeholder="请输入原因">
				</div>
				<div class="reason">
					<span>备注：</span>
					<textarea placeholder="请输入备注" maxlength="40" v-model="remark"></textarea>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	export default {
		data() {
			return {
				reason: '',
				remark: ''
			};
		},
		props: ['width', 'height', 'title'],
		methods: {
			winEvent(str) {
				this.$emit('winEvent', str, [this.reason, this.remark]);
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		}
	};
</script>
<style lang="less" scoped>
	#tan {
		height: 100%;
		padding: 10px 60px;
		background-color: #eeeeee;
		.conBox {
			margin-top: 20px;
			margin: 0 auto;
			width: 300px;
			.reason {
				margin-bottom: 15px;
				input {
					width: 200px;
					height: 40px;
					text-indent: 10px;
					display: inline-block;
					border: none;
				}
				textarea {
					width: 200px;
					height: 100px;
					text-indent: 10px;
					resize: none;
					border: none;
					vertical-align: top;
				}
			}
		}
	}
</style>