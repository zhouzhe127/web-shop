<template>
	<div id="sta-ban" style="padding-top:20px;" v-cloak>
		<div class="button">
			<a href="javascript:void(0);" class="select">堂吃</a>
			<a v-on:click="toTakeout" href="javascript:void(0);">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<!--总览订单页面显示日期-->
		<div class="order-order-data">
			<ul>
				<!--日期选择和搜索框-->
				<section class="fl">
					<el-date-picker :clearable="false" v-model="startTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
					<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
					<el-date-picker :clearable="false" v-model="endTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
				</section>

				<li style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li>
				<div style="display:inline-block;">
					<li>
						<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
					</li>

					<el-button v-on:click="sreachOrderInDays()" type="primary">搜索</el-button>
					<el-button v-on:click="resetting()" type="info">重置</el-button>
					<!-- <a class="fl yellow" v-on:click="sreachOrderInDays()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 10px;">搜索</a>
					<a class="fl gray" v-on:click="resetting()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 10px;">重置</a> -->
				</div>
			</ul>
		</div>
		<section style="width:100%;height:auto;line-height:20px;overflow: hidden;margin-top:10px">
			<section style="width: 80px;height: 20px;line-height: 20px;float: left;">选择店铺：</section>
			<section style="line-height: 20px;float: left;">{{selectName}}</section>
		</section>
		<div v-if="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div>
		<section v-if="loading" class="allBox">
			<el-table stripe :row-style="{color:'#f8941f'}" :header-cell-style="{'background-color':'#f5f7fa'}" @header-click="headClick" :data="newpayTotalNum" border style="width: 100%">
				<el-table-column width="250" align="center" prop="totalDay" label="天数"></el-table-column>
				<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="商品总数"></el-table-column>
				<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="salesNum" label="销量"></el-table-column>
				<el-table-column min-width="100" show-overflow-tooltip align="center" prop="returnNum" label="退品总数"></el-table-column>
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="returnPrice" label="退品总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.returnPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="discountPrice" label="优惠总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.discountPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" align="center" show-overflow-tooltip prop="orderNum" label="代金券">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.cashCoupon.price).toFixed(2) +'('+scope.row.cashCoupon.num+'张)'}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" align="center" show-overflow-tooltip prop="profit" label="利润">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.profit).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<template v-for='(item,index) in paymentList'>
					<el-table-column min-width="120" show-overflow-tooltip :key="index" align="center" :label="item.paymentName">
						<template slot-scope="scope">
							<span>{{parseFloat(paymentList[index].num).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</template>
				<el-table-column min-width="100" align="center" show-overflow-tooltip prop="chargePrice" label="服务费">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.chargePrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="100" align="center" show-overflow-tooltip prop="change" label="找零">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.change).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="100" align="center" show-overflow-tooltip prop="bitPrice" label="系统取整">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.bitPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="originalPrice" label="消费总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.originalPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="paidTotalPrice" label="实收总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.paidTotalPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="paymentPrice" label="入账总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.paymentPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" align="center" prop="memberRecharge" label="会员充值">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.memberRecharge).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="settlePrice" label="挂账结清金额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.settlePrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
			</el-table>
			<section style="margin-top:20px;">
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="lists" border style="width: 100%">
					<el-table-column fixed width="250" align="center" prop="shopName" label="店铺名称">
						<template slot-scope="scope">
							<span style="color:#00AAE7;cursor: pointer;" v-on:click="openDayDetial(scope.row)">{{scope.row.shopName}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
					<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="商品总数"></el-table-column>
					<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="salesNum" label="销量"></el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="returnNum" label="退品数"></el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="returnPrice" label="退品总额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.returnPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="discountPrice" label="优惠金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.discountPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" align="center" show-overflow-tooltip prop="orderNum" label="代金券">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.cashCoupon.price).toFixed(2) +'('+scope.row.cashCoupon.num+'张)'}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" align="center" show-overflow-tooltip prop="profit" label="利润">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.profit).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<template v-for='(item,index) in paymentList'>
						<el-table-column min-width="120" show-overflow-tooltip :key="index" align="center" :label="item.paymentName">
							<template slot-scope="scope">
								<span>{{parseFloat(scope.row.payLists[index].num).toFixed(2)}}</span>
							</template>
						</el-table-column>
					</template>

					<el-table-column min-width="100" align="center" show-overflow-tooltip prop="chargePrice" label="服务费">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.chargePrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="100" align="center" show-overflow-tooltip prop="change" label="找零">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.change).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="100" align="center" show-overflow-tooltip prop="bitPrice" label="系统取整">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.bitPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="originalPrice" label="消费总额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.originalPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="paidTotalPrice" label="实收总额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.paidTotalPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="paymentPrice" label="入账总额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.paymentPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" align="center" prop="memberRecharge" label="会员充值">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.memberRecharge).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="settlePrice" label="挂账结清金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.settlePrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</section>

		</section>
		<!--分页-->
		<div style="margin:20px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="currentPage" :page-count="totalNum" :page-size="num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
			<!-- <pageElement @pageNum="pageClick" :page="currentPage" :total="totalNum" :num="num" :isNoJump='true'></pageElement> -->
		</div>
		<order-win :payTotalNum="payTotalNum" :title="title" v-if="preferentialBounced" @toClick="whetherToclick"></order-win>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			userData: null,
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			orderListInDays: [], //时间段内每天的订单列表
			payTotalNum: {
				orderNum: 0,
				person: 0,
				goodsNum: 0,
				salesNum: 0,
				returnNum: 0,
				returnPrice: 0,
				discountPrice: 0,
				profit: 0,
				chargePrice: 0,
				paymentList: [{ num: 0, paymentName: '' }],
				change: 0,
				bitPrice: 0,
				originalPrice: 0,
				waitPrice: 0,
				paidTotalPrice: 0,
				paymentPrice: 0,
				memberRecharge: 0
			}, //当天或者多天的数据总和  要给默认值，防止初始还未请求完数据就报错或者不显示
			newpayTotalNum: [],
			exportUrl: 'javascript:void(0);',
			isOpenTime: '', //是否按营业时间，默认 false 0 否

			startH: '', //开始时
			startM: '', //开始分
			startS: '', //开始秒
			endH: '', //结束时
			endM: '', //结束分
			endS: '', //结束秒
			isBrand: null,
			selectName: null,
			// shopListBtn: false, //店铺列表显示隐藏
			selectShopList: null,
			postSelectShopList: null,
			shopIds: null, //选择查看的店铺的id
			taskId: '', //传给后台请求数据的一个字段
			// allTrue: true, //选择门店的全部选择按钮是否选中状态
			agwge: true, //防止请求中连续点多次请求
			loading: true, //请求页面中
			repeat: true, //防止多次搜索 重复轮询
			// countList: [{ name: 10 }, { name: 50 }],
			// paginationList: [],
			num: 10, //每页显示数
			currentPage: 1, //第几页
			preferentialBounced: false, //优惠弹框
			// startObj: {},
			// endObj: {},
			transmitId: [], //传递给选择店铺页面的id

			paymentList: [{ num: 0, paymentName: '' }]
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
	mounted() {
		this.initBtn();
		let dataDetial = storage.session('brandorderDetial'); //获取时间戳和营业时间按钮，为从多日返回到品牌
		let orderTakeaway = storage.session('orderBrand');
		this.userData = storage.session('userShop');
		if (this.userData.currentShop.ischain !== '3') {
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
			return;
		}
		let selectShopList = storage.session('shopList');
		for (let i = 0; i < selectShopList.length; i++) {
			selectShopList[i].selected = true;
		}
		let shopIds = ''; //选中的店铺id
		let selectName = ''; //选中的店铺名称
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
		this.postSelectShopList = postSelectShopList;
		this.transmitId = selectShopList.map(v => {
			//传递给选择店铺页面的id
			return v.id;
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
		this.shopIds = shopIds;
		this.selectName = selectName == '' ? '请选择店铺' : selectName;

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
		this.isOpenTime = dataDetial
			? dataDetial.isOpenTime
			: orderTakeaway ? orderTakeaway.isOpenTime : true;
		this.isBrand = this.userData.currentShop.ischain == '3' ? true : false;
		this.selectShopList = dataDetial
			? dataDetial.selectShopList
			: selectShopList;
		if (this.selectShopList.length == 0) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '没有可选店铺'
			});
			return;
		}
		this.init();
		sessionStorage.removeItem('brandorderDetial');
		sessionStorage.removeItem('orderBrand');
	},
	methods: {
		renderHeader(h, { column}) {
			let titleName = '';
			let label = column.label;
			let property = column.property;
			if (label == '商品总数' && property == 'goodsNum') {
				titleName =
					'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			} else if (label == '销量' && property == 'salesNum') {
				titleName =
					'该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量';
			} else if (label == '优惠总额' && property == 'discountPrice') {
				return h('div', [
					h('span', {}, column.label),
					// h("el-popover", {}, [
					h('span', {
						class: 'el-icon-document',
						slot: 'reference',
						style: 'font-size: 18px;margin-left:5px;'
					})
					// ])
				]);
			} else if (label == '优惠金额' && property == 'discountPrice') {
				titleName = '该店铺所有的优惠金额总计';
			} else if (label == '消费总额' && property == 'originalPrice') {
				titleName = '该时段内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '入账总额' && property == 'paymentPrice') {
				titleName =
					'该时间段中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '会员充值' && property == 'memberRecharge') {
				titleName = '该时段内会员充值总计(不计入消费总额及入账总额中)';
			} else {
				// titleName = ''
			}
			return h('div', [
				h('span', {}, column.label),
				h(
					'el-popover',
					{
						attrs: {
							effect: 'dark',
							content: titleName,
							placement: 'bottom',
							width: '300'
						}
					},
					[
						h('span', {
							class: 'el-icon-question',
							slot: 'reference',
							style: 'font-size: 18px;margin-left:5px;'
							// title:"标题",
						})
					]
				)
			]);
			// return h('span',{},[
			// 			h('span',{},column.label),
			// 			h('span', {
			// 				class: 'under-line del',
			// 				style: 'color: #FD3E1F;cursor:pointer',
			// 				// on: {
			// 				// 	click: this.abc(column)
			// 				// }
			// 			},'删除')
			// 		]);
		},
		headClick(column) {
			if (
				column.label == '优惠总额' &&
				column.property == 'discountPrice'
			) {
				this.openDiscount(this.payTotalNum);
			}
		},
		initBtn() {
			let arr = [
				{
					name: '导出',
					type: 4,className: 'primary',
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
		numChange(e) {
			this.num = e;
			this.currentPage = 1;
		},
		//到外卖界面
		toTakeout: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'takeoutBrand', //外卖的关键表示
				startTime: new Date(this.startTime).getTime(),
				endTime: new Date(this.endTime).getTime(),
				isOpenTime: this.isOpenTime
			};
			storage.session('takeoutBrand', detial);
			this.$router.push({
				path: '/admin/orderStatistics/takeawayBrand',
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
			this.isOpenTime = true;
			this.selectName = '';
			this.shopIds = '';
			for (let i = 0; i < this.selectShopList.length; i++) {
				this.selectShopList[i].selected = true;
				this.selectName =
					this.selectName + this.selectShopList[i].shopName + ',';
				this.shopIds = this.shopIds + this.selectShopList[i].id + ',';
			}
			//切割拼接店铺id的字符串
			let end = this.shopIds.split('').length;
			if (this.shopIds !== '') {
				this.shopIds = this.shopIds.substring(0, end - 1);
			}
			this.transmitId = this.selectShopList.map(v => {
				return v.id;
			});
			this.getOrderListInDays();
		},
		//获取时间段内 订单列表
		async getOrderListInDays() {
			if (!this.repeat) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content:
						'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
				});
				return false;
			}
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
			//从后台获取数据
			let res = await http.OrderReport({
				data: {
					trueShopId: this.userData.currentShop.id,
					type: '1',
					timeType: '1',
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					shopIds: this.shopIds
				}
			});
			this.loading = false;
			this.repeat = false;
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
					this.repeat = true;
					if (data.status == 2) {
						this.$store.commit('setWin', {
							title: '操作提示',
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
						this.repeat = false;
					}
					if (timeNum > 60) {
						this.agwge = false;
						this.$store.commit('setWin', {
							title: '操作提示',
							content: '请求失败，请重试！'
						});
						clearInterval(window.timer);
					}
				}, 1000);
				if (this.agwge == false) {
					clearInterval(window.timer);
				}
			}
		},
		async getrrrrrr(taskId) {
			let res = await http.reportGet({
				data: {
					trueShopId: this.userData.currentShop.id,
					taskId: taskId,
					type: 1
				}
			});
			let itemTotle = {};
			this.newpayTotalNum = [];
			if (res.length == 0) {
				this.orderListInDays = [];
				itemTotle = {
					orderNum: 0,
					person: 0,
					goodsNum: 0,
					salesNum: 0,
					returnNum: 0,
					returnPrice: 0,
					discountPrice: 0,
					profit: 0,
					chargePrice: 0,
					paymentList: [{ num: 0, paymentName: '' }],
					change: 0,
					bitPrice: 0,
					originalPrice: 0,
					waitPrice: 0,
					paidTotalPrice: 0,
					paymentPrice: 0,
					memberRecharge: 0,
					settlePrice: 0
				};
				itemTotle.discountList = { order: [], coupon: [] };
				return;
			}

			itemTotle = res.total;
			itemTotle.discountList = { order: [], coupon: [] };
			let paymentList = [];
			for (let m = 0; m < itemTotle.paymentList.length; m++) {
				if (itemTotle.paymentList[m].num > 0) {
					paymentList.push(itemTotle.paymentList[m]);
				}
			}
			for (let i = 0; i < res.shops.length; i++) {
				this.$set(res.shops[i], 'payLists', []);
				if (res.shops[i].discountList) {
					for (
						let k = 0;
						k < res.shops[i].discountList.order.length;
						k++
					) {
						itemTotle.discountList.order.push(
							res.shops[i].discountList.order[k]
						);
					}
					for (
						let k = 0;
						k < res.shops[i].discountList.coupon.length;
						k++
					) {
						itemTotle.discountList.coupon.push(
							res.shops[i].discountList.coupon[k]
						);
					}
					for (let m = 0; m < paymentList.length; m++) {
						for (
							let j = 0;
							j < res.shops[i].paymentList.length;
							j++
						) {
							let payitem = res.shops[i].paymentList[j];
							if (
								payitem.paymentName ==
								paymentList[m].paymentName
							) {
								res.shops[i].payLists.push(payitem);
							}
						}
					}
				}
			}
			this.orderListInDays = res.shops;
			// this.setPage();
			itemTotle.paymentList = paymentList;
			this.paymentList = paymentList;
			this.newpayTotalNum.push(itemTotle);
			this.payTotalNum = itemTotle;
		},
		//导出订单
		async exportOrder() {
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
			await http.exportReport({
				data: {
					trueShopId: this.userData.currentShop.id,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.isOpenTime),
					taskId: this.taskId
				}
			});
		},
		toFloatStr: function(num) {
			let str = num + '';
			return utils.toFloatStr(str, 2);
		},
		//通过多天的查看详情进入当天页面
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
				shopId: item.id
			};
			storage.session('brandDetial', dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		//查看优惠点击
		openDiscount: function() {
			if (this.payTotalNum.discountList == null) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有优惠信息!'
				});
				return false;
			}
			if (
				this.payTotalNum.discountList.coupon.length == 0 &&
				this.payTotalNum.discountList.order.length == 0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有优惠信息!'
				});
				return false;
			}
			this.preferentialBounced = true;
			this.title = '优惠详情';
		},
		whetherToclick: function(res) {
			if (res) {
				this.preferentialBounced = false;
			}
		},
		//选择店铺返回
		getSelectShopList: function(res) {
			console.log(this.postSelectShopList);
			this.transmitId = res;
			let selectNameStr = '';
			for (let i = 0; i < this.postSelectShopList.length; i++) {
				if (this.transmitId.includes(this.postSelectShopList[i].id)) {
					this.postSelectShopList[i].selected = true;
					selectNameStr =
						selectNameStr + this.postSelectShopList[i].name + ',';
				} else {
					this.postSelectShopList[i].selected = false;
				}
			}
			this.shopIds = res.join(',');
			this.selectName =
				selectNameStr == '' ? '请选择店铺' : selectNameStr;
		}
	},
	destroyed() {
		clearInterval(window.timer);
	},
	components: {
		// calendar: () =>
		// 	import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		orderWin: () =>
			import(/*webpackChunkName: "order_win"*/ 'src/module/statistics/order_win'),
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
.order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 46px;
}

.allBox {
	width: 100%;
	height: auto;
	position: relative;
	box-shadow: 7px 7px 15px #ccc;
	// border-bottom: 1px solid #d2d2d2;
	// border-top: 1px solid #d2d2d2;
}

#sta-ban .selected {
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