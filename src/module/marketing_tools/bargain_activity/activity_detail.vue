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
				<el-table-column prop="name" label="商品名称" width="200"> </el-table-column>
				<template v-if="isBrand">
					<el-table-column prop="launchNum" label="发起砍价人数"> </el-table-column>
					<el-table-column prop="helperNum" label="帮砍人数"></el-table-column>
					<el-table-column prop="income" label="券金收入"></el-table-column>
					<el-table-column prop="fsCoin" label="返利金额"></el-table-column>
					<el-table-column prop="grantNum" label="发券量"></el-table-column>
				</template>
				<el-table-column prop="useNum" label="核销量"></el-table-column>
				<el-table-column v-if="isBrand" prop="newMemberNum" label="新增会员"></el-table-column>
				<el-table-column prop="discount" label="优惠金额"></el-table-column>
				<el-table-column prop="discountRatio" label="优惠占比"> </el-table-column>
				<el-table-column prop="orderPrice" label="拉动消费"></el-table-column>
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

// let isUpdate = false;
export default {
	data: () => {
		return {
			qureyTime: '',
			goodsList: [],
			showEditGoods: false,
			selectGoods: null,
			isBegin: false,
			isBrand: false
		};
	},
	props: {
		// selectActivity: {type:Object,required: true},
		// activityDetail: {type:Object,required: true}
	},
	methods: {
		goodsClose(needRefresh) {
			if (needRefresh || this.$store.state.selectedActivityChange) {
				this.getDetail();
				this.$store.commit('changeActivity', false);
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
				this.$message({ type: 'success', message: '上架成功' });
				this.$store.commit('changeActivityList', true);
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
				this.$message({ type: 'success', message: '下架成功' });
				this.$store.commit('changeActivityList', true);
				// this.getDetail()
				goods.status = '0';
			}
		},
		// 编辑
		editActivity(v) {
			this.$store.commit('selectGoods', v);
			this.showEditGoods = true;
		},
		// 按照时间过滤
		async filterData() {
			// this.goodsList = await http.getActivityDetail()
			// this.goodsList = this.goodsList.splice(
			// 	0,
			// 	this.goodsList.length - 1
			// );
			this.getDetail(1);
		},
		back() {
			this.$emit('back');
		},
		async getDetail(isSearch) {
			let param = {
				brandId: this.brandId,
				actId: this.selectedActivity.id
			};
			if (isSearch && this.qureyTime && this.qureyTime[0]) {
				param.beginTime = ~~(this.qureyTime[0] / 1000);
				param.endTime = ~~(this.qureyTime[1] / 1000);
			}
			let data = await http.statisticGetActivityGoods({
				data: param
			});
			if (data) {
				data.forEach(v => {
					v.discountRatio =
						~~((v.discount / v.orderPrice) * 10000) / 100 + '%';
				});
				this.goodsList = data;
				this.isBegin = this.selectedActivity.isBegin;
			}
		}
	},
	computed: {
		selectedActivity() {
			return this.$store.getters.getActivity;
		}
	},
	created() {
		let currentShop = storage.session('userShop').currentShop;
		this.isBrand = currentShop.ischain == 3 ? true : false; //单店 0 直营1 加盟2 品牌3
		this.brandId =
			currentShop.ischain == 0 || currentShop.ischain == 3
				? currentShop.id
				: currentShop.brandId;
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
