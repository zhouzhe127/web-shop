<template>
	<section>
		<div id="memberDetail" v-if="isShow == 'all'">
			<div class="member">
				<div class="top">
					<h3>会员信息</h3>
					<img class="img" @click='modifyMember' src='../../../res/icon/iconchange.png' />
				 </div>
					<div class="memberMsg">
						<ul class="message">
							<li>
								<span class="belongshop">姓名：{{memberInfo.name}}</span>
							</li>
							<li>
								<span> 绑定手机：{{memberInfo.mobile}}</span>
							</li>
							<li>
								<span>会员余额：{{memberInfo.totalAmount}}</span>
								<a href="javascript:void(0)" class="operation fl" @click="balance('0')">余额操作</a>
							</li>
							<li>
								<span>会员积分：{{memberInfo.point}}</span>
								<a href="javascript:void(0)" class="operation fl" @click="balance('1')">积分操作</a>
							</li>
						</ul>
						<ul class="message">
							<li>
								<span style="position: relative;">卡号：暂无
								<detailsDes :title="'该功能暂未开放'" :height="40" :width="150"></detailsDes>
							</span>
							</li>
							<li>
								<span style="position: relative;min-width: 120px;">会员渠道:暂无
								<detailsDes :title="'该功能暂未开放'" :height="40" :width="150"></detailsDes>
							</span>
							</li>
							<li>
								<span v-if="memberInfo.openId != ''">微信账户: 已关联</span>
								<span v-if="memberInfo.openId == ''">微信账户: 未关联</span>
								<a href="javascript:void(0)" class="operation fl" @click="unbundling" v-if="memberInfo.openId != ''">解绑</a>
							</li>
							<li>
								<!-- <span class="belongshop">卡属门店:{{getshopName(memberInfo.rechargeShopId)}}</span>
							<a href="javascript:void(0)" class="operation fl" @click="openStore" v-if="brandId == '0' || brandId == '3'">修改</a> -->
								<span>生日：{{memberInfo.birthday}}</span>
							</li>
						</ul>
						<ul class="message">
							<li>
								<span>年龄：{{memberInfo.age}}</span>
							</li>
							<li>
								<span>性别：{{genderList[memberInfo.gender]}}</span>
							</li>
							<li>
								<span>会员等级：{{memberInfo.levelName}}</span>
							</li>
							<li>
							</li>
						</ul>
						<div class="memberInfo" style="width: 1400px;padding-right: 38px;height: auto;min-height: 56px;line-height: 56px;font-size:16px;">
							会员标签：
							<span v-for="(item,str) in memberInfo.tagData" :key='str' class="tagItem" style="margin-bottom: 10px;display: inline-block;">{{item.name}}</span>
						</div>
					</div>
				</div>
				<div class="banner clearfix">
					<el-radio-group v-model="commoditySlect">
						<el-radio-button v-for="(item,index) in bannerList" :key="index" :label="item.name" @change.native="selType(index)"></el-radio-button>
					</el-radio-group>
				</div>
				<!-- 历史记录 -->
				<historical-record v-if="bannerIndex == 0" :mid='mid' :shopsId='shopsId' @eventrecord="getEvent"></historical-record>
				<!-- 更改记录 -->
				<change-record v-if="bannerIndex == 1" :mid='mid' :shopsId='shopsId'></change-record>
				<!-- 积分变动 -->
				<integral-change v-if="bannerIndex == 2" :mid='mid' :shopsId='shopsId'></integral-change>
				<!-- 余额变动 -->
				<change-balance v-if="bannerIndex == 3" :mid='mid' :shopsId='shopsId'></change-balance>
			</div>
			<!-- 订单详情 -->
			<orderDetail :detail="detail" :isDelete="false" v-if="isShow == 'order'" @detailShow="getDetailShow"></orderDetail>
			<component :is="showCon" :gid='gid' :shopId='shopId' @winEvent='winEvent' :memberInfo='memberInfo' :type='showType'></component>
			<!-- 选择门店的弹窗 -->
			<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :shopList='list' :memberInfo="memberInfo"></component>
			<!-- 修改会员信息的弹窗 -->
			<modify-member v-if='modifyStatus' @modifyBack='modifyBack' :memberInfo='memberInfo' :bussiness='bussiness'></modify-member>
	</section>
</template>
<script type="text/javascript">
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import getAppliedWin from './member_mamage_choiceshop.vue';

	export default {
		data() {
			return {
				commoditySlect: '历史纪录',
				bannerList: [{
					name: '历史纪录',
					type: 0
				},
				{
					name: '更改记录',
					type: 1
				},
				{
					name: '积分变动',
					type: 2
				},
				{
					name: '余额变动',
					type: 3
				}
				], //
				index: null,
				indexOn: 0, //判断是进行中的活动还是已结束的活动，默认进行中
				willShow: false, //功能提示框是否显示
				memberInfo: {}, //会员信息
				page: 1, //页码
				num: 10,
				listInfo: {}, //类型
				staffList: [], //员工列表
				bannerIndex: 0,
				type: 0,
				count: 0,
				total: 0,
				showCon: '',
				gid: '',
				shopId: '',
				showType: '',
				brandId: storage.session('userShop').currentShop.ischain, //3为品牌 0为单店
				showWin: false, //弹窗默认关闭状态 
				isPopupwindow: '',
				list: [], //直营店铺列表
				allList: [], //所有的店铺
				listName: '', //表名
				modifyStatus: false, //编辑会员信息的弹窗
				bussiness: [], //会员标签
				genderList: {
					0: '未知',
					1: '男',
					2: '女'
				},
				detail: '', //订单详情
				isShow: 'all'
			};
		},
		props: {
			mid: String,
			shopsId: String
		},
		methods: {
			selType(index) { //历史记录 积分纪录
				this.bannerIndex = index;
			},
			pageChange(obj) { //翻页
				this.page = obj.page;
				this.num = obj.num;
				//this.getRecordList(this.bannerIndex);
			},
			closePage() {
				this.$emit('throwWinResult', false); //抛出一个事件给父组件
			},
			balance(type) {
				this.showType = type;
				this.shopId = this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId;
				this.showCon = 'balance';
			},
			winEvent() {
				this.showCon = '';
				//this.getRecordList(this.bannerIndex);
			},
			recharge(gid, shopId) {
				this.showCon = 'recharge';
				this.gid = gid;
				this.shopId = shopId;
			},
			choose: function(index) {
				//筛选活动中或者已结束活动
				this.indexOn = index;
				this.pagetotal = this.bannerList[index].pagetotal;
				this.page = this.bannerList[index].page;
				this.num = this.bannerList[index].num;
				if (this.indexOn == 0) {
					this.status = 2;
				} else if (this.indexOn == 1) {
					this.status = -2;
				}
				this.inte();
				this.willShow = false;
			},
			clickTip: function() {
				this.willShow = true;
				setTimeout(() => {
					this.willShow = false;
				}, 3000);
			},
			translateTime: function(time, type) {
				//转换时间
				if (type) {
					return utils.format(time, 'yyyy-MM-dd hh:mm:ss');
				} else {
					return utils.format(time, 'yyyy-MM-dd');
				}
			},
			filterType: function(type) {
				return this.obj[type] || '余额';
			},
			async getMemberDetail() {
				let shopId = this.shopsId == undefined ? storage.session('userShop').currentShop.id : this.shopsId;
				let data = await http.getMemberDetail({
					data: {
						mid: this.mid,
						shopsId: shopId
						//shopId
					}
				});
				this.memberInfo = data;
				//this.getRecordList();
			},
			choiceType: function(type, index) {
				// 切换类型
				this.bannerIndex = index;
				this.page = 1;
				this.listName = this.bannerList[index].name;
				//this.getRecordList(type);
			},
			// async getRecordList(type) {
			// 	let data = await http.getRecordList({
			// 		data: {
			// 			page: this.page,
			// 			mid: this.mid,
			// 			num: this.num,
			// 			type: type == undefined ? 0 : type
			// 		}
			// 	});
			// 	this.listInfo = data;
			// 	if (data.typeInfo) {
			// 		this.obj = data.typeInfo;
			// 	}
			// 	this.count = (this.page == 1) ? data.count : this.count;
			// 	this.total = (this.page == 1) ? data.total : this.total;

			// },
			judgeType: function(item) {
				// 判断操作类型 是否加还是减
				let operate;
				if (item.type == '1' || item.type == '3' || item.type == '6' || item.type == '9' || item.type == '11' || item.type ==
					'13' || item.type == '25' || item.type == '28') {
					operate = '-';
				} else {
					operate = '+';
				}

				if (item.type == '3' || item.type == '4' || item.type == '5' || item.type == '8' || item.type == '9' || item.type ==
					'10' || item.type == '11') {
					return operate + item.operatePoint;
				} else {
					if (item.type == '1' || item.type == '6') {
						return operate + (parseInt(Number(item.operateAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
					} else if (item.type == '2') {
						return operate + (parseInt(Number(item.rechargeAmount) * 100) + parseInt(Number(item.operateGiftAmount) * 100)) / 100;
					} else {
						if (this.bannerIndex == 2) {
							return operate + (Number(item.operatePoint));
						} else {
							return operate + (Number(item.operateAmount));
						}
					}
				}
			},
			unbundling: function() { //微信账户解绑
				this.$store.commit('setWin', {
					title: '解绑操作',
					content: '是否与微信账户解绑',
					type: 'confirm',
					callback: async (str) => {
						if (str == 'ok') {
							await http.unbindWeiXin({
								data: {
									memberId: Number(this.mid)
								}
							});
							this.memberInfo.openId = '';
						}

					}
				});
			},
			openStore: function() { //打开修改卡属门店
				this.showWin = true; //打开弹窗
				this.isPopupwindow = 'getAppliedWin';
			},
			getResult: function(res) {
				if (res == 'ok') {
					this.getMemberDetail();
				}
				this.showWin = false;
			},
			getshopList: function() {
				this.list = [];
				if (this.brandId == '3') {
					let shops = storage.session('shopList');
					this.allList = shops;
					for (let item of shops) {
						if (item.ischain == '1') {
							this.list.push(item);
						}
					}
				} else {
					let currentshop = storage.session('userShop').currentShop;
					this.list.push({
						'id': currentshop.id,
						'shopName': currentshop.name
					});
					this.allList = this.list;
				}
			},
			getshopName: function(shopId) {
				let shopName = '无';
				for (let item of this.allList) {
					if (item.id == shopId) {
						shopName = item.shopName || item.name;
					}
				}
				return shopName;
			},
			modifyMember: function() { //打开编辑会员信息的弹窗
				this.modifyStatus = true;
			},
			modifyBack: function() { //编辑会员信息回调
				this.getMemberDetail();
				this.modifyStatus = false;
			},
			async getLabelList() { //获取标签
				let res = await http.getMemberTag({
					data: {}
				});
				this.bussiness = utils.deepCopy(res);
			},
			getEvent: function(item) {//更改记录回掉
				if (item) {
					this.detail = item;
					this.isShow = 'order';
				}
			},
			getDetailShow() { //从订单详情返回回来
				this.isShow = 'all';
			},
		},
		mounted() {
			let titleArr = [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.closePage();
				}
			}];
			if (this.brandId != 3) {
				let obj = {
					name: '充值',
					className: ['fd-yellow'],
					fn: () => {
						this.recharge(this.memberInfo.memberId, this.shopsId);
					}
				};
				titleArr.push(obj);
			}
			this.$store.commit('setPageTools', titleArr);
			// this.mid = storage.session('memberObj').memberId;
			// this.shopsId = storage.session('memberObj').shopId;
			this.getshopList();
			this.getMemberDetail();
			this.getLabelList(); //获取标签列表
		},
		components: {
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
			page: () =>
				import ( /* webpackChunkName :'page_element'*/ 'src/components/page_element'),
			recharge: () =>
				import ( /*webpackChunkName: 'recharge'*/ './member_recharge'),
			balance: () =>
				import ( /*webpackChunkName: 'member_detail_balance'*/ './member_detail_balance'),
			getAppliedWin,
			detailsDes: () =>
				import ( /*webpackChunkName: 'details_des'*/ 'src/components/details_des'),
			pageElement: () =>
				import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			'modify-member': () =>
				import ( /*webpackChunkName:'new_member_modify'*/ './new_member_modify'),
			'historical-record': () =>
				import ( /*webpackChunkName:'historical_record'*/ './historical_record'),
			'change-record': () =>
				import ( /*webpackChunkName:'change_the_record'*/ './change_the_record'),
			'integral-change': () =>
				import ( /*webpackChunkName:'integral_change'*/ './integral_change'),
			'change-balance': () =>
				import ( /*webpackChunkName:'change_the_balance'*/ './change_the_balance'),
			orderDetail: () =>
				import ( /*webpackChunkName: 'delete_detail'*/ './../../statistics/delete_detail'),
		}
	};
</script>
<style scoped>
	#memberDetail .tips {
		width: 100%;
		height: 40px;
		margin-bottom: 22px;
	}

	#memberDetail .member {
		width: 100%;
		height: auto;
		border: 1px #D2D2D2 solid;
		overflow: hidden;
		margin-bottom: 20px;
	}

	#memberDetail .banner {
		margin-bottom: 20px;
	}

	#memberDetail .top {
		height: 40px;
		width: 100%;
		background-color: #E6E6E6;
	}

	#memberDetail .top h3 {
		width: 80px;
		line-height: 40px;
		margin-left: 37px;
		color: #43414A;
		font-size: 16px;
		float: left;
	}

	#memberDetail .top .img {
		display: inline-block;
		float: left;
		padding-top: 10px;
	}

	#memberDetail .memberMsg {
		width: 100%;
		height: auto;
		/*  overflow: hidden; */
		overflow-x: auto;
	}

	#memberDetail .memberMsg .message {
		width: 1600px;
		height: 56px;
		display: flex;
		justify-content: space-around;
		padding-left: 38px;
	}

	#memberDetail .memberMsg .message li {
		float: left;
		width: 24%;
		height: 56px;
		line-height: 56px;
	}

	#memberDetail .memberMsg .message li span {
		float: left;
		font-size: 16px;
		margin-right: 35px;
		min-width: 100px;
	}

	#memberDetail .memberMsg .message li .belongshop {
		max-width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	#memberDetail .memberMsg .message li .operation {
		display: block;
		width: 100px;
		height: 43px;
		background: #28A8E0;
		color: #fff;
		border-radius: 5px;
		line-height: 43px;
		font-size: 16px;
		margin-top: 6px;
	}

	#memberDetail .memberMsg .memberInfo {
		width: 25%;
		height: 100%;
		padding-left: 38px;
		position: relative;
		float: left;
	}

	#memberDetail .memberMsg .memberInfo p {
		font-size: 16px;
		color: #333;
		line-height: 56px;
		height: 56px;
		display: flex;
		align-items: center;
	}

	#memberDetail .memberMsg .memberInfo p.handle {
		width: 100px;
		height: 43px;
		background: #28A8E0;
		color: #fff;
		border-radius: 5px;
		line-height: 43px;
		display: flex;
		justify-content: center;
	}

	#memberDetail .memberMsg .memberInfo .memberInfo_s {
		width: 381px;
		height: 56px;
		margin-right: 38px;
	}

	#memberDetail .memberMsg .memberInfo .memberInfo_s span {
		display: block;
		height: 56px;
		line-height: 56px;
		font-size: 16px;
		margin-right: 24px;
	}

	#memberDetail .diel {
		display: inline-block;
		width: 136px;
		height: 42px;
		font-size: 16px;
		background: #FFF;
		border: 1px solid #E9C048;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		color: #F8931F;
	}

	#memberDetail .on {
		background: #F8931F;
		color: #fff;
	}

	#memberDetail .memberCount {
		width: 100%;
		height: 55px;
		background-color: #fff;
		line-height: 52px;
		padding-left: 38px;
		position: relative;
		overflow: hidden;
	}

	#memberDetail .memberCount li {
		float: left;
		font-size: 16px;
		text-align: center;
	}

	#memberDetail .memberCount li span {
		color: #FF3C05;
	}

	#memberDetail .oUl {
		width: 100%;
		height: 42px;
		line-height: 42px;
	}

	#memberDetail .oUl li {
		width: 18%;
		height: 42px;
		line-height: 42px;
		text-align: center;
		float: left;
		vertical-align: middle;
		font-size: 16px;
	}

	#memberDetail .activeUi {
		width: 100%;
		height: auto;
	}

	#memberDetail .activeUi li {
		border-bottom: 1px solid #F7F7F7;
		width: 100%;
		height: auto;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#memberDetail .activeUi li span {
		width: 18%;
		text-align: center;
		float: left;
		padding: 20px 0px;
		line-height: 32px;
		font-size: 16px;
	}



	#memberDetail .filtBox {
		width: 165px;
		height: 90px;
		line-height: 40px;
		border: 1px solid #3e3a43;
		background-color: #3e3a43;
		margin-top: 1px;
		z-index: 999;
		position: absolute;
		top: 0;
		left: 120px;
		color: #fff;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.filtBox:after {
		content: "";
		width: 6px;
		height: 6px;
		border-left: 1px solid #3e3a43;
		border-bottom: 1px solid #3e3a43;
		transform: rotate(45deg);
		-webkit-transform: rotate(45deg);
		position: absolute;
		top: 22px;
		left: -5px;
		background: #3e3a43;
	}

	.recharge-btn {
		height: 40px;
		line-height: 40px;
		margin-top: 5px;
	}

	.tagItem {
		border: 1px solid #FF9800;
		color: #FF9800;
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		margin-right: 10px;
		border-radius: 5px;
	}














	/* @media screen and (min-width:1024px) and (max-width:1440px) {
		#memberDetail .memberMsg .memberInfo {
			width: 203px;
			height: 100%;
			padding-left: 19px;
			float: left;
		}
		}*/
</style>