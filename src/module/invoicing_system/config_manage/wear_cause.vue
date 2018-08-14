/** * @file * * 耗损原因配置 * * @author zhengu.jiang */

<template>
	<wear-cause :type="type"></wear-cause>
</template>

<script>
	import wearCause from './cause_public';
	export default {
		data() {
			return {
				type: 0
			};
		},
		components: {
			wearCause
		}
	};
</script>