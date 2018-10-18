<template>
	<!--打印机配置列表-->
	<section class="fl user-content" id="printercon" style="width: 100%;">
		<section class="user-info">
			<div class="button" @click="addColor">
				<a href="javascript:void(0);" class="select">全部</a>
				<a href="javascript:void(0);">饿了么</a>
				<a href="javascript:void(0);">美团</a>
				<a href="javascript:void(0);">百度</a>
			</div>

			<section class="commodity-box">
				<section class="commodityAdd fl" v-on:click="openWin({pid:null, types:'addPcon', index:null})">
					<section class="combox">
						<img src="../../../res/images/comadd.png" alt="添加" />
						<h3>新建打印机配置</h3>
					</section>
				</section>

				<section class="fl box" v-for="(pList,index) in conList" :key="index" v-if="allkind||pList.areaIds == show " 
					@click="openWin({pid: pList.id, types: 'edit', index: index, status: pList.authStatus})">
					<section class="bor">
						<section class="fl" style="width: 100%;text-indent: 10px;">
							<section class="spanFont">单据数据：
								<span class="spanFont">{{pList.orderName}}</span>
							</section>
							<section class="spanFont">打印机：
								<span class="spanFont">{{pList.printerName}}</span>
							</section>
						</section>
					</section>

					<section class="bat" v-if="takeoutList[pList.areaIds] == 0">
						<span @click.stop="addWarrant(pList.areaIds,$event)">激活授权</span>
					</section>
					<section class="bated" v-else></section>

				</section>
				<!-- <section v-if="showMt">
					<div id="mask_14981027179151314207" class="win-mask"></div>
					<div @click="cancel" class="win center" style="width: 1000px;height: 800px;">
						<iframe style="width: 1000px;height: 800px;" id="child" v-bind:src="urlData"></iframe>
					</div>
				</section> -->
				<meiTuan-warrant v-if="showMt" @show="hidden" :urlData="urlData"></meiTuan-warrant>
			</section>
		</section>
		<div class="loading" v-if="turn">
			<img src="../../../res/images/preloader.gif" />
		</div>
		<transition name="fade">
			<component :is="showCom" :pObj="comObj" @toClick="getReturnInfo"></component>
		</transition>
		<!-- <print-win :pid="postFirstPid" :types="postFirstTypes" :index="postFirstIndex" v-if="showBounced" :title="title"></print-win> -->
	</section>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			userData: {},
			shopId: '',
			brandId: '',
			conList: [], //列表数据
			editType: '', //是否为修改
			urlData: '', //外卖URL
			showMt: false,
			goods: '', //所有菜品
			category: '', //所有菜品分类
			erpDishData: {
				dishes: []
			}, //本地菜品数据整理发送给美团
			authoriseList: [],
			takeoutList: {}, //存储美团或者饿了吗是否授权
			turn: false,
			allkind: true,
			show: null,
			showBounced: false, //一级弹框的显示
			postFirstPid: null, //传给一级弹框的id
			postFirstTypes: null, //传给一级弹框的types
			postFirstIndex: null, //传给一级弹框的index
			title: null, //一级弹框的title
			showCom: '',
			comObj: {}
		};
	},
	methods: {
		hidden: function(res) {
			this.showMt = res;
		},
		//修改选项卡颜色
		addColor: function(e) {
			let chooseState = document.querySelectorAll(
				'#printercon .button a'
			);
			if (
				e.target.nodeType === 1 &&
				e.target.nodeName.toLocaleLowerCase() === 'a'
			) {
				for (let i = 0; i < chooseState.length; i++) {
					if (chooseState[i] === e.target) {
						if (i == 0) {
							this.allkind = true;
							this.show = null;
						} else if (i == 1) {
							this.show = 1;
							this.allkind = false;
						} else if (i == 2) {
							this.show = 2;
							this.allkind = false;
						} else if (i == 3) {
							this.show = 3;
							this.allkind = false;
						}
					}
					chooseState[i].removeAttribute('class');
				}
				e.target.className = 'select';
			}
		},
		async init() {
			//请求打印机配置列表
			this.turn = true;
			let res = await http.takeoutprintGetList({ data: {} });
			let temp = res;
			let data = await http.takeoutGetTakeOutList({
				data: {
					brandId: this.brandId
				}
			});

			data.forEach(item => {
				this.takeoutList[item.id] = item.status;
			});
			this.authoriseList = data;
			this.conList = temp;
			this.turn = false;
		},
		openWin: function({pid, types, index, status}) {
			if (status == 0) {
				return false;
			}
			// this.showBounced = true;
			if (types == 'addPcon') {
				this.title = '新建打印机配置';
			} else if (types == 'edit') {
				this.title = '修改打印机配置';
			}
			this.postFirstPid = pid;
			this.postFirstTypes = types;
			this.postFirstIndex = index;
			this.showCom = 'printWin';
			this.comObj = {
				postFirstPid: this.postFirstPid,
				postFirstTypes: this.postFirstTypes,
				postFirstIndex: this.postFirstIndex,
				title: this.title
			};
		},
		async getReturnInfo(res) {
			// if (cancelStatus) {
			// 	setTimeout(async () => {
			// 		await this.init();
			// 	}, 2000);
			// 	return;
			// }
			if(res!='close'){
				await this.init();
			}
			this.showCom = '';
		},
		//授权
		async addWarrant(id, e) {
			if (id != 2) {
				//饿了么授权
				//弹出空白窗口，防止浏览器拦截
				sessionStorage.setItem('waimai', id);
				let eleme = window.open('', 'newWindow');
				let res = await http.getAuthorizationUrl({
					data: {
						type: id,
						brandId: this.brandId,
						shopId: this.userData.currentShop.shopId
					}
				});
				eleme.location = res;
				let index = 0;
				// 每3秒一次请求心跳
				let timer = setInterval(async () => {
					index += 1;
					let info = await http.getReturnInfo({
						data: {
							type: id
						}
					});
					if (info == 1) {
						this.init();
						clearInterval(timer);
						let url = window.location.href;
						eleme.location = url;
						this.getShopList();
					} else if (info == 0) {
						eleme.close();
						clearInterval(timer);

						this.$store.commit('setWin', {
							content: '授权失败'
						});
					}
					if (index > 60) {
						eleme.close();
						this.init();
						clearInterval(timer);
					}
				}, 3000);
			} else if (id == 2) {
				e.stopPropagation();
				//美团授权
				let localUrl = window.location.href;

				//获取本地菜品，与美团菜品关联
				this.getGoods();
				//获取美团授权链接
				let res = await http.getAuthorizationUrl({
					data: {
						type: id,
						brandId: this.brandId,
						shopId: this.userData.currentShop.id
					}
				});
				this.urlData = res + '&' + 'eOrigin' + '=' + localUrl;
				this.showMt = true;
			}
		},
		//获取门店所有菜品，分类
		async getGoods() {
			// 请求商品列表
			let res = await http.getAllGoods({
				data: {
					page: 1,
					num: 9999,
					shopIds: this.userData.currentShop.id
				}
			});
			this.goods = res;
			// 请求分类列表
			let info = await http.getAllCategory({
				data: {
					shopIds: this.userData.currentShop.id
				}
			});
			this.category = info;
			//将本地菜品数据格式化，传给美团
			for (let i = 0; i < this.goods.length; i++) {
				let obj = {
					categoryName: '',
					eDishCode: '',
					eDishSkuCode: '',
					dishNameWithSpec: ''
				};
				for (let j = 0; j < this.category.length; j++) {
					if (this.goods[i].cids[0] == this.category[j].id) {
						obj.categoryName = this.category[j].name;
						obj.eDishSkuCode = this.goods[i].id;
						obj.eDishCode = this.goods[i].id;
						obj.dishNameWithSpec = this.goods[i].goodsName;
						this.erpDishData.dishes.push(obj);
					}
				}
			}
		},
		//点击弹框，阻止冒泡
		cancel: function(e) {
			e.stopPropagation();
		},
		async getShopList() {
			storage.session('takeaway_shop_cObj', null);
			storage.session('takeaway_shop_list', null);
			let shopArr,id,chain;
			if (storage.session('takeaway_select_data')) {
				shopArr = storage
					.session('takeaway_select_data')
					.split('_');
				id = shopArr[0];
				chain = shopArr[1];
			}
			let res = await http.getTakeOutShoplist({
				data: {
					shopId: id,
					id: id,
					ischain: chain
				}
			});
			storage.session('takeaway_shop_list', res);
		},
		listeningAuthorized: function() {
			//监听授权
			window.onmessage = async e => {
				let erpDishData = this.erpDishData;
				if (e.data.event == 'msg-token') {
					//绑定门店成功，获取外卖门店id，name
					let res = await http.addMeituanShopRelation({
						data: {
							shopId: this.userData.currentShop.id,
							brandId: this.brandId,
							mtShopId: e.data.value.poiId,
							mtShopName: e.data.value.poiName
						}
					});
					if(res){
						this.init();
					}
				} else if (e.data.event == 'finish-storebind') {
					//点击UI SDK完成按钮
					this.showMt = false;
				} else 
				// if (e.data.event == 'redirect-waimai-dish-map') {
				// } else 
				if (e.data.event == 'setPrinter') {
					//配置打印机按钮
					window.location.reload();
				} else if (e.data.event == 'cancelSetPrinter') {
					//暂不配置打印机按钮
					this.showMt = false;
				} else if (e.data.event == 'getErpDishData') {
					//本地菜品数据传给美团进行映射
					e.source.postMessage(
						{
							event: 'erpDishData',
							value: erpDishData
						},
						'*'
					);
				} else if (e.data.event == 'savedDishConnectionData') {
					if (e.data.value.unMatchedNum == 0) {
						this.showMt = false;
					}
					//美团返回关联的菜品
					let data = e.data.value.data;
					let conData = {
						dishes: []
					};
					//处理美团返回的数据给后台
					for (let i = 0; i < data.length; i++) {
						let obj = {
							dishId: '',
							eDishId: '',
							dishSkuId: []
						};
						obj.dishId = data[i].dishId;
						obj.eDishId = data[i].eDishCode;
						for (
							let j = 0;
							j < data[i].waiMaiDishSkuMappings.length;
							j++
						) {
							obj.dishSkuId.push(
								data[i].waiMaiDishSkuMappings[j].dishSkuId
							);
						}
						conData.dishes.push(obj);
					}
				} else if (e.data.event == 'setWaimaiDish') {
					//设置未关联菜品数据
					let erpData = {
						dishes: []
					};
					//饿了么未关联菜品数据
					let eleData = e.data.value.dishes;
					for (let i = 0; i < eleData.length; i++) {
						let obj = {
							dishId: '',
							eDishCode: '',
							waiMaiDishSkuMappings: [
								{
									eDishSkuCode: '',
									dishSkuId: ''
								}
							]
						};
						obj.dishId = eleData[i].dishId;
						obj.eDishCode = eleData[i].dishSkuId;
						obj.waiMaiDishSkuMappings[0].eDishSkuCode =
							eleData[i].dishSkuId;
						obj.waiMaiDishSkuMappings[0].dishSkuId =
							eleData[i].dishSkuId;
						erpData.dishes.push(obj);
						//将未关联菜品整合到erpDishData中，发送给美团
						let newObj = {
							categoryName: '',
							eDishCode: '',
							eDishSkuCode: '',
							dishNameWithSpec: ''
						};
						newObj.categoryName = eleData[i].categoryName;
						newObj.eDishCode = eleData[i].dishSkuId;
						newObj.eDishSkuCode = eleData[i].dishSkuId;
						newObj.dishNameWithSpec =
							eleData[i].dishName + '(' + eleData[i].spec + ')';
						erpDishData.dishes.push(newObj);
					}
					//处理数据返回给美团
					for (let j = 0; j < erpData.dishes.length; j++) {
						for (let k = 0; k < erpData.dishes.length; k++) {
							if (j != k) {
								if (
									erpData.dishes[j].dishId ==
									erpData.dishes[k].dishId
								) {
									erpData.dishes[
										j
									].waiMaiDishSkuMappings.push(
										erpData.dishes[k]
											.waiMaiDishSkuMappings[0]
									);
									erpData.dishes.splice(k, 1);
								}
							}
						}
					}
					e.source.postMessage(
						{
							event: 'erpDishData',
							value: erpDishData
						},
						'*'
					);

					e.source.postMessage(
						{
							event: 'dishMatchData',
							value: erpData
						},
						'*'
					);
				} else if (e.data.event == 'releaseBinding') {
					//解绑授权成功
					let res = await http.mtRedisClean();
					if(!res)return;
					this.init();
					this.showMt = false;
				}
			};
		}
	},
	mounted() {
		let userData = storage.session('userShop');
		let shopId = userData.currentShop.id;
		let brandId;
		if (userData.currentShop.brandId) {
			brandId = userData.currentShop.brandId;
		} else {
			brandId = 0;
		}
		this.userData = userData;
		this.shopId = shopId;
		this.brandId = brandId;
		this.init();
		document.onclick = () => {
			this.showMt = false;
		};
		this.listeningAuthorized();
	},
	components: {
		printWin: () =>
			import(/*webpackChunkName: "printaddedit_win"*/ 'src/module/outfood/takeawayprint/printaddedit_win'),
		meiTuanWarrant: () =>
			import(/*webpackChunkName: "iframe_warrant"*/ 'src/module/outfood/accredit/iframe_warrant')
	}
};
</script>
<style type="text/css" scoped>
.commodity-box > section {
	height: 150px;
}
.commodity-box .box {
	background-color: #eeeeee;
	color: #898989;
}
.commodity-box .bor {
	border-left: 2px solid #026eb7;
	height: 60px;
	width: 100%;
	margin-bottom: 20px;
}
.commodity-box .spanFont {
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	color: #999;
}
.bat span {
	display: inline-block;
	width: 100px;
	height: 30px;
	border: 1px solid #f8931f;
	color: #f8931f;
	border-radius: 15px;
	text-align: center;
	line-height: 30px;
	font-size: 14px;
	margin-left: 100px;
	margin-top: 20px;
	cursor: pointer;
}
.bated {
	width: 100%;
	height: 80px;
	background: url(../../../res/images/activat.png) no-repeat 180px 0px;
}
.loading {
	width: 128px;
	margin: 200px auto;
}
#printercon .button a {
	display: inline-block;
	width: 100px;
	height: 40px;
	margin-bottom: 20px;
	color: orange;
	text-align: center;
	line-height: 40px;
	border: 1px solid orange;
}
#printercon .button a.select {
	background: orange;
	color: #fff;
}
</style>