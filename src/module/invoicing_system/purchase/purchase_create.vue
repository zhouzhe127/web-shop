<!--
    **新建采购单
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="purchase-creat">
		<div class="head">
			<span>新建采购单</span>
			<div class="line"></div>
		</div>
		<div class="input-container">
			<div class="input-box word">
				<span>采购单总金额：</span>
				<div class="box word">{{orderTotal}} 元</div>
			</div>
			<div class="input-box">
				<span>采购单编号：</span>
				<div class="box">
					<el-input placeholder="请输入编号" v-model="orderCode" class="input-width"></el-input>
				</div>
			</div>
			<div class="input-box">
				<span>采购单备注：</span>
				<div class="box">
					<el-input type="textarea" :rows="3" v-model="remark" placeholder="请输入备注" class="input-width"></el-input>
				</div>
			</div>
		</div>
		<div class="tab-box">
			<el-radio-group v-model="tabIndex">
			    <el-radio-button label="0">商品</el-radio-button>
			    <el-radio-button label="1">物料</el-radio-button>
			</el-radio-group>
		</div>
		<div class="filter">
			<!-- 商品筛选 -->
			<div class="view-box" v-show="tabIndex==0">
				<div class="inline-box">
					<el-input placeholder="商品名称" v-model="goodsName" class="input-width"></el-input>
				</div>
				<div class="inline-box">
					<el-input placeholder="条形码" v-model="barCode" class="input-width"></el-input>
				</div>
				<div class="inline-box">
					<el-cascader
						class="el-size"
						:options="gOneSort"
						v-model="gCidSel"
						@change="(res)=>{getSortSel(res,1)}">
					</el-cascader>
				</div>
			</div>
			<!-- 物料筛选 -->
			<div class="view-box" v-show="tabIndex==1">
				<div class="inline-box">
					<el-input placeholder="物料名称" v-model="matName" class="input-width"></el-input>
				</div>
				<div class="inline-box">
					<el-input placeholder="物料编码" v-model="matCode" class="input-width"></el-input>
				</div>
				<div class="inline-box">
					<el-cascader
						class="el-size"
						:options="mOneSort"
						v-model="mCidSel"
						@change="(res)=>{getSortSel(res,2)}">
					</el-cascader>
				</div>
			</div>
			<div class="inline-box">
				<el-button type="primary" @click="filter">筛选</el-button>
				<el-button type="info" @click="reset">重置</el-button>
			</div>
		</div>
		<div class="table-container">
			<!-- 商品表格 -->
			<div v-show="tabIndex==0">
				<div class="ori-table">
					<!-- 商品填写区 -->
					<div class="my-table-head">
						商品填写区 · 共 <em>{{gCount}}</em> 个条目
						<span @click="detailGoods=!detailGoods">
							{{detailGoods?'简洁':'详细'}}填写
						</span>
					</div>
					<el-table :data="goodsList" stripe border style="width:100%" max-height="250" :header-cell-style="{'background-color':'#f5f7fa'}">
					    <el-table-column fixed="left" label="商品名称" width="150">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="showDetail(scope.row,1)">{{scope.row.goodsName}}</span>
					      	</template>
					    </el-table-column>
						<el-table-column prop="barCode" label="条形码" width="200">
					    </el-table-column>
						<el-table-column label="采购量" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入数量" v-model="scope.row.num" @blur="computePrice(scope.row)">
									 <template slot="append">{{scope.row.unit}}</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="入库仓库" width="200">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="selWarehouse(scope.row,1)">
									{{scope.row.warehouse?scope.row.warehouse:'选择仓库'}} /
									{{scope.row.warehouseArea?scope.row.warehouseArea:'区域'}}
								</span>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购总价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.totalPrice" @blur="computePrice(scope.row)">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购单价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.unitPrice" @blur="computePrice(scope.row)"
								:disabled="scope.row.unitPriceBan">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						
						<!-- 商品-详细填写区 -->
						<template v-if="detailGoods">
							<el-table-column label="生产日期" min-width="171">
								<template slot-scope="scope">
									<el-date-picker :editable="false"
										v-model="scope.row.productionTime"
										type="date"
										placeholder="选择日期" class="timeBox">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column label="失效日期" min-width="171">
								<template slot-scope="scope">
									<el-date-picker :editable="false"
										v-model="scope.row.expiryTime"
										type="date"
										placeholder="选择日期" class="timeBox">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column label="供应商（选填）" min-width="200">
								<template slot-scope="scope">
									<el-select v-model="scope.row.supplierId" placeholder="选择供应商" class="selBox">
										<el-option
											v-for="item in supplierList"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="货号（选填）" min-width="200">
								<template slot-scope="scope">
									<el-input placeholder="货号" v-model="scope.row.articleNo"></el-input>
								</template>
							</el-table-column>
						</template>
						<!-- 商品-详细填写区 end-->

						<el-table-column label="备注（选填）" min-width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="备注" v-model="scope.row.remark"></el-input>
					      	</template>
					    </el-table-column>
						 <el-table-column label="操作" fixed="right" width="100">
					    	<template slot-scope="scope">
					        	<el-button @click="confirmList(scope.row,1)" type="text" 
								size="small" >{{scope.row.alrSelect?'覆盖':'确定'}}</el-button>
								<el-button @click="confirmList(scope.row,1,'add')" type="text" v-if="scope.row.alrSelect"
								size="small" >新增</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
					<div class="page-box" v-if="gTotal>1">
						<el-pagination @current-change="(res)=>{listPage(res,'goods')}"
							:current-page="gPage"
							background
							layout="prev, pager, next"
							:page-count="gTotal">
						</el-pagination>
					</div>
				</div>
				<div class="res-table">
					<!-- 商品-采购单编辑区 -->
					<div class="my-table-head">
						采购单编辑区 · 共 <em>{{goodsRes.length}}</em> 个条目
					</div>
					<el-table :data="goodsRes" stripe border style="width:100%" max-height="1000" :header-cell-style="{'background-color':'#f5f7fa'}">
						<el-table-column fixed="left" label="商品名称" width="150">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="showDetail(scope.row,1)">{{scope.row.name}}</span>
					      	</template>
					    </el-table-column>
						<el-table-column prop="barCode" label="条形码" width="200">
					    </el-table-column>
						<el-table-column label="采购量" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入数量" v-model="scope.row.num" @blur="computePrice(scope.row)">
									 <template slot="append">{{scope.row.unit}}</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="入库仓库" width="200">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="selWarehouse(scope.row,1)">
									{{scope.row.warehouse?scope.row.warehouse:'选择仓库'}} /
									{{scope.row.warehouseArea?scope.row.warehouseArea:'区域'}}
								</span>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购总价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.totalPrice" @blur="computePrice(scope.row,true)">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购单价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.unitPrice" @blur="computePrice(scope.row,true)"
								:disabled="scope.row.unitPriceBan">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="生产日期" min-width="171">
							<template slot-scope="scope">
								<el-date-picker :editable="false"
									v-model="scope.row.productionTime"
									type="date"
									placeholder="选择日期" class="timeBox">
								</el-date-picker>
							</template>
						</el-table-column>
						<el-table-column label="失效日期" min-width="171">
							<template slot-scope="scope">
								<el-date-picker :editable="false"
									v-model="scope.row.expiryTime"
									type="date"
									placeholder="选择日期" class="timeBox">
								</el-date-picker>
							</template>
						</el-table-column>
						<el-table-column label="供应商（选填）" min-width="200">
							<template slot-scope="scope">
								<el-select v-model="scope.row.supplierId" placeholder="选择供应商" class="selBox">
									<el-option
										v-for="item in supplierList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="货号（选填）" min-width="200">
							<template slot-scope="scope">
								<el-input placeholder="货号" v-model="scope.row.articleNo"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="备注（选填）" min-width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="备注" v-model="scope.row.remark"></el-input>
					      	</template>
					    </el-table-column>
						 <el-table-column label="操作" fixed="right" width="100">
					    	<template slot-scope="scope">
					        	<el-button @click="cancelList(scope.row,1,scope.$index)" type="text" size="small">取消</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
				</div>
			</div>

			<!-- *********************分割线*********************** -->

			<!-- 物料表格 -->
			<div v-show="tabIndex==1">
				<div class="ori-table">
					<!-- 物料填写区 -->
					<div class="my-table-head">
						物料填写区 · 共 <em>{{mCount}}</em> 个条目
						<span @click="detailMat=!detailMat">
							{{detailMat?'简洁':'详细'}}填写
						</span>
					</div>
					<el-table :data="matList" stripe border style="width:100%" max-height="250" :header-cell-style="{'background-color':'#f5f7fa'}">
					    <el-table-column fixed="left" label="物料名称" width="150">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="showDetail(scope.row,2)">{{scope.row.name}}</span>
					      	</template>
					    </el-table-column>
						<el-table-column prop="barCode" label="物料编码" width="200">
					    </el-table-column>
						<el-table-column label="单位选择" min-width="200">
							<template slot-scope="scope">
								<el-select v-model="scope.row.unitId" placeholder="单位选择" 
								@change="(res)=>{unitDrop(scope.row,res)}" class="selBox">
									<el-option
										v-for="item in scope.row.unitList"
										:key="item.muId"
										:label="item.name"
										:value="item.muId">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="采购量" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入数量" v-model="scope.row.num" @blur="computePrice(scope.row)">
									 <template slot="append">{{scope.row.unitName}}</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="入库仓库" width="200">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="selWarehouse(scope.row,2)">
									{{scope.row.warehouse?scope.row.warehouse:'选择仓库'}} /
									{{scope.row.warehouseArea?scope.row.warehouseArea:'区域'}}
								</span>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购总价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.totalPrice" @blur="computePrice(scope.row)">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购单价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.unitPrice" @blur="computePrice(scope.row)"
								:disabled="scope.row.unitPriceBan">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						
						<!-- 物料-详细填写区 -->
						<template v-if="detailMat">
							<el-table-column label="生产日期" min-width="171">
								<template slot-scope="scope">
									<el-date-picker :editable="false"
										v-model="scope.row.productionTime"
										type="date"
										placeholder="选择日期" class="timeBox">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column label="失效日期" min-width="171">
								<template slot-scope="scope">
									<el-date-picker :editable="false"
										v-model="scope.row.expiryTime"
										type="date"
										placeholder="选择日期" class="timeBox">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column label="供应商（选填）" min-width="200">
								<template slot-scope="scope">
									<el-select v-model="scope.row.supplierId" placeholder="选择供应商" class="selBox">
										<el-option
											v-for="item in supplierList"
											:key="item.value"
											:label="item.label"
											:value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="货号（选填）" min-width="200">
								<template slot-scope="scope">
									<el-input placeholder="货号" v-model="scope.row.articleNo"></el-input>
								</template>
							</el-table-column>
						</template>
						<!-- 物料-详细填写区 end-->

						<el-table-column label="备注（选填）" min-width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="备注" v-model="scope.row.remark"></el-input>
					      	</template>
					    </el-table-column>
						 <el-table-column label="操作" fixed="right" width="100">
					    	<template slot-scope="scope">
					        	<el-button @click="confirmList(scope.row,2)" type="text" 
								size="small" >{{scope.row.alrSelect?'覆盖':'确定'}}</el-button>
								<el-button @click="confirmList(scope.row,2,'add')" type="text" v-if="scope.row.alrSelect"
								size="small" >新增</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
					<div class="page-box" v-if="mTotal>1">
						<el-pagination @current-change="(res)=>{listPage(res,'mat')}"
							:current-page="mPage"
							background
							layout="prev, pager, next"
							:page-count="mTotal">
						</el-pagination>
					</div>
				</div>
				<div class="res-table">
					<!-- 物料-采购单编辑区 -->
					<div class="my-table-head">
						采购单编辑区 · 共 <em>{{matRes.length}}</em> 个条目
					</div>
					<el-table :data="matRes" stripe border style="width:100%" max-height="1000" :header-cell-style="{'background-color':'#f5f7fa'}">
					    <el-table-column fixed="left" label="物料名称" width="150">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="showDetail(scope.row,2)">{{scope.row.name}}</span>
					      	</template>
					    </el-table-column>
						<el-table-column prop="barCode" label="条形码" width="200">
					    </el-table-column>
						<el-table-column label="单位选择" min-width="200">
							<template slot-scope="scope">
								<el-select v-model="scope.row.unitId" placeholder="单位选择" 
								@change="(res)=>{unitDrop(scope.row,res)}" class="selBox">
									<el-option
										v-for="item in scope.row.unitList"
										:key="item.muId"
										:label="item.name"
										:value="item.muId">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="采购量" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入数量" v-model="scope.row.num" @blur="computePrice(scope.row)">
									 <template slot="append">{{scope.row.unitName}}</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="入库仓库" width="200">
							<template slot-scope="scope">
					        	<span class="name-btn" @click="selWarehouse(scope.row,2)">
									{{scope.row.warehouse?scope.row.warehouse:'选择仓库'}} /
									{{scope.row.warehouseArea?scope.row.warehouseArea:'区域'}}
								</span>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购总价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.totalPrice" @blur="computePrice(scope.row,true)">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="采购单价（选填）" width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="输入金额" v-model="scope.row.unitPrice" @blur="computePrice(scope.row,true)"
								:disabled="scope.row.unitPriceBan">
									 <template slot="append">元</template>
								</el-input>
					      	</template>
					    </el-table-column>
						<el-table-column label="生产日期" min-width="171">
							<template slot-scope="scope">
								<el-date-picker :editable="false"
									v-model="scope.row.productionTime"
									type="date"
									placeholder="选择日期" class="timeBox">
								</el-date-picker>
							</template>
						</el-table-column>
						<el-table-column label="失效日期" min-width="171">
							<template slot-scope="scope">
								<el-date-picker :editable="false"
									v-model="scope.row.expiryTime"
									type="date"
									placeholder="选择日期" class="timeBox">
								</el-date-picker>
							</template>
						</el-table-column>
						<el-table-column label="供应商（选填）" min-width="200">
							<template slot-scope="scope">
								<el-select v-model="scope.row.supplierId" placeholder="选择供应商" class="selBox">
									<el-option
										v-for="item in supplierList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="货号（选填）" min-width="200">
							<template slot-scope="scope">
								<el-input placeholder="货号" v-model="scope.row.articleNo"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="备注（选填）" min-width="200">
							<template slot-scope="scope">
					        	<el-input placeholder="备注" v-model="scope.row.remark"></el-input>
					      	</template>
					    </el-table-column>
						 <el-table-column label="操作" fixed="right" width="100">
					    	<template slot-scope="scope">
					        	<el-button @click="cancelList(scope.row,2,scope.$index)" type="text" size="small">取消</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
				</div>
			</div>
		</div>
		<component
			:is="showCom"
			:pObj="comObj"
			@throwWin="winWarehouse"
		></component>

		<detail-win :winObj="winObj" v-if="winShow" @close="winShow=false"></detail-win>
	</div>
</template>
<script>
//名称能对应上的提交参数
let myProps=[
	'warehouse',//仓库名称
	'warehouseArea',//区域名称
	'num',//采购数量
	'wid',//仓库id
	'areaId',//区域id
	'unitPrice',//采购单价
	'totalPrice',//采购总价
	'productionTime',//生产日期(这里是date对象，提交时需要转成时间戳)
	'expiryTime',//失效日期(这里是date对象，提交时需要转成时间戳)
	'supplierId',//供应商id
	'articleNo',//货号
	'remark',//备注
];
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data(){
		return {
			orderCode:'',//采购单编号
			remark:'',//总备注

			tabIndex:0,//商品/物料 切换
			showCom:'',//弹窗显示
			comObj:{},//弹窗传入的数据
			winObj:{},//物料商品弹框-传入的数据
			winShow:false,

			gAllSort:[],//所有分类-商品
			gOneSort:[],//一级分类列表
			gCid:'',//分类id
			gCidSel:[-1],//选中的分类id

			mAllSort:[],//所有分类-物料
			mOneSort:[],//一级分类列表
			mCid:'',//分类id
			mCidSel:[-1],//选中的分类id

			orderTotal:0,//采购单总金额

			goodsName:'',//商品名称
			barCode:'',//条形码
			goodsList:[],//原列表
			goodsRes:[],//编辑区列表
			gCount:0,//条目总数
			gPage:1,//当前页数
			gTotal:1,//总页数

			matName:'',//物料名称
			matCode:'',//物料编码
			matList:[],
			matRes:[],
			mCount:0,//条目总数
			mPage:1,//当前页数
			mTotal:1,//总页数

			pageShowNum:10,//每页显示多少条
			selItem:'',//当前选中的item
			saveWareObj:'',//保存一个已选中的仓库对象
			alreadyGoods:[],//保存一个已选中的列表id 商品
			alreadyMat:[],//保存一个已选中的列表id 物料

			detailGoods:false,//是否想起填写 商品
			detailMat:false,//是否想起填写 商品

			tempId: 0,//模板id
			resetId: 0,//采购单id 重新提交
			shopId:'',//店铺id
			isChain: 1,//是否品牌 1品牌 2单店

			supplierList:[],//供应商列表
			toDay: new Date().setHours(0,0,0,0)/1000,//当前日期
		};
	},
	components:{
		selWarehouse: () => 
			import( /*webpackChunkName:'warehouse_select'*/ 'src/module/invoicing_system/warehouse_manage/warehouse_select'),
		detailWin: () => 
			import( /*webpackChunkName:'purchase_detail_win'*/ './purchase_detail_win'),
	},
	created(){
		this.userData = storage.session('userShop');//获取店铺数据
		this.shopId = this.userData.currentShop.id;
		this.isChain = this.userData.currentShop.ischain == '3'? 1 : 2;
	},
	mounted(){
		let tempId = this.$route.query.tempId;
		let resetId = this.$route.query.resetId;
		if(tempId){
			this.tempId = tempId;
			this.setTempList();//使用模板
		}
		if(resetId){
			this.resetId = resetId;
			this.setresetList();//重新提交
		}
		this.initFootBtn();
		this.getCategoryList();//获取分类列表
		this.getSupplierList();//获取供应商列表
		this.getGoodsList();
		this.getMatList();
	},
	methods:{
		initFootBtn(){
			let arr = [
				{name: '取消',className: 'info',type:1,
					fn: () => {
						window.history.go(-1);
					}
				},
				{name: '保存模板',className:'primary',type:1,
					fn: () => {
						this.saveTemolate();
					}
				},
				{name: '确认',className:'primary',type:1,
					fn: () => {
						this.submitOrder();
					}
				},
			];
			this.$store.commit('setFixButton', arr);
		},
		//重新提交-获取原数据
		async setresetList(){
			let data = await http.purchaseorderGetDetail({data:{
				id:this.resetId,
			}});
			if(data){
				this.orderCode = data.code;
				this.remark = data.remark;
				for(let item of data.content.goodsList){
					this.setSaveTime(item);
					item.unit = item.unitName;
				}
				for(let item of data.content.materialList){
					item.unitId = item.unit;
					this.setSaveTime(item);
					this.setItemUnit(item);
					item.num = item.num/item.unitValue;
				}
				this.goodsRes = data.content.goodsList;
				this.matRes = data.content.materialList;
				this.computeTotalPrice(true);
			}
		},
		//使用模板
		async setTempList(){
			let data = await http.templateGetPurchaseTemplateContent({data:{
				id:this.tempId,
			}});
			if(data){
				let goodsList=[],matList=[];
				for(let item of data.goodsList){
					this.setSaveTime(item);
					item.name = item.itemName;
					item.barCode = item.itemCode;
					item.unit = item.unitName;
					goodsList.push(item);
				}
				for(let item of data.materialList){
					item.name = item.itemName;
					item.barCode = item.itemCode;
					item.unitId = item.unit;
					this.setSaveTime(item);
					this.setItemUnit(item);
					item.num = item.num/item.unitValue;
					matList.push(item);
				}
				this.goodsRes = goodsList;
				this.matRes = matList;
				this.computeTotalPrice(true);
			}
		},
		//遍历出单位名称 单位比例
		setItemUnit(item){
			for(let unitItem of item.unitList){
				if(item.unitId==unitItem.muId){
					item.unitValue = unitItem.value;
					item.unitName = unitItem.name;
					break;
				}
			}
		},
		//设置保存的日期
		setSaveTime(item){
			item.productionTime = item.productionTime ? new Date(item.productionTime*1000):'';
			item.expiryTime = item.expiryTime ? new Date(item.expiryTime*1000):'';
		},
		//获取商品列表
		async getGoodsList(){
			let data = await http.inventoryGoodsList({data:{
				page: this.gPage,
				num: this.pageShowNum,
				type: -1,
				goodsName: this.goodsName,
				barCode: this.barCode,
				categoryId: this.gCid,
			}});
			this.goodsList = data.list;
			this.gCount = data.count;
			this.gTotal = data.total;
			this.setAddProps(this.goodsList);
			this.setAlreadyId(this.goodsList,'alreadyGoods');
		},
		//获取物料列表
		async getMatList(){
			let data = await http.getMaterialList({data:{
				page: this.mPage,
				num: this.pageShowNum,
				type: -1,
				name: this.matName,
				cid: this.mCid,
				barCode: this.matCode,
			}});
			this.matList = data.list;
			this.mCount = data.count;
			this.mTotal = data.total;
			this.setAddProps(this.matList);
			this.setAlreadyId(this.matList,'alreadyMat');
			for(let item of this.matList){
				let defId = '',defUnit='';
				item.unitList = item.unit;
				for(let unit of item.unitList){
					if(unit.isDefault) defId = unit.muId;//取到默认单位id
				}
				//筛选出默认单位
				defUnit = item.unitList.filter((unitRes)=>{
					return unitRes.muId == defId;
				})[0];
				if(!defUnit){
					this.$message({message: `物料:${item.name},单位数据出错，请检查该物料`,type: 'error',duration:10000,showClose:true});
					return;
				}
				item.unitName = defUnit.name;
				item.unitId = defUnit.muId;
				item.unitValue = defUnit.value;
			}
		},
		//提交采购单
		async submitOrder(){
			let list= this.setSubmitList();
			if(!this.listVeri(list)) return;
			
			let data = await http.purchaseorderAdd({data:{
				code: this.orderCode.trim(),
				remark: this.remark.trim(),
				content: list,
			}});
			if(data){
				this.$message({message: `采购单新建成功！`,type: 'success'});
				delete this.$route.query.tempId;
				delete this.$route.query.resetId;
				this.$router.push({
					path: '/admin/purchaseManagement',
					query: this.$route.query
				});
			}
		},
		//保存模板
		saveTemolate(){//type 存在则修改模板
			let list= this.setSubmitList(true);
			if(!this.listVeri(list)) return;
			let tipName='';
			if(this.tempId){
				tipName = '采购单模板-覆盖';
			}else{
				tipName = '采购单模板-新增';
			}
			this.$prompt('第一次保存会新增模板，继续保存则会覆盖先前的模板', tipName, {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputPlaceholder:'请输入模板名称',
			}).then(({ value }) => {
				if(!value){
					this.$message({message: '采购单模板名称不能为空！',type: 'error'});
					return;
				}
				this.tempName = value;
				http.templateSavePurchaseTemplate({data:{
					id: this.tempId,
					name: this.tempName.trim(),
					content: list,
				}}).then((data)=>{
					if(data){
						this.tempId = data;
						this.$message({message: '采购单模板保存成功！',type: 'success'});
					}
				});
			}).catch();
		},
		//设置提交列表
		setSubmitList(save){//save 传true为保存模板
			let list=[];
			for(let item of this.goodsRes){
				let obj = this.setSubObj(item,true);
				if(save){
					obj = Object.assign(obj,this.setSaveObj(item,true));
				}
				if(Number(obj.num)>0) list.push(obj);
			}
			for(let item of this.matRes){
				let obj = this.setSubObj(item);
				if(save){
					obj = Object.assign(obj,this.setSaveObj(item));
				}
				if(Number(obj.num)>0) list.push(obj);
			}
			return list;
		},
		//设置提交 保存模板的公告参数
		setSubObj(item,type){//type true商品 false物料 
			let obj={
				itemId: item.itemId,
				itemName: item.name,//保存模板用
				type: type ? 0:item.type,
				gType: type ? item.gType:-1,
				num: type ? Number(item.num):item.num*item.unitValue,
				wid: item.wid,
				areaId: item.areaId,
				unitPrice: Number(item.unitPrice),
				totalPrice: Number(item.totalPrice),
				unit: type ? '':item.unitId,
				productionTime: item.productionTime ? Date.parse(item.productionTime)/1000:'',
				expiryTime: item.expiryTime ? Date.parse(item.expiryTime)/1000:'',
				supplierId: item.supplierId,
				articleNo: item.articleNo.trim(),
				remark: item.remark.trim(),
			};
			return obj;
		},
		setSaveObj(item,type){
			let obj={
				warehouse: item.warehouse,
				warehouseArea: item.warehouseArea,
				itemCode: item.barCode,
				unitName: type ? item.unitName:item.unit,
			};
			return obj;
		},
		//提交验证
		listVeri(list){
			if(list.length<=0){
				this.$message({message: '没有要采购的商品或物料',type: 'error'});
				return false;
			}else{
				let orderCode = this.orderCode.trim();
				if(orderCode && !/^[0-9a-zA-z]+$/.test(orderCode)){
					this.$message({message: `采购单编号必须是字母或数字`,type: 'error'});
					return false;
				}
				for(let item of list){
					let name = '';
					let reg = /\d+|\d+\.\d+/;
					if(item.gType != -1){//商品
						name = '商品';
					}else{
						name = '物料';
					}
					if(reg.test(item.num+'') && item.num<=0){
						this.$message({message: `${name}:${item.itemName}, 采购量必须大于0`,type: 'error'});
						return false;
					}
					if(item.num>0 && !item.wid){
						this.$message({message: `${name}:${item.itemName}, 请选择入库仓库`,type: 'error'});
						return false;
					}
					if(isNaN(item.unitPrice)){
						this.$message({message: `${name}:${item.itemName}, 采购单价必须为数字`,type: 'error'});
						return false;
					}
					if(isNaN(item.totalPrice)){
						this.$message({message: `${name}:${item.itemName}, 采购总价必须为数字`,type: 'error'});
						return false;
					}
					if(item.productionTime && item.expiryTime ){
						if(item.productionTime>item.expiryTime){
							this.$message({message: `${name}:${item.itemName}, 失效日期不能早于生产日期`,type: 'error'});
							return false;
						}
					}
					if(item.productionTime>this.toDay){
						this.$message({message: `${name}:${item.itemName}, 生产日期不能超过当前日期`,type: 'error'});
						return false;
					}
					
				}
				return true;
			}
		},
		//设置新增参数-使用$set方法，以便触发双向绑定
		setAddProps(list){
			for(let item of list){
				this.$set(item,'alrSelect',false);//已选中
				this.$set(item,'num','');//采购量
				this.$set(item,'unitId','');//单位id
				this.$set(item,'unitName','');//单位名称
				this.$set(item,'unitPrice','');//采购单价
				this.$set(item,'totalPrice','');//采购总价
				this.$set(item,'productionTime','');//生产日期
				this.$set(item,'expiryTime','');//失效日期
				this.$set(item,'supplierId','');//供应商
				this.$set(item,'articleNo','');//货号
				this.$set(item,'remark','');//备注
				this.$set(item,'unitPriceBan',false);//备注
			}
		},
		//设置已选中列表id
		setAlreadyId(list,listName){
			for(let item of list){//商品物料列表
				if(this[listName].length){
					for(let alr of this[listName]){//已选中id列表
						if(item.id==alr){
							item.alrSelect = true;//已经选中
							break;
						}else{
							item.alrSelect = false;//未选中
						}
					}
				}else{
					item.alrSelect = false;//未选中
				}
			}
		},
		//列表-确认
		confirmList(res,type,isAdd){
			if(this.saveWareObj.id){//有保存过的仓库
				res.wid = this.saveWareObj.id;
				res.areaId = this.saveWareObj.areaObj.id;
				res.warehouse = this.saveWareObj.name;
				res.warehouseArea = this.saveWareObj.areaObj.areaName;
			}else{
				this.$message({message: '首次添加需要选择仓库/区域',type: 'error'});
				return false;
			}
			let obj={};
			for(let prop of myProps){
				obj[prop] = res[prop];
			}
			obj.itemId = res.id;//商品 物料 id
			obj.barCode = res.barCode;//条形码 物料编码
			obj.unit = '';//单位id
			obj.supplierId = this.supplierList.length ? this.supplierList[0].id:'';//供应商id
			obj.unitPriceBan = res.unitPriceBan;

			let tipName='',listName='',resName='',alrName='';
			if(type==1){//商品
				obj.name = res.goodsName;
				obj.type = 0;//物料类型
				obj.gType = res.type;//商品类型
				obj.unit = res.unit;//单位名称
				
				tipName='商品';listName='goodsList';resName='goodsRes';alrName='alreadyGoods';
			}else{
				obj.name = res.name;
				obj.type = res.type;//物料类型
				obj.gType = -1;//商品类型 这里传-1表示物料
				obj.unitId = res.unitId;//单位id
				obj.unitList = res.unitList;//单位列表
				obj.unitName = res.unitName;//单位名称
				obj.unitValue = res.unitValue;//单位比例

				tipName='物料';listName='matList';resName='matRes';alrName='alreadyMat';
			}
			if(res.alrSelect){
				if(isAdd=='add'){//新增 这里需要在中间插入
					let addIndex = 0;
					for(let i=0;i<this[resName].length;i++){
						if(this[resName][i].itemId==obj.itemId){
							addIndex = i;
						}
					}
					this[resName].splice(addIndex+1,0,obj);
					this.$message({message: '添加成功！',type: 'success'});
					this.computeTotalPrice();
				}else{
					this.$confirm(`该${tipName}已在编辑区，是否覆盖？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						let coverIndex = 0,coverNum=0;
						for(let i=0;i<this[resName].length;i++){
							let resItem = this[resName][i];
							if(resItem.itemId==obj.itemId){
								if(coverNum<=0){
									coverIndex = i;
								}
								coverNum++;
							}
						}
						this[resName].splice(coverIndex,coverNum,obj);
						this.$message({message: '覆盖成功！',type: 'success'});
						this.computeTotalPrice();
					}).catch(()=>{
						//
					});
				}
			}else{
				this.$message({message: '添加成功！',type: 'success'});
				this[resName].push(obj);
				this[alrName].push(res.id);//已经选中的id 存入选中列表
				this.setAlreadyId(this[listName],alrName);
				this.computeTotalPrice();
			}
		},
		//列表-取消
		cancelList(res,type,index){
			let listName='',resName='',alrName='';
			if(type==1){//商品
				listName='goodsList';resName='goodsRes';alrName='alreadyGoods';
			}else{
				listName='matList';resName='matRes';alrName='alreadyMat';
			}
			this[resName].splice(index,1);//移除编辑区列表
			for(let n=0;n<this[alrName].length;n++){//移除选中id 当一种商品或物料条目唯一时
				let alr = this[alrName][n];
				let itemNum=0;
				for(let i=0;i<this[resName].length;i++){
					let item = this[resName][i];
					if(alr==item.itemId){
						itemNum++;
					}
				}
				if(itemNum<=0){
					this[alrName].splice(n,1);//移除选中id
					this.setAlreadyId(this[listName],alrName);
				}
			}
			this.computeTotalPrice();
		},
		//自动计算单价
		computePrice(res,isTotal){
			let reg = /^\d+(\.?\d+)?$/;
			if(!res.num) return; //必须有数量才能计算
			if(!reg.test(res.totalPrice) && !reg.test(res.unitPrice)) return;//都不是数字 不计算
			
			if(reg.test(res.totalPrice)){//总价是数字 计算
				res.unitPrice = Number(this.setNumfloat(res.totalPrice/res.num));
				res.unitPriceBan = true;//禁止继续填写单价
			}else if(res.totalPrice==''){
				res.unitPriceBan = false;//解除禁止
			}
			if(isTotal) this.computeTotalPrice();
		},
		//计算采购单总金额
		computeTotalPrice(save){
			let gTotal=0,mTotal=0;
			for(let item of this.goodsRes){
				gTotal = gTotal+Number(item.unitPrice*item.num);
			}
			for(let item of this.matRes){
				if(save){
					mTotal = mTotal + item.unitPrice*item.num;
				}else{
					mTotal = mTotal + item.unitPrice*(item.num/item.unitValue);
				}
			}
			console.log(gTotal+mTotal);
			let str = (gTotal+mTotal)+'';
			this.orderTotal = parseFloat(str);
		},
		setNumfloat(num){//设置2位浮点型数字
			let str = num+'';
			let reg = /\.\d{3,}/;
			if(reg.test(str)){//小数点后三位以上
				let repNum = str.substr(str.indexOf('.')+2,1);
				if(repNum>0){//大于0则切掉
					str = str.replace(/(\d+\.\d)(\d*)/,'$1'+repNum);
				}else{//等于0则+1
					str = str.replace(/(\d+\.\d)(\d*)/,'$1'+'1');
				}
			}
			return str;
		},
		//显示 商品/物料 详情
		showDetail(res,type){
			this.winObj={
				id:res.id,
				type:type,
			};
			this.winShow = true;
		},
		//选择入库仓库
		selWarehouse(res){
			this.comObj={
				selectId:res.wid ? res.wid : '',
				title: '选择入库仓库',
				isArea:true,
				areaId:res.areaId ? res.areaId : '',
			};
			if(this.isChain==2){
				this.comObj.shopId = this.shopId;//店铺id
				this.comObj.only = 2;//只看单店
			}
			this.selItem = res;
			this.showCom = 'selWarehouse';
		},
		//仓库选择完毕
		winWarehouse(res,obj){
			if(res=='ok'){
				this.$set(this.selItem,'wid',obj.id);
				this.$set(this.selItem,'areaId',obj.areaObj.id);
				this.$set(this.selItem,'warehouse',obj.name);
				this.$set(this.selItem,'warehouseArea',obj.areaObj.areaName);
				this.saveWareObj = obj;
			}
			this.showCom = null;
		},
		//筛选
		filter(){
			if(this.tabIndex==0){
				this.gPage = 1;
				this.getGoodsList();
			}else{
				this.mPage = 1;
				this.getMatList();
			}
		},
		//重置
		reset(){
			if(this.tabIndex==0){
				this.goodsName='';
				this.barCode='';
				this.gCidSel=[-1];
				this.gCid='';
				this.gPage = 1;
				this.getGoodsList();
			}else{
				this.matName='';
				this.matCode='';
				this.mCidSel=[-1];
				this.mCid='';
				this.mPage = 1;
				this.getMatList();
			}
		},
		//商品 物料 分页
		listPage(res,type){
			if(type=='goods'){
				this.gPage = res;
				this.getGoodsList();
			}else{
				this.mPage = res;
				this.getMatList();
			}
		},
		//单位选择
		unitDrop(item,res){
			let obj = item.unitList.filter((unitRes)=>{
				return unitRes.muId == res;
			})[0];
			item.unitName = obj.name;
			item.unitValue = obj.value;
		},
		//供应商列表
		async getSupplierList(){
			let data = await http.suppierList();
			for(let item of data){
				item.value = item.id;
				item.label = item.name;
			}
			this.supplierList = data;
		},
		//获取一二级分类
		getCategoryList(){
			//商品
			http.getCategoryList().then((data)=>{
				let one = [];
				for(let item of data){
					let obj={};
					if(item.pid == 0){
						obj.value = item.id;
						obj.label = item.name;
					}
					if(item.child.length){
						let children = [];
						for(let cItem of item.child){
							children.push({value:cItem.id,label:cItem.name});
						}
						obj.children = children;
					}
					one.push(obj);
				}
				one.unshift({value:-1,label:'全部分类'});
				this.gOneSort = one;
			});
			//物料
			http.invoiv_getCategoryList().then((data)=>{
				this.setCategory(data);
			});
		},
		//设置分类列表
		setCategory(data){
			let one = [];
			for(let item of data){
				if(item.pid == 0){
					one.push({value:item.id,label:item.name,children:[]});
				}
			}
			one.unshift({value:-1,label:'全部分类'});
			this.mOneSort = one;
			for(let one of this.mOneSort){
				let two = [];
				for(let item of data){
					if(one.value==item.pid){
						two.push({value:item.id,label:item.name});
					}
				}
				if(two.length){
					one.children = two;
				}else{
					delete one.children;
				}
			}
		},
		getSortSel(res,type){
			let cid = res.length>1 ? res[1] : res[0];
			if(type==1){//商品
				this.gCid = cid;
			}else{//物料
				this.mCid = cid;
			}
		},
	}
};
</script>
<style lang='less' scoped>
	.purchase-creat{
		.timeBox{width:150px;}
		.selBox{width:180px;}
		.input-width{width:210px;}
		.head{
			width: 100%;height: 20px;
			position: relative;
			overflow: hidden;
			border-left: 3px solid #e1bb4a;
			span{
				height: 20px;font-size: 16px;padding-left: 10px;
				display: inline-block;
				line-height: 20px;
				color: #333;
			}
			.line{
				position: absolute;
				top: 9px;
				left: 100px;
				width: 100%;
				border-bottom: 1px dashed #dcdfe6;
			}
		}
		.input-container{
			padding-top: 20px;
			.input-box{
				overflow: hidden;padding-bottom: 20px;
				span{float: left;text-align: right;font-size: 14px;
					height: 40px;line-height: 40px;min-width: 100px;
				}
				.box{float: left;padding-left: 10px;}
				&.word{
					span{height: 20px;line-height: 20px;}
					.box{height: 20px;line-height: 20px;}
				}
			}
		}
		.filter{
			padding-top: 20px;
			.view-box{display: inline-block;}
			.inline-box{
				display: inline-block;
				margin-right: 10px;
				padding-bottom: 20px;
			}
		}
		.table-container{
			.my-table-head{
				border: 1px solid #ebeef5;border-bottom: 0;
				height: 50px;line-height: 50px;
				padding: 0 15px;
				em{color: #E1BB4A;}
				span{display: inline-block;color: #E1BB4A;margin-left: 10px;cursor: pointer;}
			}
			.ori-table{width: 100%;}
			.res-table{margin-top: 20px;}
			.name-btn{cursor: pointer;color: #E1BB4A;display: inline-block;padding: 0 5px;}
			.page-box{padding-top: 10px;}
		}
	}
</style>