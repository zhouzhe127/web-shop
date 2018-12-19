<!--
    **消费统计修改弹窗
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='591' :height='426' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">修改</span>
		<div id="tan" slot="content" v-cloak>
			<div class="mobilePhone">
				<div class="clearfix handle-box">
					<div class="fl handle-tips">
						<i></i>
						修改后，会同步更改用户积分与导购获得金币
					</div>
				</div>
				<!-- 原消费金额 -->
				<div class="online-box clearfix">
					<span class="online-sub fl">原消费金额</span>
					<div class="rightHalf">
						<span class="obj">{{beforeAmount}}元</span>
					</div>
				</div>
				<!-- 修改至 -->
				<div class="online-box clearfix">
					<span class="online-sub fl required">修改至</span>
					<div class="rightHalf">
						<el-input class='fl' placeholder="请输入金额" v-model="amount" maxlength="6" onkeyup="value=value.replace(/[^\d.]/g,'')" style="width:179px;" @input="handleClick">
							<template slot="suffix">元</template>
						</el-input>
					</div>
				</div>
				<!-- 用户 -->
				<div class="online-box clearfix">
					<span class="online-sub fl required">用户</span>
					<div class="rightHalf">
						<span class="add subtract">{{subtracted}}</span>
						<el-input class="fl" placeholder="请输入内容" v-model="point" :disabled="false" style="width:100px;margin-right: 10px;">
						</el-input>
						<span class="add">积分</span>
					</div>
				</div>
				<!-- 导购 -->
				<div class="online-box clearfix">
					<span class="online-sub fl required">导购</span>
					<div class="rightHalf">
						<span class="add subtract">{{subtracted}}</span>
						<el-input class="fl" placeholder="请输入内容" v-model="cash" :disabled="false" style="width:100px;margin-right: 10px;">
						</el-input>
						<span class="add">金币</span>
					</div>
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
			amount: '', //金额
			point: '',
			cash: '',
			subtracted: '增加',
			httpStatus: false
		};
	},
	props: {
		beforeAmount: String, //原来的价格
		sellHandId: String, //单个统计的id
		cmpareStatus: Boolean
	},
	watch: {
		'amount': function() {
			if (Number(this.amount) > this.beforeAmount) {
				this.subtracted = '增加';
			} else {
				this.subtracted = '减少';
			}
		}
	},
	methods: {
		async getAppliedWin(res) {
			if (res == 'ok') {
				if (this.httpStatus) {
					this.errorShow(`请勿重复点击!`);
					return false;
				}
				await this.consumeVerifyModify();
			}
			this.$emit('getAppliedWin', res);
		},
		async consumeVerifyCalculation() { //动态计算价格
			let res = await http.consumeVerifyCalculation({
				data: {
					originalPrice: this.beforeAmount, //原价格
					modifyPrice: this.amount,
					// isGuide: Number(this.cmpareStatus) //0 奖励客户的专属顾问 1扫码人员
				}
			});
			if (res) {
				this.point = res.point;
				this.cash = res.coins;
			}
		},
		handleClick: function() {
			this.consumeVerifyCalculation();
		},
		async consumeVerifyModify() { //确认修改
			this.httpStatus = true;
			let res = null;
			try {
				await http.consumeVerifyModify({
					data: {
						id: this.sellHandId,
						modifyPrice: this.amount, //修改后的金额
						point: this.point, //修改后的积分
						coins: this.cash, //修改后的金币
						return: 0
					}
				}, true);
			} catch (e) {
				this.httpStatus = false;
				this.errorShow(e.error.message);
				return false;
			}
			if (res) {
				this.httpStatus = false;
				this.errorShow(`该记录已经调整至${this.amount}元,用户积分与导购金币已同步调整,望知晓!`);
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
.mobilePhone {
	width: 100%;
	height: 100%;
	padding: 20px 0 0 0;
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

.mobilePhone .online-box .rightHalf .subtract {
	color: #fd2400;
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