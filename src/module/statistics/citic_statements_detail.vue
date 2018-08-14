<template>
	<Win @winEvent='winEvent' :width='800' :height='400' :type='"alert"'>
		<span slot='title'>订单详情</span>
		<div v-if="!shzx" id="citicTan" slot='content'>
			<section class="top" style="">
				<div style="width:50%;height:100%;float:left;">
					<div class="det">商户订单号：{{detial.shopOrderId}}</div>
					<div class="det">中信订单号：{{detial.zxOrderId}}</div>
					<div class="det">主商户号：{{detial.mainShopId}}</div>
					<div class="det">中信子商户号：{{detial.secMerId}}</div>
					<div class="det">第三平台子商户号：{{detial.thirdShopId}}</div>
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">交易渠道：{{detial.payChannel}}</div>
					<div class="det">交易总金额：{{detial.dealSum}}</div>
					<div class="det">退款总金额：{{detial.backSum}}</div>
					<div class="det">手续费金额：{{detial.handingFee}}</div>
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">终端号：{{detial.terminalNum}}</div>
					<div class="det">交易状态：{{detial.payStatus}}</div>
					<div class="det">退款状态：{{detial.backStatus}}</div>
					<div class="det">手续费率：{{detial.handingPercent}}</div>
				</div>
			</section>
			<section style="width:100%;margin-top:10px;overflow: hidden;">
				<div style="width:100%;height:1px;border: 1px dashed #ccc;"></div>
			</section>
			<section class="bottom" style="width:100%;height:130px;padding:10px 5px;padding-left:20px;overflow: hidden;">
				<div style="width:50%;height:100%;float:left;">
					<div class="det">原交易订单号：{{detial.originalOrderId}}</div>
					<div class="det">交易时间：{{detial.dealTime}}</div>
					<div class="det">交易类型：{{detial.payType}}</div>
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">商户简称：{{detial.shopShortName}}</div>
					<div class="det">实际结算日期：{{detial.actualPayTime}}</div>
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">分店名称：{{detial.shopPartName}}</div>
					<div class="det">DO标记：{{detial.DoFlag}}</div>
				</div>
			</section>
		</div>
		<div v-else id="citicTan" slot='content'>
			<section class="top" style="">
				<div style="width:50%;height:100%;float:left;">
					<div class="det">商户订单号：{{detial.orderId}}</div>
					<div class="det">中信订单号：{{detial.transactionId}}</div>
					<div class="det">主商户号：<i v-if="detial.mchId">{{detial.mchId}}</i><i v-else>--</i></div>
					<div class="det">中信子商户号：{{detial.subMchId}}</div>
					<!-- <div class="det">第三平台子商户号：{{detial.thirdShopId}}</div> -->
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">交易渠道：{{detial.tradeType}}</div>
					<div class="det">交易总金额：{{detial.totalFee}}</div>
					<div class="det">退款总金额：{{detial.refundFee}}</div>
					<div class="det">手续费金额：{{detial.charge}}</div>
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<!-- <div class="det">终端号：{{detial.deviceInfo}}</div> -->
					<div class="det">交易状态：{{detial.tradeStatus}}</div>
					<div class="det">退款状态：{{detial.refundStatus}}</div>
					<div class="det">手续费率：{{detial.rate}}</div>
				</div>
			</section>
			<section style="width:100%;margin-top:10px;overflow: hidden;">
				<div style="width:100%;height:1px;border: 1px dashed #ccc;"></div>
			</section>
			<section class="bottom" style="width:100%;height:130px;padding:10px 5px;padding-left:20px;overflow: hidden;">
				<div style="width:60%;height:100%;float:left;">
					<div class="det">原交易订单号：{{detial.outTradeNo}}</div>
					<div class="det">交易时间：{{getTime(detial.tradeTime)}}</div>
					<!-- <div class="det">交易类型：{{detial.payType}}</div> -->
				</div>
				<div style="width:25%;height: 100%;float:left;">
					<div class="det">商户简称：{{detial.mchName}}</div>
					<!-- <div class="det">实际结算日期：{{detial.billDate}}</div> -->
				</div>
				<!-- <div style="width:25%;height: 100%;float:left;">
					<div class="det">分店名称：{{detial.shopPartName}}</div>
					<div class="det">DO标记：{{detial.DoFlag}}</div>
				</div> -->
			</section>
		</div>
	</Win>

</template>

<script>
import utils from 'src/verdor/utils';
export default {
	props: {
		detial: [Array, Object],
		shzx: Boolean
	},
	data() {
		return {};
	},
	mounted(){
		console.log(this.detial);
	},
	methods: {
		getTime(time){
            return utils.getTime({time:time,format: 'yyyy年MM月dd日'}).format;
        },
		winEvent(str) {
			this.$emit('winEvent', str);
		}
	},
	components: {
		Win: () => import(/* webpackChunkName:"win" */ 'src/components/win')
	}
};
</script>


<style scoped>
#citicTan .top {
	width: 100%;
	height: 200px;
	padding: 10px 5px;
	padding-left: 20px;
	overflow: hidden;
}
#citicTan .det {
	width: 100%;
	height: 40px;
	line-height: 40px;
}
</style>
