<template>
  <div class="assign-detail">
     <div class="opare-block">
        <el-tabs v-model="tabIndex"  @tab-click="handleClick">
        	<el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane v-if="filedGoodsNum != 0" label="仅显示失败信息" name="2"></el-tab-pane>
        </el-tabs>
     </div>
     <!-- 详情 -->
     <div class="opare-block">
      <div class="data-form__item line-item">
        <div class="div-box">
          <span class="box-span">任务名称：{{taskBaseData.name}}</span>
          <span class="box-span">发布时间：{{taskBaseData.publishTime | formatTime}}</span>
          <span class="box-span">创建人：{{taskBaseData.createUser}}</span>
          <span class="box-span">发布人：{{taskBaseData.publishUser}}</span>
        </div>
        <div class="div-box">
          <span class="box-span other-span" style="color:#A5A5A5">本次指派任务共指派<span style="color:#E8C148;">{{totalTaskGoodsNum}}</span>个商品</span>
          <span class="box-span other-span" style="color:#9FB485;">{{successGoodsNum}}个商品指派成功</span>
          <span class="box-span other-span" style="color:#F5535C;">{{filedGoodsNum}}个商品指派失败</span>
        </div>
      </div>
     </div>
    <!-- 全部 -->
    <div class="opare-block" v-if="tabIndex == '1'">
      <div class="data-form__item line-item" v-for="(item,index) in taskLog" :key="index">
        <template v-if="item.succArr.length>0">
          <div class="t-name" style="margin-bottom:10px;">{{item.name}}</div>
          <!-- 成功的 -->
          <div class="t-info">
            <span @click="handleOpenD(item)" style="cursor:pointer;color:#8DAF57;margin-bottom: 10px;display: block;">{{item.succArr.length}}个商品成功<i class="el-icon-arrow-down" :class="{'el-icon-arrow-up':item.opened}"></i></span>
            <template v-if="item.opened">
                <div style="display:flex;width:100%;align-items: baseline;margin-bottom:10px;">
                  <span style="100px;">
                    指派属性：
                  </span>
                  <div style="flex:1;">
                    <span style="margin: 5px 5px 0;display:inline-block;" v-for="(ft,fi) in item.fieldsType" :key="fi">{{ft}}</span>
                  </div>
                </div>
                <div style="display:flex;width:100%;align-items: baseline;margin-bottom:10px;">
                  <span style="100px;">指派商品：</span>
                  <div style="flex:1;">
                    <span style="margin: 5px 5px 0;display:inline-block;" v-for="(sd,si) in item.succArr" :key="si">{{sd.name}},</span>
                  </div>
                </div>
            </template>
            
          </div>
        </template>
        <template v-if="item.filedArr.length>0">
          <div class="t-name" style="margin-bottom:10px;">{{item.name}}</div>
          <!-- 失败的 -->
          <div class="t-info" >
            <span @click="handleOpenD(item)"  style="cursor:pointer;color:#F5535C;margin-bottom: 10px;display: block;">{{item.filedArr.length}}个商品失败<i class="el-icon-arrow-down":class="{'el-icon-arrow-up':item.opened}"></i></span>
            <template v-if="item.opened">
              <div style="display:flex;width:100%;align-items: baseline;margin-bottom:10px;">
                <span style="100px;">
                  指派属性：
                </span>
                <div style="flex:1;">
                  <span style="margin: 5px 5px 0;display:inline-block;" v-for="(ft,fi) in item.fieldsType" :key="fi">{{ft}}</span>
                </div>
              </div>
              <div style="display:flex;width:100%;align-items: baseline;margin-bottom:10px;">
                <span style="100px;">指派商品：</span>
                <div style="flex:1;">
                  <span style="margin: 5px 5px 0;display:inline-block;" v-for="(fed,fei) in item.filedArr" :key="fei">{{fed.name}},</span>
                </div>
              </div>
              <div style="color:#F5535C;margin-top:10px;">
                <span>失败原因：</span>
                <span >{{item.filedRes}}</span>
              </div>
            </template> 
          </div>
        </template>
        
      </div>
    </div>
    <!-- 失败 -->
    <div class="opare-block" v-if="tabIndex == '2' && filedGoodsNum !=0 ">
      <div class="data-form__item line-item" v-for="(item,index) in onlyFiledLog" :key="index">
        <template v-if="item.filedArr.length>0">
          <div class="t-name" style="margin-bottom:10px;">{{item.name}}</div>
          <!-- 失败的 -->
          <div class="t-info" >
            <span @click="handleOpenD(item)"  style="cursor:pointer; color:#F5535C;margin-bottom: 10px;display: block;">{{item.filedArr.length}}个商品失败<i class="el-icon-arrow-down":class="{'el-icon-arrow-up':item.opened}"></i></span>
            <template v-if="item.opened">
              <div style="display:flex;width:100%;align-items: baseline;">
                <span style="100px;">
                  指派属性：
                </span>
                <div style="flex:1;">
                  <span style="margin: 5px 5px 0;display:inline-block;" v-for="(ft,fi) in item.fieldsType" :key="fi">{{ft}}</span>
                </div>
              </div>
              <div style="display:flex;width:100%;align-items: baseline;">
                <span style="100px;">指派商品：</span>
                <div style="flex:1;">
                  <span style="margin: 5px 5px 0;display:inline-block;" v-for="(fed,fei) in item.filedArr" :key="fei">{{fed.name}},</span>
                </div>
              </div>
              <div style="color:#F5535C;margin-top:10px;">
                <span>失败原因：</span>
                <span >{{item.filedRes}}</span>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div v-if="onlyFiledLog.length <=0">
        <div style="padding:20px 0;text-align:center;">
          暂无失败信息
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'src/verdor/storage'; 
import http from 'src/manager/http';
import utils from  'src/verdor/utils'; 
export default {
  name: "goods_assign_detail",
  data: function() {
    return {
      tabIndex:'1',
      taskDataList:[],

      allTaskGoods:[], // 指派的所有商品
      sucssTaskGoods:[], // 指派成功的商品
      failedTaskGoods:[], // 指派失败的商品
      successGoodsNum:0,
      filedGoodsNum:0,

      totalTaskGoodsNum:0,

      taskLog:[],
      onlyFiledLog:[],
    };
  },
  props:{
    detailInfo:{
      type:Object,
      default:()=>{}
    },
    detailData:{
      type:Object,
      default:()=>{}
    },
    goodList:{
      type:Array,
      default:[]
    },
    allShop:{
      type:Array,
      default:[]
    },
    tempTitleList:{
      type:Array,
      default:[]
    },
    filedMsg:{
      type:Array,
      default:[]
    }
  },
  computed:{
    // 任务基本信息
    taskBaseData(){
      let data = {}
      let obj = utils.deepCopy(this.detailData);
			data.name  = obj.name; // 任务名称；
      data.selectGoods = obj.assignIds.split(',') // 商品信息
      data.publishTime = obj.publishTime;
      data.createUser  = obj.createUser;
      data.publishUser = obj.publishUser;
      return data;
    },
  },
  created(){
      this.initBtnTools();
  },
  methods: {
    // 初始化添加按钮
    initBtnTools() {
      let arr = [
        // {
        //   name: "导出",
        //   type: 7,
        //   icon: "el-icon-edit-outline",
        //   className: "default",
        //   fn: () => {
        //     this.addGoBack("back");
        //   }
        // },
        {
          name: "返回",
          type: 7,
          icon: "el-icon-back",
          className: "info",
          fn: () => {
            this.addGoBack("back");
          }
        }
      ];
      this.$store.commit("setPageTools", arr);
    },
    // 返回主页
    addGoBack() {
      this.$emit("addGoBack",);
    },
    // tab切换
    handleClick(res){
      let currentTab = this.tabIndex;
      console.log(this.tabIndex)
    },
    // 获取详情
    getTaskDetail(){
     
    },
    // 任务信息处理
    handleTaskData(){
      console.log(this.detailInfo,'detailInfo') // 请求的详情信息
      // console.log(this.detailData,'detailData') // 请求的任务信息
      let dataObj = utils.deepCopy(this.detailData);

      let infoObj = utils.deepCopy(this.detailInfo);
      let arr = [];
      let succArr = [];
      let filedArr = [];
      let logArr =[];

      this.totalTaskGoodsNum = infoObj.assignIds.split(',').length * infoObj.log.length;
      this.taskLog = [];
      infoObj.log.map((item,index)=>{
          let obj = {};
          obj.conditions = item.conditions;
          obj.shopId = item.shopId;
          obj.assignIds = infoObj.assignIds;
          // console.log(item,'itemitemitem')
          if(item.logData.length <=0){
            obj.succArr = infoObj.assignIds.split(',');
            obj.filedArr = [];
            this.successGoodsNum = obj.succArr.length * infoObj.log.length;
            this.filedGoodsNum = 0;
          }else{
            for(let k in item.logData){
                let els = item.logData[k];
                obj.filedArr = els.assignIds.concat(els.otherIds);
                obj.filedRes = this.filedMsg[k];
                this.filedGoodsNum = obj.filedArr.length;
                this.successGoodsNum =this.totalTaskGoodsNum - this.filedGoodsNum;
            }
            obj.succArr = []
          }
          arr.push(obj);        
      });

    console.log(arr,'arrarr')
    
      arr.map((item,index)=>{
        let obj = {};
        
        obj.name = this.getShopName(item.shopId);
        obj.goods = this.getSelectGoods(item.assignIds.split(','))
        obj.priceType = this.getPriceType(item.conditions.priceType)
        obj.templateId = this.getTempName(item.conditions.templateId)
        obj.fieldsType = this.getGoodsType(item.conditions.fieldsType)
        obj.succArr = this.getSelectGoods(item.succArr);
        obj.filedArr = this.getSelectGoods(item.filedArr);
        obj.opened = false;
        obj.filedRes = item.filedRes;
        logArr.push(obj);

        logArr.forEach(item=>{
          if(item.filedArr.length>0){
            this.onlyFiledLog.push(item)
          }
        })

        this.taskLog = logArr;
      })
     
    },
    getShopName(shopId){
      let name = '';
      if(shopId != ''){
        let o ={ shopId:'',  name:''};
        let shop = this.allShop.find(item=>{
          return item.id == shopId;
        })
        name = shop.shopName;
        return name;
      }
    },
    getSelectGoods(goodIds){
        goodIds = goodIds || goodIds.split(','); 
        let goodsArr = [];
        if(goodIds.length>0){
           this.goodList.map(item=>{
            let o ={ id:'',  name:''}
              goodIds.map(el=>{
                  if(item.id == el){
                      o ={ id:el,name:item.goodsName};
                      goodsArr.push(o);
                  }
              })
          })
        }
        return goodsArr;
    },
    getPriceType(type){
        let arr =[];
        type.map(item=>{
            let res = ''
            switch(item){
                case '1':
                    res=  '商品基础价格';
                    break;
                case '2':
                    res =  '商品会员价';
                    break;
                case '3':
                    res =  '商品特价';
                    break;
                default:
                    return;        
            }
            arr.push(res)
        })
        return arr; 
    },
    getGoodsType(type){
        // 1商品价格，2商品名称 3商品分类 4商品口味 5其他信息；
        let arr =[];
        type.map(item=>{
            let res = ''
            switch(item){
                case '1':
                    res=  '商品价格';
                    break;
                case '2':
                    res =  '商品名称';
                    break;
                case '3':
                    res =  '商品分类';
                    break;
                case '4':
                    res =  '商品口味';
                    break;
                case '5':
                    res =  '其他信息';
                    break;        
                default:
                    return;        
            }
            arr.push(res)
        })
        return arr; 
    },
    getTempName(id){
        let name = '';
        if(id == '0'){
            name = '原始价格'
        }else{
            let item = this.tempTitleList.find(v=>{
                return id == v.id
            })
            name = item.name
        }
        return {id,name};
        
    },
    handleOpenD(item){
      let els = this.taskLog.find(v=>{
        return v.name == item.name
      })
      els.opened = !els.opened
    },
    
  
  },
  filters:{
			formatTime(time,format){
        format = format || 'yyyy-qq-MM dd:hh:mm';
				if(time != '0'){
					return utils.format(time,format)
				}else{
					return '--';
				}
			},
		},
  mounted(){
    this.handleTaskData();
  }
};
</script>

<style lang="less" scoped>
.data-form__item{
	padding: 15px 0;
	margin-bottom: 20px;
	.el-form-item{
		margin: 0;
	}
	&.line-item{
		border-bottom: 1px solid #dcdfe6;
	}
	&.template-item{
		.el-radio.is-bordered{
			margin-bottom: 20px;
		}
	}
}
.div-box{
	padding: 5px 0;
	.box-span{
		margin-right: 20px;
		display: inline-block;
		&.other-span{
			font-size: 12px;
		}
	}
}
</style>