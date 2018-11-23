/**
 * @Author: 孔伟研 
 * @Date: 2018-08-09 09:51:41 
 * @Last Modified by: 孔伟研
 * @Module: 打印机配置 -——一级弹框
**/
<template>
	<div>
		<win @winEvent="printConfigWin" :align="'right'" :width="600" :height="560" :ok="okStyle">
			<span slot="title">{{title}}</span>
			<div id="prin_con" slot="content" v-cloak>
				<!--打印机创建修改表单-->
				<section class="Pconfig" slot="content">
					<el-form v-if="this.ischain =='3'" :model="printDetial" ref="printDetial" label-width="120px">
						<el-form-item label="单据数据"  required>
							<el-radio-group v-model="brandOrderTypeIndex">
								<div style="margin-bottom:2px;">
									<el-radio size="small" class="labItem" @change="changeBrandIndex(i)" v-for="(item,i) in docType" :key="i" :label="i" border>{{item.name}}</el-radio>
								</div>
							</el-radio-group>
						</el-form-item>
						<el-form-item required label="打印机">
							<el-radio-group v-model="printerIndex">
								<div style="margin-bottom:2px;">
									<el-radio size="small" class="labItem" @change="changePrintIndex(i)" v-for="(item,i) in printerList" :key="i" :label="i" border>{{item.printerName}}</el-radio>
								</div>
							</el-radio-group>
						</el-form-item>
						<el-form-item required label="打印次数">
							<el-input-number v-model="printTimes" @change="changeNum" style="width:150px;" :min="1" :max="10"></el-input-number>
							<span style="color:#606266;margin:0 20px;">蜂鸣</span>
							<el-switch
								v-model="isAlam"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
					</el-form>
					<el-form v-if="this.ischain!='3'" :model="printDetial" ref="printDetial" label-width="120px">
						<el-form-item label="单据数据"  required>
							<el-radio-group v-model="orderTypeIndex">
								<div style="margin-bottom:2px;">
									<el-radio size="small" class="labItem" @change="changeIndex(i)" v-for="(item,i) in docType" :key="i" :label="i" border>{{item.name}}</el-radio>
								</div>
							</el-radio-group>
						</el-form-item>
						<el-form-item required label="页脚内容" v-if="status==1 || status == 6">
							<el-input type="textarea" v-model="footerContent" maxlength="500" :autosize="{minRows: 3, maxRows: 5}" placeholder = "请输入页脚内容" style="width:450px;"></el-input>
						</el-form-item>
						<el-form-item required label="打印机">
							<el-radio-group v-model="printerIndex">
								<div style="margin-bottom:2px;">
									<el-radio size="small" class="labItem" @change="changePrintIndex(i)" v-for="(item,i) in printerList" :key="i" :label="i" border>{{item.printerName}}</el-radio>
								</div>
							</el-radio-group>
						</el-form-item>
						<el-form-item required label="区域" v-if="status==1 || status==3 || status==5">
							<el-checkbox-group @change="areaIndexChange" v-model="areaIndex">
								<div style="margin-bottom:2px;">
									<el-checkbox size="small" class="labItem" v-for="(item,i) in areaIdsList" :key="i" :label="item.id" border>{{item.areaName}}</el-checkbox>
								</div>
							</el-checkbox-group>
						</el-form-item>
						<template v-if="!printerList[printerIndex] || (status == '7' && printerList[printerIndex].type == '4')|| orderTypeIndex == 19">
							<el-form-item required label="宽度">
								<el-input v-model="orderWidth" maxlength="2" placeholder = "请输入宽度(10~80)" style = "width:160px;"></el-input>
								<span>毫米(mm)</span>
							</el-form-item>
							<el-form-item required label="高度">
								<el-input v-model="orderHeight" maxlength="2" placeholder = "请输入高度(10~80)" style = "width:160px;"></el-input>
								<span>毫米(mm)</span>
							</el-form-item>
							<el-form-item required label="间距">
								<el-input v-model="orderSpacing" maxlength="2" placeholder = "请输入间距(1~10)" style = "width:160px;"></el-input>
								<span>毫米(mm)</span>
							</el-form-item>
						</template>
						<el-form-item label="头部留白" v-if="status==3 || status== 4 || status== 5">
							<el-input v-model="blankLine" maxlength="2" placeholder = "请输入空白行数(1~10)" style = "width:200px;"></el-input>
							<span>行</span>
						</el-form-item>
						<el-form-item required label="选择菜品" v-if="status==3 || status== 4">
							<span class="fl spanCom" style="margin-right:15px;" v-if="goodsLength!==null">已选择菜品：{{goodsLength}}道</span>
							<span class="fl spanCom" v-if="packagesLength!==null && !isOnlyGoods">已选择套餐：{{packagesLength}}个</span>
							<el-button @click="openGood" type="primary" style="width:150px;">添加关联菜品</el-button>
						</el-form-item>
						<el-form-item required label="打印次数" v-if="!printerList[printerIndex] || printerList[printerIndex].type !== '4'">
							<el-input-number v-model="printTimes" @change="changeNum" style="width:150px;" :min="1" :max="10"></el-input-number>
							<span style="color:#606266;margin:0 20px;">蜂鸣</span>
							<el-switch
								v-model="isAlam"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
						<el-form-item label="打印等叫单"  v-if="orderTypeIndex ==2">
							<el-switch
								v-model="isWait"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
							<span style="color:#606266;margin-left:80px;">打印套餐子菜</span>
							<el-switch
								v-model="isSon"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
						<el-form-item label="底部标语"  v-if="orderTypeIndex ==19">
							<el-input v-model="footerContent" maxlength="500" placeholder="请输入底部标语" style="width:340px;"></el-input>
						</el-form-item>
						<el-form-item label="显示店铺名称" v-if="orderTypeIndex ==19">
							<el-switch
								v-model="isShowName"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
						<el-form-item label="显示品牌logo" v-if="orderTypeIndex ==0||orderTypeIndex ==1">
							<el-switch
								v-model="isShowLogo"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
						<el-form-item label="显示位置" v-if="isShowLogo &&(orderTypeIndex ==0||orderTypeIndex ==1)">
							<el-radio-group v-model="isLocal">
								<div style="margin-bottom:2px;">
									<el-radio v-for="(item,i) in localArr" :key="i" :label="item.type" border>{{item.name}}</el-radio>
								</div>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="显示支付二维码" v-if="orderTypeIndex ==1" >
							<el-switch
								v-model="isQrcode"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
						</el-form-item>
						<el-form-item label="二维码" v-if="orderTypeIndex ==0||orderTypeIndex ==1" >
							<el-switch
								v-model="iscustomQrCode"
								active-color="#E1BB4A"
								inactive-color="#e6e6e6">
							</el-switch>
							<template v-if="iscustomQrCode">
								<span style="margin-left:20px;">URL地址:</span>
								<el-input v-model="customQrCode[0].qrcode"  placeholder="请输入URL地址(必填)" style="width:300px;"></el-input><br>
								<span style="margin-left:90px;margin-top: 20px;">寄语:</span>
								<el-input type="textarea" maxlength="50" v-model="customQrCode[0].explain"  placeholder="请输入寄语(50字以内)" style="width:300px;margin-top: 20px;" ></el-input>
							</template>
						</el-form-item>
					</el-form>
				</section>
			</div>
		</win>
		<component v-if="showTowWin" :is="openGoodList" @goodListWin="goGoodList" :goodsIds="goodsIds" :packages="packages" :isGoods="true" :isOnlyGoods="isOnlyGoods" :goInName="'isChild'"></component>
	</div>
</template>

<script>
import win from 'src/components/win.vue';
// import store from 'src/manager/store.js';
// import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import goodListWin from 'src/components/good_list_win.vue';
export default {
	data() {
		return {
			ischain:'',
			orderType: null, //单据数据orderType值
			printTimes: 1, //打印次数
			isAlam: false, //蜂鸣开关
			footerContent: '', //页脚内容
			printerId: null, //打印机ID
			areaIds: [], //区域ID
			status: '1',
			orderTypeIndex: -1, //单据数据下标 如果为19橱打分单不干胶--宽高间距显示，其他的不显示
			areaIndex: [], //区域下标
			printerIndex: -1, //打印机下标
			goodsLength: null,
			goodsIds: [],
			packages: [],
			packagesLength: null,
			orderWidth: '', //条形码宽
			orderHeight: '', //条形码高
			orderSpacing: '', //条形码间距
			blankLine: 0, //头部留白 0 -- 10}
			orderName: '', //所选择的单据名，传给后台用
			title: '',
			okStyle: null,
			cancelStyle: null,
			// printDetial: null,
			createUid: '',
			showTowWin: false, //关联商品的弹窗打开或关闭
			isOnlyGoods: false, //关联商品的弹窗是否只要商品不要套餐，默认false 全部
			isWait: false, //是否打印等叫单
			isSon: false, //是否打印套餐子菜
			isShowName: false, //是否显示店铺名称
			isShowLogo:false,//是否显示品牌LOGO
			localArr:[{type:'1',name:'顶部'},{type:'2',name:'底部'}],
			isLocal:'1',//logo的显示位置
			isQrcode:false,//是否显示支付二维码
			iscustomQrCode:false,//显示二维码
			customQrCode:[{qrcode:'',explain:''}],//二维码URL和寄语
			brandOrderTypeIndex:-1,//品牌的单据数据下标
		};
	},
	components: {
		win,
	},
	watch: {
		brandOrderTypeIndex: 'changeBrandIndex',
		orderTypeIndex: 'orderTypeIndexChange',
		goodsIds: 'goodsNonull',
		packages: 'packagesNonull'
	},
	props: {
		printerConId: String, //打印机配置Id
		types: String, //添加、修改 标识
		printIndex: Number, //打印机配置下标
		showWin: false,
		docType: Array, //单据数据列表
		areaIdsList: Array, //区域列表
		printerList: Array, //打印机列表
		printDetial: Object
	},
	mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.createUid = userData.user.id;
		//如果初始为查看打印机详情则执行
		if (this.types == 'edit') {
			this.getPrintDetial();
		}
		if (this.types == 'addPcon') {
			this.title = '添加打印机配置';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
		} else if (this.types == 'edit') {
			this.title = '修改打印机配置';
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		}
	},

	methods: {
		//从选择商品弹窗返回传回数据
		goGoodList: function(res, item) {
			this.goodsIds = item.goodArr;
			this.packages = item.packArr;
			this.showTowWin = false;
		},
		//监听传值到主页面
		printConfigWin: function(res) {
			let item = {}; //传到页面的数据，请求接口传参用
			if (res == 'ok') {
				if (this.SubmitJudgment(res)) {
					item.printsetId = this.printerConId;
					item.createUid = this.createUid;
					item.printerId = this.printerId;
					item.orderType = this.orderType;
					item.orderName = this.orderName;
					item.areaIds = this.areaIndex.toString();
					item.goodsIds = this.goodsIds.toString();
					item.packageIds = this.packages.toString();
					item.footerContent = this.footerContent;
					item.printTimes = this.printTimes;
					item.isAlam = Number(this.isAlam);
					item.isPrintWait = Number(this.isWait);
					item.orderStatus = this.status;
					item.type = this.printerList[this.printerIndex].type;
					item.isPackageGoods = Number(this.isSon);
					item.isShopName = Number(this.isShowName);
					item.isLogo = Number(this.isShowLogo?this.isLocal:this.isShowLogo);
					item.isQrcode = Number(this.isQrcode);//这个迭代暂时不用（16迭代）
					item.width =
						(this.orderType == 17 || this.orderType == 22) &&
						this.printerList[this.printerIndex].type == 4
							? this.orderWidth
							: ''; //只有选择条形码和不干胶打印机传递宽高间距
					item.height =
						(this.orderType == 17 || this.orderType == 22) &&
						this.printerList[this.printerIndex].type == 4
							? this.orderHeight
							: '';
					item.spacing =
						(this.orderType == 17 || this.orderType == 22) &&
						this.printerList[this.printerIndex].type == 4
							? this.orderSpacing
							: '';
					item.blankLine =
						this.status == 3 || this.status == 4 || this.status == 5
							? this.blankLine
							: 0; //只有部分单据数据有头部留白2:厨打分单 ，3:出品总单, 6:传菜总单 7:厨打总单 9:退菜单 11:催菜单
					let customQrCode = [];
					if(this.iscustomQrCode){
						customQrCode = this.customQrCode;
					}else{
						customQrCode = [];
					}
					item.customQrCode = JSON.stringify(customQrCode);
				} else {
					return false;
				}
			}
			this.$emit('printConfigWin', res, item);
		},
		//改变品牌打印机通信类型
		changeBrandIndex: function(e) {
			console.log(e);
			if (this.docType[e] && this.docType[e].name) {
				this.orderName = this.docType[e].name;
			}
			this.brandOrderTypeIndex = e;
			this.status = this.docType[this.brandOrderTypeIndex].orderStatus;
			this.orderType = this.docType[this.brandOrderTypeIndex].type;
		},
		//改变打印机通信类型
		changeIndex: function(e) {
			console.log(e);
			if (this.docType[e] && this.docType[e].name) {
				this.orderName = this.docType[e].name;
			}
			this.orderTypeIndex = e;
			if (e == 19) {
				this.isOnlyGoods = true;
			} else {
				this.isOnlyGoods = false;
			}
		},
		//改变打印机的选项
		changePrintIndex: function(e) {
			this.printerIndex = e;
			if (this.printerIndex > -1) {
				this.printerId = this.printerList[this.printerIndex].id;
			}
		},
		waitOnOff(e) {
			this.isWait = e ? 1 : 0;
		},
		sonOnOff(e) {
			this.isSon = e;
			console.log(e);
		},
		isShowOnOff(e) {
			this.isShowName = e;
		},
		// 筛选符合单据的配置
		orderTypeIndexChange: function() {
			if (this.orderTypeIndex == 0 || this.orderTypeIndex == 1) {
				this.status = '1';
			} else if (
				this.orderTypeIndex == 9 ||
				this.orderTypeIndex == 2 ||
				this.orderTypeIndex == 19 ||
				this.orderTypeIndex == 22
			) {
				this.status = '4';
			} else if (this.orderTypeIndex == 3 || this.orderTypeIndex == 11) {
				this.status = '5';
			} else if (
				this.orderTypeIndex == 6 ||
				this.orderTypeIndex == 7 ||
				this.orderTypeIndex == 21
			) {
				this.status = '3';
			} else if (this.orderTypeIndex == 15) {
				this.status = '6';
			} else if (this.orderTypeIndex == 17 || this.orderTypeIndex == 18) {
				this.status = '7';
			} else {
				this.status = '2';
				if (this.orderTypeIndex == -1) {
					this.status = '1';
				}
			}
			// 插入单据数据数组中
			if (this.orderTypeIndex > -1) {
				this.orderType = this.docType[this.orderTypeIndex].type;
			}
		},
		//改变区域选项
		areaIndexChange: function(e) {
			console.log(e);
			this.areaIndex = e;
		},
		goodsNonull: function() {
			this.goodsLength =
				this.goodsIds.length == 0 ? null : this.goodsIds.length;
		},
		packagesNonull: function() {
			this.packagesLength =
				this.packages.length == 0 ? null : this.packages.length;
		},
		//改变打印数量
		changeNum: function(e) {
			this.printTimes = e;
		},
		//改变蜂鸣切换
		changeOnOff: function(e) {
			this.isAlam = e ? 1 : 0;
		},
		//打开关联菜品
		openGood: function() {
			this.openGoodList = goodListWin;
			//如果打印单据数据为橱打分单不干胶则不显示套餐
			if (this.orderTypeIndex == 19) {
				this.isOnlyGoods = true;
			} else {
				this.isOnlyGoods = false;
			}
			this.showTowWin = true;
		},
		//初始化获取打印机配置详情
		getPrintDetial() {
			// this.printDetial = await http.getPrintsetById({
			// 	data: { printsetId: this.printerConId }
			// });
			console.log(this.printDetial);
			this.printerId = this.printDetial.printerId;
			for (let i = 0; i < this.printerList.length; i++) {
				if (this.printerId == this.printerList[i].id) {
					this.printerIndex = i;
				}
			}
			this.orderTypeIndex = this.printDetial.orderType*1;
			//单据列表少了type为18和19的，
			if (this.printDetial.orderType == '21') {
				//储值凭证
				this.orderTypeIndex = 18;
			} else if (this.printDetial.orderType == '22') {
				//橱打分单不干胶
				this.orderTypeIndex = 19;
			} else if (this.printDetial.orderType == '23') {
				//扫码支付对账单
				this.orderTypeIndex = 20;
			} else if (this.printDetial.orderType == '24') {
				//出品单
				this.orderTypeIndex = 21;
			}else if (this.printDetial.orderType == '25') {
				//外卖出品单
				this.orderTypeIndex = 22;
			}else if(this.printDetial.orderType == '100'){//品牌入货申请单
				this.brandOrderTypeIndex = 0;//品牌配置下单据数据下标
			}
			// this.customQrCode = JSON.parse(this.printDetial.customQrCode);
			this.printDetial.customQrCode = this.printDetial.customQrCode?this.printDetial.customQrCode:[];
			this.customQrCode = this.printDetial.customQrCode;
			if(this.customQrCode.length==0 || this.customQrCode == ''){
				this.iscustomQrCode = false;
			}else if(this.customQrCode.length>0){
				this.iscustomQrCode = true;
			}
			if(this.printDetial.customQrCode.length == 0){
				this.customQrCode = [{qrcode:'',explain:''}];//二维码URL和寄语
			}
			// console.log(this.orderTypeIndex);
			this.isWait = this.printDetial.isPrintWait == 1 ? true : false; //是否开启等叫打印单
			this.orderName = this.docType[this.orderTypeIndex].name;
			this.footerContent = this.printDetial.footerContent;
			this.printTimes = this.printDetial.printTimes;
			this.isAlam = this.printDetial.isAlam == '0' ? false : true;
			this.areaIndex =
				this.printDetial.areaIds != '' && this.printDetial.areaIds != null
					? this.printDetial.areaIds.split(',')
					: [];
			this.goodsIds =
				this.printDetial.goodsIds != '' && this.printDetial.goodsIds != null
					? this.printDetial.goodsIds.split(',')
					: [];
			this.packages =
				this.printDetial.packageIds != '' && this.printDetial.packageIds != null
					? this.printDetial.packageIds.split(',')
					: [];
			this.orderWidth = this.printDetial.width;
			this.orderHeight = this.printDetial.height;
			this.orderSpacing = this.printDetial.spacing;
			this.blankLine = this.printDetial.blankLine;

			this.isSon = Boolean(Number(this.printDetial.isPackageGoods)); //是否打印套餐子菜
			this.isShowName = Boolean(Number(this.printDetial.isShopName)); //是否显示店铺名称
			if(this.printDetial.isLogo*1>0){ //是否显示品牌logo --显示位置
				this.isShowLogo = true;
				this.isLocal = this.printDetial.isLogo;
			}
			this.isQrcode = Boolean(Number(this.printDetial.isQrcode)); //是否显示支付二维码
		},
		//提交判断
		SubmitJudgment: function(res) {
			if (res == 'ok') {
				//表单验证
				if (this.orderType == null) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '单据数据不能为空！'
					});
					return false;
				}
				if (this.printerIndex.length == 0 || this.printerIndex == -1) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '打印机不能不选！'
					});
					return false;
				}
				if (this.orderType == 0 || this.orderType == 1) {
					if (this.footerContent == '') {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '页脚不能为空！'
						});
						return false;
					}
					// if (this.footerContent.split('').length >= 30) {
					// 	this.$store.commit('setWin', {
					// 		title: '温馨提示',
					// 		winType: 'alert',
					// 		content: '页脚长度不能超过30！'
					// 	});
					// 	return false;
					// }
					if (this.areaIndex.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '区域不能不选！'
						});
						return false;
					}
				} else if (
					this.orderType == 6 ||
					this.orderType == 7 ||
					this.orderType == 24
				) {
					if (this.areaIndex.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '区域不能不选！'
						});
						return false;
					}
					if (
						this.goodsIds.length == 0 &&
						this.goodsIds == '' &&
						this.packages.length == 0 &&
						this.packages == ''
					) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '商品或套餐不能全为空！'
						});
						return false;
					}
				} else if (this.orderType == 9 || this.orderType == 2 ||this.orderType == 22 || this.orderType == 25) {
					if (
						this.goodsIds.length == 0 &&
						this.goodsIds == '' &&
						this.packages.length == 0 &&
						this.packages == ''
					) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '商品或套餐不能全为空！'
						});
						return false;
					}
				} else if (this.orderTyp == 3 || this.orderTyp == 11) {
					if (this.areaIndex.length == 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '区域不能不选！'
						});
						return false;
					}
				} else if (
					this.orderType == 17 &&
					this.printerList[this.printerIndex].type == 4
				) {
					if (this.orderWidth == '' || this.orderWidth <= 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '宽度不能为空且不能小于或等于0'
						});
						return false;
					} else if (this.orderHeight == '' || this.orderHeight <= 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '高度不能为空且不能小于或等于0'
						});
						return false;
					} else if (this.orderSpacing == '' || this.orderSpacing <= 0) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '间距不能为空且不能小于或等于0'
						});
						return false;
					}
				}
				if (this.status == 3 || this.status == 4 || this.status == 5) {
					if (this.blankLine * 1 > 10) {
						this.$store.commit('setWin', {
							title: '温馨提示',
							winType: 'alert',
							content: '头部留白最大为10行'
						});
						return false;
					}
				}
				if(this.status == '1'){
					if(this.iscustomQrCode&&this.customQrCode[0].qrcode.trim().length==0){
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '请输入URL地址'
						});
						return false;
					}
				}
				return true;
			}
		}
	}
};
</script>
<style type="text/css" scoped>
#printercon .spanCom {
	height: 40px;
	line-height: 40px;
	width: 130px;
	text-align: left;
}
#prin_con {
	width: 100%;
	height: 100%;
}
#prin_con .Pconfig {
	width: 600px;
	height: 560px;
	padding: 20px 0;
	overflow: auto;
}
#prin_con .Pconfig .labItem {
	margin-bottom: 5px;
	margin-left: 0!important;
	margin-right: 10px;
}
</style>

