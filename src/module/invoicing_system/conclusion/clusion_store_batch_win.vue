<template>
	<win :align="'center'" @winEvent="closeSelfWin" :width="1024" :height="600" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="select-batch">
			<!-- <div class="batch-title">
                <li >商品名称:{{needItem.gName}}</li>
                <li >条码:{{needItem.barCode}}</li>
                <li class="small-li">规格:{{needItem.specifications}}/{{needItem.unit}}</li>
                <li>分类:<span v-for="(item,index) in cate" :key="index"><strong>{{item.name}}</strong>&nbsp;</span></li>
            </div> -->
			<div class="batch-title">
				<ul>
					<li>商品名称:{{needItem.itemName}}</li>
					<li>条码:{{needItem.barCode}}</li>
					<li class="small-li">商品单位:{{needItem.selectName}}</li>
				</ul>
				<ul>
					<li>保质期:{{validity}}</li>
					<li>分类:{{cate}}</li>
					<li>需求数量:{{needItem.num}}</li>
				</ul>
			</div>
			<div class="search-div">
				<input type="text" class="search-input" v-model="batchNum" placeholder="请输入批次编号">
				<input type="text" class="search-input" v-model="supplier" placeholder="请输入供应商">
				<div class="timer">
					<calendar :only="false" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
				</div>
				<div class="timer">
					<calendar :only="false" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				</div>
				<div class="filter blue" @click="search">
					筛选
				</div>
				<div class="reset gray" @click="reset">
					重置
				</div>
			</div>

			<div class="table">
				<div class="table-head">
					<li>序号</li>
					<li>批次编号</li>
					<li>生产日期</li>
					<li>供应商</li>
					<li style="line-height:20px;">当前批次
						<br>数量/重量</li>
					<li>所属仓库</li>
					<li>出库数量/重量</li>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in changeList" :key="index">
						<li>{{index+1}}</li>
						<li>{{item.batchCode}}</li>
						<li>{{getTime(item.productionTime)}}</li>
						<li>{{item.supplier}}</li>
						<li>{{item.surplus}}</li>
						<li>{{item.wName||"暂无"/item.aName||"暂无"}}</li>
						<li>
							<input type="text" placeholder="输入数字" maxlength="9" v-model="item.outNum" @input="getmin($event,item)" class="input-num">
							<span class="unitBox">{{needItem.selectName}}</span>
						</li>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: '批次选择',
				btnOk: {},
				btnCancel: {},
				showTime: false, //时间组建的展示
				startTime: '', //开始时间
				endTime: '', //结束时间
				cate: '', //分类,
				allList: '',
				changeList: '',
				batchNum: '',
				supplier: '',
				validity: '', //保质期
				validityType: ['月', '日', '年']
			};
		},
		props: ['needItem', 'wid', 'shopId'],
		methods: {
			async init() {
				//获取批次列表
				let res = await http.All([{
					httpId: 'getDetails',
					data: {
						gid: this.needItem.gid || this.needItem.id,
						shopId: this.shopId,
						shopIds: this.shopId
					}
				},
				{
					httpId: 'getGoodsBatch',
					data: {
						gid: this.needItem.gid || this.needItem.id,
						wid: this.wid || '',
						shopId: this.shopId
					}
				}]);
				// let res = await http.All([
				//     { httpId: 'getDetails', data: { gid: 278 } },
				//     { httpId: 'getGoodsBatch', data: { gid: 278,wid:1||'' } }
				// ]);
				let cateArr = [];
				if (res[0].data) {
					for (let item of res[0].data.cate) {
						cateArr.push(item.name);
					}
					this.cate = cateArr.join(',');
					this.validity = `${res[0].data.validity}${this.validityType[res[0].data.validityType]}`;
				}
				this.allList = res[1].data.list;
				this.changeList = this.allList;
				for (let item of this.changeList) {
					if (this.needItem.batchList && this.needItem.batchList.length > 0) {
						for (let list of this.needItem.batchList) {
							if (item.batchId == list.batchId) {
								item.outNum = list.outNum;
							}
						}
					} else {
						item.outNum = '';
					}
				}
			},
			chooseTime: function () {
				this.showTime = !this.showTime;
			},
			transFormDate(t) {
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			// getReturnInfo:function(res){
			//     this.startTime = res.startTime;
			//     this.endTime = res.endTime;
			//     this.showTime = false;
			// },
			closeSelfWin(res) {
				this.$emit('throwWin', res, this.changeList);
			},
			initBtn() {
				this.btnOk = {
					content: '确定',
					style: 'background-color:#ff9200;'
				};
			},
			search() {
				let arr = [];
				for (let i in this.allList) {
					let item = this.allList[i];
					if (item.supplier.indexOf(this.supplier) != -1 && item.batchCode.indexOf(this.batchNum) == 0 &&
						item.productionTime * 1000 > this.startTime && item.productionTime * 1000 < this.endTime) {
						arr.push(item);
					}
				}
				this.changeList = arr;
			},
			reset() {
				this.supplier = '';
				this.batchNum = '';
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().getTime();
				this.changeList = this.allList;
			},
			getmin(e, item) {
				let res = /^\d*(\.?)\d+$/;
				item.outNum = res.test(item.outNum) ? item.outNum : 0;
				if (item.outNum != '') {
					if (item.outNum > Number(item.surplus)) item.outNum = item.surplus;
					if (item.type == 1) {
						e.target.value = (item.outNum + '').replace(/^(\d*)\.?\d{4}$/g, parseInt(item.outNum * 1000) /
							1000);
					} else {
						e.target.value = isNaN(parseInt(item.outNum)) ? 0 : parseInt(item.outNum);
					}
					item.outNum = e.target.value;
				}

			},
			startTimeChange(time) {
				this.startTime = utils.getTime({
					time: time
				}).start;
			},
			endTimeChange(time) {
				this.endTime = utils.getTime({
					time: time
				}).end;
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
			}
		},
		mounted() {
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().getTime();
			this.initBtn();
			this.init();
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
			// canMulti:()=>import (/*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type')
		}
	};
</script>
<style lang="less" scoped>
	#select-batch {
		padding: 35px 20px;
		background-color: #f7f7f7;
		overflow: auto;
		min-height: 600px;
		padding-bottom: 0;
		.color-size-16 {
			color: #333;
			font-size: 16px;
		}
		.batch-title {
			ul {
				overflow: hidden;
				margin-bottom: 20px;
				li {
					list-style: none;
					float: left;
					.color-size-16;
					overflow: hidden;
					width: 280px;
					line-height: 20px;
				}
			} // .small-li{
			//     width:130px;
			//     text-align: center;
			// }
		}
		.search-div {
			height: 62px;
			border: 1px solid transparent;
			.timer {
				display: inline-block;
				margin-right: 10px;
			}
			.search-input {
				width: 150px;
				height: 40px;
				border: 1px solid #ccc;
				text-indent: 15px;
				font-size: 14px;
				color: #a5a5a5;
				margin-right: 10px;
				padding: 0;
				vertical-align: top;
				outline: none;
			}
			.calendar-gap {
				width: 250px;
				height: 40px;
				position: relative;
				border: 1px solid #ccc;
				display: inline-block;
				vertical-align: top;
				line-height: 40px;
				cursor: pointer;
				span {
					width: 39%;
					float: left;
					text-align: center;
					&:nth-child(2) {
						width: 5%;
					}
				}
				.dropDown {
					width: 40px;
					height: 40px;
					float: right;
					position: relative;
					z-index: 5;
					border-left: #ccc solid 1px;
					i {
						height: 10px;
						width: 10px;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-top: -5px;
						margin-left: -5px;
						border-top: 10px solid #ccc;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						box-sizing: border-box;
					}
				}
				.chooseTime {
					position: absolute;
					left: 0px;
					top: 40px;
					z-index: 5px;
				}
			}

			.filter-reset {
				width: 100px;
				height: 40px;
				display: inline-block;
				line-height: 40px;
				font-size: 16px;
				text-align: center;
			}
			.filter {
				color: #fff;
				.filter-reset;
				margin-right: 10px;
			}
			.reset {
				color: #fff;
				.filter-reset;
			}
		}
		.table {
			overflow: hidden;
			.table-head {
				padding: 10px 0;
				overflow: auto;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				li {
					list-style: none;
					border-right: 1px solid #ccc;
					height: 40px;
					line-height: 40px;
					color: #333;
					float: left;
					font-size: 16px;
					width: 150px;
					text-align: center;
					&:first-child {
						width: 80px;
					}
					&:last-child {
						border-right: none;
						width: 120px;
					}
				}
			}
			.table-body {
				height: 368px;
				overflow: scroll;
				.table-row {
					overflow: auto;
					border-bottom: 1px solid #ccc;
					li {
						list-style: none;
						height: 62px;
						line-height: 62px;
						color: #666;
						float: left;
						font-size: 14px;
						width: 150px;
						text-align: center;
						overflow: hidden;
						&:first-child {
							width: 80px;
						}
						&:last-child {
							border-right: none;
							width: 120px;
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.input-num {
							width: 60px;
							height: 40px;
							text-indent: 2px;
							color: #666;
							outline: none;
						}
						.unitBox {
							width: 40px;
							height: 40px;
							border: 1px #cccccc solid;
							text-align: center;
							line-height: 38px;
							background-color: #ffffff;
							border-left: none;
						}
					}
				}
			}
		}

	}
</style>