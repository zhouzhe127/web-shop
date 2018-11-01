<template>
	<div class="inter_gral">
		<!-- <com-table :listHeight='80' :listName="'积分记录'" :key="index" :showTitle='1' :introData="interList" :titleData="titleList" :allTotal="count">
			<div slot="con-0" slot-scope="props">{{interData.name}}</div>
			<div slot="con-1" slot-scope="props">{{typeInfo[scope.row.type]}}</div>
			<div slot="con-2" slot-scope="props">{{ getType(scope.row.type) + scope.row.operatePoint}}</div>
			<div slot="con-3" slot-scope="props">{{scope.row.createTime | filterTime}}</div>
		</com-table> -->
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>积分纪录</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="interList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="name" label="用户" align="center">
					<template slot-scope="scope">
						<span>{{interData.name}}</span>
					</template>
				</el-table-column>
				<el-table-column label="积分来源" align="center">
					<template slot-scope="scope">
						<span>{{typeInfo[scope.row.type]}}</span>
					</template>
				</el-table-column>
				<el-table-column label="积分值" align="center">
					<template slot-scope="scope">
						<span>{{ getType(scope.row.type) + scope.row.operatePoint}}</span>
					</template>
				</el-table-column>
				<el-table-column label="记录时间" align="center">
					<template slot-scope="scope">
						<span>{{scope.row.createTime | filterTime}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 翻页 -->
		<!-- <section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section> -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				index: null,
				allTotal: 0,
				interList: [],
				page: 1,
				total: 0,
				count: 0,
				num: 10,
				typeInfo: {} //来源
			};
		},
		props: ['interData'],
		methods: {
			closeInter() {
				this.$emit('closeInter');
			},
			getType(val) {
				if (val == 1 || val == 3 || val == 6 || val == 9 || val == 11 || val == 13) {
					return '-';
				} else {
					return '+';
				}
			},
			async getData() {
				let data = {
					page: this.page, //页码
					num: this.num,
					mid: this.interData.memberId,
					fid: this.interData.id,
					type: 2
				};
				if (this.interData.memberId - 0 > 0) {
					data.fid = '0';
				}
				let res = await http.getMemberRecordList({
					data: data
				});
				this.total = res.total;
				this.interList = res.list;
				this.count = res.count;
				this.typeInfo = res.typeInfo;
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.getData();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.getData();
			},
		},
		filters: {
			filterTime(time) {
				return utils.format(time, 'yyyy-MM-dd hh:mm');
			},
			filterType(val) {
				let obj = {
					1: '店内消费',
					2: '充值',
					3: '积分商城兑换',
					4: '消费获得积分',
					5: '裂变获得积分',
					6: '微信消费',
					9: '积分抵扣',
					10: '积分强制增加',
					11: '积分强制减少',
					12: '余额强制增加',
					13: '余额强制减少',
					14: '退款失败',
					15: '卡激活',
					16: '金币记录',
					17: '积分卡券',
					24: '订单取消返还抵扣积分'
				};
				return obj[val];
			}
		},
		mounted() {
			this.getData(1);
			this.$store.commit('setPageTools', [{
				name: '返回',
				fn: () => {
					this.closeInter();
				},
				className: 'el-btn-blue'
			}]);
		},
		components: {
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		}
	};
</script>
<style lang="less" scoped>
	.inter_gral {
		position: relative;

		.inter_gral_back {
			.back_btn {
				position: absolute;
				top: -63px;
				right: 87px;
				width: 102px;
				height: 42px;
				background: #fff;
				color: RGB(179, 179, 179);
				border: 1px solid RGB(179, 179, 179);
				font-size: 16px;
			}
		}

		.inter_gral_content {
			border: 1px solid RGB(210, 210, 210);
			width: 1437px;
			margin-top: 27px;

			.articles {
				width: 100%;
				height: 53px;
				font-weight: bold;
				color: RGB(67, 65, 74);
				font-size: 16px;
				padding: 0 46px;
				line-height: 52px;

				.point {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					display: inline-block;
					background: #000;
					margin: 5px;
				}

				span {
					color: RGB(255, 60, 4);
				}
			}

			.navs {
				ul {
					background: RGB(242, 242, 242);
					height: 42px;

					li {
						width: 25%;
						text-align: center;
					}

					line-height: 41px;
				}
			}

			.details {
				ul {
					height: 62px;
					line-height: 61px;
					border-bottom: 1px solid RGB(210, 210, 210);

					li {
						width: 25%;
						text-align: center;
					}
				}
			}

			.nolist {
				width: 1436px;
				text-align: center;
				line-height: 70px;
				font-size: 24px;
				color: #E0E0E0;
			}
		}

		.turn-page {
			margin: 10px 0 30px 0;
		}

		.nav_details {
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 16px;
			color: RGB(67, 65, 74);
		}
	}
</style>