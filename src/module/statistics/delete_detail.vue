<template>
	<div class="scroll">
		<div class="detail" @click="tipClick">
			<div class="head">
				<div class="button-box">
					<span class="back" @click="back">返回</span>
				</div>
			</div>
			<!--订单详情-->
			<div class="left">
				<div class="block">
					<div class="wide">
						<span>订单号：{{order.oid}}</span>
						<span :title="order.areaName+'--' +order.tableName">桌台：{{order.areaName}} -- {{order.tableName}}</span>
					</div>
					<div class="narrow">
						<span>单据状态：{{order.status}}</span>
						<span>人数：{{order.person}}</span>
					</div>
				</div>
				<div class="block">
					<div class="wide">
						<span>消费金额：￥{{toFloatStr(order.originalPrice)}}</span>
						<span>含服务费：￥{{toFloatStr(order.chargePrice)}}</span>
						<span>优惠总计：￥{{toFloatStr(order.discount)}}</span>
						<span>应收金额：￥{{toFloatStr(order.price)}}</span>
						<span>实收金额：￥{{toFloatStr(order.paymentPrice)}}</span>
						<span>利润：￥{{toFloatStr(order.profit)}}</span>
					</div>
					<div class="narrow">
						<span>销量：{{order.salesNum}}
							<em class="help-icon float-right" :data-index="0"></em>
						</span>
						<span>赠品：{{order.freeNum}}</span>
						<span>退品：{{order.returnNum}}</span>
					</div>
				</div>
				<div class="block">
					<div class="wide">
						<span>支付方式</span>
						<span v-for="(item,index) in paymentList" :key="index">{{item.paymentName}}：￥{{item.num}}</span>
						<span v-if='paymentList && paymentList.length == 0'>支付：￥0.00</span>
					</div>
					<span class="full align-right">找零：￥{{order.change}}</span>
				</div>
				<div class="block">
					<span class="full">开台时间：{{order.createTime}}</span>
					<span class="full">结束时间：{{order.updateTime}}</span>
				</div>
				<div class="block">
					<span class="full align-right">员工：{{staff}}</span>
				</div>
			</div>
			<!--详情tab切换-->
			<div class="right">
				<div class="tab-head">
					<span v-for="(item,index) in tabList" :key="index" :class="{active:index == tabIndex}" @click="tabChange(index)">{{item}}
						<em v-if="index == tabIndex"></em>
					</span>
				</div>
				<!-- 商品详情tabIndex=0,赠品详情tabIndex=1,退品详情tabIndex=2 -->
				<div class="tab-content">
					<div class="total" v-show="tabIndex == 0">
						<span>商品实收总额：{{toFloatStr(ordeDetail.totalPrice)}}</span>
						<span v-if="ordeDetail.orderMinus != 0">整单减免：{{toFloatStr(ordeDetail.orderMinus)}}</span>
						<span v-if="order.bitPrice != 0">系统取整：{{order.bitPrice}}</span>
						<span>应收金额：{{toFloatStr(ordeDetail.price)}}</span>
						<span>销量：{{order.salesNum}}</span>
						<span>赠品：{{order.freeNum}}</span>
						<span>退品：{{order.returnNum}}</span>
					</div>
					<div class="total" v-show="tabIndex == 1">
						<span class="half">赠品：{{order.freeNum}}</span>
						<span class="half align-center light">赠品总额：￥{{order.freePrice}}</span>
					</div>
					<div class="total" v-show="tabIndex == 2">
						<span class="half">退品：{{order.returnNum}}</span>
						<span class="half align-center light">退品总额：￥{{order.returnPrice}}</span>
					</div>
					<div class="list">
						<div class="title">
							<!--公共部分-->
							<span class="narrow">序号</span>
							<span class="wide">商品名</span>
							<span class="narrow">单价</span>
							<span class="narrow">口味价钱</span>
							<span class="narrow">商品数量</span>
							<span :class="{wide:tabIndex == 1}">小计</span>
							<!--有区别的部分-->
							<span v-if="tabIndex == 0">优惠金额</span>
							<span v-if="tabIndex == 2" class="narrow">原因</span>
							<span v-if="tabIndex == 0">实收金额(元)
								<em class="help-icon" :data-index="1"></em>
							</span>
							<span v-if="tabIndex == 1 || tabIndex == 2" :class="{wide:tabIndex == 1}">操作员</span>
						</div>
						<ul>
							<li v-for="(item,index) in ordeDetailList" :key="index">
								<span class="narrow">{{index + 1}}</span>
								<span class="wide">{{item.goodsName}}</span>
								<span class="narrow">{{toFloatStr(item.unitPrice)}}</span>
								<span class="narrow">{{toFloatStr(item.attrsPrice)}}</span>
								<span class="narrow">{{item.num}}{{item.unit}}</span>
								<span :class="{wide:tabIndex == 1}">{{toFloatStr(item.totalPrice)}}</span>
								<!--有区别的部分-->
								<span v-if="tabIndex == 0">{{toFloatStr(item.discountPrice)}}</span>
								<span v-if="tabIndex == 2" class="narrow">{{item.reason.reasonName}}</span>
								<span v-if="tabIndex == 0">{{toFloatStr(item.price)}}
									<em></em>
								</span>
								<span v-if="tabIndex == 1 || tabIndex == 2" :class="{wide:tabIndex == 1}">{{item.user.name}}</span>
							</li>
							<li class="list-empty" v-if="tabIndex == 0 && !isListData">此单里面没有商品</li>
							<li class="list-empty" v-if="tabIndex == 1 && !isListData">此单没有赠品</li>
							<li class="list-empty" v-if="tabIndex == 2 && !isListData">此单没有退品</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="tipBox" :style="posiTips" v-if="tipShow">
				<em :style="posiEm"></em>
				<p v-html="tipHtml" :key="tipHtml"></p>
			</div>
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	props: [
		'detail',
		'isDelete' //是否废单统计 废单则不能导出订单
	],
	data() {
		return {
			tabList: ['商品详情', '赠品详情', '退品详情'],
			tabIndex: 0,
			ordeDetail: '', //订单详情
			order: '', //订单
			staff: '', //操作人
			paymentList: [], //支付方式列表
			ordeDetailList: '', //详情列表
			isListData: false, //商品列表是否有数据
			tipShow: false, //帮助提示框显示
			tipHtml: '', //提示的内容
			posiEm: '', //提示框指针的位置
			posiTips: '', //提示框的位置
			helpIconDom: null,
			shopId: '',
			isBrand: '',
			htmlList: [
				'营业额：该订单中所有商品原价累加所得（退品金额除外）<br/>' +
					'优惠总计：“订单原价”中所有商品优惠金额和整单优惠金额统加所得（退品金额不计入优惠金额）<br/>' +
					'应收金额：订单原价-优惠总计=应收金额   顾客该订单应支付的金额<br/>' +
					'实收金额：该订单实际收入的金额（不计入未入实账的支付方式的金额）<br/>' +
					'利润：菜品应收金额-成本（如果未填写成本则计为0）=利润<br/>' +
					'销量：商品总数-退品数=销量<br/>' +
					'赠品：该订单赠品的数量 <br/>' +
					'退品：该订单退品的数量',

				'赠品中原价和口味价格都计入优惠金额，退品优惠金额和应收金额都记为“0”<br/>' +
					'实收金额:（单价+口味价格）*数量-优惠金额=应收金额”<br/>' +
					'商品应收金额未计算整单减免优惠（整单减免优惠券、整单强减优惠券及整单减免）'
			],
			userData: '',
			btnArr: [] //右上角按钮
		};
	},
	watch: {
		detail: 'getData'
	},
	created() {
		this.userData = storage.session('userShop');
	},
	mounted() {
		this.initBtn();
		this.shopId = this.userData.currentShop.id;
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		this.getData();
	},
	methods: {
		initBtn() {
			let arr = [];
			arr.push({
				name: '返回',
				className: ['back'],
				fn: () => {
					this.back();
				}
			});
			this.$store.commit('setPageTools', arr);
		},
		tabChange(index) {
			this.tabIndex = index;
			switch (this.tabIndex) {
				case 0:
					this.ordeDetailList = this.ordeDetail.order;
					break;
				case 1:
					this.ordeDetailList = this.ordeDetail.free;
					break;
				case 2:
					this.ordeDetailList = this.ordeDetail.return;
					break;
				default:
					break;
			}
			this.isListData =
				this.ordeDetailList && this.ordeDetailList.length
					? true
					: false;
		},
		getData() {
			this.ordeDetail = this.detail.ordeDetail; //右侧订单详情
			this.ordeDetailList = this.ordeDetail.order; //订单详情列表
			this.order = this.detail.order; //左侧订单
			this.staff = this.detail.staff; //操作员
			this.isListData =
				this.ordeDetailList && this.ordeDetailList.length
					? true
					: false; //商品列表是否有数据
			let paymentList = this.order.paymentList;
			//           		for(let i=0;i<paymentList.length;i++){//支付方式列表
			//           			if(paymentList[i].num > 0) this.paymentList[i] = paymentList[i];
			//           		}
			for (let i = 0; i < paymentList.length; i++) {
				//支付方式列表
				if (paymentList[i].num > 0) {
					this.paymentList.push(paymentList[i]);
				}
			}
		},
		toFloatStr(num) {
			//保留两位小数
			let str = num + '';
			return utils.toFloatStr(str, 2);
		},
		async printOrder() {
			if (!this.order.oid) return;
			let data = await http.printOrderDetail({
				data: {
					trueShopId: this.detail.fromId
						? this.detail.fromId
						: this.shopId,
					oid: this.order.oid
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alert',
					content: '打印数据已发送！'
				});
			}
		},
		tipClick(event) {
			let target = event.target;
			if (target.className.indexOf('help-icon') >= 0) {
				if (!this.tipShow || target != this.helpIconDom) {
					let index = target.getAttribute('data-index');
					let posiTop = target.offsetTop,
						posiLeft = target.offsetLeft;
					if (index == 0) {
						this.posiTips =
							'top:' +
							(posiTop + 30) +
							'px;left:' +
							(posiLeft - 30) +
							'px';
						this.posiEm = 'left:30px';
					} else {
						this.posiTips =
							'top:' +
							(posiTop + 30) +
							'px;left:' +
							(posiLeft - 420) +
							'px';
						this.posiEm = 'right:30px';
					}
					this.tipShow = true;
					this.tipHtml = this.htmlList[index];
					this.helpIconDom = target;
					document.addEventListener('click', this.closeTip);
				} else {
					this.tipShow = false;
					document.removeEventListener('click', this.closeTip);
				}
			}
		},
		closeTip(event) {
			let target = event.target;
			if (target.className.indexOf('help-icon') < 0) {
				this.tipShow = false;
				document.removeEventListener('click', this.closeTip);
			}
		},
		back() {
			//返回
			this.$store.commit('setPageTools', []);
			this.detailShow = false; //隐藏详情
			this.$emit('detailShow', false);
		}
	}
};
</script>

<style lang="less" scoped>
.scroll {
	width: 100%;
	overflow: auto;
	padding-bottom: 20px;
}
.detail {
	min-width: 1500px;
	margin-top: 10px;
	border-top: 1px solid #ddd;
	padding-left: 10px;
	.align-center {
		text-align: center;
	}
	.light {
		color: #ff9800;
	}
	.left {
		width: 490px;
		padding: 20px;
		float: left;
		box-shadow: 0 0 5px #bbb;
		.block {
			overflow: hidden;
			border-bottom: 1px solid #ccc;
			padding: 10px 15px;
			.wide {
				width: 60%;
				float: left;
			}
			.narrow {
				width: 40%;
				float: left;
			}
			span {
				float: left;
				width: 50%;
				text-align: left;
				height: 30px;
				line-height: 30px;
			}
			span {
				width: 100%;
				overflow: hidden;
				vertical-align: middle;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			span.full {
				width: 100%;
			}
			.align-right {
				text-align: right;
			}
		}
		.block:last-child {
			border-bottom: 0;
		}
	}
	.right {
		width: 1000px;
		float: left;
		padding-left: 30px;
		.tab-head {
			width: 100%;
			overflow: hidden;
			span {
				float: left;
				width: 33.33%;
				height: 65px;
				line-height: 65px;
				position: relative;
				.align-center;
				border-bottom: 2px solid #ccc;
				cursor: pointer;
				em {
					position: absolute;
					left: 48%;
					bottom: 0;
					width: 0;
					height: 0;
					border-bottom: 8px solid #ff9800;
					border-left: 6px solid transparent;
					border-right: 6px solid transparent;
				}
			}
			span:hover {
				.light;
			}
			span.active {
				border-bottom: 2px solid #ff9800;
				.light;
			}
		}
		.tab-content {
			.total {
				overflow: hidden;
				padding: 10px 0;
				span {
					float: left;
					margin-right: 40px;
					height: 30px;
					line-height: 30px;
				}
				.half {
					width: 50%;
					margin-right: 0;
				}
			}
			.list {
				border: 1px solid #b3b3b3;
				height: 480px;
				overflow: auto;
				overflow-x: hidden;
				.title {
					overflow: hidden;
					background: #f2f2f2;
					border-bottom: 1px solid #ddd;
					span {
						float: left;
						width: 13.33%;
						text-align: center;
						height: 40px;
						line-height: 40px;
					}
					span.wide {
						width: 20%;
					}
					span.narrow {
						width: 10%;
					}
				}
				li {
					overflow: hidden;
					border-bottom: 1px solid #ddd;
					span {
						float: left;
						width: 13.33%;
						text-align: center;
						height: 40px;
						line-height: 40px;
					}
					span.wide {
						width: 20%;
					}
					span.narrow {
						width: 10%;
					}
				}
				.list-empty {
					text-align: center;
					height: 40px;
					line-height: 40px;
					color: #f8931f;
				}
			}
		}
	}
	.help-icon {
		display: inline-block;
		height: 18px;
		width: 18px;
		vertical-align: middle;
		cursor: pointer;
		margin-top: -3px;
		margin-left: 3px;
		background: url(../../res/icon/orderdetial18.png) no-repeat;
	}
	.help-icon.float-right {
		float: right;
		margin-top: 5px;
	}
	.tipBox {
		position: absolute;
		z-index: 99;
		width: 470px;
		background: #333;
		em {
			position: absolute;
			top: -10px;
			height: 0;
			width: 0;
			border-bottom: 10px solid #333;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
		}
		p {
			padding: 10px;
			color: #eee;
			line-height: 30px;
		}
	}
	.head {
		width: 100%;
		position: relative;
		height: 10px;
		.button-box {
			position: absolute;
			top: -55px;
			right: 0;
			span {
				cursor: pointer;
				width: 80px;
				height: 40px;
				line-height: 38px;
				text-align: center;
				float: left;
			}
			.back {
				border: 1px solid #ff8c01;
				color: #ff8c01;
				margin-right: 20px;
			}
			.print {
				border: 1px solid #27a8df;
				color: #27a8df;
			}
		}
	}
}
.detail:after {
	content: '';
	display: block;
	zoom: 1;
	clear: both;
}
</style>