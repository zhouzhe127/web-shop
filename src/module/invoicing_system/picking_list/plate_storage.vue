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
					<div class="list-box" @click="banClick">
						<ul class="oUl oulFirst">
							<li>操作</li>
							<li>物料名称</li>
							<li>领料单位选择</li>
							<li style="width: 15%">领料数量/重量</li>
							<li style="width: 20%">剩余数量/重量 <span @click="allUse" :class="{warning:isSurplus}">{{isSurplus?'全部消耗':'全部剩余'}}</span></li>
							<li style="width: 20%">回库数量/重量 <span @click="allBack" style="color:#E1BB4A;">剩余回库</span></li>
							<li >分类</li>
							<li >类型</li>
						</ul>
						<ul class="oUl oulSecond" v-for="(item, index) in infoList" :key="index">
							<li>
								<span class="handle-btn" @click="doThing(item)">批次选择</span>
								<span class="handle-btn reset" @click="resetItem(item)">重置</span>
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
									<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useNum" placeholder="请输入"
										:disabled="item.haveBatch"/>
									<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
								</div>
								<template v-if="item.selUnit.isMin != 1">
									<span class="div_float add-sign">+</span>
									<div class="div_float">
										<input class="searchgoods" type="text" :onkeyup="getmin(item)" v-model="item.useWeight" placeholder="请输入"
											:disabled="item.haveBatch"/>
										<span class="span_line" :title="item.isMin">{{item.isMin}}</span>
									</div>
								</template>
							</li>
							<li style="width: 20%">
								<div class="div_float">
									<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backNum" placeholder="请输入"
										:disabled="item.haveBatch"/>
									<span class="span_line" v-if="item.selUnit.name" :title="item.selUnit.name">{{item.selUnit.name}}</span>
								</div>
								<template v-if="item.selUnit.isMin != 1">
									<span class="div_float add-sign">+</span>
									<div class="div_float">
										<input class="searchgoods" type="text" :onkeyup="getmin(item,'1')" v-model="item.backWeight" placeholder="请输入"
											:disabled="item.haveBatch"/>
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
<<<<<<< HEAD
					{name: '确认',className: 'success',type:4,
=======
					{name: '确认',className: 'primary',type:4,
>>>>>>> 9eaed6ee20f861080a6c82a05cb8c534e4bbb7ab
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
			banClick(event){//被禁用按钮点击事件
				let target = event.target;
				if(target.className.includes('searchgoods')){
					if(target.getAttribute('disabled')=='disabled'){
						this.$message({message: '已选中批次的物料无法修改，请先重置',type: 'error'});
					}
				}
			},
			resetItem(item){//重置填写，批次
				this.$confirm('此操作会重置已选择的批次, 是否继续?','重置', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'info'
		        }).then(()=>{
		        	this.setDefaultItem(item);
					item.haveBatch = false;
					item.usemin = item.surplus*item.selUnit.value+item.useWeight*1;//全部剩余，消耗数量为0
					item.batchDetail = [];//清空批次
					
					item.backNum = '';
					item.backWeight = '';
					item.backmin = 0;
		        }).catch(()=>{});
			},
			setInitData(){
				for(let j = 0; j < this.infoList.length; j++){
					let infoItem = this.infoList[j];
					let options = [],index = 0;
					for(let i = 0; i < infoItem.materialUnit.length; i++){
						let item = infoItem.materialUnit[i];
						let obj={
							value:item.muId,
							label:item.name,
						};
						options.push(obj);
						if(item.isMin == 1){
							infoItem.isMin = item.name;
							infoItem.minUnit = item;
						}
						if(item.isDefault == 1){
							infoItem.isDefault = item.name;
							this.$set(infoItem,'index',item.muId);
						}
					}
					this.$set(infoItem,'options',options);
				}
				for(let infoItem of this.infoList){
					for(let unitItem of infoItem.materialUnit){
						this.$set(infoItem,'selUnit',unitItem);
						infoItem.unit = this.comUnit(infoItem.surplus,unitItem.value,unitItem.name,infoItem.minUnit.name);
						this.setDefaultItem(infoItem);
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
			setDefaultItem(infoItem){
				let obj = this.comUnit(infoItem.surplus,infoItem.selUnit.value,infoItem.selUnit.name,infoItem.minUnit.name,true);
				if(infoItem.selUnit.isMin == 1){
					infoItem.useNum = obj.tNull;
				}else{
					infoItem.useNum = obj.oNull;
					infoItem.useWeight = obj.tNull;
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
						if(!infoItem.haveBatch){
							this.setDefaultItem(infoItem);
							infoItem.usemin = 0;//全部剩余，消耗数量为0
							infoItem.haveBatch = false;
							infoItem.batchDetail = [];
						}
					}
				}else{//全部消耗，剩余数量清空，回库数量清空
					for(let infoItem of this.infoList){
						if(!infoItem.haveBatch){
							infoItem.useNum = 0;
							infoItem.useWeight = 0;
							infoItem.backNum = '';
							infoItem.backWeight = '';
							infoItem.usemin = infoItem.surplus*infoItem.selUnit.value+infoItem.useWeight*1;
							infoItem.backmin = 0;
							infoItem.haveBatch = false;
							infoItem.batchDetail = [];
						}
					}
				}
				this.isSurplus = !this.isSurplus;
			},
			//剩余回库
			allBack(){
	        	for(let infoItem of this.infoList){
	        		if(!infoItem.haveBatch){
						infoItem.backNum = infoItem.useNum?infoItem.useNum:'';
						infoItem.backWeight = infoItem.useWeight?infoItem.useWeight:'';
						infoItem.backmin = infoItem.backNum*infoItem.selUnit.value+infoItem.backWeight*1;
						infoItem.haveBatch = false;
						infoItem.batchDetail = [];
					}
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
					this.$message({message: '盘库失败',type: 'error'});
				}else{
					this.$route.query.id = res.id;
					this.$router.push({path:'plateDetails',query:this.$route.query});
				}
			},
			//确定
			enter(){
				for(let infoItem of this.infoList){
					if(infoItem.usemin > infoItem.surplus){ 
						this.$message({message: `物料: ${infoItem.materialName} 剩余数量不能大于领料数量`,type: 'error'});
						return false;
					}
					if(infoItem.backmin > infoItem.usemin){
						this.$message({message: `物料: ${infoItem.materialName} 回库数量不足`,type: 'error'});
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
				for(let infoItem of this.infoList){
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
						if(key!='consumeNum' && key!='returnNum'){
							obj[key] = infoItem[key];
						}
					}
					obj.consumeNum = infoItem.surplus-infoItem.usemin;
					obj.returnNum = infoItem.backmin;
					if(!obj.consumeNum && !obj.returnNum){
						continue;  //没有填写数量  过滤掉
					}
					obj.batchDetail = [];
					let consumeNum = 0; // 计算批次内消耗总量
					let returnNum = 0; // 计算批次内回库总量
					if(infoItem.batchDetail && infoItem.batchDetail.length){
						for(let bathcItem of infoItem.batchDetail){
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
								batch[m] = bathcItem[m];
								if(m == 'consumeNum'){
									batch[m] = bathcItem.surplus-bathcItem.usemin;
								}
								if(m == 'returnNum'){
									batch[m] = bathcItem.backmin;
								}
							}
							batch.number = bathcItem.minNumber;
							consumeNum += batch.consumeNum*1;
							returnNum += batch.returnNum*1;
							obj.batchDetail.push(batch);
						}
					}
					returnData.materialDetail.push(obj);
				}
				if(!returnData.materialDetail.length){
					this.$message({message: `没有需要盘库或回库的物料`,type: 'error'});
					return;
				}
				this.invoicingCheckMaterial(returnData);
			},
			//获取批次弹窗
			getWin(res,info,batch){
				if(res == 'ok'){
					this.winInfo = info;
					for(let infoItem of this.infoList){
						for(let j = 0; j < infoItem.materialUnit.length; j++){
							if(infoItem.materialId == info.materialId && infoItem.materialUnit[j].name == info.selUnit.name){
								this.selectType(infoItem,infoItem.index);
							}
						}
						if(infoItem.materialId == info.materialId){
							infoItem.useNum = '';
							infoItem.useWeight = '';
							infoItem.backNum = '';
							infoItem.backWeight = '';
							infoItem.consumeNum = infoItem.usemin;
							infoItem.returnNum = infoItem.backmin;
							infoItem.initialNum = infoItem.surplus;
							infoItem.batchDetail = [];
							for(let j = 0; j < batch.length; j++){
								infoItem.useNum = infoItem.useNum*1 + batch[j].useNum*1;
								infoItem.useWeight = infoItem.useWeight*1 + batch[j].useWeight*1;
								infoItem.backNum = infoItem.backNum*1 + batch[j].backNum*1;
								infoItem.backWeight = infoItem.backWeight*1 + batch[j].backWeight*1;
							}
							for(let j = 0; j < infoItem.batch.length; j++){
								for(let key in infoItem.batch[j]){
									infoItem.batch[j][key] = batch[j][key];
								}
							}
							for(let k = 0; k < infoItem.batch.length; k++){
								if(infoItem.batch[k].usemin || infoItem.batch[k].backmin){
									infoItem.batch[k].consumeNum = infoItem.batch[k].usemin;
									infoItem.batch[k].returnNum = infoItem.batch[k].backmin;
									infoItem.batchDetail.push(infoItem.batch[k]);
								}
							}
							this.$set(infoItem,'haveBatch',true);
							break;
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
				span{color:#E1BB4A;cursor:pointer;
					&:hover{text-decoration: underline;}
				}
				.warning{color: red;}
			}
		}
		.oulSecond{
			color: #666666;
			.handle-btn{display: inline-block;padding: 10px 5px;color: #E1BB4A;cursor: pointer;
				&:hover{text-decoration: underline;}
			}
			.reset{color: red;}
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