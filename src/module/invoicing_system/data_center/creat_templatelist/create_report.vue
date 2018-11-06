/*
* @Author: zhouzhe
* @Date: 2018-11-02 14:24:19
*/
<template>
    <div id="createReport">
        <div class="split-title">
            报表模板名称
        </div>
        <div class="inpStyle">
            <span class="required label">模板名称</span>
            <div class="inpbox">
                <el-input clearable v-model="moldeName" maxlength="20" class="el-in" placeholder="输入表名称"></el-input>
            </div>
        </div>
        <div class="inpStyle">
            <el-date-picker v-model="applytimeAll" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <div class="sleType">
                <el-button @click="cerate" type="primary">生成</el-button>
                <el-button @click="searchReset" type="info">重置</el-button>
            </div>
        </div>
        <div class="tableBox">
            <el-table :data="tableData" border>
                <el-table-column prop="name" label="名称" width="200">
                    <!-- <template slot-scope="scope">
                        <div class="detailsBtn">
                            <span>{{scope.row.name}}</span>
                        </div>
                    </template> -->
                </el-table-column>
                <el-table-column width="300">
                    <template slot="header" slot-scope="scope">
                        <div class="detailsBtn">
                            <!-- <p>物料单位</p> -->
                            <el-popover trigger="hover" width="300" style="display:block;text-align: center;">
                                <div class="popover">
                                    <p>
                                        <span>统计</span>:<span>道士出山</span>
                                    </p>
                                    <p>
                                        <span>关联店铺</span>:<span>道士出山</span>
                                    </p>
                                    <p>
                                        <span>关联仓库</span>:<span>道士出山</span>
                                    </p>
                                </div>
                                <el-button type="text" slot="reference">物料单位</el-button>
                            </el-popover>
                            <div class="timeBox">
                                <el-date-picker style="position: relative;top: -8px;left: -54px;" v-model="applytimeAll"
                                    type="daterange" align="right" unlink-panels range-separator="——" start-placeholder="开始日期"
                                    end-placeholder="结束日期" :picker-options="pickerOptions">
                                </el-date-picker>
                                <i class="el-icon-caret-bottom"></i>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="#" width="200">
                </el-table-column>
                <el-table-column label="#" width="200">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import global from 'src/manager/global';
    import http from 'src/manager/http';
    import utils from 'src/verdor/utils';
    export default {
        data() {
            return {
                moldeName: '',
                tableData: [{
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }],
                applytimeAll: [utils.getTime({
                    time: new Date() - global.timeConst.ONEMONTH
                }).start, utils.getTime({
                    time: new Date()
                }).end], //申请时间
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        methods: {
            crageBtn() {
                this.$store.commit('setPageTools', [{
                    name: '返回',
                    className: '',
                    type: 5,
                    icon: 'el-icon-back',
                    fn: () => {

                    }
                }]);
            },
            checkTime(arr) {
                if (arr[1] - arr[0] > global.timeConst.ONEDAY * 365) {
                    this.$message({
                        message: '选择时间最大跨度365天',
                        type: 'warning'
                    });
                    arr[0] = arr[1] - global.timeConst.ONEDAY * 365;
                }
            }
        },
        mounted() {
            this.crageBtn();
        },
        components: {},
        computed: {},
        watch: {
            applytimeAll(news) {
                this.checkTime(news);
            }
        }
    }
</script>
<style lang='less' scoped>
    #createReport {

        .split-title {
            text-indent: 10px;
            border-left: 4px solid #E1BB4A;
            margin-bottom: 30px;
            font-size: 16px;

            &:after {
                content: '';
                display: inline-block;
                border: 1px dashed #ddd;
                width: 500px;
                position: relative;
                left: 20px;
                top: -4px;
            }
        }

        .inpStyle {
            margin-bottom: 20px;

            .inpbox {
                display: inline-block;
                width: 200px;
                margin-left: 15px;
            }

            .sleType {
                width: 170px;
                margin-left: 20px;
                display: inline-block;
            }
        }

        .tableBox {
            display: inline-block;

            .detailsBtn {
                // p {
                //     text-align: center;
                // }

                .timeBox {
                    width: 250px;
                    height: 25px;
                    overflow: hidden;
                    cursor: pointer;
                }

                i {
                    position: absolute;
                    left: 260px;
                    top: 45px;
                }

            }
        }
    }

    .popover {
        p {
            display: flex;
            align-items: center;

            span {
                display: inline-block;
                word-break: break-all;

                &:nth-child(1) {
                    text-align: right;
                    width: 25%;
                }

                &:nth-child(2) {
                    width: 75%;
                }
            }

        }
    }
</style>