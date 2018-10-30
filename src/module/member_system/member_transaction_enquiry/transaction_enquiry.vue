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
			<!--日期选择和搜索框-->
			<div class="date">
				<!--日期选择和搜索框-->
				<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false">
				</el-date-picker>
			</div>
			<!-- 第二行 -->
			<div class="date">
				<!-- 选择卡属门店 -->
				<div class="dateBox fl" v-if="cardTypeId == 1 && isBrand">
					<selectStore :showName="'请选择卡属门店'" :shopIds="belongsId" @chooseShop="backShopId"></selectStore>
				</div>
				<!-- 选择操作门店 -->
				<div class="dateBox fl" v-if="isBrand">
					<selectStore :showName="'请选择操作门店'" :shopIds="storesId" @chooseShop="backstoresId"></selectStore>
				</div>
				<!-- 选择交易类型 -->
				<div class="dateBox fl">
					<el-select v-model="trantypehigh" placeholder="请选择" @change="selData" style="color:#c0c4cc">
						<el-option v-for="item in trantypeList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 筛选 -->
				<div class="dateBox fl">
					<el-button type="primary" @click="screeningBtn" style="width:120px;">筛选</el-button>
					<el-button type="info" @click="filterReset" style="width:120px;">重置</el-button>
				</div>
			</div>
			<!-- 电子卡 实体卡 -->
			<div class="date">
				<el-radio-group v-model="cardTypeselect">
					<el-radio-button v-for="(item,index) in cardTypeList" :key="index" :label="item.name" @change.native="selcardType(item)"></el-radio-button>
				</el-radio-group>
			</div>
			<!-- 下面的表格 -->
			<div class="list">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>交易列表</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="consumeList" border style="width:1400px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column fixed prop="cardNumber" label="卡号" width="180" align="center">
						<template slot-scope="scope">
							<span v-if="cardTypeId == 0" style="color: #E1BB4A " @click="openDetail(scope.row)">{{scope.row.mobile}}</span>
							<span v-else @click="openDetail(scope.row)" style="color: #E1BB4A ">{{scope.row.cardNumber}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="cardTypeName" label="卡类型" width="100" align="center">
						<template slot-scope="scope">
							<span v-if="cardTypeId == 0">电子卡</span>
							<span v-else>{{scope.row.cardTypeName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="交易时间" width="140" align="center">
						<template slot-scope="scope">
							<span>{{formatTime(scope.row.createTime,'yyyy-MM-dd hh:mm')}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="oid" label="订单" width="180" align="center">
						<template slot-scope="scope">
							<span @click="openOid(scope.row.oid,scope.row.belongToShop,scope.row.fromId)" style="color: #E1BB4A ">{{(scope.row.oid == '' || scope.row.oid == '0')?'--':scope.row.oid}}</span>
						</template>
					</el-table-column>
					<el-table-column label="卡属门店" width="140" align="center">
						<template slot-scope="scope">
							<span>{{getshopName(scope.row.belongToShop)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="交易类型" width="140" align="center">
						<template slot-scope="scope">
							<span>{{getconsumeName(scope.row.type)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="交易金额" width="100" align="center">
						<template slot-scope="scope">
							<span>{{judgeTypes(scope.row)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="余额" width="100" align="center">
						<template slot-scope="scope">
							<span>{{(scope.row.type == '4' || scope.row.type == '9')?scope.row.point:scope.row.amount}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="支付类型" width="140" align="center">
						<template slot-scope="scope">
							<span>{{getPaytype(scope.row)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="receiveNum" label="操作来源" width="180" align="center">
						<template slot-scope="scope">
							<span>{{isBrand ?  getshopName(scope.row.fromId):getshopName(scope.row.shopId)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- <comTable :listName="'交易列表'" :titleData="titleData" :introData="consumeList" :allTotal="count" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50" :listWidth="1300" :fixed="0">
				<span slot="con-0" slot-scope="props" @click="openDetail(scope.row)">
					{{scope.row.cardNumber}}</span>
				<span slot="con-2" slot-scope="props">{{formatTime(scope.row.createTime,'yyyy-MM-dd hh:mm')}}</span>
				<span slot="con-3" slot-scope="props" @click="openOid(scope.row.oid,scope.row.belongToShop,scope.row.fromId)">
					{{(scope.row.oid == '' || scope.row.oid == '0')?'--':scope.row.oid}}</span>
				<span slot="con-4" slot-scope="props">{{getshopName(scope.row.belongToShop)}}</span>
				<span slot="con-5" slot-scope="props">{{getconsumeName(scope.row.type)}}</span>
				<span slot="con-6" slot-scope="props">{{(scope.row.type == '4' || scope.row.type == '9')?scope.row.operatePoint:scope.row.operateAmount}}</span>
				<span slot="con-7" slot-scope="props">{{(scope.row.type == '4' || scope.row.type == '9')?scope.row.point:scope.row.amount}}</span>
				<span slot="con-8" slot-scope="props">{{getPaytype(scope.row)}}</span>
				<span slot="con-9" slot-scope="props">{{isBrand?getshopName(scope.row.fromId):getshopName(scope.row.shopId)}}</span>
			</comTable> -->
			<section class="turn-page">
				<!-- <pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(TotalPage)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
				<div class="pageWrap">
					<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="TotalPage" :page-sizes="[10, 20, 30]"></el-pagination>
				</div>
			</section>
		</section>
		<!-- 订单详情 -->
		<orderDetail :detail="detail" :isDelete="false" v-if="isShow == 'order'" @detailShow="getDetailShow"></orderDetail>
		<!-- 卡号详情 -->
		<cardDetail v-if="isShow == 'detail'" @throwWinResult="getDetail" :cardNumber="cardNumber"></cardDetail>
		<!-- 会员信息详情电子卡 -->
		<memberDetail v-if="isShow == 'member'" :mid='mid' :shopsId='shopsId' @throwWinResult="getDetail"></memberDetail>
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
			valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
			belongsId: [], //选中的店铺列表的id
			storesId: [], //选中的店铺列表的id
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
			TotalPage: 1, //总页数
			count: 0, //数据的总的条数
			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null, //表格内容样式
			cardNumber: '', //卡号
			cardTypeselect: '电子卡', //电子卡实体卡选择切换
			cardTypeList: [{
				name: '电子卡',
				id: 0
			}, {
				name: '实体卡',
				id: 1
			}],
			cardTypeId: 0, //选中的卡类型的ifd
			mid: '',
			shopsId: '',
			constructionshopId: '' //单店的id
		};
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
			this.constructionshopId = this.userData.currentShop.id; //单店的id
		}
		let shopNumber = []; //门店编号
		let shopName = []; //店铺名字
		let shopList = []; //店铺列表
		if (this.isBrand) {
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
		if(!this.isBrand){
			this.getCardConsumeList();
		}
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
		//交易查询
		checkForm: function() {
			if (this.storesId.length == 0 && this.isBrand) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择操作门店'
				});
				return false;
			}
			if (this.belongsId.length == 0 && this.cardTypeId == 1 && this.isBrand) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择卡属门店'
				});
				return false;
			}
			return true;
		},
		async getCardConsumeList() {
			if (!this.checkForm()) return;
			let res = await http.getCardConsumeList({
				data: {
					startTime: parseInt(this.valueTime[0] / 1000), //开始时间
					endTime: parseInt(this.valueTime[1] / 1000), //结束时间
					page: this.page, //请求的页数
					num: this.num, //请求的数据的条数
					fromId: this.isBrand ? this.storesId.join(',') : this.constructionshopId, //操作门店门牌号
					belongToShop: this.isBrand ? this.belongsId.join(',') : '', //卡属门店
					memberCardId: 0, //实体卡关联id
					consumeType: this.trantypeId, //交易类型
					memberType: this.cardTypeId
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
			this.TotalPage = 1;
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
			let shopName = '--';
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
			// if(belongToShop == '' || belongToShop == 0){
			// 	this.$store.commit('setWin', {
			// 		title: '温馨提示',
			// 		winType: 'alter',
			// 		content: '快捷支付暂无法查看订单详情'
			// 	});
			// 	return false;				
			// }
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
		async export () {
			await http.exportCardConsumeList({
				data: {
					startTime: parseInt(this.valueTime[0] / 1000), //开始时间
					endTime: parseInt(this.valueTime[1] / 1000), //结束时间
					page: this.page, //请求的页数
					num: this.num, //请求的数据的条数
					fromId: this.isBrand ? this.storesId.join(',') : this.constructionshopId, //操作门店门牌号
					belongToShop: this.isBrand ? this.belongsId.join(',') : '', //卡属门店
					memberCardId: 0, //实体卡关联id
					consumeType: this.trantypeId, //交易类型
					memberType: this.cardTypeId,
					export: 1
				}
			});
		},
		openDetail: function(item) { //点击查看详情
			if (item.cardNumber == '') {
				this.isShow = 'member';
				this.mid = item.memberId;
				this.shopsId = item.shopId;
			} else {
				this.cardNumber = item.cardNumber;
				this.isShow = 'detail';
			}
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
		//组件返回店铺Id
		backShopId: function(id) { //选择卡属门店返回的
			this.belongsId = id;
		},
		backstoresId: function(id) { //选择操作门店返回的
			//console.log(id);
			this.storesId = id;
		},
		selData: function(value) { //选择交易类型返回的
			this.trantypeId = value;
		},
		selcardType(item) { //选择电子卡或者实体卡
			this.page = 1;
			this.cardTypeId = item.id;
			this.count = 0;
			this.TotalPage = 1;
			this.consumeList = [];
			this.getCardConsumeList();
			//console.log(item.id)
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.num = p;
			this.page = 1;
			this.getCardConsumeList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getCardConsumeList();
		},
		judgeTypes: function(item) {
			// 判断操作类型 是否加还是减
			// let operate;
			// if (item.type == '1' || item.type == '3' || item.type == '6' || item.type == '9' || item.type == '11' || item.type ==
			// 	'13') {
			// 	operate = '-';
			// } else {
			// 	operate = '+';
			// }

			if (item.type == '3' || item.type == '4' || item.type == '5' || item.type == '8' || item.type == '9' || item.type ==
				'10' || item.type == '11') {
				return item.operatePoint;
			} else {
				if (item.type == '1' || item.type == '6') {
					return (Number(item.operateAmount) + Number(item.operateGiftAmount));
				} else if(item.type == '2') {
					return (parseInt(Number(item.operateGiftAmount)*100) + parseInt(Number(item.rechargeAmount)*100))/100;
				}else{
					return Number(item.operateAmount);
				}
			}
		},		
	},
	components: {
		orderDetail: () =>
			import ( /*webpackChunkName: 'delete_detail'*/ './../../statistics/delete_detail'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		//详情
		cardDetail: () =>
			import ( /*webpackChunkName: 'card_queries_detail'*/ './../card_queries_detail'),
		selectStore: () =>
			import ( /*webpackChunkName: 'transaction_shop'*/ './transaction_shop.vue'),
		memberDetail: () =>
			import ( /*webpackChunkName: 'member_manage_detail'*/ './../../member_system/member_manage_detail'),
	}
};
</script>
<style lang="less" scoped>
#transaction-enquiry .date {
	height: 40px;
	margin-bottom: 20px;
}

#transaction-enquiry .date .dateBox {
	margin-right: 15px;
	margin-bottom: 10px;
}

#transaction-enquiry .list {
	max-width: 1400px;
}

#transaction-enquiry .list .list_title {
	max-width: 1400px;
	height: 45px;
	border: 1px solid #EAEEF5;
	line-height: 45px;
	padding-left: 17px;
	padding-right: 68px;
	border-bottom: none;
}

#transaction-enquiry .list .list_title .list_title_l a {
	color: red;
	font-size: 16px;
}

#transaction-enquiry .list .list_title span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#transaction-enquiry .list .list_title span:first-child {
	margin-right: 11px;
}

#transaction-enquiry .list .list_title span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
	/*margin-top: 20px;*/
}

#transaction-enquiry {
	.content {
		width: 100%;
		margin-bottom: 30px; // .date {
		// 	float: left;
		// 	.data-center {
		// 		float: left;
		// 		width: 25px;
		// 		line-height: 40px;
		// 		text-align: center;
		// 	}
		// 	/*搜索图标*/
		// 	.order-order-searchA,
		// 	.order-order-search {
		// 		display: inline-block;
		// 		float: left;
		// 		width: 40px;
		// 		height: 40px;
		// 		background-color: #29A7E1;
		// 		cursor: pointer;
		// 		margin-right: 15px;
		// 	}
		// 	.order-order-searchA:hover {
		// 		background-color: #1878a5;
		// 		transition: background-color ease-in-out 0.2s;
		// 	}
		// 	.order-order-searchA:active {
		// 		background-color: #154961;
		// 	}
		// 	.order-order-search {
		// 		background: url(../../res/images/search.png) center center no-repeat;
		// 	}
		// }
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