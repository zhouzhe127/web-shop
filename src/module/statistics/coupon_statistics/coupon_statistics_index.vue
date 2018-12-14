<template>
	<div id="online-configuration">
		<section v-if="changePage">
			<div class="cupon-time-select clearfix">
				<div class="screenBox clearfix">
					<span class="fl cupon-type">时间选择</span>
					<el-date-picker class="fl" v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :editable="false" :clearable="false">
					</el-date-picker>
					<span class="fl line">--</span>
					<el-date-picker class="fl" v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :editable="false" :clearable="false" @change="selectEndTime">
					</el-date-picker>
					<el-button class="fl" style="margin-right: 20px;" type="primary" icon="el-icon-search" @click="searchInDate"></el-button>
				</div>
				<div class="screenBox clearfix">
					<span class="fl cupon-type">优惠券类型</span>
					<el-popover class="fl" placement="bottom" width="400" v-model="showJob" trigger="click" @hide="ensure">
						<section>
							<div class="clearfix">
								<el-button border size="mini" class="el-labItem" style="height:28px;" @click="selallcoupon">全部</el-button>
								<el-checkbox v-model="showCard" v-for="item in card" class="el-labItem" :key="item.id" :label="item.id" border size="mini">{{item.name}}</el-checkbox>
							</div>
						</section>
						<el-button slot="reference" plain class="el-reference">
							<span>{{selectedCoupon}}</span>
							<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
						</el-button>
					</el-popover>
				</div>
				<div class="screenBox clearfix">
					<el-button type="primary" style="width:100px;" @click="handleSearchInDate">筛选</el-button>
					<el-button type="info" style="width:100px;" @click="initResert">重置</el-button>
				</div>
			</div>
			<div class="cupon-type-list">
				<span class="all" v-for="(item,index) in storeList" :key='index' v-bind:class="{'active':indexOn == index }" @click="chooseStore(index)">{{item.name}}</span>
			</div>
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>优惠券统计</span>
						<span></span>
						<span>共
							<a href="javascript:;">{{listLen}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="list" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="name" label="优惠券名称" width="200" align="center">
					</el-table-column>
					<el-table-column label="状态" prop="status" align="center" width="120">
						<template slot-scope="scope">
							<span>{{storeList[scope.row.status].name}}</span>
						</template>
					</el-table-column>
					<el-table-column label="类型" prop="type" align="center" width="120">
						<template slot-scope="scope">
							<span>{{selectName[scope.row.type]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" prop="createTime" align="center" width="200">
					</el-table-column>
					<el-table-column label="结束时间" prop="endTime" align="center" width="200">
					</el-table-column>
					<el-table-column label="领券量" prop="send" align="center" width="100">
					</el-table-column>
					<el-table-column label="券核销量" prop="use" align="center" width="100">
						<template slot-scope="scope">
							<span @click="handleToCount(scope.row.id,scope.row.name,scope.row.use)" style="color: #27a8e0">{{scope.row.use}}</span>
						</template>
					</el-table-column>
					<el-table-column label="券核销率" prop="cancelAfterVerification" align="center" width="100">
					</el-table-column>
					<el-table-column label="优惠金额" prop="couponCash" align="center" width="100">
						<template slot-scope="scope">
							<span>¥{{scope.row.couponCash}}</span>
						</template>
					</el-table-column>
					<el-table-column label="拉动消费" prop="orderPrice" align="center" width="100">
						<template slot-scope="scope">
							<span>¥{{scope.row.orderPrice}}</span>
						</template>
					</el-table-column>
					<el-table-column label="券面额" prop="createTime" align="center" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.type == '6'">{{(scope.row.couponPrice * scope.row.use).toFixed(2)}}</span>
							<span v-else>--</span>
						</template>
					</el-table-column>
					<el-table-column label="实收金额" prop="createTime" align="center" width="100">
						<template slot-scope="scope">
							<span v-if="scope.row.type == '6'">{{(scope.row.billPrice * scope.row.use).toFixed(2)}}</span>
							<span v-else>--</span>
						</template>
					</el-table-column>
					<el-table-column label="结算金额" prop="createTime" align="center">
						<template slot-scope="scope" width="100">
							<span v-if="scope.row.type == '6'">{{(scope.row.reckoningPrice * scope.row.use).toFixed(2)}}</span>
							<span v-else>{{scope.row.reckoningPrice}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="pageTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</section>
		<verification v-else :startTime="startTime" :endTime="endTime" :couponId="couponId" :couponName="couponName" @throwWinResult="getDetailShow"></verification>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			startTime: utils.getTime({
				time: new Date().setDate(1)
			}).start, //日期组件的开始时间
			endTime: utils.getTime({
				time: new Date()
			}).end, //日期组件的结束时间
			list: [], // coupon 数据
			page: 1, // 当前页码
			listLen: 0, // 数据量
			pageTotal: 0, //页码总数
			card: [
				//  优惠券类型
				{
					name: '单品减免',
					id: 1
				},
				{
					name: '整单减免',
					id: 2
				},
				{
					name: '单品折扣',
					id: 3
				},
				{
					name: '整单折扣',
					id: 4
				},
				{
					name: '赠品',
					id: 5
				},
				{
					name: '代金券',
					id: 6
				},
				{
					name: '随机减免券',
					id: 8
				},
				{
					name: '第二件商品券',
					id: 9
				},
				{
					name: '买送券',
					id: 10
				},
				{
					name: '定额券',
					id: 11
				}
			],
			selectName: {
				'1': '单品减免',
				'2': '整单减免',
				'3': '单品折扣',
				'4': '整单折扣',
				'5': '赠品',
				'6': '代金券',
				'8': '随机减免券',
				'9': '第二件商品券',
				'10': '买送券',
				'11': '定额券',
			}, // 默认优惠券
			shopListBtn: false, // 是否展示优惠券列表
			fiterId: [],
			changePage: true,
			couponType: 0,
			couponStatus: 0,
			couponId: 0, //被选中的优惠券的id
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
			showJob: false,
			showCard: [], //优惠券类型选中的id
			selectedCoupon: '全部优惠券', //显示选中的优惠券
			storeList: [{
					name: '全部'
				},
				{
					name: '已关联'
				},
				{
					name: '未关联'
				},
				{
					name: '已过期'
				}
			],
			indexOn: 0,
			num: 10
		};
	},
	methods: {
		selectEndTime: function(time) { //选择日期
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		selallcoupon: function() { //选择优惠券 全选
			let arr = [];
			for (let item of this.card) {
				arr.push(item.id);
			}
			if (this.showCard.length == this.card.length) {
				this.showCard = [];
			} else {
				this.showCard = arr;
			}
		},
		ensure: function() {
			this.showJob = false;
			this.selectedCoupon = '';
			let selArr = [];
			for (let i = 0; i < this.card.length; i++) {
				if (this.showCard.indexOf(this.card[i].id) != -1) {
					selArr.push(this.card[i].name);
					//this.selectedCoupon += this.card[i].name + ',';
				}
			}
			this.selectedCoupon = selArr.join(',');
			if (!this.selectedCoupon) {
				this.selectedCoupon = '请选择优惠券类型';
			}
		},
		checkForm: function() { //验证表单
			if (this.endTime - this.startTime < 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始日期不能大于结束日期',
					winType: 'alert'
				});
				return false;
			}
			if (this.showCard.length == 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '请选择优惠券的类型',
					winType: 'alert'
				});
				return false;
			}
			return true;
		},
		async getCouponData() {
			if (!this.checkForm()) return;
			let res = await http.getCouponStatisticsData({
				data: {
					startTime: this.startTime / 1000, //开始时间
					endTime: this.endTime / 1000, //结束时间
					couponType: this.showCard.join(','), // 6种优惠券类型
					couponStatus: this.indexOn, // 4种优惠券状态
					page: this.page,
					num: this.num,
					ischain: this.ischain,
					brandId: ''
				}
			});
			if (res) {
				// if (res.list) {
				this.list = utils.sortByAll(res.list, 'createTime');
				// }
				this.listLen = res.count;
				this.pageTotal = res.total;
			}
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
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					couponType: this.showCard.join(','),
					couponStatus: this.indexOn,
					page: this.page,
					num: this.num,
					format: 'csv'
				}
			});
		},
		searchInDate() {
			this.getCouponData();
		},
		handleToCount(couponId, name, send) {
			//  页面跳转
			// if (send == 0) {
			// 	this.$store.commit('setWin', {
			// 		title: '提示信息',
			// 		content: '该优惠券暂未领券',
			// 		winType: 'alert'
			// 	});
			// 	return false;
			// }
			this.couponId = couponId;
			this.couponName = name;
			this.changePage = !this.changePage;
		},
		handleSearchInDate() {
			//  筛选优惠券类型
			this.getCouponData();
		},
		initResert: function() {
			// 过滤优惠券类型
			this.startTime = utils.getTime({
				time: new Date().setDate(1)
			}).start;
			//日期组件的开始时间
			this.endTime = utils.getTime({
				time: new Date()
			}).end; //日期组件的结束时间
			let arr = [];
			let selbrr = [];
			for (let item of this.card) {
				arr.push(item.id);
				selbrr.push(item.name);
			}
			this.showCard = arr;
			this.selectedCoupon = selbrr.join(',');
			this.searchInDate();
		},
		// searchCurrentDate() {
		// 	let start = this.currstartTime.time || this.currstartTime;
		// 	let end = this.currendTime.time || this.currendTime;
		// 	if (!this.isBrand) {
		// 		this.getOneCoupon(start, end, this.userData.currentShop.id);
		// 	} else {
		// 		this.getOneCoupon(start, end, this.fiterId.join());
		// 	}
		// },
		//方案列表点击选择方案
		chooseStore: function(index) {
			this.page = 1;
			this.indexOn = index;
			this.getCouponData();
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.getCouponData();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getCouponData();
		},
		getDetailShow(res) { //子组件评价列表返给父组件的
			this.changePage = res;
			this.$store.commit('setPageTools', [{
				name: '导出',
				fn: () => {
					this.getToOut();
				},
				className: 'el-btn-blue'
			}]);
		},
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '导出',
			fn: () => {
				this.getToOut();
			},
			className: 'el-btn-blue'
		}]);
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
		let arr = [];
		let selbrr = [];
		for (let item of this.card) {
			arr.push(item.id);
			selbrr.push(item.name);
		}
		this.showCard = arr;
		this.selectedCoupon = selbrr.join(',');
		this.searchInDate();
	},
	components: {
		page: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		calendar: () =>
			import( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		'select-store': () =>
			import( /*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		comTable: () =>
			import( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		verification: () =>
			import( /*webpackChunkName: "coupon_statistics_verification"*/ './coupon_statistics_verification'),
	}
};
</script>
<style type="text/css" scoped>
#online-configuration {
	min-width: 780px;
	position: relative;
}

#online-configuration .screenBox {
	float: left;
	margin-right: 20px;
	margin-bottom: 10px;
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
	/* min-width: 85px; */
	margin: 0 10px 0 0px;
	font-size: 17px;
}

.cupon-time-select .buttonbox {
	width: 232px;
	height: 42px;
	margin-left: 20px;
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
	margin-bottom: 20px;
}

.cupon-type-list .all {
	width: 121px;
	height: 41px;
	display: inline-block;
	font-size: 16px;
	text-align: center;
	line-height: 41px;
	border-radius: 4px;
	margin-right: 14px;
	background: #F2F2F2;
	color: #333;
	cursor: pointer;
}

.cupon-type-list .active {
	background: #E1BB4A;
	color: #fff;
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

.el-labItem {
	margin-bottom: 5px;
	margin-left: 0 !important;
	margin-right: 10px;
	float: left;
}

.el-reference {
	width: 200px;
	overflow: hidden;
	position: relative;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-right: 30px;
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