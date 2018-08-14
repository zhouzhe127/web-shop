<template>
	<div>
		<win :align="'center'" :height="556" :width="700" :ok="btnOk" :cancel="btnCancel" @winEvent="closeSelfWin">
			<span slot="title">同步品牌下的所有口味</span>
			<div id="attr_sync" slot="content">
				<ul>
					<template v-for="(item,index) in taste">
						<li :key="index" v-on:click="openAttrDetail(item,index)" v-if="item.checkStatus == 1" style="color: #FA8E2C;">{{item.name}}</li>
						<li :key="index" v-on:click="openAttrDetail(item,index)" v-else>{{item.name}}</li>
					</template>
				</ul>
				<div class="bottom-container">
					<img src="../../../res/icon/ia.png" />
					<h3 class="yellow-h3">橙色部分为本店没有同步部分, </h3>
					<h3 class="gray-h3">灰色部分为本店已和品牌同步部分</h3>
				</div>
			</div>
		</win>

		<component :is="showCom" :pObj="comObj" @throwAttrSyncDetail="closeAttrDetail"></component>

	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				taste: [],
				shopId: null,
				brandId: null,
				showCom: null, //需要展示的组件
				comObj: {},
				btnOk: {},
				btnCancel: {},
			};
		},
		methods: {
			closeSelfWin(res) {
				if (res == 'ok') {
					this.synchronousAttr().then((result) => {
						if (result) {
							this.$emit('throwSyncAttr', 'update');
						}
					});
				} else {
					this.$emit('throwSyncAttr', res);
				}
			},
			openAttrDetail(item) {//,index
				this.showCom = 'sync_detail';
				this.comObj = item;
			},
			closeAttrDetail() {//res
				this.showCom = '';
			},
			initData() {
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
				this.brandId = userData.currentShop.brandId;
			},
			initBtn() {
				this.btnOk = {
					content: '确定同步',
					style: 'background-color:rgb(248, 148, 31)',
				};
				this.btnCancel = {
					content: '暂不同步'
				};
			},
			async getAttrStatus() {
				let res = await http.getAttrStatus({
					data: {
						shopId: this.shopId,
						brandId: this.brandId
					}
				});
				return res;
			},
			async synchronousAttr() {
				let res = await http.synchronousAttr({
					data: {
						shopId: this.shopId,
						brandId: this.brandId
					}
				});
				return res;
			}
		},
		mounted() {
			this.initData();
			this.initBtn();
			this.getAttrStatus().then((res) => {
				this.taste = res;
			});

		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
			sync_detail: () =>
				import ( /*webpackChunkName:'attr_sync_detail'*/ './attr_sync_detail'),
		}
	};
</script>


<!--同步商品-->
<style lang="less" scoped>
	#attr_sync {
		padding: 10px 30px;
		padding-bottom: 60px;
		ul {
			width: 100%;
			height: auto;
			overflow: hidden;
			li {
				min-width: 120px;
				height: 45px;
				line-height: 45px;
				float: left;
				text-align: center;
				cursor: pointer;
			}
		}
		.bottom-container {
			height: 50px;
			position: fixed;
			bottom: 50px;
			z-index: 5;
			border-top: 2px dashed #D9D9D9;
			background-color: #fff;
			width: 90%;
			img {
				width: 20px;
				height: 20px;
				float: left;
				margin: 13px 4px;
			}
			.yellow-h3 {
				height: 50px;
				line-height: 50px;
				color: orange;
				float: left;
			}
			.gray-h3 {
				height: 50px;
				line-height: 50px;
				color: gray;
				float: left;
				margin-left: 10px;
			}
		}
	}
</style>