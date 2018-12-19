/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 11:19:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-19 09:48:38
 */
<template>  
	<div>
		<el-dialog :title="title" center :width="width" :visible.sync="winShow" @close="clickBtn('cancel')">
			<div class="dialog-content">

				<div class="pad-bottom">
					<span style="padding-right:20px;">排序</span>
					<el-input-number v-model="sortObj.num" :min="sortObj.min" :max="sortObj.max" label="描述文字"></el-input-number>
					<i class="el-icon-warning collection-tips-icon"></i>
					<span class="collection-tips-word">范围({{sortObj.min}}-{{sortObj.max}})</span>
				</div>

				<div class="pad-bottom">

					<select-collection-com :pMaterialList="pList" :selectId="collection.id"  @change="getSelectCollection" :list="collectionList"></select-collection-com>

					<div class="add-matrial add-collection" @click="openWin(winType.createCollection)">
						<i class="el-icon-plus plus" style="margin-right:10px;"></i>
						<span>新建集合</span>
					</div>
				</div>

				<!-- 展示选择的集合 -->
				<div class="textarea">
					<div v-if="collection.id">
						<p class="conllection-description">集合名称 : {{collection.name}}</p>
						<p class="conllection-description">集合类型 : {{collection.instruction}}</p>
						<p class="conllection-description">集合说明 : {{collection.typeName}}</p>
					</div>
				</div>


			</div>
			<template slot="footer">
				<div class="footer">
					<div class="footer-btn">
						<el-button type="info" @click="clickBtn('cancel')">取 消</el-button>
						<el-button @click="clickBtn('continue')" v-if="!this.pCollection">继续添加</el-button>
						<el-button @click="clickBtn('ok')" type="primary">确 定</el-button>
					</div>
				</div>
			</template>
		</el-dialog>
		
		<component
			:is="showCom"
			:show="true"
			:materialList="pList"
			:pSelects="scope"
			@change="closeWin"
		>
		</component>
	</div>
</template>

<script>
/*
	接口:
		获取集合列表:materialreportGetStatisticScopeCategoryList
		添加或更新分类统计范围:setStatisticScopeCategory	

*/
//是否是分类 0否(物料) 1是(分类)
let types = [
	{
		id:3,
		name:'物料',
	},
	{
		id:4,
		name:'单位-物料集合',
	},
	{
		id:5,
		name:'供应商-物料集合',
	},
	{
		id:6,
		name:'物料-供应商集合',
	},
];
let winType = {
	createCollection : 'createCollectionCom'               //新建集合
};
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data () {
		return {     
			winShow:    true,                   
			winType: winType,                   //弹窗名

			showCom:'',                         //当前展示的弹窗

			collectionList:[],                  //集合列表       


			sortObj:{},                         //排序值,
			scope:[],                           //物料范围
			
			collection:{},                     //选择的集合
		};
	},
	props:{
		//排序值对象
		pSortObj:{
			type:[Object],
			default:function(){
				return {
					min:0,
					max:1,
					num:1
				};
			}
		},
		//选择的集合id
		pCollection:{
			type:[Number,String],
			default:''
		},
		//物料列表
		pList:{
			type:[Array],
			default:function(){
				return [];
			}
		},
		//弹窗标题
		title:{
			type:[String],
			default:'添加行',
		},
		//弹窗的宽
		width:{
			type:[String],
			default:'700px'
		},
	},
	methods: {
		clickBtn(sym){
			let obj = {
				pSortObj : this.sortObj,
				pCollection : this.collection,
			};
			switch(sym){
				case 'continue':
					obj['continue'] = true;
					this.throwData( utils.deepCopy(obj));  
					this.sortObj.max += 1;
					this.sortObj.num += 1;
					this.collection = {};
					break;				
				case 'ok':
					this.throwData( utils.deepCopy(obj));  
					break;
				default:
					this.throwData(false);
				
			}
		},

		//关闭弹窗
		async closeWin(obj){
			if(!obj){
				this.showCom = '';
				return;
			}
			switch(this.showCom){
				case winType.createCollection:  //新建集合,抛出新建的集合
					if(!obj.continue){
						this.showCom = '';
					}
					delete obj.continue;
					this.initCollection([obj]);
					this.collectionList.push(obj);
					this.getSelectCollection(obj);
					break;
			}
		},
		//获取选择的集合
		getSelectCollection(row){
			if(row){
				this.collection = row;
			}
		},


		initDataByProps(){
			this.initSortObj();
			Object.assign(this.sortObj, utils.deepCopy(this.pSortObj));  

			this.collection = this.getEle(this.collectionList,'id',this.pCollection);		    
			if(!this.collection) this.collection = {};
		},




		//获取集合列表,选中的集合对象
		async getCollectionList(){
			let retData = await this.getHttp('materialreportGetStatisticScopeCategoryList');
			let collectionList = retData.list;

			if(!Array.isArray(collectionList)){
				collectionList = [];			
			}
			this.initCollection(collectionList);
			return collectionList;	
		},
		initCollection(list){
			for(let ele of list){
				let obj = this.getEle(types,'id',ele.type);
				if(obj){
					ele.typeName = obj.name;
					ele.instruction = this.getExplain(ele,this.pList);
				}
			}
		},
		//获取集合说明
		getExplain(data,list){//生成说明
			let str = '';
			let text = '';
			if(data.type!=6)str = data.isCategory==0?`物料数量：${data.mid.length}`:`物料分类数量：${data.cid.length}`;
			switch(data.type){
				// case 3:
				// 	str = data.isCategory==0?`物料数量：${data.mid.length}`:`物料分类数量：${data.cid.length}`
				// 	break;
				case 4:
					text = `物料单位：${data.unit.name}；`;
					str = text+str;
					break;
				case 5:
					text = `供应商数量：${data.supplierName.split(',').length}；`;
					str = text+str;
					break;
				case 6:
					str = `物料名称：${this.getMateralName(data.mid,list).name}；供应商数量：${data.supplierName.split(',').length}`;
					break;		
			}
			return str;
		},
		getMateralName(id,list){
			let sele = '';
			for(let item of list){
				if(id == item.id){
					sele = item;
					break;
				}
			}
			return sele;
		},




		initSortObj(){
			this.sortObj = {
				min:1,
				max:10,
				num:1
			};
		},
		//打开弹窗
		openWin(sym){
			this.showCom = sym;
		},
		throwData(data){
			this.$emit('change',data);
		},
		async getHttp(url,obj={},err=false){
			let res = await http[url]({data:obj},err);
			return res;
		},
		getEle(list,attr,val){
			for(let ele of list){
				if(ele[attr] == val){
					return ele;
				}
			}
		},
	},
	async mounted(){
		this.collectionList = await this.getCollectionList();
		this.initDataByProps();
	},
	watch:{
		'pSortObj':function(){
			this.initDataByProps();
		},
		'pCollection':function(){
			this.initDataByProps();
		}
	},
	components:{
		selectCollectionCom:() => import(/* webpackChunkName:"select_collection"*/'./select_collection'),
		createCollectionCom:()=>import( /*webpackChunkName: 'creat_gather_win'*/ 'src/module/invoicing_system/data_center/creat_templatelist/creat_gather_win.vue'), //新建集合
	}
};
</script>

<style lang='less' scoped>
	@bc:#EAEEF5;
	.wh(@w:140px,@h:40px){
		width:@w;
		height:@h;
	}
	.footer{
		display:flex;
		justify-content: flex-end;
		.footer-page{
			display: flex;
			align-items: center;
			.select-num{
				color:#E1BB4A;
			}
		}
	}
	.dialog-content{
		border-top:1px solid @bc;
		border-bottom:2px solid @bc;
		padding-top:20px;
		height: 374px;
	}
	.conllection-description{
		padding-top:10px;
		font-size:14px;
	}
	.collection-tips-icon{
		color: #ccc;
		font-size:14px;
		margin-left:5px;
	}
	.collection-tips-word{
		color: #909399;
		font-size:14px;
	}
	.textarea{
		height:120px;
		padding:10px;
		border:1px solid #EAEEF5;
		word-break: break-all;
		border-radius: 5px;
	}

	.add-matrial{
		.wh;
		border:1px solid @bc;
		border-radius: 5px;
		padding:10px;
		vertical-align: bottom;
		cursor: pointer;

		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		.plus{
			font-size:22px;
		}
	}

	.add-collection{
		background-color: #E1BB4A;
		color:#fff;
		justify-content: center;
	}

	


	.pad-bottom{
		padding-bottom:20px;
	}

</style>