/** * 用户评价统计 * *miaochuan.sha */
<template>
	<div id="usereview">
		<div class="list">
			<com-table :listHeight='70' :listWidth="1436" :showHand="true" :titleData="titleList" :introData="viewList" :widthType='true'>
				<!-- 标题 -->
				<div class="list_title" slot="title">
					<span>用户点评</span>
					<span></span>
					<span>共
						<a href="javascript:;">{{count}}</a>条记录</span>
				</div>
				<div slot="con-0" slot-scope="props" class="user_img">
					<img class='user' v-if="props.data.isAnonymous == '0'" :src="props.data.imageUrl" :alt="props.data.name" />
					<img class='user' v-if="props.data.isAnonymous == '1'" src="../../res/images/nimingyonghu.png" />
				</div>
				<div slot="con-1" slot-scope="props">
					<span v-if="props.data.isAnonymous == '0'">{{props.data.nickName}}</span>
					<span v-if="props.data.isAnonymous == '1'">匿名用户</span>
				</div>
				<div slot="con-3" slot-scope="props">
					{{transFormDates(props.data.createTime)}}发布了一条点评
				</div>
				<div slot="con-4" slot-scope="props" style="height:100%;display:flex;justify-content:center;align-items:center;line-height:1.5;">
					{{props.data.comment}}
				</div>
			</com-table>
		</div>
		<!-- 翻页 -->
		<section class="turn-page">
			<pageElement @pageNum="pageChange" :page="Number(page)" :total="Number(pageNum)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
		</section>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			page: 1,
			num: 10,
			count: 0, //数据总条数
			pageNum: 1,
			showPageList: [10, 20],
			viewList: [], //评价列表
			titleList: [
				{
					titleName: '用户头像',
					dataName: 'imageUrl',
					titleStyle: {
						width: 143.5 + 'px'
					}
				},
				{
					titleName: '用户名',
					dataName: 'nickName',
					titleStyle: {
						width: 215.3 + 'px'
					}
				},
				{
					titleName: '门店来源',
					dataName: 'shopName',
					titleStyle: {
						width: 193.5 + 'px'
					}
				},
				{
					titleName: '时间',
					dataName: 'createTime',
					titleStyle: {
						width: 259 + 'px'
					}
				},
				{
					titleName: '内容',
					dataName: 'comment',
					titleStyle: {
						width: 624 + 'px',
						overflow: 'visible',
						whiteSpace: 'normal',
						textOverflow: 'clip'
					}
				}
			]
		};
	},
	props: {
		conditions: Object //筛选条件
	},
	methods: {
		returnStore: function() {
			this.$emit('throwWinResult', 'index');
			this.$store.commit('setPageTools', {});
			//this.$router.push('/admin/Commentstatics');
		},
		pageChange(obj) {
			//翻页
			this.page = obj.page;
			this.num = obj.num;
			this.getCommentList();
		},
		async getCommentList() {
			let data = await http.getCommentList({
				data: {
					shopIds: this.conditions.shopIds, //查找的店铺
					startTime: this.conditions.startTime, //开始时间
					endTime: this.conditions.endTime, //结束时间
					channel: this.conditions.channel, //点单方式
					page: this.page,
					num: this.num
				}
			});
			if (data) {
				this.count = data.count;
				this.pageNum = data.total;
				this.viewList = data.list;
			}
		},
		changeFormat: function(t) {
			t -= 0;
			if (t < 10) {
				return '0' + t;
			} else {
				return t + '';
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
			return (
				date.getFullYear() +
				'-' +
				(date.getMonth() + 1) +
				'-' +
				date.getDate() +
				' ' +
				date.getHours() +
				':' +
				this.changeFormat(date.getMinutes())
			);
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
			fontSize: 16 + 'px',
			flex: 'none'
		};
		for (let item of this.titleList) {
			Object.assign(item.titleStyle, obj);
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
		this.getCommentList();
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
</style>