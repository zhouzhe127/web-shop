<!-- *领券活动
     *
     *miaochuan.sha
     *
     * -->
<template>
    <div id="addcouponAct">
        <!-- 活动标题 -->
        <div class="online-box clearfix">
            <span class="online-sub fl required">活动名称</span>
            <div class="rightHalf">
                <input type="text" class="name fl" placeholder="请输入活动标题" v-model='activityName' maxlength="10" />
                <div class="fl handle-tips">
                    <i></i>限10字以内
                </div>
            </div>
        </div>
        <!-- 活动时间 -->
        <div class="online-box clearfix">
            <span class="online-sub fl">活动时间</span>
            <div class="rightHalf">
                <div class="fl" style="cursor: pointer;">
                    <calendar ref='startCal' :pObj='startObj' @throwTime="getStartTime" class="fl"></calendar>
                    <span class="fl" style="width: 40px;text-align: center;margin-right: 0;">-</span>
                    <calendar ref='endCal' :pObj='endObj' @throwTime="getEndTime" class="fl"></calendar>
                </div>
                <span class="fl" style="text-align: left;text-indent: 20px;color: #A3A3A3;">共{{returnInt}}天</span>
            </div>
        </div>
        <!-- 关联券 -->
        <div class="online-box clearfix">
            <span class="online-sub fl">关联券</span>
            <div class="rightHalf">
                <a href="javascript:void(0);" class="addclassify" style="width:150px;" @click="addCount">关联券</a>
                <div class="handle-tips" v-if="editId != ''">
                    <i></i>调整券总量/购券金额,会对统计数据产生影响,请避免该操作。优惠券下架后,在微信端不再做显示
                </div>
            </div>
        </div>
        <!-- 关联券 -->
        <div class="online-box clearfix" v-if="couponLists.length > 0">
            <span class="online-sub fl"></span>
            <div class="rightHalf">
                <section>
                    <ul class="title">
                        <div class="container clearfix">
                            <li v-for="(int,i) in couponLists" :class="ruleIndex == i ? 'active' : ''" @click="getDetails(i)">
                                {{int.name}}
                                <i v-if='!int.modify' class="deletes" @click.stop='deletesecPush(i)'></i>
                            </li>
                        </div>
                    </ul>
                    <div class="content" v-for="(item,ind) in couponLists" v-if='ruleIndex == ind'>
                        <!-- 券总量 -->
                        <div class="online-box clearfix" v-if="item.modify">
                            <span class="online-sub fl">状态:</span>
                            <div class="rightHalf">
                                <div class="state">
                                    <template v-if="item.isShelves == '1'">
                                        <span>正常</span>
                                        <a href="javascript:void(0)" @click="modifyStatus(item)">下架优惠券</a>
                                    </template>
                                    <template v-else>
                                        <span>已下架</span>
                                        <a href="javascript:void(0)" @click="modifyStatus(item)">上架优惠券</a>
                                    </template>
                                </div>
                            </div>
                        </div>
                        <!-- 券总量 -->
                        <div class="online-box clearfix">
                            <span class="online-sub fl">券总量</span>
                            <div class="rightHalf">
                                <select-btn :name='item.integralTime' :sorts="integralList.map(v=>v.name)" :width="224" @selOn="selintegralList" :showIndex='ind'></select-btn>
                            </div>
                        </div>
                        <!-- 数量 -->
                        <div class="online-box clearfix" v-if="item.integralId == '1'">
                            <span class="online-sub fl required">数量</span>
                            <div class="rightHalf">
                                <section class="secbox">
                                    <input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-model="item.voucheramount" onkeyup="value=value.replace(/[^\d]/g,'')" />
                                    <span>张</span>
                                </section>
                            </div>
                        </div>
                        <!-- 参与购券 -->
                        <div class="online-box clearfix">
                            <span class="online-sub fl required">参与购券</span>
                            <div class="rightHalf">
                                <select-btn :name='item.expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="224" @selOn="selexpirationTime" :showIndex='ind'></select-btn>
                            </div>
                        </div>
                        <!-- 购券金额 -->
                        <div class="online-box clearfix" v-if="item.expirationTimeId == '1'">
                            <span class="online-sub fl required">购券金额</span>
                            <div class="rightHalf">
                                <section class="secbox">
                                    <input type="text" class="cumulative" placeholder="请填写金额" maxlength="6" v-model="item.purchasevoucher" onkeyup="value=value.replace(/[^\d\.]/g,'')" @blur="keepValue(ind)" />
                                    <span>元</span>
                                </section>
                            </div>
                        </div>
                        <!-- 人均领取次数 -->
                        <div class="online-box clearfix">
                            <span class="online-sub fl required">人均领取次数</span>
                            <div class="rightHalf">
                                <section class="secbox">
                                    <input type="text" class="cumulative" placeholder="请填写次数" maxlength="6" v-model="item.collection" onkeyup="value=value.replace(/[^\d]/g,'')" />
                                    <span>次</span>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- 取消保存 -->
        <div class="online-box clearfix" style="padding-left:60px;">
            <a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;background-color: #a7a7a7;" @click='closePage'>取消</a>
            <a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;" @click="saveConfig('0')">保存</a>
            <a v-if="editId == ''" href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click="saveConfig('1')">发布</a>
        </div>
        <!-- 优惠券 -->
        <birthCoupon v-if='showBirthCoupon' :couponList='couponList' @winEvent='winEvent' :isShowaddAndSubtract='false'></birthCoupon>
    </div>
</template>
<script>
import http from "src/manager/http";
import storage from "src/verdor/storage";
import utils from "src/verdor/utils";
// import global from 'src/manager/global';
export default {
    data() {
        return {
            activityName: '', //活动名称
            returnInt: 1, //相差天数
            startObj: {
                time: new Date().setHours(0, 0, 0, 0)
            },
            endObj: {
                time: new Date().setHours(23, 59, 59, 999)
            },
            ruleIndex: 0, //点中的第几个  
            couponLists: [], //券列表
            //integralTime: '无上限', //券总量  
            //integralId: 0,
            integralList: [{
                    name: '无上限',
                    id: 0
                },
                {
                    name: '自定义',
                    id: 1
                }
            ],
            // voucheramount: '', //券总分量填写的数量
            // purchasevoucher: '', //购券填写的数量
            // collection: '', //人均领取的次数
            expirationTimeList: [{
                    //过期时间
                    name: '不参与',
                    id: 0
                },
                {
                    name: '参与',
                    id: 1
                }
            ],
            couponState: [{
                    id: 1,
                    status: '正常',
                    option: '下架优惠券'
                },
                {
                    id: 0,
                    status: '已下架',
                    option: '上架优惠券'
                }
            ],
            //expirationTimeId: 0,
            //expirationTime: '不参与', //状态
            couponList: [], //优惠券列表
            showBirthCoupon: false, //打开优惠券的弹窗  
            editId: '', //活动编辑的id
            ruleId: '', //规则id
            isactivityDetail:true
        }
    },
    watch: {
        'startObj.time': 'timeChange',
        'endObj.time': 'timeChange',
    },
    methods: {
        getStartTime(str) { //活动的开始时间
            this.startObj.time = str;
        },
        getEndTime(str) { //活动的结束时间
            this.endObj.time = str;
        },
        timeChange: function() { //相差天数计算
            this.returnInt = Math.ceil(
                (new Date(this.endObj.time).getTime() -
                    new Date(this.startObj.time).getTime()) /
                (1000 * 60 * 60 * 24)
            );
        },
        getDetails: function(index) { //点击查看详情
            // 获取规则详情
            this.ruleIndex = index;
        },
        deletesecPush: function(ind) { //删除二级图文推送
            if (this.ruleIndex >= ind) {
                this.ruleIndex = 0;
            }
            this.couponLists.splice(ind, 1);
        },
        haveIndex: function(i) { //券总量
            this.integralOn = i;
        },
        selexpirationTime: function(i, showIndex) { //选择参与类型
            this.couponLists[showIndex].expirationTime = this.expirationTimeList[i].name;
            this.couponLists[showIndex].expirationTimeId = this.expirationTimeList[i].id;
        },
        selintegralList: function(i, showIndex) { //选择券总量
            this.couponLists[showIndex].integralTime = this.integralList[i].name;
            this.couponLists[showIndex].integralId = this.integralList[i].id;
            //this.integralId = this.integralList[i].id;
        },
        closePage: function() {
            // 关闭页面
            this.$router.push('/admin/activity/couponActivity');
        },
        //关联优惠券弹窗
        async addCount() {
            let data = await http.getGetCouponCondition({
               
            });
            let coupons = [];
            for (let item of data) {
                item.num = 1;
                if (item.type != 7) { //type7是积分卡券
                    coupons.push(item);
                }
            }
            this.couponList = this.arrayfilter(coupons, this.couponLists);
            // this.couponList.forEach(function(item) {
            //     item.num = 1;
            // });
            // if (this.couponType == '1') {
            //     this.selectCoupon = this.promotersCoupon;
            // } else if (this.couponType == '2') {
            //     this.selectCoupon = this.followersCoupon;
            // }
            this.showBirthCoupon = true;
        },
        arrayfilter: function(array, array2) { //两个数组中过滤不同的元素
            let result = [];
            for (var i = 0; i < array.length; i++) {
                let obj = array[i];
                let id = obj.id;
                let isExist = false;
                for (let j = 0; j < array2.length; j++) {
                    var aj = array2[j];
                    var n = aj.id;
                    if (n == id) {
                        isExist = true;
                        break;
                    }
                }
                if (!isExist) {
                    result.push(obj);
                }
            }
            return result;
        },
        winEvent(obj) {
            if (obj.status == 'ok') {
                //console.log(JSON.stringify(obj.data.select))
                let obj1 = {
                    integralTime: '无上限',
                    integralId: 0,
                    expirationTime: '不参与',
                    expirationTimeId: 0,
                    voucheramount: 0, //券总分量填写的数量
                    purchasevoucher: 0, //购券填写的数量
                    collection: '', //人均领取的次数 
                    isShelves: 1 //优惠券的状态                   
                }
                if (this.couponLists.length + obj.data.select.length > 10) {
                    this.valiData('优惠券最多一共关联10张!');
                    return false;
                }
                for (let item of obj.data.select) {
                    let obj2 = Object.assign({}, item, obj1);
                    this.couponLists.push(obj2);
                }
            }
            this.showBirthCoupon = false;
        },
        valiData: function(content, title, winType) { //提示框格式化
            this.$store.commit('setWin', {
                content: content,
                title: title,
                winType: winType
            });
        },
        checkForm: function() { //验证
            if (this.activityName == '') {
                this.valiData('活动标题不能为空!');
                return false;
            }
            if (this.startObj.time - this.endObj.time > 0) {
                this.valiData('活动时间选择有误!');
                return false;
            }
            if (this.couponLists.length <= 0) {
                this.valiData('请添加关联券!');
                return false;
            }
            for (let item of this.couponLists) {
                if (item.integralId == 1 && item.voucheramount == '') {
                    this.valiData(`${item.name}请填写券总量!`);
                    return false;
                }
                if (item.expirationTimeId == 1 && (item.purchasevoucher == '' || item.purchasevoucher == 0)) {
                    this.valiData(`${item.name}请填写参与购券金额且购券金额需大于0!`);
                    return false;
                }
                if (item.collection == '') {
                    this.valiData(`${item.name}请填写人均领取次数!`);
                    return false;
                }
                if (Number(item.collection) > 999 || Number(item.collection) < 1) {
                    this.valiData(`${item.name}人均领取次数范围1-999!`);
                    return false;
                }
            }
            return true;
        },
        saveConfig: function(type) {
            if (!this.checkForm()) return;
            if (this.editId == '') {
                this.addConfig(type);
            } else {
                this.ediConfig(type);
            }
        },
        async addConfig(type) { //增加活动
            let arr = [];
            let obj = {
                couponIds: []
            };
            for (let item of this.couponLists) {
                let value = {
                    "id": item.id, //优惠券ID
                    "type": item.type, //优惠券类型
                    "name": item.name,
                    "isCeiling": item.integralId, //是否设置券总量上限 1是 0否
                    "ceilingNum": item.voucheramount, //上限数量 int 10
                    "isBuy": item.expirationTimeId, //是否参与购买 1是 0否
                    "price": item.purchasevoucher, //购买价格
                    "perCapitaNum": item.collection, //人均 领券次数
                    "isShelves": 1 //是否上架 1是 0否
                }
                obj.couponIds.push(value);
            }
            arr.push(obj);
            await http.fissionActivity({
                data: {
                    type: 7, //活动类别
                    mouldType: 0, //长期活动模板
                    name: this.activityName, //活动名
                    objectType: 2, //活动对象
                    startTime: parseInt(this.startObj.time / 1000), //开始时间
                    endTime: parseInt(this.endObj.time / 1000), //结束时间
                    isAuto: type, //保存 
                    rule: JSON.stringify(arr)
                }
            });
            let message = (type == 0) ? '保存成功' : '发布成功';
            this.valiData(message);
            this.closePage();
        },
        async ediConfig(type) {
            let activityDetail = {}; //data
            activityDetail.type = 7;
            activityDetail.mouldType = 0;
            activityDetail.name = this.activityName;
            activityDetail.objectType = 2;
            activityDetail.startTime = parseInt(this.startObj.time / 1000);
            activityDetail.endTime = parseInt(this.endObj.time / 1000);
            activityDetail.isAuto = type;
            activityDetail.rule = [];
            let arr = [];
            let obj = {
                id: this.ruleId,
                couponIds: []
            };
            for (let item of this.couponLists) {
                let value = {
                    "id": item.id, //优惠券ID
                    "type": item.type, //优惠券类型
                    "name": item.name,
                    "isCeiling": item.integralId, //是否设置券总量上限 1是 0否
                    "ceilingNum": item.voucheramount, //上限数量 int 10
                    "isBuy": item.expirationTimeId, //是否参与购买 1是 0否
                    "price": item.purchasevoucher, //购买价格
                    "perCapitaNum": item.collection, //人均 领券次数
                    "isShelves": item.isShelves //是否上架 1是 0否
                }
                obj.couponIds.push(value);
            }
            arr.push(obj);
            activityDetail.rule = arr;
            await http.fissionActivity({
                data: {
                    activityId: this.editId, //任务Id
                    data: JSON.stringify(activityDetail)
                }
            });
            let message = (type == 0) ? '保存成功' : '发布成功';
            this.valiData(message);
            this.closePage();
        },
        async newgetActivityDetail(item) {
            // 获取活动的详情
            let data = await http.newgetActivityDetail({
                data: {
                    activityId: item.id,
                    type: item.type,
                    mouldType: item.mouldType
                }
            });
            if (data) {
                this.activityName = data.name; //活动名称
                this.startObj.time = data.startTime * 1000; //开始时间
                this.endObj.time = data.endTime * 1000; //结束时间
                this.ruleId = data.rule[0].id; //规则id 
                //拆分优惠券
                let couponIds = JSON.parse(data.rule[0].couponIds);
                for (let item of couponIds) {
                    let obj = {
                        id: item.id, //优惠券的id
                        type: item.type, //优惠券的type
                        name: item.name, //优惠券名称
                        integralTime: item.isCeiling == 0 ? '无上限' : '自定义',
                        integralId: item.isCeiling, //券总量 0 无上限 1 自定义
                        expirationTime: item.isBuy == 0 ? '不参与' : '参与',
                        expirationTimeId: item.isBuy, //参与购券 0 不参与 1 参与
                        voucheramount: item.ceilingNum, //券总分量填写的数量
                        purchasevoucher: item.price, //购券填写的数量
                        collection: item.perCapitaNum, //人均领取的次数   
                        isShelves: item.isShelves,
                        modify: true
                    }
                    this.couponLists.push(obj);
                }
            }
        },
        modifyStatus: function(item) { //修改优惠券上下架状态
            item.isShelves = Boolean(Number(item.isShelves));
            item.isShelves = !item.isShelves;
            item.isShelves = Number(item.isShelves);
        },
        keepValue: function(ind) { //保留两位小数
            this.couponLists[ind].purchasevoucher = utils.toFloatStr(this.couponLists[ind].purchasevoucher, 2);
        },
    },
    components: {
        calendar: () =>
            import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
        'singleSelect': () =>
            import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select'),
        selectBtn: () =>
            import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
        'birthCoupon': () =>
            import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
    },
    mounted() {
        this.$store.commit('setPageTools', [{
            name: '<返回活动列表',
            className: ['activity'],
            fn: () => {
                this.closePage();
            }
        }]);
        let activityInfo = storage.session('activityInfo');
        let activityDetail = storage.session('activityDetail');
        if (activityDetail) {
            this.isactivityDetail = false;
        }               
        if (activityInfo) {
            this.editId = activityInfo.id;
            this.newgetActivityDetail(activityInfo);
        }
    },
    beforeDestroy() {
        //将编辑的任务缓存清掉
        storage.session('activityInfo', null);
        storage.session('activityDetail', null);
    }
}
</script>
<style type="text/css" scoped>
#addcouponAct {
    width: 1200px;
    height: auto;
}

#addcouponAct .online-box {
    width: 100%;
    height: auto;
    min-height: 40px;
    margin-bottom: 29px;
}

#addcouponAct .online-box .online-sub {
    display: block;
    font-size: 16px;
    width: 110px;
    height: 40px;
    line-height: 40px;
    color: #333;
    text-align: right;
    margin-right: 14px;
}

#addcouponAct .online-box .rightHalf {
    max-width: 1000px;
    height: auto;
    float: left;
}

#addcouponAct .online-box .rightHalf .state {
    height: 40px;
}

#addcouponAct .online-box .rightHalf .state span,
#addcouponAct .online-box .rightHalf .state a {
    float: left;
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    min-width: 50px;
    margin-right: 20px;
}

#addcouponAct .online-box .rightHalf .state a {
    color: #28a8e0;
}

#addcouponAct .online-box .rightHalf .couponNum {
    margin-top: 19px;
}

#addcouponAct .online-box .rightHalf .name,
#addcouponAct .online-box .rightHalf .coupon {
    width: 280px;
    height: 40px;
    background-color: #ffffff;
    border: solid 1px #cecdcd;
    text-indent: 15px;
    margin-right: 15px;
}

#addcouponAct .online-box .handle-tips {
    height: 40px;
    line-height: 40px;
    text-indent: 25px;
    background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
    color: #999999;
}

#addcouponAct .online-box .rightHalf span {
    line-height: 40px;
}

#addcouponAct .online-box .rightHalf .title {
    max-width: 800px;
    height: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding-top: 10px;
}

#addcouponAct .online-box .rightHalf .title .active {
    background-color: #B3B3B3;
}

#addcouponAct .online-box .rightHalf .title li {
    /* float: left; */
    display: inline-block;
    min-width: 100px;
    height: 40px;
    margin-right: 10px;
    background-color: #f2f2f2;
    text-align: center;
    line-height: 40px;
    position: relative;
    padding: 0 10px;
}

#addcouponAct .online-box .rightHalf .title li:hover i.deletes {
    position: absolute;
    right: -12px;
    top: -12px;
    background: url(../../../res/images/delete.png) center center no-repeat;
    height: 30px;
    width: 30px;
    cursor: pointer;
}

#addcouponAct .online-box .rightHalf .content {
    width: 800px;
    height: 430px;
    border: 1px solid #b3b3b3;
    padding: 26px 0 0 31px;
}

#addcouponAct .online-box .rightHalf .secbox {
    height: 40px;
    border: 1px solid #CECDCD;
    margin-right: 16px;
    float: left;
}

#addcouponAct .online-box .rightHalf .secbox .cumulative {
    width: 188px;
    height: 38px;
    border: 1px solid #eaeaea;
    float: left;
    outline: none;
    text-indent: 17px;
}

#addcouponAct .online-box .rightHalf .secbox span {
    display: block;
    float: left;
    width: 38px;
    height: 38px;
    font-size: 16px;
    text-align: center;
    line-height: 38px;
    border-left: 1px solid #CECDCD;
}
</style>