<template>
	<div>
		<win @winEvent="getWinClickResult" :align="'right'" :ok="btnOk" :cancel="btnCancel" :width="580" :height="467">
			<span slot="title">{{title}}</span>
			<!--打印机创建修改表单-->
			<section class="Pconfig" slot="content">
				<div class="configOne">
					<label class="fl">
						<span class="fl required pNmae">单据数据</span>
						<radioBtn :list="docType" :index="orderTypeIndex" :name='"name"' @selOn="getSelOn"></radioBtn>
					</label>
					<label class="fl">
						<span class="fl required pNmae">打印机</span>
						<radioBtn :list="printerList" :index="printerIndex" :name='"printerName"' @selOn="getPrintSelOn" style="float:left;width:80%"></radioBtn>
					</label>
					<div class="fl">
						<span class="fl required pNmae">渠道</span>
						<mulSelect v-if="areaIdsList.length>0" :list="areaIdsList" :selects="areaIndex" :name='"name"' :keys='"id"' :isradio="true" @selOn="chooseShop"></mulSelect>
						<span class="tips">
							<i></i>未授权的渠道请先授权后选择</span>
					</div>
					<label class="fl" v-if="shopsList.length != 0">
						<span class="fl required pNmae">店铺</span>
						<mulSelect :list="shopsList" :selects="shopsIndex" :name='"TakeoutShopName"' :keys='"TakeoutShopId"' :isradio="true" @selOn="chooseId"></mulSelect>
					</label>
					<label class="fl" v-if="shopsIndex.length != 0">
						<span class="fl required pNmae">选择菜品</span>
						<a href="javascript:void(0);" class="addclassify fl" @click="openWinThree">添加关联菜品</a>
						<span class="fl spanCom" v-if="goodsLength!==null">已选择菜品：{{goodsLength}}道</span>
					</label>
					<label class="fl">
						<span class="fl required pNmae">打印次数</span>
						<div class="fl" style="width: 185px;">
							<subadd :bindnum="printTimes" :maxnum="9" :minnum="1" @toClick="getSubadd"></subadd>
						</div>
						<span class="fl pNmae">蜂鸣</span>
						<onOff :status="isAlam" @statusChange="getOnOff"></onOff>
					</label>
				</div>
			</section>
		</win>
		<component :is="showCom" :pObj="comObj" @toClick="getReturnInfo"></component>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

let userData = storage.session('userShop');
let brandId;
if (userData.currentShop.brandId) {
	brandId = userData.currentShop.brandId;
} else {
	brandId = 0;
}
export default {
	props: {
		pObj: null
	},
	data() {
		return {
			btnOk: {}, //弹框确认按钮
			btnCancel: {}, //弹框删除按钮
			showBounced: true, //弹框的显示
			docType: [], //单据数据列表
			orderType: null,
			printerList: [], //打印机列表
			printTimes: 1,
			isAlam: false,
			printerId: null,
			areaIdsList: [],
			areaIds: [],
			status: '1',
			orderTypeIndex: -1, //单据数据下标
			printerIdIndex: -1,
			areaIndex: [],
			printerIndex: -1, //打印机下标
			goodsLength: null,
			goodsIds: [],
			shopsList: [], //店铺列表
			shopsIndex: [], //选中的店铺
			eleShopid: '', //选中的店铺id
			// types: sd.copy(pcon.editType),
			elemeUserId: '',
			goods: {}, //传给后台的选中商品
			isAreaid: '', //是否为当前店铺id
			packageIds: null, //套餐id
			// showThreeBounced: false, //三级弹框
			postFirstPid: null,
			postFirstTypes: null,
			postFirstIndex: null,
			title: null,
			showCom: '',
			comObj: {},
			goodsCom: [],
			selectgoods: []
		};
	},
	methods: {
		getOnOff: function(status) {
			this.isAlam = status;
		},
		getSubadd: function(num) {
			this.printTimes = num;
		},
		getSelOn: function(res) {
			this.orderTypeIndex = res;
		},
		getPrintSelOn: function(res) {
			this.printerIndex = res;
		},
		async getDate() {
			//请求单据数据列表
			let info = await http.getOrderName();
			this.docType = info;
			this.initTogath();
			// 请求打印机列表
			let printInfo = await http.getWireprinter();
			if (printInfo == null) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '打印机为空,请先添加打印机',
					winType: 'confirm',
					callback: res => {
						this.showBounced = false;
						if (res == 'ok') {
							this.$store.commit('setWin', {
								title: '操作提示',
								content: '打印机为空不能操作打印机配置！'
							});
						}
					}
				});
				return false;
			} else {
				this.printerList = printInfo;
				this.initTogath();
			}
			// 请求渠道列表
			let takeoutList = await http.getTakeOutList({
				data: {
					brandId: brandId
				}
			});
			this.areaIdsList = takeoutList;
			//请求渠道下的店铺列表
			if (this.title != '新建打印机配置') {
				// 获取打印机配置信息
				let info = await http.getTakeoutprint({
					data: {
						id: this.postFirstPid
					}
				});
				this.printerId = info.printerId;
				// if (info.orderType == 2) {
				// 	this.orderTypeIndex = 0;
				// } else if (info.orderType == 7) {
				// 	this.orderTypeIndex = 1;
				// } else if (info.orderType == 20) {
				// 	this.orderTypeIndex = 2;
				// }
				this.orderType = info.orderType;
				this.printTimes = Number(info.printTimes);
				this.isAlam = info.isAlam == '0' ? false : true;
				//后台传值为整型，需转成数组
				let indexArea = info.areaIds + '';
				this.areaIndex = indexArea.split(',');
				let indexShop = info.areaShopId + '';
				this.shopsIndex = indexShop.split(',');
				this.eleShopid = info.areaShopId;
				//后台获取的菜品数据处理为数组id
				let arr = [];
				let infoGoodsIds = JSON.parse(info.goodsIds);
				for (let i in infoGoodsIds) {
					if(infoGoodsIds[i].length>0||info.areaIds!=2){
						arr.push(parseInt(i));
					}
				}
				if(info.packageIds){
					let packageIdsarr = info.packageIds.split(',');
					arr = [...arr,...packageIdsarr];
				}
				this.goodsIds = arr;
				this.goods = info.goodsIds;
				this.isAreaid = info.areaShopId;
				// this.initTogath();
				// this.chooseShop();
				this.chooseShop([info.areaIds]);
				for(let index in this.docType){
					if(this.docType[index].type==info.orderType){
						this.orderTypeIndex = index;
					}
				}
				for(let index in printInfo){
					if(printInfo[index].id==info.printerId){
						this.printerIndex = index;
					}
				}
			}
			this.initTogath();
		},
		async getWinClickResult(res) {
			if (res == 'ok') {
				if (this.orderType == null) {
					this.$store.commit('setWin', {
						title: '错误提示',
						content: '单据数据不能为空！'
					});
					return false;
				}
				if (this.printerIndex.length == 0 || this.printerIndex == -1) {
					this.$store.commit('setWin', {
						title: '错误提示',
						content: '打印机不能不选！'
					});
					return false;
				}
				if (this.areaIndex == null) {
					this.$store.commit('setWin', {
						title: '错误提示',
						content: '渠道不能不选！'
					});
					return false;
				}
				if (this.shopsIndex == null) {
					this.$store.commit('setWin', {
						title: '错误提示',
						content: '店铺不能不选！'
					});
					return false;
				}
				if (this.goodsIds.length == 0 && this.goodsIds == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						content: '请选择菜品！'
					});
					return false;
				}
				let info;
				if (this.title == '新建打印机配置') {
					info = await http.takeoutprintAdd({
						data: {
							shopId: userData.currentShop.id,
							printerId: this.printerId,
							orderType: this.orderType,
							areaIds: this.areaIndex.toString(),
							areaShopId: this.shopsIndex.toString(),
							goodsIds: this.goods,
							printTimes: this.printTimes,
							isAlam: Number(this.isAlam),
							elemeUserId: this.elemeUserId,
							packageIds: this.packageIds
						}
					});
				} else if (this.title == '修改打印机配置') {
					// 修改打印机配置
					info = await http.takeoutprintEdit({
						data: {
							id: this.postFirstPid,
							printerId: this.printerId,
							orderType: this.orderType,
							areaIds: this.areaIndex.toString(),
							areaShopId: this.shopsIndex.toString(),
							goodsIds: this.goods,
							printTimes: this.printTimes,
							isAlam: Number(this.isAlam),
							elemeUserId: this.elemeUserId,
							packageIds: this.packageIds
						}
					});
				}
				if(!info) {return}
				this.$emit('toClick', res);
			} else if (res == 'cancel') {
				if (this.title == '修改打印机配置') {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '确认删除打印机？',
						winType: 'confirm',
						callback: async status => {
							if (status == 'ok') {
								await this.deletePrint();
								this.$emit('toClick', res, status);
							}
						}
					});
				} else {
					this.$emit('toClick', res);
				}
			} else if (res == 'close') {
				this.$emit('toClick', res);
			}
		},
		async deletePrint() {
			await http.takeoutprintDelete({
				data: {
					id: this.postFirstPid,
					elemeUserId: this.elemeUserId,
					areaShopId: this.shopsIndex.toString()
				}
			});
		},
		getBouncedBtn: function() {
			if (this.title == '新建打印机配置') {
				this.btnOk = {
					content: '保存',
					style: 'background-color:#f8941f'
				};
				this.btnCancel = {
					content: '取消',
					style: 'background-color:#a0a0a0'
				};
			} else if (this.title == '修改打印机配置') {
				this.btnOk = {
					content: '保存',
					style: 'background-color:#f8941f'
				};
				this.btnCancel = {
					content: '删除',
					style: 'background-color:#c33'
				};
			}
		},
		//请求渠道下的店铺列表
		async chooseShop(id) {
			this.areaIndex = id;
			if (id) {
				if (id[0] == undefined) {
					return;
				}
			}
			let res = await http.getTakeoutShop(
				{
					data: {
						type: id ? id[0] : this.areaIndex[0], //渠道id，新建为id[0]，修改为this.areaIndex[0]
						brandId: brandId //品牌id
					}
				},
				true
			);

			if (res.error_code) {
				this.$store.commit('setWin', {
					title: '错误提示',
					content: res.error_message
				});
				return;
			}

			let arr = [];
			arr.push(res);
			this.shopsList = arr;
			this.shopsIndex = [arr[0].TakeoutShopId];
			//切换渠道，重置选中店铺
			if (this.eleShopid&&arr[0].TakeoutShopId != this.eleShopid) {
				this.shopsList = [];
				this.shopsIndex = [];
			}
			this.initTogath();
		},
		//获取选择店铺的id
		chooseId: function(id) {
			this.shopsIndex = id;
			this.eleShopid = id[0];
			//点击店铺空白区域不会清空已选商品
			if (parseInt(this.eleShopid) == this.isAreaid) {
				return false;
			} else {
				this.goodsIds = [];
				this.isAreaid = this.eleShopid;
			}
		},
		async getRelationGoods() {
			// 饿了么请求分类列表
			if (this.areaIndex[0] == 1) {
				let res = await http.takeoutGetCategoryList({
					data: {
						eleShopId: this.eleShopid
					}
				});
				this.category = res;
				await this.catecarygoods(this.category.length - 1);
			} else if (this.areaIndex[0] == 2) {
				let res = await http.getMtGoods({ data: {} });
				this.category = res.typeList;
				this.mtgoods = res.goodsList;
				this.goodReady();
			} else if (this.areaIndex[0] == 3) {
				let res = await http.getBaiduGoods({
					data: {
						type: 1,
						brandId: brandId
					}
				});
				this.category = res.categoryList;
				this.baidugoods = res.goodsList;
				this.goodReady();
			}
		},
		async catecarygoods(index) {
			// 请求商品列表
			if (index < 1) {
				return;
			} else {
				let res = await http.getGoodsByCategoryId({
					data: {
						type: 1,
						categoryId: this.category[index].categoryId
					}
				});
				for (let i = 0; i < res.length; i++) {
					this.goodsCom.push(res[i]);
				}
				this.catecarygoods(index - 1);
			}
			this.goodReady();
		},
		goodReady: function(id) {
			let arr = [];
			//饿了么美团数据格式不同 需要判断,eleme根据id选中，美团根据name选中
			if (this.areaIndex[0] == 1) {
				for (let i = 0; i < this.goodsCom.length; i++) {
					if (id === undefined || id === 0) {
						let item = this.goodsCom[i];
						if (!(item.categoryId instanceof Array) ) {
							arr = arr.concat(item);
						} else {
							// if(this.incategory(item.categoryId)) {
							// arr = arr.concat(item);
							// }
						}
					} else {
						if (this.goodsCom[i].categoryId == id) {
							arr = arr.concat(this.goodsCom[i]);
						}
					}
				}
			} else if (this.areaIndex[0] == 2) {
				for (let i = 0; i < this.mtgoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.mtgoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr.push(item);
						} 
						// else {
						// if(this.incategory(item.categoryName)) {
						// arr.push(item);
						// }
						// }
					} else {
						if (this.mtgoods[i].categoryName == id) {
							arr.push(this.mtgoods[i]);
						}
					}
				}
			} else if (this.areaIndex[0] == 3) {
				for (let i = 0; i < this.baidugoods.length; i++) {
					if (id === undefined || id === '全部') {
						let item = this.baidugoods[i];
						if (!(item.categoryName instanceof Array)) {
							arr.push(item);
						} else {
							// if(this.incategory(item.categoryName)) {
							// arr.push(item);
							// }
						}
					} else {
						if (this.baidugoods[i].categoryName == id) {
							arr.push(this.baidugoods[i]);
						}
					}
				}
			}
			this.selectgoods = arr;
		},
		openWinThree() {
			if (!this.eleShopid) {
				this.$store.commit('setWin', {
					content: '请选择店铺'
				});
				return false;
			}
			this.showCom = 'printerRelation';
			this.comObj = {
				areaIndex: this.areaIndex,
				goodsIds: this.goodsIds,
				eleShopid: this.eleShopid
			};
		},
		getReturnInfo: function(res, item) {
			if(res=='ok'){
				this.goods = item.goods;
				this.packageIds = item.packageIds;
				this.goodsLength = item.goodsLength;
				this.goodsIds = item.goodsIds;
			}
			this.showCom = '';
			
		},
		initTogath: function() {
			//打印的初始化
			if (
				this.printerId &&
				this.printerList &&
				this.printerList.length > 0
			) {
				for (let i = 0; i < this.printerList.length; i++) {
					if (this.printerList[i].id == this.printerId) {
						this.printerIndex = i;
					}
				}
			}
		},
		orderTypeIndexChange: function() {
			// 获取选中的单据数据
			if (this.orderTypeIndex > -1 && this.docType != null) {
				this.orderType = this.docType[this.orderTypeIndex].type;
			}
		},
		printerIndexChange: function() {
			if (this.printerIndex > -1) {
				this.printerId = this.printerList[this.printerIndex].id;
			}
		},
		areaIndexChange: function() {
			if (this.areaIndex != null) {
				for (let i = 0; i < this.areaIndex.length; i++) {
					this.areaIds.push(this.areaIndex[i]);
				}
			}
			// this.areaIds数组去重复
			this.areaIds = utils.unique(this.areaIds);
		},
		shopIndexChange: function() {
			if (this.shopIndex != null) {
				for (let i = 0; i < this.shopIndex.length; i++) {
					this.shopIds.push(this.shopIndex[i]);
				}
			}
			// this.areaIds数组去重复
			this.shopIds = utils.unique(this.shopIds);
		},
		goodsNonull: function() {
			this.goodsLength =
				this.goodsIds.length == 0 ? null : this.goodsIds.length;
		}
	},
	watch: {
		printerIndex: 'printerIndexChange',
		orderTypeIndex: 'orderTypeIndexChange',
		areaIndex: 'areaIndexChange',
		shopIndex: 'shopIndexChange',
		goodsIds: 'goodsNonull'
	},
	mounted() {
		this.postFirstPid = this.pObj.postFirstPid;
		(this.postFirstTypes = this.pObj.postFirstTypes),
		(this.postFirstIndex = this.pObj.postFirstIndex),
		(this.title = this.pObj.title);
		this.getBouncedBtn();
		this.getDate();
		this.initTogath();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		radioBtn: () =>
			import(/*webpackChunkName: "radio_btn"*/ 'src/components/radio_btn'),
		mulSelect: () =>
			import(/*webpackChunkName: "mul_select"*/ 'src/components/mul_select'),
		subadd: () =>
			import(/*webpackChunkName: "subadd"*/ 'src/components/subadd'),
		onOff: () =>
			import(/*webpackChunkName: "on_off"*/ 'src/components/on_off'),
		printerRelation: () =>
			import(/*webpackChunkName: "printrelation_win"*/ 'src/module/outfood/takeawayprint/printrelation_win')
	}
};
</script>

<style type="text/css" scoped>
.Pconfig {
	width: 580px;
	height: 540px;
	padding: 20px 20px;
	background-color: #f2f2f2;
	overflow: auto;
}
.Pconfig label {
	width: 100%;
	min-height: 40px;
	line-height: 40px;
	margin-bottom: 20px;
}
.Pconfig .pNmae {
	width: 80px;
	height: 40px;
	text-align: right;
	margin-right: 20px;
}
.Pconfig .pInput {
	outline: none;
	border: none;
	background-color: #fff;
	width: 390px;
	height: 40px;
	line-height: 40px;
	padding-left: 10px;
}
.Pconfig .selectbtns span {
	border: 1px solid #cecdcd;
	width: 100px;
	height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 0;
	vertical-align: bottom;
}
.tips {
	display: inline-block;
	margin-left: 100px;
	color: #999999;
}
.tips i {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../res/images/handle-tips.png);
	vertical-align: middle;
	margin-right: 5px;
}
.Pconfig .selectbtns .sign {
	background: #fff3e4;
	color: #ff9800;
	border: 1px solid #ff9800;
}
</style>

