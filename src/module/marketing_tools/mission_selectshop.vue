<template>
    <div class="detLi">
        <div @click="shop" class="select-body-btn select-btn">
            <span ref="spanBtn">{{selectedShop}}</span>
            <em>
                <i></i>
            </em>
        </div>
        <div v-if="showShop" @click.stop class="detDiv" style="width: 600px;top: 52px;left: -215px;">
            <i class="detI" style="left: 370px;"></i>
            <div class="detH3" style="text-align: left;max-height: 500px;overflow: auto;">
                <div class="jobBtn">
                    <a href="javascript:void(0)" @click="chooseShop('all')" class="job" :class="{'selectbtn' : shopType == 'all'}">全部</a>
                    <a href="javascript:void(0)" @click="chooseShop('brand')" class="job" :class="{'selectbtn' : shopType == 'brand'}">直营店</a>
                    <a href="javascript:void(0)" @click="chooseShop('shop')" class="job" :class="{'selectbtn' : shopType == 'shop'}">加盟店</a>
                </div>
                <ul>
                    <li class="all" @click="selJob()" :class="{'active': allShop}">全部</li>
                    <li @click="selJob(item)" :class="{'active': item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>
                </ul>
            </div>
            <div class="detLiBtn">
                <span class="gray" @click="cancel()">取消</span>
                <span class="yellow" @click="ensure()">确定</span>
            </div>
        </div>
    </div>
</template>
<script>
    import storage from "src/verdor/storage";
    export default {
        data() {
            return {
                shopType: 'all',
                allShop: false,
                showShopList: [], //展示的列表
                shopList: [], //所有店铺列表
                showShop: false, //选择框显示隐藏
                selectedShop: '',
                shopIds: [], //选中的店铺
            }
        },
        props: ['show', 'reset'],
        mounted() {
            this.init();
        },
        watch: {
            'show': function() {
                this.showShop = false;
            },
            'reset': function() {
                this.selectedShop = '请选择店铺';
                this.init();
                this.shopIds = [];
            }
        },
        methods: {
            init() {
                let res = storage.session('shopList');
                for (let i = 0; i < res.length; i++) {
                    res[i].selected = false;
                }
                this.shopList = res;
                this.showShopList = res;
                for (let i = 0; i < this.shopList.length; i++) {
                    this.selectedShop += this.shopList[i].shopName + ',';
                    this.shopIds.push(this.shopList[i].id);
                }
                this.selectedShop = this.selectedShop.slice(0, this.selectedShop.length - 1)
                this.isSelected(this.shopIds, this.shopList);
                this.isAll(this.showShopList) ? this.allShop = true : this.allShop = false;
            },
            shop() {
                this.showShop = !this.showShop
                if (this.shopList.length != 0) {
                    this.isSelected(this.shopIds, this.shopList);
                    this.isAll(this.showShopList) ? this.allShop = true : this.allShop = false;
                }
            },
            //展开门店，已经选择则显示选中
            isSelected(list, res) {
                for (let j = 0; j < res.length; j++) {
                    res[j].selected = false
                    for (let i = 0; i < list.length; i++) {
                        if (list[i] == res[j].id) {
                            res[j].selected = true;
                        }
                    }
                }
            },
            isAll(list) {
                for (let i = 0; i < list.length; i++) {
                    if (!list[i].selected) {
                        return false
                    }
                    return true
                }
            },
            //选择店铺
            selJob(item) {
                let index = 0;
                if (!item) { //门店全部选择
                    if (this.isAll(this.showShopList)) {
                        for (let i = 0; i < this.showShopList.length; i++) {
                            this.showShopList[i].selected = false;
                            this.allShop = false;
                        }
                    } else {
                        for (let i = 0; i < this.showShopList.length; i++) {
                            this.showShopList[i].selected = true;
                            this.allShop = true;
                        }
                    }
                } else { //点击单个门店选择
                    item.selected = !item.selected;
                    for (let i = 0; i < this.showShopList.length; i++) {
                        if (this.showShopList[i].selected) {
                            index++;
                        }
                    }
                    index == this.showShopList.length ? this.allShop = true : this.allShop = false;
                }
            },
            //门店类型选择
            chooseShop(type) {
                this.shopType = type;
                this.showShopList = [];
                if (type === 'all') { //全部
                    this.showShopList = this.shopList;
                } else if (type === 'brand') { //直营店
                    for (let i = 0; i < this.shopList.length; i++) {
                        if (this.shopList[i].ischain == '1') {
                            this.showShopList.push(this.shopList[i]);
                        }
                    }
                } else if (type === 'shop') { //加盟店
                    for (let i = 0; i < this.shopList.length; i++) {
                        if (this.shopList[i].ischain == '2') {
                            this.showShopList.push(this.shopList[i]);
                        }
                    }
                }
                this.isAll(this.showShopList) ? this.allShop = true : this.allShop = false;
            },
            //判断是否全部选中
            isAll(data) {
                if (data.length == 0) return false;
                for (var i = 0; i < data.length; i++) {
                    if (!data[i].selected) {
                        return false
                    }
                }
                return true
            },
            //确定
            ensure() {
                this.showShop = false;
                this.selectedShop = '';
                this.shopIds = [];
                for (let i = 0; i < this.shopList.length; i++) {
                    if (this.shopList[i].selected) {
                        this.selectedShop += this.shopList[i].shopName + ',';
                        this.shopIds.push(this.shopList[i].id);
                    }
                }
                this.selectedShop = this.selectedShop.slice(0, this.selectedShop.length - 1)
                if (!this.selectedShop) this.selectedShop = '请选择店铺';
                this.$emit('returnShop', this.shopIds, this.selectedShop)
            },
            //取消
            cancel() {
                this.showShop = false;
                this.$emit('returnShop');
            }
        },
    }
</script>
<style scoped>
    .detLi {
        position: relative;
        cursor: pointer;
        display: inline-block;
        margin-left: 0
    }
    .detLi .detDiv {
        display: inline-block;
        width: 300px;
        background: #45404b;
        ;
        position: absolute;
        top: 45px;
        right: 0;
        box-shadow: 3px 2px 10px #ccc;
        z-index: 2000;
    }
    .detLi .detDiv .detI {
        width: 0;
        height: 0;
        line-height: 0;
        position: absolute;
        top: -10px;
        right: 30%;
        border-width: 10px;
        border-top: 0px;
        border-style: solid;
        border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
    }
    .detLi .detDiv .detH3 {
        line-height: 30px;
        color: #e6e6e7;
        text-align: center;
        margin: 10px 30px;
        min-height: 200px;
    }
    .detLi .detLiBtn {
        overflow: hidden;
        float: left;
        width: 100%;
    }
    .detLi .detDiv ul li {
        display: inline-block;
        height: 40px;
        border: 1px solid #fff;
        padding: 5px 10px;
        margin: 5px
    }
    .detLi .detDiv ul li.active {
        background: url(../../res/images/sign.png) right 103% no-repeat;
        border-color: #FF9800;
        color: #FF9800;
    }
    .detLi .jobBtn {
        margin-bottom: 20px;
    }
    .detLi .jobBtn .job {
        margin-right: 20px;
        font-size: 18px;
        width: 80px;
        color: #fff;
    }
    .detLi .jobBtn .selectbtn {
        color: #FF9200;
        border-bottom: 4px solid #FF9200;
    }
    .detLi .detLiBtn span {
        float: left;
        color: #fff;
        width: 50%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .select-body-btn {
        height: 40px;
        position: relative;
        cursor: pointer;
        vertical-align: middle;
        display: inline-block;
        border: #b3b3b3 solid 1px;
    }
    .select-body-btn em {
        width: 40px;
        height: 38px;
        position: absolute;
        right: 0;
        top: 0;
        border-left: 1px solid #b3b3b3;
    }
    .select-body-btn em i {
        height: 10px;
        width: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -5px;
        margin-left: -5px;
        border-top: 10px solid #b3b3b3;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        box-sizing: border-box;
    }
    .select-body-btn span {
        width: 240px;
        height: 38px;
        line-height: 38px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 5px;
        color: #666666;
        padding-right: 40px;
    }
</style>