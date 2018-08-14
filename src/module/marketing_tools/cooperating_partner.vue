<template>
	<div class="alert-win">
		<div id="cooperating-partner" class="dx-cp" v-cloak>
			<div class="addc fl" @click="open()" v-if="cpPower">
				<div class="img" style="margin-top: 35px;">
					<img src="../../res/images/comadd.png" style="width: 47px;height: 47px;" />
				</div>
				<div style="color: #4F4F50;margin-top: 30px;">新增合作品牌</div>
			</div>
			<template v-for="(i,index) in list">

				<div class="cps fl" :key="index" @click="open(i.id,index)">
					<div class="num">
						{{index+1}}
					</div>
					<div class="name">
						{{i.nickName}}
					</div>
					<div class="fl" style="padding-left: 16px;color: #666362;height: 40px;line-height: 40px;font-size: 16px;">
						{{i.imageNum}}张图
					</div>
				</div>

			</template>
		</div>
		<transition name="fade">
			<win v-if="packageWin" :width="widthWin" :height="hauto" :ok="ok" :cancel="cancel" @winEvent="closeWin">
				<span slot="title">{{title}}</span>
				<div slot="content" id="alert-win">
					<div class="left">
						<div class="options">
							<div class="fl required" style="margin: 0 40px;">品牌名称</div>
							<input type="text" class="input fl" style="border: 1px solid #7A7B7C;width: 220px;" maxlength="20" v-model="coopName" />
						</div>
						<div class="options isGray">
							<div class="fl required" style="margin: 0 40px 0 68px;">排序</div>
							<!-- <sd-subadd :num.sync="sort" :maxnum="255" :minnum="1"></sd-subadd> -->
							<sub-add @toClick="sort=arguments[0]" :bindnum="sort" :maxnum="255" :minnum="1"></sub-add>
						</div>
						<div class="options" style="height: 170px;">
							<div class="fl required" style="margin: 0 40px;">品牌介绍</div>
							<textarea class="describe cpdes" maxlength="100" v-model="description" placeholder="请添加品牌描述,100字"></textarea>
						</div>
						<div class="options ">
							<div class="fl required" style="margin: 0 40px 0 12px;">添加缩略图片</div>
							<div class="showImg updateImg" style="position: relative;background-color: #F5F6F7;" v-if="!bigImgUrl">
								<img src="../../res/images/comadd.png" style="cursor: pointer;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 47px;height: 47px;"
								    v-if="bigImgUrl ==''" />
								<form enctype="multipart/form-data" id="bigImg">
									<input @change="fileNameChange" type="file" id="bigImg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
									/>
								</form>
								<img alt="缩略图" :src="uploadUrl  + bigImgUrl" v-if="bigImgUrl != ''" style="width: 100%;height: 100%;" />
							</div>


							<div class="showImg" style="position: relative;background-color: #F5F6F7;" v-else>
								<img src="../../res/images/comadd.png" style="cursor: pointer;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);width: 47px;height: 47px;"
								    v-if="bigImgUrl ==''" />
								<img alt="缩略图" :src="uploadUrl  + bigImgUrl" v-if="bigImgUrl != ''" style="width: 100%;height: 100%;" />
								<div class="hoverImg">
									<a href="javascript:void(0);" style="width: 100px;height: 40px;line-height: 40px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);"
									    class="yellow updateImg">编辑
										<form enctype="multipart/form-data" id="bigImg">
											<input @change="fileNameChange" type="file" id="bigImg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
											/>
										</form>
									</a>
								</div>
							</div>
						</div>
						<div class="options">
							<div class="fl" style="margin: 0 40px 0 230px;color: #616161;">规格750*400</div>
						</div>
					</div>
					<div class="right">
						<div class="required fl" style="width: 100%;height: 30px;line-height: 30px;padding-left: 40px;margin-top: 20px;">添加详情图片</div>
						<div class=" fl" style="color: #616161;height: 20px;line-height: 20px;width: 100%;padding-left: 40px;margin-bottom: 5px;">规格750*1106(最多10张)</div>
						<div class="show-imgs">

							<template v-for="(i,index) in imgList">
								<div class="cps-img" :key="index">
									<div class="c-imgs">
										<div class="mesking">
											<div class="" style="width: 64%;height: 30px;line-height: 30px;margin-top: 45px;margin-left: 18%;background-color: red;position: relative;">
												<a href="javascript:void(0);" class="yellow updateImg" @click="changeIndex(index)" style="width: 100%;height: 100%;line-height: 30px;">编辑
													<form enctype="multipart/form-data" :id="'bannerImgs' + index">
														<input @change="changeImgList(index)" type="file" :id="'bannerImgs_upload' + index" accept="image/jpeg,image/png,image/gif,image/tiff"
														    name="image" />
													</form>
												</a>
											</div>

											<a href="javascript:void(0);" @click="delImageInList(index,i)" class="gray" style="width: 64%;height: 30px;line-height: 30px;margin-top: 10px;margin-left: 18%;">删除</a>
										</div>
										<img :src="uploadUrl  + i.imageName" />
									</div>
									<div class="operates">
										<!-- <sd-subadd :num.sync="i.sort" :maxnum="255" :minnum="1"></sd-subadd> -->
										<sub-add @toClick="i.sort = arguments[0]" :bindnum="i.sort" :maxnum="255" :minnum="1"></sub-add>
									</div>
								</div>
							</template>
							<!--<div class="no-cimgs">
									<img src="res/images/comadd.png" style="cursor: pointer;"/>
								<div >
									当前没有展示图片,请添加 !
								</div>
							</div>-->

							<div class="one-cimgs updateImg" v-if="imgList.length < 10">
								<img src="../../res/images/comadd.png" style="cursor: pointer;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);"
								/>
								<form enctype="multipart/form-data" id="bannerImg">
									<input @change="fileBannerChange" type="file" id="bannerImg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
									/>
								</form>
							</div>

						</div>

					</div>

				</div>
			</win>
		</transition>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import utils from 'src/verdor/utils';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				cpPower: '',
				shopId: '',
				brandId: '',
				list: [], //合作品牌列表

				info: null,
				sort: '',
				coopName: '',
				description: '',
				bigImgUrl: '',
				uploadUrl: '', // url地址
				imgList: [], //图片列表
				deleteImgList: [], //先保存打开弹窗的图片列表，做删除
				index: null, //当前需要编辑的点击的图片
				showDelete: false,
				deleteImage: [], //删除的图片
				updateImage: [], //修改的图片
				addImage: [], //修改新添加的图片
				packageWin: false,
				title: '',
				detailIndex: '',
				widthWin: '1200',
				hauto: 'auto'
			};
		},
		computed: {
			ok() {
				if (this.info) {
					return {
						content: '保存'
					};
				} else {
					return {
						content: '添加',
						style: {
							background: '#f8941f'
						}
					};
				}
			},
			cancel() {
				if (this.info) {
					return {
						content: '删除',
						style: {
							background: '#c33'
						}
					};

				} else {
					return {
						content: '取消',
						style: {
							background: '#a0a0a0'
						}
					};
				}
			}
		},
		methods: {
			closeWin(type) {
				if (type == 'ok') {
					if (!this.cpPower) {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '加盟店或直营店没有合作品牌的更改权限',
							winType: 'alert'
						});
						this.packageWin = false;
						return true;
					} else {
						if (!global.checkData(
							{
								coopName: {
									cond: `$$.trim() != '' || $$.match(/^\\s+$/g)`,
									pro: '品牌的名字不能为空'
								},
								description: {
									cond: `$$.trim() != '' || $$.match(/^\\s+$/g)`,
									pro: '品牌介绍不能为空'
								},
								bigImgUrl: {
									cond: '$$.length > 0',
									pro: '品牌缩略图片不能为空'
								},
								imgList: {
									cond: '$$.length > 0',
									pro: '品牌详情图片至少要有一个'
								},
							}, this)) {
							return false;
						}
						if (this.addImage.length > 0 || this.imgList.length > 0) {
							let img = [...this.addImage, ...this.imgList];
							for (let i = 0; i < img.length; i++) {
								if (img[i].sort > 255) {
									this.$store.commit('setWin', {
										content: '排序数值不能大于255',
										winType: 'alert',
										timerPowerOff: 1000
									});
									return false;
								}
							}
						}
						this.packageWin = false;
						if (this.info) {
							this.editPartner();
						} else {
							this.addPartner();
						}
						this.packageWin = false;
					}
				} else {
					if (!this.cpPower && type == 'cancel') {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '加盟店或直营店没有合作品牌的删除权限',
							winType: 'alert'
						});
						this.packageWin = false;
						return true;
					} else {
						if (type == 'cancel' && this.info) {
							this.packageWin = false;
							this.delPartner();
						} else {
							this.packageWin = false;
						}
					}
				}
			},
			open(id, index) {
				this.getDetail(id, index);
			},
			async changeImgList(i) {
				let f = 'bannerImgs' + i;
				// let inp = 'bannerImgs_upload' + (this.imgList.length - 1);

				let res = await http.bannerImgUpload({
					data: {
						type: 8,
						shopId: storage.session('shopId')
					},
					formId: f,
				});

				let obj = this.imgList[this.index];
				obj.imageName = res;
				this.imgList.splice(this.index, obj);

			},
			async getList() {
				let res = await http.getPartnerList({
					data: {
						shopId: this.shopId
					}
				});
				this.list = utils.sortByAll(res);
			},
			async getDetail(id, index) {
				if (id) {
					let res = await http.getPartnerById({
						data: {
							id: id,
							shopId: this.shopId
						}
					});
					this.packageWin = true;
					this.info = res;
					this.sort = res.sort;
					this.coopName = res.nickName;
					this.description = res.description;
					this.bigImgUrl = res.minImage;
					this.imgList = res.image; //图片列表
					this.deleteImgList = res.image; //先保存打开弹窗的图片列表，做删除
					this.index = null; //当前需要编辑的点击的图片
					this.showDelete = true;
					this.deleteImage = []; //删除的图片
					this.updateImage = []; //修改的图片
					this.addImage = []; //修改新添加的图片
					this.title = '合作品牌详情';
					this.detailIndex = index;
				} else {
					// openPackageWin();
					this.packageWin = true;
					this.info = null;
					this.sort = 1;
					this.coopName = '';
					this.description = '';
					this.bigImgUrl = '';
					this.imgList = []; //图片列表
					this.deleteImgList = []; //先保存打开弹窗的图片列表，做删除
					this.index = null; //当前需要编辑的点击的图片
					this.showDelete = false;
					this.deleteImage = []; //删除的图片
					this.updateImage = []; //修改的图片
					this.addImage = [];//修改新添加的图片
					this.title = '新建合作品牌';
					this.detailIndex = '';
				}

			},
			async fileBannerChange() {
				let res = await http.bannerImgUpload({
					data: {
						type: 8,
						shopId: storage.session('shopId')
					},
					formId: 'bannerImg'
				});
				if (res) {
					let obj = {};

					obj.sort = this.getSort();
					obj.imageName = res;
					if (this.info) {
						obj.pid = this.info.id;
						this.addImage.push(obj);
					}
					if (this.imgList.length < 10) {
						this.imgList.push(obj);
					} else {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '最多上传十张图片',
							title: '提示信息'
						});
					}
				}
			},
			async fileNameChange() {
				let res = await http.bigImgUpload({
					data: {
						type: 8,
						shopId: storage.session('shopId')
					},
					formId: 'bigImg'
				});
				this.bigImgUrl = res;
			},
			getSort() {
				let arr = utils.deepCopy(utils.sortByAll(this.imgList));
				if (arr.length == 0) {
					return 1;
				} else {
					let s = (arr[arr.length - 1].sort - 0) + 1;
					return s;
				}

			},
			async pushImgList(imgJson) {

				if (imgJson) {
					let obj = {};

					obj.sort = this.getSort();
					obj.imageName = imgJson.data;
					if (this.info) {
						obj.pid = this.info.id;
						this.addImage.push(obj);
					}
					if (this.imgList.length < 10) {
						this.imgList.push(obj);
					} else {
						this.$store.commit('setWin', {
							title: '提示信息',
							content: '最多上传十张图片',
							winType: 'alert'
						});
					}

					let f = 'bannerImgs' + (this.imgList.length - 1);
					let inp = 'bannerImgs_upload' + (this.imgList.length - 1);

					Promise.resolve().then(async () => {
						await http.bigImgUpload({
							data: {
								type: 8,
								shopId: this.shopId
							},
							formId: f,
							url: global.host['shop'] + inp,
						});
						let obj = this.imgList[this.index];
						obj.imageName = imgJson;
						this.imgList.splice(this.index, obj);
					});

				}
			},
			delImageInList(index, i) {
				this.imgList.splice(index, 1);
				if (i.id) {
					this.deleteImage.push(i);
				}
			},
			async changeIndex(index) {
				this.index = index;
			},
			async editPartner() {
				let deleteImage = this.getIndexInArr(this.deleteImage);
				let imgList = {};
				let sendInfo = {
					id: this.info.id,
					nickName: this.coopName,
					sort: this.sort,
					description: this.description,
					minImage: this.bigImgUrl,
					shopId: this.shopId
				};
				if (this.imgList.length > 0) {
					imgList.updateImage = this.imgList;
				}
				if (this.addImage.length > 0) {
					imgList.addImage = this.addImage;
				}
				if (this.addImage.length > 0 || this.imgList.length > 0) {
					sendInfo.image = JSON.stringify(imgList);
				}
				if (deleteImage.length > 0) {
					sendInfo.deleteImage = deleteImage;
				}
				let res = await http.editPartner({
					data: sendInfo
				});
				res.imageNum = res.image.length;
				this.list.splice(this.detailIndex, 1, res);
				this.list = utils.sortByAll(this.list);
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '修改成功',
					winType: 'alert',
					timerPowerOff: 1000
				});
			},
			getIndexInArr(arr) {
				let str = '';
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].id) {
						str += arr[i].id;
						if (i < (arr.length - 1)) {
							str += ',';
						}
					} else {
						if (str[str.length - 1] == ',') {
							str = str.substring(0, str.length - 1);
						}

					}

				}
				return str;
			},
			async delPartner() {
				await http.delPartner({
					data: {
						id: this.info.id,
						shopId: this.shopId
					}
				});
				this.list.splice(this.detailIndex, 1);
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '删除成功',
					winType: 'alert'
				});

			},
			async addPartner() {
				let res = await http.addPartner({
					data: {
						nickName: this.coopName,
						sort: this.sort,
						description: this.description,
						minImage: this.bigImgUrl,
						image: JSON.stringify(this.imgList),
						shopId: this.shopId
					}
				});
				this.$store.commit('setWin', {
					title: '提示信息',
					content: '添加成功',
					winType: 'alert',
				});
				this.list.push(res);
				res.imageNum = res.image.length;
				this.list = utils.sortByAll(this.list);
			},
		},
		mounted() {
			if (window.innerWidth < 1440) {
				this.widthWin = '1000';
				this.hauto = '560';
			}
			global.uploadFn = this.fileBannerChange;
			let userData = storage.session('userShop');
			if (userData && userData.accessToken && userData.currentShop) {
				this.shopId = userData.currentShop.id;
				this.brandId = userData.currentShop.brandId;
				this.uploadUrl = userData.uploadUrl;
			} else {
				this.$router.push('/login');
			}
			if (userData.currentShop && userData.currentShop.ischain == 3) {
				this.cpPower = true;
			}
			if (userData.currentShop && userData.currentShop.ischain == 0) {
				this.cpPower = true;
			}
			this.getList();
		},
		components: {
			'win': () =>
				import ( /*webpackChunkName: 'win'*/ 'src/components/win'),
			'sub-add': () =>
				import ( /*webpackChunkName: 'subadd'*/ 'src/components/subadd')
		}
	};
</script>

<style scoped>
	.dx-cp {
		width: 100%;
	}

	.dx-cp .addc {
		width: 300px;
		height: 150px;
		border: 2px solid #DEDFE0;
		margin-top: 20px;
		margin-right: 60px;
		cursor: pointer;
	}

	.dx-cp .addc div {
		width: 100%;
		height: 20px;
		text-align: center;
		font-size: 18px;
		float: left;
	}

	.dx-cp .cps {
		width: 300px;
		height: 150px;
		background-color: #E8EAEB;
		margin-right: 60px;
		position: relative;
		margin-top: 20px;
		cursor: pointer;
	}

	.dx-cp .cps .num {
		position: absolute;
		top: 0;
		right: 0;
		width: 88px;
		height: 60px;
		line-height: 60px;
		font-size: 50px;
		color: #CBCDCE;
		text-align: center;
	}

	.dx-cp .cps .name {
		width: 300px;
		height: 50px;
		padding-left: 12px;
		padding-right: 88px;
		border-left: 4px solid #2393D6;
		line-height: 50px;
		font-size: 20px;
		color: #636364;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.alert-win {
		width: 1500px;
		/* height: 600px; */

		/* position: absolute; */
		line-height: 40px;
	}

	.left {
		width: 470px;
		height: 600px;
		float: left;
	}

	.left .options {
		width: 100%;
		height: 40px;
		margin-top: 20px;
	}

	.left .isGray input {
		background-color: #EBECED;
	}

	.left .options .cpdes {
		border: 1px solid #7A7B7C;
		width: 300px;
		height: 150px;
	}

	.left .options .showImg {
		width: 300px;
		height: 200px;
		position: relative;
		float: left;
		margin-top: 14px;
	}

	.left .options .showImg .hoverImg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: none;
	}

	.left .options .showImg:hover .hoverImg {
		display: block;
	}

	.left .options .showImg img {
		width: 100%;
		height: 100%;
	}

	.left .options .showImg .mesking {
		width: 300px;
		height: 200px;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		right: 0;
	}

	.left .options .showImg:hover .mesking a {
		display: block !important;
	}

	.right {
		width: 673px;
		border-left: 1px solid #A2A3A4;
		height: 600px;
		float: left;
		margin-left: 40px;
	}

	.right .show-imgs {
		width: 100%;
		height: 450px;
		float: left;
		padding: 0 40px;
		position: relative;
	}

	.right .show-imgs .cps-img {
		width: 159px;
		height: 220px;
		float: left;
		margin: 0 5px 10px 0;
	}

	.right .show-imgs .cps-img .c-imgs {
		width: 116px;
		height: 170px;
		position: relative;
	}

	.right .show-imgs .cps-img .c-imgs img {
		width: 100%;
		height: 100%;
		margin-left: 25px;
	}

	.right .show-imgs .cps-img .c-imgs .mesking {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		position: absolute;
		top: 0;
		left: 0;
		display: none;
		margin-left: 25px;
	}

	.right .show-imgs .cps-img .c-imgs:hover .mesking {
		display: block;
	}

	.right .show-imgs .cps-img .operates {
		float: left;
		margin-top: 10px;
	}

	.right .show-imgs .cps-img .operates input {
		background-color: #EBECED;
		width: 50px;
		height: 28px;
	}

	.right .show-imgs .cps-img .operates a {
		width: 31px;
		height: 31px;
	}

	.right .show-imgs .cps-img .operates .subtract {
		background: url("../../res/images/subtract.png?18274") 5px 15px no-repeat
	}

	.right .show-imgs .cps-img .operates .add {
		background: url("../../res/images/add.png?18274") 7px 7px no-repeat
	}

	.right .show-imgs .cps-img .operates .on-span {
		background-color: #29abe2;
	}

	.right .show-imgs .no-cimgs {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 250px;
		height: 200px;
		text-align: center;
	}

	.right .show-imgs .one-cimgs {
		width: 116px;
		height: 170px;
		float: left;
		background-color: #F5F6F7;
		position: relative;
	}

	.updateImg input {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		cursor: pointer;
	}

	@media screen and (min-width:1024px) and (max-width:1440px) {
		.alert-win {
			width: 100%;
			position: static;

		}
		.left {
			width: 490px;
			height: 560px;
			float: left;
		}
		.right {
			width: 452px;
			border-left: 1px solid #A2A3A4;
			height: 560px;
			float: left;
			margin-left: 40px;
		}
	}
</style>