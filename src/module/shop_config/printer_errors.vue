/**
 * @Author: 孔伟研 
 * @Date: 2018-08-03 16:51:49 
 * @Last Modified by:   孔伟研 
 * @Last Modified time: 2018-08-03 16:51:49 
 * @Module:打印机错误
**/

<template>
	<section style="width:100%;" id="printerError">
		<section class="oBox">
			<div class="boxTop">
				<span style="font-size:16px;margin-right: 20px;">打印错误列表 · 共<span style="color: #ff3c04;font-size: inherit;">{{printError.length}}</span>个条目</span>
			</div>
			<el-table
				ref="multipleTable" stripe
				:header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="printError"
				border
				style="width: 100%">
				<el-table-column fixed min-width = "100" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer;" @click="openDetails(scope.row)">补打</span>
					</template>
				</el-table-column>
				<el-table-column fixed align="center" min-width = "220" prop="eid" label="订单编号"></el-table-column>
				<el-table-column min-width = "120" align="center" prop="orderName" label="打印单据名称"></el-table-column>
				<el-table-column min-width = "120" prop="errorInfo" align="center" label="错误提示" > </el-table-column>
				<el-table-column min-width = "180" prop="createTime" align="center" label="生成时间" > </el-table-column>
			</el-table>
		</section>
		<!-- <section class="table">
			<com-table :listHeight='50' :listName="'打印错误列表'" :listWidth="770" :showTitle='1' :introData="printError" :titleData="titleList" :allTotal="printError.length">
				<div slot="con-4" slot-scope="props">
					<a href="javascript:void(0);" class="yellow" style="width:100%;" @click="openDetails(props.data)">补打</a>
				</div>
			</com-table>
		</section> -->
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			// titleList: [
			// 	{
			// 		titleName: '订单编号',
			// 		titleStyle: { width: '30%' },
			// 		dataName: 'eid'
			// 	},
			// 	{
			// 		titleName: '打印单据名称',
			// 		titleStyle: { width: '15%' },
			// 		dataName: 'orderName'
			// 	},
			// 	{
			// 		titleName: '错误提示',
			// 		titleStyle: { width: '15%' },
			// 		dataName: 'errorInfo'
			// 	},
			// 	{
			// 		titleName: '生成时间',
			// 		titleStyle: { width: '25%' },
			// 		dataName: 'createTime'
			// 	},
			// 	{ titleName: '操作', titleStyle: { width: '15%' } }
			// ],
			shopId: null, //店铺id
			page: 0, //当前页的数据
			pageTotal: 1, //订单数据的总页数
			pageNum: 10, //一版页码处理多少数据
			pageCount: 0, //总条数
			printError: []
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.getPrintErrorList();
	},
	components: {
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	methods: {
		//初始化
		async getPrintErrorList() {
			//获取打印错误列表
			let printError = await http.getPrintErrorList({
				data: { shopId: this.shopId }
			});
			this.printError = printError;
		},
		//补打
		async openDetails(item) {
			let arr = await http.getPrinterrorByEid({
				data: { shopId: this.shopId, eid: item.eid }
			});
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
					content: '打印信息已传递，请稍等片刻！'
				});
				this.getPrintErrorList();
			}
		}
	}
};
</script>
<style lang="less" scoped>
	#printerError{
		.oBox{
			width:100%;border-bottom:none;margin:10px 0;
			.boxTop{
				height:50px;line-height: 50px;border-bottom:1px solid #ebeef5;padding:0 5px;border:1px solid #ebeef5;border-bottom:none;
			}
		}
	}
</style>
