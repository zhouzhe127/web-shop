<!--
	**自定义商品统计
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="stat-com">
		<section v-if="showDet == 'all'" class="top">
			<!--日期选择和搜索框-->
			<!--日期选择和搜索框-->
			<el-date-picker :clearable="false" v-model="startTime" type="date" placeholder="选择日期" style="width:150px;">
			</el-date-picker>
			<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
			<el-date-picker :clearable="false" v-model="endTime" @change="getendTime" type="date" placeholder="选择日期" style="width:150px;">
			</el-date-picker>
			<section class="isTimeOne">
				<div v-on:click="selectBusinessHours" :class="{'act':isOpenTime}"></div>
				<span>按营业时间</span>
			</section>
			<el-button @click="selects" type="primary" icon="el-icon-search">搜索</el-button>
			<el-button @click="resetting" type="info" icon="el-icon-search">重置</el-button>
		</section>
		
		<section v-if="showDet == 'all'">
			<!--总-->
			<div class="oidList">
				<ul class="oUl">
					<li style="width:20%;">天数</li>
					<li>商品总数</li>
					<li>销量</li>
					<li>赠品总数</li>
					<li>赠品金额</li>
					<li>退品数量</li>
					<li>退品金额</li>
					<li>消费金额</li>
					<li>实收金额</li>
				</ul>
				<ul class='tUl'>
					<li style="width:20%;">{{total.totalDay}}</li>
					<li>{{total.goodsNum}}</li>
					<li>{{total.salesNum}}</li>
					<li>{{total.freeNum}}</li>
					<li>{{total.freeAmount}}</li>
					<li>{{total.returnNum}}</li>
					<li>{{total.returnAmount}}</li>
					<li>{{total.consumptionAmount}}</li>
					<li>{{total.paidAmount}}</li>
				</ul>
			</div>
			<section class="oBox">
				<div class="boxTop">
					<div class="oSpan">
						自定义商品统计 · 共<em style="color: #ff3c04;font-size: inherit;">{{withoutOrder.length}}</em>条记录
					</div>
				</div>
				<el-table
					ref="multipleTable" stripe
					:data="withoutOrder"
					fixed
					:header-cell-style = "{'background-color':'#f5f7fa'}"
					style="width: 100%"
					@selection-change="handleSelectionChange">
					<template slot-scope="scope">
						<el-table-column reserve-selection type="selection" width="55"> </el-table-column>
						<el-table-column fixed min-width = "150" align="center" prop="goodsName" label="商品名称"></el-table-column>
						<el-table-column fixed min-width = "120" align="center" prop="goodsNum" label="商品总数">
							<template slot-scope="scope">
								<span @click="openGoodSel(scope.row,'goodsNum',scope.$index)" style="color:#01AAE5;cursor:pointer">{{scope.row.goodsNum}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width = "120" align="center" prop="salesNum" label="销量">
							<template slot-scope="scope">
								<span @click="openGoodSel(scope.row,'salesNum',scope.$index)" style="color:#01AAE5;cursor:pointer">{{scope.row.salesNum}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="freeNum" align="center" label="赠品总数" >
							<template slot-scope="scope">
								<span @click="openGoodSel(scope.row,'freeNum',scope.$index)" style="color:#01AAE5;cursor:pointer">{{scope.row.freeNum}}</span>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="freeAmount" label="赠品金额" ></el-table-column>
						<el-table-column align="center" prop="billPrice" label="退品数量">
							<template slot-scope="scope">
								<span @click="openGoodSel(scope.row,'returnNum',scope.$index)" style="color:#01AAE5;cursor:pointer">{{scope.row.returnNum}}</span>
							</template>
						</el-table-column>
						<el-table-column align="center" prop="returnAmount" label="退品金额"></el-table-column>
						<el-table-column align="center" prop="consumptionAmount" label="消费金额"></el-table-column>
						<el-table-column align="center" prop="paidAmount" label="实收金额"></el-table-column>
					</template>
				</el-table>
			</section>
		</section>
		<custom-detail v-if="isShow" @throwWinResult="doThrowWinResult" :userData="userData" :showDet="showDet" :itemdetial="itemdetial"></custom-detail>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			userData: Object,
			isShow: false,
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			isOpenTime: true, //是否按营业时间
			withoutTotal: {
				freeTotalNum: 0,
				orderNum: 0,
				returnTotalNum: 0,
				returnTotalPrice: 0
			}, //退品统计
			withoutOrder: [], // 自定义菜品列表
			total: {
				totalDay: '0',
				goodsNum: '0',
				salesNum: '0',
				freeNum: '0',
				freeAmount: '0',
				returnNum: '0',
				consumptionAmount: '0',
				paidAmount: '0',
				returnAmount: '0'
			}, //总计
			allselect: false, //是否全部选中

			itemdetial: {}, //从主页面进入详情
			itemIndex: 0,
			showDet: 'all',
			selectList:[],//选择的列表
		};
	},
	mounted() {
		this.initBtn();
		this.userData = storage.session('userShop');
		this.init();
	},
	methods: {
		handleSelectionChange(val){
			this.selectList = val;
		},
		initBtn() {
			let arr = [{
				name: '导出',
				type:4,
				className: 'primary',
				fn: this.importDet
			}];
			this.$store.commit('setPageTools', arr);
		},
		//结束时间为当天的最后一秒，组件为开始
		getendTime(re){
			this.endTime = new Date(re).getTime()+ (24 * 60 * 60 * 1000 -1000);
		},
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//点击搜索按钮
		selects() {
			this.init();
		},
		//重置
		resetting() {
			this.isOpenTime = true;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.selects();
		},
		//初始化
		async init() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.endTime - this.startTime > timer) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '最大只能查询三个月时间'
				});
				return false;
			} else if (
				parseInt(this.startTime / 1000) -
					parseInt(this.endTime / 1000) >
				0
			) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '时间选择错误'
				});
				return false;
			}
			let res = await http.getStatisticsData({
				data: {
					shopId: this.userData.currentShop.id,
					startYear: this.formatTime(
						new Date(this.startTime),
						'yyyy'
					),
					startMonth: this.formatTime(new Date(this.startTime), 'MM'),
					startDay: this.formatTime(new Date(this.startTime), 'dd'),
					endYear: this.formatTime(new Date(this.endTime), 'yyyy'),
					endMonth: this.formatTime(new Date(this.endTime), 'MM'),
					endDay: this.formatTime(new Date(this.endTime), 'dd'),
					isOpenTime: Number(this.isOpenTime)
				}
			});
			if (res) {
				if (res.length == 0) {
					this.total = {
						totalDay: '0',
						goodsNum: '0',
						salesNum: '0',
						freeNum: '0',
						freeAmount: '0',
						returnNum: '0',
						consumptionAmount: '0',
						paidAmount: '0',
						returnAmount: '0'
					};
					this.withoutOrder = [];
				} else {
					for (let i = 0; i < res.list.length; i++) {
						res.list[i].selected = false;
						for (let j = 0; j < res.list[i].list.length; j++) {
							res.list[i].list[j].itemNum = parseInt(
								res.list[i].list[j].itemNum
							);
							res.list[i].list[j].returnNum = parseInt(
								res.list[i].list[j].returnNum
							);
							res.list[i].list[j].freeNum = parseInt(
								res.list[i].list[j].freeNum
							);
							res.list[i].list[j].salesNum =
								res.list[i].list[j].itemNum -
								res.list[i].list[j].returnNum;
							//单个订单优惠金额
							res.list[i].list[j].freeAmount = parseFloat(
								res.list[i].list[j].freeNum *
									res.list[i].list[j].itemPrice
							).toFixed(2);
							//单个订单消费金额
							res.list[i].list[j].consumptionAmount = parseFloat(
								(res.list[i].list[j].itemNum -
									res.list[i].list[j].returnNum) *
									res.list[i].list[j].itemPrice
							).toFixed(2);
							//单个订单退品金额
							res.list[i].list[j].returnAmount = parseFloat(
								res.list[i].list[j].returnNum *
									res.list[i].list[j].itemPrice
							).toFixed(2);
						}
					}
					this.total = res.total;
					this.withoutOrder = res.list;
				}
			}
		},
		//格式化时间戳
		formatTime(time, str) {
			return utils.format(new Date(time), str);
		},
		//全选
		allSel: function() {
			let withoutList = this.withoutOrder;
			if (this.allselect == false) {
				for (let i = 0; i < withoutList.length; i++) {
					withoutList[i].selected = true;
					this.allselect = true;
				}
			} else {
				for (let i = 0; i < withoutList.length; i++) {
					withoutList[i].selected = false;
					this.allselect = false;
				}
			}
		},
		// 选中
		ocSelOne: function(data) {
			data.selected = !data.selected;
			if (!data.selected) {
				this.allselect = false;
			}
		},
		//打开商品总数或者赠品、销量等
		openGoodSel: function(item, showDet, index) {
			this.itemIndex = index;
			if (item.freeNum == 0 && showDet == 'freeNum') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '没有赠品'
				});
				return;
			}
			if (item.returnNum == 0 && showDet == 'returnNum') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '没有退品'
				});
				return;
			}
			if (item.salesNum == 0 && showDet == 'salesNum') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '没有销量'
				});
				return;
			}
			this.showDet = showDet;
			this.itemdetial = item;
			this.isShow = true;
		},
		//导出
		async importDet() {
			let selectList = this.selectList;
			let str = ''; //保存要导出的id
			for (let i = 0; i < selectList.length; i++) {
				str = str + selectList[i].goodsId + ',';
				// if (selectList[i].selected == true) {
				// 	str = str + selectList[i].goodsId + ',';
				// }
			}
			if (str == '' || str == ',') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请选择要导出的选项'
				});
				return false;
			}
			await http.exportCustomStatistics({
				data: {
					shopId: this.userData.currentShop.id,
					startYear: this.formatTime(
						new Date(this.startTime),
						'yyyy'
					),
					startMonth: this.formatTime(new Date(this.startTime), 'MM'),
					startDay: this.formatTime(new Date(this.startTime), 'dd'),
					endYear: this.formatTime(new Date(this.endTime), 'yyyy'),
					endMonth: this.formatTime(new Date(this.endTime), 'MM'),
					endDay: this.formatTime(new Date(this.endTime), 'dd'),
					exportIds: str,
					isOpenTime: Number(this.isOpenTime)
				}
			});
		},
		doThrowWinResult(res) {
			this.initBtn();
			this.showDet = res;
			this.isShow = false;
		}
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		customDetail: () =>
			import(/*webpackChunkName: "custom_detail"*/ './custom_detail')
	}
};
</script>

<style  type="text/css" lang="less" scoped>
#stat-com .oBox{
		width:100%;border:1px solid #ebeef5;border-bottom:none;padding:1px;margin:10px 0;
		.boxTop{
			height:50px;border-bottom:1px solid #ebeef5;
			.oSpan{
				width: 100%;
				height: 50px;
				line-height: 50px;
				padding: 0 10px;
				font-size: 16px;
			}
		}
	}
#stat-com {
	position: relative;
}
#stat-com .dao-chu {
	position: absolute;
	top: -50px;
	right: 20px;
}
#stat-com .export-btn {
	background: #29abe2;
	color: #fff;
	cursor: pointer;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	display: block;
	float: left;
	margin-left: 20px;
}
#stat-com .top {
	width: 100%;
	height: 50px;
	min-width: 780px;
}
#stat-com .isTimeOne {
	line-height: 46px;
	width: 125px;
	display: inline-block;
	margin: 0 10px;
}
#stat-com .isTimeOne div {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 13px 10px;
	float: left;
}
#stat-com .isTimeOne span {
	font-size: 16px;
}
#stat-com .searchOne {
	width: 80px;
	height: 40px;
	line-height: 40px;
}
#stat-com .backOne {
	width: 80px;
	height: 40px;
	line-height: 40px;
	margin-left: 20px;
}
#stat-com .oidList {
	width: 100%;
	height: auto;
	margin-bottom: 30px;
	border: 1px solid #d2d2d2;
}
#stat-com .oidList ul {
	width: 100%;
	height: 60px;
	background-color: #fff;
	border-bottom: #f7f7f7 solid 4px;
	overflow: hidden;
}
#stat-com .oidList ul li {
	width: 10%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	float: left;
	color: #42404b;
}
#stat-com .oidList ul.oUl {
	height: 40px;
	background-color: #ecedf2;
	border: none;
	width: 100%;
	overflow: hidden;
}
#stat-com .oidList ul.tUl {
	border-bottom: none;
}
#stat-com .oidList ul.oUl li {
	width: 10%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
}
#stat-com .oidList ul.tUl li {
	width: 10%;
	color: #ff9e11;
}
#stat-com .act {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
#stat-com .orMaReMainList {
	border: 1px solid #ccc;
	min-height: 400px;
	overflow: auto;
}
#stat-com .orMaReMainList section {
	width: 100%;
	height: 70px;
	line-height: 70px;
}
#stat-com .orMaReMainList section h3 {
	margin-left: 30px;
	font-size: 16px;
}
#stat-com .orMaReMainList section h3 span {
	color: #fe3d04;
	padding: 0 5px;
}
#stat-com .orMaReMainList li:first-of-type,
#stat-com .orMaReMainList li:last-of-type {
	background: #e6e6e6;
}
#stat-com .orMaReMainList li:nth-of-type(even) {
	background: #f2f2f2;
}
#stat-com .orMaReMainList li:nth-of-type(2) {
	text-align: center;
	height: 50px;
	line-height: 50px;
}
#stat-com .orMaReMainList li span {
	display: block;
	text-align: center;
	height: 50px;
	line-height: 50px;
	width: 10%;
	color: #42404b;
	float: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#stat-com .orMaReMainList li .allSpan {
	width: 6%;
	cursor: pointer;
}
#stat-com .orMaReMainList li .cursorAll {
	cursor: pointer;
	color: #29a7e1;
}
#stat-com .circle {
	width: 26px;
	height: 26px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -13px;
	margin-top: -13px;
	background: #fff;
}
#stat-com .active {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
.input-word {
	padding: 0 5px;
	height: 40px;
	line-height: 40px;
	float: left;
}
.input-box {
	width: 200px;
	float: left;
}
</style>
