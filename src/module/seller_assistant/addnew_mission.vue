/** * 任务系统 * *miaochuan.sha */
<template>
	<div id="addmision">
		<!-- 新建任务 -->
		<div class="set-line">
			<div class="titles">{{taskTypename}}</div>
			<div class="line"></div>
		</div>
		<!-- 任务名称 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务名称</span>
			<input type="text" class="txt fl" name="" v-model="taskname" placeholder="请输入任务名称" maxlength="20">
			<div class="fl handle-tips">
				<i></i> 限20字内
			</div>
		</div>
		<!-- 任务时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务时间</span>
			<div class="input-box input-start">
				<!--日期组件 开始时间-->
				<calendar :time="startTime" class="data-box" @emit="startTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
			<span>-</span>
			<div class="input-box input-start">
				<!--日期组件 开始时间-->
				<calendar :time="endTime" class="data-box" @emit="endTimeChange" :format="'yyyy年MM月dd日'"></calendar>
			</div>
		</div>
		<!-- 持续时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">持续时间</span>
			<div class="rightHalf">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="4" v-model="minutes" onkeyup="value=value.replace(/[^\d]/g,'')" />
					<span>分钟</span>
				</section>
				<div class="fl handle-tips">
					<i></i> 领取任务后,在持续时间内未达成会显示任务失败
				</div>
			</div>
		</div>
		<!-- 任务类型 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务类型</span>
			<select-btn :name='taskType' :sorts="taskTypeList.map(v=>v.name)" :width="157" @selOn="seltaskType"></select-btn>
		</div>
		<!-- 消费任务 -->
		<div class="online-box clearfix" v-if="taskTypeId == '1'">
			<span class="online-sub fl"></span>
			<span class="fl" style="margin-right:13px;">消费满</span>
			<div class="rightHalf fl">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="6" v-on:blur="changeCount(consumption)" v-model="consumption" />
					<span class="fl">元</span>
				</section>
			</div>
			<span>达成任务</span>
		</div>
		<!-- 分享任务 -->
		<div class="online-box clearfix" v-if="taskTypeId == '2'">
			<span class="online-sub fl"></span>
			<span style="margin-right:13px;">进入该页面</span>
			<input type="text" class="txt" name="" placeholder="请输入网址" v-model="shareUrl">
			<span style="margin-right:13px;">点击右上角分享至</span>
			<select-btn :name='share' :sorts="shareList.map(v=>v.name)" :width="157" @selOn="selshare"></select-btn>
		</div>
		<!-- 任务介绍 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务介绍</span>
			<div id="div1" class="fl toolbar" ref="editor" style="text-align:left"></div>
		</div>
		<!-- 任务店铺 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务店铺</span>
			<a href="javascript:void(0);" class="addclassify fl" @click="choiceShop()">增加任务量</a>
		</div>
		<!-- 商品库存显示 -->
		<div class="online-box clearfix" v-show="shopstock.length > 0">
			<span class="online-sub fl"></span>
			<div class="stocklist fl">
				<ul class="heads">
					<li>操作</li>
					<li>门店名称</li>
					<li>库存数量</li>
				</ul>
				<ul class="contents" v-for="(item,index) in shopstock" v-if="item.spareStock != ''" :key="index">
					<li>
						<a href="javascript:void(0);" @click="delstockList(item,index)">删除</a>
					</li>
					<li>{{getShopname(item.shopId)}}</li>
					<li>{{item.spareStock}}</li>
				</ul>
			</div>
		</div>
		<!-- 任务奖励 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">任务奖励</span>
			<a href="javascript:void(0);" class="addclassify fl" @click="addCustom">选择奖励</a>
			<span v-if="couponCount.length > 0" class="rewardname">已选:{{couponCount}}</span>
		</div>
		<!-- 任务量 -->
		<!-- <div class="online-box clearfix">
			<span class="online-sub fl required">任务量</span>
			<input type="text" class="txt fl" name="" placeholder="请输入任务量" v-model="quota" maxlength="4" onkeyup="value=value.replace(/[^\d]/g,'')">
		</div> -->
		<!-- 人均领取次数 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">人均领取次数</span>
			<div class="rightHalf">
				<section>
					<input type="text" class="cumulative" placeholder="请输入正整数" maxlength="4" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="getnumber" />
					<span>次</span>
				</section>
			</div>
		</div>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="addTask">保存</a>
		</div>
		<!-- 选择店铺的弹窗 -->
		<component v-if="showWin" :is="ass" :shopList="shopList" @getAppliedWin='getResults' :selectshopIds='selectshopId'></component>
		<!-- 选择优惠券的弹窗 -->
		<birthCoupon v-if='showCoupon' :selectCoupon='selectCoupon' :couponList='couponList' :selectIntegral="selectIntegral" :selectIntegralgoods="selectIntegralgoods" @winEvent='winEventCoupon'></birthCoupon>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
import getAppliedWin from './mission_choiceshop';

export default {
	data() {
		return {
			userDate: '', //店铺信息
			taskTypename: '新建任务',
			ischain: '',
			startTime: '', //开始时间
			endTime: '', //结束时间
			taskType: '店内任务', //任务类型
			taskTypeList: [{
				name: '店内任务',
				id: 0
			},
			{
				name: '消费任务',
				id: 1
			},
			{
				name: '分享任务',
				id: 2
			}
			],
			taskTypeId: 0, //选中的任务类型
			share: '微信好友',
			shareList: [{
				name: '微信好友',
				id: 0
			},
			{
				name: '朋友圈',
				id: 1
			}
			],
			shopList: [], //店铺列表
			shareId: 0, //选中分享的id
			showWin: false, //选择门店的弹窗
			ass: '',
			couponList: [], //优惠券列表
			showCoupon: false,
			miCount: [], //选中的优惠券列表
			micsel: [], //每张优惠券select默认选中值
			selectCoupon: [], //优惠券选中的列表
			selectIntegral: [], //积分卡选中的
			selectIntegralgoods: [], //积分商品选中的
			couponCount: '', //优惠券张数
			taskname: '', //任务名称
			minutes: '', //持续时间
			consumption: '', //消费任务的消费金额
			shareUrl: '', //分享的链接
			introduce: '', //任务介绍
			getnumber: '', //人均领取次数
			selectshopId: '', //选择的shopId
			taskId: '', //任务id
			shopstock: [], //获取店铺任务量
			shopStock: '', //店铺库存
			editorContent: '' //富文本内容
		};
	},
	methods: {
		returnType: function() {
			this.$router.push('/admin/Task');
		},
		startTimeChange(time) {
			//开始时间
			this.startTime = time;
		},
		endTimeChange(time) {
			//结束时间
			this.endTime = new Date(time).setHours(23, 59, 59, 999);
		},
		seltaskType: function(i) {
			this.taskType = this.taskTypeList[i].name; //点击卡类型对应的名字
			this.taskTypeId = this.taskTypeList[i].id; //点击卡类型对应的id
		},
		selshare: function(i) {
			this.share = this.shareList[i].name; //点击卡类型对应的名字
			this.shareId = this.shareList[i].id; //点击卡类型对应的id
		},
		getResults: function(res, item) {
			if (res == 'ok') {
				for (let i = 0; i < item.length; i++) {
					let shopId = item[i].id;
					let stock = item[i].quota;
					let status = item[i].status;
					this.shopstock[i] = {
						shopId: shopId,
						spareStock: stock,
						status: status
					};
				}
			}
			this.showWin = false;
		},
		choiceShop: function() {
			this.showWin = true; //打开弹窗
			this.ass = 'getAppliedWin';
			for (let i = 0; i < this.shopstock.length; i++) {
				for (let j = 0; j < this.shopList.length; j++) {
					if (this.shopList[j].id == this.shopstock[i].shopId) {
						this.shopList[j].quota = this.shopstock[i].spareStock;
					}
				}
			}
		},
		//关联优惠券弹窗
		async addCustom() {
			let data = await http.getTaskcoupon({
				data: {}
			});
			this.goodsCom = data;
			this.goodsCom.forEach(function(item) {
				item.num = 1;
			});
			this.couponList = this.goodsCom;
			this.showCoupon = true;
		},
		winEventCoupon(obj) {
			this.showCoupon = false;
			if (obj.status == 'ok') {
				this.selectCoupon = obj.data.couponselect; //优惠券选中的
				this.selectIntegral = obj.data.integralCardselect; //积分卡
				this.selectIntegralgoods = obj.data.creditCardselect; //积分商品
				this.couponList = obj.data.list;
				this.getrewardname();
			}
		},
		getrewardname: function() {
			let rewardname = '';
			for (let item of this.selectCoupon) {
				rewardname += item.name + ',';
			}
			for (let item of this.selectIntegral) {
				rewardname += item.name + ',';
			}
			for (let item of this.selectIntegralgoods) {
				rewardname += item.name + ',';
			}
			this.couponCount = rewardname.substring(0, rewardname.length - 1);
		},
		checkForm() {
			//合格返回true
			let reg3 = /^([0-9])+(\.[0-9]+)?$/;
			let reg4 = /^[1-9]\d*$/;
			if (!global.checkData({
				taskname: {
					cond: '$$.length>0',
					pro: '请输入任务名称'
				},
				minutes: {
					cond: `$$.length > 0 && ((/^[1-9]\\d*$/).test($$))`,
					pro: '请输入持续时间(非零正整数)'
				},
				editorContent: {
					cond: '$$.length>0',
					pro: '请填写任务介绍(1-200字)'
				},
				shopStock: {
					cond: 'Object.keys($$).length > 0',
					pro: '请增加任务量'
				},
			},
			this
			))
				return false;
			if (
				this.startTime < new Date().setHours(0, 0, 0, 0) ||
				this.endTime < this.startTime
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '任务开始时间应大于当前时间,任务的结束时间应该大于任务的开始时间'
				});
				return false;
			}
			if (
				this.selectCoupon == '' &&
				this.selectIntegral == '' &&
				this.selectIntegralgoods == ''
			) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请选择任务奖励'
				});
				return false;
			}
			if (this.getnumber == '' || !reg4.test(this.getnumber)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '请输入人均领取次数(1-9999)'
				});
				return false;
			}
			if (this.taskTypeId == '1') {
				if (!reg3.test(this.consumption)) {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '消费金额为非负数'
					});
					return false;
				}
				if (this.consumption == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请输入消费金额'
					});
					return false;
				}
			}
			if (this.taskTypeId == '2') {
				if (this.shareUrl == '') {
					this.$store.commit('setWin', {
						title: '提示信息',
						winType: 'alert',
						content: '请输入网址'
					});
					return false;
				}
				if (this.isURL(this.shareUrl)) {
					this.$store.commit('setWin', {
						title: '温馨提示',
						winType: 'alter',
						content: 'url地址格式错误！'
					});
					return false;
				}
			}
			return true;
		},
		async addTask() {
			this.mergeObject(); //合并对象
			if (!this.checkForm()) return;
			let obj = {
				coupon: this.selectCoupon,
				pointCard: this.selectIntegral,
				pointGoods: this.selectIntegralgoods
			};
			let data = await http.addTaskSystem({
				data: {
					taskId: this.taskId, //任务id
					taskName: this.taskname, //任务名称
					startTime: parseInt(this.startTime / 1000), //开始时间
					endTime: parseInt(this.endTime / 1000), //结束时间
					durationTime: this.minutes, //任务持续时间
					type: this.taskTypeId, //任务类型0 店内任务 1 消费任务 2分享任务
					describe: this.editorContent, //任务介绍
					amount: this.consumption, //达成消费任务的金额
					perLimit: this.getnumber, //人均领取次数
					shareUrl: this.shareUrl, //分享任务网址
					shareAddress: this.shareId, //0微信好友 1朋友圈
					couponIds: obj, //优惠券 积分卡，积分商品信息存为json字符串
					shopTasks: this.shopStock //门店任务
				}
			});
			if (data) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存成功'
				});
				this.returnType();
			}
		},
		delstockList(item, index) {
			//删除库存
			if (item.status) {
				this.$store.commit('setWin', {
					content: `已领取过的任务量无法删除只可以修改`,
					winType: 'alert',
					title: '操作提示'
				});
				return false;
			}
			let count = 0;
			for (let i = 0; i < this.shopstock.length; i++) {
				if (this.shopstock[i].spareStock != '') {
					count++;
				}
			}
			if (count <= 1) {
				this.$store.commit('setWin', {
					content: `请保持至少有一家门店有任务`,
					winType: 'alert',
					title: '操作提示'
				});
				return false;
			}
			this.shopstock.splice(index, 1);
			if (item) {
				for (let i = 0; i < this.shopList.length; i++) {
					if (item.shopId == this.shopList[i].id) {
						this.shopList[i].quota = '';
					}
				}
			}
		},
		getShopname: function(id) {
			let shopname = '';
			for (let item of this.shopList) {
				if (item.id == id) {
					shopname = item.shopName || item.name;
				}
			}
			return shopname;
		},
		isURL(url) {
			let urlRegExp = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[/=?%\-&_~`@[\]':+!]*([^<>"'])*$/;
			if (!urlRegExp.test(url)) {
				return true;
			} else {
				return false;
			}
		},
		changeCount: function(x) {
			let f = Math.round(x * 100) / 100;
			let s = f.toString();
			if (isNaN(s)) s = '';
			this.consumption = s;
		},
		mergeObject: function() {
			let obj = {};
			for (let i = 0; i < this.shopstock.length; i++) {
				//传给后台的数据
				if (this.shopstock[i].spareStock != '') {
					let id = this.shopstock[i].shopId;
					let shopStocks = this.shopstock[i].spareStock;
					this.shopStock = Object.assign(obj, {
						[id]: shopStocks
					});
				}
			}
		},
		async shopTaskList() {
			let data = await http.shopTaskList({
				data: {
					taskId: this.taskId //任务id
				}
			});
			this.shopstock = data; //店铺库存
			for (let i = 0; i < this.shopstock.length; i++) {
				this.shopstock[i].status = true;
				for (let j = 0; j < this.shopList.length; j++) {
					if (this.shopList[j].id == this.shopstock[i].shopId) {
						this.shopList[j].quota = this.shopstock[i].spareStock;
						this.shopList[j].status = this.shopstock[i].status; //是否编辑的状态
					} else {
						this.shopList[j].quota = '';
					}
				}
			}
		},
		/**  
		 * 产生随机整数，包含下限值，但不包括上限值  
		 * @param {Number} lower 下限  
		 * @param {Number} upper 上限  
		 * @return {Number} 返回在下限到上限之间的一个随机整数  
		 */
		random: function(lower, upper) {
			return Math.floor(Math.random() * (upper - lower)) + lower;
		}
	},
	components: {
		getAppliedWin,
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_type'*/ 'src/components/calendar_type'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
		birthCoupon: () =>
			import ( /* webpackChunkName:'activity_birth_coupon' */ './mission_choicecoupon')
	},
	async mounted() {
		let token = storage.session('token'); //token
		let shopId = storage.session('shopId'); //shopId
		let oid = this.random(1, 100).toString();
		let uploadUrl = storage.session('userShop').uploadUrl;
		let editor = await
		import ( /* webpackChunkName:'wang_editor' */ 'src/components/wang_editor.js');

		let wangEditor = new editor.default('#div1');
		// wangEditor.customConfig.uploadImgServer = 'http://v5.qa.ishandian.com.cn/shop/image/uploadImage?oid=1&format=script&token=29-67nmfSxvpZn6Zcxzwln7Mi12Oc4Dfmdc&type=8&shopId=1';
		wangEditor.customConfig.uploadImgServer = global.host.shop + 'image/uploadImage?oid=' + oid + '&format=script&token=' + token + '&type=8&shopId=' + shopId;
		// wangEditor.customConfig.uploadImgServer = "http://192.168.31.68:8000/weixin/image/testUploadOffice?format=json&token=100026-TEMsnX7VAoU2PT35ehcFASASnxvDdiiz&shopId=10062";
		wangEditor.customConfig.uploadFileName = 'image';
		wangEditor.customConfig.onchange = html => {
			this.editorContent = html;
		};
		wangEditor.customConfig.uploadImgHooks = {
			customInsert: function(insertImg, result,isFile) {
				!isFile&&insertImg(uploadUrl + result.data);
			}
		};
		wangEditor.create();
		this.$store.commit('setPageTools', {
			back: () => {
				this.returnType();
			}
		});
		this.userDate = storage.session('userShop');
		this.ischain = storage.session('userShop').currentShop.ischain;
		this.startTime = new Date().setHours(0, 0, 0, 0);
		this.endTime = new Date().setHours(23, 59, 59, 999);
		if (this.ischain == '3') {
			this.shopList = storage.session('shopList');
		} else if (this.ischain == '0') {
			this.shopList.push(storage.session('userShop').currentShop);
		}
		for (let item of this.shopList) {
			item.name = item.shopName ? item.shopName : item.name;
			item.quota = ''; //任务量
			item.status = false; //状态
		}
		if (storage.session('type') == 'edi') {
			this.taskTypename = '编辑任务';
			let detail = storage.session('taskdetail');
			this.taskId = detail.id; //任务的id
			this.taskname = detail.taskName; //任务名称
			this.startTime = detail.startTime * 1000; //开始时间
			this.endTime = detail.endTime * 1000; //结束时间
			this.minutes = detail.durationTime; //持续时间
			this.taskTypeId = Number(detail.type); //任务类型
			this.taskType = this.taskTypeList[this.taskTypeId].name; //任务类型的名字
			this.consumption = detail.amount; //消费任务
			this.shareUrl = detail.shareUrl; //分享链接
			this.shareId = Number(detail.shareAddress); //分享类型
			this.share = this.shareList[this.shareId].name; //分享的名字
			this.quota = detail.taskNum; //任务量
			this.getnumber = detail.perLimit; //人均领取次数
			this.selectCoupon = detail.couponIds.coupon;
			this.selectIntegral = detail.couponIds.pointCard;
			this.selectIntegralgoods = detail.couponIds.pointGoods;
			this.getrewardname();
			this.editorContent = detail.describe;
			wangEditor.txt.html(this.editorContent);
			console.log(this.editorContent);
			console.log(wangEditor.txt.html(this.editorContent));
			this.shopTaskList();
		}
	}
};
</script>
<style type="text/css" scoped>
#addmision {
	width: 1200px;
	height: auto;
}

.toolbar {
	width: 691px;
	height: 350px;
}

#addmision .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#addmision .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 100px;
	font-size: 16px;
	text-align: left;
}

#addmision .set-line .line {
	display: inline-block;
	width: 870px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#addmision .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
	line-height: 40px;
}

#addmision .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#addmision .online-box .txt {
	width: 210px;
	height: 40px;
	text-indent: 10px;
	margin-right: 13px;
}

#addmision .online-box .rewardname {
	display: inline-block;
	width: 400px;
	height: 40px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#addmision .online-box .addclassify {
	margin-right: 31px;
}

#addmision .online-box .input-box {
	display: inline-block;
	vertical-align: middle;
}

#addmision .online-box .stocklist {
	width: 685px;
	min-height: 40px;
	border: 1px solid #d2d2d2;
}

#addmision .online-box .stocklist .heads {
	width: 100%;
	height: 40px;
	background: #f2f2f2;
}

#addmision .online-box .stocklist .heads li {
	width: 33.33%;
	float: left;
	text-align: center;
	line-height: 40px;
}

#addmision .online-box .stocklist .contents {
	width: 100%;
	height: 60px;
	border-bottom: 2px solid #f2f2f2;
}

#addmision .online-box .stocklist .contents li {
	float: left;
	text-align: center;
	height: 60px;
	line-height: 60px;
	width: 33.33%;
}

#addmision .online-box .stocklist .contents li:nth-child(1) a {
	color: #ff3d04;
}

#addmision .online-box .stocklist .contents li:nth-child(2) {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

#addmision .handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 25px;
	background: url('../../../src/res/images/prompt.png') 0 center no-repeat;
	color: #999999;
}

#addmision .online-box .rightHalf {
	overflow: hidden;
	height: auto;
	float: left;
}

#addmision .online-box .rightHalf section {
	width: 210px;
	height: 38px;
	border: 1px solid #cecdcd;
	margin-right: 16px;
	float: left;
}

#addmision .online-box .rightHalf section .cumulative {
	width: 150px;
	height: 36px;
	border: none;
	float: left;
	outline: none;
	text-indent: 17px;
}

#addmision .online-box .rightHalf section span {
	display: block;
	float: left;
	width: 58px;
	height: 37px;
	text-align: center;
	line-height: 38px;
	border-left: 1px solid #cecdcd;
}

#addmision .online-box .txtarea {
	width: 374px;
	height: 181px;
	padding: 14px;
	resize: none;
}
</style>