<template>
	<div class="verification">
		<div class="timeSearch clearfix">
			<div class="selectDate fl">
				<div class="activation fl">
					时间筛选
				</div>
				<div class="inp-box inp-start fl">
					<el-date-picker v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp">
					</el-date-picker>
				</div>
				<span class="line"> - </span>
				<div class="inp-box inp-start fl">
					<el-date-picker v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp">
					</el-date-picker>
				</div>
				<el-button type="primary" icon="el-icon-search"></el-button>
			</div>
			<!-- 选择门店 -->
			<div class="selectDate fl" v-if="isBrand">
				<div class="activation fl">
					选择门店
				</div>
				<el-popover class="fl" placement="bottom" width="400" v-model="showshop" trigger="click" @hide="ensure">
					<section>
						<div class="clearfix">
							<el-button border size="mini" class="el-labItem" style="height:28px;" @click="selallcoupon">全部</el-button>
							<el-checkbox v-model="showCard" v-for="item in shopList" class="el-labItem" :key="item.id" :label="item.id" border size="mini">{{item.shopName}}</el-checkbox>
						</div>
					</section>
					<el-button slot="reference" plain class="el-reference">
						<span>{{selectedCoupon}}</span>
						<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
					</el-button>
				</el-popover>
			</div>
			<div class="selectDate fl">
				<el-button type="primary" style="width:100px;" @click="getOneCoupon">筛选</el-button>
				<el-button type="info" style="width:100px;" @click="resetFun">重置</el-button>
			</div>
		</div>
		<div class="couponName">
			<div class="activation">
				优惠券名称:{{couponName}}
			</div>
		</div>
		<div class="couponName">
			<div class="activation">
				选择门店:{{selectedCoupon}}
			</div>
		</div>
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>{{couponName}}</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{allFormList.length}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="formList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="shopName" label="店铺名称" align="center">
				</el-table-column>
				<el-table-column label="核销量" prop="useCoupon" align="center">
				</el-table-column>
				<el-table-column label="优惠金额" prop="couponCash" align="center">
					<template slot-scope="scope">
						<span>¥{{scope.row.couponCash}}</span>
					</template>
				</el-table-column>
				<el-table-column label="拉动消费" prop="orderPrice" align="center">
					<template slot-scope="scope">
						<span>¥{{scope.row.orderPrice}}</span>
					</template>
				</el-table-column>
				<el-table-column label="券总额" prop="type" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.reckoningPrice != '-' && scope.row.reckoningPrice != '-'">{{(scope.row.couponPrice * scope.row.useCoupon).toFixed(2)}}</span>
						<span v-else>-</span>
					</template>
				</el-table-column>
				<el-table-column label="入账金额" prop="createTime" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.billPrice != '-'">{{(scope.row.billPrice * scope.row.useCoupon).toFixed(2)}}</span>
						<span v-else>{{scope.row.billPrice}}</span>
					</template>
				</el-table-column>
				<el-table-column label="结算金额" prop="endTime" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.reckoningPrice != '-'">{{(scope.row.reckoningPrice * scope.row.useCoupon).toFixed(2)}}</span>
						<span v-else>{{scope.row.reckoningPrice}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				page: 1,
				num: 10,
				showshop: false, //选择门店
				selectedCoupon: '请选择门店',
				showCard: [], //选中的门店
				shopList: [], //门店数组
				currentList: [],
				currentTotal: '',
				formList: [], //展示的数据
				endTotal: 1,
				allFormList: [], //所有的数据
				isBrand: false //判断是否品牌
			};
		},
		props: {
			startTime: Number, //开始时间
			endTime: Number, //结束时间
			couponName: String, //优惠券名称
			couponId: String, //优惠券的id
			couponName: String //优惠券名称
		},
		methods: {
			ensure: function() {
				this.showshop = false;
				this.selectedCoupon = '';
				let selArr = [];
				for (let item of this.shopList) {
					if (this.showCard.indexOf(item.id) != -1) {
						selArr.push(item.shopName);
					}
				}
				this.selectedCoupon = selArr.join(',');
				if (!this.selectedCoupon) {
					this.selectedCoupon = '请选择优惠券类型';
				}
			},
			selallcoupon: function() { //选择优惠券 全选
				let arr = [];
				for (let item of this.shopList) {
					arr.push(item.id);
				}
				if (this.showCard.length == this.shopList.length) {
					this.showCard = [];
				} else {
					this.showCard = arr;
				}
			},
			checkForm: function() {
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
						content: '请选择门店类型',
						winType: 'alert'
					});
					return false;
				}
			},
			async getOneCoupon() {
				let res = await http.getOneCoupon({
					data: {
						startTime: this.startTime / 1000, //开始时间
						endTime: this.endTime / 1000, //结束时间
						couponId: this.couponId,
						shopIds: this.showCard.join(','),
						ischain: this.ischain,
						brandId: ''
					}
				});
				// this.currentList = res;
				this.currentTotal = res.length;
				this.allFormList = res; //身体的数据
				this.$nextTick(() => {
					this.setPage();
				});
			},
			returnStore: function() {
				this.$emit('throwWinResult', true);
			},
			setPage: function() {
				this.endTotal = Math.ceil((this.allFormList.length) / (this.num));
				let pageStart = (this.page - 1) * (this.num);
				let pageEnd = (this.page) * (this.num);
				let pageContent = this.allFormList.slice(pageStart, pageEnd);
				this.formList = pageContent;
			},
			handleSizeChange(p) {
				this.num = p;
				this.setPage();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.setPage();
			},
			resetFun: function() {
				let arr = [];
				let selbrr = [];
				if (this.isBrand) {
					this.shopList = storage.session('shopList'); //获取到品牌下面所有店铺信息
				} else {
					this.shopList = [];
					this.shopList.push(this.userData.currentShop);
				}
				for (let item of this.shopList) {
					arr.push(item.id);
					selbrr.push(item.shopName || item.name);
				}
				this.showCard = arr;
				this.selectedCoupon = selbrr.join(',');
				this.getOneCoupon();
			},
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				fn: () => {
					this.returnStore();
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
			this.resetFun();
		},
	};
</script>
<style scoped>
	.verification {
		width: 100%;
		height: auto;
	}

	.verification .timeSearch {
		width: 100%;
		height: 40px;
		margin-bottom: 16px;
	}

	.verification .timeSearch .selectDate {
		margin-right: 21px;
		float: left;
	}

	.verification .activation {
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
		font-size: 16px;
		color: #333;
	}

	.verification .line {
		display: block;
		float: left;
		width: 14px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.verification .couponName {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
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
</style>