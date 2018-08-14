<template>
	<win :width="801" :height="513" @winEvent="winEvent" :ok="{content: '保存'}">
		<span slot="title">调整积分</span>
		<div class="intergral_content" slot="content">
			<section class="intergral_num">
				<span>积分变动量</span>
				<input maxlength="5" type="text" @input="changePoint" placeholder="请输入积分">
				<button @click="()=>{isAdd=true}" :class="isAdd?'add_cor':''" class="plus">增加</button>
				<button @click="()=>{isAdd=false}" :class="!isAdd?'add_cor':''" class="plus">减少</button>
			</section>
			<section class="intergral_reason">
				<span>原因</span>
				<textarea v-model.trim="remark" placeholder="请输入变动原因" maxlength="30"></textarea>
				<p>
					<i class="i_icon"></i>最佳十个字，最多30个字，在积分详情显示</p>
			</section>
			<section class="intergral_operate">
				<span>操作</span>
				<p>
					<span>{{pointData.point}}&nbsp;{{isAdd?'+':'-'}}&nbsp;{{point}}&nbsp;=&nbsp;{{results}}&nbsp;</span>
					<span>
						<i class="i_icon"></i>在原有积分上增加或减少</span>
				</p>
			</section>
			<section class="intergral_remarks">
				<span>备注</span>
				<textarea placeholder="操作积分备注" maxlength="30"></textarea>
			</section>
			<section class="intergral_sms fl">
				<span>短信提醒</span>
				<on-off :key='1' :status="isOpen" @statusChange="openModel"></on-off>
				<span @click="usingSmsTemplates">使用短信模板</span>
				<textarea v-model.trim="msg" maxlength="150" placeholder="短信提醒编辑"></textarea>
			</section>
		</div>
	</win>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			isAdd: false,
			point: 0,
			result: '',
			isOpen: true,
			msg: '',
			remark: '',
			type: '',
			userData: storage.session('userShop'),
			msgTemplate: ''
		};
	},
	computed: {
		results() {
			if (!this.isAdd) {
				if (this.pointData.point - this.point <= 0) {
					return 0;
				} else {
					return this.pointData.point - this.point;
				}
			} else {
				return this.pointData.point - 0 + this.point;
			}
		}
	},
	props: ['pointData'],
	methods: {
		changePoint(e) {
			let a = e.target.value.replace(/[^\d]/g, '');
			e.target.value = a;
			this.point = Number(a);
		},
		openModel(val) {
			this.isOpen = val;
		},
		winEvent(str) {
			if (str == 'ok') {
				this.editIntergral();
			} else {
				this.$emit('adjustInter');
			}
		},
		usingSmsTemplates() {
			// 使用短信模版
			if (this.isOpen == '1') {
				this.msgTemplate = String('尊敬的' + this.pointData.name + '用户您好，由于' + (this.pointData.behavior || '') + '原因，您的积分由' +
					this.pointData.point + '变动至' + this.results + '敬请谅解。如有问题请致电：' + this.userData.currentShop.telephone);
			} else {
				this.msgTemplate = String('尊敬的' + this.pointData.name + '用户您好，由于' + (this.pointData.behavior || '') + '原因，您的余额由' +
					this.pointData.point + '变动至' + this.results + '敬请谅解。如有问题请致电：' + this.userData.currentShop.telephone);
			}

			this.msg = this.msgTemplate;
		},
		async editIntergral() {
			await http.compelUpdatePointAndBalance({
				data: {
					fansId: this.pointData.id,
					memberId: this.pointData.memberId,
					msg: this.msg || '',
					msgStatus: Number(this.isOpen),
					point: this.point,
					remark: this.remark || '',
					type: this.isAdd ? '10' : '11'
				}
			});
			this.$store.commit('setWin', {
				content: '修改成功',
				winType: 'alert',
				time: 1000,
			});
			this.$emit('adjustInter', {
				id: this.pointData.id,
				point: this.results
			});
		},
	},
	mounted() {
		if (this.pointData.memberId > '0') {
			this.pointData.point = this.pointData.memberPoint;
		}
	},
	components: {
		'win': () =>
			import ( /* webpackChunkName: 'win' */ 'src/components/win'),
		'on-off': () =>
			import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
	}
};
</script>
<style lang="less" scoped>
	.intergral_content {
		padding: 20px 0 0 34px;
		.intergral_num {
			margin-bottom: 19px;
			span {
				font-size: 16px;
				color: RGB(67, 65, 74);
				margin-right: 24px;
			}
			input {
				width: 216px;
				height: 41px;
				padding: 0 17px;
				border: 1px solid RGB(210, 210, 210);
				margin-right: 20px;
			}
			button {
				width: 101px;
				height: 41px;
				font-size: 16px;
				line-height: 40px;
			}
			.plus {
				border: 1px solid RGB(210, 210, 210);
				color: RGB(67, 65, 74);
				background: #fff;
				margin-right: 14px;
			}
			.add_cor {
				border: 1px solid RGB(247, 147, 30);
				background: #fde5c9;
				color: RGB(247, 147, 30);
			}
		}
		.intergral_reason {
			margin-bottom: 19px;
			span {
				font-size: 16px;
				color: RGB(67, 65, 74);
				margin-left: 48px;
				margin-right: 24px;
			}
			textarea {
				width: 460px;
				height: 67px;
				padding: 6px 17px;
				border: 1px solid RGB(210, 210, 210);
			}
			p {
				font-size: 14px;
				color: RGB(165, 165, 165);
				margin: 7px 0 7px 108px;
				display: flex;
				align-items: center;
				i {
					margin-right: 5px;
					margin-top: -2px;
				}
			}
		}
		.intergral_operate {
			margin-bottom: 19px;
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			&>span {
				font-size: 16px;
				color: RGB(67, 65, 74);
				margin-left: 51px;
				margin-right: 24px;
			}
			&>p {
				display: flex;
				align-items: center;
				span:nth-child(1) {
					color: RGB(67, 65, 74);
					font-size: 16px;
					text-align: left;
					margin-left: 0px;
				}
				span:nth-child(2) {
					display: flex;
					align-items: center;
					color: RGB(165, 165, 165);
					font-size: 16px;
					text-align: left;
					margin-left: 5px;
				}
			}
		}
		.intergral_remarks {
			margin-bottom: 19px;
			&>span {
				font-size: 16px;
				color: RGB(67, 65, 74);
				margin-left: 51px;
				margin-right: 24px;
			}
			textarea {
				width: 452px;
				height: 66px;
				border: 1px solid RGB(210, 210, 210);
				padding: 7px 17px;
			}
		}
		.intergral_sms {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			span:nth-child(1) {
				font-size: 16px;
				color: RGB(67, 65, 74);
				margin-left: 20px;
				margin-right: 24px;
			}
			span:nth-child(3) {
				font-size: 14px;
				color: RGB(247, 147, 30);
				text-decoration: underline;
				margin-left: 14px;
			}
			textarea {
				display: block;
				width: 452px;
				height: 126px;
				border: 1px solid RGB(210, 210, 210);
				margin-left: 110px;
				margin-top: 12px;
			}
		}
		.i_icon {
			display: inline-block;
			width: 17px;
			height: 18px;
			background: url("../../res/images/handle-tips.png")center no-repeat;
		}
	}
</style>