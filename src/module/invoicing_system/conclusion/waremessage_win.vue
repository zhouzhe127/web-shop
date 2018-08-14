<template>
	<win :width="width" :height="height" :type="'alert'" @winEvent="winEvent" :ok="{style:{'backgroundColor':'#fbb03b'},content:'确定'}"
	    :align="'center'">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" slot-scope="props">
			<div class="conBox">
				<span>仓库名称：</span>
				<span>{{details.name}}</span>
			</div>
			<div class="conBox">
				<span>仓库所属：</span>
				<span>{{details.ownerName||"--"}}</span>
			</div>
			<div class="conBox">
				<span>仓库地址：</span>
				<span>{{details.provinceName}} {{details.cityName}} {{details.townName}} {{details.place}}</span>
			</div>
		</div>
	</win>
</template>
<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				details: ''
			};
		},
		props: ['width', 'height', 'title', 'wid'],
		methods: {
			async init() {
				let data = await http.warehouseGetWarehouse({
					data: {
						id: this.wid
					}
				});
				let res = await
				import ( /*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn');
				let areaCn = res.default;
				data.provinceName = areaCn.getNameByCode(data.province);
				data.cityName = areaCn.getNameByCode(data.city);
				data.townName = areaCn.getNameByCode(data.town);
				this.details = data;
			},
			winEvent(str) {
				this.$emit('winEvent', str);
			}
		},
		mounted() {
			this.init();
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win')
		}
	};
</script>
<style lang="less" scoped>
	#tan {
		height: 100%;
		padding: 10px 60px;
		background-color: #eeeeee;
		.conBox {
			margin-top: 20px;
			span {
				font-size: 16px;
				display: inline-block;
				vertical-align: top;
				&:last-child {
					width: 70%
				}
			}
		}
	}
</style>