<template>
	<div id="detail-addgoods">
		<div slot="content" class="win-content">
			<section>
				<!--		三种类型商品的公共部分	-->
				<section class="titleTop" style="width:100%;height:40px;">
					<div class="good-baseInfo">
						<i></i>
						<h3>基本信息</h3>
						<div class="dian"></div>
						<span v-if="good.id">商品ID:{{good.id}}</span>
					</div>
				</section>
				<section style="width:100%;overflow:hidden;">
					<el-form :model="good" ref="good" label-width="80px">
						<el-form-item required label="商品名称">
							<el-input v-model="good.name" maxlength="45" placeholder="请输入商品名称" style="width:270px;"></el-input>
						</el-form-item>
						<el-form-item required label="商品单位">
							<el-input v-model="good.unit" maxlength="5" placeholder="请输入商品单位" style="width:270px;"></el-input>
						</el-form-item>
						<el-form-item required label="排序">
							<el-input-number v-model="good.sort" style="width:150px;" :min="1" :max="255"></el-input-number>
						</el-form-item>
						<el-form-item required label="商品品牌">
							<span class="addIcon" @click="openCommonWin('brand')">
								<i class="el-icon-circle-plus-outline"></i>
								<span>添加商品品牌</span>
								<span v-if="selectBrandObj.name" class="sign" style="width:120px;padding:0 10px;">{{selectBrandObj.name}}</span>
							</span>
						</el-form-item>
						<el-form-item required label="商品条码">
							<el-input v-model="good.barCode" maxlength="13" placeholder="输入条码" style="width:270px;"></el-input>
							<el-button size="mini" @click="setBarCode('barCode',null)" style="width:82px;" type="primary">条码生成</el-button>
						</el-form-item>
						<el-form-item required label="分类">
							<span class="sign" v-for="(cat,index) in selectCategory" :key="index" v-on:click="deleteSelectCategory(cat,index)">{{cat.name}}</span>
							<span @click="openCommonWin('category')" class="addIcon">
								<i class="el-icon-circle-plus-outline"></i>
								<span>添加分类</span>
							</span>
							<!-- <el-button @click="openCommonWin('category')" type="primary" style="width:100px;">添加分类</el-button> -->
						</el-form-item>
						<el-form-item required label="商品图片">
							<span class="addIcon" style="position:absolute;">
								<form enctype="multipart/form-data" id="img_upload">
									<!-- <el-input placeholder="请输入内容"  type="file"  @change="uploadGoodsImg" ></el-input> -->
									<input type="file" @change="uploadGoodsImg" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
								</form>
								<i class="el-icon-circle-plus-outline"></i>
								<span>添加商品图片</span>
							</span>

							<section style="width:100%;margin-top:48px;">
								<!-- overflow:auto;min-height:170px; -->
								<div class="good-image" v-for="(good,index) in goodPicList" :key="index" style="margin:10px;">
									<div class="good-image-div" id="image">
										<img v-if="!!good.imageName" :src="(good.imageName.indexOf('http')>-1)?good.imageName: imgHost+good.imageName" width="225" height="150">
										<img v-else src="../../../res/images/busis.png" width="225" height="150" alt="商品" />

										<!-- <a class="gray good-image-delete" @click="deleteGoodImg">删除图片</a>
										<a class="good-image-edit">编辑图片</a>
										<form enctype="multipart/form-data" id="img_upload">
											<input type="file" @change="uploadGoodsImg" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" class="good-image-file" />
										</form> -->
									</div>
									<h3 style="text-align:center;">
										<i class="el-icon-remove-outline"></i>
										<span>移除</span>
									</h3>
								</div>
							</section>
						</el-form-item>
					</el-form>
					<el-form :model="good" ref="good" :inline="true" label-width="85px">
						<el-form-item label="副条码">
							<el-switch v-model="good.switch[0]" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
						</el-form-item>
						<el-form-item label="商品唯一码">
							<el-switch v-model="good.switch[1]" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
						</el-form-item>
						<el-form-item label="生产日期">
							<el-switch v-model="good.switch[2]" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
						</el-form-item>
						<el-form-item label="保质期">
							<el-switch v-model="good.switch[3]" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
						</el-form-item>
					</el-form>
					<el-form :model="good" ref="good" :inline="true" label-width="85px">
						<el-form-item required label="供应商">
							<el-tabs v-model="suppierId" type="card" @tab-click="changehand" style="max-width:500px;">
								<el-tab-pane v-for="item in suppierList" :key="item.id" :label="item.name" :name='item.id'></el-tab-pane>
							</el-tabs>
						</el-form-item>
						<el-form-item label="">
							<span class="addIcon">
								<i class="el-icon-circle-plus-outline"></i>
								<span>添加供应商</span>
							</span>
						</el-form-item>
					</el-form>
					<el-form :model="good" ref="good" label-width="85px">
						<el-form-item required label="商品规格">
							<div class="goodsSizeBox">
								<section v-for="(item,index) in titleList" :key="index">
									<section class="sizeTop">
										<el-autocomplete v-if="item.isadd" class="inline-input" v-model="item.name" size="small" @focus="getFocus(item,index)" @blur="addSpecValue(item,true)" :fetch-suggestions="querySearch" placeholder="请输入内容" :name="'name'" :label="'name'" clearable @select="handleSelect"></el-autocomplete>
										<div v-else class="sizeL">{{item.name}}</div>
										<!-- <el-select size="small" v-model="item.name" filterable :placeholder="item.name" style="width:130px;">
											<el-option v-for="items in options" :key="items.name" :label="items.name" :value="items.name"></el-option>
										</el-select> -->
										<span v-if="item.isadd" @click="delSizeOne(titleList,index,true)" class="addIcon" style="color:#606266;float:right;">
											<i class="el-icon-remove-outline"></i>
											<span>移除</span>
										</span>
									</section>
									<section class="sizeBox">
										<section class="sizeI" v-for="(size,i) in item.value" :key="i">
											<el-autocomplete class="inline-input" v-if="size.isadd" v-model="size.name" size="small" @focus="getFocus(item,index,i)" @blur="addSpecValue(size,false,item.id)" :fetch-suggestions="querySearch" @select="handleSelect" clearable style="width:100px;"></el-autocomplete>
											<div v-else class="sizeL">{{size.name}}</div>
											<span v-if="size.isadd" @click="delSizeOne(item.value,i,false,index)" class="addIcon" style="color:#313234;float:right;">
												<i class="el-icon-remove-outline"></i>
												<span>移除</span>
											</span>
										</section>
										<span @click="addSize(item,index)" class="addIcon">
											<i class="el-icon-circle-plus-outline"></i>
											<span>添加</span>
										</span>
									</section>
								</section>
								<section class="sizeTop">
									<el-button @click="addSizeOne(titleList)" size="small" type="primary" style="width:140px;">
										<i class="el-icon-plus"></i>
										<span>添加规格</span>
									</el-button>
								</section>
							</div>
						</el-form-item>
						<el-form-item label="耐克直营">
							<section>
								<el-button size="small" type="primary" style="width:140px;">规格还原</el-button>
								<el-button size="small" type="primary" style="width:140px;">条码生成</el-button>
							</section>
							<section style="margin-top:20px;">
								<el-table ref="multipleTable" size="small" :header-cell-style="{'background-color':'#f5f7fa'}" :data="groupData" border style="width: 100%">
									<el-table-column fixed align="center" min-width="100" :label="titleList[0].name">
										<template slot-scope="scope">
											<span class="titleNames">{{scope.row.name}}</span>
										</template>
									</el-table-column>
									<el-table-column v-if="titleList[1]&&titleList.length>1" fixed show-overflow-tooltip align="center" :label="titleList[1].name">
										<template slot-scope="scope">
											<span class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<span>{{item.name}}</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column v-if="titleList&&titleList.length===3" fixed show-overflow-tooltip align="center" :label="titleList[2].name">
										<template slot-scope="scope">
											<span class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">{{items.name}}</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="150" align="center" prop="price" label="生产日期">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-date-picker size="small" v-model="scope.row.time" type="date" placeholder="选择日期" style="width:140px;"></el-date-picker>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<el-date-picker size="small" v-model="item.time" type="date" placeholder="选择日期" style="width:140px;"></el-date-picker>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-date-picker size="small" v-model="items.time" type="date" placeholder="选择日期" style="width:140px;"></el-date-picker>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="150" align="center" prop="price" label="保质期">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-input size="small" placeholder="保质期" v-model="scope.row.validity" class="input-with-select" style="width:80px;"></el-input>
												<el-select size="small" v-model="scope.row.validityType" slot="append" placeholder="月" style="width:60px;">
													<el-option v-for="itemss in validityTypeArr" :key="itemss.id" :value="itemss.name" :label="itemss.name">{{itemss.name}}</el-option>
												</el-select>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<el-input size="small" placeholder="保质期" v-model="item.validity" class="input-with-select" style="width:80px;">
												</el-input>
												<el-select size="small" v-model="item.validityType" slot="append" placeholder="月" style="width:60px;">
													<el-option v-for="itemss in validityTypeArr" :key="itemss.id" :value="itemss.name" :label="itemss.name">{{itemss.name}}</el-option>
												</el-select>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{lineHeight:(item.value.length>0?item.value.length:1)*50+'px'}">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-input size="small" placeholder="保质期" v-model="items.validity" class="input-with-select" style="width:80px;"></el-input>
													<el-select size="small" v-model="items.validityType" slot="append" placeholder="月" style="width:60px;">
														<el-option v-for="itemss in validityTypeArr" :key="itemss.id" :value="itemss.name" :label="itemss.name">{{itemss.name}}</el-option>
													</el-select>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="售价">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												￥
												<el-input size="small" v-model="scope.row.price" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												￥
												<el-input size="small" v-model="item.price" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													￥
													<el-input size="small" v-model="items.price" class="input-with-select" style="width:60px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="120" align="center" prop="costPrice" label="成本">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												￥
												<el-input size="small" v-model="scope.row.costPrice" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												￥
												<el-input size="small" v-model="item.costPrice" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													￥
													<el-input size="small" v-model="items.costPrice" class="input-with-select" style="width:60px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="数量">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-input size="small" v-model="scope.row.price" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<el-input size="small" v-model="item.price" class="input-with-select" style="width:60px;"></el-input>
												<!-- <span class="titleNames" v-for="(items,i) in item.value" :key="i">
													￥<el-input size="small" v-model="items.price" class="input-with-select" style="width:60px;"></el-input>
												</span> -->
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-input size="small" v-model="items.price" class="input-with-select" style="width:60px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="150" align="center" prop="price" label="条码">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-input size="small" v-model="scope.row.barCode" class="input-with-select" style="width:120px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<el-input size="small" v-model="item.barCode" class="input-with-select" style="width:120px;"></el-input>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-input size="small" v-model="items.barCode" class="input-with-select" style="width:120px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="150" align="center" prop="price" label="副条码">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-input size="small" v-model="scope.row.viceCode" class="input-with-select" style="width:120px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<el-input size="small" v-model="item.viceCode" class="input-with-select" style="width:120px;"></el-input>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-input size="small" v-model="items.viceCode" class="input-with-select" style="width:120px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="图片">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-input size="small" v-model="scope.row.price" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<el-input size="small" v-model="item.image" class="input-with-select" style="width:60px;"></el-input>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-input size="small" v-model="items.image" class="input-with-select" style="width:60px;"></el-input>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column show-overflow-tooltip min-width="120" align="center" prop="price" label="是否参与优惠">
										<template slot-scope="scope">
											<span class="titleNames" v-if="titleList.length==1">
												<el-switch v-model="scope.row.isDiscount" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
											</span>
											<span v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<el-switch v-model="item.isDiscount" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
											</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span class="titleNames" v-for="(items,i) in item.value" :key="i">
													<el-switch v-model="items.isDiscount" active-value="1" inactive-value="0" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
												</span>
											</span>
										</template>
									</el-table-column>
									<el-table-column :fixed="'right'" min-width="120" align="center" label="操作">
										<template slot-scope="scope">
											<span @click="delGood(groupData,scope.row,scope.$index)" class="titleNames" v-if="titleList.length==1" :style="{color: scope.row.isadd?'#FD3F1F':'',cursor:scope.row.isadd?'pointer':''}">删除</span>
											<span @click="delGood(scope.row.value,item,i)" v-if="titleList.length==2" class="titleName" v-for="(item,i) in scope.row.value" :key="i" :style="{color: item.isadd?'#FD3F1F':'',cursor:item.isadd?'pointer':''}">删除</span>
											<span v-if="titleList.length==3" class="titleName" v-for="(item,i) in scope.row.value" :key="i">
												<span @click="delGood(item.value,items,ix)" class="titleNames" v-for="(items,ix) in item.value" :key="ix" :style="{color: items.isadd?'#FD3F1F':'',cursor:items.isadd?'pointer':''}">删除</span>
											</span>
										</template>
									</el-table-column>
								</el-table>
							</section>
						</el-form-item>
					</el-form>
				</section>
			</section>
			<section>
				<el-button @click="back" type="info">取消</el-button>
				<el-button @click="createGood" type="primary">保存</el-button>
			</section>
		</div>
		<component :is="showCom" :pObj="comObj" :pGoodsList="comObj" @throwCommonWin="closeCommonWin"></component>
	</div>
</template>
<script>
/*

*/
import http from 'src/manager/http';
// import global from 'src/manager/global';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			focusDetial: {}, //获取焦点的详情
			isValue: false, //选择的是否是规格
			suppierId: '',
			goodPicList: [],
			validityTypeArr: [
				{ id: 0, name: '月' },
				{ id: 1, name: '日' },
				{ id: 2, name: '年' }
			], //保质期的类型
			titleList: [{ name: '', id: '', isadd: true, value: [] }], //表格规格头部
			// isTrue: true,
			isBlur: false, //是否是添加规格
			sizeIndex: 0, //规格下标
			sizeValIndex: 0, //规格值下标
			unitArr: [
				{ id: 0, name: '斤' },
				{ id: 1, name: '两' },
				{ id: 2, name: 'g' },
				{ id: 3, name: 'Kg' },
				{ id: 4, name: '币' }
			], //商品的单位
			btnOk: {}, //右边按钮
			btnCancel: {}, //左边按钮

			//传递的数据
			shopId: null,
			brandId: null,
			title: '', //弹窗标题
			editGoodsId: null, //正在编辑的商品的id
			ischain: null, //店铺类型
			imgHost: null, //图片地址前缀
			goodsList: [], //所有商品
			category: [], //所有的分类
			status: null, //商品的上下架状态

			good: {
				id: '', //商品id
				attr: [], //口味
				type: 0, //商品的类型
				sort: 1, //获取商品的排序值
				name: '', //商品名
				brandId: '', //添加的品牌id
				BC: '', //简码
				price: '', //售价
				unit: '', //单位
				cost: '', //成本
				barCode: '', //普通菜条码 || 称重菜识别码
				secBarCode: '', //第二个条码
				description: '', //描述
				validity: '', //保质期时间
				validityType: 0, //保质期的类型 0:月 1:日 2:年
				switch: ['0', '0', '1', '0'], //商品各个开关
				CodeOne: '0',
				CodeTwo: '1',
				Codethr: '0',
				Codefour: '1',
				spec: '[{id:"",name:"",isadd:true,value:[]}]', //规格数据
				valuationType: 1, //计价方式 (1.计数 2.计重)
				specValueList: [], //获取规格列表

				isDiscount: false, //是否开启折扣
				serviceCharge: false, //是否开启服务费
				isRecommend: false, //是否开启推荐菜
				isInvoicing: false, //是否开启进销存
				isSelf: false, //是否开启自取
				isStock: false, //是否开启库存
				isSeasonal: false, //是否开启时价菜
				isVip: false, //是否开启会员		0:未开启 1:开启会员价格 2:开启折扣
				isBom: 0, //是否关联bom单
				isCode: false, //是否开启识别码	(称重商品)
				imageName: '', //图片的名字
				specifications: '', //输入的规格
				vipPrice: '', //会员价格
				vipDiscount: '', //会员折扣

				identifyCode: '', //(实际不存在的字段)生成的称重商品的识别码(5位)
				code: '' //(实际不存在的字段)称重商品类别识别码 称重商品的barCode=good.code+good.identifyCode
			},
			identifyCodeMax: null, //比较所有商品识别之后生成的最大商品识别码
			identifyName: '选择类别识别码', //称重商品类别识别码展示的文字

			attr: [], //所有的口味列表
			brandList: [], //品牌列表
			suppierList: [],
			barList: [], //类别识别码

			showCom: null, //需要展示的组件
			comObj: {}, //传递给组件的数据

			showBarList: false, //称重商品识别码下拉框的展示
			showValidity: false, //非多规格普通菜,称重菜保质期下拉框的展示
			showUnit: false, //是否展示单位(称重商品)

			selectAttr: [], //非多规格选择的口味
			selectBrandObj: {}, //选择的品牌对象
			selectCategory: [], //选择的商品分类[{gid: 100047, name: "饿了么", id: "100005"}]

			groupData: [], //存储多规格商品:attr,barCode,cost,goodsName,id,price,unit(多规格需要提交的数据)
			nowGroupIndex: {}, //groupDate中的一个元素
			flag: '', //当前编辑的是哪个窗口

			test: {}, //校验表单的临时对象
			mapHttp: {
				uploadImg: 'uploadImg', //上传图片
				downChildGoods: 'downChildGoods', //删除规格
				getAttr: 'getAttr', //获取口味
				getGoodsDetail: 'getRetailGoodsDetail', //获取商品详情
				goodEdit: 'goodEdit', //编辑商品
				// createGood: 'createGood', //添加商品
				brandList: 'brandList', //获取品牌列表
				GoodWeighgoodsGetList: 'GoodWeighgoodsGetList', //获取识别码
				goodUpOrDownShelf: 'goodUpOrDownShelf' //商品的上下架
			},
			isVipShow: false //是否VIP
		};
	},
	props: {
		pObj: null
		/*
			{
				editGoodsId:			//当前编辑的商品id
				status:				//商品的上下架状态
				ischain:				//店铺类型
				shopId:				//店铺id
				category:				//所有的分类
				imgHost:				//图片地址的前缀
				goodsList:			//所有的商品
				title:				//弹窗的标题
			}
		*/
	},
	mounted() {
		for (let attr in this.pObj) {
			this[attr] = this.pObj[attr];
		}
		this.category = this.pObj.category;
		console.log(this.suppierList);
		this.shopId = this.pObj.shopId;
		// let arr = [
		// 	{
		// 		id: 1,
		// 		name: 'size',
		// 		value: [
		// 			{ id: 1, name: '48码' },
		// 			{ id: 2, name: '47码' },
		// 			{ id: 3, name: '46码' }
		// 		]
		// 	},
		// 	{
		// 		id: 2,
		// 		name: '颜色',
		// 		value: [
		// 			{ id: 4, name: '红色' },
		// 			{ id: 5, name: '白色' },
		// 			{ id: 6, name: '蓝色' }
		// 		]
		// 	},
		// 	{
		// 		id: 3,
		// 		name: '质量',
		// 		value: [
		// 			{ id: 7, name: '很好' },
		// 			{ id: 8, name: '一般' },
		// 			{ id: 9, name: '很差' }
		// 		]
		// 	}
		// ];
		this.specGetList(); //获取规格列表
		this.asyncRequest();
	},
	// watch: {
	//     titleList: 'changetitleList'
	// },
	methods: {
		delGood(arr, item, index) {
			// console.log(arr);
			// console.log(item);
			if (item.isadd) {
				this.$store.commit('setWin', {
					winType: 'confirm',
					title: '温馨提示',
					content: '确认删除此商品',
					callback: callbackRes => {
						if (callbackRes == 'ok') {
							arr.splice(index, 1);
						}
					}
				});
			} else {
				return false;
			}
		},
		getGoodDetial() {
			let that = this;
			// console.log(that.good.spec);
			let titleList = JSON.parse(that.good.spec);
			this.titleList = titleList;
			// console.log(titleList);
		},
		alertWin(info) {
			this.$store.commit('setWin', { title: '温馨提示', content: info });
		},
		getFocus(item, index, i) {
			this.focusDetial = item;
			this.sizeIndex = index;
			this.isBlur = false;
			if (i > -1) {
				this.isValue = true;
				this.sizeValIndex = i;
				this.focusDetial = item.value[i];
			} else {
				this.isValue = false;
				this.sizeValIndex = 0;
			}
			console.log(this.focusDetial);
		},
		//添加规格接口--失去焦点
		addSpecValue(item, bel, rid) {
			//rid为父id
			let that = this;
			setTimeout(async () => {
				let isAdd = true;
				for (let i = 0; i < that.specValueList.length; i++) {
					if (that.specValueList[i].name + '' == item.name + '') {
						isAdd == false;
						item.id = that.specValueList[i].id;
						item.specId = that.specValueList[i].specId;
						item.name = that.specValueList[i].value;
						break;
					}
				}
				if (item.name.trim().length == 0) {
					// that.alertWin('规格名字不能为空！');
					return false;
				}
				if (isAdd && bel && !item.id && !that.isBlur) {
					item.id = await http.addSpec({
						data: {
							name: item.name
						}
					});
					that.changetitleList();
				} else if (isAdd && !bel && !item.id && !that.isBlur) {
					item.id = await http.addSpecValue({
						data: {
							specId: rid,
							name: item.name
						}
					});
					// that.changetitleList();
				}
			}, 500);
		},
		//获取规格列表
		async specGetList() {
			let list = await http.specGetList({ data: {} });
			for (let i = 0; i < list.length; i++) {
				list[i].value = list[i].name;
			}
			this.specValueList = list;
		},
		// //添加规格
		// async addSpec(item){
		// 	let res = await http.addSpec({data:{
		// 			name: item.name
		// 		}});
		// 	return res;
		// },
		//添加规格值
		// async addSpecVal(item,rid){
		// 	let res = await http.addSpecValue({data:{
		//             specId:rid,
		// 			name: item.name
		// 		}});
		// 	return res;
		// },
		changetitleList() {
			let titleList = utils.deepCopy(this.titleList);
			// let titleList = this.titleList;
			let groupData = utils.deepCopy(this.groupData);
			console.log(groupData);
			let keys = [
				'name',
				'specId',
				'barCode',
				'viceCode',
				'costPrice',
				// 'retailPrice',
				'price',
				'image',
				'isDiscount',
				'status',
				'validityType' //保质期
			];
			// let oneitem = titleList[0];
			// let arr = [].push(oneitem);
			let onelist = titleList[0].value; //[{"id":1,"name":"48码"},{"id":2,"name":"47码"},{"id":3,"name":"46码"}]
			if (titleList.length == 1) {
				for (let i = 0; i < groupData.length; i++) {
					for (let key of keys) {
						onelist[i][key] = groupData[i][key];
						onelist[i].specId = groupData[i].id;
					}
				}
			}
			if (titleList.length > 1) {
				for (let i = 0; i < onelist.length; i++) {
					let twolist = utils.deepCopy(titleList[1].value); //[{"id":4,"name":"红色"},{"id":5,"name":"白色"},{"id":6,"name":"蓝色"}]}
					// let twolist =JSON.parse(JSON.stringify(titleList[1].value));//[{"id":4,"name":"红色"},{"id":5,"name":"白色"},{"id":6,"name":"蓝色"}]}
					for (let m = 0; m < twolist.length; m++) {
						for (let key of keys) {
							if (!twolist[m][key]) {
								twolist[m][key] = keys[key];
							}
						}
						twolist[m].specId = twolist[m].id;
					}
					onelist[i].value = twolist;
					if (titleList.length == 3) {
						for (let j = 0; j < onelist[i].value.length; j++) {
							let thrlist = utils.deepCopy(titleList[2].value);
							// let thrlist = JSON.parse(JSON.stringify(titleList[2].value));

							for (let n = 0; n < thrlist.length; n++) {
								for (let key of keys) {
									if (!thrlist[n][key]) {
										thrlist[n][key] = keys[key];
									}
								}
								thrlist[n].specId = thrlist[n].id;
							}
							onelist[i].value[j].value = thrlist;
						}
					}
				}
			}
			this.groupData = utils.deepCopy(onelist);
			console.log(this.titleList);
			console.log(this.groupData);
		},
		handleSelect(item) {
			// console.log(item);
			let keys = [
				'id',
				'specId',
				'name',
				'barCode',
				'viceCode',
				'costPrice',
				// 'retailPrice',
				'price',
				'image',
				'isDiscount',
				'status',
				'validityType' //保质期
			];
			let obj = {
				id: '',
				name: '',
				isadd: true,
				value: []
			};
			for (let i = 0; i < this.titleList.length; i++) {
				for (let j = 0; j < this.titleList[i].value.length; j++) {
					if (
						item.name == this.titleList[i].name ||
						(item.name == this.titleList[i].value[j].name &&
							item.id == this.titleList[i].value[j].id)
					) {
						// console.log('22222');
						this.focusDetial.name = '';
						this.focusDetial.id = '';
						this.focusDetial.isadd = true;
						this.alertWin('此规格已选，请换一种！');
						return false;
					}
				}
			}
			if (!this.isValue) {
				// let arr = this.titleList[this.sizeIndex];
				// let isadd = true;
				// this.titleList[this.sizeIndex].id = item.id;
				// this.titleList.push(obj);
				this.titleList[this.sizeIndex].id = item.id;
				this.titleList[this.sizeIndex].name = item.name;
				// this.changetitleList();
			} else {
				// console.log(this.titleList);

				let groupData = utils.deepCopy(this.groupData);
				// let keys = [
				// 	'name',
				// 	'barCode',
				// 	'viceCode',
				// 	'costPrice',
				// 	// 'retailPrice',
				// 	'price',
				// 	'image',
				// 	'isDiscount',
				// 	'status'
				// ];
				for (let key of keys) {
					obj[key] = '';
					obj.isadd = true;
					obj.name = item.name;
					obj.specId = item.id;
				}

				if (this.sizeIndex == 0) {
					if (this.titleList.length > 1) {
						obj.value = utils.deepCopy(this.titleList[1].value);
						for (let m = 0; m < obj.value.length; m++) {
							obj.value[m].isadd = true;
							obj.value[m].barCode = '';
							obj.value[m].viceCode = '';
							obj.value[m].price = '';
							obj.value[m].image = '';
							obj.value[m].isDiscount = '0';
							obj.value[m].costPrice = '';
						}
					}
					if (this.focusDetial.id == '') {
						groupData.push(obj);
					} else {
						groupData[this.sizeValIndex].name = item.name;
						groupData[this.sizeValIndex].specId = item.id;
						groupData[this.sizeValIndex].id = item.id;
					}
				} else if (this.sizeIndex == 1) {
					for (let i = 0; i < groupData.length; i++) {
						if (this.titleList.length > 2) {
							obj.value = utils.deepCopy(
								groupData[i].value[0].value
							);
							// console.log(obj.value);
							for (let m = 0; m < obj.value.length; m++) {
								obj.value[m].isadd = true;
								obj.value[m].barCode = '';
								obj.value[m].viceCode = '';
								obj.value[m].price = '';
								obj.value[m].image = '';
								obj.value[m].isDiscount = '0';
								obj.value[m].costPrice = '';
							}
						}
						if (this.focusDetial.id == '') {
							groupData[i].value.push(obj);
						} else {
							groupData[i].value[this.sizeValIndex].name =
								item.name;
							groupData[i].value[this.sizeValIndex].specId =
								item.id;
							groupData[i].value[this.sizeValIndex].id = item.id;
						}
					}
				} else if (this.sizeIndex == 2) {
					for (let i = 0; i < groupData.length; i++) {
						for (let j = 0; j < groupData[i].value.length; j++) {
							if (this.focusDetial.id == '') {
								groupData[i].value[j].value.push(obj);
							} else {
								groupData[i].value[j].value[
									this.sizeValIndex
								].name =
									item.name;
								groupData[i].value[j].value[
									this.sizeValIndex
								].specId =
									item.id;
								groupData[i].value[j].value[
									this.sizeValIndex
								].id =
									item.id;
							}
						}
					}
				}
				this.groupData = utils.deepCopy(groupData);
				// console.log(this.groupData);
				// if (this.sizeIndex == 0) {
				//     console.log(this.focusDetial);
				//     console.log(item.name);
				//     for(let i=0;i<this.groupData.length;i++){
				//         // if(item.name == this.groupData[i].name){
				//         //     this.sizeValIndex = i;
				//         // }else{
				//         //     this.sizeValIndex = this.groupData.length-1;
				//         // }
				//         // if(item.name == this.groupData[i].name){
				//         //     this.alertWin('此规格已选，请换一种！');
				//         //     return false;
				//         // }
				//     }
				//     this.groupData[this.sizeValIndex].name = item.name;
				//     this.groupData[this.sizeValIndex].specId = item.id;
				//     console.log(this.groupData);
				// } else if (this.sizeIndex == 1) {
				//     console.log(this.sizeIndex);
				//     for (let i = 0; i < this.groupData.length; i++) {
				//         if (this.groupData[i].value[this.sizeValIndex]) {
				//             this.groupData[i].value[this.sizeValIndex].name = item.name;
				//             this.groupData[i].value[this.sizeValIndex].specId = item.id;
				//         } else {
				//             let det = {};
				//             for (let key of keys) {
				//                 det[key] = keys[key];
				//             }
				//             det.specId = item.id;
				//             det.name = item.name;
				//             this.groupData[i].value[this.sizeValIndex].push(det);
				//         }
				//     }
				// } else if (this.sizeIndex == 2) {
				//     for (let i = 0; i < this.groupData.length; i++) {
				//         for (let j = 0;j < this.groupData[i].value.length;j++) {
				//             if (this.groupData[i].value[j].value[this.sizeValIndex]) {
				//                 this.groupData[i].value[j].value[this.sizeValIndex].name =item.name;
				//                 this.groupData[i].value[j].value[this.sizeValIndex].specId =item.id;
				//             } else {
				//                 let det = {};
				//                 for (let key of keys) {
				//                     if(!det[key])
				//                     det[key] = keys[key];
				//                 }
				//                 det.specId = item.id;
				//                 det.name = item.name;
				//                 this.groupData[i].value[j].value[
				//                     this.sizeValIndex
				//                 ].push(det);
				//             }
				//         }
				//     }
				// }
			}
			// console.log(item);
			this.isBlur = true;
		},
		querySearch(queryString, cb) {
			let restaurants = this.specValueList;
			let results = [];
			if (queryString == '' || !queryString) {
				results = restaurants;
			} else {
				results = restaurants.filter(e => {
					if (
						e.name
							.toLowerCase()
							.indexOf(queryString.toLowerCase()) === 0
					) {
						return true;
					}
				});
			}
			cb(results);
		},
		async createGood() {
			let isOk = this.isOk();
			if (isOk) {
				let detial = this.formatData();
				// console.log(this.editGoodsId);
				if (this.editGoodsId) {
					this.$emit('throwAddGoodsWin', 'edit');
				} else {
					let gooddetial = await http.createRetailGood({
						data: detial
					});
					if (gooddetial) {
						this.alertWin('添加商品成功!');
					}
					this.$emit('throwAddGoodsWin', 'add');
				}
			}
		},
		isOk() {
			if (this.good.name.trim().length == 0) {
				this.alertWin('商品名称不能为空');
				return false;
			}
			console.log(this.selectCategory);
			if (this.selectCategory.length == 0) {
				this.alertWin('请选择品牌！');
				return false;
			}
			if (!this.selectBrandObj.id) {
				this.alertWin('请选择分类！');
				return false;
			}
			if (this.goodPicList.length == 0) {
				this.alertWin('请添加商品图片！');
				return false;
			}
			if (this.suppierId.length == '') {
				this.alertWin('请选择供应商！');
				return false;
			}
			return true;
		},
		//格式化数据
		formatData() {
			let obj = {}; //需要提交的所有数据
			//分类的id
			console.log(this.selectCategory);
			obj.categoryId = this.selectCategory[0].id;
			obj.brandId = this.selectBrandObj.id; //品牌id

			obj.shopId = this.shopId;
			obj.image = JSON.stringify(this.goodPicList);
			obj.switch = this.good.switch.join('');
			obj.suppierId = this.suppierId; //供应商id
			let titleList = this.titleList;
			obj.spec = JSON.stringify(this.titleList);
			let arr = this.groupData;
			let keyss = [
				'viceCode',
				'costPrice',
				'specId',
				'price',
				'image',
				'isDiscount',
				'barCode',
				'status'
			];
			// let newObj = {};
			// for (let key of keyss) {
			//     newObj[key] = '';
			// }
			// console.log(newObj);
			console.log(arr);
			let goodArr = [];
			for (let i = 0; i < arr.length; i++) {
				if (titleList.length > 1) {
					for (let j = 0; j < arr[i].value.length; j++) {
						if (titleList.length == 2) {
							let newObj = {};
							for (let key of keyss) {
								if (arr[i].value[j][key]) {
									newObj[key] = arr[i].value[j][key];
								} else {
									newObj[key] = '';
								}
							}
							// console.log(newObj);
							newObj.specValueIds =
								arr[i].id + ',' + arr[i].value[j].specId;
							// newObj.viceCode = arr[i].value[j].viceCode;
							// newObj.costPrice = arr[i].value[j].costPrice;
							// // newObj.retailPrice = arr[i].value[j].retailPrice;
							// newObj.price = arr[i].value[j].price;
							// newObj.image = arr[i].value[j].image;
							// newObj.isDiscount = arr[i].value[j].isDiscount;
							// newObj.barCode = arr[i].value[j].barCode;
							// newObj.status = arr[i].value[j].status;
							goodArr.push(newObj);
							// console.log(goodArr);
						}
						if (titleList.length == 3) {
							for (
								let k = 0;
								k < arr[i].value[j].value.length;
								k++
							) {
								let newObj = {};
								for (let key of keyss) {
									newObj[key] = arr[i].value[j].value[k][key];
								}
								newObj.specValueIds =
									arr[i].id +
									',' +
									arr[i].value[j].specId +
									',' +
									arr[i].value[j].value[k].specId;
								// newObj.viceCode = arr[i].value[j].value[k].viceCode;
								// newObj.costPrice = arr[i].value[j].value[k].costPrice;
								// // newObj.retailPrice = arr[i].value[j].value[k].retailPrice;
								// newObj.price = arr[i].value[j].value[k].price;
								// newObj.image = arr[i].value[j].value[k].image;
								// newObj.isDiscount = arr[i].value[j].value[k].isDiscount;
								// newObj.barCode = arr[i].value[j].value[k].barCode;
								// newObj.status = arr[i].value[j].value[k].status;
								goodArr.push(newObj);
							}
						}
					}
				} else {
					goodArr = arr;
				}
			}
			console.log(goodArr);
			// return false;
			obj.skus = JSON.stringify(goodArr);
			let keys = [
				'sort',
				'name',
				// 'price',
				'barCode',
				'valuationType'
				// 'validity','isInvoicing','isStock','isDiscount','serviceCharge','isRecommend',
				// 'isSelf','isCode','isVip','isSeasonal','isGroup','vipPrice','vipDiscount','description',
				// 'specifications','barCode','secBarCode'
			];
			for (let key of keys) {
				obj[key] = this.good[key];
			}
			return obj;
		},
		// createFilter(queryString) {
		//     return restaurant => {
		//         return (
		//             restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
		//         );
		//     };
		// },
		//删除规格和规格值
		/* eslint-disable */
		delSizeOne(list, index, bel, sizeIndex) {
			if (bel) {
				//如果删除规格
				this.sizeIndex = index; //规格的下标
			} else {
				this.sizeIndex = sizeIndex; //规格值所在规格下的下标
			}
			let title = '确定删除 "' + list[index].name + '" 此规格';
			this.$store.commit('setWin', {
				winType: 'confirm',
				title: '温馨提示',
				content: title,
				callback: callbackRes => {
					if (callbackRes == 'ok') {
						list.splice(index, 1);
						let groupData = utils.deepCopy(this.groupData);
						if (!bel) {
							if (this.sizeIndex == 0) {
								groupData.splice(index, 1);
							} else {
								if (this.sizeIndex == 1) {
									for (let i = 0; i < groupData.length; i++) {
										groupData[i].value.splice(index, 1);
									}
								} else if (this.sizeIndex == 2) {
									for (let i = 0; i < groupData.length; i++) {
										for (
											let j = 0;
											j < groupData[i].value.length;
											j++
										) {
											groupData[i].value[j].value.splice(
												index,
												1
											);
										}
									}
								}
							}
							this.groupData = utils.deepCopy(groupData);
						} else {
							this.changetitleList();
						}
					}
				}
			});
		},
		//添加规格
		addSizeOne(list) {
			let obj = {
				id: '',
				name: '',
				isadd: true,
				specId: '',
				// barCode: '', //商品条码
				// viceCode: '', //商品副条码
				// specValueIds: '', //规格值id集合 (多个以","分割)
				// costPrice: '', //成本
				// retailPrice: '', //建议零售价
				// price: '', //价钱
				// image: '',
				// isDiscount: '0',
				// status: '0', //商品状态
				value: [
					// {
					//     id: '',
					//     name: '',
					//     isadd: true,
					//     value: [],
					//     specId: '',
					//     // barCode: '', //商品条码
					//     // viceCode: '', //商品副条码
					//     // specValueIds: '', //规格值id集合 (多个以","分割)
					//     // costPrice: '', //成本
					//     // retailPrice: '', //建议零售价
					//     // price: '', //价钱
					//     // image: '',
					//     // isDiscount: '0',
					//     // status: '0' //商品状态
					// }
				]
			};

			if (list.length == 3) {
				this.$store.commit('setWin', {
					winType: 'alert',
					title: '温馨提示',
					content: '最多只能添加三种规格！'
				});
				return false;
			}
			list.push(obj);
			this.changetitleList();
		},
		addSize(item, index) {
			// console.log(index);
			this.sizeIndex = index;
			if (item.id == '') {
				this.alertWin('请先添加商品规格!');
				return false;
			}
			let obj = {
				id: '',
				name: '',
				isadd: true,
				value: []
			};
			item.value.push(obj);

			// let groupData = utils.deepCopy(this.groupData);
			// let keys = [
			//             'name',
			// 			'barCode',
			// 			'viceCode',
			// 			'costPrice',
			// 			// 'retailPrice',
			// 			'price',
			// 			'image',
			// 			'isDiscount',
			// 			'status'
			// 		];
			// for (let key of keys) {
			// 	obj[key] = '';
			// 	obj.isadd = true;
			// }
			// if (index == 0) {
			//     if (this.titleList.length > 1) {
			//         obj.value =  utils.deepCopy(this.titleList[1].value);
			//         for(let m=0;m<obj.value.length;m++){
			//             obj.value[m].isadd = true;
			//             obj.value[m].barCode = '';
			//             obj.value[m].viceCode = '';
			//             obj.value[m].price = '';
			//             obj.value[m].image = '';
			//             obj.value[m].isDiscount = '0';
			//             obj.value[m].costPrice = '';
			//         }
			//     }
			//     groupData.push(obj);
			// } else {
			//     if (index == 1) {
			//         for (let i = 0; i < groupData.length; i++) {
			//             if (this.titleList.length > 2) {
			//                 obj.value =  utils.deepCopy(groupData[i].value[0].value);
			//                 console.log(obj.value);
			//                 for(let m = 0;m<obj.value.length;m++){
			//                     obj.value[m].isadd = true;
			//                     obj.value[m].barCode = '';
			//                     obj.value[m].viceCode = '';
			//                     obj.value[m].price = '';
			//                     obj.value[m].image = '';
			//                     obj.value[m].isDiscount = '0';
			//                     obj.value[m].costPrice = '';
			//                 }
			//             }
			//             groupData[i].value.push(obj);
			//         }
			//     } else if (index == 2) {
			//         for (let i = 0; i < groupData.length; i++) {
			//             for (let j = 0; j < groupData[i].value.length; j++) {
			//                 groupData[i].value[j].value.push(obj);
			//             }
			//         }
			//     }
			// }
			// this.groupData = utils.deepCopy(groupData);
		},
		//返回按钮点击
		back: function() {
			this.$emit('throwAddGoodsWin', 'back');
		},
		//切换供应商
		changehand() {
			console.log(this.suppierId);
		},
		//编辑图片
		async uploadGoodsImg() {
			let imgUrl = await http.uploadImg({
				formId: 'img_upload',
				data: {
					// type: 5,
					shopId: this.shopId
				}
			});
			this.goodPicList.push(imgUrl);
		},
		//删除图片
		deleteGoodImg() {
			if (!this.good.imageName) {
				this.alertWin('此商品无图片!');
				return;
			}
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'confirm',
				content: '确认删除图片?',
				callback: res => {
					if (res == 'ok') {
						this.good.imageName = '';
					}
				}
			});
		},
		//-----------			普通菜		-----------
		//生成普通菜的条码
		generatorBarCode() {
			let barCode = '90' + ((Math.random() * 90000000) | 10000000) + '';
			return barCode;
		},
		//写入条码,副条码,商品识别码
		setBarCode(flag, group) {
			let attr = null;
			switch (flag) {
				case 'barCode': //主条码
				case 'secBarCode': //副条码
					this.good.tips = `确认重新设置${
						flag == 'barCode' ? '主' : '副'
					}条码?`;
					this.writeBarCode(this.good, flag, this.generatorBarCode);
					break;
				case 'groupBarCode': //多规格的主条码
				case 'groupSecBarCode': //多规格的副条码
					attr = flag == 'groupBarCode' ? 'barCode' : 'secBarCode';
					group.tips = `确认重新设置${
						flag == 'groupBarCode' ? '主' : '副'
					}条码?`;
					this.writeBarCode(group, attr, this.generatorBarCode);
					// this.groupData.splice(index, 1, group);
					break;
				case 'identifyCode':
					this.good.tips = `确认重新设置识条码?`;
					this.writeBarCode(this.good, flag, this.generatorCode);
					break;
			}
		},
		//设置副条码,条码,识别码
		writeBarCode(obj, attr, fn) {
			obj[attr] = String(obj[attr]);
			if (obj[attr] && obj[attr].trim().length > 0) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					content: obj.tips,
					winType: 'confirm',
					callback: res => {
						if (res == 'ok') obj[attr] = fn();
					}
				});
			} else {
				obj[attr] = fn();
			}
		},
		//点击删除选中的分类
		deleteSelectCategory(cat, index) {
			if (this.good.type == 2 && this.editGoodsId) return;
			this.selectCategory.splice(index, 1);
		},
		//添加分类,口味(非多规格),品牌窗口
		async openCommonWin(flag) {
			this.flag = flag;
			switch (flag) {
				case 'attr':
					if (this.attr.length == 0) {
						this.attr = await this.getHttp(this.mapHttp.getAttr);
					}
					this.showCom = 'addAttr';
					this.comObj = {
						radio: true,
						selectAttr: this.selectAttr,
						attr: this.attr,
						title: '选择口味',
						height: 650,
						width: 765
					};
					break;
				case 'category':
					if (this.good.type == 2 && this.editGoodsId) return;
					this.showCom = 'addCategory';
					this.comObj = {
						category: this.category,
						selectCategory: this.selectCategory,
						radio: false
					};
					break;
				case 'brand':
					this.showCom = 'addAttr';
					this.comObj = {
						radio: false,
						selectAttr: [this.selectBrandObj.id],
						attr: this.brandList,
						title: '选择品牌',
						height: 650,
						width: 765
					};
			}
		},
		//关闭添加分类,口味(非多规格,多规格),品牌窗口
		closeCommonWin(data, flag) {
			this.showCom = '';
			if (flag != 'ok') return;
			switch (this.flag) {
				case 'attr':
					this.selectAttr = data;
					break;
				case 'category':
					// if (data[0]) {
					// 	this.selectCategory = data[0];
					// } else {
					// 	this.selectCategory = [];
					// }
					this.selectCategory = data;
					break;
				case 'brand':
					if (data[0]) {
						this.selectBrandObj = data[0];
					} else {
						this.selectBrandObj = {};
					}
					break;
				case 'multipleAttr':
					this.groupData[this.nowGroupIndex].attr = data;
			}
		},
		//请求数据
		async getHttp(url, obj = {}) {
			let res = await http[url](obj);
			return res;
		},
		//同步请求商品识别码,品牌列表,商品详情
		async asyncRequest() {
			// if(this.editGoodsId && this.good.type==1 && this.good.isCode==1){
			// 	this.barList = await this.getHttp(this.mapHttp.GoodWeighgoodsGetList,{data:{shopId:this.shopId,brandId:this.brandId}});
			// }
			// this.brandList = await this.getHttp(this.mapHttp.brandList);
			let res = null;
			if (this.editGoodsId) {
				res = await this.getHttp(this.mapHttp.getGoodsDetail, {
					data: {
						id: this.editGoodsId
					}
				});
			} else {
				this.changetitleList();
			}
			if (res) {
				this.good = res;
				this.good.switch = this.good.switch.split('').splice(1, 4);
				this.titleList = JSON.parse(this.good.spec);
				let groupData = this.good.skus;
				// this.groupData = groupData;
				// this.getGoodDetial();
				this.changetitleList();
				// this.initGoods(res);
				let goodArr = utils.deepCopy(this.groupData);
				let titleList = this.titleList;
				let keys = [
					'name',
					'barCode',
					'viceCode',
					'costPrice',
					// 'retailPrice',
					'price',
					'image',
					'isDiscount',
					'status'
				];
				titleList[0].isadd = false;
				if (titleList.length > 1) {
					titleList[1].isadd = false;
					for (let i = 0; i < goodArr.length; i++) {
						goodArr[i].isadd = false;
						titleList[0].value[i].isadd = false;
						// let spuId = groupData[i].specValueIds.split(',');
						for (let j = 0; j < goodArr[i].value.length; j++) {
							goodArr[i].value[j].isadd = false;
							titleList[1].value[j].isadd = false;
							if (titleList.length == 3) {
								titleList[2].isadd = false;
								for (
									let k = 0;
									k < goodArr[i].value[j].value.length;
									k++
								) {
									goodArr[i].value[j].value[k].isadd = false;
									titleList[2].value[k].isadd = false;
									for (let m = 0; m < groupData.length; m++) {
										let spuId = groupData[
											m
										].specValueIds.split(',');
										// console.log(goodArr[i].id);
										// console.log(goodArr[i].value[j].specId);
										// console.log(goodArr[i].value[j].value[k].specId);
										if (
											spuId[0] == goodArr[i].id &&
											spuId[1] ==
												goodArr[i].value[j].specId &&
											spuId[2] ==
												goodArr[i].value[j].value[k]
													.specId
										) {
											// goodArr[i].value[j].value[k].viceCode = groupData[m].viceCode;
											// goodArr[i].value[j].value[k].costPrice = groupData[m].costPrice;
											// goodArr[i].value[j].value[k].price = groupData[m].price;
											// goodArr[i].value[j].value[k].image = groupData[m].image;
											// goodArr[i].value[j].value[k].isDiscount = groupData[m].isDiscount;
											for (let key of keys) {
												if (groupData[i][key]) {
													goodArr[i].value[j].value[
														k
													][key] =
														groupData[m][key];
												}
											}
										}
									}
								}
							} else {
								for (let m = 0; m < groupData.length; m++) {
									let spuId = groupData[m].specValueIds.split(
										','
									);
									// goodArr[i].value[j].value = [];
									if (
										spuId[0] == goodArr[i].id &&
										spuId[1] == goodArr[i].value[j].specId
									) {
										for (let key of keys) {
											if (groupData[i][key]) {
												goodArr[i].value[j][key] =
													groupData[m][key];
											}
										}
									}
								}
							}
						}
					}
					this.groupData = goodArr;
				} else {
					this.groupData = groupData;
				}
				// console.log(goodArr);
				// console.log(titleList);
			}
		}
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		// subAdd: () => import(/*webpackChunkName:'subadd'*/ 'src/components/subadd'),
		// onOff: () => import(/*webpackChunkName:'on_off'*/ 'src/components/on_off'),
		addAttr: () =>
			import(/*webpackChunkName:'add_attr_win'*/ '../goods_manager_coms/add_attr_win'),
		addCategory: () =>
			import(/*webpackChunkName:'add_category_win'*/ '../goods_manager_coms/add_category_win'),
		addRelative: () =>
			import(/*webpackChunkName:'good_package_win'*/ '../common/good_package_win')
	}
};
</script>
<style>
#detail-addgoods .el-table .cell {
	padding: 0;
	/* line-height: 50px; */
}
#detail-addgoods .el-table td {
	padding: 0;
}
#detail-addgoods .el-table__body-wrapper {
	z-index: 1;
}
#detail-addgoods .titleName {
	border-bottom: 1px solid #ebeef5;
	line-height: 50px;
	display: block;
	width: 100%;
	/* vertical-align: bottom; */
}
#detail-addgoods .titleNames {
	border-bottom: 1px solid #ebeef5;
	line-height: 49px;
	height: 49px;
	display: block;
	width: 100%;
	/* vertical-align: bottom; */
}
#detail-addgoods .titleName:last-child {
	border-bottom: none;
}
#detail-addgoods .titleNames:last-child {
	border-bottom: none;
}
</style>
<style lang="less" scoped>
#detail-addgoods {
	.addIcon {
		margin: 0 10px;
		color: #e2bc4d;
		cursor: pointer;
	}
	.goodsSizeBox {
		border: 1px solid #dcdfe6;
		width: 100%;
		min-height: 300px;
		padding: 10px;
		.sizeTop {
			background: #f5f5f5;
			height: 40px;
			line-height: 40px;
			padding-left: 10px;
		}
		.sizeBox {
			padding: 10px 20px;
			.sizeI {
				margin-right: 15px;
				display: inline-block;
				.sizeL {
					display: inline-block;
					height: 30px;
					line-height: 30px;
					padding: 0 15px;
					border: 1px solid #dcdfe6;
					color: #606266;
				}
			}
		}
	}
}
.win-content {
	.sign {
		font-size: 14px;
		display: inline-block;
		width: auto;
		height: 40px;
		margin-bottom: 2px;
		margin-left: 2px;
		padding: 0 20px;
		cursor: pointer;
		text-align: center;
		border-right: 1px solid #f1f1f1;
		background-color: #f2f2f2;
	}
}
.good-baseInfo {
	width: 100%;
	height: 40px;
	margin: 10px;
	line-height: 40px;
	position: relative;
	i {
		width: 4px;
		height: 28px;
		position: absolute;
		top: 6px;
		left: 0;
		background-color: #f8931f;
	}
	h3 {
		width: 73px;
		height: 40px;
		margin-left: 20px;
		float: left;
	}
	div {
		width: 400px;
		margin: 20px 5px;
		float: left;
		border-bottom: 1px dashed #ccc;
	}
}
.good-image-file {
	position: absolute;
	height: 40px;
	opacity: 0;
	// width: 115px;
	cursor: pointer;
}
.good-image {
	float: left;
	width: 225px;
	height: 150px;
	.good-image-div {
		position: relative;
		width: 225px;
		height: 150px;
		background: url(../../../res/images/upload.png) center 40px no-repeat
			#ddd;
	}
	.good-image-delete {
		background-color: rgba(27, 21, 21, 0.6);
		// background: url(../../../res/images/a50.png) repeat;
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}
	.good-image-edit {
		background-color: #e1bb4a;
		height: 40px;
		line-height: 40px;
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 50%;
		color: #fff;
		text-align: center;
		font-size: 16px;
	}
	.good-image-file {
		position: absolute;
		bottom: 0;
		height: 40px;
		left: 50%;
		width: 50%;
		opacity: 0;
		cursor: pointer;
	}
}
</style>


