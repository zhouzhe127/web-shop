<!--
	**达达外卖配置
	*
	* miaochuan.sha
	* *
	*
-->
<template>
	<div id="distribution">
		<!-- 门店状态 -->
		<div class="online-box clearfix" v-if='updata'>
			<span class="online-sub fl required">门店状态</span>
			<singleSelect :index='result' @selOn='haveIndex' :styles="{border: '1px solid #cecdcd',marginRight:'8px',width:'100px'}" :list="list" :name="'name'" :key='"id"'></singleSelect>
		</div>
		<!-- 门店名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">门店名称</span>
			<input type="text" name="" class="inp" placeholder="请输入门店名称" v-model="createShopName" maxlength="30">
		</div>
		<!-- 业务类型 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">业务类型</span>
			<a href="javascript:void(0);" class="addclassify fl" style="width:210px;margin-right: 10px;" @click="openbusiness">选择业务类型</a>
			<span class="getname" v-if='bussinessselect.length > 0'>已选择:{{getbussName('1')}}</span>
		</div>
		<!-- 城市名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">城市名称</span>
			<a href="javascript:void(0);" class="addclassify fl" style="width:210px;margin-right: 10px;" @click="opencity">选择城市名称</a>
			<span class="getname" v-if='cityselects.length > 0'>已选择:{{getbussName('2')}}</span>
		</div>
		<!-- 区域名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">区域名称</span>
			<input type="text" name="" class="inp" placeholder="请输入区域名称" maxlength="30" v-model="areaName">
		</div>
		<!-- 门店地址 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">门店地址</span>
			<input type="text" name="" class="inp" placeholder="请输入门店地址" v-model="createShopAddress" maxlength="50">
		</div>
		<!-- 联系人姓名 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">联系人姓名</span>
			<input type="text" name="" class="inp" placeholder="请输入联系人姓名" maxlength="10" v-model="creatShopPeople">
		</div>
		<!-- 联系人电话 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">联系人电话 </span>
			<input type="text" name="" class="inp" placeholder="请输入联系人电话" v-model="creatShopPhone" maxlength="11">
		</div>
		<!-- 联系人身份证 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">联系人身份证 </span>
			<input type="text" name="" class="inp" placeholder="请输入联系人身份证" v-model="creatShopIdcard" maxlength="18">
		</div>
		<!-- 门店编号 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">门店编号 </span>
			<input type="text" name="" class="inp" placeholder="请输入门店编号" maxlength="30" v-model="creatShopcoding">
		</div>
		<!-- 达达商家APP账号 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">达达商家APP账号 </span>
			<input type="text" name="" class="inp" placeholder="请输入账号" v-model='creatShopaccount' maxlength="30">
		</div>
		<!-- 达达商家APP密码 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">达达商家APP密码 </span>
			<input type="text" name="" class="inp" placeholder="请输入密码" v-model="creatShoppassword" maxlength="30">
		</div>
		<!-- 取消保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;">取消</a>
			<a href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click='creatshop'>{{createOrupdata}}</a>
		</div>
		<!-- 弹窗 -->
		<!-- 业务类型 -->
		<business-win v-if="showWin" @getAppliedWin='getResult' :bussiness='bussiness' :bussinessselect='bussinessselect'></business-win>
		<!-- 城市选择 -->
		<city-win v-if="cityWin" @getCityWin='getCityResult' :cityInfo='cityInfo' :cityselects='cityselects'></city-win>
		<!-- 绑定门店 -->
		<store-win v-if="storeWin" @getStoreWin='getStoreResult'></store-win>
	</div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
import global from 'src/manager/global';

export default {
	data() {
		return {
			showWin: false, //业务类型的弹窗
			cityWin: false,
			storeWin: false,
			createShopName: '', //达达店铺名称
			areaName: '', //区域名称
			createShopAddress: '', //达达店铺地址
			creatShopPeople: '', //联系人姓名
			creatShopPhone: '', //联系方式
			creatShopIdcard: '', //身份证
			creatShopcoding: '', //门店编码
			creatShopaccount: '', //门店账号
			creatShoppassword: '', //门店密码
			bussiness: [], //业务类型列表
			bussinessselect: [], //业务选中的
			cityInfo: [], //城市列表
			cityselects: [], //城市选中的
			lat: '', //纬度
			lng: '', //经度
			sourceId: '', //商户Id
			result: 0,
			list: [
				{
					name: '下线',
					id: 0
				},
				{
					name: '激活',
					id: 1
				}
			],
			updata: false, //是否更新
			createOrupdata: '创建店铺',
			shopInfomation: '' //店铺的信息
		};
	},
	methods: {
		haveIndex(i) {
			this.result = i;
		},
		getResult: function(res, item) {
			//选择业务类型
			if (res == 'ok') {
				this.bussinessselect = item;
			}
			this.showWin = false;
		},
		getCityResult: function(res, item) {
			//获取城市配置
			if (res == 'ok') {
				this.cityselects = item;
			}
			this.cityWin = false;
		},
		getStoreResult: function(res) {
			if (res == 'ok') {
				this.getDadaShopInfo();
				// this.pullConfiguration();
			}
			this.storeWin = false;
		},
		openbusiness: function() {
			this.showWin = true;
		},
		opencity: function() {
			this.cityWin = true;
		},
		pullConfiguration: function() {
			//拉取门店配置
			let localshop = this.localshopInfo;
			this.createShopName = localshop.shopName; //店铺名称
			this.createShopAddress = localshop.address; //地址
			this.creatShopPeople = localshop.contactMan; //联系人姓名
			this.creatShopPhone = localshop.telephone; //电话
			this.creatShopcoding = localshop.shopNumber; //门店编号
			this.creatShopaccount = localshop.appId; //appId
			this.creatShoppassword = localshop.appSecret; //app密码
		},
		bindingStore: function() {
			//绑定门店
			this.storeWin = true;
		},
		checkForm: function() {
			if (
				!global.checkData(
					{
						createShopName: '店铺名称不能为空！',
						bussinessselect: {
							cond: '$$.length != 0',
							pro: '请选择业务类型'
						},
						cityselects: {
							cond: '$$.length != 0',
							pro: '请选择城市'
						},
						areaName: '区域名称不能为空！',
						createShopAddress: '店铺地址不能为空！',
						creatShopPeople: '联系人姓名不能为空！',
						creatShopPhone: {
							reg: /^1[\d]{10,10}$/,
							pro: '联系方式不符合规范,应为1开头的11位数字'
						}
					},
					this
				)
			)
				return;
			return true;
		},
		async getDadaShopInfo() {
			let data = await http.getDadaShopInfo({
				data: {}
			});
			if (data == false) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: '当前店铺未注册商户Id,请前往注册商户Id'
				});
				return false;
			}
			if (data) {
				this.shopInfomation = data.configData; //达达门店信息
				this.localshopInfo = data.shopInfo; //本地店铺信息
				if (data.configData.shopName != '') {
					this.updata = true;
					this.createOrupdata = '更新店铺';
				}
				this.bussiness = [];
				for (let key in data.business) {
					this.bussiness.push({
						name: data.business[key],
						id: key
					});
				} //获取任务类型
				this.cityInfo = data.cityInfo; //城市列表
				if (data.shopInfo.position == '') {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请前去店铺配置完善经纬度信息'
					});
					return false;
				} else {
					this.lat = data.shopInfo.position.split(',')[1]; //经度
					this.lng = data.shopInfo.position.split(',')[0]; //纬度
				}
				this.sourceId = data.configData.sourceId; //商户Id
				if (this.updata) {
					let shopInfo = this.shopInfomation;
					this.result = Number(shopInfo.status);
					this.createShopName = shopInfo.shopName;
					this.bussinessselect = [];
					this.bussinessselect.push(shopInfo.businessType);
					this.getbussName('1');
					this.areaName = shopInfo.area;
					this.createShopAddress = shopInfo.shopAddress;
					this.creatShopPeople = shopInfo.contactName;
					this.creatShopPhone = shopInfo.shopPhone;
					this.creatShopcoding = shopInfo.shopCoding;
					this.creatShopIdcard = shopInfo.idCard; //身份证
					this.creatShopaccount = shopInfo.appId; //appId
					this.creatShoppassword = shopInfo.appPwd; //app密码
					for (let item of this.cityInfo) {
						if (shopInfo.city + '市' == item.cityName) {
							this.cityselects = [];
							this.cityselects.push(item.cityCode);
							this.getbussName('2');
						}
					}
				}
			}
		},
		getbussName: function(type) {
			//获取业务类型的名称
			let bussname = '';
			if (type == '1') {
				for (let item of this.bussiness) {
					if (item.id == this.bussinessselect[0]) {
						bussname = item.name;
					}
				}
			} else {
				for (let item of this.cityInfo) {
					if (item.cityCode == this.cityselects[0]) {
						bussname = item.cityName;
					}
				}
			}
			return bussname;
		},
		creatshop: function() {
			//创建店铺
			if (!this.checkForm()) return;
			this.addOrUpdateDadaConfig();
		},
		async addOrUpdateDadaConfig() {
			let data = await http.addOrUpdateDadaConfig({
				data: {
					shopName: this.createShopName, //店铺名称
					businessType: this.bussinessselect[0], //任务
					city: this.getbussName('2'), //城市列表
					area: this.areaName, //区域名称
					shopAddress: this.createShopAddress, //门店地址
					contactName: this.creatShopPeople, //联系人姓名
					shopPhone: this.creatShopPhone, //联系人方式
					shopCoding: this.creatShopcoding, //门店编码
					idCard: this.creatShopIdcard, //联系人身份证
					appId: this.creatShopaccount, //app账号
					appPwd: this.creatShoppassword, //app密码
					status: this.updata ? this.result : '',
					lat: this.lat, //经度
					lng: this.lng, //纬度
					sourceId: this.sourceId //商户Id
				}
			});
			if (data == true) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: `${this.createOrupdata}成功`
				});
				this.getDadaShopInfo();
			} else {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alter',
					content: `${data}`
				});
			}
		}
	},
	watch: {},
	components: {
		win: () => import(/* webpackChunkName: 'win' */ 'src/components/win'),
		'business-win': () =>
			import(/* webpackChunkName: 'business_win' */ './business_win'),
		'city-win': () =>
			import(/* webpackChunkName: 'city_win' */ './city_win'),
		'store-win': () =>
			import(/* webpackChunkName: 'city_win' */ './bingdingStore_win'),
		singleSelect: () =>
			import(/*webpackChunkName: 'mul_select'*/ 'src/components/single_select')
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '拉取门店配置',
				className: ['userLabel'],
				fn: () => {
					this.pullConfiguration();
				}
			},
			{
				name: '绑定门店',
				className: ['userLabel'],
				fn: () => {
					this.bindingStore();
				}
			}
		]);
		this.getDadaShopInfo();
	}
};
</script>
<style type="text/css" scoped>
#distribution .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}
#distribution .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}
#distribution .online-box .inp {
	width: 208px;
	height: 40px;
	text-indent: 10px;
}
#distribution .online-box .getname {
	font-size: 14px;
	line-height: 40px;
	color: #a5a5a5;
}
#distribution .clearfix::before,
#distribution .clearfix::after {
	display: table;
	content: “”;
}
#distribution .clearfix::after {
	clear: both;
}
</style>