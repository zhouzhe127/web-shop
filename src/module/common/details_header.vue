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
		<!--续费充值提示-->
		<div class="renew-topUp" v-if="currentShop.availableState === 2">
			<span style="font-size:16px;">当前门店使用权限已到期，可能会影响您正常使用系统，请咨询系统顾问进行续约</span>
			<el-button size="mini" round style="width:80px;" @click="toRecharge">去充值</el-button>
		</div>
		<div class="renew-topUp" v-else-if="currentShop.availableState === 3">
			<span style="font-size:16px;">当前门店使用权限已到期，可能会影响您正常使用系统，请咨询系统顾问进行续约</span>
		</div>

		<!--充值弹窗-->
		<chargeWin @toWin="toWin" v-if="winShow" :currentDetail="currentShop" @changeDetail="changeDetail"></chargeWin>

	</div>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	export default {
		data(){
			return{
				currentShop:{},
				winShow:false
			}
		},
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
			},
			// 调起充值弹窗
			toRecharge(){
				this.winShow  = true
			},
			toWin(res){
				console.log(res);
				this.winShow =false
			},
			changeDetail(data){
				this.currentShop = data.currentShop;
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
		mounted(){
			this.currentShop = storage.session('userShop').currentShop;
		},
		components: {
			chargeWin: () => import(/*webpackChunkName: "activate_recharge_win"*/ 'src/module/brand/activate_recharge_win'),
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
	.renew-topUp{
		width:100%;
		height:40px;
		line-height:40px;
		background-color:#E64E27;
		color:#FFE6C6;
		text-align: center;
		min-width:600px;
		margin-bottom: 10px;
	}
</style>
