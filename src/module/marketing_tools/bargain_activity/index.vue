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
					<el-button type="primary">查询</el-button>
				</div>
				<div class="rightBtn">
					<el-button type="primary" @click="downQrCode" v-if="0">下载小程序码</el-button>
					<el-button type="primary" @click="newActivity" v-else>新建活动</el-button>
				</div>
			</div>
			<div class="list">
				<el-table :data="activityList" border style="width: 100%">
					<el-table-column prop="date" label="活动标题" width="100">
					</el-table-column>
					<el-table-column prop="name" label="创建时间" width="180">
					</el-table-column>
					<el-table-column prop="name" label="商品数量">
					</el-table-column>
					<el-table-column prop="name" label="发起砍价人数">
					</el-table-column>
					<el-table-column prop="name" label="发券量">
					</el-table-column>
					<el-table-column prop="name" label="优惠金额">
					</el-table-column>
					<el-table-column prop="name" label="优惠占比">
					</el-table-column>
					<el-table-column prop="name" label="拉动消费">
					</el-table-column>
					<el-table-column prop="address" label="活动时间" width="280">
					</el-table-column>
					<el-table-column prop="name" label="活动状态">
					</el-table-column>
					<el-table-column prop="name" label="券金收入">
					</el-table-column>
					<el-table-column prop="name" label="返利金额">
					</el-table-column>
					<el-table-column label="操作" fixed="right" width="150">
						<template slot-scope="scope">
							<el-button @click="intoDetail(scope.$index)" type="text" size="small">查看详情</el-button>
							<el-button type="text" size="small" @click="editActivity(scope.$index)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="footerPageing" v-if="pageTotal>1">
				<el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="12" :total="pageTotal" @current-change="pageChange">
				</el-pagination>
			</div>
		</div>
		<template v-if="scene">
			<component :is="scene" :selectActivity="selectActivity" :activityDetail="activityDetail" :selectGoods="selectGoods" @back="comeBack" @editGoods="editGoods"></component>
		</template>
		<template v-if="showEditGoods">
			<edit-activity-goods @closeEditGoods="closeEditGoods" :selectGoods="selectGoods">
			</edit-activity-goods>
		</template>
	</section>
</template>

<script>
import EditActivity from './edit_activity';
import ActivityDetail from './activity_detail';
// import http from 'src/manager/http';
// let qureyTemp = {
// 	qureyTime: '',
// 	keyword: ''
// }
export default {
	data: () => {
		return {
			scene: '', // 情景
			activityList: [],
			qureyTime: '',
			keyword: '', // 检索用的关键字
			pageIndex: 1,
			pageSize: 15,
			pageTotal: 165,
			selectActivity: null,
			activityDetail: null,
			selectGoods: null,
			showEditGoods: false
		};
	},
	methods: {
		async getActivityList(event, changePage) {
			// let param;
			if (event && !changePage) {
				// if (keyword !== '') {
				//	 qureyTemp = {keyword: this.keyword}
				// 	param = {
				// 		keyword
				// 	};
				// } else if(qureyTime){
				//  qureyTemp = {qureyTime: [qureyTime[0],qureyTime[1]]}
				// 	param = {
				// 		startTime: qureyTime[0],
				// 		endTime: qureyTime[1]
				// 	};
				// }
			} else if (changePage) {
				// if(qureyTemp.keyword){
				// 	param = {keyword:qureyTemp.keyword}
				// } else if(qureyTemp.qureyTime){
				// 	param = {
				// 		startTime: qureyTemp.qureyTime[0],
				// 		endTime: qureyTemp.qureyTime[1]
				// 	};
				// }
			}
			// let data = await http.getBargainActivityList(param)
			let data = [
				{
					date: '2016-05-02',
					name: '王小虎',
					name1: '王小虎1',
					name2: '王小虎2',
					name3: '王小虎3',
					name4: '王小虎4',
					name5: '王小虎5',
					name6: '王小虎6',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					name1: '王小虎1',
					name2: '王小虎2',
					name3: '王小虎3',
					name4: '王小虎4',
					name5: '王小虎5',
					name6: '王小虎6',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					name1: '王小虎1',
					name2: '王小虎2',
					name3: '王小虎3',
					name4: '王小虎4',
					name5: '王小虎5',
					name6: '王小虎6',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-02',
					name: '王小虎',
					name1: '王小虎1',
					name2: '王小虎2',
					name3: '王小虎3',
					name4: '王小虎4',
					name5: '王小虎5',
					name6: '王小虎6',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			];
			this.activityList = data;
		},
		editActivity(index) {
			this.selectActivity = this.activityList[index];
			this.getActivityDetail();
			this.scene = 'EditActivity';
		},
		intoDetail(index) {
			this.selectActivity = this.activityList[index];
			this.getActivityDetail();
			this.scene = 'ActivityDetail';
		},
		async getActivityDetail() {
			// this.activityDetail = await http.getActivityDetail({})
			this.activityDetail = {
				id: 20,
				shopId: 10086,
				name: '双十一活动',
				beginTime: new Date(1540779984 * 1000),
				endTime: new Date(1541879984 * 1000),
				goodsList: [
					{ name: '上平邑', num: 9999, percentage: '50%' },
					{ name: '上平2', num: 9999, percentage: '50%' },
					{ name: '上平3', num: 9999, percentage: '50%' },
					// {name: '上平4',num: 9999,percentage: '50%'},
					{ name: '上平5', num: 9999, percentage: '50%' }
				]
			};
		},
		pageChange(page) {
			this.pageIndex = page;
			this.getActivityList();
		},
		// 新建活动
		newActivity() {
			this.selectActivity = null;
			this.scene = 'EditActivity';
		},
		// 下载二维码
		downQrCode() {
			console.log('no-empty-function');
		},
		comeBack() {
			this.scene = '';
		},
		editGoods(data) {
			if (data) {
				this.selectGoods = data;
			}
			this.showEditGoods = true;
		},
		closeEditGoods(data) {
			if (data) {
				this.selectGoods = data;
			}
			this.showEditGoods = false;
		}
	},
	computed: {},
	components: {
		EditActivity,
		ActivityDetail,
		EditActivityGoods: () =>
			import(/*webpackChunkName: 'edit_activity_goods'*/ './edit_activity_goods.vue')
	},
	created() {
		this.getActivityList();
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
