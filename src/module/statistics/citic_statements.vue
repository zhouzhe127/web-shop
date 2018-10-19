
<!--
	**中信银行对账单
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div id="citic-statements">
		<section style="width:100%;height:60px;">
			<section class="orMaRetBox">
				<calendar style='float:left' :time="startTime" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>

				<a class="" v-on:click="searchBtn">
					<span class="order-order-search"></span>
				</a>
			</section>
			<section>
				<a v-on:click="exportBtn" class="yellow" style="height:45px;line-height: 45px;float: right;margin-right:30px;width: 100px;">导出</a>
			</section>
		</section>
		<section style="width:100%;height: 40px;">
			<ul class="route">
				<li v-on:click="payBtn(index,item)" v-for="(item,index) in payList" :key='index' class="routeLi" :class="{'onc' : payChannel == payList[index].id}">{{item.name}}</li>
			</ul>
			<comTable :showHand="false" :titleData="titleListTop" :introData="allDetial"></comTable>
			<comTable :showHand="false" :listHeight='50' :titleData="titleListContent" :introData="zxOrderList">
				<div slot="con-6" slot-scope="props" v-on:click="openDetial(props.data)">
					<a class="yellow" style="width:100%" href="javascript:void(0);">查看详情</a>
				</div>
			</comTable>
			<div style="">
				<pageElement @pageNum="pageClick" :page="page" :total="total" :num = 'num' :isNoJump='true'></pageElement>
			</div>
			<!-- <sd-pagejump v-on:click = "getPage" v-if = "total > 1" :page.sync="page" :count.sync='1000' :total.sync='total' :num.sync='10' style="float: left;"></sd-pagejump> -->
		</section>
		
		<citicDetail :detial='detial' v-if='show' @winEvent='winEvent'></citicDetail>
	</div>
</template>

<script>
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

export default {
	data() {
		return {
			startTime: new Date().getTime() - 24 * 60 * 60 * 1000, //日期组件的开始时间,默认前一天
			payList: [
				{
					id: '-1',
					name: '全部渠道'
				},
				{
					id: '1',
					name: '微信'
				},
				{
					id: '2',
					name: '公众平台'
				},
				{
					id: '3',
					name: '支付宝'
				}
			],
			allDetial: [], //统计的数据详情
			zxOrderList: [], //中信对账单总列表
			num: 10,
			page: 1,
			total: 1,
			count: 1000,
			payChannel: '-1', //支付方式
			detial: {},
			show: false,
			titleListTop: [
				{ titleName: '全部收入', dataName: 'allSum' },
				{ titleName: '全部手续费', dataName: 'allHandingFee' },
				{ titleName: '支付宝收入', dataName: 'aliPayAll' },
				{ titleName: '支付宝手续费', dataName: 'aliPayHandingFee' },
				{ titleName: '微信收入', dataName: 'weChatAll' },
				{ titleName: '微信手续费', dataName: 'weChatHandingFee' },
				{ titleName: '公众账号收入', dataName: 'weChatPubAll' },
				{ titleName: '公众账号手续费', dataName: 'weChatPubHandingFee' }
			],
			titleListContent: [
				{ titleName: '商户订单号', dataName: 'shopOrderId' },
				{ titleName: '交易时间', dataName: 'dealTime' },
				{ titleName: '交易渠道', dataName: 'payChannel' },
				{ titleName: '交易金额', dataName: 'dealSum' },
				{ titleName: '手续费', dataName: 'handingFee' },
				{ titleName: '费率', dataName: 'handingPercent' },
				{ titleName: '操作' }
			]
		};
	},
	methods: {
		pageClick: function(e) {
			this.page = e.page;
			this.num = e.num;
			this.inte();
		},
		winEvent() {
			this.show = false;
		},
		startTimeChange(str) {
			this.startTime = str;
		},
		async inte() {
			let year = utils.format(this.startTime, 'yyyy');
			let month = utils.format(this.startTime, 'MM') - 1;
			let day = utils.format(this.startTime, 'dd');
			let newDate = new Date(year, month, day);
			// this.startTime = newDate;
			//从后台获取分类列表
			let data = await http.obtainPay({
				data: {
					startTime: parseInt(newDate / 1000),
					page: this.page,
					num: this.num,
					payChannel: this.payChannel
				}
			});
			let list = data.list;
			for (let i = 0; i < list.length; i++) {
				list[i].dealTime = utils.format(
					list[i].dealTime,
					'yyyy.MM.dd/ hh:mm'
				);

				if (list[i].payChannel != '' && list[i].payChannel !== null) {
					if (list[i].payChannel == 1) {
						list[i].payChannel = '微信支付';
					}
					if (list[i].payChannel == 2) {
						list[i].payChannel = '微信公众平台支付';
					}
					if (list[i].payChannel == 3) {
						list[i].payChannel = '支付宝支付';
					}
				}
			}
			this.zxOrderList = [];
			this.allDetial = [];
			this.allDetial.push(data.title);
			this.total = data.page;
			this.num = data.num;
			this.zxOrderList = utils.deepCopy(list);
		},
		searchBtn: function() {
			this.page = 0;
			this.payChannel = '-1';
			this.inte();
		},
		exportBtn: function() {
			if (this.zxOrderList.length <= 0) {
				this.$store.commit('setWin', { content: '没有对账单数据' });
				return false;
			}

			http.exportExcel({
				data: {
					startTime: parseInt(this.startTime / 1000),
					format: 'csv'
				}
			});
		},
		//点击查看详情弹框
		openDetial: function(item) {
			this.detial = item;
			this.show = true;
		},
		getPage: function() {
			this.inte();
		},
		payBtn: function(index) {
			this.page = 1;
			this.payChannel = this.payList[index].id;
			this.inte();
		}
	},
	components: {
		calendar: () =>
			import(/* webpackChunkName:"calendar_type" */ 'src/components/calendar_type'),
		citicDetail: () =>
			import(/* webpackChunkName:"citic_statements_detail" */ './citic_statements_detail'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
	},
	mounted: function() {
		this.inte();
	}
};
</script>


<style scoped>
#citic-statements .orMaRetBox {
	height: 42px;
	float: left;
}
#citic-statements .orMaRetBox .calendar-ctr {
	width: 40px;
	height: 40px;
	position: relative;
	cursor: pointer;
}
#citic-statements .orMaRetBox .calendar-ctr i {
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
#citic-statements .orMaRetBox a {
	width: 40px;
	height: 40px;
	background: #28a8e0;
	float: left;
	display: block;
}
#citic-statements .orMaRetBox a span {
	background: url(../../res/images/search.png) center center no-repeat;
	display: block;
	float: left;
	height: 40px;
	width: 40px;
	cursor: pointer;
}
#citic-statements .route {
	width: 100%;
	height: 40px;
}
#citic-statements .route .routeLi {
	width: 120px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	background: #f2f2f2;
	float: left;
	margin-right: 20px;
	border-radius: 5px;
	cursor: pointer;
}
input {
	-webkit-appearance: none;
	-moz-appearance: none;
	-o-appearance: none;
	/* appearance: none; */
	border: 1px solid #ccc;
	padding: 0;
}
.onc {
	background-color: #29a7e1 !important;
	color: #fff;
}
</style>
