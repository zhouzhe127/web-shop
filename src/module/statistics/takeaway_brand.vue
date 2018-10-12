<template>
	<div id="statistics-order" style="padding-top:20px;" v-cloak>
		<div class="button">
			<a v-on:click="toOrder" href="javascript:void(0);">堂吃</a>
			<a href="javascript:void(0);" class="select">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<!--总览订单页面显示日期-->
		<div class="order-order-data">
			<!--日期选择和搜索框-->
			<div style="display:inline-block;margin:10px 0;">
				<el-date-picker
					v-model="startTime"
					type="datetime"
					placeholder="选择日期">
				</el-date-picker>
				<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
				<el-date-picker
					v-model="endTime"
					type="datetime"
					placeholder="选择日期">
				</el-date-picker>
			</div>
			<div style="display:inline-block;margin:10px 0;">
				<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:10px 10px;float: left;"></div>
				<span style="font-size: 16px;">按营业时间</span>
				<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
			</div>
			<!--外卖类型选择框-->
			<div style="display:inline-block;margin:10px 0;">
				<el-select v-model="selectTypeNum" placeholder="请选择外卖类型" style="width:150px;">
					<el-option
						v-for="(item,index) in takeawaytypeList"
						:key="index"
						:label="item"
						:value="index">
					</el-option>
				</el-select>
				<!-- <li style="line-height:40px;">
					<selectBtn @selOn="getTakeawayType" :sorts="takeawaytypeList" :name="allTakeawaytype"></selectBtn>
				</li> -->
				<el-button v-on:click="sreachOrderInDays()" type="primary">搜索</el-button>
				<el-button v-on:click="resetting()" type="info">重置</el-button>
			</div>
		</div>
		<section style="width:100%;overflow: hidden;height: auto;line-height:40px;margin-top: 10px;">
			<section style="width: 80px;height: 20px;line-height: 20px;float: left;">选择店铺：</section>
			<section style="height: auto;line-height: 20px;float: left;">{{selectName}}</section>
		</section>
		<div v-if="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div>
		<section v-if="loading" class="allBox">
			<el-table
				stripe :row-style ="{color:'#f8941f'}" :header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="newpayTotalNum"
				border
				style="width: 100%">
				<el-table-column width="250" align="center" prop="days" label="天数"></el-table-column>
				<el-table-column min-width = "100" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width = "120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="totalNum" label="商品总数"></el-table-column>
				<el-table-column min-width = "100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="销量" ></el-table-column>
				<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="discountNum" label="赠品总数" ></el-table-column>
				<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="deliverFee" label="配送总额" >
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.deliverFee).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width = "120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="activityFee" label="优惠总额" >
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.activityFee).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width = "120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="goodsTotalPrice" label="消费总额" >
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width = "120" :render-header="renderHeader" show-overflow-tooltip align="center" property="income" label="入账总额" >
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.income).toFixed(2)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<section style="margin-top:20px;">
				<el-table
					stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
					:data="lists"
					border
					style="width: 100%">
					<el-table-column fixed width="250" align="center" prop="shopName" label="店铺名称">
						<template slot-scope="scope">
							<span style="color:#00AAE7;cursor: pointer;" v-on:click="openDayDetial(scope.row)">{{scope.row.shopName}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width = "100" align="center" prop="orderNum" label="订单数"></el-table-column>
					<el-table-column min-width = "120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="totalNum" label="商品数"></el-table-column>
					<el-table-column min-width = "100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="销量" ></el-table-column>
					<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="discountNum" label="赠品数" ></el-table-column>
					<el-table-column min-width = "100" show-overflow-tooltip align="center" prop="deliverFee" label="配送金额" >
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.deliverFee).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width = "120" show-overflow-tooltip align="center" prop="activityFee" label="优惠金额" >
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.activityFee).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width = "120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="goodsTotalPrice" label="消费金额" >
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.goodsTotalPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width = "120" :render-header="renderHeader" show-overflow-tooltip align="center" property="income" label="入账金额" >
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.income).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</section>
		<!--分页-->
		<div style="margin:20px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="currentPage" :page-count="totalNum" :page-size = "num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			userData: {},
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			// newStartTime: '', //点击日历组件获取的开始时间
			// newEndTime: '', //点击日历组件获取的结束时间
			orderListInDays: [], //时间段内每天的订单列表
			isZeroPays: [], //支付方式和为0的列表
			payTotalNum: {
				orderNum: 0,
				totalNum: 0,
				goodsNum: 0,
				discountNum: 0,
				deliverFee: 0,
				activityFee: 0,
				goodsTotalPrice: 0,
				income: 0
			}, //当天或者多天的数据总和  要给默认值，防止初始还未请求完数据就报错或者不显示
			newpayTotalNum:[],//当天或者多天的数据总和  要给默认值，防止初始还未请求完数据就报错或者不显示
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			startH: '', //开始时
			startM: '', //开始分
			startS: '', //开始秒
			endH: '', //结束时
			endM: '', //结束分
			endS: '', //结束秒
			isBrand: '',
			selectName: '',
			selectShopList: null,
			postSelectShopList: null,
			shopIds: '', //选择查看的店铺的id
			taskId: '', //传给后台请求数据的一个字段
			// allTrue: true, //选择门店的全部选择按钮是否选中状态
			agwge: true, //防止请求中连续点多次请求
			loading: true, //请求页面中
			takeawaytypeList: ['全部', '饿了么', '美团', '百度外卖'], //外卖类型
			// allTakeawaytype: '请选择类型',
			takeawaytypeBtn: false,
			// countList: [{ name: 10 }, { name: 50 }],
			// paginationList: [],
			num: 10,
			total: 1,
			currentPage: 1,
			shopInfo: null,
			selectTypeNum: '',//各类外卖筛选下标
			// startObj: {},
			// endObj: {},

			transmitId:[],  //传递给选择店铺页面的id
		};
	},
	computed: {
		totalNum() {
			return Math.ceil(this.orderListInDays.length / this.num);
		},
		lists() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.orderListInDays.slice(startIndex, endIndex);
		}
	},
	methods: {
		renderHeader(h,{column,$index}){
			let titleName = "";
			let label = column.label;
			let property = column.property;
			if(label=="商品总数"&&property=="totalNum"){
				titleName = '该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			}else if(label=="商品数"&&property=="totalNum"){
				titleName = '该店铺在该时间段内的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			}else if(label=="销量"&&property=="goodsNum"){
				titleName = '该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量';
			}else if(label=="优惠总额"&&property=="activityFee"){
				titleName = '该时间段所有的优惠金额总计';
			}else if(label=="优惠金额"&&property=="activityFee"){
				titleName = '该店铺在该时间段内所有的优惠金额总计';
			}else if(label=="消费总额"&&property=="goodsTotalPrice"){
				titleName = '该时段内所有商品原价的金额总计（不计入退品金额）';
			}else if(label=="消费金额"&&property=="goodsTotalPrice"){
				titleName = '该店铺在该时间段内所有商品原价的金额总计（不计入退品金额）';
			}else if(label=="入账总额"&&property=="income"){
				titleName = '该时间段中实际收入的金额（不计入未入实账的支付方式的金额）';
			}else if(label=="入账金额"&&property=="income"){
				titleName = '该店铺在该时间段内实际收入的金额（不计入未入实账的支付方式的金额）';
			}else{
				// titleName = ''
			}
			return h("div", [
				h("span",{},column.label),
				h("el-popover", {
					attrs: {
						effect: "dark",
						content: titleName,
						placement: "bottom",
						width:'300',
					}
				}, [
					h("span", {
						class: 'el-icon-question',
						slot:"reference",
						style: 'font-size: 18px;margin-left:5px;',
						// title:"标题",
					})
				])
			])
		},
		initBtn() {
			let arr = [
				{
					name: '导出',
					style: {},
					fn: () => {
						this.exportOrder();
					}
				}
			];
			this.$store.commit('setPageTools', arr);
		},
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少条点击
		numChange(e){
			this.num = e;
			this.currentPage = 1;
		},
		//到堂吃订单统计界面
		toOrder: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'orderBrand', //外卖的关键表示
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderBrand', detial);
			this.$router.push({
				path: '/admin/orderStatistics',
				query: this.$route.query
			});
		},
		toProprietary: function() {
			//去自营外卖
			this.$router.push({
				path: '/admin/orderStatistics/orderProprietaryBrand',
				query: this.$route.query
			});
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.newStartTime = receiveTime;
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.newEndTime = receiveTime;
		},
		//外卖类型选择
		showtakeawaytypeList: function(e) {
			e.stopPropagation();
			this.takeawaytypeBtn = !this.takeawaytypeBtn;
		},
		openDayDetial: function(item) {
			let dataDetial = {
				startTime: this.startTime,
				endTime: this.endTime,
				allDayPage: this.currentPage, //页码信息
				isOpenTime: this.isOpenTime, // 按营业时间
				selectShops: this.isOpenTime,
				isbrandJoin: true, //是否从品牌中进入
				itemDetial: item, //所选品牌的信息
				selectShopList: this.selectShopList,
				shopId: item.id,
				type: this.selectTypeNum
			};
			storage.session('brandDetial', dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
		},
		init: function() {
			this.getOrderListInDays();
		},
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误'
				});
				return false;
			}
			this.getOrderListInDays();
		},
		//重置
		resetting: function() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			// this.startObj = { time: this.startTime };
			// this.endObj = { time: this.endTime };
			this.isOpenTime = true;
			this.selectName = '';
			// this.allTakeawaytype = '请选择类型';
			this.selectTypeNum = '';
			for (let i = 0; i < this.selectShopList.length; i++) {
				this.selectShopList[i].selected = true;
				this.selectName =
					this.selectName + this.selectShopList[i].shopName + ',';
			}
			this.transmitId=this.selectShopList.map((v)=>{
				return v.id
			});
			this.getOrderListInDays();
		},
		//获取时间段内 订单列表
		async getOrderListInDays() {
			this.loading = false;
			if (this.shopIds == '') {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请选择要查询的店铺'
				});
				return false;
			}
			this.startTime = new Date(this.startTime).getTime();
			this.endTime = new Date(this.endTime).getTime();
			let startTime = this.startTime;
			let endTime = this.endTime;
			this.startH = utils.format(startTime, 'hh');
			this.startM = utils.format(startTime, 'mm');
			this.startS = utils.format(startTime, 'ss');
			this.endH = utils.format(endTime, 'hh');
			this.endM = utils.format(endTime, 'mm');
			this.endS = utils.format(endTime, 'ss');
			let timeNum = 0; //限制请求次数
			// if (this.selectTypeNum == undefined) {
			// 	this.selectTypeNum = 0;
			// }
			//从后台获取数据
			let res = await http.OrderReport({
				data: {
					trueShopId: this.userData.currentShop.id,
					type: '7',
					timeType: '1',
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					takeoutType: this.selectTypeNum,
					isOpenTime: Number(this.isOpenTime),
					shopIds: this.shopIds
				}
			});
			if (res.taskId) {
				this.taskId = res.taskId;
				window.timer = setInterval(async () => {
					timeNum++;
					let data = await http.taskInfo({
						data: {
							trueShopId: this.userData.currentShop.id,
							taskId: this.taskId
						}
					});
					// this.agwge = false;
					this.agwge = true;
					if (data.status == 2) {
						this.$store.commit('setWin', {
							content: '请求失败，请重试！'
						});
						this.loading = false;
						clearInterval(window.timer);
					} else if (data.status == 3) {
						this.loading = true;
						this.getrrrrrr(this.taskId);
						clearInterval(window.timer);
					} else {
						this.agwge = false;
					}
					if (timeNum > 60) {
						this.agwge = false;
						clearInterval(window.timer);
					}
				}, 1000);
				if (this.agwge == false) {
					clearInterval(window.timer);
				}
			}
		},
		async getrrrrrr(taskId) {
			this.newpayTotalNum = [];
			let res = await http.getOrderManyShopsStat({
				data: {
					taskId: taskId,
					type: 7,
					brandId: this.userData.currentShop.id
				}
			});
			if (res.length == 0) {
				this.orderListInDays = [];
				// this.payTotalNum.discountList = { order: [], coupon: [] };
				return;
			}
			this.orderListInDays = res.list;
			this.payTotalNum = res.total;
			this.newpayTotalNum.push(this.payTotalNum);
			let shopInfo = {};
			for (let i = 0; i < this.orderListInDays.length; i++) {
				for (let j = 0; j < this.selectShopList.length; j++) {
					if (this.selectShopList[j].id ==this.orderListInDays[i].shopId) {
						this.orderListInDays[i].shopName = this.selectShopList[j].shopName;
						shopInfo[this.selectShopList[j].id] = this.orderListInDays[i].shopName;
						this.shopInfo = shopInfo;
					}
				}
			}
			this.shopInfo = shopInfo;
			// this.setPage();
		},
		//天数数据翻页效果,展示当前页
		getOrderListMonPage: function() {
			this.getOrderListInDays();
		},
		//导出订单
		async exportOrder() {
			// let startDay =
			// 	this.dateTime +
			// 	' ' +
			// 	this.startH +
			// 	':' +
			// 	this.startM +
			// 	':' +
			// 	this.startS;
			// let endDay =
			// 	this.dateTime +
			// 	' ' +
			// 	this.endH +
			// 	':' +
			// 	this.endM +
			// 	':' +
			// 	this.endS;
			//导出一个月的所有订单
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误'
				});
				return false;
			}
			await http.exportManyShopsOrderStat({
				data: {
					brandId: this.userData.currentShop.id,
					taskId: this.taskId,
					type: 7,
					shopInfo: JSON.stringify(this.shopInfo),
					format: 'csv'
				}
			});
		},
		getSelectShopList: function(res) {
			this.transmitId=res;
			let selectNameStr = '';
			for(let i=0;i<this.postSelectShopList.length;i++){
				if(this.transmitId.includes(this.postSelectShopList[i].id)){
					this.postSelectShopList[i].selected=true;
					selectNameStr = selectNameStr + this.postSelectShopList[i].name + ',';
				}else {
					this.postSelectShopList[i].selected=false;
				}
			}
			this.shopIds=res.join(',');
			this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
		},
		getTakeawayType: function(res) {
			this.selectTypeNum = res;
		}
	},
	destroyed() {
		clearInterval(window.timer);
	},
	mounted() {
		this.initBtn();
		let userData = storage.session('userShop');
		let dataDetial = storage.session('brandorderDetial'); //获取时间戳和营业时间按钮，为从多日返回到品牌
		let orderTakeaway = storage.session('takeoutBrand');

		let selectShopList = storage.session('shopList');
		for (let i = 0; i < selectShopList.length; i++) {
			selectShopList[i].selected = true;
		}
		let shopIds = '';
		let selectName = '';
		//对选择的店铺进行操作，如果从返回后得到数据和刚开始进入处理结果不同
		if (dataDetial) {
			selectShopList = dataDetial.selectShopList;
		}
		let postSelectShopList = [];
		selectShopList.forEach(item => {
			let obj = {
				id: item.id,
				name: item.shopName,
				selected: item.selected
			};
			postSelectShopList.push(obj);
		});
		this.transmitId=selectShopList.map((v)=>{//传递给选择店铺页面的id
			return v.id
		});
		//选择的店铺id转化为字符串
		for (let i = 0; i < selectShopList.length; i++) {
			if (selectShopList[i].selected == true) {
				shopIds = shopIds + selectShopList[i].id + ',';
				selectName = selectName + selectShopList[i].shopName + ',';
			}
		}
		//切割拼接店铺id的字符串
		let end = shopIds.split('').length;
		if (shopIds !== '') {
			shopIds = shopIds.substring(0, end - 1);
		}
		this.startTime = dataDetial
			? dataDetial.startTime
			: orderTakeaway
				? orderTakeaway.startTime
				: new Date().setHours(0, 0, 0, 0);
		this.endTime = dataDetial
			? dataDetial.endTime
			: orderTakeaway
				? orderTakeaway.endTime
				: new Date().setHours(23, 59, 59, 999);
		// this.newStartTime = dataDetial
		// 	? dataDetial.startTime
		// 	: orderTakeaway
		// 		? orderTakeaway.startTime
		// 		: new Date().setHours(0, 0, 0, 0);
		// this.newEndTime = dataDetial
		// 	? dataDetial.endTime
		// 	: orderTakeaway
		// 		? orderTakeaway.endTime
		// 		: new Date().setHours(23, 59, 59, 999);
		this.isOpenTime = dataDetial
			? dataDetial.isOpenTime
			: orderTakeaway ? orderTakeaway.isOpenTime : true;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.userData = userData;
		this.selectShopList = dataDetial
			? dataDetial.selectShopList
			: selectShopList;
		this.postSelectShopList = postSelectShopList;
		this.selectTypeNum = dataDetial ? dataDetial.type : '';
		this.shopIds = shopIds;
		this.selectName = selectName == '' ? '请选择店铺' : selectName;
		if (this.selectShopList.length == 0) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '没有可选店铺'
			});
			return;
		}
		// this.startObj = { time: this.startTime };
		// this.endObj = { time: this.endTime };
		if (userData.currentShop.ischain !== '3') {
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
			return;
		}
		this.init();
		sessionStorage.removeItem('brandorderDetial');
		sessionStorage.removeItem('takeoutBrand');
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		// selectstore: () =>
		// 	import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		// selectBtn: () =>
		// 	import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		// detailsDes: () =>
		// 	import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		elShopList: () =>
			import(/*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	}
};
</script>
<style lang="less" scoped>

#statistics-order .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}


.button a {
	display: inline-block;
	width: 100px;
	height: 40px;
	color: orange;
	text-align: center;
	line-height: 40px;
	border: 1px solid orange;
	margin-bottom: 10px;
}

.button a.select {
	background: orange;
	color: #fff;
}
</style>