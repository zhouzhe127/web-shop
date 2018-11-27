/** * 扫码支付统计 * *miaochuan.sha */
<template>
	<div id="membercard">
		<section v-if="showType =='static'">
			<!-- 选择收款码 -->
			<div class="payment clearfix">
				<div class="paymentbox fl" @click="openPaycode">
					<el-input placeholder="请选择收款码" v-model="paymentCode" :disabled="true" suffix-icon="el-icon-plus">
					</el-input>
				</div>
				<div class="paymentbox fl">
					<el-button type="primary" style="width:120px;" @click="getScanPayOrderByCodes">筛选</el-button>
					<el-button type="info" style="width:120px;" @click="reset">重置</el-button>
				</div>
			</div>
			<!-- 收款码 -->
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
				<!-- <com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="titleList" :introData="staticLists">
					<div slot="con-4" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table> -->
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
			<!-- <section>
				<com-table :listHeight='80' :listWidth="1400" :showHand="false" :titleData="shoptitleList" :introData="formList">
					<div slot="con-0" slot-scope="props" @click="getDetail(props.data)">
						查看详情
					</div>
					<div slot="con-5" slot-scope="props">
						{{props.data.totalVouchersPain}}({{props.data.totalVouchersNum}}张)
					</div>
				</com-table>
			</section> -->
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
					<el-table-column fixed prop="shopId" label="操作" align="center">
						<template slot-scope="scope">
							<span @click="getDetail(scope.row)" style="color:#e1bb4a;">查看详情</span>
						</template>
					</el-table-column>
					<el-table-column label="日期" prop="day" align="center">
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
			<!-- <section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section> -->
			<div class="pageWrap">
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<!-- 员工码弹窗 -->
			<paymentCode v-if="showCode" :shopIds="dynamicTags" :constructionsName='constructionsName' :constructionsId="constructionsId" @chooseShop="backShopId"></paymentCode>
		</section>
		<section v-if="showType =='order'">
			<scancode-order @scanorderResult="getscanorder" :constructionsName="constructionsName" :startTime="startTime" :endTime='endTime' :constructionsId="constructionsId" :isOpenTime="isOpenTime" :oneData='oneData' :taskId="taskId" :codes="codes"></scancode-order>
		</section>
	</div>
</template>
<script type='text/javascript'>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			page: 1,
			num: 10,
			endTotal: 1,
			staticLists: [], //数据
			allFormList: [], //店铺查询的所有数据
			formList: [], //展示的数据
			showType: 'static',
			oneData: '', //一天的日期
			paymentCode: '', //选择的收款码
			showCode: false, //打开员工码的弹窗
			staffId: [], //选中的员工码
			dynamicTags: [],
			codes: [] //筛选的codes
		};
	},
	props: {
		constructionsName: String, //店铺名称
		startTime: Number, //开始时间
		endTime: Number, //结束时间
		constructionsId: String, //店铺的id
		isOpenTime: Boolean,
		taskId: Number
	},
	methods: {
		returnStore: function() {
			this.$emit('throwWinResult', 'all');
		},
		// getPageNum: function(obj) {
		// 	this.page = obj.page;
		// 	this.num = obj.num;
		// 	this.setPage();
		// },
		getDetail: function(item) {
			this.showType = 'order';
			this.oneData = item.day;
		},
		getscanorder: function(res) {
			this.showType = res;
			this.setTitle();
			// this.$store.commit('setPageTools', [{
			// 		name: '返回',
			// 		className: ['fd-blue'],
			// 		fn: () => {
			// 			this.returnStore();
			// 		}
			// 	},
			// 	{
			// 		name: '导出',
			// 		className: ['fd-blue'],
			// 		fn: () => {
			// 			this.Exportcodes();
			// 		}
			// 	}
			// ]);
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		async getScanPayData() {
			let data = await http.getScanPayData({
				data: {
					taskId: this.taskId,
					showDetail: 1,
					showShopId: this.constructionsId,
					showDay: ''
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
		async Export() {
			await http.exportScanPayData({
				data: {
					taskId: this.taskId,
					showDetail: 1,
					showShopId: this.constructionsId,
					showDay: '',
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
		openPaycode: function() { //打开快捷支付统计
			//console.log('222222')
			this.showCode = true;
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
		async getScanPayOrderByCodes() {
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
			this.codes = codes;
			let data = await http.getScanPayOrderByCodes({
				data: {
					showShopId: this.constructionsId,
					codes: this.codes.join(','),
					taskId: this.taskId,
					showDay: '',
					isExport: 0
				}
			});
			if (data) {
				this.staticLists = [];
				this.staticLists.push(data.total); //头部的数据
				this.allFormList = data.list; //身体的数据
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		reset: function() { //重置
			this.dynamicTags = [];
			this.paymentCode = '请选择收款码';
			this.getScanPayData();
			this.codes = [];
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
		async codesExport() {
			await http.exportgetScanPayOrderByCodes({
				data: {
					showShopId: this.constructionsId,
					codes: this.codes.join(','),
					taskId: this.taskId,
					showDay: '',
					isExport: 1
				}
			});
		},
		Exportcodes: function() {
			if (this.codes && this.codes != '') {
				this.codesExport();
			} else {
				this.Export();
			}
		},
		setTitle: function() {
			this.$store.commit('setPageTools', [{
					name: '返回',
					className: 'el-btn-blue',
					fn: () => {
						this.returnStore();
					}
				},
				{
					name: '导出',
					className: 'el-btn-yellow',
					fn: () => {
						this.Exportcodes();
					}
				}
			]);
		}
	},
	components: {
		pageElement: () =>
			import( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		'scancode-order': () =>
			import( /*webpackChunkName: "scancode_oredersearch"*/ './scancode_oredersearch'),
		paymentCode: () =>
			import( /*webpackChunkName: "scancode_payment_codewin"*/ './scancode_payment_codewin')
	},
	mounted() {
		// this.$store.commit('setPageTools', [{
		// 		name: '返回',
		// 		className: ['fd-blue'],
		// 		fn: () => {
		// 			this.returnStore();
		// 		}
		// 	},
		// 	{
		// 		name: '导出',
		// 		className: ['fd-blue'],
		// 		fn: () => {
		// 			this.Exportcodes();
		// 		}
		// 	}
		// ]);
		this.setTitle();
		this.getScanPayData();
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

#membercard .payment {
	height: 40px;
	margin-bottom: 20px;
}

#membercard .payment .paymentbox {
	height: 40px;
	margin-right: 20px;
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

.el-tag+.el-tag {
	margin-left: 10px;
	margin-bottom: 10px;
}
</style>