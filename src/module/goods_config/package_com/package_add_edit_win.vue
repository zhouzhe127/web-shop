<template>
	<!-- 一级弹框 -->
	<div>
		<win :height="590" :width="680" :ok="btnOk" :cancel="btnCancel" @winEvent="closeSelfWin" :align="'right'">
			<span slot="title">{{title}}</span>
			<div id="bag-win" class="meal-set" v-cloak slot="content">
				<div class="container">
					<div class="line">
						<label class="required fl" style="width: 50px;">类型</label>
						<label class="radio fl" style="width: 234px;">
							<span v-bind:class='{"sign":bag.type == 0}' v-on:click="changePackageType(0)">固定套装</span>
							<span v-bind:class='{"sign":bag.type == 1}' v-on:click="changePackageType(1)">可选套餐</span>
						</label>
						<template>
							<label class="required fl" style="width: 50px;">排序</label>
							<sub-add :minnum='1' :bindnum="bag.sort" :sign='false' @toClick="getPackageSort"></sub-add>
						</template>
					</div>
					<div style="width:100%; height:182px; padding-top: 14px;">
						<div style="float:left; width:400px;height: 150px;">
							<div class="line">
								<label class="required fl" style="width: 50px;">名称</label>
								<label>
									<input type="text" class="input" maxlength="20" v-model="bag.packageName" style="width: 335px;height:40px; " placeholder="输入名称">
								</label>
							</div>
							<div class="line" style="margin-top:15px ;">
								<label class="fl" style="width: 50px;">简码</label>
								<label>
									<input type="text" v-model="bag.BC" maxlength="20" class="input" style="width: 335px;height:40px; " placeholder="输入简码">
								</label>
							</div>
							<div class="line" style="margin-top:15px ;">
								<span class="required fl" style="width: 50px;">售价</span>
								<label class="fl" style="width: 143px;height:40px; position: relative; margin: 0; padding: 0; ">
									<input type="text" class="input" style="width: 133px;height:40px;" maxlength="10" v-model="bag.price" placeholder="输入售价">
									<span style="position: absolute; right: 10px;top:3px; z-index: 1;">元</span>
								</label>
								<span class="fl" style="width: 60px;margin: 0; padding: 0; text-align: center;">成本价</span>
								<label class="fl" style="width: 132px;height:40px; position: relative; ">
									<input type="text" class="input" style="width:122px; height:40px;" maxlength="10" v-model="bag.cost" placeholder="输入售价">
									<span style="position: absolute; right: 10px; top:3px; z-index: 1;">元</span>
								</label>
							</div>
						</div>
						<div style="float:left; width:225px;height: 150px;">
							<div style="position:relative; width:225px; height:150px;background:url(src/res/images/upload.png) center 40px no-repeat #ddd ;">
								<img v-if="!!bag.imageName" :src="imgHost+ bag.imageName" width="225" height="150">
								<img v-else src="../../../res/food/test.jpg" width="225" height="150">
								<a class="edit-photo">编辑图片</a>
								<form method="post" id="imageUpForm" enctype="multipart/form-data">
									<input type="file" @change="fileNameChange" accept="image/jpeg,image/png,image/gif,image/tiff" id="fileInput" name="image"
									    style="position:absolute;bottom: 0;height: 40px;width: 225px;opacity: 0;cursor: pointer;" />
								</form>
							</div>
						</div>
					</div>
					<div style="width: 100%; height: auto; clear: both; ">
						<div style="width: 68px;height: auto; float: left;">
							<span style="line-height: 40px;position: relative;">套餐内容
								<i style="color: red;position: absolute;top: -20px;right: -10px;">*</i>
							</span>
						</div>
						<div class="seleted-center">
							<template v-for="(item,i) in packageTag">
								<div :class="{'tab':true, 'tab-selected':i==selectTagIndex}" v-on:click="changeTag(i,item)" :key="i">{{item.tagName}}</div>
							</template>
							<a href="javascript:void(0);" v-on:click="openAddTagWin" class="addclassify" style="width:132px;">添加标识</a>
						</div>
						<div class="seleted-right">
							<!--显示标签中的商品-->
							<div v-if="packageTag && packageTag.length > 0" class="seleted-container" :style="{'height':packageTag.length * 46.5+'px'}">
								<div style="height: 5px;font-size: 0;line-height: 5px;"></div>
								<span v-for="(item,index) in packageTag[selectTagIndex].packageTagGoods" :key="index">{{item.goodsName}}&nbsp;{{item.packageGoodsNum}}&nbsp;{{item.unit}};</span>
							</div>
							<a href="javascript:void(0);" v-on:click="openEditTagWin" class="addclassify" style="width:100%;background-position-x: 125px;">编辑该标识可选内容</a>
						</div>
						<div style="clear: both; font-size: 0px;width:100%;"></div>
					</div>
					<div class="line" style="margin-top: 14px;">
						<label class="fl" style="width: auto;vertical-align:middle;margin-right:15px;">参与优惠
							<on-off :status="bag.isDiscount==1" @statusChange="getIsDiscountToggle" style="display:inline-block;vertical-align:middle;margin-left:7px;"></on-off>
						</label>

						<label class="fl" style="width: auto;vertical-align:middle;margin-right:15px;">服务费
							<on-off :status="bag.serviceCharge==1" @statusChange="getServiceChargeToggle" style="display:inline-block;vertical-align:middle;margin-left:7px;"></on-off>
						</label>

						<label class="fl" style="width: auto;vertical-align:middle;margin-right:15px;">估清
							<on-off :status="bag.status==1" @statusChange="getStatusToggle" style="display:inline-block;vertical-align:middle;margin-left:7px;"></on-off>

						</label>

						<label class="fl" style="width: auto;vertical-align:middle;">推荐菜
							<on-off :status="bag.isRecommend==1" @statusChange="getIsRecommendToggle" style="display:inline-block;vertical-align:middle;margin-left:7px;"></on-off>
						</label>
					</div>
					<div class="line" style="margin-top: 14px;">
						<label class="fl" style="width: auto;">会员专享
							<on-off :status="bag.isVip !=0" @statusChange="getIsVip" style="display:inline-block;vertical-align:middle;margin-left:7px;"></on-off>
						</label>

						<label v-if="bag.isVip != 0" class="radio fl" style="width: auto; margin-left: 10px;">
							<div style="background-color:#fff;height:40px;">
								<radio-btn :list='vipPriceArr' :index="bag.isVip==1 ? 0 : 1" @selOn='getVipRadio'></radio-btn>
							</div>
						</label>
						<template v-if="bag.isVip==1">
							<label class="fl" style="width: 80px; text-align: right;  margin-right: 12px; ">会员价格</label>
							<input class="input fl" maxlength="10" v-model="bag.vipPrice" type="text" placeholder="输入会员价" style="width: 158px; height: 40px; line-height: 40px; overflow: hidden;">
						</template>
						<!-- template v-if="isVip == 2">
                    <label class="fl" style="width: 80px; text-align: right;  margin-right: 12px; ">会员折扣</label>
                    <input class="input fl" maxlength="3" v-model="bg.vipDiscount" type="text" placeholder="输入会员折扣" style="width: 138px; height: 40px; line-height: 40px; overflow: hidden;">
                    <label class="fl" style="width: 30px; text-align: center;  margin-right: 12px; ">%</label>
                </template -->
					</div>
					<div style="width: 100%; height: 100px; margin-top: 14px; clear: both; ">
						<div style="width: 50px;height: 90px; float: left;">
							<span style="line-height: 40px;">描述</span>
						</div>
						<textarea v-model="bag.description" maxlength="100" class="describe" style="width:555px; height:98px; font-size:14px;" placeholder="输入描述"></textarea>

					</div>
					<div style="clear: both; height:20px;font-size: 0px;width:100%;"></div>
				</div>
			</div>

		</win>
		<transition name="fade">
			<component :is="showCom" :pObj="comObj" @throwTagWin="closeTagWin"></component>
		</transition>

	</div>
</template>
<script>
	//1)套餐选菜:只显示上架的普通商品,多规格子菜,多规格主菜不显示
	//2)下架的套餐不能估清
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';
	import global from 'src/manager/global';
	// import uploadfile from 'src/verdor/uploadfile';
	// let require = require;
	export default {
		data() {
			return {
				shopId: '', //店铺id
				packageId: null, //当前编辑的套餐id
				imgHost: '', //图片的前缀地址
				showCom: '', //组件的显示
				comObj: {}, //传递数据
				title: '', //弹框标题
				packageTag: [], //该套餐中的所有标识名

				packageList: [], //套餐列表
				goodsList: [], //商品列表    

				bag: {
					id: '',
					packageName: '',
					BC: '',
					type: 0, //1:可选套餐 0:固定套餐
					cost: '',
					price: '',
					isDiscount: '',
					isVip: '0',
					vipPrice: '',
					vipDiscount: '100',
					imageName: '',
					isRecommend: '',
					serviceCharge: '',
					sort: '1',
					description: '',
					status: '0' // 0:上架 1:估清  2:下架
				},
				btnOk: {
					content: '',
					style: ''
				},
				btnCancel: {
					content: '',
					style: ''
				},

				selectTagIndex: 0, //选中的tag标识索引

				vipPriceArr: ['会员价格', '会员折扣'], //会员专享的操作
			};
		},
		props: {
			pObj: null,
			/*
			  {
			      packageId:  //套餐的id
			      status:     //套餐的状态值
			      goodsList:  //商品
			      title:      //标题
			  }
			*/
		},
		methods: {
			//---------------弹框-----------
			//关闭添加,编辑标识窗口
			closeTagWin(flag, obj) {
				let goods = [];
				if (flag == 'add' || flag == 'edit') {
					obj.goods.forEach((ele) => {
						let temp = {
							gid: ele.id,
							packageGoodsNum: ele.packageGoodsNum,
							unit: ele.unit,
							goodsName: ele.goodsName
						};
						goods.push(temp);
					});

				}
				if (flag == 'add') {
					let temp = {
						tagName: obj.tagName,
						totalNum: obj.total,
						packageTagGoods: goods
					};
					this.packageTag.push(temp);
				} else if (flag == 'delete') {
					this.packageTag.splice(this.selectTagIndex, 1);
					this.changeTag(0);
				} else if (flag == 'edit') {
					this.packageTag = this.packageTag.map((ele, index) => {
						if (index == this.selectTagIndex) {
							ele.totalNum = obj.total;
							ele.tagName = obj.tagName;
							ele.packageTagGoods = goods;
						}
						return ele;
					});
				}
				this.showCom = '';
			},
			//添加标识
			openAddTagWin() {
				let goods = [];
				// 只显示上架的普通商品,多规格子菜;多规格主菜不显示
				this.goodsList.forEach((ele) => {
					if ((ele.status == 0 || ele.status == 1) && ele.type == 0) {
						if ((!Number(ele.groupId) && !Number(ele.isGroup)) || (Number(ele.groupId) > 0)) {
							goods.push(ele);
						}
					}
				});
				this.comObj = {
					goodsList: goods,
					tagName: '',
					totalNum: 0,
					title: '添加标识',
					packageType: this.bag.type,
					selGoods: [],
					packageTag: this.packageTag,
				};
				this.showCom = 'addTag';
			},
			//编辑该标识
			openEditTagWin() {
				//当不存在标识的时候
				if (this.packageTag.length == 0) {
					this.openAddTagWin();
					return;
				}


				let tagName = this.packageTag[this.selectTagIndex].tagName;

				let totalNum = 0;
				if (this.bag.type == 0) {
					this.packageTag[this.selectTagIndex].packageTagGoods.forEach((ele) => {
						totalNum += parseInt(ele.packageGoodsNum);
					});
				} else {
					totalNum = this.packageTag[this.selectTagIndex].totalNum;
				}
				let goods = [];
				// 只显示上架的普通商品,多规格子菜;多规格主菜不显示
				this.goodsList.forEach((ele) => {
					if ((ele.status == 0 || ele.status == 1) && ele.type == 0) {
						if ((!Number(ele.groupId) && !Number(ele.isGroup)) || (Number(ele.groupId) > 0)) {
							goods.push(ele);
						}
					}
				});
				this.comObj = {
					goodsList: goods,
					tagName: tagName,
					totalNum: totalNum,
					title: '编辑该标识可选内容',
					packageType: this.bag.type,
					selGoods: this.packageTag[this.selectTagIndex].packageTagGoods,
					packageTag: this.packageTag,

				};
				this.showCom = 'addTag';
			},
			//获取本组件窗口的点击结果
			closeSelfWin(res) {
				if (res == 'ok') {
					if (!this.checkForm()) return;
					let obj = this.formatData();
					let packageTag = obj.packageTag;
					let newPackageTag = obj.newPackageTag;
					if (this.packageId) {
						this.editPackage(packageTag, newPackageTag).then(() => {//result
							this.$emit('throwAddEditWin', 'update');
						});
					} else {
						this.addPackage(newPackageTag).then(() => {//result
							this.$emit('throwAddEditWin', 'update');
						});
					}
				} else if (res == 'cancel' && this.packageId) {
					let status = null;
					let content = '';
					this.bag.status == 2 ? status = 0 : status = 2;
					content = status == 2 ? '确定下架该商品?' : '确定上架该商品?';
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'confirm',
						content: content,
						callback: (res) => {
							if (res == 'ok') {
								this.upOrDownShelf(status).then(() => {//res
									this.$emit('throwAddEditWin', 'update');
								});
							}
						}
					});
				} else {
					this.$emit('throwAddEditWin', 'close');
				}
			},

			//------------事件-------------
			//切换标识
			changeTag(index) {
				this.selectTagIndex = index;
			},

			//------------工具---
			//格式化数据
			formatData() {

				let obj = {
					packageTag: [],
					newPackageTag: []
				};
				this.packageTag.forEach((ele) => {
					if (ele.id) {
						let packageTagGoods = [];
						ele.packageTagGoods.forEach((good) => {
							let goodObj = {
								shopId: this.shopId,
								packageId: this.packageId,
								gid: good.gid,
								packageGoodsNum: good.packageGoodsNum,
								unit: good.unit,
							};
							packageTagGoods.push(goodObj);
						});
						let temp = {
							id: ele.id,
							shopId: this.shopId,
							packageId: this.packageId,
							tagName: ele.tagName,
							totalNum: ele.totalNum,
							packageGoods: packageTagGoods
						};
						obj.packageTag.push(temp);
					} else {
						let packageGoods = [];
						ele.packageTagGoods.forEach((e) => {
							let obj2 = {
								gid: e.gid,
								packageGoodsNum: e.packageGoodsNum
							};
							packageGoods.push(obj2);
						});
						let temp = {
							tagName: ele.tagName,
							totalNum: ele.totalNum,
							packageGoods: packageGoods
						};
						obj.newPackageTag.push(temp);
					}
				});
				return obj;
			},
			//校验表单
			checkForm() {
				if (!global.checkData({
					packageName: {
						cond: `$$.length>0 && ((/^[^'’“"&]*$/).test($$))`,
						pro: '套餐名不能含有特殊符号,且不能为空!'
					},
					BC: {
						reg: /^[0-9A-Za-z]{0,20}$/g,
						pro: '简码由由1-20位数字,英文组成!'
					},
					price: {
						reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
						pro: '请输入正确的售价格式且价格不能大于10万!'
					},
					description: {
						cond: '$$.length<=100',
						pro: '描述内容不能超过50字哦!'
					},
					cost: {
						reg: /(((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$)|(^((\s)*(\t)*)?$)/,
						pro: '请输入正确的成本格式!'
					}
				},
				this.bag
				)) return;

				if (Number(this.bag.price > 100000)) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '售价不能大于10万!'
					});
					return;
				}
				if (Number(this.bag.cost > 100000)) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '成本不能大于10万!'
					});
					return;
				}

				if (this.bag.isVip == 1) {
					if (!global.checkData({
						vipPrice: {
							reg: /((^[1-9]\d{0,9})|^0)(\.\d{1,2})?$/,
							pro: '请输入正确的会员价格!'
						}
					},
					this.bag
					)) return;
					if (Number(this.bag.vipPrice > 100000)) {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '会员价格不能大于10万!'
						});
						return;
					}
					if (Number(this.bag.price) < Number(this.bag.vipPrice)) {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '会员价格大于售价!'
						});
						return;
					}
				}

				if (!this.packageTag) this.packageTag = [];
				if (this.packageTag.length == 0) {
					this.$store.commit('setWin', {
						title: '提示信息',
						content: '请添加标识!'
					});
					return false;
				}
				return true;
			},
			//图片的上传
			async fileNameChange() {//imgJson
				let res = await http.uploadImg({
					data: {
						type: 8,
						shopId: storage.session('shopId')
					},
					formId: 'imageUpForm',
				});
				this.bag.imageName = res;
			},
			//--------------开关--------------
			getVipRadio(res) {
				this.bag.isVip = res + 1;
			},
			getPackageSort(res) {
				this.bag.sort = res;
			},
			//获取点击的是会员折扣还是会员价格
			changePackageType(flag) {
				this.bag.type = flag;
			},
			getIsDiscountToggle(res) {
				this.bag.isDiscount = res ? 1 : 0;
			},
			getIsRecommendToggle(res) {
				this.bag.isRecommend = res ? 1 : 0;
			},
			getServiceChargeToggle(res) {
				this.bag.serviceCharge = res ? 1 : 0;
			},
			getStatusToggle(res) {
				if (this.bag.status == 2) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						content: '下架的套餐不能进行估清操作!'
					});
					return;
				}
				this.bag.status = res ? 1 : 0;

			},
			getIsVip(res) {
				this.bag.isVip = res ? 1 : 0;
			},
			//初始化按钮
			initBtn() {
				if (this.packageId) {
					if (this.status == 2) {
						//下架
						this.btnCancel = {
							content: '上架',
							style: 'background-color:#29abe2;'
						};
					} else {
						this.btnCancel = {
							content: '下架',
							style: 'background-color:#29abe2;'
						};
					}
					this.btnOk = {
						content: '保存',
						style: 'background-color:#f8941f;',
					};
				} else {
					//添加
					this.btnOk.content = '添加';
					this.btnOk.style = 'background-color:#f8941f';
					this.btnCancel.content = '取消';
				}
			},
			//初始化数据
			initData() {
				let userData = storage.session('userShop');
				this.shopId = userData.currentShop.id;
				this.imgHost = userData.uploadUrl;
				for (let attr in this.pObj) {
					this[attr] = this.pObj[attr];
				}
			},

			async addPackage(packageTag) {
				let res = await http.addPackage({
					data: {
						shopId: this.shopId,
						packageName: this.bag.packageName,
						BC: this.bag.BC,
						type: this.bag.type, //1:可选套餐 0:固定套餐
						cost: this.bag.cost,
						price: this.bag.price,
						isDiscount: this.bag.isDiscount,
						isVip: this.bag.isVip,
						vipPrice: this.bag.vipPrice,
						vipDiscount: this.bag.vipDiscount,
						isRecommend: this.bag.isRecommend,
						serviceCharge: this.bag.serviceCharge,
						sort: this.bag.sort,
						description: this.bag.description,
						status: this.bag.status, // 0:正常 1:估清  2:下架
						packageTag: packageTag,
						imageName: this.bag.imageName ? this.bag.imageName : '',
					},
				});
				return res;
			},
			async editPackage(packageTag, newPackage) {
				let res = await http.editPackage({
					data: {
						packageId: this.packageId,
						shopId: this.shopId,
						packageName: this.bag.packageName,
						BC: this.bag.BC,
						type: this.bag.type, //1:可选套餐 0:固定套餐
						cost: this.bag.cost,
						price: this.bag.price,
						isDiscount: this.bag.isDiscount,
						isVip: this.bag.isVip,
						vipPrice: this.bag.vipPrice,
						vipDiscount: this.bag.vipDiscount,
						isRecommend: this.bag.isRecommend,
						serviceCharge: this.bag.serviceCharge,
						sort: this.bag.sort,
						description: this.bag.description,
						status: this.bag.status, // 0:正常 1:估清  2:下架
						packageTag: packageTag,
						newPackageTag: newPackage,
						imageName: this.bag.imageName ? this.bag.imageName : '',
					},
				});
				return res;
			},
			async upOrDownShelf(status) {
				let res = await http.upOrDownShelf({
					data: {
						shopId: this.shopId,
						packageId: this.packageId,
						status: status
					}
				});
				return res;
			},
			async getPackageById() {
				let res = await http.getPackageById({
					data: {
						packageId: this.packageId,
						shopId: this.shopId
					}
				});
				return res;
			},
		},
		mounted() {
			this.initData();
			this.initBtn();
			if (this.packageId) {
				this.getPackageById().then((res) => {
					this.bag = res.package;
					if (!this.bag) this.bag = [];

					this.packageTag = res.packageTag;
					if (!this.packageTag) this.packageTag = [];

					let packageTagGoods = res.packageGoods;
					if (!packageTagGoods) packageTagGoods = [];

					packageTagGoods.forEach((ele) => {//,index,arr
						for (let i = 0, len = this.goodsList.length; i < len; i++) {
							let temp = this.goodsList[i];
							if (ele.gid == temp.id) {
								ele.unit = temp.unit;
							}
						}
					});

					this.packageTag = this.packageTag.map((ele) => {
						ele.packageTagGoods = [];
						packageTagGoods.forEach((e) => {
							if (e.packageTagId == ele.id) {
								ele.packageTagGoods.push(e);
							}
						});
						return ele;
					});
					this.changeTag(0);
				});
			}
		},
		components: {
			win: () =>
				import ( /*webpackChunkName:'win'*/ 'src/components/win'),
			subAdd: () =>
				import ( /*webpackChunkName:'subadd'*/ 'src/components/subadd'),
			onOff: () =>
				import ( /*webpackChunkName:'on_off'*/ 'src/components/on_off'),
			radioBtn: () =>
				import ( /*webpackChunkName:'radio_btn'*/ 'src/components/radio_btn'),
			addTag: () =>
				import ( /*webpackChunkName:'package_add_tag_win'*/ './package_add_tag_win'),

		},
	};
</script>
<style lang="less" scoped>
	/* 一级弹框样式 */

	#bag-win {
		background-color: #f1f1f1;
		width: 700px;
		height: auto;
		min-height: 690px;
		.edit-photo {
			background: url(../../../res/images/a50.png) repeat;
			height: 40px;
			line-height: 40px;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 225px;
			color: #fff;
			text-align: center;
			font-size: 16px;
		}
		.container {
			padding-left: 27px;
			padding-top: 18px;
			width: 680px;
			height: auto;
			font-size: 14px;
			text-align: left;
			padding-bottom: 20px;
			.radio {
				line-height: 40px;
				font-size: 0;
				overflow: hidden;
				span {
					width: 100px;
					height: 40px;
					background-color: #fff;
					cursor: pointer;
					float: left;
					font-size: 14px;
					margin-right: 1px;
					margin-bottom: 2px;
					text-align: center;
				}
			}
			.input {
				border: none;
				outline: none;
				padding-left: 10px;
				box-sizing: content-box;
			}
			.tab {
				height: 40px;
				width: 146px;
				margin-bottom: 7px;
				text-align: center;
				line-height: 40px;
				background-color: #e7e7e7;
				border-right: 14px solid #f1f1f1;
				cursor: pointer;
			}
			.seleted-right {
				width: 412px;
				float: left;
				height: auto;
				float: left;
				background-color: #e7e7e7;
			}
			.seleted-center {
				width: 146px;
				float: left;
				height: auto;
				float: left;
				.tab-selected {
					background-color: #d2d2d2;
				}
			}
			.seleted-container {
				height: auto;
				span {
					float: left;
					width: auto;
					margin-left: 5px;
					text-align: center;
					height: 30px;
					line-height: 30px;
					overflow: hidden;
				}
			}

		}
		.line {
			width: 100%;
			height: 40px;
			line-height: 40px;
		}

	}


	// .meal-set .container .radio span {
	//   width: 100px;
	//   height: 40px;
	//   background-color: #fff;
	//   cursor: pointer;
	//   float: left;
	//   font-size: 14px;
	//   margin-right: 1px;
	//   margin-bottom: 2px;
	//   text-align: center;
	// }
	// .meal-set .container .seleted-right {
	//   width: 412px;
	//   float: left;
	//   height: auto;
	//   float: left;
	//   background-color: #e7e7e7;
	// }
	// .meal-set .container .seleted-center {
	//   width: 146px;
	//   float: left;
	//   height: auto;
	//   float: left;
	// }
	// .meal-set .container .seleted-center .tab-selected{
	//     background-color:#d2d2d2;
	// }
	// .meal-set .container .seleted-container {
	//   height: auto;
	// }
	// .meal-set .container .seleted-container span {
	//   float: left;
	//   width: auto;
	//   margin-left: 5px;
	//   text-align: center;
	//   height: 30px;
	//   line-height: 30px;
	//   overflow: hidden;
	// }
</style>