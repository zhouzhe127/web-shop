/* * @Author: zhouzhe * @Date: 2018-05-09 09:55:31 */
<template>
	<div id="waredeliver">
		<div class="asideone">
			<!-- <div class="sleType">
				<el-select v-model="typeValue" placeholder="全部类型">
					<el-option v-for="item in auditStatus" :key="item.status" :label="item.name" :value="item.status"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-input v-model="orderCode" placeholder="采购单号"></el-input>
			</div> -->
			<div class="timebox">
				<span>提交时间：</span>
				<el-date-picker v-model="applytimeAll" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="timebox">
				<span>审批时间：</span>
				<el-date-picker v-model="audittimeAll" type="daterange" align="right" unlink-panels range-separator="至"
				 start-placeholder="开始日期" end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<div class="sleType">
				<el-select v-model="auditType" placeholder="审核状态">
					<el-option v-for="(item,index) in auditStatus" :key="index" :label="item" :value="index"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-select v-model="dispatchType" placeholder="调度状态">
					<el-option v-for="(item,index) in dispatchStatus" :key="index" :label="item" :value="index"></el-option>
				</el-select>
			</div>
			<div class="sleType">
				<el-input v-model="upUser" maxlength="10" placeholder="请输入申请人"></el-input>
			</div>
			<div class="sleType">
				<el-input v-model="checkUser" maxlength="10" placeholder="请输入审核人"></el-input>
			</div>
			<div class="sleType">
				<el-input v-model="bathcode" maxlength="20" placeholder="请输入申请单号"></el-input>
			</div>
			<div class="sleType">
				<el-button @click="searchList" type="primary">筛选</el-button>
				<el-button @click="searchReset" type="info">重置</el-button>
			</div>
		</div>
		<!-- <div class="serBox">
			<h1>提交时间：</h1>
			<div class="timer">
				<calendar :only="false" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<span>-</span>
			<div class="timer" style="margin-right: 10px;">
				<calendar :only="false" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			</div>
			<div class="rightEvt">
				<h1>审批时间：</h1>
				<div class="timer">
					<calendar ref="auditstart" :only="false" :time="auditStartTime" :format="'yyyy年MM月dd日'" @emit="auditStartTimeChange"></calendar>
				</div>
				<span>-</span>
				<div class="timer" style="margin-right: 10px;">
					<calendar ref="auditend" :only="false" :time="auditEndTime" :format="'yyyy年MM月dd日'" @emit="auditEndTimeChange"></calendar>
				</div>
			</div>
		</div> -->
		<!-- <div class="inpBox">
			<selectBtn :sorts="auditStatus" @selOn="changeBtn" :name="'审核状态'" style="margin-right:10px" ref="select1"></selectBtn>
			<selectBtn :sorts="dispatchStatus" @selOn="dispatchBtn" :name="'调度状态'" ref="select2"></selectBtn>
			<input type="text" class="search-input" v-model="upUser" maxlength="10" placeholder="请输入申请人">
			<input type="text" class="search-input" v-model="checkUser" maxlength="10" placeholder="请输入审核人">
		</div>
		<div class="sleBox">
			<input type="text" class="search-input" v-model="bathcode" maxlength="20" placeholder="请输入申请单号">
			<div class="btnChange">
				<a @click="searchList" href="javascript:void(0);" class="blue">筛选</a>
				<a @click="searchReset" href="javascript:void(0);" class="gray">重置</a>
			</div>
		</div> -->
		<div class="listBox">
			<div class="tableHeard">
				<span>调度审核列表&nbsp;·&nbsp;共<strong>{{count}}</strong>个条目</span>
			</div>
			<el-table :data="introData" border style="width: 100%" :header-cell-style="{'background':'#f5f7fa'}" stripe>
				<el-table-column prop="date" label="操作" min-width="40px">
					<template slot-scope="scope">
						<el-button type="text" size="small" v-if="scope.row.auditStatus == 1 && scope.row.dispatchStatus == 1" @click="detailBtn(scope.row)">审核</el-button>
						<el-button type="text" size="small" v-if="scope.row.auditStatus == 1 && scope.row.dispatchStatus == 2" @click="detailBtn(scope.row)">继续审核</el-button>
						<el-button type="text" size="small" v-if="scope.row.auditStatus != 1 || scope.row.dispatchStatus > 2" @click="detailBtn(scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
				<el-table-column label="序号" width="50" type="index" :index="indexMethod"></el-table-column>
				<el-table-column prop="code" label="审核状态">
					<template slot-scope="scope">
						<div>{{auditStatus[scope.row.auditStatus]}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="code" label="调度状态">
					<template slot-scope="scope">
						<div>{{dispatchStatus[scope.row.dispatchStatus]}}</div>
					</template>
				</el-table-column>
				<el-table-column label="申请单号" prop="code"></el-table-column>
				<el-table-column prop="createUser" min-width="100px" label="申请店铺/品牌">
					<template slot-scope="scope">
						<div>{{shopName(scope.row.shopId)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="申请人">
					<template slot-scope="scope">
						<div>{{getUserName(scope.row.createUid)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="申请时间">
					<template slot-scope="scope">
						<div>{{getTime(scope.row.createTime)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="审核人">
					<template slot-scope="scope">
						<div>{{getUserName(scope.row.auditUid)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="审批时间">
					<template slot-scope="scope">
						<div>{{getTime(scope.row.auditTime)}}</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- <com-table :listName="'调度审核列表'" :titleData="titleList" :allTotal="count" :introData="introData" :listWidth="1200">
			<div slot="con-0" slot-scope="props">
				<span class="orBtn" v-if="props.data.auditStatus == 1 && props.data.dispatchStatus == 1" @click="detailBtn(props.data)">审核</span>
				<span class="orBtn" v-if="props.data.auditStatus == 1 && props.data.dispatchStatus == 2" @click="detailBtn(props.data)">继续审核</span>
				<span class="detailsBtn" v-if="props.data.auditStatus != 1 || props.data.dispatchStatus > 2" @click="detailBtn(props.data)">查看详情</span>
			</div>
			<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
			<span slot="con-2" slot-scope="props">{{auditStatus[props.data.auditStatus]}}</span>
			<span slot="con-3" slot-scope="props">{{dispatchStatus[props.data.dispatchStatus]}}</span>
			<span slot="con-5" slot-scope="props">{{shopName(props.data.shopId)}}</span>
			<span slot="con-7" slot-scope="props">{{getTime(props.data.createTime)}}</span>
			<span slot="con-6" slot-scope="props">{{getUserName(props.data.createUid)}}</span>
			<span slot="con-8" slot-scope="props">{{getUserName(props.data.auditUid)}}</span>
			<span slot="con-9" slot-scope="props">{{getTime(props.data.auditTime)}}</span>
		</com-table> -->
		<div class="page-box">
			<!-- <page-turn @pageNum="pageChange" :isNoPaging='true' :total="pageTotal" :page="page"></page-turn> -->
			<el-pagination @current-change="pageChange" background :current-page="page" layout="prev, pager, next, jumper"
			 :total="Number(count)"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	let shopList = storage.session('userShop').shopList;
	export default {
		data() {
			return {
				applytimeAll: [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end], //申请时间
				audittimeAll: [],
				// auditStartTime: 0,
				// auditEndTime: 0,
				upUser: '',
				checkUser: '',
				bathcode: '',
				page: 1,
				pageTotal: 0,
				auditStatus: ['全部', '审核中', '已取消', '审核未通过', '审核通过'],
				user: '', //所有员工
				auditType: '', //审核状态
				dispatchStatus: ['全部', '未调度', '配货中', '未出货', '全部取消', '待入货', '已完成', '已完成（异常）', '配货完成'],
				dispatchType: '', //调度状态
				wareIds: '', //权限下的所有仓库id
				introData: [], //列表数据
				count: '', //总条数
			};
		},
		methods: {
			async init() {
				if(!this.audittimeAll) this.audittimeAll = [];
				if(!this.applytimeAll) this.applytimeAll = [];
				let audiStartTime = this.audittimeAll[0] ? parseInt((this.audittimeAll[0] || 0) / 1000) : '';
				let audiEndtTime = this.audittimeAll[1] ? parseInt((utils.getTime({
					time: this.audittimeAll[1] || 0
				}).end) / 1000) : '';
				let applyStartTime = this.applytimeAll[0] ? parseInt((this.applytimeAll[0] || 0) / 1000) : '';
				let applyEndtTime = this.applytimeAll[1] ? parseInt((utils.getTime({
					time: this.applytimeAll[1] || 0
				}).end) / 1000) : '';
				let data = await http.invoic_getAuditList({
					data: {
						applyStartTime: applyStartTime,
						applyEndTime: applyEndtTime,
						auditTimeStart: audiStartTime,
						auditTimeEnd: audiEndtTime,
						auditStatus: this.auditType || 0,
						dispatchStatus: this.dispatchType || 0,
						uName: this.upUser,
						auditor: this.checkUser,
						code: this.bathcode,
						wids: this.wareIds,
						page: this.page,
						type: 1,
						num: 10,
						isAuditor: 1

					}
				});
				this.introData = data.list;
				this.pageTotal = data.total;
				this.count = data.rows;
			},
			async getWare() { //获取有权限的仓库与员工
				let data = await http.warehouseList();
				let user = await http.getUserList();
				let arr = [];
				for (let item of data) {
					arr.push(item.id);
				}
				this.wareIds = arr.join(',');
				this.auditStartTime = 0;
				this.auditEndTime = 0;
				this.user = user;
				storage.session('user', this.user);
				this.init();
			},
			getUserName(id) { //获取员工姓名
				for (let item of this.user) {
					if (Number(item.userId) === Number(id)) {
						return item.userName;
					}
				}
				return '--';
			},
			getUserId(name) { //获取员工ID
				let arr = [];
				for (let item of this.user) {
					if (item.userName === name) {
						arr.push(item.userId);
					}
				}
				if (arr.length > 0) {
					return arr.join(',');
				} else {
					return '';
				}
			},
			getTime(time) {
				if (!time || Number(time) == 0) {
					return '--';
				}
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd');
			},
			// startTimeChange(time) {
			// 	this.startTime = utils.getTime({
			// 		time: time
			// 	}).start;
			// },
			// endTimeChange(time) {
			// 	this.endTime = utils.getTime({
			// 		time: time
			// 	}).end;
			// },
			// auditStartTimeChange(time) {
			// 	this.auditStartTime = utils.getTime({
			// 		time: time
			// 	}).start;
			// },
			// auditEndTimeChange(time) {
			// 	this.auditEndTime = utils.getTime({
			// 		time: time
			// 	}).end;
			// },
			// changeBtn(type) {
			// 	this.auditType = type;
			// },
			// dispatchBtn(type) {
			// 	this.dispatchType = type;
			// },
			searchList() {
				if ((this.upUser && this.getUserId(this.upUser) == '') || (this.checkUser && this.getUserId(this.checkUser) ==
						'')) {
					this.introData = '';
					this.pageTotal = 1;
					this.count = 0;
				} else {
					this.init();
				}
			},
			searchReset() {
				this.auditType = '';
				this.dispatchType = '';
				this.upUser = '';
				this.checkUser = '';
				this.bathcode = '';
				this.applytimeAll = [utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start, utils.getTime({
					time: new Date()
				}).end];
				this.audittimeAll = [];
				this.init();
			},
			detailBtn(data) {
				this.$route.query.id = data.id;
				this.$router.push({
					path: '/admin/conclusionList/shipmentVerify',
					query: this.$route.query
				});
			},
			pageChange(page) {
				this.page = page;
				this.init();
			},
			shopName(id) {
				for (let item of shopList.brand) {
					if (item.id == id) {
						return item.name;
					} else {
						if (item.direct) {
							for (let list of item.direct) {
								if (list.id == id) {
									return `${item.name}-${list.name}`;
								}
							}
						}
						if (item.franchise) {
							for (let list of item.franchise) {
								if (list.id == id) {
									return `${item.name}-${list.name}`;
								}
							}
						}
					}
				}
				for (let item of shopList.noBrand) {
					if (item.id == id) {
						return item.name;
					}
				}
			},
			addEduce() {
				this.$store.commit('setPageTools', [{
					name: '批量审核',
					className: 'primary',
					fn: () => {
						this.$router.push({
							path: '/admin/conclusionList/multipleExamine'
						});
					},
					type: 4
				}, {
					name: '批量调度',
					className: 'primary',
					fn: () => {
						this.$router.push({
							path: '/admin/conclusionList/selectDispatch'
						});
					},
					type: 4
				}]);
			},
			indexMethod(index) {
				return (index + 1) + (this.page - 1) * 10;
			},
		},
		mounted() {
			if (this.$route.path == '/admin/conclusionList') {
				this.addEduce();
			}
		},
		activated() {
			this.getWare();
		},
		watch: {
			bathcode(news) {
				let reg = /[\u4e00-\u9fa5]/g;
				if (reg.test(news)) {
					this.bathcode = '';
				}
			},
			// applytimeAll(news){
			// 	console.log(news);
			// 	if(!news){
			// 		this.applytimeAll = [];
			// 	}
			// },
			// audiStartTime(news){
			// 	if(!news){
			// 		this.audiStartTime = [];
			// 	}
			// },
			$route() {
				if (this.$route.path == '/admin/conclusionList') {
					this.addEduce();
				}
			}
		},
		components: {
			comTable: () =>
				import( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			calendar: () =>
				import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			pageTurn: () =>
				import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		}
	};
</script>
<style lang='less' scoped>
	@media only screen and (max-width:1650px) {
		.sleBox {
			margin-top: 15px;
		}
	}

	@media only screen and (max-width:1255px) {
		.rightEvt {
			margin-top: 15px;
		}

		.inpBox input {
			width: 150px !important;
		}
	}

	#waredeliver {
		margin-top: 10px;

		.topstyle {
			&::before {
				content: '';
				display: inline-block;
				width: 100%;
				height: 15px;
			}
		}

		.asideone {
			margin-bottom: 15px;

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


		.serBox {
			h1 {
				display: inline-block;
			}

			.timer {
				display: inline-block;
			}

			.rightEvt {
				display: inline-block;
			}
		}

		.inpBox {
			margin-top: 15px;
			display: inline-block;

			input {
				width: 200px;
				height: 40px;
				text-indent: 10px;
				margin-left: 10px;
				display: inline-block;
			}
		}

		.sleBox {
			display: inline-block;

			h1 {
				margin-left: 10px;
				display: inline-block;
			}

			.btnChange {
				display: inline-block;

				a {
					width: 100px;
					height: 40px;
					line-height: 40px;
					margin-left: 10px;
				}
			}

			input {
				width: 200px;
				height: 40px;
				text-indent: 10px;
				display: inline-block;
			}
		}

		.tableHeard {
			border: 1px #ebeef5 solid;
			border-bottom: none;
			padding: 15px;

			strong {
				color: #e1bb4a;
			}
		}

		.orBtn {
			color: orange;
			cursor: pointer;
		}

		.detailsBtn {
			color: #29abe2;
			cursor: pointer;
		}

		.page-box {
			margin-top: 10px;
		}
	}
</style>