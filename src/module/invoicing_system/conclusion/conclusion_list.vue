/* * @Author: zhouzhe * @Date: 2018-05-09 09:55:31 */
<template>
	<div id="waredeliver">
		<div class="serBox">
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
		</div>
		<div class="inpBox">
			<selectBtn :sorts="auditStatus" @selOn="changeBtn" :name="'审核状态'" style="margin-right:10px" ref="select1"></selectBtn>
			<selectBtn :sorts="dispatchStatus" @selOn="dispatchBtn" :name="'调度状态'" ref="select2"></selectBtn>
			<input type="text" class="search-input" v-model="upUser" maxlength="10" placeholder="请输入申请交人">
			<input type="text" class="search-input" v-model="checkUser" maxlength="10" placeholder="请输入审核人">
		</div>
		<div class="sleBox">
			<input type="text" class="search-input" v-model="bathcode" maxlength="20" placeholder="请输入申请单号">
			<div class="btnChange">
				<a @click="searchList" href="javascript:void(0);" class="blue">筛选</a>
				<a @click="searchReset" href="javascript:void(0);" class="gray">重置</a>
			</div>
		</div>
		<com-table :listName="'调度审核列表'" :titleData="titleList" :allTotal="count" :introData="introData" :listWidth="1200">
			<div slot="con-0" slot-scope="props" @click="detailBtn(props.data)">
				<span class="orBtn" v-if="props.data.auditStatus == 1 && props.data.dispatchStatus == 1">审核</span>
				<span class="orBtn" v-if="props.data.auditStatus == 1 && props.data.dispatchStatus == 2">继续审核</span>
				<span class="detailsBtn" v-if="props.data.auditStatus != 1 || props.data.dispatchStatus > 2">查看详情</span>
			</div>
			<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
			<span slot="con-2" slot-scope="props">{{auditStatus[props.data.auditStatus]}}</span>
			<span slot="con-3" slot-scope="props">{{dispatchStatus[props.data.dispatchStatus]}}</span>
			<span slot="con-5" slot-scope="props">{{shopName(props.data.shopId)}}</span>
			<span slot="con-6" slot-scope="props">{{getUserName(props.data.createUid)}}</span>
			<span slot="con-8" slot-scope="props">{{getUserName(props.data.auditUid)}}</span>
		</com-table>
		<div class="page-box">
			<page-turn @pageNum="pageChange" :isNoPaging='true' :total="pageTotal" :page="page"></page-turn>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	let shopList = storage.session('userShop').shopList;
	export default {
		data() {
			return {
				startTime: utils.getTime({
					time: new Date()
				}).start - global.timeConst.ONEMONTH,
				endTime: utils.getTime({
					time: new Date()
				}).end,
				auditStartTime: 0,
				auditEndTime: 0,
				upUser: '',
				checkUser: '',
				bathcode: '',
				page: 1,
				pageTotal: 0,
				titleList: [{
					titleName: '操作'
				},
				{
					titleName: '序号'
				},
				{
					titleName: '审核状态'
				},
				{
					titleName: '调度状态'
				},
				{
					titleName: '申请单号',
					dataName: 'code'
				},
				{
					titleName: '申请店铺/品牌'
				},
				{
					titleName: '申请人'
				},
				{
					titleName: '申请时间',
					dataName: 'createTime'
				},
				{
					titleName: '审核人'
				},
				{
					titleName: '审批时间',
					dataName: 'auditTime'
				}],
				auditStatus: ['全部', '审核中', '已取消', '审核未通过', '审核通过'],
				user: '', //所有员工
				auditType: 0, //审核状态
				dispatchStatus: ['全部', '未调度', '调度中', '未出货', '全部取消', '待入货', '已完成', '已完成（异常）', '配货完成'],
				dispatchType: 0, //调度状态
				wareIds: '', //权限下的所有仓库id
				introData: '', //列表数据
				count: '', //总条数
			};
		},
		methods: {
			async init() {
				if (parseInt(this.startTime) > parseInt(this.endTime)) {
					[this.startTime, this.endTime] = [this.endTime, this.startTime];
				}
				if (parseInt(this.auditStartTime) > parseInt(this.auditEndTime)) {
					[this.auditStartTime, this.auditEndTime] = [this.auditEndTime, this.auditStartTime];
				}
				let data = await http.invoic_getAuditList({
					data: {
						applyStartTime: parseInt(this.startTime / 1000),
						applyEndTime: parseInt(this.endTime / 1000),
						auditStartTime: parseInt(this.auditStartTime / 1000),
						auditEndTime: parseInt(this.auditEndTime / 1000),
						auditStatus: this.auditType,
						dispatchStatus: this.dispatchType,
						createUid: this.getUserId(this.upUser),
						auditUid: this.getUserId(this.checkUser),
						code: this.bathcode,
						wids: this.wareIds,
						page: this.page,
						num: 10
					}
				});
				this.introData = data.list;
				this.pageTotal = data.total;
				this.count = data.count;
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
			startTimeChange(time) {
				this.startTime = utils.getTime({
					time: time
				}).start;
			},
			endTimeChange(time) {
				this.endTime = utils.getTime({
					time: time
				}).end;
			},
			auditStartTimeChange(time) {
				this.auditStartTime = utils.getTime({
					time: time
				}).start;
			},
			auditEndTimeChange(time) {
				this.auditEndTime = utils.getTime({
					time: time
				}).end;
			},
			changeBtn(type) {
				this.auditType = type;
			},
			dispatchBtn(type) {
				this.dispatchType = type;
			},
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
				this.auditType = 0;
				this.dispatchType = 0;
				this.upUser = '';
				this.checkUser = '';
				this.bathcode = '';
				this.startTime = utils.getTime({
					time: new Date()
				}).start;
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.auditStartTime = 0;
				this.auditEndTime = 0;
				this.$refs.auditstart.timestr = '--';
				this.$refs.auditend.timestr = '--';
				this.$refs.select1.sortName = '审核状态';
				this.$refs.select1.selected = 0;
				this.$refs.select2.sortName = '调度状态';
				this.$refs.select2.selected = 0;
				this.init();
			},
			detailBtn(data) {
				this.$route.query.id = data.id;
				this.$router.push({
					path: 'conclusionList/shipmentVerify',
					query: this.$route.query
				});
			},
			pageChange(page) {
				this.page = page.page;
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
							path: '/admin/multipleExamine'
						});
					},
					type:4
				},{
					name: '批量调度',
					className: 'primary',
					fn: () => {
						this.$router.push({
							path: '/admin/selectDispatch'
						});
					},
					type:4
				}]);
			},
		},
		mounted() {
			this.getWare();
			this.addEduce();
		},
		updated() {
			if (this.$refs.auditstart && this.auditStartTime === 0) this.$refs.auditstart.timestr = '--';
			if (this.$refs.auditend && this.auditEndTime === 0) this.$refs.auditend.timestr = '--';
		},
		watch: {
			bathcode(news) {
				let reg = /[\u4e00-\u9fa5]/g;
				if (reg.test(news)) {
					this.bathcode = '';
				}
			}
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
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