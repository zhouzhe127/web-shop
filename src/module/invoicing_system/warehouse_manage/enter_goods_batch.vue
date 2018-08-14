<!--
    **入货组件-批次弹窗
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" @winEvent="closeSelfWin" :width="1024" :height="450" :ok="btnOk">
		<span slot="title">{{title}}</span>
		<div slot="content" id="select-batch">
			<template v-if="type==0">
				<div class="batch-title">
					<li>商品名称：{{goods.name}}</li>
					<li>单位：{{goods.unit}}</li>
					<li><span class="clear" @click="clearInput">清空输入</span></li>
				</div>
			</template>
			<template v-if="type==1">
				<div class="batch-title">
					<li>物料名称：{{material.name}}</li>
					<li>单位：{{material.unit}}</li>
					<li><span class="clear" @click="clearInput">清空输入</span></li>
				</div>
			</template>
			<div class="table">
				<div class="table-head">
					<span v-for="(item,index) in titleList" :key="index">{{item}}</span>
				</div>
				<div class="table-body">
					<div class="table-row" v-for="(item,index) in allList" :key="index">
						<!--序号-->
						<div class="cell">{{index+1}}</div>
						<!--批次编号-->
						<div class="cell">{{item.batchCode}}</div>
						<!--生产日期-->
						<div class="cell">{{getTime(item.productionTime)}}</div>
						<!--供应商-->
						<div class="cell">{{item.supplier}}</div>
						<!--进价-->
						<div class="cell">
							<template v-if="type==0">{{item.purchasePrice}}元/{{goods.unit}}</template>
							<template v-if="type==1">{{item.purchasePrice}}元/{{item.purchaseUnitName}}</template>
						</div>
						<!--出库数量-->
						<div class="cell">
							<template v-if="type==0">{{item.numShow}}{{goods.unit}}</template>
							<template v-if="type==1">{{item.numShow}}{{material.unit}}</template>
						</div>
						<!--所属仓库-->
						<div class="cell">{{item.wName}}-{{item.aName}}</div>
						<!--入货数量-->
						<div class="cell unit-box">
							<input type="text" placeholder="输入数字" v-model="item.intoNum" class="input-num">
							<!--<em>{{material.unit}}</em>-->
						</div>
						<!--耗损数量-->
						<div class="cell unit-box">
							<input type="text" placeholder="输入数字" v-model="item.consumeNum" class="input-num">
							<!--<em>{{material.unit}}</em>-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>
<script>
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			title: '批次选择',
			titleList:[
				'序号',
				'批次编号',
				'生产日期',
				'供应商',
				'进价',
				'出库数量',
				'所属仓库',
				'入货数量',
				'耗损数量',
			],
			btnOk: {},
			btnCancel: {},
			cate: '', //分类,
			allList: '',
			selList: '',
			batchNum: '',
			supplier: ''
		};
	},
	props: ['goods', 'material', 'selGoods', 'selMat', 'type'],
	watch: {
		'type': 'init'
	},
	methods: {
		init() {
			if(this.type == 0) { //商品
				this.allList = this.selGoods.length ? utils.deepCopy(this.selGoods) : utils.deepCopy(this.goods.batchInfo);
				if(!this.selGoods.length) {
					for(let item of this.allList) {
						item.intoNum = '';
						item.consumeNum = '';
					}
				}
			} else if(this.type == 1) { //物料
				this.allList = this.selMat.length ? utils.deepCopy(this.selMat) : utils.deepCopy(this.material.batchInfo);
				if(!this.selMat.length) {
					for(let item of this.allList) {
						item.intoNum = '';
						item.consumeNum = '';
					}
				}
			}

		},
		clearInput() { //清空输入框
			let arr = utils.deepCopy(this.allList);
			for(let item of arr) {
				item.intoNum = '';
				item.consumeNum = '';
			}
			this.allList = arr;
		},
		chooseTime: function() {
			this.showTime = !this.showTime;
		},
		transFormDate(t) {
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		getReturnInfo: function(res) {
			this.startTime = res.startTime;
			this.endTime = res.endTime;
			this.showTime = false;
		},
		closeSelfWin(res) {
			let emitName = 'goods';
			if(this.type == 0) {
				emitName = 'goods';
			} else if(this.type == 1) {
				emitName = 'mat';
			}
			if(res == 'ok') {
				for(let item of this.allList) {
					let totalNum = Number(item.intoNum) + Number(item.consumeNum);
					if(totalNum > item.num) {
						this.$store.commit('setWin', {
							title: '操作提示',
							content: `批次编号:${item.batchCode},剩余可入货数量不足`,
						});
						return;
					}
				}
				this.$emit(emitName, res, this.allList);
			} else {
				this.$emit(emitName, res);
			}

		},
		initBtn() {
			this.btnOk = {
				content: '确定',
				style: 'background-color:#ff9200;'
			};
		},
		reset() {
			this.supplier = '';
			this.batchNum = '';
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().getTime();
			this.changeList = this.allList;
		},
		getTime(time) {
			return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
		}
	},
	mounted() {
		this.initBtn();
		this.init();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win'*/ 'src/components/win'),
		canMulti: () =>
			import( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi')
	}
};
</script>
<style lang='less' scoped>
	#select-batch {
		padding: 20px;
		background-color: #f7f7f7;
		overflow: auto;
		min-height: 450px;
		padding-bottom: 0;
		.color-size-16 {
			color: #333;
			font-size: 16px;
		}
		.batch-title {
			overflow: hidden;
			padding-bottom: 10px;
			li {
				list-style: none;
				float: left;
				height: 40px;
				line-height: 40px;
				.color-size-16;
				overflow: hidden;
				width: 33.33%;
				&:last-child {
					text-align: right;
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
				width: 180px;
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
				overflow: hidden;
				border-top: 1px solid #ccc;
				border-bottom: 1px solid #ccc;
				span {
					border-right: 1px solid #ccc;
					height: 40px;
					line-height: 40px;
					color: #333;
					float: left;
					font-size: 14px;
					width: 11.5%;
					text-align: center;
					&:first-child {
						width: 8%;
					}
					&:last-child {
						border-right: 0;
					}
				}
			}
			.table-body {
				height: 320px;
				overflow: auto;
				.table-row {
					overflow: hidden;
					border-bottom: 1px solid #ccc;
					.cell {
						height: 62px;
						line-height: 62px;
						color: #666;
						float: left;
						font-size: 14px;
						width: 11.5%;
						text-align: center;
						&:first-child {
							width: 8%;
						}
						.input-num {
							width: 100px;
							height: 40px;
							text-indent: 15px;
							color: #666;
							outline: none;
						}
					}
				}
			}
		}
	}
</style>