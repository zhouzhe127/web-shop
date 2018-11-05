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
					<el-input placeholder="输入名称" class="inp-class"></el-input>
				</div>
			</div>
			<div class="inp-block">
				<span class="inp-name">排序</span>
				<div class="right">
					<el-input-number v-model="sort" :min="0" class="inp-class"></el-input-number>
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
							<el-radio-group v-model="columnTabIndex">
								<el-radio-button label="0">标准项</el-radio-button>
								<el-radio-button label="1">公式项</el-radio-button>
								<el-radio-button label="2">表列项</el-radio-button>
							</el-radio-group>
							<div class="radio-container" v-show="columnTabIndex==0">
								<div class="radio-box" v-for="i in 30" :key="i">
									<el-radio v-model="columnItem" :label="'标准项'+i" border >标准项</el-radio>
								</div>
							</div>
							<div class="radio-container" v-show="columnTabIndex==1">
								<div class="radio-box" v-for="i in 20" :key="i">
									<el-radio v-model="columnItem" :label="'公式项'+i" border >公式项</el-radio>
								</div>
							</div>
							<div class="radio-container" v-show="columnTabIndex==2">
								<div class="radio-box" v-for="i in 20" :key="i">
									<el-radio v-model="columnItem" :label="'列表项'+i" border >列表项</el-radio>
								</div>
							</div>
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
					<p>是滴是滴所是滴是滴所是滴是滴所是滴是滴所是滴</p>
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
			<add-formula v-if="showFormula" @emit="getFormula"></add-formula>
		</div>
	</win>
</template>
<script>
//该组件直接在组件内容调用接口，请求仓库数据
import http from 'src/manager/http';

export default {
	data() {
		return {
			title: '添加列',
			btnOk: {
				content: '确定'
			},
			btnCancel: {},
			sort:0,//排序
			columnTabIndex:0,
			columnItem:'',//选择项
			visible:false,//选择列表项是否显示

			showCom:false,//显示选择仓库弹窗
			comObj:{//仓库弹窗传入数据
				isMultiple:true,
			},
			wareList:[],//选中的仓库列表
			storeList:[],//已选中的店铺列表
			wareName:'',
			storeName:'',

			showFormula:true,
		};
	},
	props: {
		pObj: null,
		//
	},
	watch:{
		'columnItem':'radioChange',
	},
	mounted() {
		this.initData();
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
				if(this.isArea && !this.areaId){
					this.$message({message: '请选择区域！',type: 'error'});
					return;
				}
				this.$emit('throwWin', res, this.wareObj);
			} else {
				this.$emit('throwWin', res);
			}
		},
		initData(){
			//
		},
		//新建公式项
		async addColumn(){
			let data = await http.getShopList();
			if(data){
				//
			}
		},
		//获取公式信息
		getFormula(res){
			console.log(res);
			this.showFormula = false;
		},
		radioChange(){
			this.visible = false;
			//this.columnItem;
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
					let obj={};
					if(item.owner.split(',')[1]=='0'){
						obj.id = item.brandId;
						obj.name = item.brandName;
					}else{
						obj.id = item.shopId;
						obj.name = item.shopName;
					}
					storeList.push(obj);
				}
				this.storeList = storeList;
				this.selContent();
			}
			this.showCom = false;
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
			.right{float: left;padding-left: 10px;}
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