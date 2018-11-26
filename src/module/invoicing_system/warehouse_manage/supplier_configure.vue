<!--
     
	进销存配置 - 百川 - 曾伟福
-->
<template>
	<div id = "invo-config">
		<div class="head">
			<span>进销存权限</span>
			<div></div>
		</div>
		<div class="content">
			<div class="tips-div" style="padding-bottom:20px;">
				<span class="tips-icon"></span>
				<span class="tips-word">
					进销存权限统一由品牌指派,如有权限需求请联系品牌权限管理人员
				</span>
			</div>
			<ul class="config-list">
				<li v-for="(item,index) in configList" :key="index">
					<span>{{item.name}}&nbsp;:&nbsp;{{item.status == 0 ? '关闭' : '开启'}}</span>
				</li>
			</ul>
		</div>


		<div class="head">
			<span>是否启用配置</span>
			<div></div>
		</div>
		<div class="content">
			<span class="label">商品 , 物料应用</span>
			<div class="label-content">
				<el-checkbox v-for="(item,index) in config" :key="index" v-model="item.isSelect" :label="item.name" border @change="goodsMaterial"></el-checkbox>
			</div>
			
		</div>


		<div class="head">
			<span>
				是否可以售卖
			</span>
			<div></div>
		</div>
		<div class="content">
			<span class="label" >货架商品不足时</span>
			<div class="label-content" style="line-height:40px;">
				<el-switch
					v-model="condition.isShelveMinus"
					active-color="#34A9AA"
					inactive-color="#909399"
					active-text="开"
					inactive-text="关"
					@change="(res)=>{changeSwitch('isShelveMinus',res)}"
				>
				</el-switch>
				<div class="in-block">
					<div class="tips-div" >
						<span class="tips-icon"></span>
						<span class="tips-word">
							开关开启时,销售后货架商品数量可以为负数,下次上架后补充完整						
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 编码配置 -->
		<template v-if="ischain == 3 || ischain == 0">
			<div class="head" >
				<span>编码配置</span>
				<div></div>
			</div>
			<div class="content" >
				<div>
					<el-button @click="openDialog">变更</el-button>
				</div>
				<p>
					<span>
						分类 : {{condition.multiCategory ? '物料可以存在多个分类' : '物料不能存在多个分类'}}
					</span>
				</p>
				<p>
					<span>
						物料编码排序 : {{condition.sortByBarCode ? '开启' : '关闭'}}
					</span>
				</p>
				<p>
					物料编码 : 
					<span v-for="(item,index) in mCode" :key="index" v-if="item.id == condition.wholeBarCode">
						{{item.name}}
					</span>
				</p>
			</div>
		</template>

		<!-- 采购单配置 -->
		<template v-if="ischain == 3 || ischain == 0">
			<div class="head" >
				<span>采购单配置</span>
				<div></div>
			</div>
			<div class="content">
				<p>
					采购审核 : 
					<el-switch
						v-model="condition.purchaseAudit"
						active-color="#34A9AA"
						inactive-color="#909399"
						active-text="开"
						inactive-text="关"
						class="switch-left"
						@change="(res)=>{changeSwitch('purchaseAudit',res)}"
					>
					</el-switch>
				</p>
			</div>
		</template>
		
		<!-- 入库配置 -->
		<template v-if="ischain == 3 || ischain == 0">
			<div class="head" >
				<span>入库配置</span>
				<div></div>
			</div>
			<div class="content" >
				<p>
					是否允许直接入库 : 
					<el-switch
						v-model="condition.commonStock"
						active-color="#34A9AA"
						inactive-color="#909399"
						active-text="开"
						inactive-text="关"
						class="switch-left"
						@change="(res)=>{changeSwitch('commonStock',res)}"
					>
					</el-switch>
				</p>
				<p>
					是否允许导入入库 : 
					<el-switch
						v-model="condition.importStock"
						active-color="#34A9AA"
						inactive-color="#909399"
						active-text="开"
						inactive-text="关"
						class="switch-left"
						@change="(res)=>{changeSwitch('importStock',res)}"
					>
					</el-switch>
				</p>
			</div>
		</template>

		<!-- 分销价格名称 -->
		<template v-if="ischain == 3">
			<div class="head" >
				<span>分销价格名称</span>
				<div></div>
			</div>
			<div class="content" >
				<li class="distribute-list" v-for="(item,index) in distribution" :key="index">
					<div class="label" style="text-align:center;">
						<span class="index">{{index > 8 ? index+1 : '0'+(index+1)}}</span>
						<span >分销价格名称</span>
					</div>
					<div class="label-content">
						<el-input clearable  v-model="item.name" maxlength="20" placeholder="请输入分销价格名称" style="width:240px"></el-input>
						<span class="icon-container" @click="delAdd('del',item,index)" ><i class="del-icon"></i></span>
						<span class="icon-container" @click="delAdd('add',item,index)" v-if="distribution.length-1 == index"><i class="add-icon"></i></span>
					</div>
				</li>
			</div>

			<div  class="footer" >
				<el-button @click="clickBtn('ok')" type="primary">保存</el-button>
			</div>
		</template>

		<div class="component" >
			<el-dialog :title="dialog.title" :visible.sync="dialog.show" width="500px">
				<div class="content">
					<p>
						物料是否存在多个分类 :
						<el-switch
							v-model="dialog.multiCategory"
							active-color="#34A9AA"
							inactive-color="#909399"
							active-text="开"
							inactive-text="关"
							class="switch-left"
						>
						</el-switch>						
					</p>
					<p>
						物料全码 :
						<el-select style="width:240px" v-model="dialog.wholeBarCode"   placeholder="请选择" class="switch-left">
							<el-option
								v-for="item in mCode"
								:key="item.id"
								:label="item.name"
								:value="item.id"
							>
							</el-option>
						</el-select>
					</p>
					<p>
						是否按物料编码排序 :
						<el-switch
							v-model="dialog.sortByBarCode"
							active-color="#34A9AA"
							inactive-color="#909399"
							active-text="开"
							inactive-text="关"
							class="switch-left"
						>
						</el-switch>	
					</p>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="clickDialogBtn('close')">取 消</el-button>
					<el-button @click="clickDialogBtn('confirm')" type="primary">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
/*
	接口:
		invociGetSupplier						//获取配置
		invociUpdateSupplier					//更新配置
		invoicingDelDistributionConfig			//删除分销价
		invoicingGetDistributionConfig			//获取分销价
		invoicingUpdateTopConfig				//商品物料应用
		invoicingUpdateSaleConfig				//售卖
		invoicingUpdateMaterialConfig			//物料编码配置
		updatePurchaseAuditConfig				//采购审核
		invoicingUpdateStockConfig				//入库配置
		invoicingUpdateDistributionConfig		//分销价配置更改


*/
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';

export default {
	data () {
		return {
			configList:[
				{name:'物料单位修改',status:0,attr:'updateUnit'},
				{name:'物料单位新建',status:0,attr:'createUnit'},
				{name:'物料分类修改',status:0,attr:'updateCategory'},
				{name:'物料分类新建',status:0,attr:'createCategory'},
				{name:'商品品牌修改',status:0,attr:'updateBrand'},
				{name:'商品品牌新建',status:0,attr:'createBrand'},
				{name:'物料修改',status:0,attr:'updateMaterial'},
				{name:'物料新建',status:0,attr:'createMaterial'},
				{name:'供应商修改',status:0,attr:'updateSupplier'},
				{name:'供应商新建',status:0,attr:'createSupplier'},
				{name:'BOM单修改',status:0,attr:'updateBom'},
				{name:'BOM单新建',status:0,attr:'createBom'},
			],
			config:[
				{name:'商品',id:0,attr:'isGoods',isSelect:false},
				{name:'物料',id:1,attr:'isMaterial',isSelect:false}
			],																	//商品,物料配置
			mCode:[																//物料全码														
				{id:0,name:'物料编码'},											 //默认值											
				{id:1,name:'一级分类+二级分类+物料编码'},
			],
			
			condition:{},														//
			dialog:{
				show:false,
				title:'编码配置',
				wholeBarCode:0,													//物料全码
				multiCategory:false,											//物料是否存在多个分类
				sortByBarCode:false,											//是否根据物料编码排序
			},
			distribution:[],		
			copyDistribution:[],												//备份
			ischain:0,															//店铺类型

		};
	},
	methods: {
		//底部确定按钮,只针对分销价
		async clickBtn(flag){
			let temp = {},
				distribution = [],
				res = {},
				retData = {};

			if(flag == 'ok'){
				let index = this.checkDistribution();
				if(index){
					this.alert(`请填写序号为 ${index} 的分销价格名称!`);
					return;
				}
				if(!this.checkSameValue(this.distribution)){
					this.alert('分销价格名称不能相同!');
					return;
				}
				distribution = this.getDistribution();

				if(distribution.length == 0){
					this.alert('请先填写分销价名称!');
					return;
				}


				if(!this.checkDistributionChange(distribution)){
					this.alert('保存成功!');					
					return;
				}

				
				retData = await this.getHttp('invoicingUpdateDistributionConfig',{distribution});
				if(Array.isArray(retData.distribution)){
					this.alert('保存成功!');
					this.distribution = retData.distribution;
					this.copyDistribution = utils.deepCopy(this.distribution);			
				}else{
					this.alert('保存失败!');					
				}
			}
		},
		//dialog
		async clickDialogBtn(sym){
			let subData = {};
			if(sym == 'confirm'){
				//确定
				subData = {
					multiCategory : Number(this.dialog.multiCategory),
					sortByBarCode : Number(this.dialog.sortByBarCode),
					wholeBarCode : this.dialog.wholeBarCode
				};
				await this.getHttp('invoicingUpdateMaterialConfig',subData);
				this.condition.multiCategory = this.dialog.multiCategory;
				this.condition.sortByBarCode = this.dialog.sortByBarCode;
				this.condition.wholeBarCode = this.dialog.wholeBarCode;				
			}
			this.dialog.show = false;
		},
		openDialog(){
			this.dialog.show = true;
			this.dialog.multiCategory = this.condition.multiCategory;
			this.dialog.sortByBarCode = this.condition.sortByBarCode;
			this.dialog.wholeBarCode = this.condition.wholeBarCode;
		},

		//商品物料应用
		async goodsMaterial(bool){
			let temp = this.getSelectConfig(this.config);
			let ctrl = {};
			await this.getHttp('invoicingUpdateTopConfig',temp);

			ctrl = this.getControData();
			//控制商品,物料的切换
			this.controlSideBar(ctrl);
		},

		//开关切换
		async changeSwitch(sym,bool){
			let subData = {};
			let condition = this.condition;
			let url = '';
			switch(sym){
				case 'isShelveMinus'://售卖
					subData[sym] = Number(bool);
					url = 'invoicingUpdateSaleConfig';
					break;				
				case 'purchaseAudit'://采购审核
					subData[sym] = Number(bool);
					url = 'updatePurchaseAuditConfig';
					break;
				case 'commonStock'://入库配置
				case 'importStock':
					subData['commonStock'] = Number(condition['commonStock']);
					subData['importStock'] = Number(condition['importStock']);
					url = 'invoicingUpdateStockConfig';
					break;
			}
			await this.getHttp(url,subData);
			if(sym == 'purchaseAudit'){
				let ctrl = this.getControData();
				//控制商品,物料的切换
				this.controlSideBar(ctrl);
			}
			if(sym == 'importStock' || sym == 'commonStock'){
				let ctrl = this.getControData();
				this.controlSideBar(ctrl);
				storage.session('inventConfigs',ctrl);
			}
		},


		//分销价的添加与删除
		async delDistribution(item,index){
			let retData;
			if(Number(item.id) > 0){
				retData = await this.getHttp('invoicingDelDistributionConfig',{id:item.id});
				this.copyDistribution = this.copyDistribution.filter((ele)=>{
					return ele.id != item.id;
				});
			}else{
				retData = true;
			}
			if(retData){
				this.distribution.splice(index,1);
			}
			if(this.distribution.length == 0){
				this.addDistribution();				
			}
		},
		delAdd(flag,item,index){
			if(flag == 'add'){
				if(this.distribution.length <= 9){
					this.addDistribution();
				}else{
					this.alert('最多可设置10个分销价格!');
				}
			}else{
				if(this.distribution.length == 1 && this.distribution[0].id == 0){
					this.alert('所有分销价已经删除!');
					return;
				}
				this.alert('确认删除该分销价?',(res)=>{
					if(res == 'ok'){
						this.delDistribution(item,index);
					}
				});
			}

		},
		addDistribution(){
			this.distribution.push({id:0,name:'',errorFlag:false});			
		},


		//获取商品与物料的选中状态
		getSelectConfig(list){
			let temp = {};
			for(let ele of list){
				temp[ele.attr] = Number(ele.isSelect);
			}
			return temp;
		},
		//获取填写的分销价
		getDistribution(){
			let arr = [];
			for(let ele of this.distribution){
				ele.name = ele.name.trim();
				if(ele.name){
					arr.push({id:ele.id,name:ele.name});
				}
			}
			return arr;
		},
		//获取部分当前配置的结果
		getControData(){
			let obj = this.getSelectConfig(this.config);
			let condition = this.condition;
			obj.purchaseAudit = Number(condition.purchaseAudit);
			obj.importStock = Number(condition.importStock);
			obj.commonStock = Number(condition.commonStock);

			return obj;
		},
		//控制侧边栏的显示
		controlSideBar(res){
			//控制商品,物料的切换
			let config = 0;		//1商品  2物料  0商品+物料
			let delArr = [];
			if(res.isGoods == 1&&res.isMaterial != 1){
				config = 1;
				delArr=['领料管理','BOM单管理','单位配置','物料分类'];
			}else if(res.isGoods != 1&&res.isMaterial == 1){
				config = 2;
				delArr=['称重商品配置','货架管理'];
			}
			if(res.purchaseAudit != 1){
				delArr.push('采购审核');	
			}
			this.$store.commit('setasideDel',delArr);
			storage.session('inventConfigure',config);
		},


		initData(){
			let currentShop = storage.session('userShop').currentShop;
			this.ischain = currentShop.ischain;
		},
		async initConfig(obj){
			if(!obj) obj = await this.getHttp('invociGetSupplier');

			let {isGoods,isMaterial} = obj;

			//权限
			this.configList = this.initList(this.configList,obj,'attr','status');

			//商品,物料应用
			this.config = this.initList(this.config,{isGoods,isMaterial},'attr','isSelect');

			//是否可以售卖,直接入库,导入入库,采购审核...
			this.condition = {
				isShelveMinus: obj.isShelveMinus == 1,											//开启是否超卖
				commonStock: obj.commonStock == 1,												//物料直接入库
				importStock: obj.importStock == 1,												//物料导入入库
				purchaseAudit: obj.purchaseAudit == 1,											//采购审核
				multiCategory: obj.multiCategory == 1,											//物料是否存在多个分类
				sortByBarCode: obj.sortByBarCode == 1,											//是否根据物料编码排序
				wholeBarCode: Number(obj.wholeBarCode)											//物料全码
			};

			this.dialog.multiCategory = this.condition.multiCategory;
			this.dialog.sortByBarCode = this.condition.sortByBarCode;
			this.dialog.wholeBarCode = this.condition.wholeBarCode;
		},
		async initDistribute(distribution){
			if(this.ischain != 3) return;

			if(!distribution) distribution = await this.getHttp('invoicingGetDistributionConfig');

			if(Array.isArray(distribution)){
				this.distribution  = distribution;
			}
			if(this.distribution.length == 0){
				this.addDistribution();
			}
			this.copyDistribution = utils.deepCopy(this.distribution);
		},


		//校验分销价是否变更
		checkDistributionChange(newDis){
			let oldDis = [...this.copyDistribution];

			if(newDis.length != oldDis.length){
				return true;
			}

			oldDis = this.sortList(oldDis);
			newDis = this.sortList(newDis);				

			for(let i = 0;i < oldDis.length; i += 1){
				if(oldDis[i].name != newDis[i].name){
					return true;
				}
			}
		},
		sortList(arr,attr='id'){
			let temp = arr.sort((x,y)=>{
				return x[attr] - y[attr];
			});
			return temp;
		},
		//检验是否有分销价格修改为空,返回false为不存在
		checkDistribution(){
			for(let i = 0 ;i < this.distribution.length; i += 1){
				let ele = this.distribution[i];
				ele.name = ele.name.trim();
				if(Number(ele.id) > 0 && !ele.name){
					let index = i + 1;
					index = index > 9 ? index : '0'+index;
					return index;
				}				
			}
			return false;
		},
		//检验是否重名,true表示无重名
		checkSameValue(list,attr='name'){
			let flag = true;
			for(let i = 0; i < list.length; i += 1){
				for(let j = i+1; j < list.length ;j += 1){
					if(list[i][attr] == list[j][attr]){
						return false;
					}
				}
			}
			return true;
		},
		//数组与对象匹配		
		initList(...reset){
			let [list=[],obj={},marry='attr',key='status'] = reset;
			list = list.map((ele)=>{
				for(let attr in obj){
					if(ele[marry] == attr){
						ele[key] = obj[attr] == 1;
						break;
					}
				}			
				return ele;	
			});
			return list;
		},
		alert(content,fn,title='提示信息',){
			this.$alert(content, title, {
				confirmButtonText: '确定',
				callback: action => {
					action = action == 'confirm' ? 'ok' :'cancel';
					if(typeof fn == 'function') fn(action);
				}
			});
		},
		async getHttp(url,data={}){
			let res = await http[url]({data});
			return res;
		},
	},
	async mounted(){
		this.initData();
		this.initConfig();

		this.initDistribute();
	},
};
</script>
<style lang='less' scoped>
@import url('./z_less.less');
.in-block{
	display: inline-block;
	vertical-align: middle;
}
.wcolor(@color:@wc,@size:14px){
	color:@color;
	font-size:@size;
}
p{
	margin:20px 0;
	.wcolor;
}

//提示文字
.tips-div{
	display:flex;
	flex-flow: row nowrap;
	justify-content: flex-start;
	align-items: center;
	.tips-icon{
		.whb(25px,25px);
		margin-right:5px;
		background: url('../../../res/images/handle-tips.png') center center no-repeat;		
	}
	.tips-word{
		color:#a5a5a5;
		font-size:14px;	
	}
}


//添加删除icon
.del-add{
	.whb(20px,20px,none);
	.in-block;	
}
.del-icon{
	background: url("../../../res/images/gray-del.png") right bottom no-repeat;
	.del-add;
}
.add-icon{
	background: url("../../../res/images/gray-add.png") right bottom no-repeat;
	.del-add;
}
.icon-container{
	.whb(40px,40px,none);	
	.in-block;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
}

.content{
	padding:20px 0 20px 50px;
}

//开关左边距离
.switch-left{
	margin-left:15px;
}

#invo-config{
	.head{
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		max-width: 1436px;
		span{
			height:23px;
			line-height: 23px;
			font-size: 16px; 
			border-left:2px solid @ey;
			padding-left:10px;
			padding-right:5px;
			flex-grow: 0;			
		}
		div{
			flex-grow: 1;
			border-bottom:2px dashed #ddd;
			height:13px;
		}
	}

	//配置列表
	.assign-tips{
		padding-bottom:25px;
		.wcolor(#a5a5a5,14px);
		line-height: 28px;
	}
	.config-list{
		max-width: 470px;
		margin:0;
		padding:0;
		li{
			height:40px;
			color:@wc;
			font-size:14px;
			list-style: none;
			float:left;
			span{float:right}
			&:nth-child(even){
				width:69%;
			}
			&:nth-child(odd){
				width:30%;
			}
		}
		&:after{
			.clear;
		}
	}

	.label{
		float:left;
		min-width:110px;
		text-align: right;
		line-height: 40px;
		margin-right:20px;
		.wcolor;
	}
	.label-content{
		display: inline-block;
	}
	//分销价
	.distribute-list{
		list-style: none;
		margin-bottom:20px;
		&:last-child{
			margin-bottom:0;
		}
	}

	//底部按钮
	.footer{
		padding-left:60px;
		padding-top: 30px;
	}
}
</style>