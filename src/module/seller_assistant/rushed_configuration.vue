/** * 疯抢配置 * *miaochuan.sha */
<template>
	<div id="rushedConfiguration">
		<!-- 疯抢配置 -->
		<div class="set-line">
			<div class="titles">疯抢配置</div>
			<div class="line"></div>
		</div>
		<!-- 疯抢开关 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">疯抢开关</span>
			<onOff :key='1' :status="flipSwitch" @statusChange="openflipSwitch"></onOff>
		</div>
		<!-- 疯抢时间 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">疯抢时间</span>
			<section class="tableListInp fl">
				<calendar :pObj="startObj" @throwTime="getStartTime">
				</calendar>
			</section>
			<span class="fl interval">-</span>
			<section class="tableListInp fl">
				<calendar :pObj="endObj" @throwTime="getEndTime"></calendar>
			</section>
		</div>
		<!-- 过期时间 -->
		<div class="online-box clearfix" style="margin-bottom: 10px;">
			<span class="online-sub fl required">过期时间</span>
			<select-btn :name='expirationTime' :sorts="expirationTimeList.map(v=>v.name)" :width="157" @selOn="selexpirationTime"></select-btn>
			<span style="margin-left:10px;">分钟</span>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 10px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				客户如在规定时间内未完成支付,系统将在过期时间1分钟后取消订单,并返回库存至商品。
			</div>
		</div>
		<!-- 重要提示 -->
		<div class="online-box clearfix" style="margin-bottom: 10px;">
			<span class="online-sub fl">重要提示</span>
			<textarea class="txt fl" placeholder="请输入重要提示" maxlength="100" v-model="importantNote"></textarea>
		</div>
		<div class="online-box clearfix" style="margin-bottom: 10px;">
			<span class="online-sub fl"></span>
			<div class="fl handle-tips">
				<i></i>
				显示在顾客兑换详情中的重要声明(限字100)
			</div>
		</div>
		<!-- 抢购次数 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">抢购次数</span>
			<div class="fl dolls">
				<input type="text" name="" class="fl" placeholder="请输入数字" v-model="snapNumber" maxlength="2" onkeyup="value=value.replace(/[^0-9\.]/g,'')"
				/>
				<span class="fl">次</span>
			</div>
			<div class="fl handle-tips">
				<i></i>
				一次疯抢活动中，用户最多可抢购99次，0为不限制
			</div>
		</div>
		<!-- 订阅提醒 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">订阅提醒</span>
			<section class="fl">
				<select-btn :name='subscribeTime' :sorts="subscribeTimeList.map(v=>v.name)" :width="157" @selOn="selsubscribeTime"></select-btn>
			</section>
			<span class="fl subscribe">分钟</span>
			<div class=" fl handle-tips">
				<i></i>
				提前提醒顾客开抢
			</div>
		</div>
		<!-- 等待时图片-->
		<div class="online-box clearfix">
			<span class="fl online-sub required">等待时提示图片</span>
			<div class="uploadImgs fl">
				<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
				<form enctype="multipart/form-data" id="waitImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					    @change="bgNameChange('',1,'waitImage')" />
				</form>
			</div>
			<div class="fl handle-tips">
				<i></i>
				尺寸 750px*300px
			</div>
		</div>
		<!-- 等待时图片显示-->
		<div class="online-box clearfix" v-if="waitingImage != ''">
			<span class="fl online-sub"></span>
			<div class="uploadImg fl">
				<img alt="logo" v-bind:src="uploadUrl  + waitingImage" />
			</div>
			<div class="fl updateName">(已上传:{{waitingImageName}})</div>
		</div>
		<!-- 开始时图片-->
		<div class="online-box clearfix">
			<span class="fl online-sub required">开始时提示图片</span>
			<div class="uploadImgs fl">
				<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
				<form enctype="multipart/form-data" id="startImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					    @change="bgNameChange('',2,'startImage')" />
				</form>
			</div>
			<div class="fl handle-tips">
				<i></i>
				尺寸 750px*300px
			</div>
		</div>
		<!-- 开始时图片显示-->
		<div class="online-box clearfix" v-if="startingImage != ''">
			<span class="fl online-sub"></span>
			<div class="uploadImg fl">
				<img alt="logo" v-bind:src="uploadUrl  + startingImage" />
			</div>
			<div class="fl updateName">(已上传:{{startingImageName}})</div>
		</div>
		<!-- 结束图片-->
		<div class="online-box clearfix">
			<span class="fl online-sub required">结束时提示图片</span>
			<div class="uploadImgs fl">
				<a href="javascript:void(0);" class="addclassify fl" style="margin-right: 15px;">上传图片</a>
				<form enctype="multipart/form-data" id="endImage">
					<input type="file" id="bg_upload" accept="image/jpeg,image/png,image/gif,image/tiff" name="image" onclick="this.value = ''"
					    @change="bgNameChange('',3,'endImage')" />
				</form>
			</div>
			<div class="fl handle-tips">
				<i></i>
				尺寸 750px*300px
			</div>
		</div>
		<!-- 结束时图片显示-->
		<div class="online-box clearfix" v-if="endingImage != ''">
			<span class="fl online-sub"></span>
			<div class="uploadImg fl">
				<img alt="logo" v-bind:src="uploadUrl  + endingImage" />
			</div>
			<div class="fl updateName">(已上传:{{endingImageName}})</div>
		</div>
		<!-- 疯抢开关 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<a href="javascript:void(0);" class="blue fl" style="width: 200px;" @click="saveConfig()">保存</a>
		</div>
	</div>
</template>
<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
import global from 'src/manager/global';
export default {
	data() {
		return {
			shopId: '', //店铺Id
			flipSwitch: true, //疯抢商品开关
			startObj: {
				time: new Date().setHours(0, 0, 0, 0),
			}, //日期组件的开始时间
			endObj: {
				time: new Date().setHours(23, 59, 59, 999)
			}, //日期组件的结束时间
			expirationTimeList: [
				{ //过期时间
					name: '5',
					id: 0
				}, {
					name: '10',
					id: 1
				},
				{
					name: '15',
					id: 2
				},
				{
					name: '20',
					id: 3
				},
				{
					name: '25',
					id: 4
				},
				{
					name: '30',
					id: 5
				}
			],
			expirationTimeId: '0',
			expirationTime: '5', //过期时间显示
			subscribeTimeList: [
				{
					name: '0',
					id: 1
				}, { //订阅提醒
					name: '5',
					id: 2
				}, {
					name: '10',
					id: 3
				},
				{
					name: '15',
					id: 4
				},
				{
					name: '20',
					id: 5
				},
				{
					name: '25',
					id: 6
				},
				{
					name: '30',
					id: 7
				}
			],
			subscribeTimeId: '0',
			subscribeTime: '0', //订阅提醒
			snapNumber: '', // 抢购次数
			uploadUrl: '',
			waitingImage: '', //等待时图片路径
			waitingImageName: '', //等待时片名称
			startingImage: '', //开始时图片
			startingImageName: '', //开始时图片名称
			endingImage: '', //结束时图片
			endingImageName: '', //结束时图片名称
			importantNote: '' //重要提示
		};
	},
	methods: {
		openflipSwitch: function (res) {
			this.flipSwitch = res; //是否开启疯抢
		},
		getStartTime: function (receiveTime) { //选择开始时间
			this.startObj.time = (new Date(receiveTime)).getTime(); //毫秒
		},
		getEndTime: function (receiveTime) { //选择
			this.endObj.time = (new Date(receiveTime)).getTime(); //毫秒
		},
		checkForm() { //合格返回true
			if (!global.checkData(
				{
					'snapNumber': {
						cond: '$$.length>0 && ((/^[0-9][0-9]{0,1}$/).test($$))',
						pro: '请输入抢购次数,0-99正整数'
					},
				}, this)) return false;
			if (this.flipSwitch == true && (this.startObj.time < new Date().getTime() || this.endObj.time < this.startObj.time)) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '疯抢开始时间应大于当前时间，并且疯抢结束时间应大于疯抢开始时间',
				});
				return false;
			}
			return true;
		},
		selexpirationTime: function (i) {
			this.expirationTime = this.expirationTimeList[i].name; //点击卡类型对应的名字
			this.expirationTimeId = this.expirationTimeList[i].id; //点击卡类型对应的id
		},
		selsubscribeTime: function (i) {
			this.subscribeTime = this.subscribeTimeList[i].name; //点击卡类型对应的名字
			this.subscribeTimeId = this.subscribeTimeList[i].id; //点击卡类型对应的id
		},
		async saveConfig() {
			if (!this.checkForm()) return;
			let data = await http.openAndClose({
				data: {
					startTime: this.startObj.time / 1000, //开始时间 
					endTime: this.endObj.time / 1000, //结束时间
					expireTime: this.expirationTime, //过期时间
					statement: this.importantNote, //重要提示
					grabCount: this.snapNumber, //抢购次数
					remindTime: this.subscribeTime, //订阅提醒
					waitImage: this.waitingImage, //等待时的图片
					startImage: this.startingImage, //开始时图片
					endImage: this.endingImage, //结束时图片
					status: Number(this.flipSwitch) //状态
				}
			});
			if (data == true) {
				this.$store.commit('setWin', {
					title: '提示信息',
					winType: 'alert',
					content: '保存成功',
				});
				this.getConfig();
			}
		},
		async getConfig() { //获取配置
			let data = await http.buyconfiget({
				data: {}
			});
			if (data && data != '') {
				this.flipSwitch = Boolean(Number(data.status)); //疯抢开关
				this.startObj.time = data.startTime * 1000; //开始时间
				this.endObj.time = data.endTime * 1000; //结束时间
				this.expirationTime = data.expireTime; //过期时间
				this.importantNote = data.statement; //重要提示
				this.snapNumber = data.grabCount; //抢购次数
				this.subscribeTime = data.remindTime; //订阅提醒
				this.waitingImage = data.waitImage; //等待时的图片
				this.waitingImageName = this.waitingImage.substring(this.waitingImage.lastIndexOf('/') + 1, this.waitingImage.length);
				this.startingImage = data.startImage; //开始时的图片
				this.startingImageName = this.startingImage.substring(this.startingImage.lastIndexOf('/') + 1, this.startingImage
					.length);
				this.endingImage = data.endImage; //结束时的图片
				this.endingImageName = this.endingImage.substring(this.endingImage.lastIndexOf('/') + 1, this.endingImage.length);
			}
		},
		async bgNameChange(imgJson, type, id) {
			// 上传图片 背景图片回调
			let res = await http.uploadImg({
				data: {
					type: 8,
					shopId: this.shopId
				},
				formId: id,
			});
			let bgName = '';
			switch (type) {
				case 1:
					this.waitingImage = res;
					bgName = this.waitingImage.lastIndexOf('/');
					this.waitingImageName = this.waitingImage.substring(bgName + 1, this.waitingImage.length);
					break;
				case 2:
					this.startingImage = res;
					bgName = this.startingImage.lastIndexOf('/');
					this.startingImageName = this.startingImage.substring(bgName + 1, this.startingImage.length);
					break;
				case 3:
					this.endingImage = res;
					bgName = this.endingImage.lastIndexOf('/');
					this.endingImageName = this.endingImage.substring(bgName + 1, this.endingImage.length);
					break;
			}
		}
	},
	watch: {

	},
	components: {
		onOff: () =>
			import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
		calendar: () =>
			import ( /*webpackChunkName: 'calendar_result'*/ 'src/components/calendar_result'),
		selectBtn: () =>
			import ( /* webpackChunkName:'select_btn' */ 'src/components/select_btn'),
	},
	mounted() {
		this.uploadUrl = storage.session('userShop').uploadUrl;
		this.shopId = storage.session('userShop').currentShop.id;
		this.getConfig();
	}
};
</script>
<style type="text/css" scoped>
	#rushedConfiguration {
		width: 1200px;
		height: auto;
	}

	#rushedConfiguration .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#rushedConfiguration .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 70px;
		font-size: 16px;
		text-align: left;
	}

	#rushedConfiguration .set-line .line {
		display: inline-block;
		width: 900px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#rushedConfiguration .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#rushedConfiguration .online-box .subscribe {
		margin-left: 10px;
		line-height: 40px;
		margin-right: 10px;
	}

	#rushedConfiguration .online-box .online-sub {
		display: block;
		width: 120px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
		font-size: 16px;
	}

	#rushedConfiguration .clearfix::before,
	#rushedConfiguration .clearfix::after {
		display: table;
		content: “”;
	}

	#rushedConfiguration .clearfix::after {
		clear: both;
	}

	/*日期组件*/

	#rushedConfiguration .statisticsList .tableListInp {
		box-sizing: content-box;
		overflow: hidden;
	}

	#rushedConfiguration .statisticsList .tableListInp div {
		width: 199px;
		height: 38px;
		float: left;
	}

	#rushedConfiguration .interval {
		display: block;
		width: 14px;
		text-align: center;
		height: 40px;
		line-height: 40px;
	}

	/*三角形-所有的边框线*/

	#rushedConfiguration .online-box .dolls {
		width: 157px;
		height: 40px;
		border: 1px solid #D2D2D2;
		margin-right: 29px;
	}

	#rushedConfiguration .online-box .dolls input {
		width: 115px;
		height: 38px;
		border: none;
		text-indent: 10px;
	}

	#rushedConfiguration .online-box .dolls span {
		display: inline-block;
		width: 40px;
		height: 38px;
		text-align: center;
		line-height: 40px;
		border-left: 1px solid #D2D2D2;
	}

	#rushedConfiguration .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#rushedConfiguration .online-box .txt {
		width: 374px;
		height: 181px;
		padding: 14px;
		resize: none;
	}

	#rushedConfiguration .online-box .uploadImg {
		width: 210px;
		height: 150px;
		border: 1px solid #b0b0b0;
		overflow: hidden;
		margin-right: 10px;
	}

	#rushedConfiguration .online-box .updateName {
		line-height: 150px;
	}

	#rushedConfiguration .online-box .uploadImg img {
		display: block;
		width: 100%;
		height: 100%;
	}

	#rushedConfiguration .online-box .uploadImgs {
		position: relative;
	}

	#rushedConfiguration .online-box .uploadImgs input {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>