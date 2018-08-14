<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'center'" :width="400" :height="100">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="codeBox">
					<span class="fl">商品劵码</span>
					<input type="text" class="fl" v-model="code" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"
					    placeholder="请输入商品劵码" />
				</div>
			</div>
		</win>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				title: '验证商品券码',
				code: ''
			};
		},
		methods: {
			getWinClickResult(res) {
				this.code = this.code.replace(/(^\s*)|(\s*$)/g, '');
				if (this.code == '' && res == 'ok') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请输入商品券码'
					});
					return false;
				}
				this.$emit('getWin', res, this.code);
			},

		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		},
	};
</script>

<style lang="less" scoped>
	#tan {
		width: 400px;
		height: 90px;
		overflow: hidden;
		.codeBox {
			margin: 20px auto;
			height: 45px;
			line-height: 45px;
			width: 300px;
			span,
			input {
				display: inline-block;
				height: 45px;
			}
			span {
				width: 90px;
				text-align: center;
			}
			input {
				outline: none;
				padding: 0;
				padding-left: 10px;
				width: 190px;
				box-sizing: border-box;
			}
		}
	}
</style>