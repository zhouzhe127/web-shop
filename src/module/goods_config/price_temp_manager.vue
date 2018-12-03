<!--
 * @Description: 价格模板管理
 * @Author: han
 * @Date: 2018-11-22 15:02:48
 * @LastEditTime: 2018-12-03 12:46:15
 * @LastEditors: Please set LastEditors
 -->

<template>
	<div class="price_temp_manager">
		<!-- 筛选下拉等 -->
		<div class="price_temp_filter clearfix">
			<!-- 分类筛选 -->
			<div class="filter-classify fl">
				<!-- 分类选择 -->
				<!-- 一级分类 -->
				<elCategory
					@selectCategory="newselectOneArea"
					:categoryArr="category"
					:itemIndex="oneIndex"
					:itemArea="oneArea"
				></elCategory>
				<!-- 二级分类 -->
				<elCategory
					@selectCategory="newselectTwoArea"
					:categoryArr="child"
					:itemIndex="twoIndex"
					:itemArea="twoArea"
				></elCategory>
			</div>
			<!-- 搜索 -->
			<div class="filter_search fl">
				<el-input
					placeholder="请输入名称/简码/编码"
					clearable
					v-model="search"
					@input="funSearchkeyUp"
				>
					<el-button
						slot="append"
						icon="el-icon-search"
						@click="funSearchkeyUp"
					></el-button>
				</el-input>
			</div>

			<!-- <el-button type="primary" @click="getClearPricetemplate">清除缓存</el-button> -->
		</div>
		<hr style="border:0;background-color:#ebeef5;height:1px;margin:20px 0;">
		<!-- 是否开启会员价 -->
		<el-checkbox v-model="vipPriceOpen">开启会员价</el-checkbox>
		<!-- 价格模板列表 -->
		<div class="price_temp_table">
			<div class="table_title">商品列表·共{{goodsList.length}}个条目</div>

			<!-- 默认不显示会员价列表 -->
			<div
				class="table-box"
				v-show="!vipPriceOpen"
			>
				<el-table
					style="width:100%;margin-top:-1px;"
					:header-cell-style="{'background-color':'#f5f7fa'}"
					:data="nowGoods"
					max-height="600"
					:cell-style="{position:'relative'}"
					:row-style="{position:'relative'}"
					border
					stripe
				>
					<el-table-column
						min-width="100"
						type="index"
						fixed
						label="序号"
						align="center"
					></el-table-column>
					<el-table-column
						min-width="100"
						fixed
						label="商品名称"
						align="center"
					>
						<template slot-scope="scope">{{scope.row.goodsName}}</template>
					</el-table-column>
					<el-table-column
						min-width="100"
						fixed
						label="编码"
						align="center"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.categoryCode!==''&&scope.row.goodsCode!==''&&scope.row.id*1<10000">{{scope.row.categoryCode}}-{{scope.row.goodsCode}}</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						min-width="100"
						label="原始价格"
						align="center"
					>
						<template slot-scope="scope">{{scope.row.price}}</template>
					</el-table-column>
					<el-table-column
						min-width="240"
						width="300"
						v-if="tableTemplate.templateTitle.length > 0"
						v-for="(item,index) in 
								tableTemplate.templateTitle"
						class-name="edithead"
						:key="index"
					>
						<!-- 自定义表头 -->
						<template
							slot="header"
							slot-scope="scope"
						>
							<div
								class="cell-block"
								style="justify-content:space-between;"
							>
								<template v-if="thEditer && thEditerIndex == index">
									<el-input
										v-model="thEditerName"
										ref="editHeadSucessRef"
										maxlength="10"
										@blur="editHeadSucess(tableTemplate.templateTitle[index],index)"
										style="width:150px;padding:0"
									></el-input>
									<div>
										<!-- 保存按钮 -->
										<span
											class="edit-btn"
											@click.stop="editHeadSucess(tableTemplate.templateTitle[index],index)"
										>
											<i
												class="el-icon-success"
												style="color:#E0BA4F"
											></i>
										</span>
										<!-- 取消按钮 -->
										<span
											class="edit-btn"
											@click.stop="editHeadCancel"
										>
											<i
												class="el-icon-error"
												style="color:#666;"
											></i>
										</span>
									</div>
								</template>
								<template v-else>
									<span>{{tableTemplate.templateTitle[index].name ? tableTemplate.templateTitle[index].name : '价格模板'}}</span>
									<div style="order:1;width:150px;">
										<!-- 左移动 -->
										<span
											class="edit-btn move-btn"
											title="向左移动"
											:class="{'disabled':index == 0}"
											@click.stop="handleMoveTemp(tableTemplate.templateTitle[index],index,dir='left')"
										>
											<i class="el-icon-caret-left"></i>
										</span>
										<!-- 右边移动 -->
										<span
											class="edit-btn move-btn"
											title="向右移动"
											:class="{'disabled':index == 9 || tableTemplate.templateTitle.length <=1 
															|| index + 1 >= tableTemplate.templateTitle.length} "
											@click.stop="handleMoveTemp(tableTemplate.templateTitle[index],index,dir='right')"
										>
											<i class="el-icon-caret-right"></i>
										</span>
										<!-- 编辑按钮 -->
										<span
											class="edit-btn"
											title="编辑名称"
											@click.stop="handleEditHeader(tableTemplate.templateTitle[index],index)"
										>
											<i
												style="font-size:16px;"
												class="el-icon-edit-outline"
											></i>
										</span>
										<span
											class="edit-btn"
											title="删除模板"
											@click.stop="handleDeleteTemp(tableTemplate.templateTitle[index].id,index)"
										>
											<i
												class="el-icon-delete"
												style="color:red;"
											></i>
										</span>
									</div>
								</template>
							</div>
						</template>
						<!-- 实际数据 -->
						<template slot-scope="scope">
							<div class="cell-block">
								<div v-if="columnId == scope.column.id && cellIndex == scope.$index">
									<el-input
										style="width:100px;padding:0;"
										@keyup.enter.native="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
										ref="editTempInputRef"
										v-model="tempEditPrice"
									></el-input>
									<!-- 保存按钮 -->
									<span
										class="edit-btn"
										@click.stop="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
									>
										<i
											class="el-icon-success"
											style="color:#E0BA4F"
										></i>
									</span>
									<!-- 取消按钮 -->
									<span
										class="edit-btn"
										@click.stop="editCancel(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
									>
										<i
											class="el-icon-error"
											style="color:#666;"
										></i>
									</span>
								</div>
								<!-- 对应价格 -->
								<span v-else>
									<span v-if="tableTemplate.priceTemplate[index].list">{{tableTemplate.priceTemplate[index].list[scope.$index].itemPrice}}</span>
								</span>
								<div
									v-if="!(columnId == scope.column.id && cellIndex == scope.$index)"
									class="eidt-price-btn"
								>
									<!-- 编辑按钮 -->
									<span
										@click.stop="changeTemp(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
										class="edit-btn"
									>
										<i class="el-icon-edit-outline"></i>
									</span>
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<!-- 显示会员价列表 -->
			<div
				class="table-box"
				v-show="vipPriceOpen"
			>
				<el-table
					style="width:100%;margin-top:-1px;"
					:header-cell-style="{'background-color':'#f5f7fa'}"
					:data="nowGoods"
					max-height="600"
					:cell-style="{position:'relative'}"
					:row-style="{position:'relative'}"
					border
					stripe
				>
					<el-table-column
						min-width="100"
						type="index"
						fixed
						label="序号"
						align="center"
					></el-table-column>
					<el-table-column
						min-width="100"
						fixed
						label="商品名称"
						align="center"
					>
						<template slot-scope="scope">{{scope.row.goodsName}}</template>
					</el-table-column>
					<el-table-column
						min-width="100"
						fixed
						label="编码"
						align="center"
					>
						<template slot-scope="scope">
							<span v-if="scope.row.categoryCode!==''&&scope.row.goodsCode!==''&&scope.row.id*1<10000">{{scope.row.categoryCode}}-{{scope.row.goodsCode}}</span>
							<span v-else>-</span>
						</template>
					</el-table-column>
					<el-table-column
						min-width="150"
						label="原始价格"
						align="center"
					>
						<el-table-column
							min-width="75"
							label="基础价"
							align="center"
						>
							<template slot-scope="scope">{{scope.row.price}}</template>
						</el-table-column>
						<el-table-column
							min-width="75"
							label="会员价"
						>
							<template slot-scope="scope">{{scope.row.vipPrice}}</template>
						</el-table-column>
					</el-table-column>
					<el-table-column
						min-width="360"
						width="400"
						v-if="tableTemplate.templateTitle.length > 0"
						align="center"
						v-for="(item,index) in 
								tableTemplate.templateTitle"
						class-name="edithead"
						:key="index"
					>
						<!-- 自定义表头 -->
						<template
							slot="header"
							slot-scope="scope"
						>
							<div
								class="cell-block"
								style="justify-content:space-between;"
							>
								<template v-if="thEditer && thEditerIndex == index">
									<el-input
										v-model="thEditerName"
										ref="editHeadSucessRef"
										maxlength="10"
										@blur="editHeadSucess(tableTemplate.templateTitle[index],index)"
										style="width:150px;padding:0"
									></el-input>
									<div>
										<!-- 保存按钮 -->
										<span
											class="edit-btn"
											@click.stop="editHeadSucess(tableTemplate.templateTitle[index],index)"
										>
											<i
												class="el-icon-success"
												style="color:#E0BA4F"
											></i>
										</span>
										<!-- 取消按钮 -->
										<span
											class="edit-btn"
											@click.stop="editHeadCancel"
										>
											<i
												class="el-icon-error"
												style="color:#666;"
											></i>
										</span>
									</div>
								</template>
								<template v-else>
									<span>{{tableTemplate.templateTitle[index].name ? tableTemplate.templateTitle[index].name : '价格模板'}}</span>
									<!-- 编辑按钮 -->
									<div style="order:1;width:150px;">
										<!-- 左移动 -->
										<span
											class="edit-btn move-btn"
											title="向左移动"
											:class="{'disabled':index == 0}"
											@click.stop="handleMoveTemp(tableTemplate.templateTitle[index],index,dir='left')"
										>
											<i class="el-icon-caret-left"></i>
										</span>
										<!-- 右边移动 -->
										<span
											class="edit-btn move-btn"
											title="向右移动"
											:class="{'disabled':index == 9 || tableTemplate.templateTitle.length <=1 
																|| index + 1 >= tableTemplate.templateTitle.length} "
											@click.stop="handleMoveTemp(tableTemplate.templateTitle[index],index,dir='right')"
										>
											<i class="el-icon-caret-right"></i>
										</span>
										<span
											class="edit-btn"
											title="编辑名称"
											@click.stop="handleEditHeader(tableTemplate.templateTitle[index],index)"
										>
											<i
												style="font-size:16px;"
												class="el-icon-edit-outline"
											></i>
										</span>
										<span
											class="edit-btn"
											title="删除模板"
											@click.stop="handleDeleteTemp(tableTemplate.templateTitle[index].id,index)"
										>
											<i
												class="el-icon-delete"
												style="color:red;"
											></i>
										</span>
									</div>
								</template>
							</div>
						</template>
						<!-- 实际数据 -->
						<el-table-column
							min-width="180"
							label="基础价"
							align="center"
						>
							<template slot-scope="scope">
								<div class="cell-block">
									<div v-if="columnId == scope.column.id && cellIndex == scope.$index">
										<el-input
											style="width:80px;padding:0;"
											ref="editTempInputRef"
											@keyup.enter.native="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
											v-model="tempEditPrice"
										></el-input>
										<!-- 保存按钮 -->
										<span
											class="edit-btn"
											@click.stop="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
										>
											<i
												class="el-icon-success"
												style="color:#E0BA4F"
											></i>
										</span>
										<!-- 取消按钮 -->
										<span
											class="edit-btn"
											@click.stop="editCancel(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
										>
											<i
												class="el-icon-error"
												style="color:#666;"
											></i>
										</span>
									</div>
									<span v-else>
										<span v-if="tableTemplate.priceTemplate[index].list">{{tableTemplate.priceTemplate[index].list[scope.$index].itemPrice}}</span>
									</span>
									<div
										v-if="!(columnId == scope.column.id && cellIndex == scope.$index)"
										class="eidt-price-btn"
									>
										<!-- 编辑按钮 -->
										<span
											@click.stop="changeTemp(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='temp')"
											class="edit-btn"
										>
											<i class="el-icon-edit-outline"></i>
										</span>
									</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column
							min-width="180"
							label="会员价"
							align="center"
						>
							<template slot-scope="scope">
								<div
									class="cell-block"
									:class="{'grey':!tableTemplate.priceTemplate[index].list[scope.$index].isVip}"
								>
									<template v-if="tableTemplate.priceTemplate[index].list[scope.$index].isVip">
										<div v-if="columnId == scope.column.id && cellIndex == scope.$index">
											<el-input
												style="width:100px;padding:0;"
												ref="editTempInputRef"
												@keyup.enter.native="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='vip')"
												v-model="tempEditVipPrice"
											></el-input>
											<!-- 保存按钮 -->
											<span
												class="edit-btn"
												@click.stop="editSucess(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='vip')"
											>
												<i
													class="el-icon-success"
													style="color:#E0BA4F"
												></i>
											</span>
											<!-- 取消按钮 -->
											<span
												class="edit-btn"
												@click.stop="editCancel(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='vip')"
											>
												<i
													class="el-icon-error"
													style="color:#666;"
												></i>
											</span>
										</div>
										<span v-else>
											<span v-if="tableTemplate.priceTemplate[index].list">{{tableTemplate.priceTemplate[index].list[scope.$index].vipPrice}}</span>
										</span>
									</template>

									<template v-else-if="!tableTemplate.priceTemplate[index].list[scope.$index].isVip">
										<span>--</span>
									</template>

									<div
										v-if="!(columnId == scope.column.id && cellIndex == scope.$index)"
										class="eidt-price-btn"
									>
										<!-- 编辑按钮 -->
										<span
											v-if="tableTemplate.priceTemplate[index].list[scope.$index].isVip"
											@click.stop="changeTemp(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='vip')"
											class="edit-btn"
										>
											<i class="el-icon-edit-outline"></i>
										</span>
										<!--  -->
										<el-switch
											v-model="tableTemplate.priceTemplate[index].list[scope.$index].isVip"
											@change="handleVipShowChange(tableTemplate.templateTitle[index],index,scope.$index,scope.column,type='vip')"
											:width="30"
											class="vip-pirce-switch"
											active-color="#E8C148"
											inactive-color="#D2D2CF"
										></el-switch>
									</div>
								</div>
							</template>
						</el-table-column>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 商品分页组件 -->
		<div class="price_temp_pagination">
			<el-pagination
				background
				@size-change="sizeChange"
				@current-change="pageClick"
				:current-page="Number(currentPage)"
				:page-count="Number(totalNum)"
				:page-size="Number(pageSize)"
				layout="sizes, prev, pager, next, jumper"
				:page-sizes="[10,20,30,50]"
			></el-pagination>
		</div>

		<!-- 添加模板弹窗 -->
		<win
			v-if="winEventShow"
			width="300"
			height="90"
			@winEvent="winEvent"
			:align="'center'"
		>
			<div
				slot="content"
				style="padding:0 30px;margin-top:25px;"
			>
				<el-input
					maxlength="10"
					v-model="addTempName"
					placeholder="请输入模板名称"
				></el-input>
				<p style="margin-top:10px;color:red;">
					<em>*</em>最多可输入10个字
				</p>
			</div>
		</win>
	</div>
</template>

<script>
import global from "src/manager/global";
import storage from "src/verdor/storage";
import http from "src/manager/http";
import utils from "src/verdor/utils";
export default {
	name: "price_temp_manager",
	data() {
		return {
			search: "",
			oneArea: {
				name: "请选择一级分类",
				id: -1, //一级分类id
				show: false
			},
			twoArea: {
				name: "请选择二级分类",
				index: -2, //二级分类id
				show: false
			},
			oneIndex: -1, //一级分类下标
			twoIndex: -1, //二级分类下标

			category: [], //所有一级分类
			child: [], //所有二级分类

			currentPage: 1,
			totalNum: 0,
			pageSize: 10,

			nowGoods: [],
			vipPriceOpen: false, // 会员价是否开启

			allGoods: [],
			goodsList: [],

			requestNum: 1000, //一次请求数量
			requestPage: 1, //请求的第几页
			requestTotal: 1, //请求的总页数

			shopId: "",
			imgHost: "",
			industry: 0,
			brandId: 0,
			ischain: null,
			searchGoods: [],
			tempGoods: [],
			goodIds: "",
			tableTemplate: {
				priceTemplate: [],
				templateTitle: []
			},
			cellIndex: -1,
			columnId: "",
			tempEditPrice: "",
			tempEditVipPrice: "",

			thEditer: false,
			thEditerName: "",
			thEditerIndex: -1,
			winEventShow: false,
			addTempName: "价格模板",
			vipPriceShow: false,
			numList: [],
		};
	},
	created() {
		this.initPageTools();
	},
	methods: {
		async handleVipShowChange(item, index, sindex, column, type) {
			let price = this.tableTemplate.priceTemplate[index].list[sindex];
			let isVip = price.isVip == true ? "1" : "0";

			let data = await http.editPricetemplate({
				data: {
					priceTemplateId: price.id,
					priceTemplateItemId: price.itemId,
					priceTemplateItemPrice: price.itemPrice,
					priceTemplateVipPrice: price.vipPrice,
					priceTemplateIsVip: isVip
				}
			});
			this.initPage(this.tempGoods);
			this.getPricetemplateData(this.goodIds);
			this.vipPriceShow = isVip;
		},
		// 移动模板
		async handleMoveTemp(item, index, dir) {
			if (this.tableTemplate.templateTitle.length <= 1) return;
			if (dir == "left" && index == 0) return;
			if (dir == "right" && index == 9) return;
			if (
				dir == "right" &&
				index + 1 >= this.tableTemplate.templateTitle.length
			) {
				return;
			}

			let beforeSort = item.sort;
			let afterSort = null;

			if (dir == "left") {
				if (afterSort == 1) return;
				afterSort = item.sort - 1;
			} else if (dir == "right") {
				if (afterSort == 10) return;
				afterSort = item.sort + 1;
			}

			console.log("before:" + beforeSort, "after:" + afterSort);

			let data = await http.moveSortPricetemplate({
				data: {
					id: item.id,
					beforeSort: beforeSort,
					afterSort: afterSort
				}
			});
			if (data) {
				this.initPage(this.tempGoods);
				this.thEditerName = item.name;
			}
		},
		// 编辑头部
		handleEditHeader(item, index) {
			this.thEditer = true;
			this.thEditerIndex = index;
			this.thEditerName = item.name ? item.name : "价格模板";
			this.$nextTick(() => {
				this.$refs.editHeadSucessRef.forEach(el => {
					el.focus();
				});
			});
		},
		// 编辑头部名称提交
		async editHeadSucess(item, index) {
			if (this.thEditerName.length <= 0) {
				this.$store.commit("setWin", {
					title: "温馨提示",
					content: "模板名称不能为空",
					winType: "alert",
					callback: res => {
						if (res == "ok") {
						}
					}
				});
				return;
			}
			let data = await http.editPricetemplate({
				data: {
					templateId: item.id,
					templateName: this.thEditerName
				}
			});
			if (data) {
				this.initPage(this.tempGoods);
				this.getPricetemplateData(this.goodIds);
				this.thEditer = false;
				this.thEditerName = "";
				this.thEditerIndex = -1;
			}
		},
		// 取消编辑头部名称
		editHeadCancel() {
			this.thEditer = false;
			this.thEditerName = "";
			this.thEditerIndex = -1;
		},
		// 点击编辑价格
		changeTemp(item, index, sindex, column, type) {
			console.log(item, "jige");
			let price = this.tableTemplate.priceTemplate[index].list[sindex];
			console.log(price, "00");
			this.columnId = column.id;
			this.cellIndex = sindex;

			if (type == "vip") {
				this.tempEditVipPrice = price.vipPrice;
			} else {
				this.tempEditPrice = price.itemPrice;
			}
			this.$nextTick(() => {
				this.$refs.editTempInputRef.forEach(el => {
					el.focus();
				});
			});
		},
		async editSucess(item, index, sindex, column, type) {
			let price = this.tableTemplate.priceTemplate[index].list[sindex];
			let isVip = price.isVip == true ? "1" : "0";
			let data = null;

			if (
				parseInt(this.tempEditVipPrice).toString().length >= 6 ||
				parseInt(this.tempEditPrice).toString().length >= 6
			) {
				this.$store.commit("setWin", {
					title: "温馨提示",
					content: "价格有误，请重新输入！",
					winType: "alert"
				});
				return;
			}

			if (type == "vip") {
				data = await http.editPricetemplate({
					data: {
						priceTemplateId: price.id,
						priceTemplateItemId: price.itemId,
						priceTemplateItemPrice: price.itemPrice,
						priceTemplateIsVip: isVip,
						priceTemplateVipPrice: this.tempEditVipPrice
					}
				});
			} else {
				data = await http.editPricetemplate({
					data: {
						priceTemplateId: price.id,
						priceTemplateItemId: price.itemId,
						priceTemplateVipPrice: isVip,
						priceTemplateItemPrice: this.tempEditPrice
					}
				});
			}

			if (data) {
				this.columnId = "";
				this.cellIndex = -1;
				this.initPage(this.tempGoods);
			}
		},
		editCancel(item, index, sindex, column, type) {
			this.columnId = "";
			this.cellIndex = -1;
			let price = this.tableTemplate.priceTemplate[index].list[sindex];
			if (type == "vip") {
				this.tempEditVipPrice = price.vipPrice;
			} else {
				this.tempEditPrice = price.itemPrice;
			}
		},
		// 删除模板
		async handleDeleteTemp(id) {
			this.$store.commit("setWin", {
				title: "温馨提示",
				content: "确定删除此模板？",
				winType: "alert",
				callback: res => {
					if (res == "ok") {
						this.deleteTempWin(id);
					}
				}
			});
		},
		// 删除确认弹窗
		async deleteTempWin(id) {
			let data = await http.deletePricetemplate({
				data: {
					id: id
				}
			});
			if (data) {
				this.initPage(this.tempGoods);
			}
		},

		//  初始化头部按钮
		initPageTools() {
			let arr = [
				{
					name: "添加价格列表",
					type: 7,
					icon: "el-icon-plus",
					className: "primary",
					fn: () => {
						this.addTempWinShow();
					}
				}
			];
			this.$store.commit("setPageTools", arr);
		},
		// 添加模板弹窗
		addTempWinShow() {
			this.winEventShow = true;
		},
		// 添加价格列表
		handleAddPriceTab() {
			let param = { name: this.addTempName };
			http
				.createPricetemplate({
					data: param
				})
				.then(res => {
					this.getPricetemplateData(this.goodIds);
				});
		},
		// 获取模板
		async getPricetemplateData(goodIds) {
			let data = await http.getPricetemplate({
				data: {
					ids: goodIds ? goodIds : this.goodIds
				}
			});

			for (let k = 0; k < data.priceTemplate.length; k++) {
				data.priceTemplate[k].map(item => {
					item.isVip == "1" ? (item.isVip = true) : (item.isVip = false);
				});
			}
			let arr = [];
			for (let i = 0; i < data.priceTemplate.length; i++) {
				arr[i] = {};
				arr[i].list = data.priceTemplate[i];
				arr[i].sort = data.templateTitle[i].sort;
			}

			arr.sort((a, b) => {
				return a.sort - b.sort;
			});

			this.tableTemplate.priceTemplate = arr;

			data.templateTitle.sort((a, b) => {
				return a.sort - b.sort;
			});
			this.tableTemplate.templateTitle = data.templateTitle;
			console.log(this.tableTemplate, "sortSata");
		},
		//初始化数据
		initData() {
			let userData = storage.session("userShop");
			this.imgHost = userData.uploadUrl;
			this.shopId = userData.currentShop.id;
			for (let key of ["industry", "brandId", "ischain"]) {
				this[key] = userData.currentShop[key];
			}
		},
		// 一级分类
		newselectOneArea(index) {
			this.oneIndex = index;
			this.twoIndex = -1;
			this.showArea = false;
			let item = this.category[index];
			this.oneArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.selectOneArea(item, index);
		},
		// 二级分类
		newselectTwoArea(index) {
			this.twoIndex = index;
			let item = this.child[index];
			this.showTArea = false;
			this.selectTwoArea(item, index);
		},
		selectOneArea(item, index, type) {
			this.tableTemplate = {
				priceTemplate: [],
				templateTitle: []
			};
			this.search = "";
			if (!type) {
				//如果是从分类点击进入，则页码为1，反之为原来的页数
				this.currentPage = 1;
			}
			this.oneIndex = index;
			this.twoArea = {
				id: -2,
				name: "请选择二级分类",
				show: false
			};
			this.oneArea = {
				id: item.id,
				name: item.name,
				show: false
			};
			this.child = item.child;
			this.child || (this.child = []);

			this.tempGoods = this.pageGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				this.oneArea.id
			);
			if (this.search.trim().length != 0) {
				this.searchGoods = this.funSearchGoods(this.tempGoods);
			}
			this.initPage(this.tempGoods);
		},
		selectTwoArea(item, index, type) {
			this.tableTemplate = {
				priceTemplate: [],
				templateTitle: []
			};
			this.search = "";
			if (!type) {
				//如果是从分类点击进入，则页码为1，反之为原来的页数
				this.currentPage = 1;
			}
			this.twoIndex = index;
			this.twoArea = {
				id: item.id,
				name: item.name,
				show: false
			};

			this.tempGoods = this.filterGoodsByCategoryByPid(
				this.goodsList,
				this.twoArea.id
			);

			console.log(this.goodsList.length, "this.goodsList,");
			if (this.search.trim().length != 0) {
				this.searchGoods = this.funSearchGoods(this.tempGoods);
			}

			this.initPage(this.tempGoods);
		},
		//根据所提供的商品和分类,将商品分类
		filterGoodsByCategoryByPid(goods, id, child) {
			if (id == -1) return goods;
			let arr = [];

			goods.forEach(ele => {
				ele.cids || (ele.cids = []);
				// 一级分类的id
				ele.cids.some(e => {
					if (e == id) {
						arr.push(ele);
						return true;
					}
					if (child) {
						for (let i = 0; i < child.length; i++) {
							ele.cids.some(v => {
								if (v == child[i].id) {
									arr.push(ele);
									return true;
								}
							});
						}
					}
				});
			});
			// 根据id去重
			arr = this.combineObjectInList(arr, "id");
			return arr;
		},
		combineObjectInList(arr, item) {
			//数组去除重复，item为重复判定项，list为重复记录需要累加的值的数组
			var obj = {};
			var a = [];
			for (var i in arr) {
				if (!obj[arr[i][item]]) {
					obj[arr[i][item]] = this.copyObj(arr[i]); //数组克隆
				}
			}
			for (var k in obj) {
				a.push(obj[k]);
			}
			return a;
		},
		copyObj(obj) {
			//obj arr 对象的克隆（区分于指针赋值）
			if (obj.constructor == Array) {
				var a = [];
				for (var i in obj) {
					a.push(obj[i]);
				}
				return a;
			} else {
				var o = {};
				for (var i in obj) {
					o[i] = obj[i];
				}
				return o;
			}
		},
		//商品搜索
		funSearchkeyUp() {
			this.tableTemplate = {
				priceTemplate: [],
				templateTitle: []
			};
			this.searchGoods = this.funSearchGoods(this.tempGoods);
			this.currentPage = 1;
			this.initPage(this.searchGoods);
		},
		//返回搜索的结果
		funSearchGoods(goodsList) {
			this.tableTemplate = {
				priceTemplate: [],
				templateTitle: []
			};
			let tempGoods = [];
			if (!this.search || this.search.trim().length == 0) {
				return goodsList;
			}
			this.search = this.search.trim();
			tempGoods = goodsList.filter(ele => {
				let BC = "" + ele.BC;
				BC = BC.toLowerCase();
				let categoryCode = ele.categoryCode.toLowerCase();
				let goodsCode = ele.goodsCode.toLowerCase();
				let goodcode = categoryCode + "-" + goodsCode;
				let name = ele.goodsName.toLowerCase();
				let search = this.search.toLowerCase();
				if (BC && BC.indexOf(search) > -1) return true;
				if (name && name.indexOf(search) > -1) return true;
				if (categoryCode && categoryCode.indexOf(search) > -1) return true;
				if (goodsCode && goodsCode.indexOf(search) > -1) return true;
				if (goodcode && goodcode.indexOf(search) > -1) return true;
			});
			return tempGoods;
		},
		async getHttp(url, data = {}) {
			let res = await http[url]({ data });
			return res;
		},
		//获取分类
		async getCate() {
			let category = await http.getCategoryList({
				data: { shopId: this.shopId }
			});
			storage.session("areaList", category);
			return category;
		},
		async getCategoryList(flag, ver) {
			let category = null;
			if (flag) {
				category = await this.getCate();
			} else {
				let httpGoodVersion = storage.session("httpGoodVersion");
				if (!httpGoodVersion) {
					category = await this.getCate();
				} else {
					if (httpGoodVersion.otherConfigVer == ver) {
						category = storage.session("areaList");
						if (!category) category = await this.getCate();
					} else {
						category = await this.getCate();
					}
				}
			}
			return category;
		},
		//获取商品
		async getGoods() {
			let goods = [];
			let temp = await http.getGoodsList({
				data: {
					shopId: this.shopId,
					page: this.requestPage,
					num: this.requestNum,
					specification: 1
				}
			});
			this.requestTotal = temp.total;
			goods = temp.list;
			for (let i = 0; i < goods.length; i++) {
				goods[i].price = +goods[i].price;
				goods[i].cost = +goods[i].cost;
				goods[i].sort = +goods[i].sort;
				// for(let i=0;i<arr.length;i++){//换成小图
				let item = goods[i];
				let imgName = item.imageName;
				let imgArr = imgName.split(".");
				imgName = imgArr[0] + "_normal." + imgArr[1];
				// console.log(imgName);
				item.imageName = imgName;
				// }
			}
			storage.session("goodList", goods);
			return goods;
		},
		async getGoodsList(flag, goodVer, otherVer) {
			let goods = null;
			if (flag) {
				goods = await this.getGoods();
			} else {
				let httpGoodVersion = storage.session("httpGoodVersion");
				if (!httpGoodVersion) {
					goods = await this.getGoods();
				} else {
					if (
						httpGoodVersion.goodsConfigVer == goodVer &&
						httpGoodVersion.otherConfigVer == otherVer
					) {
						goods = storage.session("goodList");
						if (!goods) goods = await this.getGoods();
					} else {
						goods = await this.getGoods();
					}
				}
			}
			return goods;
		},
		//同步请求
		async syncRequest() {
			let res = await this.getHttp("ShopGetExtra"); //获取版本号
			let cate = await this.getCategoryList(false, res.otherConfigVer); //获取分类
			let goods = await this.getGoodsList(
				false,
				res.goodsConfigVer,
				res.otherConfigVer
			); //获取商品列表
			let { list } = await this.getHttp("InventoryGetlist"); //获取库存数量

			if (cate[0] && cate[0].id != -1) {
				cate.unshift({ id: -1, name: "全部一级分类" });
			}
			this.numList = list;
			this.category = cate;
			this.allGoods = goods;
			this.goodsList = this.initGoodsStock(goods, this.numList); //初始化库存数量,价格,会员价格
			this.goodsList = this.filterGoodList(this.goodsList); // 去除下架 自定义 和多规格
			this.selectOneArea(this.oneArea, this.oneIndex);
			storage.session("httpGoodVersion", res);
		},
		//-----------util------
		//初始化商品,主要是为了显示库存数量,和原价
		initGoodsStock(goodsList, list = []) {
			for (let ele of goodsList) {
				if (ele.isStock == 1) {
					for (let e of list) {
						if (ele.id == e.gid) {
							ele.goodsNum = e.goodsNum;
							break;
						}
					}
				}
			}
			for (let ele of goodsList) {
				ele.groupStock = [];
				// if(ele.isStock == 1){//必须进销存开启多规格价格、库存才显示 =======不适合价格
				for (let e of goodsList) {
					if (ele.id == e.groupId && ele.id != e.id) {
						let obj = {
							goodsNum: e.goodsNum,
							price: e.price,
							vipPrice: e.vipPrice
						};
						ele.groupStock.push(obj);
					}
					if (ele.groupStock.length >= 3) break;
				}
				// }
			}
			return goodsList;
		},
		//去除子菜
		deleteChildGoods(goods) {
			let temp = [];
			temp = goods.filter(ele => {
				if (!Number(ele.groupId)) {
					return true;
				}
			});
			return temp;
		},
		//排序商品
		funSortGood(good) {
			let temp = [];
			temp = good.sort((x, y) => {
				if (x.sort == y.sort) {
					return x.id - y.id;
				} else {
					return x.sort - y.sort;
				}
			});
			return temp;
		},
		// 去除多规格，自定义，和已下架商品
		filterGoodList(list) {
			let goods = [];
			for (let i = 0; i < list.length; i++) {
				if (
					list[i].isGroup != "1" &&
					list[i].type != "2" &&
					list[i].status != "2"
				) {
					goods.push(list[i]);
				}
			}
			return goods;
		},
		initIds() {
			if (this.nowGoods.length > 0) {
				let ids = [];
				this.nowGoods.forEach(item => {
					ids.push(item.id);
				});
				this.goodIds = ids.join(",");
				this.getPricetemplateData(this.goodIds);
			}
		},
		//-----------分页---------
		initPage(arr) {
			this.totalNum = Math.ceil(arr.length / this.pageSize);
			if (this.totalNum == 0) {
				//如果数组为空，总页数为0，则将总数置为1，
				this.totalNum == 1;
			}
			if (this.totalNum < this.currentPage) {
				//如果总页数小于当前页码数，
				this.currentPage = this.totalNum;
			}
			let startIndex = (this.currentPage - 1) * this.pageSize;
			let endIndex = this.currentPage * this.pageSize;

			this.nowGoods = arr.slice(startIndex, endIndex);

			if (this.nowGoods.length > 0) {
				let ids = [];
				this.nowGoods.forEach(item => {
					ids.push(item.id);
				});
				this.goodIds = ids.join(",");
				this.getPricetemplateData(this.goodIds);
			}
		},
		// 分页条数改变
		sizeChange(num) {
			this.pageSize = num;
			this.currentPage = 1;
			this.initPage(this.tempGoods);
		},
		// 分页切换
		async pageClick(page) {
			this.tableTemplate = {
				priceTemplate: [],
				templateTitle: []
			};
			this.currentPage = page;
			this.initPage(this.tempGoods);
			if (this.currentPage > this.totalNum - 2) {
				//如果分页组件上的页数翻到一定值，
				if (this.requestPage < this.requestTotal && this.oneIndex <= 0) {
					//且后台请求的页数小于后台总页数，进行下一页的接口请求
					this.requestPage++;
					let goods = await this.getGoods();

					this.pageGoods = this.pageGoods.concat(goods);
					this.initPage(this.tempGoods);
					storage.session("goodList", this.tempGoods);
				}
			}
		},
		winEvent(res) {
			console.log(res);
			if (res == "ok") {
				this.handleAddPriceTab();
			}
			this.addTempName = "价格模板";
			this.winEventShow = false;
		}
	},
	mounted() {
		this.initData();
		this.syncRequest();
	},
	components: {
		elCategory: () =>
			import(/*webpackChunkName:'el_category'*/ "src/components/el_category"),
		win: () => import(/* webpackChunkName:'win' */ "src/components/win")
	}
};
</script>

<style lang="less" scoped>
.price_temp_filter {
	margin-top: 20px;
	.filter_search {
		margin-left: 5px;
		width: 240px;
	}
}
.price_temp_table {
	margin-top: 20px;
	.table_title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		font-size: 16px;
		color: #000;
		border: 1px solid #ebeef5;
	}
}
.price_temp_pagination {
	margin-top: 40px;
}
.cell-block {
	cursor: pointer;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	&.grey {
		background: #e9e9e9;
		&:hover {
			background: #e9e9e9;
			border: 1px solid #e9e9e9;
		}
	}
	&:hover {
		background: #f5f0dd;
		border: 1px solid #e2c37d;

		.eidt-price-btn {
			display: block;
		}
	}

	.eidt-price-btn {
		display: none;
	}
	.edit-btn {
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin: 0 5px;
		> i {
			font-size: 16px;
		}
		&.move-btn {
			> i {
				color: #666;
			}
			&:hover {
				> i {
					color: #e2c37d;
				}
			}
		}
		&.disabled {
			cursor: not-allowed;
			&:hover {
				> i {
					color: #ddd;
				}
			}
			> i {
				color: #ddd;
			}
		}
	}
}
</style>
<style lang="less">
.el-table th.edithead > .cell {
	position: initial !important;
}
.el-switch.vip-pirce-switch {
	&.is-checked .el-switch__core::after {
		margin-left: -12px;
	}
	.el-switch__core {
		height: 15px;
		&:after {
			width: 12px;
			height: 12px;
		}
	}
}
</style>