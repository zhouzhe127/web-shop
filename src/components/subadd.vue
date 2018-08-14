<template>
	<span class="sd-subadd">
		<a class="on-span subtract" v-on:mousedown="mouseDown('sub')" v-on:mouseup="mouseUp()" v-on:mouseout="mouseOut()"></a>
        <input class="input-content"  :readonly="sign"   :value="bindnum" @input="change" @propertychange="change">
        <a class="on-span add" v-on:mousedown="mouseDown('add')" v-on:mouseup="mouseUp()" v-on:mouseout="mouseOut()"></a>
    </span>
</template>
<script type="text/javascript">
	import utils from "src/verdor/utils";
	export default{
		props:[
            "maxnum",
            "minnum",
            "bindnum",
            "sign",
            "item"
        ],
        data: function() {
	        return {
	            min: 1,
	            max: 255,
	            addDown: 0,
	            subDown: 0,
	            num:1,
	        }
        },
        mounted: function() {
            if(utils.isNumeric(this.maxnum)) this.max = parseInt(this.maxnum);
            if(utils.isNumeric(this.minnum)) this.min = parseInt(this.minnum);
            if(utils.isNumeric(this.bindnum)) this.num = parseInt(this.bindnum);
        },
        destroyed:function(){
            this.$off('toClick');
        },
        beforeUpdate:function(){
            if(utils.isNumeric(this.bindnum)) this.num = parseInt(this.bindnum);
        },
        watch:{
        	"num":function(){
                // this.bindnum=this.num;
        		this.$emit('toClick',this.num,this.item);
        	}
        },
        methods: {
            change:function(e){
                var num  = e.target.value;
                num = parseFloat(num.replace(/[^\d]/g,""));
                if(isNaN(num) || num < this.min) {
                    num = this.min;
                }
                if(num > this.max) {
                    num = this.max;
                }
                this.num = num;
                e.target.value = this.num;
            },
            mouseDown: function(tag) {
                var _this = this;
                if(tag == 'add') {
                    this.addDown = (new Date()).getTime();
                    setTimeout(function() {
                        var loopadd = function() {
                            if(_this.addDown == 0) return;
                            _this.add();
                            setTimeout(loopadd, 100);
                        };
                        loopadd();
                    }, 200);
                } else {
                    this.subDown = (new Date()).getTime();
                    setTimeout(function() {
                        var loopsub = function() {
                            if(_this.subDown == 0) return;
                            _this.sub();
                            setTimeout(loopsub, 100);
                        };
                        loopsub();
                    }, 200);
                }
            },
            mouseUp: function() {
                if((new Date()).getTime() - this.addDown < 200) {
                    this.add();
                }
                this.addDown = 0;
                if((new Date()).getTime() - this.subDown < 200) {
                    this.sub();
                }
                this.subDown = 0;
            },
            mouseOut: function() {
                this.addDown = 0;
                this.subDown = 0;
            },
            add: function() {
                if(utils.type(this.addCheck) =="function"&& this.addCheck(this.num + 1)) return;
                if(!this.sign) {
                    var num = this.num;
                    num++;
                    if(num > this.max) {
                        num = this.max;
                    }
                    this.num = num;
                } else {
                    this.num = this.max;
                }
                // this.$emit('toClick',this.num,this.item);
            },
            sub: function() {
                if(utils.type(this.subCheck) == "function" && this.subCheck(this.num - 1)) return;
                if(!this.sign) {
                    var num = this.num;
                    num--;
                    if(num < this.min) {
                        num = this.min;
                    }
                    this.num = num;
                } else {
                    this.num = this.min;
                }
                // this.$emit('toClick',this.num,this.item);
            }
        }
	}
</script>
<style lang="less" scoped>
.on-span {
  float: left;
  width: 50px;
  height: 40px;
  font-size: 0;
  cursor: pointer;
  background-color: #29abe2; 
  &:hover{
  	background-color: #2a80b9;
  }
}

.input-content {
    height: 40px;
    float: left;
    line-height: 40px;
    border: none;
    outline: none;
    text-align: center; 
    background-color: #ffffff;
    border: 1px #D2D2D2 solid;
    border-left: none;
    border-right: none;
    width: 56px;
}
</style>