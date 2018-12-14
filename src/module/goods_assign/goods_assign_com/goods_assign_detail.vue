<template>
  <div class="assign-detail">
     <div class="opare-block">
        <el-tabs v-model="tabIndex"  @tab-click="handleClick">
        	<el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="仅显示失败信息" name="2"></el-tab-pane>
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
      111{{ detailInfo }}
    </div>
    <!-- 失败 -->
    <div class="opare-block" v-if="tabIndex == '2'">
      222
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
      detailInfo:[],

      allTaskGoods:[], // 指派的所有商品
      sucssTaskGoods:[], // 指派成功的商品
      failedTaskGoods:[], // 指派失败的商品
      successGoodsNum:0,
      filedGoodsNum:0,

      version:null,
      shopId:'',

      taskLog:[]
    };
  },
  props:{
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
    // 任务总商品数量
    totalTaskGoodsNum(){
      let num = 0;
      if(this.taskBaseData){
        num = this.taskBaseData.selectGoods.length;
      }
      return num;
    },
  },
  created(){
      this.initBtnTools()
  },
  methods: {
    // 初始化添加按钮
    initBtnTools() {
      let arr = [
        {
          name: "导出",
          type: 7,
          icon: "el-icon-edit-outline",
          className: "default",
          fn: () => {
            this.addGoBack("back");
          }
        },
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
    async getTaskDetail(){
      let data = await http.AssigntaskGetDetail({
        data:{
          id:Number(this.detailData.id),
          type:this.detailData.type
        }
      })
      if(data){
        this.detailInfo = data;
        let filedArr = [];
        this.taskLog = this.detailInfo.log;
        this.detailInfo.log.map(item=>{
          if(item.assignIds == ''){
              this.successGoodsNum = this.detailInfo.assignIds.split(',').length;
          }
          if(item.assignIds !== ''){
            filedArr.push(item);
            this.filedGoodsNum = this.detailInfo.assignIds.split(',').length - filedArr.length;
          }
          if(item.logData == '' ||  null ==item.logData){
            this.allTaskGoods = this.detailInfo.assignIds.split(',');
            this.sucssTaskGoods = this.allTaskGoods;
          }
        })
      }
    },
    // 任务信息处理
    handleTaskData(){
      console.log(this.goodList,'godd')
        // obj.conditions.map((item,index)=>{
        // 	let taskObj = {checkGoodsType: [],checkedComp: false,id: "",isCoerce: true,priceType: [],shopIds: [],templateId: "",title: ""};
          
        // 	taskObj = {
        // 		shopIds:item.shopIds.split(','),
        // 		priceType :item.priceType.split(','),
        // 		checkGoodsType : item.type.split(','),
        // 		templateId :item.templateId,
        // 		isCoerce : item.isCoerce == '1' ? true : false,
        // 		title : `模板${index+1}`,
        // 		id : `${index+1}`,
        // 		checkedComp : item.type.split(',').length == 5 ? true : false,
        // 	}

        // 	this.taskData.push(taskObj)
        // })
        

        // console.log(this.tabtaskDatasCont,'this.tabsCont')
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
  async mounted(){
    this.getTaskDetail();
    this.handleTaskData()
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