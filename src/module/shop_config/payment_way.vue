/**
 * @Author: 孔伟研 
 * @Date: 2018-09-19 11:39:01 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-21 10:51:10
 * @Module:支付方式配置
**/
<template>
	<section num="app" id="paymentWay" v-cloak>
		<section v-if="!showZX" style="max-width:1240px;">
			<!-- 添加原因的button-->
			<section style="margin-bottom: 15px;">
				<el-button @click="addpay" type="primary" icon="el-icon-plus">添加支付方式</el-button>
				<div v-if="ischain == 1 || ischain == 2" class="topBox">
					<span>
						<i></i>品牌指派</span>
					<span>
						<i></i>门店自建</span>
				</div>
			</section>
			<!-- <section style="padding:10px 0;color:#606266;">
				<span>微信支付使用偏向</span>
				<el-button @click="selectwxpay" size="small" type="primary" style="margin:0 10px;">支付配置</el-button>
				<span style="color:#ccc;">当前配置：</span>
				<span style="color:#ccc;">{{wxpayName}}</span>
			</section> -->
			<el-table :data="payNameList" border style="width: 100%;margin:20px 0;" stripe>
				<el-table-column label="操作" align="center" :width="220" style="text-aline:center;" fixed>
					<template slot-scope="scope">
						<div v-if="scope.row.isOperation==1" class="btn">
							<span @click="modifyBtn(scope.$index,scope.row)" class="isBrandColor">编辑</span>
							<span v-if="scope.row.isOpen ==0" class="line isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">开启</span>
							<span v-if="scope.row.isOpen == 1" class="line isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">关闭</span>
							<span v-if="scope.row.id >= 10000" style="color:#F56C6C" class="line" @click="deletePayment(scope.row,scope.$index)">删除</span>
						</div>
						<section v-else>
							<div v-if="scope.row.paymentName == '会员支付'">不可操作</div>
							<div v-else class="btn">
								<template v-if="scope.row.paymentName == '微信' || scope.row.paymentName == '支付宝' || scope.row.paymentName == '中信银行'|| scope.row.paymentName == '中信银行(上海)'|| scope.row.paymentName == '点佰趣'|| scope.row.paymentName == '农行支付'|| scope.row.paymentName == '网易严选支付'|| scope.row.paymentName == '旺POS支付'" class="editInfo">
									<span @click="modifyBtn(scope.$index,scope.row)" class="isBrandColor">编辑</span>
									<span v-if="scope.row.isOpen == 0" class="line isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">开启</span>
									<span v-if="scope.row.isOpen == 1" class="line isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">关闭</span>
								</template>
								<template v-if="scope.row.paymentName == '现金' || scope.row.paymentName == '银行卡' ">
									<span v-if="scope.row.isOpen == 0" class="isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">开启</span>
									<span v-if="scope.row.isOpen == 1" class="isBrandColor" @click="isOpenDetial(scope.$index,scope.row)">关闭</span>
								</template>
								
							</div>
						</section>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span v-if="scope.row.isOpen == '0'">已关闭</span>
						<span v-if="scope.row.isOpen == '1'">已开启</span>
					</template>
				</el-table-column>
				<el-table-column label="支付方式" align="center" prop="paymentName">
					<template slot-scope="scope">
						<template v-if="ischain=='0'">
							<span>{{scope.row.paymentName}}</span>
						</template>
						<template v-if="ischain!='0'">
							<span v-if="scope.row.isAssign == '1'" style="color:#f8931f">{{scope.row.paymentName}}</span>
							<span v-if="scope.row.isAssign == '0'" style="color:#2ea7e0">{{scope.row.paymentName}}</span>
						</template>
					</template>
				</el-table-column>
				<el-table-column label="入实收账" align="center" prop="creator">
					<template slot-scope="scope">
						<span v-if="scope.row.isBill=='1'">是</span>
						<span v-else>否</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" align="center" prop="sort"></el-table-column>
			</el-table>
			<payWayWin v-if="showWin" @payWayWin="getResult" :detial='detial' :types="types"></payWayWin>
		</section>
		<zxBandWin v-if="showZX" @zxBandWin="newGetResult" :config="detial.payConfig" :types="types"></zxBandWin>
		<selectRadioWin v-if="isOpenwx" @selectRadioWin ="radioBack" :list = "payNameList" :name ="'paymentName'" :selectIndex ="wxIndex" :title = "'选择微信支付使用偏向'"></selectRadioWin>
	</section>
</template>

<script>
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			payNameList: [], //列表
			num: 1, //排序
			payNameId: '', //支付方式id
			payName: '', //支付名称
			isBill: 1, //传isBill值，默认为1 入账
			isOperation: true, // 是否可以对这条记录操作 true 1 是
			merId: '',
			isIndependent: '',
			showWin: false,
			types: 'add',
			detial: { paymentName: '', isBill: true, sort: '1' },
			showZX: false, //中信
			userId: '', //用户id
			index: -1, //所选支付方式下标
			ischain: 0, //判断品牌门店
			isOpenwx:false,//微信支付偏向弹窗
			wxIndex:0,
			wxpayName:'',
		};
	},
	components: {
		payWayWin: () =>
			import(/* webpackChunkName:"pay_way_win" */ 'src/module/shop_config/pay_way_win'),
		zxBandWin: () =>
			import(/* webpackChunkName:"zx_band_win" */ 'src/module/shop_config/zx_band_win'),
		selectRadioWin: () =>import(/*webpackChunkName: "select_radio_win"*/ 'src/components/select_radio_win')
		
	},
	mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.userId = userData.user.id;
		this.inte();
	},
	methods: {
		radioBack(res,item){
			if(res == 'ok'){
				this.wxIndex = item.index;
				this.wxpayName = item.name;
				// console.log(item);
				// this.setMainTerminal(item);
			}
			this.isOpenwx = false;
		},
		//设置微信支付偏向
		selectwxpay(){
			this.isOpenwx = true;
		},
		//接收弹窗传递的内容数据
		getResult: function(res, detial) {
			if (res == 'ok') {
				if (this.isOk(detial)) {
					let obj = {};
					obj.createUid = this.userId;
					obj.isOpen = '1'; //默认开启
					obj.paymentId = detial.id;
					obj.paymentName = detial.paymentName;
					obj.sort = detial.sort;
					if (detial.paymentName == '支付宝') {
						obj.alipayrsaPublicKey =
							detial.payConfig.alipayrsaPublicKey; //支付宝公钥
						obj.rsaPrivateKey = detial.payConfig.rsaPrivateKey; //支付宝RSA私钥
						obj.appId = detial.payConfig.appId; //支付宝应用id
						obj.signType = detial.payConfig.signType; //支付宝商户类型
						this.editPayConfig(obj);
					} else if (detial.paymentName == '微信') {
						obj.appid = detial.payConfig.appid; //微信appid
						obj.minAppId = detial.payConfig.minAppId; //微信小程序AppId
						obj.mchid = detial.payConfig.mchid; //支付宝应用id
						obj.key = detial.payConfig.key; //支付宝商户类型
						obj.appSecret = detial.payConfig.appSecret; //支付宝商户类型
						obj.apiclient_key = detial.payConfig.apiclient_key; //支付宝商户类型
						obj.apiclient_cert = detial.payConfig.apiclient_cert; //支付宝商户类型
						this.editPayConfig(obj);
					} else if (detial.paymentName == '中信银行') {
						//若为中信银行则跳转到中信银行表单页面
						this.showZX = true;
					} else if (detial.paymentName == '点佰趣') {
						obj.businessNum = detial.payConfig.businessNum; //点佰趣-商户编号
						// obj.organizationNum = detial.payConfig.organizationNum;//点佰趣-组织编号
						this.editPayConfig(obj);
					}else if (detial.paymentName == '网易严选支付') {
						obj.appId = detial.payConfig.appId; //
						obj.productId = detial.payConfig.productId; //
						obj.key = detial.payConfig.key; //
						this.editPayConfig(obj);
					}else if (detial.paymentName == '农行支付') {
						obj.mid = detial.payConfig.mid; //
						obj.tid = detial.payConfig.tid; //
						obj.instMid = detial.payConfig.instMid; //
						obj.msgSrc = detial.payConfig.msgSrc; //
						obj.msgSrcId = detial.payConfig.msgSrcId; //
						obj.md5Key = detial.payConfig.md5Key; //
						this.editPayConfig(obj);
					} else if (detial.paymentName == '中信银行(上海)') {
						obj.mchId = detial.payConfig.mchId;//商户号
						obj.privateRsaKey = detial.payConfig.privateRsaKey;//客户私钥
						obj.publicRsaKey = detial.payConfig.publicRsaKey;//中信公钥
						this.editPayConfig(obj);
					}else if (detial.paymentName == '旺POS支付') {
						obj.mcode = detial.payConfig.mcode; //旺POS门店编号
						obj.appKey = detial.payConfig.appKey; //
						obj.appSecret = detial.payConfig.appSecret; //
						this.editPayConfig(obj);
					}  else {
						obj.isBill = detial.isBill ? 1 : 0;
						if (this.types == 'add') {
							this.addPayment(obj);
						} else {
							this.editPayment(obj);
						}
					}
					this.showWin = false;
				} else {
					this.showWin = true;
					return;
				}
			} else {
				this.showWin = false;
			}
		},
		//从中信表格返回
		newGetResult: function() {
			this.showWin = false;
			this.showZX = false;
			this.$store.commit('setPageTools', []);
			this.inte();
		},
		//初始化获取支付列表
		async inte() {
			let arr = await http.getPaymentList({ data: {} });
			// arr.sort(this.paySort('sort'));
			utils.sortByAll(arr,'sort');
			this.payNameList = arr;
		},
		//修改微信、支付宝
		async editPayConfig(item) {
			await http.editPayConfig({ data: item });
			this.inte();
			// this.payNameList = await http.getPaymentList({ data: {} });
		},
		//添加支付方式
		async addPayment(item) {
			await http.addPayment({ data: item });
			this.inte();
			// this.payNameList = await http.getPaymentList({ data: {} });
		},
		//修改其它支付方式
		async editPayment(item) {
			await http.editPayment({ data: item });
			this.inte();
			// this.payNameList = await http.getPaymentList({ data: {} });
		},
		deletePayment(item,index){
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '是否删除"'+item.paymentName +'"',
				callback: delRes => {
					if (delRes == 'ok') {
						this.delPayment(item.id,index);
					}
				}
			});
		},
		//删除支付方式
		async delPayment(id,index){
			await http.deletePayment({data: {paymentId: id}});
			this.payNameList.splice(index,1);
		},
		//增加支付方式
		addpay: function() {
			this.types = 'add';
			this.detial = { paymentName: '', isBill: true, sort: '1' };
			this.showWin = true;
		},
		//修改编辑支付方式
		async modifyBtn(index, bill) {
			let data = {
				paymentId: bill.trueId ? bill.trueId : bill.id
			};
			if (bill.paymentName == '中信银行' && bill.id == '6') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (this.detial.payConfig) {
					if (this.detial.payConfig.secMerId) {
						this.detial.payConfig = this.detial.payConfig;
					}
				} else {
					//设置没申请时默认的字段
					this.detial.payConfig = {};
					this.detial.payConfig.merId = '';
					this.detial.payConfig.isIndependent = '';
				}
				this.types = 'zxBand';
			} else if (bill.paymentName == '微信') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.mchid = '';
					this.detial.payConfig.key = '';
					this.detial.payConfig.appSecret = '';
					this.detial.payConfig.apiclient_key = '';
					this.detial.payConfig.apiclient_cert = '';
					this.detial.payConfig.appid = ''; //微信的是appid,支付宝的为appId
				}
				this.types = 'wx';
			} else if (bill.paymentName == '支付宝') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.alipayrsaPublicKey = '';
					this.detial.payConfig.rsaPrivateKey = '';
					this.detial.payConfig.appId = ''; //微信的是appid,支付宝的为appId
					this.detial.payConfig.signType = 'RSA';
				}
				this.types = 'zfb';
			} else if (bill.paymentName == '点佰趣') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.businessNum = ''; //商户编号
					this.detial.payConfig.organizationNum = ''; //组织编号
				}
				this.types = 'dbq';
			} else if (bill.paymentName == '网易严选支付') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.appId = ''; 
					this.detial.payConfig.productId = ''; //
					this.detial.payConfig.key = ''; //
				}
				this.types = 'wyyx';
			} else if (bill.paymentName == '农行支付') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.mid = ''; 
					this.detial.payConfig.tid = '';
					this.detial.payConfig.instMid = '';
					this.detial.payConfig.msgSrc = ''; 
					this.detial.payConfig.msgSrcId = ''; 
					this.detial.payConfig.md5Key = ''; 
				}
				this.types = 'nhzf';
			} else if (bill.paymentName == '中信银行(上海)') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (!this.detial.payConfig||this.detial.payConfig.length==0) {
					//设置没申请时默认的字段
					this.detial.payConfig = {};
					this.detial.payConfig.mchId = '';//商户号
					this.detial.payConfig.privateRsaKey = '';//客户私钥
					this.detial.payConfig.publicRsaKey = '';//中信公钥
				} else {
					if (this.detial.payConfig.secMerId) {
						this.detial.payConfig = this.detial.payConfig;
					}
				}
				this.types = 'SHzxBand';
			} else if (bill.paymentName == '旺POS支付') {
				//获取支付方式详情
				this.detial = await http.getWeixinAlipay({ data: data });
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					// obj.mcode = detial.payConfig.mcode; //旺POS门店编号
					// 	obj.appKey = detial.payConfig.appKey; //
					// 	obj.appSecret = detial.payConfig.appSecret; //
					this.detial.payConfig.mcode = ''; 
					this.detial.payConfig.appKey = '';
					this.detial.payConfig.appSecret = '';
				}
				this.types = 'wPos';
			}else{
				this.detial=await http.getPaymentById({data:data});
				this.types = 'edit';
			}
			this.showWin = true;
		},
		//查看特殊支付方式详情接口
		async getWeixinAlipay(bill) {
			let data = {
				paymentId: bill.id
			};
			this.detial = await http.getWeixinAlipay({ data: data });
		},
		//查看支付方式详情接口
		async getPaymentById(bill) {
			let data = {
				paymentId: bill.id
			};
			this.detial = await http.getPaymentById({ data: data });
		},
		//开启、关闭支付方式接口
		async updatePaymentStatus(bill) {
			let data = {
				paymentId: bill.trueId ? bill.trueId : bill.id,
				isOpen: bill.isOpen == 0 ? 1 : 0
			};
			let aaa = await http.updatePaymentStatus({ data: data });
			if (!aaa) {
				this.$store.commit('setWin', {
					title: '提示',
					winType: 'alert',
					content: '请先配置此支付方式信息！'
				});
				return false;
			}
			this.inte();
			// this.payNameList = await http.getPaymentList({ data: {} });
		},
		//开启、关闭支付方式
		isOpenDetial: function(index, bill) {
			let title = bill.isOpen == 0 ? '确认开启' : '确认关闭';
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: title,
				callback: delRes => {
					if (delRes == 'ok') {
						this.updatePaymentStatus(bill);
					}
				}
			});
		},
		paySort: function(key) {
			return function(a, b) {
				let value1 = parseInt(a[key]);
				let value2 = parseInt(b[key]);
				if (value1 > value2) {
					return 1;
				} else if (value1 < value2) {
					return -1;
				} else {
					return 0;
				}
			};
		},
		//判断输入的数据是否符合规范
		isOk: function(detial) {
			if (detial.paymentName == '微信'&&detial.payConfig!='') {
				// let appid = detial.payConfig.appid;
				if (
					!global.checkData(
						{ appid: '微信APPID不能为空' },
						detial.payConfig
					)
				)
					return false;
				// let mchid = detial.payConfig.mchid;
				if (
					!global.checkData(
						{ mchid: '商户号不能为空' },
						detial.payConfig
					)
				)
					return false;
				// let key = detial.payConfig.key;
				if (
					!global.checkData(
						{ key: '商户支付密钥不能为空' },
						detial.payConfig
					)
				)
					return false;
				// let appSecret = detial.payConfig.appSecret;
				if (
					!global.checkData(
						{ appSecret: '微信appSecret不能为空' },
						detial.payConfig
					)
				)
					return false;
				let apiclient_cert = detial.payConfig.apiclient_cert;
				if (
					!global.checkData(
						{ apiclient_cert: '证书（cert）不能为空' },
						detial.payConfig
					)
				)
					return false;
				if (apiclient_cert !== '') {
					if (splitkey(apiclient_cert) != 'BEGIN CERTIFICATE') {
						this.$store.commit('setWin', {
							title: '提示',
							winType: 'alert',
							content: '证书cert传错了'
						});
						return false;
					}
				}
				let apiclient_key = detial.payConfig.apiclient_key;
				if (
					!global.checkData(
						{ apiclient_key: '证书密钥（key）不能为空' },
						detial.payConfig
					)
				)
					return false;
				if (apiclient_key !== '') {
					if (
						splitkey(apiclient_key) != 'BEGIN PRIVATE KEY' ||
						splitkey(apiclient_key) == undefined
					) {
						this.$store.commit('setWin', {
							title: '提示',
							winType: 'alert',
							content: '证书密钥（key）传错了'
						});
						return false;
					}
				}
			} else if (detial.paymentName == '支付宝'&&detial.payConfig!='') {
				// let alipayrsaPublicKey = detial.payConfig.alipayrsaPublicKey;
				if (
					!global.checkData(
						{ alipayrsaPublicKey: '支付宝公钥不能为空' },
						detial.payConfig
					)
				)
					return false;
				// let rsaPrivateKey = detial.payConfig.rsaPrivateKey;
				if (
					!global.checkData(
						{ rsaPrivateKey: 'RSA私钥不能为空' },
						detial.payConfig
					)
				)
					return false;
				// let appId = detial.payConfig.appId;
				if (
					!global.checkData(
						{ appId: '支付宝应用ID不能为空' },
						detial.payConfig
					)
				)
					return false;
			} else if (detial.paymentName == '点佰趣') {
				// let businessNum = detial.payConfig.businessNum;
				if (
					!global.checkData(
						{ businessNum: '商户编号不能为空' },
						detial.payConfig
					)
				)
					return false;
			} else if (detial.paymentName == '网易严选支付') {
				// let businessNum = detial.payConfig.businessNum;
				if (
					!global.checkData(
						{ appId: '产品appId不能为空' },
						detial.payConfig
					)
				)
					return false;
				if(!global.checkData({productId:'产品号不能为空'},detial.payConfig))return false;
				if(!global.checkData({key:'产品密钥key不能为空'},detial.payConfig))return false;
			} else if (detial.paymentName == '农行支付') {
				if (!global.checkData({ mid: '商户号不能为空' },detial.payConfig))return false;
				if(!global.checkData({tid:'终端号不能为空'},detial.payConfig))return false;
				if(!global.checkData({instMid:'机构商户号不能为空'},detial.payConfig))return false;
				if(!global.checkData({msgSrc:'消息来源不能为空'},detial.payConfig))return false;
				if(!global.checkData({msgSrcId:'来源编号不能为空'},detial.payConfig))return false;
				if(!global.checkData({md5Key:'MD5密钥不能为空'},detial.payConfig))return false;
			}else if (detial.paymentName == '中信银行(上海)') {
				if (!global.checkData({ mchId: '商户号不能为空' },detial.payConfig))return false;
				if(!global.checkData({privateRsaKey:'客户私钥不能为空'},detial.payConfig))return false;
				if(!global.checkData({publicRsaKey:'中信公钥不能为空'},detial.payConfig))return false;
			}else if (detial.paymentName == '旺POS支付') {
				if (!global.checkData({ mcode: '旺POS门店编号不能为空' },detial.payConfig))return false;
				if(!global.checkData({appKey:'appKey不能为空'},detial.payConfig))return false;
				if(!global.checkData({appSecret:'appSecret不能为空'},detial.payConfig))return false;
			} else {
				if (
					!global.checkData(
						{ paymentName: '支付名称不能为空不能为空' },
						detial
					)
				)
					return false;
				for (let i = 0; i < this.payNameList.length; i++) {
					if (detial.paymentName == '中信银行') {
						return true;
					}
				}
			}
			//分割微信证书、证书密钥 字符串
			function splitkey(item) {
				if (item == '' || item == undefined) {
					return;
				} else {
					let vxkey = item.split('-');
					for (let i = 0; i < vxkey.length; i++) {
						if (vxkey[i] == '' || typeof vxkey[i] == 'undefined') {
							vxkey.splice(i, 1);
							i = i - 1;
						}
					}
					return vxkey[0];
				}
			}
			return true;
		}
	}
};
</script>

<style scoped>
.paymentWayContent {
	text-align: center;
}
.commonLi ul li {
	width: 25%;
	float: left;
}
.paymentWayContent:nth-of-type(odd) {
	background: #f2f2f2;
}
.paymentWayContent {
	height: 50px;
	line-height: 50px;
}
.editInfo {
	width: 100%;
	display: block;
	color: #fff;
}
.paymentWayTittle {
	background: #e6e6e6;
	height: 50px;
	line-height: 50px;
	text-align: center;
}
.topBox {
	height: 50px;
	line-height: 50px;
	padding-left: 20px;
	display: inline-block;
}
.topBox span {
	font-size: 16px;
	margin: 10px 20px;
}
.topBox span:nth-child(1) i {
	background: #f8931f;
}
.topBox span:last-child i {
	background: #2ea7e0;
}
.topBox i {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 8px;
	margin-right: 10px;
	vertical-align: middle;
}
.isBrandColor {
	color: #2ea7e0;
}
.isShopColor {
	color: #f8931f;
}
.line{
	border-left: 1px solid #ccc;
}
.btn span{
	display: inline-block;
	padding: 0 15px;
	cursor: pointer;
}
</style>

