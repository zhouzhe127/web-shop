<template>
	<div id="editActivity">
		<el-form   :model="form" label-width="80px" class="editActivityForm">
			<el-form-item label="活动标题">
				<el-col :span="16">
					<el-input v-model="form.name"></el-input>
				</el-col>
				<el-col :span="8" >
					<el-alert class="h40"
						title="限制20字"
						type="info"
						show-icon>
					</el-alert>
				</el-col>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endTime" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="编辑商品" v-show="form.goodsList && form.goodsList.length">
				<el-button type="primary" size="mini" v-for="(v,i) in form.goodsList" :key="i">{{v.name}}</el-button>
			</el-form-item>
			<el-form-item >
				<el-button size="mini" @click="back">取消</el-button>
				<el-button type="primary" size="mini" >保存</el-button>
				<el-button type="success" size="mini" @click="newGoods">保存并新建商品</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data: ()=>{
		return {
			form: {
				name: '活动名称',
				goodsList: [],
				startTime: '',
				endTime: '',
			}
		};
	},
	props: {
		selectActivity: Object,
		activityDetail: Object
	},
	methods: {
		back(){
			this.$emit('back');
		},
		newGoods() {
			this.$emit('editGoods');
		}
	},
	computed:{
		isEdit(){
			return this.selectActivity?true:false;
		}
	},
	created() {
		if(this.isEdit){
			let goodsList = this.activityDetail.goodsList;
			this.form.goodsList = JSON.parse(JSON.stringify(goodsList));
			this.form.name = this.selectActivity.name;
		}
	}

};
</script>

<style scoped lang="less">
	.editActivityForm{
		width: 500px;
	}
	.w240{
		width: 240px;
	}
	.h40{
		height: 40px;
		line-height: 40px;
	}
</style>
