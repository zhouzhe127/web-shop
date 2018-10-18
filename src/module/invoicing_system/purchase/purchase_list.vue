/*
* @Author: zhouzhe
* @Date: 2018-10-10 15:02:24
*/

<template>
	<div class="purlist">
		<div class="asideone">
			<div class="sleType">
				<el-select v-model="typeValue" placeholder="全部类型">
					<el-option v-for="item in typeCate" :key="item.status" :label="item.name" :value="item.status"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-input v-model="orderCode" placeholder="采购单号"></el-input>
			</div>
			<div class="timebox">
				<span>提交时间：</span>
				<el-date-picker v-model="applytimeAll" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="timebox">
				<span>审核时间：</span>
				<el-date-picker v-model="audittimeAll" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
				</el-date-picker>
			</div>
		</div>
		<div class="asideone">
			<div class="sleType">
				<el-input v-model="applyUser" placeholder="申请人"></el-input>
			</div>
			<div class="sleType">
				<el-input v-model="auditUser" placeholder="审核人"></el-input>
			</div>
			<div class="sleType">
				<el-button @click="searchList" type="primary">筛选</el-button>
				<el-button @click="searchReset" type="info">重置</el-button>
			</div>
		</div>
		<div class="listBox">
			<el-table :data="tableData" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="date" label="序号" fixed width="100" type="index" :index="indexMethod">
				</el-table-column>
				<el-table-column label="采购单状态">
					<template slot-scope="scope">
						<span>{{getstatus(scope.row.status)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="采购单号">
				</el-table-column>
				<el-table-column label="提交时间">
					<template slot-scope="scope">
						<div>{{getTime(scope.row.createTime)}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="createUser" label="申请人">
				</el-table-column>
				<el-table-column label="审核时间">
					<template slot-scope="scope">
						<div>{{getTime(scope.row.auditTime)}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="auditUser" label="审核人">
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="100">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="webstyle==1&&scope.row.status==0" @click="toDetail(scope.row.id)">审核</el-button>
						<el-button type="text" size="small" @click="toDetail(scope.row.id)" v-else>查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="page-box">
			<el-pagination @current-change="pageChange" @size-change="sizeChange" background :current-page="page" :page-sizes="[10, 20, 50]"
			 :page-size="num" layout="sizes, prev, pager, next, jumper" :total="Number(allTotal)"></el-pagination>
		</div>
	</div>
</template>
<script>
	import global from 'src/manager/global';
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				typeValue: '',
				typeCate: [],
				orderCode: '', //采购单号
				applyUser: '', //申请人
				auditUser: '', //审核人
				applytimeAll: [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end], //申请时间
				audittimeAll: [], //审核时间
				tableData: [],
				page: 1,
				allTotal: 0,
				num: 10, //每页显示多少条
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				}
			};
		},
		props: ['webstyle'], //0为采购单列表1为审核列表
		methods: {
			searchList() {
				this.getList();
			},
			searchReset() {
				this.page = 1;
				this.num = 10;
				this.typeValue = '';
				this.orderCode = '';
				this.applytimeAll = [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end];
				this.audittimeAll = [];
				this.applyUser = '';
				this.auditUser = '';
				this.getList();
			},
			pageChange(e) {
				this.page = e;
				this.getList();
			},
			sizeChange(num) {
				this.num = num;
				this.getList();
			},
			indexMethod(index) {
				return (index + 1) + (this.page - 1) * this.num;
			},
			async getList() {
				let audiStartTime = this.audittimeAll[0] ? parseInt((this.audittimeAll[0] || 0) / 1000) : '';
				let audiEndtTime = this.audittimeAll[1] ? parseInt((utils.getTime({
					time: this.audittimeAll[1] || 0
				}).end) / 1000) : '';
				let url = this.webstyle == 0 ? 'InvoigetPurchaseOrderList' : 'InvoigetPurchaseOrderReviewList';
				let data = await http[url]({
					data: {
						status: this.typeValue,
						code: this.orderCode,
						beginCreateTime: parseInt(this.applytimeAll[0] / 1000), //提交时间
						endCreateTime: parseInt(utils.getTime({
							time: this.applytimeAll[1]
						}).end / 1000),
						auditUser: this.auditUser,
						beginAuditTime: audiStartTime, //审核时间
						endAuditTime: audiEndtTime,
						createUser: this.applyUser,
						page: this.page,
						num: this.num
					}
				});
				this.tableData = data.list;
				this.allTotal = data.count;
			},
			async getStatusList() {
				// userArr = await http.getUserList();//获取员工
				let url = this.webstyle == 0 ? 'InvoigetPurchaseOrderStatus' : 'InvoigetPurchaseOrderReviewStatus';
				let data = await http[url]();
				this.typeCate = data;
			},
			// getUserName(need,type) { //type:1获取员工姓名type:2获取员工id
			// 	let keys = type==1? 'userId':'userName';
			// 	for (let item of userArr) {
			// 		if (Number(item[keys]) === need) {
			// 			return type==1?item.userName:item.userId;
			// 		}
			// 	}
			// 	return type==1?'--':null;
			// },
			getstatus(id) {
				for (let item of this.typeCate) {
					if (item.status == id) {
						return item.name;
					}
				}
				return '--';
			},
			getTime(time) {
				if (time == 0) {
					return '--';
				}
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
			toDetail(id) {
				let query = this.$route.query;
				Object.assign(query, {
					id: id
				});
				this.$router.push({
					path: 'purchaseManagement/detail',
					query: query
				});
			}
		},
		activated() {
			this.getStatusList();
			this.getList();
		},
		mounted() {
			if (this.$route.path == '/admin/purchaseManagement') {
				this.getStatusList();
				this.getList();
			}
		}
	};
</script>
<style lang='less' scoped>
	.topstyle {
		&::before {
			content: '';
			display: inline-block;
			width: 100%;
			height: 15px;
		}
	}

	.purlist {
		.asideone {
			.sleType {
				width: 170px;
				margin-right: 10px;
				display: inline-block;
				.topstyle
			}

			.timebox {
				display: inline-block;
				margin-right: 10px;
				.topstyle
			}
		}

		.listBox {
			margin-top: 20px;
		}

		.page-box {
			margin-top: 15px;
		}
	}
</style>