<template>
	<Win :width='597' :height='333' @winEvent='getAppliedWin' :align="'center'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">选择业务类型</span>
		<div id="tan" slot="content" v-cloak>
			<mul-select :list.sync="bussiness" :selects.sync="busineselect" :name='"name"' :keys='"id"' :styles="{backgroundColor: '#F1F1F1',marginRight:'8px',marginBottom:'8px'}" :isradio="true"></mul-select>
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
			businessList: [], //业务类型
			busineselect: [] //选中的
		};
	},
	props: {
		bussiness: Array, //业务选择列表
		bussinessselect: Array //选中的
	},
	methods: {
		getAppliedWin: function(res) {
			if (res == 'ok') {
				this.$emit('getAppliedWin', res, this.busineselect);
			} else {
				this.$emit('getAppliedWin', res);
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
		this.busineselect.push(this.bussinessselect[0]);
	}
};
</script>
<style scoped>
#tan {
	padding: 40px;
}
</style>