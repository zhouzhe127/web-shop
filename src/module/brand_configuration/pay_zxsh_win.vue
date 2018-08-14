<!--
	**店铺配置——支付方式——弹窗
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<section id="payZXSH">
		<el-radio-group v-model="tabPosition" style="margin-bottom: 10px;">
			<el-radio-button label="0">支付配置</el-radio-button>
			<el-radio-button label="1">转账配置</el-radio-button>
			<el-radio-button label="2">分账帐号配置</el-radio-button>
		</el-radio-group>
		<section v-if="tabPosition=='0'">
			<div class="content-box">
				<div class="content-title">
					<span class="titles">支付配置</span>
				</div>
			</div>
			<div class="payShowList">
				<h3 class="showListBefore">商户号</h3>
				<el-input v-model="detial.payConfig.mchId" placeholder="请输入商户号" maxlength = "32" class="inputWidth"></el-input>
			</div>
			<div class="payShowList">
				<h3 class="showListBefore">客户私钥</h3>
				<el-input v-model="detial.payConfig.privateRsaKey" placeholder="请输入私钥" class="inputWidth"></el-input>
			</div>
			<div class="payShowList">
				<h3 class="showListBefore">中信公钥</h3>
				<el-input v-model="detial.payConfig.publicRsaKey" placeholder="请输入公钥" class="inputWidth"></el-input>
			</div>
			<el-button type="primary" @click="editPayConfig" style="width:150px;">保存</el-button>
		</section>
		<section v-if="tabPosition=='1'">
			<div class="content-box">
				<div class="content-title">
					<span class="titles">转账配置</span>
				</div>
			</div>
			<div class="payShowList">
				<h3 class="showListBefore">登录名</h3>
				<el-input v-model="payConfigDet.userName" maxlength = "30" class="inputWidth"></el-input>
			</div>
			<div class="payShowList">
				<h3 class="showListBefore">付款帐号</h3>
				<el-input v-model="payConfigDet.payAccountNo" maxlength = "19" class="inputWidth"></el-input>
			</div>
			<el-button @click="updatePayAccount" type="primary" style="width:150px;">保存</el-button>
		</section>
		<section v-if="tabPosition=='2'" style="min-width: 760px;">
			<div class="content-box">
				<div class="content-title">
					<span class="titles">分账帐号配置</span>
				</div>
			</div>
			<div class="content-box">
				<el-radio-group v-model="isType" @change = "chiceShop">
					<el-radio-button label="0">全部</el-radio-button>
					<el-radio-button label="1">直营店</el-radio-button>
					<el-radio-button label="2">加盟店</el-radio-button>
				</el-radio-group>
			</div>
			<div class="content-box">
				<section style="width:235px;margin-bottom: 10px;">
					<el-input placeholder="请输入店铺名称" @change="secShop" v-model="inSe" clearable class="input-with-select" >
						<el-button slot="append" icon="el-icon-search" @click="secShop"></el-button>
					</el-input>
				</section>
				<section class="shopBox">
					<div  class="shopLine" :style="{background:onIndex==index?'#f2f2f2':'#fff'}" @click="getShopDetial(item,index)" v-for="(item,index) in shopsList" :key="index">
						<span :style="{color:item.selected?'#409EFF':'#333'}" :title="item.shopName">{{item.shopName}}</span>
						<i v-if="item.selected" class="el-icon-check" style="color:#409EFF;"></i>
					</div>
					<div class="shopLine" style="text-align: center;padding: 0;color: #E6A23C;" v-if="shopsList.length == 0">无店铺</div>
				</section>
				<section class="shopBox" style="margin-left:20px;width:70px;height:295px;border:none;">
					<div class="fi fi-arrow-right fi-2x" style="margin: 80px 20px;color: #aba2a2;" ></div>
				</section>
				<section class="shopBox" style="margin-left:20px;width:400px;border:none;">
					<el-form :model="shopDetial" :rules="rules" ref="shopDetial" label-width="140px">
						<el-form-item label="收款帐号" prop="recAccountNo">
							<el-input v-model="shopDetial.recAccountNo" maxlength = "32" placeholder = "请输入收款帐号" style = "width:250px;"></el-input>
						</el-form-item>
						<el-form-item label="收款账户名称" prop="recAccountName">
							<el-input v-model="shopDetial.recAccountName" maxlength = "50" placeholder = "请输入收款账户名称" style = "width:250px;"></el-input>
						</el-form-item>
						<el-form-item label="收款账户开户行联行网点号" prop="recOpenBankCode" :style="{'lineHeight':'20px'}">
							<el-input v-model="shopDetial.recOpenBankCode" maxlength = "12" placeholder = "请输入收款账户开户行联行网点号" style = "width:250px;"></el-input>
						</el-form-item>
					</el-form>
					<el-button @click="keepUp" type="primary" style="width:150px;margin-left:120px;">保存</el-button>
				</section>
			</div>
		</section>
	</section>
</template>
<script>
// import global from 'src/manager/global';
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			tabPosition: '0',
			isType:'0',//全部直营加盟下标label值
			payConfigDet:{},//支付配置
			payConfigList:[],//分账账户列表
			shopsList:[],//店铺列表
			oldShopsList:[],//店铺列表-筛选用
			shopDetial:{},//店铺信息
			onIndex:0,//点中店铺的下标
			rules: {
				recAccountNo: [
					{ required: true, message: '请输入收款帐号', trigger: 'blur' },
				],
				recAccountName: [
					{ required: true, message: '请输入收款账户名称', trigger: 'blur' }
				],
				recOpenBankCode: [
					{ required: true, message: '请输入收款账户开户行联行网点号', trigger: 'blur' },
				],
			},
			inSe:'',//搜索店铺名
		};
	},
	async mounted() {
		this.shopsList = storage.session('shopList');
		this.oldShopsList = storage.session('shopList');
		this.init();
		this.$store.commit('setPageTools', [{name: '返回',className: ['wearhouse', 'create'],fn: this.back}]);
	},
	props:{
		detial:Object,//中信上海支付信息
	},
	methods: {
		//搜索店铺
		secShop(){
			this.chiceShop();
		},
		back(){
			this.$emit('payZXSHWin', 'back');
		},
		async init(){
			this.payConfigDet = await http.getPayAccount({data:{}});
			this.payConfigList = await http.getRecAccountList({data:{}});
			if(this.payConfigDet.length == 0){
				this.payConfigDet = {userName:'',payAccountNo:''};
			}
			for(let i=0;i<this.oldShopsList.length;i++){
				let item = this.oldShopsList[i];
				this.$set(item, 'selected', false);
				for(let j=0;j<this.payConfigList.length;j++){
					if(item.id == this.payConfigList[j].shopId){
						item.selected = true;
					}
				}
			}
			this.shopsList =this.oldShopsList;
			this.getShopDetial(this.shopsList[0],0);
		},
		//直营加盟筛选
		chiceShop(){
			let arr =this.oldShopsList;
			let list = [];//加盟直营切换后的数组
			for(let i=0;i<arr.length;i++){
				if(this.isType == arr[i].ischain){
					list.push(arr[i]);
				}
			}
			if(this.isType=='0'){
				list = arr;
			}
			let newList = [];//按搜索框搜索后的数组
			for(let i=0;i<list.length;i++){
				if(list[i].shopName.indexOf(this.inSe)==-1){
					continue;
				}
				newList.push(list[i]);
			}
			this.shopsList = newList;
			this.getShopDetial(this.shopsList[0],0);
		},
		//获取店铺配置的信息
		getShopDetial(item,index){
			this.onIndex = index;
			this.shopDetial = {
				subShopId: item.id,
				recAccountNo: '',
				recAccountName: '',
				recOpenBankCode: ''
			}
			for(let j=0;j<this.payConfigList.length;j++){
				if(item.id == this.payConfigList[j].shopId){
					this.shopDetial = this.payConfigList[j];
					this.shopDetial.subShopId = item.id;
					return;
				}
			}
		},
		//支付配置保存
		async editPayConfig(){
			let item = this.detial.payConfig;
			item.paymentName = '中信银行(上海)';
			item.paymentId = this.detial.id;
			if(item.mchId.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'商户号不能为空'});
				return false;
			}
			let nameReg = /^[\d]/;
			if(item.publicRsaKey.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'客户私钥不能为空'});
				return false;
			}
			if(item.privateRsaKey.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'中信公钥不能为空'});
				return false;
			}
			let res = await http.editPayConfig({data:item});
			if(res){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'配置成功'});
			}
		},
		//转账配置保存
		async updatePayAccount(){
			let item = this.payConfigDet;
			// item.paymentName = '中信银行(上海)';
			if(item.userName.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'登录名不能为空'});
				return false;
			}
			let nameReg = /^[\d]/;
			if(item.payAccountNo.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'付款帐号不能为空'});
				return false;
			}
			let res = await http.updatePayAccount({data:item});
			if(res){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'配置成功'});
			}
		},
		//分账账号配置保存
		keepUp(){
			this.updateRecAccount(this.shopDetial);
		},
		async updateRecAccount(item){
			if(item.recAccountNo.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'收款帐号不能为空'});
				return false;
			}
			let nameReg = /^[\d]/;
			if (item.recAccountNo !== '' && !nameReg.test(item.recAccountNo)) {
				this.$store.commit('setWin', {
					content: '收款帐号格式错误,只能为数字'
				});
				return false;
			}
			if(item.recAccountName.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'收款账户名称不能为空'});
				return false;
			}
			if (item.recOpenBankCode !== '' && !nameReg.test(item.recOpenBankCode)) {
				this.$store.commit('setWin', {
					content: '开户行联行网点号格式错误,只能为数字'
				});
				return false;
			}
			if(item.recOpenBankCode.trim().length == 0){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'收款账户开户行联行网点号不能为空'});
				return false;
			}
			let res = await http.updateRecAccount({data:item});
			if(res){
				this.$store.commit('setWin',{title:'温馨提示', winType:'alter', content:'配置成功'});
				for(let i=0;i<this.oldShopsList.length;i++){
					if(this.shopDetial.subShopId == this.oldShopsList[i].id){
						this.oldShopsList[i].selected = true;
					}
				}
			}
		},
	},
	// watch:{
	// 	'isType':'chiceShop'
	// }
};
</script>

<style lang="less" scoped>
 #payZXSH {
	.payShowList {
		height: 50px;
		padding-left: 20px;
		margin-top: 20px;
		position: relative;
		.showListBefore {
			width: 70px;
			height: 40px;
			line-height: 40px;
			float: left;
			text-align: right;
			margin-right: 15px;
		}
		.showListBefore:after {
			content: '*';
			color: red;
			position: relative;
			top: 3px;
			right: -1px;
		}
		.input {
			border: 1px solid deepskyblue;
		}
		.inputWidth{
			width: 220px;
		}
	}
	.content-box {
		width: 100%;
		height: auto;
		margin-bottom: 15px;
		clear: both;
		overflow: auto;
		.content-title {
			position: relative;
			height: 40px;
			line-height: 40px;
			width: 710px;
			padding-left: 10px;
			.titles {
				position: absolute;
				z-index: 88;
				background-color: #ffffff;
			}
		}
		.content-title:before {
			content: '';
			position: absolute;
			left: 0;
			top: 10px;
			width: 2px;
			height: 20px;
			background-color: #2ea8dc;
		}
		.content-title:after {
			content: '';
			position: absolute;
			right: 0;
			top: 20px;
			border: 1px dashed #b3b3b3;
			width: 690px;
		}
	}
	.shopBox{
		width:250px;
		height: 300px;
		border:1px solid #ccc;
		float: left;
		overflow: auto;
		.shopLine{
			width: 100%;
			height: 40px;
			line-height: 40px;
			color: #333;
			padding-left: 15px;
			cursor: pointer;
			border-bottom: 1px solid #f1f1f1;
			overflow: hidden;
			vertical-align: middle;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>