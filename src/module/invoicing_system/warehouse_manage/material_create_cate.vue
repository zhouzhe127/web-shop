<!--
    @file:新建分类
    @baichuan:曾伟福

-->
<template>
	<div>
		<win @winEvent="closeSelfWin" :align="'center'" :width="650" :height="500">
			<span slot="title">{{title}}</span>
			<div slot="content" v-cloak class="container">
				<div class="cate-sel">
					<div class="block" v-for="item in category" :key="item.id">
						<template v-if="item.child.length">
							<div class="one-cate" @click="banSel">{{item.name}}</div>
						</template>
						<template v-else>
							<el-radio v-model="id" :label="item.id" border>{{item.name}}</el-radio>
						</template>
						<div class="child">
							<span class="cell" v-for="cell in item.child" :key="cell.id">
								<el-radio v-model="id" :label="cell.id" border>{{cell.name}}</el-radio>
							</span>
						</div>
					</div>
				</div>
			</div>
		</win>
	</div>
</template>
<script>
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: '选择分类', //弹窗的标题
			id:0,
			category:[],//组合过的分类列表
			list:[],//原列表
			name:'',//选中的分类名称
		};
	},
	props: {
		pObj: null, //传递的数据
		/*
		    pObj:
		        {
		            id:				//已选中的分类id
		        }
		*/
	},
	watch:{
		'id':'setCateName'
	},
	mounted() {
		this.MaterialGetCategoryList();
	},
	methods: {
		//获取分类列表
		async MaterialGetCategoryList() {
			let res = await http.MaterialGetCategoryList();
			this.list = res;
			let temp = [];

			if(!Array.isArray(res)) res = [];
			temp = [...res];
			res.forEach((ele) => {
				ele.child = [];
				if(ele.pid == 0) {
					for(let i = 0, len = temp.length; i < len; i++) {
						if(ele.id == temp[i].pid && ele.id != temp[i].id) {
							ele.child.push(temp[i]);
						}
					}
					this.category.push(ele);
				}
			});
			this.initData();
		},
		//提示
		banSel(){
			this.$message({message: '已存在二级分类，无法选择一级分类',type: 'error'});
		},
		initData() {
			if(typeof this.pObj == 'object') {
				for(let attr in this.pObj) {
					this[attr] = this.pObj[attr];
				}
			}
		},
		setCateName(){
			if(this.id){
				this.name = this.list.filter((res)=>{
					return res.id == this.id;
				})[0].name;
			}
		},
		closeSelfWin(res){
			let obj={
				id:this.id,
				name:this.name,
			};
			this.$emit('throwCommonWin', obj, res);
		},
	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element')
	},

};
</script>
<style lang='less' scoped>
.cate-sel{
	height: 500px;
	overflow: auto;
	.block{
		padding: 10px 20px;padding-bottom: 0;
		.one-cate{
			height: 20px;padding: 0 15px;color: #666;
			margin: 10px 0;
			line-height: 20px;
			border-left: 3px solid #E1BB4A;
			cursor: not-allowed;
			display: inline-block;
		}
		.child{
			padding-top: 10px;
			.cell{
				margin-right: 10px;margin-bottom: 10px;display: inline-block;
			}
		}
	}
}
</style>