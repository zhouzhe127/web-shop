<!--
    **选择仓库所属
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
				<div class="block-box">
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
				<div class="block-box">
					<div class="ware-title">
						<span>门店</span>
						<div class="line shop"></div>
					</div>
					<div class="filter">
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
			title: '选择仓库所属',
			btnOk: {
				content: '确定'
			},
			btnCancel: {},
			dataList:[],//没有被筛选的原始列表
			shopListOri:[],//没有筛选过的门店仓库列表
			shopList:[],//门店仓库列表-筛选后
			brandList:[],//品牌仓库列表
			wareId:'',//仓库id
			wareObj:{},//选中的仓库对象
			wareName:'',//仓库名称
			selName:'',//已选中仓库名称
			routePath:'',//引用该组件的路由
			brandShow:true,
		};
	},
	props: {
		pObj: null,
		// {
		// 	title:'', 标题
		// 	selectId:'', 已选中的仓库id
		// }
	},
	watch:{
		'wareId':'radioChange'
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
				this.$emit('throwWin', res, this.wareObj);

			} else {
				this.$emit('throwWin', res);
			}
		},
		initData(){
			this.getWarehouse().then(()=>{
				this.title = this.pObj.title?this.pObj.title:'选择仓库';
				this.wareId = this.pObj.selectId?this.pObj.selectId:'';
			});
		},
		getDrop(res){
			this.shopIds = res;
		},
		radioChange(){
			this.wareObj = this.dataList.filter((item)=>{
				return this.wareId==item.id;
			})[0];
			this.selName = this.wareObj.name;
		},
		filter(){//筛选
			this.shopList = this.shopListOri.filter((res)=>{
				return res.name.includes(this.wareName); 
			});
		},
		reset(){//重置
			this.shopList = this.shopListOri;
			this.wareName = '';
		},
		async getWarehouse(){
			let data = await http.invoicing_getOwners();
			for(let item of data){
				item.id = item.shopId;
				item.name = item.shopName;
			}
			this.dataList = data;
			this.analysis();
		},
		analysis(){
			let brandList = [],listOri = [];
			for(let item of this.dataList){
				if(item.ischain=='3'){//品牌仓库
					brandList.push({
						id:item.id,
						name:item.name,
						ischain:true,
					});
				}else{
					listOri.push({
						id:item.id,
						name:item.name,
						ischain:false,
					});
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