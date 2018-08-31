<!--
	**退菜原因
	*
	* 胡江
	* *
	*
-->
<template>
	<section class="return_be">
		<section class="return_one">
			<div v-on:click="addReason" class="btn-concent">
				<button class="increase">添加</button>
			</div>
		</section>
		<section class="return_two">
			<section class="totle">
				<ul class="oUl oulFirst">
					<li>操作</li>
					<li>排序</li>
					<li>退菜原因</li>
				</ul>
				<ul v-if="refundFood.length == 0" class="ul-null">
					<li>暂时无退菜</li>
				</ul>
				<ul class="oUl oulSecond" v-else v-for="(print,index) in refundFood" :key="index">
					<li style="cursor: pointer;">
						<span v-if="print.isDefined==1">
							<span style="color: #FE8D2C;" @click="editInfo(index,print)">编辑</span>
							<span style="padding:0 20px;color: #D2D2D2;">|</span>
							<span style="color: #FD3F1F;" @click="deleteRefundBtn(index,print)">删除</span>
						</span>
						<!--编辑状态-->
						<span v-else>不可操作</span>
					</li>
					<li>{{print.sort}}</li>
					<li>{{print.reasonName}}</li>
				</ul>
				<ul class="oUl oulFirst">
					<li>操作</li>
					<li>排序</li>
					<li>退菜原因</li>
				</ul>
			</section>
		</section>
		<refund-win v-if="isShow" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :refundReasonId="refundReasonId" :userData="userData">
		</refund-win>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isAdd: true, //添加还是编辑，true为添加
			isShow: false,
			userData: Object,
			refundFood: Array, //退菜理由列表
			refundReasonId: '', //编辑的id
			refundReasonIndex: '' //编辑索引
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		//初始化获得退菜列表
		async init() {
			let res = await http.getReasonList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.refundFood = res;
				this.sortList();
			}
		},
		//增加
		addReason() {
			if (this.refundFood.length >= 10) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '退菜原因添加已满'
				});
				return false;
			}
			this.isAdd = true;
			this.isShow = true;
		},
		//编辑
		editInfo(index, print) {
			this.refundReasonId = print.id;
			this.refundReasonIndex = index;
			this.isAdd = false;
			this.isShow = true;
		},
		//删除
		deleteRefundBtn(index, print) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认要删除吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						http
							.deleteReason({
								data: {
									rid: print.id, //退菜原因id
									shopId: this.userData.currentShop.id
								}
							})
							.then(() => {
								this.refundFood.splice(index, 1);
							});
					}
				}
			});
		},
		doThrowWinResult(res, data) {
			if (res == 'ok') {
				if (this.isAdd) {
					//添加
					this.refundFood.push(data);
				} else {
					//编辑
					this.refundFood.splice(this.refundReasonIndex, 1, data);
				}
				this.sortList();
			}
			this.isShow = false;
		},
		sortList() {
			this.refundFood = utils.sortByAll(
				this.refundFood,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		refundWin: () =>
			import(/*webpackChunkName: "refund_food_win"*/ './refund_food_win')
	}
};
</script>

<style scoped lang="less">
.return_be {
	.return_one {
		margin-bottom: 15px;
		.btn-concent {
			width: 100px;
		}
	}
	.return_two {
		/*width:1024px;*/
		min-width: 780px;
		max-width: 1024px;
		border: 1px solid #d2d2d2;
		margin-top: 20px;
		background-color: #ffffff;
		.oUl {
			width: 100%;
			color: #333333;
			overflow: hidden;
			border-bottom: 3px solid #f7f7f7;
			li {
				width: 33%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				float: left;
			}
		}
		.oulFirst {
			background-color: #f2f2f2;
			color: #434149;
			li {
				font-size: 16px;
			}
		}
		.oulSecond {
			color: #666666;
			/*font-size: 14px;*/
			/*li span span {*/
				/*font-size: 16px;*/
			/*}*/
		}
		.ul-null li {
			display: inline-block;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: orange;
		}
	}
}
</style >

