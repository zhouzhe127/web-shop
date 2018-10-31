<template>
	<div id="statistics-order" v-cloak>
		<div class="button">
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
					<section class="statisticsList fl">
						<el-date-picker :clearable="false" v-model="startTime" type="datetime" placeholder="选择日期" style="width:200px;">
						</el-date-picker>
						<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
						<el-date-picker :clearable="false" v-model="endTime" type="datetime" placeholder="选择日期" style="width:200px;">
						</el-date-picker>
						<el-button @click="sreachOrderInDays" type="primary" icon="el-icon-search">搜索</el-button>
					</section>
				</li>
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
				<!-- <li v-if="!isBrand" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" style="width:20px;height:20px;cursor: pointer;border:1px solid #28A8E0;margin:13px 10px;float: left;"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</li> -->
				<li>
					<section class="oDe" style="width:250px;float:left;">
						<el-input placeholder="请输入订单号" maxlength="18" v-model="orderNumber" clearable class="input-with-select">
							<el-button slot="append" icon="el-icon-search" @click="getInfoByOrder"></el-button>
						</el-input>
					</section>
				</li>
			</ul>
		</div>
		<div>
			<el-table stripe :row-style="{color:'#f8941f'}" :header-cell-style="{'background-color':'#f5f7fa'}" @header-click="headClick" :data="newpayTotalNum" border style="width: 100%">
				<el-table-column width="250" align="center" prop="totalDay" label="天数"></el-table-column>
				<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
				<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsTotalNum" label="商品总数"></el-table-column>
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
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderListInDays" border style="width: 100%">
					<el-table-column fixed width="100" align="center" prop="shopName" label="操作">
						<template slot-scope="scope">
							<span style="color:#00AAE7;cursor: pointer;" @click="openDayDetial(scope.row.date)">查看详情</span>
						</template>
					</el-table-column>
					<el-table-column fixed width="150" align="center" prop="date" label="日期"></el-table-column>
					<el-table-column min-width="100" align="center" prop="orderNum" label="订单数"></el-table-column>
					<el-table-column min-width="80" align="center" prop="person" label="人数"></el-table-column>
					<el-table-column min-width="120" :render-header="renderHeader" show-overflow-tooltip align="center" prop="goodsTotalNum" label="商品数"></el-table-column>
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
					<el-table-column min-width="120" show-overflow-tooltip align="center" prop="settlePrice" label="挂账结清金额">
						<template slot-scope="scope">
							<span>{{parseFloat(scope.row.settlePrice).toFixed(2)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</section>

		</div>
		<!--分页-->
		<div style="margin:20px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="allDayPage.page" :page-count="allDayPage.pageNum" :page-size="allDayPage.num" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<!-- <div style="float: left;margin-left: 30px;margin-top:20px;">
			<pageElement @pageNum="getOrderListMonPage" :page="allDayPage.page+1" :total="allDayPage.pageNum" :num="allDayPage.num" :isNoJump='true'></pageElement>
		</div> -->
		<!-- <div class="order-operation">
			<div style="">
				<a v-on:click='exportOrder($event)' :href="exportUrl" class="blue" style="width:100px;text-align: center;height: 40px;line-height: 40px;">导出</a>
			</div>
			<div v-if="!isBrand" v-on:click='printOrder()' style="border: 1px solid #27A8DF;color: #27A8DF;cursor: pointer;">打印</div>
			<div v-if="isBrand" class="return" v-on:click='returnBrand()' style="border: 1px solid #FF8C01;color: #FF8C01;cursor: pointer;">返回</div>
		</div>   -->
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
			// userData: {},
			dataDetial: {},
			orderMore: {},
			titleDetial: {},
			order: {},
			shopId: '',
			isBrand: '', //品牌判断
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			allDayPage: {
				page: 1,
				num: 10,
				pageNum: 1
			}, //多天分页信息
			isOpenTime: '', //是否按营业时间，默认 false 0 否
			orderNumber: null, //订单号
			payTotalNum: {}, //当天或者多天的数据总和
			newpayTotalNum: [], //当天或者多天的数据总和
			orderListInDays: [], //时间段内每天的订单列表
			// showWidth: 2140, //长度

			// payLsZero: false, //所有的支付方式是否显示
			status: 4, //订单状态(3:未结账，4 ： 已结账， 6 ： 挂账)
			exportUrl: 'javascript:void(0);',
			// isZeroPays: [], //支付方式和为0的列表
			preferentialBounced: false, //优惠弹框
			title: null, //优惠详情的弹框标题
			// startObj: {},
			// endObj: {},
			paymentList: [{ num: 0, paymentName: '' }],
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
					'该时间段的商品总数包含了订单中所有的商品数量（包括赠品和退品）';
			}
			if (label == '商品数' && property == 'goodsTotalNum') {
				titleName =
					'该日的商品数包含了订单中所有的商品数量（包括赠品和退品）';
			} else if (label == '销量' && property == 'salesNum') {
				titleName =
					'该时间段已销售的数量（不包含退品数）公式：商品总数-退品数=销量';
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
				titleName = '该时段内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '消费金额' && property == 'originalPrice') {
				titleName = '该日内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '入账总额' && property == 'paymentPrice') {
				titleName =
					'该时间段中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '入账金额' && property == 'paymentPrice') {
				titleName =
					'该日中实际收入的金额（不计入未入实账的支付方式的金额）';
			} else if (label == '会员充值' && property == 'memberRecharge') {
				titleName = '该时段内会员充值总计(不计入消费总额及入账总额中)';
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
		},
		headClick(column) {
			if (column.label == '优惠总额' && column.property == 'discount') {
				this.openDiscount(this.payTotalNum);
			}
		},
		//可以做统一，但为了后期增加需求，暂时分开
		//按类型筛选
		selectType(){
			if(this.conType == '0'){
				this.selectTypeTwo();
			}
		},
		//按日别筛选-自然日-营业时间
		selectTypeTwo(){
			this.getOrderListInDays();
		},
		//按交接班筛选，
		selectTypeBan(){
			this.getOrderListInDays();
		},
		//获取交接班班次信息
		async getChangeShifts() {
			let res = await http.getCondition({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId
				}
			});
			this.shiftList = res.changeShifts;
		},
		//获取店铺基本信息
		async baseGet() {
			this.baseDetial = await http.baseGet({
				data: { shopId: this.shopId }
			});
		},
		initBtn(flag) {
			let arr = [];
			if (!flag) {
				arr = [
					{
						name: '返回',
						style: {
							backgroundColor: '#fff',
							border: '1px solid #ff8c01',
							color: '#ff8c01'
						},
						fn: () => {
							this.returnBrand();
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
			}
			if (!this.isBrand) arr.splice(0, 1); //非品牌进入，去掉返回
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
		//转化时间戳，兼容谷歌 IE
		// getTime: function(day) {
		// 	let re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(
		// 		day
		// 	);
		// 	return (
		// 		new Date(
		// 			re[1],
		// 			(re[2] || 1) - 1,
		// 			re[3] || 1,
		// 			re[4] || 0,
		// 			re[5] || 0,
		// 			re[6] || 0
		// 		).getTime() / 1000
		// 	);
		// },
		//时间戳转年月日
		timeToday: function(time) {
			return utils.format(new Date(time), 'yyyy年MM月dd日');
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
				// this.startTime = this.endTime - timer + 24 * 60 * 60 * 1000 + 1000;
				return false;
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
			// if(this.conType=='1'&&this.conShifts == ''){
			// 	this.$store.commit('setWin', {
			// 		title: '操作提示',
			// 		content: '交接班请选择班次!'
			// 	});
			// 	return false;
			// }
			this.allDayPage.page = 1; //搜索日期按钮，页数为0
			this.getOrderListInDays();
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
						: this.shopId,
					oid: oid
				}
			});
			res.oidDetial = 'order-more'; //自定义商品统计特有标记
			res.titleDetial = {
				// shopDetialFade: shopDetialFade, //保存品牌进入单店的数据，返回品牌时用到
				// shopId : shopDetialFade ? shopDetialFade.shopId : userData.currentShop.id,//保存品牌下进来的门店id
				startTime: this.startTime,
				endTime: this.endTime,
				dayPage: this.dayPage,
				isOpenTime: this.conSize
			};
			storage.session('orderDetial', res);
			this.$router.push({
				path: '/admin/orderStatistics/orderDetail',
				query: this.$route.query
			});
		},
		//获取时间段内 订单列表
		async getOrderListInDays() {
			let startTime = new Date(this.startTime).getTime();
			let endTime = new Date(this.endTime).getTime();
			this.startH = utils.format(startTime, 'hh');
			this.startM = utils.format(startTime, 'mm');
			this.startS = utils.format(startTime, 'ss');
			this.endH = utils.format(endTime, 'hh');
			this.endM = utils.format(endTime, 'mm');
			this.endS = utils.format(endTime, 'ss');
			if (
				this.startH * 1 > 0 ||
				this.startM * 1 > 0 ||
				this.startS * 1 ||
				this.endH * 1 < 23 ||
				this.endM * 1 < 59 ||
				this.endS * 1 < 59
			) {
				this.isOpenTime = false;
			}
			let res = await http.more({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(startTime / 1000),
					endTime: parseInt(endTime / 1000),
					isOpenTime: Number(this.conSize),
					page: this.allDayPage.page,
					num: this.allDayPage.num,
					type:this.conType,//0代表按自然日，1代表按交接班
					typeId:this.conType == '0'?this.conSize:this.conShifts//对应type的id，type为1的时候，该字段为班次id
				}
			});
			let ArrNoZero = [];
			this.newpayTotalNum = [];
			if (res && res.total && res.total.paymentList) {
				this.payTotalNum = res.total;
				this.newpayTotalNum.push(this.payTotalNum);
				this.allDayPage.pageNum = res.pageNum;
				this.orderListInDays = res.list;
				//对支付方式为0的进行操作
				let arr = res.total.paymentList;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].paymentName == '该支付方式被删除') {
						arr.splice(i, 1);
						i--;
					} else if (arr[i].num > 0) {
						ArrNoZero.push(arr[i]);
					}
				}
				this.paymentList = ArrNoZero;
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
				// console.log(res.list);
			}
		},
		//打开优惠详情
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
		init: function() {
			//如果存在从品牌进入、单天返回则请求多天接口，else进行时间判断
			if (
				this.orderMore ||
				this.dataDetial ||
				this.order ||
				this.titleDetial
			) {
				this.getOrderListInDays();
			} else {
				let startTime = new Date(this.startTime);
				let endTime = new Date(this.endTime);

				let startYear = utils.format(startTime, 'yyyy'),
					startMonth = utils.format(startTime, 'MM'),
					startDay = utils.format(startTime, 'dd'),
					endYear = utils.format(endTime, 'yyyy'),
					endMonth = utils.format(endTime, 'MM'),
					endDay = utils.format(endTime, 'dd');
				//搜索的若为单天，则直接进入当天的订单统计
				if (
					startYear == endYear &&
					startMonth == endMonth &&
					startDay == endDay
				) {
					let detial = {}; //要传的数据
					detial = {
						name: 'order-one', //外卖的关键表示
						day: startYear + '-' + startMonth + '-' + startDay, //日期，注意---和从查看详情进入传的值不一样
						startTime: this.startTime,
						endTime: this.endTime,
						isOpenTime: this.conSize,
						allDayPage: this.allDayPage //多天分页信息
					};
					storage.session('orderOne', detial);
					this.$router.push({
						path: '/admin/orderStatistics/orderOne',
						query: this.$route.query
					});
				}
			}
		},
		//打印订单
		async printOrder() {
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以打印!'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				return false;
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
			await http.printMore({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.conSize)
				}
			});
			this.$store.commit('setWin', {
				title: '操作提示',
				content: '打印数据已发送!'
			});
		},
		//导出订单
		async exportOrder() {
			if (this.orderListInDays.length == 0) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '没有订单可以导出!'
				});
				return false;
			}
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '操作提示',
					content: '最大只能查询三个月时间!'
				});
				return false;
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
			//判断多天的进入，中间的搜索天数从0.0.0到23.59.59
			// let newStarTime = utils.format(
			// 	new Date(this.startTime),
			// 	'yyyy-MM-dd'
			// );
			// let newEndTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
			//导出一个月的所有订单
			this.exportUrl = await http.exportMoreDayOrder({
				data: {
					trueShopId: this.dataDetial
						? this.dataDetial.itemDetial.shopId
						: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					isOpenTime: Number(this.conSize)
				}
			});
		},
		numChange(res) {
			this.allDayPage.num = res;
			this.allDayPage.page = 1;
			this.getOrderListInDays();
		},
		pageClick(res) {
			this.allDayPage.page = res;
			this.getOrderListInDays();
		},
		//通过多天的查看详情进入当天页面
		openDayDetial: function(time) {
			this.getOrderListInDay(time);
		},
		//点击查看某天的数据
		getOrderListInDay: function(time) {
			let detial = {}; //要传的数据
			detial = {
				name: 'order-one', //外卖的关键表示
				day: time, //日期
				startTime: this.startTime,
				endTime: this.endTime,
				isOpenTime: this.conSize,
				allDayPage: this.allDayPage //多天分页信息
			};
			this.$route.query.arear = 1;
			storage.session('orderOne', detial);
			this.$router.push({
				path: '/admin/orderStatistics/orderOne',
				query: this.$route.query
			});
		},
		//从多日返回品牌订单
		returnBrand: function() {
			storage.session('brandorderDetial', this.dataDetial);
			this.$router.push({
				path: '/admin/orderStatistics',
				query: this.$route.query
			});
			setTimeout(function() {
				storage.session('brandorderDetial', '');
			}, 500);
		}
	},
	beforeDestroy() {
		this.initBtn(true);
	},
	mounted() {
		let userData = storage.session('userShop');
		let shopId;
		if (userData && userData.accessToken && userData.currentShop) {
			shopId = userData.currentShop.id;
		}

		let startTime = new Date().setHours(0, 0, 0, 0);
		let endTime = new Date().setHours(23, 59, 59, 999);
		let isOpenTime = true;
		let allDayPage = {
			page: 1,
			num: 10,
			pageNum: 1
		};
		let order = storage.session('orderTakeout'); //从外卖返回传递的数据
		let orderMore = storage.session('orderMore'); //从单天返回传递的数据
		let dataDetial = storage.session('brandDetial'); //从品牌进入传递的数据
		let titleDetial = storage.session('titleDetial'); //订单详情返回的信息
		// let isbrandJoin = false;
		// if (dataDetial) {
		// 	//是否从品牌进入的
		// 	isbrandJoin = dataDetial.isbrandJoin;
		// }
		//若从品牌进入再切换单店则清除缓存
		if (userData.currentShop.ischain !== '3') {
			dataDetial = '';
			storage.session('brandDetial', '');
		}
		if (orderMore) {
			//单天返回
			startTime = orderMore.startTime;
			endTime = orderMore.endTime;
			isOpenTime = orderMore.isOpenTime;
			allDayPage = orderMore.allDayPage;
		} else if (dataDetial) {
			//品牌进入返回
			startTime = dataDetial.startTime;
			endTime = dataDetial.endTime;
			isOpenTime = dataDetial.isOpenTime;
		} else if (order) {
			//外卖返回
			startTime = order.startTime;
			endTime = order.endTime;
			isOpenTime = order.isOpenTime;
		} else if (titleDetial) {
			//详情返回
			startTime = titleDetial.startTime;
			endTime = titleDetial.endTime;
			isOpenTime = titleDetial.isOpenTime;
		}
		this.startTime = startTime;
		this.endTime = endTime;
		this.isOpenTime = isOpenTime;
		this.dataDetial = dataDetial;
		this.orderMore = orderMore;
		this.titleDetial = titleDetial;
		this.order = order;
		this.isBrand = userData.currentShop.ischain == '3' ? true : false;
		this.allDayPage = allDayPage;
		this.shopId = shopId;
		console.log('走了多日界面');
		this.init(); //获取当前时间段内的所有数据
		sessionStorage.removeItem('orderTakeout');
		sessionStorage.removeItem('orderMore');
		sessionStorage.removeItem('titleDetial');
		this.initBtn();
		this.getChangeShifts();
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
.table-container {
	overflow: auto;
}

.order-order-data {
	display: inline-block;
}

.order-order-data ul li {
	float: left;
	margin: 5px;
}

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
}

.button a.select {
	background: orange;
	color: #fff;
}
</style>