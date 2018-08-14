<!--
	**销方管理列表
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="sales">
		<div v-if="!isShow">
			<section class="enquiries">
				<span>销方名称：</span>
				<input class="numbering" type="text" placeholder="请输入销方名称" v-model="salesName" maxlength="30" />
				<span>销方税号：</span>
				<input class="numbering" type="text" placeholder="请输入销方税号" v-model="salesNum" maxlength="20" />
				<!--<span>开票人：</span>-->
				<!--<input class="numbering" type="text" placeholder="请输入开票人" v-model="ticketPeople" maxlength="14" />-->
				<a href="javascript:;" style="background: #2EA8DC;" @click="searchTime()">筛选</a>
				<a href="javascript:;" style="background: #B3B3B3;" @click="reset()">重置</a>
			</section>
			<section class="clear"></section>
			<div v-if="loading">
				<table-com :listName="'销方管理'" :titleData="tableOne" :introData="salesList" :allTotal="count" :bannerStyle="{'backgroundColor':'#f2f2f2'}">
					<span style="cursor: pointer;" slot="con-0" slot-scope="props">
						<!--<span style="color:#2EA8DC;" @click="toSee(props.data,props.index)">查看详情</span>-->
						<!--<span style="padding:0 10px;color: #D2D2D2;">|</span>-->
						<span style="color: #FE8D2C;" @click="toEdit(props.data,props.index)">编辑</span>
					</span>
					<span slot="con-1" slot-scope="props">{{props.index+1}}</span>
				</table-com>
				<section style="margin-top: 10px">
					<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20,30]"></pageElement>
				</section>
			</div>
			<section class="load" v-else>
				<img src="../../res/images/preloader.gif" />
			</section>
		</div>

		<div v-if="isShow">
			<salesBuild :isAdd="isAdd" :editData="editData" @salesFun="salesFun"></salesBuild>
		</div>
	</div>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			salesName: '', //销方名称
			salesNum: '', //销方税号

			salesList: [], //销方列表，展示的数据
			allSalesList: [], //所有数据
			list: [], //所有数据，用于搜索

			num: 10, //一页处理多少数据
			count: 0, //总数量
			total: 0, //总页数
			page: 1, //当前第几页

			isShow: false,
			isAdd: Boolean,
			editData: {},
			arr: [],
			loading: false
		};
	},
	created() {
		this.arr = [
			{
				name: '新建',
				className: 'export-btn',
				fn: () => {
					this.isShow = true;
					this.isAdd = true;
				}
			}
		];
		this.$store.commit('setPageTools', this.arr);
		this.tableOne = [
			{
				titleName: '操作',
				titleStyle: { width: '180px' }
			},
			{
				titleName: '序号',
				titleStyle: { width: '40px' }
			},
			{
				titleName: '销方名称',
				dataName: 'name'
			},
			{
				titleName: '销方税号',
				dataName: 'identifier'
			},
			{
				titleName: '销方地址',
				dataName: 'address'
			},
			{
				titleName: '开户银行',
				dataName: 'bank'
			},
			{
				titleName: '银行账号',
				dataName: 'bankAcc'
			},
			{
				titleName: '销方电话',
				dataName: 'telephoneNo'
			}
		];
		this.invoiceGetList();
	},
	methods: {
		//筛选
		searchTime() {
			let newList = [];
			if (this.salesName == '' && this.salesNum == '') {
				newList = this.list;
			} else {
				newList = this.list.filter(value => {
					return (
						(value.identifier.indexOf(this.salesNum) >= 0 &&
							this.salesNum != '') ||
						(value.name.indexOf(this.salesName) >= 0 && this.salesName != '')
					);
				});
			}
			this.allSalesList = newList;
			this.num = 10;
			this.page = 1;
			this.paging();
		},
		//重置
		reset() {
			this.salesName = '';
			this.salesNum = '';
			this.allSalesList = this.list;
			this.num = 10;
			this.page = 1;
			this.paging();
		},
		//编辑
		toEdit(data) {
			this.isAdd = false;
			this.isShow = true;
			this.editData = data;
		},
		//请求列表数据
		async invoiceGetList() {
			this.loading = false;
			let res = await http.invoiceGetList({
				data: {}
			});
			if (res) {
				let data = [];
				data = res.map(value => {
					delete value.commData.client;
					return value.commData;
				});
				this.allSalesList = data;
				this.list = data;
			}
			this.paging();
			this.loading = true;
		},
		//分页组件返回值
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.paging();
		},
		//分页
		paging() {
			this.total = Math.ceil(this.allSalesList.length / this.num); //获取总页数
			this.count = this.allSalesList.length; //获取总数量
			this.salesList = this.allSalesList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //截取当前页数据
		},
		//新建编辑销方返回
		salesFun(type) {
			this.$store.commit('setPageTools', this.arr);
			if (type == 'ok') {
				//				if(this.isAdd){
				//					this.allSalesList.push(data);
				//				}else {
				//					this.allSalesList.splice(((this.page - 1) * this.num+this.editIndex),1,data);
				//				}
				this.invoiceGetList();
			}
			this.isShow = false;
		}
	},
	components: {
		tableCom: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		pageElement: () =>
			import(/*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		salesBuild: () =>
			import(/*webpackChunkName:'sales_party_build'*/ './sales_party_build')
	}
};
</script>

<style scoped lang="less">
#sales {
	.enquiries {
		display: inline-block;
		.numbering {
			width: 200px;
			height: 40px;
			border: 1px solid #b3b3b3;
			text-indent: 25px;
			display: inline-block;
			outline: none;
			margin-right: 10px;
		}
		a {
			display: inline-block;
			width: 100px;
			height: 40px;
			text-align: center;
			line-height: 40px;
			color: #fff;
			margin-left: 10px;
		}
	}
	.clear {
		clear: both;
		height: 20px;
	}
	.load {
		width: 128px;
		margin: 200px auto;
	}
}
</style>