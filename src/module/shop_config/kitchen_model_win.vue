<!--
	**后厨配置一级弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<win @winEvent="clickResult" :align="'right'" :width="480" :height="'auto'">
			<!--标题-->
			<span slot="title">{{isAdd?'添加操作台':'编辑操作台'}}</span>
			<!--内容-->
			<div slot="content" style="background-color: #F2F2F2">
				<div class="jobWin">
					<h2 class="required tag">操作台类型</h2>
					<template v-for="(item,index) in list">
						<div class="computeStyle" :class="{icSelect:index== info.type}" @click="changeSelect(index)" :key="index">
							{{item}}
						</div>
					</template>
					<div class="clear"></div>
					<h2 class="required tag">操作台名称</h2>
					<div class="mes">
						<input type="text" class="input" maxlength="10" style="width: 100%; " v-model="info.name" placeholder="请输入操作台名称">
					</div>
					<div class="clear"></div>
					<h2 class="required tag">关联商品</h2>
					<div class="mes" style="color: #999;height: 40px;line-height: 40px;">
						已关联商品：{{info.goodsIds.length + info.packageIds.length}} 种
					</div>
					<div class="clear"></div>
					<h2 class="tag"></h2>
					<div class="mes">
						<a href="javascript:void(0);" class="addclassify" style="width:220px;" v-on:click="edit">关联商品</a>
					</div>
					<div class="clear"></div>
					<h2 class="required tag">区域</h2>
					<div class="mes">
						<el-checkbox  class="mesLi" v-for="(item,index) in Area" :key="index" v-model="item.selected" :label="item.areaName" border size="medium"></el-checkbox>
						<!--<mulSelect @selOn="doMore" :list="Area" :selects="info.areaIds" :name='"areaName"' :keys='"id"'></mulSelect>-->
					</div>
					<div class="clear"></div>
					<h2 class="required tag">排序</h2>
					<div class="mes">
						<el-input-number v-model="info.sort"  :min="1" :max="255"></el-input-number>
						<!--<subadd :bindnum="info.sort" :maxnum="255" :minnum="1" :sign='false' @toClick="change"></subadd>-->
					</div>
					<div class="clear"></div>
				</div>
				<goodListWin v-if="isGoodsShow" @goodListWin="doThrowWinGoods" :goodsIds="info.goodsIds" :isGoods="true" :packages="info.packageIds" :goInName="'isKitchen'"></goodListWin>
			</div>
		</win>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			list: ['后厨加工', '出品台'],
			isGoodsShow: false,
			info: Object
		};
	},
	props: {
		item: Object,
		isAdd: null,
		Area: Array,
		allName: Array
	},
	created() {
		let item = this.item;
		let isTrue = typeof item.goodsIds == 'string' ? true : false;
		this.info = {
			id: item.id ? item.id : '',
			type: item.type ? item.type : 0,
			name: item.name ? item.name : '',
			sort: item.sort ? item.sort : 1,
			areaIds: item.areaIds
				? isTrue ? item.areaIds.split(',') : item.areaIds
				: [],
			goodsIds: item.goodsIds
				? isTrue ? item.goodsIds.split(',') : item.goodsIds
				: [],
			packageIds: item.packageIds
				? isTrue ? item.packageIds.split(',') : item.packageIds
				: []
		};
		this.name = item.name ? item.name : '';

		for(let i=0;i<this.Area.length;i++){
			this.Area[i].selected=this.info.areaIds.includes(this.Area[i].id);
		}
	},
	methods: {
		//操作台类型
		changeSelect(i) {
			if (!this.isAdd) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alter',
					content: '不能修改操作台类型'
				});
				return;
			}
			this.info.type = i;
		},
//		//区域
//		doMore(res) {
//			this.info.areaIds = res;
//		},
//		//排序
//		change(res) {
//			this.info.sort = res;
//		},
		//关联商品
		edit() {
			this.isGoodsShow = true;
		},
		//商品点击返回
		doThrowWinGoods(res, item) {
			if (res == 'ok') {
				this.info.goodsIds = item.goodArr;
				this.info.packageIds = item.packArr;
			}
			this.isGoodsShow = false;
		},
		//添加
		async isAddFun(backRes) {
			let res = await http.KitchenAdd({
				data: {
					type: this.info.type,
					name: this.info.name,
					goodsIds: this.info.goodsIds.toString(),
					packageIds: this.info.packageIds.toString(),
					areaIds: this.info.areaIds.toString(),
					sort: this.info.sort
				}
			});
			if (res) {
				this.info.id = res.id;
				this.$emit('throwWinResult', backRes, this.info); //抛出一个事件给父组件
			}
		},
		//编辑
		async isEditFun(backRes) {
			let res = await http.KitchenUpdate({
				data: {
					id: this.info.id,
					type: this.info.type,
					name: this.info.name,
					goodsIds: this.info.goodsIds.toString(),
					packageIds: this.info.packageIds.toString(),
					areaIds: this.info.areaIds.toString(),
					sort: this.info.sort
				}
			});
			if (res) {
				this.$emit('throwWinResult', backRes, this.info); //抛出一个事件给父组件
			}
		},
		clickResult(res) {
			if (res == 'ok') {
				if (this.info.name.length > 10) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '操作台名称不能超过10个字'
					});
					return false;
				}
				if (this.info.name.trim() == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '操作台名称不能为空'
					});
					return false;
				}
				if (
					this.allName.indexOf(this.info.name.trim()) != -1 &&
					this.info.name != this.name
				) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '操作台名称不能重复'
					});
					return false;
				}
				if (this.info.goodsIds.length + this.info.packageIds.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '请关联商品'
					});
					return false;
				}
				this.info.areaIds=[];
				for(let i=0;i<this.Area.length;i++){
					if(this.Area[i].selected){
						this.info.areaIds.push(this.Area[i].id);
					}
				}
				if (this.info.areaIds.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alter',
						content: '请选择区域'
					});
					return false;
				}
				this.info.goodsNum = this.info.goodsIds.length + this.info.packageIds.length;
				if (this.isAdd) {
					this.isAddFun(res);
				} else {
					this.isEditFun(res);
				}
			} else {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: 'win'*/ 'src/components/win'),
		goodListWin: () => import(/* webpackChunkName:"good_list_win" */ 'src/components/good_list_win')
	}
};
</script>
<style scoped lang="less">
.jobWin {
	width: 480px;
	height: auto;
	min-height: 480px;
	padding-top: 20px;
	background-color: #f2f2f2;
	.tag {
		float: left;
		width: 102px;
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
		.mesLi{
			margin-bottom: 5px;
			background-color: #FFFFFF;
		}
	}
	.clear {
		clear: both;
		font-size: 0;
		line-height: 0;
		height: 15px;
		width: 100%;
	}
	.computeStyle {
		width: 100px;
		height: 38px;
		text-align: center;
		border: 1px solid rgb(189, 190, 191);
		margin-left: 15px;
		cursor: pointer;
		float: left;
		line-height: 38px;
	}
	.icSelect {
		border: 1px solid rgb(244, 147, 50) !important;
		background-color: rgb(249, 240, 227);
		color: #f39801;
	}
}
</style>