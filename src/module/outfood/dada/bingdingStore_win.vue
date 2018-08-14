<template>
	<Win :width='597' :height='206' @winEvent='getStoreWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">绑定门店</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 门店编号 -->
			<div class="online-box clearfix">
				<span class="online-sub fl required">门店编号</span>
				<input type="text" name="" class="inp" placeholder="请输入门店编号" v-model="createShopNumber" maxlength="30">
			</div>
			<div class="tip">
				<img src="../../../res/icon/warning.png">
				<span>若该门店已经在达达平台创建,在此输入门店编号,进行门店关联!请勿重复绑定操作,再次绑定会更新该门店配置!</span>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '取消',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
			createShopNumber: '' //门店编号
		};
	},
	methods: {
		async getStoreWin(res) {
			if (res == 'ok') {
				if (this.createShopNumber.length <= 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '保存成功！'
					});
					return false;
				}
				await this.bindShopCoding();
			}
			this.$emit('getStoreWin', res);
		},
		async bindShopCoding() {
			let data = await http.bindShopCoding({
				data: {
					shopCoding: this.createShopNumber
				}
			});
			if (data == true) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '绑定门店成功'
				});
			} else {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: `${data}`
				});
				return false;
			}
		}
	},
	components: {
		Win: () => import(/* webpackChunkName:'win' */ 'src/components/win')
	},
};
</script>
<style scoped>
#tan {
	padding: 60px;
}
#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}
#tan .online-box .inp {
	width: 208px;
	height: 40px;
	text-indent: 10px;
}
#tan .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}
#tan .tip img {
	display: inline-block;
	width: 15px;
	height: 15px;
	border-radius: 50%;
}
#tan .tip span {
	font-size: 14px;
	color: #a5a5a5;
	line-height: 20px;
}
#tan .clearfix::before,
#tan .clearfix::after {
	display: table;
	content: “”;
}
#tan .clearfix::after {
	clear: both;
}
</style>