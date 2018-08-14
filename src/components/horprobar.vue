<template>
	<div class="HorProBar">
	    <div v-for="(item,i) in list" :key="i" class="oneGroup">
	        <div class='group'><span>{{item.name}}</span><div class='right'><span>¥{{item.money}}</span><span>{{count(item.money,list,i)}}</span></div></div>
	        <div class='barGroup'><div class='barBG'></div><div :class='{bar:1,DAFF:true,DAFF:i==0,FFA:i==1,FFD:i==2,unfull:countWidthStyle().unFull}' :style='{width:showWid()}' ></div></div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	var d = {
            totalNum:0,
            perCent:0,
            w:"0",
            length:0
        };
    export default{
    	props:['list'],
    	data(){
	    	return{

	    	}
    	},
    	methods:{
    		showWid:function(){
                return d.w;
            },
            countWidthStyle:function(){
                // if(!d.totalNum) return {unFull:"true",w:"0px"}
                var barWid = 300;
                var w = 300 * d.perCent/100;
                d.w = w+"px";
                return {unFull:w>299?false:true,w:w+"px"}
                
            },
            count:function(num,list,index){
                var totalNum = this.countNum(list);
                if(!totalNum)
                    return "0%";
                d.perCent = (num/totalNum)*100;
                d[index] = d.perCent;

                var lastNum = null;
                
                if(index === list.length-1 && index>0){
                    var num = [].slice.call(d).reduce(function(prev,next){return Number(prev)+Number(next)});
                    lastNum = 100 - num;
                }else{
                	lastNum =  d.perCent;
                }
                ++(d.length);
                if(d.length>2) d.length = 0;
                return (lastNum>0?lastNum:d.perCent).toFixed(2) + "%";
            },
            countNum:function(list){
            	if(list.length>1){
	                var num = (list.reduce(function(prev,next){
	                    return {money:Number(prev.money) + Number(next.money)};
	                })).money;
	                d.totalNum = num;
	                return num;
	            }else{
	                return list[0].money;
	            }
            }
    	},
    	mounted:function(){
    		console.log(this.list)
    		d.length = d.totalNum = d.perCent = d.w = 0;
    	},
    	watch:{
            list:function(){
                d.length = d.totalNum = d.perCent = d.w = 0;
            }
        }
    	
    }    
</script>
<style lang="less">
	.HorProBar {
    width:300px;
    .oneGroup{
        margin: 10px 0 10px 0;
    }
    .group{
        margin-bottom: 10px;
    }
    .right{
        float: right;
        span:nth-child(2){
            margin-left: 15px;
        }
    }
    .bar{
        width:300px;
        height:14px;
        border-radius: 7px;
        position: relative;
        top:-14px;
    }
    .barBG{
        width:300px;
        height:14px;
        background-color: #F7F7F7;
        border-radius: 7px;
        
    }
    .DAFF{
        background-color: #86DAFF;
    }
    .FFA{
        background-color: #FFA983;
    }
    .FFD{
        background-color: #FFD76F;
    }
    .unfull{
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
    }
}
</style>