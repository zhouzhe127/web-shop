<!--
	**快销模式弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<win @winEvent="clickResult" :align="'center'" :width="480" :height="'auto'">
			<!--标题-->
			<span slot="title">{{title}}</span>
			<!--内容-->
			<div slot="content" style="background-color: #F2F2F2">
				<div class="jobWin" id="jobWin">
					<h2 class="required tag">文字桌牌号名称</h2>
					<div class="mes">
						<el-input v-model="info.name" placeholder="请输入文字桌牌号名称" style="width:180px" maxlength="7"></el-input>
						<!--<input type="text" class="input" maxlength="7" style="width: 100%; " v-model="info.name" placeholder="请输入文字桌牌号名称">-->
					</div>
					<div class="clear"></div>
					<h2 class="required tag">排序</h2>
					<div class="mes">
						<el-input-number v-model="info.sort" :min="1" :max="255" label="描述文字"></el-input-number>
						<!--<subadd :bindnum="info.sort" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>-->
					</div>
					<div class="clear"></div>
				</div>
			</div>
		</win>
	</div>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			title: '',
			info: {} //详细信息
		};
	},
	props: {
		isAdd: null,
		itemInfo: {}
	},
	mounted() {
		if (this.isAdd) {
			this.title = '添加文字桌牌号';
			this.info = {
				name: '',
				sort: '1'
			};
		} else {
			this.info = utils.deepCopy(this.itemInfo);
			this.title = '编辑文字桌牌号';
		}
	},
	methods: {
		//排序组件返回
		//		change(res) {
		//			this.info.sort = res;
		//		},
		//添加
		async add(backRes) {
			let res = await http.addTablecard({
				data: { name: this.info.name, sort: this.info.sort }
			});
			if (res) {
				this.$emit('throwWinResult', backRes, res); //抛出一个事件给父组件
			}
		},
		//编辑
		async edit(backRes) {
			let res = await http.editTablecard({
				data: {
					id: this.info.id,
					name: this.info.name,
					sort: this.info.sort
				}
			});
			if (res) {
				this.$emit('throwWinResult', backRes, res); //抛出一个事件给父组件
			}
		},
		clickResult(res) {
			if (res == 'ok') {
				if (this.info.name.trim() == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '文字桌牌号名称不能为空'
					});
					return false;
				}
				if (this.isAdd) {
					this.add(res);
				} else {
					this.edit(res);
				}
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
		//		subadd: () =>
		//			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd')
	}
};
</script>

<style lang="less"  scoped>
.jobWin {
	width: 480px;
	height: auto;
	min-height: 250px;
	padding-top: 20px;
	background-color: #f2f2f2;
	.tag {
		float: left;
		width: 120px;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}
	.mes {
		float: left;
		width: 300px;
		padding-left: 15px;
		text-indent: 0;
		line-height: 0;
	}
	.clear {
		clear: both;
		font-size: 0;
		line-height: 0;
		height: 15px;
		width: 100%;
	}
}
</style>
