<template>
	<div id="statistics-order" style="padding-top:20px;" v-cloak>
		<div class="button">
			<a v-on:click="toOrder" href="javascript:void(0);">堂吃</a>
			<a href="javascript:void(0);" class="select">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<!--总览订单页面显示日期-->
		<div class="order-order-data">
			<ul>
				<!--日期选择和搜索框-->
				<section class="tableListInp" style="display:inline-block;">
					<calendar :pObj="startObj" @throwTime="getStartTime"></calendar>
				</section>
				<span style="width: 23px;vertical-align:top;height:40px;line-height: 40px;text-align: center;display:inline-block;">至</span>
				<section class="tableListInp" style="display:inline-block;">
					<calendar :pObj="endObj" @throwTime="getEndTime"></calendar>
				</section>
				<div style="display:inline-block;">
					<li style="line-height: 40px;">
						<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:10px 10px;float: left;"></div>
						<span style="font-size: 16px;">按营业时间</span>
					</li>
					<li style="line-height:40px;">
						<selectstore @emit="getSelectShopList" :sorts="postSelectShopList" :tipName="selectName"></selectstore>
					</li>
				</div>
				<!--外卖类型选择框-->
				<div style="display:inline-block;">
					<li style="line-height:40px;">
						<selectBtn @selOn="getTakeawayType" :sorts="takeawaytypeList" :name="allTakeawaytype"></selectBtn>
					</li>
					<a class="fl blue" v-on:click="sreachOrderInDays()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 20px;">搜索</a>
					<a class="fl gray" v-on:click="resetting()" href="javascript:void(0)" style="width: 80px;height: 40px;line-height: 40px;margin-left: 20px;">重置</a>
				</div>
			</ul>
		</div>
		<section style="width:100%;overflow: hidden;height: auto;line-height:40px;margin-top: 10px;">
			<section style="width: 80px;height: 20px;line-height: 20px;float: left;">选择店铺：</section>
			<section style="height: auto;line-height: 20px;float: left;">{{selectName}}</section>
		</section>
		<div v-if="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</div>
		<section v-if="loading" class="allBox">
			<div class="aLeft">
				<ul class="aUl" style="background-color: #f2f2f2;;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;">
					<li class="aLi" style="width: 100px;"></li>
					<li class="aLi" style="width: 150px;">天数</li>
				</ul>
				<ul class="aUl" style="background-color: #fff;border-bottom: 1px solid #D2D2D2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;">
					<li class="aLi" style="width: 100px;"></li>
					<li class="aLi" style="color: #F8941F;width:150px;">{{payTotalNum.days?payTotalNum.days:"1"}}</li>
				</ul>
				<div style="width:100%;height:50px;text-align: center;line-height: 50px;border-top: 1px solid #d2d2d2;border-left: 1px solid #d2d2d2;margin-top: 30px;">订单统计·共
					<span style="color: red;">{{lists.length}}</span>条记录</div>
				<div>
					<!--时间段里所有订单列表显示 start-->
					<section style="width:100%;overflow: auto;border-left: 1px solid #D2D2D2;">
						<ul class="aUl" style="background-color: #f2f2f2;;box-sizing: border-box;width: 100%;">
							<li class="aLi" style="width: 250px;">店铺名称</li>
						</ul>
						<template v-if="lists.length > 0 " v-for='(item,index) in lists'>
							<ul :key="index" class="aUl" style="background-color: #fff;box-sizing: border-box;width: 100%;border-bottom: 3px solid #F7F7F7;">
								<li style="width:250px;color:#00AAE7;cursor: pointer;" v-on:click="openDayDetial(item)">{{item.shopName}}</li>
							</ul>
						</template>
						<template v-if="lists.length == 0">
							<ul class="" style="height: 80px">
								<li class="width100"></li>
								<!--<li class="width150"></li>-->
							</ul>
						</template>
					</section>
				</div>
			</div>
			<div class="aRight" style="width:100%;height: auto;padding-left: 250px;overflow: auto;">
				<section v-bind:style="{width:showWidth + 'px'}">
					<ul class="aUl" style="background-color: #f2f2f2;;">
						<li class="width70">订单数</li>
						<li class="width100 detLi">商品总数
							<detailsDes :title="'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
						</li>
						<li class="width70 detLi">销量
							<detailsDes :title="'该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
						</li>
						<li class="width70">赠品数</li>
						<li class="width100">配送总额</li>
						<li class="width100">优惠总额</li>
						<li class="width100 detLi">消费总额
							<detailsDes :title="'该时段内所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
						</li>
						<li class="width100 detLi">入账总额
							<detailsDes :title="'该时间段中实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
						</li>
					</ul>
					<!--取出总计数组里面的数据-->
					<ul style="background-color: #fff;border-bottom: 1px solid #D2D2D2;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;border-right: 1px solid #D2D2D2;overflow: hidden;" class="order-content-show">
						<li style="color: #F8941F;" class="width70">{{payTotalNum.orderNum}}</li>
						<li style="color: #F8941F;" class="width100">{{payTotalNum.totalNum}}</li>
						<li style="color: #F8941F;" class="width70">{{payTotalNum.goodsNum}}</li>
						<li style="color: #F8941F;" class="width70">{{payTotalNum.discountNum}}</li>
						<li style="color: #F8941F;" class="width100">{{(payTotalNum.deliverFee).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{(payTotalNum.activityFee).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{(payTotalNum.goodsTotalPrice).toFixed(2)}}</li>
						<li style="color: #F8941F;" class="width100">{{(payTotalNum.income).toFixed(2)}}</li>
					</ul>
				</section>
				<!--总的列表-->
				<div v-bind:style="{width:showWidth + 'px'}">
					<section style="width:100%;overflow: auto;min-height: 130px;">
						<div style="width:100%;height:50px;text-align: center;line-height: 50px;border-top: 1px solid #d2d2d2;margin-top: 30px;"></div>
						<!--时间段里所有订单列表显示 start-->
						<ul style="background-color: #f2f2f2;;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;">
							<li class="width70">订单数</li>
							<li class="width100 detLi">商品总数
								<detailsDes :title="'该日商品总数包含了订单中所有的商品数量（包括赠品和退品）'"></detailsDes>
							</li>
							<li class="width70 detLi">销量
								<detailsDes :title="'该日已销售的数量（不包含退品数）公式：商品总数-退品数=销量'"></detailsDes>
							</li>
							<li class="width70">赠品数</li>
							<li class="width100">配送金额</li>
							<li class="width100 detLi">优惠总额
								<detailsDes :title="'该日所有的优惠金额总计'"></detailsDes>
							</li>
							<li class="width100 detLi">消费总额
								<detailsDes :title="'该日所有商品原价的金额总计（不计入退品金额）'"></detailsDes>
							</li>
							<li class="width100 detLi">入账金额
								<detailsDes :title="'该日实际收入的金额（不计入未入实账的支付方式的金额）'"></detailsDes>
							</li>
						</ul>
						<!--订单列表存在数据就显示-->
						<template v-if="lists.length > 0 ">
							<template v-for='(item,index) in lists'>
								<ul :key="index" style="background-color: #fff;border-left: 1px solid #D2D2D2;box-sizing: border-box;width: 100%;border-bottom: 3px solid #F7F7F7;overflow: hidden;">
									<li class="width70">{{item.orderNum}}</li>
									<li class="width100">{{item.totalNum}}</li>
									<li class="width70">{{item.goodsNum}}</li>
									<li class="width70">{{item.discountNum}}</li>
									<li class="width100">{{(item.deliverFee).toFixed(2)}}</li>
									<li class="width100">{{(item.activityFee).toFixed(2)}}</li>
									<li class="width100">{{(item.goodsTotalPrice).toFixed(2)}}</li>
									<li class="width100">{{(item.income).toFixed(2)}}</li>
								</ul>
							</template>
						</template>
						<ul v-else style="width:100%;height: 80px;">
							<li style="color:orange; text-align:left;width: 100%;padding-left:200px ;">该时间段并没有订单数据</li>
						</ul>
					</section>
				</div>
			</div>
		</section>
		<!--分页-->
		<div style="float: left;margin-left: 30px;margin-top:20px;">
			<pageElement @pageNum="pageClick" :page="currentPage" :total="totalNum" :num="num" :isNoJump='true'></pageElement>
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
			startTime: '', //日期组件的开始时间
			endTime: '', //日期组件的结束时间
			newStartTime: '', //点击日历组件获取的开始时间
			newEndTime: '', //点击日历组件获取的结束时间
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
			showWidth: 1378, //长度
			payLsZero: false, //所有的支付方式是否显示
			exportUrl: 'javascript:void(0);',
			dateTime: [], //要查询的日期 导入和打印使用
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			startH: '', //开始时
			startM: '', //开始分
			startS: '', //开始秒
			endH: '', //结束时
			endM: '', //结束分
			endS: '', //结束秒
			isBrand: '',
			selectName: '',
			shopListBtn: false, //店铺列表显示隐藏
			selectShopList: null,
			postSelectShopList: null,
			shopIds: '', //选择查看的店铺的id
			taskId: '', //传给后台请求数据的一个字段
			allTrue: true, //选择门店的全部选择按钮是否选中状态
			agwge: true, //防止请求中连续点多次请求
			loading: true, //请求页面中
			takeawaytypeList: ['全部', '饿了么', '美团', '百度外卖'], //外卖类型
			allTakeawaytype: '请选择类型',
			takeawaytypeBtn: false,
			countList: [{ name: 10 }, { name: 50 }],
			paginationList: [],
			page: 0,
			num: 10,
			total: 1,
			currentPage: 1,
			shopInfo: null,
			selectTypeNum: null,
			startObj: {},
			endObj: {}
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
			this.currentPage = e.page;
			this.num = e.num;
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
		//店铺选择显示隐藏
		openShop: function(e) {
			e.stopPropagation();
			this.shopListBtn = !this.shopListBtn;
		},
		// //点击说明详情
		// openDetial:function(index,type,e){
		//     e.stopPropagation();
		//     for(let i=0;i<this.orderAll.length;i++){
		//         if (i != index || this.orderAll[i].type !=type) {
		//             this.orderAll[i].status = false;
		//         }
		//     }
		//     this.orderAll[index].type = type;
		//     this.orderAll[index].status = !this.orderAll[index].status;
		// },
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.newEndTime - this.newStartTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.newStartTime / 1000) -
					parseInt(this.newEndTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误'
				});
				return false;
			}
			this.startTime = this.newStartTime;
			this.endTime = this.newEndTime;
			this.getOrderListInDays();
		},
		//重置
		resetting: function() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.startObj = { time: this.startTime };
			this.endObj = { time: this.endTime };
			this.isOpenTime = true;
			this.selectName = '';
			this.allTakeawaytype = '请选择类型';
			this.selectTypeNum = 0;
			for (let i = 0; i < this.selectShopList.length; i++) {
				this.selectShopList[i].selected = true;
				this.selectName =
					this.selectName + this.selectShopList[i].shopName + ',';
			}
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
			let startTime = new Date(this.startTime);
			let endTime = new Date(this.endTime);
			this.startH = utils.format(startTime, 'hh');
			this.startM = utils.format(startTime, 'mm');
			this.startS = utils.format(startTime, 'ss');
			this.endH = utils.format(endTime, 'hh');
			this.endM = utils.format(endTime, 'mm');
			this.endS = utils.format(endTime, 'ss');
			let timeNum = 0; //限制请求次数
			if (this.selectTypeNum == undefined) {
				this.selectTypeNum = 0;
			}
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
			let res = await http.getOrderManyShopsStat({
				data: {
					taskId: taskId,
					type: 7,
					brandId: this.userData.currentShop.id
				}
			});
			if (res.length == 0) {
				this.orderListInDays = [];
				this.payTotalNum.discountList = { order: [], coupon: [] };
				return;
			}
			this.orderListInDays = res.list;
			// console.log(this.orderListInDays);
			this.payTotalNum = res.total;
			// console.log(this.payTotalNum)
			this.payTotalNum.discountList = { order: [], coupon: [] };
			for (let i = 0; i < res.list.length; i++) {
				if (res.list[i].discountList) {
					for (
						let k = 0;
						k < res.list[i].discountList.order.length;
						k++
					) {
						this.payTotalNum.discountList.order.push(
							res.list[i].discountList.order[k]
						);
					}
					for (
						let k = 0;
						k < res.list[i].discountList.coupon.length;
						k++
					) {
						this.payTotalNum.discountList.coupon.push(
							res.list[i].discountList.coupon[k]
						);
					}
				}
			}
			let shopInfo = {};
			for (let i = 0; i < this.orderListInDays.length; i++) {
				for (let j = 0; j < this.selectShopList.length; j++) {
					if (
						this.selectShopList[j].id ==
						this.orderListInDays[i].shopId
					) {
						this.orderListInDays[i].shopName = this.selectShopList[
							j
						].shopName;

						shopInfo[
							this.selectShopList[j].id
						] = this.orderListInDays[i].shopName;
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
			this.postSelectShopList = res;
			let shopIdsStr = '';
			let selectNameStr = '';
			for (let i = 0; i < res.length; i++) {
				if (res[i].selected == true) {
					shopIdsStr = shopIdsStr + res[i].id + ',';
					selectNameStr = selectNameStr + res[i].name + ',';
				}
			}
			let shopIdsStrEnd = shopIdsStr.split('').length;
			if (shopIdsStr !== '') {
				shopIdsStr = shopIdsStr.substring(0, shopIdsStrEnd - 1);
			}
			this.shopIds = shopIdsStr;
			this.selectName =
				selectNameStr == '' ? '请选择店铺' : selectNameStr;
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
		this.newStartTime = dataDetial
			? dataDetial.startTime
			: orderTakeaway
				? orderTakeaway.startTime
				: new Date().setHours(0, 0, 0, 0);
		this.newEndTime = dataDetial
			? dataDetial.endTime
			: orderTakeaway
				? orderTakeaway.endTime
				: new Date().setHours(23, 59, 59, 999);
		this.isOpenTime = dataDetial
			? dataDetial.isOpenTime
			: orderTakeaway ? orderTakeaway.isOpenTime : true;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.userData = userData;
		this.selectShopList = dataDetial
			? dataDetial.selectShopList
			: selectShopList;
		this.postSelectShopList = postSelectShopList;
		this.selectTypeNum = dataDetial ? dataDetial.type : null;
		this.shopIds = shopIds;
		this.selectName = selectName == '' ? '请选择店铺' : selectName;
		if (this.selectShopList.length == 0) {
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '没有可选店铺'
			});
			return;
		}
		this.startObj = { time: this.startTime };
		this.endObj = { time: this.endTime };
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
		selectstore: () =>
			import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		detailsDes: () =>
			import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>
<style lang="less" scoped>
.order-order-data {
	/*height: 80px;*/
	display: inline-block;
}

.order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 40px;
}

.order-order-data ul li span input {
	width: 174px;
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
	float: left;
}

.detLi {
	position: relative;
	cursor: pointer;
}

.detLi .detImg {
	position: absolute;
	right: 40px;
	top: 15px;
}

.detLi .detDiv {
	width: 250px;
	height: 80px;
	position: absolute;
	top: 45px;
	right: 20px;
	padding: 10px;
	box-shadow: 3px 2px 10px #ccc;
	z-index: 15;
	background-color: #45404b;
}

.detLi .detDiv .detI {
	width: 0;
	height: 0;
	line-height: 0;
	position: absolute;
	top: -10px;
	right: 20px;
	border-width: 10px;
	border-top: 0px;
	border-style: solid;
	border-color: #e6e6e6 #e6e6e6 #45404b #e6e6e6;
}

.detLi .detDiv .detH3 {
	height: 30px;
	line-height: 30px;
	color: #818181;
	text-align: left;
	color: #e6e6e7;
}
.width70 {
	width: 150px;
}

.width100 {
	width: 180px;
}

.width150 {
	width: 150px;
}

.width200 {
	width: 200px;
}

#statistics-order .tableListInp {
	color: #666666;
	height: 43px;
	cursor: pointer;
	box-sizing: border-box;
}

#statistics-order .tableListInp .calendar-ctr {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
	/*border: #b3b3b3 solid 1px;*/
	border-left: #b3b3b3 solid 1px;
}

#statistics-order .tableListInp div i {
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

#statistics-order .statisticsList {
	position: relative;
	line-height: 41px;
}

/* #statistics-order .statisticsList input {
		text-align: center;
		display: block;
		float: left;
		height: 41px;
		width: 158px;
		outline: none;
		border: 0;
	} */

.tableName {
	width: 47px;
	height: 40px;
	line-height: 40px;
	float: left;
	font-size: 16px;
	text-align: center;
}

#statistics-order .statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#statistics-order .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#statistics-order .overHid {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

#statistics-order .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}

#statistics-order .staList {
	position: relative;
	line-height: 41px;
	width: 143px;
}

#statistics-order .staList .tableListUl {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 10;
	background: #fff;
	max-height: 300px;
	overflow: auto;
	border-top: 0;
}

#statistics-order .staList .tableListUl .tableListLi {
	text-align: center;
	height: 41px;
	border: 1px #ccc solid;
	background: #fff;
	cursor: pointer;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 0 !important;
}

#statistics-order .staList .tableListUl .tableListLi:last-of-type {
	border-bottom: 0;
}

#statistics-order .tableList {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
}

#statistics-order .tableList .oSpan {
	height: 39px;
	line-height: 39px;
	width: 100px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px solid #b3b3b3;
	overflow: hidden;
}

#statistics-order .tableList div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}

#statistics-order .tableList div i {
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

.shoName {
	height: 40px;
	line-height: 40px;
	border: 1px solid #f2f2f2;
	float: left;
	margin: 5px;
	color: #fff;
	padding: 0 10px;
}

/*.shoName-select{border-color: #FF9800;background: url(http://192.168.31.185:8020/release-svn/shop/src/res/images/sign.png?18274) right bottom no-repeat;}*/

.shoName-select {
	border-color: #ff9800;
	background: url(../../res/images/sign.png) right bottom no-repeat;
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

.paging-infor {
	width: 160px;
	height: 45px;
	margin-top: 30px;
	margin-bottom: 50px;
	line-height: 45px;
	float: left;
}

.paging-infor span {
	float: left;
}

.paging-box {
	position: relative;
}

.paging-box select {
	width: 50px;
	height: 35px;
	font-size: 18px;
	margin: 5px;
	cursor: pointer;
	float: left;
}

.allBox {
	width: 100%;
	height: auto;
	position: relative;
	box-shadow: 7px 7px 15px #ccc;
	border-bottom: 1px solid #d2d2d2;
	border-top: 1px solid #d2d2d2;
}

.aLeft {
	width: 252px;
	height: auto;
	float: left;
	position: absolute;
	left: 0;
	z-index: 4;
}

ul {
	color: #333333;
	width: 100%;
	height: 50px;
}

ul li {
	float: left;
	height: 50px;
	text-align: center;
	line-height: 50px;
}
</style>