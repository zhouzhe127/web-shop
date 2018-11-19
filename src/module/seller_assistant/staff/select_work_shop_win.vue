<template>
	<win :width="740" :height="490" @winEvent="winEvent">
		<span slot="title">选择工作门店</span>
		<div class="select_shop" slot="content">
			<header class="select_shop_nav">
				<!-- <button @click="selectAll" class="btn slect_all">全部选择</button>
				<button @click="cancelAll" class="btn cancel_all">全部取消</button> -->
				<el-button type="primary" style="width:130px;" @click="selectAll">全部选择</el-button>
				<el-button type="info" style="width:130px;" @click="cancelAll">全部取消</el-button>
			</header>
			<section class="select_shop_content">
				<p>直营店</p>
				<mul-select :styles="{'border-radius':'4px',marginRight:'8px'}" :list="direct" :selects="selectDirct" :name="'name'" :keys="'id'"></mul-select>
			</section>
			<section class="select_shop_content">
				<p>加盟店</p>
				<mul-select :styles="{'border-radius':'4px',marginRight:'8px'}" :list="franchise" :selects="selectFrash" :name="'name'" :keys="'id'"></mul-select>
			</section>
		</div>
	</win>
</template>
<script>
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				direct: [],
				franchise: [],
				selectDirct: [],
				selectFrash: []
			};
		},
		props: ['slectsShopIds', 'isEdit'],
		methods: {
			winEvent(str) {
				if (str == 'ok') {
					if (this.selectDirct.length + this.selectFrash < 1) {
						this.$store.commit('setWin', {
							content: '请选择门店',
							title: '操作提示',
							winType: 'alert'
						});
						return false;
					} else {
						this.$emit('closeWin', [...this.selectDirct, ...this.selectFrash]);
					}
				} else {
					this.$emit('closeWin');
				}
			},
			selectAll() {
				this.selectDirct = [];
				this.selectFrash = [];
				for (let i of this.direct) {
					this.selectDirct.push(i.id);
				}
				for (let i of this.franchise) {
					this.selectFrash.push(i.id);
				}
			},
			cancelAll() {
				this.selectFrash = [];
				this.selectDirct = [];
			}
		},
		mounted() {
			let userShop = storage.session('userShop');
			let shopList = storage.session('shopList');
			this.ischain = userShop.currentShop.ischain;
			if (this.ischain == 3) {
				// ischain == 3    表示品牌    否则单店
				this.direct = [];
				this.franchise = [];
				for (let item of shopList) {
					item.name = item.shopName;
					if (item.ischain == '1') {
						this.direct.push(item);
					} else if (item.ischain == '2') {
						this.franchise.push(item);
					}
				}
			}
			if (this.isEdit) { ///  如果是编辑
				this.selectDirct = [];
				this.selectFrash = [];
			}
			if (this.slectsShopIds.length > 0) { //   表示处于编辑状态
				let directs = [];
				let franchiains = [];
				for (let i of this.direct) {
					for (let p of this.slectsShopIds) {
						if (i.id == p) {
							directs.push(p);
						}
					}
				}
				for (let i of this.franchise) {
					for (let p of this.slectsShopIds) {
						if (i.id == p) {
							franchiains.push(p);
						}
					}
				}
				this.selectDirct = directs;
				this.selectFrash = franchiains;
			}
		},
		components: {
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /* webpackChunkName: 'mul_select' */ 'src/components/mul_select')
		}
	};
</script>
<style lang="less" scoped>
	.select_shop {
		padding: 0 44px;

		.select_shop_nav {
			padding-left: 366px;
			padding-top: 13px;

			.btn {
				width: 132px;
				height: 43px;
				border: none;
				color: #fff;
			}

			.slect_all {
				background: RGB(247, 147, 30);
			}

			.cancel_all {
				background: RGB(159, 160, 160);
			}
		}

		.select_shop_content {
			margin-top: 30px;
			margin-bottom: 50px;

			&>p {
				font-size: 16px;
				color: RGB(51, 51, 51);
				margin-bottom: 23px
			}
		}
	}
</style>