<template>
	<section>
		<div class="member-manage" id="manage">
			<template v-if="brandId == '3'">
				<!--品牌操作-->
				<div class="tableListInp">
					<input type="text" placeholder="选择门店" class="input-style" v-model="shopNameOn" readonly="readonly" style="width: 95px;" @click="selectOn('1')" />
					<div class="fr" @click="selectOn('1')">
						<i></i>
					</div>
					<ul v-if='shopList.length' style='max-height: 452px;overflow: auto;'>
						<li v-for="(item,index) in shopList" :key='index' @click="setOptions('1',item)">{{item.shopName}}</li>
					</ul>
				</div>
				<div class="tableListInp">
					<input type="text" placeholder="选择性别" class="input-style" v-model="sexOn" readonly="readonly" style="width: 95px;" @click="selectOn('2')" />
					<div class="fr" @click="selectOn('2')">
						<i></i>
					</div>
					<ul>
						<li v-for="(item,index) in sexType" :key='index' @click="setOptions('2',item)">{{item.name}}</li>
					</ul>
				</div>
				<div class="tableListInp">
					<input type="text" placeholder="选择会员等级" class="input-style" v-model="memberOn" readonly="readonly" style="width: 95px;" @click="selectOn('3')" />
					<div class="fr" @click="selectOn('3')">
						<i></i>
					</div>
					<ul>
						<li v-for="(item,index) in memberList" :key='index' @click="setOptions('3',item)">{{item.name}}</li>
					</ul>
				</div>
				<div class="tableListInp" style="width: 235px;border: none;">
					<input type="text" placeholder="输入年龄" class="input-style fl" v-model="fromAges" style="width: 80px;border: 1px solid #b3b3b3;box-sizing: border-box;" maxlength="3" />
					<span class="fl" style="display: block;width: 50px;height: 45px;line-height: 45px;text-align: center;color: #CCCCCC;">---</span>
					<input type="text" placeholder="输入年龄" class="input-style fl" v-model="toAges" style="width: 80px;border: 1px solid #b3b3b3;box-sizing: border-box" maxlength="3" />
				</div>
				<div class="tableListInp">
					<input type="text" placeholder="输入手机号码" class="input-style" v-model="mobiles" style="width: 135px;" maxlength="11" />
				</div>
				<div style="width: 220px; height: 45px;border: 1px solid #b3b3b3;text-align: center;box-sizing: border-box;margin-right: 30px;" class="fl">
					<div style="width: 100%; height: 45px; line-height: 45px;cursor: pointer;" @click="showCalendar">
						<div style="float: left;width: 45%; height: 45px;">{{start}}</div>
						<div style="float:left;width: 10%;height:45px;text-align: center;">-</div>
						<div style="float: left;width: 45%; height: 45px;">{{end}}</div>
					</div>
					<can-multi @closeCan="()=>{showCanMulti=false}" :sideStart="atime" :sideEnd="btime" v-if='showCanMulti' @castTime='castTime'></can-multi>
				</div>
				<com-table :listHeight='80' :showHand="false" :listName="'会员列表'" :key="index" :showTitle='1' :listWidth="1300" :introData="MemberList" :titleData="titleList">
					<div slot="con-0" slot-scope="props">
						<span style="width: 10%;height:90%;vertical-align:middle;margin-top:3px;color:white" class="blue" @click="getDetail(props.data)">
							查看详情</span>
					</div>
					<div slot="con-4" slot-scope="props">
						<span>{{props.data.gender == 2 ? "女" : "男"}}</span>
					</div>
				</com-table>
			</template>
			<template v-else>
				<div class="manage-head">
					<div class="manage-head-left fl">
						<span class="fl">起止时间</span>
						<div class="manage-date fl">
							<span class="fl" style="width: 40%;">
								<calendar :time="fromDate" :only="true" :format="'yyyy年MM月dd日'" @emit="getStartTime"></calendar>
							</span>
							<span class="fl" style="width: 20%;">共{{returnInt||1}}天</span>
							<span class="fl" style="width: 40%;">
								<calendar :time="toDate" :only="true" :format="'yyyy年MM月dd日'" @emit="getEndTime"></calendar>
							</span>
						</div>
						<div class="search fl">
							<input type="text" placeholder="请输入手机号码" class="search-input" v-model="mobiles" maxlength="11">
							<a href="javascript:void(0);" class="search-btn" @click="getList('add')"></a>
						</div>
					</div>
				</div>
				<com-table :listHeight='80' :showHand="false" :listName="'会员列表'" :key="index" :showTitle='1' :listWidth="1300" :introData="MemberList" :titleData="titleLists">
					<div slot="con-0" slot-scope="props" style="height: 80px;align-items: center;display: flex;">
						<a href="javascript:void(0)" class="blue fl" @click="getDetail(props.data)" style='overflow: hidden;white-space: nowrap;text-overflow: ellipsis;'>查看详情</a>
						<a href="javascript:void(0)" class="yellow fl" @click="recharge(props.data.memberId)">充值</a>
					</div>
					<div slot="con-4" slot-scope="props">
						<span>{{props.data.gender == 2 ? "女" : "男"}}</span>
					</div>
				</com-table>
			</template>
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(pages)" :total="Number(total)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</div>
		<component :is="showCom" :gid='gid' :shopsId='shopsId' @winEvent='winEvent'></component>
	</section>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

let data = new Date().getTime(); //当前时间

export default {
	data() {
		return {
			MemberList: [],
			pages: 1,
			num: 10,
			fromDate: data,
			toDate: data,
			count: null,
			total: null,
			returnInt: null,
			mobile: '',
			brandId: storage.session('userShop').currentShop.ischain, //3为品牌 0为单店
			//日期日历
			atime: Date.now(),
			btime: Date.now(),
			shopList: [], //店铺列表
			shopLists: [],
			memberList: [], //会员等级列表
			memberLists: [],
			sexType: [],
			sexTypes: [
				{
					name: '重置',
					type: '0'
				},
				{
					name: '男',
					type: '1'
				},
				{
					name: '女',
					type: '2'
				}
			], //性别
			shopNameOn: '', //选中的店铺名
			sexOn: '', //选中的性别
			memberOn: '', //选中的会员等级
			gender: '', //性别类型 1男2女
			shopsId: '', // 门店id
			levelId: '', // 会员id
			fromAge: '', //开始年龄
			toAge: '', //结束年龄
			showCom: '',
			gid: '',
			shopId: '',
			showCanMulti: false,
			titleList: [
				{
					titleName: '操作'
				},
				{
					titleName: '注册时间',
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
				},
				{
					titleName: '所属门店',
					dataName: 'shopName'
				}
			],
			titleLists: [
				{
					titleName: '操作'
				},
				{
					titleName: '注册时间',
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
			allTotal: 0,
			index: null
		};
	},
	computed: {
		start: {
			get: function() {
				return utils.format(this.atime, 'yyyy-MM-dd');
			}
		},
		end: {
			get: function() {
				return utils.format(this.btime, 'yyyy-MM-dd');
			}
		},
		mobiles: {
			get: function() {
				return this.mobile;
			},
			set: function(newValue) {
				this.mobile = newValue.replace(/[^\d]/g, '');
			}
		},
		fromAges: {
			get: function() {
				return this.fromAge;
			},
			set: function(newValue) {
				this.fromAge = newValue.replace(/[^\d]/g, '');
			}
		},
		toAges: {
			get: function() {
				return this.toAge;
			},
			set: function(newValue) {
				this.toAge = newValue.replace(/[^\d]/g, '');
			}
		}
	},
	methods: {
		changePage(val) {
			this.pages = val.page;
			if (this.brandId == '3') this.getShopMemberList();
			else this.getList();
		},
		castTime({ startTime, endTime }) {
			this.atime = startTime;
			this.btime = endTime;
			this.showCanMulti = false;
		},
		async getList(type) {
			if (type == 'add') this.pages = 1;
			// 开始时间计算
			let { start: startTime } = utils.getTime({
				time: this.fromDate,
				type: false
			});
			// 结束时间计算
			let { end: terminalTime } = utils.getTime({
				time: this.toDate,
				type: false
			});
			// 比较时间计算
			let { end: comparisonTime } = utils.getTime({
				time: new Date(),
				type: false
			});

			if (type == 'add') {
				if (startTime > terminalTime) {
					this.$store.commit('setWin', {
						content: '开始时间不能大于结束时间'
					});
					return false;
				}
				if (terminalTime > comparisonTime) {
					this.$store.commit('setWin', {
						content: '结束时间不能大于今天'
					});
					return false;
				}
			}

			// this.pages = 1;
			// 获取会员列表
			let data = await http.getShopMemberList({
				data: {
					page: this.pages, //页码
					fromDate: startTime, //开始时间
					toDate: terminalTime, //结束时间
					num: this.num,
					mobile: this.mobile,
					shopId: this.shopId
				}
			});

			this.MemberList = data.list;
			for (let i = 0; i < this.MemberList.length; i++) {
				this.MemberList[i].createTime = utils.format(
					this.MemberList[i].createTime,
					'yyyy-MM-dd hh:mm:ss'
				);
			}
			this.count = Number(data.count);
			this.total = data.total;
			this.timeFun();
		},
		getDetail(item) {
			storage.session('memberObj', item);

			let dates = new Date(this.start);
			dates.setHours(dates.getHours() - 8); //初始值为8:00 减去8小时
			let start = Math.round(dates.getTime() / 1000); //开始时间
			let time = new Date(this.end);
			time.setHours(time.getHours() + 15); //初始值为8:00 加上15个小时
			time.setMinutes(time.getMinutes() + 59); //出事职位0:00 加上59分钟
			time.setSeconds(time.getSeconds() + 59); //初始值为0:00 加上59秒
			let end = Math.round(time.getTime() / 1000); //结束时间

			if (this.brandId == '3') {
				storage.session('member_serach_time', {
					start,
					end
				});
			} else {
				storage.session('member_serach_time', {
					start: this.fromDate,
					end: this.toDate
				});
			}
			this.$router.push('/admin/memberManagement/detail');
		},
		getStartTime(val) {
			this.fromDate = val;
		},
		getEndTime(val) {
			this.toDate = val;
		},
		winEvent(str) {
			console.log(str);
			if (str == 'ok') {
				this.showCom = 'memberRechargeDetail';
			} else if (str == 'recharge') {
				this.showCom = 'recharge';
			} else {
				this.showCom = '';
			}
		},
		recharge(gid, shopsId) {
			// 充值方法
			this.showCom = 'recharge';
			this.gid = gid;
			this.shopsId = shopsId;
		},
		timeFun() {
			//相差天数计算
			let onDayTime = 24 * 60 * 60 * 1000;
			this.returnInt = Math.ceil(
				(this.toDate - this.fromDate) / onDayTime
			);
		},
		//日历--跨时间段
		showCalendar() {
			this.showCanMulti = !this.showCanMulti;
		},
		async getShopList() {
			// 店铺列表
			let data = await http.numberGetShopList({
				data: {
					shopId: this.shopId
				}
			});

			this.shopLists = utils.deepCopy(data);
			this.shopLists.unshift({
				shopName: '重置',
				id: null
			});
		},
		async getMemberList() {
			// 获取所有会员等级
			let data = await http.memberGetList({
				data: {
					shopId: this.shopId
				}
			});
			this.memberLists = utils.deepCopy(data);
			this.memberLists.unshift({
				name: '重置',
				id: null
			});
		},
		setOptions: function(type, item) {
			// 设置选项
			if (type == '1') {
				this.shopNameOn =
					item.shopName == '重置' ? '选择门店' : item.shopName;
				this.shopsId = item.id;
				this.shopList = [];
			} else if (type == '2') {
				this.sexOn = item.name == '重置' ? '选择性别' : item.name;
				this.gender = item.type;
				this.sexType = [];
			} else {
				this.memberOn =
					item.name == '重置' ? '选择会员等级' : item.name;
				this.levelId = item.id;
				this.memberList = [];
			}
		},
		selectOn: function(type) {
			// 显示选项
			if (type == '1') {
				if (utils.isEmptyObject(this.shopList)) {
					// this.shopList = utils.deepCopy(this.shopLists);
					this.shopList = utils.deepCopy(storage.session('shopList'));
				} else {
					this.shopList = [];
				}
			} else if (type == '2') {
				if (utils.isEmptyObject(this.sexType)) {
					this.sexType = utils.deepCopy(this.sexTypes);
				} else {
					this.sexType = [];
				}
			} else {
				if (utils.isEmptyObject(this.memberList)) {
					this.memberList = utils.deepCopy(this.memberLists);
				} else {
					this.memberList = [];
				}
			}
		},
		async getShopMemberList() {
			let dates = new Date(this.start);
			dates.setHours(dates.getHours() - 8); //初始值为8:00 减去8小时
			let start = Math.round(dates.getTime() / 1000); //开始时间
			let time = new Date(this.end);
			time.setHours(time.getHours() + 15); //初始值为8:00 加上15个小时
			time.setMinutes(time.getMinutes() + 59); //出事职位0:00 加上59分钟
			time.setSeconds(time.getSeconds() + 59); //初始值为0:00 加上59秒
			let end = Math.round(time.getTime() / 1000); //结束时间
			if (this.fromAge == '0') {
				this.$store.commit('setWin', {
					content: '开始年龄不能小于等于0'
				});
				return false;
			}

			if (this.fromAge > this.toAge) {
				this.$store.commit('setWin', {
					content: '开始年龄必须小于结束年龄'
				});
				return false;
			}
			// 查询会员列表

			let data = await http.searchShopMemberList({
				data: {
					shopsId: this.shopsId, //门店id
					shopId: this.shopId, //门店id
					gender: this.gender, //性别
					mobile: this.mobile, //手机号
					levelId: this.levelId, //会员id
					fromDate: start, //开始时间
					toDate: end, //结束时间
					fromAge: this.fromAge, //开始年龄
					toAge: this.toAge, //结束年龄
					num: this.num, //一页显示多少个
					page: this.pages
				}
			});

			this.MemberList = data.list;
			this.count = Number(data.count);
			this.total = data.total;
			for (let i = 0; i < this.MemberList.length; i++) {
				this.MemberList[i].createTime = utils.format(
					this.MemberList[i].createTime,
					'yyyy-MM-dd'
				);
			}
		},
		brandExports: function() {
			// 导出品牌会员信息
			let dates = new Date(this.start);
			dates.setHours(dates.getHours() - 8); //初始值为8:00 减去8小时
			let start = Math.round(dates.getTime() / 1000); //开始时间
			let time = new Date(this.end);
			time.setHours(time.getHours() + 15); //初始值为8:00 加上15个小时
			time.setMinutes(time.getMinutes() + 59); //出事职位0:00 加上59分钟
			time.setSeconds(time.getSeconds() + 59); //初始值为0:00 加上59秒
			let end = Math.round(time.getTime() / 1000); //结束时间

			// 导出会员列表
			http.memberExport({
				data: {
					shopsId: this.shopsId, //门店id
					gender: this.gender, //性别
					mobile: this.mobile, //手机号
					levelId: this.levelId, //会员id
					fromDate: start, //开始时间
					toDate: end, //结束时间
					fromAge: this.fromAge, //开始年龄
					toAge: this.toAge, //结束年龄
					num: this.num, //一页显示多少个
					page: this.pages,
					format: 'csv'
				}
			});
		},
		exportNoBrand: function() {
			// 导出非品牌

			// 开始时间计算
			let { start: startTime } = utils.getTime({
				time: this.fromDate,
				type: false
			});
			// 结束时间计算
			let { end: terminalTime } = utils.getTime({
				time: this.toDate,
				type: false
			});
			// 导出会员列表

			http.memberExport({
				data: {
					page: this.pages, //页码
					fromDate: startTime, //开始时间
					toDate: terminalTime, //结束时间
					num: this.num,
					mobile: this.mobile,
					format: 'csv',
					shopId: this.shopId
				}
			});
		},
		getPageNum: function(obj) {
			this.pages = obj.page;
			this.num = obj.num;
			if (this.brandId == '3') this.getShopMemberList();
			else this.getList();
		}
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		page: () =>
			import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		recharge: () =>
			import(/*webpackChunkName: 'recharge'*/ './member_recharge'),
		memberRechargeDetail: () =>
			import(/*webpackChunkName: 'member_recharge_detail'*/ './member_recharge_detail'),
		canMulti: () =>
			import(/*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		comTable: () =>
			import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		PageElement: () =>
			import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element')
	},
	mounted() {
		this.shopId = storage.session('itemId');
		let s = storage.session('member_serach_time');
		if (s && s.start) {
			if (this.brandId == '3') {
				this.atime = s.start * 1000;
				this.btime = s.end * 1000;
				this.getShopMemberList();
			} else {
				this.fromDate = s.start;
				this.toDate = s.end;
				this.getList();
			}
		} else {
			this.atime = this.fromDate = new Date().setDate(1); //2010年1月1
			this.btime = Math.floor(Date.now() / 1000);
			this.getShopMemberList();
		}

		let obj = {};
		if (this.brandId == '3') {
			this.getMemberList();
			this.getShopList();
			obj = {
				filter: () => {
					this.getShopMemberList();
				}
			};
		} else {
			obj = {
				filter: () => {
					this.getList();
				}
			};
		}
		this.$store.commit(
			'setPageTools',
			Object.assign(obj, {
				leadOut: () => {
					let fun =
						this.brandId == '3'
							? this.brandExports
							: this.exportNoBrand;
					if (this.MemberList.length < 1) {
						this.$store.commit('setWin', {
							content: '当前没有可导出信息!'
						});
						return false;
					}
					fun.call(this);
				}
			})
		);
	},
	beforeRouteLeave: (to, from, next) => {
		if (to.path != '/admin/memberManagement/detail') {
			storage.session('member_serach_time', null);
		}
		next();
	},
	watch: {
		fromDate: 'timeFun',
		toDate: 'timeFun'
	}
};
</script>
<style type="text/css" scoped>
.member-manage {
	height: auto;
	min-height: 100%;
	width: 100%;
	/*overflow: hidden;*/
}

.manage-head {
	height: 40px;
	width: 100%;
	margin-bottom: 20px;
}

.manage-head-left {
	width: 800px;
	height: 40px;
	line-height: 40px;
}

.manage-head-left span {
	display: inline-block;
	width: 80px;
	height: 40px;
}

.manage-date {
	height: 40px;
	line-height: 40px;
	width: 500px;
	margin-right: 20px;
	text-align: center;
}

.export {
	display: block;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	color: #fff;
	font-size: 14px;
}

.manage-Conent,
.details-Conent {
	width: 100%;
	height: auto;
	line-height: 50px;
	overflow: hidden;
}

.conent-head,
.concent-tip,
.details-Conent-head {
	height: 50px;
	width: 100%;
	background-color: #e6e6e6;
	text-align: center;
}

.conent-head span,
.member-manage-box span,
.details-Conent span {
	width: 10%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	float: left;
}

.details-Conent span {
	width: 20%;
}

.concent-tip {
	background-color: #f2f2f2;
	font-size: 14px;
	color: #7f7f7f;
}

.main-concent div,
.details-Conent div {
	height: 50px;
	line-height: 50px;
	width: 100%;
}

.main-concent .member-manage-box:nth-child(odd),
.details-box:nth-child(odd) {
	background-color: #f2f2f2;
}

.main-concent .member-manage-box:nth-child(even),
.details-box:nth-child(even) {
	background-color: #ffffff;
}

.member-details {
	height: 700px;
	width: 800px;
	overflow: hidden;
}

.details-head {
	padding: 10px;
	padding-bottom: 0;
	width: 100%;
	height: 170px;
	border-bottom: 10px solid #e6e6e6;
}

.head-child,
.details-tit {
	height: 50px;
	line-height: 50px;
	width: 100%;
}

.head-child:nth-child(2) {
	border-bottom: 1px solid #f2dede;
}

.head-child span {
	width: 33.33%;
	height: 50px;
	float: left;
}

.head-child input {
	padding-left: 10px;
	border: 1px solid #c6c6c6;
	outline: none;
	color: #666;
	height: 46px;
	width: 150px;
}

.head-child span:nth-child(1n) {
	padding-left: 20px;
}

.head-child span:nth-child(2n) {
	text-align: left;
	text-indent: 50px;
}

.head-child span:nth-child(3n) {
	padding-right: 20px;
	text-align: right;
}

.recharge-btn {
	height: 40px;
	line-height: 40px;
	margin-top: 5px;
}

.details-tit {
	text-align: center;
}

.details-tit h2 {
	position: relative;
	left: 50%;
	margin-left: -50px;
	font-size: 16px;
	width: 100px;
	height: 50px;
}

.details-tit h2:after,
.details-tit h2:before {
	content: '';
	position: absolute;
	top: 50%;
	width: 10px;
	height: 10px;
	background-color: #000000;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	transform: translate(-50%, 0);
}

.details-tit h2:after {
	right: -5px;
}

.details-tit h2:before {
	left: 5px;
}

.input {
	line-height: 38px;
	height: 38px;
	width: 100%;
	padding-left: 10px;
	float: left;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	cursor: pointer;
}

.input:focus {
	box-shadow: none;
}

.search .search-btn {
	background: url('../../res/images/search.png') center center #29a7e1
		no-repeat;
}

.tableListInp {
	color: #666666;
	height: 45px;
	width: 150px;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
	margin-right: 30px;
	margin-bottom: 30px;
	box-sizing: border-box;
	float: left;
	position: relative;
}

.tableListInp ul {
	position: absolute;
	width: 100%;
	z-index: 99;
	background-color: #ffffff;
}

.tableListInp ul li {
	border: 1px #b3b3b3 solid;
	border-bottom: none;
	height: 45px;
	line-height: 45px;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: normal;
}

.tableListInp ul li:hover {
	background-color: #f1f1f1;
}

.tableListInp ul li:last-child {
	border-bottom: 1px #b3b3b3 solid;
}

.tableListInp > div {
	height: 43px;
	border-left: 1px solid #b3b3b3;
	position: relative;
	width: 40px;
}

.tableListInp div i {
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

.input-style {
	border: 0;
	outline: none;
	padding: 0;
	height: 43px;
	padding-left: 10px;
	cursor: pointer;
	color: #796868;
}
</style>