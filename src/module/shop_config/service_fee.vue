<!--
	**服务费管理
	*
	* 胡江
	* *
	*
-->
<template>
	<section>
		<el-form label-width="130px">
			<el-form-item label="开启服务费" >
				<el-switch v-model="on"  active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
			</el-form-item>
			<el-form-item required label="服务费使用规范" >
				<el-radio-group v-model="rule">
					<el-radio v-for="item in list" :key="item.id" :label="item.id" border>{{item.name}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item required label="服务费费率设置" >
				<el-input :disabled="on?false:true" v-model="percent" maxlength="5" placeholder = "输入费率" style="width:120px;"></el-input>
				<i>%</i>
			</el-form-item>
			<el-form-item label="选择服务费菜品">
				<span class="fl spanCom" style="margin-right:15px;">已选择商品{{goodsLength}}道,套餐：{{packagesLength}}个</span>
				<el-button @click="addList" type="primary" style="width:150px;">添加关联菜品</el-button>
			</el-form-item>
		</el-form>
		<el-button @click="keepOn" type="primary" style="width:150px;height:45px;">保存</el-button>
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
			userData: Object,
			rule:0
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
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
				this.rule = Number(res.charge.chargeRule);
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
					// this.percent = 0;
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
					rule: Number(this.rule), //规则 0：打折前；1：打折后
					percent: this.percent, //服务费率 (0至100)
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
	components: {
		goodListWin: () =>
			import(/* webpackChunkName:"good_list_win" */ 'src/components/good_list_win'),
	}
};
</script>
