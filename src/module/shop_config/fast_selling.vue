<!--
	**快销模式管理
	*
	* 胡江
	* *
	*
-->
<template>
	<section style="text-align:left;" id="quicksel">
		<div class="topR">
			<section class="box">
				<label class="commodity-name">当流水号达到</label>
				<input type="text" placeholder="请输入100的整数" v-model="serialNum" />
				<span>重置流水号</span>
			</section>
			<section class="box">
				<label class="commodity-name">桌牌号开关</label>
				<on-off :status="onMenu" @statusChange="getIsDiscountToggle" class="on_off"></on-off>
			</section>
		</div>
		<div v-if="onMenu">
			<section class="box">
				<label class="commodity-name">桌牌号类型</label>
				<div class="div_wai">
					<span class="span_type" :class='numType == 1?"sel_true":"sel_false"' @click="changeType(1)">数字桌牌号</span>
					<span class="span_type" :class='numType == 2?"sel_true":"sel_false"' @click="changeType(2)">文字桌牌号</span>
				</div>
			</section>
			<section v-if="numType==2">
				<div class="ic-title">
					<div class="text">
						文字桌牌号
					</div>
					<div class="dashed">
					</div>
				</div>
				<section class="box">
					<label class="commodity-name">文字桌牌号</label>
					<a href="javascript:void(0);" v-on:click="addWenNum()" class="addclassify" style="width:180px;">添加文字桌牌号</a>
				</section>
				<div class="cardBox">
					<section class="section_one" v-for="(item,index) in wenList" :key="index">
						<span class="span_one"> {{item.name}}</span>
						<span class="span_two">
							<img v-on:click="editWenNum(item,index)" class="img_style" src="../../res/icon/iconchange.png" />
							<img v-on:click="deleteWenNum(item.id,index)" class="img_style" style="margin-left:5px;" src="../../res/icon/icondelete.png" />
						</span>
					</section>
				</div>
			</section>
		</div>
		<a href="javascript:void(0);" v-on:click="keepOn" class="yellow">保存</a>
		<sellingWin v-if="isShow" @throwWinResult="doThrowTanResult" :isAdd="isAdd" :itemInfo="itemInfo">
		</sellingWin>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			onMenu: false, //餐牌号开关
			serial: '', //流水号重置数
			userData: Object,
			isShow: false,
			isAdd: true,
			wenList: [], //文字桌牌号列表
			numType: 0, //桌牌号类型
			itemInfo: {}, //编辑的信息
			index: '' //编辑的索引
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
		this.getWenList();
	},
	methods: {
		getIsDiscountToggle(res) {
			this.onMenu = res;
			if (res) {
				this.numType = 1;
			} else {
				this.numType = 0;
			}
		},
		async init() {
			let res = await http.getFastSelling({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.serial = res.serialNumber;
				this.numType = res.isMealGrade;
				if (res.isMealGrade == 0) {
					this.onMenu = false;
				} else {
					this.onMenu = true;
				}
			}
		},
		async getWenList() {
			let res = await http.getTableCardList({
				data: {}
			});
			if (res) {
				this.wenList = res;
				this.sortList();
			}
		},
		//改变类型
		changeType(index) {
			this.numType = index;
		},
		//添加文字桌牌号
		addWenNum() {
			this.isAdd = true;
			this.isShow = true;
		},
		//编辑
		editWenNum(item, i) {
			this.itemInfo = item;
			this.index = i;
			this.isAdd = false;
			this.isShow = true;
		},
		//删除
		deleteWenNum(id, i) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确定删除该文字桌牌号?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteTrue(id, i);
					}
				}
			});
		},
		async deleteTrue(id, i) {
			let res = await http.delTableCard({
				data: { id: id }
			});
			if (res) {
				this.wenList.splice(i, 1);
			}
		},
		doThrowTanResult(res, info) {
			if (res == 'ok') {
				if (this.isAdd) {
					this.wenList.push(info);
					this.sortList();
				} else {
					this.wenList.splice(this.index, 1, info);
					this.sortList();
				}
				this.isShow = false;
			} else {
				this.isShow = false;
			}
		},
		//排序
		sortList() {
			this.wenList = utils.sortByAll(this.wenList, ['sort', 'id'], true);
		},
		//保存按钮点击
		async keepOn() {
			if (this.serial % 100 != 0 || this.serial == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '流水号请输入100的整数倍且不能为0'
				});
				return false;
			}
			if (this.numType == 2 && this.wenList.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '请设置文字桌牌号'
				});
				return false;
			}
			let res = await http.editFastSelling({
				data: {
					shopId: this.userData.currentShop.id,
					serialNumber: this.serial, //流水号重置数
					isMealGrade: this.numType //餐牌号开关
				}
			});
			if (res) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: '保存成功'
				});
			}
		}
	},
	components: {
		onOff: () =>
			import(/*webpackChunkName: "on_off"*/ 'src/components/on_off'),
		sellingWin: () =>
			import(/*webpackChunkName: "fast_selling_win"*/ './fast_selling_win')
	},
	computed: {
		serialNum: {
			get: function() {
				return this.serial;
			},
			set: function(newValue) {
				if (newValue == '') {
					this.serial = '';
					return false;
				}
				this.serial = parseInt(newValue);
			}
		}
	}
};
</script>

<style lang="less" scoped>
#quicksel {
	.topR {
		.on_off {
			display: inline-block;
			vertical-align: middle;
		}
	}
	.box {
		height: 40px;
		margin-bottom: 40px;
		.commodity-name {
			display: inline-block;
			width: 100px;
			height: 40px;
			margin-right: 20px;
			line-height: 40px;
			text-align: right;
		}
		.div_wai {
			border: 1px solid #f8941f;
			display: inline-block;
			cursor: pointer;
			.span_type {
				display: inline-block;
				height: 40px;
				width: 100px;
				line-height: 40px;
				text-align: center;
			}
			.sel_true {
				background-color: #f8941f;
				color: white;
			}
			.sel_false {
				background-color: white;
				color: #f8941f;
			}
		}
		input {
			width: 120px;
			vertical-align: middle;
			height: 30px;
			margin-right: 20px;
		}
	}
	.ic-title {
		height: 30px;
		line-height: 30px;
		position: relative;
		.text {
			width: 120px;
			height: 20px;
			line-height: 20px;
			text-indent: 10px;
			position: absolute;
			left: 0;
			top: 10px;
			border-left: 6px solid #f8931f;
		}
		.dashed {
			width: 800px;
			height: 10px;
			border-top: 1px dashed rgb(228, 229, 230);
			position: absolute;
			left: 125px;
			top: 20px;
		}
	}
	.cardBox {
		overflow: auto;
		width: 700px;
		height: 340px;
		border: 1px solid #b3b3b3;
		padding: 20px;
		margin-left: 25px;
		.section_one {
			width: 300px;
			height: 30px;
			float: left;
			padding-left: 25px;
			position: relative;
			margin-bottom: 10px;
		}
		.span_one {
			position: absolute;
			top: 8px;
			font-size: 16px;
			left: 35px;
		}
		.span_two {
			position: absolute;
			right: 35px;
		}
		.img_style {
			height: 30px;
			padding: 5px;
		}
	}
	a {
		margin: 10px 0;
		width: 250px;
	}
}
</style>