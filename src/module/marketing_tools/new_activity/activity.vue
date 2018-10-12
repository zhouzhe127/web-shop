<template>
	<section id="activity">
		<div class="choice">
			<span>已选择:{{typeObj[activityType]}}</span>
		</div>
		<!--活动列表-->
		<div id='test'>
			<div class="clearfix">
				<div class="oClickBox fl" style="" @click="showCalendarSearch">
					<span class="oSpan" style="">{{start1}}&nbsp;----&nbsp;{{end1}}</span>
					<span class="down" style=""></span>
				</div>
				<a class="fl searchBtn" v-on:click="searchlist" href="javascript:void(0)">
						<span class="search"></span>
					</a>
				<!--选择卡属门店-->
				<div class="filtrate fl">
					<input type="text" v-model="activityTitle" class="fl" placeholder="请输入活动名称" />
					<a class="fl searchBtn" v-on:click="searchlist" href="javascript:void(0)">
						<span class="search"></span>
					</a>
				</div>
			</div>
			<can-multi :sideStart="atime1" :sideEnd="btime1" @closeCan='closeCan' v-if='showCanMulti' @castTime='castTime' style="float: left;text-align: center;"></can-multi>
		</div>
		<div style="margin-bottom: 20px;">
			<span class="sel" v-for="(item,index) in buttonList" :key='index' v-bind:class="{'on':flag == index}" @click="tabSwitch(index)">{{item.name}}</span>
		</div>
		<!-- 活动列表 -->
		<com-table :listHeight='80' :showHand='false' :key="index" :showTitle='2' :listWidth="1440" :introData="activityList" :titleData="titleList">
			<div slot="con-0" slot-scope="props">
				{{setType(props.data.type)}}
			</div>
			<div slot="con-2" slot-scope="props">
				{{transFormData(props.data.createTime)}}
			</div>
			<div slot="con-3" slot-scope="props">
				<div v-if="props.data.type == '0'">{{timeLimit[props.data.limit].name}}</div>
				<div v-else>{{setEndTime(props.data.createTime,props.data.endTime)}}</div>
			</div>
			<div slot="con-4" slot-scope="props">
				<div v-if="props.data.giveNum == '0'">无限制</div>
				<div v-else>{{props.data.giveNum}}</div>
			</div>
			<div slot="con-5" slot-scope="props">
				<div v-if="props.data.dayGiveNum == '0'">无限制</div>
				<div v-else>{{props.data.giveNum}}</div>
			</div>
			<div slot="con-6" slot-scope="props">
				<div v-if="props.data.type == '1' && props.data.objectType == '0'">
					店内
				</div>
				<div v-else>会员</div>
			</div>
			<div slot="con-7" slot-scope="props">
				<div v-if="ischain == 1 || ischain == 2" style="text-align: center;">
					不可操作
				</div>
				<div v-else style="text-align: center;">
					<a v-if="flag==1" href="javascript:void(0);" class="yellow" v-on:click="close(props.data)" style="width: 33.3%;">关闭</a>
					<a v-if="flag==0" href="javascript:void(0);" class="yellow" v-on:click="publish(props.data)" style="width: 33.3%;">发布</a>
					<a v-if="flag==2" href="javascript:void(0);" class="blue" v-on:click="modfycoupons(props.data,'2')" style="width: 50%;">查看详情</a>
					<a v-if="flag==2" href="javascript:void(0);" class="yellow" v-on:click="off(props.data)" style="width: 50%;">下架</a>
					<a v-if="flag==3" href="javascript:void(0);" class="yellow" v-on:click="on(props.data)" style="width: 33.3%;">上架</a>
					<a v-if="flag==0 || flag==1 || flag==3" href="javascript:void(0);" class="gray" v-on:click="modfycoupons(props.data,'1')" style="width: 33.3%;background: #858585;">编辑</a>
					<a v-if="!(flag==2)" href="javascript:void(0);" class="gray" v-on:click="deletecoupons(props.data)" v-bind:style="{'width':(flag==4) ? '100%' : '33.3%'}" style="background: #a7a7a7;">删除</a>
				</div>
			</div>
		</com-table>
		<!-- <page v-if="pageTotal > 1" :isNoPaging='true' @pageNum="funGetPageNum" :len="pageNum" :page="page" :total='pageTotal' style="float: left;margin-top: 30px;"></page> -->
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(pageTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
		<!-- 活动新增弹窗 -->
		<!-- <activityAdd @winEvent='winEvent' v-if='showAdd'></activityAdd> -->
	</section>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

let currentShop = null;

export default {
	data() {
		return {
			index: '',
			showCanMulti: false,
			ischain: null, //店铺id 品牌店/单店
			giveNum: '', //发放数量
			//发放数量
			total: [{
				text: '不设限制',
				value: '0'
			}, {
				text: '设定总数',
				value: '1'
			}],
			buttonList: [{
				'name': '未发布'
			}, {
				'name': '发布中'
			}, {
				'name': '已发布'
			}, {
				'name': '已下架'
			}, {
				'name': '已结束'
			}],
			flag: 0, //当前选中按钮
			timeLimit: [{
				'name': '永久',
				value: '1'
			}, {
				'name': '一年',
				value: '2'
			}, {
				'name': '二年',
				value: '0'
			}, ],
			customList: [{
					'name': '店内'
				},
				{
					'name': '会员'
				}
			],
			goodsType: [{
				'name': '微信',
				'id': '1'
			}, {
				'name': '短信',
				'id': '2'
			}], //消息推送渠道
			//查询日期日历
			atime1: (new Date()).getTime(),
			btime1: (new Date()).getTime(),
			activityList: [], //活动列表
			num: 10, //一版页码处理多少数据
			pageTotal: 1, //总页数
			page: 1,
			titleList: [{
					titleName: '活动类型',
					titleStyle: {
						width: '100px',
						flex: 'none',
						fontSize: 16 + 'px'
					},
					dataName: 'id',
				},
				{
					titleName: '活动名称',
					dataName: 'name'
				},
				{
					titleName: '创建时间',
					dataName: 'createTime'
				},
				{
					titleName: '活动期限'
				},
				{
					titleName: '券发放数量'
				},
				{
					titleName: '每日发放上限'
				},
				{
					titleName: '对象'
				},
				{
					titleName: '操作'
				},
			],
			activityType: '', //活动类型的type
			shopsList: [], // 卡属门店
			shopsName: '选择门店',
			activityTitle: '', //活动名称
			typeObj: {
				'0': '生日活动',
				'1': '自定义活动',
				'2': '新会员开卡礼',
				'3': '消费额激励',
				'4': '裂变活动',
				'5': '会员日',
				'6': '满减活动',
				'7': '领券活动'
			}
		};
	},
	computed: {
		start1: {
			get: function() {
				return utils.format(this.atime1, 'yyyy-MM-dd');
			}
		},
		end1: {
			get: function() {
				return utils.format(this.btime1, 'yyyy-MM-dd');
			}
		},
		day: {
			get: function() {
				let startTime = utils.format(this.btime, 'yyyy,MM,dd'); //获取开始时间年月日
				let endTime = utils.format(this.atime, 'yyyy,MM,dd'); //获取结束时间年月日
				return this.getDays(startTime, endTime) + '天';
			}
		},
	},
	methods: {
		closeCan() {
			this.showCanMulti = false;
		},
		// winEvent(obj) { //两个入口 1:通过新怎活动跳转路由 2:通过编辑活动跳转路由
		// 	let {
		// 		module: m,
		// 		status,
		// 		type
		// 	} = obj;
		// 	this.showAdd = false;
		// 	let name = obj.type == undefined ? m.name : m.children[type].name;
		// 	if (status == 'ok') {
		// 		switch (name) {
		// 			case '新会员开卡礼':
		// 				this.$router.push('/admin/activity/agift');
		// 				break;
		// 			case '消费额激励':
		// 				this.$router.push('/admin/activity/encourage');
		// 				break;
		// 			case '自定义活动':
		// 				this.$router.push('/admin/activity/custom');
		// 				break;
		// 			case '生日活动':
		// 				this.$router.push('/admin/activity/birth');
		// 				break;
		// 			case '裂变活动':
		// 				this.$router.push('/admin/activity/fission');
		// 				break;
		// 			case '会员日':
		// 				this.$router.push('/admin/activity/member');
		// 				break;
		// 			case '满减活动':
		// 				this.$router.push('/admin/activity/fullreduce');
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	}
		// },
		castTime(obj) {
			let {
				startTime,
				endTime
			} = obj;
			this.atime1 = startTime;
			this.btime1 = endTime;
			this.showCanMulti = false;
		},
		setEndTime: function(startTime, endTime) {
			// 设置活动结束时间
			startTime = utils.format(startTime, 'yyyy,MM,dd'); //获取开始时间年月日 
			endTime = utils.format(endTime, 'yyyy,MM,dd'); //获取结束时间年月日
			if (endTime == '0' && startTime == '0') {
				return '无限期';
			} else {
				return this.getDays(startTime, endTime) + '天';
			}
		},
		getDays(strDateStart, strDateEnd) {
			let strSeparator = ','; //日期分隔符
			let oDate1;
			let oDate2;
			let iDays;
			oDate1 = strDateStart.split(strSeparator);
			oDate2 = strDateEnd.split(strSeparator);
			let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
			let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
			iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
			return iDays + 1;
		},

		transFormData: function(t) {
			// 转换时间
			return utils.format(t, 'yyyy-MM-dd');
		},
		setType: function(type) {
			// 设置活动类型
			return this.typeObj[type];
		},
		//下一页
		// addpage() {
		// 	this.light(this.flag);
		// },
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.newgetActivityList();
		},
		//新增活动
		// addActivity: function() {
		// 	// openWin(true, true);
		// 	this.showAdd = true;
		// },
		//查询搜索
		showCalendarSearch: function() {
			this.showCanMulti = !this.showCanMulti;
		},
		sendData({
			urlType,
			data,
			str
		}) {
			this.$store.commit('setWin', {
				type: 'confirm',
				content: str,
				callback: async(str) => {
					if (str == 'ok') {
						await http[urlType]({
							data
						});
						this.newgetActivityList();
					}
				}
			});
		},
		//删除
		deletecoupons: function(item) {
			this.sendData({
				urlType: 'deleteActivity',
				data: {
					activityId: item.id,
				},
				str: '确认要删除吗？'
			});
		},
		//下架
		off: function(item) {
			this.sendData({
				urlType: 'releaseOrDownActivity',
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType,
					isRelease: 0
				},
				str: '确定要下架吗?'
			});
		},
		//上架
		on: function(item) {
			this.sendData({
				urlType: 'releaseOrDownActivity',
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType,
					isRelease: 1
				},
				str: '确认要上架吗?'
			});
		},
		//发布
		publish(item) {
			this.sendData({
				urlType: 'releaseOrDownActivity',
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType,
					isRelease: 1
				},
				str: '确定要发布吗?'
			});
		},
		//关闭
		async close(item) {
			this.sendData({
				urlType: 'closeActivity',
				data: {
					activityId: item.id,
					type: item.type,
					mouldType: item.mouldType
				},
				str: '确定要关闭吗?'
			});

		},
		// //活动弹框按钮切换
		// async light(index) {
		// 	this.flag = index;
		// 	//按钮发生变化 翻页始终从第一页开始
		// 	if (this.change != this.flag) {
		// 		this.change = this.flag;
		// 		this.page = 1;
		// 	}
		// 	if (index == 3) index = -1;
		// 	if (index == 4) index = -2;

		// 	let data = await http.getActivityList({
		// 		data: {
		// 			page: this.page,
		// 			num: this.pageNum,
		// 			fromDate: parseInt(this.atime1 / 1000),
		// 			toDate: parseInt(this.btime1 / 1000),
		// 			status: index,
		// 		}
		// 	});
		// 	this.activityList = data.list;
		// 	this.allTotal = this.activityList.length;
		// 	this.pageTotal = data.total;
		// 	this.pageCount = data.list.length;
		// },
		searchlist: function() { //根据日期查找活动列表
			this.page = 1;
			this.newgetActivityList();
		},
		tabSwitch: function(index) { //选项卡的切换
			this.flag = index;
			this.page = 1;
			this.newgetActivityList();
		},
		async newgetActivityList() {
			let tabstatus = this.flag;
			//已下架 -1
			//已结束 -2
			if (this.flag == 3) tabstatus = -1;
			if (this.flag == 4) tabstatus = -2;
			let data = await http.newgetActivityList({
				data: {
					fromDate: parseInt(this.atime1 / 1000), //开始日期
					toDate: parseInt(this.btime1 / 1000), //结束日期
					page: this.page, //页数
					num: this.num,
					status: tabstatus,
					type: this.activityType, //活动类型
					activityName: this.activityTitle
				}
			})
			this.activityList = data.list;
			this.pageTotal = data.total;
		},
		// getCouponId(arr, type) {
		// 	let i;
		// 	let arr1 = [];
		// 	arr = (type != 1) ? JSON.parse(arr) : arr;
		// 	for (i = 0; i < arr.length; i++) {
		// 		arr1.push(arr[i].id);
		// 	}
		// 	return arr1;
		// },
		// async getShopList() {
		// 	let data = await http.couGetShopList({
		// 		data: {

		// 		}
		// 	});
		// 	if (this.brandId == '3') {
		// 		this.shopList = this.getCouponId(data, '1');
		// 		console.log(JSON.stringify(this.shopList))
		// 	} else {
		// 		this.shopList.push(storage.session('shopId'));
		// 	}

		// },
		modfycoupons(item, type) { //编辑活动
			if (type == '2') {
				//点击查看详情的状态
				item.isShowdetail = true;
				storage.session('activityDetail', 'true');
			}
			//当前点击的对象的数据保存起来
			storage.session('activityInfo', item);
			this.addActivity();
		},
		setTitle: function() { //设置标题
			this.$store.commit('setPageTools', [{
					name: '返回',
					className: ['fd-white'],
					fn: () => {
						this.returnActivity();
					}
				},
				{
					name: '新建活动',
					className: ['fd-yellow'],
					fn: () => {
						this.addActivity();
					}
				}
			]);
		},
		returnActivity: function() { //返回活动首页
			this.$router.push('/admin/activity');
		},
		addActivity: function() { //新建活动
			switch (this.activityType) {
				case 0:
					this.$router.push('/admin/activity/generalActivity/birth');
					break;
				case 1:
					this.$router.push('/admin/activity/generalActivity/custom');
					break;
				case 2:
					this.$router.push('/admin/activity/generalActivity/agift');
					break;
				case 3:
					this.$router.push('/admin/activity/generalActivity/encourage');
					break;
				case 4:
					this.$router.push('/admin/activity/generalActivity/fission');
					break;
				case 5:
					this.$router.push('/admin/activity/generalActivity/member');
					break;
				case 6:
					this.$router.push('/admin/activity/generalActivity/fullreduce');
					break;
			}
		},
		// 获取卡属门店店铺列表
		clickShopList: function(arr) {
			let idArr = [];
			arr.forEach((item) => { //,index
				if (item.selected == true) {
					idArr.push(item.id);
				}
			});
			//this.listObj.belongToShop = idArr.join(',');
		},
		getShopList: function() {
			// 获取卡属门店店铺列表
			if (this.ischain == '3') { // 处理品牌逻辑
				this.shopsList = storage.session('shopList');
				for (let item of this.shopsList) {
					item.name = item.shopName;
				}
			} else if (this.ischain == '0') {
				//this.shopsName = this.userData.currentShop.name;
				//this.listObj.belongToShop.push(this.userData.currentShop.id);
			}
		},
	},
	components: {
		page: () =>
			import ( /* webpackChunkName:'page_element' */ 'src/components/page_element'),
		canMulti: () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		'comTable': () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		selectStore: () =>
			import ( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
		PageElement: () =>
			import ( /*webpackChunkName: "page_element"*/ 'src/components/page_element'),
	},
	beforeCreate() {
		currentShop = storage.session('userShop').currentShop;
	},
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		for (let item of this.titleList) {
			if (item.dataName != 'id') {
				Object.assign(item, obj1);
			}
		}
	},
	mounted() {
		this.ischain = currentShop.ischain;
		this.activityType = storage.session('activityType');
		if (this.ischain != 1 || this.ischain != 2) {
			this.setTitle();
		}
		this.newgetActivityList();
		this.getShopList();
	}
};
</script>
<style scoped>
#activity {
	min-width: 800px;
}

#activity .choice {
	height: 40px;
}

#activity .choice span {
	font-size: 16px;
	line-height: 40px;
}

.list {
	min-width: 1300px;
}

.list .oUl {
	width: 100%;
	height: 50px;
	height: 50px;
	background-color: #e6e6e6;
}

.list .oUl li {
	height: 50px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	float: left;
}

.list .oUl li:nth-child(1) {
	width: 10%;
}

.list .oUl li:nth-child(2) {
	width: 10%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.list .oUl li:nth-child(3) {
	width: 10%;
}

.list .oUl li:nth-child(4) {
	width: 20%;
}

.list .oUl li:nth-child(5) {
	width: 10%;
}

.list .oUl li:nth-child(6) {
	width: 10%;
}

.list .oUl li:nth-child(7) {
	width: 10%;
}

.list .oUl li:nth-child(8) {
	width: 20%;
}

.list .oUl li:nth-child(8) a {
	float: left;
}

.list .oUl li section {
	height: 50px;
	line-height: 50px;
	text-align: center;
	float: left;
	cursor: pointer;
	color: #808080;
}

.sel {
	display: inline-block;
	width: 120px;
	height: 40px;
	font-size: 16px;
	background: #f2f2f2;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-right: 10px;
}

.on {
	background: #28a8e0;
	color: #fff;
}

.off {
	background: #f2f2f2;
}

#test {
	display: inline-block;
	vertical-align: middle;
	position: relative;
	height: 40px;
	margin: 20px 0;
}

#test .filtrate {
	display: inline-block;
	height: 40px;
	cursor: pointer;
	color: #44404A;
	margin-left: 20px;
	position: relative;
}

#test .filtrate input {
	width: 200px;
	height: 40px;
	text-indent: 15px;
}

#test .oClickBox {
	display: inline-block;
	border: 1px solid #b3b3b3;
	width: 310px;
	height: 40px;
	line-height: 40px;
	position: relative;
	cursor: pointer;
}

.oClickBox .oSpan {
	border-right: 1px solid #b3b3b3;
	display: inline-block;
	text-align: center;
	width: 270px;
	height: 38px;
}

#test .down {
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid #b3b3b3;
	position: absolute;
	right: 15px;
	top: 15px;
}

#test .searchBtn {
	width: 40px;
	height: 40px;
	background-color: #29A7E1;
}

.search {
	display: inline-block;
	width: 40px;
	height: 40px;
	background-color: #29A7E1;
	cursor: pointer;
}

.search {
	background: url(../../../res/images/search.png) center center no-repeat;
}
</style>