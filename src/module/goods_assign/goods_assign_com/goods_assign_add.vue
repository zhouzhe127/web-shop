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
             <el-form-item label="任务名称" required>
                <el-input v-model="taskName" style="width:240px;"></el-input>
            </el-form-item>
        </div>
        <!-- 选择商品 -->
        <div class="title-block">
            <span class="title-name">选择商品</span>
            <span class="title-line"></span>
        </div>
        <div class="opare-block">
			<!-- 选择商品 -->
				<span class="eidt-add" style="cursor:pointer;" @click="chooseGood">
					<i class="el-icon-circle-plus-outline" style="color:#E0BA4F"></i>选择商品
				</span>
				<!-- 已选择商品： -->
				<span style="margin-left:50px;" v-if="selectGoods.length>0">
					已选择商品：<span style="color:#E0BA4F">{{selectGoods.length}}</span>个
				</span>
				<!--  -->
				<span style="margin-left:50px;" v-if="selectPackages.length>0">
					已选择套餐：<span style="color:#E0BA4F">{{selectPackages.length}}</span>个
				</span>
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
                    <el-tab-pane v-for="(item, index) in tabsCont" :key="index" :label="item.title" :name="item.id"></el-tab-pane>
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
                <template v-if="item.id == activeVal">
					<div class="data-form__item line-item">
						<el-form-item label="选择门店">
							<!-- 选择门店按钮 -->
							<span class="eidt-add" style="cursor:pointer;" @click="chooseShopWin">
								<i class="el-icon-circle-plus-outline" style="color:#E0BA4F"></i>选择门店
							</span>
							<!-- 已选择门店数量 -->
							<span style="margin-left:50px;" v-if="item.shopIds && item.shopIds.length > 0">
								已选择门店：<span style="color:#E0BA4F">{{item.shopIds.length}}</span>个
							</span>
						</el-form-item>
					</div>
					<!-- 是否开启商品完整信息 -->
					<div class="data-form__item" >
						<el-checkbox @change="HandlecheckComp" v-model="item.checkedComp" label="商品完整信息" border></el-checkbox>
						<span style="margin-left:20px;color:#B9B8BB;font-size:12px;">
							<i class="el-icon-warning"></i>尚未指派过的商品首次指派必须选择"商品完整信息"
						</span>
					</div>
					<!-- 信息选项 -->
					<div class="data-form__item">
						 <el-checkbox-group v-model="item.checkGoodsType" size="small">
							<el-checkbox label="1" border>商品价格</el-checkbox>
							<el-checkbox label="2" border>商品名称</el-checkbox>
							<el-checkbox label="3" border>分类信息</el-checkbox>
							<el-checkbox label="4" border>口味信息</el-checkbox>
							<el-checkbox label="5" border>其他信息</el-checkbox>
						</el-checkbox-group>
					</div>
					<!-- 首次指派，强制开启完整信息 -->
					<div class="data-form__item">
						<el-checkbox v-model="item.isCoerce">如果指派的商品为首次指派，则直接将"商品完整信息"指派至该门店</el-checkbox>
					</div>
					<div class="data-form__item line-item">
						<el-form label-width="100px">
							<el-form-item label="选择价格模板">
								<div class="data-form__item line-item">
									<el-checkbox-group  v-model="item.priceType" size="small">
										<el-checkbox label="1" border>商品基础价格</el-checkbox>
										<el-checkbox label="2" border>商品会员价</el-checkbox>
										<el-checkbox label="3" border>商品特价</el-checkbox>
									</el-checkbox-group>
								</div>
								<div class="data-form__item">
									<el-radio-group v-model="item.templateId">
										<el-radio :label="0" border>原始价格</el-radio>
										<el-radio :label="item.id" border v-for="(item,index) in tempTitleList" :key="index">{{item.name}}</el-radio>
									</el-radio-group>
								</div>
							</el-form-item>
						</el-form>
					</div>	
                </template>
            </div>
        </div>
    </el-form> 
    <!-- 按钮组 -->
    <div class="opare-block" style="margin-top:80px;">
        <el-button @click="handelSave">保存</el-button>
        <el-button @click="handleAssign" type="primary">指派</el-button>
    </div>
	<!-- 选择商品弹窗 -->
	<goodListWin v-if="goodsWinShow" @goodListWin="closeGoodWin" :goodsIds="selectGoods" :packages="selectPackages" :isGoods="true" ></goodListWin>

	<!-- 选择门店弹窗 -->
	<elShopListWin v-if="chooseShopShow" :shopIds="shopIds" @chooseShop="getShopResult"></elShopListWin>
  </div>
</template>

<script>
import storage from 'src/verdor/storage';
import http from 'src/manager/http';

export default {
  name: "assign-add",
  data: function() {
    return {
        taskName:'', // 任务名称
        activeName:'',
        tabAddModelName:'', // 新增模板名称
        tabAddShow:false,

        tabsCont: [{title:'模板1',id:'1',shopIds:[],checkedComp:false,checkGoodsType:[],isCoerce:true,priceType:[],templateId:0}],
        tabIndex: '1', // 模板index
		tabValue:1,
		activeVal:'1',

		chooseShopShow:false,
		checkedShopNum:0, // 已选择的门店的数量
		shopIds:[],

		goodsWinShow:false,
		selectPackages:[],
		selectGoods:[],

		tempTitleList:[], // 价格模板列表

		
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
    async handelSave(){
		console.log(this.tabsCont,'this.tabsCont');
		console.log(this.selectGoods.join(','),'selectGoods')
		console.log(this.selectPackages.join(','),'selectPackages');
	
		let arr = [];
		this.tabsCont.forEach(item=>{
			let obj = {
						type:item.checkGoodsType.join(','),
						shopIds:item.shopIds.join(','),
						priceType:item.priceType.join(','),
						templateId:item.templateId,
						isCoerce:item.isCoerce == true ? '1' : 0
					}
			arr.push(obj)
		});
	
		if(this.taskName.length <=0){
			this.$store.commit('setWin', {
				title: '温馨提示',
				content: '任务名称不能为空',
				winType: 'alert',
			});
			return;
		}
		if(this.selectGoods.length <=0 || this.selectPackages.length <=0){
			this.$store.commit('setWin', {
				title: '温馨提示',
				content: '请选择商品！',
				winType: 'alert',
			});
			return;
		}
		if(item.checkGoodsType.length <=0){
			this.$store.commit('setWin', {
				title: '温馨提示',
				content: '商品信息不能为空！',
				winType: 'alert',
			});
			return;
		}
		if(item.shopIds.length <=0){
			this.$store.commit('setWin', {
				title: '温馨提示',
				content: '请选择门店！',
				winType: 'alert',
			});
			return;
		}
		

		console.log(arr,'arr')
		let data = await http.AssigntaskAdd({
				data:{
					type:1,
					name:this.taskName,
					assginIds:this.selectGoods && this.selectGoods.join(','),
					otherIds:this.selectPackages && this.selectPackages.join(','),
					conditions:arr
				}
			})

		
		if(data){
			this.$store.commit('setWin', {
				title: '温馨提示',
				content: '任务添加成功！',
				winType: 'alert',
				callback: res => {
					if (res == 'ok') {
						this.addGoBack('save');
					}
				}
			});
		}

        // this.addGoBack('save');
    },
    // 指派
    handleAssign(){
        this.addGoBack('assign');
	},
	// 添加新模板
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
        let newTabId = ++this.tabValue + '';

        let obj = {
            title: this.tabAddModelName,
			id: newTabId,
			shopIds:[],
			checkedComp:false,
			checkGoodsType:[],
			isCoerce:true,
			priceType:[],
			templateId:0
        }
		this.activeVal = newTabId;
		this.tabIndex = newTabId;
        this.tabsCont.push(obj);
       
      },
    // 删除模板
    removeTab(targetId) {
		let tabs = this.tabsCont;
		let itemIndex = this.tabsCont.findIndex(item=> item.id == targetId);
        this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定删除此模板吗？',
				callback: res => {
					if (res == 'ok') {
						let active = this.tabIndex;
						if (active == targetId) {
							tabs.forEach((tab, index) => {
								if (tab.id == targetId) {
									let nextTab = tabs[index + 1] || tabs[index - 1];
									if (nextTab) {
										active = nextTab.id;
										this.activeVal = nextTab.id;
									}
								}
							});
						}
						this.tabIndex = active;
						this.tabsCont.splice((itemIndex * 1), 1);
						// this.tabsCont = tabs.filter(tab => tab.id !== targetId);
					}
				}
            });
	},
	// 切换模板
    handleClick(tab, event){
		this.activeVal = tab.name || tab.paneName;
	},
	chooseShopWin(){
		this.chooseShopShow = true;
	},
	// 选择门店返回
	getShopResult(res,data){
		let itemIndex = this.tabsCont.findIndex(item=> item.id == this.activeVal);
		if(data && res == 'ok'){
			this.shopIds = data;
			this.tabsCont[itemIndex].shopIds = data;
			this.checkedShopNum = data.length;
		}
		this.chooseShopShow = false;
	},
	chooseGood(){
		this.goodsWinShow = true
	},
	// 选择商品
	closeGoodWin(res, item) { //  关闭商品弹框
		if (res == 'ok') {
			this.selectGoods = item.goodArr;
			this.selectPackages = item.packArr;
		}
		this.goodsWinShow = false;
	},
	HandlecheckComp(res){
		let itemIndex = this.tabsCont.findIndex(item=> item.id == this.activeVal);
		let item = this.tabsCont.find(item=> item.id == this.activeVal);
		let arr = ['1','2','3','4','5']
		console.log(item)
		if(res){
			item.checkGoodsType = arr;
		}else{
			item.checkGoodsType = []
		}
	},
	// 获取价格模板
	async getTempModel(){
		let data = await http.getPriceTemplateTitle();
		if(data){
			console.log(data,'模板')
			this.tempTitleList = data;
		}
	}
  },
  mounted(){
	  this.getTempModel();
	  this.initBackTools();
  },
  components:{
	  goodListWin: () =>
			import ( /* webpackChunkName:'good_list_win' */ 'src/components/good_list_win'),
	  elShopListWin: () =>
			import(/* webpackChunkName:'el_shopList_win' */ 'src/components/el_shopList_win')
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

.data-form__item{
	padding: 5px 0;
	margin-bottom: 20px;
	.el-form-item{
		margin: 0;
	}
	&.line-item{
		border-bottom: 1px solid #dcdfe6;
	}
}

</style>