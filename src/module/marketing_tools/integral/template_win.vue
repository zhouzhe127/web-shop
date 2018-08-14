<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'center'" :width="960" :height="600" :ok="okStyle">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="setaffiche">
					<div class="style-template fl">
						<div class="template-title" :class="styleType == 0 ? 'template-checkOn' : 'template-checkOff'" @click="setCheckType('0')">简介商务</div>
						<img src="../../../res/images/style-template02.png" alt="模版图片2" />
					</div>
					<div class="style-template fl" style="margin-left: 110px;">
						<div class="template-title" :class="styleType == 1 ? 'template-checkOn' : 'template-checkOff'" @click="setCheckType('1')">暖色通用</div>
						<img src="../../../res/images/style-template01.png" alt="模版图片1" />
					</div>
				</div>
			</div>
		</win>
	</div>

</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: '选择模板',
				styleType: 0, // 0为简洁商务 1为暖色通用
				okStyle: null
			};
		},
		props: ['shopId'],
		mounted() {
			this.getWechatConfig();
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
		},
		methods: {
			setCheckType: function (type) {
				// 设置使用模版类型
				this.styleType = type;
			},
			//获取数据
			async getWechatConfig() {
				let res = await http.getWechatConfig({
					data: {
						shopId: this.shopId
					}
				});
				this.styleType = res.pointStyle;
			},
			//选择模板更新数据
			async updateConfig() {
				await http.updateConfig({
					data: {
						shopId: this.shopId,
						type: 0,
						pointStyle: this.styleType
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存模版成功'
				});
			},
			getWinClickResult(res) {
				if (res == 'ok') {
					this.updateConfig();
				}
				this.$emit('getTemplate', res);
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
		.setaffiche {
			margin: 40px 165px;
			.style-template {
				width: 250px;
				height: auto;
				overflow: hidden;
				.template-title {
					text-indent: 30px;
					width: 150px;
					height: 30px;
					line-height: 30px;
					margin-bottom: 30px;
					cursor: pointer;
				}
				.template-checkOn {
					background: url(../../../res/images/checkbox-on.png) left center no-repeat;
					background-size: 20px 20px;
				}
				.template-checkOff {
					background: url(../../../res/images/checkbox-off.png) left center no-repeat;
					background-size: 20px 20px;
				}
			}
		}
	}
</style>