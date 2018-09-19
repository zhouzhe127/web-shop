<!--
	**后厨模式配置
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="kitchen">
		<section class="top">
			<label>后厨模式开关：</label>
			<el-switch v-model="on" active-color="#13ce66" inactive-color="#ff4949" @change="getIsDiscountToggle">
			</el-switch>
		</section>
		<section>
			<el-table ref="multipleTable" stripe :header-cell-style = "{'background-color':'#f5f7fa'}" :data="currentList" border>
				<el-table-column  min-width = "120" align="center" label="操作">
					<template slot-scope="scope">
						<el-popover placement="bottom" width="400" trigger="click">
							<div>
								{{scope.row.goodsName}}
								<!--<i v-for="(info,i) in scope.row.goodsName" :key="i">-->
									<!--<i>{{info}}</i>-->
									<!--<i v-if="i!=scope.row.goodsName.length-1">、</i>-->
								<!--</i>-->
							</div>
							<span style="color: #28A8E0;cursor:pointer" slot="reference">查看</span>
						</el-popover>

						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FE8D2C;cursor:pointer" @click="toEdit(scope.row,scope.$index)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delJob(scope.row.id,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width = "50" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "100" align="center" label="操作台类型">
					<template slot-scope="scope">
						<span>{{scope.row.type==0? '后厨加工' : '出品台'}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "100" prop="name" align="center" label="操作台名称" > </el-table-column>
				<el-table-column show-overflow-tooltip min-width = "50" prop="goodsNum" align="center" label="关联商品数量" > </el-table-column>
			</el-table>
		</section>

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

			goodLists: [], //所有商品
			packlist: [], //所有套餐
			allName: [] //所有操作台的名称
		};
	},
	async created() {
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
		this.getOn();  //开关

		//获取商品
			this.goodLists = storage.session('goodList'); //获取商品列表
			if (!this.goodLists) {
				let res = await http.getGoodsList({
					data: { page: 1, num: 9999, specification: 1 }
				});
				this.goodLists = res.list;
			}
		//获取套餐
			this.packlist = await http.getpackagelist({
				data: { page: 1, num: 9999 }
			});
		this.init();
	},
	mounted(){
		this.getArea();
	},
	methods: {
		//获取开关类型
		async getOn() {
			let res = await http.getIsKitchen({ data: {} });
			this.on = Boolean(res);
		},
		//开关组件返回
		getIsDiscountToggle( ) {
			if (this.on) {
				this.isKitchen();
			} else {
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确认关闭后厨模式开关?',
					callback: delRes => {
						if (delRes == 'ok') {
							this.isKitchen();
						}else {
							this.on=true;
						}
					}
				});
			}
		},
		async isKitchen() {
			await http.editIsKitchen({ data: { isKitchen: Number(this.on) }});
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
				for(let i=0;i<res.length;i++){
					let goodsName=[];
					for (let value of this.goodLists) {
						if (res[i].goodsIds.includes(value.id)) {
							goodsName=goodsName.concat(value.goodsName);
						}
					}
					for (let item of this.packlist) {
						if (res[i].packageIds.includes(item.id)) {
							goodsName=goodsName.concat(item.packageName);
						}
					}
					res[i].goodsName=goodsName.join('、');
				}
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
		//得到区域列表
		async getArea() {
			let res = await http.getArea({
				data: {}
			});
			if (res) {
				this.Area = res.map((item)=>{
					item.selected=false;
					return item;
				});
			}
		},
		//弹窗返回
		doThrowTanResult(res, item) {
			if (res == 'ok') {
//				if (this.isAdd) {
//					this.currentList.push(item);
//				} else {
//					this.currentList.splice(this.index, 1, item);
//				}
//				this.sortList();
				this.init();
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
		kitchenModel: () => import(/*webpackChunkName: 'kitchen_model_win'*/ './kitchen_model_win')
	}
};
</script>
<style scoped lang="less">
#kitchen {
	.top{
		line-height: 40px;
		height: 40px;
		label{
			font-size: 16px;
		}
	}
}
</style>