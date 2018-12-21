<!-- 历史记录 -->
<template>
	<div class="historical_record">
		<div class="searchbar">
			<div class="selbox fl">
				<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
				</el-date-picker>
			</div>
			<div class="selbox fl">
				<!-- <el-select v-model="trantypehigh" placeholder="请选择" @change="selData" style="color:#c0c4cc">
					<el-option v-for="item in trantypeList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select> -->
				<el-select v-model="trantypehigh" multiple collapse-tags style="margin-left: 20px;width:250px;" placeholder="全部" @change="selData">
					<el-option v-for="item in trantypeList" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="selbox fl">
				<el-button type="primary" style="width:120px;" @click="searchList">筛选</el-button>
				<el-button type="info" style="width:120px;" @click="resetFun">重置</el-button>
				<el-button type="primary" style="width:120px;" @click="Export">导出</el-button>
			</div>
		</div>
		<!-- 表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>历史记录</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="listInfo.list" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'70px'}">
				<el-table-column fixed prop="createTime" label="交易时间" align="center">
					<template slot-scope="scope">
						<span>{{translateTime(scope.row.createTime,'1')}}</span>
					</template>
				</el-table-column>
				<el-table-column label="订单" prop="name" align="center">
					<template slot-scope="scope">
						<span @click="openOid(scope.row.oid,scope.row.shopId,scope.row.fromId)" style="color: #E1BB4A ">{{(scope.row.oid == '' || scope.row.oid == '0')?'--':scope.row.oid}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="交易类型" align="center">
					<template slot-scope="scope">
						<span>{{filterType(scope.row.type)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="交易金额" align="center">
					<template slot-scope="scope">
						<span>{{judgeType(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="余额" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.type == 1 || scope.row.type == 2 || scope.row.type == 6 || scope.row.type == 7 || scope.row.type == 12 || scope.row.type == 13">{{scope.row.amount}}</span>
						<span v-else>{{scope.row.point}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="操作门店" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.fromId == '0'">
							{{userData.currentShop.name}}
						</span>
						<span v-else>{{isBrand?getshopName(scope.row.fromId):userData.currentShop.name}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :constructionsId='constructionsId' :oid='oid'></component>
	</div>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import getAppliedWin from './../../statistics/quick_payment_statistics/scancode_static_win.vue';
import { mixin } from './mixin.js';

export default {
	props: {
		mid: String,
		shopsId: String,
		bannerIndex: Number
	},
	mixins: [mixin],
	data() {
		return {
			page: 1, //页数
			num: 10, //一页请求的条数
			total: 0, //总页数
			count: '',
			userData: '',
			isBrand: false, //判断品牌	
			valueTime: [], //时间控件
			trantypeId: [], //交易类型对应的id
			trantypehigh: '全部',
			listInfo: '', //数据
			detail: '', //订单详情
			showWin: false,
			isPopupwindow: '',
			oid: '',
			constructionsId:''
		};
	},
	methods: {
		chooseTime: function(time) { //获取时间
			this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
		},
		selData: function(value) { //选择交易类型返回的
			this.trantypeId = value;
			if (this.trantypeId.length == 0) {
				this.allWritten();
			}
			//console.log(JSON.stringify(this.trantypeId));
		},
		async getRecordList() { //获取记录
			let data = await http.getRecordList({
				data: {
					mid: this.mid,
					page: this.page,
					num: this.num,
					type: 0,
					startTime: this.valueTime.length == 0 ? '' : parseInt(this.valueTime[0] / 1000),
					endTime: this.valueTime.length == 0 ? '' : parseInt(this.valueTime[1] / 1000),
					subType: this.trantypeId.join(',')
				}
			});
			this.listInfo = data;
			this.count = (this.page == 1) ? data.count : this.count;
			this.total = (this.page == 1) ? data.total : this.total;
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.page = 1;
			this.num = p;
			this.getRecordList();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.getRecordList();
		},
		//点击查看详情
		//品牌下面查看订单 有fromId 
		//单店下面 fromId为0
		async openOid(oid, belongToShop, fromId) {
			if (oid == '' || oid == '0') {
				return;
			}
			let subOid = oid.substring(8, 11);
			if (subOid == '011') {
				//打开新增用户标签的弹窗
				this.showWin = true; //打开弹窗
				this.isPopupwindow = 'getAppliedWin';
				this.oid = oid;
				this.constructionsId = fromId;
			} else {
				let res = await http.OrderstatisticsBillDelite({
					data: {
						shopId: this.isBrand ? fromId : belongToShop,
						oid: oid
					}
				});
				if (res) {
					res.oidDetial = 'enquiry'; //自定义商品统计特有标记
					this.detail = res;
					if (this.isBrand) {
						this.detail.fromId = fromId;
					}
				}
				this.$emit('eventrecord', this.detail);
			}
		},
		getshopName(id) { //根据id获取店铺名称
			let shopName;
			for (let i = 0; i < this.shopList.length; i++) {
				if (id == this.shopList[i].id) {
					shopName = this.shopList[i].shopName;
				}
			}
			return shopName;
		},
		getShopList: function() { //获取店铺列表
			let shopList = storage.session('shopList');
			let oneShop = storage.session('userShop').currentShop;
			let obj = {
				brandId: oneShop.brandId,
				id: oneShop.id,
				ischain: '',
				openTime: '',
				shopName: oneShop.name,
				shopNumber: ''
			};
			shopList.push(obj);
			this.shopList = shopList;
		},
		resetFun: function() { //重置
			this.valueTime = [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)];
			this.page = 1;
			this.num = 10;
			this.allWritten();
			this.getRecordList();
		},
		async Export() { //导出
			await http.exportgetRecordList({
				data: {
					mid: this.mid,
					page: this.page,
					num: this.num,
					type: 0,
					startTime: parseInt(this.valueTime[0] / 1000),
					endTime: parseInt(this.valueTime[1] / 1000),
					subType: this.trantypeId.join(','),
					isExport: 1
				}
			});
		},
		searchList: function() { //搜索
			this.page = 1;
			this.getRecordList();
		},
		allWritten: function() {
			this.trantypeId = [];
			for (let item of this.trantypeList) {
				this.trantypeId.push(item.id);
			}
		},
		getResult: function() {
			this.showWin = false;
		},
	},
	components: {
		getAppliedWin
	},
	mounted() {
		this.userData = storage.session('userShop');
		if (this.userData.currentShop && this.userData.currentShop.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}
		this.allWritten();
		this.getShopList();
		this.getRecordList();
	}
};
</script>
<style scoped>
.historical_record {
	width: 100%;
	height: 100%;
}

.historical_record .searchbar {
	width: 100%;
	height: 40px;
	margin-bottom: 20px;
}

.historical_record .searchbar .selbox {
	margin-right: 15px;
}
</style>