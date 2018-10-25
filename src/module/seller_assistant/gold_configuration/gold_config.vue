<template>
	<div id="glod-config">
		<!-- <header class="glod-config-header">
			<span>金币配置</span>
			<p class="dashed"></p>
		</header> -->
		<!-- 金币配置 -->
		<div class="set-line">
			<div class="titles">金币配置</div>
			<div class="line"></div>
		</div>
		<!-- 金币规则 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">金币规则</span>
			<div class="rightHalf">
				<span>1金币=1元</span>
			</div>
		</div>
		<!-- 金币规则 -->
		<div class="online-box clearfix">
			<span class="online-sub fl required">绑定客户获得</span>
			<div class="rightHalf">
				<el-input class='fl' @blur="formatValue" v-model.trim="gainGold" onkeyup="value=value.replace(/[^\d{1,5}\.\d{0,2}$]/g,'')" type="text" maxlength="8" placeholder="请输入金币数额" style="width:179px;">
					<template slot="suffix">金币</template>
				</el-input>
			</div>
		</div>
		<div class="online-box clearfix">
			<span class="online-sub fl required">客户消费获得金币比例</span>
			<div class="rightHalf">
				<el-input maxlength="5" v-model.trim="consumeGold" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="消费金额" style="width:179px;"></el-input>
				<span>:</span>
				<el-input maxlength=5 v-model.trim="gold" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="金币" style="width:179px;"></el-input>
				<div class="handle-tips">
					<i></i> 例：消费10元获得1金币
				</div>
			</div>
		</div>
		<div class="online-box clearfix">
			<span class="online-sub fl required">消费奖励模式</span>
			<div class="rightHalf">
				<el-radio-group v-model="validName" class="fl">
					<el-radio v-for="(item,index) in list" :key="index" :label="item.name" border @change.native="changeRadio(item)"></el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="online-box clearfix">
			<span class="online-sub fl"></span>
			<div class="rightHalf">
				 <el-button type="primary" style="width:190px;" @click="save">发布</el-button>
			</div>
		</div>
		<!-- <section class="glod-config-content"> -->
			<!-- <div>
				<p>金币规则 : 1金币=1元</p>
			</div> -->
			<!-- <div>
				<p class="required">绑定客户获得</p>
				<input @blur="formatValue" v-model.trim="gainGold" onkeyup="value=value.replace(/[^\d{1,5}\.\d{0,2}$]/g,'')" type="text" maxlength="8" placeholder="请输入金币数额">
				<i>金币</i>
			</div> -->
			<!-- <div>
				<div class="scale">
					<p class="required">客户店内消费获得金币比例</p>
					<div>
						<input type="text" maxlength="5" v-model.trim="consumeGold" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="消费金额">
						<i>:</i>
						<input type="text" maxlength=5 v-model.trim="gold" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="金币">
					</div>
				</div>
				<div class="info">例：消费10元获得1金币</div>
			</div> -->
			<!-- <div>
				<span class="required">消费奖励模式</span>
				<singleSelect :index='result' @selOn='haveIndex' :styles="{border: '1px solid #cecdcd'}" :list="list" :name="'name'" :key='"id"'></singleSelect>
			</div> -->
			<!-- <div class="btn">
				<button @click="save">保存</button>
			</div> -->
			<!-- </section> -->
	</div>
</template>
<script>
	import utils from 'src/verdor/utils';
	import http from 'src/manager/http';
	import global from 'src/manager/global';

	export default {
		data() {
			return {
				list: [{
					name: '奖励给客户的专属顾问',
					id: 0
				}, {
					name: '奖励给扫码人员',
					id: 1
				}],
				validName: '奖励给客户的专属顾问',
				gainGold: '', // 兑换获得的金币
				consumeGold: '', //  消费金额
				gold: '', //  金币
				result: 0,
				type: ''
			};
		},
		methods: {
			// haveIndex(i) {
			// 	this.result = i;
			// },
			formatValue() {
				this.gainGold = utils.toFloatStr(this.gainGold, 2);
			},
			async save() {
				if (!this.checkData()) {
					return false;
				}

				await http.addOrUpdate({
					data: {
						bindingObtain: this.gainGold,
						consumptionAmount: this.consumeGold,
						giveGoldCoins: this.gold,
						type: this.result
					}
				});
				this.$store.commit('setWin', {
					content: '修改成功',
					winType: 'alert',
					title: '操作提示!'
				});
				this.getCoinsConfig();
			},
			checkData() {
				if (this.gainGold > 10000) {
					this.$store.commit('setWin', {
						content: '绑定金币输入上限为0~10000以内允许小数，保留小数后两位',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				if (this.consumeGold > 10000) {
					this.$store.commit('setWin', {
						content: '消费金额输入范围为1~10000',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				if (this.gold > 10000) {
					this.$store.commit('setWin', {
						content: '金币输入范围为1~10000',
						winType: 'alert',
						title: '提示信息'
					});
					return false;
				}
				if (!global.checkData({
					gainGold: {
						cond: `$$ !='' && $$>=0`,
						pro: '绑定金币输入上限为0~10000以内允许小数，保留小数后两位'
					},
					consumeGold: {
						cond: `$$ !='' && $$>0`,
						pro: '消费金额输入范围为1~10000'
					},
					gold: {
						cond: `$$ !='' && $$>0`,
						pro: '金币输入范围为1~10000'
					}
				},
				this)) {
					return false;
				}
				return true;
			},
			async getCoinsConfig() {
				let res = await http.getCoinsConfig({});
				this.consumeGold = res.consumptionAmount;
				this.gainGold = res.bindingObtain;
				this.gold = res.giveGoldCoins;
				this.result = res.type || 0;
				this.validName = this.list[this.result].name;
			},
			//开关
			changeRadio: function(item) {
				let id = item.id;
				this.result = id;
			},
		},
		mounted() {
			this.getCoinsConfig();
		},
		components: {
			'singleSelect': () =>
				import ( /*webpackChunkName: 'mul_select'*/ 'src/components/single_select')
		}
	};
</script>
<style lang="less" scoped>
	#gold-config {
		max-width: 1400px;
		height: auto;
	}

	#glod-config .set-line {
		width: 1000px;
		height: 28px;
		line-height: 28px;
		border-left: 4px solid #28a8e0;
		margin: 15px 0 35px;
		position: relative;
	}

	#glod-config .set-line .titles {
		float: left;
		margin-left: 12px;
		width: 100px;
		font-size: 16px;
		text-align: left;
	}

	#glod-config .set-line .line {
		display: inline-block;
		width: 870px;
		border-bottom: 1px dashed #d9d9d9;
		margin-bottom: 5px;
	}

	#glod-config .online-box {
		width: 100%;
		height: auto;
		min-height: 40px;
		margin-bottom: 29px;
	}

	#glod-config .online-box .online-sub {
		display: block;
		font-size: 16px;
		width: 170px;
		height: 40px;
		line-height: 40px;
		color: #333;
		text-align: right;
		margin-right: 14px;
	}

	#glod-config .online-box .rightHalf {
		max-width: 900px;
		height: auto;
		float: left;
		line-height: 40px;
	}

	#glod-config .online-box .rightHalf span {
		font-size: 16px;
		line-height: 40px;
	}

	.handle-tips {
		height: 40px;
		line-height: 40px;
		text-indent: 25px;
		background: url("../../../../src/res/images/prompt.png") 0 center no-repeat;
		color: #999999;
	}

	#glod-config {
		font-family: 'MicrosoftYaHei';

		.glod-config-header {
			width: 100%;
			height: 29px;
			margin-top: 31px;
			display: flex;
			flex-direction: row;
			align-items: center;

			span {
				height: 29px;
				border-left: 3px solid RGB(40, 168, 224);
				padding: 0 7px;
				font-size: 16px;
				color: #333333;
				line-height: 29px;
				font-weight: 600;
			}

			.dashed {
				width: 538px;
				height: 1px;
				background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
				background-size: 20px 1px;
				background-repeat: repeat-x;
			}
		}

		.glod-config-content {
			padding: 15px;

			&>div {
				margin: 17px 0;
			}

			&>div:nth-child(1) {
				p {
					font-size: 17px;
					color: #333333;
					margin-left: 130px;
				}
			}

			&>div:nth-child(2) {
				display: flex;
				flex-direction: row;
				align-items: center;

				p {
					font-size: 17px;
					color: #333333;
					margin-left: 100px;
				}

				input {
					height: 42px;
					width: 130px;
					border: 1px solid RGB(206, 205, 205);
					margin-left: 20px;
					padding: 0 5px;
				}

				i {
					border: 1px solid RGB(206, 205, 205);
					border-left: none;
					font-size: 17px;
					color: #333333;
					width: 50px;
					height: 42px;
					text-align: center;
					line-height: 41px;
				}
			}

			&>div:nth-child(3) {
				.scale {
					display: flex;
					flex-direction: row;
					align-items: center;

					p {
						font-size: 17px;
						color: #333333;
					}

					div {
						margin-left: 17px;

						input {
							width: 170px;
							height: 43px;
							border: 1px solid RGB(206, 205, 205);
							padding: 0 5px;
						}

						i {
							margin: 0 5px;
						}
					}
				}

				.info {
					font-size: 14px;
					color: #a5a5a5;
					height: 40px;
					margin-left: 230px;
					line-height: 40px;
				}
			}

			&>div:nth-child(4) {
				margin-left: 100px;
				display: flex;
				flex-direction: row;
				align-items: center;

				span {
					font-size: 17px;
					color: #333333;
					margin-right: 15px;
				}
			}
		}

		.btn {
			button {
				width: 190px;
				height: 52px;
				background: RGB(40, 168, 224);
				margin-left: 230px;
				border: none;
				font-size: 16px;
				color: #ffffff;
			}
		}
	}
</style>