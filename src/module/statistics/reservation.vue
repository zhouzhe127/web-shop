/**
 * @file
 * 
 * 预定统计
 *
 * @author 黄一帆 huiling.liu
 */
<template>
	<div class="reservation">
		<div class="filter">
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<span class="input-word">至</span>
			<div class="input-box search-div">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" class="left-box" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
				<em class="search-btn" @click="search"></em>
			</div>
			<selectBtn :sorts="sourceList" :index="0" :width="150" @emit="sourceSelect"></selectBtn>
			<selectBtn :sorts="payList[payIndex]" :index="0" :width="150" @emit="paySelect"></selectBtn>
			<!--根据订单号查询详情-->
			<div class="search-input">
				<input type="text" placeholder="请输入手机号码" @input="orderInput" @propertychange="orderInput" />
				<em @click="searchPhone"></em>
			</div>
		</div>
		<com-table :listHeight='80' :showHand="false" :showTitle='2' :listWidth="1400" :introData="reserveList" :titleData="titleList">
			<div slot="con-0" slot-scope="props" class="btnLink" @click="openDetail">
				<span>
					<i class="show-detail" :data-index="props.index">查看详情</i>
				</span>
			</div>
			<div slot="con-4" slot-scope="props">
				<span>{{props.data.tableName == '' || props.data.tableName == null ? "无" : props.data.tableName }}</span>
			</div>
			<div slot="con-6" slot-scope="props">
				<span>{{formatTime(props.data.createTime)}}</span>
			</div>
			<div slot="con-7" slot-scope="props">
				<span>{{setStatusName(props.data.status)}}</span>
			</div>
			<div slot="con-8" slot-scope="props">
				<span>{{props.data.remark == '' ? "无" : props.data.remark}}</span>
			</div>
			<div slot="con-9" slot-scope="props">
				<span>
					<img v-if="props.data.from == 3" src="../../res/icon/res-phone.png" />
					<img v-if="props.data.from == 1 || props.data.from == 2" src="../../res/icon/res-wechat.png" />
				</span>
			</div>
		</com-table>
		<div class="page-box">
			<pageBtn @pageNum="pageChange" :total="pageNum" :page="page" :isNoJump="true"></pageBtn>
		</div>
		<component :detailList="detailList" :is="showWin" @emit="getEmitWin"></component>
	</div>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';
import utils from 'src/verdor/utils';

export default {
	data() {
		return {
			index: null,
			titleList: [
				{
					titleName: '操作',
					titleStyle: { width: '160px', flex: 'none' }
				},
				{ titleName: '姓名', dataName: 'name' },
				{ titleName: '手机号', dataName: 'phone' },
				{ titleName: '预定人数', dataName: 'person' },
				{ titleName: '预定桌台' },
				{ titleName: '预付款', dataName: 'price' },
				{ titleName: '预定时间', dataName: 'createTime' },
				{ titleName: '预定状态', dataName: 'status' },
				{ titleName: '备注', dataName: 'remark' },
				{ titleName: ' ' }
			],
			allTotal: 0,
			reserveList: [],
			startTime: new Date().setHours(0, 0, 0, 0),
			endTime: new Date().setHours(0, 0, 0, 0),
			sourceList: ['全部来源', '电话', '微信'],
			sourceStatus: [0, 3, 1],
			payList: [
				['全部数据', '已支付', '预定中', '已到店', '已退款'],
				['全部数据', '预定中', '已到店', '已过期']
			],
			payStatus: [[0, 5, 2, 3, 8], [0, 2, 3, -3]],
			payIndex: 0,
			page: 1,
			pageShow: 10,
			pageNum: 1,
			status: 0,
			statusFrom: 0,
			phone: '',
			userData: '', //缓存登录数据
			shopId: '', //店铺id
			detailList: [], //详情列表
			showWin: null //是否显示弹窗
		};
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		detailWin: () =>
			import(/*webpackChunkName: "reservation_win"*/ './reservation_win'),
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	created() {
		this.userData = storage.session('userShop');
	},
	mounted() {
		this.shopId = this.userData.currentShop.id;
		this.search();
	},
	methods: {
		async search() {
			if (!this.validate()) return;
			let endTime = new Date(this.endTime).setHours(23, 59, 59, 0);
			let data = await http.getReserveList({
				data: {
					shopId: this.shopId,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(endTime / 1000),
					page: this.page,
					num: this.pageShow, //一页显示多少
					status: this.status,
					from: this.statusFrom,
					phone: this.phone
				}
			});
			console.log(data, 'data');
			this.reserveList = data.list ? data.list : [];
			console.log(this.reserveList, 'reserve');
			this.pageNum = data.pages;
			console.log(this.pageNum);
		},
		async openDetail(event) {
			let target = event.target;
			if (target.className == 'show-detail') {
				let index = target.getAttribute('data-index');
				let data = await http.getReserveDetail({
					data: {
						roid: this.reserveList[index].roid,
						shopId: this.shopId
					}
				});
				this.detailList = data;
				this.showWin = 'detailWin';
			}
		},
		pageChange(obj) {
			this.page = obj.page;
			this.pageShow = obj.num;
			this.search();
		},
		getEmitWin(res) {
			if (res == 'close') {
				this.showWin = null;
			}
		},
		orderInput(event) {
			//限制文本框输入 只能输入数字
			let num = event.target.value;
			num = num.replace(/[^\d]/g, '');
			if (isNaN(num)) num = '';
			this.phone = num;
			event.target.value = num;
		},
		searchPhone() {
			//根据订单号搜索 进入订单详情
			let phone = this.phone;
			let regMobile = /^1[\d]{10,10}$/;
			if (phone && regMobile.test(phone)) {
				this.search();
			} else {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请输入正确的手机号码'
				});
			}
		},
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		validate() {
			//日期验证
			let isPass = true;
			let start = parseInt(this.startTime / 1000 / 3600 / 24);
			let end = parseInt(this.endTime / 1000 / 3600 / 24);
			if (start > end) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '开始时间不能大于结束时间'
				});
				isPass = false;
			}
			return isPass;
		},
		sourceSelect(index) {
			//来源选择
			this.statusFrom = this.sourceStatus[index];
			this.payIndex = index == 1 ? 1 : 0;
			this.search();
		},
		paySelect(index) {
			//支付状态选择
			this.status = this.payStatus[this.payIndex][index];
			this.search();
		},
		setStatusName(status) {
			let statusName = '';
			status = parseInt(status);
			switch (status) {
				case -3:
					statusName = '已过期';
					break;
				case -2:
					statusName = '已取消';
					break;
				case 1:
					statusName = '待确定';
					break;
				case 2:
					statusName = '已确认';
					break;
				case 3:
					statusName = '已到店';
					break;
				case 4:
					statusName = '待付款';
					break;
				case 5:
					statusName = '已支付';
					break;
				case 6:
					statusName = '已完成';
					break;
				case 7:
					statusName = '退款中';
					break;
				case 8:
					statusName = '已退款';
					break;
				default:
					break;
			}
			return statusName;
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm');
		}
	}
};
</script>

<style lang="less" scoped>
.reservation {
	min-width: 1300px;
	.align {
		display: inline-block;
		vertical-align: middle;
	}
	.filter {
		position: relative;
		.input-word {
			padding: 0 5px;
		}
		.input-box {
			.align;
		}
		.search-div {
			width: 240px;
			.left-box {
				float: left;
			}
			.search-btn {
				float: left;
				height: 40px;
				width: 40px;
				cursor: pointer;
				background: url(../../res/images/search.png) #29a7e1 center
					no-repeat;
			}
		}
		.input-check {
			.align;
			font-size: 16px;
			margin-left: 20px;
			color: #333;
			i {
				height: 20px;
				width: 20px;
				border-radius: 2px;
				margin-right: 5px;
				color: #444;
				cursor: pointer;
				display: inline-block;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
			}
			i.active {
				background: url(../../res/icon/white_select.png) #28a8e0 center
					no-repeat;
				border: 1px solid #28a8e0;
			}
		}
		.search-input {
			.align;
			width: 200px;
			height: 40px;
			border: 1px solid #ddd;
			margin-left: 20px;
			overflow: hidden;
			input {
				height: 38px;
				width: 158px;
				float: left;
				border: 0;
				padding: 0 10px;
				&:focus {
					outline: none;
				}
			}
			em {
				float: left;
				height: 38px;
				width: 40px;
				border-left: 1px solid #ddd;
				cursor: pointer;
				background: url(../../res/images/search.png) #29a7e1 center
					no-repeat;
			}
		}
		.select-body {
			margin-left: 10px;
		}
	}
	.list {
		width: 100%;
		margin-top: 20px;

		.wide {
			width: 13%;
		}
		.title {
			overflow: hidden;
			background: #e6e6e6;
		}
		li {
			overflow: hidden;
			i {
				display: inline-block;
				vertical-align: top;
				height: 49px;
				width: 100%;
				border: 0;
				background: #f8931f;
				color: #fff;
				cursor: pointer;
			}
			img {
				vertical-align: middle;
			}
		}
		li:nth-child(2n + 1) {
			background: #f2f2f2;
		}
		.empty {
			height: 50px;
			line-height: 50px;
			text-align: center;
			color: #f8931f;
		}
	}

	.page-box {
		width: 100%;
		text-align: left;
		padding-top: 20px;
	}
}

.btnLink {
	text-align: center;
	height: 80px;
	line-height: 50px;
	align-items: center;

	display: flex;
	span {
		display: inline-block;
		width: 80%;
		margin: 0 auto;
	}
}
.reservation .btnLink i {
	display: inline-block;
	vertical-align: top;
	height: 49px;
	width: 100%;
	border: 0;
	background: #f8931f;
	color: #fff;
	cursor: pointer;
}
.reservation {
	min-width: 100%;
}
@media screen and (min-width: 1024px) and (max-width: 1440px) {
	.btnLink {
		text-align: center;
		height: 80px;
		line-height: 50px;
		align-items: center;
		display: flex;
		span {
			display: inline-block;
			width: 80%;
			margin: 0 auto;
		}
	}
	.reservation .btnLink i {
		display: inline-block;
		vertical-align: top;
		height: 49px;
		width: 100%;
		border: 0;
		background: #f8931f;
		color: #fff;
		cursor: pointer;
	}
	.reservation {
		min-width: 100%;
	}
	.reservation .filter .search-input {
		display: inline-block;
		vertical-align: middle;
		width: 200px;
		height: 40px;
		border: 1px solid #ddd;
		margin-left: 0px;
		overflow: hidden;
		margin-top: 12px;
	}
}
</style>