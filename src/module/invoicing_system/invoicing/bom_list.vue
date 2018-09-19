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
				<calendar :time="startTime" :type="selectedType" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span class="inline-span">-</span>
			<div class="inline-box date-box">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" :type="selectedType" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
				<em class="search-btn" @click="filter"></em>
			</div>
			<div class="block">
				<div class="inline-box">
					<input type="text" placeholder="请输入创建人" v-model="createName" />
				</div>
				<div class="inline-box">
					<input type="text" placeholder="请输入商品名称/编码" v-model="gName" />
				</div>
				<div class="inline-box">
					<input type="text" placeholder="请输入bom单编号" v-model="bomNum" />
				</div>
				<div class="inline-box setspeen">
					<selectBtn @emit="dropBomType" :sorts="options" :index="bomTypeIndex"></selectBtn>
					<div class="inline-box button-box">
						<span class="blue" @click="filter">筛选</span>
						<span class="gray" @click="reset">重置</span>
					</div>
				</div>
			</div>
		</div>
		<com-table :listName="'BOM单列表'" :titleData="titleList" :allTotal="listLength" :introData="list">
			<span class="detail" slot="con-0" slot-scope="props" @click="listHandle(props.data.id)">查看详情</span>
			<span slot="con-1" slot-scope="props">{{(page-1)*pageShow+props.index>=9?(page-1)*pageShow+props.index+1:'0'+((page-1)*pageShow+props.index+1)}}</span>
			<span slot="con-4" slot-scope="props">{{formatTime(props.data.createTime)}}</span>
			<span slot="con-6" slot-scope="props">{{setBomType(props.data.isPublic)}}</span>
		</com-table>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
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
				startTime: new Date().setHours(0, 0, 0, 0), //开始时间
				endTime: new Date().setHours(0, 0, 0, 0), //结束时间
				cid: '', //用户id
				isBrand: 0, //是否品牌 1品牌 0非品牌
				selectedType: 0,
				options: ['全部BOM单类型', '公开', '私密'], //bom单类型 显示
				bomTypeList: [0, 1, -1], //bom单类型List
				isPublic: 0, //bom单类型 是否公开 1公开 -1私密
				bomTypeIndex: 0, //当前下拉框index
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
				isInit:true,//是否按照初始模式请求
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
		},
		mounted() {
			this.$store.commit('setPageTools', {
				bomCreate: () => {
					this.$router.push({
						path: 'bomList/bomCreate',
						query: this.$route.query
					});
				}
			});
			this.initData();
			this.getData();
		},
		methods: {
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
			},
			startTimeChange(time) { //获取开始时间
				this.startTime = time;
			},
			endTimeChange(time) { //获取结束时间
				this.endTime = time;
			},
			dropBomType(index) { //获取bom类型
				this.isPublic = this.bomTypeList[index];
				this.bomTypeIndex = index;
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
				let sendStart='',sendEnd='';
				let endTime = new Date(this.endTime).setHours(23, 59, 59, 0);
				if(this.isInit){//页面加载的第一次执行
					sendStart = '';
					sendEnd = '';
				}else{
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
					bomTypeIndex: this.bomTypeIndex,
					pageTotal: this.pageTotal,
				};
				storage.session('bomListCache', this.requestObj);
			},
			reset() { //重置
				for (let i in this.requestObj) {
					if (i == 'startTime' || i == 'endTime') {
						this[i] = new Date().setHours(0, 0, 0, 0);
					} else if (i == 'page') {
						this[i] = 1;
					} else if (i == 'bomTypeIndex') {
						this[i] = 0;
					} else if (i == 'pageShow') {
						this[i] = 10;
					} else if (i != 'pageTotal') {
						this[i] = '';
					}
				}
				this.isInit = true;
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
			pageChange(obj) { //分页 获取页数
				this.page = obj.page;
				this.pageShow = obj.num;
				this.getData();
			},
			listHandle(id) { //列表操作
				let obj = this.$route.query;
				obj.id = id;
				this.$router.push({
					path: 'bomList/bomDetail',
					query: obj
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	@media only screen and (max-width:1210px) {
		.setspeen {
			margin-top: 10px;
		}
	}

	.bom-order {
		.filter {
			.inline-box {
				display: inline-block;
				vertical-align: middle;
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
				padding-top: 20px;
				.inline-box {
					margin-right: 10px;
				}
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
	}
</style>