/* * @Author: zhouzhe * @Date: 2018-07-31 13:38:45 */

<template>
	<div id="detail">
		<div class="headBox">
			<div class="headTitle">加工BOM单信息</div>
			<div class="detail-info">
				<ul>
					<li>
						<span class="name">产出物料：</span>
						<span class="content">{{data.material||"--"}}</span>
					</li>
					<li>
						<span class="name">BOM单类型：</span>
						<span class="content">{{data.type==1? "自动":"手动"}}</span>
					</li>
					<li>
						<span class="name">库存可以为负数：</span>
						<span class="content">{{data.isNegative==1? "是":"否"}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span class="name">单位：</span>
						<span class="content">{{changeUnit(data.unit)}}</span>
					</li>
					<li>
						<span class="name">默认入库仓库/区域：</span>
						<span class="content">{{data.warehouse}}-{{data.warehouseArea}}</span>
					</li>
				</ul>
			</div>
			<div class="search">
				<el-button @click="turnToEditMaterial" type="primary">编辑</el-button>
				<el-button @click="delList" type="danger">删除</el-button>
			</div>
		</div>
		<div class="table">
			<div class="table-title">
				物料列表
				<span class="circle"></span>共
				<span class="tips-num">{{bomDetail.length}}</span>个条目
				<a class="showDetail select-ban" @click="showDetailClick">{{!showDetail ? '详细' : '简洁'}}</a>
			</div>
			<el-table :data="bomDetail" stripe border style="width: 100%" ref="myTable"
				:header-cell-style="{'background-color':'#f5f7fa'}" @expand-change="showRow">
				<el-table-column type="expand">
					<template slot-scope="scope">
						<div class="ware-sort">
							<div v-for="item in scope.row.wareList" :key="item.index" class="ware-box">
								<em>{{item.index+1}}</em>
								<span>{{item.name}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column type="index" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="material" label="物料名称" min-width="150">
				</el-table-column>
				<el-table-column label="物料单位" width="150">
					<template slot-scope="scope">
						{{changeUnit(scope.row.unit)}}
					</template>
				</el-table-column>
				<el-table-column label="已选仓库数" min-width="100">
					<template slot-scope="scope">
						{{scope.row.wareList.length}}
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	data () {
		return {
			showDetail: false, //是否显示详细信息
			id:'',
			data:'',
			bomDetail:[],
		};
	},
	methods: {
		showRow(res,row){
			this.showDetail = row.length >= this.bomDetail.length;
		},
		showDetailClick(){
			this.showDetail = !this.showDetail;
			this.$nextTick(()=>{
				let isShow = this.showDetail;//这里不能直接用 this.showDetail 因为showRow()方法改变其值 导致展开不全
				for(let item of this.bomDetail){
					console.log(item);
					this.$refs.myTable.toggleRowExpansion(item,isShow);
				}
			});
		},
		async init(){
			let data = await http.ProcessbomGetProcessBomDetail({
				data:{
					id:this.id
				}
			});
			for(let item of data.list){
				item.wareList = item.warehouse.map((res,index)=>{
					return {name:res,index:index};
				});
			}
			this.data = data;
			this.bomDetail = data.list;
		},
		changeUnit(unit){
			let arr  = [];
			if(unit){
				unit.map(v=>{
					arr.push(v.name);
				});
			}
			return arr.join(',')||'--';
		},
		turnToEditMaterial(){
			this.$router.push({
				path: 'create',
				query:{
					id:this.id
				}
			});
		},
		async delList(){
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async() => {
				await http.ProcessbomDeleteProcessBom({
					data:{
						id:this.id
					}
				});
				window.history.go(-1);
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
		addEduce() {
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: '',
				fn: async () => {
					console.log(111);
					window.history.go(-1);
				},
				type:4
			}]);
		},
		alert(con, title) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		}
	},
	mounted(){
		this.id = this.$route.query.id;
		this.addEduce();
		this.init();
	},
};
</script>
<style lang='less' scoped>
	#detail {
		margin-top: 10px;
		.headBox {
			padding-bottom: 10px;
			border: 1px #ebeef5 solid;
			position: relative;
			.headTitle {
				padding: 10px 20px;
				background-color: #f5f7fa;
				font-size: 16px;
				color: #333;
			}
			.detail-info{
				padding: 20px;
				padding-bottom: 0;
				overflow: hidden;
				ul{
					width: 33.33%;
					float: left;
					li{
						display: flex;
						padding: 10px;
						span{color: #333;font-size: 16px;}
						.name{
							white-space: nowrap;
						}
						.content{
							word-break: break-all;
							white-space: normal;
						}
					}
				}
			}
			.search {
				display: block;
				text-align: right;
				padding: 0 10px;
			}
		}
		.mixin(@color, @height, @size) {
			color: @color;
			min-height: @height;
			line-height: @height;
			font-size: @size;
		}
		.table {
			margin-top: 25px;
			.table-title {
				.mixin(#333, 45px, 16px);
				border: 1px solid #ebeef5;
				border-bottom: 0;
				text-indent: 15px;
				.circle {
					border: 2px solid #000;
					width: 1px;
					height: 1px;
					border-radius: 50%;
					display: inline-block;
					margin: 0 10px;
					vertical-align: middle;
					margin-top: -2px;
				}
				.tips-num {
					color: #ff0000;
					font-size: 16px;
				}
				.showDetail {
					font-size: 16px;
					text-decoration: #29a8e0 underline;
					color: #29a8e0;
					cursor: pointer;
				}
			}
			.ware-sort{
				overflow: hidden;
				.ware-box{
					float: left;
					width: 33.33%;
					margin-bottom: 10px;
					em{
						color: #666;
						text-align: center;
						height: 24px;
						line-height: 22px;
						width: 24px;
						border-radius: 50%;
						border: 1px solid #ccc;
						background: #f5f7fa;
						display: inline-block;
						font-size: 12px;
					}
					span{
						display: inline-block;
						margin-left: 10px;
						height: 24px;
						line-height: 24px;
					}
				}
			}
		}
	}
</style>