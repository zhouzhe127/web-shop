<!--
		**挂账统计
		*
		* 胡江
		* *
		*
-->
<template>
	<section id="orMaRetreat">
		<section v-show="!showDetails">
			<section class="orMaRetreatTime yuChairFix" v-if="!shopName">
				<section class="block-div">
					<selectBtn @emit="selectTypeOne" :sorts="optionsOne"></selectBtn>
				</section>
				<div class="block-div">
					<section class="fl yuChairFix">
						<calendar :time="startTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
					</section>
					<span class="zhi">—</span>
					<section class="fl yuChairFix">
						<calendar :time="endTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
					</section>
					<span class="order-order-searchA" @click="selectByTime">
						<span class="order-order-search"></span>
					</span>
				</div>
				<section class="block-div" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="[{'active':isOpenTime},'pickBlu']"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</section>
			</section>
			<section class="orMaRetreatTime yuChairFix" v-if="shopName">
				<div class="block-div" style="font-size: 16px;color: #333333">
					选择店铺：
					<span>{{shopName}}</span>
					<span style="margin: 0 10px">|</span>
					选择时间：
					<span>{{transformTime(sTime)}} - {{transformTime(eTime)}}</span>
				</div>
			</section>
			<section class="orMaRetreatTime yuChairFix">
				<section class="block-div">
					<selectBtn @emit="selectTypeTwo" :sorts="optionsTwo" :name="selectedNameTwo"></selectBtn>
				</section>
				<section class="block-div" @click="noData($event)">
					<selectBtn @emit="selectTypeThree" :sorts="optionsThree" :name="selectedNameThree"></selectBtn>
				</section>
				<section class="block-div">
					<selectBtn @emit="selectTypeFour" :sorts="optionsFour"></selectBtn>
				</section>
				<div class="block-div">
					<input class="numbering" type="text" :placeholder="shuName" v-model="optionValue" maxlength="18" />
				</div>
				<div class="block-div">
					<a href="javascript:;" style="background: #2EA8DC;" @click="getOrderBillList()">筛选</a>
					<a href="javascript:;" style="background: #B3B3B3;" @click="filterReset(true)">重置</a>
				</div>
			</section>
			<section class="orMaRetreatTime yuChairFix" v-if="selectedTypeOne==0">
				<section class="oCont">
					<div class="Box">
						<section v-on:click="getOidList(-1)" class="oDe" v-bind:class="{'act' : status == -1}" style="border-left: none;">全部
						</section>
						<section v-on:click="getOidList(0)" class="oDe" v-bind:class="{'act' : status == 0}">未结算
						</section>
						<section v-on:click="getOidList(1)" class="oDe" v-bind:class="{'act' : status == 1}">已结算
						</section>
					</div>
				</section>
			</section>

			<table-com :showHand="false" :titleHeight='60' :showTitle="1" :titleData="tableOne" :fixed="0" :widthType="false" :introData="[totalList]" :bannerStyle="{'backgroundColor':'#f2f2f2'}">
				<span slot="title-2" slot-scope="props">
					<span v-on:click="openDetial(1,$event)" class="detLi">消费总额
						<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />
						<div v-if="orderAll==1" class="detDiv1">
							<i class="detI triright"></i>
							<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该时间段内所有商品原价的金额总计（不计入退品金额）</h3>
						</div>
					</span>
				</span>
				<span slot="title-3" slot-scope="props">
					<span v-on:click="openDetial(2,$event)" class="detLi">挂账总额
						<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />
						<div v-if="orderAll==2" class="detDiv1">
							<i class="detI triright"></i>
							<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该时间段内所有订单实际需要支付的金额的总计</h3>
						</div>
					</span>
				</span>
			</table-com>
			<table-com :showHand="true" :listName="'挂账统计'" :titleHeight='50' :showTitle="1" :titleData="tableTwo" :allTotal="totalList.orderNum" :fixed="1" :widthType="false" :introData="orderCredit" :bannerStyle="{'backgroundColor':'#f2f2f2'}" :listWidth="1200">
				<span slot="title-6" slot-scope="props">
					<span v-on:click="openDetial(3,$event)" class="detLi">消费金额
						<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />
						<div v-if="orderAll==3" class="detDiv1">
							<i class="detI triright"></i>
							<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该笔订单内所有商品原价的金额总计（不计入退品金额）</h3>
						</div>
					</span>
				</span>
				<span slot="title-9" slot-scope="props">
					<span v-on:click="openDetial(4,$event)" class="detLi">挂账金额
						<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />
						<div v-if="orderAll==4" class="detDiv1">
							<i class="detI triright"></i>
							<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该笔订单实际需要支付的金额的总计</h3>
						</div>
					</span>
				</span>
				<span slot="con-0" slot-scope="props">
					<a v-on:click="goDetails(props.data.oid,props.index)" style="color:#21a7de;" href="javascript:void(0)">{{props.data.oid}}</a>
				</span>
			</table-com>
			<div class="pagebox fl" v-if="total>1">
				<page-element @pageNum="goPage" :page="page" :total="total" :isNoJump="true"></page-element>
			</div>
		</section>
		<div v-if="showDetails">
			<orderDetail :detail="detail" :isDelete="false" @detailShow="getDetailShow"></orderDetail>
		</div>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			orderCredit: [], //挂账列表数据
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			selectedType: 0,

			page: 1, // 当前页
			num: 10, // 每一页多少条数据
			total: 1, // 总共有多少页

			showDetails: false, // 显示详情
			//			oid: '', // 传入detail里面的订单号
			optionValue: '', // 搜索条件的值

			totalList: {
				totalDay: 1,
				orderNum: 0,
				originalPrice: 0, //消费总额
				billPrice: 0 //挂账总额
			}, //总计数据

			optionsOne: ['挂账时间', '结账时间'],
			selectedTypeOne: 0, //对应循序  0:挂账时间

			optionsTwo: ['全部', '个人账户', '企业账户'],
			selectedTypeTwo: 0, //对应循序  0:全部
			selectedNameTwo: '请选择账户类型',

			optionsThree: [],
			selectedTypeThree: 0, //对应循序
			selectedNameThree: '请选择挂账账户',

			optionsFour: ['订单号', '挂账人名称', '操作人名称'],
			selectedTypeFour: 0,

			shuName: '请输入订单号',

			status: -1, //结账类型
			isOpenTime: true, //是否按营业时间
			allBillName: [], //展示的挂账账户名称
			allBill: [], //所有挂账账户
			showBill: [], //展示的挂账账户
			billId: 0, //挂账账户id
			//			soId: '',

			userdata: {},
			tableOne: [],
			tableTwo: [],

			orderAll: 0
		};
	},
	//    props: {
	//	      sId:String,//店铺id
	//        shopName:String,//店铺名
	//        sTime:Number,//开始时间
	//        eTime:Number,//结束时间
	//        gType:Number,//挂账类型
	//    },
	props: ['sId', 'shopName', 'sTime', 'eTime', 'gType', 'isOpen'],
	created() {
		this.userdata = storage.session('userShop');
		if (this.shopName) {
			this.startTime = this.sTime;
			this.endTime = this.eTime;
			this.selectedTypeOne = this.gType;
			this.isOpenTime = Boolean(this.isOpen);
			this.$store.commit('setPageTools', [
				{
					name: '返回',
					className: ['export-btn'],
					fn: () => {
						let obj = {
							startTime: this.sTime,
							endTime: this.eTime,
							operateTime: this.gType
						};
						this.$emit('return', obj);
					}
				}
			]);
			//			this.soId = this.sId;
		}
		//		else {
		//			this.soId = this.userdata.currentShop.id;
		//		}
		this.tableOne = [
			{
				titleName: '天数',
				dataName: 'totalDay',
				conStyle: { color: '#ffa627' }
			},
			{
				titleName: '订单数',
				dataName: 'orderNum',
				conStyle: { color: '#ffa627' }
			},
			{
				titleName: '消费总额',
				dataName: 'originalPrice',
				conStyle: { color: '#ffa627' }
			},
			{
				titleName: '挂账总额',
				dataName: 'billPrice',
				conStyle: { color: '#ffa627' }
			}
		];
		this.tableTwo = [
			{
				titleName: '订单号',
				dataName: 'oid',
				titleStyle: { width: '180px' },
				conStyle: { color: '#21a7de' }
			},
			{
				titleName: '订单状态',
				titleStyle: { width: '80px' },
				dataName: 'isSettle'
			},
			{
				titleName: '挂账类型',
				titleStyle: { width: '80px' },
				dataName: 'billType'
			},
			{ titleName: '挂账账户', dataName: 'billName' },
			{ titleName: '挂账人', dataName: 'personName' },
			{ titleName: '操作人', dataName: 'createName' },
			{ titleName: '消费金额', dataName: 'originalPrice' },
			{ titleName: '挂账时间', dataName: 'createTime' },
			{ titleName: '结算时间', dataName: 'updateTime' },
			{ titleName: '挂账金额', dataName: 'billPrice' }
		];
		//		if (this.userdata.currentShop.ischain == 3) {
		//			//品牌
		//			this.$router.push({
		//				path: '/admin/brandOrderBill',
		//				query: this.$route.query
		//			});
		//			return false;
		//		}
	},
	destroyed() {
		this.$store.commit('setPageTools', []);
	},
	beforeMount() {
		this.billGetBillNames();
		this.getOrderBillList();
		document.onclick = () => {
			this.orderAll = 0;
		};
	},
	methods: {
		//点击说明详情
		openDetial(index, e) {
			e.stopPropagation();
			this.orderAll = index;
		},
		//是否按营业时间
		selectBusinessHours() {
			this.isOpenTime = !this.isOpenTime;
		},
		//更改结账类型
		getOidList(i) {
			this.status = i;
			this.page = 1;
			this.getOrderBillList();
		},
		//重置
		filterReset(blo) {
			this.optionsOne = ['挂账时间', '结账时间'];
			this.selectedTypeOne = 0;

			this.optionsTwo = ['全部', '个人账户', '企业账户'];
			this.selectedTypeTwo = 0;
			this.selectedNameTwo = '请选择账户类型';

			this.optionsThree = utils.deepCopy(this.allBillName);
			this.selectedTypeThree = 0;
			this.selectedNameThree = '请选择挂账账户';

			this.optionsFour = ['订单号', '挂账人名称', '操作人名称'];
			this.selectedTypeFour = 0;
			this.shuName = '请输入订单号';

			if (blo) {
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(23, 59, 59, 999);
			}

			this.status = -1;

			this.optionValue = '';

			this.page = 1;
			this.num = 10;
			this.total = 1;

			this.billId = 0;

			this.getOrderBillList();
		},
		//挂账时间类型
		selectTypeOne(index) {
			this.selectedTypeOne = index;
		},
		//挂账账户类型
		selectTypeTwo(index) {
			this.selectedTypeTwo = index;
			this.billId = 0;
			this.changType();
		},
		//挂账账户
		selectTypeThree(index) {
			this.selectedTypeThree = index;
			this.billId = this.showBill[index].billId;
			//			for (let i = 0; i < this.allBill.length; i++) {
			//				if (this.allBill[i].name == this.optionsThree[index]) {
			//					this.billId = this.allBill[i].billId;
			//				}
			//			}
		},
		noData(e) {
			e.stopPropagation();
			if (this.showBill.length == 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '该分类下没有挂账账户'
				});
			}
		},
		//搜检索条件
		selectTypeFour(index) {
			this.selectedTypeFour = index;
			switch (this.selectedTypeFour + '') {
				case '0':
					this.shuName = '请输入订单号';
					break;
				case '1':
					this.shuName = '请输入挂账人名';
					break;
				case '2':
					this.shuName = '请输入操作人名';
					break;
			}
		},
		//导出订单
		//		exportHander: function() {
		//			if (this.orderCredit.length == 0) {
		//				this.$store.commit('setWin', {
		//					title: '提示信息',
		//					content: '没有订单可以导出'
		//				});
		//				return false;
		//			}
		//			this.exportOrder();
		//		},
		//		async exportOrder() {
		//			http.exportBill({
		//				data: {
		//					startTime: parseInt(this.startTime / 1000),
		//					endTime: parseInt(this.endTime / 1000),
		//					shopId: this.sId ? this.sId : this.userdata.currentShop.id
		//				}
		//			});
		//		},
		//获取所有的挂账账户
		async billGetBillNames() {
			let allBill = await http.billGetBillNames({
				data: { shopId: this.sId ? this.sId : this.userdata.currentShop.id }
			});

			let item = { billId: '0', name: '全部' };
			allBill.unshift(item);
			this.allBill = allBill;
			this.changType();
		},
		//改变挂账账户类型
		changType() {
			let tempGoods = [];
			switch (this.selectedTypeTwo + '') {
				case '0':
					tempGoods = this.allBill.map(ele => {
						return ele.name;
					});
					this.showBill = this.allBill;
					break;
				case '1':
					this.showBill = this.allBill.filter(ele => {
						return ele.type == 1;
					});
					tempGoods = this.showBill.map(ele => {
						return ele.name;
					});
					break;
				case '2':
					this.showBill = this.allBill.filter(ele => {
						return ele.type == 2;
					});
					tempGoods = this.showBill.map(ele => {
						return ele.name;
					});
					break;
			}
			this.allBillName = utils.deepCopy(tempGoods);
			this.optionsThree = utils.deepCopy(tempGoods);
			// let item = {billId: '0', name: '全部'};
			// optionsThree.unshift(item);
			// this.optionsThree = optionsThree;
			// this.allBillName = optionsThree;
		},
		//验证
		checkDate() {
			let st = this.startTime;
			let firstDay = new Date(Number(this.endTime)).setDate(1);
			firstDay = new Date(firstDay).setHours(0, 0, 0, 0); // 按照结束时间的第一天计算
			if (+st < +firstDay) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '很抱歉,选择的时间段不能跨月'
				});
				return true;
			}
			if (parseInt(this.startTime / 1000) > parseInt(this.endTime / 1000)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始时间不能大于结束时间'
				});
				return true;
			}
		},
		//查询订单
		async getOrderBillList() {
			if (this.checkDate()) return;
			let data = await http.billstatisticsGetList({
				data: {
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					page: this.page + 0,
					num: this.num,
					isOpenTime: Number(this.isOpenTime),
					operateTime: this.selectedTypeOne, //按操作时间(0.挂账时间 1.结算时间)
					billType: this.selectedTypeTwo, //挂账账户类型(1.个人账户 2.企业账户)
					billId: this.billId, //挂账账户ID
					isSettle: this.status, //是否已结清(-1.全部 0.未结清 1.已结清)
					optionKey: this.selectedTypeFour + 1, //搜检索条件(1.订单号 2.挂账人名称 3.操作人名称)
					optionValue: this.optionValue, //搜索条件的值(1.订单号值 2.挂账人名称值 3.操作人名称值)
					shopId: this.sId ? this.sId : this.userdata.currentShop.id
				}
			});
			//			this.totalList.totalOriginalPrice = data.totalNum.originalPrice || '0';
			//			this.totalList.totalPrice = data.totalNum.price || '0';
			//			this.totalList.person = data.totalNum.person || '0';
			//			this.totalList.orderNum = data.totalNum.orderNum;
			//			this.totalList.days = Math.ceil(
			//				(this.endTime - this.startTime) / (24 * 3600 * 1000)
			//			);
			this.totalList = data.total;
			this.totalList.totalDay = Math.ceil(
				(this.endTime - this.startTime) / (24 * 3600 * 1000)
			);
			let list = data.list;
			if (!list) {
				return;
			}
			for (let i = 0; i < list.length; i++) {
				if (list[i].updateTime == 0) {
					list[i].updateTime = '--';
				} else {
					list[i].updateTime = utils.format(
						new Date(list[i].updateTime * 1000),
						'yyyy-MM-dd hh:mm'
					);
				}
				list[i].createTime = utils.format(
					new Date(list[i].createTime * 1000),
					'yyyy-MM-dd hh:mm'
				);
				list[i].isSettle = list[i].isSettle == 0 ? '未结清' : '已结清';
				list[i].billType = list[i].billType == 1 ? '个人账户' : '企业账户';
			}
			this.orderCredit = list;
			this.total = data.pageNum;
		},
		//按时间搜索
		selectByTime() {
			this.filterReset(false);
		},
		startTimeChange(data) {
			this.startTime = data;
		},
		endTimeChange(data) {
			this.endTime = new Date(data).setHours(23, 59, 59, 999);
		},
		// 跳页
		goPage(backData) {
			this.page = backData.page;
			this.num = backData.num;
			this.getOrderBillList();
		},
		//去订单详情
		async goDetails(oid) {
			let res = await http.OrderstatisticsBillDelite({
				data: {
					trueShopId: this.sId ? this.sId : this.userdata.currentShop.id,
					oid: oid
				}
			});
			if (res) {
				this.detail = res;
				this.showDetails = true;
			}
		},
		//		goDetails(item) {
		//			this.oid = item.oid;
		//			this.showDetails = true;
		//		},
		//订单详情返回
		getDetailShow() {
			this.showDetails = false;
			if (this.shopName) {
				this.$store.commit('setPageTools', [
					{
						name: '返回',
						className: ['export-btn'],
						fn: () => {
							let obj = {
								startTime: this.sTime,
								endTime: this.eTime,
								operateTime: this.gType
							};
							this.$emit('return', obj);
						}
					}
				]);
			}
		},
		//把时间戳转化成***年**月**日
		transformTime(time) {
			return utils.format(new Date(Number(time)), 'yyyy年MM月dd日');
		}
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		PageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		orderDetail: () =>
			import(/*webpackChunkName: "delete_detail"*/ './delete_detail'),
		tableCom: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		selectBtn: () =>
			import(/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
	}
};
</script>

<style scoped lang="less">
#orMaRetreat {
	margin-top: 30px;
	position: relative;
	.yuChairFix:after {
		content: '';
		display: block;
		clear: both;
	}
	.orMaRetreatTime {
		margin-bottom: 10px;
		.block-div {
			float: left;
			margin-right: 20px;
			.zhi {
				text-align: center;
				width: 25px;
				height: 40px;
				line-height: 40px;
				display: block;
				float: left;
			}
			.order-order-searchA,
			.order-order-search {
				// display: inline-block;
				float: left;
				width: 40px;
				height: 40px;
				background-color: #29a7e1;
				cursor: pointer;
			}
			.order-order-search {
				background: url(../../res/images/search.png) center center no-repeat;
			}
			.order-order-searchA {
				height: 40px;
			}
			.order-order-searchA:hover {
				background-color: #1878a5;
				transition: background-color ease-in-out 0.2s;
			}
			.order-order-searchA:active {
				background-color: #154961;
			}
			.numbering {
				width: 200px;
				height: 40px;
				border: 1px solid #b3b3b3;
				text-indent: 15px;
				display: inline-block;
				outline: none;
			}
			a {
				display: inline-block;
				width: 100px;
				height: 40px;
				text-align: center;
				line-height: 40px;
				font-size: 16px;
				color: #fff;
			}
			.pickBlu {
				width: 20px;
				height: 20px;
				cursor: pointer;
				border: 1px solid #28a8e0;
				margin: 13px 10px;
				float: left;
			}
			.active {
				background: url(../../res/icon/selected.png) center center no-repeat,
					#28a8e0;
			}
		}
	}
	.oCont {
		.Box {
			width: 360px;
			height: 42px;
			cursor: pointer;
			box-sizing: border-box;
			float: left;
			.act {
				background-color: #28a8e0;
				color: #fff;
			}
		}
		.oDe {
			width: 30%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			float: left;
			box-sizing: border-box;
			color: #000000;
			margin-right: 10px;
			background-color: #f2f2f2;
			border-radius: 5px;
		}
	}
	.pagebox {
		padding-top: 20px;
	}
	.detLi {
		position: relative;
		cursor: pointer;
		.detDiv1 {
			display: inline-block;
			width: 300px;
			background: #45404b;
			position: absolute;
			top: 28px;
			left: -250px;
			padding: 10px;
			box-shadow: 3px 2px 10px #ccc;
			z-index: 10;
			.detI {
				width: 0;
				height: 0;
				line-height: 0;
				position: absolute;
				top: -10px;
				left: 250px;
				border-width: 10px;
				border-top: 0px;
				border-style: solid;
				border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
			}
			.detH3 {
				line-height: 30px;
				color: #e6e6e7;
				text-align: center;
			}
		}
	}
}
</style>
