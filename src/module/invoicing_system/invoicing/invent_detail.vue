/* * @Author: zhouzhe * @Date: 2018-05-07 17:56:53 */
<template>
	<section class="invendetail">
		<section style="vertical-align: top;">
			<section class="titleTop" style="width:100%;height:40px;overflow: hidden;">
				<div style="width:98%;height:40px;margin:10px;line-height: 40px;position: relative;">
					<i style="width:2px;height:28px;position: absolute;top:6px;left:0;background-color:#28A8E0 ;"></i>
					<h3 style="width:70px;height:40px;margin-left: 10px;float: left;font-size: 16px; font-family: '微软雅黑';">库存详情</h3>
					<div class="dian" v-for="i in 70" :key="i"></div>
				</div>
			</section>
			<section style="height:auto;">
				<div class="other-clist" style="clear: both;">
					<div class="cList-one" style="width:25%;height:auto;">
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">商品名:</h3>
							<div class="shopAfter" v-if="shopGoods.gName" :title="shopGoods.gName">{{shopGoods.gName}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">条形码:</h3>
							<div class="shopAfter" v-if="shopGoods.barCode" :title="shopGoods.barCode">{{shopGoods.barCode}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">品牌:</h3>
							<div class="shopAfter" v-if="shopGoods.brandName">{{shopGoods.brandName}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">序号:</h3>
							<div class="shopAfter" v-if="shopGoods.barCode">{{shopList.index +1}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<!-- <div style="width:100%;height:40px;">
							<h3 class="showBefore">进价:</h3>
							<div class="shopAfter" v-if="shopGoods.cost">{{shopGoods.cost}}</div>
							<div class="shopAfter" v-else>--</div>
						</div> -->
					</div>
					<div class="cList-two" style="width:20%;height:auto;">
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">分类:</h3>
							<div class="shopAfter">{{goodsCate||"--"}}</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">单位:</h3>
							<div class="shopAfter" v-if="shopGoods.unit">{{shopGoods.unit}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">售价:</h3>
							<div class="shopAfter" v-if="shopGoods.price">{{shopGoods.price}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>

						<div style="width:100%;height:40px;">
							<h3 class="showBefore">批次数:</h3>
							<div class="shopAfter">{{shopGoods.batchNum||0}}</div>
						</div>
					</div>
					<div class="cList-three" style="width:33%;height:auto;">
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">规格:</h3>
							<div class="shopAfter" v-if="shopGoods.specifications">{{shopGoods.specifications}}</div>
							<div class="shopAfter" v-else>--</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">保质期:</h3>
							<div class="shopAfter" v-if="shopGoods.validity">
								{{shopGoods.validity}}
								<span v-if="shopGoods.validityType==1">日</span>
								<span v-if="shopGoods.validityType==0">月</span>
								<span v-if="shopGoods.validityType==2">年</span>
							</div>
							<div class="shopAfter" v-else>--</div>
						</div>

						<div style="width:100%;height:40px;">
							<h3 class="showBefore">耗损:</h3>
							<div class="shopAfter">{{shopGoods.lossNum}}</div>
						</div>
						<div class="cList-five" style="height:auto;">
							<div style="width:100%;" class="clearfix ">
								<h3 class="showBefore">货架位置:</h3>
								<section class="clearfix" style="float: left;width: 70%;" v-if="shopGoods&&shopGoods.shelves.length>0">
									<template v-for="(item,index) in shelvesGoods">
										<div style="position: relative;width: 100%;overflow: hidden;padding-right: 20px;" :key="index">
											<span class="shopAfter" style="display: inline-block;min-width:130px">{{item.shelfName||"暂无"}}/{{item.areaName||"暂无"}}</span>
											<span @click="shelfModify(index,item)" class="modify" v-if="!soldShow&&!loseShow">修改</span>
											<img src="../../../res/icon/icondelete.png" v-if="shelvesGoods.length != 1 &&!soldShow&&!loseShow" @click="delNum(item,index)"
											/>
										</div>
									</template>
								</section>
								<div class="shopAfter" v-else>--</div>
							</div>
						</div>
					</div>

					<div class="cList-four" style="width:20%;height:auto;">
						<!-- <div style="width:100%;height:40px;">
							<h3 class="showBefore">仓库位置:</h3>
							<section class="clearfix" style="padding-left: 70px;">
								<div>
									<span class="shopAfter" style="display: inline-block;">{{wareAll.wareName}}/{{wareAll.areaName}}</span>
								
									<span @click="wareModify" class="modify">修改</span>
								</div>
							</section>
						</div> -->
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">仓存数量/重量:</h3>
							<div class="shopAfter">{{addCount(shopGoods.surplus)}}{{shopGoods.unit}}</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">上架数量:</h3>
							<div class="shopAfter">{{addCount(shelveNum)}}{{shopGoods.unit}}</div>
						</div>
						<div style="width:100%;height:40px;">
							<h3 class="showBefore">总量:</h3>
							<div class="shopAfter">{{addCount(shopGoods.total)}}{{shopGoods.unit}}</div>
						</div>

					</div>
				</div>
			</section>
		</section>
		<section style="display: block;margin-top:20px;" v-if="!soldShow&&!loseShow">
			<!-- <section class="titleTop" style="width:100%;height:40px;overflow: hidden;">
				<ul class="tebBox">
					<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
				</ul>
			</section> -->
			<section class="listBox" style="width:100%;height:auto;margin-top: 20px;">
				<com-table :listName="'批次列表'" :titleData="titleList" :allTotal="allList.length" :introData="newbatchDetail">
					<div class="infoDetail" slot="con-0" slot-scope="props">
						<a href="javascript:void(0);" @click="addDetailhouse(props.data,1)" style="color:#5ebee8;">入库</a>|
						<a href="javascript:void(0);" @click="batchLose(props.data)" style="color:red;">耗损</a>
						<!-- <a href="javascript:void(0);" @click="revamp(props.data)" style="color:orange;">修改</a> -->
					</div>
					<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
					<span slot="con-3" slot-scope="props">{{getTime(props.data.productionTime)}}</span>
					<span slot="con-5" slot-scope="props">{{props.data.surplus}}{{shopGoods.unit}}</span>
					<span slot="con-7" slot-scope="props">{{props.data.wName||"暂无"}}/{{props.data.aName||"暂无"}}</span>
				</com-table>
			</section>
			<!-- <operating-record v-if="tabactive==1" :gid="shopList.id"></operating-record> -->
			<div style="margin-top:10px;padding-bottom:30px;">
				<page-turn :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page" @pageNum="changePage"
				    ref="pageTurn"></page-turn>
			</div>
		</section>

		<warehouse-win ref="warehouse" :title="winTitle" :wareType="wareType" v-if="wareshow" @wareEvent="wareEvent"></warehouse-win>
		<putaway-win v-if="putawayshow" ref="putaway" :goods="shopGoods" :list="allList" :wareGoods="wareGoods" @putawayEvent="putawayEvent"></putaway-win>
		<invent-soldout @soldBack="soldBack" :allNum="shelveNum" :detail="shopGoods" :gid="shopList.id" v-if="soldShow"></invent-soldout>
		<lose-manage v-if="loseShow" :detail="loseItem" :gid="shopList.id" @loseBack="loseBack"></lose-manage>
	</section>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				shopGoods: '',
				shopList: '',
				shopId: '',
				allList: '', //列表数据
				newbatchDetail: '', //每页数据
				wareAll: '',
				awayAll: '', //上架数据
				shelvesGoods: '', //货架位置
				wareNum: '',
				total: '', //总量
				times: '', //批次数
				pageTotal: 0,
				page: 1,
				num: 10,
				wareshow: false,
				storageshow: false,
				putawayshow: false,
				wareType: 0,
				winTitle: '',
				chooseShelf: '', //选择的货架
				shelfIndex: null,
				tebData: ['批次列表', '操作记录'],
				// tabactive: 0,
				goodsCate: [], //分类
				soldShow: false,
				shelveNum: 0,
				loseShow: false,
				loseItem: '',
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '200px'
					}
				},
				{
					titleName: '序号',
					titleStyle: {
						width: '50px'
					}
				},
				{
					titleName: '批次编码',
					dataName: 'batchCode'
				},
				{
					titleName: '生产日期'
				},
				{
					titleName: '供应商',
					dataName: 'supplier'
				},
				{
					titleName: storage.session('goodsDetail').type == 1 ? '重量' : '数量'
				},
				{
					titleName: '进价',
					dataName: 'purchasePrice'
				},
				{
					titleName: '所属仓库'
				}],
			};
		},
		methods: {
			async init() {
				//获取详情
				let data = await http.getDetails({
					data: {
						gid: this.shopList.id
					}
				});
				console.log(data);
				this.shopGoods = data;
				this.shelvesGoods = data.shelves;
				this.shelveNum = data.shelveNum;
				this.goodsCate = [];
				for (let item of this.shopGoods.cate) {
					this.goodsCate.push(item.name);
				}
				this.goodsCate = this.goodsCate.join(',');
				console.log(this.shopList);
				this.wareGoods = this.shopGoods.shelves;
				this.shopGoods.lossNum = this.shopGoods.lossNum;
				//获取详情列表
				let list = await http.getGoodsBatch({
					data: {
						gid: this.shopList.id
					}
				});

				this.allList = list.list;
				console.log(this.shopList);
				console.log(list);
				this.resetGoods();
			},
			resetGoods: function () {
				this.pageTotal = Math.ceil(this.allList.length / this.num);
				this.newbatchDetail = this.allList.slice(
					(this.page - 1) * 10,
					(this.page - 1) * 10 + 10
				);
			},
			wareModify: function () {
				this.wareshow = true;
				this.wareType = 0;
				this.winTitle = '仓库选择';
			},
			addDetailhouse: function (list, type) {
				console.log(list);
				this.$route.query.gid = this.shopList.gid;
				this.$route.query.batchId = list.batchId;
				this.$route.query.isStatus = type;
				storage.session('goodsneed', list);
				this.$router.push({
					path: 'putStroage',
					query: this.$route.query
				});
			},
			revamp(list) {
				this.addDetailhouse(list, 2);
			},
			batchLose: function (list) {
				this.loseShow = true;
				this.loseItem = list;
				this.$store.commit('setPageTools', []);
			},
			shelfModify: function (index, item) {
				this.wareType = 1;
				this.wareshow = true;
				this.winTitle = '货架选择';
				this.shelfIndex = index;
				this.chooseShelf = item;
			},
			delNum(item, index) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确定删除',
					callback: async res => {
						console.log(res);
						if (res == 'ok') {
							let resole = await http.invent_deleteShelves({
								data: {
									goodsId: this.shopList.gid,
									areaId: item.areaId
								}
							});
							if (resole) {
								this.$store.commit('setWin', {
									title: '提示信息',
									winType: 'alert',
									content: '货架删除成功'
								});
								this.wareGoods.splice(index, 1);
							} else {
								this.$store.commit('setWin', {
									title: '提示信息',
									winType: 'alert',
									content: '操作失败'
								});
							}
						}
					}
				});
			},

			addCount: function (num) {
				if (!num) return 0;
				num += '';
				//清除字符串开头的0
				if (/^0+/.test(num)) num = num.replace(/^0+/, '');
				//为整数字符串在末尾添加.000
				if (!/\./.test(num)) num += '.000';
				//字符以.开头时,在开头添加0
				if (/^\./.test(num)) num = '0' + num;
				num += '000'; //在字符串末尾补零
				num = num.match(/([+-]?)\d+\.\d{3}/)[0];
				return num;
			},
			changePage: function (currentPage) {
				this.page = currentPage.page;
				this.newbatchDetail = this.allList.slice(
					(this.page - 1) * 10,
					(this.page - 1) * 10 + 10
				);
			},
			wareEvent(str) {
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			async wareClose() {
				let wareWin = this.$refs.warehouse;
				if (!wareWin.chooseWare) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请选择区域'
					});
					this.wareshow = true;
					return false;
				}
				for (let item of this.shelvesGoods) {
					if (wareWin.chooseWare.id == item.areaId) {
						this.$store.commit('setWin', {
							title: '提示信息',
							winType: 'alert',
							content: '该商品已经和该区域关联'
						});
						this.wareshow = true;
						return false;
					}
				}
				await http.invent_editShelves({
					data: {
						goodsId: this.shopList.gid,
						oldAreaId: this.chooseShelf.areaId,
						areaId: wareWin.chooseWare.id
					}
				});
				this.chooseShelf.shelfName = wareWin.searchList[wareWin.homeSel].name;
				this.chooseShelf.areaName = wareWin.chooseWare.name;
				this.chooseShelf.areaId = wareWin.chooseWare.id;
			},
			putawayEvent(str) {
				this.putawayshow = false;
				if (str == 'ok') {
					this.putawayClose();
				}
			},
			getString(arr) {
				if (typeof arr == 'string') return arr;
				return arr.join(',');
			},
			async putawayClose() {
				let putData = this.$refs.putaway;
				let awayList = [];
				if (putData.willAway == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请选择货架'
					});
					this.putawayshow = true;
					return false;
				}
				if (putData.indexArr.length == 0) {
					return false;
				}
				let obj = {
					gid: this.shopList.gid,
					shelfId: putData.willAway.shelfId,
					areaId: putData.willAway.areaId
				};
				// let allNum = 0;
				for (let i = 0; i < putData.indexArr.length; i++) {
					let listObj = new Object();
					let numIndex = putData.indexArr[i];
					// listObj.gid = putData.searList[numIndex].gid;
					listObj.wid = putData.searList[numIndex].wid;
					listObj.areaId = putData.searList[numIndex].areaId;
					listObj.batchId = putData.searList[numIndex].batchId;
					// listObj.gid = this.shopList.gid;
					listObj.num = putData.awayNum[numIndex];
					// listObj.shelfId = putData.willAway.wid;
					// listObj.sAreaId = putData.willAway.areaId;
					// allNum += Number(putData.awayNum[numIndex]);
					awayList.push(listObj);
				}
				obj.batchList = JSON.stringify(awayList);
				putData.willAway.id = putData.willAway.areaId;
				let data = await http.inventoryPutAway({
					data: obj
				});
				if (data) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '上架成功'
					});
					if (putData.checkPush) this.wareGoods.push(putData.willAway);
					this.init();
				}
				//获取详情列表
				// let list = await http.getBatchByGid({
				//     data: { gid: this.shopList.id, shopId: this.shopId }
				// });
				// debugger
				// this.allList = list;
			},
			// tebClick(index) {
			// 	this.tabactive = index;
			// },
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			handBtn() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['back'],
					fn: () => {
						storage.session('tabactive', 0);
						window.history.go(-1);
					}
				},
				{
					name: '下架',
					className: ['wearhouse create'],
					fn: () => {
						this.soldShow = true;
						this.$store.commit('setPageTools', []);
					}
				},
				{
					name: '上架',
					className: ['wearhouse handle'],
					fn: () => {
						this.putawayshow = true;
					}
				}]);
			},
			soldBack(res) {
				if (res) {
					console.log(res);
					this.shelveNum = res.shelfAmount;
					this.init();
				} else {
					this.soldShow = false;
					this.handBtn();
				}
			},
			loseBack(res) {
				if (res) {
					this.init();
				} else {
					this.loseShow = false;
					this.handBtn();
				}
			}
		},
		mounted: function () {
			this.shopList = storage.session('goodsDetail');
			this.shopId = storage.session('itemId');
			this.handBtn();
			this.init();
		},
		components: {
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			warehouseWin: () =>
				import ( /*webpackChunkName: 'warehouse_win'*/ './warehouse_win'),
			putawayWin: () =>
				import ( /*webpackChunkName: 'putaway_win'*/ './putaway_win'),
			// operatingRecord: () =>
			// 	import ( /*webpackChunkName: 'operating_record'*/ './operating_record'),
			inventSoldout: () =>
				import ( /*webpackChunkName: 'invent_soldout'*/ './invent_soldout'),
			loseManage: () =>
				import ( /*webpackChunkName: 'lose_manage'*/ './lose_manage'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
		}
	};
</script>
<style lang="less" scoped>
	// @media only screen and (max-width:1400px) {
	//     .other-clist{
	//         transform: scale(0.85);
	//         transform-origin: 0;
	//     }
	// }
	.infoDetail {
		display: inline-block;
		display: flex;
		a {
			display: inline-block;
			width: 50%;
			text-align: center;
		}
	}

	.invendetail .showBefore {
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		float: left;
		text-align: right;
		color: #333;
		margin-right: 5px;
	}

	.invendetail .shopAfter {
		font-size: 16px;
		max-width: 75%;
		height: 40px;
		line-height: 40px;
		text-align: left;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.invendetail .shopAfter span {
		font-size: 16px;
	}

	.invendetail .cList {
		font-size: 16px;
		width: 100%;
		padding-left: 7%;
	}

	.invendetail .other-clist {
		font-size: 16px;
		overflow: hidden;
		width: 100%;
		min-width: 825px;
		padding-left: 4%;
	}

	.cList-one,
	.cList-two,
	.cList-three,
	.cList-four {
		display: inline-block;
		vertical-align: top;
	}

	.dian {
		width: 10px;
		height: 1px;
		border-top: 1px solid #e1e1e1;
		margin: 20px 5px;
		float: left;
	}

	.modify {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		text-decoration: underline;
		color: #ffac32;
		vertical-align: top;
		cursor: pointer;
	}

	.shopAfter {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.clearfix:after {
		content: "";
		display: block;
		clear: both;
	}

	.clearfix img {
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		top: 11px;
		margin: auto;
		cursor: pointer;
	}

	.infoDetail {
		display: inline-block;
		display: flex;
		a {
			display: inline-block;
			width: 50%;
			text-align: center;
		}
	}

	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}

	// .tebBox {
	// 	display: inline-block;
	// 	color: orange;
	// 	cursor: pointer;
	// 	li {
	// 		border: 1px orange solid;
	// 		display: inline-block;
	// 		padding: 10px 30px;
	// 	}
	// 	.active {
	// 		background-color: orange;
	// 		color: #ffffff;
	// 	}
	// }
</style>