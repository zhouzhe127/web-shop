<template>
	<div id="statistics-recharge">
		<section v-if="showtype == 'all'">
			<div class="timeSearch">
				<div class="selectDate fl">
					<div class="activation fl">
						时间筛选
					</div>
					<div class="inp-box inp-start fl">
						<!-- <calendar :time="startTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar> -->
						<el-date-picker v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false">
						</el-date-picker>
					</div>
					<span class="line"> - </span>
					<div class="inp-box inp-start fl">
						<!-- <calendar :time="endTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar> -->
						<el-date-picker v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false">
						</el-date-picker>
					</div>
					<el-button type="primary" icon="el-icon-search" @click="rechargeQuery"></el-button>
					<!-- <span class="order-order-searchA" @click="rechargeQuery">
						<span class="order-order-search" href="javascript:void(0)"></span>
					</span> -->
				</div>
				<!-- 按手机号查找 -->
				<div class="enquiries">
					<!-- <input class="inputBox" type="text" placeholder="按手机号查询" v-model="orderNumber" maxlength="11" />
					<a class="order-order-searchA" @click="getPhone('phone')">
						<span class="order-order-search"></span>
					</a> -->
					<el-input class="fl" v-model="orderNumber" placeholder="请输入手机号码" style="width:202px;"></el-input>
					<el-button class="fl" type="primary" icon="el-icon-search" @click="getPhone('phone')"></el-button>
				</div>
			</div>
			<!-- head -->
			<div class="sta_head">
				<!-- 操作店铺 -->
				<div class="operateStore">
					<div class="operateStore_l">
						充值来源
					</div>
					<div class="operateStore_r fl detLi" @click.stop.prevent="openShop($event)">
						<selectStore v-if="isBrand" @emit="clickShopList" :sorts="shopsList" :tipName="selectName"></selectStore>
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
					<!-- <section class="statisticsLists">
						<select-btn :name='cardhigh' :sorts="cardList.map(v=>v.name)" :width="157" @selOn="selCard"></select-btn>
					</section> -->
					<el-select v-model="cardhigh" placeholder="请选择" @change="selCard">
						<el-option v-for="item in cardList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 按天数 -->
				<div class="fl mb15" style="margin-right: 12px;">
					<!-- <section class="statisticsLists">
						<select-btn :name="datahigh" :sorts="dataList.map(v=>v.name)" :width="157" @selOn="selData"></select-btn>
					</section> -->
					<el-select v-model="datahigh" placeholder="请选择" @change="selData">
						<el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 按营业时间 -->
				<div class="zw mb15">
					<!-- <div class="businessHours">
						<div @click="selectBusinessHours" :class="{'active':isOpenTime}"></div>
						<span>按营业时间</span>
					</div> -->
					<el-checkbox v-model="isOpenTime" size="mini">按营业时间</el-checkbox>
				</div>
				<!-- 筛选 -->
				<!-- <a class="blue fl screenings mb15" href="javascript:void(0);" @click="rechargeQuery">筛选</a> -->
				<!-- 重置 -->
				<!-- <a class="gray fl reset mb15" href="javascript:void(0);" @click="filterReset">重置</a> -->
			</div>
			<div class="sta_head">
				<!-- 操作店铺 -->
				<div class="operateStore">
					<div class="operateStore_l fl">
						充值方案
					</div>
					<prepaid-plan :shopIds="planId" :isSingle="false" @chooseShop="backShopId"></prepaid-plan>
				</div>
				<div class="operateStore">
					<div class="operateStore_l fl">
						实付区间
					</div>
					<el-input class="fl" v-model="intervalLeft" placeholder="请输入金额" style="width:150px;" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6"></el-input>
					<div class="operateStore_l fl" style="margin-left:10px;">
						元~
					</div>
					<el-input class="fl" v-model="intervalRight" placeholder="请输入金额" style="width:150px;" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="6"></el-input>
					<div class="operateStore_l fl" style="margin-left:10px;">
						元
					</div>
					<div class="operateStore_l fl">
						<el-tooltip placement="top">
							<div slot="content">筛选用户实际支付金额区间,不输入则此项不参与筛选。
								<br />仅输入前输入框代表仅筛选填写金额以上数据（包含）,<br />仅输入后输入框代表仅筛选0至填写金额的数据（包含）。</div>
							<i class="el-icon-question"></i>
						</el-tooltip>
					</div>
				</div>
				<el-button type="primary" @click="rechargeQuery">筛选</el-button>
				<el-button type="info" @click="filterReset">重置</el-button>
			</div>
			<!-- 选择店铺 -->
			<!-- <div class="theSelected" :style="{'height':storeShowH}">
				<div class="choice" >选择店铺：
                	<span @click="openStore">{{isShowStore?'收起':'展开'}}</span>  
                </div>
				<div v-if="isShowStore" >
                    {{selectName}}
                </div>
			</div> -->
			<div class="store-show" :style="{'height':storeShowH}">
				<i>已选择店铺：</i>
				<div class="store-block">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<div>{{selectName}}</div>
				</div>
			</div>
			<!-- body -->
			<section v-if='!phone'>
				<!-- <section style="margin-bottom:20px;">
					<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
						<div slot="con-11" slot-scope="props" @click="openPayment(props.data,'all')">
							{{props.data.totalOtherPay}}
						</div>
					</com-table>
				</section> -->
				<el-table :data="staticLists" border style="width: 1400px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
					<el-table-column fixed prop="days" label="天数" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #ff9800">{{scope.row.days}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="rechargePersonNum" label="充值人数" width="111" align="center">
					</el-table-column>
					<el-table-column prop="rechargeNum" label="充值次数" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalRecharge" label="充值总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalPayment" label="支付总额" width="111" align="center">
						</el-table-column>					
					<el-table-column prop="totalCash" label="现金" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalCard" label="银行卡" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalWeChat" label="微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalSQWeChat" label="收钱吧微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalAliPay" label="支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalSQAliPay" label="收钱吧支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXWeChat" label="中信微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXSHWeChat" label="中信(上海)微信" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXAliPay" label="中信支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalZXSHAliPay" label="中信(上海)支付宝" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalOtherPay" label="自定义支付" width="111" align="center">
						<template slot-scope="scope">
							<span style="color: #27a8e0;" @click="openPayment(scope.$index, scope.row,'all')">{{scope.row.totalOtherPay}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="totalGiftAmount" label="赠送总额" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalGiftPoint" label="赠送积分" width="111" align="center">
					</el-table-column>
					<el-table-column prop="totalGiftCoupon" label="赠送优惠券" width="111" align="center">
					</el-table-column>
				</el-table>
				<!-- 下面的表格 -->
				<div class="box">
					<div class="list_title">
						<div class="list_title_l fl">
							<span>会员充值统计</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{allFormList.length}}</a>条记录</span>
						</div>
						<div class="list_title_r fr">
						</div>
					</div>
					<el-table :data="formList" border style="width: 1500px;margin-bottom: 20px;" :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}">
						<el-table-column fixed prop="shopId" label="来源名称" width="211" align="center">
							<template slot-scope="scope">
								<span style="color: #27a8e0" @click="showoneshopDetail(scope.row)">{{getshopName(scope.row.shopId)}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="rechargePersonNum" label="充值人数" width="111" align="center">
						</el-table-column>
						<el-table-column prop="rechargeNum" label="充值次数" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalRecharge" label="充值总额" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalPayment" label="支付总额" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalCash" label="现金" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalCard" label="银行卡" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalWeChat" label="微信" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalSQWeChat" label="收钱吧微信" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalAliPay" label="支付宝" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalSQAliPay" label="收钱吧支付宝" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalZXWeChat" label="中信微信" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalZXSHWeChat" label="中信(上海)微信" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalZXAliPay" label="中信支付宝" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalZXSHAliPay" label="中信(上海)支付宝" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalOtherPay" label="自定义支付" width="111" align="center">
							<template slot-scope="scope">
								<span style="color: #27a8e0;" @click="openPayment(scope.$index, scope.row,'one')">{{scope.row.totalOtherPay}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="totalGiftAmount" label="赠送总额" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalGiftPoint" label="赠送积分" width="111" align="center">
						</el-table-column>
						<el-table-column prop="totalGiftCoupon" label="赠送优惠券" width="111" align="center">
							<template slot-scope="scope">
								<span style="color: #27a8e0;" @click="openDiscount(scope.row)">{{scope.row.totalGiftCoupon}}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<!-- <section>
					<com-table :listHeight='80' :listWidth="1400" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'会员充值统计'" :key="index" :showTitle='1' :allTotal="allFormList.length">
						<div slot="con-0" slot-scope="props" @click="showoneshopDetail(props.data)">
							{{getshopName(props.data.shopId)}}
						</div>
						<div slot="con-11" slot-scope="props" @click="openPayment(props.data,'one')">
							{{props.data.totalOtherPay}}
						</div>
						<div slot="con-14" slot-scope="props" @click="openDiscount(props.data)">
							{{props.data.totalGiftCoupon}}
						</div>
					</com-table>
				</section> -->
				<!-- 优惠券详情的弹窗 -->
				<coupon-detail v-if='showWin' @getAppliedWin='getResult' :CouponDetails='CouponDetails'></coupon-detail>
				<!-- 其他支付方式的弹窗 -->
				<paymentWin v-if="preferentialBounced" @toClick="whetherToclick" :otherPayDetail='otherPayDetail' :shopsList='shopsList' :paymentType='paymentType' :paymentShopId='paymentShopId'></paymentWin>
				<!-- 弹窗 -->
				<!-- 分页 -->
			</section>
			<recharge-phone v-else :count='count' :phonelist='phonelist' :phonetotal='phonetotal'></recharge-phone>
			<!-- 翻页 -->
			<!-- <section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section> -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</section>
		<oneshoprecharge v-if="showtype == 'one'" @throwWinResult="getDetailShow" :constructionsName="constructionsName" :startTime="startTime" :endTime="endTime" :isOpenTime="isOpenTime" :constructionsId="constructionsId" :taskId='taskId' :shopsList='shopsList'>
		</oneshoprecharge>
		<!-- 单店详情 -->
		<oneshopdetail v-if="showtype == 'onedetail'" @throwWinResult="getDetailShow" :constructionsName="constructionsName" :startTime="startTime" :endTime="endTime" :isOpenTime="isOpenTime" :constructionsId="constructionsId" :taskId='taskId' :shopsList='shopsList'>
		</oneshopdetail>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import { mixin } from './mixin.js';

	export default {
		mixins: [mixin],
		data() {
			return {
				userShop: '', //店铺信息
				startTime: (new Date()).setHours(0, 0, 0, 0), //.getZero(), //日期组件的开始时间
				endTime: (new Date()).setHours(23, 59, 59, 999), //日期组件的结束时间
				isBrand: false, //是否是品牌的状态
				constructionsBtn: false, //单店下店铺tip是否显示的标识
				cardList: [{ //卡状态
					name: '全部',
					id: -1
				}, { //卡状态
					name: '电子卡',
					id: 0
				}, {
					name: '实体卡',
					id: 1
				}], //卡类型筛选列表
				cardId: -1, //卡类型对应的id
				cardLimit: false, //卡类型下拉框显示
				cardhigh: '全部',
				dataList: [{ //按天状态
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
				shopsList: [], //充值来源的店铺列表
				orderNumber: '', //手机号码
				page: 1, //页码数
				num: 10, //条数
				count: '', //总条数
				endTotal: 1,
				isOpenTime: false, //是否按营业时间，默认 false 0 否
				shopListBtn: false, // 页面选择店铺弹窗是否显示的标识
				selectName: '请选择店铺', //页面店铺框中显示的店铺名称，以逗号分隔
				selectShopList: [], // 店铺列表
				shopName: '', //若是单店模式 显示名字
				ischain: '', // 当前店铺的ischain
				selectShopId: '', //选择门店
				index: null,
				staticLists: [],
				allFormList: [], //所有店铺的数据的数据
				formList: [], //展示店铺的数据
				isloadingstatus: false, //延时处理
				loading: false, //状态  
				timer: '', //定时器
				timerqueue: [], //时间数组 
				taskId: '', //任务Id
				showtype: 'all',
				constructionsName: '', //点击查询单店的店铺名称
				constructionsId: '', //点击查询单店的id 
				phone: false, //按手机号查找
				phonetotal: [],
				phonelist: [],
				planId: [], //充值方案Id集合
				intervalLeft: '', //实付区间1
				intervalRight: '', //实付区间2
				isShowStore: false, //已选中店铺列表 是否展开
				storeShowH: '20px',
			};
		},
		created: function() {
			this.isBrand = false; //品牌店的状态 品牌店铺下面有一个店铺操作
			this.userShop = storage.session('userShop');
			this.ischain = this.userShop.currentShop.ischain;
			if (this.userShop.currentShop && this.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
				this.isBrand = true; //更改品牌店的状态
			} else {
				this.isBrand = false;
			}
			this.getshopIdorshopName();
			// let obj1 = {
			// 	titleStyle: {
			// 		fontSize: 16 + 'px'
			// 	}
			// };
			// let obj2 = {
			// 	conStyle: {
			// 		'color': '#ff9800'
			// 	}
			// };
			// for (let item of this.titleList) {
			// 	if (item.dataName != 'totalOtherPay') {
			// 		Object.assign(item, obj1, obj2);
			// 	}
			// }
			// for (let item of this.shoptitleList) {
			// 	Object.assign(item, obj1);
			// }
		},
		methods: {
			openStore() { //展开收起-已选中店铺列表
				if (this.isShowStore == true) { //展开时点击
					this.storeShowH = '20px';
				} else {
					this.storeShowH = 'auto';
				}
				this.isShowStore = !this.isShowStore;
			},
			startTimeChange: function(data) {
				this.startTime = new Date(data).setHours(0, 0, 0, 0);
			},
			endTimeChange: function(data) {
				this.endTime = new Date(data).setHours(23, 59, 59, 999);
			},
			openShop: function() { //店铺选择弹窗的消失和隐藏
				if (this.isBrand) {
					this.shopListBtn = !this.shopListBtn; //标识取反    
				} else {
					this.constructionsBtn = !this.constructionsBtn; //标识取反  
					return false;
				}
			},
			getshopIdorshopName: function() {
				//默认全部选中
				if (this.ischain == '3') {
					let brandShop = storage.session('userShop').currentShop; //品牌店铺
					let obj = {
						id: brandShop.id,
						shopName: '微信充值',
						shopNumber: brandShop.shopNumber,
					};
					let selectShopList = storage.session('shopList'); //店铺列表
					selectShopList.push(obj);
					let shopIds = [];
					let selectName = [];
					for (let item of selectShopList) {
						item.selected = true;
						item.name = item.shopName;
						shopIds.push(item.id);
						selectName.push(item.name);
					}
					this.selectShopId = shopIds.join(',');
					this.selectName = selectName.join(',');
					this.shopsList = selectShopList;
				} else {
					this.selectShopId = storage.session('userShop').currentShop.id;
					this.selectName = storage.session('userShop').currentShop.name;
					this.shopsList.push(
						storage.session('userShop').currentShop
					);
				}
			},
			// 获取卡属门店店铺列表
			clickShopList: function(arr) {
				this.shopsList = arr;
				let idArr = [];
				let nameArr = [];
				arr.forEach((item) => {
					if (item.selected == true) {
						idArr.push(item.id);
						nameArr.push(item.name);
					}
				});
				this.selectName = nameArr.join(',');
				if (this.selectName == '') {
					this.selectName = '请选择店铺';
				}
				this.selectShopId = idArr.join(',');
			},
			// 选择电子卡或实体卡
			selCard: function(value) {
				this.cardId = value;
				// this.cardhigh = this.cardList[i].name; //点击卡类型对应的名字
				// this.cardId = this.cardList[i].id; //点击卡类型对应的id
			},
			// 按天数或详情
			selData: function(value) {
				this.dataId = value;
				// this.datahigh = this.dataList[i].name; //点击卡类型对应的名字
				// this.dataId = this.dataList[i].id; //点击卡类型对应的id
			},
			// 选择电子卡的类型
			// selCardType: function(i) {
			// 	this.cardTypehigh = this.cardTypeList[i].name; //点击卡类型对应的名字
			// 	this.cardTypeId = this.cardTypeList[i].id; //点击卡类型对应的id
			// },
			async rechargeQuery() {
				if (!this.checkData()) return;
				this.loading = true;
				this.isloadingstatus = false;
				let data = await http.rechargeQuery({
					data: {
						shopIds: this.selectShopId, //查询的店铺Ids
						isOpenTime: Number(this.isOpenTime), //是否按营业时间
						isCard: this.cardId, //电子会员或实体卡
						isDay: this.dataId, //按天或详情
						startTime: parseInt(this.startTime / 1000), //开始时间 
						endTime: parseInt(this.endTime / 1000), //结束时间
						depositPlanIds: this.planId.join(','), //方案的IDs
						min: this.intervalLeft, //充值实付最大
						max: this.intervalRight //充值实付最小
					}
				});
				if (data) {
					this.taskId = data; //任务id
					this.timer = setInterval(() => {
						this.getTaskStatus(data);
					}, 2000);
				}
			},
			async getTaskStatus(id) {
				let data = await http.getScanTaskStatus({
					data: {
						taskId: id
					}
				});
				this.timeout = setTimeout(() => {
					if (!this.isloadingstatus) {
						this.loading = false;
						this.$store.commit('setWin', {
							content: '页面加载失败,请重新加载',
							title: '操作提示',
							winType: 'alert'
						});
						clearInterval(this.timer);
						while (this.timerqueue.length) {
							clearTimeout(this.timerqueue.pop());
						}
						return false;
					}
				}, 20000);
				this.timerqueue.push(this.timeout);
				if (data == true) {
					clearInterval(this.timer);
					while (this.timerqueue.length) {
						clearTimeout(this.timerqueue.pop());
					}
					this.getRechargeData(id);
				}
			},
			async getRechargeData(id) {
				let data = await http.getRechargeData({
					data: {
						taskId: id, //任务Id
						showDetail: 0, //是否查看一家店铺的数据
						showShopId: '', // 查询一家店铺的数据的Id
						showDay: '', //查看一家店铺传递的日期
						page: '', //页码
						num: '' //每页显示的条数
					}
				});
				if (data) {
					this.loading = false;
					this.isloadingstatus = true;
					this.phone = false;
					this.staticLists = [];
					this.staticLists.push(data.total); //头部的数据 
					this.allFormList = data.list; //身体的数据
					this.$nextTick(() => {
						this.setPage();
					});
				}
			},
			// getPageNum: function(obj) {
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	if (this.phone) {
			// 		this.getPhone();
			// 	} else {
			// 		this.setPage();
			// 	}
			// },
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				if (this.phone) {
					this.getPhone();
				} else {
					this.setPage();
				}
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				if (this.phone) {
					this.getPhone();
				} else {
					this.setPage();
				}
			},
			getshopName: function(id) {
				let shopName = '';
				for (let item of this.shopsList) {
					if (item.id == id) {
						shopName = item.name ? item.name : item.shopName;
					}
				}
				return shopName;
			},
			showoneshopDetail: function(item) {
				if (this.dataId == '1') {
					this.showtype = 'one';
				} else {
					this.showtype = 'onedetail';
				}
				this.constructionsName = this.getshopName(item.shopId); //店铺名称
				this.constructionsId = item.shopId;
			},
			getDetailShow(res) { //子组件评价列表返给父组件的
				this.showtype = res;
				this.$store.commit('setPageTools', [{
					name: '导出',
					className: ['fd-blue'],
					fn: () => {
						this.Export();
					}
				}]);
			},
			checkData: function(type) {
				let re = /^1\d{10}$/;
				if ((this.endTime - this.startTime) > global.timeConst.THREEMONTHS) {
					this.valiData('只能查询间隔三个月的数据');
					return false;
				}
				if (this.startTime - this.endTime > 0) {
					this.valiData('查询时间选择错误');
					return false;
				}
				if (this.selectShopId == '') {
					this.valiData('请选择店铺');
					return false;
				}
				if (this.loading == true) {
					this.valiData('正在搜索,请勿重复点击');
					return false;
				}
				if (type == 'phone') {
					if (!re.test(this.orderNumber)) {
						this.valiData('手机号码格式有误');
						return false;
					}
					if (this.orderNumber == '') {
						this.valiData('请填写手机号码');
					}
				}
				return true;
			},
			selectBusinessHours: function() {
				//是否开启营业模式
				this.isOpenTime = !this.isOpenTime;
			},
			filterReset: function() {
				//重置
				this.startTime = new Date().setHours(0, 0, 0, 0); //.getZero();
				this.endTime = (new Date()).setHours(23, 59, 59, 999);
				this.dataId = 1;
				this.datahigh = '按天数';
				this.page = 1;
				this.cardhigh = '全部';
				this.cardId = -1;
				if (this.isBrand) {
					this.selectName = '请选择店铺';
					this.selectShopId = '';
				}
				this.getShopList();
			},
			async getPhone(type) {
				if (!this.checkData(type)) return;
				if (type == 'phone') {
					this.page = 1;
				}
				let data = await http.rechargeQuery({
					data: {
						shopIds: this.selectShopId, //查询的店铺Ids
						isOpenTime: Number(this.isOpenTime), //是否按营业时间
						isCard: this.cardId, //电子会员或实体卡
						isDay: this.dataId, //按天或详情
						startTime: parseInt(this.startTime / 1000), //开始时间 
						endTime: parseInt(this.endTime / 1000), //结束时间
						page: this.page,
						num: this.num,
						mobile: this.orderNumber,
					}
				});
				this.phonetotal = [];
				this.phonetotal.push(data.list.total);
				for (let item of data.list.list) {
					if (this.ischain == '3') {
						let showId = '';
						showId = item.fromId == '0' ? item.shopId : item.fromId;
						item.shopName = this.getshopName(showId);
					} else {
						item.shopName = this.getshopName(item.shopId);
					}
				}
				this.phonelist = data.list.list;
				this.count = data.count;
				this.endTotal = data.total;
				this.phone = true;
			},
			async Export() {
				if (this.phone) {
					this.valiData('按手机搜索暂不支持导出');
					return false;
				}
				await http.exportRechargeData({
					data: {
						taskId: this.taskId, //任务Id
						showDetail: 0, //是否查看一家店铺的数据
						showShopId: '', // 查询一家店铺的数据的Id
						showDay: '', //查看一家店铺传递的日期
						page: '', //页码
						num: '', //每页显示的条数	
						isExport: 1
					}
				});
			},
			//组件返回店铺Id
			backShopId(id) {
				//console.log(id);
				this.planId = id;
			},
		},
		mounted: function() {
			this.$store.commit('setPageTools', [{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.Export();
				}
			}]);
			this.rechargeQuery();
			document.onclick = function() {
				this.constructionsBtn = false;
			};
		},
		components: {
			Calendar: () =>
				import( /*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
			SelectStore: () =>
				import( /*webpackChunkName: "select_store"*/ 'src/components/select_store'),
			PageElement: () =>
				import( /*webpackChunkName: "page_element"*/ 'src/components/page_element'),
			selectBtn: () =>
				import( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
			ComTable: () =>
				import( /*webpackChunkName:"com_table" */ 'src/components/com_table'),
			oneshoprecharge: () =>
				import( /*webpackChunkName: "member_recharges_oneshop"*/ './member_recharges_oneshop'),
			oneshopdetail: () =>
				import( /*webpackChunkName: "member_recharges_onedetail"*/ './member_recharges_onedetail'),
			'coupon-detail': () =>
				import( /*webpackChunkName: "member_recharge_couponwin"*/ './member_recharge_couponwin'),
			'recharge-phone': () =>
				import( /*webpackChunkName: "member_recharges_phone"*/ './member_recharges_phone'),
			paymentWin: () =>
				import( /*webpackChunkName: "payment_win"*/ './payment_win'),
			'prepaid-plan': () =>
				import( /*webpackChunkName:"prepaid_phone_plan" */ './prepaid_phone_plan.vue'),
		},
	};
</script>
<style lang="less" scoped>
	#statistics-recharge {
		width: 100%;
		height: auto;

		.inp-box {
			display: inline-block; // border: 1px solid #b3b3b3;
			vertical-align: top;
			position: relative; // input {
			// 	z-index: 2;
			// 	position: relative;
			// 	background: none;
			// 	height: 38px;
			// 	cursor: pointer;
			// 	i {
			// 		position: absolute;
			// 		left: 0;
			// 		top: 0;
			// 		display: block;
			// 		height: 38px;
			// 		width: 40px;
			// 		line-height: 38px;
			// 		text-align: center;
			// 		opacity: 0.5;
			// 		&.right {
			// 			right: 0;
			// 			left: auto;
			// 			border-left: 1px solid #b3b3b3;
			// 		}
			// 	}
			// }
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
				height: 40px;
				margin-right: 28px;
				line-height: 42px;
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

		.store-show {
			width: 100%;
			margin-bottom: 10px;
			display: block;
			overflow: hidden;
			line-height: 20px;
			position: relative;

			i {
				float: left;
				position: absolute;
				left: 0;
				top: 0;
			}

			.store-block {
				overflow: hidden;
				width: 100%;
				padding-left: 84px;

				em {
					float: left;
					color: #09f;
					margin-right: 5px;
					cursor: pointer;
					text-decoration: underline;
				}

				span {
					float: left;
					color: #333;
				}
			}
		}

		.sta_body {
			max-width: 1452px;
			width: 100%;
			overflow: hidden;
			overflow-x: auto;
			height: auto; // border: 1px solid #D2D2D2;
			margin-bottom: 23px;
		}

		.alipay {
			border-right: 1px solid #d2d2d2;
		}

		.sta_foot {
			height: auto; // border: 1px solid #D2D2D2;
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

		.box {
			max-width: 1500px;
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
		background: url(../../../res/icon/selected.png) center center no-repeat,
			#28a8e0;
	}

	#coupon {
		width: 100%;
		height: 100%;
		position: relative;
		overflow-y: auto;
	}

	.box .list_title {
		width: 100%;
		height: 50px;
		border: 1px solid #ebeef5;
		border-bottom: none;
		padding-left: 11px;
	}

	.box .list_title .list_title_l,
	.box .list_title .list_title_r {
		width: 50%;
		height: 100%;
		float: left;
		line-height: 45px;
	}

	.box .list_title .list_title_l span {
		font-size: 16px;
		color: #333;
	}

	.box .list_title .list_title_l span:first-child {
		margin-right: 11px;
	}

	.box .list_title .list_title_l span:nth-child(2) {
		display: inline-block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #000;
		margin-right: 11px;
		vertical-align: middle;
	}

	.box .list_title .list_title_l span:last-child a {
		font-size: 16px;
		color: #ff3c05;
	}

	.box .list_title .list_title_r span {
		color: #28a8e0;
		font-size: 16px;
		float: right;
		padding-right: 46px;
		cursor: pointer;
	}

	.pageWrap {
		height: 65px; // padding-top: 20px;
		margin-bottom: 100px;
	}
</style>