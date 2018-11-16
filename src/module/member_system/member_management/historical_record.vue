<!-- 历史记录 -->
<template>
	<div class="historical_record">
		<div class="searchbar">
			<div class="selbox fl">
				<el-date-picker v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false" @change="chooseTime">
				</el-date-picker>
			</div>
			<div class="selbox fl">
				<el-select v-model="trantypehigh" placeholder="请选择" @change="selData" style="color:#c0c4cc">
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
						<span @click="openOid(scope.row.oid,scope.row.belongToShop,scope.row.fromId)" style="color: #E1BB4A ">{{(scope.row.oid == '' || scope.row.oid == '0')?'--':scope.row.oid}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="交易类型" align="center">
					<template slot-scope="scope">
						<span>{{filterType(scope.row.type)}}</span>
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
	</div>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		props: {
			mid: String,
			shopsId: String
		},
		data() {
			return {
				page: 1, //页数
				num: 10, //一页请求的条数
				total: 0, //总页数
				count: '',
				userData: '',
				isBrand: false, //判断品牌	
				valueTime: [new Date().setHours(0, 0, 0, 0), new Date().setHours(23, 59, 59, 999)], //时间控件
				trantypeList: [{ //交易类型
					name: '全部',
					id: 0
				}, {
					name: '消费',
					id: 1
				}, {
					name: '储值',
					id: 2
				}, {
					name: '积分消费',
					id: 3
				}, {
					name: '积分奖励',
					id: 4
				}],
				trantypeId: 0, //交易类型对应的id
				trantypehigh: '全部',
				obj: {
					'1': '店内消费',
					'2': '店内充值',
					'3': '积分商城兑换',
					'4': '消费获得积分',
					'5': '裂变获得积分',
					'6': '微信消费',
					'7': '微信充值',
					'8': '积分过期',
					'9': '积分抵扣',
					'10': '积分调整',
					'11': '积分调整',
					'12': '余额调整',
					'13': '余额调整',
					'14': '退款失败',
					'15': '卡激活',
					'16': '金币记录',
					'17': '积分卡券',
					'18': '评论获得积分'
				},
				listInfo: '', //数据
				detail:'' //订单详情
			};
		},
		methods: {
			chooseTime: function(time) { //获取时间
				this.valueTime[1] = new Date(time[1]).setHours(23, 59, 59, 999);
			},
			selData: function(value) { //选择交易类型返回的
				this.trantypeId = value;
			},
			async getRecordList() { //获取记录
				let data = await http.getRecordList({
					data: {
						mid: this.mid,
						page: this.page,
						num: this.num,
						type: 0,
						startTime: parseInt(this.valueTime[0] / 1000),
						endTime: parseInt(this.valueTime[1] / 1000),
						subType: this.trantypeId
					}
				});
				this.listInfo = data;
				if (data.typeInfo) {
					this.obj = data.typeInfo;
				}
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
			translateTime: function(time, type) {
				//转换时间
				if (type) {
					return utils.format(time, 'yyyy-MM-dd hh:mm:ss');
				} else {
					return utils.format(time, 'yyyy-MM-dd');
				}
			},
			filterType: function(type) {
				return this.obj[type] || '余额';
			},
			//点击查看详情
			async openOid(oid, belongToShop, fromId) {
				if (oid == '' || oid == '0') {
					return;
				}
				// if(belongToShop == '' || belongToShop == 0){
				// 	this.$store.commit('setWin', {
				// 		title: '温馨提示',
				// 		winType: 'alter',
				// 		content: '快捷支付暂无法查看订单详情'
				// 	});
				// 	return false;				
				// }
				let res = await http.OrderstatisticsBillDelite({
					data: {
						shopId: this.isBrand == true ? fromId : belongToShop,
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
				this.trantypeId = 0;
				this.trantypehigh = '全部';
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
						subType: this.trantypeId,
						isExport: 1
					}
				});
			},
			searchList: function() { //搜索
				this.page = 1;
				this.getRecordList();
			}
		},
		mounted() {
			this.userData = storage.session('userShop');
			if (this.userData.currentShop && this.userData.currentShop.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
				this.isBrand = true; //更改品牌店的状态
			} else {
				this.isBrand = false;
			}
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