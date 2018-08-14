<!--活动统计-->
<!--黄一帆-->
<template>
	<div class="activity">
		<div class="real-time">
			<div class="title">实时数据</div>
			<div class="block">
				<div class="left">
					<div class="name">
						<em></em>核销量
					</div>
					<div class="card">
						今日 （张）
						<em>{{activityData.todaySalesNum}}</em>
					</div>
					<div class="card">
						昨日 （张）
						<em>{{activityData.yestodaySalesNum}}</em>
					</div>
				</div>
				<div class="right">
					<div class="name">
						<em></em>活动交易金额(元)
					</div>
					<div class="card">
						今日 （元）
						<em>{{activityData.todayMoney}}</em>
					</div>
					<div class="card">
						昨日 （元）
						<em>{{activityData.yestodayMoney}}</em>
					</div>
				</div>
			</div>
		</div>
		<div class="filter">
			<div class="tab-box select-ban" @click="statusChange">
				<span :class="{active:status == 2}" data-status="2">进行中的活动</span>
				<span :class="{active:status == -2}" data-status="-2">已结束的活动</span>
			</div>
			<div class="right-box">
				<selectBtn @emit="selectType" :sorts="options" :index="optionIndex" class="select-btn"></selectBtn>
				<div class="search-box">
					<span class="yellow" @click="getList">筛选</span>
					<span class="gray" @click="reset">重置</span>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="head">
				活动统计 · 共
				<em>{{listLength}}</em>条数据
			</div>
			<div class="title">
				<span>查看</span>
				<span>活动名称</span>
				<span>活动类型</span>
				<span>发券量</span>
				<span>领券量</span>
				<span>核销量</span>
				<span>核销率 (%)</span>
				<span>开始时间</span>
			</div>
			<ul>
				<li v-for="(item,index) in activityList" :key="index">
					<span>
						<em class="under-line" @click="checkDetail(item)">查看详情</em>
					</span>
					<span>{{item.name}}</span>
					<span>{{getTypeName(item.type)}}</span>
					<span>{{item.giveNum}}</span>
					<span>{{item.getNum}}</span>
					<span>{{item.SalesNum}}</span>
					<span>{{item.SalesRatio}}</span>
					<span>{{formatTime(item.createTime)}}</span>
				</li>
			</ul>
		</div>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageNum" :page="page" :isNoJump="true"></pageBtn>
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
			options: [], //全部活动类型
			optionIndex: 0,
			activityData: {
				todaySalesNum: 0,
				yestodaySalesNum: 0,
				todayMoney: 0,
				yestodayMoney: 0
			}, //活动数据
			activityList: [], //活动列表
			typeList: [], //活动类型列表
			detailData: [], //发送-活动详情
			detailType: [], //发送-活动类型列表
			page: 1, //分页
			num: 10, //每页显示多少条
			status: 2, //活动状态
			mouldType: '', //活动模板类型
			type: '', //活动类型
			pageNum: 0,
			listLength: 0, //数据条数
			requestObj: '' //缓存参数
		};
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		detail: () =>
			import(/*webpackChunkName: "activity_detail"*/ './activity_detail'),
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element')
	},
	mounted() {
		this.getRequest();
		this.getTypeList();
		this.getList();
	},
	methods: {
		selectType(index) {
			this.optionIndex = index;
			this.type =
				this.optionIndex > 0
					? this.typeList[this.optionIndex - 1].id
					: '';
			this.mouldType =
				this.optionIndex > 0
					? this.typeList[this.optionIndex - 1].children[0].id
					: '';
			this.page = 1;
			this.getList();
		},
		statusChange(event) {
			let target = event.target;
			if (target.tagName.toLocaleLowerCase() == 'span') {
				this.status = parseInt(target.getAttribute('data-status'));
			}
			this.page = 1;
			this.getList();
		},
		getRequest() {
			let isDestroy = storage.session('activityRequestDestroy');
			let backRequest = storage.session('activityRequest');
			if (isDestroy) {
				//确定是从详情页返回时 才读取缓存数据
				if (backRequest) {
					for (let i in backRequest) {
						this[i] = backRequest[i];
					}
					this.optionIndex = this.optionIndex;
				}
			}
			storage.session('activityRequestDestroy', null);
			storage.session('activityRequest', null);
		},
		async getTypeList() {
			let data = await http.getActivityMould();
			this.typeList = data;
			let arr = [];
			for (let item of this.typeList) {
				arr.push(item.children[0].name);
			}
			arr.unshift('全部活动类型');
			this.options = arr;
		},
		async getList() {
			let data = await http.activityGetList({
				data: {
					page: this.page,
					num: this.num,
					status: this.status,
					type: this.type,
					mouldType: this.mouldType
				}
			});
			this.activityData = data;
			this.activityList = data.list;
			this.pageNum = data.total;
			this.listLength = data.count;
			this.requestObj = {
				page: this.page,
				num: this.num,
				status: this.status,
				type: this.type,
				mouldType: this.mouldType,
				optionIndex: this.optionIndex,
				pageNum: this.pageNum
			};
		},
		reset() {
			//重置
			this.options.push('');
			this.options.pop('');
			this.type = '';
			this.mouldType = '';
			this.status = 2;
			this.page = 1;
			this.getList();
		},
		pageChange(obj) {
			this.page = obj.page;
			this.getList();
		},
		getTypeName(type) {
			let str = '';
			for (let item of this.typeList) {
				if (item.id == type) {
					str = item.children[0].name;
					break;
				} else {
					str = '未知类型';
				}
			}
			this.reqSelectedName = str;
			return str;
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
		},
		checkDetail(item) {
			let detail = {
				detailData: item,
				detailType: this.typeList
			};
			storage.session('activityRequest', this.requestObj); //进入详情时 缓存请求参数
			storage.session('activityStatisticsDetail', detail); //进入详情时 缓存详情数据
			this.$router.push({
				path: 'activityStatistics/detail',
				query: this.$route.query
			});
		}
	}
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1440px) {
	.real-time {
		width: 80%;
		.right {
			margin-top: 20px;
		}
	}
}
@media screen and (min-width: 1440px) {
	.real-time {
		.left {
			float: left;
		}
		.right {
			float: right;
		}
	}
	.activity .real-time .block > div {
		width: 49.7%;
	}
	.activity .real-time {
		width: 100%;
	}
}
.activity {
	width: 100%;
	.back {
		span {
			display: block;
			color: #f8931f;
			border: 1px solid #f8931f;
			width: 80px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			cursor: pointer;
		}
	}
	.real-time {
		border: 1px solid #ccc;
		.title {
			height: 40px;
			line-height: 40px;
			padding: 0 20px;
			font-size: 16px;
			background: #f2f2f2;
		}
		.block {
			overflow: hidden;
			background: #f2f2f2;
			& > div {
				background: #fff;
				overflow: hidden;
				padding-bottom: 30px;
			}

			.name {
				width: 100%;
				float: left;
				height: 50px;
				line-height: 50px;
				padding-left: 40px;
				font-size: 16px;
				em {
					height: 10px;
					width: 10px;
					background: #f8931f;
					display: inline-block;
					margin-right: 15px;
				}
			}
			.card {
				float: left;
				width: 210px;
				height: 100px;
				line-height: 100px;
				margin-left: calc(~'(100% - 420px)/3');
				background: #f2f2f2;
				text-align: center;
				font-size: 16px;
				em {
					color: #f8931f;
					font-size: inherit;
				}
			}
		}
	}
	.filter {
		margin-top: 20px;
		.tab-box {
			float: left;
			span {
				float: left;
				height: 40px;
				line-height: 40px;
				width: 130px;
				border: 1px solid #f8931f;
				color: #f8931f;
				text-align: center;
				cursor: pointer;
				font-size: 16px;
			}
			span.active {
				background: #f8931f;
				color: #fff;
			}
		}
		.right-box {
			float: right;
		}
		.select-btn {
			float: left;
			margin-right: 20px;
		}
		.search-box {
			float: left;
			span {
				display: inline-block;
				margin-right: 10px;
				width: 100px;
				text-align: center;
				color: #fff;
				height: 40px;
				line-height: 40px;
			}
		}
		&:after {
			content: '';
			clear: both;
			zoom: 1;
			display: block;
		}
	}
	.list {
		border: 1px solid #ccc;
		margin-top: 20px;
		span {
			float: left;
			width: 12.5%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
		.head {
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			padding-left: 20px;
			em {
				color: #f8931f;
				padding: 0 3px;
				font-size: inherit;
			}
		}
		.title {
			background: #e6e6e6;
			overflow: hidden;
			span {
			}
		}
		ul li {
			overflow: hidden;
			span {
				height: 60px;
				line-height: 60px;
				.under-line {
					color: #f8931f;
					display: inline-block;
					border-bottom: 1px solid #f8931f;
					line-height: normal;
					cursor: pointer;
				}
			}
		}
	}
	.page-box {
		width: 100%;
		text-align: left;
		padding-top: 20px;
	}
}
</style>