/* * @Author: zhouzhe * @Date: 2018-05-07 17:57:05 */

<template>
	<div id="inventory" v-cloak>
		<!-- <ul class="tebBox" v-if="inventConfigure==0">
			<li v-for="(item,index) in tebData" @click="tebClick(index)" :key="index" :class="{active:tabactive==index}">{{item}}</li>
		</ul> -->
		<el-radio-group v-if="inventConfigure==0" v-model="tabactive" fill="#e1bb4a" size="medium" @change="tebClick">
			<el-radio-button v-for="(item,index) in tebData" :key="index" :label="index">{{item}}</el-radio-button>
		</el-radio-group>
		<!--列表数据-->
		<section v-if="tabactive==0">
			<section class="statisticsList" style="vertical-align: middle;margin-bottom: 20px;">
				<!-- <section class="filter">
					<input v-model="searchName" type="text" placeholder="请输入商品名" />
					<input v-model="searchCode" type="text" placeholder="请输入条形码" />
					<input v-model="secBarCode" type="text" placeholder="请输入副条形码" />
					<div class="selBox">
						<select-btn :sorts="goodsList" :name="allGoods" @selOn="selectList" ref="select"></select-btn>
						<a @click="searchList" href="javascript:void(0);" class="blue" style="width: 100px;height: 40px;line-height: 40px;margin-right: 8px;">筛选</a>
						<a @click="searchReset" href="javascript:void(0);" class="gray" style="width: 100px;height: 40px;line-height: 40px;">重置</a>
					</div>
				</section> -->
				<div class="asideone">
					<div class="sleType">
						<el-input v-model="searchName" placeholder="请输入商品名"></el-input>
					</div>
					<div class="sleType">
						<el-input v-model="searchCode" placeholder="请输入条形码"></el-input>
					</div>
					<div class="sleType">
						<el-input v-model="secBarCode" placeholder="请输入副条形码"></el-input>
					</div>
					<div class="sleType">
						<el-select v-model="listType" placeholder="全部类型">
							<el-option v-for="item in goodsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div class="sleType">
						<el-button @click="searchList" type="primary">筛选</el-button>
						<el-button @click="searchReset" type="info">重置</el-button>
					</div>
				</div>
			</section>
			<com-table :listName="'商品列表'" :fixed="2" :titleData="titleList" :allTotal="count" :introData="goodsdetail"
			 :listWidth="1500">
				<div class="infoDetail" slot="con-0" slot-scope="props">
					<a href="javascript:void(0);" @click="showDetail(props.data,props.index)" style="color:#5ebee8;">查看详情</a>
					<span v-if="inventConfigs&&inventConfigs.commonStock==1">|</span>
					<a href="javascript:void(0);" @click="addListhouse(props.data)" v-if="inventConfigs&&inventConfigs.commonStock==1" style="color:red;">入库</a>
					<span v-if="ischain!=3">|</span>
					<a href="javascript:void(0);" @click="openBar(props.data)" style="color:orange;" v-if="ischain!=3">打印条码</a>
				</div>
				<!-- <div slot="con-2" slot-scope="props"><test :sorts="['dsa','das','fds']" :parentNode="'.main'" :name="'dsadsadf'"  ref="select"></test></div> -->
				<span slot="con-1" slot-scope="props">{{(props.index+1)+(page-1)*10}}</span>
				<span slot="con-5" slot-scope="props">{{props.data.type==1? '称重商品':'普通商品'}}</span>
				<span slot="con-6" slot-scope="props" v-if="props.data.goodsNum" :title="props.data.goodsNum.surplus">{{addCount(props.data.goodsNum.surplus)}}{{props.data.unit}}</span>
				<span slot="con-7" slot-scope="props" v-if="props.data.goodsNum" :title="props.data.goodsNum.batch">{{props.data.goodsNum.batch}}</span>
				<span slot="con-8" slot-scope="props" v-if="props.data.goodsNum" :title="props.data.goodsNum.shelvesNum">{{addCount(props.data.goodsNum.shelvesNum)}}{{props.data.unit}}</span>
				<span slot="con-9" slot-scope="props" v-if="props.data.goodsNum" :title="Number(props.data.goodsNum.shelvesNum)+Number(props.data.goodsNum.surplus)">{{addCount(Number(props.data.goodsNum.shelvesNum)+Number(props.data.goodsNum.surplus))}}{{props.data.unit}}</span>
			</com-table>
		</section>
		<invent-supplies v-show="tabactive==1" :page2="page2" @page="suppage" :inventConfigs="inventConfigs" :tabactive='tabactive'></invent-supplies>
		<div class="somePage" v-if="tabactive==0">
			<!-- <page-turn :total="total" :isNoJump="false" :isNoPaging='true' :page="page" @pageNum="changePage" ref="pageTurn"></page-turn> -->
			<el-pagination @current-change="changePage" background :current-page="page" layout="total, prev, pager, next, jumper" :total="Number(count)"></el-pagination>
		</div>
		<printing-win v-if="winshow" @winEvent="winEvent" ref="print" :title="win.title" :goodsDel="win.goodsDel" :listDel="win.list"></printing-win>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	let tabactive = 0;
	let page = 1;
	let page2 = 1;
	let shopId = storage.session('shopId');
	export default {
		data() {
			return {
				goodsdetail: '', //列表商品所有数据
				newgoodsdetail: '', //翻页列表数据
				checkGoods: '', //查询列表数据
				shopId: '',
				searchName: '', //查询商品名
				searchCode: '', //查询条码
				secBarCode: '', //副条形码
				allGoods: '全部类型', //商品分类
				goodsList: [{value:-1,label:'全部类型'},{value:0,label:'普通商品'} ,{value:1,label:'称重商品'}], //商品分类列表
				listType: -1, //列表中选中的id
				total: 1,
				page: 1,
				num: 10, // 当前每页展示数量
				win: {
					goodsDel: '', //商品详情
					list: ''
				},
				winshow: false,
				detailId: '', //选中商品Id
				tebData: ['商品', '物料'],
				tabactive: 0,
				totalList: 0,
				count: 0,
				ischain: storage.session('userShop').currentShop.ischain,
				inventConfigure: 0,
				titleList: [{
					titleName: '操作',
					titleStyle: {
						width: '200px'
					}
				},
				{
					titleName: '序号',
					titleStyle: {
						width: '75px'
					}
				},
				{
					titleName: '商品名',
					dataName: 'goodsName',
					titleStyle: {
						width: '15%'
					}
				},
				{
					titleName: '条形码',
					dataName: 'barCode',
					titleStyle: {
						width: '15%'
					}
				},
				{
					titleName: '售价',
					dataName: 'price'
				},
				{
					titleName: '商品类型'
				},
				{
					titleName: '仓库数量/重量'
				},
				{
					titleName: '批次数量',
					titleStyle: {
						width: '5%'
					}
				},
				{
					titleName: '货架数量/重量'
				},
				{
					titleName: '总量'
				}],
				page2: 1,
				inventConfigs: {} //进销存配置
			};
		},
		beforeRouteLeave(to, from, next) {
			let check = true;
			let arr = ['detail', 'suppliesDetail', 'materialsPutinStorage', 'putStroage', 'picking', 'warehouseCount',
				'materialCreate'
			];
			arr.map(v => {
				let str = `/admin/inventoryManagement/${v}`;
				if (to.path == str || v == 'picking') check = false;
			});
			console.log(check);
			if (check||shopId!=storage.session('shipId')) {
				page = 1;
				tabactive = 0;
				page2 = 1;
			}
			next();
		},
		methods: {
			async init() {
				let data = await http.inventoryGoodsList({
					data: {
						page: this.page,
						num: this.num,
						type: this.listType,
						goodsName: this.searchName,
						barCode: this.searchCode,
						secBarCode: this.secBarCode //副条形码
					}
				});
				this.count = data.count;
				this.goodsdetail = data.list;
				this.total = data.total;
				let arr = [];
				for (let item of this.goodsdetail) {
					arr.push(item.id);
				}
				if (arr.length > 0) {
					let resNum = await http.invent_getGoodsNum({
						data: {
							gids: arr.join(',')
						}
					});
					for (let i in this.goodsdetail) {
						for (let item of resNum) {
							if (this.goodsdetail[i].id == item.id) {
								this.goodsdetail[i].goodsNum = item;
							}
						}
					}
					this.goodsdetail = utils.deepCopy(this.goodsdetail);
				}
			},
			suppage(page) {
				page2 = page;
				console.log(page);
			},
			addCount: function (num) {
				num += '';
				//清除字符串开头的0
				if (/^0+/.test(num)) num = num.replace(/^0+/, '');
				//为整数字符串在末尾添加.000
				if (!/\./.test(num)) num += '.000';
				//字符以.开头时,在开头添加0
				if (/^\./.test(num)) num = '0' + num;
				num += '000'; //在字符串末尾补零
				num = num.match(/([+-]?)\d+\.\d{3}/)[0];
				return num;
			},
			//重置
			searchReset: function () {
				this.searchName = '';
				this.searchCode = '';
				this.checkGoods = this.goodsdetail;
				this.listType = -1;
				this.page = 1;
				this.init();
			},
			//查询
			searchList: function () {
				this.page = 1;
				this.init();
			},
			//去详情页面
			showDetail: function (list, index) {
				list.index = index;
				storage.session('goodsDetail', list);
				this.$router.push({
					path: 'inventoryManagement/detail',
					query: this.$route.query
				});
			},
			addListhouse: function (list) {
				this.$route.query.gid = list.gid;
				this.$router.push({
					path: 'inventoryManagement/putStroage',
					query: this.$route.query
				});
			},
			//打印条码
			async openBar(list) {
				let data = await http.InvoicingGetGoodsDetail({
					data: {
						gid: list.gid,
						shopId: this.shopId
					}
				});
				this.detailId = list.gid;
				this.openWin(data, list);
			},
			winEvent(str) {
				this.winshow = false;
				if (str == 'ok') {
					this.openOrClose();
				}
			},
			openWin(data, list) {
				this.winshow = true;
				this.win = {
					goodsDel: data,
					title: '打印条码',
					list: list
				};
			},
			async openOrClose() {
				let tandetials = this.$refs.print;
				let pattern = /^\d*\.?\d+$/;
				this.winshow = true;
				if (!tandetials.classification.length) {
					this.alert('请输入数量');
					return;
				}
				for (let i = 0; i < tandetials.classification.length; i++) {
					if (tandetials.goodsDel.type == 1 && !tandetials.classWeight[i]) {
						this.alert('请输入重量');
						return false;
					}
					if (+!tandetials.classification[i]) {
						this.alert('请输入数量');
						return false;
					}
					if (+tandetials.classification[i] == 0) {
						this.alert('数量必须大于0');
						return false;
					}
					if (+tandetials.classification[i] > 100) {
						this.alert('数量请少于100');
						return;
					}
					if (tandetials.goodsDel.type == 1) {
						if (!pattern.test(Number(tandetials.classification[i])) ||
							!pattern.test(Number(tandetials.classWeight[i]))
						) {
							this.alert('输入格式错误');
							return false;
						}
					} else {
						if (!pattern.test(Number(tandetials.classification[i]))) {
							this.alert('输入格式错误');
							return false;
						}
					}
				}
				await http.inventoryPrintCode({
					data: {
						gid: this.detailId,
						num: '[' + tandetials.classification + ']',
						weight: '[' + tandetials.classWeight + ']'
					}
				});
				this.winshow = false;
			},
			changePage: function (currentPage) {
				this.page = currentPage;
				page = this.page;
				this.init();
			},
			// selectList: function (select) {
			// 	this.listType = select - 1;
			// },
			tebClick(index) {
				this.tabactive = index;
				tabactive = index;
				storage.session('tabactive', index);
			},
			alert(con, title) {
				this.$store.commit('setWin', {
					title: title,
					winType: 'alert',
					content: con
				});
			},
			addEduce() {
				//				this.$store.commit('setPageTools', [{
				//					name: '导出',
				//					className: ['import-form'],
				//					fn: async () => {
				//						await http.Invent_getReport({
				//							data: {
				//								format: 'csv'
				//							}
				//						});
				//					}
				//				}]);
				this.$store.commit('setPageTools', []);
			},
			suppliesBtn() {
				this.$store.commit('setPageTools', [{
					name: '领料',
					type: 5,
					className: 'primary',
					fn: () => {
						this.$router.push({
							path: 'pickingList/picking'
						});
					}
				},
				{
					name: '新建物料',
					type: 4,
					className: 'primary',
					fn: () => {
						this.$router.push({
							path: 'inventoryManagement/materialCreate'
						});
					}
				}]);
			},
			settype(){
				this.inventConfigure = storage.session('inventConfigure') || 0;
				this.inventConfigs = storage.session('inventConfigs');
				this.tabactive = this.inventConfigure == 0 ? 0 : this.inventConfigure - 1;
				if (storage.session('tabactive') && this.inventConfigure == 0)
					this.tabactive = storage.session('tabactive');
				if(this.inventConfigure == 0) this.tabactive = tabactive;
			}
		},
		beforeMount() {
			this.page2 = page2;
		},
		async mounted () {
			this.shopId = storage.session('itemId');
			this.page = page;
			this.settype();
			//			this.addEduce();
			await this.init();	
		},
		destroyed() {
			storage.session('tabactive', null);
		},
		computed: {
			contentRefs: function () {
				return this.$store.state.contentDislpay;
			},

		},
		watch: {
			tabactive() {
				if (!this.tabactive) {
					this.addEduce();
				} else {
					this.suppliesBtn();
				}
			},
			contentRefs() {
				this.settype();
			}
		},
		components: {
			// selectBtn: () =>
			// 	import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			// pageTurn: () =>
			// 	import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
			printingWin: () =>
				import ( /*webpackChunkName: 'printing_win'*/ './printing_win'),
			inventSupplies: () =>
				import ( /*webpackChunkName: 'invent_supplies'*/ './invent_supplies'),
			comTable: () =>
				import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table')
		}
	};
</script>
<style type="text/css" lang="less" scoped>
	#inventory {
		overflow: hidden;
	}

	.tebBox {
		display: inline-block;
		color: orange;
		cursor: pointer;

		li {
			border: 1px orange solid;
			display: inline-block;
			padding: 10px 40px;
		}

		.active {
			background-color: orange;
			color: #ffffff;
		}
	}
	.infoDetail {
		display: inline-block;
		display: flex;
		justify-content: space-around;

		a {
			display: inline-block;
			text-align: center;
		}
	}
	.asideone {
		.sleType {
			width: 170px;
			margin-right: 10px;
			display: inline-block;
			&::before {
				content: '';
				display: inline-block;
				width: 100%;
				height: 15px;
			}
		}
	}

	#inventory .somePage {
		margin-top: 10px;
	}

	.selectbtns span {
		display: inline-block;
		width: 180px;
		height: 40px;
		line-height: 40px;
		margin-right: 9px;
		margin-bottom: 10px;
		border-radius: 3px;
		text-align: center;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>