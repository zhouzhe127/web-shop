<template>
	<div id="member-store" style="min-width: 1437px;">
		<div class="timeSearch">
			<div class="selectDate">
				<div class="activation fl">
					创建时间
				</div>
				<div class="inp-box inp-start fl">
					<!-- <calendar :time="startTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar> -->
					<el-date-picker v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp">
					</el-date-picker>
				</div>
				<span class="line"> - </span>
				<div class="inp-box inp-start fl">
					<!-- <calendar :time="endTime" :type="0" class="data-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar> -->
					<el-date-picker v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp">
					</el-date-picker>
				</div>
				<!-- 渠道 -->
				<div class="orderNum fl">
					<span class="title fl">渠道</span>
					<!--下拉框组件-->
					<!-- <select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn> -->
					<el-select v-model="expirationTime" placeholder="请选择" @change="selexpirationTime" style="color:#c0c4cc;width: 179px;">
						<el-option v-for="item in expirationTimeList" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</div>
				<!-- 门店 -->
				<div class="orderNum fl" v-if="ischain == '3'">
					<span class="title fl">门店</span>
					<elShopList @chooseShop="getSelectShopList" :shopIds="selectShopId"></elShopList>
				</div>
				<!-- 筛选重置 -->
				<div class="search-box fl">
					<!-- <span class="search-btn blue" @click="getStoreList">筛选</span>
					<span class="reset-btn gray" @click="resetFun">重置</span> -->
					<el-button type="primary" @click="getStoreList" style="width:100px;">筛选</el-button>
					<el-button type="info" @click="resetFun" style="width:100px;">重置</el-button>
				</div>
			</div>
		</div>
		<p class="btn">
			<span class="all" v-for="(item,index) in storeList" :key='index' v-bind:class="{'active':indexOn == index }" @click="chooseStore(index)">{{item.name}}</span>
		</p>
		<p class="btn" v-if="ischain == '3'">
			选择门店:{{selectName}}
		</p>
		<com-table :listHeight='80' :showHand='true' :key="index" :showTitle='2' :listWidth="1300" :introData="packageList" :titleData="titleList" :allTotal="count" :listName="'储值方案'">
			<div class="doBtn" slot="con-0" slot-scope="props">
				<span @click="clickDetail(props.data)">查看详情</span>
				<span @click="editDetail(props.data)" v-show="isFlag">编辑</span>
				<span @click="delList(props.data,props.index)" v-show="isFlag">删除</span>
			</div>
			<div slot="con-1" slot-scope="props">{{translateTime(props.data.createTime)}}</div>
			<div slot="con-3" slot-scope="props">{{props.data.type == 2 ? "-" :props.data.deposit}}</div>
			<div slot="con-4" slot-scope="props">{{props.data.type == 2 ? "-" :props.data.payment}}</div>
			<div slot="con-5" slot-scope="props">
				<template v-if="props.data.channel == 12 || props.data.channel == 21">
					微信、POS收银
				</template>
				<template v-if="props.data.channel == 1">
					微信
				</template>
				<template v-if="props.data.channel == 2">
					POS收银
				</template>
			</div>
			<div slot="con-6" slot-scope="props">
				<template v-if="props.data.type == 1">-</template>
				<template v-if="props.data.type == 2">
					<template v-if="props.data.depositRule == 2">
						{{props.data.deposit}} &lt;=支付金额 &lt;= {{props.data.payment}}
					</template>
					<template v-if="props.data.depositRule == 1">
						支付金额 = {{props.data.deposit}}
					</template>
					<template v-if="props.data.depositRule == 3">
						支付金额 &gt;= {{props.data.deposit}}
					</template>
					<template v-if="props.data.depositRule == 4">
						支付金额 &lt;= {{props.data.deposit}}
					</template>
				</template>
			</div>
			<div slot="con-7" slot-scope="props" class="giftcontent">
				<template v-if="props.data.type == 1">
					<template v-if="props.data.giftAmount == 0 && props.data.giftPoint == 0 && props.data.couponIds == ''">
						-
					</template>
					<template v-if="props.data.giftAmount == 0 && props.data.giftPoint != 0">
						赠送{{props.data.giftPoint}}积分
					</template>
					<template v-if="props.data.giftAmount != 0 && props.data.giftPoint == 0">
						赠送金额{{props.data.giftAmount}}元
					</template>
					<template v-if="props.data.giftAmount != 0 && props.data.giftPoint != 0">
						赠送金额{{props.data.giftAmount}}元，赠送{{props.data.giftPoint}}积分
					</template>
					<template v-if="props.data.couponIds">
						<template v-for="item in props.data.couponIds">
							赠送{{item.name}}优惠券{{item.num}}张
						</template>
					</template>
				</template>
				<template v-if="props.data.type == 2">
					<template v-if="props.data.giftAmountRule == 0 && props.data.giftPointRule == 0">
						-
					</template>
					<template v-if='props.data.giftAmountRule == 1'>
						<template v-if="props.data.giftAmount == 0">
							-
						</template>
						<template v-else>
							赠送固定储值金额{{props.data.giftAmount}}元 ,
						</template>
					</template>
					<template v-if="props.data.giftAmountRule == 2">
						<template v-if="props.data.giftAmount == 0">
						</template>
						<template v-else>
							按比例赠送储值金额{{props.data.giftAmount}}%,
						</template>
					</template>
					<template v-if="props.data.giftPointRule == 1">
						<template v-if="props.data.giftPoint == 0">
							-
						</template>
						<template v-else>
							赠送固定积分{{props.data.giftPoint}}分
						</template>
					</template>
					<template v-if="props.data.giftPointRule == 2">
						<template v-if="props.data.giftPoint == 0">
							-
						</template>
						<template v-else>
							按比例赠送积分{{props.data.giftPoint}}%
						</template>
					</template>
				</template>
			</div>
			<div slot="con-8" slot-scope="props">{{props.data.type == 1 ? "固定方案" : "自定义方案"}}</div>
		</com-table>
		<div class="store">
			<detail :id='id' v-if='show' :shopsList='shopsList' @winEvent='winEvent'></detail>
		</div>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script type='text/javascript'>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	export default {
		data() {
			return {
				startTime: (new Date()).setHours(0, 0, 0, 0) - (global.timeConst.THREEMONTHS), //.getZero(), //日期组件的开始时间
				endTime: (new Date()).setHours(23, 59, 59, 999),
				expirationTimeList: [{ //过期时间
					name: '全部渠道',
					id: 0
				},
				{
					name: '微信',
					id: 1
				},
				{
					name: 'POS收银',
					id: 2
				}
				],
				expirationTimeId: 0,
				expirationTime: '全部渠道', //状态
				shopsList: [], // 卡属门店  
				shopsName: '选择适用门店',
				storeList: [{
					name: '全部'
				},
				{
					name: '固定方案'
				},
				{
					name: '自定义方案'
				}
				],
				indexOn: 0,
				packageList: [], //筛选时方案列表显示
				type: '', //筛选是固定方案还是自定义方案
				storeArr: [], //用于方案存储
				isFlag: false,
				id: null, //点击对应的id
				show: false,
				index: null,
				item: null,
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '220px',
						flex: 'none'
					}
				},
				{
					titleName: '创建时间',
					titleStyle: {
						width: '160px',
						flex: 'none'
					}
				},
				{
					titleName: '方案名称',
					dataName: 'name'
				},
				{
					titleName: '储值金额'
				},
				{
					titleName: '支付金额'
				},
				{
					titleName: '渠道',
					titleStyle: {
						width: '120px',
						flex: 'none'
					}
				},
				{
					titleName: '赠送条件',
					titleStyle: {
						width: '180px',
						flex: 'none'
					}
				},
				{
					titleName: '赠送内容',
					titleStyle: {
						width: '220px',
						flex: 'none'
					}
				},
				{
					titleName: '方案类型'
				},
				{
					titleName: '排序',
					dataName: 'sort'
				},
				{
					titleName: '操作人',
					dataName: 'createUid'
				}
				],
				userShop: '',
				ischain: '',
				selectName: '请选择店铺', //选择的店铺名
				selectShopId: [], //选中的店铺
				allFormList: [], //获取所有的数组
				page: 1,
				num: 10,
				endTotal: 1,
				count: '0'
			};
		},
		methods: {
			pageChange(obj) { //翻页
				this.page = obj.page;
				this.num = obj.num;
				this.getStoreList();
			},
			startTimeChange: function(data) {
				this.startTime = new Date(data).setHours(0, 0, 0, 0);
			},
			endTimeChange: function(data) {
				this.endTime = new Date(data).setHours(23, 59, 59, 999);
			},
			selexpirationTime: function(i) {
				//this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
				this.expirationTimeId = i; //点击卡类型对应的id
			},
			//时间显示
			translateTime: function(time) {
				return utils.format(time, 'yyyy-MM-dd/hh:mm');
			},
			async getStoreList() {
				let data = await http.getListDep({
					data: {
						startTime: parseInt(this.startTime / 1000), //开始时间
						endTime: parseInt(this.endTime / 1000), //结束时间
						channel: this.expirationTimeId, //渠道
						shopIds: this.selectShopId.join(','), //店铺
						type: this.indexOn, //方案类型
						page: this.page, //页码数
						num: this.num //条数
					}
				});
				this.packageList = data.list; //获取所有数据
				this.endTotal = data.pageNum; //总页数
				this.count = data.total; //总条数
				for (let i = 0; i < this.packageList.length; i++) {
					if (this.packageList[i].couponIds) {
						this.packageList[i].couponIds = JSON.parse(this.packageList[i].couponIds);
					}
				}
			},
			//删除
			delList(item, index) {
				this.$store.commit('setWin', {
					title: '删除方案',
					content: `是否删除该储值方案'${item.name}'`,
					winType: 'confirm',
					ok: {
						content: '确认删除'
					},
					cancle: {
						content: '取消删除'
					},
					callback: async (str) => {
						if (str == 'ok') {
							await http.delDep({
								data: {
									id: item.id,
									shopId: storage.session('shopId')
								}
							});
							this.packageList.splice(index, 1);
						}
					}
				});
			},
			winEvent(str) {
				this.show = false;
				if (str == 'ok') {
					if (this.isFlag) {
						setTimeout(() => {
							this.editDetail(this.item);
						}, 500);
					}

				}
			},
			clickDetail(item) {
				this.show = true;
				this.id = item.id;
				this.item = item;
			},
			async editDetail(item) {
				let data = await http.getDetailDep({
					data: {
						id: item.id,
						shopId: storage.session('shopId')
					}
				});
				storage.session('editdetail', data);
				this.$router.push('/admin/memberStoredValueScheme/solution');
			},
			//打开创建方案页面
			openStore: function() {
				this.$router.push('/admin/memberStoredValueScheme/solution');
			},

			//方案列表点击选择方案
			chooseStore: function(index) {
				this.page = 1;
				this.indexOn = index;
				this.getStoreList();
			},
			getShopList: function() {
				// 获取卡属门店店铺列表
				this.selectShopId = [];
				if (this.ischain == '3') { // 处理品牌逻辑
					this.shopsList = storage.session('shopList');
					for (let item of this.shopsList) {
						item.name = item.shopName;
					}
					this.selectShopId = this.shopsList.map((v) => {
						return v.id;
					});
					let selectNameStr = [];
					for (let i = 0; i < this.shopsList.length; i++) {
						//selectNameStr = selectNameStr + this.shopsList[i].name + ',';
						selectNameStr.push(this.shopsList[i].name);
					}
					this.selectName = selectNameStr.join(',');
				} else {
					this.selectShopId.push(this.userShop.currentShop.id);
					this.selectName = this.userShop.currentShop.name;
				}
			},
			// 获取卡属门店店铺列表
			// clickShopList: function(arr) {
			// 	let idArr = [];
			// 	let nameArr = [];
			// 	arr.forEach((item) => {
			// 		if (item.selected == true) {
			// 			idArr.push(item.id);
			// 			nameArr.push(item.name);
			// 		}
			// 	});
			// 	this.selectName = nameArr.join(',');
			// 	if (this.selectName == '') {
			// 		this.selectName = '请选择店铺';
			// 	}
			// 	this.selectShopId = idArr.join(',');
			// },
			resetFun: function() {
				this.startTime = new Date().setHours(0, 0, 0, 0) - (global.timeConst.THREEMONTHS);
				this.endTime = new Date().setHours(23, 59, 59, 999);
				this.expirationTimeId = 0;
				this.expirationTime = '全部';
				this.getShopList();
				this.getStoreList();
			},
			getSelectShopList: function(res) {
				this.selectShopId = res;
				let selectNameStr = '';
				for (let i = 0; i < this.shopsList.length; i++) {
					if (this.selectShopId.includes(this.shopsList[i].id)) {
						this.shopsList[i].selected = true;
						selectNameStr = selectNameStr + this.shopsList[i].name + ',';
					} else {
						this.shopsList[i].selected = false;
					}
				}
				this.selectName = selectNameStr == '' ? '请选择店铺' : selectNameStr;
			},
		},
		mounted() {
			this.userShop = storage.session('userShop');
			this.ischain = this.userShop.currentShop.ischain;
			this.currentShop = this.userShop.currentShop;
			if (this.currentShop.ischain == 0 || this.currentShop.ischain == 3) {
				this.isFlag = !this.isFlag;
			}
			if (this.isFlag) {
				this.$store.commit('setPageTools', [{
					name: '创建方案',
					fn: () => {
						this.openStore();
					},
					className: 'userLabel'
				}]);
			}
			this.getShopList();
			this.getStoreList();

		},
		components: {
			detail: () =>
				import ( /* webpackChunkName:'member_store_detail' */ './member_store_detail'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			Calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			selectBtn: () =>
				import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
			elShopList: () =>
				import( /*webpackChunkName: "el_shopList"*/ 'src/components/el_shopList'),
			selectStore: () =>
				import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		}
	};
</script>
<style scoped>
	#member-store .solution {
		width: 128px;
		height: 41px;
		background: #28A8E0;
		color: #fff;
		font-size: 16px;
		line-height: 41px;
		text-align: center;
		float: right;
		cursor: pointer;
		overflow: hidden;
	}

	#member-store .timeSearch {
		width: 100%;
		height: 40px;
		margin-bottom: 16px;
	}

	#member-store .timeSearch .activation {
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
		font-size: 16px;
		color: #333;
	}

	#member-store .timeSearch .line {
		display: block;
		float: left;
		width: 14px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	#member-store .timeSearch .orderNum {
		height: 40px;
		margin-left: 37px;
		line-height: 40px;
	}

	#member-store .timeSearch .title {
		display: inline-block;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
		margin-right: 10px;
	}

	#member-store .search-box {
		display: inline-block;
		vertical-align: middle;
		height: 40px;
		margin-left: 20px;
	}

	#member-store .search-box span {
		width: 80px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 0;
		color: #fff;
		display: inline-block;
		cursor: pointer;
	}

	#member-store .search-box .search-btn {
		margin-right: 20px;
	}

	#member-store .btn {
		font-size: 16px;
		margin-bottom: 10px;
	}

	#member-store .btn .all {
		width: 121px;
		height: 41px;
		display: inline-block;
		font-size: 16px;
		text-align: center;
		line-height: 41px;
		border-radius: 4px;
		margin-right: 14px;
		background: #F2F2F2;
		color: #333;
		cursor: pointer;
	}

	#member-store .giftcontent {
		width: 100%;
		height: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	#member-store .btn .active {
		background: #E1BB4A;
		color: #fff;
	}

	#member-store .store .count {
		width: 100%;
		height: 46px;
		font-size: 16px;
		color: #333;
		line-height: 46px;
		padding-left: 21px;
	}

	#member-store .store .storeTop {
		width: 100%;
		height: 42px;
		line-height: 42px;
		text-align: center;
		background: #F2F2F2;
	}

	#member-store .store .storeLi {
		width: 100%;
	}

	#member-store .store .storeLi li {
		float: left;
	}

	#member-store .store .storeLi li:nth-child(1) {
		width: 16%;
	}

	#member-store .store .storeLi li:nth-child(2) {
		width: 9%;
	}

	#member-store .store .storeLi li:nth-child(3) {
		width: 9%;
	}

	#member-store .store .storeLi li:nth-child(4) {
		width: 6%;
	}

	#member-store .store .storeLi li:nth-child(5) {
		width: 6%;
	}

	#member-store .store .storeLi li:nth-child(6) {
		width: 7%;
	}

	#member-store .store .storeLi li:nth-child(7) {
		width: 18%;
	}

	#member-store .store .storeLi li:nth-child(8) {
		width: 12%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	#member-store .store .storeLi li:nth-child(9) {
		width: 6%;
	}

	#member-store .store .storeLi li:nth-child(10) {
		width: 4%;
	}

	#member-store .store .storeLi li:nth-child(11) {
		width: 7%;
	}

	#member-store .store .storeBottom {
		width: 100%;
		height: 66px;
		text-align: center;
		line-height: 66px;
		border-bottom: 4px #F7F7F7 solid;
		overflow: hidden;
	}

	#member-store .doBtn span {
		font-size: 16px;
		cursor: pointer;
	}

	#member-store .doBtn span:nth-of-type(1) {
		padding-right: 10px;
		color: #27A8E0;
	}

	#member-store .doBtn span:nth-of-type(2) {
		border: 2px #CECECE solid;
		border-top: none;
		border-bottom: none;
		padding: 0 10px;
		color: #FF8D00;
	}

	#member-store .doBtn span:nth-of-type(3) {
		padding-left: 17px;
		color: #FF3D04;
	}

	#deletes .content {
		width: 100%;
		height: 200px;
		text-align: center;
		line-height: 200px;
		font-size: 18px;
		color: #333;
	}

	#details .detailUl {
		width: 100%;
		height: 100%;
		padding: 36px 77px;
	}

	#details .detailUl li {
		width: 100%;
		height: auto;
		display: table;
		margin-bottom: 24px;
	}

	#details .detailUl li .spanLeft {
		width: 20%;
		display: table-cell;
		text-align: end;
		vertical-align: middle;
	}

	#details .detailUl li .spanRight {
		width: 70%;
		line-height: 24px;
		padding-left: 32px;
		display: table-cell;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		#member-store .solution {
			width: 128px;
			height: 41px;
			background: #28A8E0;
			color: #fff;
			font-size: 16px;
			line-height: 41px;
			text-align: center;
			float: right;
			/* cursor: pointer; */
			overflow: hidden;
			position: absolute;
			right: 3%;
		}
	}
</style>