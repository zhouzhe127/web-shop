<!--
		**交接班统计（弹窗）
		*
		* 胡江
		* *
		*
-->
<template>
    <win @winEvent="clickResult" :align="'center'" :width="500" :height="200">
        <!--标题-->
        <span slot="title">现金差额调整</span>
        <!--内容-->
        <div slot="content">
            <section class="line_h">
                <span>当前班次预计现金收入：</span>
                <span></span>
            </section>
            <section class="line_h">
                <span>当前班次实际现金收入</span>
                <el-input v-model="num" clearable  style="width:210px;"></el-input>
            </section>
        </div>
    </win>
</template>
<script>
export default{
	data(){
		return{
			num:''
        }
    },
    created(){

    },
	props:['obj'],
    methods:{
		clickResult(res){
			if(res=='ok'){
				this.$emit('interNum',res,this.num);
            }else {
				this.$emit('interNum',res);
            }
        },
    },
    components:{
		win:() => import(/*webpackChunkName: 'win'*/ 'src/components/win'),
    }
}
</script>
<style lang="less" scoped>
    .line_h{
        height: 60px;
        line-height: 60px;
        padding: 30px;
        font-size: 16px;
        span{
            display: inline-block;
        }
        span:first-child{
            margin-right: 20px;
        }
    }
</style>