/*
 * @Author: zhouzhe 
 * @Date: 2018-07-31 13:38:53 
 */
<template>
    <div id="bomList">
		<div class="filter">
			<div class="inpbox">
			<el-input v-model="suppliesName" placeholder="请输入物料名称"></el-input>
			</div>
			<div class="inpbox">
				<el-input v-model="createUser" placeholder="请输入创建人"></el-input>
			</div>
			<el-button @click="searchList" type="primary">筛选</el-button>
			<el-button @click="searchReset" type="info">重置</el-button>
		</div>
		<el-table :data="allList" stripe border style="width: 100%">
			<el-table-column label="物料名称" prop="material" min-width="200">
			</el-table-column>
			<el-table-column label="所需物料" min-width="150">
				<template slot-scope="props">{{props.row.kindNum}}种</template>
			</el-table-column>
			<el-table-column label="加工BOM单类型" min-width="150">
			<template slot-scope="props">{{props.row.type==1? "自动":"手动"}}</template>
			</el-table-column>
			<el-table-column label="创建时间" prop="creator" min-width="200">
			<template slot-scope="props">{{getTime(props.row.createTime)}}</template>
			</el-table-column>
			<el-table-column label="创建人" prop="user" min-width="150"></el-table-column>
			<el-table-column label="操作" fixed="right" width="200">
				<template slot-scope="scope">
					<el-button type="text" @click="addDetailhouse(scope.row)">查看详情</el-button>
					<el-button type="text" @click="batch(scope.row)" style="color:#34A9AA;">编辑</el-button>
					<el-button type="text" @click="del(scope.row,scope.$index)" style="color:#D34A2B;" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page-box">
			<el-pagination background @current-change="pageChange"
				@size-change="sizeChange"
				:current-page="page"
				:page-sizes="[10, 20, 50]"
				layout="sizes, total, prev, pager, next, jumper"
				:total="count">
			</el-pagination>
		</div>
    </div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data () {
		return {
			suppliesName:'',
			createUser:'',
			allList: [],
			count: 0,
			page:1,
			total:0,
			size:10
		};
	},
	methods: {
		async init(){
			let data = await http.ProcessbomGetProcessBomList({
				data:{
					material:this.suppliesName,
					user:this.createUser,
					page:this.page,
					num:this.size
				}
			});
			this.allList = data.list;
			this.count = Number(data.count);
			this.total = data.total;
		},
		searchList(){
			this.init();
		},
		searchReset(){
			this.suppliesName = '';
			this.createUser = '';
			this.page = 1;
			this.init();
		},
		addDetailhouse(item){
			this.$router.push({
				path: 'processbomList/bomlistDetail',
				query:{
					id:item.id
				}
			});
		},
		batch(res){
			this.$route.query.id = res.id;
			this.$router.push({
				path: '/admin/processbomList/create',
				query: this.$route.query
			});
		},
		del(res,index){
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await http.ProcessbomDeleteProcessBom({
					data:{
						id:res.id
					}
				});
				this.allList.splice(index,1);
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		pageChange(page){
			this.page = page;
			this.init();
		},
		sizeChange(size){
			this.size = size;
			this.init();
		},
		addEduce() {
			this.$store.commit('setPageTools', [{
				name: '新建加工Bom单',
				className: 'primary',
				fn: async () => {
					this.$router.push({
						path: '/admin/processbomList/create'
					});
				},
				type:4
			}]);
		},
		getTime(time) {
			return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
		},
	},
	mounted(){
		this.addEduce();
		this.init();
	},
	components: {
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
	},
	// computed: {},
};
</script>
<style lang='less' scoped>
#bomList{
	.filter{
		margin-bottom: 20px;
		.inpbox{
			display: inline-block;
			width: 200px;
			margin-right: 10px;
		}
	}
	.infoDetail {
		display: inline-block;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		a {
			display: inline-block;
			width: 33.33%;
			text-align: center;
		}
	}
	.page-box{
		margin-top: 10px;
	}
}
</style>