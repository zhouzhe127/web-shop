<!--退品统计-->
<template>
	<div class="delete">
		<template v-if="!detailShow">
			<div class="filter">
				<template v-if="showStep != 5">
					<div class="block">
						<template v-if="showStep == 1">
							<div class="input-box">
								<!--日期组件 开始时间-->
								<calendar :time="timeObj.startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
							</div>
							<span class="input-word">至</span>
							<div class="input-box mr-right">
								<!--日期组件 结束时间-->
								<calendar :time="timeObj.endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
							</div>
						</template>
						<template v-if="!isBrand && showStep == 3 || !isBrand && showStep == 4">
							<div class="input-box">
								<!--日期组件 开始时间-->
								<calendar :time="timeObj.startTimeStore" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
							</div>
							<span class="input-word">至</span>
							<div class="input-box mr-right">
								<!--日期组件 结束时间-->
								<calendar :time="timeObj.endTimeStore" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
							</div>
						</template>
					</div>
					<div class="block">
						<!--区域 桌台-->
						<template v-if="showStep == 3||showStep == 4">
							<selectBtn :sorts="areas" :index="areaIndex" :width="150" @emit="areaSelect"></selectBtn>
							<selectBtn :sorts="table" :index="tableIndex" :width="150" @emit="tableSelect"></selectBtn>
							<selectBtn :sorts="reasonList.map(v=>v.reasonName)" :index="reasonIndex" :width="150" @emit="reasonSelect"></selectBtn>
						</template>
						<div class="input-check select-ban" v-if="showStep != 2">
							<i @click="timeCheck" :class="{active:this.openTime == 1}"></i>
							按营业时间
						</div>
						<!--根据订单号查询详情-->
						<div class="search-input mr-right" v-if="showStep == 4">
							<input type="text" placeholder="请输入订单号" @input="orderInput" @propertychange="orderInput" />
							<em @click="searchOrder"></em>
						</div>
					</div>
					<div class="block">
						<!--选择店铺按钮-->
						<div class="search-box" v-if="isBrand && showStep == 1">
							<!--<select-store @emit="getDrop" :sorts="shopList" :tipName="dropName"></select-store>-->
							<elShopList @chooseShop="getDrop" :shopIds="shopList"></elShopList>
						</div>
						<!--搜索 重置-->
						<div class="search-box" v-if="showStep != 2">
							<span class="search-btn yellow" @click="search">搜索</span>
							<span class="reset-btn gray" @click="reset">重置</span>
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
			shopNameB:[],//已选择的店铺名称
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
		this.brandId = this.userData.currentShop.id; //品牌id,单店下用不到这个字段
		this.shopId = this.userData.currentShop.id; //单店id;用于单店查询 和 品牌下多店铺查询
		this.shopIds = this.userShopIdStr;
		for (let i in this.userShopList) {
			//店铺默认全部选中
			this.userShopList[i].selected = true;
		}

		if(this.isBrand){
			this.shopNameB=utils.deepCopy(this.userShopList);
			this.shopList = this.userShopList.map((v)=>{
				return v.id
			});
		}


		this.storeName =
			this.userShopList.length > 0
				? this.userShopList[0].name
				: '选择店铺'; //选中店铺按钮 显示,
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,

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
					className: ['gray'],
					fn: () => {
						this.back();
					}
				});
			}
			if (this.showStep == 3 || this.showStep == 4) {
				arr.push({
					name: '导出',
					className: ['fd-yellow'],
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
			let reasonArr = await http.getReasonList({
				data: {
					shopId:this.shopId
				}
			});
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
			if(this.showStep <4){
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
//		getDrop(arr) {
//			this.shopList = arr;
//			let idArr = [],
//				selectNum = 0;
//			this.shopList.forEach(item => {
//				if (item.selected == true) {
//					idArr.push(item.id);
//					selectNum++;
//				}
//			});
//			this.shopIds = idArr.join(',');
//			this.setIsOneStore(selectNum);
//		},
		//选店返回
		getDrop(arr) {
			console.log(arr);
			this.shopList = arr;
			this.shopIds = this.shopList.join(',');
			this.setIsOneStore(this.shopList.length);
			this.shopNameB=utils.deepCopy(this.userShopList);
			for(let i=0;i<this.shopNameB.length;i++){
				if(!this.shopList.includes(this.shopNameB[i].id)){
					this.shopNameB.splice(i,1);
					i--
				}
			}
			console.log(this.shopNameB);
		},
		searchOrder() {
			//根据订单号搜索 进入订单详情
			let orderId = this.orderInputValue;
			if (orderId) {
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
					this.shopList=this.userShopList.map((v)=>{
						return v.id;
					});
					this.shopIds=this.shopList.join(',');
					this.shopNameB=utils.deepCopy(this.userShopList);
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
		.search-input {
			.align;
			width: 200px;
			height: 40px;
			border: 1px solid #ddd;
			overflow: hidden;
			input {
				height: 38px;
				width: 158px;
				float: left;
				border: 0;
				padding: 0 10px;
				&:focus {
					outline: none;
				}
			}
			em {
				float: left;
				height: 38px;
				width: 40px;
				border-left: 1px solid #ddd;
				cursor: pointer;
				background: url(../../res/images/search.png) #29a7e1 center
					no-repeat;
			}
		}
		.search-box {
			.align;
			margin-right: 10px;
			span {
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border: 0;
				color: #fff;
				display: inline-block;
				cursor: pointer;
			}
			.search-btn {
				margin-right: 5px;
			}
		}
		.select-body {
			margin-right: 10px;
		}
		.offset {
			position: absolute;
			right: 0;
			top: -45px;
			span {
				cursor: pointer;
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				display: block;
				float: left;
				margin-left: 10px;
			}
			.export-btn {
				background: #29abe2;
				color: #fff;
				&:hover {
					background: #2a80b9;
				}
			}
			.back-btn {
				border: 1px solid #ff8c01;
				color: #ff8c01;
				&:hover {
					background: #ff8c01;
					color: #fff;
				}
			}
		}
		.back {
			right: 0;
		}
		.store {
			.align;
			margin-left: 20px;
			position: relative;
			.store-btn {
				float: left;
				color: #666;
				width: 150px;
				height: 40px;
				line-height: 40px;
				border: 1px solid #ddd;
				cursor: pointer;
				span {
					float: left;
					width: 108px;
					height: 38px;
					padding: 0 10px;
				}
				i {
					float: right;
					border-left: 1px solid #b3b3b3;
					width: 40px;
					height: 38px;
					text-align: center;
					opacity: 0.5;
				}
			}
			.store-btn:hover {
				border: 1px solid #aaa;
			}
			.list {
				position: absolute;
				right: 0;
				top: 50px;
				width: 400px;
				background: #333;
				padding: 10px 5px 10px 10px;
				box-shadow: 0 5px 5px #666;
				z-index: 20;
				em {
					position: absolute;
					right: 10px;
					top: -10px;
					height: 0;
					width: 0;
					border-bottom: 10px solid #333;
					border-left: 7px solid transparent;
					border-right: 7px solid transparent;
				}
			}
			ul {
				float: left;
				overflow: auto;
				max-height: 500px;
				width: 100%;
				li {
					height: 40px;
					line-height: 40px;
					padding: 0 15px;
					float: left;
					color: #fff;
					border: 1px solid #fff;
					margin: 5px;
					cursor: pointer;
					&.active {
						background: url(../../res/images/sign.png) right 103%
							no-repeat;
						border-color: #ff9800;
					}
					&.all {
						width: 80px;
						text-align: center;
					}
				}
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