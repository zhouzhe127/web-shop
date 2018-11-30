<!--
    **实体卡应用
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<section>
		<div id="useCard">
			<section style="width: 100%;height: 42px;margin-bottom: 27px;">
				<!--选择卡类型-->
				<div class="filtrate fl">
					<selectStore @emit="getDrop" :sorts="cradTypeList" :tipName="'请选择卡类型'"></selectStore>
				</div>
				<!--选择卡属门店-->
				<div class="filtrate fl" v-if="ischain=='3'">
					<selectStore @emit="clickShopList" :sorts="shopsList" :tipName="shopsName"></selectStore>
				</div> 
				<!--选择卡性质-->
				<section class="filtrate fl" v-if="ischain == '3'">
					<!--下拉框组件-->
					<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
				</section>
				<a href="javascript:void(0);" class="blue fl" @click="getList" style="display:block;width: 95px;height: 40px;line-height: 40px;">筛选</a>
				<a href="javascript:void(0);" class="gray fl" @click="getList('','reset')" style="display:block;width: 95px;height: 40px;line-height: 40px;margin-left: 14px;">重置</a>
			</section>

			<!-- 选择门店 -->
            <div class="store-show" :style="{'height':storeShowH}">
				<i>已选择店铺：</i>
				<div class="store-block">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<div v-if="selectedShopList == 0">{{shopsName}}</div>
					<div v-else>{{selectedShopList.toString()}}</div>
				</div>
			</div>

			<com-table :listHeight='80' :listName="'实体卡应用'" :key="index" :showTitle='1' :listWidth="1300" :introData="list" :titleData="titleList"
			    :allTotal="count">
				<div slot="con-0" slot-scope="props" style="">
					<span @click="getDetail(props.data,'edi')" style="color:#FF8D08;margin-right: 23px;cursor: pointer;">编辑</span>
					<span style="color:#CECECE;margin-right: 23px;">|</span>
					<span style="color:#2da8dc;cursor: pointer;" @click="getDetail(props.data,'view')">查看详情</span>
				</div>
				<div slot="con-1" slot-scope="props">
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
				<div slot="con-2" slot-scope="props">{{props.data.isActivate == '1' ? "允许" : "不允许"}}</div>
				<div slot="con-5" slot-scope="props">{{getCardShopName(props.data)}}</div>
				<div slot="con-5" slot-scope="props">{{getCardShopName(props.data)}}</div>
				<div slot="con-6" slot-scope="props">{{props.data.initCardNumber}}-{{props.data.endCardNumber}}</div>
				<div slot="con-7" slot-scope="props">{{props.data.abbr}}-{{props.data.shopNumber}}-{{props.data.initCardNumber}}</div>
			</com-table>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="changePage" :page="Number(listObj.page)" :total="Number(listObj.pagetotal)" :numArr="[10,20,30,40,50]"
				    :isNoJump="true"></pageElement>
			</section>
		</div>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="ass" :detail='itemDetail' :type='type' :cradTypeList='cradTypeList' @getAppliedWins='getResult'
		    :getDetail='getDetail' :getList='getList' :userData="userData" :ischain="ischain"></component>
	</section>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import getAppliedWins from './getapplied_entitycardlist_win';

	export default {
		data() {
			return {
				userData: '',
				ischain: '',
				index: null,
				listObj: { // 获取列表传递到json数据
					'page': 1,
					'num': 10,
					'cardTypeId': [],
					'belongToShop': [],
					'cardAttr': '',
					'pagetotal': ''
				},
				expirationTimeList: [{ //过期时间
					name: '全部',
					id: ''
				}, {
					name: '通用',
					id: 1
				},
				{
					name: '直营店',
					id: 2
				},
				{
					name: '加盟店',
					id: 3
				}
				],
				expirationTimeId: '',
				expirationTime: '全部', //状态
				cradTypeList: [], // 卡类型列表
				list: [], //制卡列表
				count: '', // 总页数
				shopsName: '选择卡属门店',
				// allCardName: false, // 是否全选卡类型
				// allAttrName: false, // 是否全选店铺
				// allShopName: false, // 是否全选店铺
				willShow: false, //活动类型框是否显示
				shopsList: [], // 卡属门店
				showWin: false, //弹窗默认关闭状态
				type: '', //编辑弹窗和查看弹窗的状态
				ass: '',
				itemDetail: {}, //列表单个详情
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '200px',
						flex: 'none'
					}
				},
				{
					titleName: '卡性质',
					dataName: 'name'
				},
				{
					titleName: '门店激活',
					dataName: 'createTime'
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
					titleName: '卡属门店'
				},
				{
					titleName: '编号'
				},
				{
					titleName: '举例'
				},
				],
				allTotal: 0,
				isShowStore:false,//已选中店铺列表 是否展开
				storeShowH:'20px',
				selectedShopList:[],
			};
		},
		props: {},
		components: {
			getAppliedWins,
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			selectBtn: () =>
				import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		},
		methods: {
			openStore(){//展开收起-已选中店铺列表
				if(this.isShowStore==true){//展开时点击
					this.storeShowH = '20px';
				}else{
					this.storeShowH = 'auto';
				}
				this.isShowStore = !this.isShowStore;
			},
			async getList(res, type) {
				// 重置
				if (type == 'reset') {
					// this.listObj = { // 获取列表传递到json数据
					//     'page': 1,
					//     'num': 10,
					//     'cardTypeId': [],
					//     'belongToShop': (this.ischain == '0') ? this.listObj.belongToShop : [],
					//     'cardAttr': ''
					// }
					// this.shopsList = [];
					// this.expirationTimeId = '';
					// this.expirationTime = '全部';
					// this.allCardName = false; // 是否全选卡类型
					// this.allAttrName = false; // 是否全选卡性质
					// this.allShopName = false; // 是否全选店铺
					// this.shopsName = (this.ischain == '0') ? this.shopsName : '选择卡属门店';
					this.typeName = '选择卡性质';
					this.getCardType();
					//this.getShopList();
				}
				// 获取制卡列表
				let data = await http.getAppliedEntityCardList({
					data: {
						page: this.listObj.page,
						num: this.listObj.num,
						cardTypeId: this.listObj.cardTypeId.toString(),
						belongToShop: this.listObj.belongToShop.toString(),
						cardAttr: this.expirationTimeId
					}
				});
				console.log(data, 'data');
				this.list = Object.values(data.list); //获取列表

				if (res == true) {
					for (let key in this.list) {
						if (this.list[key].id == this.itemDetail.id) {
							this.itemDetail = this.list[key];
						}
					}
				}
				if (data.total || data.total == '0') {
					this.listObj.pagetotal = data.total;
				}
				if (data.count || data.count == '0') {
					this.count = Number(data.count);
				}
			},
			async getCardType() {
				//获取卡类型
				let data = await http.cardTypeGetList({});
				this.cradTypeList = data;
			},
			getShopList: function () {
				// 获取卡属门店店铺列表
				if (this.ischain == '3') { // 处理品牌逻辑
					this.shopsList = storage.session('shopList');
					for (let item of this.shopsList) {
						item.name = item.shopName;
					}
				} else if (this.ischain == '0') {
					this.shopsName = this.userData.currentShop.name;
					this.listObj.belongToShop.push(this.userData.currentShop.id);
				}
			},
			changePage(obj) {
				this.listObj.page = obj.page;
				this.listObj.num = obj.num;
				this.getList();
			},
			translateTime: function (time, type) {
				// 转换时间
				if (type) {
					return utils.format(new Date(Number(time) * 1000), 'yyyy/MM/dd');
				} else {
					return utils.format(new Date(Number(time) * 1000), 'yyyy/MM/dd hh:mm');
				}
			},
			getCardShopName: function (item) {
				let shopsId = item.shopId;
				if (this.ischain == '0') {
					return this.userData.currentShop.name;
				} else {
					for (let i = 0; i < this.shopsList.length; i++) {
						if (shopsId.match(this.shopsList[i].id)) {
							return this.shopsList[i].name;
						}
					}
				}
			},
			// getCardTime: function (item) {//6.1
			// 	// ['无限期',this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1'),item.startCardTime + '天']
			// 	// 卡有效期
			// 	let self = this;
			// 	switch (Number(item.cardTimeType)) {
			// 		case 0:
			// 			return '无限期';
			// 			break;
			// 		case 1:
			// 			return self.translateTime(item.startCardTime, '1') + '-' + self.translateTime(item.endCardTime, '1');
			// 			break;
			// 		case 2:
			// 			return item.startCardTime + '天';
			// 			break;
			// 		default:
			// 	}
			// },
			//选择卡属门店
			getDetail: function (item, type) {
				this.showWin = true; //打开弹窗
				this.type = type;
				this.itemDetail = item;
				this.ass = 'getAppliedWins';
			},
			getResult: function (res) {
				if (res == 'ok') {
					this.getList();
					this.showWin = false;
				} else if (res == true) {
					this.getList(res, '');
				} else {
					this.showWin = false;
				}
			},
			getDrop(arr) {
				let idArr = [];
				arr.forEach((item) => {//,index
					if (item.selected == true) {
						idArr.push(item.id);
					}
				});
				this.listObj.cardTypeId = idArr.join(',');
			},
			//根据店铺id匹配店铺名
			getShopname: function() {
				if (this.shopName != '请选择店铺') {
					let list = this.shopName.split(',');
					let arr = [];
					for (let i = 0; i < list.length; i++) {
						let obj = {};
						if (i === 0) {
							obj.className = 'chyellow';
							obj.name = list[i];
						} else if (i === 1) {
							obj.className = 'chblue';
							obj.name = list[i];
						} else if (i === 2) {
							obj.className = 'chgreen';
							obj.name = list[i];
						} else {
							obj.className = '';
							obj.name = list[i];
						}
						arr.push(obj);
					}
					this.ChartShopName = arr;
					// this.ChartSelShop = arr.slice(0,3); 
				} else {
					this.shopName = '请选择店铺';
				}  
			},
			// 获取卡属门店店铺列表
			clickShopList: function (arr) {
				//console.log(arr,'arr');
				let idArr = [];
				arr.forEach((item) => {//,index
					if (item.selected == true) {
						idArr.push(item.id);
						this.selectedShopList = idArr; 
					}
				});
				this.listObj.belongToShop = idArr.join(',');
			},
			selexpirationTime: function (i) {
				this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
				this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
			},
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.getShopList();
			this.getList();
			this.getCardType();
		}

	};
</script>
<style type="text/css" scoped>
	#useCard .filtrate {
		display: inline-block;
		height: 40px;
		cursor: pointer;
		color: #44404A;
		margin-right: 14px;
		position: relative;
	}

	#useCard .filtrate .extent {
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

	.shoName-select {
		border-color: #FF9800;
		background: url(../../../src/res/images/sign.png) right bottom no-repeat;
	}

	#useCard .filterType {
		width: 211px;
		border: 1px solid #D1D1D1;
		background-color: #fff;
		margin-top: 50px;
		z-index: 999;
		position: absolute;
	}

	#useCard .filterType li {
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

	#useCard .filterType li:last-of-type {
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

	#useCard .activeCount {
		width: 100%;
		height: 52px;
		background-color: #fff;
		line-height: 52px;
		padding-left: 55px;
		position: relative;
		overflow: hidden;
	}

	#useCard .activeCount li {
		float: left;
		font-size: 16px;
		text-align: center;
	}

	#useCard .activeCount li span {
		color: #EB5027;
	}

	#useCard .activeCount li.bit {
		width: 24px;
		height: 100%;
		position: relative;
	}

	#useCard .activeCount li.bit span {
		width: 5px;
		height: 5px;
		background: #44404A;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin-top: -2px;
		margin-left: -2px;
	}

	#useCard .oUl {
		width: 100%;
		height: 45px;
		line-height: 45px;
	}

	#useCard .oUl li {
		width: 12.5%;
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

	#useCard .cardList .storeLi {
		width: 100%;
	}

	#useCard .cardList .storeLi li {
		float: left;
		width: 12.5%;
		height: 66px;
	}

	#useCard .cardList .storeBottom {
		width: 100%;
		height: 66px;
		text-align: center;
		line-height: 66px;
		border-bottom: 4px #F7F7F7 solid;
		overflow: hidden;
	}

	#useCard .cardList .storeBottom li:nth-of-type(1) {
		font-size: 16px;
		cursor: pointer;
		color: #2DA8DC;
	}

	.selectbtns .sign {
		border: 1px #FF9200 solid;
	}

	.selectbtns span {
		background-color: inherit;
		border: 1px #D2D2D2 solid;
	}

	.selectbtns span:hover {
		background-color: inherit;
	}
	#useCard  .store-show {
		width: 100%;
		margin-bottom: 10px;
		display: block;
		overflow: hidden;
		line-height: 20px;
		position: relative; 
	}
	#useCard  .store-show i {
		float: left;
		position: absolute;
		left: 0;
		top: 0;

	}
	#useCard  .store-show .store-block{
		overflow: hidden;
		width: 100%;
		padding-left: 84px;
	}
	#useCard  .store-show .store-block em{
		float: left;
		color: #09f;
		margin-right: 5px;
		cursor: pointer;
		text-decoration: underline;
	}
	#useCard  .store-show .store-block 	span {
		float: left;
		color: #333;
	}

	/*翻页================================*/

	.turn-page {
		margin: 10px 0 30px 0;
	}
</style>