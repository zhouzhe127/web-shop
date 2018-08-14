/* * @Author: zhouzhe * @Date: 2018-07-31 20:33:58 */

<template>
    <div id="revamp">
        <div class="split-title">
            修改单位
        </div>
        <div class="label-content">
            <label class="label">物料名称:</label>
            <span>{{goodsName}}</span>
            <div class="waring">
                <i class="el-icon-warning"></i>
                <span>修改后将删除物料批次、操作日志、统计数据,请谨慎操作</span>
            </div>
        </div>
        <div class="label-content">
            <label class="required label">物料单位</label>
            <!-- <div class="img-div" @click="openAddUnitWin('unit')">
                <img src="../../../res/images/add.png" alt="添加">添加单位
            </div> -->
            <el-button type="primary" @click="openAddUnitWin('unit')" class="img-div">
                <span>
                    <i class="el-icon-circle-plus"></i>添加单位</span>
            </el-button>
            <span class="tips" v-show="selectUnit.length>0">
                (已选择:
                <i v-for="(item,index) in selectUnit" :key="index">{{item.name}}
                    <i v-if="index!=selectUnit.length-1">,</i>
                </i>
                )
            </span>
        </div>
        <div class="label-content" v-for="(list,index) in unitArr" :key="index">
            <label class="required label">{{list.title}}</label>
            <div class="slebox">
                <el-select v-model="list.sleunit" @change="changeunit(list)" placeholder="请选择单位">
                    <el-option v-for="item in selectUnit" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div class="label-content" v-show="unitArr[1].sleunit&&selectUnit.length>1">
            <label class="required label position">单位换算</label>
            <div style="margin-bottom: 20px;" v-for="(item,i) in selectUnit" :key="i" v-if="item.id!=unitArr[1].sleunit">
                <label class="label"></label>
                <div class="unit-div">
                    <el-input placeholder="请输入内容" v-model="item.value">
                        <template slot="append">{{unitArr[1].name}}</template>
                    </el-input>
                </div>
                <span class="equal-unit">=1&nbsp;{{item.name}}</span>
            </div>
        </div>
        <div class="bottom">
            <el-button @click="clickBtn('cancel')" type="info">&nbsp;&nbsp;取消&nbsp;&nbsp;</el-button>
            <el-button @click="clickBtn('ok')" type="primary">&nbsp;&nbsp;确定&nbsp;&nbsp;</el-button>
        </div>
        <component :is="showCom" :pObj="comObj" :list="comObj.category" :selectList="comObj.selectCategory" :title="comObj.title"
            :radio="comObj.radio" :tips="comObj.tips" @throwCommonWin="closeCommonWin"></component>
    </div>
</template>
<script>
    import http from 'src/manager/http';
    import utils from 'src/verdor/utils';
    export default {
        data() {
            return {
                selectUnit: [],
                unitArr: [{
                    title: '默认单位',
                    sleunit: ''
                }, {
                    title: '最小单位',
                    sleunit: ''
                }],
                showCom: '',
                comObj: {},
                units: '',
                groupUnit: [],
                copyUnit: [],
                mid: '',
                goodsName:''
            };
        },
        methods: {
            async init() {
                let data = await http.MaterialGetUnitByMid({
                    data: {
                        mid: this.mid
                    }
                });
                if (data) {
                    this.selectUnit = data;
                    this.disunit();
                }
            },
            disunit() {
                this.selectUnit.map(v => {
                    v.id = v.muId;
                    if (v.isDefault == 1) {
                        this.unitArr[0].sleunit = v.muId;
                        this.unitArr[0].name = v.name;
                    };
                    if (v.isMin == 1) {
                        this.unitArr[1].sleunit = v.muId;
                        this.unitArr[1].name = v.name;
                    };
                })
            },
            openAddUnitWin() {
                this.showCom = 'unitBrand';
                this.comObj = {
                    title: '添加单位',
                    list: this.units,
                    selectlist: this.selectUnit,
                    radio: false,
                    tips: '请先配置单位!'
                };
            },
            closeCommonWin(arr, res) {
                console.log(arr);
                this.showCom = '';
                if (res != 'ok') return;
                if (arr.length > 5) {
                    this.$store.commit('setWin', {
                        title: '温馨提示',
                        content: '最多可添加5个单位哦!'
                    });
                    return;
                }
                let newsle = [];
                let checkmin = true;
                for (let item of arr) { //处理选中单位数据
                    let sle = true;
                    for (let list of this.selectUnit) {
                        if (item.id == list.id) {
                            sle = false;
                            if (Number(list.isMin) == 1) checkmin = false;
                            item = list;
                            break;
                        }
                    }
                    if (sle) {
                        Object.assign(item, {
                            isDefault: 0,
                            isMin: 0,
                            muId: item.id,
                            value: ''
                        })
                    }
                    newsle.push(item);
                }
                if (checkmin) {
                    newsle.map(v => {
                        v.value = '';
                    })
                }
                this.selectUnit = newsle;
                console.log(newsle)
                if (this.selectUnit.length == 1) {
                    this.unitArr.map(v => {
                        v.sleunit = this.selectUnit[0].id;
                    });
                    this.selectUnit[0].value = 1;
                    this.selectUnit[0].isDefault = 1;
                    this.selectUnit[0].isMin = 1;
                } else {
                    this.unitArr.map(v => {
                        v.sleunit = '';
                        v.name = ''
                    });
                }
                this.disunit();
            },
            //获取物料单位
            async MaterialGetUnitList() {
                let res = await http.MaterialGetUnitList();
                return res;
            },
            changeunit(item) {
                if (item.title == '最小单位') {
                    this.rootsle('isMin', item);
                } else if (item.title == '默认单位') {
                    this.rootsle('isDefault', item);
                }

            },
            rootsle(str, item) {
                for (let list of this.selectUnit) {
                    if (str == 'isMin') list.value = '';
                    if (list.muId == item.sleunit) {
                        item.name = list.name;
                        list[str] = 1;
                        if (str == 'isMin') list.value = 1;
                    } else {
                        list[str] = 0;
                    }
                }
            },
            async clickBtn(str) {
                if (str == 'ok') {
                    let arr = [];
                    let check = false;
                    if(this.selectUnit.length==0) {
                        this.$message({
                            message: '请选择单位！',
                            type: 'warning'
                        });
                        return false;
                    }
                    this.selectUnit.forEach(element => {
                        if(!element.value) {
                            this.$message({
                                message: '请填写单位换算！',
                                type: 'warning'
                            });
                            check = true;
                        };
                        if(!/^[1-9]\d{0,10}(\.\d{0,3})?$/.test(element.value)){
                            this.$message({
                                message: '请输入大于1的换算数字,最多可含3位小数!',
                                type: 'warning'
                            });
                            check = true;
                        }
                    });
                    if(check) return false;
                    await http.MaterialEditMaterialUnit({
                        data: {
                            mid: this.mid,
                            unitData: JSON.stringify(this.selectUnit)
                        }
                    });
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    window.history.go(-1);
                } else if (str == 'cancel') {
                    window.history.go(-1);
                }
            }
        },
        mounted() {
            this.MaterialGetUnitList().then((res) => {
                this.units = res;
            });
            this.mid = this.$route.query.id;
            this.goodsName = this.$route.query.name;
            this.init();
        },
        components: {
            unitBrand: () =>
                import ( /*webpackChunkName:'unit_brand_win'*/
                    'src/module/invoicing_system/warehouse_manage/unit_brand_win')
        },
        computed: {},
    }
</script>
<style lang='less' scoped>
    #revamp {
        .mixin(@color, @height, @size) {
            color: @color;
            height: @height;
            line-height: @height;
            font-size: @size;
        }
        .slebox{
            width: 220px;
            display: inline-block;
        }
        .inline {
            margin-left: -3px;
            display: inline-block;
            vertical-align: middle;
        }
        .split-title {
            text-indent: 15px;
            border-left: 2px solid #29a8e0;
            margin-bottom: 30px;
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
        .label-content {
            // border:1px solid #ff0000;
            padding-bottom: 20px;
            position: relative;
            .position{
                position: absolute;
                top: 0;
                left: 0;
            }
            .waring {
                font-size: 16px;
                color: red;
                padding-left: 35px;
                i,
                span {
                    font-size: 16px;
                }
            }
            .input-box {
                display: inline-block;
                width: 210px;
            }
            .label {
                .mixin(#333, 40px, 14px);
                width: 115px;
                text-align: right;
                display: inline-block; // border:1px solid #ff0000;
                padding-right: 20px;
                vertical-align: middle;
            }
            .tips {
                margin-left: 10px;
            }
            .validity-input {
                width: 120px;
                color: #333;
            }
            .equal-unit {
                margin-left: 10px;
                font-size: 14px;
            }
            .tips {
                margin-left: 10px;
            }
            .img-div {
                i {
                    font-size: 14px;
                    display: inline-block;
                    margin-right: 10px;
                }
                span {
                    display: inline-block;
                    width: 172px;
                }
            }
            .unit-div {
                .inline;
                width: 220px;
                height: 40px;
                input[type='text'] {
                    width: 167px;
                    height: 38px;
                    padding: 0;
                    border: 0;
                    outline: none;
                    text-indent: 15px;
                    float: left;
                    font-size: 14px;
                }
                span {
                    width: 37px;
                    height: 40px;
                    text-align: center;
                    vertical-align: middle;
                    .mixin(#333, 40px, 14px);
                    border-left: 1px solid #ccc;
                    float: left;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
        .bottom {
            padding-left: 115px;
            margin-top: 50px;
        }
    }
</style>