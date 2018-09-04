/* * @Author: zhouzhe * @Date: 2018-04-26 13:50:23 */
<template>
	<div id="wareImport">
		<el-radio-group v-model="tabactive" @change="init">
		    <el-radio-button label="0">商品</el-radio-button>
		    <el-radio-button label="1">物料</el-radio-button>
		</el-radio-group>
		<div class="serBox">
			<h1>操作时间：</h1>
			<div class="input-box">
				<el-date-picker
					v-model="timeDate"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:clearable="false"
					@change="timeChange">
				</el-date-picker>
			</div>
			<div class="input-box">
				<el-input v-model="createUser" placeholder="请输入操作人" maxlength="10" style="width:180px;"></el-input>
			</div>
			<div class="input-box">
				<el-button @click="searchList" type="success">筛选</el-button>
				<el-button @click="searchReset" type="info">重置</el-button>
			</div>
		</div>
		<el-table
	    	:data="listData" stripe border style="width: 100%">
		    <el-table-column label="操作时间">
		    	<template slot-scope="scope">{{getTime(scope.row.createTime)}}</template>
		    </el-table-column>
		    <el-table-column prop="creator" label="操作人"></el-table-column>
		    <el-table-column label="操作" fixed="right" width="150">
		    	<template slot-scope="scope">
		        <el-button @click="getDetail(scope.row)" type="text" size="small">查看详情</el-button>
		      </template>
		    </el-table-column>
	  	</el-table>
		<div class="page-box">
			<el-pagination @current-change="pageChange" @size-change="sizeChange"
				:current-page="page"
				background
				layout="sizes,total,prev, pager, next"
				:page-sizes="[10, 20, 50]"
				:total="allTotal">
			</el-pagination>
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
				allTotal: 0,
				page: 1,
				pageTotal: 0,
				timeDate:[new Date(Date.parse(new Date())-30*3600*24*1000),new Date()],
				startTime: new Date().setHours(0, 0, 0, 0)-30*3600*24*1000, //开始时间
				endTime: new Date().setHours(23, 59, 59, 0), //结束时间
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
						type: Number(this.tabactive) + 1 //1商品；2物料；3服装 为空则获取全部
					}
				});
				this.listData = data.list;
				this.page = data.page;
				this.allTotal = data.rows-0;
				this.pageTotal = data.count;
			},
			getDetail(props) {
				storage.session('detailNeed', props.data);
				this.$router.push({
					path: 'wareImport/wareProsperity'
				});
			},
			timeChange(res){
				this.startTime = new Date(res[0]).setHours(0,0,0,0);
				this.endTime = new Date(res[1]).setHours(23,59,59,0);
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
				this.page = page;
				this.init();
			},
			sizeChange(res){
				this.num = res;
				this.init();
			},
			heardBtn() {
				let arr = [
					{name:'导出模板',className: 'success',type:5,
						fn:()=>{
							if (this.tabactive == 1) {
							window.location.href = this.cdn + '/suppliestemple.xlsx?v=1';
							}
							if (this.tabactive == 0) {
								window.location.href = this.cdn + '/goodstemple.xlsx?v=1';
							}
						}
					},
					{name:'入库导入',className: 'success',type:1,
						fn: async ()=>{
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
						}
					}
				];
				this.$store.commit('setPageTools',arr);
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
		.input-box{
			display: inline-block;margin-right: 10px;margin-bottom: 15px;
		}
		@import url("./warecom");
	}
</style>