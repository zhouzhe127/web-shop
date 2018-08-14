<!--
	**领料/领料人详情
	*
	* 胡江
	* *
	*
-->
<template>
	<div id="people_del">
		<div v-if="isPickerDetail">
			<div class="ic-title">
				<div class="text">
				  {{fromPicking?'领料详情':'领料人详情'}}
				</div>
				<div class="dashed">
				</div>
			</div>
			<template v-if="!fromPicking">
				<section class="ic-contern">
					<div class="all-contern">
						<span class="span_contern">领料人：{{info.name}}</span>
					</div>
				</section>
			</template>
			<template v-if="fromPicking">
				<section class="ic-contern">
					<div class="all-contern">
						领料原因：{{detail.reason}}
					</div>
					<div class="all-contern">
						<span class="span_contern">领料人：{{detail.ownerName}}</span>
						<span class="span_contern">操作人：{{detail.creatorName}}</span>
					</div>
					<div class="all-contern">
						备注：{{detail.remarks?detail.remarks:'--'}}
					</div>
				</section>
			</template>

			<div class="list_num">
				<section class="totle" >
					<div class="head">
						所领物料 · 共<span class="wen_zi">{{detailList.length}}</span>个条目
						<span class="changeList" @click="changeList()">{{isChangeList?'简洁':'详细'}}</span>
					</div>
					<ul class="oUl oulFirst">
						<li>序号</li>
						<li>物料名</li>
						<li>分类</li>
						<li>类型</li>
						<li>领料单位选择</li>
						<li>{{fromPicking?'领料数量/重量':'剩余数量/重量'}}</li>
					</ul>
					<ul v-if="detailList.length==0" style="width: 100%;color: orange;">
						<li style="height: 50px;line-height: 50px;text-align: center;">无记录</li>
					</ul>
					<section  v-if="detailList.length!=0" v-for="(item,j) in detailList" :key="j" style="clear: both">
						<ul class="oUl oulSecond"  >
							<li>
								{{j+1}}
							</li>
							<li class="over_hide" :title="item.materialName">{{item.materialName}}</li>
							<li class="over_hide" :title="item.materialCategoryName">{{item.materialCategoryName}}</li>
							<li>{{getType(item.materialType)}}</li>
							<li style="line-height: 0;margin-top: 15px" @click="backItem(item,item.indexDe)">
								<selectBtn @emit="selectType"  :sorts="item.unitList" :index="item.indexDe" :width="'80'"></selectBtn>
							</li>
							<li class="over_hide" :title="item.showSurplus">{{item.showSurplus}}</li>
						</ul>
						<div  style="border-bottom: 3px solid #f7f7f7;">
							<ul class="oulThd font16" v-if="isChangeList&&(item.batch&&item.batch.length!=0)">
								<li>序号</li>
								<li>批次编码</li>
								<li>生产日期</li>
								<li>供应商</li>
								<li>进价</li>
								<li>所属仓库</li>
								<li>{{fromPicking?'领料数量/重量':'剩余数量/重量'}}</li>
							</ul>
							<ul class="oulThd" v-if="isChangeList&&(item.batch&&item.batch.length!=0)"   v-for="(info,i) in item.batch" :key="i">
								<li>批次{{i+1}}</li>
								<li class="over_hide" :title="info.batchCode">{{info.batchCode}}</li>
								<li>{{transformTime(info.productionTime)}}</li>
								<li class="over_hide" :title="info.supplier">{{info.supplier}}</li>
								<li class="over_hide" :title="info.purchasePrice">{{info.purchasePrice}}</li>
								<li class="over_hide" :title="info.warehouseName+'-'+info.areaName">{{info.warehouseName}}-{{info.areaName}}</li>
								<li class="over_hide" :title="info.showSurplus">{{info.showSurplus}}</li>
							</ul>
						</div>
					</section>
				</section>
			</div>
		</div>
		<!-- <plateStorage v-else @storageReturn="storageReturn" :storageInfo="detailList" :info="info"></plateStorage> -->
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
				detailList:[], //领料详情列表
				fromPicking:{}, //领料记录页面传递的值
				isChangeList:false,  //列表的展开与隐藏
				isPickerDetail: true, //盘库详情
				item: {},          //保存点击的该条信息
				detail:{},
				info: '',
			};
		},
		// props:['info'],
		mounted(){
			this.fromPicking = storage.session('listDetail');
			this.info = storage.session('info');
			this.initBtn();
		},
		destroyed(){
			storage.session('listDetail',null);
		},
		methods:{
			initBtn(){
				if(this.fromPicking){
					this.$store.commit('setHeaderTil',{type: 'push', params: [{title:'查看详情'}]});
					let arr = [{name:'返回',className:'huiC',fn:()=>{
						storage.session('listDetail',null);
						storage.session('isBackPickingRecord',true);   //是否点击返回
						this.$router.push({path:'../pickingList',query:this.$route.query});
					}}];
					this.$store.commit('setPageTools',arr);
					this.initOne();
				}else{
					this.$store.commit('setHeaderTil',{type: 'push', params: [{title:'领料人详情'}]});
					let arr = [{
						name:'返回',
						className:'huiC',
						fn:()=>{
							// this.$emit('throwWinResult',false);
							this.$store.commit('setPageTools',{});
							storage.session('numType',{num:1});
							this.$router.push({path:'../pickingList',query:this.$route.query});
						}},{
						name:'领料盘库',
						className:'pickCheck',
						fn:()=>{
							this.isPickerDetail = false;
							let data = {storageInfo:this.detailList,info:this.info};
							storage.session('plateStorage',data);
							this.$router.push({path:'../pickingList/plateStorage',query:this.$route.query});
						}}];
					this.$store.commit('setPageTools',arr);
					this.getDetailByOwner();
				}
			},
			//获取物料的类型
			getType(type){
				let showType={0:'成品',1:'半成品',2:'普通物料'};
				for(let key in showType){
					if(key==type){
						return showType[key];
					}
				}
				return '--';
			},
			//列表的展开与隐藏
			changeList(){
				this.isChangeList=!this.isChangeList;
			},
			selectType(index){
				this.backItem(this.item,index);
			},
			backItem(item,index){
				this.item=item;
				item.indexDe=index;
				let showName=item.unitList[index];      //展示的单位名称
				let value='';                                //换算关系
				for(let k=0;k<item.materialUnit.length;k++){
					if(item.materialUnit[k].name==showName){
						value=item.materialUnit[k].value;
					}
				}
				item.showSurplus=global.comUnit(item.surplus,value,showName,item.minName);   //外层列表
				if(item.batch&&item.batch.length!=0){
					for(let k=0;k<item.batch.length;k++){
						item.batch[k].showSurplus=global.comUnit(item.batch[k].surplus,value,showName,item.minName);   //内层列表
					}
				}
			},
			unitConversion(){
				for(let i=0;i<this.detailList.length;i++){
					let unitList=[];
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
					this.detailList[i].indexDe=0;
					//显示默认单位值
					this.detailList[i].showSurplus=global.comUnit(this.detailList[i].surplus,this.detailList[i].defaultValue,this.detailList[i].defaultName,this.detailList[i].minName);
					if(this.detailList[i].batch&&this.detailList[i].batch.length!=0){
						for(let k=0;k<this.detailList[i].batch.length;k++){
							this.detailList[i].batch[k].showSurplus=global.comUnit(this.detailList[i].batch[k].surplus,this.detailList[i].defaultValue,this.detailList[i].defaultName,this.detailList[i].minName);
						}
					}
				}
			},
			// 获取领料人详情
			async getDetailByOwner(){
				let res = await http.getDetailByOwner({data:{
					owner: this.info.id
				}});
				if(res){
					for(let i = 0; i < res.length; i++){
						res[i].showSurplus='';      //领料余量
						res[i].useNum = '';
						res[i].useWeight = '';
						res[i].backNum = '';
						res[i].backWeight = '';
						res[i].usemin = ''; //消耗的最小单位数量
						res[i].backmin = ''; //回库的最小单位数量
						res[i].selUnit = ''; //该批次选择的单位
						res[i].unit = ''; //该批次单位
						res[i].index = 0; //选择框选中index
						if(res[i].batch&&res[i].batch.length!=0){
							for(let k = 0; k < res[i].batch.length; k++){
								res[i].batch[k].useNum = '';
								res[i].batch[k].useWeight = '';
								res[i].batch[k].backNum = '';
								res[i].batch[k].backWeight = '';
								res[i].batch[k].usemin = ''; //消耗的最小单位数量
								res[i].batch[k].backmin = ''; //回库的最小单位数量
								res[i].batch[k].selUnit = ''; //该批次选择的单位
								res[i].batch[k].unit = ''; //该批次单位
								res[i].batch[k].showSurplus= '';//领料余量
							}
						}
					}
					this.detailList = utils.deepCopy(res);
					this.unitConversion();
				}
			},
			// 获取领料详情
			async initOne(){
				let res=await http.MaterialreceiveGetLogDetail({
					data:{id:this.fromPicking.id}
				});
				if(res){
					this.detail=res;
					for(let i = 0; i < res.material.length; i++){
						res.material[i].showSurplus='';      //领料量
						res.material[i].surplus=res.material[i].number;   //把领料量赋给剩余量
						if(res.material[i].batch&&res.material[i].batch.length!=0){
							for(let j=0;j<res.material[i].batch.length;j++){
								res.material[i].batch[j].showSurplus='';      //领料量
								res.material[i].batch[j].surplus=res.material[i].batch[j].number;   //把领料量赋给剩余量
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
			//领料盘库返回
			storageReturn(res){
				this.isPickerDetail = res;
				Promise.resolve().then(()=>{
					this.initBtn();
				});
			},
		},
		components:{
			plateStorage: ()=> import (/*webpackChunkName: 'plate_storage'*/ './plate_storage'),
			selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		},
	};

</script>

<style scoped lang="less">
	#people_del{
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
					margin-right: 50px;
				}
			}
		}
		.list_num{
			min-width: 780px;
			border: 1px solid #D2D2D2;
			.totle{
				background-color: #FFFFFF;
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
						width:16.6%;
						height: 40px;
						line-height: 40px;
						text-align: center;
						float: left;
					}
				}
				.oulSecond{
					width:100%;
					height: 70px;
					li{
						font-size: 14px;
						color: #666666;
						width:16.6%;
						height: 70px;
						line-height: 70px;
						float: left;
					}
				}
				.oulThd{
					width:100%;
					height: 30px;
					overflow: hidden;
					li{
						color:#999999;
						font-size: 14px;
						width: 14.2%;
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
			}
		}
	}
</style>