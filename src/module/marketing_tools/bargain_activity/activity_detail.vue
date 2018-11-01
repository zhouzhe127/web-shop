<template>
	<div id="activityDetail">
		<div class="navigation clearFix">
			<div class="startText">统计范围</div>
			<div>
				<el-date-picker v-model="qureyTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div>
				<el-button type="primary" @click="filterData">筛选</el-button>
			</div>
			<div class="rightBtn">
				<el-button type="primary" @click="back">返回</el-button>
			</div>
		</div>
		<div class="tableWrap" v-show="!showEditGoods">
			<el-table border :data="goodsList" style="width: 100%;text-align: center;" :header-cell-style="{'text-align': 'center'}">
				<el-table-column prop="name" label="商品名称" width="100">
				</el-table-column>
				<el-table-column prop="needPeople" label="发起砍价人数">
				</el-table-column>
				<el-table-column prop="needPeople" label="帮砍人数">
				</el-table-column>
				<el-table-column prop="needPeople" label="发券量">
				</el-table-column>
				<el-table-column prop="needPeople" label="核销量">
				</el-table-column>
				<el-table-column prop="needPeople" label="新增会员">
				</el-table-column>
				<el-table-column prop="needPeople" label="优惠金额">
				</el-table-column>
				<el-table-column prop="needPeople" label="优惠占比">
				</el-table-column>
				<el-table-column prop="needPeople" label="拉动消费">
				</el-table-column>
				<el-table-column v-if="isBrand" prop="date" label="操作" width="100">
					<template slot-scope="scope">
						<template v-if="scope.row.status == 0">
							<el-button @click="activation(scope.row)" type="text" size="small">上架</el-button>
						</template>
						<template v-else>
							<el-button @click="abolish(scope.row)" type="text" size="small">下架</el-button>
						</template>
						<el-button type="text" size="small" v-if="!isBegin" @click="editActivity(scope.row)">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<template v-if="showEditGoods">
			<edit-activity-goods @close="goodsClose" :goodsNum="goodsList && goodsList.length || 0">
			</edit-activity-goods>
		</template>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

let isBrand =
	storage.session('userShop').currentShop.ischain == 3 ? true : false;
// let isUpdate = false;
export default {
	data: () => {
		return {
			qureyTime: '',
			goodsList: [],
			showEditGoods: false,
			selectGoods: null,
			isBegin: false,
			isBrand
		};
	},
	props: {
		// selectActivity: {type:Object,required: true},
		// activityDetail: {type:Object,required: true}
	},
	methods: {
		goodsClose(needRefresh) {
			if(needRefresh ||  this.$store.state.selectedActivityChange){
				this.getDetail();
				this.$store.commit('changeActivity',false);
			}
			this.showEditGoods = false;
		},
		// 上架
		async activation(goods) {
			let data = await http.activityPushGoods({
				data: {
					actId: goods.actId,
					id: goods.id
				}
			});
			if (data) {
				this.$message({type:'success',message: '上架成功'});
				goods.status = '1';
			}
		},
		// 下架
		async abolish(goods) {
			let data = await http.activityRevokePushGoods({
				data: {
					actId: goods.actId,
					id: goods.id
				}
			});
			if (data) {
				this.$message({type:'success',message: '下架成功'});
				// this.getDetail()
				goods.status = '0';
			}
		},
		// 编辑
		editActivity(goods) {
			this.$store.commit('selectGoods', goods);
			this.showEditGoods = true;
		},
		// 按照时间过滤
		async filterData() {
			// this.goodsList = await http.getActivityDetail()
			this.goodsList = this.goodsList.splice(
				0,
				this.goodsList.length - 1
			);
		},
		back() {
			this.$emit('back');
		},
		async getDetail() {
			let data = await http.activityGetActivityDetail({
				data: {
					actId: this.selectedActivity.id
				}
			});
			this.goodsList = data.goods;
			this.isBegin = this.selectedActivity.isBegin;
			console.log(this.isBegin);
		}
	},
	computed: {
		selectedActivity() {
			return this.$store.getters.getActivity;
		}
	},
	created() {
		this.getDetail();
		// this.goodsList = this.selectedGoods //this.activityDetail.goodsList;
	},
	components: {
		EditActivityGoods: () =>
			import(/*webpackChunkName: 'edit_activity_goods'*/ './edit_activity_goods.vue')
	}
};
</script>

<style lang="less" scoped>
.navigation {
	margin-bottom: 20px;
	> div {
		float: left;
		margin: 0 5px;
	}
	.startText {
		height: 40px;
		line-height: 40px;
	}
	.rightBtn {
		float: right;
	}
}
</style>
