/**
 * @Author: 孔伟研 
 * @Date: 2018-08-03 16:52:53 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-08-03 16:53:47
 * @Module:
**/
/**
 * @Author: 孔伟研 
 * @Date: 2018-08-03 16:52:49 
 * @Last Modified by:   孔伟研 
 * @Last Modified time: 2018-08-03 16:52:49 
 * @Module:打印队列
**/
<template>
	<section style="text-align:left;position: relative;" id="print-queue">
		<!-- <div class="clearbtn"><a v-on:click = "clearbtn" href="javascript:void(0);" class="green" style="width: 100%;">清空打印队列</a></div> -->
		<section class="oBox">
			<div class="boxTop">
				<span style="font-size:16px;margin-right: 20px;">打印队列列表 · 共<span style="color: #ff3c04;font-size: inherit;">{{PrintList.length}}</span>个条目</span>
			</div>
			<el-table
				ref="multipleTable" stripe
				:header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="PrintList"
				border
				style="width: 100%">
				<el-table-column fixed min-width = "100" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer;" @click="openDetails(scope.row.printData)">详情</span>
					</template>
				</el-table-column>
				<el-table-column fixed align="center" min-width = "60" label="序号" > 
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed align="center" min-width = "180" prop="orderName" label="打印单据名称"></el-table-column>
				<el-table-column min-width = "150" align="center" prop="ip" label="打印机ip"></el-table-column>
				<el-table-column min-width = "80" prop="printTimes" align="center" label="打印次数" > </el-table-column>
				<el-table-column min-width = "180" prop="createTime" align="center" label="生成时间" > </el-table-column>
			</el-table>
		</section>
		<!-- <section>
			<com-table :listHeight='50' :listName="'打印队列'" :fixed='2' :listWidth="770" :showTitle='1' :introData="PrintList" :titleData="titleList" :allTotal="PrintList.length">
				<div slot="con-0" slot-scope="props">{{props.index + 1}}</div>
				<div slot="con-5" slot-scope="props">
					<a href="javascript:void(0);" class="blue" style="width:100%;" @click="openDetails(props.data.printData)">详情</a>
				</div>
			</com-table>
		</section> -->
		<print-queue-win v-if="showWin" @printQueueWin="throwWinResult" :alist='alist'></print-queue-win>
	</section>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			// titleList: [
			// 	{ titleName: '序号', titleStyle: { width: '10%' } },
			// 	{
			// 		titleName: '打印单据名称',
			// 		titleStyle: { width: '20%' },
			// 		dataName: 'orderName'
			// 	},
			// 	{
			// 		titleName: '打印机ip',
			// 		titleStyle: { width: '20%' },
			// 		dataName: 'ip'
			// 	},
			// 	{
			// 		titleName: '打印次数',
			// 		titleStyle: { width: '10%' },
			// 		dataName: 'printTimes'
			// 	},
			// 	{
			// 		titleName: '生成时间',
			// 		titleStyle: { width: '20%' },
			// 		dataName: 'createTime'
			// 	},
			// 	{ titleName: '打印详情', titleStyle: { width: '20%' } }
			// ],
			shopId: null, //店铺id
			PrintList: [],
			showWin: false,
			alist: []
		};
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '清空打印队列',
				className: ['addStaff', 'export-btn', 'green'],
				fn: this.clearbtn
			}
		]);
		this.getPrintList();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		printQueueWin: () =>
			import(/*webpackChunkName: "print_queue_win"*/ './print_queue_win')
	},
	methods: {
		throwWinResult: function() {
			this.showWin = false;
		},
		//初始化
		async getPrintList() {
			//获取打印列表
			let list = await http.getPrintList({ data: {} });
			this.PrintList = list;
		},
		//清空打印队列
		clearbtn: function() {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确定清空打印队列?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.clearPrr();
					}
				}
			});
		},
		async clearPrr() {
			let arr = await http.clearPrintcolumn({ data: {} });
			if (!arr) {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alert',
					content: '请求失败'
				});
			} else {
				this.$store.commit('setWin', {
					title: '提示',
					winType: 'alert',
					content: '打印队列已清空！'
				});
				this.getPrintList();
			}
		},
		//打开详情
		openDetails: function(item) {
			this.showWin = true;
			let str = item;
			let arr = str.split(',');
			for (let i = 0; i < arr.length; i++) {
				if (
					arr[i] == '' ||
					typeof arr[i] == 'undefined' ||
					arr[i] == '-'
				) {
					arr.splice(i, 1);
					i = i - 1;
				}
			}
			this.alist = arr;
		}
	}
};
</script>
<style type="text/css" lang="less" scoped>
/* #print-queue .clearbtn{position: absolute;top:-45px;right: 0;width:150px} */
#print-queue-tan .oDetial {
	width: 100%;
	height: 20px;
	line-height: 20px;
	text-align: center;
}
#print-queue{
	.oBox{
		width:100%;border-bottom:none;margin:10px 0;
		.boxTop{
			height:50px;line-height: 50px;border-bottom:1px solid #ebeef5;padding:0 5px;border:1px solid #ebeef5;border-bottom:none;
		}
	}
}
</style>