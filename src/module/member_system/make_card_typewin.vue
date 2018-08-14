<template>
	<div>
		<win @winEvent="save" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div class="cardType" style="padding: 30px;">
					<radio @selOn="selOn" :list="cradTypeList" :index="index" :name='"name"' class="newCard"></radio>
				</div>
			</div>
		</win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				title: '关联卡类型',
				cradTypeList: [], // 卡类型列表
				index: '', //选中的卡类型下标
				shopIds: '', //所有店铺
				shopId: null, //单店Id
				ischain: null,
				hasshopIds: '' //已经制过卡的id
			};
		},
		props: ['cradTypeIndex', 'isType'],
		mounted() {
			let userData = storage.session('userShop');
			this.ischain = userData.currentShop.ischain; // 0为单店 3为品牌
			this.shopId = userData.currentShop.id;
			this.list = this.cradTypeList;
			if (this.ischain == 3) {
				this.getShopList();
			}
			this.getCardTypeList();
		},
		methods: {
			// 获取卡类型列表
			async getCardTypeList() {
				let res = await http.getCardTypeList({
					data: {}
				});
				this.cradTypeList = res;
				this.index = this.cradTypeIndex;
			},
			//获取卡类型在那些店铺下面治过卡
			async checkShopIds(data) {
				let res = await http.checkShopIds({
					data: {
						cardTypeId: this.cradTypeList[this.index].id, //卡类型的id
						shopIds: this.ischain == 3 ? this.shopIds : this.shopId
					}
				});
				this.hasshopIds = res;
				if (this.ischain == '0' && this.shopId == res) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '该卡类型在该店铺下已制卡！'
					});
					return false;
				} else {
					this.$emit('getType', data, this.index, this.cradTypeList, this.hasshopIds);
				}

			},
			//获取品牌下的店铺
			async getShopList() {
				let res = await http.getShopList({
					data: {

					}
				});
				for (let i = 0; i < res.length; i++) {
					this.shopIds += res[i].id + ',';
				}
				this.shopIds = this.shopIds.substring(0, this.shopIds.length - 1);
			},
			selOn(index) {
				this.index = index;
			},
			save(res) {
				if (res == 'ok') {
					this.checkShopIds(res);
				} else {
					this.$emit('getType', res);
				}

			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			radio: () =>
				import ( /*webpackChunkName: 'radio_btn'*/ 'src/components/radio_btn'),
			multiselect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select')
		},
	};
</script>
<style lang="css" scoped>
	.newCard>>>span {
		color: #333;
		min-width: 100px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.newCard>>>span.sign {
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.newCard>>>span:hover {
		background-color: #FFFFFF;
	}

	.newCard .unsign {
		background: #eee;
	}

	.newCard .unsign:hover {
		background: #eee;
	}
</style>