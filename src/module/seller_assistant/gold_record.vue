<!--
    **客户金币记录
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="goldRecord">
		<section>
			<com-table :listHeight='80' :listWidth="1400" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'工作人员'" :showTitle='1' :allTotal="count">
			</com-table>
		</section>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			page: 1, //页码数
			num: 10,
			count:'',//记录条数
			endTotal: '0', //共多少页
			shoptitleList: [{
				titleName: '操作类型',
				dataName:'status'
			},
			{
				titleName: '操作时间 ',
				dataName: 'createTime'
			},
			{
				titleName: '对应客户',
				dataName: 'staffName'
			},
			{
				titleName: '金币',
				dataName: 'operateAmount'
			},
			],
			formList: [], //展示的数据			
		};
	},
	props: {
		staffFansId: String //导购的id
	},
	created() {
		let obj1 = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		for (let item of this.shoptitleList) {
			Object.assign(item, obj1);
		}
	},
	methods: {
		getPageNum: function(obj) { //翻页
			this.page = obj.page;
			this.num = obj.num;
			this.coinsLog();
		},
		async coinsLog() {
			let data = await http.coinsLog({
				data: {
					staffFansId: this.staffFansId,
					page: this.page,
					num: this.num
				}
			});
			if(data){
				this.count = data.count;
				this.endTotal = data.total;
				this.formList = data.list;
			}
		},
		wentBack: function() {
			//   关闭弹框
			this.$store.commit('setPageTools', {});
			this.$emit('coinsBack');
		},
	},
	components: {
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-blue'],
			fn: () => {
				this.wentBack();
			}
		}]);
		this.coinsLog(); //查看金币记录
	}
};
</script>
<style type="text/css" scoped>
#goldRecord {
	width: 100%;
	height: auto;
}
</style>