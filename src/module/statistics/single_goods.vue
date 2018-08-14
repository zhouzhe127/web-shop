<!--
    **单品统计
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="single-goods">
		<div class="filter">
			<div class="inline-box">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" :type="0" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span class="inline-span">至</span>
			<div class="inline-box date-box">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" :type="0" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<div class="inline-box check-box select-ban">
				<i @click="timeCheck" class="check-btn fi" :class="{'fi-ok':this.openTime == 1}"></i>
				按营业时间
			</div>
			<div class="inline-box button-box">
				<span class="blue" @click="filter">筛选</span>
				<span class="gray" @click="reset">重置</span>
			</div>
		</div>
		<div class="main" v-if="!loading">
			<div class="list">
				<div class="head">
					单品统计 · 共
					<em> {{listLength}} </em>条数据
				</div>
				<div class="title" @click="tips">
					<span class="wide">商品名称</span>
					<span class="wide">条码</span>
					<span>单价</span>
					<span>销量
						<em class="fi" data-name="sales"></em>
					</span>
					<span>消费金额
						<em class="fi" data-name="amount"></em>
					</span>
					<span>消费占比</span>
					<span>实收金额
						<em class="fi" data-name="actual"></em>
					</span>
					<span>实收占比</span>
				</div>
				<ul>
					<li v-for="(item,index) in list" :key="index">
						<!--商品名称-->
						<span class="wide" :title="item.gName">
							<em>{{item.gName}}</em>
						</span>
						<!--条码-->
						<span class="wide">
							<em>{{item.barCode}}<br>{{item.secBarCode}}</em>
						</span>
						<!--单价-->
						<span>{{item.price}}</span>
						<!--销量-->
						<span>{{item.sales}}</span>
						<!--消费金额-->
						<span>{{item.consumeAmount}}</span>
						<!--消费占比-->
						<span>{{item.consumeProportion}}</span>
						<!--实收金额-->
						<span>{{item.paidIn}}</span>
						<!--实收占比-->
						<span>{{item.paidInProportion}}</span>
					</li>
					<li class="empty" v-if="!list.length">- 暂无条目 -</li>
				</ul>
			</div>
			<div class="page-box">
				<pageBtn @pageNum="pageChange" :total="pageTotal" :page="page" :isNoJump="true"></pageBtn>
			</div>
			<!--提示弹框-->
			<div class="busi-tips" :style="posiTips" v-if="tipShow">
				<em></em>{{tipsText}}</div>
		</div>
		<div class="loading" v-if="loading"><img src="../../res/images/preloader.gif" /></div>
	</div>
</template>

<script>
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import exportFile from 'src/verdor/exportFile';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';

export default {
	data() {
		return {
			startTime: new Date().setHours(0, 0, 0, 0), //开始时间
			endTime: new Date().setHours(0, 0, 0, 0), //结束时间
			page: 1, //页数
			pageShow: 10, //每页显示多少条
			pageTotal: 1, //总页数
			list: [],
			listLength: 0, //列表总条数
			openTime: 1, //是否按营业时间统计
			posiTips: '',
			helpIconDom: null,
			tipShow: false,
			tipsText: '',
			tipsContent: {
				sales:
					'商品；已销售的数量（不包含退品，包含赠品）公式：商品总数-退品数=销量',
				amount: '不计算任何优惠且不包含退品金额',
				actual: '商品原价减去商品的优惠金额（未计算整单减免）'
			},
			repeat: true, //防止重复轮询
			timerId: '', //轮询唯一id
			loading: false,
			taskId: '', //轮询id
			isBrand: '', //是否品牌
			shopId: '', //店铺id
			token: '', //
			uploadUrl: '' //上传路径域名
		};
	},
	components: {
		pageBtn: () =>
			import(/*webpackChunkName: "page_element"*/ 'src/components/page_element'),
		calendar: () =>
			import(/*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type')
	},
	created() {
		this.userData = storage.session('userShop');
		this.isBrand = this.userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌,
		this.shopId = this.userData.currentShop.id; //单店id;用于单店查询 和 品牌下多店铺查询
		this.token = this.userData.accessToken;
		this.uploadUrl = this.userData.uploadUrl;
	},
	mounted() {
		this.$store.commit('setPageTools', {
			leadOut: () => {
				this.exportData();
			}
		});
		this.getData();
	},
	destroyed() {
		Timer.clear(this.timerId);
	},
	methods: {
		startTimeChange(time) {
			//获取开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//获取结束时间
			this.endTime = time;
		},
		filter() {
			//筛选 时间搜索公用
			this.page = 1;
			this.getData();
		},
		async getData() {
			if (!this.validate()) return;
			let start = utils.format(new Date(this.startTime), 'yyMMdd');
			let end = utils.format(new Date(this.endTime), 'yyMMdd');
			let data = await http.goodssalesGetItemList({
				data: {
					startTime: start,
					endTime: end,
					page: this.page,
					num: this.pageShow,
					isOpenTime: this.openTime
				}
			});
			this.list = data.list;
			this.pageTotal = data.totalPage;
			this.listLength = data.totalCount;
		},
		async exportData() {
			if (!this.repeat) {
				//轮询未结束 防止重复轮询
				this.$store.commit('setWin', {
					title: '提示信息',
					content:
						'当前查询尚未结束，请结束后再进行查询或刷新浏览器重新查询！'
				});
				return;
			}
			let start = utils.format(new Date(this.startTime), 'yyMMdd');
			let end = utils.format(new Date(this.endTime), 'yyMMdd');
			await http
				.goodssalesExportStat({
					data: {
						startTime: start,
						endTime: end,
						isOpenTime: this.openTime,
						shopId: this.shopId
					}
				})
				.then(data => {
					this.taskId = data;
					this.repeat = false; //禁止重复轮询
					this.loading = true; //开始加载动画
					this.timerId = Timer.add(
						() => {
							//轮询请求taskId
							http
								.taskInfo({
									data: {
										taskId: this.taskId
									}
								})
								.then(data => {
									if (data.status == 3) {
										//轮询完成 获取数据
										Timer.clear(this.timerId);
										this.repeat = true;
										http
											.goodssalesGetFileUrl({
												data: {
													shopId: this.shopId,
													startTime: start,
													endTime: end,
													isOpenTime: this.openTime
												}
											})
											.then(data => {
												this.loading = false; //停止加载动画
												let exportUrl =
													this.uploadUrl + data;
												exportFile({
													url: exportUrl,
													method: 'get',
													token: this.token,
													shopId: this.shopId
												});
											});
									} else if (data.status == 2) {
										//失败
										Timer.clear(this.timerId);
										this.loading = false; //停止加载动画
										this.repeat = true; //轮询完成 可继续查询
										//失败
										this.$store.commit('setWin', {
											title: '提示信息',
											content: '请求失败，请重试！'
										});
									}
								});
						},
						1000,
						60,
						false,
						() => {
							Timer.clear(this.timerId); //轮询超时
							this.repeat = true; //可重新查询
							this.loading = false; //停止加载动画
							this.$store.commit('setWin', {
								title: '提示信息',
								content: '请求超时，请重试！'
							});
						}
					);
				});
		},
		reset() {
			//重置
			(this.startTime = new Date().setHours(0, 0, 0, 0)), //开始时间
			(this.endTime = new Date().setHours(0, 0, 0, 0)), //结束时间
			this.getData();
		},
		timeCheck() {
			this.openTime = this.openTime == 1 ? 0 : 1;
		},
		validate() {
			//日期验证
			let start = parseInt(this.startTime / 1000 / 3600 / 24),
				end = parseInt(this.endTime / 1000 / 3600 / 24);
			if (start > end) {
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '开始时间不能大于结束时间'
				});
				return false;
			}
			return true;
		},
		tips(event) {
			let target = event.target;
			if (target.className.includes('fi')) {
				if (!this.tipShow || target != this.helpIconDom) {
					let type = target.getAttribute('data-name'),
						posiTop = target.offsetTop + 25,
						posiRight = target.offsetLeft - 270;
					this.tipsText = this.tipsContent[type];
					this.posiTips = `top:${posiTop}px;left:${posiRight}px`;
					this.tipShow = true;
					this.helpIconDom = target;
					document.addEventListener('click', this.tipsClose);
				} else {
					this.tipShow = false;
					this.posiTips = '';
					document.removeEventListener('click', this.tipsClose);
				}
			}
		},
		tipsClose(event) {
			if (!event.target.className.includes('fi')) {
				this.tipShow = false;
				this.posiTips = '';
				document.removeEventListener('click', this.tipsClose);
			}
		},
		pageChange(obj) {
			//分页 获取页数
			this.page = obj.page;
			this.pageShow = obj.num;
			this.getData();
		}
	}
};
</script>

<style lang="less" scoped>
.single-goods {
	min-width: 1500px;
	.filter {
		.inline-box {
			display: inline-block;
			vertical-align: middle;
			.search-btn {
				float: left;
				height: 40px;
				width: 40px;
				cursor: pointer;
				background: url(../../res/images/search.png) #29abe2 center
					no-repeat;
			}
			input {
				width: 180px;
				height: 40px;
				padding: 0 10px;
				font-size: 14px;
				&:focus {
					outline: none;
				}
			}
		}
		.check-box {
			padding-left: 20px;
			font-size: 16px;
			.check-btn {
				text-align: center;
				line-height: 18px;
				font-size: 14px;
				height: 20px;
				width: 20px;
				border-radius: 2px;
				margin-right: 5px;
				cursor: pointer;
				display: inline-block;
				border: 1px solid #bbb;
				vertical-align: middle;
				margin-top: -3px;
			}
			.fi-ok {
				color: #fff;
				background: #29abe2;
				border: 1px solid #29abe2;
			}
		}
		.date-box {
			.calendar {
				float: left;
			}
			&:after {
				content: '';
				zoom: 1;
				clear: both;
				display: block;
			}
		}
		.button-box {
			padding-left: 20px;
			span {
				display: inline-block;
				height: 40px;
				line-height: 40px;
				width: 80px;
				color: #fff;
				text-align: center;
			}
			.blue {
				margin-right: 10px;
			}
		}
		.inline-span {
			display: inline-block;
			padding: 0 5px;
		}
	}
	.main {
		margin-top: 20px;
		padding-bottom: 50px;
		.list {
			border: 1px solid #ccc;
			border-bottom: 2px solid #ddd;
			.head {
				height: 50px;
				line-height: 50px;
				padding: 0 10px;
				font-size: 16px;
				em {
					color: #ff3c04;
					font-size: inherit;
				}
			}
			.title {
				background: #e6e6e6;
				overflow: hidden;
				span {
					float: left;
					height: 40px;
					line-height: 40px;
					text-align: center;
					width: 11%;
					font-size: 16px;
					em {
						display: inline-block;
						height: 18px;
						width: 18px;
						vertical-align: middle;
						cursor: pointer;
						margin-top: -3px;
						margin-left: 5px;
						background: url(../../res/icon/orderdetial18.png)
							no-repeat;
					}
				}
				.wide {
					width: 17%;
				}
			}
			ul {
				li {
					overflow: hidden;
					border-bottom: 2px solid #ddd;
					&:last-child {
						border-bottom: 0;
					}
					span {
						float: left;
						height: 70px;
						line-height: 70px;
						text-align: center;
						width: 11%;
						color: #555;
						padding: 0 5px;
					}
					.wide {
						width: 17%;
					}
					em {
						line-height: normal;
						display: inline-block;
						vertical-align: middle;
						text-align: left;
						max-height: 56px;
						overflow: hidden;
					}
				}
				.empty {
					line-height: 70px;
					text-align: center;
					color: #ccc;
					font-size: 20px;
				}
			}
		}
		.page-box {
			text-align: left;
			margin-top: 20px;
		}
	}
	.busi-tips {
		position: absolute;
		width: 300px;
		min-height: 40px;
		padding: 15px;
		background: #333;
		color: #fff;
		line-height: 1.5;
		font-size: 14px;
		box-shadow: 0 5px 5px #666;
		z-index: 10;
		em {
			position: absolute;
			right: 12px;
			top: -8px;
			height: 0;
			width: 0;
			border-right: 8px solid transparent;
			border-left: 8px solid transparent;
			border-bottom: 8px solid #333;
		}
	}
	.loading {
		width: 100%;
		height: 350px;
		padding-top: 100px;
		text-align: center;
	}
}
</style>