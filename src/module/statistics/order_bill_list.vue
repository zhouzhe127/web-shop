<!--
		**挂账统计（单店）
		*
		* 胡江
		* *
		*
-->
<template>
	<section id="orMaRetreat">
		<section v-show="!showDetails">
			<section class="orMaRetreatTime yuChairFix" v-if="!shopName">
				<section class="block-div">
					<el-select v-model="selectedTypeOne" style="width:150px;">
						<el-option v-for="(item,i) in optionsOne" :key="i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<!--<selectBtn @emit="selectTypeOne" :sorts="optionsOne"></selectBtn>-->
				</section>
				<div class="block-div">
					<section class="fl yuChairFix">
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="startTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
						<!--<calendar :time="startTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>-->
					</section>
					<span class="zhi">—</span>
					<section class="fl yuChairFix">
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="endTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
						<!--<calendar :time="endTime" :type="selectedType" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>-->
					</section>
					<span class="order-order-searchA" @click="selectByTime">
						<span class="order-order-search"></span>
					</span>
				</div>
				<section class="block-div" style="line-height: 46px;">
					<div v-on:click="selectBusinessHours" :class="[{'active':isOpenTime},'pickBlu']"></div>
					<span style="font-size: 16px;">按营业时间</span>
				</section>
			</section>
			<section class="orMaRetreatTime yuChairFix" v-if="shopName">
				<div class="block-div" style="font-size: 16px;color: #333333">
					选择店铺：
					<span>{{shopName}}</span>
					<span style="margin: 0 10px">|</span>
					选择时间：
					<span>{{transformTime(sTime)}} - {{transformTime(eTime)}}</span>
				</div>
			</section>
			<section class="orMaRetreatTime yuChairFix">
				<section class="block-div">
					<el-select v-model="selectedTypeTwo" style="width:150px;" @change="selectTypeTwo">
						<el-option v-for="(item,i) in optionsTwo" :key="i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<!--<selectBtn @emit="selectTypeTwo" :sorts="optionsTwo" :name="selectedNameTwo"></selectBtn>-->
				</section>
				<section class="block-div" @click="noData($event)">
					<el-select v-model="billId" style="width:150px;">
						<el-option v-for="(item,i) in optionsThree" :key="i" :label="item.name" :value="item.billId">
						</el-option>
					</el-select>
					<!--<selectBtn @emit="selectTypeThree" :sorts="optionsThree" :name="selectedNameThree"></selectBtn>-->
				</section>
				<section class="block-div">
					<el-select v-model="selectedTypeFour" style="width:150px;" @change="selectTypeFour">
						<el-option v-for="(item,i) in optionsFour" :key="i" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					<!--<selectBtn @emit="selectTypeFour" :sorts="optionsFour"></selectBtn>-->
				</section>
				<div class="block-div">
					<el-input :placeholder="shuName" v-model="optionValue" maxlength="18"></el-input>
					<!--<input class="numbering" type="text" :placeholder="shuName" v-model="optionValue" maxlength="18" />-->
				</div>
				<div class="block-div">
					<el-button v-on:click="getOrderBillList()" type="primary">搜索</el-button>
					<el-button v-on:click="filterReset(true)" type="info">重置</el-button>
				</div>
			</section>
			<section class="orMaRetreatTime yuChairFix" v-if="selectedTypeOne==0">
				<section class="oCont">
					<div class="Box">
						<section v-on:click="getOidList(-1)" class="oDe" v-bind:class="{'act' : status == -1}" style="border-left: none;">全部
						</section>
						<section v-on:click="getOidList(0)" class="oDe" v-bind:class="{'act' : status == 0}">未结算
						</section>
						<section v-on:click="getOidList(1)" class="oDe" v-bind:class="{'act' : status == 1}">已结算
						</section>
					</div>
				</section>
			</section>

			<el-table stripe :row-style="{color:'#f8941f'}" :header-cell-style="{'background-color':'#f5f7fa'}" :data="[totalList]" border>
				<el-table-column min-width="120" align="center" prop="totalDay" label="天数"></el-table-column>
				<el-table-column min-width="120" align="center" prop="orderNum" label="订单数"></el-table-column>
				<el-table-column min-width="120" align="center" prop="originalPrice" label="消费总额" :render-header="renderHeader"></el-table-column>
				<el-table-column min-width="120" align="center" prop="billPrice" label="挂账总额" :render-header="renderHeader"></el-table-column>>
			</el-table>
			<div class="store-list">
				<div class="length">
					挂账统计 · 共
					<span> {{orderCredit.length}} </span>条记录
				</div>
				<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="orderCredit" border>
					<el-table-column show-overflow-tooltip min-width="180" align="center" label="订单号" fixed>
						<template slot-scope="props">
							<span class="light" @click="goDetails(props.row.oid)">{{props.row.oid}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="isSettle" label="订单状态"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="billType" label="挂账类型"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="billName" label="挂账账户"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="personName" label="挂账人"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="createName" label="操作人"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="originalPrice" label="消费金额" :render-header="renderHeader"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="createTime" label="挂账时间"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="updateTime" label="结算时间"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="billPrice" label="挂账金额" :render-header="renderHeader"></el-table-column>
				</el-table>
			</div>

			<!--<table-com :showHand="false" :titleHeight='60' :showTitle="1" :titleData="tableOne" :fixed="0" :widthType="false" :introData="[totalList]" :bannerStyle="{'backgroundColor':'#f2f2f2'}">-->
			<!--<span slot="title-2" slot-scope="props">-->
			<!--<span v-on:click="openDetial(1,$event)" class="detLi">消费总额-->
			<!--<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />-->
			<!--<div v-if="orderAll==1" class="detDiv1">-->
			<!--<i class="detI triright"></i>-->
			<!--<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该时间段内所有商品原价的金额总计（不计入退品金额）</h3>-->
			<!--</div>-->
			<!--</span>-->
			<!--</span>-->
			<!--<span slot="title-3" slot-scope="props">-->
			<!--<span v-on:click="openDetial(2,$event)" class="detLi">挂账总额-->
			<!--<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />-->
			<!--<div v-if="orderAll==2" class="detDiv1">-->
			<!--<i class="detI triright"></i>-->
			<!--<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该时间段内所有订单实际需要支付的金额的总计</h3>-->
			<!--</div>-->
			<!--</span>-->
			<!--</span>-->
			<!--</table-com>-->
			<!--<table-com :showHand="true" :listName="'挂账统计'" :titleHeight='50' :showTitle="1" :titleData="tableTwo" :allTotal="totalList.orderNum" :fixed="1" :widthType="false" :introData="orderCredit" :bannerStyle="{'backgroundColor':'#f2f2f2'}" :listWidth="1200">-->
			<!--<span slot="title-6" slot-scope="props">-->
			<!--<span v-on:click="openDetial(3,$event)" class="detLi">消费金额-->
			<!--<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />-->
			<!--<div v-if="orderAll==3" class="detDiv1">-->
			<!--<i class="detI triright"></i>-->
			<!--<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该笔订单内所有商品原价的金额总计（不计入退品金额）</h3>-->
			<!--</div>-->
			<!--</span>-->
			<!--</span>-->
			<!--<span slot="title-9" slot-scope="props">-->
			<!--<span v-on:click="openDetial(4,$event)" class="detLi">挂账金额-->
			<!--<img class="detImg1" src="../../res/icon/orderdetial18.png" style="vertical-align: middle;" />-->
			<!--<div v-if="orderAll==4" class="detDiv1">-->
			<!--<i class="detI triright"></i>-->
			<!--<h3 class="detH3" style="color: #e6e6e7;white-space: normal;">该笔订单实际需要支付的金额的总计</h3>-->
			<!--</div>-->
			<!--</span>-->
			<!--</span>-->
			<!--<span slot="con-0" slot-scope="props">-->
			<!--<a v-on:click="goDetails(props.data.oid,props.index)" style="color:#21a7de;" href="javascript:void(0)">{{props.data.oid}}</a>-->
			<!--</span>-->
			<!--</table-com>-->

			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" :page-count="total" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]">
			</el-pagination>

		</section>
		<div v-if="showDetails">
			<orderDetail :detail="detail" :isDelete="false" @detailShow="getDetailShow"></orderDetail>
		</div>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			orderCredit: [], //挂账列表数据
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(0, 0, 0, 0), //日期组件的结束时间
			selectedType: 0,

			page: 1, // 当前页
			num: 10, // 每一页多少条数据
			total: 1, // 总共有多少页

			showDetails: false, // 显示详情
			optionValue: '', // 搜索条件的值

			totalList: {
				totalDay: 1,
				orderNum: 0,
				originalPrice: 0, //消费总额
				billPrice: 0 //挂账总额
			}, //总计数据

			optionsOne: [
				{ name: '挂账时间', id: 0 },
				{ name: '结算时间', id: 1 }
			],
			selectedTypeOne: 0, //对应循序  0:挂账时间

			optionsTwo: [
				{ name: '全部', id: 0 },
				{ name: '个人账户', id: 1 },
				{ name: '企业账户', id: 2 }
			],
			selectedTypeTwo: 0, //对应循序  0:全部

			optionsThree: [],
			billId: 0, //挂账账户id
			allBill: [], //所有挂账账户

			optionsFour: [
				{ name: '订单号', id: 0 },
				{ name: '挂账人名称', id: 1 },
				{ name: '操作人名称', id: 2 }
			],
			selectedTypeFour: 0,

			shuName: '请输入订单号',

			status: -1, //结账类型
			isOpenTime: true, //是否按营业时间

			userdata: {}
		};
	},
	//    props: {
	//	      sId:String,//店铺id
	//        shopName:String,//店铺名
	//        sTime:Number,//开始时间
	//        eTime:Number,//结束时间
	//        gType:Number,//挂账类型
	//    },
	props: ['sId', 'shopName', 'sTime', 'eTime', 'gType', 'isOpen'],
	created() {
		this.userdata = storage.session('userShop');
		if (this.shopName) {
			this.startTime = this.sTime;
			this.endTime = this.eTime;
			this.selectedTypeOne = this.gType;
			this.isOpenTime = Boolean(this.isOpen);
			this.$store.commit('setPageTools', [
				{
					name: '返回',
					className: ['export-btn'],
					fn: () => {
						let obj = {
							startTime: this.sTime,
							endTime: this.eTime,
							operateTime: this.gType
						};
						this.$emit('return', obj);
					}
				}
			]);
		}
		//		this.tableOne = [
		//			{
		//				titleName: '天数',
		//				dataName: 'totalDay',
		//				conStyle: { color: '#ffa627' }
		//			},
		//			{
		//				titleName: '订单数',
		//				dataName: 'orderNum',
		//				conStyle: { color: '#ffa627' }
		//			},
		//			{
		//				titleName: '消费总额',
		//				dataName: 'originalPrice',
		//				conStyle: { color: '#ffa627' }
		//			},
		//			{
		//				titleName: '挂账总额',
		//				dataName: 'billPrice',
		//				conStyle: { color: '#ffa627' }
		//			}
		//		];
		//		this.tableTwo = [
		//			{
		//				titleName: '订单号',
		//				dataName: 'oid',
		//				titleStyle: { width: '180px' },
		//				conStyle: { color: '#21a7de' }
		//			},
		//			{
		//				titleName: '订单状态',
		//				titleStyle: { width: '80px' },
		//				dataName: 'isSettle'
		//			},
		//			{
		//				titleName: '挂账类型',
		//				titleStyle: { width: '80px' },
		//				dataName: 'billType'
		//			},
		//			{ titleName: '挂账账户', dataName: 'billName' },
		//			{ titleName: '挂账人', dataName: 'personName' },
		//			{ titleName: '操作人', dataName: 'createName' },
		//			{ titleName: '消费金额', dataName: 'originalPrice' },
		//			{ titleName: '挂账时间', dataName: 'createTime' },
		//			{ titleName: '结算时间', dataName: 'updateTime' },
		//			{ titleName: '挂账金额', dataName: 'billPrice' }
		//		];
	},
	destroyed() {
		this.$store.commit('setPageTools', []);
	},
	beforeMount() {
		this.billGetBillNames();
		this.getOrderBillList();
		//		document.onclick = () => {
		//			this.orderAll = 0;
		//		};
	},
	methods: {
		renderHeader(h, { column }) {
			let titleName = '';
			let label = column.label;
			let property = column.property;
			if (label == '消费总额' && property == 'originalPrice') {
				titleName =
					'该时间段内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '挂账总额' && property == 'billPrice') {
				titleName = '该时间段内所有订单实际需要支付的金额的总计';
			} else if (label == '消费金额' && property == 'originalPrice') {
				titleName =
					'该笔订单内所有商品原价的金额总计（不计入退品金额）';
			} else if (label == '挂账金额' && property == 'billPrice') {
				titleName = '该笔订单实际需要支付的金额的总计';
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
		//是否按营业时间
		selectBusinessHours() {
			this.isOpenTime = !this.isOpenTime;
		},
		//更改结账类型
		getOidList(i) {
			this.status = i;
			this.page = 1;
			this.getOrderBillList();
		},
		//重置
		filterReset(blo) {
			this.selectedTypeOne = 0;
			this.selectedTypeTwo = 0;
			this.billId = 0;
			this.selectedTypeFour = 0;
			this.shuName = '请输入订单号';

			if (blo) {
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(23, 59, 59, 999);
			}

			this.status = -1;
			this.optionValue = '';
			this.isOpenTime = 1;

			this.page = 1;
			this.num = 10;
			this.total = 1;

			this.getOrderBillList();
		},
		//挂账账户类型
		selectTypeTwo() {
			this.billId = 0;
			this.changType();
		},
		noData(e) {
			e.stopPropagation();
			if (this.optionsThree.length == 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '该分类下没有挂账账户'
				});
			}
		},
		//搜检索条件
		selectTypeFour() {
			switch (this.selectedTypeFour + '') {
				case '0':
					this.shuName = '请输入订单号';
					break;
				case '1':
					this.shuName = '请输入挂账人名';
					break;
				case '2':
					this.shuName = '请输入操作人名';
					break;
			}
		},
		//获取所有的挂账账户
		async billGetBillNames() {
			this.allBill = await http.billGetBillNames({
				data: {
					shopId: this.sId ? this.sId : this.userdata.currentShop.id
				}
			});
			this.changType();
		},
		//改变挂账账户类型
		changType() {
			let tempGoods = [];
			switch (this.selectedTypeTwo + '') {
				case '0':
					tempGoods = this.allBill;
					break;
				case '1':
					tempGoods = this.allBill.filter(ele => {
						return ele.type == 1;
					});
					break;
				case '2':
					tempGoods = this.allBill.filter(ele => {
						return ele.type == 2;
					});
					break;
			}
			this.optionsThree = utils.deepCopy(tempGoods);
			this.optionsThree.unshift({ billId: 0, name: '全部' });
		},
		//验证
		checkDate() {
			// let st = this.startTime;
			// let firstDay = new Date(Number(this.endTime)).setDate(1);
			// firstDay = new Date(firstDay).setHours(0, 0, 0, 0); // 按照结束时间的第一天计算
			// if (+st < +firstDay) {
			// 	this.$store.commit('setWin', {
			// 		title: '提示信息',
			// 		content: '很抱歉,选择的时间段不能跨月'
			// 	});
			// 	return true;
			// }
			if (
				parseInt(this.startTime / 1000) > parseInt(this.endTime / 1000)
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始时间不能大于结束时间'
				});
				return true;
			}
		},
		//查询订单
		async getOrderBillList() {
			if (this.checkDate()) return;
			let data = await http.billstatisticsGetList({
				data: {
					startTime: this.startTime / 1000,
					endTime: this.endTime / 1000 + 24 * 60 * 60 - 1,
					page: this.page + 0,
					num: this.num,
					isOpenTime: Number(this.isOpenTime),
					operateTime: this.selectedTypeOne, //按操作时间(0.挂账时间 1.结算时间)
					billType: this.selectedTypeTwo, //挂账账户类型(1.个人账户 2.企业账户)
					billId: this.billId, //挂账账户ID
					isSettle: this.status, //是否已结清(-1.全部 0.未结清 1.已结清)
					optionKey: this.selectedTypeFour + 1, //搜检索条件(1.订单号 2.挂账人名称 3.操作人名称)
					optionValue: this.optionValue, //搜索条件的值(1.订单号值 2.挂账人名称值 3.操作人名称值)
					shopId: this.sId ? this.sId : this.userdata.currentShop.id
				}
			});
			this.totalList = data.total;
			//			this.totalList.totalDay = Math.ceil(
			//				(this.endTime - this.startTime) / (24 * 3600 * 1000)
			//			);
			let list = data.list;
			if (!list) {
				return;
			}
			for (let i = 0; i < list.length; i++) {
				if (list[i].updateTime == 0) {
					list[i].updateTime = '--';
				} else {
					list[i].updateTime = utils.format(
						new Date(list[i].updateTime * 1000),
						'yyyy-MM-dd hh:mm'
					);
				}
				list[i].createTime = utils.format(
					new Date(list[i].createTime * 1000),
					'yyyy-MM-dd hh:mm'
				);
				list[i].isSettle = list[i].isSettle == 0 ? '未结清' : '已结清';
				list[i].billType =
					list[i].billType == 1 ? '个人账户' : '企业账户';
			}
			this.orderCredit = list;
			this.total = data.pageNum;
		},
		//按时间搜索
		selectByTime() {
			this.filterReset(false);
		},

		//每页显示多少行
		handleSizeChange(n) {
			this.num = n;
			this.page = 1;
			this.getOrderBillList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getOrderBillList();
		},
		//去订单详情
		async goDetails(oid) {
			let res = await http.OrderstatisticsBillDelite({
				data: {
					trueShopId: this.sId
						? this.sId
						: this.userdata.currentShop.id,
					oid: oid
				}
			});
			if (res) {
				this.detail = res;
				this.showDetails = true;
			}
		},
		//订单详情返回
		getDetailShow() {
			this.showDetails = false;
			if (this.shopName) {
				this.$store.commit('setPageTools', [
					{
						name: '返回',
						className: ['export-btn'],
						fn: () => {
							let obj = {
								startTime: this.sTime,
								endTime: this.eTime,
								operateTime: this.gType
							};
							this.$emit('return', obj);
						}
					}
				]);
			}
		},
		//把时间戳转化成***年**月**日
		transformTime(time) {
			return utils.format(new Date(Number(time)), 'yyyy年MM月dd日');
		}
	},
	components: {
		orderDetail: () =>
			import(/*webpackChunkName: "delete_detail"*/ './delete_detail')
	}
};
</script>

<style scoped lang="less">
#orMaRetreat {
	position: relative;
	.yuChairFix:after {
		content: '';
		display: block;
		clear: both;
	}
	.store-list {
		width: 100%;
		border-bottom: none;
		margin: 15px 0;
		.length {
			height: 50px;
			line-height: 50px;
			border: 1px solid #ebeef5;
			padding-left: 10px;
			border-bottom: none;
			font-size: 16px;
			span {
				display: inline-block;
				margin: 0 5px;
				color: #e1bb4a;
				font-size: 16px;
			}
		}
		.light {
			color: #e1bb4a;
			cursor: pointer;
		}
	}
	.orMaRetreatTime {
		margin-bottom: 10px;
		.block-div {
			float: left;
			margin-right: 20px;
			.zhi {
				text-align: center;
				width: 25px;
				height: 40px;
				line-height: 40px;
				display: block;
				float: left;
			}
			.order-order-searchA,
			.order-order-search {
				float: left;
				width: 40px;
				height: 40px;
				background-color: #e1bb4a;
				cursor: pointer;
			}
			.order-order-search {
				background: url(../../res/images/search.png) center center
					no-repeat;
			}
			.order-order-searchA {
				height: 40px;
			}
			.order-order-searchA:hover {
				background-color: #e1bb4a;
				transition: background-color ease-in-out 0.2s;
			}
			.order-order-searchA:active {
				background-color: #e1bb4a;
			}
			.pickBlu {
				width: 20px;
				height: 20px;
				cursor: pointer;
				border: 1px solid #e1bb4a;
				margin: 13px 10px;
				float: left;
			}
			.active {
				background: url(../../res/icon/selected.png) center center
						no-repeat,
					#e1bb4a;
			}
		}
	}
	.oCont {
		.Box {
			width: 360px;
			height: 42px;
			cursor: pointer;
			box-sizing: border-box;
			float: left;
			.act {
				background-color: #e1bb4a;
				color: #fff;
			}
		}
		.oDe {
			width: 30%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			float: left;
			box-sizing: border-box;
			color: #000000;
			margin-right: 10px;
			background-color: #f2f2f2;
			border-radius: 5px;
		}
	}
}
</style>
