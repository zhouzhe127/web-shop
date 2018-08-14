<!--
    **客户记录
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="customer">
		<template v-if='!addworker'>
			<header class="worker_staff_belongs">
				<input type="text" v-model.trim="keyWords" placeholder="请输入用户昵称">
				<button @click="selectWorker" class="shop_selects">筛选</button>
				<button @click="resertWorker" class="shop_resert">重置</button>
			</header>
			<section>
				<com-table :listHeight='80' :listWidth="1000" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'工作人员'" :showTitle='1' :allTotal="allFormList.length" :widthType='false'>
					<div slot="con-0" slot-scope="props" @click="deleteUser(props.data)">删除</div>
					<div slot="con-2" slot-scope="props">{{formatTime(props.data.bindingTime)}}</div>
				</com-table>
			</section>
			<!-- 翻页 -->
			<section class="turn-page">
				<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
			</section>
		</template>
		<!-- 新增客户 -->
		<addWorker v-else @addBack='addBack' :staffFansId='staffFansId'></addWorker>
	</div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			page: 1, //页码数
			num: 10,
			endTotal: 0,
			shoptitleList: [{
				titleName: '操作',
				titleStyle: {
					fontSize: 16 + 'px',
					flex: 'none',
					width: 200 + 'px'
				},
				conStyle: {
					'color': '#ff3d04',
					'cursor': 'pointer'
				}
			},
			{
				titleName: '用户昵称 ',
				dataName: 'name',
				titleStyle: {
					fontSize: 16 + 'px'
				},
			},
			{
				titleName: '绑定日期',
				dataName: 'bindingTime',
				titleStyle: {
					fontSize: 16 + 'px'
				},
			}
			],
			allFormList: [], //所有的数据
			allList: [], //所有的数据 用来搜索
			formList: [], //展示的数据
			keyWords: '', //用户昵称	
			addworker: false //是否增加心客户		
		};
	},
	props: {
		staffFansId: String //导购的id
	},
	methods: {
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.allFormList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		selectWorker: function() {
			let reg = new RegExp(this.keyWords);
			let arr = [];
			arr = this.allList.filter((item) => {
				return reg.test(item.name);
			});
			this.allFormList = Object.values(arr);
			this.setPage();
		},
		resertWorker() { //  重置
			this.page = 1;
			this.num = 10;
			this.keyWords = '';
			this.getCustomerByStaffId();
		},
		async getCustomerByStaffId() {
			let data = await http.getCustomerByStaffId({
				data: {
					staffFansId: this.staffFansId
				}
			});
			if (data) {
				this.allFormList = data;
				this.allList = this.allFormList;
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		wentBack: function() {
			//   关闭弹框
			this.$store.commit('setPageTools', {});
			this.$emit('customerBack');
		},
		deleteUser: function(item) { //删除客户
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确定删除客户吗',
				callback: (res) => {
					if (res == 'ok') {
						this.unbinding(item);
					}
				}
			});
		},
		async unbinding(item) {
			let data = await http.unbinding({
				data: {
					fansId: item.id
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: '解除成功',
					title: '操作提示',
					winType: 'alert'
				});
				this.getCustomerByStaffId();
			}
		},
		formatTime(time) {
			if (time.length == 10) {
				time *= 1000;
			}
			return utils.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
		},
		addCustomer: function() {
			this.addworker = true; //打开新增的
		},
		addBack: function() {
			this.addworker = false;
			this.$store.commit('setPageTools', [{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.wentBack();
				}
			}, {
				name: '增加客户',
				className: ['fd-blue'],
				fn: () => {
					this.addCustomer();
				}
			}]);
		}
	},
	components: {
		comTable: () =>
			import ( /*webpackChunkName: "com_table"*/ 'src/components/com_table'),
		pageElement: () =>
			import ( /*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		addWorker: () =>
			import ( /*webpackChunkName:"add_customer"*/ './add_customer'),
	},
	mounted() {
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['fd-blue'],
			fn: () => {
				this.wentBack();
			}
		}, {
			name: '增加客户',
			className: ['fd-blue'],
			fn: () => {
				this.addCustomer();
			}
		}]);
		this.getCustomerByStaffId();
	}
};
</script>
<style type="text/css" scoped>
#customer {
	width: 100%;
	height: auto;
}

#customer .worker_staff_belongs input {
	width: 184px;
	height: 42px;
	border: 1px solid #b3b3b3;
	margin-left: 19px;
	padding: 0 17px;
}

#customer .worker_staff_belongs button {
	width: 101px;
	height: 42px;
	margin-left: 19px;
}

#customer .worker_staff_belongs .shop_selects {
	background: #28a8e0;
	border: none;
	color: #fff;
	font-size: 16px;
}

#customer .worker_staff_belongs .shop_resert {
	background: #b3b3b3;
	border: none;
	color: #fff;
	font-size: 16px;
}
</style>