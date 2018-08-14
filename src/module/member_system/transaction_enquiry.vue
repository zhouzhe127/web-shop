<!--
    **实体卡查询——交易查询
    *
    * 胡江
    * *
    *
-->
<template>
	<div id="transaction-enquiry">
		<section v-if="isShow == 'all'">
			<div class="content">
				<!--日期选择和搜索框-->
				<div class="date">
					<!--日期选择和搜索框-->
					<section class="fl">
						<section>
							<calendar :pObj="{time:startTime}" ref="triggerStartTime" @throwTime="getStartTime"></calendar>
						</section>
					</section>
					<span class="data-center">至</span>
					<section class="fl">
						<section>
							<calendar :pObj="{time:endTime}" ref="triggerEndTime" @throwTime="getEndTime"></calendar>
						</section>
					</section>
					<span class="order-order-searchA">
						<span v-on:click="screeningBtn()" class="order-order-search"></span>
					</span>
				</div>
				<div class="choise" style="float: left">
					<!-- 选择卡属门店 -->
					<section class="statisticsLists">
						<section @click="showhighList(1,$event)" class="tableListInp chairFix">
							<span class="spanSty">{{belongshigh}}</span>
							<div class="fl calendar-ctr">
								<i></i>
							</div>
						</section>
						<ul v-if="belongsLimit" class="tableListUl">
							<li @click="costhighShow(index,1,$event)" v-for='(item,index) in belongsList' :key="index">{{item.name}}</li>
						</ul>
					</section>
					<!-- 选择操作门店 -->
					<section class="statisticsLists">
						<section @click="showhighList(2,$event)" class="tableListInp chairFix">
							<span class="spanSty">{{storeshigh}}</span>
							<div class="fl calendar-ctr">
								<i></i>
							</div>
						</section>
						<ul v-if="storesLimit" class="tableListUl">
							<li @click="costhighShow(index,2,$event)" v-for='(item,index) in storesList' :key="index">{{item.name}}</li>
						</ul>
					</section>
					<!-- 交易类型 -->
					<section class="statisticsLists">
						<section @click="showhighList(3,$event)" class="tableListInp chairFix">
							<span class="spanSty">{{trantypehigh}}</span>
							<div class="fl calendar-ctr">
								<i></i>
							</div>
						</section>
						<ul v-if="trantypeLimit" class="tableListUl">
							<li @click="costhighShow(index,3,$event)" v-for='(item,index) in trantypeList' :key="index">{{item.name}}</li>
						</ul>
					</section>
				</div>
				<a href="javascript:;" style="background: #2EA8DC;" @click="screeningBtn()">筛选</a>
				<a href="javascript:;" style="background: #B3B3B3;" @click="filterReset()">重置</a>
			</div>
			<div style="clear: both;height: 20px"></div>
			<comTable :listName="'交易列表'" :titleData="titleData" :introData="consumeList" :allTotal="count" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50" :listWidth="1300" :fixed="0">
				<span slot="con-0" slot-scope="props" @click="openDetail(props.data)">
					{{props.data.cardNumber}}</span>
				<span slot="con-2" slot-scope="props">{{formatTime(props.data.createTime,'yyyy-MM-dd hh:mm')}}</span>
				<span slot="con-3" slot-scope="props" @click="openOid(props.data.oid,props.data.belongToShop,props.data.fromId)">
					{{(props.data.oid == '' || props.data.oid == '0')?'--':props.data.oid}}</span>
				<span slot="con-4" slot-scope="props">{{getshopName(props.data.belongToShop)}}</span>
				<span slot="con-5" slot-scope="props">{{getconsumeName(props.data.type)}}</span>
				<span slot="con-6" slot-scope="props">{{(props.data.type == '4' || props.data.type == '9')?props.data.operatePoint:props.data.operateAmount}}</span>
				<span slot="con-7" slot-scope="props">{{(props.data.type == '4' || props.data.type == '9')?props.data.point:props.data.amount}}</span>
				<span slot="con-8" slot-scope="props">{{getPaytype(props.data)}}</span>
				<span slot="con-9" slot-scope="props">{{isBrand?getshopName(props.data.fromId):getshopName(props.data.shopId)}}</span>
			</comTable>
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(TotalPage)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<!-- 订单详情 -->
		<orderDetail :detail="detail" :isDelete="false" v-if="isShow == 'order'" @detailShow="getDetailShow"></orderDetail>
		<!-- 卡号详情 -->
		<cardDetail v-if="isShow == 'detail'" @throwWinResult="getDetail" :cardNumber="cardNumber"></cardDetail>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isShow: 'all', //是否显示订单详情
			detail: null, //传给订单详情的数据
			userData: Object,
			isBrand: false, //是否是品牌
			belongsList: [], //卡属店铺的列表
			storesList: [], //操作店铺的列表
			shopList: [], //店铺列表
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			belongsId: '', //选中的店铺列表的id
			storesId: '', //选中的店铺列表的id
			belongsLimit: false, //店铺下拉框显示
			storesLimit: false, //店铺下拉框显示
			belongshigh: '选择卡属门店',
			storeshigh: '选择操作门店',
			trantypeList: [{ //交易类型
				name: '全部',
				id: 0
			}, {
				name: '消费',
				id: 1
			}, {
				name: '储值',
				id: 2
			}, {
				name: '卡激活',
				id: 15
			}, {
				name: '积分消费',
				id: 9
			}, {
				name: '积分奖励',
				id: 4
			}],
			trantypeId: '', //交易类型对应的id
			trantypeLimit: false, //交易类型
			trantypehigh: '全部',
			consumeList: [], //卡查询的数据列表
			page: 1, //页码数
			num: 10,
			TotalPage: '', //总页数
			count: '0', //数据的总的条数
			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null, //表格内容样式
			cardNumber: '', //卡号
		};
	},
	created() {
		this.titleData = [{
			titleName: '卡号',
			titleStyle: {
				width: 170 + 'px',
				fontSize: 16 + 'px',
				flex: 'none',
			},
			conStyle: {
				color: '#00AAE5',
				cursor: 'pointer'
			},
			dataName: 'cardNumber'
		},
		{
			titleName: '卡类型',
			dataName: 'cardTypeName',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '交易时间',
			titleStyle: {
				width: 150 + 'px',
				fontSize: 16 + 'px',
				flex: 'none',
			}
		},
		{
			titleName: '订单',
			titleStyle: {
				width: 180 + 'px',
				fontSize: 16 + 'px',
				flex: 'none',
			},
			conStyle: {
				color: '#00AAE5',
				cursor: 'pointer'
			}
		},
		{
			titleName: '卡属门店',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '交易类型',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '交易金额',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '余额',
			dataName: 'amount',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '支付类型',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		},
		{
			titleName: '操作来源',
			titleStyle: {
				fontSize: 16 + 'px'
			}
		}
		];
		this.bannerStyle = {
			backgroundColor: '#F2F2F2',
			color: '#434149',
			fontSize: '16px'
		};
		this.contentStyle = {
			color: '#666',
			fontSize: '14px'
		};
		// let obj1 = {
		// 	titleStyle: {
		// 		fontSize: 16 + 'px'
		// 	}
		// }
		// for (let item of this.titleData) {
		// 	Object.assign(item, obj1);
		// }
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '导出',
			className: ['fd-blue'],
			fn: () => {
				this.export();
			}
		}]);
		this.userData = storage.session('userShop');
		if (this.userData.currentShop && this.userData.currentShop.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}
		let shopNumber = []; //门店编号
		let shopName = []; //店铺名字
		let shopList = []; //店铺列表
		if (this.isBrand) {
			//                shopList = this.userData.currentShop.direct.concat(this.userData.currentShop.franchise); //获取到品牌下面所有店铺信息
			shopList = storage.session('shopList'); //获取到品牌下面所有店铺信息
			for (let i in shopList) {
				let obj = {
					name: shopList[i].shopNumber + '-' + shopList[i].shopName,
					id: shopList[i].id
				};
				let shopobj = {
					name: shopList[i].shopName,
					id: shopList[i].id
				};
				shopName.push(obj);
				shopNumber.push(shopobj);
			}
		} else {
			shopList.push(this.userData.currentShop);
			let obj = {
				name: this.userData.currentShop.shopNumber + '-' + this.userData.currentShop.name,
				id: this.userData.currentShop.id
			};
			let shopobj = {
				name: this.userData.currentShop.name,
				id: this.userData.currentShop.id
			};
			shopName.push(obj);
			shopNumber.push(shopobj);
		}
		this.belongsList = shopNumber;
		this.storesList = shopNumber;
		this.shopList = shopList;
		this.getCardConsumeList();
		document.onclick = () => {
			this.belongsLimit = false;
			this.storesLimit = false;
			this.trantypeLimit = false;
		};
	},
	destroyed() {
		//离开页面时 清除缓存数据
		storage.session('orderDetial', null);
	},
	methods: {
		//选择开始时间
		getStartTime(receiveTime) {
			this.startTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		//选择结束时间
		getEndTime(receiveTime) {
			this.endTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		//接受子组件传递回来的事件
		getDetailShow() { //从订单详情返回回来
			this.isShow = 'all';
		},
		//下拉框选择
		showhighList(type, e) {
			switch (type) {
				case 1:
					e.stopPropagation();
					this.belongsLimit = !this.belongsLimit;
					break;
				case 2:
					e.stopPropagation();
					this.storesLimit = !this.storesLimit;
					break;
				case 3:
					e.stopPropagation();
					this.trantypeLimit = !this.trantypeLimit;
					break;
			}
		},
		//选择下拉列表的某一项
		costhighShow(index, type, e) {
			switch (type) {
				case 1:
					e.stopPropagation();
					console.log(this.belongsList);
					this.belongshigh = this.belongsList[index].name; //点击卡类型对应的名字
					this.belongsId = this.belongsList[index].id; //点击卡类型对应的id
					this.belongsLimit = false;
					break;
				case 2:
					e.stopPropagation();
					this.storeshigh = this.storesList[index].name; //点击卡类型对应的名字
					this.storesId = this.storesList[index].id; //点击卡类型对应的id
					this.storesLimit = false;
					break;
				case 3:
					e.stopPropagation();
					this.trantypehigh = this.trantypeList[index].name; //点击卡类型对应的名字
					this.trantypeId = this.trantypeList[index].id; //点击卡类型对应的id
					this.trantypeLimit = false;
					break;
			}
		},
		//交易查询
		async getCardConsumeList() {
			if (this.startTime > this.endTime) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择正确的时间进行筛选'
				});
				return false;
			}
			if (String(this.storesType) == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择卡属门店'
				});
				return false;
			}
			if (String(this.operatingType) == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择操作门店'
				});
				return false;
			}
			let res = await http.getCardConsumeList({
				data: {
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					page: this.page, //请求的页数
					num: this.num, //请求的数据的条数
					fromId: this.storesId, //操作门店门牌号
					belongToShop: this.belongsId, //卡属门店
					memberCardId: 0, //实体卡关联id
					consumeType: this.trantypeId //交易类型
				}
			});
			if (res) {
				this.consumeList = res.consumeList;
				if (this.page == 1 && res.total) {
					this.TotalPage = res.total;
				}
				if (this.page == 1 && res.count) {
					this.count = res.count;
				}
				if (this.consumeList.length == 0) {
					this.count = 0;
				}
			}
		},
		//点击搜索（搜索图标和筛选）
		screeningBtn: function() {
			this.TotalPage = '';
			this.page = 1;
			this.getCardConsumeList(); //交易查询
		},
		//显示交易类型的文字
		/*eslint-disable*/
		getconsumeName: function(type) {
			switch (Number(type)) {
				case 1:
					return '消费';
					break;
				case 2:
					return '储值';
					break;
				case 3:
					return '积分兑换';
					break;
				case 15:
					return '卡激活';
					break;
				case 9:
					return '积分消费';
					break;
				case 4:
					return '积分奖励';
					break;
				case 5:
					return '裂变获得积分';
					break;
				case 6:
					return '微信消费';
					break;
				case 10:
					return '积分增加';
					break;
				case 11:
					return '积分减少';
					break;
				case 12:
					return '余额增加';
					break;
				case 13:
					return '余额减少';
					break;
				case 14:
					return '退款失败';
					break;
				default:
					return '全部';
			}
		},
		/*eslint-enable*/
		//显示支付类型的文字
		getPaytype(item) {
			if (item.type == '3' || item.type == '4' || item.type == '9' || item.type == '10' || item.type == '11' || item.type ==
				'12' || item.type == '13' || item.type == '14') {
				return '--';
			} else if (item.type == '1') {
				if (item.memberType == '0') {
					return '会员卡支付';
				} else if (item.type == '1') {
					return '卡支付';
				}
			} else if (item.payType == '1') {
				return '现金';
			} else if (item.payType == '2') {
				return '银行卡';
			} else if (item.payType == '3') {
				return '微信';
			} else if (item.payType == '4') {
				return '支付宝';
			} else if (item.payType == '6') {
				return '中信微信';
			} else if (item.payType == '7') {
				return '中信支付宝';
			} else if (item.payType == '6') {
				return '卡支付';
			}
		},
		//把时间戳转化成***年**月**日
		formatTime(time, str) {
			return utils.format(new Date(Number(time) * 1000), str);
		},
		//将店铺编号转换成对应的shopId
		getshopId: function(num, shop) {
			let shopId = '';
			if (String(num) == '') {
				return '';
			} else {
				for (let i = 0; i < this.shopList.length; i++) {
					if (shop[Number(num)] == this.shopList[i].name) {
						shopId = this.shopList[i].id;
					}
				}
				return shopId;
			}
		},
		//根据id获取店铺名称
		getshopName(id) {
			let shopName;
			for (let i = 0; i < this.shopList.length; i++) {
				if (id == this.shopList[i].id) {
					shopName = this.isBrand ? this.shopList[i].shopName : this.shopList[i].name;
				}
			}
			return shopName;
		},
		//重置
		filterReset() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.page = 1;
			this.belongshigh = '选择卡属门店';
			this.belongsId = '';
			this.storeshigh = '选择操作门店';
			this.trantypehigh = '全部';
			this.trantypeId = '';
			this.screeningBtn();
		},
		//点击查看详情
		async openOid(oid, belongToShop, fromId) {
			if (oid == '' || oid == '0') {
				return;
			}
			let res = await http.OrderstatisticsBillDelite({
				data: {
					shopId: this.isBrand == true ? fromId : belongToShop,
					oid: oid
				}
			});
			if (res) {
				res.oidDetial = 'enquiry'; //自定义商品统计特有标记
				this.detail = res;
				if (this.isBrand) {
					this.detail.fromId = fromId;
				}
			}
			this.isShow = 'order';
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.getCardConsumeList();
		},
		async
		export () {
			await http.exportCardConsumeList({
				data: {
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					page: this.page, //请求的页数
					num: this.num, //请求的数据的条数
					fromId: this.storesId, //操作门店门牌号
					belongToShop: this.belongsId, //卡属门店
					memberCardId: 0, //实体卡关联id
					consumeType: this.trantypeId, //交易类型
					export: 1
				}
			});
		},
		openDetail: function(item) { //点击查看详情
			this.cardNumber = item.cardNumber;
			this.isShow = 'detail';
		},
		//子组件返回的事件
		getDetail() { //从卡详情返回回来
			this.isShow = 'all';
			this.$store.commit('setPageTools', [{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.export();
				}
			}]);
		},
	},
	components: {
		orderDetail: () =>
			import ( /*webpackChunkName: 'delete_detail'*/ '../statistics/delete_detail'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		//详情
		cardDetail: () =>
			import ( /*webpackChunkName: 'card_queries_detail'*/ './card_queries_detail'),
	}
};
</script>
<style lang="less" scoped>
#transaction-enquiry {
	.content {
		width: 100%;
		margin-bottom: 30px;

		.date {
			float: left;
			.data-center {
				float: left;
				width: 25px;
				line-height: 40px;
				text-align: center;
			}
			/*搜索图标*/
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
			.order-order-searchA:hover {
				background-color: #1878a5;
				transition: background-color ease-in-out 0.2s;
			}
			.order-order-searchA:active {
				background-color: #154961;
			}
			.order-order-search {
				background: url(../../res/images/search.png) center center no-repeat;
			}
		}
	}
}























/*三角形-所有的边框线*/

.calendar-ctr {
	width: 38px;
	height: 40px;
	position: relative;
	z-index: 5;
	border-left: #b3b3b3 solid 1px;
}

.calendar-ctr i {
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
}

.statisticsLists {
	border: 1px solid #cccccc;
}
























/*下拉列表选择*/

#transaction-enquiry .statisticsLists {
	position: relative;
	line-height: 35px;
	font-size: 16px;
	text-align: left;
	display: inline-block;
	width: 180px;
	vertical-align: middle;
	float: left;
	margin-right: 5px;
}

#transaction-enquiry .statisticsLists .spanSty {
	height: 38px;
	width: 137px;
	display: block;
	float: left;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

#transaction-enquiry .statisticsLists ul {
	width: 100%;
	max-height: 205px;
	overflow: auto;
	margin: 0;
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#transaction-enquiry .statisticsLists ul li {
	width: 100%;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#transaction-enquiry .statisticsLists ul li:hover {
	background: #f1f1f1;
}

#transaction-enquiry .choise .tableListInp div {
	width: 38px;
	height: 38px;
	position: relative;
	z-index: 5;
}























/*搜索和重置*/

#transaction-enquiry .content a {
	display: block;
	width: 80px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #fff;
	float: left;
	margin-left: 5px;
}























/*分页*/

#transaction-enquiry .pages {
	float: left;
	width: 100%;
	margin-top: 40px;
	height: 40px;
	position: relative;
	margin-bottom: 40px;
}























/*列表*/


/*#transaction-enquiry .list{*/


/*width: 100%;*/


/*min-height: 156px;*/


/*border: 1px solid #D2D2D2;*/


/*}*/


/*#transaction-enquiry .list .list_title{*/


/*width: 100%;*/


/*height: 45px;*/


/*line-height: 45px;*/


/*padding-left: 17px;*/


/*}*/


/*#transaction-enquiry .list .list_title span{*/


/*font-size: 16px;*/


/*color: #333;*/


/*font-weight: bold;*/


/*}*/


/*#transaction-enquiry .list .list_title span:first-child{*/


/*margin-right: 11px;*/


/*}*/


/*#transaction-enquiry .list .list_title span:nth-child(2){*/


/*display:inline-block;*/


/*width: 5px;*/


/*height: 5px;*/


/*border-radius: 50%;*/


/*background: #000;*/


/*margin-right: 11px;*/


/*vertical-align:middle;*/


/*}*/


/*#transaction-enquiry .list .list_title span:last-child a{*/


/*font-size: 16px;*/


/*color: #FF3C05;*/


/*}*/


/*#transaction-enquiry .list .heads{*/


/*width: 100%;*/


/*height: 41px;*/


/*background: #F2F2F2;*/


/*}*/


/*#transaction-enquiry .list .heads li{*/


/*float: left;*/


/*width: 8.75%;*/


/*text-align: center;*/


/*line-height: 41px;*/


/*font-size: 16px;*/


/*color: #43414A;*/


/*}*/


/*#transaction-enquiry .list .noList{*/


/*width: 100%;*/


/*height: 68px;*/


/*text-align: center;*/


/*line-height: 68px;*/


/*font-size: 24px;*/


/*color: #E0E0E0;*/


/*}*/


/*#transaction-enquiry .list .contents{*/


/*width: 100%;*/


/*height: 69px;*/


/*border-bottom: 1px solid #F7F7F7;*/


/*}*/


/*#transaction-enquiry .list .contents .sty{*/


/*color: #00AAE5;*/


/*cursor: pointer;*/


/*}*/


/*#transaction-enquiry .list .contents li{*/


/*float: left;*/


/*width: 8.75%;*/


/*height: 69px;*/


/*text-align: center;*/


/*line-height: 69px;*/


/*font-size: 14px;*/


/*color: #666;*/


/*overflow: hidden;*/


/*text-overflow: ellipsis;*/


/*white-space: nowrap;*/


/*}*/
</style>