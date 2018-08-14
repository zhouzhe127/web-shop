/* * @file * * 报表配置 * * @author zhengu.jiang */

<template>
	<div id="employlist">
		<section class="commodity-box">
			<section class="commodityAdd fl" style="height:150px;" v-on:click="add">
				<section class="combox">
					<img src="../../res/images/comadd.png" alt="添加" />
					<h3>添加</h3>
				</section>
			</section>
			<section class="item fl" v-for="(item,index) in list" :key="index">
				<section class="head">
					<section class="mes fl">
						<section class="username">{{item.reportSetName}}</section>
						<section class="job">已选择菜品:&nbsp;{{item.goodsCount}}个</section>
					</section>
					<section class="pos fl">
						<h2 class="posnum">{{index+1}}</h2>
						<section style="height: 50px;line-height: 50px;margin-top: 25px;">
							<span class="edit" v-on:click="edit(item)">编辑</span>
							<span class="edit">|</span>
							<span class="edit" v-on:click="del(item,index)">删除</span>
						</section>
					</section>
				</section>
			</section>
		</section>
		<goods-win @goodListWin="getWin" v-if="getGoods" :goodsIds="goodsIds" :packages="packages" :isGoods=true :goInName="'isSonGoods'"
		    :isCashier=true :reportSetName="reportSetName"></goods-win>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null,
				list: [],
				getGoods: false,
				goodsIds: [],
				packages: [],
				reportSetName: '',
				reportSetId: '', //编辑时当前点击的id
			};
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getList();
		},
		methods: {
			//获取配置列表
			async getList() {
				let res = await http.reportGetlist({
					data: {
						shopId: this.shopId
					}
				});
				this.list = res;
			},
			add() {
				this.getGoods = true;
				this.goodsIds = [];
				this.packages = [];
				this.reportSetName = '';
				this.reportSetId = '';
			},
			edit(item) {
				this.goodsIds = [];
				this.packages = [];
				this.reportSetId = item.reportSetId;
				this.reportSetName = item.reportSetName;
				for (let i = 0; i < item.detail.length; i++) {
					if (item.detail[i].gid != 0) {
						this.goodsIds.push(item.detail[i].gid);
					}
					if (item.detail[i].packageId != 0) {
						this.packages.push(item.detail[i].packageId);
					}
				}
				this.getGoods = true;
			},
			del(item, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							http.reportDeleteSet({
								data: {
									shopId: this.shopId,
									reportSetId: item.reportSetId
								}
							}).then(() => {
								this.list.splice(index, 1);
							});
						}
					}
				});
			},
			getWin(res, item) {
				this.getGoods = false;
				if (res == 'ok') {
					http.reportSetupdate({
						data: {
							shopId: this.shopId,
							reportSetName: item.reportSetName,
							reportSetId: this.reportSetId,
							goods: item.goodArr,
							package: item.packArr
						}
					}).then(() => {
						this.getList();
					});
				}
			},
		},
		components: {
			goodsWin: () =>
				import ( /*webpackChunkName: 'good_list_win'*/ 'src/components/good_list_win')
		}
	};
</script>

<style lang="less" scoped>
	#employlist {
		.item {
			background-color: #eeeeee;
			color: #898989;
			height: 150px;
			.head {
				border-left: 2px solid #026eb7;
				height: 65px;
				width: 100%;
				margin-bottom: 20px;
				.mes {
					width: 198px;
					text-indent: 10px;
					.username {
						height: 50px;
						line-height: 50px;
						font-size: 26px;
						color: #595758;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.job {
						height: 50px;
						line-height: 50px;
						font-size: 18px;
					}
				}
				.pos {
					width: 100px;
					height: 70px;
					line-height: 70px;
					text-align: center;
					.posnum {
						font-size: 48px;
						color: #dddddd;
					}
					.edit {
						display: inline-block;
						color: #00AAE5;
						font-size: 18px;
					}
				}
			}
		}
	}
</style>