<!--
	**员工管理（品牌）
	* 江振谷
	* *
	*
-->
<template>
	<section id="employlist">
		<section class="top" v-show="!isBatch">
			<el-popover placement="bottom" width="400" v-model="showJob" trigger="click">
				<section>
					<el-radio-group v-model="brandType" size="small" @change="chooseJob">
						<el-radio-button :label="'brand'">品牌职位</el-radio-button>
						<el-radio-button :label="'shop'">门店职位</el-radio-button>
					</el-radio-group>
					<div v-if="brandType=='brand'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
						<el-button @click="selallJob('brand')" border size="mini" class="labItem" style="height:28px;">全部</el-button>
						<el-checkbox v-model="jobIds.brand" v-for="item in showJobList" class="labItem" :key="item.id" :label="item.id" border size="mini">{{item.name}}</el-checkbox>
					</div>
					<div v-if="brandType=='shop'" style="max-height:170px;overflow-y:auto;margin-top:15px;">
						<el-button @click="selallJob('shop')" size="mini" class="labItem">全部</el-button>
						<el-checkbox v-model="jobIds.shop" v-for="item in showJobList" class="labItem" :key="item.id" :label="item.id" border size="mini">{{item.name}}</el-checkbox>
					</div>
					<div style="margin-top:5px;">
						<el-button @click="ensure('none')" size="small">取消</el-button>
						<el-button type="primary" @click="ensure('all')" size="small">确定</el-button>
					</div>
				</section>
				<el-button slot="reference" plain style="width:200px;overflow: hidden;position: relative;text-overflow: ellipsis;white-space: nowrap;padding-right:30px;">
					<span>{{selectedJob}}</span>
					<i class="el-icon-arrow-down" style="position: absolute;right: 0px;width: 37px;"></i>
				</el-button>
			</el-popover>
			<elShopList :shopIds="shopIds" @chooseShop="backShopId"></elShopList>
			<el-input v-model="staffOrJob" clearable placeholder="请输入员工名称/手机号码" style="width:210px;"></el-input>
			<el-button v-on:click="search" type="primary">搜索</el-button>
			<el-button v-on:click="reset" type="info">重置</el-button>
		</section>
		<section class="list" style="width: 100%;border:1px solid #ebeef5;border-bottom:none">
			<div class="head">
				<span v-show="!isBatch">员工管理列表 · 共
					<em>{{activityList.length}}</em>个条目</span>
				<span>
					<i></i>品牌指派</span>
				<span>
					<i></i>门店自建</span>
			</div>
		</section>
		<el-table class="list" :data="activityPageList" border style="width: 100%;" stripe :header-cell-style="{'background-color':'#f5f7fa'}">
			<el-table-column fixed align="center" min-width="120" :render-header="renderHeader" label="操作" style="text-aline:center;">
				<template slot-scope="scope">
					<span v-if="!isBatch">
						<em class="under-line edit" @click="checkDetail(scope.row)">编辑</em>
						<em class="line"></em>
						<em class="under-line del" @click="delStaff(scope.row.userId)">删除</em>
					</span>
					<span v-else style="cursor: pointer;">
						<em class="circle" @click="selected(scope.row,scope.$index)" :class="{ 'on': scope.row.selected}"></em>
					</span>
				</template>
			</el-table-column>
			<el-table-column width="80" align="center" label="序号">
				<template slot-scope="scope">
					<span>{{(scope.$index+1)+(page-1)*10}}</span>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip align="center" label="员工名称" prop="userName"></el-table-column>
			<el-table-column show-overflow-tooltip align="center" label="品牌职位">
				<template slot-scope="scope">
					<span v-if="scope.row.brandRole.roleId">{{scope.row.brandRole.roleName}}</span>
					<span v-else>--</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="适用门店">
				<template slot-scope="scope">
					<span v-if="scope.row.brandRole.shopCount">{{scope.row.brandRole.shopCount}}家门店</span>
					<span v-else>0家门店</span>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip align="center" label="门店职位" prop="shopRole">
				<template slot-scope="scope">
					<span style="cursor:pointer" v-if="scope.row.shopRole.length != 0">
						<el-popover placement="top" width="400" trigger="click">
							<div>
								<i v-for="(info,i) in scope.row.shopRole" :key="i+'-'">
									<i :class="{'brand': info.roleId >= 100000,'shop': info.roleId < 100000}">{{info.roleName}}</i>
									<i v-if="i != scope.row.shopRole.length-1">、</i>
								</i>
							</div>
							<span slot="reference" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
								<i v-for="(info,i) in scope.row.shopRole" :key="i+'-'">
									<i :class="{'brand': info.roleId >= 100000,'shop': info.roleId < 100000}">{{info.roleName}}</i>
									<i v-if="i != scope.row.shopRole.length-1">、</i>
								</i>
							</span>
						</el-popover>
					</span>
					<span v-else>--</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="适用门店" prop="shopCount">
				<template slot-scope="scope">
					{{scope.row.shopCount}}家门店
				</template>
			</el-table-column>
		</el-table>
		<div class="page-box">
			<el-pagination @size-change="numChange" @current-change="pageChange" background :current-page="page" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]" :total="total"></el-pagination>
		</div>
		<!--添加编辑一级弹窗-->
		<addstaffWin v-if="isStaff" @getStaff="getStaff" :edit="edit" :jobInfo="info"></addstaffWin>
		<!--批量修改选择职位二级弹窗-->
		<addjob @addJob="getJob" v-if="showBatch" :batch="true"></addjob>
	</section>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			optionsJob: [],
			selectedJob: '全部职位',
			optionsShop: [],
			selectedShop: '全部门店',
			activityList: [], //员工管理列表
			activityPageList: [], //分页后员工管理列表
			isStaff: false, //新建员工弹窗显示
			showJob: false, //选择门店
			brandType: 'brand',
			// shopType: 'all',
			jobList: [], //职位列表
			showJobList: [], //展示的职位列表
			allJob: false, //职位全部选择
			edit: false, //是否为编辑
			info: null, //职位信息
			jobIds: {
				brand: [],
				shop: []
			}, //选中的品牌/门店职位id
			shopIds: [], //选中的门店id
			shopList: [], //门店列表
			showShopList: '', //展示的门店列表
			allShop: false, //门店全部选择
			isBatch: false, //是否为批量管理
			total: 0, //列表总条数
			num: 10, // 当前每页展示数量
			page: 1, //当前第几页
			showBatch: false, //批量管理职位编辑弹窗
			staffOrJob: '', //筛选填入的门店或职位名称
			newList: [] //筛选后列表
			// isNames: -1,
		};
	},
	mounted() {
		this.initBtn();
		this.getUserList();
		// document.addEventListener('click', this.remove);
		this.getShopList();
		this.newGetJobInfoList();
	},
	destroyed() {
		// document.removeEventListener('click', this.remove);
		this.$store.commit('setPageTools', {});
	},
	methods: {
		selallJob(type) {
			let arr = [];
			for (let i = 0; i < this.showJobList.length; i++) {
				arr.push(this.showJobList[i].id);
			}
			if (type == 'brand') {
				if (this.jobIds.brand.length == this.showJobList.length) {
					this.jobIds.brand = [];
				} else {
					this.jobIds.brand = arr;
				}
			} else {
				if (this.jobIds.shop.length == this.showJobList.length) {
					this.jobIds.shop = [];
				} else {
					this.jobIds.shop = arr;
				}
			}
		},
		renderHeader(h, { column }) {
			if (!this.isBatch) {
				return h('span', column.label);
			} else {
				return h('span', {}, [
					h(
						'span',
						{
							class: 'under-line edit',
							style:
								'margin-right: 30px; color:#F8931F;cursor:pointer',
							on: {
								click: this.editBatch
							}
						},
						'编辑'
					),
					h(
						'span',
						{
							class: 'under-line del',
							style: 'color: #FD3E1F;cursor:pointer',
							on: {
								click: this.delBatch
							}
						},
						'删除'
					)
				]);
			}
		},
		// remove() {
		// 	this.isNames = -1;
		// 	// this.showJob = null;
		// },
		//初始化右上角按钮
		initBtn() {
			let arr = [
				{
					name: '新建员工',
					type: 4,
					className: 'primary',
					fn: () => {
						this.isStaff = true;
						this.edit = false;
					}
				},
				{
					name: '批量操作',
					type: 4,
					className: 'primary',
					fn: () => {
						this.isBatch = true;
						this.completeBtn();
						for (let i = 0; i < this.activityPageList.length; i++) {
							this.activityPageList[i].selected = false;
						}
					}
				}
			];
			this.$store.commit('setPageTools', arr);
			// let obj = {
			// 	addStaff: () => { //新建员工
			// 		this.isStaff = true;
			// 		this.edit = false;
			// 	},
			// 	batchOperation: () => { //批量操作
			// 		this.isBatch = true;
			// 		this.completeBtn();
			// 		for (let i = 0; i < this.activityPageList.length; i++) {
			// 			this.activityPageList[i].selected = false;
			// 		}
			// 	}
			// };
			// this.$store.commit('setPageTools', obj);
		},
		//完成操作按钮
		completeBtn() {
			let arr = [
				{
					name: '完成操作',
					type: 4,
					className: 'primary',
					fn: () => {
						this.isBatch = false;
						this.initBtn();
					}
				}
			];
			this.$store.commit('setPageTools', arr);
			// let obj = {
			// 	completeBatchOperation: () => {
			// 		this.isBatch = false;
			// 		this.initBtn();
			// 	}
			// };
			// this.$store.commit('setPageTools', obj);
		},
		//批量操作选择
		selected(item) {
			item.selected = !item.selected;
		},
		//每页显示多少行
		numChange(e) {
			this.num = e;
			this.pageChange(1);
		},
		pageChange(page) {
			this.page = page;
			if (this.newList.length != 0) {
				this.activityPageList = this.newList.slice(
					(page - 1) * this.num,
					(page - 1) * this.num + this.num
				);
			} else {
				this.activityPageList = this.activityList.slice(
					(page - 1) * this.num,
					(page - 1) * this.num + this.num
				);
			}
		},
		//删除员工
		async userDel(id) {
			await http.userDel({
				data: {
					userId: id
				}
			});
			this.getUserList();
		},
		//获取列表
		async getUserList() {
			let res = await http.getUserList({
				data: {}
			});
			for (let i = 0; i < res.length; i++) {
				res[i].selected = false;
			}
			//				this.total = Math.ceil(res.length / this.num);
			this.total = res.length;
			this.activityList = res;
			this.activityPageList = res.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			);
			this.search();
		},
		//获取门店列表
		getShopList() {
			let res = storage.session('shopList');
			for (let i = 0; i < res.length; i++) {
				res[i].selected = false;
			}
			this.shopList = res;
			this.showShopList = res;
		},
		//获取职位
		async newGetJobInfoList() {
			let res = await http.newGetJobInfoList();
			let shop = [];
			let brand = [];
			for (let i = 0; i < res.length; i++) {
				this.$set(res[i], 'selected', false);
				// res[i].selected = false;
				if (res[i].type === '1') {
					brand.push(res[i]);
				} else {
					shop.push(res[i]);
				}
			}
			brand.unshift({
				id: '0',
				name: '超级管理员',
				type: '1',
				selected: false
			});
			shop.unshift({
				id: '0',
				name: '超级管理员',
				type: '0',
				selected: false
			});
			shop.push({
				id: '-1',
				name: '门店自建',
				type: '0',
				selected: false
			});
			this.showJobList = brand;
			this.jobList = brand.concat(shop);
		},
		//批量编辑品牌员工
		async userEditBrandUsers(brandRole, shopRole) {
			await http.userEditBrandUsers({
				data: {
					userIds: this.userIds,
					brandRole: brandRole,
					shopRole: shopRole
				}
			});
			this.getUserList();
		},
		//点击展开显示门店职位
		showNames(index) {
			console.log(index);
			// this.isNames = index;
		},
		//删除员工
		delStaff(id) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认删除？',
				callback: res => {
					if (res == 'ok') this.userDel(id);
				}
			});
		},
		//职位切换
		chooseJob(type) {
			console.log(type);
			this.brandType = type;
			this.showJobList = [];
			for (let i = 0; i < this.jobList.length; i++) {
				if (type == 'brand' && this.jobList[i].type === '1') {
					this.showJobList.push(this.jobList[i]);
				} else if (type == 'shop' && this.jobList[i].type === '0') {
					this.showJobList.push(this.jobList[i]);
				}
			}
			// this.isAll(this.showJobList) ? this.allJob = true : this.allJob = false;
		},
		//组件返回店铺Id
		backShopId(id) {
			console.log(id);
			this.shopIds = id;
		},
		//职位/门店选择确定
		ensure(type) {
			this.showJob = false;
			if (type == 'all') {
				this.selectedJob = '';
				for (let i = 0; i < this.jobList.length; i++) {
					// for(let j=0;j<this.jobIds.brand.length)
					if (this.jobIds.brand.indexOf(this.jobList[i].id) != -1) {
						this.selectedJob += this.jobList[i].name + ',';
					} else if (
						this.jobIds.shop.indexOf(this.jobList[i].id) != -1
					) {
						this.selectedJob += this.jobList[i].name + ',';
					}
				}
				if (!this.selectedJob) this.selectedJob = '全部职位';
			} else {
				// this.selectedJob = '全部职位';
				// this.jobIds.brand = [];
				// this.jobIds.shop = [];
			}
		},
		//职位/门店选择取消
		// cancel() {
		// 	// this.showJob = null;
		// },
		//编辑
		checkDetail(item) {
			this.isStaff = true;
			this.edit = true;
			this.info = item;
		},
		//批量操作选择员工
		staff() {
			this.userIds = '';
			for (let i = 0; i < this.activityPageList.length; i++) {
				if (this.activityPageList[i].selected) {
					this.userIds += this.activityPageList[i].userId + ',';
				}
			}
		},
		//批量编辑
		editBatch() {
			this.staff();
			if (this.userIds == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请选择员工'
				});
				return false;
			}
			this.userIds = this.userIds.slice(0, this.userIds.length - 1);
			this.showBatch = true;
		},
		//批量删除
		delBatch() {
			this.staff();
			if (this.userIds == '') {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请选择员工'
				});
				return false;
			}
			this.userIds = this.userIds.slice(0, this.userIds.length - 1);
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'confirm',
				content: '确认删除？',
				callback: res => {
					if (res == 'ok') this.userDel(this.userIds);
				}
			});
		},
		//批量编辑弹窗返回结果
		getJob(res, list, type) {
			if (list && res == 'ok') {
				let brandInfo = {};
				let shopInfo = [];
				if (list == 'admin') {
					this.showBatch = false;
					if (type === 1) {
						brandInfo.roleId = '0';
						brandInfo.name = '超级管理员';
						brandInfo.shopIds = [];
					} else {
						shopInfo.push({
							roleId: '0',
							name: '超级管理员',
							shopIds: []
						});
					}
				} else {
					this.showBatch = false;
					if (type === 1) {
						brandInfo = list.jobInfo;
					} else {
						shopInfo.push(list.jobInfo);
					}
				}
				this.userEditBrandUsers(brandInfo, shopInfo);
			}
			if (res == 'cancel') {
				this.showBatch = false;
			}
		},
		//获取新建员工弹窗
		getStaff(res) {
			if (res == 'ok') {
				this.isStaff = false;
				this.getUserList();
			} else if (res != 'closeMask') {
				this.isStaff = false;
			}
		},
		//判断数组中是否含有某个值
		isTrue(list, element) {
			for (let m = 0; m < list.length; m++) {
				if (list[m] == element) {
					return true;
				}
			}
			return false;
		},
		//筛选
		search() {
			let list = [];
			this.selectedJob = ''; //要显示的职位名称集合
			for (let i = 0; i < this.jobList.length; i++) {
				if (this.jobIds.brand.indexOf(this.jobList[i].id) != -1) {
					this.selectedJob += this.jobList[i].name + ',';
				} else if (this.jobIds.shop.indexOf(this.jobList[i].id) != -1) {
					this.selectedJob += this.jobList[i].name + ',';
				}
			}
			if (this.selectedJob == '') this.selectedJob = '全部职位';
			if (this.staffOrJob != '') {
				//过滤员工
				list = this.activityList.filter(v => {
					if (v.userName && v.mobile) {
						return (
							v.userName.indexOf(this.staffOrJob) >= 0 ||
							v.mobile.indexOf(this.staffOrJob) >= 0
						);
					} else {
						return false;
					}
				});
			} else {
				list = utils.deepCopy(this.activityList);
			}
			if (this.shopIds.length != 0) {
				//过滤门店
				for (let i = 0; i < list.length; i++) {
					let aa = false;
					if (list[i].brandRole.shopIds) {
						for (
							let j = 0;
							j < list[i].brandRole.shopIds.length;
							j++
						) {
							if (
								this.shopIds.indexOf(
									list[i].brandRole.shopIds[j]
								) != -1
							) {
								aa = true;
								break;
							}
						}
					}
					if (!aa) {
						for (let m = 0; m < list[i].shopRole.length; m++) {
							if (list[i].shopRole[m].shopIds) {
								for (
									let n = 0;
									n < list[i].shopRole[m].shopIds.length;
									n++
								) {
									if (
										this.shopIds.indexOf(
											list[i].shopRole[m].shopIds[n]
										) != -1
									) {
										aa = true;
										break;
									}
								}
							}
						}
					}
					if (!aa) {
						list.splice(i, 1);
						i--;
					}
				}
			}
			let brand = this.jobIds.brand; //选中的品牌职位
			let shop = this.jobIds.shop; //选中的门店职位
			// for (let i = 0; i < this.jobIds.brand.length; i++) {
			// 	brand.push(this.jobIds.brand[i].id);
			// }
			// for (let i = 0; i < this.jobIds.shop.length; i++) {
			// 	shop.push(this.jobIds.shop[i].id);
			// }
			// console.log(brand);
			// console.log(shop);

			if (brand.length != 0 || shop.length != 0) {
				//过滤职位
				for (let i = 0; i < list.length; i++) {
					let aa = false;
					if (brand.indexOf(list[i].brandRole.roleId) != -1) {
						aa = true;
					}
					if (!aa) {
						for (let m = 0; m < list[i].shopRole.length; m++) {
							if (
								shop.indexOf(list[i].shopRole[m].roleId) != -1
							) {
								aa = true;
								break;
							}
						}
						if (!aa) {
							//门店自建
							if (shop.indexOf('-1') != -1) {
								for (
									let m = 0;
									m < list[i].shopRole.length;
									m++
								) {
									if (list[i].shopRole[m].roleId < 100000) {
										aa = true;
										break;
									}
								}
							}
						}
					}
					if (!aa) {
						list.splice(i, 1);
						i--;
					}
				}
			}
			this.newList = list;
			//				this.total = Math.ceil(list.length / this.num);
			this.total = list.length;
			this.activityPageList = list.slice(
				0 * this.num,
				0 * this.num + this.num
			);
		},
		//重置
		reset() {
			for (let i = 0; i < this.jobList.length; i++) {
				this.jobList[i].selected = false;
			}
			for (let i = 0; i < this.shopList.length; i++) {
				this.shopList[i].selected = false;
			}
			this.selectedJob = '全部职位';
			this.selectedShop = '全部门店';
			this.shopIds = [];
			this.jobIds.brand = [];
			this.jobIds.shop = [];
			this.staffOrJob = '';
			this.search();
		}
	},
	components: {
		addstaffWin: () =>
			import(/*webpackChunkName: 'addstaff_win'*/ './addstaff_win'),
		page: () =>
			import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		addjob: () => import(/*webpackChunkName: 'addjob_win'*/ './addjob_win'),
		comTable: () =>
			import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		elShopList: () =>
			import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
	}
};
</script>
<style type="text/css" scoped>
.top {
	margin: 10px 0;
}
.list .title span {
	float: left;
	width: 14%;
	height: 40px;
	line-height: 40px;
	text-align: center;
}

/* .list .operate span {
		float: left;
		height: 40px;
		line-height: 40px;
		text-align: center;
	} */

.list .content span {
	height: 60px;
	line-height: 60px;
}

.list .head {
	height: 50px;
	line-height: 50px;
	padding-left: 20px;
}

.list .head span {
	font-size: 16px;
}

.list .head span:first-child {
	display: inline-block;
	width: 250px;
}

.list .head i {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 8px;
	margin-right: 10px;
	vertical-align: middle;
}

.list .head span:nth-child(2) i {
	background: #f8931f;
}

.list .head span:last-child i {
	background: #2ea7e0;
}

.list .head span:nth-child(2) {
	margin-right: 40px;
}

.list .head em {
	color: #fd3e1f;
	padding: 0 3px;
	font-size: inherit;
}

.brand {
	color: #f79337;
}

.shop {
	color: #2fa8dc;
}

/* .list .operate {
		overflow: hidden;
	}

	.list .operate span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} */

/* .list ul li {
		overflow: hidden;
		border-bottom: 4px solid #F7F7F7;
	}

	.list ul li span {
		height: 60px;
		line-height: 60px;
	} */

.list .under-line {
	color: #f8931f;
	display: inline-block;
	line-height: normal;
	cursor: pointer;
}

.list ul li span em {
	/* margin-right: 10px; */
	font-size: 16px;
}

.list .edit {
	color: #fe8d2c;
}

.list .line {
	display: inline-block;
	width: 2px;
	height: 18px;
	background: #ebeef5;
	vertical-align: middle;
	margin: 0 5px;
}

.list .del {
	color: #fd3f1f;
}

.circle {
	display: inline-block;
	width: 26px;
	height: 26px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	margin: 0 auto;
	margin-right: 5px;
	margin-top: 15px;
	background: #fff;
}

.on {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
.page-box {
	margin-top: 20px;
}
.labItem {
	margin-bottom: 5px;
	margin-left: 0 !important;
	margin-right: 10px;
	float: left;
}
</style>