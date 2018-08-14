<template>
	<div id="supplier">
		<section v-if='userList'>
			<div class="top clearfix">
				<div class="fl">
					<span class="topName">供应商</span>
					<input v-model="search" type="text" />
					<a class="search" @click="searchList" href="javascript:void(0)">
						<span class="searchIcon"></span>
					</a>
				</div>
				<div class="fr">
					<a @click="addSupply" href="javascript:void(0);" class="blue addSupply">
						<img src="../../../res/images/adds.png" alt="add" />
						<i>新增供应商</i>
					</a>
				</div>
			</div>
			<!--列表表头 标题-->
			<section class="content">
				<com-table :titleData="titleList" :introData="detailsList" :showTitle="2" :showHand="false">
					<div class="infoDetail" slot="con-0" slot-scope="props">
						<a @click="openSupply(props.data.id)" href="javascript:void(0);" class="yellow">查看详情</a>
						<a @click="editSupply(props.data.id)" href="javascript:void(0);" class="gray" style="background: #858585;">修改</a>
						<a @click="deleteSupplier(props.data.id)" href="javascript:void(0);" class="gray">删除</a>
					</div>
					<span slot="con-2" slot-scope="props">{{props.data.people.people[0].name}}</span>
					<span slot="con-3" slot-scope="props">{{props.data.people.people[0].phone}}</span>
					<span slot="con-4" slot-scope="props">{{props.data.people.people[0].address}}</span>
				</com-table>
			</section>
			<div style="width: 100%;height: 45px;" class="fr">
				<page v-if="total > 1" @pageNum="pageChange" :page="page" :total='total' :isNoJump='true' :isNoPaging='true' style="float: left;margin-bottom: 100px;"></page>
			</div>
		</section>
		<add v-else @save="addSave" :editId="editId" :suppierList="suppierList"></add>
		<detailwin v-if="isWin" @getWin="winData" :detailId="detailId"></detailwin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	// import storage from 'src/verdor/storage';
	export default {
		data() {
			return {
				shopId: null,
				details: [], //所有供应商列表数据
				userList: true, //供货商列表与新增供货商显示切换
				// editId: '', //供货商修改id
				total: 0, // 总页数
				page: 0,
				len: 0,
				num: 10, // 当前每页展示数量
				pageNum: 0, //当前页实际展示数量
				detailsList: '', //当前页展示的列表数据
				currentPage: 0, //当前展示的页数
				search: '', //查询名称
				initDetails: '', //所有数据
				isWin: false, //查看详情弹窗
				detailId: null, //查看详情id
				editId: null, //编辑id
				titleList: [{
					titleName: '操作'
				},
				{
					titleName: '供应商名称',
					dataName: 'name'
				},
				{
					titleName: '联系人姓名'
				},
				{
					titleName: '联系方式'
				},
				{
					titleName: '联系地址'
				},
				],
			};
		},
		mounted() {
			// var userData = storage.session("userShop");//取值有误
			// this.shopId = userData.currentShop.id;
			// this.shopId = storage.session("shopId");
			this.suppierList();
		},
		methods: {
			//获取供应商列表
			async suppierList() {
				let res = await http.suppierList();
				this.details = res;
				this.initDetails = res;
				this.toPage();
			},
			pageChange(item) {
				let page = item.page;
				this.detailsList = this.details.slice((page - 1) * 10, (page - 1) * 10 + 10);
			},
			//搜索
			searchList() {
				let newList = [];
				for (let i = 0; i < this.initDetails.length; i++) {
					let newName = this.initDetails[i].name;
					if (newName.indexOf(this.search) != -1) {
						newList.push(this.initDetails[i]);
					}
				}
				this.details = newList;
				this.toPage();
			},
			//分页
			toPage() {
				this.page = 1;
				this.total = Math.ceil(this.details.length / this.num);
				this.len = this.total < 10 ? this.total : 10;
				//                if(this.page >= this.total) {
				//                    this.page = this.total - 1 >= 0 ? this.total - 1 : 0;
				//                } else {
				//                    this.page = this.page;
				//                }
				this.detailsList = this.details.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10);
			},
			//新增供应商
			addSupply() {
				this.editId = '';
				this.userList = false;
			},
			//查看详情
			openSupply(id) {
				this.isWin = true;
				this.detailId = id;
			},
			//修改供应商
			editSupply(id) {
				this.editId = id;
				this.userList = false;
			},
			async delete(id) {
				// let res = 
				await http.deleteSupplier({
					data: {
						id: id
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '删除成功'
				});
				this.suppierList();
			},
			//删除
			deleteSupplier(id) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'confirm',
					content: '确认删除',
					callback: (res) => {
						if (res == 'ok') {
							this.delete(id);
							this.toPage();
						}
					}
				});
			},
			//点击弹窗
			winData() {//res
				this.isWin = false;
			},
			//保存,取消
			addSave() {//res
				this.userList = true;
				this.suppierList();
			}

		},
		components: {
			page: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			detailwin: () =>
				import ( /*webpackChunkName: 'supply_manage'*/ './detail_win'),
			add: () =>
				import ( /*webpackChunkName: 'add_supply'*/ './add_supply'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		}
	};
</script>

<style lang="less" scoped>
	#supplier {
		.top {
			margin-bottom: 20px;
			.topName {
				display: inline-block;
				width: 50px;
				height: 40px;
				border: 1px solid #ccc;
				text-align: center;
				line-height: 40px;
				border-right: none;
				vertical-align: middle;
			}
			input {
				width: 170px;
				height: 40px;
				vertical-align: top;
			}
			.search {
				background-color: #29A7E1;
				margin-left: -4px;
				vertical-align: middle;
				.searchIcon {
					float: left;
					width: 44px;
					height: 40px;
					background-color: #29A7E1;
					background: url(../../../res/images/search.png) center center no-repeat;
					cursor: pointer;
				}
			}
			.addSupply {
				width: 150px;
				height: 45px;
				line-height: 45px;
				position: relative;
				img {
					width: 20px;
					height: 20px;
					position: absolute;
					top: 12px;
					left: 20px;
				}
				i {
					position: absolute;
					left: 50px;
					top: 0;
				}
			}
		}
		.infoDetail a {
			width: 33.3%;
			float: left;
		}
		.content {
			clear: both;
			margin-bottom: 20px;
		}
	}
</style>