<template>
	<div id="categoryCount">
		<div class="body-head">
			<div class="calendar-com">
				<calendar :pObj="startTime" @throwTime="getStartTime"></calendar>
				<span style="display:inline-block;line-height:40px;vertical-align:top;">&nbsp;至&nbsp;</span>
				<calendar :pObj="endTime" @throwTime="getEndTime"></calendar>
			</div>
			<div class="run-time">
				<span class="img" @click="openRadio=!openRadio" :class="{'sel':openRadio}"></span>
				<span class="time">按营业时间</span>
			</div>
			<div class="blue btn-common" @click="clickBtn('filter')">筛选</div>
			<div class="gray btn-common" @click="clickBtn('reset')">重置</div>
		</div>
		<div class="body-content">
			<div class="table-head">
				分类统计
				<span class="circle"></span>共
				<span class="num">{{countList.length}}</span>个条目
				<span class="extend" @click="showAllList">{{extendList ? '展开二级分类' : '收起二级分类' }}</span>
			</div>
			<div class="table-title">
				<li class="big-li">展开&nbsp;/&nbsp;收起</li>
				<li>分类名称</li>
				<li>销量
					<span class="tips" @click.stop="tabTips('sale')">
						<i class="trangle" v-if="tipsObj.sale"></i>
					</span>
					<div class="tips-content" v-if="tipsObj.sale">
						<i class="trangle"></i>
						商品;已销售的数量(不包含退品,包含赠品) 公式:商品总数 - 退品数 = 销量
					</div>
				</li>
				<li>消费金额
					<span class="tips" @click.stop="tabTips('consume')">
						<i class="trangle" v-if="tipsObj.consume"></i>
					</span>
					<div class="tips-content" v-if="tipsObj.consume">
						<i class="trangle"></i>
						不计算任何优惠且不包含退品金额
					</div>
				</li>
				<li>消费占比</li>
				<li>实收金额
					<span class="tips" @click.stop="tabTips('get')">
						<i class="trangle" v-if="tipsObj.get"></i>
					</span>
					<div class="tips-content" v-if="tipsObj.get">
						<i class="trangle"></i>
						商品原价减去商品的优惠金额(未计算整单减免)
					</div>
				</li>
				<li>实收占比</li>
			</div>
			<div class="table-row" v-for="(item,index) in nowList" :key="index">
				<div class="row-left">
					<i class="fi fi-double-angle-up fi-2x font-up" @click="toggleList(item,index)" :class="{'fi-double-angle-up':!item.slideDown,'font-up':!item.slideDown,'fi-double-angle-down':item.slideDown,'font-down':item.slideDown,}"></i>
				</div>
				<ul class="row-ul">
					<li>{{item.name}}</li>
					<li>{{item.salesNum}}</li>
					<li>{{item.sales}}</li>
					<li>{{item.salesPercent}}</li>
					<li>{{item.realSales}}</li>
					<li>{{item.realSalesPercent}}</li>
				</ul>
				<ul class="row-ul first-row" v-if="item.child && !item.slideDown" v-for="(ch,chi) in item.child" :key="index+chi">
					<li>{{ch.name}}</li>
					<li>{{ch.salesNum}}</li>
					<li>{{ch.sales}}</li>
					<li>{{ch.salesPercent}}</li>
					<li>{{ch.realSales}}</li>
					<li>{{ch.realSalesPercent}}</li>
				</ul>

			</div>
			<div class="tips-container" v-if="!loading && countList.length==0">
				暂无统计信息
			</div>
			<div class="animate-div" v-if="false">
				<div class="img-div">
					<img src="../../res/images/preloader.gif" />
					<div style="font-size:20px;color:#999;">
						数据加载中,请稍后...
					</div>
				</div>
			</div>
		</div>

		<div class="page-com" v-show="countList.length>0">
			<pageElement @pageNum="funGetPageNum" :page="pageObj.currentPage" :total="pageObj.total" :num="pageObj.num" :isNoPaging='false' :isNoJump="true"></pageElement>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			startTime: {
				show: true,
				detail: true,
				width: 160,
				time: ''
			},
			endTime: {
				show: true,
				detail: true,
				width: 160,
				time: ''
			},
			pageObj: {
				currentPage: 1,
				total: 0,
				num: 10
			},
			mapHttp: {
				count: 'GoodssalesGetCateSales' //获取零售分类统计
				// exportCount:'GoodssalesCateSalesExport',    //导出零售分类统计
			},
			tipsObj: {
				sale: false, //销量
				consume: false, //消费金额
				get: false //实收金额
			},
			countList: [
				// {
				//     id: 802,
				//     name: "斤两菜",
				//     salesNum: 6,
				//     realSales: 420,
				//     sales: 420,
				//     realSalesPercent: 0.30882352941176,
				//     salesPercent: 0.30882352941176
				// },
				// {
				//     "id": "470",
				//     "name": "八大菜系",
				//     "salesNum": 7,
				//     "realSales": 340,
				//     "sales": 340,
				//     "child": [
				//         {
				//             "id": 474,
				//             "name": "湘菜",
				//             "salesNum": "6",
				//             "realSales": 330,
				//             "realSalesPercent": 0.24264705882353,
				//             "sales": 330,
				//             "salesPercent": 0.24264705882353
				//         },
				//         {
				//             "id": 477,
				//             "name": "苏菜",
				//             "salesNum": "1",
				//             "realSales": 10,
				//             "realSalesPercent": 0.0073529411764706,
				//             "sales": 10,
				//             "salesPercent": 0.0073529411764706
				//         }
				//     ],
				//     "realSalesPercent": 0.25,
				//     "salesPercent": 0.25
				// },
				// {
				//     "id": "470",
				//     "name": "八大菜系",
				//     "salesNum": 7,
				//     "realSales": 340,
				//     "sales": 340,
				//     "child": [
				//         {
				//             "id": 474,
				//             "name": "湘菜",
				//             "salesNum": "6",
				//             "realSales": 330,
				//             "realSalesPercent": 0.24264705882353,
				//             "sales": 330,
				//             "salesPercent": 0.24264705882353
				//         },
				//         {
				//             "id": 477,
				//             "name": "苏菜",
				//             "salesNum": "1",
				//             "realSales": 10,
				//             "realSalesPercent": 0.0073529411764706,
				//             "sales": 10,
				//             "salesPercent": 0.0073529411764706
				//         }
				//     ],
				//     "realSalesPercent": 0.25,
				//     "salesPercent": 0.25
				// },
				// {
				//     "id": "470",
				//     "name": "八大菜系",
				//     "salesNum": 7,
				//     "realSales": 340,
				//     "sales": 340,
				//     "child": [
				//         {
				//             "id": 474,
				//             "name": "湘菜",
				//             "salesNum": "6",
				//             "realSales": 330,
				//             "realSalesPercent": 0.24264705882353,
				//             "sales": 330,
				//             "salesPercent": 0.24264705882353
				//         },
				//         {
				//             "id": 477,
				//             "name": "苏菜",
				//             "salesNum": "1",
				//             "realSales": 10,
				//             "realSalesPercent": 0.0073529411764706,
				//             "sales": 10,
				//             "salesPercent": 0.0073529411764706
				//         }
				//     ],
				//     "realSalesPercent": 0.25,
				//     "salesPercent": 0.25
				// }
			], //展示列表
			nowList: [], //当前展示的列表
			extendList: true, //列表的舒展
			loading: true,
			openRadio: true //是否按营业时间搜索
		};
	},
	methods: {
		initBtn() {
			this.$store.commit('setPageTools', [
				{
					name: '导出',
					className: ['export-btn'],
					fn: () => {
						let startTime = parseInt(this.startTime.time / 1000);
						let endTime = parseInt(this.endTime.time / 1000);
						let radio = this.openRadio ? '1' : '0';
						http.GoodssalesCateSalesExport({
							data: { startTime, endTime, isOpenTime: radio },
							format: 'csv'
						});
					}
				}
			]);
		},
		getStartTime(time) {
			this.startTime.time = time;
		},
		getEndTime(time) {
			this.endTime.time = time;
		},
		//------------分页----------
		funGetPageNum(obj) {
			this.pageObj.currentPage = obj.page;
			this.pageObj.num = obj.num;
			this.initPage(
				this.countList,
				this.pageObj.currentPage,
				this.pageObj.num
			);
		},
		initPage(list, page, num) {
			let [startIndex, endIndex] = [0, 0];
			this.pageObj.total = Math.ceil(list.length / num);
			startIndex = (page - 1) * num;
			endIndex = page * num;
			this.nowList = list.slice(startIndex, endIndex);
		},
		//----------event-----------
		//筛选,重置
		async clickBtn(flag) {
			this.loading = true;
			this.extendList = true;
			let [startTime, endTime, radio] = [0, 0, 0];
			this.pageObj.currentPage = 1;
			this.pageObj.num = 10;
			let countList = [];
			switch (flag) {
				case 'filter':
					break;
				case 'reset':
					this.initTime();
					this.openRadio = true;
					break;
			}
			radio = this.openRadio ? '1' : '0';
			startTime = parseInt(this.startTime.time / 1000);
			endTime = parseInt(this.endTime.time / 1000);
			countList = await this.getHttp(this.mapHttp.count, {
				startTime,
				endTime,
				isOpenTime: radio
			});
			this.loading = false;
			this.initCountList(countList, true);
		},
		//提示的显示与隐藏
		tabTips(attr) {
			document.addEventListener('click', this.domEvent, false);
			let arr = Object.keys(this.tipsObj);
			for (let i = 0, len = arr.length; i < len; i++) {
				if (attr == arr[i]) {
					this.tipsObj[attr] = !this.tipsObj[attr];
				} else {
					this.tipsObj[arr[i]] = false;
				}
			}
		},
		//展开收起
		showAllList() {
			this.extendList = !this.extendList;
			this.countList = this.countList.map(ele => {
				ele.slideDown = this.extendList;
				return ele;
			});
		},
		//切换展示子列表
		toggleList(item, index) {
			item.slideDown = !item.slideDown;
			this.countList.splice(index, 1, item);
		},

		//----------utils---------------
		initTime() {
			let date = new Date();
			let arr = [];
			arr[0] = date.getFullYear();
			arr[1] = date.getMonth();
			arr[2] = date.getDate();
			// this.startTime.time=new Date(Number(1970),Number(0),Number(1),0,0,0).getTime();
			this.startTime.time = new Date(
				Number(arr[0]),
				Number(arr[1]),
				Number(arr[2]),
				0,
				0,
				0
			).getTime();
			this.endTime.time = new Date(
				Number(arr[0]),
				Number(arr[1]),
				Number(arr[2]),
				23,
				59,
				59
			).getTime();
		},
		//请求数据
		async getHttp(url, obj = {}) {
			let res = await http[url]({ data: obj });
			return res;
		},
		initCountList(countList, flag) {
			if (Array.isArray(countList)) {
				this.countList = countList;
			}
			this.countList = this.countList.map(ele => {
				ele.slideDown = flag; //true:不展示子列表
				return ele;
			});
			this.initPage(
				this.countList,
				this.pageObj.currentPage,
				this.pageObj.num
			);
		},
		domEvent() {
			this.tabTips('no');
			document.removeEventListener('click', this.domEvent);
		}
	},
	mounted() {
		this.initBtn();
		this.initTime();
		this.clickBtn('filter');
	},
	components: {
		calendar: () =>
			import(/*webpackChunkName:"calendar_result"*/ 'src/components/calendar_result'),
		pageElement: () =>
			import(/*webpackChunkName:"page_element"*/ 'src/components/page_element')
	},
	filters: {
		toFixed(str) {
			str = Number(str) * 100;
			str = str.toFixed(2) + '%';
			return str;
		}
	}
};
</script>

<style lang="less" scoped>
#categoryCount {
	.font-color(@color,@size) {
		color: @color;
		font-size: @size;
	}

	.base(@color,@size,@height) {
		.font-color(@color,@size);
		height: @height;
		line-height: @height;
		vertical-align: middle;
	}
	.page-com {
		padding-top: 15px;
	}
	.body-head {
		margin-bottom: 20px;
		.calendar-com {
			display: inline-block;
			vertical-align: middle;
		}
		.run-time {
			width: 140px;
			height: 40px;
			display: inline-block;
			text-align: center;
			vertical-align: middle;
			padding-top: 10px;
			.img {
				width: 20px;
				height: 20px;
				border: 1px solid #28a8e0;
				border-radius: 4px;
				display: inline-block;
				vertical-align: middle;
				cursor: pointer;
			}
			.sel {
				background: url(../../res/icon/selected.png) center center
						no-repeat,
					#28a8e0;
			}
			.time {
				color: #333;
				font-size: 16px;
				vertical-align: middle;
			}
		}
		.btn-common {
			width: 100px;
			height: 40px;
			display: inline-block;
			margin-right: 10px;
			font-size: 16px;
			color: #fff;
			text-align: center;
			vertical-align: middle;
			line-height: 40px;
		}
	}
	.body-content {
		border: 1px solid #ccc;
		max-width: 1434px;
		@width: 14%;
		.table-head {
			text-indent: 20px;
			.base(#333,16px,45px);
			.circle {
				border: 2px solid #333;
				border-radius: 100%;
				display: inline-block;
				vertical-align: middle;
				margin: 0 12px;
			}
			.num {
				.font-color(#ff3c04,16px);
			}
			.extend {
				margin-left: 10px;
				text-decoration: #28a8e0 underline;
				cursor: pointer;
				.font-color(#28a8,16px);
			}
		}
		.table-title {
			background-color: #f2f2f2;
			.base(#333,16px,40px);
			min-width: 790px;
			height: 40px;
			@other-width: (98%-@width)/6;
			li {
				float: left;
				.font-color(#333, 16px);
				list-style: none;
				margin: 0;
				padding: 0;
				text-align: center;
				width: @other-width;
				.tips {
					height: 20px;
					width: 20px;
					display: inline-block;
					vertical-align: sub;
					background: url(../../res/icon/orderdetial18.png) center
							center no-repeat,
						#f2f2f2;
					position: relative;
					cursor: pointer;
					.trangle {
						position: absolute;
						border: 9px solid transparent;
						border-bottom: 13px solid #45404b;
						left: 0;
						top: 9px;
					}
				}
				.tips-content {
					background: #45404b;
					position: absolute;
					padding: 10px;
					box-shadow: 3px 2px 10px #ccc;
					width: 250px;
					.font-color(#f3f3f3, 14px);
					text-align: left;
					user-select: none;
				}
			}
			.big-li {
				width: @width;
			}
		}
		.table-row {
			border-bottom: 2px solid #f2f2f2;
			.row-left {
				height: 70px;
				width: @width;
				float: left;
				text-align: center;
				line-height: 70px;
			}
			.row-ul {
				padding: 0;
				margin: 0;
				height: 70px;
				margin-left: @width;
				width: (100%-@width);
				li {
					float: left;
					.font-color(#28a8, 14px);
					list-style: none;
					margin: 0;
					padding: 0;
					text-align: center;
					width: (100%-@width)/5.27;
					height: 70px;
					line-height: 70px;
				}
			}
			.first-row {
				li {
					color: #666 !important;
				}
			}
			.font-up {
				color: #ff9800;
				cursor: pointer;
			}
			.font-down {
				color: #707070;
				cursor: pointer;
			}
		}
		.tips-container {
			.base(#999, 16px, 70px);
			text-align: center;
		}
		.animate-div {
			text-align: center;
			.img-div {
				padding: 10px 0;
				height: auto;
				width: auto;
				display: inline-block;
				clear: both;
			}
		}
	}
}
</style>

