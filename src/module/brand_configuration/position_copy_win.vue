<!--
    **职位管理(品牌)一级弹窗
    *
    * 胡江
    * *
    *
-->
<template>
    <div>
        <win @winEvent="clickResult" :align="'center'" :width="705" :height="'auto'">
            <!--标题-->
            <span slot="title">请选择需要复制的所有权限</span>
            <!--内容-->
            <div slot="content">
                <div style="padding: 20px;margin-bottom: 50px">
                    <radioBtn @selOn="doThrowWinResult"  :list="list" :index="index" :name='"name"'></radioBtn>
                </div>
                <div class="bottom">
                     <h3>已选择：{{positionName}}</h3>
                </div>
            </div>
        </win>
    </div>
</template>

<script>
    import http from "src/manager/http";
    export default{
        data(){
            return{
                index: -1,          //索引
                positionName:'',
//                cancelStyle:'',
//                okStyle:''

            }
        },
        props:{
            userData:Object,
            list:Array,
        },
        mounted(){
//                this.cancelStyle = null;
//                this.okStyle = {
//                    content: "确定",
//                    style: {
//                        backgroundColor: '#F69337',
//                        color: '#FFFFFF'
//                    }
//                }
        },
        methods:{
            doThrowWinResult(i){
                this.index=i;
                if(this.index>=0){
                    this.positionName=this.list[this.index].name;
                }
            },
            clickResult(res){
                if(res=='ok'){
                    let copyInfo=this.list[this.index];
                    this.$emit("throwCopyResult",res,copyInfo);  //抛出一个事件给父组件
                }else if(res=='cancel'){
                    this.$emit("throwCopyResult",res);  //抛出一个事件给父组件
                }
            }
        },
        components:{
            win: ()=> import (/*webpackChunkName: "win"*/ "src/components/win"),
            radioBtn: ()=> import (/*webpackChunkName: "radio_btn"*/ "src/components/radio_btn")
        }

    }
</script>

<style scoped>

    .bottom{
        width: 100%;
        height: 40px;
        background-color: #f7f7f7;
        position: fixed;
        bottom: 40px;
        left: 0;
    }
    .bottom h3{
        width: 160px;
        height: 40px;
        line-height: 40px;
        float: right;
        color: #FF9700;
    }
</style>
