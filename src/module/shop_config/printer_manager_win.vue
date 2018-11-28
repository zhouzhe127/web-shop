/**
 * @Author: 孔伟研 
 * @Date: 2018-08-09 09:57:54 
 * @Last Modified by: 孔伟研
 * @Module:打印机管理弹窗
**/
<template>
	<win @winEvent="printMueueWin" :align="isTerminal?'center':'right'" :width="580" :height="winHeight" :ok="okStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<section class="print-form" v-if="!isTerminal">
				<el-form :model="printDetial" ref="printDetial" label-width="120px">
					<el-form-item required label="打印机类型">
						<el-radio-group v-model="index">
							<el-radio v-if="ischain == '3'" class="labItem" size="small" @change="changeIndex(i)" v-for="(item,i) in lists" :key="i" :label="i" border>{{item.name}}</el-radio>
							<el-radio v-if="ischain != '3'" class="labItem" size="small" @change="changeIndex(i)" v-for="(item,i) in list" :key="i" :label="i" border>{{item.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="ischain != '3'" required label="打印服务终端">
						<el-radio-group v-model="terminaIndex">
							<el-radio class="labItem" size="small" v-for="(item,i) in newTerminalList" :key="i" :label="item.id" border>{{item.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item required label="打印机名称">
						<el-input v-model="printerName" placeholder = "请输入名称" maxlength="30" style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="IP地址" v-if="!isNum">
						<el-input v-model="ip" placeholder = "请输入IP地址" style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item label="备用IP地址" v-if="!isNum">
						<el-input v-model="slaveIp" placeholder = "请输入备用IP地址" style = "width:300px;"></el-input>
						<label class="fl" style="line-height: 20px;margin-top: 10px;font-size: 16px;color: #b5b5b5;">
							(局域网IP地址,例如：192.168.66.11。<br /> &nbsp;电脑打印机的IP地址必须设为127.0.0.1)
						</label>
					</el-form-item>
					<el-form-item required label="序列号" v-if="isNum == 1">
						<el-input v-model="ip" placeholder = "请输入设备唯一序列号" maxlength='15' style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="mac地址" v-if="isNum == 3">
						<el-input v-model="ip" placeholder = "请输入mac地址" style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="最大字宽">
						<el-input v-model="maxLen" placeholder = "请输入最大字宽，建议为48" maxlength='2' style = "width:300px;"></el-input>
						<label class="fl" style="line-height: 20px;margin-top: 10px;font-size: 16px;color: #b5b5b5;">
							(每行最多打印英文字的个数。<br /> &nbsp;80mm打印机:&lt;=48;58mm打印机:&lt;=32)
						</label>
					</el-form-item>
					<el-form-item required label="排序">
						<el-input-number v-model="num" @change="changeNum" style="width:150px;" :min="1" :max="255"></el-input-number>
						<button v-if="isTest" v-on:click="savePrinter" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px">测试并保存</button>
						<button v-if="reTi" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px;background-color: #ccc;">{{reTime}}秒后重新测试</button>
					</el-form-item>
				</el-form>
			</section>
			<section class="print-form" v-if="isTerminal">
				<el-form :model="printDetial" ref="printDetial" label-width="100px">
					<el-form-item required label="终端名称">
						<el-input v-model="printDetial.name" placeholder = "请输入名称" maxlength="10" style = "width:300px;"></el-input>
					</el-form-item>
					<el-form-item required label="设备SN号">
						<el-input v-model="printDetial.snNum" placeholder = "请输入设备SN号" maxlength='30' style = "width:300px;"></el-input>
					</el-form-item>
				</el-form>
			</section>
		</div>
	</win>
</template>

<script>
// import win from "src/components/win.vue";
// import store from "src/manager/store.js";
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			ischain:'3',//判断品牌--店铺
			shopId: '',
			createUid: '',
			title: '打印机',
			okStyle: null,
			cancelStyle: null,
			// printDetial: null,
			list: [{type: 0,name: '网口打印机'},
				{type: 2,name: 'T1打印机'},
				{type: 3,name: 'V1打印机'},
				{type: 4,name: '不干胶打印机'},
				{type: 5,name: 'USB打印机'},
				{type: 6,name: '蓝牙打印机'}
			],
			lists: [{type: 0,name: '网口打印机'}],
			type: 0,
			index: 0,
			terminaIndex:'0',//打印服务终端id
			num: 255,
			sign: '',
			printerName: '',
			ip: '',
			slaveIp: '', //备用IP
			maxLen: '',
			isDisabled: false, //判断打印机IP字段显示隐藏
			isNum: 0, //序列号 T1 v1打印机
			isTest: true, //测试按钮显示隐藏
			reTime: 5,
			reTi: false,
			newPrintDetial: { id: 0 }, //新建的打印机详情
			newTerminalList:[],//打印终端列表
			winHeight:500,//弹窗高度
		};
	},
	components: {
		win: () => import(/* webpackChunkName:"win" */ 'src/components/win'),
		// radioBtn: () =>
		// 	import(/* webpackChunkName:"radio_btn" */ 'src/components/radio_btn'),
		// subaddBtn: () =>
		// 	import(/* webpackChunkName:"subadd" */ 'src/components/subadd')
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.createUid = userData.user.createUid;
		this.ischain = userData.currentShop.ischain;
		this.winHeight = this.isTerminal?200 : 500;//判断弹窗高度
		if (this.types == 'addPrint') {
			this.title = this.isTerminal?'添加服务终端' : '添加打印机';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
		} else if (this.types == 'edit') {
			this.title = this.isTerminal?'修改服务终端' : '修改打印机';
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
		}
		let idd = false;
		this.newTerminalList = utils.deepCopy(this.terminalList);
		for(let i=0;i<this.newTerminalList.length;i++){
			if(this.newTerminalList[i].id=='0'){
				idd = true;
			}
		}
		if(!idd){
			let item = {id:'0',name:'路由器',isMain:'0'};
			this.newTerminalList.unshift(item);
		}
		//如果初始为查看打印机详情则执行
		if (this.types == 'edit') {
			this.getPrintDetial();
		}
	},
	props: {
		printerId: String, //打印机Id
		types: String, //添加、修改 标识
		printIndex: Number, //打印机下标
		showWin: false,
		printerList: Array, //打印机列表
		printDetial:Object,
		isTerminal:Boolean,//isTerminal打印机终端
		terminalList:Array,//打印终端列表
	},
	methods: {
		//监听传值到主页面
		printMueueWin: function(res) {
			let item = {}; //传到页面的数据，请求接口传参用
			item.printerId = this.printerId;
			item.shopId = this.shopId;
			item.createUid = this.createUid;
			item.printerName = this.printerName;
			item.ip = this.ip;
			item.slaveIp = this.slaveIp;
			item.maxLen = this.maxLen;
			item.type = this.list[this.index].type;
			item.sort = this.num;
			item.isTerminal = this.isTerminal;
			item.name = this.printDetial.name;
			item.snNum = this.printDetial.snNum;
			item.printTerminalId = this.terminaIndex;
			if (res == 'ok') {
				if (this.isOk()) {
					this.$emit('printManagerWin', res, item);
				}
			} else {
				this.$emit('printManagerWin', res, item);
			}
		},
		//改变打印机通信类型
		changeIndex: function(e) {
			this.index = e;
			this.type = this.list[this.index].type;
			if (
				this.list[this.index].type == 2 ||
				this.list[this.index].type == 3
			) {
				this.isNum = 1;
			}else if(this.list[this.index].type == 5){
				this.isNum = 2;
			} else if(this.list[this.index].type == 6){
				this.isNum = 3;
			} else {
				this.isNum = 0;
			}
			if (e == 0) {
				this.isTest = true;
			} else {
				this.isTest = false;
			}
			this.reTi = false;
		},
		//判断填写格式是否正确
		isOk: function() {
			let ip = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
			let num = /^[0-9a-zA-Z]*$/g;
			if(this.isTerminal){
				if(this.printDetial.name == ''){
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '请输入终端名称'
					});
				}
				if(this.printDetial.snNum == ''){
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '请输入终端设备SN号'
					});
				}
			}else{
				// if (this.terminaIndex == '-1') {
				// 	this.$store.commit('setWin', {
				// 		title: '错误提示',
				// 		winType: 'alert',
				// 		content: '选择打印服务终端'
				// 	});
				// 	return false;
				// }
				if (this.printerName == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: '请输入打印机名称'
					});
					return false;
				}
				if (this.ip != '' && (this.index == 0 || this.index == 3)) {
					if (!ip.test(this.ip)) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alert',
							content: 'ip段格式错误'
						});
						return false;
					}
				} else if ((this.index == 0 || this.index == 3) && this.ip == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: 'ip段不能为空'
					});
					return false;
				}
				if (this.slaveIp != '' && (this.index == 0 || this.index == 3)) {
					if (!ip.test(this.slaveIp)) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alert',
							content: '备用ip段格式错误！'
						});
						return false;
					}
				}
				if ((this.index == 5) && this.ip == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: 'mac地址不能为空'
					});
					return false;
				}
				if ((this.index == 1 || this.index == 2) && this.ip == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: '序列号不能为空'
					});
					return false;
				}
				if ((this.index == 1 || this.index == 2 ) && this.ip != '') {
					if (!num.test(this.ip)) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alert',
							content: '序列号只能为数字或字母'
						});
						return false;
					}
				}
				if (this.maxLen != '') {
					if (isNaN(this.maxLen)) {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alert',
							content: '字宽格式错误！'
						});
						return false;
					}
					if (this.maxLen == '0') {
						this.$store.commit('setWin', {
							title: '错误提示',
							winType: 'alert',
							content: '字宽不能为0'
						});
						return false;
					}
				} else {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: '字宽不能为空'
					});
					return false;
				}
			}
			return true;
		},
		//改变排序
		changeNum: function(e) {
			this.num = e;
		},

		//测试打印机设置
		async testPrinter() {
			let abc = false;
			if (this.types == 'addPrint') {
				this.newPrintDetial = await http.addPrint({
					data: {
						createUid: this.createUid,
						printerName: this.printerName,
						ip: this.ip,
						slaveIp: this.slaveIp,
						maxLen: this.maxLen,
						type: this.type,
						sort: this.num,
						printTerminalId:this.terminaIndex,
					}
				});
				this.newPrintDetial.id = this.newPrintDetial.id + ''; //添加打印机，id转化为字符串类型
				this.printerList.push(this.newPrintDetial);
				abc = true;
			} else if (this.types == 'edit') {
				this.newPrintDetial = await http.editPrinter({
					data: {
						printerId: this.printerId,
						createUid: this.createUid,
						printerName: this.printerName,
						ip: this.ip,
						slaveIp: this.slaveIp,
						maxLen: this.maxLen,
						type: this.type,
						sort: this.num,
						printTerminalId:this.terminaIndex,
					}
				});
				this.printerList.splice(
					this.printIndex,
					1,
					this.newPrintDetial
				);
				abc = true;
			}
			if(abc){
				//插入终端名称
				for(let i=0;i<this.printerList.length;i++){
					this.$set(this.printerList[i], 'terminaName', '路由器');
					for(let j=0;j<this.terminalList.length;j++){
						if(this.printerList[i].printTerminalId == this.terminalList[j].id){
							this.printerList[i].terminaName = this.terminalList[j].name;
						}
					}
				}
				this.printerTestPage();
			}
		},
		//测试打印机接口
		async printerTestPage(){
			let abc = false;
			abc = await http.printerTestPage({
				data: {
					shopId: this.shopId,
					printerId: this.newPrintDetial.id
				}
			});
			if (abc) {
				this.$store.commit('setWin', {
					title: '提示',
					winType: 'alert',
					content: '测试打印已出单'
				});
			}
		},
		//测试保存打印机
		savePrinter: function() {
			if (this.isOk()) {
				this.isTest = false;
				this.reTi = true;
				let that = this;
				let timer = setInterval(function() {
					that.reTime--;
					if (that.reTime < 1) {
						that.isTest = true;
						that.reTi = false;
						clearInterval(timer);
						that.reTime = 5;
					}
				}, 1000);
				that.testPrinter();
			}
		},
		//初始化获取打印机详情
		getPrintDetial() {
			// console.log(this.printDetial);
			this.terminaIndex = this.printDetial.printTerminalId+'';
			this.printerName = this.printDetial.printerName;
			this.ip = this.printDetial.ip;
			this.slaveIp = this.printDetial.slaveIp;
			this.maxLen = this.printDetial.maxLen;
			if (parseInt(this.printDetial.type) == 0) {
				this.isTest = true; //如果为网口打印机，测试按钮显示，否则不显示
			} else if (parseInt(this.printDetial.type) == 2) {
				this.index = 1;
				this.isNum = 1;
				this.isDisabled = true;
				this.isTest = false;
			} else if (parseInt(this.printDetial.type) == 3) {
				this.index = 2;
				this.isNum = 1;
				this.isDisabled = true;
				this.isTest = false;
			} else if (parseInt(this.printDetial.type) == 4) {
				this.index = 3;
				this.isDisabled = false;
				this.isTest = false;
			} else if (parseInt(this.printDetial.type) == 5) {
				this.index = 4;
				this.isNum = 2;
				this.isDisabled = false;
			} else if (parseInt(this.printDetial.type) == 6) {
				this.index = 5;
				this.isNum = 3;
				this.isDisabled = false;
			} else {
				this.isTest = false;
			}
			this.num = this.printDetial.sort;
		}
	}
};
</script>
<style type="text/css" scoped>
.print-form {
	width: 580px;
	height: auto;
	/* background-color: #f2f2f2; */
	padding: 20px;
	overflow: hidden;
}
.print-form .labItem {
	margin-bottom: 5px;
	margin-left: 0!important;
	margin-right: 10px;
}
</style>

