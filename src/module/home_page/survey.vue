<!--
	**概况首页
	*
	* 胡江
	* *
	*
-->
<template>
	<section id="survey">
		<section class="top">
			<span style="margin-right: 100px;">
				<span style="font-weight: bold;font-size: 16px">HI,
					<span style="color: #2980B9;font-size: 16px">{{userData.user.name}}</span>
				</span>
				欢迎回来！
			</span>
			<span>今天是：
				<span style="font-weight: bold;font-size: 16px">{{newTime}}</span>
			</span>
		</section>
		<div style="height: 10px"></div>
		<div v-if="coverShow&&!isContent" class="loding-cover"><img src="../../res/images/preloader.gif" /></div>
		<div class="left" v-if="!coverShow&&!isContent" :style="{ width:(noticeList.length>0||updateList.length>0)? '76%' : '90%' }">
			<div style="margin-bottom:15px">
				<div class="specific">
					<div v-for="(item,index) in eachList" :key="index">
						<div class="block" :style="{marginRight:(index==3||index==1)?'0%':'4%'}" v-if="item.data.length>=2">
							<div class="name">
								{{item.name}}
								<el-tooltip class="item" effect="dark" :content="tipsContent[item.field]" placement="right-start" v-if="item.iconShow">
									<em class="help-icon"></em>
								</el-tooltip>
							</div>
							<div class="total">
								<P class="num">
									<span>{{item.total}}</span>
									<em v-if="item.iconShow">.{{salesPoint[item.field]}}</em>
								</P>
							</div>
							<div class="branch">
								<div class="box" v-for="(v,index) in item.data" :style="{ width:(item.data.length==2)? '50%' : (item.data.length==3?'33.3%':'25%') }" :key="index">
									<span>{{v.name}}</span>
									<p :title="v.showData">{{v.showData}}</p>
								</div>
							</div>
						</div>
						<div class="block" :style="{marginRight:(index==3||index==1)?'0%':'4%'}" v-if="item.data.length<2">
							<div class="name">
								{{item.name}}
								<el-tooltip class="item" effect="dark" :content="tipsContent[item.field]" placement="right-start" v-if="item.iconShow">
									<em class="help-icon"></em>
								</el-tooltip>
							</div>
							<div class="totalOne">
								<P class="num">
									<span style="font-size: 16px;margin-right: 5px;" v-if="item.data.length==1">{{item.data[0].name}}</span>
									<span>{{item.total}}</span>
									<em v-if="item.iconShow">.{{salesPoint[item.field]}}</em>
								</P>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--饼图-->
			<pieChart :pie="pie" :echarts="echarts" :isBrand="isBrand" v-if="echarts"></pieChart>
			<!--柱状图-->
			<barChart :bar="bar" :echarts="echarts" :shopList="shopList" :shopIds="shopIds" v-if="isBrand &&echarts&&userShopIdStr.length>1" style="margin-bottom: 40px"></barChart>
			<!--条形图-->
			<lineChart :line="line" :echarts="echarts" v-if="echarts&&!isBrand" style="margin-bottom: 40px"></lineChart>
		</div>
		<div class="isContent" v-if="isContent">
			<div class="head">{{noticeContent.title}}
				<span class="back" @click="toBack()">
					返回
				</span>
			</div>
			<div class="content">
				<div>
					<span v-html="line2br(noticeContent.content)"></span>
				</div>
				<div class="time">{{noticeContent.time}}</div>
			</div>
		</div>
		<div class="right">
			<section class="right-content" v-if="noticeList.length>0">
				<div class="head">通知</div>
				<div class="content">
					<section v-for="(item,index) in noticeList" :key="index">
						<div>{{item.time}}</div>
						<div :class="{'title ':item.isContent}" style="margin-bottom: 15px" @click="toContent(item)">{{item.title}}</div>
					</section>
				</div>
			</section>
			<section class="right-two" v-if="updateList.length>0">
				<div class="head">近期更新</div>
				<div class="content"></div>
			</section>
		</div>
	</section>
</template>

<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data() {
		return {
			echarts: null,
			newTime: '', //现在的时间
			isBrand: false, //是否是品牌

			eachList: [
				{
					name: '营业总额（元）',
					field: 'turnover',
					iconShow: true,
					data: []
				},
				{
					name: '优惠总额（元）',
					field: 'discount',
					iconShow: true,
					data: []
				},
				{
					name: '入账金额（元）',
					field: 'amount',
					iconShow: true,
					data: []
				},
				{ name: '订单量（单）', field: 'orderNum', data: [] }
			],
			//方块的原始数据
			sales: {
				eatIn: {
					//堂吃
					turnover: 0, //营业总额
					amount: 0, //入账金额
					orderNum: 0, //订单量
					discount: 0 //优惠总额
				},
				takeout: {
					//外卖
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0
				},
				quickPayment: {
					//快捷支付
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0
				},
				total: {
					//总值
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0
				}
			},
			salesPoint: {
				//小数点后两位
				turnover: '00',
				discount: '00',
				amount: '00'
			},

			tipsContent: {
				turnover:
					'该时间段内所有堂吃商品原价+堂吃服务费+外卖商品原价 = 营业总额（不计入退品）',
				discount:
					'活动优惠券、店内优惠（整单减免、整单折扣、整单强折、单品减免、单品折扣、赠菜金额、积分抵扣）以及外卖活动优惠金额',
				amount:
					'入账总额 = 营业总额 - 优惠总额（不计入未入账的支付方式的金额）'
			},

			coverShow: true, //数据加载时的动画
			pie: [], //饼图的原始数据
			oneDiscount: {}, //详细的优惠金额
			line: [], //线图的原始数据
			bar: {}, //柱状图数据

			userShopIdStr: [], //品牌下所有店铺id
			shopIds: [], //用-链接是品牌下id
			shopList: [], //传递给柱状图页面

			noticeList: [], //通知列表
			updateList: [], //更新列表
			noticeContent: {}, //通知内容
			isContent: false //展示通知内容

			//            brandId:''
		};
	},
	async created() {
		this.newTime = utils.format(new Date().getTime(), 'yyyy-MM-dd');
		this.userData = storage.session('userShop'); //获取店铺数据
		let v = this.userData.currentShop;
		this.isBrand = v.ischain == '3' ? true : false; //是否为品牌
		//        this.brandId=(v.ischain==0||v.ischain==3)?v.id:v.brandId;
		//        console.log(this.brandId);
		if (this.isBrand) {
			let liId = storage.session('shopList');
			console.log(liId);
			if (liId.length > 0) {
				for (let item of liId) {
					//组合店铺列表
					this.userShopIdStr.push(item.id);
					let obj = {
						id: item.id,
						name: item.shopName
					};
					this.shopList.push(obj);
				}
				//品牌下店铺id拼接
				for (let i = 0; i < this.userShopIdStr.length / 8; i++) {
					this.shopIds.push(
						this.userShopIdStr.slice(i * 8, i * 8 + 8)
					);
				}
			} else {
				this.shopIds = [[]];
				this.shopList = {};
			}
			console.log(this.shopIds);
		}
		this.echarts = await import(/*webpackChunkName: 'echarts'*/ 'src/verdor/echarts');
		this.init();
		this.getNoticeList();
	},
	methods: {
		//获取通知列表
		async getNoticeList() {
			let data = await http.getSurveyNoticeList({
				data: {
					//				    shopId:this.brandId
				}
			});
			if (data) {
				this.noticeList = data.map(v => {
					v.time = utils.format(v.time, 'yyyy-MM-dd');
					if (v.isContent) {
						v.title = v.title + '>>';
					}
					return v;
				});
			}
		},
		//跳转到内容中心
		async toContent(v) {
			if (!v.isContent) {
				return;
			}
			let res = await http.noticeSurveyGetOne({
				data: {
					id: v.id
					//                    shopId:this.brandId
				}
			});
			if (res) {
				this.isContent = true;
				res.time = utils.format(res.time, 'yyyy-MM-dd');
				this.noticeContent = res;
			}
		},
		//返回
		toBack() {
			this.isContent = false;
		},
		line2br(text) {
			return text.split('\n').join('<br/>');
		},

		init() {
			if (this.isBrand) {
				this.getBrandData();
			} else {
				console.log('单店');
				this.getData(this.userData.currentShop.id);
			}
		},
		//单店获取数据
		async getData(id) {
			this.coverShow = true;
			let data = await http.statisticsBusiness({
				//单店一天的数据
				data: {
					endTime: utils.format(new Date().getTime(), 'yyyyMMdd'),
					startTime: utils.format(new Date().getTime(), 'yyyyMMdd'),
					dateType: 1, //对应为日
					isOpenTime: 1, //是否按营业统计的时间
					shopId: id
				}
			});
			this.sales = data.sales;
			this.pie = data.proportion;

			let res = await http.statisticsBusiness({
				//单店七天的数据
				data: {
					endTime: utils.format(new Date().getTime(), 'yyyyMMdd'),
					startTime: utils.format(
						new Date().getTime() - 6 * 24 * 60 * 60 * 1000,
						'yyyyMMdd'
					),
					dateType: 1, //对应为日
					isOpenTime: 1, //是否按营业统计的时间
					shopId: id
				}
			});
			this.line = res.list;

			this.oneDiscount = await http.TurnoverGetDiscountDataOne({
				//详细的优惠金额占比
				data: {}
			});
			//处理数据
			this.analytic();
			this.doDate();

			this.coverShow = false;
		},
		//品牌数据获取
		async getBrandData() {
			this.coverShow = true;
			let res = await http.TurnoverGetBrandStat({
				data: { type: 1 }
			});
			this.sales.eatIn.turnover = res.ePrice;
			this.sales.eatIn.amount = res.eRealPrice;
			this.sales.eatIn.orderNum = res.eOrderNum;
			this.sales.eatIn.discount = res.eDiscount;

			this.sales.quickPayment.turnover = res.kPrice;
			this.sales.quickPayment.amount = res.kRealPrice;
			this.sales.quickPayment.orderNum = res.kOrderNum;
			this.sales.quickPayment.discount = res.kDiscount;

			this.sales.takeout.turnover = res.tPrice;
			this.sales.takeout.amount = res.tRealPrice;
			this.sales.takeout.orderNum = res.tOrderNum;
			this.sales.takeout.discount = res.tDiscount;

			this.sales.total.turnover = res.Price;
			this.sales.total.amount = res.RealPrice;
			this.sales.total.orderNum = res.OrderNum;
			this.sales.total.discount = res.Discount;

			this.sales.selfTakeOut = {}; //自营外卖
			this.sales.selfTakeOut.turnover = res.sPrice;
			this.sales.selfTakeOut.amount = res.sRealPrice;
			this.sales.selfTakeOut.orderNum = res.sOrderNum;
			this.sales.selfTakeOut.discount = res.sDiscount;

			//处理数据
			this.analytic();
			this.doDate();

			let data = await http.turnoverGetMoreShopStat({
				data: { shopIds: this.shopIds[0], type: 1 }
			});
			for (let v in data) {
				this.bar[v] = {};
				this.bar[v].eatIn = {};
				this.bar[v].quickPayment = {};
				this.bar[v].takeout = {};
				this.bar[v].total = {};
				this.bar[v].selfTakeOut = {};

				this.bar[v].eatIn.turnover = data[v].ePrice;
				this.bar[v].eatIn.amount = data[v].eRealPrice;
				this.bar[v].eatIn.orderNum = data[v].eOrderNum;
				this.bar[v].eatIn.discount = data[v].eDiscount;

				this.bar[v].quickPayment.turnover = data[v].kPrice;
				this.bar[v].quickPayment.amount = data[v].kRealPrice;
				this.bar[v].quickPayment.orderNum = data[v].kOrderNum;
				this.bar[v].quickPayment.discount = data[v].kDiscount;

				this.bar[v].takeout.turnover = data[v].tPrice;
				this.bar[v].takeout.amount = data[v].tRealPrice;
				this.bar[v].takeout.orderNum = data[v].tOrderNum;
				this.bar[v].takeout.discount = data[v].tDiscount;

				this.bar[v].total.turnover = data[v].Price;
				this.bar[v].total.amount = data[v].RealPrice;
				this.bar[v].total.orderNum = data[v].OrderNum;
				this.bar[v].total.discount = data[v].Discount;

				this.bar[v].selfTakeOut.turnover = data[v].sPrice;
				this.bar[v].selfTakeOut.amount = data[v].sRealPrice;
				this.bar[v].selfTakeOut.orderNum = data[v].sOrderNum;
				this.bar[v].selfTakeOut.discount = data[v].sOrderNum;
			}
			this.coverShow = false;
		},

		//保留两位小数，且小数点后字体更小 用salesPoint分开存储
		analytic() {
			let sales = this.sales;
			for (let i in sales) {
				if (i == 'total') {
					for (let n in sales[i]) {
						if (n != 'orderNum') {
							let str = sales[i][n] + '';
							let arr = str.split('.');
							if (arr[1]) {
								if (arr[1].length <= 1) {
									arr[1] = arr[1] + '0';
								}
								this.salesPoint[n] = (arr[1] + '').substring(
									0,
									2
								);
							} else {
								this.salesPoint[n] = '00';
							}
						}
					}
				}
			}
		},
		//处理数据
		doDate() {
			let forData = ['turnover', 'discount', 'amount', 'orderNum'];
			for (let i = 0; i < forData.length; i++) {
				this.eachList[i].data = [];
				if (this.sales.eatIn[forData[i]] != 0) {
					this.eachList[i].data[this.eachList[i].data.length] = {
						name: '堂吃',
						showData:
							i == 3
								? this.sales.eatIn[forData[i]]
								: Number(this.sales.eatIn[forData[i]]).toFixed(2)
					};
				}
				if (this.sales.takeout[forData[i]] != 0) {
					this.eachList[i].data[this.eachList[i].data.length] = {
						name: '外卖',
						showData:
							i == 3
								? this.sales.takeout[forData[i]]
								: Number(this.sales.takeout[forData[i]]).toFixed(2)
					};
				}
				if (this.sales.quickPayment[forData[i]] != 0) {
					this.eachList[i].data[this.eachList[i].data.length] = {
						name: '快捷支付',
						showData:
							i == 3
								? this.sales.quickPayment[forData[i]]
								: Number(this.sales.quickPayment[forData[i]]).toFixed(2)
					};
				}
				if (this.isBrand && this.sales.selfTakeOut[forData[i]] != 0) {
					this.eachList[i].data[this.eachList[i].data.length] = {
						name: '自营外卖',
						showData:
							i == 3
								? this.sales.selfTakeOut[forData[i]]
								: Number(this.sales.selfTakeOut[forData[i]]).toFixed(2)
					};
				}
				this.eachList[i].total = parseInt(this.sales.total[forData[i]]);
				this.eachList[i].totalPie = this.sales.total[forData[i]]; //饼图上显示时，保留小数点
			}
			//给饼图添加一项数据
			this.pie.totalHuo = {
				discount: Number(this.eachList[1].totalPie).toFixed(2),
				amount: Number(this.eachList[2].totalPie).toFixed(2)
			};
			//添加详细的优惠金额
			if (!this.isBrand) {
				this.pie.discount = {
					giveGoods: Number(this.oneDiscount.giveGoods.price).toFixed(
						2
					), //赠品金额
					orderDiscount: Number(
						this.oneDiscount.orderDiscount.price
					).toFixed(2), // 整单折扣
					orderDiscountForce: Number(
						this.oneDiscount.orderDiscountForce.price
					).toFixed(2), //整单强折
					goodsDiscount: Number(
						this.oneDiscount.goodsDiscount.price
					).toFixed(2), //单品折扣
					coupon: Number(this.oneDiscount.coupon.price).toFixed(2), //活动优惠券
					takeout: Number(this.oneDiscount.takeout.price).toFixed(2), //外卖活动补贴
					self: Number(this.oneDiscount.self.price).toFixed(2), //自营外卖活动补贴
					other: Number(
						this.oneDiscount.pointDeduction.price +
							this.oneDiscount.vipDiscount.price +
							this.oneDiscount.vipReduction.price +
							this.oneDiscount.fastPaymentPoint.price +
							this.oneDiscount.fastPaymentDiscount.price +
							this.oneDiscount.orderReduction.price
					).toFixed(2)
					//堂吃积分抵扣、会员折扣、会员减免、快捷支付积分抵扣、快捷支付优惠金额、整单减免
				};
			} else {
				this.pie.orderNum = {
					eatIn: this.sales.eatIn.orderNum,
					takeout: this.sales.takeout.orderNum,
					selfTakeOut: this.sales.selfTakeOut.orderNum,
					quickPayment: this.sales.quickPayment.orderNum
				};
			}
		}
	},
	components: {
		pieChart: () =>
			import(/*webpackChunkName: 'survey_pie'*/ './survey_pie'),
		lineChart: () =>
			import(/*webpackChunkName: 'survey_line'*/ './survey_line'),
		barChart: () =>
			import(/*webpackChunkName: 'survey_bar'*/ './survey_bar')
	}
};
</script>

<style lang="less" scoped>
#survey {
	width: 100%;
	min-width: 1024px;
	.top {
		height: 40px;
		line-height: 40px;
	}
	.left {
		float: left;
		.specific {
			overflow: hidden;
			width: 100%;
			.block {
				float: left;
				width: 48%;
				height: 190px;
				border-top: 5px solid #69c2ea;
				padding: 20px;
				background: #f2f2f2;
				margin-bottom: 10px;
				.name {
					color: #333;
					padding-bottom: 15px;
					font-size: 18px;
				}
				.total {
					text-align: center;
					padding-bottom: 10px;
					p {
						padding: 10px 0;
					}
					.num {
						span {
							font-size: 24px;
						}
						em {
							font-size: 14px;
						}
					}
				}
				.totalOne {
					text-align: center;
					font-size: 24px;
					margin-top: 40px;
					.num {
						span {
							font-size: 24px;
						}
						em {
							font-size: 14px;
						}
					}
				}
				.branch {
					overflow: hidden;
					.box {
						float: left;
						width: 33%;
						margin-top: 15px;
						span {
							padding-bottom: 5px;
							display: block;
						}
						p {
							height: 20px;
							line-height: 20px;
							font-size: 14px;
						}
						&:nth-child(n + 2) {
							border-left: 1px solid #ccc;
							padding-left: 8px;
						}
					}
				}
			}
			// @media (max-width: 1400px) {
			// 	.block {
			// 	}
			// }
		}
		.help-icon {
			display: inline-block;
			height: 18px;
			width: 18px;
			vertical-align: middle;
			cursor: pointer;
			margin-top: -3px;
			background: url(../../res/icon/orderdetial18.png) no-repeat;
		}
	}
	//展示内容
	.isContent {
		width: 79%;
		float: left;
		border: 1px solid #ddd;
		border-radius: 10px;
		height: auto;
		min-height: 500px;
		overflow-x: auto;
		margin-bottom: 30px;
		.head {
			background: #fafafa;
			text-align: center;
			height: 40px;
			line-height: 40px;
			font-size: 18px;
			.back {
				float: right;
				margin-right: 30px;
				cursor: pointer;
				color: #69c2ea;
				font-size: 16px;
			}
		}
		.content {
			padding: 20px;
			.time {
				float: right;
				margin: 40px 100px 20px 0;
			}
		}
	}
	.right {
		width: 20%;
		float: right;
		.right-content {
			border: 1px solid #ddd;
			border-radius: 10px;
			height: 300px;
			margin-bottom: 20px;
			width: 100%;
			overflow-y: auto;
		}
		.right-two {
			border: 1px solid #ddd;
			border-radius: 10px;
			height: 500px;
			width: 100%;
		}
		.head {
			background: #fafafa;
			text-align: center;
			height: 40px;
			line-height: 40px;
			font-size: 18px;
		}
		.content {
			padding: 15px;
		}
		.title {
			color: #69c2ea;
			cursor: pointer;
		}
	}
	//加载图片样式
	.loding-cover {
		width: 78%;
		float: left;
		background: #fff;
		text-align: center;
		height: 50px;
		padding-top: 150px;
	}
}
</style>