/**
 * @file
 * 
 * 电子菜单管理
 *
 * @author zhengu.jiang
 */
 <template>
	<section id="picList">
		<div class="line">
			<span class="warp">电子菜单设备不被其他桌台共用</span>
			<onoff class="button" @statusChange="getisShared" :status="isShared"></onoff>
		</div>
		<div class="line">
			<span class="warp">验证授权码</span>
			<onoff class="button" @statusChange="getisWarrant" :status="isWarrant"></onoff>
			<img class="image" src="../../res/images/handle-tips.png" />
			<span style="color: #dddddd;">点击“确认下单”开启授权码，建议开启</span>
		</div>
		<div class="line">
			<span class="warp">电子菜单允许登录会员</span>
			<onoff class="button" @statusChange="getLogin" :status="islogin"></onoff>
			<section v-if="loginShow" style="display:inline-block;vertical-align:middle">
				<mulselect @selOn="setLogin" :list="loginList" :name="'name'" :key="'id'" :selects="loginSel"></mulselect>
			</section>
			<img v-if="loginShow" class="image" src="../../res/images/handle-tips.png" />
			<span v-if="loginShow" style="color: #dddddd;">至少选择一项登录方式</span>
		</div>
		<div class="line">
			<span class="warp">电子菜单点餐模式</span>
			<section style="display:inline-block;vertical-align:middle">
				<mulselect @selOn="setOrder" :list="orderModel" :name="'name'" :keys="'id'" :selects="orderSel"></mulselect>
			</section>
			<img class="image" src="../../res/images/handle-tips.png" />
			<span style="color: #dddddd;">至少选择一种点餐模式</span>
		</div>
		<div class="line">
			<span class="warp">置顶推荐区名称:</span>
			<input type="text" class="mes" v-model="topData.topName" placeholder="请输入名称" maxlength="6">
		</div>
		<div class="line">
			<span class="warp">自定义套餐首页推荐名称:</span>
			<input type="text" class="mes" v-model="topData.customPackageName" placeholder="请输入名称" maxlength="8">
		</div>
		<div class="line">
			<span class="warp">置顶推荐区商品:</span>
			<a class="blue" style="width:100px;height:40px;line-height:40px;" @click="menuConfig">菜单配置</a>
			<span v-if="topData.topGoods.length != 0 || topData.topPackages.length != 0">已配置
				<i v-if="topData.topGoods.length != 0">{{topData.topGoods.length}}个商品</i>
				<i v-if="topData.topPackages.length != 0">{{topData.topPackages.length}}个套餐</i>
			</span>
		</div>
		<div class="light">
			<span class="sel" v-for="(item,index) in buttonList.list" :key="index" v-bind:class="{'buttonOn': buttonList.flag == index}" @click="light(index)">{{item.name}}</span>
		</div>
		<div class="line" v-if="buttonList.flag === 0">
			<span class="imageName">拓展页面名称：</span>
			<input type="text" class="mes" v-model="imageName" placeholder="请输入名称" maxlength="10">
		</div>
		<div class="line">
			<span class="typeName" v-if="buttonList.flag === 1">锁屏页面图片：</span>
			<span class="typeName" v-else>拓展页面图片：</span>
		</div>
		<ul class="pic-list">
			<li class="add-pic" @click="add">
				<div class="addTo">
					<input>
					<span>编辑图片</span>
				</div>
			</li>
			<li class="li-pic" v-for="(blist,index) in bannerList" :key="index" @click="edit(index,blist)">
				<img v-if="blist.image != ''" :src="imgHost + blist.image" class="cname" />
				<img v-if="blist.image == ''" src="../../res/food/test.jpg" width="300" height="200" alt="商品" />
				<h2>{{index+1}}</h2>
			</li>

		</ul>
		<a @click="save" href="javascript:void(0);" class="yellow">保存</a>
		<goodsWin @goodListWin="goGoodList" v-if="showGoods" :goInName="'menuConfig'" :goodsIds="topData.topGoods" :packages="topData.topPackages" :isGoods="true"></goodsWin>
		<shufflingPicWin v-if="showWin" @shufflingPicWin="getResult" :index='index' :detial='detial' :types='types' :status=true :type='buttonList.flag'></shufflingPicWin>
	</section>
</template>
 <script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import utils from 'src/verdor/utils';
export default {
	data() {
		return {
			shopId: null, //店铺id
			imgHost: '', //+图片前缀
			bannerList: [], //轮播图片列表
			list: '', //所有轮播图列表数据
			type: '', //渠道id
			buttonList: {
				flag: 0,
				list: [
					{ index: 0, name: '拓展页面' },
					{ index: 1, name: '锁屏页面' }
				]
			},
			showWin: false, //是否弹窗
			imageName: '', //拓展页面名称
			isShared: false,
			isWarrant: false,
			detial: {}, //轮播图详情
			index: 0, //点击轮播图的下标
			types: '', //添加或修改
			loginList: [
				{ id: '0', name: '手机号登录' },
				{ id: '1', name: '卡号登录' }
			],
			orderModel: [
				{ id: '0', name: '标准模式' },
				{ id: '1', name: '大图模式' },
				{ id: '2', name: '列表模式' }
			],
			loginSel: ['0'],
			orderSel: ['0'],
			loginShow: true,
			islogin: true,
			defaultLogin: [],
			defaultOrder: [],
			topName: '', //推荐区名称
			topGoods: [],
			topPackages: [],
			showGoods: false, //菜单配置弹窗
			topData: {
				topName: '',
				topGoods: [],
				topPackages: [],
				customPackageName:''//自定义套餐推荐名称
			},
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.imgHost = userData.uploadUrl;
		this.inte();
	},
	methods: {
		//菜单配置弹窗
		menuConfig() {
			this.showGoods = true;
		},
		//选中菜单弹窗回调
		goGoodList(res, item) {
			if (item.goodArr.length + item.packArr.length > 100) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '商品与套餐不能超过100个'
				});
				return false;
			}
			this.showGoods = false;
			if (res == 'ok') {
				this.topData.topGoods = item.goodArr;
				this.topData.topPackages = item.packArr;
			}
		},
		setLogin(res) {
			if (res.length < 1) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '至少选择一项登录方式'
				});
				this.loginSel = this.defaultLogin;
				return false;
			}
			this.defaultLogin = utils.deepCopy(res);
		},
		setOrder(res) {
			if (res.length < 1) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '至少选择一种点餐模式'
				});
				this.orderSel = this.defaultOrder;
				return false;
			}
			this.defaultOrder = utils.deepCopy(res);
		},
		getLogin(res) {
			this.islogin = res;
			res ? (this.loginShow = true) : (this.loginShow = false);
			if (res) this.loginSel = ['0'];
		},
		//接收弹窗传递的内容数据
		getResult(res, item) {
			if (res == 'ok') {
				if (item.types == 'add') {
					let detial = {
						shopId: this.shopId,
						image: item.image,
						sort: item.sort,
						type: item.type,
						imageName: this.imageName
					};
					this.addPic(detial);
					// this.inte();
				} else if (item.types == 'edit') {
					let detial = {
						shopId: this.shopId,
						id: item.id,
						image: item.image,
						sort: item.sort,
						type: item.type,
						imageName: this.imageName
					};
					this.editPic(detial);
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
					content: '确定删除该图片?',
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
		getisShared(res) {
			this.isShared = res;
		},
		getisWarrant(res) {
			this.isWarrant = res;
		},
		//锁屏、拓展切换
		light(index) {
			this.buttonList.flag = index;
			if (index == 1) {
				this.bannerList = this.list[0].slideshow; //锁屏
				this.type = this.list[0].id;
			} else {
				this.bannerList = this.list[1].slideshow; //拓展
				this.type = this.list[1].id;
			}
		},
		//添加轮播图
		async addPic(detial) {
			let add = await http.addSlideShow({ data: detial });
			this.bannerList.push(add);
			this.bannerList = this.bannerList.sort(function(a, b) {
				return a.sort - b.sort;
			});
		},
		//修改轮播图
		async editPic(detial) {
			await http.updateSlideShow({ data: detial });
			this.bannerList = this.bannerList.sort(function(a, b) {
				return a.sort - b.sort;
			});
		},
		//初始化，请求轮播图列表
		async inte() {
			let data = await http.getElecMenu({
				data: { shopId: this.shopId }
			});
			this.isWarrant = data.isWarrant == 1 ? true : false;
			this.isShared = data.isShared == 1 ? true : false;
			if (!data.elecMenuVip) {
				this.getLogin(false);
			}
			//显示拓展页面图片
			let list = data.electronicMenu;
			for (let i = 0; i < list.length; i++) {
				if (list[i].id == 5) {
					this.imageName = list[i].imageName;
				}
			}
			this.bannerList = list[1].slideshow;
			this.type = list[1].id;
			this.list = list;
			if (data.elecMenuType) {
				this.orderSel = utils.deepCopy(data.elecMenuType.split(','));
			}
			if (data.elecMenuVip) {
				this.loginSel = data.elecMenuVip.split(',');
			}
			data.topData.filter(item => {
				if (item.type == '2') {
					this.topData = item;
				}
			});
		},
		async delSlideShow(detial) {
			await http.eleDelSlideShow({ data: detial });
		},
		//保存
		async SlideshowUpdate() {
			let reg = /^0+$/;
			if (reg.test(this.topData.topName)) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '置顶推荐名称不能为' + this.topData.topName
				});
				return false;
			}
			if (
				(this.topData.topGoods.length != 0 ||
					this.topData.topPackages.length != 0) &&
				!this.topData.topName
			) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '置顶推荐名称不能为空'
				});
				return false;
			}
			await http.SlideshowUpdate({
				data: {
					isWarrant: this.isWarrant ? 1 : 0,
					isShared: this.isShared ? 1 : 0,
					imageName: this.imageName,
					elecMenuType: this.orderSel.join(), //点餐模式
					elecMenuVip: this.islogin ? this.loginSel.join() : '', //登录会员
					topPackages: this.topData.topPackages,
					topGoods: this.topData.topGoods,
					topName: this.topData.topName,
					customPackageName: this.topData.customPackageName,
				}
			});
			this.$store.commit('setWin', {
				title: '温馨提示',
				winType: 'alert',
				content: '保存成功'
			});
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
		},
		//保存
		save() {
			this.SlideshowUpdate();
		}
	},
	components: {
		onoff: () =>
			import(/*webpackChunkName: 'on_off'*/ 'src/components/on_off'),
		shufflingPicWin: () =>
			import(/*webpackChunkName: 'shuffling_pic_win'*/ './shuffling_pic_win'),
		mulselect: () =>
			import(/*webpackChunkName: 'mul_select'*/ 'src/components/mul_select'),
		goodsWin: () =>
			import(/*webpackChunkName: 'good_list_win'*/ 'src/components/good_list_win')
	}
};
</script>

 <style scoped>
#picList {
	text-align: left;
}
#picList .yellow {
	width: 200px;
	padding-left: 10px;
	margin-top: 10px;
	margin-left: 10px;
}
#picList .line {
	display: block;
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 10px 0;
}
#picList .line .warp {
	font-size: 16px;
	padding-left: 10px;
	padding-right: 10px;
	display: inline-block;
	text-align: right;
	width: 250px;
	color: #808080;
}
#picList .line .button {
	display: inline-block;
	vertical-align: middle;
}
#picList .line .image {
	vertical-align: middle;
	margin-left: 10px;
}
#picList .light {
	margin-bottom: 10px;
	display: inline-block;
	margin-left: 10px;
}
#picList .imageName {
	font-size: 16px;
	padding-left: 10px;
	padding-right: 10px;
	color: #808080;
}
#picList .typeName {
	font-size: 16px;
	padding-left: 10px;
	padding-right: 10px;
	display: inline-block;
	width: 250px;
	color: #808080;
}
.sel {
	display: inline-block;
	width: 135px;
	height: 40px;
	font-size: 16px;
	background: #f2f2f2;
	border-radius: 3px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	margin-right: 10px;
}
.buttonOn {
	background: #28a8e0;
	color: #fff;
}
#picList .mes {
	width: 200px;
	border: 1px solid #ccc;
	box-sizing: border-box;
	resize: none;
	height: 40px;
	padding-left: 5px;
}
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

li.li-pic h2 {
	font-size: 38px;
	color: #c0c0c0;
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
.addTo input {
	position: absolute;
	left: 0px;
	top: 0px;
	height: 50px;
	opacity: 0;
	width: 100%;
	cursor: pointer;
}
.addTo span {
	width: 100px;
	height: 50px;
	line-height: 50px;
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
 