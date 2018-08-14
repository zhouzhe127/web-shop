/** * @file * * 货架管理 * * @author zhengu.jiang */

<template>
	<wear-house :houseType="type"></wear-house>
</template>

<script>
	import wearHouse from './house_public';
	export default {
		data() {
			return {
				type: 1
			};
		},
		components: {
			wearHouse
		}
	};
</script>