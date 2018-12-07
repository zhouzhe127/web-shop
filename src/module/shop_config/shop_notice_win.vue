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
				<el-form-item label="发布时间">
					<el-date-picker v-model="staTime" type="datetime" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
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
				<el-button @click="addNotice(false)" type="primary" style="width:100px;float:left;">下一步</el-button>
				<a href="javascript:void(0);" @click="addNotice(true)" class="wearhouse" style="margin:0px 10px;">保存草稿</a>
				<a href="javascript:void(0);" @click="back" class="wearhouse create" style="color:#b3b3b3;border-color:#b3b3b3;">返回</a>
			</div>
		</section>
		<section v-show="isNext">
			<h3 style="height: 40px;line-height: 40px; font-size: 18px;color: #706c6c;">发布渠道：</h3>
			<el-form label-width="100px">
				<el-form-item label="选择渠道">
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
						<el-tab-pane v-for="(item,index) in caseList" :key="index" :label="item.name" :name="index+''">
							<!-- <span>选择门店</span>
							<el-button @click="openJob('shop')" type="primary">选择门店</el-button> -->

						</el-tab-pane>
					</el-tabs>
				</el-form-item>
				<el-form-item label="">
					<span v-if="isaddmuban">
						<el-input v-model="mubanName" maxlength="10" style="width:150px;"></el-input>
						<span @click="addMubanBtn">
							<i class="el-icon-success" style="color:#E0BA4F;margin-right:5px;font-size:20px;cursor:pointer"></i>
						</span>
						<span @click="cancelMban">
							<i class="el-icon-error" style="color:#666;font-size:20px;cursor:pointer"></i>
						</span>
					</span>
					<span v-if="!isaddmuban" @click="addMuban" class="addIcon">
						<i class="el-icon-circle-plus-outline"></i>
						<span>新建模板</span>
					</span>
				</el-form-item>
			</el-form>
			<el-form v-for="(item,index) in caseList" :key="index" label-width="100px">
				<template v-if="caseActive == index">
					<el-form-item label="选择门店">
						<el-button @click="seachShop(caseActive)" type="primary">选择门店</el-button>
						<span class="spanCom" style="margin-right:15px;" v-if="item.shopIds.length>0">已选择选择门店 {{item.shopIds.length}}个</span>
					</el-form-item>
					<el-form-item label="选择职位">
						<el-button @click="openShopJob('shop',index)" type="primary">选择职位</el-button>
						<span class="spanCom" style="margin-right:15px;" v-if="item.jobIds.length>0">已选择门店职位 {{item.jobIds.length}}个</span>
					</el-form-item>
				</template>
			</el-form>
			<el-button type="primary">立刻发布</el-button>
			<el-button @click="setTimeIssue" type="primary" plain>定时发布</el-button>
			<el-button @click="goToback" plain>保存草稿箱</el-button>
			<el-button @click="goToback" type="info" plain>上一步</el-button>

		</section>
		<shopNoticeTwo v-if="isOpenjob" @selectBack="radioBack" :jobList="jobList" :jobIds="jobIds" :jobtype="jobtype"></shopNoticeTwo>
		<elShopListWin :shopIds="shopIds" @chooseShop="getShopResult" v-if="showShop"></elShopListWin>
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
			caseList: [
				{
					id: '0',
					name: '模板1',
					shopIds: ['10329'],
					jobIds: ['100031']
				},
				{ id: '2', name: 'hhhhhhh', shopIds: ['10329'], jobIds: [] }
			], //模板列表
			caseActive: 0, //模版下标
			shopList: [], //店铺列表
			titDetail: {},
			showShop: false,
			shopIds: [],
			isaddmuban: false,
			mubanName: '模板',
			timeWinShow: false, //定时弹窗
			staTime: new Date().getTime()
		};
	},
	props: {
		isAdd: Boolean,
		redDetial: Object, //详情
		jobList: Array //职位列表
	},
	mounted() {
		this.info();
	},
	methods: {
		async info() {
			let userData = storage.session('userShop');
			this.ischain = userData.currentShop.ischain;
			this.redDetial.time = this.redDetial.time * 1000;
			this.staTime = this.redDetial.time;
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
		setTimeIssue() {
			this.timeWinShow = true;
		},
		timeBack(res) {
			if (res == 'ok') {
				this.redDetial.time = this.staTime;
			}
			console.log(res);
			console.log(this.staTime);
			this.timeWinShow = false;
		},
		handleClick(tab, event) {
			console.log(this.caseActive);
			console.log(tab, event);
		},
		//移除模板
		removeMuban(res) {
			this.$store.commit('setWin', {
				winType: 'confirm',
				content: '确定删除此模板吗？',
				callback: delRes => {
					if (delRes == 'ok') {
						this.caseList.splice(res * 1, 1);
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
			this.mubanName = '模板' + (this.caseList.length + 1);
			this.isaddmuban = true;
		},
		//添加模板保存按钮
		addMubanBtn() {
			if (this.mubanName.trim().length == 0) {
				this.$store.commit('setWin', {
					winType: 'alert',
					content: '模板名不能为空'
				});
				return false;
			}
			let item = {};
			item.name = this.mubanName;
			item.shopIds = [];
			item.jobIds = [];
			this.caseList.push(item);
			this.isaddmuban = false;
		},
		//取消模板按钮
		cancelMban() {
			this.isaddmuban = false;
		},
		//选择门店点击
		seachShop(index) {
			this.shopIds = this.caseList[index].shopIds;
			this.showShop = true;
		},
		//选择门店返回
		getShopResult(res, item) {
			console.log(res);
			console.log(item);
			this.caseList[this.caseActive].shopIds = item;
			this.showShop = false;
		},
		//打开门店职位弹窗
		openShopJob(type, index) {
			this.jobtype = type;
			this.jobIds.shop = this.caseList[index].jobIds;
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
					this.caseList[this.caseActive].jobIds = item.shop;
				}
				console.log(item);
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
		async addNotice(ble) {
			let item = {};
			item.time = this.redDetial.time / 1000;
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
			// if(item.type==1&&this.redDetial.type == '0'){
			// 	this.$store.commit('setWin', {
			// 		winType: 'alert',
			// 		content: '已经发布不能变更为草稿'
			// 	});
			// 	return false;
			// }
			if (this.isAdd) {
				item.type = Number(ble);
				if (ble) {
					let res = await http.addNotice({ data: item });
					if(res){
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '已保存至草稿箱'
						});
						return;
					}
				} else if (!ble) {
					this.isNext = true;
					// this.$store.commit('setWin', {
					// 	winType: 'alert',
					// 	content: '添加成功'
					// });
				}
			} else {
				item.type = Number(ble);
				item.newType = Number(ble);
				item.id = this.redDetial.id;
				//如果是保存草稿箱
				if (ble) {
					let res = await http.editNoticeOne({ data: item });
					if (res) {
						this.$store.commit('setWin', {
							winType: 'alert',
							content: '修改成功'
						});
					}
				} else {
					this.isNext = true;
				}
			}
			// this.$emit('openTwo', 'add');
		},
		back() {
			this.$emit('openTwo', 'back');
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
