<!--
	**服务费管理
	*
	* 胡江
	* *
	*
-->
<template>
	<section>
		<div class="picName">
			<div class="line">
				<section class="fl">
					<label class="commodity-name  fl">开启服务费</label>
					<on-off :status="on" @statusChange="getIsDiscountToggle"></on-off>
				</section>
			</div>
			<div class="line">
				<section class="fl">
					<span class="required feeRoute" style="">服务费使用规范</span>
					<span class="fl">
						<radioBtn @selOn="doThrowWinResult" :list="list" :index="index" :name='"name"'></radioBtn>
					</span>
				</section>
			</div>
			<div class="line">
				<label class="required fl feeSet" style="">服务费费率设置</label>
				<label>
					<input type="text" class="input feeInput" :disabled="disabled" v-model="percent" placeholder="输入费率">%
				</label>
			</div>
			<div class="line">
				<label class="fl feeGoods">选择服务费菜品</label>
				<span class="fl spanCom">已选择商品:{{goodsLength}}道, 套餐:{{packagesLength}}个</span>
				<a href="javascript:void(0);" v-on:click="addList" class="addclassify" style="width:180px;">添加关联菜品</a>
			</div>
		</div>
		<el-button @click="keepOn" type="primary" style="width:150px;height:45px;">保存</el-button>
		<!-- <a href="javascript:void(0);" v-on:click="keepOn" :class="percent!== '' ?'yellow':'gray'" style="margin:10px 0;width:250px;">保存</a> -->
		<goodListWin v-if="isGoodsShow" @goodListWin="doThrowWinGoods" :goodsIds="goodsIds" :isGoods="true" :packages="packages" :goInName="'isMain'"></goodListWin>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			isGoodsShow: false, //是否打开商品弹窗组件
			on: false, //开关按钮
			percent: '', //服务费费率
			disabled: true, //禁用
			list: [
				{
					//判断打折前后
					id: 0,
					name: '打折前'
				},
				{
					id: 1,
					name: '打折后'
				}
			],
			index: 0, //初始设置为打折前
			goodsLength: 0, //关联菜品
			goodsIds: [],
			packages: [],
			packagesLength: 0, //关联套餐
			userData: Object
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		//开关组件返回
		getIsDiscountToggle(res) {
			this.on = res;
		},
		//单选组件返回
		doThrowWinResult(res) {
			this.index = res;
		},
		//获取服务费接口
		async init() {
			let res = await http.getServiceCharge({
				data: { shopId: this.userData.currentShop.id }
			});
			if (res) {
				this.packages = res.packageIds;
				this.goodsIds = res.goodsIds;
				this.goodsLength = res.goodsIds.length;
				this.packagesLength = res.packageIds.length;
				this.on = Number(res.charge.chargeStatus);
				this.on = Boolean(this.on);
				this.index = Number(res.charge.chargeRule);
				this.percent = res.charge.chargePercent;
			}
		},
		// 添加关联菜单窗口
		addList() {
			this.isGoodsShow = true;
		},
		//保存按钮点击操作
		async keepOn() {
			let goodsIds = this.goodsIds ? this.goodsIds.toString() : '';
			let packageIds = this.packages ? this.packages.toString() : '';
			
			if (this.on) {
				if (this.percent == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '服务费费率不能为空或0'
					});
					return false;
				} else if (isNaN(this.percent)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '服务费率只能为数字，请正确输入'
					});
					this.percent = 0;
					return false;
				} else if (this.percent*1 > 100 || this.percent*1 < 1) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '服务费率在1-100之间，请正确输入'
					});
					return false;
				}
			}
			//设置服务费接口
			let res = await http.setServiceCharge({
				data: {
					shopId: this.userData.currentShop.id, //店铺ID
					status: Number(this.on), //开启服务费 0：不开；1：开
					rule: Number(this.index), //规则 0：打折前；1：打折后
					percent: parseInt(this.percent), //服务费率 (0至100)
					uid: this.userData.user.id, //用户id
					goodsIds: goodsIds, //商品ID，逗号分隔，例：1,2,3
					packageIds: packageIds //套餐ID，逗号分隔，例：1,2,3
				}
			});
			if (res) {
				this.list.id = res.charge.chargeRule;
				this.percent = res.charge.chargePercent;
				this.goodsIds = res.goodsIds;
				this.packages = res.packageIds;
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '保存成功'
				});
			}
		},
		ons() {
			if (!this.on) {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		//商品点击返回
		doThrowWinGoods(res, item) {
			if (res == 'ok') {
				this.goodsIds = item.goodArr;
				this.packages = item.packArr;
				this.goodsLength = this.goodsIds.length;
				this.packagesLength = this.packages.length;
			}
			this.isGoodsShow = false;
		}
	},
	watch: {
		on: 'ons'
	},
	components: {
		onOff: () =>
			import(/* webpackChunkName:"on_off" */ 'src/components/on_off'),
		goodListWin: () =>
			import(/* webpackChunkName:"good_list_win" */ 'src/components/good_list_win'),
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn')
	}
};
</script>

<style scoped lang="less" >
.picName {
	width: 100%;
	min-width: 600px;
	padding-top: 10px;
	overflow: hidden;
	.line {
		display: block;
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin: 10px 0;
		float: left;
		.commodity-name {
			width: 100px;
			height: 40px;
			line-height: 40px;
			text-align: right;
			margin-right: 38px;
		}
		.feeRoute {
			display: block;
			width: 130px;
			line-height: 40px;
			margin-right: 10px;
			float: left;
		}
		input {
			width: 100px;
			line-height: 25px;
			padding: 5px;
			margin: 0;
		}
		.feeSet {
			width: 130px;
			line-height: 40px;
			margin-right: 10px;
		}
		.feeInput {
			width: 120px;
			height: 30px;
			border: 1px solid #ccc;
		}
		.feeGoods {
			width: 130px;
			line-height: 40px;
			margin-right: 10px;
		}
		.spanCom {
			height: 40px;
			line-height: 40px;
			text-align: left;
			margin-right: 10px;
		}
	}
}
</style>
<style>
.picName .line span .selectbtns span {
	background-color: #f2f2f2;
}
</style>