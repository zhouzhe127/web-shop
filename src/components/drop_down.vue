<!--
    **body层下拉组件，防止被遮挡
    *
    * 黄一帆
    * *
    *
-->
<template>
	<div class="drop-down">
		<div @click="showDrop" class="drop-down-btn" :class="{active:dropShow}" ref="dropBtn">
			<span :title="dropName" :style="{width:spanWidth+'px'}" class="text-ellipsis">{{dropName}}</span>
			<em><i></i></em>
		</div>
		<div class="drop-down-box text-ellipsis" :style="{width:(spanWidth+42)+'px',left:posiLeft,top:posiRight,position:'absolute'}"  ref="dropDom">
			<div class="cell" v-for="(item,index) in dropList" 
				:data-index="index" 
				:title="item.label" 
				:key="index">{{item.label}}</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import utils from 'src/verdor/utils';
	export default {
		props: [
			'list',//下来列表 一维数组 [{value:1,label:'张三'},] 
			'value',//需要默认选中的项,从0开始
			'width',//组件宽度
			'noRepeat',//禁止重复触发模式 点击当前选择项，不会触发emit抛出事件
		],
		data: function() {
			return {
				dropList: [], //分类选择
				dropName: '请选择', //分类选中
				dropShow: false, //分类下拉框显示
				selected: 1,
				spanWidth:150,//盒子宽度
				posiLeft:'',//x坐标
				posiRight:'',//y坐标
				dropDom:'',//下拉框dom
				cellDom:[],//下拉框 NodeList
			}
		},
		watch:{
			'value':'init',
			"list":"init",
		},
		mounted: function() {
			this.init();
		},
		methods: {
			//分类选择模拟框
			init(){
				this.dropList = this.list ? this.list : [];
				this.spanWidth = this.width ? (this.width-42):150;
				this.setDefault();
			},
			setDefault(){//设置默认选中
				if(this.dropList.length){
					let isValue = false,selIndex=0;
					for(let i=0;i<this.dropList.length;i++){
						let item = this.dropList[i];
						if(this.value == item.value){
							isValue = true;
							selIndex = i;
							break;
						}
					}
					if(isValue){
						this.selected = selIndex;
						this.dropName = this.dropList[selIndex].label;
					}else{
						this.dropName = this.dropList[0].label;
					}
				}
			},
			createWin(){//获取下拉组件的坐标
				let posi = utils.getDOMPosition(this.$refs.dropBtn,true);
				this.posiLeft = posi.x+1+'px';
				this.posiRight = posi.y+40+'px';
				this.dropDom = this.$refs.dropDom;
				this.$nextTick(()=>{
					document.body.appendChild(this.dropDom);
				});
			},
			showDrop() {//点击下拉框
				if(!this.dropShow){
					this.createWin();
					this.addEvent();
					this.dropShow = true;
					document.addEventListener('click',this.close);
				}else{
					this.removeEvent();
				}
			},
			addEvent() {//下拉列表绑定
				this.cellDom = this.dropDom.children;
				for(let dom of this.cellDom){
					dom.addEventListener('click',this.dropClick);
				}
			},
			dropClick(event){//下拉列表组件点击事件
				event.stopPropagation();
				var target = event.target;
				let index = parseInt(target.getAttribute("data-index"));
				if(this.noRepeat){//禁止重复触发
					if(index!=this.selected){
						this.selected = index;
						this.$emit('emit',this.dropList[index]);
					}
				}else{//重复触发
					this.selected = index;
					this.$emit('emit',this.dropList[index]);
				}
				this.dropName = this.dropList[index].label;
				this.removeEvent();
			},
			removeEvent(){//移除绑定事件
				document.body.removeChild(this.dropDom);
				for(let dom of this.cellDom){
					dom.removeEventListener('click',this.dropClick);
				}
				document.removeEventListener('click',this.close);
				this.dropShow = false;
			},
			close(event){
				var banDom = this.$refs.dropBtn.getElementsByTagName('*'),
					isBan = true;
				for(var i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					this.removeEvent();
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.drop-down{
		position: relative;display: inline-block;line-height: normal;background: #fff;
		.drop-down-btn {
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
			&.active{box-shadow: 0 0 4px #ccc;}
		}
		.drop-down-box{display: none;}
	}
</style>