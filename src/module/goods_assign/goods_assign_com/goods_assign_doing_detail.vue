<template>
  <div class="doing-detail">
     <!-- 标题名称 -->
    <div class="title-block">
        <span class="title-name">任务详情</span>
        <span class="title-line"></span>
    </div>
    <!-- 任务进度 -->
    <div class="opare-block">
        <span>任务名称:测试888</span>
        <span style="margin-left:40px;">指派进度：<el-progress :percentage="80" style="width:450px;display:inline-block;" color="#E0BA4E"></el-progress></span>
    </div>
    <!-- 选择商品 -->
    <div class="title-block">
        <span class="title-name">选择商品</span>
        <span class="title-line"></span>
    </div>
    <div class="opare-block">
       <el-form>
            <el-form-item label-width="100px" label="商品品牌:">
                <div class="info-block">已选择商品：3个</div>
                <div class="info-block">
                    <span class="block-item" >商品一</span>
                    <span class="block-item" >商品一</span>
                    <span class="block-item" >商品一</span>
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
            <el-tabs>
                 <el-tab-pane label="模板1"></el-tab-pane>
                 <el-tab-pane label="模板2"></el-tab-pane>
                 <el-tab-pane label="模板3"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="temp-form-block">
            <template>
                <el-form>
                    <!-- 选择的门店 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择门店:">
                            <div class="info-block">已选择门店：3个</div>
                            <div class="info-block">
                                <span class="block-item" >商品一</span>
                                <span class="block-item" >商品一</span>
                                <span class="block-item" >商品一</span>
                            </div>
                        </el-form-item>
                    </div>
                    <!-- 选择的属性 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择属性:">
                            <div class="info-block">已选择属性：3个</div>
                            <div class="info-block">
                                <span class="block-item" >商品价格</span>
                                <span class="block-item" >分类信息</span>
                                <span class="block-item" >口味信息</span>
                            </div>
                        </el-form-item>
                    </div>
                    <!-- 选择的价格模板 -->
                    <div class="data-form__item line-item">
                         <el-form-item label-width="100px" label="选择价格梯队:">
                            <div class="info-block">二线城市(40%利润 | 会员价)</div>
                        </el-form-item>
                    </div>
                </el-form>
            </template>
        </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "doing-detail",
  data: function() {
    return {};
  },
  props:{
      detailData:{}
  },
  created() {
    this.initBackTools();
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
    }
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