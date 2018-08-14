<template>
    <div>
        <div class="list-box">
            <div class="title">
                <span class="handle select-ban" @click="openAll">{{isOpenAll?'全部收起':'全部展开'}}</span>
                <span>物料名称</span>
                <span>物料类型</span>
                <span>申请单位</span>
                <span>申请总量</span>
                <span>平均申请量</span>
                <span>申请单数</span>
                <span>库存总量</span>
                <span>出货总量</span>
                <span>配货方式</span>
            </div>
            <div class="list">
                <div class="one">
                    <!--单个展开-->
                    <span><i class="fi" :class="{'fi-double-angle-up':isOpenAll,'fi-double-angle-down':!isOpenAll}" @click="openSingle(index)"></i></span>
                    <span>方式</span>
                    <span>给对方</span>
                    <span>发送到</span>
                    <span>方式</span>
                    <span>固定</span>
                    <span>为</span>
                    <span>固定</span>
                    <span>固定</span>
                    <span>固定</span>
                    <!-- <template>
                        <span class="fail"><em></em>失败原因：递四方速递</span>
                    </template> -->
                    <div class="two">
                        <div class="title-two">
                            <span></span>
                            <span>仓库名称</span>
                            <span>仓库所属</span>
                            <span>申请量</span>
                            <span>平均量</span>
                            <span>按比例量</span>
                            <span>实际出货量</span>
                            <span>分销价格</span>
                            <span>价格单位</span>
                        </div>
                        <div class="list-two">
                            <span class="fail"><em></em>匹配失败</span>
                            <span>发送到</span>
                            <span>固定</span>
                            <span>固定</span>
                            <span>发给</span>
                            <span>出生地</span>
                            <span>出生地</span>
                            <span>出生地</span>
                            <span>出生地</span>
                        </div>
                    </div>
                </div>
                <div class="empty">-暂无数据-</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isOpenAll:false,//是否全部展开
        };
    },
    methods: {
        openAll(){//全部展开
			if(this.isOpenAll){
				this.isOpenAll = false;
			}else{
				this.isOpenAll = true;
			}
        },
        openSingle(){}
    },
    mounted(){},
    components: {},
    computed: {},
}
</script>
<style lang='less' scoped>
.list-box{margin-top: 20px;overflow: auto;
			border: 1px solid #ccc;
			.title{overflow: hidden;background: #f2f2f2;min-width: 1500px;
				span{float: left;height: 40px;line-height: 40px;text-align: center;width: 10%;
					&:first-child{width: 7%;}
				}
				.handle{color: #E1BB4A;cursor: pointer;
					&:hover{text-decoration: underline;}
				}
			}
			.list{min-width: 1500px;
				.one{overflow: hidden;border-bottom: 1px solid #ccc;
					&>span{float: left;height: 70px;text-align: center;line-height: 70px;width: 10%;
						&:first-child{width: 7%;}
						i.fi{font-size: 30px;color: #666;height: 50px;width: 50px;line-height: 50px;text-align: center;
							cursor: pointer;vertical-align: middle;}
						em{height: 18px;width: 18px;}
						
					}
					span{
						em{display: inline-block;vertical-align: middle;margin-right: 5px;
							background: url(../../../res/images/tip.png);background-size: cover;}
					}
					.two{border-top: 1px solid #ccc;float: left;width: 100%;padding-bottom: 10px;
                        span{float: left;width: 10%;text-align: center;color: #777;
                            &:first-child{width: 7%;height: 5px;}
                            em{width: 14px;height: 14px;}
						}
						.title-two{overflow: hidden;padding: 10px 0;}
						.list-two{overflow: hidden;padding: 5px 0;}
					}
				}
				&:last-child{border-bottom: 0;}
				.empty{height: 70px;line-height: 70px;text-align: center;font-size: 16px;color: #999;}
			}
		}
</style>