<template>
	<div>
		<win @winEvent="getCauseName" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<div v-if="type == 1">
					<span class="required" style="margin-left:100px">品牌名称</span>
					<input type="text" placeholder="请输入品牌名称" v-model="titleName" maxlength="20">
				</div>
				<div v-if="type == 2">
					<div v-if="shopList.length != 0" style="padding: 40px;">
						<span v-for="(item,index) in shopList" :key="index" class="shop">{{item.goodsName}}</span>
					</div>
					<div v-else style="padding: 40px;text-align: center;">
						<span>暂无商品</span>
					</div>
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
				title: '',
				titleName: '',
				shopList: [], //商品列表
				shopId: null,
			};
		},
		props: {
			type: Number,
			id: null
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			if (this.type == 2) {
				this.getShopList();
				this.title = '商品列表';
			} else {
				this.title = '新增品牌';
			}
		},
		methods: {
			getCauseName(res) {
				if ((!this.titleName || this.titleName == '0') && res == 'ok') {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '品牌名称不能为空且不能为0'
					});
					return false;
				}
				this.$emit('add-brand', res, this.titleName);
			},
			//获取商品列表
			async getShopList() {
				let res = await http.getGoodsByBid({
					data: {
						shopId: this.shopId,
						id: this.id
					}
				});
				this.shopList = res;
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		},
	};
</script>

<style lang="less" scoped>
	#tan {
		input {
			width: 300px;
			margin-top: 80px;
			outline: none;
			height: 40px;
			margin-left: 10px;
			padding-left: 10px;
		}
		.shop {
			display: inline-block;
			width: 150px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin-bottom: 20px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
</style>