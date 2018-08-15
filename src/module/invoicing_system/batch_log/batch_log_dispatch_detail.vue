<template>
    <div id="batch-log-dispatch-detail">
        <div class="nav">
            <div class="page-head">批量调度日志</div>
            <div class="info">
                <li>出货仓库:32312321</li>
                <li>操作人:打算</li>
                <li>操作时间:34567890</li>
            </div>            
        </div>

        <div class="main">
            <div class="tab">
                <el-button @click="toggleTabs(btn,btnIndex)" :type="btn.id == selectTabs ? 'primary' : 'plain'" v-for="(btn,btnIndex) in tabs" :key="btnIndex">{{btn.name}}</el-button>
            </div>
            <div class="content" v-if="selectTabs == 1">
                <div class="table-goods" >
                    <div class="table-title">
                        <div class="extend">
                            <span class="extend-left extend-common">全部展开</span>
                            <span class="extend-right extend-common">全部收起</span>
                        </div>
                        <div class="another-title">
                            <li v-for="(a,ai) in goodsTableTitle" :key="ai">{{a.name}}</li>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="i in 4" :key="i">
                            <div class="extend">
                                <span class="arrow">
                                    <i class="fi fi-double-angle-up fi-2x font-up"  :class="{'fi-double-angle-up':false,'font-up':false,'fi-double-angle-down':true,'font-down':true,}"></i>
                                </span>
                            </div>
                            <div class="row-sum">
                                <li v-for="i in 8" :key="i">
                                    牛肉的奥奥奥奥奥奥奥
                                </li>
                            </div>

                            <div class="table-detail">
                                <div class="detail-title">
                                    <li>空</li>
                                    <li>仓库名称</li>
                                    <li>仓库所属</li>
                                    <li>申请量</li>
                                    <li>平均量</li>
                                    <li>按比例量</li>
                                    <li>实际出货量</li>
                                </div>

                                <div class="detail-body">
                                    <div class="detail-row" v-for="j in 4" :key="j">
                                        <li contenteditable="true" v-for="i in 7" :key="i">仓库名称</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content" v-if="selectTabs == 2">
                <div class="table-material" >
                    <div class="table-title">
                        <div class="extend">
                            <span class="extend-left extend-common">全部展开</span>
                            <span class="extend-right extend-common">全部收起</span>
                        </div>
                        <div class="another-title">
                            <li v-for="(a,ai) in materialTableTitle" :key="ai">{{a.name}}</li>
                        </div>
                    </div>
                    <div class="table-body">
                        <div class="table-row" v-for="i in 4" :key="i">
                            <div class="extend">
                                <span class="arrow">
                                    <i class="fi fi-double-angle-up fi-2x font-up"  :class="{'fi-double-angle-up':false,'font-up':false,'fi-double-angle-down':true,'font-down':true,}"></i>
                                </span>
                            </div>
                            <div class="row-sum">
                                <li v-for="i in 9" :key="i">
                                    牛肉的奥奥奥奥奥奥奥
                                </li>
                            </div>

                            <div class="table-detail">
                                <div class="detail-title">
                                    <li>空</li>
                                    <li>仓库名称</li>
                                    <li>仓库所属</li>
                                    <li>申请量</li>
                                    <li>平均量</li>
                                    <li>按比例量</li>
                                    <li>实际出货量</li>
                                    <li>分销价格</li>
                                </div>

                                <div class="detail-body">
                                    <div class="detail-row" v-for="j in 4" :key="j">
                                        <li contenteditable="true" v-for="i in 8" :key="i">仓库名称</li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>

            <div class="application" v-if="selectTabs == 3">
                <table-com
                    :showHand="false" 
                    :titleHeight='40' 
                    :showTitle="1" 
                    :titleData="applicationTitle" 
                    :fixed="2" 
                    :widthType="true" 
                    :introData="[]" 
                    :listWidth="1200"
                    :bannerStyle="{color:'#333','fontSize':'16px'}"
                    :mainBox="{color:'#666'}"
                    :listHeight="70"
                >
                <div slot-scope="{data,index}" slot="con-0">
                    <span class="view-detail" @click="linkUrl('detail',item)">查看详情</span>
                </div>
                </table-com>                   
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            goodsTableTitle:[
                {name:'商品名称'},
                {name:'申请单位'},
                {name:'申请总量'},
                {name:'平均申请量'},
                {name:'申请单数'},
                {name:'库存总量'},
                {name:'出货总量'},
                {name:'配货方式'},
            ],
            materialTableTitle:[
                {name:'物料名称'},
                {name:'物料类型'},
                {name:'申请单位'},
                {name:'申请总量'},
                {name:'平均申请量'},
                {name:'申请单数'},
                {name:'库存总量'},
                {name:'出货总量'},
                {name:'配货方式'},
            ],
            applicationTitle:[
                {titleName:'操作',dataName:'itemIndex'},
                {titleName:'序号',dataName:'itemName'},
                {titleName:'申请单号',dataName:'barCode'},
                {titleName:'申请店铺/品牌',dataName:'storeName'},
                {titleName:'申请人',dataName:'before'},
                {titleName:'申请时间',dataName:'after'},
            ],
            tabs:[
                {name:'商品',id:1,},
                {name:'物料',id:2},
                {name:'申请单列表',id:3},
            ],
            selectTabs:'1',
        };
    },
    methods: {
        linkUrl(){

        },
        toggleTabs(btn){
            this.selectTabs = btn.id;
        },
        initBtn(){
			let style = {'line-height':'initial'};
			this.$store.commit('setPageTools',[
				{
					name: '返回',
                    style,
                    className:['el-button--default','el-button'],
					fn:()=>{
						this.$router.go(-1);
					}
				},
				{
					name: '打印',
                    style,
                    className:['el-button--info','el-button'],
					fn:()=>{
						this.$router.go(-1);
					}
				},
			]);
		}
    },
    components: {
		tableCom:()=>import (/*webpackChunkName:'com_table'*/'src/components/com_table'),

    },
    mounted(){
        this.initBtn();
    },
};
</script>
<style lang='less' scoped>
@import url('../warehouse_manage/z_less.less');
#batch-log-dispatch-detail{
    @tw:1436px;             //表格的宽
    @cw:1200px;             //滚动条容器的宽
    .inline-middle{
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
    .arrow{
        .whb(40px,40px,none);
        line-height: 48px;
        .inline-middle;
    }
    .word{
        position: absolute;
        top:50%;
        margin:auto;
        transform: translate(0,-50%);
        padding:0 10px;
        word-break: break-all;
        display: inline-block;
        width: 100%;
        text-align: center;
    } 
    li{
        list-style: none;
    }

    .page-head{
        .split-div(80%);
    }
    .info{
        padding:30px 0 30px 40px;
        li{
            list-style: none;
            width:30%;
            display: inline-block;
            padding-bottom:15px;
            .lfc(#333,16px,16px);				
        }	
    }
    .main{
        .tab{

        }
        .goods-material{
            width:@tw;
            .table-title{
                background-color: #f2f2f2;
                .extend{
                    width:210px;
                    float:left;
                    text-align: center;
                    .extend-common{
                        .lfc(@b,40px,16px);
                        height:40px;
                        .inline-middle;    
                        cursor: pointer;                        
                    }
                    .extend-left{
                        &:after{
                            content: '';
                            height:20px;
                            padding-left:10px;
                            border-right:1px solid #ccc;
                            .inline-middle;
                        }
                        margin-right:7px;
                    }
                }
                .another-title{
                    .inline-middle;
                    width:1225px;
                    display: flex;
                    li{
                        .lfc(#333,40px,16px);
                        flex: 1;
                        list-style: none;
                        width:10%;
                        float:left;
                        &:last-child{
                            width:300px;
                            flex: none;
                        }
                    }                        
                }
            }
            .table-body{
                .table-row{         
                    border-bottom: 2px solid #f2f2f2;
                    .extend{
                        .whb(210px,70px);
                        float:left;
                        text-align: center;
                        line-height: 70px;
                    }
                    .row-sum{
                        display: flex;
                        width:1225px;
                        li{
                            flex:1;
                            height:68px;
                            padding:10px;
                            text-align: center;
                            color:#666;
                            font-size:14px;
                            &:last-child{
                                flex:none;
                                width:300px;
                            }
                        }
                    }
                    .table-detail{
                        display: block;
                        border-top: 2px solid #f2f2f2;
                        .detail-title{
                            display: flex;
                            width:100%;
                            li{
                                flex:1;
                                text-align: center;
                                height:50px;
                                line-height: 50px;
                                color:#999;
                                font-size:16px;
                                &:first-child{
                                    flex:none;
                                    width:210px;
                                }
                                &:last-child{
                                    flex:none;
                                    width:300px;
                                }
                            }
                        }
                        .detail-body{
                            .detail-row{
                                display: flex;
                                li{
                                    color:#999;
                                    padding:15px 0;
                                    font-size:14px;
                                    text-align: center;
                                    vertical-align: middle;
                                    flex:1;
                                    height:50px;
                                    &:first-child{
                                        width:210px;
                                        flex:none;
                                    }
                                    &:last-child{
                                        width:300px;
                                        flex:none;
                                    }
                                }
                                &:after{
                                    .clear;
                                }                                    
                            }
                        }
                    }
                }
            }
        }
        .content{
            margin-top:25px;
            max-width: @tw;
            border:1px solid #ccc;
            overflow-x: scroll;
            .table-goods{
                .goods-material;
            }
            .table-material{
                .goods-material;
            }
        }
    }

}
</style>