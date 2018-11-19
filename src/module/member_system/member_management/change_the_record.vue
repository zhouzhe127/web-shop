<!-- 更改记录 -->
<template>
	<div class="historical_record">
		<!-- 表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>更改记录</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="listInfo.list" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="createTime" label="操作时间" align="center">
					<template slot-scope="scope">
						<span>{{translateTime(scope.row.createTime,'1')}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作类型" prop="name" align="center">
					<template slot-scope="scope">
						<span>{{filterType(scope.row.type)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="操作金额" align="center">
					<template slot-scope="scope">
						<span>{{judgeType(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="备注" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.remark == ''">无</span>
						<span v-else>{{scope.row.remark}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="操作人" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.userName}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		props: {
			mid: String,
			shopsId: String
		},
		data() {
			return {
				page: 1, //页数
				num: 10, //一页请求的条数
				total: 0, //总页数
				count: '',
				trantypeList: [{ //消费类型
					name: '店内消费',
					id: 1
				}, {
					name: '充值',
					id: 2
				}, {
					name: '积分商城兑换',
					id: 3
				}, {
					name: '消费获得积分',
					id: 4
				}, {
					name: '裂变获得积分',
					id: 5
				}, {
					name: '微信消费',
					id: 6
				}, {
					name: '微信充值',
					id: 7
				}, {
					name: '积分过期',
					id: 8
				}, {
					name: '积分抵扣',
					id: 9
				}, {
					name: '积分调整(强制增加)',
					id: 10
				}, {
					name: '积分调整(强制减少)',
					id: 11
				}, {
					name: '余额调整(强制增加)',
					id: 12
				}, {
					name: '余额调整(强制减少)',
					id: 13
				}, {
					name: '退款失败',
					id: 14
				}, {
					name: '积分卡券',
					id: 17
				}, {
					name: '评论获得积分',
					id: 18
				}, {
					name: '积分强制增加(失败)',
					id: 19
				}, {
					name: '积分强制减少(失败)',
					id: 20
				}, {
					name: '余额强制增加(失败)',
					id: 21
				}, {
					name: '余额强制减少(失败)',
					id: 22
				}, {
					name: '订单取消返还余额',
					id: 23
				}, {
					name: '订单取消返还抵扣积分',
					id: 24
				}, {
					name: '订单取消扣除获赠积分',
					id: 25
				}, {
					name: '升级获得积分',
					id: 33
				}],
				listInfo: '' //数据
			};
		},
		methods: {
			async getRecordList() { //获取记录
				let data = await http.getRecordList({
					data: {
						mid: this.mid,
						page: this.page,
						num: this.num,
						type: 1,
					}
				});
				this.listInfo = data;
				this.count = (this.page == 1) ? data.count : this.count;
				this.total = (this.page == 1) ? data.total : this.total;
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.getRecordList();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getRecordList();
			},
			translateTime: function(time, type) {
				//转换时间
				if (type) {
					return utils.format(time, 'yyyy-MM-dd hh:mm:ss');
				} else {
					return utils.format(time, 'yyyy-MM-dd');
				}
			},
			filterType: function(type) {
				let objType = '--';
				for (let item of this.trantypeList) {
					if (type == item.id) {
						objType = item.name;
					}
				}
				return objType;
			},
			judgeType: function(item) {
				// 判断操作类型 是否加还是减
				let operate;
				if (item.type == '1' || item.type == '3' || item.type == '6' || item.type == '9' || item.type == '11' || item.type ==
					'13' || item.type == '25' || item.type == '28') {
					operate = '-';
				} else {
					operate = '+';
				}

				if (item.type == '3' || item.type == '4' || item.type == '5' || item.type == '8' || item.type == '9' || item.type ==
					'10' || item.type == '11' || item.type == '33') {
					return operate + item.operatePoint;
				} else {
					if (item.type == '1' || item.type == '6') {
						return operate + (parseInt(Number(item.operateAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
					} else if (item.type == '2') {
						return operate + (parseInt(Number(item.rechargeAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
					} else {
						if (this.bannerIndex == 2) {
							return operate + (Number(item.operatePoint));
						} else {
							return operate + (Number(item.operateAmount));
						}
					}
				}
			},
		},
		mounted() {
			this.getRecordList();
		}
	};
</script>
<style scoped>
	.historical_record {
		width: 100%;
		height: 100%;
	}

	.historical_record .searchbar {
		width: 100%;
		height: 40px;
		margin-bottom: 20px;
	}

	.historical_record .searchbar .selbox {
		margin-right: 15px;
	}
</style>