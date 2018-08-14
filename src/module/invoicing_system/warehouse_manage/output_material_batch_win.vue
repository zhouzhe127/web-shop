<!--
    **批次弹窗-快速调度
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div>
		<win @winEvent="getData" :align="'center'" :width="1000" :height="550" :ok="okstyle">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<section class="title">
					<div>
						<span :title="info.name" class="hide">物料名称：{{info.name}}</span>
						<span>保质期：{{info.validity}}{{validityType[info.validityType]}}</span>
					</div>
					<div style="vertical-align:top">
						<span :title="info.unitName" class="hide">物料单位：{{info.unitName}}</span>
						<span :title="info.materialCategoryName" class="hide">分类：{{info.materialCategoryName}}</span>
					</div>
					<div>
						<span>默认单位：{{name}}</span>
						<span>最小单位：{{info.minName}}</span>
					</div>
					<div>
						<span class="clear" @click="clearInput">清空输入</span>
					</div>
				</section>
				<section class="menu">
					<input type="text" v-model="batchNum" placeholder="请输入批次编号">
					<input type="text" v-model="supplyer" placeholder="请输入供应商">
					<div class="canMulti">
						<!--日期组件 开始时间-->
						<calendar :time="startObj.time" :type="0" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
						<!--日期组件 开始时间-->
						<calendar :time="endObj.time" :type="0" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
					</div>
					<span class="blue btn" @click="search">筛选</span>
					<span class="gray btn" @click="reset">重置</span>
				</section>
				<section class="content">
					<div class="top">
						<ul>
							<li>序号</li>
							<li>批次编号</li>
							<li>生产日期</li>
							<li>供应商</li>
							<li>所属仓库</li>
							<li>当前批次数量/重量</li>
							<li>出库数量/重量</li>
						</ul>
					</div>
					<section class="scroll-box">
						<div class="list" v-for="(item,j) in backData" :key="j">
							<ul>
								<li>{{index+1}}</li>
								<li :title="item.batchCode">{{item.batchCode}}</li>
								<li>{{transFormDate(item.productionTime*1000)}}</li>
								<li :title="item.supplier">{{item.supplier}}</li>
								<li :title="item.wName">{{item.wName}}</li>
								<li :title="comUnit(Number(item.surplus),info.defaultValue,info.defaultName,info.minName)">
									{{comUnit(Number(item.surplus),info.defaultValue,info.defaultName,info.minName)}}
								</li>
								<li>
									<span class="unit-box">
                                        <input type="text" placeholder="输入数字" v-model="item.twoNum">
                                        <i :title="selUnitObj.name">{{selUnitObj.name}}</i>
                                    </span>
								</li>
							</ul>
						</div>
						<div class="list empty" v-if="!backData.length">- 暂无条目 -</div>
					</section>
				</section>
			</div>
		</win>
	</div>

</template>

<script>
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import global from 'src/manager/global';
export default {
	data() {
		return {
			title: '',
			okstyle: {
				style: {
					background: '#F7931E'
				},
				content: '确定'
			},
			isShowCa: false, //日历显示
			startObj: {
				time: utils.getTime({
					time: new Date()
				}).start,
				show: false,
				detail: false,
				width: 150
			},
			endObj: {
				time: utils.getTime({
					time: new Date()
				}).end,
				show: false,
				detail: false,
				width: 150
			},
			unitName: '单位切换',
			info: '', //该物料信息
			backData: [],
			index: 0, //单位切换索引
			showName: '',
			supplyer: '', //筛选供应商
			batchNum: '', //筛选批次
			validityType: {
				0: '月',
				1: '日',
				2: '年'
			},
			name: '', //默认单位
			selUnitObj: {},
		};
	},
	props: ['batchInfo', 'wid', 'selectItem','shopId'],
	mounted() {
		this.title = '批次选择';
		this.info = utils.deepCopy(this.batchInfo);
		this.name = utils.deepCopy(this.info.defaultName);
		this.info.unitName = '';
		for(let i = 0; i < this.info.unit.length; i++) {
			this.info.unitName += this.info.unit[i].name + ',';
		}
		this.selUnitObj.name = this.info.selectName;
		this.selUnitObj.value = this.info.selectValue;
		this.info.unitName = this.info.unitName.slice(0, this.info.unitName.length - 1);
		this.getMaterialBatch();
	},
	components: {
		win: () =>
			import( /*webpackChunkName: 'win'*/ 'src/components/win'),
		calendar: () =>
			import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectbtn: () =>
			import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
	},
	methods: {
		clearInput() {
			let arr = utils.deepCopy(this.backData);
			for(let item of arr) {
				item.twoNum = '';
			}
			this.backData = arr;
		},
		getStartTime(res) {
			this.startObj.time = res;
		},
		getEndTime(res) {
			this.endObj.time = res;
		},
		//获取批次列表
		async getMaterialBatch() {
			let res = await http.getMaterialBatch({
				data: {
					mid: this.batchInfo.id,
					wid: this.wid || '',
					shopId:this.shopId,
				}
			});
			for(let i = 0; i < res.list.length; i++){
				res.list[i].oneNum = '';
				res.list[i].twoNum = '';
				res.list[i].minNumber = '';
				for(let k = 0; k < this.info.batch.length; k++) {
					if(res.list[i].batchId == this.info.batch[k].batchId) {
						res.list[i].oneNum = this.info.batch[k].oneNum;
						res.list[i].twoNum = this.info.batch[k].twoNum;
						res.list[i].minNumber = this.info.batch[k].minNumber;
						this.backItem(this.batchInfo.index);
					}
				}
			}
			this.list = utils.deepCopy(res.list);
			this.backData = res.list;
			this.index = this.batchInfo.index;
			this.setSelectItem();
		},
		setSelectItem() {
			if(this.selectItem && this.selectItem.length) {
				let list = utils.deepCopy(this.backData);
				for(let item of list) {
					for(let sel of this.selectItem) {
						if(item.batchId == sel.batchId) {
							item.twoNum = sel.twoNum;
						}
					}
				}
				this.backData = list;
			}
		},
		getData(res) {
			if(res == 'ok') {
				for(let i = 0; i < this.backData.length; i++) {
					let totalNum = Number(this.backData[i].twoNum) * Number(this.selUnitObj.value);
					let surplus = Number(this.backData[i].surplus);
					if(surplus >= 0 && totalNum > surplus) {
						this.$store.commit('setWin', {
							content: '批次编号' + this.backData[i].batchCode + ' 库存数量不足',
						});
						return false;
					}
				}
				this.$emit('getWin', res, this.backData, this.selUnitObj);
			} else {
				this.$emit('getWin', res);
			}
		},
		//获取时间
		startTimeChange(time) {
			this.startTime = time;
		},
		endTimeChange(time) {
			this.endTime = time;
		},
		//展开时间
		showCalendar() {
			this.isShowCa = !this.isShowCa;
		},
		//时间转换
		transFormDate(t) {
			return utils.format(new Date(t), 'yyyy-MM-dd');
		},
		//保存最小的领料量
		saveNum(num, j) {
			for(let k = 0; k < this.backData.length; k++) {
				if(k == j) {
					this.backData[j].minNumber = num;
				}
			}
		},
		//改变数值
		backItem(index) {
			let showName = this.info.unitList[index]; //展示的单位名称
			this.info.defaultName = showName;
			for(let k = 0; k < this.info.unit.length; k++) {
				if(this.info.unit[k].name == showName) {
					this.info.defaultValue = this.info.unit[k].value;
				}
			}
			for(let k = 0; k < this.backData.length; k++) {
				if(Number(this.backData[k].minNumber)) {
					let backObj = global.comUnit(Number(this.backData[k].minNumber), this.info.defaultValue, showName, this.info.minName, true);
					this.backData[k].oneNum = backObj.oNull;
					this.backData[k].twoNum = backObj.tNull;
				}
			}
		},
		//单位换算
		comUnit(...args) { //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			let [number, value, showName, minName, type] = args;
			return global.comUnit(number, value, showName, minName, type);
		},
		//筛选
		search() {
			this.backData = [];
			if(this.startObj.time > this.endObj.time) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '开始时间不能大于结束时间',
				});
				return false;
			}
			//过滤时间
			for(let i = 0; i < this.list.length; i++) {
				if(this.list[i].productionTime * 1000 <= this.endObj.time && this.list[i].productionTime * 1000 >= this.startObj.time) {
					this.backData.push(this.list[i]);
				}
			}
			//过滤供应商
			for(let i = 0; i < this.backData.length; i++) {
				if(this.backData[i].supplier.indexOf(this.supplyer) == -1) {
					this.backData.splice(i, 1);
					i--;
				}
			}
			//过滤批次编号
			for(let i = 0; i < this.backData.length; i++) {
				if(this.backData[i].batchCode.indexOf(this.batchNum) == -1) {
					this.backData.splice(i, 1);
					i--;
				}
			}
		},
		//重置
		reset() {
			this.batchNum = '';
			this.supplyer = '';
			this.startObj.time = utils.getTime({
				time: new Date()
			}).start;
			this.endObj.time = utils.getTime({
				time: new Date()
			}).end;
			this.getMaterialBatch();
		}
	}
};
</script>

<style lang='less' scoped>
	#tan {
		height: 100%;
		background: #F7F7F7;
		padding: 19px;
		.title {
			width: 100%;
			overflow: hidden;
			div {
				float: left;
				width: 25%;
				span {
					display: block;
					height: 30px;
					line-height: 30px;
				}
				.clear {
					float: right;
					height: 40px;
					line-height: 40px;
					width: 100px;
					text-align: center;
					color: #fff;
					background: #fe8d01;
					cursor: pointer;
				}
			}
		}
		.menu {
			margin-bottom: 20px;
			input {
				width: 140px;
				height: 40px;
				padding-left: 7px;
			}
			.btn {
				display: inline-block;
				width: 100px;
				height: 40px;
				line-height: 40px;
				color: #fff;
				text-align: center;
				font-size: 16px;
				vertical-align: middle;
			}
			.canMulti {
				display: inline-block;
				vertical-align: middle;
				background: #fff;
				height: 40px;
				.timeBox {
					position: relative;
					width: 350px;
					height: 40px;
					line-height: 40px;
					cursor: pointer;
					border: 1px solid #CECDCD;
					.down {
						display: inline-block;
						width: 0;
						height: 0;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						border-top: 10px solid #b3b3b3;
						position: absolute;
						top: 15px;
						right: 17px;
					}
				}
				.time {
					float: left;
					width: 140px;
					height: 39px;
					line-height: 39px;
					text-align: center;
				}
			}
		}
		.content {
			background: #F7F7F7;
			.top {
				ul {
					padding: 10px 0;
					overflow: hidden;
					border-top: 1px solid #ccc;
					border-bottom: 1px solid #ccc;
					li {
						height: 40px;
						line-height: 40px;
						float: left;
						text-align: center;
						width: 15%;
						border-right: 1px solid #ccc;
						&:first-child {
							width: 10%;
						}
						&:last-child {
							border-right: 0;
						}
					}
				}
			}
			.scroll-box {
				height: 332px;
				overflow: auto;
			}
			.list {
				border-bottom: 1px solid #ccc;
				input {
					width: 65px;
					height: 39px;
					padding-left: 7px;
					border: 1px solid #ccc;
					float: left;
				}
				i {
					width: 40px;
					height: 39px;
					border: 1px solid #ccc;
					float: left;
					line-height: 39px;
					background: #fff;
					border-left: none;
				}
				ul {
					overflow: hidden;
					li {
						height: 60px;
						line-height: 60px;
						width: 15%;
						float: left;
						text-align: center;
						i {
							text-align: center;
						}
						&:first-child {
							width: 10%;
						}
					}
				}
				&:last-child {
					border-bottom: 1px solid #ccc;
				}
			}
			.empty {
				height: 60px;
				line-height: 60px;
				text-align: center;
				color: #999;
				font-size: 20px;
			}
		}
		.list li,
		.list i,
		.hide {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.unit-box {
			display: inline-block;
			overflow: hidden;
			vertical-align: middle;
		}
	}
	
	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}
</style>