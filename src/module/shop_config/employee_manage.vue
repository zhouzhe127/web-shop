<!--
	**员工管理
	* 李志刚
	* *
	*
-->
<template>
	<div id="employlist">
		<nav v-show="!batch" :class="{sdHidden: batch}">
			<el-select v-if="ischain != 0" v-model="selectAssignmentType" @change="selectAssignmentTypeFilte" placeholder="请选择指派类型" style="width:150px;">
				<el-option
					v-for="(item,i) in assignmentTypes" 
					:key="i"
					:label="item.name"
					:value="item.type">
				</el-option>
			</el-select>
			<!-- <select-btn v-if="ischain != 0" :name="selectAssignmentType" :sorts="assignmentTypes" :width="158" @emit="selectAssignmentTypeFilte"></select-btn> -->
			<el-select v-if="ischain != 0" v-model="recType" @change="selectJobFilte" placeholder="请选择职位" style="width:150px;">
				<el-option
					v-for="(item,i) in reduceJobList" 
					:key="i"
					:label="item.name"
					:value="i">
				</el-option>
			</el-select>
			<!-- <select-btn :name="selectJob.name" :sorts="reduceJobList.map(v=>v.name)" :width="138" @emit="selectJobFilte"></select-btn> -->
			<el-input v-model="seachValue" clearable maxlength="11" placeholder="请输入员工名称/手机号码" style="width:225px;"></el-input>
			<!-- <input type="text" v-model="seachValue" maxlength="11" placeholder="请输入员工名称/手机号码"> -->
			<el-button v-on:click="seachFn" type="primary">搜索</el-button>
			<el-button v-on:click="resetFn" type="info">重置</el-button>
			<!-- <a href="javascript:;" class="blue" @click="seachFn">筛选</a>
			<a href="javascript:;" class="gray" @click="resetFn">重置</a> -->
		</nav>
		<div class="aBox">
			<div class="boxTop">
				<span style="font-size:16px;margin-right: 20px;">员工列表 · 共<span style="color: #ff3c04;font-size: inherit;">{{orginList.length}}</span>个条目</span>
				<span v-if="ischain=='1'||ischain=='2'" class="aSpan">
					<i class="aI" style=""></i>品牌指派
				</span>
				<span v-if="ischain=='1'||ischain=='2'" class="aSpan" style="color:#2ea7e0;">
					<i class="aI" style="background:#2ea7e0;"></i>门店自建
				</span>
			</div>
			<el-table class="list" :data="pagedList" border style="width: 100%;" stripe :header-cell-style = "{'background-color':'#f5f7fa'}">
				<el-table-column fixed align="center" min-width = "120" :render-header="renderHeader" label="操作">
					<template slot-scope="scope">
						<div class="optionWrap">
							<template v-if="!batch" >
								<span @click="edit(scope.row.userId,scope.$index)">编辑</span>
								<span>|</span>
								<span @click="delEmployeeFn(scope.row.userId,scope.$index)">删除</span>
							</template>
							<div v-if="batch" class="oBox" @click="selectItemInBatch(scope.$index,scope.row.userId)">
								<i :class="{select: scope.$index in batchIndexs}"></i>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width = "120" label="序号">
					<template slot-scope="scope">
						<span>{{(scope.$index+1)+(page-1)*10}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip  min-width = "120" align="center" label="员工名称" prop="name"></el-table-column>
				<el-table-column align="center" min-width = "120" label="职位名称" prop="roleName">
					<template slot-scope="scope">
						<span v-if="scope.row.roleId*1>=100000||scope.row.roleId*1==0" :style="{color:ischain=='1'||ischain=='2'?'#fe9200':'#333'}">{{scope.row.roleName}}</span>
						<span v-if="scope.row.roleId* 1> 0&&scope.row.roleId* 1< 100000" :style="{color:ischain=='1'||ischain=='2'?'#29abe2':'#333'}">{{scope.row.roleName}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width = "120" label="手机号码" prop="mobile"></el-table-column>
			</el-table>
		</div>
		<div v-if="!batch">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size = "pagenum" layout="sizes, prev, pager, next" :page-count="totalPage" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<employee-win v-if="showWin" @throwWinResult="doThrowWinResult" :isAdd="isAdd" :employeeId="employeeId" :employeeIndex="employeeIndex" :list="pagedList" :jobList="jobList.slice(1)" :ischain="+ischain"></employee-win>
		<select-job v-if="showBatchJobs" @winEvent="batchJobWinFn" :ischain="+ischain" :jobList="jobList.slice(1)" :title="'批量选择员工职位'" :index="-1">
		</select-job>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	//将该组件导出
	data() {
		return {
			isAdd: true, //是添加还是编辑，true为添加
			orginList: [], // 接口拿过来的员工信息列表
			list: [], // 展示员工信息列表
			showWin: false, //是否展示弹框
			employeeId: '', //员工id
			employeeIndex: '', //员工列表索引
			info: '', //员工信息
			assignmentTypes: [{name:'全部',type:'0'}, {name:'品牌指派',type:"1"}, {name:'门店自建',type:'2'}], // 指派类型
			selectAssignmentType: '', // 选中的指派类型
			jobList: [], //职位列表
			selectJob: {}, // 导航栏选中的职位
			seachValue: '', // 员工名称和电话号码的搜索栏值
			seachCacheObj: {
				// 搜索的缓存，不能实时的刷新为了减少计算量
				seachValue: '',
				selectAssignmentType: '',
				selectJob: {}
			},
			recType:'',
			page: 1,
			pagenum: 10, // 每页条数
			pagenumArr: [10, 20, 50],
			batch: false, // 批量管理
			batchIndexs: {}, // 批量选中的序号索引 {index: id}
			showBatchJobs: false, //批量管理
			ischain: 0 //0.单店 1.直营店 2.加盟店 3.品牌
		};
	},
	computed: {
		totalPage() {
			return Math.ceil(this.list.length / this.pagenum);
		},
		pagedList() {
			// 按照 品牌/自建 过滤
			let selectAssignmentType = this.selectAssignmentType;
			let selectJob = this.selectJob;
			let seachValue = this.seachValue;
			let list = this.orginList;
			if (selectAssignmentType === '1') {
				list = list.filter(
					v => v.roleId >= 100000 || v.roleId + '' === '0'
				);
			} else if (selectAssignmentType === '2') {
				list = list.filter(
					v => v.roleId <= 100000 && v.roleId + '' !== '0'
				);
			}
			// 过滤职位
			if (
				(selectJob.id || selectJob.id === '0') &&
				selectJob.id + '' !== '-1'
			) {
				list = list.filter(v => v.roleId === selectJob.id);
			}
			// 过滤手机号和名称
			if (seachValue !== '') {
				this.page = 1;
				list = list.filter(v => {
					if (v.userName && v.mobile) {
						return (
							v.userName.indexOf(seachValue) >= 0 ||
							v.mobile.indexOf(seachValue) >= 0
						);
					} else {
						return false;
					}
				});
			}
			this.list = list;
			return this.list.slice(
				(this.page - 1) * this.pagenum,
				this.page * this.pagenum
			);
		},
		reduceJobList() {
			// console.log(this.recType);
			if (this.selectAssignmentType == '2') {//2是门店自建，1是品牌
				return this.jobList.filter(
					v =>
						(v.id < 100000 && v.id + '' !== '0') || v.name == '全部'
				);
			} else if (this.selectAssignmentType == '1') {
				return this.jobList.filter(
					v => v.id >= 100000 || v.id + '' === '0' || v.name == '全部'
				);
			} else {
				return this.jobList;
			}
		}
	},
	created() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.$store.commit('setPageTools', [
			{
				name: '新建员工',
				className: ['addStaff', 'export-btn'],
				fn: this.add,
				type: 2
			},
			{
				name: '批量操作',
				className: ['addStaff', 'export-btn'],
				fn: this.changeBatchBtn
			}
		]);
		this.init();
	},
	// watch:{

	// },
	methods: {
		renderHeader(h,{column,$index}){
			if(!this.batch){
				return h('span',column.label);
			}else {
				return h('span',{},[
					h('span',{
						class: 'edit',
						style: 'color:#F8931F;cursor:pointer;margin-right:20px;',
						on: {
							click: this.batchEdit
						}
					},'编辑'),
					h('span', {
						class: 'del',
						style: 'color: #FD3E1F;cursor:pointer',
						on: {
							click: this.batchDel
						}
					},'删除')
				])
			}
		},
		init() {
			this.getUserList();
			this.getJobList();
		},
		//获取员工列表
		async getUserList() {
			let res = await http.getUserList();
			this.orginList = res;
			this.list = res;
		},
		//获取职位列表
		async getJobList() {
			let res = await http.getUserRoleList();
			let allItem = {
				id: '-1',
				name: '全部',
				nodeIds: '', //权限id，逗号连接
				nodeNum: '0', //权限个数
				personNum: '0',
				type: '0', //0:门店，1：品牌
				sort: '1'
			};
			let root = {
				id: '0',
				name: '超级管理员',
				nodeIds: '3051', //权限id，逗号连接
				nodeNum: '1', //权限个数
				personNum: '0',
				type: '1', //0:门店，1：品牌
				sort: '2'
			};
			if (res) {
				// this.selectJob = allItem;
				this.selectJob = {
					id: '',
					name: '请选择职位'
				};
				res.unshift(root);
				res.unshift(allItem);
				this.jobList = res;
			}
		},
		selectJobFilte(i) {
			// console.log(i);
			this.page = 1;
			this.selectJob = this.reduceJobList[i];
		},
		selectAssignmentTypeFilte(i) {
			this.recType = '';
			this.page = 1;
			// this.selectAssignmentType = this.assignmentTypes[i].type;
			this.selectJob = {
				id: '-1',
				name: '全部',
				nodeIds: '', //权限id，逗号连接
				nodeNum: '0', //权限个数
				personNum: '0',
				type: '0', //0:门店，1：品牌
				sort: '1'
			};
		},
		seachFn() {
			// console.log(this.selectJob)
			this.page = 1;
			this.seachCacheObj = {
				seachValue: this.seachValue,
				selectAssignmentType: this.selectAssignmentType,
				selectJob: this.selectJob
			};
		},
		resetFn() {
			this.seachValue = '';
			this.selectAssignmentType = '';
			this.recType = '';
			this.page = 1;
			// this.selectJob = {};
			// this.seachCacheObj = {
			// 	seachValue: '',
			// 	selectAssignmentType: '0',
			// 	selectJob: {}
			// };
		},
		//每页显示多少行
		handleSizeChange(p){
			this.pagenum = p;
			this.page = 1;
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
		},
		// editPageNum(i) {
		// 	this.pagenum = this.pagenumArr[i];
		// 	this.page = 1;
		// },
		//添加
		add() {
			this.isAdd = true;
			this.showWin = true;
		},
		// 改变批量操作的按钮
		changeBatchBtn() {
			// 批量操作打开，按得是返回，返回原始态
			if (this.batch) {
				this.batch = false;
				this.batchIndexs = {};
				this.$store.commit('setPageTools', [
					{
						name: '新建员工',
						className: ['addStaff', 'export-btn'],
						fn: this.add,
						type: 2
					},
					{
						name: '批量操作',
						className: ['addStaff', 'export-btn'],
						fn: this.changeBatchBtn
					}
				]);
				//进入批量
			} else {
				this.batch = true;
				this.batchIndexs = {};
				this.$store.commit('setPageTools', [
					{
						name: '完成操作',
						className: ['addStaff', 'export-btn'],
						fn: this.changeBatchBtn
					}
				]);
			}
		},
		// 批量操作选择一项
		selectItemInBatch(i, id) {
			let temp = {}; // 拉缓存
			let count = 0;
			for (let k in this.batchIndexs) {
				temp[k] = this.batchIndexs[k];
				count++;
			}
			if (i in temp) {
				delete temp[i]; // 有了删
			} else {
				if (count >= 10) {
					this.$store.commit('setWin', {
						content: '批量管理最多选择十人'
					});
					return;
				}
				temp[i] = id; // 没有加
			}
			this.batchIndexs = temp;
		},
		//编辑
		edit(id, i) {
			this.isAdd = false;
			this.employeeId = id;
			this.employeeIndex = i;
			this.showWin = true;
		},
		// 删除员工弹出提示
		delEmployeeFn(id, i) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: `确认删除员工 ${this.pagedList[i].userName || ''}？`,
				callback: delRes => {
					if (delRes == 'ok') {
						this.delEmployee(id, i);
					}
				}
			});
		},
		//删除员工
		async delEmployee(id, i) {
			let data = await http.userDel({
				data: {
					userId: id //员工ID
				}
			});
			if (data) {
				// i 有问题，i是list里面的下标，一搜索又从orginList拿数据，不如直接刷新，简单粗暴
				this.getUserList();
				if (this.batch) {
					this.changeBatchBtn();
				}
				this.$store.commit('setWin', {
					content: `删除员工${this.pagedList[i].name}成功`,
					autoHideTime: 1000
				});
			} else {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '数据返回为空'
				});
			}
		},
		doThrowWinResult(res, employee) {
			//确定
			if (res == 'ok') {
				if (this.isAdd) {
					this.orginList.unshift(employee); //展示页面加入这个新加的数据
					this.showWin = false;
					this.$store.commit('setWin', {
						content: '新增员工成功',
						autoHideTime: 1000
					});
					this.getUserList();
				} else if (!this.isAdd) {
					this.getUserList();
					this.$store.commit('setWin', {
						content: '修改员工信息成功',
						autoHideTime: 1000
					});
					this.showWin = false;
				}
			}
			//取消
			if (res == 'cancel') {
				this.showWin = false;
			}
			//关闭
			if (res == 'close') {
				this.showWin = false;
			}
		},
		// 批量编辑
		batchEdit() {
			// 什么都没选
			if (Object.keys(this.batchIndexs).length == 0) {
				this.$store.commit('setWin', { content: '请先选择员工' });
			} else {
				this.showBatchJobs = true;
			}
		},
		// 批量删除
		batchDel() {
			// 什么都没选
			if (Object.keys(this.batchIndexs).length == 0) {
				this.$store.commit('setWin', { content: '请先选择员工' });
			} else {
				let ids = Object.values(this.batchIndexs);
				let indexs = Object.keys(this.batchIndexs);
				let names = indexs.map(v => this.list[v].name || '');
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: `确认批量删除员工 ${names.join(' ')}？`,
					callback: delRes => {
						if (delRes == 'ok') {
							this.delEmployee(ids.join(','), indexs);
						}
					}
				});
			}
		},
		// 批量编辑api
		async editShopUser(ids, job) {
			let res = await http.editShopUsers({
				data: {
					userIds: ids.join(','), //员工ID
					roleId: job.id
					// 批量管理不要传授权码，授权码不能批量处理，详情咨询后端
				}
			});
			if (res) {
				// 修改本地数据
				this.changeBatchBtn();
				this.getUserList();
				this.batchIndexs = {};
				this.$store.commit('setWin', {
					content: '批量修改员工信息成功',
					autoHideTime: 1000
				});
			} else {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alter',
					content: '数据返回为空'
				});
			}
		},
		// 批量管理的弹窗回调
		batchJobWinFn(info, i) {
			if (info == 'ok') {
				// 批量修改员工职位
				this.editShopUser(
					Object.values(this.batchIndexs),
					this.jobList[i + 1]
				);
			}
			this.showBatchJobs = false;
		}
	},
	components: {
		employeeWin: () =>
			import(/*webpackChunkName: "employee_manage_win"*/ './employee_manage_win'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		// selectBtn: () =>
		// 	import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'), // 下拉
		// comTable: () =>
		// 	import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		SelectJob: () =>
			import(/*webpackChunkName: "select_job"*/ 'src/module/shop_config/employee_manage_outlets_select_job') // 员工管理门店选择职位弹窗
	}
};
</script>

<style scoped lang="less">
	@sdOrange: #fe9300;
	@sdBlue: #2daadd;
	@sdRed: #fc3f1d;
	#employlist{
		min-width: 710px;
		color: #424149;
		.sdRed{color: @sdRed}
		// nav{
		// 	// height: 40px;
		// 	// line-height: 40px;
		// 	// margin-bottom: 20px;
		// 	vertical-align: middle;
		// 	transition: height 0.3s;

		// 	&.sdHidden{
		// 		height: 0;
		// 	}
		// 	input{
		// 		margin:0 5px;
		// 		width: 180px;
		// 		height: 40px;
		// 		border: 1px solid #e3e3e3;
		// 		border-radius: 2px;
		// 		padding: 0 5px;
		// 		outline: none;
		// 	}
		// 	a{
		// 		vertical-align: middle;
		// 		width: 90px;
		// 		height: 40px;
		// 		line-height: 40px;
		// 		margin-left:10px;
		// 	}
		// }
		.aBox{
			width:100%;border-bottom:none;margin:10px 0;
			.boxTop{
				height:50px;line-height: 50px;border-bottom:1px solid #ebeef5;padding:0 5px;border:1px solid #ebeef5;border-bottom:none;
				.aSpan {
					font-size: 16px;
					color: #fe9200;
					margin-right: 20px;
					.aI {
						background: #fe9200;
						display: inline-block;
						width: 16px;
						height: 16px;
						border-radius: 8px;
						margin-right: 10px;
						vertical-align: middle;
					}
				}
			}
		}
		.oBox{
			 width: 100%;
				// height: 60px;
				// line-height: 60px;
				float: left;
				text-align: center;
				i{
					display: inline-block;
					width: 20px;
					height: 20px;
					border: 1px solid #949494;
					border-radius: 50%;
					cursor: pointer;
					&.select{
						background-color: @sdBlue;
						background-image: url(../../res/images/checkbox-on.png);
						border:none;
					}
				}
		}
		
		.aSpan {
			font-size: 16px;
			color: #fe9200;
			margin-right: 20px;
			.aI {
				background: #fe9200;
				display: inline-block;
				width: 16px;
				height: 16px;
				border-radius: 8px;
				margin-right: 10px;
				vertical-align: middle;
			}
		}
		// ul.tas-variety{
		// 	position: relative;
		// 	z-index: 9;// 比下拉少1
		// 	border: 1px solid #d2d2d2;
		// 	>li{
		// 		width: 100%;
		// 		height: 60px;
		// 		border-bottom: 1px solid #f7f7f7;
		// 		background-color: #fff;
		// 		ul{
		// 			width: 100%;
		// 			height: 45px;
		// 			overflow: hidden;
		// 			li{
		// 				height: 60px;
		// 				line-height: 60px;
		// 				float: left;
		// 				text-align: center;
		// 				span{
		// 					color: @sdRed;
		// 					display: inline-block;
		// 					padding:0 20px;
		// 					cursor: pointer;
		// 					&:first-child{
		// 						color: @sdOrange;
		// 					}
		// 				}
		// 				i{
		// 					display: inline-block;
		// 					width: 20px;
		// 					height: 20px;
		// 					border: 1px solid #949494;
		// 					border-radius: 50%;
		// 					cursor: pointer;
		// 					&.select{
		// 						background-color: @sdBlue;
		// 						background-image: url(../../res/images/checkbox-on.png);
		// 						border:none;
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// 	>li:first-child{
		// 		height: 45px;
		// 		div{
		// 			font-size: 16px;
		// 			line-height: 45px;
		// 			span{
		// 				line-height: 45px;
		// 				display: block;
		// 				width: 14px;
		// 				height: 14px;
		// 				border-radius: 50%;
		// 				float: left;
		// 				background-color: @sdOrange;
		// 				margin: 16px 10px 0 0;
						
		// 			}
		// 			float: left;
		// 			padding: 0 20px;
		// 			&:last-child span{
		// 				background-color: @sdBlue;
		// 			}
		// 			em{
		// 				font-size: 16px;
		// 			}
		// 		}

		// 	}
		// 	>li:nth-child(2){
		// 		height: 45px;
		// 		line-height: 45px;
		// 		ul{
		// 			background-color: #f2f2f2;
		// 			li{
		// 				line-height: 45px;
		// 			}
		// 		}
		// 	}
		// }
		// .w5{ width: 5%;}
		// .w10{width: 10%;}
		// .w15{width: 15%;}
		// .w20{width: 20%;}
		// .w25{width: 25%;}
		// .w30{width: 30%;}
		// .w35{width: 35%;}
		// .pageWrap{
		// 	height: 65px;
		// 	// padding-top: 20px;
		// 	margin-bottom: 100px;
		// }
		// .noResult{
		// 	text-align: center;
		// 	color: #aaa;
		// 	line-height: 45px;
		// }
		// /deep/ .sdBlue{
		// 	color: @sdBlue
		// }
		// /deep/ .sdOrange{
		// 	color: @sdOrange
		// }
		.optionWrap{
			cursor:pointer;
			span:first-child{
				color: @sdOrange;
				padding:0 5px;
				display: inline-block;
				// min-width: 50px;
			}
			span:nth-child(2){
				color:#d2d2d2;
			}
			span:last-child{
				display: inline-block;
				min-width: 50px;
				padding:0 5px;
				color: @sdRed;
			}
		}
	}
</style>