<template>
	<div>
		<win @winEvent="clickResult" :align="'center'" :width="500" :height="300" :hasBtn="false" type="primary">
			<!--标题-->
			<span slot="title">充值</span>
			<!--内容-->
			<div slot="content" class="chargeBody">
				<div v-if="!sucCharging || !sucCharging" class="to-charge">
					<div class="info-item">
						<span class="tit">当前门店：</span>
						<span class="cont">{{chargeDetailInfo.shopName}}</span>
					</div>
					<div class="info-item">
						<span class="tit">激活状态：</span>
						<span class="cont">{{chargeDetailInfo.type == 0 ? '首次激活' : '续费'}}</span>
						<span class="price">
							价格：
							<span class="mys" v-if="chargeDetailInfo.type == 0">￥{{chargeDetailInfo.activationPrice}}/ {{chargeDetailInfo.activationTime}}</span>
							<span class="mys" v-else-if="chargeDetailInfo.type == 1">￥{{chargeDetailInfo.renewPrice}}/ {{chargeDetailInfo.renewTime}}</span>
						</span>
					</div>
					<!--续费价格说明-->
					<div class="renew-info" v-if="chargeDetailInfo.type == 0">
						续费费用为：￥{{chargeDetailInfo.renewPrice}} / {{chargeDetailInfo.renewTime}}
					</div>
					<!--扫码支付-->
					<div class="scan-pay">
						<div class="qr-code fl scan-item">
							<div class="qr-show">
								<img :src="chargeDetailInfo.qrCode" alt="支付二维码">
								<div class="mask" v-if="refreshMaskShow" @click.stop="reviewQr">刷新</div>
							</div>
							<div>*如对价格有疑问，可咨询系统顾问</div>
						</div>
						<div class="pay-price fl scan-item" style="padding-top: 30px;">
							<div class="mys" style="font-weight: bold;color: #000;font-size: 28px;margin-bottom: 10px;">
								￥{{chargeDetailInfo.type == 0 ? chargeDetailInfo.activationPrice : chargeDetailInfo.renewPrice}}
							</div>
							<div style="margin-bottom:10px;">请扫码完成支付</div>
							<span style="font-size: 12px;color: #999;">{{reshowCont}}</span>
						</div>
					</div>
				</div>
				<!--正在充值-->
				<!--<template v-if="inCharging">-->
				<!--<div class="in-charge">-->
				<!--<i class="el-icon-loading" style="display: block; font-size: 120px;text-align: center;color:#666;"></i>-->
				<!--<p style="margin: 20px 0;font-size: 18px;color: #000;text-align: center;font-weight: bold;">正在支付...</p>-->
				<!--</div>-->
				<!--</template>-->
				<!--充值失败-->
				<!--<template v-if="errCharging">-->
				<!--<div class="fail-charge">-->
				<!--<i class="el-icon-circle-close-outline" style="display: block; font-size: 120px;text-align: center;color: rgb(252,48,57)"></i>-->
				<!--<p style="margin: 20px 0;font-size: 18px;color: #000;text-align: center;font-weight: bold;">支付失败</p>-->
				<!--<div style="width: 230px;overflow: hidden;margin: 40px auto 0;">-->
				<!--<span class="fl" style="color:#999;">-->
				<!--请重试或联系系统顾问-->
				<!--</span>-->
				<!--<span class="fr" style="color: #69c2ea;cursor: pointer;" @click="clickResult">-->
				<!--关闭-->
				<!--</span>-->
				<!--</div>-->
				<!--</div>-->
				<!--</template>-->
				<!--充值完成-->
				<template v-if="sucCharging">
					<div class="sucess-charge">
						<i class="el-icon-circle-check-outline" style="display: block; font-size: 120px;text-align: center;color: rgb(114,170,59)"></i>
						<p style="margin: 20px 0;font-size: 18px;color: #000;text-align: center;font-weight: bold;">支付成功</p>
						<div style="width: 240px;overflow: hidden;margin: 40px auto 0;">
							<span class="fl" style="color: #999;">{{closeCont}}</span>
							<span class="fr" style="color: #69c2ea;cursor: pointer;" @click="clickResult">直接关闭</span>
						</div>
					</div>
				</template>
			</div>
		</win>

	</div>
</template>

<script>
import http from 'src/manager/http';
import storage from 'src/verdor/storage';
// import utils from 'src/verdor/utils';
export default {
	name: 'activate_recharge_win',
	data() {
		return {
			chargeData: {},
			inCharging: false,
			errCharging: false,
			sucCharging: false,

			totalTime: 3, // 三秒关闭时间
			closeCont: '', // 三秒关闭内容
			clock: null, // 三秒关闭倒计时

			reShowTime: 60, // 60秒刷新
			reshowCont: '', // 60秒内容
			reshowClock: null, // 60秒倒计时

			chargeDetailInfo: {}, // 支付数据
			chargeBackStatus: '', // 支付状态

			charClock: null, // 轮训查找支付信息,
			userData: null,
			baseDetial: {}, //获取的店铺基本信息
			refreshMaskShow: false
		};
	},
	props: {
		currentDetail: {}
	},
	watch: {
		sucCharging(val) {
			if (val === true) {
				this.countDown();
			}
		}
	},
	methods: {
		//传给父组件信息
		clickResult(res) {
			this.$emit('toWin', res);
		},
		// 获取支付信息
		handleGetCharge() {
			http.getChargeInfo().then(res => {
				console.log(res, '支付数据');
				this.chargeDetailInfo = res;
			});
		},
		// 获取支付状态
		handleGetQuery() {
			this.charClock = setInterval(() => {
				http.getChargeQuery().then(res => {
					console.log(res, '支付状态返回值');
					if (res === true) {
						this.sucCharging = true;
						this.charClock && clearInterval(this.charClock);
						this.$emit('chargeResult', res);
					}
				});
			}, 1000);
		},
		// 三秒关闭倒计时
		countDown() {
			this.closeCont = this.totalTime + 's后自动关闭';
			this.clock = setInterval(() => {
				this.totalTime--;
				this.closeCont = this.totalTime + 's后自动关闭';
				if (this.totalTime < 0) {
					clearInterval(this.clock);
					this.closeCont = '3s后自动关闭';
					this.totalTime = 3;
					this.$emit('toWin', 'close');
					// window.location.reload();
				}
			}, 1000);
		},
		reshowCountDown() {
			this.reshowCont = this.reShowTime + 's后刷新';

			this.reshowClock = setInterval(() => {
				this.reShowTime--;
				this.reshowCont = this.reShowTime + 's后刷新';
				if (this.reShowTime < 0) {
					this.reshowClock && clearInterval(this.reshowClock);
					this.charClock && clearInterval(this.charClock);
					this.reshowCont = '60s后刷新';
					this.reShowTime = 60;
					this.refreshMaskShow = true;
					this.handleGetCharge();
				}
			}, 1000);
		},
		reviewQr() {
			this.refreshMaskShow = false;
			this.reshowCountDown();
			this.handleGetQuery()
		}
	},
	created() {
		this.userData = storage.session('userShop');
	},
	mounted() {
		// 获取支付信息
		this.handleGetCharge();
		this.handleGetQuery();
		// 支付数据存在后，计时刷新二维码
		this.chargeDetailInfo && this.reshowCountDown();
	},
	components: {
		win: () => import(/*webpackChunkName: "win"*/ 'src/components/win')
	},
	beforeDestroy() {
		this.clock && clearInterval(this.reshowClock);
		this.reshowClock && clearInterval(this.reshowClock);
		this.charClock && clearInterval(this.charClock);
	}
};
</script>

<style lang="less" scoped>
.chargeWin {
	.win-bottom {
		display: none !important;
	}
}
.chargeBody {
	width: 100%;
	height: 100%;
	padding: 20px 50px;
	.info-item {
		margin-bottom: 15px;
		.cont {
			font-weight: bold;
		}
		.price {
			margin-left: 40px;
			.mys {
				color: #ff3a05;
				font-weight: bold;
			}
		}
	}
	.renew-info {
		margin-bottom: 20px;
		color: #999;
	}
	.scan-pay {
		overflow: hidden;
		.scan-item {
			width: 50%;
			text-align: center;
		}
		.qr-code {
			> div {
				font-size: 12px;
				color: #999;
				margin-top: 10px;
			}
			.qr-show {
				width: 150px;
				height: 150px;
				position: relative;
				overflow: hidden;
				margin: 0 auto;
				img {
					width: 100%;
					height: 100%;
					display: block;
					cursor: pointer;
				}
				.mask {
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.8);
					transition: all 0.2s ease-in;
					position: absolute;
					left: 0;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #fff;
					font-size: 18px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
