<template>
	<section id="activity">
		<div class="choice">
			<span>已选择:{{typeObj[activityType]}}</span>
		</div>
		<!--活动列表-->
		<div class=" clearfix" style="margin-bottom:20px;">
			<div class="fl filbox clearfix">
				<el-date-picker class="fl" v-model="valueTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" :clearable="false">
				</el-date-picker>
				<el-button class="fl" type="primary" icon="el-icon-search" @click="searchlist"></el-button>
			</div>
			<div class="fl filbox clearfix">
				<el-input class="fl" v-model="activityTitle" placeholder="请输入活动名称" maxlength="20"></el-input>
				<el-button class="fl el-input" type="primary" icon="el-icon-search" @click="searchlist"></el-button>
			</div>
		</div>
		<div style="margin-bottom: 20px;">
			<span class="sel" v-for="(item,index) in buttonList" :key='index' v-bind:class="{'on':flag == index}" @click="tabSwitch(index)">{{item.name}}</span>
		</div>
		<!-- 下面的表格 -->
		<div class="list_box" style="width:100%;">
			<div class="list_title">
				<div class="list_title_l fl">
					<span>活动列表</span>
					<span></span>
					<span>共
						<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
				</div>
			</div>
			<el-table :data="activityList" border :stripe="true" :header-cell-style="{'background-color':'#f5f7fa'}" :header-row-style="{'height':'40px'}" :row-style="{'height':'60px'}">
				<el-table-column fixed label="活动类型" align="center">
					<template slot-scope="scope">
						{{setType(scope.row.type)}}
					</template>
				</el-table-column>
				<el-table-column label="活动名称" prop="name" align="center">
				</el-table-column>
				<el-table-column label="创建时间" align="center">
					<template slot-scope="scope">
						<span>{{transFormData(scope.row.createTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="活动期限" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.type == '0'">{{timeLimit[scope.row.limit].name}}</span>
						<span v-else>{{setEndTime(scope.row.startTime,scope.row.endTime)}}</span>
					</template>
				</el-table-column>
				<template v-if="activityType == '6'">
					<!-- 优惠总额 -->
					<el-table-column label="优惠总额" prop="totalDiscount" align="center">
					</el-table-column>
					<!-- 拉动消费 -->
					<el-table-column label="拉动消费" prop="pullConsume" align="center">
					</el-table-column>
					<!-- 活动场景 -->
					<el-table-column label="活动场景" prop="scene" align="center">
						<template slot-scope="scope">
							<span>{{sceneList[scope.row.scene]}}</span>
						</template>
					</el-table-column>
				</template>
				<el-table-column label="券发放数量" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.giveNum == '0'">无限制</span>
						<span v-else>{{scope.row.giveNum}}</span>
					</template>
				</el-table-column>
				<el-table-column label="每日发放上限" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.dayGiveNum == '0'">无限制</span>
						<span v-else>{{scope.row.giveNum}}</span>
					</template>
				</el-table-column>
				<el-table-column label="对象" align="center">
					<template slot-scope="scope">
						<span>{{getObject(scope.row)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="250" v-if="ischain == '0' || ischain== '3'">
					<template slot-scope="scope">
						<el-button v-if="flag==1" size="medium" type="text" @click="close(scope.row)" style="color: #E1BB4A;">关闭</el-button>
						<span v-if="flag==1" style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button v-if="flag==0" size="medium" type="text" @click="publish(scope.row)" style="color: #E1BB4A;">发布</el-button>
						<span v-if="flag==0" style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button v-if="flag==2" size="medium" type="text" @click="modfycoupons(scope.row,'2')" style="color: #E1BB4A;">查看详情</el-button>
						<span v-if="flag==2" style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button v-if="flag==2" size="medium" type="text" @click="off(scope.row)" style="color: rgb(40, 168, 224);">下架</el-button>
						<!-- <span v-if="flag==2" style="padding:0 5px;color: #D2D2D2">|</span> -->
						<el-button v-if="flag==3 && scope.row.type != 8" size="medium" type="text" @click="on(scope.row)" style="color: rgb(40, 168, 224);">上架</el-button>
						<span v-if="flag==3 && scope.row.type != 8" style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button v-if="flag==0 || flag==1 || (flag==3 && scope.row.type != 8)" size="medium" type="text" @click="modfycoupons(scope.row,'1')" style="color: #ff8d00;">编辑</el-button>
						<span v-if="flag==0 || flag==1 || (flag==3 && scope.row.type != 8)" style="padding:0 5px;color: #D2D2D2">|</span>
						<el-button v-if="!(flag==2)" size="medium" type="text" @click="deletecoupons(scope.row)" style="color: #fd3f1f;">删除</el-button>
					</template>
					<!-- <template slot-scope="scope" v-else>
						<el-button size="medium" type="primary" @click="opencoupons(scope.$index,scope.row)">查看详情</el-button>
					</template> -->
				</el-table-column>
				<el-table-column label="操作" align="center" width="250" v-if="ischain == '1' || ischain== '2'">
					<template slot-scope="scope">
						<el-button v-if="flag==2" size="medium" type="text" @click="modfycoupons(scope.row,'2')" style="color: #E1BB4A;">查看详情</el-button>
						<el-button v-else size="medium" type="text" style="color: #E1BB4A;">不可操作</el-button>
					</template>
					<!-- <template slot-scope="scope" v-else>
						<el-button size="medium" type="primary" @click="opencoupons(scope.$index,scope.row)">查看详情</el-button>
					</template> -->
				</el-table-column>
			</el-table>
		</div>
		<!-- 活动列表 -->
		<div class="pageWrap">
			<el-pagination background @size-change="handleSizeChange" @current-change="pageChange" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="pageTotal" :page-sizes="[10, 20, 30]"></el-pagination>
		</div>
		<!-- 活动新增弹窗 -->
		<!-- <activityAdd @winEvent='winEvent' v-if='showAdd'></activityAdd> -->
	</section>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	let currentShop = null;

	export default {
		data() {
			return {
				index: '',
				ischain: null, //店铺id 品牌店/单店
				giveNum: '', //发放数量
				buttonList: [
					{
						'name': '未发布'
					},
					{
						'name': '发布中'
					},
					{
						'name': '已发布'
					},
					{
						'name': '已下架'
					},
					{
						'name': '已结束'
					}
				],
				flag: 0, //当前选中按钮
				timeLimit: [
					{
						'name': '永久',
						value: '1'
					},
					{
						'name': '一年',
						value: '2'
					},
					{
						'name': '二年',
						value: '0'
					}
				],
				customList: [
					{
						'name': '店内'
					},
					{
						'name': '会员'
					}
				],
				goodsType: [
					{
						'name': '微信',
						'id': '1'
					},
					{
						'name': '短信',
						'id': '2'
					}
				], //消息推送渠道
				valueTime: [], //时间控件
				activityList: [], //活动列表
				num: 10, //一版页码处理多少数据
				pageTotal: 1, //总页数
				page: 1,
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
					'7': '领券活动',
					'8': '消费满次活动',
					'9': '消费券返券活动',
					'10': '唤醒营销活动',
				},
				count: '',
				sceneList: {
					'0': '全部',
					'1': '微店',
					'2': '快捷支付'
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
			sendData({
				urlType,
				data,
				str
			}) {
				this.$store.commit('setWin', {
					type: 'confirm',
					content: str,
					callback: async (str) => {
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
						fromDate: this.valueTime == '' ? '' : parseInt(this.valueTime[0] / 1000), //开始日期
						toDate: this.valueTime == '' ? '' : parseInt(this.valueTime[1] / 1000), //结束日期
						page: this.page, //页数
						num: this.num,
						status: tabstatus,
						type: this.activityType, //活动类型
						activityName: this.activityTitle
					}
				});
				this.activityList = data.list;
				this.pageTotal = data.total;
				this.count = data.count;
			},
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
				this.$store.commit('setPageTools', [
					{
						name: '返回',
						className: 'el-btn-blue',
						fn: () => {
							this.returnActivity();
						}
					},
					{
						name: '新建活动',
						className: 'el-btn-yellow',
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
					case 8:
						this.$router.push('/admin/activity/generalActivity/fulltime');
						break;
					case 9:
						this.$router.push('/admin/activity/generalActivity/returnticket');
						break;
					case 10:
						this.$router.push('/admin/activity/generalActivity/wakemarketing');
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
			//每页显示多少条数据
			handleSizeChange(p) {
				this.page = 1;
				this.num = p;
				this.newgetActivityList();
			},
			//页码跳转
			pageChange(p) {
				this.page = p;
				this.newgetActivityList();
			},
			getObject: function(item) {
				// 生日活动 新会员开卡礼 裂变活动 会员日 消费券返券 '全体会员'
				// 满减活动 消费满次 唤醒营销 '所有人'
				// 自定义活动 店内 线上=> 会员和粉丝
				// 消费额激励 会员 和 粉丝
				let objName = '--';
				let allMember = ['0', '2', '4', '5', '9'];
				let allPeople = ['6', '8', '10'];
				if (allMember.indexOf(item.type) != -1) {
					objName = '全体会员';
				}
				if (allPeople.indexOf(item.type) != -1) {
					objName = '所有人';
				}
				//个例
				if (item.type == '1' || item.type == '3') {
					if (item.objectType == '0' && item.type == '1') {
						objName = '店内';
					} else {
						let memberName = '';
						let fansName = '';
						let member = item.sendProgress.split(',')[0]; //会员的筛选数量
						if (member > 0) {
							memberName = '会员';
						}
						if (item.selectFans && item.selectFans == 1) {
							fansName = '粉丝';
						}
						if (memberName != '' && fansName != '') {
							objName = memberName + '+' + fansName;
						} else {
							objName = memberName + fansName;
						}
					}
				}
				return objName;
			}
		},
		components: {
			page: () =>
				import( /* webpackChunkName:'page_element' */ 'src/components/page_element'),
			canMulti: () =>
				import( /*webpackChunkName: 'can_multi'*/ 'src/components/can_multi'),
			'comTable': () =>
				import( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			selectStore: () =>
				import( /*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
			PageElement: () =>
				import( /*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		},
		beforeCreate() {
			currentShop = storage.session('userShop').currentShop;
		},
		mounted() {
			this.ischain = currentShop.ischain;
			//console.log(this.ischain)
			this.activityType = storage.session('activityType');
			if (this.ischain != 1 && this.ischain != 2) {
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

	#activity .filbox {
		margin-right: 20px;
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
		background: #E1BB4A;
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

	.el-input {
		width: auto;
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