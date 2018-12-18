<!--卖手消费统计查看单店-->
<template>
	<div id="sell_hand">
		<template v-if="type == 'allDate'">
			<div class="search_box">
				<span style="font-size: 16px;">选择店铺：{{oneShopName}}  |  选择时间：{{formatTime(valueTime[0])}} - {{formatTime(valueTime[1])}}</span>
			</div>
			<div class="search_box">
				<div class="fl box_child clearfix">
					<span class="fl">经手人</span>
					<el-input class="fl" v-model="handlers" placeholder="请输入内容" style="width:179px;"></el-input>
				</div>
				<div class="fl box_child clearfix">
					<span class="fl">核准人</span>
					<el-input class="fl" v-model="approvedPerson" placeholder="请输入内容" style="width:179px;"></el-input>
				</div>
				<!-- 筛选 -->
				<div class="fl box_child clearfix">
					<el-button type="primary" @click="searchDate" style="width:100px;">筛选</el-button>
					<el-button type="info" @click="resetFun" style="width:100px;">重置</el-button>
				</div>
			</div>
			<div class="list_box">
				<el-table :data="statistics" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="days" label="天数" align="center">
					</el-table-column>
					<el-table-column label="订单总量" prop="orderCount" align="center">
					</el-table-column>
					<el-table-column prop="cash" label="总消费金额" align="center">
					</el-table-column>
					<el-table-column prop="point" label="总获得积分" align="center">
					</el-table-column>
					<el-table-column prop="coins" label="总获得金币" align="center">
					</el-table-column>
				</el-table>
			</div>
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>卖手消费列表</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="fromId" label="操作" align="center">
						<template slot-scope="scope">
							<el-button size="medium" type="text" @click="getDetail(scope.row)">查看详情</el-button>
						</template>
					</el-table-column>
					<el-table-column label="日期" prop="day" align="center">
					</el-table-column>
					<el-table-column label="订单数量" prop="orderCount" align="center">
					</el-table-column>
					<el-table-column prop="cash" label="总消费金额" align="center">
					</el-table-column>
					<el-table-column prop="point" label="总获得积分" align="center">
					</el-table-column>
					<el-table-column prop="coins" label="总获得金币" align="center">
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="allTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</template>
		<!-- 单店单天详情 -->
		<oneShopDetail v-if="type == 'oneDetail'" @throwDetailResult="getoneDetailShow" :oneShopId="oneShopId" :oneDate="oneDate" :oneShopName="oneShopName"></oneShopDetail>
	</div>
</template>
<script type="text/javascript">
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import { mixin } from './mixin.js';

export default {
	mixins: [mixin],
	data() {
		return {
			page: 1,
			num: 10,
			count: 0, //条数
			allTotal: 1,
			ischain: '',
			handlers: '', //经手人
			approvedPerson: '', //核准人
			proList: [], //卖手消费统计数据
			statistics: [], //总数据
			type: 'allDate',
			oneDate:'' //查看一天的时间
		};
	},
	props: {
		oneShopId: String, //店铺名id
		valueTime: Array, //时间
		oneShopName: String, //店铺的名称
	},
	components: {
		elShopList: () =>
			import( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList'),
		oneShopDetail: () =>
			import( /*webpackChunkName: "sell_hand_statisticsOneshopdetail"*/ './sell_hand_statisticsOneshopdetail')
	},
	mounted() {
		this.setTitle();
		this.getConsumeStatistics();
	},
	methods: {
		// 获取数据
		async getConsumeStatistics() {
			let res = await http.getConsumeStatistics({
				data: {
					'startTime': parseInt(this.valueTime[0] / 1000), //开始时间
					'endTime': parseInt(this.valueTime[1] / 1000), //结束时间
					'shopIds': this.oneShopId, //选择门店
					'type': 0, //查看类型
					'page': this.page,
					'num': this.num,
					'brokerage': this.handlers, //经手人
					'authorize': this.approvedPerson //核准人
				}
			});
			if (res) {
				if (this.page == '1') {
					this.count = res.count;
					this.allTotal = res.total;
				}
				this.proList = res.list; //底部数据
				this.statistics = [];
				if (res.Statistics != '') {
					let statistics = res.Statistics;
					statistics.days = this.timeChange();
					//console.log(statistics)
					this.statistics.push(statistics);
				}
			}
		},
		resetFun: function() { //重置方法
			this.handlers = '';
			this.approvedPerson = '';
			this.page = 1;
			this.getConsumeStatistics();
		},
		formatTime: function(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		timeChange: function() {
			//相差天数计算
			let returnInt = Math.ceil(
				(new Date(this.valueTime[1]).getTime() -
					new Date(this.valueTime[0]).getTime()) /
				(1000 * 60 * 60 * 24)
			);
			return returnInt;
		},
		setTitle: function() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: 'el-btn-blue',
				fn: () => {
					this.returnStore();
				}
			}]);
		},
		returnStore: function() {
			this.$store.commit('setPageTools', {});
			this.$emit('throwWinResult', 'index');
		},
		getoneDetailShow: function(res) { //单店单天详情展示
			this.type = res;
			this.setTitle();
		},
		getDetail: function(item) { //查看详情
			this.oneDate = item.day;
			this.type = 'oneDetail';
		}
	}
};
</script>
<style scoped>
#sell_hand {
	width: 100%;
	height: 100%;
}

#sell_hand .search_box {
	width: 100%;
	height: 40px;
	margin-bottom: 20px;
	line-height: 40px;
}

#sell_hand .search_box .box_child {
	height: 40px;
	margin-right: 20px;
}

#sell_hand .search_box .box_child span {
	display: block;
	height: 40px;
	font-size: 16px;
	line-height: 40px;
	margin-right: 10px;
}

#sell_hand .list_top {
	margin-bottom: 20px;
}
</style>