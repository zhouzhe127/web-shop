<!--营业统计 数据-->
<template>
	<div class="specific">
		<div class="block-main">
			<div class="block" v-for="(item,index) in eachList" :key="index">
				<div class="name">
					{{item.name}}
					<em class="help-icon" v-if="item.iconShow" :data-name="item.field"></em>
				</div>
				<div class="total">
					<P class="num"><span>{{sales.total[item.field]}}</span><em v-if="item.iconShow">.{{salesPoint[item.field]}}</em></P>
					<p><span>环比：</span>
						<span :class="[{compare:sales.businessMom[item.field]!=0},{isUp:sales.businessMom[item.field]>0}]">
							{{Math.abs(sales.businessMom[item.field])}} 
							<em v-if='sales.businessMom[item.field]>0'>↑</em>
							<em v-if='sales.businessMom[item.field]<0'>↓</em>
						</span>
					</p>
				</div>
				<div class="branch">
					<div class="box">
						<span>堂吃</span>
						<p :title="sales.eatIn[item.field]">{{sales.eatIn[item.field]}}</p>
					</div>
					<div class="box">
						<span>外卖</span>
						<p :title="sales.takeout[item.field]">{{sales.takeout[item.field]}}</p>
					</div>
					<div class="box">
						<span>快捷支付</span>
						<p :title="sales.quickPayment[item.field]">{{sales.quickPayment[item.field]}}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-show="coverShow" class="loding-cover"><i class="el-icon-loading"></i></div>
	</div>
</template>

<script>
export default {
	props: ['specific','cover'],
	data() {
		return {
			eachList:[
				{name:'营业总额（元）',field:'turnover',iconShow:true},
				{name:'优惠总额（元）',field:'discount',iconShow:true},
				{name:'入账金额（元）',field:'amount',iconShow:true},
				{name:'订单量（单）',field:'orderNum'},
			],
			sales: {
				eatIn: {//堂吃
					turnover: 0,//营业总额
					amount: 0,//入账金额
					orderNum: 0,//订单量
					discount: 0,//优惠总额
					passengerFlow:0,
				},
				takeout: {//外卖
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0,
					passengerFlow:0,
				},
				total: {//总值
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0,
					passengerFlow:0,
				},
				businessMom: {//环比
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0,
					passengerFlow:0,
				},
				quickPayment:{//快捷支付
					turnover: 0,
					amount: 0,
					orderNum: 0,
					discount: 0,
					passengerFlow:0,
				}
			},
			salesPoint: {//小数点后两位
				turnover: '00',
				discount: '00',
				amount: '00'
			},
			coverShow: false,
		};
	},
	watch: {
		specific: 'analytic',
		cover: 'setCover',
	},
	methods: {
		setCover() {
			this.coverShow = this.cover;
		},
		analytic() {
			//解析 统计数据 需要将数据组合成0.00的形式，保留两位小数，且小数点后字体更小 用salesPoint分开存储
			let sales = this.specific;
			for(let i in sales){//保留小数点后两位
				for (let n in sales[i]){
					let str = sales[i][n] + '';
					let reg = /\./;
					if(reg.test(str)){
						sales[i][n] = str.substring(0,str.indexOf('.')+3);
					}
				}
			}
			for (let i in sales) {
				if (i == 'total') {
					for (let n in sales[i]) {
						if (n != 'orderNum') {
							let str = sales[i][n] + '';
							let arr = str.split('.');
							if (arr[0]) sales[i][n] = parseInt(arr[0]);
							if (arr[1]) {
								if (arr[1].length <= 1) arr[1] = arr[1] + '0';
								this.salesPoint[n] = arr[1];
							} else {
								this.salesPoint[n] = '00';
							}
						}
					}
				}
			}
			this.sales = sales;
		}
	},
};
</script>

<style lang="less" scoped>
.specific {
	position: relative;
	width: 100%;
	.block-main{
		overflow: hidden;
		.block {
			float: left;
			width: 24%;
			margin-right: 1.33%;
			border-top: 5px solid #69c2ea;
			padding: 15px;
			background: #f2f2f2;
			.name {
				color: #333;
				padding-bottom: 15px;
				font-size: 18px;
			}
			.total {
				text-align: center;
				padding-bottom: 10px;
				p {
					padding: 5px 0;
				}
				.num {
					span {
						font-size: 24px;
					}
					em {
						font-size: 14px;
					}
				}
				.compare {
					color: #0ea59e;
				}
				.isUp {
					color: #ff3c04;
				}
			}
			.branch {
				overflow: hidden;
				.box {
					float: left;
					width: 50%;
					margin-top: 15px;
					span {
						padding-bottom: 5px;display: block;
					}
					p {
						height: 20px;
						line-height: 20px;
						padding-right: 5px;
						font-size: 14;
					}
					&:nth-child(2n){border-left: 1px solid #ccc;padding-left: 5px;}
				}
			}
			&:last-child {
				margin-right: 0;
			}
		}
		@media (max-width: 1600px){
			.branch{
				.box{
					p{font-size: 12px;}
				}
			}
		}
		@media (max-width: 1400px) {
			.block {
				width: 49%;
				margin-right: 2%;
				margin-bottom: 0;
				&:nth-child(1) {margin-bottom: 10px;}
				&:nth-child(2) {margin-bottom: 10px;margin-right: 0;}
				.branch{
					.box{width: 33.33%;
						&:nth-child(n+2){border-left: 1px solid #ccc;padding-left: 5px;}
					}
				}
			}
		}
	}
	.loding-cover {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
		background: #fff;
		opacity: 0.9;
		text-align: center;
		display: flex;
		i{display: inline-block;font-size: 40px;margin: auto;color: #666;}
	}
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
</style>