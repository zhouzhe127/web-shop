<!--
	**桌台管理
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="table-show">
		<ul class="tas-variety" v-cloak>
			<li v-on:click="add">
				<span>
					<img src="../../res/images/comadd.png" alt="添加" style="margin-top: 30px;opacity:0.5;" />
				</span>
				新建桌台
			</li>
			<li v-for="(item,i) in tableList" class="taste-list" v-on:click="edit(item.id,i)" :key="i">
				<div class="divOne"></div>
				<div class="divThree">
					<span class="spanName" :class="{'width200':i+1<10,'width180':(i+1)<100&&(i+1)>=10,'width140':i+1>=100}">{{item.areaName}} - {{item.tableName}}</span>
					<span class="spanIndex">{{i+1}}</span>
				</div>
				<div class="divFro">
					<span> 默认席位：{{item.normalSeat}}</span>
				</div>
				<div class="divTwo">
					<div class="jobDiv">
						<div>
							最少容纳(位)
						</div>
						<div class="divAll">
							{{item.minSeat}}
						</div>
					</div>
					<div class="telDiv">
						<div>
							最多容纳（位）
						</div>
						<div class="divAll">
							{{item.maxSeat}}
						</div>
						<section class="table-code" @click="doji($event)">
							<a :href="host+'table/createTableCode?format=json&tableId=' + item.id +'&shopId=' + userData.currentShop.id+ '&areaName='+item.areaName+'&tableName='+item.tableName+'&token='+userData.accessToken"></a>
						</section>
					</div>
				</div>
			</li>
		</ul>
		<tableWin v-if="showWin" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :tableDetial='tableDetial' :tableId="tableId" :tableIndex="tableIndex" :userData="userData" :tableList="tableList" :Area="Area">
		</tableWin>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import global from 'src/manager/global';

export default {
	data() {
		return {
			host: global.host.shop,
			Area: [], //区域列表
			tableList: Array, //桌台列表
			userData: Object,
			isAdd: true, //是否是添加，true为是
			showWin: false,
			tableId: '', //桌台id
			tableIndex: '' //桌台索引
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.init();
		this.getArea();
	},
	methods: {
		//阻止事件冒泡
		doji(e) {
			e.stopPropagation();
		},
		//桌台列表
		async init() {
			let res = await http.getTableList({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.tableList = res;
				this.sortList();
			}
		},
		//得到区域列表
		async getArea() {
			let res = await http.getArea({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.Area = res;
			}
		},
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		//编辑
		async edit(id, index) {
			this.isAdd = false;
			this.tableId = id;
			this.tableIndex = index;
			this.tableDetial = await http.getTableInfo({
				data: {
					shopId: this.userData.currentShop.id,
					id: this.tableId
				}
			});
			this.showWin = true;
		},
		doThrowWinResult(res) {
			if (res == 'ok') {
				this.sortList();
				this.showWin = false;
			} else if (res == 'cancel') {
				if (!this.isAdd) {
					this.sortList();
				}
				this.showWin = false;
			} else if (res == 'close') {
				this.showWin = false;
			}
		},
		//排序
		sortList() {
			this.tableList = utils.sortByAll(
				this.tableList,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		tableWin: () =>
			import(/*webpackChunkName: "table_manage_win"*/ './table_manage_win')
	}
};
</script>

<style scoped lang="less">
#table-show {
	padding-top: 30px;
	ul.tas-variety {
		li {
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
		.taste-list {
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
					margin: 30px 0 30px 0;
					font-size: 26px;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.spanIndex {
					float: right;
					margin: 20px 15px 30px 0;
					font-size: 72px;
					color: #cbe3ee;
				}
				.width180 {
					width: 180px;
				}
				.width140 {
					width: 135px;
				}
				.width200 {
					width: 220px;
				}
			}
			.divFro {
				float: left;
				margin-left: 20px;
				span {
					font-size: 17px;
					color: #333333;
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
					position: relative;
					.table-code {
						width: 30px;
						height: 30px;
						float: right;
						position: absolute;
						background-image: url(../../res/images/code.png);
						background-size: 30px 30px;
						top: 25px;
						right: -10px;
						a {
							width: 100%;
							height: 100%;
						}
						&:hover {
							background-image: url(../../res/images/downcode.png);
						}
					}
				}
				.divAll {
					margin-top: 10px;
					font-size: 18px;
				}
			}
		}
	}
}
</style>