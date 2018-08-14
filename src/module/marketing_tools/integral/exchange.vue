/** * @file * * 积分商城兑换管理 * * @author zhengu.jiang */
<template>
	<div id="user">
        <div class="firstFun">
        	<div class="firstTitle fl" style="width: 450px;">
        		<p class="fl">状态：</p>
        		<span v-for="(item,i) in statusList" :key="i" class="fl mar" :class="{'ons':item.status == 1 }" @click="staTooge(item.id)">{{item.name}}</span>
        	</div>
        </div>
        <div class="integralInfo">
        	<span class="fl">已消费：{{usedNum}}份</span>
        	<span class="fl">未消费：{{useNum}}份</span>
        </div>
        <com-table :listHeight='80' :showHand="false" :showTitle='2' :listWidth="1400" :introData="useLists" :titleData="titleList">
        	<div class="imgshow" slot="con-2" slot-scope="props">
        		<img :src=" imgHost + props.data.gimage"/>
        	</div>
 			<div class="imgshow" slot="con-10" slot-scope="props">
        		{{getshopName(props.data.shopId)}}
        	</div> 
			<div class="imgshow" slot="con-11" slot-scope="props">
        		{{staffList[props.data.updateUid]}}
        	</div>         	       	
        </com-table>
        <page v-if="total > 1" @pageNum="getListByShopId" :page.sync="pages" :total.sync='total' :isNoJump='true' :isNoPaging='true' style="float: left;margin-bottom: 100px;"></page>
        <changewin v-if="isWin" @getWin="code"></changewin>
    </div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			useLists: [],
			useInitial: [],
			useNum: null,
			usedNum: null,
			total: null,
			pages: 1,
			len: null,
			statusList: [{
				'id': '1',
				'name': '全部',
				'status': '1'
			},
			{
				'id': '2',
				'name': '未消费',
				'status': '0'
			},
			{
				'id': '3',
				'name': '已消费',
				'status': '0'
			}
			],
			types: 'all',
			exportUrl: '',
			isWin: false,
			// isFlag:false
			titleList: [{
				titleName: '序号',
				titleStyle: {
					width: '100px',
					flex: 'none'
				},
				dataName: 'id'
			},
			{
				titleName: '商品名称',
				dataName: 'gname'
			},
			{
				titleName: '展示图片'
			},
			{
				titleName: '创建时间',
				dataName: 'createTime'
			},
			{
				titleName: '消费时间',
				dataName: 'updateTime'
			},
			{
				titleName: '兑换积分',
				dataName: 'point'
			},
			{
				titleName: '兑换金额',
				dataName: 'price'
			},							
			{
				titleName: '兑换人',
				dataName: 'mname'
			},
			{
				titleName: '状态',
				dataName: 'state'
			},
			{
				titleName: '劵码',
				dataName: 'code'
			},
			{
				titleName: '领取门店',
				dataName: 'code'
			},
			{
				titleName: '核销人',
				dataName: 'code'
			}							
			],
			allTotal: 0,
			staffList:{}, //操作人列表
			shopsList:[] //店铺列表
		};
	},
	props: [
		'ischain',
		'imgHost',
		'shopId'
	],
	mounted() {

		this.userShop = storage.session('userShop');
		this.currentShop = this.userShop.currentShop;

		this.getListByShopId({
			page: this.pages
		});
		if (this.ischain != '1' && this.ischain != '2') {
			this.initBtn();
		}
		this.getShopList();
	},
	methods: {
		initBtn() {
			let obj = {
				openCode: () => { //验证商品劵码
					this.openCodeWin();
				},
				leadOut: () => {
					this.changeExport();
				}
			};
			this.$store.commit('setPageTools', obj);
		},
		//获取兑换列表
		async getListByShopId(page) {
			this.pages = page.page;
			let res = await http.getListByShopId({
				data: {
					page: this.pages,
					num: 10,
					type: this.types
				}
			});
			this.useNum = res.numList.useNum;
			this.usedNum = res.numList.usedNum;
			this.useLists = res.list;
			this.staffList = res.staffList;//领取人
			this.total = res.total;
			this.total < 10 ? this.len = this.total : this.len = 10;
			let uses = this.useLists;
			// 时间戳转换
			for (let i = 0; i < uses.length; i++) {
				if (uses[i].createTime != '0') {
					uses[i].createTime = utils.getTime({
						time: uses[i].createTime,
						type: true,
						format: 'yyyy.MM.dd'
					}).format;
					uses[i].state = uses[i].status == 0 ? '未消费' : '已消费';
				}
				if (uses[i].status == 1 && uses[i].updateTime != '0') {
					uses[i].updateTime = utils.getTime({
						time: uses[i].updateTime,
						type: true,
						format: 'yyyy.MM.dd'
					}).format;
				}
			}
			this.useInitial = utils.deepCopy(this.useLists);
		},
		//导出
		async changeExport() {
			await http.changeExport({
				data: {
					shopId: this.shopId
				}
			});
		},
		//验证商品劵码
		openCodeWin() {
			this.isWin = true;
		},
		staTooge(id) {
			let i;
			// 更改状态
			for (i = 0; i < this.statusList.length; i++) {
				this.statusList[i].status = '0';
				if (this.statusList[i].id == id) {
					this.statusList[i].status = '1';
				}
			}
			this.pages = 1;
			if (id == 2) {
				this.types = 'use';
				this.getListByShopId({
					page: 1
				});
			} else if (id == 3) {
				this.types = 'used';
				this.getListByShopId({
					page: 1
				});
			} else {
				this.types = 'all';
				this.getListByShopId({
					page: 1
				});
			}
		},
		async verifyCode(code) {
			await http.verifyCode({
				data: {
					code: code
				}
			});
			this.getListByShopId({
				page: this.pages
			});

		},
		code(res, code) {
			if (res == 'ok') {
				this.verifyCode(code);
			}
			this.isWin = false;
		},
		getShopList: function() {
			// 获取卡属门店店铺列表
			if (this.ischain == '3') { // 处理品牌逻辑
				this.shopsList = storage.session('shopList');
				for (let item of this.shopsList) {
					item.name = item.shopName;
				}
			} else {
				this.shopsList.push(storage.session('userShop').currentShop);
			}
		},
		getshopName: function(id) {
			let shopName = '所有门店';
			for (let item of this.shopsList) {
				if (item.id == id) {
					shopName = item.name ? item.name : item.shopName;
				}
			}
			return shopName;
		},				
	},
	components: {
		page: () =>
		import ( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		changewin: () =>
		import ( /*webpackChunkName: 'exchange_win'*/ './exchange_win'),
		comTable: () =>
		import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
	},
	destroyed() {
		this.$store.commit('setPageTools', {});
	},
};
</script>
<style type="text/css" scoped>
#user {
	margin-top: 60px;
}

.mall-box {
	width: 100%;
	height: auto;
	overflow: hidden;
}

#user .imgshow {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

#user .imgshow img {
	width: 70px;
	height: 70px;
}

.firstFun {
	height: 40px;
	line-height: 40px;
	width: 100%;
	margin-bottom: 15px;
}

.firstTitle {
	width: 250px;
	height: 40px;
	overflow: hidden;
}

.firstTitle span,
.firstBtn {
	display: inline-block;
	text-align: center;
	width: 125px;
	height: 40px;
	cursor: pointer;
}

.firstBtn {
	margin-top: 5px;
	line-height: 40px;
	position: absolute;
	right: 60px;
	top: 70px;
}

.firstTitle span {
	color: #333;
	background-color: #f2f2f2;
}

.firstTitle span.on {
	color: #fff;
	background-color: #2a80b9;
}

.firstTitle span.ons {
	color: #fff;
	background-color: #29a7e1;
}

.firstBtn {
	background-color: #f8931f;
	color: #fff;
}

.mar {
	margin-right: 5px;
}

.integralInfo {
	background-color: #f2f2f2;
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
}

.integralInfo span {
	display: inline-block;
	width: 150px;
	line-height: 40px;
	text-align: center;
	color: #f7921e;
}

.gooodsTable,
.gooodsContent {
	width: 100%;
	height: auto;
	overflow: hidden;
}

.goodsTitle,
.useManage {
	background-color: #e6e6e6;
	height: 50px;
	line-height: 50px;
	min-width: 920px;
}

.goodsTitle span,
.gooodsContent span {
	float: left;
	width: 10%;
	min-width: 90px;
	text-align: center;
	overflow: hidden;
}

.goodsTitle span:last-child,
.gooodsContent span:last-child {
	width: 20%;
}

.useManage span,
.useConcent span {
	float: left;
	width: 12.5%;
	text-align: center;
}

.gooodsContent .concent,
.useConcent .concent {
	width: 100%;
	border-bottom: 1px solid #e6e6e6;
	overflow: hidden;
}

.gooodsContent span,
.useConcent span {
	height: 80px;
	line-height: 80px;
}

.gooodsContent span.notConsume,
.useConcent span.notConsume {
	color: #08a019;
}

.gooodsContent span.aConsume,
.useConcent span.aConsume {
	color: #ec1415;
}

.tips {
	text-align: center;
	height: 80px;
	line-height: 80px;
	color: #e7e7e7;
	font-size: 24px;
}

.operate {
	padding: 15px 0;
	box-sizing: border-box;
}

.operate a {
	display: inline-block;
	width: 33.33%;
	height: 45px;
	line-height: 45px;
	text-align: center;
	color: #fff;
}

.del {
	background-color: #ec1415;
}

.eit {
	background-color: #00adef;
}

.shelves {
	background-color: #2a80b9;
}

.codeForm {
	width: 400px;
	height: 90px;
	overflow: hidden;
}

.codeForm .codeBox {
	margin: 20px auto;
	height: 45px;
	line-height: 45px;
	width: 300px;
}

.codeBox span,
.codeBox input {
	display: inline-block;
	height: 45px;
}

.codeBox span {
	width: 90px;
	text-align: center;
}

.codeBox input {
	outline: none;
	padding: 0;
	padding-left: 10px;
	width: 190px;
	box-sizing: border-box;
}
</style>