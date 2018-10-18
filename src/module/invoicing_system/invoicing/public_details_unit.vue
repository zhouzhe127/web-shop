<template>
    <div id="unit">
        <div class="heander">
            <div class="title"><span>库存详情</span></div>
            <div class="innerBox">
                <ul>
                    <li><span>物料名称：</span><span>{{materialInfo.name}}</span></li>
                    <li><span>物料编码：</span><span>{{materialInfo.barCode}}</span></li>
                    <li><span>品牌：</span><span>{{materialInfo.brandName||'无'}}</span></li>
                    <li><span>批次数：</span><span>{{materialInfo.batchNum}}</span></li>
                </ul>
                <ul>
                    <li><span>物料类型：</span><span>{{typeValue[Number(materialInfo.type)]}}</span></li>
                    <li><span>物料单位：</span><span>{{getunit(materialInfo.unit)}}</span></li>
                    <li><span>默认单位：</span><span v-if="materialInfo.unit">{{getdefUnit(materialInfo.unit,1)}}</span></li>
                    <li><span>最小单位：</span><span v-if="materialInfo.unit">{{getdefUnit(materialInfo.unit,2)}}</span></li>

                </ul>
                <ul>
                    <li><span>单位换算：</span><span>{{afterUnit}}</span></li>
                    <li><span>分类：</span><span>{{getunit(materialInfo.cate)}}</span></li>
                    <li><span>库存总量：</span><span>{{materialInfo.num}}{{getdefUnit(materialInfo.unit,2)}}</span></li>
                    <li><span>保质期：</span><span>{{materialInfo.validity}}{{dataUnit[materialInfo.validityType]}}</span></li>
                </ul>
            </div>
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
                barmessage: [],
                typeValue:['成品','半成品','普通物料'],
                afterUnit:'',
                dataUnit: ['月', '日', '年'],
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
            },
            getdefUnit(arr, type) {
				//获取默认单位,最小单位
				let key = type == 1 ? 'isDefault' : 'isMin';
				for(let item of arr) {
					if(item[key] == 1) {
						return item.name;
					}
				}
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
                        this.afterUnit = item.modifyAfter;
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

        .bomName {
            margin-top: 20px;

            span {
                display: inline-block;
                margin-right: 15px;
            }

            a {
                color: #E1BB4A;
                text-decoration: underline;
                margin-right: 4px;

                &::after {
                    content: '|';
                    display: inline-block;
                    padding: 5px;
                }

                &:last-child {
                    &::after {
                        content: '';
                    }
                }
            }
        }

        .heander {
            margin-bottom: 20px;

            .title {
                height: 20px;
                line-height: 20px;
                border-left: 4px solid #E1BB4A;
                padding-left: 20px;
                margin-bottom: 30px;
                position: relative;
                padding-left: 100px;

                span {
                    color: #333;
                    font-size: 16px;
                    position: absolute;
                    left: 10px;
                    top: 0;
                    height: 20px;
                    line-height: 20px;
                }

                &:after {
                    content: '';
                    width: 100%;
                    display: inline-block;
                    vertical-align: middle;
                    border-top: 2px dashed #ddd;
                    position: relative;
                }
            }

            .innerBox {
                padding-left: 50px;

                ul {
                    display: inline-block;
                    width: 32%;
                    vertical-align: top;

                    li {
                        margin-bottom: 15px;

                        span {
                            font-size: 16px;
                            display: inline-block;
                            line-height: 20px;
                            max-width: 70%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
    }
</style>