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
                <span>当前班次预计现金收入：{{dataWin.cash}}</span>
                <span></span>
            </section>
            <section class="line_h">
                <span>当前班次实际现金收入</span>
                <input type="text" :onkeyup="num=num.replace(/[^\d.]/,'')"  v-model="num" />
            </section>
        </div>
    </win>
</template>
<script>
import http from 'src/manager/http';
export default{
	data(){
		return{
			num:''
        }
    },
	props:['dataWin'],
    methods:{
		//差额调整
		async updateDifferPrice(res){
			let data=await http.updateDifferPrice({
				data:{
					id:this.dataWin.id,
					nowPrice:this.num,
					cash:this.dataWin.cash,
					trueShopId:this.dataWin.trueShopId
                }
			});
            if(data){
				this.$emit('interNum',res,data.differPrice);
            }
		},
		clickResult(res){
			if(res=='ok'){
				if(Number(this.num)>=1000000){
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请输入小于1000000的金额'
					});
					return false;
                }
//                let one=/^[1-9]\d{0,5}.?\d+$/;
//				if(!one.test(this.num)){
//					this.$store.commit('setWin', {
//						title: '提示信息',
//						content: '请输入合理金额'
//					});
//					return false;
//                }
				this.updateDifferPrice(res);
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
            margin-right:5px;
        }
        input{
            width: 210px;
            height: 40px;
        }
    }
</style>