<template>
	<span class="check-span" :class="{off:!onoff,on:onoff}" v-on:click="clickHandle">
	</span>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				onoff:null,
				name:null
			}
		},
		props:{
			status:null,
			names:null
		},
		methods:{
			clickHandle:function(){
				this.onoff = !this.onoff;
				this.$emit('statusChange',this.onoff,this.name);
			},
			initData(){
				this.onoff=this.status;
				this.name = this.names;
			}
		},
		mounted(){
			this.initData();
		},
		beforeUpdate(){
			this.initData();
		},
		watch:{
			status(){
				this.initData();
			}
		}
	}
</script>

<style lang='less' scoped>
.check-span {
	display: block;
	width: 88px;
	height: 40px;
	cursor: pointer;
	background: url("../res/images/off.png") no-repeat;
	transition: background-position 0.25s ease-in;
	overflow: hidden; 
}
.check-span.off {
    background-position: 0 0; 
}
.check-span.on {
    background-position: -48px 0; 
}
</style>