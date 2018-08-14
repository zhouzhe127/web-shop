<!--
	**领料盘库
	*
	* 胡江
	* *
	*
-->
<template>
	<div>
		<div class="ic-title">
			<div class="text">
				领料盘库
			</div>
			<div class="dashed">
			</div>
		</div>
		<section class="ic-contern">
				<span class="span_contern">领料人：{{info.name}}</span>
				<span class="span_contern">操作人：{{creatName}}</span>
				<span class="span_contern">备注<input class="remenber" v-model="remark" maxlength="40" type="text" placeholder="请填写备注信息，限四十字以内"/></span>
		</section>
		<div class="list_num">
			<section class="totle" >
				<div class="head">
					盘库列表 · 共<span style="color: #F8931F;padding: 0 3px;font-size: inherit;">{{storageInfo.length}}</span>个条目
				</div>
				<ul class="oUl oulFirst">
					<li>操作</li>
					<li>物料名称</li>
					<li>领料单位选择</li>
					<li style="width: 15%">领料数量/重量</li>
					<li style="width: 20%">消耗数量/重量 <span style="color:#FF3D04;cursor:pointer" @click="allUse">全部消耗</span> </li>
					<li style="width: 20%">回库数量/重量 <span style="color:#27A8E0;cursor:pointer" @click="allBack">剩余回库</span> </li>
					<li >分类</li>
					<li >类型</li>
				</ul>
				<ul class="oUl oulSecond" v-for="(item, index) in infoList" :key="index">
					<li style="cursor:pointer;color:#27A8E0;font-size: 16px;" @click="doThing(item)">
						批次处理
					</li>
					<li :title="item.materialName" class="hide">{{item.materialName}}</li>
					<li @click="select(item,item.index)">
						<selectBtn @emit="selectType"  :sorts="item.options" :width="'80'" :index="item.index" :name="item.selUnit.name"></selectBtn>
					</li>
					<li style="width: 15%" class="hide" :title="item.unit">
						<!-- {{item.number}} -->
						<!-- {{comUnit(item.number,item.selUnit.value,item.selUnit.name,item.minUnit.name)}} -->
						{{item.unit}}
					</li>
					<li style="width: 20%;">
						<div class="div_float defaultFloat" :class="{defaultFloat : item.selUnit.isMin == 1}">
							<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useNum" placeholder="请输入数字"/>
							<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
						</div>
						<i v-if="item.selUnit.isMin != 1" style="display:inline-block;vertical-align:top">
							<span style="float: left;margin-right:3px;" class="defaultFloat">+</span>
							<div class="div_float">
								<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useWeight" placeholder="请输入数字"/>
								<span class="span_line" :title="item.isMin">{{item.isMin}}</span>
							</div>
						</i>
					</li>
					<li style="width: 20%">
						<div class="div_float defaultFloat" :class="{defaultFloat : item.selUnit.isMin == 1}">
							<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backNum" placeholder="请输入数字"/>
							<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
						</div>
						<i v-if="item.selUnit.isMin != 1" style="display:inline-block;vertical-align:top">
							<span style="float: left;margin-right:3px;" class="defaultFloat">+</span>
							<div class="div_float">
								<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backWeight" placeholder="请输入数字"/>
								<span class="span_line" :title="item.isMin">{{item.isMin}}</span>
							</div>
						</i>
					</li>
					<li class="hide" :title="item.materialCategoryName">{{item.materialCategoryName}}</li>
					<li class="hide" :title="materType[item.materialType]">{{materType[item.materialType]}}</li>
				</ul>
			</section>
		</div>
		<div class="right">
			<span @click="cancel" class="btn huiC">返回</span>
			<span @click="enter" class="btn yellow">确定</span>
		</div>
		<batchwin @getWin="getWin" v-if="showBatch" :batchInfo="batchInfo" :unitData="unitData"></batchwin>
	</div>
</template>
<script>
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage  from 'src/verdor/storage';
	import utils  from 'src/verdor/utils';
	export default{
		data(){
			return{
				selIndex:-1,
				currentList:[],  //列表数据
				showBatch: false, //批次弹窗\
				storageList: [],
				batchInfo: [], //选择的该物料信息
				infoList: [], //盘库列表
				// minUnit: [], //最小单位信息
				winInfo: '', //盘库选择的数量
				item: '',
				remark: '', //备注
				unitData: [],
				creatName: storage.session('userShop').user.name, //操作人
				storageInfo: '',
				info: '',
				materType:{
					0: '物料'
				}
			};
		},
		// props: ['storageInfo','info'],
		mounted(){
			this.storageInfo = storage.session('plateStorage').storageInfo;
			this.info = storage.session('plateStorage').info;
			this.$store.commit('setPageTools',{});
			this.infoList = utils.deepCopy(this.storageInfo);
			//假数据测试
			// this.options = [];
			// this.infoList.materialUnit=[{default:0,min:1,name:'g',value:'1'},{default:1,min:0,name:'kg',value:'1000'},{default:0,min:0,name:'箱',value:'500'}];
			for(let j = 0; j < this.infoList.length; j++){
				// this.infoList[j].materialUnit=[{default:0,min:0,name:'kg',value:'8'},{default:0,min:1,name:'g',value:'1'},{default:1,min:0,name:'箱',value:'6'}];
				let options = [];
				for(let i = 0; i < this.infoList[j].materialUnit.length; i++){
					if(this.infoList[j].materialUnit[i].isDefault == 1){
						options.unshift(this.infoList[j].materialUnit[i].name);
						this.infoList[j].materialUnit.unshift(this.infoList[j].materialUnit[i]);
						this.infoList[j].materialUnit.splice(i+1,1);
					}else{
						options.push(this.infoList[j].materialUnit[i].name);
					}
					if(this.infoList[j].materialUnit[i].isMin == 1){
						this.infoList[j].isMin = this.infoList[j].materialUnit[i].name;
						this.infoList[j].minUnit = this.infoList[j].materialUnit[i];
					}
					if(this.infoList[j].materialUnit[i].isDefault == 1){
						this.infoList[j].isDefault = this.infoList[j].materialUnit[i].name;
					}
				}
				this.infoList[j].options = options;
			}
			for(let i = 0; i < this.infoList.length; i++){
				for(let j = 0; j < this.infoList[i].materialUnit.length; j++){
					if(j == 0){
						this.infoList[i].selUnit = this.infoList[i].materialUnit[j];
						this.infoList[i].unit = this.comUnit(this.infoList[i].surplus,this.infoList[i].selUnit.value,this.infoList[i].selUnit.name,this.infoList[i].minUnit.name);
					}
				}
			}
		},
		methods:{
			selectType(index){
				// let list = this.infoList.materialUnit;
				for(let i = 0; i < this.infoList.length; i++){
					for(let j = 0; j < this.infoList[i].materialUnit.length; j++){
						if(this.item.materialId ==  this.infoList[i].materialId){
							this.infoList[i].selUnit = this.infoList[i].materialUnit[index];
							this.infoList[i].unit = this.comUnit(this.infoList[i].surplus,this.infoList[i].selUnit.value,this.infoList[i].selUnit.name,this.infoList[i].minUnit.name);
						}
					}
				}
				for(let j = 0; j < this.infoList.length; j++){
					if(this.item.materialId ==  this.infoList[j].materialId){
						let obj = this.comUnit(this.infoList[j].usemin,this.infoList[j].selUnit.value,this.infoList[j].selUnit.name,this.infoList[j].minUnit.name,true);
						let objback = this.comUnit(this.infoList[j].backmin,this.infoList[j].selUnit.value,this.infoList[j].selUnit.name,this.infoList[j].minUnit.name,true);
						if(this.infoList[j].selUnit.isMin != 1){
							this.infoList[j].useNum = obj.oNull;
							obj.tNull == '0.000' ? '' : this.infoList[j].useWeight = obj.tNull;
							this.infoList[j].backNum = objback.oNull;
							objback.tNull == '0.000' ? '' : this.infoList[j].backWeight = objback.tNull;
						}else {
							if(obj.oNull){
								this.infoList[j].useNum = obj.oNull;
								obj.tNull == '0.000' ? '' : this.infoList[j].useWeight = obj.tNull;
							}else{
								obj.tNull == 0 ? '' : this.infoList[j].useNum =  obj.tNull;
								this.infoList[j].useWeight = '';
							}
							if(objback.oNull){
								this.infoList[j].backNum = objback.oNull;
								objback.tNull == '0.000' ? '' : this.infoList[j].backWeight = objback.tNull;
							}else{
								objback.tNull == 0 ? '' : this.infoList[j].backNum =  objback.tNull;
								this.infoList[j].backWeight = '';
							}
						}
					}
				}
				
				this.select(this.item,index);

			},
			select(item,index){
				this.item = item;
				item.index = index;
				this.selIndex = index;
			},
			getmin(item,type){
				if(type != '1'){
					item.useNum != '' ? item.useNum = (item.useNum+'').replace(/[^\d.]/g,'') : item.useNum = '';
					item.useWeight != '' ? item.useWeight = (item.useWeight+'').replace(/[^\d.]/g,'') : item.useWeight = '';
					item.usemin = item.useNum*item.selUnit.value+item.useWeight*1;
				}else{
					item.backNum != '' ? item.backNum = (item.backNum+'').replace(/[^\d.]/g,'') : item.backNum = '';
					item.backWeight != '' ? item.backWeight = (item.backWeight+'').replace(/[^\d.]/g,'') : item.backWeight = '';
					item.backmin = item.backNum*item.selUnit.value+item.backWeight*1;
				}
			},
			//单位换算
			comUnit(...reset){ //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number,value,showName,minName,type] = reset;
				return global.comUnit(number,value,showName,minName,type);
			},
			//批次处理
			doThing(item){
				this.showBatch = true;
				this.batchInfo = item;
				this.item = item;
				this.unitData = item.materialUnit;
			},
			//全部消耗
			allUse(){
				for(let i = 0; i < this.infoList.length; i++){
					let str = this.comUnit(this.infoList[i].surplus,this.infoList[i].selUnit.value,this.infoList[i].selUnit.name,this.infoList[i].minUnit.name,true);
					if(this.infoList[i].selUnit.isMin != 1){
						this.infoList[i].useNum = str.oNull;
						this.infoList[i].useWeight = str.tNull;
					}else{
						this.infoList[i].useNum = str.tNull;
						this.infoList[i].useWeight = '';
					}
					this.infoList[i].backNum = '';
					this.infoList[i].backWeight = '';
					this.infoList[i].usemin = this.infoList[i].useNum * this.infoList[i].selUnit.value + this.infoList[i].useWeight*1; //消耗的最小单位数量
				}
			},
			//剩余回库
			allBack(){
				for(let i = 0; i < this.infoList.length; i++){
					let data = this.infoList[i].surplus*1 - this.infoList[i].usemin;
					let str = this.comUnit(data,this.infoList[i].selUnit.value,this.infoList[i].selUnit.name,this.infoList[i].minUnit.name,true);
					if(this.infoList[i].selUnit.isMin != 1){
						this.infoList[i].backNum = str.oNull;
						this.infoList[i].backWeight = str.tNull;
					}else{
						this.infoList[i].backNum = str.tNull;
						this.infoList[i].backWeight = '';
					}
					this.infoList[i].backmin = this.infoList[i].backNum * this.infoList[i].selUnit.value + this.infoList[i].backWeight*1;
				}
			},
			//取消
			cancel(){
				this.$emit('storageReturn',true);
				this.$router.push({path:'../pickingList/checkDetails',query:this.$route.query});
			},
			//领料盘库确定
			async invoicingCheckMaterial(obj){
				let res = await http.invoicingCheckMaterial({data:obj});
				if(res == false){
					this.$store.commit('setWin',{winType:'alert',content:'盘库失败'});
				}else{
					storage.session('listDetail',res);
					this.$router.push({path:'plateDetails',query:this.$route.query});
				}
			},
			//确定
			enter(){
				for(let i = 0; i < this.infoList.length; i++){
					if(this.infoList[i].usemin > this.infoList[i].number){ 
						this.$store.commit('setWin',{winType:'alert',content:'物料：' + this.infoList[i].materialName + ' 消耗数量不能大于领料数量'});
						return false;
					}
					if(this.infoList[i].backmin > (this.infoList[i].number*1-this.infoList[i].usemin*1)){
						this.$store.commit('setWin',{winType:'alert',content:'物料：' + this.infoList[i].materialName + ' 回库数量不足'});
						return false;
					}
				}
				let returnData = {
					'owner': this.info.id,
					'ownerName': this.info.name,
					'creatorName': this.creatName,
					'remark': this.remark,
					'materialDetail': []
				};
				//整合字段传给后台
				for(let i = 0; i < this.infoList.length; i++){
					let obj = {
						'materialId': '',                    //物料id
						'materialName': '',               //物料名
						'materialType': '',                    //物料类型      0物料
						'materialCategory': '',                //物料分类id     多个分类用,分割
						'materialCategoryName': '',       //物料分类名     多个分类用,分割
						'validity': '',              //保质期
						'validityType': '',             //保质期类型
						'consumeNum': '',                         //消耗数量（以最小单位计算）
						'returnNum': '',                         //回库数量（以最小单位计算）
						'batchDetail': [],  //批次
					};
					for(let key in obj){
						obj[key] = this.infoList[i][key];
						if(key == 'consumeNum'){
							obj[key] = this.infoList[i].usemin;
						}
						if(key == 'returnNum'){
							obj[key] = this.infoList[i].backmin;
						}
					}
					if(!obj.consumeNum && !obj.returnNum){
						continue;  //没有填写数量  过滤掉
					}
					obj.batchDetail = [];
					let consumeNum = 0; // 计算批次内消耗总量
					let returnNum = 0; // 计算批次内回库总量
					if(this.infoList[i].batchDetail){
						for(let j = 0; j < this.infoList[i].batchDetail.length; j++){
							let batch = {
								'id': '',                //批次id
								'materialId': '',                //物料id
								'recordId': '',                //批次id
								'batchId': '',                //批次id
								'wid' : '',                   //仓库id
								'areaId' : '',               //区域id
								'consumeNum': '',                 //领取量（以最小单位计算）
								'returnNum': ''                 //领取量（以最小单位计算）
							};
							for(let m in batch){
								batch[m] = this.infoList[i].batchDetail[j][m];
								if(m == 'consumeNum'){
									batch[m] = this.infoList[i].batchDetail[j].usemin;
								}
								if(m == 'returnNum'){
									batch[m] = this.infoList[i].batchDetail[j].backmin;
								}
							}
							batch.number = this.infoList[i].batchDetail[j].minNumber;
							consumeNum += batch.consumeNum*1;
							returnNum += batch.returnNum*1;
							obj.batchDetail.push(batch);
						}
					}
					if(obj.consumeNum != consumeNum || obj.returnNum != returnNum){
						obj.batchDetail = [];
					}
					returnData.materialDetail.push(obj);
				}
				if(returnData.materialDetail.length == 0){
					this.$store.commit('setWin',{winType:'alert',content:'请填写消耗数量或回库数量'});
					return false;
				}
				
				this.invoicingCheckMaterial(returnData);

			},
			//获取批次弹窗
			getWin(res,info,batch){
				if(res == 'ok'){
					this.winInfo = info;
					for(let i = 0; i < this.infoList.length; i++){
						for(let j = 0; j < this.infoList[i].materialUnit.length; j++){
							if(this.infoList[i].materialId == info.materialId && this.infoList[i].materialUnit[j].name == info.selUnit.name){
								this.selectType(j);
							}
						}
						if(this.infoList[i].materialId == info.materialId){
							this.infoList[i].useNum = '';
							this.infoList[i].useWeight = '';
							this.infoList[i].backNum = '';
							this.infoList[i].backWeight = '';
							for(let j = 0; j < batch.length; j++){
								this.infoList[i].useNum = this.infoList[i].useNum*1 + batch[j].useNum*1;
								this.infoList[i].useWeight = this.infoList[i].useWeight*1 + batch[j].useWeight*1;
								this.infoList[i].backNum = this.infoList[i].backNum*1 + batch[j].backNum*1;
								this.infoList[i].backWeight = this.infoList[i].backWeight*1 + batch[j].backWeight*1;
							}
						}
					}
					//整合字段传给后台
					for(let i = 0; i < this.infoList.length; i++){
						this.infoList[i].consumeNum = this.infoList[i].usemin;
						this.infoList[i].returnNum = this.infoList[i].backmin;
						this.infoList[i].initialNum = this.infoList[i].surplus;
						this.infoList[i].batchDetail = [];
						if(this.infoList[i].materialId == info.materialId){
							for(let j = 0; j < this.infoList[i].batch.length; j++){
								for(let key in this.infoList[i].batch[j]){
									this.infoList[i].batch[j][key] = batch[j][key];
								}
							}
						}
						for(let k = 0; k < this.infoList[i].batch.length; k++){
							if(this.infoList[i].batch[k].usemin || this.infoList[i].batch[k].backmin){
								this.infoList[i].batch[k].consumeNum = this.infoList[i].batch[k].usemin;
								this.infoList[i].batch[k].returnNum = this.infoList[i].batch[k].backmin;
								this.infoList[i].batchDetail.push(this.infoList[i].batch[k]);
							}
						}
					}

				}
				this.showBatch = false;
			}
		},
		components:{
			selectBtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			batchwin: ()=> import (/*webpackChunkName: 'storage_win'*/ './storage_win')
		}
	};
</script>

<style scoped>
	.ic-title {
		width: 920px;
		height: 30px;
		line-height: 30px;
		position: relative;
	}
	.ic-title .text {
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
	.ic-title .dashed {
		width: 835px;
		height: 10px;
		border-top: 1px dashed rgb(228,229,230);
		position: absolute;
		right: 0;
		top: 20px;
	}
	/*中间文字================================*/
	.ic-contern{
		margin-left: 50px;
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.ic-contern .span_contern{
		font-size: 16px;
		margin-right: 120px;
		display: inline-block;
		margin-top: 10px;
	}
	.ic-contern .remenber{
		width:420px;
		height:40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #A5A5A5;
		font-size: 14px;
		margin-left: 15px;
	}
	/*列表=====================================*/
	.totle{
		width: 1300px;
		min-width: 1300px;
		border: 1px solid #D2D2D2;background-color: #FFFFFF;
	}
	.totle .head{
		height: 50px;
		line-height: 50px;
		font-size: 16px;
		padding-left: 20px;
		color: #333333;
	}
	.totle .oulFirst{
		background-color: #F2F2F2;color:#434149;
	}
	.totle .oulFirst li{
		font-size: 16px;
	}
	.totle .oUl{
		color:#333333;
		/* overflow: hidden; */
		height: 60px;
		border-bottom: 3px solid #f7f7f7;
	}
	.totle .oUl li{
		width:9%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		float: left;
	}
	.totle .oUl .hide{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.totle .oulSecond{
		color: #666666;
	}
	/*.totle .oulSecond li span{*/
		/*font-size: 16px*/
	/*}*/
	/*==========列表输入框===============================*/
	.div_float{
		display: inline-block;
		float: left;
		margin-top: 10px;
	}
	.defaultFloat{
		float: initial;
	}
	.searchgoods{
		float: left;
		width: 70px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border: 1px solid #B3B3B3;
		border-right: 0;
		outline: 0;
	}
	.span_line{
		display: inline-block;
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		border: 1px solid #B3B3B3;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/*====================*/
	.right{
		margin-top: 50px;
		margin-left: 100px;
	}
	.btn{
		display: inline-block;
		width: 200px;
		height: 50px;
		line-height: 50px;
		color: #fff;
		border: 1px solid;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
	}
	.huiC{
		border: 1px solid #B3B3B3;
		color: #B3B3B3;
	}
</style>