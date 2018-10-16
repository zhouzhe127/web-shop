<!--
    @file:新建分类
    @baichuan:曾伟福

-->
<template>
	<div>
		<win @winEvent="closeSelfWin" :align="'center'" :width="580" :height="300">
			<span slot="title">{{title}}</span>
			<div slot="content" v-cloak class="container">
				<div class="content">
					<div>
						<span class="label"> 分类名 : </span>  
						<el-input class="input" v-model="categoryName" maxlength="20" style="width:240px;" placeholder="请输入分类名" ></el-input>
					</div>
					<div class="label-top">
						<span class="label">分类编码 :</span>
						<el-input class="input" v-model="barCode" maxlength="4" style="width:240px;" placeholder="请输入分类编码" ></el-input>						
					</div>
					<div class="label-top">
						<span class="label">排序 :</span>
						<el-input-number v-model="sort" :min="1" :max="255" label="排序" style="margin-left:10px;"></el-input-number>
					</div>
				</div>
			</div>
		</win>
	</div>
</template>
<script>
import global from 'src/manager/global';
export default {
	data() {
		return {
			title: '', //弹窗的标题
			sort: '', //排序值
			categoryName: '', //分类名
			barCode:'',
		};
	},
	props: {
		pObj: null, //传递的数据
		/*
		    pObj:
		        {
		            categoryName:           分类名
		            sort:                   排序值
					title:                  标题
					barCode:				分类编码
		        }
		*/
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			if(typeof this.pObj == 'object') {
				for(let attr in this.pObj) {
					this[attr] = this.pObj[attr];
				}
			}
		},
		//合格返回true
		checkForm() {
			this.categoryName = this.categoryName.trim();
			if(!global.checkData({
				categoryName: {
					cond: `$$.length>0 && $$.length<=20 && ((/^[^',;,;"&$?\\s!]+$/).test($$))`,
					pro: '请输入分类名,且不能含有特殊字符!'
				},
				sort: {
					reg: /^[1-9]\d{0,2}$/,
					pro: '排序数字在0-256之间!'
				},
				barCode:{
					reg:/^[0-9A-Za-z]{1,4}$/,
					pro:'分类编码由1-4个大写字母,数字组成!'
				}
			}, this)) return false;
			return true;
		},
		

		//获取弹窗的点击结果
		closeSelfWin(res) {
			if(res == 'ok') {
				if(!this.checkForm()) return;
				this.barCode += '';
				this.barCode = this.barCode.toUpperCase();
				
				let obj = {
					categoryName: this.categoryName,
					sort: this.sort,
					barCode: this.barCode
				};
				this.$emit('throwCommonWin', res, obj);
			} else {
				this.$emit('throwCommonWin', res);
			}
		},

	},
	components: {
		win: () =>
			import( /*webpackChunkName:'win_element'*/ 'src/components/win_element')
	},

};
</script>
<style lang='less' scoped>
.container{
	position: relative;
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;	
}
.content{
	.label{
		display: inline-block;
		min-width: 60px;
		text-align: right;
		height:40px;
		line-height: 40px;
	}
	.label-top{
		margin-top:20px;
	}
}
</style>