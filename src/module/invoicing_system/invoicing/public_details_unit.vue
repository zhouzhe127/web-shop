<template>
    <div id="unit">
        <div class="split-title">
            物料信息
        </div>
        <div class="mainName">
            <span>物料名称:</span>
            <span>{{materialInfo.name}}</span>
        </div>
        <el-table :data="barmessage" style="width: 100%;margin-top:20px;white-space: pre !important;" stripe>
            <el-table-column :label="`修改单位 · 操作时间${getTime(detailList.createTime)}`" class-name='tabletop'>
                <el-table-column label="" prop="unitname">
                </el-table-column>
                <el-table-column label="修改前" prop="modifyBefore">
                </el-table-column>
                <el-table-column label="修改后" prop="modifyAfter"></el-table-column>
            </el-table-column>
        </el-table>
        <div class="sale">
            <span class="tips-icon"></span>
            <span class="tips-word">由于物料单位已被修改,请及时调整相关BOM单</span>
        </div>
        <div class="bomName">
            <span>影响BOM单:</span>
            <router-link v-for="(b,i) in detailList.bom" :key="i" :to="{ path: '/admin/bomList/bomChange', query: { id: b.id }}">{{b.goodsName}}</router-link>
        </div>
    </div>
</template>
<script>
    import utils from 'src/verdor/utils';
    export default {
        data() {
            return {
                barmessage: []
            };
        },
        props: {
            materialInfo: Object, //物料详情
            detailList: Object //列表数据
        },
        methods: {
            getTime(time) {
                return utils.format(parseInt(time) * 1000, 'yyyy-MM-dd hh:mm');
            },
            relaUnit(obj) {
                let str = '';
                for (let item of obj.unitRela) {
                    if (item.name != obj.minUnit) {
                        str += `1${item.name}=${item.value}${obj.minUnit}\n`
                    }
                }
                return str;
            },
            getunit(arr) {
                let s = [];
                for (let item of arr) {
                    s.push(item.name);
                }
                return s.join(',');
            }
        },
        mounted() {
            console.log(this.detailList);
            this.barmessage = this.detailList.content;
            this.barmessage.pop();
            let obj = {
                unitname: '物料单位'
            }
            for (let item of this.barmessage) {
                switch (item.modify) {
                    case 'defaultUnit':
                        item.unitname = '默认单位';
                        break;
                    case 'minUnit':
                        item.unitname = '最小单位';
                        break;
                    case 'unitRela':
                        Object.assign(obj, {
                            modifyAfter: this.getunit(item.modifyAfter.unitRela),
                            modifyBefore: this.getunit(item.modifyBefore.unitRela),
                        })

                        item.unitname = '单位换算';
                        item.modifyAfter = this.relaUnit(item.modifyAfter);
                        item.modifyBefore = this.relaUnit(item.modifyBefore);
                        break;
                }
            }
            this.barmessage.unshift(obj);
        },
        updated() {
            let dom = document.querySelectorAll('.cell');
            dom[dom.length - 2].style.whiteSpace = 'pre';
            dom[dom.length - 1].style.whiteSpace = 'pre';
        },
        components: {},
        computed: {},
    }
</script>
<style lang='less' scoped>
    #unit {
        .mixin(@color, @height, @size) {
            color: @color;
            height: @height;
            line-height: @height;
            font-size: @size;
        }
        .sale {
            height: 25px;
            line-height: 25px;
            margin-top: 30px;
            .tips-icon {
                width: 25px;
                height: 25px;
                float: left;
                margin-right: 5px;
                background: url('../../../res/images/handle-tips.png') center center no-repeat;
            }
            .tips-word {
                color: #a5a5a5;
                font-size: 14px;
            }
        }
        .bomName{
            margin-top: 20px;
            span{
                display: inline-block;
                margin-right: 15px; 
            }
            a{
                color: #E1BB4A; 
                text-decoration: underline;
                margin-right: 4px;
                &::after{
                    content: '|';
                    display: inline-block;
                    padding: 5px;
                }
                &:last-child{
                    &::after{
                        content: '';
                    }
                }
            }
        }
        .split-title {
            text-indent: 15px;
            border-left: 2px solid #29a8e0;
            margin-bottom: 30px;
            .mixin(#333,
            20px,
            16px);
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
        .mainName {
            padding-left: 40px;

        }
    }
</style>