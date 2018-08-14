<template>
    <win :width="width" :height="height" @winEvent = "winEvent" :align="'center'">
        <span slot="title">{{title}}</span>
        <div id="tan" slot="content" slot-scope="props">
            <mul-select @selOn="listChange" :list="list" :name="name" :styles="styles" :isradio="isradio" :selects="selAll" :keys="selkey"></mul-select>
        </div>
    </win>
</template>
<script>
export default{
    data(){
        return{
            selAll:this.selects
        }
    },
    props:["list","title","width","height","selkey","isradio",'selects',"name","styles"],
    methods:{
        listChange(arr){
            this.selAll = arr;
        },
        winEvent(str) {
            this.$emit("selArray", this.selAll,str);
            this.$emit("winEvent", str);
        }
    },
    mounted:function(){
    },
    components:{
        win:()=> import (/*webpackChunkName: "win"*/ "src/components/win"),
        mulSelect:()=>import (/*webpackChunkName: "mul_select"*/ "src/components/mul_select")
    }
}
</script>
<style lang="less" scoped>
#tan{
    padding: 20px;
}
</style>
