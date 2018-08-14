<!--
		多渠道查看详情
		胡江
-->
<template>
		<win :align="'center'" :width="800" :height="560" @winEvent="closeSelfWin">
				<span slot="title">查看详情</span>
				<section id="seeMenu" slot="content">
						<div class="one">
								<span>市别名称：全时段</span>
								<span>时间段：--</span>
								<span>市别商品：{{item.cityGoods}}个</span>
								<span v-if="goodCom.id!=4">人均商品：{{item.peopleGoods}}个</span>
						</div>
						<div class="dashed"></div>
						<div class="two">
								<p>市别商品：{{item.cityGoods}}个</p>
								<div>
										<span v-for="(item,index) in cityName" :key="index">{{item}}</span>
								</div>
						</div>
						<div class="dashed"></div>
						<div class="two" v-if="goodCom.id!=4">
								<p>人均商品：{{item.peopleGoods}}个</p>
								<div>
										<span v-for="(item,index) in peopleName" :key="index">{{item}}</span>
								</div>
						</div>
						<div class="dashed" v-if="goodCom.id!=4"></div>
						<div class="one">
								<span>必点商品：{{item.mustGoods}}个</span>
								<span>必点起售关联子菜：{{item.mustSonGoods}}个</span>
								<span>必点起售数量：{{item.mustNum}}个</span>
						</div>
						<div class="two" style="margin-top: 0" v-if="item.mustGoods>0">
								<span style="font-size: 16px;color: #010101;margin-right: 0">必点商品：</span>
								<span v-for="(item,index) in mustName" :key="index">{{item}}</span>
						</div>
						<div class="two" v-if="item.mustSonGoods>0">
								<span style="font-size: 16px;color: #010101;margin-right: 0">必点起售关联子菜：</span>
								<span v-for="(item,index) in mustSonName" :key="index">{{item}}</span>
						</div>
				</section>
		</win>
</template>

<script>
export default {
	data() {
		return {
			cityName: [], //市别菜品
			peopleName: [], //人均
			mustName: [], //必点
			mustSonName: [] //必点子
		};
	},
	props: ['getGoods', 'getPacks', 'goodCom', 'item'],
	created() {
		for (let i = 0; i < this.getGoods.length; i++) {
			for (let j = 0; j < this.goodCom.goodsIds.length; j++) {
				if (this.getGoods[i].id == this.goodCom.goodsIds[j]) {
					this.cityName.push(this.getGoods[i].goodsName);
					break;
				}
			}
			for (let j = 0; j < this.goodCom.perGoodsIds.length; j++) {
				if (this.getGoods[i].id == this.goodCom.perGoodsIds[j]) {
					this.peopleName.push(this.getGoods[i].goodsName);
					break;
				}
			}
			for (let j = 0; j < this.goodCom.mustGids.length; j++) {
				if (this.getGoods[i].id == this.goodCom.mustGids[j]) {
					this.mustName.push(this.getGoods[i].goodsName);
					break;
				}
			}
			for (let j = 0; j < this.goodCom.mustSonGids.length; j++) {
				if (this.getGoods[i].id == this.goodCom.mustSonGids[j]) {
					this.mustSonName.push(this.getGoods[i].goodsName);
					break;
				}
			}
		}
		for (let i = 0; i < this.getPacks.length; i++) {
			for (let j = 0; j < this.goodCom.packageIds.length; j++) {
				if (this.getPacks[i].id == this.goodCom.packageIds[j]) {
					this.cityName.push(this.getPacks[i].packageName);
					break;
				}
			}
			for (let j = 0; j < this.goodCom.mustPids.length; j++) {
				if (this.getPacks[i].id == this.goodCom.mustPids[j]) {
					this.mustName.push(this.getPacks[i].packageName);
					break;
				}
			}
			for (let j = 0; j < this.goodCom.mustSonPids.length; j++) {
				if (this.getPacks[i].id == this.goodCom.mustSonPids[j]) {
					this.mustSonName.push(this.getPacks[i].packageName);
					break;
				}
			}
		}
	},
	methods: {
		closeSelfWin() {
			this.$emit('throwMenuWin');
		}
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win')
	}
};
</script>

<style lang="less" scoped>
#seeMenu {
	padding: 0 20px;
	.one {
		height: 60px;
		line-height: 60px;
		span {
			margin-right: 50px;
			font-size: 16px;
		}
	}
	.two {
		margin: 20px 0;
		p {
			line-height: 40px;
			height: 40px;
			font-size: 16px;
		}
		span {
			margin-right: 15px;
			margin-bottom: 10px;
			display: inline-block;
			color: #8d8d8d;
		}
	}
	.dashed {
		width: 100%;
		border-top: 1px dashed #e4e5e6;
	}
}
</style>