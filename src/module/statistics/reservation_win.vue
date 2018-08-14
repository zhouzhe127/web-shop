<!--预定统计弹窗-->
<!--黄一帆-->
<template>
	<win @winEvent="clickResult" :align="'center'" :width="650" :height="'auto'" :type="'alert'">
		<!--标题-->
		<span slot="title">预约详情</span>
		<!--内容-->
		<div slot="content" class="content">
			<div class="main-box">
				<div class="list">
					<div class="title">
						<span>序号</span>
						<span class="wide">菜品名</span>
						<span>单价</span>
						<span>商品数量</span>
						<span>口味价格</span>
						<span>小计</span>
						<span></span>
					</div>
					<ul v-if="list.length && hasGoods">
						<li v-for="(item,index) in list" :key="index">
							<span>{{index+1}}</span>
							<span class="wide text-ellipsis">{{item.goodsName}}</span>
							<span>{{item.price}}</span>
							<span>{{item.num}}</span>
							<span>{{getTastePrice(item)}}</span>
							<span>{{(item.totalPrice-0) + (getTastePrice(item)-0)}}</span>
							<span v-if="item.isReturn"><img src="../../res/icon/returnGoods.png" /></span>
							<span v-if="item.isFree"><img src="../../res/icon/freeGoods.png" /></span>
						</li>
					</ul>
					<ul v-if="plist.length && hasGoods">
						<li v-for="(item,index) in plist" :key="index">
							<span>{{list.length + index+1}}</span>
							<span class="wide text-ellipsis">{{item.packageName}}</span>
							<span>{{item.price}}</span>
							<span>{{item.num}}</span>
							<span>0</span>
							<span>{{item.price}}</span>
							<span v-if="item.isReturn"><img src="../../res/icon/returnGoods.png" /></span>
							<span v-if="item.isFree"><img src="../../res/icon/freeGoods.png" /></span>
						</li>
					</ul>
					<ul v-if="!hasGoods">
						<li class="empty">该订单没有商品信息</li>
					</ul>
				</div>
			</div>
			<div class="bottom-box">
				<span>总计：{{num}} 份</span>
				<span class="light">预付款：{{price}}</span>
			</div>
		</div>
	</win>
</template>

<script>
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			showWin: null, //是否显示弹框
			winData: '', //弹窗获取外包数据
			info: {
				goodsData: {
					goods: []
				}
			},
			list: [],
			plist: [],
			hasGoods: false,
			num: 0,
			price: 0
		};
	},
	props: [
		'detailList' //详情列表
	],
	mounted() {
		if (this.detailList) this.winData = this.detailList;
		this.initData();
	},
	methods: {
		clickResult() {
			this.$emit('emit', 'close');
		},
		initData() {
			if (
				this.winData.goodsData &&
				this.winData.goodsData.goods &&
				this.winData.goodsData.goods.length > 0
			) {
				this.list = this.changeList(
					this.winData.goodsData.goods,
					'goods'
				);
			}
			if (
				this.winData.goodsData &&
				this.winData.goodsData.package &&
				this.winData.goodsData.package.length > 0
			) {
				this.plist = this.changeList(
					this.winData.goodsData.package,
					'package'
				);
			}
			this.price = this.winData.price;
			this.getSomeData();
		},
		toFloatStr(num) {
			//保留两位小数
			let str = num + '';
			return utils.toFloatStr(str, 2);
		},
		getSomeData() {
			if (this.list.length > 0 || this.plist.length > 0) {
				this.hasGoods = true;
			}
			this.num = this.list.length + this.plist.length;
		},
		changeList(arr, type) {
			let newArr = [];
			if (arr.length == 0) {
				return newArr;
			}
			for (let i = 0; i < arr.length; i++) {
				let gprice = 0;
				let oinfo = arr[i];
				oinfo.num -= 0;
				if (arr[i].returnNum || arr[i].freeNum) {
					gprice = arr[i].unitPrice;
				} else {
					let gtp = 0;
					if (arr[i].goodsName) {
						if (arr[i].type != 1) {
							gtp = this.getTastePrice(arr[i]);
						}
					} else {
						gtp = 0;
					}
					gprice = (arr[i].price - gtp) / (arr[i].num - 0);
					gprice = this.toFloatStr(gprice.toString());
				}
				arr[i].returnNum -= 0;
				if (arr[i].returnNum && arr[i].returnNum != 0) {
					//若是存在退菜
					let obj = {};
					obj.num = arr[i].returnNum;
					oinfo.num -= arr[i].returnNum;
					obj.price = gprice;
					obj.totalPrice = (obj.num - 0) * (obj.price - 0);
					obj.type = arr[i].type;
					if (type == 'goods') {
						if (arr[i].attr) {
							obj.attr = arr[i].attr;
						}
						obj.goodsName = arr[i].goodsName;
					} else if (type == 'package') {
						obj.packageName = arr[i].packageName;
					}
					obj.isReturn = true;
					newArr.push(obj);
				}
				arr[i].freeNum -= 0;
				if (arr[i].freeNum && arr[i].freeNum != 0) {
					let obj = {};
					obj.num = arr[i].freeNum;
					oinfo.num -= arr[i].freeNum;
					obj.price = gprice;
					obj.totalPrice = (obj.num - 0) * (obj.price - 0);
					obj.type = arr[i].type;
					if (type == 'goods') {
						if (arr[i].attr) {
							obj.attr = arr[i].attr;
						}
						obj.goodsName = arr[i].goodsName;
					} else if (type == 'package') {
						obj.packageName = arr[i].packageName;
					}
					obj.isFree = true;
					newArr.push(obj);
				}
				if (oinfo.num > 0) {
					oinfo.price = gprice;
					oinfo.totalPrice = (oinfo.num - 0) * (gprice - 0);
					newArr.push(oinfo);
				}
			}
			return newArr;
		},
		getTastePrice: function(goods) {
			if (goods.attr && goods.attr.length == 0) {
				return 0;
			}
			let arr = goods.attr;
			let attrPrice = 0;
			// let TotalPrice = 0;
			for (let i = 0; i < arr.length; i++) {
				for (let j = 0; j < arr[i].name.length; j++) {
					if (goods.type == 1) {
						//斤两菜
						attrPrice += arr[i].name[j].split(':')[1] - 0;
					} else {
						attrPrice +=
							(arr[i].name[j].split(':')[1] - 0) *
							(goods.num - 0);
					}
				}
			}
			attrPrice = this.toFloatStr(attrPrice.toString());
			return attrPrice;
		}
	},
	components: {
		win: () => import(/*webpackChunkName:"win"*/ 'src/components/win')
	}
};
</script>

<style lang="less" scoped>
.main-box {
	padding: 20px;
	.text-ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.list {
		height: 300px;
		overflow: auto;
		span {
			float: left;
			width: 13.33%;
			height: 38px;
			line-height: 38px;
			text-align: center;
		}
		.wide {
			width: 20%;
		}
		.title {
			overflow: hidden;
			border: 1px solid #666;
		}
		ul {
			margin-top: 0;
			li {
				overflow: hidden;
				border: 1px solid #666;
				border-top: 0;
			}
			.empty {
				height: 40px;
				line-height: 40px;
				color: #f39801;
				text-align: center;
			}
		}
	}
}
.bottom-box {
	width: 100%;
	overflow: hidden;
	background: #e6e6e6;
	span {
		float: left;
		width: 50%;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.light {
		color: #f39801;
	}
}
</style>