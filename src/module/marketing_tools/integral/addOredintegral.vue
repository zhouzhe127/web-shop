/** * @file * * 积分商城兑换管理 * * @author zhengu.jiang */
<template>
	<div id="user">
		<!-- 品牌单店 -->
		<div class="comList clearfix">
			<span class="store fl" v-for="(item,index) in bannerList" :key='index' v-bind:class="{'active':indexOn == index}" @click="isFlag && chooseBanner(index)">{{item.name}}</span>
		</div>
		<!-- 商品类型 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品类型</span>
			<div class="rightHalf">
				<select-btn :name='durationName' :sorts="durationList.map(v=>v.name)" :width="200" @selOn="selexpirationTime"></select-btn>
			</div>
		</div>
		<!-- 关联优惠券 -->
		<div class="online-box clearfix" v-if="durationId == 1">
			<span class="online-sub fl required">关联优惠券</span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="addclassify" style="width:200px;" @click="addCount">选择关联优惠券</a>
				<span v-if="selectCoupon.length > 0">(已关联{{selectCoupon.length}}张)</span>
			</div>
		</div>
		<!-- 商品名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品名称</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入积分商品名称" v-model='name' maxlength="10" />
			</div>
		</div>
		<!-- 兑换所需积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">兑换所需积分</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入兑换所需积分" v-model='price' maxlength="8" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" />
			</div>
		</div>
		<!-- 兑换所需现金 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">兑换所需现金</span>
			<div class="rightHalf">
				<input type="text" class="name" onkeyup="value=value.replace(/[^\d\.]/g,'')" maxlength="6" @blur="formatValue" placeholder="请输入兑换现金" v-model='cash' />
			</div>
		</div>
		<!-- 填写库存 -->
		<div class="online-box clearfix" v-if='indexOn == 0'>
			<span class="online-sub fl required">填写库存</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请填写库存" v-model='inventory' maxlength="5" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" />
			</div>
		</div>
		<!-- 商品库存 -->
		<div class="online-box clearfix" v-if='indexOn == 1'>
			<span class="online-sub fl required">商品库存</span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="addclassify" @click="choiceShop()" style="width:200px;">增加门店库存</a>
			</div>
		</div>
		<div class="online-box clearfix" v-show="indexOn== 1 && shopstock.length > 0">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<div class="stocklist" v-show="indexOn== 1 && shopstock.length > 0">
					<ul class="heads">
						<li>操作</li>
						<li>门店名称</li>
						<li>库存数量</li>
					</ul>
					<ul class="contents" v-for="(item,index) in shopstock" v-if="item.spareStock != ''" :key="index">
						<li>
							<a href="javascript:void(0);" @click="delstockList(item,index)">删除</a>
						</li>
						<li>{{getShopname(item.shopId)}}</li>
						<li>{{item.spareStock}}</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 商品排序 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品排序</span>
			<div class="rightHalf">
				<input type="text" class="name" placeholder="请输入商品排序(1-255)" v-model='sort' maxlength="3" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" />
			</div>
		</div>
		<!-- 是否上架： -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">是否上架</span>
			<div class="rightHalf">
				<onoff @statusChange="getOnoff" :status="status"></onoff>
			</div>
		</div>
		<!-- 购买次数 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">购买次数</span>
			<div class="rightHalf">
				<input type="text" class="name" v-model='limit' onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="3" placeholder="请输入购买次数" />
			</div>
		</div>
		<!-- 过期时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">过期时间</span>
			<div class="rightHalf">
				<input type="text" class="name" v-model="expire" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="3" placeholder="请输入过期时间" />
			</div>
		</div>
		<!-- 过期时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">商品描述</span>
			<div class="rightHalf">
				<textarea class="tarea" placeholder="请输入商品描述" v-model="description"></textarea>
			</div>
		</div>
		<!-- 添加详情图片 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">添加详情图片</span>
			<div class="rightHalf">
				<div class="right_box_a">
					<img :src='imgHost + bigName' height="100%" width="100%" v-if="bigName != null" />
					<img src="../../../res/images/adds.png" style="margin-bottom: 20px;" v-if="bigName == null" />
					<p style="font-size: 16px;" v-if="bigName == null">添加详情图片</p>
					<form id="bigform" enctype="multipart/form-data">
						<input type="file" @change="fileNameChange" id="big_upload" name="image" accept="image/jpeg,image/png,image/gif,image/tiff" style="height: 100%;width: 100%;cursor: pointer;position: absolute;left: 0;top: 0;opacity: 0;" />
					</form>
				</div>
			</div>
		</div>
		<!-- 添加缩略图片 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">添加缩略图片</span>
			<div class="rightHalf">
				<div class="right_box_b">
					<img :src='imgHost + fileName' height="100%" width="100%" v-if="fileName != null" />
					<div class="fl">
						<img src="../../../res/images/adds.png" style="margin-bottom: 20px;" v-if="fileName == null" />
						<p style="font-size: 16px;" v-if="fileName == null">添加缩略图片</p>
					</div>
					<form id="Imgform" enctype="multipart/form-data" class="clearfix" style="position: relative;">
						<input type="file" id="file_upload" @change="smartFile" name="image" accept="image/jpeg,image/png,image/gif,image/tiff" style="height: 100%;width: 100%;cursor: pointer;opacity: 0;position: absolute;left:0;top:0;" />
					</form>
				</div>
			</div>
		</div>
		<!-- 过期时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<a href="javascript:void(0);" class="gray fl" style="margin-right: 15px;width:190px;" @click="cancelFun">取消</a>
				<a href="javascript:void(0);" class="yellow fl" @click="okFun" style="width:190px;">保存</a>
			</div>
		</div>
		<!-- 优惠券的弹窗 -->
		<birthCoupon v-if='showBirthCoupon' :selectCoupon='selectCoupon' :couponList='couponList' @winEvent='winEvent'></birthCoupon>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :shopList='shopList'></component>
	</div>
</template>
<script>
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
import getAppliedWin from './../../seller_assistant/new_goods_win.vue';

export default {
	data() {
		return {
			bannerList: [{
				name: '品牌商品'
			},
			{
				name: '门店商品'
			}
			], //固定还是自定义方案，数组
			isFlag: true,
			indexOn: 0, //默认固定
			durationList: [{ //活动期限
				name: '积分商品',
				id: 0
			},
			{
				name: '优惠券',
				id: 1
			},
			],
			durationId: 0,
			durationName: '积分商品', //状态
			showBirthCoupon: false,
			couponList: [], //优惠券列表
			selectCoupon: [], //选中的列表
			name: '', //商品名称
			price: '', //所需积分
			// imageName : '',
			inventory: '', //库存
			sort: null, //商品排序
			status: false,
			gid: null,
			imgData: null,
			fileName: null,
			expire: 0, //过期时间
			limit: 0, //购买次数
			description: '',
			bigName: null,
			title: '',
			cash: '0', //兑换所需的现金
			showWin: false,
			ass: '',
			shopList: [], //店铺列表
			isPopupwindow: '',
			shopStock: '', //店铺库存
			shopstock: [], //获取店铺库存
			editInfos: ''
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.imgHost = userData.uploadUrl;
		this.ischain = userData.currentShop.ischain;
		this.uid = userData.user.id;
		if (this.ischain == 3) {
			this.shopList = storage.session('shopList');
			for (let item of this.shopList) {
				item.name = item.shopName;
			}
		} else if (this.ischain == 0) {
			this.shopList.push(userData.currentShop);
		}
		for (let i = 0; i < this.shopList.length; i++) {
			this.shopList[i].stock = '';
		}
		let editInfos = storage.session('editInfos');
		this.editInfos = editInfos;
		if (this.editInfos) {
			this.title = '编辑积分商品';
			this.isFlag = !this.isFlag;
			// if (this.editInfos.coupons && this.editInfos.coupons != '') {
			// 	console.log(this.editInfos.coupons)
			// 	 this.selectCoupon = JSON.parse(this.editInfos.coupons);
			// }
			for (let key in this.editInfos) {
				this[key] = this.editInfos[key];
				if (key == 'status')
					this.status = Boolean(this.editInfos.status == '已上架');
				if (key == 'type')
					this.indexOn = this.editInfos.type;
				if (key == 'id') this.gid = this.editInfos.id;
				if (key == 'bigImage')
					this.bigName =
					this.editInfos.bigImage == '' ?
						null :
						this.editInfos.bigImage;
				if (key == 'imageName')
					this.fileName =
					this.editInfos.imageName == '' ?
						null :
						this.editInfos.imageName;
				if (key == 'goodsType')
					this.durationId = this.editInfos.goodsType;
				this.durationName = this.durationList[this.durationId].name;
				if (key == 'coupons') {
					if (this.editInfos.coupons && this.editInfos.coupons != '') {
						this.selectCoupon = JSON.parse(this.editInfos.coupons);
					}
				}
			}
			this.getGoodsStock(); //获取门店的库存
		} else {
			this.title = '添加积分商品';
		}
	},
	methods: {
		errorShow(content) {
			this.$store.commit('setWin', {
				title: '提示信息',
				winType: 'alert',
				content: content
			});
		},
		chooseBanner: function(index) {
			this.indexOn = index;
		},
		okFun() {
			if (this.durationId == 1 && this.selectCoupon.length == 0) {
				this.errorShow('请选择优惠券');
				return false;
			}
			if (this.name == '' || this.name.length == 0) {
				this.errorShow('请先填写积分商品名称！');
				return false;
			}
			if (this.name == '0') {
				this.errorShow('积分商品名称不能为0！');
				return false;
			}
			if (this.price == '' || this.price.length == 0) {
				this.errorShow('请先填写所需兑换积分！');
				return false;
			}
			if (isNaN(Number(this.price))) {
				this.errorShow('兑换积分必须为数字！');
				return false;
			}
			if (Number(this.price) < 0) {
				this.errorShow('兑换积分必须为大于等于0！');
				return false;
			}
			if (this.indexOn == 0) {
				if (this.inventory == '' || this.inventory.length == 0) {
					this.errorShow('请先填写商品库存！');
					return false;
				}
				if (isNaN(Number(this.inventory))) {
					this.errorShow('商品库存必须为数字！');
					return false;
				}
			}
			this.mergeObject(); //合并对象
			if (this.indexOn == 1 && Object.keys(this.shopStock).length <= 0) {
				this.errorShow('请填写门店库存!');
				return false;
			}
			if (this.sort == null) {
				this.errorShow('排序不能为空！');
				return false;
			}
			if (isNaN(this.sort)) {
				this.errorShow('排序必须为数字！');
				return false;
			}
			if (this.sort > 255 || this.sort <= 0) {
				this.errorShow('排序不能小于0大于255！');
				return false;
			}
			if (this.description == '') {
				this.errorShow('请输入商品描述！');
				return false;
			}
			if (this.fileName == null) {
				this.errorShow('缩略图片不能为空！');
				return false;
			}
			if (this.bigName == null) {
				this.errorShow('详情图片不能为空！');
				return false;
			}
			this.description = this.description.replace(/\n/g, '<br>');
			let status = this.status == true ? 0 : 1;
			let data = {
				id: this.editInfos ? this.gid : '',
				name: this.name, //商品名称
				price: this.price, // 兑换所需积分
				imageName: this.fileName, // 图片名称
				inventory: this.inventory, //库存
				sort: this.sort, // 排序
				description: this.description, // 商品详情
				status: status, //商品状态 0.上架 1.下架
				uid: this.uid, //用户ID
				expire: this.expire,
				limit: this.limit,
				bigImage: this.bigName,
				cash: this.cash, //兑换所需的现金
				type: this.indexOn, //类型 区分品牌商品和门店商品
				shopStocks: this.shopStock, //门店的库存
				goodsType: this.durationId,
				coupons: this.selectCoupon //优惠券
			};
			if (this.editInfos) {
				this.ActivityGoodsedit(data);
			} else {
				this.ActivityGoodsadd(data);
			}
			//this.$emit('winEvent', 'ok', data);
			//console.log(data, 'data');
		},
		cancelFun() {
			// this.$emit('winEvent', 'cancel');
			this.$router.push('/admin/integralMall');
		},
		closeFun() {
			this.$emit('winEvent', 'close');
		},
		getOnoff(res) {
			this.status = res;
		},
		//详情图片上传
		async fileNameChange() {
			let res = await http.fileUpload({
				data: {
					type: 5,
					shopId: storage.session('shopId')
				},
				formId: 'bigform'
			});
			this.bigName = res;
		},
		//缩略图片上传
		async smartFile() {
			let res = await http.fileUpload({
				data: {
					type: 5,
					shopId: storage.session('shopId')
				},
				formId: 'Imgform'
			});
			this.fileName = res;
		},
		formatValue: function() {
			this.cash = utils.toFloatStr(this.cash, 2);
		},
		choiceShop: function() {
			this.showWin = true; //打开弹窗
			this.isPopupwindow = 'getAppliedWin';
			for (let i = 0; i < this.shopstock.length; i++) {
				for (let j = 0; j < this.shopList.length; j++) {
					if (this.shopList[j].id == this.shopstock[i].shopId) {
						this.shopList[j].stock = this.shopstock[i].spareStock;
					}
				}
			}
		},
		getResult: function(res, item) {
			if (res == 'ok') {
				for (let i = 0; i < item.length; i++) {
					let shopId = item[i].id;
					let stock = item[i].stock;
					this.shopstock[i] = {
						shopId: shopId,
						spareStock: stock
					};
				}
			}
			this.showWin = false;
		},
		delstockList(item, index) { //删除库存
			let count = 0;
			for (let i = 0; i < this.shopstock.length; i++) {
				if (this.shopstock[i].spareStock != '') {
					count++;
				}
			}
			if (count <= 1) {
				this.$store.commit('setWin', {
					content: `请保持至少有一家门店有库存`,
					winType: 'alert',
					title: '操作提示',
				});
				return false;
			}
			this.shopstock.splice(index, 1);
			if (item) {
				for (let i = 0; i < this.shopList.length; i++) {
					if (item.shopId == this.shopList[i].id) {
						this.shopList[i].stock = '';
					}
				}
			}
		},
		getShopname: function(shopId) {
			for (let i = 0; i < this.shopList.length; i++) {
				if (shopId == this.shopList[i].id) {
					return this.shopList[i].name;
				}
			}
		},
		mergeObject: function() {
			let obj = {};
			for (let i = 0; i < this.shopstock.length; i++) { //传给后台的数据
				if (this.shopstock[i].spareStock != '') {
					let id = this.shopstock[i].shopId;
					let shopStocks = this.shopstock[i].spareStock;
					this.shopStock = Object.assign(obj, {
						[id]: shopStocks
					});
				}
			}
		},
		async getGoodsStock() { //通过积分商品的id获取到商品的库存
			let data = await http.getGoodsStocks({
				data: {
					id: this.gid //积分商品的id
				}
			});
			this.shopstock = data; //店铺库存
			for (let i = 0; i < this.shopstock.length; i++) {
				for (let j = 0; j < this.shopList.length; j++) {
					if (this.shopList[j].id == this.shopstock[i].shopId) {
						this.shopList[j].stock = this.shopstock[i].spareStock;
					} else {
						this.shopList[j].stock = '';
					}
				}
			}
		},
		selexpirationTime: function(i) { //商品名称
			this.durationName = this.durationList[i].name; //点击对应的名字
			this.durationId = this.durationList[i].id; //点击对应的id
		},
		async addCount() {
			let data = await http.getGetCouponCondition({});
			let coupons = [];
			for (let item of data) {
				if (item.type != 7) {
					coupons.push(item);
				}
			}
			this.couponList = coupons;
			this.goodsCom = data;
			this.goodsCom.forEach(function(item) {
				item.num = 1;
			});

			this.showBirthCoupon = true;

		},
		winEvent(obj) {
			this.showBirthCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.select;
				this.couponList = obj.data.list;
			}
		},
		//修改商品
		async ActivityGoodsedit(data) {
			let res = await http.ActivityGoodsedit({
				data: data
			});
			if (res) {
				this.$router.push('/admin/integralMall');
			}
			//this.getActivityGoodsList();
		},
		//添加商品
		async ActivityGoodsadd(data) {
			let res = await http.ActivityGoodsadd({
				data: data
			});
			if (res) {
				this.$router.push('/admin/integralMall');
			}
			//this.getActivityGoodsList();
		},
	},
	components: {
		getAppliedWin,
		onoff: () =>
			import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		selectBtn: () =>
			import ( /* webpackChunkName:"select_btn" */ 'src/components/select_btn'),
		'birthCoupon': () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './activity_birth_coupon'),
	},
	destroyed() {
		this.$store.commit('setPageTools', {});
		storage.session('editInfos', null);
	},
};
</script>
<style type="text/css" scoped>
#user .comList {
	margin-bottom: 20px;
}

#user .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#user .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#user .online-box .rightHalf {
	max-width: 900px;
	height: auto;
	float: left;
}

#user .online-box .rightHalf .name {
	width: 200px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#user .online-box .rightHalf .tarea {
	height: 175px;
	width: 280px;
	border: 1px solid #e2e2e2;
	box-sizing: border-box;
	resize: none;
	padding: 10px;
}

#user .online-box .rightHalf .right_box_a {
	width: 300px;
	height: 460px;
	border: 1px solid #e2e2e2;
	background-color: #f9f9f9;
	cursor: pointer;
	display: table-cell;
	text-align: center;
	vertical-align: middle;
	position: relative;
}

#user .online-box .rightHalf .right_box_b {
	width: 300px;
	height: 150px;
	/*position: absolute;
	right: 30px;
	top: 150px;*/
	border: 1px solid #e2e2e2;
	background-color: #f9f9f9;
	cursor: pointer;
}

#user .online-box .rightHalf .right_box_b div {
	margin-top: 20px;
	margin-left: 102px;
}

#user .store {
	width: 121px;
	height: 41px;
	display: block;
	font-size: 16px;
	text-align: center;
	line-height: 41px;
	cursor: pointer;
	margin: 0;
	background: #F2F2F2;
	color: #333;
}

#user .active {
	background: #28A8E0;
	color: #fff;
}

.stocklist {
	width: 400px;
	min-height: 40px;
	border: 1px solid #D2D2D2;
	margin-bottom: 10px;
}

.stocklist .heads {
	width: 100%;
	height: 40px;
	background: #F2F2F2;
}

.stocklist .heads li:nth-child(1) {
	width: 20%;
}

.stocklist .heads li:nth-child(2) {
	width: 60%;
}

.stocklist .heads li:nth-child(3) {
	width: 20%;
}

.stocklist .heads li {
	float: left;
	text-align: center;
	line-height: 40px;
}

.stocklist .contents {
	width: 100%;
	height: 60px;
	border-bottom: 2px solid #F2F2F2;
}

.stocklist .contents li {
	float: left;
	text-align: center;
	height: 60px;
	line-height: 60px;
}

.stocklist .contents li:nth-child(1) {
	width: 20%;
}

.stocklist .contents li:nth-child(2) {
	width: 60%;
}

.stocklist .contents li:nth-child(3) {
	width: 20%;
}

.stocklist .contents li:nth-child(1) a {
	color: #FF3D04;
}

.stocklist .contents li:nth-child(2) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>