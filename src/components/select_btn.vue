<template>
	<div class="select-body">
		<div @click="showSort" class="select-body-btn" ref="selectBtn">
			<span :title="sortName" :style="spanWidth" class="text-ellipsis">{{sortName}}</span>
			<em><i></i></em>
		</div>
		<ul v-show="sortSel" class="tableListUl text-ellipsis" @click="sortselShow">
			<li v-for="(item,index) in sort" :data-index="index" :title="item" :key="index" :class="{current:item==sortName}">{{item}}</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: [
			'sorts',//下来列表 一维数组 ['张三','李四','王二'] 
			'index',//需要默认选中的项,从0开始
			'width',//组件长度
			"name",
			'showIndex'
		],
		data: function() {
			return {
				sort: [], //分类选择
				sortName: '', //分类选中
				sortSel: false, //分类下拉框显示
				selected:-1,
				spanWidth:'width:150px;',//盒子宽度
			}
		},
		watch:{
			'index':'init',
			"name":"init",
			"sorts":"init",
			'selected':function(){
				this.$emit('selOn',this.selected,this.showIndex);
			},
		},
		mounted: function() {
			this.init();
		},
		methods: {
			//分类选择模拟框
			init(){
				this.sort = this.sorts ? this.sorts : [];
				this.sortName = this.index ? this.sort[this.index] :this.name?this.name: this.sort[0];
				this.spanWidth = this.width ? "width:"+ (this.width-42)+"px;" : "width:150px;";
			},
			showSort(event) {
				if(!this.sortSel){
					this.sortSel = true;
					document.addEventListener('click',this.close);
				}else{
					this.sortSel = false;
					document.removeEventListener('click',this.close);
				}
			},
			sortselShow(event) {
				event.stopPropagation();
				var target = event.target;
				if(target.tagName.toLocaleLowerCase() == 'li'){
					// if(target.className != "current"){
						var index = parseInt(target.getAttribute("data-index"));
						this.sortName = this.sort[index];
						this.selected = index;
						this.$emit('emit',this.selected);
					// }
					this.close(event);
				}
			},
			close(event){
				var banDom = this.$refs.selectBtn.getElementsByTagName('*'),
					isBan = true;
				for(var i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					this.sortSel = false;
					document.removeEventListener('click',this.close);
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.select-body{
		position: relative;display: inline-block;line-height: normal;background: #fff;
		.select-body-btn {
			vertical-align: middle;display: inline-block;border: #b3b3b3 solid 1px;overflow: hidden;cursor: pointer;
			em{width: 40px;height: 38px;float: right;text-align: center;line-height: 38px;border-left: 1px solid #ccc;
				i {height: 10px;width: 10px;display: inline-block;
					border-top: 10px solid #b3b3b3;border-left: 5px solid transparent;border-right: 5px solid transparent;box-sizing: border-box;
				}
			}
			span {
				width: 150px;height: 38px;line-height: 38px;
				text-align: center;color: #666666;float: left;
			}
		}
		ul{width: 100%;max-height: 200px;overflow: auto;overflow-x: hidden;margin: 0;position: absolute;z-index: 10;
			background: #fff;border: 1px #b3b3b3 solid;border-top: 0;
			li{width: 100%;text-align: center;height: 40px;line-height: 38px;border-bottom: 1px #b3b3b3 solid;background: #fff;cursor: pointer;
				&:hover {
					background: #f1f1f1;
				}
			}
			li:last-child{border-bottom: 0;}
		}
	}
</style>