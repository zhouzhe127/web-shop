<template>
	<div id="editActivity">
		<el-alert v-if="selectedActivity" title="活动开始时间调整，不能低于当前时间哦~否则不与保存" type="info" show-icon></el-alert>
		<template v-else>
			<el-alert title="活动开始时间至少为第二日0点" type="info" show-icon></el-alert>
			<el-alert title="活动开始后，无法编辑活动与商品，若商品有误请进入活动下架商品" type="info" show-icon></el-alert>
		</template>
		<el-form ref="activifyForm" :model="form" label-width="80px" class="editActivityForm" :rules="rules" v-show="!showEditGoods">
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
				<!-- <el-date-picker v-model="form.activityTime" 
					type="datetimerange" align="right" 
					:picker-option="pickerOption"
					>
				</el-date-picker> -->
				<el-date-picker v-model="form.activityTime" align="right" type="datetimerange" :default-time="['00:00:00', '23:59:59']" start-placeholder="开始日期" end-placeholder="结束日期" 
				:picker-options="selectedActivity?pickerOption:isCreatePickerOption">
				</el-date-picker>
				<span class="textTip">选择{{activityTimeLength}}天</span>
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
			<edit-activity-goods @close="goodsClose" :goodsNum="form.goodsList && form.goodsList.length || 0">
			</edit-activity-goods>
		</template>
	</div>
</template>

<script>
import http from 'src/manager/http';
const NOW = new Date();
const ONE_DAY = 86400000;
export default {
	data: () => {
		function validateActivityTime(rule, value, cb) {
			if (value[0] < new Date()) {
				cb(new Error('活动开始时间不能早于当前时间'));
			} else {
				cb();
			}
		}
		return {
			form: {
				id: '',
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
					},
					{ validator: validateActivityTime, trigger: 'blur' }
				]
			},
			showEditGoods: false,
			selectGoods: null,
			pickerOption: {
				disabledDate: time =>  time < NOW.setHours(0, 0, 0, 0) 
			},
			isCreatePickerOption: {
				disabledDate: time => time < NOW
			}
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
		goodsClose(needRefresh) {
			if (needRefresh || this.$store.state.selectedActivityChange) {
				this.getDetail();
				this.$store.commit('changeActivity', false);
			}
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
			let res = await http.activityCreateActivity({ data: paramData });
			if (res) {
				this.$message({ type: 'success', message: '新建活动成功' });
				this.form.id = res;
				this.$store.commit('changeActivityList',true);
			}
		},
		async editActivity(paramData) {
			let res = await http.activityEditActivity({ data: paramData });
			if (res) {
				this.$message({ type: 'success', message: '编辑活动成功' });
				this.$store.commit('changeActivityList',true);
			}
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
		async submitAndCreateGoods() {
			let paramData = this.validateAndGeneratorParam();
			if (!paramData) return;
			if (paramData.id) {
				this.editActivity(paramData);
				this.$store.commit('selectActivity', paramData);
				// get detail ：商品1 商品2 商品3
			} else {
				await this.createActivity(paramData);
				paramData.id = this.form.id;
				paramData.goods = [];
				this.$store.commit('createdActivity', paramData);
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
		activityTimeLength() {
			if(this.form.activityTime == '') return 0;
			return Math.ceil((this.form.activityTime[1] -  this.form.activityTime[0])/ONE_DAY);
		}
	},
	created() {
		NOW.setTime(+new Date());
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
	margin-top: 20px;
	width: 650px;
}
.w240 {
	width: 240px;
}
.h40 {
	height: 40px;
	line-height: 40px;
}
.textTip {
	padding: 0 5px;
	color: #cecece;
}
</style>
