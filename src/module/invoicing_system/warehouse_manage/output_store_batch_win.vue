<template>
	<win :align="'center'" @winEvent="closeSelfWin" :width="1024" :height="550" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="select-batch">
			<div class="batch-title">
				<li>商品名称: {{needItem.goodsName}}</li>
				<li>条码: {{needItem.barCode}}</li>
				<li>单位: {{needItem.unit}}</li>
				<li><span class="clear" @click="clearInput">清空输入</span></li>
			</div>

			<div class="search-div">
				<input type="text" class="search-input" v-model="batchNum" placeholder="请输入批次编号">
				<input type="text" class="search-input" v-model="supplier" placeholder="请输入供应商">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" :type="0" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				<!--日期组件 开始时间-->
				<calendar :time="endTime" :type="0" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				<div class="btn-box">
					<div class="filter blue" @click="search">筛选</div>
					<div class="reset gray" @click="reset">重置</div>
				</div>
			</div>

			<div class="table">
				<div class="table-head">
					<li>序号</li>
					<li>批次编号</li>
					<li>生产日期</li>
					<li>供应商</li>
					<li>数量/重量</li>
					<li>所属仓库</li>
					<li>出库数量</li>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in changeList" :key="index">
						<li>{{index+1}}</li>
						<li>{{item.batchCode}}</li>
						<li>{{getTime(item.productionTime)}}</li>
						<li>{{item.supplier}}</li>
						<li>{{item.surplus}}{{needItem.unit}}</li>
						<li>{{item.wName}}
							<template>-{{item.aName}}</template>
						</li>
						<li>
							<input type="text" placeholder="输入数字" v-model="item.outNum" @input="getmin($event,item,index)" class="input-num">
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
				supplier: ''
			};
		},
		props: ['pObj', 'needItem', 'wid', 'selectItem','shopId'],
		methods: {
			clearInput() { //清空输入框
				let arr = utils.deepCopy(this.changeList);
				for(let item of arr) {
					item.outNum = '';
				}
				this.changeList = arr;
			},
			async init() {
				let res = await http.getGoodsBatch({data:{
					gid: this.needItem.id,
					wid: this.wid || '',
					shopId:this.shopId,
				}});
				this.allList = res.list;
				this.changeList = this.allList;
				if(this.selectItem && this.selectItem.length) {
					let list = utils.deepCopy(this.changeList);
					for(let item of list) {
						for(let sel of this.selectItem) {
							if(item.batchId == sel.batchId) {
								item.outNum = sel.outNum;
							}
						}
					}
					this.changeList = list;
				} else {
					for(let item of this.changeList) {
						item.outNum = '';
					}
				}
			},
			chooseTime() {
				this.showTime = !this.showTime;
			},
			transFormDate(t) {
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			getReturnInfo(res) {
				this.startTime = res.startTime;
				this.endTime = res.endTime;
				this.showTime = false;
			},
			closeSelfWin(res) {
				if(res == 'ok') {
					for(let item of this.changeList) {
						if(Number(item.surplus) >= 0 && Number(item.outNum) > Number(item.surplus)) {
							this.$store.commit('setWin', {
								title: '操作提示',
								content: `批次编号${item.batchCode} 库存数量不足`,
							});
							return false;
						}
					}
					this.$emit('throwWin', res, this.changeList);
				} else {
					this.$emit('throwWin', res);
				}

			},
			initBtn() {
				this.btnOk = {
					content: '确定',
					style: 'background-color:#ff9200;'
				};
			},
			search() {
				let arr = [];
				for(let i in this.allList) {
					let item = this.allList[i];
					if(item.supplier.indexOf(this.supplier) != -1 && 
						item.batchCode.indexOf(this.batchNum) == 0 && 
						item.productionTime * 1000 > this.startTime && 
						item.productionTime * 1000 < this.endTime) {
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
				if(item.outNum != ''){
					item.outNum = (item.outNum + '').replace(/[^\d.]/g, '');
				}else{
					item.outNum = '';
				}
				e.target.value = item.outNum;
			},
			startTimeChange(time) {
				this.startTime = time;
			},
			endTimeChange(time) {
				this.endTime = time;
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
				import( /*webpackChunkName:'win'*/ 'src/components/win'),
			calendar: () =>
				import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type')
		}
	};
</script>
<style lang='less' scoped>
	#select-batch {
		padding: 20px;
		background-color: #f7f7f7;
		overflow: auto;
		min-height: 550px;
		padding-bottom: 0;
		.color-size-16 {
			color: #333;
			font-size: 16px;
		}
		.batch-title {
			overflow: hidden;
			li {
				list-style: none;
				float: left;
				margin-bottom: 20px;
				.color-size-16;
				overflow: hidden;
				width: 25%;
			}
			.clear {
				float: right;
				height: 40px;
				width: 100px;
				text-align: center;
				line-height: 40px;
				color: #fff;
				background: #fe8d01;
				cursor: pointer;
			}
			.small-li {
				width: 130px;
				text-align: center;
			}
		}
		.search-div {
			height: 62px;
			border: 1px solid transparent;
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
			.btn-box {
				float: right;
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
					line-height: 40px;
					color: #333;
					float: left;
					font-size: 14px;
					width: 15%;
					text-align: center;
					&:first-child {
						width: 10%;
					}
					&:last-child {
						border-right: none;
					}
				}
			}
			.table-body {
				height: 338px;
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
						width: 15%;
						text-align: center;
						overflow: hidden;
						&:first-child {
							width: 10%;
						}
						.input-num {
							width: 100px;
							height: 40px;
							text-indent: 15px;
							color: #666;
							outline: none;
							margin-left: 10px;
						}
					}
				}
			}
		}
	}
</style>