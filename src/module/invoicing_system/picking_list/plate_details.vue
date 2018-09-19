<!--
	**领料盘库详情
	*
	* 胡江
	* *
	*
-->
<template>
	<div  id="plate_div">
		<div class="ic-title">
			<div class="text">
				领料盘库详情
			</div>
			<div class="dashed">
			</div>
		</div>
		<section class="ic-contern">
			<div class="all-contern">
				<span class="span_contern">领料人：{{detail.ownerName}}</span>
				<span class="span_contern">操作人：{{detail.creatorName}}</span>
				<span class="span_contern"> 备注：{{detail.remarks?detail.remarks:'--'}}</span>
			</div>
		</section>
		<div class="list_num">
			<section class="totle" >
				<div class="head">
					所领物料 · 共<span  class="wen_zi">{{detailList.length}}</span>个条目
					<span class="changeList" @click="changeList()">{{isChangeList?'简洁':'详细'}}</span>
				</div>
				<ul class="oUl oulFirst">
					<li >序号</li>
					<li>物料名</li>
					<li>分类</li>
					<li>类型</li>
					<li >领料单位选择</li>
					<li >领料消耗</li>
					<li >领料回库</li>
					<li >领料人盘库前</li>
					<li >领料人盘库后</li>
				</ul>
				<ul v-if="detailList.length==0" class="no_record">
					<li>无记录</li>
				</ul>
				<section v-if="detailList.length!=0"  v-for="(item,j) in detailList" :key="j" style="clear: both">
					<ul class="oUl oulSecond">
						<li>
							{{j+1}}
						</li>
						<li class="over_hide" :title="item.materialName">{{item.materialName}}</li>
						<li class="over_hide" :title="item.materialCategoryName">{{item.materialCategoryName}}</li>
						<li>{{getType(item.materialType)}}</li>
						<li style="line-height: 0;margin-top: 15px" @click="backItem(item,item.index)">
							<selectBtn @emit="selectType"  :sorts="item.unitList" :index="item.index"  :width="'80'"></selectBtn>
						</li>
						<li class="over_hide" :title="item.number">{{item.number}}</li>
						<li class="over_hide" :title="item.backJ">{{item.backJ}}</li>
						<li class="over_hide" :title="item.beforeJ">{{item.beforeJ}}</li>
						<li class="over_hide" :title="item.afterJ">{{item.afterJ}}</li>
					</ul>
					<section style="border-bottom: 3px solid #f7f7f7;">
						<ul class="oulThd font16" v-if="isChangeList&&(item.batch.length!=0)">
							<li>序号</li>
							<li>批次编码</li>
							<li>生产日期</li>
							<li>供应商</li>
							<li>进价</li>
							<li>所属仓库</li>
							<li >领料消耗</li>
							<li >领料回库</li>
							<li >领料人盘库前</li>
							<li >领料人盘库后</li>
						</ul>
						<ul class="oulThd" v-if="isChangeList&&(item.batch.length!=0)" v-for="(info,i) in item.batch" :key="i">
							<li>批次{{i+1}}</li>
							<li class="over_hide" :title="info.batchCode">{{info.batchCode}}</li>
							<li>{{transformTime(info.productionTime)}}</li>
							<li class="over_hide" :title="info.supplier">{{info.supplier}}</li>
							<li class="over_hide" :title="info.purchasePrice">{{info.purchasePrice}}</li>
							<li  class="over_hide" :title="info.warehouseName+'-'+info.areaName">{{info.warehouseName}}-{{info.areaName}}</li>
							<li class="over_hide" :title="info.number">{{info.number}}</li>
							<li class="over_hide" :title="info.backJ">{{info.backJ}}</li>
							<li class="over_hide" :title="info.beforeJ">{{info.beforeJ}}</li>
							<li class="over_hide" :title="info.afterJ">{{info.afterJ}}</li>
						</ul>
					</section>
				</section>
			</section>
		</div>
	</div>
</template>

<script>
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	export default{
		data(){
			return{
				detailList:[],              //详情列表
				fromPicking:{}, //领料记录页面传递的值
				isChangeList:false,  //列表的展开与隐藏
				item:{},
				detail:{}
			};
		},
		mounted(){
			this.$store.commit('setHeaderTil',{type: 'push', params: [{title:'查看详情'}]});
			let arr = [{name:'返回',className:'huiC',fn:()=>{
				storage.session('listDetail',null);
				storage.session('isBackPickingRecord',true);   //是否点击返回
				this.$router.push({path:'../pickingList',query:this.$route.query});
			}}];
			this.$store.commit('setPageTools',arr);
			this.fromPicking = storage.session('listDetail');
			this.initOne();
		},
		destroyed(){
			storage.session('listDetail',null);
		},
		methods:{
			//列表的展开与隐藏
			changeList(){
				this.isChangeList=!this.isChangeList;
			},
			//获取物料的类型
			getType(type){
				let showType={0:'物料',};
				for(let key in showType){
					if(key==type){
						return showType[key];
					}
				}
				return '--';
			},
			//选择单位
			selectType(index){
				this.backItem(this.item,index);
			},
			backItem(item,index){
				this.item=item;
				item.index=index;
				let showName=item.unitList[index];      //展示的单位名称
				let value='';                                //换算关系
				for(let k=0;k<item.materialUnit.length;k++){
					if(item.materialUnit[k].name==showName){
						value=item.materialUnit[k].value;
					}
				}
				item.number=global.comUnit(item.consumeNum,value,showName,item.minName);   //外层列表
				item.backJ=global.comUnit(item.returnNum,value,showName,item.minName);   //外层列表
				item.beforeJ=global.comUnit(item.initialNum,value,showName,item.minName);   //外层列表
				item.afterJ=global.comUnit(item.surplus,value,showName,item.minName);   //外层列表

				if(item.batch&&item.batch.length!=0){
					for(let k=0;k<item.batch.length;k++){
						item.batch[k].number=global.comUnit(item.batch[k].consumeNum,value,showName,item.minName);   //内层列表
						item.batch[k].backJ=global.comUnit(item.batch[k].returnNum,value,showName,item.minName);   //内层列表
						item.batch[k].beforeJ=global.comUnit(item.batch[k].initialNum,value,showName,item.minName);   //内层列表
						item.batch[k].afterJ=global.comUnit(item.batch[k].surplus,value,showName,item.minName);   //内层列表
					}
				}
			},
			unitConversion(){
				for(let i=0;i<this.detailList.length;i++){
					let unitList=[];  //单位列表
					for(let j=0;j<this.detailList[i].materialUnit.length;j++){
						if(this.detailList[i].materialUnit[j].isDefault==1){
							this.detailList[i].defaultName=this.detailList[i].materialUnit[j].name;  //默认单位名
							this.detailList[i].defaultValue=this.detailList[i].materialUnit[j].value;  //默认单位的换算关系
						}
						if(this.detailList[i].materialUnit[j].isMin==1){
							this.detailList[i].minName=this.detailList[i].materialUnit[j].name;  //最小单位
						}
						unitList=unitList.concat(this.detailList[i].materialUnit[j].name);        //单位列表
						for(let b=0;b<unitList.length;b++){                                      //把默认单位放到数组第一位
							if(unitList[b]==this.detailList[i].defaultName){
								let str = unitList.splice(b,1);
								unitList.unshift(str[0]);
							}
						}
						this.detailList[i].unitList=unitList;
					}
					this.detailList[i].index=0;
					//显示默认单位值
					let value=this.detailList[i].defaultValue,name=this.detailList[i].defaultName,minName=this.detailList[i].minName;
					this.detailList[i].number=global.comUnit(this.detailList[i].consumeNum,value,name,minName);
					this.detailList[i].backJ=global.comUnit(this.detailList[i].returnNum,value,name,minName);
					this.detailList[i].beforeJ=global.comUnit(this.detailList[i].initialNum,value,name,minName);
					this.detailList[i].afterJ=global.comUnit(this.detailList[i].surplus,value,name,minName);
					if(this.detailList[i].batch&&this.detailList[i].batch.length!=0){                 //里面列表
						for(let k=0;k<this.detailList[i].batch.length;k++){
							this.detailList[i].batch[k].number=global.comUnit(this.detailList[i].batch[k].consumeNum,value,name,minName);
							this.detailList[i].batch[k].backJ=global.comUnit(this.detailList[i].batch[k].returnNum,value,name,minName);
							this.detailList[i].batch[k].beforeJ=global.comUnit(this.detailList[i].batch[k].initialNum,value,name,minName);
							this.detailList[i].batch[k].afterJ=global.comUnit(this.detailList[i].batch[k].surplus,value,name,minName);
						}
					}
				}
			},
			async initOne(){
				let res=await http.getCheckMaterialRecord({
					data:{id:this.fromPicking.id}
				});
				if(res){
					this.detail=utils.deepCopy(res);
					for(let j=0;j<res.material.length;j++){
						res.material[j].number='';
						res.material[j].backJ='';
						res.material[j].beforeJ='';
						res.material[j].afterJ='';
						if(res.material[j].batch&&res.material[j].batch.length!=0){
							for(let i=0;i<res.material[j].batch.length;i++){
								res.material[j].batch[i].number='';
								res.material[j].batch[i].backJ='';
								res.material[j].batch[i].beforeJ='';
								res.material[j].batch[i].afterJ='';
							}
						}
					}
					this.detailList=utils.deepCopy(res.material);
					this.unitConversion();
				}
			},
			//把时间戳转化成***年**月**日
			transformTime(time) {
				return utils.format(new Date(Number(time) * 1000),'yyyy-MM-dd');
			},
		},
		components:{
			selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		}
	};
</script>
<style scoped lang="less">
	#plate_div{
		.ic-title {
			width: 650px;
			height: 30px;
			line-height: 30px;
			position: relative;
			.text {
				font-size: 16px;
				width: 120px;
				height: 20px;
				line-height: 20px;
				text-indent: 10px;
				position: absolute;
				left: 0;
				top: 10px;
				border-left: 2px solid rgba(40,168,224,1);
			}
			.dashed {
				width: 535px;
				height: 10px;
				border-top: 1px dashed rgb(228,229,230);
				position: absolute;
				right: 0;
				top: 20px;
			}
		}
		.ic-contern{
			margin-left: 50px;
			margin-top: 20px;
			min-width: 780px;
			.all-contern{
				margin-bottom: 20px;
				color: #333333;
				font-size: 16px;
				.span_contern{
					font-size: 16px;
					margin-right: 150px;
				}
			}
		}
		.list_num{
			width: 100%;
			overflow: auto;
			min-width: 780px;
			background-color: #FFFFFF;
			border: 1px solid #D2D2D2;
			.totle{
				min-width: 1300px;
				height: 100%;
				.head{
					height: 50px;
					line-height: 50px;
					font-size: 16px;
					padding-left: 20px;
					color: #333333;
					.wen_zi{
						color: #F8931F;padding: 0 3px;font-size: inherit;
					}
					.changeList{
						color: #28A8E0;
						font-size: 16px;
						margin-left: 20px;
						cursor: pointer;
					}
				}
				.oUl{
					width:100%;
					color:#333333;
					border-bottom: 3px solid #f7f7f7;
					li{
						text-align: center;
						float: left;
					}
				}
				.oulFirst{
					background-color: #F2F2F2;
					width:100%;
					height: 40px;
					li{
						font-size: 16px;
						color:#43414A;
						width:11.1%;
						height: 40px;
						line-height: 40px;
						text-align: center;
						float: left;
						&:nth-child(1){
							width: 4%;
						}
						&:nth-child(5){
							width: 13%;
						}
						&:nth-child(8){
							width: 13%;
						}
						&:nth-child(9){
							width: 13%;
						}
					}
				}
				.oulSecond{
					width:100%;
					height: 70px;
					li{
						font-size: 14px;
						color: #666666;
						width:11.1%;
						height: 70px;
						line-height: 70px;
						float: left;
						&:nth-child(1){
							width: 4%;
						}
						&:nth-child(5){
							width: 13%;
						}
						&:nth-child(8){
							width: 13%;
						}
						&:nth-child(9){
							width: 13%;
						}
					}
				}
				.oulThd{
					width:100%;
					height: 30px;
					overflow: hidden;
					li{
						color:#999999;
						font-size: 14px;
						width: 10%;
						height: 30px;
						line-height: 30px;
						text-align: center;
						float: left;
					}
				}
				.font16 li{
					font-size: 16px;
				}
				.over_hide{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.no_record{
					width: 100%;color: orange;
					li{
						height: 50px;line-height: 50px;text-align: center;
					}
				}
			}
		}
	}
</style>