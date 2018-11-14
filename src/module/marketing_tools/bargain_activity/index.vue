<template>
	<section id="bargainActivity">
		<div class="activityList" v-show="!scene">
			<div class="navigation clearFix">
				<div class="startText"> 创建时间 </div>
				<div>
					<el-date-picker v-model="qureyTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div>
					<el-input v-model="keyword" placeholder="关键字检索"></el-input>
				</div>
				<div>
					<el-button type="primary" @click="getActivityList">查询</el-button>
				</div>
				<div class="rightBtn">
					<el-button type="primary" @click="downQrCode" v-if="!isBrand">下载小程序码</el-button>
					<el-button type="primary" @click="newActivity" v-else>新建活动</el-button>
				</div>
			</div>
			<div class="list">
				<el-table :data="activityList" border style="width: 100%;text-align: center" :header-cell-style="{'text-align': 'center'}">
					<el-table-column prop="name" label="活动标题" width="120"></el-table-column>
					<el-table-column prop="formatCreateTime" label="创建时间" width="180"> </el-table-column>
					<el-table-column label="活动时间" width="280">
						<template slot-scope="scope">
							<span>{{scope.row.formatBeginTime}}--{{scope.row.formatEndTime}}</span>
						</template>
					</el-table-column>
					<template v-if="isBrand">
						<!-- <el-table-column prop="launchNum" label="活动状态"></el-table-column> -->
						<el-table-column prop="goodsNum" label="商品数量"> </el-table-column>
						<el-table-column prop="goodsNum" label="发券量"></el-table-column>
						<el-table-column prop="launchNum" label="发起砍价人数"></el-table-column>
						<el-table-column prop="helperNum" label="帮砍人数"></el-table-column>
						<el-table-column prop="income" label="券金收入"></el-table-column>
						<el-table-column prop="fsCoin" label="返利金额"></el-table-column>
						<el-table-column prop="grantNum" label="发券量"></el-table-column>
					</template>

					<el-table-column prop="useNum" label="核销量"></el-table-column>
					<el-table-column v-if="isBrand" prop="newMemberNum" label="新增会员"></el-table-column>
					<el-table-column prop="creator" label="创建人"></el-table-column>
					<el-table-column label="操作" fixed="right" width="150">
						<template slot-scope="scope">
							<el-button @click="intoDetail(scope.$index)" type="text" size="small">查看详情</el-button>
							<el-button type="text" v-if="isBrand && !scope.row.isBegin" size="small" @click="editActivity(scope.$index)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="footerPageing" v-if="pageTotal>pageSize">
				<el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="pageSize" :total="pageTotal" @current-change="pageChange">
				</el-pagination>
			</div>
		</div>
		<template v-if="scene">
			<component :is="scene" @back="comeBack" @editGoods="editGoods"></component>
		</template>

	</section>
</template>

<script>
import EditActivity from './edit_activity';
import ActivityDetail from './activity_detail';
import store from './store';
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

let qureyTemp = {
	qureyTime: '',
	keyword: ''
};
export default {
	store, // 很可惜，没有找到 vue-devtools 调试的地方
	data: () => {
		return {
			isBrand: true,
			scene: '', // 情景
			activityList: [],
			qureyTime: '',
			keyword: '', // 检索用的关键字
			pageIndex: 1,
			pageSize: 10,
			pageTotal: 165,
			activityDetail: null
			// selectGoods: null,
			// showEditGoods: false
		};
	},
	methods: {
		async getActivityList(event, changePage) {
			let param = {};
			if (changePage) {
				if (qureyTemp.keyword) {
					param = { name: qureyTemp.keyword };
				} else if (qureyTemp.qureyTime) {
					param = {
						beginTime: qureyTemp.qureyTime[0] / 1000,
						endTime:
							qureyTemp.qureyTime[1].setHours(23, 59, 59) / 1000
					};
				}
			} else if (event) {
				let keyword = this.keyword,
					qureyTime = this.qureyTime;
				qureyTemp = {};
				qureyTemp = { keyword: keyword, qureyTime: qureyTime };
				this.pageIndex = 1;
				if (keyword !== '') {
					param = {
						name: keyword
					};
				} else if (qureyTime) {
					qureyTemp = { qureyTime: [qureyTime[0], qureyTime[1]] };
					param = {
						beginTime: qureyTime[0] / 1000,
						endTime: qureyTime[1].setHours(23, 59, 59) / 1000
					};
				}
			}
			param.page = this.pageIndex;
			param.num = this.pageSize;
			param.brandId = this.brandId;
			let data = await http.statisticGetActivity({ data: param });

			this.activityList = this.formatList(data.list);
			this.pageTotal = +data.count;
		},
		formatList(list) {
			let now = new Date();
			return list.map(v => {
				v.isBegin = now / 1000 > +v.beginTime;
				v.formatCreateTime = utils.format(
					v.createTime,
					'yyyy-MM-dd hh:mm'
				);
				v.formatBeginTime = utils.format(v.beginTime, 'yyyy年MM月dd');
				v.formatEndTime = utils.format(v.endTime, 'yyyy年MM月dd');
				return v;
			});
		},
		editActivity(index) {
			this.$store.commit('selectActivity', this.activityList[index]);
			this.scene = 'EditActivity';
		},
		intoDetail(index) {
			this.$store.commit('selectActivity', this.activityList[index]);
			this.scene = 'ActivityDetail';
		},
		pageChange(page) {
			this.pageIndex = page;
			this.getActivityList('', page);
		},
		// 新建活动
		newActivity() {
			this.$store.commit('selectActivity', null);
			this.scene = 'EditActivity';
		},
		// 下载二维码
		downQrCode() {
			console.log('你有一条二维码请接收');
		},
		comeBack(isRefresh) {
			this.scene = '';
			console.log(this.$store.state.activityListChange);
			if (isRefresh || this.$store.state.activityListChange) {
				this.getActivityList();
				this.$store.commit('changeActivityList', false);
			}
		},
		editGoods(type, data) {
			if (data == 'editActivity') {
				this.selectGoods.name = data.name;
				this.selectGoods.beginTime = data.beginTime;
				this.selectGoods.endTime = data.endTime;
			} else if (data == 'createActivity') {
				this.selectGoods = data;
				this.activityList.push(data);
			}
			// this.showEditGoods = true;
		},
		createGoods() {
			this.selectGoods = null;
			// this.showEditGoods = true;
		}
		// closeEditGoods(type,data) {
		// 	if (data == 'editGoods') {
		// 		// this.selectGoods = data;
		// 	}else if(data == 'createGoods'){

		// 	}
		// 	// this.showEditGoods = false;
		// }
	},
	computed: {
		selectedActivity() {
			return this.$store.getters.getActivity;
		}
	},
	components: {
		EditActivity,
		ActivityDetail
	},
	created() {
		let currentShop = storage.session('userShop').currentShop;
		this.isBrand = currentShop.ischain == 3 ? true : false; //单店 0 直营1 加盟2 品牌3
		this.brandId =
			currentShop.ischain == 0 || currentShop.ischain == 3
				? currentShop.id
				: currentShop.brandId;
		this.getActivityList();
		console.log(this.selectedActivity);
	}
};
</script>

<style>
.clearFix::after {
	content: '';
	height: 0;
	clear: both;
	width: 100%;
	display: block;
}
.w217 {
	width: 217px;
}
</style>

<style lang="less" scoped>
#bargainActivity {
	position: relative;
}
.activityList {
	padding-bottom: 70px;
}
.navigation {
	margin-bottom: 20px;
	.startText {
		line-height: 40px;
		height: 40px;
		color: #606662;
	}
	.rightBtn {
		float: right;
	}
	> div {
		float: left;
		margin: 0 5px;
	}
}
.footerPageing {
	position: absolute;
	bottom: 40px;
}
</style>
