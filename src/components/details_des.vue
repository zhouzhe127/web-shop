<template>
	<section ref="detailsDes">
		<img @click="openDetial" class="detImg" src="../res/icon/orderdetial18.png"/>
		<section v-if = "type =='right'">
			<div v-show="detialShow" class="rightDetDiv" :style="newStyle">
				<i class="detI"></i> 
				<h3 class="detH3">{{title}}</h3>
			</div>
		</section>
		<section v-else>
			<div v-show="detialShow" class="detDiv" :style="newStyle">
				<i  class="detI"></i> 
				<h3 class="detH3">{{title}}</h3>
			</div>
		</section>
		
	</section>
</template>
<script type="text/javascript">
/**孔伟研
 * 点击详情组件
 * title {String} 要传的内容，必传 其他为选传，默认下 父元素相对定位
 */

	export default{
		props: {
			'title': String, //要显示的说明
			'type':String, // left和right，字符串类型
			'height':Number, //显示框的高
			'width': Number,//显示框的宽
			'left':Number,//显示框的左移
			'right':Number,//显示框的右移

        },
        watch:{
			'detialShow':function(){
				this.$emit('selOn');
			},
			
		},
        data(){
        	return{
				detialShow:false,
				listPosition:'',//根据页面宽度判断弹框的左右对其
				emPosition:'',//根据页面宽度判断箭头的左右对其
				spanWidth:250,
				spanHeight:80,
				spanLeft:0,
				spanRight:0,
        	}
		},
		mounted(){
			
			this.init()
		},
		computed:{
			newStyle:function(){
				if(this.type && this.type == "right"){
					return this.spanHeight + this.spanLeft + this.spanWidth;;
				}else{
					return this.spanHeight + this.spanRight + this.spanWidth;
				}
				
			}
		},
        methods: {
            openDetial(event){
				if(!this.detialShow){
					this.detialShow = true;
					document.addEventListener('click',this.close);
				}else{
					this.hideDrop();
				}
			},
			hideDrop(){
				this.detialShow = false;
				document.removeEventListener('click',this.close);
			},
			close(event){
				var banDom = this.$refs.detailsDes.getElementsByTagName('*'),
					isBan = true;
				for(var i=0;i<banDom.length;i++){
					if(event.target == banDom[i]) isBan = false;
				}
				if(isBan){
					this.hideDrop();
				}
			},
			init(){
				this.spanHeight = this.height ? "height:"+ (this.height)+"px;" : "height:80px;";
				this.spanWidth = this.width ? "width:"+ (this.width)+"px;" : "width:250px;";
				this.spanRight = this.right ? "right:"+ (this.right)+"px;" : "right:0;";
				this.spanLeft = this.left ? "left:"+ (this.left)+"px;" : "left:0;";
			},
			
        },
        
	}
</script>

<style lang="less">
	.detLi{position: relative;cursor: pointer;}
	.detImg{position: absolute;right: 0px;top: 15px;}
    .detDiv{width:250px;position: absolute;top:45px;right: 0;padding:10px;box-shadow: 3px 2px 10px #ccc;z-index: 9;background-color:#45404b ;}
    .detDiv .detI{width:0;height: 0;line-height: 0;position:absolute;top:-10px;right: 20px;border-width: 10px;
                        border-top:0px;border-style: solid;border-color: #E6E6E6 #E6E6E6 #45404b #E6E6E6;}
	.detDiv .detH3{height: 30px;line-height: 30px;color: #818181;text-align: left;color:#e6e6e7;}
	.rightDetDiv{width:250px;position: absolute;padding:10px;box-shadow: 3px 2px 10px #ccc;z-index: 9;background-color:#45404b ;top:6px;right: 0;}
	.rightDetDiv .detI{width:0;height: 0;line-height: 0;position:absolute;top:10px;left: -10px;border-right: 10px solid #333;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;}
	.rightDetDiv .detH3{height: 30px;line-height: 30px;color: #818181;text-align: left;color:#e6e6e7;}
</style>