<template>
	<div id="statistics-recharge">
		<div class="timeSearch">
			<div class="selectDate" v-if="!viewDetail && !isPhoneSearch">
				<div class="activation fl">
					时间筛选
				</div>
				<div class="inp-box inp-start fl">
					<calendar :time="startTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
				</div>
				<span class="line"> - </span>
				<div class="inp-box inp-start fl">
					<calendar :time="endTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				</div>
				<span class="order-order-searchA" @click="getList">
					<span class="order-order-search" href="javascript:void(0)"></span>
				</span>
			</div>
			<!-- 按手机号查找 -->
			<div class="enquiries">
				<input class="inputBox" type="text" placeholder="按手机号查询" v-model="orderNumber" maxlength="11" />
				<a class="order-order-searchA" @click="getPhone">
					<span class="order-order-search"></span>
				</a>
			</div>
		</div>
		<!-- head -->
		<div class="sta_head" v-if="!viewDetail && !isPhoneSearch">
			<!-- 操作店铺 -->
			<div class="operateStore">
				<div class="operateStore_l">
					操作店铺
				</div>
				<div class="operateStore_r fl detLi" @click.stop.prevent="openShop($event)">
					<!-- 选择店铺的弹框 -->
					<!-- <select-btn :name="selectName" :sorts="selectShopList.map(v=>v.shopName)" :width="138" @selOn="selectShop"></select-btn> -->
					<select-store v-if="isBrand" :sorts="selectShopList" :width="200" :tipName="selectName" :isSingle="true" @emit="selectShop"></select-store>

					<template v-else>
						<div class="operateStore_r_l">{{selectName}}</div>
						<div class="select_d">
							<i></i>
						</div>
					</template>
					<!-- 单店下的警示弹窗 -->
					<div class="constructions" v-if="constructionsBtn">
						<i class="sharpCorners"></i> 单店模式下，店铺只有一家！
					</div>
				</div>
			</div>
			<!-- 卡类型 -->
			<div class="fl mb15" style="margin-right: 12px;height: 40px;">
				<section class="statisticsLists">
					<select-btn :name='cardhigh' :sorts="cardList.map(v=>v.name)" :width="157" @selOn="selCard"></select-btn>
				</section>
			</div>
			<!-- 电子卡的分类型 -->
			<div class="fl mb15" style="margin-right: 12px;height: 40px;" v-if="cardId == '1' && cardTypeList.length">
				<section class="statisticsLists">
					<select-btn :name="'请选择卡类型'" :sorts="cardTypeList.map(v=>v.name)" :width="157" @selOn="selCardType"></select-btn>
				</section>
			</div>
			<!-- 按天数 -->
			<div class="fl mb15" style="margin-right: 12px;">
				<section class="statisticsLists">
					<select-btn :name="datahigh" :sorts="dataList.map(v=>v.name)" :width="157" @selOn="selData"></select-btn>
				</section>
			</div>
			<!-- 按营业时间 -->
			<div class="zw mb15" v-if="!isPhoneSearch && !isBrand">
				<div class="businessHours">
					<div @click="selectBusinessHours" :class="{'active':isOpenTime}"></div>
					<span>按营业时间</span>
				</div>
			</div>
			<!-- 筛选 -->
			<a class="blue fl screenings mb15" href="javascript:void(0);" @click="getList">筛选</a>
			<!-- 重置 -->
			<a class="gray fl reset mb15" href="javascript:void(0);" @click="filterReset">重置</a>
		</div>
		<!-- 选择店铺 -->
		<div class="theSelected">
			<div class="choice">选择店铺：</div>
			<div class="shopName">{{selectName}}</div>
		</div>
		<!-- body -->
		<div class="sta_body">
			<com-table :showHand="false" :titleData="statisticsListTitle" :fixed="1" :introData="statisticsList" :showTitle="1" :listHeight="64" :widthType="true" :bannerStyle="{background:' #ece7e7',color: '#333'}">
				<div slot="con-0" slot-scope="props">
					{{isPhoneSearch?count:spliceZero(props.data.days)}}
				</div>
				<div slot="con-11" slot-scope="props" id="coupons" @click="openDiscount(props.data.couponInfo)">
					{{props.data.giveCoupon}}
				</div>
			</com-table>
		</div>
		<!-- foot -->
		<div class="sta_foot">
			<com-table v-if="isDay" :listName="'会员充值统计'" :titleData="dayListTitleArr" :allTotal="count" :fixed="2" :introData="dayList" :showTitle="1" :listHeight="68" :widthType="true" :bannerStyle="{background:' #ece7e7',color: '#333'}">
				<div slot="con-0" slot-scope="props">
					<div class="week">
						<p :title="transFormDate(props.data.generateTime)">{{transFormDate(props.data.generateTime)}}</p>
						<p>{{changeWeek(props.data.generateTime)}}</p>
					</div>
				</div>
				<div slot="con-1" slot-scope="props" style="color: #00AAE5;cursor: pointer;" @click="getDetail(props.data)">
					{{shopName}}
				</div>
				<div slot="con-11" slot-scope="props" id="coupons" @click="openDiscount(props.data.couponInfo)">
					{{props.data.giveCoupon}}
				</div>
			</com-table>
			<!-- 按详情查找 -->
			<com-table v-if="isDetail" :showHand="true" :allTotal="count" :listName="'会员充值统计'" :titleData="detailListTitleArr" :introData="detailList" :listHeight="68" :bannerStyle="{background:' #ece7e7',color: '#333'}">
				<div slot="con-0" slot-scope="props">
					{{isBrand?props.data.operationShop:shopName}}
				</div>
				<div slot="con-1" slot-scope="props" :title="transFormDates(props.data.createTime)">
					{{transFormDates(props.data.createTime)}}
				</div>
				<div slot="con-2" slot-scope="props">
					{{props.data.memberType == '0'?'电子卡':props.data.cardTypeName}}
				</div>
				<div slot="con-8" slot-scope="props">
					{{returnPay(props.data.payType)}}
				</div>
				<div slot="con-12" slot-scope="props" id="coupons" @click="openDiscount(props.data)">
					{{props.data.num}}
				</div>
			</com-table>
		</div>

		<!-- 弹窗 -->
		<win v-if="showCouponDetails" :okCallback="closeCouponDetails" :closeHandle="closeCouponDetails" :cancelCallBack="closeCouponDetails" :title="'优惠详情'" :width="541" :height="302">
			<div slot="content" id="coupon">
				<div class="coupon_content" v-if="CouponDetails.couponList.length != 0">
					<div class="num">共{{CouponDetails.couponCount}}张</div>
					<ul>
						<li v-for="(item,i) in CouponDetails.couponList" :key="i">{{item.name}}({{item.num}}张)</li>
					</ul>
				</div>
				<div class="noCoupon" v-if="CouponDetails.couponList.length == 0">-暂无优惠券-</div>
			</div>
		</win>
		<!-- 分页 -->
		<div class="pages" v-if="TotalPage > 1">
			<div>
				<!-- <sd-pagejump v-on:click="getPage" :page.sync="page" :count.sync='5' :total.sync='TotalPage' :num.sync='5' style="float: left;"></sd-pagejump> -->
				<page-element :page="page" :total="TotalPage" :isNoJump='true' :len="TotalPage>10?8:5" @pageNum="getPage"></page-element>
			</div>
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

class TitleObj {
	/* eslint-disable */
	constructor(titleName, dataName, titleStyle, conStyle) {
		this.titleName = titleName;
		this.dataName = dataName;
		this.titleStyle = titleStyle;
		this.conStyle = conStyle;
	}
	/* eslint-enable */
}
export default {
	data() {
		return {
			startTime: new Date().setHours(0, 0, 0, 0), //.getZero(), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //(new Date()).getTime() + 1000 * ((59 - new Date().getSeconds()) + 60 * (59 - new Date().getMinutes()) + 60 * 60 * (24 - new Date().getHours() - 1)), //日期组件的结束时间
			isBrand: false, //是否是品牌的状态
			constructionsBtn: false, //单店下店铺tip是否显示的标识
			isDay: true, //按照天数查询的标识 默认情况下显示天的样式
			isDetail: false, //按照详情查找的标识
			viewDetail: false, //标识 点击店铺查看详情  翻页获取详情的标识
			onedayDetail: false,
			dayList: [], //按天数筛选的数据展示列表
			detailList: [], //按详情筛选的列表
			detailCreatetime: '', //单天的创建时间
			cardList: [
				{
					//卡状态
					name: '电子卡',
					id: 0
				},
				{
					name: '实体卡',
					id: 1
				}
			], //卡类型筛选列表
			cardId: '0', //卡类型对应的id
			cardLimit: false, //卡类型下拉框显示
			cardhigh: '电子卡',
			dataList: [
				{
					//按天状态
					name: '按天数',
					id: 1
				},
				{
					name: '按详情',
					id: 0
				}
			], //卡类型筛选列表
			dataId: '1', //卡类型对应的id
			dataLimit: false, //卡类型下拉框显示
			datahigh: '按天数',
			cardTypeList: [], //卡类型的列表
			cardTypeLimit: false, //卡类型列表下拉框显示
			cardTypehigh: '全部',
			cardTypeId: '',
			isPhoneSearch: false, //是否是电话号码查询
			TotalPage: '', //缓存的总页数
			count: '0', //记录总条数
			orderNumber: '', //手机号码
			shopsId: 0, //店铺id
			page: 1, //页码数
			exportUrl: 'javascript:void(0);',
			isOpenTime: false, //是否按营业时间，默认 false 0 否
			shopListBtn: false, // 页面选择店铺弹窗是否显示的标识
			selectName: '请选择店铺', //页面店铺框中显示的店铺名称，以逗号分隔
			selectShopList: [], // 店铺列表
			allTrue: false, //选择门店的全部选择按钮是否选中状态
			shopName: '', //若是单店模式 显示名字
			statisticsList: [], //抬头的数据
			showCouponDetails: false, // 展示优惠券
			CouponDetails: {
				couponList: [], // 优惠券列表
				couponCount: 0 // 优惠券张数
			},
			ischain: 0, // 当前店铺的ischain
			dayListTitleArr: [
				new TitleObj('时间', 'generateTime', {
					width: 80 + 'px',
					flex: 'none'
				}),
				new TitleObj('店铺名称', ''),
				new TitleObj('充值总额', 'totalAmount'),
				new TitleObj('支付总额', 'payAmount'),
				new TitleObj('现金', 'cash'),
				new TitleObj('银行卡', 'bankCard'),
				new TitleObj('微信', 'weChat'),
				new TitleObj('支付宝', 'alipay'),
				new TitleObj('中信微信', 'citicWeChat'),
				new TitleObj('中信支付宝', 'citicAlipay'),
				new TitleObj('赠送总额', 'giveTotal'),
				new TitleObj('赠送积分', 'givePoint'),
				new TitleObj('赠送优惠券', 'giveCoupon')
			],
			detailListTitleArr: [
				new TitleObj('店铺名称', ''),
				new TitleObj('时间', 'createTime', {
					width: 70 + 'px',
					flex: 'none'
				}),
				new TitleObj('卡类型', 'cardTypeName'),
				new TitleObj('卡号', 'cardNumber'),
				new TitleObj('手机号', 'mobile', {
					width: 92 + 'px',
					flex: 'none'
				}),
				new TitleObj('会员姓名', 'name', {
					width: 60 + 'px',
					flex: 'none'
				}),
				new TitleObj('充值金额', 'rechargeAmount', {
					width: 100 + 'px',
					flex: 'none'
				}),
				new TitleObj('支付金额', 'amount', {
					width: 100 + 'px',
					flex: 'none'
				}),
				new TitleObj('支付方式', 'payType'),
				new TitleObj('操作员', 'operator'),
				new TitleObj('赠送总额', 'giftAmount'),
				new TitleObj('赠送积分', 'operatePoint'),
				new TitleObj('赠送优惠券', 'num')
			]
		};
	},
	created: function() {
		this.isBrand = false; //品牌店的状态 品牌店铺下面有一个店铺操作
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		if (userData.currentShop && userData.currentShop.ischain == 3) {
			//ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}

		// let sortList = function(key) {
		// 	return function(a, b) {
		// 		let value1 = parseInt(a[key]);
		// 		let value2 = parseInt(b[key]);
		// 		if (value1 > value2) {
		// 			return 1;
		// 		} else if (value1 < value2) {
		// 			return -1;
		// 		} else {
		// 			return 0;
		// 		}
		// 	};
		// };
		if (this.isBrand) {
			// let selectShopList = userData.currentShop.direct.concat(userData.currentShop.franchise); //获取到品牌下面所有店铺信息
			let selectShopList = storage.session('shopList'); //获取到品牌下面所有[有权限查看的]店铺信息
			// let arr = []; // 有权限就行不用判断status 2018-3权限重构
			for (let i = 0; i < selectShopList.length; i++) {
				selectShopList[i].selected = false; // 标记这些店铺全部被选中
				selectShopList[i].name = selectShopList[i].shopName; //商店选择组件里面必须要name字段
				// 	if (selectShopList[i].status == 0 || selectShopList[i].status == 5) { //筛选出正在营业的店铺
				// 		arr.push(selectShopList[i]);
				// 	}
			}
			// selectShopList = arr;
			this.selectShopList = selectShopList;
			if (selectShopList.length === 0) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '该品牌下没有店铺'
				});
			}
			// let selectName = '';

			//选择的店铺id转化为字符串
			// for (let i = 0; i < selectShopList.length; i++) {
			// if (selectShopList[i].selected == true) { //只有在标记被选中的店铺 才会被放进店铺的数组列表里面
			//		shopIds = shopIds + selectShopList[i].id + ','; //选择的店铺id转成字符串，用逗号连接
			// selectName = selectName + selectShopList[i].shopName + ','; //选择的店铺名称转成字符串，用逗号连接
			// }
			// }
			this.selectName = selectShopList[0].shopName; //selectName == '' ? selectShopList[0].shopName : selectName;
			this.shopsId = selectShopList[0].id; //selectName == '' ? selectShopList[0].id : selectName;
			//切割拼接店铺id的字符串
			// let end = shopIds.split('').length;
			// if (shopIds !== '') {
			// 	shopIds = shopIds.substring(0, end - 1);
			// }
		} else {
			this.selectName = userData.currentShop.name;
		}
		this.$store.commit('setPageTools', {
			leadOut: this.filterExport
		});
		this.filterReset();
		this.isAllShop();
	},
	methods: {
		startTimeChange: function(data) {
			this.startTime = new Date(data).setHours(0, 0, 0, 0);
		},
		endTimeChange: function(data) {
			this.endTime = new Date(data).setHours(23, 59, 59, 999);
		},
		openShop: function() {
			//店铺选择弹窗的消失和隐藏
			if (this.isBrand) {
				// e.stopPropagation();
				this.shopListBtn = !this.shopListBtn; //标识取反
			} else {
				// e.stopPropagation();
				this.constructionsBtn = !this.constructionsBtn; //标识取反
				return false;
			}
		},
		//所有到店铺选择
		selectAllShop: function(e) {
			e.stopPropagation();
			this.selectName = ''; //将原有显示的店铺名清空
			//选择全部切换
			if (this.allTrue == true) {
				// 当allTrue状态为true时 说明全选状态选中
				for (let i = 0; i < this.selectShopList.length; i++) {
					this.selectShopList[i].selected = false; //更改店铺选中的状态 将不会被选中
					this.selectName = '请选择店铺'; // 默认显示的内容
				}
			} else {
				//否则全选未被选中
				for (let i = 0; i < this.selectShopList.length; i++) {
					this.selectShopList[i].selected = true; //更改状态
					this.selectName =
						this.selectName + this.selectShopList[i].name + '、'; //显示
				}
				this.shopsId = 0;
			}
			this.allTrue = !this.allTrue; //状态取反
		},
		//选择店铺
		selectShop: function(item) {
			//单个店铺选择
			this.selectShopList = item;
			let selectItem = item.filter(v => v.selected)[0];
			// selectItem.selected = !selectItem.selected; //将单个店铺标识取反
			if (selectItem) {
				this.selectName = selectItem.shopName;
				this.shopsId = selectItem.id;
			} else {
				//如果任何一家店铺未被选择的话
				this.shopsId = '';
				this.selectName = '请选择店铺'; //默认显示
			}
		},
		// 选择电子卡或实体卡
		selCard: function(i) {
			this.cardhigh = this.cardList[i].name; //点击卡类型对应的名字
			this.cardId = this.cardList[i].id; //点击卡类型对应的id
		},
		// 按天数或详情
		selData: function(i) {
			this.datahigh = this.dataList[i].name; //点击卡类型对应的名字
			this.dataId = this.dataList[i].id; //点击卡类型对应的id
		},
		// 选择电子卡的类型
		selCardType: function(i) {
			this.cardTypehigh = this.cardTypeList[i].name; //点击卡类型对应的名字
			this.cardTypeId = this.cardTypeList[i].id; //点击卡类型对应的id
		},
		// costhighShow: function(index,type, e) {
		// },
		getList: function() {
			//筛选的方法
			if (this.startTime > this.endTime) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '请选择正确的时间进行筛选'
				});
				// alert('提示信息', '请选择正确的时间进行筛选');
				return false;
			}
			if (this.selectName == '请选择店铺') {
				// alert("请选择店铺");
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '请选择店铺'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				//查询限制
				// alert("最大只能查询三个月时间");
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '最大只能查询三个月时间'
				});

				return false;
			}
			this.page = 1;
			this.getRechargeStatistics();
		},
		getDetail: function(item) {
			if (item && item.generateTime) {
				//点击查看详情
				this.detailCreatetime = item.generateTime; //获取创建时间
				this.orderNumber = '';
				this.onedayDetail = true;
				this.isDay = false; //按天数查找
				this.isDetail = true; //按详情查找
				this.viewDetail = true; //开启查看详情
				this.dataId = 0;
			}
			this.page = 1;
			this.getRechargeStatistics();
		},
		getPhone: function() {
			let re = /^1\d{10}$/;
			if (this.startTime > this.endTime) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '请选择正确的时间进行筛选'
				});
				// alert('提示信息', '请选择正确的时间进行筛选');
				return false;
			}
			if (this.orderNumber == '') {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '请输入手机号码'
				});
				// alert('提示信息', '请输入手机号码', null, null, null, 1000);
				return;
			} else if (!re.test(this.orderNumber)) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '手机号码格式有误'
				});
				// alert('提示信息', '手机号码格式有误', null, null, null, 1000);
				return;
			} else {
				this.page = 1;
				this.getRechargeStatistics(true);
			}
		},
		async getRechargeStatistics(isPhone) {
			let data = await http.getRechargeStatistics({
				data: {
					startTime:
						this.onedayDetail == true
							? this.detailCreatetime
							: parseInt(this.startTime / 1000),
					endTime:
						this.onedayDetail == true
							? this.detailCreatetime
							: parseInt(this.endTime / 1000),
					// startTime: parseInt(this.startTime / 1000),
					// endTime: parseInt(this.endTime / 1000),
					shopsId: this.shopsId,
					isDay: this.viewDetail == true ? 0 : this.dataId,
					mobile: this.orderNumber,
					page: this.page,
					num: 10,
					ischain: this.ischain,
					isCard: this.cardId //卡类型
				}
			});
			if (data) {
				if (this.allTrue) {
					this.shopName = '全部';
				} else {
					this.shopName = this.selectName;
				}
				if (data.total || data.total == 0) {
					this.TotalPage = data.total;
				}
				if (data.statistics && data.days) {
					// 循环求出总的充值金额 总的赠送金额
					let statistics = this.getdateList(data.statistics);
					statistics.days = data.days;
					this.statisticsList = [statistics];
				}
				if (this.dataId == 1) {
					//按天数查找
					this.isDay = true; //显示按天数查找
					this.isDetail = false;
					this.isPhoneSearch = false;
					// 获取数据
					this.dayList = []; //首先将按天查询的数据清空
					let oneDay = '';
					for (let j = 0; j < data.consumeList.length; j++) {
						oneDay = this.getdateList(data.consumeList[j]);
						this.dayList.push(oneDay);
					}
					if (data.count) {
						this.count = data.count;
					}
				} else if (this.dataId == 0) {
					//按详情查找
					this.isDay = false; //按天数查找
					this.isDetail = true; //按详情查找
					this.isPhoneSearch = false;
					this.detailList = data.consumeList; //获取按详情查找的数据
					if (data.count) {
						this.count = data.count;
					}
				}
				if (isPhone) {
					this.isPhoneSearch = true;
					this.dataId = 0;
					this.isDay = false;
					this.isDetail = true;
					this.detailList = data.consumeList; //获取按详情查找的数据
					if (data.count) {
						this.count = data.count;
					}
				}
			}
		},
		getPage: function(data) {
			this.page = data.page;
			if (this.isPhoneSearch) {
				this.getRechargeStatistics(true);
				return;
			}
			this.getRechargeStatistics();
		},
		spliceZero: function(num) {
			//取出小数点前面的正整数的方法
			num += '';
			let arr = num.split('.');
			if (arr.length == 2) {
				return arr[0];
			} else {
				return num;
			}
		},
		returnDetail: function() {
			//返回按钮
			this.page = 1;
			setTimeout(() => {
				this.viewDetail = false;
				this.isPhoneSearch = false;
				this.onedayDetail = false;
				this.isDay = true;
				this.isDetail = false;
				this.dataId == 1
					? (this.dayhigh = '按天数')
					: (this.dayhigh = '按详情');
				this.orderNumber = '';
				this.TotalPage = '';
				this.count = '';
				this.dataId = 1;
				this.getList();
			}, 500);
		},
		isAllShop: function() {
			if (this.isBrand) {
				this.shopsId = 0;
			} else {
				this.shopsId = storage.session('userShop').currentShop.id;
			}
		},
		filterExport: function() {
			if (this.count == 0) {
				this.$store.commit('setWin', {
					title: '提示信息:',
					content: '没有订单可以导出'
				});
				return false;
			}
			this.exportRechargeStatistics();
		},
		async exportRechargeStatistics() {
			http.exportRechargeStatistics({
				data: {
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					shopsId: this.shopsId,
					isDay: this.dataId,
					isOpenTime: Number(this.isOpenTime),
					page: this.page + 1,
					num: 10,
					export: 1
				}
			});
		},
		filterReset: function() {
			//重置
			this.startTime = new Date().setHours(0, 0, 0, 0); //.getZero();
			this.endTime = this.startTime - 0 + 3600 * 24;
			this.dataId = 1;
			this.selectTypeName = '按天数';
			this.page = 1;
			this.cardhigh = '电子卡';
			this.cardId = '0';
			this.dayList = []; //列表也清空
			this.detailList = [];
			this.statisticsList = [];
			this.count = 0;
			if (this.isBrand) {
				this.selectName = '请选择店铺';
				this.selectShopList = this.selectShopList.map(v => {
					v.selected = false;
					return v;
				});
				// for (let i = 0; i < .length; i++) {
				//     this.selectShopList[i].selected = false;
				// }
			}
		},
		returnPay: function(type) {
			//返回对应的支付方式
			switch (type) {
				case '1':
					return '现金';
				// break;
				case '2':
					return '银联';
				// break;
				case '3':
					return '微信';
				// break;
				case '4':
					return '支付宝';
				// break;
				case '5':
					return '会员卡';
				// break;
				case '6':
					return '中信微信';
				// break;
				case '7':
					return '中信支付宝';
				// break;
				default:
					return '不知道';
			}
		},
		getdateList: function(arr) {
			// 获取充值统计的数组 并且循环
			let cash = 0;
			let bankCard = 0;
			let weChat = 0;
			let alipay = 0;
			let citicWeChat = 0;
			let citicAlipay = 0;
			let totalAmount = 0;
			let payAmount = 0;
			let giveTotal = 0;
			let givePoint = 0;
			let giveCoupon = 0;
			let couponInfo;
			let generateTime;
			for (let i = 0; i < arr.length; i++) {
				switch (Number(arr[i].payType)) {
					case 1: //现金
						// var cash = 0;
						cash = Number(arr[i].amount);
						break;
					case 2: // 银行卡
						// var bankCard = 0;
						bankCard = Number(arr[i].amount);
						break;
					case 3: // 微信支付
						// var weChat = 0;
						weChat = Number(arr[i].amount);
						break;
					case 4: // 支付宝
						// var alipay = 0;
						alipay = Number(arr[i].amount);
						break;
					case 6: // 中信微信支付
						// var citicWeChat = 0;
						citicWeChat = Number(arr[i].amount);
						break;
					case 7: //中信支付宝支付
						// var citicAlipay = 0;
						citicAlipay += Number(arr[i].amount);
						break;
					case 20: //充值总额
						// var totalAmount = 0;
						totalAmount = Number(arr[i].amount);
						break;
					case 21: //支付总额
						// var payAmount = 0;
						payAmount = Number(arr[i].amount);
						break;
					case 22: //赠送总额
						// var giveTotal = 0;
						giveTotal = Number(arr[i].amount);
						break;
					case 23: //赠送总额
						// var givePoint = 0;
						givePoint = Number(arr[i].point);
						break;
					case 24: //赠送优惠券
						// var giveCoupon = 0;
						// var couponInfo;
						giveCoupon = Number(arr[i].num);
						couponInfo = arr[i];
						break;
				}
				if (arr[i].createTime) {
					generateTime = arr[i].createTime;
				}
			}
			let couponInfos = {
				couponIds: []
			};
			let statistics_obj = {
				generateTime: generateTime ? generateTime : 0, //创建时间
				createTime: this.startTime / 1000,
				endTime: this.endTime / 1000,
				mobile: this.orderNumber, //手机号
				totalAmount: totalAmount ? totalAmount : 0, //充值总额
				payAmount: payAmount ? payAmount : 0, //支付总额
				cash: cash ? cash : 0, //现金
				bankCard: bankCard ? bankCard : 0, //银行卡
				weChat: weChat ? weChat : 0, //微信
				alipay: alipay ? alipay : 0, //支付宝
				citicWeChat: citicWeChat ? citicWeChat : 0, //中信微信
				citicAlipay: citicAlipay ? citicAlipay : 0, //中信支付宝
				giveTotal: giveTotal ? giveTotal : 0, //赠送金额
				givePoint: givePoint ? givePoint : 0, //赠送积分
				giveCoupon: giveCoupon ? giveCoupon : 0, //赠送优惠券
				couponInfo: couponInfo ? couponInfo : couponInfos //优惠券详情
			};
			return statistics_obj;
		},
		changeWeek: function(time) {
			//返回星期几的方法
			let date = new Date(time * 1000).getDay();
			let weekday = [
				'星期天',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六'
			];
			return weekday[date];
		},
		//查看优惠点击
		openDiscount: function(item) {
			//点击查看优惠券的方法
			this.showCouponDetails = true;
			this.CouponDetails.couponCount = item.num;
			this.CouponDetails.couponList = item.couponIds;
			// openDetialWin(item);
		},
		closeCouponDetails: function() {
			this.showCouponDetails = false;
		},
		changeData: function(arr) {
			let newArr = [];
			for (let i = 0; i < arr.length; i++) {
				let newObj = {
					totalAmount: 0,
					giftAmount: 0,
					createTime: 0
				};
				for (let j = 0; j < arr[i].length; j++) {
					newObj.totalAmount += arr[i][j].amount - 0;
					newObj.giftAmount += arr[i][j].giftAmount - 0;
					newObj.createTime = arr[i][j].createTime;
					let pt = arr[i][j].payType;
					if (newObj[pt]) {
						newObj[pt].amount += arr[i][j].amount;
					} else {
						newObj[pt] = arr[i][j];
					}
				}
				newArr.push(newObj);
			}
			return newArr;
		},
		transFormDate: function(t) {
			//返回日期格式的方法
			t += '';
			if (t.length == 10) {
				t -= 0;
				t *= 1000;
			} else {
				t -= 0;
			}
			return utils.format(new Date(t), 'yyyy-MM-dd'); //.format('yyyy-MM-dd');
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return '0' + t;
			} else {
				return t + '';
			}
		},
		transFormDates: function(time) {
			time += '';
			if (time.length == 10) {
				time -= 0;
				time *= 1000;
			} else {
				time -= 0;
			}
			let date = new Date(time);
			return (
				date.getFullYear() +
				'-' +
				(date.getMonth() + 1) +
				'-' +
				date.getDate() +
				'-' +
				date.getHours() +
				':' +
				this.changeFormat(date.getMinutes())
			);
		},
		selectBusinessHours: function() {
			//是否开启营业模式

			this.isOpenTime = !this.isOpenTime;
		}
	},
	mounted: function() {
		if (!this.isBrand) {
			//但店下 直接请求，品牌下由于要选店铺就不请求了
			this.getList();
		}
		document.onclick = function() {
			this.constructionsBtn = false;
		};
	},
	watch: {
		viewDetail(newV) {
			if (newV) {
				this.$store.commit('setPageTools', {
					back: this.returnDetail
				});
			} else if (!this.isPhoneSearch) {
				this.$store.commit('setPageTools', {
					leadOut: this.filterExport
				});
			}
		},
		isPhoneSearch(newV) {
			if (newV) {
				this.$store.commit('setPageTools', {
					back: this.returnDetail
				});
			} else if (!this.viewDetail) {
				this.$store.commit('setPageTools', {
					leadOut: this.filterExport
				});
			}
		}
	},
	components: {
		Calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		SelectStore: () =>
			import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		PageElement: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		selectBtn: () =>
			import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		Win: () => import(/*webpackChunkName:"win" */ 'src/components/win'),
		ComTable: () =>
			import(/*webpackChunkName:"com_table" */ 'src/components/com_table')
	},
	computed: {
		statisticsListTitle() {
			let arr = [
				new TitleObj('充值次数', 'days'),
				new TitleObj('充值总额', 'totalAmount'),
				new TitleObj('支付总额', 'payAmount'),
				new TitleObj('现金', 'cash'),
				new TitleObj('银行卡', 'bankCard'),
				new TitleObj('微信', 'weChat'),
				new TitleObj('支付宝', 'alipay'),
				new TitleObj('中信微信', 'citicWeChat'),
				new TitleObj('中信支付宝', 'citicAlipay'),
				new TitleObj('赠送总额', 'giveTotal'),
				new TitleObj('赠送积分', 'givePoint'),
				new TitleObj('赠送优惠券', 'couponInfo')
			];
			if (!this.isPhoneSearch) {
				arr[0] = new TitleObj('天数', 'days');
			}
			return arr;
		}
	}
};
</script>

<style lang="less" scoped>
#statistics-recharge {
	width: 100%;
	height: auto;
	.inp-box {
		display: inline-block;
		// border: 1px solid #b3b3b3;
		vertical-align: top;
		position: relative;
		input {
			z-index: 2;
			position: relative;
			background: none;
			height: 38px;
			cursor: pointer;
			i {
				position: absolute;
				left: 0;
				top: 0;
				display: block;
				height: 38px;
				width: 40px;
				line-height: 38px;
				text-align: center;
				opacity: 0.5;
				&.right {
					right: 0;
					left: auto;
					border-left: 1px solid #b3b3b3;
				}
			}
		}
	}
	.statisticsLists {
		position: relative;
		line-height: 35px;
		font-size: 16px;
		text-align: left;
		display: inline-block;
		width: 195px;
		vertical-align: middle;
		float: left;
		.spanSty {
			height: 40px;
			width: 157px;
			display: block;
			float: left;
			text-align: center;
			line-height: 40px;
			border-right: 1px #b3b3b3 solid;
		}
		ul {
			width: 100%;
			max-height: 205px;
			overflow: auto;
			margin: 0;
			position: absolute;
			top: 42px;
			left: 0;
			z-index: 10;
			background: #fff;
			li {
				text-align: center;
				height: 41px;
				border: 1px #b3b3b3 solid;
				border-top: 0;
				background: #fff;
				cursor: pointer;
				&:hover {
					background: #f1f1f1;
				}
			}
		}
	}
	.export {
		height: auto;
		min-height: 42px;
		position: absolute;
		right: 60px;
		top: 70px;
		a {
			display: block;
			width: 101px;
			height: 42px;
			line-height: 42px;
		}
	}
	.timeSearch {
		width: 100%;
		height: 40px;
		margin-bottom: 16px;
	}
	.enquiries {
		margin-left: 20px;
		float: left;
		.inputBox {
			float: left;
			width: 184px;
			height: 40px;
			text-indent: 29px;
		}
	}
	.activation {
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
		font-size: 16px;
		color: #333;
	}
	.line {
		display: block;
		float: left;
		width: 14px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.sta_head {
		width: 100%;
		height: auto;
		min-height: 42px;
		margin-bottom: 14px;
		.mb15 {
			margin-bottom: 15px;
		}
		.selectDate {
			margin-right: 21px;
			float: left;
			.screening {
				height: 42px;
				text-align: center;
				line-height: 42px;
				font-size: 16px;
				color: #333;
				margin-right: 20px;
				float: left;
			}
			.date-selection {
				width: 250px;
				height: 42px;
				border: 1px solid #b3b3b3;
				line-height: 42px;
				float: left;
				.select {
					width: 100%;
					height: 42px;
					line-height: 42px;
					cursor: pointer;
					.select_l,
					.select_c,
					.select_r {
						float: left;
						height: 40px;
						text-align: center;
					}
					.select_l,
					.select_r {
						width: 40%;
					}
					.select_c {
						width: 5%;
					}
				}
			}
		}
		.select_d {
			width: 36px;
			float: left;
			height: 40px;
			border: 1px solid #b3b3b3;
			border-left: none;
			position: relative;
			&::after {
				position: absolute;
				display: block;
				border: 6px solid transparent;
				border-top: 8px solid #b3b3b3;
				top: 16px;
				left: 12px;
				content: '';
			}
		}
		.operateStore {
			float: left;
			height: 42px;
			margin-right: 20px;
			.operateStore_l {
				height: 42px;
				line-height: 42px;
				font-size: 16px;
				color: #333;
				float: left;
				margin: 0 10px 16px 0;
			}
			.operateStore_r {
				float: left;
				width: 200px;
				height: 40px;
				position: relative;
				margin-bottom: 15px;
				cursor: pointer;
				.operateStore_r_l {
					width: 145px;
					height: 40px;
					line-height: 40px;
					float: left;
					text-align: center;
					border: 1px solid #b3b3b3;
					overflow: hidden;
					font-size: 16px;
					color: #333;
				}
				.selectStore {
					width: 690px;
					height: auto;
					min-height: 291px;
					background: #44414b;
					border: 1px solid #69676f;
					position: absolute;
					left: 0;
					top: 54px;
					padding: 24px 40px;
					.content {
						overflow-y: auto;
						.shoName {
							height: 40px;
							line-height: 40px;
							border: 1px solid #f2f2f2;
							float: left;
							margin: 5px;
							color: #fff;
							padding: 0 10px;
							cursor: pointer;
						}
						// .shoName-select {
						// border-color: #FF9800;
						// background: url(http://192.168.31.185:8020/release-svn/shop/src/res/images/sign.png?18274) right bottom no-repeat;
						// }
					}
				}
				.constructions {
					width: 300px;
					height: auto;
					min-height: 50px;
					background: #44414b;
					border: 1px solid #69676f;
					position: absolute;
					left: 0;
					top: 54px;
					padding: 15px 15px;
					font-size: 14px;
					color: #fff;
				}
				.sharpCorners {
					width: 0;
					height: 0;
					line-height: 0;
					position: absolute;
					top: -10px;
					left: 20px;
					border-width: 10px;
					border-top: 0px;
					border-style: solid;
					border-color: #fff #fff #45404b #fff;
				}
			}
		}
		.zw {
			float: left;
			width: 119px;
			height: 42px;
			margin-right: 28px;
		}
		.businessHours {
			float: left;
			line-height: 42px;
			width: 119px;
			height: 42px;
			div {
				width: 20px;
				height: 20px;
				cursor: pointer;
				border: 1px solid #28a8e0;
				margin: 11px 8px;
				float: left;
			}
			span {
				font-size: 16px;
				color: #333;
			}
		}
		.screenings {
			width: 101px;
			height: 42px;
			line-height: 42px;
			margin-right: 15px;
		}
		.reset {
			width: 100px;
			height: 42px;
			line-height: 42px;
			margin-right: 13px;
		}
	}
	.return {
		width: 100px;
		height: 42px;
		line-height: 42px;
		margin-right: 180px;
	}
	.theSelected {
		width: 100%;
		height: auto;
		overflow: hidden;
		margin-bottom: 16px;
		.choice,
		.shopName {
			float: left;
			font-size: 16px;
			color: #333;
		}
		.choice {
			width: 80px;
		}
	}
	.sta_body {
		max-width: 1452px;
		width: 100%;
		overflow: hidden;
		overflow-x: auto;
		height: auto;
		// border: 1px solid #D2D2D2;
		margin-bottom: 23px;
	}
	.alipay {
		border-right: 1px solid #d2d2d2;
	}
	.sta_foot {
		height: auto;
		// border: 1px solid #D2D2D2;
		overflow: hidden;
		.week {
			text-align: center;
			font-size: 14px;
			color: #00aae5;
			p {
				font-size: 14px;
				line-height: 14px;
				color: #43414a;
				&:first-child {
					margin: 20px 0 2px;
				}
			}
		}
	}
	.pages {
		padding-top: 20px;
	}
	#coupons {
		color: #28a8e0;
		cursor: pointer;
	}
}

.tableListInp {
	height: 42px;
}
.tableListInp div {
	width: 36px;
}
.active {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
#coupon {
	width: 100%;
	height: 100%;
	position: relative;
	overflow-y: auto;
}
.coupon_content {
	width: 100%;
	height: auto;
	overflow: auto;
	padding: 32px 164px;
	.num {
		text-align: center;
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}
	ul {
		width: 100%;
		height: auto;
	}
	li {
		text-align: center;
		font-size: 18px;
		color: #333;
		margin-bottom: 10px;
	}
}

#coupon .noCoupon {
	width: 100%;
	height: 68px;
	text-align: center;
	line-height: 68px;
	font-size: 24px;
	color: #e0e0e0;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	margin: auto;
}
/* 搜索图标的公共样式 */
.order-order-searchA,
.order-order-search {
	display: inline-block;
	float: left;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
	/* margin-right: 20px; */
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
</style>
