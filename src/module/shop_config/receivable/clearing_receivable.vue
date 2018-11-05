<!--
	**挂账账户结算页面
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div slot="content">
		<div v-if="!detailShow" class="recMan" id="clear_rec">
			<div v-if="!isClearing" class="oTitle" style="">
				<!-- <el-radio-group v-model="oneType" @change = "getOidList">
					<el-radio-button label="1">未结清</el-radio-button>
					<el-radio-button label="2">已结算</el-radio-button>
				</el-radio-group> -->
				<section class="oLi" @click="changeType(index)" :class="{'active':oneType == index}" v-for="(item,index) in typeList" :key="index" style="">{{item.name}}</section>
			</div>
			<section class="oBox">
				<el-table
					stripe :row-style ="{color:'#f8941f'}" :header-cell-style = "{'background-color':'#f5f7fa'}"
					v-if="isClearing"
					:data="titleDetial"
					style="width: 100%">
					<el-table-column align="center" label="账户类型" :row-style ="{color:'#f8941f'}">
						<template slot-scope="scope">
							<span v-if="scope.row.type == 1">个人账户</span>
							<span v-if="scope.row.type == 2">企业账户</span>
						</template>
					</el-table-column>
					<el-table-column align="center" prop="name" label="账户名称"></el-table-column>
					<el-table-column align="center" prop="contactMan" label="联系人" ></el-table-column>
					<el-table-column align="center" prop="mobile" label="手机号" ></el-table-column>
					<el-table-column show-overflow-tooltip align="center" label="挂账人" >
						<template slot-scope="scope">
							<span v-if="scope.row.type == 1">{{scope.row.contactMan}}</span>
							<span v-if="scope.row.type == 2">{{scope.row.billMen}}</span>
						</template>
					</el-table-column>
				</el-table>
			</section>
			<section class="oBox">
				<el-table
					stripe :row-style ="{color:'#f8941f'}" :header-cell-style = "{'background-color':'#f5f7fa'}" 
					:data="titleDetial"
					style="width: 100%">
					<template slot-scope="props">
						<el-table-column align="center" prop="oidNum" label="订单数"></el-table-column>
						<el-table-column align="center" prop="totle" label="消费金额"></el-table-column>
						<el-table-column v-if="oneType+'' =='1'" align="center" prop="allmax" label="实收金额"></el-table-column>
						<el-table-column v-if="oneType+'' =='0'" align="center" prop="allmax" label="挂账金额"></el-table-column>
					</template>
				</el-table>
			</section>
			<section class="oBox">
				<div class="boxTop" style="background-color:#f5f7fa">
					<div class="oSpan">
						挂账统计 · 共<em style="color: #ff3c04;font-size: inherit;">{{showOidList.length}}</em>个条目
					</div>
				</div>
				<el-table
					ref="multipleTable" stripe
					:data="newShowOidList"
					fixed
					:header-cell-style = "{'background-color':'#f5f7fa'}"
					style="width: 100%"
					@selection-change="handleSelectionChange" v-if="isClearing">
					<template slot-scope="scope">
						<el-table-column v-if="oneType+'' =='0'"  reserve-selection type="selection" width="55"> </el-table-column>
						<el-table-column fixed min-width = "200" align="center" label="订单号">
							<template slot-scope="scope">
								<span @click="openOid(scope.row)" style="color:#01AAE5;cursor:pointer">{{scope.row.oid}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width = "200" align="center" prop="createTime" label="挂账时间"></el-table-column>
						<el-table-column prop="createName" align="center" label="操作人" > </el-table-column>
						<el-table-column prop="originalPrice" align="center" label="消费金额" > </el-table-column>
						<el-table-column v-if="oneType+'' =='1'" align="center" prop="billPrice" label="实收金额"></el-table-column>
						<el-table-column v-if="oneType+'' =='0'" align="center" prop="billPrice" label="挂账金额"></el-table-column>
						<el-table-column prop="shopName" align="center" v-if="ischain=='3'" label="挂账店铺"> </el-table-column>
					</template>
				</el-table>
				<el-table
					ref="multipleTable" stripe
					:data="newShowOidList"
					fixed
					style="width: 100%">
					<template v-if="!isClearing">
						<el-table-column fixed min-width = "200" align="center" label="订单号">
							<template slot-scope="scope">
								<span @click="openOid(scope.row)" style="color:#01AAE5;cursor:pointer">{{scope.row.oid}}</span>
							</template>
						</el-table-column>
						<el-table-column min-width = "200" align="center" prop="createTime" label="挂账时间"></el-table-column>
						<el-table-column prop="isSettle" align="center" label="状态" > </el-table-column>
						<el-table-column show-overflow-tooltip prop="personName" align="center" label="挂账人" > </el-table-column>
						<el-table-column show-overflow-tooltip prop="createName" align="center" label="操作人" > </el-table-column>
						<el-table-column prop="originalPrice" align="center" label="消费金额" > </el-table-column>
						<el-table-column show-overflow-tooltip v-if="oneType+'' =='1'" align="center" prop="billPrice" label="实收金额"></el-table-column>
						<el-table-column show-overflow-tooltip v-if="oneType+'' =='0'" align="center" prop="billPrice" label="挂账金额"></el-table-column>
						<el-table-column show-overflow-tooltip prop="shopName" min-width = "120" align="center" v-if="ischain=='3'" label="挂账店铺"> </el-table-column>
					</template>
				</el-table>
			</section>
			<div style="margin-top:10px;">
				<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="currentPage" :page-size = "num" layout="sizes, prev, pager, next" :page-count="totalNum" :page-sizes="[10, 20, 30]"></el-pagination>
			</div>
			<div v-if="isClearing" class="oBottom" style="">
				<span class="ltitle">支付方式</span>
				<el-select v-model="payIndex" placeholder="选择结算方式">
					<el-option
						v-for="item in payList"
						:key="item.type"
						:label="item.name"
						:value="item.type">
					</el-option>
				</el-select>
			</div>
			<div v-if="isClearing" style="width:300px;margin: 10px;">
				<el-button @click="clearPay" type="primary" style="width:150px;">结算</el-button>
			</div>
		</div>
		<!--订单详情-->
		<orderDetail :detail="oidDetail" :isDelete="true" v-if="detailShow" @detailShow="getDetailShow"></orderDetail>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
// import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			isNames: false,
			shopId: '',
			typeList: [{ name: '未结清', id: 1 }, { name: '已结算', id: 2 }],
			payList: [
				{ name: '现金结算', type: '1' },
				{ name: '银行转账', type: '2' }
			],
			payName: '',
			payIndex: '', //支付方式下标
			oneType: 0, //类下标
			titleDetial: [],
			oidList: [], //挂账单列表
			showOidList: [], //复制挂账单列表
			selectList:[],//使用饿了么组件选择结清订单的数组--结清方便

			currentPage: 1,
			num: 10,
			ischain: '',//判断品牌单店
			// spanList: [],//显示挂账人数组
			detailShow: false, //显示详情
			oidDetail: {},//订单详情
			isClearing: false,//是否是结清页面
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.isClearing = this.isAClearing;
		this.ischain = userData.currentShop.ischain;
		
		this.titleDetial = [];
		this.titleDetial.push(this.manDetial);
		this.$set(this.titleDetial[0], 'totle', 0);
		this.$set(this.titleDetial[0], 'allmax', 0);
		this.$set(this.titleDetial[0], 'billMen', '');
		let billMen = '';
		let billPerson = this.titleDetial[0].billPerson;
		for (let i = 0; i < billPerson.length; i++) {
			billMen += billPerson[i].name + ':' + billPerson[i].mobile + ',';
		}
		this.titleDetial[0].billMen = billMen;
		this.oidList = this.manDetial.billOrder;
		this.showOidList = this.manDetial.billOrder;
		this.clearDetial();
		
		//如果没有结清的选项则不让其进入结清页面
		if(this.showOidList.length == 0 && this.isAClearing){
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'alert',
				content: '没有未结清账单'
			});
			this.isClearing = false;
		}
		this.isTatle();
	},
	components: {
		// comTable: () =>
		// 	import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		// selectBtn: () =>
		// 	import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		// pageElement: () =>
		// 	import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		orderDetail: () =>
			import(/*webpackChunkName: "order_detail"*/ 'src/module/statistics/delete_detail')
	},
	watch: {
		isClearing: 'clearDetial'
	},
	props: {
		manDetial: Object, //用户信息
		isAClearing: Boolean //是否是结账的步骤
	},
	computed: {
		totalNum() {
			return Math.ceil(this.showOidList.length / this.num);
		},
		newShowOidList() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.showOidList.slice(startIndex, endIndex);
		}
	},
	methods: {
		handleSelectionChange(val){
			this.selectList = val;
			console.log(val);
			// for(let i=0;i<val.length;i++){
			// 	val[i].selected = true;
			// }
		},
		remove() {
			//隐藏挂账人弹窗
			this.isNames = false;
		},
		//显示挂账人列表
		// openMen(item) {
		// 	this.isNames = !this.isNames;
		// 	this.spanList = item.split(',');
		// },
		//打开订单详情
		async openOid(item) {
			//获取订单详情
			let data = await http.orderBillDelite({
				data: {
					trueShopId: item.shopId,
					oid: item.oid
				}
			});
			this.detailShow = true; //显示详情
			this.oidDetail = data;
		},
		getDetailShow(detailShow) {
			//获取详情页派发的事件 隐藏详情页
			this.detailShow = detailShow;
			this.isTatle();
		},
		//调节左上角按钮
		isTatle() {
			let rools = [];
			if (this.isClearing) {
				rools = [{ name: '返回', type: 4,className: 'info', fn: this.back }];
			} else {
				rools = [
					{ name: '返回',  type: 4,className: 'info', fn: this.back },
					{ name: '结算', type: 4,className: 'primary', fn: this.clearBtn }
				];
			}
			this.$store.commit('setPageTools', rools);
		},
		//结算按钮点击
		clearBtn() {
			let arr = [];
			for (let i = 0; i < this.oidList.length; i++) {
				if (this.oidList[i].isSettle == '0') {
					arr.push(this.oidList[i]);
				}
			}
			if(arr.length == 0){
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '没有未结清账单'
				});
				return;
			}
			this.isClearing = true;
		},
		//返回按钮点击
		back() {
			if (this.isClearing) {
				this.isClearing = false;
				return;
			}
			this.showClearing = false;
			this.$emit('clearResult'); //抛出一个事件给父组件
		},
		//切换已结清和未结清
		changeType(index) {
			this.oneType = index+'';
			this.currentPage = 1;
			let arr = [];
			this.titleDetial[0].totle = 0;
			this.titleDetial[0].allmax = 0;
			for (let i = 0; i < this.oidList.length; i++) {
				// this.$set(this.oidList[i], 'selected', false);//往列表里塞selected，单选全选点击用
				if (this.oneType == this.oidList[i].isSettle) {
					this.titleDetial[0].totle +=
						this.oidList[i].originalPrice * 1;
					this.titleDetial[0].allmax += this.oidList[i].billPrice * 1;
					arr.push(this.oidList[i]);
				}
			}
			this.showOidList = arr;
			this.titleDetial[0].totle = this.titleDetial[0].totle.toFixed(2);
			this.titleDetial[0].allmax = this.titleDetial[0].allmax.toFixed(2);
			this.titleDetial[0].oidNum = arr.length;
		},
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少行
		numChange(e){
			this.num = e;
			this.currentPage = 1;
		},
		//初始化改变表格头部要显示的数据
		clearDetial() {
			this.currentPage = 1;
			this.isTatle();
			this.changeType(0); //如果是结清页面，则过滤订单，使其为未结清的订单
			
		},
		//停用启用接口
		async settleBill(detial) {
			let settle = await http.settleBill({ data: detial });
			if (settle) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '结算成功'
				});
				this.$emit('clearResult'); //抛出一个事件给父组件
			}
		},
		//结算页面点击
		clearPay() {
			console.log(this.payIndex);
			if (this.payIndex == '') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请选择结算方式'
				});
				return false;
			}
			let arr = {};
			for (let i = 0; i < this.selectList.length; i++) {
				if (this.ischain != '3') {
					if (this.shopId in arr) {
						arr[this.shopId].push(this.selectList[i].oid);
					} else {
						arr[this.shopId] = [this.selectList[i].oid];
					}
				} else {
					if (this.selectList[i].shopId in arr) {
						arr[this.selectList[i].shopId].push(
							this.selectList[i].oid
						);
					} else {
						arr[this.selectList[i].shopId] = [
							this.selectList[i].oid
						];
					}
				}
			}
			let detial = {};
			detial.payType = this.payIndex;
			if (arr == {}) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请选择要结账的订单'
				});
				return false;
			}
			detial.billList = arr;
			this.settleBill(detial);
		}
	}
};
</script>
<style lang="less" scoped>
#clear_rec {
	.oBox{
		width:100%;border:1px solid #ebeef5;border-bottom:none;padding:1px;margin:10px 0;
		.boxTop{
			height:50px;border-bottom:1px solid #ebeef5;
			.oSpan{
				width: 100%;
				height: 50px;
				line-height: 50px;
				padding: 0 10px;
				font-size: 16px;
			}
		}
	}
	.oTitle {
		width: 100%;
		overflow: hidden;
		.oLi {
			width: 90px;
			height: 40px;
			line-height: 40px;
			background-color: #f2f2f2;
			margin-right: 20px;
			float: left;
			text-align: center;
			border-radius: 5px;
			color: #333;
			cursor: pointer;
		}
		.active {
			background-color: #28a8e0;
			color: #fff;
		}
	}
	.oBottom{
		margin-top:20px;
		.ltitle {
			width: 78px;
			line-height: 40px;
			text-align: right;
			float: left;
			box-sizing: border-box;
			font-size: 14px;
			margin-right: 10px;
			color: #606266;
		}
		.ltitle::before {
			position: relative;
			top: 0;
			right: 2px;
			content: "*";
			color: #b98d6b;
		}
	}
}
</style>


