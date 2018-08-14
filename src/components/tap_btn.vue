<template>
	<div class="tab">
	    <span  v-for="(item,i) in list" :key="i" v-bind:class="{on:callOut == i}" v-on:click="clickHandle(i)" >{{getValue(item)}}</span>
	    <div style="clear: both;font-size:0; line-height: 0;"></div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['list','index','name'],
		data(){
			return{
				callOut:0
			}
		},
		methods:{
			getValue: function(item) {
                if(this.name) {
                    return item[this.name];
                } else {
                    return item;
                }
            },
            clickHandle: function(i) {
                this.callOut = i;
                this.$emit('status',this.callOut);
            }
		},
		mounted:function(){
			this.callOut = this.index;
		}
	}
</script>
<style lang="less">
	.tab{
		width: 100%;
	    height: auto;
	    margin-bottom: 3px;
	    overflow: hidden;
	    span{
	    	float: left;
		    font-size: 14px;
		    text-align: center;
		    color: #999999;
		    padding: 0 20px;
		    height: 40px;
		    line-height: 40px;
		    cursor: pointer;
		    position: relative;
		    background-color: #f2f2f2;
		    border-right: 1px solid #fff;
		    border-bottom: 1px solid #fff;
	    }
	}
</style>