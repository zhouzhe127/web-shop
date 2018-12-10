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
        <div class="opare-block">
            <div class="temp-form-block">
                 <!-- 模板切换 -->
                <el-tabs v-model="tabIndex" closable @tab-click="handleClick" @tab-remove="removeTab" style="max-width:500px;">
                    <el-tab-pane v-for="(item, index) in tabsCont" :key="index" :label="item.title" :name="item.name"></el-tab-pane>
                </el-tabs>
                <!-- 添加模板 -->
                <div class="add-temp-form">
                    <!-- 编辑模板 -->
                <span class="eidt-input" v-if="tabAddShow">
                    <el-input style="width:100px;" v-model="tabAddModelName"></el-input>
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
            <!-- 模板数据 -->
            <div class="temp-data-form" v-for="(item,index) in tabsCont" :key="index">
                <template v-if="tabIndex == index">
                    <el-form label-width="80px">
                        <el-form-item label="名称">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input></el-input>
                        </el-form-item>
                    </el-form>
                </template>
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
        tabAddModelName:'', // 新增模板名称
        tabAddShow:false,

        tabsCont: [{title: '模板1',name: '1'}],
        tabIndex: '1', // 模板index
        tabValue:1
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
        let num = this.tabValue + 1;
        this.tabAddModelName = `模板${num}`;

    },
    // 取消新增模板
    cancelAddTab(){
        this.tabAddShow = false;
    },
    // 成功添加模板 
    successAddTab() {
        if(this.tabAddModelName == ''){
            this.$store.commit('setWin', {
				title: '温馨提示',
				content: '模板名称不能为空',
				winType: 'alert'
			});
			return;
        }
        this.tabAddShow = false;
        let newTabName = ++this.tabValue + '';

        let obj = {
            title: this.tabAddModelName,
            name: newTabName,
        }
        
        this.tabsCont.push(obj);
        this.tabIndex = newTabName;
      },
    // 删除模板
    removeTab(targetName) {
        console.log(targetName,'targetName')
        let tabs = this.tabsCont;
        this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定删除此模板吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						this.tabsCont.splice(targetName * 1, 1);
					}
				}
			});
        // let activeVal = this.tabIndex;
        //  tabs.forEach((tab, index) => {
        //      let nextTab = tabs[index + 1] || tabs[index - 1];
        //       console.log(nextTab,'next')
        //       if (nextTab) {
        //         activeVal = nextTab.name;
        //       }
        //   });
        
        // this.tabIndex = activeVal;
        // this.tabsCont = tabs.filter(tab => tab.name !== targetName);
    },
    handleClick(tab, event){
        console.log(this.tabIndex)
        console.log(tab, event);
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