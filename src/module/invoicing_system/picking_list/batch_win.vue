/**
 * @file
 * 
 * 批次弹窗
 *
 * @author zhengu.jiang
 */
 <template>
	<div>
		<win @winEvent="getData" :align="'center'" :width="1000" :height="600" :ok="okstyle">
			<span slot="title">{{title}}</span>
			<div id = "tan" slot="content"  v-cloak>
				<section class="title">
					<div>
						<span :title="info.materialName" class="hide">物料名称：{{info.materialName}}</span>
						<span>保质期：{{info.validity}}{{validityType[info.validityType]}}</span>
					</div>
					<div style="vertical-align:top">
						<span :title="info.unitName" class="hide">物料单位：{{info.unitName}}</span>
						<span :title="info.materialCategoryName" class="hide">分类：{{info.materialCategoryName}}</span>
					</div>
					<div>
						<span>默认单位：{{name}}</span>
						<span>最小单位：{{info.minName}}</span>
					</div>
				</section>
				<section class="menu">
					<input type="text" v-model="batchNum" placeholder="请输入批次编号">
					<input type="text" v-model="supplyer" placeholder="请输入供应商">
					<div class="canMulti">
						<calendar :pObj = 'startObj' @throwTime="getStartTime" class="fl"></calendar>
						<div class="time" style="width: 25px;">---</div>
						<calendar :pObj = 'endObj' @throwTime="getEndTime" class="fl"></calendar>
					</div>
					<span class="blue btn" @click="search">筛选</span>
					<span class="gray btn" @click="reset">重置</span>
					<selectbtn style="background:#fff;margin-top:5px" @selOn="selOn" :sorts="info.unitList" :width="180" :name="unitName"></selectbtn>
				</section>
				<section class="content">
					<div class="top">
						<ul>
							<li>序号</li>
							<li>批次编号</li>
							<li>生产日期</li>
							<li>供应商</li>
							<li>所属仓库</li>
							<li>当前批次数量/重量</li>
							<li><span v-if="winType">出库</span><span v-else>领料</span>数量/重量</li>
						</ul>
					</div>
					<section v-if="backData && backData.length > 0">
						<div class="list" v-for="(item,j) in backData" :key="j">
							<ul>
								<li>{{index+1}}</li>
								<li :title="item.batchCode">{{item.batchCode}}</li>
								<li>{{transFormDate(item.productionTime*1000)}}</li>
								<li :title="item.supplier">{{item.supplier}}</li>
								<li :title="item.wName">{{item.wName}}</li>
								<li :title="comUnit(Number(item.surplus),info.defaultValue,info.defaultName,info.minName)">{{comUnit(Number(item.surplus),info.defaultValue,info.defaultName,info.minName)}}</li>
								<li>
									<template v-if="info.defaultName!=info.minName">
										<input type="text" placeholder="输入数字" v-model="item.oneNum" :onkeyup="getmin(item,j)"><i :title="info.defaultName">{{info.defaultName}}</i>
										+
									</template>
									<input type="text" placeholder="输入数字" v-model="item.twoNum" :onkeyup="getmin(item,j)"><i :title="info.minName">{{info.minName}}</i>
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
	import global from 'src/manager/global';
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
				// startTime: utils.getTime({time: new Date()}).start, //日期组件的开始时间
				// endTime: utils.getTime({time: new Date()}).end, //日期组件的结束时间
				unitName: '单位切换',
				info: '', //该物料信息
				backData:[],
				index:0,         //单位切换索引
				showName: '',
				supplyer: '', //筛选供应商
				batchNum: '', //筛选批次
				validityType: {
					0: '月',
					1: '日',
					2: '年'
				},
				name: '', //默认单位
			};
		},
		props: ['batchInfo','winIndex','wid','winType'],
		mounted(){
			this.title = '批次选择';
			this.info = utils.deepCopy(this.batchInfo);
			this.name = utils.deepCopy(this.info.defaultName);
			this.info.unitName = '';
			for(let i = 0; i < this.info.unitData.length; i++){
				this.info.unitName += this.info.unitData[i].name + ',';
			}
			this.info.unitName = this.info.unitName.slice(0,this.info.unitName.length-1);
			// this.showName = this.info.defaultName
			this.getMaterialBatch();
		},
		components:{
			win: ()=> import (/*webpackChunkName: 'win'*/ 'src/components/win'),
			calendar: () =>import(/*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
			selectbtn: ()=> import (/*webpackChunkName: 'select_btn'*/ 'src/components/select_btn')
		},
		methods: {
			getStartTime(res){
				this.startObj.time = res;
			},
			getEndTime(res){
				this.endObj.time = res;
			},
			//获取批次列表
			async getMaterialBatch(){
				let res = await http.getMaterialBatch({data:{
					mid: this.batchInfo.materialId,
					wid: this.wid||''
				}});
				for(let i = 0; i < res.list.length; i++){
					res.list[i].oneNum = '';
					res.list[i].twoNum = '';
					res.list[i].minNumber = '';
					for(let k = 0; k < this.info.batch.length; k++){
						if(res.list[i].batchId == this.info.batch[k].batchId){
							res.list[i].oneNum = this.info.batch[k].oneNum;
							res.list[i].twoNum = this.info.batch[k].twoNum;
							res.list[i].minNumber = this.info.batch[k].minNumber;
							this.backItem(this.batchInfo.index);    
						}
					}
				}
				this.list = utils.deepCopy(res.list);
				this.backData = res.list;
				this.index = this.batchInfo.index;

			},
			getData(res){
				if(res == 'ok'){
					for(let i = 0; i < this.backData.length; i++){
						if((this.backData[i].minNumber > this.backData[i].surplus) && this.backData[i].surplus > 0){
							this.$store.commit('setWin',{winType:'alert',content:'批次编号' + this.backData[i].batchCode + '领料数量不能大于当前数量'});
							return false;
						}
					}
				}
				this.$emit('getWin',res,this.backData,this.index);
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
			//保存最小的领料量
			saveNum(num,j){
				for(let k=0;k<this.backData.length;k++){
					if(k==j){
						this.backData[j].minNumber=num;
					}
				}
			},
			//单位选择
			selOn(res){
				this.index=res;
				this.backItem(res);
			},
			//获取最小值
			getmin(item,j){
				item.oneNum != '' ? item.oneNum = (item.oneNum+'').replace(/[^\d.]/g,'') : item.oneNum = '';
				item.twoNum != '' ? item.twoNum = (item.twoNum+'').replace(/[^\d.]/g,'') : item.twoNum = '';
				let minNumber=Number(item.oneNum)*Number(this.info.defaultValue)+Number(item.twoNum);
				item.minNumber=minNumber;
				this.saveNum(minNumber,j);    //保存最小的领料量
			},
			//改变数值
			backItem(index){
				let showName=this.info.unitList[index];      //展示的单位名称
				this.info.defaultName=showName;
				for(let k=0;k<this.info.unitData.length;k++){
					if(this.info.unitData[k].name==showName){
						this.info.defaultValue=this.info.unitData[k].value;
					}
				}
				for(let k=0;k<this.backData.length;k++){
					if(Number(this.backData[k].minNumber)){
						let backObj=global.comUnit(Number(this.backData[k].minNumber),this.info.defaultValue,showName,this.info.minName,true);
						this.backData[k].oneNum=backObj.oNull;
						this.backData[k].twoNum=backObj.tNull;
					}
				}
			},
			//单位换算
			comUnit(...reset){ //number领取量（以最小单位计算），value换算关系，showName展示的单位名称,minName最小单位名称
				let [number,value,showName,minName,type] = reset;
				return global.comUnit(number,value,showName,minName,type);
			},
			//筛选
			search(){
				this.backData = [];
				if(this.startObj.time > this.endObj.time){
					this.$store.commit('setWin',{winType:'alert',content:'开始时间不能大于结束时间'});
					return false;
				}
				//过滤时间
				for(let i = 0; i < this.list.length; i++){
					if(this.list[i].productionTime*1000 <= this.endObj.time && this.list[i].productionTime*1000 >= this.startObj.time){
						this.backData.push(this.list[i]);
					}
				}
				//过滤供应商
				for(let i = 0; i < this.backData.length; i++){
					if(this.backData[i].supplier.indexOf(this.supplyer) == -1){
						this.backData.splice(i,1);
						i--;
					}
				}
				//过滤批次编号
				for(let i = 0; i < this.backData.length; i++){
					if(this.backData[i].batchCode.indexOf(this.batchNum) == -1){
						this.backData.splice(i,1);
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
				this.getMaterialBatch();
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
		width: 140px;
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
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		border-right: 1px solid #D5D5D5;
	}
	#tan .content{
		background: #F7F7F7;
	}
	#tan .list li,
	#tan .list i,
	#tan .hide{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	#tan .content ul li{
		float: left;
		text-align:center;
	}
	#tan .content ul li:nth-child(1){
		width: 58px;
	}
	#tan .content ul li:nth-child(2){
		width: 108px;
	}
	#tan .content ul li:nth-child(3){
		width: 140px;
	}
	#tan .content ul li:nth-child(4){
		width: 105px;
	}
	#tan .content ul li:nth-child(5){
		width: 150px;
	}
	#tan .content ul li:nth-child(6){
		width: 156px;
	}
	#tan .content ul li:nth-child(7){
		width: 233px;
		border-right: none;
	}
	#tan .content .list input{
		width: 65px;
		height: 39px;
		padding-left: 7px;
		border: 1px solid #D5D5D5;
		vertical-align: middle;
	}
	#tan .content .list i{
		display: inline-block;
		width: 40px;
		height: 39px;
		border: 1px solid #ccc;
		vertical-align: middle;
		line-height: 39px;
		background: #fff;
		border-left: none;
	}
	#tan .content .list ul li{
		height: 60px;
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
 
 