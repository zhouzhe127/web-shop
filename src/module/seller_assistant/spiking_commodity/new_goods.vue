<!--
    **新建疯抢商品
    *
    * 
    * *miaochuan.sha
    *
-->
<template>
	<div id="rushedConfiguration">
		<!-- 新建疯抢商品 -->
		<div class="set-line">
			<div class="titles">新建疯抢商品</div>
			<div class="line"></div>
		</div>
		<!-- 商品名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品名称</span>
			<!-- <input class="txtinp" type="text" v-model="name" maxlength="20" /> -->
			<el-input class="txtinp" type="text" v-model="name" maxlength="20"></el-input>
		</div>
		<!-- 商品列表图-->
		<div class="online-box clearfix" style="margin-bottom:0;">
			<span class="fl online-sub required">商品列表图</span>
			<!-- <div class="uploadImgs fl">
				 <a href="javascript:void(0);" class="addclassify fl" style="width:210px;">上传图片</a>
				<form enctype="multipart/form-data" id="waitImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					    @change="bgNameChange('',1,'waitImage')" />
				</form> 
			</div> -->
			<div class="uploadImgs">
				<el-button type="primary" icon="el-icon-plus" style="width:210px;" enctype="multipart/form-data">上传图片
				</el-button>
				<form enctype="multipart/form-data" id="waitImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="bgNameChange('',1,'waitImage')" />
				</form>
			</div>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 25px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				尺寸:128px*128 px
			</div>
		</div>
		<!-- 商品列表图片显示-->
		<div class="online-box clearfix" v-if="waitingImage != ''">
			<span class="fl online-sub"></span>
			<div class="listimg fl">
				<img alt="logo" v-bind:src="uploadUrl  + waitingImage" />
			</div>
		</div>
		<!-- 商品展示图片-->
		<div class="online-box clearfix" style="margin-bottom:0px;">
			<span class="fl online-sub required">商品展示图</span>
			<!-- <div class="uploadImgs fl">
				<a href="javascript:void(0);" class="addclassify fl" style="width:210px;">上传图片</a>
				<form enctype="multipart/form-data" id="startImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					    @change="bgNameChange('',2,'startImage')" />
				</form>
			</div> -->
			<div class="uploadImgs">
				<el-button type="primary" icon="el-icon-plus" style="width:210px;" enctype="multipart/form-data">上传图片
				</el-button>
				<form enctype="multipart/form-data" id="startImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="bgNameChange('',2,'startImage')" />
				</form>
			</div>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 25px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				尺寸:680px*270px
			</div>
		</div>
		<!-- 商品展示图片显示-->
		<div class="online-box clearfix" v-if="startingImage != ''">
			<span class="fl online-sub"></span>
			<div class="showimg fl">
				<img alt="logo" v-bind:src="uploadUrl  + startingImage" />
			</div>
		</div>
		<!-- 商品轮播图-->
		<div class="online-box clearfix" style="margin-bottom:0px">
			<span class="fl online-sub required">商品轮播图</span>
			<div class="uploadImgs">
				<el-button type="primary" icon="el-icon-plus" style="width:210px;" enctype="multipart/form-data">上传图片
				</el-button>
				<form enctype="multipart/form-data" id="bannerImg">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="fileBannerChange('bannerImg','1')" />
				</form>
			</div>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 25px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				尺寸:750px*750px(最多8张)
			</div>
		</div>
		<!-- 商品轮播图片显示-->
		<div class="online-box clearfix" v-if="imgList.length > 0">
			<span class="fl online-sub"></span>
			<section class="bannerbox">
				<div class="uploadImg fl" v-for="(i,index) in imgList" :key="index">
					<img alt="logo" :src="uploadUrl  + i.bannerImage" />
					<div class="delet">
						<div class="imgname fl">
							{{i.bannerImageName}}
						</div>
						<div class="delimg fl" @click="delImageInList(index,i,'1')">
						</div>
					</div>
				</div>
			</section>
		</div>
		<!-- 商品卖价 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品卖价</span>
			<el-input type="text" name="" class="txtinp" v-model="price" maxlength="6" placeholder="请输入数字" onkeyup="value=value.replace(/[^\d\.]/g,'')" v-on:blur="changeCount('1')" />
		</div>
		<!-- 商品原价 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">商品原价</span>
			<el-input type="text" class="txtinp" name="" placeholder="请输入数字" v-model="originalPrice" maxlength="6" onkeyup="value=value.replace(/[^\d\.]/g,'')" v-on:blur="changeCount('2')" />
		</div>
		<!-- 商品库存 -->
		<div class="online-box clearfix" style="margin-bottom: 25px;">
			<span class="online-sub fl required">商品库存</span>
			<el-button type="primary" icon="el-icon-plus" style="width:210px;" @click="openStore()">增加门店库存</el-button>
		</div>
		<!-- 商品库存显示 -->
		<div class="online-box clearfix" v-show="shopstock.length > 0">
			<span class="online-sub fl"></span>
			<div class="stocklist fl">
				<ul class="heads">
					<li>操作</li>
					<li>门店名称</li>
					<li>库存数量</li>
				</ul>
				<ul class="contents" v-for="(item,index) in shopstock" v-if="item.stock != ''" :key="index">
					<li>
						<a href="javascript:void(0);" @click="delstockList(item,index)">删除</a>
					</li>
					<li>{{getShopname(item.shopId)}}</li>
					<li>{{item.stock}}</li>
				</ul>
			</div>
		</div>
		<!-- 商品详情图片-->
		<div class="online-box clearfix" style="margin-bottom:0px">
			<span class="fl online-sub required">商品详情</span>
			<div class="uploadImgs">
				<el-button type="primary" icon="el-icon-plus" style="width:210px;" enctype="multipart/form-data">上传图片
				</el-button>
				<form enctype="multipart/form-data" id="detailbannerImg">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''" @change="fileBannerChange('detailbannerImg','2')" />
				</form>
			</div>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 25px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				尺寸:750px*750px(最多5张)
			</div>
		</div>
		<!-- 商品详情图片显示-->
		<div class="online-box clearfix" v-if="detailimgList.length > 0">
			<span class="fl online-sub"></span>
			<section class="detailbanner">
				<div class="uploadImg fl" v-for="(i,index) in detailimgList" :key="index">
					<img alt="logo" :src="uploadUrl  + i.bannerImage" />
					<div class="delet">
						<div class="imgname fl">
							{{i.bannerImageName}}
						</div>
						<div class="delimg fl" @click="delImageInList(index,i,'2')">
						</div>
					</div>
				</div>
			</section>
		</div>
		<!-- 抢购上限 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">抢购上限</span>
			<el-input class="txtinp" type="text" v-model="grabCount" maxlength="2" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
			<div class="icon" @click="showText()">
				<div class="detDiv" v-if="hiddenText">
					<i class="detI triright"></i>
					<h3 class="detH3">该疯抢商品一次活动内最多可抢购次数</h3>
				</div>
			</div>
			<div class="tips">
				填写范围1至99之间。
			</div>
		</div>
		<!-- 取消保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<!-- <a href="javascript:void(0);" class="gray fl" style="width: 200px;margin-right:10px;" @click="returnStore()">取消</a> -->
			<el-button type="info" style="width: 200px;margin-right:10px;" @click="returnStore()">取消</el-button>
			<!-- <a href="javascript:void(0);" class="yellow fl" style="width: 200px;" @click="addconfig()">保存</a> -->
			<el-button type="primary" style="width: 200px;margin-right:10px;" @click="addconfig()">保存</el-button>
		</div>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :shopList='shopList'></component>
	</div>
</template>
<script type="text/javascript">
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import getAppliedWin from './new_goods_win.vue';
	import utils from 'src/verdor/utils';

	export default {
		data() {
			return {
				activityId: '', //活动id
				goodsId: '', //商品id
				shopId: '', //店铺Id
				uploadUrl: '',
				imgList: [], //图片列表
				waitingImage: '', //列表图片路径
				waitingImageName: '', //列表时片名称
				startingImage: '', //展示时图片
				startingImageName: '', //展示时图片名称
				detailimgList: [], //图片列表
				showWin: false, //弹窗默认关闭状态
				isPopupwindow: '',
				deleteImage: [], // 被删除的图片
				shopStock: '', //店铺库存
				name: '', //商品名称
				price: '', //商品卖价
				originalPrice: '', //商品原价
				allimg: [], //图片集合
				shopList: [], //店铺列表
				shopstock: [], //获取店铺库存
				hiddenText: false,
				grabCount: '1', //限购上限
			};
		},
		methods: {
			showText() {
				this.hiddenText = !this.hiddenText;
			},
			async bgNameChange(imgJson, type, id) {
				// 上传图片 背景图片回调
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: id,
				});
				let bgName = null;
				switch (type) {
					case 1:
						this.waitingImage = res;
						bgName = this.waitingImage.lastIndexOf('/');
						this.waitingImageName = this.waitingImage.substring(bgName + 1, this.waitingImage.length);
						break;
					case 2:
						this.startingImage = res;
						bgName = this.startingImage.lastIndexOf('/');
						this.startingImageName = this.startingImage.substring(bgName + 1, this.startingImage.length);
						break;
				}
			},
			async fileBannerChange(formId, type) {
				let res = await http.bannerImgUpload({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: formId
				});
				if (res) {
					let bgName = null;
					switch (type) {
						case '1':
							let obj = {};
							obj.bannerImage = res;
							bgName = obj.bannerImage.lastIndexOf('/');
							obj.bannerImageName = obj.bannerImage.substring(bgName + 1, obj.bannerImage.length);
							obj.type = 0;
							if (this.imgList.length < 8) {
								this.imgList.push(obj);
							} else {
								this.$store.commit('setWin', {
									winType: 'alert',
									content: '最多上传八张图片',
									title: '提示信息'
								});
							}
							break;
						case '2':
							let detailobj = {};
							detailobj.bannerImage = res;
							bgName = detailobj.bannerImage.lastIndexOf('/');
							detailobj.bannerImageName = detailobj.bannerImage.substring(bgName + 1, detailobj.bannerImage.length);
							detailobj.type = 1;
							if (this.detailimgList.length < 5) {
								this.detailimgList.push(detailobj);
							} else {
								this.$store.commit('setWin', {
									winType: 'alert',
									content: '最多上传五张图片',
									title: '提示信息'
								});
							}
							break;
						default:
							break;
					}
				}
			},
			returnStore: function() {
				this.$router.push('/admin/Assistantgood');
			},
			getResult: function(res, item) {
				if (res == 'ok') {
					for (let i = 0; i < item.length; i++) {
						let shopId = item[i].id;
						let stock = item[i].stock;
						this.shopstock[i] = {
							shopId: shopId,
							stock: stock
						};
					}
				}
				this.showWin = false;
			},
			openStore: function() { //打开新增用户标签的弹窗
				this.showWin = true; //打开弹窗
				this.isPopupwindow = 'getAppliedWin';
				for (let i = 0; i < this.shopstock.length; i++) {
					for (let j = 0; j < this.shopList.length; j++) {
						if (this.shopList[j].id == this.shopstock[i].shopId) {
							this.shopList[j].stock = this.shopstock[i].stock;
						}
					}
				}
			},
			delImageInList(index, i, type) {
				if (type == '1') {
					this.imgList.splice(index, 1);
				} else if (type == '2') {
					this.detailimgList.splice(index, 1);
				}
			},
			delstockList(item, index) { //删除库存
				let count = 0;
				for (let i = 0; i < this.shopstock.length; i++) {
					if (this.shopstock[i].stock != '') {
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
			async addconfig() {
				this.mergeObject(); //合并对象
				if (!this.checkForm()) return;
				let allimg = this.imgList.concat(this.detailimgList);
				let allimglist = [];
				for (let item of allimg) {
					let object = {};
					object.image = item.bannerImage;
					object.type = item.type;
					if (item.id) {
						object.id = item.id;
					}
					allimglist.push(object);
				}
				this.allimg = allimglist;
				let data = await http.addordeitshop({
					data: {
						activityId: this.activityId, //活动id
						goodsId: this.goodsId, //商品id
						name: this.name, //商品名称
						price: this.price, //商品卖价
						originalPrice: this.originalPrice, //商品原价
						listImage: this.waitingImage, //商品列表图
						showImage: this.startingImage, //商品展示图
						imageList: this.allimg, //轮播图
						shopStocks: this.shopStock, //库存
						grabCount: this.grabCount, //限购上限
					}

				});
				if (data) {
					this.$store.commit('setWin', {
						content: '保存成功',
						winType: 'alert',
						title: '操作提示',
					});
					this.returnStore();
				}
			},
			checkForm() { //合格返回true
				if (!global.checkData(
					{
						'name': {
							cond: '$$.length > 0',
							pro: '请输入商品名称'
						},
						'waitingImage': {
							cond: '$$.length > 0',
							pro: '请上传商品列表图'
						},
						'startingImage': {
							cond: '$$.length > 0',
							pro: '请上传商品展示图'
						},
						'imgList': {
							cond: '$$.length > 0',
							pro: '请上传商品轮播图'
						},
						'shopStock': {
							cond: 'Object.keys($$).length > 0',
							pro: '请增加门店库存'
						},
						'detailimgList': {
							cond: '$$.length > 0',
							pro: '请上传商品详情图'
						},
						'grabCount': {
							cond: '$$.length>0 && ((/^([0-9])+([.][0-9]+)?$/).test($$))',
							pro: '请输入限购上限，且只能是1~99之间'
						}
					}, this)) return false;
				if (this.price == '' || this.price == 0) {
					this.$store.commit('setWin', {
						content: '请输入商品卖价且只能是大于0的非负数',
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				if (this.originalPrice == '' || this.originalPrice == 0) {
					this.$store.commit('setWin', {
						content: '请输入商品原价且只能是大于0的非负数',
						winType: 'alert',
						title: '操作提示',
					});
					return false;
				}
				return true;
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
					if (this.shopstock[i].stock != '') {
						let id = this.shopstock[i].shopId;
						let shopStocks = this.shopstock[i].stock;
						this.shopStock = Object.assign(obj, {
							[id]: shopStocks
						});
					}
				}
			},
			changeCount: function(type) {
				switch (type) {
					case '1':
						this.price = utils.toFloatStr(this.price, 2);
						break;
					case '2':
						this.originalPrice = utils.toFloatStr(this.originalPrice, 2);
						break;
				}
			},
		},
		components: {
			onOff: () =>
				import( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
			calendar: () =>
				import( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
			selectBtn: () =>
				import( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
			getAppliedWin
		},
		mounted() {
			let userData = storage.session('userShop');
			this.uploadUrl = userData.uploadUrl;
			this.shopId = userData.currentShop.id;
			if (userData.currentShop.ischain == 3) {
				this.shopList = storage.session('shopList');
				for (let item of this.shopList) {
					item.name = item.shopName;
				}
			} else if (userData.currentShop.ischain == 0) {
				this.shopList.push(userData.currentShop);
			}
			if (storage.session('type') == 'edi') {
				let detail = storage.session('detail');
				let shopstock = storage.session('shopstock');
				let detailimg = storage.session('detailimg');
				let shufflingimg = storage.session('shufflingimg');
				this.activityId = detail.activityId; //活动id
				this.goodsId = detail.id; //商品id
				this.name = detail.name; //商品名称
				this.waitingImage = detail.listImage; //商品列表图片
				this.startingImage = detail.showImage; //商品展示图片
				for (let i = 0; i < shufflingimg.length; i++) {
					shufflingimg[i].bannerImage = shufflingimg[i].image;
					shufflingimg[i].bannerImageName = shufflingimg[i].image.substring(shufflingimg[i].image.lastIndexOf('/') + 1,
						shufflingimg[i].image.length);
					this.imgList.push(shufflingimg[i]);
				} //获取轮播图片 
				this.price = detail.price; //商品卖价
				this.originalPrice = detail.originalPrice; //商品原价

				this.grabCount = detail.grabCount; //限购上限

				this.shopstock = shopstock; //店铺库存
				for (let i = 0; i < this.shopstock.length; i++) {
					for (let j = 0; j < this.shopList.length; j++) {
						if (this.shopList[j].id == this.shopstock[i].shopId) {
							this.shopList[j].stock = this.shopstock[i].stock;
						} else {
							this.shopList[j].stock = '';
						}
					}
				}
				for (let i = 0; i < detailimg.length; i++) {
					detailimg[i].bannerImage = detailimg[i].image;
					detailimg[i].bannerImageName = detailimg[i].image.substring(detailimg[i].image.lastIndexOf('/') + 1, detailimg[i]
						.image.length);
					this.detailimgList.push(detailimg[i]);
				} //获取轮播图片
			} else if (storage.session('type') == 'add') {
				for (let i = 0; i < this.shopList.length; i++) {
					this.shopList[i].stock = '';
				}
			}
			// console.log(this.grabCount);

		}
	};
</script>
<style type="text/css" scoped>
	#rushedConfiguration {
		width: 1200px;
		height: auto;
	}

	#rushedConfiguration .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#rushedConfiguration .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	#rushedConfiguration .set-line .line {
		display: inline-block;
		width: 850px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#rushedConfiguration .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#rushedConfiguration .online-box .stocklist {
		width: 685px;
		min-height: 40px;
		border: 1px solid #D2D2D2;
	}

	#rushedConfiguration .online-box .stocklist .heads {
		width: 100%;
		height: 40px;
		background: #F2F2F2;
	}

	#rushedConfiguration .online-box .stocklist .heads li {
		width: 33.33%;
		float: left;
		text-align: center;
		line-height: 40px;
	}

	#rushedConfiguration .online-box .stocklist .contents {
		width: 100%;
		height: 60px;
		border-bottom: 2px solid #F2F2F2;
	}

	#rushedConfiguration .online-box .stocklist .contents li {
		float: left;
		text-align: center;
		height: 60px;
		line-height: 60px;
		width: 33.33%;
	}

	#rushedConfiguration .online-box .stocklist .contents li:nth-child(1) a {
		color: #FF3D04;
	}

	#rushedConfiguration .online-box .stocklist .contents li:nth-child(2) {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#rushedConfiguration .online-box .detailbanner {
		min-width: 322px;
		height: auto;
		overflow: hidden;
	}

	#rushedConfiguration .online-box .bannerbox {
		width: 896px;
		height: auto;
		overflow: hidden;
	}

	#rushedConfiguration .online-box .txtinp {
		width: 210px;
		height: 38px;
		/* text-indent: 10px; */
	}

	#rushedConfiguration .online-box .online-sub {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
		font-size: 16px;
	}

	#rushedConfiguration .clearfix::before,
	#rushedConfiguration .clearfix::after {
		display: table;
		content: “”;
	}

	#rushedConfiguration .clearfix::after {
		clear: both;
	}

	/*日期组件*/

	#rushedConfiguration .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#rushedConfiguration .tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		color: #999999;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg {
		width: 332px;
	}

	#rushedConfiguration .online-box .bannerbox .uploadImg {
		width: 214px;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg,
	#rushedConfiguration .online-box .bannerbox .uploadImg {
		height: auto;
		overflow: hidden;
		margin-right: 10px;
		margin-bottom: 10px;
	}

	#rushedConfiguration .online-box .listimg {
		width: 140px;
		height: 88px;
	}

	#rushedConfiguration .online-box .listimg img {
		display: block;
		width: 88px;
		height: 88px;
		float: left;
		border: 1px solid #b0b0b0;
	}

	#rushedConfiguration .online-box .listimg .deletimg {
		width: 52px;
		height: 88px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#rushedConfiguration .online-box .showimg {
		width: 384px;
		height: 132px;
	}

	#rushedConfiguration .online-box .showimg img {
		display: block;
		width: 332px;
		height: 132px;
		float: left;
		border: 1px solid #b0b0b0;
	}

	#rushedConfiguration .online-box .showimg .deletimg {
		width: 52px;
		height: 132px;
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#rushedConfiguration .online-box .listimg .deletimg img,
	#rushedConfiguration .online-box .showimg .deletimg img {
		display: block;
		width: 16px;
		height: 19px;
		border: none;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg img,
	#rushedConfiguration .online-box .bannerbox .uploadImg img {
		display: block;
		border: 1px solid #b0b0b0;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg img {
		width: 332px;
		height: 214px;
	}

	#rushedConfiguration .online-box .bannerbox .uploadImg img {
		width: 214px;
		height: 132px;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg .delet,
	#rushedConfiguration .online-box .bannerbox .uploadImg .delet {
		width: 100%;
		height: 30px;
		padding-top: 10px;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg .delet .imgname,
	#rushedConfiguration .online-box .bannerbox .uploadImg .delet .imgname {
		width: 80%;
		height: 20px;
		text-align: center;
		line-height: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	#rushedConfiguration .online-box .detailbanner .uploadImg .delet .delimg,
	#rushedConfiguration .online-box .bannerbox .uploadImg .delet .delimg {
		width: 20%;
		height: 20px;
		background: url(../../../../src/res/icon/icondelete.png) no-repeat center;
	}

	#rushedConfiguration .online-box .uploadImgs {
		position: relative;
	}

	#rushedConfiguration .online-box .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}

	#rushedConfiguration .online-box .icon {
		display: inline-block;
		width: 18px;
		height: 18px;
		background: url(../../../../src/res/icon/orderdetial18.png) no-repeat center;
		position: relative;
		vertical-align: middle;
		cursor: pointer;
	}

	#rushedConfiguration .online-box .icon .detDiv {
		display: inline-block;
		width: 260px;
		background: #45404b;
		position: absolute;
		top: -10px;
		left: 35px;
		padding: 10px;
		box-shadow: 3px 2px 10px #ccc;
		z-index: 100;
	}

	#rushedConfiguration .online-box .icon .detDiv .detI {
		width: 0;
		height: 0;
		line-height: 0;
		position: absolute;
		top: 10px;
		left: -20px;
		right: 30%;
		border-width: 10px;
		border-top: 0px;
		border-style: solid;
		border-color: #f7f7f7 #f7f7f7 #45404b #f7f7f7;
	}

	#rushedConfiguration .online-box .icon .detDiv .detH3 {
		line-height: 22px;
		color: #e6e6e7;
	}

	#rushedConfiguration .online-box .icon .detDiv .triright {
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 10px solid #45404b;
		border-left: 10px solid transparent;
	}
</style>