<template>
	<div id="worker_staff">
		<template v-if="workerType == 'worker'">
			<header class="worker_staff_belongs">
				<span>所属门店</span>
				<!-- <select-btn @selOn="selectData" :sorts="sorts" :name="defaultName" :width="184"></select-btn> -->
				<el-select v-model="defaultName" placeholder="请选择" @change="selectData" style="color:#c0c4cc;width: 179px;">
					<el-option v-for="item in sorts" :key="item" :label="item" :value="item">
					</el-option>
				</el-select>
				<!-- <input type="text" v-model.trim="keyWords" placeholder="关键字"> -->
				<el-input v-model="keyWords" maxlength="10" placeholder="关键字" style="width:179px;margin:0 20px;"></el-input>
				<el-button type="primary" style="width:100px;" @click="selectWorker">筛选</el-button>
				<el-button type="info" style="width:100px;" @click="resertWorker">重置</el-button>
				<!-- <button @click="selectWorker" class="shop_selects">筛选</button>
				<button @click="resertWorker" class="shop_resert">重置</button> -->
			</header>
			<div class="list_box">
				<div class="list_title">
					<div class="list_title_l fl">
						<span>工作人员</span>
						<span></span>
						<span>共
								<a href="javascript:;">{{wokerList.length}}</a>条记录</span>
					</div>
					<div class="list_title_r fr">
					</div>
				</div>
				<el-table :data="userList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
					<el-table-column fixed prop="id" label="操作" align="center" width="150">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="editUser(scope.row,scope.$index)" style="color: #ff8d00;">编辑</el-button>
							<span style="padding:0 5px;color: #D2D2D2">|</span>
							<el-button size="mini" type="text" @click="deleteUser(scope.row,scope.$index)" style="color: #fd3f1f;">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column label="序号" align="center" width="100">
						<template slot-scope="scope">
							<span>{{num*(page -1) + scope.$index + 1}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="nickNmae" label="用户昵称" align="center">
					</el-table-column>
					<el-table-column label="头像" align="center" width="100">
						<template slot-scope="scope">
							<div class="imgStyle">
								<img :src="scope.row.imageUrl" :alt="scope.row.name" />
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="staffName" label="姓名" align="center">
					</el-table-column>
					<el-table-column prop="customerNum" label="客户" align="center">
						<template slot-scope="scope">
							<span @click='openCustomer(scope.row)' style="color: #ff9800">{{scope.row.customerNum}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="coins" label="金币" align="center">
						<template slot-scope="scope">
							<span @click='openCoin(scope.row)' style="color: #ff9800">{{scope.row.coins}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="coinsTotal" label="累计获得金币" align="center">
					</el-table-column>
					<el-table-column prop="shopNames" label="所属门店" align="center" width="350">
						<template slot-scope="scope">
							<div class="textStyle">
								<span>{{scope.row.shopNames}}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="职位" align="center">
						<template slot-scope="scope">
							<span>{{statusType[scope.row.position]}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 翻页 -->
			<section class="turn-page">
				<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
				<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
			</section>
		</template>
		<!-- 新建员工 -->
		<setup-user v-if="workerType == 'addworker'" :editData="editData" @wengBack="getwengBack"></setup-user>
		<!-- 客户 -->
		<customer v-if="workerType == 'customer'" @customerBack='customerBack' :staffFansId='staffFansId'></customer>
		<!-- 金币 -->
		<coins v-if="workerType == 'coins'" @coinsBack="coinsBack" :staffFansId='staffFansId'></coins>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				userShop: '',
				sorts: [], //所属门店的选择
				selects: '', //所属门店选中的
				keyWords: '', //关键字
				allList: [], //所有的工作人员
				wokerList: [],
				userList: [],
				page: 1,
				total: 0,
				num: 10,
				editData: '',
				editIndex: '',
				ischain: '',
				defaultName: '全部门店',
				statusType: {
					1: '店长',
					2: '店员',
					3: '收银员'
				},
				workerType: 'worker', //显示类型
				staffFansId: '', //查看金币记录的导购id
			};
		},
		methods: {
			selectWorker() { //  筛选
				let reg = new RegExp(this.keyWords);
				let arr = [];
				if (this.selects.toString() != '') {
					let reg1 = new RegExp(this.sorts[this.selects]);
					arr = this.allList.filter((item) => {
						return reg1.test(item.shopNames) && (reg.test(item.staffName || reg.test(item.nickNmae)));
					});
				} else {
					arr = this.allList.filter((item) => {
						return reg.test(item.nickNmae) || reg.test(item.staffName);
					});
				}
				this.wokerList = Object.values(arr);
				this.setPage();
			},
			resertWorker() { //  重置
				this.page = 1;
				this.keyWords = '';
				this.selects = '';
				if (this.ischain == 3) {
					this.selects = '';
					this.defaultName = '全部门店';
				}
				this.getshopList();
				this.getAssistantstaff();
			},
			selectData(val) { //所属门店选中的
				this.selects = val;
			},
			editUser(item) { //新建员工
				this.workerType = 'addworker';
				this.editData = item;
			},
			async deleteUser(item, index) {
				this.editIndex = index + this.page * this.num - this.num;
				await http.deleteAssistantstaff({
					data: {
						id: item.id,
						fansId: item.fansId
					}
				});
				this.$store.commit('setWin', {
					content: '删除成功',
					title: '操作提示',
					winType: 'alert'
				});
				this.wokerList.splice(this.editIndex, 1);
				this.setPage();
			},
			async getAssistantstaff() { //获取全部的工作人员
				let res = await http.getAssistantstaff();
				this.allList = Object.values(res);
				this.wokerList = this.allList;
				this.$nextTick(() => {
					this.setPage();
				});
			},
			// pageChange(obj) {
			// 	this.page = obj.page;
			// 	this.num = obj.num;
			// 	this.setPage();
			// },
			setPage: function() { //自定义翻页
				this.total = Math.ceil((this.wokerList.length) / (this.num)); //根据数据总和和一页展示的数量计算出总页数
				let pageStart = (this.page - 1) * (this.num); //起始
				let pageEnd = (this.page) * (this.num); //结束
				this.userList = this.wokerList.slice(pageStart, pageEnd); //即将展示页面的数组
			},
			getshopList: function() {
				if (this.ischain == 3) {
					// ischain == 3    表示品牌    否则单店
					let direct = this.userShop.currentShop.direct; //   直营店
					let arr = [];
					for (let i of direct) {
						arr.push(i.name);
					}
					let franchise = this.userShop.currentShop.franchise;
					for (let i of franchise) {
						arr.push(i.name);
					}
					this.sorts = arr;
				} else {
					this.sorts = [this.userShop.currentShop.name];
				}
				console.log(JSON.stringify(this.sorts))
			},
			addworker: function() {
				this.$store.commit('setPageTools', {});
				this.workerType = 'addworker';
				this.editData = '';
			},
			getwengBack: function() {
				this.workerType = 'worker';
				this.getAssistantstaff();
				this.setTitle();
			},
			openCustomer: function(item) { //打开客户页面
				this.$store.commit('setPageTools', {});
				this.workerType = 'customer';
				this.staffFansId = item.fansId; //导购id
			},
			customerBack: function() { //客户的回调
				this.workerType = 'worker';
				this.getAssistantstaff();
				this.setTitle();
			},
			openCoin: function(item) { //打开金币记录的弹窗
				this.$store.commit('setPageTools', {});
				this.workerType = 'coins';
				this.staffFansId = item.fansId; //导购id
			},
			coinsBack: function() { //金币记录的回调
				this.workerType = 'worker';
				this.setTitle();
			},
			setTitle: function() { //设置标题
				this.$store.commit('setPageTools', [{
					name: '新建人员',
					fn: () => {
						this.addworker();
					},
					className: 'el-btn-yellow'
				}]);
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.setPage();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.setPage();
			},
		},
		mounted() {
			this.setTitle();
			this.getAssistantstaff();
			this.userShop = storage.session('userShop');
			this.ischain = storage.session('userShop').currentShop.ischain;
			this.getshopList();
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			'select-btn': () =>
				import ( /* webpackChunkName: 'select_btn' */ 'src/components/select_btn'),
			'setup-user': () =>
				import ( /* webpackChunkName: 'setup_user' */ './setup_user'),
			'customer': () =>
				import ( /* webpackChunkName: 'customer_record' */ './customer_record'),
			'coins': () =>
				import ( /* webpackChunkName: 'gold_record' */ './gold_record'),
		}
	};
</script>
<style lang="less" scoped>
	#worker_staff {
		position: relative;

		.operate_worker {
			span:nth-child(1) {
				color: RGB(255, 141, 0);
				padding: 0 25px;
				border-right: 1px solid RGB(206, 206, 206);
				cursor: pointer;
			}

			span:nth-child(2) {
				color: RGB(255, 61, 4);
				padding: 0 25px;
				cursor: pointer;
			}
		}

		.worker_staff_new_worker {
			button {
				position: absolute;
				top: -40px;
				right: 87px;
				width: 102px;
				height: 42px;
				border: none;
				background: RGB(40, 168, 224);
				font-size: 16px;
				color: #fff;
			}
		}

		.worker_staff_belongs {
			margin-bottom: 20px;

			span {
				font-size: 16px;
				color: RGB(51, 51, 51);
				margin-right: 19px;
			}

			&>input {
				width: 184px;
				height: 42px;
				border: 1px solid RGB(179, 179, 179);
				margin-left: 19px;
				padding: 0 17px;
			}

			button {
				width: 101px;
				height: 42px;
				margin-left: 19px;
			}

			.shop_selects {
				background: RGB(40, 168, 224);
				border: none;
				color: #fff;
				font-size: 16px;
			}

			.shop_resert {
				background: RGB(179, 179, 179);
				border: none;
				color: #fff;
				font-size: 16px;
			}
		}

		.worker_staff_content {
			border: 1px solid RGB(210, 210, 210);
			width: 1437px;
			margin-top: 19px;

			.worker_header {
				font-weight: bold;
				width: 100%;
				height: 53px;
				padding-left: 46px;
				line-height: 52px;
				font-size: 16px;

				.point {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					margin: 3px 10px;
					background: #000;
					display: inline-block;
				}

				span {
					color: RGB(255, 60, 4);
				}
			}

			.worker_nav {
				ul {
					background: RGB(242, 242, 242);
					height: 42px;
					color: RGB(67, 65, 74);
					font-size: 16px;

					li {
						width: 159px;
						text-align: center;
						font-weight: bold;
					}
				}
			}

			.worker_content {
				ul {
					border-top: 1px solid RGB(247, 247, 247);
					height: 63px;

					li {
						width: 159px;
						text-align: center;
					}

					.operate_worker {
						span:nth-child(1) {
							color: RGB(255, 141, 0);
							padding: 0 25px;
							border-right: 1px solid RGB(206, 206, 206);
							cursor: pointer;
						}

						span:nth-child(2) {
							color: RGB(255, 61, 4);
							padding: 0 25px;
							cursor: pointer;
						}
					}

					.user_img {
						img {
							width: 49px;
							height: 49px;
							border-radius: 50%;
						}
					}

					.worker_detail_belong {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				p {
					text-align: center;
					height: 42px;
					line-height: 41px;
				}
			}
		}

		.turn-page {
			margin: 10px 0 30px 0;
		}

		.worker_detail {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}
	}

	.imgStyle {
		height: 50px;
		margin: 0 auto;
		align-items: center;
		display: flex;
		text-align: center;
		width: 50px;

		img {
			width: 50px;
			height: 50px;
			border-radius: 100%;
			margin: 0 auto;
		}
	}

	.textStyle {
		width: 100%;
		height: 50px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		line-height: 50px;
	}
</style>