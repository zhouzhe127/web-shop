/**
 * @Author: zhengu.jiang 
 *
 * @Module: 品牌下选择门店弹窗
 */

<template>
	<div id="elShop">
		<win @winEvent="getData" :align="'center'" :width="600" :height="400">
			<span slot="title">{{title}}</span>
			<div slot="content" @click.stop class="detDivBox elshop" style="padding:10px;">
				<i class="detI" style="left: 150px;"></i>
				<div class="searchbox">
					<el-input placeholder="请输入内容" v-model="shopName" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
					</el-input>
				</div>
				<div class="detH3" style="text-align: left;max-height: 500px;overflow: auto;">
					<el-tabs v-model="activeName">

						<div class="area" v-if="areaList.list.length > 0">
							<span class="left icon el-icon-arrow-left" @click="slideLeft"></span>
							<div class="areabox">
								<div class="box" ref="content" :style="{left: leftWidth +'px'}">
									<el-radio-group v-model="areaList.name" @change="changeArea" size="medium">
										<el-radio-button v-for="(item,index) in areaList.list" :key="index" :label="item.name"></el-radio-button>
									</el-radio-group>
								</div>
							</div>
							<span class="right icon el-icon-arrow-right" @click="slideRight"></span>
						</div>
						<template v-if="!isSingle">
							<el-tab-pane label="全部" name="first">
								<el-checkbox v-if="(item.storeAreaId == areaList.flag) || areaList.flag == -1" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
							</el-tab-pane>
							<el-tab-pane label="直营店" name="second">
								<el-checkbox v-if="item.ischain == 1 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
							</el-tab-pane>
							<el-tab-pane label="加盟店" name="third">
								<el-checkbox v-if="item.ischain == 2 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
							</el-tab-pane>
						</template>
						<template v-if="isSingle">
							<el-tab-pane label="全部" name="first">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-if="(item.storeAreaId == areaList.flag) || areaList.flag == -1" v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
							<el-tab-pane label="直营店" name="second">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-if="item.ischain == 1 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
							<el-tab-pane label="加盟店" name="third">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-if="item.ischain == 2 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
						</template>
						<!-- <el-tab-pane label="全部" name="first">
							<el-checkbox v-if="(item.storeAreaId == areaList.flag) || areaList.flag == -1" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
						</el-tab-pane>
						<el-tab-pane label="直营店" name="second">
							<el-checkbox v-if="item.ischain == 1 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
						</el-tab-pane>
						<el-tab-pane label="加盟店" name="third">
							<el-checkbox v-if="item.ischain == 2 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
						</el-tab-pane> -->
					</el-tabs>
				</div>
				<div v-if="!isSingle" style="text-align: left; margin-bottom: 10px;position:absolute;bottom:50px">
					<el-button size="mini" type="info" @click="cancelAll()">取消全部</el-button>
					<el-button size="mini" type="primary" @click="selectAll()">选择全部</el-button>
				</div>
			</div>
		</win>
	</div>
</template>
<script>
// import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import http from 'src/manager/http';
export default {
	data() {
		return {
			title: '请选择店铺',
			shopType: 'all',
			activeName: 'first',
			showShopList: [],
			areaList: {
				flag: -1, //选中的区域id
				name: '全部',
				list: []
			}, //区域列表
			contentWidth: '', //滑块的宽度
			leftWidth: 0,
			index: 1,
			shopName: '', //搜索店铺名

			allShop: [], //通过接口获取的所有门店
			singleId: [], //单选选中的id
			singleName: ''
		};
	},
	props: ['shopIds', 'isSingle', 'delShopId'],
	/*
	 shopIds选中的店铺id   eg:['12','23']
	 isSingle是否单选   默认为false
	 delShopId展示店铺,数组，自己传店铺的数组(过滤了部分的)
	* */
	mounted() {
		this.getShopList();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	},
	methods: {
		getData(res) {
			let shopIds = [];
			if (this.isSingle) {
				shopIds = this.singleId;
			} else {
				for (let i = 0; i < this.showShopList.length; i++) {
					if (this.showShopList[i].selected) {
						shopIds.push(this.showShopList[i].id);
					}
				}
			}
			this.$emit('chooseShop', res, shopIds);
		},
		//获取店铺列表
		async getShopList() {
			if (this.delShopId) {
				this.allShop = this.delShopId;
			} else {
				this.allShop = await http.getShopList({
					data: {}
				});
			}
			this.storeareaGetAllArea();
		},
		init(type) {
			let res = utils.deepCopy(this.allShop);
			let index = 0;
			for (let i = 0; i < res.length; i++) {
				this.$set(res[i], 'selected', false);
				if (this.shopIds.includes(res[i].id)) {
					res[i].selected = true;
				}
				if (res[i].storeAreaId == 0) {
					index++;
				}
			}
			if (index != 0 && type) {
				this.areaList.list.push({ id: 0, name: '无区域' });
			}
			this.showShopList = utils.deepCopy(res);
			this.shopList = utils.deepCopy(res);

			if (this.contentWidth == '') {
				this.show();
			}
		},
		async storeareaGetAllArea() {
			let res = await http.storeareaGetAllArea();
			if (res.length > 0) {
				res.unshift({ name: '全部', id: '-1' });
				this.areaList.list = res;
				this.init('area');
			} else {
				this.init();
			}
		},
		changeArea(res) {
			if (res == '全部') {
				this.areaList.flag = '-1';
			}
			this.areaList.list.forEach(e => {
				if (e.name == res) {
					this.areaList.flag = e.id;
				}
			});
		},
		slideLeft() {
			console.log('left');
			if (this.contentWidth > 400) {
				this.leftWidth = this.index++ * -200;
				if (this.leftWidth * -1 + 400 >= this.contentWidth) {
					this.leftWidth = -(this.contentWidth - 400);
					return false;
				}
			}
		},
		slideRight() {
			console.log('right');
			if (this.leftWidth >= 0) {
				this.leftWidth = 0;
				return false;
			}
			this.leftWidth = this.leftWidth + 200;
			this.index--;
			if (this.leftWidth >= 0) {
				this.leftWidth = 0;
				this.index = 1;
			}
		},
		show() {
			if (this.areaList.list.length > 0) {
				this.$nextTick(() => {
					this.contentWidth = this.$refs.content.clientWidth;
				});
			}
		},
		//搜索店铺
		searchShop() {
			if (!this.shopName) {
				this.showShopList = utils.deepCopy(this.shopList);
				return false;
			}
			this.showShopList = this.shopList.filter(e => {
				if (e.shopName.indexOf(this.shopName) != -1) {
					return e;
				}
			});
		},
		//选择全部
		selectAll() {
			this.selCommon(true);
		},
		//取消全部
		cancelAll() {
			this.selCommon(false);
		},
		selCommon(type) {
			for (let i = 0; i < this.showShopList.length; i++) {
				if (this.activeName == 'first') {
					if (this.areaList.flag == '-1') {
						this.showShopList[i].selected = type;
					} else {
						if (
							this.showShopList[i].storeAreaId ==
							this.areaList.flag
						) {
							this.showShopList[i].selected = type;
						}
					}
				} else if (this.activeName == 'second') {
					if (
						this.areaList.flag == '-1' &&
						this.showShopList[i].ischain == 1
					) {
						this.showShopList[i].selected = type;
					} else {
						if (
							this.showShopList[i].storeAreaId ==
							this.areaList.flag
						) {
							this.showShopList[i].selected = type;
						}
					}
				} else if (this.activeName == 'third') {
					if (
						this.areaList.flag == '-1' &&
						this.showShopList[i].ischain == 2
					) {
						this.showShopList[i].selected = type;
					} else {
						if (
							this.showShopList[i].storeAreaId ==
							this.areaList.flag
						) {
							this.showShopList[i].selected = type;
						}
					}
				}
			}
		},
		//单选选中的店铺id
		toSingle(item) {
			this.singleId = [];
			this.singleId.push(item.id);
			this.singleName = item.shopName;
		}
	}
};
</script>
<style>
.elshop .searchbox {
	width: 200px;
	height: 35px;
	position: absolute;
	right: 5px;
	z-index: 10;
}
.elshop .el-tabs__header {
	width: 250px;
}
.elshop .el-tab-pane {
	max-height: 250px;
	overflow: auto;
}
.elshop .el-checkbox.is-bordered {
	margin-left: 10px;
	margin-bottom: 10px;
}
.elshop .area {
	height: 50px;
	padding: 0 30px;
}
.elshop .areabox {
	position: relative;
	width: 100%;
	height: 50px;
	overflow: hidden;
}
.elshop .areabox .box {
	position: absolute;
	transition: 0.5s;
	white-space: nowrap;
}
.elshop .area .icon {
	display: inline-block;
	width: 20px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	font-size: 20px;
}
.elshop .area .left {
	position: absolute;
	left: 0;
	top: 0px;
}
.elshop .area .right {
	position: absolute;
	right: 0;
	top: 0px;
}
</style>

<style lang="less" scoped>
#elShop {
	display: inline-block;
	.shopbox {
		cursor: pointer;
	}
	.detDivBox {
		display: inline-block;
		width: 300px;
		background: #45404b;
		position: absolute;
		top: 45px;
		right: 0;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 2000;
		.detI {
			width: 0;
			height: 0;
			line-height: 0;
			position: absolute;
			top: -10px;
			right: 30%;
			border-width: 10px;
			border-top: 0px;
			border-style: solid;
			border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
		}
		.detH3 {
			line-height: 30px;
			color: #e6e6e7;
			text-align: center;
			margin: 10px 30px;
			min-height: 200px;
		}
	}
}
</style>
