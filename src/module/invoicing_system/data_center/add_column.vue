<!--
    **自定义报表模板-添加列
    *
    * 黄一帆
    * *
    *
-->
<template>
	<win :align="'center'" :height="500" :width="700" :ok="btnOk" @winEvent="closeSelfWin">
		<span slot="title">{{title}}</span>
		<div class="add-column" slot="content">
			<div class="inp-block">
				<span class="inp-name">名称</span>
				<div class="right">
					<el-input placeholder="输入名称" class="inp-class" v-model="name" max-length="20"></el-input>
				</div>
			</div>
			<div class="inp-block">
				<span class="inp-name">排序</span>
				<div class="right">
					<el-input-number v-model="sortObj.num" :min="1" :max="sortObj.max" class="inp-class"></el-input-number>
					<div class="info">
						<i class="el-icon-warning collection-tips-icon"></i>范围（1-{{sortObj.max}}）
					</div>
				</div>
			</div>
			<div class="inp-block">
				<div class="btn-box">
					<el-popover
						placement="bottom"
						width="550"
						trigger="click"
						v-model="visible">
						<div class="column-container">
							<el-tabs v-model="columnTabIndex" type="card">
								<el-tab-pane label="基础项" name="0">
									<div class="radio-container">
										<el-radio-group v-model="baseRadio" @change="(res)=>{radioChange(1,res)}">
											<span class="radio-box" v-for="item in baseList" :key="item.id">
												<el-radio border :label="item.id">{{item.name}}</el-radio>
											</span>
										</el-radio-group>
									</div>
								</el-tab-pane>
								<el-tab-pane label="公式项" name="1">
									<div class="radio-container">
										<el-table :data="formulaList" highlight-current-row @current-change="(res)=>{radioChange(2,res)}"
											border height="249" style="width: 100%" ref="singleTable">
											<el-table-column property="name" label="名称" width="150">
											</el-table-column>
											<el-table-column property="formulaStr" label="计算公式" width="250">
											</el-table-column>
											<el-table-column property="formatStr" label="格式" width="200">
											</el-table-column>
										</el-table>
									</div>
								</el-tab-pane>
							</el-tabs>
						</div>
						<el-button slot="reference" class="btn-class">
							选择统计项<i class="el-icon-arrow-down el-icon--right"></i>
						</el-button>
					</el-popover>
				</div>
				<div class="btn-box">
					<el-button class="btn-class" icon="el-icon-plus" @click="selWare">选择仓库</el-button>
				</div>
				<div class="btn-box">
					<el-button class="btn-class" icon="el-icon-plus" type="primary" @click="addFormula">新建公式项</el-button>
				</div>
			</div>
			<div class="item-block">
				<div class="item">
					<span>已选统计项：</span>
					<p>{{itemName}}</p>
				</div>
				<div class="item">
					<span>关联店铺：</span>
					<p>{{storeName}}</p>
				</div>
				<div class="item">
					<span>已选仓库：</span>
					<p>{{wareName}}</p>
				</div>
			</div>
			<sel-warehouse v-if="showCom" :pObj="comObj" @throwWin="winWarehouse"></sel-warehouse>
			<add-formula v-if="showFormula" :list="formulaData" @emit="getFormula"></add-formula>
		</div>
	</win>
</template>
<script>
//该组件直接在组件内容调用接口，请求仓库数据
import http from 'src/manager/http';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			title: '添加列',
			btnOk: {
				content: '确定'
			},
			btnCancel: {},
			name:'',//列表项名称
			sortObj:{//排序
				num:1,
				max:1,
			},
			columnTabIndex:'0',
			columnItem:'',//选择项
			visible:false,//选择列表项是否显示

			showCom:false,//显示选择仓库弹窗
			comObj:{//仓库弹窗传入数据
				isMultiple:true,
				shopId:'',//店铺id
				only:'',//是否只显示 品牌/门店
			},
			storeList:[],//已选中的店铺列表
			wareList:[],//选中的仓库列表
			storeWarehouse:[],//店铺-仓库列表
			itemName:'',//已选统计项
			wareName:'',
			storeName:'',
			formulaPercent:[//是否半分比
				{label:'数字',value:0},
				{label:'百分百',value:1},
			],
			formulaRounding:[//舍入规则
				{label:'四舍五入',value:0},
				{label:'向上取值',value:1},
				{label:'向下取值',value:2},
			],

			showFormula:false,
			formulaData:{},//公式列表数据
			baseList:[],//基础项列表
			baseRadio:'',//基础项radio绑定
			formulaList:[],
			emitObj:{},//抛出对象
			itemObj:{},//统计项
			itemType:'',//统计项类型 1基础 2公式
			promiseObj:{
				base:null,
				formula:null,
			},
			shopId:'',//店铺id
			only:'',//是否只显示品牌
		};
	},
	props: {
		pObj: Object,
		//抛出方法 @emit 传入数据跟抛出时相同
		/*
			{
		  		name:'',				//名称
		 		sortObj:{num:0,max:0},	//排序
		  		item:{},				//统计项
		  		store:[],				//店铺
				warehouse:[],			//仓库
				type:'',				//统计项类型 1基础 2公式
				
			}
		*/
	},
	mounted() {
		this.initData();
		let userShop = storage.session('userShop');
		if(userShop.currentShop.ischain != '3'){
			this.comObj.shopId = userShop.currentShop.id;
			this.comObj.only = 2;
		}
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element'),
		selWarehouse: () => 
			import( /*webpackChunkName:'warehouse_select'*/ 'src/module/invoicing_system/warehouse_manage/warehouse_select'),
		addFormula: () =>
			import( /*webpackChunkName:'add_formula'*/ './add_formula'),
	},
	methods: {
		closeSelfWin(res) {
			if(res == 'ok') {
				this.confirmWin();
			} else {
				this.$emit('emit',false);
			}
		},
		initData(){
			if(this.pObj.name){//编辑
				this.editColumn();
			}else{//新建
				if(this.pObj.sortObj) this.sortObj = this.pObj.sortObj;
				this.getBase();
			}
		},
		//编辑列表项
		editColumn(){
			this.getBase().then(()=>{
				let arr = ['name','sortObj'];
				for(let item of arr){
					this[item] = this.pObj[item];
				}
				this.storeList = this.pObj.store;
				this.wareList = this.pObj.warehouse;
				if(this.pObj.type==1){
					this.baseRadio = this.pObj.item.id;
					this.itemName = `${this.pObj.item.name}（基础项）`;
				}else{
					for(let item of this.formulaList){
						if(item.id==this.pObj.item.id){
							this.$refs.singleTable.setCurrentRow(item);
						}
					}
				}
				this.selContent();
			});
		},
		//获取基础项数据，公式项数据
		async getBase(){
			//基础项集合
			let data = await http.materialreportGetReportItemList();
			for(let i=0;i<data.length;i++){
				if(data[i].type==0){
					data.splice(i,1);
					i--;
				}
			}
			this.baseList = data;
			this.formulaData.base = this.baseList;
			//公式项集合
			let formulaData = await http.materialreportGetStatisticItemFormulaList();
			for(let item of formulaData.list){
				item.formulaStr = item.formula.replace(/id_(\d+)/g,(match,p1)=>{
					for(let base of this.baseList){
						if(p1==base.id){
							return base.name;
						}
					}
				});
				//匹配 是否百分百
				let isPercent = this.formulaPercent.filter((obj)=>{
					return obj.value==item.isPercent;
				})[0].label;
				//匹配 保留几位小数
				let carryRule = this.formulaRounding.filter((obj)=>{
					return obj.value==item.carryRule;
				})[0].label;
				item.formatStr = `${isPercent}, ${item.reserveRule}位小数, ${carryRule}`;
			}
			this.formulaList = formulaData.list;
			this.formulaData.formula = this.formulaList;
		},
		//抛出列表项数据
		confirmWin(){
			if(!this.itemName){
				this.$message({message: '请选择统计项',type: 'error'});
				return;
			}
			if(!this.wareName || !this.storeName){
				this.$message({message: '请选择仓库',type: 'error'});
				return;
			}
			if(!this.name){
				this.$message({message: '请输入列表项名称',type: 'error'});
				return;
			}
			this.emitObj={
				name:this.name,//名称
				sortObj:this.sortObj,//排序
				item:this.itemObj,//统计项
				store:this.storeList,//店铺
				warehouse:this.wareList,//仓库
				type:this.itemType,//统计项类型 1基础项 2公式项
			};
			this.$emit('emit',this.emitObj);
		},
		//获取公式信息
		getFormula(res){
			this.showFormula = false;
			this.getBase().then(()=>{
				for(let item of this.formulaList){
					if(item.id==res.id){
						this.$refs.singleTable.setCurrentRow(item);
					}
				}
			});
		},
		//选择统计项
		radioChange(type,res){
			console.log(res);
			if(res===null) return;
			this.visible = false;
			let itemType='',itemName='';
			switch (type){
				case 1://标准项
					let obj = this.baseList.filter((item)=>{
						return item.id==res;
					})[0];
					itemName = obj.name;
					itemType = '标准项';
					
					this.itemType = 1;
					this.itemObj = {id:obj.id,name:itemName};
					this.$refs.singleTable.setCurrentRow(null);
					break;
				case 2://公式项
					itemName = res.name;
					itemType = '公式项';

					this.itemType = 2;
					this.itemObj = {
						id:res.id,
						name:itemName,
						formula:res.formula,
						formulaName:res.formulaStr,
						formatName:res.formatStr,
					};
					this.baseRadio = '';
					break;
			}
			//设置选中以后的显示-已选统计项
			this.itemName = `${itemName}（${itemType}）`;
		},
		//选择仓库
		selWare(){
			this.comObj.selectId = this.wareList.map((item)=>{
				return item.id;
			});
			this.showCom = true;
		},
		//仓库选择完毕
		winWarehouse(res,list){
			if(res=='ok'){
				this.wareList = list;
				let storeList = [];
				for(let item of this.wareList){
					let obj={wid:[]};
					if(item.owner.split(',')[1]=='0'){//品牌
						obj.id = item.brandId;
						obj.name = item.brandName;
						obj.isBrand = 1;
					}else{//单店
						obj.id = item.shopId;
						obj.name = item.shopName;
						obj.isBrand = 0;
					}
					if(this.checkRepeat(storeList,obj.id)){
						storeList.push(obj);
					}
				}
				//每个店铺id对应旗下仓库
				for(let item of storeList){
					if(item.isBrand){//品牌
						for(let ware of this.wareList){
							if(ware.shopId=='0'){
								item.wid.push(ware.id);
							}
						}
					}else{//门店
						for(let ware of this.wareList){
							if(item.id==ware.shopId){
								item.wid.push(ware.id);
							}
						}
					}
				}
				this.storeList = storeList;
				this.selContent();
			}
			this.showCom = false;
		},
		//删除重复id
		checkRepeat(list,id){
			for(let item of list){
				if(item.id==id){
					return false;
				}
			}
			return true;
		},
		//新建公式项
		addFormula(){
			this.showFormula = true;
		},
		//设置已选中项目显示
		selContent(){
			let store = this.storeList.map((item)=>{
				return item.name;
			});
			let ware = this.wareList.map((item)=>{
				return item.name;
			});
			this.storeName = store.join(', ');
			this.wareName = ware.join(', ');
		},
	},
};
</script>
<style lang='less' scoped>
	.add-column{
		.inp-class{width: 200px;}
		.btn-class{width: 150px;
			input{cursor: pointer;}
		}
		padding: 20px 50px;padding-bottom:0;
		.inp-block{overflow: hidden;padding-bottom:20px;
			.inp-name{float: left;text-align: right;width: 60px;height: 40px;line-height:40px;
				padding-right: 15px;position: relative;
				&:after{
					content: '*';
					position: absolute;
					right: 5px;top: -1px;
					color: red;
				}
			}
			.right{float: left;padding-left: 10px;
				.info{
					color: #999;display: inline;padding-left:10px;
					i{color: #ccc;font-size: 14px;margin-right: 5px;}
				}
			}
			.btn-box{float: left;padding-right: 20px;}
		}
		.item-block{
			border: 1px solid #dcdfe6;
			padding: 20px;
			.item{
				display: flex;
				padding-bottom: 15px;
				span,p{color: #666;line-height: 1.5;line-height: 1.5;}
				span{white-space: nowrap;}
				
			}
		}
		
	}
	.el-popper{
		.column-container{
			padding: 0 20px;
			
		}
		.radio-container{
			height: 250px;
			overflow: auto;
			border-bottom: 1px solid #dcdfe6;
			margin: 10px 0;
			.radio-box{
				display: inline-block;
				margin-right: 10px;
				margin-bottom: 10px;
			}
		}
		.handle{text-align: right;}
	}
</style>