<template>
	<div class="activity-detail">
		<div class="detail">
			<div class="title">活动详情</div>
			<div class="left">
				<ul>
					<li>活动名称：{{detail.name}}</li>
					<li>活动类型：{{getTypeName(detail.type)}}</li>
					<li>活动对象：{{objectType(detail.objectType)}}</li>
					<li>
						<span>活动范围：</span>
						<p>
							<template v-if="isBrand == '0'">{{shopList.name}}</template>
							<template v-if="isBrand == '1'">{{filtShop(detail.shopIds)}}</template>
						</p>
					</li>
					<li>发起人 ：&nbsp;&nbsp;{{detail.createUid}}</li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="right">
				<ul>
					<li v-if="detail.coupons && detail.coupons.length >= 1">
						<span>权益内容：</span>
						<p>
							<template v-for="(item,index) in detail.coupons">
								{{item.name}}({{item.num}}张 {{judgeDiscount(item.type)}}
								<template v-if="item.type == 1 || item.type == 2">
									{{item.param}}元
								</template>
								<template v-if="item.type == 3 || item.type == 4">
									打{{parseInt(item.param)/10}}折
								</template>
								<template v-if="item.type == 5">
									赠
								</template>
								)
								<template v-if="index != (detail.coupons.length-1)">
									、
								</template>
							</template>
						</p>
					</li>
					<li v-else>
						<span>权益内容：</span>
						<p>无</p>
					</li>
					<li>活动期限：{{ifActive(detail.limit)}}</li>
					<li v-if="detail.explain && detail.explain.length >= 1">活动说明：{{detail.explain}}</li>
					<li v-else>活动说明：无</li>
				</ul>
			</div>
		</div>
		<div class="filter">
			<!--日期组件 开始时间-->
			<calendar :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			<!--日期组件 结束时间-->
			<calendar :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			<!--<calendarInt :startTime="startTime" :endtime="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendarInt>-->
			<div class="days">
				已选择 {{selectDays}} 天
			</div>
			<div class="search-box">
				<span class="yellow" @click="getDetail">搜索</span>
				<span class="gray" @click="reset">重置</span>
			</div>
			<div class="tips"><img src="../../res/icon/prompt.png" title="最多可查看7天" />最多可查看7天</div>
		</div>
		<div class="list">
			<div class="head">
				共 {{selectDays}} 日
			</div>
			<div class="title">
				<span></span>
				<span v-for="(item,index) in salesNumList" :key="index">{{formatTime(item.time)}}</span>
			</div>
			<ul>
				<li>
					<span>当日核销量</span>
					<span v-for="(item,index) in salesNumList" :key="index">{{item.count}}</span>
				</li>
			</ul>
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
			sessionData: '', //从缓存拿到的详情数据
			startTime: new Date().setHours(0, 0, 0, 0) - 6 * 3600 * 24 * 1000,
			endTime: new Date().setHours(0, 0, 0, 0),
			selectDays: 7, //选择天数
			receive: '', //接收数据
			detail: '', //详情数据
			salesNumList: [], //核销量详情
			detailTypeList: [], //活动类型列表
			isBrand: '', //是否为品牌 1为品牌 0不为品牌,
			userData: '',
			userShopList: '',
			shopList: ''
		};
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type')
		//  		calendarInt: ()=> import (/*webpackChunkName: "calendar_interval"*/ "src/components/calendar_interval"),
	},
	created() {
		this.userData = storage.session('userShop');
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		let shopListArr = [];
		if (this.isBrand == 1) {
			this.userShopList = storage.session('shopList');
			this.userShopList.forEach(item => {
				let obj = {
					id: item.id,
					name: item.shopName
				};
				shopListArr.push(obj);
			});
			this.userShopList = shopListArr;
		}
		this.sessionData = storage.session('activityStatisticsDetail');
	},
	mounted() {
		this.$store.commit('setPageTools', {
			back: () => {
				//返回
				storage.session('activityRequestDestroy', true);
				this.$router.push({
					path: '../activityStatistics',
					query: this.$route.query
				});
			}
		});
		this.receive = this.sessionData.detailData;
		this.detailTypeList = this.sessionData.detailType;
		this.shopList = this.userShopList;
		this.getDetail();
	},
	destroyed() {
		storage.session('activityStatisticsDetail', null);
	},
	methods: {
		async getDetail() {
			//获取活动详情
			if (!this.validate()) return;
			let endTime = new Date(this.endTime).setHours(23, 59, 59, 0);
			let data = await http.activityStatisticsGetDetail({
				data: {
					activityId: this.receive.id,
					type: this.receive.type,
					mouldType: this.receive.mouldType,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(endTime / 1000)
				}
			});
			this.detail = data;
			this.salesNumList = data.salesNumList;
		},
		reset() {
			//重置
			const weekTime = 6 * 3600 * 24 * 1000;
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.startTime = this.startTime - weekTime;
			this.endTime = new Date().setHours(0, 0, 0, 0);
			this.selectDays = 7;
			this.getDetail();
		},
		startTimeChange(time) {
			this.startTime = time;
			this.setDays();
		},
		endTimeChange(time) {
			this.endTime = time;
			this.setDays();
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd');
		},
		ifActive(limit) {
			//根据判断是否是生日活动而显示时间
			if (this.detail.type == 0 && this.detail.mouldType == 0) {
				switch (limit) {
					case '0':
						return '永久';
					// break;
					case '1':
						return '一年';
					// break;
					case '2':
						return '两年';
					// break;
					case '-1':
						return '不使用';
					// break;
					default:
						return '无';
				}
			} else {
				let start = this.detail.startTime,
					end = this.detail.endTime;
				return (
					utils.format(new Date(start * 1000), 'yyyy年MM月dd日') +
					' 至 ' +
					utils.format(new Date(end * 1000), 'yyyy年MM月dd日')
				);
			}
		},
		objectType(objectType) {
			//判断是何种活动对象
			switch (objectType) {
				case '0':
					return '店内';
				// break;
				case '1':
					return '会员';
				// break;
				case '2':
					return '会员';
				// break;
				case '3':
					return '微分店';
				// break;
				default:
					return '店内';
			}
		},
		judgeDiscount(type) {
			//判断是何种折扣
			switch (type) {
				case '1':
					return '单品减免';
				// break;
				case '2':
					return '整单减免';
				// break;
				case '3':
					return '单品打折';
				// break;
				case '4':
					return '整单打折';
				// break;
				case '5':
					return '赠菜';
				// break;
				default:
					return '无';
			}
		},
		getTypeName(type) {
			let str = '';
			for (let item of this.detailTypeList) {
				if (item.id == type) {
					str = item.children[0].name;
					break;
				} else {
					str = '未知类型';
				}
			}
			return str;
		},
		filtShop(shop) {
			//判断是品牌和单店   3为品牌 0为单店
			shop = shop == undefined ? [] : shop.split(',');
			let arr = [];
			if (this.isBrand == '1') {
				for (let i in this.shopList) {
					shop.forEach(item => {
						if (this.shopList[i].id == item) {
							arr.push(this.shopList[i].name);
						}
					});
				}
				return arr.toString();
			}
		},
		setDays() {
			this.selectDays =
				(this.endTime - this.startTime) / (3600 * 24 * 1000) + 1;
			this.validate();
		},
		validate() {
			//日期验证
			let isPass = true;
			if (
				this.startTime &&
				this.endTime &&
				this.endTime < this.startTime
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '开始时间不能大于结束时间'
				});
				isPass = false;
			}
			if (this.selectDays > 7) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '相隔天数大于7天，请重新选择'
				});
				isPass = false;
			}
			return isPass;
		}
	}
};
</script>

<style lang="less" scoped>
@media screen and (min-width: 1441px) {
	.detail {
		.left {
			width: 50%;
			float: left;
		}
		.right {
			width: 50%;
			float: right;
		}
	}
	.activity-detail .filter .tips {
		font-size: 16px;
	}
	.search-box span {
		width: 100px;
	}
}
@media screen and (max-width: 1440px) {
	.detail {
		width: 90%;
		.line {
			display: none;
		}
	}
	.activity-detail .filter .tips {
		font-size: 12px;
	}
	.search-box span {
		width: 95px;
	}
}

.activity-detail {
	width: 100%;
	padding-bottom: 50px;
	min-height: 1000px;
	.detail {
		margin-top: 20px;
		overflow: hidden;
		border: 1px solid #ccc;
		position: relative;
		.title {
			height: 40px;
			line-height: 40px;
			padding-left: 20px;
			background: #e6e6e6;
		}
		.line {
			position: absolute;
			left: 50%;
			width: 10px;
			margin-left: -5px;
			background: #e6e6e6;
			height: 100%;
		}
		ul {
			padding: 10px 35px;
			height: 100%;
			li {
				margin: 15px 0;
				padding: 5px 0;
				font-size: 16px;
				position: relative;
				line-height: 1.5;
				span {
					left: 0;
					top: 5px;
					position: absolute;
					font-size: 16px;
				}
				p {
					padding-left: 80px;
					width: 100%;
					font-size: 16px;
					line-height: 1.5;
				}
			}
		}
	}
	.filter {
		margin-top: 20px;
		.date-box {
			display: inline-block;
		}
		.days {
			display: inline-block;
			padding: 0 10px;
		}
		.search-box {
			display: inline-block;
			span {
				display: inline-block;
				margin-right: 10px;
				text-align: center;
				color: #fff;
				height: 40px;
				line-height: 40px;
			}
		}
		.tips {
			display: inline-block;
			color: #888;
			img {
				vertical-align: top;
				width: 18px;
				height: 18px;
				margin-right: 5px;
			}
		}
	}
	.list {
		margin-top: 20px;
		border: 1px solid #ccc;
		.head {
			height: 60px;
			line-height: 60px;
			padding-left: 20px;
			font-size: 16px;
		}
		span {
			width: 12.5%;
			float: left;
			text-align: center;
		}
		.title {
			overflow: hidden;
			background: #e6e6e6;
			span {
				height: 45px;
				line-height: 45px;
			}
		}
		ul li {
			overflow: hidden;
			span {
				height: 65px;
				line-height: 65px;
			}
		}
	}
}
</style>