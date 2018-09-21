<!--
    **抢购记录
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id='rushedRecord'>
		<div class='rushedstatus'>
			名称:{{goodsname}}
		</div>
		<!-- 下面的表格 -->
		<div class='list'>
			<div class='list_title'>
				<div class='list_title_l fl'>
					<span>库存历史</span>
					<span></span>
					<span>共
								<a href='javascript:;'>{{allFormList.length}}</a>条记录</span>
				</div>
				<div class='list_title_r fr'>
				</div>
			</div>
			<el-table :data='formList' border style='width: 1410px;margin-bottom: 20px;' :stripe='true' :header-cell-style='{'background-color':'#f5f7fa'}'>
				<el-table-column fixed prop='shopId' label='店铺名称' width='310' align='center'>
					<template slot-scope='scope'>
						<span style='color: #27a8e0'>{{getshopName(scope.row.shopId)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop='stock' label='原始库存' width='275' :render-header='renderHeader' show-overflow-tooltip align='center'>
				</el-table-column>
				<el-table-column prop='grabNum' label='抢购数量' width='275' :render-header='renderHeader' show-overflow-tooltip align='center'>
				</el-table-column>
				<el-table-column prop='receiveNum' label='已领取数量' width='275' :render-header='renderHeader' show-overflow-tooltip align='center'>
				</el-table-column>
				<el-table-column label='操作' width='275' align='center'>
					<template slot-scope='scope'>
						<span style='color: #E1BB4A' @click='showDetail(scope.row)'>详细记录</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 翻页 -->
		<!-- <section class='turn-page'>
			<pageElement @pageNum='pageChange' :page='Number(page)' :total='Number(pageNum)' :numArr='[10,20,30,40,50]' :isNoJump='true'></pageElement>
		</section> -->
		<div class='pageWrap'>
			<el-pagination background @size-change='handleSizeChange' @current-change='pageChange' :current-page='page' :page-size='num' layout='sizes, prev, pager, next' :page-count='endTotal' :page-sizes='[10, 20, 30]'></el-pagination>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			index: null,
			allTotal: 0,
			page: 1,
			count: 0,
			num: 10,
			pageNum: 1,
			endTotal: 1, //总页数
			showPageList: [10, 20],
			goodsId: '', //商品id
			goodsname: '', //商品名称
			uploadUrl: '',
			grabNum: '', // 抢购商品
			receiveNum: '', //领取数量
			recordorderlist: [], //抢购人员列表
			allFormList: [], //所有的疯抢库存
			formList: [], //展示的数据
			shopsList: []
		};
	},
	methods: {
		returnStore: function() {
			this.$router.push('/admin/Assistanthistory/detail');
		},
		// pageChange(obj) { //翻页
		// 	this.page = obj.page;
		// 	this.num = obj.num;
		// 	this.getRecordlist();
		// },
		// async getRecordlist() {
		// 	let data = await http.getHistoryrecord({
		// 		data: {
		// 			goodsId: this.goodsId,
		// 			page: this.page,
		// 			num: this.num
		// 		}
		// 	});
		// 	this.grabNum = data.grabNum; //抢购数量
		// 	this.receiveNum = data.receiveNum; //领取数量
		// 	this.recordorderlist = data.orderList; //抢购记录列表
		// 	//获取抢购人员
		// 	for (let i = 0; i < data.fansList.length; i++) {
		// 		for (let j = 0; j < this.recordorderlist.length; j++) {
		// 			if (this.recordorderlist[j].fid == data.fansList[i].id) {
		// 				this.recordorderlist[j].name = data.fansList[i].name;
		// 				this.recordorderlist[j].imageUrl = data.fansList[i].imageUrl;
		// 			}
		// 		}
		// 	}
		// 	this.pageNum = data.total;
		// 	this.count = data.count;
		// },
		async getShopStockList() { //获取商品库存的接口
			let data = await http.getShopStockList({
				data: {
					goodsId: this.goodsId
				}
			});
			if (data) {
				this.allFormList = data;
				this.$nextTick(() => {
					this.setPage();
				});
			}
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return ('0' + t);
			} else {
				return (t + '');
			}
		},
		transFormDates: function(time) {
			time += '';
			if (time.length == 10) {
				time -= 0;
				time *= 1000;
			} else {
				time -= 0;
			}
			let date = new Date(time);
			return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' +
				this.changeFormat(date.getMinutes());
		},
		getshopName: function(id) {
			let shopName = '';
			for (let item of this.shopsList) {
				if (item.id == id) {
					shopName = item.name ? item.name : item.shopName;
				}
			}
			return shopName;
		},
		setPage: function() {
			this.endTotal = Math.ceil((this.allFormList.length) / (this.num));
			let pageStart = (this.page - 1) * (this.num);
			let pageEnd = (this.page) * (this.num);
			let pageContent = this.allFormList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		//每页显示多少条数据
		handleSizeChange(p) {
			this.num = p;
			this.setPage();
		},
		//页码跳转
		pageChange(p) {
			this.page = p;
			this.setPage();
		},
		getShopList: function() {
			this.shopsList = [];
			let currentShop = storage.session('userShop').currentShop;
			let userShop = {
				id: currentShop.id,
				ischain: currentShop.ischain,
				shopName: currentShop.name
			};
			this.shopsList = storage.session('shopList');
			this.shopsList.push(userShop);
		},
		showDetail: function(item) { //查看详细记录
			storage.session('recordStock', item);
			this.$router.push('/admin/Assistanthistory/detail/record/recordDetail');
		},
		renderHeader(h, { column}) {
			let titleName = '';
			let label = column.label;
			let property = column.property;
			if (label == '原始库存' && property == 'stock') {
				titleName = '该商品的总库存=初始库存+增加库存';
			}
			if (label == '抢购数量' && property == 'grabNum') {
				titleName = '用户抢购商品时，选择该门店后支付成功的数量';
			} else if (label == '已领取数量' && property == 'receiveNum') {
				titleName = '在该门店已经领取的数量';
			}
			return h('div', [
				h('span', {}, column.label),
				h('el-popover', {
					attrs: {
						class: 'item',
						effect: 'dark',
						content: titleName,
						placement: 'bottom',
						width: '300',
						// on:{
						// 	click:this.abc(column)
						// }
					}
				}, [
					h('span', {
						class: 'el-icon-question',
						slot: 'reference',
						style: 'font-size: 18px;margin-left:5px;',
						// title:'标题',
					})
				])
			]);
		},
	},
	components: {
		selectBtn: () =>
			import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		pageElement: () =>
			import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
		comTable: () =>
			import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
	},
	mounted() {
		this.$store.commit('setPageTools', {
			back: () => {
				this.returnStore();
			}
		});
		this.getShopList();
		this.uploadUrl = storage.session('userShop').uploadUrl;
		this.goodsId = storage.session('historyrecord').id;
		this.goodsname = storage.session('historyrecord').name;
		this.getShopStockList();
	}
};
</script>
<style type='text/css' scoped>
#rushedRecord {
	width: 1437px;
	height: auto;
}

#rushedRecord .rushedstatus {
	margin-bottom: 31px;
	color: #1DA527;
}









/*#rushedRecord .list {
	width: 1410px;
	min-height: 156px;
	border: 1px solid #D2D2D2;
}*/

#rushedRecord .list .list_title {
	width: 1410px;
	height: 45px;
	border: 1px solid #EAEEF5;
	line-height: 45px;
	padding-left: 17px;
	padding-right: 68px;
}

#rushedRecord .list .list_title span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#rushedRecord .list .list_title span:first-child {
	margin-right: 11px;
}

#rushedRecord .list .list_title span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
	/*margin-top: 20px;*/
}

#rushedRecord .list .list_title .record {
	font-size: 16px;
	color: #FF3C05;
}

#rushedRecord .list .list_title .num {
	height: 45px;
	line-height: 45px;
}

#rushedRecord .list .list_title .num p {
	display: inline;
	font-size: 16px;
}

#rushedRecord .list .heads {
	width: 1436px;
	height: 41px;
	background: #F2F2F2;
}

#rushedRecord .list .heads li {
	float: left;
	text-align: center;
	line-height: 41px;
	font-size: 16px;
	color: #43414A;
}

#rushedRecord .list .heads li:nth-child(1) {
	width: 25%;
}

#rushedRecord .list .heads li:nth-child(2) {
	width: 25%;
}

#rushedRecord .list .heads li:nth-child(3) {
	width: 25%;
}

#rushedRecord .list .heads li:nth-child(4) {
	width: 25%;
}

#rushedRecord .list .nolist {
	width: 1436px;
	text-align: center;
	line-height: 70px;
	font-size: 24px;
	color: #E0E0E0;
}

#rushedRecord .list .contents {
	width: 1436px;
	height: 69px;
	border-bottom: 1px solid #F7F7F7;
}

#rushedRecord .list .contents li {
	float: left;
	height: 69px;
	text-align: center;
	line-height: 69px;
	font-size: 14px;
	color: #666;
}

#rushedRecord .userbox {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
}

#rushedRecord .userbox .imgbox,
#rushedRecord .userbox .namebox {
	width: 50%;
	height: 100%;
	float: left;
	display: flex;
	align-items: center;
}

#rushedRecord .userbox .imgbox {
	justify-content: flex-end;
}

#rushedRecord .userbox .namebox {
	justify-content: flex-start;
}

#rushedRecord .imgbox img {
	width: 42px;
	height: 42px;
	margin-right: 20px;
}

#rushedRecord .turn-page {
	margin: 10px 0 30px 0;
}

#rushedRecord .list_title {
	width: 100%;
	height: 50px;
}

#rushedRecord .list_title .list_title_l,
#rushedRecord .list_title .list_title_r {
	width: 50%;
	height: 100%;
	float: left;
	line-height: 45px;
}

#rushedRecord .list_title .list_title_l span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#rushedRecord .list_title .list_title_l span:first-child {
	margin-right: 11px;
}

#rushedRecord .list_title .list_title_l span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
}

#rushedRecord .list_title .list_title_l span:last-child a {
	font-size: 16px;
	color: #ff3c05;
}

#rushedRecord .list_title .list_title_r p {
	display: inline-block;
	float: right;
	font-size: 16px;
	margin-right: 40px;
}
</style>