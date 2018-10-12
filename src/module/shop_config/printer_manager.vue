/**
 * @Author: 孔伟研 
 * @Date: 2018-08-09 09:57:23 
 * @Last Modified by:   孔伟研 
 * @Last Modified time: 2018-08-09 09:57:23 
 * @Module:店铺配置——打印机管理
**/
<template>
	<section class="fl user-content" id="printer" v-cloak>
		<section class="user-info">
			<section class="commodity-box">
				<section class="commodityAdd fl" @click="openWin(null,'addPrint',null)">
					<section class="combox">
						<img src="../../res/images/comadd.png" alt="添加" />
						<h3>新建打印机</h3>
					</section>
				</section>
				<section class="fl" v-for="(pList,i) in printerList" :key="i" style="background-color: #eeeeee;color: #898989;" @click="openWin(pList.id,'edit',i)">
					<section style="border-left: 2px solid #026eb7;height: 30px;width: 100%;margin-bottom: 40px;">
						<section class="fl" style="width: 210px;text-indent: 10px;">
							<section :title="pList.printerName" style="height: 30px;line-height: 30px;font-size: 16px;word-wrap:brea;word-wrap:break-word; white-space:nowrap;overflow:hidden; text-overflow:ellipsis;">{{pList.printerName}}</section>
						</section>
						<section style="width: 80px;height: 60px;line-height: 60px;text-align: center;" class="fr">
							<h2 style="font-size: 64px;color: #dddddd;">{{i+1}}</h2>
						</section>
					</section>
					<section style="height: 70px;text-indent: 10px;">
						<p v-if="pList.type==2 || pList.type==3" style="color: #666;font-size:18px;font-weight: bold;line-height: 30px;height: 30px;">序列号：
							<span style="font-size: 18px;">{{pList.ip}}</span>
						</p>
						<p v-else style="color: #666;font-size:18px;font-weight: bold;line-height: 30px;height: 30px;">IP：
							<span style="font-size: 18px;">{{pList.ip}}</span>
						</p>
						<p style="height: 20px;line-height: 20px;">字宽：
							<span>{{pList.maxLen}}</span>
						</p>
						<p style="height: 20px;line-height: 20px;">类型：
							<span>{{pList.typeName}}</span>
						</p>
					</section>
				</section>
			</section>
			<component v-if="showWin" :is="ass" @printManagerWin="throwWinResult" :printDetial = 'printDetial' :printerId='printerId' :printerList='printerList' :types='types' :printIndex="printIndex" :showWin="showWin"></component>
		</section>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			shopId: null, //店铺id
			printerList: [],
			detial: null,
			showWin: false,
			printerId: '', //打印机id
			types: '', //添加、修改 标识
			printIndex: 0, //打印机下标
			printDetial: null //从弹框返回的打印机的详情
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.getPrinterList();
	},
	components: {
		printManagerWin: () =>
			import(/* webpackChunkName:"printer_manager_win" */ './printer_manager_win')
	},

	methods: {
		async getPrinterList() {
			// 请求打印机列表
			this.printerList = await http.getPrinterList({
				data: { shopId: this.shopId }
			});
			this.printerList.sort(this.printerSort('sort'));
		},
		async openWin(pid, types, index) {
			if(types == 'edit'){
				this.printDetial = await http.getPrintDetial({
					data: { shopId: this.shopId, printerId: pid }
				});
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
			} else if (res == 'cancel' && this.types == 'edit') {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确定删除该打印机?',
					callback: delRes => {
						if (delRes == 'ok') {
							this.deletePrinter();
							this.showWin = false;
						}
					}
				});
			} else {
				this.showWin = false;
			}
		},
		//添加打印机请求
		async addPrint() {
			await http.addPrint({
				data: {
					shopId: this.printDetial.shopId,
					createUid: this.printDetial.createUid,
					printerName: this.printDetial.printerName,
					ip: this.printDetial.ip,
					slaveIp: this.printDetial.slaveIp,
					maxLen: this.printDetial.maxLen,
					type: this.printDetial.type,
					sort: this.printDetial.sort
				}
			});
			this.getPrinterList();
		},
		//修改打印机请求
		async editPrinter() {
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
					sort: this.printDetial.sort
				}
			});
			this.getPrinterList();
		},
		//删除打印机请求
		async deletePrinter() {
			await http.deletePrinter({
				data: {
					printerId: this.printDetial.printerId,
					shopId: this.printDetial.shopId
				}
			});
			this.getPrinterList();
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
/* .selectbtns span{background-color: #FFFFFF;}
	.selectbtns span:hover{background-color: #FFFFFF;} */
.commodity-box > section {
	height: 150px;
}
</style>
