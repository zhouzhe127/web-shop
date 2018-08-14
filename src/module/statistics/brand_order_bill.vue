/*
 * @Author: zhengu.jiang 
 * @Date: 2018-06-13 10:46:57 
 * @Module: {挂账统计--品牌} 
 */

<template>
	<div class="brandBill">
		<div v-if="brand" class="brand">
			<div class="filter">
				<div class="block">
					<selectBtn @emit="getTimeType" :sorts="timeTypeList" :width="150"></selectBtn>
				</div>
				<div class="block">
					<calendar :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
					<span class="input-word">--</span>
					<calendar :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				</div>
				<div class="block time">
					<i @click="timeCheck" :class="{active:this.isOpenTime == 1}"></i>
					<span>按营业时间</span>
				</div>
				<div class="block">
					<selectStore @emit="getDrop" :sorts="shopList" :tipName="dropName"></selectStore>
				</div>
				<!-- <div class="block">
					<selectBtn @emit="getType" :sorts="accountTypeList" :width="150"></selectBtn>
				</div> -->
				<div class="search-box block">
					<span class="search-btn yellow" @click="search">搜索</span>
					<span class="reset-btn gray" @click="reset">重置</span>
				</div>
				<div class="shops">
					<i>已选择店铺：</i>
					<span v-for="(item,index) in shopList" :key="index" v-if="item.selected">{{item.name}}，</span>
				</div>
			</div>
			<div v-if="!loadShow" class="main">
				<div class="total">
					<div class="title">
						<span>天数</span>
						<span>订单数</span>
						<span>消费总额</span>
						<span>挂账总额</span>
					</div>
					<div class="total-data">
						<span>{{orderTotal.totalDay}}</span>
						<span>{{orderTotal.orderNum}}</span>
						<span>{{orderTotal.originalPrice}}</span>
						<span>{{orderTotal.billPrice}}</span>
					</div>
				</div>
				<div class="store-list">
					<div class="length">
						挂账统计统计 · 共
						<span> {{orderStoreList.length}} </span>条记录
					</div>
					<div class="title">
						<span>店铺名称</span>
						<span>消费金额</span>
						<span>挂账金额</span>
					</div>
					<ul>
						<li v-for="(item,index) in orderStoreList" :key="index">
							<span class="light" @click="toDay(item)">{{item.shopName}}</span>
							<span>{{item.originalPrice}}</span>
							<span>{{item.billPrice}}</span>
						</li>
						<li class="list-empty" v-if="!orderStoreList.length">暂时没有挂账</li>
					</ul>
				</div>
			</div>
			<div class="loading" v-else><img src="../../res/images/preloader.gif" /></div>
		</div>
		<orderBill v-else @return="getReturn" :sId="sId" :shopName="shopName" :sTime="startTime" :eTime="endTime" :isOpen="isOpenTime" :gType="operateTime"></orderBill>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data(){
		return {
			startTime: '',
			endTime: '',
			isOpenTime: 1, //按营业时间
			shopList: [], //店铺列表
			dropName: '请选择品牌门店',
			orderStoreList: [], //列表数据
			userShopList: [],
			// accountTypeList: ['全部','个人账户','企业账户'], //账户类型
			timeTypeList: ['挂账时间','结算时间'],
			loadShow: false,
			orderTotal: {
				totalDay: 1,
				orderNum: 0,
				originalPrice: 0, //消费总额
				billPrice: 0 //挂账总额
			}, //总计数据
			brand: true,
			operateTime: 0,//选中的操作时间
			billType: 0,//选中的账户类型
			timer: null,
			shopName: '',
			sId: '', //传入单店
		};
	},
	components:{
		calendar: () => import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		selectStore: () => import(/*webpackChunkName: "select_store"*/ 'src/components/select_store'),
		selectBtn: () => import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		orderBill: () => import(/*webpackChunkName: "order_bill_list"*/ './order_bill_list')
	},
	created() {
		this.userData = storage.session('userShop');
		if(this.userData.currentShop.ischain != 3){
			this.brand = false;
		}
		let shopIdArr = [],
			shopListArr = [];
		if (this.userData.currentShop.ischain == '3') {
			this.userShopList = storage.session('shopList');
			this.userShopList.forEach((item, index) => {
				shopIdArr[index] = item.id;
				let obj = {
					id: item.id,
					name: item.shopName
				};
				shopListArr.push(obj);
			});
			this.userShopIdStr = shopIdArr.join(','); //品牌下店铺id拼接
			this.userShopList = shopListArr;
		}
	},
	mounted(){
		// this.initBtn();
		this.shopIds = this.userShopIdStr;
		for (let i in this.userShopList) {
			//店铺默认全部选中
			this.userShopList[i].selected = true;
		}
		this.shopList = this.userShopList; //店铺列表
		this.storeName =
			this.userShopList.length > 0
				? this.userShopList[0].name
				: '选择店铺'; //选中店铺按钮 显示,
	},
	methods: {
		//初始化右上角按钮
		// initBtn() {
		// 	let arr = [{
		// 		name: '导出',
		// 		className: ['pickCheck', 'headSet'],
		// 		fn: () => {
		// 			this.exportData();
		// 		}
		// 	}];
		// 	this.$store.commit('setPageTools', arr);
		// },
		startTimeChange(time){
			this.startTime = time;
		},
		endTimeChange(time){
			this.endTime = time;
		},	
		timeCheck(){
			this.isOpenTime == 1 ? this.isOpenTime = 0 : this.isOpenTime = 1;
		},
		getDrop(res){//获取选中的店铺id
			this.shopList = res;
			let shopIds = [];
			res.forEach(item => {
				if(item.selected){
					shopIds.push(item.id);
				}
			});
			this.shopIds = shopIds.join(',');
		},
		// getType(res){//获取挂账类型
		// 	this.operateTime = res;
		// },
		getTimeType(res){ //获取挂账时间类型
			this.operateTime = res;
		},
		toDay(item){
			this.sId = item.shopId;
			this.shopName = item.shopName;
			this.brand = false;
			storage.session('brandBillList', this.orderStoreList);
		},
		search(){
			this.billOrderReport();
		},
		reset(){
			// this.accountTypeList =['全部','个人账户','企业账户'];
			this.timeTypeList =['挂账时间','结算时间'];
			this.startTime = '';
			this.endTime = '';
			let list = utils.deepCopy(this.shopList);
			let shopIds = [];
			list.forEach(item => {
				item.selected = true;
				shopIds.push(item.id);
			});
			this.shopList = list;
			this.shopIds = shopIds.join(',');
		},
		getReturn(){
			this.brand = true;
			this.orderStoreList = storage.session('brandBillList');
		},
		async billOrderReport() {
			if(!this.shopIds){
				this.$store.commit('setWin', {title: '温馨提示',winType: 'alert',content: '请选择店铺',});
				return false;
			}
			this.loadShow = true;
			http.billOrderReport({
				data: {
					startTime: this.startTime/1000,
					endTime: this.endTime/1000,
					isOpenTime: this.isOpenTime,
					operateTime: this.operateTime, //操作时间
					billType: this.billType, //挂账类型
					shopIds: this.shopIds,
					type: 21 //后台需要 写死
				}
			}).then(res => {
				if(this.timer){
					clearInterval(this.timer);
				}
				this.taskInfo(res.taskId);
				this.timer = setInterval(() => {
					this.taskInfo(res.taskId);
				}, 2000);
			});
		},
		//轮询请求接口
		async taskInfo(taskId) {
			http.taskInfo({data: {taskId: taskId}})
				.then(res => {
					if (res.status == 3) {
						clearInterval(this.timer);
						this.ReportGet(taskId);
					}else if(res.status == 2){
						clearInterval(this.timer);
						this.$store.commit('setWin', {title: '温馨提示',winType: 'alter',content: '请求失败，请重试'});
						this.loadShow = false;
					}
				});
		},
		//轮询结束获取数据
		async ReportGet(id){
			let res = await http.ReportGet({data: {
				taskId:id
			}});
			this.loadShow = false;
			if(res.total){
				this.orderStoreList = res.shops;
				this.orderTotal = res.total;
			}
		}
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style lang="less" scoped>
	.brandBill{
		.filter{
			.search-box {
				margin-right: 10px;
				display: inline-block;
				span {
					width: 80px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					border: 0;
					color: #fff;
					display: inline-block;
					cursor: pointer;
				}
				.search-btn {
					margin-right: 5px;
				}
			}
			.block{
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 10px;
			}
			.shops{
				margin-bottom: 10px;
				line-height: 20px;
			}
			.time{
				i {
					height: 20px;
					width: 20px;
					border-radius: 2px;
					margin-right: 5px;
					color: #444;
					cursor: pointer;
					display: inline-block;
					border: 1px solid #bbb;
					vertical-align: middle;
					margin-top: -3px;
				}
				i.active {
					background: url(../../res/icon/white_select.png) #28a8e0 center
						no-repeat;
					border: 1px solid #28a8e0;
				}
				span{
					font-size: 16px;
				}
			}
		}
		.loading {
			width: 100%;
			height: 350px;
			padding-top: 100px;
			text-align: center;
		}
		.main{
			.total {
				border: 1px solid #ccc;
				span {
					float: left;
					width: 25%;
					text-align: center;
				}
				.title {
					height: 40px;
					overflow: hidden;
					background: #e6e6e6;
					span {
						color: #333;
						height: 40px;
						line-height: 40px;
					}
				}
				.total-data {
					overflow: hidden;
					span {
						color: #f8941f;
						height: 50px;
						line-height: 50px;
					}
				}
			}
			.store-list {
				margin-top: 20px;
				border: 1px solid #ccc;
				.length {
					height: 50px;
					line-height: 50px;
					padding-left: 10px;
					font-size: 16px;
					span {
						color: #f30;
						font-size: 16px;
					}
				}
				.title {
					overflow: hidden;
					background: #e6e6e6;
					span {
						float: left;
						text-align: center;
						height: 50px;
						line-height: 50px;
						width: 33.33%;
						color: #666;
					}
				}
				.day span {
					width: 25%;
				}
				ul {
					background: #fff;
					li {
						overflow: hidden;
						border-bottom: 1px solid #f7f7f7;
						span {
							float: left;
							text-align: center;
							height: 50px;
							line-height: 50px;
							width: 33.33%;
							color: #f8941f;
						}
						.light {
							color: #29a7e1;
							cursor: pointer;
							&:hover {
								color: #09f;
							}
						}
						&:last-child {
							border-bottom: 0;
						}
					}
					.day span {
						width: 25%;
					}
					.list-empty {
						height: 70px;
						line-height: 70px;
						font-size: 20px;
						text-align: center;
						color: #999;
					}
				}
			}
		}
	}
</style>



