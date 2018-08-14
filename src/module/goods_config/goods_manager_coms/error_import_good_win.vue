<template>
    <win :align="'center'" @winEvent="closeSelfWin" :height="600" :width="980" :ok="btnOk" :cancel="btnCancel">
        <span slot="title">商品导入错误信息</span>
        <div id = "error-import-goods" slot="content">
            <section  v-for = "(item,index) in goodsList" :key="index" style="width: 100%;height: auto;overflow: hidden;">
                <div style="width:100%;height: auto;overflow: hidden;">
                    <h3 class="success">{{item.goodName}} :</h3>
                    <h3 class="error">{{item.ideal}}</h3>
                </div>
            </section>
        </div>
    </win> 
</template>
<script>
export default {
    data(){
        return {
            goodsList:[],   //导入失败的商品
        }
    },
    props:{
        pObj:null,
    },
    mounted(){

    },
}
</script>
<style lang="less" scoped>
#error-import-goods{
    
    .success{
        width:15%;
        height: 40px;
        line-height: 40px;
        text-align: right;
        float: left;
        font-size: 14px;
        color: #ea3b44;
    }
    .error{
        width:80%;
        height: auto;
        line-height: 40px;
        text-align: left;
        float: left;
        font-size: 14px;
    }

}
</style>

