<template>
	<div class="soldnew">
		<div class="leftform">
			<div class="content-box">
				<span class="required right">下架类型</span>
				<select-btn :sorts="soldType" :name="soldType[2]" @selOn="selectList" :width="230" ref="select"></select-btn>
			</div>
			<div class="content-box">
				<span class="required right">生产日期</span>
				<div class="orMaRetBox">
					<calendar :only="false" :time="startTime" :calStyle="{'width':'230px'}" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
				</div>
			</div>
			<div class="content-box">
				<span class="required right">下架数量</span>
				<input v-model="soldNum" type="text" placeholder="请填写下架数量" maxlength="10" />
			</div>
			<div class="content-box">
				<span class="required right">进价</span>
				<input v-model="price" type="text" placeholder="请填写进价" maxlength="10" />
			</div>
			<div class="content-box">
				<span class="right">批次编码</span>
				<input v-model="batchCode" type="text" placeholder="选填" maxlength="10" />
			</div>
		</div>
		<div class="rightform">
			<div class="content-box">
				<span class="required right">仓库</span>
				<section @click="showWar" class="tableListInp chairFix" style="vertical-align: middle;">
					<span class="inptext">{{iswear}}{{iswear&&"/"}}{{isarea}}</span>
					<div class="fl">
						<span class="addstyle">+</span>
					</div>
				</section>
			</div>
			<div class="content-box">
				<span class="required right">失效日期</span>
				<div class="orMaRetBox">
					<calendar :only="false" :time="endTime" :calStyle="{'width':'230px'}" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				</div>
			</div>
			<div class="content-box">
				<span class="required right">供应商</span>
				<section @click="showSupply" class="tableListInp chairFix" style="vertical-align: middle;">
					<span class="inptext">{{selectSupply}}</span>
					<div class="fl">
						<span class="addstyle">+</span>
					</div>
				</section>
			</div>
			<div class="content-box">
				<span class="right">货号</span>
				<input v-model="artNo" type="text" placeholder="请填写货号" maxlength="10" />
			</div>
			<div class="content-box">
				<span class="right">下架原因</span>
				<input v-model="remarks" type="text" placeholder="选填" maxlength="20" />
			</div>
		</div>
		<multiple-win :styles="{backgroundColor: '#F1F1F1'}" @selArray="winSel" :isradio="win.isradio" :selects="win.selects" :title="win.title"
		    v-if="win.show&&win.list.length>0" :name="win.name" :width="win.width" :height="win.height" :list="win.list" :selkey="win.selkey"></multiple-win>
		<warehouse-win ref="warehouse" :title="winTitle" :wareType="wareType" v-show="wareshow" @wareEvent="wareEvent"></warehouse-win>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				soldType: ['下架到耗损', '下架到库存', '下架到库存(新增批次)'],
				type: 2,
				startTime: utils.getTime({
					time: new Date()
				}).start,
				endTime: utils.getTime({
					time: new Date()
				}).end,
				wareshow: false,
				winTitle: '仓库位置',
				wareType: 0,
				win: {
					title: '供应商',
					show: false,
					list: [],
					width: 980,
					height: 400,
					isradio: true,
					name: 'name',
					selkey: 'id',
					selects: []
				},
				selectSupply: '', //选择的供应商
				soldNum: '', //下架数量
				price: '', //进价
				batchCode: '', //批次编码
				artNo: '', //货号
				remarks: '', //下架原因
				iswear: '',
				isarea: '',
				wid: '',
				areaId: ''
			};
		},
		methods: {
			showWar() {
				this.wareshow = true;
			},
			wareEvent(str) {
				this.wareshow = false;
				if (str == 'ok') {
					this.wareClose();
				}
			},
			wareClose() {
				let wareWin = this.$refs.warehouse;
				if (!wareWin.chooseWare) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请选择区域'
					});
					this.wareshow = true;
					return false;
				}
				this.iswear = wareWin.searchList[wareWin.homeSel].name;
				this.isarea = wareWin.chooseWare.areaName;
				this.wid = wareWin.homeId;
				this.areaId = wareWin.chooseWare.id;
			},
			async showSupply() {
				this.win.show = true;
				let data = await http.suppierList();
				this.win.list = data;
			},
			winSel(arr, str) {
				this.win.show = false;
				if (str == 'ok') {
					this.win.selects = arr;
					if (this.win.list.length > 0 && arr.length > 0) {
						this.selectSupply = this.win.list.find(p => p.id === arr[0]).name;
					} else {
						this.selectSupply = '';
					}
				}
			},
			selectList(sle) {
				this.type = sle;
				this.$emit('sleType', sle);
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
			}
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			multipleWin: () =>
				import ( /*webpackChunkName: 'multiple_win'*/ 'src/components/multiple_win'),
			warehouseWin: () =>
				import ( /*webpackChunkName: 'warehouse_win'*/ './warehouse_win')
		}
	};
</script>
<style lang="less" scoped>
	.soldnew {
		padding: 25px 30px 0 30px;
		.leftform {
			display: inline-block;
		}
		.rightform {
			display: inline-block;
			margin-left: 50px;
		}
		.content-box {
			margin-bottom: 15px;
			.right {
				display: inline-block;
				width: 100px;
				text-align: right;
			}
			.orMaRetBox {
				display: inline-block;
				vertical-align: middle;
			}
			input {
				width: 230px;
				height: 37px;
				font-size: 14px;
				padding-left: 8px;
				outline: none;
			}
			.tableListInp {
				color: #666666;
				border: #b3b3b3 solid 1px;
				height: 40px;
				display: inline-block;
				cursor: pointer;
				div {
					width: 41px;
					height: 40px;
					position: relative;
					z-index: 5;
				}
				.inptext {
					height: 39px;
					width: 188px;
					display: block;
					float: left;
					border-right: 1px #b3b3b3 solid;
					padding-left: 10px;
					text-align: center;
					line-height: 39px;
				}
				.addstyle {
					font-size: 30px;
					text-align: center;
					width: 100%;
					display: inline-block;
					color: #b2b2b2;
					line-height: 30px;
				}
			}
		}
	}
</style>