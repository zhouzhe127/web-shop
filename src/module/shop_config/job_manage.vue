<!--
	**职位管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="joblist" style="width:100%;">
		<section class="jobTop">
			<el-input v-model="search" clearable placeholder="请输入职位名称" style="width:150px;"></el-input>
			<el-button @click="keyUp" type="primary">搜索</el-button>
			<el-button @click="reset" type="info">重置</el-button>
		</section>
		<section class="allList">
			<section class="oBox">
				<div class="boxTop">
					<span style="font-size:16px;margin-right: 20px;">职位列表 · 共<span style="color: #ff3c04;font-size: inherit;">{{list.length}}</span>个条目</span>
				</div>
				<el-table
					ref="multipleTable" stripe
					:header-cell-style = "{'background-color':'#f5f7fa'}"
					:data="lists"
					border
					style="width: 100%">
					<el-table-column fixed min-width = "120" align="center" label="操作">
						<template slot-scope="scope">
							<span style="color: #FE8D2C;cursor:pointer" @click="edit(scope.row.id,scope.$index)">编辑</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span style="color: #FD3F1F;cursor:pointer" @click="deljob(scope.row,scope.$index)">删除</span>
						</template>
					</el-table-column>
					<el-table-column align="center" min-width = "100" label="序号">
						<template slot-scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="name" label="职位名称"></el-table-column>
					<el-table-column show-overflow-tooltip min-width = "120" prop="nodeNum" align="center" label="权限数量" > </el-table-column>
					<el-table-column prop="personNum" min-width = "120" align="center" label="职位人数" > </el-table-column>
				</el-table>
			</section>
			<div style="margin-top:10px;">
				<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="currentPage" :page-size = "num" layout="sizes, prev, pager, next" :page-count="totalNum" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</section>
		<job-win v-if="showWin" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :jobId="jobId" :jobIndex="jobIndex" :list="copyList">
		</job-win>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			titleList: [
				{ titleName: '操作', titleStyle: { width: '20%' } },
				{ titleName: '序号', titleStyle: { width: '10%' } },
				{
					titleName: '职位名称',
					titleStyle: { width: '30%' },
					dataName: 'name'
				},
				{
					titleName: '权限数量',
					titleStyle: { width: '20%' },
					dataName: 'nodeNum'
				},
				{
					titleName: '职位人数',
					titleStyle: { width: '20%' },
					dataName: 'personNum'
				}
			],
			showWin: false,
			userData: Object,
			list: [], // 职位信息列表
			copyList: [], // copy职位信息列表
			isAdd: true,
			jobId: '', //职位id
			jobIndex: '', //职位列表索引
			search: '',
			num: 10, // 每页展示的数量
			currentPage: 1, //当前展示的页数
			pagenumArr: [10, 20, 50],
			ischain:''
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.ischain = this.userData.currentShop.ischain;
		this.$store.commit('setPageTools', [
			{
				name: '添加职位',
				type:4,
				className: 'plain',
				fn: this.add
			}
		]);
		this.init();
	},
	computed: {
		totalNum() {
			return Math.ceil(this.list.length / this.num);
		},
		lists() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.list.slice(startIndex, endIndex);
		}
	},
	methods: {
		async init() {
			let res = await http.newGetJobInfoList({ data: {} });
			if (res) {
				this.list = res;
				this.copyList = res;
				this.sortList();
			}
		},
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少行
		numChange(e){
			this.num = e;
			this.currentPage = 1;
		},
		//筛选按钮点击
		keyUp: function() {
			let findList = [];
			this.currentPage = 1; //让分页页数置为第一页
			let list = this.copyList;
			for (let i = 0; i < list.length; i++) {
				if (this.search != '') {
					let name = list[i].name + '';
					if (name.indexOf(this.search) == -1) {
						continue;
					}
				}
				findList.push(list[i]);
			}
			this.list = findList;
		},
		//重置
		reset: function() {
			this.search = '';
			this.keyUp();
		},
		// 添加职位
		async addJob(detial) {
			let res = await http.newAddJob({
				data: detial
			});
			if (res) {
				this.init();
				// this.list.push(res);
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '添加成功'
				});
			} else {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '返回数据错误，请刷新后重试'
				});
			}
		},
		// 修改职位
		async editJob(detial) {
			let res = await http.newEditJob({
				data: detial
			});
			// let list = [];
			if (res) {
				// this.list.splice(this.jobIndex,1,res);
				// list = this.list;
				this.init();
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '修改成功'
				});
			} else {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '返回数据错误，请刷新后重试'
				});
			}
		},
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		edit(id, index) {
			this.isAdd = false;
			this.jobId = id;
			this.jobIndex = index;
			this.showWin = true;
		},
		doThrowWinResult(res, detial) {
			if (res == 'ok') {
				if (this.isAdd) {
					this.addJob(detial);
				} else {
					this.editJob(detial);
				}
				this.showWin = false;
			} else if (res == 'cancel' || res == 'close') {
				this.showWin = false;
			} else {
				this.showWin = true;
			}
		},
		deljob: function(item, index) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除“ ' + item.name + ' ”职位信息?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteJob(item.id, index);
					}
				}
			});
		},
		// 删除
		async deleteJob(id, index) {
			let res = await http.newDeleteJob({
				data: { id: id }
			});
			if (res) {
				//删除，还让其显示当前页面
				this.list.splice(index, 1);
				if (this.list.length == 0) {
					this.currentPage = this.currentPage - 1;
				}
				this.init();
			}
		},
		//排序
		sortList() {
			this.list = utils.sortByAll(this.list, ['sort', 'id'], true);
		}
	},
	components: {
		jobWin: () =>
			import(/*webpackChunkName: "job_manage_one"*/ './job_manage_one'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	}
};
</script>

<style scoped lang="less" >
#joblist .jobTop {
	height: 40px;
}
#joblist .allList {
	background-color: #ffffff;
	font-size: 16px;
	min-height: 400px;
	padding-bottom: 50px;
	.oBox{
		width:100%;border-bottom:none;margin:10px 0;
		.boxTop{
			height:50px;line-height: 50px;border-bottom:1px solid #ebeef5;padding:0 5px;border:1px solid #ebeef5;border-bottom:none;
			.aSpan {
				font-size: 16px;
				color: #fe9200;
				margin-right: 20px;
				.aI {
					background: #fe9200;
					display: inline-block;
					width: 16px;
					height: 16px;
					border-radius: 8px;
					margin-right: 10px;
					vertical-align: middle;
				}
			}
		}
	}
}
#joblist .input {
	border: 1px solid #ccc;
	float: left;
}
#joblist .gray,
#joblist .blue {
	width: 100px;
	height: 40px;
	line-height: 40px;
	float: left;
	text-align: center;
	color: #fff;
	margin-left: 20px;
}
</style>