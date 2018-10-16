<!--
    **采购单-商品物料详情-弹窗
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" :height="350" :width="550" :type="'win'" :ok="btnOk" @winEvent="closeSelfWin">
		<span slot="title">{{title}}</span>
		<div class="ware-select" slot="content">
			<div class="main" v-show="requestObj.type==1">
				<div class="block">
					<p><em>商品名称：</em><span>{{goodsDetail.gName}}</span></p>
					<p><em>条形码：</em><span>{{goodsDetail.barCode}}</span></p>
					<p><em>品牌：</em><span>{{goodsDetail.brandName}}</span></p>
					<p><em>分类：</em><span>{{goodsDetail.cateStr}}</span></p>
					<p><em>单位：</em><span>{{goodsDetail.unit}}</span></p>
					<p><em>售价：</em><span>{{goodsDetail.price}}</span></p>
					<p><em>批次数：</em><span>{{goodsDetail.batchNum}}</span></p>
					<p><em>规格：</em><span>{{goodsDetail.specifications}}</span></p>
				</div>
				<div class="block">
					<p><em>保质期：</em><span>{{goodsDetail.validity}}{{validityHash[goodsDetail.validityType]}}</span></p>
					<p><em>耗损：</em><span>{{goodsDetail.lossNum}}</span></p>
					<p>
						<em>货架位置：</em>
						<span>
							<i v-for="(item,index) in goodsDetail.shelves" :key="index">
								{{item.shelfName}} / {{item.areaName}}
							</i>
						</span>
					</p>
					<p><em>仓库数量：</em><span>{{goodsDetail.surplus}}{{goodsDetail.unit}}</span></p>
					<p><em>上架数量：</em><span>{{goodsDetail.shelveNum}}</span></p>
					<p><em>总量：</em><span>{{goodsDetail.total}}</span></p>
				</div>
			</div>
			<div class="main" v-show="requestObj.type==2">
				<div class="block">
					<p><em>物料名称：</em><span>{{matDetail.name}}</span></p>
					<p><em>物料编码：</em><span>{{matDetail.barCode}}</span></p>
					<p><em>品牌：</em><span>{{matDetail.brandName}}</span></p>
					<p><em>分类：</em><span>{{matDetail.cateStr}}</span></p>
					<p><em>批次数：</em><span>{{matDetail.batchNum}}</span></p>
					<p><em>物料类型：</em><span>{{matTypeHash[matDetail.type]}}</span></p>
				</div>
				<div class="block">
					<p><em>保质期：</em><span>{{matDetail.validity}}{{validityHash[matDetail.validityType]}}</span></p>
					<p><em>物料单位：</em><span>{{matDetail.unitStr}}</span></p>
					<p><em>默认单位：</em><span>{{matDetail.defUnit}}</span></p>
					<p><em>最小单位：</em><span>{{matDetail.minUnit}}</span></p>
					<p>
						<em>单位换算：</em>
						<span>
							<i v-for="(item,index) in matDetail.unitConvert" :key="index">
								{{item}}
							</i>
						</span>
					</p>
					<p><em>库存总量：</em><span>{{matDetail.num}}</span></p>
				</div>
			</div>
		</div>
	</win>
</template>
<script>

import http from 'src/manager/http';

export default {
	data(){
		return {
			title:'',//标题
			btnOk: {
				style:'display:none;',
			},
			goodsDetail:'',//商品详情
			matDetail:'',//物料详情
			dialogVisible:false,
			requestObj:{},//接口请求参数
			validityHash:{
				0:'月',
				1:'日',
				2:'年',
			},
			matTypeHash:{
				0:'成品',
				1:'半成品',
				2:'普通物料',
			},
		};
	},
	props:[
		'winObj',
		/*
		*	id //商品物料id
		*	type //类型 1商品 2物料
		*/
	],
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element'),
	},
	mounted(){
		this.requestObj = this.winObj;
		this.title = this.requestObj.type==1 ? '商品信息':'物料信息';
		this.getDetail();
	},
	methods:{
		closeSelfWin(res){
			this.$emit('close',res);
		},
		getDetail(){
			if(this.requestObj.type==1){
				http.InvoicingGetGoodsDetail({data:{
					gid:this.requestObj.id,
				}}).then((data)=>{
					this.setCateStr(data);
					this.goodsDetail = data;
					this.showWin();
				});
			}else{
				http.getMaterialDetail({data:{
					mid:this.requestObj.id,
				}}).then((data)=>{
					let unitNameArr=[],minUnit='',defUnit='';
					for(let item of data.unit){
						unitNameArr.push(item.name);
						if(item.isMin==1){
							minUnit = item.name;
						}
						if(item.isDefault){
							defUnit = item.name;
						}
					}
					let unitConvert=[];//换算列表
					for(let item of data.unit){
						let str = `1${item.name}=${parseInt(item.value)}${minUnit}`;
						unitConvert.push(str);
					}
					data.unitConvert = unitConvert;
					data.unitStr = unitNameArr.join(',');
					data.minUnit = minUnit;
					data.defUnit = defUnit;
					this.setCateStr(data);
					this.matDetail = data;
					this.showWin();
				});
			}
		},
		setCateStr(data){
			let cateArr=[];
			for(let item of data.cate){
				cateArr.push(item.name);
			}
			data.cateStr = cateArr.join(',');
		},
		showWin(){
			this.dialogVisible = true;
		},
	}
};
</script>
<style lang='less' scoped>
	.main{
		overflow: hidden;
		padding: 15px;padding-bottom: 0;
		.block{float: left;width: 50%;
			padding: 0 10px;
			p{display: flex;margin-bottom: 15px;line-height: 1.5;
				em,span{display: inline-block;color: #444;}
				em{white-space: nowrap;}
				i{display: inline-block;padding-bottom: 10px;}
			}
		}
	}
</style>