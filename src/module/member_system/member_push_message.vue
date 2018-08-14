<template>
	<div id="pmVue" class="member-pm">
		<template v-if="!isCreatePM">
			<div class="pm-title">
				<!--   <a href="javascript:void(0);" @click="openCreate" class="blue" style="width: 128px;height: 44px; position: absolute;top: 66px;right: 66px;">创建推送</a> -->
				<div class="pt-floor">
					<div style="width: 90px;height: 40px;text-align: left;">时间筛选</div>
					<div style="width: 350px;  background-color: #fff;">
						<div style="width: 100%; height: 40px; line-height: 40px;cursor: pointer;border: 1px solid #B3B3B3;" @click="showCalendar">
							<div style="float: left;width: 40%; height: 40px;text-align: center;">{{changeTimeShow(startTime)}}</div>
							<div style="float: left;width: 10%; height: 40px;text-align: center;">至</div>
							<div style="float: left;width: 40%; height: 40px;text-align: center;">{{changeTimeShow(endTime)}}</div>
							<div style="float: left;width: 10%; height: 38px;text-align: center;border-left: 1px solid #B3B3B3;">
								<img src="../../res/icon/icon-point-down.png" />
							</div>
						</div>
						<can-multi @closeCan="()=>{isShowCa=false}" v-if="isShowCa" :sideStart="startTime" :sideEnd="endTime" ref="ca" @castTime="getAlltime"></can-multi>
						<!-- <calendar-multi :starttime.sync="startTime" :endtime.sync="endTime" v-ref:ca></calendar-multi> -->
					</div>
					<a href="javascript:void(0);" @click="searchMessage" class="blue" style="width: 100px;height: 40px;line-height: 40px;margin-left: 40px;">筛选</a>
					<a href="javascript:void(0);" @click="resetSearch" class="gray" style="width: 100px;height: 40px;line-height: 40px;margin-left: 40px;">重置</a>
				</div>
				<!-- <com-table :listHeight='80' :showTitle = '1' :listWidth="1400" :introData="" :titleData="titleList_a">

                </com-table> -->
				<div class="pt-floor" style="height: 44px;background-color: #F2F2F2;border: 1px solid #B3B3B3;border-bottom:none ;margin-top: 30px;">
					<div style="width: 25%;background: #e6e6e6;height: 42px;">推送次数</div>
					<div style="width: 25%;background: #e6e6e6;height: 42px;">推送人数</div>
					<div style="width: 25%;background: #e6e6e6;height: 42px;">短信数量</div>
					<div style="width: 25%;background: #e6e6e6;height: 42px;">微信数量</div>
				</div>
				<div class="pt-floor" style="height: 64px;border: 1px solid #B3B3B3;border-top:none ;margin-bottom: 25px;line-height: 64px;color: #fe982e;">
					<div style="width: 25%">{{totalInfo.count}}</div>
					<div style="width: 25%;">{{totalInfo.peopleNum}}</div>
					<div style="width: 25%;">{{totalInfo.msgNum}}</div>
					<div style="width: 25%;">{{totalInfo.wxNum}}</div>
				</div>
			</div>
			<com-table :listHeight='80' :listName="'会员推送信息'" :showTitle='1' :listWidth="1440" :introData="messageList" :titleData="titleList"
			    :allTotal="totalInfo.count">
				<div slot="con-0" slot-scope="props" style="width: 100px;color: #2BA8dc;cursor: pointer;" @click="openDetailWin(props.data)">
					查看详情
				</div>
				<div slot="con-1" slot-scope="props" style="width:240px;">{{changeTypeTimeShow(props.data.createTime,'type')}}</div>
				<div slot="con-2" slot-scope="props" class="overEll">{{props.data.title}}</div>
				<div slot="con-4" slot-scope="props" style="width: 120px;">{{props.data.status == 1 ? "已推送" : "推送中"}}</div>
				<div slot="con-5" slot-scope="props" style="width: 120px;">{{props.data.msgChannel == "12" ? "短信/微信" : props.data.msgChannel == "1" ? "微信" : "短信"}}</div>
				<div slot="con-6" slot-scope="props" style="width: 230px;" class="overEll">{{props.data.msgChannel == "2" ? props.data.message :props.data.wxMessage}}</div>
			</com-table>
			<!-- <div class="pm-page" v-if="totalPage > 1"> -->
			<page-turn @pageNum="pageNum" :page="page" :total="totalPage" :len="10" style="float: right;margin-right: 30px;"></page-turn>
			<!-- <sd-page :page.sync="page" :count.sync='4' :total.sync='totalPage' :num.sync='10' :len="10" ></sd-page> -->
			<!-- </div> -->
		</template>
		<div class="pm-create" v-if="isCreatePM">
			<div id="push">
				<!-- 筛选会员 -->
				<div class="set-line">
					<div class="titles">筛选会员</div>
					<div class="line"></div>
				</div>
				<!-- 注册日期 -->
				<div class="push-box">
					<span class="push-sub fl">注册日期</span>
					<div class="date-selection">
						<div class="select" @click='showCalendar'>
							<template v-if="createInfo.registerStartTime">
								<div class="select_l">{{changeTimeShow(createInfo.registerStartTime)}}</div>
								<div class="select_c">-</div>
								<div class="select_r">{{changeTimeShow(createInfo.registerEndTime)}}</div>
							</template>
							<template v-else>
								<div class="select_l" style="width: 295px;color: #666;text-align: left;text-indent: 20px;">
									请输入日期
								</div>
							</template>
							<div class="select_d">
								<img src="../../res/icon/q2x.png" />
							</div>
						</div>
						<can-multi @closeCan="()=>{isShowCa=false}" v-if="isShowCa" :sideStart="createInfo.registerStartTime" :sideEnd="createInfo.registerEndTime"
						    @castTime="getAddAlltime"></can-multi>
						<!-- <calendar-multi :starttime.sync="" :endtime.sync="" v-ref:ca></calendar-multi> -->
					</div>
					<a href="javascript:;" v-if="createInfo.registerStartTime" @click="cleanTime" style="width:80px;height: 40px;background: #B3B3B3;margin-left: 20px;line-height: 40px;">取消</a>
				</div>
				<!-- 性别 -->
				<div class="push-box">
					<span class="push-sub fl">性别</span>
					<span class="fl">
						<mul-select :list.sync="gender" :selects.sync="createInfo.genderIndex" :name='"name"' :key='"id"' :isradio="true" :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
					</span>
				</div>
				<!-- 年龄 -->
				<div class="push-box">
					<span class="push-sub fl">年龄</span>
					<div class="age">
						<input type="text" v-model="createInfo.startAge" placeholder="开始年龄" style="text-align: center;text-indent: 0;">
						<span style="margin-right: 6px;">至</span>
						<input type="text" v-model="createInfo.endAge" placeholder="结束年龄" style="text-align: center;text-indent: 0;">
					</div>
				</div>
				<!-- 手机号 -->
				<div class="push-box">
					<span class="push-sub fl">手机号</span>
					<input class="phone fl" type="text" v-model="createInfo.mobile" placeholder="请输入手机号" maxlength="11">
				</div>
				<!-- 会员等级 -->
				<div class="push-box">
					<span class="push-sub fl">会员等级</span>
					<a href="javascript:;" @click="openWindow(1)">选择等级</a>
					<span v-if="getStrNum('levelIds')" class="push-sub fl" style="text-align: left;margin-left: 30px;">已选择{{getStrNum("levelIds")}}个等级</span>
				</div>
				<!-- 选择门店 -->
				<div class="push-box" v-if="showSelectShop">
					<span class="push-sub fl">选择门店</span>
					<a href="javascript:;" @click="openWindow(2)">选择门店</a>
					<span v-if="getStrNum('shopIds')" class="push-sub fl" style="text-align: left;margin-left: 30px;">已选择{{getStrNum("shopIds")}}个门店</span>
				</div>
				<!-- 选择标签 -->
				<div class="push-box">
					<span class="push-sub fl">选择标签</span>
					<a href="javascript:;" @click="openWindow(3)">选择标签</a>
					<span v-if="getStrNum('tagIds')" class="push-sub fl" style="text-align: left;margin-left: 30px;">已选择{{getStrNum("tagIds")}}个标签</span>
				</div>
				<!-- 重置 帅选-->
				<div class="push-box">
					<span class="push-sub fl"></span>
					<a href="javascript:;" @click="cleanCreateInfo" style="height: 50px;background: #B3B3B3;margin-right: 2px;line-height: 50px;">重置</a>
					<a href="javascript:;" @click="getFilterNum" style="height: 50px;line-height: 50px;">筛选</a>
				</div>
				<!-- 筛选结果-->
				<div class="push-box">
					<span class="push-sub fl">筛选结果</span>
					<span class="result">共{{getNum}}位会员</span>
					<!-- 推送内容 -->
					<div class="set-line">
						<div class="titles">推送内容</div>
						<div class="line"></div>
					</div>
				</div>
				<!-- 推送标题 -->
				<div class="push-box">
					<span class="push-sub fl required">推送标题</span>
					<input class="phone fl" type="text" v-model="sendInfo.title" placeholder="请输入标题(20字以内)" maxlength="20" style="width: 404px;">
				</div>
				<!-- 微信推送 -->
				<div class="push-box clearfix">
					<span class="push-sub fl">
						<div @click="sendWay(1)" class="radio" :class="{'active':sendInfo.select == 1}"></div>
						微信推送</span>
					<textarea class="txt fl" v-model="sendInfo.wechat" placeholder="请输入下单成功提醒" maxlength="200"></textarea>
				</div>
				<!-- 短信推送 -->
				<div class="push-box clearfix" style="margin-bottom: 0;">
					<span class="push-sub fl ">
						<div @click="sendWay(2)" class="radio" :class="{'active':sendInfo.select == 2}"></div>
						短信推送
					</span>
					<textarea class="txt fl" v-model="sendInfo.message" placeholder="请输入下单成功提醒" maxlength="120"></textarea>
				</div>
				<div class="push-box">
					<span class="push-sub fl "></span>
					<div class="tix">
						<div class="fr handle-tips">
							<i></i> 60字为一条短信
						</div>
					</div>
				</div>
				<!-- 重置 帅选-->
				<div class="push-box">
					<span class="push-sub fl"></span>
					<a href="javascript:;" @click="openCreate" style="height: 50px;background: #B3B3B3;margin-right: 2px;line-height: 50px;">取消</a>
					<a href="javascript:;" @click="sendMessage" style="height: 50px;line-height: 50px;">推送</a>
				</div>
			</div>
		</div>
		<transition name="fade">
			<win v-if="isShowDetailWin" @winEvent="closeWin" :width="646" :height="630" :align="'right'" :type="'alert'" :ok="{content: '关闭',style: {background: '#f8941f'}}">
				<span slot="title">查看详情</span>
				<detail-win slot="content" :details="detailWin" :levelListObj="levelListObj" :shopListObj="shopListObj" :tagListObj="tagListObj"></detail-win>
			</win>
		</transition>
		<transition name="fade">
			<win v-if="createMessage" @winEvent="closeMessage" :width="663" :height='586' :type="'alert'" :ok="{content: '确定'}">
				<span slot="title">{{title}}</span>
				<div slot="content" class="push-window">
					<div class="chose" v-if="type != 2">
						<a href="javascript:;" @click="cleanAll" style="background: #9FA0A0;">全部取消</a>
						<a href="javascript:;" @click="selectAll" style="background: #F69337;margin-right: 2px;">全部选择</a>
					</div>
					<!-- 等级 -->
					<section v-if="type == 1">
						<div class="list">
							<span class="fl">
								<!-- <sd-multiselect  :list.sync="list" :selects.sync="selectArr" :name='"name"' :key='"id"'></sd-multiselect> -->
								<mul-select :list.sync="list" :selects.sync="selectArr" :name='"name"' :key='"id"' :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
							</span>
						</div>
					</section>
					<!-- 标签 -->
					<section v-if="type == 3">
						<div class="list">
							<span class="fl">
								<!-- <sd-multiselect  :list.sync="list" :selects.sync="selectArr" :name='"name"' :key='"id"'></sd-multiselect> -->
								<mul-select :list.sync="list" :selects.sync="selectArrLabel" :name='"name"' :key='"id"' :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
							</span>
						</div>
					</section>
					<!-- 品牌 -->
					<section v-if="type == 2">
						<p>品牌</p>
						<div class="list">
							<span class="fl">
								<mul-select :list.sync="chainShop" :selects.sync="selectChain" :name='"name"' :key='"id"' :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
							</span>
						</div>
					</section>
					<!-- 直营店 -->
					<section v-if="type == 2 && list.joinShop.length > 0">
						<p>直营店</p>
						<div class="list">
							<span class="fl">
								<mul-select :list.sync="list.joinShop" :selects.sync="selectArr" :name='"shopName"' :key='"id"' :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
							</span>
						</div>
					</section>
					<!-- 加盟店 -->
					<section v-if="type == 2 && list.directShop.length > 0">
						<p>加盟店</p>
						<div class="list">
							<span class="fl">
								<mul-select :list.sync="list.directShop" :selects.sync="selectArr" :name='"shopName"' :key='"id"' :styles="{backgroundColor: '#F1F1F1'}"></mul-select>
							</span>
						</div>
					</section>
				</div>
			</win>
		</transition>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '100px',
						flex: 'none'
					}
				},
				{
					titleName: '推送时间'
				},
				{
					titleName: '推送标题',
					dataName: 'title'
				},
				{
					titleName: '推送人数',
					dataName: 'num'
				},
				{
					titleName: '状态'
				},
				{
					titleName: '方式'
				},
				{
					titleName: '内容'
				},
				{
					titleName: '短信数量',
					dataName: 'messageNum'
				},
				{
					titleName: '微信数量',
					dataName: 'wxNum'
				}
				],
				userData: '',
				isCreatePM: false, //控制 列表和创建消息推送
				startTime: utils.getTime({
					time: new Date(),
					type: true
				}).start, //日期组件的开始时间
				endTime: utils.getTime({
					time: new Date(),
					type: true
				}).end, //日期组件的结束时间
				page: 1,
				totalPage: 0,
				messageList: [], //消息列表
				shopList: {
					directShop: [],
					joinShop: [],
					selectShops: [],
				},
				showSelectShop: '', //品牌或单店
				levelList: [],
				tagList: [],
				shopListObj: {},
				levelListObj: {},
				tagListObj: {},
				totalInfo: {
					count: 0,
					peopleNum: 0,
					wxNum: 0,
					msgNum: 0
				}, //统计信息
				gender: [{
					name: '男',
					id: 1,
				}, {
					name: '女',
					id: 2
				}],
				createInfo: {
					registerStartTime: 0,
					registerEndTime: 0,
					genderIndex: [],
					startAge: '',
					endAge: '',
					mobile: '',
					levelIds: '',
					shopIds: '',
					tagIds: '',
					isChain: 0,
				},
				getNum: 0,
				saveCreateInfo: {},
				sendInfo: {
					title: '',
					wechat: '',
					message: '',
					select: 1
				},
				isShowCa: false, // 是否展示时间选择组件
				detailWin: {},
				isShowDetailWin: false,
				createMessage: false,
				title: '', //  推送标题
				type: '', // 推送内容类型
				list: [],
				selectArr: [],
				chainShop: [],
				selectChain: [],
				selectArrLabel: []
			};
		},
		methods: {
			strTransFromArr(item) {
				let str = '';
				for (let i = 0; i < item.length; i++) {
					str += item[i];
					if (i < item.length - 1) {
						str += ',';
					}
				}
				return str;
			},
			selectAll() {
				this.cleanAll();
				for (let i = 0; i < this.list.length; i++) {
					if (this.type == 3) {
						this.selectArrLabel.push(this.list[i].id);
					} else {
						this.selectArr.push(this.list[i].id);
					}

				}
			},
			cleanAll() {
				if (this.type == 3) {
					this.selectArrLabel = [];
				} else {
					this.selectArr = [];
				}

			},
			changeArr() {
				if (this.selectChain.length > 0) {
					this.selectArr = [];
				}
			},
			changeArr1() {
				if (this.selectArr.length > 0) {
					this.selectChain = [];
				}
			},
			closeMessage(val) { //  createMessage 的信息
				this.createMessage = false;
				if (val == 'ok') {
					if (this.type == 1) {
						this.createInfo.levelIds = this.strTransFromArr(this.selectArr);
					} else if (this.type == 2) {
						let str = this.userData.currentShop.ischain != 3 ? this.userData.currentShop.id : this.selectArr.length > 0 ?
							this.strTransFromArr(this.selectArr) : (this.selectChain[0] ? this.selectChain[0] + '' : '');
						str += '';
						this.createInfo.shopIds = str;
						console.log(this.createInfo.shopIds);
						if (this.selectChain.length > 0) {
							this.createInfo.isChain = 1;
						} else {
							this.createInfo.isChain = 0;
						}
					} else {
						this.createInfo.tagIds = this.strTransFromArr(this.selectArrLabel);
					}
				}
			},
			getAddAlltime(time) {
				this.createInfo.registerStartTime = new Date(time.startTime).getTime();
				this.createInfo.registerEndTime = new Date(time.endTime).getTime();
				this.isShowCa = false;
			},
			pageNum(obj) {
				this.page = obj.page;
				this.searchMessage(obj.page);
			},
			closeWin() {
				this.isShowDetailWin = false;
			},
			getAlltime(time) {
				this.startTime = new Date(time.startTime).getTime();
				this.endTime = new Date(time.endTime).getTime();
				this.isShowCa = false;
			},
			showCalendar() {
				this.isShowCa = !this.isShowCa;
			},
			getStrNum: function (type) {
				let str = this.createInfo[type];
				if (str.length > 0) {
					return str.split(',').length;
				} else {
					return false;
				}
			},
			cleanTime: function () {
				this.createInfo.registerStartTime = 0;
				this.createInfo.registerEndTime = 0;
			},
			changeTimeShow(t) {
				t += '';
				if (t.length == 10) t += '000';
				t -= 0;
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			changeTypeTimeShow(t, type) {
				t += '';
				if (t.length == 10) t += '000';
				t -= 0;
				if (type) {
					return utils.format(new Date(t), 'yyyy-MM-dd hh:mm:ss');
				}
				return utils.format(new Date(t), 'yyyy-MM-dd');
			},
			getShopsList(type) {
				let arr = [];
				let usershops = storage.session('shopList');
				for (let item of usershops) {
					if (item.ischain == type) {
						arr.push(item);
					}
				}
				let itemList = type == 1 ? 'directShop' : 'joinShop';
				for (let i = 0; i < arr.length; i++) {
					this.shopListObj[arr[i].id] = arr[i];
				}
				this.shopList[itemList] = arr;
				console.log(JSON.stringify(arr));
			},
			async getList(type) {
				let url = type == 'tagList' ? 'Membertag/getTag' : 'Memberlevel/getList';
				let res = await http.getMemberlevel({
					data: {},
					url: global.host['wx'] + url
				});
				let arr = res;
				let indexObj = type + 'Obj';
				for (let i = 0; i < arr.length; i++) {
					this[indexObj][arr[i].id] = arr[i];
				}
				this[type] = res;
			},
			resetSearch() {
				this.startTime = utils.getTime({
					time: new Date(),
					type: true
				}).start;
				this.endTime = utils.getTime({
					time: new Date(),
					type: true
				}).end;
				this.searchMessage();
			},
			isSpace(str) {
				str += '';
				return str.replace(/(^\s*)|(\s*$)/g, '') == '' ? true : false;
			},
			async searchMessage() { //筛选消息
				let obj = {};
				this.startTime = utils.getTime({
					time: new Date(this.startTime),
					type: true
				}).start;
				this.endTime = utils.getTime({
					time: new Date(this.endTime),
					type: true
				}).end;
				obj.startTime = parseInt(this.startTime / 1000);
				obj.endTime = parseInt(this.endTime / 1000);
				obj.page = this.page;
				obj.num = 10;
				let res = await http.getMembermessageList({
					data: obj
				});
				this.messageList = res.list;
				this.totalInfo = res.totalList;
				this.totalPage = res.total;
			},
			openDetailWin(item) {
				this.detailWin = utils.deepCopy(item);
				this.isShowDetailWin = true;
				// openMessageDetail(item);
			},
			openCreate() {
				this.isCreatePM = !this.isCreatePM;
				this.sendInfo = {
					'title': '',
					'wechat': '',
					'message': '',
					'select': 1
				};
				this.initState();
			},
			initState() {
				this.isShowCa = false;
				this.createInfo = {
					registerStartTime: 0,
					registerEndTime: 0,
					genderIndex: [],
					startAge: '',
					endAge: '',
					mobile: '',
					levelIds: '',
					shopIds: '',
					tagIds: '',
					isChain: 0,
				};
				this.list = [];
				this.gender = [{
					name: '男',
					id: 1,
				}, {
					name: '女',
					id: 2
				}];
				this.createMessage = false;
				this.selectArr = [];
				this.selectArrLabel = [];
				this.chainShop = [];
				this.selectChain = [];
				this.getNum = 0;
				this.sendInfo = {
					title: '',
					wechat: '',
					message: '',
					select: 1
				};
				// this.shopList = {
				//  directShop: [],
				//  joinShop: [],
				//  selectShops: [],
				// }
				// this.levelList = []
				// this.tagList = []
			},
			openWindow(type) {
				this.type = type;
				this.title = type == 1 ? '选择等级' : type == 2 ? '选择门店' : '选择标签';
				this.list = type == 1 ? this.levelList : type == 2 ? this.shopList : this.tagList;
				console.log(type);
				this.createMessage = true;

			},
			cleanCreateInfo() {
				this.createInfo = utils.deepCopy(this.saveCreateInfo);
				this.getNum = 0;
			},
			async getFilterNum() {
				if (this.checkData()) {
					let sendInfo = utils.deepCopy(this.createInfo);
					if (this.createInfo.registerStartTime) {
						sendInfo.registerStartTime = parseInt(this.createInfo.registerStartTime / 1000);
					}
					if (this.createInfo.registerEndTime) {
						sendInfo.registerEndTime = parseInt(this.createInfo.registerEndTime / 1000);
					}
					sendInfo.gender = this.createInfo.genderIndex.length > 1 ? '' : this.createInfo.genderIndex[0];
					let res = await http.getFilterNum({
						data: sendInfo
					});
					if (res.num > 0) {
						this.valiData('筛选成功！');
					} else {
						this.valiData('筛选出来的人数为0！');
					}
					this.getNum = res.num;
				}
			},
			valiData(content, title = '提示信息', winType = 'alert') {
				this.$store.commit('setWin', {
					winType: winType,
					title: title,
					content: content
				});
			},
			checkData() {
				let info = this.createInfo;
				let ageReg = /^\+?[0-9][0-9]*$/;
				if (info.startAge && info.endAge) {
					if (info.startAge - info.endAge >= 0) {
						this.valiData('年龄的结束时间不能小于开始时间');
						return false;
					}
				}
				if (info.startAge) {
					if (!ageReg.test(info.startAge)) {
						this.valiData('年龄只能是正整数');
						return false;
					}
				}
				if (info.endAge) {
					if (!ageReg.test(info.endAge)) {
						this.valiData('年龄只能是正整数');
						return false;
					} else {
						if (info.endAge > 126 || info.endAge == 0) {
							this.valiData('请输入正确的年龄');
							return false;
						}
					}
				}
				if (info.mobile) {
					if (!ageReg.test(info.mobile)) {
						this.valiData('手机号码只能是数字');
						return false;
					}
				}
				return true;
			},
			sendWay(n) {
				if (n == 2) {
					this.valiData('该功能暂未开放', '温馨提示');
					return false;
				}

				this.sendInfo.select = n;

			},
			async sendMessage() {
				if (this.getNum == 0) {
					this.valiData('您还没有筛选到任何会员', '温馨提示');
					return false;
				}
				let info = this.sendInfo;
				info.title = info.title.replace(/(^\s*)|(\s*$)/g, '');
				if (this.isSpace(info.title)) {
					this.valiData('推送标题不能为空', '温馨提示');
					return false;
				}

				if (info.title.length > 20) {
					this.valiData('标题字数在20字以内', '温馨提示');
					return false;
				}
				info.wechat = info.wechat.replace(/(^\s*)|(\s*$)/g, '');
				if (info.wechat && info.wechat.length > 200) {
					this.valiData('微信推送字数在200字以内', '温馨提示');
					return false;
				}
				info.message = info.message.replace(/(^\s*)|(\s*$)/g, '');
				if (info.message && info.message.length > 120) {
					this.valiData('短信推送字数在120字以内', '温馨提示');
					return false;
				}
				if (info.select == 1) {
					if (this.isSpace(info.wechat)) {
						this.valiData('微信推送内容不能为空', '温馨提示');
						return false;
					}
				} else if (info.select == 2) {
					if (this.isSpace(info.message)) {
						this.valiData('短信推送内容不能为空', '温馨提示');
						return false;
					}
				}
				let sendInfo = utils.deepCopy(this.createInfo);
				if (this.createInfo.registerStartTime) {
					sendInfo.registerStartTime = parseInt(this.createInfo.registerStartTime / 1000);
				}
				if (this.createInfo.registerEndTime) {
					sendInfo.registerEndTime = parseInt(this.createInfo.registerEndTime / 1000);
				}
				sendInfo.gender = this.createInfo.genderIndex.length > 1 ? '' : this.createInfo.genderIndex[0];
				sendInfo.title = info.title;
				sendInfo.wxMessage = info.wechat;
				sendInfo.message = info.message;
				if (info.select != -1) {
					sendInfo.msgChannel = info.select;
				}
				await http.addMembermessage({
					data: sendInfo
				});
				this.valiData('推送请求已发出！', '提示信息');
				this.searchMessage();
				this.isCreatePM = false;
			},
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.userData.currentShop.ischain == '3' ? (this.showSelectShop = true) : (this.showSelectShop = false);
			this.$store.commit('setPageTools', {
				createAplan: () => {
					this.openCreate();
				}
			});
			if (this.userData.currentShop.ischain == 3) {
				this.getShopsList('1');
				this.getShopsList('2');
			}
			this.getList('tagList');
			this.getList('levelList');
			this.saveCreateInfo = utils.deepCopy(this.createInfo);
			this.searchMessage();
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			'can-multi': () =>
				import ( /* webpackChunkName: 'can_multi' */ 'src/components/can_multi'),
			'win': () =>
				import ( /* webpackChunkName: 'win' */ 'src/components/win'),
			'detail-win': () =>
				import ( /* webpackChunkName: 'detail_win' */ './detail_win'),
			'page-turn': () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			'mul-select': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		}
	};
</script>
<style type="text/css" scoped>
	.member-pm {
		padding-bottom: 300px;
		width: 1517px;
	}

	.member-pm .pm-title {
		width: 1668px;
		height: 170px;
	}

	.member-pm .pm-title .pt-floor {
		width: 100%;
		height: 40px;
		float: left;
		line-height: 40px;
	}

	.calendar-multi .header .next-btn,
	.calendar-multi .header .pre-btn {
		padding: 0 15px;
	}

	.member-pm .pm-title .pt-floor div,
	.member-pm .pm-list .pl-line div {
		float: left;
		text-align: center;
	}

	.overEll {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.member-pm .pm-list {
		border: 1px solid #B3B3B3;
		width: 1442px;
		height: auto;
		overflow: hidden;
	}

	.member-pm .pm-list .pl-line {
		float: left;
		width: 100%;
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid #f7f7f7;
	}

	.member-pm .pm-list .pl-line:last-child {
		border-bottom: none;
	}

	.member-pm .pm-page {
		width: 1440px;
		margin-top: 20px;
	}

	.win-cancel {
		display: none;
	}

	.win-ok {
		width: 100%;
	}


	#push {
		width: 1200px;
		height: auto;
	}

	#push .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 15px;
		position: relative;
	}

	#push .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 70px;
		font-size: 16px;
		text-align: left;
	}

	#push .set-line .line {
		display: inline-block;
		width: 476px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#push .push-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 14px;
		/* overflow: hidden; */
	}

	#push .push-box .push-sub {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 16px;
	}

	#push .push-box .date-selection {
		width: 350px;
		height: 42px;
		border: 1px solid #B3B3B3;
		line-height: 42px;
		float: left;
	}

	#push .push-box .date-selection .select {
		width: 100%;
		height: 42px;
		line-height: 42px;
		cursor: pointer;
	}

	#push .push-box .date-selection .select .select_l,
	#push .push-box .date-selection .select .select_c,
	#push .push-box .date-selection .select .select_r {
		float: left;
		height: 40px;
		text-align: center;
	}

	#push .push-box .date-selection .select .select_l,
	#push .push-box .date-selection .select .select_r {
		width: 40%;
	}

	#push .push-box .date-selection .select .select_c {
		width: 5%;
	}

	#push .push-box .date-selection .select .select_d {
		width: 50px;
		float: left;
		height: 40px;
		border-left: 1px solid #B3B3B3;
		position: relative;
	}

	#push .push-box .date-selection .select .select_d img {
		width: 11px;
		height: 10px;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
	}

	.selectbtns span {
		width: auto;
		min-width: 102px;
		height: 40px;
		margin-right: 9px;
		border: 1px solid #D2D2D2;
		background-color: #fff;
	}

	.selectbtns .sign {
		color: #FE932D;
		border-color: #FE932D;
	}

	#push .push-box input {
		display: inline-block;
		width: 100px;
		height: 39px;
		text-indent: 14px;
	}

	#push .push-box input:first-child {
		margin-right: 6px;
	}

	#push .push-box .phone {
		width: 211px;
		height: 38px;
	}

	#push .push-box a {
		display: block;
		float: left;
		width: 211px;
		height: 41px;
		color: #fff;
		background: #2FA8DC;
		text-align: center;
		line-height: 41px;
		font-size: 14px;
	}

	#push .push-box .result {
		font-size: 24px;
		font-weight: bold;
		color: #FE922D;
		line-height: 41px;
	}

	#push .push-box .txt {
		width: 403px;
		height: 115px;
		padding: 14px;
		resize: none;
		box-sizing: border-box;
	}

	#push .push-box .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../res/images/handle-tips.png") 0 center no-repeat;
		color: #999999;
	}

	#push .push-box .tix {
		width: 403px;
		height: 41px;
		float: left;
	}

	#push .push-box .radio {
		width: 20px;
		height: 20px;
		cursor: pointer;
		border: 1px solid #28A8E0;
		float: left;
		margin: 10px 0 10px 25px;
	}

	.active {
		background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;
	}

	#push .clearfix::before,
	#push .clearfix::after {
		display: table;
		content: “”;
	}

	#push .clearfix::after {
		clear: both;
	}

	.push-window {
		width: 663px;
		height: 486px;
		padding: 13px 44px 44px 44px;
	}

	.push-window .chose {
		width: 100%;
		height: 43px;
		margin-bottom: 28px;
	}

	.push-window .chose a {
		display: block;
		width: 132px;
		height: 43px;
		text-align: center;
		line-height: 43px;
		color: #fff;
		font-size: 14px;
		float: right;
	}

	.push-window section p {
		font-size: 16px;
		color: #333;
		margin-bottom: 23px;
	}

	.push-window section .list {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.push-window section .list .selectbtns span {
		margin-bottom: 18px;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		.member-pm .pm-title {
			width: 100%;
			height: 170px;
		}
		.member-pm {
			padding-bottom: 300px;
			width: 100%;
		}
	}
</style>