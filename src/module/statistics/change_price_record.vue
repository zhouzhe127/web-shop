<!--
	**改价记录
	*
	* 胡江
	* *
	*
-->
<template>
	<section id="change-price">

		<section class="allSection">
			<input class="searchgoods" type="text" placeholder="请输入名称" v-model="searchName" />
		</section>
		<section class="allSection">
			<a @click="resetSearch" href="javascript:void(0);" class="reset">重置</a>
			<a @click="searchGoods" href="javascript:void(0);" class="blue">筛选</a>
		</section>
		<div style="clear: both;height: 20px"></div>
		<div v-for="(item,index) in titleList" :key="index" class="diel" :class="{'on':item.type == selectTab}" @click="chooseTab(item.type)">{{item.name}}</div>

		<comTable :showHand="false" :showTitle="2" :listWidth="750" :titleData="titleData" :introData="currentList" :bannerStyle="bannerStyle" :contentStyle="contentStyle" :listHeight="50">
			<span slot="con-0" slot-scope="props">
				<a href="javascript:void(0);" @click="openDetail(props.data)" class="yellow" style="width: 100%;">查看详情</a>
			</span>
			<span slot="con-4" slot-scope="props">{{getDate(props.data.updateTime)}}</span>
		</comTable>

		<!--<section class="box">-->
		<!--<div style="border: 1px solid #b3b3b3;">-->
		<!--<section class="title">-->
		<!--<span v-for="item in titleList" :class="[{tab: item.type == selectTab, tab2: item.type == 0}]" @click="chooseTab(item.type)">{{item.name}}</span>-->
		<!--</section>-->
		<!--<section class="content">-->
		<!--<ul class="ulT">-->
		<!--<li style="width:10%;">操作</li>-->
		<!--<li>菜品</li>-->
		<!--<li>当前价格</li>-->
		<!--<li>操作员</li>-->
		<!--<li>最后修改时间</li>-->
		<!--</ul>-->
		<!--<ul v-for="(item,index) in currentList" :style="{'background-color': (index % 2 == 0) ? '#f2f2f2' : '#fff'}" :key="index">-->
		<!--<li style="width: 10%;"><a href="javascript:void(0);" @click="openDetail(item)" class="yellow" style="width: 100%;">查看详情</a></li>-->
		<!--<li >{{item.goodsName}}</li>-->
		<!--<li>{{item.price}}</li>-->
		<!--<li>{{item.name}}</li>-->
		<!--<li>{{getDate(item.updateTime)}}</li>-->
		<!--</ul>-->
		<!--<ul v-if="currentList.length == 0">-->
		<!--<li class="ulLi" style="width: 100%;color: orange;">暂无改价记录</li>-->
		<!--</ul>-->
		<!--<ul class="ulT">-->
		<!--<li style="width: 10%;">操作</li>-->
		<!--<li>菜品</li>-->
		<!--<li>当前价格</li>-->
		<!--<li>操作员</li>-->
		<!--<li>最后修改时间</li>-->
		<!--</ul>-->
		<!--</section>-->
		<!--</div>-->
		<!--</section>-->

		<section style="margin-top: 10px">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(total)" :isNoJump="true" :numArr="[10,20]"></pageElement>
		</section>
		<changePriceWin v-if="isShow" @throwWinResult="doThrowWinResult" :userData="userData" :id="id" :title="title" :item="item">
		</changePriceWin>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			titleList: [
				{ name: '非时价商品', type: 0 },
				{ name: '时价商品', type: 1 }
			],
			selectTab: 0, //选中的tab标签页 时价和非时价
			searchName: '', //筛选名称
			recordList: [], //查询后列表所有数据,用于查询
			currentList: [], //当前页展示的数据
			newrecordList: [], //查询后列表所有数据,用于分页
			list: {}, //保存原始数据 时价商品与非时价商品
			num: 10, //一页处理多少数据
			count: 0, //总数量
			total: 0, //总页数
			page: 1, //当前第几页
			userData: Object,
			isShow: false,
			id: '',
			title: '',
			item: Object,

			titleData: [], //传给公共表格的表头数据
			bannerStyle: null, //表格头部样式
			contentStyle: null //表格内容样式
		};
	},
	created() {
		this.titleData = [
			{ titleName: '操作', titleStyle: { width: '15%' } },
			{
				titleName: '菜品',
				dataName: 'goodsName',
				titleStyle: { width: '30%' }
			},
			{
				titleName: '当前价格',
				dataName: 'price',
				titleStyle: { width: '15%' }
			},
			{
				titleName: '操作员',
				dataName: 'name',
				titleStyle: { width: '15%' }
			},
			{ titleName: '最后修改时间', titleStyle: { width: '25%' } }
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
		this.init();
	},
	methods: {
		//翻页
		pageChange(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
			//                this.chooseTab(this.selectTab);
			this.currentList = this.newrecordList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //点击下一页
		},
		//初始化列表数据
		async init() {
			let res = await http.GetGoodsListBySeasonal({
				data: {
					shopId: this.userData.currentShop.id
				}
			});
			if (res) {
				this.list = res;
				//初始默认显示非时价商品
				this.recordList = res.noSeasonal;
				this.newrecordList = res.noSeasonal;
				this.paging();
			}
		},
		//分页
		paging() {
			this.total = Math.ceil(this.newrecordList.length / this.num); //获取总页数
			this.count = this.newrecordList.length; //获取总数量
			this.page = 1;
			this.currentList = this.newrecordList.slice(
				(this.page - 1) * this.num,
				(this.page - 1) * this.num + this.num
			); //截取当前页数据
		},
		//重置
		resetSearch() {
			this.searchName = '';
			this.searchGoods();
		},
		//筛选
		searchGoods() {
			let newList = [];
			for (let i = 0; i < this.recordList.length; i++) {
				if (
					this.recordList[i].goodsName.indexOf(this.searchName) != -1
				) {
					newList.push(this.recordList[i]);
				}
			}
			this.newrecordList = newList;
			this.paging();
			if (this.searchName == '') {
				this.chooseTab(this.selectTab);
			}
		},
		//tab页切换
		chooseTab(type) {
			this.selectTab = type;
			this.recordList =
				this.selectTab == 0 ? this.list.noSeasonal : this.list.seasonal;
			this.newrecordList =
				this.selectTab == 0 ? this.list.noSeasonal : this.list.seasonal;
			this.paging();
		},
		//查看详情
		openDetail: function(item) {
			this.id = item.gid;
			this.title = item.goodsName;
			this.item = item;
			this.isShow = true;
		},
		//时间戳转日期
		getDate: function(time) {
			return utils.format(
				new Date(time * 1000),
				'yyyy年MM月dd日 hh:mm:ss'
			);
		},
		doThrowWinResult(res) {
			if (res == 'ok') {
				this.isShow = false;
			} else if (res == 'cancel') {
				this.isShow = false;
			} else {
				this.isShow = false;
			}
		}
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		changePriceWin: () =>
			import(/*webpackChunkName: "change_price_win"*/ './change_price_win'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName:"com_table"*/ 'src/components/com_table')
	}
};
</script>

<style lang="less" scoped>
#change-price {
	.allSection {
		margin-right: 40px;
		display: inline-block;
		.searchgoods {
			text-align: center;
			display: inline-block;
			height: 41px;
			line-height: 41px;
			outline: none;
			width: 174px;
			border: 1px solid #b3b3b3;
		}
		a {
			width: 90px;
			height: 40px;
			border: 1px solid #00adef;
			line-height: 40px;
			display: inline-block;
		}
		.reset {
			background: #b3b3b3;
			border: none;
			color: #fff;
		}
	}
	.diel {
		display: inline-block;
		width: 136px;
		height: 40px;
		font-size: 16px;
		background: #fff;
		border: 1px solid #e9c048;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		color: #f8931f;
		/*margin-bottom:10px;*/
	}
	.on {
		background: #f8931f;
		color: #fff;
	}
}
/*头部================================*/
/**/
/*.box {*/
/*width: 100%;*/
/*height: 100%;*/
/*overflow: auto;*/
/*min-width:780px;*/
/*}*/
/*.box .title {*/
/*width: 100%;*/
/*height: 70px;*/
/*background: #fbfbfb;*/
/*border-bottom: 1px solid #b3b3b3;*/
/*}*/
/*.box .title span {*/
/*display: inline-block;*/
/*width: 150px;*/
/*line-height: 70px;*/
/*text-align: center;*/
/*font-size: 16px;*/
/*vertical-align: middle;*/
/*cursor: pointer;*/
/*}*/
/*.box .title .tab {*/
/*border-right: 1px solid #b3b3b3;*/
/*border-left: 1px solid #b3b3b3;*/
/*border-top: 4px solid #28a8e0;*/
/*width: 149px;*/
/*background: #fff;*/
/*height: 70px;*/
/*line-height: 66px;*/
/*}*/
/*.box .title .tab2 {*/
/*border-left: none;*/
/*}*/
/*.box .content {*/
/*width: 100%;*/
/*padding: 20px;*/
/*}*/
/*.box .content ul li{*/
/*display: inline-block;*/
/*width: 22%;*/
/*height: 50px;*/
/*line-height: 50px;*/
/*text-align: center;*/
/*overflow: hidden;*/
/*white-space: nowrap;*/
/*text-overflow:ellipsis;*/
/*}*/
/*.box .content .ulT {*/
/*background: #e6e6e6;*/
/*width: 100%;*/
/*height: 50px;*/
/*}*/
</style>