<!--
	**添加修改通知信息
	*
	* 孔伟研
	* *
	*
-->
<template>
	<div id="noticeWin">
		<section v-show="!isNext">
			<el-form :model="redDetial" :rules="rules" ref="redDetial" label-width="140px">
				<el-form-item label="通知标题" prop="title">
					<el-input v-model="redDetial.title" maxlength="20" placeholder="请输入通知标题" style="width:250px;"></el-input>
				</el-form-item>
				<!-- <el-form-item label="发布时间">
					<el-date-picker v-model="staTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
				</el-form-item> -->
			</el-form>
			<div class="noticeWin" style="height:380px;">
				<h2 class="tag">正文</h2>
				<div class="mes">
					<div id="div1" class=" toolbar" ref="editor" style="text-align:left;max-width:800px;padding-top:30px;"></div>
				</div>
			</div>
			<div class="noticeWin">
				<h2 class="tag"></h2>
				<!-- <a href="javascript:void(0);" @click="addNotice(false)" class="blue" style=" width: 100px;height:40px;line-height:40px;float:left;">提交</a> -->
				<el-button @click="nextNum" type="primary" style="width:100px;float:left;">下一步</el-button>
				<a href="javascript:void(0);" @click="addNotice(true)" class="wearhouse" style="margin:0px 10px;">保存草稿</a>
				<a href="javascript:void(0);" @click="back" class="wearhouse create" style="color:#b3b3b3;border-color:#b3b3b3;">返回</a>
			</div>
		</section>
		<section v-show="isNext">
			<h3 style="height: 40px;line-height: 40px; font-size: 18px;color: #706c6c;">发布渠道：</h3>
			<el-form label-width="100px">
				<el-form-item label="选择渠道" required>
					<el-checkbox-group v-model="shopUrl" @change="changeshop">
						<el-checkbox label="0" border>闪店云</el-checkbox>
						<el-checkbox label="1" border>闪店商家</el-checkbox>
					</el-checkbox-group>

				</el-form-item>
				<el-form-item label="选择品牌职位">
					<el-button @click="openJob('brand')" type="primary">选择职位</el-button>
					<span class="spanCom" style="margin-right:15px;" v-if="jobIds.brand.length>0">已选择品牌职位 {{jobIds.brand.length}}个</span>
				</el-form-item>
			</el-form>
			<el-form :inline="true">
				<el-form-item required label="">
					<el-tabs v-model="caseActive" @tab-click="handleClick" @tab-remove="removeMuban" value="index" closable style="max-width:500px;">
						<el-tab-pane v-for="(item,index) in caseList" :key="index" :label="'模板' + (index+1)" :name="index+''">
							<!-- <span>选择门店</span>
							<el-button @click="openJob('shop')" type="primary">选择门店</el-button> -->

						</el-tab-pane>
					</el-tabs>
				</el-form-item>
				<el-form-item label="">
					<span @click="addMuban" class="addIcon">
						<i class="el-icon-circle-plus-outline"></i>
						<span>新建模板</span>
					</span>
				</el-form-item>
			</el-form>
			<el-form v-for="(item,index) in caseList" :key="index" label-width="100px">
				<template v-if="caseActive == index">
					<el-form-item v-if="ischain=='3'" label="选择门店" required>
						<el-button @click="seachShop(caseActive)" type="primary">选择门店</el-button>
						<span class="spanCom" style="margin-right:15px;" v-if="item.shopIds.length>0">已选择选择门店 {{item.shopIds.length}}个</span>
					</el-form-item>
					<el-form-item label="选择职位" required>
						<el-button @click="openShopJob('shop',index)" type="primary">选择职位</el-button>
						<span class="spanCom" style="margin-right:15px;" v-if="item.roleIds.length>0">已选择门店职位 {{item.roleIds.length}}个</span>
					</el-form-item>
				</template>
			</el-form>
			<el-button @click="setTimeIssue(false)" type="primary">立刻发布</el-button>
			<el-button @click="setTimeIssue(true)" type="primary" plain>定时发布</el-button>
			<el-button @click="addNotice(true)" plain>保存草稿箱</el-button>
			<el-button @click="goToback" type="info" plain>上一步</el-button>
			<h3 v-if="redDetial.sendType=='1'" style="padding: 20px;margin-left: 86px;color: #e1bb4a;">已设置：{{redDetial.newTime}}发布</h3>

		</section>
		<shopNoticeTwo v-if="isOpenjob" @selectBack="radioBack" :jobList="jobList" :jobIds="jobIds" :jobtype="jobtype" :shopIds="shopIds"></shopNoticeTwo>
		<elShopListWin :shopIds="shopIds" @chooseShop="getShopResult" v-if="showShop" :delShopId="delShopId"></elShopListWin>
		<!-- 添加时间弹窗 -->
		<win v-if="timeWinShow" width="360" height="150" @winEvent="timeBack" :align="'center'">
			<div slot="content" style="margin-top:60px;">
				<el-form :model="redDetial" :rules="rules" ref="redDetial" label-width="90px">
					<el-form-item label="发布时间">
						<el-date-picker v-model="staTime" type="datetime" placeholder="选择日期">
						</el-date-picker>
					</el-form-item>
				</el-form>
			</div>
		</win>
	</div>
</template>

<script>
// import ( /* webpackChunkName:'wang_editor' */ 'src/components/wang_editor.js');
import http from 'src/manager/http';
import global from 'src/manager/global';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';
export default {
	data() {
		return {
			type: 0, //类型0：正文，1：草稿箱
			ischain: '',
			rules: {
				title: [
					{
						required: true,
						message: '请输入通知标题',
						trigger: 'blur'
					}
				],
				time: [
					{ required: true, message: '请选择时间', trigger: 'blur' }
				]
			},
			isNext: false, //是否是下一步
			shopUrl: [], //选择的渠道
			isOpenjob: false,
			jobsLength: null, //职位
			jobIds: { brand: [], shop: [] },
			jobtype: '', //品牌或者店铺，brand  shop
			caseList: [{shopIds: [],roleIds: []}], //模板列表
			caseActive: '0', //模版下标
			shopList: [], //店铺列表
			titDetail: {},
			showShop: false,
			shopIds: [],
			// isaddmuban: false,
			mubanName: '模板',
			timeWinShow: false, //定时弹窗
			staTime: new Date().getTime(),
			isNow:false,
			detial:{},//通知详情
			allShop:[],//所有的店铺
			delShopId:[],//筛选后的
		};
	},
	props: {
		isAdd: Boolean,
		redDetial: Object, //详情
		jobList: Array //职位列表
	},
	mounted() {
		this.info();
		this.shopUrl = this.redDetial.sendToSource?this.redDetial.sendToSource.split(','):[];
		let obj = {};
		if(!this.redDetial.sendConfig || this.redDetial.sendConfig == ''){
			obj.roleIds = [];
			obj.shopConfig = [{shopIds: [],roleIds: []}];
		}else{
			obj = JSON.parse(this.redDetial.sendConfig);
			for(let i=0;i<obj.shopConfig.length;i++){
				obj.shopConfig[i].shopIds = obj.shopConfig[i].shopIds.split(',').filter(d=>d);
				obj.shopConfig[i].roleIds = obj.shopConfig[i].roleIds.split(',').filter(d=>d);
			}
			this.jobIds.brand =  obj.roleIds.split(',').filter(d=>d);
		}
		this.caseList = obj.shopConfig;
		this.getShopList();
	},
	methods: {
		async info() {
			let userData = storage.session('userShop');
			this.ischain = userData.currentShop.ischain;
			this.detial.time = this.redDetial.time * 1000;
			this.redDetial.newTime = utils.format(new Date(this.detial.time), 'yyyy-MM-dd hh:mm:ss');
			this.staTime = this.detial.time;
			this.$store.commit('setPageTools', []);
			let token = storage.session('token'); //token
			let shopId = storage.session('shopId'); //shopId
			let oid = this.random(1, 100).toString();
			let uploadUrl = storage.session('userShop').uploadUrl;
			let editor = await import(/* webpackChunkName:'wang_editor' */ 'src/components/wang_editor.js');
			let wangEditor = new editor.default('#div1');
			wangEditor.customConfig.uploadImgServer =
				global.host.shop +
				'image/uploadImage?oid=' +
				oid +
				'&format=script&token=' +
				token +
				'&type=8&shopId=' +
				shopId;
			wangEditor.customConfig.uploadFileName = 'image';
			wangEditor.customConfig.onchange = html => {
				this.redDetial.content = html;
			};
			wangEditor.customConfig.uploadImgHooks = {
				customInsert: function(insertImg, result) {
					insertImg(uploadUrl + result.data);
				}
			};
			wangEditor.create();
			if (!this.isAdd && this.redDetial.content) {
				wangEditor.txt.html(this.redDetial.content);
			}
		},
		nextNum(){
			this.isNext = true;
		},
		//type=false:立刻发布，true定时发布
		setTimeIssue(type) {
			this.isNow = type;
			if(type){
				this.timeWinShow = true;
			}else{
				this.addNotice(false);
				console.log(this.Detail);
			}
		},
		timeBack(res) {
			if (res == 'ok') {
				this.detial.time = this.staTime;
				this.addNotice(false);
			}
			console.log(res);
			console.log(this.staTime);
			this.timeWinShow = false;
		},
		handleClick(tab, event) {
			this.shopIds = this.caseList[this.caseActive].shopIds;
			console.log(this.caseActive);
			console.log(tab, event);
		},
		//移除模板
		removeMuban(res) {
			console.log(res);
			if(this.caseList.length==1){
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '至少要有一个模板！'
				});
				return false;
			}
			this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定删除此模板吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						this.caseList.splice(res * 1, 1);
						if(res == '0'){
							this.caseActive = '0';
						}else{
							this.caseActive = res * 1 -1 +'';
						}
						
					}
				}
			});
		},
		//添加模板按钮
		addMuban() {
			if (this.caseList.length == 10) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '最多只能添加10个模板！'
				});
				return false;
			}
			this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定新增模板吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						let item = {};
						item.shopIds = [];
						item.roleIds = [];
						this.caseList.push(item);
						this.caseActive = this.caseList.length -1+'';
					}
				}
			});
		},
		//选择门店点击
		seachShop(index) {
			this.shopIds = this.caseList[index].shopIds;
			let arr = [];
			for(let i=0;i<this.caseList.length;i++){
				if(index!=i){
					arr = arr.concat(this.caseList[i].shopIds);
				}
			}
			let shoparr=utils.deepCopy(this.allShop);
			arr.map(el=>{
				let index = shoparr.findIndex(v=>{
					return v.id == el;
				});
				shoparr.splice(index,1);
			});
			this.delShopId = shoparr;
			this.showShop = true;
		},
		//选择门店返回
		getShopResult(res, item) {
			if(res=='ok'){
				this.caseList[this.caseActive].shopIds = item;
				this.caseList[this.caseActive].roleIds = [];
				this.shopIds = item;
			}
			this.showShop = false;
		},
		//打开门店职位弹窗
		openShopJob(type, index) {
			this.jobtype = type;
			this.jobIds.shop = this.caseList[index].roleIds;
			if(this.caseList[index].shopIds.length==0 && this.ischain == '3'){
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请先选择门店'
				});
				return false;
			}
			this.isOpenjob = true;
		},
		//打开品牌职位弹窗
		openJob(type) {
			this.jobtype = type;
			this.isOpenjob = true;
		},
		//品牌职位弹窗返回
		radioBack(res, item) {
			if (res == 'ok') {
				// this.terminalIn = item.index;
				// this.terminalName = item.name;
				if (this.jobtype == 'brand') {
					this.jobIds = item;
				} else if (this.jobtype == 'shop') {
					this.caseList[this.caseActive].roleIds = item.shop;
				}
				// this.setMainTerminal(item);
			}
			this.isOpenjob = false;
			this.isOpenTerminal = false;
		},
		//返回上一页按钮点击
		goToback() {
			console.log(this.redDetial);
			this.isNext = false;
		},
		changeshop(res) {
			console.log(res.toString());
		},
		//传给父组件信息
		clickResult(res) {
			this.$emit('openTwo', res);
		},
		random: function(lower, upper) {
			return Math.floor(Math.random() * (upper - lower)) + lower;
		},
		//添加接口
		async addNotice(ble) {
			//ble  true:保存草稿箱，false:发送
			let item = {};
			//如果是定时发送，保存草稿箱时
			if(this.redDetial.type ==='0'&&ble){
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '已发送或定时发送，不能保存草稿箱！'
				});
				return false;
			}
			item.title = this.redDetial.title;
			item.content = this.redDetial.content;

			function delHtmlTag(str) {
				//去掉所有的html标记
				return str.replace(/<[^>img]+>/g, '');
			}
			if (item.title.length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请输入通知标题！'
				});
				return false;
			}
			if (item.time == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请选择通知时间'
				});
				return false;
			}
			let con = item.content;
			let tent = delHtmlTag(con);
			let arr = tent.split('&nbsp;');
			let abc = false;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].replace(/\s+/g, '').length > 0) {
					abc = true;
				}
			}
			if (!abc) {
				item.content = '';
				// this.$store.commit('setWin', {
				// 	winType: 'alert',
				// 	content: '请输入通知内容！'
				// });
				// return false;
			}
			console.log(item.content);
			if(item.content.trim().length==0){
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请输入正文'
				});
				return false;
			}
			item.sendToSource = this.shopUrl.toString();
			console.log(typeof item.sendToSource);
			if(this.isNext&&!ble){
				if(item.sendToSource == ''){
					this.$store.commit('setWin', {
						winType: 'alert',
						content: '每个模板的选择渠道为必选，请选择！'
					});
					return false;
				}
			}
			item.sendType = this.isNow?'1':'0';
			// let caseList = this.caseList;
			let caseList = utils.deepCopy(this.caseList);
			let aaa = {};
			aaa.roleIds = this.jobIds.brand.toString();
			for(let i=0;i<caseList.length;i++){
				caseList[i].shopIds = caseList[i].shopIds.toString();
				caseList[i].roleIds = caseList[i].roleIds.toString();
				if(this.isNext&&!ble){
					if(caseList[i].shopIds==''){
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '请选择要发布的门店！'
						});
						return false;
					}
					if(caseList[i].roleIds==''){
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '请选择要发布的职位！'
						});
						return false;
					}
				}
			}
			aaa.shopConfig = caseList;
			item.sendConfig = aaa;
			item.time = this.detial.time / 1000;
			console.log(item);
			this.Detail = item;
			// if(item.type==1&&this.redDetial.type == '0'){
			// 	this.$store.commit('setWin', {
			// 		winType: 'alert',
			// 		content: '已经发布不能变更为草稿'
			// 	});
			// 	return false;
			// }
			if (this.isAdd) {
				item.type = Number(ble);
				await http.addNotice({ data: item });
				// if(res){
				// 	this.$store.commit('setWin', {
				// 		winType: 'alert',
				// 		content: '已保存至草稿箱'
				// 	});
				// }
			} else {
				item.type = this.redDetial.type;
				item.newType = Number(ble);
				item.id = this.redDetial.id;
				//如果是保存草稿箱
				let res = await http.editNoticeOne({ data: item });
				if (res) {
					let content = '';
					if(this.redDetial.type === '0'){
						content= '此修改只有标题，正文，定时发送时间有效';
					}else{
						content= '修改成功';
					}
					this.$store.commit('setWin', {
						winType: 'alert',
						content: content
					});
				}
				
			}
			this.$emit('openTwo', 'add');
		},
		back() {
			this.$emit('openTwo', 'back');
		},
		//获取店铺列表
		async getShopList() {
			this.allShop = await http.getShopList({data: {}});
		},
		isOk(detial) {
			if (detial.title.length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '请输入通知标题！'
				});
				return false;
			}
			return true;
		}
	},
	components: {
		win: () => import(/*webpackChunkName:'win'*/ 'src/components/win'),
		shopNoticeTwo: () =>
			import(/*webpackChunkName: "shop_notice_two"*/ './shop_notice_two'),
		elShopListWin: () =>
			import(/* webpackChunkName:'el_shopList_win' */ 'src/components/el_shopList_win')
	}
};
</script>

<style lang="less" scoped>
#noticeWin {
	.addIcon {
		margin: 0 10px;
		color: #e2bc4d;
		cursor: pointer;
	}
	.noticeWin {
		width: 100%;
		position: relative;
		height: 60px;
		.tag {
			float: left;
			width: 102px;
			height: 40px;
			line-height: 40px;
			text-align: right;
		}
		.mes {
			float: left;
			padding-left: 15px;
			text-indent: 0;
			line-height: 30px;
		}
		.wearhouse {
			color: #28a8e0;
			border: 1px #28a8e0 solid;
			width: 100px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			float: left;
			margin-left: 5px;
		}
	}
}
</style>
