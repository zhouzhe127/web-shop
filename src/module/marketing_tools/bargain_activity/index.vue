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
				<el-table :data="activityList" border style="width: 100%">
					<el-table-column prop="name" label="活动标题" width="100">
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" width="180">
					</el-table-column>
					<el-table-column prop="goodsNum" label="商品数量">
					</el-table-column>
					<el-table-column prop="goodsNum" label="发起砍价人数">
					</el-table-column>
					<el-table-column prop="goodsNum" label="发券量">
					</el-table-column>
					<el-table-column prop="goodsNum" label="优惠金额">
					</el-table-column>
					<el-table-column prop="goodsNum" label="优惠占比">
					</el-table-column>
					<el-table-column prop="goodsNum" label="拉动消费">
					</el-table-column>
					<el-table-column prop="beginTime" label="活动时间" width="280">
					</el-table-column>
					<el-table-column prop="goodsNum" label="活动状态">
					</el-table-column>
					<el-table-column prop="goodsNum" label="券金收入">
					</el-table-column>
					<el-table-column prop="goodsNum" label="返利金额">
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="150">
						<template slot-scope="scope">
							<el-button @click="intoDetail(scope.$index)" type="text" size="small">查看详情</el-button>
							<el-button type="text" v-if="isBrand" size="small" @click="editActivity(scope.$index)">编辑</el-button>
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

let isBrand =
	storage.session('userShop').currentShop.ischain == 3 ? true : false;
let qureyTemp = {
	qureyTime: '',
	keyword: ''
};
export default {
	store, // 很可惜，没有找到 vue-devtools 调试的地方
	data: () => {
		return {
			isBrand,
			scene: '', // 情景
			activityList: [],
			qureyTime: '',
			keyword: '', // 检索用的关键字
			pageIndex: 1,
			pageSize: 15,
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
						beginTime: qureyTemp.qureyTime[0]/1000,
						endTime: qureyTemp.qureyTime[1].setHours(23,59,59)/1000
					};
				}
			} else if (event) {
				let keyword = this.keyword,
					qureyTime = this.qureyTime;
				if (keyword !== '') {
					qureyTemp = { keyword };
					param = {
						name: keyword
					};
				} else if (qureyTime) {
					qureyTemp = { qureyTime: [qureyTime[0], qureyTime[1]]};
					param = {
						beginTime: qureyTime[0]/1000,
						endTime: qureyTime[1].setHours(23,99,99)/1000
					};
				}
			}
			param.page = this.pageIndex;
			param.num = this.pageSize;
			let data = await http.activityGetActivity({ data: param });
			this.activityList = data.list;
			this.pageTotal = +data.count;
		},
		editActivity(index) {
			this.$store.commit('selectActivity', this.activityList[index]);
			this.scene = 'EditActivity';
		},
		intoDetail(index) {
			this.$store.commit('selectActivity', this.activityList[index]);
			// this.selectActivity = this.activityList[index];
			// this.getActivityDetail();
			this.scene = 'ActivityDetail';
		},
		// async getActivityDetail() {
		// 	// this.activityDetail = await http.getActivityDetail({})
		// 	this.activityDetail = {
		// 		id: 20,
		// 		shopId: 10086,
		// 		name: '双十一活动',
		// 		beginTime: new Date(1540779984 * 1000),
		// 		endTime: new Date(1541879984 * 1000),
		// 		goodsList: [
		// 			{ name: '上平邑', num: 9999, percentage: '50%' },
		// 			{ name: '上平2', num: 9999, percentage: '50%' },
		// 			{ name: '上平3', num: 9999, percentage: '50%' },
		// 			// {name: '上平4',num: 9999,percentage: '50%'},
		// 			{ name: '上平5', num: 9999, percentage: '50%' }
		// 		]
		// 	};
		// },
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
			if (isRefresh) {
				this.getActivityList();
				console.log('刷新');
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
