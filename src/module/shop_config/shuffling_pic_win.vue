<!--
	**店铺配置——添加修改图片弹框
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<win @winEvent="shufflingPicWin" :align="'center'" :width="500" :height="350" :ok="okStyle" :cancel="cancelStyle">
		<span slot="title">{{title}}</span>
		<div id="tan" slot="content" v-cloak>
			<div class="picCon">
				<div class="imgBox">
					<img v-if="image != ''" id="imgs" v-bind:src="imgHost+image" alt="轮播图">
					<img v-if="image == ''" src="../../res/images/busis.png" width="300" height="200" alt="商品" />
					<form class="addTo" id="imageUpForm" enctype="multipart/form-data">
						<input type="file" @change='fileNameChange' accept="image/jpeg,image/png,image/jpg,image/bmp" id="file_upload" name="image" onclick="this.value = ''" style="position:absolute;left:0px; top:0px;height: 50px; opacity:0;width: 100%;cursor: pointer;">
						<span class="blue" style="width: 100px; height: 50px; line-height: 50px;">编辑图片</span>
					</form>

				</div>
				<p>
					<img class="icon-i" src="../../res/images/handle-tips.png" />
					<span v-if="status">建议图片大小
						<i v-if="type === 0">2124*1468PX</i>
						<i v-else>1280*1240PX</i>
					</span>
					<span v-else>
						<i v-if="type == 1 || type == 4">建议图片大小1000*1080PX</i>
						<i v-else-if="type == 6">建议图片大小750*300PX</i>
						<i v-else>建议图片大小2048*1536PX</i>
					</span>
				</p>
				<div class="sort">
					<span class="sortword fl">排序</span>
					<div class="fl" style="width: 185px;">
						<subaddBtn :minnum='1' :bindnum="num" :maxnum="255" @toClick="changeNum" :sign='false'></subaddBtn>
					</div>
				</div>
			</div>
		</div>
	</win>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import win from 'src/components/win.vue';
export default {
	data() {
		return {
			shopId: null, //店铺id
			imgHost: '',
			id: '',
			uid: '',
			fileName: '',
			bannerName: '',
			num: this.detial.sort ? this.detial.sort : 1,
			maxNum: 255,
			title: '',
			okStyle: null,
			cancelStyle: null,
			printDetial: null,
			image: ''
		};
	},
	components: {
		win,
		subaddBtn: () =>
			import(/* webpackChunkName:"radio_btn" */ 'src/components/subadd')
	},
	props: {
		index: Number, //轮播图下标
		detial: Object, //轮播图详情
		types: String, //添加或修改轮播图
		status: Boolean, //电子菜单管理进来电子菜单管理进来
		type: [String, Number] //渠道id
	},
	mounted() {
		// console.log(this.type);
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.imgHost = userData.uploadUrl;
		this.image = this.detial.image;
		if (this.types == 'add') {
			this.title = '添加图片';
			this.okStyle = {
				content: '保存',
				style: {
					backgroundColor: '#bd823e',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '取消',
				style: {
					backgroundColor: '#a0a0a0',
					color: '#fff'
				}
			};
		} else if (this.types == 'edit') {
			this.title = '修改图片';
			this.okStyle = {
				content: '确定',
				style: {
					backgroundColor: '#29ABE2',
					color: '#fff'
				}
			};
			this.cancelStyle = {
				content: '删除',
				style: {
					backgroundColor: '#982c2c',
					color: '#fff'
				}
			};
		}
	},
	methods: {
		shufflingPicWin: function(res) {
			let item = this.detial;
			item.types = this.types;
			item.image = this.image;
			if (item.image == '' && res == 'ok') {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '请添加图片'
				});
				return false;
			}
			this.$emit('shufflingPicWin', res, item);
		},
		changeNum: function(e) {
			this.num = e;
			this.detial.sort = e;
		},
		async fileNameChange() {
			let res = await http.uploadImg({
				formId: 'imageUpForm',
				data: {
					type: 8,
					shopId: this.shopId
				}
			});
			this.image = res;
		}
	}
};
</script>
<style type="text/css" scoped>
.pic-list {
	width: 100%;
	overflow: hidden;
	list-style: none;
}

.pic-list li {
	width: 300px;
	height: 200px;
	float: left;
	margin: 10px;
	border: 1px solid #ccc;
	box-sizing: border-box;
}

.pic-list .add-pic {
	position: relative;
	background: url('../../res/images/busis.png');
}

.pic-list li.li-pic {
	position: relative;
	padding: 0;
}

li.li-pic img {
	width: 100%;
	height: 100%;
	position: absolute;
}

li.li-pic p {
	width: 298px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	padding: 0;
	border: 0;
	margin: 0;
	background: rgba(0, 0, 0, 0.5);
	position: absolute;
	bottom: 0;
}

.picLift {
	display: none;
	width: 570px;
	height: 100%;
	background: #f2f2f2;
	position: absolute;
	right: 0;
	top: 0;
}

.picLift .newC {
	width: 100%;
	height: 50px;
	padding: 5px 10px;
	color: #343434;
	font-size: 18px;
	line-height: 40px;
	background: #e6e6e6;
}

.picLift .newC .closeBtn {
	width: 16px;
	height: 16px;
	background: url(../../res/images/close.png) no-repeat;
	float: right;
	margin: 12px;
}

.picCon {
	width: 100%;
	height: 350px;
	background: #f2f2f2;
	margin: 0;
	padding-top: 20px;
	padding-left: 10px;
}

.picCon .picName {
	width: 100%;
	height: 40px;
	padding: 10px;
}

.picCon .sortword {
	margin-top: 10px;
	margin-right: 25px;
	font-size: 16px;
}

.picName input {
	width: 60%;
	height: 30px;
	line-height: 25px;
	padding: 5px;
	border: none;
	margin-left: 5px;
}

.picCon .picImg {
	width: 100%;
	height: 40px;
	margin: 20px 10px;
}

p {
	width: 97%;
	height: 30px;
	text-align: center;
	line-height: 30px;
	color: #898989;
}

.imgBox {
	width: 300px;
	height: 200px;
	margin: 10px auto;
	position: relative;
}

.imgBox img {
	padding: 0;
	margin: 0;
	border: 0;
	width: 300px;
	height: 200px;
}
.pic-list h2 {
	position: absolute;
	top: 10px;
	right: 20px;
	z-index: 2;
}
.selectbtns span {
	background-color: #fff;
}
.selectbtns span:hover {
	background-color: #fff;
}
.icon-i {
	display: inline-block;
	vertical-align: middle;
	margin-right: 5px;
}
.sort {
	width: 250px;
	margin: 10px auto;
}
.addTo {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 50px;
	background: rgba(0, 0, 0, 0.4);
	text-align: center;
	cursor: pointer;
}
.addTo span {
	display: inline-block;
	height: 50px;
	line-height: 50px;
	font-size: 16px;
	color: white;
	padding-left: 30px;
	background: url('../../res/images/add.png') no-repeat 0;
}
.title span {
	display: inline-block;
	width: 100px;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 1px solid #f8931f;
	margin-left: 10px;
	cursor: pointer;
}
.select {
	background: #f8931f;
	color: #fff;
}
</style>