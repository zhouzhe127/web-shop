<template>
	<div id="mangement">
		<section v-if="!showDetail">
			<div class="filter clearfix">
				<!-- 选择门店 -->
				<section class="fl times">
					<span>门店</span>
					<!--下拉框组件-->
					<select-btn :name='selectShopname' :sorts="shopList.map(v=>v.name)" :width="157" @selOn="selectShop"></select-btn>
				</section>
				<!-- 手机号 -->
				<section class="fl times">
					<span>手机号</span>
					<input type="text" class="inp" v-model="phone" placeholder="请输入手机号码" maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')" />
				</section>
				<!-- 选择门店 -->
				<section class="fl times">
					<span>会员等级</span>
					<!--下拉框组件-->
					<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
				</section>
				<!-- 选择性别 -->
				<section class="fl times">
					<span>性别</span>
					<!--下拉框组件-->
					<select-btn :name='genderName' :sorts="genderList.map(v=>v.name)" :width="157" @selOn="selegender"></select-btn>
				</section>
			</div>
			<div class="filter clearfix" style="position: relative;">
				<!-- 年龄区间 -->
				<section class="fl times">
					<span class="fl" style="line-height:40px;">年龄</span>
					<section class="fl">
						<input type="text" class="cumulative" placeholder="请输入年龄" maxlength="3" v-model="agestart" onkeyup="value=value.replace(/[^\d]/g,'')" />
						<span class="age">岁</span>
					</section>
					<span class="fl hline">-</span>
					<section class="fl">
						<input type="text" class="cumulative" placeholder="请输入年龄" maxlength="3" v-model="agend" onkeyup="value=value.replace(/[^\d]/g,'')" />
						<span class="age">岁</span>
					</section>
				</section>
				<!-- 筛选 -->
				<section class="fr times">
					<a href="javascript:void(0);" class="blue fl" @click="searchMember">筛选</a>
					<a href="javascript:void(0);" class="gray fl" @click='resetFun'>重置</a>
					<a href="javascript:void(0);" class="yellow fl" style="width: 150px;" @click='advanced'>高级筛选</a>
					<div class="screening" v-if='showScreen'>
						<div class="arrow"></div>
						<div class="screenTop">
							<div class="verticalBar"></div>
						</div>
						<div class="container">
							<member-screen @selectVip='selectVipEvent'></member-screen>
						</div>
					</div>
				</section>
			</div>
			<section style="padding:0 2.5%;">
				<com-table :listHeight='80' :listWidth="1600" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'会员管理'" :key="index" :showTitle='1' :allTotal="count" :widthType='true'>
					<div class="list_title_l fl" slot="title-0">
						<span @click="allSelectedOne" style="cursor:pointer;">全选</span>
						<span></span>
						<span>已选
								<a href="javascript:;">{{selectedList.length}}</a>人</span>
					</div>
					<div slot="con-0" slot-scope="props" class="circle">
						<span :class="{ 'actives': props.data.selected}" @click="ocSelOne(props.data)">
					</span>
					</div>
					<div slot="con-1" slot-scope="props" @click="getDetail(props.data)">
						查看详情
					</div>
					<div slot="con-2" slot-scope="props">
						{{formatTime(props.data.createTime)}}
					</div>
					<div slot="con-5" slot-scope="props">
						{{gender[props.data.gender]}}
					</div>
					<div slot="con-8" slot-scope="props" class="shopName">
						{{getLevelname(props.data.levelId)}}
					</div>
					<div slot="con-9" slot-scope="props" class="shopName">
						{{getShopname(props.data.shopId)}}
					</div>
				</com-table>
				<section class="turn-page">
					<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
				</section>
			</section>
			<!-- 选择活动的弹窗 -->
			<addActivity v-if='showin' @winEvent='getResult' :selectedList='selectedList'></addActivity>
		</section>
		<!-- 会员信息详情 -->
		<memberDetail v-else :mid='mid' :shopsId='shopsId' @throwWinResult="getDetailback"></memberDetail>
	</div>
</template>
<script>
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
export default {
	data: function() {
		return {
			ischain: '', //单店or品牌
			page: 1,
			num: 10,
			count: null,
			total: null,
			startTime: new Date().setHours(0, 0, 0, 0), //开始时间
			endTime: new Date().setHours(23, 59, 59, 999), //结束时间
			shopList: [], //品牌下门店的集合
			selectShopname: '全部', //选中的门店的名称
			selectShopid: 0, //选中的门店的id 
			genderList: [{
				name: '未知',
				id: 0
			}, {
				name: '男',
				id: 1
			}, {
				name: '女',
				id: 2
			}], //性别列表
			genderName: '全部',
			genderId: -1, //性别选中的
			expirationTimeList: [], //会员等级
			expirationTimeId: 0, //会员等级选中的
			expirationTime: '全部', //状态
			phone: '', //手机号码	
			showScreen: false, //显示高级搜索的框	
			agestart: '', //开始年龄
			agend: '', //结束年龄	
			index: '',
			shoptitleList: [{
				titleName: '全选',
			}, {
				titleName: '操作',
				conStyle: {
					color: '#27a8e0',
					cursor: 'pointer'
				}
			},
			{
				titleName: '注册时间 ',
				dataName: 'createTime'
			},
			{
				titleName: '手机号码',
				dataName: 'mobile'
			},
			{
				titleName: '会员姓名',
				dataName: 'name'
			},
			{
				titleName: '性别'
			},
			{
				titleName: '年龄',
				dataName: 'age'
			},
			{
				titleName: '生日',
				dataName: 'birthday'
			},
			{
				titleName: '会员等级',
				dataName: 'levelName'
			}
			],
			formList: [], //列表
			condition: {}, //筛选条件
			chooseData: {}, //高级筛选里面的条件
			gender: {
				0: '未知',
				1: '男',
				2: '女'
			},
			selectedList: [], //选中的数组
			allselect: false, //全选的状态
			showin: false, //打开新增活动的弹窗
			showDetail: false, //查看详情
			mid: '',
			shopsId: ''
		};
	},
	methods: {
		startTimeChange(time) { //开始时间
			this.startTime = time;
		},
		endTimeChange(time) { //结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		selectShop: function(i) { //选择门店
			this.selectShopname = this.shopList[i].name; //点击门店对应的名字
			this.selectShopid = this.shopList[i].id; //点击门店对应的id			
		},
		selegender: function(i) { //选择性别的方法
			this.genderName = this.genderList[i].name; //点击门店对应的名字
			this.genderId = this.genderList[i].id; //点击门店对应的id	
		},
		selexpirationTime: function(i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		advanced: function() { //高级搜索弹框的显示
			this.showScreen = !this.showScreen;
		},
		async getMemberList() {
			// 获取所有会员等级
			let data = await http.memberGetList({});
			this.expirationTimeList = utils.deepCopy(data);
		},
		searchMember: function() { //点击筛选
			this.page = 1;
			this.getShopMemberList();
		},
		selectVipEvent(obj) { //高级筛选的回调
			if (obj.status == 'ok') {
				this.chooseData = obj.chooseData;
				this.getShopMemberList();
			}
			this.advanced();
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			//this.allselect = !this.allselect;
			this.getShopMemberList();
		},
		valiData(content, title, winType) { //弹窗格式化
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		checkForm: function() {
			this.condition = {};
			// if (this.startTime - this.endTime > 0) {
			// 	this.valiData('时间格式选择错误!');
			// 	return false;
			// }
			if ((this.agestart == '' && this.agend != '') || (this.agestart != '' && this.agend == '')) {
				this.valiData('请完善年龄区间的信息!');
				return false;
			}
			if (this.agestart != '' && this.agend != '') { //年龄的开始和结束
				let obj = {
					start: this.agestart,
					end: this.agend
				};
				this.condition.age = obj;
			}
			if (this.phone != '') {
				this.condition.mobile = this.phone; //手机号码
			}
			if (this.expirationTimeId != 0) { //会员等级管理选中的
				this.condition.levelId = this.expirationTimeId;
			}
			if (this.selectShopid != 0) {
				this.condition.shopId = this.selectShopid; //选择门店的id
			}
			// let obj = {
			// 	start: parseInt(this.startTime / 1000),
			// 	end: parseInt(this.endTime / 1000)
			// };
			// this.condition.createTime = obj; //开始时间和结束时间
			if (this.genderId != -1) {
				this.condition.gender = this.genderId; //性别
			}
			return true;
		},
		async getShopMemberList() {
			if (!this.checkForm()) return;
			this.condition = Object.assign(this.condition, this.chooseData);
			let data = await http.getShopMemberList({
				data: {
					page: this.page,
					num: this.num,
					condition: this.condition
				}
			});
			if (data) {
				//判断哪些数据是之前选中过的 选中过的加上标识
				for (let item of data.memberList) {
					if (this.selectedList.length == 0) {
						item.selected = false;
					} else {
						for (let int of this.selectedList) {
							if (int.memberId == item.memberId) {
								item.selected = int.selected;
								break;
							} else {
								item.selected = false;
							}
						}
					}
					this.allselect = true;
					if (!item.selected) {
						this.allselect = false;
					}
				}
				this.formList = data.memberList; //会员列表数据
				if (this.page == 1) {
					this.count = data.count; //总条数
					this.total = data.total;
				}
			}
		},
		formatTime(time) { //日期格式化
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		getDetail(item) { //点击查看详情
			//storage.session('memberObj', item);
			this.showDetail = true;
			this.mid = item.memberId;
			this.shopsId = item.shopId;
			// let dates = new Date(this.start);
			// dates.setHours(dates.getHours() - 8); //初始值为8:00 减去8小时
			// let start = Math.round(dates.getTime() / 1000); //开始时间
			// let time = new Date(this.end);
			// time.setHours(time.getHours() + 15); //初始值为8:00 加上15个小时
			// time.setMinutes(time.getMinutes() + 59); //出事职位0:00 加上59分钟
			// time.setSeconds(time.getSeconds() + 59); //初始值为0:00 加上59秒
			// let end = Math.round(time.getTime() / 1000); //结束时间

			// if (this.brandId == '3') {
			// 	storage.session('member_serach_time', {
			// 		start,
			// 		end
			// 	});
			// } else {
			// 	storage.session('member_serach_time', {
			// 		start: this.fromDate,
			// 		end: this.toDate
			// 	});
			// }
			//this.$router.push('/admin/memberManagement/detail');
		},
		getLevelname: function(levelId) {
			let levelname = '--';
			for (let item of this.expirationTimeList) {
				if (item.id == levelId) {
					levelname = item.name;
					break;
				}
			}
			return levelname;
		},
		getShopname: function(shopId) {
			let shopName = '--';
			for (let item of this.shopList) {
				if (item.id == shopId) {
					shopName = item.name;
					break;
				}
			}
			return shopName;
		},
		//单选
		ocSelOne: function(item) {
			item.selected = !item.selected;
			if (item.selected) {
				this.selectedList.push(item);
				for (let i = 0; i < this.formList.length; i++) {
					if (this.formList[i].selected != true) {
						return;
					}
				}
				this.allselect = true;
			} else {
				this.allselect = false;
				for (let j = 0; j < this.selectedList.length; j++) {
					if (this.selectedList[j].memberId == item.memberId) {
						this.selectedList.splice(j, 1);
					}
				}
			}
		},
		//全选
		allSelectedOne: function() {
			if (this.allselect == true) {
				for (let i = 0; i < this.formList.length; i++) {
					this.formList[i].selected = false;
					for (let j = 0; j < this.selectedList.length; j++) {
						if (this.selectedList[j].memberId == this.formList[i].memberId) {
							this.selectedList.splice(j, 1);
						}
					}
				}
			} else {
				for (let i = 0; i < this.formList.length; i++) {
					// if (this.selectedList.length >= 50) {
					// 	this.$store.commit('setWin', {
					// 		title: '温馨提示',
					// 		winType: 'alter',
					// 		content: '最多可选50条数据'
					// 	});
					// 	return false;
					// }
					this.formList[i].selected = true;
					if (JSON.stringify(this.selectedList).indexOf(JSON.stringify(this.formList[i])) == -1) {
						this.selectedList.push(this.formList[i]);
					}
				}
			}
			this.allselect = !this.allselect;
		},
		launchEvent: function() {
			if (this.selectedList.length == 0) {
				this.valiData('请选择会员!');
				return false;
			}
			this.showin = !this.showin; //打开新增活动的弹窗
		},
		getResult: function() {
			this.showin = false;
		},
		resetFun: function() { //重置
			this.page = 1;
			this.selectShopname = '全部';
			this.selectShopid = 0;
			this.phone = '';
			this.genderName = '全部';
			this.genderId = -1;
			this.expirationTimeId = 0;
			this.expirationTime = '全部';
			this.agestart = '';
			this.agend = '';
			this.chooseData = {};
			this.getShopMemberList();
		},
		async newMemberexport() {
			if (!this.checkForm()) return;
			this.condition = Object.assign(this.condition, this.chooseData);
			await http.newMemberexport({
				data: {
					condition: this.condition
				}
			});
		},
		getDetailback: function(res) { //从详情返回
			this.showDetail = res;
			this.searchMember();
			this.$store.commit('setPageTools', [{
				name: '导出',
				className: ['fd-blue'],
				fn: () => {
					this.newMemberexport();
				}
			}, {
				name: '发布活动',
				className: ['fd-blue'],
				fn: () => {
					this.launchEvent();
				}
			}]);
		}
	},
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		for (let item of this.shoptitleList) {
			Object.assign(item, obj1);
		}
	},
	components: {
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		'member-screen': () =>
			import ( /* webpackChunkName:'new_member_screen' */ './new_member_screen'),
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		PageElement: () =>
			import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		addActivity: () =>
			import ( /*webpackChunkName: 'new_member_chooseAct'*/ './new_member_chooseAct'),
		memberDetail: () =>
			import ( /*webpackChunkName: 'member_manage_detail'*/ './member_manage_detail'),
	},
	mounted: function() {
		this.$store.commit('setPageTools', [{
			name: '导出',
			className: ['fd-blue'],
			fn: () => {
				this.newMemberexport();
			}
		}, {
			name: '发布活动',
			className: ['fd-blue'],
			fn: () => {
				this.launchEvent();
			}
		}]);
		this.userShop = storage.session('userShop');
		this.ischain = this.userShop.currentShop.ischain;
		this.shopList = storage.session('shopList'); //获取品牌下面的店铺列表
		let obj = {
			id: this.userShop.currentShop.id,
			shopName: this.userShop.currentShop.name
		};
		this.shopList.push(obj);
		this.shopList.forEach(function(item) {
			item.name = item.shopName;
		});
		this.getMemberList(); //获取会员等级
		this.searchMember();
	}
};
</script>
<style scoped>
#mangement {
	width: 100%;
	height: auto;
}

#mangement .filter .times {
	margin-bottom: 20px;
	margin-right: 10px;
}

#mangement .filter .times span {
	font-size: 16px;
	margin: 0 9px 0 12px;
}

#mangement .filter .times .input-box {
	display: inline-block;
	vertical-align: middle;
}

#mangement .filter .times .inp {
	width: 210px;
	height: 40px;
	text-indent: 15px;
}

#mangement .filter .times a {
	height: 40px;
	line-height: 40px;
	width: 100px;
	margin-right: 10px;
}

#mangement .filter .times .hline {
	display: block;
	height: 38px;
	line-height: 38px;
	margin: 0 10px;
}

#mangement .filter .times section {
	height: 40px;
	border: 1px solid #CECDCD;
	float: left;
}

#mangement .filter .times section .age {
	display: block;
	float: left;
	width: 38px;
	height: 38px;
	font-size: 16px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #CECDCD;
	margin: 0;
}

#mangement .filter .times .cumulative {
	width: 100px;
	height: 38px;
	/* border: 1px solid #ccc; */
	float: left;
	outline: none;
	text-indent: 17px;
	border: none;
}

#mangement .screening {
	width: 97%;
	min-height: 470px;
	position: absolute;
	top: 65px;
	right: 30px;
	border: 1px solid #D2D2D2;
	background: #fff;
	z-index: 99;
}

#mangement .screening .screenTop {
	width: 100%;
	height: 50px;
	background: #E6E6E6;
}

#mangement .screening .screenTop .verticalBar {
	width: 4px;
	height: 100%;
	float: left;
	background-color: #FE982E;
}

#mangement .screening .container {
	padding-left: 15px;
}

#mangement .list_title_l {
	width: 100%;
}

#mangement .list_title_l span {
	font-size: 16px;
	color: #2EA8DC;
}

#mangement .list_title_l span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #2EA8DC;
	margin: 0 5px;
	vertical-align: middle;
}

#mangement .list_title_l span:last-child a {
	font-size: 16px;
	color: #2EA8DC;
}

#mangement .circle {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

#mangement .circle span {
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 12.5px;
	border: 1px solid #919191;
}

#mangement .shopName {
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.actives {
	background: url('../../res/icon/selected.png') center center no-repeat, #28A8E0;
}

.arrow {
	width: 0px;
	height: 0px;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 10px solid #E6E6E6;
	position: absolute;
	margin-left: 95%;
	margin-top: -10px;
}
</style>