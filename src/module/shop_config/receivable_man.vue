<!--
	**挂账账户配置页面
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div id="receivableMan">
		<section v-if="!showClearing" class="seac_top" style="width;100%;height:50px;">
			<el-select v-model="recType" placeholder="请选择账户类型" style="width:150px;">
				<el-option v-for="item in accountType" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<span>-</span>
			<el-input v-model="seachValue" clearable maxlength="11" placeholder="请输入账户名称/联系人/电话" style="width:225px;"></el-input>
			<el-button @click="seachFn" type="primary">筛选</el-button>
			<el-button @click="resetFn" type="info">重置</el-button>
			<!-- <a href="javascript:;" class="blue" style="width:110px;height:40px;line-height:40px;" @click="seachFn">筛选</a>
			<a href="javascript:;" class="gray" style="width:110px;height:40px;line-height:40px;" @click="resetFn">重置</a> -->
		</section>
		<section v-if="!showClearing" class="allList">
			<section class="oBox">
				<div class="boxTop">
					<span style="font-size:16px;margin-right: 20px;">挂账账户列表 · 共
						<span style="color: #ff3c04;font-size: inherit;">{{recList.length}}</span>个条目</span>
					<span v-if="ischain=='1' || ischain=='2'" class="aSpan">
						<i class="aI" style=""></i>品牌指派
					</span>
					<span v-if="ischain=='1' || ischain=='2'" class="aSpan" style="color:#2ea7e0;">
						<i class="aI" style="background:#2ea7e0;"></i>门店自建
					</span>
				</div>
				<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="list" fixed style="width: 100%">
					<el-table-column fixed min-width="300" align="center" label="操作">
						<template slot-scope="scope">
							<span v-if="ischain=='3'" style="color: #01AAE5;cursor:pointer" @click="toShop(scope.row)">指派</span>
							<span v-if="ischain=='3'" style="padding:0 5px;color: #D2D2D2">|</span>
							<span style="color: #FE8D2C;cursor:pointer" @click="clearing(scope.row)">结算</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span style="color: #01AAE5;cursor:pointer" @click="getDetial(scope.row)">详情</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span style="color: #FD950E;cursor:pointer" @click="edit(scope.row)">编辑</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span v-if="scope.row.status=='0'" style="color: #FD3F03;cursor:pointer" @click="stopman(scope.row,scope.$index)">停用</span>
							<span v-if="scope.row.status==1" style="color: #01AAE5;cursor:pointer" @click="stopman(scope.row,scope.$index)">启用</span>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<span style="color: #FE3D06;cursor:pointer" @click="delman(scope.row,scope.$index)">删除</span>
						</template>
					</el-table-column>
					<el-table-column align="center" min-width="100" label="账户类型">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 2">企业用户</span>
							<span v-if="scope.row.type == 1">个人用户</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="name" label="账户名称">
						<template slot-scope="scope">
							<span v-if="scope.row.isAppoint == 1" style="color:#fe9200;">{{scope.row.name}}</span>
							<span v-if="scope.row.isAppoint == 0" :style="{color:ischain=='1'||ischain=='2'?'#29abe2':'#333'}">{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" prop="contactMan" align="center" label="联系人"> </el-table-column>
					<el-table-column prop="mobile" min-width="120" align="center" label="电话"> </el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" prop="contactMan" align="center" label="挂账人">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 2">{{scope.row.personNum}}人</span>
							<span v-if="scope.row.type == 1">{{scope.row.contactMan}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" prop="singlePrice" align="center" label="挂账额度(单笔)">
						<template slot-scope="scope">
							<span v-if="scope.row.singlePrice*1 == 0">无上限</span>
							<span v-if="scope.row.singlePrice*1 > 0">{{scope.row.singlePrice}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="120" align="center" prop="allPrice" label="挂账额度(总额)">
						<template slot-scope="scope">
							<span v-if="scope.row.allPrice*1 == 0">无上限</span>
							<span v-if="scope.row.allPrice*1 > 0">{{scope.row.allPrice}}</span>
						</template>
					</el-table-column>
				</el-table>
			</section>
		</section>
		<div v-if="!showClearing" style="margin-top:10px;">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageClick" :current-page="currentPage" :page-size="num" layout="sizes, prev, pager, next" :page-count="totalNum" :page-sizes="[10, 20, 30]"></el-pagination>
			<!-- <pageElement @pageNum="pageClick" :page="currentPage" :total="totalNum" :num='num' :isNoJump='true'></pageElement> -->
		</div>
		<add-receivable-man @winResult="doResult" v-if="showMan" :manDetial="manDetial" :isAdd="isAdd"></add-receivable-man>
		<!--<shopsSelect v-if="showShop" @shopsSelect="shopResult" :shopIds="''"></shopsSelect>-->
		<elShopListWin :shopIds="[]" @chooseShop="shopResult" v-if="showShop"></elShopListWin>
		<clearingReceivable @clearResult="clearingResult" v-if="showClearing" :manDetial="manDetial" :isAClearing="isAClearing"></clearingReceivable>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: '', //店铺id
			ischain: '',
			accountType: [
				{ name: '全部', id: 0 },
				{ name: '个人用户', id: 1 },
				{ name: '企业用户', id: 2 }
			],
			recType: '', //账户类型下标
			seachValue: '', //搜索的value
			manDetial: {}, //账户详情，
			showMan: false, //添加-修改弹框展示
			showClearing: false, //结算页面展示
			showShop: false, //指派商店页面展示
			recList: [], //用户列表
			copyRecList: [], //copy用户列表
			isAClearing: false, //是否是结算页面
			currentPage: 1,
			num: 10
		};
	},
	mounted() {
		this.isTatle();
	},
	computed: {
		totalNum() {
			return Math.ceil(this.recList.length / this.num);
		},
		list() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.recList.slice(startIndex, endIndex);
		}
	},
	components: {
		AddReceivableMan: () =>
			import(/*webpackChunkName: "add_receivable_man"*/ 'src/module/shop_config/receivable/add_receivable_man'),
		clearingReceivable: () =>
			import(/*webpackChunkName: "clearing_receivable"*/ 'src/module/shop_config/receivable/clearing_receivable'),
		elShopListWin: () =>
			import(/* webpackChunkName:'el_shopList_win' */ 'src/components/el_shopList_win')
	},
	created() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.ischain = userData.currentShop.ischain;
		this.init();
	},
	methods: {
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少行
		handleSizeChange(e) {
			this.num = e;
			this.currentPage = 1;
		},
		isTatle() {
			let rools = [
				{
					name: '添加挂账账户',
					fn: this.add,
					type: 4,
					className: 'primary',
				}
			];
			this.$store.commit('setPageTools', rools);
		},
		async init() {
			let res = await http.getBillList();
			this.recList = res;
			this.copyRecList = res;
		},
		//搜索按钮点击
		seachFn() {
			let findList = [];
			this.currentPage = 1; //让分页页数置为第一页
			let list = this.copyRecList;
			for (let i = 0; i < list.length; i++) {
				let name = list[i].name;
				let mobile = list[i].mobile;
				let contactMan = list[i].contactMan;
				if (
					this.seachValue.trim().length > 0 &&
					name.indexOf(this.seachValue) == -1 &&
					mobile.indexOf(this.seachValue) == -1 &&
					contactMan.indexOf(this.seachValue) == -1
				) {
					continue;
				}
				if (this.recType != 0 && this.recType != list[i].type) {
					continue;
				}
				findList.push(list[i]);
			}
			this.recList = findList;
			if (this.seachValue.trim().length == 0 && this.recType == 0) {
				this.recList = this.copyRecList;
			}
		},
		//重置按钮点击
		resetFn() {
			this.seachValue = '';
			this.recType = '';
			this.recList = this.copyRecList;
		},
		//添加
		add() {
			this.showMan = true;
			this.isAdd = true;
			this.manDetial = {
				name: '',
				type: '1',
				contactMan: '',
				mobile: '',
				singlePrice: '',
				allPrice: '',
				billPerson: []
			};
		},
		//修改
		async edit(detial) {
			this.showMan = true;
			this.isAdd = false;
			detial.billPerson = [];
			this.manDetial = detial;
			let manDetial = await http.getOneBill({
				data: { billId: detial.id }
			});
			for (let i = 0; i < manDetial.billPerson.length; i++) {
				manDetial.billPerson[i].isEdit = false;
			}
			this.manDetial = manDetial;
		},
		//删除
		delman(detial, index) {
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除帐号名称为“' + detial.name + '”的帐号吗?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteBill(detial, index);
					}
				}
			});
		},
		//结清
		async clearing(detial) {
			this.manDetial = await http.getOneBill({
				data: { billId: detial.id }
			});
			this.showClearing = true;
			this.isAClearing = true;
		},
		//挂账账户详情按钮点击
		async getDetial(detial) {
			this.manDetial = await http.getOneBill({
				data: { billId: detial.id }
			});
			this.showClearing = true;
			this.isAClearing = false;
		},
		//停用
		stopman(detial, index) {
			this.manDetial = detial;
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定停用帐号名称为“' + detial.name + '”的帐号吗?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.isStopman(detial, index);
					}
				}
			});
		},
		//停用启用接口
		async isStopman(detial, index) {
			let stop = await http.changeBillStatus({
				data: {
					billId: detial.id,
					status: detial.status == '0' ? '1' : '0'
				}
			});
			if (stop) {
				this.recList[index].status =
					this.recList[index].status == 1 ? 0 : 1;
			}
		},
		//删除挂账账户接口
		async deleteBill(detial, index) {
			let del = await http.deleteBill({ data: { billId: detial.id } });
			if (del) {
				this.recList.splice(index, 1);
			}
		},
		//指派
		toShop(detial) {
			this.showShop = true;
			this.manDetial = detial;
		},
		//添加-修改返回
		async doResult(res, manDetial) {
			if (res == 'ok') {
				if (this.isOk(manDetial)) {
					let item = [];
					let manDet = utils.deepCopy(manDetial);
					let detial = manDetial.billPerson;
					for (let i = 0; i < detial.length; i++) {
						let abc = '';
						abc = detial[i].name + ',' + detial[i].mobile;
						item.push(abc);
					}
					manDet.billPerson = item;
					this.manDetial = manDetial;
					if (this.isAdd) {
						let add = await http.createBill({ data: manDet });
						if (add) {
							this.recList.push(manDetial);
							this.$store.commit('setWin', {
								winType: 'alert',
								content: '添加成功！'
							});
							this.init();
							this.showMan = false;
						}
					} else {
						manDet.billId = manDet.id;
						let edit = await http.editBill({ data: manDet });
						if (edit) {
							this.$store.commit('setWin', {
								winType: 'alert',
								content: '修改成功！'
							});
							this.showMan = false;
							this.init();
						}
						console.log(this.manDetial);
					}
				} else {
					this.showMan = true;
				}
			} else {
				this.showMan = false;
			}
		},
		//选择店铺后返回
		//		shopResult(res, it) {
		//			console.log(it);
		//			if (res == 'ok') {
		//				if (it == '') {
		//					this.$store.commit('setWin', {
		//						winType: 'alert',
		//						content: '请选择要指派的店铺！'
		//					});
		//					return false;
		//				}
		//				let item = {};
		//				item.billId = this.manDetial.id;
		//				item.shopIds = it;
		//				console.log(item);
		//				this.selectShop(item);
		//			}
		//			this.showShop = false;
		//		},
		shopResult(res, it) {
			console.log(it);
			if (res == 'ok') {
				if (it.length == 0) {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '请选择要指派的店铺！'
					});
					return false;
				}
				let item = {};
				item.billId = this.manDetial.id;
				item.shopIds = it.join(',');
				console.log(item);
				this.selectShop(item);
			}
			this.showShop = false;
		},
		//指派接口
		async selectShop(item) {
			let edit = await http.billAppoint({ data: item });
			if (edit) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '指派成功！'
				});
			}
		},
		//结算返回
		clearingResult() {
			let rools = [
				{
					name: '添加挂账账户',
					fn: this.add,
					type: 4,
					className: 'primary',
				}
			];
			this.$store.commit('setPageTools', rools);
			this.showClearing = false;
		},
		//返回按钮点击
		// back() {
		// 	if (this.isAClearing) {
		// 		this.isAClearing = false;
		// 		return;
		// 	}
		// 	this.showClearing = false;
		// 	console.log(this.isAClearing);
		// 	// this.$emit('winResult'); //抛出一个事件给父组件
		// },
		//结清按钮点击
		// clearingBtn() {
		// 	this.isAClearing = true;
		// },
		isOk(detial) {
			let nameReg = /^1[\d]{10,10}$/;
			if (detial.name.trim().length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '账户名称不能为空'
				});
				return false;
			}
			if (detial.contactMan.trim().length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '联系人不能为空'
				});
				return false;
			}
			if (detial.mobile.trim().length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '手机号不能为空'
				});
				return false;
			}

			if (
				(detial.mobile !== '' && !nameReg.test(detial.mobile)) ||
				detial.mobile.length != 11
			) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '手机号格式错误。'
				});
				return false;
			}

			if (detial.type == 2) {
				if (detial.billPerson.length < 1) {
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '企业账户则必须添加一个挂账人'
					});
					return false;
				}
				for (let i = 0; i < detial.billPerson.length; i++) {
					if (detial.billPerson[i].name.trim().length == 0) {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '挂账人姓名不能为空'
						});
						return false;
					}
					if (detial.billPerson[i].mobile.trim().length == 0) {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '挂账人手机号不能为空'
						});
						return false;
					}
					if (
						detial.billPerson[i].mobile !== '' &&
						!nameReg.test(
							detial.billPerson[i].mobile ||
								detial.billPerson[i].mobile.length != 11
						)
					) {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '手机号格式错误。'
						});
						return false;
					}
				}
			}
			let numReg = /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/;
			if (
				detial.singlePrice.trim().length > 0 &&
				!numReg.test(detial.singlePrice)
			) {
				this.$store.commit('setWin', {
					content: '单笔额度请输入正确的数字!'
				});
				return false;
			} else if (
				detial.allPrice.trim().length > 0 &&
				!numReg.test(detial.allPrice)
			) {
				this.$store.commit('setWin', {
					content: '总额度请输入正确的数字!'
				});
				return false;
			}
			if (
				detial.singlePrice !== '' &&
				detial.allPrice !== '' &&
				detial.singlePrice * 1 > detial.allPrice * 1
			) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '单笔额度不能大于总额'
				});
				return false;
			}
			return true;
		}
	}
};
</script>
<style lang="less" scoped>
.allList {
	width: 100%;
	.oBox {
		width: 100%;
		border: 1px solid #ebeef5;
		border-bottom: none;
		padding: 1px;
		margin: 10px 0;
		.boxTop {
			height: 50px;
			line-height: 50px;
			border-bottom: 1px solid #ebeef5;
			padding: 0 5px;
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
}
</style>
