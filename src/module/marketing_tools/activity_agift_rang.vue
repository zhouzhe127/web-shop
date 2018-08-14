<template>
	<Win @winEvent='winEvent' :width="600" :height="500">
		<div slot='content' class="activity_scope" style="padding: 20px;overflow: hidden;">
			<div style="margin-bottom: 20px;">
				<a href="javascript:void(0)" class="check" @click="selectUnselect('1',shopList)">全部选择</a>
				<a href="javascript:void(0)" class="unselect" @click="selectUnselect()">全部取消</a>
			</div>
			<mulSelect :list='shopList' @selOn='selOnSend' :styles="{'background-color':'rgb(239,239,239)','marginRight':'8px','marginBottom':'8px'}" :selects="selects" :name='"shopName"' :keys='"id"'></mulSelect>
		</div>
	</Win>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	props: {
		activityList: [Array, Object],
		selectsList: [Array, Object]
	},
	data() {
		return {
			shopList: [],
			selects: [],
			id: 0
		};
	},
	methods: {
		winEvent(str) {
			let obj = {
				status: str
			};
			if (str == 'ok') {
				obj.select = this.selects;
			}
			this.$emit('winEvent', obj);
		},
		selOnSend(arr) {
			this.selects = arr;
			this.$emit('select', arr);
		},
		selectUnselect: function(type, list) {
			// 全选 and 全不选
			if (type == '1') {
				this.selects = [];
				for (let i = 0; i < list.length; i++) {
					this.selects.push(list[i].id);
				}
			} else {
				this.selects = [];
			}
			this.$emit('select', this.selects);
		},
	},
	components: {
		'mulSelect': () =>
			import ( /* webpackChunkName:'mul_select' */ 'src/components/mul_select'),
		Win: () =>
			import ( /* webpackChunkName:'win' */ 'src/components/win'),
	},
	mounted() {

		this.selects = utils.deepCopy(this.selectsList);
		this.id = storage.session('shopId');
		this.shopList = this.activityList;
	}
};
</script>
<style scoped>
</style>