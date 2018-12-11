<!--活动统计-->
<template>
	<div id="sell_hand">
		<template v-if="type == 'index'">
			<div class="search_box">
				<!-- 时间控件 -->
				<div class="fl box_child clearfix">
					<span class="fl">消费时间</span>
					<el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
					</el-date-picker>
				</div>
				<!-- 按天/按详情 -->
				<div class="fl box_child clearfix">
					<el-select class="fl" v-model="viewName" placeholder="请选择" @change="selData" style="color:#c0c4cc">
						<el-option v-for="item in viewList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 筛选 -->
				<div class="fr box_child clearfix">
					<el-button type="primary" @click="searchDate" style="width:100px;">筛选</el-button>
					<el-button type="info" @click="resetFun" style="width:100px;">重置</el-button>
					<el-button type="warning" @click="openModify">查看修改记录</el-button>
				</div>
			</div>
			<div class="search_box">
				<div class="fl box_child clearfix" v-if="ischain == '3'">
					<span class="fl">选择门店</span>
					<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
				</div>
				<div class="fl box_child clearfix">
					<span class="fl">经手人</span>
					<el-input class="fl" v-model="handlers" placeholder="请输入内容" style="width:179px;"></el-input>
				</div>
				<div class="fl box_child clearfix">
					<span class="fl">核准人</span>
					<el-input class="fl" v-model="approvedPerson" placeholder="请输入内容" style="width:179px;"></el-input>
				</div>
			</div>
			<!-- <div class="search_box" v-if="ischain == '3'">
				<span style="font-size: 16px;line-height:1.5;">选择门店:{{selectName}}</span>
			</div> -->
			<div class="store-show" :style="{'height':storeShowH}" v-if="ischain == '3'">
				<i>已选择店铺：</i>
				<div class="store-block">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<div>{{selectName}}</div>
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
				<el-table v-show="childType == 'day'" :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="fromId" label="店铺名称" align="center">
						<template slot-scope="scope">
							<el-button size="medium" type="text" @click="openOneshop(scope.row.fromId)">{{getShopName(scope.row.fromId)}}</el-button>
						</template>
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
				<el-table v-show="childType == 'detail'" :data="proList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="fromId" label="店铺名称" align="center">
						<template slot-scope="scope">
							<span>{{getShopName(scope.row.fromId)}}</span>
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
					<el-table-column prop="createTime" label="消费时间" align="center" width="180">
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
							<el-button size="medium" type="text" style="color: #909399;" v-else>已退回</el-button>
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
		<!-- 具体的某一家店的数据 -->
		<sell-hand-oneshop v-if="type == 'oneshop'" :oneShopId="oneShopId" @throwWinResult="getDetailShow" :valueTime="valueTime" :oneShopName="oneShopName"></sell-hand-oneshop>
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
			valueTime: [new Date().setDate(1) -
				(new Date().getTime() - new Date().setHours(0, 0, 0, 0)), new Date().setHours(23, 59, 59, 999)
			], //时间控件
			viewList: [{
				name: '按天数',
				id: 0
			}, {
				name: '按详情',
				id: 1
			}],
			viewName: '按天数',
			viewId: 0,
			transmitId: [], //传递给选择店铺页面的id 
			shopIds: null, //选择查看的店铺的id
			selectName: null,
			handlers: '', //经手人
			approvedPerson: '', //核准人
			proList: [], //卖手消费统计数据
			statistics: [], //总数据
			returnInt: 1, //相差天数
			type: 'index',
			oneShopId: '', //单店的shopId
			oneShopName: '', //单店的店铺名称
			childType: 'day',
			userData: '',
			// staffList: Object,
			showWin: false,
			beforeAmount: '', //原来的金额价格
			sellHandId: '',
			showBackWin: false,
			modifyId: '', //修改记录的某一条id
			storeShowH: '20px',
			isShowStore: false, //已选中店铺列表 是否展开
		};
	},
	components: {
		elShopList: () =>
			import( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList'),
		'sell-hand-oneshop': () =>
			import( /*webpackChunkName: "sell_hand_statisticsOneshop"*/ './sell_hand_statisticsOneshop'),
		'sell-hand-modify': () =>
			import( /*webpackChunkName: "sell_hand_modifywin"*/ './sell_hand_modifywin'),
		'back-win': () =>
			import( /*webpackChunkName: "sell_hand_back_win"*/ './sell_hand_back_win'),
		'modify-record': () =>
			import( /*webpackChunkName: "modify_the_record"*/ './modify_the_record')
	},
	// created() {
	// 	this.ischain = storage.session('userShop').currentShop.ischain;
	// },
	mounted() {
		this.getshopIdorshopName();
		this.getAssistantstaff(); //获取工作人员
		this.getConsumeStatistics(); //获取数据
	},
	methods: {
		openStore() { //展开收起-已选中店铺列表
			if (this.isShowStore == true) { //展开时点击
				this.storeShowH = '20px';
			} else {
				this.storeShowH = 'auto';
			}
			this.isShowStore = !this.isShowStore;
		},
		chooseTime: function(time) { //获取时间
			this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
		},
		selData: function(value) { //选择按天还是按详情
			this.viewId = value;
		},
		// 获取数据
		async getConsumeStatistics() {
			let res = await http.getConsumeStatistics({
				data: {
					'startTime': parseInt(this.valueTime[0] / 1000), //开始时间
					'endTime': parseInt(this.valueTime[1] / 1000), //结束时间
					'shopIds': this.shopIds, //选择门店
					'type': this.viewId, //查看类型
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
				this.proList = [];
				this.proList = res.list; //底部数据
				if (res.userData) {
					this.userData = res.userData;
				}
				if (res.Statistics != '') {
					this.statistics = [];
					let statistics = res.Statistics;
					statistics.days = this.timeChange();
					//console.log(statistics)
					this.statistics.push(statistics);
				}
			}
		},
		getSelectShopList: function(res) {
			this.transmitId = res;
			let selectNameStr = '';
			for (let i = 0; i < this.postSelectShopList.length; i++) {
				if (this.transmitId.includes(this.postSelectShopList[i].id)) {
					this.postSelectShopList[i].selected = true;
					selectNameStr = selectNameStr + this.postSelectShopList[i].name + ',';
				} else {
					this.postSelectShopList[i].selected = false;
				}
			}
			this.shopIds = res.join(',');
			this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
		},
		searchDate: function() { //搜索查询数据
			this.page = 1;
			if (this.viewId == '1') {
				this.childType = 'detail';
			} else {
				this.childType = 'day';
			}
			//console.log(this.childType)
			this.getConsumeStatistics();
		},
		resetFun: function() { //重置方法
			this.valueTime = [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)]; //时间控件
			this.viewName = '按天数';
			this.viewId = 0;
			this.getshopIdorshopName();
			this.handlers = '';
			this.approvedPerson = '';
			this.page = 1;
			this.num = 10;
			this.getConsumeStatistics();
		},
		timeChange: function() {
			//相差天数计算
			this.returnInt = Math.ceil(
				(new Date(this.valueTime[1]).getTime() -
					new Date(this.valueTime[0]).getTime()) /
				(1000 * 60 * 60 * 24)
			);
			return this.returnInt;
		},
		getDetailShow: function(res) { //单店查看某时间段的详情回调
			this.type = res;
		},
		openOneshop: function(shopId) { //查看某天的数据
			this.oneShopId = shopId;
			this.oneShopName = this.getShopName(shopId);
			this.type = 'oneshop';
		},
		getUserInfo: function(id, type) { //获取用户信息
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
				this.getConsumeStatistics();
			}
			this.showBackWin = false;
		},
		backRecod: function(item) { //退回
			this.sellHandId = item.id; //统计id
			this.showBackWin = true;
		},
		getModifyResult: function(res) { //从调整记录回来
			this.type = res;
		},
		openModify: function(item) { //打开
			if (item) {
				this.modifyId = item.id;
			}
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

#sell_hand .store-show {
	width: 100%;
	margin-bottom: 20px;
	display: block;
	overflow: hidden;
	line-height: 20px;
	position: relative;
}

#sell_hand .store-show i {
	float: left;
	position: absolute;
	left: 0;
	top: 0;

}

#sell_hand .store-show .store-block {
	overflow: hidden;
	width: 100%;
	padding-left: 84px;
}

#sell_hand .store-show .store-block em {
	float: left;
	color: #09f;
	margin-right: 5px;
	cursor: pointer;
	text-decoration: underline;
}

#sell_hand .store-show .store-block span {
	float: left;
	color: #333;
}
</style>