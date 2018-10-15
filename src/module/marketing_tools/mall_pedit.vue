<template>
	<div class='mall-box' id='proedit'>
		<div class="title">
			<span>基础配置</span>
		</div>
		<div class="name">
			<div class="sub">素材名称</div>
			<el-input v-model="name" class="text" placeholder="输入名称"></el-input>
		</div>
		<div class="type">
			<div class="sub">素材编辑器</div>
			<div class="container">
				<div :class="{button:true,disable:!isname,able:isname}" @click="toggle('name')">
					<span>添加昵称</span>
					<i class="el-icon-close"></i>
				</div>
				<div :class="{button:true,disable:!islogo,able:islogo}" @click="toggle('logo')">
					<span>添加头像</span>
					<i class="el-icon-close"></i>
				</div>
				<div :class="{button:true,disable:!isqr,able:isqr}" @click="toggle('qr')">
					<span>添加二维码</span>
					<i class="el-icon-close"></i>
				</div>
			</div>
			<div class="nameConfig">
				<div class="font">
					<div class="tips">昵称字号</div>
					<el-input-number :style="{fontSize}" v-model="fontSize" controls-position="right" :step="2" :min="12" :max="64"></el-input-number>
				</div>
				<div class="color">
					<div class="tips">昵称颜色</div>
					<el-color-picker v-model="color" :color-format="'rgb'"></el-color-picker>
				</div>
			</div>
		</div>
		<div class="upload">
			<div class="sub">上传图片</div>
			<form id='imageUpForm' enctype='multipart/form-data' style="position:absolute">
				<input type='file' id='file_upload' accept='image/jpeg,image/png,image/gif,image/tiff' @change='fileNameChange' name='image' style='opacity: 0;' />
			</form>
			<el-button type="primary" class="upload_but" style="position:relative">
				<label for="file_upload" style="position:absolute;width:100%;height:100%;left:0;top:0;cursor: pointer;"></label>
				<i class="el-icon-plus el-icon--left"></i>上传图片
			</el-button>

		</div>
		<div class="alertTips">
			<i class="el-icon-info" style="color:rgb(216,219,227)"></i>
			<span>底图尺寸：大小不能超过300KB，微信昵称的设计字号为24px</span>
		</div>
		<div ref='editContent' class='editCont'>
			<div v-if='isname' v-moves class='names' data-name="name" ref='names' :style="{fontSize:fontSize + 'px',color:color,top:editConfig['name'].y,left:editConfig['name'].x}">昵称</div>
			<div v-if='islogo' v-moves class='edit-head' data-name="logo" :style="{lineHeight:editConfig['logo'].h,width:editConfig['logo'].w,height:editConfig['logo'].h,top:editConfig['logo'].y,left:editConfig['logo'].x}" ref='editHead'>
				头像
				<div></div>
			</div>
			<div v-if='isqr' v-moves class='prowx' data-name="qr" ref='prowx' :style="{lineHeight:editConfig['qr'].h,width:editConfig['qr'].w,height:editConfig['qr'].h,top:editConfig['qr'].y,left:editConfig['qr'].x}">
				二维码
				<div></div>
			</div>
			<img :src='imgHost + fileName' v-if='fileName != null' v-bind:style="imgStyle" class="centerImg" />
		</div>

		<div class="submitBut">
			<el-button type="info" @click="openPro">关闭</el-button>
			<el-button type="primary" @click="onPro">保存</el-button>
		</div>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';
	import utils from 'src/verdor/utils';

	let imgRang = {
		top: 0,
		left: 0
	};

	export default {
		data() {
			return {
				imgData: null,
				imgHost: '',
				fileName: null,
				name: null,
				pid: null,
				uid: '',
				isname: false,
				islogo: false,
				isqr: false,
				color: 'rgb(255,255,255)',
				imgStyle: {
					width: 0,
					height: 0
				},
				imgScale: 1, //图片缩放比例
				fontSize: 24,
				editConfig: {
					name: {
						x: 0,
						y: 0,
						w: 60 + 'px',
						h: 28 + 'px'
					},
					logo: {
						w: 64 + 'px',
						h: 64 + 'px',
						x: 0,
						y: 0
					},
					qr: {
						w: 64 + 'px',
						h: 64 + 'px',
						x: 0,
						y: 0
					}
				}
			};
		},
		props: {
			position: {
				type: null,
				default: null
			}
		},
		methods: {
			handleChange(value) {
				this.fontSize = value + 'px';
			},
			toggle(str) {
				if (!this.fileName) {
					this.$store.commit('setWin', {
						content: '请先上传背景图'
					});
					return;
				}

				this['is' + str] = !this['is' + str];
				if (!this['is' + str]) {
					if (str == 'name') {
						this.color = '#fff';
						this.fontSize = 24;
					}
				} else {

					this.editConfig[str].x = parseFloat(imgRang.left) + 'px';
					this.editConfig[str].y = parseFloat(imgRang.top) + 'px';

				}
			},
			reset() {
				this.color = 'rgb(255,255,255)';
				this.fontSize = 24;
				this.imgStyle = {
					width: 0,
					height: 0
				};
				imgRang = {
					top: 0,
					left: 0
				};
				this.imgScale = 1;
			},
			openPro() {
				this.$emit('closePedit');
			},
			loadImg(str) {
				return new Promise((res) => {
					let img = new Image();
					img.src = str.indexOf('base64') > -1 ? str : this.imgHost + str;
					img.onload = function() {
						res(img);
						img = null;
					};
				});
			},
			readFile(file) {

				return new Promise((res) => {
					let ready = new FileReader();
					ready.readAsDataURL(file);
					ready.onload = function() {
						res(this.result);
					};
				});

			},
			countScale(width, height) {

				let w = 0;
				let h = 0;
				if (width < 750 && height < 750) {
					w = width;
					h = height;
				} else if (width >= height) {
					this.imgScale = width / 750;
					h = height / this.imgScale;
					w = 750;
				} else if (height > width) {
					this.imgScale = height / 750;
					w = width / this.imgScale;
					h = 750;
				}
				this.imgStyle = {
					width: w + 'px',
					height: h + 'px'
				};
				imgRang = {
					width: w,
					height: h,
					top: (750 - h) / 2 + 'px',
					left: (750 - w) / 2 + 'px'
				};
			},
			async preFn(file) {

				let re = await this.readFile(file);
				let img = await this.loadImg(re);
				let {
					width,
					height
				} = img;

				if (width < 100 || height < 100) {
					this.$store.commit('setWin', {
						content: '宽和高必须要大于100px'
					});
					return false;
				}
				if (width > 3000 || height > 3000) {
					this.$store.commit('setWin', {
						content: '宽或者高不能大于3000px'
					});
					return false;
				}
				this.reset();
				this.countScale(width, height);
			},
			async fileNameChange() {
				let res = await http.uploadImg({
					data: {
						type: 6,
						shopId: storage.session('shopId'),
					},
					fn: this.preFn,
					formId: 'imageUpForm'
				});

				this.imgData = res;
				this.fileName = res;


			},
			countSize(pos, size, type) {
				if (pos) {
					pos.push(parseInt( (parseFloat(this.editConfig[type].x) - parseFloat(imgRang.left))* this.imgScale ));
					pos.push(parseInt( (parseFloat(this.editConfig[type].y) - parseFloat(imgRang.top) ) * this.imgScale ));
				}
				if (size) {
					size.push(parseInt(parseFloat(this.editConfig[type].w) * this.imgScale));
					size.push(parseInt(parseFloat(this.editConfig[type].h) * this.imgScale));
				}

			},
			async onPro() {

				let names = [];
				let namesSize = [];
				let heads = [];
				let headsSize = [];
				let wxs = [];
				let wxsSize = [];

				if (!global.checkData(
					{
						name: {
							cond: `$$.toString().trim() != '' && $$.toString().trim() != 0`,
							pro: '请输入正确格式的素材名称!'
						}
					}, 
					this)) {
					return false;
				}

				if (this.isname) {
					this.countSize(names, null, 'name');
					let obj = utils.getDOMPosition(this.$refs.names);
					namesSize.push(obj.w, obj.h);
				}
				if (this.islogo) {
					this.countSize(heads, headsSize, 'logo');
				}
				if (this.isqr) {
					this.countSize(wxs, wxsSize, 'qr');
				}

				let sourceObj = {
					name: this.name.toString(),
					imageName: this.fileName,
					positionName: names.toString(),
					positionNameSize: namesSize.toString(),
					positionNameFontSize: this.fontSize,
					positionNameColor: this.color.replace(/rgb\(|\)/g,''),
					positionHead: heads.toString(),
					positionHeadSize: headsSize.toString(),
					positionQR: wxs.toString(),
					positionQRSize: wxsSize.toString(),
					uid: this.uid
				};
				console.log(sourceObj);
				
				if (this.position) {
					await http.ActivityEdit({
						data: Object.assign(sourceObj, {
							id: this.pid,
						})
					});
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '修改素材成功,一秒后跳转至素材列表页面！',
						winType: 'confirm',
						timerPowerOff: 1000,
						callback: () => {
							this.$emit('closePedit', {
								imageName: this.fileName
							});
						}
					});
				} else {
					await http.ActivityAdd({
						data: sourceObj
					});
					this.$store.commit('setWin', {
						title: '操作提示',
						content: '修改素材成功,一秒后跳转至素材列表页面！',
						winType: 'confirm',
						timerPowerOff: 1000,
						callback: () => {
							this.$emit('closePedit', {
								imageName: this.fileName
							});
						}
					});
				}
			},
			async initPosition(val) {
				console.log(val);
				this.islogo = true;
				this.isqr = true;

				this.color = `rgb(${val.positionNameColor})`;
				this.fontSize = val.positionNameFontSize;
				this.fileName = val.imageName;
				this.name = val.name;
				this.pid = val.id;

				if (this.fileName) {
					let img = await this.loadImg(this.fileName);
					let {
						width,
						height
					} = img;
					this.countScale(width, height);
				}

				if (val.positionName.length > 0) {
					this.isname = true;
					this.$nextTick().then(() => {
						this.initStyle('name', val.positionName, '');
					});
				}
				if (val.positionHead.length > 0) {
					this.islogo = true;
					this.$nextTick().then(() => {
						this.initStyle('logo', val.positionHead, val.positionHeadSize);
					});
				}
				if (val.positionQR.length > 0) {
					this.isqr = true;
					this.$nextTick().then(() => {
						this.initStyle('qr', val.positionQR, val.positionQRSize);
					});
				}

			},
			initStyle(type, position, size) {

				let pos = position.split(',');

				let x = 0;
				let y = 0;
				let w = 0;
				let h = 0;
				if (pos.length > 0) {
					x = parseFloat(imgRang.left) + parseInt(pos[0]) / this.imgScale;
					y = parseFloat(imgRang.top) + parseInt(pos[1]) / this.imgScale;
				}

				let s = '';
				if (size && (s = size.split(',')) && s.length > 0) {
					w = parseInt(s[0] / this.imgScale);
					h = parseInt(s[1] / this.imgScale);
				}
				
				if ((x + w) > parseFloat(imgRang.left) + parseFloat(this.imgStyle.width) || (y + h) > parseFloat(imgRang.top) + parseFloat(this.imgStyle.height) || x < parseFloat(imgRang.left) || y < parseFloat(imgRang.top)) {
					this.editConfig[type].x = imgRang.left;
					this.editConfig[type].y = imgRang.top;
					this.$store.commit('setWin', {
						content: '坐标位置出现问题,已经重置,\n建议重新新建素材.'
					});
				} else {
					let item = this.editConfig[type];
					item.x = x + 'px';
					item.y = y + 'px';
					item.w = (w < 20 ? 20 : w) + 'px';
					item.h = (h < 20 ? 20 : h)+ 'px';
				}

			}
		},
		directives: {
			moves: {
				bind(el, binding, vNode) {

					el.addEventListener(
						'mousedown',
						e => {
							// let imgRang = vNode.context.$refs.imgRang.getBoundingClientRect();

							let disX = e.clientX - el.offsetLeft;
							let disY = e.clientY - el.offsetTop;
							let name = el.getAttribute('data-name');

							document.onmousemove = function(ev) {
								let l = ev.clientX - disX;
								let t = ev.clientY - disY;
								let divT = el.getBoundingClientRect();

								if (l <= parseFloat(imgRang.left)) l = imgRang.left;
								if (l > imgRang.width - divT.width + parseFloat(imgRang.left))
									l = imgRang.width - divT.width + parseFloat(imgRang.left);
								if (t < parseFloat(imgRang.top)) t = imgRang.top;
								if (t > imgRang.height - divT.height + parseFloat(imgRang.top))
									t = imgRang.height - divT.height + parseFloat(imgRang.top);

								el.style.cursor = 'move';
								vNode.context.editConfig[name].x = l + 'px';
								vNode.context.editConfig[name].y = t + 'px';
							};
							document.onmouseup = function() {
								document.onmousemove = null;
								document.onmouseup = null;
							};
						},
						false
					);

					let img = el.children[0];
					if (img) {
						img.addEventListener(
							'mousedown',
							e => {
								e.stopPropagation();
								let name = el.getAttribute('data-name');
								let tempL = 0;
								document.onmousemove = function(ev) {
									let l = ev.clientX - e.clientX;
									let source = parseFloat(utils.getDOMPosition(el).w);
									let scale = ((tempL > 0 ? (l - tempL) * 0.5 : l) + source) / source;

									let w = source * scale;
									let h = source * scale;

									if (w < 24 || h < 24) return;

									let tempLeft = el.offsetLeft - parseFloat(imgRang.left);
									let tempTop = el.offsetTop - parseFloat(imgRang.top);

									if (tempLeft + w >= imgRang.width || tempTop + h >= imgRang.height) {
										return;
									}

									el.style.lineHeight = `${h}px`;
									tempL = l;
									vNode.context.editConfig[name].w = w + 'px';
									vNode.context.editConfig[name].h = w + 'px';

								};
								document.onmouseup = function() {
									document.onmousemove = null;
									document.onmouseup = null;
								};
							}
						);
					}


				}
			}
		},
		mounted() {
			// let Upload = storage.getClass('ctr.upload');
			let userData = storage.session('userShop');
			this.uid = userData.user.id;
			this.imgHost = userData.uploadUrl;
			if (this.position) this.initPosition(this.position);
		}
	};
</script>

<style lang='less' scoped>
	.mall-box {
		width: 100%;
		min-width: 750px;
		height: auto;
		margin-left: 10px;
	}

	.title {
		font-size: 16px;
		color: #303133;
		position: relative;
	}

	.title::before {
		content: "";
		width: 4px;
		height: 16px;
		background: #E1BB4A;
		position: absolute;
	}

	.title::after {
		content: "";
		width: calc(100% - 350px);
		border: 1px dashed #DCDFE6;
		position: absolute;
		margin-left: 10px;
		margin-top: 6px;
	}

	.title span{
		padding-left: 10px;
	}
	.name {
		margin-top: 20px;

		.sub {
			display: inline-block;
			width: 70px;
			text-align: right;
		}

		.text {
			display: inline-block;
			width: 240px;
			height: 40px;
			margin-left: 20px;
		}

	}

	.type {
		margin-top: 20px;

		.sub {
			display: inline-block;
			width: 70px;
			text-align: right;
		}

		.container {
			display: inline-block;
			margin-left: 20px;

			.button {
				background-color: transparent;
				height: 30px;
				border-radius: 100px;
				vertical-align: middle;
				line-height: 30px;
				text-align: center;
				display: inline-block;
				margin-right: 10px;
				cursor: pointer;
			}

			.disable {
				border-color: #DCDFE6;
				border: 1px solid #909399;
				color: #909399;
				width: 94px;

				i {
					display: none;
				}
			}

			.able {
				width: 103px;
				color: #E1BB4A;
				border: 1px solid #E1BB4A;
				border-color: #E1BB4A;

				i {
					display: inline;
				}
			}
		}

		.nameConfig {
			margin: 20px 0 0 95px;

			.font {
				display: inline-block;
				vertical-align: middle;

				&>.tips {
					margin-bottom: 10px;
				}
			}

			.color {
				display: inline-block;
				vertical-align: middle;

				&>.tips {
					margin-bottom: 10px;
				}

				margin-left: 20px;
			}
		}
	}

	.upload {
		margin-top: 20px;

		.sub {
			display: inline-block;
			width: 70px;
			text-align: right;
		}

		.upload_but {
			display: inline-block;
			width: 138px;
			height: 36px;
			margin-left: 20px;
		}

	}

	.alertTips {
		margin: 15px 0 15px 95px;
		font-size: 12px;
		color: #909399;
		letter-spacing: 0;
		line-height: 20px;
	}

	.editCont {
		width: 750px;
		height: 750px;
		background: #ECEDF2;
		margin-left: 95px;
		position: relative;
	}

	.editCont div {
		display: block;
		cursor: pointer;
		position: absolute;
		z-index: 999;
	}

	.editCont .centerImg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

	.edit-head {
		color: #333;
		background-color: #fff;
		text-align: center;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
		position: relative;
		transform-origin: top left;
	}

	.prowx {
		color: #333;
		background: #fff;
		text-align: center;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
		position: relative;
		transform-origin: top left;

	}

	.prowx div,
	.edit-head div {

		position: absolute;
		bottom: 0;
		right: 0;
		width: 10px;
		height: 10px;
		cursor: nwse-resize;
	}

	.names {
		color: #fff;
		font-size: 24px;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
	}

	.submitBut {
		margin: 20px 0 10px 95px;

		button {
			width: 120px;
			height: 40px;
		}
	}
</style>