/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<!-- 筛选 -->
		<div class="search">
			<!-- <span>订单查询</span>
			<input type="text" placeholder="请输入订单号" v-model="goodsName"> -->
			<!-- <a href="javascript:;" class="blue" @click="getcommodity">筛选</a> -->
			<el-input class="fl" placeholder="请输入订单号" v-model="goodsName" style="width:auto;">
				<i slot="suffix" class="el-input__icon el-icon-search" @click="getcommodity"></i>
			</el-input>
			<!-- <a href="javascript:;" class="gray" @click="reset">重置</a> -->
			<div class="paymentbox fl" @click="openPaycode">
				<el-input placeholder="请选择收款码" v-model="paymentCode" :disabled="true" suffix-icon="el-icon-plus">
				</el-input>
			</div>
			<div class="paymentbox fl">
				<el-button type="primary" style="width:120px;" @click="getByCodes">筛选</el-button>
				<el-button type="info" style="width:120px;" @click="reset">重置</el-button>
			</div>
		</div>
		<div class="choiceshop">
			<div class="choiceshop_l">
				收款码:
			</div>
			<div class="choiceshop_r" v-if="dynamicTags.length > 0">
				<el-tag :key="index" v-for="(tag,index) in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
					{{tag.staffName}}
				</el-tag>
			</div>
			<div class="choiceshop_r" v-else>
				请选择收款码
			</div>
		</div>
		<!-- 已经选择的店铺 -->
		<div class="choiceshop">
			<div class="choiceshop_l">
				选择店铺:
			</div>
			<div class="choiceshop_r">
				{{constructionsName}} | 选择时间:{{formatTime(startTime)}} - {{formatTime(endTime)}}
			</div>
		</div>
		<section style="margin-bottom:20px;">
			<!-- <com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
				<div slot="con-0" slot-scope="props">
					1
				</div>
				<div slot="con-4" slot-scope="props">
					{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
				</div>
			</com-table> -->
			<el-table :data="staticLists" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}" style="width: 1436px;">
				<el-table-column fixed prop="days" label="天数" align="center">
					<template slot-scope="scope">
						<span>1</span>
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
		</section>
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>快捷支付统计</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{allFormList.length}}</a>个条目</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="formList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="shopId" label="操作" align="center" width="100">
					<template slot-scope="scope">
						<span  @click="openStore(scope.row)" style="color:#e1bb4a;">查看详情</span>
					</template>
				</el-table-column>
				<el-table-column label="结账时间" prop="createTime" align="center" width="200">
				</el-table-column>
				<el-table-column prop="oid" label="支付订单" align="center" width="200">
				</el-table-column>
				<el-table-column label="消费总额" prop="consumption" align="center" width="100">
				</el-table-column>
				<el-table-column label="优惠总额" prop="discount" align="center" width="100">
				</el-table-column>
				<el-table-column label="代金券" align="center" width="100">
					<template slot-scope="scope">
						<span>{{scope.row.vouchersPain}}({{scope.row.vouchersNum}}张)</span>
					</template>
				</el-table-column>
				<el-table-column label="实收总额" prop="pain" align="center" width="100">
				</el-table-column>
				<el-table-column label="积分抵扣总额" prop="pointCash" align="center" width="130">
				</el-table-column>
				<el-table-column label="会员消费总额" prop="memberConsumption" align="center" width="130">
				</el-table-column>
				<el-table-column label="微信支付总额" prop="weChatPain" align="center" width="130">
				</el-table-column>
				<el-table-column label="支付宝支付总额" prop="aliPayPain" align="center" width="130">
				</el-table-column>
				<el-table-column label="收款码" prop="staffId" align="center" width="130">
					<template slot-scope="scope">
						<span>{{getStaffname(scope.row.staffId)}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 员工码弹窗 -->
		<paymentCode v-if="showCode" :shopIds="dynamicTags" :constructionsName='constructionsName' :constructionsId="constructionsId" @chooseShop="backShopId"></paymentCode>
		<!-- 翻页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :constructionsId='constructionsId' :oid='oid'></component>
	</div>
</template>
<script type='text/javascript'>
import http from 'src/manager/http';
import getAppliedWin from './scancode_static_win.vue';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			page: 1,
			num: 10,
			endTotal: 1,
			goodsName: '', //订单号
			staticLists: [], //数据
			staticshopLists: [], //店铺查询的数据
			showWin: false, //弹窗默认关闭状态
			isPopupwindow: '',
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			allLists: [], //所有的数据  筛选订单
			oid: '', //订单号
			allShop: [], //所有的门店
			showCode: false, //打开员工码的弹窗
			dynamicTags: [],
			paymentCode: '', //选择的收款码
			codesd: '' //当前页面筛选的codes
		};
	},
	methods: {
		getcommodity: function() {
			if (this.goodsName == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请输入订单号'
				});
				return false;
			}
			let reg = new RegExp(this.goodsName);
			let arr = [];
			arr = this.allLists.filter(item => {
				return reg.test(item.oid);
			});
			this.allFormList = Object.values(arr);
			this.setPage();
		},
		reset: function() {
			this.page = 1;
			this.goodsName = '';
			this.getScanPayData();
		},
		returnShopstatic: function() {
			this.$emit('scanorderResult', 'static');
		},
		tableEvent() {
			// console.log(currentPage, '');
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		getResult: function() {
			this.showWin = false;
		},
		openStore: function(item) {
			//打开新增用户标签的弹窗
			this.showWin = true; //打开弹窗
			this.isPopupwindow = 'getAppliedWin';
			this.oid = item.oid;
		},
		async getScanPayData() {
			let data = await http.getScanPayData({
				data: {
					taskId: this.taskId,
					showDetail: 1,
					showShopId: this.constructionsId,
					showDay: this.oneData
				}
			});
			if (data) {
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.list; //身体的数据
				this.allLists = this.allFormList;
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		async codesExport(codes) {
			await http.exportgetScanPayOrderByCodes({
				data: {
					showShopId: this.constructionsId,
					codes: codes.join(','),
					taskId: this.taskId,
					showDay: this.oneData,
					isExport: 1
				}
			});
		},
		async Export() {
			await http.exportScanPayData({
				data: {
					taskId: this.taskId,
					showDetail: 1,
					showShopId: this.constructionsId,
					showDay: this.oneData,
					isExport: 1
				}
			});
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		//获取店铺列表
		async getShopList() {
			let res = await http.getScanPayInfo({
				data: {
					shopId: this.constructionsId
				}
			});
			this.allShop = [];
			let obj = {
				'staffName': this.constructionsName,
				'staffId': 0,
				'shopId': this.constructionsId
			};
			this.allShop.push(obj);
			if (res) {
				for (let key in res.staffList) {
					this.allShop.push(res.staffList[key]);
				}
			}
		},
		getStaffname: function(id) { //
			let name = '--';
			//console.log(JSON.stringify(this.allShop))
			for (let item of this.allShop) {
				if (item.staffId == id) {
					name = item.staffName;
					break;
				}
			}
			return name;
		},
		async getScanPayOrderByCodes(codes) {
			let res = await http.getScanPayOrderByCodes({
				data: {
					showShopId: this.constructionsId,
					codes: codes.join(','),
					taskId: this.taskId,
					showDay: this.oneData,
					isExport: 0
				}
			});
			if (res && res != '') {
				this.staticLists = [];
				this.staticLists.push(res.total); //头部的数据
				this.allFormList = res.list; //身体的数据
				this.allLists = this.allFormList;
				this.$nextTick(() => {
					this.setPage();
				});
			} else {
				this.staticLists = [];
				this.formList = [];
			}
		},
		openPaycode: function() { //打开快捷支付统计
			//console.log('222222')
			this.showCode = true;
		},
		getByCodes: function() {
			if (this.dynamicTags.length == 0) {
				this.$store.commit('setWin', {
					content: '请选择收款码',
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			let codes = [];
			for (let item of this.dynamicTags) {
				codes.push(item.staffId);
			}
			this.codesd = codes;
			this.getScanPayOrderByCodes(this.codesd);
		},
		//选择店铺弹窗返回
		backShopId(res, item) {
			if (res == 'ok') {
				//this.staffId = obj.shopIds;
				this.dynamicTags = item;
				//console.log(JSON.stringify(item));
				if (this.dynamicTags.length > 0) {
					this.paymentCode = `已选择${this.dynamicTags.length}个收款码`;
				} else {
					this.paymentCode = '请选择收款码';
				}
			}
			this.showCode = false;
		},
		handleClose(tag) {
			this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			if (this.dynamicTags.length > 0) {
				this.paymentCode = `已选择${this.dynamicTags.length}个收款码`;
			} else {
				this.paymentCode = '请选择收款码';
			}
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
	},
	props: {
		constructionsName: String, //店铺名称
		startTime: Number, //开始时间
		endTime: Number, //结束时间
		constructionsId: String, //店铺的id
		isOpenTime: Boolean,
		oneData: String,
		taskId: Number,
		codes: Array
	},
	components: {
		pageElement: () =>
			import( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		getAppliedWin,
		paymentCode: () =>
			import( /*webpackChunkName: "scancode_payment_codewin"*/ './scancode_payment_codewin')
	},
	created() {
		this.getShopList();
	},
	mounted() {
		this.$store.commit('setPageTools', [{
				name: '返回',
				className: 'el-btn-blue',
				fn: () => {
					this.returnShopstatic();
				}
			},
			{
				name: '导出',
				className: 'el-btn-yellow',
				fn: () => {
					if (this.codes && this.codes != '') {
						this.codesExport(this.codes);
					} else {
						this.Export();
					}
				}
			}
		]);
		if (this.codes && this.codes != '') {
			this.getScanPayOrderByCodes(this.codes);
		} else {
			this.getScanPayData();
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" scoped>
#membercard {
	width: 100%;
	height: 100%;
}

#membercard .search {
	width: 100%;
	height: 42px;
	margin-bottom: 18px;
}

#membercard .search span {
	font-size: 16px;
	margin-right: 15px;
}

#membercard .search input {
	width: 183px;
	height: 41px;
	text-indent: 10px;
	margin-right: 15px;
}

#membercard .search a {
	width: 101px;
	height: 42px;
	text-align: center;
	line-height: 42px;
	margin-right: 15px;
}

#membercard .choiceshop {
	width: 100%;
	overflow: hidden;
	margin-bottom: 20px;
}

#membercard .choiceshop .choiceshop_l {
	float: left;
	font-size: 16px;
	line-height: 32px;
}

#membercard .choiceshop .choiceshop_r {
	float: left;
	width: 900px;
	font-size: 16px;
	line-height: 32px;
}

#membercard .search .paymentbox {
	height: 40px;
	margin-left: 20px;
}

.el-tag+.el-tag {
	margin-left: 10px;
	margin-bottom: 10px;
}
</style>