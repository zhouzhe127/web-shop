/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:43 */

<template>
	<div class="supplies">
		<div class="list">
			<div class="head">
				批次列表 · 共
				<em>{{goodsList.length}}</em>条数据
			</div>
			<div class="title">
				<span>操作</span>
				<span>序号</span>
				<span>批次编码</span>
				<span>生产日期</span>
				<span>供应商</span>
				<span>数量/重量</span>
				<span>进价</span>
				<span>仓库所属</span>
			</div>
			<ul>
				<li v-for="(item,index) in showList" :key="index">
					<div class="infoDetail">
						<a href="javascript:void(0);" @click="showDetail(item)" style="color:#5ebee8;">入库</a>|
						<a href="javascript:void(0);" @click="addListhouse(item)" style="color:red;">耗损</a>|
						<a href="javascript:void(0);" @click="openBar(item)" style="color:orange;">修改</a>
					</div>
					<span class="wide handle">
						{{(index+1)+(page-1)*10}}
					</span>
					<span>{{item.batchCode}}</span>
					<span>{{getTime(item.productionTime)}}</span>
					<span>{{item.supplier||"--"}}</span>
					<span v-if="goodsData.relation.length>0">{{comUnit(item.surplus,goodsData.relation[selUnit].value,goodsData.relation[selUnit].name,isMin.name)}}</span>
					<span v-else>--</span>
					<span>{{item.purchasePrice}}元/{{getpiceunit(item.purchaseUnit)}}</span>
					<span>{{item.wName||"暂无"}}-{{item.aName||"暂无"}}</span>
				</li>
			</ul>
			<div v-if="showList.length == 0" id="emptyData">目前没有显示数据</div>
		</div>
		<div class="page-box">
			<page-btn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></page-btn>
		</div>
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				goodsList: '',
				page: 1,
				pageTotal: 0,
				num: 10,
				showList: '',
				relation: '',
				isMin: ''
			};
		},
		props: ['goodsData', 'selUnit'],
		methods: {
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			},
			pageChange(page) {
				this.page = page.page;
				this.resetGoods(this.goodsList);
			},
			resetGoods(arr) {
				this.listTotal = arr.length;
				this.pageTotal = Math.ceil(arr.length / this.num);
				this.showList = arr.slice((this.page - 1) * 10, this.page * 10);
			},
			getpiceunit(id){
				let str = ''
				for(let item of this.goodsData.relation){
					if(id == item.muId){
						str = item.name;
					}
				}
				return str;
			},
			showDetail(item) {
				storage.session('putstoreInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialsPutinStorage',
					query: {
						type: 2
					}
				});
			},
			addListhouse(item) {
				console.log(item);
				storage.session('lossInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialLoss'
				});
			},
			openBar(item) {
				storage.session('editInfo', item);
				this.$router.push({
					path: '/admin/inventoryManagement/materialModifyBatch'
				});
			},
			//单位换算
			comUnit(...args) {
				//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number, value, showName, minName, type] = args;
				return global.comUnit(number, value, showName, minName, type);
			},
			init(){
				this.goodsList = this.goodsData.list;
				this.relation = this.goodsData.relation;
				for (let item of this.relation) {
					if (item.isMin == 1) {
						this.isMin = item;
					}
				}
				this.resetGoods(this.goodsList);
			}
		},
		mounted() {
			if(this.goodsData){
				this.init();
			}
		},
		watch: {
			goodsData() {
				this.init();
			}
		},
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		}
	};
</script>
<style lang="less" scoped>
	.supplies {
		padding-bottom: 50px;
		.list {
			border: 1px solid #ccc;
			border-bottom: 2px solid #ddd;
			.head {
				height: 50px;
				line-height: 50px;
				padding: 0 10px;
				font-size: 16px;
				em {
					color: #ff3c04;
					font-size: inherit;
				}
			}
			.title {
				background: #e6e6e6;
				overflow: hidden;
				span {
					float: left;
					height: 40px;
					line-height: 40px;
					text-align: center;
					width: 11%;
					&:first-child {
						width: 20%;
					}
				}
			}
			ul li {
				overflow: hidden;
				border-bottom: 2px solid #ddd;
				&:last-child {
					border-bottom: 0;
				}
				span {
					float: left;
					height: 70px;
					line-height: 70px;
					text-align: center;
					width: 11%;
					color: #555;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.infoDetail {
					width: 20%;
					float: left;
					height: 70px;
					line-height: 70px;
					text-align: center;
					display: flex;
					justify-content: space-around;
					a {
						display: inline-block;
						text-align: center;
					}
				}
				.handle {
					em {
						display: inline-block;
						padding: 0 20px;
						height: 18px;
						line-height: normal;
						cursor: pointer;
						&:hover {
							text-decoration: underline;
						}
					}
					.edit {
						color: #ff8d00;
						border-right: 1px solid #ddd;
					}
					.detail {
						color: #27a8e0;
					}
				}
			}
		}
		.page-box {
			margin-top: 10px;
		}
		#emptyData {
			margin: 0 auto;
			text-align: center;
			height: 50px;
			line-height: 50px;
			color: orange;
		}
	}
</style>