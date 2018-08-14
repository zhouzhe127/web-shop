<!--
	**自助外卖统计
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="membercard">
		<section>
			<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
				<div slot="con-0" slot-scope="props" @click='openStore(props.data)'>
					{{props.data.oid}}
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
export default {
	data() {
		return {
			page: 1,
			num: 10,
			endTotal: 1,
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
				titleName: '积分抵扣总额',
				dataName: 'pointCash'
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
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			oid: '', //订单号
			showdetail: false //查看订单详情
		};
	},
	props: {
		phoneOroidList: Array //数据列表
	},
	methods: {
		tableEvent() {
			// console.log(currentPage, '');
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		openStore: function(item) {
			//查看订单详情
			this.oid = item.oid;
			this.showdetail = true;
			let obj = {
				oid: this.oid,
				showdetail: this.showdetail
			};
			this.$emit('phoneResult', 'phone', obj);
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		}
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
		// let obj2 = {
		// 	conStyle: {
		// 		color: '#ff9800'
		// 	}
		// };
		for (let item of this.shoptitleList) {
			if (item.dataName != 'oid' && item.dataName != 'createTime') {
				Object.assign(item, obj1);
			}
		}
	},
	mounted() {
		this.allFormList = this.phoneOroidList;
		this.setPage();
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" scoped>
</style>