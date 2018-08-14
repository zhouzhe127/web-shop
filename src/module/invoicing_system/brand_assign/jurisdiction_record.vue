/* * @Author: zhouzhe * @Date: 2018-06-25 17:15:37 */
<template>
	<div id="record">
		<ul class="tebBox">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul>
		<com-table :listName="tabactive==0?'指派日志':'权限指派日志'" :titleData="setTitle" :allTotal="allTotal" :introData="listData">
			<div slot="con-0" slot-scope="props" class="infoDetail" @click="checkDetail($event,props)">
				<a href="javascript:void(0);">查看详情</a>
				<span v-if="props.data.status==1">|</span>
				<a v-if="props.data.status==1" href="javascript:void(0);">查看异常</a>
			</div>
			<div slot="con-2" slot-scope="props">
				<span v-if="tabactive==0">{{props.data.status==1?'异常':'已完成'}}</span>
				<span v-if="tabactive==1">{{props.data.createTime}}</span>
			</div>
			<!-- <span slot="con-3" slot-scope="props">{{getTime(props.data.createTime)}}</span> -->
		</com-table>
		<div class="page">
			<page-turn :total="total" :isNoJump="true" :num="num" :page="page" @pageNum="changePage"></page-turn>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	let tebList1='';
	let tebList2='';
	let page1 = 1;
	let page2 = 1;
	let num1 = 10;
	let num2 = 10;
	let tabactive = 0;
	export default {
		data() {
			return {
				titleList: [{
					titleName: '操作',
					titleStyle: {
						'min-width': '200px'
					}
				},
				{
					titleName: '方案名称',
					dataName: 'planName'
				},
				{
					titleName: '操作状态',
				},
				{
					titleName: '操作时间',
					dataName: 'createTime'
				},
				{
					titleName: '操作人',
					dataName: 'createUName'
				}],
				setTitle:[],
				allTotal: 0,
				listData: [],
				total: 0,
				page: 1,
				num: 10,
				tebData:['指派日志','权限指派日志'],
				tabactive:0
			};
		},
		methods: {
			async init() {
				let url = '';
				let data ='';
				if(this.tabactive==0&&tebList1===''){
					url = 'InvoicingetAssignLog';
				}else if(this.tabactive==1&&tebList2===''){
					url = 'InvoicingetAssignInventoryConfigLog';
				}
				console.log(this.setTitle);
				if(url){
					this.listData = [];
					data = await http[url]({
						data: {
							page: this.page,
							size: this.num
						}
					});
					if(data.list){
						data.list.map(v=>{
							v.createTime = this.getTime(v.createTime);
						});
					}
					this.tabactive==0?tebList1 = data:tebList2 = data;
				}else{
					data = this.tabactive==0?tebList1:tebList2;
				}
				this.listData = data.list;
				this.total = data.total||0;
				this.allTotal = data.count||0;
			},
			checkDetail(e, data) {
				if (e.target.localName != 'a') return;
				this.$route.query.logId = data.data.logId;
				if (e.target.innerText === '查看详情') {
					this.$route.query.type = 1;
				} else {
					this.$route.query.type = 2;
				}
				this.$route.query.tabactive = this.tabactive;
				this.$router.push({
					path: 'jurisdictionDetail',
					query: this.$route.query
				});
			},
			changePage(data) {
				this.page = data.page;
				this.num = data.num;
				if(this.tabactive==0){
					tebList1 = '';
					page1 = this.page;
					num1 = this.num;
				}else{
					tebList2 = '';
					page2 = this.page;
					num2 = this.num;
				}
				this.init();
			},
			setButton() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['back'],
					fn: () => {
						page1 = 1;
						page2 = 1;
						num1 = 10;
						num2 = 10;
						tabactive = 0;
						this.$router.push({path: '/admin/brandAssign',});
					}
				}, {
					name: '刷新',
					className: ['refresh'],
					fn: () => {
						tebList1='';
						tebList2='';
						this.init();
					}
				}]);
			},
			tebClick(index) {
				this.tabactive = index;
				tabactive = this.tabactive;
				this.setTitle = utils.deepCopy(this.titleList);
				if(index==1){
					this.setTitle.splice(2,1);
					this.page = page2;
					this.num = num2;
				}else{
					this.page = page1;
					this.num = num1;
				}
				this.init();
				// storage.session('tabactive', index);
			},
			getTime(time) {
				return utils.format(time, 'yyyy-MM-dd hh:mm');
			}
		},
		mounted() {
			tebList1='';
			tebList2='';
			this.tabactive = tabactive;
			this.setButton();
			this.tebClick(tabactive);
		},
		beforeRouteLeave(to,from,next){
			if(to.path!='/admin/brandAssign/jurisdictionDetail'){
				page1 = 1;
				page2 = 1;
				num1 = 10;
				num2 = 10;
				tabactive = 0;
			}
			next();
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			pageTurn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		}
	};
</script>
<style lang='less' scoped>
	#record {
		.tebBox {
			display: inline-block;
			color: orange;
			cursor: pointer;
			li {
				border: 1px orange solid;
				display: inline-block;
				width: 130px;
				height: 35px;
				line-height: 35px;
				text-align: center;
			}
			.active {
				background-color: orange;
				color: #ffffff;
			}
		}
		.infoDetail {
			width: 100%;
			float: left;
			text-align: center;
			display: flex;
			justify-content: space-around;
			a {
				display: inline-block;
				text-align: center;
				&:nth-child(1) {
					color: #5ebee8;
				}
				&:nth-child(3) {
					color: red;
				}
			}
		}
	}
</style>