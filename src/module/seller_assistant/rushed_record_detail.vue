<!--
    **抢购记录
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedRecord">
		<div class="rushedstatus">
			名称:{{goodsname}}
		</div>
		<com-table :listHeight='80' :showTitle='1' :introData="recordorderlist" :listWidth="1436" :titleData="titleList" :widthType='true'>
			<!-- 标题 -->
			<div class="list_title" slot="title">
				<div class="list_title_l fl">
					<span>抢购记录</span>
					<span></span>
					<span>共
								<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div class="list_title_r fr">
					<p>抢购领取:{{receiveNum}}份</p>
					<p>抢购数量:{{grabNum}}份</p>
				</div>
			</div>
			<div slot="con-0" slot-scope="props" class="userbox">
				<div class="imgbox">
					<img v-if="props.data.imageUrl != ''" :src="props.data.imageUrl" />
				</div>
				<div class="namebox">
					<span>{{props.data.name}}</span>
				</div>
			</div>
			<div slot="con-1" slot-scope="props">1</div>
			<div slot="con-2" slot-scope="props">{{transFormDates(props.data.createTime)}}</div>
			<div slot="con-3" slot-scope="props">
				{{props.data.status=="7" ? "是" : "否"}}
			</div>
		</com-table>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			index: null,
			titleList: [{
				titleName: '抢购用户',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 359 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '数量',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 359 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '购买时间',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 359 + 'px',
					flex: 'none'
				}
			},
			{
				titleName: '是否领取',
				titleStyle: {
					fontSize: 16 + 'px',
					width: 359 + 'px',
					flex: 'none'
				}
			}
			],
			allTotal: 0,
			page: 1,
			count: 0,
			num: 10,
			pageNum: 1,
			showPageList: [10, 20],
			goodsId: '', //商品id
			goodsname: '', //商品名称
			uploadUrl: '',
			grabNum: '', // 抢购商品
			receiveNum: '', //领取数量
			recordorderlist: [] //抢购人员列表
		};
	},
	methods: {
		returnStore: function() {
			this.$router.push('/admin/Assistanthistory/detail/record');
		},
		pageChange(obj) { //翻页
			this.page = obj.page;
			this.num = obj.num;
			this.getRecordlist();
		},
		async getUserList() {
			let data = await http.getUserLists({
				data: {
					shopId: this.shopId,
					goodsId: this.goodsId,
					page: this.page,
					num: this.num
				}
			});
			this.grabNum = data.grabNum; //抢购数量
			this.receiveNum = data.receiveNum; //领取数量
			this.recordorderlist = data.orderList; //抢购记录列表
			//获取抢购人员
			for (let i = 0; i < data.fansList.length; i++) {
				for (let j = 0; j < this.recordorderlist.length; j++) {
					if (this.recordorderlist[j].fid == data.fansList[i].id) {
						this.recordorderlist[j].name = data.fansList[i].name;
						this.recordorderlist[j].imageUrl = data.fansList[i].imageUrl;
					}
				}
			}
			this.pageNum = data.total;
			this.count = data.count;
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
	},
	watch: {
		'pageShow': '',
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
		this.uploadUrl = storage.session('userShop').uploadUrl;
		this.goodsId = storage.session('recordStock').goodsId;
		this.shopId = storage.session('recordStock').shopId;
		this.goodsname = storage.session('historyrecord').name;
		this.getUserList();
	}
};
</script>
<style type="text/css" scoped>
#rushedRecord {
	width: 1437px;
	height: auto;
}

#rushedRecord .rushedstatus {
	margin-bottom: 31px;
	color: #1DA527;
}

#rushedRecord .list {
	width: 1436px;
	min-height: 156px;
	border: 1px solid #D2D2D2;
}

#rushedRecord .list .list_title {
	width: 1436px;
	height: 45px;
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
	margin-top: 20px;
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
#rushedRecord .userbox{
	width:100%;
	height: 100%;
	display: flex;
	align-items: center;
}
#rushedRecord .userbox .imgbox,
#rushedRecord .userbox .namebox{
	width:50%;
	height: 100%;
	float: left;
	display: flex;
	align-items: center;
}
#rushedRecord .userbox .imgbox{
	justify-content: flex-end;
}
#rushedRecord .userbox .namebox{
	justify-content: flex-start;
}
#rushedRecord .imgbox img {
	width:42px;
	height: 42px;
	margin-right:20px;
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
	font-size:16px;
	margin-right:40px;
}

</style>