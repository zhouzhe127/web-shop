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
		<chargeWin @toWin="toWin" v-if="winShow" :currentDetail="currentShop" @chargeResult="chargeResult"></chargeWin>
		<!--退出弹窗-->
		<win @winEvent="backLogin" v-if="backWin" :align="'center'" :width="500" :height="200" type="primary">
			<!--标题-->
			<span slot="title">退出</span>
			<!--内容-->
			<div slot="content" class="chargeBody">
				<div style="height: 160px;font-size: 18px;color: red;line-height: 28px;padding: 65px 35px;">
					充值已完成，需要重新登录激活店铺状态，点击<span style="color: #47B6E3;font-size: 18px">“确定”</span><br>即可退出登录
				</div>
			</div>
		</win>



	</div>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	export default {
		data(){
			return{
				currentShop:{},
				winShow:false,
				currentDetail:{},
				userData:{},
				backWin:false
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
			chargeResult(res){
				if (res) {
					console.log(this.currentShop);
					this.currentShop.availableState = 0;
					this.userData.currentShop = this.currentShop;
					this.changeShopInfo();
					this.backWin = true
				}
			},
			//缓存数据
			changeShopInfo() {
				let shopList = this.userData.shopList;

				let currentShop = this.currentShop;

				if (currentShop) {
					if (currentShop.ischain == '0') {
						for (let i = 0; i < shopList.noBrand.length; i++) {
							if (currentShop.id == shopList.noBrand[i].id) {
								shopList.noBrand[i] = currentShop;
								shopList.noBrand[i].availableState = 0;
							}
						}
					} else {
						for (let i = 0; i < shopList.brand.length; i++) {
							if (currentShop.brandId == shopList.brand[i].id) {
								if (currentShop.ischain == '1') {
									for (
										let j = 0;
										j < shopList.brand[i].direct.length;
										j++
									) {
										if (
											currentShop.id ==
											shopList.brand[i].direct[j].id
										) {
											shopList.brand[i].direct[
												j
												] = currentShop;
											shopList.brand[i].direct[
												j
												].availableState = 0;
										}
									}
								}
							} else if (currentShop.ischain == '2') {
								for (
									let j = 0;
									j < shopList.brand[i].franchise.length;
									j++
								) {
									if (
										currentShop.id ==
										shopList.brand[i].franchise[j].id
									) {
										shopList.brand[i].franchise[
											j
											] = currentShop;
										shopList.brand[i].franchise[
											j
											].availableState = 0;
									}
								}
							}
						}
					}
					console.log(this.userData, '改变后的');
					storage.session('userShop', this.userData);
				}
			},
			//退出登录
			backLogin: function(res) {
				if(res == 'ok'){
					storage.session(null);
					this.$store.commit('setlogoName', '');
					document.querySelector('body').style.backgroundColor = 'rgb(247,247,247)';
					this.$router.push('/');
				}
				this.backWin = false
			},
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
			this.userData = storage.session('userShop');
			this.currentShop = this.userData.currentShop
			// this.$alert('退出登录，获取最新状态', '退出', {
			// 	confirmButtonText: '退出',
			// 	callback: this.backLogin()
			// });
		},
		components: {
			chargeWin: () => import(/*webpackChunkName: "activate_recharge_win"*/ 'src/module/brand/activate_recharge_win'),
			pageBtn: () =>
				import ( /*webpackChunkName:'page_tools_btn'*/ 'src/module/common/page_tools_btn'),
			win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
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
