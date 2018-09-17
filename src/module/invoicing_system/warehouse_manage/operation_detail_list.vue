<!--
    **调度管理-详情
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="detail-list">
		<ul class="chooseBtn">
			<el-radio-group v-model="selectType">
			    <el-radio-button label="0">商品</el-radio-button>
			    <el-radio-button label="1">物料</el-radio-button>
			</el-radio-group>
		</ul>
		<div class="table" v-if="selectType==0">
			<div class="table-head">商品信息<span class="circle"></span>共<em>{{goodsDetails.length}}</em>个条目
				<span class="detail-toggle select-ban" @click="openInfo">{{showCom == false?"详细":"简洁"}}</span>
			</div>
			<div class="scroll-box">
				<div class="table-title" :class="{enter:detailType==2}">
					<li>序号</li>
					<li>商品名</li>
					<template v-if="detailType==1">
						<li>条形码</li>
						<li>商品类型</li>
						<li>出货数量/重量</li>
						<li>成本总额</li>
					</template>
					<template v-if="detailType==2">
						<li>出货数量</li>
						<li>入货数量</li>
						<li>耗损数量</li>
						<li>成本总额</li>
						<li>入货仓库</li>
					</template>
				</div>
				<div class="table-body">
					<div class="table-item" v-for="(item,i) in goodsDetails" :key="i">
						<div class="one-item" :class="{enter:detailType==2}">
							<li>{{item.serialNumCus}}</li>
							<li>{{item.itemName}}</li>
							<template v-if="detailType==1">
								<li>{{item.barCode}}</li>
								<li>{{item.typeNameCus}}</li>
								<li>{{item.outGoodsNumCus}}</li>
								<li>{{item.costTotal}}</li>
							</template>
							<template v-if="detailType==2">
								<li>{{item.num}}</li>
								<li>{{item.intoNum}}</li>
								<li>{{item.consumeNum}}</li>
								<li>{{item.costTotal}}</li>
								<li>{{item.wName}}-{{item.aName}}</li>
							</template>
						</div>
						<div class="small-table" v-if="showCom">
							<div class="small-head">
								<span>序号</span>
								<span>批次号</span>
								<span>生产日期</span>
								<span>供应商</span>
								<span>进价</span>
								<template v-if="detailType==1">
									<span>所属仓库</span>
									<span>数量/重量</span>
								</template>
								<template v-if="detailType==2">
									<span>入货数量</span>
									<span>耗损数量</span>
								</template>
							</div>
							<div class="small-body"  v-for="(con,index) in item.batchInfo" :key="index">
								<span>{{con.serialNumCus}}</span>
								<span>{{con.batchCode}}</span>
								<span>{{con.timeCus}}</span>
								<span>{{con.supplier}}</span>
								<span>{{con.priceAndName}}</span>
								<template v-if="detailType==1">
									<span>{{con.wName}}-{{con.aName}}</span>
									<span>{{con.outGoodsNumCus}}</span>
								</template>
								<template v-if="detailType==2">
									<span>{{con.intoNumDetail}}</span>
									<span>{{con.consumeNumDetail}}</span>
								</template>
							</div>
						</div>
					</div>
					<div class="empty" v-if="!goodsDetails.length">- 暂无条目 -</div>
				</div>
			</div>
		</div>
		<div class="table" v-if="selectType==1">
			<div class="table-head">物料列表<span class="circle"></span>共<em>{{materialDetails.length}}</em>个条目
				<span class="detail-toggle select-ban" @click="openInfo">{{showCom == false?"详细":"简洁"}}</span>
			</div>
			<div class="scroll-box">
				<div class="table-title" :class="{enter:detailType==2}">
					<li>序号</li>
					<li>物料名</li>
					<template v-if="detailType==1">
						<li>分类</li>
						<li>类型</li>
						<li>出货数量/重量</li>
						<li>成本总额</li>
					</template>
					<template v-if="detailType==2">
						<li>出货数量</li>
						<li>入货数量</li>
						<li>耗损数量</li>
						<li>成本总额</li>
						<li>入货仓库</li>
					</template>
				</div>
				<div class="table-body">
					<div class="table-item" v-for="(item,i) in materialDetails" :key="i">
						<div class="one-item" :class="{enter:detailType==2}">
							<li>{{item.serialNumCus}}</li>
							<li>{{item.itemName}}</li>
							<template v-if="detailType==1">
								<li>{{item.cateCus}}</li>
								<li>{{item.matType}}</li>
								<li>{{item.outMatNumCus}}</li>
								<li>{{item.costTotal}}</li>
							</template>
							<template v-if="detailType==2">
								<li>{{item.num}}</li>
								<li>{{item.intoNum}}</li>
								<li>{{item.consumeNum}}</li>
								<li>{{item.costTotal}}</li>
								<li>{{item.wName}}-{{item.aName}}</li>
							</template>
						</div>
						<div class="small-table" :class="{brand:isBrand && detailType==1}" v-if="showCom">
							<div class="small-head">
								<span>序号</span>
								<span>批次编码</span>
								<span>生产日期</span>
								<span>供应商</span>
								<span>进价</span>
								<span v-if="isBrand && detailType==1">分销价</span>
								<template v-if="detailType==1">
									<span>所属仓库</span>
									<span>数量/重量</span>
								</template>
								<template v-if="detailType==2">
									<span>入货数量</span>
									<span>耗损数量</span>
								</template>
							</div>
							<div class="small-body" v-for="(con,index) in item.batchInfo" :key="index">
								<span>{{con.serialNumCus}}</span>
								<span>{{con.batchCode}}</span>
								<span>{{con.timeCus}}</span>
								<span>{{con.supplier}}</span>
								<span>{{con.priceAndName}}</span>
								<span v-if="isBrand && detailType==1">{{con.distributionStr}}</span>
								<template v-if="detailType==1">
									<span>{{con.wName}}-{{con.aName}}</span>
									<span>{{con.outMatNumCus}}</span>
								</template>
								<template v-if="detailType==2">
									<span>{{con.intoNumDetail}}</span>
									<span>{{con.consumeNumDetail}}</span>
								</template>
							</div>
						</div>
					</div>
					<div class="empty" v-if="!materialDetails.length">- 暂无条目 -</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			selectType: 0, //0商品  1物料
			showCom: false, //是否展示详细内容
			goodsDetails: [], //商品详情
			materialDetails: [], //物料详情
			emitObj: {}, //传给父组件的数据
			detailType: 1, //详情类型 1出货单 2入货单
			listDetail: {},
			isBrand:0,//0单店 1品牌
		};
	},
	props: ['detail', 'detailInto', 'type','tabIndex'],
	watch: {
		'type': 'initData',
		'detail': 'initData',
		'detailInto': 'initData',
	},
	mounted() {
		let userData = storage.session('userShop');
		this.isBrand = userData.currentShop.ischain == '3' ? 1 : 0; //是否为品牌
		this.initData();
	},
	methods: {
		initData() {
			this.detailType = this.type;
			if(this.detailType == 1) {
				if(this.detail.goods) this.goodsDetails = this.detail.goods;
				if(this.detail.material) this.materialDetails = this.detail.material;
			} else if(this.detailType == 2) {
				if(this.detailInto.goods) this.goodsDetails = this.detailInto.goods;
				if(this.detailInto.material) this.materialDetails = this.detailInto.material;
			}
			if(this.tabIndex){
				this.selectType = this.tabIndex-1;
			}else{
				if(!this.goodsDetails.length && this.materialDetails.length){
					this.selectType = 1;
				}else{
					this.selectType = 0;
				}
			}
		},
		openInfo() {
			this.showCom = !this.showCom;
			this.emitObj.showCom = this.showCom;
			this.$emit('emit', this.emitObj);
		},
		selectTab(num) {
			this.selectType = num;
			this.emitObj.selectType = num;
			this.$emit('emit', this.emitObj);
		},

	},
};
</script>
<style lang='less' scoped>
.detail-list{
	.color-size {color: #333;font-size: 16px;}
	.chooseBtn {
		padding-top: 10px;overflow: hidden;
		li {
			width: 100px;height: 35px;line-height: 35px;text-align: center;color: #333;float: left;background: #f2f2f2;margin-right: 10px;
			border-radius: 5px;cursor: pointer;
		}
		.select {
			background: #29a7e1;color: #fff;
		}
	}
	.table {
		border: 1px solid #dcdfe6;width: 100%;margin-top: 10px;
		.scroll-box{overflow: auto;}
		.table-head {padding-left: 20px;height: 46px;line-height: 46px;
			em{color: #fe8d01;display: inline-block;padding: 0 3px;}
			.color-size;.detail-toggle {
				color: #E1BB4A;margin-left: 20px;font-size: 16px;text-decoration: underline;cursor: pointer;
			}
			.circle {
				display: inline-block;width: 4px;height: 4px;border: 1px solid #333;border-radius: 50%;margin: 0 15px;
				background-color: #333;vertical-align: middle;margin-top: -4px;
			}
		}
		.table-li {
			float: left;list-style: none;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
		}
		.table-title {min-width: 1200px;
			height: 40px;background-color: #f2f2f2;line-height: 40px;overflow: hidden;
			li {
				height: 40px;.table-li;.color-size;width: 18%;
				&:first-child{width: 10%;}
			}
		}
		.enter{
			li{width: 15%;
				&:first-child{width: 10%;}
			}
		}
		.table-body {min-width: 1200px;
			.table-item{border-bottom: 1px solid #dcdfe6;
				&:last-child{border-bottom: 0;}
			}
			.empty{height: 70px;line-height: 70px;width: 100%;text-align: center;color: #999;font-size: 20px;}
			.one-item{overflow: hidden;
				li {
					.table-li;height: 70px;line-height: 70px;color: #666;font-size: 14px;width: 18%;
					&:first-child{width: 10%;}
				}
			}
			.enter{
				li{width: 15%;
					&:first-child{width: 10%;}
				}
			}
			.small-table {padding-bottom: 10px;
				.small-head,
				.small-body {
					overflow: hidden;height: 30px;padding-left:5%;
					span {
						color: #999;font-size: 16px;float: left;height: 30px;line-height: 30px;
						width: 15%;text-align: center;
						&:first-child {width: 10%;}
					}
				}
				.small-body span {
					font-size: 14px;height: 30px;line-height: 30px;
				}
				&.brand{
					.small-head,.small-body{
						span{width: 13% !important;
							&:first-child {width: 9% !important;}
						}
					}
				}
			}
		}
	}
}
</style>
