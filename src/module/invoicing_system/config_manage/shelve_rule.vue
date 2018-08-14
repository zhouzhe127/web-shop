/** * @file * * 销售规则 * * @author zhengu.jiang */

<template>
	<div id="deploy-content">
		<div class="deploy-font">
			货架商品销售配置
		</div>
		<ul class="rule" @click="clickItem">
			<li :class="{active:currentChoose==0}">货架商品不足时，不可以销售该商品</li>
			<li :class="{active:currentChoose==1}">货架商品不足时，可以销售该商品
				<i>销售后货架商品数量为负数，下次上架后补充完整</i>
			</li>
		</ul>
		<div class="btn" @click="save">保存</div>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				currentChoose: null,
				shopId: null
			};
		},
		methods: {
			async getShelveRule() {
				let res = await http.getShelveRule({
					data: {
						shopId: this.shopId
					}
				});
				this.currentChoose = res;
			},
			clickItem() {
				this.currentChoose = (this.currentChoose == null || this.currentChoose == '0') ? '1' : '0';
			},
			save() {
				http.editShelveRule({
					data: {
						shopId: this.shopId,
						isShelveMinus: this.currentChoose
					}
				}).then(() => {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '修改成功'
					});
				});
			}
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getShelveRule();
		}
	};
</script>

<style lang="less" scoped>
	#deploy-content {
		width: 80%;
		height: 200px;
		float: left;
		padding: 30px 0;
		.deploy-font {
			vertical-align: top;
			display: inline-block;
			padding: 0 30px;
			line-height: 30px;
		}
		.btn {
			width: 200px;
			height: 40px;
			background: #FF9800;
			margin-top: 20px;
			text-align: center;
			line-height: 40px;
			cursor: pointer;
			margin-left: 175px;
		}
		.rule {
			display: inline-block;
			width: 60%;
			height: 60px;
			.active {
				border: 1px solid #FF9800;
				background: #FFE69F;
				color: #FF9800;

			}
			li {
				width: 260px;
				height: 30px;
				position: relative;
				line-height: 30px;
				margin-bottom: 5px;
				text-align: center;
				border: 1px solid #ccc;
				cursor: pointer;
				i {
					width: 500px;
					position: absolute;
					left: 80%;
					top: 0;
					color: #ccc;
				}
			}
		}
	}
</style>