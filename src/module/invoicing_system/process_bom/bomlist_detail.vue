/* * @Author: zhouzhe * @Date: 2018-07-31 13:38:45 */

<template>
	<div id="detail">
		<div class="headBox">
			<div class="headTitle">加工BOM单信息</div>
			<div class="innerBox">
				<ul>
					<li>
						<span>产出物料：</span>
						<span>{{data.material||"--"}}</span>
					</li>
					<li>
						<span>BOM单类型：</span>
						<span>{{data.type==1? "自动":"手动"}}</span>
					</li>
					<li>
						<span>库存可以为负数：</span>
						<span>{{data.isNegative==1? "是":"否"}}</span>
					</li>
				</ul>
				<ul>
					<li>
						<span>单位：</span>
						<span>{{changeUnit(data.unit)}}</span>
					</li>
					<li>
						<span>默认入库仓库/区域：</span>
						<span>{{data.warehouse}}-{{data.warehouseArea}}</span>
					</li>
				</ul>
			</div>
			<div class="search">
				<el-button @click="turnToEditMaterial" type="primary">编辑</el-button>
				<el-button @click="delList" type="info">删除</el-button>
				<!-- <div class="blue filter" @click="turnToEditMaterial">修改</div>
				<div class="gray reset" @click="delList">删除</div> -->
			</div>
		</div>
		<div class="table">
			<div class="table-title">
				批次列表
				<span class="circle"></span>共
				<span class="tips-num">{{bomDetail.length}}</span>个条目
				<a class="showDetail" @click="showDetail=!showDetail">{{!showDetail ? '详细' : '简洁'}}</a>
			</div>
			<div class="table-head">
				<li>序号</li>
				<li>物料名称</li>
				<li>物料单位</li>
				<li>已选仓库数</li>
			</div>
			<div class="table-body">
				<div class="table-row" v-for="(item,index) in bomDetail" :key="index">
					<li>{{index+1}}</li>
					<li>{{item.material}}</li>
					<li>{{changeUnit(item.unit)}}</li>
					<!-- <li>{{item.newConsumeNum}}/{{item.consumeUnitName}}</li> -->
					<li>{{item.count}}</li>
					<div class="area-detail" v-show="showDetail">
						<li v-for="(wa,waIndex) in item.warehouse" :key="waIndex">
							<span>{{waIndex+1}}</span>
							<i>{{wa}}</i>
						</li>
					</div>
				</div>
				<div class="bom-tips" v-if="bomDetail.length==0">
					无条目信息
				</div>
			</div>
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
				bomDetail:[]
		    };
		},
		methods: {
			async init(){
				let data = await http.ProcessbomGetProcessBomDetail({
					data:{
						id:this.id
					}
				});
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
					})
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
		// components: {},
		// computed: {},
	}
</script>
<style lang='less' scoped>
	#detail {
		margin-top: 10px;
		.headBox {
			border: 1px #ccc solid;
			position: relative;
			.headTitle {
				padding: 10px 20px;
				background-color: #eeeeee;
			}
			.innerBox {
				padding: 20px 0 20px 40px;
				ul {
					display: inline-block;
					width: 32%;
					vertical-align: top;
					li {
						margin-bottom: 15px;
						span {
							display: inline-block;
							max-width: 70%;
							line-height: 18px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
			.search {
				display: inline-block;
				position: absolute;
				top: 125px;
				right: 30px;
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
			border: 1px solid #ccc;
			.table-title {
				.mixin(#333, 45px, 16px);
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
			.table-head {
				@width: 24.5%;
				height: 40px;
				background-color: #f2f2f2;
				overflow: hidden;
				li {
					list-style: none;
					.mixin(#333, 40px, 16px);
					min-width: 100px;
					width: @width;
					display: inline-block;
					;

					text-align: center;
					vertical-align: middle;
					margin-left: -2px;
				}

			}
			.table-row {
				border: 1px solid #f2f2f2;
				@width: 24.5%;
				li {
					list-style: none;
					.mixin(#666666, 70px, 14px);
					display: inline-block;
					min-width: 100px;
					width: @width;
					border-bottom: 2px solid #f7f7f7;
					text-align: center;
					vertical-align: middle;
					margin-left: -2px;
					&:last-child {
						border: none;
					}
					.unit-div {
						display: inline-block;
						vertical-align: middle;
						cursor: pointer;
						position: relative;
						.block-btn {
							border: 1px solid #ccc;
							width: 80px;
							height: 40px;
						}
						.unit-trangile {
							width: 40px;
							height: 38px;
							font-size: 14px;
							color: #333;
							line-height: 38px;
						}
						.unit {
							.unit-trangile;
							border-right: 1px solid #ccc;
							float: left;
							overflow: hidden;
							text-overflow: ellipsis;
						}
						.trangile {
							.unit-trangile;
							width: 38px;
							float: right;
							i {
								border: 6px solid transparent;
								border-top: 10px solid #bbb;
								display: inline-block;
								margin-top: 15px;
							}
						}
						ul {
							background: #fff;
							margin: 0;
							border: 1px solid #ccc;
							border-top: 0;
							position: absolute;
							z-index: 2;
							left: 0;
							top: 40px;
							width: 80px;
							background-color: #fff;
							li {
								width: 100% !important;
								display: block;
								padding: 0;
								margin: 0;
								min-width: 78px;
								height: 38px;
								border-bottom: 1px solid #ccc;
								cursor: pointer;
								.mixin(#333, 38px, 14px);
								text-align: center;
								&:last-child {
									border-bottom: none;
								}
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
					}
				}
				@store-width: 33.2%;
				.area-detail {
					display: block;
					li {
						line-height: 75px;
						text-align: left;
						vertical-align: middle;
						display: inline-block;
						border: none;
						padding-left: 8%;
						span {
							border-radius: 50%;
							display: inline-block;
							vertical-align: middle;
							height: 33px;
							width: 33px;
							background-color: #f2f2f2;
							color: #333;
							vertical-align: middle;
							line-height: 33px;
							margin-right: 10px;
							text-align: center;
						}
						i{
							display: inline-block;
							width: 65%;
							line-height: normal;
							vertical-align: text-top;
						}
						width:@store-width;
						color:#999999;
						font-size:16px;
					}
				}
			}
			.bom-tips {
				text-align: center;
				height: 70px;
				line-height: 70px;
				font-size: 20px;
				color: #999;
			}
		}
	}
</style>