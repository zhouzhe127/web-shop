<!--
 * @Description: 商品指派
 * @Author: han
 * @Date: 2018-12-06 15:41:13
 * @LastEditTime: 2018-12-07 15:43:43
 * @LastEditors: Please set LastEditors
 -->

<template>
	<div class="gooods_assign">
		<!-- 数据展示部分 -->
		<template v-if="!assignAddShow">
			<!-- 搜索任务 -->
			<div class="task-search">
				<el-input style="width:240px;" v-model="taskSearchKeyWords" suffix-icon="el-icon-search" placeholder="输入任务名称"></el-input>
			</div>
			<!-- 任务状态切换查看 -->
			<div class="task-status">
				<span class="status-btn" v-for="(item,index) in taskCheckList" @click="checkTaskStatus(item)" :key="index" :class="{'active':taskCheck == item.check}" :data-status="item.status">
					{{item.name}}
				</span>
			</div>
			<!-- 任务table -->
			<div class="task-table">
				<el-table :data="assignTaskList" :header-cell-style="{'background-color':'#f5f7fa'}" border stripe>
					<!-- 序号 -->
					<el-table-column label="序号">
						<template slot-scope="scope">
							{{scope.$index}}
						</template>
					</el-table-column>
					<!-- 时间 -->
					<el-table-column label="时间">

					</el-table-column>
					<!-- 名称 -->
					<el-table-column label="名称">

					</el-table-column>
					<!-- 创建人 -->
					<el-table-column label="创建人">

					</el-table-column>
					<!-- 发布人 -->
					<el-table-column label="发布人">

					</el-table-column>
					<!-- 状态 -->
					<el-table-column label="状态">

					</el-table-column>
					<!-- 操作 -->
					<el-table-column label="操作">

					</el-table-column>
				</el-table>
			</div>
			<!-- 任务分页 -->
			<div class="task-pagination">
				<el-pagination 
				background 
				@size-change="sizeChange" 
				@current-change="pageClick" 
				:current-page="Number(currentPage)" 
				:page-count="Number(totalNum)" 
				:page-size="Number(pageSize)" 
				layout="sizes, prev, pager, next, jumper" 
				:page-sizes="[10,20,30,50]"></el-pagination>
			</div>
		</template>
		<!-- 添加新任务部分 -->
		<assignAdd v-if="assignAddShow" @addGoBack="assignAddBack"></assignAdd>
		<!--  -->
	</div>
</template>

<script>
	export default {
		name: 'goods_assign_cont',
		data() {
			return {
				taskSearchKeyWords:'', // 任务搜索字段
				taskCheckList:[
					{
						check:0,
						name:"全部"
					},
					{
						check:1,
						name:"已完成"
					},
					{
						check:2,
						name:"未指派"
					},
				],
				taskCheck:0, // 任务切换状态
				assignTaskList:[], // 指派任务列表

				assignAddShow:false,// 添加模板页面
				
				
				currentPage:1,
				totalNum:10,
				pageSize:10,
			};
		},
		created(){
			this.initToolsBtn();
		},
		methods:{
			// 初始化添加按钮
			initToolsBtn(){
				let arr = [
					{
						name: '新建指派任务',
						type: 7,
						icon: 'el-icon-plus',
						className: 'primary',
						fn: () => {
							this.addNewAssignTask();
						}
					}
				];
				this.$store.commit('setPageTools', arr);
			},
			// 添加模板
			addNewAssignTask(){
				this.assignAddShow = true
			},
			// 添加模板返回
			assignAddBack(res){
				console.log(res,'res')
				this.assignAddShow = false;
				this.initToolsBtn();
			},
			// 切换模板状态
			checkTaskStatus(item){
				this.taskCheck = item.check
			},
			// -------------分页-----
			sizeChange(){

			},
			pageClick(){

			},
		},
		components:{
        assignAdd: () => import(/* webpackChunkName:'goods_assign_add' */ './goods_assign_com/goods_assign_add')
    }
	};
</script>

<style lang="less" scoped>
.task-status{
	height: 40px;
	border-bottom: 1px solid #E3E7EA;
	margin:20px 0;
	.status-btn{
		display: inline-block;
		padding: 0 15px;
		line-height: 40px;
		color: #3c3c3c;
		position: relative;
		margin-right: 10px;
		cursor: pointer;
		&:after{
			content: '';
			display: block;
			width: 100%;
			height: 2px;
			background: #DDBD4A;
			position: absolute;
			left: 0;
			bottom: 0;
			opacity: 0;
		}
		&.active,&:hover{
			color: #DDBD4A;
			&:after{
				opacity: 1;
			}
		}
	}
}
</style>
