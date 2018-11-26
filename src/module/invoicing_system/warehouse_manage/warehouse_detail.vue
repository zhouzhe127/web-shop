<template>
	<div class="warehouse-detail">
		<div class="detail-box">
			<div class="title">
				仓库详情
			</div>
			<div class="word">
				<div class="block">
					<div class="item"><em>仓库名称：</em>{{detail.name}}</div>
					<div class="item"><em>区域总数：</em>{{detail.area.length}}</div>
					<div class="item"><em>仓库地址：</em>
						<template v-if="addressShow">{{detail.provinceName}} {{detail.cityName}} {{detail.townName}} {{detail.place}}</template>
					</div>
				</div>
				<div class="block">
					<div class="item"><em>仓库编号：</em>{{detail.code}}</div>
					<div class="item"><em>商品种类：</em>{{Number(detail.KindWeightKg||detail.kindWeightKg) + Number(detail.kindGoods) + Number(detail.kindWeightG)}}</div>
					<div class="item"><em>物料种类：</em>{{detail.kindMaterial}}</div>
					<!--<div class="item"><em>称重商品：</em>{{detail.numWeightKg}}kg / {{detail.numWeightG}}g</div>-->
				</div>
				<div class="block">
					<div class="item"><em>仓库所属：</em>{{detail.ownerName}}</div>
					<!--<div class="item"><em>普通商品：</em>{{detail.numGoods}}</div>-->
				</div>
				<div class="item handle">
					<el-button type="primary" @click="changeWarehouse">修改仓库</el-button>
					<el-button type="success" @click="changeArea">修改区域</el-button>
					<el-button type="danger" @click="deleteWarehouse">删除</el-button>
				</div>
			</div>
		</div>
		<div class="tab-box" v-if="configIndex==0">
			<el-radio-group v-model="tabIndex">
			    <el-radio-button label="1">商品</el-radio-button>
			    <el-radio-button label="2">物料</el-radio-button>
			</el-radio-group>
		</div>
		<div class="filter">
			<template v-if='tabIndex==1'>
				<div class="block-box">
					<div class="inline-box">
						<el-input  v-model="goodsName" placeholder="请输入商品名"></el-input>
					</div>
					<div class="inline-box">
						<el-input  v-model="barCode" placeholder="请输入条形码"></el-input>
					</div>
					<div class="inline-box">
						<el-input  v-model="secBarCode" placeholder="请输入副条形码"></el-input>
					</div>
				</div>
				<div class="block-box inline-box">
					<el-select v-model="goodsType" placeholder="请选择商品类型" @change="selectType" class="el-size">
					    <el-option
							v-for="item in typeNameArr"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
				</div>
			</template>
			<template v-if='tabIndex==2'>
				<div class="block-box">
					<div class="inline-box">
						<el-input  v-model="mName" placeholder="请输入物料名称"></el-input>
					</div>
					<div class="inline-box">
						<el-select v-model="matType" placeholder="请选择物料类型" @change="dropSelect" class="el-size">
						    <el-option
								v-for="item in matTypeList"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						    </el-option>
						</el-select>
					</div>
					<div class="inline-box">
						<el-cascader
							class="el-size"
						    :options="oneSort"
						    v-model="cidSel"
						    @change="getSortSel"
							change-on-select>
						</el-cascader>
					</div>
				</div>
			</template>
			<div class="block-box inline-box button-box">
				<el-button type="primary" @click="filterClick">筛选</el-button>
				<el-button type="info" @click="resetGoods" v-if="tabIndex==1">重置</el-button>
				<el-button type="info" @click="reset" v-if="tabIndex==2">重置</el-button>
			</div>
		</div>
		<div class="main">
			<template v-if="tabIndex==1">
				<div class="list">
					<el-table :data="goodsList" stripe border style="width: 100%" :key="1">
						<el-table-column type="index" :index="indexMethod" label="序号" width="100">
					    </el-table-column>
					    <el-table-column prop="goodsName" label="商品名称">
					    </el-table-column>
					    <el-table-column prop="barCode" label="条形码">
					    </el-table-column>
					    <el-table-column prop="price" label="售价">
					    </el-table-column>
					    <el-table-column label="商品类型">
					    	<template slot-scope="scope">
					        	{{typeNameArr[Number(scope.row.type)+1].label}}
					      	</template>
					    </el-table-column>
					    <el-table-column label="库存数量/重量">
					    	<template slot-scope="scope">
					        	{{scope.row.surplus}}{{scope.row.unit}}
					      	</template>
					    </el-table-column>
					    <el-table-column prop="batch" label="批次数量">
					    </el-table-column>
					    <el-table-column label="操作" fixed="right" width="150">
					    	<template slot-scope="scope">
					        	<el-button @click="listHandle(scope.row,1)" type="text" size="small">查看详情</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
				</div>
				<div class="page-box">
					<el-pagination @current-change="(res)=>{gPageChange(res,1)}" @size-change="gPageChange"
						:current-page="gPage"
						background
						layout="sizes,total,prev, pager, next"
						:page-sizes="[10, 20, 50]"
						:total="gLength">
					</el-pagination>
				</div>
			</template>
			<template v-if="tabIndex==2">
				<div class="list">
					<el-table :data="materialList" stripe border style="width: 100%" :key="2">
						<el-table-column type="index" :index="indexMethodMat" label="序号" width="100">
					    </el-table-column>
					    <el-table-column prop="name" label="物料名称">
					    </el-table-column>
					    <el-table-column label="类型">
					    	<template slot-scope="scope">
					    		{{matTypeList[Number(scope.row.type)+1].label}}
					    	</template>
					    </el-table-column>
					    <el-table-column label="分类">
					    	<template slot-scope="scope">
					    		{{setWlSort(scope.row.cate)}}
					    	</template>
					    </el-table-column>
					    <el-table-column label="库存数量/重量">
					    	<template slot-scope="scope">
					        	{{setUnit(scope.row.surplus,scope.row.unit)}}
					      	</template>
					    </el-table-column>
					    <el-table-column prop="batch" label="批次数量">
					    </el-table-column>
					    <el-table-column label="操作" fixed="right" width="150">
					    	<template slot-scope="scope">
					        	<el-button @click="listHandle(scope.row,2)" type="text" size="small">查看详情</el-button>
					      	</template>
					    </el-table-column>
				  	</el-table>
				</div>
				<div class="page-box">
					<el-pagination @current-change="(res)=>{mPageChange(res,1)}" @size-change="mPageChange"
						:current-page="mPage"
						background
						layout="sizes,total,prev, pager, next"
						:page-sizes="[10, 20, 50]"
						:total="mLength">
					</el-pagination>
				</div>
			</template>
		</div>
	</div>
</template>

<script>

import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import global from 'src/manager/global';

let areaCn=null;

export default {
	data(){
		return {
			id:'',//仓库id
			detail:{area:[]},//仓库详情
			gPage:1,//商品分页
			gShowNum:10,
			gLength:0,
			mPage:1,//物料分页
			mShowNum:10,
			mLength:0,
			dropList:['10','20'],
			tabIndex:1,//tab切换下标
			configIndex:0,//1商品 2物料 0商品+物料
			typeNameArr:[
				{value: -1,label:'全部商品类型'},
				{value: 0,label:'普通商品'},
				{value: 1,label:'称重商品'},
			],//商品类型下拉列表
			goodsType:-1,//选中商品类型
			goodsName:'',//商品名称
			matTypeList:[
				{value:'-1',label:'全部物料类型'},
				{value:'0',label:'成品'},
				{value:'1',label:'半成品'},
				{value:'2',label:'普通物料'},
			],
			matType:'-1',
			barCode:'',//条形码
			secBarCode:'',//副条形码
			veri:['goodsName','barCode','secBarCode'],//用于验证筛选条件
			mName:'',//物料名称
			allSort:[],//所有分类
			oneSort:[],//一级分类列表
			mCid:'',//分类id
			mCidOne:'',//一级分类id
			cidSel:[''],//选中的分类id
			goodsData:[],//商品列表-未拼接数量
			goodsList:[],//商品列表
			materialData:'',//物料数据
			materialList:[],//物料列表
			filterObj:{},//筛选参数
			addressShow:false,//显示地址
			allMids:[],//所有物料id
			allGids:[],//所有商品id
		};
	},
	components: {
		pageBtn: ()=> import (/*webpackChunkName: 'page_element'*/ 'src/components/page_element'),
		selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		selectStore: ()=> import (/*webpackChunkName: 'select_store'*/ 'src/components/select_store'),
	},
	mounted(){
		this.initBtn();
		let inventConfigure = storage.session('inventConfigure');
		this.configIndex = inventConfigure;
		this.tabIndex = inventConfigure==2 ? 2 : 1;
		this.id = this.$route.query.id;
		this.getWarehouseDetail();//获取仓库详情
		//页面加载默认先请求商品列表
		this.getRequest();
		if(inventConfigure==1||inventConfigure==0){
			this.getGoodsList();//获取商品列表
		}
		//然后请求物料列表 保存 无需每次切换都请求数据
		if(inventConfigure==2||inventConfigure==0){
			this.getCategoryList();//获取物料分类
			this.getMaterialList();//获取物料列表
		}
	},
	methods: {
		initBtn(){
			let arr = [
				{name: '返回',className: 'info',type:4,
					fn: () => {
						storage.session('warehouseListsDestroy',true);
						storage.session('warehouseDetail',null);
						delete this.$route.query.id,delete this.$route.query.sid;
						this.$router.push({path:'/admin/warehouseList',query:this.$route.query});
					}
				},
			];
			this.$store.commit('setPageTools', arr);
		},
		indexMethod(index){
			return this.gShowNum*(this.gPage-1)+index+1;
		},
		indexMethodMat(index){
			return this.mShowNum*(this.mPage-1)+index+1;
		},
		async getWarehouseDetail(){//获取仓库详情
			let data = await http.warehouseGetWarehouse({data:{
				id:this.id
			}});
			this.detail = data;
			this.getAreaCn();
		},
		async getGoodsList(){//获取商品列表-第一次进来
			let data = await http.whGetInventoryGoodsList({data:{
				wid:this.id,
				type:this.goodsType,
				page:this.gPage,
				num:this.gShowNum,
			}});
			this.goodsList = data.list;
			this.gLength = Number(data.count);
		},
		async filterGoodsNum(){//筛选商品列表
			let data = await http.whGetGoodsExactly({data:{
				wid:this.id,
				goodsName:this.goodsName,
				barCode:this.barCode,
				secBarCode:this.secBarCode,
				type:this.goodsType,
			}});
			this.goodsList = data;
			this.gLength = data.length?data.length:0;
		},
		async getMaterialList(){//获取物料列表
			let data = await http.whGetInventoryMaterialList({data:{
				wid:this.id,
				page:this.mPage,
				num:this.mShowNum,
				name:this.mName,
				cid:this.mCid>0?this.mCid:'',
				type:this.matType,
			}});
			this.materialList = data.list;
			this.mLength = Number(data.count);
		},
		async deleteReq(){
			let data = await http.warehouseDeleteWarehouse({data:{
				id:this.id
			}});
			if(data){
				this.$router.push({path:'/admin/warehouseList',query:this.$route.query});
			}
		},
		async getCategoryList(){//获取一二级分类
			let data = await http.invoiv_getCategoryList();
			this.allSort = data;
			let one = [];
			for(let item of data){
				if(item.pid == 0){
					one.push({value:item.id,label:item.name,children:[]});
				}
			}
			one.unshift({value:-1,label:'全部分类'});
			this.oneSort = one;
			for(let one of this.oneSort){
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
		getSortSel(res){
			if(res.length>1){
				this.mCidOne = res[0];
				this.mCid = res[1];
			}else{
				this.mCid = res[0];
			}
		},
		async getAreaCn(){//异步加载 省市区插件
			let data = await import (/*webpackChunkName: 'area_cn'*/ 'src/verdor/area_cn'); 
			areaCn = data.default;
			this.detail.provinceName = areaCn.getNameByCode(this.detail.province);
			this.detail.cityName = areaCn.getNameByCode(this.detail.city);
			this.detail.townName = areaCn.getNameByCode(this.detail.town);
			this.addressShow = true;
		},
		dropSelect(res){//物料类型选择
			this.matType = res;
		},
		getRequest(){//获取缓存的请求参数
			let isDestroy = storage.session('warehouseDetailDestroy');
			let backRequest = storage.session('warehouseDetailRequest');
			if(isDestroy){//确定是从详情页返回时 才读取缓存数据
				if(backRequest){
					for(let i in backRequest){
						this[i] = backRequest[i];
					}
				}
			}
			for(let item of this.allSort){
				if(this.mCid == item.pid){
					this.cidSel.push(item.id);
				}
			}
			this.cidSel.push(this.mCid);
			storage.session('warehouseDetailDestroy',null);
			storage.session('warehouseDetailRequest',null);
		},
		setWlSort(arr){//设置物料分类
			let arrSort = [],str='';
			for(let item of arr){
				arrSort.push(item.name);
			}
			str = arrSort.join(' , ');
			return str;
		},
		deleteWarehouse(){//删除仓库
			this.$store.commit('setWin',{
				title:'提示信息',
				winType:'confirm',
				content:'确认删除该仓库？',
				callback:(res)=>{
					if(res=='ok'){
						this.deleteReq();
					}
				}
			});
		},
		tabClick(event){
			let target = event.target;
			if(target.tagName.toLocaleLowerCase()=='span'){
				let index = target.getAttribute('data-index');
				this.tabIndex = index;
			}
		},
		changeWarehouse(){//修改仓库
			delete this.$route.query.sid;
			this.$router.push({path:'change',query:this.$route.query});
		},
		changeArea(){//修改区域
			let obj={area:this.detail.area,id:this.detail.id};
			storage.session('warehouseArea',obj);
			this.$router.push({path:'changeArea',query:this.$route.query});
		},
		listHandle(item,type){//列表点击操作
			if(type==1){//商品详情
				let detail = item;
				detail.wid = this.id;
				detail.id = item.gid;
				storage.session('goodsneed',detail);
				storage.session('warehouseDetailRequest',this.filterObj);
				this.$router.push({path:'warehouseGoodsDetail',query:this.$route.query});
			}else{//物料详情
				this.$route.query.id = item.id;
				this.$route.query.wid = this.id;
				delete this.$route.query.sid;
				storage.session('warehouseDetailRequest',this.filterObj);
				this.$router.push({path:'warehouseMaterialDetail',query:this.$route.query});
			}
		},
		gPageChange(res,type){
			if(type){
				this.gPage = res;
			}else{
				this.gShowNum = res;
			}
			this.setGoodsFilter();
			this.getGoodsList();
		},
		mPageChange(res,type){
			if(type){
				this.mPage = res;
			}else{
				this.mShowNum = res;
			}
			this.filter();
		},
		filterClick(){
			this.page = 1;
			this.filter();
		},
		filter(){
			if(this.tabIndex == 1){//商品
				//筛选条件
				let num=0;
				for(let item of this.veri){
					let thisItem = this[item].trim();
					if(thisItem=='') num++;
				}
				this.setGoodsFilter();
				if(num>=3){//三个文本框都为空 只筛选类型
					this.getGoodsList();
				}else{//精确搜索
					this.filterGoodsNum();
				}
			}else if(this.tabIndex == 2){//物料
				//筛选条件
				this.setMaterialFilter();
				this.getMaterialList();
			}
		},
		setGoodsFilter(){//设置商品筛选条件
			let obj = {goodsName:this.goodsName,barCode:this.barCode,goodsType:this.goodsType};
			this.filterObj = utils.deepCopy(obj);
			this.filterObj.tabIndex = 1;
		},
		setMaterialFilter(){//设置物料筛选条件
			let obj = {name:this.mName,mCid:this.mCid,};
			this.filterObj = utils.deepCopy(obj);
			this.filterObj.tabIndex = 2;
		},
		resetGoods(){//商品列表重置
			for(let item of this.veri){
				this[item]='';
			}
			this.goodsType = -1;
			this.gPage = 1;
			this.gShowNum = 10;
			this.getGoodsList();
		},
		reset(){//物料重置
			this.cidSel = [''];
			this.matType = '-1';
			this.mName = '';
			this.mCid = '';
			this.mPage = 1;
			this.mShowNum = 10;
			this.filter();
		},
		codeInput(event){//限制文本框输入 只能输入数字
			let num = event.target.value;
			num = num.replace(/[^\d]/g,'');
			if(isNaN(num)) num = '';
			this.barCode = num;
			event.target.value = num;
		},
		setUnit(num,unit){//单位计算
			let def='',min='',value=1;
			for(let item of unit){
				if(item.isMin == 1){//最小单位
					min = item.name;
					if(item.isDefault == 1){//默认单位
						def = item.name;
						value = item.value;
					}
				}else if(item.isDefault == 1){//默认单位
					def = item.name;
					value = item.value;
				}
			}
			//number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
			return global.comUnit(num,value,def,min);
		},
		setWlType(type){//设置物料类型
			if(type == 0){
				return '物料';
			}
		},
		selectType(res){//选择商品类型
			this.goodsType = res;
			this.setGoodsFilter();
			let num=0;
			for(let item of this.veri){
				let thisItem = this[item].trim();
				if(thisItem==''){
					num++;
				}
			}
			if(num>=3){
				this.getGoodsList();
			}else{
				this.filterGoodsNum();
			}
		},
		getAddress(obj){
			this.province = obj.province;
			this.city = obj.city;
			this.area = obj.area;
		}
	}
};
</script>

<style lang='less' scoped>
	.warehouse-detail{padding-bottom: 100px;padding-top: 10px;
		.detail-box{border: 1px solid #dcdfe6;
			.title{height: 40px;line-height: 40px;padding: 0 20px;font-size: 16px;background: #e6e6e6;}
			.word{overflow: hidden;
				.block{overflow: hidden;width: 100%;}
				.item{width: 33.33%;float: left;padding: 15px 20px;min-height: 54px;font-size: 16px;color: #333;position: relative;
					padding-left: 100px;line-height: 1.5;
					em{position: absolute;left: 20px;top: 15px;font-size: 16px;}
					&:nth-child(1){width: 30%;}
					&:nth-child(2){width: 30%;}
					&:nth-child(3){width: 40%;}
				}
				.handle{text-align: right;width: 100%;padding-left: 0;line-height: normal;padding-top: 0;}
			}
		}
		.tab-box{overflow: hidden;padding-top: 20px;
			span{float: left;width: 130px;float: left;border: 1px solid #fe8d01;height: 40px;line-height: 38px;text-align: center;
				color: #fe8d01;cursor: pointer;font-size: 16px;
				&.active{background: #fe8d01;color: #fff;}
			}
		}
		.filter{width: 100%;margin-top: 20px;
			.block-box{
				display: inline-block;padding-bottom: 20px;vertical-align: middle;
			}
			.el-size{width:210px;}
			.inline-box{display: inline-block;vertical-align: middle;margin-right: 10px;
				input{width: 180px;height: 40px;padding: 0 10px;font-size: 14px;vertical-align: top;
					&:focus{outline: none;}
				}
			}
			.button-box{
				span{display: inline-block;height: 40px;line-height: 40px;width: 80px;color: #fff;text-align: center;}
				.blue{margin-right: 10px;}
			}
		}
		.main{padding-bottom: 50px;
			.page-box{padding: 20px 0;}
		}
	}
</style>