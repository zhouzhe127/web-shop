<!--
	**自定义商品统计（详情）
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="stat-com" style="position: relative;">
		<template v-if="!detailShow">
			<!--<section  class="backStyle" >-->
			<!--<a v-if = "showDet !== 'all'"   href="javascript:void(0)" v-on:click="returnList">返回</a>-->
			<!--</section>-->
			<!--商品总数点击-->
			<section v-if="showDet == 'goodsNum'">
				<div class="oidList">
					<ul class="oUl">
						<li style="width:20%;">订单数</li>
						<li style="width:15%">商品数</li>
						<li style="width:20%;">赠品金额</li>
						<li style="width:15%;">退品总额</li>
						<li style="width:15%;">消费总额</li>
						<li style="width:15%;">实收总额</li>
					</ul>
					<ul style="border-bottom: none;">
						<li style="width:20%;color: #FF9E11;">{{itemdetial.list.length}}</li>
						<li style="width:15%;color: #FF9E11;">{{itemdetial.goodsNum}}</li>
						<li style="width:20%;color: #FF9E11;">{{itemdetial.freeAmount}}</li>
						<li style="width:15%;color: #FF9E11;">{{itemdetial.returnAmount}}</li>
						<li style="width:15%;color: #FF9E11;">{{itemdetial.consumptionAmount}}</li>
						<li style="width:15%;color: #FF9E11;">{{itemdetial.paidAmount}}</li>
					</ul>
				</div>
				<ul class="orMaReMainList">
					<section>
						<h3>{{itemdetial.goodsName}} &gt;&gt; 商品总数 共
							<span>{{itemdetial.list.length}}</span>条记录</h3>
					</section>
					<li class="yuChairFix">
						<span style="width:15%">{{itemdetial.goodsName}}</span>
						<span style="width:15%">订单号</span>
						<span style="width:10%;">数量</span>
						<span style="width:10%;">价格</span>
						<span style="width:10%;">赠品金额</span>
						<span style="width:10%;">退品金额</span>
						<span style="width:10%;">消费金额</span>
						<span style="width:10%;">实收金额</span>
						<span style="width:10%;">员工</span>
					</li>
					<li class="yuChairFix" v-for="(item,index) in itemdetial.list" :key="index" v-if="item.itemNum*1 > 0">
						<span style="width:15%">{{item.itemName}}</span>
						<span v-on:click="openOid(item.oid)" style="width:15%;" class="pointerCol">{{item.oid}}</span>
						<span style="width:10%;">{{item.itemNum}}</span>
						<span style="width:10%;">{{item.itemPrice}}</span>
						<span style="width:10%;">{{item.freeAmount}}</span>
						<span style="width:10%;">{{item.returnAmount}}</span>
						<span style="width:10%;">{{item.consumptionAmount}}</span>
						<span style="width:10%;">{{item.itemTotal}}</span>
						<span style="width:10%;">{{item.operator}}</span>
					</li>
				</ul>
			</section>
			<!--销量总数点击-->
			<section v-if="showDet == 'salesNum'">
				<div class="oidList">
					<ul class="oUl">
						<li style="width:20%;">订单数</li>
						<li style="width:20%">销量</li>
						<li style="width:20%;">赠品金额</li>
						<li style="width:20%;">消费总额</li>
						<li style="width:20%;">实收总额</li>
					</ul>
					<ul style="border-bottom: none;">
						<li style="width:20%;color: #FF9E11;">{{itemdetial.list.length}}</li>
						<li style="width:20%;color: #FF9E11;">{{itemdetial.salesNum}}</li>
						<li style="width:20%;color: #FF9E11;">{{itemdetial.freeAmount}}</li>
						<li style="width:20%;color: #FF9E11;">{{itemdetial.consumptionAmount}}</li>
						<li style="width:20%;color: #FF9E11;">{{itemdetial.paidAmount}}</li>
					</ul>
				</div>
				<ul class="orMaReMainList">
					<section>
						<h3>{{itemdetial.goodsName}} &gt;&gt; 销量 共
							<span>{{itemdetial.list.length}}</span>条记录</h3>
					</section>
					<li class="yuChairFix">
						<span style="width:15%">{{itemdetial.goodsName}}</span>
						<span style="width:15%">订单号</span>
						<span style="width:10%;">销量</span>
						<span style="width:10%;">价格</span>
						<span style="width:10%;">赠品金额</span>
						<span style="width:15%;">消费金额</span>
						<span style="width:10%;">实收金额</span>
						<span style="width:10%;">员工</span>
					</li>
					<li class="yuChairFix" v-for="(item,index) in itemdetial.list" :key="index" v-if="item.salesNum*1 > 0">
						<span style="width:15%">{{item.itemName}}</span>
						<span v-on:click="openOid(item.oid)" style="width:15%;" class="pointerCol">{{item.oid}}</span>
						<span style="width:10%;">{{item.salesNum}}</span>
						<span style="width:10%;">{{item.itemPrice}}</span>
						<span style="width:10%;">{{item.freeAmount}}</span>
						<span style="width:15%;">{{item.consumptionAmount}}</span>
						<span style="width:10%;">{{item.itemTotal}}</span>
						<span style="width:10%;">{{item.operator}}</span>
					</li>
				</ul>
			</section>
			<!--赠品点击-->
			<section v-if="showDet == 'freeNum'">
				<div class="oidList">
					<ul class="oUl">
						<li style="width:33%;">订单数</li>
						<li style="width:33%">赠品总数</li>
						<li style="width:34%;">赠品总额</li>
					</ul>
					<ul style="border-bottom: none;">
						<li style="width:33%;color: #FF9E11;">{{itemdetial.list.length}}</li>
						<li style="width:33%;color: #FF9E11;">{{itemdetial.freeNum}}</li>
						<li style="width:34%;color: #FF9E11;">{{itemdetial.freeAmount}}</li>
					</ul>
				</div>
				<ul class="orMaReMainList">
					<section>
						<h3>{{itemdetial.goodsName}} &gt;&gt; 赠品数量 共
							<span>{{itemdetial.list.length}}</span>条记录</h3>
					</section>
					<li class="yuChairFix">
						<span style="width:20%">{{itemdetial.goodsName}}</span>
						<span style="width:20%">订单号</span>
						<span style="width:15%;">赠品数量</span>
						<span style="width:15%;">价格</span>
						<span style="width:15%;">赠品金额</span>
						<span style="width:15%;">员工</span>
					</li>
					<li class="yuChairFix" v-for="(item,index)  in itemdetial.list" :key="index" v-if="item.freeNum*1 > 0">
						<span style="width:20%">{{item.itemName}}</span>
						<span v-on:click="openOid(item.oid)" style="width:20%;" class="pointerCol">{{item.oid}}</span>
						<span style="width:15%;">{{item.freeNum}}</span>
						<span style="width:15%;">{{item.itemPrice}}</span>
						<span style="width:15%;">{{item.freeAmount}}</span>
						<span style="width:15%;">{{item.operator}}</span>
					</li>
				</ul>
			</section>
			<!--退品点击-->
			<section v-if="showDet == 'returnNum'">
				<div class="oidList">
					<ul class="oUl">
						<li style="width:33%;">订单数</li>
						<li style="width:33%">退品总数</li>
						<li style="width:34%;">退品总额</li>
					</ul>
					<ul style="border-bottom: none;">
						<li style="width:33%;color: #FF9E11;">{{itemdetial.list.length}}</li>
						<li style="width:33%;color: #FF9E11;">{{itemdetial.returnNum}}</li>
						<li style="width:34%;color: #FF9E11;">{{itemdetial.returnAmount}}</li>
					</ul>
				</div>
				<ul class="orMaReMainList">
					<section>
						<h3>{{itemdetial.goodsName}} &gt;&gt; 退品数量 共
							<span>{{itemdetial.list.length}}</span>条记录</h3>
					</section>
					<li class="yuChairFix">
						<span style="width:20%">{{itemdetial.goodsName}}</span>
						<span style="width:20%">订单号</span>
						<span style="width:20%;">退品数量</span>
						<span style="width:20%;">退品金额</span>
						<span style="width:20%;">员工</span>
					</li>
					<li class="yuChairFix" v-for="(item,index) in itemdetial.list" :key="index" v-if="item.returnNum*1 > 0">
						<span style="width:20%">{{item.itemName}}</span>
						<span v-on:click="openOid(item.oid)" style="width:20%;" class="pointerCol">{{item.oid}}</span>
						<span style="width:20%;">{{item.returnNum}}</span>
						<span style="width:20%;">{{item.returnAmount}}</span>
						<span style="width:20%;">{{item.operator}}</span>
					</li>
				</ul>
			</section>
		</template>
		<orderDetail :detail="detail" :isDelete="false" v-if="detailShow" @detailShow="getDetailShow"></orderDetail>
	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			detail: null,
			detailShow: false
		};
	},
	props: {
		userData: Object,
		showDet: '',
		itemdetial: Object
	},
	mounted() {
		let arr = [
			{
				name: '返回',
				type:4,
				className: 'info',
				fn: this.returnList
			}
		];
		this.$store.commit('setPageTools', arr);
	},
	destroyed() {
		//离开页面时 清除缓存数据
		storage.session('orderDetial', null);
		// this.$store.commit('setPageTools', []);
	},
	methods: {
		getDetailShow() {
			this.detailShow = false;
			let arr = [
				{
					name: '返回',
					className: 'huiC',
					fn: () => {
						this.returnList();
					}
				}
			];
			this.$store.commit('setPageTools', arr);
		},
		async openOid(oid) {
			let res = await http.OrderstatisticsBillDelite({
				data: {
					shopId: this.userData.currentShop.id,
					oid: oid
				}
			});
			if (res) {
				res.oidDetial = 'custom-com'; //自定义商品统计特有标记
				this.detail = res;
			}
			this.detailShow = true;
		},
		//返回按钮点击
		returnList() {
			this.$emit('throwWinResult', 'all'); //抛出一个事件给父组件
		}
	},
	components: {
		orderDetail: () =>
			import(/*webpackChunkName: "delete_detail"*/ './delete_detail')
	}
};
</script>

<style scoped>
/*#stat-com .backStyle{*/
/*width:260px;height: 40px;position: absolute;top: -50px;right: 200px;*/
/*}*/
/*#stat-com .backStyle a{*/
/*color: #FF8C01;text-align: center;font-size: 16px;width: 100px;height: 40px;line-height: 40px;border:1px solid #FF8C01;float: right;*/
/*}*/
#stat-com .oidList {
	width: 100%;
	height: auto;
	margin-bottom: 30px;
	border: 1px solid #d2d2d2;
}
#stat-com .oidList ul {
	width: 100%;
	height: 60px;
	background-color: #fff;
	border-bottom: #f7f7f7 solid 4px;
	overflow: hidden;
}
#stat-com .oidList ul li {
	width: 10%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	float: left;
	color: #42404b;
}
#stat-com .oidList ul.oUl {
	height: 40px;
	background-color: #ecedf2;
	border: none;
	width: 100%;
	overflow: hidden;
}
#stat-com .oidList ul.oUl li {
	width: 10%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	float: left;
}
/*#stat-com .act {background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;}*/
#stat-com .orMaReMainList {
	border: 1px solid #ccc;
	min-height: 400px;
	overflow: auto;
}
#stat-com .orMaReMainList section {
	width: 100%;
	height: 70px;
	line-height: 70px;
}
#stat-com .orMaReMainList section h3 {
	margin-left: 30px;
	font-size: 16px;
}
#stat-com .orMaReMainList section h3 span {
	color: #fe3d04;
	padding: 0 5px;
}
#stat-com .orMaReMainList li:first-of-type,
#stat-com .orMaReMainList li:last-of-type {
	background: #e6e6e6;
}
#stat-com .orMaReMainList li:nth-of-type(even) {
	background: #f2f2f2;
}
#stat-com .orMaReMainList li:nth-of-type(2) {
	text-align: center;
	height: 50px;
	line-height: 50px;
}
#stat-com .orMaReMainList li span {
	display: block;
	text-align: center;
	height: 50px;
	line-height: 50px;
	width: 10%;
	color: #42404b;
	float: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#stat-com .orMaReMainList li .pointerCol {
	cursor: pointer;
	color: #29a7e1;
}
</style>