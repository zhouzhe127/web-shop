<!--
    **出货单-打印预览
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="output-print" ref="outputPrint">
		<div class="handle" v-if="">
			<span @click="printOrder">打印</span>
			<span @click="back" class="back">返回</span>
		</div>
		<div ref="printHtml" class="printHtml">
			<!--初始页-->
			<div class="print-page one-page" ref="initPage">
				<div class="page-box">第1页，共{{pageList.length+1}}页</div>
				<div class="head">
					<div class="order-num">{{orderDetail.receiptNumber}}</div>
					<div class="name">出货单</div>
					<ul>
						<li><span>出货原因：</span>{{orderDetail.cause}}</li>
						<li v-if="orderDetail.operate"><span>操作人：</span>{{orderDetail.operate.name}}</li>
						<li v-else class="three"><span>操作人：</span>{{orderDetail.createName}}</li>
					</ul>
					<ul>
						<li><span>出货仓库：</span>{{orderDetail.outWname}}</li>
						<li v-if="orderDetail.operate"><span>出货时间：</span>{{orderDetail.operate.time}}</li>
						<li v-else><span>创建时间：</span>{{timeFormat(orderDetail.createTime)}}</li>
					</ul>
					<ul>
						<li><span>入货仓库：</span>{{orderDetail.intoWname}}</li>
						<li class="tow"><span>备注：</span>{{orderDetail.remark}}</li>
					</ul>
				</div>
				<div class="main" v-if="goodsList.length">
					<div class="head">商品列表·共 {{gLength}} 条 (详细)</div>
					<div class="title-one">
						<span class="narrow">序号</span>
						<span>商品名</span>
						<span>条形码</span>
						<span>类型</span>
						<span>出货数量/重量</span>
						<span>成本总额</span>
					</div>
					<!--一级列表-->
					<div class="list-one" v-for="(item,index1) in goodsList" :key="index1">
						<div class="item-one sign-dom" :data-sign="item.domSign">
							<span class="narrow">{{item.serialNumCus}}</span>
							<span><em>{{item.itemName}}</em></span>
							<span><em>{{item.barCode}}</em></span>
							<span><em>{{item.typeNameCus}}</em></span>
							<span><em>{{item.outGoodsNumCus}}</em></span>
							<span><em>{{item.costTotal}}</em></span>
						</div>
						<!--二级列表-->
						<div class="list-two" v-if="open && item.batchInfo.length">
							<div class="title-two">
								<span class="narrow">序号</span>
								<span>批次号</span>
								<span>生产日期</span>
								<span>供应商</span>
								<span>进价</span>
								<span>所属仓库</span>
								<span>数量/重量</span>
							</div>
							<div class="item-two sign-dom" v-for="(batch,index2) in item.batchInfo" :key="index2" :data-sign="batch.domSign">
								<span class="narrow">{{batch.serialNumCus}}</span>
								<span><em>{{batch.batchCode}}</em></span>
								<span><em>{{batch.timeCus}}</em></span>
								<span><em>{{batch.supplier}}</em></span>
								<span><em>{{batch.priceAndName}}</em></span>
								<span><em>{{batch.wName}}</em></span>
								<span><em>{{batch.outGoodsNumCus}}</em></span>
							</div>
						</div>
					</div>
				</div>
				<!--物料列表-->
				<div class="main" v-if="materialList.length">
					<div class="head">物料列表·共 {{mLength}} 条 (详细)</div>
					<div class="title-one">
						<span class="narrow">序号</span>
						<span>物料名</span>
						<span>分类</span>
						<span>类型</span>
						<span>出货数量/重量</span>
						<span>成本总额</span>
					</div>
					<!--一级列表-->
					<div class="list-one material" v-for="(item,index1) in materialList" :key="index1">
						<div class="item-one sign-dom" :data-sign="item.domSign">
							<span class="narrow">{{item.serialNumCus}}</span>
							<span><em>{{item.itemName}}</em></span>
							<span><em>{{item.cateCus}}</em></span>
							<span><em>{{item.matType}}</em></span>
							<span><em>{{item.outMatNumCus}}</em></span>
							<span><em>{{item.costTotal}}</em></span>
						</div>
						<!--二级列表-->
						<div class="list-two" :class="{brand:orderDetail.isBrand}" v-if="open && item.batchInfo.length">
							<div class="title-two">
								<span class="narrow">序号</span>
								<span>批次编码</span>
								<span>生产日期</span>
								<span>供应商</span>
								<span v-if="orderDetail.isBrand">分销价</span>
								<span>进价</span>
								<span>所属仓库</span>
								<span>数量/重量</span>
							</div>
							<div class="item-two sign-dom" v-for="(batch,index2) in item.batchInfo" :key="index2" :data-sign="batch.domSign">
								<span class="narrow">{{batch.serialNumCus}}</span>
								<span>{{batch.batchCode}}</span>
								<span>{{batch.timeCus}}</span>
								<span><em>{{batch.supplier}}</em></span>
								<span v-if="orderDetail.isBrand">{{batch.distributionStr}}</span>
								<span><em>{{batch.priceAndName}}</em></span>
								<span><em>{{batch.wName}}</em></span>
								<span><em>{{batch.outMatNumCus}}</em></span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--多页打印-->
			<div class="print-page" v-for="(page,index0) in pageList" :key="index0" v-if="pageList.length" :style="{height:page.hei}">
				<div class="page-box">第{{index0+2}}页，共{{pageList.length+1}}页</div>
				<template v-for="type in page">
					<div class="main" v-if="type.goods">
						<div class="title-one">
							<span class="narrow">序号</span>
							<span>商品名</span>
							<span>条形码</span>
							<span>类型</span>
							<span>出货数量/重量</span>
							<span>成本总额</span>
						</div>
						<!--一级列表-->
						<div class="list-one" v-for="(item,index1) in type.goods" :key="index1">
							<div class="item-one sign-dom" :data-sign="item.domSign" v-if="item.serialNumCus">
								<span class="narrow">{{item.serialNumCus}}</span>
								<span><em>{{item.itemName}}</em></span>
								<span>{{item.barCode}}</span>
								<span>{{item.typeNameCus}}</span>
								<span>{{item.outGoodsNumCus}}</span>
								<span><em>{{item.costTotal}}</em></span>
							</div>
							<!--二级列表-->
							<div class="list-two" v-if="open && item.batchInfo.length">
								<div class="title-two">
									<span class="narrow">序号</span>
									<span>批次号</span>
									<span>生产日期</span>
									<span>供应商</span>
									<span>进价</span>
									<span>所属仓库</span>
									<span>数量/重量</span>
								</div>
								<div class="item-two sign-dom" 
									v-for="(batch,index2) in item.batchInfo" :key="index2" :data-sign="batch.domSign">
									<span class="narrow">{{batch.serialNumCus}}</span>
									<span>{{batch.batchCode}}</span>
									<span>{{batch.timeCus}}</span>
									<span><em>{{batch.supplier}}</em></span>
									<span><em>{{batch.priceAndName}}</em></span>
									<span><em>{{item.wName}}-{{item.aName}}</em></span>
									<span><em>{{batch.outGoodsNumCus}}</em></span>
								</div>
							</div>
						</div>
					</div>
					<div class="main" v-if="type.material">
						<div class="head" v-if="type.isTitle">物料列表·共 {{materialList.length}} 条 (详细)</div>
						<div class="title-one">
							<span class="narrow">序号</span>
							<span>物料名</span>
							<span>分类</span>
							<span>类型</span>
							<span>出货数量/重量</span>
						</div>
						<!--一级列表-->
						<div class="list-one material" v-for="(item,index1) in type.material" :key="index1">
							<div class="item-one sign-dom" :data-sign="item.domSign" v-if="item.serialNumCus">
								<span class="narrow">{{item.serialNumCus}}</span>
								<span><em>{{item.itemName}}</em></span>
								<span><em>{{item.cateCus}}</em></span>
								<span><em>{{item.matType}}</em></span>
								<span><em>{{item.outMatNumCus}}</em></span>
								<span><em>{{item.costTotal}}</em></span>
							</div>
							<!--二级列表-->
							<div class="list-two" :class="{brand:orderDetail.isBrand}" v-if="open && item.batchInfo.length">
								<div class="title-two">
									<span class="narrow">序号</span>
									<span>批次编码</span>
									<span>生产日期</span>
									<span>供应商</span>
									<span v-if="orderDetail.isBrand">分销价</span>
									<span>进价</span>
									<span>所属仓库</span>
									<span>数量/重量</span>
								</div>
								<div class="item-two sign-dom" 
									v-for="(batch,index2) in item.batchInfo" :key="index2" :data-sign="batch.domSign">
									<span class="narrow">{{batch.serialNumCus}}</span>
									<span>{{batch.batchCode}}</span>
									<span>{{batch.timeCus}}</span>
									<span><em>{{batch.supplier}}</em></span>
									<span v-if="orderDetail.isBrand">{{batch.distributionStr}}</span>
									<span><em>{{batch.priceAndName}}</em></span>
									<span><em>{{item.wName}}-{{item.aName}}</em></span>
									<span><em>{{batch.outMatNumCus}}</em></span>
								</div>
							</div>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			goodsList: [], //商品列表
			materialList: [], //物料列表
			gLength: 0, //商品列表长度
			mLength: 0, //物料列表长度
			open: true, //是否展开批次
			orderDetail: {}, //出货详情
			pageList: [], //分页后的列表
			pIndex: 0, //分页后的列表下标
			prevType: '', //上一个断点类型
			prevTypeName: '', ////上一个断点类型全名
			gEach: [],
			mEach: [],
			coverShow: true, //加载遮罩层
			opacity: 'opacity:0',
		};
	},
	props: [
		'detail', //出货详情
		'goods', //商品列表
		'material', //物料列表
		'isOpen', //是否展开批次
	],
	created(){
		this.orderDetail = utils.deepCopy(this.detail);
	},
	mounted() {
		this.setDomSign();
		this.open = this.isOpen;
	},
	methods: {
		printOrder() { //打印出货单
			//先隐藏页面内容，把要打印的页面添加到body
			let printHtml = this.$refs.printHtml; //获取要打印的内容
			let outputPrint = this.$refs.outputPrint; //获取打印容器dom
			let body = document.body;
			let app = body.querySelector('#app');
			app.style.display = 'none'; //隐藏所有内容
			body.appendChild(printHtml); //把要打印的内容移动到body
			window.print(); //调用打印-这里跟alert原理相同，会中断js执行
			app.style.display = ''; //打印弹框关闭后 显示页面内容
			outputPrint.appendChild(printHtml); //讲打印内容再移动回打印容器dom
		},
		timeFormat(time) {
			return utils.format(new Date(time * 1000), 'yyyy-MM-dd hh:mm');
		},
		back() {
			this.$emit('emit', false);
		},
		setPage() { //打印分页
			let initPage = this.$refs.initPage;
			this.$nextTick(() => {
				const limit = 936; //截取断点的高度
				let pageNum = Math.ceil(initPage.offsetHeight / limit);
				let sign = initPage.querySelectorAll('.sign-dom');
				let pageY = utils.getDOMPosition(initPage).y;
				let splicePoint = []; //切割点
				for(let i = 1; i <= pageNum; i++) {
					for(let dom of sign) {
						let offset = utils.getDOMPosition(dom).y - pageY;
						if(offset > limit * i) {
							let dataSign = dom.getAttribute('data-sign');
							splicePoint.push(dataSign);
							break;
						}
					}
				}
				this.splicePage(splicePoint);
			});
		},
		splicePage(splicePoint) { //切割数组-使其分页
			let mEnd = true; //物料列表是否在队列最后 且无断点
			for(let i = 0; i < splicePoint.length; i++) {
				let item = splicePoint[i],
					next = splicePoint[i + 1] || '';
				let type = item.split('-')[0];
				if(type == 'g') { //商品列表
					this.spliceMethod(this.gEach, this.goodsList, item, next, 'goods');
				} else if(type == 'm') { //物料列表
					mEnd = false;
					this.spliceMethod(this.mEach, this.materialList, item, next, 'material');
				}
			}
			let len = this.materialList.length;
			if(len && mEnd) {
				let item = 'm-' + len,
					next = '';
				this.spliceMethod(this.mEach, this.materialList, item, next, 'material');
			}
		},
		spliceMethod(...args) { //切割
			let [arrEach, spliceArr, item, next, type] = args;
			let arr = utils.deepCopy(arrEach);
			let isTwo = item.length > 4 ? true : false;
			let point = item.substr(2),
				nextPoint = next ? next.substr(2) : arr.length + '';
			let itemType = item.substr(0, 1),
				nextType = next ? next.substr(0, 1) : '';
			let sp0 = Number(point.split('-')[0]),
				sp1 = Number(point.split('-')[1] || 0);
			let nsp0 = Number(nextPoint.split('-')[0]),
				nsp1 = Number(nextPoint.split('-')[1] || 0);
			if(!isTwo) { //切割一级列表	
				if(spliceArr.length > sp0 + 1) spliceArr.splice(sp0);
			} else { //切割二级列表
				if(spliceArr.length > sp0) {
					spliceArr.splice(sp0 + 1);
					spliceArr[sp0].batchInfo.splice(sp1);
				}
			}
			let pLen = point.split('-').length,
				nextPlen = nextPoint.split('-').length;
			let sArr = [];

			if(pLen <= 1) { //一级列表切割
				if(itemType == 'g' && nextType == 'm') {
					sArr = arr.slice(sp0);
				} else {
					if(nextPlen <= 1) {
						sArr = arr.slice(sp0, nsp0);
					} else {
						sArr = arr.slice(sp0, nsp0 + 1);
						sArr[sArr.length - 1].batchInfo.splice(nsp1);
					}
				}
			} else { //二级列表切割
				if(itemType == 'g' && nextType == 'm') {
					sArr = arr.slice(sp0 + 1);
				} else {
					if(nextPlen <= 1) {
						sArr = arr.slice(sp0 + 1, nsp0);
					} else {
						sArr = arr.slice(sp0 + 1, nsp0 + 1);
						sArr[sArr.length - 1].batchInfo.splice(nsp1);
					}
				}
				let empty = {};
				empty.batchInfo = arr[sp0].batchInfo.slice(sp1);
				sArr.unshift(empty);
			}

			let newArr = type == 'goods' ? [{
				'goods': sArr
			}] : [{
				'material': sArr
			}];
			if(sArr.length) this.pageList.push(newArr);
			if(this.prevType == 'g' && itemType == 'm') { //补全商品列表转物料
				//isTitle是否出现物料条数
				this.pageList[this.pIndex - 1].push({
					'material': spliceArr,
					isTitle: true,
				});
			}
			//在后面执行的代码****
			this.pIndex++;
			this.prevType = itemType;
			this.prevTypeName = type;
		},
		setDomSign() { //设置dom标记，用于判断是否需要分页
			//设置商品列表
			for(let i in this.goods) { //this.goods
				let one = this.goods[i];
				one.domSign = `g-${i}`;
				for(let n in one.batchInfo) {
					let two = one.batchInfo[n];
					two.domSign = `g-${i}-${n}`;
				}
			}
			//设置物料列表
			for(let i in this.material) { //this.material
				let one = this.material[i];
				one.domSign = `m-${i}`;
				for(let n in one.batchInfo) {
					let two = one.batchInfo[n];
					two.domSign = `m-${i}-${n}`;
				}
			}
			this.goodsList = utils.deepCopy(this.goods);
			this.materialList = utils.deepCopy(this.material);
			this.gEach = utils.deepCopy(this.goods);
			this.mEach = utils.deepCopy(this.material);
			this.gLength = this.goods.length;
			this.mLength = this.material.length;

			this.setPage();
		},
	}
};
</script>
<style lang='less' scoped>
	/*a4纸的宽度按96dip计算,with:794px,height:1123px*/
	/*这里不需要讲.output-print包裹在样式表最外层，因为print-page将会被提取 移动到body 包裹了.output-print会导致没有样式*/
	.printHtml *{color: #000;font-family:Arial,Verdana,Sans-serif;}
	.print-page{width: 714px;height: 1036px;
		&.one-page{min-height: 1036px;height: auto;}
	}
	.handle{width: 100%;padding-bottom: 20px;overflow: hidden;
		span{height: 40px;line-height: 38px;width: 80px;text-align: center;cursor: pointer;
		border: 1px solid #fe8d01;color: #fe8d01; float: left;}
		.back{margin-left: 20px;border: 1px solid #28a8e0;color: #28a8e0;}
	}
	.page-box{width: 100%;padding-bottom: 10px;text-align: right;}
	.head{padding: 0 20px;
		.order-num{font-size: 24px;padding-bottom: 15px;}
		.name{font-size: 24px;font-weight: bold;padding-bottom: 10px;}
		ul{padding: 5px 0;overflow: hidden;
			li{width: 50%;position: relative;padding-left: 70px;font-size: 14px;line-height: 1.5;float: left;min-height: 19px;
				span{position: absolute;top: 0;left: 0;font-size: 14px;line-height: normal;}
				&:first-child{padding-right: 20px;}
			}
			.three{padding-left: 55px;}
			.tow{padding-left: 40px;}
		}
	}
	.main{
		border: 1px solid #333;margin-top: 10px;
		span{text-align: center;float: left;}
		.head{height: 35px;line-height: 35px;padding: 0 10px;border-bottom: 1px solid #333;}
		.title-one{overflow: hidden;border-bottom: 1px solid #333;
			span{width: 18%;height: 25px;line-height: 25px;}
			.narrow{width: 10%;}
		}
		.list-one{
			border-bottom: 1px dashed #000;
			.item-one{overflow: hidden;
				span{width: 18%;padding:10px 5px;font-size: 12px;color: #000;
					em{display: inline-block;vertical-align: middle;text-align: left;font-size: inherit;color: inherit;}
				}
				.narrow{width: 10%;}
			}
		}
		.list-one:last-child{border-bottom: 0;}
		.list-two{
			padding-left: 5%;padding-bottom: 10px;
			span{color: #333;font-size: 12px;}
			.title-two{overflow: hidden;
				span{width: 15%;height: 30px;line-height: 30px;}
				.narrow{width: 10%;}
			}
			.item-two{overflow: hidden;
				span{width: 15%;padding: 3px;
					em{display: inline-block;vertical-align: middle;text-align: left;font-size: inherit;}
				}
				.narrow{width: 10%;}
			}
			&.brand{
				span{width: 13% !important;}
				.narrow{width: 9% !important;}
			}
		}
		
	}
</style>