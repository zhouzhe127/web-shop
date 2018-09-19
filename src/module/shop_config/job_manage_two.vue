<!--
	**职位管理二级弹窗
	*
	* 胡江
	* *
	*
-->
<template>
	<win @winEvent="clickTanResult" :align="'center'" :width="1000" :height="480">
		<!--标题-->
		<span slot="title">职位权限配置</span>
		<!--内容-->
		<div slot="content">
			<div class="permissions" v-if="tabList1 && tabList1.length > 0">
				<div class="tas-addtas2">
					<ul>
						<li v-for="(item,i) in tabList1" :key="i" :class='{"bgc-blue":tab1Index==i}' v-on:click="funSelectOne(i)">{{item.title}}</li>
					</ul>
				</div>
				<div class="tas-addtas2">
					<ul>
						<li v-for="(item,j) in tabList2" :key="j" :class='{"bgc-hui":tab2Index==j}' v-on:click="funSelectTwo(j)">{{item.title}}</li>
					</ul>
				</div>
				<div class="selectbtns">
					<span v-for="(item,i) in list" :key="i" :class="{'sign':item.selected }" @click="isSelected(item)">{{item.title}}</span>
				</div>
			</div>
			<div style="width:100%;height: 40px;background-color: #f7f7f7;position: fixed;bottom: 50px;left: 0;">
				<section v-on:click="dellAll" class="isallselect" :class="{'allselect':!allSelect}">取消全部</section>
				<section v-on:click="selectAll" class="isallselect" :class="{'allselect':allSelect}">选择全部</section>
				<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择{{selectNum}}个</h3>
			</div>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			nodeIds: [], //某个职位的权限列表
			tab1Index: 0,
			tab2Index: 0,
			tabList1: [],
			tabList2: [],
			list: [],
			newList: [], //新建一个列表得到一共选择数量使用
			allSelect: false, //是否全部选择取消
			selectNum: 0 //已经选择的数量
		};
	},
	props: {
		info: Object //职位信息
	},
	mounted() {
		this.nodeIds = this.info.nodeIds;
		for (let i = 0; i < this.nodeIds.length; i++) {
			this.nodeIds[i] = parseInt(this.nodeIds[i]);
		}
		this.getPermissionsList();
	},
	methods: {
		// 获取可选权限列表
		async getPermissionsList() {
			let res = await http.newGetPermissionsList({
				data: {
					type: this.info.type
				}
			});
			if (res) {
				res = [
					{
						id: '0',
						title: '全部',
						child: []
					}
				].concat(res);
				let list = res;
				for (let i = 0; i < list.length; i++) {
					if(list[i].child){
						for (let j = 0; j < list[i].child.length; j++) {
							if(list[i].child[j].child){
								for (let m = 0;m < list[i].child[j].child.length;m++) {
									list[i].child[j].child[m].selected = false;
									for (let n = 0; n < this.nodeIds.length; n++) {
										if (
											this.nodeIds[n] ==
											list[i].child[j].child[m].id
										) {
											list[i].child[j].child[m].selected = true;
										}
									}
								}
							}
						}
					}
					
				}
				this.tabList1 = list; //一级列表
				this.tab1Changed();
			}
		},
		funSelectOne(index) {
			this.tab1Index = index;
			this.tab2Index = 0;
		},
		funSelectTwo(index) {
			this.tab2Index = index;
		},
		tab1Changed(item) {
			if (this.tab1Index > 0) {
				let childall = this.tabList1[this.tab1Index];
				let tv2 = this.tabList1[this.tab1Index].child
					? this.tabList1[this.tab1Index].child
					: [];
				tv2 = [
					{
						id: '0',
						title: '全部',
						child: childall
					}
				].concat(tv2);
				this.tabList2 = tv2; //二级列表
				this.tab2Changed(item);
			} else {
				let narr = [];
				let arr = this.tabList1;
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < arr[i].child.length; j++) {
						narr = narr.concat(arr[i].child[j].child); //权限列表
					}
				}
				this.list = narr;
				this.newList = narr;
				for (let i = 0; i < this.list.length; i++) {
					if (
						this.list[i] == null ||
						this.list[i] == undefined ||
						this.list[i] == ''
					) {
						this.list.splice(i, 1);
					}
				}
				this.tabList2 = [];
				if (item) {
					for (let i = 0; i < this.list.length; i++) {
						if (item.id == this.list[i].id) {
							this.list[i].selected = !this.list[i].selected;
						}
					}
				}
			}
		},
		tab2Changed: function(item) {
			if (this.tab2Index != 0 || this.tab1Index == 0) {
				if (this.tabList2.length > this.tab2Index) {
					this.list = this.tabList2[this.tab2Index].child
						? this.tabList2[this.tab2Index].child
						: []; //切换二级列表对权限列表重新赋值
				}
				if (item) {
					for (let i = 0; i < this.list.length; i++) {
						if (item.id == this.list[i].id) {
							this.list[i].selected = !this.list[i].selected;
						}
					}
				}
			} else {
				let narr = [];
				let arr = this.tabList1[this.tab1Index].child;
				for (let i = 0; i < arr.length; i++) {
					narr = narr.concat(arr[i].child); //切换一级列表，对权限列表重新赋值
				}
				this.list = narr;
				for (let i = 0; i < this.list.length; i++) {
					if (
						this.list[i] == null ||
						this.list[i] == undefined ||
						this.list[i] == ''
					) {
						this.list.splice(i, 1);
					}
				}
				if (item) {
					for (let i = 0; i < this.list.length; i++) {
						if (item.id == this.list[i].id) {
							this.list[i].selected = !this.list[i].selected;
						}
					}
				}
			}
		},
		//全部选择
		selectAll() {
			this.allSelect = true;
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].selected = true;
			}
		},
		//全部取消
		dellAll() {
			this.allSelect = false;
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].selected = false;
			}
		},
		isSelected(item) {
			this.tab1Changed(item);
		},
		clickTanResult(res) {
			if (res == 'ok') {
				let selects = this.tabList1;
				let arr = [];
				for (let i = 0; i < selects.length; i++) {
					for (let j = 0; j < selects[i].child.length; j++) {
						for (
							let m = 0;
							m < selects[i].child[j].child.length;
							m++
						) {
							if (selects[i].child[j].child[m].selected) {
								arr.push(selects[i].child[j].child[m].id);
							}
						}
					}
				}
				this.info.nodeIds = arr; //改变父组件传递过来的info
			}
			this.$emit('throwTanResult', res); //抛出一个事件给父组件
		}
	},
	watch: {
		tab1Index: 'tab1Changed',
		tab2Index: 'tab2Changed',
		list: {
			deep: true,
			handler: function() {
				let list = this.newList;
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					if (list[i].selected == true) {
						arr.push(list[i]);
					}
				}
				this.selectNum = arr.length;
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	}
};
</script>

<style scoped>
.selectbtns {
	width: 100%;
	height: auto;
	overflow: hidden;
	padding-bottom: 50px;
}
.selectbtns span {
	display: inline-block;
	height: 40px;
	line-height: 40px;
	padding-left: 18px;
	padding-right: 18px;
	background-color: #f1f1f1;
	cursor: pointer;
	margin: 1px;
}
.permissions {
	height: 580px;
	padding: 20px;
	/* overflow: auto; */
}
.sign {
	background: url('../../res/images/sign.png') right bottom no-repeat;
}
.selectbtns span:hover {
	background-color: #eeeeee;
}
.tas-addtas2 {
	margin: 10px 0;
}
.tas-addtas2 ul li {
	display: inline-block;
	padding: 0 20px 0 20px;
	font-size: 14px;
	text-align: center;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	margin-right: 2px;
	margin-bottom: 2px;
	background-color: #f2f2f2;
}
.bgc-blue {
	background-color: #2980b9 !important;
	color: #ffffff;
	position: relative;
}
.bgc-blue:after {
	content: '';
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-bottom: 5px solid #fff;
	position: absolute;
	left: 50%;
	bottom: 0;
	transform: translate(-50%, 0);
	/*!* IE 9 *!*/
	/*-ms-transform: translate(-50%, 0);*/
	/*!* Firefox *!*/
	/*-moz-transform: translate(-50%, 0);*/
	/*!* Safari 和 Chrome *!*/
	/*-webkit-transform: translate(-50%, 0);*/
	/*!* Opera *!*/
	/*-o-transform: translate(-50%, 0);*/
}
.bgc-hui {
	background-color: #7f7f7f !important;
	color: white !important;
}
.isallselect {
	cursor: pointer;
	width: 100px;
	height: 30px;
	float: left;
	line-height: 30px;
	text-align: center;
	margin: 5px;
	border: 1px solid #a0a0a0;
	color: #a0a0a0;
	float: left;
}
/* .allSelect{
		 position: absolute;
		bottom: 0;left: 20px;
	 } */
.allselect {
	border: 1px solid #ff9700;
	color: #ff9700;
}
</style>