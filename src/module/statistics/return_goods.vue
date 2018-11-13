<!--退品统计-->
<template>
	<div class="delete">
		<template v-if="!detailShow">
			<div class="filter">
				<template v-if="showStep != 5">
					<div class="block">
						<template v-if="showStep == 1">
							<!--日期选择和搜索框-->
							<el-date-picker :clearable="false" v-model="timeObj.startTime" type="datetime" placeholder="选择日期"></el-date-picker>
							<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
							<el-date-picker :clearable="false" v-model="timeObj.endTime" type="datetime" placeholder="选择日期"></el-date-picker>
						</template>
						<template v-if="!isBrand && showStep == 3 || !isBrand && showStep == 4">
							<el-date-picker :clearable="false" v-model="timeObj.startTimeStore" type="datetime" placeholder="选择日期"></el-date-picker>
							<span style="width: 25px;line-height: 40px;text-align: center;">至</span>
							<el-date-picker :clearable="false" v-model="timeObj.endTimeStore" type="datetime" placeholder="选择日期"></el-date-picker>
						</template>
						<div class="input-check select-ban" v-if="showStep != 2">
							<i @click="timeCheck" :class="{active:this.openTime == 1}"></i>
							按营业时间
						</div>
					</div>
					<div class="block">
						<!--区域 桌台-->
						<template v-if="showStep == 3||showStep == 4">
							<el-select v-model="areaIndex" @change="areaSelect" placeholder="请选择区域" style="width:150px;">
								<el-option v-for="(item,index) in areas" :key="index" :label="item" :value="index"></el-option>
							</el-select>
							<el-select v-model="tableIndex" @change="tableSelect" placeholder="请选择桌台" style="width:150px;">
								<el-option v-for="(item,index) in table" :key="index" :label="item" :value="index"></el-option>
							</el-select>
							<el-select v-model="reasonIndex" @change="reasonSelect" placeholder="请选择区域" style="width:150px;">
								<el-option v-for="(item,index) in reasonList" :key="index" :label="item.reasonName" :value="index"></el-option>
							</el-select>
						</template>
						<el-input v-if="showStep == 4" placeholder="请输入订单号" @change="searchOrder" maxlength="18" v-model="orderInputValue" clearable class="input-with-select" style="width:200px;margin:0 10px;">
							<el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
						</el-input>
					</div>
					<div class="block">
						<!--选择店铺按钮-->
						<elShopList v-if="isBrand && showStep == 1" @chooseShop="getDrop" :shopIds="shopList"></elShopList>
						<!--搜索 重置-->
						<div v-if="showStep != 2" style="display:inline-block;">
							<el-button @click="search" type="primary" icon="el-icon-search">搜索</el-button>
							<el-button @click="reset" type="info" icon="el-icon-search">重置</el-button>
						</div>
					</div>
					<!--显示已选中的店铺-->
					<div class="store-show" v-if="isBrand && showStep == 1 || showStep == 2">
						<i>已选择店铺：</i>
						<span v-for="(item,index) in shopNameB" :key="index">{{item.name}}，</span>
						<span class="time-span" v-if="showStep == 2">{{formatTime(timeObj.startTime)}} ~ {{formatTime(timeObj.endTime)}}</span>
					</div>
				</template>
			</div>
			<div class="main">
				<!--店铺列表-->
				<returnStore :store="orderStoreList" :order="goodsData" :otherData="orderStoreSend" :step="showStep" :loading="loading" @emit="getStep"></returnStore>
			</div>
		</template>
		<!--退品详情-->
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
			goodsData: '', //多商品退品
			deleteData: '', //退品数据
			orderStoreList: '', //品牌-查询后有订单的店铺列表
			orderStoreSend: { store: {}, brand: {} }, //子模块需要的数据
			isOneDay: false,
			areas: [],
			table: [],
			reasonList: [],
			areaIndex: 0,
			tableIndex: 0,
			reasonIndex: 0,
			areasList: [],
			tableList: [],
			areaId: '',
			tableId: '',
			reasonId: '',
			areasDefault: '全部区域',
			tableDefault: '全部桌台',
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
			orderInputValue: '', //要查询的订单
			detail: null, //详情页数据
			detailShow: false, //详情页显示隐藏
			showStep: '', //品牌-显示步骤 第一步：1退品店铺列表 第二步：2多天订单 第三步：3 4退品列表(跟单店一样)
			userData: '',
			userShopList: '',
			userShopIdStr: '',
			repeat: true, //防止重复轮询
			taskId: '', //传给后台请求数据的一个字段
			timerId: '', //计时器id
			loading: false, //加载动画
			goodsName: '', //导出用
			gid: '', //导出用
			packageId: '', //导出用
			dropName: '请选择店铺',
			shopNameB: [] //已选择的店铺名称
		};
	},
	watch: {
		showStep: 'initBtn'
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		orderDetail: () =>
			import(/*webpackChunkName: "order_detail"*/ './delete_detail'),
		returnStore: () =>
			import(/*webpackChunkName: "return_goods_store"*/ './return_goods_store'),
		selectStore: () =>
			import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		elShopList: () =>
			import(/*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
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
		for (let i in this.userShopList) {
			//店铺默认全部选中
			this.userShopList[i].selected = true;
		}

		if (this.isBrand) {
			this.shopNameB = utils.deepCopy(this.userShopList);
			this.shopList = this.userShopList.map(v => {
				return v.id;
			});
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
	destroyed() {
		//离开页面时 清除缓存数据
		storage.session('deleteShopId', null);
		storage.session('dayData', null);
		storage.session('orderListCache', null);
		storage.session('deleteSingleTime', null);
		storage.session('moreReturnCache', null);
		Timer.clear(this.timerId);
	},
	methods: {
		initBtn() {
			let arr = [];
			if (
				(this.isBrand && this.showStep != 1) ||
				(!this.isBrand && this.showStep != 3)
			) {
				arr.push({
					name: '返回',
					className: 'info',
					type: '4',
					fn: () => {
						this.back();
					}
				});
			}
			if (this.showStep == 3 || this.showStep == 4) {
				arr.push({
					name: '导出',
					type: '4',
					className: 'primary',
					fn: () => {
						this.exportMethods();
					}
				});
			}
			this.$store.commit('setPageTools', arr);
		},
		async getGoods() {
			//获取多商品退品列表
			if (!this.validate()) return;
			let endTimeStore = new Date(this.timeObj.endTimeStore).setHours(
				23,
				59,
				59,
				0
			);
			let data = await http.moreReturnByName({
				data: {
					trueShopId: this.shopId,
					startTime: parseInt(this.timeObj.startTimeStore / 1000),
					endTime: parseInt(endTimeStore / 1000),
					areaId: this.areaId,
					tableId: this.tableId,
					reasonId: this.reasonId,
					page: this.page,
					num: this.pageShow,
					isOpenTime: this.openTime
				}
			});
			//列表赋值
			storage.session('moreReturnCache', data);
			let obj = {
				startTime: this.timeObj.startTimeStore,
				endTime: this.timeObj.endTimeStore,
				areaId: this.areaId,
				tableId: this.tableId,
				reasonId: this.reasonId,
				openTime: this.openTime,
				shopId: this.shopId,
				isRequest: false
			};
			for (let i in obj) {
				this.setNewObj(this.orderStoreSend.store, i, obj[i]);
			}
			this.showStep = 3;
			this.goodsData = data;
		},
		async getCondition() {
			//获取桌台-区域列表
			let data = await http.getCondition({
				data: {
					trueShopId: this.shopId
				}
			});
			let reasonArr = data.reasonList; //后台因为权限的问题在上个接口里传值了
			// let reasonArr = await http.getReasonList({
			// 	data: {
			// 		shopId:this.shopId
			// 	}
			// });
			let areaArr = [];
			let tableArr = [];
			for (let item of data.areaList) {
				areaArr.push(item.name);
			}
			for (let item of data.tableList) {
				tableArr.push(item.name);
			}
			areaArr.unshift('全部区域');
			tableArr.unshift('全部桌台');
			reasonArr.unshift({ reasonName: '全部原因', id: '0' });
			this.areas = areaArr;
			this.areasList = data.areaList;
			this.table = tableArr;
			this.tableList = data.tableList;
			this.reasonList = reasonArr;
		},
		async getStoreOrder() {
			//品牌-获取店铺退品列表
			// this.timeObj.startTime = new Date(this.startTime).getTime();
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
						type: 4,
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
												let obj = {
													startTime: this.timeObj
														.startTime,
													endTime: endTime,
													openTime: this.openTime,
													shopId: this.brandId //品牌id
												};
												for (let i in obj) {
													this.setNewObj(
														this.orderStoreSend
															.brand,
														i,
														obj[i]
													);
												}
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
		exportMethods() {
			if (this.showStep == 3) {
				this.exportGoods();
			} else if (this.showStep == 4) {
				this.exportOrder();
			}
		},
		async exportGoods() {
			//导出多商品退菜数据
			if (!this.goodsData) {
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
				await http.exportMoreReturnByName({
					data: {
						trueShopId: this.shopId,
						startTime: parseInt(this.timeObj.startTimeStore / 1000),
						endTime: parseInt(endTimeStore / 1000),
						areaId: this.areaId,
						tableId: this.tableId,
						reasonId: this.reasonId,
						isOpenTime: this.openTime
					}
				});
			}
		},
		async exportOrder() {
			//导出退菜商品具体订单
			let endTimeStore = new Date(this.timeObj.endTimeStore).setHours(
				23,
				59,
				59,
				0
			);
			await http.exportReturnList({
				data: {
					trueShopId: this.shopId,
					startTime: parseInt(this.timeObj.startTimeStore / 1000),
					endTime: parseInt(endTimeStore / 1000),
					areaId: this.areaId,
					tableId: this.tableId,
					reasonId: this.reasonId,
					isOpenTime: this.openTime,
					goodsName: this.goodsName,
					gid: this.gid,
					packageId: this.packageId
				}
			});
		},
		async getDetail(oid) {
			//获取订单详情
			let data = await http.orderBillDelite({
				data: {
					trueShopId: this.shopId,
					oid: oid
				}
			});
			this.detailShow = true; //显示详情
			this.detail = data;
		},
		setNewObj(obj, newObj, value) {
			//在对象上添加新属性，用于监听
			this.$set(obj, newObj, value);
		},
		resetDate() {
			//重置时间为当前时间
			for (let i in this.timeObj) {
				this.timeObj[i] = new Date().setHours(0, 0, 0, 0);
			}
		},
		back() {
			//返回上一步
			if (this.showStep < 4) {
				this.areaIndex = 0;
				this.areaId = 0;
				this.tableIndex = 0;
				this.tableId = 0;
				this.reasonIndex = 0;
				this.reasonId = 0;
			}
			if (this.showStep == 3 && this.isOneDay) {
				this.showStep = this.showStep - 2;
			} else {
				this.showStep = this.showStep - 1;
				if (this.showStep == 3) {
					let more = storage.session('moreReturnCache');
					if (more) this.goodsData = more;
				}
			}
		},
		search() {
			if (this.isBrand == 1) {
				//品牌下搜索
				if (this.showStep == 1 || this.showStep == 2)
					this.getStoreOrder();
				else this.getGoods();
			} else {
				this.getGoods();
			}
		},
		getStep(stepObj) {
			//获取列表模块发出的步骤step
			if (stepObj.step > 0) {
				this.showStep = stepObj.step;
				if (this.showStep == 3) {
					this.shopId = stepObj.id ? stepObj.id : this.shopId;
					this.orderStoreSend.store.isRequest = false;
					if (stepObj.time) {
						//品牌-从多天进入单天时
						this.timeObj.startTimeStore = stepObj.time;
						this.timeObj.endTimeStore = stepObj.time;
					}
					if (stepObj.page) {
						//这里为翻页 不需要重新获取桌台、区域列表
						this.page = stepObj.page;
						this.pageShow = stepObj.pageShow;
						this.getGoods();
					} else {
						this.page = 1;
						this.pageShow = stepObj.pageShow;
						this.getCondition();
						this.getGoods();
						this.isOneDay = stepObj.isOneDay;
					}
				} else if (this.showStep == 4) {
					this.goodsName = stepObj.goodsName;
					this.gid = stepObj.gid;
					this.packageId = stepObj.packageId;
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
		},
		searchOrder() {
			//根据订单号搜索 进入订单详情
			let orderId = this.orderInputValue;
			let regNum = /\d+/g;
			if (orderId.trim().length > 0) {
				if (orderId.trim().length < 18 || !regNum.test(orderId)) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '请输入正确的订单号!'
					});
					return false;
				}
				this.getDetail(orderId);
			} else {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '订单号不能为空'
				});
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
		orderInput(event) {
			console.log(event);
			//限制文本框输入 只能输入数字
			let num = event.target.value;
			num = num.replace(/[^\d]/g, '');
			if (isNaN(num)) num = '';
			this.orderInputValue = num;
			event.target.value = num;
		},
		reset() {
			//重置筛选-有bug
			let current = new Date().setHours(0, 0, 0, 0);
			if (this.showStep == 3 || this.showStep == 4) {
				this.openTime = 1;
				this.areaIndex = 0;
				this.tableIndex = 0;
				this.reasonIndex = 0;
				this.areaId = '';
				this.tableId = '';
				this.reasonId = '';
				if (this.showStep == 3) {
					if (!this.isBrand) {
						//非品牌
						this.timeObj.startTimeStore = current;
						this.timeObj.endTimeStore = current;
					}
					this.search();
				} else {
					this.orderStoreSend.store.areaId = '';
					this.orderStoreSend.store.tableId = '';
				}
			} else {
				this.timeObj.startTime = current;
				this.timeObj.endTime = current;
				if (this.isBrand) {
					//					let list = utils.deepCopy(this.shopList);
					//					let idArr = [];
					//					list.forEach(item => {
					//						item.selected = true;
					//						idArr.push(item.id);
					//					});
					this.shopList = this.userShopList.map(v => {
						return v.id;
					});
					this.shopIds = this.shopList.join(',');
					this.shopNameB = utils.deepCopy(this.userShopList);
					this.setIsOneStore(this.shopList.length);
				}
				this.search();
			}
		},
		timeCheck() {
			//按营业时间统计
			this.openTime = this.openTime == 0 ? 1 : 0;
		},
		areaSelect(index) {
			//区域选择
			this.areaIndex = index;
			this.areaId =
				this.areaIndex > 0 ? this.areasList[this.areaIndex - 1].id : '';
			if (this.showStep == 3) {
				this.getGoods();
			} else if (this.showStep == 4) {
				this.orderStoreSend.store.isRequest = true;
				this.orderStoreSend.store.areaId = this.areaId;
			}
		},
		tableSelect(index) {
			//桌台选择
			this.tableIndex = index;
			this.tableId =
				this.tableIndex > 0
					? this.tableList[this.tableIndex - 1].id
					: '';
			if (this.showStep == 3) {
				this.getGoods();
			} else if (this.showStep == 4) {
				this.orderStoreSend.store.isRequest = true;
				this.orderStoreSend.store.tableId = this.tableId;
			}
		},
		reasonSelect(index) {
			//桌台选择
			this.reasonIndex = index;
			this.reasonId = this.reasonList[this.reasonIndex].id;
			// this.reasonIndex > 0 ? this.reasonList[this.reasonIndex - 1].id : '';
			// if (this.showStep == 3) {
			// 	this.getGoods();
			// } else if (this.showStep == 4) {
			// 	this.orderStoreSend.store.isRequest = true;
			// 	this.orderStoreSend.store.areaId = this.areaId;
			// }
		},
		startTimeChange(time) {
			//开始时间
			if (this.showStep == 3) {
				//单店模式
				this.timeObj.startTimeStore = time;
			} else {
				this.timeObj.startTime = time;
			}
		},
		endTimeChange(time) {
			//结束时间
			if (this.showStep == 3) {
				//单店模式
				this.timeObj.endTimeStore = time;
			} else {
				this.timeObj.endTime = time;
			}
		},
		formatTime(time) {
			//格式化时间戳
			return utils.format(new Date(time), 'yyyy年MM月dd日');
		},
		validate() {
			//日期验证
			let isPass = true;
			const oneDay = 1000 * 3600 * 24; //一天的时间长度
			const threeMonth = 31 * 3 * oneDay; //三个月的时间戳长度
			let startTime = '',
				endTime = '';
			if (this.showStep == 3) {
				startTime = this.timeObj.startTimeStore;
				endTime = this.timeObj.endTimeStore;
			} else {
				startTime = this.timeObj.startTime;
				endTime = this.timeObj.endTime;
			}
			if (parseInt(startTime / oneDay) > parseInt(endTime / oneDay)) {
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
	}
};
</script>

<style lang="less" scoped>
.delete {
	padding-bottom: 40px;
	padding-top: 10px;
	width: 100%;
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.align {
		display: inline-block;
		vertical-align: middle;
	}
	.filter {
		position: relative;
		.mr-right {
			margin-right: 10px;
		}
		.block {
			display: inline-block;
			padding-bottom: 10px;
		}
		.input-word {
			padding: 0 5px;
		}
		.input-box {
			.align;
		}
		.input-check {
			margin-right: 10px;
			.align;
			font-size: 16px;
			color: #333;
			i {
				height: 20px;
				width: 20px;
				border-radius: 2px;
				margin-right: 5px;
				color: #444;
				cursor: pointer;
				display: inline-block;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
			}
			i.active {
				background: url(../../res/icon/white_select.png) #28a8e0 center
					no-repeat;
				border: 1px solid #28a8e0;
			}
		}

		.store-show {
			width: 100%;
			margin-bottom: 10;
			display: block;
			overflow: hidden;
			line-height: 20px;
			margin-top: 10px;
			span {
				float: left;
				color: #333;
			}
			i {
				float: left;
			}
			.time-span {
				border-left: 1px solid #999;
				padding: 0 10px;
				font-weight: bold;
			}
		}
	}
	.main {
		padding-top: 10px;
	}
	.check-div {
		display: inline-block;
		margin-left: 40px;
		cursor: pointer;
		i {
			height: 18px;
			width: 18px;
			display: inline-block;
			border-radius: 3px;
			margin-right: 5px;
			color: #444;
			border: 1px solid #bbb;
			vertical-align: middle;
			margin-top: -3px;
		}
	}
	.loding-cover {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 9;
		background: #fff;
		text-align: center;
	}
}
</style>