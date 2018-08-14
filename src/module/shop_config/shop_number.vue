<!--
	**商品编号
	*
	* 孔伟研
	* *
	*
-->
<template>
	<form class="shopnum" id="shopnum">
		<div style="width:100%;height:50px;">
			<span>商家编号: </span>
			<textarea class="shopToken" v-model='copNum'></textarea>
		</div>
		<a href="javascript:void(0);" v-on:click="copyCode()" class="blue copyNum" style="width: 150px;">复制商户编号</a>
		<a href="javascript:void(0);" v-on:click="randomNum()" class="blue resetNum" style="width: 150px;">重置商户编号</a>
	</form>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			shopId: null, //店铺id
			copNum: ''
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.inte();
	},
	components: {},
	methods: {
		//获取商户编号
		//初始化
		async inte() {
			this.copNum = await http.getAccessToken({
				data: { shopId: this.shopId }
			});
		},
		async getNum() {
			this.copNum = await http.resetAccessToken({
				data: { shopId: this.shopId }
			});
		},
		//复制
		copyCode: function() {
			let t = document.getElementsByClassName('shopToken')[0];
			t.select();
			document.execCommand('copy');
		},
		//随机
		randomNum: function() {
			this.$store.commit('setWin', {
				title: '操作提醒',
				winType: 'confirm',
				content:
					'重置商户编号会导致全部打印机不能正常工作，需要专业人员重新配置路由器数据。请谨慎操作！',
				callback: delRes => {
					if (delRes == 'ok') {
						this.getNum();
					}
				}
			});
		}
	}
};
</script>
<style type="text/css" scoped>
#shopnum {
	width: 100%;
	height: 180px;
	min-width: 700px;
	font-weight: bolder;
	overflow: hidden;
}
#shopnum span {
	display: block;
	float: left;
	font-size: 18px;
	width: 80px;
	height: 40px;
	line-height: 40px;
	padding: 0;
	margin: 0;
}
.shopToken {
	margin-left: 10px;
	letter-spacing: 2px;
}

#shopnum textarea {
	width: 60%;
	height: 40px;
	line-height: 40px;
	font-size: 18px;
	padding: 0;
	color: #000;
	border: none;
	overflow: hidden;
	resize: none;
	text-decoration: none;
	background: #fff;
	font-weight: bolder;
	outline: none;
}
#shopnum textarea:focus {
	transition: none;
	box-shadow: none;
}
</style>