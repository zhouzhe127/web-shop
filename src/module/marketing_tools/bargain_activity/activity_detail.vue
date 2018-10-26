<template>
	<div id="activityDetail">
		<div class="navigation clearFix">
			<div class="startText">统计范围</div>
			<div>
				<el-date-picker
						v-model="qureyTime"
						type="daterange"
						start-placeholder="开始日期"
						end-placeholder="结束日期">
					</el-date-picker> 
			</div>
			<div>
				<el-button type="primary" @click="filterData">筛选</el-button>
			</div>
			<div class="rightBtn">
				<el-button type="primary" @click="back">返回</el-button>
			</div>
		</div>
		<div class="tableWrap">
			<el-table border
					:data="goodsList"
					style="width: 100%">
					<el-table-column
						prop="name"
						label="商品名称"
						width="100">
					</el-table-column>
					<el-table-column
						prop="num"
						label="发起砍价人数"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="帮砍人数"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="发券量"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="核销量"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="新增会员"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="优惠金额"
						>
					</el-table-column>
					<el-table-column
						prop="percentage"
						label="优惠占比"
						>
					</el-table-column>
					<el-table-column
						prop="num"
						label="拉动消费"
						>
					</el-table-column>
					<el-table-column
						prop="date"
						label="操作"
						width="100">
						<template slot-scope="scope">
							<el-button @click="activation(scope.$index)" type="text" size="small" v-if="0">上架</el-button>
							<el-button @click="abolish(scope.$index)" type="text" size="small" v-else>下架</el-button>
							<el-button type="text" size="small" @click="editActivity(scope.$index)">编辑</el-button>
						</template>
					</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	data: ()=>{
		return {
			qureyTime: '',
			goodsList: []
		};
	},
	props: {
		selectActivity: {type:Object,required: true},
		activityDetail: {type:Object,required: true}
	},
	methods: {
		// 上架
		activation(){
			console.log('no-empty-function');
		},
		// 架
		abolish(){
			console.log('no-empty-function');
		},
		// 编辑
		editActivity(){
			console.log('no-empty-function');
		},
		// 按照时间过滤
		async filterData(){
			// this.goodsList = await http.getActivityDetail()
			this.goodsList = this.goodsList.splice(0,this.goodsList.length-1);
		},
		back(){
			this.$emit('back');
		}
	},
	computed:{},
	created(){
		this.goodsList = this.activityDetail.goodsList;
	}
};
</script>

<style lang="less" scoped>
	.navigation{
		margin-bottom: 20px;
		>div{
			float: left;
			margin: 0 5px;
		}
		.startText {
			height: 40px;
			line-height: 40px;
		}
		.rightBtn{
			float: right;
		}
	}

</style>
