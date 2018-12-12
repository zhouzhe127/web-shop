<template>
  <div class="assign-detail">
    全部成功和失败的详情
  </div>
</template>

<script>
export default {
  name: "goods_assign_detail",
  data: function() {
    return {};
  },
  created(){
      this.initBackTools()
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
      this.$emit("addGoBack",);
    }
  }
};
</script>

<style scoped>
</style>