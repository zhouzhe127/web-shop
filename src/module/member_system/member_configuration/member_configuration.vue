<template>
	<div id="member_configura">
		<!-- 会员获得积分设置 -->
		<div class="set-line">
			<div class="titles">会员获得积分设置</div>
			<div class="line"></div>
		</div>
		<!-- 参与积分 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">参与积分</span>
			<div class="rightHalf">
				<el-switch v-model="integralState" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 积分比例 -->
		<div class="online-box clearfix" v-if="integralState">
			<span class="online-sub fl required">积分比例</span>
			<div class="rightHalf">
				<el-input v-model="cash" maxlength="6" placeholder="请输入现金" style="width:179px;" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
				<span>:</span>
				<el-input v-model="point" maxlength="6" placeholder="请输入积分" style="width:179px;" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
			</div>
		</div>
		<!-- 积分永久有效 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">积分永久有效</span>
			<div class="rightHalf">
				<el-switch v-model="pointState" active-color="#E1BB4A" inactive-color="#dcdfe6">
				</el-switch>
			</div>
		</div>
		<!-- 积分清零时间 -->
		<div class="online-box clearfix" v-if="!pointState">
			<span class="online-sub fl">积分清零时间</span>
			<div class="rightHalf">
				<el-date-picker v-model="expirationTime" type="date" placeholder="选择日期" :clearable="false" :editable="false" format="MM 月 dd 日">
				</el-date-picker>
			</div>
		</div>
		<!-- 会员获得积分设置 -->
		<div class="set-line">
			<div class="titles">电子卡设置</div>
			<div class="line"></div>
		</div>
		<!-- 电子卡适用门店 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">电子卡适用门店</span>
			<div class="rightHalf" v-if="ischain == '3'">
				<el-button type="primary" icon="el-icon-plus" @click="openActivityWin('1')" style="width:179px;">关联门店</el-button>
				<span v-if="useShopIds.length >= 1">(已选择{{useShopIds.length}}家店铺)</span>
			</div>
			<div class="rightHalf" v-else>
				<span class="obj">{{shopName}}</span>
			</div>
		</div>
		<!-- 电子卡适用门店 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">电子卡储值门店</span>
			<div class="rightHalf" v-if="ischain == '3'">
				<el-button type="primary" icon="el-icon-plus" @click="openActivityWin('2')" style="width:179px;">关联门店</el-button>
				<span v-if="rechargeShopIds.length >= 1">(已选择{{rechargeShopIds.length}}家店铺)</span>
			</div>
			<div class="rightHalf" v-else>
				<span class="obj">{{shopName}}</span>
			</div>
		</div>
		<!-- 电子卡适用门店 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<el-button type="primary" style="width:179px;" @click="saveConfig">保存</el-button>
			</div>
		</div>
		<!-- 关联门店 -->
		<elShopListWin :shopIds="selectShopIds" @chooseShop="getShopResult" v-if="showShop"></elShopListWin>
	</div>
</template>
<script type="text/javascript">
import http from 'src/manager/http';
import utils from 'src/verdor/utils';
import storage from 'src/verdor/storage';

export default {
	data() {
		return {
			ischain: 0, //3为品牌 0为单店
			shopName: '', //单店的名称
			shopId: '', //单店的shopId
			integralState: false, //积分状态
			cash: '', //现金
			point: '', //积分
			pointState: false, //积分永久有效
			expirationTime: (new Date()).setHours(0, 0, 0, 0) - 86400000, //重置时间 
			showShop: false,
			allShopList: [], //所有的店铺列表
			useShopIds: [], //适用门店
			rechargeShopIds: [], //储值门店
			selectShopIds: [], //选中的店铺id
			selectType: '' //选中的type
		};
	},
	methods: {
		validata(content, winType = 'alert', title = '提示信息') {
			// 验证
			this.$store.commit('setWin', {
				content: content,
				title: title,
				winType: winType
			});
		},
		getShopResult: function(res, selectIds) { //选择门店的回调
			if (res == 'ok') {
				if (selectIds.length == 0) {
					this.validata('请至少选择一家店铺');
					return false;
				}
				if (this.selectType == '1') {
					this.useShopIds = selectIds;
				} else {
					this.rechargeShopIds = selectIds;
				}
			}
			this.showShop = false;
		},
		openActivityWin: function(type) { //打开门店的弹窗
			this.selectType = type;
			if (type == '1') {
				this.selectShopIds = this.useShopIds;
			} else {
				this.selectShopIds = this.rechargeShopIds;
			}
			this.showShop = true;
		},
		saveConfig: function() { //保存配置
			this.setPointConfig();
		},
		chekForm: function() {
			if (this.integralState && (this.cash < 1 || this.point < 1)) {
				this.validata('请填写现金比例或者积分比例,积分比例需大于0');
				return false;
			}
			return true;
		},
		async setPointConfig() { //保存积分配置
			if (!this.chekForm()) return;
			let expirationTime = 0;
			if (!this.pointState) {
				expirationTime = this.expirationTime / 1000;
			}
			let useShopIds = '';
			let rechargeShopIds = '';
			if (this.ischain == '3') {
				useShopIds = this.useShopIds.join(',');
				rechargeShopIds = this.rechargeShopIds.join(',');
			} else {
				useShopIds = this.shopId;
				rechargeShopIds = this.shopId;
			}
			let res = await http.setPointConfig({
				data: {
					status: Number(this.integralState), //参与积分状态
					cash: this.cash, //现金比例
					point: this.point, //积分比例
					expirationTime: expirationTime, //积分过期时间
					spreaderPoint: '',
					followerPoint: '',
					useShopIds: useShopIds, //适用门店
					rechargeShopIds: rechargeShopIds //储值门店
				}
			});
			if (res) {
				this.validata('保存成功');
				this.getPointConfig();
			}
		},
		async getShopList() { //获取所有的店欧列表
			let data = await http.getShopList({});
			if (data) {
				this.allShopList = data;
				this.useShopIds = [];
				this.rechargeShopIds = [];
				for (let item of data) {
					this.useShopIds.push(item.id);
					this.rechargeShopIds.push(item.id);
				}
			}
		},
		async getPointConfig() { //获取积分配置
			let res = await http.getPointConfig({});
			if (res) {
				let list = res.list;
				this.integralState = Boolean(Number(list.status)); //参与积分的开关
				this.cash = list.cash; //现金比例
				this.point = list.point; //积分比例
				if (list.expirationTime == '0') {
					this.pointState = true; //积分永久有效
				} else {
					this.expirationTime = list.expirationTime * 1000; //积分清除时间
				}
				this.useShopIds = list.useShopIds.split(','); //适用门店
				this.rechargeShopIds = list.rechargeShopIds.split(','); //储值门店
			}
		}
	},
	async mounted() {
		let userData = storage.session('userShop');
		this.ischain = userData.currentShop.ischain;
		this.shopName = userData.currentShop.name;
		this.shopId = userData.currentShop.id;
		await this.getShopList();
		this.getPointConfig();
	},
	components: {
		elShopListWin: () =>
			import( /* webpackChunkName:'el_shopList_win' */ 'src/components/el_shopList_win')
	}
};
</script>
<style type="text/css" scoped>
#member_configura {
	max-width: 1400px;
	height: auto;
}

#member_configura .set-line {
	width: 1000px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#member_configura .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 150px;
	font-size: 16px;
	text-align: left;
}

#member_configura .set-line .line {
	display: inline-block;
	width: 800px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#member_configura .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#member_configura .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 150px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#member_configura .online-box .rightHalf {
	max-width: 900px;
	min-height: 40px;
	float: left;
	line-height: 40px;
}

#member_configura .online-box .rightHalf .obj {
	padding: 0 10px;
	display: inline-block;
	min-width: 179px;
	height: 40px;
	background: #f8f8f8;
	line-height: 40px;
	text-align: center;
	border-radius: 4px;
}
</style>