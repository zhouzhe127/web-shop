<!--
    **会员储值配置
    *
    * miaochuan.sha
    * *
    *
-->
<template>
	<div id="memberstore">
		<!-- 储值入账至品牌账户-->
		<!-- <div class="online-box clearfix">
			<span class="online-sub fl">储值入账至品牌账户</span>
			<onOff :key='1' :status="payAccount" @statusChange="openpayAccount" class='fl'></onOff>
			<div class="fl handle-tips" style="margin-left: 20px;">
				<i></i> 需先设置品牌支付方式
			</div>
		</div> -->
		<!-- 微店储值支付方式 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">微店储值支付方式</span>
			<mulSelect class='fl' :list.sync="goodsType" :selects.sync="goodsSelect" :styles="{backgroundColor:'#fff',marginRight:'8px'}"
			    :name='"name"' :key='"id"'></mulSelect>
		</div>
		<!-- 保存 -->
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<a href="javascript:;" class="blue" style="width:200px;" @click="addconfig">保存</a>
		</div>
	</div>
</template>
<script>
	import http from 'src/manager/http';

	export default {
		data() {
			return {
				payAccount: true, //储值入账至品牌账户
				goodsType: [
					{
						name: '微信',
						id: 0
					},
					{
						name: '支付宝',
						id: 1
					}
				], //固定支付方式
				goodsSelect: [] //固定支付方式选中
			};
		},
		methods: {
			openpayAccount: function (res) {
				//储值入账至品牌账户
				this.payAccount = res;
			},
			addconfig: function () {
				if (this.goodsSelect.length == 0) {
					this.$store.commit('setWin', {
						content: '请至少选择一种支付方式',
						title: '操作提示',
						winType: 'alert'
					});
					return false;
				}
				this.addMemberStoreConfig();
			},
			async addMemberStoreConfig() {
				let data = await http.addMemberStoreConfig({
					data: {
						memberStoreStatus: Number(this.payAccount), //品牌支付功能是否开启
						memberStoreChannels: this.goodsSelect.join(',') //微店储值支付方式
					}
				});
				if (data) {
					this.$store.commit('setWin', {
						content: '保存成功',
						title: '操作提示',
						winType: 'alert'
					});
					this.getMemberStoreConf();
				}
			},
			async getMemberStoreConf() {
				let data = await http.getMemberStoreConf({
					data: {}
				});
				if (data) {
					//this.payAccount = Boolean(Number(data.memberStoreStatus)); //储值入账至品牌账户
					let select = data.memberStoreChannels.split(',');
					this.goodsSelect = [];
					for (let item of select) {
						if (item == '0' || item == '1') {
							this.goodsSelect.push(Number(item));
						}
					}
				}
			}
		},
		watch: {},
		computed: {},
		components: {
			onOff: () =>
				import ( /* webpackChunkName:'on_off' */ 'src/components/on_off'),
			mulSelect: () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/mul_select')
		},
		mounted() {
			this.getMemberStoreConf();
		}
	};
</script>
<style type="text/css" scoped>
	#memberstore {
		width: 100%;
		height: 100%;
		padding: 40px;
	}

	#memberstore .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#memberstore .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 150px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#memberstore .handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}
</style>