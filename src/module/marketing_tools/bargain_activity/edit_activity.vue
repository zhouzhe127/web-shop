<template>
	<div id="editActivity">
		<el-form :model="form" label-width="80px" class="editActivityForm">
			<el-form-item label="活动标题">
				<el-col :span="16">
					<el-input v-model="form.name" maxlength="20"></el-input>
				</el-col>
				<el-col :span="8">
					<el-alert class="h40" title="限制20字" type="info" show-icon>
					</el-alert>
				</el-col>
			</el-form-item>
			<el-form-item label="活动时间">
				<!-- <el-col :span="11">
					<el-date-picker type="date" placeholder="活动开始时间" v-model="form.beginTime" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">至</el-col>
				<el-col :span="11">
					<el-date-picker type="date" placeholder="活动结束时间" v-model="form.endTime" style="width: 100%;"></el-date-picker>
				</el-col> -->
				<el-date-picker v-model="form.activityTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="编辑商品" v-show="form.goodsList && form.goodsList.length">
				<el-button type="primary" size="mini" v-for="(v,i) in form.goodsList" :key="i">{{v.name}}</el-button>
			</el-form-item>
			<el-form-item>
				<el-button size="mini" @click="back">取消</el-button>
				<el-button type="primary" size="mini">保存</el-button>
				<el-button type="success" size="mini" @click="newGoods" v-show="form.goodsList.length<5">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data: () => {
		return {
			form: {
				name: '活动名称',
				goodsList: [],
				// beginTime: '',
				// endTime: '',
				activityTime: ''
			}
		};
	},
	props: {
		selectActivity: Object,
		activityDetail: Object
	},
	methods: {
		back() {
			this.$emit('back');
		},
		newGoods() {
			this.$emit('editGoods', 'EditActivity');
		}
	},
	computed: {
		isEdit() {
			return this.selectActivity ? true : false;
		}
	},
	created() {
		if (this.isEdit) {
			let goodsList = this.activityDetail.goodsList;
			this.form.goodsList = JSON.parse(JSON.stringify(goodsList));
			this.form.name = this.activityDetail.name;
			this.form.activityTime = [
				this.activityDetail.beginTime,
				this.activityDetail.endTime
			];
			// this.form.beginTime = this.activityDetail.beginTime
			// this.form.endTime = this.activityDetail.endTime
		}
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
