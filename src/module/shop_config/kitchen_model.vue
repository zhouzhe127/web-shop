<!--
	**后厨模式配置
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="kitchen">
		<section>
			<label class="topCom  fl">后厨模式开关：</label>
			<on-off :status="on" @statusChange="getIsDiscountToggle"></on-off>
		</section>
		<comTable :showHand="false" :titleData="titleData" :introData="currentList" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :titleHeight="50" :listHeight="50">
			<span style="cursor: pointer;display: inline-block" slot="con-0" slot-scope="props">
				<span style="color: #28A8E0;" @click="see(props.data,props.index,$event)">查看</span>
				<span style="padding:0 20px;color: #D2D2D2;">|</span>
				<span style="color: #FE8D2C;" @click="toEdit(props.data,props.index)">编辑</span>
				<span style="padding:0 20px;color: #D2D2D2;">|</span>
				<span style="color: #FD3F1F;" @click="delJob(props.data.id,props.index)">删除</span>
				<div v-if="isShowGoods === props.index" class="detLi">
					<div class="detDiv">
						<i class="detI"></i>
						<h3 class="detH3">{{goodsName.join('、')}}</h3>
					</div>
				</div>
			</span>
			<span slot="con-1" slot-scope="props">{{props.index+1}}</span>
			<span slot="con-2" slot-scope="props">{{props.data.type == 0 ? '后厨加工' : '出品台'}}</span>
		</comTable>
		<!--<section style="margin-top: 10px">-->
		<!--<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20,30]"></pageElement>-->
		<!--</section>-->
		<kitchenModel v-if="showTan" @throwWinResult="doThrowTanResult" :item="info" :isAdd="isAdd" :Area="Area" :allName="allName"></kitchenModel>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			currentList: [], //列表数据
			on: false, //开关按钮
			showTan: false,
			info: {},
			index: null, //编辑的索引
			isAdd: true,
			Area: [], //区域列表
			isShowGoods: -1, //是否展示商品名
			goodsName: [], //展示商品名称列表
			goodLists: [], //所有商品
			packlist: [], //所有套餐
			allName: [] //所有操作台的名称
		};
	},
	created() {
		this.titleData = [
			{ titleName: '操作', titleStyle: { width: '300px' } },
			{ titleName: '序号' },
			{ titleName: '操作台类型' },
			{ titleName: '操作台名称', dataName: 'name' },
			{ titleName: '关联商品数量', dataName: 'goodsNum' }
		];
		this.bannerStyle = {
			backgroundColor: '#F2F2F2',
			color: '#434149',
			fontSize: '16px'
		};
		this.contentStyle = {
			color: '#666666',
			fontSize: '14px'
		};
		this.getGoods();
		this.getOn();
		document.onclick = () => {
			this.isShowGoods = -1;
			this.goodsName = [];
		};
	},
	mounted() {
		let arr = [
			{
				name: '添加操作台',
				className: 'userLabel',
				fn: () => {
					this.addKitchen();
				}
			}
		];
		this.$store.commit('setPageTools', arr);
		this.init();
		this.getArea();
		this.getPack();
	},
	methods: {
		//获取商品
		async getGoods() {
			this.goodLists = storage.session('goodList'); //获取商品列表
			if (!this.goodLists) {
				let res = await http.getGoodsList({
					data: { page: 1, num: 9999, specification: 1 }
				});
				this.goodLists = res.list;
			}
		},
		//获取套餐
		async getPack() {
			this.packlist = await http.getpackagelist({
				data: { page: 1, num: 9999 }
			});
		},
		//获取开关类型
		async getOn() {
			let res = await http.getIsKitchen({ data: {} });
			this.on = Boolean(res);
		},
		//开关组件返回
		getIsDiscountToggle(res) {
			if (res) {
				this.isKitchen();
			} else {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确认关闭后厨模式开关?',
					callback: delRes => {
						if (delRes == 'ok') {
							this.isKitchen();
						}
					}
				});
			}
		},
		async isKitchen() {
			await http.editIsKitchen({ data: { isKitchen: Number(!this.on) } });
			this.on = !this.on;
		},
		//添加操作台
		addKitchen() {
			this.getAllNames();
			this.isAdd = true;
			this.info = {};
			this.showTan = true;
		},
		//编辑操作台
		toEdit(item, i) {
			this.getAllNames();
			this.info = item;
			this.index = i;
			this.isAdd = false;
			this.showTan = true;
		},
		//获取列表
		async init() {
			let res = await http.KitchenGetList({
				data: {}
			});
			if (res) {
				this.currentList = res;
				this.sortList();
			}
		},
		//获取所有名称
		getAllNames() {
			this.allName = [];
			for (let i = 0; i < this.currentList.length; i++) {
				this.allName.push(this.currentList[i].name);
			}
		},
		// 删除
		async deleteJob(id, index) {
			let res = await http.KitchenDelete({
				data: { id }
			});
			if (res) {
				this.currentList.splice(index, 1);
				this.sortList();
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alter',
					content: '删除成功'
				});
			}
		},
		delJob(id, index) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确定删除该操作台?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteJob(id, index);
					}
				}
			});
		},
		//查看
		see(item, index, e) {
			e.stopPropagation();
			if (this.goodsName.length != 0) {
				this.goodsName = [];
			}
			//			for (let i = 0; i < this.goodLists.length; i++) {
			//				if (item.goodsIds.indexOf(this.goodLists[i].id) != -1) {
			//					this.goodsName = this.goodsName.concat(this.goodLists[i].goodsName);
			//				}
			//			}
			for (let value of this.goodLists) {
				if (item.goodsIds.indexOf(value.id) != -1) {
					this.goodsName = this.goodsName.concat(value.goodsName);
				}
			}
			for (let i = 0; i < this.packlist.length; i++) {
				if (item.packageIds.indexOf(this.packlist[i].id) != -1) {
					this.goodsName = this.goodsName.concat(this.goodLists[i].goodsName);
				}
			}
			this.isShowGoods = index;
		},
		//得到区域列表
		async getArea() {
			let res = await http.getArea({
				data: {}
			});
			if (res) {
				this.Area = res;
			}
		},
		//弹窗返回
		doThrowTanResult(res, item) {
			if (res == 'ok') {
				if (this.isAdd) {
					this.currentList.push(item);
				} else {
					this.currentList.splice(this.index, 1, item);
				}
				this.sortList();
			}
			this.showTan = false;
		},
		//排序
		sortList() {
			this.currentList = utils.sortByAll(
				this.currentList,
				['sort', 'id'],
				true
			);
		}
	},
	components: {
		//		pageElement: () =>import(/*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		onOff: () => import(/* webpackChunkName:'on_off'*/ 'src/components/on_off'),
		kitchenModel: () =>
			import(/*webpackChunkName: 'kitchen_model_win'*/ './kitchen_model_win')
	}
};
</script>
<style scoped lang="less">
#kitchen {
	position: relative;
	.topCom {
		height: 40px;
		line-height: 40px;
		font-size: 18px;
	}
	.detLi {
		position: fixed;
		z-index: 200;
		left: 220px;
		.detDiv {
			top: 1px;
			left: 1px;
			background: #45404b;
			position: absolute;
			box-shadow: 3px 2px 10px #ccc;
			width: 450px;
			height: 250px;
			.detI {
				width: 0;
				height: 0;
				position: absolute;
				top: -10px;
				left: 50px;
				border-width: 10px;
				border-top: 0;
				border-style: solid;
				border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
			}
			.detH3 {
				width: 100%;
				height: 100%;
				color: #e6e6e7;
				white-space: normal;
				line-height: 30px;
				margin: 10px;
				overflow-y: scroll;
			}
		}
	}
}
</style>