<!--
     
	进销存配置 - 百川 - 曾伟福
-->
<template>
	<div id = "invo-config">
		<div class="head">进销存权限</div>

		<div class="content">
			<div class="assign-tips">
				<span class="tips-icon"></span>
				进销存权限统一由品牌指派,如有权限需求请联系品牌权限管理人员
			</div>
			<ul class="config-list">
				<li v-for="(item,index) in configList" :key="index">
					<span>{{item.name}}&nbsp;:&nbsp;{{item.status == 0 ? '关' : '开'}}</span>
				</li>
			</ul>
		</div>

		<div class="head-short">是否启用配置</div>
		<div class="config-switch">
			<span class="label">商品&nbsp;,&nbsp;物料应用</span>
			<div class="mul-sel">
				<span class="list" :class="{'checkbox':item.isSelect}" @click="chooseList(item,index)" v-for="(item,index) in config" :key="index">{{item.name}}</span>
			</div>
		</div>


		<div class="head-short">是否可以售卖</div>
		<div class="sale-switch">
			货架商品不足时
			<span class="on-off">
				<on-off @statusChange="getOnOff" :status="saleSwitch"></on-off>
			</span>
			<div class="sale">
				<span class="tips-icon"></span>
				<span class="tips-word">开关开启时,销售后货架商品数量可以为负数,下次上架后补充完整</span>
			</div>
		</div>


		<div class="head-short" v-if="isBrand">分销价格名称</div>
		<div class="sale-switch" style="padding-left:0;height:auto;padding-bottom:30px;" v-if="isBrand">

			<li class="list" v-for="(item,index) in distribution" :key="index">
				<div class="label">
					<span class="index">{{index > 8 ? index+1 : '0'+(index+1)}}</span>
					<span >分销价格名称</span>
				</div>
				<div class="label-tag">
					<input type="text" class="price" placeholder="请输入分销价格名称" maxlength="10" v-model="item.name" :class="{'error-flag':item.errorFlag}">
					<span class="icon-container" @click="delAdd('del',item,index)" ><i class="del-icon"></i></span>
					<span class="icon-container" @click="delAdd('add',item,index)" v-if="distribution.length-1 == index"><i class="add-icon"></i></span>
				</div>
			</li>
		</div>

		<div class="bottom">
			<div class="gray btn-com" @click="clickBtn('cancel')">取消</div>
			<div class="yellow btn-com"  @click="clickBtn('ok')">确定</div>
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

	问题:
		不是只有品牌才可以设置分销价配置的吗

*/
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
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
			config:[{name:'商品',id:0,attr:'isGoods'},{name:'物料',id:1,attr:'isMaterial'}],	//商品,物料配置
			saleSwitch:false,																	//开启是否超卖
			distribution:[],		
			isBrand:false,														

		};
	},
	methods: {
		chooseList(item,index){
			item.isSelect = !item.isSelect;
			this.config.splice(index,1,item);
		},
		getOnOff(res){
			this.saleSwitch = res;
		},
		getSelectConfig(list){
			//获取选中的商品与物料状态
			let temp = {};
			for(let ele of list){
				temp[ele.attr] = Number(ele.isSelect);
			}
			return temp;
		},
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
		checkDistribution(){
			let flag = true;
			this.distribution = this.distribution.map((ele)=>{
				ele.name = ele.name.trim();
				if(Number(ele.id)>0 && !ele.name){
					ele.errorFlag = true;
					flag = false;
				}else{
					ele.errorFlag = false;
				}
				return ele;
			});
			return flag;
		},
		checkDistributionSameName(){
			let flag = true;
			for(let i=0;i<this.distribution.length;i++){
				for(let j=i+1;j<this.distribution.length;j++){
					if(this.distribution[i].name == this.distribution[j].name){
						flag = false;
						break;
					}
				}
			}
			return flag;
		},
		async clickBtn(flag){
			let temp = {},
				distribution = [],
				res = {};
			if(flag == 'ok'){
				if(!this.checkDistribution()){
					this.alert('请填写需要修改的分销价格名称!');
					return;
				}
				if(!this.checkDistributionSameName()){
					this.alert('分销价格名称不能相同!');
					return;
				}
				temp = this.getSelectConfig(this.config);
				temp.isShelveMinus = Number(this.saleSwitch);
				temp.distribution = this.getDistribution();

				res = await this.getHttp('invociUpdateSupplier',temp);
				this.alert('保存成功!');
				if(Array.isArray(res.distribution)){
					this.distribution = res.distribution;
				}


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
				this.$store.commit('setasideDel',delArr);
				storage.session('inventConfigure',config);

			}else if(flag == 'cancel'){
				this.$router.go(-1);
			}
		},
		async delDistribution(item,index){
			let retData;
			if(Number(item.id) > 0){
				retData = await this.getHttp('invoicingDelDistributionConfig',{id:item.id});
			}else{
				retData = true;
			}
			if(retData){
				this.distribution.splice(index,1);
			}
			if(this.distribution.length == 0){
				this.distribution.push({id:0,name:''});
			}
		},
		delAdd(flag,item,index){
			if(flag == 'add'){
				if(this.distribution.length <= 9){
					this.distribution.push({id:0,name:''});
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
		alert(content,fn){
			let obj = {
				title:'温馨提示',
				content,
				winType:'alert',
			};

			if(typeof fn == 'function'){
				obj.winType = 'confirm';
				obj.callback = fn;
			}

			this.$store.commit('setWin',obj);
		},
		async getHttp(url,data={}){
			let res = await http[url]({data});
			return res;
		},
		initList(...reset){
			//数组与对象匹配
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
		initData(){
			let currentShop = storage.session('userShop').currentShop;
			this.isBrand = currentShop.ischain == 3;
		}
	},
	async mounted(){
		this.initData();
		let obj = await this.getHttp('invociGetSupplier');
		let {isGoods,isMaterial,isShelveMinus} = obj;
		let distribution = [];
		this.configList = this.initList(this.configList,obj,'attr','status');
		this.config = this.initList(this.config,{isGoods,isMaterial},'attr','isSelect');
		this.saleSwitch = isShelveMinus == 1;


		distribution = await this.getHttp('invoicingGetDistributionConfig');
		if(Array.isArray(distribution)){
			this.distribution = distribution;
		}
		if(this.distribution.length == 0){
			this.distribution.push({id:0,name:''});
		}
	},
	components: {
		onOff:()=>import(/*webpackChunkName:'on_off'*/'src/components/on_off'),
		mulSel:()=>import(/*webpackChunkName:'mul_select'*/'src/components/mul_select'),
	},
};
</script>
<style lang='less' scoped>
@import url('./z_less.less');
.tips-icon{
	.whb(25px,25px);
	float:left;
	margin-right:5px;
	background: url('../../../res/images/handle-tips.png') center center no-repeat;
}
.in-block{
	display: inline-block;
	vertical-align: middle;
}
.tips-word{
	color:#a5a5a5;
	font-size:14px;	
}


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
.error-flag{
	border:1px solid #ff3d04;
	box-shadow: 0 0 5px 0 #ff3d04;
}


.icon-container{
	.whb(40px,40px,none);	
	.in-block;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
}
#invo-config{
	.head{
		.split-div(80%);
	}
	.head-short{
		.split-div(50%);
	}
	.content{
		padding-top:22px;
		.assign-tips{
			padding-left:25px;
			padding-bottom:25px;
			color:#a5a5a5;
			font-size:14px;
			line-height: 28px;
		}
		.config-list{
			max-width: 470px;
			margin:0;
			padding:0;
			li{
				height:60px;
				color:#333;
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
	}
	.config-switch{
		padding-left:30px;
		padding-top:25px;
		height:100px;
		.label{
			vertical-align: middle;
			margin-right:20px;
		}
		.mul-sel{
			.list{
				min-width: 100px;
				height: 40px;
				line-height: 38px;
				border:1px solid #ccc;
				padding: 0 15px;
				text-align: center;
				vertical-align: middle;
				display: inline-block;
				margin-right:7px;
				cursor: pointer;
				user-select: none;
			}
			.radio{
				border:1px solid @y;
				color:@y;
			}
			.checkbox{
				background: url("../../../res/images/sign.png") right bottom no-repeat;
				.radio;
			}
			display:inline-block;
			vertical-align: middle;

		}
	}
	.sale-switch{
		height:100px;
		padding-left:30px;
		padding-top:25px;	
		line-height: 40px;
		.on-off{
			display: inline-block;
			vertical-align: middle;
			margin-left:20px;
			margin-right: 20px;
		}
		.sale{
			display: inline-block;
			line-height:28px;
		}	
		.list{
			list-style: none;
			margin-bottom:20px;
			&:last-child{
				margin-bottom:0;
			}
			.label{
				float:left;
				width:150px;
				text-align: right;
				line-height: 42px;
				padding-right:15px;
			}
			.label-tag{
				.in-block;
				.price{
					.whb(210px,38px,1px solid #ccc);
					padding-left:10px;
					outline: none;
					margin-right:20px;
				}
			}

		}
	}	
	.bottom{	
		padding-top:20px;
		padding-left:153px;
        .btn-com{
            .btn(200px,50px,16px,#fff);
        }
	}
}
</style>