<template>
	<div id="elShop">
		<el-popover placement="bottom" width="500" trigger="click" @show="show" v-model="visible" @hide="hide">
			<el-button slot="reference" plain class="el-dropdown-link el-dropdown-selfdefine shopbox">
				<span style="color:#c0c4cc">
					<i class="name">{{singleName | divide}}</i>
					<i class="el-icon-plus"></i>
				</span>
			</el-button>
			<div @click.stop class="detDivBox elshop">
				<i class="detI" style="left: 150px;"></i>
				<div class="searchbox">
					<el-input placeholder="请输入内容" v-model="shopName" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
					</el-input>
				</div>
				<div class="detH3" style="text-align: left;max-height: 500px;overflow: auto;">
					<el-tabs v-model="activeName">
						<template>
							<el-tab-pane label="全部" name="first">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
							<el-tab-pane label="微信" name="second">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-if="item.ischain == 3" v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
							<el-tab-pane label="门店" name="third">
								<el-radio-group v-model="singleName" size="medium">
									<el-radio v-if="item.ischain != 3" v-for="(item,index) in showShopList" :key="index" :label="item.shopName" border style="margin-bottom: 10px" @change="toSingle(item)"></el-radio>
								</el-radio-group>
							</el-tab-pane>
						</template>
					</el-tabs>
				</div>
				<!-- <div style="text-align: left; margin-top: 10px">
					<el-button size="mini" type="info" @click="cancelAll()">取消全部</el-button>
					<el-button size="mini" type="primary" @click="selectAll()">选择全部</el-button>
				</div> -->
				<div style="text-align: right; margin: 0">
					<el-button size="mini" type="text" @click="cancel()">取消</el-button>
					<el-button type="primary" size="mini" @click="ensure()">确定</el-button>
				</div>
			</div>
		</el-popover>
	</div>
</template>
<script>
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
//import http from 'src/manager/http';
export default {
	data() {
		return {
			title: '',
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
			index: 1, //区域移动
			shopName: '', //搜索店铺名
			visible: false,
			allShop: [], //通过接口获取的所有门店
			singleName: '', //单选选中的店铺名称
			singleId: [], //单选选中的id
		};
	},
	props: ['shopIds'],
	/*
	 shopIds选中的店铺id   eg:['12','23']
	 isSingle是否单选   默认为false
	 delShopId展示店铺id(过滤了部分的)
	* */
	created() {
		this.getShopList();
	},
	filters: {
		divide(str) {
			if (str.length < 10) {
				return str;
			} else {
				return str.substr(0, 10) + '';
			}
		}
	},
	watch: {
		'shopIds': 'init'
	},
	methods: {
		//获取店铺列表
		getShopList: function() {
			//this.allShop = this.delShopId;
			this.allShop = [];
			this.allShop = storage.session('shopList');
			let userDate = storage.session('userShop').currentShop;
			let wx = {
				shopName: '微信',
				id: userDate.id,
				ischain: userDate.ischain
			};
			this.allShop.push(wx);
			this.init();
		},
		//处理数据
		init() {
			let res = utils.deepCopy(this.allShop);
			console.log('单选');
			this.singleId = this.shopIds;
			if (this.singleId.length > 0) {
				for (let i = 0; i < this.allShop.length; i++) {
					if (this.singleId.includes(this.allShop[i].id)) {
						this.singleName = this.allShop[i].shopName;
						break;
					}
				}
			} else {
				this.singleName = '请选择卡属门店';
			}
			// for (let i = 0; i < this.allShop.length; i++) {
			// 	if (this.allShop[i].storeAreaId === 0) {
			// 		showNo = true;
			// 		break;
			// 	}
			// }
			this.showShopList = utils.deepCopy(res);
			this.shopList = utils.deepCopy(res);
		},
		slideLeft() {
			if (this.contentWidth > 400) {
				this.leftWidth = this.index++ * -200;
				if (this.leftWidth * -1 + 400 >= this.contentWidth) {
					this.leftWidth = -(this.contentWidth - 400);
					return false;
				}
			}
		},
		slideRight() {
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
						if (this.showShopList[i].storeAreaId == this.areaList.flag) {
							this.showShopList[i].selected = type;
						}
					}

				} else if (this.activeName == 'second') {
					if (this.areaList.flag == '-1' && this.showShopList[i].ischain == 1) {
						this.showShopList[i].selected = type;
					} else {
						if (this.showShopList[i].storeAreaId == this.areaList.flag) {
							this.showShopList[i].selected = type;
						}
					}
				} else if (this.activeName == 'third') {
					if (this.areaList.flag == '-1' && this.showShopList[i].ischain == 2) {
						this.showShopList[i].selected = type;
					} else {
						if (this.showShopList[i].storeAreaId == this.areaList.flag) {
							this.showShopList[i].selected = type;
						}
					}
				}
			}
		},
		ensure() {//确定返回的
			this.visible = false;
			this.$emit('chooseShop', this.singleId);
		},
		cancel() {//点击取消
			this.visible = false;
			//取消之后，再次打开弹窗恢复初始状态
			this.init();
		},
		//展开时显示
		show() {
			// this.allShop = this.delShopId;
			// this.init();
			this.getShopList();
		},
		//隐藏时显示
		hide() {
			this.init();
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
		// cursor: pointer;
		// display: inline-block;
		// width: 200px;
		// height: 42px;
		// border: 1px solid #dcdfe6;
		// border-radius: 4px;
		// line-height: 40px;
		.name {
			display: inline-block;
			width: 160px;
			padding-left: 10px;
		}
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
			border-color: #F7F7F7 #F7F7F7 #45404b #F7F7F7;
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