/*
 * @Author: zhouzhe 
 * @Date: 2018-04-17 14:53:38 
 */
  
<template>
<div>
    <div class="main" :style="inmainBox">
      <div class="headBox" v-if="showHand">
        <div class="head">
            <slot name="title">{{listName||"列表"}} · 共<em>{{allTotal}}</em>个条目</slot>
        </div>
      </div>  
        <div class="list" :style="listConStyle">
          <slot name="content">
            <div class="listBox">
              <div class="contentBox min" :style="incontentStyle">
                <ul class="title" :style="intitleStyle" v-if="showTitle>=1&&titleList.length>0">
                  <li class="titleList" v-for="(item,index) in titleList" :key="index" ref="titleELm" :style="item.titleStyle">
                    <section v-if="index+1>fixedData.length" :style="Object.assign({},item.titleStyle,{width:'100%'})">
                      <slot :name="`title-${index}`">{{item.titleName||item}}</slot>
                      <slot :name="`list-${index}`">
                        <div class="sortEvt" v-if="item.sort" @click="sortWay(item.dataName)">
                          <img src="../res/images/thedefault.png" alt="">
                        </div>
                      </slot>
                    </section >
                    <section v-else>
                      <div></div>
                    </section>                      
                  </li>
                </ul>
                <div class="listContent" v-if="methData&&methData.length>0">
                  <ul class="conList" v-for="(list,index) in methData" @mouseover="changeColoer(index,true)" @mouseout="changeColoer(index,false)" :class="{'active':hoverElt===index}" :key="index" :style="liconStyle">
                      <li class="titleList" v-for="(item,i) in titleList" :key="i" :style="Object.assign({},item.titleStyle,item.conStyle)">
                          <slot :name="`con-${i}`" :data="list" :index="index">
                            <span :title="list[item.dataName]" :style="item.titleStyle">{{checkData(list[item.dataName])}}</span>
                          </slot>
                      </li>
                  </ul>
                </div>
                <div v-if="!methData||methData.length==0" class="empty">- 暂无条目 -</div>
                <ul class="title" :style="intitleStyle" v-if="showTitle==2&&titleList.length>0">
                    <li class="titleList" v-for="(item,index) in titleList" :key="index" :style="item.titleStyle">
                        <slot :name="`title-${index}`">{{item.titleName||item}}</slot>
                        <slot :name="`list-${index}`"></slot>
                    </li>
                </ul>
              </div>
              <div class="contentBox positionBox" :class="showHand?'fixedActive':'fixedonActive'">
                <ul class="title" :style="intitleStyle" v-if="showTitle>=1&&titleList.length>0">
                    <li class="titleList" v-for="(item,index) in fixedData" :key="index" v-if="item.titleStyle" :style="item.titleStyle">
                        <slot :name="`title-${index}`">{{item.titleName||item}}</slot>
                        <slot :name="`list-${index}`">
                          <div class="sortEvt" v-if="item.sort" @click="sortWay(item.dataName)">
                            <img src="../res/images/thedefault.png" alt="">
                          </div>
                        </slot>
                    </li>
                </ul>
                <div class="listContent" v-if="methData&&methData.length>0" :style="listContent">
                  <ul class="conList" v-for="(list,index) in methData" :key="index" @mouseover="changeColoer(index,true)" @mouseout="changeColoer(index,false)" :class="{'active':hoverElt===index}" :style="liconStyle">
                      <li class="titleList" v-for="(item,i) in fixedData" :key="i" v-if="item.titleStyle" :style="Object.assign({},item.titleStyle,item.conStyle)">
                          <slot :name="`con-${i}`" :data="list" :index="index">
                              <span :title="list[item.dataName]" :style="item.titleStyle">{{checkData(list[item.dataName])}}</span>
                          </slot>
                      </li>
                  </ul>
                </div>
                <div v-if="methData&&methData.length==0" class="empty"></div>
                <ul class="title" :style="intitleStyle" v-if="showTitle==2&&titleList.length>0">
                    <li class="titleList" v-for="(item,index) in fixedData" v-if="item.titleStyle" :style="item.titleStyle" :key="index">
                        <slot :name="`title-${index}`">{{item.titleName||item}}</slot>
                        <slot :name="`list-${index}`"></slot>
                    </li>
                </ul>
              </div>
            </div>
          </slot>
        </div>
    </div>
</div>
</template>
<script>
import global from "src/manager/global";
import utils from "src/verdor/utils";
/*
 * titleData:[{
 *    titleName:aa,每一列的名字
 *    dataName:"sadas",每一列需要展示的属性
 *    titleStyle:{width:200+"px",flex:none},每一列总样式
 *    conStyle:{'backgroundColor':"red"},每一列内容样式
 *    sort: Boolean,//是否显示排序按钮，排序依据dataName排序
 * }]
 */
export default {
  props: {
    listName: String, //列表名称
    titleData: Array, //传入的列表分类[{titleName:aa,titleStyle:{width:200+"px",flex:none},conStyle:{'backgroundColor':"red"},dataName:"sadas"}],直接传['aa','bb','cc']则为均分
    introData: [Array, String], //传入的数据
    mainBox: Object, //主体样式对象
    listConStyle:Object,
    bannerStyle: Object, //头部样式
    contentStyle: Object, //列表区域样式
    allTotal: [Number, String], //总条数
    fixed: {
      //滚动固定数量默认为1
      type: Number,
      default: 0
    },
    showTitle: {
      //抬头显示个数0 ，1 ，2 默认为一个
      type: Number,
      default: 1
    },
    showHand: { type: Boolean, default: true }, //头部是否显示
    titleHeight: Number, //抬头高度
    listHeight: Number, //列表高度
    listWidth: Number, //列表区域宽度不传为100%
    widthType: Boolean //false为可视宽度固定，true为一直自适应
  },
  data() {
    return {
      fixedData: "", //固定头部
      inmainBox: {},
      intitleStyle: {},
      incontentStyle: {},
      liconStyle: {},
      titleList: "",
      userWidth: "",
      mainWidth: "", //视窗宽度
      hoverElt: "",
      methData:"",
      sortType:true,
      listContent:""
    };
  },
  methods: {
    init() {
      let fixed = 0;
      if(this.mainBox){
      this.inmainBox = this.mainBox;
      }
      if(this.bannerStyle){
        this.intitleStyle = this.bannerStyle;
      }
      if(this.contentStyle){
        this.incontentStyle = this.contentStyle;
      }
      if (this.listWidth) {
        if (Number(this.pwidth) < Number(this.listWidth)) {
          this.$set(this.incontentStyle, "width", `${this.listWidth}px`);
          // this.listContent = {
          //   boxShadow: '0px -2px 10px rgba(0,0,0,.12)'
          // }
          fixed = this.fixed==0? 1:this.fixed;
        }else{
          fixed = 0;
        }
        if (this.widthType) {
          this.mainWidth = this.listWidth;
        }
      }
      if (this.mainWidth && Number(this.pwidth) > Number(this.mainWidth)) {
        this.$set(this.inmainBox, "width", `${this.mainWidth + 2}px`);
      } else {
        this.$set(this.inmainBox, "width", `${this.pwidth - 15}px`);
      }
      if (this.titleHeight) {
        Object.assign(this.intitleStyle, {
          height: `${this.titleHeight}px`,
          "line-height": `${this.titleHeight}px`
        });
      }
      if (this.listHeight) {
        Object.assign(this.liconStyle, {
          height: `${this.listHeight}px`,
          "line-height": `${this.listHeight}px`
        });
      }
      this.titleList = this.titleData;
      this.fixedData = fixed==0? "":utils.deepCopy(this.titleList.slice(0, fixed));
      this.setStyle();
    },
    fixedWidth() {
      let evt = this.$refs.titleELm;
      if(evt){
        for (let i in this.fixedData) {
          if (!this.fixedData[i].titleStyle) {
            this.$set(this.fixedData[i], "titleStyle", {});
          }
          if(evt[i]){
            this.$set(
              this.fixedData[i].titleStyle,
              "width",
              evt[i].offsetWidth + "px"
            );
          }
          this.$set(this.fixedData[i].titleStyle, "flex", "none");
        }
      }
    },
    setStyle() {
      for (let item of this.titleList) {
        if (item.titleStyle && item.titleStyle.width) {
          Object.assign(item.titleStyle, { flex: "none" });
        }
      }
    },
    checkData(str) {
      if (str || str === 0) {
        return str;
      } else {
        return "--";
      }
    },
    changeColoer(index, type) {
      this.hoverElt = type ? index : "";
    },
    sortWay(key){
      if(key){
        utils.sortByAll(this.methData,key=key,this.sortType);
        this.sortType = !this.sortType;
      }
    }
  },
  mounted() {
    this.methData = this.introData;
    this.init();
  },
  updated() {
    this.fixedWidth();
  },
  computed: {
    pwidth() {
      return this.$store.state.usableWidth;
    }
  },
  watch: {
    titleData() {
      this.init();
    },
    introData(){
      this.methData = this.introData;
    },
    pwidth() {
      this.init();
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  margin-top: 20px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
  position: relative;
  overflow: hidden;
  .headBox {
    height: 50px;
    border-bottom: 1px #ebeef5 solid;
    .head {
      width:100%;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      font-size: 16px;
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      em {
        color: #ff3c04;
        font-size: inherit;
      }
    }
  }

  .list {
    width: 100%;
    overflow-x: auto;
    .fixedActive {
      top: 50px;
    }
    .fixedonActive {
      top: 0;
    }
    .positionBox {
      box-shadow: 0px 0px 10px rgba(0,0,0,0.08);
      position: absolute;
      left: 0;
      background-color: #ffffff;
    }
    .listContent {
      .conList {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px #ebeef5 solid;
        height: 50px;
        line-height: 50px;
        &:last-child {
          border-bottom: none;
        }
        .titleList {
          text-align: center;
          position: relative;
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .active {
        background-color: #FBF7EB;
      }
    }
    .min {
      min-width: 100%;
    }
    .contentBox {
      .title {
        background: #f5f7fa;
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        .narrow {
          width: 10%;
        }
        .titleList {
          text-align: center;
          position: relative;
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          .sortEvt{
            display: inline-block;
            cursor: pointer;
            img{
              display: inline-block;
              width: 13px;
              height: 14px;
            }
          }
        }
      }
    }

    .empty {
      height: 70px;
      text-align: center;
      line-height: 70px;
      color: #999;
      font-size: 20px;
    }
  }
}
</style>

