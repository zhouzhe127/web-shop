<template>
  <div class="assign-add">
      <!-- 标题名称 -->
    <div class="title-block">
        <span class="title-name">任务详情</span>
        <span class="title-line"></span>
    </div>
    <el-form ref="form" label-width="80px">
        <!-- 任务名称输入 -->
        <div class="opare-block">
             <el-form-item label="活动名称" required>
                <el-input v-model="taskName" style="width:240px;"></el-input>
            </el-form-item>
        </div>
        <!-- 选择商品 -->
        <div class="title-block">
            <span class="title-name">选择商品</span>
            <span class="title-line"></span>
        </div>
        <div class="opare-block">

            ssss 
        </div>
        <!-- 指派规则 -->
        <div class="title-block">
            <span class="title-name">指派规则</span>
            <span class="title-line"></span>
        </div>
        <div class="opare-block temp-form-block">
           <!-- 模板切换 -->
            <el-tabs v-model="tabValue" closable @tab-remove="removeTab" style="max-width:500px;">
                <el-tab-pane v-for="(item, index) in tabsCont" :key="index" :label="item.title" :name="item.name">
                    
                </el-tab-pane>
            </el-tabs>
            <!-- 添加模板 -->
             <div class="add-temp-form">
                 <!-- 编辑模板 -->
               <span class="eidt-input" v-if="tabAddShow">
                   <el-input style="width:100px;" v-model="tabAddModel"></el-input>
                   <!-- 保存按钮 -->
					<span class="edit-btn" @click.stop="successAddTab">
							<i class="el-icon-success" style="color:#E0BA4F"></i>
					</span>
						<!-- 取消按钮 -->
					<span class="edit-btn" @click.stop="cancelAddTab">
						<i class="el-icon-error" style="color:#666;"></i>
					</span>
               </span>
               <!-- 新增模板按钮 -->
               <span class="eidt-add" v-else @click="handleTabAdd">
                   <i class="el-icon-circle-plus-outline" style="color:#E0BA4F"></i>新增模板
               </span>
            </div>
        </div>
    </el-form> 
       <!-- 按钮组 -->
       <div class="opare-block" style="margin-top:80px;">
           <el-button @click="handelSave">保存</el-button>
           <el-button @click="handleAssign" type="primary">指派</el-button>
       </div>
  </div>
</template>

<script>
export default {
  name: "assign-add",
  data: function() {
    return {
        taskName:'', // 任务名称
        activeName:'',
        tabAddModel:'', // 新增模板名称
        tabAddShow:false,


        tabValue: '1',
        tabsCont: [{title: '模板1',name: '1'}],
        tabIndex: 1
    }
  },
  mounted() {
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
            this.addGoBack('back');
          }
        }
      ];
      this.$store.commit("setPageTools", arr);
    },
    // 返回主页
    addGoBack(res) {
      this.$emit("addGoBack",res);
    },
    // 保存
    handelSave(){
        this.addGoBack('save');
    },
    // 指派
    handleAssign(){
        this.addGoBack('assign');
    },
    handleTabAdd(){
        if(this.tabsCont.length >=10){
            this.$store.commit('setWin', {
				title: '温馨提示',
				content: '模板最多只能添加10个',
				winType: 'alert'
			});
			return;
        }
        this.tabAddShow = true;
        let num = this.tabsCont.length;
        this.tabAddModel = `模板${++num}`;
    },
    // 取消新增模板
    cancelAddTab(){
        this.tabAddShow = false;
    },
    // 成功添加模板 
    successAddTab() {
        if(this.tabAddModel == ''){
            this.$store.commit('setWin', {
				title: '温馨提示',
				content: '模板名称不能为空',
				winType: 'alert'
			});
			return;
        }
        this.tabAddShow = false;
        let num = this.tabsCont.length;
        let newTabName = ++num + '';
        let obj = {
            title: this.tabAddModel,
            name: newTabName,
        }
        
        this.tabsCont.push(obj);
        console.log(this.tabsCont)
        this.tabValue = newTabName;
      },
    // 删除模板
    removeTab(targetName) {
        let tabs = this.tabsCont;
        let activeVal = this.tabValue;
         tabs.forEach((tab, index) => {
             let nextTab = tabs[index + 1] || tabs[index - 1];
              console.log(nextTab,'next')
              if (nextTab) {
                activeVal = nextTab.name;
              }
          });
        
        this.tabValue = activeVal;
        this.tabsCont = tabs.filter(tab => tab.name !== targetName);
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
.temp-form-block{
    display: flex;
    justify-content: flex-start;
    .add-temp-form{
        margin-left: 20px;
    }
    .eidt-add{
        margin-top: 15px;
        display: block;
        cursor: pointer;
        >i{
            margin-right: 5px;
        }
    }
}
</style>