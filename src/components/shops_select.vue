/*
* @file
*
* 品牌--选择店铺
*
* @author 孔伟研
*/
<template>
    <div>
        <win @winEvent="getWin" :align="'center'" :width="700" :height="400" >
            <span slot="title">{{title}}</span>
            <div id = "shopTan" slot="content"  v-cloak>
                <div class="shop">
                    <div style="width:100%;height: 50px;overflow:hidden;margin-top:20px;margin-left:20px">
                        <a @click="selectShopType(-1)" class="raduobtn" :class="{'selectbtn' : shopType === -1}" href="javascript:void(0);">全部</a>
                        <a @click="selectShopType(1)" class="raduobtn" :class="{'selectbtn' : shopType === 1}" href="javascript:void(0);" style="">直营店</a>
                        <a @click="selectShopType(2)" class="raduobtn" :class="{'selectbtn' : shopType === 2}" href="javascript:void(0);" style="">加盟店</a>
                    </div>
                    <ul>
                    <div v-if = "showShopList.length == 0" style = "color:rgb(254, 141, 44)">没有店铺可选择，请先去申请店铺！</div>
                    <!--		
                        <div v-if = "goInCom == 'payMent'" v-for="(item,index) in showShopList" :key="index" style ="float:left;">
                            <li v-if="item.paySelected" style="background:#D2D2D2;">{{item.shopName}}</li>
                            <li v-else @click="selJob(item)" :class="{active: item.selected}">{{item.shopName}}</li>
                        </div>
                    -->
                        
                        <div style ="width:100%;" v-if="!isSingle">
                            <li @click="selJob(item)" :class="{active: item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>
                        </div>
                        <div v-else style ="width:100%;">
                            <li @click="singleShop(item)" :class="{singleActive: item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>
                        </div>
                    </ul>
                </div>
                <div class="bottomSel" v-if="!isSingle">
                    <section v-on:click = "allShops(0)" class="isallselect">取消全部</section>
                    <section v-on:click = "allShops(1)" class="isallselect allselect">选择全部</section>
                    <h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择:{{selectNum}}个</h3>
                </div>
            </div>
        </win>
    </div>

</template>
<script>
    import http from "src/manager/http";
    export default {
        data() {
            return {
                title: '编辑信息',
                list: [],
                // index: -1,
                isJob: true, //true职位弹窗内容 false门店弹窗内容
                isBrand: true, //true为品牌 false为门店
                shopType: -1, //门店类型 1直营店 2加盟店 -1全部
                jobType: 1, //品牌类型 1品牌 0门店
                jobList: [], //职位列表
                allJobList: [], //品牌和门店职位列表
                shopList: [], //店铺列表
                showShopList: [], //选择门店切换时展示的列表
                selectNum: 0, //选择的个数
                jobInfo: {
                    roleId: '',
                    name: '',
                    shopIds: []
                }, //选择的职位
                onIndex: -1,
            }
        },
        props:{
            shopIds :String, //所选则的店铺id  [0,1,2]这种格式
            isTitle:String,//titlt
            isSingle:Boolean, //是否单选  true 单选
        },
        mounted() {
            if(this.isTitle){this.title = this.isTitle}
            if(!this.shopIds){
                this.shopIds = '';
            }
            this.getShopList();
        },
        methods: {
            //获取门店列表
            async getShopList(){
                let res = await http.getShopList();
                for(let i = 0; i < res.length; i++){
                    res[i].selected = false;
                }
                this.shopList = res;
                this.showShopList = res;
                if(this.shopIds){
                    let shopIds = this.shopIds.split(',');
                    for(let m = 0; m < this.shopList.length; m++){
                        for(let n = 0; n < shopIds.length; n++){
                            if(shopIds[n] == this.shopList[m].id){
                                this.shopList[m].paySelected = true;
                                this.shopList[m].selected = true;
                            }
                        }
                    }
                    this.selectNum = 0;
                    for(let i = 0; i < this.shopList.length; i++){
                        if(this.shopList[i].selected){
                            this.selectNum++
                        }
                    }
                }
            },
            
            getWin(res) {
                var selectIds = '';
                let shop = ''; //单选时选中的店铺
                if(res == 'ok'){
                    for(let m = 0; m < this.shopList.length; m++){
                        if(this.shopList[m].selected){
                            selectIds =selectIds +this.shopList[m].id+ ',';
                            if(this.isSingle){
                                shop = this.shopList[m];
                            }
                        }
                    }
                    this.$emit("shopsSelect", res,selectIds,shop);
                }else{
                    this.$emit("shopsSelect", res);
                }
                
            },
            //门店类型切换
            selectShopType(type){
                this.shopType = type;
                this.showShopList = [];
                if(type === -1){ //全部
                    this.showShopList = this.shopList;
                }else if(type === 1){ //直营店
                    for(let i = 0; i < this.shopList.length; i++){
                        if(this.shopList[i].ischain == '1'){
                            this.showShopList.push(this.shopList[i]);
                        }
                    }
                }else if(type === 2){ //加盟店
                    for(let i = 0; i < this.shopList.length; i++){
                        if(this.shopList[i].ischain == '2'){
                            this.showShopList.push(this.shopList[i]);
                        }
                    }
                }
            },
            //门店选择
            selJob(item,i){
                item.selected = !item.selected;
                this.selectNum = 0;
                for(let i = 0; i < this.shopList.length; i++){
                    if(this.shopList[i].selected){
                        this.selectNum++
                    }
                }
            },
            //门店单选
            singleShop(item,i){
                this.shopList.forEach(e => {
                    e.selected = false;
                });
                item.selected = !item.selected;
            },
            //门店选择公用
            shopSel(type){
                if(this.shopType === -1){
                        for(let i = 0; i < this.showShopList.length; i++){
                            this.showShopList[i].selected = type;
                        }
                    }else if(this.shopType === 1){
                        for(let i = 0; i < this.showShopList.length; i++){
                            if(this.showShopList[i].ischain == '1'){
                                this.showShopList[i].selected = type;
                            }
                        }
                    }else if(this.shopType === 2){
                        for(let i = 0; i < this.showShopList.length; i++){
                            if(this.showShopList[i].ischain == '2'){
                                this.showShopList[i].selected = type;
                            }
                        }
                    }
            },
            //门店全部选择与取消
            allShops(type){
                if(type === 0){ //全部取消
                    this.shopSel(false);
                    this.selectNum = 0;
                }else { //全部选择
                    this.shopSel(true)
                    this.selectNum = 0;
                    for(let i = 0; i < this.shopList.length; i++){
                        if(this.shopList[i].selected){
                            this.selectNum++
                        }
                    }
                    // this.selectNum = this.showShopList.length;
                }
            },
        },
        components:{
            win: ()=> import (/*webpackChunkName: "win"*/ "src/components/win") 
        },
    }
</script>

<style type="text/css" scoped>
    #shopTan{
        position: relative;
        
    }
    #shopTan .selJobName{
        width: 200px;
        height: 40px;
        line-height: 40px;
        float: right;
        color: #FF9700;
        position:absolute;
        top:350px;
        right:20px;
    }
    .raduobtn{
        width: 120px;
        height:40px;
        line-height:40px;
        font-size:16px;
        float: left;
        border-radius: 5px;
        margin-right: 15px;
        background-color: #f2f2f2;
        color: #333;
    }
    .selectbtn{
        background-color: #2FA8DD;
        color: #fff;
    }
    .shop .active{
        background: url(../res/images/sign.png) right 103% no-repeat;
        border-color: #FF9800;
        color: #FF9800;
    }
    .shop ul {
        margin:10px 20px;
        height: 260px;
        overflow-y: auto;
    }
    .shop ul li{
        display: inline-block;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border: 1px solid #D2D2D2;
        text-align: center;
		cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .shop ul li.active{
        border-color: #FF9200;
        color: #FF9200;
        background: url("../res/images/sign.png") right bottom no-repeat; 
    }
    .shop ul li.singleActive{
        background: #FFEDD3;
        border-color: #FF9200;
        color: #FF9200;
    }
    .job {
        padding: 20px;
    }
    .sign{
        background: #FFEDD3;
        border-color: #FF9200 !important;
        color: #FF9200;
    }
    .bottomSel{
        width:100%;
        height: 30px;
        position: fixed;
        left: 14px;
    }
    .bottomSel .isallselect{
        cursor: pointer;
        width: 80px;
        height: 30px;
        float: left;
        line-height: 30px;
        text-align: center;
        margin:5px;
        border:1px solid #A0A0A0;
        color: #A0A0A0;
        float: left;
    }
    .bottomSel .allselect{
        border:1px solid #FF9700;
        color: #FF9700;
    }
</style>