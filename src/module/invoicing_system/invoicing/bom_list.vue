<!--
    **bom单列表
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="bom-order">
		<div class="filter">
			<span class="inline-span">创建时间：</span>
			<div class="inline-box">
				<!--日期组件 开始时间-->
				<el-date-picker
					v-model="timeDate"
					type="daterange"
					range-separator="-"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:clearable="false"
					unlink-panels
					@change="timeChange">
				</el-date-picker>
			</div>
			<div class="block">
				<div class="inline-box">
					<el-input v-model="createName" placeholder="请输入创建人"></el-input>
				</div>
				<div class="inline-box">
					<el-input v-model="gName" placeholder="请输入商品名称/编码"></el-input>
				</div>
				<div class="inline-box">
					<el-input v-model="bomNum" placeholder="请输入bom单编号"></el-input>
				</div>
				<div class="inline-box">
					<el-select v-model="isPublic" placeholder="请选择仓库" @change="dropBomType">
					    <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
				<div class="inline-box button-box">
					<el-button @click="filter" type="primary">筛选</el-button>
               		<el-button @click="reset" type="info">重置</el-button>
				</div>
			</div>
		</div>
		<el-table :data="list" stripe border style="width: 100%" :header-cell-style="{'background-color':'#f5f7fa'}">
		    <el-table-column type="index" :index="indexMethod" label="序号" width="100">
		    </el-table-column>
		    <el-table-column prop="itemName" label="商品名称" min-width="200">
		    </el-table-column>
		    <el-table-column prop="createName" label="创建人" width="150">
		    </el-table-column>
		    <el-table-column label="创建时间" width="200">
		    	<template slot-scope="scope">
		        	{{formatTime(scope.row.createTime)}}
		      	</template>
		    </el-table-column>
		    <el-table-column prop="bomNum" label="BOM单编号" width="200">
		    </el-table-column>
		    <el-table-column label="BOM类型" width="100">
		    	<template slot-scope="scope">
		        	{{setBomType(scope.row.isPublic)}}
		      	</template>
		    </el-table-column>
		    <el-table-column label="操作" fixed="right" width="150">
		    	<template slot-scope="scope">
		        	<el-button @click="listHandle(scope.row)" type="text">查看详情</el-button>
		      	</template>
		    </el-table-column>
	  	</el-table>
		<div class="page-box">
			<el-pagination @current-change="(res)=>{pageChange(res,1)}" @size-change="pageChange"
				:current-page="page"
				background
				layout="sizes,total,prev, pager, next"
				:page-sizes="[10, 20, 50]"
				:total="listLength">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				timeDate:[],
				startTime: '', //开始时间
				endTime: '', //结束时间
				cid: '', //用户id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				options: [
					{value:0,label:'全部BOM单类型'},
					{value:1,label:'公开'},
					{value:-1,label:'私密'},
				], //bom单类型 显示
				isPublic: 0, //bom单类型 是否公开 1公开 -1私密
				prevIndex: 0, //上一个下拉框index
				page: 1, //当前页
				pageShow: 10, //每页显示多少天数据
				pageTotal: 1, //数据总页数
				list: [], //数据列表
				listLength: 0, //数据条数
				userData: '', //用户数据
				createName: '', //用户名称
				shopType: '', //店铺类型
				bomNum: '', //bom单编号
				gName: '', //商品名称
				titleList: [
					{titleName: '操作'},
					{titleName:'序号'},
					{titleName: '商品名称',dataName: 'itemName'},
					{titleName: '创建人',dataName: 'createName'},
					{titleName:'创建时间'},
					{titleName: 'BOM单编号',dataName: 'bomNum'},
					{titleName:'BOM类型'},
				],
				requestObj:{},
			};
		},
		components: {
			pageBtn: () =>
				import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>
				import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
			comTable: () =>
				import ( /*webpackChunkName: 'table'*/ 'src/components/com_table'),
		},
		created() {
			this.userData = storage.session('userShop');
			this.cid = this.userData.user.id;
			this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
			this.initData();//设置保存的数据
		},
		mounted() {
			this.initBtn();//初始化按钮
			this.getData();//获取数据
		},
		methods: {
			initBtn(){
				let arr = [
					{name: '新建BOM单',className: 'primary',type:4,
						fn: () => {
							this.$router.push({
								path: 'bomList/bomCreate',
								query: this.$route.query
							});
						}
					}
				];
				this.$store.commit('setPageTools', arr);
			},
			initData() {
				this.shopType = this.isBrand;
				let cache = storage.session('bomListCache');
				let destroy = storage.session('bomListDestroy');
				if (destroy && cache) {
					for (let i in cache) {
						this[i] = cache[i];
					}
					storage.session('bomListCache', null);
					storage.session('bomListDestroy', null);
				}
				this.listLength = this.page*this.pageShow;
			},
			timeChange(res){
				this.startTime = new Date(res[0]).setHours(0,0,0,0);
				this.endTime = new Date(res[1]).setHours(23,59,59,0);
			},
			dropBomType(index) { //获取bom类型
				this.isPublic = index;
				this.filter();
			},
			setBomType(type) {
				if (type == '1') {
					return '公开';
				} else if (type == '-1') {
					return '私密';
				}
			},
			formatTime(time) {
				return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm:ss');
			},
			filter() { //筛选 时间搜索公用
				this.page = 1;
				this.isInit = false;
				this.getData();
			},
			async getData() {
				if (!this.validate()) return;
				let sendStart='',sendEnd='',endTime='';
				if(this.endTime){//页面加载的第一次执行
					endTime = new Date(this.endTime).setHours(23, 59, 59, 0);
					sendStart = parseInt(this.startTime / 1000);
					sendEnd = parseInt(endTime / 1000);
				}
				let data = await http.bomBillmaterialGetBomList({
					data: {
						createUid: this.cid,
						startTime: sendStart,
						endTime: sendEnd,
						page: this.page,
						num: this.pageShow,
						createName: this.createName,
						shopType: this.shopType,
						isPublic: this.isPublic,
						bomNum: this.bomNum,
						gName: this.gName,
					}
				});
				if (!data) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '您没有权限查看私密bom单！'
					});
					return;
				}
				this.list = data.list;
				this.listLength = data.totalCount;
				this.pageTotal = data.totalPage;
				this.requestObj = {
					startTime: this.startTime,
					endTime: endTime,
					page: this.page,
					pageShow: this.pageShow,
					createName: this.createName,
					shopType: this.shopType,
					isPublic: this.isPublic,
					bomNum: this.bomNum,
					gName: this.gName,
					pageTotal: this.pageTotal,
				};
				storage.session('bomListCache', this.requestObj);
			},
			reset() { //重置
				this.startTime = '';
				this.endTime = '';
				this.timeDate = [];
				this.page = 1;
				this.isPublic = 0;
				this.pageShow = 10;
				for(let item of ['createName','bomNum','gName']){
					this[item] = '';
				}
				this.getData();
			},
			validate() { //日期验证
				let start = parseInt(this.startTime / 1000 / 3600 / 24),
					end = parseInt(this.endTime / 1000 / 3600 / 24);
				if (start > end) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '开始时间不能大于结束时间'
					});
					return false;
				}
				return true;
			},
			pageChange(res,type) { //分页 获取页数
				if(type){
					this.page = res;
				}else{
					this.pageShow = res;
				}
				this.getData();
			},
			indexMethod(index){
				return this.pageShow*(this.page-1)+index+1;
			},
			listHandle(res) { //列表操作
				let obj = this.$route.query;
				obj.id = res.id;
				this.$router.push({
					path: 'bomList/bomDetail',
					query: obj
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.bom-order {
		.filter {
			.inline-box {
				display: inline-block;
				vertical-align: middle;
				margin-bottom: 15px;
				margin-right: 10px;
				.search-btn {
					float: left;
					height: 40px;
					width: 40px;
					cursor: pointer;
					background: url(../../../res/images/search.png)#29abe2 center no-repeat;
				}
				input {
					width: 180px;
					height: 40px;
					padding: 0 10px;
					font-size: 14px;
					&:focus {
						outline: none;
					}
				}
			}
			.block {
				width: 100%;
			}
			.date-box {
				.calendar {
					float: left;
				}
				&:after {
					content: '';
					zoom: 1;
					clear: both;
					display: block;
				}
			}
			.button-box {
				span {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					width: 80px;
					color: #fff;
					text-align: center;
				}
				.blue {
					margin-right: 10px;
				}
			}
			.inline-span {
				display: inline-block;
				padding: 0 5px;
			}
		}
		.detail {
			color: #27a8e0;
			cursor: pointer;
		}
		.page-box{padding: 15px 0;}
	}
</style>