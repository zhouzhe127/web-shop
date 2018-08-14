<!--
    **实体卡查询——卡查询
    *
    * 胡江
    * *
    *
-->
<template>
	<div id="card-queries">
		<!-- 非详情 -->
		<section v-if="!detailStatus">
			<div class="timeSearch">
				<div class="activation fl">
					激活时间
				</div>
				<!--日期选择和搜索框-->
				<div class="date">
					<section class="fl">
						<section>
							<calendar :pObj="{time:startTime}" @throwTime="getStartTime"></calendar>
						</section>
					</section>
					<span class="data-center">至</span>
					<section class="fl">
						<section>
							<calendar :pObj="{time:endTime}" @throwTime="getEndTime"></calendar>
						</section>
					</section>
					<span class="order-order-searchA">
						<span v-on:click="searchList()" class="order-order-search" href="javascript:void(0)"></span>
					</span>
				</div>
			</div>
			<div class="enquiries">
				<div class="activation fl">
					卡号查询
				</div>
				<!-- 卡号查询 -->
				<select-btn :name='cardhigh' :sorts="cardList.map(v=>v.name)" :width="180" @selOn="selectCard"></select-btn>
				<!-- 横线 -->
				<span class="line"> - </span>
				<!-- 选择门店编号 -->
				<section class="statisticsLists">
					<section @click="showhighList(2,$event)" class="tableListInp chairFix">
						<span class="spanSty">{{shophigh}}</span>
						<div class="fl calendar-ctr">
							<i></i>
						</div>
					</section>
					<ul v-if="shopLimit">
						<li @click="costhighShow(index,2,$event)" v-for='(item,index) in shopList' :key="index">{{item.name}}</li>
					</ul>
				</section>
				<span class="line"> - </span>
				<!-- 卡号 -->
				<input class="numbering" type="text" placeholder="卡号" style="margin-right:10px;" v-model="number" maxlength="8" />
				<input class="numbering" type="text" placeholder="请输入手机号" style="margin-right:10px;" v-model="mobile" maxlength="11" />
				<!-- 卡状态 -->
				<section class="statisticsLists">
					<section @click="showhighList(3,$event)" class="tableListInp chairFix">
						<span class="spanSty">{{cardstahigh}}</span>
						<div class="fl calendar-ctr">
							<i></i>
						</div>
					</section>
					<ul v-if="cardstaLimit">
						<li @click="costhighShow(index,3,$event)" v-for='(item,index) in cardstaList' :key="index">{{item.name}}</li>
					</ul>
				</section>
				<a href="javascript:;" style="background: #2EA8DC;" @click="searchList()">筛选</a>
				<a href="javascript:;" style="background: #B3B3B3;" @click="filterReset">重置</a>
			</div>
			<div class="clAll"></div>
			<div class="list">
			</div>
			<comTable :listName="'卡列表'" :titleData="titleData" :introData="list" :allTotal="count" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50" :listWidth="1300" :fixed="0">
				<span slot="title-0" slot-scope="props" style="color: #2EA8DC;width: 50px;cursor: pointer" @click="allSelectedOne">全选</span>
				<span slot="con-0" slot-scope="props" @click="ocSelOne(props.data)" style="cursor: pointer">
					<span style="display: inline-block;width: 20px;height: 20px;border-radius: 10px;border:1px solid #919191;margin-top:15px;"
					    :class="{ 'active': props.data.selected}">
					</span>
				</span>
				<span slot="con-1" slot-scope="props" @click="getDetail(props.data)" style="color: #2EA8DC;cursor: pointer">查看详情</span>
				<span slot="con-2" slot-scope="props">{{props.data.name==''?'--':props.data.name}}</span>
				<span slot="con-3" slot-scope="props" style="font-size: 12px;">{{props.data.abbr}}-{{addPreZero(props.data.shopNumber,4)}}-{{addPreZero(props.data.number,8)}}</span>
				<span slot="con-4" slot-scope="props">{{props.data.cardTypeId == '0'?'--':getcardName(props.data.cardTypeId)}}</span>
				<span slot="con-5" slot-scope="props">{{props.data.mobile==''?'--':props.data.mobile}}</span>
				<span slot="con-6" slot-scope="props">{{transformTime(props.data.createTime)}}</span>
				<span slot="con-7" slot-scope="props">{{props.data.lastConsumeTime == '0'?'--':transformTime(props.data.lastConsumeTime)}}</span>
				<span slot="con-8" slot-scope="props">{{getValidity(props.data.endCardTime)}}</span>
				<span slot="con-9" slot-scope="props">{{getState(props.data)}}</span>
			</comTable>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="pageChange" :page="Number(pageDetial.page)" :total="Number(pageDetial.pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</section>
		<cardDetail v-if="detailStatus" @throwWinResult="getDetailShow" :cardNumber="cardNumber"></cardDetail>
		<cardRecharge v-if="isRecharge" @throwWinResult="rechargeBack" :userData="userData" :selectedList="selectedList" :cardTypeList="cardTypeList"></cardRecharge>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			userData: Object,
			isRecharge: false, //是否打开批量修改的弹窗
			isBrand: false, //品牌店的状态
			detailStatus: false, //是否查看详情
			detaiList: {}, //详情数据
			startTime: new Date().setHours(0, 0, 0, 0), //日期组件的开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //日期组件的结束时间
			allselect: false, //全选的状态
			selectedList: [], //选中的数组
			list: [], //查询到的数据
			cardhigh: '选择卡类型',
			cardList: [], //卡类型筛选列表
			cardId: '', //卡类型对应的id
			cardLimit: false, //卡类型下拉框显示
			shopList: [], //选择门店编号
			choicehopId: '', //门店编号选中的id
			shopLimit: false, //店铺下拉框显示
			shophigh: '选择门店编号',
			cardstaList: [{ //卡状态
				name: '全部',
				id: 0
			}, {
				name: '未开始',
				id: 1
			}, {
				name: '使用中',
				id: 2
			}, {
				name: '已过期',
				id: 3
			}, {
				name: '已停用',
				id: 4
			}],
			cardstaId: '0', //卡状态对应的id
			cardstaLimit: false, //店铺下拉框显示
			cardstahigh: '全部',
			storesId: '', //选中的店铺列表的id
			storesLimit: false, //店铺下拉框显示
			storeshigh: '选择操作门店',
			trantypeId: '', //交易类型对应的id
			trantypeLimit: false, //交易类型
			trantypehigh: '全部',
			count: '0', //数据的总的条数
			number: '', //输入的卡号
			mobile: '', //输入的手机号码
			pageDetial: {
				page: 1, //请求的页码数
				num: 10, //一页的数量
				pageNum: 1 //总页数
			},
			deShopList: [], //传到详情页面
			storesList: [], //操作店铺的列表,传递到详情页面
			cardTypeList: [], //卡类型数据的列表
			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null, //表格内容样式
			cardNumber: '', //卡的ID
			cardStatus: {
				0: '未使用',
				1: '使用中',
				2: '已写入',
				3: '已激活',
				4: '停用'
			}
		};
	},
	created() {
		this.titleData = [{
			titleName: '全选',
			titleStyle: {
				width: '50px'
			}
		},
		{
			titleName: '操作',
			titleStyle: {
				width: '100px'
			}
		},
		{
			titleName: '姓名',
			dataName: 'name'
		},
		{
			titleName: '卡号',
		},
		{
			titleName: '卡类型'
		},
		{
			titleName: '绑定手机',
		},
		{
			titleName: '激活时间',
		},
		{
			titleName: '最后交易时间',
		},
		{
			titleName: '有效期',
		},
		{
			titleName: '当前状态',
		}
		];
		this.bannerStyle = {
			backgroundColor: '#F2F2F2',
			color: '#434149',
			fontSize: '16px'
		};
		this.contentStyle = {
			color: '#666666',
			fontSize: '14px'
		};
	},
	mounted() {
		this.userData = storage.session('userShop');
		if (this.userData.currentShop && this.userData.currentShop.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}
		let shopNumber = []; //门店编号
		let shopName = []; //店铺名字
		let shopList = []; //店铺列表
		if (this.isBrand) {
			//                shopList = this.userData.currentShop.direct.concat(this.userData.currentShop.franchise); //获取到品牌下面所有店铺信息
			shopList = storage.session('shopList'); //获取到品牌下面所有店铺信息
			for (let i in shopList) {
				let obj = {
					name: shopList[i].shopNumber + '-' + shopList[i].shopName,
					id: shopList[i].id
				};
				let shopobj = {
					name: shopList[i].shopName,
					id: shopList[i].id
				};
				shopName.push(obj);
				shopNumber.push(shopobj);
			}
		} else {
			shopList.push(this.userData.currentShop);
			let obj = {
				name: this.userData.currentShop.shopNumber + '-' + this.userData.currentShop.name,
				id: this.userData.currentShop.id
			};
			let shopobj = {
				name: this.userData.currentShop.name,
				id: this.userData.currentShop.id
			};
			shopName.push(obj);
			shopNumber.push(shopobj);
		}
		this.shopList = shopName;
		this.storesList = shopNumber;
		this.deShopList = shopList;
		this.getcardType(); //获取卡类型
		this.searchList();
		document.onclick = () => {
			this.cardLimit = false;
			this.shopLimit = false;
			this.cardstaLimit = false;
		};
		this.initBtn();
	},
	destroyed() {
		//离开页面时
		this.$store.commit('setPageTools', []);
	},
	methods: {
		initBtn() {
			let arr = [{
				name: '导出',
				className: 'userLabel',
				fn: () => {
					this.filterExport();
				}
			}, {
				name: '批量修改余额',
				className: 'userLabel',
				fn: () => {
					this.recharge();
				}
			}];
			this.$store.commit('setPageTools', arr);
		},
		//翻页组件返回
		pageChange(obj) {
			this.pageDetial.page = obj.page;
			this.pageDetial.num = obj.num;
			this.getList();
		},
		selectCard:function(i){
			this.cardhigh = this.cardList[i].name; //点击卡类型对应的名字
			this.cardId = this.cardList[i].id; //点击卡类型对应的id
		},
		getStartTime(receiveTime) { //选择开始时间
			this.startTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		getEndTime(receiveTime) { //选择结束时间
			this.endTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		//导出
		filterExport() {
			if (this.list.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '没有数据可以导出'
				});
				return false;
			}
			http.memberCardExportCardList({
				data: {
					format: 'csv',
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					cardTypeId: this.cardId, //选择卡类型
					subShopId: this.choicehopId, //选择门店编号
					page: this.pageDetial.page + 1, //请求的页数
					num: 10,
					number: this.number == '' ? '' : Number(this.number), //输入的卡号
					mobile: this.mobile, //输入的手机号码
					cardStatus: this.cardstaId //卡使用的状态
				}
			});
		},
		//批量修改余额弹窗
		recharge() {
			if (this.selectedList.length == 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择要修改的数据'
				});
				return false;
			}
			this.isRecharge = true;
		},
		//重置
		filterReset() {
			this.number = '';
			this.mobile = '';
			this.cardhigh = '选择卡类型'; //卡类型
			this.cardId = '';
			this.shophigh = '选择门店编号';
			this.storesId = '';
			this.cardstahigh = '全部';
			this.cardstaId = '';
			this.startTime = new Date().setHours(0, 0, 0, 0); //日期组件的开始时间
			this.endTime = new Date().setHours(23, 59, 59, 999); //日期组件的结束时间
			this.searchList();
			this.enpty();
		},
		//搜索
		searchList() {
			this.pageDetial.pageNum = '';
			this.pageDetial.page = 1;
			this.getList();
		},
		//查询获取列表 非详情
		async getList(isOk) {
			//let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			// if (this.endTime - this.startTime > timer) { //查询限制
			//     this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'时间间隔不能超过三个月'});
			//     return false;
			// }
			if (this.startTime > this.endTime) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择正确的时间进行筛选'
				});
				return false;
			}
			let re = /^1\d{10}$/; //手机号正则验证
			let rj = /^\d{8}$/; //卡号正则验证
			if (this.mobile != '' && !re.test(this.mobile)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '手机号码格式有误'
				});
				return false;
			}
			if (this.number != '' && !rj.test(this.number)) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '卡号必须是8位数字'
				});
				return false;
			}
			let res = await http.memberCardGetCardList({
				data: {
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					page: this.pageDetial.page, //请求的页数
					num: this.pageDetial.num, //请求的数据的条数
					cardTypeId: this.cardId, //选择卡类型
					subShopId: this.choicehopId, //选择门店编号
					number: this.number == '' ? '' : Number(this.number), //输入的卡号
					mobile: this.mobile, //输入的手机号码
					cardStatus: this.cardstaId //卡使用的状态
				}
			});
			if (res) {
				for (let i = 0; i < res.cardList.length; i++) {
					res.cardList[i].num = 1;
					if (this.selectedList.length == 0) {
						res.cardList[i].selected = false;
					} else {
						for (let j = 0; j < this.selectedList.length; j++) {
							if (this.selectedList[j].id == res.cardList[i].id) {
								res.cardList[i].selected = this.selectedList[j].selected;
								break;
							} else {
								res.cardList[i].selected = false;
							}
						}
					}
				}
				this.list = res.cardList; //将数据赋值
				if (isOk == 'ok') { //余额，手机号，积分更改的返回
					for (let i = 0; i < this.list.length; i++) {
						if (this.detaiList.id == this.list[i].id) {
							this.detaiList = this.list[i];
						}
					}
				}
				if (this.list.every(function(item) {
					return item.selected == true;
				})) {
					this.allselect = true;
				} else {
					this.allselect = false;
				}
				if (this.pageDetial.page == 1 && res.total) {
					this.pageDetial.pageNum = res.total; //卡查询的总页数的赋值
				}
				if (this.pageDetial.page == 1 && res.count) {
					this.count = res.count; //数据的总条数
				}
			}
		},
		//将选中的状态滞空
		enpty() {
			this.selectedList.splice(0, this.selectedList.length);
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].selected = false;
			}
			this.allselect = false;
		},
		//全选
		allSelectedOne() {
			if (this.allselect == true) {
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].selected = false;
					for (let j = 0; j < this.selectedList.length; j++) {
						if (this.selectedList[j].id == this.list[i].id) {
							this.selectedList.splice(j, 1);
						}
					}
				}
			} else {
				for (let i = 0; i < this.list.length; i++) {
					if (this.selectedList.length >= 50) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alter',
							content: '最多可选50条数据'
						});
						return false;
					}
					this.list[i].selected = true;
					if (JSON.stringify(this.selectedList).indexOf(JSON.stringify(this.list[i])) == -1) {
						this.selectedList.push(this.list[i]);
					}
				}
			}
			this.allselect = !this.allselect;
		},
		//单选
		ocSelOne(item) {
			if (this.selectedList.length >= 49) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '最多可选50条数据'
				});
				return false;
			}
			item.selected = !item.selected;
			if (item.selected) {
				this.selectedList.push(item);
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].selected != true) {
						return;
					}
				}
				this.allselect = true;
			} else {
				this.allselect = false;
				for (let j = 0; j < this.selectedList.length; j++) {
					if (this.selectedList[j].id == item.id) {
						this.selectedList.splice(j, 1);
					}
				}
			}
		},
		// 点击查看详情
		getDetail(item) {
			this.detailStatus = !this.detailStatus;
			//                if(this.detailStatus){
			//                    this.$store.commit('setPageTools',[])
			//                }
			this.detaiList = item;
			this.cardNumber = item.abbr + '-' + this.addPreZero(item.shopNumber, 4) + '-' + this.addPreZero(item.number, 8);
		},
		//补零的方法
		addPreZero(num, total) {
			let t = (num + '').length,
				s = '';
			for (let i = 0; i < total - t; i++) {
				s += '0';
			}
			return s + num;
		},
		//获取卡类型的名称
		getcardName(id) {
			let cardname;
			for (let i = 0; i < this.cardTypeList.length; i++) {
				if (id == this.cardTypeList[i].id) {
					cardname = this.cardTypeList[i].name;
				}
			}
			return cardname;
		},
		//把时间戳转化成***年**月**日
		transformTime(time) {
			return utils.format(new Date(Number(time) * 1000), 'yyyy-MM-dd hh:mm');
		},
		//获取有效期时间
		getValidity(num) {
			if (num == 0) {
				return '无限期';
			} else {
				return this.transFormDates(num);
			}
		},
		transFormDates(time) {
			time += '';
			if (time.length == 10) {
				time -= 0;
				time *= 1000;
			} else {
				time -= 0;
			}
			let date = new Date(time);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + ':' + this
				.changeFormat(date.getMinutes());
		},
		changeFormat(t) {
			t -= 0;
			if (t < 10) {
				return ('0' + t);
			} else {
				return (t + '');
			}
		},
		//获取当前的卡的状态
		getState(item) {
			let now = new Date().getTime() / 1000; //获取当前时间的毫秒数
			if ((item.startCardTime == 0 && now < item.createTime) || (item.startCardTime != 0 && now < item.startCardTime)) {
				return '未开始';
			}
			if ((item.startCardTime == 0 && now > item.createTime && item.endCardTime == 0 && item.status != 4) || (item.startCardTime != 0 && now >
					item.startCardTime && item.endCardTime != 0 && now < item.endCardTime && item.status != 4)) {
				return '使用中';
			}
			if (item.endCardTime != 0 && now > item.endCardTime) {
				return '已过期';
			}
			if(item.status == 4){
				return '已停用';
			}
		},
		//下拉框选择
		showhighList(type, e) {
			switch (type) {
				case 1:
					e.stopPropagation();
					this.cardLimit = !this.cardLimit;
					break;
				case 2:
					e.stopPropagation();
					this.shopLimit = !this.shopLimit;
					break;
				case 3:
					e.stopPropagation();
					this.cardstaLimit = !this.cardstaLimit;
					break;
			}
		},
		//获取到卡的类型列表
		async getcardType() {
			let res = await http.cardtypeGetList({
				data: {}
			});
			if (res) {
				this.cardTypeList = res; //获取卡类型的列表
				for (let i in this.cardTypeList) {
					let obj = {
						name: this.cardTypeList[i].name,
						id: this.cardTypeList[i].id
					};
					this.cardList.push(obj);
				}
			}
		},
		//选择卡类型
		costhighShow(index, type, e) {
			switch (type) {
				case 1:
					e.stopPropagation();
					this.cardhigh = this.cardList[index].name; //点击卡类型对应的名字
					this.cardId = this.cardList[index].id; //点击卡类型对应的id
					this.cardLimit = false;
					break;
				case 2:
					e.stopPropagation();
					this.shophigh = this.shopList[index].name; //点击卡类型对应的名字
					this.choicehopId = this.shopList[index].id; //点击卡类型对应的id
					this.shopLimit = false;
					break;
				case 3:
					e.stopPropagation();
					this.cardstahigh = this.cardstaList[index].name; //点击卡类型对应的名字
					this.cardstaId = this.cardstaList[index].id; //点击卡类型对应的id
					this.cardstaLimit = false;
					break;
			}
		},
		//子组件返回的事件
		getDetailShow(res) {
			this.detailStatus = res;
			this.getList();
			this.initBtn();
		},
		//批量修改弹窗返回的事件
		rechargeBack(res) {
			if (res == 'ok') {
				this.enpty();
				this.getList();
				this.isRecharge = false;
			} else {
				this.isRecharge = false;
			}
		}
	},
	components: {
		//详情
		cardDetail: () =>
			import ( /*webpackChunkName: 'card_queries_detail'*/ './card_queries_detail'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		//修改余额
		cardRecharge: () =>
			import ( /*webpackChunkName: 'card_queries_recharge'*/ './card_queries_recharge'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
	}
};
</script>
<style scoped lang="less">
#card-queries {
	min-width: 780px;
	.clAll {
		clear: both;
		height: 30px;
	}
	.activation {
		height: 40px;
		line-height: 40px;
		margin-right: 10px;
		font-size: 16px;
		color: #333;
	}
	.timeSearch {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 16px;
		/*至*/
		.data-center {
			float: left;
			width: 25px;
			line-height: 40px;
			text-align: center;
		}
		/*搜索图标*/
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
		.order-order-searchA:hover {
			background-color: #1878a5;
			transition: background-color ease-in-out 0.2s;
		}
		.order-order-searchA:active {
			background-color: #154961;
		}
		.order-order-search {
			background: url(../../res/images/search.png) center center no-repeat;
		}
		/*批量修改*/
		/*.modify{*/
		/*width: 150px;*/
		/*height: 40px;*/
		/*background: #2EA8DC;*/
		/*display: inline-block;*/
		/*text-align: center;*/
		/*line-height: 40px;*/
		/*color: #fff;*/
		/*border: 0;*/
		/*}*/
	}
	/*卡查询====================================*/
	.enquiries {
		width: 100%;
		height: 40px;
		line-height: 40px;
		.statisticsLists {
			border: 1px solid #cccccc;
			position: relative;
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			/*text-align: left;*/
			width: 200px;
			vertical-align: middle;
			/*float: left;*/
			display: inline-block;
			.tableListInp {
				.spanSty {
					height: 38px;
					width: 157px;
					float: left;
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				/*三角形-所有的边框线*/
				.calendar-ctr {
					width: 38px;
					height: 38px;
					position: relative;
					z-index: 5;
					border-left: #b3b3b3 solid 1px;
					i {
						height: 10px;
						width: 10px;
						position: absolute;
						top: 50%;
						left: 50%;
						margin-top: -5px;
						margin-left: -5px;
						border-top: 10px solid #b3b3b3;
						border-left: 5px solid transparent;
						border-right: 5px solid transparent;
						box-sizing: border-box;
					}
				}
			}
			ul {
				width: 100%;
				max-height: 250px;
				overflow: auto;
				margin: 0;
				position: absolute;
				top: 39px;
				left: 0;
				z-index: 10;
				background: #fff;
				li {
					width: 100%;
					white-space: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
					height: 41px;
					border: 1px #b3b3b3 solid;
					border-top: 0;
					background: #fff;
					cursor: pointer;
					&:hover {
						background: #f1f1f1;
					}
				}
			}
		}

		.numbering {
			width: 150px;
			height: 38px;
			border: 1px solid #B3B3B3;
			text-indent: 15px;
			/*float: left;*/
			display: inline-block;
			outline: none;
		}
		a {
			display: inline-block;
			width: 100px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			font-size: 16px;
			color: #fff;
			margin: 5px;
		}
		.line {
			display: inline-block;
			/*float: left;*/
			width: 14px;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
	}
	/*翻页================================*/
	.turn-page {
		margin: 10px 0 30px 0;
	}

	/*列表==============================*/
	.active {
		background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;
	}
}






/**/


/*#card-queries .list{*/


/*width: 100%;*/


/*min-height: 156px;*/


/*border: 1px solid #D2D2D2;*/


/*}*/


/*#card-queries .list .list_title{*/


/*width: 100%;*/


/*height: 45px;*/


/*line-height: 45px;*/


/*padding-left: 17px;*/


/*}*/


/*#card-queries .list .list_title span{*/


/*font-size: 16px;*/


/*color: #333;*/


/*font-weight: bold;*/


/*}*/


/*#card-queries .list .list_title span:first-child{*/


/*margin-right: 11px;*/


/*}*/


/*#card-queries .list .list_title span:nth-child(2){*/


/*display:inline-block;*/


/*width: 5px;*/


/*height: 5px;*/


/*border-radius: 50%;*/


/*background: #000;*/


/*margin-right: 11px;*/


/*vertical-align:middle;*/


/*}*/


/*#card-queries .list .list_title span:last-child a{*/


/*font-size: 16px;*/


/*color: #FF3C05;*/


/*}*/


/*#card-queries .list .heads{*/


/*width: 100%;*/


/*height: 41px;*/


/*background: #F2F2F2;*/


/*}*/


/*#card-queries .list .heads li{*/


/*float: left;*/


/*width: 10.5%;*/


/*text-align: center;*/


/*line-height: 41px;*/


/*font-size: 16px;*/


/*color: #43414A;*/


/*}*/


/*#card-queries .list .heads .future{*/


/*display: inline-block;*/


/*width: 28px;*/


/*height: 25px;*/


/*text-align: center;*/


/*line-height: 28px;*/


/*color: #00AAE5;*/


/*border-bottom:1px solid #00AAE5;*/


/*}*/


/*#card-queries .list .contents{*/


/*width: 100%;*/


/*height: 69px;*/


/*border-bottom: 1px solid #F7F7F7;*/


/*}*/


/*#card-queries .list .contents li{*/


/*float: left;*/


/*width: 10.5%;*/


/*height: 69px;*/


/*text-align: center;*/


/*line-height: 69px;*/


/*font-size: 14px;*/


/*color: #666;*/


/*overflow: hidden;*/


/*text-overflow: ellipsis;*/


/*white-space: nowrap;*/


/*}*/


/**/


/*#card-queries .list .contents .sty{*/


/*color: #00AAE5;*/


/*cursor: pointer;*/


/*}*/


/*#card-queries .list .noList{*/


/*width: 100%;*/


/*height: 68px;*/


/*text-align: center;*/


/*line-height: 68px;*/


/*font-size: 24px;*/


/*color: #E0E0E0;*/


/*}*/
</style>