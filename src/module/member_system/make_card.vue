<!--
    **制卡
    *
    * 
    * *孔伟研
    *
-->
<template>
	<section>
		<div v-if='!showN' id='card-printing' style='min-width:1414px;'>
			<div class='search-fun'>
				<a @click='createCard' href='javascript:void(0)' class='blue create-card-printing'>新建制卡</a>
			</div>
			<section class='searchBox'>
				<!--日期选择和搜索框-->
				<div class='date'>
					<!--日期选择和搜索框-->
					<section class=' fl'>
						<section class='tableListInp'>
							<calendar :pObj='{time:listObj.startTime}' @throwTime='thisStartTime' class='calendar' style='width: 190px;height: 42px;float: left;'></calendar>
						</section>
					</section>
					<span style='float: left;display: inline-block; width: 25px;line-height: 40px;text-align: center;margin-left:5px;'>--</span>
					<section class=' fl'>
						<section class='tableListInp'>
							<calendar :pObj='{time:listObj.endTime}' @throwTime='thisEndTime' style='width: 158px;height: 42px;float: left;'></calendar>
						</section>
					</section>
					<span class='order-order-searchA'>
						<span @click='getList' class='order-order-search' href='javascript:void(0)'></span>
					</span>
				</div>
				<div class='filtrate fl'>
					<selectStore @emit='getDrop' :sorts='cradTypeList' :tipName="'请选择卡类型'"></selectStore>
				</div>
				<div class='filtrate fl'>
					<selectStore @emit='clickShopList' :sorts='shopsList' :tipName='shopsName'></selectStore>
				</div>
				<div class='filtrate fl'>
					<selectStore @emit='selectCard' :sorts='cardAttr' :tipName='attrName'></selectStore>
				</div>
				<a href='javascript:void(0);' class='blue fl btn_a' @click='getList'>筛选</a>
				<a href='javascript:void(0);' class='gray fl btn_a' @click='resetInput'>重置</a>
			</section>

			<section style='width: 100%;height: 42px;margin-right: 20px;margin-bottom: 22px;'>
				<span @click='choseType(i,type)' v-for='(type,i) in typeList' :key='i' class='filtCard' :class="typeIndex == i ? 'allData' : ''">{{type.name}}</span>
			</section>
			<com-table :listHeight='80' :listName="'制卡列表'" :showTitle='1' :listWidth='1400' :introData='list' :titleData='titleList'
			    :allTotal='list.length'>
				<div slot='con-0' slot-scope='props' class='storeBottom'>
					<span @click='updateStatus(props.index,props.data)'>
						<template v-if="props.data.status == '0'">待启用</template>
						<template v-if="props.data.status == '1'">已启用</template>
						<template v-if="props.data.status == '2'">已停用</template>
					</span>
					<span @click='getDetail(props.data)'>查看详情</span>
				</div>
				<div slot='con-3' slot-scope='props'>{{getCardShopName(props.data)}}</div>
				<div slot='con-4' slot-scope='props'>
					<template v-if="props.data.cardAttr == '1'">通用</template>
					<template v-if="props.data.cardAttr == '2'">直营店</template>
					<template v-if="props.data.cardAttr == '3'">加盟店</template>
				</div>
				<div slot='con-5' slot-scope='props'>{{getCardname[Number(props.data.cardTimeType)]}}</div>
				<div slot='con-6' slot-scope='props'>{{translateTime(props.data.createTime)}}</div>
			</com-table>
			<pageElement @pageNum='addpage' :page='listObj.page' :total='total' :num='listObj.num' :isNoJump='true'></pageElement>
		</div>
		<makeCardDetialWim v-if='showWin' @makeCardDetialWim='detialResult' :detailObj='detial'></makeCardDetialWim>
		<makeCardWin v-if='showN' @makeCardWin='newGetResult'></makeCardWin>
	</section>
</template>
<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	// import makeCardWin from './make_card_win.vue';
	// import makeCardDetialWim from './make_card_detial_win.vue'
	export default {
		data() {
			return {
				listObj: { // 获取列表传递到json数据
					'startTime': new Date().setHours(0, 0, 0, 0),
					'endTime': new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1000,
					'page': 1,
					'num': 10,
					'status': '',
					'cardTypeId': [],
					'cardShopId': [],
					'cardAttr': []
				},
				cradTypeList: [], // 卡类型列表
				list: [], //制卡列表
				lists: [], // 筛选出的总数据
				total: 0, // 总页数
				typeList: [{
					'name': '全部',
					status: ''
				}, {
					'name': '待启用',
					status: '0'
				}, {
					'name': '已启用',
					status: '1'
				}, {
					'name': '已停用',
					status: '2'
				}],
				typeIndex: 0,
				isFilterCard: false, // 是否打开卡类型弹窗
				isShop: false, // 是否打开卡属门店弹窗
				isAttr: false, // 是否打开卡性质弹窗
				filterCardName: '请选择卡类型',
				shopsName: '请选择卡属门店',
				attrName: '请选择卡性质',
				// allCardName: false, // 是否全选卡类型
				// allAttrName: false, // 是否全选卡性质
				// allShopName: false, // 是否全选店铺
				cardAttr: [{
					name: '通用',
					id: '1',
					isOn: false
				}, {
					name: '直营店',
					id: '2',
					isOn: false
				}, {
					name: '加盟店',
					id: '3',
					isOn: false
				}],
				shopsList: [], // 卡属门店
				showN: false, //是否显示制卡
				showWin: false, //显示制卡详情
				detial: null, //制卡详情
				ischain: '',
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '160px',
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
					titleName: '卡属门店'
				},
				{
					titleName: '卡性质'
				},
				{
					titleName: '有效期'
				},
				{
					titleName: '创建时间'
				},
				],
				getCardname: ['无限期',`this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1')`,`item.startCardTime + '天'`],
			};
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
			// makeCardDetialWim,
			// makeCardWin,
			makeCardDetialWim: () =>
				import ( /*webpackChunkName: 'make_card_detial_win'*/ './make_card_detial_win'),
			makeCardWin: () =>
				import ( /*webpackChunkName: 'make_card_win'*/ './make_card_win'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),

		},
		mounted() {
			this.getShopList();
			this.getList();
			this.getCardTypeList();
			if (storage.session('isCardType')) {
				this.showN = true;
				// this.shownewMake = makeCardWin;
				storage.session('isCardType', false);
			}
		},
		methods: {
			getShopList: function () {
				let userData = storage.session('userShop');
				this.ischain = userData.currentShop.ischain; // 0为单店 3为品牌
				this.shopsList = [];
				this.listObj.cardShopId = [];
				if (this.ischain == '3') { // 处理品牌逻辑
					this.shopsList = this.shopsList.concat(userData.currentShop.direct);
					this.shopsList = this.shopsList.concat(userData.currentShop.franchise);
					if (this.shopsList.length > 0) {
						for (let i = 0; i < this.shopsList.length; i++) {
							this.shopsList[i].isOn = false;
							if (this.shopsList[i].status != '0') {
								this.shopsList.splice(i, 1);
								i--;
							}

						}
					}
				} else {
					this.shopsName = userData.currentShop.name;
					this.listObj.cardShopId.push(userData.currentShop.id);
				}
			},
			//重置
			resetInput: function () {
				this.listObj = { // 获取列表传递到json数据
					startTime: new Date().setHours(0, 0, 0, 0),
					endTime: new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1000,
					page: 1,
					num: 10,
					status: '',
					cardTypeId: [],
					cardShopId: (this.ischain == '0') ? this.listObj.cardShopId : [],
					cardAttr: []
				};
				this.filterCardName = '请选择卡类型';
				this.shopsName = (this.ischain == '0') ? this.shopsName : '请选择卡属门店';
				this.attrName = '请选择卡性质';
				this.total = '';
				this.cardAttr = [{
					name: '通用',
					id: '1',
					isOn: false
				}, {
					name: '直营店',
					id: '2',
					isOn: false
				}, {
					name: '加盟店',
					id: '3',
					isOn: false
				}],
				this.getShopList();
				this.getCardTypeList();
				this.getCartList();
			},
			//卡类型组件触发事件
			getDrop(arr) {
				let idArr = [];
				arr.forEach((item) => {//, index
					if (item.selected == true) {
						idArr.push(item.id);
					}
				});
				this.listObj.cardTypeId = idArr.join(',');
			},
			//查看详情返回值
			detialResult: function (res) {
				if (res == 'ok' || res == 'cancel' || res == 'close') {
					this.showWin = false;
				} else {
					this.showWin = true;
				}
			},
			// 获取卡属门店店铺列表
			clickShopList: function (arr) {
				let idArr = [];
				arr.forEach((item) => {//, index
					if (item.selected == true) {
						idArr.push(item.id);
					}
				});
				this.listObj.cardShopId = idArr.join(',');
			},
			//选择卡性质
			selectCard: function (arr) {
				let idArr = [];
				arr.forEach((item) => {//, index
					if (item.selected == true) {
						idArr.push(item.id);
					}
				});
				this.listObj.cardAttr = idArr.join(',');
			},
			//新建制卡
			createCard: function () {
				this.showN = true;
				// this.shownewMake = makeCardWin;
			},
			//从新建制卡返回
			newGetResult: function () {
				this.showN = false;
				this.getCartList();
			},
			//状态筛选
			choseType: function (index, item) {
				this.typeIndex = index;
				this.listObj.page = 1;
				this.listObj.status = item.status;
				this.getCartList();
			},
			//启用或关闭
			updateStatus: function (index, item) {
				let title = item.status == 2 || item.status == 0 ? '确认启用？' : '确认停用？';
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: title,
					callback: (delRes) => {
						if (delRes == 'ok') {
							this.getupdateStatus(index, item);
						}
					}
				});
			},
			//启用或关闭 接口
			async getupdateStatus(index, item) {
				let id = item.id;
				let aaa = await http.updateStatusCard({
					data: {
						id: id
					}
				});
				item.status = aaa.status;
				this.list.splice(index, 1, item);
				this.lists.splice(index, 1, item);
			},
			async getDetail(item) {
				let id = item.id;
				this.detial = await http.getCardDetail({
					data: {
						id: id
					}
				});
				this.detial.cardCoupon = JSON.parse(this.detial.cardCoupon);
				this.showWin = true;
				// this.det = makeCardDetialWim;
			},
			//下一页
			addpage: function (e) {
				this.listObj.page = e.page;
				this.listObj.num = e.num;
				this.getList();
			},
			thisStartTime: function (time) {
				this.listObj.startTime = time;
			},
			thisEndTime: function (time) {
				this.listObj.endTime = time;
			},
			getList: function () {//type
				if (this.listObj.startTime > this.listObj.endTime) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alert',
						content: '请选择正确的时间进行筛选?'
					});
					return false;
				}
				this.isAttr = false;
				this.isShop = false;
				this.isFilterCard = false;
				// this.typeIndex = 0;
				this.getCartList();
			},
			// 获取制卡列表
			async getCartList() {
				let res = await http.getCardList({
					data: {
						'startTime': parseInt(this.listObj.startTime / 1000),
						'endTime': parseInt(this.listObj.endTime / 1000),
						'page': this.listObj.page,
						'num': this.listObj.num,
						'status': this.listObj.status, // this.listObj.status 改需求，前端筛选状态
						'cardTypeId': this.listObj.cardTypeId.toString(),
						'cardShopId': this.listObj.cardShopId.toString(),
						'cardAttr': this.listObj.cardAttr.toString()
					}
				});
				this.list = res.list;
				this.lists = res.list;
				if (this.listObj.page == 1 && res.total) {
					this.total = res.total;
				}
				if (res.list.length == 0) {
					this.total = 1;
				}
			},
			// 获取卡类型列表
			async getCardTypeList() {
				this.cradTypeList = await http.getCardTypeList({
					data: {}
				});
				if (this.cradTypeList.length > 0) {
					for (let i = 0; i < this.cradTypeList.length; i++) {
						this.cradTypeList[i].isOn = false;
					}
				}
			},
			// 获取卡属门店
			getCardShopName: function (item) {
				let userData = storage.session('userShop');
				let ischain = this.ischain;
				let shopsId = item.shopId;
				let shopList = [];
				shopList = shopList.concat(userData.currentShop.direct);
				shopList = shopList.concat(userData.currentShop.franchise);
				if (ischain == '0') {
					return userData.currentShop.name;
				} else {
					if (shopList.length > 0) {
						for (let i = 0; i < shopList.length; i++) {
							if (shopsId.match(shopList[i].id)) {
								return shopList[i].name;
							}
						}
					}
				}
			},
			// 卡有效期
			// getCardTime: function (item) {
			// 	//getCardname: ['无限期',`this.translateTime(item.startCardTime, '1') + '-' + this.translateTime(item.endCardTime, '1')`,`item.startCardTime + '天'`],
			// 	//getCardname[Number(props.data.cardTimeType)]
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
			// 转换时间
			translateTime: function (time, type) {
				if (type) {
					return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
				} else {
					return utils.format(new Date(time * 1000), 'yyyy/MM/dd hh:mm');
				}
			},
		},

	};
</script>
<style type='text/css' scoped>
	#card-printing .searchBox {
		width: 100%;
		height: 42px;
		margin-bottom: 20px;
	}

	#card-printing .create-card-printing {
		width: 100px;
		line-height: 40px;
		height: 40px;
		font-size: 14px;
		cursor: pointer;
		position: absolute;
		top: -70px;
		right: 60px;
	}

	#card-printing .solution {
		width: 121px;
		height: 42px;
		background: #2EA8DC;
		color: #fff;
		font-size: 16px;
		line-height: 42px;
		text-align: center;
		float: right;
		margin-top: -60px;
		cursor: pointer;
	}

	#card-printing .date {
		width: 580px;
		float: left;
	}

	#card-printing .search-fun {
		position: absolute;
		top: 80px;
		right: 0;
	}

	/* #card-printing .date .statisticsList input {
		text-align: center;
		display: block;
		float: left;
		height: 38px;
		width: 158px;
		outline: none;
		border: 0;
	} */

	/* #card-printing .date .statisticsList ul {
		width: 100%;
		margin: 0;
		position: absolute;
		top: 43px;
		left: 0;
		z-index: 10;
		background: #fff;
	}
	#card-printing .date .statisticsList ul li {
		text-align: center;
		height: 41px;
		border: 1px #b3b3b3 solid;
		border-top: 0;
		background: #fff;
		cursor: pointer;
	} */

	#card-printing .date .tableListInp {
		color: #666666;
		height: 42px;
		width: 240px;
		cursor: pointer;
		/* border: #b3b3b3 solid 1px; */
		box-sizing: border-box;
	}

	/* #card-printing .date .tableListInp .calendar-ctr {
		width: 38px;
		height: 40px;
		position: relative;
		z-index: 5;
		border-left: #b3b3b3 solid 1px;
	} */

	/* #card-printing .date .tableListInp div i {
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
		/* float: left; */
		width: 40px;
		height: 40px;
		background-color: #29A7E1;
		cursor: pointer;
		margin-right: 15px;
	}

	#card-printing .order-order-search {
		background: url(../../res/images/search.png) center center no-repeat;
	}

	#card-printing .order-order-searchA:hover {
		background-color: #1878a5;
		transition: background-color ease-in-out 0.2s;
	}

	#card-printing .order-order-searchA:active {
		background-color: #154961;
	}

	#card-printing .filtrate {
		display: inline-block;
		height: 40px;
		cursor: pointer;
		color: #44404A;
		/* border: 1px solid #D2D2D2; */
		margin-right: 14px;
		position: relative;
	}

	/* #card-printing .filtrate .extent {
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
	} */

	#card-printing .triangle {
		position: relative;
		width: 40px;
		height: 40px;
	}

	#card-printing .triangle i {
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

	#card-printing .filtCard {
		display: inline-block;
		width: 121px;
		height: 41px;
		font-size: 16px;
		line-height: 41px;
		text-align: center;
		border-radius: 4px;
		background: #F2F2F2;
		color: #333333;
		margin-right: 14px;
		cursor: pointer;
	}

	#card-printing .allData {
		background: #2EA8DC;
		color: #fff;
	}

	#card-printing .haveCard {
		background: #F2F2F2;
		color: #333333;
	}

	#card-printing .noCard {
		background: #F2F2F2;
		color: #333333;
	}

	#card-printing .activeCount {
		width: 100%;
		height: 52px;
		background-color: #fff;
		line-height: 52px;
		padding-left: 55px;
		position: relative;
		overflow: hidden;
	}

	#card-printing .activeCount li {
		float: left;
		font-size: 16px;
		text-align: center;
	}

	#card-printing .activeCount li span {
		color: #EB5027;
	}

	#card-printing .activeCount li.bit {
		width: 24px;
		height: 100%;
		position: relative;
	}

	#card-printing .activeCount li.bit span {
		width: 5px;
		height: 5px;
		background: #44404A;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin-top: -2px;
		margin-left: -2px;
	}

	#card-printing .oUl {
		width: 100%;
		height: 45px;
		line-height: 45px;
	}

	#card-printing .oUl li {
		width: 14.2%;
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

	#card-printing .cardList .storeLi {
		width: 100%;
	}

	#card-printing .cardList .storeLi li {
		float: left;
		width: 14.2%;
	}

	.storeBottom {
		width: 100%;
		height: 80px;
		text-align: center;
		line-height: 80px;
		overflow: hidden;
	}

	.storeBottom span {
		font-size: 16px;
		cursor: pointer;
	}

	.storeBottom span:nth-of-type(1) {
		padding-right: 10px;
		color: #FF8D08;
		margin-left: 10px;
	}

	.storeBottom span:nth-of-type(2) {
		border-left: 2px #CECECE solid;
		padding: 0 15px;
		color: #2DA8DC;
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
		background: url(../../res/images/sign.png) right bottom no-repeat;
	}

	.detailItem {
		padding-left: 50px;
		height: auto;
		min-height: 50px;
		line-height: 50px;
		width: 560px;
		font-size: 14px;
		color: #666666;
		overflow: hidden;
	}

	.btn_a {
		display: block;
		width: 95px;
		height: 40px;
		line-height: 40px;
		margin-right:10px;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#card-printing .searchBox {
			width: 100%;
			height: 120px;
			margin-bottom: 20px;
			line-height: 40px;
		}
		.btn_a {
			display: block;
			width: 60px;
			height: 40px;
			line-height: 40px;
		}
		#card-printing .date {
			width: 580px;
			float: none;
		}

	}
</style>