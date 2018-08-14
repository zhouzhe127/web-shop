<!--
	**店铺配置——轮播图
	* 
	* 孔伟研
	* *
	* 
-->
<template>
	<!-- 轮播图列表 -->
	<section style="text-align:left; " id="picList">
		<section class="title">
			<span v-if="ischain=='3'" class="select">闪店卖手</span>
			<span v-else v-for="(item,index) in list" :key="index" @click="channel(item.slideshow, item.id)" :class="{select: item.id == type}">{{item.name}}</span>
		</section>
		<ul class="pic-list">
			<li class="add-pic" v-on:click="add">
				<div class="addTo">
					<input style="position:absolute;left:0px; top:0px;height: 50px; opacity:0;width: 100%;cursor: pointer;">
					<span class="blue" style="width: 100px; height: 50px; line-height: 50px;">编辑图片</span>
				</div>
			</li>
			<li class="li-pic" v-for="(blist,index) in bannerList" :key="index" v-on:click="edit(index,blist)">
				<img v-if="blist.image != ''" :src="imgHost + blist.image" class="cname" />
				<img v-if="blist.image == ''" src="../../res/food/test.jpg" width="300" height="200" alt="商品" />
				<h2 style="font-size: 38px;color: #c0c0c0;">{{index+1}}</h2>
			</li>

		</ul>
		<component v-if="showWin" :is="ass" @shufflingPicWin="getResult" :index='index' :detial='detial' :types="types" :type='type'></component>
	</section>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import shufflingPicWin from './shuffling_pic_win';
export default {
	data() {
		return {
			shopId: null, //店铺id
			imgHost: '', //+图片前缀
			ischain: null,
			bannerList: [], //轮播图片列表
			list: '', //所有轮播图列表数据
			type: '', //渠道id
			showWin: false, //默认弹框关闭
			detial: {}, //轮播图详情
			index: 0, //点击轮播图的下标
			types: '' //添加或修改
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.ischain = userData.currentShop.ischain;
		this.imgHost = userData.uploadUrl;
		this.inte();
	},
	components: {
		shufflingPicWin
	},
	methods: {
		//接收弹窗传递的内容数据
		getResult: function(res, item) {
			if (res == 'ok') {
				if (item.types == 'add') {
					let detial = {
						shopId: this.shopId,
						image: item.image,
						sort: item.sort,
						type: item.type
					};
					this.addPic(detial);
				} else if (item.types == 'edit') {
					let detial = {
						shopId: this.shopId,
						id: item.id,
						image: item.image,
						sort: item.sort,
						type: item.type
					};
					this.editPic(detial);
					this.bannerList.splice(this.index, 1, detial);
				}
				this.showWin = false;
			} else if (res == 'cancel' && item.types !== 'add') {
				let detial = {
					shopId: this.shopId,
					id: item.id,
					type: item.type
				};

				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: '确定删除该轮播图?',
					callback: delRes => {
						if (delRes == 'ok') {
							this.delSlideShow(detial);
							this.bannerList.splice(this.index, 1);
							this.showWin = false;
						}
					}
				});
				// this.showWin = false;
			} else {
				this.showWin = false;
			}
		},
		//渠道切换
		channel: function(list, id) {
			this.bannerList = list;
			this.type = id;
			// ImagLoadCtr.refresh();
		},
		//添加轮播图
		async addPic(detial) {
			let add = await http.addSlideShow({ data: detial });
			if (add) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '保存成功'
				});
			}
			//添加完后重新执行请求轮播图接口
			this.inte();
		},
		//修改轮播图
		async editPic(detial) {
			let edit = await http.updateSlideShow({ data: detial });
			if (edit) {
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '保存成功'
				});
			}
		},
		//初始化，请求轮播图列表
		async inte() {
			let data = await http.selSlideShow({
				data: { shopId: this.shopId }
			});
			let picArr = data.slideImage;
			if (this.type === '') {
				this.bannerList = picArr[0].slideshow;
				this.type = picArr[0].id;
			} else {
				for (let i = 0; i < picArr.length; i++) {
					if (this.type == picArr[i].id) {
						this.bannerList = picArr[i].slideshow;
					}
				}
			}
			this.list = picArr;
			if (this.ischain == '3') {
				this.channel(this.list[3].slideshow, this.list[3].id);
			}
		},
		async delSlideShow(detial) {
			await http.delSlideShow({ data: detial });
		},
		//新建轮播图
		add: function() {
			this.types = 'add';
			this.showWin = true;
			this.detial = { image: '', sort: '1', type: this.type };
			this.ass = 'shufflingPicWin';
			// openWin(true);
		},
		//修改轮播图
		edit: function(i, detial) {
			this.types = 'edit';
			this.ass = 'shufflingPicWin';
			this.index = i;
			this.detial = detial;
			this.showWin = true;
		},
		//修改图片
		imageUpload: function(imgJson) {
			if (imgJson) {
				this.good.imageName = imgJson.imageName;
			}
		}
	}
};
</script>
<style type="text/css" scoped>
.pic-list {
	width: 100%;
	overflow: hidden;
	list-style: none;
	margin-top: 10px;
}

.pic-list li {
	width: 300px;
	height: 200px;
	float: left;
	margin-right: 10px;
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
	margin-right: 10px;
	cursor: pointer;
}
.select {
	background: #f8931f;
	color: #fff;
}
</style>