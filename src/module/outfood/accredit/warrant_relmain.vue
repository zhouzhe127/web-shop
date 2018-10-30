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
#warrant{
	height: 100%;
}
#jumpShop {
	background: #ededed;
	/* position: absolute;
	top: 0;
	left: 0; */
	padding: 5%;
	padding-top: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	overflow: auto;
}
#warrant #jumpShop .shopBox {
	/* width: 1441px; */
	height: 90%;
	margin: 0 auto;
	margin-top: 3%;
	z-index: 1000;
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

