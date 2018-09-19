<template>
	<div class="warehouse-lists">
		<div class="heander">
			<div class="title">
				<i></i>
				<h3>库存详情</h3>
				<div class="dian" v-for="i in 70" :key="i"></div>
			</div>
			<div class="innerBox">
				<ul>
					<li><span>商品名：</span><span>{{goodsDetail.gName}}</span></li>
					<li><span>条形码：</span><span>{{goodsDetail.barCode}}</span></li>
					<li><span>品牌：</span><span>{{getString(goodsDetail.brandName)||"无"}}</span></li>
					<li><span>序号：</span><span>{{goodsTitle.numerical}}</span></li>
				</ul>
				<ul>
					<li><span>分类：</span><span>{{getString(goodsDetail.cate,"name")}}</span></li>
					<li><span>单位：</span><span>{{goodsDetail.unit}}</span></li>
					<li><span>规格：</span><span>{{goodsDetail.specifications}}</span></li>
					<li><span>批次数：</span><span>{{goodsDetail.batchNum}}</span></li>
				</ul>
				<ul>
					<li><span>保质期：</span><span>{{goodsDetail.validity}}{{dateType[goodsDetail.validityType]}}</span></li>
					<li>
						<span>库存数量/重量：</span>
						<span>{{goodsDetail.surplus}}{{goodsDetail.unit}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="main">
			<!--table组件-->
			<tableCom :listName="'调度记录'" :introData="selList" :titleData="titleList" :listWidth="1000" :allTotal="totalPage">
				<div slot="con-0" slot-scope="props">{{props.index}}</div>
				<div slot="con-2" slot-scope="props">{{getTime(props.data.productionTime)}}</div>
				<div slot="con-4" slot-scope="props">{{props.data.surplus}}{{goodsDetail.unit}}</div>
				<div slot="con-5" slot-scope="props">{{props.data.purchasePrice}}{{goodsDetail.unit}}</div>
				<div slot="con-6" slot-scope="props">{{props.data.wName}}
					<template v-if="props.data.wName && props.data.aName">-</template>{{props.data.aName}}</div>
			</tableCom>
			<div class="page-box">
				<page-btn @pageNum="pageChange" :isNoJump="false" :isNoPaging='true' :total="pageTotal" :page="page"></page-btn>
			</div>
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
			page: 1,
			showNum: 10,
			pageTotal: 1,
			typeList: ['全部类型', '普通商品', '称重商品'],
			allGoods: '全部类型',
			allList: '',
			selList: '',
			gid: '',
			goodsDetail: '',
			goodsTitle: '',
			dateType: ['月', '日', '年'],
			// table组件涉及的对象
			titleList: [
				{titleName:'序号'},
				{titleName:'批次编码',dataName:'batchCode'},
				{titleName:'生产日期'},
				{titleName:'供应商',dataName:'supplier'},
				{titleName:'数量/重量'},
				{titleName:'进价'},
				{titleName:'所属仓库'},
			],
			totalPage: 0,
		};
	},
	components: {
		pageBtn: () =>
			import( /*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		tableCom: () =>
			import( /*webpackChunckName: 'com_table'*/ 'src/components/com_table'),
	},
	mounted() {
		if(storage.session('goodsneed')) {
			this.goodsTitle = storage.session('goodsneed');
		}
		this.$store.commit('setPageTools', [{
			name: '返回',
			className: ['back'],
			fn: () => {
				storage.session('warehouseDetailDestroy', true);
				window.history.go(-1);
			}
		}]);
		this.init();
		this.getDetail();
	},
	methods: {
		async init() {
			//获取详情列表
			let obj = {
				gid: this.goodsTitle.id,
				wid: this.goodsTitle.wid || ''
			};
			if(this.goodsTitle.shopId) Object.assign(obj,{shopId:this.goodsTitle.shopId});
			let {list} = await http.getGoodsBatch({
				data: obj
			});
			this.allList = list;
			this.totalPage = this.allList.length;
			this.pageTotal = Math.ceil(list.length / this.showNum);
			this.selList = this.allList.slice(
				(this.page - 1) * 10,
				(this.page - 1) * 10 + 10
			);
		},
		async getDetail() {
			//获取详情
			let data = await http.getDetails({
				data: {
					gid: this.goodsTitle.id,
					shopIds: this.goodsTitle.shopId || '',
					wid: this.goodsTitle.wid || ''
				}
			});
			this.goodsDetail = data;
		},
		pageChange(page) {
			this.page = page.page;
			this.selList = this.allList.slice(
				(this.page - 1) * 10,
				(this.page - 1) * 10 + 10
			);
		},
		getTime(time) {
			return utils.format(parseInt(time) * 1000, 'yyyy年MM月dd日');
		},
		addCount(num) {
			num += '';
			//清除字符串开头的0
			if(/^0+/.test(num)) num = num.replace(/^0+/, '');
			//为整数字符串在末尾添加.000
			if(!/\./.test(num)) num += '.000';
			//字符以.开头时,在开头添加0
			if(/^\./.test(num)) num = '0' + num;
			num += '000'; //在字符串末尾补零
			num = num.match(/([+-]?)\d+\.\d{3}/)[0];
			return num;
		},
		getString(arr, key) {
			if(typeof(arr) == 'string' || !arr) {
				return arr;
			} else if(key) {
				let res = [];
				for(let item of arr) {
					res.push(item[key]);
				}
				return res.join(',');
			} else if(!key) {
				return arr.join(',');
			}
		}
	},
	destroyed(){
		sessionStorage.removeItem('goodsneed');
	}
};
</script>

<style lang='less' scoped>
	.warehouse-lists {
		// min-width: 1300px;
		.heander {
			margin-bottom: 20px;
			.title {
				width: 98%;
				height: 40px;
				margin: 10px;
				line-height: 40px;
				position: relative;
				overflow: hidden;
				i {
					width: 2px;
					height: 28px;
					position: absolute;
					top: 6px;
					left: 0;
					background-color: #28a8e0;
				}
				h3 {
					width: 70px;
					height: 40px;
					margin-left: 10px;
					float: left;
					font-size: 16px;
					font-family: '微软雅黑';
				}
			}
			.innerBox {
				padding-left: 50px;
				ul {
					display: inline-block;
					width: 32%;
					vertical-align: top;
					li {
						margin-bottom: 20px;
						span {
							display: inline-block;
							max-width: 70%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 16px;
						}
					}
				}
			}
			.dian {
				width: 10px;
				height: 1px;
				border-top: 1px solid #e1e1e1;
				margin: 20px 5px;
				float: left;
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
						width: 15%;
					}
					.narrow {
						width: 10%;
					}
				}
				ul li {
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
						width: 15%;
						color: #555;
					}
					.narrow {
						width: 10%;
					}
					.handle {
						em {
							display: inline-block;
							padding: 0 20px;
							height: 18px;
							line-height: normal;
							cursor: pointer;
							&:hover {
								text-decoration: underline;
							}
						}
						.edit {
							color: #ff8d00;
							border-right: 1px solid #ddd;
						}
						.detail {
							color: #27a8e0;
						}
					}
				}
				.empty {
					height: 70px;
					text-align: center;
					line-height: 70px;
					color: #999;
					font-size: 20px;
				}
			}
			.page-box {
				margin-top: 10px;
				float: left;
			}
		}
	}
</style>