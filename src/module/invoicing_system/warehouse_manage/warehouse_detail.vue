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
					<span class="blue" @click="changeWarehouse">修改仓库</span>
					<span class="yellow" @click="changeArea">修改区域</span>
					<span class="gray" @click="deleteWarehouse">删除</span>
				</div>
			</div>
		</div>
		<div class="tab-box" @click="tabClick" v-if="configIndex==0">
			<span :class="{active:tabIndex==1}" data-index='1'>商品</span>
			<span :class="{active:tabIndex==2}" data-index='2'>物料</span>
		</div>
		<div class="filter">
			<template v-if='tabIndex==1'>
				<div class="block-box">
					<div class="inline-box">
						<input type="text" placeholder="请输入商品名" v-model="goodsName"/>
					</div>
					<div class="inline-box">
						<input type="text" placeholder="请输入条形码" v-model="barCode"/>
					</div>
					<div class="inline-box">
						<input type="text" placeholder="请输入副条形码" v-model="secBarCode"/>
					</div>
				</div>
				<div class="block-box inline-box">
					<selectBtn @emit="selectType" :sorts="typeNameArr" :index="typeIndex" class="select-btn"></selectBtn>
				</div>
			</template>
			<template v-if='tabIndex==2'>
				<div class="block-box">
					<div class="inline-box">
						<input type="text" placeholder="请输入物料名称" v-model="mName"/>
					</div>
					<div class="inline-box">
						<el-select v-model="matType" placeholder="请选择物料类型" @change="dropSelect" style="width:180px;">
					    <el-option
							v-for="item in matTypeList"
							:key="item.value"
							:label="item.label"
							:value="item.value">
					    </el-option>
					</el-select>
					</div>
					<div class="inline-box">
						<selectStore @emit="getSortOne" :sorts="oneSort" :tipName="'请选择一级分类'" :isSingle="true"></selectStore>
					</div>
					<div class="inline-box" @click="twoSortClick">
						<selectStore @emit="getSortTwo" :sorts="twoSort" :tipName="'请选择二级分类'" :isSingle="true" ref="towSortDom"></selectStore>
					</div>
				</div>
			</template>
			<div class="block-box inline-box button-box">
				<span class="blue" @click="filterClick">筛选</span>
				<span class="gray" @click="resetGoods" v-if="tabIndex==1">重置</span>
				<span class="gray" @click="reset" v-if="tabIndex==2">重置</span>
			</div>
		</div>
		<div class="main">
			<template v-if="tabIndex==1">
				<div class="list">
					<div class="head">
						商品列表 · 共<em> {{gLength}} </em>条数据
					</div>
					<div class="scroll-box">
						<div class="title">
							<span class="narrow">操作</span>
							<span>序号</span>
							<span>商品名</span>
							<span>条形码</span>
							<span>售价</span>
							<span>商品类型</span>
							<span>库存数量 / 重量</span>
							<span>批次数量</span>
						</div>
						<ul @click="listHandle">
							<li v-for="(item,index) in goodsList" :key="index">
								<!--操作-->
								<span class="narrow handle">
									<em class="detail goods-detail" :data-index="index">查看详情</em>
								</span>
								<!--序号-->
								<span v-if="(gPage-1)*gShowNum+index>=9">{{(gPage-1)*gShowNum+index+1}}</span>
								<span v-else>{{'0'+((gPage-1)*gShowNum+index+1)}}</span>
								<!--商品名-->
								<span class="text-ellipsis" :title="item.goodsName">{{item.goodsName}}</span>
								<!--条形码-->
								<span>{{item.barCode}}</span>
								<!--售价-->
								<span>{{item.price}}</span>
								<!--商品类型-->
								<span>{{setGoodsType(item.type)}}</span>
								<!--库存数量/重量-->
								<span>{{item.surplus}}{{item.unit}}</span>
								<!--批次数量-->
								<span class="text-ellipsis" :title="item.batch">{{item.batch}}</span>
							</li>
							<li class="empty" v-if="!gLength">- 暂无条目 -</li>
						</ul>
					</div>
				</div>
				<div class="page-box">
					<pageBtn @pageNum="gPageChange" :total="gPageTotal" :page="gPage" :isNoJump="true"></pageBtn>
				</div>
			</template>
			<template v-if="tabIndex==2">
				<div class="list mList">
					<div class="head">
						物料列表 · 共<em> {{mLength}} </em>条数据
					</div>
					<div class="scroll-box">
						<div class="title">
							<span class="narrow">操作</span>
							<span>序号</span>
							<span>物料名称</span>
							<span>类型</span>
							<span>分类</span>
							<span>库存数量 / 重量</span>
							<span>批次数量</span>
						</div>
						<ul @click="listHandle">
							<li v-for="(item,index) in materialList" :key="index">
								<!--操作-->
								<span class="narrow handle">
									<em class="detail wl-detail" :data-id="item.id">查看详情</em>
								</span>
								<!--序号-->
								<span v-if="(mPage-1)*mShowNum+index>=9">{{(mPage-1)*mShowNum+index+1}}</span>
								<span v-else>{{'0'+((mPage-1)*mShowNum+index+1)}}</span>
								<!--物料名称-->
								<span class="text-ellipsis" :title="item.name">{{item.name}}</span>
								<!--类型-->
								<span class="text-ellipsis" :title="setWlType(item.type)">{{matTypeList[Number(item.type)+1].label}}</span>
								<!--分类-->
								<span class="text-ellipsis" :title="setWlSort(item.cate)">{{setWlSort(item.cate)}}</span>
								<!--库存数量/重量-->
								<span class="text-ellipsis" :title="setUnit(item.surplus,item.unit)">
									{{setUnit(item.surplus,item.unit)}}
								</span>
								<!--批次数量-->
								<span>{{item.batch}}</span>
							</li>
							<li class="empty" v-if="!mLength">- 暂无条目 -</li>
						</ul>
					</div>
				</div>
				<div class="page-box">
					<pageBtn @pageNum="mPageChange" :total="mPageTotal" :page="mPage" :isNoJump="true"></pageBtn>
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
			gPageTotal:1,
			gLength:0,
			mPage:1,//物料分页
			mShowNum:10,
			mPageTotal:1,
			mLength:0,
			dropList:['10','20'],
			tabIndex:1,//tab切换下标
			configIndex:0,//1商品 2物料 0商品+物料
			typeNameArr:[],//商品类型下拉列表
			typeIndex:0,
			typeList:[
				{id:-1,name:'全部类型'},
				{id: 0,name:'普通商品'},
				{id: 1,name:'称重商品'},
			],//商品类型对应数字
			goodsType:-1,//选中商品类型
			goodsName:'',//商品名称
			matTypeList:[
				{value:'-1',label:'全部类型'},
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
			twoSort:[],//二级分类列表
			mCid:'',//分类id
			mCidOne:'',//一级分类id
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
		this.$store.commit('setPageTools',{
			back:()=>{//返回
				storage.session('warehouseListsDestroy',true);
				storage.session('warehouseDetail',null);
				delete this.$route.query.id,delete this.$route.query.sid;
				this.$router.push({path:'/admin/warehouseList',query:this.$route.query});
			}
		});
		let inventConfigure = storage.session('inventConfigure');
		this.configIndex = inventConfigure;
		this.tabIndex = inventConfigure==2 ? 2 : 1;
		this.id = this.$route.query.id;
		this.getWarehouseDetail();//获取仓库详情
		//页面加载默认先请求商品列表
		this.getRequest();
		if(inventConfigure==1||inventConfigure==0){
			this.getGoodsList();//获取商品列表
			this.setTypeNameArr();//设置商品分类	
		}
		//然后请求物料列表 保存 无需每次切换都请求数据
		if(inventConfigure==2||inventConfigure==0){
			this.getCategoryList();//获取物料分类
			this.getMaterialList();//获取物料列表
		}
	},
	methods: {
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
			this.gPageTotal = Number(data.total);
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
			this.gPageTotal = 1;
			this.gLength = data.length?data.length:0;
		},
		async getMaterialList(){//获取物料列表
			let data = await http.whGetInventoryMaterialList({data:{
				wid:this.id,
				page:this.mPage,
				num:this.mShowNum,
				name:this.mName,
				cid:this.mCid,
				type:this.matType,
			}});
			this.materialList = data.list;
			this.mPageTotal = Number(data.total);
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
			let one=[];
			for(let item of data){
				if(item.pid == 0){
					one.push(item);
				}
			}
			this.oneSort = one;
			this.allSort = data;
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
			storage.session('warehouseDetailDestroy',null);
			storage.session('warehouseDetailRequest',null);
		},
		getSortOne(arr){//选中一级分类 并且关联二级分类
			this.mCid = this.setSortId(arr);
			this.mCidOne = this.mCid;
			let arrTwo=[];
			for(let item of this.allSort){
				if(item.pid == this.mCid){
					arrTwo.push(item);
				}
			}
			this.twoSort = arrTwo;
		},
		getSortTwo(arr){//选中二级分类
			let cid = this.setSortId(arr);
			if(cid){
				this.mCid = cid;
			}else{
				this.mCid = this.mCidOne ? this.mCidOne : '';
			}
		},
		twoSortClick(){
			if(!this.twoSort.length){
				this.$refs.towSortDom.sortShow = false;
				this.$store.commit('setWin',{title:'提示信息',content:'请选择一级分类'});
			}
		},
		setSortId(arr){//设置选中的分类id
			let id;
			for(let item of arr){
				if(item.selected == true){
					id = item.id;
					break;
				}else{
					id = '';
				}
			}
			return id;
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
		listHandle(event){//列表点击操作
			let target = event.target;
			if(target.className.includes('goods-detail')){//进入详情
				let index = parseInt(target.getAttribute('data-index'));
				let detail = this.goodsList[index];
				let num = (this.gPage-1)*this.gShowNum+index+1;
				detail.wid = this.id;
				detail.id = this.goodsList[index].gid;
				if(num>=9){
					detail.numerical = num;
				}else{
					detail.numerical = '0'+num;
				}
				storage.session('goodsneed',detail);
				storage.session('warehouseDetailRequest',this.filterObj);
				this.$router.push({path:'warehouseGoodsDetail',query:this.$route.query});
			}else if(target.className.includes('wl-detail')){//进入详情
				let id = target.getAttribute('data-id');
				this.$route.query.id = id;
				this.$route.query.wid = this.id;
				delete this.$route.query.sid;
				storage.session('warehouseDetailRequest',this.filterObj);
				this.$router.push({path:'warehouseMaterialDetail',query:this.$route.query});
			}
		},
		gPageChange(obj){
			this.gPage = obj.page;
			this.gShowNum = obj.num;
			this.setGoodsFilter();
			this.getGoodsList();
		},
		mPageChange(obj){
			this.mPage = obj.page;
			this.mShowNum = obj.num;
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
		clearSort(arr){
			let arrSort = utils.deepCopy(arr);
			for(let item of arrSort){
				item.selected = false;
			}
			return arrSort;
		},
		resetGoods(){//商品列表重置
			for(let item of this.veri){
				this[item]='';
			}
			this.goodsType = -1;
			this.typeIndex = 0;
			this.gPage = 1;
			this.gShowNum = 10;
			this.getGoodsList();
		},
		reset(){//物料重置
			this.oneSort = this.clearSort(this.oneSort);
			this.twoSort = [];
			this.mName = '';
			this.mCid = '';
			this.mPage = 1;
			this.mShowNum = 10;
			this.tabIndex = 2;
			this.filter();
		},
		codeInput(event){//限制文本框输入 只能输入数字
			let num = event.target.value;
			num = num.replace(/[^\d]/g,'');
			if(isNaN(num)) num = '';
			this.barCode = num;
			event.target.value = num;
		},
		setTypeNameArr(){//设置下拉列表
			for(let item of this.typeList){
				this.typeNameArr.push(item.name);
			}
		},
		setGoodsType(type){//列表-显示商品类型
			let typeName='';
			for(let item of this.typeList){
				if(item.id == type){
					typeName = item.name;
				}
			}
			return typeName;
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
		selectType(index){//选择商品类型
			this.goodsType = this.typeList[index].id;
			this.typeIndex = index;
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
		.detail-box{border: 1px solid #ccc;
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
				.handle{text-align: right;width: 100%;padding-left: 0;line-height: normal;padding-top: 0;
					span{width: 100px;height: 40px;line-height: 40px;text-align: center;color: #fff;display: inline-block;margin-right: 10px;
						border-radius: 5px;
					}
				}
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
			.list{border: 1px solid #ccc;border-bottom: 2px solid #ddd;
				.head{height: 50px;line-height: 50px;padding: 0 10px;font-size: 16px;
					em{color: #ff3c04;font-size: inherit;}
				}
				.scroll-box{overflow: auto;}
				.title{background: #e6e6e6;overflow: hidden;min-width: 1200px;
					span{float: left;height: 40px;line-height: 40px;text-align: center;width: 13%;}
					.narrow{width: 9%;}
				}
				ul{min-width: 1200px;
					li{overflow: hidden;border-bottom: 2px solid #ddd;
						&:last-child{border-bottom: 0;}
						span{float: left;height: 70px;line-height: 70px;text-align: center;width: 13%;color: #555;padding: 0 5px;
							.wrap{display: inline-block;line-height: normal;vertical-align: middle;max-width: 100%;max-height: 38px;overflow: hidden;}
						}
						.narrow{width: 9%;}
						.handle{
							.detail{display: inline-block;padding: 0 20px;height: 18px;line-height: normal;cursor: pointer;color: #27a8e0;
								&:hover{text-decoration: underline;}
							}
							
						}
					}
					.empty{
						line-height: 70px;text-align: center;color: #ccc;font-size: 20px;
					}	
				}
			}
			.mList{
				span{width: 15.16% !important;}
				.narrow{width: 9% !important;}
			}
			.page-box{margin-top: 20px;text-align: left;padding-bottom: 100px;}
		}
	}
</style>