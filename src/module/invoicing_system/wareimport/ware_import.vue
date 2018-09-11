/* * @Author: zhouzhe * @Date: 2018-04-26 13:50:23 */
<template>
	<div id="wareImport">
		<el-radio-group v-model="tabactive" fill="rgb(255, 152, 0)" size="medium" @change="tebClick">
			<el-radio-button v-for="(item,index) in tebData" :key="index" :label="index">{{item}}</el-radio-button>
		</el-radio-group>
		<el-tooltip content="Top center" placement="top">
		</el-tooltip>
		<div class="serBox">
			<h1>操作时间：</h1>
			<div class="timer">
				<el-date-picker v-model="timeAll" type="daterange" align="right" unlink-panels range-separator="至"
				    start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
				</el-date-picker>
			</div>
			<div class="inpBox">
				<el-input v-model="createUser" placeholder="请输入操作人"></el-input>

			</div>
			<div class="btnChange" style="display:inline-block;">
				<el-button @click="searchList" type="primary">筛选</el-button>
				<el-button @click="searchReset" type="info">重置</el-button>
			</div>
		</div>
		<el-table :data="listData" style="width: 100%;margin-top:20px;" stripe>
			<el-table-column :label="`入库导入记录 · 共${allTotal}个条目`" class-name='tabletop'>
				<el-table-column label="操作" style="text-aline:center;">
					<template slot-scope="scope">
						<div @click="getDetail(scope.row)" class="detailsBtn">查看详情</div>
					</template>
				</el-table-column>
				<el-table-column label="操作时间">
					<template slot-scope="scope">
						<div>{{getTime(scope.row.createTime)}}</div>
					</template>
				</el-table-column>
				<el-table-column label="操作人" prop="creator"></el-table-column>
			</el-table-column>
		</el-table>
		<div class="page-box">
			<el-pagination @current-change="pageChange" :current-page="page" layout="total, prev, pager, next, jumper" :total="allTotal"></el-pagination>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import Timer from 'src/verdor/timer';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				titleList: [{
						titleName: '操作'
					},
					{
						titleName: '操作时间'
					},
					{
						titleName: '操作人',
						dataName: 'creator'
					}
				],
				allTotal: 0,
				page: 1,
				pageTotal: 0,
				timeAll:[utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start,utils.getTime({
					time: new Date()
				}).end],
				createUser: '', //操作人
				tebData: ['商品', '物料'],
				tabactive: 0,
				listData: [],
				shopId: storage.session('userShop').currentShop.id,
				time: '',
				checkAlert: false,
				checkFile: '',
				cdn: global.cdnUrl,
				inventConfigure: 0,
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
				},
			};
		},
		// mounted() {
		// 	this.inventConfigure = storage.session('inventConfigure')||0;
		// 	this.tabactive = this.inventConfigure==0?0:this.inventConfigure-1;
		// 	this.heardBtn();
		// 	this.init();
		// },
		activated() {
			this.inventConfigure = storage.session('inventConfigure') || 0;
			this.tabactive = this.inventConfigure == 0 ? 0 : this.inventConfigure - 1;
			this.heardBtn();
			this.init();
		},
		methods: {
			async init() {
				// if (this.startTime > this.endTime)[this.startTime, this.endTime] = [this.endTime, this.startTime];
				let data = await http.invoicing_getBatchStorageRecords({
					data: {
						startTime: parseInt(this.timeAll[0] / 1000),
						endTime: parseInt(this.timeAll[1] / 1000),
						page: this.page,
						creator: this.createUser,
						num: 10,
						type: Number(this.tabactive) + 1 //1商品；2物料；3服装 为空则获取全部
					}
				});
				this.listData = data.list;
				this.page = data.page;
				this.allTotal = Number(data.rows);
				this.pageTotal = data.count;
			},
			getDetail(props) {
				storage.session('detailNeed', props);
				this.$router.push({
					path: 'wareImport/wareProsperity'
				});
			},
			tebClick(index) {
				this.tabactive = index;
				this.searchReset();
			},
			searchList() {
				this.init();
			},
			searchReset() {
				this.createUser = '';
				this.page = 1;
				this.timeAll=[utils.getTime({
					time: new Date() - global.timeConst.ONEMONTH
				}).start,utils.getTime({
					time: new Date()
				}).end];
				this.init();
			},
			pageChange(page) {
				this.page = page;
				this.init();
			},
			heardBtn() {
				this.$store.commit('setPageTools', [{
						name: '导出模板',
						className: 'success',
						type:5,
						fn: () => {
							if (this.tabactive == 1) {
								window.location.href = this.cdn + '/suppliestemple.xlsx?v=1';
							}
							if (this.tabactive == 0) {
								window.location.href = this.cdn + '/goodstemple.xlsx?v=1';
							}
						}
					},
					{
						name: '入库导入',
						className: 'success',
						inputName: 'file',
						type:1,
						fn: async () => { //e
							let data = await http.invoicing_warehouseImport({
								data: {
									shopId: this.shopId
								},
								timeout: 60000,
								formId: 'form_import_good'
							});
							this.checkFile = data;
							this.time = Timer.add(this.checkUp, 2000, 200);
							this.$store.commit('setWin', {
								title: '提示',
								winType: 'alert',
								content: '正在上传....',
								maskShow: false,
								callback: (str) => {
									if (str != 'ok') {
										Timer.clear(this.time);
									} else {
										this.checkAlert = true;
									}
								}
							});

						},
					}
				]);
			},
			async checkUp() {
				let data = await http.invoicing_taskInfo({
					data: {
						taskId: this.checkFile
					}
				});
				if (data.status == 3) {
					if (this.checkAlert) {
						this.alert('上传成功');
						this.checkAlert = false;
						this.init();
					} else {
						this.$store.commit('setWinContent', '上传成功');
						this.init();
					}
					Timer.clear(this.time);
				}
				if (data.status == 2) {
					if (this.checkAlert) {
						this.alert('上传失败');
						this.checkAlert = false;
					} else {
						this.$store.commit('setWinContent', '上传失败');
					}
					Timer.clear(this.time);
				}
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			}
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		}
	};
</script>
<style lang="less" scoped>
	#wareImport {
		.el-input {
			width: 200px;
		}

		.tabletop {
			background-color: #ffffff;
			text-align: center;
		}

		.detailsBtn {
			color: #29abe2;
			cursor: pointer;
		}

		@media only screen and (max-width:1150px) {
			.btnChange {
				margin-top: 15px;
			}
		}
		.inpBox{
			display: inline-block;
			margin: 0 15px;
		}
		@import url("./warecom");
	}
</style>