<template>
	<div class="entity">
		<div class="filter">
			<div class="input-box">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" :format="'yyyy年MM月dd日'" @emit="startTimeChange"></calendar>
			</div>
			<span class="input-word">至</span>
			<div class="input-box">
				<!--日期组件 结束时间-->
				<calendar :time="endTime" :format="'yyyy年MM月dd日'" @emit="endTimeChange"></calendar>
			</div>
			<selectBtn :sorts="selectBelong" :index="belongIndex" :width="180" @emit="belongSelect"></selectBtn>
			<selectBtn :sorts="selectCardType" :index="cardIndex" :width="150" @emit="cardTypeSelect"></selectBtn>
			<!--筛选 重置-->
			<!-- <div class="search-box">
				<span class="search-btn blue" @click="filter">筛选</span>
				<span class="reset-btn gray" @click="reset">重置</span>
			</div> -->
		</div>
		<div class="main">
			<div class="total">
				<div class="title">
					<span>开卡次数</span>
					<span>购卡金额</span>
					<span>卡内总额</span>
					<span>卡内总积分</span>
					<span>卡内券包(张)</span>
				</div>
				<div class="item">
					<span>{{cardData.num}}</span>
					<span>{{cardData.amount}}</span>
					<span>{{cardData.cardAmount}}</span>
					<span>{{cardData.cardPoint}}</span>
					<span>{{cardData.couponNum}}</span>
				</div>
			</div>

			<com-table :listHeight='80' :showHand="true" :listName="'卡列表'" :showTitle='1' :listWidth="1300" :introData="cardList" :titleData="titleList" :allTotal="cardListLength">
				<div slot="con-0" slot-scope="props">{{formatTime(props.data.createTime)}}</div>
				<div slot="con-1" slot-scope="props">{{getShopName(props.data.shopId)}}</div>
				<div slot="con-2" slot-scope="props">{{getCardName(props.data.cardTypeId)}}</div>
				<div slot="con-3" slot-scope="props">{{getCardPrice(props.data.cardId)}}</div>
				<div slot="con-6" slot-scope="props" style="color:#00aae5">{{props.data.couponNum}}</div>
			</com-table>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :total="pageNum" :page="page" :isNoJump="true"></pageBtn>
			</div>
		</div>
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
					titleName: '开卡时间',
					titleStyle: { width: '160px', flex: 'none' }
				},
				{ titleName: '卡属门店' },
				{ titleName: '卡类型' },
				{ titleName: '购卡金额' },
				{ titleName: '卡内金额', dataName: 'cardAmount' },
				{ titleName: '卡内积分', dataName: 'cardPoint' },
				{ titleName: '卡内券包(张)', dataName: 'couponNum' }
			],
			allTotal: 0,
			entityList: [],
			belong: [], //所属门店
			cardType: [], //实体卡
			selectBelong: [], //所属门店下拉框列表
			belongIndex: 0,
			selectCardType: [], //实体卡拉框列表
			cardRelationList: [], //卡关联列表
			cardData: '', //实体卡数据
			cardList: [], //实体卡列表
			cardIndex: 0,
			startTime: '',
			endTime: '',
			cardId: 0,
			belongId: '',
			page: 1,
			pageNum: 0,
			pageShow: 10,
			status: 0,
			statusFrom: 0,
			phone: 0,
			userData: '', //缓存登录数据
			userShopList: '', //店铺列表
			shopId: '', //店铺id
			isBrand: 0, //是否品牌
			cardListLength: 0
		};
	},
	components: {
		selectBtn: () =>
			import(/*webpackChunkName: "select_btn"*/ 'src/components/select_btn'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		comTable: () =>
			import(/*webpackChunkName: "com_table"*/ 'src/components/com_table')
	},
	created() {
		this.userData = storage.session('userShop');
		this.shopId = this.userData.currentShop.id;
		this.belong = this.userData.currentShop;
		this.selectBelong.push(this.belong.name);
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
	},
	mounted() {
		this.$store.commit('setPageTools', [
			{
				name: '筛选',
				fn: () => {
					this.filter();
				},
				className: 'userLabel'
			},
			{
				name: '重置',
				fn: () => {
					this.reset();
				},
				className: 'userLabel'
			}
		]);
		this.shopId = this.userData.currentShop.id;
		this.getCardType();
		this.getCardRelationList();
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(23, 59, 59, 999);
		this.getCardList();
	},
	methods: {
		async getCardType() {
			//获取卡类型
			let data = await http.cardTypeGetList({
				data: {
					shopId: this.shopId,
					ischain: this.isBrand
				}
			});
			this.cardType = data;
			this.cardType.forEach((item) => {
				this.selectCardType.push(item.name);
			});
			this.selectCardType.unshift('全部');
		},
		async getCardRelationList() {
			//获取卡关联列表
			let data = await http.getCardRelationList({
				data: {
					shopId: this.shopId,
					ischain: this.isBrand
				}
			});
			this.cardRelationList = data;
		},
		async getCardList() {
			//获取实体卡列表
			if (!this.validate()) return;
			let data = await http.getCardStatistics({
				data: {
					ischain: this.isBrand,
					startTime: parseInt(this.startTime / 1000),
					endTime: parseInt(this.endTime / 1000),
					page: this.page,
					num: this.pageShow,
					cardTypeId: this.cardId,
					subShopId: this.belongId
				}
			});
			this.cardList = data.cardList;
			if (this.page == 1) {
				//此接口有问题，只有第一页才返回总数之类的数据，其他页只有列表
				this.cardData = data;
				this.pageNum = data.total;
				console.log(this.pageNum);
				this.cardListLength = data.count;
			}
		},
		filter() {
			//点击筛选
			this.page = 1;
			this.getCardList();
		},
		pageChange(obj) {
			this.page = obj.page;
			this.pageShow = obj.num;
			this.getCardList();
		},
		reset() {
			this.belongIndex = 0;
			this.cardIndex = 0;
			this.cardId = '';
			this.belongId = '';
			this.startTime = new Date().setHours(0, 0, 0, 0);
			this.endTime = new Date().setHours(23, 59, 59, 999);
			this.page = 1;
			this.getCardList();
		},
		getShopName() {
			//目前无品牌模块 暂时注释起来
			//for(let i in this.belong){
			//if(this.belong[i].id == id) return this.belong[i].name;
			//}
			return this.belong.name;
		},
		getCardName(id) {
			for (let item of this.cardType) {
				if (item.id == id) return item.name;
			}
		},
		getCardPrice(id) {
			let price = '--';
			for (let item of this.cardRelationList) {
				if (item.id == id) {
					price = item.price;
				}
			}
			return price;
		},
		formatTime(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm');
		},
		belongSelect(index) {
			this.belongIndex = index;
			this.belongId = this.belongIndex;
		},
		cardTypeSelect(index) {
			this.cardIndex = index;
			this.cardId =
				this.cardIndex > 0 ? this.cardType[this.cardIndex - 1].id : 0;
		},
		startTimeChange(time) {
			this.startTime = time;
		},
		endTimeChange(time) {
			this.endTime = time;
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
		}
	}
};
</script>

<style lang="less" scoped>
.entity {
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
		.search-box {
			.align;
			margin-left: 10px;
			span {
				width: 80px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border: 0;
				color: #fff;
				display: inline-block;
				cursor: pointer;
			}
			.search-btn {
				margin-right: 5px;
			}
		}
		.select-body {
			margin-left: 10px;
		}
	}
	.main {
		padding-top: 20px;
		.float {
			float: left;
			text-align: center;
		}
		.total {
			width: 100%;
			border: 1px solid #ccc;
			span {
				.float;
				width: 20%;
			}
			.title {
				overflow: hidden;
				background: #f7f7f7;
				span {
					height: 40px;
					line-height: 40px;
				}
			}
			.item {
				overflow: hidden;
				span {
					height: 60px;
					line-height: 60px;
					color: #ff9800;
				}
			}
		}
		.list {
			margin-top: 20px;
			border: 1px solid #ccc;
			span {
				.float;
				width: 14.28%;
			}
			.head {
				height: 40px;
				line-height: 40px;
				padding: 0 20px;
				font-size: 16px;
				em {
					color: #f30;
					font-size: 16px;
				}
			}
			.title {
				overflow: hidden;
				background: #f7f7f7;
				span {
					height: 40px;
					line-height: 40px;
				}
			}
			li {
				overflow: hidden;
				span {
					height: 60px;
					line-height: 60px;
				}
				.font-blue {
					color: #00aae5;
				}
			}
			.empty {
				height: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 18px;
				color: #ff9800;
			}
		}
		.page-box {
			width: 100%;
			text-align: left;
			padding-top: 20px;
		}
	}
}

@media screen and (min-width: 1024px) and (max-width: 1440px) {
	.entity {
		min-width: 100%;
	}
	.entity .filter .search-box {
		display: inline-block;
		vertical-align: middle;
		margin-left: 0;
		margin-top: 16px;
		position: relative;
		right: -620px;
	}
	.entity .main .total {
		// width: 838px;
		border: 1px solid #ccc;
	}
}
</style>