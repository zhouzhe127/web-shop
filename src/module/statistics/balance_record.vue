<!-- *余额调整记录
     *
     *miaochuan.sha
     *
     * -->
<template>
    <div id="membercard">
        <section v-if='!showDetail'>
            <!-- 余额积分调整 -->
            <div class="plate">
                <div v-for="(item,index) in bannerList" :key='index' class="diel" v-bind:class="{'on':bannerIndex == index}" @click="choiceType(item.type,index)">{{item.name}}</div>
            </div>
            <!-- 条件筛选 -->
            <div class="filter clearfix">
                <div class="filbox fl clearfix">
                    <!--日期组件 开始时间-->
                    <calendar :time="startTime" class="data-box fl" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
                    <span class="fl line">-</span>
                    <!--日期组件 开始时间-->
                    <calendar :time="endTime" class="data-box fl" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
                    <span class="order-order-searchA fl" @click="searchList">
                    <span class="order-order-search" href="javascript:void(0)"></span>
                    </span>
                </div>
                <!--下拉框组件-->
                <div class="filbox fl">
                    <span style="font-size:16px;">卡种类</span>
                    <select-btn :name='expirationTime' :sorts="cardTypeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
                </div>
                <!--下拉框组件-->
                <div class="filbox fl">
                    <span style="font-size:16px;">条件</span>
                    <select-btn :name='conditionName' :sorts="conditionList.map(v=>v.name)" :width="157" @selOn="selcondition"></select-btn>
                </div>
                <!--下拉框组件-->
                <div class="filbox fl">
                    <span style="font-size:16px;">调整结果</span>
                    <select-btn :name='retultName' :sorts="resultList.map(v=>v.name)" :width="157" @selOn="selresult"></select-btn>
                </div>
                <!-- 筛选 重置 -->
                <div class="filbox fl">
                    <a class="fl yellow " href="javascript:void(0)" style="margin-right: 10px;" @click="searchList">筛选</a>
                    <a class="fl gray" @click="restFun" href="javascript:void(0)">重置</a>
                </div>
            </div>
            <!-- 表格一 -->
            <section style="margin-bottom:20px;">
                <com-table :listHeight='80' :listWidth="1000" :showHand="false" :titleData="titleList" :introData="staticLists" :widthType='false'>
                </com-table>
            </section>
            <!-- 表格2 -->
            <com-table :listWidth="1470" :listHeight='80' :listName="'调整记录'" :key="index" :showTitle='1' :introData="userList" :titleData="titleList_l" :allTotal="total">
                <div slot="con-0" slot-scope="props" class="operate_worker">
                    <span @click="openDetail(props.data)" style="color: #ff8d00;">查看详情</span>
                </div>
                <div slot="con-2" slot-scope="props" class="operate_worker">
                    <span>{{Number(props.data.add) + Number(props.data.addFail)}}</span>
                </div>
                <div slot="con-3" slot-scope="props" class="operate_worker">
                    <span>{{Number(props.data.reduce) + Number(props.data.reduceFail)}}</span>
                </div>

            </com-table>
            <!-- 翻页 -->
            <section class="turn-page">
                <pageElement @pageNum="getPageNum" :page="Number(page)" :total="Number(endTotal)" :numArr="[10,20,30,40,50]" :isNoJump="true"></pageElement>
            </section>
        </section>
        <balanceDetail v-else @throwWinResult="getDetailShow" :conditions='conditions'></balanceDetail>
    </div>
</template>
<script>
import http from "src/manager/http";
// import storage from "src/verdor/storage";
import utils from "src/verdor/utils";
// import global from 'src/manager/global';
let amount_h = [{
        titleName: '天数',
        dataName: 'days'
    },
    {
        titleName: '总增加余额',
        dataName: 'actualAdd'
    },
    {
        titleName: '总减少余额 ',
        dataName: 'actualReduce'
    }
]
let amount_b = [{
        titleName: '操作',
        dataName: 'days'
    },
    {
        titleName: '日期',
        dataName: 'date'
    },
    {
        titleName: '总增加余额 '
    },
    {
        titleName: '总减少余额'
    }
]
let point_h = [{
        titleName: '天数',
        dataName: 'days'
    },
    {
        titleName: '总增加积分',
         dataName: 'actualAdd'
    },
    {
        titleName: '总减少积分 ',
        dataName: 'actualReduce'
    }
]
let point_b = [{
        titleName: '操作',
        dataName: 'days'
    },
    {
        titleName: '日期',
        dataName: 'date'
    },
    {
        titleName: '总增加积分 '
    },
    {
        titleName: '总减少积分'
    }
]
export default {
    data() {
        return {
            index: null,
            page: 1, //页数
            total: 0, //记录条数
            num: 10, //一页请求的数量
            endTotal: 0,
            bannerList: [{
                    name: '余额调整',
                    type: 0
                },
                {
                    name: '积分调整',
                    type: 1
                }
            ], //列表
            bannerIndex: 0, //积分余额调整选中的
            startTime: new Date().setDate(1) -
                (new Date().getTime() - new Date().setHours(0, 0, 0, 0)), //获取当月一号的零点时间戳
            endTime: new Date().setHours(23, 59, 59, 59), //结束时间
            cardTypeList: [{
                    //过期时间
                    name: '全部',
                    id: -1
                },
                {
                    name: '电子卡',
                    id: 0
                },
                {
                    name: '实体卡',
                    id: 1
                }
            ],
            expirationTimeId: -1,
            expirationTime: '全部', //状态
            conditionList: [{ //条件
                name: '全部',
                id: 0
            }, {
                name: '增加',
                id: 1
            }, {
                name: '减少',
                id: 2
            }],
            conditionId: 0,
            conditionName: '全部',
            resultList: [{ //结果
                name: '全部',
                id: 0
            }, {
                name: '成功',
                id: 1
            }, {
                name: '失败',
                id: 2
            }],
            resultId: 0,
            retultName: '全部',
            titleList: [],
            staticLists: [], //表格一的数据
            titleList_l: [],
            userList: [], //列表二的数据
            showDetail: false, //是否查看详情
            conditions: {} //筛选条件
        }
    },
    methods: {
        choiceType: function(type, index) { // 切换类型
            this.bannerIndex = index;
            if (this.bannerIndex == 0) {
                this.titleList = amount_h;
                this.titleList_l = amount_b;
            } else {
                this.titleList = point_h;
                this.titleList_l = point_b;
            }
            this.page = 1;
            this.adjustRecord();
        },
        startTimeChange(time) {
            //开始时间
            this.startTime = time;
        },
        endTimeChange(time) {
            //结束时间
            this.endTime = new Date(time).setHours(23, 59, 59, 999);
        },
        selexpirationTime: function(i) {
            this.expirationTime = this.cardTypeList[i].name; //点击对应的名字
            this.expirationTimeId = this.cardTypeList[i].id; //点击对应的id
        },
        selcondition: function(i) {
            this.conditionName = this.conditionList[i].name; //点击对应的名字
            this.conditionId = this.conditionList[i].id; //点击对应的id
        },
        selresult: function(i) {
            this.retultName = this.resultList[i].name; //点击对应的名字
            this.resultId = this.resultList[i].id; //点击对应的id
        },
        getPageNum: function(obj) { //翻页
            this.page = obj.page;
            this.num = obj.num;
            this.adjustRecord();
        },
        searchList: function() {
            this.page = 1;
            this.adjustRecord();
        },
        async adjustRecord() {
            let data = await http.adjustRecord({
                data: {
                    startTime: parseInt(this.startTime / 1000), //开始时间
                    endTime: parseInt(this.endTime / 1000), //结束时间
                    type: this.bannerIndex, //类型
                    cardTypeId: this.expirationTimeId, //卡种类
                    isAdd: this.conditionId, //条件
                    result: this.resultId,
                    isDetail: 0, //是否查看详情
                    page: this.page,
                    num: this.num,
                    export: 0
                }
            })
            if (data) {
                if (this.page == 1) {
                    this.total = data.count;
                    this.endTotal = data.total;
                    this.staticLists = [];
                    data.statistic.days = data.days;
                    this.staticLists.push(data.statistic);
                }
                this.userList = data.consumeList;
            }
        },
        openDetail: function(item) { //点击查看详情
            this.showDetail = true;
            let conditions = {
                startTime: new Date(item.createTime * 1000).setHours(0, 0, 0, 0),
                endTime: new Date(item.createTime * 1000).setHours(23, 59, 59, 999),
                type: this.bannerIndex,
                cardTypeId: this.expirationTimeId,
                isAdd: this.conditionId,
                resultId: this.resultId,
                cardType: this.expirationTime,
                addOreduce: this.conditionName,
                result: this.retultName
            }
            this.conditions = conditions;
        },
        getDetailShow(res) {
            //子组件评价列表返给父组件的
            this.showDetail = res;
            this.$store.commit('setPageTools', [{
                name: '导出',
                className: ['fd-blue'],
                fn: () => {
                    this.Export();
                }
            }]);
        },
        async Export() {
            await http.ExportadjustRecord({
                data: {
                    startTime: parseInt(this.startTime / 1000), //开始时间
                    endTime: parseInt(this.endTime / 1000), //结束时间
                    type: this.bannerIndex, //类型
                    cardTypeId: this.expirationTimeId, //卡种类
                    isAdd: this.conditionId, //条件
                    result: this.resultId,
                    isDetail: 0, //是否查看详情
                    page: this.page,
                    num: this.num,
                    export: 1
                }
            })
        },
        restFun:function(){//重置
            this.startTime = new Date().setDate(1) -
                (new Date().getTime() - new Date().setHours(0, 0, 0, 0));
            this.endTime = new Date().setHours(23, 59, 59, 59);
            this.expirationTime = '全部';
            this.expirationTimeId = -1;
            this.conditionName = '全部';
            this.conditionId = 0;
            this.retultName = '全部';
            this.resultId = 0;
            this.page = 1;
            this.num = 10;
            this.bannerIndex = 0;
            this.adjustRecord();
        }
    },
    components: {
        calendar: () =>
            import ( /*webpackChunkName: "calendar_type"*/ 'src/components/calendar_type'),
        selectBtn: () =>
            import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
        comTable: () =>
            import ( /*webpackChunkName: 'com_table'*/ 'src/components/com_table'),
        pageElement: () =>
            import ( /*webpackChunkName:'page_element'*/ 'src/components/page_element'),
        balanceDetail: () =>
            import ( /*webpackChunkName:'balance_record_detail'*/ './balance_record_detail'),
    },
    created: function() {
        let obj1 = {
            titleStyle: {
                fontSize: 16 + 'px'
            }
        };
        for (let item of amount_h.concat(amount_b, point_h, point_b)) {
            Object.assign(item, obj1);
        }
    },
    mounted() {
        this.titleList = amount_h;
        this.titleList_l = amount_b;
        this.$store.commit('setPageTools', [{
            name: '导出',
            className: ['fd-blue'],
            fn: () => {
                // this.Export();
            }
        }]);
        this.adjustRecord();
    }
}
</script>
<style type="text/css" scoped>
#membercard .plate {
    width: 100%;
    height: 45px;
    margin: 20px 0px;
}

#membercard .plate .diel {
    display: inline-block;
    width: 136px;
    height: 42px;
    font-size: 16px;
    background: #FFF;
    border: 1px solid #E9C048;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    color: #F8931F;
}

#membercard .plate .on {
    background: #F8931F;
    color: #fff;
}

#membercard .filter {
    margin-bottom: 20px;
}

#membercard .filter .filbox {
    height: 40px;
    margin: 0 20px 20px 0;
    line-height: 40px;
}

#membercard .filter .filbox .line {
    margin: 0 5px;
}

#membercard .filter .filbox a {
    width: 80px;
    height: 40px;
    line-height: 40px;
}

#membercard .operate_worker span {
    font-size: 16px;
}















/* 搜索图标的公共样式 */

#membercard .order-order-searchA,
#membercard .order-order-search {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #29a7e1;
    cursor: pointer;
    vertical-align: middle;
    margin-top: 1px;
}

#membercard .order-order-search {
    background: url(../../res/images/search.png) center center no-repeat;
}

#membercard .order-order-searchA:hover {
    background-color: #1878a5;
    transition: background-color ease-in-out 0.2s;
}

#membercard .order-order-searchA:active {
    background-color: #154961;
}
</style>