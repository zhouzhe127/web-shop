/**
 * @Author: zhengu.jiang 
 * @Date: 2018-08-13 10:48:36 
 * @Last Modified by: zhengu.jiang
 * @Last Modified time: 2018-08-13 11:42:07
 * @Module: 分类报表---表格数据
 */
<template>
	<div id="report_category">
		<section>
			<section>
				<div class="formType light">
					<span class="typeTotal" v-bind:class="{'typeOn': chartList.flag == index}" v-for="(item, index) in chartList.list" :key="index" @click="changeChart(index)">{{item.name}}</span>
				</div>
				<div class="mbot">
					<span class="sel" v-for="(item, index) in dataList.list" :key="index" v-bind:class="{'on': dataList.buttonTop == index}" @click="showDataChoose(index)">{{item.name}}</span>
				</div>
			</section>
			<!--图表-->
			<categorycharts v-if="industry!=1&&chartList.flag=== 1" :formData="classification" :changeCharts="changeCharts" :shopList="shopList" :buttonFlag="dataList.flag" :headList="headList" :shopName="shopName" :flag="buttonList.flag" :chooseShopList="chooseShopList">
			</categorycharts>
			<!--数据-->
			<section v-show="chartList.flag=== 0">
				<section class="nav">
					<span @click="allNum" :style="{'font-weight': selShopForm.id == '-1' ? 600 : 400}" :class="{'selected': selShopForm.id == '-1'}" class="totalName">合计</span>
					<elShopList :shopIds="selShopForm.id==-1?[]:selShopForm.id.split(',')" :isSingle="true" :delShopId="chooseShopList" @chooseShop="formShop"></elShopList>
				</section>
				<section style="line-height: 28px;margin-bottom: 10px;">
					<span style="font-size: 18px;">分类总览</span>
				</section>
				<section style="text-align: center;">
					<section class="chairFix" style="margin-bottom: 50px;">
						<section class="main clearfix" :class="{'max': (chartWidth*1+600*1)>1350}" style="height: auto;position: relative;margin-bottom: 10px;max-width:100%">
							<!--门店合计------------------------------------------------------------------------------->
							<div class="aLeft" :style="{'width': (headList.length*100+300*1  - 59) + 'px'}">
								<section class="orMaRetreatMain">
									<ul class="titleTop titleTopColor"></ul>
									<ul class="titleTop" style="background: rgb(255, 255, 255)">门店合计</ul>
									<ul class="orMaReMainList listLeft rightTotal">
										<li :style="{'width': (headList.length*100+300*1-60) + 'px'}" class="chairFix" style="background: #f7f7f7;">
											<!-- <span style="cursor: pointer;color: #28A8E0;" @click="allSelectedOne">
													<a href="javascript:void(0);" style="color: #28A8E0;font-size: 14px;width: 30px;height: 35px;margin: 0 auto;border-bottom: 1px solid #28A8E0;padding-bottom: 10px;">全选</a>
												</span> -->
											<span class="width70">展开/收起</span>
											<span class="width70">分类名称</span>
											<span class="width70">编码</span>
											<span v-for="(item, index) in headList" :key="index">{{item.name}}</span>
										</li>
									</ul>
									<ul class="orMaReMainList listLeft rightTotal">
										<li v-for="(item,key,oneIndex) in formList" :key="oneIndex" class="chairFix" style="background-color: rgb(255, 255, 255);display: table;border-bottom: 1px solid #ccc;">
											<span @click="getDetailsOne(key,item)" v-if="item.click" class="point width70">
												<i class="fi fi-double-angle-up fi-2x" style="color:#ff9800"></i>
											</span>
											<span @click="getDetailsOne(key,item)" v-if="!item.click" class="point width70">
												<i class="fi fi-double-angle-down fi-2x"></i>
											</span>
											<span class="point width70" :title="item.t">{{item.t}}</span>
											<span class="point width70" :title="item.t">{{item.x!=''?item.x:"--"}}</span>
											<template v-if="dataList.flag == 0">
												<span :title='item.c.toFixed(2)'>{{item.c.toFixed(2)}}</span>
												<span v-if="industry != 1" :title='item.e.toFixed(2)'>{{item.e.toFixed(2)}}</span>
												<span :title='item.l.toFixed(2)'>{{item.l.toFixed(2)}}</span>
												<span :title='item.d.toFixed(2)'>{{item.d.toFixed(2)}}</span>
											</template>
											<template v-if="dataList.flag == 1">
												<span :title='item.f.toFixed(2)'>{{item.f.toFixed(2)}}</span>
												<span :title='item.g.toFixed(2)'>{{item.g.toFixed(2)}}</span>
												<span :title='item.j.toFixed(2)'>{{item.j.toFixed(2)}}</span>
												<span :title='item.k.toFixed(2)'>{{item.k.toFixed(2)}}</span>
											</template>
											<template v-if="dataList.flag == 2">
												<span :title='item.h.toFixed(2)'>{{item.h.toFixed(2)}}</span>
												<span :title='item.i.toFixed(2)'>{{item.i.toFixed(2)}}</span>
												<span :title='item.l.toFixed(2)'>{{item.l.toFixed(2)}}</span>
											</template>
											<ul v-if="item.loading" class="orMaReMainList" style="background-color:rgb(240, 240, 240)">
												<span class="point width70" style="background-color:rgb(240, 240, 240)"></span>
												<span class="point width70" style="background-color:rgb(240, 240, 240)"></span>
												<span v-for="(item,index) in headList" :key="index" style="background-color:rgb(240, 240, 240)"></span>
												<div id="Loading">
													<div class="loader-inner ball-beat">
														<div></div>
														<div></div>
														<div></div>
													</div>
												</div>
											</ul>
											<ul v-if="item.click && !item.loading" class="orMaReMainList">
												<li v-for="(goods, goodsKey, index) in item.r" :key="index+'+'" class="chairFix goods-style numcolor">
													<!-- <span></span> -->
													<span class="width70"></span>
													<span class="width70" v-bind:title="goods.w">{{goods.w}}</span>
													<span class="width70" v-bind:title="goods.x">{{goods.x!=''?goods.x:"--"}}</span>
													<template v-if="dataList.flag == 0">
														<span :title='goods.c.toFixed(2)'>{{goods.c.toFixed(2)}}</span>
														<span v-if="industry != 1" :title='goods.e.toFixed(2)'>{{goods.e.toFixed(2)}}</span>
														<span :title='goods.l.toFixed(2)'>{{goods.l.toFixed(2)}}</span>
														<span :title='goods.d.toFixed(2)'>{{goods.d.toFixed(2)}}</span>
													</template>
													<template v-if="dataList.flag == 1">
														<span :title='goods.f.toFixed(2)'>{{goods.f.toFixed(2)}}</span>
														<span :title='goods.g.toFixed(2)'>{{goods.g.toFixed(2)}}</span>
														<span :title='goods.j.toFixed(2)'>{{goods.j.toFixed(2)}}</span>
														<span :title='goods.k.toFixed(2)'>{{goods.k.toFixed(2)}}</span>
													</template>
													<template v-if="dataList.flag == 2">
														<span :title='goods.h.toFixed(2)'>{{goods.h.toFixed(2)}}</span>
														<span :title='goods.i.toFixed(2)'>{{goods.i.toFixed(2)}}</span>
														<span :title='goods.l.toFixed(2)'>{{goods.l.toFixed(2)}}</span>
													</template>
												</li>
												<li v-for="(itemTwo, twoKey, index) in item.q" :key="index+'-'" style="background-color: #F0F0F0;display: table;" class="chairFix">
													<span @click="getDetailsTwo(key,item.u,itemTwo,twoKey)" v-if="itemTwo.click" class="point width70">
														<i class="fi fi-angle-up fi-2x" style="color:#ff9800"></i>
													</span>
													<span @click="getDetailsTwo(key,item.u,itemTwo,twoKey)" v-if="!itemTwo.click" class="point width70">
														<i class="fi fi-angle-down fi-2x"></i>
													</span>
													<span class="point width70" v-bind:title="itemTwo.t">{{itemTwo.t}}</span>
													<span class="point width70" v-bind:title="itemTwo.x">{{itemTwo.x!=''?itemTwo.x:"--"}}</span>
													<template v-if="dataList.flag == 0">
														<span :title='itemTwo.c.toFixed(2)'>{{itemTwo.c.toFixed(2)}}</span>
														<span v-if="industry != 1" :title='itemTwo.e.toFixed(2)'>{{itemTwo.e.toFixed(2)}}</span>
														<span :title='itemTwo.l.toFixed(2)'>{{itemTwo.l.toFixed(2)}}</span>
														<span :title='itemTwo.d.toFixed(2)'>{{itemTwo.d.toFixed(2)}}</span>
													</template>
													<template v-if="dataList.flag == 1">
														<span :title='itemTwo.f.toFixed(2)'>{{itemTwo.f.toFixed(2)}}</span>
														<span :title='itemTwo.g.toFixed(2)'>{{itemTwo.g.toFixed(2)}}</span>
														<span :title='itemTwo.j.toFixed(2)'>{{itemTwo.j.toFixed(2)}}</span>
														<span :title='itemTwo.k.toFixed(2)'>{{itemTwo.k.toFixed(2)}}</span>
													</template>
													<template v-if="dataList.flag == 2">
														<span :title='itemTwo.h.toFixed(2)'>{{itemTwo.h.toFixed(2)}}</span>
														<span :title='itemTwo.i.toFixed(2)'>{{itemTwo.i.toFixed(2)}}</span>
														<span :title='itemTwo.l.toFixed(2)'>{{itemTwo.l.toFixed(2)}}</span>
													</template>
													<ul v-if="itemTwo.loading" class="orMaReMainList">
														<span class="width70"></span>
														<span class="width70"></span>
														<span v-for="(item,index) in headList" :key="index"></span>
														<div id="Loading">
															<div class="loader-inner ball-beat">
																<div></div>
																<div></div>
																<div></div>
															</div>
														</div>
													</ul>
													<ul v-if="itemTwo.click && !itemTwo.loading" class="orMaReMainList">
														<li v-for="(itemThree, chidlGoodKey, i) in itemTwo.r" :key="i+'&'" style="background-color: #fff; display: table;" class="chairFix goods-style numcolor">
															<!-- <span></span> -->
															<span class="width70"></span>
															<span class="width70" v-bind:title="itemThree.w">{{itemThree.w}}</span>
															<span class="width70" v-bind:title="itemThree.x">{{itemThree.x!=''?itemThree.x:'--'}}</span>
															<template v-if="dataList.flag == 0">
																<span :title='itemThree.c.toFixed(2)'>{{itemThree.c.toFixed(2)}}</span>
																<span v-if="industry != 1" :title='itemThree.e.toFixed(2)'>{{itemThree.e.toFixed(2)}}</span>
																<span :title='itemThree.l.toFixed(2)'>{{itemThree.l.toFixed(2)}}</span>
																<span :title='itemThree.d.toFixed(2)'>{{itemThree.d.toFixed(2)}}</span>
															</template>
															<template v-if="dataList.flag == 1">
																<span :title='itemThree.f.toFixed(2)'>{{itemThree.f.toFixed(2)}}</span>
																<span :title='itemThree.g.toFixed(2)'>{{itemThree.g.toFixed(2)}}</span>
																<span :title='itemThree.j.toFixed(2)'>{{itemThree.j.toFixed(2)}}</span>
																<span :title='itemThree.k.toFixed(2)'>{{itemThree.k.toFixed(2)}}</span>
															</template>
															<template v-if="dataList.flag == 2">
																<span :title='itemThree.h.toFixed(2)'>{{itemThree.h.toFixed(2)}}</span>
																<span :title='itemThree.i.toFixed(2)'>{{itemThree.i.toFixed(2)}}</span>
																<span :title='itemThree.l.toFixed(2)'>{{itemThree.l.toFixed(2)}}</span>
															</template>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</section>
							</div>
							<!-- <div :style="{'padding-left': (headList.length*100+200*1 + 2*1 -60) + 'px'}" class="aRight" style="height: auto;overflow: auto;">
									<div :style="{'width': (headList.length*100 + 2*1)*(allShopIndex) + 'px'}"> -->
							<!--单天门店--------------------------------------------------------------->
							<div v-show="isHaveData" class="aRight" style="height: auto;overflow: auto;">
								<div :style="{'width': (headList.length*100 + 2*1) + 'px'}">
									<section v-for="(time,index) in orderPageList" :key="index + '*'" style="display: inline-block;" :style="{'width': (headList.length*100 + 2*1)*(time.shop.length)*1 + 'px'}" class="orMaRetreatMain">
										<!-- <ul class="titleTop titleTopColor">{{time.time}}</ul> -->
										<ul v-if="selectedType == 0" class="titleTop titleTopColor">
											<p style="line-height: 30px;">{{timeTodate(time.time)}}</p>
											<p style="line-height: 10px;">{{timeToday(time.time)}}</p>
										</ul>
										<ul v-if="selectedType == 1" class="titleTop titleTopColor">
											<p style="line-height: 30px;">{{timeToweek(time.time)}}</p>
											<p style="line-height: 10px;">{{weekTotime(time.time)}}</p>
										</ul>
										<ul v-if="selectedType == 2" class="titleTop titleTopColor">
											<p style="line-height: 50px;">{{timeTodate(time.time)}}</p>
										</ul>
										<ul v-if="selectedType == 3" class="titleTop titleTopColor">
											<p style="line-height: 30px;">{{timeToquarter(time.time)}}</p>
										</ul>
										<ul v-if="selectedType == 4" class="titleTop titleTopColor">
											<p style="line-height: 50px;">{{timeToyear(time.time)}}</p>
										</ul>
										<section v-if="shopKey == selShopForm.id" v-for="(shop,shopKey,index) in time.shop" :key="index" style="display: inline-block;" :style="{'width': (headList.length*100 + 2*1) + 'px'}">
											<ul v-if="shopKey == '-1'" class="titleTop" style="background: rgb(255, 255, 255)">合计</ul>
											<ul v-else class="titleTop" style="background: rgb(255, 255, 255)">{{toShopName(shopKey)}}</ul>
											<ul class="orMaReMainList listLeft">
												<li class="chairFix" style="background: #f7f7f7;">
													<span v-for="(item, index) in headList" :key="index">{{item.name}}</span>
												</li>
											</ul>
											<ul class="orMaReMainList listLeft">

												<li v-for="(item,key,oneIndex) in formList" :key="oneIndex" class="chairFix" style="background-color: rgb(255, 255, 255);display: table;border-bottom: 1px solid #ccc;">
													<template v-if="shop.hasOwnProperty(key)">
														<template v-if="dataList.flag == 0">
															<span :title='shop[key].c.toFixed(2)'>{{shop[key].c.toFixed(2)}}</span>
															<span v-if="industry != 1" :title='shop[key].e.toFixed(2)'>{{shop[key].e.toFixed(2)}}</span>
															<span :title='shop[key].l.toFixed(2)'>{{shop[key].l.toFixed(2)}}</span>
															<span :title='shop[key].d.toFixed(2)'>{{shop[key].d.toFixed(2)}}</span>
														</template>
														<template v-if="dataList.flag == 1">
															<span :title='shop[key].f.toFixed(2)'>{{shop[key].f.toFixed(2)}}</span>
															<span :title='shop[key].g.toFixed(2)'>{{shop[key].g.toFixed(2)}}</span>
															<span :title='shop[key].j.toFixed(2)'>{{shop[key].j.toFixed(2)}}</span>
															<span :title='shop[key].k.toFixed(2)'>{{shop[key].k.toFixed(2)}}</span>
														</template>
														<template v-if="dataList.flag == 2">
															<span :title='shop[key].h.toFixed(2)'>{{shop[key].h.toFixed(2)}}</span>
															<span :title='shop[key].i.toFixed(2)'>{{shop[key].i.toFixed(2)}}</span>
															<span :title='shop[key].l.toFixed(2)'>{{shop[key].l.toFixed(2)}}</span>
														</template>
													</template>
													<template v-else>
														<template v-if="dataList.flag == 0">
															<span>--</span>
															<span v-if="industry != 1">--</span>
															<span>--</span>
															<span>--</span>
														</template>
														<template v-if="dataList.flag == 1">
															<span>--</span>
															<span>--</span>
															<span>--</span>
															<span>--</span>
														</template>
														<template v-if="dataList.flag == 2">
															<span>--</span>
															<span>--</span>
															<span>--</span>
														</template>
													</template>
													<ul v-if="item.loading" class="orMaReMainList">
														<li class="chairFix goods-style numcolor">
															<span v-for="(item,index) in headList" :key="index"></span>
														</li>
													</ul>
													<ul v-if="item.click && !item.loading" class="orMaReMainList">
														<li v-for="(goods, goodsKey, index) in item.r" :key="index+'+'" class="chairFix goods-style numcolor">
															<template v-if="shop[key] && shop[key].r && shop[key].r.hasOwnProperty(goodsKey)">
																<template v-if="dataList.flag == 0">
																	<span :title='shop[key].r[goodsKey].c.toFixed(2)'>{{shop[key].r[goodsKey].c.toFixed(2)}}</span>
																	<span v-if="industry != 1" :title='shop[key].r[goodsKey].e.toFixed(2)'>{{shop[key].r[goodsKey].e.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].l.toFixed(2)'>{{shop[key].r[goodsKey].l.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].d.toFixed(2)'>{{shop[key].r[goodsKey].d.toFixed(2)}}</span>
																</template>
																<template v-if="dataList.flag == 1">
																	<span :title='shop[key].r[goodsKey].f.toFixed(2)'>{{shop[key].r[goodsKey].f.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].g.toFixed(2)'>{{shop[key].r[goodsKey].g.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].j.toFixed(2)'>{{shop[key].r[goodsKey].j.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].k.toFixed(2)'>{{shop[key].r[goodsKey].k.toFixed(2)}}</span>
																</template>
																<template v-if="dataList.flag == 2">
																	<span :title='shop[key].r[goodsKey].h.toFixed(2)'>{{shop[key].r[goodsKey].h.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].i.toFixed(2)'>{{shop[key].r[goodsKey].i.toFixed(2)}}</span>
																	<span :title='shop[key].r[goodsKey].l.toFixed(2)'>{{shop[key].r[goodsKey].l.toFixed(2)}}</span>
																</template>
															</template>
															<template v-else>
																<template v-if="dataList.flag == 0">
																	<span>--</span>
																	<span v-if="industry != 1">--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
																<template v-if="dataList.flag == 1">
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
																<template v-if="dataList.flag == 2">
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
															</template>
														</li>
														<li v-for="(itemTwo, twoKey, index) in item.q" :key="index+'-'" style="background-color: #F0F0F0;display: table;" class="chairFix">
															<template v-if="shop[key] && shop[key].q && shop[key].q.hasOwnProperty(twoKey)">
																<template v-if="dataList.flag == 0">
																	<span :title='shop[key].q[twoKey].c.toFixed(2)'>{{shop[key].q[twoKey].c.toFixed(2)}}</span>
																	<span v-if="industry != 1" :title='shop[key].q[twoKey].e.toFixed(2)'>{{shop[key].q[twoKey].e.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].l.toFixed(2)'>{{shop[key].q[twoKey].l.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].d.toFixed(2)'>{{shop[key].q[twoKey].d.toFixed(2)}}</span>
																</template>
																<template v-if="dataList.flag == 1">
																	<span :title='shop[key].q[twoKey].f.toFixed(2)'>{{shop[key].q[twoKey].f.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].g.toFixed(2)'>{{shop[key].q[twoKey].g.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].j.toFixed(2)'>{{shop[key].q[twoKey].j.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].k.toFixed(2)'>{{shop[key].q[twoKey].k.toFixed(2)}}</span>
																</template>
																<template v-if="dataList.flag == 2">
																	<span :title='shop[key].q[twoKey].h.toFixed(2)'>{{shop[key].q[twoKey].h.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].i.toFixed(2)'>{{shop[key].q[twoKey].i.toFixed(2)}}</span>
																	<span :title='shop[key].q[twoKey].l.toFixed(2)'>{{shop[key].q[twoKey].l.toFixed(2)}}</span>
																</template>
															</template>
															<template v-else>
																<template v-if="dataList.flag == 0">
																	<span>--</span>
																	<span v-if="industry != 1">--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
																<template v-if="dataList.flag == 1">
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
																<template v-if="dataList.flag == 2">
																	<span>--</span>
																	<span>--</span>
																	<span>--</span>
																</template>
															</template>
															<ul v-if="itemTwo.loading" class="orMaReMainList">
																<span v-for="(item,index) in headList" :key="index"></span>
															</ul>
															<ul v-if="itemTwo.click && !itemTwo.loading" class="orMaReMainList">
																<li v-for="(itemThree, chidlGoodKey, i) in itemTwo.r" :key="i+'&'" style="background-color: #fff; display: table;" class="chairFix goods-style numcolor">
																	<template v-if="shopKey != '-1'">
																		<template v-if="shop[key] && shop[key].q[twoKey] && shop[key].q[twoKey].r && shop[key].q[twoKey].r.hasOwnProperty(chidlGoodKey)">
																			<template v-if="dataList.flag == 0">
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].c.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].c.toFixed(2)}}</span>
																				<span v-if="industry != 1" :title='shop[key].q[twoKey].r[chidlGoodKey].e.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].e.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].l.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].l.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].d.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].d.toFixed(2)}}</span>
																			</template>
																			<template v-if="dataList.flag == 1">
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].f.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].f.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].g.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].g.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].j.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].j.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].k.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].k.toFixed(2)}}</span>
																			</template>
																			<template v-if="dataList.flag == 2">
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].h.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].h.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].i.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].i.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].r[chidlGoodKey].l.toFixed(2)'>{{shop[key].q[twoKey].r[chidlGoodKey].l.toFixed(2)}}</span>
																			</template>
																		</template>
																		<template v-else>
																			<template v-if="dataList.flag == 0">
																				<span>--</span>
																				<span v-if="industry != 1">--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																			<template v-if="dataList.flag == 1">
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																			<template v-if="dataList.flag == 2">
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																		</template>
																	</template>
																	<template v-else>
																		<template v-if="shop[key] && shop[key].q[twoKey] && shop[key].q[twoKey].q && shop[key].q[twoKey].q.hasOwnProperty(chidlGoodKey)">
																			<template v-if="dataList.flag == 0">
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].c.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].c.toFixed(2)}}</span>
																				<span v-if="industry != 1" :title='shop[key].q[twoKey].q[chidlGoodKey].e.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].e.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].l.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].l.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].d.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].d.toFixed(2)}}</span>
																			</template>
																			<template v-if="dataList.flag == 1">
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].f.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].f.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].g.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].g.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].j.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].j.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].k.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].k.toFixed(2)}}</span>
																			</template>
																			<template v-if="dataList.flag == 2">
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].h.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].h.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].i.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].i.toFixed(2)}}</span>
																				<span :title='shop[key].q[twoKey].q[chidlGoodKey].l.toFixed(2)'>{{shop[key].q[twoKey].q[chidlGoodKey].l.toFixed(2)}}</span>
																			</template>
																		</template>
																		<template v-else>
																			<template v-if="dataList.flag == 0">
																				<span>--</span>
																				<span v-if="industry != 1">--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																			<template v-if="dataList.flag == 1">
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																			<template v-if="dataList.flag == 2">
																				<span>--</span>
																				<span>--</span>
																				<span>--</span>
																			</template>
																		</template>
																	</template>
																</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</section>
									</section>
								</div>
							</div>
						</section>
					</section>
				</section>
				<page v-if="total > 1" @pageNum="pageChange" :page.sync="page" :total.sync='total' :isNoJump='true' :isNoPaging='true' style="float: left;margin-bottom: 100px;"></page>
			</section>
		</section>
	</div>
</template>

<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			classification: [], //数据列表
			dataList: {
				buttonTop: 0,
				flag: 0,
				list: [
					{
						index: 0,
						name: '销售数据'
					},
					{
						index: 1,
						name: '优惠数据'
					},
					{
						index: 2,
						name: '退品数据'
					}
				]
			},
			chartList: {
				flag: 0,
				list: [
					{
						index: 0,
						name: '数据'
					},
					{
						index: 1,
						name: '图表'
					}
				]
			},
			// chartsTitle: {flag: 0, list: []}, //图表数据导航列表
			// headList: [], //图表表头
			headList: [],
			buttonList: {
				flag: 0,
				list: [
					{
						index: 0,
						name: '原表'
					}
				]
				//    {index: 1, name: '占比'},
				//    {index: 2, name: '总占比'},
				//    {index: 3, name: '环比'},
				//    {index: 4, name: '同比'}
			},
			chartWidth: 0, //图表宽度
			isShow: false, //展开收起按钮是否显示
			showTwo: true,
			showGoods: true,
			classificationTotal: [], //总计数据
			// classificationTotal: [{time: '',shop:[{category: {}}]}], //总计数据
			moreSettle: [], //分类选中的容器
			orderPageList: [], //分页后的数据列表
			allShopIndex: 0, //用来计算总宽度，所有门店的数量
			// selectedType:0, //对应循序  0:日, 1:周, 2:月, 3:季度, 4:年
			selGood: {
				id: '',
				type: '',
				name: '',
				shopList: []
			}, //选中样本数据
			total: 0, // 总页数
			len: 0, // 总记录条数
			num: 0, // 当前每页展示数量
			page: 0, //当前第几页
			formList: [],
			brandId: -1,
			changeCharts: 0, //图表监听数据变化
			industry: 1, //判断是否为零售店 1为零售店
			shopId: '',
			selShopForm: {
				id: '-1'
			}, //选择显示列表的店铺
			showCharts: false,
			isHaveData: true //判断该时间段下该店铺是否有数据
		};
	},
	props: [
		'orderList', //搜索获取的数据
		'taskId', //任务id
		'loading',
		'selShopid',
		'shopName', //选中的店铺名称
		'shopList', //所有的店铺
		'chooseShopList', //选中的店铺集合
		'selectedType' //对应循序  0:日, 1:周, 2:月, 3:季度, 4:年
	],
	mounted() {
		console.log(this.chooseShopList);
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.industry = userData.currentShop.industry; //当industry为1时 为零售店，图表不显示
		this.dataHandle();
		this.initBtn();
	},
	watch: {
		orderList: function() {
			this.dataHandle();
		}
	},
	methods: {
		//初始化右上角按钮，导出
		initBtn() {
			let arr = [
				{
					name: '导出',
					className: ['pickCheck', 'headSet'],
					fn: () => {
						let data = utils.deepCopy(this.formList);
						for (let i in data) {
							//一级分类
							if (!data[i].click) {
								//若一级分类没有展开 则二级分类和菜品置为空
								data[i].q = {};
								data[i].r = {};
							}
							let child = data[i].q; //二级分类
							for (let j in child) {
								if (!child[j].click) {
									//若二级分类没有展开，则二级分类菜品置为空
									child[j].r = {};
								}
								delete child[j].click;
								delete child[j].loading;
							}
							delete data[i].click;
							delete data[i].loading;
						}
						http.exportRetailCategory({
							data: {
								details: JSON.stringify(data),
								taskId: this.taskId,
								shopId: this.shopId
							}
						});
					}
				}
			];
			this.$store.commit('setPageTools', arr);
		},
		//判断该时间段下是否有该店铺数据
		haveData() {
			let shopList = this.orderPageList[0].shop;
			if (shopList.hasOwnProperty(this.selShopForm.id)) {
				this.isHaveData = true;
			} else {
				this.isHaveData = false;
			}
		},
		//图表，原表切换
		changeChart(index) {
			this.chartList.flag = index;
		},
		//数据查看切换
		showDataChoose(index) {
			this.dataList.buttonTop = index;
			setTimeout(() => {
				//页面渲染卡顿 延迟执行
				this.dataList.flag = index;
			});
			// this.chartsTitle.flag = 0
			if (index == 0) {
				this.headList = [
					{ type: 'goodsNum', name: '商品总数' },
					{ type: 'totalPrice', name: '消费金额' },
					{ type: 'num', name: '销量' }
				];
				let obj = { type: 'attrPrice', name: '口味金额' };
				if (this.industry != 1) {
					this.headList.splice(1, 0, obj);
				}
			} else if (index == 1) {
				this.headList = [
					{ type: 'freeNum', name: '赠品数量' },
					{ type: 'freePrice', name: '赠品金额' },
					{ type: 'discountPrice', name: '商品优惠金额' },
					{ type: 'price', name: '商品实收金额' }
				];
			} else if (index == 2) {
				this.headList = [
					{ type: 'returnNum', name: '退品数量' },
					{ type: 'returnPrice', name: '退品金额' },
					{ type: 'totalPrice', name: '消费金额' }
				];
			}
			// this.changeTitlechart(this.chartsTitle.flag,this.headList[this.chartsTitle.flag])
		},
		//展示合计
		allNum() {
			this.selShopForm.id = '-1';
			this.haveData();
		},
		//选选择店铺返回
		formShop(item) {
			console.log(item);
			this.selShopForm.id = item.join(',');
			this.haveData();
		},
		//			toLength(data){
		//				return Object.keys(data).length;
		//			},
		/**
		 * shopId => a;
		 * shopName => b,
		 * goodsNum => c  商品数量
		 * num => d  销售数量
		 * attrPrice => e  口味金额
		 * freeNum => f   赠品数量
		 * freePrice => g 赠品金额
		 * returnNum => h 退品数量
		 * returnPrice => i 退品金额
		 * discountPrice => j 抵扣金额
		 * price => k 实收金额
		 * totalPrice => l 消费金额
		 * barCode => m   条码
		 * secBarCode => n  第二个条码
		 * unitPrice => p  单价
		 * child => q
		 * goods => r
		 * shop => s
		 * categoryName => t  分类名称
		 * categoryId => u  分类id
		 * good => v
		 * goodsName => w
		 *
		 */
		//根据shopid匹配店铺名
		toShopName(id) {
			for (let i = 0; i < this.shopList.length; i++) {
				if (id == this.shopList[i].id) {
					return this.shopList[i].shopName;
				}
			}
		},
		//处理数据列表 一级分类
		dataHandle() {
			let data = this.orderList;
			let oneHash = {}; //各个分类和商品的哈希，匹配各个门店，有这个值则跳过
			let obj = {},
				brandId = -1; //总计数据obj 存只要在门店出现的分类和商品，将分类和商品以键值对的形式保存
			// let oldData = {goodsNum: 0,num: 0,totalPrice: 0,attrPrice: 0,freeNum: 0,freePrice: 0,discountPrice: 0,price: 0,};
			let oldData = {
				c: 0,
				d: 0,
				l: 0,
				e: 0,
				f: 0,
				g: 0,
				j: 0,
				k: 0,
				h: 0,
				i: 0
			};
			// let dayObj = {};
			for (let i = 0; i < data.length; i++) {
				let shopList = data[i].shop;
				// let shopDayTotal = {a:-1,b:'总计',c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0,k:0,l:0,q:[],r:[],t:'',u:''}; //每天店铺数据总计
				let dayObj = {};
				let totalHash = {};
				for (let j in shopList) {
					let oneCate = shopList[j];
					for (let k = 0; k < oneCate.length; k++) {
						let oneKey; //一级分类的键，若品牌分类则为分类id加品牌id；若为门店分类则为分类id加门店id
						oneCate[k].u < 100000
							? (oneKey = `${oneCate[k].u}_${brandId}`)
							: (oneKey = `${oneCate[k].u}_${oneCate[k].a}`);
						if (!oneHash[oneKey]) {
							//若一级分类哈希中没有匹配到改门店分类，则将该门店分类存入总计数据obj中
							obj[oneKey] = utils.deepCopy(oneCate[k]);
							for (let key in oldData) {
								obj[oneKey][key] = 0; //将总计原始数值设为0
							}
							if (oneCate[k].u >= 100000)
								obj[oneKey].t += `(${oneCate[k].b})`;
							obj[oneKey].q = {};
							obj[oneKey].r = {};
							oneHash[oneKey] = true;
						}
						if (!totalHash[oneKey]) {
							dayObj[oneKey] = utils.deepCopy(oneCate[k]);
							for (let key in oldData) {
								dayObj[oneKey][key] = 0; //将总计原始数值设为0
							}
							if (oneCate[k].u >= 100000)
								dayObj[oneKey].t += `(${oneCate[k].b})`;
							dayObj[oneKey].q = {};
							dayObj[oneKey].r = {};
							totalHash[oneKey] = true;
						}
						for (let key in oldData) {
							//将每家店铺的一级分类数据相加放入总计数据中
							oneCate[k][key] = Number(oneCate[k][key]);
							obj[oneKey][key] += Number(oneCate[k][key]);
							dayObj[oneKey][key] += Number(oneCate[k][key]);
						}
						dayObj[oneKey]['a'] = '-1';
					}
				}
				shopList['-1'] = dayObj;
			}
			let form = []; //保存所有门店的数据 分类和商品以键值对的形式保存，与总计数据格式一致
			for (let i = 0; i < data.length; i++) {
				let shopList = data[i].shop;
				let obj = { time: data[i].time, shop: {} };
				form.push(obj);
				for (let j in shopList) {
					let oneCate = shopList[j];
					form[i].shop[j] = {};
					for (let k = 0; k < oneCate.length; k++) {
						let oneKey;
						oneCate[k].u < 100000
							? (oneKey = `${oneCate[k].u}_${brandId}`)
							: (oneKey = `${oneCate[k].u}_${oneCate[k].a}`);
						form[i].shop[j][oneKey] = utils.deepCopy(oneCate[k]);
						form[i].shop[j][oneKey].q = {};
						form[i].shop[j][oneKey].r = {};
					}
				}
				form[i].shop['-1'] = shopList['-1'];
			}
			//加入click表示分类是否展开,loading是否已经加载
			let lista = {
				click: false,
				loading: false
			};
			for (let i in obj) {
				for (let key in lista) {
					obj[i][key] = lista[key];
				}
			}
			this.formList = obj;
			this.classificationTotal = data;
			this.classification = form;
			this.showDataChoose(0);
			this.page = 1;
			this.num = 1;
			this.total = Math.ceil(this.classification.length / this.num);

			this.pageChange({ page: this.page });
		},
		//翻页
		pageChange: function(item) {
			let page = item.page;
			this.orderPageList = this.classification.slice(
				(page - 1) * this.num,
				(page - 1) * this.num + this.num
			);
			//计算总宽度
			this.allShopIndex = 0;
			for (let i = 0; i < this.orderPageList.length; i++) {
				let len = Object.keys(this.orderPageList[i].shop).length;
				this.allShopIndex = this.allShopIndex * 1 + len * 1;
			}
			this.chartWidth =
				this.allShopIndex * (this.headList.length * 1) * 100;
			this.haveData();
		},

		// 分类全部选中
		allSelectedOne: function() {
			let cate = this.classificationTotal;
			if (this.moreSettle.length < cate.length) {
				this.isSelAll(true, cate);
			} else {
				this.isSelAll(false, cate);
			}
		},
		getData(...argus) {
			//获取一级分类下的菜品、二级分类   获取二级分类下的菜品
			let [
				data,
				type,
				categoryId,
				categoryKey,
				childId,
				childKey
			] = argus;
			let oneHash = {},
				twoHash = {},
				threeHash = {}; //各个分类和商品的哈希，匹配各个门店，有这个值则跳过
			let brandId = -1;
			let obj;
			if (type == 'category') {
				//保存所有合计
				obj = { r: {}, q: {} };
			} else {
				obj = {};
			}
			let oldData = {
				c: 0,
				d: 0,
				l: 0,
				e: 0,
				f: 0,
				g: 0,
				j: 0,
				k: 0,
				h: 0,
				i: 0
			};
			//type  category获取的为二级分类与一级分类菜品  child获取二级分类下菜品
			for (let i = 0; i < data.length; i++) {
				let shopList = data[i].shop;
				let dayObj,
					totalOneHash = {},
					totalTwoHash = {};
				if (type == 'category') {
					//保存每一天的合计
					dayObj = { r: {}, q: {} };
				} else {
					dayObj = {};
				}
				for (let j in shopList) {
					let oneCate = shopList[j];
					for (let k = 0; k < oneCate.length; k++) {
						if (type == 'category') {
							let oneKey; //一级分类的键，若品牌分类则为分类id加品牌id；若为门店分类则为分类id加门店id
							if (oneCate[k].u) {
								//一级分类下的二级分类
								oneCate[k].u < 100000
									? (oneKey = `${categoryId}_${oneCate[k].u}_${brandId}`)
									: (oneKey = `${categoryId}_${oneCate[k].u}_${oneCate[k].a}`);
								if (!oneHash[oneKey]) {
									//若一级分类哈希中没有匹配到改门店分类，则将该门店分类存入总计数据obj中
									obj.q[oneKey] = utils.deepCopy(oneCate[k]);
									for (let key in oldData) {
										obj.q[oneKey][key] = 0; //将总计原始数值设为0
									}
									if (oneCate[k].u >= 100000)
										obj.q[oneKey].t += `(${oneCate[k].b})`; //若为门店自建 在分类名后加上门店名称
									obj.q[oneKey].q = {};
									obj.q[oneKey].r = {};
									oneHash[oneKey] = true;
								}
								if (!totalOneHash[oneKey]) {
									//计算每一天的合计数据
									dayObj.q[oneKey] = utils.deepCopy(
										oneCate[k]
									);
									for (let key in oldData) {
										dayObj.q[oneKey][key] = 0; //将总计原始数值设为0
									}
									if (oneCate[k].u >= 100000)
										dayObj.q[oneKey].t += `(${
											oneCate[k].b
										})`; //若为门店自建 在分类名后加上门店名称
									dayObj.q[oneKey].q = {};
									dayObj.q[oneKey].r = {};
									totalOneHash[oneKey] = true;
								}
								for (let key in oldData) {
									//将每家店铺的一级分类数据相加放入总计数据中
									oneCate[k][key] = Number(oneCate[k][key]);
									obj.q[oneKey][key] += Number(
										oneCate[k][key]
									);
									dayObj.q[oneKey][key] += Number(
										oneCate[k][key]
									);
								}
								dayObj.q[oneKey]['a'] = '-1';
							} else {
								//一级分类下的商品
								oneCate[k].v < 100000
									? (oneKey = `${categoryId}_${oneCate[k].v}_${brandId}`)
									: (oneKey = `${categoryId}_${oneCate[k].v}_${oneCate[k].a}`);
								if (!twoHash[oneKey]) {
									//若一级分类哈希中没有匹配到改门店分类，则将该门店分类存入总计数据obj中
									obj.r[oneKey] = utils.deepCopy(oneCate[k]);
									for (let key in oldData) {
										obj.r[oneKey][key] = 0; //将总计原始数值设为0
									}
									if (oneCate[k].v >= 100000)
										obj.r[oneKey].w += `(${oneCate[k].b})`; //若为门店自建 在分类名后加上门店名称
									obj.r[oneKey].q = {};
									obj.r[oneKey].r = {};
									twoHash[oneKey] = true;
								}
								if (!totalTwoHash[oneKey]) {
									//若一级分类哈希中没有匹配到改门店分类，则将该门店分类存入总计数据obj中
									dayObj.r[oneKey] = utils.deepCopy(
										oneCate[k]
									);
									for (let key in oldData) {
										dayObj.r[oneKey][key] = 0; //将总计原始数值设为0
									}
									if (oneCate[k].v >= 100000)
										dayObj.r[oneKey].w += `(${
											oneCate[k].b
										})`; //若为门店自建 在分类名后加上门店名称
									dayObj.r[oneKey].q = {};
									dayObj.r[oneKey].r = {};
									totalTwoHash[oneKey] = true;
								}
								for (let key in oldData) {
									//将每家店铺的一级分类数据相加放入总计数据中
									oneCate[k][key] = Number(oneCate[k][key]);
									obj.r[oneKey][key] += Number(
										oneCate[k][key]
									);
									dayObj.r[oneKey][key] += Number(
										oneCate[k][key]
									);
								}
								dayObj.r[oneKey]['a'] = -1;
							}
						} else if (type == 'child') {
							let goodsKey; //二级分类下的菜品的键
							oneCate[k].v < 100000
								? (goodsKey = `${categoryId}_${childId}_${oneCate[k].v}_${brandId}`)
								: (goodsKey = `${categoryId}_${childId}_${oneCate[k].v}_${oneCate[k].a}`);
							if (!threeHash[goodsKey]) {
								//匹配总计中二级分类是否含有该商品
								obj[goodsKey] = utils.deepCopy(oneCate[k]);
								for (let key in oldData) {
									obj[goodsKey][key] = 0;
								}
								if (oneCate[k].v >= 100000) obj[goodsKey].w += `(${oneCate[k].b})`;
								threeHash[goodsKey] = true;
							}
							if (!totalOneHash[goodsKey]) {
								//匹配总计中二级分类是否含有该商品
								dayObj[goodsKey] = utils.deepCopy(oneCate[k]);
								for (let key in oldData) {
									dayObj[goodsKey][key] = 0;
								}
								if (oneCate[k].v >= 100000)
									dayObj[goodsKey].w += `(${oneCate[k].b})`;
								totalOneHash[goodsKey] = true;
							}
							for (let key in oldData) {
								//将每家店铺的二级分类下的菜品相加
								oneCate[k][key] = Number(oneCate[k][key]);
								obj[goodsKey][key] += Number(oneCate[k][key]);
								dayObj[goodsKey][key] += Number(
									oneCate[k][key]
								);
							}
							dayObj[goodsKey]['a'] = -1;
						}
					}
				}
				for (let k = 0; k < this.classification.length; k++) {
					//为每一天加入店铺合计 键为'-1'表示为总计数据
					if (this.classification[k].time == data[i].time) {
						let shopList = this.classification[k].shop;
						if (type == 'category') {
							shopList['-1'][categoryKey].q = dayObj.q;
							shopList['-1'][categoryKey].r = dayObj.r;
						} else if (type == 'child') {
							//总计数据下的r被vue占用 只能读不能写，所以用q  页面渲染时总计数据换成q，但门店数据还是r渲染
							shopList['-1'][categoryKey].q[childKey].q = dayObj;
						}
					}
				}
			}
			//店铺数据格式化 获取的二级分类与菜品插入每天数据中
			for (let i = 0; i < this.classification.length; i++) {
				let shopList = this.classification[i].shop;
				for (let j in shopList) {
					let cate = shopList[j];
					if (type == 'category') {
						// 一级分类下的二级分类和一级分类下的菜品
						for (let m = 0; m < data.length; m++) {
							if (data[m].time == this.classification[i].time) {
								//与店铺每一天数据进行匹配，将数据插入到匹配的当天
								for (let n in data[m].shop) {
									let oneCate = data[m].shop[n];
									if (
										cate.hasOwnProperty(categoryKey) &&
										n != '-1' &&
										oneCate[0].a == j
									) {
										//将每家店的二级分类转成键值对形式
										for (let k in oneCate) {
											let oneKey; //设置二级分类或菜品的键，用于匹配渲染
											if (oneCate[k].u) {
												//二级分类
												oneCate[k].u < 100000
													? (oneKey = `${categoryId}_${oneCate[k].u}_${brandId}`)
													: (oneKey = `${categoryId}_${oneCate[k].u}_${oneCate[k].a}`);
												cate[categoryKey].q[oneKey] =
													data[m].shop[n][k];
											} else {
												// 一级分类下的菜品
												oneCate[k].v < 100000
													? (oneKey = `${categoryId}_${oneCate[k].v}_${brandId}`)
													: (oneKey = `${categoryId}_${oneCate[k].v}_${oneCate[k].a}`);
												cate[categoryKey].r[oneKey] =
													data[m].shop[n][k];
											}
										}
									}
								}
							}
						}
						if (this.formList.hasOwnProperty(categoryKey)) {
							//将获取的数据放入门店合计数据中
							this.formList[categoryKey].q = obj.q;
							this.formList[categoryKey].r = obj.r;
							for (let k in this.formList[categoryKey].q) {
								this.$set(
									this.formList[categoryKey].q[k],
									'click',
									false
								);
								this.$set(
									this.formList[categoryKey].q[k],
									'loading',
									false
								);
							}
						}
					} else if (type == 'child') {
						//二级分类下的菜品
						if (
							cate[categoryKey] &&
							cate[categoryKey].q[childKey]
						) {
							cate[categoryKey].q[childKey].r = {};
						}
						for (let m = 0; m < data.length; m++) {
							if (data[m].time == this.classification[i].time) {
								//与店铺每一天数据进行匹配，将数据插入到匹配的当天
								for (let n in data[m].shop) {
									let oneCate = data[m].shop[n];
									if (
										cate.hasOwnProperty(categoryKey) &&
										cate[categoryKey].q.hasOwnProperty(
											childKey
										) &&
										n != '-1' &&
										oneCate[0].a == j
									) {
										for (let k in oneCate) {
											let goodsKey; //二级分类下的菜品的键
											oneCate[k].v < 100000
												? (goodsKey = `${categoryId}_${childId}_${oneCate[k].v}_${brandId}`)
												: (goodsKey = `${categoryId}_${childId}_${oneCate[k].v}_${oneCate[k].a}`);
											cate[categoryKey].q[childKey].r[goodsKey] = data[m].shop[n][k];
										}
									}
								}
							}
						}
						if (
							this.formList.hasOwnProperty(categoryKey) &&
							this.formList[categoryKey].q.hasOwnProperty(
								childKey
							)
						) {
							this.formList[categoryKey].q[childKey].r = obj;
						}
					}
				}
			}
			console.log(this.formList);
			this.changeCharts++; //数据改变 传给图表监听
		},
		//获取展开后的数据
		async getAnalysis(...argus) {
			let [key, id, childId, childKey, item] = argus;
			let shopId, cate; //一级分类与二级分类是否为门店自建
			if (childId) {
				//二级分类
				cate = childKey.split('_');
				shopId = cate[cate.length - 1];
			} else {
				cate = key.split('_');
				shopId = cate[cate.length - 1];
			}
			http
				.getCategoryData({
					data: {
						taskId: this.taskId,
						pid: childId ? childId : id,
						id: shopId //若为门店自建则传门店id  -1为品牌
					},
					timeout: 60000
				})
				.then(data => {
					item.loading = false;
					if (childId) {
						this.getData(data, 'child', id, key, childId, childKey);
					} else {
						this.getData(data, 'category', id, key);
					}
				});
		},
		//打开/关闭一级菜单
		getDetailsOne: function(key, item) {
			let click = item.click;
			item.click = !click;
			if (
				item.click &&
				(!Object.keys(item.q).length && !Object.keys(item.r).length)
			) {
				item.loading = true;
				this.getAnalysis(key, item.u, null, null, item);
			}
		},
		//打开二级菜单
		getDetailsTwo: function(...argus) {
			let [key, categoryId, item, childKey] = argus;
			let click = item.click;
			item.click = !click;
			if (item.click && !Object.keys(item.r).length) {
				item.loading = true;
				this.getAnalysis(key, categoryId, item.u, childKey, item);
			}
		},
		//时间戳转日期
		timeTodate: function(time) {
			let a = time.replace(/\//g, '-');
			return a;
		},
		timeToweek: function(time) {
			let a = time.split('/');
			return a[0] + '第' + a[1] + '周';
		},
		timeToquarter: function(time) {
			let a = time.split('/');
			return a[0] + '第' + a[1] + '季度';
		},
		timeToyear: function(time) {
			return time + '年度';
		},
		//周数转时间戳
		weekTotime: function(time) {
			let a = time.split('/');
			let week1 = ''; //全年第一周的时间
			let week2 = ''; //当前周数结束时间
			let week3 = ''; //当前周数开始时间
			if (new Date(a[0], 0, 1).getDay() == 1) {
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000;
				week2 =
					week1 -
					24 * 3600 * 1000 +
					a[1] * 24 * 3600 * 1000 * 7 -
					1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7 - 1000;
			} else if (new Date(a[0], 0, 1).getDay() > 1) {
				let total = 8 - new Date(a[0], 0, 1).getDay();
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000 * total;
				week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
			} else if (new Date(a[0], 0, 1).getDay() < 1) {
				week1 =
					new Date(a[0], 0, 1).setHours(0, 0, 0, 0) +
					24 * 60 * 60 * 1000;
				week2 = week1 + a[1] * 24 * 3600 * 1000 * 7 - 1000;
				week3 = week1 + (a[1] - 1) * 24 * 3600 * 1000 * 7;
			}
			let end = utils.format(new Date(week2), 'yyyy.MM.dd');
			let start = utils.format(new Date(week3), 'yyyy.MM.dd');
			return '(' + start + '~' + end + ')';
		},
		timeToday: function(time) {
			let a = time.split('/');
			let day = new Date(a[0], a[1] - 1, a[2]).getDay();
			let arr = [
				'星期日',
				'星期一',
				'星期二',
				'星期三',
				'星期四',
				'星期五',
				'星期六'
			];
			return arr[day];
		}
	},
	components: {
		categorycharts: () =>
			import(/*webpackChunkName: 'category_charts'*/ './category_charts_retail'),
		page: () =>
			import(/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		formShop: () => import(/*webpackChunkName: 'form_shop'*/ './form_shop'),
		elShopList: () =>
			import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList')
	}
};
</script>
<style  scoped>
#Loading {
	margin-top: 70px;
	left: 50%;
	position: absolute;
	-webkit-transform: translateY(-50%) translateX(-50%);
	transform: translateY(-50%) translateX(-50%);
	z-index: 100;
}
@-webkit-keyframes ball-beat {
	50% {
		opacity: 0.2;
		-webkit-transform: scale(0.75);
		transform: scale(0.75);
	}

	100% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

@keyframes ball-beat {
	50% {
		opacity: 0.2;
		-webkit-transform: scale(0.75);
		transform: scale(0.75);
	}

	100% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

.ball-beat > div {
	background-color: #ffa800;
	width: 14px;
	height: 14px;
	border-radius: 100% !important;
	margin: 2px;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	display: inline-block;
	-webkit-animation: ball-beat 0.7s 0s infinite linear;
	animation: ball-beat 0.7s 0s infinite linear;
}
.ball-beat > div:nth-child(2n-1) {
	-webkit-animation-delay: 0.35s !important;
	animation-delay: 0.35s !important;
}
</style>

<style lang="less" scoped>
#report_category {
	.formType {
		margin-right: 10px;
		.typeTotal {
			display: inline-block;
			width: 100px;
			text-align: center;
			border: 1px solid #f8941f;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
		}
		.typeOn {
			background: #f8941f;
			color: #fff;
		}
	}
	.light {
		margin-bottom: 20px;
		display: inline-block;
		.sel {
			display: inline-block;
			width: 135px;
			height: 40px;
			font-size: 16px;
			background: #f2f2f2;
			border-radius: 3px;
			text-align: center;
			line-height: 40px;
			cursor: pointer;
			margin-right: 10px;
			margin-bottom: 10px;
		}
		.on {
			background: #28a8e0;
			color: #fff;
		}
	}
	.nav {
		margin-bottom: 20px;
		.shopBox {
			height: 0px;
		}
		.totalName {
			display: inline-block;
			width: 100px;
			height: 35px;
			line-height: 35px;
			margin-right: 10px;
			text-align: center;
			background: #f2f2f2;
			border-radius: 5px;
			vertical-align: middle;
			cursor: pointer;
		}
		.shopName {
			display: inline-block;
			width: 200px;
			height: 35px;
			background: #f2f2f2;
			border-radius: 5px;
			position: relative;
			vertical-align: middle;
			span {
				line-height: 35px;
				display: inline-block;
				height: 35px;
				width: 160px;
				padding-left: 10px;
			}
			i {
				position: absolute;
				right: 15px;
				top: 13px;
				height: 10px;
				width: 10px;
				display: inline-block;
				border-top: 10px solid #45404b;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				box-sizing: border-box;
			}
		}
		.selected {
			background: #29abe2;
			color: #fff;
		}
	}
	// max-width: 1300px;
	.showbox {
		span {
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
	.numcolor {
		span {
			color: #28a8e0 !important;
		}
	}
	.oneBorder {
		border: 1px solid #ccc;
		border-bottom: none;
		border-left: none;
	}
	.titleTopColor {
		background: rgb(247, 247, 247);
	}
	.point {
		cursor: pointer;
	}
	.mbot {
		margin-bottom: 20px;
		display: inline-block;
	}
	.fi {
		line-height: 50px;
	}
	.chairFix {
		&:after {
			content: '';
			display: block;
			clear: both;
		}
		.main {
			border: 1px solid #ccc;
			float: left;
			.aLeft {
				width: 450px;
				height: auto;
				float: left;
				// position: absolute;
				// left: 0;
				z-index: 9;
			}
			.orMaReMainList {
				li {
					span {
						display: block;
						text-align: center;
						height: 50px;
						line-height: 50px;
						width: 100px;
						color: #43414a;
						float: left;
						position: relative;
						overflow: hidden;
						vertical-align: middle;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				.goods-style span {
					background: #f7f7f7;
				}
			}
			.titleTop {
				height: 50px;
				line-height: 50px;
				border-right: 1px solid #ccc;
			}
			.rightTotal {
				li {
					span {
						&:nth-child(1) {
							width: 50px;
						}
					}
				}
			}
			.listLeft {
				border: 1px solid #ccc;
				border-bottom: none;
				border-left: none;
				.circle {
					width: 26px;
					height: 26px;
					border: 1px #c7c7c7 solid;
					border-radius: 50%;
					margin: 0 auto;
					margin-top: 15px;
					background: #fff;
					&.active {
						background: url(../../res/icon/selected.png) center
								center no-repeat,
							#28a8e0;
					}
				}
			}
		}
	}
	.sel {
		display: inline-block;
		width: 135px;
		height: 40px;
		font-size: 16px;
		background: #f2f2f2;
		border-radius: 3px;
		text-align: center;
		line-height: 40px;
		cursor: pointer;
		margin-right: 10px;
	}
	.on {
		background: #28a8e0;
		color: #fff;
	}
	.titleChart {
		display: inline-block;
		text-align: center;
		line-height: 50px;
	}
	.one {
		font-size: 16px;
		color: #f8941f;
		border-bottom: 3px solid #f8941f;
	}
	.chyellow {
		background: #ffc801 url('../../res/icon/white_select.png') no-repeat
			center center;
	}
	.chblue {
		background: #1b88ee url('../../res/icon/white_select.png') no-repeat
			center center;
	}
	.chgreen {
		background: red url('../../res/icon/white_select.png') no-repeat center
			center;
	}
	.chactive {
		border: none !important;
	}
	.numGreen {
		color: #0ea59e;
	}
	.numRed {
		color: #ff3c04;
	}
	.numGreen {
		color: #0ea59e;
	}
	.numRed {
		color: #ff3c04;
	}
	.width70 {
		width: 70px !important;
	}
}
</style>