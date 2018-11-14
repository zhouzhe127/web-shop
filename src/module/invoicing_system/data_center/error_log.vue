<!--
    **错误日志
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="error-log">
		<div class="title">
			<span>数据表 - {{name}} 异常数据</span>
			<div class="line"></div>
		</div>
		<div class="list">
			<el-table :data="list" stripe border style="width:100%" :header-cell-style="{'background-color':'#f5f7fa'}">
				<el-table-column type="index" :index="indexMethod" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="集合名词" width="200">
				</el-table-column>
				<el-table-column prop="itemName" label="商品名称" width="200">
				</el-table-column>
				<el-table-column prop="reportName" label="所在列" width="200">
				</el-table-column>
				<el-table-column label="错误日志" min-width="200">
					<template slot-scope="scope">
						<span style="color: red;">{{scope.row.errorLog}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box">
			<el-pagination @current-change="(res)=>{pageChange(res,1)}" @size-change="pageChange"
				:current-page="page"
				background
				layout="sizes,total,prev, pager, next"
				:page-sizes="[10, 20, 50]"
				:total="count">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';

export default {
	data() {
		return {
			id:'1',//报表id
			name:'',//报表名称
			oriList:[],//原列表
			list:[],//数据列表
			pageSize:10,
			page:1,
			count:0,
		};
	},
	mounted() {
		this.id = this.$route.query.id;
		this.name = this.$route.query.name;
		this.initData();
	},
	methods: {
		//初始化数据
		async initData(){
			let data = await http.materialreportGetMaterialErrorLog({data:{
				id:this.id,
			}});
			this.oriList = data;
			this.count = data.length;
			this.paging();
		},
		indexMethod(index){
			return this.pageSize*(this.page-1)+index+1;
		},
		pageChange(res,type){
			if(type){
				this.page = res;
			}else{
				this.pageSize = res;
			}
			this.paging();
		},
		//前端分页
		paging(){
			let start,end;
			start = (this.page-1)*this.pageSize;
			end = (this.page)*this.pageSize;
			this.list = this.oriList.slice(start,end);
		}
	},
};
</script>
<style lang='less' scoped>
	.error-log{
		.title{
			width: 100%;position: relative;height: 20px;
			span{
				display: inline-block;background: #fff;padding-right: 20px;padding-left: 10px;
				border-left: 3px solid #E1BB4A;position: absolute;z-index: 2;
				font-size: 16px;
			}
			.line{
				position: absolute;top: 7px;left: 0;height: 0;border-bottom: 2px dashed #ccc;width: 100%;
			}
		}
		.list{
			padding-top: 20px;
		}
		.page-box{
			margin-top: 20px;
		}
	}
</style>