<template>
	<!-- 
		百川  曾伟福
		file  商品,物料,物料加工记录列表
	 -->
	<div id="goods-count-history">
		<div class="content-body" v-if="!showAddGoodsCom">
			<com-table
				:showHand ="true"
				:listName ="'盘库商品列表'"
				:listHeight ='70'
				:showTitle ="1"
				:titleData ="titleData"
				:introData="nowList"
				:allTotal ="pageObj.listNum"
				:fixed="0"
				:bannerStyle="{'color':'#333','font-size':'16px'}"
				:widthType ="true"
				:listWidth ="1435" 
				:contentStyle ="{'color':'#666',fontSize:'14px'}"           
			>
			<div slot="con-0" slot-scope="{data,index}">
				<span class="operation-left line" @click="clearInput(data)">清空</span>
				<span class="operation-right" @click="openWin(data)">批量盘库</span>
			</div>
			<div slot="con-1" slot-scope="{data,index}">
				<input type="text" v-model="data.countNum" class="count-num" :readonly="data.canWrite" :class="{'canWrite':data.canWrite}" maxlength="9" placeholder="请输入数字" @input="checkNum(data,index)">
			</div>
			</com-table>
			<div>
				<page-element 
					:page="pageObj.page" 
					:total="pageObj.total"  
					@pageNum="getPageNum"
				></page-element>
			</div>
			<component
				:is ="showCom"
				:title="comObj.title"
				:list="comObj.list"
				:info ="comObj.info"
				@emitEvent="closeWin"
			></component>
		</div>
		<add-goods 
			v-if="showAddGoodsCom" 
			@emit="getGoodsWin"
			:selObj ="stateStore.addGoods"
		></add-goods>
	</div>
</template>
<script>
/*
	请求:
		GoodsinventoryBatchSetGoodsInventory:		//提交盘库数据
		getGoodsBatch:								//获取商品批次列表
		GoodsinventoryGetGoodsInventoryList:		//搜索批量盘库
		templateGetInventoryGoodsTemplate:			//获取模板内容
	
	注意:
		1.在不同的区域可以出现一样的商品
		2.当未填写填写批次的时候,盘库时提交的批次batch为0
		3.批次填写了,总量不可以修改,批次未填写,总量可以修改

	接口需求:
		templateGetInventoryGoodsTemplate
			1.gids非空，以gids为准
			2.gids为空，表示选中type、wid对应的商品；
			3.gids，type，wid均为空，表示获取门店下所有商品
*/	
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
	data () {
		return {
			titleData:[
				{titleName:'操作'},
				{titleName:'盘库数量'},
				{titleName:'库存数量',dataName:'surplusUnit'},
				{titleName:'商品名',dataName:'name'},
				{titleName:'条形码',dataName:'barCode'},
				{titleName:'所属仓库',dataName:'storeName'},
				{titleName:'批次数量',dataName:'batch'},
				{titleName:'商品类型',dataName:'typeName'},
			],
			list:[],					//所有的列表
			nowList:[],					//展示的列表
			startTime:{
				time:'',                //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,              //是否展示时分秒控件(默认显示)
				detail:true,            //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160               //输入框的宽  默认200px                
			},
			endTime:{
				time:'',                //需要展示的时间(时间戳)(默认展示当前时间)
				show:true,              //是否展示时分秒控件(默认显示)
				detail:true,            //是否显示精确到时分秒    true:不显示时分秒,false:显示时分秒(默认)
				width:160               //输入框的宽  默认200px                
			},
			pageObj: {
				page: 1,
				total: 0,				//总页数
				num: 10, 				//每页显示多少条
				listNum:0,				//总记录数
				flag:true,				//前端分页,false,后端分页
			},
			toggle:true,               	//tab切换

			showCom:'',
			comObj:{},

			showAddGoodsCom:false,		//展示添加商品组件
			stateStore:{
				addGoods:{
					list:[],
					search:{}
				}						//添加商品
			},	

			stateCountNum:[],			//保存填写的商品总数量	
			batchListNum:[],			//保存填写的每个批次数量	

			opearItem:{},				//当前操作的商品
		};
	},
	mounted(){
		if(this.isPrimitive(this.$route.query.id)){
			//使用模板
			this.initBtn();
			this.showAddGoodsCom = false;
			this.templateId = this.$route.query.id;
			this.useTemplate();
		}else{
			this.showAddGoodsCom = true;
		}
	},
	methods: {
		getTime(flag,res){
			this[flag].time = res;
		},


		closeWin(res,flag){
			let num = '',				//盘点批次总数
				arr = [];				//存储已盘点批次列表

			if(!Array.isArray(res)){
				res = [];
			}

			if(flag == 'ok'){

				for(let ele of res){
					let str = ele.countNum.trim();
					if(str){
						let countNum = Number(str);
						num = Number(num);
						num += countNum;
						arr.push(ele);
					}
				}

				//去重并保存已盘点批次
				this.batchListNum = this.delBatchCountNum(res);
				this.batchListNum.push(...arr);

				num += '';
				//批次求和
				for(let i = 0;i<this.nowList.length;i++){
					if(this.nowList[i].id == this.opearItem.id){
						if(!num){
							//未盘点数量时
							this.opearItem.canWrite = false;	//当盘点批次数量总和为空时,可以继续填写盘点总量
						}else{
							//已盘点数量时
							this.opearItem.canWrite = true;		//当盘点批次数量总和为不空时,不可以继续填写盘点总量
							this.opearItem.countNum = num;
						}
						this.nowList.splice(i,1,this.opearItem);
						break;
					}
				}
			}

			this.opearItem = {};
			this.showCom = '';
			
		},
		async openWin(item){
			this.opearItem = item;

			let obj = await this.getHttp('getGoodsBatch',{
				gid:item.id,
				areaId:item.areaId
			});	

			if(!Array.isArray(obj.list)){
				obj.list = [];
			}

			obj.list = obj.list.map((ele,index)=>{
				index += 1;
				ele.itemIndex = index > 9 ? index : '0'+index;		//序号
				ele.storeName = `${ele.wName}-${ele.aName}`;		//仓库区域名
				ele.resetNum =`${ele.surplus}${item.unit}`;			//库存数量
				ele.productionTimeShow = utils.getTime({time:ele.productionTime,format:'yyyy-MM-dd hh:mm'}).format;	//展示的时间
				ele.unit = item.unit;								//商品单位
				ele.countNum = '';									//盘点数量
				ele.id = item.id;									//更改商品id字段
				return ele;
			});

			obj.list = this.matchBatchList(this.batchListNum,obj.list);	//还原填写的数量

			this.comObj = {
				title:'选择批次',
				list:obj.list,
				info:[
					{name:'商品名称',val:item.name},
					{name:'条码',val:item.barCode},
					{name:'商品单位',val:item.unit}
				],
			};
			this.showCom = 'batchWin';
		},
		
		getGoodsWin(res){
			this.initBtn();
			this.showAddGoodsCom = false;

			if(!res){
				return;	
			}

			let {list=[],search={},storeAll,name=''} = res;
			this.stateStore.addGoods = {search,list,storeAll,name};

			if(list.length == 0){
				this.pageObj.flag = false;
			}else{
				this.list = list;
				this.list = this.ininList(this.list);

				this.pageObj.flag = true;
				this.pageObj.listNum = this.list.length;
			}
			this.pageObj.page = 1;
			this.getPageNum({
				page:this.pageObj.page,
				num:this.pageObj.num
			});
		},
		getPageNum(obj){
			this.pageObj.page = obj.page;
			this.pageObj.num = obj.num;

			if(this.pageObj.flag){
				//前端分页
				this.addStateCountNum();

				this.pageObj.total = Math.ceil(this.list.length/this.pageObj.num);
				this.nowList = this.initPage(this.list,this.pageObj.page,this.pageObj.num);	
			}else{
				//后台分页
				this.getList();
			}
		},

		getHasNumItem(list){
			//获取当前列表中已经填写数据的条目
			let arr = [];
			for(let ele of list){
				ele.countNum = String(ele.countNum);
				if(ele.countNum.trim()){
					let temp = utils.deepCopy(ele);
					arr.push(temp);
				}
			}
			return arr;
		},
		matchStateList(list=[],nowList=[]){
			//匹配商品数量
			for(let ele of nowList){
				for(let e of list){
					if(ele.id == e.id){
						ele.countNum = e.countNum;
						break;
					}
				}
			}
			return [...nowList];
		},
		matchBatchList(list=[],nowList=[]){
			//匹配商品数量
			for(let ele of nowList){
				for(let e of list){
					if(ele.id == e.id && ele.wid == e.wid && ele.areaId == e.areaId && ele.batchId == e.batchId){
						ele.countNum = e.countNum;
						break;
					}
				}
			}
			return [...nowList];
		},
		delStateCountNum(list=[],nowList=[]){
			//删除子集
			let temp = [];
			if(nowList.length == 0){
				temp = [...list];
			}else{
				temp = list.filter((ele)=>{
					let flag = true;
					for(let e of nowList){
						if(ele.id == e.id){
							flag = false;
							break;
						}
					}
					return flag;
				});
			}
			return temp;
		},
		addStateCountNum(){
			let temp = [];
			this.stateCountNum = this.delStateCountNum(this.stateCountNum,this.nowList);
			temp = this.getHasNumItem(this.nowList);
			this.stateCountNum.push(...temp);			
		},
		delBatchCountNum(list=[]){
			//根据商品id,区域id,区域id,仓库id清除批次,之后再添加批次
			let temp = [];
			temp = this.batchListNum.filter((ele)=>{
				let flag = true;
				for(let e of list){
					if(ele.id == e.id && ele.wid == e.wid && ele.areaId == e.areaId && ele.batchId == e.batchId){
						flag = false;
						break;
					}
				}
				return flag;
			});
			return temp;
		},


		async getList(){
			//搜索商品
			let obj = {
				num:this.pageObj.num,
				page:this.pageObj.page,
				goodsName:'',
				barCode:'',
				secBarCode:''				
			};

			Object.assign(obj,this.stateStore.addGoods.search);

			if(obj.type){
				//后台需求
				obj.type = Number(obj.type)+1;
			}

			let res = await this.getHttp('GoodsinventoryGetGoodsInventoryList',obj);
			this.pageObj.listNum = res.count;
			this.pageObj.total = res.total;


			if(Array.isArray(res.list)){
				this.addStateCountNum();
				this.nowList = res.list;
				this.nowList = this.ininList(this.nowList);
				this.nowList = this.matchStateList(this.stateCountNum,this.nowList);
				this.list = [];				//清空
			}
		},
		async useTemplate(){
			//使用模板
			let obj = await this.getHttp('templateGetInventoryGoodsTemplate',{id:this.templateId});
			let content = obj.content;
			if(!this.toRawType(content,'Object')) content = {};

			let arr = [],
				{items=[],type='',wids:wid,aids:areaId} = content;

			this.stateStore.addGoods.name = obj.name;
			if(Array.isArray(items)){
				if(items.length == 0){
					if(Array.isArray(wid)){
						wid = wid.join(',');
					}
					if(Array.isArray(areaId)){
						areaId = areaId.join(',');
					}
					this.stateStore.addGoods.search = {type,wid,areaId};
					this.stateStore.addGoods.list = [];
					this.stateStore.addGoods.storeAll = true;
					this.pageObj.flag = false;
				}else{

					for(let ele of items){
						ele.areaId = ele.aid;
						ele.aid = undefined;
					}
					
					arr = await this.getHttp('GoodsInventoryGetGoodsInventoryListByGids',{param:items});

					this.list = [...arr];
					this.list = this.ininList(this.list);

					this.pageObj.flag = true;
					this.pageObj.listNum = this.list.length;

					this.stateStore.addGoods.list = [...arr];
					this.stateStore.addGoods.search = {type:'',wid:'',areaId:''};
					this.stateStore.addGoods.storeAll = false;
				}
				this.pageObj.page = 1;

				this.getPageNum({
					page:this.pageObj.page,
					num:this.pageObj.num
				});
			}
		},


		checkNum(item){
			if(item.canWrite) return;
			let num = item.countNum+'',
				reg = /([1-9]\d{0,9})|0/g,						//普通菜
				reg2 = /([1-9]\d{0,9}|0)\.?(\d{0,3})?/g,		//称重菜
				temp = [];

			num = num.trim();
			num = num.slice(0,30);

			if(item.type == 0){
				//普通菜
				temp = num.match(reg);
			}else{
				//称重菜
				temp = num.match(reg2);
			}

			if(!temp){
				temp = [];
				temp[0] = '';
			} 

			if(temp[0]){
				if(Number(temp[0]) < 0){
					temp[0] = 0;
				}

			}
			temp[0] += '';
			item.countNum = temp[0];
		},
		clearInput(item){
			//清空输入
			if(item.canWrite){
				return;
			}
			item.countNum = '';
		},
		ininList(list){
			//初始化列表数据,组合字段
			let types = ['普通商品','称重商品','自定义商品'],
				arr = [];

			arr = list.map((ele)=>{
				if(!ele.warehouseArea){
					ele.warehouseArea = ele.areaName;//接口兼容
				}
				if(!ele.countNum){
					ele.countNum = '';												//盘点数量
				}
				ele.storeName = `${ele.warehouse}/${ele.warehouseArea}`;			//仓库区域
				ele.typeName = types[ele.type];										//商品类型
				ele.surplusUnit = ele.surplus+ele.unit;								//库存数
				ele.id = ele.gid;													//统一商品id
				ele.batchId = '0';													//盘总数量时,后台接受的batchId为0
				return ele;
			});
			return arr;
		},
		formatData(list){
			//获取提交的数据
			let temp = {
				new:[],
				old:[],
			};
			
			for(let ele of list){
				let obj = {
					batchId:ele.batchId,
					wid:ele.wid,
					areaId:ele.areaId,
					surplus:ele.countNum,
					itemId:ele.id
				};
				temp.new.push(obj);
			}
			return temp;
		},
		delSameList(){
			//当批次已经填写数量则提交批次的数量,否则填写总的数量,
			this.stateCountNum = this.stateCountNum.filter((ele)=>{
				let flag = true;
				for(let e of this.batchListNum){
					if(ele.id == e.id){
						flag = false;
						break;
					}
				}
				return flag;
			});
		},
		mergeList(){
			//合并填写的批次与总量
			let sum = [],
				temp = {};

			sum = [...this.stateCountNum];
			sum.push(...this.batchListNum);

			temp = this.formatData(sum);
			return temp;
		},
		async submitData(){
			let obj = {};

			this.addStateCountNum();
			this.delSameList();
			obj = this.mergeList();
			obj.new.push(...obj.old);
			if(obj.new.length == 0){
				this.alert('请先填写盘库数量!');
				return;
			}

			this.alert('确认盘库?',async ()=>{
				let retData = await this.getHttp('GoodsinventoryBatchSetGoodsInventory',{
					data:obj.new,
					type:0
				});
				if(retData.result){
					this.alert('盘库成功!');
					delete this.$route.query.id;
					this.$router.push({path:'/admin/goodsCountHistory',query:this.$route.query});
				}else{
					this.alert('盘库失败!');
				}
			});
		},
		initBtn(){
			let style = {height:'40px','color':'#fff'};
			this.$store.commit('setPageTools',[
				{
					name: '确认盘库',
					className:'yellow',
					style,
					fn:()=>{
						this.submitData();
					}
				},
				{
					name: '添加商品',
					style,
					fn:()=>{
						this.showAddGoodsCom = true;
					}
				},
				{
					name: '取消盘库',
					className:'gray',
					style,
					fn:()=>{
						this.$router.go(-1);
					}
				},

			]);            
		},
		alert(str,callback){
			let obj = {
				title:'温馨提示',
				content:str,
				winType:'alert'			
			};
			if(typeof callback == 'function'){
				obj.winType = 'confirm';
				obj.callback = (res)=>{
					if(res == 'ok'){
						callback();
					}
				};
			}
			this.$store.commit('setWin',obj);
		},
		isPrimitive (value) {
			return ( typeof value === 'string' || typeof value === 'number');
		},
		toRawType (value,type) {
			return Object.prototype.toString.call(value).slice(8, -1) == type;
		},
		initPage(list, page, num) {
			//分页
			let sIndex = (page - 1) * num;
			let eIndex = page * num;
			let arr = list.slice(sIndex, eIndex);
			return arr;
		},
		listGetAttr(arr,attr = 'id'){
			let attrs = [];
			attrs = arr.map((ele)=>{
				return ele[attr]+'';
			});
			return attrs;
		},
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
		},
	},
	components: {
		comTable:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),
		batchWin:() => import(/*webpackChunkName:'goods_count_batch_win'*/'src/module/invoicing_system/invoicing/goods_count_batch_win'),
		addGoods:() => import(/*webpackChunkName:'goods_count_batch_win'*/'src/module/invoicing_system/invoicing/check_warehouse/add_goods'),
		pageElement: () =>import( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
	},
};
</script>
<style lang='less' scoped>
	@import url('../warehouse_manage/z_less.less');
	#goods-count-history{
		.content-body{
			.opera-common{
				display: inline-block;
				.whb(auto,40px,none);
				line-height: 40px;
				vertical-align: middle;
				user-select: none;
			}
			.operation-left{
				color:@r;
				font-size: 14px;
				cursor: pointer;
				.opera-common;
			}
			.line:after{
				content:'';
				display: inline-block;
				margin:0px 10px;
				.whb(1px,18px);
				vertical-align: middle;
				border-right:1px solid #aaa;
			}
			.operation-right{
				color:@b;
				font-size: 14px;
				cursor: pointer;
				.opera-common;
				
			}
			.count-num{
				.input-text(@w:100px);
				margin: 0;
				margin-top:15px;
				color:#666;
				font-size:14px;
			}
			.canWrite{
				background-color: #f2f2f2;
				cursor: not-allowed;
			}
			
		}
	}
</style>