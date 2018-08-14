<template>
	<section id="activity">
		<!--活动列表-->
		<section v-show="acti">
			<div v-if="ischain == 1 || ischain == 2" style="margin-bottom: 20px;float: right;">
			</div>
			<div v-else style="margin-bottom: 20px;float: right;">
				<a @click="addActivity" href="javascript:void(0);" class="yellow" style="width: 150px;height: 40px;line-height: 40px;">新增活动</a>
			</div>
			<div id='test' style="">
				<div>
					<div class="oClickBox fl" style="" @click="showCalendarSearch">
						<span class="oSpan" style="">{{start1}}&nbsp;----&nbsp;{{end1}}</span>
						<span class="down" style=""></span>
					</div>
					<a style="background-color: #29A7E1;" class="fl" v-on:click="light(flag)" href="javascript:void(0)">
						<span class="search"></span>
					</a>
				</div>
				<can-multi :sideStart="atime1" :sideEnd="btime1" @closeCan='closeCan' v-if='showCanMulti' @castTime='castTime' style="float: left;text-align: center;margin-left:5px"></can-multi>
			</div>
			<div style="margin-bottom: 20px;">
				<span class="sel" v-for="(item,index) in buttonList" :key='index' v-bind:class="{'on':flag == index}" @click="light(index)">{{item.name}}</span>
			</div>
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
						<a v-if="flag==2" href="javascript:void(0);" class="yellow" v-on:click="off(props.data)" style="width: 100%;">下架</a>
						<a v-if="flag==3" href="javascript:void(0);" class="yellow" v-on:click="on(props.data)" style="width: 33.3%;">上架</a>
						<a v-if="flag==0 || flag==1 || flag==3" href="javascript:void(0);" class="gray" v-on:click="modfycoupons(props.data)" style="width: 33.3%;background: #858585;">编辑</a>
						<a v-if="!(flag==2)" href="javascript:void(0);" class="gray" v-on:click="deletecoupons(props.data)" v-bind:style="{'width':(flag==4) ? '100%' : '33.3%'}" style="background: #a7a7a7;">删除</a>
					</div>
				</div>
			</com-table>
			<page v-if="pageTotal > 1" :isNoPaging='true' @pageNum="funGetPageNum" :len="pageNum" :page="page" :total='pageTotal' style="float: left;margin-top: 30px;"></page>
		</section>
		<!-- 活动新增弹窗 -->
		<activityAdd @winEvent='winEvent' v-if='showAdd'></activityAdd>
	</section>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';

let currentShop = null;
let typeObj = {
	'0': '生日活动',
	'1': '自定义活动',
	'2': '新会员开卡礼',
	'3': '消费额激励',
	'4': '裂变活动',
	'5': '会员日',
	'6': '满减活动'
};
export default {
	data() {
		return {
			index: '',
			showCanMulti: false,
			ischain: null, //店铺id 品牌店/单店
			edit: false, //是否为编辑
			editId: '', //编辑id
			actName: '', //生日活动名称
			sel: 0, //生日活动期限
			explain: '', //生日活动说明
			totalSel: 0, //发放数量默认选中值
			giveNum: '', //发放数量
			//发放数量
			total: [{
				text: '不设限制',
				value: '0'
			}, {
				text: '设定总数',
				value: '1'
			}],
			digit: false, //发放数量总数填写是否显示
			dayGiveLimit: '', //每日发放上限
			num: true, //店内活动 数量限制显示
			customName: '', //自定义活动名称
			customExplain: '', //自定义活动说明
			indexCustom: 0, //单选选中
			goodsIds: [], //生日活动选中优惠券
			customIds: [], //自定义设置店内选中优惠券
			customIds1: [], //自定义设置会员选中优惠券
			loginTime: false, //会员弹框注册日期
			//              vipIds: [], //选中关联会员
			member: 0,
			memfilter: '',
			startAge: '',
			endAge: '',
			sexIndex: ['0'],
			phone: '',
			atimevip: (new Date()).getTime(),
			btimevip: (new Date()).getTime(),
			isedit: false, //编辑下禁止修改对象
			iseditShop: false,
			isclick: false, //保存时只能点击一次
			issue: true, //发布按钮是否显示
			aid: '', //活动id
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
			change: 0, //监控按钮是否发生变化
			acti: true, //活动列表显示
			birth: false, //生日活动设置显示
			custom: false, //自定义设置 显示
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
			highLimit: false, //生日活动期限下拉框显示
			high: '永久',
			pushdateNum: '',
			pushtime: [ //推送时间
				{
					'name': '8',
					value: '1'
				}, {
					'name': '9',
					value: '2'
				}, {
					'name': '10',
					value: '3'
				}, {
					'name': '14',
					value: '4'
				}, {
					'name': '15',
					value: '5'
				}, {
					'name': '16',
					value: '6'
				}, {
					'name': '17',
					value: '7'
				}, {
					'name': '18',
					value: '8'
				}, {
					'name': '21',
					value: '9'
				}, {
					'name': '22',
					value: '10'
				}, {
					'name': '23',
					value: '11'
				}
			],
			pushtimeStauts: false, //生日活动期限下拉框显示
			pushNum: '8',
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
			goodsSelect: [], //消息推送渠道选中
			customSelect: [], //自定义活动选择的
			msmStatus: false, //短信开关状态
			marketingStatus: false, //自定义活动的状态
			//日期日历
			atime: (new Date()).getTime(),
			btime: (new Date()).getTime(),
			//查询日期日历
			atime1: (new Date()).getTime(),
			btime1: (new Date()).getTime(),
			activityList: [], //活动列表
			pageNum: 10, //一版页码处理多少数据
			pageTotal: 1, //总页数
			pageCount: 0,
			page: 1,
			micShop: false, //微分店
			micList: [{
				'name': '选择使用'
			}, {
				'name': '强制使用'
			}],
			micsel: [], //每张优惠券select默认选中值
			micselimit: [], //每日上限 select默认选中值
			miCount: [], //选中的优惠券列表 
			indexmic: 0, //核销方式选中
			radioCount: true, //核销方式切换
			compareArr: [], //用于比较优惠劵数组
			activityDetail: {}, //详情
			shopList: [],
			brandId: null, //3为品牌 0为单店
			contentSetting: '', //生日活动内容设置
			customActivity: '', //自定义活动
			parameter: [{
				'name': '【会员姓名】',
				'id': '{memberName}'
			}, {
				'name': '【会员生日】',
				'id': '{memberBirthday}'
			}, {
				'name': '【优惠券名称】',
				'id': '{couponName}'
			}, {
				'name': '【优惠券数量】',
				'id': '{couponNum}'
			}, {
				'name': '【活动名称】',
				'id': '{activityName}'
			}],
			customParameter: [{
				'name': '【会员姓名】',
				'id': '{memberName}'
			}, {
				'name': '【优惠券名称】',
				'id': '{couponName}'
			}, {
				'name': '【优惠券数量】',
				'id': '{couponNum}'
			}, {
				'name': '【活动名称】',
				'id': '{activityName}'
			}],
			showAdd: false,
			titleList: [{
				titleName: '活动类型',
				titleStyle: {
					width: '100px',
					flex: 'none'
				},
				dataName: 'id'
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
			allTotal: 0
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
		winEvent(obj) { //两个入口 1:通过新怎活动跳转路由 2:通过编辑活动跳转路由
			let {
				module: m,
				status,
				type
			} = obj;
			this.showAdd = false;
			let name = obj.type == undefined ? m.name : m.children[type].name;
			if (status == 'ok') {
				switch (name) {
					case '新会员开卡礼':
						this.$router.push('/admin/activity/agift');
						break;
					case '消费额激励':
						this.$router.push('/admin/activity/encourage');
						break;
					case '自定义活动':
						this.$router.push('/admin/activity/custom');
						break;
					case '生日活动':
						this.$router.push('/admin/activity/birth');
						break;
					case '裂变活动':
						this.$router.push('/admin/activity/fission');
						break;
					case '会员日':
						this.$router.push('/admin/activity/member');
						break;
					case '满减活动':
						this.$router.push('/admin/activity/fullreduce');
						break;
					default:
						break;
				}
			}
		},
		castTime(obj) {

			let {
				startTime,
				endTime
			} = obj;
			this.atime1 = startTime;
			this.btime1 = endTime;
			this.showCanMulti = false;
		},
		funGetPageNum(obj) {
			this.page = obj.page;
			this.addpage();
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
			return typeObj[type];
		},
		//下一页
		addpage() {
			this.light(this.flag);
		},
		//新增活动
		addActivity: function() {
			// openWin(true, true);
			this.showAdd = true;
		},
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
						this.light(this.flag);
					}
				}
			});
		},
		//删除
		deletecoupons: function(item) {
			this.sendData({
				urlType: 'deleteActivity',
				data: {
					aid: item.id,
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
					aid: item.id,
					type: item.type,
					mouldType: item.mouldType
				},
				str: '确定要关闭吗?'
			});

		},
		//活动弹框按钮切换
		async light(index) {
			this.flag = index;
			//按钮发生变化 翻页始终从第一页开始
			if (this.change != this.flag) {
				this.change = this.flag;
				this.page = 1;
			}
			if (index == 3) index = -1;
			if (index == 4) index = -2;

			let data = await http.getActivityList({
				data: {
					page: this.page,
					num: this.pageNum,
					fromDate: parseInt(this.atime1 / 1000),
					toDate: parseInt(this.btime1 / 1000),
					status: index,
				}
			});
			this.activityList = data.list;
			this.allTotal = this.activityList.length;
			// console.log(this.activityList, 'alltotal');
			// console.log(this.allTotal, 'alltotal');
			this.pageTotal = data.total;
			this.pageCount = data.list.length;
			//console.log(this.pageTotal, ' this.pageCount');
		},
		getCouponId(arr, type) {
			let i;
			let arr1 = [];
			arr = (type != 1) ? JSON.parse(arr) : arr;
			for (i = 0; i < arr.length; i++) {
				arr1.push(arr[i].id);
			}
			return arr1;
		},
		async getShopList() {

			let data = await http.couGetShopList({
				data: {

				}
			});
			if (this.brandId == '3') {
				this.shopList = this.getCouponId(data, '1');
			} else {
				this.shopList.push(storage.session('shopId'));
			}

		},
		modfycoupons(item) {
			//当前点击的对象的数据保存起来
			storage.session('activityInfo', item);
			this.winEvent({
				status: 'ok',
				module: {
					name: typeObj[item.type]
				}
			});
		}
	},
	components: {
		page: () =>
			import ( /* webpackChunkName:'page_element' */ 'src/components/page_element'),
		canMulti: () =>
			import ( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
		activityAdd: () =>
			import ( /*webpackChunkName: 'activity_add'*/ './activity_add'),
		'comTable': () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),

	},
	beforeCreate() {
		currentShop = storage.session('userShop').currentShop;
	},
	mounted() {

		this.ischain = this.brandId = currentShop.ischain;

		this.addpage();
		this.getShopList();
	}
};
</script>
<style scoped>
#activity {
	min-width: 800px;
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
	width: 400px;
	height: 40px;
	margin: 20px 0;
}

#test .oClickBox {
	display: inline-block;
	border: 1px solid #b3b3b3;
	width: 300px;
	height: 40px;
	line-height: 40px;
	position: relative;
	cursor: pointer;
}

.oClickBox .oSpan {
	border-right: 1px solid #b3b3b3;
	display: inline-block;
	text-align: center;
	width: 255px;
	height: 38px;
}

#test .down {
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid #b3b3b3;
	position: absolute;
	right: 17px;
	top: 17px;
}

.down {
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 10px solid #b3b3b3;
	position: absolute;
	top: 15px;
	right: 16px;
}

.search {
	display: inline-block;
	width: 44px;
	height: 38px;
	background-color: #29A7E1;
	cursor: pointer;
}

.search {
	background: url(../../res/images/search.png) center center no-repeat;
}
</style>