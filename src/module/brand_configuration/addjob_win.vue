/* * @file * *
选择职位及门店（二级弹窗）
* * @author zhengu.jiang
*/
<template>
	<div>
		<win @winEvent="getWin" :align="'center'" :width="700" :height="400" :ok="okStyle">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" v-cloak>
				<!--选择职位-->
				<div v-if="isJob" class="job">
					<div v-if="batch" style="width:100%;height: 50px;overflow:hidden;margin-top:20px;margin-bottom:20px">
						<a @click="selectJobType(1)" class="raduobtn" :class="{'selectbtn' : jobType === 1}" href="javascript:void(0);" style="">品牌职位</a>
						<a @click="selectJobType(0)" class="raduobtn" :class="{'selectbtn' : jobType === 0}" href="javascript:void(0);" style="">门店职位</a>
					</div>
					<radio @selOn="getRadio" :list="jobList" :index="index" :name="'name'"></radio>
					<h3 v-if="jobList[index]" class="selJobName">已选择:{{jobList[index].name}}</h3>
				</div>
				<!--选择门店-->
				<div v-else>
					<elShopListWin :shopIds="editJob?editJob.shopIds:[]" @chooseShop="backShopId"></elShopListWin>
				</div>
				<!--<div v-else class="shop">-->
					<!--<div style="width:100%;height: 50px;overflow:hidden;margin-top:20px;margin-left:20px">-->
						<!--<a @click="selectShopType(-1)" class="raduobtn" :class="{'selectbtn' : shopType === -1}" href="javascript:void(0);">全部</a>-->
						<!--<a @click="selectShopType(1)" class="raduobtn" :class="{'selectbtn' : shopType === 1}" href="javascript:void(0);" style="">直营店</a>-->
						<!--<a @click="selectShopType(2)" class="raduobtn" :class="{'selectbtn' : shopType === 2}" href="javascript:void(0);" style="">加盟店</a>-->
					<!--</div>-->
					<!--<ul>-->
						<!--<li @click="selJob(item)" :class="{active: item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>-->
					<!--</ul>-->
				<!--</div>-->
				<!--<div v-if="!isJob" class="bottomSel">-->
					<!--<section v-on:click="allShops(0)" class="isallselect">取消全部</section>-->
					<!--<section v-on:click="allShops(1)" class="isallselect allselect">选择全部</section>-->
					<!--<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择:{{selectNum}}个</h3>-->
				<!--</div>-->
			</div>
		</win>
	</div>

</template>

<script>
	import http from 'src/manager/http';
	export default {
		data() {
			return {
				title: '',
				list: [],
				index: -1,
				okStyle: {
					content: '下一步',
					style: {
						backgroundColor: '#F79337',
						color: '#fff'
					}
				},
				isJob: true, //true职位弹窗内容 false门店弹窗内容
				isBrand: true, //true为品牌 false为门店
				shopType: -1, //门店类型 1直营店 2加盟店 -1全部
				jobType: 1, //品牌类型 1品牌 0门店
				jobList: [], //职位列表
				allJobList: [], //品牌和门店职位列表
				shopList: [], //店铺列表
				showShopList: [], //选择门店切换时展示的列表
				selectNum: 0, //选择的个数
				jobInfo: {
					roleId: '',
					name: '',
					shopIds: []
				}, //选择的职位
				onIndex: -1,
			};
		},
		props: ['type', 'editJob', 'batch'],
		mounted() {
			//	editJob为null即为添加，否则为编辑
			console.log(this.editJob);
			if (this.type == 'brand') {
				this.editJob ? this.title = '修改品牌职位' : this.title = '选择品牌职位';
				this.isBrand = true;
			} else if (this.type == 'shop') {
				this.editJob ? this.title = '修改门店职位' : this.title = '选择门店职位';
				this.isBrand = false;
			} else if (this.batch) {
				this.title = '批量管理员工职位';
			}
			this.newGetJobInfoList();
		},
		methods: {
			//获取门店列表
			async getShopList() {

				console.log(this.editJob);

				let res = await http.getShopList();
				for (let i = 0; i < res.length; i++) {
					res[i].selected = false;
				}
				this.shopList = res;
				this.showShopList = res;
				if (this.editJob) {
					let shopIds = this.editJob.shopIds;
					for (let m = 0; m < this.shopList.length; m++) {
						for (let n = 0; n < shopIds.length; n++) {
							if (shopIds[n] == this.shopList[m].id) {
								this.shopList[m].selected = true;
							}
						}
					}
					this.selectNum = 0;
					for (let i = 0; i < this.shopList.length; i++) {
						if (this.shopList[i].selected) {
							this.selectNum++;
						}
					}
				}
			},
			//获取职位列表
			async newGetJobInfoList() {
				this.jobList = [];
				let res = await http.getUserRoleList();
				let admin = {
					roleId: 0,
					name: '超级管理员',
					shopIds: []
				};
				if (this.batch) {
					this.allJobList = res;
					for (let i = 0; i < this.allJobList.length; i++) {
						if (this.allJobList[i].type === '1') {
							this.jobList.push(this.allJobList[i]);
						}
					}
				} else {
					for (let i = 0; i < res.length; i++) {
						if (this.isBrand && res[i].type === '1') {
							this.jobList.push(res[i]);
						} else if (!this.isBrand && res[i].type === '0' && res[i].id >= 100000) {
							this.jobList.push(res[i]);
						}
					}
				}
				this.jobList.unshift(admin);
				if (this.editJob) {
					this.jobInfo = this.editJob;
					for (let j = 0; j < this.jobList.length; j++) {
						if (this.jobInfo.roleId == this.jobList[j].id) {
							this.index = j;
						}
					}
					if (this.jobInfo.roleId == 0) {
						this.index = 0;
					}

				}
			},

			getWin(res) {
				if (this.isJob) {
					if (res == 'ok') {//选择职位
						if (this.jobInfo.roleId == '') {
							this.$store.commit('setWin', {
								title: '提示信息',
								winType: 'alert',
								content: '请选择职位'
							});
							return false;
						}
						if (this.index !== 0 || (this.index === 0 && this.type == 'shop')) {
							if (this.batch) {
								this.title = this.title + '（' + this.jobInfo.name + '）' + '适用门店';
							} else {
								this.title = this.title + '（' + this.jobInfo.name + '）' + '适用门店';
							}
							this.getShopList();
							this.isJob = false;
							this.okStyle.content = '确定';
						} else {
							this.$emit('addJob', res, 'admin', this.jobType);
							// this.userEditBrandUsers();
						}
					}
					this.$emit('addJob', res);
				}
//				else { //选择门店
//					if (res == 'ok') {
//						this.jobInfo.shopIds = [];
//						for (let i = 0; i < this.shopList.length; i++) {
//							if (this.shopList[i].selected) {
//								this.jobInfo.shopIds.push(this.shopList[i].id);
//							}
//						}
//						if (this.jobInfo.shopIds.length == 0) {
//							this.$store.commit('setWin', {
//								title: '提示信息',
//								winType: 'alert',
//								content: '请选择门店'
//							});
//							return false;
//						}
//						if (this.index === 0 && this.type == 'shop') {
//							this.jobInfo.roleId = '0';
//						}
//					}
//					let data = {
//						jobInfo: this.jobInfo,
//						shopList: this.shopList
//					};
//					this.$emit('addJob', res, data, this.jobType);
//				}
			},
			//选择店铺弹窗返回
			backShopId(res,id){
				console.log(id);
				if (res == 'ok') {
					this.jobInfo.shopIds=id;
//						for (let i = 0; i < this.shopList.length; i++) {
//							if (this.shopList[i].selected) {
//								this.jobInfo.shopIds.push(this.shopList[i].id);
//							}
//						}
					if (this.jobInfo.shopIds.length == 0) {
						this.$store.commit('setWin', {
							title: '提示信息',
							winType: 'alert',
							content: '请选择门店'
						});
						return false;
					}
					if (this.index === 0 && this.type == 'shop') {
						this.jobInfo.roleId = '0';
					}
				}
				let data = {
					jobInfo: this.jobInfo,
					shopList: this.shopList
				};
				this.$emit('addJob', res, data, this.jobType);
			},
			//职位类型切换
			selectJobType(type) {
				this.jobType = type;
				this.jobList = [];
				this.index = -1;
				for (let i = 0; i < this.allJobList.length; i++) {
					if (type == this.allJobList[i].type) {
						if (type === 1) {
							this.jobList.push(this.allJobList[i]);
						} else if (type === 0 && this.allJobList[i].id >= 100000) {
							this.jobList.push(this.allJobList[i]);
						}

					}
				}
				let admin = {
					roleId: 0,
					name: '超级管理员',
					shopIds: []
				};
				this.jobList.unshift(admin);
			},
			//批量操作职位单选
			isSelected(i) {
				if (i == this.onIndex) return true;
				return false;
			},

			//门店类型切换
//			selectShopType(type) {
//				this.shopType = type;
//				this.showShopList = [];
//				if (type === -1) { //全部
//					this.showShopList = this.shopList;
//				} else if (type === 1) { //直营店
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].ischain == '1') {
//							this.showShopList.push(this.shopList[i]);
//						}
//					}
//				} else if (type === 2) { //加盟店
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].ischain == '2') {
//							this.showShopList.push(this.shopList[i]);
//						}
//					}
//				}
//			},
			//门店选择
//			selJob(item) {
//				item.selected = !item.selected;
//				this.selectNum = 0;
//				for (let i = 0; i < this.shopList.length; i++) {
//					if (this.shopList[i].selected) {
//						this.selectNum++;
//					}
//				}
//			},
			//门店选择公用
//			shopSel(type) {
//				if (this.shopType === -1) {
//					for (let i = 0; i < this.showShopList.length; i++) {
//						this.showShopList[i].selected = type;
//					}
//				} else if (this.shopType === 1) {
//					for (let i = 0; i < this.showShopList.length; i++) {
//						if (this.showShopList[i].ischain == '1') {
//							this.showShopList[i].selected = type;
//						}
//					}
//				} else if (this.shopType === 2) {
//					for (let i = 0; i < this.showShopList.length; i++) {
//						if (this.showShopList[i].ischain == '2') {
//							this.showShopList[i].selected = type;
//						}
//					}
//				}
//			},
			//门店全部选择与取消
//			allShops(type) {
//				if (type === 0) { //全部取消
//					this.shopSel(false);
//					this.selectNum = 0;
//				} else { //全部选择
//					this.shopSel(true);
//					this.selectNum = 0;
//					for (let i = 0; i < this.shopList.length; i++) {
//						if (this.shopList[i].selected) {
//							this.selectNum++;
//						}
//					}
//					// this.selectNum = this.showShopList.length;
//				}
//			},
			//单选按钮选择
			getRadio(res) {
				this.index = res;
				if (res != -1) {
					this.jobInfo.roleId = this.jobList[res].id;
					this.jobInfo.name = this.jobList[res].name;
					this.okStyle.content = '下一步';
				}
				if (res === 0 && this.jobType === 1) {
					this.okStyle.content = '确定';
				}
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName: "win"*/ 'src/components/win'),
			radio: () =>
				import ( /*webpackChunkName: "radio_btn"*/ 'src/components/radio_btn'),
			elShopListWin: () =>
				import ( /*webpackChunkName: "el_shopList_win"*/ 'src/components/el_shopList_win')
		},
	};
</script>

<style type="text/css" scoped>
	#tan {
		position: relative;
	}

	#tan .selJobName {
		width: 200px;
		height: 40px;
		line-height: 40px;
		float: right;
		color: #FF9700;
		position: absolute;
		top: 350px;
		right: 20px;
	}

	.raduobtn {
		width: 120px;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		float: left;
		border-radius: 5px;
		margin-right: 15px;
		background-color: #f2f2f2;
		color: #333;
	}

	.selectbtn {
		background-color: #2FA8DD;
		color: #fff;
	}

	.shop .active {
		background: url(../../res/images/sign.png) right 103% no-repeat;
		border-color: #FF9800;
		color: #FF9800;
	}

	.shop ul {
		margin: 10px 20px;
		height: 260px;
		overflow-y: auto;
	}

	.shop ul li {
		display: inline-block;
		padding: 0 20px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
		border: 1px solid #D2D2D2;
		text-align: center;
		cursor: pointer;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	.shop ul li.active {
		border-color: #FF9200;
		color: #FF9200;
		background: url("../../res/images/sign.png") right bottom no-repeat;
	}

	.job {
		padding: 20px;
	}

	.sign {
		background: #FFEDD3;
		border-color: #FF9200 !important;
		color: #FF9200;
	}

	.bottomSel {
		width: 100%;
		height: 30px;
		position: fixed;
		left: 14px;
	}

	.bottomSel .isallselect {
		cursor: pointer;
		width: 80px;
		height: 30px;
		float: left;
		line-height: 30px;
		text-align: center;
		margin: 5px;
		border: 1px solid #A0A0A0;
		color: #A0A0A0;
		float: left;
	}

	.bottomSel .allselect {
		border: 1px solid #FF9700;
		color: #FF9700;
	}
</style>