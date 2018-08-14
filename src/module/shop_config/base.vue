/**
 * @Author: 孔伟研 
 * @Date: 2018-03-28 15:43:31 
 * @Last Modified by: 孔伟研
 * @Last Modified time: 2018-08-03 16:49:24
 * @Module:基本信息**/

<template>
	<section style="text-align:left;width:900px;min-height:1280px;" id="bstime">

		<div class="line">
			<span class="ltitle" style="">店铺名称
				<span class="required"></span>
			</span>
			<label><input type="text" class="input mes" v-model="baseDetial.shopName" maxlength="20" placeholder="请输入店铺名称"></label>
		</div>
		<div class="line">
			<span class="ltitle" style="">店铺编号</span>
			<label v-if="baseDetial.shopNumber !== '' && baseDetial.shopNumber">
				{{shopNumber}}
			</label>
			<label v-else>
				<input type="text" class="input mes" v-model="shopNumber" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="4" placeholder="请输入店铺编号（必须为4位数）">
				<span style="margin-left: 10px;color: #EA3B44;"><img src="../../res/icon/warning.png" style="width: 20px;height: 20px;margin-right: 5px;vertical-align: middle;" />店铺编号一旦提交，不可修改！</span>
			</label>
		</div>
		<div class="line">
			<span class="ltitle" style="">店铺类型</span>
			<label>{{baseDetial.industry==0?'餐饮':'零售'}}</label>
		</div>
		<div class="line" style="position: relative;height:150px;">
			<span class="ltitle" style="height:150px;">店铺LOGO</span>
			<form id="imageUpForm" enctype="multipart/form-data">
				<input type="file" accept="image/jpeg,image/png,image/image/tiff" id="file_upload" name="image" @change='fileNameChange' style="width:150px;height:150px;position: absolute;z-index: 5;opacity: 0;cursor: pointer;">
			</form>
			<section style="width:150px;height:150px;border:1px solid #C0C0C0;position: absolute;left: 140px;z-index: 0;">
				<img src="../../res/images/comadd.png" style="width:47px;height:47px;margin-left: 50px;margin-top: 25px;">
				<section v-if="baseDetial.logoImage ==''" style="width:100%;height:60px;line-height: 60px;text-align: center;font-size: 18px;color: #D6D6D6;">添加店铺LOGO</section>
				<section v-else style="width:100%;height:60px;line-height: 60px;text-align: center;font-size: 18px;color: #D6D6D6;">更改店铺LOGO</section>
			</section>
			<section style="width:150px;height:150px;position: absolute;left: 290px;z-index: 0;">
				<img v-if="baseDetial.logoImage != ''" id="imgs" :src="imgHost + baseDetial.logoImage" style="width:100%;height:100%;">
			</section>
		</div>
		<div class="line" style="position: relative;height:150px;">
			<span class="ltitle" style="height:150px;">卫生许可证</span>
			<form id="imageUpForm2" enctype="multipart/form-data">
				<input type="file" accept="image/jpeg,image/png,image/image/tiff" id="file_upload" name="image" @change='fileNameChange2' style="width:150px;height:150px;position: absolute;z-index: 5;opacity: 0;cursor: pointer;">
			</form>
			<section style="width:150px;height:150px;border:1px solid #C0C0C0;position: absolute;left: 140px;z-index: 0;">
				<img src="../../res/images/comadd.png" style="width:47px;height:47px;margin-left: 50px;margin-top: 25px;">
				<section v-if="!baseDetial.healthLicense || baseDetial.healthLicense ==''" style="width:100%;height:60px;line-height: 60px;text-align: center;font-size: 18px;color: #D6D6D6;">添加卫生许可证</section>
				<section v-else style="width:100%;height:60px;line-height: 60px;text-align: center;font-size: 18px;color: #D6D6D6;">更改卫生许可证</section>
			</section>
			<section style="width:150px;height:150px;position: absolute;left: 290px;z-index: 0;">
				<img v-if="baseDetial.healthLicense != ''" id="imgs" :src="imgHost + baseDetial.healthLicense" style="width:100%;height:100%;">
			</section>
		</div>
		<div class="line">
			<span class="ltitle" style="">负责人</span>
			<label><input type="text" class="input mes" maxlength="15" v-model="baseDetial.contactMan" placeholder="请输入负责人"></label>
		</div>
		<div class="line">
			<span class="ltitle" style="">联系方式
				<span class="required"></span>
			</span>
			<label><input type="text" class="input mes" v-model="baseDetial.telephone" maxlength="20" placeholder="请输入手机号码"></label>
		</div>
		<div class="line">
			<span class="ltitle" style="">店铺地址
				<span class="required"></span>
			</span>
			<label><input type="text" class="input mes" maxlength="50" id="keywords" v-model="baseDetial.address" placeholder="请输店铺地址"></label>
			<a class="blue" style="width: 120px;height:40px;line-height:40px;margin-left:10px;" @click="seach(true)">搜索</a>
		</div>

		<div style="height:350px;width:900px;padding-left:135px;">
			<section id="mapBox" style="width:400px;height:350px;float:left;"></section>
			<section id="mapBoxDet" style="width:300px;height:350px;float:left;margin-left:20px;"></section>
		</div>
		<div class="line" style="padding-left:120px;">
			<span class="" style="">经度:</span>
			<span style="line-height:40px;padding-right:30px;">{{pointLng}}</span>
			<span class="" style="">纬度:</span>
			<span style="line-height:40px;padding-right:30px;">{{pointLat}}</span>
		</div>
		<div class="line" style="height:150px;">
			<span class="ltitle" style="">详细介绍</span>
			<label>
				<textarea type="text" class="input mes" maxlength="50" v-model="baseDetial.description" placeholder="请输入详细介绍"></textarea>
			</label>
		</div>
		<div class="line" style="clear: both;position: relative;">
			<span class="ltitle required" style="margin-right:20px;float:left;">营业时间</span>
			<div style="float:left;" v-if="loaded">
				<atime @timeChoose="getTime" :start="startslot" :end='endSlot'></atime>
			</div>
			<div style="position: absolute;left: 380px;top: 0px;">
				<div class="circle" v-bind:class="{ 'active': selnext}" @click="nextDay"></div>
				<span>隔天</span>
			</div>
		</div>
		<div style="width:300px;padding-left: 50px;">
			<a class="yellow fl" style="width: 290px;" @click="send">修改店铺信息</a>
		</div>
	</section>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
export default {
	data() {
		return {
			baseDetial: {}, //获取的店铺基本信息
			imgHost: '', //+图片前缀
			logoImage: '',
			startslot: {
				hour: '00',
				minute: '00'
			},
			endSlot: {
				hour: '23',
				minute: '59'
			},
			selnext: false, //是否选中隔天
			start: '',
			end: '',
			onoff: false, //是否开启授权码
			isShared: false, //电子菜单设备不被其他桌台共用
			shopNumber: '', //店铺编号
			loaded: false, //请求完详情再显示
			userData: null,
			pointLng: 116.404, //地图经度116.404;39.915
			pointLat: 39.915, //地图纬度
			optionW: 13 //地图缩放级别
		};
	},
	async mounted() {
		await global.getBaiduMapApi();

		this.userData = storage.session('userShop');
		this.shopId = this.userData.currentShop.id;
		this.imgHost = this.userData.uploadUrl;
		this.baseGet();
	},
	components: {
		onOff: () =>
			import(/* webpackChunkName:'radio_btn' */ 'src/components/on_off'),
		atime: () => import(/* webpackChunkName:'time' */ 'src/components/time')
	},
	methods: {
		/* eslint-disable */
		seach(type) {
			let that = this;
			let map = new AMap.Map('mapBox', {
				resizeEnable: true,
				zoom: 11,
				center: [that.pointLng, that.pointLat]
			});
			AMap.service(['AMap.PlaceSearch'], function() {
				let placeSearch = new AMap.PlaceSearch({
					//构造地点查询类
					pageSize: 5,
					pageIndex: 1,
					city: '010', //城市
					map: map,
					panel: 'mapBoxDet'
				});
				placeSearch.on('listElementClick', function(e) {
					that.pointLng = e.data.location.lng;
					that.pointLat = e.data.location.lat;
				});
				if (type) {
					//关键字查询
					let searchVal = that.baseDetial.address;
					placeSearch.search(searchVal);
				}
			});
			let geocoder; //实例化Geocoder
			let infoWindow; //信息弹出框
			let marker; // 实例化点标记
			AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function() {
				map.addControl(new AMap.ToolBar());
				map.addControl(new AMap.Scale());
				marker = new AMap.Marker({
					map: map,
					bubble: true
				});
			});
			AMap.service('AMap.Geocoder', function() {
				//回调函数
				//实例化Geocoder
				geocoder = new AMap.Geocoder({
					city: '全国' //城市，默认：“全国”
				});
			});
			let address; //点击地址
			let adcode; //邮政编码
			map.on('click', function(e) {
				console.log(e);
				that.pointLng = e.lnglat.lng; //地图经度116.404;39.915
				that.pointLat = e.lnglat.lat; //地图纬度
				// 填写地址
				let lnglatXY = [e.lnglat.lng, e.lnglat.lat];
				// 地址回调 获取地址
				geocoder.getAddress(lnglatXY, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						address = result.regeocode.formattedAddress; //返回地址描述
						adcode = result.regeocode.addressComponent.adcode; //返回邮政编码
						addMarker(lnglatXY); //当所选地址有效时执行
					}
				});
			});
			function addMarker(lnglatXY) {
				if (marker) {
					marker.setMap(null);
					marker = null;
				}
				marker = new AMap.Marker({
					position: lnglatXY,
					map: map,
					bubble: true
				});
				marker.setMap(map);
				//构建信息窗体中显示的内容
				openInfo();
			}
			//在指定位置打开信息窗体
			function openInfo() {
				let info = [];
				info.push('邮编 : ' + adcode);
				info.push('地址 :' + address);
				infoWindow = new AMap.InfoWindow({
					content: info.join('<br/>'), //使用默认信息窗体框样式，显示信息内容
					autoMove: true,
					offset: new AMap.Pixel(0, -23),
					size: new AMap.Size(200, 0)
				});
				//鼠标点击marker弹出自定义的信息窗体
				infoWindow.open(map, marker.getPosition());
			}
		},
		//时间选择确定，返回
		getTime: function(time) {
			this.startslot.hour = time.start.hour;
			this.startslot.minute = time.start.minute;
			this.endSlot.hour = time.end.hour;
			this.endSlot.minute = time.end.minute;
		},
		//获取店铺基本信息
		async baseGet() {
			this.baseDetial = await http.baseGet({
				data: { shopId: this.shopId }
			});
			this.onoff = this.baseDetial.isWarrant == 0 ? true : false;
			this.isShared = this.baseDetial.isShared == 0 ? true : false;
			this.shopNumber = this.baseDetial.shopNumber
				? this.baseDetial.shopNumber
				: '';
			if (this.baseDetial.position && this.baseDetial.position !== '') {
				this.pointLng = this.baseDetial.position.split(',')[0];
				this.pointLat = this.baseDetial.position.split(',')[1];
			} else {
				this.pointLat = 39.915;
				this.pointLng = 116.404;
			}
			let openTime = this.baseDetial.openTime.split(',');
			let st = parseInt(openTime[0]);
			let et = parseInt(openTime[1]);
			if (et >= 1440) {
				et = et - 1440;
				this.selnext = true;
			}
			let shour = (st - st % 60) / 60 + '';
			let smin = st % 60 + '';
			let ehour = (et - et % 60) / 60 + '';
			let emin = et % 60 + '';
			if (shour.length == 1) {
				shour = '0' + shour;
			}
			if (smin.length == 1) {
				smin = '0' + smin;
			}
			if (ehour.length == 1) {
				ehour = '0' + ehour;
			}
			if (emin.length == 1) {
				emin = '0' + emin;
			}
			this.startslot.hour = shour;
			this.startslot.minute = smin;
			this.endSlot.hour = ehour;
			this.endSlot.minute = emin;
			//请求完详情再显示
			this.loaded = true;
			this.seach();
		},
		//修改店铺基本信息
		async baseUpdate() {
			let edit = await http.baseUpdate({
				data: {
					shopId: this.shopId,
					openTime: this.start,
					closeTime: this.end,
					shopName: this.baseDetial.shopName,
					contactMan: this.baseDetial.contactMan,
					telephone: this.baseDetial.telephone,
					address: this.baseDetial.address,
					description: this.baseDetial.description,
					logoImage: this.baseDetial.logoImage,
					healthLicense: this.baseDetial.healthLicense,
					isWarrant: this.onoff ? 0 : 1,
					isShared: this.isShared ? 0 : 1,
					shopNumber: this.shopNumber,
					position: this.pointLng + ',' + this.pointLat
				}
			});

			if (edit) {
				let logoName = this.$store.state.logoName;
				let shopName = '';
				let shopList = this.userData.shopList;
				//如果是品牌中的直营或加盟店或单店并且从缓存的userData里的店铺列表里改变，否则切换店铺，改变的信息会被覆盖
				//这种改变方法很累人，这么多代码仅仅只改变了右上角全局的店铺名称
				if (this.baseDetial.ischain == '0') {
					shopName = this.baseDetial.shopName;
					for (let i = 0; i < shopList.noBrand.length; i++) {
						if (this.baseDetial.id == shopList.noBrand[i].id) {
							shopList.noBrand[i] = this.baseDetial;
							// delete shopList.noBrand[i].shopName;
							shopList.noBrand[i].name = this.baseDetial.shopName;
						}
					}
				} else {
					shopName =
						logoName.split('--')[0] +
						'--' +
						this.baseDetial.shopName;
					for (let i = 0; i < shopList.brand.length; i++) {
						if (this.baseDetial.brandId == shopList.brand[i].id) {
							if (this.baseDetial.ischain == '1') {
								for (
									let j = 0;
									j < shopList.brand[i].direct.length;
									j++
								) {
									if (
										this.baseDetial.id ==
										shopList.brand[i].direct[j].id
									) {
										shopList.brand[i].direct[
											j
										] = this.baseDetial;
										// delete shopList.direct[j].shopName;
										// shopList.brand[i].direct[j].name = this.baseDetial.shopName;
									}
								}
							} else if (this.baseDetial.ischain == '2') {
								for (
									let j = 0;
									j < shopList.brand[i].franchise.length;
									j++
								) {
									if (
										this.baseDetial.id ==
										shopList.brand[i].franchise[j].id
									) {
										shopList.brand[i].franchise[
											j
										] = this.baseDetial;
										// delete shopList.franchise[j].shopName;
										// shopList.brand[i].franchise[j].name = this.baseDetial.shopName;
									}
								}
							}
						}
					}
				}
				//改变右上角全局店铺信息
				this.userData.currentShop = this.baseDetial;
				this.userData.currentShop.name = this.baseDetial.shopName;
				this.userData.currentShop.newName = shopName;
				storage.session('userShop', this.userData);
				this.$store.commit('setlogoName', shopName);
				this.$store.commit('setWin', {
					title: '温馨提示',
					winType: 'alert',
					content: '店铺信息修改成功'
				});
			}
		},
		//电子菜单设备不被其他桌台共用按钮点击
		changeOnOff: function(e) {
			this.isShared = e;
		},
		//验证授权码按钮点击
		changeAuth: function(e) {
			this.onoff = e;
		},

		nextDay: function() {
			this.selnext = !this.selnext;
		},
		//修改店铺信息
		send: function() {
			if (this.baseDetial.shopName == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alert',
					content: '店铺名称不能为空'
				});
				return false;
			}
			if (this.shopNumber != '' && this.shopNumber.length < 4) {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alert',
					content: '店铺编号必须为4位数'
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
			if (this.baseDetial.address == '') {
				this.$store.commit('setWin', {
					title: '错误提示',
					winType: 'alert',
					content: '店铺地址不能为空'
				});
				return false;
			}
			let that = this;
			this.start =
				parseInt(that.startslot.hour * 60) +
				parseInt(that.startslot.minute);
			this.end =
				parseInt(that.endSlot.hour * 60) +
				parseInt(that.endSlot.minute);
			if (this.selnext) {
				this.end = this.end + 1440;
			}
			this.baseUpdate();
		},
		//修改图片
		async fileNameChange() {
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
		async fileNameChange2() {
			let res = await http.uploadImg({
				formId: 'imageUpForm2',
				data: {
					type: 8,
					shopId: this.shopId
				}
			});
			this.baseDetial.healthLicense = res;
		}
	}
};
</script>


<style type="text/css" scoped>
#bstime .line {
	display: block;
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 10px 0;
}

#bstime .line label {
	float: left;
	margin-left: 20px;
}

#bstime .ltitle {
	width: 120px;
	line-height: 40px;
	text-align: right;
	float: left;
	box-sizing: border-box;
	font-size: 16px;
}

#bstime input.mes {
	width: 300px;
	border: 1px solid #ccc;
	box-sizing: border-box;
	resize: none;
}

#bstime textarea {
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
.circle.active {
	background: url(../../res/icon/selected.png) center center no-repeat,
		#28a8e0;
}
</style>