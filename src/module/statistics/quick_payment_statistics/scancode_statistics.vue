/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<div id="scancode">
		<section v-if="showtype == 'all'">
			<!--总览订单页面显示日期-->
			<div class="order-order-data">
				<ul>
					<!--日期选择和搜索框-->
					<section class="statisticsList fl">
						<el-date-picker class="fl" v-model="startObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" @change="getStartTime" value-format="timestamp" :editable="false">
						</el-date-picker>
					</section>
					<span class="to">至</span>
					<section class="statisticsList fl">
						<el-date-picker class="fl" v-model="endObj.time" type="datetime" placeholder="选择日期时间" :clearable="false" value-format="timestamp" @change="getEndTime">
						</el-date-picker>
					</section>
					<li>
						<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" class="checkBox"></div>
						<span style="font-size: 16px;">按营业时间</span>
					</li>
					<li v-if="ischain == '3'">
						<elShopList @chooseShop="getSelectShopList" :shopIds="transmitId"></elShopList>
					</li>
					<el-button type="primary" @click="scanPayQuery">筛选</el-button>
					<el-button type="info" @click="resetting">重置</el-button>
				</ul>
			</div>
			<div class="store-show" :style="{'height':storeShowH}">
				<i>已选择店铺：</i>
				<div class="store-block">
					<em @click='openStore' class="select-ban">{{isShowStore?'收起':'展开'}}</em>
					<div>{{selectName}}</div>
				</div>
			</div>
			<section style="margin-bottom:20px;">
				<el-table :data="staticLists" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}" style="width: 1436px;">
					<el-table-column fixed prop="days" label="天数" align="center">
					</el-table-column>
					<el-table-column label="支付次数" prop="payTimes" align="center">
					</el-table-column>
					<el-table-column prop="totalConsumption" label="消费总额" align="center">
					</el-table-column>
					<el-table-column label="优惠总额" prop="totalDiscount" align="center">
					</el-table-column>
					<el-table-column label="代金券" prop="totalConsumption" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.totalVouchersPain}}({{scope.row.totalVouchersNum}}张)</span>
						</template>
					</el-table-column>
					<el-table-column label="实收总额" prop="totalPain" align="center">
					</el-table-column>
					<el-table-column label="积分抵扣总额" prop="totalPointCash" align="center">
					</el-table-column>
					<el-table-column label="会员消费总额" prop="totalMemberConsumption" align="center">
					</el-table-column>
					<el-table-column label="微信支付总额" prop="totalWeChatPain" align="center">
					</el-table-column>
					<el-table-column label="支付宝支付总额" prop="totalAliPayPain" align="center">
					</el-table-column>
				</el-table>
			</section>
			<!-- 下面的表格 -->
			<div class="list_box" style="width:100%;">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>快捷支付统计</span>
						<span></span>
						<span>共<a href="javascript:;">{{allFormList.length}}</a>个条目</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="formList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="shopId" label="店铺名称" align="center">
						<template slot-scope="scope">
							<span @click="showoneshopDetail(scope.row)" style="color:#e1bb4a;">{{getshopName(scope.row.shopId)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="支付次数" prop="payTimes" align="center">
					</el-table-column>
					<el-table-column prop="totalConsumption" label="消费总额" align="center">
					</el-table-column>
					<el-table-column label="优惠总额" prop="totalDiscount" align="center">
					</el-table-column>
					<el-table-column label="代金券" prop="totalConsumption" align="center">
						<template slot-scope="scope">
							<span>{{scope.row.totalVouchersPain}}({{scope.row.totalVouchersNum}}张)</span>
						</template>
					</el-table-column>
					<el-table-column label="实收总额" prop="totalPain" align="center">
					</el-table-column>
					<el-table-column label="积分抵扣总额" prop="totalPointCash" align="center">
					</el-table-column>
					<el-table-column label="会员消费总额" prop="totalMemberConsumption" align="center">
					</el-table-column>
					<el-table-column label="微信支付总额" prop="totalWeChatPain" align="center">
					</el-table-column>
					<el-table-column label="支付宝支付总额" prop="totalAliPayPain" align="center">
					</el-table-column>
				</el-table>
			</div>
			<!-- 翻页 -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
		</section>
		<oneshop-statics v-if="showtype == 'one'" @throwWinResult="getDetailShow" :constructionsName="constructionsName" :startTime="startObj.time" :endTime="endObj.time" :isOpenTime="isOpenTime" :constructionsId="constructionsId" :taskId='taskId'>
		</oneshop-statics>
	</div>
</template>
<script type='text/javascript'>
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
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			timer: '', //定时器
			showtype: 'all',
			constructionsName: '', //点击查询单店的店铺名称
			constructionsId: '', //点击查询单店的id
			timeout: '',
			taskId: '', //任务队列的id
			loading: false, //状态
			timerqueue: [],
			transmitId: [], //传递给选择店铺页面的id 
			isShowStore: false, //已选中店铺列表 是否展开
			storeShowH: '20px',
		};
	},
	methods: {
		openStore() { //展开收起-已选中店铺列表
			if (this.isShowStore == true) { //展开时点击
				this.storeShowH = '20px';
			} else {
				this.storeShowH = 'auto';
			}
			this.isShowStore = !this.isShowStore;
		},
		//选择开始时间
		getStartTime: function(receiveTime) {
			this.startObj.time = receiveTime; //毫秒
		},
		//选择结束时间
		getEndTime: function(receiveTime) {
			this.endObj.time = receiveTime; //毫秒
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		//选择店铺返回
		getSelectShopList: function(res) {
			console.log(this.postSelectShopList);
			this.transmitId = res;
			let selectNameStr = '';
			for (let i = 0; i < this.postSelectShopList.length; i++) {
				if (this.transmitId.includes(this.postSelectShopList[i].id)) {
					this.postSelectShopList[i].selected = true;
					selectNameStr = selectNameStr + this.postSelectShopList[i].name + ',';
				} else {
					this.postSelectShopList[i].selected = false;
				}
			}
			this.shopIds = res.join(',');
			this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
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
			// this.$store.commit('setPageTools', [{
			// 	name: '导出',
			// 	className: ['fd-blue'],
			// 	fn: () => {
			// 		this.Export();
			// 	}
			// }]);
			this.setTitle();
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
				this.transmitId = selectShopList.map((v) => {
					return v.id;
				});
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
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.setPage();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.setPage();
		},
		setTitle: function() {
			this.$store.commit('setPageTools', [{
				name: '导出',
				fn: () => {
					this.Export();
				},
				className: 'el-btn-blue'
			}]);
		}
	},
	components: {
		calendar: () =>
			import( /*webpackChunkName: "calendar_result"*/ 'src/components/calendar_result'),
		pageElement: () =>
			import( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		oneshopStatics: () =>
			import( /*webpackChunkName: "scancode_shopstatistics"*/ './scancode_shopstatistics'),
		elShopList: () =>
			import( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList')
	},
	mounted() {
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.getshopIdorshopName();
		this.scanPayQuery();
		this.setTitle();
		// this.$store.commit('setPageTools', [{
		// 	name: '导出',
		// 	className: ['fd-blue'],
		// 	fn: () => {
		// 		this.Export();
		// 	}
		// }]);
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
		#e1bb4a;
}

#scancode .order-order-data .checkBox {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #e1bb4a;
	margin: 10px 10px;
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

#scancode .store-show {
	width: 100%;
	margin-bottom: 10px;
	display: block;
	overflow: hidden;
	line-height: 20px;
	position: relative;
}

#scancode .store-show i {
	float: left;
	position: absolute;
	left: 0;
	top: 0;

}

#scancode .store-show .store-block {
	overflow: hidden;
	width: 100%;
	padding-left: 84px;
}

#scancode .store-show .store-block em {
	float: left;
	color: #09f;
	margin-right: 5px;
	cursor: pointer;
	text-decoration: underline;
}

#scancode .store-show .store-block span {
	float: left;
	color: #333;
}
</style>