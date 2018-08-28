<template>
	<div id="merchants">
		<!-- 小程序授权步骤 -->
		<div class="set-line">
			<div class="titles">小程序授权步骤</div>
			<div class="line"></div>
		</div>
		<!-- 1 -->
		<div class="first">
			<span class="round">1</span>
			<span class="theText">将微信小程序授权给闪店,系统会自动生成店铺小程序,并提交到微信审核;您不需要做复杂操作,即可获得店铺的微信小程序。</span>
		</div>
		<!-- 授权微信小程序 -->
		<div class="verticalBar">
			<div class="vertical fl">
				<span></span>
			</div>
			<div class="onRight fl clearfix">
				<a href="javascript:void(0)" class="blue btn fl">授权微信小程序</a>
				<div class="fl handle-tips">
					<i></i> 注:你的小程序的主题必须是【企业】,并开通了微信支付,才能具备支付权限。
				</div>
			</div>
		</div>
		<!-- 2 -->
		<div class="first">
			<span class="round">2</span>
			<span class="theText">如果还没有注册微信小程序,点击按钮注册;注册成功后,再授权给闪店即可。
			</span>
		</div>
		<div class="verticalBar">
			<div class="vertical fl"></div>
			<div class="onRight fl clearfix">
				<a href="javascript:void(0)" class="blue btn fl">注册小程序</a>
			</div>
		</div>
		<!-- 设置微信支付 -->
		<div class="set-line">
			<div class="titles">设置微信支付</div>
			<div class="line"></div>
		</div>
		<!-- 小程序 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">小程序:</span>
			<div class="rightHalf">
				<span class="fl name">小程序的名称</span>
				<a href="javascript:void(0)" class="blue abtn fl">重新授权</a>
				<a href="javascript:void(0)" class="gray abtn fl">解除授权</a>
			</div>
		</div>
		<!-- 微信支付 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">微信支付:</span>
			<div class="rightHalf">
				<span class="fl name">目前小程序仅支持微信原生支付,你可以在【小程序后台-微信支付】页面下申请开通并完成相关配置。小程序的主体必须为企业,才可以申请微信支付;如果你的小程序不是企业主体,请另注册一个新的小程序,重新授权给闪店即可。完成设置后,请填写你的商户号和商户秘钥。</span>
			</div>
		</div>
		<!-- 商户号 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">商户号</span>
			<div class="rightHalf">
				<input type="text" class="merchants fl" placeholder="请输入商户号" v-model='number' maxlength="10" />
				<div class="fl handle-tips">
					<i></i> 商户号必须为8位或10位数字
				</div>
			</div>
		</div>
		<!-- 商户秘钥 -->
		<div class="online-box clearfix">
			<span class="online-sub fl">商户秘钥</span>
			<div class="rightHalf">
				<input type="text" class="merchants fl" placeholder="请输入商户秘钥" v-model='secret' maxlength="32" />
				<div class="fl handle-tips">
					<i></i> 商户秘钥必须为32位
				</div>
			</div>
		</div>
		<!-- 确认 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="businessHours">
				<div @click="selectBusinessHours" :class="{'active':isMember}"></div>
				<span>已确认商户号和商户秘钥配置正确(否则将导致微信支付异常,小程序无法通过审核)</span>
			</div>
		</div>
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				<a href="javascript:;" class="blue" style="width:200px;" @click="addconfig">提交微信审核</a>
			</div>
		</div>
		<!-- 弹窗 -->
		<!-- <programWin @getAppliedWin='getResult'></programWin> -->
	</div>
</template>
<script>
import http from 'src/manager/http';
// import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
// import global from 'src/manager/global';
export default {
	data() {
		return {
			number: '', //商户号
			secret: '', //商户秘钥
			isMember: false, //是否确认
		};
	},
	methods: {
		getResult: function(res, item) {
			//弹窗回调
			if (res == 'ok') {
				//this.bussinessselect = item;
			}
			//this.showWin = false;
		},
		selectBusinessHours: function() {
			//是否仅会员享受门店折扣
			this.isMember = !this.isMember;
		},
		addconfig:function(){
			
		}
	},
	components: {
		'programWin': () =>
			import ( /* webpackChunkName: 'business_win' */ './small_program_win'),
	},
	mounted() {
		//this.getConfig();
	}
};
</script>
<style type="text/css" scoped>
#merchants .set-line {
	width: 800px;
	height: 28px;
	line-height: 28px;
	border-left: 4px solid #28a8e0;
	margin: 15px 0 35px;
	position: relative;
}

#merchants .set-line .titles {
	float: left;
	margin-left: 12px;
	width: 120px;
	font-size: 16px;
	text-align: left;
}

#merchants .set-line .line {
	display: inline-block;
	width: 650px;
	border-bottom: 1px dashed #d9d9d9;
	margin-bottom: 5px;
}

#merchants .first {
	width: 100%;
	height: 32px;
	line-height: 32px;
}

#merchants .theText {
	display: inline-block;
	font-size: 16px;
	margin-right: 10px;
	height: 32px;
}

#merchants .first .round {
	float: left;
	display: inline-block;
	width: 32px;
	height: 32px;
	border-radius: 16px;
	background: #28A8E0;
	text-align: center;
	line-height: 32px;
	font-size: 16px;
	color: #fff;
	margin-right: 19px;
}

#merchants .verticalBar {
	height: 79px;
}

#merchants .verticalBar .onRight {
	height: 79px;
	display: flex;
	align-items: center;
}

#merchants .verticalBar .onRight .btn {
	width: 150px;
	height: 42px;
	line-height: 42px;
}

#merchants .verticalBar .vertical {
	width: 32px;
	height: 79px;
	margin-right: 19px;
	display: flex;
	justify-content: center;
}

#merchants .verticalBar .vertical span {
	display: block;
	width: 1px;
	height: 79px;
	background: #28A8E0;
}

#merchants .online-box {
	width: 100%;
	height: auto;
	min-height: 40px;
	margin-bottom: 29px;
}

#merchants .online-box .online-sub {
	display: block;
	font-size: 16px;
	width: 120px;
	height: 40px;
	line-height: 40px;
	color: #333;
	text-align: right;
	margin-right: 14px;
}

#merchants .online-box .rightHalf {
	max-width: 700px;
	height: auto;
	float: left;
}

#merchants .online-box .rightHalf .name {
	font-size: 16px;
	line-height: 42px;
	margin-right: 30px;
}

#merchants .online-box .rightHalf .abtn {
	width: 100px;
	height: 42px;
	line-height: 42px;
	margin-right: 10px;
	border-radius: 5px;
}

#merchants .online-box .rightHalf .merchants {
	width: 210px;
	height: 40px;
	background-color: #ffffff;
	border: solid 1px #cecdcd;
	text-indent: 15px;
}

#merchants .online-box .businessHours {
	float: left;
	line-height: 42px;
	height: 42px;
}

#merchants .online-box .businessHours div {
	width: 20px;
	height: 20px;
	cursor: pointer;
	border: 1px solid #28a8e0;
	margin: 11px 8px;
	float: left;
}

#merchants .online-box .businessHours span {
	font-size: 16px;
	color: #333;
}

.handle-tips {
	height: 40px;
	line-height: 40px;
	text-indent: 45px;
	background: url(../../../res/images/handle-tips.png?0) 20px center no-repeat;
	color: #999999;
}

.active {
	background: url(../../../res/icon/selected.png) center center no-repeat,
	#28a8e0;
}
</style>