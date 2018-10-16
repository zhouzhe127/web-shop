<!--
    **选择仓库
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" :height="500" :width="920" :ok="btnOk" @winEvent="closeSelfWin">
		<span slot="title">{{title}}</span>
		<div class="ware-select" slot="content">
			<div class="ware-main">
				<div class="block-box" v-if="!only || only==1">
					<div class="ware-title">
						<span>品牌<em @click="brandShow=!brandShow">{{brandShow?'收起':'展开'}}</em></span>
						<div class="line"></div>
					</div>
					<div class="list-box" v-show="brandShow">
						<span class="radio-cell" v-for="(item,index) in brandList" :key="index">
							<el-radio v-model="wareId" :label="item.id" border>{{item.name}}</el-radio>
						</span>
					</div>
				</div>
				<div class="block-box" v-if="!only || only==2">
					<div class="ware-title">
						<span>门店</span>
						<div class="line shop"></div>
					</div>
					<div class="filter">
						<div class="inline-box">
							<select-shop @chooseShop="getDrop" :shopIds="shopIds"></select-shop>
						</div>
						<div class="inline-box">
							<el-input placeholder="请输入仓库名称" v-model="wareName" style="width:200px;"></el-input>
						</div>
						<div class="inline-box">
							<el-button type="primary" @click="filter">筛选</el-button>
							<el-button type="info" @click="reset">重置</el-button>
						</div>
					</div>
					<div class="list-box">
						<span class="radio-cell" v-for="(item,index) in shopList" :key="index">
							<el-radio v-model="wareId" :label="item.id" border>{{item.name}}</el-radio>
						</span>
					</div>
				</div>
				<div class="block-box" v-if="isArea">
					<div class="ware-title">
						<span>区域</span>
						<div class="line shop"></div>
					</div>
					<div class="list-box">
						<span class="radio-cell" v-for="(item,index) in areaList" :key="index">
							<el-radio v-model="areaId" :label="item.id" border>{{item.areaName}}</el-radio>
						</span>
					</div>
				</div>
			</div>
			<div class="tips">已选中: {{selName}}</div>
		</div>
	</win>
</template>
<script>
//该组件直接在组件内容调用接口，请求仓库数据，且会缓存数据，不会重复请求
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			title: '选择仓库',
			btnOk: {
				content: '确定'
			},
			btnCancel: {},
			dataList:[],//没有被筛选的原始列表
			shopListOri:[],//没有筛选过的门店仓库列表
			shopList:[],//门店仓库列表-筛选后
			brandList:[],//品牌仓库列表
			areaList:[],//区域列表
			wareId:'',//仓库id
			wareObj:{},//选中的仓库对象
			shopIds:[],//已选中的店铺id
			wareName:'',//仓库名称
			selName:'',//已选中仓库名称
			brandShow:true,//是否显示品牌
			only:'',
			isArea:false,//是否开区区域选择 默认不开启
			areaId:'',//区域id
		};
	},
	props: {
		pObj: null,
		// {
		// 	title:'', 		(可不传) 标题 '选择xxx'
		// 	selectId:'', 	(必须) 已选中的仓库id
		//	shopId:'',		(可不传) 店铺id 用于品牌下单店的过滤
		//	only:'',		(可不传) 1只看品牌 2只看单店 默认全部展示
		//	isArea:false,	(可不传) 是否开启区域选择 默认不开启
		//	areaId:'',		(可不传) 区域id 开启区域选择时才会用到
		// }
	},
	watch:{
		'wareId':'radioChange',
		'areaId':'areaChange'
	},
	mounted() {
		this.initData();
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element'),
		selectShop: () =>
			import(/*webpackChunkName: 'el_shopList'*/ 'src/components/el_shopList'),
	},
	methods: {
		closeSelfWin(res) {
			if(res == 'ok') {
				if(this.isArea && !this.areaId){
					this.$message({message: '请选择区域！',type: 'error'});
					return;
				}
				this.$emit('throwWin', res, this.wareObj);
			} else {
				this.$emit('throwWin', res);
			}
		},
		initData(){
			//只显示品牌 或 单店
			this.only = this.pObj.only?this.pObj.only:'';
			//开启区域
			this.isArea = this.pObj.isArea?this.pObj.isArea:'';
			this.getWarehouse().then(()=>{
				this.title = this.pObj.title?this.pObj.title:'选择仓库';
				this.wareId = this.pObj.selectId?this.pObj.selectId:'';
			});
		},
		getDrop(res){
			this.shopIds = res;
		},
		//选择仓库-点击radio按钮
		radioChange(){
			this.wareObj = this.dataList.filter((item)=>{
				return this.wareId==item.id;
			})[0];
			if(this.pObj.isArea){//开启区域选择
				this.getArea().then(()=>{
					this.areaId = this.pObj.areaId?this.pObj.areaId:'';
					this.pObj.areaId = '';//第一次赋值以后清空掉
				});
				this.selName = this.wareObj.name+' / --';
			}else{
				this.selName = this.wareObj.name;
			}
		},
		//选择区域-点击radio按钮
		areaChange(){
			let obj = this.areaList.filter((item)=>{
				return this.areaId==item.id;
			})[0];
			this.$set(this.wareObj,'areaObj',obj);
			this.selName = this.wareObj.name+' / '+ (obj?obj.areaName:'--');
		},
		//筛选
		filter(){
			let arr = [];
			for(let item of this.shopListOri){
				for(let shop of this.shopIds){
					if(item.shopId==shop){
						arr.push(item);
					}
				}
			}
			let shopArr=[];
			if(this.shopIds.length){
				shopArr = arr;
			}else{
				shopArr = this.shopListOri;
			}
			this.shopList = shopArr.filter((res)=>{
				return res.name.includes(this.wareName); 
			});
		},
		//重置
		reset(){
			this.shopList = this.shopListOri;
			this.shopIds = [];
			this.wareName = '';
		},
		//获取仓库列表
		async getWarehouse(){
			let data = await http.warehouseList();
			this.dataList = data;
			this.analysis();
		},
		//获取区域列表
		async getArea(){
			let data = await http.warehouseGetWarehouse({data:{
				id: this.wareId
			}});
			this.areaList = data.area;
		},
		analysis(){
			let brandList = [],listOri = [];
			for(let item of this.dataList){
				if(item.shopId=='0'){//品牌仓库
					brandList.push({
						id:item.id,
						name:item.name,
						ischain:true,
					});
				}else{
					let obj={
						id:item.id,
						name:item.name,
						ischain:false,
						shopId:item.shopId,
					};
					if(this.pObj.shopId){//传入了店铺id 经过筛选后只显示本店仓库
						if(this.pObj.shopId==item.shopId){
							listOri.push(obj);
						}
					}else{//全部显示
						listOri.push(obj);
					}
				}
			}
			this.brandList = brandList;
			this.shopListOri = listOri;
			this.shopList = listOri;
		}
	},
};
</script>
<style lang='less' scoped>
	.ware-select{
		position: relative;
		.ware-main{
			height: 500px;overflow: auto;padding: 20px;padding-top: 10px;
			.filter{
				padding-top: 15px;
				.inline-box{
					display: inline-block;
					margin-right: 10px;
				}
			}
			.ware-title{
				width: 100%;height: 20px;
				margin-top: 10px;
				position: relative;
				overflow: hidden;
				border-left: 3px solid #e1bb4a;
				span{
					height: 20px;font-size: 16px;font-weight: bold;padding-left: 10px;
					display: inline-block;
					line-height: 20px;
					em{
						font-weight: normal;
						color: #e1bb4a;
						font-size: 16px;
						display: inline-block;
						margin-left: 10px;
						cursor: pointer;
					}
				}
				.line{
					position: absolute;
					top: 9px;
					left: 100px;
					width: 100%;
					border-bottom: 1px dashed #dcdfe6;
					&.shop{left: 60px;}
				}
			}
			.list-box{
				padding-top: 10px;
				.radio-cell{
					display: inline-block;
					padding: 8px 15px;padding-left: 0px;
				}
			}
		}
		.tips{
			position: absolute;bottom: 5px;left: 0;width: 100%;padding: 0 20px;
			text-align: right;
			color: #e1bb4a;
		}
	}
</style>