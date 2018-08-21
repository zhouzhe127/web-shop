<template>
	<section id="warrant">
		<section id="jumpShop">
			<div class="shopBox">
				<div style="margin-bottom: 30px;font-size: 18px;">
					<i></i>授权成功</div>
				<router-view name="nextCon"></router-view>
			</div>
		</section>
	</section>
</template>
<script>
export default {
	data() {
		return {};
	}
};
</script>
<style lang= "less" scoped>
#jumpShop {
	background: #ededed;
	/* position: absolute;
	top: 0;
	left: 0; */
	padding-top: 1px;
	width: 100%;
	height: 100%;
	z-index: 100;
	overflow: auto;
}
#warrant #jumpShop .shopBox {
	width: 1441px;
	/*height: 796px;*/
	margin: 0 auto;
	margin-top: 60px;
	z-index: 1000;
}
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
#warrant .shopBox a {
	margin-top: 30px;
}
#warrant .shopBox i {
	display: inline-block;
	width: 44px;
	height: 44px;
	background: url(../../../res/icon/success.png) center center no-repeat;
	vertical-align: middle;
	margin-right: 16px;
}
</style>

