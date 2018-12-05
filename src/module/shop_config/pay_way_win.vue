<!--
	**店铺配置——支付方式——弹窗
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<win @winEvent="payWayWin" :align="'center'" :width="500" :height="350" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<section id="editInfomation">
				<section v-if="types == 'add' || types == 'edit'" style="width:100%;">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" placeholder="重新编辑支付方式"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">是否入实账</h3>
						<div class="switch">
							<el-switch v-model="detial.isBill" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
						</div>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'zxBand'">
					<section style="margin-top: 50px;" v-if="detial.payConfig.isIndependent == '1'">
						<section class="zxbox">
							<span>支付方式名称</span>
							<div>中信银行</div>
						</section>
						<section class="zxbox">
							<span>独立商户号</span>
							<span>{{detial.payConfig.secMerId}}</span>
						</section>
					</section>
					<section style="margin-top: 50px;" v-else>
						<section class="zxbox">
							<span>支付方式名称</span>
							<div style="display: inline-block;width: 285px;">
								<div>中信银行</div>
								<div>(还没有中信银行账户，请申请开通！)</div>
							</div>
						</section>
						<section class="zxbox">
							<span>独立商户号</span>
							<div>尚未开通</div>
						</section>
					</section>
				</section>
				<section v-if="types == 'zfb'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">支付宝公钥</h3>
						<el-input v-model="detial.payConfig.alipayrsaPublicKey" placeholder = "请输入支付宝公钥" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">RSA私钥</h3>
						<el-input v-model="detial.payConfig.rsaPrivateKey" placeholder = "请输入RSA私钥" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">支付宝应用ID</h3>
						<el-input v-model="detial.payConfig.appId" placeholder = "请输入支付宝应用ID" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore" style='float:left;'>商户类型</h3>
						<div class="tab" style="float: left; width: 50%;">
							<el-radio-group v-model="isRsa" @change="changeZfbIndex">
								<el-radio-button v-for="(item,i) in list" :key='i' :label="item.id">{{item.name}}</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'sqb'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">appId</h3>
						<el-input v-model="detial.payConfig.appId" placeholder = "请输入收钱吧appId" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">激活码</h3>
						<el-input v-model="detial.payConfig.code" placeholder = "请输入收钱吧激活码" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'dbq'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户编号</h3>
						<el-input v-model="detial.payConfig.businessNum" placeholder = "请输入商户编号" class="inputWidth"></el-input>
					</div>
					<!-- <div class="payShowList">
						<h3 class="showListBefore">组织编号</h3>
						<input type="text" v-model="detial.payConfig.organizationNum" class="input"/>
					</div> -->
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'wyyx'">
					<!-- 网易严选 -->
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">产品appId</h3>
						<el-input v-model="detial.payConfig.appId" placeholder = "请输入产品appId" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">产品号</h3>
						<el-input v-model="detial.payConfig.productId" placeholder = "请输入产品号" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">产品密钥key</h3>
						<el-input v-model="detial.payConfig.key" placeholder = "请输入产品密钥key" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'SHzxBand'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" disabled class="inputWidth"></el-input>
						<!-- <input type="text" v-model="detial.paymentName" class="input" disabled="disabled" /> -->
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户号</h3>
						<el-input v-model="detial.payConfig.mchId" class="inputWidth" placeholder = "请输入商户号"></el-input>
						<!-- <input type="text" v-model="detial.payConfig.mchId" placeholder = "请输入商户号" class="input" /> -->
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户私钥</h3>
						<el-input v-model="detial.payConfig.privateRsaKey" class="inputWidth" placeholder = "请输入商户私钥"></el-input>
						<!-- <input type="text" v-model="detial.payConfig.privateRsaKey" placeholder = "请输入商户私钥" class="input" /> -->
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">中信公钥</h3>
						<el-input v-model="detial.payConfig.publicRsaKey" class="inputWidth" placeholder = "请输入中信公钥"></el-input>
						<!-- <input type="text" v-model="detial.payConfig.publicRsaKey" placeholder = "请输入中信公钥" class="input" /> -->
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
					<!-- <div class="payShowList">
						<h3 class="showListBefore">key</h3>
						<input type="text" v-model="detial.payConfig.publicRsaKey" class="input" />
					</div> -->
				</section>
				<section v-if="types == 'nhzf'">
					<!-- 农行支付 -->
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户号(mid)</h3>
						<el-input v-model="detial.payConfig.mid" placeholder = "请输入商户号(mid)" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">终端号(tid)</h3>
						<el-input v-model="detial.payConfig.tid" placeholder = "请输入终端号(tid)" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">机构商户号</h3>
						<el-input v-model="detial.payConfig.instMid" placeholder = "请输入机构商户号" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">消息来源</h3>
						<el-input v-model="detial.payConfig.msgSrc" placeholder = "请输入消息来源" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">来源编号</h3>
						<el-input v-model="detial.payConfig.msgSrcId" placeholder = "请输入来源编号" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">MD5密钥</h3>
						<el-input v-model="detial.payConfig.md5Key" placeholder = "请输入MD5密钥" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'wx'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">微信APPID</h3>
						<el-input v-model="detial.payConfig.appid" placeholder = "请输入微信APPID" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="" style="float: left;margin-right: 23px;line-height: 40px;">微信小程序APPID</h3>
						<el-input v-model="detial.payConfig.minAppId" placeholder = "请输入微信小程序APPID" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户号</h3>
						<el-input v-model="detial.payConfig.mchid" placeholder = "请输入商户号" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户支付秘钥</h3>
						<el-input v-model="detial.payConfig.key" placeholder = "请输入商户支付秘钥" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">appSecret</h3>
						<el-input v-model="detial.payConfig.appSecret" placeholder = "请输入appSecret" class="inputWidth"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">证书(cert)</h3>
						<form enctype="multipart/form-data" id="uploadForm">
							<!-- v-model = "uploadFile" -->
							<input type="file" id="upload_file" name="product" @change="upload" />
						</form>
						<el-button type="primary" icon="el-icon-plus">上传文件</el-button>
						<span style="line-height:45px;padding-left:10px;" v-if="apiclient_cert&&apiclient_cert!=''"> 已上传 {{certName}} </span>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">证书秘钥(key)</h3>
						<form enctype="multipart/form-data" id="downloadFile">
							<input type="file" name="product" id="download_file" @change="download" />
						</form>
						<el-button type="primary" icon="el-icon-plus">上传文件</el-button>
						<span style="line-height:45px;padding-left:10px;" v-show="apiclient_key&&apiclient_key!=''"> 已上传 {{keyName}} </span>
						<!-- <label v-if = "detial.payConfig.vxkey != ''" for="uploadFile" style="position: absolute;left: 270px;top:12px;">已上传 </label> -->
						<!-- <label for="uploadFile" style="position: absolute;left: 320px;top:12px;">{{spliceFileName(detial.payConfig.downloadFile)}} </label> -->
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'wPos'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">旺POS门店编号</h3>
						<el-input v-model="detial.payConfig.mcode" class="inputWidth" placeholder = "请输入旺POS门店编号"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">appKey</h3>
						<el-input v-model="detial.payConfig.appKey" class="inputWidth" placeholder = "请输入appKey"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">appSecret</h3>
						<el-input v-model="detial.payConfig.appSecret" class="inputWidth" placeholder = "请输入appSecret"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label="描述文字"></el-input-number>
					</div>
				</section>
				<section v-if="types == 'xfzf'">
					<div class="payShowList">
						<h3 class="showListBefore">支付方式名称</h3>
						<el-input v-model="detial.paymentName" class="inputWidth" :disabled="true"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">merchantId</h3>
						<el-input v-model="detial.payConfig.merchantId" class="inputWidth" placeholder = "请输入merchantId"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">商户私钥</h3>
						<el-input v-model="detial.payConfig.mer_pri_key" class="inputWidth" placeholder = "请输入商户私钥"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">先锋公钥</h3>
						<el-input v-model="detial.payConfig.xf_pub_key" class="inputWidth" placeholder = "请输入先锋公钥"></el-input>
					</div>
					<div class="payShowList">
						<h3 class="showListBefore">排序</h3>
						<el-input-number v-model="detial.sort" :min="1" :max="100" label=""></el-input-number>
					</div>
				</section>
			</section>
		</div>
	</win>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			okStyle: null,
			cancelStyle: null,
			printDetial: null,
			certName: '',
			keyName: '',
			//支付宝商户类型
			list: [
				{
					id: 0,
					name: 'RSA'
				},
				{
					id: 1,
					name: 'RSA2'
				}
			],
			isRsa: 0, //支付宝
			apiclient_cert: '', //新加一个，判断是否已经添加
			apiclient_key: '', //新加一个，判断是否已经添加
			zfbItem: {}
		};
	},
	components: {
		radioBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn'),
		win: () => import(/* webpackChunkName:"win" */ 'src/components/win'),
		// onOff: () =>
		// 	import(/* webpackChunkName:"on_off" */ 'src/components/on_off'),
		// subaddBtn: () =>
		// 	import(/* webpackChunkName:"subadd" */ 'src/components/subadd')
	},
	props: {
		detial: Object, //支付方式详情
		types: String //添加或修改支付方式
	},
	created() {
		this.title = this.types == 'add' ? '添加支付方式' : '修改支付方式';
		if (this.types == 'add' || this.types == 'edit') {
			this.detial.isBill = this.detial.isBill == 0 ? false : true; //是否入实帐转换

			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
		} else if (this.types == 'zxBand') {
			this.okStyle = {
				content:
					this.detial.payConfig.isIndependent == '1' ? '编辑' : '申请开通',
				style: {
					backgroundColor: '#f8941f',
					color: '#fff'
				}
			};
		} else {
			this.apiclient_key = this.detial.payConfig.apiclient_key;
			this.apiclient_cert = this.detial.payConfig.apiclient_cert;
			//如果支付宝的商户类型为空或者其它，使其能对应其下标
			if (this.detial.payConfig.signType == 'RSA' || this.detial.payConfig.signType == '') {
				this.isRsa = 0;
			} else {
				this.isRsa = 1;
			}
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#f8941f',
					color: '#fff'
				}
			};
		}
		this.cancelStyle = {
			content: '取消',
			style: {
				backgroundColor: '#918686',
				color: '#fff'
			}
		};
	},
	methods: {
		payWayWin: function(res) {
			this.$emit('payWayWin', res, this.detial);
		},
		//是否入实帐按钮点击
		changeOnOff: function(e) {
			this.detial.isBill = e;
		},
		//排序按钮点击
		// changeNum: function(e) {
		// 	this.detial.sort = e;
		// },
		//支付宝商户类型
		changeZfbIndex: function(item) {
			this.list.forEach(e=>{
				if(e.id == item){
					this.detial.payConfig.signType = e.name;
					this.isRsa = item;
				}
			});
		},
		//上传微信证书
		upload: function() {
			let _thisvue = this;
			let upload = document.getElementById('upload_file');
			let vxcert = '';
			this.certName = upload.files[0].name;
			// console.log(this.certName);
			if (window.FileReader) {
				let file = upload.files[0];
				// filename = file.name.split(".")[0];
				let reader = new FileReader();
				reader.onload = function() {
					vxcert = this.result;
					_thisvue.detial.payConfig.apiclient_cert = vxcert;
					_thisvue.apiclient_cert = vxcert;
				};
				reader.readAsText(file);
			}
		},
		//上传微信证书秘钥
		download: function() {
			let _thisvue = this;
			let download = document.getElementById('download_file');
			this.keyName = download.files[0].name;
			//支持chrome IE10
			if (window.FileReader) {
				let file = download.files[0];
				// filename = file.name.split(".")[0];
				let reader = new FileReader();
				reader.onload = function() {
					_thisvue.detial.payConfig.apiclient_key = this.result;
					_thisvue.apiclient_key = this.result;
				};
				reader.readAsText(file);
			}
		}
	}
};
</script>
<style type="text/css" scoped>
#editInfomation .payShowList {
	height: 50px;
	padding-left: 20px;
	margin-top: 20px;
	position: relative;
}
#editInfomation .showListBefore {
	width: 120px;
	height: 40px;
	line-height: 40px;
	float: left;
	text-align: right;
	margin-right: 15px;
}
/*...........................小红*星星.....................*/
#editInfomation .showListBefore:after {
	content: '*';
	color: red;
	position: relative;
	top: 3px;
	right: -1px;
}
#editInfomation .payShowList .input {
	border: 1px solid deepskyblue;
	width: 220px;
}
/*.............开关...................*/
#editInfomation .payShowList .switch {
	float: left; /*margin-top: 7px;*/
	line-height: 40px;
}
#editInfomation .zxbox {
	height: 50px;
	margin-left: 80px;
}
#editInfomation .zxbox span {
	font-size: 16px;
	margin-right: 20px;
	display: inline-block;
	width: 100px;
	height: 40px;
	text-align: right;
	vertical-align: top;
}
#editInfomation .zxbox div {
	display: inline-block;
	font-size: 16px;
	color: gray;
}
#upload_file,
#download_file {
	height: 42px;
	width: 120px;
	position: absolute;
	top: 0;
	z-index: 10;
	left: 155px;
	opacity: 0;
	cursor: pointer;
}
#editInfomation .tab span {
	color: #999;
	text-align: center;
	padding: 0 20px;
	line-height: 40px;
	font-size: 14px;
	float: left;
	cursor: pointer;
	height: 40px;
	position: relative;
	background-color: #f2f2f2;
	border-right: 1px solid #fff;
	border-bottom: 1px solid #fff;
}
#editInfomation .tab span.on {
	background-color: #2980b9;
	color: #fff;
}
#editInfomation .tab span.on:after {
	width: 0;
	height: 0;
	content: '';
	bottom: 0px;
	left: 50%;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 5px solid #fff;
	position: absolute;
	transform: translate(-50%, 0);
	-ms-transform: translate(-50%, 0);
	-moz-transform: translate(-50%, 0);
	-webkit-transform: translate(-50%, 0);
	-o-transform: translate(-50%, 0);
}
#editInfomation .inputWidth{
	width: 220px;
}
</style>