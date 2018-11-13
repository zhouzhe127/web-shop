<template>
	<div>
		<section v-if="couponType == 0" id="management">
			<div class='test'>
				<el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false">
				</el-date-picker>
				<el-button class="fl" type="primary" icon="el-icon-search" @click="seachData"></el-button>
			</div>
			<div class="clearfix" style="margin-bottom: 20px;">
				<section v-for="(item,index) in bannerList" class="diel" :class="{'on':indexOn == index }" :key="index" @click="()=>{inte(index,'1')}">{{item.name}}</section>
			</div>
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>优惠券列表</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="couponList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'60px'}">
					<el-table-column fixed prop="createTime" label="创建时间" align="center">
						<template slot-scope="scope">
							<span>{{returnTime(scope.row.createTime)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="优惠券名称" prop="name" align="center">
					</el-table-column>
					<el-table-column prop="createTime" label="到期时间" align="center">
						<template slot-scope="scope">
							<span>{{getEndTime(scope.row)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" label="类型" align="center">
						<template slot-scope="scope">
							<span>{{couponTypeList[scope.row.type]}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="280">
						<template slot-scope="scope">
							<div v-if="ischain == 1 || ischain == 2 || scope.row.fromType == '2'">
								<el-button size="medium" type="text" @click="opencoupons(scope.$index,scope.row)">查看详情</el-button>
							</div>
							<div v-else>
								<el-button size="medium" type="text" @click="unbundlingCoupon(scope.row)" style="color: rgb(40, 168, 224);">同步</el-button>
								<span style="padding:0 5px;color: #D2D2D2">|</span>
								<el-button size="medium" type="text" @click="opencoupons(scope.$index,scope.row)" style="color: #E1BB4A;">查看详情</el-button>
								<span style="padding:0 5px;color: #D2D2D2">|</span>
								<el-button size="medium" type="text" @click="modfycoupons(scope.row)" style="color: #ff8d00;">编辑</el-button>
								<span style="padding:0 5px;color: #D2D2D2">|</span>
								<el-button size="medium" type="text" @click="deletecoupons(scope.row)" style="color: #fd3f1f;">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="pageNum" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</section>
		<breakCoupon v-if="couponType == 1 || couponType == 2 || couponType == 8" :couponDetail='couponDetail' @changeMnage='getcouponResult'></breakCoupon>
		<discountCoupon v-if="couponType == 3 || couponType == 4" :couponDetail='couponDetail' @changeMnage='getcouponResult'></discountCoupon>
		<giveCoupon v-if="couponType == 5" :couponDetail='couponDetail' @changeMnage='getcouponResult'></giveCoupon>
		<vouchersCoupon v-if="couponType == 6" :couponDetail='couponDetail' @changeMnage='getcouponResult'></vouchersCoupon>
		<intergralcardCoupon v-if="couponType == 7" :couponDetail='couponDetail' @changeMnage='getcouponResult'></intergralcardCoupon>
		<coupon-manage-win @changeCoupon="toEditCoupon" v-if="showCoupon" v-bind="couponInfo"></coupon-manage-win>
		<!-- 解绑弹窗 -->
		<maunBundling v-if='unbindWin' @getAppliedWin='getResult'></maunBundling>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			ischain: '', //店铺id 品牌店/单店
			couponList: [], //优惠券列表
			page: 1, //当前页的数据
			total: 1,
			index: null,
			pageNum: 10, //一版页码处理多少数据
			pageCount: 0, //总条数
			valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
			days: 0, //一共的天数
			indexOn: 0,
			bannerList: [{
				index: 0,
				name: '未关联'
			},
			{
				index: 1,
				name: '已关联'
			},
			{
				index: -1,
				name: '已过期'
			}
			], //
			isShowCa: false, //  是否展示时间选择组件
			changeMnage: true, //  是否显示修改优惠券页面
			showCoupon: false, //  是否显示优惠券弹框
			couponInfo: '', //  优惠券信息
			allTotal: 100,
			pageTotal: 10,
			couponType: 0, //优惠券的标识
			couponDetail: Object, //优惠券的详情
			couponTypeList: {
				1: '单品减免优惠券',
				2: '整单减免优惠券',
				3: '单品打折优惠券',
				4: '整单打折优惠券',
				5: '赠菜优惠券',
				6: '代金券',
				7: '积分卡券',
				8: '随机立减优惠券'
			},
			unbindWin: false, //同步优惠券的弹窗
			asyncId: '', //同步优惠券的id
			count: 0 //总条数
		};
	},
	computed: {
		start: {
			get() {
				return utils.format(new Date(this.atime), 'yyyy-MM-dd');
			}
		},
		end: {
			get() {
				return utils.format(new Date(this.btime), 'yyyy-MM-dd');
			}
		},
		day: {
			get() {
				return Math.floor((this.btime - this.atime) / (24 * 3600 * 1000));
			}
		}
	},
	methods: {
		// pageChange(obj) {
		// 	this.page = obj.page;
		// 	this.inte(this.indexOn);
		// },
		toEditCoupon(str) {
			if (str == 'nochange') {
				this.showCoupon = false;
			} else {
				this.showCoupon = false;
				this.couponDetail = str;
				this.couponType = str.type;
			}
		},
		returnTime(time) {
			time -= 0;
			time = time * 1000;
			return utils.format(new Date(time), 'yyyy-MM-dd');
		},
		getEndTime(item) {
			let item1 = utils.deepCopy(item);
			if (item1.validityType == 0) {
				return '领券后' + item1.relativeTime + '天过期';
			} else if (item1.validityType == 1) {
				item1.endTime -= 0;
				item1.endTime = item1.endTime * 1000;
				return utils.format(new Date(item1.endTime), 'yyyy-MM-dd') + '过期';
			}
		},
		async inte(index, page) {
			this.indexOn = index;
			if (page) {
				this.page = 1;
			}
			let res = await http.getCouponList({
				data: {
					page: this.page,
					num: this.pageNum,
					status: this.indexOn,
					fromDate: parseInt(this.valueTime[0] / 1000),
					toDate: parseInt(this.valueTime[1] / 1000)
				}
			});
			this.couponList = res.list;
			if (res.count) {
				this.count = res.count;
			}
			//this.allTotal = res.list.length;
			this.total = res.total;
			//this.pageCount = res.list.length;
		},
		//
		showCalendar() {
			this.isShowCa = !this.isShowCa;
		},
		//关闭日期框
		// closeDate() {
		// 	this.isShowCa = false;
		// },
		//查询日期搜索
		seachData() {
			this.inte(this.indexOn);
		},
		//修改优惠券信息
		modfycoupons(item) {
			if (this.indexOn == '2') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '过期优惠券无法编辑'
				});
				return false;
			}
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '提示信息',
				content: '确认修改吗？',
				callback: str => {
					if (str == 'ok') {
						this.changeCoupon(item);
					}
				}
			});
		},
		async changeCoupon(item) {
			let res = await http.getCouponById({
				data: {
					couponId: item.id
				}
			});
			this.couponDetail = res; //单张优惠券的详情
			this.couponType = res.type;
			this.changeMnage = false;
		},
		async delCoupon(item) {
			await http.deleteCoupon({
				data: {
					couponId: item.id
				}
			});
			this.inte(this.indexOn);
		},
		//删除优惠券信息
		deletecoupons(item) {
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '提示信息',
				content: '确认要删除吗？',
				callback: str => {
					if (str == 'ok') {
						this.delCoupon(item);
					}
				}
			});
		},
		//查看优惠券信息
		opencoupons(index, item) {
			this.showCoupon = true;
			this.couponInfo = {
				index,
				item
			};
			// openWin(index, item);
		},
		// getAddAlltime(time) {
		// 	this.atime = time.startTime;
		// 	this.btime = time.endTime;
		// 	this.days = time.days;
		// 	this.isShowCa = false;
		// },
		getcouponResult: function() {
			this.couponType = 0;
			this.inte(this.indexOn); //重新刷新一下列表
		},
		async syncCoupon() { //优惠券同步
			let data = await http.syncCoupon({
				data: {
					couponId: this.asyncId //优惠券的id
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: '同步成功',
					title: '操作提示',
					winType: 'alert'
				});
			}
		},
		unbundlingCoupon: function(item) { //打开同步优惠券的弹窗
			this.asyncId = item.id;
			this.unbindWin = true;
		},
		getResult: function(res) { //弹床的回掉
			if (res == 'ok') {
				this.syncCoupon();
			}
			this.unbindWin = false;
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.pageNum = p;
			this.inte(this.indexOn);
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.inte(this.indexOn);
		},
	},
	mounted() {
		this.inte(this.indexOn);
		this.ischain = storage.session('userShop').currentShop.ischain;
	},
	components: {
		'can-multi': () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		breakCoupon: () =>
			import ( /*webpackChunkName: 'breaks_coupon'*/ './new_coupons/breaks_coupon'),
		discountCoupon: () =>
			import ( /*webpackChunkName: 'discount_coupon'*/ './new_coupons/discount_coupon'),
		giveCoupon: () =>
			import ( /*webpackChunkName: 'give_coupon'*/ './new_coupons/give_coupon'),
		vouchersCoupon: () =>
			import ( /*webpackChunkName: 'vouchers_coupon'*/ './new_coupons/vouchers_coupon'),
		intergralcardCoupon: () =>
			import ( /*webpackChunkName: 'integralcard_coupon'*/ './new_coupons/integralcard_coupon'),
		'coupon-manage-win': () =>
			import ( /* webpackChunkName:'coupon_manage_win' */ './coupon_manage_win'),
		page: () =>
			import ( /* webpackChunkName: 'page_element' */ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		maunBundling: () =>
			import ( /*webpackChunkName: 'coupon_maunbundling_win'*/ './coupon_maunbundling_win'),
	}
};
</script>
<style type="text/css" scoped>
.list {
	min-width: 1230px;
	min-height: 400px;
}

.list .oUl {
	width: 100%;
	height: 50px;
	height: 50px;
	background-color: #e6e6e6;
}

.list .oUl li {
	width: 20%;
	height: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	float: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.list .oUl li a {
	float: left;
}

.list .oUl li section {
	height: 50px;
	line-height: 50px;
	text-align: center;
	float: left;
	cursor: pointer;
	color: #808080;
}

.test {
	display: inline-block;
	vertical-align: middle;
	height: 40px;
	margin: 20px 0;
}

.oClickBox .oSpan {
	border-right: 1px solid #b3b3b3;
	display: inline-block;
	float: left;
	text-align: center;
	width: 255px;
	height: 40px;
}



.search {
	display: inline-block;
	float: left;
	width: 44px;
	height: 40px;
	background-color: #29a7e1;
	cursor: pointer;
}

.search {
	background: url(../../res/images/search.png) center center no-repeat;
}

.diel {
	display: inline-block;
	width: 120px;
	height: 40px;
	font-size: 16px;
	background: #f2f2f2;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-right: 10px;
}

.on {
	background: #E1BB4A;
	color: #fff;
}

.worker_staff_footer {
	text-align: left;
	margin-top: 36px;
}

.align_item {
	height: 80px;
	align-items: center;
	display: flex;
}

.align_item section {
	border-bottom: 1px solid rgb(255, 255, 255);
	background-color: rgb(255, 152, 0);
	color: rgb(255, 255, 255);
	height: 80px;
	flex: 1;
}
</style>