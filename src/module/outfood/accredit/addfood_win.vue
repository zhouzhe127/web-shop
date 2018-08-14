<template>
	<div>
		<win :width="width" :height="height" @winEvent="winEvent" :align="'right'">
			<span slot="title">{{title}}</span>
			<div id="tan" slot="content" slot-scope="props" style="height:100%">
				<div id="addGoods">
					<div class="lidput">
						<p class="required">商品名称</p>
						<div class="fillout">
							<label><input type="text" class="input" maxlength="30" v-model="packageName" style="width: 200px;height:40px; " placeholder="输入名称"></label>
						</div>
					</div>
					<div class="lidput">
						<p class="required">商品价格</p>
						<div class="fillout">
							<label><input type="text" class="input" maxlength="20" v-model="packagePice" style="width: 200px;height:40px; " placeholder="输入价格0~500"></label>
						</div>
					</div>
					<div class="lidput">
						<p class="required">商品分类</p>
						<div class="fillout">
							<a href="javascript:void(0);" @click="addClassify(classifyname)" class="addclassify" style="width:210px;">选择分类</a>
						</div>
						<h1 class="bomTxt">已添加分类：{{classifyname}}</h1>
					</div>
					<div class="lidput">
						<p class="required">餐盒数量</p>
						<div class="fillout">
							<label><input type="text" class="input" maxlength="20" v-model="mealboxNum" style="width: 200px;height:40px; " placeholder="请输入数量0~100"></label>
						</div>
					</div>
					<div class="lidput">
						<p class="required">餐盒价格</p>
						<div class="fillout">
							<label><input type="text" class="input" maxlength="20" v-model="mealUnit" style="width: 200px;height:40px; " placeholder="请输入价格0~100"></label>
						</div>
					</div>
					<div class="lidput">
						<p class="required">最小购买数量</p>
						<div class="fillout">
							<label><input type="text" class="input" maxlength="20" v-model="minBuy" style="width: 200px;height:40px; " placeholder="请输入最小购买数量0~50"></label>
						</div>
					</div>
					<div class="lidput">
						<p style="vertical-align: top;">商品描述</p>
						<div class="fillout">
							<textarea maxlength="200" class="describe" v-model="description" style="width:300px; height:98px; font-size:14px;" placeholder="输入描述"></textarea>
						</div>
						<div class="put-icon">
							<i></i>
							<span style="color: #999999;font-size: 16px;">限200字以内</span>
						</div>
					</div>
					<div class="lidput">
						<p :class="{'required': checkAdd!=2} ">门店商品关联</p>
						<div class="fillout" v-if="checkAdd!=2">
							<a href="javascript:void(0);" class="addclassify" style="width:210px;" @click="releGoods">添加关联商品</a>
						</div>
						<h1 :class="{bomTxt: checkAdd!=2,textrel:checkAdd==2}">
							<span v-if="checkAdd!=2">已关联商品：</span>{{releSel.goodsName||releSel.packageName}}</h1>
					</div>
					<div class="imgbox">
						<div id="upfilediv" class="upfilediv">
							<img v-if="imgsrc != ''" id="mimgs" :src="imgsrc" width="225" height="150">
							<img v-else id="mimgs" src="../../../res/food/test.jpg" width="225" height="150">
							<a>编辑图片(500k以内)</a>
							<form method="post" id="uploadImageForm" enctype="multipart/form-data">
								<input type="file" accept="image/jpeg,image/jpg" @change="imgUpload" id="fileInput" name="image" style="position:absolute;bottom: 0;height: 40px;width: 225px;opacity: 0;cursor: pointer;" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</win>
		<packlist ref="packwin" v-if="packWin.winshow" :width="packWin.width" :addClassify="packWin.addClassify" :height="packWin.height" :title="packWin.title" @packwinEvent="packwin"></packlist>
		<relationWin ref="relationwin" v-if="relationWin.winshow" :width="relationWin.width" :changeConfig="relationWin.changeConfig" :seloneAir="relationWin.seloneAir" :seltwoAir="relationWin.seltwoAir" :height="relationWin.height" :title="relationWin.title" @relationEvent="relationevn"></relationWin>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
const userData = storage.session('userShop');
const imgHost = userData.uploadUrl;
const packlist = storage.session('packageList'); //所有套餐
const goodList = storage.session('goodList');
if (goodList) {
	for (let i = 0; i < goodList.length; i++) {
		//过滤掉称重商品下架商品
		if (
			goodList[i].type == 1 ||
			goodList[i].type == 2 ||
			goodList[i].status == 2 ||
			goodList[i].isGroup == 1
		) {
			goodList.splice(i, 1);
			i--;
		}
	}
}
export default {
	data() {
		return {
			packageName: '', //商品名称
			packagePice: '', //商品价格
			mealboxNum: '', //餐盒数量
			mealUnit: '', //餐盒价格
			minBuy: '', //最小购买数量
			description: '', //商品描述
			imgsrc: '',
			imgHost: imgHost,
			classifyname: '', //添加分类名
			releSel: '', //选择关联商品
			imgupData: '', //上传后台路径
			checkAdd: this.type, //弹窗状态
			packWin: {
				width: 800,
				height: 500,
				title: '添加商品',
				winshow: false,
				addClassify: ''
			},
			relationWin: {
				width: 1000,
				height: 500,
				title: '关联商品',
				winshow: false,
				addClassify: '',
				seloneAir: {},
				seltwoAir: {},
				changeConfig: 3
			}
		};
	},
	props: ['width', 'height', 'title', 'goodsList', 'type', 'item'],
	mounted() {
		console.log(this.type);
		if (this.type == 2) this.init();
	},
	methods: {
		async init() {
			let res = await http.queryListByEdishCodes({
				data: {
					eDishCodes: /^(0)/.test(this.item.eDishSkuCode)
						? this.item.eDishSkuCode.substr( 1, this.item.eDishSkuCode.length - 1 )
						: this.item.eDishSkuCode
				}
			});
			let obj = {};
			let data = res.list[0];
			this.packageName = data.dishName;
			this.packagePice = data.price;
			this.mealboxNum = data.boxNum;
			this.mealUnit = data.boxPrice;
			this.minBuy = data.minOrderCount;
			this.description = data.description;
			this.classifyname = data.categoryName;
			this.imgsrc = data.picture;
			obj.id = this.item.eDishSkuCode;
			obj.goodsName = this.getGoodsName(obj.id);
			this.releSel = obj;
		},
		addClassify: function(addClassify) {
			this.packWin.addClassify = addClassify;
			this.packWin.winshow = true;
		},
		releGoods: function() {
			this.relationWin.winshow = true;
		},
		async imgUpload(e) {
			if (
				e.target.files[0].type != 'image/jpg' &&
				e.target.files[0].type != 'image/jpeg'
			) {
				this.alert('提示', '只允许上传jpg格式图片');
				return false;
			}
			for (let i = 0; i < e.target.files.length; i++) {
				let reader = new FileReader();
				reader.readAsDataURL(e.target.files[i]);
				reader.onload = e => {
					if (e.total > 500000) {
						this.alert('错误提示', '图片大小必须小于500K');
					} else {
						this.imgsrc = e.currentTarget.result;
					}
				};
			}
			let data = await http.bigImgUpload({
				data: {
					type: 8,
					shopId: userData.currentShop.id
				},
				formId: 'uploadImageForm'
			});
			this.imgupData = imgHost + data;
			//   sd.originType = "shop";
			//   // 图片上传
			//   sd.ajax.send(
			//     "image/uploadImg",
			//     "uploadImageForm",
			//     false,
			//     function(json) {
			//       console.log(json);
			//       if (json.error) {
			//         alert(json.error.code + "错误", json.error.message);
			//       } else {
			//         addGoodsWin.imgupData = imgHost + json.data;
			//       }
			//     },
			//     function(json) {
			//       alert("错误提示", "图片上传失败");
			//     },
			//     "post",
			//     false,
			//     { type: 1 }
			//   );
		},
		packwin(str) {
			this.packWin.winshow = false;
			if (str == 'ok') {
				this.packClose();
			}
		},
		packClose() {
			this.classifyname = this.$refs.packwin.selected.categoryName;
		},
		relationevn(str) {
			this.relationWin.winshow = false;
			if (str == 'ok') {
				this.relationClose();
			}
		},
		relationClose() {
			if (this.$refs.relationwin.selected == '') {
				this.alert('提示', '请关联商品');
				this.relationWin.winshow = true;
				return false;
			}
			let checkRel = false;
			// let relMust = true;
			// let changeGoods = null;
			for (let i = 0; i < this.goodsList.length; i++) {
				for (let j = 0; j < this.goodsList[i].list.length; j++) {
					if (
						this.goodsList[i].list[j].eDishSkuCode ==
						this.$refs.relationwin.selected.id
					) {
						// changeGoods = this.goodsList[i].list[j];
						checkRel = true;
						break;
					}
				}
			}

			if (checkRel) {
				this.alert('提示', '该商品已经被关联请重新关联');
				this.relationWin.winshow = true;
				return false;
			}

			this.$refs.relationwin.selected.isPackage = this.$refs.relationwin
				.isPackage
				? 1
				: 0;
			this.releSel = this.$refs.relationwin.selected;
		},
		winEvent(str) {
			this.$emit('winEvent', str);
		},
		alert(title, con) {
			this.$store.commit('setWin', {
				title: title,
				content: con
			});
		},
		//通过菜品id获取菜品名字
		getGoodsName: function(id) {
			let res = /^(0)/;
			if (!res.test(id)) {
				for (let i = 0; i < goodList.length; i++) {
					if (id == goodList[i].id) {
						return goodList[i].goodsName;
					}
				}
			} else {
				id = id.substr(1, id.length - 1);
				for (let i = 0; i < packlist.length; i++) {
					if (id == packlist[i].id) {
						return packlist[i].packageName;
					}
				}
			}
			return false;
		}
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win'),
		packlist: () =>
			import(/*webpackChunkName: "packlist_win"*/ 'src/module/outfood/accredit/packlist_win'),
		relationWin: () =>
			import(/*webpackChunkName: "relation_win"*/ 'src/module/outfood/accredit/relation_win')
	}
};
</script>
<style lang="less" scoped>
#addGoods {
	width: 100%;
	height: 100%;
	background-color: #f2f2f2;
	padding-top: 20px;
	position: relative;
}
.lidput {
	margin-top: 15px;
}
.lidput p {
	width: 120px;
	text-align: right;
	display: inline-block;
	font-size: 16px;
	vertical-align: baseline;
}
.lidput .fillout {
	display: inline-block;
	margin-left: 10px;
}
.lidput .bomTxt {
	max-width: 70%;
	margin-left: 135px;
	margin-top: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.textrel {
	display: inline-block;
	text-align: left;
	margin-left: 10px;
	max-width: 70%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #ff9801;
	vertical-align: middle;
}
.lidput .put-icon {
	margin-left: 135px;
	margin-top: 5px;
}
.lidput .put-icon i {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../res/icon/prompt.png) center center no-repeat;
}
.imgbox {
	position: absolute;
	top: 35px;
	right: 20px;
}
.upfilediv {
	width: 225px;
	height: 150px;
	background: url(../../../res/images/upload.png) center 40px no-repeat #ddd;
	a {
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
}
</style>

