<!--
	**区域管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="area-show">

		<section>
			<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="showDataList" border style="width:100%;margin-top:20px;">
				<el-table-column fixed min-width="120" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="edit(scope.row)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="del(scope.row)">删除</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="50" align="center" prop="sort" label="排序"> </el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="areaName" label="区域名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="tableTotal" label="总桌数(桌)"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="seatTotal" label="总席位（个）"> </el-table-column>
			</el-table>
		</section>

		<section style="margin-top: 10px">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>

		<!--<ul class="tas-variety" v-cloak>-->
		<!--<li v-on:click="add">-->
		<!--<span>-->
		<!--<img src="../../res/images/comadd.png" alt="添加" style="margin-top: 30px;opacity:0.5;" />-->
		<!--</span>-->
		<!--新建区域-->
		<!--</li>-->
		<!--<li v-for="(item,i) in dataList" class="taste-list" v-on:click="edit(item.id,i)" :key="i">-->
		<!--<div class="divOne"></div>-->
		<!--<div class="divThree">-->
		<!--<span class="spanName">{{item.areaName}}</span>-->
		<!--<span class="spanIndex">{{i+1}}</span>-->
		<!--</div>-->
		<!--<div class="divTwo">-->
		<!--<div class="jobDiv">-->
		<!--<div>-->
		<!--总桌数(桌)-->
		<!--</div>-->
		<!--<div class="divAll">-->
		<!--{{item.tableTotal}}-->
		<!--</div>-->
		<!--</div>-->
		<!--<div class="telDiv">-->
		<!--<div>-->
		<!--总席位（个）-->
		<!--</div>-->
		<!--<div class="divAll">-->
		<!--{{item.seatTotal}}-->
		<!--</div>-->
		<!--</div>-->
		<!--</div>-->
		<!--</li>-->
		<!--</ul>-->
		<area-win v-if='showWin' @throwWinResult='doThrowWinResult' :isAdd='isAdd' :areaId='areaId' :shopId='shopId'></area-win>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: null, //店铺id
			isAdd: true, //是添加还是编辑，true为添加
			showWin: false,
			dataList: [], //区域列表
			showDataList: [], //展示的区域列表

			areaId: '', //区域id

			num: 10, //一页处理多少数据
			total: 0, //总页数
			page: 1 //当前第几页
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.init();
	},
	created() {
		let arr = [
			{
				name: '新建区域',
				className: 'pick',
				fn: () => {
					this.add();
				}
			}
		];
		this.$store.commit('setPageTools', arr);
	},
	methods: {
		//删除
		del(item) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: `确认删除区域${item.areaName}？`,
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteArea(item);
					}
				}
			});
		},
		//删除区域
		async deleteArea(item) {
			let res = await http.deleteArea({
				data: {
					shopId: this.shopId,
					id: item.id
				}
			});
			if (res) {
				this.dataList = this.dataList.filter(ele => {
					return ele.id != item.id;
				});
				this.paging();
			}
		},
		//分页
		paging() {
			this.total = Math.ceil(this.dataList.length / this.num); //获取总页数
			this.showDataList = this.dataList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //截取当前页数据
		},
		//每页显示几条数据
		numChange(e) {
			this.num = e;
			this.paging();
			console.log(e);
		},
		//切换到第几页
		pageClick(e) {
			this.page = e;
			this.paging();
			console.log(e);
		},

		//获取区域列表
		async init() {
			let res = await http.getArea({
				data: { shopId: this.shopId }
			});
			console.log(res);
			this.dataList = res;
			this.sortList();
			this.paging();
		},
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		//编辑
		edit(item) {
			console.log(item);
			this.isAdd = false;
			this.areaId = item.id;
			this.showWin = true;
		},
		//弹窗返回
		doThrowWinResult(res, data) {
			console.log(data);
			//确定
			if (res == 'ok') {
				if (this.isAdd) {
					//添加
					this.dataList.push(data);
				} else if (!this.isAdd) {
					//修改
					for (let i = 0; i < this.dataList.length; i++) {
						if (this.dataList[i].id == data.id) {
							this.dataList[i].areaName = data.areaName;
							this.dataList[i].description = data.description;
							this.dataList[i].sort = data.sort;
							break;
						}
					}
				}
				this.sortList(); //排序
				this.paging(); //分页
				this.showWin = false;
			}
			if (res == 'cancel') {
				if (!this.isAdd) {
					//删除
					this.dataList = this.dataList.filter(ele => {
						return ele.id != data.id;
					});
				}
				this.paging(); //分页
				this.showWin = false;
			}
			if (res == 'close') {
				//关闭
				this.showWin = false;
			}
		},
		//排序
		sortList() {
			this.dataList = utils.sortByAll(
				this.dataList,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		areaWin: () =>
			import(/*webpackChunkName: 'area_manage_win'*/ './area_manage_win')
	}
};
</script>

<style lang="less" scoped>
#area-show {
	/*padding-top: 30px;*/
	ul.tas-variety li {
		&:first-child {
			width: 300px;
			height: 200px;
			float: left;
			margin-right: 15px;
			text-align: center;
			margin-bottom: 15px;
			color: #b3b3b3;
			cursor: pointer;
			font-size: 22px;
			line-height: 16px;
			border: 1px #b3b3b3 solid;
			span {
				display: block;
				margin-top: 20px;
				margin-bottom: 10px;
			}
		}
	}
	.tas-variety .taste-list {
		width: 300px;
		height: 200px;
		background-color: #f2f2f2;
		float: left;
		margin-right: 15px;
		margin-bottom: 15px;
		color: #333333;
		cursor: pointer;
		.divOne {
			background-color: #6cc2e6;
			height: 8px;
		}
		.divThree {
			position: relative;
			margin-left: 20px;
			.spanName {
				float: left;
				margin: 30px 0 50px 0;
				font-size: 26px;
				width: 150px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.spanIndex {
				float: right;
				margin: 20px 15px 30px 10px;
				font-size: 72px;
				color: #cbe3ee;
			}
		}
		.divTwo {
			margin-left: 20px;
			clear: both;
			.jobDiv {
				display: inline-block;
				font-size: 14px;
				width: 120px;
				border-right: 1px solid #d2d2d2;
			}
			.telDiv {
				display: inline-block;
				margin: 0 15px 0 20px;
			}
			.divAll {
				margin-top: 10px;
				font-size: 18px;
			}
		}
	}
}
</style>