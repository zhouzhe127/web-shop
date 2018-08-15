<template>
    <div id="batchSchedule">
        <div class="split-title">
            批量调度
        </div>
        <div class="innerBox">
            <ul>
                <li>
                    <span>出货仓库：</span>
                    <span>outWare.name</span>
                    <img src="../../../res/images/evret.jpg" @click="addShow = true" alt="">
                </li>
            </ul>
            <ul>
                <li>
                    <span>配货方式：</span>
                    <el-select v-model="allot" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
        </div>
        <ul class="typeBox">
			<li v-for="(item,index) in typeData" :class="{active:typeactive==index}" @click="typeBox(index)" :key="index">{{item}}</li>
		</ul>
        <component :is="showList" :proData="proData" v-if="proData.data"></component>
        <add-store :pObj="comObj" v-if="addShow" @throwWin="throwWin"></add-store>
    </div>
</template>
<script>
import http from 'src/manager/http';
export default {
    data () {
        return {
            addShow:false,
            typeData: ['商品', '物料'],
            typeactive:0,
            options: [{
                value: 1,
                label: '按申请单比例分配'
                }, {
                value: 2,
                label: '按申请单平均分配'
                }, {
                value: 3,
                label: '按需求分配（不足下次补充）'
                }, {
                value: 4,
                label: '按需求分配（库存可为负）'
                }, {
                value: 5,
                label: '优先按需分配，不足执行按比例分配'
                }, {
                value: 6,
                label: '优先按需分配，不足执行按平均分配'
            }],
            allot: 5,
            showList:'batchGoods',
            goodsList:'',//商品数据
            materialList:'',//物料数据
            proData:{
                data:''
            }//给组件的数据
        };
    },
    methods: {
        async init(){
            let data = await http.invgetMultiApplicationMatchList({data:{

            }});
            this.goodsList = data.goodsList;
            this.materialList = data.materialList;
            this.typeBox(this.typeactive);
            console.log(data);
        },
        typeBox(index) {
            this.typeactive = index;
            switch(index){
                case 0:
                    this.showList = 'batchGoods';
                    this.proData.data = this.goodsList;
                    break;
                case 1:
                    this.showList = 'batchSupplies';
                    break;
            }
        },
        throwWin(str, res) {
            this.addShow = false;
            if (str == 'ok') {
                // if (res.id == this.detailData.wid) {
                //     this.alert('出货仓库不能与入货仓库重复,请重新选择');
                //     this.addShow = true;
                // } else {
                //     this.comObj.owner = res;
                //     this.outWare = res;
                //     this.init();
                // }
            }
        },
        async getWarehouse() {
            //获取仓库列表
            let data = await http.warehouseList();
            let arr = [];
            if (data) {
                for (let item of data) {
                    // let shopId = item.owner.split(',')[1];
                    let obj = {
                        id: item.id,
                        name: item.name
                        // shopId:this.ischain==3? item.brandId:item.shopId==0? item.brandId:item.shopId
                    };
                    if (item.shopId != 0) { //单店
                        obj.ischain = 0;
                        obj.shopId = item.shopId;
                    } else { //品牌
                        obj.ischain = 1;
                        obj.shopId = item.brandId;
                    }
                    // if(Number(obj.shopId)===Number(this.shopId)){
                    //   }
                    arr.push(obj);
                }
                this.comObj = {
                    allList: arr,
                };
            }
        }
    },
    mounted(){
        this.init();
        this.getWarehouse();
    },
    components: {
        batchSupplies: () =>
                import ( /*webpackChunkName: 'batch_supplies'*/ './batch_supplies'),
        batchGoods: () =>
                import ( /*webpackChunkName: 'batch_goods'*/ './batch_goods'),     
        addStore: () =>
				import ( /*webpackChunkName:'choose_warehouse__win'*/
					'src/module/invoicing_system/warehouse_manage/choose_warehouse_win'),           
    },
    // computed: {},
}
</script>
<style lang='less' scoped>
#batchSchedule{
    .split-title{
        text-indent: 15px;
        border-left: 2px solid #29a8e0;
        margin-bottom: 20px;
        .mixin(#333, 20px, 16px);
        &:after {
            content: '';
            display: inline-block;
            border: 1px dashed #ddd;
            width: 470px;
            position: relative;
            left: 20px;
            top: -4px;
        }
    }
    .mixin(@color, @height, @size) {
        color: @color;
        height: @height;
        line-height: @height;
        font-size: @size;
    }
    .innerBox {
        padding-left: 50px;
        ul {
            display: inline-block;
            width: 32%;
            vertical-align: top;
            li {
                margin-bottom: 20px;
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: center;
                span {
                    display: inline-block;
                    max-width: 70%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 16px;
                }
                img {
                    cursor: pointer;
                    margin:0 10px;
                    width: 18px;
                    height: 18px;
                    display: inline-block;
                }
            }
        }
    }
    .typeBox {
        margin-top: 15px;
        li {
            width: 100px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            display: inline-block;
            margin-right: 10px;
            cursor: pointer;
            background-color: #eeeeee;
            border-radius: 5px;
        }
        .active {
            background-color: #E1BB4A;
            color: #ffffff;
        }
    }
    
}
</style>