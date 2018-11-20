/* * @file * * 分类报表 * * @author zhengu.jiang */

<template>
	<div id="report-cate">
		<section class="yuChairFix clearfix">
			<!-- 时间类型选择 -->
			<section class="top-box fl">
				<span class="wordSize">时间类型：</span>
				<el-select v-model="selectedType">
					<el-option v-for="(item,i) in options" :key="i" :label="item" :value="i"></el-option>
				</el-select>
				<!--<selectBtn @emit="selectType" :sorts.sync="options" :name.sync="selectedName" class="select-btn"></selectBtn>-->
			</section>
			<section class="top-box fl" style="margin-right: 0">
				<section class="cala chairFix">
					<calendar :time="startTime" :type="selectedType" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</section>
			</section>
			<span class="line">-</span>
			<section class="top-box fl">
				<section class="cala chairFix">
					<calendar :time="endTime" :type="selectedType" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				</section>
			</section>
			<!--按时间段或交接班搜索-->
			<section class="top-box fl">
				<el-select v-model="selectedTypeOne">
					<el-option v-for="(item,i) in optionsOne" :key="i" :label="item" :value="i"></el-option>
				</el-select>
			</section>

			<!-- 时间段筛选 -->
			<section class="top-box fl" v-show="selectedTypeOne==0">
				<span class="wordSize">时间段筛选：</span>
				<!--<timehm @timeChoose="getTime" :start="start" :end="end" :index="index"></timehm>-->
				<el-time-picker style="width: 200px;" is-range :clearable="false" v-model="hourMinute" value-format="HH-mm-ss">
				</el-time-picker>
			</section>
			<!--交接班-->
			<section class="top-box fl" v-show="selectedTypeOne==1">
				<span class="wordSize">交接班筛选：</span>
				<el-select v-model="selectedTypeTwo">
					<el-option v-for="(item,i) in optionsTwo" :key="i" :label="item" :value="i"></el-option>
				</el-select>
			</section>

			<section style="display:inline-block">
				<!--品牌店铺选择-->
				<section class="top-box fl" style="height:42px">
					<!--<selectstore @returnShop="getShop" :reset="reset" :show="hide" :showNum=true></selectstore>-->
					<elShopList :shopIds="selShopid" @chooseShop="getShop"></elShopList>
				</section>
				<section class="top-box fl detLi " style="height: 55px;">
					<a @click="search" href="javascript:void(0);" class="blue searchs">搜索</a>
					<a @click="resetAll" href="javascript:void(0);" class="gray">重置</a>
				</section>
			</section>
		</section>
		<!-- <section class="nav">
			<div class="selectName" v-if="shopName != '请选择店铺' ">
				<span style="font-size: 16px;line-height:20px">选择店铺：{{shopName}}</span>
				<i></i>
			</div>
		</section> -->
		<!-- <category v-if="orderList.length > 0 && industry != 1 && loading" :exportIndex="exportIndex" :shopList="shopList" :orderList="orderList" :loading="loading"
			:selShopid="selShopid" :shopName="shopName" :selectedType="selectedType"></category> -->
		<categoryRetail v-if="orderList.length > 0 && loading" :taskId="taskId" :chooseShopList="chooseShopList.filter(v=>v.selected)" :shopList="shopList" :orderList="orderList" :loading="loading" :selShopid="selShopid" :shopName="shopName" :selectedType="selectedType"></categoryRetail>
		<section v-if="loading && orderList.length == 0" style="border: 1px solid #ccc;height: 200px;text-align: center;line-height: 200px;font-size: 24px;color: #B3B3B3;margin-top: 20px;">
			-暂无数据-
		</section>
		<!-- <section v-show="!loading" style="width: 128px;margin: 200px auto;">
			<img src="../../res/images/preloader.gif" />
		</section> -->
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

			optionsOne: ['按时间段', '按交接班'],
			selectedTypeOne: 0,
			optionsTwo: ['早班', '中班', '晚班', '日常班'],
			selectedTypeTwo: 0,

			hourMinute: ['00-00-00', '23-59-59'], //时分
			index: 0, //用于时间段筛选的重置

			shopList: [], //所有店铺列表
			selects: [], //选中的店铺
			shopName: '请选择店铺', //选中的店铺名称
			//				showShoplist: false, //是否展开店铺列表
			selShopid: [], //传给后台的 选中的店铺id
			chooseShopList: [], //选择的门店列表
			buttonList: {
				flag: 0,
				list: [
					{
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
					}
				]
			},
			taskId: '', //轮询
			orderList: [], //数据列表
			selOrderList: [], //保存的原始表格数据
			selTotalList: [], //保存的原始总计
			loading: true,
			repeat: false, //用于判断查询是否结束
			list: [],
			ChartShopName: [], //选中的店铺
			industry: '', //判断是否为零售店  1为零售 否则为餐饮
			taskCountTotal: 1, //本次查询总任务数
			taskCount: 0, //剩余任务数
			totalCount: 1 //用于进度条
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		// this.industry = userData.currentShop.industry; //当industry为1时 为零售店，图表不显示
		document.addEventListener('click', this.show);
		this.getShopList();
	},
	methods: {
		//			show(){
		//				this.showShoplist = false;
		//				this.formHead = false;
		//			},
		//获取品牌下的店铺
		async getShopList() {
			let res = await http.getShopList({
				data: {
					shopId: this.shopId
				}
			});
			this.shopList = res;
		},
		//收银分析查询数据
		async classifiedReport(timeBetween) {
			let objData = {};
			objData.shopId = this.shopId;
			objData.timeType = this.selectedType + 1;
			objData.startTime =
				this.selectedType === 0 ? this.startTime : this.timeStart;
			objData.endTime =
				this.selectedType === 0 ? this.endTime : this.timeEnd;
			objData.reportType = this.buttonList.flag + 1;
			objData.shopIds = this.selShopid.join();
			objData.type = 20;
			this.selectedTypeOne == 0
				? (objData.timeBetween = timeBetween)
				: (objData.shift = this.selectedTypeTwo + 1);

			http
				.classifiedReport({
					data: objData,
					//					data: {
					//						shopId: this.shopId,
					//						timeType: this.selectedType + 1,
					//						startTime: this.selectedType === 0 ? this.startTime : this.timeStart,
					//						endTime: this.selectedType === 0 ? this.endTime : this.timeEnd,
					//						timeBetween: timeBetween,
					//						reportType: this.buttonList.flag + 1,
					//						shopIds: this.selShopid.join(),
					//						// type: this.industry == 1 ? 20 : 6
					//						type: 20 //后台需要 写死
					//					},
					timeout: 60000
				})
				.then(data => {
					this.taskId = data.taskId;
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
			http
				.taskInfo({
					data: {
						shopId: this.shopId,
						taskId: data.taskId
					}
				})
				.then(res => {
					this.taskCount = res.taskCount;
					this.totalCount += 3; //绘制报表时用于制作进度条
					if (res.status == 3) {
						clearInterval(window.timer);
						this.repeat = false;
						// if(this.industry == 1){
						// 	this.getCategoryData(data.taskId);
						// }else{
						// 	this.getAnalysis(data.taskId);
						// }
						this.getCategoryData(data.taskId);
					} else if (res.status == 2) {
						clearInterval(window.timer);
						this.repeat = false;
						this.loading = true;
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '查询失败，请重试'
						});
					}
				});
		},
		// 轮询结束获取数据
		async getAnalysis(taskId) {
			http
				.getAnalysis({
					data: {
						shopId: this.shopId,
						taskId: taskId
					},
					timeout: 60000
				})
				.then(data => {
					this.orderList = utils.deepCopy(data);
					this.list = utils.deepCopy(data);
					this.loading = true;
				});
		},
		//零售店获取数据
		async getCategoryData(taskId) {
			http
				.getCategoryData({
					data: {
						shopId: this.shopId,
						taskId: taskId
					},
					timeout: 60000
				})
				.then(data => {
					this.orderList = utils.deepCopy(data);
					this.list = utils.deepCopy(data);
					this.loading = true;
				});
		},
		//			fadeAway() {
		//				this.hide++;
		//			},
		//			selectType(index) {
		//				console.log(index);
		//				this.selectedType = index;
		//				// this.startTimeChange();
		//				// this.endTimeChange();
		//			},
		startTimeChange(time, timer) {
			//开始时间
			this.startTime = time;
			if (this.selectedType == 2) {
				// 月报表时间
				this.timeStart =
					new Date(time).getFullYear() +
					'年' +
					(new Date(time).getMonth() + 1);
			} else {
				//周、季度、年报表时间
				this.timeStart = timer;
				console.log(timer);
				this.timeStart = this.timeStart.substring(
					0,
					this.timeStart.length - 1
				);
				if (this.selectedType == 3) {
					this.timeStart = this.timeStart.substring(
						0,
						this.timeStart.length - 1
					);
				}
				this.timeStart = this.timeStart.replace(/\s/g, '');
			}
			console.log(this.timeStart);
		},
		endTimeChange(time, timer) {
			//结束时间
			this.endTime = time;
			if (this.selectedType == 2) {
				// 月报表时间
				this.timeEnd =
					new Date(time).getFullYear() +
					'年' +
					(new Date(time).getMonth() + 1);
			} else {
				//周、季度、年报表时间
				this.timeEnd = timer;
				this.timeEnd = this.timeEnd.substring(
					0,
					this.timeEnd.length - 1
				);
				if (this.selectedType == 3) {
					this.timeEnd = this.timeEnd.substring(
						0,
						this.timeEnd.length - 1
					);
				}
				this.timeEnd = this.timeEnd.replace(/\s/g, '');
			}
			console.log(this.timeEnd);
		},
		//获取时间段时间
		//			getTime(time) {
		//				this.start.hour = time.start.hour;
		//				this.start.minute = time.start.minute;
		//				this.end.hour = time.end.hour;
		//				this.end.minute = time.end.minute;
		//			},
		//根据店铺id匹配店铺名
		getShopname: function() {
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
		//			getShop(id, name, shopList) {
		//				console.log(shopList);
		//				console.log(this.shopList);
		//				this.chooseShopList = shopList;
		//				if (id || name) {
		//					this.selShopid = id;
		//					this.shopName = name;
		//				}
		//				this.getShopname();
		//			},
		//选择店铺返回
		getShop(res) {
			this.shopName = '';
			let arr = [];
			let arrOne = utils.deepCopy(this.shopList);
			for (let i = 0; i < arrOne.length; i++) {
				if (res.includes(arrOne[i].id)) {
					this.shopName = this.shopName + arrOne[i].shopName + '、 ';
					arrOne[i].selected = true;
					arr.push(arrOne[i]);
				}
			}
			this.chooseShopList = arr;
			console.log(arr);
			this.selShopid = res;
			this.getShopname();
		},
		//查询
		search() {
			if (this.endTime < this.startTime) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '结束时间不能小于开始时间'
				});
				return false;
			}
			if (this.repeat) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content:
						'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
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
			this.loading = false;
			this.repeat = true;
			this.taskCountTotal = 1;
			this.taskCount = 0;
			switch (this.selectedType) {
				case 0:
					this.startTime = utils.format(
						new Date(this.startTime),
						'yyyy-MM-dd'
					);
					this.endTime = utils.format(
						new Date(this.endTime),
						'yyyy-MM-dd'
					);
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
			//				let timeBetween = this.start.hour + ':' + this.start.minute + '-' + this.end.hour + ':' + this.end.minute;
			let timeBetween =
				this.hourMinute[0].substring(0, 2) +
				':' +
				this.hourMinute[0].substring(3, 5) +
				':' +
				this.hourMinute[0].substring(6, 8) +
				'-' +
				this.hourMinute[1].substring(0, 2) +
				':' +
				this.hourMinute[1].substring(3, 5)+
				':' +
				this.hourMinute[1].substring(6, 8) ;
			this.classifiedReport(timeBetween);
			//				this.typeFlag = this.selectedType;
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
			//				this.reset++;
			this.selects = [];
			this.selectedType = 0;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(0, 0, 0, 0);
			this.index++;
			//				this.start = {
			//					hour: '00',
			//					minute: '00'
			//				};
			//				this.end = {
			//					hour: '23',
			//					minute: '59'
			//				};
			this.hourMinute = ['00-00-00', '23-59-59']; //时分
			this.selShopid = [];
		},
		//展开表头设置
		//			showHead() {
		//				this.formHead = !this.formHead;
		//				this.headList = utils.deepCopy(this.selHead);
		//			},
		//表格类型选择
		light(index) {
			this.buttonList.flag = index;
			this.search();
		}
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		timehm: () =>
			import(/*webpackChunkName: 'time'*/ 'src/components/time'),
		mulSelect: () =>
			import(/*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		// category: () =>
		// 	import ( /*webpackChunkName: 'category_form'*/ './category_form'), //餐饮数据
		categoryRetail: () =>
			import(/*webpackChunkName: 'category_form'*/ './category_form_retail'), //零售数据
		//			selectstore: () =>
		//				import ( /*webpackChunkName: 'select_shop'*/ './select_shop'),
		loading: () =>
			import(/*webpackChunkName: 'category_loading'*/ './category_loading'),
		formShop: () => import(/*webpackChunkName: 'form_shop'*/ './form_shop'),
		elShopList: () =>
			import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
	},
	destroyed() {
		clearInterval(window.timer);
	}
};
</script>

<style lang="less" scoped>
#report-cate {
	.yuChairFix {
		position: relative; // height: 42px;
		// margin-bottom: 25px;
		// min-width: 1550px;
		.line {
			float: left;
			width: 25px;
			line-height: 40px;
			text-align: center;
		}
		.detLi {
			position: relative;
			cursor: pointer; // margin:0 20px;
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
					border-right: 1px #b3b3b3 solid;
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
				padding: 10px;
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
					border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
				}
				.detH3 {
					line-height: 30px;
					color: #e6e6e7;
					text-align: center;
					text-align: left;
					max-height: 500px;
					overflow: auto;
					.all {
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
							border: 1px solid #ff9800;
							margin-right: 20px;
							color: #ff9800;
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
				color: #b3b3b3;
				border: 1px solid #b3b3b3;
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
		.totalName {
			display: inline-block;
			width: 100px;
			height: 35px;
			line-height: 35px;
			margin-right: 10px;
			text-align: center;
			background: #f2f2f2;
			border-radius: 5px;
			vertical-align: middle;
			text-align: center;
		}
		.shopName {
			display: inline-block;
			width: 200px;
			height: 35px;
			background: #f2f2f2;
			border-radius: 5px;
			position: relative;
			vertical-align: middle;
			span {
				line-height: 35px;
				display: inline-block;
				height: 35px;
				width: 160px;
				padding-left: 10px;
			}
			i {
				position: absolute;
				right: 15px;
				top: 13px;
				height: 10px;
				width: 10px;
				display: inline-block;
				border-top: 10px solid #45404b;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				box-sizing: border-box;
			}
		}
		.selected {
			background: #29abe2;
			color: #fff;
		}
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