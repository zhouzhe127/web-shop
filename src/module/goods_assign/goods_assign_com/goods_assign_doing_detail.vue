<template>
  <div class="doing-detail" ref="doingDetail">
     <!-- 标题名称 -->
    <div class="title-block">
        <span class="title-name">任务详情</span>
        <span class="title-line"></span>
    </div>
    <!-- 任务进度 -->
    <div class="opare-block">
        <span>任务名称：{{taskName}}</span>
        <span style="margin-left:40px;">指派进度：<el-progress :percentage="taskProgress" style="width:450px;display:inline-block;" color="#E0BA4E"></el-progress></span>
    </div>
    <!-- 选择商品 -->
    <div class="title-block">
        <span class="title-name">选择商品</span>
        <span class="title-line"></span>
    </div>
    <div class="opare-block">
       <el-form>
            <el-form-item label-width="100px" label="商品品牌:">
                <div class="info-block">已选择商品：{{selectGoods.length}}个</div>
                <div class="info-block">
                    <span class="block-item" v-for="(item) in selectGoods" :key="item.id">{{item.name}}，</span>
                </div>
            </el-form-item>
       </el-form>
    </div>
    <!-- 指派规则 -->
    <div class="title-block">
        <span class="title-name">指派规则</span>
        <span class="title-line"></span>
    </div>
    <div class="opare-block">
        <div class="temp-form-block">
            <!-- 模板切换 -->
            <el-tabs v-model="tabIndex" @tab-click="handleClick">
                 <el-tab-pane v-for="(item,index) in tabsCont" :key="index" :name="item.id" :label="item.title"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="temp-form-block"  v-for="(item,index) in tabsCont" :key="index">
            <template v-if="tabIndex == item.id">
                <el-form>
                    <!-- 选择的门店 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择门店:">
                            <div class="info-block">已选择门店：{{item.shopIds.length}}个</div>
                            <div class="info-block">
                                <span class="block-item" v-for="(sp,ip) in item.shopIds" :key="ip">{{sp.name}}</span>
                            </div>
                        </el-form-item>
                    </div>
                    <!-- 选择的属性 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择属性:">
                            <div class="info-block">已选择属性：{{item.checkGoodsType.length}}个</div>
                            <div class="info-block">
                                <span class="block-item" v-for="(tp,iv) in item.checkGoodsType" :key="iv">{{tp}}</span>
                            </div>
                        </el-form-item>
                    </div>
                    <!-- 选择的价格模板 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择价格梯队:">
                            <div class="info-block">{{item.templateId.name}} | {{item.priceType}}</div> 
                        </el-form-item>
                    </div>
                </el-form>
            </template>
        </div>
    </div>
  </div>
</template>

<script>
import storage from 'src/verdor/storage'; 
import http from 'src/manager/http';
import utils from  'src/verdor/utils'; 
export default {
  name: "doing-detail",
  data: function() {
    return {
        shopId:'',
        tabsCont:[],
        taskName:'',
        selectGoods:[],
        tabIndex:'1',
        taskTimer:null,
        taskCount:0,
        taskProgress:0
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
  created() {
    this.initBackTools();
  },
  watch:{
      taskProgress(n){
          if(n == 100){
            setTimeout(()=>{
                this.$emit('goFinish')   
            },1000)
           
          }
      }
  },
  methods: {
    // 初始化添加按钮
    initBackTools() {
      let arr = [
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
      this.$emit("addGoBack");
    },
    handleClick(res){
        this.tabIndex = res.name;
    },
     // 处理数据
    handleDetailData(){
		this.tabsCont = [];
        let obj = utils.deepCopy(this.detailData);
        console.log(this.detailData);
        this.taskCount = Number(this.detailData.taskCount)
        this.taskName = obj.name; // 任务名称；
       
        this.selectGoods = this.getSelectGoods(obj.assignIds.split(',')); // 商品信息
        
        obj.conditions.map((item,index)=>{
			let tabObj = {checkGoodsType: [],checkedComp: false,id: "",isCoerce: true,priceType: [],shopIds: [],templateId: "",title: ""};
			tabObj = {
				shopIds:this.getSelectShops(item.shopIds.split(',')),
                priceType :this.getPriceType(item.priceType.split(',')).join(','),
                
				checkGoodsType : this.getGoodsType(item.type.split(',')),
				templateId :this.getTempName(item.templateId),
				isCoerce : item.isCoerce == '1' ? true : false,
				title : `模板${index+1}`,
				id : `${index+1}`,
				checkedComp : item.type.split(',').length == 5 ? true : false,
			}

			this.tabsCont.push(tabObj)
		})


		if(this.activeVal == '1'){
			this.shopIds = this.tabsCont[0].shopIds;
		}

		console.log(this.tabsCont,'this.tabsCont')
       
    },
    getSelectGoods(goodIds){
        goodIds = goodIds || goodIds.split(',')
        let goodsArr = []
        this.goodList.map(item=>{
            let o ={ id:'',  name:''}
            goodIds.map(el=>{
                if(item.id == el){
                    o ={ id:el,name:item.goodsName};
                    goodsArr.push(o);
                }
            })
        })
        return goodsArr;
    },
    getSelectShops(shopIds){
        shopIds = shopIds || shopIds.split(',')
        let shopsArr = []
        this.allShop.map(item=>{
            let o ={ id:'',  name:''}
            shopIds.map(el=>{
                if(item.id == el){
                    o ={ id:el,name:item.shopName};
                    shopsArr.push(o);
                }
            })
        })
        return shopsArr;
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
    // 轮训任务进度
    getTaskProgress(){
        this.taskTimer = setInterval(()=>{
            http.taskInfo({
                data:{taskId:this.detailData.taskId}
            }).then(res=>{
                console.log(res,'timer');
                let cont = null;
                if(res.taskCount != false){
                    cont = Number(res.taskCount);
                    this.taskProgress = Math.floor(((this.taskCount-cont)/this.taskCount) * 100);
                }else{
                    cont = this.taskCount;
                    this.taskProgress = 100;
                    this.taskTimer && clearInterval(this.taskTimer);
                }
            })
        },500)
        
    }      
  },
  mounted(){
      this.handleDetailData();
      this.getTaskProgress();   
  },
  beforeDestroy(){
    this.taskTimer && clearInterval(this.taskTimer);
  }
};
</script>

<style lang="less" scoped>
.title-block{
    margin: 20px 0;
    position: relative;
    display: flex;
    align-items: center;
    .title-name{
        display: inline-block;
        line-height: 16px;
        border-left: 5px solid #E0B94E;
        padding-left: 8px;
       
    }
    .title-line{
        flex: 1;
        display: block;
        margin-left: 10px;
        border: 1px dashed #F3F3F3;
    }
}
.info-block{
    font-size: 12px;
    color: #A4A4A9;
    .block-item{
        margin:0 10px 10px 0;
        font-size: 12px;
    }

}
.data-form__item{
	padding: 5px 0;
    .el-form-item{
        margin: 0;
    }
	&.line-item{
		border-bottom: 1px solid #dcdfe6;
	}
}
</style>