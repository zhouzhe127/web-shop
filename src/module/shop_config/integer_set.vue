<!--
	**取整设置
	*
	* 胡江
	* *
	*
-->
<template>
	<section id="integer">
		<div class="topR" style="position: relative">
			<section class="fl">
				<label class="commodity-name fl">开启取整</label>
				<on-off :status="on" @statusChange="getIsDiscountToggle" class="on_off"></on-off>
			</section>
		</div>
		<template v-if="on">
			<div class="picName">
				<span class="required span_set">取整方式 </span>
				<ul>
					<li v-for="(item,i) in list" :key="i" v-on:click="selectItem(item.id)">
						<h3>{{item.name}}</h3>
						<span>{{item.desc}}</span>
						<i v-if="item.selected && priceRule > 0"></i>
					</li>
				</ul>
			</div>
		</template>
		<a href="javascript:void(0);" v-on:click="keepOn" class="yellow">保存</a>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			on: false, //开关按钮
			priceRule: 0, //选择的方式
			list: [], //取整列表
			userData: Object
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		getIsDiscountToggle(res) {
			this.on = res;
		},
		async init() {
			let res = await http.getPriceRule({
				data: {
					shopId: this.userData.currentShop.id,
					priceRule: this.priceRule
				}
			});
			if (res) {
				let lista = {
					selected: false
				};
				for (let i = 0; i < res.list.length; i++) {
					for (let key in lista) {
						res.list[i][key] = lista[key];
					}
				}
				this.list = res.list;
				this.priceRule = res.priceRule;
				if (res.priceRule * 1 > 0) {
					this.list[this.priceRule - 1].selected = true;
					this.on = true;
				} else if (res.priceRule == 0) {
					this.on = false;
				}
			}
		},
		//选择哪种方式
		selectItem(id) {
			let list = this.list;
			for (let i = 0; i < list.length; i++) {
				list[i].selected = false;
			}
			this.list[id - 1].selected = true;
			this.priceRule = id;
		},
		//保存按钮点击
		async keepOn() {
			if (this.on == false) {
				this.priceRule = 0;
			}
			let res = await http.setPriceRule({
				data: {
					shopId: this.userData.currentShop.id,
					priceRule: this.priceRule
				}
			});
			if (res) {
				if (this.on == true && this.priceRule == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '请选择取整方式'
					});
				} else {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '保存成功'
					});
				}
			}
		}
	},
	components: {
		onOff: () =>
			import(/*webpackChunkName: "on_off"*/ 'src/components/on_off')
	}
};
</script>

<style scoped lang="less">
#integer {
	text-align: left;
	.topR,
	.picName {
		width: 100%;
		height: 50px;
	}
	.commodity-name {
		width: 100px;
		height: 40px;
		line-height: 40px;
	}
	.on_off {
		position: absolute;
		left: 100px;
		width: 88px;
	}
	.picName {
		ul {
			// width: 602px;
			height: 50px;
			float: left;
			border: 1px solid #b1b1b1;
			li {
				width: 149px;
				height: 49px;
				text-align: center;
				float: left;
				border-right: 1px solid #b1b1b1;
				position: relative;
				box-sizing: border-box;
				h3 {
					line-height: 30px;
					font-size: 16px;
				}
				span {
					font-size: 12px;
					color: #b3b3b5;
				}
				i {
					display: block;
					width: 30px;
					height: 20px;
					background: url('../../res/images/sign.png') no-repeat;
					position: absolute;
					bottom: 1px;
					right: 0;
				}
				&:last-child {
					border-right: none;
				}
			}
		}
		.span_set {
			float: left;
			width: 100px;
			line-height: 40px;
		}
	}
	a {
		display: block;
		float: left;
		margin: 10px 0;
		width: 250px;
		clear: both;
	}
}
</style>