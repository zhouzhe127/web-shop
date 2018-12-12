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
				<span class="box-span">任务名称：xxxxx</span>
				<span class="box-span">发布时间：2018-2-18 10:18</span>
				<span class="box-span">创建人：xxxx</span>
				<span class="box-span">发布人：xxxx</span>
			</div>
			<div class="div-box">
				<span class="box-span other-span" style="color:#A5A5A5">本次指派任务共指派<span style="color:#E8C148;">150</span>个商品</span>
				<span class="box-span other-span" style="color:#9FB485;">140个商品指派成功</span>
				<span class="box-span other-span" style="color:#F5535C;">10个商品指派失败</span>
			</div>
		</div>
     </div>
	 <!--  -->
	 <div class="opare-block">
		 
	 </div>
  </div>
</template>

<script>
export default {
  name: "goods_assign_detail",
  data: function() {
    return {
      tabIndex:'1',
    };
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
    }
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