<template>
	<Win :width='597' :height='333' @winEvent='getCityWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">选择城市名称</span>
		<div id="tan" slot="content" v-cloak>
			<mul-select :list.sync="cityInfo" :selects.sync="cityselect" :name='"cityName"' :keys='"cityCode"' :styles="{backgroundColor: '#F1F1F1',marginRight:'8px',marginBottom:'8px'}" :isradio="true"></mul-select>
		</div>
	</Win>
</template>
<script>
export default {
	data() {
		return {
			okStyle: {
				content: '确认',
				style: {
					backgroundColor: '#FF9800',
					color: '#fff'
				}
			},
			cancelStyle: {
				content: '取消',
				style: {
					backgroundColor: '#b3b3b3',
					color: '#fff'
				}
			},
			cityselect: [] //城市列表选中的
		};
	},
	props: {
		cityInfo: Array, //城市列表
		cityselects: Array //城市选中的
	},
	methods: {
		getCityWin: function(res) {
			if (res == 'ok') {
				this.$emit('getCityWin', res, this.cityselect);
			} else {
				this.$emit('getCityWin', res);
			}
		}
	},
	computed: {},
	components: {
		Win: () => import(/* webpackChunkName:'win' */ 'src/components/win'),
		'mul-select': () =>
			import(/*webpackChunkName: 'mul_select' */ 'src/components/mul_select')
	},
	mounted() {
		this.cityselect.push(this.cityselects[0]);
	}
};
</script>
<style scoped>
#tan {
	padding: 40px;
}
</style>