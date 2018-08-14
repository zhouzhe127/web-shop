<template>
	<div>
		<win :align="'right'" :width="550" :height="550" @winEvent="closeSelfWin">
			<span slot="title">编辑标识</span>
			<div id="marker_add" slot="content">
				<p class="title">
					<span class="base-info">基本信息
						<span class="split-line"></span>
					</span>
				</p>
				<p class="tagName">名称：{{pObj.flag}}</p>
				<div class="tag-num">
					<span style="font-size: 16px"> 口味成度：
						<span v-for="count in markerNum" :key="count">
							<img src="../../../res/icon/goods-tag-three.png" alt="星星图片" v-if="pObj.markerType===1" class="img">
							<img src="../../../res/icon/goods-tag-one.png" alt="点赞图片" v-if="pObj.markerType===2" class="img">
							<img src="../../../res/icon/goods-tag-two.png" alt="辣椒图片" v-if="pObj.markerType===3" class="img">
						</span>
					</span>
				</div>
				<div class="relative-good">
					<span class="goods">关联商品：</span>
					<div v-on:click="openRelativeGoods" class="addGoods">
						<img src="../../../res/images/add.png" alt="添加" />
						<h3>添加关联商品</h3>
					</div>
					<span class="info">
						(已关联商品{{this.goodsIds.length+''}}个， 套餐{{this.packageIds.length+''}}个)
					</span>
				</div>
			</div>
		</win>

		<component :is="showCom" :pGoodsList="comObj" @throwGoodListWin="closeRelativeGoods"></component>

	</div>

</template>
<script>
	/*
	    1)关联商品:只显示上架的普通菜品，斤两菜品，多规格主菜

	*/
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				showCom: null, //是否展示组件
				goodsList: null, //全部的商品
				markerNum: 0, //口味程度
				comObj: {}, //需要传递的数据
				relativeGoods: 0, //关联的商品数
				relativePack: 0, //关联的套餐数
				shopId: null,


				falGoodIds: [], //需要过滤的商品
				falPackageIds: [], //需要过滤的套餐

				goodsIds: [], //需要提交的关联商品Id
				copyGoodsIds: [], //副本

				packageIds: [], //需要提交的关联套餐id
				copyPackageIds: [], //副本 
			};
		},
		props: {
			pObj: null,
			/*
			        markerNum:tag.markerNum,    //当前编辑的子标识程度
			        id:tag.id,                  //当前编辑的标识id
			        shopId:this.shopId,         //店铺Id
			        flag:tag.tagName,           //标识名
			        markerType:this.markerId    //当前编辑的子标识的id
			*/
		},
		methods: {
			//展示弹窗-------添加关联商品
			openRelativeGoods() {
				this.showCom = 'goodList';
				let goods = [];
				// 只显示普通菜品，斤两菜品，多规格主菜
				this.goodsList.forEach((ele) => {
					if (ele.status == 0 || ele.status == 1) {
						if ((ele.type == 0 && !Number(ele.isGroup) && !Number(ele.groupId)) || (ele.type == 1) || (ele.isGroup == 1 &&
								!Number(ele.groupId))) {
							goods.push(ele);
						}
					}
				});
				this.comObj = {
					selGoods: this.goodsIds,
					delGoods: this.falGoodIds,
					selPack: this.packageIds,
					delPack: this.falPackageIds,
					goodsList: goods,
					type: 0
				};
			},
			//获取弹窗--------获取添加关联商品
			closeRelativeGoods(res, obj) {
				this.showCom = '';
				this.relativeGoods = obj.goodArr.length;
				this.relativePack = obj.packArr.length;
				this.goodsIds = [];
				this.packageIds = [];
				obj.goodArr.forEach((ele) => {
					this.goodsIds.push(ele.id);
				});
				obj.packArr.forEach((ele) => {
					this.packageIds.push(ele.id);
				});

			},
			//获取弹窗--------本弹窗
			closeSelfWin(res) {
				if (res == 'ok') {
					if (this.checkData()) {
						this.$emit('throwAddWin', 'same');
					} else {
						this.addMarker().then((ret) => {
							this.$emit('throwAddWin', 'edit', ret);
						});
					}
				} else {
					this.$emit('throwAddWin', 'close');
				}
			},
			//保留副本,返回数据的副本
			copyData(arr) {
				// if (!arr instanceof Array) throw new Error('arr不是数组');
				let temp = null;
				temp = JSON.stringify(arr);
				temp = JSON.parse(temp);
				return temp;
			},
			//格式化数据
			formatData(str) {
				let temp = null;
				if (!str) return [];
				temp = str.split(',');
				return temp;
			},
			funSortArr(arr) {
				let temp = [];
				temp = arr.sort((x, y) => {
					return x - y;
				});
				return temp;
			},
			//校验数据
			checkData() {
				let flag = true;
				if (this.copyGoodsIds.length == this.goodsIds.length) {
					for (let i = 0, len = this.copyGoodsIds.length; i < len; i++) {
						if (this.copyGoodsIds[i] != this.goodsIds[i]) {
							flag = false;
							break;
						}
					}
				} else {
					flag = false;
				}
				if (flag && (this.copyPackageIds.length == this.packageIds.length)) {
					for (let i = 0, len = this.copyPackageIds.length; i < len; i++) {
						if (this.copyPackageIds[i] != this.packageIds[i]) {
							flag = false;
							break;
						}
					}
				} else {
					flag = false;
				}
				return flag;
			},
			async getGoodsMarker() {
				let res = await http.getGoodsMarker({
					data: {
						id: this.pObj.id,
						shopId: this.pObj.shopId
					}
				});
				return res;
			},
			async addMarker() {
				let res = await http.addMarker({
					data: {
						id: this.pObj.id,
						shopId: this.pObj.shopId,
						goodsIds: this.goodsIds.join(','),
						packageIds: this.packageIds.join(',')
					}
				});
				return res;
			},
			//获取商品
			async getGoods() {
				let goods = null;
				let temp = await http.getGoodsList({
					data: {
						shopId: this.shopId,
						page: 1,
						num: 9999,
						specification: 1
					}
				});
				goods = temp.list;
				storage.session('goodList', goods);
				return goods;
			},
			async getGoodsList(flag, goodVer) {
				let goods = null;
				if (flag) {
					goods = await this.getGoods();
				} else {
					let httpGoodVersion = storage.session('httpGoodVersion');
					if (!httpGoodVersion) {
						goods = await this.getGoods();
					} else {
						if (httpGoodVersion.goodsConfigVer == goodVer) {
							goods = storage.session('goodList');
							if (!goods) goods = await this.getGoods();
						} else {
							goods = await this.getGoods();
						}
					}
				}
				return goods;
			},
			//获取版本号
			async ShopGetExtra() {
				let res = await http.ShopGetExtra({
					data: {}
				});
				return res;
			},
			initData() {
				this.shopId = this.pObj.shopId;
				this.markerNum = this.pObj.markerNum;
			},
			async syncRequest() {
				let res = await this.ShopGetExtra();
				let goods = await this.getGoodsList(false, res.goodsConfigVer);
				this.goodsList = goods;
				storage.session('httpGoodVersion', res);
			},
		},
		mounted() {
			this.initData();
			if (this.pObj.id) this.getGoodsMarker().then((res) => {
				this.goodsIds = this.formatData(res.realGoodIds);
				this.falGoodIds = this.formatData(res.falGoodIds);
				this.packageIds = this.formatData(res.realPackageIds);
				this.falPackageIds = this.formatData(res.falPackageIds);

				this.copyGoodsIds = this.copyData(this.goodsIds);
				this.copyPackageIds = this.copyData(this.packageIds);

			});

			this.syncRequest();
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
			goodList: () =>
				import ( /* webpackChunkName:'good_package_win' */ '../common/good_package_win'),

		}
	};
</script>
<style scoped lang="less">
	#marker_add {
		margin-top: 20px;
		margin-left: 10px;
		font-size: 15px;
		.addGoods {
			width: 170px;
			height: 35px;
			background-color: #29A7E1;
			cursor: pointer;
			float: left;
			margin-left: 8px;
			img {
				width: 22px;
				height: 22px;
				margin-top: 7px;
				margin-left: 30px;
				float: left;
			}
			h3 {
				width: 100px;
				height: 35px;
				line-height: 35px;
				color: #fff;
				text-align: center;
				float: left;
			}
		}
		.title {
			border-left: 3px solid #F1801A;
			.base-info {
				font-size: 19px;
				margin-left: 20px;
			}
			.split-line {
				width: 430px;
				border: 0.1px dashed #949494;
				display: inline-block;
				vertical-align: middle;
			}
		}
		.tagName {
			margin-top: 30px;
			margin-left: 25px;
		}
		.tag-num {
			margin-top: 20px;
			margin-left: 25px;
			.img {
				vertical-align: middle;
			}
		}
		.relative-good {
			margin-top: 30px;
			margin-left: 25px;
			.goods {
				float: left;
				font-size: 16px;
				margin-top: 5px;
			}
			.info {
				float: left;
				margin-top: 10px;
				margin-left: 5px;
			}
		}
	}

	// #marker_add {
	//     margin-top: 20px;
	//     margin-left: 10px;
	//     font-size: 15px
	// }
	// #marker_add .addGoods {
	//     width: 170px;
	//     height: 35px;
	//     background-color: #29A7E1;
	//     cursor: pointer;
	//     float: left;
	//     margin-left: 8px;
	// }
	// #marker_add .addGoods img {
	//     width: 22px;
	//     height: 22px;
	//     margin-top: 7px;
	//     margin-left: 30px;
	//     float: left;
	// }
	// #marker_add .addGoods h3 {
	//     width: 100px;
	//     height: 35px;
	//     line-height: 35px;
	//     color: #fff;
	//     text-align: center;
	//     float: left;
	// }
</style>