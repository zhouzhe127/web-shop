<!--
	**中信银行对账单
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div id="citic-statements">
		<section style="width:100%;height:50px;">
			<el-date-picker @change="searchBtn" :clearable="false" v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
			<el-button @click="searchBtn" type="primary" icon="el-icon-search"></el-button>
		</section>
		<section style="width:100%;">
			<el-radio-group v-model="payChannel" @change="payBtn">
				<el-radio-button v-for="item in payList" :key="item.id" :label="item.id">{{item.name}}</el-radio-button>
			</el-radio-group>
			<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="allDetial" border style="width: 100%;margin:10px 0;">
				<el-table-column fixed min-width="120" align="center" prop="allSum" label="全部收入"></el-table-column>
				<el-table-column fixed min-width="100" align="center" prop="allHandingFee" label="全部手续费"></el-table-column>
				<el-table-column min-width="100" align="center" prop="aliPayAll" label="支付宝收入"></el-table-column>
				<el-table-column min-width="80" align="center" prop="aliPayHandingFee" label="支付宝手续费"></el-table-column>
				<el-table-column min-width="80" align="center" prop="weChatAll" label="微信收入"></el-table-column>
				<el-table-column min-width="80" align="center" prop="weChatHandingFee" label="微信手续费"></el-table-column>
				<el-table-column min-width="80" align="center" prop="weChatPubAll" label="公众账号收入"></el-table-column>
				<el-table-column min-width="80" align="center" prop="weChatPubHandingFee" label="公众账号手续费"></el-table-column>
			</el-table>
			<el-table stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="zxOrderList" border style="width: 100%">
				<el-table-column fixed min-width="120" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color:#fe9200;cursor:pointer" @click="openDetial(scope.row)">查看详情</span>
					</template>
				</el-table-column>
				<el-table-column fixed min-width="180" align="center" prop="shopOrderId" label="商户订单号"></el-table-column>
				<el-table-column min-width="150" align="center" prop="dealTime" label="交易时间"></el-table-column>
				<el-table-column min-width="100" align="center" prop="payChannel" label="交易渠道"></el-table-column>
				<el-table-column min-width="80" align="center" prop="dealSum" label="交易金额"></el-table-column>
				<el-table-column min-width="80" align="center" prop="handingFee" label="手续费"></el-table-column>
				<el-table-column min-width="80" align="center" prop="handingPercent" label="费率"></el-table-column>
			</el-table>
			<div style="margin:10px 0;">
				<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-count="total" :page-size="num" layout="sizes, prev, pager, next" :page-sizes="[10,30, 50]"></el-pagination>
			</div>
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
			show: false
		};
	},
	methods: {
		//分页点击
		pageClick: function(e) {
			this.page = e;
			this.inte();
		},
		//每页显示多少行
		numChange(e) {
			this.num = e;
			this.page = 1;
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
			this.page = 1;
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
		payBtn: function() {
			this.page = 1;
			this.inte();
		}
	},
	components: {
		citicDetail: () =>
			import(/* webpackChunkName:"citic_statements_detail" */ './citic_statements_detail')
	},
	mounted: function() {
		this.$store.commit('setPageTools', [
			{
				name: '导出',
				type: 4,
				className: 'primary',
				fn: () => {
					this.exportBtn();
				}
			}
		]);
		this.inte();
	}
};
</script>