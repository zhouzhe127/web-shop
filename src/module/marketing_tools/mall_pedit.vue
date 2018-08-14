<template>
	<div class='mall-box' id='proedit'>
		<div class='proHead'>
			<div class='headCont'>
				<span>
					<div>
						<img src='../../res/images/probg.png' />
					</div>
					<span>底图背景</span>
					<form id='imageUpForm' enctype='multipart/form-data'>
						<input type='file' id='file_upload' accept='image/jpeg,image/png,image/gif,image/tiff' @change='fileNameChange' name='image'
						    style='position: absolute;left:0;top:0;cursor:pointer;opacity: 0;width: 100px;height: 100px;' />
					</form>
				</span>
				<span @click='() => isShowName = true ' id='name'>
					<div>
						<img src='../../res/images/font.png' />
					</div>
					<span>昵称</span>
				</span>
				<span @click='() => isShowHead = true' id='head'>
					<div>
						<img src='../../res/images/head.png' />
					</div>
					<span>头像</span>
				</span>
				<span @click='() => isShowWx = true' style='margin-right: 0;' id='wx'>
					<div>
						<img src='../../res/images/wx.png' />
					</div>
					<span>二维码</span>
				</span>
			</div>
		</div>
		<div class='proContenr'>
			<div class='proHad'>
				<input type='text' v-model='name' placeholder='请输入推广素材名称' maxlength='30' />
			</div>
			<div class='pContenr fl' style='position: relative;'>
				<div ref='editContent' class='editCont'>
					<div v-if='isShowName' v-moves class='names' ref='names'>昵称</div>
					<div v-if='isShowHead' v-moves class='edit-head' ref='editHead'>头像</div>
					<div v-if='isShowWx' v-moves class='prowx' ref='prowx'>二维码</div>
					<img :src='imgHost + fileName' v-if='fileName != null' />
				</div>
			</div>
			<div class='proinfo fr'>
				<p style='color: #333;'>尺寸规格：</p>
				<p>1.底图的设置尺寸为750*1334px(大小不能超过300kb)</p>
				<p>2.微信昵称的设计字号为24px</p>
				<!--<p>3.微信头像的设计尺寸为108px*108px</p>
					<p>4.二维码的设计尺寸为400px*400px</p>-->
				<div class='prooperate' style='margin-top: 80px;'>
					<a href='javascript:void(0);' class='fl yellow' style='width: 105px;margin-right: 10px;' @click='openPro'>关闭</a>
					<a href='javascript:void(0);' class='fl yellow' style='width: 105px;margin-left: 10px;' @click='onPro'>保存</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				imgData: null,
				imgHost: '',
				fileName: null,
				name: null,
				pid: null,
				uid: '',
				isShowName: false,
				isShowHead: false,
				isShowWx: false
			};
		},
		props: {
			position: {
				type: null,
				default: null
			}
		},
		methods: {
			openPro() {
				this.$emit('closePedit');
			},
			async fileNameChange() {
				let res = await http.uploadImg({
					data: {
						type: 6,
						shopId: storage.session('shopId')
					},
					formId: 'imageUpForm'
				});
				this.imgData = res;
				this.fileName = res;
			},
			async onPro() {
				// debugger
				let names = [];
				let heads = [];
				let wxs = [];
				if (!global.checkData(
					{
						name: {
							cond: `$$.toString().trim() != '' && $$.toString().trim() != 0`,
							pro: '请输入正确格式的素材名称!'
						},
						fileName: {
							cond: `$$.trim() != ''`,
							pro: '请上传素材底图!'
						},
						isShowName: {
							cond: '$$ == true',
							pro: '请选择昵称位置!'
						},
						isShowHead: {
							cond: '$$ == true',
							pro: '请选择头像位置!'
						},
						isShowWx: {
							cond: '$$ == true',
							pro: '请选择二维码位置!'
						}
					},this)) {
					return false;
				}
				if (this.isShowName && this.isShowHead && this.isShowWx) {
					let name = this.$refs.names;
					let editHead = this.$refs.editHead;
					let prowx = this.$refs.prowx;
					names.push(name.offsetTop * 2);
					names.push(name.offsetLeft * 2);

					heads.push(editHead.offsetTop * 2);
					heads.push(editHead.offsetLeft * 2);

					wxs.push(prowx.offsetTop * 2);
					wxs.push(prowx.offsetLeft * 2);
				}
				if (this.position) {
					await http.ActivityEdit({
						data: {
							id: this.pid,
							name: this.name.toString(),
							imageName: this.fileName,
							positionName: names.toString(),
							positionHead: heads.toString(),
							positionQR: wxs.toString(),
							uid: this.uid
						}
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
						data: {
							name: this.name,
							imageName: this.fileName,
							positionName: names.toString(),
							positionHead: heads.toString(),
							positionQR: wxs.toString(),
							uid: this.uid
						}
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
			initPosition(val) {
				this.isShowName = true;
				this.isShowHead = true;
				this.isShowWx = true;
				this.fileName = val.imageName;
				this.name = val.name;
				this.pid = val.id;

				this.$nextTick().then(() => {
					let names = this.$refs.names;
					let editHead = this.$refs.editHead;
					let prowx = this.$refs.prowx;
					this.initStyle(names, val.positionName);
					this.initStyle(editHead, val.positionHead);
					this.initStyle(prowx, val.positionQR);
				});
			},
			initStyle(el, sty) {
				el.style.top = sty.split(',')[0] / 2 + 'px';
				el.style.left = sty.split(',')[1] / 2 + 'px';
			}
		},
		directives: {
			moves: {
				bind(el, binding, vNode) {
					el.addEventListener(
						'mousedown',
						e => {
							let editContent = vNode.context.$refs.editContent.getBoundingClientRect();
							let disX = e.clientX - el.offsetLeft;
							let disY = e.clientY - el.offsetTop;
							document.onmousemove = function (ev) {
								let l = ev.clientX - disX;
								let t = ev.clientY - disY;
								let divT = el.getBoundingClientRect();
								if (l <= 0) l = 0;
								if (l > editContent.width - divT.width)
									l = editContent.width - divT.width;
								if (t < 0) t = 0;
								if (t > editContent.height - divT.height)
									t = editContent.height - divT.height;
								el.style.left = l + 'px';
								el.style.top = t + 'px';
								el.style.cursor = 'move';
							};
							document.onmouseup = function () {
								document.onmousemove = null;
								document.onmouseup = null;
							};
						},
						false
					);
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
	}

	.proHead {
		height: 100px;
		width: 100%;
		background-color: #d0d0d0;
		margin-bottom: 10px;
	}

	.headCont {
		width: 500px;
		height: 100px;
		font-size: 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.headCont>span {
		display: inline-block;
		height: 100px;
		width: 100px;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
		position: relative;
		transition: 0.2s background-color ease-in;
		margin-right: 33.3px;
	}

	.headCont>span:hover {
		background-color: #29a7e1;
	}

	.headCont>span div {
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		height: 75px;
		width: 100px;
	}

	.headCont>span span {
		display: block;
		height: 25px;
		line-height: 25px;
		color: #fff;
	}

	.proContenr {
		background-color: #f2f2f2;
		height: 1000px;
		width: 100%;
		position: relative;
	}

	.proHad {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #ccc;
	}

	.proHad input {
		outline: none;
		height: 40px;
		line-height: 40px;
		width: 300px;
		margin-top: 5px;
		padding: 0;
		padding-left: 30px;
		color: #666;
		border: none;
		box-sizing: border-box;
		position: relative;
		left: 50%;
		top: 0;
		transform: translate(-50%, 0);
		/* IE 9 */
		-ms-transform: translate(-50%, 0);
		/* Firefox */
		-moz-transform: translate(-50%, 0);
		/* Safari 和 Chrome */
		-webkit-transform: translate(-50%, 0);
		/* Opera */
		-o-transform: translate(-50%, 0);
	}

	.pContenr {
		background: url(../../res/images/iphone.png) no-repeat;
		background-position: 20px 20px;
		width: 450px;
		height: 900px;
		margin-left: 10%;
	}

	.proinfo {
		float: right;
		margin-right: 10%;
		margin-top: 20%;
	}

	.proinfo p {
		height: 40px;
		line-height: 40px;
		color: #999;
	}

	.prooperate {
		/*position: absolute;
	left: 70%;
	bottom: 10%;*/
		width: 230px;
	}

	.editCont {
		width: 375px;
		height: 667px;
		position: absolute;
		left: 45px;
		top: 120px;
	}

	.editCont img {
		display: block;
		height: 100%;
		width: 100%;
	}

	.editCont div {
		display: block;
		cursor: pointer;
		left: 0;
		top: 0;
		position: absolute;
		z-index: 999;
	}

	.edit-head {
		height: 64px;
		line-height: 64px;
		color: #333;
		width: 64px;
		background-color: #fff;
		text-align: center;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
	}

	.prowx {
		background: #fff;
		width: 64px;
		height: 64px;
		line-height: 64px;
		text-align: center;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
	}

	.names {
		color: #fff;
		font-size: 24px;
		border: 2px solid #ccc;
		user-select: none;
		cursor: move;
	}

	.win-mask {
		z-index: 3 !important;
	}

	.win.center {
		z-index: 4 !important;
	}
</style>