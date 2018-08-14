/** * 用户评价统计 * *miaochuan.sha */
<template>
	<div id="usereview">
		<!-- <div class="return">
			<a href="javascript:;" @click="returnStore">返回</a>
		</div> -->
		<!-- 列表 -->
		<div class="list">
			<com-table :listHeight='70' :listWidth="1436" :showHand="true" :titleData="titleList" :introData="formList" :widthType='true'>
				<!-- 标题 -->
				<div class="list_title" slot='title'>
					<span>商品点评</span>
					<span></span>
					<span>共
						<a href="javascript:;">{{reviewList.length}}</a>条记录</span>
				</div>
				<div slot="title-3" @click="ascdesorder('up')">
					<span>赞</span>
					<img v-if="ascending == '-1'" src="../../res/images/thedefault.png">
					<img v-if="ascending != '-1' && ascending % 2 == '0'" src="../../res/images/ascending.png">
					<img v-if="ascending != '-1' && ascending % 2 != '0'" src="../../res/images/descendingorder.png">
				</div>
				<div slot="title-4" @click="ascdesorder('down')">
					<span>踩</span>
					<img v-if="descending == '-1'" src="../../res/images/thedefault.png">
					<img v-if="descending != '-1' && descending % 2 == '0'" src="../../res/images/ascending.png">
					<img v-if="descending != '-1' && descending % 2 != '0'" src="../../res/images/descendingorder.png">
				</div>
				<div slot="con-0" slot-scope="props" class="user_img">
					<img class="shop" v-bind:src="uploadUrl  + props.data.imageName" />
				</div>
				<div slot="con-1" slot-scope="props">
					<span v-if="props.data.id < 100000">{{props.data.name}}</span>
					<span v-else>{{props.data.name}}({{props.data.shopName}})</span>
				</div>
				<div slot="con-3" slot-scope="props">
					<span v-if="updownType == 'up'">{{props.data.num}}</span>
					<span v-else>{{props.data.upNum}}</span>
				</div>
				<div slot="con-4" slot-scope="props">
					<span v-if="updownType == 'up'">{{props.data.downNum}}</span>
					<span v-else>{{props.data.num}}</span>
				</div>
			</com-table>
		</div>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			count: '0',
			page: 1,
			num: 10,
			endTotal: 1,
			formList: [], //展示在列表的数据
			ascending: -1, //赞升序
			descending: -1, //踩
			titleList: [
				{
					titleName: '商品图片',
					dataName: 'imageName'
				},
				{
					titleName: '商品名称',
					dataName: 'name'
				},
				{
					titleName: '排行',
					dataName: 'top'
				},
				{
					titleName: '赞'
				},
				{
					titleName: '踩'
				}
			]
		};
	},
	props: {
		reviewList: Array, //列表数据
		uploadUrl: String,
		updownType: String
	},
	methods: {
		returnStore: function() {
			this.$emit('updownResult', 'index');
			this.$store.commit('setPageTools', {});
		},
		getPageNum: function(obj) {
			this.page = obj.page;
			this.num = obj.num;
			this.setPage();
		},
		setPage: function() {
			this.endTotal = Math.ceil(this.reviewList.length / this.num);
			let pageStart = (this.page - 1) * this.num;
			let pageEnd = this.page * this.num;
			let pageContent = this.reviewList.slice(pageStart, pageEnd);
			this.formList = pageContent;
		},
		ascdesorder: function(type) {
			//升序降序
			if (type == 'up') {
				this.ascending++;
				if (this.ascending % 2 == 0) {
					if (this.updownType == 'up') {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'num',
							true
						); //将其倒序排列
						this.setPage();
					} else {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'upNum',
							true
						); //将其倒序排列
						this.setPage();
					}
				} else {
					if (this.updownType == 'up') {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'num',
							false
						); //将其倒序排列
						this.setPage();
					} else {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'upNum',
							false
						); //将其倒序排列
						this.setPage();
					}
				}
			} else if (type == 'down') {
				this.descending++;
				if (this.descending % 2 == 0) {
					if (this.updownType == 'up') {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'downNum',
							true
						); //将其倒序排列
						this.setPage();
					} else {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'num',
							true
						); //将其倒序排列
						this.setPage();
					}
				} else {
					if (this.updownType == 'up') {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'downNum',
							false
						); //将其倒序排列
						this.setPage();
					} else {
						this.reviewList = utils.sortByAll(
							this.reviewList,
							'num',
							false
						); //将其倒序排列
						this.setPage();
					}
				}
			}
		}
	},
	watch: {},
	components: {
		selectBtn: () =>
			import(/* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	created() {
		let obj = {
			titleStyle: {
				fontSize: 16 + 'px'
			}
		};
		for (let item of this.titleList) {
			Object.assign(item, obj);
		}
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '返回',
				className: ['fd-blue'],
				fn: () => {
					this.returnStore();
				}
			}
		]);
		this.setPage();
	}
};
</script>
<style type="text/css" scoped>
#usereview .return {
	width: 100%;
	height: 40px;
}

#usereview .return a {
	display: block;
	width: 100px;
	height: 38px;
	text-align: center;
	line-height: 38px;
	font-size: 16px;
	color: #fff;
	float: right;
	background: #29abe2;
}

#usereview .list {
	width: 1436px;
}

#usereview .list .user_img {
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
}

#usereview .list .user_img .user {
	width: 49px;
	height: 49px;
	border-radius: 50%;
}

#usereview .list .user_img .shop {
	width: 44px;
	height: 44px;
}

#usereview .list .list_title {
	width: 1426px;
	height: 50px;
}

#usereview .list .list_title span {
	font-size: 16px;
	color: #333;
	font-weight: bold;
}

#usereview .list .list_title span:first-child {
	margin-right: 11px;
}

#usereview .list .list_title span:nth-child(2) {
	display: inline-block;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background: #000;
	margin-right: 11px;
	vertical-align: middle;
}

#usereview .list .list_title span:last-child a {
	font-size: 16px;
	color: #ff3c05;
}

#usereview .list .heads {
	width: 1436px;
	height: 41px;
	background: #f2f2f2;
}

#usereview .list .heads li {
	float: left;
	text-align: center;
	line-height: 41px;
	font-size: 16px;
	color: #43414a;
}

#usereview .list .heads li:nth-child(1) {
	width: 20%;
}

#usereview .list .heads li:nth-child(2) {
	width: 20%;
}

#usereview .list .heads li:nth-child(3) {
	width: 20%;
}

#usereview .list .heads li:nth-child(4) {
	width: 20%;
}

#usereview .list .heads li:nth-child(5) {
	width: 20%;
}

#usereview .list .nolist {
	width: 1436px;
	text-align: center;
	line-height: 70px;
	font-size: 24px;
	color: #e0e0e0;
}

#usereview .list .contents {
	width: 1436px;
	height: 69px;
	border-bottom: 1px solid #f7f7f7;
}

#usereview .list .contents li {
	float: left;
	height: 69px;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 14px;
	color: #666;
}

#usereview .list .contents li:nth-child(1) {
	width: 20%;
}

#usereview .list .contents li:nth-child(1) img {
	width: 44px;
	height: 44px;
	margin: 12px auto;
}

#usereview .list .contents li:nth-child(2) {
	width: 20%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#usereview .list .contents li:nth-child(3) {
	width: 20%;
}

#usereview .list .contents li:nth-child(4) {
	width: 20%;
}

#usereview .list .contents li:nth-child(5) {
	width: 20%;
	line-height: 20px;
}

#usereview .list-num {
	width: 1436px;
	height: 45px;
	text-align: right;
	margin-top: 20px;
	margin-bottom: 100px;
}

#usereview .list-num em {
	vertical-align: middle;
	padding: 0 5px;
	color: #666;
}

#usereview .list-num .list-select {
	display: inline-block;
	vertical-align: middle;
}

#usereview .list-num .page-box {
	display: inline-block;
	padding-left: 20px;
	vertical-align: middle;
}

#usereview .turn-page {
	margin: 10px 0 30px 0;
}
</style>