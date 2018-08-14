/**
 * @Author: 孔伟研 
 * @Date: 2018-08-03 16:52:21 
 * @Last Modified by:   孔伟研 
 * @Last Modified time: 2018-08-03 16:52:21 
 * @Module:打印机配置
**/
<template>
	<section class="fl user-content" id="printercon">
		<section class="user-info">
			<section class="commodity-box">
				<section class="commodityAdd fl" @click="openWin(null,'addPcon',null)">
					<section class="combox">
						<img src="../../res/images/comadd.png" alt="添加" />
						<h3>新建打印机配置</h3>
					</section>
				</section>
				<section class="fl box" v-for="(pList,index) in conList" @click="openWin(pList.id,'edit',index)" :key="index">
					<section class="bor">
						<section class="fl" style="width: 100%;text-indent: 10px;">
							<section class="spanFont">单据数据：
								<span class="spanFont">{{pList.orderName}}</span>
							</section>
							<section :title="pList.printerName" class="spanFont">打印机：
								<span class="spanFont">{{pList.printerName}}</span>
							</section>
						</section>
					</section>
				</section>
			</section>
		</section>
		<component v-if="showWin" :is="ass" @printConfigWin="getResult" :printDetial='printDetial' :printerConId='printsetId' :types='types' :printIndex="printIndex" :showWin="showWin" :docType="docType" :areaIdsList="areaIdsList" :printerList="printerList"></component>
	</section>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			conList: [],
			detial: null,
			showWin: false,
			printsetId: '', //打印机配置id
			types: '', //添加、修改 标识
			printIndex: 0, //打印机配置下标
			printDetial: null, //从弹框返回的打印机配置的详情
			docType: [], //单据数据列表
			areaIdsList: [], //区域列表
			printerList: [] //打印机列表
		};
	},
	mounted() {
		this.getOrderNames();
		this.getAreaList();
		this.getPrinterList();
		this.getPrintsetList();
	},
	components: {
		printConfigWin: () =>
			import(/* webpackChunkName:"printer_config_win" */ './printer_config_win')
	},

	methods: {
		//从弹窗返回传回数据
		getResult: function(res, item) {
			if (res == 'ok') {
				//确定或保存按钮点击
				if (this.types == 'edit') {
					//修改
					this.editPrintset(item);
					// this.conList.splice(this.printIndex,1,item);
				} else if (this.types == 'addPcon') {
					//添加
					this.addPrintset(item);
					//    this.conList.push(this.printDetial);
				}
				this.showWin = false;
			} else if (res == 'cancel' && this.types == 'edit') {
				//删除
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确定删除该打印机配置?',
					callback: delRes => {
						if (delRes == 'ok') {
							this.deletePrintset();
							this.showWin = false;
						}
					}
				});
			} else {
				this.showWin = false;
			}
		},
		// 请求单据类型列表
		async getOrderNames() {
			this.docType = await http.getOrderNames({ data: {} });
		},
		//获取区域列表
		async getAreaList() {
			this.areaIdsList = await http.getArea({ data: {} });
		},
		//获取打印机列表
		async getPrinterList() {
			this.printerList = await http.getPrinterList({ data: {} });
		},
		async getPrintsetList() {
			// 请求打印机配置列表
			this.conList = await http.getPrintsetList({ data: {} });
		},
		// 添加打印配置接口
		async addPrintset(item) {
			this.printDetial = await http.addPrintset({ data: item });
			// 请求打印机配置列表
			this.conList = await http.getPrintsetList({ data: {} });
		},
		// 删除打印配置接口
		async deletePrintset() {
			let abc = await http.deletePrintset({
				data: { printsetId: this.printsetId }
			});
			if (abc && abc == this.printsetId * 1) {
				this.conList.splice(this.printIndex, 1);
			}
		},
		// 修改打印配置接口
		async editPrintset(item) {
			await http.editPrintset({ data: item });
			this.getPrintsetList();
		},
		async openWin(id, types, index) {
			this.ass = 'printConfigWin';
			this.printsetId = id;
			this.types = types;
			this.printIndex = index;
			if (types == 'edit') {
				this.printDetial = await http.getPrintsetById({
					data: { printsetId: this.printsetId }
				});
			}
			this.showWin = true;
		}
	}
};
</script>
<style type="text/css" scoped>
#printercon .commodity-box > section {
	height: 150px;
}
#printercon .commodity-box .box {
	background-color: #eeeeee;
	color: #898989;
}
#printercon .commodity-box .bor {
	border-left: 2px solid #026eb7;
	height: 60px;
	width: 100%;
	margin-bottom: 50px;
}
#printercon .commodity-box .spanFont {
	height: 30px;
	line-height: 30px;
	font-size: 16px;
	color: #999;
	word-wrap: brea;
	word-wrap: break-word;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
