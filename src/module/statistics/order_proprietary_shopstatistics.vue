<!-- 
* 自助外卖统计
**
*
 -->
<template>
	<div id="membercard">
		<section v-if="showType =='static'">
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
					<div slot="con-6" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<section>
				<com-table @tableEvent="tableEvent" :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
					<div slot="con-0" slot-scope="props" @click="getDetail(props.data)">
						查看详情
					</div>
					<div slot="con-7" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<section v-if="showType =='order'">
			<scancode-order @scanorderResult="getscanorder" :constructionsName="constructionsName" :startTime="startTime" :endTime='endTime' :constructionsId="constructionsId" :isOpenTime="isOpenTime" :oneData='oneData' :taskId="taskId" :payTypes='payTypes'></scancode-order>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
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
				titleName: '操作',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '日期 ',
				dataName: 'day'
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
				titleName: '配送金额',
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
				titleName: '消费金额',
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
				titleName: '实收金额',
				dataName: 'totalPain'
			}
			],
			allFormList: [], //店铺查询的所有数据
			formList: [], //展示的数据
			showType: 'static',
			oneData: '' //一天的日期
		};
	},
	props: {
		constructionsName: String, //店铺名称
		startTime: Number, //开始时间
		endTime: Number, //结束时间
		constructionsId: String, //店铺的id
		isOpenTime: Boolean,
		taskId: Number,
		payTypes: Number //类型
	},
	methods: {
		returnStore: function() {
			this.$emit('throwWinResult', 'all');
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
		getDetail: function(item) {
			this.showType = 'order';
			this.oneData = item.day;
		},
		getscanorder: function(res) {
			this.showType = res;
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnStore();
				}
			}]);
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		async getTakeoutData() {
			let data = await http.getTakeoutData({
				data: {
					taskId: this.taskId, //任务Id
					showDetail: 1, //是否查看一家店铺的数据
					showShopId: this.constructionsId, // 查询一家店铺的数据的Id
					showDay: '' //查看一家店铺某一天的数据
				}
			});
			if (data) {
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.days; //身体的数据
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
		}
	},
	watch: {},
	components: {
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		'scancode-order': () =>
			import ( /*webpackChunkName: "order_ordersearch"*/ './order_ordersearch')
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
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-blue'],
			fn: () => {
				this.returnStore();
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
#membercard {
	width: 100%;
	height: 100%;
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