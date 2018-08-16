/**
 * @Author: zhengu.jiang
 *
 * @Module: 品牌下选择门店下拉
 */
<template>
	<div id="elShop">
		<el-popover placement="bottom" width="500" trigger="click" @show="show" v-model="visible">
			<span slot="reference" class="el-dropdown-link el-dropdown-selfdefine shopbox">
				<span v-if="shopIds.length == 0" style="color:#c0c4cc">
					<i class="name">{{title}}</i>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<span v-else>
					<i class="name">已选择{{shopIds.length}}家门店</i>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
			</span>
			<div @click.stop class="detDivBox elshop">
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
						<el-tab-pane label="全部" name="first">
							<el-checkbox v-if="(item.storeAreaId == areaList.flag) || areaList.flag == -1" v-for="(item,index) in showShopList"
										 :key="index" v-model="item.selected" :label="item.shopName" border size="medium">
							</el-checkbox>
						</el-tab-pane>
						<el-tab-pane label="直营店" name="second">
							<el-checkbox v-if="item.ischain == 1 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
						</el-tab-pane>
						<el-tab-pane label="加盟店" name="third">
							<el-checkbox v-if="item.ischain == 2 && (item.storeAreaId == areaList.flag || areaList.flag == -1)" v-for="(item,index) in showShopList" :key="index" v-model="item.selected" :label="item.shopName" border size="medium"></el-checkbox>
						</el-tab-pane>
					</el-tabs>
				</div>
				<div style="text-align: left; margin-top: 10px">
					<el-button size="mini" type="info" @click="cancelAll()">取消全部</el-button>
					<el-button size="mini" type="primary" @click="selectAll()">选择全部</el-button>
				</div>
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
import http from 'src/manager/http';
export default {
	data(){
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
			index: 1,//区域移动
			shopName: '', //搜索店铺名
			visible: false,

			allShop:[],//通过接口获取的所有门店
		};
	},
	props: ['shopIds'],
	created(){
		this.getShopList();
//		this.selShop = this.shopIds;
	},
//	watch: {
//		visible: function(){
//			if(this.visible){
//				this.selShop = this.shopIds;
//				let res = this.showShopList;
//				for (let i = 0; i < res.length; i++) {
//					for(let j = 0; j < this.shopIds.length; j++){
//						if(this.shopIds[j] == res[i].id){
//							res[i].selected = true;
//						}else{
//							res[i].selected = false;
//						}
//					}
//				}
//			}
//		}
//	},
	watch:{
		'shopIds':{
			deep:true,
			handler: function () {
				this.init(false);
			}
		}
	},
	methods: {
		//获取店铺列表
		async getShopList(){
			this.allShop=await http.getShopList({
				data:{}
			});
			this.storeareaGetAllArea();
		},
		async init(type) {
			console.log(this.shopIds);
//			let res = storage.session('shopList');
			let res=utils.deepCopy(this.allShop);
			let index = 0;
			for (let i = 0; i < res.length; i++) {
				this.$set(res[i], 'selected', false);
				if(this.shopIds.includes(res[i].id)){
					res[i].selected = true;
				}
//				for(let j = 0; j < this.shopIds.length; j++){
//					if(this.shopIds[j] == res[i].id){
//						res[i].selected = true;
//					}else{
//						res[i].selected = false;
//					}
//				}
				if(res[i].storeAreaId === 0){
					index++;
				}
			}
			if(index!=0&&type){
				this.areaList.list.push({id: 0,name: '无区域'});
			}
			this.showShopList = utils.deepCopy(res);
			this.shopList = utils.deepCopy(res);

			console.log(this.showShopList)
		},
		async storeareaGetAllArea(){
			let res = await http.storeareaGetAllArea();
			if(res.length > 0){
				res.unshift({name: '全部', id: '-1'});
				this.areaList.list = res;
				this.init(true);
			}else{
				this.init(false);
			}
		},
		changeArea(res){
			if(res == '全部') {
				this.areaList.flag = '-1';
			}
			this.areaList.list.forEach(e => {
				console.log(e);
				if(e.name == res){
					this.areaList.flag = e.id;
				}
			});
		},
		slideLeft(){
			if (this.contentWidth > 400) {
				this.leftWidth = this.index++ * -200;
				if (this.leftWidth * -1 + 400 >= this.contentWidth) {
					this.leftWidth = -(this.contentWidth - 400);
					return false;
				}
			}
		},
		slideRight(){
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
		show(){
			console.log(this.$refs.content);
			if(this.areaList.list.length > 0){
				this.$nextTick(() => {
					this.contentWidth = this.$refs.content.clientWidth;
				});
			}
		},
		//搜索店铺
		searchShop(){
			if(!this.shopName){
				this.showShopList = utils.deepCopy(this.shopList);
				return false;
			}
			this.showShopList = this.shopList.filter(e=>{
				if(e.shopName.indexOf(this.shopName) != -1){
					return e;
				}
			});
		},
		//选择全部
		selectAll(){
			this.selCommon(true);
		},
		//取消全部
		cancelAll(){
			this.selCommon(false);
		},
		selCommon(type){
			for(let i = 0; i < this.showShopList.length; i++){
				if(this.activeName == 'first'){
					if(this.areaList.flag == '-1'){
						this.showShopList[i].selected = type;
					}else{
						if(this.showShopList[i].storeAreaId == this.areaList.flag){
							this.showShopList[i].selected = type;
						}
					}
					
				}else if(this.activeName == 'second'){
					if(this.areaList.flag == '-1' && this.showShopList[i].ischain == 1){
						this.showShopList[i].selected = type;
					}else{
						if(this.showShopList[i].storeAreaId == this.areaList.flag){
							this.showShopList[i].selected = type;
						}
					}
				}else if(this.activeName == 'third'){
					if(this.areaList.flag == '-1' && this.showShopList[i].ischain == 2){
						this.showShopList[i].selected = type;
					}else{
						if(this.showShopList[i].storeAreaId == this.areaList.flag){
							this.showShopList[i].selected = type;
						}
					}
				}
			}
		},
		ensure(){
			this.visible = false;
			let shopIds = [];
			for(let i = 0; i < this.showShopList.length; i++){
				if(this.showShopList[i].selected){
					shopIds.push(this.showShopList[i].id);
				}
			}
//			this.selShop = shopIds;
			this.$emit('chooseShop',shopIds);
		},
		cancel(){
			this.visible = false;
			//取消之后，再次打开弹窗恢复初始状态
			this.init(false);
		}
	}
}
</script>
<style>
.elshop .searchbox{
	width: 200px;
	height:40px;
	position: absolute;
	right: 5px;
	z-index: 10;
}
.elshop .el-tabs__header{
	width: 250px;
}
.elshop .el-tab-pane{
	max-height: 250px;
	overflow: auto;
}
.elshop .el-checkbox.is-bordered{
	margin-left: 10px;
	margin-bottom: 10px;
}
.elshop .area{
	height: 50px;
	padding: 0 30px;
}
.elshop .areabox{
	position: relative;
	width: 100%;
	height: 50px;
	overflow: hidden;
}
.elshop .areabox .box{
	position: absolute;
	transition: 0.5s;
	white-space:nowrap;
}
.elshop .area .icon{
	display: inline-block;
	width: 20px;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	font-size: 20px;
}
.elshop .area .left{
	position: absolute;
	left: 0;
	top: 0px;
}
.elshop .area .right{
	position: absolute;
	right: 0;
	top: 0px;
}
</style>

<style lang="less" scoped>
	#elShop{
		display: inline-block;
		.shopbox{
			cursor: pointer;
			display: inline-block;
			width: 200px;
			height: 40px;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			line-height: 40px;
			.name{
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
