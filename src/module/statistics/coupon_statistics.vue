<template>
	<div id="online-configuration">
		<section v-if="changePage">
			<div class="cupon-time-select clearfix">
				<span class="fl cupon-type">时间选择</span>
				<calendar class="fl" :pObj="startTime" @throwTime="getStartTime"></calendar>
				<span class="fl line">--</span>
				<calendar class="fl" :pObj="endTime" @throwTime="getEndTime"></calendar>
				<span class="fl order-order-searchA" v-on:click="searchInDate">
					<span class="order-order-search"></span>
				</span>
				<span class="fl cupon-type">优惠券类型</span>
				<section class="staList fl detLi">
					<select-store ref="selectStore" :sorts="card" @emit="selectCouponType" :tipName="'请选择优惠券类型'"></select-store>
				</section>
				<div class="fl buttonbox">
					<button @click="handleSearchInDate" class="fl cupon-scret">筛选</button>
					<button @click="initResert" class="fl cupon-reset cupon-reset-btn">重置</button>
				</div>
			</div>
			<div class="cupon-type-list">
				<ul>
					<li>
						<button @click="getSelect(0)" :class="{'cupon-list-btn': isShow0}" class="cupon-scret">全部</button>
					</li>
					<li>
						<button @click="getSelect(2)" :class="{'cupon-list-btn': isShow2}" class="cupon-scret">未关联</button>
					</li>
					<li>
						<button @click="getSelect(1)" :class="{'cupon-list-btn': isShow1}" class="cupon-scret">已关联</button>
					</li>
					<li>
						<button @click="getSelect(3)" :class="{'cupon-list-btn': isShow3}" class="cupon-scret">已过期</button>
					</li>
				</ul>
			</div>
			<div>
				<section>
					<com-table @tableEvent="tableEvent" :listHeight='80' :listName="'优惠券统计'" :showTitle='1' :listWidth="1400" :introData="list" :titleData="titleList" :allTotal="listLen">
						<div slot="con-1" slot-scope="props">
							{{props.data.status | filterStatus}}
						</div>
						<div slot="con-2" slot-scope="props">
							{{props.data.type | filterType}}
						</div>
						<div slot="con-6" @click="handleToCount(props.data.id,props.data.name,props.data.use)" slot-scope="props">
							{{props.data.use}}
						</div>
						<div slot="con-8" slot-scope="props">
							<span v-if="props.data.type == '6'">{{(props.data.couponPrice * props.data.use).toFixed(2)}}</span>
							<span v-else>--</span>
						</div>
						<div slot="con-9" slot-scope="props">
							<span v-if="props.data.type == '6'">{{(props.data.billPrice * props.data.use).toFixed(2)}}</span>
							<span v-else>--</span>
						</div>
						<div slot="con-10" slot-scope="props">
							<span v-if="props.data.type == '6'">{{(props.data.reckoningPrice * props.data.use).toFixed(2)}}</span>
							<span v-else>{{props.data.reckoningPrice}}</span>
						</div>
					</com-table>
				</section>
				<!-- 翻页 -->
				<page style="float: left;margin: 20px 10px 0 50px;" @pageNum="pageNum" :page="page" :total="pageTotal" :len="10" v-if="pageTotal>1"></page>
			</div>
		</section>
		<section v-else>
			<section class="cupon-time-select clearfix">
				<span class="fl cupon-type">时间筛选</span>
				<section class="statisticsList fl">
					<section class="tableListInp">
						<calendar class="fl" :pObj="currstartTime" ref="triggerStartTime" :only="false" :format="'yyyy年MM月dd日'" @throwTime="getCurrStartTime" style="width: 187px;height: 39px;"></calendar>
					</section>
				</section>
				<span style="margin: 0 4px 0 13px;" class="fl">--</span>
				<section class="statisticsList fl">
					<section style="width: 282px;" class="tableListInp">
						<calendar class="fl" :pObj="currendTime" ref="triggerEndTime" :only="false" :format="'yyyy年MM月dd日'" @throwTime="getCurrEndTime" style="width: 187px;height: 39px;"></calendar>
						<span class="order-order-searchA" style="margin-left: 53px;" v-on:click="searchCurrentDate">
							<span class="order-order-search"></span>
						</span>
					</section>
				</section>
				<div style="height:42px;" class="fl">
					<span class="fl cupon-type">选择门店</span>
					<section class="staList fl detLi">
						<section v-if="ischain != 3" class="tableList">
							<span class="oSpan">{{currentName.join(' ')}}</span>
							<div class="fl">
								<i></i>
							</div>
						</section>
						<select-store ref="selectStore1" v-if="ischain==3" :sorts="FilterName" @emit="selectShopType" :tipName="'请选择门店'"></select-store>
					</section>
				</div>
				<div class="fl">
					<button @click="onSelectNuclearSales" class="fl cupon-scret">筛选</button>
					<button @click="handleToResert" class="fl cupon-reset cupon-reset-btn">重置</button>
				</div>
			</section>
			<section class="current-name">
				<div class="current-list-name">
					<span>优惠券名称</span>：
					<span>{{couponName}}</span>
				</div>
				<div class="current-list-store">
					<span>选择门店</span>:
					<span>{{currentName | filterCurrentName}}</span>
				</div>
			</section>
			<section>
				<com-table :listHeight='80' :listName="couponName" :showTitle='1' :listWidth="1400" :introData="currentList" :titleData="coupontitleList" :allTotal="currentTotal">
					<div slot="con-2" slot-scope="props">
						<span v-if="props.data.reckoningPrice != '-' && props.data.reckoningPrice != '-'">{{(props.data.couponPrice * props.data.useCoupon).toFixed(2)}}</span>
						<span v-else>-</span>
					</div>
					<div slot="con-3" slot-scope="props">
						<span v-if="props.data.billPrice != '-'">{{(props.data.billPrice * props.data.useCoupon).toFixed(2)}}</span>
						<span v-else>{{props.data.billPrice}}</span>
					</div>
					<div slot="con-4" slot-scope="props">
						<span v-if="props.data.reckoningPrice != '-'">{{(props.data.reckoningPrice * props.data.useCoupon).toFixed(2)}}</span>
						<span v-else>{{props.data.reckoningPrice}}</span>
					</div>
				</com-table>
			</section>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';

export default {
	data() {
		return {
			startTime: {
				time: utils.getTime({
					time: new Date().setDate(1)
				}).start
			}, //日期组件的开始时间
			endTime: {
				time: utils.getTime({
					time: new Date()
				}).end
			}, //日期组件的结束时间
			//
			currstartTime: {
				time: ''
			}, //核销量日期组件的开始时间
			currendTime: {
				time: ''
			}, //核销量日期组件的结束时间

			list: [], // coupon 数据
			page: 1, // 当前页码
			listLen: 0, // 数据量
			pageTotal: 0, //页码总数
			card: [
				//  优惠券类型
				{
					name: '单品减免',
					selected: true,
					id: 1
				},
				{
					name: '整单减免',
					selected: true,
					id: 2
				},
				{
					name: '单品折扣',
					selected: true,
					id: 3
				},
				{
					name: '整单折扣',
					selected: true,
					id: 4
				},
				{
					name: '赠品',
					selected: true,
					id: 5
				},
				{
					name: '代金券',
					selected: true,
					id: 6
				}
			],
			selectName: [
				'单品减免',
				'整单减免',
				'单品折扣',
				'整单折扣',
				'赠品',
				'代金券'
			], // 默认优惠券
			shopListBtn: false, // 是否展示优惠券列表
			fiterCards: [1, 2, 3, 4, 5, 6], //  优惠券多选
			fiterId: [],
			changePage: true,
			couponType: 0,
			couponStatus: 0,
			couponId: 0,
			shopIds: 0,
			couponName: '', // 多选优惠券名称
			ischain: '', //门店类型
			currentName: [], //  门店种类名称
			currentTotal: 0, //  核销总量
			currentList: [], //  品牌列表
			FilterName: [], //过滤核销量
			isShow0: false, // 判断优惠券状态添加class
			isShow1: true,
			isShow2: true,
			isShow3: true,
			exportUrl: 'javascript:void(0);',
			isBrand: '',
			isClick: false,
			userData: '',
			titleList: [{
				titleName: '优惠券名称',
				dataName: 'name'
			},
			{
				titleName: '状态',
				dataName: 'status'
			},
			{
				titleName: '类型',
				dataName: 'type'
			},
			{
				titleName: '创建时间',
				dataName: 'createTime'
			},
			{
				titleName: '结束时间',
				dataName: 'endTime'
			},
			{
				titleName: '领券量',
				dataName: 'send'
			},
			{
				titleName: '券核销量',
				dataName: 'use',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '券核销率',
				dataName: 'cancelAfterVerification'
			},
			{
				titleName: '券面额'
			},
			{
				titleName: '实收金额'
			},
			{
				titleName: '结算金额'
			}
			],
			coupontitleList: [{
				titleName: '店铺名称',
				dataName: 'shopName'
			},
			{
				titleName: '核销量',
				dataName: 'useCoupon'
			},
			{
				titleName: '券总额'
			},
			{
				titleName: '入账金额'
			},
			{
				titleName: '结算金额'
			}
			]
		};
	},
	methods: {
		tableEvent(currentPage) {
			console.log(currentPage, '');
		},
		selectShopType(val) {
			this.FilterName = val;
			this.currentName = [];
			this.fiterId = [];
			for (let i of this.FilterName) {
				if (i.selected) {
					this.currentName.push(i.name);
					this.fiterId.push(i.id);
				}
			}
		},
		selectCouponType(val) {
			this.card = val;
			this.fiterCards = [];
			for (let i of this.card) {
				if (i.selected) {
					this.fiterCards.push(i.id);
				}
			}
		},
		pageNum(obj) {
			if (this.fiterCards.length == 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '请选择优惠券类型',
					winType: 'alert'
				});
				return false;
			}
			this.page = obj.page;
			let res = {
				start: this.startTime,
				end: this.endTime,
				type: this.fiterCards.join(),
				status: this.couponStatus,
				page: this.page
			};
			this.getCouponData(res);
		},
		getStartTime(receiveTime) {
			this.startTime = {
				time: receiveTime
			};
		},
		getEndTime(receiveTime) {
			this.endTime = {
				time: receiveTime
			};
		},
		getCurrStartTime(receiveTime) {
			this.currstartTime = {
				time: receiveTime
			};
		},
		getCurrEndTime(receiveTime) {
			this.currendTime = {
				time: receiveTime
			};
		},
		async getCouponData(obj) {
			let start = obj.start;
			let end = obj.end;
			let type = obj.type;
			let status = obj.status;
			let page = obj.page;
			start = start.time || start;
			end = end.time || end;
			if (end - start < 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始日期不能大于结束日期',
					winType: 'alert'
				});
				return false;
			}
			if (end - start >= 7776000000) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '时间间隔不能大于三个月',
					winType: 'alert'
				});
				return false;
			}
			if (!global.checkData({
				fiterCards: {
					cond: '$$.length != 0',
					pro: '请选择优惠券类型'
				}
			},
			this
			)) {
				return false;
			}
			let res = await http.getCouponStatisticsData({
				data: {
					startTime: (start / 1000) | 0,
					endTime: (end / 1000) | 0,
					couponType: type, // 6种优惠券类型
					couponStatus: status, // 4种优惠券状态
					page: page,
					num: 10,
					ischain: this.ischain,
					brandId: ''
				}
			});
			this.list = utils.sortByAll(res.list, 'createTime');
			this.listLen = res.count;
			this.pageTotal = res.total;
		},
		async getOneCoupon(start, end, id) {
			// 获取核销量方法
			start = start.time || start;
			end = end.time || end;
			if (!id) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '请选择门店类型',
					winType: 'alert'
				});
				return false;
			}
			if (end - start < 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始日期不能大于结束日期',
					winType: 'alert'
				});
				return false;
			}
			if (end - start >= 7776000000) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '时间间隔不能大于三个月',
					winType: 'alert'
				});
				return false;
			}
			let res = await http.getOneCoupon({
				data: {
					startTime: (start / 1000) | 0,
					endTime: (end / 1000) | 0,
					couponId: this.couponId,
					shopIds: id,
					ischain: this.ischain,
					brandId: ''
				}
			});
			this.currentList = res;
			this.currentTotal = res.length;
		},
		async getToOut() {
			if (this.list.length <= 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '当前没有数据可以导出！',
					winType: 'alert'
				});
				return false;
			}
			http.exportCouponStatics({
				data: {
					startTime: parseInt(this.startTime.time / 1000),
					endTime: parseInt(this.endTime.time / 1000),
					couponType: this.fiterCards.join(),
					couponStatus: this.couponStatus,
					page: this.page,
					num: 10,
					format: 'csv'
				}
			});
		},
		searchInDate() {
			this.isClick = true;
			let stime = this.startTime.time || this.startTime;
			let etime = this.endTime.time || this.endTime;
			this.page = 1;
			let obj = {
				start: stime,
				end: etime,
				type: '1,2,3,4,5,6',
				status: 0,
				page: this.page
			};
			this.getCouponData(obj);
		},
		getSelect(val) {
			if (!this.isClick) {
				return false;
			}
			if (val === 0) {
				this.isShow0 = false;
				this.isShow1 = this.isShow2 = this.isShow3 = true;
			} else if (val === 1) {
				this.isShow1 = false;
				this.isShow0 = this.isShow2 = this.isShow3 = true;
			} else if (val === 2) {
				this.isShow2 = false;
				this.isShow0 = this.isShow1 = this.isShow3 = true;
			} else {
				this.isShow3 = false;
				this.isShow0 = this.isShow1 = this.isShow2 = true;
			}
			this.couponStatus = val;
			this.page = 1;
			let obj = {
				start: this.startTime,
				end: this.endTime,
				type: this.fiterCards.join(),
				status: val,
				page: this.page
			};
			this.getCouponData(obj); // 选择关联商品
		},
		handleToCount(couponId, name, send) {
			//  页面跳转
			if (send == 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '该优惠券暂未领券',
					winType: 'alert'
				});
				return false;
			}
			this.$store.commit('setPageTools', {
				back: () => {
					this.handleToBack();
				}
			});
			this.currentName = [];
			this.couponId = couponId;
			this.couponName = name;
			this.shopListBtn = false;
			this.changePage = !this.changePage;
			this.currentList = [];
			this.currentTotal = 0;
			if (!this.isBrand) {
				//  判断是品牌还是无门店品牌
				this.currentName.push(this.userData.currentShop.name);
			} else if (this.isBrand) {
				this.currentName = [];
				this.fiterId = [];
				for (let i = 0; i < this.shopList.length; i++) {
					this.FilterName.push({
						name: this.shopList[i].name,
						selected: true,
						id: this.shopList[i].id
					}); // 选择展示的核销量name
					this.currentName.push(this.shopList[i].name);
					this.fiterId.push(this.shopList[i].id);
				}
			}
			this.currstartTime.time = this.startTime.time || this.startTime;
			this.currendTime.time = this.endTime.time || this.endTime;

			let start = this.currstartTime.time || this.currstartTime;
			let end = this.currendTime.time || this.currendTime;
			if (!this.isBrand) {
				this.getOneCoupon(start, end, this.userData.currentShop.id);
			} else if (this.isBrand) {
				this.getOneCoupon(start, end, this.fiterId.join());
			}
		},
		handleToBack() {
			this.$store.commit('setPageTools', {
				getToOut: () => {
					this.getToOut();
				}
			});
			this.changePage = !this.changePage;
			this.FilterName = [];
		},
		handleSearchInDate() {
			//  筛选优惠券类型
			this.isClick = true;
			let obj = {
				start: this.startTime,
				end: this.endTime,
				type: this.fiterCards.join(),
				status: this.couponStatus,
				page: 1
			};
			this.getCouponData(obj);
		},
		initResert() {
			// 过滤优惠券类型
			this.startTime = {
				time: utils.getTime({
					time: new Date(),
					type: true
				}).start
			}; //日期组件的开始时间
			this.endTime = {
				time: utils.getTime({
					time: new Date(),
					type: true
				}).end
			}; //日期组件的结束时间
			this.list = [];
			this.page = 1;
			this.shopListBtn = false;
			this.selectName = ['请选择优惠券类型'];
			this.fiterCards = [];
			this.listLen = 0;
			this.pageTotal = 0;
			this.isShow0 = false; // 判断优惠券状态添加class
			this.isShow1 = this.isShow2 = this.isShow3 = true;
			this.couponStatus = 0;
			this.isClick = false;
			for (let i = 0; i < this.card.length; i++) {
				this.card[i].selected = false;
			}
			this.$refs.selectStore.init();
		},
		onSelectNuclearSales() {
			// 核销量选择
			let start = this.currstartTime.time || this.currstartTime;
			let end = this.currendTime.time || this.currendTime;
			if (!this.isBrand) {
				this.getOneCoupon(start, end, this.userData.currentShop.id);
			} else {
				if (this.fiterId.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请选择门店类型',
						winType: 'alert'
					});
					return false;
				}
				this.getOneCoupon(start, end, this.fiterId.join());
			}
		},
		searchCurrentDate() {
			let start = this.currstartTime.time || this.currstartTime;
			let end = this.currendTime.time || this.currendTime;
			if (!this.isBrand) {
				this.getOneCoupon(start, end, this.userData.currentShop.id);
			} else {
				this.getOneCoupon(start, end, this.fiterId.join());
			}
		},
		handleToResert() {
			//  重置核销量
			this.currstartTime = {
				time: utils.getTime({
					time: new Date(),
					type: true
				}).start
			}; //日期组件的开始时间
			this.currendTime = {
				time: utils.getTime({
					time: new Date(),
					type: true
				}).end
			}; //日期组件的结束时间
			this.currentList = [];
			this.currentName = [];
			this.fiterId = [];
			this.FilterName = [];
			this.currentTotal = 0;
			if (!this.isBrand) {
				this.currentName.push(this.userData.currentShop.name);
			} else {
				for (let i = 0; i < this.shopList.length; i++) {
					this.FilterName.push({
						name: this.shopList[i].name,
						selected: false,
						id: this.shopList[i].id
					});
				}
				this.$refs.selectStore1.init();
			}
			this.$refs.selectStore1.init();
		},
		handleClose() {
			this.shopListBtn = false;
		},
		selecToOut() {
			this.getToOut();
		}
	},
	filters: {
		filterStatus: function(value) {
			switch (value) {
				case 0:
					return '全部';
				case 1:
					return '已关联';
				case 2:
					return '未关联';
				case 3:
					return '过期';
				default:
					return '';
			}
		},
		filterType: function(value) {
			switch (Number(value)) {
				case 0:
					return '全部';
				case 1:
					return '单品减免';
				case 2:
					return '整单减免';
				case 3:
					return '单品打折';
				case 4:
					return '整单折扣';
				case 5:
					return '赠品';
				case 6:
					return '代金券';
				default:
					return '';
			}
		},
		filterCurrentName: function(val) {
			if (val[0] === '请选择门店类型') {
				return '';
			}
			return val.join('、');
		}
	},
	mounted() {
		this.$store.commit('setPageTools', {
			getToOut: () => {
				this.getToOut();
			}
		});
		this.userData = storage.session('userShop');
		this.ischain = this.userData.currentShop.ischain;
		if (this.userData.currentShop && this.ischain == 3) {
			//ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}
		if (this.isBrand) {
			this.shopList = this.userData.currentShop.direct.concat(
				this.userData.currentShop.franchise
			); //获取到品牌下面所有店铺信息
		}
		this.searchInDate();
	},
	components: {
		page: () =>
			import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		calendar: () =>
			import ( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		'select-store': () =>
			import ( /*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table')
	}
};
</script>
<style type="text/css" scoped>
#online-configuration {
	min-width: 780px;
	position: relative;
}

.cricle-point {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: #333333;
	margin: 0 10px;
	vertical-align: middle;
}

.back-btn {
	width: 101px;
	height: 42px;
	background: #fff;
	color: RGB(179, 179, 179);
	border: 1px solid RGB(179, 179, 179);
	position: absolute;
	top: -45px;
	right: -100px;
}

.cupon-scret,
.cupon-reset {
	display: block;
	width: 101px;
	height: 42px;
	background-color: rgb(40, 168, 244);
	border: none;
	font-size: 16px;
	color: #fff;
	border-radius: 2px;
	margin-right: 15px;
}

.cupon-scret:hover {
	background: rgb(40, 168, 244);
	color: #fff;
}

.cupon-reset-btn {
	background: rgb(179, 179, 179);
}

.cupon-list-btn {
	color: #000;
	background: rgb(242, 242, 242);
}

.order-order-searchA,
.order-order-search,
.order-order-inquire {
	display: inline-block;
	float: left;
	width: 40px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
}

.lineboder {
	width: 41px;
	height: 41px;
	position: relative;
	z-index: 5;
	/* border: #b3b3b3 solid 1px; */
	border-left: #b3b3b3 solid 1px;
}

.lineboder i {
	height: 10px;
	width: 10px;
	border-top: 10px #b3b3b3 solid;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -5px;
	margin-top: -5px;
	box-sizing: border-box;
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

.selectBtn {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 40px;
	line-height: 49px;
	margin-right: 18px;
}

.cupon-time-select .cupon-type {
	display: block;
	min-width: 85px;
	margin: 0 10px 0 0px;
	font-size: 17px;
}

.cupon-time-select .buttonbox {
	width: 232px;
	height: 42px;
}

.cupon-time-select .line {
	display: block;
	margin: 0 10px 0 10px;
}

#online-configuration .cupon-button {
	position: absolute;
	top: -45px;
	right: -43px;
	width: 101px;
	height: 42px;
	background-color: rgb(40, 168, 244);
	border: none;
	font-size: 16px;
	color: #fff;
	border-radius: 2px;
}

#online-configuration .cupon-header {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: center;
	font-size: 17px;
}

#online-configuration .cupon-time-select {
	width: 100%;
	height: auto;
	/* overflow: hidden; */
	line-height: 40px;
}

#online-configuration .orMaRetBox {
	height: 42px;
	border: 1px solid #b3b3b3;
	float: left;
	line-height: 42px;
	margin: 0 5px 0 5px;
}

#online-configuration .orMaRetBox input {
	text-align: center;
	height: 40px;
	width: 139px;
	padding-left: 0;
	display: block;
	float: left;
	outline: none;
	border: 0;
	border-right: solid #b3b3b3 1px;
}

#online-configuration .orMaRetBox div {
	width: 40px;
	height: 40px;
	position: relative;
	cursor: pointer;
}

#online-configuration .orMaRetBox div i {
	height: 10px;
	width: 10px;
	border-top: 10px #b3b3b3 solid;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -5px;
	margin-top: -5px;
	box-sizing: border-box;
}

#online-configuration .orMaRetBox a {
	width: 51px;
	height: 40px;
	background: #28a8e0;
}

#online-configuration .orMaRetBox:last-of-type {
	margin-left: 7px;
}

#online-configuration .orMaRetBox:last-of-type a {
	color: #fff;
	height: 40px;
	width: 90px;
	text-align: center;
	line-height: 40px;
}

.cupon-type-list {
	width: 100%;
	height: 46px;
	margin-top: 19px;
}

.cupon-type-list ul {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
}

.cupon-type-list ul li {
	height: 100%;
	line-height: 46px;
}

.cupon-table {
	border: 1px solid rgb(210, 210, 210);
	box-shadow: 0 0 1px #999;
	width: 1437px;
	margin: 19px 0 0 0;
}

.cupon-table .cupon-table-header p {
	color: #333333;
	height: 45px;
	line-height: 45px;
	font-size: 17px;
	padding-left: 22px;
}

.cupon-table .cupon-table-header-instruct {
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	text-align: center;
	background: #f2f2f2;
	height: 41px;
	line-height: 41px;
}

.cupon-table-header-instruct li {
	width: 100%;
	height: 100%;
}

.cupon-table .cupon-table-list {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.cupon-table .cupon-table-list li {
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid RGB(247, 247, 247);
	height: 71px;
	line-height: 71px;
}

.cupon-table .cupon-table-list li span {
	width: 100%;
	height: 100%;
	text-align: center;
	font-size: 14px;
}

.cupon-table .cupon-table-list li .text-over {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.detLi {
	position: relative;
	cursor: pointer;
}

.detLi .detDiv {
	width: 250px;
	height: 80px;
	position: absolute;
	top: 45px;
	right: 0;
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

.shoName-select {
	border-color: #ff9800;
	background: url(../../res/images/sign.png) right bottom no-repeat;
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

#online-configuration .staList {
	position: relative;
	line-height: 41px;
	width: 231px;
}

#online-configuration .staList .tableListUl {
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

#online-configuration .staList .tableListUl .tableListLi {
	text-align: center;
	height: 41px;
	border: 1px #ccc solid;
	background: #fff;
	cursor: pointer;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 0 !important;
}

#online-configuration .staList .tableListUl .tableListLi:last-of-type {
	border-bottom: 0;
}

#online-configuration .tableList {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
}

#online-configuration .tableList .oSpan {
	height: 39px;
	line-height: 39px;
	width: 189px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px solid #b3b3b3;
	overflow: hidden;
}

#online-configuration .tableList div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}

#online-configuration .tableList div i {
	height: 10px;
	width: 10px;
	border-top: 10px #b3b3b3 solid;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -5px;
	margin-top: -5px;
	box-sizing: border-box;
}

.current-name {
	height: auto;
	color: RGB(51, 51, 51);
	padding-left: 40px;
	margin-bottom: 10px;
}

.current-list-store {
	line-height: 22px;
}

.current-name .current-list-name {
	margin: 10px 0;
}

.current-name span {
	font-size: 17px;
}

.current-table {
	width: 1437px;
	height: 100%;
	border: 1px solid RGB(247, 247, 247);
	margin-left: 41px;
	box-shadow: 0 0 1px #999;
}

.current-table .current-table-header {
	width: 100%;
	height: 46px;
	font-size: 17px;
	line-height: 46px;
	padding-left: 5px;
}

.current-table .current-table-list ul:nth-child(1) {
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 41px;
	background: RGB(242, 242, 242);
}

.current-table .current-table-list ul:nth-child(1) li {
	width: 100%;
	text-align: center;
}

.current-table .current-table-list ul:nth-child(2) {
	display: flex;
	flex-direction: column;
}

.current-table .current-table-list ul:nth-child(2) li {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 71px;
	border-top: 1px solid RGB(247, 247, 247);
	box-shadow: 0 0 1px #999;
}

.current-table .current-table-list ul:nth-child(2) li span {
	text-wrap: nowrap;
	overflow: hidden;
	width: 100%;
	text-align: center;
	font-size: 14px;
}

#online-configuration .statisticsList {
	position: relative;
	line-height: 100%;
}

#online-configuration .statisticsList input {
	text-align: center;
	display: block;
	float: left;
	height: 40px;
	width: 140px;
	outline: none;
	border: 0;
}

#online-configuration .statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 43px;
	left: 0;
	z-index: 10;
	background: #fff;
}

#online-configuration .statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #b3b3b3 solid;
	border-top: 0;
	background: #fff;
	cursor: pointer;
}

#online-configuration .tableListInp {
	width: 230px;
	color: #666666;
	height: 42px;
	cursor: pointer;
	box-sizing: border-box;
	/* border: 1px solid #b3b3b3; */
}
</style>