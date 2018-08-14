<template>
	<win @winEvent="getWinClickResult" :align="'center'" :width="740" :height="'auto'">
		<span slot="title">{{title}}</span>
		<div class="shopList" style="padding: 30px;overflow: hidden;" slot="content">
			<template v-for="(item,ind) in shopList">
				<span @click="selectShops(ind,item)" :class="{'sign': item.id ==  selectShop.id}">{{item.shopName}}</span>
			</template>
		</div>
	</win>
</template>

<script>
	export default {
		props: {
			postObj: null
		},
		data() {
			return {
				shopList: null, //店铺列表
				index: null, //选中的卡类型下标
				selectShop: null, // 选中的实体卡类型
				title: '选择卡属门店' //弹框标题
			};
		},
		methods: {
			getWinClickResult: function (res) {
				if (res) {
					let throwObj = {
						res: res,
						postIndex: this.index,
						postSelectShop: this.selectShop
					};
					this.$emit('toClick', throwObj);
				}
			},
			selectShops: function (ind, item) {
				this.index = ind; //点击选中的数组的下标
				this.selectShop = item; //获取点击选中的卡类型
			}
		},
		mounted() {
			this.shopList = this.postObj.shopList;
			this.index = this.postObj.shopIndex;
			this.selectShop = this.postObj.selectShop;
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
		}
	};
</script>

<style scoped>
	.shopList span {
		display: inline-block;
		color: #333;
		min-width: 100px;
		text-align: center;
		line-height: 38px;
		height: 38px;
		border: 1px solid #D2D2D2;
		margin-right: 10px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.shopList span.sign {
		color: #FF9200;
		border: 1px solid #FF9200;
	}

	.shopList span:hover {
		background-color: #FFFFFF;
	}
</style>