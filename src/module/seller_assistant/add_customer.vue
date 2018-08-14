<!--
    **增加选中客户
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="addCustomer">
		<!-- 筛选 -->
		<div class="search">
			<span>关键字</span>
			<input type="text" placeholder="请输入用户昵称" v-model="nickname">
			<input type="text" placeholder="请输入员工姓名" v-model="employeeName">
			<div class="businessHours">
				<div @click="selectBusinessHours" :class="{'active':isMember}"></div>
				<span>只看无导购粉丝</span>
			</div>
			<a href="javascript:;" class="blue" @click="screening">筛选</a>
			<a href="javascript:;" class="gray" @click="resetFun">重置</a>
		</div>
		<section>
			<com-table :listHeight='80' :listWidth="1000" :showHand="true" :titleData="shoptitleList" :introData="formList" :listName="'工作人员'" :showTitle='1' :allTotal="count" :widthType='false'>
				<div class="circle" slot="title-0">
					<span :class="{ 'actives': allselect}" @click="allSelectedOne">
					</span>
				</div>
				<div slot="con-0" slot-scope="props" class="circle">
					<span :class="{ 'actives': props.data.selected}" @click="ocSelOne(props.data)">
					</span>
				</div>
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
			count: '',
			endTotal: 0,
			nickname: '', //用户昵称
			employeeName: '', //员工姓名			
			shoptitleList: [{
				titleName: '操作类型',
				titleStyle: {
					fontSize: 16 + 'px',
					flex: 'none',
					width: 200 + 'px',
					height: '100%'
				},
			},
			{
				titleName: '用户昵称 ',
				dataName: 'name',
				titleStyle: {
					fontSize: 16 + 'px',
				},
			},
			{
				titleName: '已绑定店员',
				dataName: 'staffName',
				titleStyle: {
					fontSize: 16 + 'px',
				},
			},
			],
			allFormList: [], //所有的数据
			formList: [], //展示的数据
			isMember: false,
			selectedList: [], //选中的数组
			allselect: false, //全选的状态			
		};
	},
	props: {
		staffFansId: String
	},
	methods: {
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.getFansListByCondition();
		},
		async getFansListByCondition() {
			let data = await http.getFansListByCondition({
				data: {
					nickName: this.nickname, //用户昵称
					staffName: this.employeeName, //员工姓名
					noStaff: Number(this.isMember), //有无导购
					page: this.page, //页数
					num: this.num //条数
				}
			});
			if (data) {
				this.count = data.count ? data.count : this.count;
				this.endTotal = data.total ? data.total : this.endTotal;
				//判断哪些数据是之前选中过的 选中过的加上标识
				for (let item of data.list) {
					if (this.selectedList.length == 0) {
						item.selected = false;
					} else {
						for (let int of this.selectedList) {
							if (int.id == item.id) {
								item.selected = int.selected;
								break;
							} else {
								item.selected = false;
							}
						}
					}
					this.allselect = true;
					if (!item.selected) {
						this.allselect = false;
					}
				}
				this.formList = data.list;
			}
		},
		selectBusinessHours: function() {
			//是否仅会员享受门店折扣
			this.isMember = !this.isMember;
		},
		wentBack: function() {
			//   关闭弹框
			this.$store.commit('setPageTools', {});
			this.$emit('addBack');
		},
		screening: function() { //筛选
			this.page = 1;
			this.getFansListByCondition();
		},
		resetFun: function() { //重置
			this.nickname = '';
			this.employeeName = '';
			this.isMember = false;
			this.screening();
		},
		//单选
		ocSelOne: function(item) {
			item.selected = !item.selected;
			if (item.selected) {
				this.selectedList.push(item);
				for (let i = 0; i < this.formList.length; i++) {
					if (this.formList[i].selected != true) {
						return;
					}
				}
				this.allselect = true;
			} else {
				this.allselect = false;
				for (let j = 0; j < this.selectedList.length; j++) {
					if (this.selectedList[j].id == item.id) {
						this.selectedList.splice(j, 1);
					}
				}
			}
		},
		//全选
		allSelectedOne: function() {
			if (this.allselect == true) {
				for (let i = 0; i < this.formList.length; i++) {
					this.formList[i].selected = false;
					for (let j = 0; j < this.selectedList.length; j++) {
						if (this.selectedList[j].id == this.formList[i].id) {
							this.selectedList.splice(j, 1);
						}
					}
				}
			} else {
				for (let i = 0; i < this.formList.length; i++) {
					this.formList[i].selected = true;
					if (JSON.stringify(this.selectedList).indexOf(JSON.stringify(this.formList[i])) == -1) {
						this.selectedList.push(this.formList[i]);
					}
				}
			}
			this.allselect = !this.allselect;
		},
		async batchBinding() { //新增客户
			let memberIds = [];
			for (let item of this.selectedList) {
				memberIds.push(item.id);
			}
			let data = await http.batchBinding({
				data: {
					staffFansId: this.staffFansId,
					fansIds: memberIds.join(',')
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					content: '新增成功',
					title: '操作提示',
					winType: 'alert'
				});
				this.selectedList = [];
				this.screening();
			}
		},
		addCustomer: function() {
			if (this.selectedList.length <= 0) {
				this.$store.commit('setWin', {
					content: '请选择需要绑定的客户',
					title: '操作提示',
					winType: 'alert'
				});
				return false;
			}
			this.batchBinding();
		}
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
		}, {
			name: '增加选中客户',
			className: ['userLabel'],
			fn: () => {
				this.addCustomer();
			}
		}]);
		this.getFansListByCondition();
	}
};
</script>
<style type="text/css" scoped>
#addCustomer {
	width: 100%;
	height: auto;
}

#addCustomer .search {
	width: 100%;
	height: 42px;
	margin-bottom: 18px;
}

#addCustomer .search .businessHours {
	display: inline-block;
	width: 170px;
	line-height: 42px;
	height: 42px;
}

#addCustomer .search .businessHours div {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 11px 8px;
	float: left;
}

#addCustomer .search .businessHours span {
	font-size: 16px;
	color: #333;
}

#addCustomer .search span {
	font-size: 16px;
	margin-right: 15px;
}

#addCustomer .search input {
	width: 183px;
	height: 38px;
	text-indent: 10px;
	margin-right: 15px;
}

#addCustomer .search a {
	width: 101px;
	height: 42px;
	text-align: center;
	line-height: 42px;
	margin-right: 15px;
}

.active {
	background: url(../../res/icon/selected.png) center center no-repeat,
	#28a8e0;
}

.actives {
	background: url('../../res/icon/selected.png') center center no-repeat, #28A8E0;
}

#addCustomer .circle {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

#addCustomer .circle span {
	display: inline-block;
	width: 25px;
	height: 25px;
	/* border-radius: 12.5px; */
	border: 1px solid #919191;
}
</style>