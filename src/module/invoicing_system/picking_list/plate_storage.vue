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
				<span class="span_contern">备注：
					<el-input v-model="remark" type="text" maxlength="14" placeholder="请填写备注信息，限四十字以内" style="width:300px"></el-input>
				</span>
		</section>
		<div class="list_num">
			<section class="totle" >
				<div class="head">
					盘库列表 · 共<span style="color: #F8931F;padding: 0 3px;font-size: inherit;">{{storageInfo.length}}</span>个条目
				</div>
				<div class="scroll-box">
					<div class="list-box">
						<ul class="oUl oulFirst">
							<li>操作</li>
							<li>物料名称</li>
							<li>领料单位选择</li>
							<li style="width: 15%">领料数量/重量</li>
							<li style="width: 20%">剩余数量/重量 <span @click="allUse">{{isSurplus?'全部消耗':'全部剩余'}}</span></li>
							<li style="width: 20%">回库数量/重量 <span @click="allBack" style="color:#27A8E0;">剩余回库</span></li>
							<li >分类</li>
							<li >类型</li>
						</ul>
						<ul class="oUl oulSecond" v-for="(item, index) in infoList" :key="index">
							<li style="cursor:pointer;color:#27A8E0;" @click="doThing(item)">
								批次处理
							</li>
							<li :title="item.materialName" class="hide">{{item.materialName}}</li>
							<li>
								<el-select v-model="item.index" @change="(res)=>{selectType(item,res)}" style="width:100px;">
								    <el-option
										v-for="elItem in item.options"
										:key="elItem.value"
										:label="elItem.label"
										:value="elItem.value">
								    </el-option>
								</el-select>
							</li>
							<li style="width: 15%" class="hide" :title="item.unit">
								{{item.unit}}
							</li>
							<li style="width: 20%;">
								<div class="div_float">
									<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useNum" placeholder="请输入"/>
									<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
								</div>
								<template v-if="item.selUnit.isMin != 1">
									<span class="div_float add-sign">+</span>
									<div class="div_float">
										<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useWeight" placeholder="请输入"/>
										<span class="span_line" :title="item.isMin">{{item.isMin}}</span>
									</div>
								</template>
							</li>
							<li style="width: 20%">
								<div class="div_float">
									<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backNum" placeholder="请输入"/>
									<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
								</div>
								<template v-if="item.selUnit.isMin != 1">
									<span class="div_float add-sign">+</span>
									<div class="div_float">
										<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backWeight" placeholder="请输入"/>
										<span class="span_line" :title="item.isMin">{{item.isMin}}</span>
									</div>
								</template>
							</li>
							<li class="hide" :title="item.materialCategoryName">{{item.materialCategoryName}}</li>
							<li class="hide" :title="materType[item.materialType]">{{materType[item.materialType]}}</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
		<batchwin @getWin="getWin" v-if="showBatch" :batchInfo="batchInfo"></batchwin>
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
				selUnit: {},
				batchUnit:[],
				creatName: storage.session('userShop').user.name, //操作人
				storageInfo: '',
				info: '',
				materType:{
					0: '成品',
					1: '半成品',
					2: '普通物料',
				},
				isSurplus:true,//是否全部剩余，默认false
			};
		},
		destroyed(){
			storage.session('plateStorage',null);
		},
		mounted(){
			this.initBtn();
			this.storageInfo = storage.session('plateStorage').storageInfo;
			this.info = storage.session('plateStorage').info;
			this.infoList = utils.deepCopy(this.storageInfo);
			this.setInitData();
		},
		methods:{
			initBtn(){
				let arr=[
					{name: '确认',className: 'success',type:4,
						fn: () => {
							this.enter();
						}
					},
					{name: '返回',className: 'info',type:4,
						fn: () => {
							this.cancel();
						}
					}
				];
				this.$store.commit('setPageTools', arr);
			},
			setInitData(){
				for(let j = 0; j < this.infoList.length; j++){
					let infoItem = this.infoList[j];
					let options = [];
					for(let i = 0; i < infoItem.materialUnit.length; i++){
						let item = infoItem.materialUnit[i];
						let obj={
							value:item.muId,
							label:item.name,
						};
						if(item.isDefault == 1){
							options.unshift(obj);
							infoItem.materialUnit.unshift(item);
							infoItem.materialUnit.splice(i+1,1);
						}else{
							options.push(obj);
						}
						if(item.isMin == 1){
							infoItem.isMin = item.name;
							infoItem.minUnit = item;
						}
						if(item.isDefault == 1){
							infoItem.isDefault = item.name;
						}
					}
					this.$set(infoItem,'options',options);
					this.$set(infoItem,'index',options[0].value);
				}
				for(let infoItem of this.infoList){
					for(let unitItem of infoItem.materialUnit){
						this.$set(infoItem,'selUnit',unitItem);
						infoItem.unit = this.comUnit(infoItem.surplus,unitItem.value,unitItem.name,infoItem.minUnit.name);
						let obj = this.comUnit(infoItem.surplus,unitItem.value,unitItem.name,infoItem.minUnit.name,true);
						if(infoItem.selUnit.isMin == 1){
							infoItem.useNum = obj.tNull;
						}else{
							infoItem.useNum = obj.oNull;
							infoItem.useWeight = obj.tNull;
						}
						break;
					}
					for(let unitItem of infoItem.materialUnit){
						if(unitItem.isDefault == 1){
							this.$set(infoItem,'defUnit',unitItem);
							break;
						}
					}
				}
				
			},
			selectType(item,unitId){
				let infoItem = item;
				for(let unitItem of infoItem.materialUnit){
					if(unitId ==  unitItem.muId){
						infoItem.selUnit = unitItem;
						infoItem.unit = this.comUnit(infoItem.surplus,unitItem.value,unitItem.name,infoItem.minUnit.name);
						break;
					}
				}
				let obj = this.comUnit(infoItem.usemin,infoItem.selUnit.value,infoItem.selUnit.name,infoItem.minUnit.name,true);
				let objback = this.comUnit(infoItem.backmin,infoItem.selUnit.value,infoItem.selUnit.name,infoItem.minUnit.name,true);
				if(infoItem.selUnit.isMin != 1){
					infoItem.useNum = obj.oNull;
					obj.tNull == '0.000' ? '' : infoItem.useWeight = obj.tNull;
					infoItem.backNum = objback.oNull;
					objback.tNull == '0.000' ? '' : infoItem.backWeight = objback.tNull;
				}else {
					if(obj.oNull){
						infoItem.useNum = obj.oNull;
						obj.tNull == '0.000' ? '' : infoItem.useWeight = obj.tNull;
					}else{
						obj.tNull == 0 ? '' : infoItem.useNum =  obj.tNull;
						infoItem.useWeight = '';
					}
					if(objback.oNull){
						infoItem.backNum = objback.oNull;
						objback.tNull == '0.000' ? '' : infoItem.backWeight = objback.tNull;
					}else{
						objback.tNull == 0 ? '' : infoItem.backNum =  objback.tNull;
						infoItem.backWeight = '';
					}
				}
				item.index = unitId;
			},
			getmin(item,type){
				if(type != '1'){
					item.useNum !== '' ? item.useNum = (item.useNum+'').replace(/[^\d.]/g,'') : item.useNum = '';
					item.useWeight !== '' ? item.useWeight = (item.useWeight+'').replace(/[^\d.]/g,'') : item.useWeight = '';
					item.usemin = item.useNum*item.selUnit.value+item.useWeight*1;
				}else{
					item.backNum !== '' ? item.backNum = (item.backNum+'').replace(/[^\d.]/g,'') : item.backNum = '';
					item.backWeight !== '' ? item.backWeight = (item.backWeight+'').replace(/[^\d.]/g,'') : item.backWeight = '';
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
			},
			//全部消耗-全部剩余
			allUse(){
				if(!this.isSurplus){//全部剩余
					for(let infoItem of this.infoList){
						infoItem.unit = this.comUnit(infoItem.surplus,infoItem.selUnit.value,infoItem.selUnit.name,infoItem.minUnit.name);
						let obj = this.comUnit(infoItem.surplus,infoItem.selUnit.value,infoItem.selUnit.name,infoItem.minUnit.name,true);
						if(infoItem.selUnit.isMin == 1){
							infoItem.useNum = obj.tNull;
						}else{
							infoItem.useNum = obj.oNull;
							infoItem.useWeight = obj.tNull;
						}
						infoItem.usemin = 0;//全部剩余，消耗数量为0
					}
				}else{//全部消耗，剩余数量清空，回库数量清空
					for(let infoItem of this.infoList){
						infoItem.useNum = 0;
						infoItem.useWeight = 0;
						infoItem.backNum = '';
						infoItem.backWeight = '';
						infoItem.usemin = infoItem.surplus*infoItem.selUnit.value+infoItem.useWeight*1;
						infoItem.backmin = 0;
					}
				}
				this.isSurplus = !this.isSurplus;
			},
			//剩余回库
			allBack(){
				for(let infoItem of this.infoList){
					infoItem.backNum = infoItem.useNum?infoItem.useNum:'';
					infoItem.backWeight = infoItem.useWeight?infoItem.useWeight:'';
					infoItem.backmin = infoItem.backNum*infoItem.selUnit.value+infoItem.backWeight*1;
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
						this.$store.commit('setWin',{winType:'alert',content:'物料：' + this.infoList[i].materialName + '剩余数量不能大于领料数量'});
						return false;
					}
					if(this.infoList[i].backmin > this.infoList[i].usemin){
						this.$store.commit('setWin',{winType:'alert',content:'物料：' + this.infoList[i].materialName + '回库数量不足'});
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
						if(key == 'consumeNum'){//消耗数量=总量-剩余数量
							obj[key] = this.infoList[i].number-this.infoList[i].usemin;
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
								this.selectType(this.infoList[i],this.infoList[i].index);
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

<style scoped lang="less">
	.ic-title {
		width: 100%;
		height: 30px;
		line-height: 30px;
		position: relative;
		.text {
			font-size: 16px;
			width: 100px;
			height: 20px;
			line-height: 20px;
			text-indent: 10px;
			position: absolute;
			left: 0;
			top: 10px;
			border-left: 2px solid rgba(40,168,224,1);
		}
		.dashed {
			width: 100%;
			height: 10px;
			border-top: 2px dashed rgb(228,229,230);
			position: absolute;
			left: 100px;
			top: 20px;
		}
	}
	/*中间文字================================*/
	.ic-contern{
		margin-left: 50px;
		margin-top: 20px;
		margin-bottom: 30px;
		.span_contern{
			font-size: 16px;
			margin-right: 120px;
			display: inline-block;
			margin-top: 10px;
		}
		.remenber{
			width:420px;
			height:40px;
			line-height: 40px;
			text-align: center;
			border: 1px solid #A5A5A5;
			font-size: 14px;
			margin-left: 15px;
		}
	}
	/*列表=====================================*/
	.totle{
		width: 100%;
		border: 1px solid #ebeef5;
		.scroll-box{
			overflow: auto;
			.list-box{min-width: 1400px;}
		}
		.head{
			height: 50px;
			line-height: 50px;
			font-size: 16px;
			padding-left: 20px;
			color: #333333;
		}
		.oUl{
			color:#333333;
			border-bottom: 1px solid #ebeef5;
			li{
				width:9%;
				height: 70px;
				line-height: 70px;
				text-align: center;
				float: left;
			}
			li>*{line-height: normal;}
			.hide{
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			&:after{content: '';zoom: 1;display: block;clear: both;}
		}
		.oulFirst{
			background-color: #F2F2F2;color:#434149;
			li{
				font-size: 16px;
				height: 50px;
				line-height: 50px;
				span{color:#FF3D04;cursor:pointer;}
			}
		}
		.oulSecond{
			color: #666666;
		}
	}
	/*.totle .oulSecond li span{*/
		/*font-size: 16px*/
	/*}*/
	/*==========列表输入框===============================*/
	.div_float{
		display: inline-block;
		vertical-align: middle;
		overflow: hidden;
	}
	.add-sign{
		height: 40px;display: inline-block;line-height: 40px !important;
	}
	.searchgoods{
		float: left;
		width: 70px;
		height: 40px;
		line-height: 38px;
		padding: 0 10px;
		border: 1px solid #dcdfe6;
		border-right: 0;
		outline: 0;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.span_line{
		display: inline-block;
		height: 40px;
		padding: 0 15px;
		line-height: 38px;
		text-align: center;
		border: 1px solid #dcdfe6;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		background: #f5f7fa;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	/*====================*/
	.right{
		margin-top: 50px;
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