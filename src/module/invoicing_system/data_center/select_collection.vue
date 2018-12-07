/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 16:33:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-07 16:11:15
 * @file:选择集合下拉框
 */
<template>
	<el-popover placement="bottom" width="570" v-model="show"  trigger="click" ref="popover">
		<el-table 
			ref="singleTable"
			:data="tableData"  
			border 
			highlight-current-row
			:header-cell-style="{'background-color':'#F5F7FA'}"
			:row-style="{'cursor':'pointer'}"
			width="518px"
			height="240px"
			@current-change="handleCurrentChange"
		>
			<el-table-column  min-width="100px"  label="集合名称" prop="name">
			</el-table-column>

			<el-table-column  min-width="100px"  label="集合类型" prop="typeName">
			</el-table-column>

			<el-table-column  min-width="100px"  label="说明" prop="instruction">
			</el-table-column>

		</el-table>

		<div class="add-matrial" slot="reference">
			<span>选择集合</span>
			<i class="el-icon-caret-bottom plus"></i>
		</div>
	</el-popover>

</template>

<script>
/*
	组件:
		抛出事件:   this.$emit('change',Object)
		获取物料详情:MaterialGetMaterialDetail
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
export default {
	data () {
		return {
			tableData:[],                       //表格数据
			show:false,                         //是否显示弹出层
			currentRow:{},
		};
	},
	props:{
		//展示的列表
		list:{
			type:[Array],
			default:function(){return []}
		},
		//选中的列表id
		selectId:{
			type:[String,Number],
			default:'',
		},
		pMaterialList:{
			type:[Array],
			default:function(){return []}		
		}
	},
	methods: {
		handleCurrentChange(row) {
			this.currentRow = row;
			this.$emit('change',row);
			this.show = false;
		},
		initProps(){
			this.initTableData(this.list);
			
			this.tableData = [...this.list];
			this.materialList = [...this.pMaterialList];
		
			for(let ele of this.tableData){
				if(ele.id == this.selectId){
					this.$refs.singleTable.setCurrentRow(ele);
					break;
				}
			}
		},
		initTableData(list){
			for(let ele of list){
				let obj = this.getEle(types,'id',ele.type);
				if(obj){
					ele.typeName = obj.name;
					ele.instruction = this.getExplain(ele);
				}
			}
		},



		
		getExplain(data){//生成说明
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
					text = `供应商数量：${data.supplier.split(',').length}；`;
					str = text+str;
					break;
				case 6:
					str = `物料名称：${this.getMateralName(data.mid).name}；供应商数量：${data.supplier.split(',').length}`;
					break;		
			}
			return str;
		},
		getMateralName(id){
			let sele = '';
			for(let item of this.materialList){
				if(id == item.id){
					sele = item;
					break;
				}
			}
			return sele;
		},
		getEle(list,attr,val){
			for(let ele of list){
				if(ele[attr] == val){
					return ele;
				}
			}
		},
	},
	mounted(){
		this.initProps();
	},
	watch:{
		list:function(){
			this.initProps();
		},
		selectId:function(){
			this.initProps();
		}
	}
};
</script>
<style lang='less' scoped>
	@bc:#EAEEF5;
	.wh(@w:140px,@h:40px){
		width:@w;
		height:@h;
	}
	.add-matrial{
		.wh;
		border:1px solid @bc;
		border-radius: 5px;

		display: inline-flex;
		justify-content: space-between;
		align-items: center;
		padding:10px;
		cursor: pointer;
		.plus{
			font-size:18px;
			color:#909399;
		}
	}
</style>