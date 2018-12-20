/* * @Author: zhouzhe * @Date: 2018-04-26 13:50:08 */

<template>
	<div id="wareImport">
		<ul class="tebBox">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul>
		<com-table :listWidth="2000" :introData="showData" :titleData="titleList" :allTotal="allTotal">
			<div slot="title" class="titleHeand">
				<span>{{listType}}导入记录&nbsp;·&nbsp;操作时间:&nbsp;{{getTime(needData.createTime)}}&nbsp;·&nbsp;操作人:&nbsp;{{needData.creator}}</span>
			</div>
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
	export default {
		data() {
			return {
				titleList: [],
				typeShop: ['普通商品', '称重商品'],
				allTotal: 0,
				page: 1,
				pageTotal: 0,
				createUser: '', //操作人
				tebData: ['入库成功', '入库失败'],
				tabactive: 0,
				dataList: [],
				startLIne: 1,
				needNum: 10,
				successLog: '',
				failLog: '',
				needData: '',
				showData: '',
				listType: ''
			};
		},
		mounted() {
			this.needData = storage.session('detailNeed');
			let typeObj = {
				1: '商品',
				2: '物料'
			};
			this.listType = typeObj[this.needData.type];
			this.failLog = this.needData.failLog;
			this.successLog = this.needData.successLog;
			this.init();
			this.heardBtn();
		},
		destroyed() {
			storage.session('detailNeed', null);
		},
		methods: {
			async init() {
				let setUrl = this.tabactive == 1 ? this.failLog : this.successLog;
				if (!setUrl) return;
				let data = await http.invoicing_importLibarys({
					url: setUrl
				});
				let dataArr = [];
				let arr = data.split(/\n/);
				for (let i in arr) {
					if (arr[i]) {
						dataArr.push(arr[i].split(','));
						if (i > 0) {
							this.dataList.push({ ...arr[i].split(',')
							});
						}
					}
				}
				console.log(this.dataList);
				this.titleList = dataArr[0];
				for (let i in this.titleList) {
					// if(this.titleList[i]=='生产日期'||this.titleList[i]=='失效日期'){
					//   for(let item of this.dataList){
					//     item[i] = this.getTime(item[i]);
					//   }
					// }
					this.titleList[i] = {
						titleName: this.titleList[i],
						dataName: i
					};
					if (this.titleList[i].titleName == '供应商') {
						Object.assign(this.titleList[i], {
							titleStyle: {
								width: '200px'
							}
						});
					}
					if (this.tabactive == 1 && this.titleList[i].titleName == '状态') {
						Object.assign(this.titleList[i], {
							conStyle: {
								'backgroundColor': 'red'
							}
						});
					}
				}
				// if(this.needData.type==1){
				//     for(let item of this.dataList){
				//       item[3] = this.typeShop[item[3]];
				//     }
				// }
				this.allTotal = this.dataList.length;
				this.pageTotal = Math.ceil(this.dataList.length / 10);
				this.showData = this.dataList.slice(0, 10);
			},
			tebClick(index) {
				this.tabactive = index;
				this.dataList = [];
				this.showData = [];
				this.titleList = [];
				this.allTotal = 0;
				this.page = 1;
				this.pageTotal = 0;
				this.init();
			},
			pageChange(currentPage) {
				this.page = currentPage.page;
				this.showData = this.dataList.slice((this.page - 1) * 10, this.page * 10);
			},
			heardBtn() {
				this.$store.commit('setPageTools', [{
						name: '返回',
						className: ['back'],
						fn: () => {
							window.history.go(-1);
						}
					},
					{
						name: '导出失败记录',
						className: ['wearhouse handle'],
						fn: async () => {
							if (this.failLog) {
								await http.Invent_redshes({
									url: this.failLog,
									data: {
										format: 'csv'
									}
								});
							} else {
								this.$message({
									message: '没有失败记录！',
									type: 'warning'
								});
							}

						}
					}
				]);
			},
			getTime(time) {
				return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd');
			},
			getId() { //string
				return this.dataList.index;
			}
		},
		components: {
			comTable: () =>
				import( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			detailsDes: () =>
				import( /*webpackChunkName: 'details_des'*/ 'src/components/details_des'),
			pageTurn: () =>
				import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		}
	};
</script>
<style lang="less" scoped>
	#wareImport {
		width: 100%;

		.titleHeand {
			span {
				font-size: 16px;
			}
		}

		@import url("./warecom");
	}
</style>