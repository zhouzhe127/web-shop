<!--
	**区域管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="area-show">
		<ul class="tas-variety" v-cloak>
			<li v-on:click="add">
				<span>
					<img src="../../res/images/comadd.png" alt="添加" style="margin-top: 30px;opacity:0.5;" />
				</span>
				新建区域
			</li>
			<li v-for="(item,i) in dataList" class="taste-list" v-on:click="edit(item.id,i)" :key="i">
				<div class="divOne"></div>
				<div class="divThree">
					<span class="spanName">{{item.areaName}}</span>
					<span class="spanIndex">{{i+1}}</span>
				</div>
				<div class="divTwo">
					<div class="jobDiv">
						<div>
							总桌数(桌)
						</div>
						<div class="divAll">
							{{item.tableTotal}}
						</div>
					</div>
					<div class="telDiv">
						<div>
							总席位（个）
						</div>
						<div class="divAll">
							{{item.seatTotal}}
						</div>
					</div>
				</div>
			</li>
		</ul>
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
			areaId: '', //区域id
			areaIndex: '' //区域列表索引
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.init();
	},
	methods: {
		//获取区域列表
		async init() {
			let res = await http.getArea({
				data: { shopId: this.shopId }
			});
			this.dataList = res;
			this.sortList();
		},
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		//编辑
		edit(id, i) {
			this.isAdd = false;
			this.areaId = id;
			this.areaIndex = i;
			this.showWin = true;
		},
		doThrowWinResult(res, data) {
			//确定
			if (res == 'ok') {
				if (this.isAdd) {
					//添加
					this.dataList.push(data);
				} else if (!this.isAdd) {
					//修改
					this.dataList[this.areaIndex].areaName = data.areaName;
					this.dataList[this.areaIndex].description =
						data.description;
					this.dataList[this.areaIndex].sort = data.sort;
				}
				this.sortList();
				this.showWin = false;
			}
			if (res == 'cancel') {
				if (!this.isAdd) {
					//删除
					this.dataList.splice(this.areaIndex, 1);
				}
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
	padding-top: 30px;
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