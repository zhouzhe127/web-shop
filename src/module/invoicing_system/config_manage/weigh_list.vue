/** * @file * * 称重商品配置 * * @author zhengu.jiang */

<template>
	<div id="weightShop" class="commodity-box">
		<div class="commodityAdd fl" @click="add">
			<div class="combox">
				<img src="../../../res/images/comadd.png" alt="添加" />
				<h3>新建称重商品类型</h3>
			</div>
		</div>

		<div class="item fl commodityAdd" v-for="(item,i) in list" :key="i" @click="detail(item)">
			<div class="head">
				<div class="mes fl">
					<div class="username">{{item.name}}</div>
				</div>
				<div class="pos fl">
					<h3 class="posnum">{{i+1}}</h3>
				</div>
			</div>
			<div class="name">识别码：{{item.code}}</div>
			<div class="foot" v-if="item.status == 0">
				<a href="javascript:void(0);" @click="weighDelete(item.code,i)" class="gray">删除</a>
				<a href="javascript:void(0);" class="yellow" @click="edit(item,i)">编辑</a>
			</div>
		</div>
		<weighwin @detail="getWin" v-if="showWin" :configList="item" :type="pType"></weighwin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null,
				list: [], //配置列表
				showWin: false, //是否显示弹窗
				item: {}, //点击查看详情列表
				pType: -1, //点击弹窗类型 1表示查看详情 2表示新增 3表示编辑
				index: -1, //编辑中记录点击该配置的索引，编辑删除中用到
			};
		},
		methods: {
			//获取列表
			async getList() {
				let res = await http.WeighgoodsGetList({
					data: {
						shopId: this.shopId,
					}
				});
				this.list = res;
			},
			//新增
			add() {
				this.showWin = true;
				this.pType = 2;
			},
			//查看商品
			detail(item) {
				if (item.status == 1) {
					this.item = item;
					this.showWin = true;
					this.pType = 1;
				}
			},
			//编辑
			edit(item, index) {
				this.item = item;
				this.showWin = true;
				this.pType = 3;
				this.index = index;
			},
			//删除
			weighDelete(code, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除?',
					callback: (res) => {
						if (res == 'ok') {
							http.invoicing_delete({
								data: {
									shopId: this.shopId,
									code: code
								}
							}).then(() => {
								this.list.splice(index, 1);
							});
						}
					}
				});
			},
			//弹窗操作
			getWin(res, item) {
				item.shopId = this.shopId;
				item.weightCompany == 0 ? item.weightCompany = 'g' : item.weightCompany = 'Kg';
				if (res == 'ok' && this.pType == 2) { //新增
					http.add({
						data: item
					}).then(() => {
						this.getList();
						this.showWin = false;
					});
				} else if (res == 'ok' && this.pType == 3) { //编辑
					http.edit({
						data: item
					}).then(() => {
						this.getList();
						this.showWin = false;
					});
				} else if (res == 'cancel' && this.pType == 3) { //编辑弹窗中删除
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'confirm',
						content: '确认删除?',
						callback: (res) => {
							if (res == 'ok') {
								http.invoicing_delete({
									data: {
										shopId: this.shopId,
										code: item.code
									}
								}).then(() => {
									this.list.splice(this.index, 1);
									this.showWin = false;
								});
							}
						}
					});
				} else {
					this.showWin = false;
				}

			}
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			this.getList();
		},
		components: {
			weighwin: () =>
				import ( /*webpackChunkName: 'weigh_win'*/ './weigh_win')
		}

	};
</script>

<style lang="less" scoped>
	#weightShop {
		.commodityAdd {
			height: 1.5rem;
			width: 2.8rem;
			cursor: pointer;
			margin-right: 0.1rem;
			margin-bottom: 0.3rem;
			position: relative;
		}
		.item {
			background-color: #F5F6F7;
			color: #898989;
			height: 1.5rem;
			width: 2.84rem;
			position: relative;
			.name {
				margin-top: 0.3rem;
				margin-left: 0.22rem;
				color: #808080;
			}
			.foot {
				position: absolute;
				bottom: 0;
				a {
					height: 0.4rem;
					width: 1.4rem;
					float: left;
					line-height: 0.4rem;
				}
			}
		}
		.head {
			border-left: 4px solid #28A8E0;
			height: 0.55rem;
			width: 100%;
		}
		.mes {
			width: 2rem;
		}
		.username {
			line-height: 0.35rem;
			font-size: 0.2rem;
			color: #595758;
			padding-left: 0.1rem;
		}
		.pos {
			width: 0.6rem;
			height: 0.45rem;
			line-height: 0.55rem;
			text-align: center;
			margin-left: 0.3rem;
		}
		.posnum {
			font-size: 0.48rem;
			color: #dddddd;
		}
		.combox {
			img {
				width: 0.21rem;
				height: 0.21rem;
				margin-bottom: 0.10rem;
			}
			h3 {
				color: #333;
			}
		}
	}
</style>