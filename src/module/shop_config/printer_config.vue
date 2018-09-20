/**
 * @Author: 孔伟研 
 * @Date: 2018-08-03 16:52:21 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-09-18 11:10:02
 * @Module:打印机配置
**/
<template>
	<section class="fl user-content" id="printercon" style="width:100%;">
		<div style="margin:10px 0;">
			<el-table
				stripe :header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="lists"
				border
				style="width: 100%">
				<el-table-column fixed  align="center" min-width = "120" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="openWin(scope.row.id,'edit',scope.$index)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delPrin(scope.row,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "150" align="center" label="单据数据" prop="orderName"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" min-width = "150" label="打印机名称" prop="printerName"></el-table-column>
			</el-table>
		</div>
		<div style="margin:10px 0;">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="Number(currentPage)" :page-count="Number(totalNum)" :page-size = "Number(num)" layout="sizes, prev, pager, next" :page-sizes="[10,30, 50]"></el-pagination>
		</div>
		<component v-if="showWin" :is="ass" @printConfigWin="getResult" :printDetial='printDetial' :printerConId='printsetId' :types='types' :printIndex="printIndex" :showWin="showWin" :docType="docType" :areaIdsList="areaIdsList" :printerList="printerList"></component>
	</section>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			conList: [], //打印机配置列表
			detial: null,
			showWin: false,
			printsetId: '', //打印机配置id
			types: '', //添加、修改 标识
			printIndex: 0, //打印机配置下标
			printDetial: null, //从弹框返回的打印机配置的详情
			docType: [], //单据数据列表
			areaIdsList: [], //区域列表
			printerList: [], //打印机列表
			currentPage:1,
			num:10,
		};
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '新建打印机配置',
				className: ['addStaff', 'export-btn'],
				fn: ()=>{
					this.openWin(null,'addPcon',null);
				},
			}
		]);
		this.getOrderNames();
		this.getAreaList();
		this.getPrinterList();
		this.getPrintsetList();
	},
	components: {
		printConfigWin: () =>
			import(/* webpackChunkName:"printer_config_win" */ './printer_config_win')
	},
	computed: {
		totalNum() {
			return Math.ceil(this.conList.length / this.num);
		},
		lists() {
			let startIndex = (this.currentPage - 1) * this.num;
			let endIndex = this.currentPage * this.num;
			return this.conList.slice(startIndex, endIndex);
		},
	},
	methods: {
		//分页点击
		pageClick: function(e) {
			this.currentPage = e;
		},
		//每页显示多少行
		numChange(e){
			this.num = e;
			this.currentPage = 1;
		},
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
			// } else if (res == 'cancel' && this.types == 'edit') {
			// 	//删除
			// 	this.$store.commit('setWin', {
			// 		title: '操作提示',
			// 		winType: 'confirm',
			// 		content: '确定删除该打印机配置?',
			// 		callback: delRes => {
			// 			if (delRes == 'ok') {
			// 				this.deletePrintset();
			// 				this.showWin = false;
			// 			}
			// 		}
			// 	});
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
		delPrin(item,index){
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确定删除 "'+item.orderName+ '" 打印机配置?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deletePrintset(item,index);
						this.showWin = false;
					}
				}
			});
		},
		// 删除打印配置接口
		async deletePrintset(item,index) {
			let abc = await http.deletePrintset({
				data: { printsetId: item.id }
			});
			if (abc && abc == item.id * 1) {
				this.conList.splice(index, 1);
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
