<!-- 更改记录 -->
<template>
	<div class="historical_record">
		<!-- 表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>积分变动</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="listInfo.list" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="createTime" label="操作时间" align="center">
					<template slot-scope="scope">
						<span>{{translateTime(scope.row.createTime,'1')}}</span>
					</template>
				</el-table-column>
				<el-table-column label="变动值" prop="name" align="center">
					<template slot-scope="scope">
						<span>{{judgeType(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="原因" align="center">
					<template slot-scope="scope">
						<span>{{filterType(scope.row.type)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="变动后" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.point}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import { mixin } from './mixin.js';

	export default {
		props: {
			mid: String,
			shopsId: String,
			bannerIndex: Number
		},
		mixins: [mixin],
		data() {
			return {
				page: 1, //页数
				num: 10, //一页请求的条数
				total: 0, //总页数
				count: '',
				listInfo: '' //数据
			};
		},
		methods: {
			async getRecordList() { //获取记录
				let data = await http.getRecordList({
					data: {
						mid: this.mid,
						page: this.page,
						num: this.num,
						type: 2,
					}
				});
				this.listInfo = data;
				this.count = (this.page == 1) ? data.count : this.count;
				this.total = (this.page == 1) ? data.total : this.total;
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getRecordList();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getRecordList();
			}
		},
		mounted() {
			this.getRecordList();
		}
	};
</script>
<style scoped>
	.historical_record {
		width: 100%;
		height: 100%;
	}

	.historical_record .searchbar {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
	}

	.historical_record .searchbar .selbox {
		margin-right: 15px;
	}
</style>