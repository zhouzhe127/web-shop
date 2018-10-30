<template>
	<div id="user_group">
		<header class="user_group_header">
			<div class="select_keywords">
				<i>关键字</i>
				<!-- <input v-model="keyWords" type="text" placeholder="请输入分组名称"> -->
				<el-input style="width:179px;margin-right: 10px;" v-model="keyWords" maxlength="10" placeholder="请输入分组名称"></el-input>
				<el-button type="primary" style="margin-right: 10px;width:100px;" @click="selectGroup">筛选</el-button>
				<el-button type="info" style="margin-right: 10px;width:100px;" @click="resertGroup">重置</el-button>
				<!-- <button @click="selectGroup" class="btn blue">筛选</button>
				<button @click="resertGroup" class="btn gray">重置</button> -->
			</div>
		</header>
		<!-- <com-table class="table_width" :listHeight='80' :listName="'用户分组'" :key="index" :showTitle='1' :introData="userList" :listWidth="1437"
		    :titleData="titleList" :allTotal="allUserList.length" :widthType='true'>
			<div slot="con-0" slot-scope="props" class="operate_user">
				<span @click="exportUser(scope.row.id)" class="export_user">导出用户</span>
				<span @click="checkDetails(scope.row.id)" class="show_detail">查看详情</span>
				<span @click="editUserInfo(scope.row,props.index)" class="edit_user">编辑</span>
				<span @click="deleteUser(scope.row.id,props.index)" class="delete_user">删除</span>
			</div>
			<div slot="con-1" slot-scope="props">{{num*(page -1) + props.index + 1}}</div>
		</com-table> -->
		<div class="tips">
			<div class="handle-tips">
				<i></i> 关联职位后，当前职位工作人员会更新至当前分组，变动用户菜单。请知悉！
			</div>
		</div>
		<div class="list_box">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>用户分组</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{allUserList.length}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="userList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="操作" align="center" width="400">
					<template slot-scope="scope">
						<el-button size="mini" type="text" @click="exportUser(scope.row.id)" style="color: rgb(40, 168, 224);">导出用户</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="checkDetails(scope.row.id)" style="color: rgb(40, 168, 224);">查看详情</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="relatedPosition(scope.row.id)" style="color: #E1BB4A;">关联职位</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="editUserInfo(scope.row,scope.$index)" style="color: #ff8d00;">编辑</el-button>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button size="mini" type="text" @click="deleteUser(scope.row.id,scope.$index)" style="color: #fd3f1f;">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column label="序号" align="center">
					<template slot-scope="scope">
						<span>{{num*(page -1) + scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="分组名称" align="center">
				</el-table-column>
				<el-table-column prop="count" label="人数" align="center">
				</el-table-column>
				<el-table-column label="职位" align="center">
					<template slot-scope="scope">
						<span>{{positionList[scope.row.position]}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 翻页 -->
		<section class="turn-page">
			<!-- <pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement> -->
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="pageNum" :page-sizes="[10, 20, 30]"></el-pagination>
		</section>
		<!-- 新建和编辑 -->
		<transition name="fade">
			<win v-if="isShowNewGroup" :width="512" :height="169" @winEvent="winEvent">
				<span slot="title">新增用户组</span>
				<div class="new_user" slot="content">
					<div class="group_name">
						<span class="required">分组名称</span>
						<!-- <input v-model.trim="groupName" maxlength="20" type="text" placeholder="请输入名称"> -->
						<el-input v-model="groupName" maxlength="20" placeholder="请输入分组名称" style="width:250px;"></el-input>
					</div>
				</div>
			</win>
		</transition>
		<!-- 关联职位 -->
		<transition name="fade">
			<win v-if="isShowPosition" :width="550" :height="200" @winEvent="winEventPosition">
				<span slot="title">关联职位</span>
				<div class="new_user" slot="content">
					<div class="group_name">
						<span class="fl required">关联职位</span>
						<el-radio-group v-model="validName" class="fl">
							<el-radio v-for="(item,index) in validList" :key="index" :label="item.name" border style="width:100px;text-align: center;" @change.native="clicktheRadio(item)"></el-radio>
						</el-radio-group>
					</div>
				</div>
			</win>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				index: null,
				allTotal: 0,
				page: 1,
				num: 10,
				pageNum: 1,
				userList: [], //展示的数组
				isShowNewGroup: false,
				isShowPosition: false, //关联职位
				editUser: [],
				list: [{
					name: '无',
					id: 1
				}, {
					name: '店长',
					id: 2
				}, {
					name: '组员',
					id: 3
				}],
				groupName: '',
				result: [],
				keyWords: '', //  搜索关键字
				isEdit: false, //  是编辑还是新添加
				editId: '',
				total: 0,
				allUserList: [], //所有的数据
				editIndex: '', //   被编辑的数据下表
				validName: '店长',
				validList: [{
					'id': 1,
					'name': '店长'
				}, {
					'id': 2,
					'name': '店员'
				}, {
					'id': 3,
					'name': '收银员'
				}],
				validId: 1,
				groupId: '', //分组Id
				positionList: {
					'0': '--',
					'1': '店长',
					'2': '店员',
					'3': '收银员'
				}
			};
		},
		methods: {
			pushNewGroup() {
				this.isShowNewGroup = true;
				this.editUser = [];
				this.isEdit = false;
			},
			winEvent(str) {
				if (str && str == 'ok') {
					this.addNewGroup();
				} else {
					this.isShowNewGroup = false;
				}
				this.groupName = '';
				this.editId = '';
			},
			winEventPosition(str) { //关联职位的弹窗回掉
				if (str && str == 'ok') {
					this.bindPosition();
					this.isShowPosition = false;
				} else {
					this.isShowPosition = false;
				}
			},
			async addNewGroup() {
				if (!global.checkData({
					groupName: {
						cond: `$$.trim() != ''`,
						pro: '请输入分组名称'
					}
				}, this)) {
					return false;
				}
				if (this.isEdit) {
					this.editGroup();
				} else {
					this.addGroup();
				}
			},
			async editGroup() {
				let groupName = this.groupName;
				await http.editUserGroup({
					data: {
						id: this.editId,
						name: groupName
					}
				});
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '修改成功',
					title: '操作提示'
				});
				this.allUserList[this.editIndex].name = groupName;
				this.isShowNewGroup = false;
			},
			async addGroup() {
				await http.addUserGroups({
					data: {
						name: this.groupName
					}
				});
				this.getUserGroup(this.page);
				this.isShowNewGroup = false;
			},
			async exportUser(id) {
				http.exportUserGroup({
					data: {
						groupId: id,
						format: 'csv'
					},
				});
			},
			async checkDetails(id) {
				global.groupFansList = {
					groupId: id,
					isOwer: true
				};
				this.$router.push('/admin/Assistantfans');
			},
			editUserInfo(item, index) {
				if (item.id <= 2) {
					this.$store.commit('setWin', {
						content: '默认分组无法编辑',
						title: '操作提示',
						winType: 'alert',
					});
					return false;
				}
				this.groupName = item.name;
				this.isEdit = true;
				this.isShowNewGroup = true;
				this.editId = item.id;
				this.editIndex = this.page * this.num - this.num + index;
			},
			deleteUser(id, index) {
				if (id <= 2) {
					this.$store.commit('setWin', {
						content: '默认分组无法删除',
						title: '操作提示',
						winType: 'alert',
					});
					return false;
				}
				this.editIndex = this.page * this.num - this.num + index;
				this.$store.commit('setWin', {
					content: '确认要执行删除操作吗？',
					title: '操作提示',
					winType: 'confirm',
					callback: (str) => {
						if (str == 'ok') {
							this.deleUserGroup(id);
						}
					}
				});
			},
			async deleUserGroup(id) {
				await http.deleUserGroups({
					data: {
						id: id
					}
				});
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '删除成功',
					title: '操作提示'
				});
				this.allUserList.splice(this.editIndex, 1);
				this.setPage();
			},
			resertGroup() {
				this.getUserGroup();
				this.groupName = '';
				this.page = 1;
				this.keyWords = '';
			},
			async selectGroup() {
				if (!this.keyWords.trim() != '') {
					this.$store.commit('setWin', {
						winType: 'alert',
						title: '提示信息',
						content: '请输入关键字'
					});
					return false;
				}
				let arr = [];
				this.allUserList.forEach((item) => {
					if (item.name == this.keyWords) {
						arr.push(item);
					}
				});
				this.allUserList = arr;
				this.setPage();
			},
			async getUserGroup() {
				let res = await http.getUserGroups({
					data: {}
				});
				if (res == null) {
					res = {};
				}
				this.allUserList = Object.values(res); //总数据
				this.$nextTick(() => {
					this.setPage();
				});
			},
			async bindPosition() { //关联职位
				let res = await http.bindPosition({
					data: {
						groupId: this.groupId,
						position: this.validId
					}
				});
				if (res) {
					this.$store.commit('setWin', {
						winType: 'alert',
						title: '提示信息',
						content: '职位关联成功'
					});
					this.getUserGroup();
				}
			},
			setPage: function() { //自定义翻页
				this.pageNum = Math.ceil((this.allUserList.length) / (this.num)); //根据数据总和和一页展示的数量计算出总页数
				let pageStart = (this.page - 1) * (this.num); //起始
				let pageEnd = (this.page) * (this.num); //结束
				this.userList = this.allUserList.slice(pageStart, pageEnd); //即将展示页面的数组
			},
			relatedPosition: function(id) { //关联职位
				this.groupId = id;
				this.validName = '店长';
				this.validId = 1;
				this.isShowPosition = true;
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
			clicktheRadio: function(item) {
				this.validId = item.id;
			},
		},
		mounted() {
			this.$store.commit('setPageTools', [{
				name: '新增用户组',
				fn: () => {
					this.pushNewGroup();
				},
				className: 'el-btn-yellow'
			}]);
			this.getUserGroup();
		},
		components: {
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		}
	};
</script>
<style lang="less" scoped>
	#user_group {
		width: 1300px;

		.tips {
			width: 100%;
			height: 40px;
			line-height: 40px;
			background: #ebeef5;
			padding-left: 10px;
			margin-bottom: 10px;
		}

		.operate_user {
			span {
				padding: 0 10px;
			}

			.export_user {
				color: RGB(40, 168, 224);
				font-size: 16px;
				text-decoration: underline;
				border-right: 1px solid RGB(206, 206, 206);
				cursor: pointer;
			}

			.show_detail {
				color: RGB(40, 168, 224);
				font-size: 16px;
				cursor: pointer;
				border-right: 1px solid RGB(206, 206, 206);
			}

			.edit_user {
				color: RGB(255, 141, 0);
				font-size: 16px;
				cursor: pointer;
				border-right: 1px solid RGB(206, 206, 206);
			}

			.delete_user {
				color: RGB(255, 61, 4);
				cursor: pointer;
				font-size: 16px;
			}
		}

		.user_group_header {
			position: relative;
			margin-bottom: 20px;

			.new_group {
				position: absolute;
				top: -45px;
				right: -30px;
				width: 121px;
				height: 40px;
				border: none;
				background: RGB(41, 168, 224);
				color: #fff;
				font-size: 14px;
			}

			.select_keywords {
				display: flex;
				flex-direction: row;
				align-items: center;

				i {
					font-size: 16px;
					color: #333;
					margin-right: 30px;
				}

				input {
					width: 183px;
					height: 42px;
					border: 1px solid RGB(179, 179, 179);
					padding: 0 17px;
				}
			}
		}

		.user_group_content {
			border: 1px solid RGB(210, 210, 210);
			width: 100%;
			margin-top: 19px;

			.header_bar {
				height: 53px;
				font-weight: bold;
				line-height: 52px;
				margin-left: 48px;
				font-size: 16px;

				.point {
					display: inline-block;
					background: #000;
					width: 5px;
					height: 5px;
					border-radius: 50%;
					margin: 3px 10px;
				}

				i {
					color: RGB(255, 60, 4);
				}
			}

			.nav_list {
				width: 1437px;
				height: 42px;
				background: RGB(242, 242, 242);

				.nav_header {
					display: flex;
					flex-direction: row;
					align-items: center;
					flex-wrap: nowrap;
					line-height: 42px;
					text-align: center;

					li:nth-child(1) {
						width: 483px
					}

					.li_w {
						width: 318px
					}
				}
			}

			.user_list {
				width: 1437px;
				border-bottom: 1px solid RGB(247, 247, 247);
				line-height: 66px;

				.nolist {
					width: 1436px;
					text-align: center;
					line-height: 70px;
					font-size: 24px;
					color: #E0E0E0;
				}

				ul {
					border-top: 1px solid RGB(247, 247, 247);
					height: 67px;
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					text-align: center;

					li:nth-child(1) {
						width: 483px;
					}

					.li_w {
						width: 318px
					}
				}
			}
		}

		.turn-page {
			margin: 10px 0 30px 0;
		}

		.btn {
			width: 101px;
			height: 42px;
			color: #fff;
			border: none;
			margin-left: 10px;
			font-size: 16px;
			line-height: 41px;
		}

		.gray {
			background: RGB(179, 179, 179)
		}

		.blue {
			background: RGB(40, 168, 224)
		}
	}

	.new_user {
		padding: 25px 10px 51px 20px;

		.group_name {
			height: 41px;
			line-height: 41px;
			margin-bottom: 19px;

			span {
				font-size: 16px;
				color: RGB(51, 51, 51);
				margin-right: 11px;
			}

			input {
				width: 321px;
				height: 41px;
				padding: 0 16px;
			}
		}
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		.table_width {
			width: 100%;
		}
	}

	.handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}
</style>