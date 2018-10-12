<!--
		**废单统计
		*
		* 胡江
		* *
		*
-->
<template>
	<div id="delete">
		<template v-if="!detailShow">
			<!--搜索条件-->
			<div class="filter">
				<div class="block">
					<template v-if="showStep == 1">
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="timeObj.startTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
						<span class="input-word">-</span>
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="timeObj.endTime" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
					</template>
					<template v-if="showStep == 3 && !isBrand">
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="timeObj.startTimeStore" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
						<span class="input-word">-</span>
						<el-date-picker style="width:150px;cursor: pointer" :clearable="false" v-model="timeObj.endTimeStore" type="date" format="yyyy-MM-dd" value-format="timestamp">
						</el-date-picker>
					</template>
				</div>
				<!--区域 桌台-->
				<div class="block">
					<template v-if="showStep == 3">
						<el-select v-model="areaId" @change="areaSelect" style="width:150px;" placeholder="请选择区域">
							<el-option v-for="(item,i) in areas" :key="i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
						<el-select v-model="tableId" @change="tableSelect" style="width:150px;" placeholder="请选择桌台">
							<el-option v-for="(item,i) in table" :key="i" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</template>
					<div class="input-check" v-if="showStep != 2">
						<i @click="timeCheck" :class="{active:this.openTime == 1}"></i>
						按营业时间
					</div>
					<!--根据订单号查询详情-->
					<div v-if="showStep == 3" style="display: inline-block">
						<el-input v-model="orderInputValue" clearable placeholder="请输入订单号" style="width:200px;">
							<el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
						</el-input>
					</div>
				</div>
				<div class="block">
					<!--选择店铺按钮-->
					<div class="align" v-if="isBrand && showStep == 1">
						<elShopList @chooseShop="getDrop" :shopIds="shopList"></elShopList>
					</div>
					<!--搜索 重置-->
					<div class="align" v-if="showStep != 2">
						<el-button v-on:click="search()" type="primary">搜索</el-button>
						<el-button v-on:click="reset()" type="info">重置</el-button>
					</div>
				</div>
				<!--显示已选中的店铺-->
				<div class="store-show" v-if="isBrand && showStep == 1 || showStep == 2">
					<span v-if="showStep == 2">{{formatTime(timeObj.startTime)}} ~ {{formatTime(timeObj.endTime)}}</span>
				</div>
			</div>
			<!--数据列表-->
			<div class="main">
				<deleteStore :store="orderStoreList" :order="deleteData" :otherData="orderStoreSend" :step="showStep" :loading="loading" @emit="getStep"></deleteStore>
			</div>
		</template>
		<!--废单详情-->
		<orderDetail :detail="detail" :isDelete="true" v-if="detailShow" @detailShow="getDetailShow"></orderDetail>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			deleteData: '', //废单数据
			orderStoreList: '', //品牌-查询后有订单的店铺列表
			orderStoreSend: {}, //子模块需要的数据
			total: { orderNum: 0, totalPrice: 0, totalDay: 1 },

			areas: [], //展示的区域
			table: [], //展示的桌台
			areasList: [], //全部区域
			tableList: [], //全部桌台
			areaId: '',
			tableId: '',

			orderInputValue: '', //要查询的订单

			shopList: [], //店铺列表
			brandId: '', //品牌id
			shopId: '', //单店id
			shopIds: '', //品牌下店铺id集合
			isBrand: '', //是否品牌
			storeName: '', //选中店铺名称
			storeListShow: '',
			allSelected: true, //选中全部
			timeObj: {
				startTime: '', //开始时间-品牌
				endTime: '', //结束时间-品牌
				startTimeStore: '', //开始时间-单店
				endTimeStore: '' //结束时间-单店
			},

			page: 1, //当前页
			pageNum: 0, //总页数
			pageShow: 10, //每页显示几条

			openTime: 1, //是否按营业时间统计
			detail: null, //详情页数据
			detailShow: false, //详情页显示隐藏
			showStep: '', //品牌-显示步骤 第一步：1废单店铺列表 第二步：2多天订单 第三步：3废单列表(跟单店一样)
			userData: '',
			userShopList: '',
			userShopIdStr: '',
			repeat: true, //防止重复轮询
			taskId: '', //传给后台请求数据的一个字段
			timerId: '', //计时器id
			loading: false, //加载动画
			dropName: '请选择店铺',
			shopNameB: [] //已选择的店铺名称
		};
	},
	created() {
		this.userData = storage.session('userShop');
		let shopIdArr = [],
			shopListArr = [];
		if (this.userData.currentShop.ischain == '3') {
			this.userShopList = storage.session('shopList');
			this.userShopList.forEach((item, index) => {
				shopIdArr[index] = item.id;
				let obj = {
					id: item.id,
					name: item.shopName
				};
				shopListArr.push(obj);
			});
			this.userShopIdStr = shopIdArr.join(','); //品牌下店铺id拼接
			this.userShopList = shopListArr;
		}
	},
	mounted() {
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,

		this.brandId = this.userData.currentShop.id; //品牌id,单店下用不到这个字段
		this.shopId = this.userData.currentShop.id; //单店id;用于单店查询 和 品牌下多店铺查询
		this.shopIds = this.userShopIdStr;
		for (let item of this.userShopList) {
			//店铺默认全部选中
			item.selected = true;
		}

		if (this.isBrand) {
			console.log(this.userShopList);
			this.shopNameB = utils.deepCopy(this.userShopList);
			this.shopList = this.userShopList.map(v => {
				return v.id;
			});
			console.log(this.shopList);
		}

		this.storeName =
			this.userShopList.length > 0
				? this.userShopList[0].name
				: '选择店铺'; //选中店铺按钮 显示,

		this.resetDate(); //设置当前时间
		if (this.isBrand == 0) {
			//非品牌自动获取区域，桌台列表
			this.showStep = 3; //直接第三步
			this.getCondition();
		} else {
			//品牌下
			this.showStep = 1; //默认开始第一步
		}
		this.search();
	},
	watch: {
		showStep: 'initBtn'
	},
	destroyed() {
		storage.session('deleteShopId', null);
		storage.session('dayData', null);
		storage.session('deleteSingleTime', null);
		Timer.clear(this.timerId);
	},
	methods: {
		initBtn() {
			let arr = [];
			if (this.showStep == 3) {
				arr.push({
					name: '导出',
					className: ['fd-yellow'],
					fn: () => {
						this.exportFile();
					}
				});
			}
			if (this.showStep != 1 && this.isBrand) {
				arr.push({
					name: '返回',
					className: ['fd-blue'],
					fn: () => {
						this.back();
					}
				});
			}
			this.$store.commit('setPageTools', arr);
		},
		async getData() {
			if (!this.validate()) return;
			let endTimeStore = new Date(this.timeObj.endTimeStore).setHours(
				23,
				59,
				59,
				0
			);
			let data = await http.getDelOrder({
				data: {
					trueShopId: this.shopId,
					startTime: parseInt(this.timeObj.startTimeStore / 1000),
					endTime: parseInt(endTimeStore / 1000),
					areaId: this.areaId,
					tableId: this.tableId,
					page: this.page,
					num: this.pageShow,
					isOpenTime: this.openTime
				}
			});
			//列表赋值
			this.deleteData = data;
			//分页
			this.pageNum = data.pageNum;
		},
		//		async getCondition() {
		//			//获取桌台-区域列表
		//			let data = await http.getCondition({
		//				data: {
		//					trueShopId: this.shopId
		//				}
		//			});
		//			console.log(data);
		//			let areaArr = [],
		//				tableArr = [];
		//			for (let item of data.areaList) {
		//				areaArr.push(item.name);
		//			}
		//			for (let item of data.tableList) {
		//				tableArr.push(item.name);
		//			}
		//			areaArr.unshift('全部区域'), tableArr.unshift('全部桌台');
		//			this.areas = areaArr;
		//			this.areasList = data.areaList;
		//			this.table = tableArr;
		//			this.tableList = data.tableList;
		//
		//			console.log(areaArr)
		//			console.log(this.areasList)
		//
		//			console.log(tableArr)
		//		},
		async getCondition() {
			//			//获取桌台-区域列表
			let data = await http.getCondition({
				data: {
					trueShopId: this.shopId
				}
			});
			let areaArr = data.areaList,
				tableArr = data.tableList;
			areaArr.unshift({ id: '', name: '全部区域' });
			tableArr.unshift({ id: '', name: '全部桌台' });
			this.areas = areaArr;
			this.table = tableArr;
			this.areasList = utils.deepCopy(areaArr);
			this.tableList = utils.deepCopy(tableArr);

			console.log(areaArr);
			console.log(tableArr);
		},
		//区域选择
		//		areaSelect(index) {
		//			this.areaIndex = index;
		//			this.areaId =
		//				this.areaIndex > 0
		//					? this.areasList[this.areaIndex - 1].id - 0
		//					: '';
		//			this.getData();
		//		},
		areaSelect() {
			console.log(this.areaId);
			this.tableId = '';
			if (this.areaId == '') {
				this.table = utils.deepCopy(this.tableList);
			} else {
				this.table = this.tableList.filter(v => {
					return v.areaId == this.areaId;
				});
			}
			this.getData();
		},
		//桌台选择
		//		tableSelect(index) {
		//			this.tableIndex = index;
		//			this.tableId =
		//				this.tableIndex > 0
		//					? this.tableList[this.tableIndex - 1].id - 0
		//					: '';
		//			this.getData();
		//		},
		tableSelect() {
			console.log(this.tableId);
			this.getData();
		},

		//品牌-获取店铺废单列表
		async getStoreOrder() {
			let endTime = new Date(this.timeObj.endTime).setHours(
				23,
				59,
				59,
				0
			);
			if (!this.repeat) {
				//轮询未结束 防止重复轮询
				this.$store.commit('setWin', {
					title: '提示信息',
					content:
						'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
				});
				return;
			}
			if (!this.validate()) return;
			http
				.OrderReport({
					data: {
						type: 2,
						timeType: 1,
						startTime: parseInt(this.timeObj.startTime / 1000),
						endTime: parseInt(endTime / 1000),
						isOpenTime: this.openTime,
						shopIds: this.shopIds,
						shopId: this.brandId //品牌id
					}
				})
				.then(data => {
					this.taskId = data.taskId;
					this.repeat = false; //禁止重复轮询
					this.loading = true; //开始加载动画
					this.timerId = Timer.add(
						() => {
							//轮询请求taskId
							http
								.taskInfo({
									data: {
										shopId: this.brandId,
										taskId: this.taskId
									}
								})
								.then(data => {
									if (data.status == 3) {
										//轮询完成 获取数据
										Timer.clear(this.timerId);
										this.repeat = true;
										http
											.ReportGet({
												data: {
													shopId: this.brandId,
													taskId: this.taskId
												}
											})
											.then(data => {
												this.loading = false; //停止加载动画
												this.orderStoreList = data;
												//进入多天需要的请求参数
												this.orderStoreSend = {
													startTime: this.timeObj
														.startTime,
													endTime: endTime,
													openTime: this.openTime,
													shopId: this.brandId //品牌id
												};
											});
									} else if (data.status == 2) {
										//失败
										Timer.clear(this.timerId);
										this.loading = false; //停止加载动画
										this.repeat = true; //轮询完成 可继续查询
										//失败
										this.$store.commit('setWin', {
											title: '提示信息',
											content: '请求失败，请重试！'
										});
									}
								});
						},
						1000,
						60,
						false,
						() => {
							Timer.clear(this.timerId); //轮询超时
							this.repeat = true; //可重新查询
							this.loading = false; //停止加载动画
						}
					);
				});
		},
		//导出订单
		async exportFile() {
			if (!this.deleteData) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '没有订单可以导出'
				});
			} else {
				let endTimeStore = new Date(this.timeObj.endTimeStore).setHours(
					23,
					59,
					59,
					0
				);
				await http.exportDelOrder({
					data: {
						trueShopId: this.shopId,
						startTime: parseInt(this.timeObj.startTimeStore / 1000),
						endTime: parseInt(endTimeStore / 1000),
						areaId: this.areaId,
						tableId: this.tableId,
						isOpenTime: this.openTime
					}
				});
			}
		},
		//获取废单详情
		async getDetail(oid) {
			let data = await http.deleteBillDelite({
				data: {
					trueShopId: this.shopId,
					oid: oid
				}
			});
			this.detailShow = true; //显示详情
			this.detail = data;
		},
		//重置时间为当前时间
		resetDate() {
			for (let i in this.timeObj) {
				this.timeObj[i] = new Date().setHours(0, 0, 0, 0);
			}
		},
		//返回上一步
		back() {
			this.showStep = this.showStep - 1;
			if (this.showStep == 3) {
				//回到多商品列表时 重新请求数据
				this.page = 1;
				this.getData();
			}
		},
		search() {
			if (this.isBrand == 1) {
				if (this.showStep == 3) this.getData();
				else this.getStoreOrder();
			} else {
				this.getData();
			}
		},
		getStep(stepObj) {
			console.log(stepObj);
			//获取列表模块发出的步骤step
			if (stepObj.step > 0) {
				this.showStep = stepObj.step;
				if (this.showStep == 3) {
					this.shopId = stepObj.id ? stepObj.id : this.shopId;
					if (stepObj.time) {
						//品牌-从多天进入单天时
						this.timeObj.startTimeStore = stepObj.time;
						this.timeObj.endTimeStore = stepObj.time;
					}
					if (stepObj.page) {
						//这里为翻页 不需要重新获取桌台、区域列表
						this.page = stepObj.page;
						this.pageShow = stepObj.pageShow;
						this.getData();
					} else {
						//非翻页
						this.page = 1;
						this.pageShow = stepObj.pageShow;
						this.getCondition();
						this.getData();
					}
				}
			} else {
				this.getDetail(stepObj.id); //点击订单号 跳转详情
			}
		},
		setIsOneStore(selectNum) {
			this.isOneStore = selectNum == 1 ? true : false; //判断是否只选择一家店铺 == 1 ? true : false; //判断是否只选择一家店铺
		},
		//选店返回
		getDrop(arr) {
			console.log(arr);
			this.shopList = arr;
			this.shopIds = this.shopList.join(',');
			this.setIsOneStore(this.shopList.length);
			this.shopNameB = utils.deepCopy(this.userShopList);
			for (let i = 0; i < this.shopNameB.length; i++) {
				if (!this.shopList.includes(this.shopNameB[i].id)) {
					this.shopNameB.splice(i, 1);
					i--;
				}
			}
			console.log(this.shopNameB);
		},
		//根据订单号搜索 进入订单详情
		searchOrder() {
			let orderId = this.orderInputValue;
			if (orderId == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '订单号不能为空'
				});
			} else if (/[^\d]/.test(orderId)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '订单号只能为数字'
				});
			} else {
				this.getDetail(orderId);
			}
			this.orderInputValue = '';
		},
		toDetail() {
			//点击列表订单号 进入详情页
			let target = event.target;
			if (target.className == 'light') {
				let oid = target.textContent;
				this.getDetail(oid);
			}
		},
		getDetailShow(detailShow) {
			//获取详情页派发的事件 隐藏详情页
			this.detailShow = detailShow;
			this.initBtn();
		},
		//重置筛选
		reset() {
			let current = new Date().setHours(0, 0, 0, 0);
			if (this.showStep == 3) {
				this.openTime = 1;
				this.areaId = '';
				this.tableId = '';
				if (!this.isBrand) {
					//非品牌
					this.timeObj.startTimeStore = current;
					this.timeObj.endTimeStore = current;
				}
			} else {
				this.timeObj.startTime = current;
				this.timeObj.endTime = current;
				if (this.isBrand) {
					this.shopList = this.userShopList.map(v => {
						return v.id;
					});
					this.shopIds = this.shopList.join(',');
					this.shopNameB = utils.deepCopy(this.userShopList);
					this.setIsOneStore(this.shopList.length);
				}
			}
			this.search();
		},
		timeCheck() {
			//按营业时间统计
			this.openTime = this.openTime == 0 ? 1 : 0;
		},
		//开始时间
		startTimeChange(time) {
			if (this.showStep == 3) {
				//单店模式
				this.timeObj.startTimeStore = time;
			} else {
				this.timeObj.startTime = time;
			}
		},
		//结束时间
		endTimeChange(time) {
			if (this.showStep == 3) {
				//单店模式
				this.timeObj.endTimeStore = time;
			} else {
				this.timeObj.endTime = time;
			}
		},
		//格式化时间戳
		formatTime(time) {
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		//日期验证
		validate() {
			let isPass = true;
			const oneDay = 1000 * 3600 * 24; //一天的时间长度
			const threeMonth = 31 * 3 * oneDay; //三个月的时间戳长度
			let startTime, endTime;
			if (this.showStep == 3) {
				startTime = this.timeObj.startTimeStore;
				endTime = this.timeObj.endTimeStore;
			} else {
				startTime = this.timeObj.startTime;
				endTime = this.timeObj.endTime;
			}
			if (startTime / oneDay > endTime / oneDay) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始时间不能大于结束时间'
				});
				isPass = false;
			} else if (endTime - startTime >= threeMonth) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '最大只能查询三个月时间'
				});
				isPass = false;
			}
			if (this.isBrand && this.shopIds == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '没有可选店铺'
				});
				isPass = false;
			}
			return isPass;
		}
	},
	components: {
		orderDetail: () =>
			import(/*webpackChunkName: "order_detail"*/ './delete_detail'),
		deleteStore: () =>
			import(/*webpackChunkName: "delete_store"*/ './delete_store'),
		elShopList: () =>
			import(/*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	}
};
</script>

<style>
#delete .filter .block .el-button + .el-button {
	margin-left: 0;
}
</style>

<style lang="less" scoped>
#delete {
	.filter {
		position: relative;
		margin-bottom: 10px;
		.block {
			display: inline-block;
			.input-word {
				padding: 0 2px;
			}
			.input-check {
				.align;
				font-size: 16px;
				color: #333;
				i {
					height: 20px;
					width: 20px;
					border-radius: 2px;
					color: #444;
					cursor: pointer;
					display: inline-block;
					border: 1px solid #bbb;
					vertical-align: middle;
					margin-top: -3px;
				}
				i.active {
					background: url(../../res/icon/white_select.png) #e1bb4a
						center no-repeat;
					border: 1px solid #e1bb4a;
				}
			}
		}
		.store-show {
			display: block;
			overflow: hidden;
			line-height: 20px;
			span {
				color: #333;
				font-weight: bold;
			}
		}
	}
	.main {
		margin-top: 15px;
	}
	.align {
		display: inline-block;
		vertical-align: middle;
	}
}
</style>