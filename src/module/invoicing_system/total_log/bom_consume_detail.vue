<template>
    <div class="goods-batch-log">
        <div class="page-head">物料信息</div>

        <div class="content">
            <div class="col">
                <li>物料名称:&nbsp;{{materialInfo.name}}</li>
                <li>物料简码:&nbsp;{{materialInfo.BC}}</li>
                <li>品牌:&nbsp;{{materialInfo.brandName}}</li>
                <li>批次数:&nbsp;{{materialInfo.num}}</li>
            </div>
            <div class="col">
                <li>物料类型:&nbsp;{{materialInfo.typeName}}</li>
                <li>物料单位:&nbsp;
                    <template v-for="(a,ai) in materialInfo.unit">
                        {{a.name}}
                        <i :key="ai" v-if="ai != materialInfo.unit.length -1 ">&nbsp;,&nbsp;</i>
                    </template>
                </li>
                <li>默认单位:&nbsp;{{materialInfo.defUnitName}}</li>
                <li>最小单位:&nbsp;{{materialInfo.minUnitName}}</li>
            </div>
            <div class="col">
                <li>单位换算:&nbsp;
                    <template v-for="(a,ai) in materialInfo.unit">
                        1{{a.name}}={{a.value}}{{materialInfo.minUnitName}}
                        <i :key="ai" v-if="ai != materialInfo.unit.length -1 ">&nbsp;;&nbsp;</i>
                    </template>
                </li>
                <li>分类:&nbsp;
                    <template v-for="(a,ai) in materialInfo.cate">
                        {{a.name}}
                        <i :key="ai" v-if="ai != materialInfo.cate.length -1 ">&nbsp;,&nbsp;</i>
                    </template>
                </li>
                <li>库存总量:&nbsp;{{materialInfo.sumStoreNum}}</li>
                <li>保质期:&nbsp;{{materialInfo.validity}}{{materialInfo.validityTypeName}}</li>
            </div>
        </div>
        <div class="page-head">操作记录</div>
        <div class="info">
            <div class="col">
                <li>操作人:&nbsp;</li>
                <li>商品名称:&nbsp;</li>
                <li>毛料:&nbsp;</li>
            </div>
            <div class="col">
                <li>操作时间:&nbsp;</li>
                <li>操作前数量:&nbsp;</li>
                <li>净料:&nbsp;</li>
            </div>
            <div class="col">
                <li>操作类型:&nbsp;</li>
                <li>操作后数量:&nbsp;</li>
                <li>出成率:&nbsp;</li>
            </div>
            <div class="col">
                <li>消耗仓库:&nbsp;</li>
            </div>
        </div>
    </div>
</template>
<script>
/*
    请求:
        获取bom单消耗详情:InvoicingGetLogDetail
*/
import http from 'src/manager/http';
import global from 'src/manager/global';

export default {
    data () {
        return {
            materialType:[
                {id:0,name:'成品'},
                {id:1,name:'半成品'},
                {id:2,name:'普通物料'}
            ],
            valiDate:[
                {id:0,name:'月'},
                {id:1,name:'日'},
                {id:2,name:'年'},
            ],
            materialInfo:{},
            logId:50,                       //日志id
            materialId:18,                  //物料id
        };
    },
    methods: {

        async getMaterialDetail(){
            let info = {};
            info = await this.getHttp('MaterialGetMaterialDetail',{mid:this.materialId,wid:0,isDistribution:0});
            if(this.toRaw(info,'Object')){
                info.typeName = this.getAttr(this.materialType,info.type);
                this.getMaterialUnitInfo(info,'unit');
                info.sumStoreNum = global.comUnit(info.num, info.defUnitVal, info.defUnitName, info.minUnitName);
                info.validityTypeName = this.getAttr(this.valiDate,info.validityType);
                this.materialInfo = info;
            }
        },
        async getHistory(){
            let retData = {};

            retData = await this.getHttp('InvoicingGetLogDetail',{logId:this.logId});
            console.log(retData);

        },
        getMaterialUnitInfo(ele,id,attr='unit'){
            //获取物料的单位信息
            if(!Array.isArray(ele[attr])){
                ele[attr] = [];
            }
            for(let item of ele.unit){
                if(item.isMin == 1){
                    ele.minUnitName = item.name;
                    ele.minUnitId = item.muId;
                }
                if(item.isDefault == 1){
                    ele.defUnitName = item.name;
                    ele.defUnitId = item.muId;
                    ele.defUnitVal = item.value;
                }
                if(id == item.muId){
                    ele.selUnitName = item.name;
                    ele.selUnitId = item.muId;
                    ele.selUnitVal = item.value;
                }
            }

            if(!id){
                ele.selUnitId = ele.defUnitId;
                ele.selUnitName = ele.defUnitName;
                ele.selUnitVal = ele.defUnitVal;
            }
         
        },
		getAttr(arr,val,attr='id'){
			let getAttr = 'name';
			if(!Array.isArray(arr)) arr = [];
			for(let ele of arr){
				if(ele[attr] == val) return ele[getAttr];
			}
        },
		async getHttp(url,obj={}){
			let res = await http[url]({data:obj});
			return res;
        },
		generatorDate(time){
			//生成日期对象
			let date = {};
			if(!time){
				time = new Date();
			}else if(typeof time == 'number' || typeof time == 'string'){
				time = Number(time);
				time = new Date(time);
			}
			date = {
				year: time.getFullYear(),
				month: time.getMonth(),
				day: time.getDate(),
				hour: time.getHours(),
				minute: time.getMinutes(),
				second:time.getSeconds(),
				week:0,
				str:'',
                time:'',
                dateTime:'',          
			}
			let {year,month,day,hour,minute} = date;
            month += 1;
			hour = hour > 9 ? hour : '0'+hour;
			minute = minute > 9 ? minute : '0'+minute;
            date.time = `${hour}:${minute}`;
            date.dateTime = `${year}-${month}-${day}`;
			date.str = `${year}-${month}-${day} ${hour}:${minute}`;
			return date;
        },
        toRaw(val,type){
            return Object.prototype.toString.call(val).slice(8,-1) === type;
        },
    },
    components: {

    },
    mounted(){
        this.getMaterialDetail();
        this.getHistory();
    },
};
</script>
<style lang='less' scoped>
    @import url('../warehouse_manage/z_less.less');
    @table-border:1px solid #ebeef5;
    .inline-middle{
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }
    li{
        list-style: none;
    }
	.page-head{
		.split-div(80%);
    }
    .goods-batch-log{
        .info{
            display: flex;
            flex-flow: row wrap;
            margin-top: 20px;
            width:90%;
            padding-left:50px;
            .col{
                min-width:210px;
                flex-grow: 1;
                li{
                    .lfc(#606266,inherit,14px);
                    margin-bottom:20px;
                    padding-right: 10px;
                }
            }
        }
        .content{
            display: flex;
            flex-flow: row wrap;
            margin-top: 20px;
            width:90%;
            padding-left:50px;
            .col{
                min-width:210px;
                flex-grow: 1;
                li{
                    .lfc(#606266,inherit,14px);
                    margin-bottom:20px;
                    padding-right: 10px;
                }
            }
        }
    }
</style>