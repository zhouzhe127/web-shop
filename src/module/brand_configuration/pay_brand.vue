
<!--
	**品牌配置——品牌支付方式配置
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<section style="text-align:left;min-width:600px;" id="brandBase">
		<el-table v-if="!showZXSH" :data="payNameList" :header-cell-style="{'background-color':'#f5f7fa'}" border align="center">
			<el-table-column stripe label="操作" align="center">
				<template slot-scope="scope">
					<span style="color: #FE8D2C;cursor:pointer" @click="edit(scope.row,scope.$index)">编辑</span>
					<span style="padding:0 5px;color: #D2D2D2">|</span>
					<span style="color: #FD3F1F;cursor:pointer" @click="joinShop(scope.row,scope.$index)">指派</span>
					<span style="padding:0 5px;color: #D2D2D2">|</span>
					<span style="cursor:pointer;color: #2ea7e0;" v-if="scope.row.isOpen ==0" @click="isOpenDetial(scope.$index,scope.row)">开启</span>
					<span style="cursor:pointer;color: #2ea7e0;" v-if="scope.row.isOpen == 1" @click="isOpenDetial(scope.$index,scope.row)">关闭</span>
				</template>
			</el-table-column>
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.isOpen == '0'">已关闭</span>
					<span v-if="scope.row.isOpen == '1'">已开启</span>
				</template>
			</el-table-column>
			<el-table-column prop="paymentName" label="支付方式" align="center"></el-table-column>
		</el-table>
		<payWayWin v-if="showWin" @payWayWin="getResult" :detial='detial' :types="types"></payWayWin>
		<payZXSHWin v-if="showZXSH" @payZXSHWin="getZXSHResult" :detial='detial'></payZXSHWin>
		<!--<shopsWin-->
		<!--v-if="showShop"-->
		<!--@shopsSelect="getShopResult"-->
		<!--:shopIds="''" -->
		<!--:isTitle = "'选择指派门店'"-->
		<!--&gt;</shopsWin>-->
		<elShopListWin :shopIds="[]" @chooseShop="getShopResult" v-if="showShop"></elShopListWin>
	</section>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
export default {
	data() {
		return {
			titleList: [
				{ titleName: '操作' },
				{ titleName: '支付方式', dataName: 'paymentName' }
			],
			payNameList: [],
			showWin: false, //修改支付方式弹窗
			showShop: false, //指派店铺弹窗
			detial: null, //支付方式详情
			shopDetial: null, //指派店铺
			userId: '', //用户id
			types: 'add',
			showZXSH: false
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.userId = userData.user.id;
		this.inte();
	},
	components: {
		comTable: () =>
			import(/*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
		payWayWin: () =>
			import(/* webpackChunkName:'pay_way_win' */ 'src/module/shop_config/pay_way_win'),
		payZXSHWin: () =>
			import(/* webpackChunkName:'pay_zxsh_win' */ './pay_zxsh_win'),
		//			shopsWin: ()=> import( /* webpackChunkName:'shops_select' */ 'src/components/shops_select'),
		elShopListWin: () =>
			import(/* webpackChunkName:'el_shopList_win' */ 'src/components/el_shopList_win')
	},
	methods: {
		//修改添加支付方式返回
		getResult(res, detial) {
			if (res == 'ok') {
				if (this.isOk(detial)) {
					this.showWin = false;
					let obj = {};
					obj.createUid = this.userId;
					obj.isOpen = '1'; //默认开启
					obj.paymentId = detial.id;
					obj.sort = detial.sort;
					obj.paymentName = detial.paymentName;
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
					}
				} else {
					this.showWin = true;
					return;
				}
			}
			this.showWin = false;
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
		},
		//中信银行上海返回
		getZXSHResult(res) {
			if (res == 'back') {
				this.showZXSH = false;
				this.$store.commit('setPageTools', []);
			}
			this.inte();
		},
		//指派店铺返回
		async getShopResult(res, selectIds) {
			console.log(selectIds);
			if (res == 'ok') {
				if (selectIds.length == 0) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '请选择要指派的店铺'
					});
					return;
				}
				let arr = await http.paymentAssign({
					data: {
						shopIds: selectIds.join(','),
						paymentName: this.detial.paymentName
					}
				});
				if (arr) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: '指派成功'
					});
				}
			}
			this.showShop = false;
		},
		//初始化获取支付列表
		async inte() {
			this.payNameList = await http.getBrandPaymentList({ data: {} });
			this.payNameList.sort(this.paySort('sort'));
		},
		//修改编辑按钮点击
		async edit(bill) {
			let data = {
				paymentId: bill.trueId ? bill.trueId : bill.id
			};
			this.detial = await http.getWeixinAlipay({ data: data });
			if (bill.paymentName == '微信') {
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
				this.showWin = true;
			} else if (bill.paymentName == '支付宝') {
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
				this.showWin = true;
			} else if (bill.paymentName == '中信银行(上海)') {
				if (
					!this.detial.payConfig ||
					this.detial.payConfig.length == 0
				) {
					this.detial.payConfig = {};
					this.detial.payConfig.mchId = ''; //商户号
					this.detial.payConfig.privateRsaKey = ''; //客户私钥
					this.detial.payConfig.publicRsaKey = ''; //中信公钥
				}
				this.types = 'zxsh';
				this.showZXSH = true;
			}
		},
		//修改微信、支付宝
		async editPayConfig(item) {
			await http.editPayConfig({ data: item });
			this.payNameList = await http.getBrandPaymentList({ data: {} });
		},
		joinShop(item) {
			this.showShop = true;
			this.detial = item;
			//    this.shopIds = item.shopIds;
		},
		//查看支付方式详情接口
		async getWeixinAlipay(bill) {
			let data = {
				paymentId: bill.id
			};
			this.detial = await http.getWeixinAlipay({ data: data });
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
			if (detial.paymentName == '微信') {
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
			} else if (detial.paymentName == '支付宝') {
				if (
					!global.checkData(
						{ alipayrsaPublicKey: '支付宝公钥不能为空' },
						detial.payConfig
					)
				)
					return false;
				if (
					!global.checkData(
						{ rsaPrivateKey: 'RSA私钥不能为空' },
						detial.payConfig
					)
				)
					return false;
				if (
					!global.checkData(
						{ appId: '支付宝应用ID不能为空' },
						detial.payConfig
					)
				)
					return false;
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


<style type="text/css" scoped>
#brandBase .oCont {
	padding-left: 140px;
	width: 100%;
}
#brandBase .oCont .oBox {
	min-height: 200px;
	max-height: 500px;
	width: 100%;
	min-width: 500px;
	border: 1px solid #ccc;
	height: auto;
	overflow: auto;
	margin-top: 20px;
}
#brandBase .oCont .Box {
	width: 360px;
	height: 42px;
	cursor: pointer;
	box-sizing: border-box;
}
#brandBase .oCont .oDe {
	width: 30%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
	box-sizing: border-box;
	color: #000000;
	margin-right: 10px;
	background-color: #f2f2f2;
	border-radius: 5px;
}
#brandBase .oCont .Box .act {
	background-color: #28a8e0;
	color: #fff;
}
#brandBase .oCont .oUl {
	background-color: rgb(255, 255, 255);
	box-sizing: border-box;
	width: 100%;
	border-bottom: 3px solid rgb(247, 247, 247);
	overflow: hidden;
}
#brandBase .oCont .oUl .oLi {
	float: left;
	width: 20%;
	height: 47px;
	color: #959595;
	text-align: center;
	line-height: 47px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
#brandBase .line .imgBox {
	float: left;
	width: 290px;
	position: relative;
}
#brandBase .line .imgBox .imgBottom {
	width: 100%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	font-size: 18px;
	color: #d6d6d6;
	position: absolute;
	bottom: 0px;
	background: rgba(0, 0, 0, 0.5);
}
#brandBase .line .imgBox .imgInput {
	width: 150px;
	height: 150px;
	position: absolute;
	z-index: 5;
	opacity: 0;
	cursor: pointer;
	right: 0;
}
#brandBase .line .imgBox .imgsize {
	width: 150px;
	height: 150px;
	position: absolute;
	left: 140px;
	z-index: 0;
}
#brandBase .line {
	display: block;
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 10px 0;
}

#brandBase .line label {
	float: left;
	margin-left: 20px;
}

#brandBase .ltitle {
	width: 120px;
	line-height: 40px;
	text-align: right;
	float: left;
	box-sizing: border-box;
	font-size: 16px;
}

#brandBase input.mes {
	width: 300px;
	border: 1px solid #ccc;
	box-sizing: border-box;
	resize: none;
}

#brandBase textarea {
	outline: none;
	width: 300px;
	height: 150px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	resize: none;
}
.circle {
	display: inline-block;
	vertical-align: middle;
	width: 20px;
	height: 20px;
	border: 1px #c7c7c7 solid;
	background: #fff;
	margin-right: 5px;
}
.circle.active {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
</style>