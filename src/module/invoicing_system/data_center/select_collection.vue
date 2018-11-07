/*
 * @Author: weifu.zeng 
 * @Date: 2018-11-02 16:33:33 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-06 17:47:12
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
			<el-table-column  min-width="200px"  label="集合名称" prop="name">
			</el-table-column>

			<el-table-column  min-width="100px"  label="物料数量">
				<template slot-scope="{row,column}">
					{{row.mid.length}}
				</template>
			</el-table-column>

			<el-table-column  min-width="100px"  label="单位" prop="unitName">
				<template slot-scope="{row,column}">
					{{row.unit ? row.unit.name : '--'}}
				</template>
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
*/
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
	},
	methods: {
		handleCurrentChange(row) {
			this.currentRow = row;
			this.$emit('change',row);
			this.show = false;
		},
		initProps(){
			this.tableData = this.list;

			for(let ele of this.tableData){
				if(ele.id == this.selectId){
					this.$refs.singleTable.setCurrentRow(ele);
					break;
				}
			}
		}
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