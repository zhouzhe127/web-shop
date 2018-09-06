<template>
	<div id="win">
		<div class='win center'>
			<div class='win-head'>
				<span class='win-head-logo noselect'></span>
				<span class='win-head-title noselect'>
					{{title}}
				</span>
				<span class='win-head-close noselect' @click="closeFun"></span>
			</div>
			<div class='win-body' style="width:auto;height:610px">
				<div class="winCont" style="position: relative;">
					<div class="fl left_box">
						<div class="goodBox">
							<!-- 品牌单店 -->
							<div class="comList">
								<span class="store fl" v-for="(item,index) in bannerList" :key='index' v-bind:class="{'active':indexOn == index}" @click="isFlag && chooseBanner(index)">{{item.name}}</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">积分商品名称：</span>
								<span class="conCont fl">
									<input type="text" v-model="name" maxlength="14" placeholder="请输入积分商品名称" />
								</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">兑换所需积分：</span>
								<span class="conCont fl">
									<input type="text" v-model="price" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="8" placeholder="请输入兑换积分" />
								</span>
							</div>
							<!-- 兑换所需现金 -->
							<div class="comList">
								<span class="conTitle fl">兑换所需现金：</span>
								<span class="conCont fl">
									<input type="text" v-model="cash" onkeyup="value=value.replace(/[^\d\.]/g,'')" maxlength="6" @blur="formatValue" placeholder="请输入兑换现金" />
								</span>
							</div>
							<!-- 增加门店库存 -->
							<div class="comList" v-if="indexOn == 1">
								<span class="conTitle fl required">商品库存：</span>
								<span class="conCont fl">
									<a href="javascript:void(0);" class="addclassify fl" @click="choiceShop()">增加门店库存</a>
								</span>
							</div>
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
							<div class="comList" v-if='indexOn == 0'>
								<span class="conTitle fl required">填写库存：</span>
								<span class="conCont fl">
									<input type="text" v-model="inventory" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="5" placeholder="请输入输入库存" />
								</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">商品排序：</span>
								<span class="conCont fl">
									<input type="text" v-model="sort" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="3" placeholder="请输入商品排序(1-255)" />
								</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">是否上架：</span>
								<span class="conCont fl">
									<onoff @statusChange="getOnoff" :status="status"></onoff>
								</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">购买次数：</span>
								<span class="conCont fl" style="width: auto;">
									<input type="text" v-model="limit" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="3" placeholder="请输入购买次数" />
								</span>
							</div>
							<div class="comList">
								<span class="conTitle fl required">过期时间：</span>
								<span class="conCont fl" style="width: auto;">
									<input type="text" v-model="expire" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength="3" placeholder="请输入过期时间" />
								</span>
								<span class="fl" style="height: 40px;line-height: 40px;width: 50px;text-align: center;">天</span>
							</div>
							<div class="comList" style="height: 150px;">
								<span class="conTitle fl required">商品描述：</span>
								<textarea style="height: 100%;width: 280px;border: 1px solid #e2e2e2;box-sizing: border-box;resize: none;padding: 10px;" class="fl" placeholder="请输入商品描述" v-model="description"></textarea>
							</div>
						</div>
					</div>
					<div class="fl right_box">
						<div class="right_box_a">
							<img :src='imgHost + bigName' height="100%" width="100%" v-if="bigName != null" />
							<img src="../../../res/images/adds.png" style="margin-bottom: 20px;" v-if="bigName == null" />
							<p style="font-size: 16px;" v-if="bigName == null">添加详情图片</p>
							<form id="bigform" enctype="multipart/form-data">
								<input type="file" @change="fileNameChange" id="big_upload" name="image" accept="image/jpeg,image/png,image/gif,image/tiff" style="height: 100%;width: 100%;cursor: pointer;position: absolute;left: 0;top: 0;opacity: 0;" />
							</form>
						</div>
						<div class="right_box_b">
							<img :src='imgHost + fileName' height="100%" width="100%" v-if="fileName != null" />
							<div class="fl">
								<img src="../../../res/images/adds.png" style="margin-bottom: 20px;" v-if="fileName == null" />
								<p style="font-size: 16px;" v-if="fileName == null">添加缩略图片</p>
							</div>
							<form id="Imgform" enctype="multipart/form-data">
								<input type="file" id="file_upload" @change="smartFile" name="image" accept="image/jpeg,image/png,image/gif,image/tiff" style="height: 100%;width: 100%;cursor: pointer;position: absolute;left: 0;top: 0;opacity: 0;" />
							</form>
						</div>
						<div class="fl fl_right_a">
							750px*375px
						</div>
						<div class="fl fl_right_b">
							750px*1120px
						</div>
						<div class="eitFooter fr">
							<div style="width: 200px;" class="fr">
								<a href="javascript:void(0);" class="gray fl" style="margin-right: 15px;" @click="cancelFun">取消</a>
								<a href="javascript:void(0);" class="blue fl" @click="okFun">保存</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div ref="mask" class="win-mask" @click="closeFun"></div>
		<!-- 弹窗 -->
		<component v-if="showWin" :is="isPopupwindow" @getAppliedWin='getResult' :shopList='shopList'></component>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
import getAppliedWin from './../../seller_assistant/new_goods_win.vue';
export default {
	data() {
		return {
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
			bannerList: [{
				name: '品牌商品'
			},
			{
				name: '门店商品'
			}
			], //固定还是自定义方案，数组
			indexOn: 0, //默认固定	
			isFlag: true,
			showWin: false,
			ass: '',
			shopList: [], //店铺列表
			isPopupwindow: '',
			shopStock: '', //店铺库存
			shopstock: [], //获取店铺库存
		};
	},
	props: ['imgHost', 'editInfos', 'uid', 'ischain'],
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
				shopStocks: this.shopStock //门店的库存
			};
			this.$emit('winEvent', 'ok', data);
			//console.log(data, 'data');
		},
		cancelFun() {
			this.$emit('winEvent', 'cancel');
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
		}
	},
	mounted() {
		let userData = storage.session('userShop');
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
		if (this.editInfos) {
			this.title = '编辑积分商品';
			this.isFlag = !this.isFlag;
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
			}
			this.getGoodsStock(); //获取门店的库存
		} else {
			this.title = '添加积分商品';
		}
	},
	components: {
		getAppliedWin,
		onoff: () =>
			import ( /*webpackChunkName: 'on_off'*/ 'src/components/on_off')
	}
};
</script>
<style lang="less" scoped>
#win {
	.win {
		position: fixed;
		background-color: #fff;
		overflow: hidden;
		z-index: 999;
	}

	.win.center {
		top: 50%;
		transform: translate(0, -50%);
		width: 100%;
		height: 660px;
		z-index: 999;
		transform: translate(-50%, -50%);
		left: 50%;
		max-width: 1200px;
	}

	.win.right {
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
	}

	.win-head-close {
		display: none;
	}
	.win-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(27, 21, 21,.6);
		// background: url(../../../res/images/a50.png) repeat;
		z-index: 997;
		opacity: 1;
	}

	.win .win-head {
		position: relative;
		background-color: #e6e6e6;
		width: 100%;
		height: 50px;
		line-height: 50px;
		overflow: hidden;
	}

	.win .win-head-logo {
		float: left;
		width: 3px;
		height: 50px;
		background-color: #fbb03b;
		cursor: default;
	}

	.win .win-head-title {
		position: absolute;
		width: auto;
		height: 50px;
		line-height: 50px;
		top: 0px;
		left: 32px;
		cursor: default;
	}

	.win .win-head-close {
		float: right;
		width: 50px;
		height: 50px;
		cursor: pointer;
		background: url(../../../res/images/close.png) no-repeat center center;
	}

	.win .win-body {
		width: 100%;
		overflow: auto;
		height: auto;
		overflow-x: hidden;
		.winCont {
			.left_box {
				border-right: 1px solid #e2e2e2;
				width: 40%;
			}
			.right_box {
				width: 60%;
				padding: 30px;
				.right_box_a {
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
				.right_box_b {
					width: 300px;
					height: 150px;
					position: absolute;
					right: 30px;
					top: 150px;
					border: 1px solid #e2e2e2;
					background-color: #f9f9f9;
					cursor: pointer;
					div {
						margin-top: 20px;
						margin-left: 102px;
					}
				}
				.fl_right_a {
					color: #ccc;
					line-height: 50px;
					text-align: center;
					width: 300px;
					position: absolute;
					right: 30px;
					top: 300px;
				}
				.fl_right_b {
					color: #ccc;
					line-height: 50px;
					text-align: center;
					width: 300px;
				}
			}
		}
	}

	.win .win-body-str {
		padding: 15px;
		width: auto;
		height: auto;
		line-height: 25px;
		font-size: 14px;
	}

	.win .win-bottom {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		overflow: hidden;
		font-size: 0;
		display: block;
		background-color: #999;
	}

	.win .win-cancel {
		width: 50%;
		height: 50px;
		line-height: 50px;
		margin: 0px;
		padding: 0px;
		border: 0px;
		float: left;
	}

	.win .win-ok {
		width: 50%;
		height: 50px;
		line-height: 50px;
		margin: 0px;
		padding: 0px;
		border: 0px;
		float: left;
	}

	.win .alert {
		width: 100%;
	}
	.winInte {
		width: 1200px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		/* IE 9 */
		-ms-transform: translate(-50%, -50%);
		/* Firefox */
		-moz-transform: translate(-50%, -50%);
		/* Safari 和 Chrome */
		-webkit-transform: translate(-50%, -50%);
		/* Opera */
		-o-transform: translate(-50%, -50%);
		background-color: #fff;
		/*display: none;*/
	}

	.winInte .winTle {
		background-color: #e6e6e6;
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: #000;
		font-size: 16px;
	}

	.winInte .winCont {
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	.winCont>div {
		width: 50%;
		height: auto;
	}

	.goodBox,
	.eitBox {
		margin: 20px auto;
		width: 420px;
		height: 500px;
		overflow: auto;
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

	.comList {
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 10px;
	}
	.comList .store {
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
	.comList .active {
		background: #28A8E0;
		color: #fff;
	}
	.comList .conTitle {
		width: 130px;
		height: 40px;
		font-size: 16px;
		display: inline-block;
	}

	.comList .conCont {
		width: 280px;
		height: 40px;
		display: inline-block;
		overflow: hidden;
	}

	.comList .conCont input {
		padding: 0;
		outline: none;
		height: 39px;
		line-height: 39px;
		border: none;
		border: 1px solid #a3a3a3;
		box-sizing: border-box;
		padding-left: 10px;
	}

	.eitTitle {
		text-align: center;
		margin: 10px auto;
		width: 340px;
		height: 38px;
		line-height: 38px;
		color: #a0a0a0;
		border: 1px solid #e2e2e2;
	}

	.eitFooter {
		width: 400px;
		height: 40px;
		margin-right: 20px;
		overflow: hidden;
	}

	.eitFooter a {
		display: block;
		height: 40px;
		line-height: 40px;
		width: 90px;
	}

	.edui-editor-messageholder {
		display: none !important;
	}

	#edui1_iframeholder {
		height: 295px !important;
	}

	#wininte {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		overflow: hidden;
	}
	.view {
		overflow-y: scroll !important;
	}
	.imgBox {
		position: relative;
		border: 1px solid #e2e2e2;
		background-color: #f9f9f9;
		cursor: pointer;
	}
	.imgBox .updateImg {
		position: absolute;
		left: 50%;
		top: 50%;
		text-align: center;
		transform: translate(-50%, -50%);
	}
	@media screen and (min-width: 1024px) and (max-width: 1440px) {
		.win.center {
			top: 50%;
			transform: translate(0, -50%);
			width: 98%;
			height: 660px;
			z-index: 5000;
			transform: translate(-50%, -50%);
			left: 50%;
		}
		.win .win-body {
			width: 100%;
			overflow: auto;
			height: auto;
			overflow-x: hidden;
			.winCont {
				.left_box {
					border-right: 1px solid #e2e2e2;
					width: 48%;
				}
				.right_box {
					width: 50%;
					padding: 30px;
					.right_box_a {
						width: 220px;
						height: 336px;
						border: 1px solid #e2e2e2;
						background-color: #f9f9f9;
						cursor: pointer;
						display: table-cell;
						text-align: center;
						vertical-align: middle;
						position: relative;
					}
					.right_box_b {
						width: 220px;
						height: 140px;
						position: absolute;
						right: 30px;
						top: 150px;
						border: 1px solid #e2e2e2;
						background-color: #f9f9f9;
						cursor: pointer;
						div {
							margin-top: 20px;
							margin-left: 72px;
						}
					}
					.fl_right_a {
						color: #ccc;
						line-height: 50px;
						text-align: center;
						width: 220px;
						position: absolute;
						right: 30px;
						top: 300px;
					}
					.fl_right_b {
						color: #ccc;
						line-height: 50px;
						text-align: center;
						width: 220px;
					}
				}
			}
		}
	}
}
</style>