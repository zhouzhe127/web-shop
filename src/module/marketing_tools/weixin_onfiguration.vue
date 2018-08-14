<template>
	<div>
		<div class="list">
			<span class="fl required">品牌名</span>
			<input type="text" placeholder="请输入品牌名" v-model="names" class="fl import" maxlength="20" />
		</div>
		<div class="list">
			<span class="fl required">LOGO</span>
			<div class="fl updateImgBox">
				<!--{{config.logoImage == ''}}-->
				<template v-if="config.logoImage == ''">
					<div class="imgAdd">
						<img src="../../res/images/grayadd.png" alt="LOGO" />
					</div>
					<p style="color: #666666;font-size: 16px;">上传LOGO</p>
					<p>(194px*194px)</p>
				</template>
				<form enctype="multipart/form-data" id="logoImage">
					<input @change='logoChange' type="file" id="logo_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image"
					    onclick="this.value = ''" />
				</form>
				<img alt="logo" v-bind:src="uploadUrl  + config.logoImage" v-if="config.logoImage != ''" />
			</div>
			<div class="fl updateName" style='height: 150px;line-height: 150px;' v-if="config.logoImage != ''">(已上传：{{logoName}})</div>
		</div>
		<div class="list">
			<span class="fl">背景图</span>
			<div class="fl updateImgBox">
				<template v-if="config.bgImage == ''">
					<div class="imgAdd">
						<img src="../../res/images/grayadd.png" alt="背景图" />
					</div>
					<p style="color: #666666;font-size: 16px;">上传背景图</p>
					<p>(750px*1334px)</p>
				</template>

				<form enctype="multipart/form-data" id="bgImage">
					<input type="file" id="bg_upload" @change='bgChange' accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					/>
				</form>
				<img alt="logo" :src="uploadUrl  + config.bgImage" v-if="config.bgImage != ''" />
			</div>
			<div class="fl updateName" style='height: 150px;line-height: 150px;' v-if="config.bgImage != ''">(已上传：{{bgName}})</div>
		</div>
		<div class="list">
			<span class="fl">欢迎语</span>
			<textarea placeholder="请输入欢迎语" maxlength="30" v-model="config.welcome"></textarea>
			<div class="fl handle-tips">
				<i></i>
				限30字内
			</div>
		</div>
		<div class="list">
			<span class="fl">功能入口</span>
			<div class="fl add-config ">
				<span class="fl" v-for="(funList,i) in config.menu" :key='i' @click="openWin(i,funList,'1')">{{funList.name}}
					<i @click.stop="deleteList(i)"></i>
				</span>
				<span class="addContent fl" @click="openWin"></span>
			</div>
		</div>
		<div class="list">
			<span class="fl add-config">&nbsp;</span>
			<a href="javascript:void(0)" class="yellow set-home-config fl" @click="updateHomePageConfig" v-if="isConfig">保存</a>
		</div>
		<entry :i='i' :item='item' :type='type' v-if='show' @winEvent='winEvent' :config='config'></entry>
	</div>

</template>

<script>
	import utils from 'src/verdor/utils';
	import storage from 'src/verdor/storage';
	import http from 'src/manager/http';

	let zhendReg = /["'&]/g; //验证中文字母数字
	export default {
		data() {
			return {
				config: {}, // 微信首页配置
				uploadUrl: '', // url地址
				isConfig: '',
				logoName: '', // logo名字
				bgName: '', //背景名称
				name: '',
				shopId: 0,
				i: 0,
				item: {},
				type: '',
				show: false
			};

		},
		computed: {
			names: {
				get: function () {
					return this.name;
				},
				set: function (newValue) {
					this.name = newValue.replace(zhendReg, '');
					this.config.logoName = this.name;
				}
			}
		},
		methods: {
			winEvent() {
				this.show = false;
			},
			async logoChange() {

				let data = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'logoImage'
				});

				this.config.logoImage = data;
				let logoName = this.config.logoImage.lastIndexOf('/');
				this.logoName = this.config.logoImage.substring(logoName + 1, this.config.logoImage.length);
			},
			async bgChange() {

				let data = await http.uploadImg({
					data: {
						type: 8,
						shopId: this.shopId
					},
					formId: 'bgImage'
				});
				this.config.bgImage = data;
				let bgName = this.config.logoImage.lastIndexOf('/');
				this.bgName = this.config.logoImage.substring(bgName + 1, this.config.logoImage.length);
			},
			openWin(i, item, type) {
				if (item) {
					this.i = i;
					this.item = item;
					this.type = type;
				} else {
					this.i = this.config.menu.length;
					this.item = {};
					this.type = '';
				}
				this.show = true;
			},
			async getHomePageConfig() {
				let data = await http.getHomePageConfig({
					data: {}
				});
				this.config = data;
				this.name = this.config.logoName;
				this.logoName = data.logoImage;
				let logoName = this.logoName.lastIndexOf('/');
				this.logoName = this.logoName.substring(logoName + 1, this.logoName.length);

				this.bgName = data.bgImage;
				let bgName = this.bgName.lastIndexOf('/');
				this.bgName = this.bgName.substring(bgName + 1, this.bgName.length);
			},
			async updateHomePageConfig() {
				if (utils.trim(this.config.logoName) == '') {
					this.$store.commit('setWin', {
						content: '请输入品牌名'
					});
					return false;
				}

				if (!this.config.logoImage) {
					this.$store.commit('setWin', {
						content: '请上传Logo',
						time: 1000
					});
					return false;
				}

				await http.updateHomePageConfig({
					data: {
						logoName: this.config.logoName,
						logoImage: this.config.logoImage,
						bgImage: this.config.bgImage,
						welcome: this.config.welcome,
						menuData: JSON.stringify(this.config.menu)
					}
				});

				this.$store.commit('setWin', {
					content: '保存成功',
					time: 1000
				});

			},
			deleteList: function (i) {
				// 删除list中的选项
				this.config.menu.splice(i, 1);
			}
		},
		components: {
			entry: () =>
				import ( /* webpackChunkName:'weixin_onfiguration_entry' */ './weixin_onfiguration_entry')
		},
		mounted() {
			let userData = storage.session('userShop');
			this.uploadUrl = userData.uploadUrl;
			this.isConfig = (userData.currentShop.ischain == '0' || userData.currentShop.ischain == '3');
			this.shopId = userData.currentShop.id;
			this.getHomePageConfig();
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
		border: 1px solid #9999;
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
</style>