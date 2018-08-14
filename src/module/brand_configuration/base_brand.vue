<!--
    **品牌配置——品牌基本信息
    * 
    * 孔伟研
    * *
    * 
-->
<template>
	<section style="text-align:left;min-width:600px;" id="brandBase">
		<el-form :model="baseDetial" :rules="rules" ref="baseDetial" label-width="100px" class="demo-ruleForm">
			<el-form-item label="品牌名称" prop="brandName">
				<el-input v-model="baseDetial.brandName" style = "width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="行业分类" prop="industryIndex">
				<el-select v-model="industryIndex" placeholder="请选择行业分类">
					<el-option v-for="item in industryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="负责人" prop="contactMan" placeholder="请输入负责人">
				<el-input v-model="baseDetial.contactMan" style = "width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="联系方式" prop="telephone" placeholder="请输入联系方式">
				<el-input v-model="baseDetial.telephone"  maxlength="20" style = "width:300px;"></el-input>
			</el-form-item>
		</el-form>
		<div class="line" style="height:150px;">
			<section class="imgBox" style="">
				<span class="ltitle req" style="height:150px;margin-right: 20px;">品牌LOGO
					<!-- <span class="required"></span> -->
				</span>
				<form id="imageUpForm" enctype="multipart/form-data">
					<input class="imgInput" type="file" accept="image/jpeg,image/png,image/image/tiff" id="file_upload" name="image" @change='fileNameChange'>
				</form>
				<section v-if="baseDetial.logoImage ==''" class="imgsize" style="border:1px solid #C0C0C0;">
					<img src="../../res/images/comadd.png" style="width:47px;height:47px;margin-left: 50px;margin-top: 25px;">
					<section class="imgBottom">添加品牌LOGO</section>
				</section>
				<section v-if="baseDetial.logoImage != ''" class="imgsize">
					<img id="imgs" :src="imgHost + baseDetial.logoImage" style="width:100%;height:100%;">
					<section class="imgBottom">更改LOGO</section>
				</section>
			</section>
			<section class="imgBox">
				<span class="ltitle" style="height:150px;margin-right: 20px;width:100px;">商标</span>
				<form id="imageUpForm2" enctype="multipart/form-data">
					<input class="imgInput" type="file" accept="image/jpeg,image/png,image/image/tiff" id="file_upload2" name="image" @change='fileNameChange2'>
				</form>
				<section v-if="baseDetial.license ==''" class="imgsize" style="border:1px solid #C0C0C0;">
					<img src="../../res/images/comadd.png" style="width:47px;height:47px;margin-left: 50px;margin-top: 25px;">
					<section class="imgBottom">添加商标</section>
				</section>
				<section v-if="baseDetial.license != ''" class="imgsize">
					<img id="imgs" :src="imgHost + baseDetial.license" style="width:100%;height:100%;">
					<section class="imgBottom">更改商标</section>
				</section>
			</section>
		</div>
		<div class="line" style="height:auto;">
			<div class="ltitle">门店排序:</div>
			<section class="oCont">
				<div class="Box">
					<el-radio-group v-model="status" @change = "getOidList">
						<el-radio-button label="0">直营店</el-radio-button>
						<el-radio-button label="1">加盟店</el-radio-button>
					</el-radio-group>
					<section class="oDe" style="width:200px;float:right;">
						<el-input placeholder="请输入店铺名称" @change="secShop" v-model="inSe" clearable class="input-with-select" >
							<el-button slot="append" icon="el-icon-search" @click="secShop"></el-button>
						</el-input>
					</section>
				</div>
				<div class="oBox" style="">
					<el-table :data="shopList" align="center" :sort-by="'sort'" :header-cell-style = "{'background-color':'#f5f7fa'}">
						<el-table-column prop="sort" stripe label="序号" width="80" align="center"></el-table-column> 
						<el-table-column show-overflow-tooltip prop="name" label="店铺名" align="center"></el-table-column>
						<el-table-column prop="" label="置顶" align="center">
							<template slot-scope="scope">
								<span @click="tackUp(scope.row,scope.$index)" class="fi fi-arrow-up-end oSpan"></span>
							</template>
						</el-table-column>
						<el-table-column prop="" label="上移" align="center">
							<template slot-scope="scope">
								<span @click="tackUpOne(scope.row,scope.$index)" class="fi fi-arrow-up oSpan"></span>
							</template>
						</el-table-column>
						<el-table-column prop="" label="下移" align="center">
							<template slot-scope="scope">
								<span @click="tackDownOne(scope.row,scope.$index)" class="fi fi-arrow-down oSpan"></span>
							</template>
						</el-table-column>
						<el-table-column prop="" label="置底" align="center">
							<template slot-scope="scope">
								<span @click="tackDown(scope.row,scope.$index)" class="fi fi-arrow-down-end oSpan"></span>
							</template>
						</el-table-column>
						<el-table-column prop="" label="切换门店" align="center">
							<template slot-scope="scope">
								<i @click="changeShop(scope.row,scope.$index)" class="el-icon-sort" style="font-size:20px;transform: rotate(90deg);font-weight: bold;"></i>
								<!-- <span @click="changeShop(scope.row,scope.$index)" class="el-icon-sort">切换门店</span> -->
							</template>
						</el-table-column>
					</el-table>
				</div>
			</section>
		</div>
		<div style="width:300px;padding-left: 50px;">
			<el-button @click="send" type="primary" style="width:150px;">修改店铺信息</el-button>
		</div>
	</section>
</template>
<script>
	import http from 'src/manager/http';
	import storage from 'src/verdor/storage';
	// import lazyLoad from 'src/verdor/lazyload';
	// import global from 'src/manager/global';
	// import uploadfile from 'src/verdor/uploadfile';
	import utils from 'src/verdor/utils';
	export default {
		data() {
			return {
				rules: {
					brandName: [
						{ required: true, message: '请输入品牌名称', trigger: 'blur' },
						{ min: 3, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
					],
					industry: [
						{ required: true, message: '请选择行业分类', trigger: 'blur' }
					],
					contactMan: [
						{ required: true, message: '请输入负责人', trigger: 'blur' },
						{ min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
					],
					telephone: [
						{ required: true, message: '请输入联系方式', trigger: 'blur' },
						{ min: 7, max: 20, message: '长度在 7 到 20 个字符' }
					],
				},
				baseDetial: {}, //获取的店铺基本信息
				imgHost: '', //+图片前缀
				logoImage: '',
				userData: null,
				status: 0,
				shopListDel: {}, //总的店铺列表信息
				brandIndex: -1, //所处品牌在所有品牌的下标
				shopList: [], //要显示的店铺列表
				industryList: [], //行业分列表
				// industryName: '行业分类', //行业分类名
				industryIndex: '1', //行业分类下标
				shopId: '',
				inSe:'',//搜索店铺名
				oldShopList:[],//总的店铺列表，搜索用
				// logoName:this.$store.state,
			};
		},
		mounted() {
			this.userData = storage.session('userShop');
			this.shopId = this.userData.currentShop.id;
			let brandList = this.userData.shopList.brand;
			for (let i = 0; i < brandList.length; i++) {
				if (this.shopId == brandList[i].id) {
					this.shopListDel = brandList[i];
					this.brandIndex = i;
				}
			}
			this.shopList = this.shopListDel.direct;
			this.shopList = utils.sortByAll(this.shopList, 'sort');
			this.oldShopList = this.shopListDel.direct;
			this.oldShopList = utils.sortByAll(this.oldShopList, 'sort');
			this.imgHost = this.userData.uploadUrl;
			this.comShopIndex();
			this.baseGet();
		},
		components: {
			selectBtn: () =>
				import ( /*webpackChunkName: 'select_btn'*/ 'src/components/select_btn'),
		},
		methods: {
			//直营店加盟店切换
			getOidList() {
				// this.status = type;
				this.inSe = '';//将搜索框置为空；
				this.shopList = this.status == 0 ? this.shopListDel.direct : this.shopListDel.franchise;
				this.oldShopList = this.status == 0 ? this.shopListDel.direct : this.shopListDel.franchise;
				// this.shopList = utils.sortByAll(this.shopList, 'sort');
				this.comShopIndex();
			},
			//行业分类选择
			// getDrop(arr) {
			// 	this.industryIndex = arr;
			// 	// this.industryName = this.industryList[arr].name;
			// },
			//搜索店铺
			secShop(){
				console.log(this.inSe);
				let arr = [];
				for(let i=0;i<this.oldShopList.length;i++){
					if(this.oldShopList[i].name.indexOf(this.inSe)==-1){
						continue;
					}
					arr.push(this.oldShopList[i]);
				}
				this.shopList = arr;
			},
			//对店铺进行排序--序号显示
			comShopIndex(){
				for(let i=0;i<this.shopList.length;i++){
					this.shopList[i].sort = i+1;
				}
			},
			//这条排第一
			tackUp(item, index) {
				if (index == 0) return;
				this.shopList.splice(index, 1);
				this.shopList.unshift(item);
				this.comShopIndex();
				// var isAbc = false;//作为所点击的选项的分界点
				// for(var i=0;i<this.shopList.length;i++){
				//     if(item.id ==this.shopList[i].id){
				//         isAbc = true;
				//     }
				//     if(!isAbc){
				//         this.shopList[i].sort = this.shopList[i].sort+1;
				//     }
				// }
				// item.sort = 0;
				// // this.shopList.splice(index-1,1,item)
				// this.shopList = utils.sortByAll(this.shopList,'sort');
			},
			//这条排序向上一级
			tackUpOne(item, index) {
				if (index == 0) return;
				this.shopList.splice(index, 1);
				this.shopList.splice(index - 1, 1, item, this.shopList[index - 1]);
				this.comShopIndex();
				// item.sort = item.sort-1;
				// this.shopList[index-1].sort = this.shopList[index-1].sort+1;
				// this.shopList = utils.sortByAll(this.shopList,'sort');
			},
			//这条排最后
			tackDown(item, index) {
				if (index == this.shopList.length - 1) return;
				this.shopList.splice(index, 1);
				this.shopList.push(item);
				this.comShopIndex();
			},
			//这条排序向下一级
			tackDownOne(item, index) {
				if (index == this.shopList.length - 1) return;
				this.shopList.splice(index, 1, this.shopList[index + 1], item);
				this.shopList.splice(index + 2, 1, );
				this.comShopIndex();
				// item.sort = item.sort+1;
				// this.shopList[index+1].sort = this.shopList[index+1].sort-1;
				// this.shopList = utils.sortByAll(this.shopList,'sort');
			},
			//转换门店
			changeShop(item,index){
				let isJoin = item.ischain == '1'? '加盟店':'直营店';
				// +'，成功后需确认修改店铺信息或者退出重新登录方可查看转换效果'
				let title = '确认是否将 "'+item.name +'" 转换为' +isJoin;
				this.$store.commit('setWin', {
					title: '操作提示',
					winType: 'confirm',
					content: title,
					callback: delRes => {
						if (delRes == 'ok') {
							//如果是直营店转化
							this.updateShopType(item);
							this.shopList.splice(index,1);
							if(item.ischain == '1'){
								item.ischain = '2';
								item.sort = this.shopListDel.franchise.length;
								this.shopListDel.franchise.push(item);
							}else{
								item.ischain = '1';
								item.sort = this.shopListDel.direct.length;
								this.shopListDel.direct.push(item);
							}
							this.comShopIndex();
							storage.session('userShop', this.userData);
						}
					}
				});
				// console.log(item);
				// console.log(index);
			},
			async updateShopType(item){
				let res = await http.updateShopType({
					data: {
						id:item.id,
						type:item.ischain=='1'?'2':'1'
					}
				});
				if(res){
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '切换成功'
					});
				}
			},
			async getindustryList() {
				this.industryList = await http.GetIndustry({
					data: {}
				});
			},
			//获取店铺基本信息
			async baseGet() {
				this.industryList = await http.GetIndustry({
					data: {}
				});
				this.baseDetial = await http.brandgetConfig({
					data: {}
				});
				// this.shopList = this.baseDetial.directSort;
				// this.shopList = utils.sortByAll(this.shopList,'sort');
				this.industryIndex = this.baseDetial.industry;
			},
			//修改店铺基本信息
			async baseUpdate() {
				const directSort = []; //传给后台的直营店列表信息
				const joinSort = []; //传给后台的加盟店列表信息
				for (let i = 0; i < this.shopListDel.direct.length; i++) {
					this.shopListDel.direct[i].sort = i + 1;
					if (this.shopListDel.direct[i].status == 0) { //过滤，只选择已开启的直营店铺
						let detial = {};
						detial.shopId = this.shopListDel.direct[i].id;
						detial.shopName = this.shopListDel.direct[i].name;
						detial.sort = this.shopListDel.direct[i].sort;
						directSort.push(detial);
					}
				}
				for (let i = 0; i < this.shopListDel.franchise.length; i++) {
					this.shopListDel.franchise[i].sort = i + 1;
					if (this.shopListDel.franchise[i].status == 0) { //过滤，只选择已开启的加盟店铺
						let detial = {};
						detial.shopId = this.shopListDel.franchise[i].id;
						detial.shopName = this.shopListDel.franchise[i].name;
						detial.sort = this.shopListDel.franchise[i].sort;
						joinSort.push(detial);
					}
				}
				let edit = await http.brandSetConfig({
					data: {
						industry: this.industryIndex,
						brandName: this.baseDetial.brandName,
						contactMan: this.baseDetial.contactMan,
						telephone: this.baseDetial.telephone,
						logoImage: this.baseDetial.logoImage,
						license: this.baseDetial.license, //商标
						directSort: directSort,
						joinSort: joinSort,
					}
				});
				// this.baseDetial=await http.brandgetConfig({data:{}});
				this.baseDetial.id = this.shopId; //获取详情里竟然没有店铺id
				if (edit) {
					// const logoName = this.$store.state.logoName;
					const shopName = this.baseDetial.brandName;
					// const brandList = this.userData.shopList.brand;
					//基本信息改变的内容赋值-缓存，
					this.shopListDel.name = this.baseDetial.brandName;
					this.shopListDel.contactMan = this.baseDetial.contactMan;
					this.shopListDel.logoImage = this.baseDetial.logoImage;
					this.shopListDel.telephone = this.baseDetial.telephone;
					this.shopListDel.industry = this.industryIndex;
					this.userData.shopList.brand.splice(this.brandIndex, 1, this.shopListDel);
					//改变右上角全局店铺信息
					this.userData.currentShop = this.baseDetial;
					this.userData.currentShop.name = shopName;
					this.userData.currentShop.newName = shopName;
					storage.session('userShop', this.userData);
					this.$store.commit('setlogoName', shopName);
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alert',
						content: '店铺信息修改成功',
					});
				}
			},

			//修改店铺信息
			send: function () {
				if (this.baseDetial.brandName == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: '品牌名称不能为空'
					});
					return false;
				}
				if (this.baseDetial.telephone == '') {
					this.$store.commit('setWin', {
						title: '错误提示',
						winType: 'alert',
						content: '联系方式不能为空'
					});
					return false;
				}
				// const that = this;
				this.baseUpdate();
			},
			//修改图片
			async fileNameChange(imgJson) {
				console.log(imgJson);
				let res = await http.uploadImg({
					formId: 'imageUpForm',
					data: {
						type: 8,
						shopId: this.shopId
					}
				});
				this.baseDetial.logoImage = res;
			},
			//修改图片
			async fileNameChange2(imgJson) {
				console.log(imgJson);
				let res = await http.uploadImg({
					formId: 'imageUpForm2',
					data: {
						type: 8,
						shopId: this.shopId
					}
				});
				this.baseDetial.license = res;
			}
		}
	};
</script>


<style type="text/css" lang="less" scoped>
	#brandBase .oCont {
		padding-left: 100px;
		width: 100%;
	}

	#brandBase .oCont .oBox {
		min-height: 240px;
		max-height: 500px;
		width: 100%;
		min-width: 500px;
		border: 1px solid #ccc;
		height: auto;
		overflow: auto;
		margin-top: 20px;
	}

	#brandBase .oCont .Box {
		/* width: 360px; */
		height: 42px;
		cursor: pointer;
		box-sizing: border-box;
	}
	#brandBase .oCont .oDe {
		width: 110px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		float: left;
		box-sizing: border-box;
		color: #000000;
		margin-right: 10px;
		background-color: #f2f2f2;
		border-radius: 5px;
	}

	// #brandBase .oCont .Box .act {
	// 	background-color: #28a8e0;
	// 	color: #fff;
	// }

	// #brandBase .oCont .oUl {
	// 	background-color: rgb(255, 255, 255);
	// 	box-sizing: border-box;
	// 	width: 100%;
	// 	border-bottom: 3px solid #f0f0f0;
	// 	overflow: hidden;
	// }

	// #brandBase .oCont .oUl .oLi {
	// 	float: left;
	// 	width: 20%;
	// 	height: 47px;
	// 	color: #959595;
	// 	text-align: center;
	// 	line-height: 47px;
	// 	overflow: hidden;
	// 	white-space: nowrap;
	// 	text-overflow: ellipsis;
	// }

	#brandBase .line .imgBox {
		float: left;
		width: 290px;
		position: relative;
	}

	#brandBase .line .imgBox .imgBottom {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 18px;
		color: #D6D6D6;
		position: absolute;
		bottom: 0px;
		background: rgba(0, 0, 0, .5);
	}

	#brandBase .line .imgBox .imgInput {
		width: 150px;
		height: 150px;
		position: absolute;
		z-index: 5;
		opacity: 0;
		cursor: pointer;
		right: 0;
	}

	#brandBase .line .imgBox .imgsize {
		width: 150px;
		height: 150px;
		position: absolute;
		left: 140px;
		z-index: 0;
	}

	#brandBase .line {
		display: block;
		width: 100%;
		height: 40px;
		line-height: 40px;
		margin: 10px 0;
	}

	/* #brandBase .line label {
		float: left;
		margin-left: 20px;
	} */

	#brandBase .ltitle {
		width: 90px;
		line-height: 40px;
		text-align: right;
		float: left;
		box-sizing: border-box;
		font-size: 14px;
		color: #606266;
	}
	#brandBase .req::before {
		position: relative;
		top: 0;
		right: 2px;
		content: "*";
		color: #b98d6b;
	}

	#brandBase input.mes {
		width: 300px;
		border: 1px solid #ccc;
		box-sizing: border-box;
		resize: none;
	}

	#brandBase textarea {
		outline: none;
		width: 300px;
		height: 150px;
		box-sizing: border-box;
		border: 1px solid #ccc;
		resize: none;
	}

	.circle {
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
		border: 1px #c7c7c7 solid;
		background: #fff;
		margin-right: 5px;
	}
	.search{
		background-color: rgb(41, 167, 225);
		display: inline-block;
		width: 40px;
		height: 40px;
		cursor: pointer;
		/* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAGXRFW…jxTYxgX/pKxeHbVvzfUGtwKUJ/BZcq9EewdFBxy8fHlwADAMK7/x/UqqS7AAAAAElFTkSuQmCC) center center no-repeat; */
	}
	.circle.active {
		background: url(../../res/icon/selected.png) center center no-repeat, #28A8E0;
	}
	.oSpan{font-size: 20px;color: #959595;}

</style>