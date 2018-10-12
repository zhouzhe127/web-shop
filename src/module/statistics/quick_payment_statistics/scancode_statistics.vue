/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<div id="scancode">
		<section v-if="showtype == 'all'">
			<!--总览订单页面显示日期-->
			<div class="order-order-data">
				<ul>
					<!--日期选择和搜索框-->
					<section class="statisticsList fl">
						<section class="tableListInp">
							<calendar :pObj="startObj" @throwTime="getStartTime" style=""></calendar>
						</section>
					</section>
					<span class="to">至</span>
					<section class="statisticsList fl">
						<section class="tableListInp">
							<calendar :pObj="endObj" @throwTime="getEndTime"></calendar>
						</section>
					</section>
					<li>
						<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" class="checkBox"></div>
						<span style="font-size: 16px;">按营业时间</span>
					</li>
					<li v-if="ischain == '3'">
						<selectstore @emit="getSelectShopList" :sorts="postSelectShopList" :tipName="selectName"></selectstore>
					</li>
					<a class="fl blue secBtn" v-on:click="scanPayQuery()" href="javascript:void(0)">搜索</a>
					<a class="fl gray recBtn" v-on:click="resetting()" href="javascript:void(0)">重置</a>
				</ul>
			</div>
			<!-- 已经选择的店铺 -->
			<div class="choiceshop">
				<div class="choiceshop_l">
					选择店铺:
				</div>
				<div class="choiceshop_r">
					{{selectName}}
				</div>
			</div>
			<section style="margin-bottom:20px;">
				<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
					<div slot="con-4" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<section>
				<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
					<div slot="con-0" slot-scope="props" @click="showoneshopDetail(props.data)">
						{{getshopName(props.data.shopId)}}
					</div>
					<div slot="con-4" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<oneshop-statics v-if="showtype == 'one'" @throwWinResult="getDetailShow" :constructionsName="constructionsName" :startTime="startObj.time" :endTime="endObj.time" :isOpenTime="isOpenTime" :constructionsId="constructionsId" :taskId='taskId'>
		</oneshop-statics>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
export default {
	data() {
		return {
			page: 1, //页码数
			num: 10,
			endTotal: 1,
			ischain: '', //品牌或单店标识
			startObj: {
				time: new Date().setHours(0, 0, 0, 0),
				width: 170
			}, //日期组件的开始时间
			endObj: {
				time: new Date().setHours(23, 59, 59, 999),
				width: 170
			}, //日期组件的结束时间
			isOpenTime: false, //是否按营业时间 默认 false 0 否
			postSelectShopList: [],
			selectName: null,
			shopIds: null, //选择查看的店铺的id
			staticLists: [], //头部数据
			isloadingstatus: false, //延时处理
			titleList: [{
				titleName: '天数',
				dataName: 'days'
			},
			{
				titleName: '支付次数',
				dataName: 'payTimes'
			},
			{
				titleName: '消费总额 ',
				dataName: 'totalConsumption'
			},
			{
				titleName: '优惠总额',
				dataName: 'totalDiscount'
			},
			{
				titleName: '代金券'
			},
			{
				titleName: '实收总额',
				dataName: 'totalPain'
			},
			{
				titleName: '积分抵扣总额',
				dataName: 'totalPointCash'
			},
			{
				titleName: '会员消费总额',
				dataName: 'totalMemberConsumption'
			},
			{
				titleName: '微信支付总额',
				dataName: 'totalWeChatPain'
			},
			{
				titleName: '支付宝支付总额',
				dataName: 'totalAliPayPain'
			}
			],
			shoptitleList: [{
				titleName: '店铺名称',
				dataName: 'shopId',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '支付次数',
				dataName: 'payTimes'
			},
			{
				titleName: '消费总额 ',
				dataName: 'totalConsumption'
			},
			{
				titleName: '优惠总额',
				dataName: 'totalDiscount'
			},
			{
				titleName: '代金券'
			},
			{
				titleName: '实收总额',
				dataName: 'totalPain'
			},
			{
				titleName: '积分抵扣总额',
				dataName: 'totalPointCash'
			},
			{
				titleName: '会员消费总额',
				dataName: 'totalMemberConsumption'
			},
			{
				titleName: '微信支付总额',
				dataName: 'totalWeChatPain'
			},
			{
				titleName: '支付宝支付总额',
				dataName: 'totalAliPayPain'
			}
			],
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			timer: '', //定时器
			showtype: 'all',
			constructionsName: '', //点击查询单店的店铺名称
			constructionsId: '', //点击查询单店的id
			timeout: '',
			taskId: '', //任务队列的id
			loading: false, //状态
			timerqueue: []
		};
	},
	methods: {
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.startObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.endObj.time = new Date(receiveTime).getTime(); //毫秒
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		getSelectShopList: function(res) {
			this.postSelectShopList = res; //返回已经选好的店铺的数组 选中true 未选false
			let shopIdsStr = []; //存id
			let selectNameStr = []; //存店铺名
			for (let i = 0; i < res.length; i++) {
				if (res[i].selected == true) {
					shopIdsStr.push(res[i].id);
					selectNameStr.push(res[i].name);
				}
			}
			this.shopIds = shopIdsStr.join(',');
			this.selectName =
				selectNameStr == '' ? '请选择店铺' : selectNameStr.join(',');
		},
		checkData: function() {
			if (
				this.endObj.time - this.startObj.time >
				global.timeConst.THREEMONTHS
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '只能查询间隔三个月的数据'
				});
				return false;
			}
			if (this.startObj.time - this.endObj.time > 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '查询时间选择错误'
				});
				return false;
			}
			if (this.shopIds == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请选择店铺'
				});
				return false;
			}
			if (this.loading == true) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '正在搜索,请勿重复点击'
				});
				return false;
			}
			return true;
		},
		//重置
		resetting: function() {
			this.startObj.time = new Date().setHours(0, 0, 0, 0);
			this.endObj.time = new Date().setHours(23, 59, 59, 999);
			this.isOpenTime = false;
			this.getshopIdorshopName();
			this.scanPayQuery();
		},
		tableEvent() {
			// console.log(currentPage, '');
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		async scanPayQuery() {
			if (!this.checkData()) return;
			this.loading = true;
			this.isloadingstatus = false;
			let data = await http.scanPayQuery({
				data: {
					startTime: parseInt(this.startObj.time / 1000), //开始时间
					endTime: parseInt(this.endObj.time / 1000), //结束时间
					shopIds: this.shopIds,
					isOpenTime: Number(this.isOpenTime)
				}
			});
			if (data) {
				this.taskId = data; //任务id
				this.timer = setInterval(() => {
					this.getTaskStatus(data);
				}, 2000);
			}
		},
		async getTaskStatus(id) {
			let data = await http.getScanTaskStatus({
				data: {
					taskId: id
				}
			});
			this.timeout = setTimeout(() => {
				if (!this.isloadingstatus) {
					this.loading = false;
					this.$store.commit('setWin', {
						content: '页面加载失败,请重新加载',
						title: '操作提示',
						winType: 'alert'
					});
					clearInterval(this.timer);
					while (this.timerqueue.length) {
						clearTimeout(this.timerqueue.pop());
					}
					return false;
				}
			}, 20000);
			this.timerqueue.push(this.timeout);
			if (data == true) {
				clearInterval(this.timer);
				while (this.timerqueue.length) {
					clearTimeout(this.timerqueue.pop());
				}
				this.getScanPayData(id);
			}
		},
		async getScanPayData(id) {
			let data = await http.getScanPayData({
				data: {
					taskId: id,
					showDetail: 0,
					showShopId: '',
					showDay: ''
				}
			});
			if (data) {
				this.loading = false;
				this.isloadingstatus = true;
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.list; //身体的数据
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		getshopName: function(id) {
			let shopName = '';
			for (let item of this.postSelectShopList) {
				if (item.id == id) {
					shopName = item.name ? item.name : item.shopName;
				}
			}
			return shopName;
		},
		getDetailShow(res) {
			//子组件评价列表返给父组件的
			this.showtype = res;
			this.$store.commit('setPageTools', [{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.Export();
				}
			}]);
		},
		showoneshopDetail: function(item) {
			this.showtype = 'one';
			this.constructionsName = this.getshopName(item.shopId); //店铺名称
			this.constructionsId = item.shopId;
		},
		getshopIdorshopName: function() {
			//默认全部选中
			if (this.ischain == '3') {
				let selectShopList = storage.session('shopList');
				let shopIds = [];
				let selectName = [];
				for (let item of selectShopList) {
					item.selected = true;
					item.name = item.shopName;
					shopIds.push(item.id);
					selectName.push(item.name);
				}
				this.shopIds = shopIds.join(',');
				this.selectName = selectName.join(',');
				this.postSelectShopList = selectShopList;
			} else {
				this.shopIds = storage.session('userShop').currentShop.id;
				this.selectName = storage.session('userShop').currentShop.name;
				this.postSelectShopList.push(
					storage.session('userShop').currentShop
				);
			}
		},
		async Export() {
			await http.exportScanPayData({
				data: {
					taskId: this.taskId,
					showDetail: 0,
					showShopId: '',
					showDay: '',
					isExport: 1
				}
			});
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		selectstore: () =>
			import ( /*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		oneshopStatics: () =>
			import ( /*webpackChunkName: "scancode_shopstatistics"*/ './scancode_shopstatistics'),	
	},
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		let obj2 = {
			conStyle: {
				color: '#ff9800'
			}
		};
		for (let item of this.titleList) {
			Object.assign(item, obj1, obj2);
		}
		for (let item of this.shoptitleList) {
			Object.assign(item, obj1);
		}
	},
	mounted() {
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.getshopIdorshopName();
		this.scanPayQuery();
		this.$store.commit('setPageTools', [{
			name: '导出',
			className: ['fd-blue'],
			fn: () => {
				this.Export();
			}
		}]);
	},
	destroyed() {
		clearInterval(this.timer);
		clearTimeout(this.timeout);
	}
};
</script>
<style type="text/css" scoped>
#scancode {
	/*overflow: hidden;*/
	height: 100%;
	width: 100%;
}

#scancode .order-order-data {
	min-width: 1040px;
	min-height: 40px;
	margin-bottom: 20px;
}

#scancode .order-order-data .to {
	float: left;
	width: 25px;
	line-height: 40px;
	text-align: center;
	float: left;
}

#scancode .order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 40px;
	line-height: 40px;
}

#scancode .order-order-data ul li span input {
	width: 174px;
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
	float: left;
}

#scancode .selected {
	background: url(../../../res/icon/selected.png) center center no-repeat,
	#28a8e0;
}

#scancode .order-order-data .checkBox {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 13px 10px;
	float: left;
}

#scancode .order-order-data .secBtn {
	width: 80px;
	height: 40px;
	line-height: 40px;
	margin-left: 10px;
}

#scancode .order-order-data .recBtn {
	width: 80px;
	height: 40px;
	line-height: 40px;
	margin-left: 10px;
}

#scancode .choiceshop {
	width: 100%;
	overflow: hidden;
	margin-bottom: 20px;
}

#scancode .choiceshop .choiceshop_l {
	float: left;
	font-size: 16px;
	line-height: 24px;
}

#scancode .choiceshop .choiceshop_r {
	float: left;
	width: 900px;
	font-size: 16px;
	line-height: 24px;
}
</style>