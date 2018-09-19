/**
 * @file
 * 
 * 批次弹窗---领料盘库
 *
 * @author zhengu.jiang
 */
 <template>
	<div>
		<win @winEvent="getData" :align="'center'" :width="1300" :height="600" :ok="okstyle">
			<span slot="title">{{title}}</span>
			<div id = "tan" slot="content"  v-cloak>
				<section class="title">
					<div>
						<span>物料名称：{{infoList.materialName}}</span>
						<span>保质期：{{infoList.validity}}{{validityType[infoList.validityType]}}</span>
					</div>
					<div>
						<span>物料单位：{{batchInfo.options.join(',')}}</span>
						<span>分类：{{infoList.materialCategoryName}}</span>
					</div>
					<div>
						<span>默认单位：{{infoList.isDefault}}</span>
						<span>最小单位：{{infoList.isMin}}</span>
					</div>
				</section>
				<section class="menu">
					<input type="text" placeholder="请输入批次编号" v-model="batchNum">
					<input type="text" placeholder="请输入供应商" v-model="supplyer">
					<div class="canMulti">
						<calendar :pObj = 'startObj' @throwTime="getStartTime" class="fl"></calendar>
						<div class="time" style="width: 25px;">---</div>
						<calendar :pObj = 'endObj' @throwTime="getEndTime" class="fl"></calendar>
					</div>
					<span class="blue btn" @click="search">筛选</span>
					<span class="gray btn" @click="reset">重置</span>
					<selectbtn style="background:#fff" @selOn="selOn" :sorts="options" :width="180" :name="unitName"></selectbtn>
				</section>
				<section class="content">
					<div class="top">
						<ul>
							<li>序号</li>
							<li>批次编号</li>
							<li>生产日期</li>
							<li>供应商</li>
							<li>所属仓库</li>
							<li>领料数量/重量</li>
							<li>消耗数量/重量<i style="color:#FF3D04;cursor:pointer" @click="allUse">全部消耗</i></li>
							<li>回库数量/重量<i style="color:#27A8E0;cursor:pointer" @click="allBack">剩余回库</i></li>
						</ul>
					</div>
					<!-- <div class="list clearfix" v-for="(item, index) in infoList.batch" :key="index"> -->
					<section v-if="batchList && batchList.length != 0">
						<div class="list clearfix" v-for="(item, index) in batchList" :key="index">
							<ul>
								<li>{{index+1}}</li>
								<li :title="item.batchCode">{{item.batchCode}}</li>
								<li>{{transFormDate(item.productionTime*1000)}}</li>
								<li :title="item.supplier">
									<i v-if="item.supplier">{{item.supplier}}</i>
									<i v-else>--</i>
								</li>
								<li :title="item.warehouseName">
									<i v-if="item.warehouseName">{{item.warehouseName}}</i>
									<i v-else>--</i>
								</li>
								<li :title="comUnit(item.surplus,selUnit.value,selUnit.name,minUnit.name)">{{comUnit(item.surplus,selUnit.value,selUnit.name,minUnit.name)}}</li>
								<li class="end">
									<input type="text" placeholder="输入数字" :onkeyup="getmin()" v-model="item.useNum"><span v-if="selUnit.name" :title="selUnit.name">{{selUnit.name}}</span><span :title="infoList.isDefault" v-else>{{infoList.isDefault}}</span>
									<em v-if="selUnit.isMin != 1">
										<i>+</i>
										<input type="text" placeholder="输入数字" :onkeyup="getmin()" v-model="item.useWeight"><span :title="infoList.isMin">{{infoList.isMin}}</span>
									</em>
								</li>
								<li class="end">
									<input type="text" placeholder="输入数字" :onkeyup="getmin('1')" v-model="item.backNum"><span :title="selUnit.name" v-if="selUnit.name">{{selUnit.name}}</span><span :title="infoList.isDefault" v-else>{{infoList.isDefault}}</span>
									<em v-if="selUnit.isMin != 1">
										<i>+</i>
										<input type="text" placeholder="输入数字" :onkeyup="getmin('1')" v-model="item.backWeight"><span :title="infoList.isMin">{{infoList.isMin}}</span>
									</em>
								</li>
							</ul>
						</div>
					</section>
					<section v-else id="emptyData">
						暂无数据
					</section>
				</section>
			</div>
		</win>
	</div>
   
 </template>

 <script>
	import utils  from 'src/verdor/utils';
	import http  from 'src/manager/http';
	import global  from 'src/manager/global';
	export default {
		data(){
			return {
				title: '',
				okstyle: {
					style: {
						background:'#F7931E'
					},
					content: '确定'
				},
				isShowCa: false, //日历显示
				startObj: {time:utils.getTime({time: new Date()}).start,show:false,detail:false,width:150},
				endObj: {time:utils.getTime({time: new Date()}).end,show:false,detail:false,width:150},
				unitName: '单位切换',
				unitList: ['g','kg'],
				infoList: [], //所有信息
				batchNum: '', //批次编号
				supplyer: '', //供应商名称
				batchList: [], //批次列表
				list: [], //保存批次列表信息
				options: [], //单位列表
				minUnit: '', //最小单位
				selUnit: '', //选择的单位
				materName: '', //物料单位
				validityType: {
					0: '月',
					1: '日',
					2: '年'
				}
			};
		},
		props: ['batchInfo','unitData'], //type为true为盘库批次分配，false为批次选择
		mounted(){
			// this.type ? this.title = '批次分配' : this.title = '批次选择';
			this.title = '批次分配';
			this.infoList = utils.deepCopy(this.batchInfo);
			this.batchList = this.infoList.batch;
			this.list = utils.deepCopy(this.infoList.batch);
			this.options = [];
			//假数据测试
			// this.infoList.unitList=[{default:0,min:0,name:'kg',value:'8'},{default:0,min:1,name:'g',value:'1'},{default:1,min:0,name:'箱',value:'6'}];
			this.infoList.unitList = this.infoList.materialUnit;
			for(let i = 0; i < this.infoList.unitList.length; i++){
				if(this.infoList.unitList[i].isDefault == 1){ //将默认单位放在第一位
					this.options.unshift(this.infoList.unitList[i].name);
					this.infoList.unitList.unshift(this.infoList.unitList[i]);
					this.infoList.unitList.splice(i+1,1);
				}else{
					this.options.push(this.infoList.unitList[i].name);
				}
				if(this.infoList.unitList[i].isMin == 1){
					this.infoList.isMin = this.infoList.unitList[i].name;
					this.minUnit = this.infoList.unitList[i];
				}
				if(this.infoList.unitList[i].isDefault == 1){
					this.infoList.isDefault = this.infoList.unitList[i].name;
				}
			}
			this.selOn(0);//数量显示默认单位数量
		},
		components:{
			win: ()=> import (/*webpackChunkName: 'win'*/ 'src/components/win'),
			selectbtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
			calendar: () =>import(/*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result')
		},
		methods: {
			getStartTime(res){
				this.startObj.time = res;
			},
			getEndTime(res){
				this.endObj.time = res;
			},
			//获取该物料批次列表
			async getMaterialBatch(){
				let res = await http.getMaterialBatch({data:{
					// mid: this.batchInfo.materialId
					mid: 371
				}});
				for(let i = 0; i < res.list.length; i++){
					res.list[i].useNum = '';
					res.list[i].useWeight = '';
				}
				this.batchList = res.list;
				this.infoList = res;
				this.getMaterialDetail();
				// this.list = utils.deepCopy(res.list);
			},
			//获取物料详情
			async getMaterialDetail(){
				let res = await http.getMaterialDetail({data: {
					mid: this.batchInfo.materialId
				}});
				this.infoList.materialName = res.name;
				this.infoList.unitList = res.relation;
				for(let i = 0; i < res.category.length; i++){ //分类
					this.infoList.materialCategoryName += res.category[i].name + ',';
				}
				for(let i = 0; i < res.uintData.length; i++){
					if(res.unitData[i].isDefault == 1){//默认单位
						this.infoList.isDefault = res.unitData[i].name;
					}
					if(res.unitData[i].isMin == 1){ //最小单位
						this.infoList.isMin = res.unitData[i].name;
					}
				}
			},
			getData(res){
				this.infoList.batch = this.batchList;
				this.infoList.selUnit = this.selUnit;
				if(res == 'ok'){
					for(let i = 0; i < this.batchList.length; i++){
						if(this.batchList[i].usemin > this.batchList[i].surplus){
							this.$store.commit('setWin',{winType:'alert',content:'批次编号' + this.batchList[i].batchCode + '消耗数量不能大于领料数量'});
							return false;
						}
						if(this.batchList[i].backmin > (this.batchList[i].surplus*1-this.batchList[i].usemin*1)){
							this.$store.commit('setWin',{winType:'alert',content:'批次编号' + this.batchList[i].batchCode + '回库数量不足'});
							return false;
						}
					}
				}
				this.$emit('getWin',res,this.infoList,this.batchList);
			},
			//获取时间
			getTime(res){
				this.startTime = res.startTime;
				this.endTime = res.endTime;
				this.isShowCa = false;
			},
			//展开时间
			showCalendar(){
				this.isShowCa = !this.isShowCa;
			},
			//时间转换
			transFormDate(t){
				return utils.format(new Date(t),'yyyy-MM-dd');
			},
			//将输入的值转为最小单位
			getmin(type){
				for(let i = 0; i < this.batchList.length; i++){
					if(type == '1'){
						this.batchList[i].backNum != '' ? this.batchList[i].backNum = (this.batchList[i].backNum+'').replace(/[^\d\.]/g,'') : this.batchList[i].backNum = '';// eslint-disable-line
						this.batchList[i].backWeight != '' ? this.batchList[i].backWeight = (this.batchList[i].backWeight+'').replace(/[^\d\.]/g,'') : this.batchList[i].backWeight = '';// eslint-disable-line
						this.batchList[i].backmin = this.batchList[i].backNum*this.selUnit.value+this.batchList[i].backWeight*1;
					}else{
						this.batchList[i].useNum != '' ? this.batchList[i].useNum = (this.batchList[i].useNum+'').replace(/[^\d\.]/g,'') : this.batchList[i].useNum = '';// eslint-disable-line
						this.batchList[i].useWeight != '' ? this.batchList[i].useWeight = (this.batchList[i].useWeight+'').replace(/[^\d\.]/g,'') : this.batchList[i].useWeight = '';// eslint-disable-line
						this.batchList[i].usemin = this.batchList[i].useNum*this.selUnit.value+this.batchList[i].useWeight*1;
					}
				}
			},
			//单位选择
			selOn(res){
				// let list = this.infoList.unitList;
				for(let i = 0; i < this.infoList.unitList.length; i++){
					if(res == i){
						this.selUnit = this.infoList.unitList[i]; //选择的单位
					}
				}
				for(let j = 0; j < this.batchList.length; j++){
					let objuse = this.comUnit(this.batchList[j].usemin,this.selUnit.value,this.selUnit.name,this.minUnit.name,true);
					let objback = this.comUnit(this.batchList[j].backmin,this.selUnit.value,this.selUnit.name,this.minUnit.name,true);
					if(this.selUnit.isMin != 1){
						this.batchList[j].useNum = objuse.oNull;
						this.batchList[j].useWeight = objuse.tNull;
						this.batchList[j].backNum =  objback.oNull,
						this.batchList[j].backWeight = objback.tNull;
					}else {
						if(objuse.oNull){
							this.batchList[j].useNum = objuse.oNull;
							this.batchList[j].useWeight = objuse.tNull;
						}else{
							this.batchList[j].useNum =  objuse.tNull,
							this.batchList[j].useWeight = '';
						}
						if(objback.oNull){
							this.batchList[j].backNum = objback.oNull;
							this.batchList[j].backWeight = objback.tNull;
						}else{
							this.batchList[j].backNum =  objback.tNull;
							this.batchList[j].backWeight = '';
						}
					}
					this.batchList[j].useNum == '0.000' ? this.batchList[j].useNum = '' : this.batchList[j].useNum = this.batchList[j].useNum;
					this.batchList[j].useWeight == '0.000' ? this.batchList[j].useWeight = '' : this.batchList[j].useWeight = this.batchList[j].useWeight;
					this.batchList[j].backNum == '0.000' ? this.batchList[j].backNum = '' : this.batchList[j].backNum = this.batchList[j].backNum;
					this.batchList[j].backWeight == '0.000' ? this.batchList[j].backWeight = '' : this.batchList[j].backWeight = this.batchList[j].backWeight;

				}
			},
			//单位换算
			comUnit(...reset){ //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number,value,showName,minName,type] = reset;
				return global.comUnit(number,value,showName,minName,type);
			},
			//全部消耗
			allUse(){
				for(let i = 0; i < this.batchList.length; i++){
					let str = this.comUnit(this.batchList[i].surplus,this.selUnit.value,this.selUnit.name,this.minUnit.name,true);
					if(this.selUnit.isMin != 1){
						this.batchList[i].useNum = str.oNull;
						this.batchList[i].useWeight = str.tNull;
					}else{
						this.batchList[i].useNum = str.tNull;
						this.batchList[i].useWeight = '';
					}
					this.batchList[i].backNum = '';
					this.batchList[i].backWeight = '';
					this.batchList[i].usemin = this.batchList[i].useNum * this.selUnit.value + this.batchList[i].useWeight*1; //消耗的最小单位数量
				}
			},
			//剩余回库
			allBack(){
				for(let i = 0; i < this.batchList.length; i++){
					let data = this.batchList[i].surplus*1 - this.batchList[i].usemin*1;
					let str = this.comUnit(data,this.selUnit.value,this.selUnit.name,this.minUnit.name,true);
					if(this.selUnit.isMin != 1){
						this.batchList[i].backNum = str.oNull;
						this.batchList[i].backWeight = str.tNull;
					}else{
						this.batchList[i].backNum = str.tNull;
						this.batchList[i].backWeight = '';
					}
				}
			},
			//筛选
			search(){
				this.batchList = [];
				if(this.startObj.time > this.endObj.time){
					this.$store.commit('setWin',{winType:'alert',content:'开始时间不能大于结束时间'});
					return false;
				}
				//过滤时间
				for(let i = 0; i < this.list.length; i++){
					if(this.list[i].productionTime*1000 <= this.endObj.time && this.list[i].productionTime*1000 >= this.startObj.time){
						this.batchList.push(this.list[i]);
					}
				}
				//过滤供应商
				for(let i = 0; i < this.batchList.length; i++){
					if(this.batchList[i].supplier.indexOf(this.supplyer) == -1){
						this.batchList.splice(i,1);
						i--;
					}
				}
				//过滤批次编号
				for(let i = 0; i < this.batchList.length; i++){
					if(this.batchList[i].batchCode.indexOf(this.batchNum) == -1){
						this.batchList.splice(i,1);
						i--;
					}
				}
			},
			//重置
			reset(){
				this.batchNum = '';
				this.supplyer = '';
				this.startObj.time = utils.getTime({time: new Date()}).start;
				this.endObj.time = utils.getTime({time: new Date()}).end;
				this.batchList = utils.deepCopy(this.list);
			}

		}
	};
 </script>

 <style scoped>
	#tan {
		height: 100%;
		background: #F7F7F7;
		padding: 19px;
	}
	#tan .title{
		width: 100%;
		height: auto;
	}
	#tan .title div {
		display: inline-block;
		width: 300px;
		height: 86px;
		margin-left: 10px;
	}
	#tan .title div span{
		display: block;
		height: 30px;
		line-height: 30px;
	}
	#tan .menu{
		margin-bottom: 20px;
	}
	#tan .menu input{
		width: 170px;
		height: 40px;
		padding-left: 7px;
	}
	#tan .menu .btn{
		display: inline-block;
		width: 100px;
		height: 40px;
		line-height: 40px;
		color: #fff;
		text-align: center;
		font-size: 16px;
		vertical-align: middle;
	}
	#tan .menu .canMulti {
		display: inline-block;
		vertical-align: middle;
		background: #fff;
		height: 40px;
	}
	#tan .menu .canMulti .timeBox{
		position: relative;
		width: 350px; 
		height: 40px; 
		line-height: 40px;
		cursor: pointer;
		border: 1px solid #CECDCD;
	}
	#tan .menu .canMulti .time{
		float: left;
		width: 140px; 
		height: 39px;
		line-height: 39px;
		text-align: center;
	}
	#tan .menu .canMulti .timeBox .down{
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid #b3b3b3;
		position: absolute;
		top: 15px;
		right: 17px;
	}
	#tan ul{
		height: 60px;
		border-top: 1px solid #D5D5D5;
	}
	#tan .top ul li{
		height: 40px !important;
		line-height: 40px;
		margin-top: 10px;
		border-right: 1px solid #D5D5D5;
	}
	#tan .content{
		background: #F7F7F7;
	}
	#tan .content .top i{
		text-decoration: underline;
		margin-left: 10px;
	}
	#tan .list li,
	#tan .list li span{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	#tan .content ul li{
		float: left;
		text-align:center;
		height: 60px;
	}
	#tan .content ul li:nth-child(1){
		width: 40px;
	}
	#tan .content ul li:nth-child(2){
		width: 110px;
	}
	#tan .content ul li:nth-child(3){
		width: 100px;
	}
	#tan .content ul li:nth-child(4){
		width: 140px;
	}
	#tan .content ul li:nth-child(5){
		width: 150px;
	}
	#tan .content ul li:nth-child(6){
		width: 160px;
	}
	#tan .content ul li:nth-child(7){
		width: 260px;
		border-right: none;
	}
	#tan .content ul li:nth-child(8){
		width: 260px;
		border-right: none;
	}
	#tan .content ul.batch li{
		width: 140px;
	}
	#tan .content ul.batch li:nth-child(1){
		width: 50px;
	}
	#tan .content ul.batch li:nth-child(6){
		width: 250px;
	}
	#tan .content ul.batch li:nth-child(7){
		width: 250px;
	}
	#tan .content .list input{
		width: 70px;
		height: 39px;
		padding-left: 7px;
		border: 1px solid #D5D5D5;
		vertical-align: middle;
	}
	#tan .content .list ul li{
		line-height: 60px;
	}
	#tan .content .list ul .end span{
		display: inline-block;
		width: 40px;
		height: 39px;
		line-height: 39px;
		border: 1px solid #D5D5D5;
		vertical-align: middle;
		border-left: none;
		background: #fff;
	}
	#tan .list:last-child ul{
		border-bottom: 1px solid #D5D5D5;
	}
	#emptyData {
		margin: 0 auto;
		text-align: center;
		height: 50px;
		line-height: 50px;
		color: orange;
	}
 </style>
 
 