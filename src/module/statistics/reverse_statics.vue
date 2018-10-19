<!--
	**反结账统计
	*
	* 
	* *孔伟研
	*
-->
<template>
	<div id="revSta">
		<section v-if="!isShow">
			<!--总览订单页面显示日期-->
			<div v-if="isAll" class="order-order-data">
				<ul>
					<!--日期选择和搜索框-->
					<el-date-picker style="width:150px;cursor: pointer;float: left" :clearable="false" v-model="startT" type="date" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
					<span class="to">至</span>
					<el-date-picker style="width:150px;cursor: pointer;float: left" :clearable="false" v-model="endT" type="date" format="yyyy-MM-dd" value-format="timestamp">
					</el-date-picker>
					<li>
						<div v-on:click="selectBusinessHours" :class="{'selected':isOpenTime}" class="checkBox"></div>
						<span style="font-size: 16px;">按营业时间</span>
					</li>
					<li>
						<span style="font-size: 16px;">反结账原因：</span>
						<el-select v-model="reasonId">
							<el-option v-for="(item,i) in reasonList" :key="i" :label="item.reasonName" :value="item.id"></el-option>
						</el-select>
					</li>
					<li>
						<el-button v-on:click="getReverList()" type="primary">搜索</el-button>
						<el-button v-on:click="resetting()" type="info">重置</el-button>
					</li>
					<li>
						<el-input v-model="orderOid" clearable placeholder="请输入订单号" style="width:200px;" :maxlength="20">
							<el-button slot="append" icon="el-icon-search" @click="searchOid"></el-button>
						</el-input>
					</li>
				</ul>
			</div>
			<section v-show='isAll' style="margin-bottom:20px;">
				<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="reverseList" border>
					<el-table-column fixed min-width="150" align="center" label="订单号">
						<template slot-scope="scope">
							<em style="color:#28a8e0;cursor: pointer" @click="openOid(scope.row.oid)">{{scope.row.oid}}</em>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="50" align="center" prop="times" label="反结账次数"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="oldPrice" label="反结账前(消费/实收)"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="newPrice" label="反结账后(消费/实收)"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="time" label="反结账时间"> </el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" label="反结账原因">
						<template slot-scope="scope">
							<span>{{scope.row.reason?scope.row.reason:'--'}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="createUser" label="操作人"></el-table-column>
				</el-table>
			</section>
			<section v-show="!isAll" style="margin-bottom:20px;">
				<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="reverseOneList" border>
					<el-table-column fixed min-width="150" align="center" label="订单号">
						<template slot-scope="scope">
							<span style="color:#28a8e0;cursor: pointer" @click="openOidDetial(oid)">{{oid}}</span>
						</template>
					</el-table-column>
					<el-table-column fixed min-width="50" align="center" label="次数">
						<template slot-scope="scope">
							<span>第{{scope.$index+1}}次</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="oldPrice" label="反结账前(消费/实收)"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="newPrice" label="反结账后(消费/实收)"></el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="time" label="反结账时间"> </el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" label="反结账原因">
						<template slot-scope="scope">
							<span>{{scope.row.reason?scope.row.reason:'--'}}</span>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip min-width="100" align="center" prop="createUser" label="操作人"></el-table-column>
				</el-table>
			</section>
			<!-- 翻页 -->
			<div style="margin-top: 10px" v-show='isAll'>
				<el-pagination @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num" :page-count="totalNum" layout="sizes, prev, pager, next" :page-sizes="[10, 20, 30]" background></el-pagination>
			</div>
		</section>
		<orderDetail :detail="oidDetial" :isDelete="false" v-if="isShow" @detailShow="retOidDetial"></orderDetail>
	</div>
</template>
<script>
import http from 'src/manager/http';
import global from 'src/manager/global';
export default {
	data() {
		return {
			page: 1, //页码数
			num: 10,
			totalNum: 1, //总页数
			startT: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endT: new Date().setHours(0, 0, 0, 0), //日期组件的结束时间
			isOpenTime: false, //是否按营业时间 默认 false 0 否

			isAll: true, //初始为所有订单页面
			reverseList: [], //反结账列表

			reasonList: [], //反结账原因列表
			reasonId: 0, //反结账原因id

			reverseOneList: [], //单个订单的反结账列表
			oid: '', //订单号
			orderOid: '', //输入的订单号
			isShow: false,
			oidDetial: null
		};
	},
	mounted() {
		//		let detial = storage.session('titleDetial');
		//		if (detial && detial != null) {
		//			this.page = detial.page; //页码数
		//			this.startT = detial.startTime;
		//			this.endT = detial.endTime;
		//			this.isOpenTime = detial.isOpenTime; //是否按营业时间 默认 false 0 否
		//		}
		this.$store.commit('setPageTools', []);
		this.init();
	},
	watch: {
		isAll: 'getBack'
	},
	methods: {
		getBack() {
			let that = this;
			if (that.isAll) {
				that.$store.commit('setPageTools', []);
			} else {
				this.$store.commit('setPageTools', [
					{
						name: '返回',
						className: ['back'],
						fn: function() {
							that.isAll = true;
						}
					}
				]);
			}
		},
		//接收订单详情返回
		retOidDetial() {
			this.isShow = false;
			this.getBack();
		},
		//搜素订单
		searchOid() {
			let onum = this.orderOid;
			let regNum = /\d+/g;
			if (onum == null || onum == undefined || onum == '') {
				this.$store.commit('setWin', {
					content: '请输入订单号码!'
				});
				return false;
			}
			let newOnum = onum.split('');
			if (newOnum.length < 18 || !regNum.test(onum)) {
				this.$store.commit('setWin', {
					content: '请输入正确订单号码!'
				});
				return false;
			}
			this.openOid(this.orderOid);
		},
		//重置
		resetting: function() {
			this.startT = new Date().setHours(0, 0, 0, 0);
			this.endT = new Date().setHours(0, 0, 0, 0);
			this.isOpenTime = false;
			this.reasonId = 0;
			this.init();
		},
		//初始化获得反结账列表
		async init() {
			let res = await http.getReasonList({
				data: {
					type: 1
				}
			});
			if (res) {
				let all = { id: 0, reasonName: '全部' };
				res.unshift(all);
				this.reasonList = res;
			}
			this.getReverList();
		},
		//获取反结账列表
		async getReverList() {
			let checkData = this.checkData();
			if (!checkData) return false;
			let del = await http.getReverseList({
				data: {
					startTime: parseInt(this.startT / 1000), //开始时间
					endTime: parseInt(this.endT / 1000 + 24 * 60 * 60 - 1), //结束时间
					isOpenTime: Number(this.isOpenTime),
					page: this.page,
					num: this.num,
					reasonId: this.reasonId
				}
			});
			let list = del.list;
			this.totalNum = del.totalNum;
			for (let i = 0; i < list.length; i++) {
				list[i].oldPrice =
					list[i].oldOrigPrice + '/' + list[i].oldPrice;
				list[i].newPrice =
					list[i].nowOrigPrice + '/' + list[i].nowPrice;
			}
			this.reverseList = list;
		},
		async openOid(oid) {
			this.oid = oid;
			let del = await http.getReverseDetail({
				data: {
					oid: oid
				}
			});
			if (del) {
				for (let i = 0; i < del.length; i++) {
					del[i].oldPrice =
						del[i].oldOrigPrice + '/' + del[i].oldPrice;
					del[i].newPrice =
						del[i].nowOrigPrice + '/' + del[i].nowPrice;
				}
				this.reverseOneList = del;
				this.isAll = false;
			}
		},
		async openOidDetial() {
			this.oidDetial = await http.orderBillDelite({
				data: {
					oid: this.oid
				}
			});
			let detial = this.oidDetial;
			if (detial) {
				this.isShow = true;
			}
		},
		//点击按营业时间
		selectBusinessHours: function() {
			this.isOpenTime = !this.isOpenTime;
		},
		checkData: function() {
			if (this.endT - this.startT > global.timeConst.THREEMONTHS) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '只能查询间隔三个月的数据'
				});
				return false;
			}
			if (this.startT - this.endT > 0) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '查询时间选择错误'
				});
				return false;
			}
			return true;
		},
		//每页显示多少行
		numChange(e) {
			this.num = e;
			this.page = 1;
			this.getReverList();
		},
		//分页点击
		pageClick(e) {
			this.page = e;
			this.getReverList();
		}
	},
	components: {
		orderDetail: () =>
			import(/*webpackChunkName: "delete_detail"*/ '../statistics/delete_detail')
	}
};
</script>
<style type="text/css" scoped>
#revSta {
	height: 100%;
}
#revSta .order-order-data {
	min-height: 40px;
	margin-bottom: 20px;
}
#revSta .order-order-data .to {
	float: left;
	width: 25px;
	line-height: 40px;
	text-align: center;
}
#revSta .order-order-data ul li {
	float: left;
	margin-right: 20px;
	height: 42px;
	line-height: 40px;
}
#revSta .order-order-data ul li span input {
	width: 174px;
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
	float: left;
}
#revSta .selected {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#e1bb4a;
}
#revSta .order-order-data .checkBox {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #e1bb4a;
	margin: 13px 10px;
	float: left;
}
/*#revSta .order-order-data .secBtn {*/
/*width: 80px;*/
/*height: 40px;*/
/*line-height: 40px;*/
/*margin-left: 10px;*/
/*}*/
/*#revSta .order-order-data .recBtn {*/
/*width: 80px;*/
/*height: 40px;*/
/*line-height: 40px;*/
/*margin-left: 10px;*/
/*}*/
/*.order-order-searchA {*/
/*float: left;*/
/*width: 41px;*/
/*height: 41px;*/
/*font-size: 20px;*/
/*padding-top: 10px;*/
/*color: #fff;*/
/*background-color: #29a7e1;*/
/*cursor: pointer;*/
/*}*/
</style>