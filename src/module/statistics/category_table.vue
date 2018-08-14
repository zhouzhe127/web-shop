<template>
	<div id="table_style">
		<!--全部分类总览-->
		<div class='allView' :style="{overflow:(halleatShow||takeoutShow)?'auto':'hidden'}">

			<section v-if="allTypeShow" class="totle1 titleAll" v-cloak>
				<ul class="oUl allUL">
					<li>天数</li>
					<li>销量总数</li>
					<li v-on:click="openDetial(1,$event)" class="detLi">
						{{orderAll[1].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[1].status" class="detDiv1" style="right: 32px;">
							<i class="detI"></i>
							<h3 class="detH3">日期内所有订单中的整单减免优惠券、整单强减优惠券及整单减免的金额总计</h3>
						</div>
					</li>
					<li>口味总额</li>
					<li v-on:click="openDetial(3,$event)" class="detLi">{{orderAll[3].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[3].status" class="detDiv1" style="right: 18px;">
							<i class="detI"></i>
							<h3 class="detH3">所有商品的原价减去商品优惠总额的商品实收金额（未计算整单减免），计入外卖的实收总额</h3>
						</div>
					</li>
				</ul>
				<!--取出总计数组里面的数据-->
				<ul class="oUl allULTwo">
					<li>{{total.day ? total.day : 0}}</li>
					<li>{{total.sumNum ? total.sumNum : 0}}</li>
					<li>{{total.minusPrice ? total.minusPrice : 0}}</li>
					<li>{{total.attrPrice ? total.attrPrice : 0}}</li>
					<li>{{total.price ? parseFloat(total.price).toFixed(2) : 0}}</li>
				</ul>
				<ul class="oUl allThree">
					<li v-on:click="openDetial(4,$event)" class="detLi">
						{{orderAll[4].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[4].status" class="detDiv1" style="right: 32px;">
							<i class="detI"></i>
							<h3 class="detH3">消费总额的金额不计算任何优惠且不计入退品金额</h3>
						</div>
					</li>
					<li>赠品数量</li>
					<li>整单减免占比</li>
					<li>口味总额占比</li>
					<li>商品实收总额占比</li>
				</ul>
				<!--取出总计数组里面的数据-->
				<ul class="oUl allThrou">
					<li>{{total.sumMoney ? parseFloat(total.sumMoney).toFixed(2) : 0}}</li>
					<li>{{total.freeNum ? total.freeNum : 0}}</li>
					<li>{{total.minusProportion ? total.minusProportion : 0}}</li>
					<li>{{total.attrProportion ? total.attrProportion : 0}}</li>
					<li>{{total.priceProportion ? total.priceProportion : 0}}</li>
				</ul>
			</section>
			<!--堂吃分类总览-->
			<section v-if="halleatShow" class="totle2 titleAll" :style="{minWidth:'1000px'}" v-cloak>
				<ul class="oUl allUL">
					<li>天数</li>
					<li>销量总数</li>
					<li>赠品总额</li>
					<li v-on:click="openDetial(1,$event)" class="detLi">{{orderAll[1].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[1].status" class="detDiv1">
							<i class="detI"></i>
							<h3 class="detH3">检索日期内所有订单中的整单减免优惠券、整单强减优惠券及整单减免的金额总计</h3>
						</div>
					</li>
					<li>口味总额</li>
					<li v-on:click="openDetial(2,$event)" class="detLi">
						{{orderAll[2].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[2].status" class="detDiv1" style="right: -30px;">
							<i class="detI"></i>
							<h3 class="detH3">订单中针对商品进行的优惠总额（不包括整单减免）</h3>
						</div>
					</li>
					<li v-on:click="openDetial(3,$event)" class="detLi">
						{{orderAll[3].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[3].status" class="detDiv1" style="right: -30px;">
							<i class="detI"></i>
							<h3 class="detH3">所有商品的商品原价减去商品优惠总额后的商品实收总额（未计算整单减免）</h3>
						</div>
					</li>
				</ul>
				<!--取出总计数组里面的数据-->
				<ul class="oUl allULTwo">
					<li>{{total.day ? total.day : 0}}</li>
					<li>{{total.sumNum ? total.sumNum : 0}}</li>
					<li>{{total.freePrice ? total.freePrice : 0}}</li>
					<li>{{total.minusPrice ? total.minusPrice : 0}}</li>
					<li>{{total.attrPrice ? total.attrPrice : 0}}</li>
					<li>{{total.discountPrice ? total.discountPrice : 0}}</li>
					<li style="width:16%;">{{total.price ? parseFloat(total.price).toFixed(2) : 0}}</li>
				</ul>
				<ul class="oUl allThree">
					<li v-on:click="openDetial(4,$event)" class="detLi">
						{{orderAll[4].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[4].status" class="detDiv1">
							<i class="detI"></i>
							<h3 class="detH3">消费总额的金额不计算任何优惠且不计入退品金额</h3>
						</div>
					</li>
					<li>赠品数量</li>
					<li>赠品总额占比</li>
					<li>整单减免占比</li>
					<li>口味总额占比</li>
					<li>商品优惠总额占比</li>
					<li style="width:16%;">商品实收总额占比</li>
				</ul>
				<!--取出总计数组里面的数据-->
				<ul class="oUl allThrou">
					<li>{{total.sumMoney ? parseFloat(total.sumMoney).toFixed(2) : 0}}</li>
					<li>{{total.freeNum ? total.freeNum : 0}}</li>
					<li>{{total.freeProportion ? total.freeProportion : 0}}</li>
					<li>{{total.minusProportion ? total.minusProportion : 0}}</li>
					<li>{{total.attrProportion ? total.attrProportion : 0}}</li>
					<li>{{total.discountProportion ? total.discountProportion : 0}}</li>
					<li style="width:16%;">{{total.priceProportion ? total.priceProportion : 0}}</li>
				</ul>
			</section>
			<!--外卖分类总览-->
			<section v-if="takeoutShow" class="totle3 titleAll" :style="{minWidth:'1200px'}" v-cloak>
				<ul class="oUl allUL">
					<li>天数</li>
					<li>销量总数</li>
					<li v-on:click="openDetial(4,$event)" class="detLi">
						{{orderAll[4].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[4].status" class="detDiv1" style="right: -40px;">
							<i class="detI"></i>
							<h3 class="detH3">消费总额的金额不计算任何优惠</h3>
						</div>
					</li>
					<li>餐盒费</li>
					<li>餐盒费占比</li>
					<li>配送费</li>
					<li>配送费占比</li>
					<li v-on:click="openDetial(3,$event)" class="detLi">
						{{orderAll[3].name}}
						<div class="detImg1"></div>
						<div v-if="orderAll[3].status" class="detDiv1" style="right: -56px;">
							<i class="detI"></i>
							<h3 class="detH3">外卖消费金额减去优惠金额再减去配送费所得</h3>
						</div>
					</li>
					<li>商品实收总额占比</li>
				</ul>
				<!--取出总计数组里面的数据-->
				<ul class="oUl allULTwo">
					<li>{{total.day ? total.day : 0}}</li>
					<li>{{total.sumNum ? total.sumNum : 0}}</li>
					<li>{{total.sumMoney ? parseFloat(total.sumMoney).toFixed(2) : 0}}</li>
					<li>{{total.mealsFree ? total.mealsFree : 0}}</li>
					<li>{{total.mealsProportion ? total.mealsProportion : 0}}</li>
					<li>{{total.distributionFree ? total.distributionFree : 0}}</li>
					<li>{{total.distributionProportion ? total.distributionProportion : 0}}</li>
					<li>{{total.price ? parseFloat(total.price).toFixed(2) : 0}}</li>
					<li>{{total.priceProportion ? total.priceProportion : 0}}</li>
				</ul>
			</section>
		</div>
		<!--收起展开-->
		<section class="showOpen">
			<span class="detLi">
				二级分类
				<a v-if="showTwo" @click="openTwo" href="javascript:void(0);">展开</a>
				<a v-else @click="openTwo" href="javascript:void(0);">收起</a>
			</span>
			<span class="detLi">
				商品
				<a v-if="showGoods" @click="openGoods" href="javascript:void(0);">展开</a>
				<a v-else @click="openGoods" href="javascript:void(0);">收起</a>
			</span>
		</section>

		<div class='con_view'>

			<!--全部-->
			<section v-if="allTypeShow" class="statContent">
				<!--分类一级分类-->
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;">
					<li class="chairFix" style="background: #f7f7f7;">
						<s style="cursor: pointer;color: #28A8E0;" v-on:click="allSelectedOne">
							<a href="javascript:void(0);" class="allSelect">全选</a>
						</s>
						<s>展开/收起</s>
						<s>分类名称</s>
						<s v-on:click="openDetial(5,$event)" class="detLi" style="white-space: normal;overflow: inherit;">
							{{orderAll[5].name}}
							<div class="detImg1"></div>
							<div v-if="orderAll[5].status" class="detDiv1" style="right: 28px;">
								<i class="detI" style="right: 16%;border-color: #F7F7F7#F7F7F7#45404b #F7F7F7"></i>
								<h3 class="detH3">该分类中已销售的数量（不包含退品数但包含赠品）公式：商品总数-退品数=销量</h3>
							</div>
						</s>
						<s>消费金额</s>
						<s>消费金额总占比</s>
						<s>口味金额</s>
						<s>口味金额占比</s>
					</li>
				</ul>
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;max-height: 800px;overflow-y: auto;">
					<li v-if="paginationList.length == 0" style="width: 100%;background-color: #F2F2F2;color: #F8931F;">暂时没有商品</li>
					<li v-for="(item,index) in paginationList" :key="index+'cate'" style="background-color: rgba(255, 255, 255, 0.73);display: table;width: 100%;border-bottom: 1px solid #ccc;" class="chairFix">
						<s style="cursor: pointer;" v-on:click="ocSelOne(item)">
							<div class="circle" v-bind:class="{ 'active': item.selected}"></div>
						</s>
						<s v-on:click="getDetailsTwo(index,item)" v-if="item.child.length==0 && item.goods.length ==0" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x" style="color:#ccc"></i>
						</s>
						<s v-on:click="getDetailsTwo(index,item)" v-if="item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-up fi-2x" style="color:#ff9800"></i>
						</s>
						<s v-on:click="getDetailsTwo(index,item)" v-if="!item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x"></i>
						</s>
						<s style="cursor: pointer;" v-bind:title="item.categoryName">{{item.categoryName}}</s>
						<s>{{item.num ? item.num : 0}}</s>
						<s>{{item.totalPrice ? item.totalPrice : 0}}</s>
						<s>{{item.totalProportion ? item.totalProportion : 0}}</s>
						<s>{{item.attrPrice ? item.attrPrice　: 0}}</s>
						<s>{{item.attrProportion　? item.attrProportion : 0}}</s>
						<!--分类二级分类-->
						<ul v-show="item.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
							<li v-for="(goods,index1) in item.goods" :key="index1+'goods'" class="chairFix goods-style">
								<s></s>
								<s></s>
								<s style="color: #28A8E0;" v-bind:title="goods.goodsName">{{goods.goodsName}}</s>
								<s style="color: #28A8E0;">{{goods.num ? goods.num : 0}}</s>
								<s style="color: #28A8E0;">{{goods.totalPrice ? goods.totalPrice : 0}}</s>
								<s style="color: #28A8E0;">{{goods.totalProportion ? goods.totalProportion : 0}}</s>
								<s style="color: #28A8E0;">{{goods.attrPrice ? goods.attrPrice　: 0}}</s>
								<s style="color: #28A8E0;">{{goods.attrProportion　? goods.attrProportion : 0}}</s>
							</li>
							<li v-for="(itemTwo,index2) in item.child" :key="index2+'child'" style="background-color: #F0F0F0;display: table;width: 100%;" class="chairFix">
								<s style="cursor: pointer;" v-on:click="ocSelTwo(index2,itemTwo,item)">
									<div style="margin-left: 5%;" class="circle" v-bind:class="{ 'active': itemTwo.selected}"></div>
								</s>
								<s v-on:click="getDetailsTwo(index2,itemTwo)" v-if="itemTwo.goods.length == 0 || itemTwo.goods == undefined" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x" style="color:#ccc"></i>
								</s>
								<s v-on:click="getDetailsTwo(index2,itemTwo)" v-if="itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-up fi-2x" style="color:#ff9800"></i>
								</s>
								<s v-on:click="getDetailsTwo(index2,itemTwo)" v-if="!itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x"></i>
								</s>
								<s style="cursor: pointer;" v-bind:title="itemTwo.categoryName">{{itemTwo.categoryName}}</s>
								<s>{{itemTwo.num ? itemTwo.num : 0}}</s>
								<s>{{itemTwo.totalPrice ? itemTwo.totalPrice : 0}}</s>
								<s>{{itemTwo.totalProportion ? itemTwo.totalProportion : 0}}</s>
								<s>{{itemTwo.attrPrice ? itemTwo.attrPrice　: 0}}</s>
								<s>{{itemTwo.attrProportion　? itemTwo.attrProportion : 0}}</s>
								<!--二级分类菜品-->
								<ul v-show="itemTwo.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
									<li v-for="(itemThree,index3) in itemTwo.goods" :key="index3+'childgoods'" style="background-color: #fff; display: table;width: 100%;" class="chairFix goods-style">
										<s></s>
										<s></s>
										<s style="color: #28A8E0;" v-bind:title="itemThree.goodsName">{{itemThree.goodsName}}</s>
										<s style="color: #28A8E0;">{{itemThree.num ? itemThree.num : 0}}</s>
										<s style="color: #28A8E0;">{{itemThree.totalPrice ? itemThree.totalPrice : 0}}</s>
										<s style="color: #28A8E0;">{{itemThree.totalProportion ? itemThree.totalProportion : 0}}</s>
										<s style="color: #28A8E0;">{{itemThree.attrPrice ? itemThree.attrPrice　: 0}}</s>
										<s style="color: #28A8E0;">{{itemThree.attrProportion　? itemThree.attrProportion : 0}}</s>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<!--堂吃的二级分类-->
			<section v-if="halleatShow" class="statContent">
				<!--分类一级分类-->
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;">
					<li class="chairFix" style="background: #f7f7f7;">
						<span style="cursor: pointer;color: #28A8E0;" v-on:click="allSelectedOne">
							<a href="javascript:void(0);" class="allSelect">全选</a>
						</span>
						<span>展开/收起</span>
						<span>分类名称</span>
						<span v-on:click="openDetial(5,$event)" class="detLi" style="white-space: normal;overflow: inherit;">{{orderAll[5].name}}
							<div class="detImg1"></div>
							<div v-if="orderAll[5].status" class="detDiv1" style="right: -35px;">
								<i class="detI" style="right: 16%;border-color: #F7F7F7#F7F7F7#45404b #F7F7F7"></i>
								<h3 class="detH3">该分类中已销售的数量(不包含退品数但包含赠品)公式：商品总数-退品数=销量</h3>
							</div>
						</span>
						<span>消费金额</span>
						<span>消费金额总占比</span>
						<span>赠品数量</span>
						<span>赠品金额</span>
						<span>赠品金额占比</span>
						<span>口味金额</span>
						<span>口味金额占比</span>
						<span>商品优惠金额</span>
						<span>商品优惠金额占比</span>
						<span>商品实收金额</span>
						<span v-on:click="openDetial(6,$event)" class="detLi" style="white-space: normal;overflow: inherit;">{{orderAll[6].name}}
							<div class="detImg1"></div>
							<div v-if="orderAll[6].status" class="detDiv1" style="height: 110px;right: -56px;">
								<i class="detI" style="right: 25%;border-color: #F7F7F7#F7F7F7#45404b #F7F7F7"></i>
								<h3 class="detH3">该分类的商品实收金额在检索日期内相对于商品实收总额的占比（此处的占比针对的是商品实收总额而非营业额）</h3>
							</div>
						</span>
					</li>
				</ul>
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;max-height: 800px;overflow-y: auto;">
					<li v-if="paginationList.length == 0" style="width: 100%;background-color: #F2F2F2;color: #F8931F;">暂时没有商品</li>
					<li v-for="(item,index) in paginationList" :key="index+'cate'" style="background-color: rgba(255, 255, 255, 0.73);display: table;width: 100%;border-bottom: 1px solid #ccc;" class="chairFix">
						<span style="cursor: pointer;" v-on:click="ocSelOne(item)">
							<div class="circle" v-bind:class="{ 'active': item.selected}"></div>
						</span>
						<span v-on:click="getDetailsTwo(index,item)" v-if="item.child.length==0 && item.goods.length ==0" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x" style="color:#ccc"></i>
						</span>
						<span v-on:click="getDetailsTwo(index,item)" v-if="item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-up fi-2x" style="color:#ff9800"></i>
						</span>
						<span v-on:click="getDetailsTwo(index,item)" v-if="!item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x"></i>
						</span>
						<span style="cursor: pointer;" v-bind:title="item.categoryName">{{item.categoryName}}</span>
						<span>{{item.num ? item.num : 0}}</span>
						<span>{{item.totalPrice ? item.totalPrice : 0}}</span>
						<span>{{item.totalProportion ? item.totalProportion : 0}}</span>
						<span>{{item.freeNum ? item.freeNum : 0}}</span>
						<span>{{item.freePrice ? item.freePrice : 0}}</span>
						<span>{{item.freeProportion ? item.freeProportion : 0}}</span>
						<span>{{item.attrPrice ? item.attrPrice　: 0}}</span>
						<span>{{item.attrProportion　? item.attrProportion : 0}}</span>
						<span>{{item.discountPrice ? item.discountPrice : 0}}</span>
						<span>{{item.discountProportion ? item.discountProportion : 0}}</span>
						<span>{{item.price ? parseFloat(item.price).toFixed(2) : 0}}</span>
						<span>{{item.priceProportion ? item.priceProportion : 0}}</span>
						<!--分类二级分类-->
						<ul v-show="item.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
							<li v-for="(goods,index) in item.goods" :key="index+'goods'" class="chairFix goods-style">
								<span></span>
								<span></span>
								<span style="color: #28A8E0;" v-bind:title="goods.goodsName">{{goods.goodsName}}</span>
								<span style="color: #28A8E0;">{{goods.num ? goods.num : 0}}</span>
								<span style="color: #28A8E0;">{{goods.totalPrice ? goods.totalPrice : 0}}</span>
								<span style="color: #28A8E0;">{{goods.totalProportion ? goods.totalProportion : 0}}</span>
								<span style="color: #28A8E0;">{{goods.freeNum ? goods.freeNum : 0}}</span>
								<span style="color: #28A8E0;">{{goods.freePrice ? goods.freePrice : 0}}</span>
								<span style="color: #28A8E0;">{{goods.freeProportion ? goods.freeProportion : 0}}</span>
								<span style="color: #28A8E0;">{{goods.attrPrice ? goods.attrPrice　: 0}}</span>
								<span style="color: #28A8E0;">{{goods.attrProportion　? goods.attrProportion : 0}}</span>
								<span style="color: #28A8E0;">{{goods.discountPrice ? goods.discountPrice : 0}}</span>
								<span style="color: #28A8E0;">{{goods.discountProportion ? goods.discountProportion : 0}}</span>
								<span style="color: #28A8E0;">{{goods.price ? goods.price : 0}}</span>
								<span style="color: #28A8E0;">{{goods.priceProportion ? goods.priceProportion : 0}}</span>
							</li>
							<li v-for="(itemTwo,index) in item.child" :key="index+'child'" style="background-color: #F0F0F0;display: table;width: 100%;" class="chairFix">
								<span style="cursor: pointer;" v-on:click="ocSelTwo(index,itemTwo,item)">
									<div style="margin-left: 5%;" class="circle" v-bind:class="{ 'active': itemTwo.selected}"></div>
								</span>
								<span v-on:click="getDetailsTwo(index,itemTwo)" v-if="itemTwo.goods.length == 0 || itemTwo.goods == undefined" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x" style="color:#ccc"></i>
								</span>
								<span v-on:click="getDetailsTwo(index,itemTwo)" v-if="itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-up fi-2x" style="color:#ff9800"></i>
								</span>
								<span v-on:click="getDetailsTwo(index,itemTwo)" v-if="!itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x"></i>
								</span>
								<span style="cursor: pointer;" v-bind:title="itemTwo.categoryName">{{itemTwo.categoryName}}</span>
								<span>{{itemTwo.num ? itemTwo.num : 0}}</span>
								<span>{{itemTwo.totalPrice ? itemTwo.totalPrice : 0}}</span>
								<span>{{itemTwo.totalProportion ? itemTwo.totalProportion : 0}}</span>
								<span>{{itemTwo.freeNum ? itemTwo.freeNum : 0}}</span>
								<span>{{itemTwo.freePrice ? itemTwo.freePrice : 0}}</span>
								<span>{{itemTwo.freeProportion ? itemTwo.freeProportion : 0}}</span>
								<span>{{itemTwo.attrPrice ? itemTwo.attrPrice　: 0}}</span>
								<span>{{itemTwo.attrProportion　? itemTwo.attrProportion : 0}}</span>
								<span>{{itemTwo.discountPrice ? itemTwo.discountPrice : 0}}</span>
								<span>{{itemTwo.discountProportion ? itemTwo.discountProportion : 0}}</span>
								<span>{{itemTwo.price ? itemTwo.price : 0}}</span>
								<span>{{itemTwo.priceProportion ? itemTwo.priceProportion : 0}}</span>
								<!--二级分类菜品-->
								<ul v-show="itemTwo.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
									<li v-for="(itemThree,i) in itemTwo.goods" :key="i+'childgoods'" style="background-color: #fff; display: table;width: 100%;" class="chairFix goods-style">
										<span></span>
										<span></span>
										<span style="color: #28A8E0;" v-bind:title="itemThree.goodsName">{{itemThree.goodsName}}</span>
										<span style="color: #28A8E0;">{{itemThree.num ? itemThree.num : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.totalPrice ? itemThree.totalPrice : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.totalProportion ? itemThree.totalProportion : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.freeNum ? itemThree.freeNum : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.freePrice ? itemThree.freePrice : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.freeProportion ? itemThree.freeProportion : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.attrPrice ? itemThree.attrPrice　: 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.attrProportion　? itemThree.attrProportion : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.discountPrice ? itemThree.discountPrice : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.discountProportion ? itemThree.discountProportion : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.price ? itemThree.price : 0}}</span>
										<span style="color: #28A8E0;">{{itemThree.priceProportion ? itemThree.priceProportion : 0}}</span>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<!--外卖的二级分类-->
			<section v-if="takeoutShow" class="statContent">
				<!--分类一级分类-->
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;">
					<li class="chairFix" style="background: #f7f7f7;">
						<em style="cursor: pointer;color: #28A8E0;" v-on:click="allSelectedOne">
							<a href="javascript:void(0);" class="allSelect">全选</a>
						</em>
						<em>展开/收起</em>
						<em>分类名称</em>
						<em v-on:click="openDetial(5,$event)" class="detLi" style="white-space: normal;overflow: inherit;">{{orderAll[5].name}}
							<div class="detImg1"></div>
							<div v-if="orderAll[5].status" class="detDiv1" style="right: 70px;">
								<i class="detI" style="right: 16%;border-color: #F7F7F7#F7F7F7#45404b #F7F7F7"></i>
								<h3 class="detH3">该分类中已销售的数量（不包含赠品）公式：商品总数-赠品数=销量</h3>
							</div>
						</em>
						<em>消费金额</em>
						<em>消费金额总占比</em>
					</li>
				</ul>
				<ul class="orMaReMainList" style="border: 1px solid #ccc;border-bottom: none;max-height: 800px;overflow-y: auto;">
					<li v-if="paginationList.length == 0" style="width: 100%;background-color: #F2F2F2;color: #F8931F;">暂时没有商品</li>
					<li v-for="(item,index) in paginationList" :key="index+'cate'" style="background-color: rgba(255, 255, 255, 0.73);display: table;width: 100%;border-bottom: 1px solid #ccc;" class="chairFix">
						<em style="cursor: pointer;" v-on:click="ocSelOne(item)">
							<div class="circle" v-bind:class="{ 'active': item.selected}"></div>
						</em>
						<em v-on:click="getDetailsTwo(index,item)" v-if="item.child.length==0 && item.goods.length ==0" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x" style="color:#ccc"></i>
						</em>
						<em v-on:click="getDetailsTwo(index,item)" v-if="item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-up fi-2x" style="color:#ff9800"></i>
						</em>
						<em v-on:click="getDetailsTwo(index,item)" v-if="!item.click && (item.child.length > 0 || item.goods.length >0)" style="cursor: pointer;">
							<i class="fi fi-double-angle-down fi-2x"></i>
						</em>
						<em style="cursor: pointer;" v-bind:title="item.categoryName">{{item.categoryName}}</em>
						<em>{{item.num ? item.num : 0}}</em>
						<em>{{item.totalPrice ? item.totalPrice : 0}}</em>
						<em>{{item.totalProportion ? item.totalProportion : 0}}</em>
						<!--分类二级分类-->
						<ul v-show="item.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
							<li v-for="(goods,index) in item.goods" :key="index+'categoods'" class="chairFix goods-style">
								<em></em>
								<em></em>
								<em style="color: #28A8E0;" v-bind:title="goods.goodsName">{{goods.goodsName}}</em>
								<em style="color: #28A8E0;">{{goods.num ? goods.num : 0}}</em>
								<em style="color: #28A8E0;">{{goods.totalPrice ? goods.totalPrice : 0}}</em>
								<em style="color: #28A8E0;">{{goods.totalProportion ? goods.totalProportion : 0}}</em>
							</li>
							<li v-for="(itemTwo,index) in item.child" :key="index+'child'" style="background-color: #F0F0F0;display: table;width: 100%;" class="chairFix">
								<em style="cursor: pointer;" v-on:click="ocSelTwo(index,itemTwo,item)">
									<div style="margin-left: 5%;" class="circle" v-bind:class="{ 'active': itemTwo.selected}"></div>
								</em>
								<em v-on:click="getDetailsTwo(index,itemTwo)" v-if="itemTwo.goods.length == 0 || itemTwo.goods == undefined" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x" style="color:#ccc"></i>
								</em>
								<em v-on:click="getDetailsTwo(index,itemTwo)" v-if="itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-up fi-2x" style="color:#ff9800"></i>
								</em>
								<em v-on:click="getDetailsTwo(index,itemTwo)" v-if="!itemTwo.click && itemTwo.goods.length > 0" style="cursor: pointer;">
									<i class="fi fi-angle-down fi-2x"></i>
								</em>
								<em style="cursor: pointer;" v-bind:title="itemTwo.categoryName">{{itemTwo.categoryName}}</em>
								<em>{{itemTwo.num ? itemTwo.num : 0}}</em>
								<em>{{itemTwo.totalPrice ? itemTwo.totalPrice : 0}}</em>
								<em>{{itemTwo.totalProportion ? itemTwo.totalProportion : 0}}</em>
								<!--二级分类菜品-->
								<ul v-show="itemTwo.click" transition='slidUpDown' class="orMaReMainList" style="width:100%;">
									<li v-for="(itemThree,i) in itemTwo.goods" :key="i+'goods'" style="background-color: #fff; display: table;width: 100%;" class="chairFix goods-style">
										<em></em>
										<em></em>
										<em style="color: #28A8E0;" v-bind:title="itemThree.goodsName">{{itemThree.goodsName}}</em>
										<em style="color: #28A8E0;">{{itemThree.num ? itemThree.num : 0}}</em>
										<em style="color: #28A8E0;">{{itemThree.totalPrice ? itemThree.totalPrice : 0}}</em>
										<em style="color: #28A8E0;">{{itemThree.totalProportion ? itemThree.totalProportion : 0}}</em>
									</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</section>

		</div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			showTwo: true, //二级分类展开
			showGoods: true, //商品展开
			moreSettle: [] //分类选中的容器
		};
	},
	props: {
		halleatShow: null, //堂吃
		takeoutShow: null, //外卖
		allTypeShow: null, //全部
		orderAll: Array,
		paginationList: Array, //页面展示的数据
		classification: Array, //全部分类统计列表
		total: Object
	},
	methods: {
		// 一级分类选中
		ocSelOne(data) {
			data.selected = !data.selected;
			if (data.selected) {
				for (let i = 0; i < data.child.length; i++) {
					data.child[i].selected = true;
					if (data.child[i].selected) {
						data.selected = true;
					}
				}
			} else {
				for (let i = 0; i < data.child.length; i++) {
					data.child[i].selected = false;
				}
			}
		},
		// 二级分类选中
		ocSelTwo(index, data, oneData) {
			data.selected = !data.selected;
			// let index = 0;
			// for (let i = 0; i < oneData.child.length; i++) {
			// 	if (oneData.child[i].selected) {
			// 		index++;
			// 	}
			// }
			if (data.selected) {
				oneData.selected = true;
			}
		},
		//打开一级菜单
		getDetailsOne(index, item) {
			let click = item.click;
			item.click = !click;
		},
		//打开二级菜单
		getDetailsTwo(index, item) {
			let click = item.click;
			item.click = !click;
		},
		//展开所有二级分类
		openTwo() {
			this.showTwo = !this.showTwo;
			for (let i = 0; i < this.classification.length; i++) {
				this.showTwo
					? (this.classification[i].click = false)
					: (this.classification[i].click = true);
				//二级分类下的菜品不展开
				for (let j = 0; j < this.classification[i].child.length; j++) {
					if (this.classification[i].child[j].length != 0) {
						this.classification[i].child[j].click = false;
						this.showGoods = true;
					}
				}
			}
		},
		//展开所有商品
		openGoods() {
			for (let i = 0; i < this.classification.length; i++) {
				if (!this.showGoods) {
					this.classification[i].click = false;
					this.showTwo = true;
				} else {
					this.classification[i].click = true;
					this.showTwo = false;
				}
				for (let j = 0; j < this.classification[i].child.length; j++) {
					if (
						!this.classification[i].child[j].click &&
						this.classification[i].click
					) {
						this.classification[i].child[j].click = !this
							.classification[i].child[j].click;
					}
				}
			}
			this.showGoods = !this.showGoods;
		},
		// 分类全部选中
		allSelectedOne() {
			if (this.moreSettle.length < this.classification.length) {
				for (let i = 0; i < this.classification.length; i++) {
					this.classification[i].selected = true;
					for (
						let j = 0;
						j < this.classification[i].child.length;
						j++
					) {
						this.classification[i].child[j].selected = true;
					}
				}
				this.moreSettle = this.classification;
			} else {
				for (let i = 0; i < this.classification.length; i++) {
					this.classification[i].selected = false;
					for (
						let j = 0;
						j < this.classification[i].child.length;
						j++
					) {
						this.classification[i].child[j].selected = false;
					}
				}
				this.moreSettle = [];
			}
		},
		//点击说明详情
		openDetial(index, e) {
			e.stopPropagation();
			for (let i = 0; i < this.orderAll.length; i++) {
				if (i != index) {
					this.orderAll[i].status = false;
				}
			}
			this.orderAll[index].status = !this.orderAll[index].status;
		}
	}
};
</script>

<style lang="less" scoped>
#table_style {
	position: relative;
	.chairFix:after {
		content: '';
		display: block;
		clear: both;
	}
	//表格总计
	.totle1 .oUl {
		width: 100%;
		height: 50px;
	}
	.totle1 .oUl li {
		width: 20%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	.totle2 .oUl {
		width: 100%;
		height: 50px;
	}
	.totle2 .oUl li {
		width: 14%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	.totle3 .oUl {
		width: 100%;
		height: 50px;
	}
	.totle3 .oUl li {
		width: 11.111111%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	.titleAll {
		border: 1px solid #d2d2d2;
		.allUL {
			background-color: #f7f7f7;
		}
		.allULTwo {
			color: #f8941f;
			overflow: hidden;
			width: 100%;
		}
		.allThree {
			background-color: #f7f7f7;
		}
		.allThrou {
			color: #f8941f;
			overflow: hidden;
			width: 100%;
			margin-bottom: 20px;
		}
	}
	//收起展开
	.showOpen {
		height: 50px;
		line-height: 50px;
		span {
			margin-right: 80px;
			font-size: 18px;
			a {
				color: #ff9800;
				margin-left: 18px;
				font-size: 18px;
				height: 40px;
				border-bottom: 1px solid #ff9800;
			}
		}
	}
	.con_view {
		width: 100%;
		overflow: auto;
		//表单内容
		.statContent {
			min-width: 1300px;

			.allSelect {
				color: #28a8e0;
				font-size: 14px;
				width: 30px;
				height: 35px;
				margin: 0 auto;
				border-bottom: 1px solid #28a8e0;
				padding-bottom: 10px;
			}
		}
	}

	.orMaReMainList li span {
		display: block;
		text-align: center;
		height: 50px;
		line-height: 50px;
		width: 7%;
		color: #43414a;
		float: left;
		position: relative;
		overflow: hidden;
		// vertical-align: middle;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orMaReMainList li span:nth-child(1) {
		width: 4%;
	}
	.orMaReMainList li span:nth-child(2) {
		width: 5%;
	}
	.orMaReMainList li span:nth-child(3) {
		width: 6%;
	}
	.orMaReMainList li span:nth-child(4) {
		width: 5%;
	}
	.orMaReMainList li span:nth-child(5) {
		width: 5%;
	}
	.orMaReMainList li span:nth-child(6) {
		width: 8%;
	}
	.orMaReMainList li span:nth-child(7) {
		width: 6%;
	}
	.orMaReMainList li span:nth-child(8) {
		width: 6%;
	}
	.orMaReMainList li span:nth-child(13) {
		width: 9%;
	}
	.orMaReMainList li span:nth-child(15) {
		width: 11%;
	}
	.orMaReMainList li em {
		font-style: none;
		display: block;
		text-align: center;
		height: 50px;
		width: 18%;
		line-height: 50px;
		color: #43414a;
		float: left;
		position: relative;
		overflow: hidden;
		// vertical-align: middle;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orMaReMainList li em:nth-child(1) {
		width: 15%;
	}
	.orMaReMainList li em:nth-child(2) {
		width: 15%;
	}
	.orMaReMainList li em:nth-child(3) {
		width: 15%;
	}
	.orMaReMainList li s {
		text-decoration: none;
		display: block;
		text-align: center;
		height: 50px;
		width: 12.5%;
		line-height: 50px;
		color: #43414a;
		float: left;
		position: relative;
		overflow: hidden;
		// vertical-align: middle;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.orMaReMainList li span a {
		color: #fff;
		font-size: 12px;
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #ccc;
		display: block;
	}
	.orMaReMainList li:nth-of-type(1) {
		text-align: center;
		height: 50px;
		line-height: 50px;
	}
	.circle {
		width: 26px;
		height: 26px;
		border: 1px #c7c7c7 solid;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -13px;
		margin-top: -13px;
		background: #fff;
	}
	.active {
		background: url(../../res/icon/selected.png) center center no-repeat,
			#28a8e0;
	}
	.detLi {
		position: relative;
		cursor: pointer;
	}
	/*.detLi .detImg1{vertical-align: sub;}*/
	.detLi .detImg1 {
		display: inline-block;
		background: url(../../res/icon/orderdetial18.png) no-repeat;
		height: 18px;
		width: 18px;
		vertical-align: middle;
		cursor: pointer;
		margin-top: -3px;
	}
	.detLi .detDiv1 {
		display: inline-block;
		width: 300px;
		background: #45404b;
		position: absolute;
		top: 45px;
		right: -15px;
		padding: 10px;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 10;
	}
	.detLi .detDiv1 .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: -10px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
	}
	.detLi .detDiv1 .detH3 {
		line-height: 30px;
		color: #e6e6e7;
		text-align: center;
	}
	.orMaReMainList .goods-style span {
		background: #f7f7f7;
	}
}
</style>