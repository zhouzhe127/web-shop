<template>
	<div class="selectbtns">
		<span v-for="(item,i) in ownList" ref='btnList' :style="styles" :key="i"  v-on:click="clickHandle(i,$event)" :title="item.name">{{getValue(item)}}</span>
	</div>
</template>
<script type="text/javascript">

	/**
	 * 单选按钮组组件
	 * list {Array} 需要展示的按钮列表数据
	 * index {Number} 被选中的索引
	 * name {String} 如果list数据是Object集合，则name则是Object的键名，该键值就是按钮的名称；如果list就是按钮名称集合，则name不要设置。
	 * styles {Object} 设置选择框的样式
	 */

	let lastDom = null;
	let list = [];
	export default {
		props: ['list', 'index', 'name', 'keys', 'isradio', 'unlist','styles'],
		data() {
			return{
				onIndex:0,
				ownList:[]
			}
		},
		watch:{
			
			onSelects:function(){
				this.$emit('selOn',this.onIndex);
			}
			
		},
		methods: {
			getValue: function(item) {
				if(this.name) {
					return item[this.name];
				} else {
					return item;
				}
			},
			clickHandle: function(i, e) {
				if(lastDom === e.target) return;
				lastDom.className = '';
				e.target.className = 'sign';
				lastDom = e.target;

				this.$emit('selOn',i);
			},
			isSelected: function(i, item) {
				if(i == this.onIndex) return true;
				return false;
			},
			changeView(){
				this.onIndex = this.index;
				this.ownList =this.list;
				if(lastDom) lastDom.className = '';
				this.$nextTick(()=>{
					list = this.$refs.btnList;
					if(list.length && this.onIndex != undefined){
						lastDom = list[this.onIndex];
						lastDom.className = 'sign';
					}
					
				})
			}
		},
		mounted:function(){
			this.changeView();
			//生命周期问题 导致onSelects不会每次都初始化，导致记住了先前选中的值
		},
		beforeUpdate:function(){
			this.changeView();
		}
	}
</script>
<style lang="less" scoped>
	.selectbtns {
		width: auto;
		height: auto;
		overflow: hidden;
	}
	
	.selectbtns span {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding-left: 18px;
		padding-right: 18px;
		background-color: #FFFFFF;
		text-align: center;
		cursor: pointer;
		margin: 1px;
		max-width: 350px;
		word-wrap:break-word;
		white-space:nowrap;
		overflow:hidden; 
		text-overflow:ellipsis;
		vertical-align: middle;
		border: 1px solid #ccc;
	}
	.sign {
		background: #fff3e5!important;
		border: 1px solid #f8931f!important;
		color: #f9911e!important;
  	}
</style>