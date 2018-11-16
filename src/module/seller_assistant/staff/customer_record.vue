<!--
    **客户记录
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="customer">
		<template v-if='!addworker'>
			<header class="worker_staff_belongs">
				<!-- <input type="text" v-model.trim="keyWords" placeholder="请输入用户昵称"> -->
				<el-input v-model="keyWords" maxlength="10" placeholder="请输入用户昵称" style="width:179px;margin:0 20px;"></el-input>
				<!-- <button @click="selectWorker" class="shop_selects">筛选</button>
				<button @click="resertWorker" class="shop_resert">重置</button> -->
				<el-button type="primary" style="width:100px;" @click="selectWorker">筛选</el-button>
				<el-button type="info" style="width:100px;" @click="resertWorker">重置</el-button>
			</header>
			<section>
				<!-- <com-table :listHeight='80' :listWidth="1000" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'工作人员'" :showTitle='1' :allTotal="allFormList.length" :widthType='false'>
					<div slot="con-0" slot-scope="props" @click="deleteUser(props.data)">删除</div>
					<div slot="con-2" slot-scope="props">{{formatTime(props.data.bindingTime)}}</div>
				</com-table> -->
				<div class="list_box">
					<div class="list_title">
						<div class="list_title_l fl">
							<span>客户列表</span>
							<span></span>
							<span>共
								<a href="javascript:;">{{allFormList.length}}</a>条记录</span>
						</div>
						<div class="list_title_r fr">
						</div>
					</div>
					<el-table :data="formList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
						<el-table-column fixed prop="id" label="操作" align="center" width="250">
							<template slot-scope="scope">
								<el-button size="mini" type="text" @click="deleteUser(scope.row)" style="color: #fd3f1f;">删除</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="name" label="用户昵称" align="center">
						</el-table-column>
						<el-table-column label="绑定日期" align="center">
							<template slot-scope="scope">
								<span>{{formatTime(scope.row.bindingTime)}}</span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<!-- <pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="endTotal" :page-sizes="[10, 20, 30]"></el-pagination>
			</section>
		</template>
		<!-- 新增客户 -->
		<addWorker v-else @addBack='addBack' :staffFansId='staffFansId'></addWorker>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				page: 1, //页码数
				num: 10,
				endTotal: 0,
				allFormList: [], //所有的数据
				allList: [], //所有的数据 用来搜索
				formList: [], //展示的数据
				keyWords: '', //用户昵称	
				addworker: false //是否增加心客户		
			};
		},
		props: {
			staffFansId: String //导购的id
		},
		methods: {
			// getPageNum: function(obj) {
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.setPage();
			// },
			setPage: function() {
				this.endTotal = Math.ceil(this.allFormList.length / this.num);
				let pageStart = (this.page - 1) * this.num;
				let pageEnd = this.page * this.num;
				let pageContent = this.allFormList.slice(pageStart, pageEnd);
				this.formList = pageContent;
			},
			selectWorker: function() {
				let reg = new RegExp(this.keyWords);
				let arr = [];
				arr = this.allList.filter((item) => {
					return reg.test(item.name);
				});
				this.allFormList = Object.values(arr);
				this.setPage();
			},
			resertWorker() { //  重置
				this.page = 1;
				this.num = 10;
				this.keyWords = '';
				this.getCustomerByStaffId();
			},
			async getCustomerByStaffId() {
				let data = await http.getCustomerByStaffId({
					data: {
						staffFansId: this.staffFansId
					}
				});
				if (data) {
					this.allFormList = data;
					this.allList = this.allFormList;
					this.$nextTick(() => {
						this.setPage();
					});
				}
			},
			wentBack: function() {
				//   关闭弹框
				this.$store.commit('setPageTools', {});
				this.$emit('customerBack');
			},
			deleteUser: function(item) { //删除客户
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'confirm',
					content: '确定删除客户吗',
					callback: (res) => {
						if (res == 'ok') {
							this.unbinding(item);
						}
					}
				});
			},
			async unbinding(item) {
				let data = await http.unbinding({
					data: {
						fansId: item.id
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '解除成功',
						title: '操作提示',
						winType: 'alert'
					});
					this.getCustomerByStaffId();
				}
			},
			formatTime(time) {
				if (time.length == 10) {
					time *= 1000;
				}
				return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
			},
			addCustomer: function() {
				this.addworker = true; //打开新增的
			},
			addBack: function() {
				this.addworker = false;
				this.setTitle();
			},
			setTitle: function() {
				this.$store.commit('setPageTools', [{
					name: '返回',
					className: 'el-btn-blue',
					fn: () => {
						this.wentBack();
					}
				}, {
					name: '增加客户',
					className: 'el-btn-yellow',
					fn: () => {
						this.addCustomer();
					}
				}]);
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.setPage();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.setPage();
			},
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
			pageElement: () =>
				import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
			addWorker: () =>
				import ( /*webpackChunkName:"add_customer"*/ './add_customer'),
		},
		mounted() {
			this.setTitle();
			this.getCustomerByStaffId();
		}
	};
</script>
<style type="text/css" scoped>
	#customer {
		width: 100%;
		height: auto;
	}

	#customer .worker_staff_belongs {
		margin-bottom: 20px;
	}

	#customer .worker_staff_belongs input {
		width: 184px;
		height: 42px;
		border: 1px solid #b3b3b3;
		margin-left: 19px;
		padding: 0 17px;
	}

	#customer .worker_staff_belongs button {
		width: 101px;
		height: 42px;
		margin-left: 19px;
	}

	#customer .worker_staff_belongs .shop_selects {
		background: #28a8e0;
		border: none;
		color: #fff;
		font-size: 16px;
	}

	#customer .worker_staff_belongs .shop_resert {
		background: #b3b3b3;
		border: none;
		color: #fff;
		font-size: 16px;
	}
</style>