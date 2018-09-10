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
                <li>操作人:&nbsp;{{operationInfo.createUName}}</li>
                <li>商品名称:&nbsp;{{operationInfo.goodsName}}</li>
                <li>毛料:&nbsp;{{operationInfo.change}}</li>
            </div>
            <div class="col">
                <li>操作时间:&nbsp;{{operationInfo.createTime}}</li>
                <li>操作前数量:&nbsp;{{operationInfo.changeBefore}}</li>
                <li>净料:&nbsp;{{operationInfo.netMaterial}}</li>
            </div>
            <div class="col">
                <li>操作类型:&nbsp;{{operationInfo.operationTypeName}}</li>
                <li>操作后数量:&nbsp;{{operationInfo.changeAfter}}</li>
                <li>出成率:&nbsp;{{operationInfo.yield}}</li>
            </div>
            <div class="col">
                <li>消耗仓库:&nbsp;{{operationInfo.wName}}</li>
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
            materialInfo:{},                //物料详情
            operationInfo:{},               //操作记录
            logId:'',                       //日志id
            materialId:'',                  //物料id
        };
    },
    methods: {
        //获取物料详情
        async getMaterialDetail(){
            let info = {};

            info = await this.getHttp('MaterialGetMaterialDetail',{mid:this.materialId,wid:0,isDistribution:0});
            if(this.toRaw(info,'Object')){
                //物料类型
                info.typeName = this.getAttr(this.materialType,info.type,'id','name');                                          
                this.getMaterialUnitInfo(info,'unit');                                                  
                //库存总量
                info.sumStoreNum = global.comUnit(info.num, info.defUnitVal, info.defUnitName, info.minUnitName);   
                //保质期类型
                info.validityTypeName = this.getAttr(this.valiDate,info.validityType,'id','name');
                this.materialInfo = info;
            }
        },
        async getHistory(){
            let retData = {};
            let info = this.materialInfo;
            
            retData = await this.getHttp('InvoicingGetLogDetail',{id:this.$route.query.logId});
            if(this.toRaw(retData,'Object')){
                retData.createTime = this.generatorDate(retData.createTime * 1000).str;
                retData.operationTypeName = 'BOM单消耗';
                //操作前
                retData.changeBefore = global.comUnit(retData.changeBefore, info.defUnitVal, info.defUnitName, info.minUnitName);
                //操作后
                retData.changeAfter = global.comUnit(retData.changeAfter, info.defUnitVal, info.defUnitName, info.minUnitName);
                //毛料
                retData.change = Math.abs(retData.change);                                  
                //净料
                retData.netMaterial = retData.change * retData.yield;     
                retData.netMaterial = retData.netMaterial.toFixed(3);
                retData.netMaterial = global.comUnit(retData.netMaterial, info.defUnitVal, info.defUnitName, info.minUnitName);   
                //出成率
                retData.yield = retData.yield * 100 + '%';   
                retData.change = global.comUnit(retData.change, info.defUnitVal, info.defUnitName, info.minUnitName);   
            }
            this.operationInfo = retData;
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
		getAttr(...args){
            let [arr=[],val,attr='type',getAttr='typeName'] = args;
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
		initBtn(){
			this.$store.commit('setPageTools',[
				{
					name: '返回',
					type:'5',
					className:'plain',
					fn:()=>{
						this.$router.go(-1);
					}
				}
			]);
		}
    },
    async mounted(){
        this.initBtn();
        let {mid:materialId,logId} = this.$route.query;
        this.logId = Number(logId);
        this.materialId = Number(materialId);
        
        if(typeof this.materialId == 'number'){
            await this.getMaterialDetail();
        }
        if(typeof this.logId == 'number'){
            await this.getHistory();
        }
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