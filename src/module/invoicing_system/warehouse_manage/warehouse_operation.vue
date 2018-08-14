<!--
    **仓库操作
    *
    * 黄一帆
    * *
    *
-->
<template>
	<section>
		<div class="chooseTime">
			<div class="oprationTime">操作时间：</div>
			<section class="fl chairFix">
				<section class="box">
					<calendar class="calendarTime" :time="startTime" :format="'yyyy年MM月dd日'" @emit="getStartTime"></calendar>
				</section>
				<span>-</span>
				<section class="box">
					<section class="fl">
						<calendar class="calendarTime" :time="endTime" :format="'yyyy年MM月dd日'" @emit="getEndTime"></calendar>
					</section>
					<span class="order-order-searchA">
	                    <span v-on:click="search" class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</section>
			</section>
		</div>
		<div>
			<div class="block-box">
				<selectBtn class="inline-box" @emit="getTypeName" :sorts="allType" :index="typeIndex"></selectBtn>
				<input class="receipt inline-box" type="text" placeholder="请输入仓库名称" v-model="warehouseName" />
			</div>
			<div class="block-box">
				<div class="inline-box">
					<span>仓库所属：</span>
					<selectstore @emit="getWarehouseOwnerName" :sorts="typeNameArr" :tipName="warehouseOwnerName" :isConfirm="true"></selectstore>
				</div>
				<input class="operator inline-box" type="text" placeholder="请输入操作人" v-model="warehouseOperator" />
				<div class="inline-box">
					<a @click="search" href="javascript:void(0);" class="blue buttonBox">筛选</a>
					<a @click="resetSearch" href="javascript:void(0);" class="gray buttonBox">重置</a>
				</div>
			</div>
		</div>
		<tableCom :listHeight="60" :listName="'仓库操作'" :introData="warehouseContent" :titleData="titleList" :allTotal="totalPage" :listWidth="1200" :fixed="1">
			<div slot="con-0" slot-scope="props" @click="warehouseDetail(props)" style="color:#29abe2;cursor:pointer;">查看详情</div>
			<div slot="con-1" slot-scope="props">{{props.index+1}}</div>
		</tableCom>
		<pageElement @pageNum="pageClick" :page="page" :total="total" :num="num" :isNoJump='true'></pageElement>
	</section>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				isShop: '', //单店品牌
				startTime: new Date().setHours(0, 0, 0, 0), //开始时间
				endTime: new Date().setHours(23, 59, 59, 0), //结束时间
				allType: ['全部类型', '修改仓库', '删除仓库', '添加仓库'], //仓库操作全部类型
				typeId: '', //选择操作的id
				typeIndex: 0,
				warehouseName: '', //仓库名称
				warehouseOwner: [], //仓库所属
				warehouseOwnerName: '全部', //仓库所属名称
				warehouseOwnerId: '', //仓库所属id
				warehouseOperator: '', //仓库操作操作人
				shopType: '', //店铺0品牌1
				typeNameArr: [], //仓库所属名称数组
				ownerArr: [], //所属仓库数组
				warehouseContent: [], //仓库操作内容
				page: 1,
				num: 10,
				total: 1,
				totalPage: 0, //仓库总条数
				titleList: [
					{titleName: '操作',titleStyle: {width: 150 + 'px',}},
					{titleName: '序号',titleStyle: {width: 150 + 'px',}},
					{titleName: '操作类型',dataName: 'type'},
					{titleName: '仓库名称',dataName: 'warehouse'},
					{titleName: '仓库所属',dataName: 'ownerShop'},
					{titleName: '操作时间',dataName: 'createTime'},
					{titleName: '操作人',dataName: 'createUser'},
				],
			};
		},
		methods: {
			pageClick(res) {
				this.num = res.num;
				this.page = res.page;
				this.search();
			},
			getTypeName(index) {
				this.typeId = index > 0 ? index : '';
				this.typeIndex = index;
			},
			//选择开始时间
			getStartTime: function(receiveTime) {
				this.startTime = new Date(receiveTime).setHours(0, 0, 0, 0);
			},
			//选择结束时间
			getEndTime: function(receiveTime) {
				this.endTime = new Date(receiveTime).setHours(23, 59, 59, 0);
			},
			async search() { //搜索
				if(this.startTime > this.endTime) {
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '开始时间不能大于结束时间'
					});
					return;
				}
				let res = await http.getOperationSearch({
					data: {
						startTime: parseInt(this.startTime / 1000),
						endTime: parseInt(this.endTime / 1000),
						type: this.typeId,
						createUser: this.warehouseOperator,
						shopType: this.isShop,
						warehouse: this.warehouseName,
						ownerId: this.ownerArr,
						page: this.page,
						pageSize: this.num
					}
				});
				this.warehouseContent = res.list;
				this.total = res.allPage;
				this.totalPage = res.pageSize;
			},
			resetSearch: function() { //重置
				this.startTime = new Date().setHours(0, 0, 0, 0);
				this.endTime = new Date().setHours(23, 59, 59, 999);
				this.typeIndex = 0;
				this.typeId = '';
				this.warehouseName = '';
				this.initOwner();
				this.page = 1;
				this.num = 10;
				this.search();
			},
			warehouseDetail(props) { //仓库操作的详情
				props.startTime = this.startTime;
				props.endTime = this.endTime;
				storage.session('warehouseOperationDetail', props.data);
				this.$router.push({
					path: '/admin/warehouseList/warehouseOperationDetail',
					query: this.$route.query
				});
			},
			async selectWarehouseOwner() {
				let data = await http.invoicing_getOwners();
				let arr = [];
				if(data) {
					for(let item of data) {
						let obj = {
							selected: true
						};
						if(item.ischain == 3) { //只有品牌
							obj.id = item.brandId + ',0';
							obj.name = item.brandName;
						} else {
							if(item.brandId) { //品牌-单店
								obj.id = item.brandId + ',' + item.shopId;
								obj.name = item.brandName + '-' + item.shopName;
							} else { //只有单店
								obj.id = '0' + ',' + item.shopId;
								obj.name = item.shopName;
							}
						}
						arr.push(obj);
					}
				}
				this.owner = arr;
				this.initOwner();
				this.search();
			},
			initOwner() { //初始化设置仓库所属
				let arr1 = [],
					arr2 = [];
				if(this.owner) {
					for(let item of this.owner) {
						arr1.push(item.id);
						this.ownerArr = JSON.stringify(arr1);
						let obj = {
							id: item.id,
							name: item.name,
							selected: true
						};
						arr2.push(obj);
					}
				}
				this.typeNameArr = arr2;
			},
			getWarehouseOwnerName: function(item) {
				let arr = [];
				item.forEach((con) => {
					if(con.selected == true) {
						arr.push(con.id);
					}
				});
				this.ownerArr = JSON.stringify(arr);
			},
			timeConversion(time) {
				return utils.format(new Date(Number(time * 1000)), 'yyyy-MM-dd hh:mm:ss');
			},
		},
		mounted() {
			let userData = storage.session('userShop');
			this.isShop = userData.currentShop.ischain != '3' ? '0' : '1';
			this.selectWarehouseOwner();
		},
		components: {
			calendar: () =>
				import( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			selectstore: () =>
				import( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			selectBtn: () =>
				import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			pageElement: () =>
				import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			tableCom: () =>
				import( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		}
	};
</script>

<style lang='less' scoped>
	.chooseTime {
		width: 100%;
		margin-top: 20px;
		.box {
			display: inline-block;
			vertical-align: middle;
		}
		&:after {
			content: '';
			clear: both;
			zoom: 1;
			display: block;
		}
	}
	
	.oprationTime {
		width: 80px;
		height: 100%;
		line-height: 40px;
		font-size: 15px;
		float: left
	}
	
	.inline-box {
		display: inline-block;
		margin-right: 10px;
		span {
			vertical-align: middle;
		}
	}
	
	.block-box {
		display: inline-block;
		padding-top: 20px;
	}
	
	.order-order-searchA,
	.order-order-search {
		display: inline-block;
		float: left;
		width: 40px;
		height: 40px;
		background-color: #29A7E1;
		cursor: pointer;
		margin-right: 15px;
	}
	
	.order-order-search {
		background: url(../../../res/images/search.png) center center no-repeat;
	}
	
	.order-order-searchA:hover {
		background-color: #1878a5;
		transition: background-color ease-in-out 0.2s;
	}
	
	.order-order-searchA:active {
		background-color: #154961;
	}
	
	.inline-box ul {
		width: 100%;
		max-height: 200px;
		margin: 0;
		position: absolute;
		top: 43px;
		left: 0;
		z-index: 10;
		background: #fff;
		overflow-y: auto;
		border-bottom: 1px solid #ccc;
	}
	
	.inline-box .overdian {
		overflow: hidden;
		display: block;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.inline-box .showTop {
		height: 40px;
		width: 150px;
		display: block;
		float: left;
		text-align: center;
		border-right: 1px #B3B3B3 solid;
	}
	
	.inline-box ul li {
		text-align: center;
		height: 40px;
		border: 1px #b3b3b3 solid;
		border-top: 0;
		background: #fff;
		cursor: pointer;
	}
	
	.inline-box ul li:hover {
		background: #F0F0F0;
	}
	
	.receipt,
	.operator {
		width: 174px;
		height: 40px;
		padding: 0 10px;
		border: 1px solid #B3B3B3;
		&:focus {
			outline: none;
		}
	}
	
	.buttonBox {
		width: 90px;
		height: 40px;
		line-height: 40px;
	}
</style>