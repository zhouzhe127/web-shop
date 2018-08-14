<!--
	**模板设置
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="msnmodel">
		<div class="concent" v-for="(item,i) in list" @click="openWindow(item,i)" :key="i">
			<div class="con-title">
				{{item.name}}
			</div>
			<div class="con-num">
				{{i+1}}
			</div>
			<div class="con-border-yellow" v-if="checkList(item.type)">

			</div>
			<div class="con-border-gray" v-else>

			</div>
			<div class="static">
				<img src="../../res/icon/start.png" v-if="checkList(item.type)" />
				<img src="../../res/icon/end.png" v-else />
			</div>
			<div class="con-yellow" v-if="checkList(item.type)">
				查看/编辑
			</div>
			<div class="con-gray" v-else>
				查看/编辑
			</div>
		</div>
		<module-win v-if="showWin" @throwWinResult="doThrowWinResult" :item="item" :index="index" :userData="userData" :optionsList="optionsList" :list="list" :infoList="infoList"></module-win>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			list: [], //模板列表
			infoList: {}, //弹窗输入框获取的数据
			remind: Object, //温馨提示与内容实例
			optionsList: [], //弹窗里面的下拉列表
			success: false,
			userData: Object,
			showWin: false,
			item: Object, //详细信息
			index: '' //索引
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.getTemplateList();
		this.getList();
	},
	methods: {
		//获取标题列表
		async getTemplateList() {
			let res = await http.getTemplateList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.optionsList = res.template_list;
			}
			this.success = true;
		},
		//获取模板列表
		async getList() {
			let res = await http.ActivityTemplateGetList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.list = res.template ? res.template : []; //模版列表
				this.infoList = res.list ? res.list : {}; //弹框输入框获取的数据
				this.remind = res.Remind ? res.Remind : []; //温馨提示的数据
			}
		},
		//若获取标题列表未成功,打开弹窗时会再次获取
		openWindow(item, index) {
			if (this.success) {
				this.item = item;
				this.index = index;
				this.showWin = true;
			} else {
				this.getTemplateList();
			}
		},
		checkList(type) {
			let bol = false;
			let ky = null;
			// 	for (let i = 0; i < this.infoList.length; i++) {
			// 		if (this.infoList[i].type == type) {
			// 			if (this.infoList[i].key && this.infoList[i].key != null && this.infoList[i].key != undefined && this.infoList[i]
			// 				.key != '') {
			// 				bol = true;
			// 			ky = this.infoList[i].key;
			// 		}
			// 	}
			// }
			for (let key in this.infoList) {
				if (this.infoList[key].type == type) {
					if (
						this.infoList[key].key &&
						this.infoList[key].key != null &&
						this.infoList[key].key != undefined &&
						this.infoList[key].key != ''
					) {
						bol = true;
						ky = this.infoList[key].key;
					}
				}
			}
			if (bol) {
				let bool = false;
				for (let i = 0; i < this.optionsList.length; i++) {
					if (this.optionsList[i].template_id == ky) {
						bool = true;
					}
				}
				if (bool) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		},
		//弹窗返回
		doThrowWinResult(res) {
			if (res == 'ok') {
				this.showWin = false;
				this.getTemplateList();
				this.getList();
			} else {
				this.showWin = false;
			}
		}
	},
	components: {
		moduleWin: () =>
			import(/*webpackChunkName: 'module_set_win'*/ './module_set_win')
	}
};
</script>

	<style lang="less" scoped>
#msnmodel .concent {
	width: 300px;
	height: 170px;
	background-color: #eeeeee;
	line-height: 60px;
	text-align: center;
	position: relative;
	cursor: pointer;
	float: left;
	margin-right: 10px;
	margin-top: 14px;
	.con-title {
		width: 200px;
		height: 60px;
		text-align: left;
		text-indent: 10px;
		float: left;
		color: #636162;
		font-size: 20px;
		overflow: hidden;
		/*自动隐藏文字*/
		text-overflow: ellipsis;
		/*文字隐藏后添加省略号*/
		white-space: nowrap;
		/*强制不换行*/
	}
	.con-num,
	.static {
		width: 100px;
		float: right;
		font-size: 48px;
		color: #dedede;
	}
	.con-border-yellow,
	.con-border-gray {
		width: 2px;
		height: 60px;
		background-color: #f8931f;
		position: absolute;
		top: 0;
		left: -2px;
	}
	.static img {
		float: right;
		width: 120px;
		height: 60px;
		margin-right: 40px;
	}
	.con-gray,
	.con-yellow {
		width: 300px;
		height: 40px;
		position: absolute;
		left: 0;
		background-color: #f8931f;
		bottom: 0px;
		line-height: 40px;
		color: #ffffff;
	}
	.con-border-gray,
	.con-gray {
		background-color: #dddddd;
	}
}
</style>