<template>
	<Win @winEvent='winEvent' :width='700' :height='450'>
		<div class="win-content" slot='content'>
			<div class="list">
				<div class="fl">
					<span class="fl subTit">自定义名称</span>
					<input type="text" class="fl" placeholder="请输入自定义名称" v-model="name" maxlength="5" style="padding-left: 10px;" />
				</div>
				<div class="fl" style="margin-left: 30px;">
					<span class="fl subTit">排序</span>
					<subadd @toClick='toClick' :bindnum.sync="num" :maxnum="255" :minnum="1"></subadd>
				</div>
			</div>
			<div class="list" style="padding-top: 5px;border-top: 2px dashed #CCCCCC;">
				<span class="fl subTit">关联功能</span>
				<div class="fl" style="width: 500px;">
					<radioBtn :list.sync="list" :index.sync="index" :name='"name"' @selOn='selectIndex' :styleObj="{backgroundColor:'rgb(247,247,247)'}"></radioBtn>
					<!-- <sd-radio :list.sync="list" :index.sync="index" :name='"name"'></sd-radio> -->
				</div>
			</div>
			<div class="list" style="background: #f6f6f6;width: 533px;height: 63px;" v-if="menuType == 2">
				<span class="fl subTitUrl">请输入url：</span>
				<input type="text" class="fl inpUrl" placeholder="请输入url地址" maxlength="255" style="padding-left: 10px;margin-top: 5px;" v-model="urls"
				/>
			</div>
			<div class="list">
				<span class="fl iconTit">自定义Icon</span>
				<div class="fl updateImgBox" style="border: 5px #ccc solid;width: 50px;height: 50px;">
					<div v-if="iconImg == ''">
						<img src="../../res/images/icon.jpg" alt="自定义icon" />
					</div>

					<form enctype="multipart/form-data" id="iconForm">
						<input type="file" @change='iconChange' id="icon_btn" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
						/>
					</form>

					<img alt="logo" v-bind:src="uploadUrl  + iconImg" v-if="iconImg != ''" />
				</div>
				<ul class="fl iconSize">
					<li>图片大小</li>
					<li>(164*164)</li>
				</ul>
			</div>

		</div>
	</Win>


</template>

<script>
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';

	// let zhendReg = /[\'\'\&]/g; //验证中文字母数字
	//let urlReg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
	let urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/; //验证url地址是否合法
	export default {
		props: {
			i: {
				type: Number,
				default: 0
			},
			item: Object,
			type: String,
			config: {}
		},
		data() {
			return {
				num: '255', //排序
				list: [], //展示数据
				index: -1, //选中的index
				name: '', //自定义名称
				menuType: '',
				uploadUrl: '', // url地址
				iconImg: (this.item == undefined || this.item.image == undefined) ? '' : this.item.image,
				urls: (this.item == undefined || this.item.url == undefined) ? '' : this.item.url
			};

		},
		methods: {
			selectIndex(index) {
				this.index = index;
			},
			toClick(num) {
				this.num = num;
			},
			winEvent(str) {

				if (str == 'ok') {
					// 保存修改功能
					if (!this.name) {
						this.$store.commit('setWin', {
							content: '请输入自定义名称',
							time: 1000
						});
						return false;
					}

					//判断url地址是否合法
					if (this.menuType == 2) {
						if (!urlReg.test(this.urls)) {
							this.$store.commit('setWin', {
								content: 'url格式不正确',
								time: 1000
							});
							return false;
						}
					}

					if (this.type == '1') {
						this.config.menu.splice(this.i, this.setItem(this.item, this.type));
					} else if (this.config.menu.length == 6) {
						this.$store.commit('setWin', {
							content: '最多添加6个',
							time: 1000
						});
						return false;
					} else {
						this.config.menu.push(this.setItem(this.item, this.type));
					}
					this.config.menu.sort(this.arrSort('sort'));

				}
				this.$emit('winEvent', str);
			},

			arrSort: function (key) {
				// 数组排序
				return function (a, b) {
					let value = a[key];
					let value1 = b[key];
					return value - value1;
				};
			},
			getItemInfo: function (i, item, type) {
				// 获取传递数组参数
				//sd.log(item);
				if (type == '1') {
					this.num = item.sort;
					this.name = item.name;
					for (let j = 0; j < this.list.length; j++) {
						if (this.list[j].type == item.type) {
							this.index = j;
							this.menuType = this.list[j].type;
						}
					}
				}
			},
			setItem: function (item, type) {
				// 保存添加信息
				let obj = {};
				if (type == '1') {
					// 修改
					item.name = this.name;
					item.sort = this.num;
					item.type = this.index >= 0 ? this.list[this.index].type : '';
					item.url = this.menuType == 2 ? this.urls : '';
					item.image = this.iconImg == '' ? '' : this.iconImg;

					return item;
				} else {
					// 新建
					obj.name = this.name;
					obj.sort = this.num;
					obj.type = this.index >= 0 ? this.list[this.index].type : '';
					obj.url = this.menuType == 2 ? this.urls : '';
					obj.image = this.iconImg == '' ? '' : this.iconImg;
					return obj;
				}


			},
			async getSelfMenu() {

				// 获取菜单
				let data = await http.getHomeConfig({});
				this.list = data;
				this.getItemInfo(this.i, this.item, this.type);

			},
			async iconChange() {

				let data = await http.uploadImg({
					data: {
						type: 8,
						shopId: storage.session('shopId')
					},
					formId: 'iconForm'
				});
				this.iconImg = data;
			}
		},
		components: {
			Win: () =>
				import ( /* webpackChunkName:'win' */ 'src/components/win'),
			subadd: () =>
				import ( /* webpackChunkName:'subadd' */ 'src/components/subadd'),
			radioBtn: () =>
				import ( /* webpackChunkName:'radio_btn' */ 'src/components/radio_btn'),
		},
		watch: {
			'index': function () {
				this.menuType = this.list[this.index].type;
			}
		},
		mounted: function () {

			let userData = storage.session('userShop');
			this.uploadUrl = userData.uploadUrl;
			this.getSelfMenu();

		}

	};
</script>

<style scoped>
	.list {
		height: auto;
		line-height: 40px;
		width: 100%;
		margin-bottom: 30px;
		float: left;
	}

	.list>span {
		display: block;
		width: 100px;
		text-align: center;
	}

	.list>input.import {
		padding: 0;
		border: 0;
		border: 1px solid #b0b0b0;
		height: 38px;
		padding-left: 10px;
	}

	.list>textarea {
		width: 400px;
		height: 100px;
		padding: 10px;
		resize: none;
		color: #000;
	}

	.updateImgBox {
		width: 210px;
		height: 150px;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.updateImgBox>.imgAdd {
		height: 50px;
		width: 194px;
		display: table-cell;
		vertical-align: middle;
	}

	.imgAdd img {
		text-align: center;
		vertical-align: middle;
	}

	.updateImgBox input {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.updateImgBox>img {
		height: 100%;
		width: 100%;
		display: block;
	}

	.updateImgBox>p {
		color: #b0b0b0;
		line-height: 30px;
		font-size: 12px;
	}

	.handle-tips {
		height: 30px;
		line-height: 30px;
		width: 100%;
		text-indent: 130px;
		background: url(../../res/images/handle-tips.png) 100px center no-repeat;
		color: #999999;
	}

	.add-config>span {
		margin-right: 10px;
		display: block;
		background-color: #f8f8f8;
		height: 40px;
		width: auto;
		padding: 0 20px;
		text-align: center;
		cursor: pointer;
		position: relative;
	}

	.add-config>span.addContent {
		background-image: url(../../res/images/grayadd.png);
		background-position: center center;
		background-repeat: no-repeat;
	}

	.set-home-config {
		display: block;
		width: 150px;
	}

	.add-config>span:hover i {
		display: block;
	}

	.add-config>span>i {
		position: absolute;
		right: -5px;
		top: -12px;
		display: none;
		width: 25px;
		height: 25px;
		background-image: url(../../res/images/delete.png);
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
	}

	input:focus,
	textarea:focus {
		outline: none;
	}

	.win-content {
		width: 700px;
		height: 300px;
		padding: 30px;
	}

	.win-content span.subTit {
		display: block;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}

	.win-content span.subTitUrl {
		display: block;
		width: 100px;
		height: 50px;
		line-height: 50px;
		text-align: center;
	}

	.win-content input {
		border: none;
		height: 36px;
		border: 1px solid #9B9B9B;
		outline: none;
	}

	.win-content input.inpUrl {
		border: none;
		width: 417px;
		height: 45px;
		outline: none;
		background: #fff;
	}

	.updateName {
		width: 400px;
		border: none;
		line-height: 200px;
		color: #7F7F7F;
		cursor: Default;
	}

	.ImgBox {
		width: 50px;
		height: 50px;
		border: 5px #ccc solid;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.iconAdd {
		height: 50px;
		width: 50px;
		display: table-cell;
		vertical-align: middle;
	}

	.iconAdd img {
		text-align: center;
		vertical-align: middle;
	}

	.iconTit {
		display: block;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 12px;
	}

	.ImgBox {
		width: 50px;
		height: 50px;
		border: 5px #ccc solid;
		text-align: center;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.iconAdd {
		height: 50px;
		width: 50px;
		display: table-cell;
		vertical-align: middle;
	}

	.iconAdd img {
		text-align: center;
		vertical-align: middle;
	}

	.iconSize {

		color: #ccc;
		font-size: 12px;
		margin-left: 10px;
		text-align: center;

	}

	.iconSize li {
		height: 16px;
		text-align: center;
		vertical-align: middle;
	}
</style>