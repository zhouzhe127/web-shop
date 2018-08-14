/**
 * @Author: 孔伟研 
 * @Date: 2018-08-09 09:57:54 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-08-09 16:53:16
 * @Module:打印机管理弹窗
**/
<template>
	<win @winEvent="printMueueWin" :align="'right'" :width="580" :height="'auto'" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<section class="print-form">
				<el-form :model="printDetial" ref="printDetial" label-width="100px">
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
					<el-form-item required label="序列号" v-if="isNum">
						<el-input v-model="ip" placeholder = "请输入设备唯一序列号" maxlength='15' style = "width:300px;"></el-input>
					</el-form-item>
					
					<el-form-item required label="最大字宽">
						<el-input v-model="maxLen" placeholder = "请输入最大字宽，建议为48" maxlength='2' style = "width:300px;"></el-input>
						<label class="fl" style="line-height: 20px;margin-top: 10px;font-size: 16px;color: #b5b5b5;">
							(每行最多打印英文字的个数。<br /> &nbsp;80mm打印机:&lt;=48;58mm打印机:&lt;=32)
						</label>
					</el-form-item>
					
					<el-form-item required label="通信类型">
						<el-radio-group v-model="index">
							<el-radio class="labItem" @change="changeIndex(i)" v-for="(item,i) in list" :key="i" :label="i" border>{{item.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item required label="排序">
						<el-input-number v-model="num" @change="changeNum" style="width:150px;" :min="1" :max="255"></el-input-number>
						<button v-if="isTest" v-on:click="savePrinter" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px">测试并保存</button>
						<button v-if="reTi" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px;background-color: #ccc;">{{reTime}}秒后重新测试</button>
					</el-form-item>
				</el-form>
				<!-- <label class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">排序</span>
					<div style="width: 200px;overflow: hidden;" class="fl">
						<subaddBtn :minnum='1' :bindnum="num" :maxnum="255" @toClick="changeNum" :sign='false'></subaddBtn>
					</div>
					<button v-if="isTest" v-on:click="savePrinter" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px" class="fl">测试并保存</button>
					<button v-if="reTi" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px;background-color: #ccc;" class="fl">{{reTime}}秒后重新测试</button>
				</label>
				<label class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">名称</span>
					<input type="text" class="fl printText" v-model="printerName" placeholder="请输入名称" maxlength="30" />
				</label>
				<label v-if="!isNum" class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">IP地址</span>
					<input type="text" class="fl printText" v-model="ip" placeholder="请输入IP地址" />
				</label>
				<label v-if="!isNum" class="fl" style="margin-bottom: 10px;">
					<span class="fl printName">备用IP地址</span>
					<input type="text" class="fl printText" v-model="slaveIp" placeholder="请输入备用IP地址" />
				</label>
				<label v-else class="fl" style="margin-bottom: 10px;">
					<span v-if="isNum" class="fl required printName">序列号</span>
					<input type="text" class="fl printText" v-model="ip" placeholder="请输入设备唯一序列号" maxlength='15' />
				</label>
				<label v-if="!isNum" class="fl" style="padding-left: 100px;line-height: 20px;margin-bottom: 10px;font-size: 16px;color: #b5b5b5;">
					(局域网IP地址,例如：192.168.66.11。<br /> &nbsp;电脑打印机的IP地址必须设为127.0.0.1)
				</label>
				<label class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">最大字宽</span>
					<input type="text" class="fl printText" v-model="maxLen" maxlength="2" placeholder="请输入最大字宽，建议为48" />
				</label>
				<label class="fl" style="padding-left: 100px;line-height: 20px;margin-bottom: 10px;font-size: 16px;color: #b5b5b5;">
					(每行最多打印英文字的个数。<br /> &nbsp;80mm打印机:&lt;=48;58mm打印机:&lt;=32)
				</label>
				<label class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">通信类型</span>
					<div style="width: 400px;" class="fl printText">
						<radioBtn @selOn="changeIndex" :list="list" :index="index" :name='"name"'></radioBtn>
					</div>
				</label>
				<label class="fl" style="margin-bottom: 10px;">
					<span class="fl required printName">排序</span>
					<div style="width: 200px;overflow: hidden;" class="fl">
						<subaddBtn :minnum='1' :bindnum="num" :maxnum="255" @toClick="changeNum" :sign='false'></subaddBtn>
					</div>
					<button v-if="isTest" v-on:click="savePrinter" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px" class="fl">测试并保存</button>
					<button v-if="reTi" style="width: 110px;height: 30px;margin-left: 20px;text-align: center;margin-top:5px;background-color: #ccc;" class="fl">{{reTime}}秒后重新测试</button>
				</label> -->
			</section>
		</div>
	</win>
</template>

<script>
// import win from "src/components/win.vue";
// import store from "src/manager/store.js";
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			shopId: '',
			createUid: '',
			title: '打印机',
			okStyle: null,
			cancelStyle: null,
			// printDetial: null,
			list: [
				{
					type: 0,
					name: '网口打印机'
				},
				{
					type: 2,
					name: 'T1打印机'
				},
				{
					type: 3,
					name: 'V1打印机'
				},
				{
					type: 4,
					name: '不干胶打印机'
				}
			],
			type: 0,
			index: 0,
			num: 255,
			sign: '',
			printerName: '',
			ip: '',
			slaveIp: '', //备用IP
			maxLen: '',
			isDisabled: false, //判断打印机IP字段显示隐藏
			isNum: false, //序列号 T1 v1打印机
			isTest: true, //测试按钮显示隐藏
			reTime: 5,
			reTi: false,
			newPrintDetial: { id: 0 } //新建的打印机详情
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
		if (this.types == 'addPrint') {
			this.title = '添加打印机';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#a0a0a0',
					color: '#fff'
				}
			};
		} else if (this.types == 'edit') {
			this.title = '修改打印机';
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '删除',
				style: {
					backgroundColor: '#982c2c',
					color: '#fff'
				}
			};
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
		printDetial:Object
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
				this.isNum = true;
			} else {
				this.isNum = false;
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
			if ((this.index == 1 || this.index == 2) && this.ip == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alert',
					content: '序列号不能为空'
				});
				return false;
			}
			if ((this.index == 1 || this.index == 2) && this.ip != '') {
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
						sort: this.num
					}
				});
				this.newPrintDetial.id = this.newPrintDetial.id + ''; //添加打印机，id转化为字符串类型
				abc = await http.printerTestPage({
					data: {
						shopId: this.shopId,
						printerId: this.newPrintDetial.id
					}
				});
				this.printerList.push(this.newPrintDetial);
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
						sort: this.num
					}
				});
				abc = await http.printerTestPage({
					data: {
						shopId: this.shopId,
						printerId: this.newPrintDetial.id
					}
				});
				this.printerList.splice(
					this.printIndex,
					1,
					this.newPrintDetial
				);
			}
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
			// this.printDetial = await http.getPrintDetial({
			// 	data: { shopId: this.shopId, printerId: this.printerId }
			// });
			this.printerName = this.printDetial.printerName;
			this.ip = this.printDetial.ip;
			this.slaveIp = this.printDetial.slaveIp;
			this.maxLen = this.printDetial.maxLen;
			if (parseInt(this.printDetial.type) == 0) {
				this.isTest = true; //如果为网口打印机，测试按钮显示，否则不显示
			} else if (parseInt(this.printDetial.type) == 2) {
				this.index = 1;
				this.isNum = true;
				this.isDisabled = true;
				this.isTest = false;
			} else if (parseInt(this.printDetial.type) == 3) {
				this.index = 2;
				this.isNum = true;
				this.isDisabled = true;
				this.isTest = false;
			} else if (parseInt(this.printDetial.type) == 4) {
				this.index = 3;
				this.isDisabled = false;
				this.isTest = false;
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
	padding: 20px 40px;
	overflow: hidden;
	padding-bottom: 100px;
}
.print-form .labItem {
	margin-bottom: 5px;
	margin-left: 0!important;
	margin-right: 10px;
}
/* .print-form label span.printName {
	height: 40px;
	line-height: 40px;
	width: 80px;
	text-align: right;
	margin-right: 20px;
} */
/* .print-form label input.printText {
	outline: none;
	border: none;
	background-color: #fff;
	width: 385px;
	height: 40px;
	padding-left: 10px;
} */
/* .print-form label input:focus {
	box-shadow: none;
} */
</style>

