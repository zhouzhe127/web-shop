/* * @Author: zhouzhe * @Date: 2018-04-26 13:50:23 */
<template>
	<div id="wareImport">
		<!-- <el-tooltip content="Top center" placement="top">
			<el-button>Dark</el-button>
		</el-tooltip> -->
		<ul class="tebBox" v-if="inventConfigure==0">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul>
		<div class="serBox">
			<h1>操作时间：</h1>
			<div class="timer">
				<calendar :only="false" :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<span>-</span>
			<div class="timer" style="margin-right: 10px;">
				<calendar :only="false" :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			</div>
			<input type="text" class="search-input" v-model="createUser" placeholder="请输入操作人">
			<div class="btnChange" style="display:inline-block;">
				<a @click="searchList" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;">筛选</a>
				<a @click="searchReset" href="javascript:void(0);" class="gray" style="width: 100px;height: 40px;line-height: 40px;margin-right: 8px;">重置</a>
			</div>
		</div>
		<com-table :listName="'入库导入记录'" :titleData="titleList" :allTotal="allTotal" :introData="listData">
			<div slot="con-0" slot-scope="props" @click="getDetail(props)" class="detailsBtn">查看详情</div>
			<div slot="con-1" slot-scope="props">{{getTime(props.data.createTime)}}</div>
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
				startTime: utils.getTime({
					time: new Date()
				}).start,
				endTime: utils.getTime({
					time: new Date()
				}).end,
				createUser: '', //操作人
				tebData: ['商品', '物料'],
				tabactive: 0,
				listData: [],
				shopId: storage.session('userShop').currentShop.id,
				time: '',
				checkAlert: false,
				checkFile: '',
				cdn: global.cdnUrl,
				inventConfigure:0,
			};
		},
		mounted() {
			this.inventConfigure = storage.session('inventConfigure')||0;
			this.tabactive = this.inventConfigure==0?0:this.inventConfigure-1;
			this.heardBtn();
			this.init();
		},
		methods: {
			async init() {
				if (this.startTime > this.endTime)[this.startTime, this.endTime] = [this.endTime, this.startTime];
				let data = await http.invoicing_getBatchStorageRecords({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						page: this.page,
						creator: this.createUser,
						num: 10,
						type: this.tabactive + 1 //1商品；2物料；3服装 为空则获取全部
					}
				});
				this.listData = data.list;
				this.page = data.page;
				this.allTotal = data.rows;
				this.pageTotal = data.count;
				console.log(data);
			},
			getDetail(props) {
				storage.session('detailNeed', props.data);
				this.$router.push({
					path: 'wareImport/wareProsperity'
				});
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
			tebClick(index) {
				this.tabactive = index;
				this.init();
			},
			searchList() {
				this.init();
			},
			searchReset() {
				this.createUser = '';
				this.page = 1;
				this.startTime = utils.getTime({
					time: new Date()
				}).start;
				this.endTime = utils.getTime({
					time: new Date()
				}).end;
				this.init();
			},
			pageChange(page) {
				this.page = page.page;
				this.init();
			},
			heardBtn() {
				this.$store.commit('setPageTools', [{
					name: '导出模板',
					className: ['wearhouse create float'],
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
					className: ['wearhouse handle refoin'],
					inputName: 'file',
					fn: async () => {//e
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
					type: 1
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
		.detailsBtn {
			color: #29abe2;
			cursor: pointer;
		}
		@media only screen and (max-width:1150px) {
			.btnChange {
				margin-top: 15px;
			}
		}
		@import url("./warecom");
	}
</style>