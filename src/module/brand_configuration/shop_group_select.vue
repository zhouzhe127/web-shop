<!--
		**门店区域弹窗（品牌）
		*
		* 胡江
		* *
		*
-->
<template>
	<div>
		<win @winEvent="getWin" :align="'center'" :width="800" :height="'auto'">
			<span slot="title">{{title}}</span>
			<div id="tableShow" slot="content">
				<section class="one">
					<div class="border">{{title}}</div>
					<div class="dash"></div>
					<ul>
						<li>
							<p class="required fl">区域名称</p>
							<el-input v-model="regionName" clearable placeholder="请输入区域名称" maxlength="20" style="width:250px;">
							</el-input>
						</li>
						<li>
							<p class="fl">区域代码</p>
							<el-input v-model="regionCode" clearable placeholder="请输入区域代码" maxlength="15" style="width:250px;">
							</el-input>
						</li>
						<li>
							<p class="required fl">排序</p>
							<span class="table-span">
								<el-input-number v-model="num" :min="1" :max="255" label="描述文字">
								</el-input-number>
							</span>
						</li>
					</ul>
				</section>
				<section class="two">
					<div class="border">选择区域门店</div>
					<div class="dash"></div>
					<div class="shop">
						<div style="height: 50px;margin-top:20px;margin-left:20px;float: left">
							<a @click="selectShopType(-1)" class="raduobtn" :class="{'selectbtn' : shopType === -1}" href="javascript:void(0);">全部</a>
							<a @click="selectShopType(1)" class="raduobtn" :class="{'selectbtn' : shopType === 1}" href="javascript:void(0);" style="">直营店</a>
							<a @click="selectShopType(2)" class="raduobtn" :class="{'selectbtn' : shopType === 2}" href="javascript:void(0);" style="">加盟店</a>
						</div>
						<div style="float: left;height: 50px;margin-top:20px;">
							<el-input v-model="shopName" clearable placeholder="请输入门店名称" style="width:250px;" @change="searchShop">
								<el-button slot="append" icon="el-icon-search" @change="searchShop"></el-button>
							</el-input>
						</div>
						<div style="clear: both"></div>
						<ul>
							<div v-if="showShopList.length == 0" style="color:rgb(254, 141, 44)">没有店铺可选择！</div>
							<div style="width:100%;">
								<li @click="selJob(item)" :class="{active: item.selected}" v-for="(item,index) in showShopList" :key="index">{{item.shopName}}</li>
							</div>
						</ul>
					</div>
					<div class="bottomSel">
						<section v-on:click="allShops(0)" class="isallselect">取消全部</section>
						<section v-on:click="allShops(1)" class="isallselect allselect">选择全部</section>
						<h3 style="width: 160px;height: 40px;line-height: 40px;float: right;color: #FF9700;">已选择:{{selectNum}}个</h3>
					</div>
				</section>

			</div>
		</win>
	</div>

</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
export default {
  data() {
    return {
      regionName: '',
      regionCode: '',
      num: 1, //排序

      title: '',
      shopType: -1, //门店类型 1直营店 2加盟店 -1全部
      shopList: [], //店铺列表
      showShopList: [], //选择门店切换时展示的列表
      selectNum: 0, //选择的个数

      shopName: ''
    };
  },
  props: ['info', 'shopIds', 'chuShop'],
  //        props:{
  //            shopIds :String, //所选则的店铺id  [0,1,2]这种格式
  //            chuShop:Array,//所有可选择的店铺id
  //        },
  created() {
    this.title =
      JSON.stringify(this.info) == '{}' ? '创建区域门店' : '编辑区域门店';
    if (this.shopIds.length > 0) {
      this.regionName = this.info.regionName;
      this.regionCode = this.info.regionCode;
      this.num = this.info.num;
    }
  },
  mounted() {
    this.getShopList();
  },
  methods: {
    //关闭弹窗
    getWin(res) {
      let reg = /[^\u4e00-\u9fa5a-zA-Z0-9]/;
      let re = /[^a-zA-Z0-9]/;
      if (res == 'ok') {
        if (reg.test(this.regionName)) {
          this.$store.commit('setWin', {
            title: '提示信息',
            winType: 'alter',
            content: '区域名称仅限汉字、英文字母和数字'
          });
          return false;
        }
        if (this.regionName.length == 0) {
          this.$store.commit('setWin', {
            title: '提示信息',
            winType: 'alter',
            content: '区域名称不能为空'
          });
          return false;
        }
        if (re.test(this.regionCode)) {
          this.$store.commit('setWin', {
            title: '提示信息',
            winType: 'alter',
            content: '区域代码仅限英文字母和数字'
          });
          return false;
        }

        let selectIds = [];
        for (let m = 0; m < this.shopList.length; m++) {
          if (this.shopList[m].selected) {
            selectIds.push(this.shopList[m].id);
          }
        }
        if (selectIds.length == 0) {
          this.$store.commit('setWin', {
            title: '提示信息',
            winType: 'alter',
            content: '至少选择一家门店'
          });
          return false;
        }
        console.log(selectIds);

        if (this.shopIds) {
          console.log('编辑');
          this.edit(selectIds).then(v => {
            if (v) {
              this.$emit('goodListWin', res);
            }
          });
        } else {
          console.log('添加');
          this.add(selectIds).then(v => {
            if (v) {
              this.$emit('goodListWin', res);
            }
          });
        }
      } else {
        this.$emit('goodListWin', res);
      }
    },
    //添加
    async add(id) {
      return await http.StoreareaCreate({
        data: {
          name: this.regionName,
          areaCode: this.regionCode,
          sort: this.num,
          areaShopIds: id.toString()
        }
      });
    },
    //编辑
    async edit(id) {
      return await http.StoreareaEdit({
        data: {
          name: this.regionName,
          areaCode: this.regionCode,
          sort: this.num,
          areaShopIds: id.toString(),
          id: this.info.id
        }
      });
    },

    //处理门店数据
    getShopList() {
      let res = utils.deepCopy(this.chuShop);
      for (let i = 0; i < res.length; i++) {
        res[i].selected = false;
      }
      this.shopList = res;
      this.showShopList = res;
      if (this.shopIds) {
        let shopIds = this.shopIds.split(',');
        for (let m = 0; m < this.shopList.length; m++) {
          for (let n = 0; n < shopIds.length; n++) {
            if (shopIds[n] == this.shopList[m].id) {
              this.shopList[m].paySelected = true;
              this.shopList[m].selected = true;
            }
          }
        }
        this.selectNum = 0;
        for (let i = 0; i < this.shopList.length; i++) {
          if (this.shopList[i].selected) {
            this.selectNum++;
          }
        }
      }
    },
    //门店类型切换
    selectShopType(type) {
      this.shopName = '';
      this.shopType = type;
      this.showShopList = [];
      switch (type + '') {
        case '-1': //全部
          this.showShopList = this.shopList;
          break;
        case '1': //直营店
          this.showShopList = this.shopList.filter(v => {
            return v.ischain == '1';
          });
          break;
        case '2': //加盟店
          this.showShopList = this.shopList.filter(v => {
            return v.ischain == '2';
          });
          break;
      }
    },
    //筛选门店
    searchShop() {
      if (this.shopType == -1) {
        this.showShopList = this.shopList.filter(v => {
          return v.shopName.includes(this.shopName);
        });
      } else {
        this.showShopList = this.shopList.filter(v => {
          return (
            v.shopName.includes(this.shopName) && v.ischain == this.shopType
          );
        });
      }
    },
    //门店选择
    selJob(item, i) {
      item.selected = !item.selected;
      this.selectNum = 0;
      for (let i = 0; i < this.shopList.length; i++) {
        if (this.shopList[i].selected) {
          this.selectNum++;
        }
      }
    },
    //门店选择公用
    shopSel(type) {
      if (this.shopType === -1) {
        for (let i = 0; i < this.showShopList.length; i++) {
          this.showShopList[i].selected = type;
        }
      } else if (this.shopType === 1) {
        for (let i = 0; i < this.showShopList.length; i++) {
          if (this.showShopList[i].ischain == '1') {
            this.showShopList[i].selected = type;
          }
        }
      } else if (this.shopType === 2) {
        for (let i = 0; i < this.showShopList.length; i++) {
          if (this.showShopList[i].ischain == '2') {
            this.showShopList[i].selected = type;
          }
        }
      }
    },
    //门店全部选择与取消
    allShops(type) {
      if (type === 0) {
        //全部取消
        this.shopSel(false);
        this.selectNum = 0;
        for (let i = 0; i < this.shopList.length; i++) {
          if (this.shopList[i].selected) {
            this.selectNum++;
          }
        }
      } else {
        //全部选择
        this.shopSel(true);
        this.selectNum = 0;
        for (let i = 0; i < this.shopList.length; i++) {
          if (this.shopList[i].selected) {
            this.selectNum++;
          }
        }
      }
    }
  },
  components: {
    win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
  }
};
</script>

<style lang="less" scoped>
#tableShow {
  position: relative;
  padding: 20px;
  .border {
    display: inline-block;
    height: 20px;
    border-left: 6px solid #f8931f;
    padding: 3px;
  }
  .dash {
    width: 600px;
    height: 5px;
    border-top: 1px dashed #e4e5e6;
    display: inline-block;
  }
  .one {
    ul {
      padding-top: 10px;
      li {
        margin-bottom: 14px;
        p {
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: right;
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
  .two {
    .shop {
      .raduobtn {
        width: 120px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        float: left;
        border-radius: 5px;
        margin-right: 15px;
        background-color: #f2f2f2;
        color: #333;
      }
      .selectbtn {
        background-color: #2fa8dd;
        color: #fff;
      }
      ul {
        margin: 10px 20px;
        height: 260px;
        overflow-y: auto;
        li {
          display: inline-block;
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          border: 1px solid #d2d2d2;
          text-align: center;
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        .active {
          border-color: #ff9200;
          color: #ff9200;
          background: url('../../res/images/sign.png') right bottom no-repeat;
        }
      }
    }
    .bottomSel {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 14px;
      bottom: 10px;
      .isallselect {
        cursor: pointer;
        width: 80px;
        height: 30px;
        float: left;
        line-height: 30px;
        text-align: center;
        margin: 5px;
        border: 1px solid #a0a0a0;
        color: #a0a0a0;
      }
      .allselect {
        border: 1px solid #ff9700;
        color: #ff9700;
      }
    }
  }
}
</style>