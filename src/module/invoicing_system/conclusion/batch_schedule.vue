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
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </li>
            </ul>
        </div>
        <ul class="typeBox">
			<li v-for="(item,index) in typeData" :class="{active:typeactive==index}" @click="typeBox(index)" :key="index">{{item}}</li>
		</ul>
        <component :is="'batchSupplies'"></component>
    </div>
</template>
<script>
export default {
    data () {
        return {
            addShow:false,
            typeData: ['商品', '物料'],
            
            typeactive:0,
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }],
            value: ''
        };
    },
    methods: {
        typeBox(index) {
            this.typeactive = index;
        },
        
    },
    // mounted(){},
    components: {
        batchSupplies: () =>
				import ( /*webpackChunkName: 'batch_supplies'*/ './batch_supplies'),
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
            background-color: #5ebee8;
            color: #ffffff;
        }
    }
    
}
</style>