/**
 * @file
 * 
 * 电子菜单管理
 *
 * @author zhengu.jiang
 */
 <template>
	<section id="picList">
		<el-form label-width="220px">
			<el-form-item label="电子菜单设备不被其他桌台共用">
				<el-switch v-model="isShared" @change="getisShared" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
			</el-form-item>
			<el-form-item label="验证授权码">
				<el-switch v-model="isWarrant" @change="getisWarrant" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
				<img class="image" src="../../res/images/handle-tips.png" />
				<span style="color: #dddddd;">点击“确认下单”开启授权码，建议开启</span>
			</el-form-item>
			<el-form-item label="电子菜单允许登录会员">
				<el-switch v-model="islogin" @change="getLogin" active-color="#E1BB4A" inactive-color="#e6e6e6"></el-switch>
				<div style="width:380px;display:inline-block;">
					<el-checkbox-group  v-if="loginShow" @change="setLogin" v-model="loginSel">
						<el-checkbox v-for="item in loginList" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<img v-if="loginShow" class="image" src="../../res/images/handle-tips.png" />
				<span v-if="loginShow" style="color: #dddddd;">至少选择一项登录方式</span>
			</el-form-item>
			<el-form-item label="电子菜单点餐模式">
				<div style="width:370px;display:inline-block;">
					<el-checkbox-group @change="setOrder" v-model="orderSel">
						<el-checkbox v-for="item in orderModel" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</div>
				<img class="image" src="../../res/images/handle-tips.png" />
				<span style="color: #dddddd;">至少选择一项登录方式</span>
			</el-form-item>
			<el-form-item label="置顶推荐区名称">
				<el-input v-model="topData.topName" maxlength="6" placeholder="请输入名称" style = "width:250px;"></el-input>
			</el-form-item>
			<el-form-item label="自定义套餐首页推荐名称">
				<el-input v-model="customPackageName" maxlength="6" placeholder="请输入名称" style = "width:250px;"></el-input>
			</el-form-item>
			<el-form-item label="置顶推荐区商品">
				<el-button @click="menuConfig" type="primary" style="width:150px;">添加关联菜品</el-button>
				<span v-if="topData.topGoods.length != 0 || topData.topPackages.length != 0">已配置
					<i v-if="topData.topGoods.length != 0">{{topData.topGoods.length}}个商品</i>
					<i v-if="topData.topPackages.length != 0">{{topData.topPackages.length}}个套餐</i>
				</span>
			</el-form-item>
			<el-form-item label="电子菜屏幕显示模式">
				<el-radio-group v-model="screenType">
					<el-radio label="0" border>横屏</el-radio>
					<el-radio label="1" border>竖屏</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<div style="padding:10px 70px;">
			<el-radio-group v-model="buttonList.flag" @change = "light">
				<el-radio-button v-for="item in buttonList.list" :key="item.index" :label="item.index">{{item.name}}</el-radio-button>
			</el-radio-group>
		</div>
		<el-form label-width="120px">
			<el-form-item v-if="buttonList.flag === 0" label="拓展页面名称：">
				<el-input v-model="imageName" maxlength="10" placeholder="请输入拓展页面名称：" style = "width:250px;"></el-input>
			</el-form-item>
			<span class="typeName" v-if="buttonList.flag === 1">锁屏页面图片：</span>
			<span class="typeName" v-else>拓展页面图片：</span>
		</el-form>
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
		<el-button @click="save" type="primary" style="width:150px;">保存</el-button>
		<goodsWin @goodListWin="goGoodList" v-if="showGoods" :goInName="'menuConfig'" :goodsIds="topData.topGoods" :packages="topData.topPackages" :isGoods="true" :isPackType="'0,1'"></goodsWin>
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
				{ id: '1', name: '卡号登录' },
				{ id: '2', name: '扫码登录' },
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
			},
			customPackageName:'',//自定义套餐推荐名称
			screenType:'0',//默认横屏
		};
	},
	mounted() {
		let userData = storage.session('userShop');
		this.shopId = userData.currentShop.id;
		this.imgHost = userData.uploadUrl;
		console.log(this.loginSel);
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
			console.log(res);
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
			this.customPackageName = data.customPackageName;
			this.screenType = data.screenType;
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
					customPackageName: this.customPackageName,
					screenType:this.screenType
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
	#picList .image {
		vertical-align: middle;
		margin-left: 10px;
	}
	#picList .typeName {
		font-size: 16px;
		padding-left: 10px;
		padding-right: 10px;
		display: inline-block;
		width: 250px;
		line-height: 30px;
		color: #808080;
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

	.pic-list h2 {
		position: absolute;
		top: 10px;
		right: 20px;
		z-index: 2;
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
</style>
 