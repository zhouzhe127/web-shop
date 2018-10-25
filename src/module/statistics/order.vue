<template>
	<div id="sta-or-one" v-cloak>
		<div v-if='!isBrand' class="button">
			<a href="javascript:void(0);" class="select">堂吃</a>
			<a v-on:click="toTakeout" id="returncolor" href="javascript:void(0);">外卖</a>
			<a v-on:click="toProprietary" id="returncolor" href="javascript:void(0);">自营外卖</a>
		</div>
		<section v-if="isBrand" style="width:100%;overflow: hidden;">
			<section style="width: 80px;height: 40px;line-height: 40px;float: left;font-size: 16px;">选择店铺：</section>
			<section style="height: 40px;line-height: 40px;float: left;margin:0 5px;font-size: 16px;">{{dataDetial.itemDetial.shopName}} |</section>
			<section style="width: 80px;height: 40px;line-height: 40px;float: left;font-size: 16px;">选择时间：</section>
			<section style="height: 40px;line-height: 40px;float: left;font-size: 16px;">{{timeToday(startTime)}}--{{timeToday(endTime)}}</section>
		</section>
		<!--总览订单页面显示日期-->
		<div class="order-order-data" style="margin:15px 0 ;">
			<ul style="height: auto;">
				<li v-if="!isBrand">
					<!--日期选择和搜索框-->
					<el-date-picker :clearable="false" v-model="startTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
					<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
					<el-date-picker :clearable="false" v-model="endTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
					<el-button @click="sreachOrderInDays" type="primary" icon="el-icon-search">搜索</el-button>
				</li>
				<!-- <li v-if="!isBrand" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li> -->
				<li v-if="!isBrand">
					<el-select v-model="conType" @change="selectType" placeholder="请选择类型" style="width:150px;">
						<el-option v-for="item in conTypeList" :key="item.type" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</li>
				<li v-if="!isBrand && conType=='0'">
					<el-select v-model="conSize" @change="selectTypeTwo" placeholder="请选择类型" style="width:150px;">
						<el-option v-for="item in conTypeSize" :key="item.type" :label="item.name" :value="item.type"></el-option>
					</el-select>
				</li>
				<li v-if="!isBrand && conType=='1'">
					<el-select v-model="conShifts" @change="selectTypeBan" placeholder="请选择班次" style="width:150px;">
						<el-option v-for="item in shiftList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</li>
				<div style="display:inline-block;">
					<!--区域选择框-->
					<el-select v-model="areaId" @change="selectArea" placeholder="请选择区域" style="width:150px;">
						<el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<span>-</span>
					<el-select v-model="tableId" @change="selectTab" placeholder="请选择桌台" style="width:150px;">
						<el-option v-for="item in areaList2" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<el-input placeholder="请输入订单号" maxlength="18" v-model="orderNumber" clearable class="input-with-select" style="width:200px;margin:0 10px;">
						<el-button slot="append" icon="el-icon-search" @click="getInfoByOrder"></el-button>
					</el-input>

				</div>
			</ul>
		</div>
		<section style="width:100%;height: 60px;">
			<el-radio-group v-model="status" @change="getOidList">
				<el-radio-button label="4">已结账</el-radio-button>
				<el-radio-button label="3">未结账</el-radio-button>
				<el-radio-button label="6">挂账</el-radio-button>
			</el-radio-group>
		</section>
		<!-- 表格 -->
		<section>
			<el-table stripe :row-style="{color:'#f8941f'}" :header-cell-style="{'background-color':'#f5f7fa'}" @header-click="headClick" :data="newpayTotalNum" border style="width: 100%">
				<el-table-column width="250" align="center" prop="totalDay" label="天数"></el-table-column>
				<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" align="center" prop="goodsTotalNum" label="商品总数"></el-table-column>
				<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="salesNum" label="销量"></el-table-column>
				<el-table-column min-width="100" show-overflow-tooltip align="center" prop="freeNum" label="赠品总数"></el-table-column>
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="freePrice" label="赠品总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.freePrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="100" show-overflow-tooltip align="center" prop="returnNum" label="退品总数"></el-table-column>
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="returnPrice" label="退品总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.returnPrice).toFixed(2)}}</span>
					</template>
				</el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="discount" label="优惠总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.discount).toFixed(2)}}</span>
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
				<el-table-column min-width="120" show-overflow-tooltip align="center" prop="waitPrice" label="实收总额">
					<template slot-scope="scope">
						<span>{{parseFloat(scope.row.waitPrice).toFixed(2)}}</span>
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
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="oneDayOrderList" border style="width: 100%">
					<el-table-column fixed width="250" align="center" prop="shopName" label="操作">
						<template slot-scope="scope">
							<span style="color:#00AAE7;cursor: pointer;" @click="getOrderDetailInfo(scope.row.oid)">{{scope.row.oid}}</span>
						</template>
					</el-table-column>
					<el-table-column width="100" align="center" prop="status" label="状态">
						<template slot-scope="scope">
							<span>{{scope.row.status}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="180" align="center" prop="createTime" label="开单时间"></el-table-column>
					<el-table-column min-width="180" align="center" prop="updateTime" label="结账时间"></el-table-column>
					<el-table-column min-width="180" align="center" label="桌台号">
						<template slot-scope="scope">
							<span v-if="scope.row.areaName !==''">{{scope.row.areaName}}--</span>
							<span>{{scope.row.tableName}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsNum" label="商品数"></el-table-column>
					<el-table-column min-width="100" :render-header="renderHeader" show-overflow-tooltip align="center" prop="salesNum" label="销量"></el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="freeNum" label="赠品数"></el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="freePrice" label="赠品金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.freePrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="100" show-overflow-tooltip align="center" prop="returnNum" label="退品数"></el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="returnPrice" label="退品金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.returnPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" property="discount" label="优惠金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.discount).toFixed(2)}}</span>
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
					<el-table-column min-width="120" :render-header="renderHeader" align="center" show-overflow-tooltip prop="originalPrice" label="消费金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.originalPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="waitPrice" label="实收总额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.waitPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="paymentPrice" label="入账金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.paymentPrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column min-width = "120" show-overflow-tooltip align="center" prop="settlePrice" label="挂账结清金额" >
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.settlePrice).toFixed(2)}}</span>
						</template>
					</el-table-column> -->
				</el-table>
			</section>

		</section>
		<!--分页-->
		<div style="margin:20px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="dayPage.page" :page-count="dayPage.pageNum" :page-size="dayPage.num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
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
			order: null,
			userData: null,
			dataDetial: null,
			isBrand: null, //品牌判断
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			// newStartTime: '', //点击日历组件获取的开始时间
			// newEndTime: '', //点击日历组件获取的结束时间
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			orderNumber: null, //订单号
			// allArea: '选择区域',
			// areaBtn: false, //区域
			// allArea2: '选择桌台',
			// areaBtn2: false, //桌台
			status: 4, //订单状态(3:未结账，4 ： 已结账， 6 ： 挂账)
			payTotalNum: {}, //当天或者多天的数据总和
			oneDayOrderList: [], //一天的订单列表
			// showWidth: 1940, //长度

			// payLsZero: false, //所有的支付方式是否显示
			exportUrl: 'javascript:void(0);',
			areaList: [{ id: '', name: '全部区域' }], //区域列表
			// index: -1, //区域下标
			areaList2: [{ id: '', name: '全部桌台' }], //桌台列表
			// index2: -1, //桌台下标
			dayPage: { page: 1, num: 0, pageNum: 1 }, //单天分页信息
			// newDayPage: null, //复制单天分页信息
			preferentialBounced: false, //优惠总额弹框
			// isZeroPays: [], //支付方式和为0的列表
			dateTime: [], //要查询的日期 导入和打印使用
			// startObj: {},
			// endObj: {},

			newpayTotalNum: [], //当天或者多天的数据总和
			orderListInDays: [],
			paymentList: [{ num: 0, paymentName: '' }],
			areaId: '',
			tableId: '',

			conType:'0',//按日别或交接班
			conSize:'1',//营业时间和自然日
			conShifts:'',//班次
			conTypeList:[{type:'0',name:'按日别'},{type:'1',name:'按交接班'}],
			conTypeSize:[{type:'1',name:'按营业时间'},{type:'0',name:'按自然日'}],
			shiftList:[],//交接班次列表
			baseDetial:{},//店铺的基本信息
		};
	},
	methods: {
		renderHeader(h, { column}) {
			let titleName = '';
			let label = column.label;
			let property = column.property;
			if (label == '商品总数' && property == 'goodsTotalNum') {
				titleName =
					'该日的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			}
			if (label == '商品数' && property == 'goodsNum') {
				titleName =
					'该订单的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			} else if (label == '销量' && property == 'salesNum') {
				titleName =
					'已销售的数量（不包含退品数）公式：商品总数-退品数=销量';
			} else if (label == '优惠总额' && property == 'discount') {
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
			} else if (label == '优惠金额' && property == 'discount') {
				titleName = '该日所有的优惠金额总计';
			} else if (label == '消费总额' && property == 'originalPrice') {
				titleName = '该日内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '消费金额' && property == 'originalPrice') {
				titleName = '该订单内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '入账总额' && property == 'paymentPrice') {
				titleName =
					'该日中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '入账金额' && property == 'paymentPrice') {
				titleName =
					'该订单中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '会员充值' && property == 'memberRecharge') {
				titleName = '该日内会员充值总计(不计入消费总额及入账总额中)';
			} else {
				// titleName = ''
			}
			return h('div', [
				h('span', {}, column.label),
				h(
					'el-popover',
					{
						attrs: {
							class: 'item',
							effect: 'dark',
							content: titleName,
							placement: 'bottom',
							width: '300'
							// on:{
							// 	click:this.abc(column)
							// }
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
			if (column.label == '优惠总额' && column.property == 'discount') {
				this.openDiscount(this.payTotalNum);
			}
		},
		selectType(){
			if(this.conType == '0'){
				this.selectTypeTwo();
			}
		},
		selectTypeTwo(){
			this.getOrderListInDay(this.dateTime);
		},
		selectTypeBan(){
			this.getOrderListInDay(this.dateTime);
		},
		//获取店铺基本信息
		async baseGet() {
			this.baseDetial = await http.baseGet({
				data: { shopId: this.shopId }
			});
		},
		//初始化按钮,true时表示离开,false,表示进入
		initBtn(flag) {
			let arr = [
				{
					name: '返回',
					style: {
						backgroundColor: '#fff',
						border: '1px solid #ff8c01',
						color: '#ff8c01'
					},
					fn: () => {
						this.returnPage();
					}
				},
				{
					name: '打印',
					style: {
						backgroundColor: '#fff',
						border: '1px solid #20a7dd',
						color: '#20a7dd'
					},
					fn: () => {
						this.printOrder();
					}
				},
				{
					name: '导出',
					style: {},
					fn: () => {
						this.exportOrder();
					}
				}
			];
			// if (!this.isBrand) arr.splice(0, 1);
			if (flag) {
				arr.shift();
			}
			if (this.isBrand) arr.splice(1, 1); //品牌进入，去掉打印
			this.$store.commit('setPageTools', arr);
		},
		//到外卖界面
		toTakeout: function() {
			let detial = {}; //要传的数据
			detial = {
				name: 'takeout', //外卖的关键表示
				startTime: new Date(this.startTime).getTime(),
				endTime: new Date(this.endTime).getTime(),
				isOpenTime: this.isOpenTime
			};
			storage.session('orderTakeout', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderTakeaway',
				query: this.$route.query
			});
		},
		toProprietary: function() {
			//去自营外卖
			this.$router.push({
				path: '/admin/orderStatistics/orderProprietary',
				query: this.$route.query
			});
		},
		//选择时间查询订单
		sreachOrderInDays: function() {
			let timer = 3 * 30 * 24 * 60 * 60 * 1000;
			this.startTime = new Date(this.startTime).getTime();
			this.endTime = new Date(this.endTime).getTime();
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				this.startTime =
					this.endTime - timer + 24 * 60 * 60 * 1000 + 1000;
				// return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '时间选择错误!'
				});
				return false;
			}
			// this.startTime = this.newStartTime;
			// this.endTime = this.newEndTime;
			let detial = {}; //要传的数据
			detial = {
				name: 'order-more', //
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.isOpenTime,
				allDayPage: { page: 1, num: 10, pageNum: 1 } //选择时间查询，重新初始化页数
			};
			storage.session('orderMore', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//通过订单查询
		getInfoByOrder: function() {
			let onum = this.orderNumber;
			let regNum = /\d+/g;
			if (onum == null || onum == undefined || onum == '') {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请输入订单号码!'
				});
				return false;
			}
			let newOnum = onum.split('');
			if (newOnum.length < 18 || !regNum.test(onum)) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '请输入正确的订单号!'
				});
				return false;
			}
			this.getOrderDetailInfo(onum);
		},
		//点击查看某天某一个的数据详情
		async getOrderDetailInfo(oid) {
			let res = await http.billDelite({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
					oid: oid
				}
			});
			res.oidDetial = 'order-one'; //自定义商品统计特有标记
			res.titleDetial = {
				startTime: this.startTime,
				endTime: this.endTime,
				dayPage: this.dayPage,
				isOpenTime: this.isOpenTime
			};
			storage.session('orderDetial', res);
			this.$router.push({
				path: '/admin/orderStatistics/orderDetail',
				query: this.$route.query
			});
		},
		//切换已结账、未结账、挂账
		getOidList: function(typeNum) {
			this.dayPage.page = 1;
			this.status = typeNum;
			this.getOrderListInDay(this.dateTime);
		},
		//点击查看某天的数据
		async getOrderListInDay(time) {
			this.orderNumber = ''; //清空订单号
			this.dateTime = time;
			//进入单天的订单，多天的隐藏，打印-返回也适用
			this.startH = new Date(this.startTime).getHours();
			this.startM = new Date(this.startTime).getMinutes();
			this.startS = new Date(this.startTime).getSeconds();
			this.endH = new Date(this.endTime).getHours();
			this.endM = new Date(this.endTime).getMinutes();
			this.endS = new Date(this.endTime).getSeconds();
			let startDay =
				time +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				time + ' ' + this.endH + ':' + this.endM + ':' + this.endS;
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			this.newpayTotalNum = [];
			let res = await http.oneDayOrderDataNew({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
					startTime:
						time == newStarTime
							? this.getTime(startDay)
							: this.getTime(time + ' 00:00:00'),
					endTime:
						time == newEndTime
							? this.getTime(endDay)
							: this.getTime(time + ' 23:59:59'),
					isOpenTime: Number(this.conSize),
					page: this.dayPage.page,
					num: this.dayPage.num, //一页显示多少
					oid: this.orderNumber,
					areaId: this.areaId,
					tableId: this.tableId,
					status: this.status,
					type:this.conType,//0代表按自然日，1代表按交接班
					typeId:this.conType == '0'?this.conSize:this.conShifts//对应type的id，type为1的时候，该字段为班次id
				}
			});
			if (res) {
				let orderList = res.list;
				for (let i = 0; i < orderList.length; i++) {
					if (orderList[i].updateTime == '1970-01-01 08:00:00') {
						orderList[i].updateTime = '0000-00-00 00:00:00';
					}
				}
				this.oneDayOrderList = orderList;
				this.payTotalNum = res.total;
				this.dayPage.pageNum = res.pageNum;
				this.newpayTotalNum.push(res.total);
				this.newpayTotalNum[0].totalDay = 1; //从日期进去，为1天，加上totalDay
				this.payTotalNum.totalDay = 1; //从日期进去，为1天，加上totalDay
				//对支付方式为0的进行操作
				let arr = res.total.paymentList;
				let ArrNoZero = [];
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].paymentName == '该支付方式被删除') {
						arr.splice(i, 1);
						i--;
					} else if (arr[i].num > 0) {
						ArrNoZero.push(arr[i]);
					}
				}
				this.paymentList = ArrNoZero;
				// this.showWidth = ArrNoZero.length * 100 + 1940;
				for (let i = 0; i < res.list.length; i++) {
					this.$set(res.list[i], 'payLists', []);
					let listItem = res.list[i];
					for (let j = 0; j < listItem.paymentList.length; j++) {
						let payitem = listItem.paymentList[j];
						for (let m = 0; m < ArrNoZero.length; m++) {
							if (
								payitem.paymentName ==
									ArrNoZero[m].paymentName &&
								payitem.id == ArrNoZero[m].id
							) {
								res.list[i].payLists.push(payitem);
							}
						}
					}
				}
			}
		},
		//转化时间戳，兼容谷歌 IE
		getTime: function(day) {
			let re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(
				day
			);
			return (
				new Date(
					re[1],
					(re[2] || 1) - 1,
					re[3] || 1,
					re[4] || 0,
					re[5] || 0,
					re[6] || 0
				).getTime() / 1000
			);
		},
		//时间戳转年月日
		timeToday: function(time) {
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		//打开优惠信息
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
		//初始化
		init: function() {
			this.getOrderListInDay(this.order.day);
		},
		async getPayAreaTableList() {
			this.areaList = [{ id: '', name: '全部区域' }]; //区域列表
			this.areaList2 = [{ id: '', name: '全部桌台' }];
			this.tableList = [{ id: '', name: '全部桌台' }];
			let res = await http.getCondition({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id
				}
			});
			let alist = res.areaList;
			for (let i = 0; i < alist.length; i++) {
				this.areaList.push(alist[i]);
			}
			let tlist = res.tableList;
			for (let i = 0; i < tlist.length; i++) {
				this.areaList2.push(tlist[i]);
				this.tableList.push(tlist[i]);
			}
			this.shiftList = res.changeShifts;
		},
		//点击返回按钮
		returnPage: function() {
			storage.session('orderMore', this.order);
			this.$router.push({
				path: '/admin/orderStatistics/orderMore',
				query: this.$route.query
			});
		},
		//打印订单
		async printOrder() {
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//打印一个月以内的订单
			let startDay =
				this.dateTime +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				this.dateTime +
				' ' +
				this.endH +
				':' +
				this.endM +
				':' +
				this.endS;
			await http.printMore({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.userData.currentShop.id,
					startTime:
						this.dateTime == newStarTime
							? this.getTime(startDay)
							: this.getTime(this.dateTime + ' 00:00:00'),
					endTime:
						this.dateTime == newEndTime
							? this.getTime(endDay)
							: this.getTime(this.dateTime + ' 23:59:59'),
					isOpenTime: Number(this.isOpenTime)
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送！!'
			});
		},
		//导出订单
		async exportOrder() {
			let startDay =
				this.dateTime +
				' ' +
				this.startH +
				':' +
				this.startM +
				':' +
				this.startS;
			let endDay =
				this.dateTime +
				' ' +
				this.endH +
				':' +
				this.endM +
				':' +
				this.endS;
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			let newStarTime = utils.format(
				new Date(this.startTime),
				'yyyy-MM-dd'
			);
			let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//导出一个月的某天的订单
			// let timeArr = this.dateTime.split('-');
			if (this.oneDayOrderList.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出!'
				});
				return false;
			}
			this.exportUrl = await http.exportOneDayOrder(
				{
					data: {
						trueShopId: this.dataDetial
							? this.dataDetial.itemDetial.shopId
							: this.userData.currentShop.id,
						status: this.status,
						startTime:
							this.dateTime == newStarTime
								? this.getTime(startDay)
								: this.getTime(this.dateTime + ' 00:00:00'),
						endTime:
							this.dateTime == newEndTime
								? this.getTime(endDay)
								: this.getTime(this.dateTime + ' 23:59:59'),
						isOpenTime: Number(this.isOpenTime)
					}
				},
				'csv'
			);
		},
		//选择区域
		selectArea() {
			this.tableId = '';
			this.areaList2 = [{ id: '', name: '全部桌台' }];
			let tableList = this.tableList;
			for (let i = 0; i < tableList.length; i++) {
				if (this.areaId == tableList[i].areaId) {
					this.areaList2.push(tableList[i]);
				}
			}
			this.dayPage.page = 1;
			this.getOrderListInDay(this.order.day);
		},
		//选择桌台
		selectTab(res) {
			console.log(res);
			this.dayPage.page = 1;
			this.getOrderListInDay(this.order.day);
		},
		//分页点击
		pageClick: function(e) {
			this.dayPage.page = e;
			this.getOrderListInDay(this.dateTime);
		},
		//每页显示多少条点击
		numChange(e) {
			this.dayPage.num = e;
			this.dayPage.page = 1;
			this.getOrderListInDay(this.dateTime);
		}
	},
	mounted() {
		let userData = storage.session('userShop');
		let order = storage.session('orderOne'); //多天返回单天传递的信息
		// let order = global.orderData.orderOne; //多天返回单天传递的信息
		let titleDetial = storage.session('titleDetial'); //订单详情返回的信息

		let dayPage = { page: 1, num: 10, pageNum: 1 }; //分页信息
		let dataDetial = storage.session('brandDetial'); //品牌进入的信息
		// let isbrandJoin = false;

		// if (dataDetial) {
		// 	//是否从品牌进入的
		// 	isbrandJoin = dataDetial.isbrandJoin;
		// }
		if (titleDetial) {
			dayPage = titleDetial.dayPage;
		}
		this.dataDetial = dataDetial;
		// console.log(this.dataDetial)
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.startTime = order
			? order.startTime
			: new Date().setHours(0, 0, 0, 0);
		this.endTime = order
			? order.endTime
			: new Date().setHours(23, 59, 59, 999);
		this.isOpenTime = order ? order.isOpenTime : true;
		this.dayPage = dayPage;
		this.userData = userData;
		this.order = order;
		this.getPayAreaTableList();
		this.init(); //获取当前时间段内的所有数据
		this.$route.query.arear == 1 ? this.initBtn() : this.initBtn(true);
		sessionStorage.removeItem('order');
		sessionStorage.removeItem('titleDetial');
	},
	components: {
		// calendar: () =>
		// 	import(/*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		orderWin: () =>
			import(/*webpackChunkName: "order_win"*/ 'src/module/statistics/order_win')
		// detailsDes: () =>
		// 	import(/*webpackChunkName: "details_des"*/ 'src/components/details_des'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	}
};
</script>
<style lang="less" scoped>
.order-order-data {
	display: inline-block;
}

.order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 46px;
}

#sta-or-one .selected {
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
}

.button a.select {
	background: orange;
	color: #fff;
}
</style>