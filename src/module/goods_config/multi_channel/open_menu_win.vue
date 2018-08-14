<!--
		多渠道开启
		胡江
-->
<template>
	<win :align="'center'" :width="600" :height="200" @winEvent="closeSelfWin">
		<span slot="title">提示</span>
		<section id="channel_switch" slot="content">
			<div class="oBox" style="margin-top: 30px;">
				<h3 style="">渠道名称：</h3>
				<h3 style="width:60%;text-align: left;">{{obj.name}}</h3>
			</div>
			<div class="oBox">
				<h3 style="">渠道状态：</h3>
				<div style="float: left;">
					<section v-on:click="openBtn(1)" :class="{'play':true,'click': obj.status == 1}">开启</section>
					<section v-on:click="openBtn(0)" :class="{'play':true,'click': (obj.status == 0 || obj.status == -1)}">关闭</section>
				</div>
			</div>
		</section>
	</win>
</template>
<script>
/*
					1)status:-1表示未开通,0:表示关闭,1:表示开启,不能从其他状态变为'未开通'
			*/
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			obj: {}, //传递的数据
			copyObj: null //obj副本
		};
	},
	props: {
		pObj: null
	},
	created() {
		this.initData();
	},
	methods: {
		//初始化
		initData() {
			if (this.pObj) {
				this.obj = utils.deepCopy(this.pObj);
				this.copyObj = utils.deepCopy(this.pObj);
			}
		},
		//获取本弹窗的结果
		closeSelfWin(res) {
			if (res == 'ok') {
				if (this.obj.status == -1) {
					this.obj.status = 0;
				}
				if (this.obj.status == this.copyObj.status) {
					this.$emit('throwChannelWin', 'close');
				} else if (this.copyObj.status == -1) {
					this.ChannelCreate().then(() => {
						this.$emit('throwChannelWin', 'update');
					});
				} else {
					this.ChannelEdit().then(() => {
						this.$emit('throwChannelWin', 'update');
					});
				}
			} else {
				this.$emit('throwChannelWin', 'close');
			}
		},
		//开启
		openBtn(flag) {
			this.obj.status = flag;
		},
		//当status不为-1时调用
		async ChannelEdit() {
			let res = await http.ChannelEdit({
				data: {
					id: this.obj.id,
					status: this.obj.status
				}
			});
			return res;
		},
		//当status=-1时调用
		async ChannelCreate() {
			await http.ChannelCreate({
				data: {
					id: this.obj.id,
					status: this.obj.status
				}
			});
		}
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win')
	}
};
</script>
<style scoped lang="less">
#channel_switch {
	.oBox {
		width: 100%;
		height: 60px;
		h3 {
			width: 40%;
			height: 40px;
			font-size: 16px;
			line-height: 40px;
			text-align: right;
			float: left;
			padding-right: 20px;
		}
		.play {
			width: 100px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border: 1px solid #919191;
			cursor: pointer;
			float: left;
			background-color: #fefefe;
			color: #919191;
			margin-right: 15px;
		}
		.click {
			border: 1px solid #ff9801;
			color: #ff9801;
			background-color: #fff1e4;
		}
	}
}
</style>