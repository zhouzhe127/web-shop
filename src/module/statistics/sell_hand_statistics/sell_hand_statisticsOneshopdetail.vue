<!--卖手消费统计查看单店详情-->
<template>
	<div id="sell_hand">
		<template v-if="type == 'index'">
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
					<el-table-column fixed prop="fromId" label="店铺名称" align="center" width="150">
						<template slot-scope="scope">
							<span>{{oneShopName}}</span>
						</template>
					</el-table-column>
					<el-table-column label="用户昵称" prop="day" align="center">
						<template slot-scope="scope">
							<span>{{getUserInfo(scope.row.fansId,'1')}}</span>
						</template>
					</el-table-column>
					<el-table-column label="手机号" prop="day" align="center">
						<template slot-scope="scope">
							<span>{{getUserInfo(scope.row.fansId,'2')}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="cash" label="消费金额" align="center">
					</el-table-column>
					<el-table-column prop="point" label="总获得积分" align="center">
					</el-table-column>
					<el-table-column prop="coins" label="获得金币" align="center">
					</el-table-column>
					<el-table-column prop="coins" label="经手人" align="center">
						<template slot-scope="scope">
							<span>{{getPersonName(scope.row.createUid)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="coins" label="核准人" align="center">
						<template slot-scope="scope">
							<span>{{getPersonName(scope.row.updateUid)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="消费时间" align="center">
						<template slot-scope="scope">
							<span>{{formatTime(scope.row.createTime)}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="coins" label="操作" align="center" width="200">
						<template slot-scope="scope">
							<template v-if="scope.row.status != '3'">
								<el-button size="medium" type="text" style="color: #29abe2;" @click="modify(scope.row)">修改</el-button>
								<span style="padding:0 5px;color: #D2D2D2">|</span>
								<el-button size="medium" type="text" style="color: #fd3f1f;" @click="backRecod(scope.row)">退回</el-button>
							</template>
							<el-button size="medium" type="text" style="color: #909399;" @click="modify(scope.row)" v-else>已退回</el-button>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<el-button size="medium" type="text" style="color:#e1bb4a;" @click="openModify(scope.row)">调整记录</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="allTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<!-- 修改弹窗 -->
			<sell-hand-modify v-if="showWin" @getAppliedWin='getResult' :beforeAmount="beforeAmount" :sellHandId="sellHandId"></sell-hand-modify>
			<!-- 退回弹窗 -->
			<back-win v-if="showBackWin" @getBackAppliedWin='getBackResult' :sellHandId="sellHandId"></back-win>
		</template>
		<!-- 调整记录 -->
		<modify-record v-if="type == 'modify'" @getModify='getModifyResult' :id="modifyId"></modify-record>
	</div>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
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
			userData: Object, //用户信息
			showWin: false,
			beforeAmount: '', //原来的金额价格
			sellHandId: '',
			showBackWin: false,
			type: 'index',
			modifyId: ''
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
		'sell-hand-modify': () =>
			import( /*webpackChunkName: "sell_hand_modifywin"*/ './sell_hand_modifywin'),
		'back-win': () =>
			import( /*webpackChunkName: "sell_hand_back_win"*/ './sell_hand_back_win'),
		'modify-record': () =>
			import( /*webpackChunkName: "modify_the_record"*/ './modify_the_record')
	},
	mounted() {
		this.setTitle();
		this.getAssistantstaff();
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
					'type': 1, //查看类型
					'page': this.page,
					'num': this.num,
					'brokerage': this.handlers, //经手人
					'authorize': this.approvedPerson //核准人
				}
			})
			if (res) {
				if (this.page == '1') {
					this.count = res.count;
					this.allTotal = res.total;
				}
				this.proList = res.list; //底部数据
				this.userData = res.userData;
				this.statistics = [];
				if (res.Statistics != '') {
					let statistics = res.Statistics;
					statistics.days = this.timeChange();
					//console.log(statistics)
					this.statistics.push(statistics);
				}
			}
		},
		searchDate: function() { //搜索查询数据
			this.page = 1;
			this.getConsumeStatistics();
		},
		resetFun: function() { //重置方法
			this.page = 1;
			this.handlers = '';
			this.approvedPerson = '';
			this.getConsumeStatistics();
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
			this.$emit('throwDetailResult', 'allDate');
		},
		searchDate: function() { //搜索查询数据
			this.page = 1;
			this.getConsumeStatistics();
		},
		getUserInfo: function(id, type) { //获取用户信息
			//console.log(this.userData)
			let info = '--';
			for (let key in this.userData) {
				if (id == key) {
					if (type == '1') {
						info = this.userData[key].name;
					} else {
						info = this.userData[key].mobile;
					}
					break;
				}
			}
			return info;
		},
		getResult: function(res) { //修改弹窗回调
			if (res == 'ok') {
				this.getConsumeStatistics();
				this.showWin = false;
			}
			this.showWin = false;
		},
		modify: function(item) { //修改
			this.beforeAmount = item.cash;
			this.sellHandId = item.id; //统计id
			this.showWin = true;
		},
		getBackResult: function(res) { //退回的弹窗
			if (res == 'ok') {
				this.consumeVerifyModify();
			}
			this.showBackWin = false;
		},
		backRecod: function(item) { //退回
			this.sellHandId = item.id; //统计id
			this.showBackWin = true;
		},
		getModifyResult: function(res) { //从调整记录回来
			this.setTitle();
			this.type = res;
		},
		openModify: function(item) { //打开调整记录
			this.modifyId = item.id;
			this.type = 'modify';
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