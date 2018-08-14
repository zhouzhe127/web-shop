<template>
	<div class="conHeader">
		<div class="conHeaderLeft">
			<ul class="barTitle">
				<li v-for="(item,i) in headerTil" :key="i" @click="goRouter(item.name,i)">{{item.title}}</li>
			</ul>
		</div>
		<div class="conHeaderRight">
			<page-btn v-if='show.length'></page-btn>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		methods: {
			goRouter(name, i) {
				// if(name!==''){
				// 	this.$route.query.o = i;
				// 	this.$router.push({
				// 		path: name,
				// 		query: this.$route.query
				// 	});
				// }
				this.$store.commit('setRunheard', i + 1);
			}
		},
		computed: {
			headerTil: function () {
				return this.$store.state.headerTil;
			},
			show() {
				return Object.keys(this.$store.state.pageTools);
			}
		},
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName:'page_tools_btn'*/ 'src/module/common/page_tools_btn')
		}
	};
</script>
<style lang="less" scoped>
	.conHeader {
		overflow: hidden;
		.conHeaderLeft {
			height: 50px;
			display: inline-block;
			.barTitle {
				overflow: hidden;
				height: 100%;
				li {
					float: left;
					font-size: 16px;
					height: 100%;
					line-height: 50px;
					font-weight: bold;
					color: #909399;
					cursor: pointer;
					&:first-child {
						color: #44404A;
					}
					&::after {
						content: ">";
						margin: 0 2px;
					}
				}
			}
		}
		.conHeaderRight {
			height: 50px;
			float: right;
			vertical-align: top;
			text-align: right;
		} // margin-bottom: 20px;
	}
</style>