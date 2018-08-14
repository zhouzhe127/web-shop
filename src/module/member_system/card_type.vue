<template>
	<div>
		<div v-if="!isToNewCard" id="cardType" style="min-width: 1437px;">
			<!--  <p class="solution" @click="newCardType">新建卡类型</p> -->
			<section class="searchBox clearfix">
				<!--日期选择和搜索框-->
				<div class="date fl" style="width:580px;">
					<!--日期选择和搜索框-->
						<section class="tableListInp fl">
							<calendar class="fl" :pObj="startTime" ref="triggerStartTime" :only="false" :format="'yyyy年MM月dd日  hh:mm:ss'" @throwTime="getStartTime"
							    style="width: 240px;height: 42px;"></calendar>
						</section>
					<span style="float: left; width: 25px;line-height: 40px;text-align: center;">-</span>
						<section class="tableListInp fl">
							<calendar class="fl" :pObj="endTime" ref="triggerEndTime" :only="false" :format="'yyyy年MM月dd日  hh:mm:ss'" @throwTime="getEndTime"
							    style="width: 240px;height: 42px;"></calendar>
						</section>
					<span class="order-order-searchA" style="margin-right:15px;">
						<span @click="getCardList" class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</div>
				<!--点击选择卡类型-->
				<div class="filtrate fl" id="filterCard">
					<select-store ref="selectStore" :sorts="list" @emit="selectCouponType" :tipName="'选择卡类型'"></select-store>
				</div>
				<!--选择卡性质-->
				<section class="filtrate fl">
					<select-btn :sorts="typeList" @selOn="choseType" :name="'选择卡性质'" :width="184"></select-btn>
				</section>
				<a href="javascript:void(0);" class="blue fl btn_a" @click="getCardList">筛选</a>
				<a href="javascript:void(0);" class="gray fl btn_a" @click="getCardList('reset')">重置</a>
			</section>
			<section style="" class="btn btn_color">
				<span class="all" v-for="(item,index) in storeList" v-bind:class="{'active':typeIndex == index }" :key="index" @click="()=>{chooseStore(index);page=1;}">{{item.name}}</span>
			</section>
			<com-table :listHeight='80' :listName="'卡类型列表'" :showTitle='2' :listWidth="1400" :introData="cardList" :titleData="titleList"
			    :allTotal="allCardList.length">
				<div slot="con-0" slot-scope="props" class="btnColor">
					<span @click="editCard(props.data)">编辑</span>
					<span v-if="props.data.status == 1" @click="deleteCard(props.data)">删除</span>
				</div>
				<div slot="con-3" slot-scope="props">
					<template v-if="props.data.applyShopIds == '0'">
						仅发卡门店
					</template>
					<template v-else>
						<template v-if="props.data.applyShopIds == '-1'">
							无
						</template>
						<template v-else>
							{{getShopsName('1',props.data)}}
						</template>
					</template>
				</div>
				<div slot="con-4" slot-scope="props">
					<template v-if="props.data.cardAttr == 1">
						通用
					</template>
					<template v-if="props.data.cardAttr == 2">
						直营店
					</template>
					<template v-if="props.data.cardAttr == 3">
						加盟店
					</template>
				</div>
				<div slot="con-5" slot-scope="props">
					{{translateTime(props.data.createTime)}}
				</div>
			</com-table>
			<page style="float: left;margin: 20px 10px 0 50px;" @pageNum="pageNum" :page="page" :total="total" :len="10" v-if="total>1"></page>
		</div>
		<new-card-type v-bind="cardInfo" @closeCard="closeCard" v-else></new-card-type>
	</div>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	let titleDetial = storage.session('titleDetial');

	export default {
		data() {
			return {
				userData: '',
				page: 1,
				storeList: [{
					name: '全部'
				}, {
					name: '已制卡'
				}, {
					name: '未制卡'
				}],
				typeIndex: 0,
				willShow: false, //活动类型框是否显示
				isShow: false,
				type: '', //选择卡性质
				mouldType: '', //活动模板类型
				mouldList: [], //活动类型列表
				typeList: ['通用', '直营店', '加盟店'],
				typeName: '选择卡性质',
				cardList: [], //筛选时卡类型列表
				list: [], //选择卡类型
				shopList: [], //关联店铺列表 
				applyShopIds: [], //已关联的适用店铺
				//cardArrs: [],//制卡列表存储
				length: '', //共多少卡类型
				ischain: '', //判断是品牌还是单店
				currentShop: '', //品牌或者单店下的店铺
				startTime: {
					time: titleDetial ? titleDetial.startTime : utils.getTime({
						time: new Date()
					}).start
				}, //日期组件开始时间
				endTime: {
					time: titleDetial ? titleDetial.endTime : utils.getTime({
						time: new Date()
					}).end
				}, //日期组件结束时间
				allTrue: false, //选择门店的全部选择按钮是否选中状态
				filterName: [], //筛选卡类型名称
				cardTypeName: [], //卡类型名称
				listObj: { // 获取列表传递到json数据
					'startTime': (new Date()).getTime(),
					'endTime': (new Date()).getTime(),
					'page': 1,
					'num': 10,
					'status': '',
					'cardTypeId': [],
					'cardAttr': ''
				},
				allCardName: false, // 是否全选卡类型
				isFilterCard: false, // 是否打开卡类型弹窗
				filterCardName: '选择卡类型',
				total: '',
				isToNewCard: false,
				cardInfo: '',
				allCardList: '',
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '140px',
						flex: 'none'
					}
				},
				{
					titleName: '卡类型名称',
					dataName: 'name'
				},
				{
					titleName: '卡类型缩写',
					dataName: 'abbr'
				},
				{
					titleName: '使用门店'
				},
				{
					titleName: '卡性质'
				},
				{
					titleName: '创建时间'
				}
				],
			};
		},
		methods: {
			selectCouponType(val) {
				this.list = val;
				this.listObj.cardTypeId = [];
				for (let i of this.list) {
					if (i.selected) {
						this.listObj.cardTypeId.push(i.id);
					}
				}
			},
			pageNum(obj) {
				this.page = obj.page;
				this.initData(this.page);
			},
			initData(page) {
				this.cardList = this.allCardList.slice(page * 10 - 10, page * 10);
			},
			closeCard(str) {
				this.$store.commit('setPageTools', {
					newCardType: () => {
						this.newCardType();
					}
				});
				this.isToNewCard = false;
				// console.log(this.startTime,this.endTime)
				str && this.getCardList();

			},
			getStartTime(receiveTime) {
				this.startTime = {
					time: receiveTime
				};
			},
			getEndTime(receiveTime) {
				this.endTime = {
					time: receiveTime
				};
			},
			filterCard() {
				if (this.list.length == 0) {
					this.vallData('还没有卡类型,去新建卡类型吧');
					return false;
				}
				this.isFilterCard = !this.isFilterCard;
			},
			getClick() {
				//显示活动类型
				if (this.willShow == true) {
					this.willShow = false;
				} else {
					this.willShow = true;
				}
			},
			//选择卡类型，type == 'reset'时是重置按钮
			choseType(index) {
				//选择活动类型
				// this.typeName = item.name;
				this.listObj.cardAttr = index + 1;
				// this.getClick();  
			},
			vallData(content, title = '提示信息', winType = 'alert') {
				this.$store.commit('setWin', {
					content: content,
					title: title,
					winType: winType,
					timerPowerOff: 1000
				});
			},
			//卡类型列表
			async getCardList(type) {
				// 重置
				if (type == 'reset') {
					this.listObj = { // 获取列表传递到json数据
						'startTime': utils.getTime({
							time: new Date()
						}).start,
						'endTime': utils.getTime({
							time: new Date()
						}).end,
						'page': 1,
						'num': 10,
						'status': '',
						'cardTypeId': [],
						'cardShopId': (this.ischain == '0') ? this.listObj.cardShopId : [],
						'cardAttr': ''
					};
					this.startTime = {
						time: utils.getTime({
							time: new Date()
						}).start
					};
					this.endTime = {
						time: utils.getTime({
							time: new Date()
						}).end
					};
					this.allCardName = false; // 是否全选卡类型
					this.allAttrName = false; // 是否全选卡性质
					this.allShopName = false; // 是否全选店铺
					this.filterCardName = '选择卡类型';
					this.typeName = '选择卡性质';
					this.cardTypeId = [];
					for (let i = 0; i < this.list.length; i++) {
						this.list[i].selected = false;
					}
					this.$refs.selectStore.init();
				}
				if (this.startTime.time > this.endTime.time) {
					this.vallData('请选择正确的时间进行筛选');
					return false;
				}

				// 开始时间转化为当天00:00
				// 结束时间转化为23:59:59

				this.isAttr = false;
				this.isShop = false;
				this.isFilterCard = false;
				let res = await http.getListFilter({
					data: {
						'startTime': (this.startTime.time / 1000) | 0,
						'endTime': (this.endTime.time / 1000) | 0,
						'page': this.listObj.page,
						'num': this.listObj.num,
						'status': this.listObj.status,
						'cardTypeId': utils.unique(this.listObj.cardTypeId).toString(),
						'cardAttr': this.listObj.cardAttr
					}
				});
				// this.cardList = res
				this.allCardList = utils.sortByAll(res, 'createTime', false);
				this.total = Math.ceil(this.allCardList.length / 10);
				this.cardList = this.allCardList.slice(this.page * 10 - 10, this.page * 10);
			},
			async getCardType() {
				// 获取卡类型列表
				let res = await http.getCardTypeList({
					data: {}
				});
				this.list = res;
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].isOn = false;
				}
			},
			//删除未制卡类型
			async deleteCard(item) {
				await http.deleteCardType({
					data: {
						id: item.id
					}
				});
				this.getCardList();
			},
			//编辑卡类型
			editCard(item) {
				this.cardInfo = {
					editCards: item,
					titleDetial: {
						'startTime': this.startTime,
						'endTime': this.endTime
					}
				};
				this.$store.commit('setPageTools', {});
				this.isToNewCard = true;
			},

			//筛选已制卡、未制卡
			chooseStore(index) {
				this.typeIndex = index;
				if (index == 0) {
					this.listObj.status = '';
				} else if (index == 1) {
					this.listObj.status = 2;
				} else if (index == 2) {
					this.listObj.status = 1;
				}

				this.getCardList();
			},
			//时间转换
			translateTime(time) {
				return utils.format(new Date(Number(time) * 1000), 'yyyy-MM-dd / hh:mm');
			},
			//新建卡类型
			newCardType() {
				this.$store.commit('setPageTools', {});
				this.cardInfo = {},
				this.isToNewCard = true;
			},
			filterShopType() {
				let shops = [];
				if (this.ischain == '1' || this.ischain == '2') {
					let brandId = this.userData.currentShop.brandId;
					let brandList = this.userData.currentShop.shopList.brand;

					for (let i = 0; i < brandList.length; i++) {
						if (brandId.match(brandList[i].id)) {
							shops = shops.concat(brandList[i].direct);
							shops = shops.concat(brandList[i].franchise);
							break;
						}
					}

				} else if (this.ischain == '3') {
					shops = shops.concat(this.userData.currentShop.direct);
					shops = shops.concat(this.userData.currentShop.franchise);
				}
				return shops;
			},
			getShopsName(type, item) {
				// 获取门店名称
				let shops = this.filterShopType();
				let shopNames = '';
				if (type == '1') {
					if (this.ischain == '0') {
						return this.userData.currentShop.name;
					}
					let applyShopIds = String(item.applyShopIds);

					if (applyShopIds) {
						for (let i = 0; i < shops.length; i++) {
							if (applyShopIds.match(shops[i].id)) {
								shopNames += shops[i].name + ',';
							}
						}
					} else {
						shopNames = '无';
					}
				} else if (type == '2') {
					if (this.ischain == '0') {
						return this.userData.currentShop.name;
					}
					let depositShopIds = String(item.depositShopIds);
					for (let i = 0; i < shops.length; i++) {
						if (depositShopIds.match(shops[i].id)) {
							shopNames += shops[i].name + ',';
						}
					}
				} else {
					return this.userData.currentShop.name;
				}

				shopNames = (type == undefined) ? shopNames : shopNames.substring(0, shopNames.length - 1);

				return shopNames;
			}
		},
		mounted() {
			this.$store.commit('setPageTools', {
				newCardType: () => {
					this.newCardType();
				}
			});
			this.userData = storage.session('userShop');
			this.getCardList();
			this.getCardType();
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.currentShop = storage.session('userShop').currentShop;
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			'calendar': () =>
				import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
			'new-card-type': () =>
				import ( /*webpackChunkName: 'new_card_type'*/ './new_card_type'),
			'page': () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			'select-store': () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			'select-btn': () =>
				import ( /* webpackChunkName: 'select_btn' */ 'src/components/select_btn'),
		}
	};
</script>
<style type="text/css" scoped>
	#cardType .searchBox {
		width: 100%;
		height: auto;
		margin-bottom: 20px;
	}

	#cardType .solution {
		width: 121px;
		height: 42px;
		background: #2EA8DC;
		color: #fff;
		font-size: 16px;
		line-height: 42px;
		text-align: center;
		float: right;
		margin-top: -45px;
		cursor: pointer;
	}

	#cardType .date .statisticsList {
		position: relative;
		line-height: 40px;
	}

	#cardType .date .statisticsList input {
		text-align: center;
		display: block;
		float: left;
		height: 38px;
		width: 158px;
		outline: none;
		border: 0;
	}

	#cardType .date .statisticsList ul {
		width: 100%;
		margin: 0;
		position: absolute;
		top: 43px;
		left: 0;
		z-index: 10;
		background: #fff;
	}

	#cardType .date .statisticsList ul li {
		text-align: center;
		height: 41px;
		border: 1px #b3b3b3 solid;
		border-top: 0;
		background: #fff;
		cursor: pointer;
	}

	/* #cardType .date .tableListInp {
		color: #666666;
		height: 40px;
		cursor: pointer;
		box-sizing: border-box;
	} */

	/* #cardType .date .tableListInp div:nth-child(2) {
		width: 38px;
		height: 38px;
		position: relative;
		z-index: 5;
		border-left: #b3b3b3 solid 1px;
	} */

	/* #cardType .date .tableListInp div i {
		height: 10px;
		width: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -5px;
		margin-left: -5px;
		border-top: 10px solid #b3b3b3;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		box-sizing: border-box;
	} */

	.order-order-searchA,
	.order-order-search {
		display: inline-block;
		float: left;
		width: 40px;
		height: 40px;
		background-color: #29A7E1;
		cursor: pointer;
		margin-right: 15px;
	}

	.order-order-search {
		background: url(../../res/images/search.png) center center no-repeat;
	}

	.order-order-searchA:hover {
		background-color: #1878a5;
		transition: background-color ease-in-out 0.2s;
	}

	.order-order-searchA:active {
		background-color: #154961;
	}

	#cardType .filtrate {
		display: inline-block;
		height: 40px;
		cursor: pointer;
		color: #44404A;
		margin-right: 14px;
		position: relative;
	}

	#cardType .filtrate .extent {
		display: block;
		float: left;
		overflow: hidden;
		color: #A5A5A5;
		font-size: 14px;
		width: 170px;
		height: 39px;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		border-right: 1px solid #D2D2D2;
		line-height: 40px;
	}

	.triangle {
		position: relative;
		width: 40px;
		height: 40px;
	}

	.triangle i {
		position: absolute;
		top: 50%;
		left: 50%;
		box-sizing: border-box;
		width: 10px;
		height: 10px;
		margin-top: -5px;
		margin-left: -5px;
		border-top: 10px solid #6A666E;
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}

	#cardType .btn .all {
		width: 121px;
		height: 41px;
		display: inline-block;
		font-size: 16px;
		text-align: center;
		line-height: 41px;
		border-radius: 4px;
		margin-right: 14px;
		background: #F2F2F2;
		color: #333;
		cursor: pointer;
	}

	#cardType .btn .active {
		background: #28A8E0;
		color: #fff;
	}

	#cardType .activeCount {
		width: 100%;
		height: 52px;
		background-color: #fff;
		line-height: 52px;
		padding-left: 55px;
		position: relative;
		overflow: hidden;
	}

	#cardType .activeCount li {
		float: left;
		font-size: 16px;
		text-align: center;
	}

	#cardType .activeCount li span {
		color: #EB5027;
	}

	#cardType .activeCount li.bit {
		width: 24px;
		height: 100%;
		position: relative;
	}

	#cardType .activeCount li.bit span {
		width: 5px;
		height: 5px;
		background: #44404A;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin-top: -2px;
		margin-left: -2px;
	}

	#cardType .oUl {
		width: 100%;
		height: 45px;
		line-height: 45px;
	}

	#cardType .oUl li {
		width: 16%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		float: left;
		vertical-align: middle;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		font-size: 16px;
	}

	#cardType .cardList .storeLi {
		width: 100%;
	}

	#cardType .cardList .storeLi li {
		float: left;
		width: 16%;
	}

	#cardType .cardList .storeBottom {
		width: 100%;
		height: 66px;
		text-align: center;
		line-height: 66px;
		border-bottom: 4px #F7F7F7 solid;
		overflow: hidden;
	}

	#cardType .cardList .storeBottom li:nth-of-type(1) span {
		font-size: 16px;
		cursor: pointer;
	}

	#cardType .cardList .storeBottom li:nth-of-type(1) span:nth-of-type(1) {
		padding-right: 20px;
		color: #FF8D08;
	}

	#cardType .cardList .storeBottom li:nth-of-type(1) span:nth-of-type(2) {
		border-left: 2px #CECECE solid;
		padding: 0 25px;
		color: #2DA8DC;
	}

	.btnColor span {
		font-size: 16px;
		cursor: pointer;
	}

	.btnColor span:nth-of-type(1) {
		padding-right: 20px;
		color: #FF8D08;
		padding-left: 20px;
	}

	.btnColor span:nth-of-type(2) {
		border-left: 2px #CECECE solid;
		padding: 0 25px;
		color: #2DA8DC;
	}

	#cardType .cardList .storeBottom li:nth-of-type(4) {
		width: 16%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#cardType .filtBox {
		width: 437px;
		height: auto;
		background: #3E3E3E;
		z-index: 999;
		position: absolute;
		padding: 24px;
	}

	.filtBox:after {
		content: "";
		width: 6px;
		height: 6px;
		border-left: 1px solid #3E3E3E;
		border-bottom: 1px solid #3E3E3E;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
		position: absolute;
		left: 15px;
		top: -4px;
		background: #3E3E3E;
	}

	#cardType .filterType {
		width: 211px;
		border: 1px solid #D1D1D1;
		background-color: #fff;
		margin-top: 50px;
		z-index: 999;
		position: absolute;
	}

	#cardType .filterType li {
		height: 50px;
		margin: 0px 8px;
		border-bottom: 1px solid #D1D1D1;
		box-sizing: border-box;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		color: #68656D;
		cursor: pointer;
	}

	#cardType .filterType li:last-of-type {
		border-bottom: none;
	}

	.filterType:after {
		content: "";
		width: 6px;
		height: 6px;
		border-left: 1px solid #D1D1D1;
		border-bottom: 1px solid #D1D1D1;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
		position: absolute;
		right: 15px;
		top: -5px;
		background: #fff;
	}

	.selectbtns {
		display: inline;
	}

	.selectbtns span {
		width: 101px;
		height: 41px;
		border: 1px #fff solid;
		color: #fff;
		font-size: 18px;
		text-align: center;
		line-height: 41px;
		float: left;
		margin: 0 7px 14px;
		background-color: #3E3E3E;
	}

	.selectbtns span:hover {
		background-color: inherit;
	}

	.selectbtns .sign {
		border: 1px #FF9200 solid;
	}

	#cardType .filtBox .sign {
		border: 1px solid #FF9800;
	}

	.zhezhao_bg {
		padding: 25px;
		width: 440px;
		background-color: #3e3e3e;
		z-index: 99;
		position: absolute;
		left: 0;
		top: 60px;
	}

	.zhezhao_bg:after {
		content: '';
		position: absolute;
		top: -24px;
		left: 20px;
		width: 0;
		height: 0;
		border-width: 12px 6px;
		border-style: solid;
		border-color: transparent transparent #3e3e3e transparent;
	}

	.shoName {
		height: 40px;
		line-height: 40px;
		border: 1px solid #f2f2f2;
		float: left;
		margin: 5px;
		color: #fff;
		padding: 0 10px;
		text-align: center;
	}

	.btn_color {
		width: 100%;
		height: 42px;
		margin-right: 20px;
		margin-bottom: 22px;
	}

	.shoName-select {
		border-color: #FF9800;
		background: url(../../res/images/sign.png) right bottom no-repeat;
	}

	.btn_a {
		display: block;
		width: 95px;
		height: 40px;
		line-height: 40px;
		margin-right: 15px;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		.btn_color {
			width: 100%;
			height: 42px;
			margin-right: 20px;
			margin-bottom: 22px;
			clear: both;
		}
		#cardType .searchBox {
			width: 640px;
			height: 102px;
			margin-bottom: 20px;
			line-height: 70px;
		}
		.btn_a {
			margin-top: 16px;
		}
	}
</style>