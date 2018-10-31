<template>
	<div id="editActivity">
		<el-form ref="activifyForm" :model="form" label-width="80px" class="editActivityForm" :rules="rules">
			<el-form-item label="活动标题" prop="name">
				<el-col :span="16">
					<el-input v-model="form.name" maxlength="20" placeholder="请输入活动标题"></el-input>
				</el-col>
				<el-col :span="8">
					<!-- <el-alert class="h40" title="限制20字" type="info" show-icon>
					</el-alert> -->
				</el-col>
			</el-form-item>
			<el-form-item label="活动时间" prop="activityTime">
				<el-date-picker v-model="form.activityTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="编辑商品" v-show="form.goodsList && form.goodsList.length">
				<el-button type="primary" size="mini" v-for="(v,i) in form.goodsList" :key="i" @click="editGoods(v)">{{v.name}}</el-button>
			</el-form-item>
			<el-form-item>
				<el-button size="mini" @click="back">取消</el-button>
				<el-button type="primary" size="mini" @click="submit">保存</el-button>
				<el-button type="success" size="mini" @click="submitAndCreateGoods" v-show="form.goodsList.length<5">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
		<template v-if="showEditGoods">
			<edit-activity-goods @close="goodsClose">
			</edit-activity-goods>
		</template>
	</div>
</template>

<script>
import http from 'src/manager/http';
// let isUpdate = false;
export default {
	data: () => {
		return {
			form: {
				name: '',
				goodsList: [],
				activityTime: ''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入活动名称',
						trigger: 'blur'
					}
				],
				activityTime: [
					{
						required: true,
						message: '请选择活动时间',
						trigger: 'blur'
					}
				]
			},
			showEditGoods: false,
			selectGoods: null
		};
	},
	props: {
		// selectActivity: Object,
		// activityDetail: Object
	},
	methods: {
		back(isRefresh) {
			this.$emit('back', isRefresh === 'Refresh');
		},
		goodsClose() {
			this.showEditGoods = false;
		},
		validateAndGeneratorParam() {
			let paramData;
			this.$refs.activifyForm.validate(valid => {
				if (valid) {
					paramData = {
						name: this.form.name,
						beginTime: this.form.activityTime[0] / 1000,
						endTime: this.form.activityTime[1] / 1000
					};
					if (this.selectedActivity) {
						paramData.id = this.selectedActivity.id;
					}
				} else {
					this.$message({
						message: '请将信息填写完整',
						type: 'warning'
					});
				}
			});
			return paramData;
		},
		async createActivity(paramData) {
			return await http.activityCreateActivity({ data: paramData });
		},
		async editActivity(paramData) {
			return await http.activityEditActivity({ data: paramData });
		},
		editGoods(goods) {
			// 编辑商品
			// this.editGoods = goods;
			this.$store.commit('selectGoods', goods);
			this.showEditGoods = true;
		},
		submit() {
			let paramData = this.validateAndGeneratorParam();
			if (!paramData) return;
			if (paramData.id) {
				this.editActivity(paramData);
			} else {
				this.createActivity(paramData);
			}
			this.back('Refresh');
		},
		submitAndCreateGoods() {
			let paramData = this.validateAndGeneratorParam();
			if (!paramData) return;
			let res;
			if (paramData.id) {
				res = this.editActivity(paramData);
				this.$store.commit('selectActivity', paramData);
				// get detail ：商品1 商品2 商品3
			} else {
				res = this.createActivity(paramData);
				paramData.id = res.id;
				this.$store.commit('createdActivity', true, paramData);
			}
			this.$store.commit('selectGoods', null);
			this.showEditGoods = true;
		},
		async getDetail() {
			let detail = await http.activityGetActivityDetail({
				data: {
					actId: this.selectedActivity.id
				}
			});
			this.form.goodsList =
				detail.goods instanceof Array ? detail.goods : [];
			this.form.name = detail.name;
			this.form.activityTime = [
				new Date(detail.beginTime * 1000),
				new Date(detail.endTime * 1000)
			];
		}
	},
	computed: {
		selectedActivity() {
			return this.$store.getters.getActivity;
		},
		isEdit() {
			return this.selectActivity ? true : false;
		}
	},
	created() {
		if (this.selectedActivity) {
			this.getDetail();
		}
	},
	components: {
		EditActivityGoods: () =>
			import(/*webpackChunkName: 'edit_activity_goods'*/ './edit_activity_goods.vue')
	}
};
</script>

<style scoped lang="less">
.editActivityForm {
	width: 500px;
}
.w240 {
	width: 240px;
}
.h40 {
	height: 40px;
	line-height: 40px;
}
</style>
