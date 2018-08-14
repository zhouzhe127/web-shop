<!--
    **员工管理（品牌）
    *
    * 江振谷
    * *
    *
-->
<template>
	<section id="employlist">
		<section class="top" v-show="!isBatch">
			<section class="detLi" :title="selectedJob">
				<div class="select-body-btn select-btn" @click.stop @click="jobOrShop('job')">
					<span>{{selectedJob}}</span>
					<em>
						<i></i>
					</em>
				</div>
				<div v-if="showJob == 'job'" class="detDiv" style="width: 600px;top: 52px;left: 0px;">
					<i class="detI" style="left: 160px;"></i>
					<div class="detH3" @click.stop style="text-align: left;max-height: 500px;overflow: auto;">
						<div class="jobBtn">
							<a href="javascript:void(0)" @click="chooseJob('brand')" class="job" :class="{'selectbtn' : brandType == 'brand'}">品牌职位</a>
							<a href="javascript:void(0)" @click="chooseJob('shop')" class="job" :class="{'selectbtn' : brandType == 'shop'}">门店职位</a>
						</div>
						<ul>
							<li @click="selJob('job')" class="all" :class="{'active': allJob}">全部</li>
							<li @click="selJob('job',item)" :class="{'active': item.selected}" v-for="(item,index) in showJobList" :key="index">{{item.name}}</li>
						</ul>
					</div>
					<div class="detLiBtn">
						<span class="gray" @click="cancel('job')">取消</span>
						<span class="yellow" @click="ensure('job')">确定</span>
					</div>
				</div>
			</section>
			<!--<section class="detLi">-->
			<!--<div class="select-body-btn select-btn" @click.stop @click="jobOrShop('shop')">-->
			<!--<span>{{selectedShop}}</span>-->
			<!--<em>-->
			<!--<i></i>-->
			<!--</em>-->
			<!--</div>-->
			<!--<div v-if="showJob == 'shop'" class="detDiv" style="width: 600px;top: 52px;left: -215px;">-->
			<!--<i class="detI" style="left: 370px;"></i>-->
			<!--<div class="detH3" @click.stop style="text-align: left;max-height: 500px;overflow: auto;">-->
			<!--<div class="jobBtn">-->
			<!--<a href="javascript:void(0)" @click="chooseShop('all')" class="job" :class="{'selectbtn' : shopType == 'all'}">全部</a>-->
			<!--<a href="javascript:void(0)" @click="chooseShop('brand')" class="job" :class="{'selectbtn' : shopType == 'brand'}">直营店</a>-->
			<!--<a href="javascript:void(0)" @click="chooseShop('shop')" class="job" :class="{'selectbtn' : shopType == 'shop'}">加盟店</a>-->
			<!--</div>-->
			<!--<ul>-->
			<!--<li class="all" @click="selJob('shop')" :class="{'active': allShop}">全部</li>-->
			<!--<li @click="selJob('shop',item)" :class="{'active': item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>-->
			<!--</ul>-->
			<!--</div>-->
			<!--<div class="detLiBtn">-->
			<!--<span class="gray" @click="cancel('shop')">取消</span>-->
			<!--<span class="yellow" @click="ensure('shop')">确定</span>-->
			<!--</div>-->
			<!--</div>-->
			<!--</section>-->
			<elShopList :shopIds="shopIds" @chooseShop="backShopId"></elShopList>

			<el-input v-model="staffOrJob" clearable placeholder="请输入员工名称/手机号码" style="width:210px;"></el-input>
			<!--<input class="jobName" type="text" placeholder="请输入员工名称/手机号码" v-model="staffOrJob">-->
			<a @click="search" href="javascript:void(0);" class="blue btn">筛选</a>
			<a @click="reset" href="javascript:void(0);" class="gray btn">重置</a>
		</section>
		<section class="list" style="width: 100%;border:1px solid #ebeef5;border-bottom:none">
			<div class="head">
				<span v-show="!isBatch">员工管理列表 · 共<em>{{activityList.length}}</em>个条目</span>
				<span><i></i>品牌指派</span>
				<span><i></i>门店自建</span>
			</div>
		</section>
		<el-table class="list" :data="activityPageList" border style="width: 100%;" stripe :header-cell-style = "{'background-color':'#f5f7fa'}">
			<el-table-column fixed align="center" min-width = "120" :render-header="renderHeader" label="操作" style="text-aline:center;">
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
			<el-table-column width = "80" align="center" label="序号">
				<template slot-scope="scope">
					<span>{{(scope.$index+1)+(page-1)*10}}</span>
				</template>
			</el-table-column>
			<el-table-column show-overflow-tooltip  align="center" label="员工名称" prop="userName"></el-table-column>
			<el-table-column show-overflow-tooltip  align="center" label="品牌职位">
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
			<el-table-column show-overflow-tooltip  align="center" label="门店职位" prop="shopRole">
				<template slot-scope="scope">
					<span style="cursor:pointer" v-if="scope.row.shopRole.length != 0">
						<el-popover
								placement="top"
								width="400"
								trigger="click">
							<div>
								<i v-for="(info,i) in scope.row.shopRole" :key="i+'-'">
									<i :class="{'brand': info.roleId >= 100000,'shop': info.roleId < 100000}">{{info.roleName}}</i>
									<i v-if="i != scope.row.shopRole.length-1">、</i>
								</i>
							</div>
							<span slot="reference" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
								<i v-for="(info,i) in scope.row.shopRole" @click="showNames(scope.$index)" :key="i+'-'">
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
			<el-pagination @current-change="pageChange" background :current-page="page" layout="total, prev, pager, next, jumper" :total="activityList.length"></el-pagination>
		</div>
		<addWin v-if="isStaff" @getStaff="getStaff" :edit="edit" :jobInfo="info"></addWin>
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
				showJob: null, //选择门店
				brandType: 'brand',
				shopType: 'all',
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
				total: 0, // 总页数
				num: 10, // 当前每页展示数量
				page: 1, //当前第几页
				showBatch: false, //批量管理职位编辑弹窗
				staffOrJob: '', //筛选填入的门店或职位名称
				newList: [], //筛选后列表
				isNames: -1,
			};
		},
		mounted() {
			this.initBtn();
			this.getUserList();
			document.addEventListener('click', this.remove);
			this.getShopList();
		},
		destroyed() {
			document.removeEventListener('click', this.remove);
			this.$store.commit('setPageTools', {});
		},
		methods: {
			renderHeader(h,{column,$index}){
				console.log(column);
				if(!this.isBatch){
					return h('span',column.label);
				}else {
					return h('span',{},[
						h('span',{
							class: 'under-line edit',
							style: 'margin-right: 30px; color:#F8931F;cursor:pointer',
							on: {
								click: this.editBatch
							}
						},'编辑'),
						h('span', {
							class: 'under-line del',
							style: 'color: #FD3E1F;cursor:pointer',
							on: {
								click: this.delBatch
							}
						},'删除')
					])
				}
			},
			remove() {
				this.isNames = -1;
				this.showJob = null;
			},
			//初始化右上角按钮
			initBtn() {
				let obj = {
					addStaff: () => { //新建员工
						this.isStaff = true;
						this.edit = false;
					},
					batchOperation: () => { //批量操作
						this.isBatch = true;
						this.completeBtn();
						for (let i = 0; i < this.activityPageList.length; i++) {
							this.activityPageList[i].selected = false;
						}
					}
				};
				this.$store.commit('setPageTools', obj);
			},
			//完成操作按钮
			completeBtn() {
				let obj = {
					completeBatchOperation: () => {
						this.isBatch = false;
						this.initBtn();
					}
				};
				this.$store.commit('setPageTools', obj);
			},
			//批量操作选择
			selected(item) {
				item.selected = !item.selected;
			},
			pageChange(page) {
				this.page = page;
				if (this.newList.length != 0) {
					this.activityPageList = this.newList.slice((page - 1) * this.num, (page - 1) * this.num + this.num);
				} else {
					this.activityPageList = this.activityList.slice((page - 1) * this.num, (page - 1) * this.num + this.num);
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
				this.total = Math.ceil(res.length / this.num);
				this.activityList = res;
				this.activityPageList = res.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num);
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
					res[i].selected = false;
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
				this.isNames = index;
			},
			//删除员工
			delStaff(id) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除？',
					callback: (res) => {
						if (res == 'ok') this.userDel(id);
					}
				});
			},
			//展开职位或门店，已经选择则显示选中
			isSelected(list, res) {
				for (let j = 0; j < res.length; j++) {
					res[j].selected = false;
					for (let i = 0; i < list.length; i++) {
						if (list[i].id == res[j].id && list[i].type == res[j].type) {
							res[j].selected = true;
						}
					}
				}
			},
			//判断是否全部选中
			isAll(data) {
				for (let i = 0; i < data.length; i++) {
					if (!data[i].selected) {
						return false;
					}
				}
				return true;
			},
			//选择职位/门店
			selJob(type, item) {
				let index = 0;
//				if (type == 'shop' && !item) { //门店全部选择
//					if (this.isAll(this.showShopList)) {
//						for (let i = 0; i < this.showShopList.length; i++) {
//							this.showShopList[i].selected = false;
//							this.allShop = false;
//						}
//					} else {
//						for (let i = 0; i < this.showShopList.length; i++) {
//							this.showShopList[i].selected = true;
//							this.allShop = true;
//						}
//					}
//				} else if (type == 'shop' && item) { //点击单个门店选择
//					item.selected = !item.selected;
//					for (let i = 0; i < this.showShopList.length; i++) {
//						if (this.showShopList[i].selected) {
//							index++;
//						}
//					}
//					index == this.showShopList.length ? this.allShop = true : this.allShop = false;
//				}
//				else
				if (type == 'job' && !item) { //职位全部选择
					if (this.isAll(this.showJobList)) {
						for (let i = 0; i < this.showJobList.length; i++) {
							this.showJobList[i].selected = false;
							this.allJob = false;
						}
					} else {
						for (let i = 0; i < this.showJobList.length; i++) {
							this.showJobList[i].selected = true;
							this.allJob = true;
						}
					}
				}
				else if (type == 'job' && item) {
					item.selected = !item.selected;
					for (let i = 0; i < this.showJobList.length; i++) {
						if (this.showJobList[i].selected) {
							index++;
						}
					}
					index == this.showJobList.length ? this.allJob = true : this.allJob = false;
				}
			},
			//选择职位或门店
			jobOrShop(type) {
				this.showJob = type;
				if (type == 'job' && this.jobList.length == 0) {
					this.newGetJobInfoList();
				}
//				else if (type == 'shop' && !this.shopList) {
//					let res = storage.session('shopList');
//					for (let i = 0; i < res.length; i++) {
//						res[i].selected = false;
//					}
//					this.shopList = res;
//					this.showShopList = res;
//				}
				else if (type == 'job' && this.jobList.length != 0) {
					let jobIds = this.jobIds.brand.concat(this.jobIds.shop);
					this.isSelected(jobIds, this.jobList);
					this.isAll(this.showJobList) ? this.allJob = true : this.allJob = false;
				}
//				else if (type == 'shop' && this.shopList.length != 0) {
//					this.isSelected(this.shopIds, this.shopList);
//					this.isAll(this.showShopList) ? this.allShop = true : this.allShop = false;
//				}
			},
			//职位切换
			chooseJob(type) {
				this.brandType = type;
				this.showJobList = [];
				for (let i = 0; i < this.jobList.length; i++) {
					if (type == 'brand' && this.jobList[i].type === '1') {
						this.showJobList.push(this.jobList[i]);
					} else if (type == 'shop' && this.jobList[i].type === '0') {
						this.showJobList.push(this.jobList[i]);
					}
				}
				this.isAll(this.showJobList) ? this.allJob = true : this.allJob = false;
			},
			//组件返回店铺Id
			backShopId(id){
				console.log(id);
				this.shopIds=id;
			},
			//门店选择切换
//			chooseShop(type) {
//				this.shopType = type;
//				this.showShopList = [];
//				if (type === 'all') { //全部
//					this.showShopList = this.shopList;
//				} else if (type === 'brand') { //直营店
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].ischain == '1') {
//							this.showShopList.push(this.shopList[i]);
//						}
//					}
//				} else if (type === 'shop') { //加盟店
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].ischain == '2') {
//							this.showShopList.push(this.shopList[i]);
//						}
//					}
//				}
//				this.isAll(this.showShopList) ? this.allShop = true : this.allShop = false;
//			},
			//职位/门店选择确定
			ensure(type) {
				this.showJob = null;
				if (type == 'job') {
					this.selectedJob = '';
					this.jobIds.brand = [];
					this.jobIds.shop = [];
					for (let i = 0; i < this.jobList.length; i++) {
						if (this.jobList[i].selected) {
							this.selectedJob += this.jobList[i].name + ',';
							if (this.jobList[i].type === '1') { //品牌
								this.jobIds.brand.push(this.jobList[i]);
							} else {
								this.jobIds.shop.push(this.jobList[i]);
							}
						}
					}
					this.selectedJob = this.selectedJob.slice(0, this.selectedJob.length - 1);
					if (!this.selectedJob) this.selectedJob = '全部职位';
				}
//				else if (type == 'shop') {
//					this.selectedShop = '';
//					this.shopIds = [];
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].selected) {
//							this.selectedShop += this.shopList[i].shopName + ',';
//							this.shopIds.push(this.shopList[i].id);
//						}
//					}
//					this.selectedShop = this.selectedShop.slice(0, this.selectedShop.length - 1);
//					if (!this.selectedShop) this.selectedShop = '全部门店';
//				}
			},
			//职位/门店选择取消
			cancel() {
				this.showJob = null;
			},
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
					callback: (res) => {
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
				if (this.staffOrJob != '') { //过滤员工
					list = this.activityList.filter((v)=>{
						if (v.userName && v.mobile) {
							return (
								v.userName.indexOf(this.staffOrJob) >= 0 ||
								v.mobile.indexOf(this.staffOrJob) >= 0
							);
						} else {
							return false;
						}
					});
					// for (let i = 0; i < this.activityList.length; i++) {
					// 	if (this.activityList[i].userName && this.activityList[i].userName.indexOf(this.staffOrJob) != -1) {
					// 		list.push(this.activityList[i]);
					// 	}
					// }

				} else {
					list = utils.deepCopy(this.activityList);
				}
				if (this.shopIds.length != 0) { //过滤门店
					for (let i = 0; i < list.length; i++) {
						let aa = false;
						if (list[i].brandRole.shopIds) {
							for (let j = 0; j < list[i].brandRole.shopIds.length; j++) {
								if (this.shopIds.indexOf(list[i].brandRole.shopIds[j]) != -1) {
									aa = true;
									break;
								}
							}
						}
						if (!aa) {
							for (let m = 0; m < list[i].shopRole.length; m++) {
								if (list[i].shopRole[m].shopIds) {
									for (let n = 0; n < list[i].shopRole[m].shopIds.length; n++) {
										if (this.shopIds.indexOf(list[i].shopRole[m].shopIds[n]) != -1) {
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
				let brand = []; //选中的品牌职位
				let shop = []; //选中的门店职位
				for (let i = 0; i < this.jobIds.brand.length; i++) {
					brand.push(this.jobIds.brand[i].id);
				}
				for (let i = 0; i < this.jobIds.shop.length; i++) {
					shop.push(this.jobIds.shop[i].id);
				}
				if (brand.length != 0 || shop.length != 0) { //过滤职位
					for (let i = 0; i < list.length; i++) {
						let aa = false;
						if (brand.indexOf(list[i].brandRole.roleId) != -1) {
							aa = true;
						}
						if (!aa) {
							for (let m = 0; m < list[i].shopRole.length; m++) {
								if (shop.indexOf(list[i].shopRole[m].roleId) != -1) {
									aa = true;
									break;
								}
							}
							if (!aa) { //门店自建
								if (shop.indexOf('-1') != -1) {
									for (let m = 0; m < list[i].shopRole.length; m++) {
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
				this.total = Math.ceil(list.length / this.num);
				this.activityPageList = list.slice(0 * this.num, 0 * this.num + this.num);
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
			addWin: () =>
				import ( /*webpackChunkName: 'addstaff_win'*/ './addstaff_win'),
			page: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			addjob: () =>
				import ( /*webpackChunkName: 'addjob_win'*/ './addjob_win'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			elShopList: () =>
				import ( /*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
		},
	};
</script>
<style type="text/css" scoped>
	.detLi {
		position: relative;
		cursor: pointer;
		display: inline-block;
		margin-bottom: 10px
	}

	.detLi .detDiv {
		display: inline-block;
		width: 300px;
		background: #45404b;
	;
		position: absolute;
		top: 45px;
		right: 0;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 2000;
	}

	.detLi .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
	}

	.detLi .detDiv .detH3 {
		line-height: 22px;
		color: #e6e6e7;
		text-align: center;
		margin: 10px 30px;
		min-height: 200px;
	}

	.detLi .detLiBtn {
		overflow: hidden;
		float: left;
		width: 100%;
	}

	.detLi .detDiv ul li {
		display: inline-block;
		height: 40px;
		border: 1px solid #fff;
		padding: 5px 10px;
		margin: 5px
	}

	.detLi .detDiv ul li.active {
		background: url(../../res/images/sign.png) right 103% no-repeat;
		border-color: #FF9800;
		color: #FF9800;
	}

	.detLi .jobBtn {
		margin-bottom: 20px;
	}

	.detLi .jobBtn .job {
		margin-right: 20px;
		font-size: 18px;
		width: 80px;
		color: #fff;
	}

	.detLi .jobBtn .selectbtn {
		color: #FF9200;
		border-bottom: 4px solid #FF9200;
	}

	.detLi .detLiBtn span {
		float: left;
		color: #fff;
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.top .select-btn {
		/*margin-right: 20px;*/
	}

	/*.top .jobName {*/
	/*width: 200px;*/
	/*height: 40px;*/
	/*vertical-align: middle;*/
	/*padding-left: 10px;*/
	/*border: 1px solid #B3B3B3;*/
	/*margin-right: 20px;*/
	/*}*/

	.select-body-btn {
		height: 40px;
		padding-right: 40px;
		position: relative;
		cursor: pointer;
		vertical-align: middle;
		display: inline-block;
		border: #b3b3b3 solid 1px;
	}

	.select-body-btn em {
		width: 40px;
		height: 38px;
		position: absolute;
		right: 0;
		top: 0;
	}

	.select-body-btn em i {
		height: 10px;
		width: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -5px;
		margin-left: -5px;
		border-top: 10px solid #b3b3b3;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		box-sizing: border-box;
	}

	.select-body-btn span {
		width: 150px;
		height: 38px;
		line-height: 38px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 5px;
		border-right: 1px #B3B3B3 solid;
		color: #666666;
	}

	.affiche {
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding-left: 45px;
		color: #2e87c4;
		background-color: #eaf4fc;
		border: 1px solid #2ea7e0;
	}

	.affiche .affiche-tit {
		color: #036eb8;
		font-weight: 700;
	}

	.btn {
		width: 100px;
		height: 40px;
		line-height: 40px;
		vertical-align: middle;
	}

	/* .list{
        border: 1px solid #ccc;
        margin-top: 20px;
    } */

	.list .title span {
		float: left;
		width: 14%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.list .operate span {
		float: left;
		/* width: 14%; */
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

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
		background: #F8931F;
	}

	.list .head span:last-child i {
		background: #2ea7e0;
	}

	.list .head span:nth-child(2) {
		margin-right: 40px;
	}

	.list .head em {
		color: #FD3E1F;
		padding: 0 3px;
		font-size: inherit;
	}

	.brand {
		color: #F79337;
	}

	.shop {
		color: #2FA8DC;
	}

	.list .operate {
		/* background: #F2F2F2; */
		overflow: hidden;
	}

	.list .operate span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.list ul li {
		overflow: hidden;
		border-bottom: 4px solid #F7F7F7;
	}

	.list ul li span {
		height: 60px;
		line-height: 60px;
	}

	.list .under-line {
		color: #F8931F;
		display: inline-block;
		line-height: normal;
		cursor: pointer;
	}

	.list ul li span em {
		/* margin-right: 10px; */
		font-size: 16px;
	}

	.list .edit {
		color: #FE8D2C;
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
		color: #FD3F1F;
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
		background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;
	}
	.page-box{
		margin-top: 20px;
	}
</style>