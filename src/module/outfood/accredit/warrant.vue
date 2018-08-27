<template>
	<section id="warrant" style="height:100%">
		<section>
			<div class="loading" v-if="boxList.length==0">
				<img src="../../../res/images/preloader.gif" />
			</div>
			<div class="box" v-for="(item,index) in boxList" v-else :key="index">
				<div class="left" v-bind:class="{one: index == 0, two: index == 1, three: index == 2}"></div>
				<div class="right" v-if="item.status == 0">
					<span>{{item.name}}</span>
					<a class="rant" @click="addWarrant(item.id,$event)" href="javascript:void(0)">点击授权</a>
				</div>
				<div class="right warranted" v-if="item.status == 1">
					<span class="spcet">{{item.name}}</span>
				</div>
				<!-- <div class="right warranted" v-if="item.status == 1 && item.id == 2">
					<span>{{item.name}}</span>
					<a class="rant" @click="removeRant" href="javascript:void(0)">解除授权</a>
				</div> -->
				<a @click="cancelWarrant(item.status,item.id)" href="javascript:void(0)" v-if="item.status == 1" class="eleJump"></a>
			</div>
			<!-- <router-view name="popUp"></router-view> -->
			<meiTuan-warrant v-if="showMt" @show="hidden" :urlData="urlData"></meiTuan-warrant>
		</section>
	</section>

</template>
<script type="text/javascript">
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
// import Timer from 'src/verdor/timer';
export default {
	data() {
		return {
			userData: '',
			brandId: '',
			shopId: '',
			boxList: [], //外卖列表数据
			urlData: '', //外卖URL
			showMt: false, //美团授权弹框
			goods: '', //所有菜品
			category: '', //所有菜品分类
			erpDishData: {
				dishes: []
			}, //本地菜品数据整理发送给美团
			eleShopList: [], //饿了么店铺列表
			relation: true, //关联店铺页面
			eleShopid: '', //选中的店铺id
			eleGoods: '', //饿了么菜品数据
			edit: false, //编辑true,饿了么第一次关联菜品为false
			timer: '' //定时器
		};
	},
	methods: {
		async init() {
			let data = await http.getTakeOutList({
				data: {
					brandId: this.brandId
				}
			});
			console.log(this.timer);
			this.boxList = data;
			// 美团已授权时请求商品列表
			for (let i = 0; i < this.boxList.length; i++) {
				if (this.boxList[i].id == 2 && this.boxList[i].status == 1) {
					//this.getGoods();
				}
			}
		},
		addWarrant: function(id) {
			//饿了么授权
			//弹出空白窗口，防止浏览器拦截
			clearInterval(this.timer);
			let eleme;
			if (id != 2) {
				storage.session('waimai', id);
				eleme = window.open('', 'newWindow');
			}
			http
				.getAuthorizationUrl({
					data: {
						type: id,
						brandId: this.brandId,
						shopId: this.shopId
					}
				})
				.then(
					data => {
						if (id != 2) {
							let index = 0;
							eleme.location = data;
							this.timer = setInterval(
								this.getReturn(id, index, eleme),
								1500
							);
						} else {
							let localUrl = window.location.href;
							this.showMt = true;
							this.urlData = data + '&eOrigin=' + localUrl;
						}
					},
					() => {
						this.$store.commit('setWin', {
							title: '错误提示',
							content: '请求失败'
						});
					}
				);
		},
		getReturn(id, index, eleme) {
			// let timer = this.timer;
			let that = this;
			return function(){
				http
					.getReturnInfo({
						data: {
							type: id
						}
					})
					.then(
						function(data){
							if (data == 1) {
								clearInterval(that.timer);
								//授权成功
								if (eleme) eleme.close();
								that.init();
							} else if (data == 0) {
								clearInterval(that.timer);
								if (eleme) eleme.close();
								that.$store.commit('setWin', {
									title: '授权失败',
									content: '授权失败'
								});
							}
						},
						function(err){
							clearInterval(that.timer);
							that.$store.commit('setWin', {
								title: '提示',
								content: err
							});
						}
					);
				index += 1;
				if (index > 180) {
					//3分钟内没有操作，关闭授权页面
					if (eleme) eleme.close();
					this.init();
					clearInterval(this.timer);
				}
			};
		},
		cancelWarrant: function(status, id) {
			if (status == 0) {
				return false;
			}
			//饿了么百度解绑，关联菜品
			let name = id;
			storage.session('hello', 'open');
			storage.session('waimai', name);
			setTimeout(function() {
				sessionStorage.removeItem('hello');
			}, 1000);
			let url = window.location.href.split(/authorization/g)[0] + 'authorization/relation';
			window.open(url);
		},
		hidden: function(show) {
			this.showMt = show;
		}
	},
	mounted: function() {
		this.userData = storage.session('userShop');
		this.shopId = this.userData.currentShop.id;
		this.brandId =
			this.userData.currentShop.ischain == 0
				? 0
				: this.userData.currentShop.brandId;
		window.onmessage = e => {
			if (e.data.event == 'msg-token') {
				http
					.addMeituanShopRelation({
						data: {
							brandId: this.brandId,
							mtShopId: e.data.value.poiId,
							mtShopName: e.data.value.poiName
						}
					})
					.then(
						() => {
							clearInterval(this.timer);
							this.timer = setInterval(this.getReturn(2, 0), 1500);
						},
						() => {
							this.$store.commit('setWin', {
								title: '错误提示',
								content: '请求失败'
							});
						}
					);
			} else if (e.data.event == 'finish-storebind') {
				//点击UI SDK完成按钮
				this.showMt = false;
			} else if (e.data.event == 'getErpDishData') {
				// Timer.add(this.cancelWarrant(1,2), 10000);
				this.showMt = false;
			} else if (e.data.event == 'setPrinter') {
				//配置打印机按钮
			} 
			// else if (e.data.event == 'releaseBinding') {
			// }
		};
		this.init();
	},
	components: {
		meiTuanWarrant: () =>
			import(/*webpackChunkName: "iframe_warrant"*/ 'src/module/outfood/accredit/iframe_warrant')
	},
	destroyed() {
		clearInterval(this.timer);
	}
};
</script>
<style type="text/css" lang="less" scoped>
#warrant{
	height: 100%;
}
#warrant .box {
	display: inline-block;
	width: 340px;
	height: 167px;
	background: #fafafa;
	margin-right: 100px;
	vertical-align: top;
	margin-bottom: 50px;
	overflow: hidden;
}
#warrant .box .left,
#warrant .box .right {
	display: inline-block;
	height: 167px;
	vertical-align: middle;
}
#warrant .box .left {
	width: 140px;
}
#warrant .box .right {
	width: 195px;
}
#warrant .right span:nth-of-type(1) {
	display: inline-block;
	width: 100px;
	height: 24px;
	font-size: 24px;
	margin-top: 47px;
	margin-left: 22px;
}
#warrant .right .rant {
	display: inline-block;
	width: 100px;
	height: 30px;
	border: 1px solid #f8931f;
	color: #f8931f;
	border-radius: 15px;
	text-align: center;
	line-height: 27px;
	margin-top: 20px;
	font-size: 14px;
	margin-left: 22px;
	cursor: pointer;
	position: relative;
	z-index: 999;
}
#warrant .box .one {
	background: url(../../../res/images/eleme.png) no-repeat 20px 34px;
}
#warrant .box .two {
	background: url(../../../res/images/meituan.png) no-repeat 20px 34px;
}
#warrant .box .three {
	background: url(../../../res/images/baidu.png) no-repeat 20px 34px;
}
#warrant .box .warranted {
	background: url(../../../res/images/warrant.png) no-repeat 80px 108px;
}
#warrant .box .warranted .spcet {
	margin-top: 72px !important;
}

#warrant .box .eleJump {
	display: inline-block;
	width: 340px;
	height: 167px;
	position: relative;
	bottom: 167px;
	z-index: 100;
}
#jumpShop {
	background: #ededed;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	padding-bottom: 200px;
}
#warrant #jumpShop .shopBox {
	width: 1438px;
	/*height: 796px;*/
	margin: 0 auto;
	margin-top: 60px;
	z-index: 1000;
}
#warrant #jumpShop .shopBox .shopList {
	width: 100%;
	height: 700px;
	background: #ffffff;
}
#warrant #jumpShop .shopBox .shopList p {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 22px;
	color: #43414a;
	text-align: center;
}
#jumpShop .title {
	background: #f7f7f7;
	height: 60px;
	line-height: 60px;
	font-size: 16px;
}
#jumpShop ul li {
	display: inline-block;
	width: 33%;
	text-align: center;
}
#jumpShop .eleShop li {
	height: 100px;
	line-height: 100px;
	font-size: 16px;
	color: #43414a;
	border-bottom: 4px solid #f7f7f7;
}
.circle {
	display: inline-block;
	width: 21px;
	height: 21px;
	border: 1px #c7c7c7 solid;
	border-radius: 50%;
	margin-left: 5px;
	background: #fff;
	vertical-align: middle;
}
#warrant .shopBox a {
	margin-top: 30px;
}
#warrant .shopBox i {
	display: inline-block;
	width: 44px;
	height: 44px;
	background: url(../../../res/icon/success.png) center center no-repeat;
	vertical-align: middle;
	margin-right: 16px;
}
#warrant .gray {
	margin-left: 540px;
	width: 150px;
}
#warrant .yellow {
	margin-left: 70px;
	width: 150px;
}
#jumpShop .tip-icon {
	margin-top: 20px;
}
#jumpShop .tip-icon i {
	display: inline-block;
	width: 18px;
	height: 18px;
	background: url(../../../res/icon/prompt.png) center center no-repeat;
}
#warrant .shopList .content {
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .category {
	display: inline-block;
	width: 210px;
	height: 60px;
	line-height: 60px;
	vertical-align: top;
	text-align: center;
}
#warrant .shopList .content .sdgoods {
	display: inline-block;
	width: 1200px;
}
#warrant .shopList .content .sdgoods i {
	display: inline-block;
	width: 20px;
	height: 20px;
}
#warrant .shopList .content .sdgoods .edit {
	background: url(../../../res/icon/iconchange.png) no-repeat;
}
#warrant .shopList .content .sdgoods .delete {
	background: url(../../../res/icon/icondelete.png) no-repeat;
}
#warrant .shopList .content .sdgoods a {
	width: 100px;
	color: #ff9800;
	text-decoration: underline;
	margin-top: 0;
}
#warrant .shopList .content .sdgoods .goodsicon {
	display: inline-block;
	width: 120px;
	height: 44px;
	background: url(../../../res/images/bind.png) center center no-repeat;
	vertical-align: middle;
}
#warrant .shopList .content .sdgoods .goodsName {
	display: inline-block;
	width: 120px;
	height: 44px;
	line-height: 44px;
	margin-right: 20px;
	vertical-align: middle;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
#warrant .shopList .content .sdgoods ul li {
	width: 590px;
	height: 60px;
	line-height: 60px;
	border-bottom: 4px solid #f7f7f7;
}
#warrant .shopList .content .sdgoods ul:last-child li {
	border-bottom: 0;
}
#warrant .shopList .contentBox {
	height: 580px;
	overflow-x: scroll;
}
#warrant .loading {
	width: 128px;
	margin: 200px auto;
}
</style>