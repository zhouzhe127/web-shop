<template>
	<div id="mtConfig">
		<div class="shopList">
			<p>请选择需要配置的模块</p>
			<ul class="title">
				<li>序号</li>
				<li>模块</li>
				<li>选择</li>
			</ul>
			<ul class="eleShop" v-for="(item,index) in mtShopList" :key="index" @click="shopSelect(index)">
				<li>0{{index+1}}</li>
				<li>{{item}}</li>
				<li style="cursor: pointer;">
					<div class="circle active" v-bind:class="{ 'ele-active': mtShopid == index}"></div>
				</li>
			</ul>
		</div>
		<div>
			<a href="javascript:void(0);" class="gray" @click="back">上一步</a>
			<a href="javascript:void(0);" class="yellow" @click="next">下一步</a>
		</div>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			mtShopList: ['商品管理', '分类管理'],
			mtShopid: 0
		};
	},
	methods: {
		shopSelect: function(index) {
			this.mtShopid = index;
		},
		back: function() {
			window.history.go(-1);
		},
		next: function() {
			if (this.mtShopid == 0) {
				if (storage.session('goodList')) {
					this.$router.push({
						path: 'goodsfig'
					});
				} else {
					this.$store.commit('setWin', {
						title: '提示',
						content: '菜品加载中请稍后'
					});
					return false;
				}
			} else {
				this.$router.push({
					path: 'packConfig'
				});
			}
		}
	}
};
</script>
<style scoped>
#warrant #jumpShop .shopBox .shopList {
	width: 100%;
	height: 700px;
	background: #ffffff;
}
#warrant #jumpShop .shopBox .shopList p {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 22px;
	color: #43414a;
	text-align: center;
}
#jumpShop .title {
	background: #f7f7f7;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
}
#jumpShop ul li {
	display: inline-block;
	width: 33%;
	text-align: center;
}
#jumpShop .eleShop li {
	height: 100px;
	line-height: 100px;
	font-size: 16px;
	color: #43414a;
	border-bottom: 4px solid #f7f7f7;
}
.circle {
	display: inline-block;
	width: 21px;
	height: 21px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	margin-left: 5px;
	background: #fff;
	vertical-align: middle;
}
.ele-active {
	background: url(../../../res/icon/eleicon.png) center center no-repeat;
}
#warrant .gray {
	margin-left: 540px;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
</style>

