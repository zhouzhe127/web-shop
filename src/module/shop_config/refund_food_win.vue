<!--
	**退菜原因一级弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="500" :height="300">
		<!--标题-->
		<span slot="title">{{title}}</span>
		<!--内容-->
		<div slot="content">
			<section id="editInfomation">
				<div class="popupList">
					<h3 class="popupListBefore">{{title}}</h3>
					<input type="text" v-model="refundName" class="input" maxlength="15" placeholder="请输入退菜原因" />
				</div>
				<div class="popupList">
					<h3 class="popupListBefore">排序</h3>
					<subadd :bindnum="num" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>
				</div>
			</section>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: this.isAdd ? '新建退菜原因' : '修改退菜原因',
			num: 1, //排序
			refundName: '', //退菜原因名称
			patrn: /^[0-9]*$/
		};
	},
	props: {
		isAdd: null,
		refundReasonId: '',
		userData: Object
	},
	mounted() {
		if (!this.isAdd) {
			this.getReason();
		}
	},
	methods: {
		//排序
		change(res) {
			this.num = res;
		},
		//获取退菜原因详情
		async getReason() {
			let res = await http.getReasonBy({
				data: {
					shopId: this.userData.currentShop.id,
					rid: this.refundReasonId
				}
			});
			if (res) {
				this.refundName = res.reasonName;
				this.num = res.sort;
			}
		},
		//增加退菜原因
		async addReason() {
			let res = await http.addReason({
				data: {
					shopId: this.userData.currentShop.id,
					createUid: this.userData.user.id,
					reasonName: this.refundName,
					sort: this.num
				}
			});
			if (res) {
				return res;
			}
		},
		//编辑退菜原因
		async editReason() {
			let res = await http.editReason({
				data: {
					rid: this.refundReasonId, //退菜原因id
					shopId: this.userData.currentShop.id, //店铺id
					updateUid: this.userData.user.id, //修改者id
					reasonName: this.refundName, //退菜原因名称
					sort: this.num //排序
				}
			});
			if (res) {
				return res;
			}
		},
		clickResult(res) {
			if (res == 'ok') {
				if (this.refundName.trim() == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '退菜原因不能为空，请重新填写'
					});
					return false;
				}
				if (this.patrn.test(this.refundName.trim())) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '退菜原因不能为纯数字，请重新填写'
					});
					return false;
				}
				if (this.isAdd) {
					this.addReason().then(data => {
						this.$emit('throwWinResult', res, data); //抛出一个事件给父组件
					});
				} else {
					this.editReason().then(data => {
						this.$emit('throwWinResult', res, data);
					});
				}
			} else {
				this.$emit('throwWinResult', res);
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		subadd: () =>
			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd')
	}
};
</script>
<style lang="less" scoped>
#editInfomation {
	background: #eee;
	width: 100%;
	height: 300px;
	padding-top: 20px;
	.popupList {
		height: 50px;
		padding-left: 20px;
		margin-top: 20px;
		.popupListBefore {
			width: 120px;
			height: 40px;
			line-height: 40px;
			float: left;
			text-align: right;
			margin-right: 15px;
			&:after {
				content: '*';
				color: red;
				position: relative;
				top: 3px;
				right: -1px;
			}
		}
		.input {
			border: 1px solid deepskyblue;
		}
	}
}
</style>
