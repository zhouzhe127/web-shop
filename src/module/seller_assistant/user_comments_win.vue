<!--
	**用户提现
	*
	* 
	* *miaochuan.sha
	*
-->
<template>
	<Win :width='591' :height='460' @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">处理申请</span>
		<div id="tan" slot="content" v-cloak>
			<!-- 疯抢开关 -->
			<div class="online-box clearfix">
				<span class="online-sub fl">提现结果</span>
				<!--下拉框组件-->
				<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
			</div>
			<!-- 付款直扣 -->
			<div class="online-box clearfix" v-if="expirationTimeId == '1'">
				<span class="online-sub fl">付款方式</span>
				<!--下拉框组件-->
				<singleSelect :index='result' @selOn='haveIndex' :styles="{border: '1px solid #cecdcd',marginRight:'8px',width:'100px'}" :list="list" :name="'name'" :key='"id"'></singleSelect>
			</div>
			<!-- 重要提示 -->
			<div class="online-box clearfix" style="margin-bottom:0px;">
				<span class="online-sub fl">审核批注</span>
				<textarea class="txt fl" placeholder="请输入重要提示" maxlength="50" v-model="mark"></textarea>
			</div>
			<div class="online-box clearfix" style="margin-bottom:0px;">
				<span class="online-sub fl"></span>
				<div class="fl handle-tips">
					<i></i> 限50字
				</div>
			</div>
			<!-- 重要提示 -->
			<div class="online-box clearfix" style="margin-bottom:0px;">
				<span class="online-sub fl">通知内容</span>
				<textarea class="txt fl" placeholder="请输入重要提示" maxlength="50" v-model="importantNote"></textarea>
			</div>
			<div class="online-box clearfix" style="margin-bottom: 25px;">
				<span class="online-sub fl"></span>
				<div class="fl handle-tips">
					<i></i> 限50字,通知内容推送至人员微信
				</div>
			</div>
		</div>
	</Win>
</template>
<script>
import http from 'src/manager/http';

export default {
	data() {
		return {
			expirationTimeList: [{
				//过期时间
				name: '通过',
				id: 1
			},
			{
				name: '驳回',
				id: 2
			}
			],
			expirationTimeId: '1',
			expirationTime: '通过', //状态
			mark: '', //批注
			importantNote: '', //通知内容
			result: 0,
			list: [{
				name: '付款',
				id: 0
			},
			{
				name: '直扣',
				id: 1
			}
			]
		};
	},
	props: {
		detail: Object
	},
	methods: {
		haveIndex(i) {
			this.result = i;
		},
		async getAppliedWin(res) {
			if (res == 'ok') {
				await this.updateInfo();
			}
			this.$emit('getAppliedWin', res);
		},
		selexpirationTime: function(i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		async updateInfo() {
			let status = '';
			if (this.expirationTimeId == '1') {
				if (this.result == 0) {
					status = 3;
				} else if (this.result == 1) {
					status = 1;
				}
			} else if (this.expirationTimeId == '2') {
				status = 2;
			}
			//更新提现申请
			let data = await http.chashmentEdit({
				data: {
					id: this.detail.id,
					fansId: this.detail.fansId,
					mark: this.mark, //批注
					content: this.importantNote, //通知内容
					status: status //状态
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: '处理申请成功',
					winType: 'alert',
					title: '操作提示'
				});
			}
		}
	},
	components: {
		Win: () =>
		import ( /* webpackChunkName:'win' */ 'src/components/win'),
		selectBtn: () =>
		import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		singleSelect: () =>
		import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select')
	},
};
</script>
<style scoped>
#tan {
	padding-top: 35px;
}

#tan .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#tan .online-box .online-sub {
	display: block;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#tan .online-box .txt {
	width: 343px;
	height: 121px;
	padding: 14px;
	resize: none;
	border: 1px solid #cecdcd;
	outline: none;
}

#tan .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url('../../../src/res/images/prompt.png') 0 center no-repeat;
	color: #999999;
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