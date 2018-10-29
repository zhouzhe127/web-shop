<!--
	**商品起售
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="joblist">
		<section class="top">
			<section class="fl" style="margin-right: 20px">
				<el-select v-model="selectedType" clearable placeholder="请选择起售类型">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</section>
			<section class="fl top_input">
				<el-input v-model="positionName" clearable placeholder="请输入起售商品名称" style="width:220px;margin-right:20px;"></el-input>
			</section>
			<el-button @click="searchPosition" type="primary">筛选</el-button>
			<el-button @click="resetSearch" type="info">重置</el-button>
		</section>

		<section>
			<el-table ref="multipleTable" stripe :header-cell-style="{'background-color':'#f5f7fa'}" :data="currentList" border style="width:90%">
				<el-table-column fixed min-width="100" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="toEdit(scope.row,scope.$index)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delJob(scope.row,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width="100" label="起售类型">
					<template slot-scope="scope">
						<span>{{scope.row.type==1?'单品起售':'多品联动起售'}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width="120" align="center" prop="goodsName" label="商品名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width="50" prop="num" align="center" label="起售数量"> </el-table-column>
			</el-table>
		</section>
		<section style="margin-top: 10px">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size="num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
			<!--<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20,30]"></pageElement>-->
		</section>
		<goodSaleWin v-if="isOpenWin" @throwWinResult="doThrowWinResult" :item="item" :isAdd="isAdd" :jobIndex="jobIndex" :newrecordList="newrecordList" :allGid="allGid">
		</goodSaleWin>

	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			list: [], //起售商品所有数据,用于搜素
			newrecordList: [], //起售商品所有数据,用于分页
			currentList: [], //当前页展示的数据
			userData: Object,
			isAdd: false, //是否新建
			isOpenWin: false, //是否打开弹窗
			item: Object, //编辑时传递到组件中
			jobIndex: '', //编辑时传递到组件中的索引
			positionName: '', //搜索输入的起售商品名称
			allGid: [], //所有添加了起售配置的商品id

			options: [
				{
					value: 0,
					label: '全部'
				},
				{
					value: 1,
					label: '单品起售'
				},
				{
					value: 2,
					label: '多品联动起售'
				}
			],
			selectedType: '', //对应循序  0:全部

			num: 10, //一页处理多少数据
			//			count: 0, //总数量
			total: 0, //总页数
			page: 1, //当前第几页

			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null //表格内容样式
		};
	},
	created() {
		this.titleData = [
			{ titleName: '操作', titleStyle: { width: '200px' } },
			{ titleName: '起售类型', titleStyle: { width: '150px' } },
			{ titleName: '商品名称', dataName: 'goodsName' },
			{
				titleName: '起售数量',
				dataName: 'num',
				titleStyle: { width: '200px' }
			}
		];
		this.bannerStyle = {
			backgroundColor: '#F2F2F2',
			color: '#434149',
			fontSize: '16px'
		};
		this.contentStyle = { color: '#666666', fontSize: '14px' };
	},
	mounted() {
		this.userData = storage.session('userShop');
		this.$store.commit('setPageTools', [
			{
				name: '添加起售商品',
				type: 4,
				className: 'primary',
				fn: this.openShop,
			}
		]);
		this.getList();
	},
	watch: {
		currentList: {
			handler: function(val) {
				if (val.length == 0 && this.page > 1) {
					this.page = this.page - 1;
					this.paging(1);
				}
			}
		}
	},
	methods: {
		//		//选择职位类型
		//		selectType(index) {
		//			this.selectedType = index;
		//		},
		//新建起售商品
		openShop() {
			this.item = {};
			this.isAdd = true;
			this.isOpenWin = true;
		},
		//获取列表
		async getList() {
			let res = await http.goodsleastGetList({
				data: {}
			});
			if (res) {
				this.list = res;
				this.newrecordList = res;
				this.paging(); //分页
				this.allGid = []; //先制空
				this.getAllGid(); //获取所有配置了起售的商品id
			}
		},
		//获取所有配置了起售的商品id
		getAllGid() {
			for (let i = 0; i < this.list.length; i++) {
				this.allGid = this.allGid.concat(this.list[i].gid.split(','));
			}
			//                console.log(this.allGid);
		},
		//编辑
		toEdit(item, index) {
			this.item = item;
			this.jobIndex = (this.page - 1) * this.num + index;
			this.isOpenWin = true;
			this.isAdd = false;
		},
		// 删除
		async deleteJob(item, index) {
			let res = await http.GoodsleastDelete({
				data: { id: item.id }
			});
			if (res) {
				this.newrecordList.splice(
					(this.page - 1) * this.num + index,
					1
				);
				this.paging(1);
				this.list = this.newrecordList;
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'alter',
					content: '删除成功'
				});
				this.allGid = []; //先制空
				this.getAllGid();
			}
		},
		delJob(item, index) {
			this.$store.commit('setWin', {
				title: '操作提示',
				winType: 'confirm',
				content: '确定删除该商品的起售配置?',
				callback: delRes => {
					if (delRes == 'ok') {
						this.deleteJob(item, index);
					}
				}
			});
		},
		//子组件返回的事件
		doThrowWinResult(res) {
			if (res == 'ok') {
				this.paging(1);
				this.list = this.newrecordList;
				if (this.isAdd) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '添加成功'
					});
					this.allGid = []; //先制空
					this.getAllGid();
				} else {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '修改成功'
					});
				}
				this.isOpenWin = false;
			} else if (res == 'cancel') {
				this.isOpenWin = false;
			} else if (res == 'close') {
				this.isOpenWin = false;
			}
		},
		//筛选
		searchPosition() {
			let newList = [];
			if (this.positionName == '' && this.selectedType == 0) {
				newList = this.list;
			} else if (this.positionName != '' && this.selectedType == 0) {
				//                    for (let i = 0; i < this.list.length; i++){
				//                        if(this.list[i].goodsName.indexOf(this.positionName) != -1){
				//                            newList.push(this.list[i])
				//                        }
				//                    }
				newList = this.list.filter(value => {
					return value.goodsName.indexOf(this.positionName) != -1;
				});
			} else if (this.selectedType != 0 && this.positionName == '') {
				//                    for (let i = 0; i < this.list.length; i++){
				//                        if(Number(this.list[i].type)==this.selectedType){
				//                            newList.push(this.list[i])
				//                        }
				//                    }
				newList = this.list.filter(value => {
					return Number(value.type) == this.selectedType;
				});
			} else {
				//                    for (let i = 0; i < this.list.length; i++){
				//                        if(this.list[i].goodsName.indexOf(this.positionName) != -1&&Number(this.list[i].type)==this.selectedType){
				//                            newList.push(this.list[i])
				//                        }
				//                    }
				newList = this.list.filter(value => {
					return (
						value.goodsName.indexOf(this.positionName) != -1 &&
						Number(value.type) == this.selectedType
					);
				});
			}
			this.newrecordList = newList;
			this.paging();
		},
		//重置
		resetSearch() {
			this.positionName = '';
			this.selectedType = 0;
			this.options = ['全部', '单品起售', '多品联动起售'];
			this.getList();
		},
		//分页组件返回值
		//		pageChange(obj) {
		//			this.page = obj.page;
		//			this.num = obj.num;
		//			this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
		//			this.currentList = this.newrecordList.slice(
		//				(this.page - 1) * this.num,
		//				(this.page - 1) * this.num + this.num
		//			); //点击下一页
		//		},
		//每页显示几条数据
		numChange(e) {
			this.num = e;
			this.pageChange();
			console.log(e);
		},
		//切换到第几页
		pageClick(e) {
			this.page = e;
			this.pageChange();
			console.log(e);
		},
		pageChange() {
			this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
			this.currentList = this.newrecordList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			);
		},
		//分页
		paging(type) {
			this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
			//			this.count = this.newrecordList.length; //获取总数量
			if (type != 1) {
				this.page = 1;
			}
			this.currentList = this.newrecordList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //截取当前页数据
		}
	},
	components: {
		goodSaleWin: () =>
			import(/*webpackChunkName: "./good_sale_win"*/ './good_sale_win')
		//		selectBtn: () =>
		//			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		//		pageElement: () =>
		//			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		//		comTable: () =>
		//			import(/*webpackChunkName:"com_table"*/ 'src/components/com_table')
	}
};
</script>

<style scoped lang="less">
.top .top_input {
	height: 55px;
}
.searchgoods {
	width: 174px;
	height: 41px;
	text-align: center;
	border: 1px solid #b3b3b3;
}
.btn {
	width: 100px;
	height: 40px;
	line-height: 40px;
	vertical-align: middle;
	margin-left: 20px;
}
</style>