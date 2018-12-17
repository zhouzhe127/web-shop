<!--
    **消费统计退回弹窗
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='200' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">退回</span>
		<div id="tan" slot="content" v-cloak>
			<div class="mobilePhone">
				<div class="text">
					<span>退回后，会同步扣除用户积分与导购获得金币!确认退回吗？</span>
				</div>
			</div>
		</div>
	</Win>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import { mixin } from './mixin.js';

export default {
	mixins: [mixin],
	data() {
		return {
			title: '',
			okStyle: null,
			cancelStyle: null,
		};
	},
	props: {
		sellHandId: String //单个统计的id
	},
	methods: {
		async getAppliedWin(res) {
			if (res == 'ok') {
				await this.consumeVerifyModify();
			}
			this.$emit('getBackAppliedWin', res);
		},
		async consumeVerifyModify() {
			let res = await http.consumeVerifyModify({
				data: {
					id: this.sellHandId,
					return: 1
				}
			});
			if (res) {
				this.errorShow('该消费已退回，用户积分与导购金币已同步调整,望知晓!');
			}
		}
	},
	components: {
		Win: () =>
			import( /* webpackChunkName:'win' */ 'src/components/win')
	},
	mounted() {
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

.mobilePhone {
	width: 100%;
	height: 100%;
	padding: 20px 0 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.mobilePhone .text span {
	display: inline-block;
	font-size: 16px;
}

.mobilePhone .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

.mobilePhone .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

.mobilePhone .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

.mobilePhone .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

.mobilePhone .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

.mobilePhone .online-box .rightHalf {
	max-width: 600px;
	height: auto;
	float: left;
	line-height: 40px;
}

.mobilePhone .online-box .rightHalf .obj {
	display: inline-block;
	width: 179px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
}

.mobilePhone .online-box .rightHalf .add {
	font-size: 16px;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	float: left;
	margin-right: 10px;
	color: #333;
}

.handle-box {
	padding-left: 60px;
	margin-bottom: 20px;
	background-color: #f8f8f8;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	color: #999999;
}
</style>