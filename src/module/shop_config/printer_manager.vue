/**
 * @Author: 孔伟研 
 * @Date: 2018-08-09 09:57:23 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-20 18:31:03
 * @Module:店铺配置——打印机管理
**/
<template>
	<section class="fl" id="printer" style="width:100%;">
		<div>
			<el-select v-model="terType" @change="showList" placeholder="请选择服务终端" style="width:170px;">
				<el-option
					v-for="(item,i) in newTerminalList" 
					:key="i"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<!-- <span>打印机类型</span> -->
			<el-select v-model="selectType" @change="showList" placeholder="请选择打印机类型" style="width:170px;">
				<el-option
					v-for="(item,i) in list" 
					:key="i"
					:label="item.name"
					:value="item.type">
				</el-option>
			</el-select>
			<el-input placeholder="请输入打印机名称" @change="showList" clearable v-model="printerSec" style="width:220px;">
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
			<el-button @click="reseat" type="info">重置</el-button>
		</div>
		<div style="padding:10px 0;color:#606266;" v-if="oldId!==''">
			<span>打印服务总端口配置</span>
			<el-button @click="selectTerminal" size="small" type="primary" style="margin:0 10px;">终端配置</el-button>
			<span style="color:#ccc;">当前配置：</span>
			<span style="color:#ccc;">{{terminalName}}</span>
		</div>
		<el-radio-group v-model="selectTab" style="margin:10px 0;">
			<el-radio-button label="0">打印机列表</el-radio-button>
			<el-radio-button label="1">打印服务终端</el-radio-button>
		</el-radio-group>
		<div v-if="selectTab==0" style="margin:10px 0;">
			<el-table
				stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="lists"
				border
				style="width: 100%">
				<el-table-column fixed  align="center" min-width = "120" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="openWin({pid:scope.row.id,types:'edit',index:scope.$index})">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delPrin(scope.row)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" min-width = "150" label="打印机名称" prop="printerName"></el-table-column>
				<el-table-column min-width = "150" align="center" label="打印服务终端" prop="terminaName">
					<!-- <template slot-scope="scope">
						<span v-if="scope.row.terminaName">{{scope.row.terminaName}}</span>
						<span v-else>路由器</span>
					</template> -->
				</el-table-column>
				<el-table-column align="center" min-width = "120" label="打印机类型" prop="typeName"></el-table-column>
				<el-table-column align="center" min-width = "150" label="IP/序列号" prop="ip"></el-table-column>
			</el-table>
		</div>
		<div v-if="selectTab==1" style="margin:10px 0;">
			<el-table
				stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="terminalList"
				border
				style="width: 100%">
				<el-table-column fixed  align="center" min-width = "120" label="操作">
					<template slot-scope="scope">
						<span @click="openWin({pid:scope.row.id,types:'edit',index:scope.$index,bel:true})" style="color: #FE8D2C;cursor:pointer">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span @click="delPrin(scope.row,true)" style="color: #FD3F1F;cursor:pointer">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" min-width = "150" label="终端名称" prop="name"></el-table-column>
				<el-table-column min-width = "150" align="center" label="设备SN号" prop="snNum"></el-table-column>
			</el-table>
		</div>
		<div v-if="selectTab==0" style="margin:10px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="Number(currentPage)" :page-count="Number(totalNum)" :page-size = "Number(num)" layout="sizes, prev, pager, next" :page-sizes="[10,30, 50]"></el-pagination>
		</div>
		<component v-if="showWin" :is="ass" @printManagerWin="throwWinResult" :printDetial = 'printDetial' :printerId='printerId' :printerList='printerList' :types='types' :printIndex="printIndex" :showWin="showWin" :isTerminal = "isTerminal" :terminalList="terminalList"></component>
		<selectRadioWin v-if="isOpenTerminal" @selectRadioWin ="radioBack" :list = "terminalList" :name ="'name'" :selectIndex ="terminalIn" :title = "'配置打印服务总端口'"></selectRadioWin>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: null, //店铺id
			printerList: [],//打印机列表
			copyprinterList:[],//copy打印机列表
			detial: null,
			showWin: false,
			printerId: '', //打印机id
			types: '', //添加、修改 标识
			printIndex: 0, //打印机下标
			printDetial: {}, //从弹框返回的打印机的详情
			currentPage:1,
			num:10,
			selectTab:0,
			selectType:'',
			printerSec:'',
			list: [{type: -1,name: '全部'},
				{type: 0,name: '网口打印机'},
				{type: 2,name: 'T1打印机'},
				{type: 3,name: 'V1打印机'},
				{type: 4,name: '不干胶打印机'},
				{type: 5,name: 'USB打印机'},
				{type: 6,name: '蓝牙打印机'}
			],
			terminalList: [],//服务终端列表
			newTerminalList:[],//服务终端列表----筛选用
			isTerminal:false,//打印机：false，终端：true
			terType:'',//终端筛选打印机关键字
			isOpenTerminal:false,//选择主终端弹窗
			terminalIn:0,//主终端下标
			terminalName:'',//主终端名字
			oldId:'',//主终端的初始id
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.$store.commit('setPageTools', [
			{
				name: '添加打印机',
				className: ['addStaff', 'export-btn'],
				fn: ()=>{
					this.openWin({pid:null,types:'addPrint',index:null,bel:false});
				},
			},
			{
				name: '添加打印服务终端',
				className: ['addStaff', 'export-btn'],
				fn:()=>{
					this.openWin({pid:null,types:'addPrint',index:null,bel:true});
				}
			}
		]);
		this.getPrinterList();
	},
	computed: {
		totalNum() {
			return Math.ceil(this.printerList.length / this.num);
		},
		lists() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.printerList.slice(startIndex, endIndex);
		},
		
	},
	components: {
		printManagerWin: () =>
			import(/* webpackChunkName:"printer_manager_win" */ './printer_manager_win'),
		selectRadioWin: () =>import(/*webpackChunkName: "select_radio_win"*/ 'src/components/select_radio_win')
	},

	methods: {
		radioBack(res,item){
			if(res == 'ok'){
				this.terminalIn = item.index;
				this.terminalName = item.name;
				console.log(item);
				this.setMainTerminal(item);
			}
			this.isOpenTerminal = false;
		},
		async setMainTerminal(item) {
			let oldId = item.id;
			let res = await http.setMainTerminal({
				data: {oldId:this.oldId, newId: oldId }
			});
			if(res){
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '设置成功'
				});
				this.getTerminalList();
			}
		},
		//重置
		reseat(){
			this.terType = '';
			this.selectType='';
			this.printerSec='';
			this.showList();
		},
		//设置主终端
		selectTerminal(){
			console.log(this.terminalIn);
			this.isOpenTerminal = true;
		},
		//打印机类型筛选
		// changeType(index){
		// 	this.selectType = index;
		// },
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少行
		numChange(e){
			this.num = e;
			this.currentPage = 1;
		},
		showList(){
			let list = this.copyprinterList;
			let secList = [];
			this.currentPage = 1;
			if(this.terType == -1 || this.terType === ''){
				secList = this.copyprinterList;
			}else{
				secList = list.filter(v => v.printTerminalId ==this.terType+'');
			}
			// console.log(this.terType);
			if(this.selectType == -1 || this.selectType === ''){
				// secList = secList;
			}else{
				secList = secList.filter(v => v.type ==this.selectType+'');
			}
			list = secList;
			// console.log(list);
			if(this.printerSec!==''){
				list = list.filter(v => {
					if (v.printerName) {
						return (
							v.printerName.indexOf(this.printerSec) >= 0
						);
					} else {
						return false;
					}
				});
			}
			// console.log(list);
			this.printerList = list;
			// return list.slice(
			// 	(this.currentPage - 1) * this.num,
			// 	this.currentPage * this.num
			// );
		},
		async getPrinterList() {
			// 请求打印机列表
			this.printerList = await http.getPrinterList({
				data: { shopId: this.shopId }
			});
			// 请求打印机终端列表
			this.terminalList = await http.getTerminalList({
				data: { shopId: this.shopId }
			});
			this.newTerminalList = utils.deepCopy(this.terminalList);
			let item = {id:'0',name:'路由器',isMain:'0'};
			this.newTerminalList.unshift(item);
			//获取主终端信息---
			let indexI = 0;
			if(this.terminalList&&this.terminalList.length>0){
				for(let i=0;i<this.terminalList.length;i++){
					if(this.terminalList[i].isMain == '1'){
						indexI = i;
					}
				}
				this.terminalIn = indexI;
				this.oldId = this.terminalList[indexI].id;
				this.terminalName = this.terminalList[indexI].name;
			}
			//-------

			for(let i=0;i<this.printerList.length;i++){
				this.$set(this.printerList[i], 'terminaName', '路由器');
				for(let j=0;j<this.terminalList.length;j++){
					if(this.printerList[i].printTerminalId == this.terminalList[j].id){
						this.printerList[i].terminaName = this.terminalList[j].name;
					}
				}
			}
			this.printerList.sort(this.printerSort('sort'));
			this.copyprinterList = this.printerList;
			this.showList();
		},
		async getTerminalList() {
			// 请求打印机列表
			this.terminalList = await http.getTerminalList({
				data: { shopId: this.shopId }
			});
			this.newTerminalList = utils.deepCopy(this.terminalList);
			let indexI = 0;
			if(this.terminalList&&this.terminalList.length>0){
				for(let i=0;i<this.terminalList.length;i++){
					if(this.terminalList[i].isMain == '1'){
						indexI = i;
					}
				}
				this.terminalIn = indexI;
				this.oldId = this.terminalList[indexI].id;
				this.terminalName = this.terminalList[indexI].name;
			}
			let item = {id:0,name:'路由器'};
			this.newTerminalList.unshift(item);		
			// this.terminalList.unshift({id:'-1',name:'全部'});
		},
		delPrin(item,ble){
			let name = ble?item.name:item.printerName;
			this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定删除 "'+name+ '" 打印机'+ble?'终端':''+'?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deletePrinter(item,ble);
						this.showWin = false;
					}
				}
			});
		},
		async openWin({pid, types, index,bel}) {
			this.isTerminal = bel;
			if(bel){
				this.printDetial.name = '';
				this.printDetial.snNum = '';
			}
			if(types == 'edit'){
				if(!bel){
					this.printDetial = await http.getPrintDetial({
						data: { shopId: this.shopId, printerId: pid }
					});
					if(!this.printDetial.printTerminalId){
						this.printDetial.printTerminalId = '0';
					}else{
						this.printDetial.printTerminalId = this.printDetial.printTerminalId+'';
					}
				}else{
					this.printDetial = await http.getTerminalDetial({
						data: {id: pid }
					});
				}
			}
			
			this.ass = 'printManagerWin';
			this.showWin = true;
			this.printerId = pid; //打印机id
			this.types = types; //添加、修改 标识
			this.printIndex = index; //打印机下标
		},
		//接收弹窗传递的内容数据
		throwWinResult: function(res, item) {
			this.printDetial = item;
			if (res == 'ok') {
				//判断添加修改打印机，请求不同的接口
				if (this.types == 'addPrint') {
					this.addPrint();
				} else if (this.types == 'edit') {
					this.editPrinter();
				}
				this.showWin = false;
			// } else if (res == 'cancel' && this.types == 'edit') {
			// 	this.$store.commit('setWin', {
			// 		title: '操作提示',
			// 		winType: 'confirm',
			// 		content: '确定删除该打印机?',
			// 		callback: delRes => {
			// 			if (delRes == 'ok') {
			// 				this.deletePrinter();
			// 				this.showWin = false;
			// 			}
			// 		}
			// 	});
			} else {
				this.showWin = false;
			}
		},
		//添加打印机请求
		async addPrint() {
			if(this.printDetial.isTerminal){
				await http.addTerminal({
					data: {
						name: this.printDetial.name,
						snNum: this.printDetial.snNum,
					}
				});
				// this.terminalList.push(res);
				this.getTerminalList();
			}else{
				await http.addPrint({
					data: {
						shopId: this.printDetial.shopId,
						createUid: this.printDetial.createUid,
						printerName: this.printDetial.printerName,
						ip: this.printDetial.ip,
						slaveIp: this.printDetial.slaveIp,
						maxLen: this.printDetial.maxLen,
						type: this.printDetial.type,
						sort: this.printDetial.sort,
						printTerminalId:this.printDetial.printTerminalId,
					}
				});
				this.getPrinterList();
			}
		},
		//修改打印机/终端请求
		async editPrinter() {
			// console.log(this.printDetial);
			if(this.printDetial.isTerminal){
				await http.editTerminal({
					data: {
						id: this.printDetial.printerId,
						name: this.printDetial.name,
						snNum: this.printDetial.snNum,
					}
				});
				this.getPrinterList();
			}else{
				await http.editPrinter({
					data: {
						printerId: this.printDetial.printerId,
						shopId: this.printDetial.shopId,
						createUid: this.printDetial.createUid,
						printerName: this.printDetial.printerName,
						ip: this.printDetial.ip,
						slaveIp: this.printDetial.slaveIp,
						maxLen: this.printDetial.maxLen,
						type: this.printDetial.type,
						sort: this.printDetial.sort,
						printTerminalId:this.printDetial.printTerminalId,
					}
				});
				this.getPrinterList();
			}
		},
		//删除打印机请求
		async deletePrinter(item,ble) {
			if(!ble){
				await http.deletePrinter({
					data: {
						printerId: item.id,
					}
				});
				this.getPrinterList();
			}else{
				await http.deleteTerminal({
					data: {
						id: item.id,
					}
				});
				this.terminalList.splice(this.printIndex,1);
			}
			
		},
		printerSort: function(key) {
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
		}
	}
};
</script>
<style type="text/css" scoped>

</style>
