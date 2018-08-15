<template>
	<section id="login-audit" v-cloak>
		<section v-if="!isBoss">
			<div style="width:100%;height:auto" id="shopListBox">
				<ul class="shopList">
					<template v-if="shop.length==0">
						<li style="color:orange;text-align: center;line-height: 80px;">还没有可工作的店铺</li>
					</template>
					<template v-if='shop && shop.length>0'>
						<li v-for="(item,index) in shop" :key="index">
							<div style="width:20%; padding-top:10px;">
								<h3 class="shopBtn">店名: {{item.name}}</h3>
							</div>
							<div style="width:15%; padding-top:10px;">
								<h3 class="shopBtn"> 负责人: {{item.contactMan}}</h3>
							</div>
							<div style="width:25%; padding-top:10px;">
								<h3 class="shopBtn">联系方式: {{item.telephone}}</h3>
							</div>
							<div style="width:30%; padding-top:10px;">
								<h3 class="shopBtn">地址: {{item.address}}</h3>
							</div>
							<div style="width:10%;padding-top:10px;text-align: center;" @click="joinShop(item)">
								<h3 class="shopBtn" style="width:95px;border-left:2px solid #E4E9ED;color:#2AA7E1;">进入门店</h3>
							</div>
						</li>
					</template>
				</ul>
			</div>
		</section>
		<section v-if="isBoss" v-on:click="bodyClick" v-cloak>
			<div v-if="!iscreatStores" class="List">
				<!--品牌店和无品牌店信息页面-->
				<template v-if="!isBranDeail">
					<div style="width:100%;height:50px;margin-top:25px;margin-bottom:30px;" v-cloak>
						<a v-on:click="creatStoresShop(false)" href="javascript:void(0);" class="blue" style="width: 190px;height:50px;line-height:50px;float: right;">创建无品牌门店</a>
						<a v-on:click="createBrand" href="javascript:void(0);" class="blue" style="width: 190px;height:50px;line-height:50px;float: right;margin-right:40px;">创建品牌</a>
					</div>
					<div style="background-color: #fff;width:100%;height:100%;position: relative;top: 0;">
						<section style="width:100%;height:100%;overflow: auto;" id="shopListBox">
							<section style="width:100%;height:90px;position: absolute;top:0;background: #ffffff;">
								<div v-on:click="comshop2" class="mulu" v-bind:class="{ont:isBrand}">品牌明细</div>
								<div v-on:click="comshop1" class="mulu" v-bind:class="{ont:!isBrand}">所有无品牌门店明细</div>
							</section>
							<!--品牌明细-->
							<section v-if="isBrand" class="shoplist" v-cloak>
								<ul style="background: #f2f2f2;font-weight: bold;height:50px;">
									<li style="height:50px;line-height: 50px;">序号</li>
									<li style="width:15%;height:50px;line-height: 50px;">品牌名称</li>
									<li style="width:20%;height:50px;line-height: 50px;">LOGO</li>
									<li style="width:15%;height:50px;line-height: 50px;">行业分类</li>
									<li style="height:50px;line-height: 50px;">直营店数量</li>
									<li style="height:50px;line-height: 50px;">加盟店数量</li>
									<li style="width:20%;height:50px;line-height: 50px;">管理品牌</li>
								</ul>

								<div v-for="(item,indexs) in brandTotal" :key="indexs">
									<!--审核成功的品牌、brandTotal[0],审核中的品牌、brandTotal[1]，审核失败的品牌、brandTotal[2]-->
									<ul v-for="(items,index) in item" :key="index">
										<li>
											<span v-if="brandTotal[0] && brandTotal[0].length>0&&indexs == 0">{{index + 1}}</span>
											<span v-if="brandTotal[1] && brandTotal[1].length>0&&indexs == 1">{{brandTotal[0].length + index + 1}}</span>
											<span v-if="brandTotal[2] && brandTotal[2].length>0&&indexs == 2">{{brandTotal[0].length + brandTotal[1].length + index + 1}}</span>
										</li>
										<li style="width:15%;">{{items.name}}</li>
										<li style="width:20%;">
											<img v-if="items.logoImage != ''" class="cname" :src="imgHost + items.logoImage" style="height:100%;" />
											<img v-if="!items.logoImage || items.logoImage == ''" class="cname" src="../../res/food/test.jpg" style="height:100%;" />
										</li>
										<li style="width:15%;">
											<!-- {{getIndustryDetial(items.industry)}} -->
											<span v-if="items.industry == '0'">餐饮</span>
											<span v-if="items.industry == '1'">零售</span>
											<span v-if="items.industry == '2'">餐饮+零售</span>
										</li>
										<!--<li v-on:click = "openBrandDeail(item,'1',false)" style="color: #28A6E0;cursor: pointer;">{{shopNum1[index]}}</li>
																				<li v-on:click = "openBrandDeail(item,'2',true)" style="color: #28A6E0;cursor: pointer;">{{shopNum2[index]}}</li>-->
										<li v-on:click="openBrandDeail(items,false)" style="color: #28A6E0;cursor: pointer;">
											<span v-if="brandTotal[0] && brandTotal[0].length>0&&indexs == 0">{{items.directNum}}</span>
											<span v-if="brandTotal[1] && brandTotal[1].length>0&&indexs == 1">0</span>
											<span v-if="brandTotal[2] && brandTotal[2].length>0&&indexs == 2">0</span>
										</li>
										<li v-on:click="openBrandDeail(items,true)" style="color: #28A6E0;cursor: pointer;">
											<span v-if="brandTotal[0] && brandTotal[0].length>0&&indexs == 0">{{items.franchiseNum}}</span>
											<span v-if="brandTotal[1] && brandTotal[1].length>0&&indexs == 1">0</span>
											<span v-if="brandTotal[2] && brandTotal[2].length>0&&indexs == 2">0</span>
										</li>
										<li style="width:20%;cursor: pointer;">
											<section class="oBox" v-if="brandTotal[0] && brandTotal[0].length>0&&indexs == 0">
												<div v-on:click="creatStoresShop(items)">创建门店</div>
												<div v-on:click="joinShop(items)">进入品牌</div>
											</section>
											<section class="oBox" v-if="brandTotal[1] && brandTotal[1].length>0&&indexs == 1">
												<img style="margin-top:20px;" src="../../res/images/audit.png" />
											</section>
											<section class="oBox" v-if="brandTotal[2] && brandTotal[2].length>0&&indexs == 2">
												<div style="width:50%;"><img style="margin-top:20px;" src="../../res/images/nopass.png" /></div>
												<div v-on:click="openShopDetial(index,items)" style="width:50%;">查看详情</div>
											</section>
										</li>
									</ul>
								</div>
								<ul v-if="brandTotal[0] && brandTotal[0].length == 0 && brandTotal[1].length ==0 && brandTotal[2].length == 0">
									<li style="width:100%;color: grey;font-size: 28px;">还没有品牌信息，赶紧申请吧！</li>
								</ul>
							</section>
							<!--无品牌门店明细-->
							<section v-if="!isBrand" class="shoplist" v-cloak>
								<ul style="background: #f2f2f2;font-weight: bold;height:50px;">
									<li style="height:50px;line-height: 50px;">序号</li>
									<li style="width:20%;height:50px;line-height: 50px;">店铺名称</li>
									<li style="width:25%;height:50px;line-height: 50px;">店铺地址</li>
									<li style="height:50px;line-height: 50px;">负责人</li>
									<li style="width:15%;height:50px;line-height: 50px;">联系方式</li>
									<li style="width:20%;height:50px;line-height: 50px;">管理门店</li>
								</ul>
								<!--单店、../[0]，禁用的单店列表、shop[1]，审核中、shop[2]，审核失败、shop[3]-->
								<div v-for="(item,index) in shopTotal" :key="index">
									<ul v-for="(items,indexs) in item" :key="indexs">
										<li>
											<span v-if="shopTotal[0] && shopTotal[0].length>0&&index==0">{{indexs + 1}}</span>
											<span v-if="shopTotal[1] && shopTotal[1].length>0&&index==1">{{shopTotal[0].length + indexs + 1}}</span>
											<span v-if="shopTotal[2] && shopTotal[2].length>0&&index==2">{{shopTotal[0].length + shopTotal[1].length + indexs+ 1}}</span>
											<span v-if="shopTotal[3] && shopTotal[3].length>0&&index==3">{{shopTotal[0].length + shopTotal[1].length + shopTotal[2].length + indexs+ 1}}</span>
										</li>
										<li style="width:20%;">{{items.name}}</li>
										<li style="width:25%;">{{items.address}}</li>
										<li>{{items.contactMan}}</li>
										<li style="width:15%;">{{items.telephone}}</li>
										<li style="width:20%;cursor: pointer;">
											<section class="oBox" v-if="shopTotal[0] && shopTotal[0].length>0&&index==0">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;">关闭门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="shopTotal[1] && shopTotal[1].length>0&&index==1">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;color:gray">开启门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="shopTotal[2] && shopTotal[2].length>0&&index==2">
												<img style="margin-top:20px;" src="../../res/images/audit.png" />
											</section>
											<section class="oBox" v-if="shopTotal[3] && shopTotal[3].length>0&&index==3">
												<div style="width:50%;"><img style="margin-top:20px;" src="../../res/images/nopass.png" /></div>
												<div v-on:click="openShopDetial(indexs,items)" style="width:50%;">查看详情</div>
											</section>
										</li>
									</ul>
									<ul v-if="shopTotal.length == 0 && disableShop.length == 0 && examineshop.length == 0 && examineFail.length ==0">
										<li style="width:100%;color: grey;font-size: 28px;">还没有门店信息，赶紧创建吧！</li>
									</ul>
								</div>
							</section>
						</section>
					</div>
				</template>
				<!--直营店和加盟店信息-->
				<template v-if="isBranDeail">
					<section class="top_section">
						<h3 class="top_h3">{{isJoinShop?'所有加盟店明细':'所有直营店明细'}}</h3>
						<a v-on:click="returnList" href="javascript:void(0);">返回</a>
						<section style="width:210px;float:right;margin-right:20px;">
							<el-input placeholder="请输入店铺名称" v-model="searchName" clearable class="input-with-select" >
								<el-button slot="append" icon="el-icon-search" @click="newSearchName"></el-button>
							</el-input>
						</section>
						<!-- <input type="text" maxlength="30" class="input fr" v-model="searchName" placeholder="请输入需要检索的店铺名称"> -->
					</section>
					<!-- <section style="width:100%;height:100%;">
						<div class="area" v-if="areaList.length > 0">
							<span class="left icon el-icon-arrow-left" @click="slideLeft"></span>
							<div class="areabox">
								<div class="box" ref="content" :style="{left: leftWidth +'px'}">
									<el-radio-group v-model="areaList.name" @change="changeArea" size="medium">
										<el-radio-button v-for="(item,index) in areaList" :key="index" :label="item.name"></el-radio-button>
									</el-radio-group>
								</div>
							</div>
							<span class="right icon el-icon-arrow-right" @click="slideRight"></span>
						</div>
						
						<section style="width:100%;height:100%;overflow: auto;background-color: #fff;" v-cloak>
							<section class="shoplist" style="overflow: auto;margin-top:1px;">
								<el-table
									ref="multipleTable" stripe
									:header-cell-style = "{'background-color':'#f5f7fa'}"
									:data="shopList"
									border
									style="width: 100%">
									<el-table-column align="center" min-width = "100" label="序号">
										<template slot-scope="scope">
											<span>{{scope.$index+1}}</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width = "120" align="center" prop="name" label="店铺名称">
										<template slot-scope="scope">
											<div class="areaTagList">
												<span v-for="itemDetial in scope.row.areaTag" class="areaTag" :key="itemDetial+''">{{itemDetial}}</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width = "120" prop="address" align="center" label="店铺地址" > </el-table-column>
									<el-table-column prop="contactMan" min-width = "120" align="center" label="负责人" > </el-table-column>
									<el-table-column prop="telephone" min-width = "120" align="center" label="联系方式" > </el-table-column>
									<el-table-column min-width = "120" align="center" label="管理门店" >
										<template slot-scope="scope">
											<section class="oBox" v-if="scope.row.status =='0'">
												<span v-on:click="closeShop(scope.row,scope.$index)" style="width:50%;color: #28a6e0;">关闭门店</span>
												<span v-on:click="joinShop(scope.row)" style="width:50%;color: #28a6e0;margin-left:15px;">进入门店</span>
											</section>
											<section class="oBox" v-if="scope.row.status =='5'">
												<span v-on:click="closeShop(scope.row,indexs)" style="width:50%;color: #28a6e0;">开启门店</span>
												<span v-on:click="joinShop(scope.row)" style="width:50%;color: #28a6e0;margin-left:15px;">进入门店</span>
											</section>
											<section class="oBox" v-if="scope.row.status =='1'">
												<img style="margin-top:20px;" src="../../res/images/audit.png" />
											</section>
											<section class="oBox" v-if="scope.row.status =='2'">
												<div style="width:50%;"><img style="margin-top:20px;" src="../../res/images/nopass.png" /></div>
												<div v-on:click="openShopDetial(scope.$index,scope.row)" style="width:50%;">查看详情</div>
											</section>
										</template>
									</el-table-column>
								</el-table>
							</section>
						</section>
					</section> -->
					<!--加盟店明细-->
					<section v-if='isJoinShop' style="width:100%;height:100%;">
						<div class="area" ref="contentBox" v-if="newAreaList.length > 0" style="position:relative;">
							<span class="left icon el-icon-arrow-left" @click="slideLeft"></span>
							<div class="areabox">
								<div class="box" ref="content" :style="{left: leftWidth +'px'}">
									<el-radio-group v-model="areaIndex" @change="changeArea" size="medium">
										<el-radio-button v-for="(item,index) in newAreaList" :key="index" :label="index">{{item.name}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
							<span class="right icon el-icon-arrow-right" @click="slideRight"></span>
						</div>
						
						<section style="width:100%;height:100%;overflow: auto;background-color: #fff;" v-cloak>
							<section class="shoplist" style="overflow: auto;margin-top:1px;">
								<ul style="background: #f2f2f2;font-weight: bold;height:50px;">
									<li style="height:50px;line-height: 50px;">序号</li>
									<li style="width:25%;height:50px;line-height: 50px;">店铺名称</li>
									<li style="width:25%;height:50px;line-height: 50px;">店铺地址</li>
									<li style="height:50px;line-height: 50px;">负责人</li>
									<li style="height:50px;line-height: 50px;">联系方式</li>
									<li style="width:20%;height:50px;line-height: 50px;">管理门店</li>
								</ul>
								<!--审核成功的加盟店、franchiseesTotal[0]，禁用的加盟店、franchiseesTotal[1]，待审核的加盟店、franchiseesTotal[2]，待审核的加盟店、franchiseesTotal[3]-->
								<div v-for="(item,index) in franchiseesTotal" :key="index">
									<ul v-for="(items,indexs) in item" :key="indexs">
										<li>
											<span v-if="franchiseesTotal[0] && franchiseesTotal[0].length>0&&index == 0">{{indexs + 1}}</span>
											<span v-if="franchiseesTotal[1] && franchiseesTotal[1].length>0&&index == 1">{{franchiseesTotal[0].length + indexs +1}}</span>
											<span v-if="franchiseesTotal[2] && franchiseesTotal[2].length>0&&index == 2">{{franchiseesTotal[0].length + franchiseesTotal[1].length + indexs + 1}}</span>
											<span v-if="franchiseesTotal[3] && franchiseesTotal[3].length>0&&index == 3">{{franchiseesTotal[0].length + franchiseesTotal[1].length + franchiseesTotal[2].length + indexs + 1}}</span>
										</li>
										<li style="width:25%;position: relative;">
											<h3>{{items.name}}</h3>
											<div class="areaTagList">
												<span v-for="itemDetial in items.areaTag" class="areaTag" :key="itemDetial+''">{{itemDetial}}</span>
											</div>
										</li>
										<li style="width:25%;">{{items.address}}</li>
										<li>{{items.contactMan}}</li>
										<li>{{items.telephone}}</li>
										<li style="width:20%;cursor: pointer;">
											<section class="oBox" v-if="franchiseesTotal[0] && franchiseesTotal[0].length>0&&index == 0">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;">关闭门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="franchiseesTotal[1] && franchiseesTotal[1].length>0&&index == 1">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;color: gray;">开启门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="franchiseesTotal[2] && franchiseesTotal[2].length>0&&index == 2">
												<img style="margin-top:20px;" src="../../res/images/audit.png" />
											</section>
											<section class="oBox" v-if="franchiseesTotal[3] && franchiseesTotal[3].length>0&&index == 3">
												<div style="width:50%;"><img style="margin-top:20px;" src="../../res/images/nopass.png" /></div>
												<div v-on:click="openShopDetial(indexs,items)" style="width:50%;">查看详情</div>
											</section>
										</li>
									</ul>
								</div>

								<ul v-if="franchiseesTotal[0] && franchiseesTotal[0].length == 0 && franchiseesTotal[1].length == 0 && franchiseesTotal[2].length == 0 && franchiseesTotal[3].length == 0">
									<li style="width:100%;color: grey;font-size: 28px;">还没有加盟店信息，赶紧申请吧！</li>
								</ul>
							</section>
						</section>
					</section>
					<!--直营店明细-->
					<section v-if='!isJoinShop' style="width:100%;height:100%;">
						<div class="area" v-if="newAreaList.length > 0" style="position:relative;">
							<span class="left icon el-icon-arrow-left" @click="slideLeft"></span>
							<div class="areabox">
								<div class="box" ref="content" :style="{left: leftWidth +'px'}">
									<el-radio-group v-model="areaIndex" @change="changeArea" size="medium">
										<el-radio-button v-for="(item,index) in newAreaList" :key="index" :label="index">{{item.name}}</el-radio-button>
									</el-radio-group>
								</div>
							</div>
							<span class="right icon el-icon-arrow-right" @click="slideRight"></span>
						</div>
						
						<section style="width:100%;height:100%;overflow: auto;background-color: #fff;" v-cloak>
							<section class="shoplist" style="overflow: auto;margin-top:1px;">
								<ul style="background: #f2f2f2;font-weight: bold;height:50px;">
									<li style="height:50px;line-height: 50px;">序号</li>
									<li style="width:25%;height:50px;line-height: 50px;">店铺名称</li>
									<li style="width:25%;height:50px;line-height: 50px;">店铺地址</li>
									<li style="height:50px;line-height: 50px;">负责人</li>
									<li style="height:50px;line-height: 50px;">联系方式</li>
									<li style="width:20%;height:50px;line-height: 50px;">管理门店</li>
								</ul>

								<div v-for="(item,index) in directlyTotal" :key="index">
									<!--审核成功的直营店、directlyTotal[0]，禁用的直营店、directlyTotal[1]，待审核的直营店、directlyTotal[2]，审核失败的直营店、directlyTotal[3]-->
									<ul v-for="(items,indexs) in item" :key="indexs">
										<li>
											<span v-if="directlyTotal[0] && directlyTotal[0].length>0&&index == 0">{{indexs + 1}}</span>
											<span v-if="directlyTotal[1] && directlyTotal[1].length>0&&index == 1">{{directlyTotal[0].length + indexs +1}}</span>
											<span v-if="directlyTotal[2] && directlyTotal[2].length>0&&index == 2">{{directlyTotal[0].length + directlyTotal[1].length + indexs + 1}}</span>
											<span v-if="directlyTotal[3] && directlyTotal[3].length>0&&index == 3">{{directlyTotal[0].length + directlyTotal[1].length + directlyTotal[2].length + indexs + 1}}</span>
										</li>
										<li style="width:25%;position: relative;">
											<h3>{{items.name}}</h3>
											<div class="areaTagList" style="width:100%;height:20px;position: absolute;bottom: 8px;">
												<section class="areaTag" v-for='itemDetial in item.areaTag' :key="itemDetial+''">{{itemDetial}}</section>
											</div>
										</li>
										<li style="width:25%;">{{items.address}}</li>
										<li>{{items.contactMan}}</li>
										<li>{{items.telephone}}</li>
										<li style="width:20%;cursor: pointer;">
											<section class="oBox" v-if="directlyTotal[0] && directlyTotal[0].length>0&&index == 0">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;">关闭门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="directlyTotal[1] && directlyTotal[1].length>0&&index == 1">
												<div v-on:click="closeShop(items,indexs)" style="width:50%;color: gray;">开启门店</div>
												<div v-on:click="joinShop(items)" style="width:50%;">进入门店</div>
											</section>
											<section class="oBox" v-if="directlyTotal[2] && directlyTotal[2].length>0&&index == 2">
												<img style="margin-top:20px;" src="../../res/images/audit.png" />
											</section>
											<section class="oBox" v-if="directlyTotal[3] && directlyTotal[3].length>0&&index == 3">
												<div style="width:50%;"><img style="margin-top:20px;" src="../../res/images/nopass.png" /></div>
												<div v-on:click="openShopDetial(indexs,items)" style="width:50%;">查看详情</div>
											</section>
										</li>
									</ul>
								</div>
								<ul v-if="directlyTotal[0] && directlyTotal[0].length == 0 && directlyTotal[1].length == 0 && directlyTotal[2].length == 0 && directlyTotal[3].length == 0">
									<li style="width:100%;color: grey;font-size: 28px;">还没有直营店信息，赶紧申请吧！</li>
								</ul>
							</section>
						</section>
					</section>
				</template>
			</div>
		</section>

		<transition name="fade">
			<component :is="winshow" @winEvent="winEvent" :title="win.title" :detial="win.detial"></component>
		</transition>
	</section>

</template>

<script>
import storage from 'src/verdor/storage';
import lazyLoad from 'src/verdor/lazyload';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import Timer from 'src/verdor/timer';

export default {
	data() {
		return {
			isBoss: 1, //是进入品牌的页面还是店铺页面
			brandTotal: [], //所有品牌状态列表
			shopTotal: [], //所有单店状态列表
			brandList: [], //品牌列表
			directlyTotal: [], //直营店状态列表
			franchiseesTotal: [], //加盟店状态列表
			examinebranding: [], //待审核的品牌列表
			examinebrandFail: [], //审核品牌失败的
			brandListDirectly: [], //品牌直营店列表
			examineDirectlying: [], //待审核的直营店列表
			examineDirectlyFail: [], //审核失败的直营店列表
			disableExamineDirectly: [], //禁用的直营店列表
			imgHost: '', //+图片前缀
			brandListFranchisees: [], //品牌加盟店列表
			disableFranchiseesing: [], //禁用的加盟店列表
			examineFranchiseesing: [], //待审核的加盟店列表
			examineFranchiseesFail: [], //审核加盟店失败列表
			shop: [], // 单店列表
			disableShop: [], // 禁用的单店列表
			examineshop: [], //待审核的单店列表
			examineFail: [], //审核不通过的单店列表
			areaList: [], // 行业分类列表
			index1: -1, //行业分类下标
			index2: -1, //品牌选择下标
			isBrand: true, //默认显示品牌店
			isBranDeail: false, //查看直营店或加盟店默认false
			iscreatStores: false, //是否显示创建门店或创建品牌，默认不显示
			iscreatBrand: false, //是显示创建门店还是创建品牌，默认创建门店
			isJoinShop: false, //是否是加盟店默认false，显示直营店
			index: 0, //店铺类型下标，默认单店
			areaBtn: false, // 分类列表点击显示隐藏
			areaBtn1: false, // 品牌列表点击显示隐藏
			allArea: '请选择行业分类', // 分类名所显示
			allArea1: '请选择品牌', // 分类名所显示
			logoimg: '', //logo图片地址
			trademarkimg: '', //商标图片地址
			brandName: '', //创建品牌时，品牌的名字
			peopleName: '', //品牌负责人名字
			phoneNum: '', //品牌联系方式
			appSecret: '', //微信appSecret
			appId: '', //微信appid
			businessLicenseName: '', //营业执照编号
			brandId: '', //选择品牌的id
			businessLicenseimg: '', //新创建的店铺的营业执照图片地址
			isOpenShop: false, //开启关闭门店的弹窗，是开启还是关闭
			tagList: [], //默认显示的的标签列表
			selList: [], //选中的标签列表
			userData: '',
			winshow: '',
			win: {},
			win_detail: '',
			win_index: '',
			shopsIn: null,

			searchName: '', //搜索名称
			copyFranchiseesTotal: [], //直营店用于店铺名称搜索
			copyDirectlyTotal: [], //加盟店用于店铺名称搜索
			newAreaList:[],//区域列表
			leftWidth: 0,
			areaIndex:0,//区域滑块下标
			shopList:[],//所要显示的店铺
			shopIds:'',//要显示的shopIs
			nowShopId:'',//当前显示的品牌id
			areaIndex2:0,
			contentWidth:'',
			contentBoxWidth:''
			
		};
	},
	methods: {
		//搜索店铺名称
		newSearchName() {
			if (this.isJoinShop) {
				//加盟店
				console.log('加盟店');
				let franchiseesNewList = [];
				for (let i = 0; i < this.copyFranchiseesTotal.length; i++) {
					franchiseesNewList[i] = [];
					for (let j = 0; j < this.copyFranchiseesTotal[i].length; j++) {
						if (
							this.copyFranchiseesTotal[i][j].name.indexOf(this.searchName) !=
							-1
						) {
							franchiseesNewList[i].push(this.copyFranchiseesTotal[i][j]);
						}
					}
				}
				this.franchiseesTotal = franchiseesNewList;
			} else {
				//直营店
				console.log('直营店');
				let directlyNewList = [];
				for (let i = 0; i < this.copyDirectlyTotal.length; i++) {
					directlyNewList[i] = [];
					for (let j = 0; j < this.copyDirectlyTotal[i].length; j++) {
						if (
							this.copyDirectlyTotal[i][j].name.indexOf(this.searchName) != -1
						) {
							directlyNewList[i].push(this.copyDirectlyTotal[i][j]);
						}
					}
				}
				this.directlyTotal = directlyNewList;
			}
		},
		//选择店铺类型点击
		storeType: function(index) {
			if (index == 2) {
				this.allArea1 = '不选择';
				this.isNobrand = true;
				this.labelNameList = [];
			} else {
				this.allArea1 = '请选择品牌';
				this.isNobrand = false;
			}
			this.index = index;
		},
		//获取图片懒加载
		getLogoImg: function() {
			new lazyLoad({
				// 可配置参数如下:
				container: 'shopListBox', //容器 默认为window
				suffix: 'sd-src', //img属性 默认为sd-img
				className: 'cname' //class 默认为lazyImg
			});
		},
		//获取行业分类信息
		async getIndustry() {
			this.areaList = await http.GetIndustry();
			storage.session('areaList', this.areaList);
		},
		//选择非品牌店点击
		comshop1: function() {
			this.shopsIn = null;
			this.isBrand = false;
		},
		//选择品牌店点击
		comshop2: function() {
			this.isBrand = true;
		},
		//图片路径前缀+logo
		fileNameChange1: function(imgData) {
			//                  this.logoimg = imgHost + imgData.data;
			this.logoimg = imgData.data;
		},
		//图片路径前缀+商标
		fileNameChange2: function(imgData) {
			this.license = imgData.data;
			this.trademarkimg = imgData.data;
		},
		//图片路径前缀+营业执照
		fileNameChange3: function(imgData) {
			this.businessLicenseimg = imgData.data;
		},

		//创建品牌
		createBrand: function() {
			this.allArea = '请选择行业分类';
			this.brandName = '';
			this.peopleName = '';
			this.phoneNum = '';
			this.appId = '';
			this.appSecret = '';
			this.logoimg = '';
			this.trademarkimg = '';

			this.iscreatStores = true;
			this.iscreatBrand = true;
			this.$router.push('brandAudit/brandBuild');
		},
		//通过行业分类id获取对应的行业分类名称
		getIndustryDetial: function(index) {
			let list = this.areaList;
			for (let i = 0; i < list.length; i++) {
				if (index == list[i].id) {
					return list[i].name;
				}
			}
		},
		//显示行业列表
		showAreaList: function(e) {
			e.stopPropagation();
			this.areaBtn = !this.areaBtn;
		},

		// 选择行业点击确定
		selectUlArea: function(index, data) {
			this.allArea = data.name;
			this.areaBtn = !this.areaBtn;
			this.index1 = index;
		},

		//创建门店点击
		creatStoresShop: function(item) {
			storage.session('shopList', this.brandList);
			storage.session('shopIn', null);
			if (item) {
				storage.session('shopIn', item);
			}
			this.$router.push('brandAudit/UnbrandBuild');
		},

		//开通门店审核不成功查看详情
		openShopDetial: function(index, item) {
			this.$store.commit('setWin', {
				title: '提示信息',
				content: '审核失败原因',
				winType: 'confirm',
				callback: async res => {
					if (res == 'ok') {
						await http.resubmit({
							data: {
								id: item.id
							}
						});
						let brandDetial = {};
						brandDetial.name = item.name;
						brandDetial.logoImage = item.logoImage;
						brandDetial.industry = item.industry;
						brandDetial.address = item.address;
						brandDetial.contactMan = item.contactMan;
						brandDetial.telephone = item.telephone;
						brandDetial.areaTag = item.areaTag;
						if (item.ischain == '3') {
							//待审核的品牌
							this.examinebranding.push(brandDetial);
							this.examinebrandFail.splice(index, 1);
							this.returnList();
						} else if (item.ischain == '2') {
							//待审核的加盟店
							this.examineFranchiseesing.push(brandDetial);
							this.examineFranchiseesFail.splice(index, 1);
						} else if (item.ischain == '1') {
							//待审核的直营店
							this.examineDirectlying.push(brandDetial);
							this.examineDirectlyFail.splice(index, 1);
						} else if (item.ischain == '0') {
							//待审核的单店
							this.examineshop.push(brandDetial);
							this.examineFail.splice(index, 1);
						}
					}
				}
			});
		},
		slideLeft(){
			if (this.contentWidth > this.contentBoxWidth) {
				this.areaIndex2++;
				this.leftWidth = this.areaIndex2 * -200;
				if (this.leftWidth * -1 + this.contentBoxWidth >= this.contentWidth) {
					this.leftWidth = -(this.contentWidth - this.contentBoxWidth+60);
					return false;
				}
			}
		},
		slideRight(){
			if (this.leftWidth >= 0) {
				this.leftWidth = 0;
				return false;
			}
			this.leftWidth = this.leftWidth + 200;
			this.areaIndex2--;
			if (this.leftWidth >= 0) {
				this.leftWidth = 0;
				this.areaIndex2 = 0;
			}
		},
		changeArea(res){
			this.shopIds = this.newAreaList[res]?this.newAreaList[res].areaShopIds:"";
			// console.log(this.shopIds);
			this.openBrandDeail(this.shopsIn,this.isJoinShop);
		},
		async storeareaGetAllArea(shopId){
			let res = await http.storeareaGetAllArea({
				data: {
						shopId: shopId,
					}});
			if(res.length > 0){
				let str = '';
				for(let i=0;i<res.length;i++){
					str +=res[i].areaShopIds+',';
					let isEmpty = false;
					let shids =  res[i].areaShopIds;
					for(let j=0;j<this.shopList.length;j++){
						if(shids.indexOf(this.shopList[j].id) >=0){
							isEmpty = true;
							break;
						}
					}
					if(!isEmpty){
						res.splice(i,1);
						i--;
					}
				}
				let shopIds = '';//全部的ids
				for(let j=0;j<this.shopsIn.direct.length;j++){
					shopIds+=this.shopsIn.direct[j].id+",";
				}
				for(let j=0;j<this.shopsIn.franchise.length;j++){
					shopIds+=this.shopsIn.franchise[j].id+",";
				}
				let newstr = str.split(',');
				let newshopIds = shopIds.split(',');
				//根据区域筛选
				for(let i=0;i<newstr.length;i++){
					for(let j=0;j<newshopIds.length;j++){
						if(newstr[i]==newshopIds[j]){
							newshopIds.splice(j,1);
							j--;
						}
					}
				}
				let noArea = '';//无区域的shopids
				for(let i=0;i<newshopIds.length;i++){
					noArea +=  newshopIds[i]+',';
				}
				res.unshift({name: '全部', areaShopIds: shopIds});
				res.push({id: 0,name: '无区域', areaShopIds: noArea});
				// console.log(noArea);
			}
			this.newAreaList = res;
			if(this.newAreaList.length > 0){
				this.$nextTick(() => {
					this.contentWidth = this.$refs.content.clientWidth;
					this.contentBoxWidth = this.$refs.contentBox.clientWidth;
					
				});
			}
			// this.openBrandDeail(this.shopsIn,this.isJoinShop);
		},
		//查看品牌直营店加盟店点击
		openBrandDeail: function(item, bool) {
			// this.shopIds = '';
			// this.areaIndex = '0';
			// console.log(item);
			if(bool){
				this.shopList = item.franchise;
			}else{
				this.shopList = item.direct;
			}
			this.nowShopId = item.id;
			this.isBranDeail = true;
			this.isJoinShop = bool;
			this.shopsIn = item;
			this.storeareaGetAllArea(item.id);
			this.brandListDirectly = [];
			this.examineDirectlying = [];
			this.examineDirectlyFail = [];
			this.disableExamineDirectly = [];
			this.directlyTotal = [];
			this.franchiseesTotal = [];
			this.brandListFranchisees = []; //品牌加盟店列表
			this.disableFranchiseesing = []; //禁用的加盟店列表
			this.examineFranchiseesing = []; //待审核的加盟店列表
			this.examineFranchiseesFail = []; //审核加盟店失败列表
			let direct = item.direct; //直营店列表
			let franchise = item.franchise; //加盟店列表
			this.directlyTotal.push(
				this.brandListDirectly,
				this.disableExamineDirectly,
				this.examineDirectlying,
				this.examineDirectlyFail
			);
			this.franchiseesTotal.push(
				this.brandListFranchisees,
				this.disableFranchiseesing,
				this.examineFranchiseesing,
				this.examineFranchiseesFail
			);
			if (direct.length > 0 && bool == false) {
				for (let i = 0; i < direct.length; i++) {
					let obj = direct[i];
					obj.brandId = item.id;
					//将标签由字符串转化为数组
					if (obj.areaTag && obj.areaTag.constructor == String) {
						obj.areaTag = obj.areaTag.split(',');
						if (obj.areaTag[0] == '') {
							obj.areaTag.splice(0, 1);
						}
					}
					// console.log(this.shopIds);
					if(this.areaIndex == 0){
					// 	continue;
					}else{
						if(this.shopIds.indexOf(obj.id)==-1 ){
							continue;
						}
					}
					if (obj.ischain == 1) {
						//审核通过的直营店
						if (obj.status == 0) {
							this.brandListDirectly.push(obj);
							this.brandListDirectly = utils.sortByAll(
								this.brandListDirectly,
								'sort'
							);
						}
						//未审核的直营店
						if (obj.status == 1) {
							this.examineDirectlying.push(obj);
						}
						//审核失败的直营店
						if (obj.status == 2) {
							this.examineDirectlyFail.push(obj);
						}
						//禁用的直营店
						if (obj.status == 5) {
							this.disableExamineDirectly.push(obj);
						}
					}
				}
			}
			if (franchise.length > 0 && bool == true) {
				for (let i = 0; i < franchise.length; i++) {
					let obj = franchise[i];
					obj.brandId = item.id;
					//将标签由字符串转化为数组
					if (obj.areaTag && obj.areaTag.constructor == String) {
						obj.areaTag = obj.areaTag.split(',');
						if (obj.areaTag[0] == '') {
							obj.areaTag.splice(0, 1);
						}
					}
					if(this.areaIndex == 0){
					// 	continue;
					}else{
						if(this.shopIds.indexOf(obj.id)==-1 ){
							continue;
						}
					}
					//审核通过的加盟店
					if (obj.ischain == 2 && obj.status == 0) {
						this.brandListFranchisees.push(obj);
						this.brandListFranchisees = utils.sortByAll(
							this.brandListFranchisees,
							'sort'
						);
					}
					//未审核的加盟店
					if (obj.ischain == 2 && obj.status == 1) {
						this.examineFranchiseesing.push(obj);
					}
					//审核失败的加盟店
					if (obj.ischain == 2 && obj.status == 2) {
						this.examineFranchiseesFail.push(obj);
					}
					//禁用的加盟店
					if (obj.ischain == 2 && obj.status == 5) {
						this.disableFranchiseesing.push(obj);
					}
				}
			}

			//用于店铺搜索
			this.copyFranchiseesTotal = utils.deepCopy(this.franchiseesTotal);
			this.copyDirectlyTotal = utils.deepCopy(this.directlyTotal);
			this.searchName = '';
		},
		//返回品牌列表
		returnList: function() {
			// location.reload();
			// window.history.go(-1);
			this.isBranDeail = false;
			this.iscreatStores = false;
			this.shopsIn = null;
			this.shopIds = '';
			this.areaIndex = '0';
			setTimeout(() => {
				this.getLogoImg();
			}, 10);
		},
		//关闭、开启门店
		closeShop: function(item, index) {
			if (item.status == 5) {
				this.isOpenShop = true;
			} else {
				this.isOpenShop = false;
			}
			this.openWin(item, index);
		},
		winEvent(str) {
			this.winshow = '';
			if (str == 'ok') {
				this.openOrClose(this.win_detail, this.win_index);
			}
		},
		openWin(detial, index) {
			this.win_detail = detial;
			this.win_index = index;
			this.win = {
				detial,
				title: this.isOpenShop ? '开启门店' : '关闭门店'
			};
			this.winshow = 'brand-audit-win';
		},

		async openOrClose(detial, index) {
			if (this.isOpenShop) {
				//开启门店
				await http.BopenShop({
					data: {
						id: detial.id
					}
				});
				let item = detial;
				item.status = 0;
				//直营店
				if (detial.ischain == 1) {
					this.brandListDirectly.push(item);
					this.disableExamineDirectly.splice(index, 1);
				}
				//加盟店
				if (detial.ischain == 2) {
					this.brandListFranchisees.push(item);
					this.disableFranchiseesing.splice(index, 1);
				}
				//单店
				if (detial.ischain == 0) {
					this.shop.push(item);
					this.disableShop.splice(index, 1);
				}
			} else {
				await http.BcloseShop({
					data: {
						id: detial.id
					}
				});
				let item = detial;
				item.status = 5;
				//直营店
				if (detial.ischain == 1) {
					this.disableExamineDirectly.push(item);
					this.brandListDirectly.splice(index, 1);
				}
				//加盟店
				if (detial.ischain == 2) {
					this.disableFranchiseesing.push(item);
					this.brandListFranchisees.splice(index, 1);
				}
				//单店
				if (detial.ischain == 0) {
					this.shop.splice(index, 1);
					this.disableShop.push(item);
				}
			}
		},
		//获取推荐标签
		async getTagList() {
			this.tagList = await http.getAraeTag();
		},
		//退出登录
		backLogin: function() {
			storage.session(null);
			this.$router.push('/');
		},
		//申请开通门店按钮点击，跳转
		apply: function() {
			this.userData.currentShop = null;
		},
		//进入品牌或门店点击
		async joinShop(item) {
			Timer.clearAll(); //清除所有定时器
			this.$store.commit('setWin', { show: false }); //关闭所有弹窗
			let data = await http.ChooseShop({
				data: {
					shopId: item.id,
					token: this.userData.accessToken
				}
			});
			let shopList = await http.getShopList({
				data: {
					shopId: item.id,
					token: this.userData.accessToken
				}
			});
			storage.session('aside', data);
			let toRoute =
				data[0].child[0].child && data[0].child[0].child.length > 0
					? data[0].child[0].child[0].name
					: data[0].child[0].name;
			storage.session('shopList', shopList);
			document.querySelector('body').style.backgroundColor = 'rgb(255,255,255)';
			this.userData.currentShop = utils.deepCopy(item);
			this.userData.currentShop.newName = this.shopsIn
				? `${this.shopsIn.name}--${item.name}`
				: item.name;
			this.userData.accessList = data;

			storage.session('userShop', this.userData);
			storage.session('shopId', item.id);
			this.$store.commit('setCurrentPage', 'admin');
			this.$router.push({
				path: 'admin/' + toRoute
			});

			//将点击进入商铺时的id和类型记录
			storage.session('takeaway_select_data', item.id + '_' + item.ischain);
			storage.session('takeaway_shop_cObj', null);
			storage.session('takeaway_shop_id', null);
			storage.session('takeaway_shop_index', null);
			storage.session('takeaway_shop_type', null);
			storage.session('takeaway_shop_list', null);
			storage.session('itemId', item.id);
			storage.session('goodList', null); //清除商品缓存
			storage.session('areaList', null); //清除分类信息缓存
			storage.session('packList', null); //清除套餐列表缓存
			storage.session('warehouseManagerTab', null);
		},
		//body点击隐藏行业分类和品牌选择的弹出框
		bodyClick: function() {
			this.areaBtn1 = false;
			this.areaBtn = false;
		},
		getInitData() {
			this.userData = storage.session('userShop');

			if (this.userData && this.userData.accessToken) {
				if (this.userData.currentShop) {
					this.currentShop = this.userData.currentShop;
				}
			}

			this.imgHost = this.userData.uploadUrl;
			//获得是老板或者员工
			this.isBoss = this.userData.isBoss;
			// 获取登录后商铺的信息

			this.brandTotal.push(
				this.brandList,
				this.examinebranding,
				this.examinebrandFail
			);
			this.shopTotal.push(
				this.shop,
				this.disableShop,
				this.examineshop,
				this.examineFail
			);

			//单店审核成功的列表
			let allShopList = this.userData.shopList;
			if (this.userData.isBoss == 1) {
				if (allShopList.noBrand) {
					let arr = allShopList.noBrand;
					for (let i = 0; i < arr.length; i++) {
						let obj = arr[i];
						if (obj.ischain == '0') {
							if (obj.status == '0') {
								//审核成功的单店
								this.shop.push(obj);
							} else if (obj.status == '5') {
								//单店禁用的列表
								this.disableShop.push(obj);
							} else if (obj.status == '1') {
								//审核中的单店列表
								this.examineshop.push(obj);
							} else if (obj.status == '2') {
								//审核失败的单店列表
								this.examineFail.push(obj);
							}
						}
					}
				}
				if (allShopList.brand) {
					let arr = allShopList.brand;
					for (let i = 0; i < arr.length; i++) {
						let obj = arr[i];
						obj.directNum = obj.direct.length;
						obj.franchiseNum = obj.franchise.length;
						if (obj.ischain == '3') {
							if (obj.status == '0') {
								//品牌成功的列表
								this.brandList.push(obj);
							} else if (obj.status == '1') {
								//品牌审核中的列表
								this.examinebranding.push(obj);
							} else if (obj.status == '2') {
								//品牌审核失败的列表
								this.examinebrandFail.push(obj);
							}
						}
					}
				}
			} else {
				//员工登录获取店铺
				for (let i = 0; i < allShopList.length; i++) {
					if (allShopList[i].status == '0') {
						this.shop.push(allShopList[i]);
					}
				}
			}
		}
	},
	mounted: function() {
		this.getInitData();
		this.getIndustry();
		// 初始化懒加载配置
		this.getLogoImg();
		document.body.style.backgroundColor = '#F8F8F8';
		// this.storeareaGetAllArea(this.nowShopId);
	},
	components: {
		brandAuditWin: () =>
			import(/* webpackChunkName:'brand_audit_win' */ './brand_audit_win')
	},
	watch: {
		searchName: 'newSearchName'
	}
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 1440px) {
	.List {
		width: 80%;
		height: 480px;
		margin: 30px auto;
		min-width: 940px;
	}
	.mulu {
		height: 65px;
		line-height: 65px;
	}
}

@media screen and (min-width: 1441px) {
	.List {
		width: 80%;
		height: 570px;
		margin: 30px auto;
		min-width: 990px;
	}
	.mulu {
		height: 90px;
		line-height: 90px;
	}
}

#login-audit {
	width: 100%;
	// height: 100%;
	// min-height: 700px;
}

#login-audit .title {
	width: 100%;
	height: 50px;
	max-width: 1240px;
}

#login-audit .audit {
	width: 100%;
	height: 50px;
	margin: 50px auto;
	text-align: center;
}

#login-audit .shopList {
	width: 80%;
	height: 100%;
	padding-bottom: 50px;
	margin: 30px auto;
}

#login-audit .shopList li {
	width: 100%;
	min-width: 980px;
	height: 80px;
	color: #333;
	background: #fff;
	padding-left: 30px;
	margin-bottom: 30px;
	font-size: 16px;
	font-weight: bold;
	box-shadow: 5px 12px 20px #ccc;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

#login-audit .shopList li div {
	height: 80px;
	line-height: 80px;
	float: left;
}

#login-audit .shopList li div .shopBtn {
	width: 100%;
	height: 60px;
	text-align: center;
	cursor: pointer;
	line-height: 60px;
	vertical-align: middle;
	text-overflow: ellipsis;
	overflow: hidden;
	vertical-align: middle;
	text-overflow: ellipsis;
	/*white-space: nowrap;*/
	padding: 0 10px;
}

#login-audit .return {
	width: 130px;
	height: 50px;
	line-height: 50px;
	float: left;
	margin-top: 20px;
	margin-left: 445px;
}

#login-audit .nextsubmit {
	width: 130px;
	height: 50px;
	line-height: 50px;
	float: left;
	margin-top: 20px;
	margin-left: 40px;
}

.mulu {
	width: 50%;
	font-size: 22px;
	text-align: center;
	float: left;
	color: #444;
	border-bottom: 2px solid #efefef;
	cursor: pointer;
}

.ont {
	border-bottom: 2px solid #27a8df;
	color: #29a8df;
}

.shoplist {
	width: 98%;
	padding: 2% 1%;
	height: auto;
	overflow: auto;
	margin-top: 90px;
}

.shoplist ul {
	width: 100%;
	height: 90px;
	border-bottom: 1px solid #e6e6e6;
}

.shoplist ul li {
	width: 10%;
	height: 100%;
	line-height: 90px;
	text-align: center;
	color: #333;
	float: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.shoplist ul li div {
	width: 50%;
	height: 90px;
	line-height: 90px;
	float: left;
	color: #28a6e0;
}

.shoplist ul li .oBox {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.List .title {
	width: 100%;
	font-size: 16px;
	font-weight: bold;
	height: 47px;
	color: #333;
	line-height: 50px;
}

.shoplist .areaTagList {
	width: 100%;
	height: 20px;
	position: absolute;
	bottom: 8px;
	text-align: center;
	line-height: 20px;
}

.shoplist .areaTag {
	height: 20px;
	border-radius: 5px;
	background: #fff3e0;
	color: #ff9e12;
	margin-left: 8px;
	padding: 0 11px;
	display: inline-block;
}

.creatStores {
	width: 80%;
	height: 630px;
	min-width: 1024px;
	margin: 35px auto;
	background-color: #fff;
	overflow: hidden;
}

.creatStores .title {
	margin-left: 60px;
	line-height: 50px;
	font-weight: bold;
}

.creatStores .title .titleName {
	width: 120px;
	float: left;
	font-size: 16px;
}

.creatStores .title .titleDashed {
	width: 760px;
	border-bottom: 1px dashed #ccc;
	float: left;
	margin-top: 24px;
	font-size: 16px;
	margin-left: -30px;
}

.creatStores .oTop {
	width: 100%;
	height: 210px;
	padding-left: 100px;
}

.creatStores .oTop .obox {
	width: 100%;
	height: 40px;
	margin-top: 30px;
	margin-top: 30px;
}

.creatStores .oTop .obox .required {
	float: left;
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: right;
	margin-right: 10px;
}

.creatStores .oTop .obox .input {
	width: 260px;
	border: 1px solid #ccc;
	float: left;
}

.creatStores .oLeft {
	width: 50%;
	height: 435px;
	padding-left: 45px;
	float: left;
}

.creatStores .oLeft .obox {
	width: 100%;
	height: 40px;
	margin-top: 28px;
}

.creatStores .oLeft .obox .required {
	float: left;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: right;
	margin-right: 10px;
}

.creatStores .oLeft .obox .input {
	width: 335px;
	border: 1px solid #ccc;
	float: left;
}

.creatStores .obox .tacitly {
	float: left;
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	background: #f4f5f7;
}

.selectbtns span {
	margin-left: 20px;
	min-width: 80px;
}

.statisticsList {
	position: relative;
	line-height: 41px;
}

.statisticsList input {
	text-align: center;
	display: block;
	float: left;
	height: 41px;
	width: 158px;
	outline: none;
	border: 0;
	border-right: 1px #b3b3b3 solid;
}

.statisticsList ul {
	width: 100%;
	margin: 0;
	position: absolute;
	top: 40px;
	left: 0;
	z-index: 10;
	background: #fff;
	max-height: 300px;
	overflow: auto;
	border: 1px #b3b3b3 solid;
	border-top: 0;
}

.statisticsList ul li {
	text-align: center;
	height: 41px;
	border: 1px #ccc solid;
	background: #fff;
	cursor: pointer;
	border-right: 0 !important;
	border-left: 0 !important;
	border-bottom: 0 !important;
}

.statisticsList ul li:last-of-type {
	border-bottom: 0;
}

.tableListInp {
	height: 40px;
	color: #666666;
	border: #b3b3b3 solid 1px;
	cursor: pointer;
}

.tableListInp .oSpan {
	height: 39px;
	line-height: 39px;
	width: 215px;
	display: block;
	float: left;
	text-align: center;
	border-right: 1px #b3b3b3 solid;
}

.tableListInp div {
	width: 40px;
	height: 40px;
	position: relative;
	z-index: 5;
}

.tableListInp div i {
	height: 10px;
	width: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-top: -5px;
	margin-left: -5px;
	border-top: 10px solid #b3b3b3;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	box-sizing: border-box;
}

.addinput {
	width: 165px;
	height: 34px;
	float: left;
	border: 1px solid #cdcdcd;
	margin-left: 18px;
}

.oDiv {
	width: 34px;
	height: 32px;
	border-left: 1px solid #cdcdcd;
	float: right;
}

.obox .selectbtns {
	margin-left: 85px;
}

.oZhe {
	width: 100%;
	height: 44px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 6;
	background-color: #fff;
	filter: alpha(opacity=60);
	opacity: 0.6;
}

.aTitle {
	width: 100%;
	height: 20px;
	line-height: 20px;
	margin-left: 61px;
	margin-top: 30px;
}

.aTitle i {
	width: 3px;
	height: 20px;
	background-color: #ee931e;
	float: left;
	display: block;
}

.aTitle h3 {
	width: 60%;
	height: 20px;
	line-height: 20px;
	float: left;
	margin-left: 20px;
	font-weight: bold;
}

.labeldetial {
	height: 40;
	line-height: 40px;
	float: left;
	position: relative;
}

.labeldetial:hover .dClose {
	display: block;
}

.labeldetial .dClose {
	position: absolute;
	top: -6px;
	right: 0px;
	width: 10px;
	height: 10px;
	display: none;
	cursor: pointer;
}

#login-audit {
	.List {
		.top_section {
			margin-bottom: 10px;
			height: 40px;
			line-height: 40px;
			h3 {
				float: left;
				font-size: 16px;
				font-weight: 700;
				color: #333;
			}
			a {
				width: 100px;
				height: 40px;
				line-height: 40px;
				float: right;
				border: 1px solid #b4b4b4;
				color: #b4b4b4;
			}
			input {
				width: 240px;
				border: 1px solid #b4b4b4;
				margin-right: 10px;
			}
		}
	}
}

.area{
	height: 50px;
	padding: 0 30px;
}
.area .icon{
	display: inline-block;
	width: 20px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	font-size: 20px;
}
.area .left{
	position: absolute;
	left: 0;
	top: 0px;
}
.area .right{
	position: absolute;
	right: 0;
	top: 0px;
}
.areabox{
	position: relative;
	width: 100%;
	height: 50px;
	overflow: hidden;
}
.areabox .box{
	position: absolute;
	transition: 0.5s;
	white-space:nowrap;
}
</style>