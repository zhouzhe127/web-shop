<template>
	<!-- 详情 -->
	<div>
		<section id="card-detail" v-if="!isShow">
			<div class="information">
				<div class="title">
					<h3>会员信息</h3>
					<img class="img" @click='modifyMember' src='../../res/icon/iconchange.png' />
				</div>
				<div class="tabulation">
					<ul>
						<li>姓名: {{detaiList.name == ''?'--':detaiList.name}}</li>
						<li v-if="detaiList.mobile == ''">绑定手机: --
							<!-- <button @click="phone(1)">绑定手机号</button> -->
						</li>
						<li v-else>绑定手机: {{detaiList.mobile}}
							<!-- <button @click="phone(0)">更换手机号</button> -->
						</li>
						<li>卡余额:{{detaiList.cardAmount}}元
							<button @click="balance('0')" v-if="userData.currentShop.ischain!= '1'">余额操作</button>
						</li>
						<li>卡积分: {{detaiList.cardPoint}}分
							<button @click="balance('1')" v-if="userData.currentShop.ischain!= '1'">积分操作</button>
						</li>
					</ul>
					<ul>
						<li>卡号: {{detaiList.cardNumber}}</li>
						<li>激活时间: {{transformTime(detaiList.createTime)}}</li>
						<li>当前状态: {{getState(detaiList)}}</li>
						<li>卡性质:{{cardNature[detaiList.cardAttr]}}</li>
					</ul>
					<ul>
						<li>卡类型: {{getcardName(detaiList.cardTypeId)}}</li>
						<li v-if="detaiList.lastConsumeTime == '0'">最后交易时间: --</li>
						<li v-else>最后交易时间: {{transformTime(detaiList.lastConsumeTime)}}</li>
						<li>有效期: {{getValidity(detaiList.endCardTime)}}</li>
						<li>券包:
							<template v-if="couponList != ''">
								<span v-for="(item,index) in couponList" :key="index">
									{{item.name}}优惠券{{item.number}}张
									<template v-if="index != couponList.length -1">
										，
									</template>
								</span>
							</template>
							<span v-else>无</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 更改历史记录按钮 -->
			<div v-for="(item,index) in bannerList" class="diel" :class="{'on':bannerIndex == index}" @click="choiceType(item.type,index)" :key="index">{{item.name}}</div>
			<!-- 历史记录======================================-->
			<div v-if="bannerIndex == 0">
				<div class="content clearfix">
					<!--日期选择和搜索框-->
					<div class="date clearfix fl" style="margin-bottom:5px;">
						<section class="fl">
							<section style="position:relative;">
								<calendar :pObj="{time:detailStartTime}" @throwTime="getStartTime"></calendar>
							</section>
						</section>
						<span class="data-center">至</span>
						<section class="fl">
							<section>
								<calendar :pObj="{time:detailEndTime}" @throwTime="getEndTime"></calendar>
							</section>
						</section>
						<span class="order-order-searchA">
							<span v-on:click="screeningBtn()" class="order-order-search"></span>
						</span>
					</div>
					<div class="choise fl clearfix" style="margin-bottom:5px;">
						<!-- 选择操作门店 -->
						<section class="statisticsLists">
							<section @click="showhighList(4,$event)">
								<span class="spanSty">{{storeshigh}}</span>
								<div class="fl calendar-ctr">
									<i></i>
								</div>
							</section>
							<ul v-if="storesLimit">
								<li @click="costhighShow(index,4,$event)" v-for='(item,index) in shopList' :key="index">{{item.shopName}}</li>
							</ul>
						</section>
						<!-- 选择交易类型 -->
						<section class="statisticsLists">
							<section @click="showhighList(5,$event)">
								<span class="spanSty">{{trantypehigh}}</span>
								<div class="fl calendar-ctr">
									<i></i>
								</div>
							</section>
							<ul v-if="trantypeLimit">
								<li @click="costhighShow(index,5,$event)" v-for='(item,index) in trantypeList' :key="index">{{item.name}}</li>
							</ul>
						</section>
					</div>
					<div class="seachBox clearfix fl" style="margin-bottom:5px;">
						<a href="javascript:;" style="background: #2EA8DC;" @click="screeningBtn()">筛选</a>
						<a href="javascript:;" style="background: #B3B3B3;" @click="filterReset()">重置</a>
					</div>
				</div>
				<comTable :listName="'交易流水'" :titleData="titleData" :introData="consumeList" :allTotal="detailCount" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50" :listWidth="1300" :fixed="0">
					<span slot="con-0" slot-scope="props">{{detaiList.cardNumber}}</span>
					<span slot="con-1" slot-scope="props">{{getcardName(detaiList.cardTypeId)}}</span>
					<span slot="con-2" slot-scope="props">{{transformTime(props.data.createTime)}}</span>
					<span slot="con-3" slot-scope="props" @click="openOid(props.data.oid,props.data.belongToShop,props.data.fromId)">
						{{(props.data.oid == '' || props.data.oid == '0')?'--':props.data.oid}}</span>
					<span slot="con-4" slot-scope="props">{{getshopName(props.data.belongToShop)}}</span>
					<span slot="con-5" slot-scope="props">{{obj[props.data.type]}}</span>
					<span slot="con-6" slot-scope="props">{{(props.data.type == '4' || props.data.type == '9')?props.data.operatePoint:props.data.operateAmount}}</span>
					<span slot="con-8" slot-scope="props">{{getPaytype(props.data)}}</span>
					<div slot="con-9" slot-scope="props">
						<span v-if="props.data.fromId == '0'">
							{{userData.currentShop.name}}
						</span>
						<span v-else>{{isBrand?getshopName(props.data.fromId):userData.currentShop.name}}</span>
					</div>
				</comTable>
				<div class="pages">
					<pageElement @pageNum="getdetailPage" :page="Number(page)" :total="Number(detailTotalPage)" :isNoJump="true" :isNoPaging="true"></pageElement>
				</div>
			</div>
			<!--更改记录=====================================-->
			<template v-if="bannerIndex == 1">
				<comTable :listName="'更改记录'" :titleData="titleDataTwo" :introData="changeRecord" :allTotal="recordCount" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50" :fixed="0">
					<span slot="con-0" slot-scope="props">{{transformTime(props.data.createTime)}}</span>
					<span slot="con-1" slot-scope="props">{{operationName[props.data.type-10]}}</span>
					<span slot="con-2" slot-scope="props">{{judgeType(props.data)}}</span>
					<span slot="con-3" slot-scope="props">{{props.data.remark?props.data.remark:'--'}}</span>
					<span slot="con-4" slot-scope="props">{{props.data.staffName?props.data.staffName:'--'}}</span>
				</comTable>
				<div class="pages">
					<pageElement @pageNum="getRecordPage" :page="Number(recordpage)" :total="Number(recordTotalPage)" :isNoJump="true" :isNoPaging="true"></pageElement>
				</div>
			</template>
			<!-- 积分变动 -->
			<template v-if="bannerIndex == 2 || bannerIndex == 3">
				<com-table :listHeight='80' :listName="listName" :showTitle='1' :introData="listInfo.list" :titleData="titleList_j" :allTotal="count">
					<div slot="con-0" slot-scope="props">{{translateTime(props.data.createTime,'1')}}</div>
					<div slot="con-1" slot-scope="props">{{judgeTypes(props.data)}}</div>
					<div slot="con-2" slot-scope="props">{{obj[props.data.type]}}</div>
					<div slot="con-3" slot-scope="props">
						<span v-if='bannerIndex == 2'>{{props.data.point}}</span>
						<span v-if='bannerIndex == 3'>{{props.data.amount}}</span>
					</div>
				</com-table>
				<!-- 翻页 -->
				<section class="turn-page">
					<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
				</section>
			</template>
			<cardBalance v-if="isBalance" @throwWinResult="balanceBack" :userData="userData" :type="balanceType" :detaiList="detaiList"></cardBalance>
			<cardPhone v-if="isPhone" @throwWinResult="phoneBack" :type="phoneType" :detaiList="detaiList"></cardPhone>
			<!-- 修改会员信息的弹窗 -->
			<modify-member v-if='modifyStatus' @modifyBack='modifyBack' :detaiList='detaiList'></modify-member>
		</section>
		<section>
			<orderDetail :detail="detail" :isDelete="false" v-if="isShow" @detailShow="getDetailShow"></orderDetail>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			userData: Object,
			isBrand: false, //判断品牌			
			isShow: false, //是否显示订单详情
			detail: null, //传给订单详情的数据
			isBalance: false,
			balanceType: '',
			isPhone: false,
			phoneType: '',
			operationName: ['积分强制增加', '积分强制减少', '余额强制增加', '余额强制减少'],
			detailStartTime: new Date().setHours(0, 0, 0, 0) - 3 * 30 * 24 * 60 * 60 * 1000, //日期组件的开始时间
			detailEndTime: new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1000, //日期组件的结束时间
			storeshigh: '选择操作门店',
			cardTypeList: [], //卡类型数据的列表
			changeRecord: [], //更改记录的数据
			recordpage: 1, //页码数
			recordTotalPage: '', //总页数
			recordCount: '0', //历史更改记录的条数
			detailCount: '0', //详情列表的统计数据条数
			detailTotalPage: '', //详情列表的页数
			couponList: [], //优惠券列表
			consumeList: [], //卡查询的数据列表
			bannerList: [{
				name: '历史纪录',
				type: 0
			}, {
				name: '更改记录',
				type: 1
			}, {
				name: '积分变动',
				type: 2
			}, {
				name: '余额变动',
				type: 3
			}],
			bannerIndex: 0,
			storesLimit: false, //店铺下拉框显示
			trantypehigh: '全部',
			trantypeLimit: false, //交易类型
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
				name: '卡激活',
				id: 15
			}, {
				name: '积分消费',
				id: 9
			}, {
				name: '积分奖励',
				id: 4
			}],
			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null, //表格内容样式
			titleDataTwo: [],
			listName: '', //表名
			listInfo: {}, //类型
			titleList_j: [{
				titleName: '操作时间',
			},
			{
				titleName: '变动值'
			},
			{
				titleName: '原因'
			},
			{
				titleName: '变动后'
			},
			],
			count: '0', //记录条数
			page: 1, //页码
			total: 0,
			num: 10,
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
				'18': '评论获得积分',
				'23': '上海中信'
			},
			modifyStatus: false, //编辑会员信息的弹窗
			detaiList: '', //卡详情
			cardNature: {
				1: '通用',
				2: '直营店',
				3: '加盟店'
			},
			memberCardId: '', //卡号id
			shopList: [], //店铺总会
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
		this.userData = storage.session('userShop');
		if (this.userData.currentShop && this.userData.currentShop.ischain == 3) { //ischain状态为3 说明是品牌下面的店铺
			this.isBrand = true; //更改品牌店的状态
		} else {
			this.isBrand = false;
		}
		this.getShopList(); //获取店铺列表
		this.titleData = [{
			titleName: '卡号',
			titleStyle: {
				width: '170px'
			}
		},
		{
			titleName: '卡类型'
		},
		{
			titleName: '交易时间',
			titleStyle: {
				width: '150px'
			}
		},
		{
			titleName: '订单',
			titleStyle: {
				width: '180px'
			},
			conStyle: {
				color: '#00AAE5',
				cursor: 'pointer'
			}
		},
		{
			titleName: '卡属门店'
		},
		{
			titleName: '交易类型'
		},
		{
			titleName: '交易金额'
		},
		{
			titleName: '余额',
			dataName: 'amount'
		},
		{
			titleName: '支付类型',
		},
		{
			titleName: '操作来源',
		}
		];
		this.bannerStyle = {
			backgroundColor: '#F2F2F2',
			color: '#434149',
			fontSize: '16px'
		};
		this.contentStyle = {
			color: '#666',
			fontSize: '14px'
		};
		this.titleDataTwo = [{
			titleName: '操作时间'
		},
		{
			titleName: '操作类型'
		},
		{
			titleName: '操作金额'
		},
		{
			titleName: '备注'
		},
		{
			titleName: '操作人'
		},
		];
	},
	props: {
		cardNumber: String, //卡的id
	},
	async mounted() {
		this.getcardType();
		await this.getCradByCardNumber();
		this.getcardBag();
		this.getCardConsumeList(); //查看详情默认查询近三个月的数据		
		document.onclick = () => {
			this.storesLimit = false;
			this.trantypeLimit = false;
		};
		let arr = [{
			name: '返回',
			className: 'huiC',
			fn: () => {
				this.returnBack();
			}
		}];
		this.$store.commit('setPageTools', arr);
	},
	//        destroyed(){
	//            //离开页面时
	//            this.$store.commit('setPageTools',[])
	//        },
	methods: {
		getStartTime(receiveTime) { //选择开始时间
			this.detailStartTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		getEndTime(receiveTime) { //选择结束时间
			this.detailEndTime = (new Date(receiveTime)).getTime(); //毫秒
		},
		getdetailPage(obj) { //详情翻页
			this.page = obj.page;
			this.getCardConsumeList();
		},
		getRecordPage(obj) {
			this.recordpage = obj.page;
			this.getRecordList();
		},
		//返回
		returnBack() {
			this.$emit('throwWinResult', false); //抛出一个事件给父组件
			this.consumeList = '';
			this.detailCount = 0;
			this.detailTotalPage = '';
			this.bannerIndex = 0;
		},
		//跟换手机号弹窗
		phone(type) {
			this.phoneType = type;
			this.isPhone = true;
		},
		//积分余额操作弹窗
		balance(type) {
			this.balanceType = type;
			this.isBalance = true;
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
		transformTime(time) {
			return utils.format(new Date(Number(time) * 1000), 'yyyy-MM-dd hh:mm');
		},
		//获取当前的卡的状态
		// getState(item) {
		// 	let now = new Date().getTime() / 1000; //获取当前时间的毫秒数
		// 	if ((item.startCardTime == 0 && now < item.createTime) || (item.startCardTime != 0 && now < item.startCardTime)) {
		// 		return '未开始';
		// 	}
		// 	if ((item.startCardTime == 0 && now > item.createTime && item.endCardTime == 0) || (item.startCardTime != 0 && now >
		// 			item.startCardTime && item.endCardTime != 0 && now < item.endCardTime)) {
		// 		return '使用中';
		// 	}
		// 	if (item.endCardTime != 0 && now > item.endCardTime) {
		// 		return '已过期';
		// 	}
		// },
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
		// 切换类型(更改历史记录)
		choiceType(type, index) {
			this.bannerIndex = index;
			this.listName = this.bannerList[index].name;
			if (type == 1) {
				this.recordpage = 1;
				this.getRecordList();
			}
			if (type == 2 || type == 3) {
				this.page = 1;
				this.getRecordLists(); //积分变动 余额变动
			}
		},
		//获取更改记录
		async getRecordList() {
			let res = await http.getCardRecordList({
				data: {
					memberCardId: this.memberCardId, //卡的id
					page: this.recordpage,
					num: 10,
				}
			});
			if (res) {
				this.changeRecord = res.consumeList;
				if (this.recordpage == 1 && res.total) {
					this.recordTotalPage = res.total;
				}
				if (this.recordpage == 1 && res.count) {
					this.recordCount = res.count;
				}
			}
		},
		//详情查找
		screeningBtn() {
			this.detailTotalPage = '';
			this.page = 1;
			this.getCardConsumeList();
		},
		//交易查询 详情
		async getCardConsumeList() {
			let timer = 3 * 31 * 24 * 60 * 60 * 1000;
			if (this.detailEndTime - this.detailStartTime > timer) { //查询限制
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '时间间隔不能超过三个月'
				});
				return false;
			}
			if (this.detailStartTime > this.detailEndTime) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '请选择正确的时间进行筛选'
				});
				return false;
			}
			let res = await http.getCardConsumeList({
				data: {
					startTime: parseInt(this.detailStartTime / 1000), //开始时间
					endTime: parseInt(this.detailEndTime / 1000), //结束时间
					page: this.page, //请求的页数
					num: 10, //请求的数据的条数
					fromId: this.storesId, //操作门店门牌号
					belongToShop: this.detaiList.shopId, //卡属门店
					memberCardId: this.memberCardId, //关联卡的id
					consumeType: this.trantypeId, //交易类型
					memberType: 1
				}
			});
			if (res) {
				this.consumeList = res.consumeList;
				if (this.page == 1 && res.total) {
					this.detailTotalPage = res.total;
				}
				if (this.page == 1 && res.count) {
					this.detailCount = res.count;
				}
			}
		},
		//获取优惠券的卡包
		async getcardBag() {
			let res = await http.getCardCouponList({
				data: {
					memberCardId: this.memberCardId
				}
			});
			if (res) {
				for (let i = 0; i < res.length; i++) {
					res[i].num = 1;
				}
				this.couponList = this.parseArr(res); //统计相同名字的优惠券
			}
		},
		parseArr(arr) {
			let nameArr = [];
			let result = [];
			arr.forEach(function(item) {
				let i;
				if ((i = nameArr.indexOf(item.couponName)) > -1) {
					result[i].number = Number(result[i].number) + Number(item.num);
				} else {
					nameArr.push(item.couponName);
					result.push({
						name: item.couponName,
						number: item.num
					});
				}
			});
			return result;
		},
		//下拉框选择
		showhighList(type, e) {
			switch (type) {
				case 4:
					e.stopPropagation();
					this.storesLimit = !this.storesLimit;
					break;
				case 5:
					e.stopPropagation();
					this.trantypeLimit = !this.trantypeLimit;
					break;
			}
		},
		//选择卡类型
		costhighShow(index, type, e) {
			switch (type) {
				case 4:
					e.stopPropagation();
					this.storeshigh = this.shopList[index].shopName; //点击卡类型对应的名字
					this.storesId = this.shopList[index].id; //点击卡类型对应的id
					this.storesLimit = false;
					break;
				case 5:
					e.stopPropagation();
					this.trantypehigh = this.trantypeList[index].name; //点击卡类型对应的名字
					this.trantypeId = this.trantypeList[index].id; //点击卡类型对应的id
					this.trantypeLimit = false;
					break;
			}
		},
		//重置
		filterReset() {
			this.storeshigh = '选择操作门店';
			this.storesId = '';
			this.trantypehigh = '全部';
			this.trantypeId = '';
			this.detailStartTime = new Date().setHours(0, 0, 0, 0) - 3 * 30 * 24 * 60 * 60 * 1000; //日期组件的开始时间
			this.detailEndTime = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000 - 1000; //日期组件的结束时间
			this.screeningBtn();
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
		getPaytype(item) {
			if (item.type == '3' || item.type == '4' || item.type == '9' || item.type == '10' || item.type == '11' || item.type ==
				'12' || item.type == '13' || item.type == '14') {
				return '--';
			} else if (item.type == '1') {
				if (item.memberType == '0') {
					return '会员卡支付';
				} else if (item.type == '1') {
					return '卡支付';
				}
			} else if (item.payType == '1') {
				return '现金';
			} else if (item.payType == '2') {
				return '银行卡';
			} else if (item.payType == '3') {
				return '微信';
			} else if (item.payType == '4') {
				return '支付宝';
			} else if (item.payType == '6') {
				return '中信微信';
			} else if (item.payType == '7') {
				return '中信支付宝';
			} else if (item.payType == '6') {
				return '卡支付';
			}
		},
		judgeType(item) {
			// 判断操作类型 是否加还是减
			let operate;
			if (item.type == '10' || item.type == '12') {
				operate = '+';
			} else {
				operate = '-';
			}
			if (item.type == '10' || item.type == '11') {
				return operate + item.operatePoint;
			} else if (item.type == '12' || item.type == '13') {
				return operate + item.operateAmount;
			}
		},
		//余额积分弹窗返回
		balanceBack(res) {
			if (res == 'ok') {
				//this.$emit('throwWinResult', res); //抛出一个事件给父组件
				this.isBalance = false;
				this.getCradByCardNumber();
				this.getCardConsumeList();
			} else {
				this.isBalance = false;
			}
		},
		//更换手机号返回的数据
		phoneBack(res) {
			if (res == 'ok') {
				this.$emit('throwWinResult', res); //抛出一个事件给父组件
				this.isPhone = false;
				this.getCardConsumeList();
			} else {
				this.isPhone = false;
			}
		},
		//去订单详情页
		async openOid(oid, belongToShop, fromId) {
			if (oid == '' || oid == '0') {
				return;
			}
			let res = await http.OrderstatisticsBillDelite({
				data: {
					shopId: this.isBrand == true ? fromId : belongToShop,
					oid: oid
				}
			});
			if (res) {
				res.oidDetial = 'queries'; //自定义商品统计特有标记
				this.detail = res;
				if (this.isBrand) {
					this.detail.fromId = fromId;
				}
			}
			this.isShow = true;
		},
		//接受订单详情传递回来的事件
		getDetailShow() {
			this.isShow = false;
			let arr = [{
				name: '返回',
				className: 'huiC',
				fn: () => {
					this.returnBack();
				}
			}];
			this.$store.commit('setPageTools', arr);
		},
		pageChange(obj) { //翻页
			this.page = obj.page;
			this.num = obj.num;
			this.getRecordLists();
		},
		async getRecordLists() {
			let data = await http.getRecordList({
				data: {
					page: this.page,
					mid: this.memberCardId,
					num: this.num,
					type: this.bannerIndex,
					isCard: 1
				}
			});
			this.listInfo = data;
			this.count = (this.page == 1) ? data.count : this.count;
			this.total = (this.page == 1) ? data.total : this.total;
		},
		translateTime: function(time, type) {
			//转换时间
			if (type) {
				return utils.format(time, 'yyyy-MM-dd hh:mm:ss');
			} else {
				return utils.format(time, 'yyyy-MM-dd');
			}
		},
		judgeTypes: function(item) {
			// 判断操作类型 是否加还是减
			let operate;
			if (item.type == '1' || item.type == '3' || item.type == '6' || item.type == '9' || item.type == '11' || item.type ==
				'13') {
				operate = '-';
			} else {
				operate = '+';
			}

			if (item.type == '3' || item.type == '4' || item.type == '5' || item.type == '8' || item.type == '9' || item.type ==
				'10' || item.type == '11') {
				return operate + item.operatePoint;
			} else {
				if (item.type == '1' || item.type == '6') {
					return operate + (Number(item.operateAmount) + Number(item.operateGiftAmount));
				} else if(item.type == '2') {
					return operate + (parseInt(Number(item.operateGiftAmount)*100) + parseInt(Number(item.rechargeAmount)*100))/100;
				}else{
					return operate + (parseInt(Number(item.operateGiftAmount)*100) + parseInt(Number(item.operateGiftAmount)*100))/100;
				}
			}
		},
		modifyMember: function() { //打开编辑会员信息的弹窗
			this.modifyStatus = true;
		},
		modifyBack: function() { //编辑会员信息回调
			this.getCradByCardNumber();
			this.modifyStatus = false;
		},
		async getCradByCardNumber() {
			let data = await http.getCradByCardNumber({
				data: {
					abbr: this.cardNumber.split('-')[0],
					shopNumber: this.cardNumber.split('-')[1],
					number: this.cardNumber.split('-')[2],
					checkApplyShop: -1
				}
			});
			if (data) {
				this.detaiList = data;
				this.memberCardId = data.id;
			}
		},
		//获取到卡的类型列表
		async getcardType() {
			let res = await http.cardtypeGetList({
				data: {}
			});
			if (res) {
				this.cardTypeList = res; //获取卡类型的列表
			}
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
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		//余额积分弹窗
		cardBalance: () =>
			import ( /*webpackChunkName: 'card_queries_balance'*/ './card_queries_balance'),
		//更换手机号弹窗
		cardPhone: () =>
			import ( /*webpackChunkName: 'card_queries_balance'*/ './card_queries_phone'),
		//订单详情
		orderDetail: () =>
			import ( /*webpackChunkName: 'delete_detail'*/ '../statistics/delete_detail'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		'modify-member': () =>
			import ( /*webpackChunkName:'entity_card_editing'*/ './entity_card_editing'),
	}
};
</script>
<style scoped lang="less">
#card-detail {
	/*.return {*/
	/*width: 100%;*/
	/*position: absolute;*/
	/*top: 10px;*/
	/*right: 200px;*/
	/*a {*/
	/*display: block;*/
	/*width: 100px;*/
	/*border: 1px solid #B3B3B3;*/
	/*height: 38px;*/
	/*text-align: center;*/
	/*line-height: 38px;*/
	/*font-size: 16px;*/
	/*color: #B3B3B3;*/
	/*float: right;*/
	/*}*/
	/*}*/
	.clearfix::before,
	.clearfix::after {
		display: table;
		content: “”;
	}
	.clearfix::after {
		clear: both;
	}
	.information {
		width: 100%;
		height: 212px;
		border: 1px solid #B3B3B3;
		margin-bottom: 18px;
		.title {
			width: 100%;
			height: 41px;
			background: #E6E6E6;
			padding-left: 10px;
			line-height: 41px;
			h3 {
				width: 80px;
				line-height: 40px;
				color: #43414A;
				font-size: 16px;
				float: left;
			}
			img {
				display: inline-block;
				float: left;
				padding-top: 10px;
			}
		}
		.tabulation {
			width: 100%;
			height: auto;
			padding-left: 10px;
			ul {
				width: 100%;
				height: 57px;
				li {
					width: 25%;
					float: left;
					text-align: left;
					line-height: 57px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					button {
						display: inline-block;
						width: 75px;
						height: 38px;
						border: none;
						background: #2EA8DC;
						text-align: center;
						line-height: 38px;
						border-radius: 5px;
						color: #fff;
						margin-left: 5px;
					}
					&:nth-child(1) {
						width: 20%;
					}
					&:nth-child(2) {
						width: 30%;
					}
				}
			}
		}
	}
	.diel {
		display: inline-block;
		width: 136px;
		height: 40px;
		font-size: 16px;
		background: #FFF;
		border: 1px solid #E9C048;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		color: #F8931F;
		margin-bottom: 20px;
	}
	.on {
		background: #F8931F;
		color: #fff;
	}
	/*日期组件*/
	.content {
		width: 100%;
		.date {
			.data-center {
				float: left;
				width: 25px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
			.order-order-searchA,
			.order-order-search {
				float: left;
				width: 40px;
				height: 40px;
				background-color: #29A7E1;
				cursor: pointer;
				margin-right: 15px;
			}
			.order-order-search {
				background: url(../../res/images/search.png) center center no-repeat;
			}
			.order-order-searchA:hover {
				background-color: #1878a5;
				transition: background-color ease-in-out 0.2s;
			}
			.order-order-searchA:active {
				background-color: #154961;
			}
		}
		/*下拉列表*/
		.choise {
			float: left;
			.statisticsLists {
				margin-right: 10px;
				border: 1px solid #cccccc;
				position: relative;
				height: 40px;
				line-height: 40px;
				font-size: 16px;
				text-align: left;
				width: 200px;
				vertical-align: middle;
				float: left;
				.spanSty {
					height: 38px;
					width: 157px;
					float: left;
					text-align: center;
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
				ul {
					width: 100%;
					max-height: 205px;
					overflow: auto;
					margin: 0;
					position: absolute;
					top: 40px;
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
		}
		a {
			width: 100px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			font-size: 16px;
			color: #fff;
			float: left;
			margin-left: 15px;
		}
	}
	/*!*列表==========*!*/
	/*.list {*/
	/*width: 100%;*/
	/*min-height: 156px;*/
	/*border: 1px solid #D2D2D2;*/
	/*.list_title {*/
	/*width: 100%;*/
	/*height: 45px;*/
	/*line-height: 45px;*/
	/*padding-left: 17px;*/
	/*span {*/
	/*font-size: 16px;*/
	/*color: #333;*/
	/*font-weight: bold;*/
	/*&:first-child {*/
	/*margin-right: 11px;*/
	/*}*/
	/*&:nth-child(2) {*/
	/*display: inline-block;*/
	/*width: 5px;*/
	/*height: 5px;*/
	/*border-radius: 50%;*/
	/*background: #000;*/
	/*margin-right: 11px;*/
	/*vertical-align: middle;*/
	/*}*/
	/*&:last-child a {*/
	/*font-size: 16px;*/
	/*color: #FF3C05;*/
	/*}*/
	/*}*/
	/*}*/
	/*.heads {*/
	/*width: 100%;*/
	/*height: 41px;*/
	/*background: #F2F2F2;*/
	/*li {*/
	/*float: left;*/
	/*width: 10.5%;*/
	/*text-align: center;*/
	/*line-height: 41px;*/
	/*font-size: 16px;*/
	/*color: #43414A;*/
	/*}*/
	/*.future {*/
	/*display: inline-block;*/
	/*width: 28px;*/
	/*height: 25px;*/
	/*text-align: center;*/
	/*line-height: 28px;*/
	/*color: #00AAE5;*/
	/*border-bottom: 1px solid #00AAE5;*/
	/*}*/
	/*}*/
	/*.contents {*/
	/*width: 100%;*/
	/*height: 69px;*/
	/*border-bottom: 1px solid #F7F7F7;*/
	/*li {*/
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
	/*.sty {*/
	/*color: #00AAE5;*/
	/*cursor: pointer;*/
	/*}*/
	/*}*/
	/*}*/
	/*.noList {*/
	/*width: 100%;*/
	/*height: 68px;*/
	/*text-align: center;*/
	/*line-height: 68px;*/
	/*font-size: 24px;*/
	/*color: #E0E0E0;*/
	/*}*/
	/*分页==================================*/
	.pages {
		margin: 10px 0 30px 0;
	}
}

@media screen and (min-width:1024px) and (max-width:1440px) {
	#card-detail .content[data-v-0b83c0f2] {
		// width: 1124px;
	}
	#card-detail .content a {
		width: 60px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		float: left;
		margin-left: 12px;
	}
	#card-detail .content a:nth-child(1) {
		margin-left: 0;
	}
	.seachBox.clearfix.fl {
		clear: both;
	}
}
</style>