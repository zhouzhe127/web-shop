<template>
  <div id="app" ref="app">

	  <div id= 'debug' v-show='debugDis' @click.stop="()=>{}">
		  <div>
			  <div ref='debug'></div>
		  </div>
		  <span class='but' @click= 'close'>关闭</span>
	  </div>
   	<router-view name="header"></router-view>

    <div id="content" :style ="{overflow:dis?'auto':'hidden'}" ref='content'>
    	<router-view name="content"></router-view>
   	</div>
	<broadcast></broadcast>	   
  </div>
</template>

<style lang='less'>

html,body{
	height: 100%;
}
#app{
	height: 100%;
	display:flex; 
	flex-direction:column;
/*	overflow: auto;*/
	#content{
		flex: 1;
		height: 100%;
	}
	#debug{
		position: fixed;
		top:0;
		z-index: 10;
		left:50%;
		line-height: 18px;
		background-color: aliceblue;
		&>div{
			width:250px;
			height:200px;
			overflow: auto;
			word-wrap: break-word;
		}
	}
	.but{
		    width: 50px;
			height: 20px;
			text-align: center;
			line-height: 20px;
			color: #B3B3B3;
			border: 1px solid #B3B3B3;
			cursor: pointer;
			display: inline-block;
	}
}

</style>

<script>

	import broadcast from  'src/components/global_broadcast'; //全局提示框
	import utils from  'src/verdor/utils'; //全局提示框

	let s = "";
	export default {
		data(){
			return{
			}
		},
		methods:{
			close(){
				s = "";
				this.$refs.debug.innerHTML = "";
				this.$store.commit("setDebugDis",false);
			}
		},
		components:{broadcast},
		computed:{
			dis:function(){
				return this.$store.state.contentDislpay;
			},
			debugDis:function(){
				return this.$store.state.dubgDisplay;
			},
			debugCont:function(){
				return this.$store.state.dubgCont;
			}
		},
		watch:{
			debugCont:function(str){
				if(this.debugDis&&str.length<100){
					s += utils.format(new Date(),"hh:mm:ss") + " " + str + "<br/>";
					this.$refs.debug.innerHTML = s;
				}
			}
		}
	}

</script>
