<!--
	**自主外卖统计详情
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="delivery">
		<div class="box_l fl">
			<div class="line">
			</div>
			<div class="content">
				<div class="content_t clearfix">
					<div class="order">
						<p class="fl" style="margin-bottom:0;">订单号:{{orderDetail.oid}}</p>
						<span>外卖</span>
					</div>
					<p>外卖单序号:#{{serialNumber}}</p>
					<p>单据状态:{{getStatus(orderDetail.status)}}</p>
					<p>人数:{{orderDetail.person}}人</p>
				</div>
				<!-- 内容 -->
				<div class="container clearfix">
					<h3>营业明细</h3>
					<ul>
						<li>消费总额:¥{{orderDetail.consumption}}</li>
						<li>配送费:¥{{orderDetail.moveFee}}</li>
						<li>优惠总计:¥{{orderDetail.discount}}</li>
						<li>订单应收金额:¥{{orderDetail.consumption}}</li>
						<li>订单实收金额:¥{{orderDetail.pain}}</li>
					</ul>
					<ul>
						<li>销量:{{orderDetail.sales}}</li>
						<li>赠品:{{orderDetail.gift}}</li>
						<li>代金券-优惠金额:¥{{orderDetail.vouchersPain}}</li>
						<li>积分抵扣金额:¥{{orderDetail.pointCash}}</li>
					</ul>
				</div>
				<div class="container clearfix">
					<h3>下单信息</h3>
					<ul>
						<li>下单人:{{orderDetail.name}}</li>
					</ul>
					<ul>
						<li>电话:{{orderDetail.phone}}</li>
					</ul>
					<p>地址:{{orderDetail.address}}</p>
				</div>
				<div class="container clearfix">
					<h3>会员信息</h3>
					<ul>
						<li>会员账号:{{memberInfo.mobile}}</li>
						<li>会员名称:{{memberInfo.name}}</li>
					</ul>
					<ul>
						<li>会员等级:{{memberInfo.levelName}}</li>
						<li>会员积分:{{memberInfo.point}}</li>
					</ul>
				</div>
				<div class="container clearfix">
					<h3>支付方式:{{getpayment()}}</h3>
					<ul>
						<li>支付宝:¥{{orderDetail.aliPayPain}}</li>
						<li>微信支付:¥{{orderDetail.weChatPain}}</li>
						<li>会员支付:¥{{orderDetail.memberPain}}</li>
					</ul>
				</div>
				<div class="container clearfix">
					<p>下单时间:{{formatTime(orderDetail.createTime)}}</p>
					<p>完成时间:{{formatTime(orderDetail.updateTime)}}</p>
				</div>
				<div class="container clearfix">
					<p></p>
				</div>
			</div>
		</div>
		<div class="box_r fl">
			<!-- 类型 -->
			<div class="compared">
				<span v-for="(item,index) in payWays" :key="index" @click="changeRadio(item)" :class="{'effect':payType==item.id}">{{item.name}}</span>
			</div>
			<div class="title">
				<p class='fl'>应收金额:¥{{orderDetail.consumption}}</p>
				<p class="fl">销量:{{orderDetail.sales}}</p>
				<p class="fr">赠品:{{orderDetail.gift}}</p>
			</div>
			<section>
				<com-table :listHeight='60' :listWidth="580" :showHand="false" :titleData="titleList" :introData="formList" :widthType='true'>
				</com-table>
				<!-- 翻页 -->
				<section class="turn-page" style="height:42px;">
					<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
				</section>
			</section>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			page: 1, //页码数
			num: 10,
			endTotal: 1,
			payWays: [
				{
					id: 0,
					name: '商品详情'
				},
				{
					id: 1,
					name: '赠品详情'
				}
			], //类型
			payType: 0,
			titleList: [
				{
					titleName: '序号',
					dataName: 'serialnum'
				},
				{
					titleName: '商品名',
					dataName: 'name'
				},
				{
					titleName: '单价',
					dataName: 'price'
				},
				{
					titleName: '商品数量',
					dataName: 'num'
				},
				{
					titleName: '小计',
					dataName: 'total'
				}
			],
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			orderDetail: '', //商品详情
			serialNumber: '', //外卖单序号
			memberInfo: '' //会员信息
		};
	},
	props: {
		oid: String, //订单id
		constructionsId: String //店铺id
	},
	methods: {
		changeRadio: function(item) {
			//选择渠道
			this.page = 1;
			let id = item.id;
			this.payType = id;
			this.dealwithgoods();
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		returnStore: function() {
			this.$emit('orderdetailResult', false);
			//this.$store.commit('setPageTools', {})
		},
		formatTime(time) {
			if (time == '0') {
				return '未完成';
			} else {
				return utils.format(
					new Date(time * 1000),
					'yyyy-MM-dd hh:mm:ss'
				);
			}
		},
		getStatus: function(type) {
			switch (type) {
				case '10':
					return '已完成';
				// break;
				case '-2':
					return '已退单/已取消';
				// break;
			}
		},
		dealwithgoods: function() {
			//处理商品
			let gift = this.orderDetail.goodsData.gifts.goods.concat(
				this.orderDetail.goodsData.gifts.package
			);
			let sale = this.orderDetail.goodsData.sales.goods.concat(
				this.orderDetail.goodsData.sales.package
			);
			if (this.payType == 0) {
				sale.forEach(function(item, index) {
					item.total = item.num * item.price;
					item.serialnum = index + 1;
				});
				this.allFormList = sale;
			} else {
				gift.forEach(function(item, index) {
					item.total = item.num * item.price;
					item.serialnum = index + 1;
				});
				this.allFormList = gift;
			}
			this.setPage();
		},
		async getTakeoutOrderDetail() {
			let data = await http.getTakeoutOrderDetail({
				data: {
					oid: this.oid, //订单id
					recordShopId: this.constructionsId //店铺ID
				}
			});
			if (data) {
				this.orderDetail = data; //详情数据
				this.serialNumber = Number(
					data.oid.substring(data.oid.length - 5)
				);
				this.memberInfo = data.memberInfo; //会员信息
				this.dealwithgoods();
				//console.log(JSON.stringify(this.allFormList))
			}
		},
		getpayment: function() {
			let aliPayPain = this.orderDetail.aliPayPain;
			let weChatPain = this.orderDetail.weChatPain;
			let memberPain = this.orderDetail.memberPain;
			if (aliPayPain != 0 && weChatPain == 0 && memberPain == 0) {
				return '支付宝支付';
			} else if (aliPayPain == 0 && weChatPain != 0 && memberPain == 0) {
				return '微信支付';
			} else if (aliPayPain == 0 && weChatPain == 0 && memberPain != 0) {
				return '会员支付';
			} else {
				return '混合支付';
			}
		}
	},
	watch: {},
	computed: {},
	components: {
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnStore();
				}
			}
		]);
		this.getTakeoutOrderDetail();
	}
};
</script>
<style type="text/css" scoped>
#delivery {
	width: 100%;
	height: auto;
	overflow: hidden;
	min-width: 1024px;
	overflow-x: scroll;
}

#delivery .box_l {
	width: 32%;
	height: 100%;
	margin-right: 26px;
	max-width: 440px;
	border-left: 1px solid #eaeaea;
	border-bottom: 1px solid #eaeaea;
}

#delivery .box_l .content {
	/* width: 460px; */
	height: auto;
	margin: 0 auto;
	box-shadow: 0px 2px 2px 3px #f2f2f2;
	padding: 35px 19px;
}

#delivery .box_l .content p {
	font-size: 16px;
	line-height: 25px;
	margin-bottom: 9px;
}

#delivery .box_l .content .order {
	width: 100%;
	height: 25px;
	margin-bottom: 9px;
}

#delivery .box_l .content .content_t {
	margin-bottom: 9px;
}

#delivery .box_l .content .order span {
	display: block;
	width: 52px;
	height: 25px;
	background: #00aae5;
	color: #fff;
	text-align: center;
	line-height: 25px;
	float: right;
	border-radius: 12.5px;
}

#delivery .box_l .content .container {
	width: 100%;
	height: auto;
	border-top: 1px dashed #e8e8e8;
	padding-top: 19px;
}

#delivery .box_l .content .container h3 {
	font-size: 16px;
	font-weight: bolder;
	color: #333;
	margin-bottom: 13px;
}

#delivery .box_l .content .container ul {
	min-width: 50%;
	height: auto;
	float: left;
}

#delivery .box_l .content .container ul li {
	height: 17px;
	line-height: 17px;
	font-size: 16px;
	margin-bottom: 13px;
}

#delivery .box_r {
	width: 54%;
	height: auto;
	max-width: 580px;
}

#delivery .box_r .compared {
	width: 100%;
	height: 60px;
	margin-bottom: 20px;
}

#delivery .box_r .compared span {
	width: 50%;
	height: 60px;
	display: inline-block;
	font-size: 18px;
	text-align: center;
	line-height: 60px;
	cursor: pointer;
	color: #666;
	border-bottom: 3px solid #f7f7f7;
}

#delivery .box_r .compared .effect {
	border-bottom-color: #ff9800;
	color: #ff9800;
}

#delivery .box_r .title {
	height: 24px;
	line-height: 24px;
}

#delivery .box_r .title p:nth-child(1) {
	margin-right: 133px;
}

#delivery .box_l .line {
	/* width: 500px; */
	height: 8px;
	background: #f2f2f2;
	border-radius: 4px;
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
	#delivery .box_r {
		height: auto;
		min-width: 580px;
		clear: both;
		padding-bottom: 60px;
	}
}

@media screen and (min-width: 750px) and (max-width: 1024px) {
	#delivery .box_r {
		height: auto;
		min-width: 580px;
		clear: both;
		padding-bottom: 60px;
	}
}
</style>