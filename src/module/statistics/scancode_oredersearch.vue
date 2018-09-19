/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<!-- 筛选 -->
		<div class="search">
			<span>订单查询</span>
			<input type="text" placeholder="请输入订单号" v-model="goodsName">
			<a href="javascript:;" class="blue" @click="getcommodity">筛选</a>
			<a href="javascript:;" class="gray" @click="reset">重置</a>
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
			<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
				<div slot="con-0" slot-scope="props">
					1
				</div>
				<div slot="con-4" slot-scope="props">
					{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
				</div>
			</com-table>
		</section>
		<section>
			<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
				<div slot="con-0" slot-scope="props" @click="openStore(props.data)">
					查看详情
				</div>
				<div slot="con-5" slot-scope="props">
					{{props.data.vouchersPain}}({{props.data.vouchersNum}}张)
				</div>
				<div slot="con-11" slot-scope="props">
					{{getStaffname(props.data.staffId)}}
				</div>
			</com-table>
		</section>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :constructionsId='constructionsId' :oid='oid'></component>
	</div>
</template>
<script>
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
			staticLists: [], //数据
			shoptitleList: [{
					titleName: '操作',
					dataName: 'shopId',
					conStyle: {
						color: '#27a8e0',
						cursor: 'pointer'
					}
				},
				{
					titleName: '结账时间 ',
					dataName: 'createTime',
					titleStyle: {
						width: 200 + 'px',
						flex: 'none',
						fontSize: 16 + 'px'
					}
				},
				{
					titleName: '支付订单 ',
					dataName: 'oid',
					titleStyle: {
						width: 200 + 'px',
						flex: 'none',
						fontSize: 16 + 'px'
					}
				},
				{
					titleName: '消费总额 ',
					dataName: 'consumption'
				},
				{
					titleName: '优惠总额',
					dataName: 'discount'
				},
				{
					titleName: '代金券'
				},
				{
					titleName: '实收总额',
					dataName: 'pain'
				},
				{
					titleName: '积分抵扣总额',
					dataName: 'pointCash'
				},
				{
					titleName: '会员消费总额',
					dataName: 'memberConsumption'
				},
				{
					titleName: '微信支付总额',
					dataName: 'weChatPain'
				},
				{
					titleName: '支付宝支付总额',
					dataName: 'aliPayPain'
				},
				{
					titleName: '收款码',
					dataName: 'staffId'
				}
			],
			staticshopLists: [], //店铺查询的数据
			showWin: false, //弹窗默认关闭状态
			isPopupwindow: '',
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			allLists: [], //所有的数据  筛选订单
			oid: '', //订单号
			allShop: [] //所有的门店
		};
	},
	methods: {
		getcommodity: function() {
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
			})
			this.allShop = [];
			let obj = {
				'staffName': this.constructionsName,
				'staffId': 0,
				'shopId': this.constructionsId
			}
			this.allShop.push(obj);
			if (res) {
				for (let key in res.staffList) {
					this.allShop.push(res.staffList[key]);
				}
			}
		},
		getStaffname:function(id){//
			let name = '--';
			for(let item of this.allShop){
				if(item.staffId == id){
					name = item.staffName;
					break;
				}
			}
			return name;
		}
	},
	props: {
		constructionsName: String, //店铺名称
		startTime: Number, //开始时间
		endTime: Number, //结束时间
		constructionsId: String, //店铺的id
		isOpenTime: Boolean,
		oneData: String,
		taskId: Number
	},
	watch: {},
	components: {
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		getAppliedWin
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
			if (item.dataName != 'oid' && item.dataName != 'createTime') {
				Object.assign(item, obj1);
			}
		}
		this.getShopList();
	},
	mounted() {
		this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnShopstatic();
				}
			},
			{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.Export();
				}
			}
		]);
		this.getScanPayData();
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" scoped>
#membercard {
	width: 1437px;
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
	line-height: 24px;
}

#membercard .choiceshop .choiceshop_r {
	float: left;
	width: 900px;
	font-size: 16px;
	line-height: 24px;
}
</style>