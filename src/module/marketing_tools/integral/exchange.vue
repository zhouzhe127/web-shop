/** * @file * * 积分商城兑换管理 * * @author zhengu.jiang */
<template>
	<div id="user">
		<!-- 日期搜索 -->
		<div class="filter clearfix">
			<div class="filbox fl clearfix">
				<!--日期组件 开始时间-->
				<span class="line fl">创建时间</span>
				<!-- <calendar :time="startTime" class="data-box fl" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar> -->
				<el-date-picker class="fl" v-model="startTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" :editable="false">
				</el-date-picker>
				<span class="line fl">-</span>
				<!--日期组件 开始时间-->
				<!-- <calendar :time="endTime" class="data-box fl" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar> -->
				<el-date-picker class="fl" v-model="endTime" type="date" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" value-format="timestamp" :clearable="false" @change="endTimeChange" :editable="false">
				</el-date-picker>
				<!-- <span class="order-order-searchA fl" @click="searchList">
                    <span class="order-order-search" href="javascript:void(0)"></span>
				</span> -->
				<el-button class="fl" type="primary" icon="el-icon-search" @click="searchList"></el-button>
			</div>
			<div class="filbox fl clearfix">
				<span class="fl line">商品名称</span>
				<!-- <input type="text" class="name" placeholder="请输入商品名称" v-model='actName' maxlength="10" /> -->
				<el-input class="fl" v-model="actName" placeholder="请输入商品名称" maxlength="10" style="width:200px;"></el-input>
			</div>
			<!-- 筛选 重置 -->
			<div class="filbox fl">
				<!-- <a class="fl blue " href="javascript:void(0)" @click="searchList">筛选</a> -->
				<el-button type="primary" @click="searchList" style="width:100px;">筛选</el-button>
			</div>
		</div>
		<div class="filter clearfix">
			<div class="filbox">
				<span class="line">状态:</span>
				<!-- <span v-for="(item,i) in statusList" :key="i" class="fl mar" :class="{'ons':item.status == 1 }" @click="staTooge(item.id)">{{item.name}}</span> -->
				<el-radio-group v-model="commoditySlect">
					<el-radio-button v-for="(item,index) in statusList" :key="index" :label="item.name" @change.native="selType(item)"></el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div class="integralInfo">
			<span class="fl">已核销:{{usedNum}}份</span>
			<span class="fl">未核销:{{useNum}}份</span>
		</div>
		<!-- 下面的表格 -->
		<div class="list_box">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>兑换列表</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="useLists" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="id" label="序号" width="100" align="center">
				</el-table-column>
				<el-table-column prop="gname" label="商品名称" width="200" align="center">
				</el-table-column>
				<el-table-column prop="imageName" label="展示图片" width="120" align="center">
					<template slot-scope="scope">
						<img :src=" imgHost + scope.row.gimage" style="width: 60px;height: 60px" />
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" width="140" align="center">
				</el-table-column>
				<el-table-column prop="updateTime" label="消费时间" width="140" align="center">
				</el-table-column>
				<el-table-column prop="point" label="兑换积分" width="100" align="center">
				</el-table-column>
				<el-table-column prop="price" label="兑换金额" width="100" align="center">
				</el-table-column>
				<el-table-column prop="mname" label="兑换人" width="140" align="center">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="100" align="center">
				</el-table-column>
				<el-table-column label="券码" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.goodsType == '1'">--</span>
						<span v-else>{{scope.row.code == '' ? '--' : scope.row.code}}</span>
					</template>
				</el-table-column>
				<el-table-column label="领取门店" width="150" align="center">
					<template slot-scope="scope">
						<span>{{getshopName(scope.row.shopId)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="核销人" width="100" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.goodsType == '1'">{{scope.row.mname}}</span>
						<span v-else>{{getStaffname(scope.row.updateUid)}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="pages" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<changewin v-if="isWin" @getWin="code"></changewin>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';

	export default {
		data() {
			return {
				useLists: [],
				useInitial: [],
				useNum: null,
				usedNum: null,
				total: 1,
				pages: 1,
				count: 0,
				num: 10,
				len: null,
				statusList: [{
					'id': 'all',
					'name': '全部'
				},
				{
					'id': 'use',
					'name': '未核销'
				},
				{
					'id': 'used',
					'name': '已核销'
				}
				],
				commoditySlect: '全部',
				types: 'all',
				exportUrl: '',
				isWin: false,
				allTotal: 0,
				staffList: {}, //操作人列表
				shopsList: [], //店铺列表
				startTime: new Date().setDate(1) -
					(new Date().getTime() - new Date().setHours(0, 0, 0, 0)), //获取当月一号的零点时间戳
				endTime: new Date().setHours(23, 59, 59, 59), //结束时间
				actName: '' //商品名臣
			};
		},
		props: [
			'ischain',
			'imgHost',
			'shopId'
		],
		mounted() {

			this.userShop = storage.session('userShop');
			this.currentShop = this.userShop.currentShop;

			this.getListByShopId({
				page: this.pages
			});
			if (this.ischain != '1' && this.ischain != '2') {
				this.initBtn();
			}
			this.getShopList();
		},
		methods: {
			initBtn() {
				this.$store.commit('setPageTools', [{
					name: '验证商品券码',
					fn: () => {
						this.openCodeWin();
					},
					className: 'el-btn-yellow'
				}, {
					name: '导出',
					fn: () => {
						this.changeExport();
					},
					className: 'el-btn-blue'
				}]);
			},
			//获取兑换列表
			async getListByShopId(page) {
				this.pages = page.page;
				let res = await http.getListByShopId({
					data: {
						page: this.pages,
						num: this.num,
						type: this.types,
						start: parseInt(this.startTime / 1000), //开始时间
						end: parseInt(this.endTime / 1000), //结束时间
						name: this.actName
					}
				});
				this.useNum = res.numList.useNum;
				this.usedNum = res.numList.usedNum;
				this.useLists = res.list;
				this.staffList = res.staffList; //领取人
				this.total = res.total;
				this.count = res.count;
				this.total < 10 ? this.len = this.total : this.len = 10;
				let uses = this.useLists;
				// 时间戳转换
				for (let i = 0; i < uses.length; i++) {
					if (uses[i].createTime != '0') {
						uses[i].createTime = utils.getTime({
							time: uses[i].createTime,
							type: true,
							format: 'yyyy.MM.dd'
						}).format;
						uses[i].state = uses[i].status == 0 ? '未核销' : '已核销';
					}
					if (uses[i].status == 1 && uses[i].updateTime != '0') {
						uses[i].updateTime = utils.getTime({
							time: uses[i].updateTime,
							type: true,
							format: 'yyyy.MM.dd'
						}).format;
					}
				}
				this.useInitial = utils.deepCopy(this.useLists);
			},
			//导出
			async changeExport() {
				await http.changeExport({
					data: {
						shopId: this.shopId						
					}
				});
			},
			//验证商品劵码
			openCodeWin() {
				this.isWin = true;
			},
			// staTooge(id) {
			// 	let i;
			// 	// 更改状态
			// 	for (i = 0; i < this.statusList.length; i++) {
			// 		this.statusList[i].status = '0';
			// 		if (this.statusList[i].id == id) {
			// 			this.statusList[i].status = '1';
			// 		}
			// 	}
			// 	this.pages = 1;
			// 	if (id == 2) {
			// 		this.types = 'use';
			// 		this.getListByShopId({
			// 			page: 1
			// 		});
			// 	} else if (id == 3) {
			// 		this.types = 'used';
			// 		this.getListByShopId({
			// 			page: 1
			// 		});
			// 	} else {
			// 		this.types = 'all';
			// 		this.getListByShopId({
			// 			page: 1
			// 		});
			// 	}
			// },
			async verifyCode(code) {
				await http.verifyCode({
					data: {
						code: code
					}
				});
				this.getListByShopId({
					page: this.pages
				});

			},
			code(res, code) {
				if (res == 'ok') {
					this.verifyCode(code);
				}
				this.isWin = false;
			},
			getShopList: function() {
				// 获取卡属门店店铺列表
				if (this.ischain == '3') { // 处理品牌逻辑
					this.shopsList = storage.session('shopList');
					for (let item of this.shopsList) {
						item.name = item.shopName;
					}
				} else {
					this.shopsList.push(storage.session('userShop').currentShop);
				}
			},
			getshopName: function(id) {
				let shopName = '所有门店';
				for (let item of this.shopsList) {
					if (item.id == id) {
						shopName = item.name ? item.name : item.shopName;
					}
				}
				return shopName;
			},
			searchList: function() {
				this.getListByShopId({
					page: 1
				});
			},
			startTimeChange(time) {
				//开始时间
				this.startTime = time;
			},
			endTimeChange(time) {
				//结束时间
				this.endTime = new Date(time).setHours(23, 59, 59, 999);
			},
			selType(item) { //选择电子卡或者实体卡
				this.types = item.id;
				this.getListByShopId({
					page: 1
				});
			},
			//每页显示多少条数据
			handleSizeChange(p) {
				this.num = p;
				this.getListByShopId({
					page: this.pages
				});
			},
			//页码跳转
			pageChange(p) {
				this.pages = p;
				this.getListByShopId({
					page: this.pages
				});
			},
			getStaffname: function(id) {
				let staffname = '--';
				if (this.staffList && this.staffList != '') {
					for (let key in this.staffList) {
						if (key == id) {
							staffname = this.staffList[key];
							break;
						}
					}
				}
				return staffname;
			}
		},
		components: {
			page: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			changewin: () =>
				import ( /*webpackChunkName: 'exchange_win'*/ './exchange_win'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			calendar: () =>
				import ( /*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		},
		destroyed() {
			this.$store.commit('setPageTools', {});
		},
	};
</script>
<style type="text/css" scoped>
	/*#user {
	margin-top: 60px;
}*/

	.mall-box {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	#user .imgshow {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#user .imgshow img {
		width: 70px;
		height: 70px;
	}

	.firstFun {
		height: 40px;
		line-height: 40px;
		width: 100%;
		margin-bottom: 15px;
	}

	.firstTitle {
		width: 250px;
		height: 40px;
		overflow: hidden;
	}

	.firstTitle span,
	.firstBtn {
		display: inline-block;
		text-align: center;
		width: 125px;
		height: 40px;
		cursor: pointer;
	}

	.firstBtn {
		margin-top: 5px;
		line-height: 40px;
		position: absolute;
		right: 60px;
		top: 70px;
	}

	.firstTitle span {
		color: #333;
		background-color: #f2f2f2;
	}

	.firstTitle span.on {
		color: #fff;
		background-color: #2a80b9;
	}

	.firstTitle span.ons {
		color: #fff;
		background-color: #29a7e1;
	}

	.firstBtn {
		background-color: #f8931f;
		color: #fff;
	}

	.mar {
		margin-right: 5px;
	}

	.integralInfo {
		background-color: #f2f2f2;
		width: 100%;
		height: 40px;
		margin-bottom: 10px;
	}

	.integralInfo span {
		display: inline-block;
		width: 150px;
		line-height: 40px;
		text-align: center;
		color: #f7921e;
	}

	.gooodsTable,
	.gooodsContent {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.goodsTitle,
	.useManage {
		background-color: #e6e6e6;
		height: 50px;
		line-height: 50px;
		min-width: 920px;
	}

	.goodsTitle span,
	.gooodsContent span {
		float: left;
		width: 10%;
		min-width: 90px;
		text-align: center;
		overflow: hidden;
	}

	.goodsTitle span:last-child,
	.gooodsContent span:last-child {
		width: 20%;
	}

	.useManage span,
	.useConcent span {
		float: left;
		width: 12.5%;
		text-align: center;
	}

	.gooodsContent .concent,
	.useConcent .concent {
		width: 100%;
		border-bottom: 1px solid #e6e6e6;
		overflow: hidden;
	}

	.gooodsContent span,
	.useConcent span {
		height: 80px;
		line-height: 80px;
	}

	.gooodsContent span.notConsume,
	.useConcent span.notConsume {
		color: #08a019;
	}

	.gooodsContent span.aConsume,
	.useConcent span.aConsume {
		color: #ec1415;
	}

	.tips {
		text-align: center;
		height: 80px;
		line-height: 80px;
		color: #e7e7e7;
		font-size: 24px;
	}

	.operate {
		padding: 15px 0;
		box-sizing: border-box;
	}

	.operate a {
		display: inline-block;
		width: 33.33%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: #fff;
	}

	.del {
		background-color: #ec1415;
	}

	.eit {
		background-color: #00adef;
	}

	.shelves {
		background-color: #2a80b9;
	}

	.codeForm {
		width: 400px;
		height: 90px;
		overflow: hidden;
	}

	.codeForm .codeBox {
		margin: 20px auto;
		height: 45px;
		line-height: 45px;
		width: 300px;
	}

	.codeBox span,
	.codeBox input {
		display: inline-block;
		height: 45px;
	}

	.codeBox span {
		width: 90px;
		text-align: center;
	}

	.codeBox input {
		outline: none;
		padding: 0;
		padding-left: 10px;
		width: 190px;
		box-sizing: border-box;
	}














	/* 搜索图标的公共样式 */

	.order-order-searchA,
	.order-order-search {
		display: inline-block;
		width: 40px;
		height: 40px;
		background-color: #29a7e1;
		cursor: pointer;
		vertical-align: middle;
		margin-top: 1px;
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











	/* .filter {
	margin-bottom: 20px;
} */

	.filter .filbox {
		height: 40px;
		margin: 0 20px 15px 0;
		line-height: 40px;
	}

	.filter .line {
		margin: 0 5px;
		font-size: 16px;
		line-height: 40px;
	}

	.filter .name {
		width: 200px;
		height: 40px;
		background-color: #ffffff;
		border: solid 1px #cecdcd;
		text-indent: 15px;
	}

	.filter .filbox a {
		width: 80px;
		height: 40px;
		line-height: 40px;
	}
</style>