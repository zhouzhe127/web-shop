<!--
	**自助外卖统计
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="membercard">
		<section style="margin-bottom:20px;">
			<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
				<div slot="con-0" slot-scope="props">
					1
				</div>
				<div slot="con-6" slot-scope="props">
					{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
				</div>
			</com-table>
		</section>
		<section>
			<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
				<div slot="con-0" slot-scope="props" @click='openStore(props.data)'>
					{{props.data.oid}}
				</div>
				<div slot="con-1" slot-scope="props">
					{{getstatus(payType)}}
				</div>
				<div slot="con-7" slot-scope="props">
					{{props.data.vouchersPain}}({{props.data.vouchersNum}}张)
				</div>
			</com-table>
		</section>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';

export default {
	data() {
		return {
			page: 1,
			num: 10,
			endTotal: 1,
			titleList: [{
				titleName: '天数',
				dataName: 'days'
			},
			{
				titleName: '订单数',
				dataName: 'totalOrderNum'
			},
			{
				titleName: '销量',
				dataName: 'totalSales'
			},
			{
				titleName: '赠品数',
				dataName: 'totalGift'
			},
			{
				titleName: '配送总额',
				dataName: 'totalMoveFee'
			},
			{
				titleName: '优惠总额',
				dataName: 'totalDiscount'
			},
			{
				titleName: '代金券'
			},
			{
				titleName: '消费总额',
				dataName: 'totalConsumption'
			},
			{
				titleName: '微信支付',
				dataName: 'totalWeChatPain'
			},
			{
				titleName: '会员支付',
				dataName: 'totalMemberPain'
			},
			{
				titleName: '积分抵扣总额',
				dataName: 'totalPointCash'
			},			
			{
				titleName: '实收总额',
				dataName: 'totalPain'
			}
			],
			staticLists: [], //数据
			shoptitleList: [{
				titleName: '订单号',
				dataName: 'oid',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				},
				titleStyle: {
					width: 200 + 'px',
					flex: 'none',
					fontSize: 16 + 'px'
				}
			},
			{
				titleName: '状态'
			},
			{
				titleName: '下单时间',
				dataName: 'createTime',
				titleStyle: {
					width: 200 + 'px',
					flex: 'none',
					fontSize: 16 + 'px'
				}
			},
			{
				titleName: '销量 ',
				dataName: 'sales'
			},
			{
				titleName: '赠品数',
				dataName: 'gift'
			},
			{
				titleName: '配送金额',
				dataName: 'moveFee'
			},
			{
				titleName: '优惠总额',
				dataName: 'discount'
			},
			{
				titleName: '代金券'
			},
			{
				titleName: '消费金额',
				dataName: 'consumption'
			},
			{
				titleName: '微信支付',
				dataName: 'weChatPain'
			},
			{
				titleName: '会员支付',
				dataName: 'memberPain'
			},
			{
				titleName: '实收金额',
				dataName: 'pain'
			},
			{
				titleName: '顾客电话号码',
				dataName: 'phone'
			}
			],
			staticshopLists: [], //店铺查询的数据
			isPopupwindow: '',
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			allLists: [], //所有的数据  筛选订单
			oid: '', //订单号
			showdetail: false //查看订单详情
		};
	},
	methods: {
		returnShopstatic: function() {
			this.$emit('scanorderResult', 'moreday');
			this.$store.commit('setPageTools', {});
		},
		tableEvent() {
			// console.log(currentPage, '');
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		openStore: function(item) {
			//打开新增用户标签的弹窗
			this.oid = item.oid;
			this.showdetail = true;
			let obj = {
				oid: this.oid,
				showdetail: this.showdetail
			};
			this.$emit('scanorderResult', 'oneday', obj);
		},
		async getTakeoutData() {
			let data = await http.getTakeoutData({
				data: {
					taskId: this.taskId, //任务Id
					showDetail: 1, //是否查看一家店铺的数据
					showShopId: this.constructionsId, // 查询一家店铺的数据的Id
					showDay: this.oneData //查看一家店铺某一天的数据
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
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		// getdetailresult: function(res) { //从订单详情过来的
		//     this.showdetail = res;
		//     this.$store.commit('setPageTools', [{
		//         name: '返回',
		//         className: ['fd-blue'],
		//         fn: () => {
		//             this.returnShopstatic();
		//         }
		//     }])
		// }
		getstatus: function(type) {
			switch (type) {
				case 0:
					return '已完成';
					// break;
				case 1:
					return '已取消/退单';
					// break;
			}
		}
	},
	props: {
		constructionsId: String, //店铺的id
		oneData: String,
		taskId: Number,
		payType: Number
	},
	watch: {},
	components: {
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table')
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
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-blue'],
			fn: () => {
				this.returnShopstatic();
			}
		}]);
		this.getTakeoutData();
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" scoped>
</style>