<!--
    **新建疯抢商品
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<Win :width='740' :height="'auto'" @winEvent='getAppliedWin' :align="'center'">
		<span slot="title">增加门店库存</span>
		<div id="tan" slot="content">
			<ul>
				<li v-for="(item,index) in shopList" :key="index">
					<div class="fl shopname">
						{{item.name}}
					</div>
					<div class="fl shopstock">
						库存量
						<input type="text" name="" v-model="item.stock" maxlength="6">
					</div>
				</li>
			</ul>
		</div>
	</Win>
</template>
<script>

	let reg = /^\d*[0-9]{1,}\d*$/;

	export default {
		data() {
			return {

			};
		},
		methods: {
			getAppliedWin: function (res) {
				if (res == 'ok') {
					let count = 0;
					for (let item of this.shopList) {
						if (!this.isEmpty(item.stock)) {
							count++;
						}
						if (!(this.isEmpty(item.stock) || reg.test(item.stock))) {
							this.$store.commit('setWin', {
								content: `${item.name}库存量只能是正整数`,
								winType: 'alert',
								title: '操作提示',
							});
							return false;
						}
					}
					if (count < 1) {
						this.$store.commit('setWin', {
							content: `至少增加一家门店库存量并且只能是正整数`,
							winType: 'alert',
							title: '操作提示',
						});
						return false;
					}
					this.$emit('getAppliedWin', res, this.shopList);
				} else {
					for (let item of this.shopList) {
						item.stock = '';
					}
					this.$emit('getAppliedWin', res);
				}
			},
			isEmpty: function (txt) {
				let value = txt.replace(/(^\s*)|(\s*$)/g, '');
				if (value == '') {
					return true;
				} else {
					return false;
				}
			}
		},

		components: {
			Win: () =>
				import ( /* webpackChunkName:'Win' */ 'src/components/win')
		},
		props: {
			shopList: Array, //店铺列表
		},

	};
</script>
<style scoped>
	#tan {
		padding: 46px 50px 0 50px;
		max-height: 700px;
	}

	#tan ul {
		width: 100%;
		height: auto;
	}

	#tan ul li {
		width: 100%;
		height: 40px;
		margin-bottom: 32px;
	}

	#tan ul li .shopname {
		width: 260px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 100px;
	}

	#tan ul li .shopstock {
		width: auto;
		height: 40px;
		text-align: center;
		line-height: 40px;
	}

	#tan ul li .shopstock input {
		width: 118px;
		height: 38px;
		margin-left: 12px;
		text-indent: 10px;
	}
</style>