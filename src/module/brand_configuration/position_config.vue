<!--
    **职位管理（品牌）
    *
    * 胡江
    * *
    *
-->
<template>
	<div id="joblist">
		<section class="top" >
			<section class="top_input">
				<el-select v-model="selectedType" placeholder="选择职位类型">
					<el-option
						v-for="(item,i) in options" 
						:key="i"
						:label="item"
						:value="i">
					</el-option>
				</el-select>
				<!-- <selectBtn @emit="selectType" :sorts="options" :name="selectedName" class="select-btn"></selectBtn> -->
			</section>
			<section class=" top_input">
				<el-input v-model="positionName" clearable placeholder="请输入职位名称" style="width:150px;"></el-input>
			</section>
			<section class=" top_input">
				<a href="javascript:void(0);" class="blue btn" @click="searchPosition()">筛选</a>
				<a href="javascript:void(0);" class="gray btn" @click="resetSearch()">重置</a>
			</section>
		</section>
		<!-- <comTable :listName="'职位管理列表'" :titleData="titleData" :introData="currentList" :allTotal="newrecordList.length" :bannerStyle="bannerStyle"
		    :contentStyle="contentStyle" :titleHeight="50" :listHeight="50">
			<span style="cursor: pointer;" slot="con-0" slot-scope="props">
				<span style="color: #FE8D2C;font-size: 16px" @click="toEdit(props.data,props.index)">编辑</span>
				<span style="padding:0 20px;color: #D2D2D2;">|</span>
				<span style="color: #FD3F1F;font-size: 16px" @click="delJob(props.data,props.index)">删除</span>
			</span>
			<span slot="con-1" slot-scope="props">{{props.index+1}}</span>
			<span slot="con-3" slot-scope="props">{{props.data.type==0?'门店':'品牌'}}</span>
		</comTable> -->
		<section class="oBox">
			<div class="boxTop">
				<span style="font-size:16px;margin-right: 20px;">职位管理列表 · 共<span style="color: #ff3c04;font-size: inherit;">{{newrecordList.length}}</span>个条目</span>
			</div>
			<el-table
				ref="multipleTable" stripe
				:header-cell-style = "{'background-color':'#f5f7fa'}"
				:data="currentList"
				border
				style="width: 100%">
				<el-table-column fixed min-width = "120" align="center" label="操作">
					<template slot-scope="scope">
						<span style="color: #FE8D2C;cursor:pointer" @click="toEdit(scope.row,scope.$index)">编辑</span>
						<span style="padding:0 5px;color: #D2D2D2">|</span>
						<span style="color: #FD3F1F;cursor:pointer" @click="delJob(scope.row,scope.$index)">删除</span>
					</template>
				</el-table-column>
				<el-table-column align="center" min-width = "100" label="序号">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="name" label="职位名称"></el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120" align="center" label="职位类型">
					<template slot-scope="scope">
							<span v-if="scope.row.type == '0'">门店</span>
							<span v-if="scope.row.type == '1'">品牌</span>
						</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip min-width = "120" prop="nodeNum" align="center" label="权限数量" > </el-table-column>
				<el-table-column prop="personNum" min-width = "120" align="center" label="职位人数" > </el-table-column>
			</el-table>
		</section>
		<section style="margin-top: 10px">
			<el-pagination background @size-change="numChange" @current-change="pageClick" :current-page="page" :page-size = "num" layout="sizes, prev, pager, next" :page-count="total" :page-sizes="[10, 20, 30]"></el-pagination>
			<!-- <pageElement @pageNum="pageClick" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20,30]"></pageElement> -->
		</section>
		<positionWin v-if="isOpenWin" @throwWinResult="doThrowWinResult" :item="item" :isAdd="isAdd" :isShop="isShop" :userData="userData"
		    :list="list" :jobIndex="jobIndex" :currentList="currentList" :newrecordList="newrecordList">
		</positionWin>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				list: [], //职位列表所有数据,用于搜素
				newrecordList: [], //职位列表所有数据,用于分页
				currentList: [], //当前页展示的数据
				userData: Object,
				isShop: false, //是品牌还是门店
				isAdd: false, //是否新建
				isOpenWin: false, //是否打开弹窗
				item: Object, //编辑时传递到组件中
				jobIndex: '', //编辑时传递到组件中的索引
				options: ['全部', '门店职位', '品牌职位'],
				selectedType: '', //对应循序  0:全部
				selectedName: '请选择职位类型',
				positionName: '', //搜索输入的职位权限名称

				num: 10, //一页处理多少数据
				count: 0, //总数量
				total: 0, //总页数
				page: 1, //当前第几页


				titleData: [], //传给公共表格的表头数据
				bannerStyle: null, //表格头部样式
				contentStyle: null, //表格内容样式
			};
		},
		created() {
			this.titleData = [{
				titleName: '操作'
			},
			{
				titleName: '序号'
			},
			{
				titleName: '职位名称',
				dataName: 'name'
			},
			{
				titleName: '职位类型'
			},
			{
				titleName: '权限数量',
				dataName: 'nodeNum'
			},
			{
				titleName: '职位人数',
				dataName: 'personNum'
			}];
			this.bannerStyle = {
				backgroundColor: '#F2F2F2',
				color: '#434149',
				fontSize: '16px'
			};
			this.contentStyle = {
				color: '#666666',
				fontSize: '14px'
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.init();
			this.getList();
		},
		watch: {
			currentList: {
				handler: function (val) {
					if (val.length == 0 && this.page > 1) {
						this.page = this.page - 1;
						this.paging(1);
					}
				}
			}
		},
		methods: {
			init() {
				let obj = {
					openShopPosition: () => {
						this.openShop();
					},
					openBrandPosition: () => {
						this.openBrand();
					}
				};
				this.$store.commit('setPageTools', obj);
			},
			//选择职位类型
			selectType(index) {
				this.selectedType = index;
			},
			//新建单店职位
			openShop() {
				this.item = {};
				this.isAdd = true;
				this.isShop = true;
				this.isOpenWin = true;
			},
			//新建品牌职位
			openBrand() {
				this.item = {};
				this.isAdd = true;
				this.isShop = false;
				this.isOpenWin = true;
			},
			//获取职位列表
			async getList() {
				let res = await http.RoleGetList({
					data: {}
				});
				if (res) {
					res = res.map((obj) => { //处理数据，传递给表格组件
						obj.personNum = obj.personNum + '';
						return obj;
					});

					this.list = res;
					this.newrecordList = res;
					this.sortList();
					this.paging(); //分页
				}
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
				let res = await http.deletePosition({
					data: {
						id: item.id
					}
				});
				if (res) {
					this.newrecordList.splice((this.page - 1) * this.num + index, 1);
					this.sortList();
					this.paging(1);
					this.list = this.newrecordList;
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: '删除成功'
					});
				}
			},
			delJob(item, index) {
				if (Number(item.personNum) > 0) {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'alter',
						content: `有${item.personNum}位员工绑定该职位，请解除帮定后再进行删除操作！`
					});
				} else {
					this.$store.commit('setWin', {
						title: '操作提示',
						winType: 'confirm',
						content: '确定删除该职位信息?',
						callback: (delRes) => {
							if (delRes == 'ok') {
								this.deleteJob(item, index);
							}
						}
					});
				}
			},
			//子组件返回的事件
			doThrowWinResult(res) {
				if (res == 'ok') {
					this.sortList();
					this.isOpenWin = false;
					this.paging(1);
					this.list = this.newrecordList;
					if (this.isAdd) {
						this.$store.commit('setWin', {
							title: '操作提示',
							winType: 'alter',
							content: '添加成功'
						});
					} else {
						this.$store.commit('setWin', {
							title: '操作提示',
							winType: 'alter',
							content: '修改成功'
						});
					}
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
					this.getList();
					return false;
				} else if (this.positionName != '' && this.selectedType == 0) {
					for (let i = 0; i < this.list.length; i++) {
						if (this.list[i].name.indexOf(this.positionName) != -1) {
							newList.push(this.list[i]);
						}
					}
				} else if (this.selectedType != 0 && this.positionName == '') {
					//                    console.log(this.list);
					for (let i = 0; i < this.list.length; i++) {
						if (Number(this.list[i].type) + 1 == this.selectedType) {
							newList.push(this.list[i]);
						}
					}
				} else {
					for (let i = 0; i < this.list.length; i++) {
						if (this.list[i].name.indexOf(this.positionName) != -1 && Number(this.list[i].type) + 1 == this.selectedType) {
							newList.push(this.list[i]);
						}
					}
				}
				this.newrecordList = newList;
				this.paging();
			},
			//重置
			resetSearch() {
				this.positionName = '';
				this.selectedType = '';
				this.selectedName = '全部';
				this.options = ['全部', '门店职位', '品牌职位'];
				this.getList();
			},
			//分页点击
			pageClick: function(e) {
				this.page = e;
				console.log(e);
				this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
				this.currentList = this.newrecordList.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num); //点击下一页
			},
			//每页显示多少行
			numChange(e){
				this.num = e;
				this.page = 1;
				this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
				this.currentList = this.newrecordList.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num); //点击下一页
			},
			//分页
			paging(type) {
				this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
				this.count = this.newrecordList.length; //获取总数量
				if (type != 1) {
					this.page = 1;
				}
				this.currentList = this.newrecordList.slice((this.page - 1) * this.num, (this.page - 1) * this.num + this.num); //截取当前页数据
			},
			//排序
			sortList() {
				this.newrecordList = utils.sortByAll(this.newrecordList, ['sort', 'id'], true);
			},
		},
		components: {
			positionWin: () =>
				import ( /*webpackChunkName: 'position_config_one_win'*/ './position_config_one_win'),
			// selectBtn: () =>
			// 	import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			// pageElement: () =>
			// 	import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
			// comTable: () =>
			// 	import ( /*webpackChunkName:'com_table'*/ 'src/components/com_table'),
		}
	};
</script>

<style scoped lang="less">
	.searchgoods {
		width: 174px;
		height: 41px;
		text-align: center;
		border: 1px solid #B3B3B3;
	}

	.btn {
		width: 100px;
		height: 40px;
		line-height: 40px;
		vertical-align: middle;
	}

	.top .top_input {
		display: inline-block;
		margin: 0 5px;
		height: 50px;
	}
	#joblist .oBox{
		width:100%;border-bottom:none;margin:10px 0;
		.boxTop{
			height:50px;line-height: 50px;padding:0 5px;border:1px solid #ebeef5;border-bottom:none;
			.aSpan {
				font-size: 16px;
				color: #fe9200;
				margin-right: 20px;
				.aI {
					background: #fe9200;
					display: inline-block;
					width: 16px;
					height: 16px;
					border-radius: 8px;
					margin-right: 10px;
					vertical-align: middle;
				}
			}
		}
	}

	/*.totle{*/

	/*min-width: 1000px;border: 1px solid #D2D2D2;margin-top: 20px;background-color: #FFFFFF;*/

	/*}*/

	/*.totle .head{*/

	/*height: 50px;*/

	/*line-height: 50px;*/

	/*font-size: 16px;*/

	/*padding-left: 20px;*/

	/*color: #333333;*/

	/*}*/

	/*.totle .oulFirst{*/

	/*background-color: #F2F2F2;color:#434149;*/

	/*}*/

	/*.totle .oulFirst li{*/

	/*font-size: 16px!important;*/

	/*}*/

	/*.totle .oUl{*/

	/*width:100%;*/

	/*height:50px;*/

	/*color:#333333;*/

	/*overflow: hidden;*/

	/*border-bottom: 3px solid #f7f7f7;*/

	/*}*/

	/*.totle .oUl li{*/

	/*width:13%;*/

	/*height: 50px;*/

	/*line-height: 50px;*/

	/*text-align: center;*/

	/*float: left;*/

	/*}*/

	/*.totle .oulSecond{*/

	/*color: #666666;font-size: 14px*/

	/*}*/

	/*.totle .oulSecond li span{*/

	/*font-size: 16px*/

	/*}*/

	/*.totle .ul-null li{*/

	/*display: inline-block;*/

	/*width: 100%;*/

	/*height: 50px;*/

	/*line-height: 50px;*/

	/*text-align: center;*/

	/*color:orange*/

	/*}*/
</style>