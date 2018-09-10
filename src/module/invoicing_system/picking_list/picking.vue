/*
 * @Author: zhengu.jiang 
 * @Date: 2018-03-28 10:07:18 
 * @Module: 领料操作
 */

 <template>
	<div id="picking">
		<div v-if="!isMatter">
			<div class="row">
				<span class="left required">领料原因</span>
				<div class="right">
					<el-input placeholder="请输入领料原因" maxlength="20" v-model="pickData.reason" style="width:210px;"></el-input>
					<div class="tips"><i class="icon"></i><i>限20字以内</i></div>
				</div>
			</div>
			<div class="row">
				<span class="left required">领料人</span>
				<div class="right">
					<selectbtn @selOn="selOn" :sorts="picker" :width="210" :index="index"></selectbtn>
				</div>
			</div>
			<div class="row">
				<span class="left required">操作人</span>
				<div class="right">
					<span class="operator">{{pickData.creatorName}}</span>
				</div>
			</div>
			<div class="row">
				<span class="left">备注</span>
				<div class="right">
					<textarea style="padding-left:17px" type="text" placeholder="请输入备注" maxlength="40" v-model="pickData.remarks"></textarea>
					<div class="tips"><i class="icon"></i><i>限40字以内</i></div>
				</div>
			</div>
			<div class="row">
				<span class="left required">所领物料</span>
				<div @click="addMatter" class="right" style="cursor:pointer">
					<span class="matter"><i class="add"></i><i>添加物料</i></span>
				</div>
			</div>
			<div class="list" v-if="pickData.materialInfo.length != 0">
				<div class="head">
					<span>物料列表 · 共<em>{{pickData.materialInfo.length}}</em>个条目</span>
				</div>
				<div class="title" style="height:60px">
					<span>操作</span>
					<span>领料单位选择</span>
					<span>领料数量/重量</span>
					<span>物料名称</span>
					<span>库存数量/重量</span>
					<span>领料批次数</span>
					<span>类型</span>
				</div>
				<ul class="title content">
					<li v-for="(item,index) in pickData.materialInfo" :key="index">
						<span>
							<em class="under-line del" @click="delStaff(index)">删除</em>
							<em class="line"></em>
							<em class="under-line edit" @click="checkDetail(item)">批次选择</em>
						</span>
						<span style="overflow:visible" @click="backItem(item,item.index)">
							<selectbtn @selOn="getMatterNuit" :sorts="item.unitList" :width="80" :index="item.index"></selectbtn>
						</span>
						<span class="end">
							<template v-if="item.unitList[item.index]!=item.minName">
								 <input type="text" placeholder="输入数字" v-model="item.oneNum" :onkeyup="getmin(item)"><i :title="item.oneName">{{item.oneName}}</i>
								+
							</template>
							<input type="text" placeholder="输入数字" v-model="item.twoNum" :onkeyup="getmin(item)"><i :title="item.twoName">{{item.twoName}}</i>
						</span>
						<span :title="item.materialName">{{item.materialName}}</span>
						<span :title="item.number">{{item.number}}</span>
						<span>{{item.batchNum}}</span>
						<span>{{matterType[item.materialType]}}</span>
					</li>
				</ul>
			</div>
			<div class="row">
				<span class="left"></span>
				<div class="right">
					<span @click="cancel" class="btn gray">取消</span>
					<span @click="again" class="continue btn">继续添加</span>
					<span @click="enter" class="btn yellow">确定</span>
				</div>
			</div>
			<batchwin @getWin="getWin" v-if="showBatch" :batchInfo="info" :winIndex="winIndex" :type="false"></batchwin>
		</div>
		<matter v-else @select="getMatter" :sleSupplies="sleSupplies" :addBtn="true"></matter>
	</div>
 </template>

 <script>
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	import storage from 'src/verdor/storage';
	export default {
		data(){
			return {
				picker: ['请选择领料人'],  //领料人列表
				pickerList: [],
				matterList: [1,2,3],
				showBatch: false, //弹窗显示
				pickData: {
					reason: '', //领料原因
					owner: '', //领料人
					ownerName: '',//领料人名
					remarks: '', //备注
					materialInfo: [], //领料详情
					creatorName: '', //操作人名
				},
				index: 0,//选择领料人
				isMatter: false, //添加物料
				matterType: {
					0: '物料'
				},  //类型
				info: '', //查看详情该物料信息
				item:{ },   //
				isOneName:true,   //是否只有最小单位
				winIndex: 0,
				sleSupplies: '', // 保存选中的物料，回传组件
			};
		},
		mounted(){
			this.$store.commit('setHeaderTil',{type: 'push', params: [{title:'领料'}]});
			this.getPicker();
			this.pickData.creatorName = storage.session('userShop').user.name;
		},
		components:{
			selectbtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			batchwin: ()=> import (/*webpackChunkName: 'batch_win'*/ './batch_win'),
			matter: ()=> import (/*webpackChunkName: 'output_select_supplies'*/ '../warehouse_manage/output_select_supplies')
		},
		methods:{
			//获取领料人
			async getPicker(){
				let res = await http.getPickerList();
				for(let key of res){
					this.picker.push(key.name);
				}
				this.pickerList = res;
			},
			//领料操作保存
			// async invoicingReceive(){
			// 	await http.invoicingReceive({data:this.pickData});
			// },
			//添加物料
			addMatter(){
				this.isMatter = true;
			},
			//获取添加的物料
			getMatter(res){
				if(res){
					this.sleSupplies = res;
				}
				for(let i = 0; i < res.length; i++){
					let isHave = false;  //判断是否已添加该物料
					for(let k of this.pickData.materialInfo){
						if(k.materialId == res[i].id){
							isHave = true;
						}
					}
					if(isHave){
						continue;
					}
					let obj =  {
						materialBC: '',
						materialId: '',// 物料id
						materialName: '', //物料名
						materialType: '', //物料类型
						materialCategory: '', //物料分类id
						materialCategoryName: '', //物料分类名
						unitData: '', //所有单位信息
						unit: '', //选择的单位
						batch: [], //批次
						validity: '', //保质期
						validityType: '', //保质期类型

						number: '', //领料量
						num: '', //原始库存量
						unitList: [], //单位列表
						index: 0, //单位选择的索引
						minName:'', //最小单位名
						defaultName:'',    //默认单位名
						defaultValue:'',   //默认单位的转换关系
						oneNum:'',      //第一个输入框
						twoNum:'',      //第二个输入框
						oneName:'',
						twoName:'',
						showName:'', //展示单位名
						showValue:'',   //展示单位换算关系
						minNumber:''     //最小单位的数量
					};
					obj.materialBC = res[i].BC;
					obj.materialId = res[i].id;
					obj.materialName = res[i].name;
					obj.materialType = res[i].type;
					obj.validity = res[i].validity;
					obj.validityType = res[i].validityType;
					obj.batchNum = res[i].goodsNum.batch;
					for(let key of res[i].cate){
						obj.materialCategory += key.cid + ',';
						obj.materialCategoryName += key.name + ',';
					}
					obj.materialCategory = obj.materialCategory.slice(0,obj.materialCategory.length-1);
					obj.materialCategoryName = obj.materialCategoryName.slice(0,obj.materialCategoryName.length-1);
					for(let key of res[i].unit){
						obj.unitList.push(key.name);
					}
					obj.unitData = res[i].unit;

					obj.number = res[i].goodsNum.surplus;
					obj.num = res[i].goodsNum.surplus;
					this.pickData.materialInfo.push(obj);
				}
				this.isMatter = false;
				this.unitConversion(this.pickData.materialInfo);
			},
			unitConversion(detailList){
				for(let i=0;i<detailList.length;i++){
					let unitList=[];
					for(let j=0;j<detailList[i].unitData.length;j++){
						if(detailList[i].unitData[j].isDefault==1){
							this.pickData.materialInfo[i].defaultName=detailList[i].unitData[j].name;  //默认单位名
							this.pickData.materialInfo[i].showName=detailList[i].unitData[j].name;  //展示单位名
							this.pickData.materialInfo[i].oneName=detailList[i].unitData[j].name;
							this.pickData.materialInfo[i].showValue=detailList[i].unitData[j].value;  //展示单位的换算关系
							this.pickData.materialInfo[i].defaultValue=detailList[i].unitData[j].value;  //默认单位的换算关系
						}
						if(detailList[i].unitData[j].isMin==1){
							this.pickData.materialInfo[i].minName=detailList[i].unitData[j].name;  //最小单位
							this.pickData.materialInfo[i].twoName=detailList[i].unitData[j].name;
						}
						unitList=unitList.concat(detailList[i].unitData[j].name);        //单位列表
						for(let b=0;b<unitList.length;b++){                                      //把默认单位放到数组第一位
							if(unitList[b]==detailList[i].showName){
								let str = unitList.splice(b,1);
								unitList.unshift(str[0]);
							}
						}
						this.pickData.materialInfo[i].unitList=unitList;
					}
					this.pickData.materialInfo[i].comNum=detailList[i].num;     //保存comNum，用于计算
					//换位默认单位数据
					if(detailList[i].num != 0){
						this.pickData.materialInfo[i].number=global.comUnit(detailList[i].num,this.pickData.materialInfo[i].showValue,this.pickData.materialInfo[i].showName,this.pickData.materialInfo[i].minName);
					}

				}
			},
			//领料单位选择
			getMatterNuit(index){
				this.backItem(this.item,index);
			},
			//获取最小值
			getmin(item){
				item.oneNum != '' ? item.oneNum = (item.oneNum+'').replace(/[^\d\.]/g,'') : item.oneNum = '';//	eslint-disable-line
				item.twoNum != '' ? item.twoNum = (item.twoNum+'').replace(/[^\d\.]/g,'') : item.twoNum = '';// eslint-disable-line
				let minNumber=Number(item.oneNum)*Number(item.showValue)+Number(item.twoNum);
				item.minNumber=minNumber;
			},
			//改变数值
			backItem(item,index){
				this.item=item;
				item.index=index;
				let showName=item.unitList[index];      //展示的单位名称
				item.oneName=showName;
				for(let k=0;k<item.unitData.length;k++){
					if(item.unitData[k].name==showName){
						item.showValue=item.unitData[k].value;
					}
				}
				item.number=global.comUnit(item.comNum,item.showValue,showName,item.minName);
				if(Number(item.minNumber)){
					let backObj=global.comUnit(Number(item.minNumber),item.showValue,showName,item.minName,true);
					item.oneNum=backObj.oNull;
					item.twoNum=backObj.tNull;
				}
			},
			selOn(res){ //选择领料人
				this.index =res;
				if(res != 0){
					this.pickData.owner = this.pickerList[this.index-1].id;
					this.pickData.ownerName = this.pickerList[this.index-1].name;
				}else{
					this.pickData.owner = '';
					this.pickData.ownerName = '';
				}
			},
			//批次选择
			checkDetail(item){
				this.showBatch = true;
				this.info = item;
				this.item = item;
			},
			//删除批次
			delStaff(index){
				this.pickData.materialInfo.splice(index,1);
				this.sleSupplies.splice(index,1);
			},
			//接收弹窗内容
			getWin(res,backData,index){
				this.showBatch = false;
				if(res == 'ok'){
					this.winIndex = index;
					let data = this.pickData.materialInfo;
					for(let i = 0; i < data.length; i++){
						data[i].minNumber = 0;
						for(let j = 0; j < backData.length; j++){
							backData[j].materialId = backData[j].itemId;
							backData[j].number = backData[j].minNumber;
							if(data[i].materialId == backData[j].itemId){
								if(j == 0){
									data[i].batch = [];
								}
								data[i].minNumber += backData[j].minNumber*1;
								if(backData[j].minNumber){
									data[i].batch.push(backData[j]);
								}
								this.backItem(data[i],index);
							}
						}
					}
					this.backItem(this.item,index);
				}
			},
			//取消
			cancel(){
				this.$router.push({path:'../pickingList',query:this.$route.query});
			},
			//继续添加
			again(){
				if(this.isOk()){
					if(this.enter(true)){
						for(let key in this.pickData){
							this.pickData[key] = '';
							this.pickData['creatorName'] = storage.session('userShop').user.name;
							if(key == 'materialInfo'){
								this.pickData[key] = [];
							}
							this.index = 0;
						}
					}
				}
			},
			//领料操作确定
			async invoicingReceive(data,type){
				let res = await http.invoicingReceive({data: data});
				this.$store.commit('setWin',{winType:'alert',content:'添加成功'});
				if(type !== true){
					storage.session('listDetail',res);
					this.$router.push({path:'checkDetails',query:this.$route.query});
				}
			},
			//确定
			enter(type){
				if(this.isOk()){
					let data = {};
					for(let key in this.pickData){
						data[key] = this.pickData[key];
					}
					let returnData = [];
					//整合字段传给后台
					for(let i = 0; i < this.pickData.materialInfo.length; i++){
						let obj = {
							'materialId': '',                    //物料id
							'materialName': '',               //物料名
							'materialType': '',                    //物料类型      0物料
							'materialBC' : '',        //物料简码
							'materialCategory': '',                //物料分类id     多个分类用,分割
							'validity': '',                 // 保质期
							'validityType': '',            // 保质期类型
							'materialCategoryName': '',       //物料分类名     多个分类用,分割
							'unit': '',                          //最小单位
							'number': '',                         //领料数量（以最小单位计算）
							'batch': [],  //批次
						};
						for(let key in obj){
							obj[key] = this.pickData.materialInfo[i][key];
						}
						obj.batch = [];
						obj.unit = this.pickData.materialInfo[i].minName;
						obj.number = this.pickData.materialInfo[i].minNumber;
						let batchNum = 0; // 计算批次内消耗总量
						for(let j = 0; j < this.pickData.materialInfo[i].batch.length; j++){
							let batch = {
								'batchId': '',                //批次id
								'wid' : '',                   //仓库id
								'areaId' : '',               //区域id
								'number': ''                 //领取量（以最小单位计算）
							};

							for(let m in batch){
								batch[m] = this.pickData.materialInfo[i].batch[j][m];
							}
							batch.number = this.pickData.materialInfo[i].batch[j].minNumber;
							batchNum += batch.number*1;
							obj.batch.push(batch);
						}
						if(obj.number != batchNum){
							obj.batch = [];
						}
						returnData.push(obj);
						if(obj.number > this.pickData.materialInfo[i].comNum){
							this.$store.commit('setWin',{winType:'alert',content:'物料：' + obj.materialName + '领料数量不能大于当前数量'});
							return false;
						}
						if(!obj.number){
							this.$store.commit('setWin',{winType:'alert',content:'物料：' + obj.materialName + '请填写领料数量'});
							return false;
						}
					}
					if(returnData.length == 0){
						this.errorShow('请添加物料');
						return false;
					}
					data.materialInfo = returnData;
					this.invoicingReceive(data,type);
					return true;
				}
			},
			//保存验证
			isOk(){
				if(!this.pickData.reason){
					this.errorShow('请输入领料原因');
					return false;
				}
				if(!this.pickData.owner){
					this.errorShow('请选择领料人');
					return false;
				}
				// if(!this.pickData.remarks){
				//     this.errorShow('请输入备注');
				//     return false
				// }
				return true;
			},
			errorShow(content){
				this.$store.commit('setWin',{winType:'alert',content:content});
			}
		}
	};
 </script>

 <style scoped>
	#picking {
		margin-top: 20px;
	}
	#picking .row{
		margin-bottom: 24px;
	}
	#picking .row .left{
		display: inline-block;
		width: 100px;
		height: 40px;
		vertical-align: top;
		line-height: 40px;
		font-size: 14px;
		text-align: right;
	}
	#picking .row .right{
		display: inline-block;
		margin-left: 20px;
	}
	#picking .row .right input{
		width: 210px;
		height: 40px;
		padding-left: 17px;
		border-color: #b3b3b3;
	}
	#picking .row .right .operator{
		display: inline-block;
		height: 40px;
		line-height: 40px;
	}
	#picking .row .right textarea{
		width: 210px;
		height: 100px;
	}
	#picking .row .right .icon{
		display: inline-block;
		width: 18px;
		height: 18px;
		margin-right: 11px;
		vertical-align: middle;
		background: url('../../../res/images/prompt.png') center center no-repeat;
	}
	#picking .row .right .tips{
		height: 20px;
		line-height: 20px;
		margin-top: 12px;
		color: #A5A5A5;
		font-size: 14px;
	}
	#picking .row .right .matter{
		display: inline-block;
		width: 210px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #29A8E0;
		color: #fff
	}
	#picking .row .right .add{
		display: inline-block;
		width: 18px;
		height: 18px;
		margin-right: 14px;
		vertical-align: middle;
		background: url('../../../res/images/add.png') center center no-repeat;
	}
	#picking .row .right .btn{
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
	#picking .row .right .continue{
		width: 198px;
		height: 48px;
		border: 1px solid #FF9200;
		color: #FF9200;
	}
	.list{
		border: 1px solid #ccc;
		margin-top: 20px;
		max-width: 1200px;
		margin-left: 20px;
		margin-bottom: 50px;
	}
	.list .title span{
		float: left;
		width: 12%;
		height: 60px;
		line-height: 60px;
		text-align: center;
	}
	.list .title i {
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.list .title span:first-child{
		width: 15%;
	}
	.list .title span:nth-child(2){
		width: 12%;
	}
	.list .title span:nth-child(3){
		width: 25%;
	}
	.list .title span:nth-child(5){
		width: 12%;
	}
	.list .head{
		height: 50px;
		line-height: 50px;
		padding-left: 20px;
	}
	.list .head span {
		font-size: 16px;
	}
	.list .head span:first-child{
		display: inline-block;
		width: 250px;
	}
	.list .head em{
		color: #FD3E1F;
		padding: 0 3px;
		font-size: inherit;
	}
	.list .brand{
		color: #F79337;
	}
	.list .title{
		background: #F2F2F2;
	}
	.list .title span{
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.list .content{
		background: #fff;
	}
	.list .content span{
		height: 60px;
		line-height: 60px;
	}
	.list .content .end i{
		display: inline-block;
		width: 40px;
		height: 39px;
		line-height: 39px;
		border: 1px solid #D5D5D5;
		vertical-align: middle;
		border-left: none;
		background: #fff;
	}
	.list .content .end input{
		width: 65px;
		height: 39px;
		padding-left: 7px;
		border: 1px solid #D5D5D5;
		vertical-align: middle;
	}
	.list ul li{
		/* overflow: hidden; */
		height: 60px;
		border-bottom: 2px solid #F7F7F7;
	}
	.list ul li span{
		height: 60px;
		line-height: 60px;
	}
	.list .title .under-line{
		color: #F8931F;
		display: inline-block;
		line-height: normal;
		cursor: pointer;
	}
	.list ul li span em{
		/* margin-right: 10px; */
		font-size: 16px;
	}
	.list .title .edit {
		color: #FE8D2C;
	}
	.list .title .line {
		display: inline-block;
		width: 2px;
		height: 18px;
		background: #CECECE;
		vertical-align: middle;
		margin: 0 2px;
	}
	.list .title .del {
		color: #FD3F1F;
	}
 </style>
 