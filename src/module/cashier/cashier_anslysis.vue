/* * @file * * 收银分析 * * @author zhengu.jiang */

<template>
	<div id="report">
		<section class="yuChairFix clearfix">
			<!-- 时间类型选择 -->
			<section @click="fadeAway" class="top-box fl">
				<span class="wordSize">时间类型：</span>
				<selectBtn @emit="selectType" :sorts.sync="options" :name.sync="selectedName" class="select-btn"></selectBtn>
			</section>
			<section @click="fadeAway" class="top-box fl" style="margin-right: 0">
				<section class="cala chairFix">
					<calendar :time="startTime" :type="selectedType" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</section>
			</section>
			<span class="line">-</span>
			<section @click="fadeAway" class="top-box fl">
				<section class="cala chairFix">
					<calendar :time="endTime" :type="selectedType" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</section>
			</section>
			<!-- 时间段筛选 -->
			<section @click="fadeAway" class="top-box fl">
				<span class="wordSize">时间段筛选：</span>
				<timehm @timeChoose="getTime" :start="start" :end="end" :index="index"></timehm>
			</section>
			<section style="display:inline-block">
				<!--品牌店铺选择-->
				<section class="top-box fl" style="height:42px">
					<!--<selectstore @returnShop="getShop" :show="hide" :reset="reset"></selectstore>-->
					<elShopList :shopIds="selShopid" @chooseShop="getShop"></elShopList>
				</section>
				<section class="top-box fl detLi" style="margin-left: 10px;">
					<a @click="search" href="javascript:void(0);" class="blue searchs">搜索</a>
					<a @click="resetAll" href="javascript:void(0);" class="gray">重置</a>

					<!-- <a v-if="backList" @click="back" href="javascript:void(0);" class="back" style="width: 90px;height: 40px;line-height: 40px;position: absolute;top: -50px;left: -100px;color: #B3B3B3;border: 1px solid #B3B3B3;">返回</a>
					<a @click="showHead" ref="setHead" href="javascript:void(0);" class="yellow">表头设置</a>
					<a @click="exportData" href="javascript:void(0);" class="blue out">导出</a> -->
					<!-- 表头设置 -->
				</section>
			</section>
			<section class="detLi ">
				<div v-if="formHead" class="detDiv formHead" @click.stop style="width: 600px;top: 0;position: absolute;z-index: 100;">
					<i class="detI" style="left: 450px;"></i>
					<h3 class="detH3" @click.stop style="text-align: left;height: 400px;overflow: auto;padding:10px">
						<span @click="allHead" class="all">全部</span>
						<div class="selectbtns">
							<span v-for="(item, index) in headList" :key="index" v-on:click="choseHead(item)" class="aLi" :class="{'sign':item.selected}">{{item.name}}</span>
						</div>
					</h3>
					<div class="detLiBtn">
						<span @click="cancelHead" class="gray">取消</span>
						<span @click="enterHead" class="sure">确定</span>
					</div>
				</div>
			</section>
		</section>
		<section class="nav">
			<div class="formType light">
				<span class="typeTotal" v-bind:class="{'typeOn': chartList.flag == index}" v-for="(item, index) in chartList.list" :key="index"
				    @click="changeChart(index)">{{item.name}}</span>
			</div>
			<div class="light" v-if="chartList.flag == 0">
				<span class="sel" v-for="(item, index) in buttonList.list" :key="index" v-bind:class="{'on': buttonList.flag == index}" @click="light(index)">{{item.name}}</span>
			</div>
			<div class="light" v-else>
				<span class="sel" v-for="(item, index) in chartType.list" :key="index" v-bind:class="{'on': chartType.flag == index}" @click="changeCtype(index)">{{item.name}}</span>
			</div>
			<div class="selectName" v-if="shopName != '请选择店铺' && chartList.flag == 0">
				<span style="font-size: 16px;line-height:20px">选择店铺：{{shopName}}</span>
			</div>
		</section>
		<dataform v-show="chartList.flag === 0" @back="getBack" :num="num" :shopId="shopId" :exportIndex="exportIndex" :width="showWidth"
		    :loading="loading" :headList="headList" :reportList="orderList" :selShopid="selShopid" :selectedType="typeFlag" :selHead="selHead"
		    :flag="buttonList.flag" :isBack="isBack"></dataform>
		<datacharts v-if="chartList.flag === 1" @search="chartSearch" :num="num" :chartType="chartType.flag" :loading="loading"
		    :ChartShop="ChartShopName" :selShopid="selShopid" :chartFlag="chartType.flag" :typeFlag="typeFlag"
		    :reportList="orderList" :flag="buttonList.flag" :headList="headList"></datacharts>
		<!-- <datacharts v-if="chartList.flag === 1" ></datacharts> -->
		<loading v-if="!loading" :totalCount="totalCount" :taskCountTotal="taskCountTotal" :taskCount="taskCount"></loading>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				shopId: null,
				options: ['日报表', '周报表', '月报表', '季度报表', '年报表'],
				selectedType: 0, //对应循序  0:日, 1:周, 2:月, 3:季度, 4:年
				selectedName: '日报表',
				startTime: '',
				timeStart: '', // 周 月 季度 年 开始时间
				timeEnd: '', // 周 月 季度 年 结束时间
				endTime: '',
				start: {
					hour: '00',
					minute: '00'
				},
				end: {
					hour: '23',
					minute: '59'
				},
				index: 0, //用于时间段筛选的重置
				shopList: [], //所有店铺列表
				selects: [], //选中的店铺
				reset: 1, //用于店铺重置
				shopName: '请选择店铺', //选中的店铺名称
				backList: false, //选择固定对比后 返回按钮
				isBack: false, //子组件判断是否返回
				formHead: false, //表头设置是否展开
				headList: [], //表头列表
				selHead: [], //选中的表头
				showWidth: 0, //选中的表头个数改变表格的长度
				chartsHead: '', // 图表表头
				chartList: {
					flag: 0,
					list: [{
						index: 0,
						name: '数据'
					},
					{
						index: 1,
						name: '图表'
					}]
				},
				buttonList: {
					flag: 0,
					list: [{
						index: 0,
						name: '原表'
					},
					{
						index: 1,
						name: '占比'
					},
					{
						index: 2,
						name: '总占比'
					},
					{
						index: 3,
						name: '环比'
					},
					{
						index: 4,
						name: '同比'
					}]
				},
				chartType: {
					flag: 0,
					list: [{
						index: 0,
						name: '店铺日常运营数据'
					},
					{
						index: 1,
						name: '商品销售数量'
					},
					{
						index: 2,
						name: '商品销售金额'
					},
					{
						index: 3,
						name: '优惠数据'
					},
					{
						index: 4,
						name: '退品数据'
					},
					{
						index: 5,
						name: '系统取整数据'
					},
					{
						index: 6,
						name: '支付方式'
					}]
				},
				taskId: '', //轮询
				orderList: {
					list: [],
					total: {}
				}, //数据列表
				selOrderList: [], //保存的原始表格数据
				selTotalList: [], //保存的原始总计
				loading: true,
				list: [],
				ChartShopName: [], //选中的店铺
				typeFlag: -1, //传给组件的日期类型
				exportIndex: -1, //用于组件判断是否导出
				repeat: false, //用于判断查询是否结束
				hide: 0, //头部选项切换隐藏其他
				taskCountTotal: 1, //本次查询总任务数
				taskCount: 0, //剩余任务数
				totalCount: 1, //用于进度条
				num: 0,

				selShopid: [], //传给后台的 选中的店铺id//传给选择店铺页面
			};
		},
		mounted() {
			let userData = storage.session('userShop');
			this.shopId = userData.currentShop.id;
			// document.addEventListener('click', ()=>{
			//     this.formHead = false;
			// })
			this.shopList = storage.session('shopList');
			// this.getShopList();
			this.getReportHead();
			this.initBtn();
		},
		methods: {
			//初始化右上角按钮
			initBtn() {
				let arr = [{
					name: '表头设置',
					className: ['firstBtn', 'headSet'],
					fn: () => {
						this.showHead();
					}
				},
				{
					name: '导出',
					className: ['pickCheck', 'headSet'],
					fn: () => {
						this.exportData();
					}
				}];
				if (this.backList) {
					arr.unshift({
						name: '返回',
						className: ['huiC', 'headSet'],
						fn: () => {
							this.back();
						}
					});
				}
				this.$store.commit('setPageTools', arr);
			},
			//获取品牌下的店铺
			async getShopList() {
				let res = await http.getShopList({
					data: {
						shopId: this.shopId
					}
				});
				this.shopList = res;
			},
			//获取表头
			async getReportHead() {
				let res = await http.getReportHead({
					data: {
						shopId: this.shopId
					}
				});
				for (let i = 0; i < res.length; i++) {
					res[i].selected = true;
				}
				this.headList = utils.deepCopy(res);
				this.selHead = utils.deepCopy(res);
				this.chartsHead = utils.deepCopy(res);
				for (let j = 0; j < this.chartsHead.length; j++) {
					this.chartsHead[j].selected = false;
				}
				this.showWidth = this.headList.length * 100;
			},
			//收银分析查询数据
			async orderReportAnalysis(timeBetween) {
				http.orderReportAnalysis({
					data: {
						shopId: this.shopId,
						timeType: this.selectedType + 1,
						startTime: this.selectedType === 0 ? this.startTime : this.timeStart,
						endTime: this.selectedType === 0 ? this.endTime : this.timeEnd,
						timeBetween: timeBetween,
						reportType: this.buttonList.flag + 1,
						shopIds: this.selShopid.join(),
					},
					timeout: 60000
				}).then((data) => {
					this.taskCountTotal = data.taskCount;
					this.totalCount = 1;
					this.taskInfo(data);
					window.timer = setInterval(() => {
						this.taskInfo(data);
					}, 3000);
				});
			},
			//轮询请求接口
			async taskInfo(data) {
				http.taskInfo({
					data: {
						shopId: this.shopId,
						taskId: data.taskId
					}
				}).then((res) => {
					this.taskCount = res.taskCount;
					this.totalCount += 3; //绘制报表时用于制作进度条
					if (res.status == 3) {
						clearInterval(window.timer);
						this.getAnalysis(data.taskId);
						this.repeat = false;
					} else if (res.status == 2) {
						this.loading = true;
						this.repeat = false;
						//失败
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '请求失败，请重试！',
						});
						clearInterval(window.timer);
					}
				});
			},
			//轮询结束获取数据
			async getAnalysis(taskId) {
				http.getAnalysis({
					data: {
						shopId: this.shopId,
						taskId: taskId
					},
					timeout: 60000
				}).then((data) => {
					this.loading = true;
					if(!data.list){
						return false;
					}
					for(let i = 0; i < data.list.length; i++){
						data.list[i]['selected'] = false;
					}
					this.orderList = utils.deepCopy(data);
					this.list = utils.deepCopy(data);
				});
			},
			fadeAway() {
				this.hide++;
			},
			selectType(index) {
				this.selectedType = index;
				// this.startTimeChange();
				// this.endTimeChange();
			},
			startTimeChange(time, timer) { //开始时间
				this.startTime = time;//日报表时间
				if(this.selectedType == 2){// 月报表时间
					this.timeStart = new Date(time).getFullYear() + '年' + (new Date(time).getMonth()+1);
				}else{//周、季度、年报表时间
					this.timeStart = timer;
					this.timeStart = this.timeStart.substring(0, this.timeStart.length - 1);
					if (this.selectedType == 3) {
						this.timeStart = this.timeStart.substring(0, this.timeStart.length - 1);
					}
					this.timeStart = this.timeStart.replace(/\s/g, '');
				}
			},
			endTimeChange(time, timer) { //结束时间
				this.endTime = time; //日报表时间
				if(this.selectedType == 2){ // 月报表时间
					this.timeEnd = new Date(time).getFullYear() + '年' + (new Date(time).getMonth()+1);
				}else{ //周、季度、年报表时间
					this.timeEnd = timer;
					this.timeEnd = this.timeEnd.substring(0, this.timeEnd.length - 1);
					if (this.selectedType == 3) {
						this.timeEnd = this.timeEnd.substring(0, this.timeEnd.length - 1);
					}
					this.timeEnd = this.timeEnd.replace(/\s/g, '');
				}
			},
			getTime(time) {
				this.start.hour = time.start.hour;
				this.start.minute = time.start.minute;
				this.end.hour = time.end.hour;
				this.end.minute = time.end.minute;
			},
			//根据店铺id匹配店铺名
			getShopname: function () {
				if (this.shopName != '请选择店铺') {
					let list = this.shopName.split(',');
					let arr = [];
					for (let i = 0; i < list.length; i++) {
						let obj = {};
						if (i === 0) {
							obj.className = 'chyellow';
							obj.name = list[i];
						} else if (i === 1) {
							obj.className = 'chblue';
							obj.name = list[i];
						} else if (i === 2) {
							obj.className = 'chgreen';
							obj.name = list[i];
						} else {
							obj.className = '';
							obj.name = list[i];
						}
						arr.push(obj);
					}
					this.ChartShopName = arr;
					// this.ChartSelShop = arr.slice(0,3);
				} else {
					this.shopName = '请选择店铺';
				}
			},
//			getShop(id, name) {
//				console.log(this.shopList);
//				console.log(id);
//				console.log(name);
//				if (id || name) {
//					this.selShopid = id;
//					this.shopName = name;
//				}
//				this.getShopname();
//			},
			//选择店铺返回
			getShop(res) {
				this.shopName='';
				for(let i=0;i<this.shopList.length;i++){
					if(res.includes(this.shopList[i].id)){
						if(this.shopName==''){
							this.shopName=this.shopName+this.shopList[i].shopName;
						}else {
							this.shopName=this.shopName+','+this.shopList[i].shopName;
						}
					}
				}
				console.log(this.shopName);
				this.selShopid=res;
				this.getShopname();
			},
			//查询
			search() {
				if (this.repeat) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！',
					});
					return false;
				}
				if (this.selShopid.length == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请选择店铺'
					});
					return false;
				}
				this.repeat = true;
				this.loading = false;
				this.taskCountTotal = 1;
				this.taskCount = 0;
				switch (this.selectedType) {
					case 0:
						this.startTime = utils.format(new Date(this.startTime), 'yyyy-MM-dd');
						this.endTime = utils.format(new Date(this.endTime), 'yyyy-MM-dd');
						break;
					case 1:
						this.timeStart = this.timeStart.replace('年第', '/');
						this.timeEnd = this.timeEnd.replace('年第', '/');
						break;
					case 2:
						this.timeStart = this.timeStart.replace('年', '/');
						this.timeEnd = this.timeEnd.replace('年', '/');
						break;
					case 3:
						this.timeStart = this.timeStart.replace('年第', '/');
						this.timeEnd = this.timeEnd.replace('年第', '/');
						break;
					case 4:

						break;
					default:
						break;
				}
				//时间段
				let timeBetween = this.start.hour + ':' + this.start.minute + '-' + this.end.hour + ':' + this.end.minute;
				this.orderReportAnalysis(timeBetween);
				this.typeFlag = this.selectedType;
				//控制表格一页显示多少条数据 根据选择的店铺数控制
				if (this.selShopid.length <= 3) {
					this.num = 8;
				} else if (this.selShopid.length > 3 && this.selShopid.length <= 5) {
					this.num = 5;
				} else if (this.selShopid.length > 5 && this.selShopid.length < 10) {
					this.num = 3;
				} else if (this.selShopid.length >= 10 && this.selShopid.length < 20) {
					this.num = 2;
				} else {
					this.num = 1;
				}
			},
			//接收图表组件点击查询
			chartSearch(index) {
				this.buttonList.flag = index;
				this.search();
			},
			//重置
			resetAll() {
				this.options = ['日报表', '周报表', '月报表', '季度报表', '年报表'];
				this.shopName = '请选择店铺';
				this.reset++;
				this.selects = [];
				this.selectedType = 0;
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(0, 0, 0, 0);
				this.index++;
				this.start = {
					hour: '00',
					minute: '00'
				};
				this.end = {
					hour: '23',
					minute: '59'
				};
				this.selShopid = [];
			},
			// close(event) {
			// 	let setHead = this.$refs.setHead;
			// 	if (event.target != setHead) {
			// 		this.formHead = false;
			// 		document.removeEventListener('click', this.close);
			// 	}
			// },
			//展开表头设置
			showHead() {
				this.hide++;
				if (!this.formHead) {
					this.formHead = true;
					// document.addEventListener('click',this.close);
				} else {
					this.formHead = false;
					// document.removeEventListener('click',this.close);
				}
				this.headList = utils.deepCopy(this.selHead);
			},
			//导出
			exportData() {
				this.exportIndex++;
			},
			//接收表格组件的导出数据
			// exportList() {
			// },
			//判断是否有未选中的表头
			isHead() {
				for (let k = 0; k < this.headList.length; k++) {
					if (!this.headList[k].selected) {
						return true;
					}
				}
				return false;
			},
			//表头设置全选
			allHead() {
				if (this.isHead()) {
					for (let i = 0; i < this.headList.length; i++) {
						this.headList[i].selected = true;
					}
				} else {
					for (let i = 0; i < this.headList.length; i++) {
						this.headList[i].selected = false;
					}
				}
			},
			//表头选择
			choseHead(item) {
				item.selected = !item.selected;
			},
			//表头确定
			enterHead() {
				this.formHead = false;
				this.selHead = utils.deepCopy(this.headList);
			},
			//表头取消
			cancelHead() {
				this.formHead = false;
				this.headList = utils.deepCopy(this.selHead);
			},
			//图表，原表切换
			changeChart(index) {
				if (index == 1 && this.orderList.list.length === 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '请先搜索数据列表',
					});
					return false;
				}
				this.chartList.flag = index;
				this.orderList = utils.deepCopy(this.list);
				if (index == 1) {
					this.$store.commit('setPageTools', []);
				} else {
					this.initBtn();
				}
			},
			//表格类型选择
			light(index) {
				if (this.repeat) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！',
					});
					return false;
				}
				this.buttonList.flag = index;
				this.search();
			},
			//图表查看数据类型切换
			changeCtype(index) {
				this.chartType.flag = index;
			},
			//选择固定对比后，接收子组件的传值
			getBack(res) {
				this.backList = res;
				this.initBtn();
			},
			//按钮返回
			back() {
				this.backList = false;
				this.isBack = !this.isBack;
			},
			//获取表格数据
			// getList(order, total) {
			// 	this.selOrderList = order;
			// 	this.selTotalList = total;
			// }

		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			timehm: () =>
				import ( /*webpackChunkName: 'time'*/ 'src/components/time'),
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			dataform: () =>
				import ( /*webpackChunkName: 'anslysis_form'*/ './anslysis_form'),
			datacharts: () =>
				import ( /*webpackChunkName: 'anslysis_charts'*/ './anslysis_charts'),
			selectstore: () =>
				import ( /*webpackChunkName: 'select_shop'*/ './select_shop'),
			loading: () =>
				import ( /*webpackChunkName: 'category_loading'*/ './category_loading'),
			elShopList: () =>
				import ( /*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
		},
		destroyed() {
			clearInterval(window.timer);
		}
	};
</script>

<style scoped>
	#report .sign {
		border: 1px solid #FF9800 !important;
	}

	.sign .selectbtns {
		display: inline;
	}

	#report .selectbtns {
		display: inline;
	}

	#report .selectbtns span {
		background-color: #45404b;
		border: 1px solid #e6e6e7;
		margin-right: 20px;
		margin-bottom: 20px;
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		text-align: center;
		cursor: pointer;
	}

	#report .yuChairFix .top-box .detLi {
		margin: 0
	}
</style>


<style lang="less" scoped>
	#report {
		.yuChairFix {
			position: relative; // height: 42px;
			// margin-bottom: 25px;
			margin-top: 10px; // min-width: 1550px;
			.line {
				float: left;
				width: 25px;
				line-height: 40px;
				text-align: center;
			}
			.detLi {
				// position: relative;
				cursor: pointer;
				margin: 0 20px;
				.tableListInp {
					height: 40px;
					color: #666666;
					border: #b3b3b3 solid 1px;
					cursor: pointer;
					.overdian {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						height: 39px;
						line-height: 40px;
						width: 200px;
						display: block;
						float: left;
						text-align: center;
						border-right: 1px #B3B3B3 solid;
					}
					div {
						width: 40px;
						height: 40px;
						position: relative;
						z-index: 5;
						i {
							height: 10px;
							width: 10px;
							position: absolute;
							top: 50%;
							left: 50%;
							margin-top: -5px;
							margin-left: -5px;
							border-top: 10px solid #b3b3b3;
							border-left: 5px solid transparent;
							border-right: 5px solid transparent;
							box-sizing: border-box;
						}
					}
				}
				.shopBox {
					left: -250px;
				}
				.formHead {
					right: 0;
				}
				.detDiv {
					display: inline-block;
					width: 300px;
					background: #45404b;
					position: absolute;
					top: 45px;
					right: 0;
					box-shadow: 3px 2px 10px #ccc;
					z-index: 5;
					width: 600px;
					top: 52px;
					.detI {
						width: 0;
						height: 0;
						line-height: 0;
						position: absolute;
						top: -10px;
						right: 30%;
						left: 400px;
						border-width: 10px;
						border-top: 0px;
						border-style: solid;
						border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
					}
					.detLiBtn {
						overflow: hidden;
						float: left;
						width: 100%;
						span {
							float: left;
							color: #fff;
							width: 50%;
							height: 40px;
							line-height: 40px;
							text-align: center;
						}
						.sure {
							background: #f8941f;
						}
					}
					.detH3 {
						line-height: 30px;
						color: #e6e6e7;
						text-align: center;
						text-align: left;
						max-height: 500px;
						overflow: auto;
						.all {
							display: inline-block;
							width: 100px;
							margin-left: 1px;
							margin-right: 20px;
							height: 40px;
							line-height: 40px;
							text-align: center;
							border: 1px solid #e6e6e7;
							margin-bottom: 5px;
							float: left;
						}
						.btn {
							span {
								display: inline-block;
								width: 100px;
								height: 40px;
								line-height: 40px;
								border: 1px solid #FF9800;
								margin-right: 20px;
								color: #FF9800;
								text-align: center;
							}
						}
					}
				}

			}
			.top-box {
				position: relative;
				margin-right: 10px;
				margin-bottom: 10px;
				.searchs,
				.gray {
					width: 90px;
					height: 40px;
					line-height: 40px;
				}
				.yellow,
				.out {
					width: 90px;
					height: 40px;
					line-height: 40px;
					position: absolute;
					top: -50px;
				}
				.back {
					width: 90px;
					height: 40px;
					line-height: 40px;
					position: absolute;
					top: -50px;
					left: -100px;
					color: #B3B3B3;
					border: 1px solid #B3B3B3;
				}
				.out {
					right: 0;
				}
				.wordSize {
					font-size: 16px;
				}
				.cala {
					height: 40px;
					color: #666666; // border-bottom: #b3b3b3 solid 1px;
					cursor: pointer;
					.data-box {
						width: 200px;
					}
					input {
						position: relative;
						background: none;
						z-index: 2;
						display: block;
						float: left;
						height: 41px;
						width: 158px;
						outline: none;
						border: 0;
					}
				}
				ul {
					width: 100%;
					margin: 0;
					position: absolute;
					top: 40px;
					left: 0;
					z-index: 10;
					background: #fff;
					max-height: 300px;
					border: 1px solid #ccc;
					overflow: auto;
					border-top: 0;
					li {
						text-align: center;
						height: 41px;
						border: 1px #ccc solid;
						background: #fff;
						cursor: pointer;
						border-right: 0 !important;
						border-left: 0 !important;
						border-bottom: 0 !important;
					}
				}
			}
		}
		.nav {
			// min-width: 1400px;
			.formType {
				margin-right: 10px;
				.typeTotal {
					display: inline-block;
					width: 100px;
					text-align: center;
					border: 1px solid #f8941f;
					height: 40px;
					line-height: 40px;
					cursor: pointer;
				}
				.typeOn {
					background: #f8941f;
					color: #fff;
				}
			}
			.light {
				margin-bottom: 20px;
				display: inline-block;
				.sel {
					display: inline-block;
					width: 135px;
					height: 40px;
					font-size: 16px;
					background: #f2f2f2;
					border-radius: 3px;
					text-align: center;
					line-height: 40px;
					cursor: pointer;
					margin-right: 10px;
					margin-bottom: 10px;
				}
				.on {
					background: #28a8e0;
					color: #fff;
				}
			}
			.selectName {
				display: inline-block;
				margin-bottom: 10px;
				span {
					font-size: 16px;
				}
			}
		}
	}
</style>