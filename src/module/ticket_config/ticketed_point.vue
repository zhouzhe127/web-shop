/*
 * @Author: zhengu.jiang 
 * @Date: 2018-06-26 17:36:52 
 * @Module: {开票点管理} 
 */

<template>
	<div id="ticketed">
		<div class="set-line" v-if="!detail">
			<div class="title">新建开票点管理</div>
			<div class="line"></div>
		</div>
		<div class="main" v-if="!detail">
			<div class="name required">销方名称</div>
			<selectBtn @selOn="getDrop" :sorts="ticketList.map(v=>v.name)" :name="ticketName"></selectBtn>
		</div>
		<div class="main">
			<div class="name required">设备厂商</div>
			<selectBtn @selOn="getFirm" :sorts="firmList.map(v=>v.name)" :name="firmName"></selectBtn>
		</div>
		<div class="main">
			<div class="name required">设备号</div>
			<input type="text" maxlength="12" placeholder="请输入设备号" v-model="client.equipNum">
		</div>
		<div class="main">
			<div class="name required">税控盘密码</div>
			<input type="text" maxlength="8" placeholder="请输入税控盘密码" v-model="client.taxDiskPass">
		</div>
		<div class="main">
			<div class="name" :class="{'required': client.taxEquip == 1}">证书密码</div>
			<input type="text" maxlength="16" placeholder="请输入证书密码" v-model="client.certiCipher">
		</div>
		<!-- <div class="main">
			<div class="name">所在省市区</div>
			<addressLinkage @emit="getAddress" :province="area.province" :city="area.city" :area="area.area" :width="300"></addressLinkage>
		</div> -->
		<template v-if="!detail">
			<div class="main">
				<div class="name">联系地址</div>
				<input type="text" maxlength="50" placeholder="请输入联系地址" v-model="client.kpdz">
			</div>
			<div class="main">
				<div class="name">联系电话</div>
				<input type="text" maxlength="11" placeholder="请输入联系电话" v-model="client.kpdh">
			</div>
			<div class="main">
				<div class="name">开户银行</div>
				<input type="text" maxlength="100" placeholder="请输入开户银行" v-model="client.kpyh">
			</div>
			<div class="main">
				<div class="name">开户账号</div>
				<input type="text" maxlength="30" placeholder="请输入开户账号" v-model="client.kpyhzh">
			</div>
			<div class="main">
				<div class="name required">开票人</div>
				<input type="text" maxlength="8" placeholder="请输入开票人" v-model="client.clientDrawer">
			</div>
		</template>
		<template v-if="!detail">
			<div class="main" v-if="ischain == 3">
				<div class="name required">关联店铺</div>
				<div class="right">
					<a @click="showShopWin" href="javascript: ;" class="blue"><i class="fi fi-add fi-2x"></i>添加关联店铺</a>
					<span v-if="shop.shopName">已关联店铺：{{shop.shopName}}</span>
				</div>
			</div>
			<div class="set-line">
				<div class="title">其他配置</div>
				<div class="line"></div>
			</div>
			<div class="main">
				<div class="name">复核人</div>
				<input type="text" maxlength="8" placeholder="请输入复核人" v-model="client.clientReviewer">
			</div>
			<div class="main">
				<div class="name">收款人</div>
				<input type="text" maxlength="8" placeholder="请输入收款人" v-model="client.clientPayee">
			</div>
			<div class="main">
				<div class="name">终端SN</div>
				<input type="text" maxlength="8" placeholder="请输入终端SN" v-model="client.deviseSN">
			</div>
			<div class="main">
				<div class="name">终端密码</div>
				<input type="text" maxlength="8" placeholder="请输入终端密码" v-model="client.devisePSWD">
			</div>
			<div class="main">
				<div class="name">终端秘钥</div>
				<input type="text" maxlength="8" placeholder="请输入终端秘钥" v-model="client.deviseKEY">
			</div>
		</template>
		<div class="main foot">
			<div class="name"></div>
			<a href="javascript: ;" class="gray" @click="cancel">取消</a>
			<a href="javascript: ;" class="yellow" @click="save">保存</a>
		</div>
		<shopWin v-if="showShop" @shopsSelect="getShops" :shopIds="client.clientShopId" :isTitle = "'选择门店'" :isSingle="true"></shopWin>
	</div>
</template>
<script>
import global from 'src/manager/global';
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			ischain: '',
			ticketList: [],
			ticketName: '请选择销方名称',
			// ticketType: ['增值税专用发票','增值税普通发票','电子发票(增普)'],
			// ticketTypeNum: 0,
			area: {
				province: '',
				city: '',
				area: '',
				provinceName: '',
				cityName: '',
				areaName: '',
			},
			// brandList: [
			// 	{id:1, name: 'aa'},
			// 	{id:2, name: 'bb'},
			// 	{id:3, name: 'vv'}
			// ],
			// brandName: '请选择品牌',
			firmList:  [
				{id:1, name: '百旺'},
				{id:2, name: '航信'}
			],
			firmName: '请选择设备厂商',
			showShop: false,
			shopIds: '',
			shop: {
				id: '',
				shopName: ''
			}, //选中的店铺
			client: {
				type: '',
				identifier: '', //销方税号
				clientShopId: '', //选中的门店
				kpdz: '', //联系地址
				kpdh: '', //联系电话
				kpyh: '', //开户银行
				kpyhzh: '', //银行账号
				clientDrawer: '', //开票人
				taxEquip: '', //设备厂商
				equipNum: '', //设备号
				taxDiskPass: '', //税控盘密码
				certiCipher: '', //证书密码
				clientPayee: '', //收款人
				clientReviewer: '', //复核人
				deviseSN: '', //终端SN
				devisePSWD: '', //终端密码
				deviseKEY: '', //终端秘钥
			},
			
		};
	},
	watch: {
		client: {
			handler: function(val){
				val.kpdh = val.kpdh.replace(/[^\d-]/,'');
				val.kpyhzh = val.kpyhzh.replace(/[^\d\s]/,'');
			},
			deep: true
		}
		
	},
	components: {
		radioBtn: () => import ( /*webpackChunkName: 'radio_btn'*/ 'src/components/radio_btn'),
		// addressLinkage: () => import( /*webpackChunkName: 'address_linkage'*/ 'src/components/address_linkage'),
		selectBtn: () => import( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		shopWin: () => import( /*webpackChunkName: 'shops_select'*/ 'src/components/shops_select')
	},
	props: ['detail','dataList'],
	mounted(){
		this.ticketList = this.dataList;
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.$store.commit('setPageTools', []);
		// this.ticketPointGetlist();
		if(this.detail){
			for(let key in this.detail){
				this.client[key] = this.detail[key];
				if(key == 'sellName'){
					this.ticketName = this.detail.sellName;
				}
				if(key == 'clientNO'){
					this.client.clientShopId = this.detail.clientNO;
				}
				this.shop.shopName = this.detail.name;
				
			}
		}
	},
	methods: {
		//获取销方
		// async ticketPointGetlist(){
		// 	let data = await http.ticketPointGetlist();
		// 	this.ticketList = [];
		// 	for(let i = 0; i < data.length; i++){
		// 		this.ticketList.push(data[i].commData);
		// 	}
		// },
		//获取销方税号
		getDrop(res) {
			this.ticketName = this.ticketList[res].name;
			this.client.identifier = this.ticketList[res].identifier;
		},
		getFirm(res){
			this.client.taxEquip = this.firmList[res].id;
			this.firmName = this.firmList[res].name;
		},
		showShopWin(){
			this.showShop = true;
		},
		getShops(res,shopIds,shop){
			this.showShop = false;
			if(res == 'ok'){
				this.client.clientShopId = shopIds.substring(0,shopIds.length-1);
				this.shop = shop;
			}
		},
		async ticketSetInvoice(){
			this.detail ? this.client.type = '02' : this.client.type = '01';
			await http.ticketSetInvoice({data: this.client});
			this.$emit('ticket','ok');
		},
		save(){
			if(!global.checkData({identifier:'请选择销方'},this.client))return false;
			if(!global.checkData({taxEquip:'请选择设备厂商'},this.client))return false;
			if(!global.checkData({equipNum:'请输入设备号'},this.client))return false;
			if(!global.checkData({equipNum:{
				cond: '$$.length==12',
				pro: '设备号为12位'
			}},this.client))return false;
			if(!global.checkData({taxDiskPass:'请输入税控盘密码'},this.client))return false;
			if(this.client.taxEquip == 1){
				if(!global.checkData({certiCipher:'请输入证书密码'},this.client))return false;
			}
			if(this.ischain == 3 && !this.detail){
				if(!global.checkData({clientShopId:'请选择关联店铺'},this.client))return false;
			}
			// if(!this.seller){
			// if(!global.checkData({kpdz:'请输入联系地址'},this.client))return false;
			// if(!global.checkData({kpdh:'请输入联系电话'},this.client))return false;
			// if(!global.checkData({kpyh:'请输入开户银行'},this.client))return false;
			// if(!global.checkData({kpyhzh:'请输入银行账号'},this.client))return false;
			if(!this.detail){
				if(!global.checkData({clientDrawer:'请输入开票人'},this.client))return false;
				this.client.kpyhzh = this.client.kpyhzh.replace(/[^\d]/,'');
			}
			// this.client.kpdz = `${this.area.provinceName}${this.area.cityName}${this.area.areaName}${this.client.kpdz}`;
			// }
			// if(this.seller){
			// 	this.$emit('seller','ok',this.client);
			// }else{
			this.ticketSetInvoice();
			// }
			
		},
		cancel(){
			this.$emit('ticket', 'cancel');
		}
	},
};
</script>
<style lang="less" scoped>
	#ticketed{
		.set-line {
			width: 1000px;
			height: 28px;
			line-height: 28px;
			border-left: 4px solid #28a8e0;
			margin: 15px 0 35px;
			position: relative;
			.title {
				float: left;
				margin-left: 12px;
				width: 130px;
				font-size: 16px;
				text-align: left;
			}
			.line {
				display: inline-block;
				width: 700px;
				border-bottom: 1px dashed #d9d9d9;
				margin-bottom: 5px;
			}
		}
		.main{
			margin-bottom: 30px;
			.name{
				display: inline-block;
				width: 150px;
				text-align: right;
				font-size: 16px;
				margin-right: 10px;
			}
			.right{
				display: inline-block;
				vertical-align: middle;
				a{
					width: 150px;
					height: 39px;
					line-height: 39px;
					margin-right: 10px;
					i{
						vertical-align: middle;
						margin-right: 10px;
					}
				}
			}
			input{
				height: 38px;
				width: 300px;
				padding-left: 10px;
			}
		}
		.foot{
			margin-bottom: 200px;
			a{
				width: 200px;
				margin-right: 10px;
			}
		}
	}
</style>
